import type { Breadcrumb as BreadcrumbProps } from "@/types/breadcrumb.types";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_ORGANIZATIONS_PATH,
} from "./path.constants";

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
