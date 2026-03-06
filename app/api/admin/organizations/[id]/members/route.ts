import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const organization = await auth.api.listMembers({
      headers: await headers(),
      query: {
        organizationId: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Members retrieved successfully",
      data: {
        organization,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
