import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ScriptVaultClient } from "./ScriptVaultClient";

export default function ScriptVaultPage() {
  return (
    <DashboardLayout>
      <ScriptVaultClient />
    </DashboardLayout>
  );
}
