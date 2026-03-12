import { Metadata } from "next";
import Link from "next/link";
import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { CheckCircle2, ArrowRight, TrendingUp, ShieldCheck, Users, Zap, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Chiropractic Case Acceptance & Patient Retention Training | NeuroChiro",
  description: "Increase your chiropractic case acceptance and patient retention. master the clinical certainty and communication protocols that drive results.",
};

export default function CaseAcceptancePage() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white pb-20">
      <MastermindHeader />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Growth Hub</p>
          <h1 className="text-6xl md:text-8xl font-black text-brand-navy tracking-tighter leading-none">
            Case <br />
            <span className="text-brand-orange">Acceptance.</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray font-medium leading-relaxed max-w-2xl mx-auto">
            Stop losing patients to uncertainty. master the architecture of high-integrity conversion and long-term retention.
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

      {/* Content Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-none">The Science of <br />Case Acceptance.</h2>
            <p className="text-lg text-brand-gray font-medium leading-relaxed">
              Chiropractic case acceptance isn't about sales tactics or persuasion. It's about clinical alignment. When your patients understand the state of their nervous system, the recommendation for care becomes a logical requirement, not a financial choice.
            </p>
            <p className="text-lg text-brand-gray font-medium leading-relaxed">
              We help you install the "Certainty Protocol"—a communication framework that eliminates the need for high-pressure sales and focuses on leading patients toward transformation.
            </p>
            <div className="space-y-4">
              {[
                "Increase care plan acceptance rates to 80%+",
                "Eliminate price-based objections through clinical value",
                "Extend patient retention beyond acute pain relief",
                "Master the re-scan communication strategy"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span className="font-bold text-brand-navy">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Conversion", icon: Zap, val: "88%", label: "Avg Acceptance" },
              { title: "Retention", icon: ShieldCheck, val: "94%", label: "PVA Strength" },
              { title: "Referrals", icon: Users, val: "42%", label: "Organic Growth" },
              { title: "ROI", icon: TrendingUp, val: "14x", label: "Program Result" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-brand-cream/50 border border-brand-navy/5 text-center space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mx-auto text-brand-orange shadow-sm">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-3xl font-black text-brand-navy">{item.val}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-brand-gray/60">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 mt-20">
        <EliteCard className="max-w-4xl mx-auto bg-brand-navy text-white p-16 text-center space-y-8 rounded-[3rem] border-none shadow-2xl">
          <h2 className="text-5xl font-black tracking-tighter">Command Your Conversion.</h2>
          <p className="text-xl text-white/60 max-w-xl mx-auto font-medium">
            Discover why the NeuroChiro Mastermind is the most effective chiropractic conversion training in the industry.
          </p>
          <div className="pt-6">
            <Link href="/apply">
              <BrandButton variant="accent" size="lg" className="py-6 px-16 group">
                Apply for Admission <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
          </div>
        </EliteCard>
      </section>
    </div>
  );
}
