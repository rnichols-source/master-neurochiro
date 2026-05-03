"use client";

import { createLeadFromCapture } from "@/app/actions/hunter-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  MessageSquare,
  Calculator,
  TrendingUp,
  Users,
} from "lucide-react";

export default function FreeTrainingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email) {
      setError("Please enter your name and email.");
      return;
    }

    setIsSubmitting(true);
    const result = await createLeadFromCapture({
      name,
      email,
      source: "free_training",
    });
    setIsSubmitting(false);

    if (result.success) {
      router.push("/free-training/confirmation");
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#050E1D]">
      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="px-5 md:px-6 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E67E22]/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#E67E22] rounded-full animate-pulse" />
            <span className="text-sm font-bold text-[#E67E22] uppercase tracking-wider">
              Free Session
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-[1.1] mb-6">
            Watch a Real Mastermind Coaching Session — Uncut
          </h1>

          <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            This is an actual Week 1 call from Cohort 2 with Dr. Raymond Nichols. See exactly how we coach, what we cover, and why our members go from 40% to 80% care plan acceptance.
          </p>

          {/* Inline Email Capture Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto space-y-4"
          >
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm font-medium">
                {error}
              </div>
            )}

            <input
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              placeholder="Your name (e.g. Dr. Jane Smith)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-base font-medium text-white placeholder:text-white/30 focus:border-[#E67E22]/60 focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none"
            />

            <input
              type="email"
              autoComplete="email"
              enterKeyHint="send"
              inputMode="email"
              placeholder="Your best email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-base font-medium text-white placeholder:text-white/30 focus:border-[#E67E22]/60 focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E67E22] hover:bg-[#d4711d] text-white font-bold text-base py-4 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Watch Free Training
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-sm text-white/30 font-medium">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHAT YOU'LL LEARN — 3 Cards
      ═══════════════════════════════════════════════════════════ */}
      <section className="px-5 md:px-6 py-16 md:py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-white text-center mb-4">
            What You&apos;ll See Inside
          </h2>
          <p className="text-white/50 text-center text-base md:text-lg mb-12 max-w-2xl mx-auto">
            A real coaching session — not a highlight reel. Here&apos;s what Week 1 covers.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: MessageSquare,
                title: "Your Identity as a Doctor",
                desc: "The framework for defining who you are as a nervous system chiropractor — and why it changes everything about how patients respond to you.",
              },
              {
                icon: Calculator,
                title: "Live Coaching & Q&A",
                desc: "Watch Dr. Ray coach real Mastermind members through their biggest challenges. This is what every weekly call looks like.",
              },
              {
                icon: TrendingUp,
                title: "The Week 1 Assignment",
                desc: "The homework that kicks off the 90-day transformation. Most members say this single exercise changed how they show up in practice.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-[#E67E22]/10 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-[#E67E22]" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SOCIAL PROOF
      ═══════════════════════════════════════════════════════════ */}
      <section className="px-5 md:px-6 py-16 md:py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#E67E22]" />
            <span className="text-xl md:text-2xl font-black text-white">
              100+
            </span>
          </div>
          <p className="text-lg md:text-xl text-white/60 font-medium">
            Join 150+ chiropractors who&apos;ve transformed their practice
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════ */}
      <footer className="px-5 md:px-6 py-10 border-t border-white/5">
        <p className="text-center text-sm text-white/30 font-medium">
          NeuroChiro Global Mastermind
        </p>
      </footer>
    </div>
  );
}
