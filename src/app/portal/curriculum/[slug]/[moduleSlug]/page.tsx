import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BrandButton } from "@/components/ui/elite-ui";
import { fetchWeekDetail, completeModule } from "@/app/actions/curriculum-actions";
import { createClient } from "@/lib/supabase/server";
import VideoPlayer from "@/components/portal/VideoPlayer";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ModuleDetailPage(props: { 
  params: Promise<{ slug: string; moduleSlug: string }> 
}) {
  const { slug, moduleSlug } = await props.params;
  
  if (!slug || !moduleSlug) notFound();

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) notFound();

  const result = await fetchWeekDetail(slug);
  if (!result.success || !result.data) notFound();

  const { week, modules, resources } = result.data;
  const safeModules = modules || [];
  const module = safeModules.find((m: any) => m.slug === moduleSlug);
  if (!module) notFound();

  // Filter resources for this specific module
  const moduleResources = (resources || []).filter((r: any) => r.module_id === module.id);

  const moduleIndex = safeModules.findIndex((m: any) => m.slug === moduleSlug);
  const nextModule = safeModules[moduleIndex + 1];
  const prevModule = safeModules[moduleIndex - 1];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 pb-20">
        {/* Back link */}
        <Link href={`/portal/curriculum/${week?.slug || ''}`} className="text-sm text-brand-gray hover:text-brand-navy transition-colors inline-block">
          ← Back to Week {week?.week_number}
        </Link>

        {/* Title */}
        <div>
          <p className="text-xs font-bold text-brand-orange mb-1">
            Week {week?.week_number} Training
            {module?.duration_minutes && ` · ${module.duration_minutes} min`}
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">{module?.title}</h1>
        </div>

        {/* Video */}
        <VideoPlayer
          userId={user.id}
          moduleId={module.id}
          videoUrl={module.video_url || ""}
          title={module.title}
        />

        {/* Description (only if there's content) */}
        {module.content && (
          <p className="text-sm text-brand-gray font-medium leading-relaxed">{module.content}</p>
        )}

        {/* Related Playbook */}
        {week?.week_number && week.week_number <= 3 && (
          <div className="bg-brand-navy/5 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-brand-orange mb-0.5">Related Playbook</p>
              <p className="text-sm font-bold text-brand-navy">
                {week.week_number === 1 ? "Day 1: First Visit Guide" : week.week_number === 2 ? "Day 2: Care Plan Presentation" : "Patient Communication Scripts"}
              </p>
            </div>
            <Link href="/portal/playbooks" className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors shrink-0">
              Open →
            </Link>
          </div>
        )}

        {/* Downloads (only if any exist) */}
        {moduleResources.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-bold text-brand-navy">Downloads</p>
            {moduleResources.map((asset: any, i: number) => (
              <a key={asset.id || i} href={asset.url} target="_blank" rel="noopener noreferrer"
                className="block bg-white rounded-xl border border-brand-navy/5 p-3 hover:border-brand-orange/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-brand-navy">{asset.title}</span>
                  <span className="text-xs text-brand-gray">{asset.type}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Mark Complete + Navigation */}
        <div className="pt-6 border-t border-brand-navy/5 space-y-4">
          <form action={async () => {
            'use server'
            await completeModule(module.id);
          }}>
            <BrandButton type="submit" variant={module.status === 'completed' ? 'outline' : 'primary'} className="w-full py-4">
              {module.status === 'completed' ? "✓ Completed" : "Mark as Complete"}
            </BrandButton>
          </form>

          <div className="flex justify-between items-center">
            {prevModule ? (
              <Link href={`/portal/curriculum/${week?.slug}/${prevModule.slug}`} className="text-sm font-bold text-brand-gray hover:text-brand-navy transition-colors">
                ← {prevModule.title}
              </Link>
            ) : <span />}
            {nextModule ? (
              <Link href={`/portal/curriculum/${week?.slug}/${nextModule.slug}`} className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors">
                {nextModule.title} →
              </Link>
            ) : (
              <Link href={`/portal/curriculum/${week?.slug}`} className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors">
                Back to Week {week?.week_number} →
              </Link>
            )}
          </div>
        </div>

        {/* Support */}
        <div className="text-center pt-4">
          <p className="text-xs text-brand-gray">
            Question about this lesson?{" "}
            <a href="mailto:support@neurochiromastermind.com" className="text-brand-orange hover:text-brand-navy transition-colors">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
