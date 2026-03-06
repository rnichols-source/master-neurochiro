import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AdminDashboardClient } from "./AdminDashboardClient";
import { fetchAdminStats, fetchCohortMetrics, fetchRecentActivity } from "@/app/actions/admin-actions";

export default async function AdminDashboardPage() {
  const [stats, cohort, activity] = await Promise.all([
    fetchAdminStats(),
    fetchCohortMetrics(),
    fetchRecentActivity()
  ]);

  return (
    <DashboardLayout>
      <AdminDashboardClient 
        initialStats={stats.success ? stats.data : null}
        initialCohortData={cohort.success ? cohort.data : null}
        initialActivity={activity.success ? activity.data : []}
      />
    </DashboardLayout>
  );
}
