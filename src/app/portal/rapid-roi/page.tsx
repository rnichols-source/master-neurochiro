import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { RapidROIClient } from "./RapidROIClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function RapidROIPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardLayout>
      <RapidROIClient userId={user.id} />
    </DashboardLayout>
  );
}
