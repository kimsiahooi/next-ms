"use client";

import type { auth } from "@/lib/auth";
import type { ApiResponse } from "@/types/api.types";

export const login = async (payload: { email: string; password: string }) => {
  const response = await fetch(`/api/admin/auth/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return (await response.json()) as ApiResponse<{
    user: Awaited<ReturnType<typeof auth.api.signInEmail>>;
  }>;
};

export const logout = async () => {
  const response = await fetch(`/api/admin/auth/logout`, {
    method: "POST",
  });

  return (await response.json()) as ApiResponse;
};
