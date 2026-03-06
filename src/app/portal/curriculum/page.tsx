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
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const iconMap: Record<number, any> = {
  1: Brain,
  2: Zap,
  3: Target,
  4: Brain,
  5: BarChart3,
  6: Users,
  7: Brain,
  8: Target,
};

export default async function PortalCurriculumPage() {
  console.log('[PAGE] Fetching curriculum...');
  const result = await fetchCurriculumWithProgress();
  console.log('[PAGE] Curriculum result:', JSON.stringify(result));
  const phases = result.success ? result.data : [];

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-20">
        <div className="max-w-2xl">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">The Installation</p>
          <h1 className="text-5xl font-black text-brand-navy tracking-tighter">OS Curriculum</h1>
          <p className="text-brand-gray text-lg font-medium mt-4">
            Follow the engineered sequence. Do not skip phases. Each layer 
            builds upon the previous reconstruction.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {phases.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-brand-navy/20 font-black uppercase tracking-widest">
              No curriculum phases found.
            </div>
          ) : phases.map((phase: any, i: number) => (
            <EliteCard 
              key={phase.id}
              className={cn(
                "p-0 overflow-hidden transition-all group",
                phase.status === 'locked' ? "opacity-60 bg-white/50" : "hover:border-brand-orange/40 bg-white shadow-xl shadow-brand-navy/5"
              )}
            >
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Status Indicator */}
                <div className={cn(
                  "w-2 md:w-3 shrink-0 transition-colors duration-500",
                  phase.status === 'completed' ? "bg-green-500" :
                  phase.status === 'active' ? "bg-brand-orange" : "bg-brand-navy/10"
                )} />

                <div className="flex-1 p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-8">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black transition-all duration-500",
                      phase.status === 'locked' ? "bg-brand-navy/5 text-brand-navy/20" : "bg-brand-navy text-white shadow-lg"
                    )}>
                      <span className="text-[8px] uppercase tracking-tighter opacity-40">Phase</span>
                      <span className="text-2xl leading-none">0{phase.week_number}</span>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-black text-brand-navy tracking-tight group-hover:text-brand-orange transition-colors">
                        {phase.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        {phase.status === 'completed' && <span className="flex items-center gap-1 text-[8px] font-black uppercase text-green-500 tracking-widest"><CheckCircle2 className="w-3 h-3" /> Fully Installed</span>}
                        {phase.status === 'active' && <span className="flex items-center gap-1 text-[8px] font-black uppercase text-brand-orange tracking-widest"><Play className="w-3 h-3 fill-brand-orange" /> In Progress</span>}
                        {phase.status === 'locked' && <span className="flex items-center gap-1 text-[8px] font-black uppercase text-brand-navy/20 tracking-widest"><Lock className="w-3 h-3" /> Locked Phase</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto">
                    {/* Note: ImplementationProof is a client component and will need to handle revalidation */}
                    {phase.status === 'active' && (
                      <ImplementationProof 
                        phaseId={phase.id} 
                        phaseTitle={phase.title} 
                      />
                    )}
                    
                    {phase.status !== 'locked' ? (
                      <Link href={`/portal/curriculum/${phase.slug}`} className="w-full md:w-auto">
                        <BrandButton variant={phase.status === 'active' ? 'primary' : 'outline'} size="sm" className="w-full md:w-auto group">
                          Access Phase <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </BrandButton>
                      </Link>
                    ) : (
                      <div className="px-6 py-2 bg-brand-navy/5 rounded-xl text-[10px] font-black text-brand-navy/20 uppercase tracking-widest border border-brand-navy/5 w-full md:w-auto text-center">
                        Complete Phase 0{phase.week_number - 1} to Unlock
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </EliteCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
