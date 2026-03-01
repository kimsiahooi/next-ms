import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_ORGANIZATIONS_PATH,
  ADMIN_USERS_PATH,
} from "@/constants/admin/path.constants";
import type { Breadcrumb as BreadcrumbProps } from "@/types/breadcrumb.types";

export const DASHBOARD_BREADCRUMBS: BreadcrumbProps[] = [
  {
    name: "Dashboard",
    url: ADMIN_DASHBOARD_PATH,
  },
];

export const ORGANIZATION_BREADCRUMBS: BreadcrumbProps[] = [
  {
    name: "Dashboard",
    url: ADMIN_DASHBOARD_PATH,
  },
  {
    name: "Organizations",
    url: ADMIN_ORGANIZATIONS_PATH,
  },
];

export const USERS_BREADCRUMBS: BreadcrumbProps[] = [
  {
    name: "Dashboard",
    url: ADMIN_DASHBOARD_PATH,
  },
  {
    name: "Users",
    url: ADMIN_USERS_PATH,
  },
];
