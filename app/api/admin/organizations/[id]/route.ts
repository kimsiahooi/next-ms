import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { ADMIN_ORGANIZATIONS_PATH } from "@/constants/admin/path.constants";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
      query: {
        organizationId: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Organization retrieved successfully",
      data: {
        organization,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}

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

    revalidatePath(ADMIN_ORGANIZATIONS_PATH);

    return NextResponse.json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}
