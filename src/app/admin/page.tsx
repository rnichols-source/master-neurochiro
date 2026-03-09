import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AdminDashboardClient } from "./AdminDashboardClient";
import { fetchAdminStats, fetchCohortMetrics, fetchRecentActivity, fetchMastermindActivity } from "@/app/actions/admin-actions";

export default async function AdminDashboardPage() {
  const [stats, cohort, activity, mastermind] = await Promise.all([
    fetchAdminStats(),
    fetchCohortMetrics(),
    fetchRecentActivity(),
    fetchMastermindActivity()
  ]);

  return (
    <DashboardLayout>
      <AdminDashboardClient 
        initialStats={stats.success && stats.data ? stats.data : null}
        initialCohortData={cohort.success && cohort.data ? cohort.data : null}
        initialActivity={activity.success && activity.data ? activity.data : []}
        initialMastermindActivity={mastermind.success && mastermind.data ? mastermind.data : null}
      />
    </DashboardLayout>
  );
}
