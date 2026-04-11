"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Licensing & Legal",
    items: [
      "Pass all board exams (Parts I-IV + Physiotherapy if required)",
      "Apply for state license in the state you want to practice",
      "Get malpractice insurance (most employers require this)",
      "Get your NPI number (National Provider Identifier)",
      "Set up your DEA number if needed for your state",
    ],
  },
  {
    name: "Job Search",
    items: [
      "Update your resume with clinical rotations and technique training",
      "Practice your interview answers (use the Interview Prep tool)",
      "Research 5-10 practices in your target area",
      "Reach out to at least 3 practice owners for informational interviews",
      "Have a lawyer review any contract before signing (especially non-competes)",
    ],
  },
  {
    name: "Financial Prep",
    items: [
      "Know your total student loan balance and monthly payment",
      "Run your budget in the First Year Budget tool",
      "Set up an emergency fund goal ($2,000 minimum before starting)",
      "Research health insurance options (employer, marketplace, parents until 26)",
      "Set up a simple budget system (even a spreadsheet works)",
    ],
  },
  {
    name: "Clinical Readiness",
    items: [
      "Practice your Day 1 and Day 2 scripts until they feel natural",
      "Complete all modules in the NeuroChiro curriculum",
      "Practice with at least 5 different patient scenarios (use Practice Conversations tool)",
      "Know your go-to technique and be able to explain it simply",
      "Have a 30-second answer ready for 'What kind of chiropractor are you?'",
    ],
  },
];

export function GradChecklistClient() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const pct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Graduation Checklist</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Everything you need to have ready before you start practicing. Check them off as you go.</p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-bold text-brand-navy">{checkedCount} of {totalItems} complete</p>
          <p className={cn("text-sm font-bold", pct >= 80 ? "text-green-600" : pct >= 50 ? "text-brand-orange" : "text-brand-gray")}>{pct}%</p>
        </div>
        <div className="h-2 bg-brand-navy/5 rounded-full overflow-hidden">
          <div className={cn("h-full rounded-full transition-all", pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-brand-orange" : "bg-brand-navy/20")} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat.name} className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm">
          <p className="text-sm font-bold text-brand-navy mb-3">{cat.name}</p>
          <div className="space-y-2">
            {cat.items.map((item) => {
              const key = `${cat.name}-${item}`;
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className="w-full flex items-start gap-3 text-left py-2 touch-target"
                >
                  <div className={cn(
                    "w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors",
                    checked[key] ? "bg-brand-orange border-brand-orange" : "border-brand-navy/20"
                  )}>
                    {checked[key] && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <span className={cn("text-sm font-medium transition-colors", checked[key] ? "text-brand-navy/40 line-through" : "text-brand-navy")}>
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {pct === 100 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
          <p className="text-lg font-black text-green-700">You're ready. Go get your first patients.</p>
        </div>
      )}
    </div>
  );
}
