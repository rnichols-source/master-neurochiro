import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Search, Mail } from "lucide-react";
import { fetchMembersWithHealth } from "@/app/actions/admin-actions";
import { cn } from "@/lib/utils";
import { CohortSearch } from "./CohortSearch";

export default async function CohortHealthPage() {
  const result = await fetchMembersWithHealth();
  const members = result.success && result.data ? result.data : [];

  const totalMembers = members.length;
  const avgHealth = totalMembers > 0
    ? Math.round(members.reduce((acc: number, m: any) => acc + (m.member_health?.health_score || 0), 0) / totalMembers)
    : 0;
  const atRiskCount = members.filter((m: any) => (m.member_health?.health_score || 0) < 40).length;
  const activeCount = members.filter((m: any) => (m.member_health?.modules_completed || 0) > 0).length;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Members</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">
            {totalMembers} members · {activeCount} active · {atRiskCount} need attention
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-4 text-center">
            <p className="text-2xl font-black text-brand-navy">{totalMembers}</p>
            <p className="text-xs text-brand-gray">Total</p>
          </div>
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-4 text-center">
            <p className={cn("text-2xl font-black", avgHealth > 60 ? "text-green-600" : "text-red-500")}>{avgHealth}%</p>
            <p className="text-xs text-brand-gray">Avg Health</p>
          </div>
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-4 text-center">
            <p className={cn("text-2xl font-black", atRiskCount > 0 ? "text-red-500" : "text-green-600")}>{atRiskCount}</p>
            <p className="text-xs text-brand-gray">At Risk</p>
          </div>
        </div>

        {/* Search + Member List */}
        <CohortSearch members={members} />
      </div>
    </DashboardLayout>
  );
}
