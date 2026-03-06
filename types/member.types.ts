import type { auth } from "@/lib/auth";

export type Members = Awaited<ReturnType<typeof auth.api.listMembers>>;
