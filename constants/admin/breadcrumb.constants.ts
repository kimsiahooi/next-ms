import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_ORGANIZATION_MEMBERS_PATH,
  ADMIN_ORGANIZATIONS_PATH,
  ADMIN_USERS_PATH,
} from "@/constants/admin/path.constants";
import type { Breadcrumb as BreadcrumbProps } from "@/types/breadcrumb.types";
import type { Organization } from "@/types/organization.types";

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

export const ORGANIZATION_MEMBERS_BREADCRUMBS = (
  organization: Organization,
): BreadcrumbProps[] => [
  {
    name: "Dashboard",
    url: ADMIN_DASHBOARD_PATH,
  },
  {
    name: "Organizations",
    url: ADMIN_ORGANIZATIONS_PATH,
  },
  {
    name: organization?.name,
    url: ADMIN_ORGANIZATION_MEMBERS_PATH(organization),
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
