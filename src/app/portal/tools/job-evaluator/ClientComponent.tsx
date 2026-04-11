"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function JobEvaluatorClient() {
  const [data, setData] = useState({
    baseSalary: 60000,
    bonus: "yes",
    patientsPerDay: 20,
    mentorship: "yes",
    presentOwnPlans: "yes",
    contractLength: 1,
    nonCompete: "no",
    benefits: "some",
  });

  let score = 0;
  if (data.baseSalary >= 70000) score += 3; else if (data.baseSalary >= 55000) score += 2; else score += 1;
  if (data.bonus === "yes") score += 2;
  if (data.patientsPerDay >= 15 && data.patientsPerDay <= 30) score += 2; else if (data.patientsPerDay > 30) score += 1; else score += 1;
  if (data.mentorship === "yes") score += 3;
  if (data.presentOwnPlans === "yes") score += 2;
  if (data.contractLength <= 2) score += 2; else score += 1;
  if (data.nonCompete === "no") score += 2; else score += 0;
  if (data.benefits === "full") score += 2; else if (data.benefits === "some") score += 1;

  const maxScore = 18;
  const pct = Math.round((score / maxScore) * 100);

  const inputClass = "w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none";
  const selectClass = "w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none appearance-none";

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Job Offer Evaluator</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Enter the details of an associate position. We'll tell you if it's a good deal.</p>
      </div>

      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-brand-navy">Base Salary ($)</label>
            <input type="number" inputMode="numeric" value={data.baseSalary} onChange={(e) => setData({...data, baseSalary: Number(e.target.value) || 0})} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-brand-navy">Production Bonus?</label>
            <select value={data.bonus} onChange={(e) => setData({...data, bonus: e.target.value})} className={selectClass}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-brand-navy">Patients Per Day</label>
            <input type="number" inputMode="numeric" value={data.patientsPerDay} onChange={(e) => setData({...data, patientsPerDay: Number(e.target.value) || 0})} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-brand-navy">Mentorship Provided?</label>
            <select value={data.mentorship} onChange={(e) => setData({...data, mentorship: e.target.value})} className={selectClass}>
              <option value="yes">Yes — structured training</option>
              <option value="no">No — figure it out yourself</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-brand-navy">Present Your Own Plans?</label>
            <select value={data.presentOwnPlans} onChange={(e) => setData({...data, presentOwnPlans: e.target.value})} className={selectClass}>
              <option value="yes">Yes — I present care plans</option>
              <option value="no">No — owner presents them</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-brand-navy">Contract Length (years)</label>
            <input type="number" inputMode="numeric" value={data.contractLength} onChange={(e) => setData({...data, contractLength: Number(e.target.value) || 0})} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-brand-navy">Non-Compete Clause?</label>
            <select value={data.nonCompete} onChange={(e) => setData({...data, nonCompete: e.target.value})} className={selectClass}>
              <option value="no">No non-compete</option>
              <option value="yes">Yes — restricted after leaving</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-brand-navy">Benefits?</label>
            <select value={data.benefits} onChange={(e) => setData({...data, benefits: e.target.value})} className={selectClass}>
              <option value="full">Full (health, PTO, CE)</option>
              <option value="some">Some (partial)</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className={cn(
        "rounded-2xl p-6 text-center space-y-2",
        pct >= 75 ? "bg-green-50 border border-green-200" :
        pct >= 50 ? "bg-yellow-50 border border-yellow-200" :
        "bg-red-50 border border-red-200"
      )}>
        <p className={cn("text-xs font-bold uppercase tracking-wider",
          pct >= 75 ? "text-green-600" : pct >= 50 ? "text-yellow-600" : "text-red-600"
        )}>
          {pct >= 75 ? "Strong Offer" : pct >= 50 ? "Average — Negotiate" : "Below Average — Be Careful"}
        </p>
        <p className="text-4xl font-black text-brand-navy">{score}/{maxScore}</p>
        <p className="text-sm text-brand-gray font-medium">
          {pct >= 75 ? "This looks like a solid position. Make sure the mentorship is real — ask for specifics." :
           pct >= 50 ? "There are some gaps. Try to negotiate on the weak areas before accepting." :
           "Several red flags here. Consider other options or negotiate hard on salary, mentorship, and non-compete."}
        </p>
      </div>

      {data.nonCompete === "yes" && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-sm font-bold text-red-700">Watch out: Non-compete clauses can prevent you from opening your own practice nearby for years after you leave. Have a lawyer review it before signing.</p>
        </div>
      )}

      {data.mentorship === "no" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-sm font-bold text-yellow-700">No structured mentorship means you're learning on your own. For your first job, mentorship is more valuable than an extra $10K in salary.</p>
        </div>
      )}
    </div>
  );
}
