"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLeadFromCapture } from "@/app/actions/hunter-actions";
import { ArrowRight, CheckCircle, ClipboardList, Stethoscope, GraduationCap } from "lucide-react";

type Track = "doctor" | "student" | null;
type Answers = Record<number, { label: string; score: number }>;

// ═══ DOCTOR QUESTIONS ═══

const doctorCategories = [
  "Practice Identity & Philosophy",
  "Patient Communication & Case Acceptance",
  "Business Systems & Collections",
  "Growth, Team & Leadership",
];

const doctorQuestions = [
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
    question: "What's your care plan acceptance rate — the percentage of patients who say YES to the full plan?",
    options: [
      { label: "80%+ — I rarely hear 'no'", score: 9 },
      { label: "50-80% — more than half but not consistent", score: 6 },
      { label: "Under 50% — 'I'll think about it' is my most common response", score: 3 },
      { label: "I don't track this number", score: 1 },
    ],
  },
  {
    category: 1,
    question: "When a patient says 'I need to talk to my spouse' or 'Let me think about it' — what happens?",
    options: [
      { label: "I have practiced scripts for each objection and convert most of them", score: 9 },
      { label: "I try to address it but I freeze up or get uncomfortable", score: 4 },
      { label: "I back off — I don't want to be salesy", score: 2 },
      { label: "I've never been trained on objection handling", score: 1 },
    ],
  },
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
    question: "Do you run a daily huddle with your team?",
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

// ═══ STUDENT QUESTIONS ═══

const studentCategories = [
  "Clinical Readiness",
  "Communication & Confidence",
  "Career & Business Knowledge",
  "Professional Development",
];

const studentQuestions = [
  {
    category: 0,
    question: "If a patient asked you to explain what a subluxation is in plain English — could you do it confidently?",
    options: [
      { label: "Yes — I can explain it clearly to anyone", score: 9 },
      { label: "Sort of — I'd use a lot of textbook language", score: 5 },
      { label: "I'd struggle to explain it simply", score: 2 },
    ],
  },
  {
    category: 0,
    question: "How confident are you in your adjusting skills right now?",
    options: [
      { label: "Very — I trust my hands and my analysis", score: 9 },
      { label: "Getting there — I'm okay but not consistent", score: 5 },
      { label: "Not confident — I second-guess myself a lot", score: 2 },
    ],
  },
  {
    category: 0,
    question: "Have you ever practiced a full consultation — start to finish — on a real or simulated patient outside of school requirements?",
    options: [
      { label: "Yes — I've practiced it multiple times on my own", score: 9 },
      { label: "Only what's required in clinic rotations", score: 5 },
      { label: "No — I've never done a full consultation outside of class", score: 2 },
    ],
  },
  {
    category: 1,
    question: "If you had to present a care plan to a patient right now — explain the findings, recommend a plan, and ask them to commit — how would that go?",
    options: [
      { label: "I could do it — I've practiced and I know the framework", score: 9 },
      { label: "I'd be nervous but could get through it", score: 5 },
      { label: "I have no idea how to present a care plan", score: 1 },
    ],
  },
  {
    category: 1,
    question: "How do you handle it when someone questions chiropractic — 'Is it real?' 'My doctor says it doesn't work' 'Isn't that just cracking?'",
    options: [
      { label: "I have confident, rehearsed answers for all of these", score: 9 },
      { label: "I try to respond but I get defensive or freeze up", score: 4 },
      { label: "I avoid the conversation", score: 1 },
    ],
  },
  {
    category: 1,
    question: "Can you clearly explain YOUR chiropractic philosophy — what you believe and why — in 30 seconds or less?",
    options: [
      { label: "Yes — I've written it and practiced it", score: 9 },
      { label: "I have a general idea but couldn't say it on the spot", score: 5 },
      { label: "I don't really have a clear philosophy yet", score: 2 },
    ],
  },
  {
    category: 2,
    question: "Do you know what a typical associate chiropractor earns in their first year?",
    options: [
      { label: "Yes — and I know what a fair contract looks like", score: 9 },
      { label: "I have a rough idea but haven't researched it", score: 5 },
      { label: "No idea — school doesn't teach this", score: 1 },
    ],
  },
  {
    category: 2,
    question: "Do you understand how a chiropractic practice actually makes money — collections, overhead, profit margins?",
    options: [
      { label: "Yes — I understand the business side", score: 9 },
      { label: "Vaguely — I know it involves billing and insurance", score: 4 },
      { label: "Not at all — I just want to adjust people", score: 1 },
    ],
  },
  {
    category: 2,
    question: "Do you have a plan for managing your student loans after graduation?",
    options: [
      { label: "Yes — I have a strategy mapped out", score: 9 },
      { label: "I'll figure it out when I graduate", score: 4 },
      { label: "I try not to think about it", score: 1 },
    ],
  },
  {
    category: 3,
    question: "Do you have a professional presence online — Instagram, LinkedIn, a website — that positions you as a chiropractor?",
    options: [
      { label: "Yes — I post clinical content and it's growing", score: 9 },
      { label: "I have accounts but they're personal, not professional", score: 4 },
      { label: "No — I haven't started building my brand", score: 1 },
    ],
  },
  {
    category: 3,
    question: "Have you connected with practicing chiropractors or clinic owners who could mentor you or hire you?",
    options: [
      { label: "Yes — I have relationships with multiple docs", score: 9 },
      { label: "A few — mostly through school", score: 5 },
      { label: "No — I don't know anyone in practice", score: 2 },
    ],
  },
  {
    category: 3,
    question: "When you picture yourself 1 year after graduation — what do you see?",
    options: [
      { label: "Clear vision — I know where I'll be and what I'll be doing", score: 9 },
      { label: "General idea — probably an associate somewhere", score: 6 },
      { label: "Honestly? I'm anxious and have no plan", score: 2 },
    ],
  },
];

export default function QuizClient() {
  const router = useRouter();
  const [track, setTrack] = useState<Track>(null);
  const [step, setStep] = useState(0); // 0 = intro/track select, 1+ = questions
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const questions = track === "doctor" ? doctorQuestions : studentQuestions;
  const cats = track === "doctor" ? doctorCategories : studentCategories;
  const totalQuestions = questions.length;
  const emailStep = totalQuestions + 1;
  const maxScore = totalQuestions * 9;

  function handleTrackSelect(t: Track) {
    setTrack(t);
    setStep(1);
  }

  function handleAnswer(questionIndex: number, option: { label: string; score: number }) {
    setAnswers((prev) => ({ ...prev, [questionIndex]: option }));
    if (questionIndex + 1 < totalQuestions) {
      setStep(questionIndex + 2);
    } else {
      setStep(emailStep);
    }
  }

  function totalScore() {
    const raw = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
    return Math.round((raw / maxScore) * 100);
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
      Object.entries(answers).forEach(([qIdx, answer]) => {
        const q = questions[Number(qIdx)];
        answerLabels[q.question] = answer.label;
      });

      await createLeadFromCapture({
        name: name.trim(),
        email: email.trim(),
        source: "quiz",
        fit_score: score,
        notes: JSON.stringify({ track, answers: answerLabels }),
      });

      router.push(`/quiz/results?score=${score}&track=${track}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const progressPercent = step === 0 ? 0 : Math.min((step / totalQuestions) * 100, 100);

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#1E2D3B] flex flex-col">
      {/* Progress bar */}
      {track && step >= 1 && step <= totalQuestions && (
        <div className="w-full h-1 bg-[#1E2D3B]/10">
          <div
            className="h-full bg-[#D66829] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {/* Step 0: Track Selection */}
        {!track && (
          <div className="max-w-xl w-full text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D66829]/10 mb-2">
              <ClipboardList className="w-8 h-8 text-[#D66829]" />
            </div>
            <p className="text-sm font-bold text-[#D66829] uppercase tracking-widest">Free Practice Assessment</p>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              Which best describes you?
            </h1>
            <p className="text-lg text-[#1E2D3B]/50 max-w-md mx-auto">
              We&apos;ll tailor your assessment based on where you are in your chiropractic career.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <button
                onClick={() => handleTrackSelect("doctor")}
                className="flex flex-col items-center gap-3 px-6 py-8 rounded-2xl border-2 border-[#1E2D3B]/10 hover:border-[#D66829] bg-white hover:bg-[#D66829]/5 transition-all"
              >
                <Stethoscope className="w-10 h-10 text-[#D66829]" />
                <span className="text-xl font-bold">Practicing Doctor</span>
                <span className="text-sm text-[#1E2D3B]/40">Associate, clinic owner, or practice owner</span>
              </button>
              <button
                onClick={() => handleTrackSelect("student")}
                className="flex flex-col items-center gap-3 px-6 py-8 rounded-2xl border-2 border-[#1E2D3B]/10 hover:border-[#D66829] bg-white hover:bg-[#D66829]/5 transition-all"
              >
                <GraduationCap className="w-10 h-10 text-[#D66829]" />
                <span className="text-xl font-bold">Chiro Student</span>
                <span className="text-sm text-[#1E2D3B]/40">Currently in school or graduated within 1 year</span>
              </button>
            </div>
          </div>
        )}

        {/* Questions */}
        {track && step >= 1 && step <= totalQuestions && (
          <div className="max-w-xl w-full space-y-6">
            <div className="text-center space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D66829]">
                {cats[questions[step - 1].category]}
              </p>
              <p className="text-sm text-[#1E2D3B]/40">
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
                  onClick={() => handleAnswer(step - 1, option)}
                  className="w-full text-left px-6 py-4 rounded-lg border-2 border-[#1E2D3B]/10 hover:border-[#D66829] bg-white hover:bg-[#D66829]/5 transition-all text-lg font-medium"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email Capture */}
        {track && step === emailStep && (
          <div className="max-w-xl w-full text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold">Your results are ready!</h2>
            <p className="text-lg text-[#1E2D3B]/50">
              {track === "doctor"
                ? "Enter your info to see your Practice Score and find out where you stand."
                : "Enter your info to see your Career Readiness Score and find out what to focus on before graduation."}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1E2D3B]/50 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={track === "doctor" ? "Dr. Jane Smith" : "Jane Smith"}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#1E2D3B]/10 text-[#1E2D3B] placeholder-[#1E2D3B]/30 focus:outline-none focus:border-[#D66829]/40 focus:ring-2 focus:ring-[#D66829]/10 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1E2D3B]/50 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={track === "doctor" ? "jane@practice.com" : "jane@student.edu"}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#1E2D3B]/10 text-[#1E2D3B] placeholder-[#1E2D3B]/30 focus:outline-none focus:border-[#D66829]/40 focus:ring-2 focus:ring-[#D66829]/10 transition-colors"
                  required
                />
              </div>
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#D66829] hover:bg-[#c05d24] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors"
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
