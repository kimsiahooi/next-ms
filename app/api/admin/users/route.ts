import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { ADMIN_USERS_PATH } from "@/constants/admin/path.constants";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error";
import { createUserSchema } from "@/schemas/user.schemas";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchValue = searchParams.get("searchValue") ?? undefined;
  const searchField =
    (searchParams.get("searchField") as "email" | "name") ?? undefined;
  const searchOperator =
    (searchParams.get("searchOperator") as
      | "contains"
      | "starts_with"
      | "ends_with") ?? undefined;
  const limit = searchParams.get("limit") ?? undefined;
  const offset = searchParams.get("offset") ?? undefined;
  const sortBy = searchParams.get("sortBy") ?? undefined;
  const sortDirection =
    (searchParams.get("sortDirection") as "asc" | "desc") ?? undefined;

  try {
    const data = await auth.api.listUsers({
      headers: await headers(),
      query: {
        searchValue,
        searchField,
        searchOperator,
        limit,
        offset,
        sortBy,
        sortDirection,
      },
    });

    return NextResponse.json({
      data,
      success: true,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  const payload = await request.json();

  try {
    const body = createUserSchema.parse(payload);

    const user = await auth.api.createUser({
      headers: await headers(),
      body,
    });

    revalidatePath(ADMIN_USERS_PATH);

    return NextResponse.json({
      data: {
        user,
      },
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}
