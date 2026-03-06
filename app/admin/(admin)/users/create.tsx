"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { createUser } from "@/api-services/client/users";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { ApiZodErrors } from "@/types/api.types";

export default function CreateUserForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File>();
  const [errors, setErrors] = useState<ApiZodErrors>();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(undefined);

    const response = await createUser({ name, email, password, image });

    setSubmitting(false);

    if (!response.success) {
      if (response.errors) {
        setErrors(response.errors);
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
      return;
    }

    setName("");
    setEmail("");
    setPassword("");
    setImage(undefined);
    setOpen(false);
    router.refresh();
    toast.success(response.message);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-6">
          <FieldGroup>
            <Field data-invalid={!!errors?.fieldErrors.name?.length}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors?.fieldErrors.name?.length}
                type="text"
                placeholder="Enter Name"
              />
              {errors?.fieldErrors.name && (
                <FieldError>{errors.fieldErrors.name[0]}</FieldError>
              )}
            </Field>
            <Field data-invalid={!!errors?.fieldErrors.email?.length}>
              <div className="flex items-center">
                <FieldLabel htmlFor="email">Email</FieldLabel>
              </div>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors?.fieldErrors.email?.length}
                type="email"
                placeholder="Enter Email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors?.fieldErrors.password?.length}
                type="password"
                placeholder="Enter Password"
              />
              {errors?.fieldErrors.password && (
                <FieldError>{errors.fieldErrors.password[0]}</FieldError>
              )}
            </Field>
            <Field data-invalid={!!errors?.fieldErrors.image?.length}>
              <div className="flex items-center">
                <FieldLabel htmlFor="image">Image</FieldLabel>
              </div>
              <Input
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files?.[0])}
                aria-invalid={!!errors?.fieldErrors.image?.length}
                type="file"
                accept="image/webp,image/gif"
              />
              {errors?.fieldErrors.image && (
                <FieldError>{errors.fieldErrors.image[0]}</FieldError>
              )}
            </Field>
            <Field>
              <Button type="submit" disabled={submitting}>
                {submitting && <Spinner />}
                Submit
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
