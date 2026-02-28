"use client";

import Form from "next/form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createOrganizationAction } from "@/actions/organization.actions";
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
import { useActionState } from "@/hooks/use-action-state";
import type { createOrganizationSchema } from "@/schemas/organization.schemas";

export default function CreateOrganizationForm() {
  const [open, setOpen] = useState(false);

  const [formState, formAction, pending] = useActionState<
    typeof createOrganizationSchema
  >(createOrganizationAction, {
    values: {
      name: "",
      slug: "",
    },
  });

  useEffect(() => {
    if (formState.message) {
      if (formState.success) {
        toast.success(formState.message);
        setOpen(false);
      } else {
        toast.error(formState.message);
      }
    }
  }, [formState]);

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
        <Form action={formAction} className="flex flex-col gap-6">
          <FieldGroup>
            <Field data-invalid={!!formState.errors?.name?.length}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                defaultValue={formState.values?.name}
                aria-invalid={!!formState.errors?.name?.length}
                type="text"
                placeholder="Enter Name"
              />
              {formState.errors?.name && (
                <FieldError>{formState.errors.name[0]}</FieldError>
              )}
            </Field>
            <Field data-invalid={!!formState.errors?.slug?.length}>
              <div className="flex items-center">
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
              </div>
              <Input
                id="slug"
                name="slug"
                defaultValue={formState.values?.slug}
                aria-invalid={!!formState.errors?.slug?.length}
                type="text"
                placeholder="Enter Slug"
              />
              {formState.errors?.slug && (
                <FieldError>{formState.errors.slug[0]}</FieldError>
              )}
            </Field>
            <Field>
              <Button type="submit" disabled={pending}>
                {pending && <Spinner />}
                Submit
              </Button>
            </Field>
          </FieldGroup>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
