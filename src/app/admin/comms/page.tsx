import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CommsClient } from "./CommsClient";
import { fetchSentHistory } from "@/app/actions/comms-actions";
import { redirect } from "next/navigation";

export default async function CommsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal");

  let isAdmin = user.app_metadata?.role === 'admin';
  if (!isAdmin) {
    const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
    isAdmin = profile?.tier === 'admin';
  }
  if (!isAdmin) redirect("/portal");

  const history = await fetchSentHistory(50);

  return (
    <DashboardLayout>
      <CommsClient sentHistory={history?.success ? history.data ?? [] : []} />
    </DashboardLayout>
  );
}
