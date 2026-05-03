"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Trophy, Target, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";

const doctorCategories = [
  { name: "Practice Identity & Philosophy", icon: "🏗️" },
  { name: "Patient Communication & Case Acceptance", icon: "🗣️" },
  { name: "Business Systems & Collections", icon: "💰" },
  { name: "Growth, Team & Leadership", icon: "📈" },
];

const studentCategories = [
  { name: "Clinical Readiness", icon: "🩺" },
  { name: "Communication & Confidence", icon: "🗣️" },
  { name: "Career & Business Knowledge", icon: "💼" },
  { name: "Professional Development", icon: "📈" },
];

function ResultsContent() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score") ?? 0);
  const track = searchParams.get("track") || "doctor";
  const isStudent = track === "student";

  const scoreColor =
    score >= 70 ? "text-green-400" : score >= 40 ? "text-amber-400" : "text-red-400";
  const scoreRingColor =
    score >= 70 ? "border-green-400/30" : score >= 40 ? "border-amber-400/30" : "border-red-400/30";

  const scoreLabel = isStudent
    ? score >= 70 ? "Career Ready" : score >= 40 ? "Getting There" : "Needs Preparation"
    : score >= 70 ? "Strong Foundation" : score >= 40 ? "Room to Grow" : "Needs Attention";

  const ScoreIcon = score >= 70 ? Trophy : score >= 40 ? Target : AlertTriangle;
  const cats = isStudent ? studentCategories : doctorCategories;

  return (
    <div className="min-h-screen bg-[#050E1D] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center space-y-10">
        {/* Track Label */}
        <p className="text-sm font-bold text-[#E67E22] uppercase tracking-widest">
          {isStudent ? "Student Career Readiness Assessment" : "Practice Assessment Results"}
        </p>

        {/* Score Display */}
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest text-gray-400">
            {isStudent ? "Your Career Readiness Score" : "Your Practice Score"}
          </p>
          <div className={`inline-flex items-center justify-center w-36 h-36 rounded-full border-4 ${scoreRingColor}`}>
            <span className={`text-6xl font-bold ${scoreColor}`}>{score}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ScoreIcon className={`w-5 h-5 ${scoreColor}`} />
            <p className={`text-xl font-semibold ${scoreColor}`}>{scoreLabel}</p>
          </div>
        </div>

        {/* Category Teaser */}
        <div className="bg-white/5 rounded-xl p-6 text-left space-y-5 border border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E67E22]" />
            <h3 className="text-lg font-semibold">Your score across 4 categories:</h3>
          </div>
          <div className="space-y-3">
            {cats.map((cat) => (
              <div key={cat.name} className="flex items-center gap-3">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-300 flex-1">{cat.name}</span>
                <span className="text-sm font-bold text-gray-500">●●●</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 italic">Full category scores revealed on your call</p>
        </div>

        {/* What you get on the call */}
        <div className="bg-white/5 rounded-xl p-6 text-left space-y-4 border border-white/10">
          <h3 className="text-lg font-semibold">On your free call, Dr. Ray will cover:</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E67E22] flex-shrink-0" />
              Your full category-by-category breakdown
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E67E22] flex-shrink-0" />
              {isStudent
                ? "Your biggest gap before graduation — and how to close it"
                : "Your #1 growth opportunity based on your answers"}
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E67E22] flex-shrink-0" />
              {isStudent
                ? "A career action plan — what to do in the next 90 days"
                : "A specific action plan for the next 30 days"}
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E67E22] flex-shrink-0" />
              {isStudent
                ? "Whether the Foundations Intensive is the right next step for you"
                : "Whether the Mastermind Intensive is the right fit for you (honest answer)"}
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <a
            href="https://calendly.com/drray-neurochirodirectory/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#E67E22] hover:bg-[#cf6e1b] text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors w-full"
          >
            Book a Free Call to Get Your Full Results
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-sm text-gray-400">
            {isStudent
              ? "Dr. Ray will walk you through your career readiness breakdown in a free 15-minute call."
              : "Dr. Ray will walk you through your personalized action plan in a free 15-minute call."}
          </p>
        </div>

        {/* Secondary link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#E67E22] transition-colors"
        >
          {isStudent ? "Learn more about the Foundations Intensive" : "Learn more about the Mastermind Intensive"}
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
