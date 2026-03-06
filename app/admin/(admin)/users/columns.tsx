"use client";

import type { ColumnDef } from "@tanstack/react-table";
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
