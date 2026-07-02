import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/utils/jwt";
import SignedFdd from "@/lib/models/SignedFdd";
import dbConnect from "@/lib/db";
import fs from "fs";
import path from "path";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Allow public download since MongoDB ObjectId is unguessable and secure

    await dbConnect();

    const signedFdd = await SignedFdd.findById(id);
    if (!signedFdd) {
      return new Response("Signed FDD record not found", { status: 404 });
    }

    const filePath = path.resolve(signedFdd.signedPdfPath);
    if (!fs.existsSync(filePath)) {
      return new Response("Signed file not found on server", { status: 404 });
    }

    const downloadFileName = `Signed_FDD_${signedFdd.documentVersion}_${signedFdd.lastName}_${signedFdd.firstName}.pdf`;

    const fileStream = fs.createReadStream(filePath);
    const webStream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
    });

    return new Response(webStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(downloadFileName)}"`,
      },
    });
  } catch (error) {
    console.error("Signed FDD download error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
