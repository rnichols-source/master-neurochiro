import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { fetchCurriculumWithProgress } from "@/app/actions/curriculum-actions";
import { CheckCircle2, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

const weekData: Record<number, { title: string; desc: string; resource?: { name: string; link: string } }> = {
  1: { title: "Identity of a Nervous System Doctor", desc: "Build the foundation — how you show up, how you communicate, who you are in the room.", resource: { name: "Getting Started Worksheet", link: "/portal/triage" } },
  2: { title: "Chiropractic Neurology for REAL Practice", desc: "Learn to explain findings clearly so patients understand and trust you.", resource: { name: "Case Presentation Guide", link: "/portal/triage" } },
  3: { title: "Communication Mastery", desc: "Word-for-word scripts for care plans that get a yes.", resource: { name: "Conversation Scripts", link: "/portal/triage" } },
  4: { title: "Philosophy (Modern + Powerful)", desc: "Build a philosophy that drives confident recommendations.", resource: { name: "Philosophy Framework", link: "/portal/triage" } },
  5: { title: "Business: What School NEVER Taught You", desc: "Break-even, pricing, and making your practice profitable.", resource: { name: "Pricing Calculator", link: "/portal/tools/break-even" } },
  6: { title: "Care Plans, Day 1 / Day 2 Mastery", desc: "Master the architecture of consultations and report of findings.", resource: { name: "Care Plan Scripts", link: "/portal/triage" } },
  7: { title: "Patient Management & Long-Term Clinical Leadership", desc: "Build retention systems and lead patients through complete care plans.", resource: { name: "Retention Framework", link: "/portal/triage" } },
  8: { title: "Ownership, Contracts & Scaling", desc: "Contracts, associate agreements, and scaling your practice.", resource: { name: "Scaling Playbook", link: "/portal/triage" } },
};

export default async function PortalCurriculumPage() {
  const result = await fetchCurriculumWithProgress();
  const phases = result.success && result.data ? result.data : [];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Learn</h1>
          <p className="text-sm text-brand-gray font-medium mt-2">
            Your 8-week roadmap. Complete each phase to unlock the next.
          </p>
          <div className="flex gap-3 mt-4">
            <span className="px-4 py-2 bg-brand-navy text-white rounded-xl text-sm font-bold">Curriculum</span>
            <Link href="/portal/playbooks" className="px-4 py-2 bg-brand-navy/5 text-brand-navy/60 rounded-xl text-sm font-bold hover:bg-brand-navy/10 transition-colors">
              Playbooks
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {phases.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="Curriculum loading"
              description="Your 8-week roadmap will appear here once your cohort begins."
            />
          ) : phases.map((phase: any) => {
            const week = weekData[phase.week_number] || { title: phase.title, desc: "" };
            const isLocked = phase.status === 'locked';

            return (
              <div
                key={phase.id}
                className={cn(
                  "bg-white rounded-2xl border p-4 md:p-5 transition-all",
                  isLocked ? "opacity-50 border-brand-navy/5" : "border-brand-navy/5 shadow-sm hover:border-brand-orange/30"
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Week number + status */}
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0",
                    phase.status === 'completed' ? "bg-green-500 text-white" :
                    phase.status === 'active' ? "bg-brand-orange text-white" :
                    "bg-brand-navy/5 text-brand-navy/30"
                  )}>
                    {phase.status === 'completed' ? <CheckCircle2 size={18} /> : phase.week_number}
                  </div>

                  {/* Title + description */}
                  <div className="flex-1 min-w-0">
                    <h3 className={cn("text-base font-black tracking-tight", isLocked ? "text-brand-navy/40" : "text-brand-navy")}>
                      Week {phase.week_number}: {week.title}
                    </h3>
                    <p className="text-sm text-brand-gray font-medium truncate">{week.desc}</p>
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    {phase.status === 'completed' ? (
                      <Link href={`/portal/curriculum/${phase.slug}`} className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors">
                        Review
                      </Link>
                    ) : phase.status === 'active' ? (
                      <Link href={`/portal/curriculum/${phase.slug}`} className="bg-brand-navy text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-brand-black transition-colors active:scale-[0.98] inline-block">
                        Continue
                      </Link>
                    ) : (
                      <span className="text-xs font-bold text-brand-navy/20">
                        Unlocks {new Date(new Date('2026-04-21').getTime() + (phase.week_number - 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
