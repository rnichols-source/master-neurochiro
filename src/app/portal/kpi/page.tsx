import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { KPITrackerClient } from "./KPITrackerClient";
import { fetchKPIEntries } from "@/app/actions/kpi-actions";

export default async function KPITrackerPage() {
  const result = await fetchKPIEntries();
  const initialData = result.success && result.data ? result.data : [];

  return (
    <DashboardLayout>
      <KPITrackerClient initialData={initialData} />
    </DashboardLayout>
  );
}
