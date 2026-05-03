import type { Metadata } from "next";
import Link from "next/link";
import { Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Links | Dr. Ray Nichols",
  description:
    "Nervous System Chiropractor • NeuroChiro Mastermind — links, resources, and free training.",
};

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-[#050E1D] flex flex-col items-center px-4 py-10 font-[system-ui,sans-serif]">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-20 h-20 rounded-full bg-[#E67E22] flex items-center justify-center text-white text-2xl font-bold select-none">
            DR
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Dr. Ray Nichols</h1>
            <p className="text-white/50 text-sm mt-1">
              Nervous System Chiropractor &bull; NeuroChiro Mastermind
            </p>
            <p className="text-white/40 text-xs mt-2">
              180K+ followers helping chiropractors build better practices
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <Link
          href="/quiz"
          className="w-full bg-[#E67E22] text-white font-bold rounded-2xl px-6 py-5 text-center shadow-lg shadow-orange-500/20 hover:brightness-110 transition-all"
        >
          🔥 Score Your Practice — Free Quiz
        </Link>

        {/* Link Stack */}
        <div className="w-full flex flex-col gap-3">
          <Link
            href="/free-training"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-center hover:bg-white/10 transition-all"
          >
            📺 Free Training: 3 Mistakes That Kill Collections
          </Link>

          <Link
            href="/apply"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-center hover:bg-white/10 transition-all"
          >
            📋 Apply for the Mastermind
          </Link>

          <Link
            href="/pricing"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-center hover:bg-white/10 transition-all"
          >
            💰 Pricing &amp; Plans
          </Link>

          <a
            href="https://calendly.com/neurochiro-pro/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-center hover:bg-white/10 transition-all"
          >
            📞 Book a Discovery Call
          </a>

          <a
            href="https://www.neurochirodirectory.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-center hover:bg-white/10 transition-all"
          >
            🌐 Find a Nervous System Chiropractor
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 mt-2">
          <a
            href="https://www.instagram.com/neurochiro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://neurochiromastermind.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Website"
          >
            <Globe size={22} />
          </a>
        </div>

        {/* Footer */}
        <p className="text-white/30 text-xs mt-4">
          NeuroChiro Global Mastermind
        </p>
      </div>
    </div>
  );
}
