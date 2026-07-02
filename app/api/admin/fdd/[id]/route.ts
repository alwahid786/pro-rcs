import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/utils/jwt";
import { softDeleteFddRecord } from "@/lib/services/fddService";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

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

    const softDeleted = await softDeleteFddRecord(id);
    if (!softDeleted) {
      return NextResponse.json(
        { error: "FDD template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "FDD template successfully soft-deleted",
      id: softDeleted._id,
    });
  } catch (error) {
    console.error("DELETE FDD error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
