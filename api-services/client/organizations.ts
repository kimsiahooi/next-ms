"use client";

import type { auth } from "@/lib/auth";
import type { ApiResponse } from "@/types/api.types";

export const createOrganization = async (payload: {
  name: string;
  slug: string;
}) => {
  const response = await fetch(`/api/admin/organizations`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return (await response.json()) as ApiResponse<{
    organizations: Awaited<ReturnType<typeof auth.api.createOrganization>>;
  }>;
};

export const deleteOrganization = async (payload: { id: string }) => {
  const response = await fetch(`/api/admin/organizations/${payload.id}`, {
    method: "DELETE",
  });

  return (await response.json()) as ApiResponse;
};
