"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { PracticeReadinessScore } from "@/components/marketing/prs-tool";
import { VideoModal } from "@/components/marketing/video-modal";
import { ValueStack, CohortStatus } from "@/components/marketing/conversion-modules";
import { PracticeROISimulator } from "@/components/marketing/roi-simulator";
import { ClinicOSPreview } from "@/components/marketing/clinic-os-preview";
import { CaseStudyFilter } from "@/components/marketing/case-study-filter";
import { FounderAuthorityCard } from "@/components/marketing/founder-card";
import { 
  ArrowRight, 
  Play, 
  Brain, 
  Zap, 
  Target, 
  ShieldCheck, 
  ChevronRight,
  Settings,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MastermindLandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const mechanisms = [
    { id: "os", systemID: "NC-01", title: "The Clinical OS", desc: "An engineered framework that aligns your neurological results with your revenue velocity.", icon: Brain },
    { id: "certainty", systemID: "NC-02", title: "The Certainty Engine", desc: "Eliminate the 'persuasion' energy. Command the room with data-backed clinical authority.", icon: ShieldCheck },
    { id: "scan", systemID: "NC-03", title: "The Neural Bridge", desc: "Stop over-explaining. Use the language that bypasses patient skepticism and builds immediate trust.", icon: Zap },
    { id: "rof", systemID: "NC-04", title: "The ROF Reconstruction", desc: "A high-integrity protocol for presenting life-changing care plans that patients actually value.", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white pb-20">
      <MastermindHeader />
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-48 pb-20 lg:pb-32 px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Authority Copy */}
          <div className="space-y-10 lg:space-y-12 text-center lg:text-left relative z-10">
            <div className="space-y-6 lg:space-y-8">
              <div className="flex justify-center lg:justify-start">
                <CohortStatus />
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] text-brand-navy font-black tracking-tight leading-[0.95]">
                  Stop Guessing. <br />
                  <span className="text-brand-orange">Own Your Authority.</span>
                </h1>
                <div className="h-1.5 w-24 bg-brand-orange mx-auto lg:mx-0 rounded-full" />
              </div>
              
              <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
                <p className="text-xl md:text-2xl text-brand-navy font-bold leading-tight">
                  Built by Dr. Raymond Nichols to help chiropractors and students develop the clinical certainty and communication architecture modern chiropractic requires.
                </p>
                <p className="text-base md:text-lg text-brand-gray font-medium leading-relaxed">
                  The awkwardness of recommending care is a symptom of a missing OS. We give you the clinical certainty to lead your patients—without the sales pitch or the burnout.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <Link href="/apply" className="w-full sm:w-auto">
                <BrandButton variant="primary" size="lg" className="group py-7 px-12 w-full sm:w-auto text-sm shadow-2xl">
                  Apply for Admission <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </Link>
              <Link href="/vision" className="flex items-center gap-4 text-brand-navy/60 hover:text-brand-navy transition-colors font-bold uppercase tracking-[0.2em] text-[10px]">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-brand-navy/10 flex items-center justify-center bg-white shadow-xl shadow-brand-navy/5 group hover:border-brand-orange/40 transition-all">
                  <BookOpen className="w-4 h-4 text-brand-navy group-hover:text-brand-orange transition-colors" />
                </div>
                Read the Vision
              </Link>
            </div>

            {/* Micro Stats Row */}
            <div className="pt-8 border-t border-brand-navy/5 flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 opacity-60">
              <div>
                <p className="text-xl font-black text-brand-navy tracking-tight">150+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray">Doctors in Network</p>
              </div>
              <div>
                <p className="text-xl font-black text-brand-navy tracking-tight">5</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray">Countries</p>
              </div>
              <div>
                <p className="text-xl font-black text-brand-navy tracking-tight">8 Weeks</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray">Total Transformation</p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Authority Card */}
          <div className="relative mt-12 lg:mt-0 max-w-xl mx-auto lg:max-w-none">
            <FounderAuthorityCard />
          </div>
        </div>
      </section>

      {/* ROI Simulator Section */}
      <section className="py-20 lg:section-padding px-6 lg:px-8 bg-brand-navy text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] lg:w-[800px] h-[400px] lg:h-[800px] bg-brand-orange/10 blur-[80px] lg:blur-[120px] rounded-full -mr-20 lg:-mr-40 -mt-20 lg:-mt-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <PracticeROISimulator />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 lg:section-padding px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <CaseStudyFilter />
        </div>
      </section>

      {/* OS Preview Section */}
      <section className="py-20 lg:section-padding px-6 lg:px-8 bg-brand-cream/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tighter">Command Your Practice. Don't Just Run It.</h2>
            <p className="text-lg md:text-xl text-brand-gray font-medium max-w-2xl mx-auto">See how we organize your entire practice into one simple dashboard that shows you exactly where you stand.</p>
          </div>
          <ClinicOSPreview />
        </div>
      </section>

      {/* Proprietary Mechanisms */}
      <section id="mechanisms" className="py-20 lg:section-padding px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12 lg:mb-20 text-center lg:text-left">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-4">The Engineered Systems</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 text-brand-navy">The Architecture of a High-Performance Clinic.</h2>
            <p className="text-brand-gray text-lg md:text-xl font-medium">Most doctors make it up as they go. We give you a practical way to handle every patient, every scan, and every report with ease.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {mechanisms.map((m, i) => (
              <EliteCard 
                key={m.id} 
                className="bg-white border-brand-navy/5 hover:border-brand-orange/40 transition-all group p-6 lg:p-8"
              >
                <div className="flex justify-between items-start mb-6 lg:mb-8">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                    <m.icon className="w-5 h-5 lg:w-6 lg:h-6 text-brand-navy group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[10px] font-black text-brand-navy/20 tracking-widest">{m.systemID}</span>
                </div>
                <h3 className="text-xl font-black mb-3 text-brand-navy">{m.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-6 lg:mb-8 font-medium">{m.desc}</p>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-orange group-hover:gap-3 transition-all">
                  How it Works <ChevronRight className="w-4 h-4" />
                </button>
              </EliteCard>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Score Tool */}
      <section className="py-20 lg:section-padding px-6 lg:px-8 relative overflow-hidden bg-brand-cream/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Audit Your Performance</p>
              <h2 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">Is Your Practice <br />Ready for This?</h2>
              <p className="text-lg md:text-xl text-brand-gray font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                Before you apply, we need to measure your clinical readiness. 
                Answer 10 quick questions to see if the Mastermind is your next high-leverage move.
              </p>
            </div>

            <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-6 md:p-12 elite-shadow border border-brand-navy/5">
              <PracticeReadinessScore />
            </div>
          </div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="py-20 lg:section-padding px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <ValueStack />
        </div>
      </section>
    </div>
  );
}
