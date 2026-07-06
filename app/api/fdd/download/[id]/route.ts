import { NextRequest } from "next/server";
import Fdd from "@/lib/models/Fdd";
import dbConnect from "@/lib/db";
import fs from "fs";
import path from "path";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await dbConnect();

    const fdd = await Fdd.findById(id);
    if (!fdd || fdd.isDeleted) {
      return new Response("Document not found", { status: 404 });
    }

    const filePath = path.resolve(fdd.filePath);
    if (!fs.existsSync(filePath)) {
      return new Response("File not found on server", { status: 404 });
    }

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
        "Content-Disposition": `attachment; filename="${encodeURIComponent(fdd.downloadName)}"`,
      },
    });
  } catch (error) {
    console.error("Original FDD download error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
