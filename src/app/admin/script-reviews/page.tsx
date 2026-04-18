import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { fetchPendingScriptReviews } from "@/app/actions/pro-actions";
import { AdminScriptReviewClient } from "./AdminScriptReviewClient";

export default async function AdminScriptReviewsPage() {
  const result = await fetchPendingScriptReviews();

  return (
    <DashboardLayout>
      <AdminScriptReviewClient initialReviews={result.data || []} />
    </DashboardLayout>
  );
}
