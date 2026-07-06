import { NextRequest, NextResponse } from "next/server";
import { createSignedFddRecord } from "@/lib/services/fddService";
import Fdd from "@/lib/models/Fdd";
import crypto from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { Types } from "mongoose";
import { ISignedFdd } from "@/lib/models/SignedFdd";
import { PDFDocument, StandardFonts, rgb, PDFImage } from "pdf-lib";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const fddId = formData.get("fddId") as string;
    const documentVersion = formData.get("documentVersion") as string;
    const originalPdfPath = formData.get("originalPdfPath") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const number = (formData.get("number") as string) || "";
    const country = formData.get("country") as string;
    const state = formData.get("state") as string;
    const location = formData.get("location") as string;
    const jobTitle = (formData.get("jobTitle") as string) || "";

    // Stamping params
    const signatureImage = formData.get("signatureImage") as string; // Base64 PNG data URL
    const signaturesJson = formData.get("signatures") as string;
    const sigPage = formData.get("sigPage") as string;
    const sigX = formData.get("sigX") as string;
    const sigY = formData.get("sigY") as string;
    const canvasWidth = formData.get("canvasWidth") as string;
    const canvasHeight = formData.get("canvasHeight") as string;

    if (!fddId || !firstName || !lastName || !email || !country || !state || !location) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Ensure signed uploads directory exists
    const signedDir = path.join(process.cwd(), "uploads", "fdd", "signed");
    if (!fs.existsSync(signedDir)) {
      await mkdir(signedDir, { recursive: true });
    }

    const uuid = crypto.randomUUID();
    const uniqueFileName = `signed-fdd-${uuid}.pdf`;
    const destinationPath = path.join(signedDir, uniqueFileName);
    const relativeSignedPath = path.join("uploads", "fdd", "signed", uniqueFileName);

    // Fetch original template
    const fddTemplate = await Fdd.findById(fddId);
    if (!fddTemplate || fddTemplate.isDeleted) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    const originalFullPath = path.join(process.cwd(), fddTemplate.filePath);
    if (!fs.existsSync(originalFullPath)) {
      return NextResponse.json({ error: "Original template file not found on server" }, { status: 500 });
    }

    // Read original PDF bytes
    const originalBuffer = await fs.promises.readFile(originalFullPath);

    let finalPdfBuffer = originalBuffer;
    let documentHash = "";
    const placementList = [];

    // Parse coordinates array
    let signaturePlacements: Array<{
      page: number;
      x: number;
      y: number;
      canvasWidth: number;
      canvasHeight: number;
      type?: "signature" | "title" | "printedName" | "date";
      textValue?: string;
    }> = [];

    if (signaturesJson) {
      try {
        signaturePlacements = JSON.parse(signaturesJson);
      } catch (err) {
        console.error("Failed to parse signatures JSON:", err);
      }
    } else if (sigPage && sigX && sigY && canvasWidth && canvasHeight) {
      signaturePlacements.push({
        page: Number(sigPage),
        x: Number(sigX),
        y: Number(sigY),
        canvasWidth: Number(canvasWidth),
        canvasHeight: Number(canvasHeight),
      });
    }

    // Process interactive PDF signature and text stamping
    if (signaturePlacements.length > 0) {
      try {
        const pdfDoc = await PDFDocument.load(originalBuffer);
        const pages = pdfDoc.getPages();
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Decode and embed signature PNG if signature image is provided
        let sigImg: PDFImage | null = null;
        if (signatureImage) {
          try {
            const base64Data = signatureImage.replace(/^data:image\/png;base64,/, "");
            const imageBuffer = Buffer.from(base64Data, "base64");
            sigImg = await pdfDoc.embedPng(imageBuffer);
          } catch (imgErr) {
            console.error("Failed to embed signature image:", imgErr);
          }
        }

        for (const placement of signaturePlacements) {
          const pageIdx = Number(placement.page) - 1;
          if (pageIdx >= 0 && pageIdx < pages.length) {
            const page = pages[pageIdx];
            const { width: pageWidth, height: pageHeight } = page.getSize();

            // Translate canvas coordinates to PDF space (origin bottom-left)
            const scaleX = Number(placement.x) / Number(placement.canvasWidth);
            const scaleY = Number(placement.y) / Number(placement.canvasHeight);

            const pdfX = scaleX * pageWidth;
            const pdfY = pageHeight - (scaleY * pageHeight);

            const placementType = placement.type || "signature";

            if (placementType === "signature") {
              if (sigImg) {
                // Dynamic signature width based on image aspect ratio with a fixed 35 height
                const sigHeight = 35;
                const aspectRatio = sigImg.width / sigImg.height;
                const sigWidth = sigHeight * aspectRatio;

                // Adjust by half dimensions to center image over click coordinates
                const adjustedX = pdfX - sigWidth / 2;
                const adjustedY = pdfY - sigHeight / 2;

                page.drawImage(sigImg, {
                  x: adjustedX,
                  y: adjustedY,
                  width: sigWidth,
                  height: sigHeight,
                });
              }
            } else {
              // Draw vector text matching standard document fonts
              const textVal = placement.textValue || "";
              page.drawText(textVal, {
                x: pdfX - 45, // offset slightly to left to center align text over click point
                y: pdfY - 4,
                size: 10,
                font: helveticaFont,
                color: rgb(15 / 255, 23 / 255, 42 / 255),
              });
            }

            placementList.push({
              page: Number(placement.page),
              x: Number(placement.x),
              y: Number(placement.y),
              canvasWidth: Number(placement.canvasWidth),
              canvasHeight: Number(placement.canvasHeight),
              type: placementType,
              textValue: placement.textValue || "",
            });
          }
        }

        // Save modified document bytes after drawing all elements
        const modifiedBytes = await pdfDoc.save();
        finalPdfBuffer = Buffer.from(modifiedBytes);
      } catch (stampErr) {
        console.error("PDF Stamping failed, falling back to clean copy:", stampErr);
      }
    }

    // Save final stamped PDF
    documentHash = crypto.createHash("sha256").update(finalPdfBuffer).digest("hex");
    await writeFile(destinationPath, finalPdfBuffer);

    // Capture legal audit trail details
    const ipAddress = req.headers.get("x-forwarded-for") || (req as NextRequest & { ip?: string }).ip || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "Unknown";

    const payload: Partial<ISignedFdd> = {
      fddId: new Types.ObjectId(fddId) as unknown as Types.ObjectId,
      documentVersion: documentVersion || "v1",
      originalPdfPath: originalPdfPath || "",
      firstName,
      lastName,
      email,
      number,
      jobTitle,
      country,
      state,
      location,
      signedPdfPath: relativeSignedPath,
      signedDocumentHash: documentHash,
      ipAddress,
      userAgent,
      status: "completed",
      signatures: placementList,
      signatureImage: signatureImage || "",
    };

    const signedRecord = await createSignedFddRecord(payload);

    return NextResponse.json(signedRecord, { status: 201 });
  } catch (error) {
    console.error("FDD sign submission error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
