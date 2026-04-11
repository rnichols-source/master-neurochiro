"use client";

import { useState } from "react";
import { Search, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function CohortSearch({ members }: { members: any[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "at-risk">("all");

  const filtered = members.filter((m: any) => {
    const name = (m.full_name || "").toLowerCase();
    const email = (m.email || "").toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());

    const health = m.member_health?.health_score || 0;
    const modules = m.member_health?.modules_completed || 0;

    if (filter === "active") return matchesSearch && modules > 0;
    if (filter === "inactive") return matchesSearch && modules === 0;
    if (filter === "at-risk") return matchesSearch && health < 40;
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/50" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-brand-navy/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-brand-orange/30 outline-none"
          />
        </div>
        <div className="flex gap-1">
          {(["all", "active", "inactive", "at-risk"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-2 text-xs font-bold rounded-lg transition-all capitalize",
                filter === f ? "bg-brand-navy text-white" : "text-brand-gray hover:bg-brand-navy/5"
              )}
            >
              {f === "at-risk" ? "At Risk" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Member List */}
      {filtered.length > 0 ? (
        <div className="bg-white rounded-2xl border border-brand-navy/5 divide-y divide-brand-navy/5">
          {filtered.map((member: any) => {
            const health = member.member_health?.health_score || 0;
            const modules = member.member_health?.modules_completed || 0;
            const kpis = member.member_health?.kpis_submitted || 0;

            return (
              <div key={member.id} className="p-4 flex items-center gap-4 hover:bg-brand-navy/[0.02] transition-all">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl bg-brand-navy/5 flex items-center justify-center font-black text-sm text-brand-navy shrink-0">
                  {(member.full_name || "?")[0]}
                </div>

                {/* Name + Email */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-brand-navy truncate">{member.full_name || "Unknown"}</p>
                  <p className="text-xs text-brand-gray truncate">{member.email}</p>
                </div>

                {/* Tier */}
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs font-bold capitalize hidden sm:block",
                  member.tier === 'pro' ? "bg-brand-orange/10 text-brand-orange" : "bg-brand-navy/5 text-brand-gray"
                )}>
                  {member.tier || "std"}
                </span>

                {/* Progress */}
                <div className="text-right hidden md:block">
                  <p className="text-sm font-black text-brand-navy">{modules}</p>
                  <p className="text-xs text-brand-gray">lessons</p>
                </div>

                {/* KPIs */}
                <div className="text-right hidden md:block">
                  <p className="text-sm font-black text-brand-navy">{kpis}</p>
                  <p className="text-xs text-brand-gray">KPIs</p>
                </div>

                {/* Health */}
                <div className="text-right shrink-0">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black",
                    health >= 80 ? "bg-green-50 text-green-600" :
                    health >= 40 ? "bg-orange-50 text-orange-600" :
                    "bg-red-50 text-red-500"
                  )}>
                    {health}
                  </div>
                </div>

                {/* Email link */}
                <a href={`mailto:${member.email}`} className="p-2 text-brand-gray hover:text-brand-navy transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-sm text-brand-gray">No members found</p>
        </div>
      )}
    </div>
  );
}
