"use client";

import { motion } from "framer-motion";

const days = [
  {
    day: "Day 1",
    title: "Foundations of the Nervous System Doctor",
    topics: [
      "Identity Reconstruction: The Certainty Framework",
      "Applied Neurology: From Theory to High-Value Results",
      "Communication Mastery: The No-Pressure ROF",
      "Modern Philosophy: The Science of Vitalism"
    ]
  },
  {
    day: "Day 2",
    title: "Advanced Implementation & Practice Logic",
    topics: [
      "Business Intelligence: Revenue & Retention Systems",
      "Care Plan Mastery: Day 1 & Day 2 Calibration",
      "EQ & Psychosomatics: Understanding the Human Element",
      "Strategic Career Positioning: Scaling the NeuroChiro Brand"
    ]
  }
];

export function LiveSchedule() {
  return (
    <section className="section-padding bg-white px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-4">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Schedule</p>
          <h2 className="text-7xl font-black text-brand-navy tracking-tighter leading-[0.9]">2 Days of <br /><span className="text-brand-navy/30">Transformation.</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {days.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="flex items-center gap-6">
                <div className="text-8xl font-black text-brand-navy/10 tracking-tighter leading-none">{item.day}</div>
                <div className="h-px flex-1 bg-brand-navy/5" />
              </div>
              <h3 className="text-4xl font-black text-brand-navy tracking-tight leading-none uppercase">{item.title}</h3>
              <div className="space-y-6">
                {item.topics.map((topic, j) => (
                  <div key={j} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-brand-navy/10 flex items-center justify-center font-bold text-xs text-brand-navy group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-all">
                      {j + 1}
                    </div>
                    <p className="text-lg font-bold text-brand-navy/60 group-hover:text-brand-navy transition-colors pt-2">{topic}</p>
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
