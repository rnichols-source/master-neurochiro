"use client";

import { motion } from "framer-motion";
import { EliteCard } from "@/components/ui/elite-ui";
import { ShieldCheck, Award, GraduationCap, Users, BookOpen } from "lucide-react";
import Image from "next/image";

export function FounderAuthorityCard() {
  const credentials = [
    { icon: ShieldCheck, label: "NeuroChiro Creator" },
    { icon: GraduationCap, label: "Chiropractor & Educator" },
    { icon: BookOpen, label: "Developer of the NeuroChiro OS" },
    { icon: Users, label: "Led 100+ Clinical Workshops" },
    { icon: Award, label: "Founder of the NeuroChiro Directory" },
  ];

  return (
    <div className="relative group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-brand-orange/10 blur-[80px] rounded-full scale-90 group-hover:scale-100 transition-transform duration-700" />
      
      <EliteCard className="p-0 overflow-hidden border-brand-navy/10 shadow-2xl rounded-2xl bg-white relative z-10">
        <div className="flex flex-col">
          {/* Photo Section */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-navy">
            <Image 
              src="/dr-raymond-hero.jpg" 
              alt="Dr. Raymond Nichols" 
              fill
              className="object-cover object-top filter brightness-110 contrast-[1.05]"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-40" />
            
            {/* Name Badge Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                <h3 className="text-white font-black text-xl tracking-tight">Dr. Raymond Nichols</h3>
                <p className="text-brand-orange text-xs font-black uppercase tracking-wider mt-1">Mastermind Facilitator</p>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="p-8 lg:p-10 space-y-8">
            <div className="space-y-4">
              <p className="text-brand-navy font-bold leading-relaxed text-sm lg:text-base italic">
                "I created the NeuroChiro framework after years of watching chiropractors struggle with clinical certainty, patient communication, and practice stability."
              </p>
              <p className="text-brand-gray text-sm font-medium leading-relaxed">
                The NeuroChiro Mastermind is the exact operating system Dr. Nichols uses to help doctors and students worldwide achieve high-authority results without burnout.
              </p>
            </div>

            {/* Credibility Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-navy/5 flex items-center justify-center text-brand-navy">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-brand-navy/70 uppercase tracking-wider leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EliteCard>

      {/* Floating Success Indicator */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8 bg-white p-4 md:p-6 rounded-3xl shadow-2xl border border-brand-navy/5 z-20 hidden sm:block"
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-brand-cream overflow-hidden">
                <div className="w-full h-full bg-brand-navy/10 flex items-center justify-center text-xs font-bold text-brand-navy">
                  NC
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-brand-navy">Trusted by Doctors</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs font-black text-brand-orange">Worldwide</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
