"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { auth } from "@/lib/auth";
import { signInSchema } from "@/validators/sign-in";

interface SignInState {
  errors?: ReturnType<typeof z.flattenError>;
  message?: string;
}

export async function signInAction(
  _: SignInState,
  formData: FormData,
): Promise<SignInState> {
  try {
    const { email, password } = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await auth.api.signInEmail({
      body: { email, password },
    });
  } catch (error) {
    if (error instanceof z.ZodError)
      return {
        message: "Validation error",
        errors: z.flattenError(error),
      };

    return {
      message: "Failed to login",
    };
  }

  redirect("/dashboard");
}
