"use server";

import { headers } from "next/headers";
import { BACKEND_URL } from "@/constants";
import type { auth } from "@/lib/auth";
import type { ApiResponse } from "@/types/api.types";

export const getOrganizations = async () => {
  const response = await fetch(`${BACKEND_URL}/api/admin/organizations`, {
    headers: await headers(),
  });

  return (await response.json()) as ApiResponse<{
    organizations: Awaited<ReturnType<typeof auth.api.listOrganizations>>;
  }>;
};
