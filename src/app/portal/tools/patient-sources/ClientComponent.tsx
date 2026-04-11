"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sources = ["Referral", "Google", "Social Media", "Event / Workshop", "Insurance Directory", "Walk-In", "Other"];

interface Entry { source: string; started: boolean; value: number; }

export function PatientSourcesClient() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newSource, setNewSource] = useState(sources[0]);
  const [newStarted, setNewStarted] = useState(true);
  const [newValue, setNewValue] = useState(3000);

  const addEntry = () => {
    setEntries([...entries, { source: newSource, started: newStarted, value: newStarted ? newValue : 0 }]);
  };

  const sourceStats = sources.map((s) => {
    const all = entries.filter((e) => e.source === s);
    const started = all.filter((e) => e.started);
    return {
      name: s,
      total: all.length,
      converted: started.length,
      rate: all.length > 0 ? Math.round((started.length / all.length) * 100) : 0,
      revenue: started.reduce((sum, e) => sum + e.value, 0),
    };
  }).filter((s) => s.total > 0).sort((a, b) => b.revenue - a.revenue);

  const inputClass = "w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none";

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Patient Source Tracker</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Track where your new patients come from — and which sources actually produce paying patients.</p>
      </div>

      {/* Add Entry */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm space-y-4">
        <p className="text-sm font-bold text-brand-navy">Log a New Patient</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-navy/60">How did they find you?</label>
            <select value={newSource} onChange={(e) => setNewSource(e.target.value)} className={cn(inputClass, "appearance-none")}>
              {sources.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-navy/60">Started a care plan?</label>
            <select value={newStarted ? "yes" : "no"} onChange={(e) => setNewStarted(e.target.value === "yes")} className={cn(inputClass, "appearance-none")}>
              <option value="yes">Yes — started care</option>
              <option value="no">No — didn't convert</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-navy/60">Care plan value ($)</label>
            <input type="number" inputMode="numeric" value={newStarted ? newValue : 0} disabled={!newStarted} onChange={(e) => setNewValue(Number(e.target.value) || 0)} className={cn(inputClass, !newStarted && "opacity-40")} />
          </div>
        </div>
        <button onClick={addEntry} className="w-full bg-brand-navy text-white rounded-xl py-3 text-sm font-bold hover:bg-brand-black transition-colors active:scale-[0.98] touch-target">
          Add Patient
        </button>
      </div>

      {/* Results */}
      {sourceStats.length > 0 && (
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm">
          <p className="text-sm font-bold text-brand-navy mb-4">Your Sources — Ranked by Revenue</p>
          <div className="space-y-3">
            {sourceStats.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between py-3 border-b border-brand-navy/5 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0", i === 0 ? "bg-brand-orange" : "bg-brand-navy/20")}>{i + 1}</span>
                  <div>
                    <p className="text-sm font-bold text-brand-navy">{s.name}</p>
                    <p className="text-xs text-brand-gray">{s.total} patients · {s.rate}% converted</p>
                  </div>
                </div>
                <p className="text-sm font-black text-brand-navy">${s.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {sourceStats.length > 0 && (
        <div className="bg-brand-navy/5 border-l-4 border-l-brand-orange rounded-2xl p-4">
          <p className="text-sm font-medium text-brand-navy">
            <strong>Double down on #{sourceStats[0]?.name}.</strong> It's producing the most revenue. If any source has a low conversion rate, consider whether the leads are qualified or if your Day 1 process needs work for that type of patient.
          </p>
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-brand-gray">Add your new patients above. After 10-20 entries, you'll see which marketing actually works.</p>
        </div>
      )}
    </div>
  );
}
