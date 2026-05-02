"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import {
  HeartPulse,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Send,
  X,
  ArrowLeft,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import {
  fetchMemberTimeline,
  generateNudgeMessage,
  sendNudge,
} from "@/app/actions/pulse-actions";

interface Member {
  id: string;
  full_name: string;
  email: string;
  tier: string;
  health_score: number;
  risk_level: string;
  last_activity: string;
  modules_completed: number;
  kpis_submitted: number;
  trend: "up" | "down" | "flat";
}

interface Summary {
  active: number;
  coasting: number;
  atRisk: number;
  churned: number;
}

interface TimelineEntry {
  type: string;
  title: string;
  date: string;
  detail: string;
}

interface PulseData {
  summary: Summary;
  members: Member[];
}

export function PulseClient({ data }: { data: PulseData | null }) {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [nudgeDraft, setNudgeDraft] = useState("");
  const [nudgeContext, setNudgeContext] = useState("");
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  const [loadingNudge, setLoadingNudge] = useState(false);
  const [sendingNudge, setSendingNudge] = useState(false);
  const [nudgeSent, setNudgeSent] = useState(false);
  const [sortField, setSortField] = useState<keyof Member>("health_score");
  const [sortAsc, setSortAsc] = useState(true);

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-brand-navy/60">Failed to load retention data.</p>
      </div>
    );
  }

  const { summary, members } = data;
  const needsAttention = summary.atRisk + summary.coasting;

  const sorted = [...members].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  function handleSort(field: keyof Member) {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === "health_score");
    }
  }

  async function handleExpand(memberId: string) {
    if (expandedMember === memberId) {
      setExpandedMember(null);
      return;
    }
    setExpandedMember(memberId);
    setTimeline([]);
    setNudgeDraft("");
    setNudgeContext("");
    setNudgeSent(false);
    setLoadingTimeline(true);
    try {
      const result = await fetchMemberTimeline(memberId);
      if (result.success && result.data) {
        setTimeline(result.data);
      }
    } catch {
      // silent
    } finally {
      setLoadingTimeline(false);
    }
  }

  async function handleGenerateNudge(memberId: string) {
    setLoadingNudge(true);
    setNudgeSent(false);
    try {
      const result = await generateNudgeMessage(memberId);
      if (result.success && result.data) {
        setNudgeDraft(result.data.message);
        setNudgeContext(result.data.context);
      }
    } catch {
      // silent
    } finally {
      setLoadingNudge(false);
    }
  }

  async function handleSendNudge(memberId: string) {
    if (!nudgeDraft.trim()) return;
    setSendingNudge(true);
    try {
      const result = await sendNudge(memberId, nudgeDraft);
      if (result.success) {
        setNudgeSent(true);
        setNudgeDraft("");
      }
    } catch {
      // silent
    } finally {
      setSendingNudge(false);
    }
  }

  function healthBadgeClasses(score: number) {
    if (score >= 70) return "bg-emerald-100 text-emerald-700";
    if (score >= 40) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  }

  function trendIcon(trend: "up" | "down" | "flat") {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-brand-gray" />;
  }

  function relativeTime(dateStr: string) {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const diff = now - then;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  }

  function timelineTypeColor(type: string) {
    switch (type) {
      case "module": return "bg-emerald-400";
      case "kpi": return "bg-blue-400";
      case "message": return "bg-brand-orange";
      case "note": return "bg-purple-400";
      default: return "bg-brand-gray";
    }
  }

  const SortIcon = ({ field }: { field: keyof Member }) => {
    if (sortField !== field) return null;
    return sortAsc ? (
      <ChevronUp className="w-3 h-3 inline ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-1" />
    );
  };

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 rounded-xl">
            <HeartPulse className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-brand-navy tracking-tight">
              Pulse
            </h1>
            <p className="text-sm text-brand-navy/50">
              Member Retention Intelligence
            </p>
          </div>
        </div>
        {needsAttention > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">
              {needsAttention} member{needsAttention !== 1 ? "s" : ""} need
              attention
            </span>
          </div>
        )}
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-emerald-700">{summary.active}</p>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mt-1">
            Active
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-amber-700">{summary.coasting}</p>
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mt-1">
            Coasting
          </p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-red-700">{summary.atRisk}</p>
          <p className="text-xs font-bold text-red-600 uppercase tracking-wider mt-1">
            At-Risk
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-gray-600">{summary.churned}</p>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
            Churned
          </p>
        </div>
      </div>

      {/* Member Table */}
      <EliteCard title="Members" subtitle="Retention Overview" icon={Users}>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-navy/10 text-left">
                <th
                  className="pb-3 font-bold text-brand-navy/60 uppercase tracking-wider text-xs cursor-pointer hover:text-brand-navy"
                  onClick={() => handleSort("full_name")}
                >
                  Name
                  <SortIcon field="full_name" />
                </th>
                <th
                  className="pb-3 font-bold text-brand-navy/60 uppercase tracking-wider text-xs cursor-pointer hover:text-brand-navy"
                  onClick={() => handleSort("tier")}
                >
                  Tier
                  <SortIcon field="tier" />
                </th>
                <th
                  className="pb-3 font-bold text-brand-navy/60 uppercase tracking-wider text-xs cursor-pointer hover:text-brand-navy"
                  onClick={() => handleSort("health_score")}
                >
                  Health
                  <SortIcon field="health_score" />
                </th>
                <th
                  className="pb-3 font-bold text-brand-navy/60 uppercase tracking-wider text-xs cursor-pointer hover:text-brand-navy"
                  onClick={() => handleSort("modules_completed")}
                >
                  Modules
                  <SortIcon field="modules_completed" />
                </th>
                <th
                  className="pb-3 font-bold text-brand-navy/60 uppercase tracking-wider text-xs cursor-pointer hover:text-brand-navy"
                  onClick={() => handleSort("kpis_submitted")}
                >
                  KPIs
                  <SortIcon field="kpis_submitted" />
                </th>
                <th
                  className="pb-3 font-bold text-brand-navy/60 uppercase tracking-wider text-xs cursor-pointer hover:text-brand-navy"
                  onClick={() => handleSort("last_activity")}
                >
                  Last Activity
                  <SortIcon field="last_activity" />
                </th>
                <th className="pb-3 font-bold text-brand-navy/60 uppercase tracking-wider text-xs">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  isExpanded={expandedMember === member.id}
                  onToggle={() => handleExpand(member.id)}
                  timeline={expandedMember === member.id ? timeline : []}
                  loadingTimeline={expandedMember === member.id && loadingTimeline}
                  nudgeDraft={expandedMember === member.id ? nudgeDraft : ""}
                  nudgeContext={expandedMember === member.id ? nudgeContext : ""}
                  loadingNudge={loadingNudge}
                  sendingNudge={sendingNudge}
                  nudgeSent={expandedMember === member.id && nudgeSent}
                  onNudgeDraftChange={setNudgeDraft}
                  onGenerateNudge={() => handleGenerateNudge(member.id)}
                  onSendNudge={() => handleSendNudge(member.id)}
                  healthBadgeClasses={healthBadgeClasses}
                  trendIcon={trendIcon}
                  relativeTime={relativeTime}
                  timelineTypeColor={timelineTypeColor}
                />
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-brand-navy/40"
                  >
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </EliteCard>
    </div>
  );
}

function MemberRow({
  member,
  isExpanded,
  onToggle,
  timeline,
  loadingTimeline,
  nudgeDraft,
  nudgeContext,
  loadingNudge,
  sendingNudge,
  nudgeSent,
  onNudgeDraftChange,
  onGenerateNudge,
  onSendNudge,
  healthBadgeClasses,
  trendIcon,
  relativeTime,
  timelineTypeColor,
}: {
  member: Member;
  isExpanded: boolean;
  onToggle: () => void;
  timeline: TimelineEntry[];
  loadingTimeline: boolean;
  nudgeDraft: string;
  nudgeContext: string;
  loadingNudge: boolean;
  sendingNudge: boolean;
  nudgeSent: boolean;
  onNudgeDraftChange: (val: string) => void;
  onGenerateNudge: () => void;
  onSendNudge: () => void;
  healthBadgeClasses: (score: number) => string;
  trendIcon: (trend: "up" | "down" | "flat") => React.ReactNode;
  relativeTime: (date: string) => string;
  timelineTypeColor: (type: string) => string;
}) {
  return (
    <>
      <tr
        className="border-b border-brand-navy/5 hover:bg-brand-navy/[0.02] cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <td className="py-3 pr-4">
          <div>
            <p className="font-semibold text-brand-navy">{member.full_name}</p>
            <p className="text-xs text-brand-navy/40">{member.email}</p>
          </div>
        </td>
        <td className="py-3 pr-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-navy/60">
            {member.tier}
          </span>
        </td>
        <td className="py-3 pr-4">
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${healthBadgeClasses(
              member.health_score
            )}`}
          >
            {member.health_score}
          </span>
        </td>
        <td className="py-3 pr-4 text-brand-navy/70">{member.modules_completed}</td>
        <td className="py-3 pr-4 text-brand-navy/70">{member.kpis_submitted}</td>
        <td className="py-3 pr-4 text-brand-navy/50 text-xs">
          {relativeTime(member.last_activity)}
        </td>
        <td className="py-3">{trendIcon(member.trend)}</td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={7} className="p-0">
            <div className="bg-brand-navy/[0.02] border-y border-brand-navy/5 p-6 space-y-6">
              {/* Timeline */}
              <div>
                <h4 className="text-sm font-bold text-brand-navy mb-3">
                  Activity Timeline
                </h4>
                {loadingTimeline ? (
                  <div className="flex items-center gap-2 text-brand-navy/40 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading timeline...
                  </div>
                ) : timeline.length === 0 ? (
                  <p className="text-sm text-brand-navy/40">No activity recorded.</p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {timeline.map((entry, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${timelineTypeColor(
                            entry.type
                          )}`}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-brand-navy">
                              {entry.title}
                            </span>
                            <span className="text-xs text-brand-navy/40">
                              {relativeTime(entry.date)}
                            </span>
                          </div>
                          <p className="text-xs text-brand-navy/60 truncate">
                            {entry.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Nudge Section */}
              <div className="border-t border-brand-navy/10 pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-sm font-bold text-brand-navy">
                    Re-engagement Nudge
                  </h4>
                  <BrandButton
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGenerateNudge();
                    }}
                    isLoading={loadingNudge}
                  >
                    {loadingNudge ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin mr-1" />
                        Generating...
                      </>
                    ) : (
                      "Generate Nudge"
                    )}
                  </BrandButton>
                </div>

                {nudgeContext && (
                  <p className="text-xs text-brand-navy/40 mb-2 italic">
                    Context: {nudgeContext}
                  </p>
                )}

                {nudgeDraft && (
                  <div className="space-y-3">
                    <textarea
                      value={nudgeDraft}
                      onChange={(e) => onNudgeDraftChange(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full border border-brand-navy/10 rounded-xl p-3 text-sm text-brand-navy resize-none focus:outline-none focus:border-brand-orange/40 transition-colors"
                      rows={4}
                    />
                    <div className="flex items-center gap-2">
                      <BrandButton
                        variant="accent"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSendNudge();
                        }}
                        isLoading={sendingNudge}
                      >
                        {sendingNudge ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin mr-1" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-3 h-3 mr-1" />
                            Send
                          </>
                        )}
                      </BrandButton>
                      <BrandButton
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNudgeDraftChange("");
                        }}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Discard
                      </BrandButton>
                    </div>
                  </div>
                )}

                {nudgeSent && (
                  <p className="text-sm text-emerald-600 font-semibold mt-2">
                    Nudge sent successfully.
                  </p>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
