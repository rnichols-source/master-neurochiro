import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ChiefClient } from "./ChiefClient";
import {
  fetchCohortBenchmarks,
  fetchLeaderboard,
  fetchBreakthroughs,
  fetchStruggles,
} from "@/app/actions/chief-actions";
import { redirect } from "next/navigation";

export default async function ChiefPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal");

  let isAdmin = user.app_metadata?.role === "admin";
  if (!isAdmin) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("tier")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.tier === "admin";
  }
  if (!isAdmin) redirect("/portal");

  const [benchmarks, leaderboard, breakthroughs, struggles] = await Promise.all([
    fetchCohortBenchmarks(),
    fetchLeaderboard(),
    fetchBreakthroughs(),
    fetchStruggles(),
  ]);

  return (
    <DashboardLayout>
      <ChiefClient
        benchmarks={benchmarks?.success && benchmarks.data ? benchmarks.data : null}
        leaderboard={leaderboard?.success && leaderboard.data ? leaderboard.data : []}
        breakthroughs={breakthroughs?.success && breakthroughs.data ? breakthroughs.data : []}
        struggles={struggles?.success && struggles.data ? struggles.data : []}
      />
    </DashboardLayout>
  );
}
