import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { HuddleClient } from "./ClientComponent";

export default function HuddleClientPage() {
  return (
    <DashboardLayout>
      <HuddleClient />
    </DashboardLayout>
  );
}
