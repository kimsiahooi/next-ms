import { type NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { auth } from "@/lib/auth";
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
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: z.flattenError(error),
        },
        { status: 422 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "User failed login",
      },
      { status: 500 },
    );
  }
}
