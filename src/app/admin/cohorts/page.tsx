import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  Users, 
  Activity,
  Search,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Shield,
  Star,
  ChevronRight,
  Filter
} from "lucide-react";
import Link from "next/link";
import { fetchMembersWithHealth } from "@/app/actions/admin-actions";
import { cn } from "@/lib/utils";

export default async function CohortHealthPage() {
  const result = await fetchMembersWithHealth();
  const members = result.success ? result.data : [];

  // Summary Metrics
  const avgHealth = members.length > 0 
    ? Math.round(members.reduce((acc: number, m: any) => acc + (m.member_health?.health_score || 0), 0) / members.length)
    : 0;
  
  const highRiskCount = members.filter((m: any) => m.member_health?.risk_level === 'high').length;

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">Program Monitoring</p>
            <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Cohort Health</h1>
          </div>
          <div className="flex gap-3">
            <div className="bg-white border border-brand-navy/10 rounded-xl px-4 py-2 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy">Active Cohort: April 2026</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EliteCard className="p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Average Health Score</p>
            <div className="flex items-baseline gap-2">
              <h3 className={cn(
                "text-3xl font-black",
                avgHealth > 80 ? "text-green-500" : avgHealth > 60 ? "text-brand-orange" : "text-red-500"
              )}>{avgHealth}/100</h3>
            </div>
          </EliteCard>
          <EliteCard className="p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">At-Risk Members</p>
            <h3 className="text-3xl font-black text-red-500">{highRiskCount}</h3>
          </EliteCard>
          <EliteCard className="p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Engagement Rate</p>
            <h3 className="text-3xl font-black text-brand-navy">92%</h3>
          </EliteCard>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/30" />
            <input 
              type="text" 
              placeholder="Search members by name or email..." 
              className="w-full bg-white border border-brand-navy/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-brand-navy/10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="px-4 py-2 bg-brand-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
              Export CSV
            </button>
          </div>
        </div>

        {/* Member Roster */}
        <EliteCard className="p-0 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-brand-navy text-white">
                <th className="text-left px-8 py-4 text-[10px] font-black uppercase tracking-widest">Member</th>
                <th className="text-center px-6 py-4 text-[10px] font-black uppercase tracking-widest">Tier</th>
                <th className="text-center px-6 py-4 text-[10px] font-black uppercase tracking-widest">Health</th>
                <th className="text-center px-6 py-4 text-[10px] font-black uppercase tracking-widest">Progress</th>
                <th className="text-center px-6 py-4 text-[10px] font-black uppercase tracking-widest">KPIs</th>
                <th className="text-right px-8 py-4 text-[10px] font-black uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-navy/5">
              {members.map((member: any) => {
                const health = member.member_health?.health_score || 0;
                const risk = member.member_health?.risk_level || 'low';
                
                return (
                  <tr key={member.id} className="hover:bg-brand-cream/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center font-black text-brand-navy">
                          {member.full_name?.[0] || 'D'}
                        </div>
                        <div>
                          <p className="text-sm font-black text-brand-navy leading-none">{member.full_name}</p>
                          <p className="text-[10px] font-bold text-brand-navy/30 mt-1">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                        member.tier === 'pro' ? "bg-brand-orange/10 text-brand-orange" : "bg-brand-navy/5 text-brand-navy/40"
                      )}>
                        {member.tier === 'pro' && <Shield className="inline w-2 h-2 mr-1" />}
                        {member.tier}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={cn(
                          "text-sm font-black",
                          health > 80 ? "text-green-500" : health > 60 ? "text-brand-orange" : "text-red-500"
                        )}>{health}</span>
                        <div className="w-12 h-1 bg-brand-navy/5 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all",
                              health > 80 ? "bg-green-500" : health > 60 ? "bg-brand-orange" : "bg-red-500"
                            )} 
                            style={{ width: `${health}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <p className="text-sm font-black text-brand-navy">{member.member_health?.modules_completed || 0}</p>
                      <p className="text-[8px] font-black uppercase text-brand-navy/30">Modules</p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <p className="text-sm font-black text-brand-navy">{member.member_health?.kpis_submitted || 0}</p>
                      <p className="text-[8px] font-black uppercase text-brand-navy/30">Submissions</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 bg-brand-navy/5 text-brand-navy hover:bg-brand-orange hover:text-white rounded-lg transition-all">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-brand-navy/5 text-brand-navy hover:bg-brand-navy hover:text-white rounded-lg transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </EliteCard>
      </div>
    </DashboardLayout>
  );
}
