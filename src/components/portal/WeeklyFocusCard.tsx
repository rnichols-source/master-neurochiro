import { ArrowRight, Target } from "lucide-react";
import Link from "next/link";

const weeklyFocus: Record<number, { task: string; action: string; link: string }> = {
  1: { task: "Watch Module 1.1 and complete the Identity Worksheet", action: "Start Module 1.1", link: "/portal/curriculum/week-1-identity" },
  2: { task: "Learn to explain neurological findings so patients understand and trust you", action: "Start Week 2", link: "/portal/curriculum/week-2-neurology" },
  3: { task: "Use the communication framework on your next 3 patients, then log results", action: "View Framework", link: "/portal/curriculum/week-3-communication" },
  4: { task: "Build a modern philosophy that drives confident recommendations", action: "Start Week 4", link: "/portal/curriculum/week-4-philosophy" },
  5: { task: "Know your break-even, set pricing, and submit your KPIs", action: "Submit KPIs", link: "/portal/kpi" },
  6: { task: "Master Day 1 consultations and Day 2 report of findings", action: "Start Week 6", link: "/portal/curriculum/week-6-care-plans" },
  7: { task: "Build retention systems and lead patients through complete care plans", action: "Start Week 7", link: "/portal/curriculum/week-7-patient-management" },
  8: { task: "Contracts, scaling, and planning your next chapter", action: "Finish Program", link: "/portal/curriculum/week-8-ownership" },
};

export function WeeklyFocusCard({
  weekNumber,
  completedWeeks,
}: {
  weekNumber: number;
  completedWeeks: number;
}) {
  if (completedWeeks >= 8) {
    return (
      <div className="bg-white rounded-2xl border-l-4 border-l-brand-orange border border-brand-navy/5 p-5 md:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">
              Program Complete
            </p>
            <p className="text-sm text-brand-navy font-medium">
              You&apos;ve completed the program! Explore the Council for ongoing
              coaching.
            </p>
          </div>
        </div>
        <Link
          href="/council"
          className="inline-flex items-center gap-2 bg-brand-navy text-white rounded-xl py-3 px-5 text-sm font-bold hover:bg-brand-black transition-colors active:scale-[0.98] shrink-0"
        >
          The Council <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const focus = weeklyFocus[weekNumber] || weeklyFocus[1];

  return (
    <div className="bg-white rounded-2xl border-l-4 border-l-brand-orange border border-brand-navy/5 p-5 md:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <Target className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">
            Week {weekNumber} Focus
          </p>
          <p className="text-sm text-brand-navy font-medium">{focus.task}</p>
        </div>
      </div>
      <Link
        href={focus.link}
        className="inline-flex items-center gap-2 bg-brand-navy text-white rounded-xl py-3 px-5 text-sm font-bold hover:bg-brand-black transition-colors active:scale-[0.98] shrink-0"
      >
        {focus.action} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
