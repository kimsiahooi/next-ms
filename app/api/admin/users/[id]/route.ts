import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { ADMIN_USERS_PATH } from "@/constants/admin/path.constants";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error";

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await auth.api.removeUser({
      headers: await headers(),
      body: { userId: id },
    });

    revalidatePath(ADMIN_USERS_PATH);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}
