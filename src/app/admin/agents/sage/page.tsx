import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SageClient } from "./SageClient";
import {
  fetchModuleAnalytics,
  fetchCurriculumFunnel,
  fetchReflectionInsights,
  fetchContentImpact,
} from "@/app/actions/sage-actions";
import { redirect } from "next/navigation";

export default async function SagePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal");

  let isAdmin = user.app_metadata?.role === "admin";
  if (!isAdmin) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("tier")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.tier === "admin";
  }
  if (!isAdmin) redirect("/portal");

  const [analytics, funnel, reflections, impact] = await Promise.all([
    fetchModuleAnalytics(),
    fetchCurriculumFunnel(),
    fetchReflectionInsights(),
    fetchContentImpact(),
  ]);

  return (
    <DashboardLayout>
      <SageClient
        analytics={(analytics?.success ? analytics.data : null) ?? null}
        funnel={(funnel?.success ? funnel.data : null) ?? null}
        reflections={(reflections?.success ? reflections.data : null) ?? null}
        impact={(impact?.success ? impact.data : null) ?? null}
      />
    </DashboardLayout>
  );
}
