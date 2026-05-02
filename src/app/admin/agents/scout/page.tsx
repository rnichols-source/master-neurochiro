import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ScoutClient } from "./ScoutClient";
import { fetchPipelineFunnel, fetchApplicationQueue, fetchConversionInsights } from "@/app/actions/scout-actions";
import { redirect } from "next/navigation";

export default async function ScoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal");

  let isAdmin = user.app_metadata?.role === 'admin';
  if (!isAdmin) {
    const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
    isAdmin = profile?.tier === 'admin';
  }
  if (!isAdmin) redirect("/portal");

  const [funnel, queue, insights] = await Promise.all([
    fetchPipelineFunnel(),
    fetchApplicationQueue(),
    fetchConversionInsights(),
  ]);

  return (
    <DashboardLayout>
      <ScoutClient
        funnel={funnel?.success && funnel.data ? funnel.data : null}
        queue={queue?.success && queue.data ? queue.data : null}
        insights={insights?.success && insights.data ? insights.data : null}
      />
    </DashboardLayout>
  );
}
