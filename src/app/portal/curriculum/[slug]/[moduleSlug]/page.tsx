import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { fetchWeekDetail, completeModule } from "@/app/actions/curriculum-actions";
import { createClient } from "@/lib/supabase/server";
import VideoPlayer from "@/components/portal/VideoPlayer";
import { 
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ModuleDetailPage({ 
  params 
}: { 
  params: { slug: string; moduleSlug: string } 
}) {
  const { slug, moduleSlug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    notFound();
  }

  const result = await fetchWeekDetail(slug);
  
  if (!result.success || !result.data) {
    notFound();
  }

  const { week, modules } = result.data;
  const module = modules.find((m: any) => m.slug === moduleSlug);

  if (!module) {
    notFound();
  }

  const moduleIndex = modules.findIndex((m: any) => m.slug === moduleSlug);
  const nextModule = modules[moduleIndex + 1];
  const prevModule = modules[moduleIndex - 1];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-brand-navy/40">
          <Link href="/portal/curriculum" className="hover:text-brand-orange transition-colors">
            Curriculum
          </Link>
          <span>/</span>
          <Link href={`/portal/curriculum/${week.slug}`} className="hover:text-brand-orange transition-colors">
            {week.title}
          </Link>
          <span>/</span>
          <span className="text-brand-navy">{module.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Module 0{week.week_number}.0{module.order_index}</p>
              <h1 className="text-4xl font-black text-brand-navy tracking-tighter">{module.title}</h1>
            </div>

            {/* Real Video Player (Adaptive Streaming / 90% completion logic) */}
            <VideoPlayer 
              userId={user.id}
              moduleId={module.id}
              videoUrl={module.video_url || "https://www.w3schools.com/html/mov_bbb.mp4"}
              title={module.title}
            />

            <div className="prose prose-brand max-w-none">
              <p className="text-brand-gray font-medium leading-relaxed whitespace-pre-line">
                {module.content || "No additional content for this module."}
              </p>
            </div>

            {/* Navigation / Completion */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 border-t border-brand-navy/5">
              {prevModule ? (
                <Link href={`/portal/curriculum/${week.slug}/${prevModule.slug}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-brand-navy/10 flex items-center justify-center group-hover:border-brand-orange/40 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-brand-navy group-hover:text-brand-orange transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-black uppercase text-brand-navy/40">Previous</p>
                    <p className="text-sm font-black text-brand-navy group-hover:text-brand-orange transition-colors">{prevModule.title}</p>
                  </div>
                </Link>
              ) : <div />}

              <form action={async () => {
                'use server'
                await completeModule(module.id);
              }}>
                <BrandButton type="submit" variant={module.status === 'completed' ? 'outline' : 'primary'} className="min-w-[200px]">
                  {module.status === 'completed' ? (
                    <>Completed <CheckCircle2 className="ml-2 w-4 h-4" /></>
                  ) : (
                    <>Mark as Complete <CheckCircle2 className="ml-2 w-4 h-4" /></>
                  )}
                </BrandButton>
              </form>

              {nextModule ? (
                <Link href={`/portal/curriculum/${week.slug}/${nextModule.slug}`} className="flex items-center gap-4 group">
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase text-brand-navy/40">Next Up</p>
                    <p className="text-sm font-black text-brand-navy group-hover:text-brand-orange transition-colors">{nextModule.title}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-brand-navy/10 flex items-center justify-center group-hover:border-brand-orange/40 transition-colors">
                    <ChevronRight className="w-4 h-4 text-brand-navy group-hover:text-brand-orange transition-colors" />
                  </div>
                </Link>
              ) : (
                <Link href={`/portal/curriculum/${week.slug}`} className="flex items-center gap-4 group">
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase text-brand-navy/40">Finish Phase</p>
                    <p className="text-sm font-black text-brand-navy group-hover:text-brand-orange transition-colors">Return to Overview</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-brand-navy/10 flex items-center justify-center group-hover:border-brand-orange/40 transition-colors">
                    <ChevronRight className="w-4 h-4 text-brand-navy group-hover:text-brand-orange transition-colors" />
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <EliteCard title="Resources" subtitle="Module Assets" icon={FileText}>
              <div className="space-y-3 mt-4">
                <button className="w-full p-4 bg-brand-navy/5 hover:bg-brand-orange/5 rounded-xl border border-transparent hover:border-brand-orange/20 transition-all text-left flex justify-between items-center group">
                  <span className="text-xs font-bold text-brand-navy group-hover:text-brand-orange transition-colors">Implementation Guide</span>
                  <span className="text-[8px] font-black text-brand-navy/30">PDF</span>
                </button>
              </div>
            </EliteCard>

            <EliteCard className="bg-brand-navy text-white border-none p-8">
              <div className="space-y-4">
                <div className="p-3 bg-brand-orange/20 rounded-xl w-fit">
                  <MessageSquare className="w-5 h-5 text-brand-orange" />
                </div>
                <h4 className="text-xl font-black">Community Focus</h4>
                <p className="text-xs font-medium text-white/60 leading-relaxed">
                  Join the clinical discussion for this unit in the private Slack channel.
                </p>
              </div>
            </EliteCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
