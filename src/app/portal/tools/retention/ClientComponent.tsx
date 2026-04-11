"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function RetentionClient() {
  const [started, setStarted] = useState(20);
  const [completed, setCompleted] = useState(12);
  const [avgCaseValue, setAvgCaseValue] = useState(3000);
  const [dropOffVisit, setDropOffVisit] = useState(10);
  const [totalVisits, setTotalVisits] = useState(36);

  const retained = started > 0 ? Math.round((completed / started) * 100) : 0;
  const dropped = started - completed;
  const revenueLost = dropped * avgCaseValue;
  const yearlyLoss = revenueLost * 12;
  const dropOffPct = totalVisits > 0 ? Math.round((dropOffVisit / totalVisits) * 100) : 0;

  const status = retained >= 80 ? "green" : retained >= 60 ? "yellow" : "red";

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-6 pb-20">
        <div>
          <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Retention Tracker</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">
            See how many patients finish their care plans — and how much you&apos;re losing when they don&apos;t.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">Patients Started (this month)</label>
              <input type="number" inputMode="numeric" value={started} onChange={(e) => setStarted(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">Patients Completed</label>
              <input type="number" inputMode="numeric" value={completed} onChange={(e) => setCompleted(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">Avg Care Plan Value ($)</label>
              <input type="number" inputMode="numeric" value={avgCaseValue} onChange={(e) => setAvgCaseValue(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">Avg Drop-Off Visit #</label>
              <p className="text-xs text-brand-gray">What visit do patients usually quit at?</p>
              <input type="number" inputMode="numeric" value={dropOffVisit} onChange={(e) => setDropOffVisit(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none" />
            </div>
          </div>
        </div>

        {/* Results */}
        {started > 0 && (
          <div className="space-y-4">
            <div className={cn(
              "rounded-2xl p-6 md:p-8 text-center space-y-3",
              status === "green" ? "bg-green-50 border border-green-200" :
              status === "yellow" ? "bg-yellow-50 border border-yellow-200" :
              "bg-red-50 border border-red-200"
            )}>
              <p className={cn(
                "text-xs font-bold uppercase tracking-wider",
                status === "green" ? "text-green-600" : status === "yellow" ? "text-yellow-600" : "text-red-600"
              )}>
                {status === "green" ? "Strong Retention" : status === "yellow" ? "Needs Attention" : "Critical — You're Losing Patients"}
              </p>
              <p className="text-5xl font-black text-brand-navy">{retained}%</p>
              <p className="text-sm text-brand-gray font-medium">retention rate ({completed} of {started} patients completed care)</p>
            </div>

            {dropped > 0 && (
              <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-brand-navy">
                      {dropped} patients dropped off this month
                    </p>
                    <p className="text-sm text-brand-gray font-medium mt-1">
                      That&apos;s approximately <strong className="text-red-600">${revenueLost.toLocaleString()}</strong> in lost revenue this month
                      — or <strong className="text-red-600">${yearlyLoss.toLocaleString()}/year</strong> if this continues.
                    </p>
                  </div>
                </div>

                {dropOffVisit > 0 && (
                  <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-4">
                    <p className="text-sm font-bold text-brand-navy">Where patients are quitting:</p>
                    <p className="text-sm text-brand-gray font-medium mt-1">
                      Most patients leave around visit {dropOffVisit} of {totalVisits} ({dropOffPct}% through their plan).
                      {dropOffPct < 40
                        ? " They're leaving early — your Day 2 presentation may need work. Check the Playbooks."
                        : dropOffPct < 70
                        ? " They're leaving mid-plan — strengthen your re-exam process and check-in conversations."
                        : " They're leaving near the end — consider adjusting your plan length or adding a strong completion incentive."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
