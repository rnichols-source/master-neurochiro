"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import { submitKPIEntry } from "@/app/actions/kpi-actions";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Check,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

interface KPIBulkImportProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface MonthRow {
  id: string;
  month: string; // YYYY-MM
  collections: number;
  new_patients: number;
  care_plans: number;
  total_visits: number;
  active_patients: number;
  overhead: number;
}

function getLastNMonths(n: number): string[] {
  const months: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return months;
}

function formatMonth(ym: string): string {
  const [y, m] = ym.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getMondaysInMonth(ym: string): string[] {
  const [y, m] = ym.split("-").map(Number);
  const mondays: string[] = [];
  const lastDay = new Date(y, m, 0).getDate(); // last day of month
  for (let d = 1; d <= lastDay; d++) {
    const date = new Date(y, m - 1, d);
    if (date.getDay() === 1) {
      mondays.push(date.toISOString().split("T")[0]);
    }
  }
  return mondays;
}

export function KPIBulkImport({ onSuccess, onCancel }: KPIBulkImportProps) {
  const defaultMonths = getLastNMonths(6);
  const [rows, setRows] = useState<MonthRow[]>(
    defaultMonths.map((m) => ({
      id: m,
      month: m,
      collections: 0,
      new_patients: 0,
      care_plans: 0,
      total_visits: 0,
      active_patients: 0,
      overhead: 0,
    }))
  );
  const [step, setStep] = useState<"input" | "review" | "importing">("input");
  const [importProgress, setImportProgress] = useState(0);
  const [showExtras, setShowExtras] = useState(false);

  const updateRow = (id: string, field: keyof MonthRow, value: number | string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const addMonth = () => {
    const earliest = rows[0]?.month;
    if (!earliest) return;
    const [y, m] = earliest.split("-").map(Number);
    const prev = new Date(y, m - 2, 1);
    const newMonth = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}`;
    setRows((prev) => [
      {
        id: newMonth,
        month: newMonth,
        collections: 0,
        new_patients: 0,
        care_plans: 0,
        total_visits: 0,
        active_patients: 0,
        overhead: 0,
      },
      ...prev,
    ]);
  };

  const removeMonth = (id: string) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const filledRows = rows.filter((r) => r.collections > 0 || r.total_visits > 0 || r.new_patients > 0);

  // Calculated totals for review
  const totalCollections = filledRows.reduce((s, r) => s + r.collections, 0);
  const totalVisits = filledRows.reduce((s, r) => s + r.total_visits, 0);
  const totalNP = filledRows.reduce((s, r) => s + r.new_patients, 0);
  const totalCarePlans = filledRows.reduce((s, r) => s + r.care_plans, 0);
  const avgMonthlyCollections = filledRows.length > 0 ? totalCollections / filledRows.length : 0;
  const conversionRate = totalNP > 0 ? Math.min(Math.round((totalCarePlans / totalNP) * 100), 100) : 0;
  const cva = totalVisits > 0 ? totalCollections / totalVisits : 0;

  const handleImport = async () => {
    setStep("importing");
    let completed = 0;

    for (const row of filledRows) {
      const mondays = getMondaysInMonth(row.month);
      const numWeeks = mondays.length;
      if (numWeeks === 0) continue;

      // Round inputs to integers before splitting
      const totalNP = Math.round(row.new_patients);
      const totalCP = Math.round(row.care_plans);
      const weeklyCollections = Math.round(row.collections / numWeeks);
      const weeklyVisits = Math.round(row.total_visits / numWeeks);
      const weeklyNP = Math.floor(totalNP / numWeeks);
      const npRemainder = totalNP % numWeeks;
      const weeklyCP = Math.floor(totalCP / numWeeks);
      const cpRemainder = totalCP % numWeeks;

      for (let w = 0; w < numWeeks; w++) {
        await submitKPIEntry({
          week_start_date: mondays[w],
          collections: weeklyCollections,
          new_patients: weeklyNP + (w === 0 ? npRemainder : 0),
          patient_visits: weeklyVisits,
          care_plans_accepted: weeklyCP + (w === 0 ? cpRemainder : 0),
          active_patients: row.active_patients || undefined,
          overhead: row.overhead || undefined,
        });
      }

      completed++;
      setImportProgress(Math.round((completed / Math.max(filledRows.length, 1)) * 100));
    }

    // Small delay so they see 100%
    await new Promise((r) => setTimeout(r, 500));
    onSuccess();
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-sm font-bold text-white text-right focus:bg-white/10 focus:border-brand-orange/30 transition-all outline-none placeholder:text-white/15";

  return (
    <div className="bg-brand-navy rounded-2xl md:rounded-[2rem] overflow-hidden">
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* ── INPUT STEP ── */}
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-1">
                <Upload size={18} className="text-brand-orange" />
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
                  Import Historical Data
                </p>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2">
                Enter your monthly numbers.
              </h2>
              <p className="text-sm text-white/30 font-medium mb-6">
                Pull these from your EHR&apos;s reports. Don&apos;t stress about being exact — close is good enough to see the pattern.
              </p>

              {/* Add earlier month */}
              <button
                onClick={addMonth}
                className="flex items-center gap-2 text-xs text-white/20 hover:text-white/40 transition-colors font-bold mb-4"
              >
                <Plus size={12} /> Add earlier month
              </button>

              {/* Column Headers */}
              <div className="hidden md:grid grid-cols-[140px_1fr_1fr_1fr_1fr] gap-2 mb-2 px-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Month</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 text-right">Collections</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 text-right">New Patients</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 text-right">Care Plans</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 text-right">Total Visits</span>
              </div>

              {/* Rows */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {rows.map((row) => (
                  <div key={row.id} className="bg-white/5 rounded-xl p-3 md:p-2">
                    {/* Mobile: stacked layout */}
                    <div className="md:hidden space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-black text-white">{formatMonth(row.month)}</span>
                        {rows.length > 1 && (
                          <button onClick={() => removeMonth(row.id)} className="text-white/15 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] font-bold uppercase tracking-widest text-white/20 mb-0.5 block">Collections ($)</label>
                          <input type="number" min="0" value={row.collections || ""} onChange={(e) => updateRow(row.id, "collections", Number(e.target.value))} placeholder="16000" className={inputClass} />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold uppercase tracking-widest text-white/20 mb-0.5 block">New Patients</label>
                          <input type="number" min="0" value={row.new_patients || ""} onChange={(e) => updateRow(row.id, "new_patients", Number(e.target.value))} placeholder="8" className={inputClass} />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold uppercase tracking-widest text-white/20 mb-0.5 block">Care Plans</label>
                          <input type="number" min="0" value={row.care_plans || ""} onChange={(e) => updateRow(row.id, "care_plans", Number(e.target.value))} placeholder="5" className={inputClass} />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold uppercase tracking-widest text-white/20 mb-0.5 block">Total Visits</label>
                          <input type="number" min="0" value={row.total_visits || ""} onChange={(e) => updateRow(row.id, "total_visits", Number(e.target.value))} placeholder="220" className={inputClass} />
                        </div>
                      </div>
                    </div>

                    {/* Desktop: row layout */}
                    <div className="hidden md:grid grid-cols-[140px_1fr_1fr_1fr_1fr] gap-2 items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white/60">{formatMonth(row.month)}</span>
                        {rows.length > 1 && (
                          <button onClick={() => removeMonth(row.id)} className="text-white/10 hover:text-red-400 transition-colors">
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                      <input type="number" min="0" value={row.collections || ""} onChange={(e) => updateRow(row.id, "collections", Number(e.target.value))} placeholder="16000" className={inputClass} />
                      <input type="number" min="0" value={row.new_patients || ""} onChange={(e) => updateRow(row.id, "new_patients", Number(e.target.value))} placeholder="8" className={inputClass} />
                      <input type="number" min="0" value={row.care_plans || ""} onChange={(e) => updateRow(row.id, "care_plans", Number(e.target.value))} placeholder="5" className={inputClass} />
                      <input type="number" min="0" value={row.total_visits || ""} onChange={(e) => updateRow(row.id, "total_visits", Number(e.target.value))} placeholder="220" className={inputClass} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional: Active Patients & Overhead */}
              <button
                onClick={() => setShowExtras(!showExtras)}
                className="flex items-center gap-1 text-xs text-white/20 hover:text-white/40 transition-colors font-medium mt-4"
              >
                {showExtras ? "Hide" : "Add"} active patients &amp; overhead (optional)
              </button>
              <AnimatePresence>
                {showExtras && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-3 mt-3 max-w-sm">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 mb-1 block">Active Patients (current)</label>
                        <input
                          type="number"
                          min="0"
                          value={rows[rows.length - 1]?.active_patients || ""}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setRows((prev) => prev.map((r, i) => i === prev.length - 1 ? { ...r, active_patients: val } : r));
                          }}
                          placeholder="e.g. 120"
                          className={inputClass}
                        />
                        <p className="text-[9px] text-white/15 mt-1">Total unique patients in your practice right now</p>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 mb-1 block">Monthly Overhead ($)</label>
                        <input
                          type="number"
                          min="0"
                          value={rows[rows.length - 1]?.overhead || ""}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setRows((prev) => prev.map((r, i) => i === prev.length - 1 ? { ...r, overhead: val } : r));
                          }}
                          placeholder="e.g. 6000"
                          className={inputClass}
                        />
                        <p className="text-[9px] text-white/15 mt-1">Rent, staff, insurance, supplies</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={onCancel}
                  className="text-sm text-white/30 hover:text-white/60 transition-colors font-medium flex items-center gap-1"
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <BrandButton
                  variant="accent"
                  size="sm"
                  className="px-6 group"
                  onClick={() => setStep("review")}
                  disabled={filledRows.length === 0}
                >
                  Review {filledRows.length} month{filledRows.length !== 1 ? "s" : ""}
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
                </BrandButton>
              </div>
            </motion.div>
          )}

          {/* ── REVIEW STEP ── */}
          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-2">
                Review Your Baseline
              </p>
              <h2 className="text-xl font-black text-white tracking-tight mb-6">
                Here&apos;s what {filledRows.length} month{filledRows.length !== 1 ? "s" : ""} of data tells us.
              </h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1">Avg Monthly</p>
                  <p className="text-xl font-black text-white">${Math.round(avgMonthlyCollections).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1">Conversion</p>
                  <p className={`text-xl font-black ${conversionRate >= 65 ? "text-green-400" : conversionRate >= 50 ? "text-amber-400" : "text-red-400"}`}>
                    {conversionRate}%
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1">CVA</p>
                  <p className="text-xl font-black text-white">${cva > 0 ? cva.toFixed(0) : "—"}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1">Total NP</p>
                  <p className="text-xl font-black text-white">{totalNP}</p>
                  <p className="text-[10px] text-white/30">{(totalNP / Math.max(filledRows.length, 1)).toFixed(1)}/mo avg</p>
                </div>
              </div>

              {/* Insight */}
              {conversionRate > 0 && conversionRate < 65 && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-amber-200 font-medium">
                    Your conversion is {conversionRate}%. For every 10 Day 1s, {10 - Math.round(conversionRate / 10)} walk out without care.
                    This is usually the #1 lever to move.
                  </p>
                </div>
              )}

              <p className="text-xs text-white/20 mb-6">
                This will create weekly entries from your monthly data so your dashboard has full context from day one.
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep("input")}
                  className="text-sm text-white/30 hover:text-white/60 transition-colors font-medium flex items-center gap-1"
                >
                  <ArrowLeft size={14} /> Edit Data
                </button>
                <BrandButton
                  variant="accent"
                  className="px-8 py-3 group"
                  onClick={handleImport}
                >
                  <span className="flex items-center gap-2">
                    Import {filledRows.length} Months <Upload size={16} />
                  </span>
                </BrandButton>
              </div>
            </motion.div>
          )}

          {/* ── IMPORTING STEP ── */}
          {step === "importing" && (
            <motion.div
              key="importing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-orange/20 flex items-center justify-center">
                {importProgress < 100 ? (
                  <Loader2 size={28} className="text-brand-orange animate-spin" />
                ) : (
                  <Check size={28} className="text-green-400" />
                )}
              </div>
              <h2 className="text-xl font-black text-white tracking-tight mb-2">
                {importProgress < 100 ? "Importing your history..." : "Done!"}
              </h2>
              <p className="text-sm text-white/40 font-medium mb-6">
                {importProgress < 100
                  ? `${importProgress}% complete`
                  : "Your dashboard is ready with full historical context."}
              </p>

              {/* Progress bar */}
              <div className="w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-brand-orange rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${importProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
