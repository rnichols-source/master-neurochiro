import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { HunterClient } from "./HunterClient";
import { fetchHunterPipeline } from "@/app/actions/hunter-actions";
import { redirect } from "next/navigation";

export default async function HunterPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal");

  let isAdmin = user.app_metadata?.role === 'admin';
  if (!isAdmin) {
    const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
    isAdmin = profile?.tier === 'admin';
  }
  if (!isAdmin) redirect("/portal");

  const result = await fetchHunterPipeline();

  return (
    <DashboardLayout>
      <HunterClient
        prospects={result?.success && result.data ? result.data.prospects : []}
        pipeline={result?.success && result.data ? result.data.pipeline : {
          new: 0, contacted: 0, responded: 0, call_scheduled: 0,
          applied: 0, enrolled: 0, not_interested: 0, unresponsive: 0,
        }}
      />
    </DashboardLayout>
  );
}
