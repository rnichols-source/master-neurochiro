"use client";

import { EliteCard } from "@/components/ui/elite-ui";
import {
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { retryFailedAutomation } from "@/app/actions/sentinel-actions";

interface OpsIntel {
  automations: {
    total: number;
    sent: number;
    failed: number;
    byType: Record<string, number>;
  };
  members: {
    byStatus: Record<string, number>;
    byTier: Record<string, number>;
  };
  invitations: {
    pending: number;
    activated: number;
  };
}

interface PipelineStage {
  stage: string;
  count: number;
}

interface AutomationTypeStats {
  eventType: string;
  sent: number;
  failed: number;
  successRate: number;
}

interface EffectivenessData {
  byType: AutomationTypeStats[];
  recentLogs: any[];
}

interface FailedJob {
  id: string;
  event_type: string;
  user_email: string;
  error_message: string;
  created_at: string;
}

interface SentinelClientProps {
  opsIntel: OpsIntel | null;
  pipeline: PipelineStage[];
  effectiveness: EffectivenessData | null;
  failedJobs: FailedJob[];
}

export function SentinelClient({
  opsIntel,
  pipeline,
  effectiveness,
  failedJobs: initialFailedJobs,
}: SentinelClientProps) {
  const [failedJobs, setFailedJobs] = useState(initialFailedJobs);
  const [retrying, setRetrying] = useState<string | null>(null);

  const failedCount = opsIntel?.automations.failed || 0;
  const hasFailedEmail = (effectiveness?.byType || []).some(
    (t) => t.eventType.toLowerCase().includes("email") && t.failed > 0
  );

  async function handleRetry(logId: string) {
    setRetrying(logId);
    const result = await retryFailedAutomation(logId);
    if (result.success) {
      setFailedJobs((prev) => prev.filter((j) => j.id !== logId));
    }
    setRetrying(null);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/admin/agents"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-gray hover:text-brand-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agents
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-brand-navy/5 rounded-2xl">
          <Shield className="w-8 h-8 text-brand-navy" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-brand-navy tracking-tight">
            Sentinel
          </h1>
          <p className="text-sm font-medium text-brand-gray">
            Operations & System Health
          </p>
        </div>
      </div>

      {/* System Status Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatusCard label="Database" status="Operational" color="green" />
        <StatusCard label="Auth" status="Operational" color="green" />
        <StatusCard
          label="Email"
          status={hasFailedEmail ? "Degraded" : "Operational"}
          color={hasFailedEmail ? "yellow" : "green"}
        />
        <StatusCard
          label="Automations"
          status={failedCount > 0 ? `${failedCount} Failed` : "All Clear"}
          color={failedCount > 0 ? "red" : "green"}
        />
      </div>

      {/* Onboarding Pipeline */}
      <EliteCard title="Onboarding Pipeline" icon={Activity}>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {pipeline.map((stage, i) => (
            <div key={stage.stage} className="flex items-center gap-2">
              <div className="flex-shrink-0 bg-brand-navy/5 rounded-xl px-4 py-3 text-center min-w-[120px]">
                <p className="text-2xl font-black text-brand-navy">
                  {stage.count}
                </p>
                <p className="text-xs font-medium text-brand-gray mt-1">
                  {stage.stage}
                </p>
              </div>
              {i < pipeline.length - 1 && (
                <div className="flex-shrink-0 text-center">
                  <p className="text-xs font-black text-brand-orange">
                    {stage.count > 0
                      ? `${Math.round(
                          (pipeline[i + 1].count / stage.count) * 100
                        )}%`
                      : "--"}
                  </p>
                  <p className="text-brand-gray/40 text-lg">&#8594;</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </EliteCard>

      {/* Automation Effectiveness */}
      {effectiveness && effectiveness.byType.length > 0 && (
        <EliteCard title="Automation Effectiveness" icon={CheckCircle}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-navy/10">
                  <th className="text-left py-2 font-black text-brand-navy">
                    Event Type
                  </th>
                  <th className="text-right py-2 font-black text-brand-navy">
                    Sent
                  </th>
                  <th className="text-right py-2 font-black text-brand-navy">
                    Failed
                  </th>
                  <th className="text-right py-2 font-black text-brand-navy">
                    Success Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {effectiveness.byType.map((t) => (
                  <tr
                    key={t.eventType}
                    className="border-b border-brand-navy/5"
                  >
                    <td className="py-2 font-medium text-brand-navy">
                      {t.eventType}
                    </td>
                    <td className="py-2 text-right font-medium text-emerald-500">
                      {t.sent}
                    </td>
                    <td className="py-2 text-right font-medium text-red-500">
                      {t.failed}
                    </td>
                    <td className="py-2 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-black ${
                          t.successRate >= 90
                            ? "bg-emerald-50 text-emerald-500"
                            : t.successRate >= 70
                            ? "bg-amber-50 text-amber-500"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {t.successRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </EliteCard>
      )}

      {/* Failed Jobs */}
      {failedJobs.length > 0 && (
        <EliteCard title="Failed Jobs" subtitle="Action Required" icon={AlertTriangle}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-navy/10">
                  <th className="text-left py-2 font-black text-brand-navy">
                    Event
                  </th>
                  <th className="text-left py-2 font-black text-brand-navy">
                    Email
                  </th>
                  <th className="text-left py-2 font-black text-brand-navy">
                    Error
                  </th>
                  <th className="text-left py-2 font-black text-brand-navy">
                    Date
                  </th>
                  <th className="text-right py-2 font-black text-brand-navy">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {failedJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-brand-navy/5"
                  >
                    <td className="py-2 font-medium text-brand-navy">
                      {job.event_type}
                    </td>
                    <td className="py-2 font-medium text-brand-gray">
                      {job.user_email || "--"}
                    </td>
                    <td className="py-2 text-red-500 font-medium max-w-[200px] truncate">
                      {job.error_message || "Unknown error"}
                    </td>
                    <td className="py-2 font-medium text-brand-gray whitespace-nowrap">
                      {formatDate(job.created_at)}
                    </td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => handleRetry(job.id)}
                        disabled={retrying === job.id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-black rounded-lg hover:bg-brand-orange/20 transition-colors disabled:opacity-50"
                      >
                        <RefreshCw
                          className={`w-3 h-3 ${
                            retrying === job.id ? "animate-spin" : ""
                          }`}
                        />
                        Retry
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </EliteCard>
      )}

      {failedJobs.length === 0 && (
        <EliteCard>
          <div className="flex items-center gap-3 py-4">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="font-black text-brand-navy">No Failed Jobs</p>
              <p className="text-sm font-medium text-brand-gray">
                All automations are running smoothly.
              </p>
            </div>
          </div>
        </EliteCard>
      )}

      {/* Recent Automation Activity */}
      {effectiveness && effectiveness.recentLogs.length > 0 && (
        <EliteCard title="Recent Automation Activity" icon={Activity}>
          <div className="space-y-3">
            {effectiveness.recentLogs.map((log: any, i: number) => (
              <div
                key={log.id || i}
                className="flex items-start gap-3 py-2 border-b border-brand-navy/5 last:border-0"
              >
                <div
                  className={`mt-1 p-1.5 rounded-lg ${
                    log.status === "sent"
                      ? "bg-emerald-50"
                      : log.status === "failed"
                      ? "bg-red-50"
                      : "bg-amber-50"
                  }`}
                >
                  {log.status === "sent" ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  ) : log.status === "failed" ? (
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-brand-navy">
                    {log.event_type}
                  </p>
                  <p className="text-xs font-medium text-brand-gray truncate">
                    {log.user_email || "System"}{" "}
                    {log.error_message && (
                      <span className="text-red-400">
                        &mdash; {log.error_message}
                      </span>
                    )}
                  </p>
                </div>
                <p className="text-xs font-medium text-brand-gray whitespace-nowrap">
                  {formatDate(log.created_at)}
                </p>
              </div>
            ))}
          </div>
        </EliteCard>
      )}
    </div>
  );
}

/* ---------- Small helper component ---------- */

function StatusCard({
  label,
  status,
  color,
}: {
  label: string;
  status: string;
  color: "green" | "yellow" | "red";
}) {
  const colorMap = {
    green: {
      dot: "bg-emerald-500",
      text: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    yellow: {
      dot: "bg-amber-500",
      text: "text-amber-500",
      bg: "bg-amber-50",
    },
    red: {
      dot: "bg-red-500",
      text: "text-red-500",
      bg: "bg-red-50",
    },
  };

  const c = colorMap[color];

  return (
    <EliteCard>
      <div className="flex items-center gap-3">
        <span className={`w-2.5 h-2.5 rounded-full ${c.dot} animate-pulse`} />
        <div>
          <p className="text-sm font-black text-brand-navy">{label}</p>
          <p className={`text-xs font-medium ${c.text}`}>{status}</p>
        </div>
      </div>
    </EliteCard>
  );
}
