import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/utils/jwt";
import { updateAdminProfile } from "@/lib/services/adminService";

export async function PUT(req: NextRequest) {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { firstName, lastName, country, state, number } = body;

    if (!firstName || !lastName || !country || !state || !number) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (number.length > 20) {
      return NextResponse.json(
        { error: "Contact number cannot exceed 20 characters" },
        { status: 400 }
      );
    }

    const updatedAdmin = await updateAdminProfile(payload.id, {
      firstName,
      lastName,
      country,
      state,
      number,
    });

    if (!updatedAdmin) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    return NextResponse.json({
      firstName: updatedAdmin.firstName,
      lastName: updatedAdmin.lastName,
      email: updatedAdmin.email,
      country: updatedAdmin.country,
      state: updatedAdmin.state,
      number: updatedAdmin.number,
    });
  } catch (error) {
    console.error("Admin profile update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
