import { DashboardLayout } from "@/components/layout/dashboard-layout";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardClient />
    </DashboardLayout>
  );
}
