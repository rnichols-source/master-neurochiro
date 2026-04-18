import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { fetchProMembers, fetchAdminCoachingNotes } from "@/app/actions/pro-actions";
import { AdminCoachingClient } from "./AdminCoachingClient";

export default async function AdminCoachingPage() {
  const [membersResult, notesResult] = await Promise.all([
    fetchProMembers(),
    fetchAdminCoachingNotes(),
  ]);

  return (
    <DashboardLayout>
      <AdminCoachingClient
        members={membersResult.data || []}
        initialNotes={notesResult.data || []}
      />
    </DashboardLayout>
  );
}
