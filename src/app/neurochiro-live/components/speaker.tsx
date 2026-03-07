"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function LiveSpeaker() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
             <div className="aspect-[4/5] bg-brand-navy rounded-[4rem] overflow-hidden relative group">
                <div className="absolute inset-0 bg-brand-orange/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                {/* Placeholder for Dr. Raymond Nichols Image */}
                <div className="absolute inset-0 flex items-center justify-center text-white/10 font-black text-4xl uppercase tracking-[1em] rotate-90">
                  Dr. Raymond Nichols
                </div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-orange rounded-[3rem] -z-10" />
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Speaker</p>
              <h2 className="text-7xl font-black text-brand-navy tracking-tighter leading-none">Dr. Raymond <br />Nichols.</h2>
            </div>

            <div className="space-y-6 text-xl text-brand-navy/60 leading-relaxed font-medium">
              <p>
                Dr. Raymond Nichols is the founder of NeuroChiro and a leading voice in Nervous-System-First Chiropractic.
              </p>
              <p>
                His mission is simple: To reconstruct the chiropractic profession by installing clinical certainty, objective communication, and sustainable business logic into the hands of dedicated doctors.
              </p>
              <p>
                This live event is the culmination of years of practice evolution, designed to bridge the gap between where you are and where the profession needs you to be.
              </p>
            </div>

            <div className="pt-8 border-t border-brand-navy/5">
               <Quote className="w-12 h-12 text-brand-orange mb-4 opacity-20" />
               <p className="text-2xl font-black text-brand-navy tracking-tight leading-tight">
                 "Clinical certainty is not a luxury. It is the foundation of every high-value practice."
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
