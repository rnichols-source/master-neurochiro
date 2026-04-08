import { createClient } from "@/lib/supabase/server";
import { Trophy } from "lucide-react";

function timeAgo(date: string) {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export async function WinsFeed() {
  const supabase = await createClient();

  const { data: wins } = await supabase
    .from("kpi_entries")
    .select("wins, created_at, profiles(full_name)")
    .not("wins", "is", null)
    .not("wins", "eq", "")
    .order("created_at", { ascending: false })
    .limit(5);

  if (!wins || wins.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-brand-navy/5 p-6 shadow-sm text-center">
        <Trophy className="w-6 h-6 text-brand-navy/20 mx-auto mb-2" />
        <p className="text-sm text-brand-gray font-medium">
          Be the first to share a win this week.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-black text-brand-navy uppercase tracking-wider">
        Community Wins
      </h2>
      <div className="space-y-3">
        {wins.map((entry: any, i: number) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-brand-navy/5 p-4 shadow-sm flex items-start gap-3"
          >
            <Trophy className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-brand-navy font-medium leading-relaxed">
                {entry.wins}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-bold text-brand-navy/40">
                  {(entry.profiles as any)?.full_name || "A member"}
                </span>
                <span className="text-xs text-brand-navy/20">
                  {timeAgo(entry.created_at)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
