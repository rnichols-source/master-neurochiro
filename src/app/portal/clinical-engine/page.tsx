import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ScoreEngineClient } from "@/components/clinical-engine/ScoreEngineClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ClinicalEnginePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardLayout>
      <ScoreEngineClient />
    </DashboardLayout>
  );
}
