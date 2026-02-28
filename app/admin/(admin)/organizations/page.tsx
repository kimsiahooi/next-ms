import { headers } from "next/headers";
import AdminLayout from "@/components/layouts/admin-layout";
import CreateOrganizationForm from "@/components/pages/admin/organizations/create-organization-form";
import DeleteOrganizationForm from "@/components/pages/admin/organizations/delete-organization-form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ORGANIZATION_BREADCRUMBS } from "@/constants/admin/breadcrumb.constants";
import { auth } from "@/lib/auth";

export default async function AdminOrganizationPage() {
  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });

  return (
    <AdminLayout breadcrumbs={ORGANIZATION_BREADCRUMBS}>
      <div className="flex items-center justify-end flex-wrap">
        <CreateOrganizationForm />
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent organizations.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((organization) => (
              <TableRow key={organization.id}>
                <TableCell>{organization.name}</TableCell>
                <TableCell>{organization.slug}</TableCell>
                <TableCell>
                  {new Date(organization.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <DeleteOrganizationForm organization={organization} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
