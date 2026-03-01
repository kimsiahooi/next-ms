import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { ADMIN_USERS_PATH } from "@/constants/admin/path.constants";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error";
import { updateUserSchema } from "@/schemas/user.schemas";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const payload = await request.json();

  const { id } = await params;

  try {
    const data = updateUserSchema.parse(payload);

    const user = await auth.api.adminUpdateUser({
      headers: await headers(),
      body: {
        userId: id,
        data,
      },
    });

    revalidatePath(ADMIN_USERS_PATH);

    return NextResponse.json({
      data: {
        user,
      },
      success: true,
      message: "User deleted successfully",
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
