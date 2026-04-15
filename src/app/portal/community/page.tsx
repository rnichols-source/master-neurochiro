import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { fetchPosts } from "@/app/actions/community-actions";
import { createClient } from "@/lib/supabase/server";
import CommunityClient from "./CommunityClient";
import { redirect } from "next/navigation";

export default async function CommunityPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  const result = await fetchPosts();

  return (
    <DashboardLayout>
      <CommunityClient
        initialPosts={result.data || []}
        currentUserId={user.id}
        isAdmin={profile?.tier === "admin"}
      />
    </DashboardLayout>
  );
}
