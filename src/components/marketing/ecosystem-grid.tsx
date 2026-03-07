"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Brain, Globe, GraduationCap, Users } from "lucide-react";

const items = [
  {
    colSpan: "md:col-span-2",
    title: "Global Member Directory",
    subtitle: "The Network",
    desc: "A verified map of nervous-system centered doctors worldwide. Patients are looking for this specific standard of care. Join the registry.",
    icon: Globe,
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    colSpan: "md:col-span-1",
    title: "Student Forge",
    subtitle: "The Future",
    desc: "Bridge the gap between school theory and clinical reality. The platform for the next generation.",
    icon: GraduationCap,
    gradient: "from-brand-orange/20 to-red-500/20"
  },
  {
    colSpan: "md:col-span-1",
    title: "Clinical Intelligence",
    subtitle: "The Core",
    desc: "Neurology, simplified. Explain complex findings so patients actually 'get it'.",
    icon: Brain,
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    colSpan: "md:col-span-2",
    title: "Seminar Immersion",
    subtitle: "The Experience",
    desc: "Live events designed for deep clinical reconstruction. No ego, no fluff, just high-performance growth.",
    icon: Users,
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
];

export function EcosystemGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: i * 0.1 }}
          className={cn(
            "glass-panel rounded-[3rem] p-10 relative overflow-hidden group cursor-pointer hover:border-brand-orange/20 transition-all duration-500",
            item.colSpan
          )}
        >
          {/* Hover Gradient Background */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out",
            item.gradient
          )} />

          <div className="relative z-10 h-full flex flex-col justify-between space-y-12">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <item.icon className="w-7 h-7 text-white/80 group-hover:text-brand-orange transition-colors" />
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2 group-hover:text-brand-orange/60 transition-colors">{item.subtitle}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight leading-none">{item.title}</h3>
              </div>
              <p className="text-lg text-white/50 font-medium leading-relaxed max-w-sm group-hover:text-white/70 transition-colors">
                {item.desc}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
