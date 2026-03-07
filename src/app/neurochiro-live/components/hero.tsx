"use client";

import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export function LiveHero() {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Live Immersion Event</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
        >
          NeuroChiro <br />
          <span className="text-gradient">Live.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/50 font-medium max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          A 2-Day Immersion into Nervous System Chiropractic. <br />
          Master the framework. Command the clinical results. Lead the profession.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-brand-orange" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Location</p>
              <p className="text-sm font-bold text-white">Adelaide, Australia</p>
            </div>
          </div>

          <div className="w-px h-10 bg-white/10 hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-brand-orange" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Dates</p>
              <p className="text-sm font-bold text-white">May 29 – May 30, 2026</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <BrandButton 
            variant="accent" 
            size="lg" 
            className="px-12 py-8 text-lg rounded-full"
            onClick={scrollToPricing}
          >
            Reserve Your Seat <ArrowRight className="ml-3 w-5 h-5" />
          </BrandButton>
          <button 
            onClick={scrollToPricing}
            className="text-white/40 hover:text-white font-black uppercase tracking-widest text-xs transition-colors"
          >
            See Pricing & Tiers
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-px h-12 bg-gradient-to-b from-brand-orange to-transparent" />
      </motion.div>
    </section>
  );
}
