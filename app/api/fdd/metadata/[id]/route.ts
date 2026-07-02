import { NextRequest, NextResponse } from "next/server";
import Fdd from "@/lib/models/Fdd";
import dbConnect from "@/lib/db";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await dbConnect();

    const fdd = await Fdd.findById(id);
    if (!fdd || fdd.isDeleted) {
      return NextResponse.json({ error: "FDD template not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: fdd._id,
      title: fdd.title,
      version: fdd.version,
      restaurantName: fdd.restaurantName,
      fileSize: fdd.fileSize,
      downloadUrl: `/api/fdd/download/${fdd._id}`,
      uploadedAt: fdd.uploadedAt,
    });
  } catch (error) {
    console.error("FDD metadata error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
