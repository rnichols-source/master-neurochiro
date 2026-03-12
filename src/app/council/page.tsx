import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { SEOFooter } from "@/components/layout/seo-footer";
import { 
  ArrowRight, 
  Target, 
  Brain, 
  Zap, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Calendar,
  MessageSquare,
  TrendingUp,
  Lock
} from "lucide-react";
import Link from "next/link";
import StructuredData from "@/components/layout/StructuredData";

export const metadata = {
  title: "NeuroChiro Council | Elite Ongoing Chiropractic Coaching",
  description: "The ongoing coaching ecosystem for NeuroChiro Mastermind alumni and high-performance clinic owners. Stay sharp, eliminate drift, and scale your practice.",
};

export default function CouncilLandingPage() {
  const pillars = [
    { 
      title: "The Bi-Weekly Triage", 
      desc: "Two live coaching calls per month. One deep-dive strategy workshop + one 'Hot Seat' implementation lab to solve your specific clinic bottlenecks.",
      icon: Users 
    },
    { 
      title: "The Case Rescue Lab", 
      desc: "Submit your 'stuck' cases or communication breakdowns. We break down exactly where the uncertainty crept in and provide the script to fix it.",
      icon: ShieldCheck 
    },
    { 
      title: "KPI Benchmarking", 
      desc: "A Council-only version of the Clinic OS dashboard. Compare your PVA, Case Average, and Overhead against the highest-performing DC rooms.",
      icon: BarChart3 
    },
    { 
      title: "The Script Vault", 
      desc: "Instant access to our evolving library of advanced scripts, reactivation sequences, and team training SOPs that we don't share anywhere else.",
      icon: MessageSquare 
    }
  ];

  const quarterlyThemes = [
    { q: "Q1", title: "Conversion Architecture", focus: "Day 1/Day 2, ROF mastery, and initial case acceptance." },
    { q: "Q2", title: "The Retention Engine", focus: "Re-exams, wellness transitions, and long-term care logic." },
    { q: "Q3", title: "Operational OS", focus: "Team hiring, training, SOPs, and billing systems." },
    { q: "Q4", title: "Growth & Vision", focus: "Financial stability, year-end scaling, and CEO leadership." }
  ];

  const councilSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "NeuroChiro Council",
    "description": "Elite ongoing coaching for chiropractors focusing on clinical certainty and practice systems.",
    "provider": {
      "@type": "Organization",
      "name": "NeuroChiro"
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white">
      <StructuredData data={councilSchema} />
      <MastermindHeader />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-48 pb-20 lg:pb-32 px-6 lg:px-8 bg-brand-navy text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/5 blur-[120px] rounded-full -mr-40 -mt-40" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Now Admitting Founders</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
              The Installation was the Start. <br />
              <span className="text-brand-orange">The Council is the Standard.</span>
            </h1>
            <p className="text-xl text-white/60 font-medium max-w-xl">
              The elite ongoing coaching ecosystem for NeuroChiro graduates and high-performance clinic owners who refuse to let their practice drift.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link href="/apply">
                <BrandButton variant="accent" size="lg" className="group">
                  Join the Council <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </Link>
              <div className="flex items-center gap-4 text-white/40 font-bold uppercase tracking-widest text-[10px]">
                <Lock className="w-4 h-4" /> Alumni Preferred Entry
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
             <EliteCard className="bg-white/5 border-white/10 p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange" />
                <div className="space-y-8">
                   <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-black">Council Triage</h3>
                      <Calendar className="text-brand-orange" />
                   </div>
                   <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                         <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest mb-1">Coming Up</p>
                         <p className="font-bold text-sm">CEO Workshop: Q1 Conversion Architecture</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/5 opacity-40">
                         <p className="text-[10px] font-black uppercase tracking-widest mb-1">Archive</p>
                         <p className="font-bold text-sm">Hot Seat: Case Acceptance Troubleshooting</p>
                      </div>
                   </div>
                </div>
             </EliteCard>
          </div>
        </div>
      </section>

      {/* The Problem / Mission */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Drift Problem</p>
          <h2 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">
            Why 90% of Practices Slide Back into Chaos.
          </h2>
          <p className="text-xl text-brand-gray font-medium leading-relaxed">
            Most chiropractors leave a seminar with a high, only to watch their systems slowly erode 
            under the weight of daily practice. The Council exists to ensure your Operating System 
            never drifts. We don't just teach you; we stay in the room with you.
          </p>
        </div>
      </section>

      {/* The Pillars */}
      <section className="py-24 px-6 bg-brand-cream/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, i) => (
              <EliteCard key={i} className="bg-white border-brand-navy/5 hover:border-brand-orange/20 transition-all p-8 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center mb-8">
                  <p.icon className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="text-xl font-black text-brand-navy mb-4">{p.title}</h3>
                <p className="text-brand-gray text-sm font-medium leading-relaxed">{p.desc}</p>
              </EliteCard>
            ))}
          </div>
        </div>
      </section>

      {/* Quarterly Themes */}
      <section className="py-24 px-6 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-4">The Annual Cycle</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">The Quarterly <br />Roadmap.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {quarterlyThemes.map((t, i) => (
              <div key={i} className="p-10 border border-white/5 hover:bg-white/5 transition-colors group">
                <span className="text-brand-orange font-black text-xl mb-6 block">{t.q}</span>
                <h3 className="text-2xl font-black mb-4 group-hover:text-brand-orange transition-colors">{t.title}</h3>
                <p className="text-white/40 text-sm font-medium leading-relaxed">{t.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI / No-Brainer Section */}
      <section className="py-24 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">
              One Case Pays for <br /><span className="text-brand-orange">the Entire Year.</span>
            </h2>
            <div className="space-y-6">
              {[
                "One improved care plan close covers your year of membership.",
                "Saving one patient from drifting covers your monthly dues.",
                "One team training fix saves you hundreds of hours of stress.",
                "Direct access to Dr. Ray's 'Case Rescue' triage."
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3 h-3 text-brand-orange" />
                  </div>
                  <p className="text-brand-gray font-bold">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-brand-cream rounded-[3rem] p-12 border border-brand-navy/5 space-y-8">
             <div className="text-center">
                <p className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em] mb-4">Founder Membership</p>
                <div className="flex items-center justify-center gap-2">
                   <span className="text-6xl font-black text-brand-navy">$197</span>
                   <span className="text-brand-gray font-bold">/ month</span>
                </div>
                <p className="text-brand-gray text-xs mt-4 font-medium italic">Reserved for Mastermind Alumni</p>
             </div>
             <hr className="border-brand-navy/5" />
             <div className="space-y-4">
                <Link href="/apply">
                  <BrandButton variant="primary" size="lg" className="w-full">Apply for the Council</BrandButton>
                </Link>
                <p className="text-center text-[10px] text-brand-navy/40 font-bold uppercase tracking-widest">Limited to 50 Founding Members</p>
             </div>
          </div>
        </div>
      </section>

      <SEOFooter />
    </div>
  );
}
