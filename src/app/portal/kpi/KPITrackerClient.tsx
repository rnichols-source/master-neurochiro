"use client";

import { useState, useMemo } from "react";
import { BrandButton } from "@/components/ui/elite-ui";
import { fetchKPIEntries } from "@/app/actions/kpi-actions";
import { KPIEmptyState } from "@/components/portal/kpi/KPIEmptyState";
import { KPIWeeklyEntry } from "@/components/portal/kpi/KPIWeeklyEntry";
import { KPIRevenueFormula } from "@/components/portal/kpi/KPIRevenueFormula";
import { KPILeverCard } from "@/components/portal/kpi/KPILeverCard";
import { KPIWhatIfSlider } from "@/components/portal/kpi/KPIWhatIfSlider";
import { KPIWeeklyTimeline } from "@/components/portal/kpi/KPIWeeklyTimeline";
import { KPIInsight } from "@/components/portal/kpi/KPIInsight";
import { KPIBulkImport } from "@/components/portal/kpi/KPIBulkImport";
import { Plus, ChevronUp, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface KPIData {
  week_start_date: string;
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

interface LeverValues {
  npPerWeek: number;
  conversionRate: number;
  pva: number;
  cva: number;
  overhead: number;
}

export function KPITrackerClient({ initialData, userName = "Doctor" }: { initialData: any[]; userName?: string }) {
  const [kpiData, setKpiData] = useState<KPIData[]>(
    initialData.map((entry: any) => ({
      ...entry,
      overhead: entry.overhead || 0,
      active_patients: entry.active_patients || 0,
      corrective_visits: entry.corrective_visits || 0,
      wellness_visits: entry.wellness_visits || 0,
      reconversions: entry.reconversions || 0,
    }))
  );
  const [showEntry, setShowEntry] = useState(false);
  const [showEmptyEntry, setShowEmptyEntry] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [whatIfOverrides, setWhatIfOverrides] = useState<Partial<LeverValues> | null>(null);

  const loadData = async () => {
    const result = await fetchKPIEntries();
    if (result.success && result.data) {
      setKpiData(
        result.data.map((entry: any) => ({
          ...entry,
          overhead: entry.overhead || 0,
          active_patients: entry.active_patients || 0,
          corrective_visits: entry.corrective_visits || 0,
          wellness_visits: entry.wellness_visits || 0,
          reconversions: entry.reconversions || 0,
        }))
      );
    }
  };

  const handleEntrySuccess = async () => {
    await loadData();
    setShowEntry(false);
    setShowEmptyEntry(false);
  };

  // ── Lever calculations ──
  const levers = useMemo<LeverValues>(() => {
    if (kpiData.length === 0) return { npPerWeek: 0, conversionRate: 0, pva: 0, cva: 0, overhead: 0 };

    const totalCollections = kpiData.reduce((s, e) => s + (e.collections || 0), 0);
    const totalVisits = kpiData.reduce((s, e) => s + (e.patient_visits || 0), 0);
    const totalNewPatients = kpiData.reduce((s, e) => s + (e.new_patients || 0), 0);
    const totalCarePlans = kpiData.reduce((s, e) => s + (e.care_plans_accepted || 0), 0);

    const latest = kpiData[kpiData.length - 1];
    const activePatients = latest.active_patients || 0;
    const overhead = latest.overhead || 0;

    const npPerWeek = totalNewPatients / Math.max(kpiData.length, 1);
    const conversionRate = totalNewPatients > 0 ? Math.min((totalCarePlans / totalNewPatients) * 100, 100) : 0;
    const pva = activePatients > 0 ? (latest.patient_visits / activePatients) : 0;
    const cva = totalVisits > 0 ? totalCollections / totalVisits : 0;

    return { npPerWeek, conversionRate, pva, cva, overhead };
  }, [kpiData]);

  // ── Latest entry for lever cards ──
  const latest = kpiData.length > 0 ? kpiData[kpiData.length - 1] : null;
  const prev = kpiData.length > 1 ? kpiData[kpiData.length - 2] : null;

  const latestConv = latest && (latest.new_patients ?? 0) > 0
    ? Math.min(Math.round(((latest.care_plans_accepted ?? 0) / (latest.new_patients ?? 0)) * 100), 100) : 0;
  const latestPVA = latest && (latest.active_patients ?? 0) > 0
    ? (latest.patient_visits ?? 0) / (latest.active_patients ?? 0) : 0;
  const latestCVA = latest && (latest.patient_visits ?? 0) > 0
    ? (latest.collections ?? 0) / (latest.patient_visits ?? 0) : 0;

  const prevConv = prev && prev.new_patients > 0
    ? Math.round((prev.care_plans_accepted / prev.new_patients) * 100) : 0;

  const calcGrowth = (field: string) => {
    if (!latest || !prev) return 0;
    const cur = (latest as any)[field] || 0;
    const pre = (prev as any)[field] || 0;
    if (!pre) return 0;
    return Math.round(((cur - pre) / pre) * 100);
  };

  // ── Gap detection ──
  const gaps = useMemo(() => {
    if (kpiData.length === 0) return { displayed: [] as { lever: string; message: string; severity: "critical" | "warning"; action: string; link: string }[], total: 0 };
    const g: { lever: string; message: string; severity: "critical" | "warning"; action: string; link: string }[] = [];

    if (levers.conversionRate < 50) {
      const outOf10 = 10 - Math.round(levers.conversionRate / 10);
      g.push({
        lever: "Conversion",
        message: `${Math.round(levers.conversionRate)}%. For every 10 Day 1s, ${outOf10} walk out without care.`,
        severity: "critical",
        action: "Fix This",
        link: "/portal/curriculum/week-3-communication",
      });
    } else if (levers.conversionRate < 65) {
      g.push({
        lever: "Conversion",
        message: `${Math.round(levers.conversionRate)}%. Close but room to grow. Benchmark is 65%+.`,
        severity: "warning",
        action: "Improve",
        link: "/portal/curriculum/week-3-communication",
      });
    }

    if (levers.pva > 0 && levers.pva < 1) {
      g.push({
        lever: "PVA",
        message: `${levers.pva.toFixed(1)} visits per patient per week. Patients aren't coming back enough.`,
        severity: "critical",
        action: "Fix This",
        link: "/portal/triage",
      });
    } else if (levers.pva > 0 && levers.pva < 1.4) {
      g.push({
        lever: "PVA",
        message: `${levers.pva.toFixed(1)} visits per patient per week. Slightly below benchmark.`,
        severity: "warning",
        action: "Improve",
        link: "/portal/triage",
      });
    }

    if (levers.cva > 0 && levers.cva < 70) {
      g.push({
        lever: "CVA",
        message: `$${levers.cva.toFixed(0)} per visit. Discounts may be dragging this down.`,
        severity: "critical",
        action: "Review Pricing",
        link: "/portal/economics-engine",
      });
    } else if (levers.cva > 0 && levers.cva < 90) {
      g.push({
        lever: "CVA",
        message: `$${levers.cva.toFixed(0)} per visit. A small price bump moves this fast.`,
        severity: "warning",
        action: "Review Pricing",
        link: "/portal/economics-engine",
      });
    }

    const sorted = g.sort((a, b) => (a.severity === "critical" ? -1 : 1));
    return { displayed: sorted.slice(0, 2), total: sorted.length };
  }, [levers, kpiData.length]);

  // ── Biggest gap for formula hero ──
  const biggestGap = useMemo(() => {
    if (gaps.displayed.length === 0) return null;
    const g = gaps.displayed[0];
    const conv = Math.round(levers.conversionRate);

    if (g.lever === "Conversion") {
      const extraPatients = Math.round(((65 - conv) / 100) * levers.npPerWeek * 4.33);
      const extraRevenue = levers.cva > 0 && levers.pva > 0
        ? Math.round(extraPatients * levers.cva * levers.pva)
        : 0;
      return {
        lever: "Conversion",
        message: extraPatients > 0 && extraRevenue > 0
          ? `If you converted just ${extraPatients > 2 ? `${extraPatients} more` : "1 more"} patient${extraPatients !== 1 ? "s" : ""} per month, that could be $${extraRevenue.toLocaleString()} more per month.`
          : extraPatients > 0
            ? `If you converted just ${extraPatients > 2 ? `${extraPatients} more` : "1 more"} patient${extraPatients !== 1 ? "s" : ""} per month, your revenue grows.`
            : g.message,
      };
    }
    return { lever: g.lever, message: g.message };
  }, [gaps, levers]);

  // ── Weakest lever for What-If ──
  const weakestLever = useMemo<"conv" | "pva" | "cva" | "np">(() => {
    if (levers.conversionRate < 65) return "conv";
    if (levers.pva > 0 && levers.pva < 1.4) return "pva";
    if (levers.cva > 0 && levers.cva < 90) return "cva";
    return "np";
  }, [levers]);

  // ── Health helpers ──
  const leverHealth = (lever: string, value: number): "green" | "amber" | "red" => {
    switch (lever) {
      case "np": return value >= 3 ? "green" : value >= 2 ? "amber" : "red";
      case "conv": return value >= 65 ? "green" : value >= 50 ? "amber" : "red";
      case "pva": return value >= 1.4 ? "green" : value >= 1 ? "amber" : "red";
      case "cva": return value >= 90 ? "green" : value >= 70 ? "amber" : "red";
      default: return "green";
    }
  };

  const firstName = userName.split(" ")[0];

  // ══════════════════════════════════════
  // EMPTY STATE
  // ══════════════════════════════════════
  if (kpiData.length === 0 && !showEmptyEntry && !showBulkImport) {
    return (
      <KPIEmptyState
        onStart={() => setShowEmptyEntry(true)}
        onBulkImport={() => setShowBulkImport(true)}
      />
    );
  }

  if (kpiData.length === 0 && showBulkImport) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <KPIBulkImport onSuccess={handleEntrySuccess} onCancel={() => setShowBulkImport(false)} />
      </div>
    );
  }

  if (kpiData.length === 0 && showEmptyEntry) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <KPIWeeklyEntry onSuccess={handleEntrySuccess} onCancel={() => setShowEmptyEntry(false)} />
      </div>
    );
  }

  // ══════════════════════════════════════
  // DASHBOARD
  // ══════════════════════════════════════
  return (
    <div className="space-y-6 md:space-y-8 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2">
            Know Your Numbers
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight uppercase">
            Practice Scorecard
          </h1>
          <p className="text-sm text-brand-navy/40 font-medium mt-1">
            {kpiData.length} week{kpiData.length !== 1 ? "s" : ""} tracked
          </p>
        </div>
        <div className="flex gap-2">
          <BrandButton
            variant="outline"
            className="gap-2 py-3 text-xs"
            onClick={() => { setShowBulkImport(!showBulkImport); setShowEntry(false); }}
          >
            {showBulkImport ? (
              <><ChevronUp className="w-4 h-4" /> Close</>
            ) : (
              <><Upload className="w-4 h-4" /> Import Past Data</>
            )}
          </BrandButton>
          <BrandButton
            variant="accent"
            className="gap-2 py-3 text-xs"
            onClick={() => { setShowEntry(!showEntry); setShowBulkImport(false); }}
          >
            {showEntry ? (
              <><ChevronUp className="w-4 h-4" /> Close</>
            ) : (
              <><Plus className="w-4 h-4" /> Log This Week</>
            )}
          </BrandButton>
        </div>
      </div>

      {/* Entry Strip */}
      <AnimatePresence>
        {showEntry && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <KPIWeeklyEntry onSuccess={handleEntrySuccess} onCancel={() => setShowEntry(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Import Strip */}
      <AnimatePresence>
        {showBulkImport && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <KPIBulkImport onSuccess={handleEntrySuccess} onCancel={() => setShowBulkImport(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revenue Formula Hero */}
      <KPIRevenueFormula
        levers={levers}
        overrides={whatIfOverrides}
        biggestGap={biggestGap}
      />

      {/* Gap Insights */}
      {gaps.displayed.length > 0 && (
        <div className="space-y-2">
          {gaps.displayed.map((gap, i) => (
            <KPIInsight
              key={gap.lever}
              lever={gap.lever}
              message={gap.message}
              severity={gap.severity}
              action={gap.action}
              link={gap.link}
              delay={i * 0.1}
            />
          ))}
          {gaps.total > 2 && (
            <p className="text-xs text-brand-navy/30 font-medium text-center">
              +{gaps.total - 2} more area{gaps.total - 2 !== 1 ? "s" : ""} to improve
            </p>
          )}
        </div>
      )}

      {/* 4 Lever Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPILeverCard
          title="New Patients"
          value={`${latest?.new_patients ?? 0}`}
          unit="/wk"
          oneLiner={`${latest?.new_patients ?? 0} Day 1${(latest?.new_patients ?? 0) !== 1 ? "s" : ""} walked in this week`}
          health={leverHealth("np", latest?.new_patients ?? 0)}
          growth={calcGrowth("new_patients")}
          benchmark="3/wk"
          elite="8+/wk"
          delay={0}
        />
        <KPILeverCard
          title="Conversion"
          value={`${latestConv}`}
          unit="%"
          oneLiner={
            latest && latest.new_patients > 0
              ? `${latest.care_plans_accepted} of ${latest.new_patients} Day 1${latest.new_patients !== 1 ? "s" : ""} started care`
              : "No Day 1s this week"
          }
          health={leverHealth("conv", latestConv)}
          growth={prevConv > 0 ? latestConv - prevConv : undefined}
          benchmark="65%"
          elite="90%+"
          delay={0.05}
        />
        <KPILeverCard
          title="PVA"
          value={levers.pva > 0 ? levers.pva.toFixed(1) : "—"}
          oneLiner={
            levers.pva > 0
              ? `Each patient visits ${levers.pva.toFixed(1)} times per week on average`
              : "Set your active patient count to calculate"
          }
          health={leverHealth("pva", levers.pva)}
          benchmark="1.5"
          elite="2.5+"
          delay={0.1}
        />
        <KPILeverCard
          title="CVA"
          value={levers.cva > 0 ? `$${levers.cva.toFixed(0)}` : "—"}
          oneLiner={
            levers.cva > 0
              ? `You collect $${levers.cva.toFixed(0)} per visit across all weeks`
              : "Collections ÷ visits"
          }
          health={leverHealth("cva", levers.cva)}
          benchmark="$90"
          elite="$120+"
          delay={0.15}
        />
      </div>

      {/* What-If Slider */}
      {kpiData.length > 0 && levers.npPerWeek > 0 && levers.cva > 0 && (
        <KPIWhatIfSlider
          levers={levers}
          weakestLever={weakestLever}
          onOverride={setWhatIfOverrides}
        />
      )}

      {/* Weekly Timeline */}
      <KPIWeeklyTimeline weeks={kpiData} />

      {/* Wins & Stuck Points */}
      {latest && (latest.wins || latest.bottlenecks) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latest.wins && (
            <div className="bg-green-50/50 rounded-xl p-5 border border-green-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-green-600/60 mb-2">This Week&apos;s Wins</p>
              <p className="text-sm text-brand-navy font-medium whitespace-pre-wrap leading-relaxed break-words">
                {latest.wins}
              </p>
            </div>
          )}
          {latest.bottlenecks && (
            <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-600/60 mb-2">Stuck Points</p>
              <p className="text-sm text-brand-navy font-medium whitespace-pre-wrap leading-relaxed break-words">
                {latest.bottlenecks}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
