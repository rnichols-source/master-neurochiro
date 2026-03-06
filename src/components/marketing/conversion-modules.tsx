"use client";

import { motion } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { Check, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

const stackItems = [
  { label: "8 Weeks of Step-by-Step Training (The NeuroChiro OS)", value: "$5,000" },
  { label: "Every Script You Need for the Office (Authority Scripts)", value: "$2,500" },
  { label: "Weekly Video Reviews of Your Results (Pro Only)", value: "$3,000" },
  { label: "Our Custom KPI Tracker & Dashboard License", value: "$1,500" },
  { label: "Private Community & Mastermind Group Access", value: "$2,000" },
];

export function ValueStack() {
  const totalValue = 14000;

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">What You Get</p>
        <h2 className="text-5xl font-black text-brand-navy tracking-tighter">Everything You Need to Scale.</h2>
      </div>

      <EliteCard className="max-w-4xl mx-auto p-0 overflow-hidden border-brand-navy/10">
        <div className="bg-brand-navy p-12 text-white">
          <div className="space-y-6">
            {stackItems.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-brand-orange" />
                  </div>
                  <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
                <span className="text-xs font-black text-brand-orange/60">{item.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Total Value</p>
              <h3 className="text-5xl font-black text-white leading-none">${totalValue.toLocaleString()}</h3>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-4">Enrollment Cost</p>
              <div className="flex items-baseline justify-center md:justify-end gap-3">
                <span className="text-white/30 line-through text-lg font-bold">${totalValue.toLocaleString()}</span>
                <span className="text-4xl font-black text-white leading-none">$997</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-12 bg-brand-cream/30 flex flex-col items-center gap-8">
          <p className="text-sm font-medium text-brand-gray text-center max-w-xl">
            You aren't just buying another course. You are getting the exact 
            blueprint we use to build high-performance clinics.
          </p>
          <Link href="/apply" className="w-full sm:w-auto">
            <BrandButton variant="accent" size="lg" className="w-full sm:w-auto py-6 px-16 group">
              Apply for Admission <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </Link>
        </div>
      </EliteCard>
    </div>
  );
}

export function CohortStatus() {
  return (
    <div className="bg-white/50 backdrop-blur-md border border-brand-navy/5 rounded-2xl py-3 px-6 flex items-center gap-8">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-brand-navy/40">Next Cohort</p>
          <p className="text-[10px] font-black text-brand-navy uppercase">April 21, 2026</p>
        </div>
      </div>
      <div className="w-px h-6 bg-brand-navy/10" />
      <div className="flex items-center gap-3">
        <p className="text-xs font-black text-brand-orange">25 Seats Available</p>
      </div>
    </div>
  );
}
