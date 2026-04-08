"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "neurochiro-welcome-dismissed";

export function WelcomeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {}
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  if (!visible) return null;

  return (
    <div className="bg-white rounded-2xl border-l-4 border-l-brand-orange border border-brand-navy/5 p-5 md:p-6 shadow-sm relative">
      <button
        onClick={dismiss}
        className="absolute top-4 right-4 text-brand-navy/20 hover:text-brand-navy transition-colors p-1"
        aria-label="Dismiss welcome message"
      >
        <X className="w-4 h-4" />
      </button>

      <h3 className="text-lg font-black text-brand-navy mb-3">
        Welcome to the Mastermind!
      </h3>
      <p className="text-sm text-brand-gray font-medium mb-4">
        Here&apos;s your game plan to get started:
      </p>
      <ol className="space-y-2 text-sm font-medium text-brand-navy">
        <li className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-black flex items-center justify-center shrink-0">
            1
          </span>
          <Link
            href="/portal/profile"
            className="hover:text-brand-orange transition-colors"
          >
            Complete your profile
          </Link>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-black flex items-center justify-center shrink-0">
            2
          </span>
          <Link
            href="/portal/curriculum"
            className="hover:text-brand-orange transition-colors"
          >
            Start Week 1
          </Link>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-black flex items-center justify-center shrink-0">
            3
          </span>
          Submit your first KPIs
        </li>
      </ol>
    </div>
  );
}
