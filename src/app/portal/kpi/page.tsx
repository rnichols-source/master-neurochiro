import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { KPITrackerClient } from "./KPITrackerClient";
import { fetchKPIEntries } from "@/app/actions/kpi-actions";
import { createClient } from "@/lib/supabase/server";

export default async function KPITrackerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let userName = "Doctor";
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();
    if (profile?.full_name) userName = profile.full_name;
  }

  const result = await fetchKPIEntries();
  const initialData = result.success && result.data ? result.data : [];

  return (
    <DashboardLayout>
      <KPITrackerClient initialData={initialData} userName={userName} />
    </DashboardLayout>
  );
}
