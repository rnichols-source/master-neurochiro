"use client";

import { motion } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { ShieldCheck, User, ArrowRight, CheckCircle2, Zap, Star } from "lucide-react";
import Link from "next/link";

export function TwoPathsTransition() {
  return (
    <div className="space-y-10 py-10">
      <div className="text-center space-y-4">
        <p className="text-brand-orange font-black uppercase tracking-widest text-xs">The Road Ahead</p>
        <h2 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">Installation Complete. <br />What's Next?</h2>
        <p className="text-brand-gray text-lg font-medium max-w-2xl mx-auto">
          You have successfully installed the NeuroChiro Architecture. But knowing the system and holding the system are two different things.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Option 1: Solo Operator */}
        <EliteCard className="p-8 border-brand-navy/5 bg-white flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center">
              <User size={24} className="text-brand-navy/40" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-brand-navy tracking-tight uppercase leading-none">The Solo <br />Operator</h3>
              <p className="text-brand-gray text-xs mt-2 leading-relaxed font-medium">
                Attempt to implement and maintain these systems alone. Fight the friction and the inevitable clinical drift by yourself.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Manual troubleshooting",
                "Self-managed accountability",
                "High risk of clinical drift"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold text-brand-navy/40 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-navy/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-10">
            <Link href="/portal">
              <BrandButton variant="ghost" className="w-full text-xs">Finish My Journey</BrandButton>
            </Link>
          </div>
        </EliteCard>

        {/* Option 2: The Council */}
        <EliteCard className="p-8 border-brand-navy/10 bg-brand-cream/50 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center">
              <ShieldCheck size={24} className="text-brand-orange" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-brand-navy/10 rounded-full text-brand-navy border border-brand-navy/10 mb-2">
                <p className="text-xs font-black uppercase tracking-widest">Community Implementation</p>
              </div>
              <h3 className="text-2xl font-black text-brand-navy tracking-tight uppercase leading-none">The <br />Council</h3>
              <p className="text-brand-gray text-xs mt-2 leading-relaxed font-medium">
                Step into the inner circle. Join weekly implementation calls, bring your cases to the lab, and protect your clinic from drift.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Weekly Coaching Calls",
                "Live Case Lab Review",
                "Monthly Diagnostics"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold text-brand-navy uppercase tracking-widest">
                  <CheckCircle2 size={14} className="text-brand-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-10 relative z-10">
            <Link href="/council/application">
              <BrandButton variant="primary" className="w-full text-xs group">
                Apply for The Council <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
            <p className="text-center text-xs font-black uppercase tracking-wider text-brand-navy/30 mt-4">
              Ongoing Monthly OS &bull; $297/mo
            </p>
          </div>
        </EliteCard>

        {/* Option 3: The Architecture Room */}
        <EliteCard className="p-8 border-brand-orange/20 bg-brand-navy text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Zap size={120} className="text-brand-orange" />
          </div>
          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center">
              <Zap size={24} className="text-white fill-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-brand-orange/20 rounded-full text-brand-orange border border-brand-orange/30 mb-2">
                <p className="text-xs font-black uppercase tracking-widest">Executive Mentorship</p>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight uppercase leading-none">The <br />Architecture Room</h3>
              <p className="text-white/60 text-xs mt-2 leading-relaxed font-medium">
                The ultimate 1-on-1 partnership with Dr. Nichols. Direct Practice Architecture for doctors scaling to the top 1% of the profession.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "1-on-1 Private Coaching",
                "Clinic Diagnostic Audits",
                "ROF Communication Film Review",
                "Executive Legacy Vision"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold text-white uppercase tracking-widest">
                  <Star size={14} className="text-brand-orange fill-brand-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-10 relative z-10">
            <Link href="/mentorship">
              <BrandButton variant="accent" className="w-full text-xs group shadow-xl shadow-brand-orange/20">
                Apply for Mentorship <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
            <p className="text-center text-xs font-black uppercase tracking-wider text-white/30 mt-4">
              Private 1-on-1 &bull; 8 Client Max
            </p>
          </div>
        </EliteCard>
      </div>
    </div>
  );
}
