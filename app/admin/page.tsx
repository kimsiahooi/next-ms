import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_LOGIN_PATH,
} from "@/constants/admin/path.constants";
import { auth } from "@/lib/auth";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect(ADMIN_LOGIN_PATH);
  }

  return redirect(ADMIN_DASHBOARD_PATH);
}
