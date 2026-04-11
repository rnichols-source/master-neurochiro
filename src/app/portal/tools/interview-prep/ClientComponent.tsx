"use client";

import Link from "next/link";

const theirQuestions = [
  { q: "Tell me about yourself.", tip: "Keep it under 60 seconds. Name, school, graduation date, what excites you about chiropractic, and why you're interested in THIS practice specifically." },
  { q: "Why do you want to be a chiropractor?", tip: "Be genuine. Share the moment or experience that made you choose this path. Avoid generic answers like 'I want to help people.'" },
  { q: "What technique are you most comfortable with?", tip: "Be honest about what you know. Then add: 'I'm also eager to learn whatever techniques you use here — I'm very coachable.'" },
  { q: "How do you handle a patient who doesn't want to follow the care plan?", tip: "Show you understand the scripts: 'I'd ask what specifically concerns them — is it the time, the cost, or something else? Then address that specific concern.'" },
  { q: "What are your salary expectations?", tip: "Research first. Say: 'Based on what I've seen for associate positions in this area, I'm expecting $X-$Y. But I'm more interested in the opportunity to grow and learn here.'" },
  { q: "Where do you see yourself in 5 years?", tip: "Be honest but not threatening. 'I want to become an excellent clinician first. Long-term, I'd love to have my own practice, but right now I want to learn from someone experienced.'" },
  { q: "What's your biggest weakness?", tip: "Pick something real but manageable: 'I tend to over-explain things to patients. I'm working on being more concise and letting silence do the work.'" },
  { q: "Can you start seeing patients immediately?", tip: "Be confident: 'Yes. I may need guidance on your specific systems and flow, but I'm ready to see patients from day one.'" },
];

const yourQuestions = [
  "How many patients would I see per day in the first month? After 6 months?",
  "What does a typical day look like for the associate here?",
  "Is the compensation base salary, production-based, or a mix?",
  "What mentorship or training do you provide for new associates?",
  "How long did your last associate stay? Why did they leave?",
  "What are your expectations for me in the first 90 days?",
  "Will I be presenting my own care plans, or do you handle that?",
  "Is there a path to partnership or ownership here?",
];

export function InterviewPrepClient() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Interview Prep</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">The questions they'll ask you — and the questions you should ask them.</p>
      </div>

      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm">
        <p className="text-sm font-bold text-brand-navy mb-4">Questions They'll Ask You</p>
        <div className="space-y-4">
          {theirQuestions.map((item, i) => (
            <div key={i} className="border-b border-brand-navy/5 pb-4 last:border-0 last:pb-0">
              <p className="text-sm font-black text-brand-navy mb-1">"{item.q}"</p>
              <p className="text-sm text-brand-gray font-medium">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm">
        <p className="text-sm font-bold text-brand-navy mb-4">Questions You Should Ask Them</p>
        <div className="space-y-3">
          {yourQuestions.map((q, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 text-xs font-bold text-brand-orange mt-0.5">{i + 1}</span>
              <p className="text-sm font-medium text-brand-navy">{q}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-navy/5 border-l-4 border-l-brand-orange rounded-2xl p-5">
        <p className="text-sm font-bold text-brand-navy">Pro tip: Ask question #5 ("How long did your last associate stay?"). Their answer tells you everything about whether this is a good place to work.</p>
      </div>
    </div>
  );
}
