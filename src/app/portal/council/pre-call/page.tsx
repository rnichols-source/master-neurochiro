import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { fetchNextInnerCircleCall } from "@/app/actions/inner-circle-actions";
import { PreCallClient } from "./PreCallClient";

export default async function PreCallPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
  if (profile?.tier !== 'inner-circle' && profile?.tier !== 'admin') redirect("/portal");

  const callResult = await fetchNextInnerCircleCall();
  const nextCall = callResult.data;

  // Check if already submitted for this call
  let existingSubmission = null;
  if (nextCall) {
    const { data } = await supabase
      .from('pre_call_kpis')
      .select('*')
      .eq('user_id', user.id)
      .eq('call_id', nextCall.id)
      .maybeSingle();
    existingSubmission = data;
  }

  return (
    <DashboardLayout>
      <PreCallClient
        nextCall={nextCall ? { id: nextCall.id, title: nextCall.title, callTime: nextCall.call_time } : null}
        existingSubmission={existingSubmission}
      />
    </DashboardLayout>
  );
}
