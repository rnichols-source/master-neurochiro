"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLeadFromCapture } from "@/app/actions/hunter-actions";
import { ArrowRight, CheckCircle, ClipboardList } from "lucide-react";

type Answers = Record<number, number>;

const questions = [
  {
    question: "How long have you been in practice?",
    options: [
      { label: "Still in school", score: 5 },
      { label: "Less than 2 years", score: 10 },
      { label: "2-5 years", score: 15 },
      { label: "5+ years", score: 20 },
    ],
  },
  {
    question: "How many new patients do you see per week?",
    options: [
      { label: "0-5", score: 5 },
      { label: "6-10", score: 10 },
      { label: "11-20", score: 15 },
      { label: "20+", score: 20 },
    ],
  },
  {
    question: "What's your biggest challenge right now?",
    options: [
      { label: "Patient communication", score: 15 },
      { label: "Care plan acceptance", score: 10 },
      { label: "Collections", score: 10 },
      { label: "All of the above", score: 5 },
    ],
  },
  {
    question: "Do you track weekly KPIs?",
    options: [
      { label: "Yes, every week", score: 20 },
      { label: "Sometimes", score: 10 },
      { label: "What are KPIs?", score: 0 },
    ],
  },
  {
    question: "How do you describe your adjusting philosophy?",
    options: [
      { label: "Pain-based", score: 5 },
      { label: "Wellness", score: 10 },
      { label: "Nervous system focused", score: 20 },
      { label: "Not sure yet", score: 5 },
    ],
  },
  {
    question: "Are you open to coaching or a mastermind group?",
    options: [
      { label: "Absolutely", score: 20 },
      { label: "Maybe, tell me more", score: 10 },
      { label: "Not right now", score: 0 },
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
    return Object.values(answers).reduce((sum, s) => sum + s, 0);
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

  const progressPercent = step === 0 ? 0 : Math.min(((step) / 6) * 100, 100);

  return (
    <div className="min-h-screen bg-[#050E1D] text-white flex flex-col">
      {/* Progress bar */}
      {step >= 1 && step <= 6 && (
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
              Answer 6 quick questions and find out where your practice stands
              — and what to fix first.
            </p>
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 bg-[#E67E22] hover:bg-[#cf6e1b] text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Steps 1-6: Questions */}
        {step >= 1 && step <= 6 && (
          <div className="max-w-xl w-full space-y-8">
            <p className="text-sm text-gray-400 text-center">
              Question {step} of 6
            </p>
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

        {/* Step 7: Email Capture */}
        {step === 7 && (
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
