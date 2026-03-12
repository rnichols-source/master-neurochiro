import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EngineClient } from "./EngineClient";
import { fetchKPIEntries } from "@/app/actions/kpi-actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EnginePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let userTier = "standard";
  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single();
  if (profile) userTier = profile.tier;

  const kpiResult = await fetchKPIEntries();
  const initialData = kpiResult.success ? (kpiResult.data || []) : [];

  return (
    <DashboardLayout>
      <EngineClient 
        initialData={initialData} 
        userName={user.user_metadata?.full_name || "Doctor"} 
        userTier={userTier}
      />
    </DashboardLayout>
  );
}
