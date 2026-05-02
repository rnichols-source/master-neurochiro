import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AgentsHubClient } from "./AgentsHubClient";
import { fetchAgentHubStats } from "@/app/actions/agent-actions";
import { redirect } from "next/navigation";

export default async function AgentsHubPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal");

  let isAdmin = user.app_metadata?.role === 'admin';
  if (!isAdmin) {
    const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
    isAdmin = profile?.tier === 'admin';
  }
  if (!isAdmin) redirect("/portal");

  const stats = await fetchAgentHubStats();

  return (
    <DashboardLayout>
      <AgentsHubClient stats={stats?.success ? stats.data ?? null : null} />
    </DashboardLayout>
  );
}
