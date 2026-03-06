"use client";

import type { auth } from "@/lib/auth";
import type { ApiResponse } from "@/types/api.types";

export const createUser = async (payload: {
  email: string;
  password: string;
  name: string;
}) => {
  const body = JSON.stringify(payload);

  const response = await fetch(`/api/admin/users`, {
    method: "POST",
    body,
  });

  return (await response.json()) as ApiResponse<{
    user: Awaited<ReturnType<typeof auth.api.createUser>>;
  }>;
};

export const deleteUser = async (payload: { id: string }) => {
  const response = await fetch(`/api/admin/users/${payload.id}`, {
    method: "DELETE",
  });

  return (await response.json()) as ApiResponse;
};
