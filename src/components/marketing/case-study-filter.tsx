"use client";

import { motion } from "framer-motion";
import { EliteCard } from "@/components/ui/elite-ui";
import { Quote, TrendingUp, ShieldCheck, Zap } from "lucide-react";

const caseStudies = [
  {
    name: "Dr. Melissa",
    role: "Practicing Chiropractor",
    result: "Practice revenue doubled during the program.",
    quote: "NeuroChiro gave me the breakthrough I needed to communicate nervous-system function. Now my philosophy, language, and recommendations are aligned. It has completely changed how I communicate chiropractic to my patients. I feel increased clarity, stronger communication, and improved patient confidence.",
    tags: ["Revenue: 2x", "Philosophical Alignment"],
    icon: TrendingUp
  },
  {
    name: "Dr. Mike",
    role: "Practicing Chiropractor",
    result: "Insight: Command The Silence",
    quote: "I noticed that when recommending care, I often talked too much. Through the NeuroChiro framework, I realized that my uncertainty was the root. Now I've learned to speak with more certainty, say less, and allow space in the conversation. My recommendations feel stronger.",
    tags: ["Clinical Power", "Certainty"],
    icon: ShieldCheck
  }
];

export function CaseStudyFilter() {
  return (
    <div className="space-y-16">
      <div className="text-center space-y-4">
        <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Real Results</p>
        <h2 className="text-5xl font-black text-brand-navy tracking-tighter">Clinical Breakthroughs.</h2>
        <p className="text-brand-gray font-medium max-w-xl mx-auto">
          What happens when clinical certainty meets philosophical alignment? 
          Real transformation in how you practice and lead.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {caseStudies.map((study, i) => (
          <motion.div
            key={study.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <EliteCard className="h-full flex flex-col p-10 md:p-12 overflow-hidden border-brand-navy/5 bg-white relative group hover:border-brand-orange/40 transition-all shadow-2xl shadow-brand-navy/5">
              <Quote className="absolute top-10 right-10 w-20 h-20 text-brand-orange/5 group-hover:text-brand-orange/10 transition-colors" />
              
              <div className="space-y-8 relative z-10 flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <study.icon className="w-6 h-6" />
                  </div>
                  <div className="h-px flex-1 bg-brand-navy/5" />
                </div>

                <div className="space-y-6">
                  <p className="text-xl md:text-2xl font-bold text-brand-navy leading-relaxed italic">
                    "{study.quote}"
                  </p>
                  
                  <div className="space-y-1">
                    <p className="text-brand-navy font-black uppercase tracking-widest text-sm">— {study.name}</p>
                    <p className="text-brand-gray/60 text-[10px] font-bold uppercase tracking-widest">{study.role}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-brand-navy/5 space-y-4">
                   <div className="inline-flex px-4 py-2 rounded-full bg-brand-navy/5 border border-brand-navy/5 text-brand-orange font-black text-[10px] uppercase tracking-widest">
                     {study.result}
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {study.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-brand-cream rounded-lg text-[8px] font-black uppercase text-brand-navy tracking-widest">
                         {tag}
                       </span>
                     ))}
                   </div>
                </div>
              </div>
            </EliteCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
