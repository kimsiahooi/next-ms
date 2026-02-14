import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_DASHBOARD, ADMIN_LOGIN } from "@/constants/admin/path";
import { auth } from "@/lib/auth";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect(ADMIN_LOGIN);
  }

  return redirect(ADMIN_DASHBOARD);
}
