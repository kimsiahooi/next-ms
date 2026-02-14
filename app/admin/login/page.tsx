import { GalleryVerticalEnd } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/pages/admin/login/login-form";
import { APP_NAME } from "@/constants";
import { ADMIN_DASHBOARD } from "@/constants/admin/path";
import { auth } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect(ADMIN_DASHBOARD);
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {APP_NAME}
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AdminLoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative max-lg:hidden"></div>
    </div>
  );
}
