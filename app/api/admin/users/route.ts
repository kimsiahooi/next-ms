import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { LARAVEL_ASSET_UPLOADER_APP_URL } from "@/constants";
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
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const image = formData.get("image");

  try {
    const validated = createUserSchema.parse({ email, password, name, image });

    const body = { ...validated, data: { image: undefined } };

    if (validated.image) {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      const assetFormData = new FormData();
      assetFormData.append("file", validated.image);
      assetFormData.append("folder_name", "users");
      if (session?.user.id) {
        assetFormData.append("user_id", session.user.id);
      }

      const response = await fetch(
        `${LARAVEL_ASSET_UPLOADER_APP_URL}/api/assets`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: assetFormData,
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const image = await response.json();

      if (image?.asset?.url) {
        body.data.image = image.asset.url;
      }
    }

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
