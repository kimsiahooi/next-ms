"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { ADMIN_ORGANIZATIONS_PATH } from "@/constants/admin/path.constants";
import { auth } from "@/lib/auth";
import type { FormState } from "@/schemas/form.schemas";
import {
  createOrganizationSchema,
  deleteOrganizationSchema,
} from "@/schemas/organization.schemas";

export async function createOrganizationAction(
  _: FormState<typeof createOrganizationSchema>,
  formData: FormData,
) {
  const values = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
  };

  try {
    const { name, slug } = await createOrganizationSchema.parseAsync(values);

    await auth.api.createOrganization({
      body: { name, slug },
      headers: await headers(),
    });

    revalidatePath(ADMIN_ORGANIZATIONS_PATH);

    return {
      values: {
        name: "",
        slug: "",
      },
      success: true,
      message: "Organization created successfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        values,
        success: false,
        errors: z.flattenError(error).fieldErrors,
      };
    }

    return {
      values,
      success: false,
      message: "Failed create organization",
    };
  }
}

export async function deleteOrganizationAction(
  _: FormState<typeof deleteOrganizationSchema>,
  formData: FormData,
) {
  const values = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
  };

  try {
    const organization = await deleteOrganizationSchema.parseAsync(values);

    if (!organization) {
      throw new Error("Organization not found");
    }

    await auth.api.deleteOrganization({
      body: {
        organizationId: organization.id,
      },
      headers: await headers(),
    });

    revalidatePath(ADMIN_ORGANIZATIONS_PATH);

    return {
      values: {
        id: "",
        name: "",
        slug: "",
      },
      success: true,
      message: "Organization deleted successfully",
    };
  } catch {
    return {
      values,
      success: false,
      message: "Failed delete organization",
    };
  }
}
