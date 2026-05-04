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

  function fixEmailTypos(rawEmail: string): string {
    const typoMap: Record<string, string> = {
      "gmail.co": "gmail.com", "gmail.cm": "gmail.com", "gmail.con": "gmail.com",
      "gmial.com": "gmail.com", "gmal.com": "gmail.com", "gmaill.com": "gmail.com",
      "yaho.com": "yahoo.com", "yahoo.co": "yahoo.com", "yahooo.com": "yahoo.com",
      "hotmal.com": "hotmail.com", "hotmai.com": "hotmail.com",
      "outloo.com": "outlook.com", "outlok.com": "outlook.com",
      "iclou.com": "icloud.com", "icloud.co": "icloud.com",
    };
    const parts = rawEmail.split("@");
    if (parts.length !== 2) return rawEmail;
    const domain = parts[1].toLowerCase();
    return typoMap[domain] ? `${parts[0]}@${typoMap[domain]}` : rawEmail;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email) {
      setError("Please enter your name and email.");
      return;
    }

    const correctedEmail = fixEmailTypos(email.trim());
    if (correctedEmail !== email.trim()) {
      setEmail(correctedEmail);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(correctedEmail)) {
      setError("Please check your email address — it doesn't look right.");
      return;
    }

    setIsSubmitting(true);
    const result = await createLeadFromCapture({
      name,
      email: correctedEmail,
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
    <div className="min-h-[100dvh] bg-[#F5F3EF]">
      {/* Hero */}
      <section className="px-5 md:px-6 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D66829]/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#D66829] rounded-full animate-pulse" />
            <span className="text-sm font-bold text-[#D66829] uppercase tracking-wider">
              Free Session
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black text-[#1E2D3B] tracking-tight leading-[1.1] mb-6">
            Watch a Real Mastermind Coaching Session — Uncut
          </h1>

          <p className="text-lg md:text-xl text-[#1E2D3B]/50 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            This is an actual Week 1 call from Cohort 2 with Dr. Raymond Nichols. See exactly how we coach, what we cover, and why our members go from 40% to 80% care plan acceptance.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto space-y-4"
          >
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
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
              className="w-full bg-white border border-[#1E2D3B]/10 rounded-xl py-4 px-4 text-base font-medium text-[#1E2D3B] placeholder:text-[#1E2D3B]/30 focus:border-[#D66829]/40 focus:ring-2 focus:ring-[#D66829]/10 transition-all outline-none"
            />

            <input
              type="email"
              autoComplete="email"
              enterKeyHint="send"
              inputMode="email"
              placeholder="Your best email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#1E2D3B]/10 rounded-xl py-4 px-4 text-base font-medium text-[#1E2D3B] placeholder:text-[#1E2D3B]/30 focus:border-[#D66829]/40 focus:ring-2 focus:ring-[#D66829]/10 transition-all outline-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D66829] hover:bg-[#c05d24] text-white font-bold text-base py-4 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Watch Free Session
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-sm text-[#1E2D3B]/30 font-medium">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      {/* What You'll See */}
      <section className="px-5 md:px-6 py-16 md:py-20 border-t border-[#1E2D3B]/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-[#1E2D3B] text-center mb-4">
            What You&apos;ll See Inside
          </h2>
          <p className="text-[#1E2D3B]/50 text-center text-base md:text-lg mb-12 max-w-2xl mx-auto">
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
                className="bg-white rounded-2xl p-6 border border-[#1E2D3B]/5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-[#D66829]/10 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-[#D66829]" />
                </div>
                <h3 className="font-bold text-[#1E2D3B] text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[#1E2D3B]/50 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-5 md:px-6 py-16 md:py-20 border-t border-[#1E2D3B]/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#D66829]" />
            <span className="text-xl md:text-2xl font-black text-[#1E2D3B]">
              150+
            </span>
          </div>
          <p className="text-lg md:text-xl text-[#1E2D3B]/50 font-medium">
            Join 150+ chiropractors who&apos;ve transformed their practice
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 md:px-6 py-10 border-t border-[#1E2D3B]/5">
        <p className="text-center text-sm text-[#1E2D3B]/20 font-medium">
          NeuroChiro Global Mastermind
        </p>
      </footer>
    </div>
  );
}
