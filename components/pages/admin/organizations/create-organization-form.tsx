"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { createOrganization } from "@/api-services/client/organizations";
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

export default function CreateOrganizationForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState<ApiZodErrors>();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(undefined);

    const response = await createOrganization({ name, slug });

    setSubmitting(false);

    if (!response.success) {
      if (response.errors) {
        setErrors(response.errors);
      } else {
        toast.error(response.message);
      }
      return;
    }

    setName("");
    setSlug("");
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
          <DialogTitle>Create Organization</DialogTitle>
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
            <Field data-invalid={!!errors?.fieldErrors.slug?.length}>
              <div className="flex items-center">
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
              </div>
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                aria-invalid={!!errors?.fieldErrors.slug?.length}
                type="text"
                placeholder="Enter Slug"
              />
              {errors?.fieldErrors.slug && (
                <FieldError>{errors.fieldErrors.slug[0]}</FieldError>
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
