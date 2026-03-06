"use client";

import { Building2, GalleryVerticalEnd, Gauge, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavMain } from "@/components/base/sidebars/nav-main";
import { NavUser } from "@/components/base/sidebars/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { APP_NAME } from "@/constants";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_ORGANIZATIONS_PATH,
  ADMIN_USERS_PATH,
} from "@/constants/admin/path.constants";
import { useSession } from "@/lib/auth-client";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: ADMIN_DASHBOARD_PATH,
        icon: Gauge,
        isActive: pathname.startsWith(ADMIN_DASHBOARD_PATH),
      },
      {
        title: "Organizations",
        url: ADMIN_ORGANIZATIONS_PATH,
        icon: Building2,
        isActive: pathname.startsWith(ADMIN_ORGANIZATIONS_PATH),
      },
      {
        title: "Users",
        url: ADMIN_USERS_PATH,
        icon: Users,
        isActive: pathname.startsWith(ADMIN_USERS_PATH),
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">{APP_NAME}</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
