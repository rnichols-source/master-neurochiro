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
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Clinical Scoring</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">Score patient dysfunction levels to support your care plan recommendations.</p>
        </div>
        <ScoreEngineClient />
      </div>
    </DashboardLayout>
  );
}
