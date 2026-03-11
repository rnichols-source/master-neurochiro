"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { 
  ArrowRight, 
  Target, 
  ShieldCheck, 
  Users, 
  Globe, 
  Zap, 
  Brain,
  MessageSquare,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white pb-20">
      <MastermindHeader />

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full -mr-32 -mt-32" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Our Mission</p>
            <h1 className="text-6xl md:text-8xl font-black text-brand-navy tracking-tighter leading-none">
              The Vision Behind <br />
              <span className="text-brand-orange">NeuroChiro.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-gray font-medium leading-relaxed max-w-2xl mx-auto">
              This mastermind exists because too many chiropractors graduate ready to adjust but not ready to lead.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1 — The Problem */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Reality</p>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-none">
              The Gap in Clinical Education.
            </h2>
            <div className="space-y-6 text-lg text-brand-gray font-medium leading-relaxed">
              <p>
                Chiropractic school teaches you how to adjust. It teaches you the names of bones, the pathways of nerves, and the mechanics of the spine.
              </p>
              <p>
                But it often leaves you in the dark when it comes to the most critical aspect of practice: <strong>The Human Element.</strong>
              </p>
              <p>
                Many doctors graduate technically trained but practically unprepared. They feel uncertain when recommending care, awkward during the Report of Findings, and under constant pressure to "sell" their services.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Clinical Certainty", status: "Missing" },
              { label: "Communication", status: "Untaught" },
              { label: "Care Plan Design", status: "Vague" },
              { label: "Practice Systems", status: "Chaotic" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-brand-cream/50 border border-brand-navy/5 text-center space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">{item.status}</p>
                <p className="text-lg font-black text-brand-navy">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — The Turning Point */}
      <section className="py-24 px-8 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/10 blur-[120px] rounded-full -ml-32 -mb-32" />
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-6">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Genesis</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              Why NeuroChiro Exists.
            </h2>
            <p className="text-xl text-white/70 font-medium leading-relaxed">
              Dr. Raymond Nichols created the NeuroChiro Mastermind to fix this broken transition. 
              We provide the missing operating system for modern chiropractic practice—one that 
              prioritizes clinical certainty over sales tactics and leadership over persuasion.
            </p>
          </div>
          <div className="h-px w-24 bg-brand-orange mx-auto" />
          <p className="text-2xl md:text-3xl font-black text-white italic">
            "A dysregulated chiropractor cannot help regulate others."
          </p>
        </div>
      </section>

      {/* Section 3 — The Philosophy */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Foundation</p>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight">Beyond the Adjustment.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Communication", icon: MessageSquare, desc: "The bridge between your expertise and their understanding." },
              { title: "Leadership", icon: Target, desc: "Guiding patients through the transformation they need." },
              { title: "Regulation", icon: Zap, desc: "Maintaining your own nervous system to better serve others." },
              { title: "Transformation", icon: Sparkles, desc: "Moving from symptom relief to life-changing results." }
            ].map((item, i) => (
              <EliteCard key={i} className="space-y-6 p-8 border-brand-navy/5 hover:border-brand-orange/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center text-brand-navy">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-brand-navy">{item.title}</h3>
                <p className="text-brand-gray font-medium text-sm leading-relaxed">{item.desc}</p>
              </EliteCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — What This Mastermind Builds */}
      <section className="py-24 px-8 bg-brand-cream/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Clinical Certainty",
              "Communication Architecture",
              "Care Plan Structure",
              "Patient Leadership",
              "Philosophical Clarity",
              "Nervous System Understanding",
              "Personal Regulation",
              "Stable Practice Systems"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-brand-navy/5 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-brand-orange" />
                </div>
                <span className="font-bold text-brand-navy text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Curriculum</p>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-none">
              Building the <br />Modern Authority.
            </h2>
            <p className="text-lg text-brand-gray font-medium leading-relaxed">
              We don't just give you information; we install an architecture. 
              The mastermind is designed to rebuild your identity as a doctor 
              from the ground up, giving you the tools to command your clinic 
              with authority and serving your community with absolute confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — The Bigger Vision */}
      <section className="py-32 px-8 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="inline-flex p-4 bg-brand-navy text-white rounded-3xl">
             <Globe className="w-12 h-12" />
          </div>
          <div className="space-y-6">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Future</p>
            <h2 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tight leading-none">
              A Global Network of Authority.
            </h2>
            <p className="text-xl text-brand-gray font-medium leading-relaxed">
              Our long-term goal is to build a global network of chiropractors who deeply 
              understand the nervous system, communicate with authority, and run stable, 
              high-performance practices. We are reconstructing the profession, 
              one doctor at a time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 pb-32">
        <EliteCard className="max-w-4xl mx-auto bg-brand-navy text-white p-16 text-center space-y-10 rounded-[4rem] border-none shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/10 blur-[100px] rounded-full -mr-20 -mt-20" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">Ready to Lead?</h3>
            <p className="text-xl text-white/60 max-w-xl mx-auto font-medium">
              If this vision resonates with you, apply to the NeuroChiro Mastermind.
            </p>
            <div className="pt-6">
              <Link href="/apply">
                <BrandButton variant="accent" size="lg" className="py-6 px-16 group text-lg">
                  APPLY FOR ADMISSION <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </Link>
            </div>
          </div>
        </EliteCard>
      </section>
    </div>
  );
}
