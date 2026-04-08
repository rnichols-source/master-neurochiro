"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Target, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  MessageSquare, 
  Search, 
  Lock, 
  X,
  Plus,
  TrendingUp,
  Brain,
  ShieldCheck,
  Timer,
  ChevronRight,
  Activity,
  Award
} from "lucide-react";
import Link from "next/link";
import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { SEOFooter } from "@/components/layout/seo-footer";

const CouncilPage = () => {
  const [activeQuarter, setActiveQuarter] = useState(0);

  const roadmap = [
    {
      quarter: "Q1 — FOUNDATION (STABILITY)",
      months: [
        {
          name: "Month 1: Clinical Identity",
          focus: "Confidence + Certainty",
          implementation: "Developing the doctor's internal authority and removing clinical hesitation.",
          measure: "Certainty Score + Patient Commitment Rate"
        },
        {
          name: "Month 2: Communication Mastery",
          focus: "Explaining Care Clearly",
          implementation: "Simplifying complex neurology into patient-centered language that drives action.",
          measure: "Consultation-to-Exam Conversion"
        },
        {
          name: "Month 3: Care Plan Authority",
          focus: "Frequency Clarity",
          implementation: "Structuring care plans based on neuro-physiology rather than insurance or habit.",
          measure: "ROF Acceptance Rate"
        }
      ]
    },
    {
      quarter: "Q2 — SYSTEMS (CONTROL)",
      months: [
        {
          name: "Month 4: Patient Flow Systems",
          focus: "Day 1 → Day 3 Structure",
          implementation: "Hard-coding the first three visits to ensure maximum patient understanding and retention.",
          measure: "Day 3 Retention Percentage"
        },
        {
          name: "Month 5: Retention Architecture",
          focus: "Re-exams + Behavioral Patterns",
          implementation: "Installing a re-exam system that reconnects patients to their goals and progress.",
          measure: "PVA (Patient Visit Average) Growth"
        },
        {
          name: "Month 6: Team Alignment",
          focus: "Delegation + Communication",
          implementation: "Training staff to speak the language of the nervous system and own their roles.",
          measure: "Team Efficiency Score"
        }
      ]
    },
    {
      quarter: "Q3 — GROWTH (EXPANSION)",
      months: [
        {
          name: "Month 7: Marketing Clarity",
          focus: "Messaging + Positioning",
          implementation: "Defining your unique clinic identity in the local marketplace to attract 'ideal' patients.",
          measure: "New Patient Lead Quality"
        },
        {
          name: "Month 8: Conversion Optimization",
          focus: "Objection Handling",
          implementation: "Removing friction in the financial and clinical conversion process.",
          measure: "Care Plan Paid-in-Full Rate"
        },
        {
          name: "Month 9: Scaling Systems",
          focus: "Capacity + Efficiency",
          implementation: "Optimizing the physical and digital flow of the clinic to handle 20-50% more volume.",
          measure: "Collections per Hour"
        }
      ]
    },
    {
      quarter: "Q4 — ADVANCED (LEADERSHIP)",
      months: [
        {
          name: "Month 10: Culture + Leadership",
          focus: "Clinic Identity",
          implementation: "Transitioning from 'The Doctor' to 'The Leader' of a health movement.",
          measure: "Referral Rate (Internal)"
        },
        {
          name: "Month 11: Financial Clarity",
          focus: "KPIs + Decision Making",
          implementation: "Using hard data to make expansion, hiring, and investment decisions.",
          measure: "Profit Margin Stability"
        },
        {
          name: "Month 12: Business Architecture",
          focus: "Vision + Long-term Planning",
          implementation: "Designing the next 3-5 years of your practice and life legacy.",
          measure: "Net Worth / Business Value"
        }
      ]
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "2x Monthly Live Calls",
      description: "Structured implementation reviews and deep-dive strategy sessions to keep you on track."
    },
    {
      icon: Target,
      title: "Hot Seat Access",
      description: "Real-time problem solving for your specific clinical or business bottlenecks."
    },
    {
      icon: BarChart3,
      title: "Implementation Tracking",
      description: "Visual scorecards to measure exactly what systems are installed and what's missing."
    },
    {
      icon: MessageSquare,
      title: "Private Community",
      description: "An elite environment of high-performers who are actually doing the work."
    },
    {
      icon: Search,
      title: "Office/System Audits",
      description: "We look under the hood of your practice to identify friction points you've missed."
    },
    {
      icon: Zap,
      title: "Real-time Feedback",
      description: "Get answers when you need them, not months later at a seminar."
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen font-body text-brand-navy selection:bg-brand-orange selection:text-white">
      <MastermindHeader />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-brand-navy text-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/20 blur-[120px] rounded-full -mr-64 -mt-64 opacity-50" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full -ml-32 -mb-32 opacity-30" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-white/60">The Implementation Environment</span>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-brand-orange/20 border border-brand-orange/30 rounded-full">
                <span className="text-xs font-bold text-brand-orange">For Mastermind graduates &amp; practicing chiropractors</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black leading-[0.95] mb-8 tracking-tighter">
              Where Chiropractors <br />Stop Guessing... <br />
              <span className="text-brand-orange">And Start Executing.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-medium mb-12 leading-relaxed max-w-2xl">
              The Mastermind gave you the knowledge. The Council gives you the <span className="text-white font-bold italic underline decoration-brand-orange">results</span>. This is the elite ongoing coaching environment for high-performance chiropractors.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/council/application">
                <BrandButton variant="accent" size="lg" className="group">
                  Join the Council <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </Link>
              <div className="flex items-center gap-3 px-8 py-3 border border-white/20 rounded-xl backdrop-blur-sm bg-white/5">
                <Users className="w-5 h-5 text-brand-orange" />
                <span className="text-xs font-black uppercase tracking-widest text-white/80">Limited Founding Member Spots</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-black uppercase tracking-widest">The Drift Problem</div>
              <h2 className="text-4xl md:text-6xl font-heading font-black leading-tight tracking-tighter text-brand-navy">
                The "Post-Mastermind" <br />
                <span className="text-brand-orange">Slump is Real.</span>
              </h2>
              <div className="space-y-6">
                {[
                  "You know what to do, but you don't do it consistently.",
                  "You lose momentum the moment you step back into your clinic.",
                  "Old habits and friction points keep dragging you down.",
                  "You feel isolated in your growth, with no one to call you out."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-1">
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <p className="text-xl font-medium text-brand-gray group-hover:text-brand-navy transition-colors">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <EliteCard className="p-12 bg-brand-cream/30 border-brand-navy/5">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-orange rounded-full flex items-center justify-center text-white rotate-12 shadow-xl border-4 border-white">
                <span className="font-black text-xs uppercase tracking-tighter text-center leading-tight">Break The<br />Cycle</span>
              </div>
              <h3 className="text-2xl font-black mb-6 text-brand-navy">Most Doctors Fail at Implementation.</h3>
              <p className="text-brand-gray leading-relaxed mb-8 font-medium">
                Information without implementation is just entertainment. The Council was built to bridge the gap between "knowing" and "doing." We don't give you more notes; we give you a predictable rhythm of growth.
              </p>
              <div className="p-6 bg-white rounded-2xl border border-brand-navy/5 elite-shadow">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center text-white">
                     <Timer className="w-5 h-5" />
                   </div>
                   <span className="font-bold text-brand-navy uppercase tracking-widest text-xs">Consistency {">"} Intensity</span>
                </div>
                <p className="text-sm text-brand-gray font-medium">Seminars are intense. The Council is consistent. Guess which one builds a multi-million dollar practice?</p>
              </div>
            </EliteCard>
          </div>
        </div>
      </section>

      {/* 3. WHAT THIS IS SECTION */}
      <section className="py-32 px-6 bg-brand-cream">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <span className="text-brand-orange font-black uppercase tracking-widest text-xs mb-4 block">A Different Class of Support</span>
          <h2 className="text-5xl md:text-7xl font-heading font-black mb-8 leading-none tracking-tighter text-brand-navy">
            This is NOT a Membership. <br />
            It's an <span className="text-brand-orange">Operating System.</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto font-medium leading-relaxed">
            Forget passive content libraries. The Council is a structured coaching environment designed to install high-performance clinical and business patterns into your life.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {features.map((feature, i) => (
             <EliteCard key={i} className="bg-white p-10 group" delay={i * 0.1}>
                <div className="w-14 h-14 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-navy mb-8 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-black mb-4 text-brand-navy">{feature.title}</h4>
                <p className="text-brand-gray leading-relaxed font-medium">{feature.description}</p>
             </EliteCard>
           ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="py-32 px-6 bg-brand-navy text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-orange/5 opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-brand-orange/10 border border-brand-orange/30 rounded-xl">
                <span className="text-brand-orange text-xs font-black uppercase tracking-widest">The Coaching Rhythm</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-heading font-black leading-[0.9] tracking-tighter">
                Predictable <br />
                <span className="text-brand-orange">Execution.</span>
              </h2>
              <div className="space-y-12 pt-8">
                <div className="flex gap-8 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl font-black text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">A</div>
                  <div>
                    <h4 className="text-2xl font-black mb-3">Implementation Review</h4>
                    <p className="text-white/40 font-medium leading-relaxed">We audit the last 2 weeks. What got installed? What broke? Real case feedback and application wins. No fluff, just mechanics.</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl font-black text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">B</div>
                  <div>
                    <h4 className="text-2xl font-black mb-3">Deep Coaching + Hot Seats</h4>
                    <p className="text-white/40 font-medium leading-relaxed">Pure problem solving. Strategy shifts. Mindset audits. We remove the specific friction blocking your next level in real-time.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
               {[
                 {
                   title: "The Implementation Score",
                   desc: "A proprietary assessment that tells you exactly where your practice is leaking revenue and impact.",
                   icon: Activity
                 },
                 {
                   title: "Stuck Point Submission",
                   desc: "The 'bat-signal' for your business. Submit your biggest hurdle and get a framework to solve it within 48 hours.",
                   icon: Award
                 },
                 {
                   title: "Clinic Pulse Check",
                   desc: "A monthly deep-dive into your KPIs to ensure your nervous system and your business are both regulated.",
                   icon: BarChart3
                 }
               ].map((adv, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
                 >
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <h5 className="text-xl font-black text-brand-orange">{adv.title}</h5>
                      <adv.icon className="w-5 h-5 text-white/20 group-hover:text-brand-orange transition-colors" />
                    </div>
                    <p className="text-sm text-white/40 font-medium leading-relaxed relative z-10">{adv.desc}</p>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-orange/5 blur-3xl -mr-16 -mb-16" />
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. 12-MONTH ROADMAP SECTION */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-brand-orange font-black uppercase tracking-widest text-xs mb-4 block">The Full Year Vision</span>
            <h2 className="text-5xl md:text-7xl font-heading font-black mb-8 leading-none tracking-tighter text-brand-navy">
              A Year of <span className="text-brand-orange">Transformed Authority.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mt-12">
               {roadmap.map((q, i) => (
                 <button 
                  key={i}
                  onClick={() => setActiveQuarter(i)}
                  className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 ${activeQuarter === i ? 'bg-brand-navy text-white shadow-xl' : 'bg-brand-cream text-brand-navy/40 hover:bg-brand-navy/5'}`}
                 >
                   {q.quarter.split(' — ')[0]}
                 </button>
               ))}
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeQuarter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {roadmap[activeQuarter].months.map((month, i) => (
                  <EliteCard key={i} className="bg-brand-cream/30 border-brand-navy/5 p-10 flex flex-col h-full group overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                       <span className="text-9xl font-black italic">{i + 1 + (activeQuarter * 3)}</span>
                    </div>
                    <div className="relative z-10 flex-grow">
                      <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-3 h-3 text-brand-orange" />
                        <span className="text-brand-orange font-black uppercase tracking-widest text-xs">{month.focus}</span>
                      </div>
                      <h4 className="text-2xl font-black mb-8 text-brand-navy leading-tight">{month.name}</h4>
                      <div className="space-y-8">
                        <div>
                          <p className="text-xs font-black uppercase tracking-wider text-brand-navy/30 mb-3">Implementation Focus</p>
                          <p className="text-sm text-brand-gray font-medium leading-relaxed">{month.implementation}</p>
                        </div>
                        <div className="pt-6 border-t border-brand-navy/5">
                          <p className="text-xs font-black uppercase tracking-wider text-brand-navy/30 mb-3">Critical Metric</p>
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-orange/10 rounded-lg">
                            <TrendingUp className="w-3 h-3 text-brand-orange" />
                            <span className="text-xs font-black text-brand-orange uppercase tracking-widest">{month.measure}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </EliteCard>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 6. WHO THIS IS FOR / NOT FOR */}
      <section className="py-32 px-6 bg-brand-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="bg-white p-16 rounded-2xl elite-shadow border border-brand-navy/5">
              <h3 className="text-3xl font-black mb-10 flex items-center gap-4 text-brand-navy tracking-tighter">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                This is FOR you if...
              </h3>
              <ul className="space-y-8">
                {[
                  "You've attended the Mastermind and want to ensure the systems actually stick.",
                  "You're tired of 'seminar highs' that fade after three days.",
                  "You value precision clinical work but struggle with the business systems to support it.",
                  "You want an elite circle of peers who won't let you play small."
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-start text-lg font-medium text-brand-gray group">
                    <Plus className="w-5 h-5 text-brand-orange mt-1 flex-shrink-0 group-hover:scale-125 transition-transform" /> 
                    <span className="group-hover:text-brand-navy transition-colors">{text}</span>
                  </li>
                ))}
              </ul>
           </div>
           <div className="bg-brand-navy p-16 rounded-2xl text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full" />
              <h3 className="text-3xl font-black mb-10 flex items-center gap-4 tracking-tighter relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                This is NOT for you if...
              </h3>
              <ul className="space-y-8 relative z-10">
                {[
                  "You're looking for a 'quick fix' or a magic bullet for your practice.",
                  "You aren't willing to track your data and look at the truth of your clinic.",
                  "You want a passive library to watch while you do nothing.",
                  "You have a 'good enough' mindset and aren't interested in elite performance."
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-start text-lg font-medium text-white/40 group">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" /> 
                    <span className="group-hover:text-white/60 transition-colors">{text}</span>
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section id="pricing" className="py-40 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-brand-orange font-black uppercase tracking-widest text-xs mb-6 block">Investment in Authority</span>
          <h2 className="text-6xl md:text-8xl font-heading font-black mb-12 tracking-tighter text-brand-navy">
            The Council <br />
            <span className="text-brand-orange">Experience.</span>
          </h2>
          
          <div className="bg-brand-navy p-16 md:p-24 rounded-2xl text-white shadow-[0_40px_100px_-20px_rgba(21,32,43,0.5)] relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full -ml-32 -mb-32" />
            
            <div className="relative z-10">
              <div className="flex flex-col items-center mb-16">
                <span className="text-white/30 font-black uppercase tracking-widest text-xs mb-6">Founder Tier Recurring Subscription</span>
                <div className="flex items-start gap-1">
                  <span className="text-4xl font-black mt-4 text-brand-orange tracking-tighter">$</span>
                  <span className="text-[10rem] md:text-[12rem] font-black leading-none tracking-[ -0.05em]">297</span>
                  <span className="text-2xl font-bold text-white/30 self-end mb-6 ml-2">/mo</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left mb-20 max-w-2xl mx-auto">
                 {[
                   "2x Monthly Live Coaching Calls",
                   "Full 12-Month Implementation Roadmap",
                   "Hot Seat & Clinical Case Reviews",
                   "Implementation Scorecard Access",
                   "Elite Peer Community Environment",
                   "No Long-term Contracts (Cancel Anytime)"
                 ].map((feature, i) => (
                   <div key={i} className="flex gap-4 items-center group">
                     <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 group-hover:bg-brand-orange transition-colors duration-500">
                       <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange group-hover:text-white transition-colors duration-500" />
                     </div>
                     <span className="font-bold text-white/70 group-hover:text-white transition-colors uppercase tracking-widest text-xs">{feature}</span>
                   </div>
                 ))}
              </div>

              <div className="space-y-10">
                <Link href="/council/application">
                  <BrandButton variant="accent" size="lg" className="w-full text-xl py-8 rounded-2xl group">
                    Join the Council <Lock className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                </Link>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-white/40 font-bold italic text-lg">
                    "This is less than the value of one new patient care plan... per year."
                  </p>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-orange" />
                    <span className="text-xs font-black uppercase tracking-widest text-white/20">Secure Enrollment Portal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center gap-6">
             <div className="flex -space-x-4">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-brand-cream overflow-hidden shadow-xl">
                   <img src={`https://i.pravatar.cc/150?u=${i + 40}`} alt="doctor" className="w-full h-full object-cover" />
                 </div>
               ))}
             </div>
             <p className="text-brand-gray font-black uppercase tracking-wider text-xs">Join 120+ chiropractors implementing at an elite level.</p>
          </div>
        </div>
      </section>

      {/* 8. RESULTS / SOCIAL PROOF */}
      <section className="py-32 px-6 bg-brand-cream border-t border-brand-navy/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
           <div className="space-y-4">
             <h4 className="text-6xl font-black text-brand-navy tracking-tighter leading-none">42%</h4>
             <p className="text-brand-orange font-black uppercase tracking-widest text-xs">Avg Revenue Growth in Year 1</p>
           </div>
           <div className="space-y-4">
             <h4 className="text-6xl font-black text-brand-navy tracking-tighter leading-none">18+</h4>
             <p className="text-brand-orange font-black uppercase tracking-widest text-xs">PVA Increase (Network Average)</p>
           </div>
           <div className="space-y-4">
             <h4 className="text-6xl font-black text-brand-navy tracking-tighter leading-none">100%</h4>
             <p className="text-brand-orange font-black uppercase tracking-widest text-xs">Certainty in Clinical Outcomes</p>
           </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-40 px-6 bg-brand-orange text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-black/5" />
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
           <div className="inline-block px-4 py-1 bg-white/10 border border-white/20 rounded-lg text-xs font-black uppercase tracking-widest mb-4">Final Enrollment Call</div>
           <h2 className="text-6xl md:text-8xl font-heading font-black leading-none tracking-tighter">
             Ready to Stop <br />Guessing?
           </h2>
           <p className="text-2xl font-medium text-white/80 max-w-2xl mx-auto leading-relaxed">
             Enrollment is open for the next cohort of Council members. Lock in your implementation rhythm and stop the drift.
           </p>
           <div className="pt-8">
             <Link href="/council/application">
               <button className="bg-brand-navy text-white px-16 py-8 rounded-2xl font-black uppercase tracking-wider text-xl shadow-2xl hover:bg-brand-black transition-all hover:scale-105 active:scale-95 group">
                 Join The Council <ArrowRight className="inline-block ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
               </button>
             </Link>
           </div>
        </div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 blur-3xl rounded-full" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-black/5 blur-3xl rounded-full" />
      </section>

      <SEOFooter />
    </div>
  );
};

export default CouncilPage;
