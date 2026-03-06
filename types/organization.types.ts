import type { auth } from "@/lib/auth";

export type Organizations = Awaited<
  ReturnType<typeof auth.api.listOrganizations>
>;

export type Organization = Awaited<
  ReturnType<typeof auth.api.getFullOrganization>
>;
