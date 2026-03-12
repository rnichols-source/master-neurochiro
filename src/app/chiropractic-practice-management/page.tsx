import { Metadata } from "next";
import Link from "next/link";
import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { CheckCircle2, ArrowRight, Settings, BarChart3, ShieldCheck, Zap, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Chiropractic Practice Management & Systems Training | NeuroChiro",
  description: "Install the NeuroChiro Operating System for elite chiropractic practice management. Automated trackers, clinical scripts, and high-performance metrics.",
};

export default function PracticeManagementPage() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white pb-20">
      <MastermindHeader />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Operating System</p>
          <h1 className="text-6xl md:text-8xl font-black text-brand-navy tracking-tighter leading-none">
            Chiropractic <br />
            <span className="text-brand-orange">Management.</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray font-medium leading-relaxed max-w-2xl mx-auto">
            Stop guessing. Own your metrics. Install the engineered systems of a high-performance clinic.
          </p>
          <div className="pt-8">
            <Link href="/apply">
              <BrandButton variant="primary" size="lg" className="px-12 py-8 rounded-full">
                Apply for Admission <ArrowRight className="ml-3 w-5 h-5" />
              </BrandButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
             <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight">The Modern Chiropractic OS.</h2>
             <p className="text-lg text-brand-gray font-medium max-w-2xl mx-auto">Management isn't about control; it's about clarity. We give you the dashboard to see exactly where your practice stands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Custom KPI Tracking", icon: BarChart3, desc: "See your revenue velocity, PVA, and case acceptance in real-time." },
              { title: "Clinical Playbooks", icon: Database, desc: "Step-by-step protocols for Day 1, Day 2, and Re-scans." },
              { title: "Authority Scripts", icon: Zap, desc: "The exact communication framework to command your clinic floor." }
            ].map((item, i) => (
              <EliteCard key={i} className="p-10 border-brand-navy/5 hover:border-brand-orange/40 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-brand-navy/5 flex items-center justify-center text-brand-navy group-hover:bg-brand-orange group-hover:text-white transition-colors mb-8">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-brand-navy mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-brand-gray font-medium leading-relaxed">{item.desc}</p>
              </EliteCard>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-8 bg-brand-navy text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black tracking-tight leading-none">Management Without Chaos.</h2>
            <p className="text-lg text-white/60 font-medium leading-relaxed">
              Most chiropractic practice management programs add layers of complexity. NeuroChiro removes them. We focus on the high-leverage activities that move the needle.
            </p>
            <div className="space-y-4">
              {[
                "Eliminate technical debt and decision fatigue",
                "Automate your practice growth metrics",
                "Reduce burnout through clinical certainty",
                "Train your associates with proven systems"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span className="font-bold text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-video bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center p-12">
             <Settings className="w-32 h-32 text-brand-orange animate-spin-slow" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 mt-20">
        <EliteCard className="max-w-4xl mx-auto bg-white p-16 text-center space-y-8 rounded-[3rem] border-brand-navy/5 shadow-2xl">
          <h2 className="text-5xl font-black text-brand-navy tracking-tighter">Ready to Scale?</h2>
          <p className="text-xl text-brand-gray max-w-xl mx-auto font-medium">
            Install the management systems modern chiropractic requires.
          </p>
          <div className="pt-6">
            <Link href="/apply">
              <BrandButton variant="primary" size="lg" className="py-6 px-16 group">
                Apply for Admission <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
          </div>
        </EliteCard>
      </section>
    </div>
  );
}
