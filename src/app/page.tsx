"use client";

import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import { 
  ArrowRight, 
  Brain, 
  Zap, 
  Target, 
  ShieldCheck,
  Play
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-cream overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-navy/5">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center font-black text-white text-xl shadow-lg shadow-brand-navy/20">N</div>
            <span className="font-lato font-black uppercase tracking-widest text-brand-navy">NeuroChiro</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            {["Curriculum", "Pricing", "Case Studies"].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-orange transition-colors">
                {item}
              </Link>
            ))}
            <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60 hover:text-brand-navy border-l border-brand-navy/10 pl-10">
              Member Login
            </Link>
            <Link href="/apply">
              <BrandButton variant="accent" size="sm">Apply Now</BrandButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]"
          >
            The New Standard in Chiropractic Excellence
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-8xl font-black text-brand-navy leading-[0.85] tracking-tighter"
          >
            Nervous System <br />
            First Mastery.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-brand-gray font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Join an elite cohort of doctors reconstructing their identity, 
            mastering clinical certainty, and building practices that lead the profession.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6"
          >
            <Link href="/apply">
              <BrandButton variant="primary" size="lg" className="group">
                Apply for Admission <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
            <button className="flex items-center gap-4 text-brand-navy/60 hover:text-brand-navy transition-colors font-bold uppercase tracking-widest text-xs">
              <div className="w-12 h-12 rounded-full border border-brand-navy/10 flex items-center justify-center bg-white shadow-sm">
                <Play className="w-4 h-4 fill-brand-navy ml-1" />
              </div>
              Watch the Vision
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-8 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Brain, title: "Clinical Depth", desc: "No more guessing. Real neurology applied to every adjustment." },
              { icon: Target, title: "Identity Shift", desc: "From technician to authority. Change how the world sees you." },
              { icon: ShieldCheck, title: "Elite Systems", desc: "Predictable practice growth without the burnout or high-pressure sales." }
            ].map((feature, i) => (
              <div key={i} className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-black">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto border-t border-brand-navy/5 pt-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-2">
            <h4 className="text-3xl font-black text-brand-navy tracking-tight">Built for the top 1%.</h4>
            <p className="text-brand-gray font-medium">Limited to 15 doctors per cohort for absolute focus.</p>
          </div>
          <Link href="/apply">
            <BrandButton variant="outline">View Enrollment Details</BrandButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
