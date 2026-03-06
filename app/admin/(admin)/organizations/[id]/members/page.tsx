import { getMembers } from "@/api-services/server/members";
import { getOrganization } from "@/api-services/server/organizations";
import DataTable from "@/components/base/data-tables/data-table";
import AdminLayout from "@/components/layouts/admin-layout";
import { ORGANIZATION_MEMBERS_BREADCRUMBS } from "@/constants/admin/breadcrumb.constants";
import { columns } from "./columns";

export default async function AdminMembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const organization = await getOrganization(id);

  if (!organization.success) {
    throw new Error(organization.message);
  }

  const data = await getMembers(id);

  if (!data.success) {
    throw new Error(data.message);
  }

  const members = data.data.members ?? [];

  return (
    <AdminLayout
      breadcrumbs={ORGANIZATION_MEMBERS_BREADCRUMBS(
        organization.data.organization,
      )}>
      <DataTable data={members} columns={columns} />
    </AdminLayout>
  );
}
