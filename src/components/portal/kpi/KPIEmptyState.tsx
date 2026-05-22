"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import { ArrowRight } from "lucide-react";

interface KPIEmptyStateProps {
  onStart: () => void;
}

export function KPIEmptyState({ onStart }: KPIEmptyStateProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Hero Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-brand-orange font-black uppercase tracking-[0.25em] text-[10px] md:text-xs mb-6"
        >
          Practice Scorecard
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight leading-tight mb-6"
        >
          You&apos;ve been driving<br />without a dashboard.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-brand-navy/50 font-medium mb-12"
        >
          Let&apos;s fix that in 2 minutes.
        </motion.p>

        {/* Formula Reveal */}
        <AnimatePresence>
          {!revealed ? (
            <motion.div
              key="cta-reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <BrandButton
                variant="accent"
                size="lg"
                className="px-10 py-5 text-sm"
                onClick={() => setRevealed(true)}
              >
                Show Me the Formula
              </BrandButton>
            </motion.div>
          ) : (
            <motion.div
              key="formula"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-10"
            >
              {/* The Formula */}
              <div className="bg-brand-navy rounded-2xl md:rounded-[2rem] p-8 md:p-12">
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                  {[
                    { label: "New Patients", delay: 0 },
                    { label: "×", delay: 0.15, isOperator: true },
                    { label: "Conversion %", delay: 0.3 },
                    { label: "×", delay: 0.45, isOperator: true },
                    { label: "PVA", delay: 0.6 },
                    { label: "×", delay: 0.75, isOperator: true },
                    { label: "CVA", delay: 0.9 },
                    { label: "=", delay: 1.05, isOperator: true },
                    { label: "Your Revenue", delay: 1.2, isResult: true },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: item.delay }}
                    >
                      {item.isOperator ? (
                        <span className="text-xl md:text-2xl font-black text-white/20">{item.label}</span>
                      ) : (
                        <div className={`px-4 py-3 rounded-xl ${item.isResult ? 'bg-green-500/20' : 'bg-white/5'}`}>
                          <p className={`text-sm md:text-base font-black ${item.isResult ? 'text-green-400' : 'text-white'}`}>
                            {item.label}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-white/40 text-sm font-medium mt-8 leading-relaxed max-w-md mx-auto"
                >
                  Every dollar your practice makes flows through these 4 levers.
                  Move any one, and revenue moves with it.
                </motion.p>
              </div>

              {/* What each one means */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left"
              >
                {[
                  { name: "New Patients", desc: "How many Day 1s walk in each week" },
                  { name: "Conversion", desc: "What % of Day 1s start a care plan" },
                  { name: "PVA", desc: "How many times each patient visits" },
                  { name: "CVA", desc: "How much you collect per visit" },
                ].map((lever, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-brand-navy/5">
                    <p className="text-xs font-black text-brand-navy uppercase tracking-wider mb-1">{lever.name}</p>
                    <p className="text-[11px] text-brand-navy/40 leading-relaxed">{lever.desc}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
              >
                <BrandButton
                  variant="accent"
                  size="lg"
                  className="px-10 py-5 text-sm group"
                  onClick={onStart}
                >
                  Baseline Your Numbers
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
                <p className="text-xs text-brand-navy/30 mt-3">5 questions. Takes about 60 seconds.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
