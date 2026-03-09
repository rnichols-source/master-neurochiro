import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CaseLabClient } from "./CaseLabClient";
import { createClient } from "@/lib/supabase/server";

export default async function CaseLabPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let userTier: 'standard' | 'pro' | 'admin' = 'standard';
  
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single();
    
    if (profile?.tier) {
      userTier = profile.tier as any;
    }
  }

  return (
    <DashboardLayout>
      <CaseLabClient userTier={userTier} />
    </DashboardLayout>
  );
}
