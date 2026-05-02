"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import {
  Radar,
  HeartPulse,
  Trophy,
  GraduationCap,
  Radio,
  Shield,
  Crosshair,
  ArrowRight,
  Bot,
  Play,
  Loader2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Mail,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { runDailyBriefing } from "@/app/actions/agent-actions";
import {
  runPulseNudges,
  runKPIReminders,
  runOnboardingChase,
  runReengagement,
  runApprovedReminders,
} from "@/app/actions/agent-ops";
import { runBatchOutreach } from "@/app/actions/hunter-actions";

interface HubStats {
  scout: { pendingApps: number };
  pulse: { atRisk: number; totalMembers: number };
  chief: { kpiThisWeek: number };
  sage: { totalCompletions: number };
  echo: { pendingReviews: number; unreadMessages: number };
  sentinel: { failedAutomations: number };
  hunter: { newProspects: number };
}

interface BriefingSection {
  agent: string;
  icon: string;
  status: "action" | "warning" | "info" | "clear";
  headline: string;
  details: string[];
  action: string | null;
  actionHref: string;
}

interface Briefing {
  generatedAt: string;
  sections: BriefingSection[];
}

const statusColors = {
  action: { bg: "bg-brand-orange/10", text: "text-brand-orange", dot: "bg-brand-orange" },
  warning: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" },
  info: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
  clear: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500" },
};

const agentIcons: Record<string, any> = {
  Radar, HeartPulse, Trophy, GraduationCap, Radio, Shield, Crosshair,
};

const agents = [
  {
    name: "Scout",
    role: "Pipeline Intelligence",
    href: "/admin/agents/scout",
    icon: Radar,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    stat: (s: HubStats) => `${s.scout.pendingApps} pending`,
    quickAction: "Score & Chase",
    quickActionKey: "scout" as const,
  },
  {
    name: "Pulse",
    role: "Member Retention",
    href: "/admin/agents/pulse",
    icon: HeartPulse,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    stat: (s: HubStats) => `${s.pulse.atRisk} at-risk`,
    quickAction: "Send Nudges",
    quickActionKey: "pulse" as const,
  },
  {
    name: "Chief",
    role: "KPI & Performance",
    href: "/admin/agents/chief",
    icon: Trophy,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    stat: (s: HubStats) => `${s.chief.kpiThisWeek} KPIs this week`,
    quickAction: "KPI Reminders",
    quickActionKey: "chief" as const,
  },
  {
    name: "Sage",
    role: "Curriculum Intelligence",
    href: "/admin/agents/sage",
    icon: GraduationCap,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    stat: (s: HubStats) => `${s.sage.totalCompletions} completions`,
    quickAction: "Re-engage Stalled",
    quickActionKey: "sage" as const,
  },
  {
    name: "Echo",
    role: "Communications",
    href: "/admin/agents/echo",
    icon: Radio,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    stat: (s: HubStats) => {
      const total = s.echo.pendingReviews + s.echo.unreadMessages;
      return `${total} need attention`;
    },
    quickAction: "Open Inbox",
    quickActionKey: "echo" as const,
  },
  {
    name: "Sentinel",
    role: "Operations",
    href: "/admin/agents/sentinel",
    icon: Shield,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    stat: (s: HubStats) =>
      s.sentinel.failedAutomations > 0
        ? `${s.sentinel.failedAutomations} failed jobs`
        : "All systems go",
    quickAction: "Chase Onboarding",
    quickActionKey: "sentinel" as const,
  },
  {
    name: "Hunter",
    role: "Prospecting & Outreach",
    href: "/admin/agents/hunter",
    icon: Crosshair,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    stat: (s: HubStats) => `${s.hunter.newProspects} prospects`,
    quickAction: "Send Outreach",
    quickActionKey: "hunter" as const,
  },
];

export function AgentsHubClient({ stats }: { stats: HubStats | null }) {
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [loadingBriefing, setLoadingBriefing] = useState(false);
  const [showBriefing, setShowBriefing] = useState(false);
  const [runningAction, setRunningAction] = useState<string | null>(null);
  const [actionResults, setActionResults] = useState<Record<string, { success: boolean; message: string }>>({});

  const handleBriefing = async () => {
    setLoadingBriefing(true);
    setShowBriefing(true);
    const result = await runDailyBriefing();
    if (result.success && result.data) {
      setBriefing(result.data as Briefing);
    }
    setLoadingBriefing(false);
  };

  const handleQuickAction = async (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRunningAction(key);
    try {
      let result;
      switch (key) {
        case "scout":
          result = await runApprovedReminders();
          break;
        case "pulse":
          result = await runPulseNudges();
          break;
        case "chief":
          result = await runKPIReminders();
          break;
        case "sage":
          result = await runReengagement();
          break;
        case "sentinel":
          result = await runOnboardingChase();
          break;
        case "hunter":
          result = await runBatchOutreach(10);
          break;
        case "echo":
          // Echo just navigates
          window.location.href = "/admin/agents/echo";
          return;
      }
      if (result) {
        setActionResults((prev) => ({
          ...prev,
          [key]: { success: result.success, message: result.message || (result.success ? "Done" : "Failed") },
        }));
      }
    } catch {
      setActionResults((prev) => ({
        ...prev,
        [key]: { success: false, message: "Error running action" },
      }));
    }
    setRunningAction(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-navy rounded-2xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
              Operations Team
            </h1>
            <p className="text-sm text-brand-gray font-medium mt-0.5">
              Your AI-powered crew. 7 agents running your mastermind.
            </p>
          </div>
        </div>
        <BrandButton
          variant="primary"
          className="gap-2 px-6 py-3"
          onClick={handleBriefing}
          disabled={loadingBriefing}
        >
          {loadingBriefing ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Running...</>
          ) : (
            <><Zap className="w-4 h-4" /> Daily Briefing</>
          )}
        </BrandButton>
      </div>

      {/* Daily Briefing Panel */}
      {showBriefing && (
        <EliteCard className="p-0 overflow-hidden border-2 border-brand-navy/10">
          <div className="bg-brand-navy px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-brand-orange" />
              <div>
                <h2 className="text-lg font-black text-white tracking-tight">Daily Briefing</h2>
                {briefing && (
                  <p className="text-xs text-white/40 font-medium">
                    Generated {new Date(briefing.generatedAt).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowBriefing(false)}
              className="text-white/40 hover:text-white text-sm font-bold"
            >
              Close
            </button>
          </div>

          {loadingBriefing ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-brand-navy/30 mx-auto mb-3" />
              <p className="text-sm font-medium text-brand-gray">
                All 6 agents scanning your mastermind...
              </p>
            </div>
          ) : briefing ? (
            <div className="divide-y divide-brand-navy/5">
              {briefing.sections.map((section) => {
                const colors = statusColors[section.status];
                const Icon = agentIcons[section.icon] || Bot;
                return (
                  <div key={section.agent} className="px-6 py-4 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest">
                          {section.agent}
                        </span>
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      </div>
                      <p className="text-sm font-bold text-brand-navy">{section.headline}</p>
                      {section.details.length > 0 && (
                        <ul className="mt-1.5 space-y-0.5">
                          {section.details.map((d, i) => (
                            <li key={i} className="text-xs text-brand-gray font-medium">{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {section.action && (
                      <Link
                        href={section.actionHref}
                        className="shrink-0 px-4 py-2 bg-brand-navy text-white text-xs font-bold rounded-xl hover:bg-brand-navy/90 transition-colors flex items-center gap-1.5"
                      >
                        {section.action} <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          ) : null}
        </EliteCard>
      )}

      {/* Agent Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const statText = stats ? agent.stat(stats) : "Loading...";
          const result = actionResults[agent.quickActionKey];
          const isRunning = runningAction === agent.quickActionKey;
          return (
            <Link key={agent.name} href={agent.href}>
              <EliteCard className="p-6 h-full hover:shadow-lg transition-all group cursor-pointer border-2 border-transparent hover:border-brand-navy/10">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${agent.bg} rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${agent.color}`} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-bold text-green-500 uppercase tracking-wider">
                        Online
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-brand-navy tracking-tight">
                    {agent.name}
                  </h3>
                  <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest mt-0.5">
                    {agent.role}
                  </p>
                  <div className="flex items-center justify-between mt-3 flex-1">
                    <span className="text-sm font-bold text-brand-navy/60">
                      {statText}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-brand-navy/5">
                    <button
                      onClick={(e) => handleQuickAction(agent.quickActionKey, e)}
                      disabled={isRunning}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        result
                          ? result.success
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                          : "bg-brand-navy text-white hover:bg-brand-navy/90"
                      }`}
                    >
                      {isRunning ? (
                        <><Loader2 className="w-3 h-3 animate-spin" /> Running...</>
                      ) : result ? (
                        result.success ? (
                          <><CheckCircle className="w-3 h-3" /> {result.message}</>
                        ) : (
                          <><XCircle className="w-3 h-3" /> {result.message}</>
                        )
                      ) : (
                        <><Zap className="w-3 h-3" /> {agent.quickAction}</>
                      )}
                    </button>
                    <div className="flex items-center gap-1 text-xs font-bold text-brand-orange group-hover:text-brand-navy transition-colors px-2">
                      Open <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </EliteCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
