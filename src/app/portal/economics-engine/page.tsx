import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EconomicsEngineClient } from "@/components/economics-engine/EconomicsEngineClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EconomicsEnginePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardLayout>
      <EconomicsEngineClient />
    </DashboardLayout>
  );
}
