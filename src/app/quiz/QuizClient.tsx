"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLeadFromCapture } from "@/app/actions/hunter-actions";
import { ArrowRight, CheckCircle, ClipboardList } from "lucide-react";

type Answers = Record<number, number>;

const categories = [
  "Practice Identity & Philosophy",
  "Patient Communication & Case Acceptance",
  "Business Systems & Collections",
  "Growth, Team & Leadership",
];

const questions = [
  // ═══ PRACTICE IDENTITY & PHILOSOPHY (Q1-3) ═══
  // Inspired by: Sigafoose (Big Idea), Gentempo (identity), Riekeman (vitalism), Plasker (100 Year Lifestyle)
  {
    category: 0,
    question: "When a new patient asks 'What kind of chiropractor are you?' — what do you say?",
    options: [
      { label: "I help people get out of pain", score: 3 },
      { label: "I focus on whole-body wellness and prevention", score: 6 },
      { label: "I restore nervous system function so the body can heal and adapt", score: 9 },
      { label: "I don't really have a clear answer for that", score: 1 },
    ],
  },
  {
    category: 0,
    question: "Do your patients understand WHY they need ongoing care — not just relief?",
    options: [
      { label: "Yes — they get it because I educate them from Day 1", score: 9 },
      { label: "Some do — but most still think of me as pain relief", score: 5 },
      { label: "Honestly, most leave once they feel better", score: 2 },
    ],
  },
  {
    category: 0,
    question: "If someone looked at your website, social media, and office — would they see a clear, consistent brand and message?",
    options: [
      { label: "Absolutely — every touchpoint reinforces who I am", score: 9 },
      { label: "It's okay — some things match, some don't", score: 5 },
      { label: "It's a mess — I've never really built a brand", score: 2 },
    ],
  },

  // ═══ PATIENT COMMUNICATION & CASE ACCEPTANCE (Q4-6) ═══
  // Inspired by: DiDomenico (ROF mastery), Hoffman/Masters Circle (scripting), Dill & Book (Black Diamond case acceptance)
  {
    category: 1,
    question: "What happens between your Day 1 exam and your Day 2 Report of Findings?",
    options: [
      { label: "I have a structured system — patients come back ready to commit", score: 9 },
      { label: "I do a ROF but my show rate and conversion could be better", score: 5 },
      { label: "I usually try to do everything on Day 1", score: 3 },
      { label: "I don't have a consistent Day 1 / Day 2 process", score: 1 },
    ],
  },
  {
    category: 1,
    question: "What's your care plan acceptance rate — the percentage of patients who say YES and start the full plan you recommend?",
    options: [
      { label: "80%+ — I rarely hear 'no'", score: 9 },
      { label: "50-80% — more than half but not consistent", score: 6 },
      { label: "Under 50% — 'I'll think about it' is my most common response", score: 3 },
      { label: "I don't track this number", score: 1 },
    ],
  },
  {
    category: 1,
    question: "When a patient hesitates — 'I need to talk to my spouse,' 'That's a lot of money,' 'Let me think about it' — what happens?",
    options: [
      { label: "I have practiced scripts for each objection and convert most of them", score: 9 },
      { label: "I try to address it but I freeze up or get uncomfortable", score: 4 },
      { label: "I back off — I don't want to be salesy", score: 2 },
      { label: "I've never been trained on objection handling", score: 1 },
    ],
  },

  // ═══ BUSINESS SYSTEMS & COLLECTIONS (Q7-9) ═══
  // Inspired by: Hoffman (Masters Circle KPIs), Geier/Scheduling Institute (NP acquisition), Perman (practice metrics), Mertz (associate economics)
  {
    category: 2,
    question: "Do you know your 5 critical KPIs — collections, new patients, PVA, visit average, and case acceptance — for THIS week?",
    options: [
      { label: "Yes — I track them every week and review with my team", score: 9 },
      { label: "I track some of them, some of the time", score: 5 },
      { label: "I check my bank account and hope for the best", score: 2 },
      { label: "I don't know what PVA means", score: 1 },
    ],
  },
  {
    category: 2,
    question: "What does your Patient Visit Average (PVA) look like — how many visits does your average patient complete?",
    options: [
      { label: "24+ visits — patients complete full corrective plans", score: 9 },
      { label: "12-24 visits — most do a partial plan", score: 6 },
      { label: "Under 12 — patients drop off early", score: 3 },
      { label: "I've never calculated my PVA", score: 1 },
    ],
  },
  {
    category: 2,
    question: "How do patients pay for care in your office?",
    options: [
      { label: "Structured plans — pay-in-full discount, monthly options, insurance billed properly", score: 9 },
      { label: "Per-visit or insurance only — no real financial system", score: 4 },
      { label: "I'm uncomfortable talking about money with patients", score: 2 },
    ],
  },

  // ═══ GROWTH, TEAM & LEADERSHIP (Q10-12) ═══
  // Inspired by: Dill & Book (scaling), Lerner (Maximized Living systems), Hughes (leadership), Christie (marketing systems)
  {
    category: 3,
    question: "Where do most of your new patients come from?",
    options: [
      { label: "Internal referrals + community events — my patients send me people", score: 9 },
      { label: "Online marketing — Google, social media, ads", score: 6 },
      { label: "Insurance directories and walk-ins", score: 3 },
      { label: "I honestly don't know — I don't track my sources", score: 1 },
    ],
  },
  {
    category: 3,
    question: "Do you run a daily huddle with your team — a quick 5-minute meeting to align on the day's goals, patients, and numbers?",
    options: [
      { label: "Every single morning — it runs the practice", score: 9 },
      { label: "Sometimes — when things feel off", score: 4 },
      { label: "No — I'm a solo doc or we don't do huddles", score: 2 },
    ],
  },
  {
    category: 3,
    question: "Be honest — how close are you to the practice and life you envisioned when you decided to become a chiropractor?",
    options: [
      { label: "I'm living it — this is exactly what I wanted", score: 9 },
      { label: "I'm on the right track but know I can do more", score: 7 },
      { label: "I'm frustrated — I know I'm capable of more but something's off", score: 4 },
      { label: "I'm burned out and questioning if I made the right career choice", score: 2 },
    ],
  },
];

export default function QuizClient() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleAnswer(questionIndex: number, score: number) {
    setAnswers((prev) => ({ ...prev, [questionIndex]: score }));
    setStep(questionIndex + 2); // questions are steps 1-6, so next step = questionIndex + 2
  }

  function totalScore() {
    const raw = Object.values(answers).reduce((sum, s) => sum + s, 0);
    // Max possible = 12 questions × 9 points = 108. Normalize to 0-100.
    return Math.round((raw / 108) * 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const score = totalScore();
      const answerLabels: Record<string, string> = {};
      Object.entries(answers).forEach(([qIdx, scoreVal]) => {
        const q = questions[Number(qIdx)];
        const chosen = q.options.find((o) => o.score === scoreVal);
        answerLabels[q.question] = chosen?.label ?? String(scoreVal);
      });

      await createLeadFromCapture({
        name: name.trim(),
        email: email.trim(),
        source: "quiz",
        fit_score: score,
        notes: JSON.stringify(answerLabels),
      });

      router.push(`/quiz/results?score=${score}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const totalQuestions = questions.length;
  const emailStep = totalQuestions + 1;
  const progressPercent = step === 0 ? 0 : Math.min((step / totalQuestions) * 100, 100);

  return (
    <div className="min-h-screen bg-[#050E1D] text-white flex flex-col">
      {/* Progress bar */}
      {step >= 1 && step <= totalQuestions && (
        <div className="w-full h-1 bg-white/10">
          <div
            className="h-full bg-[#E67E22] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {/* Step 0: Intro */}
        {step === 0 && (
          <div className="max-w-xl w-full text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E67E22]/20 mb-2">
              <ClipboardList className="w-8 h-8 text-[#E67E22]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              Score Your Practice in 2 Minutes
            </h1>
            <p className="text-lg text-gray-300 max-w-md mx-auto">
              Answer 12 questions across 4 categories and get a detailed practice score — plus find out exactly what to fix first.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto text-left">
              {categories.map((cat, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-[#E67E22]" />
                  {cat}
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 bg-[#E67E22] hover:bg-[#cf6e1b] text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Steps 1-12: Questions */}
        {step >= 1 && step <= totalQuestions && (
          <div className="max-w-xl w-full space-y-6">
            <div className="text-center space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#E67E22]">
                {categories[questions[step - 1].category]}
              </p>
              <p className="text-sm text-gray-400">
                Question {step} of {totalQuestions}
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              {questions[step - 1].question}
            </h2>
            <div className="space-y-3">
              {questions[step - 1].options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswer(step - 1, option.score)}
                  className="w-full text-left px-6 py-4 rounded-lg border-2 border-white/10 hover:border-[#E67E22] bg-white/5 hover:bg-white/10 transition-all text-lg font-medium"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email Capture */}
        {step === emailStep && (
          <div className="max-w-xl w-full text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold">Your results are ready!</h2>
            <p className="text-lg text-gray-300">
              Enter your info below to see your Practice Score.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Jane Smith"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors"
                  required
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E67E22] hover:bg-[#cf6e1b] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors"
              >
                {submitting ? "Calculating..." : "See My Score"}
                {!submitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
