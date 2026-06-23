"use client";

import Link from "next/link";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import {
  Video,
  Activity,
  MessageSquare,
  FileText,
  ShieldCheck,
  Calendar,
  ArrowRight,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

interface NextCall {
  title: string;
  callTime: string;
  zoomUrl: string;
  id: string;
}

interface MyKPIs {
  acceptance: number | null;
  newPatients: number | null;
  collectionsPerVisit: number | null;
}

interface Benchmarks {
  memberCount: number;
  acceptance: { avg: number; top: number };
  newPatients: { avg: number; top: number };
  collectionsPerVisit: { avg: number; top: number };
}

interface CouncilClientProps {
  nextCall: NextCall | null;
  myKPIs: MyKPIs | null;
  benchmarks: Benchmarks | null;
  hasSubmittedPreCall: boolean;
}

function formatCallDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function formatCallTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
}

export function CouncilClient({ nextCall, myKPIs, benchmarks, hasSubmittedPreCall }: CouncilClientProps) {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange mb-4">
          <ShieldCheck size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">Your Community</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">The Inner Circle</h1>
        <p className="text-brand-gray text-base font-medium mt-2 max-w-xl">
          Bi-weekly coaching, accountability, and the tools that keep your practice growing.
        </p>
      </div>

      {/* Pre-call KPI reminder */}
      {nextCall && !hasSubmittedPreCall && (
        <Link href="/portal/council/pre-call" className="block">
          <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-brand-orange/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-brand-orange" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-brand-navy">Submit your pre-call KPIs</p>
              <p className="text-xs text-brand-gray">Drop your numbers before the next call so we can coach on real data.</p>
            </div>
            <ArrowRight size={16} className="text-brand-orange flex-shrink-0" />
          </div>
        </Link>
      )}

      {/* Live Call + KPI Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EliteCard className="lg:col-span-2 bg-brand-navy text-white border-none p-8 md:p-10 relative overflow-hidden">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full text-brand-orange border border-white/10">
              <Calendar size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Next Call</span>
            </div>
            {nextCall ? (
              <>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                  {nextCall.title || "Inner Circle Coaching Call"}
                </h2>
                <p className="text-white/50 text-sm font-medium">
                  {formatCallDate(nextCall.callTime)} at {formatCallTime(nextCall.callTime)}
                </p>
                <a href={nextCall.zoomUrl} target="_blank" rel="noopener noreferrer">
                  <BrandButton variant="accent" className="mt-4">
                    Enter Call Room
                  </BrandButton>
                </a>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                  No Call Scheduled
                </h2>
                <p className="text-white/50 text-sm font-medium max-w-lg">
                  The next bi-weekly call has not been scheduled yet. Check back soon.
                </p>
              </>
            )}
          </div>
        </EliteCard>

        <EliteCard className="p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-navy/40 mb-6">
            Your Numbers
          </p>
          <div className="space-y-6">
            {[
              {
                label: "Care Plan Acceptance",
                value: myKPIs?.acceptance != null ? `${myKPIs.acceptance}%` : "--",
                benchmark: benchmarks ? `IC avg: ${benchmarks.acceptance.avg}%` : null,
              },
              {
                label: "New Patients/Week",
                value: myKPIs?.newPatients != null ? `${myKPIs.newPatients}` : "--",
                benchmark: benchmarks ? `IC avg: ${benchmarks.newPatients.avg}` : null,
              },
              {
                label: "Collections/Visit",
                value: myKPIs?.collectionsPerVisit != null ? `$${myKPIs.collectionsPerVisit}` : "--",
                benchmark: benchmarks ? `IC avg: $${benchmarks.collectionsPerVisit.avg}` : null,
              },
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-brand-navy/40">{stat.label}</p>
                  <p className="text-2xl font-black text-brand-navy">{stat.value}</p>
                </div>
                {stat.benchmark && (
                  <span className="text-xs font-bold text-brand-orange">
                    {stat.benchmark}
                  </span>
                )}
              </div>
            ))}
          </div>
        </EliteCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Pre-Call KPIs", desc: "Submit your numbers before the call", icon: ClipboardList, href: "/portal/council/pre-call" },
          { title: "Scripts", desc: "Advanced communication scripts", icon: MessageSquare, href: "/portal/triage" },
          { title: "Case Rescue", desc: "Submit difficult cases for review", icon: Activity, href: "/portal/case-lab" },
          { title: "Call Archives", desc: "Past session recordings", icon: Video, href: "/portal/curriculum" },
        ].map((action, i) => (
          <Link key={i} href={action.href}>
            <EliteCard className="h-full p-5 hover:border-brand-orange/40 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-brand-navy/5 flex items-center justify-center mb-3 group-hover:bg-brand-orange transition-colors">
                <action.icon size={16} className="text-brand-navy group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-black text-brand-navy mb-1">{action.title}</h3>
              <p className="text-xs text-brand-gray font-medium">{action.desc}</p>
            </EliteCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
