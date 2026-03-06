"use client";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { ADMIN_ORGANIZATION_MEMBERS_PATH } from "@/constants/admin/path.constants";
import type { Organizations } from "@/types/organization.types";

export default function OrganizationAction({
  organization,
}: {
  organization: Organizations[number];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const deleteAction = async () => {
    setSubmitting(true);

    const response = await deleteOrganization({ id: organization.id });

    setSubmitting(false);

    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return;
    }

    setOpen(false);
    router.refresh();
    toast.success(response.message);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={ADMIN_ORGANIZATION_MEMBERS_PATH(organization)}>
              View Members
            </Link>
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

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
            onClick={deleteAction}>
            {submitting && <Spinner />}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
