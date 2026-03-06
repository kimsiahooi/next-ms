import { getOrganizations } from "@/api-services/server/organizations";
import DataTable from "@/components/base/data-tables/data-table";
import AdminLayout from "@/components/layouts/admin-layout";
import { ORGANIZATION_BREADCRUMBS } from "@/constants/admin/breadcrumb.constants";
import { columns } from "./columns";
import CreateForm from "./create";

export default async function AdminOrganizationPage() {
  const data = await getOrganizations();

  if (!data.success) {
    throw new Error(data.message);
  }

  const organizations = data.data.organizations;

  return (
    <AdminLayout breadcrumbs={ORGANIZATION_BREADCRUMBS}>
      <div className="flex items-center justify-end flex-wrap">
        <CreateForm />
      </div>
      <DataTable data={organizations} columns={columns} />
    </AdminLayout>
  );
}
