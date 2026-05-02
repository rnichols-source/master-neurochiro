"use client";

import { EliteCard } from "@/components/ui/elite-ui";
import {
  GraduationCap,
  TrendingUp,
  TrendingDown,
  BookOpen,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface ModuleData {
  id: string;
  title: string;
  completions: number;
  completionRate: number;
}

interface WeekData {
  week_number: number;
  title: string;
  modules: ModuleData[];
}

interface FunnelEntry {
  week: number;
  title: string;
  completedBy: number;
}

interface ReflectionEntry {
  memberName: string;
  moduleTitle: string;
  reflection: string;
  completedAt: string;
}

interface ImpactData {
  modulesCompleted: number;
  avgCollectionsChange: number;
  avgNewPatientsChange: number;
}

interface SageClientProps {
  analytics: { weeks: WeekData[]; totalMembers: number } | null;
  funnel: FunnelEntry[] | null;
  reflections: ReflectionEntry[] | null;
  impact: ImpactData | null;
}

export function SageClient({ analytics, funnel, reflections, impact }: SageClientProps) {
  const maxFunnelCount = funnel && funnel.length > 0
    ? Math.max(...funnel.map((f) => f.completedBy), 1)
    : 1;

  return (
    <div className="space-y-8 pb-12">
      {/* Back link */}
      <Link
        href="/admin/agents"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy/60 hover:text-brand-orange transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agents
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-brand-navy/5 rounded-2xl">
          <GraduationCap className="w-8 h-8 text-brand-navy" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-brand-navy tracking-tight">Sage</h1>
          <p className="text-sm font-medium text-brand-gray">Curriculum Intelligence</p>
        </div>
      </div>

      {/* Curriculum Funnel */}
      <EliteCard title="Curriculum Funnel" subtitle="Week-by-week completion drop-off" icon={BookOpen}>
        {funnel && funnel.length > 0 ? (
          <div className="space-y-3">
            {funnel.map((entry) => {
              const widthPct = Math.max((entry.completedBy / maxFunnelCount) * 100, 2);
              return (
                <div key={entry.week} className="flex items-center gap-4">
                  <div className="w-32 shrink-0">
                    <p className="text-xs font-bold text-brand-navy uppercase tracking-wide">
                      Week {entry.week}
                    </p>
                    <p className="text-xs font-medium text-brand-gray truncate">{entry.title}</p>
                  </div>
                  <div className="flex-1 bg-brand-navy/5 rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full flex items-center justify-end pr-3 transition-all"
                      style={{ width: `${widthPct}%` }}
                    >
                      <span className="text-xs font-bold text-white whitespace-nowrap">
                        {entry.completedBy}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-brand-gray">No funnel data available yet.</p>
        )}
      </EliteCard>

      {/* Module Heat Map */}
      <EliteCard title="Module Heat Map" subtitle="Completion rates by module" icon={GraduationCap}>
        {analytics && analytics.weeks.length > 0 ? (
          <div className="space-y-6">
            {analytics.weeks.map((week) => (
              <div key={week.week_number}>
                <h4 className="text-sm font-black text-brand-navy mb-2">
                  Week {week.week_number}: {week.title}
                </h4>
                {week.modules.length > 0 ? (
                  <div className="grid gap-2">
                    {week.modules.map((mod) => {
                      let colorClasses = "bg-red-50 text-red-700";
                      if (mod.completionRate >= 75) {
                        colorClasses = "bg-emerald-50 text-emerald-700";
                      } else if (mod.completionRate >= 50) {
                        colorClasses = "bg-amber-50 text-amber-700";
                      }

                      return (
                        <div
                          key={mod.id}
                          className={`flex items-center justify-between px-4 py-2 rounded-xl ${colorClasses}`}
                        >
                          <span className="text-sm font-medium truncate mr-4">{mod.title}</span>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs font-medium">
                              {mod.completions} / {analytics.totalMembers}
                            </span>
                            <span className="text-sm font-black">{mod.completionRate}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-brand-gray">No modules in this week.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-brand-gray">No module analytics available yet.</p>
        )}
      </EliteCard>

      {/* Content Impact */}
      <EliteCard title="Content Impact" subtitle="Last 30 days correlation" icon={TrendingUp}>
        {impact ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-black text-brand-navy">{impact.modulesCompleted}</p>
              <p className="text-xs font-medium text-brand-gray mt-1">Modules Completed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                {impact.avgCollectionsChange >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
                <p
                  className={`text-3xl font-black ${
                    impact.avgCollectionsChange >= 0 ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {impact.avgCollectionsChange >= 0 ? "+" : ""}
                  ${impact.avgCollectionsChange.toLocaleString()}
                </p>
              </div>
              <p className="text-xs font-medium text-brand-gray mt-1">Avg Collections Change</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                {impact.avgNewPatientsChange >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
                <p
                  className={`text-3xl font-black ${
                    impact.avgNewPatientsChange >= 0 ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {impact.avgNewPatientsChange >= 0 ? "+" : ""}
                  {impact.avgNewPatientsChange}
                </p>
              </div>
              <p className="text-xs font-medium text-brand-gray mt-1">Avg New Patients Change</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-brand-gray">No impact data available yet.</p>
        )}
      </EliteCard>

      {/* Recent Reflections */}
      <EliteCard title="Recent Reflections" subtitle="Member insights from curriculum" icon={MessageSquare}>
        {reflections && reflections.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto space-y-4 pr-1">
            {reflections.map((entry, idx) => (
              <div
                key={idx}
                className="border border-brand-navy/5 rounded-xl p-4 hover:border-brand-orange/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-black text-brand-navy">{entry.memberName}</p>
                    <p className="text-xs font-medium text-brand-orange">{entry.moduleTitle}</p>
                  </div>
                  <p className="text-xs font-medium text-brand-gray shrink-0">
                    {new Date(entry.completedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-sm font-medium text-brand-gray leading-relaxed">
                  {entry.reflection}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-brand-gray">No reflections submitted yet.</p>
        )}
      </EliteCard>
    </div>
  );
}
