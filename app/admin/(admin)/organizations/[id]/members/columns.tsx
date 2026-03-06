"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import type { Members } from "@/types/member.types";

export const columns: ColumnDef<Members["members"][number]>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const { name } = row.original.user;

      return name;
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      const { email } = row.original.user;

      return email;
    },
  },
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => {
      const { image, name } = row.original.user;

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
];
