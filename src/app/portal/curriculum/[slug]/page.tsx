import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard } from "@/components/ui/elite-ui";
import { fetchWeekDetail } from "@/app/actions/curriculum-actions";
import { fetchNextCall } from "@/app/actions/call-actions";
import LiveCallBanner from "@/components/portal/LiveCallBanner";
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
import { TwoPathsTransition } from "@/components/portal/TwoPathsTransition";
import { motion } from "framer-motion";

export default async function WeekDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  
  if (!slug) notFound();

  console.log(`[PAGE] Rendering Phase: ${slug}`);
  const result = await fetchWeekDetail(slug);
  
  if (!result.success || !result.data) {
    console.error(`[PAGE] Fetch failed for ${slug}:`, result.error);
    notFound();
  }

  const { week, modules, resources } = result.data;
  const safeModules = modules || [];
  const safeResources = resources || [];
  
  const completedCount = safeModules.filter((m: any) => m.status === 'completed').length;
  const completionPercent = safeModules.length > 0 ? Math.round((completedCount / safeModules.length) * 100) : 0;

  // Fetch next call to see if it belongs to this week
  const callResult = await fetchNextCall();
  const nextCall = callResult.success ? callResult.data : null;
  const isWeek7 = slug === 'week-7-eq';

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <Link href="/portal/curriculum" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-orange transition-colors">
          <ChevronLeft className="w-3 h-3" /> Back to Curriculum
        </Link>

        {/* Live Call Banner for Week 7 */}
        {isWeek7 && nextCall && <LiveCallBanner call={nextCall} />}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-10 border-b border-brand-navy/5">
          <div className="space-y-4">
            <p className="text-brand-orange font-black uppercase tracking-widest text-xs">Phase 0{week?.week_number}</p>
            <h1 className="text-5xl font-black text-brand-navy tracking-tighter">{week?.title}</h1>
            <p className="text-brand-gray font-medium max-w-xl">
              {week?.description}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs font-black uppercase text-brand-navy/40">Phase Completion</p>
              <p className="text-lg font-black text-brand-navy">{completionPercent}%</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" className="fill-none stroke-brand-navy/5 stroke-[4]" />
                <circle
                  cx="32" cy="32" r="28"
                  className="fill-none stroke-brand-orange stroke-[4] transition-all duration-1000"
                  strokeDasharray={2 * Math.PI * 28}
                  strokeDashoffset={2 * Math.PI * 28 * (1 - (completionPercent / 100))}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-2">Training Units</h3>
            <div className="space-y-4">
              {safeModules.map((mod: any) => {
                const moduleUrl = `/portal/curriculum/${week?.slug}/${mod?.slug}`;
                return (
                  <EliteCard 
                    key={mod?.id} 
                    className={cn(
                      "p-6 transition-all group",
                      mod?.status === 'locked' ? "opacity-50" : "hover:border-brand-orange/40"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                          mod?.status === 'completed' ? "bg-green-500/10 text-green-500" :
                          mod?.status === 'active' ? "bg-brand-orange/10 text-brand-orange" : "bg-brand-navy/5 text-brand-navy/20"
                        )}>
                          {mod?.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                           mod?.status === 'active' ? <Play className="w-5 h-5 fill-brand-orange ml-0.5" /> : <Lock className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase text-brand-navy/40">Module {week?.week_number}.{mod?.order_index}</p>
                          <h4 className="text-lg font-black text-brand-navy group-hover:text-brand-orange transition-colors">{mod?.title}</h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {mod?.status !== 'locked' ? (
                          <Link 
                            href={moduleUrl}
                            className="px-6 py-2 bg-brand-navy text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-brand-orange transition-all flex items-center gap-2 group/btn"
                          >
                            View Unit <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        ) : (
                          <Lock className="w-4 h-4 text-brand-navy/20" />
                        )}
                      </div>
                    </div>
                  </EliteCard>
                );
              })}
            </div>
          </div>

          <div className="space-y-8">
            <EliteCard title="Implementation" subtitle="This Week's Focus">
              <div className="space-y-4 mt-4">
                {[
                  "Watch all training units",
                  "Complete clinical worksheets",
                  "Submit Progress Update",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border border-brand-navy/10 flex items-center justify-center text-xs font-black">{i + 1}</div>
                    <span className="text-xs font-bold text-brand-navy">{item}</span>
                  </div>
                ))}
              </div>
            </EliteCard>

            <EliteCard title="Proprietary Assets" subtitle="Downloads">
              <div className="space-y-3 mt-4">
                {safeResources.length > 0 ? safeResources.map((asset: any, i: number) => {
                  if (!asset || !asset.url) return null;
                  return (
                    <a 
                      key={asset.id || i} href={asset.url} target="_blank" rel="noopener noreferrer"
                      className="w-full p-4 bg-brand-navy/5 hover:bg-brand-orange/5 rounded-xl border border-transparent hover:border-brand-orange/20 transition-all text-left flex justify-between items-center group"
                    >
                      <span className="text-xs font-bold text-brand-navy group-hover:text-brand-orange transition-colors">{asset.title}</span>
                      <span className="text-xs font-black text-brand-navy/30 uppercase">{asset.type}</span>
                    </a>
                  );
                }) : (
                  <p className="text-xs font-bold text-brand-navy/20 text-center py-4 uppercase">No downloads for this phase</p>
                )}
              </div>
            </EliteCard>
          </div>
        </div>

        {/* Transition Logic for Week 8 Completion */}
        {week?.week_number === 8 && completionPercent === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pt-10 border-t border-brand-navy/5"
          >
            <TwoPathsTransition />
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
