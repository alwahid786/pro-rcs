import { NextResponse } from "next/server";
import { findAdminByEmail } from "@/lib/services/adminService";
import { signToken } from "@/lib/utils/jwt";
import bcrypt from "bcryptjs";

export async function loginAdmin(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const admin = await findAdminByEmail(email);
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await signToken({
      id: admin._id.toString(),
      email: admin.email,
    });

    const response = NextResponse.json(
      {
        message: "Login successful.",
        admin: {
          id: admin._id.toString(),
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          country: admin.country,
          state: admin.state,
          number: admin.number,
        },
      },
      { status: 200 }
    );

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong during login." },
      { status: 500 }
    );
  }
}

export async function logoutAdmin() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful." },
      { status: 200 }
    );

    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Something went wrong during logout." },
      { status: 500 }
    );
  }
}
