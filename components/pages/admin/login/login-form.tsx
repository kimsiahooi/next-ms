"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { login } from "@/api-services/client/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_SIGNUP_PATH,
} from "@/constants/admin/path.constants";
import { useSession } from "@/lib/auth-client";
import type { ApiZodErrors } from "@/types/api.types";

export default function AdminLoginForm() {
  const router = useRouter();
  const { refetch } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ApiZodErrors>();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(undefined);

    const response = await login({ email, password });

    setSubmitting(false);

    if (!response.success) {
      if (response.errors) {
        setErrors(response.errors);
      } else {
        toast.error(response.message);
      }
      return;
    }

    refetch();
    router.push(ADMIN_DASHBOARD_PATH);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={submit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field data-invalid={!!errors?.fieldErrors.email?.length}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors?.fieldErrors.email?.length}
          />
          {errors?.fieldErrors.email && (
            <FieldError>{errors.fieldErrors.email[0]}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors?.fieldErrors.password?.length}>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors?.fieldErrors.password?.length}
          />
          {errors?.fieldErrors.password && (
            <FieldError>{errors.fieldErrors.password[0]}</FieldError>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={submitting}>
            {submitting && <Spinner />}
            Login
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              href={ADMIN_SIGNUP_PATH}
              className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
