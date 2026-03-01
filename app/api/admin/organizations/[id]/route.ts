import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error";

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
    return handleError(error);
  }
}
