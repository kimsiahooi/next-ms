import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/base/sidebars/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const open = sidebarState ? sidebarState === "true" : true;

  return (
    <SidebarProvider defaultOpen={open}>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
