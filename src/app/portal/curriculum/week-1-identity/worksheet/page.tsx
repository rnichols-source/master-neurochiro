import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { fetchWorksheet } from "@/app/actions/worksheet-actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import WorksheetClient from "./WorksheetClient";

export default async function IdentityWorksheetPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const result = await fetchWorksheet("identity-week-1");
  const responses = result.data?.responses || null;
  const firstName = profile?.full_name?.split(" ").pop() || "Doctor";

  return (
    <DashboardLayout>
      <WorksheetClient initialData={responses} userName={firstName} />
    </DashboardLayout>
  );
}
