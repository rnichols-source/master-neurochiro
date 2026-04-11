"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import Link from "next/link";

export function CaseCalculatorClient() {
  const [visits, setVisits] = useState(36);
  const [perVisit, setPerVisit] = useState(65);
  const [showResult, setShowResult] = useState(false);

  const total = visits * perVisit;
  const pay2 = Math.ceil(total / 2);
  const pay6 = Math.ceil(total / 6);
  const pay12 = Math.ceil(total / 12);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Care Plan Calculator</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Prep your care plan numbers in 30 seconds.</p>
      </div>

      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-navy">Recommended Visits</label>
            <input type="number" inputMode="numeric" value={visits} onChange={(e) => setVisits(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-4 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-navy">Per-Visit Fee ($)</label>
            <input type="number" inputMode="numeric" value={perVisit} onChange={(e) => setPerVisit(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-4 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 outline-none" />
          </div>
        </div>
        <button onClick={() => setShowResult(true)} className="w-full bg-brand-navy text-white rounded-xl py-4 text-sm font-bold hover:bg-brand-black transition-colors active:scale-[0.98] flex items-center justify-center gap-2">
          <Calculator className="w-4 h-4" /> Calculate
        </button>
      </div>

      {showResult && total > 0 && (
        <div className="space-y-4">
          <div className="bg-brand-navy text-white rounded-2xl p-6 md:p-8 text-center">
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Total Care Plan Investment</p>
            <p className="text-4xl md:text-5xl font-black">${total.toLocaleString()}</p>
            <p className="text-sm text-white/50 mt-2">{visits} visits × ${perVisit}/visit</p>
          </div>
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm">
            <p className="text-sm font-bold text-brand-navy mb-4">Payment Options:</p>
            <div className="space-y-3">
              {[
                { label: "Pay in Full", amount: total },
                { label: "2 Payments", amount: pay2, suffix: "/mo" },
                { label: "6 Payments", amount: pay6, suffix: "/mo" },
                { label: "12 Payments", amount: pay12, suffix: "/mo" },
              ].map((opt) => (
                <div key={opt.label} className="flex justify-between items-center py-3 border-b border-brand-navy/5 last:border-0">
                  <span className="text-sm font-medium text-brand-gray">{opt.label}</span>
                  <span className="text-lg font-black text-brand-navy">${opt.amount.toLocaleString()}{opt.suffix || ""}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-5">
            <p className="text-sm font-bold text-brand-navy mb-2">If they hesitate, try:</p>
            <p className="text-sm text-brand-gray font-medium italic">&ldquo;That&apos;s ${Math.ceil(pay12 / 30)}/day — less than a coffee. Except this actually changes your health.&rdquo;</p>
          </div>
        </div>
      )}
    </div>
  );
}
