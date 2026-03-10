"use client";

import { motion } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { ShieldCheck, User, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function TwoPathsTransition() {
  return (
    <div className="space-y-10 py-10">
      <div className="text-center space-y-4">
        <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Road Ahead</p>
        <h2 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">Installation Complete. <br />What's Next?</h2>
        <p className="text-brand-gray text-lg font-medium max-w-2xl mx-auto">
          You have successfully installed the NeuroChiro Architecture. But knowing the system and holding the system are two different things.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Option 1: Solo Operator */}
        <EliteCard className="p-8 border-brand-navy/5 bg-white flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center">
              <User size={24} className="text-brand-navy/40" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-brand-navy tracking-tight">Path 1: The Solo Operator</h3>
              <p className="text-brand-gray text-sm mt-2 leading-relaxed font-medium">
                Attempt to implement and maintain these systems alone. Fight the friction, the staff pushback, and the inevitable clinical drift by yourself.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Manual troubleshooting",
                "Self-managed accountability",
                "Solo clinical reasoning",
                "High risk of clinical drift"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold text-brand-navy/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-navy/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-10">
            <Link href="/portal">
              <BrandButton variant="ghost" className="w-full text-[10px]">Finish My Journey</BrandButton>
            </Link>
          </div>
        </EliteCard>

        {/* Option 2: The Council */}
        <EliteCard className="p-8 border-brand-orange/20 bg-brand-navy text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <ShieldCheck size={120} className="text-brand-orange" />
          </div>
          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-brand-orange/20 rounded-full text-brand-orange border border-brand-orange/30 mb-2">
                <p className="text-[8px] font-black uppercase tracking-widest">Recommended Path</p>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">Path 2: The Council</h3>
              <p className="text-white/60 text-sm mt-2 leading-relaxed font-medium">
                Step into the inner circle. Join weekly implementation calls, bring your tough cases to the lab, and protect your clinic from drift with elite support.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Weekly Coaching & Hot Seats",
                "Live Case Lab Review",
                "Monthly Clinic Health Diagnostics",
                "Global Referral Network access",
                "New Vault assets & scripts"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold text-white/80">
                  <CheckCircle2 size={14} className="text-brand-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-10 relative z-10">
            <Link href="/portal/council">
              <BrandButton variant="primary" className="w-full text-[10px] group shadow-xl shadow-brand-orange/20">
                Join The Council <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
            <p className="text-center text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mt-4">
              Ongoing Monthly OS &bull; $197/mo
            </p>
          </div>
        </EliteCard>
      </div>
    </div>
  );
}
