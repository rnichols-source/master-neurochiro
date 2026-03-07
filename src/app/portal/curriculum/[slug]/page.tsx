import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { fetchWeekDetail, verifyPhase } from "@/app/actions/curriculum-actions";
import { CurriculumQuiz } from "@/components/portal/curriculum-quiz";
import { createClient } from "@/lib/supabase/server";
import { 
  Play, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight,
  FileText,
  Zap,
  Lock
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function WeekDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const result = await fetchWeekDetail(slug);
  
  if (!result.success || !result.data) {
    notFound();
  }

  const { week, modules } = result.data;

  // 1. Fetch real resources with a SAFE GUARD
  let resources: any[] = [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .in('module_id', (modules || []).map((m: any) => m.id));
    
    if (data && !error) {
      resources = data;
    }
  } catch (err) {
    console.warn("[CURRICULUM] Resources table check failed, continuing safely...");
  }
  
  // Calculate completion
  const completedCount = modules.filter((m: any) => m.status === 'completed').length;
  const isPhaseFinished = completedCount === modules.length && modules.length > 0;
  const completionPercent = modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0;

  const quizQuestions = [
    {
      id: 1,
      text: "What is the primary anchor of a Nervous System-First Doctor?",
      options: ["Patient Satisfaction", "Clinical Certainty", "Insurance Reimbursement", "Marketing Reach"],
      correctIndex: 1,
      feedback: "Certainty is the non-negotiable anchor. Without it, you are just a technician chasing a yes."
    },
    {
      id: 2,
      text: "According to Week 1, what determines how you practice?",
      options: ["Your Schooling", "Your Technique", "Who You Are", "Your Location"],
      correctIndex: 2,
      feedback: "Identity reconstruction is the first step. Who you are determines the frequency of your clinic."
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <Link href="/portal/curriculum" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-orange transition-colors">
          <ChevronLeft className="w-3 h-3" /> Back to Curriculum
        </Link>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-10 border-b border-brand-navy/5">
          <div className="space-y-4">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Phase 0{week.week_number}</p>
            <h1 className="text-5xl font-black text-brand-navy tracking-tighter">{week.title}</h1>
            <p className="text-brand-gray font-medium max-w-xl">
              {week.description}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[8px] font-black uppercase text-brand-navy/40">Phase Completion</p>
              <p className="text-lg font-black text-brand-navy">{completionPercent}%</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" className="fill-none stroke-brand-navy/5 stroke-[4]" />
                <circle
                  cx="32" cy="32" r="28"
                  className="fill-none stroke-brand-orange stroke-[4] transition-all duration-1000"
                  strokeDasharray={2 * Math.PI * 28}
                  strokeDashoffset={2 * Math.PI * 28 * (1 - completionPercent / 100)}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {isPhaseFinished ? (
              <div className="space-y-8">
                <div className="flex items-center gap-3 px-2">
                  <div className="p-2 bg-green-500/10 rounded-xl"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                  <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">Units Complete. Final Validation Required.</h3>
                </div>
                <CurriculumQuiz 
                  phaseTitle={week.title} 
                  questions={quizQuestions}
                  onComplete={async () => {
                    'use server'
                    await verifyPhase(week.id);
                  }}
                />
              </div>
            ) : (
              <>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/40 ml-2">Training Units</h3>
                <div className="space-y-4">
                  {(modules || []).map((mod: any) => (
                    <EliteCard 
                      key={mod.id} 
                      className={cn(
                        "p-6 transition-all group",
                        mod.status === 'locked' ? "opacity-50" : "hover:border-brand-orange/40 cursor-pointer"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                            mod.status === 'completed' ? "bg-green-500/10 text-green-500" :
                            mod.status === 'active' ? "bg-brand-orange/10 text-brand-orange" : "bg-brand-navy/5 text-brand-navy/20"
                          )}>
                            {mod.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                             mod.status === 'active' ? <Play className="w-5 h-5 fill-brand-orange ml-0.5" /> : <Lock className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="text-[8px] font-black uppercase text-brand-navy/40">Module {week.week_number}.{mod.order_index}</p>
                            <h4 className="text-lg font-black text-brand-navy group-hover:text-brand-orange transition-colors">{mod.title}</h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {mod.status !== 'locked' && (
                            <Link href={`/portal/curriculum/${week.slug}/${mod.slug}`} className="flex items-center gap-4">
                               <span className="text-[10px] font-black text-brand-navy/40 uppercase">View Module</span>
                               <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1")} />
                            </Link>
                          )}
                          {mod.status === 'locked' && <Lock className="w-4 h-4 text-brand-navy/20" />}
                        </div>
                      </div>
                    </EliteCard>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="space-y-8">
            <EliteCard title="Implementation" subtitle="This Week's Focus" icon={Zap}>
              <div className="space-y-4 mt-4">
                {[
                  "Watch all training units",
                  "Complete clinical worksheets",
                  "Submit Implementation Proof",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border border-brand-navy/10 flex items-center justify-center text-[10px] font-black">{i + 1}</div>
                    <span className="text-xs font-bold text-brand-navy">{item}</span>
                  </div>
                ))}
              </div>
            </EliteCard>

            <EliteCard title="Proprietary Assets" subtitle="Downloads" icon={FileText}>
              <div className="space-y-3 mt-4">
                {resources.length > 0 ? resources.map((asset: any, i: number) => (
                  <a 
                    key={i} href={asset.url} target="_blank" rel="noopener noreferrer"
                    className="w-full p-4 bg-brand-navy/5 hover:bg-brand-orange/5 rounded-xl border border-transparent hover:border-brand-orange/20 transition-all text-left flex justify-between items-center group"
                  >
                    <span className="text-xs font-bold text-brand-navy group-hover:text-brand-orange transition-colors">{asset.title}</span>
                    <span className="text-[8px] font-black text-brand-navy/30 uppercase">{asset.type}</span>
                  </a>
                )) : (
                  <p className="text-[10px] font-bold text-brand-navy/20 text-center py-4 uppercase">No downloads for this phase</p>
                )}
              </div>
            </EliteCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
