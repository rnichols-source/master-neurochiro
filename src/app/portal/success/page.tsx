"use client";

import { motion } from "framer-motion";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { MastermindHeader } from "@/components/layout/mastermind-header";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-8 overflow-hidden">
      <MastermindHeader />
      
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-orange/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-navy/5 blur-[120px] rounded-full animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full relative z-10"
      >
        <EliteCard className="p-16 border-brand-orange/20 shadow-2xl bg-white text-center">
          <div className="space-y-10">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-brand-orange/20 blur-2xl rounded-full scale-150 animate-pulse" />
              <div className="relative bg-brand-orange rounded-full p-6 shadow-xl shadow-brand-orange/40">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Enrollment Confirmed</p>
              <h1 className="text-6xl font-black text-brand-navy tracking-tighter leading-none">
                Identity <br />Reconstruction <span className="text-brand-orange">Active.</span>
              </h1>
              <p className="text-xl text-brand-gray font-medium leading-relaxed max-w-xl mx-auto">
                Welcome to Cohort II. Your payment was successful and your clinical 
                operating system has been provisioned.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
              {[
                { icon: ShieldCheck, title: "Vault Access", desc: "Curriculum unlocked." },
                { icon: Zap, title: "KPI Engine", desc: "Instance initialized." },
                { icon: Sparkles, title: "Pro Access", desc: "Priority priority enabled." },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-brand-navy/5 rounded-2xl border border-brand-navy/5">
                  <item.icon className="w-5 h-5 text-brand-orange mb-2" />
                  <p className="text-[10px] font-black text-brand-navy uppercase mb-1">{item.title}</p>
                  <p className="text-[8px] font-bold text-brand-navy/40 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-brand-navy/5 flex flex-col items-center gap-6">
              <div className="text-center">
                <p className="text-[10px] font-black text-brand-navy/40 uppercase tracking-widest mb-2">Check Your Email</p>
                <p className="text-xs font-bold text-brand-navy">We just sent your personal portal invitation and onboarding documents.</p>
              </div>
              <Link href="/portal" className="w-full sm:w-auto">
                <BrandButton variant="accent" size="lg" className="w-full sm:w-auto py-6 px-16 group">
                  Enter Member Portal <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </Link>
            </div>
          </div>
        </EliteCard>
      </motion.div>
    </div>
  );
}
