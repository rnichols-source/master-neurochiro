"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const skills = [
  "Introducing myself and orienting a new patient",
  "Asking good questions and listening without interrupting",
  "Explaining findings in simple, non-clinical language",
  "Recommending a care plan with one clear recommendation",
  "Stating the price without apologizing or flinching",
  "Handling 'I need to think about it'",
  "Staying silent after making a recommendation",
  "Explaining why visit frequency matters",
  "Handling a patient who questions the plan",
  "Running a re-exam and showing progress",
];

export function ConfidenceTrackerClient() {
  const [scores, setScores] = useState<number[]>(skills.map(() => 3));

  const updateScore = (index: number, value: number) => {
    const next = [...scores];
    next[index] = value;
    setScores(next);
  };

  const average = scores.reduce((a, b) => a + b, 0) / scores.length;
  const lowest = Math.min(...scores);
  const lowestIndex = scores.indexOf(lowest);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Confidence Tracker</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Rate yourself 1-5 on each skill. Be honest — this is just for you.</p>
      </div>

      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-4">
        {skills.map((skill, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-brand-navy/5 last:border-0">
            <p className="text-sm font-medium text-brand-navy flex-1">{skill}</p>
            <div className="flex gap-1.5 shrink-0">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => updateScore(i, val)}
                  className={cn(
                    "w-9 h-9 rounded-lg text-sm font-bold transition-all touch-target",
                    scores[i] === val
                      ? "bg-brand-orange text-white"
                      : "bg-brand-navy/5 text-brand-navy/40 hover:bg-brand-navy/10"
                  )}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm text-center">
          <p className="text-xs font-bold text-brand-gray mb-1">Your Average</p>
          <p className={cn(
            "text-3xl font-black",
            average >= 4 ? "text-green-600" : average >= 3 ? "text-brand-orange" : "text-red-500"
          )}>
            {average.toFixed(1)}
          </p>
          <p className="text-xs text-brand-gray mt-1">out of 5</p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm text-center">
          <p className="text-xs font-bold text-brand-gray mb-1">Focus Area</p>
          <p className="text-sm font-bold text-brand-navy">{skills[lowestIndex]}</p>
          <p className="text-xs text-brand-orange mt-1">Score: {lowest}/5 — practice this first</p>
        </div>
      </div>

      <div className="bg-brand-navy/5 border-l-4 border-l-brand-orange rounded-2xl p-4">
        <p className="text-sm font-medium text-brand-navy">
          <strong>How to use this:</strong> Take this assessment at the start of each week. Your goal is to move your lowest score up by 1 point each week. Use the Practice Conversations tool to rehearse your weakest skill.
        </p>
      </div>
    </div>
  );
}
