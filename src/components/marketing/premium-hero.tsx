"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function PremiumHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-100" />
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8"
      >
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel"
        >
          <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">The New Standard in Excellence</span>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-display"
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Nervous System</span>
          <span className="text-gradient">First Mastery.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          An operating system for the top 1% of chiropractors. Reconstruct your identity, master clinical certainty, and lead the profession.
        </motion.p>

        {/* Interactive CTA Group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
        >
          <Link href="/apply">
            <button className="group relative px-10 py-5 bg-white text-brand-navy font-black text-sm uppercase tracking-widest rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Apply for Admission <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </Link>
          
          <button className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-orange/50 transition-colors bg-white/5">
              <Play className="w-3 h-3 fill-current ml-1" />
            </div>
            Watch The Vision
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </motion.div>
    </div>
  );
}
