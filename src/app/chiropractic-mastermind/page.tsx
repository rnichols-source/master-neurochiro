import { Metadata } from "next";
import Link from "next/link";
import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { CheckCircle2, ArrowRight, ShieldCheck, Users, Target, Zap, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Chiropractic Mastermind & Mentorship Program | NeuroChiro",
  description: "Join the elite 8-week chiropractic mastermind. Master patient communication, clinical certainty, and practice growth with Dr. Raymond Nichols.",
};

export default function ChiropracticMastermindPage() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white pb-20">
      <MastermindHeader />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Elite Program</p>
          <h1 className="text-6xl md:text-8xl font-black text-brand-navy tracking-tighter leading-none">
            Chiropractic <br />
            <span className="text-brand-orange">Mastermind.</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray font-medium leading-relaxed max-w-2xl mx-auto">
            A high-performance mentorship designed to bridge the gap between technical adjusting and clinical leadership.
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-brand-navy tracking-tight">Why Join a Chiropractic Mastermind?</h2>
              <p className="text-lg text-brand-gray font-medium leading-relaxed">
                Most chiropractors graduate with high technical skills but zero practical certainty. They feel awkward recommending care, they struggle to communicate the value of the nervous system, and they eventually experience burnout.
              </p>
              <p className="text-lg text-brand-gray font-medium leading-relaxed">
                The NeuroChiro Mastermind is an 8-week immersion into the "Missing OS" of modern practice. We provide the architecture you need to lead your patients with absolute certainty.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "8 Weeks of Step-by-Step Training",
                "Clinical Certainty Protocols",
                "Communication Architecture Mastery",
                "Weekly Case Study Reviews",
                "Private Doctor Community Access"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  </div>
                  <span className="font-bold text-brand-navy">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EliteCard className="p-8 border-brand-navy/5 bg-brand-cream/30">
              <Brain className="w-8 h-8 text-brand-orange mb-4" />
              <h3 className="text-xl font-black text-brand-navy mb-2">Identity</h3>
              <p className="text-sm text-brand-gray font-medium leading-relaxed">Shift from a technician to a Clinical Authority.</p>
            </EliteCard>
            <EliteCard className="p-8 border-brand-navy/5 bg-brand-cream/30">
              <Zap className="w-8 h-8 text-brand-orange mb-4" />
              <h3 className="text-xl font-black text-brand-navy mb-2">Certainty</h3>
              <p className="text-sm text-brand-gray font-medium leading-relaxed">Install the internal confidence school never taught you.</p>
            </EliteCard>
            <EliteCard className="p-8 border-brand-navy/5 bg-brand-cream/30">
              <Target className="w-8 h-8 text-brand-orange mb-4" />
              <h3 className="text-xl font-black text-brand-navy mb-2">Systems</h3>
              <p className="text-sm text-brand-gray font-medium leading-relaxed">The architecture of a high-performance clinic.</p>
            </EliteCard>
            <EliteCard className="p-8 border-brand-navy/5 bg-brand-cream/30">
              <Users className="w-8 h-8 text-brand-orange mb-4" />
              <h3 className="text-xl font-black text-brand-navy mb-2">Leadership</h3>
              <p className="text-sm text-brand-gray font-medium leading-relaxed">Guide your patients through life-changing care.</p>
            </EliteCard>
          </div>
        </div>
      </section>

      {/* Next Step / The Council */}
      <section className="py-32 px-8 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy/5 border border-brand-navy/10 rounded-full">
                <span className="w-2 h-2 bg-brand-orange rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy/60">Phase 2: Execution</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-brand-navy tracking-tighter leading-none">
                Beyond the <br />
                <span className="text-brand-orange">Mastermind.</span>
              </h2>
              <p className="text-xl text-brand-gray font-medium leading-relaxed">
                The Mastermind is where you learn the architecture. The <span className="text-brand-navy font-bold italic">Council</span> is where you install it. 
                Ongoing, elite coaching for graduates who refuse to let their practice drift.
              </p>
              <div className="flex gap-8">
                 <div className="space-y-2">
                    <p className="text-3xl font-black text-brand-navy">12 Months</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Implementation Roadmap</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-3xl font-black text-brand-navy">2x / Month</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Live Triage Calls</p>
                 </div>
              </div>
              <div className="pt-4">
                <Link href="/council">
                  <BrandButton variant="outline" size="lg" className="group px-12 rounded-full border-brand-navy">
                    Explore The Council <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                </Link>
              </div>
            </div>
            <div className="relative group">
               <div className="absolute -inset-4 bg-brand-orange/20 rounded-[4rem] blur-2xl group-hover:bg-brand-orange/30 transition-all duration-700" />
               <EliteCard className="relative bg-brand-navy text-white p-12 border-none space-y-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-3xl -mr-16 -mt-16" />
                  <h3 className="text-3xl font-black tracking-tight leading-none">The Council standard.</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                      </div>
                      <p className="text-white/60 text-sm font-medium">Real-time case troubleshooting and triage.</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                      </div>
                      <p className="text-white/60 text-sm font-medium">Advanced communication scripts and team training.</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                      </div>
                      <p className="text-white/60 text-sm font-medium">Monthly KPI auditing and benchmarking.</p>
                    </div>
                  </div>
                  <div className="pt-6">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Elite Installation Environment</p>
                  </div>
               </EliteCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 mt-20">
        <EliteCard className="max-w-4xl mx-auto bg-brand-navy text-white p-16 text-center space-y-8 rounded-[3rem] border-none shadow-2xl">
          <h2 className="text-5xl font-black tracking-tighter">Secure Your Spot in the Next Cohort.</h2>
          <p className="text-xl text-white/60 max-w-xl mx-auto font-medium">
            Seats are limited. We select 25 doctors for each 8-week transformation.
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
