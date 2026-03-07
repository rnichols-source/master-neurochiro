import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CurriculumManagerClient } from "./CurriculumManagerClient";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminCurriculumPage() {
  const supabase = createAdminClient();

  // Fetch all weeks with their modules
  const { data: weeks } = await supabase
    .from('weeks')
    .select(`
      *,
      modules (*)
    `)
    .order('week_number', { ascending: true });

  // Fetch all resources
  const { data: resources } = await supabase
    .from('resources')
    .select('*');

  // Ensure modules are sorted correctly within each week
  const sortedWeeks = weeks?.map(w => ({
    ...w,
    modules: w.modules?.sort((a: any, b: any) => a.order_index - b.order_index) || []
  })) || [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">Content Control</p>
          <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Curriculum Manager</h1>
        </div>

        <CurriculumManagerClient initialWeeks={sortedWeeks} initialResources={resources || []} />
      </div>
    </DashboardLayout>
  );
}
