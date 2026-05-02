"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { Radar, Users, CheckCircle, XCircle, Clock, Mail, ArrowLeft, Loader2, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { generateOutreachDraft } from "@/app/actions/scout-actions";

interface FunnelData {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  converted: number;
  engaged: number;
}

interface QueueItem {
  id: string;
  full_name: string;
  email: string;
  status: string;
  created_at: string;
  score: number;
  fitScore: number;
  role: string;
  type: string;
  goals: string;
  painPoints: string;
  currentSituation: string;
}

interface InsightsData {
  converted: { avgGoalsLength: number; avgPainPointsLength: number; topRole: string; topType: string; count: number };
  unconverted: { avgGoalsLength: number; avgPainPointsLength: number; topRole: string; topType: string; count: number };
}

interface ScoutClientProps {
  funnel: FunnelData | null;
  queue: QueueItem[] | null;
  insights: InsightsData | null;
}

function pct(num: number, denom: number): string {
  if (!denom) return "0%";
  return Math.round((num / denom) * 100) + "%";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ScoutClient({ funnel, queue, insights }: ScoutClientProps) {
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [outreachDraft, setOutreachDraft] = useState<{ subject: string; body: string } | null>(null);
  const [loadingDraft, setLoadingDraft] = useState(false);

  const handleDraftOutreach = async (applicationId: string) => {
    setLoadingDraft(true);
    setOutreachDraft(null);
    const result = await generateOutreachDraft(applicationId);
    if (result.success && result.data) {
      setOutreachDraft(result.data);
    }
    setLoadingDraft(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const funnelStages = funnel
    ? [
        { label: "Applied", value: funnel.total, icon: Users, pctLabel: "" },
        { label: "Pending", value: funnel.pending, icon: Clock, pctLabel: pct(funnel.pending, funnel.total) },
        { label: "Approved", value: funnel.approved, icon: CheckCircle, pctLabel: pct(funnel.approved, funnel.total) },
        { label: "Converted", value: funnel.converted, icon: Users, pctLabel: pct(funnel.converted, funnel.approved) },
        { label: "Engaged", value: funnel.engaged, icon: CheckCircle, pctLabel: pct(funnel.engaged, funnel.converted) },
      ]
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Back Link */}
      <Link
        href="/admin/agents"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy/60 hover:text-brand-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agents
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-brand-navy/5 rounded-2xl">
          <Radar className="w-8 h-8 text-brand-navy" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-brand-navy tracking-tight">Scout</h1>
          <p className="text-sm font-medium text-brand-orange uppercase tracking-wider">Pipeline Intelligence</p>
        </div>
      </div>

      {/* Pipeline Funnel */}
      <EliteCard title="Pipeline Funnel" icon={Users}>
        <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
          {funnelStages.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-2 flex-1 min-w-0">
              <div className="bg-brand-navy rounded-xl p-4 text-white text-center flex-1 min-w-[100px]">
                <stage.icon className="w-5 h-5 mx-auto mb-1 opacity-70" />
                <div className="text-2xl font-black">{stage.value}</div>
                <div className="text-xs font-medium opacity-80">{stage.label}</div>
                {stage.pctLabel && (
                  <div className="text-[10px] font-bold text-brand-orange mt-1">{stage.pctLabel}</div>
                )}
              </div>
              {i < funnelStages.length - 1 && (
                <ArrowRight className="w-5 h-5 text-brand-navy/30 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
        {funnel && funnel.rejected > 0 && (
          <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
            <XCircle className="w-4 h-4" />
            <span className="font-medium">{funnel.rejected} rejected</span>
          </div>
        )}
      </EliteCard>

      {/* Priority Queue */}
      <EliteCard title="Priority Queue" subtitle="Applications by Fit Score" icon={Radar}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-navy/50 text-xs uppercase tracking-wider border-b border-brand-navy/10">
                <th className="pb-3 pr-3 font-bold">Score</th>
                <th className="pb-3 pr-3 font-bold">Name</th>
                <th className="pb-3 pr-3 font-bold hidden sm:table-cell">Role</th>
                <th className="pb-3 pr-3 font-bold hidden md:table-cell">Type</th>
                <th className="pb-3 pr-3 font-bold">Status</th>
                <th className="pb-3 font-bold hidden lg:table-cell">Applied</th>
              </tr>
            </thead>
            <tbody>
              {(queue || []).map((app) => {
                const isExpanded = expandedApp === app.id;
                const scoreBg =
                  app.fitScore >= 70
                    ? "bg-emerald-100 text-emerald-700"
                    : app.fitScore >= 50
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-600";
                const statusBg =
                  app.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : app.status === "approved"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700";

                return (
                  <tr key={app.id} className="group">
                    <td colSpan={6} className="p-0">
                      <div
                        className={`cursor-pointer transition-colors hover:bg-brand-navy/[0.02] ${
                          app.status === "pending" ? "border-l-4 border-brand-orange" : "border-l-4 border-transparent"
                        }`}
                        onClick={() => {
                          setExpandedApp(isExpanded ? null : app.id);
                          setOutreachDraft(null);
                        }}
                      >
                        <div className="flex items-center py-3 px-2">
                          <div className="pr-3 w-16">
                            <span className={`inline-block px-2 py-1 rounded-lg text-xs font-black ${scoreBg}`}>
                              {app.fitScore}
                            </span>
                          </div>
                          <div className="pr-3 flex-1 min-w-0">
                            <div className="font-bold text-brand-navy truncate">{app.full_name}</div>
                            <div className="text-xs text-brand-navy/50 truncate sm:hidden">{app.role}</div>
                          </div>
                          <div className="pr-3 hidden sm:block w-32 truncate font-medium text-brand-navy/70">
                            {app.role}
                          </div>
                          <div className="pr-3 hidden md:block w-28 truncate font-medium text-brand-navy/70">
                            {app.type}
                          </div>
                          <div className="pr-3 w-24">
                            <span className={`inline-block px-2 py-1 rounded-lg text-xs font-bold capitalize ${statusBg}`}>
                              {app.status}
                            </span>
                          </div>
                          <div className="hidden lg:block w-28 text-xs text-brand-navy/50 font-medium">
                            {formatDate(app.created_at)}
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-brand-navy/30 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {isExpanded && (
                          <div
                            className="px-4 pb-4 space-y-4 border-t border-brand-navy/5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                              {app.goals && (
                                <div>
                                  <div className="text-xs font-bold text-brand-navy/50 uppercase tracking-wider mb-1">
                                    Goals
                                  </div>
                                  <p className="text-sm font-medium text-brand-navy leading-relaxed">
                                    {app.goals}
                                  </p>
                                </div>
                              )}
                              {app.painPoints && (
                                <div>
                                  <div className="text-xs font-bold text-brand-navy/50 uppercase tracking-wider mb-1">
                                    Pain Points
                                  </div>
                                  <p className="text-sm font-medium text-brand-navy leading-relaxed">
                                    {app.painPoints}
                                  </p>
                                </div>
                              )}
                              {app.currentSituation && (
                                <div>
                                  <div className="text-xs font-bold text-brand-navy/50 uppercase tracking-wider mb-1">
                                    Current Situation
                                  </div>
                                  <p className="text-sm font-medium text-brand-navy leading-relaxed">
                                    {app.currentSituation}
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <BrandButton
                                size="sm"
                                variant="accent"
                                onClick={() => handleDraftOutreach(app.id)}
                                isLoading={loadingDraft}
                              >
                                {loadingDraft ? (
                                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                ) : (
                                  <Mail className="w-4 h-4 mr-2" />
                                )}
                                Draft Outreach
                              </BrandButton>
                            </div>

                            {outreachDraft && expandedApp === app.id && (
                              <div className="space-y-2">
                                <div className="text-xs font-bold text-brand-navy/50 uppercase tracking-wider">
                                  Subject: {outreachDraft.subject}
                                </div>
                                <textarea
                                  className="w-full h-48 p-3 text-sm font-medium text-brand-navy bg-brand-navy/[0.02] border border-brand-navy/10 rounded-xl resize-none focus:outline-none focus:border-brand-orange/40"
                                  value={outreachDraft.body}
                                  readOnly
                                />
                                <BrandButton
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    copyToClipboard(
                                      `Subject: ${outreachDraft.subject}\n\n${outreachDraft.body}`
                                    )
                                  }
                                >
                                  Copy to Clipboard
                                </BrandButton>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {(!queue || queue.length === 0) && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-brand-navy/40 font-medium">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </EliteCard>

      {/* Conversion Insights */}
      {insights && (
        <EliteCard title="Conversion Insights" subtitle="What Successful Members Look Like" icon={CheckCircle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Converted Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <h4 className="font-black text-brand-navy text-sm uppercase tracking-wider">
                  Converted ({insights.converted.count})
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-brand-navy/5">
                  <span className="text-sm font-medium text-brand-navy/60">Avg Goals Detail</span>
                  <span className="text-sm font-black text-brand-navy">{insights.converted.avgGoalsLength} chars</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-navy/5">
                  <span className="text-sm font-medium text-brand-navy/60">Avg Pain Points Detail</span>
                  <span className="text-sm font-black text-brand-navy">{insights.converted.avgPainPointsLength} chars</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-navy/5">
                  <span className="text-sm font-medium text-brand-navy/60">Top Role</span>
                  <span className="text-sm font-black text-brand-navy">{insights.converted.topRole}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-brand-navy/60">Top Type</span>
                  <span className="text-sm font-black text-brand-navy">{insights.converted.topType}</span>
                </div>
              </div>
            </div>

            {/* Unconverted Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <h4 className="font-black text-brand-navy text-sm uppercase tracking-wider">
                  Unconverted ({insights.unconverted.count})
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-brand-navy/5">
                  <span className="text-sm font-medium text-brand-navy/60">Avg Goals Detail</span>
                  <span className="text-sm font-black text-brand-navy">{insights.unconverted.avgGoalsLength} chars</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-navy/5">
                  <span className="text-sm font-medium text-brand-navy/60">Avg Pain Points Detail</span>
                  <span className="text-sm font-black text-brand-navy">{insights.unconverted.avgPainPointsLength} chars</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-navy/5">
                  <span className="text-sm font-medium text-brand-navy/60">Top Role</span>
                  <span className="text-sm font-black text-brand-navy">{insights.unconverted.topRole}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-brand-navy/60">Top Type</span>
                  <span className="text-sm font-black text-brand-navy">{insights.unconverted.topType}</span>
                </div>
              </div>
            </div>
          </div>
        </EliteCard>
      )}
    </div>
  );
}
