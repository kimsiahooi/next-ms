"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteOrganization } from "@/api-services/client/organizations";
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
import { Spinner } from "@/components/ui/spinner";

export default function DeleteOrganizationForm({
  organization: { id },
}: {
  organization: { id: string; name: string; slug: string };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);

    const response = await deleteOrganization({ id });

    setSubmitting(false);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    setOpen(false);
    router.refresh();
    toast.success(response.message);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant="destructive" size="icon-xs">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Organization</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            type="button"
            disabled={submitting}
            variant="destructive"
            onClick={submit}>
            {submitting && <Spinner />}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
