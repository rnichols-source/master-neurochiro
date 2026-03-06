"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { PracticeReadinessScore } from "@/components/marketing/prs-tool";
import { VideoModal } from "@/components/marketing/video-modal";
import { ValueStack, CohortStatus } from "@/components/marketing/conversion-modules";
import { PracticeROISimulator } from "@/components/marketing/roi-simulator";
import { ClinicOSPreview } from "@/components/marketing/clinic-os-preview";
import { CaseStudyFilter } from "@/components/marketing/case-study-filter";
import { 
  ArrowRight, 
  Play, 
  Brain, 
  Zap, 
  Target, 
  ShieldCheck, 
  TrendingUp,
  ChevronRight,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MastermindLandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const mechanisms = [
    { id: "os", systemID: "NC-01", title: "The Practice Blueprint", desc: "A step-by-step plan to get your clinical results and your business numbers working together.", icon: Brain },
    { id: "certainty", systemID: "NC-02", title: "The Certainty Method", desc: "How to recommend care with absolute confidence without feeling like a salesperson.", icon: ShieldCheck },
    { id: "scan", systemID: "NC-03", title: "The Patient Language", desc: "How to explain complex neurology so patients actually 'get it' and say yes to care.", icon: Zap },
    { id: "rof", systemID: "NC-04", title: "The Master Report", desc: "A simple way to present big care plans without the awkward pushback or negotiation.", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white pb-20">
      <MastermindHeader />
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <CohortStatus />
              <h1 className="text-display text-brand-navy mt-8">
                Stop Guessing. <br />
                <span className="text-brand-orange">Start Leading Your Clinic.</span>
              </h1>
              <p className="text-xl text-brand-gray font-medium leading-relaxed max-w-xl">
                Most doctors feel awkward recommending care. We show you exactly how to run a nervous-system–first practice—without the stress, the confusion, or the sales pitch.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/mastermind/apply">
                <BrandButton variant="primary" size="lg" className="group py-6 px-10">
                  Apply for Admission <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </Link>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-4 text-brand-navy/60 hover:text-brand-navy transition-colors font-bold uppercase tracking-widest text-[10px]"
              >
                <div className="w-14 h-14 rounded-full border-2 border-brand-navy/10 flex items-center justify-center bg-white shadow-xl shadow-brand-navy/5">
                  <Play className="w-4 h-4 fill-brand-navy ml-1" />
                </div>
                Watch the Vision
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-brand-orange/5 blur-3xl rounded-full -m-20 animate-pulse" />
            <EliteCard className="relative p-0 overflow-hidden border-brand-navy/10 shadow-2xl rounded-[3rem]">
              <div className="aspect-[4/5] bg-brand-navy relative group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="w-20 h-20 rounded-full bg-brand-orange/90 flex items-center justify-center shadow-2xl shadow-brand-orange/40 hover:scale-110 transition-transform"
                   >
                     <Play className="w-8 h-8 text-white fill-white ml-1" />
                   </button>
                </div>
              </div>
            </EliteCard>
          </div>
        </div>
      </section>

      {/* ROI Simulator Section */}
      <section className="section-padding px-8 bg-brand-navy text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/10 blur-[120px] rounded-full -mr-40 -mt-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <PracticeROISimulator />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="section-padding px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <CaseStudyFilter />
        </div>
      </section>

      {/* OS Preview Section */}
      <section className="section-padding px-8 bg-brand-cream/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black text-brand-navy tracking-tighter">Your Clinic, Simplified.</h2>
            <p className="text-xl text-brand-gray font-medium max-w-2xl mx-auto">See how we organize your entire practice into one simple dashboard that shows you exactly where you stand.</p>
          </div>
          <ClinicOSPreview />
        </div>
      </section>

      {/* Proprietary Mechanisms */}
      <section id="mechanisms" className="section-padding px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-20">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-4">The Tools You'll Use</p>
            <h2 className="text-6xl font-black tracking-tighter leading-none mb-6 text-brand-navy">The Systems Behind a High-Performance Clinic.</h2>
            <p className="text-brand-gray text-xl font-medium">Most doctors make it up as they go. We give you a practical way to handle every patient, every scan, and every report with ease.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mechanisms.map((m, i) => (
              <EliteCard 
                key={m.id} 
                className="bg-white border-brand-navy/5 hover:border-brand-orange/40 transition-all group p-8"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                    <m.icon className="w-6 h-6 text-brand-navy group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[10px] font-black text-brand-navy/20 tracking-widest">{m.systemID}</span>
                </div>
                <h3 className="text-xl font-black mb-3 text-brand-navy">{m.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-8 font-medium">{m.desc}</p>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-orange group-hover:gap-3 transition-all">
                  How it Works <ChevronRight className="w-4 h-4" />
                </button>
              </EliteCard>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Score Tool */}
      <section className="section-padding px-8 relative overflow-hidden bg-brand-cream/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Take the Test</p>
              <h2 className="text-6xl font-black text-brand-navy tracking-tighter leading-none">Is Your Practice <br />Ready for This?</h2>
              <p className="text-xl text-brand-gray font-medium leading-relaxed max-w-lg">
                Before you apply, we need to see where you're at. 
                Answer 10 quick questions to see if the Mastermind is the right next step for you.
              </p>
            </div>

            <div className="bg-white rounded-[3rem] p-12 elite-shadow border border-brand-navy/5">
              <PracticeReadinessScore />
            </div>
          </div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="section-padding px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <ValueStack />
        </div>
      </section>
    </div>
  );
}
