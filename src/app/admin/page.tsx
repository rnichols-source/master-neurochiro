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
  if (!user) redirect("/portal");

  // Check metadata first
  let isAdmin = user.app_metadata?.role === 'admin';

  // Fallback to profiles table (matching sidebar logic)
  if (!isAdmin) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single();
    isAdmin = profile?.tier === 'admin';
  }

  if (!isAdmin) {
    console.warn(`[ADMIN] Unauthorized access attempt to dashboard by ${user.email}`);
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
        <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100">
          <h1 className="text-xl font-black text-brand-navy">Something went wrong</h1>
          <p className="text-sm text-brand-gray mt-2">Could not load admin data. Try refreshing.</p>
          <a href="/admin" className="text-sm font-bold text-brand-orange mt-4 inline-block hover:text-brand-navy transition-colors">
            Refresh →
          </a>
        </div>
      </DashboardLayout>
    );
  }
}
