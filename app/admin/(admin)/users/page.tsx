import { getUsers } from "@/api-services/server/users";
import DataTable from "@/components/base/data-tables/data-table";
import AdminLayout from "@/components/layouts/admin-layout";
import { USERS_BREADCRUMBS } from "@/constants/admin/breadcrumb.constants";
import { columns } from "./columns";
import CreateForm from "./create";

export default async function AdminUserPage() {
  const data = await getUsers();

  if (!data.success) {
    throw new Error(data.message);
  }

  const users = data.data.users;

  return (
    <AdminLayout breadcrumbs={USERS_BREADCRUMBS}>
      <div className="flex items-center justify-end flex-wrap">
        <CreateForm />
      </div>
      <DataTable data={users} columns={columns} />
    </AdminLayout>
  );
}
