"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export function BreakEvenClient() {
  const [overhead, setOverhead] = useState(25000);
  const [cpv, setCpv] = useState(65);
  const workDays = 20;

  const visitsNeeded = cpv > 0 ? Math.ceil(overhead / cpv) : 0;
  const visitsPerDay = cpv > 0 ? Math.ceil(visitsNeeded / workDays) : 0;

  const cpvPlus10 = cpv + 10;
  const visitsNeededPlus10 = cpvPlus10 > 0 ? Math.ceil(overhead / cpvPlus10) : 0;
  const visitsPerDayPlus10 = cpvPlus10 > 0 ? Math.ceil(visitsNeededPlus10 / workDays) : 0;
  const visitsSaved = visitsNeeded - visitsNeededPlus10;

  const inputClass = "w-full bg-white border border-brand-navy/10 rounded-xl py-4 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 outline-none";

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Break-Even Calculator</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">How many patients do you need just to cover your costs?</p>
      </div>

      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-navy">Monthly Overhead ($)</label>
          <p className="text-xs text-brand-gray">Rent, staff, utilities, software — everything before you get paid.</p>
          <input type="number" inputMode="numeric" value={overhead} onChange={(e) => setOverhead(Number(e.target.value) || 0)} className={inputClass} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-navy">Average Collection Per Visit ($)</label>
          <input type="number" inputMode="numeric" value={cpv} onChange={(e) => setCpv(Number(e.target.value) || 0)} className={inputClass} />
        </div>
      </div>

      {cpv > 0 && (
        <div className="space-y-4">
          <div className="bg-brand-navy text-white rounded-2xl p-6 md:p-8 text-center space-y-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Your Break-Even Point</p>
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-4xl font-black">{visitsNeeded}</p>
                <p className="text-xs text-white/50">visits/month</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-4xl font-black">{visitsPerDay}</p>
                <p className="text-xs text-white/50">visits/day</p>
              </div>
            </div>
            <p className="text-sm text-white/40 font-medium">Everything after {visitsNeeded} visits is your income.</p>
          </div>

          <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-brand-navy">What if you raised your fee by $10?</p>
                <p className="text-sm text-brand-gray font-medium mt-1">
                  At ${cpvPlus10}/visit, you&apos;d need {visitsNeededPlus10} visits ({visitsPerDayPlus10}/day) — {visitsSaved} fewer visits to break even.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
