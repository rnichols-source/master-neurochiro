"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Trophy, Target, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";

function ResultsContent() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score") ?? 0);

  const scoreColor =
    score >= 70
      ? "text-green-400"
      : score >= 40
        ? "text-amber-400"
        : "text-red-400";

  const scoreRingColor =
    score >= 70
      ? "border-green-400/30"
      : score >= 40
        ? "border-amber-400/30"
        : "border-red-400/30";

  const scoreLabel =
    score >= 70
      ? "Strong Foundation"
      : score >= 40
        ? "Room to Grow"
        : "Needs Attention";

  const ScoreIcon =
    score >= 70 ? Trophy : score >= 40 ? Target : AlertTriangle;

  return (
    <div className="min-h-screen bg-[#050E1D] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center space-y-10">
        {/* Score Display */}
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest text-gray-400">
            Your Practice Score
          </p>
          <div
            className={`inline-flex items-center justify-center w-36 h-36 rounded-full border-4 ${scoreRingColor}`}
          >
            <span className={`text-6xl font-bold ${scoreColor}`}>
              {score}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ScoreIcon className={`w-5 h-5 ${scoreColor}`} />
            <p className={`text-xl font-semibold ${scoreColor}`}>
              {scoreLabel}
            </p>
          </div>
        </div>

        {/* Teaser */}
        <div className="bg-white/5 rounded-xl p-6 text-left space-y-4 border border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E67E22]" />
            <h3 className="text-lg font-semibold">
              Your full breakdown includes:
            </h3>
          </div>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E67E22] flex-shrink-0" />
              Your #1 growth opportunity
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E67E22] flex-shrink-0" />
              Exactly what to fix this week
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E67E22] flex-shrink-0" />
              How you compare to other nervous system chiropractors
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <a
            href="https://calendly.com/neurochiro-pro/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#E67E22] hover:bg-[#cf6e1b] text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors w-full"
          >
            Book a Free Call to Get Your Full Results
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-sm text-gray-400">
            Dr. Ray will walk you through your personalized action plan in a
            free 15-minute call.
          </p>
        </div>

        {/* Secondary link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#E67E22] transition-colors"
        >
          Learn more about the Mastermind
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050E1D] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#E67E22] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
