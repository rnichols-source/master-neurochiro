"use client";

import { useState, useMemo } from "react";
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
  Area,
  BarChart,
  Bar,
  Cell
} from "recharts";
import {
  TrendingUp,
  Plus,
  FileSpreadsheet,
  Target,
  Loader2,
  Activity,
  AlertCircle,
  Zap,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  DollarSign,
  Users,
  Heart,
  Shield
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KPIData {
  week_start_date: string;
  week: string;
  collections: number;
  new_patients: number;
  patient_visits: number;
  care_plans_accepted: number;
  overhead: number;
  active_patients: number;
  corrective_visits: number;
  wellness_visits: number;
  reconversions: number;
  wins: string;
  bottlenecks: string;
}

export function KPITrackerClient({ initialData, userName = "Doctor" }: { initialData: any[], userName?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kpiData, setKpiData] = useState<KPIData[]>(initialData.map((entry: any) => ({
    ...entry,
    overhead: entry.overhead || 0,
    active_patients: entry.active_patients || 0,
    corrective_visits: entry.corrective_visits || 0,
    wellness_visits: entry.wellness_visits || 0,
    reconversions: entry.reconversions || 0,
    week: new Date(entry.week_start_date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
  })));

  const loadData = async () => {
    setLoading(true);
    const result = await fetchKPIEntries();
    if (result.success && result.data) {
      const formatted = result.data.map((entry: any) => ({
        ...entry,
        overhead: entry.overhead || 0,
        active_patients: entry.active_patients || 0,
        corrective_visits: entry.corrective_visits || 0,
        wellness_visits: entry.wellness_visits || 0,
        reconversions: entry.reconversions || 0,
        week: new Date(entry.week_start_date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
      }));
      setKpiData(formatted);
    }
    setLoading(false);
  };

  // ── Aggregate calculations across all entries ──
  const totals = useMemo(() => {
    if (kpiData.length === 0) return null;

    const totalCollections = kpiData.reduce((s, e) => s + (e.collections || 0), 0);
    const totalVisits = kpiData.reduce((s, e) => s + (e.patient_visits || 0), 0);
    const totalNewPatients = kpiData.reduce((s, e) => s + (e.new_patients || 0), 0);
    const totalCarePlans = kpiData.reduce((s, e) => s + (e.care_plans_accepted || 0), 0);
    const totalCorrectiveVisits = kpiData.reduce((s, e) => s + (e.corrective_visits || 0), 0);
    const totalWellnessVisits = kpiData.reduce((s, e) => s + (e.wellness_visits || 0), 0);
    const totalReconversions = kpiData.reduce((s, e) => s + (e.reconversions || 0), 0);

    // Use most recent entry for active patients and overhead (point-in-time values)
    const latest = kpiData[kpiData.length - 1];
    const activePatients = latest.active_patients || 0;
    const overhead = latest.overhead || 0;

    const conversionRate = totalNewPatients > 0 ? Math.round((totalCarePlans / totalNewPatients) * 100) : 0;
    const cva = totalVisits > 0 ? totalCollections / totalVisits : 0;
    const pva = activePatients > 0 ? totalVisits / activePatients : 0;
    const avgMonthlyCollections = totalCollections / Math.max(kpiData.length, 1) * 4.33; // weekly to monthly estimate
    const margin = avgMonthlyCollections - overhead;
    const correctivePct = totalVisits > 0 ? Math.round((totalCorrectiveVisits / totalVisits) * 100) : 0;

    return {
      totalCollections,
      totalVisits,
      totalNewPatients,
      totalCarePlans,
      totalCorrectiveVisits,
      totalWellnessVisits,
      totalReconversions,
      activePatients,
      overhead,
      conversionRate,
      cva,
      pva,
      avgMonthlyCollections,
      margin,
      correctivePct,
    };
  }, [kpiData]);

  // ── Latest entry stats ──
  const latest = kpiData.length > 0 ? kpiData[kpiData.length - 1] : null;
  const prev = kpiData.length > 1 ? kpiData[kpiData.length - 2] : null;

  const latestConversion = latest && latest.new_patients > 0
    ? Math.round((latest.care_plans_accepted / latest.new_patients) * 100) : 0;
  const latestCVA = latest && latest.patient_visits > 0
    ? latest.collections / latest.patient_visits : 0;
  const latestPVA = latest && latest.active_patients > 0
    ? latest.patient_visits / latest.active_patients : 0;
  const latestMargin = latest ? latest.collections - (latest.overhead ? latest.overhead / 4.33 : 0) : 0;

  const calculateGrowth = (metric: string) => {
    if (!latest || !prev) return 0;
    const current = (latest as any)[metric] || 0;
    const previous = (prev as any)[metric] || 0;
    if (!previous || previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // ── Gap Detection ──
  const gaps = useMemo(() => {
    if (!totals) return [];
    const g: { lever: string; label: string; value: string; benchmark: string; severity: "critical" | "warning" | "good"; action: string; link: string }[] = [];

    if (totals.conversionRate < 50) {
      g.push({
        lever: "Conversion",
        label: "conversion rate",
        value: `${totals.conversionRate}%`,
        benchmark: "65%+",
        severity: "critical",
        action: "Rebuild your Day 1 & Day 2 process",
        link: "/portal/curriculum/week-3-communication"
      });
    } else if (totals.conversionRate < 65) {
      g.push({
        lever: "Conversion",
        label: "conversion rate",
        value: `${totals.conversionRate}%`,
        benchmark: "65%+",
        severity: "warning",
        action: "Review your Day 2 presentation",
        link: "/portal/curriculum/week-3-communication"
      });
    }

    if (totals.pva > 0 && totals.pva < 10) {
      g.push({
        lever: "PVA",
        label: "patient visit average",
        value: totals.pva.toFixed(1),
        benchmark: "12+",
        severity: totals.pva < 8 ? "critical" : "warning",
        action: "Strengthen onboarding & care plan length",
        link: "/portal/triage"
      });
    }

    if (totals.cva > 0 && totals.cva < 80) {
      g.push({
        lever: "CVA",
        label: "collection per visit",
        value: `$${totals.cva.toFixed(0)}`,
        benchmark: "$90+",
        severity: totals.cva < 70 ? "critical" : "warning",
        action: "Review pricing & discount structure",
        link: "/portal/engine"
      });
    }

    if (totals.totalNewPatients / Math.max(kpiData.length, 1) < 2) {
      g.push({
        lever: "New Patients",
        label: "weekly new patients",
        value: (totals.totalNewPatients / Math.max(kpiData.length, 1)).toFixed(1),
        benchmark: "3+/week",
        severity: "warning",
        action: "Build your referral & marketing engine",
        link: "/portal/curriculum/week-7-marketing"
      });
    }

    return g.sort((a, b) => a.severity === 'critical' ? -1 : 1);
  }, [totals, kpiData.length]);

  // ── Revenue formula chart data ──
  const formulaData = useMemo(() => {
    return kpiData.map(e => {
      const conv = e.new_patients > 0 ? (e.care_plans_accepted / e.new_patients) * 100 : 0;
      const cvaVal = e.patient_visits > 0 ? e.collections / e.patient_visits : 0;
      const pvaVal = e.active_patients > 0 ? e.patient_visits / e.active_patients : 0;
      return {
        week: e.week,
        collections: e.collections,
        conversion: Math.round(conv),
        cva: Math.round(cvaVal),
        pva: Number(pvaVal.toFixed(1)),
      };
    });
  }, [kpiData]);

  const firstName = userName.split(' ')[0];

  return (
    <div className="space-y-8 md:space-y-10 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2">
            Know Your Numbers
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight uppercase">
            Practice Scorecard
          </h1>
          <p className="text-sm text-brand-navy/40 font-medium mt-1">
            {kpiData.length} {kpiData.length === 1 ? 'entry' : 'entries'} tracked
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <BrandButton variant="outline" className="gap-2 w-full sm:flex-1 md:w-auto py-3 text-xs">
            <FileSpreadsheet className="w-4 h-4" /> Export CSV
          </BrandButton>
          <BrandButton
            variant="accent"
            className="gap-2 w-full sm:flex-1 md:w-auto py-3 text-xs"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Submit Weekly Numbers
          </BrandButton>
        </div>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* REVENUE FORMULA HERO              */}
      {/* ═══════════════════════════════════ */}
      <div className="bg-brand-navy rounded-[2rem] p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-orange/5 rounded-full blur-[60px]" />

        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-orange mb-6">
            The 4 Revenue Levers
          </p>

          {totals ? (
            <>
              {/* Formula Display */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
                <FormulaBlock
                  label="New Patients"
                  value={`${(totals.totalNewPatients / Math.max(kpiData.length, 1)).toFixed(1)}`}
                  suffix="/wk"
                />
                <span className="text-2xl font-black text-white/20">&times;</span>
                <FormulaBlock
                  label="Conversion"
                  value={`${totals.conversionRate}`}
                  suffix="%"
                  alert={totals.conversionRate < 50}
                />
                <span className="text-2xl font-black text-white/20">&times;</span>
                <FormulaBlock
                  label="PVA"
                  value={totals.pva.toFixed(1)}
                  alert={totals.pva > 0 && totals.pva < 10}
                />
                <span className="text-2xl font-black text-white/20">&times;</span>
                <FormulaBlock
                  label="CVA"
                  value={`$${totals.cva.toFixed(0)}`}
                  alert={totals.cva > 0 && totals.cva < 80}
                />
                <span className="text-2xl font-black text-white/20">=</span>
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-green-400/60 mb-1">Revenue</p>
                  <p className="text-2xl md:text-3xl font-black text-green-400">
                    ${Math.round(totals.avgMonthlyCollections).toLocaleString()}
                    <span className="text-sm font-bold text-green-400/50">/mo</span>
                  </p>
                </div>
              </div>

              {/* Margin Bar */}
              <div className="flex items-center justify-center gap-8 pt-6 border-t border-white/5">
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">Overhead</p>
                  <p className="text-lg font-black text-white/60">${totals.overhead.toLocaleString()}/mo</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">Margin</p>
                  <p className={`text-lg font-black ${totals.margin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${Math.round(totals.margin).toLocaleString()}/mo
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">Corrective %</p>
                  <p className="text-lg font-black text-white/60">{totals.correctivePct}%</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/50 text-sm font-medium mb-4">Submit your first weekly numbers to see your revenue formula.</p>
              <BrandButton variant="accent" size="sm" onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" /> Submit First Entry
              </BrandButton>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* GAP DETECTOR                       */}
      {/* ═══════════════════════════════════ */}
      {gaps.length > 0 && (
        <div className="space-y-3">
          {gaps.map((gap, i) => (
            <motion.div
              key={gap.lever}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-5 md:p-6 rounded-2xl border-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden group",
                gap.severity === 'critical' ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"
              )}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0",
                  gap.severity === 'critical' ? "bg-red-600 text-white shadow-red-200" : "bg-amber-500 text-white shadow-amber-200"
                )}>
                  {gap.lever === "Conversion" ? <Target size={22} /> :
                   gap.lever === "PVA" ? <Activity size={22} /> :
                   gap.lever === "CVA" ? <DollarSign size={22} /> :
                   <Users size={22} />}
                </div>
                <div>
                  <h3 className={cn("text-base font-black tracking-tight", gap.severity === 'critical' ? "text-red-900" : "text-amber-900")}>
                    {gap.lever} Gap: {gap.value} → {gap.benchmark}
                  </h3>
                  <p className={cn("text-xs font-medium mt-0.5", gap.severity === 'critical' ? "text-red-600" : "text-amber-700")}>
                    Your {gap.label} is below benchmark.
                  </p>
                </div>
              </div>

              <Link href={gap.link} className="w-full md:w-auto relative z-10">
                <button className={cn(
                  "px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 w-full md:w-auto",
                  gap.severity === 'critical' ? "bg-red-600 text-white hover:bg-red-700" : "bg-amber-500 text-white hover:bg-amber-600"
                )}>
                  {gap.action} <ArrowRight size={12} />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════ */}
      {/* 4 LEVER CARDS                      */}
      {/* ═══════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <LeverCard
          title="New Patients"
          icon={Plus}
          value={latest ? `${latest.new_patients}` : "—"}
          unit="/wk"
          growth={calculateGrowth('new_patients')}
          benchmark={{ avg: "3/wk", elite: "8+/wk" }}
        />
        <LeverCard
          title="Conversion"
          icon={Target}
          value={latest ? `${latestConversion}` : "—"}
          unit="%"
          growth={prev ? latestConversion - (prev.new_patients > 0 ? Math.round((prev.care_plans_accepted / prev.new_patients) * 100) : 0) : 0}
          benchmark={{ avg: "65%", elite: "90%+" }}
          isPercentGrowth
        />
        <LeverCard
          title="PVA"
          subtitle="Patient Visit Avg"
          icon={Activity}
          value={latest ? latestPVA.toFixed(1) : "—"}
          growth={0}
          benchmark={{ avg: "12", elite: "18+" }}
          hideGrowth
        />
        <LeverCard
          title="CVA"
          subtitle="Collection / Visit"
          icon={DollarSign}
          value={latest ? `$${latestCVA.toFixed(0)}` : "—"}
          growth={0}
          benchmark={{ avg: "$90", elite: "$120+" }}
          hideGrowth
        />
      </div>

      {/* ═══════════════════════════════════ */}
      {/* TREND CHART                        */}
      {/* ═══════════════════════════════════ */}
      <EliteCard className="p-0 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-brand-navy/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-1">Weekly Trend</p>
          <h3 className="text-lg font-black text-brand-navy tracking-tight">Collections Over Time</h3>
        </div>
        <div className="h-[250px] md:h-[350px] w-full p-4 md:p-8 bg-gradient-to-b from-white to-brand-cream/30 flex items-center justify-center">
          {loading ? (
            <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-brand-orange" />
          ) : kpiData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpiData}>
                <defs>
                  <linearGradient id="colorCollections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D66829" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#D66829" stopOpacity={0} />
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
                    boxShadow: '0 10px 40px -10px rgba(30, 45, 59, 0.15)',
                    padding: '12px 16px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'collections') return [`$${value.toLocaleString()}`, 'Collections'];
                    return [value, name];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="collections"
                  stroke="#D66829"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCollections)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center space-y-4 px-6">
              <p className="text-brand-gray text-sm font-medium">No data yet. Submit your first weekly numbers.</p>
              <BrandButton variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>Submit First Entry</BrandButton>
            </div>
          )}
        </div>
      </EliteCard>

      {/* ═══════════════════════════════════ */}
      {/* PRACTICE MIX + SECONDARY METRICS   */}
      {/* ═══════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Practice Mix */}
        <EliteCard title="Practice Mix" subtitle="Visit Breakdown" icon={Heart} className="p-6 md:p-8">
          {totals && (totals.totalCorrectiveVisits > 0 || totals.totalWellnessVisits > 0) ? (
            <div className="space-y-4 mt-2">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-brand-orange" />
                    <span className="text-xs font-bold text-brand-navy/60">Corrective</span>
                  </div>
                  <p className="text-2xl font-black text-brand-navy">{totals.totalCorrectiveVisits}</p>
                  <p className="text-xs text-brand-navy/40">{totals.correctivePct}% of visits</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs font-bold text-brand-navy/60">Wellness</span>
                  </div>
                  <p className="text-2xl font-black text-brand-navy">{totals.totalWellnessVisits}</p>
                  <p className="text-xs text-brand-navy/40">{100 - totals.correctivePct}% of visits</p>
                </div>
              </div>
              {/* Visual bar */}
              <div className="w-full h-4 rounded-full bg-brand-navy/5 overflow-hidden flex">
                <div
                  className="h-full bg-brand-orange rounded-l-full transition-all"
                  style={{ width: `${totals.correctivePct}%` }}
                />
                <div
                  className="h-full bg-green-500 rounded-r-full transition-all"
                  style={{ width: `${100 - totals.correctivePct}%` }}
                />
              </div>
              {totals.totalReconversions > 0 && (
                <div className="pt-3 border-t border-brand-navy/5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-brand-navy/60">Reconversions</span>
                    <span className="text-sm font-black text-brand-navy">{totals.totalReconversions}</span>
                  </div>
                  <p className="text-[10px] text-brand-navy/40 mt-1">Corrective patients who transitioned to wellness</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-2 text-sm text-brand-navy/40 font-medium">
              Add corrective & wellness visit counts to see your practice mix.
            </div>
          )}
        </EliteCard>

        {/* Margin & Overhead */}
        <EliteCard title="Margin Health" subtitle="Financial Snapshot" icon={Shield} className="p-6 md:p-8">
          {totals && totals.overhead > 0 ? (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-brand-navy/40">Monthly Revenue</p>
                  <p className="text-xl font-black text-brand-navy">
                    ${Math.round(totals.avgMonthlyCollections).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-brand-navy/40">Monthly Overhead</p>
                  <p className="text-xl font-black text-brand-navy/60">
                    ${totals.overhead.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="bg-brand-navy rounded-xl p-5">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">Take-Home Margin</p>
                <p className={`text-2xl font-black ${totals.margin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${Math.round(totals.margin).toLocaleString()}/mo
                </p>
                <p className="text-xs text-white/30 mt-1">
                  {totals.avgMonthlyCollections > 0
                    ? `${Math.round((totals.margin / totals.avgMonthlyCollections) * 100)}% margin`
                    : "—"}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-2 text-sm text-brand-navy/40 font-medium">
              Add your monthly overhead to see margin analysis.
            </div>
          )}
        </EliteCard>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* WINS & STUCK POINTS               */}
      {/* ═══════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EliteCard title="Your Wins" subtitle="Recent Entry" className="bg-green-50/50 border-green-100 p-6 md:p-8">
          <div className="mt-2 text-sm font-medium text-brand-navy whitespace-pre-wrap leading-relaxed">
            {latest?.wins || "No wins recorded yet. Submit your weekly numbers to track wins."}
          </div>
        </EliteCard>
        <EliteCard title="Stuck Points" subtitle="Focus Area" className="bg-orange-50/50 border-orange-100 p-6 md:p-8">
          <div className="mt-2 text-sm font-medium text-brand-navy whitespace-pre-wrap leading-relaxed">
            {latest?.bottlenecks || "No stuck points recorded yet."}
          </div>
          <BrandButton variant="accent" size="sm" className="mt-6 w-full py-3 text-xs">Request Feedback</BrandButton>
        </EliteCard>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* KNOW YOUR NUMBERS GUIDE            */}
      {/* ═══════════════════════════════════ */}
      <EliteCard className="p-6 md:p-8 bg-brand-cream/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center flex-shrink-0">
            <Zap size={22} className="text-brand-orange" />
          </div>
          <div>
            <h3 className="text-base font-black text-brand-navy mb-2">Know Your Numbers</h3>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-4">
              Your revenue is driven by 4 levers: <strong>New Patients &times; Conversion % &times; PVA &times; CVA</strong>.
              Move any one lever and revenue moves. Move all four and it compounds.
              Submit your numbers every week — Friday is your admin day. 15 minutes. No more driving without a dashboard.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white rounded-lg p-3 border border-brand-navy/5">
                <p className="font-black text-brand-navy">PVA = Total Visits &divide; Active Patients</p>
                <p className="text-brand-navy/40 mt-0.5">How many times each patient visits on average</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-brand-navy/5">
                <p className="font-black text-brand-navy">CVA = Collections &divide; Total Visits</p>
                <p className="text-brand-navy/40 mt-0.5">How much you collect per visit on average</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-brand-navy/5">
                <p className="font-black text-brand-navy">Conversion = Care Plans &divide; Day 1s</p>
                <p className="text-brand-navy/40 mt-0.5">What percentage of new patients say yes</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-brand-navy/5">
                <p className="font-black text-brand-navy">Margin = Revenue &minus; Overhead</p>
                <p className="text-brand-navy/40 mt-0.5">What you actually take home</p>
              </div>
            </div>
          </div>
        </div>
      </EliteCard>

      <KPIEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
}

/* ── Sub-components ── */

function FormulaBlock({ label, value, suffix, alert }: { label: string; value: string; suffix?: string; alert?: boolean }) {
  return (
    <div className={cn(
      "text-center px-4 py-3 rounded-xl",
      alert ? "bg-red-500/20 ring-1 ring-red-400/30" : "bg-white/5"
    )}>
      <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">{label}</p>
      <p className={cn("text-xl md:text-2xl font-black", alert ? "text-red-300" : "text-white")}>
        {value}{suffix && <span className="text-sm font-bold opacity-50">{suffix}</span>}
      </p>
    </div>
  );
}

function LeverCard({
  title,
  subtitle,
  icon: Icon,
  value,
  unit,
  growth,
  benchmark,
  hideGrowth,
  isPercentGrowth,
}: {
  title: string;
  subtitle?: string;
  icon: any;
  value: string;
  unit?: string;
  growth: number;
  benchmark: { avg: string; elite: string };
  hideGrowth?: boolean;
  isPercentGrowth?: boolean;
}) {
  return (
    <EliteCard title={title} subtitle={subtitle || "This Week"} icon={Icon} className="p-6 md:p-8">
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-end gap-2">
          <span className="text-2xl md:text-3xl font-black text-brand-navy">
            {value}{unit && <span className="text-sm font-bold text-brand-navy/30 ml-0.5">{unit}</span>}
          </span>
          {!hideGrowth && growth !== 0 && (
            <span className={`text-[10px] md:text-xs font-bold mb-1 flex items-center gap-0.5 ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {growth >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
              {isPercentGrowth ? `${Math.abs(growth)}pts` : `${Math.abs(growth)}%`}
            </span>
          )}
        </div>
        <div className="space-y-1.5 pt-4 border-t border-brand-navy/5 text-left">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-black uppercase text-brand-navy/40 tracking-widest">Benchmark</span>
            <span className="text-[10px] font-black text-brand-navy/60">{benchmark.avg}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-black uppercase text-brand-orange tracking-widest">Elite</span>
            <span className="text-[10px] font-black text-brand-orange">{benchmark.elite}</span>
          </div>
        </div>
      </div>
    </EliteCard>
  );
}
