"use client";

import { useState, Fragment } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Target,
  FileText,
  ArrowLeft,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { fetchCoachingBrief } from "@/app/actions/chief-actions";

interface Benchmarks {
  benchmarks: Record<
    string,
    { avg: number; median: number; top25: number; bottom25: number }
  >;
  totalEntries: number;
  uniqueMembers: number;
}

interface LeaderboardEntry {
  id: string;
  full_name: string;
  tier: string;
  avgCollections: number;
  avgNewPatients: number;
  avgVisits: number;
  avgCarePlans: number;
  entriesCount: number;
}

interface ChangeEntry {
  id: string;
  full_name: string;
  metric: string;
  previousAvg: number;
  currentValue: number;
  changePercent: number;
}

interface Brief {
  member: {
    id: string;
    full_name: string;
    tier: string;
    email: string;
    healthScore: number | null;
  };
  numbers: Record<string, { latest: number; trend: "up" | "down" | "flat" }>;
  strengths: {
    metric: string;
    value: number;
    cohortAvg: number;
    aboveCohort: boolean;
  };
  focusAreas: {
    metric: string;
    value: number;
    cohortAvg: number;
    belowCohort: boolean;
  };
  recentNotes: { title: string; date: string }[];
  modulesCompleted: number;
  talkingPoints: string[];
}

interface ChiefClientProps {
  benchmarks: Benchmarks | null;
  leaderboard: LeaderboardEntry[];
  breakthroughs: ChangeEntry[];
  struggles: ChangeEntry[];
}

function formatMoney(value: number): string {
  return "$" + value.toLocaleString("en-US");
}

function formatMetricLabel(metric: string): string {
  return metric.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
}

function TrendArrow({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-emerald-600 inline" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500 inline" />;
  return <span className="text-brand-gray text-xs">--</span>;
}

function TierBadge({ tier }: { tier: string }) {
  const colors: Record<string, string> = {
    pro: "bg-brand-orange/10 text-brand-orange",
    standard: "bg-brand-navy/10 text-brand-navy",
    admin: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
        colors[tier] || colors.standard
      }`}
    >
      {tier}
    </span>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return <span className="text-sm text-brand-gray font-bold">{rank}</span>;
}

export function ChiefClient({
  benchmarks,
  leaderboard,
  breakthroughs,
  struggles,
}: ChiefClientProps) {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loadingBrief, setLoadingBrief] = useState(false);

  async function handlePrepForCall(userId: string) {
    setLoadingBrief(true);
    setBrief(null);
    try {
      const result = await fetchCoachingBrief(userId);
      if (result.success && result.data) {
        setBrief(result.data.brief);
      }
    } catch {
      // silent
    } finally {
      setLoadingBrief(false);
    }
  }

  const b = benchmarks?.benchmarks;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Back link */}
      <Link
        href="/admin/agents"
        className="inline-flex items-center gap-2 text-sm text-brand-navy/60 hover:text-brand-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agents
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-brand-navy/5 rounded-2xl">
          <Trophy className="w-8 h-8 text-brand-orange" />
        </div>
        <div>
          <h1 className="font-lato text-2xl font-bold text-brand-navy tracking-tight">
            Chief
          </h1>
          <p className="text-sm text-brand-gray">
            KPI &amp; Performance Intelligence
          </p>
        </div>
        {benchmarks && (
          <div className="ml-auto text-right text-xs text-brand-gray">
            <p>{benchmarks.totalEntries} entries from {benchmarks.uniqueMembers} members</p>
            <p>Last 4 weeks</p>
          </div>
        )}
      </div>

      {/* Cohort Benchmarks Row */}
      {b && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <EliteCard icon={Target} title="Collections">
            <p className="text-2xl font-bold text-brand-navy">
              {formatMoney(b.collections.median)}
            </p>
            <p className="text-xs text-brand-gray mt-1">
              Avg: {formatMoney(b.collections.avg)}
            </p>
            <p className="text-xs text-brand-gray">
              Range: {formatMoney(b.collections.bottom25)} - {formatMoney(b.collections.top25)}
            </p>
          </EliteCard>
          <EliteCard icon={TrendingUp} title="New Patients">
            <p className="text-2xl font-bold text-brand-navy">
              {b.new_patients.median}
            </p>
            <p className="text-xs text-brand-gray mt-1">
              Avg: {b.new_patients.avg}
            </p>
            <p className="text-xs text-brand-gray">
              Range: {b.new_patients.bottom25} - {b.new_patients.top25}
            </p>
          </EliteCard>
          <EliteCard icon={Target} title="Patient Visits">
            <p className="text-2xl font-bold text-brand-navy">
              {b.patient_visits.median}
            </p>
            <p className="text-xs text-brand-gray mt-1">
              Avg: {b.patient_visits.avg}
            </p>
            <p className="text-xs text-brand-gray">
              Range: {b.patient_visits.bottom25} - {b.patient_visits.top25}
            </p>
          </EliteCard>
          <EliteCard icon={FileText} title="Care Plans">
            <p className="text-2xl font-bold text-brand-navy">
              {b.care_plans_accepted.median}
            </p>
            <p className="text-xs text-brand-gray mt-1">
              Avg: {b.care_plans_accepted.avg}
            </p>
            <p className="text-xs text-brand-gray">
              Range: {b.care_plans_accepted.bottom25} - {b.care_plans_accepted.top25}
            </p>
          </EliteCard>
        </div>
      )}

      {/* Breakthroughs & Struggles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breakthroughs */}
        <EliteCard title="Breakthroughs" icon={TrendingUp}>
          {breakthroughs.length === 0 ? (
            <p className="text-sm text-brand-gray">No breakthroughs detected this period.</p>
          ) : (
            <div className="space-y-3">
              {breakthroughs.map((bt, i) => (
                <div
                  key={`${bt.id}-${bt.metric}-${i}`}
                  className="border-l-4 border-emerald-500 pl-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-bold text-sm text-brand-navy">
                      {bt.full_name}
                    </span>
                  </div>
                  <p className="text-xs text-brand-gray mt-0.5">
                    {formatMetricLabel(bt.metric)}:{" "}
                    <span className="text-emerald-600 font-bold">
                      {formatPercent(bt.changePercent)}
                    </span>{" "}
                    ({bt.previousAvg} &rarr; {bt.currentValue})
                  </p>
                </div>
              ))}
            </div>
          )}
        </EliteCard>

        {/* Needs Coaching */}
        <EliteCard title="Needs Coaching" icon={TrendingDown}>
          {struggles.length === 0 ? (
            <p className="text-sm text-brand-gray">No significant declines detected.</p>
          ) : (
            <div className="space-y-3">
              {struggles.map((st, i) => (
                <div
                  key={`${st.id}-${st.metric}-${i}`}
                  className="border-l-4 border-amber-500 pl-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="font-bold text-sm text-brand-navy">
                      {st.full_name}
                    </span>
                  </div>
                  <p className="text-xs text-brand-gray mt-0.5">
                    {formatMetricLabel(st.metric)}:{" "}
                    <span className="text-amber-600 font-bold">
                      {formatPercent(st.changePercent)}
                    </span>{" "}
                    ({st.previousAvg} &rarr; {st.currentValue})
                  </p>
                </div>
              ))}
            </div>
          )}
        </EliteCard>
      </div>

      {/* Leaderboard */}
      <EliteCard title="Leaderboard" subtitle="Last 4 Weeks" icon={Trophy}>
        {leaderboard.length === 0 ? (
          <p className="text-sm text-brand-gray">No KPI data available yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-brand-gray uppercase tracking-wider border-b border-brand-navy/10">
                  <th className="pb-3 pr-2 w-12">#</th>
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-2">Tier</th>
                  <th className="pb-3 pr-2 text-right">Avg Collections</th>
                  <th className="pb-3 pr-2 text-right">Avg New Pts</th>
                  <th className="pb-3 text-right">Avg Visits</th>
                  <th className="pb-3 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((member, idx) => {
                  const rank = idx + 1;
                  const isExpanded = expandedMember === member.id;
                  const isTop3 = rank <= 3;
                  return (
                    <Fragment key={member.id}>
                      <tr
                        className={`border-b border-brand-navy/5 cursor-pointer hover:bg-brand-navy/[0.02] transition-colors ${
                          isTop3 ? "bg-brand-orange/[0.03]" : ""
                        }`}
                        onClick={() =>
                          setExpandedMember(isExpanded ? null : member.id)
                        }
                      >
                        <td className="py-3 pr-2">
                          <RankBadge rank={rank} />
                        </td>
                        <td className="py-3 pr-4 font-bold text-brand-navy">
                          {member.full_name}
                        </td>
                        <td className="py-3 pr-2">
                          <TierBadge tier={member.tier} />
                        </td>
                        <td className="py-3 pr-2 text-right font-mono font-bold text-brand-navy">
                          {formatMoney(member.avgCollections)}
                        </td>
                        <td className="py-3 pr-2 text-right font-mono">
                          {member.avgNewPatients}
                        </td>
                        <td className="py-3 text-right font-mono">
                          {member.avgVisits}
                        </td>
                        <td className="py-3 text-right">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-brand-gray" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-brand-gray" />
                          )}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={7} className="py-4 px-4 bg-brand-navy/[0.02]">
                            {!brief || brief.member.id !== member.id ? (
                              <div className="flex items-center gap-3">
                                <BrandButton
                                  variant="outline"
                                  size="sm"
                                  isLoading={loadingBrief}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrepForCall(member.id);
                                  }}
                                >
                                  {loadingBrief ? (
                                    <>
                                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                      Loading...
                                    </>
                                  ) : (
                                    <>
                                      <FileText className="w-3 h-3 mr-2" />
                                      Prep for Call
                                    </>
                                  )}
                                </BrandButton>
                                <span className="text-xs text-brand-gray">
                                  {member.entriesCount} entries submitted
                                </span>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {/* Brief Header */}
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-bold text-brand-navy">
                                      Coaching Brief: {brief.member.full_name}
                                    </h4>
                                    {brief.member.healthScore !== null && (
                                      <p className="text-xs text-brand-gray">
                                        Health Score: {brief.member.healthScore}/100
                                      </p>
                                    )}
                                  </div>
                                  <span className="text-xs text-brand-gray">
                                    {brief.modulesCompleted} modules completed
                                  </span>
                                </div>

                                {/* Numbers */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  {Object.entries(brief.numbers).map(
                                    ([key, val]) => (
                                      <div
                                        key={key}
                                        className="bg-white rounded-xl p-3 border border-brand-navy/5"
                                      >
                                        <p className="text-[10px] uppercase tracking-wider text-brand-gray">
                                          {formatMetricLabel(key)}
                                        </p>
                                        <p className="text-lg font-bold text-brand-navy flex items-center gap-1">
                                          {key === "collections"
                                            ? formatMoney(val.latest)
                                            : val.latest}
                                          <TrendArrow trend={val.trend} />
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>

                                {/* Strengths & Focus */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div className="border-l-4 border-emerald-500 pl-3 py-1">
                                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                                      Strength
                                    </p>
                                    <p className="text-sm text-brand-navy font-bold">
                                      {brief.strengths.metric}
                                    </p>
                                    <p className="text-xs text-brand-gray">
                                      {brief.strengths.value} vs cohort avg{" "}
                                      {brief.strengths.cohortAvg}
                                    </p>
                                  </div>
                                  <div className="border-l-4 border-amber-500 pl-3 py-1">
                                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                                      Focus Area
                                    </p>
                                    <p className="text-sm text-brand-navy font-bold">
                                      {brief.focusAreas.metric}
                                    </p>
                                    <p className="text-xs text-brand-gray">
                                      {brief.focusAreas.value} vs cohort avg{" "}
                                      {brief.focusAreas.cohortAvg}
                                    </p>
                                  </div>
                                </div>

                                {/* Recent Coaching Notes */}
                                {brief.recentNotes.length > 0 && (
                                  <div>
                                    <p className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                                      Recent Coaching Notes
                                    </p>
                                    <ul className="space-y-1">
                                      {brief.recentNotes.map((note, i) => (
                                        <li
                                          key={i}
                                          className="text-xs text-brand-gray"
                                        >
                                          {new Date(note.date).toLocaleDateString()}{" "}
                                          &mdash; {note.title}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Talking Points */}
                                <div>
                                  <p className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                                    Suggested Talking Points
                                  </p>
                                  <ul className="list-disc list-inside space-y-1">
                                    {brief.talkingPoints.map((point, i) => (
                                      <li
                                        key={i}
                                        className="text-xs text-brand-gray"
                                      >
                                        {point}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </EliteCard>
    </div>
  );
}
