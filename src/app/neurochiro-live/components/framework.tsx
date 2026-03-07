"use client";

import { motion } from "framer-motion";

const pillars = [
  { id: 1, title: "Identity", desc: "Redefining the Nervous System Doctor." },
  { id: 2, title: "Neurology", desc: "Clinical application for real practices." },
  { id: 3, title: "Communication", desc: "Certainty in every patient interaction." },
  { id: 4, title: "Philosophy", desc: "The science of vitalism in 2026." },
  { id: 5, title: "Business", desc: "The economics of high-value care." },
  { id: 6, title: "Mastery", desc: "Perfecting Day 1 and Day 2." },
  { id: 7, title: "Psychosomatics", desc: "Emotional intelligence in practice." },
  { id: 8, title: "Strategy", desc: "Your long-term career positioning." },
];

export function LiveFramework() {
  return (
    <section className="section-padding bg-brand-navy relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[140px]" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Curriculum</p>
            <h2 className="text-7xl font-black text-white tracking-tighter leading-[0.9]">
              The 8 Pillars. <br />
              <span className="text-white/30 text-gradient">Condensed Intensity.</span>
            </h2>
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              NeuroChiro Live is the physical manifestation of our 8-week mastermind framework. We take the entire ecosystem and deliver it across two high-intensity days of implementation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-brand-orange/20 transition-all cursor-default"
              >
                <div className="text-[10px] font-black text-brand-orange mb-2">0{pillar.id}</div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">{pillar.title}</h4>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter leading-tight group-hover:text-white/60 transition-colors">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
