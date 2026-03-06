import type { auth } from "@/lib/auth";

export type Users = Awaited<ReturnType<typeof auth.api.listUsers>>;
