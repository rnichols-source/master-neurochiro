import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  DollarSign, 
  TrendingUp,
  ArrowUpRight,
  Shield,
  Users,
  Calendar,
  CreditCard
} from "lucide-react";
import { fetchRevenueStats, fetchAdminStats } from "@/app/actions/admin-actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function AdminRevenuePage() {
  const [revResult, statsResult] = await Promise.all([
    fetchRevenueStats(),
    fetchAdminStats()
  ]);

  const rev = revResult.success && revResult.data ? revResult.data : {
    totalRevenue: 0,
    proRevenue: 0,
    standardRevenue: 0,
    proCount: 0,
    standardCount: 0,
    monthlyData: []
  };

  const pendingApps = statsResult.success && statsResult.data ? statsResult.data.pendingApps : 0;
  const potentialRevenue = pendingApps * 997; // Minimum estimate

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">Financial Command</p>
            <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Revenue Intelligence</h1>
          </div>
          <div className="flex gap-3">
            <div className="bg-white border border-brand-navy/10 rounded-xl px-4 py-2 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-brand-navy/40" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy">Q1 2026</span>
            </div>
          </div>
        </div>

        {/* Global Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EliteCard className="p-8 border-green-500/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-500/10 rounded-2xl">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-green-500 font-black text-[10px]">
                <ArrowUpRight className="w-3 h-3" /> +24%
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Total Gross Revenue</p>
            <h3 className="text-4xl font-black text-brand-navy tracking-tight">${rev.totalRevenue.toLocaleString()}</h3>
          </EliteCard>

          <EliteCard className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-brand-orange/10 rounded-2xl">
                <Shield className="w-5 h-5 text-brand-orange" />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Pro Tier Revenue</p>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">${rev.proRevenue.toLocaleString()}</h3>
            <p className="text-[10px] font-bold text-brand-navy/30 mt-1">{rev.proCount} Members</p>
          </EliteCard>

          <EliteCard className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-brand-navy/5 rounded-2xl">
                <CreditCard className="w-5 h-5 text-brand-navy" />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Standard Revenue</p>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">${rev.standardRevenue.toLocaleString()}</h3>
            <p className="text-[10px] font-bold text-brand-navy/30 mt-1">{rev.standardCount} Members</p>
          </EliteCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue by Month (Mock Visualization) */}
          <EliteCard className="lg:col-span-2 p-8" title="Growth Trend" subtitle="Revenue over time">
            <div className="mt-12 flex items-end gap-4 h-48">
              {rev.monthlyData.map((data: any) => {
                const height = (data.revenue / rev.totalRevenue) * 100;
                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-4 group">
                    <div className="w-full bg-brand-navy/5 rounded-xl relative overflow-hidden flex-1">
                      <div 
                        className="absolute bottom-0 left-0 w-full bg-brand-navy transition-all duration-1000 group-hover:bg-brand-orange"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <p className="text-[10px] font-black uppercase text-brand-navy/40">{data.month}</p>
                  </div>
                );
              })}
            </div>
          </EliteCard>

          {/* Pipeline Intelligence */}
          <div className="space-y-8">
            <EliteCard title="Pipeline" subtitle="Projected Revenue" className="p-8 border-brand-orange/20">
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Pending Applications</p>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-brand-orange" />
                    <span className="text-2xl font-black text-brand-navy">{pendingApps}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Estimated Value</p>
                  <h3 className="text-2xl font-black text-green-500">${potentialRevenue.toLocaleString()}</h3>
                </div>
                <Link href="/admin/applications" className="block">
                  <BrandButton variant="outline" size="sm" className="w-full text-[10px]">Review Pipeline</BrandButton>
                </Link>
              </div>
            </EliteCard>

            <EliteCard title="Efficiency" subtitle="Conversion Metrics" className="p-8">
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black uppercase text-brand-navy/40">App to Approved</p>
                  <p className="text-sm font-black text-brand-navy">68%</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black uppercase text-brand-navy/40">Approved to Paid</p>
                  <p className="text-sm font-black text-brand-navy">42%</p>
                </div>
              </div>
            </EliteCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
