import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Links | Dr. Ray Nichols — NeuroChiro Mastermind",
  description:
    "Nervous System Chiropractor • NeuroChiro Mastermind — links, resources, and free training.",
};

const links = [
  {
    label: "Score Your Practice — Free Assessment",
    href: "/quiz",
    accent: true,
    external: false,
  },
  {
    label: "Watch a Real Mastermind Session — Free",
    href: "/free-training",
    accent: false,
    external: false,
  },
  {
    label: "Apply for the Mastermind",
    href: "/apply",
    accent: false,
    external: false,
  },
  {
    label: "Pricing & Plans",
    href: "/pricing",
    accent: false,
    external: false,
  },
  {
    label: "Book a Discovery Call",
    href: "https://calendly.com/drray-neurochirodirectory/15min",
    accent: false,
    external: true,
  },
  {
    label: "Find a Chiropractor Near You",
    href: "https://neurochiro.co",
    accent: false,
    external: true,
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-[#050E1D] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E67E22]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#E67E22]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-5 py-12 min-h-screen">
        <div className="w-full max-w-md flex flex-col items-center">

          {/* Logo + Brand */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 relative">
              <Image
                src="/logo-white.png"
                alt="NeuroChiro"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="block text-white font-bold text-sm uppercase tracking-widest leading-none">
                NeuroChiro
              </span>
              <span className="block text-[#E67E22] text-[10px] font-bold uppercase tracking-wider">
                Mastermind
              </span>
            </div>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-[#E67E22]/20">
              <Image
                src="/dr-ray-headshot.png"
                alt="Dr. Ray Nichols"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-white text-2xl font-black tracking-tight">
              Dr. Raymond Nichols
            </h1>
            <p className="text-white/40 text-sm font-medium mt-1">
              Chiropractor &bull; Practice Owner &bull; Coach
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400/80 text-xs font-bold uppercase tracking-wider">
                Cohort 3 Enrolling Now
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div className="w-full bg-white/[0.03] border border-white/[0.06] rounded-2xl px-5 py-4 text-center mb-6">
            <p className="text-white/60 text-sm font-medium leading-relaxed">
              Helping nervous system chiropractors go from second-guessing to certainty. <span className="text-[#E67E22] font-bold">180K+ community.</span>
            </p>
          </div>

          {/* Links */}
          <div className="w-full flex flex-col gap-3 mb-8">
            {links.map((link, i) => {
              const className = link.accent
                ? "group w-full relative bg-gradient-to-r from-[#E67E22] to-[#d4772a] text-white font-bold rounded-2xl px-6 py-5 text-center shadow-lg shadow-[#E67E22]/20 hover:shadow-[#E67E22]/30 hover:scale-[1.02] transition-all"
                : "group w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-6 py-4 text-white/90 text-center hover:bg-white/[0.08] hover:border-white/[0.15] hover:scale-[1.01] transition-all";

              const inner = (
                <span className="flex items-center justify-center gap-2">
                  <span className="text-sm font-semibold">{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              );

              if (link.external) {
                return (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <Link key={i} href={link.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/neurochiro"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://neurochiromastermind.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all"
              aria-label="Website"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@neurochiro"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all"
              aria-label="YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-white/15 text-[10px] font-medium uppercase tracking-widest">
              NeuroChiro Global Mastermind
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
