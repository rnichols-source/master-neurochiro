"use client";

import { useState, useEffect } from "react";
import { Rocket, BookOpen, Users, BarChart3, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const DISMISSED_KEY = "neurochiro_start_here_dismissed";

const steps = [
  {
    icon: BookOpen,
    title: "Watch the Week 1 intro",
    desc: "Start with the Identity Worksheet — it takes 15 minutes.",
    href: "/portal/curriculum/week-1-identity",
  },
  {
    icon: Users,
    title: "Join the Community",
    desc: "Introduce yourself and connect with other doctors.",
    href: "/portal/community",
  },
  {
    icon: BarChart3,
    title: "Set up your KPI tracking",
    desc: "Enter your first week of numbers so you can track progress.",
    href: "/portal/engine",
  },
];

export function StartHere({ userName }: { userName: string }) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISSED_KEY) === "true");
  }, []);

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    setDismissed(true);
  };

  return (
    <div className="bg-brand-navy rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden">
      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4 text-white/40" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center">
          <Rocket className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-black text-white tracking-tight">
            Welcome to the Mastermind, {userName}!
          </h2>
          <p className="text-sm text-white/50 font-medium">
            Here&apos;s how to get started.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        {steps.map((step, i) => (
          <Link
            key={i}
            href={step.href}
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <div className="w-8 h-8 bg-brand-orange/20 rounded-lg flex items-center justify-center shrink-0">
              <step.icon className="w-4 h-4 text-brand-orange" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">{step.title}</p>
              <p className="text-xs text-white/40 font-medium">{step.desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-brand-orange transition-colors shrink-0" />
          </Link>
        ))}
      </div>

      {/* Message + Dismiss */}
      <p className="text-xs text-white/30 font-medium mb-4">
        Your 8-week program starts with Week 1. Each week builds on the last. Take it one step at a time.
      </p>
      <button
        onClick={handleDismiss}
        className="bg-brand-orange text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-[#B35520] transition-colors active:scale-[0.98]"
      >
        Got it, let&apos;s go
      </button>
    </div>
  );
}
