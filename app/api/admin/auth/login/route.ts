import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error";
import { loginSchema } from "@/schemas/auth.schemas";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  try {
    const body = loginSchema.parse(payload);

    const user = await auth.api.signInEmail({
      body,
    });

    return NextResponse.json({
      data: {
        user,
      },
      success: true,
      message: "User login successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}
