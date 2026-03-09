import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PlaybooksClient } from "./PlaybooksClient";

export default function PlaybooksPage() {
  return (
    <DashboardLayout>
      <PlaybooksClient />
    </DashboardLayout>
  );
}
