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
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Financial Planner</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">Map your practice expenses, revenue targets, and break-even numbers.</p>
        </div>
        <EconomicsEngineClient />
      </div>
    </DashboardLayout>
  );
}
