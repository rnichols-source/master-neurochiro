import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { fetchCoachingRecaps } from "@/app/actions/inner-circle-actions";
import { EliteCard } from "@/components/ui/elite-ui";
import { ScrollText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function RecapsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
  if (profile?.tier !== 'inner-circle' && profile?.tier !== 'admin') redirect("/portal");

  const result = await fetchCoachingRecaps();
  const recaps = result.data || [];

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        <Link href="/portal/council" className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy/50 hover:text-brand-navy transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange mb-4">
            <ScrollText size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">Coaching Recaps</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Your Recaps</h1>
          <p className="text-sm text-brand-gray font-medium mt-2">
            Personalized coaching summaries and action items from each call.
          </p>
        </div>

        {recaps.length === 0 ? (
          <EliteCard className="p-8 text-center">
            <ScrollText size={40} className="text-brand-navy/20 mx-auto mb-4" />
            <h2 className="text-xl font-black text-brand-navy mb-2">No Recaps Yet</h2>
            <p className="text-sm text-brand-gray">
              After your first Inner Circle call, your personalized coaching recap will appear here.
            </p>
          </EliteCard>
        ) : (
          <div className="space-y-4">
            {recaps.map((recap: any) => (
              <EliteCard key={recap.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-black text-brand-navy">
                      {recap.live_calls?.title || "Coaching Call"}
                    </h3>
                    <p className="text-xs text-brand-gray">
                      {recap.live_calls?.call_time
                        ? new Date(recap.live_calls.call_time).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                        : new Date(recap.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                {recap.ai_recap && (
                  <div className="text-sm text-brand-gray font-medium leading-relaxed whitespace-pre-wrap">
                    {recap.ai_recap}
                  </div>
                )}
                {recap.action_items && Array.isArray(recap.action_items) && (
                  <div className="mt-4 pt-4 border-t border-brand-navy/5">
                    <p className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">Action Items</p>
                    <ul className="space-y-1.5">
                      {recap.action_items.map((item: string, i: number) => (
                        <li key={i} className="text-sm text-brand-navy font-medium flex items-start gap-2">
                          <span className="text-brand-orange mt-0.5">&#8226;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </EliteCard>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
