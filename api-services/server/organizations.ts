"use server";

import { headers } from "next/headers";
import { BACKEND_URL } from "@/constants";
import type { ApiResponse } from "@/types/api.types";
import type { Organization, Organizations } from "@/types/organization.types";

export const getOrganizations = async () => {
  const response = await fetch(`${BACKEND_URL}/api/admin/organizations`, {
    headers: await headers(),
  });

  return (await response.json()) as ApiResponse<{
    organizations: Organizations;
  }>;
};

export const getOrganization = async (organizationId: string) => {
  const response = await fetch(
    `${BACKEND_URL}/api/admin/organizations/${organizationId}`,
    {
      headers: await headers(),
    },
  );

  return (await response.json()) as ApiResponse<{
    organization: Organization;
  }>;
};
