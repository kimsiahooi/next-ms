import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_ORGANIZATIONS_PATH } from "@/constants/admin/path.constants";
import { auth } from "@/lib/auth";
import {
  createOrganizationSchema,
  deleteOrganizationSchema,
} from "@/schemas/organization.schemas";

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
        message: "Organization failed retrieve",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const payload = await request.json();

  try {
    const body = await createOrganizationSchema.parseAsync(payload);

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
    if (error instanceof z.ZodError) {
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
        message: "Organization failed create",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const payload = await request.json();

  try {
    const { id: organizationId } =
      await deleteOrganizationSchema.parseAsync(payload);

    await auth.api.deleteOrganization({
      headers: await headers(),
      body: {
        organizationId,
      },
    });

    revalidatePath(ADMIN_ORGANIZATIONS_PATH);

    return NextResponse.json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
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
        message: "Organization failed delete",
      },
      { status: 500 },
    );
  }
}
