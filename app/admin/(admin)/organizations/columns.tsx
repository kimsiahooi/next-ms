"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import type { Organizations } from "@/types/organization.types";
import OrganizationAction from "./action";

export const columns: ColumnDef<Organizations[number]>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    header: "Slug",
    accessorKey: "slug",
    cell: ({ row }) => row.getValue("slug"),
  },
  {
    header: "Logo",
    accessorKey: "logo",
    cell: ({ row }) =>
      row.original.logo && (
        <div className="relative size-14">
          <Image
            src={row.original.logo}
            alt={row.original.name}
            fill
            className="object-cover"
            unoptimized
            loading="eager"
          />
        </div>
      ),
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => {
      const organization = row.original;

      return <OrganizationAction organization={organization} />;
    },
  },
];
