import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CaseCalculatorClient } from "./CaseCalculatorClient";

export default function CaseCalculatorPage() {
  return (
    <DashboardLayout>
      <CaseCalculatorClient />
    </DashboardLayout>
  );
}
