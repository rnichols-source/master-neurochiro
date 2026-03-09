import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AdminDashboardClient } from "./AdminDashboardClient";
import { 
  fetchAdminStats, 
  fetchCohortMetrics, 
  fetchRecentActivity, 
  fetchMastermindActivity,
  fetchRevenueStats,
  fetchAtRiskMembers,
  fetchVaultAnalytics,
  fetchSystemHealth
} from "@/app/actions/admin-actions";

export default async function AdminDashboardPage() {
  const [stats, cohort, activity, mastermind, revenue, atRisk, vault, health] = await Promise.all([
    fetchAdminStats(),
    fetchCohortMetrics(),
    fetchRecentActivity(),
    fetchMastermindActivity(),
    fetchRevenueStats(),
    fetchAtRiskMembers(),
    fetchVaultAnalytics(),
    fetchSystemHealth()
  ]);

  return (
    <DashboardLayout>
      <AdminDashboardClient 
        initialStats={stats.success && stats.data ? stats.data : null}
        initialCohortData={cohort.success && cohort.data ? cohort.data : null}
        initialActivity={activity.success && activity.data ? activity.data : []}
        initialMastermindActivity={mastermind.success && mastermind.data ? mastermind.data : null}
        initialRevenueData={revenue.success && revenue.data ? revenue.data : null}
        initialAtRisk={atRisk.success && atRisk.data ? atRisk.data : []}
        initialVaultStats={vault.success && vault.data ? vault.data : []}
        initialHealth={health.success && health.data ? health.data : null}
      />
    </DashboardLayout>
  );
}
