"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EliteCard } from "@/components/ui/elite-ui";
import { TrendingUp, Users, Target, ArrowUpRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Proof" },
  { id: "new-grad", label: "New Grads" },
  { id: "associate", label: "Associates" },
  { id: "owner", label: "Clinic Owners" },
  { id: "high-volume", label: "High Volume" },
  { id: "struggling-conversion", label: "Low Conversion Fix" },
];

const caseStudies = [
  {
    name: "Dr. Marcus Thorne",
    role: "Clinic Owner",
    category: "owner",
    metrics: { before: "$22k/mo", after: "$65k/mo", time: "12 Weeks" },
    quote: "The Identity reconstruction was the missing link. I was a technician running a business; now I'm an authority leading a movement.",
    tags: ["Owner", "ROI: 14x"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Sarah Jenkins",
    role: "New Grad",
    category: "new-grad",
    metrics: { before: "40% Conv", after: "82% Conv", time: "8 Weeks" },
    quote: "I graduated with debt and zero certainty. Week 3 of the OS gave me a script system that felt natural but commanded absolute respect.",
    tags: ["New Grad", "Certainty"],
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Associate",
    category: "associate",
    metrics: { before: "12 NP/mo", after: "34 NP/mo", time: "5 Months" },
    quote: "The Authority Flywheel turned my associate position into a leadership role. My collections tripled and the owner is now installing the OS site-wide.",
    tags: ["Associate", "Authority"],
    image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. David Wu",
    role: "High Volume Owner",
    category: "high-volume",
    metrics: { before: "Burnout", after: "Systemized", time: "16 Weeks" },
    quote: "We were seeing 400+ visits a week but it was chaos. The NeuroChiro OS installed the structure we needed to scale to 600 without losing my soul.",
    tags: ["Systems", "Scale"],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Julian Vance",
    role: "Low Conversion Specialist",
    category: "struggling-conversion",
    metrics: { before: "22% Conv", after: "78% Conv", time: "8 Weeks" },
    quote: "I was 'hoping' people would say yes. Now I anticipate their needs based on the Scan-to-Story framework. It's a total game changer.",
    tags: ["Conversion", "Neurology"],
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80"
  }
];

export function CaseStudyFilter() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredStudies = activeCategory === "all" 
    ? caseStudies 
    : caseStudies.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Proof of Work</p>
        <h2 className="text-5xl font-black text-brand-navy tracking-tighter">Clinical Results.</h2>
        <p className="text-brand-gray font-medium max-w-xl mx-auto">
          Filter by practice stage to see exactly how the NeuroChiro OS 
          performs in environments identical to yours.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
              activeCategory === cat.id 
                ? "bg-brand-navy text-white border-brand-navy shadow-lg" 
                : "bg-white text-brand-navy/40 border-brand-navy/5 hover:border-brand-orange/40 hover:text-brand-navy"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study, i) => (
            <motion.div
              key={study.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <EliteCard className="h-full flex flex-col p-0 overflow-hidden group hover:border-brand-orange/40">
                <div className="relative h-48 overflow-hidden">
                  <img src={study.image} alt={study.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <p className="text-white font-black text-lg">{study.name}</p>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{study.role}</p>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col gap-6">
                  <div className="grid grid-cols-3 gap-4 border-b border-brand-navy/5 pb-6">
                    <div>
                      <p className="text-[8px] font-black uppercase text-brand-navy/40 mb-1">Baseline</p>
                      <p className="text-xs font-black text-brand-navy">{study.metrics.before}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase text-brand-navy/40 mb-1">Optimized</p>
                      <p className="text-xs font-black text-brand-orange">{study.metrics.after}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase text-brand-navy/40 mb-1">Window</p>
                      <p className="text-xs font-black text-brand-navy">{study.metrics.time}</p>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-brand-gray leading-relaxed italic italic-quote">
                    "{study.quote}"
                  </p>

                  <div className="mt-auto pt-4 flex flex-wrap gap-2">
                    {study.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-brand-navy/5 rounded-lg text-[8px] font-black uppercase text-brand-navy tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </EliteCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
