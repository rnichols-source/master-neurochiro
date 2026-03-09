import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AdminVaultClient } from "./AdminVaultClient";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminVaultPage() {
  const supabase = createAdminClient();
  const { data: resources } = await supabase
    .from('vault_resources')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <DashboardLayout>
      <AdminVaultClient initialResources={resources || []} />
    </DashboardLayout>
  );
}