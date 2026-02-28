import AdminLayout from "@/components/layouts/admin-layout";
import { DASHBOARD_BREADCRUMBS } from "@/constants/admin/breadcrumb.constants";

export default function AdminDashboardPage() {
  return (
    <AdminLayout breadcrumbs={DASHBOARD_BREADCRUMBS}>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
    </AdminLayout>
  );
}
