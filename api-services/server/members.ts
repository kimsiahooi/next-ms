"use server";

import { headers } from "next/headers";
import { BACKEND_URL } from "@/constants";
import type { ApiResponse } from "@/types/api.types";
import type { Members } from "@/types/member.types";

export const getMembers = async (organizationId: string) => {
  const response = await fetch(
    `${BACKEND_URL}/api/admin/organizations/${organizationId}/members`,
    {
      headers: await headers(),
    },
  );

  return (await response.json()) as ApiResponse<Members>;
};
