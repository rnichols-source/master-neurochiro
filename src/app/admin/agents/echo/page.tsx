import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EchoClient } from "./EchoClient";
import {
  fetchCommunicationsDashboard,
  fetchUnifiedInbox,
  fetchCommunityPulse,
} from "@/app/actions/echo-actions";
import { redirect } from "next/navigation";

export default async function EchoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
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

  const [dashboard, inbox, communityPulse] = await Promise.all([
    fetchCommunicationsDashboard(),
    fetchUnifiedInbox(),
    fetchCommunityPulse(),
  ]);

  return (
    <DashboardLayout>
      <EchoClient
        dashboard={dashboard?.success && dashboard.data ? dashboard.data : null}
        inbox={inbox?.success && inbox.data ? inbox.data : []}
        communityPulse={
          communityPulse?.success && communityPulse.data
            ? communityPulse.data
            : null
        }
      />
    </DashboardLayout>
  );
}
