import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { fetchAllConversations } from "@/app/actions/pro-actions";
import { AdminMessagesClient } from "./AdminMessagesClient";

export default async function AdminMessagesPage() {
  const result = await fetchAllConversations();

  return (
    <DashboardLayout>
      <AdminMessagesClient initialConversations={result.data || []} />
    </DashboardLayout>
  );
}
