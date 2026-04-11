"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function HuddleClient() {
  const [monthlyGoal, setMonthlyGoal] = useState(50000);
  const [collectedSoFar, setCollectedSoFar] = useState(0);
  const [workDaysLeft, setWorkDaysLeft] = useState(15);
  const [todayPatients, setTodayPatients] = useState(0);
  const [todayNewPatients, setTodayNewPatients] = useState(0);
  const [todayReExams, setTodayReExams] = useState(0);

  const remaining = monthlyGoal - collectedSoFar;
  const dailyTarget = workDaysLeft > 0 ? Math.ceil(remaining / workDaysLeft) : 0;
  const onTrack = collectedSoFar >= (monthlyGoal * ((20 - workDaysLeft) / 20));
  const progress = monthlyGoal > 0 ? Math.min((collectedSoFar / monthlyGoal) * 100, 100) : 0;

  const status = progress >= 90 ? "green" : progress >= 60 ? "yellow" : "red";

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-6 pb-20">
        <div>
          <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Daily Huddle</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">
            Open this every morning. 2 minutes to know exactly where you stand.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">Monthly Goal ($)</label>
              <input type="number" inputMode="numeric" value={monthlyGoal} onChange={(e) => setMonthlyGoal(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">Collected So Far ($)</label>
              <input type="number" inputMode="numeric" value={collectedSoFar} onChange={(e) => setCollectedSoFar(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">Work Days Left</label>
              <input type="number" inputMode="numeric" value={workDaysLeft} onChange={(e) => setWorkDaysLeft(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">Patients Today</label>
              <input type="number" inputMode="numeric" value={todayPatients} onChange={(e) => setTodayPatients(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">New Patients Today</label>
              <input type="number" inputMode="numeric" value={todayNewPatients} onChange={(e) => setTodayNewPatients(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">Re-Exams Today</label>
              <input type="number" inputMode="numeric" value={todayReExams} onChange={(e) => setTodayReExams(Number(e.target.value) || 0)} className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none" />
            </div>
          </div>
        </div>

        {/* Status Dashboard */}
        <div className={cn(
          "rounded-2xl p-6 md:p-8 text-center space-y-4",
          status === "green" ? "bg-green-50 border border-green-200" :
          status === "yellow" ? "bg-yellow-50 border border-yellow-200" :
          "bg-red-50 border border-red-200"
        )}>
          <p className={cn(
            "text-xs font-bold uppercase tracking-wider",
            status === "green" ? "text-green-600" : status === "yellow" ? "text-yellow-600" : "text-red-600"
          )}>
            {status === "green" ? "On Track" : status === "yellow" ? "Watch Closely" : "Behind Pace"}
          </p>
          <p className="text-3xl font-black text-brand-navy">${dailyTarget.toLocaleString()}</p>
          <p className="text-sm text-brand-gray font-medium">needed per day for the rest of the month</p>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-brand-gray">
              <span>${collectedSoFar.toLocaleString()}</span>
              <span>${monthlyGoal.toLocaleString()}</span>
            </div>
            <div className="h-3 bg-brand-navy/5 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all",
                  status === "green" ? "bg-green-500" : status === "yellow" ? "bg-yellow-500" : "bg-red-500"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Today's Quick Notes */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-3">
          <p className="text-sm font-bold text-brand-navy">Today&apos;s Focus</p>
          <div className="space-y-2 text-sm text-brand-gray font-medium">
            <p>• {todayPatients} patients scheduled — {todayNewPatients > 0 ? `including ${todayNewPatients} new patient${todayNewPatients > 1 ? "s" : ""}` : "no new patients today"}</p>
            {todayReExams > 0 && <p>• {todayReExams} re-exam{todayReExams > 1 ? "s" : ""} — prep your progress reports</p>}
            <p>• Daily collection target: <strong className="text-brand-navy">${dailyTarget.toLocaleString()}</strong></p>
          </div>
        </div>
      </div>
    </>
  );
}
