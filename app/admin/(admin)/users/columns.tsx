"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import type { auth } from "@/lib/auth";
import UserAction from "./action";

type User = Awaited<ReturnType<typeof auth.api.listUsers>>["users"][number];

export const columns: ColumnDef<User>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => {
      const { image, name } = row.original;

      return (
        image && (
          <div className="relative size-14">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              unoptimized
              loading="eager"
            />
          </div>
        )
      );
    },
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => row.getValue("role"),
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
      const user = row.original;

      return <UserAction user={user} />;
    },
  },
];
