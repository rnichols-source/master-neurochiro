import { Metadata } from "next";
import Link from "next/link";
import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { CheckCircle2, ArrowRight, MessageSquare, Zap, ShieldCheck, Target, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Chiropractic Patient Communication & Scripts Training | NeuroChiro",
  description: "Master the language of the nervous system. Elite chiropractic patient communication training and scripts for modern practice growth.",
};

export default function CommunicationTrainingPage() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white pb-20">
      <MastermindHeader />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Language Hub</p>
          <h1 className="text-6xl md:text-8xl font-black text-brand-navy tracking-tighter leading-none">
            Patient <br />
            <span className="text-brand-orange">Communication.</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray font-medium leading-relaxed max-w-2xl mx-auto">
            The bridge between your expertise and their understanding. Master the language that drives transformation.
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
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-none">Communicate with <br />Clinical Authority.</h2>
            <p className="text-lg text-brand-gray font-medium leading-relaxed">
              If you can't communicate the value of the nervous system, you will always be seen as a "back doctor." We help you shift the conversation to neurology, function, and transformation.
            </p>
            <p className="text-lg text-brand-gray font-medium leading-relaxed">
              Our communication training (NC-03) gives you the scripts and frameworks to bypass patient skepticism and build immediate trust.
            </p>
            <div className="space-y-4">
              {[
                "Master the language of the nervous system",
                "Eliminate the sales energy from your practice",
                "Build authority through data-backed communication",
                "Handle objections with total certainty"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span className="font-bold text-brand-navy">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EliteCard className="p-8 border-brand-navy/5 bg-brand-cream/30 flex flex-col items-center text-center">
               <MessageSquare className="w-10 h-10 text-brand-orange mb-6" />
               <h3 className="text-xl font-black text-brand-navy mb-2 uppercase">The Scripts</h3>
               <p className="text-sm text-brand-gray font-medium">The exact words to use in every clinical scenario.</p>
            </EliteCard>
            <EliteCard className="p-8 border-brand-navy/5 bg-brand-cream/30 flex flex-col items-center text-center">
               <Zap className="w-10 h-10 text-brand-orange mb-6" />
               <h3 className="text-xl font-black text-brand-navy mb-2 uppercase">The Certainty</h3>
               <p className="text-sm text-brand-gray font-medium">How to command the room with clinical authority.</p>
            </EliteCard>
            <EliteCard className="p-8 border-brand-navy/5 bg-brand-cream/30 flex flex-col items-center text-center">
               <Target className="w-10 h-10 text-brand-orange mb-6" />
               <h3 className="text-xl font-black text-brand-navy mb-2 uppercase">The Focus</h3>
               <p className="text-sm text-brand-gray font-medium">Keeping the conversation centered on transformation.</p>
            </EliteCard>
            <EliteCard className="p-8 border-brand-navy/5 bg-brand-cream/30 flex flex-col items-center text-center">
               <Brain className="w-10 h-10 text-brand-orange mb-6" />
               <h3 className="text-xl font-black text-brand-navy mb-2 uppercase">The Neurology</h3>
               <p className="text-sm text-brand-gray font-medium">Translating complex data into simple patient value.</p>
            </EliteCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 mt-20">
        <EliteCard className="max-w-4xl mx-auto bg-brand-navy text-white p-16 text-center space-y-8 rounded-[3rem] border-none shadow-2xl">
          <h2 className="text-5xl font-black tracking-tighter">Ready to Master Communication?</h2>
          <p className="text-xl text-white/60 max-w-xl mx-auto font-medium">
            Install the NC-03 protocol and change how you lead patients.
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
