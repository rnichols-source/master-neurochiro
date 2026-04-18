"use client";

import { EliteCard } from "@/components/ui/elite-ui";
import type { ScorecardData } from "@/app/actions/scorecard-actions";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Award,
  Lightbulb,
  ArrowRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function formatCollections(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }
  return `$${value.toLocaleString()}`;
}

function MetricCard({
  label,
  value,
  previousValue,
  percentile,
  suffix,
}: {
  label: string;
  value: number;
  previousValue: number;
  percentile: number;
  suffix?: string;
}) {
  const isUp = value >= previousValue;
  const diff = previousValue > 0 ? Math.round(((value - previousValue) / previousValue) * 100) : 0;
  const isCollections = label === "Collections";

  return (
    <EliteCard className="p-6">
      <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-3">
        {label}
      </p>
      <div className="flex items-end gap-3 mb-3">
        <span className="text-4xl font-black text-brand-navy leading-none">
          {isCollections ? formatCollections(value) : value}
          {suffix && !isCollections && (
            <span className="text-2xl">{suffix}</span>
          )}
        </span>
        {previousValue > 0 && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-bold pb-1",
              isUp ? "text-green-500" : "text-red-500"
            )}
          >
            {isUp ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(diff)}%</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 bg-brand-navy/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-orange rounded-full transition-all"
            style={{ width: `${Math.min(percentile, 100)}%` }}
          />
        </div>
        <span className="text-xs font-bold text-brand-navy/40">
          Top {100 - percentile}%
        </span>
      </div>
    </EliteCard>
  );
}

function ProgressBars({
  weeklyData,
}: {
  weeklyData: ScorecardData["weeklyData"];
}) {
  const metricKeys = [
    { key: "patient_visits" as const, label: "Patient Visits", color: "bg-brand-navy" },
    { key: "new_patients" as const, label: "New Patients", color: "bg-brand-orange" },
    { key: "case_acceptance" as const, label: "Case Acceptance %", color: "bg-green-500" },
    { key: "collections" as const, label: "Collections", color: "bg-blue-500" },
  ];

  return (
    <EliteCard title="4-Week Trend" icon={Activity}>
      <div className="space-y-6 mt-4">
        {metricKeys.map((metric) => {
          const values = weeklyData.map((w) => w[metric.key]);
          const max = Math.max(...values, 1);
          return (
            <div key={metric.key}>
              <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-2">
                {metric.label}
              </p>
              <div className="flex items-end gap-1.5 h-10">
                {values.map((val, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-md transition-all",
                      metric.color,
                      i === values.length - 1 ? "opacity-100" : "opacity-30"
                    )}
                    style={{ height: `${(val / max) * 100}%`, minHeight: "4px" }}
                    title={`Week ${i + 1}: ${metric.key === "collections" ? "$" : ""}${val}${metric.key === "case_acceptance" ? "%" : ""}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </EliteCard>
  );
}

export function ScorecardClient({ data }: { data: ScorecardData | undefined }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <EliteCard className="max-w-md p-10 text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-brand-orange/10 rounded-full flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-brand-orange" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-brand-navy">
              No Data Yet
            </h2>
            <p className="text-sm text-brand-gray font-medium">
              Submit your first week of KPIs to unlock your Practice Scorecard.
            </p>
          </div>
          <Link
            href="/portal/engine"
            className="inline-flex items-center justify-center gap-2 bg-brand-navy text-white rounded-xl py-3.5 px-6 text-sm font-bold hover:bg-brand-black transition-colors"
          >
            Submit KPIs <ArrowRight className="w-4 h-4" />
          </Link>
        </EliteCard>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
          Practice Scorecard
        </h1>
        <p className="text-sm text-brand-gray font-medium mt-1">
          Your performance at a glance vs. the group.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Group Ranking + Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Group Ranking */}
        <EliteCard className="p-6 bg-brand-navy text-white border-none">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                Group Ranking
              </p>
              <p className="text-lg font-black leading-snug">
                You&apos;re in the top{" "}
                <span className="text-brand-orange">
                  {100 - data.bestPercentile}%
                </span>{" "}
                for {data.bestMetricLabel}.
              </p>
            </div>
          </div>
        </EliteCard>

        {/* Dr. Nichols' Recommendation */}
        <EliteCard className="p-6 border-brand-orange/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6 text-brand-orange" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-navy/40">
                Dr. Nichols&apos; Recommendation
              </p>
              <p className="text-sm font-bold text-brand-navy leading-relaxed">
                {data.recommendation.message}
              </p>
              {data.recommendation.link && (
                <Link
                  href={data.recommendation.link}
                  className="inline-flex items-center gap-1 text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors"
                >
                  {data.recommendation.linkLabel || "View"}{" "}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        </EliteCard>
      </div>

      {/* 4-Week Progress Bars */}
      {data.weeklyData.length > 1 && (
        <ProgressBars weeklyData={data.weeklyData} />
      )}
    </div>
  );
}
