import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CertaintyAIGeneratorClient } from "./ai-generator-client";

export default function CertaintyAIGenerator() {
  return (
    <DashboardLayout>
      <CertaintyAIGeneratorClient />
    </DashboardLayout>
  );
}
