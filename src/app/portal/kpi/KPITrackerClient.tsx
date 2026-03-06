"use client";

import { useState, useEffect } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { RevenueVelocity } from "@/components/portal/RevenueVelocity";
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
  Loader2
} from "lucide-react";

export function KPITrackerClient({ initialData }: { initialData: any[] }) {
  const [activeMetric, setActiveMetric] = useState<"patient_visits" | "collections">("patient_visits");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kpiData, setKpiData] = useState<any[]>(initialData.map((entry: any) => ({
    ...entry,
    week: new Date(entry.week_start_date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
  })));

  const loadData = async () => {
    setLoading(true);
    const result = await fetchKPIEntries();
    if (result.success) {
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
    wins: "No entries yet",
    bottlenecks: "No entries yet"
  };

  const calculateGrowth = (metric: string) => {
    if (kpiData.length < 2) return 0;
    const current = kpiData[kpiData.length - 1][metric];
    const previous = kpiData[kpiData.length - 2][metric];
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  return (
    <div className="space-y-12">
      {/* Revenue Velocity Engine */}
      <RevenueVelocity />

      {/* Header */}
      <div className="flex items-end justify-between pt-4">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-[0.2em] text-xs mb-2">
            Performance Intelligence
          </p>
          <h1 className="text-4xl font-black text-brand-navy tracking-tight">
            Clinical KPI Dashboard
          </h1>
        </div>
        <div className="flex gap-4">
          <BrandButton variant="outline" className="gap-2">
            <FileSpreadsheet className="w-4 h-4" /> Export CSV
          </BrandButton>
          <BrandButton 
            variant="accent" 
            className="gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> New Entry
          </BrandButton>
        </div>
      </div>

      {/* Overview Chart */}
      <EliteCard className="p-0 overflow-hidden">
        <div className="p-8 border-b border-brand-navy/5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveMetric("patient_visits")}
              className={`text-left transition-all ${activeMetric === "patient_visits" ? "opacity-100" : "opacity-40 hover:opacity-60"}`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">Visit Volume</p>
              <h4 className="text-2xl font-black text-brand-navy">
                {latestStats.patient_visits} 
                <span className={`text-xs font-bold ml-1 ${calculateGrowth('patient_visits') >= 0 ? 'text-green-500' : 'text-brand-orange'}`}>
                  {calculateGrowth('patient_visits') >= 0 ? '+' : ''}{calculateGrowth('patient_visits')}%
                </span>
              </h4>
            </button>
            <div className="w-px h-10 bg-brand-navy/10" />
            <button 
              onClick={() => setActiveMetric("collections")}
              className={`text-left transition-all ${activeMetric === "collections" ? "opacity-100" : "opacity-40 hover:opacity-60"}`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">Total Collections</p>
              <h4 className="text-2xl font-black text-brand-navy">
                ${(latestStats.collections / 1000).toFixed(1)}k 
                <span className={`text-xs font-bold ml-1 ${calculateGrowth('collections') >= 0 ? 'text-green-500' : 'text-brand-orange'}`}>
                  {calculateGrowth('collections') >= 0 ? '+' : ''}{calculateGrowth('collections')}%
                </span>
              </h4>
            </button>
          </div>
          
          <div className="flex bg-brand-navy/5 p-1 rounded-xl">
            {["7D", "30D", "90D", "ALL"].map(range => (
              <button 
                key={range}
                className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${range === "ALL" ? "bg-white text-brand-navy shadow-sm" : "text-brand-navy/40 hover:text-brand-navy"}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[400px] w-full p-8 bg-gradient-to-b from-white to-brand-cream/30 flex items-center justify-center">
          {loading ? (
            <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
          ) : kpiData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpiData}>
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
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#1E2D3B40' }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 40px -10px rgba(30, 45, 59, 0.1)',
                    padding: '12px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 900, color: '#1E2D3B' }}
                />
                <Area 
                  type="monotone" 
                  dataKey={activeMetric} 
                  stroke="#D66829" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorMetric)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-brand-gray font-medium">No KPI data recorded yet.</p>
              <BrandButton variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>Submit First Entry</BrandButton>
            </div>
          )}
        </div>
      </EliteCard>

      {/* Insight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EliteCard title="New Patients" subtitle="Recent Entry" icon={Plus}>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-black text-brand-navy">{latestStats.new_patients}</span>
            <span className={`text-xs font-bold mb-1 ${calculateGrowth('new_patients') >= 0 ? 'text-green-500' : 'text-brand-orange'}`}>
              {calculateGrowth('new_patients') >= 0 ? '+' : ''}{calculateGrowth('new_patients')}%
            </span>
          </div>
        </EliteCard>
        <EliteCard title="Collections" subtitle="Recent Entry" icon={TrendingUp}>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-black text-brand-navy">${(latestStats.collections / 1000).toFixed(1)}k</span>
            <span className={`text-xs font-bold mb-1 ${calculateGrowth('collections') >= 0 ? 'text-green-500' : 'text-brand-orange'}`}>
              {calculateGrowth('collections') >= 0 ? '+' : ''}{calculateGrowth('collections')}%
            </span>
          </div>
        </EliteCard>
        <EliteCard title="Visits" subtitle="Recent Entry" icon={Target}>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-black text-brand-navy">{latestStats.patient_visits}</span>
            <span className={`text-xs font-bold mb-1 ${calculateGrowth('patient_visits') >= 0 ? 'text-green-500' : 'text-brand-orange'}`}>
              {calculateGrowth('patient_visits') >= 0 ? '+' : ''}{calculateGrowth('patient_visits')}%
            </span>
          </div>
        </EliteCard>
        <EliteCard title="Total Entries" subtitle="Continuity" icon={Calendar}>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-black text-brand-navy">{kpiData.length}</span>
            <span className="text-xs font-bold text-brand-orange mb-1">Weeks</span>
          </div>
        </EliteCard>
      </div>

      {/* Wins & Bottlenecks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <EliteCard title="Identity Expansion" subtitle="Recent Wins" className="bg-green-50/50 border-green-100">
          <div className="mt-2 text-sm font-medium text-brand-navy whitespace-pre-wrap">
            {latestStats.wins || "No wins recorded for this period."}
          </div>
        </EliteCard>
        <EliteCard title="Bottlenecks" subtitle="Focus Area" className="bg-orange-50/50 border-orange-100">
          <div className="mt-2 text-sm font-medium text-brand-navy whitespace-pre-wrap">
            {latestStats.bottlenecks || "No bottlenecks recorded for this period."}
          </div>
          <BrandButton variant="accent" size="sm" className="mt-6 w-full">Request Feedback</BrandButton>
        </EliteCard>
      </div>

      <KPIEntryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadData}
      />
    </div>
  );
}
