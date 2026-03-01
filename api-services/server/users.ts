"use server";

import { headers } from "next/headers";
import { BACKEND_URL } from "@/constants";
import type { auth } from "@/lib/auth";
import type { ApiResponse } from "@/types/api.types";

export const getUsers = async (params?: URLSearchParams) => {
  const url = new URL(`${BACKEND_URL}/api/admin/users`);
  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  const response = await fetch(url, {
    headers: await headers(),
  });

  return (await response.json()) as ApiResponse<
    Awaited<ReturnType<typeof auth.api.listUsers>>
  >;
};
