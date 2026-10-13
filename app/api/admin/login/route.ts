import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminToken, getAdminCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const { email: validEmail, password: validPassword } = getAdminCredentials();

    if (
      !email ||
      !password ||
      email.trim().toLowerCase() !== validEmail.trim().toLowerCase() ||
      password !== validPassword
    ) {
      return NextResponse.json(
        { error: "Invalid admin email or password." },
        { status: 401 }
      );
    }

    const token = await createAdminToken(validEmail);

    const response = NextResponse.json({
      success: true,
      message: "Admin session authenticated successfully.",
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
