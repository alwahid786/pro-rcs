import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/utils/jwt";
import { createFddRecord } from "@/lib/services/fddService";
import crypto from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const version = formData.get("version") as string;
    const restaurantName = (formData.get("restaurantName") as string) || "";
    const file = formData.get("file") as File;
    const country = (formData.get("country") as string) || "";
    const state = (formData.get("state") as string) || "";

    if (!title || !version || !file) {
      return NextResponse.json(
        { error: "Title, version, and PDF file are required" },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF documents are allowed" },
        { status: 400 }
      );
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "uploads", "fdd", "original");
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Unique filename generation
    const fileExtension = path.extname(file.name);
    const uuid = crypto.randomUUID();
    const uniqueFileName = `fdd-template-${uuid}${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Compute SHA-256 document hash
    const documentHash = crypto.createHash("sha256").update(buffer).digest("hex");

    // Write file to server filesystem
    await writeFile(filePath, buffer);

    // Save record to DB with relative path for portability
    const relativeFilePath = path.join("uploads", "fdd", "original", uniqueFileName);
    const newFdd = await createFddRecord({
      title,
      version,
      restaurantName,
      filePath: relativeFilePath,
      downloadName: file.name,
      fileSize: file.size,
      documentHash,
      country,
      state,
    });

    return NextResponse.json(newFdd, { status: 201 });
  } catch (error) {
    console.error("FDD upload error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
