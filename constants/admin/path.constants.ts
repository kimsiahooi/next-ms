import type { Organization, Organizations } from "@/types/organization.types";

const ADMIN_PATH = "/admin";

export const ADMIN_LOGIN_PATH = `${ADMIN_PATH}/login`;
export const ADMIN_SIGNUP_PATH = `${ADMIN_PATH}/sign-up`;
export const ADMIN_DASHBOARD_PATH = `${ADMIN_PATH}/dashboard`;
export const ADMIN_ORGANIZATIONS_PATH = `${ADMIN_PATH}/organizations`;
export const ADMIN_USERS_PATH = `${ADMIN_PATH}/users`;

export const ADMIN_ORGANIZATION_MEMBERS_PATH = (
  organization: Organizations[number] | Organization,
) => `${ADMIN_ORGANIZATIONS_PATH}/${organization?.id}/members`;
