import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CouncilClient } from "./CouncilClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { fetchNextInnerCircleCall, fetchInnerCircleBenchmarks } from "@/app/actions/inner-circle-actions";

export default async function CouncilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Gate access to Inner Circle members + admin
  const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
  if (profile?.tier !== 'inner-circle' && profile?.tier !== 'admin') {
    redirect("/portal");
  }

  // Fetch data in parallel
  const [callResult, benchmarkResult, latestKPI, preCallResult] = await Promise.all([
    fetchNextInnerCircleCall(),
    fetchInnerCircleBenchmarks(),
    supabase
      .from('kpi_entries')
      .select('care_plans_accepted, new_patients, collections, patient_visits')
      .eq('user_id', user.id)
      .order('week_start_date', { ascending: false })
      .limit(1)
      .maybeSingle(),
    // Check if pre-call KPI submitted for next call
    (async () => {
      const call = (await fetchNextInnerCircleCall()).data;
      if (!call) return { data: null };
      return supabase
        .from('pre_call_kpis')
        .select('id')
        .eq('user_id', user.id)
        .eq('call_id', call.id)
        .maybeSingle();
    })(),
  ]);

  const nextCall = callResult.data;
  const benchmarks = benchmarkResult.data;
  const myKPI = latestKPI.data;
  const hasSubmittedPreCall = !!preCallResult.data;

  // Calculate my acceptance rate
  const myAcceptance = myKPI?.care_plans_accepted && myKPI?.patient_visits
    ? Math.round((myKPI.care_plans_accepted / Math.max(myKPI.patient_visits, 1)) * 100)
    : null;
  const myCVA = myKPI?.collections && myKPI?.patient_visits
    ? Math.round(myKPI.collections / Math.max(myKPI.patient_visits, 1))
    : null;

  return (
    <DashboardLayout>
      <CouncilClient
        nextCall={nextCall ? {
          title: nextCall.title,
          callTime: nextCall.call_time,
          zoomUrl: nextCall.zoom_url,
          id: nextCall.id,
        } : null}
        myKPIs={myKPI ? {
          acceptance: myAcceptance,
          newPatients: myKPI.new_patients,
          collectionsPerVisit: myCVA,
        } : null}
        benchmarks={benchmarks}
        hasSubmittedPreCall={hasSubmittedPreCall}
      />
    </DashboardLayout>
  );
}
