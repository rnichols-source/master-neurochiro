import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { ImplementationProof } from "@/components/portal/ImplementationProof";
import { fetchCurriculumWithProgress } from "@/app/actions/curriculum-actions";
import { 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Brain, 
  Zap, 
  Target,
  BarChart3,
  Users,
  Timer,
  DollarSign,
  Download,
  Star,
  Trophy,
  Activity
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const hormoziMetadata: Record<number, any> = {
  1: {
    outcomeTitle: "Clinical Identity Reconstruction",
    subTitle: "Phase 01: Becoming the $1M Nervous System Doctor",
    expectedROI: "Instant Authority Shift",
    quickAsset: { name: "Identity Calibration Worksheet", link: "/portal/triage?category=clinic_os" },
    statusBadge: "Authorized Identity"
  },
  2: {
    outcomeTitle: "Clinical Certainty Engine",
    subTitle: "Phase 02: Engineered Neurology for REAL Practice",
    expectedROI: "100% Case Certainty",
    quickAsset: { name: "Case Presentation Deck", link: "/portal/triage?category=patient_edu" },
    statusBadge: "Clinical Architect"
  },
  3: {
    outcomeTitle: "The Communication Engine",
    subTitle: "Phase 03: Closing $5,000 Care Plans with Zero Resistance",
    expectedROI: "Save 1 lost case/mo ($5k+)",
    quickAsset: { name: "The Neurological Pivot Script", link: "/portal/rapid-roi/script" },
    statusBadge: "Authorized Communicator"
  },
  4: {
    outcomeTitle: "The Philosophical Anchor",
    subTitle: "Phase 04: Building a Practice That Never Quits",
    expectedROI: "Lifetime Patient Retention",
    quickAsset: { name: "Retention Language Patterns", link: "/portal/triage?category=communication" },
    statusBadge: "Philosophical Lead"
  },
  5: {
    outcomeTitle: "The Business Freedom Lab",
    subTitle: "Phase 05: Scaling to 100% Profitability & Freedom",
    expectedROI: "$10k+ Monthly Profit Increase",
    quickAsset: { name: "Profitability Calculator", link: "/portal/engine" },
    statusBadge: "Practice CEO"
  },
  6: {
    outcomeTitle: "The Leadership Mastery Lab",
    subTitle: "Phase 06: Building a Team That Runs Without You",
    expectedROI: "10+ Hours Saved/Week",
    quickAsset: { name: "Staff Training Manual", link: "/portal/triage?category=staff" },
    statusBadge: "Elite Leader"
  },
  7: {
    outcomeTitle: "The Market Authority Engine",
    subTitle: "Phase 07: Omnipresence & Local Community Dominance",
    expectedROI: "5-10 New Patients/Mo",
    quickAsset: { name: "The Reactivation Campaign", link: "/portal/triage?category=marketing" },
    statusBadge: "Market Authority"
  },
  8: {
    outcomeTitle: "The Mastermind Exit",
    subTitle: "Phase 08: Final Installation & Practice Autonomy",
    expectedROI: "Total Practice Freedom",
    quickAsset: { name: "The Scale Blueprint", link: "/portal/triage?category=leadership" },
    statusBadge: "Mastermind Graduate"
  }
};

export default async function PortalCurriculumPage() {
  const result = await fetchCurriculumWithProgress();
  const phases = result.success && result.data ? result.data : [];

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange mb-4">
            <Activity size={14} className="fill-brand-orange" />
            <p className="text-[10px] font-black uppercase tracking-widest">Installation Status</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">The Roadmap</h1>
          <p className="text-brand-gray text-lg font-medium mt-6 leading-relaxed">
            Don't just watch videos. **Claim Your Status.** Each level represents a 
            fundamental upgrade to your clinical and financial architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {phases.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-brand-navy/20 font-black uppercase tracking-widest">
              No roadmap levels found.
            </div>
          ) : phases.map((phase: any, i: number) => {
            const meta = hormoziMetadata[phase.week_number] || {};
            const isLocked = phase.status === 'locked';
            
            return (
              <EliteCard 
                key={phase.id}
                className={cn(
                  "p-0 overflow-hidden transition-all duration-500 group border-2",
                  isLocked 
                    ? "opacity-60 bg-brand-cream/20 grayscale border-transparent" 
                    : "hover:border-brand-orange/40 bg-white shadow-2xl border-brand-navy/5"
                )}
              >
                <div className="flex flex-col lg:flex-row items-stretch min-h-[200px]">
                  {/* Status Indicator Bar */}
                  <div className={cn(
                    "w-full lg:w-4 shrink-0 transition-colors duration-700 h-2 lg:h-auto",
                    phase.status === 'completed' ? "bg-green-500" :
                    phase.status === 'active' ? "bg-brand-orange animate-pulse" : "bg-brand-navy/10"
                  )} />

                  <div className="flex-1 p-8 lg:p-10">
                    <div className="flex flex-col md:flex-row justify-between gap-10">
                      {/* Title & Badges */}
                      <div className="space-y-6 flex-1">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black transition-all",
                            isLocked ? "bg-brand-navy/5 text-brand-navy/20" : "bg-brand-navy text-white shadow-xl"
                          )}>
                            <span className="text-[8px] uppercase tracking-tighter opacity-40">Level</span>
                            <span className="text-2xl leading-none">0{phase.week_number}</span>
                          </div>
                          <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {!isLocked && (
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-600 rounded text-[8px] font-black uppercase tracking-widest">
                                  <DollarSign size={10} /> ROI: {meta.expectedROI}
                                </div>
                              )}
                            </div>
                            <h3 className={cn(
                              "text-2xl font-black tracking-tight leading-none",
                              isLocked ? "text-brand-navy/40" : "text-brand-navy group-hover:text-brand-orange transition-colors"
                            )}>
                              {meta.outcomeTitle || phase.title}
                            </h3>
                            <p className="text-brand-gray font-bold text-xs mt-1 uppercase tracking-tight">{meta.subTitle}</p>
                          </div>
                        </div>

                        {/* Quick Asset Hook */}
                        {!isLocked && meta.quickAsset && (
                          <div className="flex items-center gap-4 p-4 bg-brand-cream/50 rounded-2xl border border-brand-navy/5 w-fit">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-orange shadow-sm">
                              <Download size={14} />
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-brand-navy/40 uppercase tracking-widest leading-none mb-1">Quick Win Asset</p>
                              <Link href={meta.quickAsset.link} className="text-[10px] font-bold text-brand-navy hover:text-brand-orange underline transition-colors">
                                {meta.quickAsset.name}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-center items-end gap-4 w-full md:w-auto">
                        {phase.status === 'completed' ? (
                          <div className="flex items-center gap-3 px-6 py-3 bg-green-500/10 text-green-600 rounded-2xl border border-green-500/20 shadow-lg shadow-green-500/5">
                            <Trophy size={18} className="fill-green-500/20" />
                            <div>
                              <p className="text-[8px] font-black uppercase tracking-widest leading-none mb-1">Status Unlocked</p>
                              <p className="text-xs font-black uppercase">{meta.statusBadge}</p>
                            </div>
                          </div>
                        ) : phase.status === 'active' ? (
                          <div className="flex flex-col gap-3 w-full md:w-auto">
                            <Link href={`/portal/curriculum/${phase.slug}`} className="w-full">
                              <BrandButton variant="primary" className="w-full justify-between gap-8 group py-6">
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Open Training Room</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </BrandButton>
                            </Link>
                            <ImplementationProof 
                              phaseId={phase.id} 
                              phaseTitle={meta.outcomeTitle || phase.title} 
                            />
                          </div>
                        ) : (
                          <div className="px-8 py-4 bg-brand-navy/5 rounded-2xl text-[10px] font-black text-brand-navy/20 uppercase tracking-[0.2em] border border-brand-navy/5 text-center w-full min-w-[200px]">
                            Level 0{phase.week_number} Locked
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </EliteCard>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
