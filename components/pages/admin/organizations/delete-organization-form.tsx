"use client";

import { Trash2 } from "lucide-react";
import Form from "next/form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteOrganizationAction } from "@/actions/organization.actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useActionState } from "@/hooks/use-action-state";
import type { deleteOrganizationSchema } from "@/schemas/organization.schemas";

export default function DeleteOrganizationForm({
  organization: { id, name, slug },
}: {
  organization: { id: string; name: string; slug: string };
}) {
  const [open, setOpen] = useState(false);

  const [formState, formAction, pending] = useActionState<
    typeof deleteOrganizationSchema
  >(deleteOrganizationAction, {
    values: {
      id,
      name,
      slug,
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant="destructive" size="icon-xs">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form action={formAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Organization</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            id="id"
            name="id"
            defaultValue={formState.values?.id}
            type="hidden"
          />
          <Input
            id="name"
            name="name"
            defaultValue={formState.values?.name}
            type="hidden"
          />
          <Input
            id="slug"
            name="slug"
            defaultValue={formState.values?.slug}
            type="hidden"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit" disabled={pending} variant="destructive">
              {pending && <Spinner />}
              Delete
            </Button>
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
