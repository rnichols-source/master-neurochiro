import { Metadata } from "next";
import Link from "next/link";
import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { CheckCircle2, ArrowRight, TrendingUp, ShieldCheck, Users, MessageSquare, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Chiropractic Coaching & Practice Growth Consulting | NeuroChiro",
  description: "Elite chiropractic coaching for doctors who want to master patient communication, clinical certainty, and clinic systems without the burnout.",
};

export default function ChiropracticCoachingPage() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white pb-20">
      <MastermindHeader />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Practice Growth</p>
          <h1 className="text-6xl md:text-8xl font-black text-brand-navy tracking-tighter leading-none">
            Chiropractic <br />
            <span className="text-brand-orange">Coaching.</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray font-medium leading-relaxed max-w-2xl mx-auto">
            Move beyond generic practice management. We provide the clinical coaching and communication systems that build high-authority clinics.
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

      {/* Problem/Solution */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-none">
              The End of Generic <br />Chiropractic Consulting.
            </h2>
            <p className="text-lg text-brand-gray font-medium leading-relaxed">
              Most chiropractic coaching programs focus solely on marketing and "more new patients." We believe the problem isn't your marketing—it's your certainty.
            </p>
            <p className="text-lg text-brand-gray font-medium leading-relaxed">
              If you have a high-volume funnel but a low-integrity communication system, you will always be under pressure. We coach you to install the NeuroChiro OS, ensuring that every patient you see is a patient you lead with clinical authority.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {[
              { title: "Clinical Authority Coaching", icon: ShieldCheck, desc: "Master the neurology and the certainty school didn't teach you." },
              { title: "Revenue Velocity Mastery", icon: TrendingUp, desc: "Scale your collections by increasing case acceptance, not just visits." },
              { title: "Team Leadership Training", icon: Users, desc: "Install the systems your staff needs to support a high-performance clinic." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-3xl bg-brand-cream/50 border border-brand-navy/5">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center text-white shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-black text-brand-navy mb-2">{item.title}</h3>
                   <p className="text-sm text-brand-gray font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 mt-20">
        <EliteCard className="max-w-4xl mx-auto bg-brand-navy text-white p-16 text-center space-y-8 rounded-[3rem] border-none shadow-2xl">
          <h2 className="text-5xl font-black tracking-tighter">Your Clinic is Next.</h2>
          <p className="text-xl text-white/60 max-w-xl mx-auto font-medium">
            Discover why hundreds of doctors have switched to NeuroChiro coaching for clinical certainty and practice growth.
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
