"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { loginSchema } from "@/schemas/auth.schemas";
import type { FormState } from "@/schemas/form.schemas";

export async function loginAction(
  _: FormState<typeof loginSchema>,
  formData: FormData,
) {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const { email, password } = loginSchema.parse(values);

    await auth.api.signInEmail({
      body: { email, password },
    });
  } catch (error) {
    if (error instanceof z.ZodError)
      return {
        values,
        success: false,
        errors: z.flattenError(error).fieldErrors,
      };

    return {
      values,
      success: false,
      errors: null,
      message: "Failed to sign in",
    };
  }

  redirect("/dashboard");
}

export async function signOutAction(_: FormState) {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch {
    return {
      success: false,
      errors: null,
      message: "Failed to sign out",
    };
  }

  redirect("/login");
}
