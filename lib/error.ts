import { APIError } from "better-auth";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

export const handleError = (error: unknown) => {
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

  if (error instanceof APIError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Authentication failed",
      },
      { status: error.statusCode },
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: error instanceof Error ? error.message : "Server Error",
    },
    { status: 500 },
  );
};
