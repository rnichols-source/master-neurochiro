"use client";

import Link from "next/link";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import {
  Users,
  Video,
  Activity,
  MessageSquare,
  FileText,
  Target,
  ShieldCheck,
  Calendar,
  ArrowRight,
  TrendingUp,
  Zap,
} from "lucide-react";

export function CouncilClient() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange mb-4">
          <ShieldCheck size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">Your Community</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">The Council</h1>
        <p className="text-brand-gray text-base font-medium mt-2 max-w-xl">
          Ongoing implementation support for chiropractors who want consistent growth.
        </p>
      </div>

      {/* Live Call + KPI Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EliteCard className="lg:col-span-2 bg-brand-navy text-white border-none p-8 md:p-10 relative overflow-hidden">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full text-brand-orange border border-white/10">
              <Calendar size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Next Call</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Bi-Weekly Implementation Call
            </h2>
            <p className="text-white/50 text-sm font-medium max-w-lg">
              Every Tuesday at 12:00 PM EST. Bring your current bottlenecks for real-time strategy.
            </p>
            <BrandButton variant="accent" className="mt-4">
              Enter Call Room
            </BrandButton>
          </div>
        </EliteCard>

        <EliteCard className="p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-navy/40 mb-6">
            Council Benchmarks
          </p>
          <div className="space-y-6">
            {[
              { label: "Visit Average", value: "48", target: "60" },
              { label: "Care Plan Acceptance", value: "82%", target: "90%" },
              { label: "Overhead", value: "42%", target: "35%" },
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-brand-navy/40">{stat.label}</p>
                  <p className="text-2xl font-black text-brand-navy">{stat.value}</p>
                </div>
                <span className="text-xs font-bold text-brand-orange">
                  Target: {stat.target}
                </span>
              </div>
            ))}
          </div>
        </EliteCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Case Rescue", desc: "Submit difficult cases for review", icon: Activity, href: "/portal/case-lab" },
          { title: "Scripts", desc: "Advanced communication scripts", icon: MessageSquare, href: "/portal/triage" },
          { title: "Resources", desc: "Implementation toolkits", icon: FileText, href: "/portal/resources" },
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
