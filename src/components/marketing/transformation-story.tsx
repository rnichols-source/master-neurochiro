"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Zap, Target, Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const storyPoints = [
  {
    week: "The Baseline",
    title: "The Technician Trap",
    desc: "You are working harder than ever, but certainty is leaking. You chase 'yeses' and hope the results stick. You feel like a glorified back-cracker.",
    color: "bg-brand-gray/20",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80"
  },
  {
    week: "Weeks 1-3",
    title: "Identity Reconstruction",
    desc: "The 'Neediness' vanishes. You install the Certainty Protocol. Your Report of Findings shifts from a sales pitch to a clinical command.",
    color: "bg-brand-orange/10",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80"
  },
  {
    week: "Weeks 4-6",
    title: "Clinical Command",
    desc: "Neurology becomes your primary language. The Scan-to-Story framework turns complex data into simple, high-value recommendations.",
    color: "bg-brand-navy/10",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80"
  },
  {
    week: "Weeks 7-8",
    title: "The Authority State",
    desc: "Systems replace chaos. Your clinic scales without your constant presence. You are no longer a job holder; you are a NeuroChiro Authority.",
    color: "bg-brand-orange/20",
    icon: Target,
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80"
  }
];

export function TransformationStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky Content */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Text Content */}
          <div className="relative h-[400px]">
            {storyPoints.map((point, i) => {
              const start = i / storyPoints.length;
              const end = (i + 1) / storyPoints.length;
              
              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 flex flex-col justify-center space-y-6"
                  style={{
                    opacity: useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]),
                    y: useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [20, 0, 0, -20])
                  }}
                >
                  <div className="space-y-4">
                    <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">
                      {point.week}
                    </p>
                    <h3 className="text-6xl font-black text-brand-navy tracking-tighter leading-none">
                      {point.title}
                    </h3>
                    <p className="text-xl text-brand-gray font-medium leading-relaxed max-w-lg">
                      {point.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center text-white">
                      <point.icon className="w-6 h-6" />
                    </div>
                    <div className="h-px flex-1 bg-brand-navy/10" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Visual Progression */}
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-brand-navy/5">
            {storyPoints.map((point, i) => {
              const start = i / storyPoints.length;
              const end = (i + 1) / storyPoints.length;
              
              return (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    opacity: useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]),
                    scale: useTransform(scrollYProgress, [start, end], [1.1, 1])
                  }}
                >
                  <img 
                    src={point.image} 
                    alt={point.title} 
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className={cn("absolute inset-0 mix-blend-overlay opacity-60", point.color)} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
                </motion.div>
              );
            })}
            
            {/* Progress Ring Overlay */}
            <div className="absolute bottom-10 right-10 w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48" cy="48" r="40"
                  fill="none" stroke="currentColor" strokeWidth="4"
                  className="text-white/10"
                />
                <motion.circle
                  cx="48" cy="48" r="40"
                  fill="none" stroke="currentColor" strokeWidth="4"
                  strokeDasharray="251.2"
                  className="text-brand-orange"
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-[10px] font-black text-white uppercase tracking-tighter">Week</span>
                <motion.span className="text-2xl font-black text-white leading-none">
                  {useTransform(scrollYProgress, [0, 1], ["0", "8"])}
                </motion.span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
