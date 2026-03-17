import { createClient } from "@/lib/supabase/server";
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
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Basic security check before even fetching stats
  if (!user || user.app_metadata?.role !== 'admin') {
    console.warn(`[ADMIN] Unauthorized access attempt to dashboard by ${user?.email || 'unknown'}`);
    redirect("/portal");
  }

  try {
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
          initialStats={stats?.success && stats.data ? stats.data : null}
          initialCohortData={cohort?.success && cohort.data ? cohort.data : null}
          initialActivity={(activity?.success && activity.data) ? activity.data : []}
          initialMastermindActivity={mastermind?.success && mastermind.data ? mastermind.data : null}
          initialRevenueData={revenue?.success && revenue.data ? revenue.data : null}
          initialAtRisk={(atRisk?.success && atRisk.data) ? atRisk.data : []}
          initialVaultStats={(vault?.success && vault.data) ? vault.data : []}
          initialHealth={health?.success && health.data ? health.data : null}
        />
      </DashboardLayout>
    );
  } catch (err) {
    console.error("[ADMIN DASHBOARD ERROR]", err);
    return (
      <DashboardLayout>
        <div className="p-12 text-center bg-red-50 rounded-[2rem] border border-red-100">
          <h1 className="text-2xl font-black text-brand-navy">Dashboard Intelligence Failure</h1>
          <p className="text-brand-orange uppercase tracking-widest text-[10px] mt-2 font-black">
            A critical error occurred while fetching system metrics.
          </p>
          <div className="mt-8">
            <a href="/admin" className="text-xs font-bold text-brand-navy underline underline-offset-4">
              Retry Connection
            </a>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}
