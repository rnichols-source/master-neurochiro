import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { fetchWeekDetail } from "@/app/actions/curriculum-actions";
import { fetchNextCall } from "@/app/actions/call-actions";
import LiveCallBanner from "@/components/portal/LiveCallBanner";
import { Play, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

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
      <div className="max-w-3xl mx-auto space-y-6 pb-20">
        <Link href="/portal/curriculum" className="text-sm text-brand-gray hover:text-brand-navy transition-colors inline-block">
          ← Back to Curriculum
        </Link>

        {/* Live Call Banner for Week 7 */}
        {isWeek7 && nextCall && <LiveCallBanner call={nextCall} />}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
              Week {week?.week_number}: {week?.title}
            </h1>
            <p className="text-sm text-brand-gray font-medium mt-1">{week?.description}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-black text-brand-navy">{completionPercent}%</p>
            <p className="text-xs text-brand-gray">complete</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-brand-navy/5 rounded-full overflow-hidden">
          <div className="h-full bg-brand-orange rounded-full transition-all" style={{ width: `${completionPercent}%` }} />
        </div>

        {/* This Week's Focus */}
        <div className="bg-brand-navy/5 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-brand-orange mb-1">This week&apos;s focus</p>
            <p className="text-sm font-medium text-brand-navy">Watch all lessons, practice the scripts, then log your progress in the KPI tracker.</p>
          </div>
          <Link href="/portal/playbooks" className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors shrink-0">
            Open Playbook →
          </Link>
        </div>

        {/* Lessons */}
        <div className="space-y-2">
          <p className="text-sm font-bold text-brand-navy">Lessons</p>
          {safeModules.map((mod: any) => {
            const moduleUrl = `/portal/curriculum/${week?.slug}/${mod?.slug}`;
            return (
              <div key={mod?.id} className={cn(
                "bg-white rounded-2xl border border-brand-navy/5 p-4 transition-all",
                mod?.status === 'locked' ? "opacity-50" : "shadow-sm hover:border-brand-orange/30"
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                    mod?.status === 'completed' ? "bg-green-500 text-white" :
                    mod?.status === 'active' ? "bg-brand-orange text-white" :
                    "bg-brand-navy/5 text-brand-navy/20"
                  )}>
                    {mod?.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> :
                     mod?.status === 'active' ? <Play className="w-4 h-4 fill-white ml-0.5" /> :
                     <Lock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-brand-navy">{mod?.title}</p>
                  </div>
                  {mod?.status !== 'locked' ? (
                    <Link href={moduleUrl} className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors shrink-0">
                      {mod?.status === 'completed' ? "Review" : "Watch"}
                    </Link>
                  ) : (
                    <span className="text-xs text-brand-navy/20">Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Downloads (only show if there are any) */}
        {safeResources.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-bold text-brand-navy">Downloads</p>
            {safeResources.map((asset: any, i: number) => {
              if (!asset || !asset.url) return null;
              return (
                <a
                  key={asset.id || i} href={asset.url} target="_blank" rel="noopener noreferrer"
                  className="block bg-white rounded-2xl border border-brand-navy/5 p-4 shadow-sm hover:border-brand-orange/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-brand-navy">{asset.title}</span>
                    <span className="text-xs text-brand-gray">{asset.type}</span>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Week 8 completion */}
        {week?.week_number === 8 && completionPercent === 100 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center space-y-2">
            <p className="text-lg font-black text-green-700">You&apos;ve completed the program!</p>
            <p className="text-sm text-green-600">Ready for the next level?</p>
            <Link href="/council" className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors">
              Learn about The Council →
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
