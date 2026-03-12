import { Metadata } from "next";
import Link from "next/link";
import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { CheckCircle2, ArrowRight, Target, ShieldCheck, Zap, MessageSquare, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Chiropractic Report of Findings (ROF) Training | NeuroChiro",
  description: "Master your chiropractic report of findings with the NC-04 protocol. Increase case acceptance and patient value through clinical certainty.",
};

export default function ROFTrainingPage() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white pb-20">
      <MastermindHeader />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Conversion Hub</p>
          <h1 className="text-6xl md:text-8xl font-black text-brand-navy tracking-tighter leading-none">
            ROF <br />
            <span className="text-brand-orange">Reconstruction.</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray font-medium leading-relaxed max-w-2xl mx-auto">
            Stop "selling" care. Start leading patients. master the high-integrity chiropractic report of findings.
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
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-none">The Anatomy of a <br />High-Value ROF.</h2>
            <p className="text-lg text-brand-gray font-medium leading-relaxed">
              The biggest mistake chiropractors make on Day 2 is over-explaining. Patients don't need a neurology lecture; they need clinical certainty that you can solve their problem.
            </p>
            <p className="text-lg text-brand-gray font-medium leading-relaxed">
              The NeuroChiro ROF Reconstruction (NC-04) provides the exact architecture you need to present care plans that patients actually value, without the sales pitch or the awkwardness.
            </p>
            <div className="space-y-4">
              {[
                "Master the Scan-to-Story framework",
                "Eliminate case acceptance resistance",
                "Increase patient retention from Day 2",
                "Learn the scripts that command respect"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span className="font-bold text-brand-navy">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <EliteCard className="p-12 border-brand-navy/5 bg-brand-navy text-white relative overflow-hidden group">
               <Quote className="absolute top-10 right-10 w-24 h-24 text-white/5 group-hover:text-brand-orange/20 transition-colors" />
               <p className="text-xl font-bold leading-relaxed italic relative z-10">
                 "My ROF conversion went from 40% to 80% in the first three weeks of the program. I'm not doing more marketing—I'm just closing the gap on Day 2."
               </p>
               <div className="pt-8 relative z-10">
                  <p className="text-brand-orange font-black uppercase tracking-widest text-xs">Dr. Sarah Miller</p>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Mastermind Graduate</p>
               </div>
            </EliteCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 mt-20">
        <EliteCard className="max-w-4xl mx-auto bg-brand-navy text-white p-16 text-center space-y-8 rounded-[3rem] border-none shadow-2xl">
          <h2 className="text-5xl font-black tracking-tighter">Ready to Master the ROF?</h2>
          <p className="text-xl text-white/60 max-w-xl mx-auto font-medium">
            Install the NC-04 protocol and transform your case acceptance.
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
