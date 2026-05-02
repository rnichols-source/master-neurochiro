import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PulseClient } from "./PulseClient";
import { fetchRetentionIntelligence } from "@/app/actions/pulse-actions";
import { redirect } from "next/navigation";

export default async function PulsePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal");

  let isAdmin = user.app_metadata?.role === 'admin';
  if (!isAdmin) {
    const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
    isAdmin = profile?.tier === 'admin';
  }
  if (!isAdmin) redirect("/portal");

  const result = await fetchRetentionIntelligence();

  return (
    <DashboardLayout>
      <PulseClient data={result?.success ? result.data ?? null : null} />
    </DashboardLayout>
  );
}
