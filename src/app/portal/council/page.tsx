import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CouncilClient } from "./CouncilClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CouncilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Logic to verify if user has council access could go here
  // const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  // if (profile?.role !== 'council_member' && profile?.role !== 'admin') {
  //   redirect("/portal");
  // }

  return (
    <DashboardLayout>
      <CouncilClient />
    </DashboardLayout>
  );
}
