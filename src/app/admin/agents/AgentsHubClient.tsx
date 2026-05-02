"use client";

import { EliteCard } from "@/components/ui/elite-ui";
import {
  Radar,
  HeartPulse,
  Trophy,
  GraduationCap,
  Radio,
  Shield,
  ArrowRight,
  Bot,
} from "lucide-react";
import Link from "next/link";

interface HubStats {
  scout: { pendingApps: number };
  pulse: { atRisk: number; totalMembers: number };
  chief: { kpiThisWeek: number };
  sage: { totalCompletions: number };
  echo: { pendingReviews: number; unreadMessages: number };
  sentinel: { failedAutomations: number };
}

const agents = [
  {
    name: "Scout",
    role: "Pipeline Intelligence",
    description: "Scores applications, predicts member fit, and drafts personalized outreach.",
    href: "/admin/agents/scout",
    icon: Radar,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    stat: (s: HubStats) => `${s.scout.pendingApps} pending`,
  },
  {
    name: "Pulse",
    role: "Member Retention",
    description: "Predicts churn, tracks engagement velocity, and generates re-engagement nudges.",
    href: "/admin/agents/pulse",
    icon: HeartPulse,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    stat: (s: HubStats) => `${s.pulse.atRisk} at-risk`,
  },
  {
    name: "Chief",
    role: "KPI & Performance",
    description: "Cohort benchmarks, leaderboards, breakthroughs, and pre-call coaching briefs.",
    href: "/admin/agents/chief",
    icon: Trophy,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    stat: (s: HubStats) => `${s.chief.kpiThisWeek} KPIs this week`,
  },
  {
    name: "Sage",
    role: "Curriculum Intelligence",
    description: "Module analytics, completion funnels, content gaps, and impact correlation.",
    href: "/admin/agents/sage",
    icon: GraduationCap,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    stat: (s: HubStats) => `${s.sage.totalCompletions} completions`,
  },
  {
    name: "Echo",
    role: "Communications",
    description: "Unified inbox across DMs, reviews, and community with AI-drafted responses.",
    href: "/admin/agents/echo",
    icon: Radio,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    stat: (s: HubStats) => {
      const total = s.echo.pendingReviews + s.echo.unreadMessages;
      return `${total} need attention`;
    },
  },
  {
    name: "Sentinel",
    role: "Operations",
    description: "System health, onboarding pipeline, automation effectiveness, and ops reports.",
    href: "/admin/agents/sentinel",
    icon: Shield,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    stat: (s: HubStats) =>
      s.sentinel.failedAutomations > 0
        ? `${s.sentinel.failedAutomations} failed jobs`
        : "All systems go",
  },
];

export function AgentsHubClient({ stats }: { stats: HubStats | null }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-brand-navy rounded-2xl flex items-center justify-center">
          <Bot className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            Operations Team
          </h1>
          <p className="text-sm text-brand-gray font-medium mt-0.5">
            Your AI-powered crew. 6 agents running your mastermind.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const statText = stats ? agent.stat(stats) : "Loading...";
          return (
            <Link key={agent.name} href={agent.href}>
              <EliteCard className="p-6 h-full hover:shadow-lg transition-all group cursor-pointer border-2 border-transparent hover:border-brand-navy/10">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${agent.bg} rounded-2xl flex items-center justify-center`}
                    >
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
                  <p className="text-sm text-brand-gray font-medium leading-relaxed mt-3 flex-1">
                    {agent.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-navy/5">
                    <span className="text-sm font-bold text-brand-navy/60">
                      {statText}
                    </span>
                    <div className="flex items-center gap-1 text-sm font-bold text-brand-orange group-hover:text-brand-navy transition-colors">
                      Open <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
