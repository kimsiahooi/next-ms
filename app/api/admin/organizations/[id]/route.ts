import { APIError } from "better-auth";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await auth.api.deleteOrganization({
      headers: await headers(),
      body: { organizationId: id },
    });

    return NextResponse.json({
      success: true,
      message: "Organizations deleted successfully",
    });
  } catch (error) {
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
        message: "Organization failed delete",
      },
      { status: 500 },
    );
  }
}
