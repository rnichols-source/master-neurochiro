"use client";

import { useState, useEffect, useMemo } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { KPIEntryModal } from "@/components/portal/KPIEntryModal";
import { fetchKPIEntries } from "@/app/actions/kpi-actions";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  Plus, 
  Calendar,
  FileSpreadsheet,
  Target,
  Loader2,
  Activity,
  AlertCircle,
  Zap,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function KPITrackerClient({ initialData, userName = "Doctor" }: { initialData: any[], userName?: string }) {
  const [activeMetric, setActiveMetric] = useState<"patient_visits" | "collections">("patient_visits");
  const [activeRange, setActiveRange] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kpiData, setKpiData] = useState<any[]>(initialData.map((entry: any) => ({
    ...entry,
    week: new Date(entry.week_start_date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
  })));

  const filteredData = useMemo(() => {
    if (activeRange === "ALL") return kpiData;
    const now = new Date();
    const days = activeRange === "7D" ? 7 : activeRange === "30D" ? 30 : 90;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return kpiData.filter(d => new Date(d.week_start_date) >= cutoff);
  }, [kpiData, activeRange]);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchKPIEntries();
    if (result.success && result.data) {
      const formatted = result.data.map((entry: any) => ({
        ...entry,
        week: new Date(entry.week_start_date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
      }));
      setKpiData(formatted);
    }
    setLoading(false);
  };

  const latestStats = kpiData.length > 0 ? kpiData[kpiData.length - 1] : {
    patient_visits: 0,
    collections: 0,
    new_patients: 0,
    care_plans_accepted: 0,
    wins: "No entries yet",
    bottlenecks: "No entries yet"
  };

  const conversionRate = latestStats.new_patients > 0 
    ? Math.round((latestStats.care_plans_accepted / latestStats.new_patients) * 100) 
    : 0;

  // Mastermind Benchmarks
  const benchmarks = {
    collections: { avg: 45000, elite: 120000 },
    new_patients: { avg: 15, elite: 40 },
    patient_visits: { avg: 120, elite: 350 },
    conversion: { avg: 65, elite: 92 }
  };

  // Revenue Gap Detection Logic
  const profitLeak = useMemo(() => {
    if (kpiData.length === 0) return null;

    const leaks = [];

    // Check Conversion Leak
    if (conversionRate < benchmarks.conversion.avg) {
      const lostRevenue = Math.round((benchmarks.conversion.avg - conversionRate) / 100 * latestStats.new_patients * 5000);
      leaks.push({
        type: 'conversion',
        severity: 'critical',
        title: 'Case Acceptance Below Average',
        message: `Your acceptance rate (${conversionRate}%) is below the group average of ${benchmarks.conversion.avg}%. That's roughly $${lostRevenue.toLocaleString()} in missed revenue this month.`,
        action: 'Watch Communication Module',
        link: '/portal/curriculum/week-3-communication'
      });
    }

    // Check NP Volume Leak
    if (latestStats.new_patients < benchmarks.new_patients.avg) {
      leaks.push({
        type: 'marketing',
        severity: 'warning',
        title: 'New Patients Below Average',
        message: 'Your new patient volume is below the group average. Focus on marketing and patient reactivation this week.',
        action: 'Open Marketing Module',
        link: '/portal/curriculum/week-7-marketing'
      });
    }

    // Check PVA/Retention Leak (if we had PV / NP data over time)
    
    return leaks.sort((a, b) => (a.severity === 'critical' ? -1 : 1))[0] || null;
  }, [latestStats, conversionRate, kpiData]);

  const calculateGrowth = (metric: string) => {
    if (kpiData.length < 2) return 0;
    const current = kpiData[kpiData.length - 1][metric];
    const previous = kpiData[kpiData.length - 2][metric];
    if (!previous || previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  return (
    <div className="space-y-8 md:space-y-12 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            KPI Tracker
          </h1>
          <p className="text-sm text-brand-gray font-medium mt-1">Track your weekly practice numbers.</p>
        </div>
        <BrandButton
          variant="accent"
          className="gap-2 w-full md:w-auto py-3 text-xs"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> New Entry
        </BrandButton>
      </div>

      {/* Revenue Gap Alert */}
      {profitLeak && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group",
            profitLeak.severity === 'critical' ? "bg-red-50 border-red-100" : "bg-brand-orange/5 border-brand-orange/10"
          )}
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <AlertCircle size={120} className={profitLeak.severity === 'critical' ? "text-red-600" : "text-brand-orange"} />
          </div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
              profitLeak.severity === 'critical' ? "bg-red-600 text-white shadow-red-200" : "bg-brand-orange text-white shadow-brand-orange/20"
            )}>
              <Zap size={28} />
            </div>
            <div className="max-w-xl">
              <h3 className={cn("text-xl font-black tracking-tight", profitLeak.severity === 'critical' ? "text-red-900" : "text-brand-navy")}>
                {profitLeak.title}
              </h3>
              <p className={cn("text-sm font-medium mt-1 leading-relaxed", profitLeak.severity === 'critical' ? "text-red-700" : "text-brand-gray")}>
                {profitLeak.message}
              </p>
            </div>
          </div>

          <Link href={profitLeak.link} className="w-full md:w-auto relative z-10">
            <button className={cn(
              "px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 group/btn",
              profitLeak.severity === 'critical' ? "bg-red-600 text-white hover:bg-red-700" : "bg-brand-navy text-white hover:bg-brand-orange"
            )}>
              {profitLeak.action} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      )}

      {/* Overview Chart */}
      <EliteCard className="p-0 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-brand-navy/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-6 md:gap-8">
            <button 
              onClick={() => setActiveMetric("patient_visits")}
              className={`text-left transition-all ${activeMetric === "patient_visits" ? "opacity-100" : "opacity-40 hover:opacity-60"}`}
            >
              <p className="text-xs font-black uppercase tracking-widest text-brand-navy/60">Total Visits</p>
              <h4 className="text-xl md:text-2xl font-black text-brand-navy">
                {latestStats.patient_visits} 
                <span className={`text-xs md:text-xs font-bold ml-1 ${calculateGrowth('patient_visits') >= 0 ? 'text-green-500' : 'text-brand-orange'}`}>
                  {calculateGrowth('patient_visits') >= 0 ? '+' : ''}{calculateGrowth('patient_visits')}%
                </span>
              </h4>
            </button>
            <div className="w-px h-8 md:h-10 bg-brand-navy/10" />
            <button 
              onClick={() => setActiveMetric("collections")}
              className={`text-left transition-all ${activeMetric === "collections" ? "opacity-100" : "opacity-40 hover:opacity-60"}`}
            >
              <p className="text-xs font-black uppercase tracking-widest text-brand-navy/60">Collections</p>
              <h4 className="text-xl md:text-2xl font-black text-brand-navy">
                ${(latestStats.collections / 1000).toFixed(1)}k 
                <span className={`text-xs md:text-xs font-bold ml-1 ${calculateGrowth('collections') >= 0 ? 'text-green-500' : 'text-brand-orange'}`}>
                  {calculateGrowth('collections') >= 0 ? '+' : ''}{calculateGrowth('collections')}%
                </span>
              </h4>
            </button>
          </div>
          
          <div className="flex gap-1 bg-brand-navy/5 p-1 rounded-xl overflow-x-auto no-scrollbar">
            {["7D", "30D", "90D", "ALL"].map(range => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`flex-1 px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap touch-target ${activeRange === range ? "bg-white text-brand-navy shadow-sm" : "text-brand-navy/40 hover:text-brand-navy"}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[250px] md:h-[400px] w-full p-4 md:p-8 bg-gradient-to-b from-white to-brand-cream/30 flex items-center justify-center">
          {loading ? (
            <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-brand-orange" />
          ) : filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D66829" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#D66829" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E2D3B10" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 700, fill: '#1E2D3B40' }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 40px -10px rgba(30, 45, 59, 0.1)',
                    padding: '8px md:12px'
                  }}
                  itemStyle={{ fontSize: '11px', fontWeight: 900, color: '#1E2D3B' }}
                />
                <Area 
                  type="monotone" 
                  dataKey={activeMetric} 
                  stroke="#D66829" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorMetric)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center space-y-4 px-6">
              <p className="text-brand-gray text-sm font-medium">No KPI data recorded yet.</p>
              <BrandButton variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>Submit First Entry</BrandButton>
            </div>
          )}
        </div>
      </EliteCard>

      {/* Your Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "New Patients", value: latestStats.new_patients, growth: calculateGrowth('new_patients'), avg: benchmarks.new_patients.avg, top: benchmarks.new_patients.elite },
          { label: "Collections", value: `$${(latestStats.collections / 1000).toFixed(1)}k`, growth: calculateGrowth('collections'), avg: `$${benchmarks.collections.avg/1000}k`, top: `$${benchmarks.collections.elite/1000}k` },
          { label: "Acceptance", value: `${conversionRate}%`, growth: null, avg: `${benchmarks.conversion.avg}%`, top: `${benchmarks.conversion.elite}%` },
          { label: "Visits", value: latestStats.patient_visits, growth: calculateGrowth('patient_visits'), avg: benchmarks.patient_visits.avg, top: benchmarks.patient_visits.elite },
        ].map((metric) => (
          <div key={metric.label} className="bg-white rounded-2xl border border-brand-navy/5 p-4 shadow-sm">
            <p className="text-xs font-bold text-brand-gray mb-2">{metric.label}</p>
            <div className="flex items-end gap-1.5 mb-3">
              <span className="text-2xl font-black text-brand-navy">{metric.value}</span>
              {metric.growth !== null && (
                <span className={`text-xs font-bold mb-0.5 ${metric.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.growth >= 0 ? '+' : ''}{metric.growth}%
                </span>
              )}
            </div>
            <div className="space-y-1 pt-2 border-t border-brand-navy/5">
              <div className="flex justify-between text-xs">
                <span className="text-brand-gray font-medium">Group avg</span>
                <span className="font-bold text-brand-navy/60">{metric.avg}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-brand-orange font-medium">Top performers</span>
                <span className="font-bold text-brand-orange">{metric.top}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Wins Timeline & Current Challenge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wins — show last 4 weeks */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm">
          <p className="text-sm font-bold text-brand-navy mb-3">Recent Wins</p>
          {kpiData.filter((d: any) => d.wins).length > 0 ? (
            <div className="space-y-3">
              {kpiData
                .filter((d: any) => d.wins)
                .slice(-4)
                .reverse()
                .map((entry: any, i: number) => (
                  <div key={i} className={cn("text-sm leading-relaxed", i === 0 ? "text-brand-navy font-medium" : "text-brand-gray/60")}>
                    <span className="text-xs font-bold text-brand-orange mr-2">{entry.week}</span>
                    {entry.wins}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-brand-gray font-medium">No wins recorded yet. Add one when you submit your next KPIs.</p>
          )}
        </div>

        {/* Current Challenge + Suggested Resource */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm">
          <p className="text-sm font-bold text-brand-navy mb-3">Where You&apos;re Stuck</p>
          {latestStats.bottlenecks ? (
            <div className="space-y-3">
              <p className="text-sm text-brand-navy font-medium leading-relaxed">{latestStats.bottlenecks}</p>
              <div className="pt-3 border-t border-brand-navy/5">
                <p className="text-xs font-bold text-brand-gray mb-2">This might help:</p>
                <Link href="/portal/triage" className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors">
                  Browse Scripts & Tools →
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-sm text-brand-gray font-medium">Nothing reported yet. If you get stuck, log it here — we&apos;ll point you to the right resource.</p>
          )}
        </div>
      </div>

      <KPIEntryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadData}
      />
    </div>
  );
}
