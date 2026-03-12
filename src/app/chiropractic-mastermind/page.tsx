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
