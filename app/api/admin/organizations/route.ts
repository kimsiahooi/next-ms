import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { LARAVEL_ASSET_UPLOADER_APP_URL } from "@/constants";
import { ADMIN_ORGANIZATIONS_PATH } from "@/constants/admin/path.constants";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error";
import { createOrganizationSchema } from "@/schemas/organization.schemas";

export async function GET() {
  try {
    const organizations = await auth.api.listOrganizations({
      headers: await headers(),
    });

    return NextResponse.json({
      data: {
        organizations,
      },
      success: true,
      message: "Organizations retrieved successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get("name");
  const slug = formData.get("slug");
  const logo = formData.get("logo");

  try {
    const validated = createOrganizationSchema.parse({ name, slug, logo });

    const body = { ...validated, logo: undefined };

    if (validated.logo) {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      const assetFormData = new FormData();
      assetFormData.append("file", validated.logo);
      assetFormData.append("folder_name", "organizations");
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
        throw new Error("Failed to upload logo");
      }

      const image = await response.json();

      if (image?.asset?.url) {
        body.logo = image.asset.url;
      }
    }

    const organization = await auth.api.createOrganization({
      headers: await headers(),
      body,
    });

    revalidatePath(ADMIN_ORGANIZATIONS_PATH);

    return NextResponse.json({
      data: {
        organization,
      },
      success: true,
      message: "Organization created successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}
