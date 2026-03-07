"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function WinsConstellation() {
  const [wins, setWins] = useState<any[]>([]);
  const [activeWin, setActiveWin] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchWins() {
      // Fetch latest 20 wins anonymously
      const { data } = await supabase
        .from('kpi_entries')
        .select('wins, week_start_date')
        .not('wins', 'is', null)
        .order('week_start_date', { ascending: false })
        .limit(20);
      
      if (data) {
        // Filter out empty or too short wins
        const validWins = data.filter(w => w.wins && w.wins.length > 5);
        setWins(validWins);
      }
    }
    fetchWins();
  }, [supabase]);

  if (wins.length === 0) return null;

  return (
    <div className="relative w-full h-64 bg-brand-navy rounded-[3rem] overflow-hidden group border border-white/5 shadow-2xl">
      {/* Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e2d3b_0%,#020617_100%)]" />
      
      {/* Ambient Stars */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random()
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4">
          <p className="text-brand-orange text-[10px] font-black uppercase tracking-[0.4em] mb-1">Live Momentum</p>
          <h3 className="text-white text-xl font-black tracking-tight">The Wins Constellation</h3>
        </div>

        <div className="relative flex items-center justify-center gap-4 flex-wrap max-w-2xl">
          {wins.map((win, i) => (
            <motion.button
              key={i}
              onHoverStart={() => setActiveWin(win)}
              onHoverEnd={() => setActiveWin(null)}
              whileHover={{ scale: 1.5, rotate: 90 }}
              className="relative p-2"
            >
              <Star 
                className={activeWin === win ? "text-brand-orange w-4 h-4 fill-brand-orange" : "text-white/20 w-3 h-3"} 
              />
              {activeWin === win && (
                <motion.div 
                  layoutId="glow"
                  className="absolute inset-0 bg-brand-orange/40 blur-lg rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="mt-8 h-12 flex items-center justify-center max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {activeWin ? (
              <motion.div
                key={activeWin.wins}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-3"
              >
                <Quote className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                <p className="text-white/80 text-sm font-medium italic leading-relaxed line-clamp-2">
                  {activeWin.wins}
                </p>
              </motion.div>
            ) : (
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                Hover over a star to witness the momentum
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Overlay */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-brand-navy/50 rounded-[3rem]" />
    </div>
  );
}
