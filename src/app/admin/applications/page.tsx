import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ApplicationsClient } from "./ApplicationsClient";

export default async function AdminApplicationsPage() {
  const supabase = await createClient();

  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl border border-red-100 font-bold uppercase tracking-widest text-xs">
          Error loading applications: {error.message}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-widest text-xs mb-2">Admission Control</p>
          <h1 className="text-4xl font-black text-brand-navy tracking-tighter">Cohort II Applications</h1>
        </div>

        <ApplicationsClient initialApplications={applications || []} />
      </div>
    </DashboardLayout>
  );
}
