"use client";

import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import { 
  ArrowRight, 
  Target, 
  Brain, 
  Users, 
  Zap,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function ApplicationPage() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white">
      {/* High-End Header */}
      <header className="p-8 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center font-black text-white text-xl">N</div>
          <span className="font-lato font-black uppercase tracking-widest text-brand-navy">NeuroChiro</span>
        </Link>
        <Link href="/login" className="text-xs font-black uppercase tracking-widest text-brand-navy/60 hover:text-brand-navy transition-colors">
          Member Login
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Persuasion / Copy */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-xs">
                By Invitation Only
              </p>
              <h1 className="text-7xl font-black text-brand-navy leading-[0.9] tracking-tighter">
                The Standard <br />
                Has Shifted.
              </h1>
              <p className="text-xl text-brand-gray font-medium leading-relaxed max-w-lg">
                We are not looking for more students. We are selecting 
                doctors ready to lead the nervous-system-first revolution.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { icon: Brain, title: "Identity Shift", desc: "Move from a 'back cracker' to a primary nervous system authority." },
                { icon: Zap, title: "Clinical Certainty", desc: "Translate complex neurology into simple, high-value recommendations." },
                { icon: Target, title: "Practice Architecture", desc: "Systems that scale without sacrificing your soul or your time." },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white border border-brand-navy/5 elite-shadow flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-black text-brand-navy uppercase tracking-widest text-sm mb-1">{item.title}</h3>
                    <p className="text-sm text-brand-gray font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: The Application Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2rem] p-12 elite-shadow border border-brand-navy/5 relative overflow-hidden"
          >
            {/* Visual Flair */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="relative space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-brand-navy tracking-tight">Apply for Admission</h2>
                <p className="text-sm text-brand-gray font-medium">Estimated time: 4 minutes</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">Full Name</label>
                  <input type="text" className="w-full bg-brand-cream border-none rounded-2xl py-5 px-6 text-sm focus:ring-2 focus:ring-brand-orange/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">Practice Location</label>
                  <input type="text" className="w-full bg-brand-cream border-none rounded-2xl py-5 px-6 text-sm focus:ring-2 focus:ring-brand-orange/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">Primary Practice Goal</label>
                  <select className="w-full bg-brand-cream border-none rounded-2xl py-5 px-6 text-sm focus:ring-2 focus:ring-brand-orange/20 transition-all appearance-none">
                    <option>Scale Collections</option>
                    <option>Clinical Certainty</option>
                    <option>Communication Mastery</option>
                    <option>Systems & Freedom</option>
                  </select>
                </div>
                
                <BrandButton variant="accent" className="w-full py-6 text-lg group">
                  Submit Application <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </BrandButton>

                <p className="text-[10px] text-center font-bold text-brand-navy/30 uppercase tracking-[0.2em]">
                  Privacy Protected. HIPAA Compliant Logic.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Trust Bar */}
      <section className="bg-brand-navy py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px]">
            Trusted by the Top 1% of Nervous-System Doctors
          </p>
          <div className="flex gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            {/* Logos would go here */}
            <div className="font-black text-white/40 text-xl tracking-tighter">NEURO-X</div>
            <div className="font-black text-white/40 text-xl tracking-tighter">CHIRO-SYSTEMS</div>
            <div className="font-black text-white/40 text-xl tracking-tighter">VITALITY-PRO</div>
          </div>
        </div>
      </section>
    </div>
  );
}
