import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SentinelClient } from "./SentinelClient";
import {
  fetchOpsIntelligence,
  fetchOnboardingPipeline,
  fetchAutomationEffectiveness,
  fetchFailedJobs,
} from "@/app/actions/sentinel-actions";
import { redirect } from "next/navigation";

export default async function SentinelPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal");

  let isAdmin = user.app_metadata?.role === 'admin';
  if (!isAdmin) {
    const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
    isAdmin = profile?.tier === 'admin';
  }
  if (!isAdmin) redirect("/portal");

  const [opsIntel, pipeline, effectiveness, failedJobs] = await Promise.all([
    fetchOpsIntelligence(),
    fetchOnboardingPipeline(),
    fetchAutomationEffectiveness(),
    fetchFailedJobs(),
  ]);

  return (
    <DashboardLayout>
      <SentinelClient
        opsIntel={opsIntel?.success && opsIntel.data ? opsIntel.data : null}
        pipeline={pipeline?.success && pipeline.data ? pipeline.data : []}
        effectiveness={effectiveness?.success && effectiveness.data ? effectiveness.data : null}
        failedJobs={failedJobs?.success && failedJobs.data ? failedJobs.data : []}
      />
    </DashboardLayout>
  );
}
