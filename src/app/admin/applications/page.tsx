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
        <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100">
          <p className="text-sm font-bold text-red-600">Error loading applications: {error.message}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Applications</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">Review and manage applicants.</p>
        </div>
        <ApplicationsClient initialApplications={applications || []} />
      </div>
    </DashboardLayout>
  );
}
