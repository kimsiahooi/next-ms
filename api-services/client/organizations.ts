"use client";

import type { auth } from "@/lib/auth";
import type { ApiResponse } from "@/types/api.types";

export const createOrganization = async (payload: {
  name: string;
  slug: string;
  logo?: File;
}) => {
  const body = new FormData();

  body.append("name", payload.name);
  body.append("slug", payload.slug);

  if (payload.logo) {
    body.append("logo", payload.logo);
  }

  const response = await fetch(`/api/admin/organizations`, {
    method: "POST",
    body,
  });

  return (await response.json()) as ApiResponse<{
    organization: Awaited<ReturnType<typeof auth.api.createOrganization>>;
  }>;
};

export const deleteOrganization = async (payload: { id: string }) => {
  const response = await fetch(`/api/admin/organizations/${payload.id}`, {
    method: "DELETE",
  });

  return (await response.json()) as ApiResponse;
};
