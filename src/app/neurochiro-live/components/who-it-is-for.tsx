"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, UserCheck } from "lucide-react";

const audiences = [
  {
    title: "Students",
    icon: GraduationCap,
    benefit: "Bridge the gap between academic theory and clinical reality. Gain the certainty school doesn't provide.",
    focus: ["Clinical Certainty", "Patient Communication", "Future Positioning"]
  },
  {
    title: "New Graduates",
    icon: UserCheck,
    benefit: "Accelerate your first 2 years. Skip the trial-and-error and install the systems that build high-value practices.",
    focus: ["Day 1/Day 2 Mastery", "Care Plan Acceptance", "Business Foundations"]
  },
  {
    title: "Practicing Doctors",
    icon: Users,
    benefit: "Refine your clinical neurology and upgrade your practice OS. Move from 'technician' to 'Architect'.",
    focus: ["Advanced Neurology", "Emotional Intelligence", "Strategic Scalability"]
  }
];

export function WhoItIsFor() {
  return (
    <section className="section-padding bg-white/5 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-20 space-y-4">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Audience</p>
          <h2 className="text-display text-white">Who This <br /><span className="text-white/20">Is Designed For.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-10 rounded-[3rem] group hover:border-brand-orange/30 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-8 group-hover:bg-brand-orange/10 transition-colors">
                <item.icon className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                {item.benefit}
              </p>
              <div className="space-y-3">
                {item.focus.map((point, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
