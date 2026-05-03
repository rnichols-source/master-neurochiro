"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton } from "@/components/ui/elite-ui";
import { submitWaitlist } from "@/app/actions/waitlist-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  ChevronDown,
  Video,
  BookOpen,
  FileText,
  Calculator,
  BarChart3,
  Users,
  Play,
  Target,
  Lock,
  ShieldCheck,
  Star,
  Calendar,
  DollarSign,
  MessageSquare,
  Zap,
} from "lucide-react";

/* ─── Data Arrays ─── */

const features = [
  { icon: Video, title: "13 Weekly Coaching Calls", desc: "90 days of live calls with Dr. Nichols. Ask anything. Get answers." },
  { icon: BookOpen, title: "12 Comprehensive Playbooks", desc: "3,700+ lines of word-for-word scripts for every patient interaction." },
  { icon: FileText, title: "Weekly Worksheets", desc: "Apply what you learn immediately. 13 interactive worksheets." },
  { icon: Calculator, title: "Care Plan Builder", desc: "Build and present care plans with clinical scoring. Use with real patients." },
  { icon: DollarSign, title: "Financial Dashboard", desc: "Break-even, scenarios, income goals. 7 sections. Know your numbers." },
  { icon: Target, title: "Daily Huddle", desc: "5-tab command center you open every morning. Pulse, schedule, flags, game plan." },
  { icon: BarChart3, title: "KPI Tracker", desc: "Track visits, new patients, collections, and case acceptance weekly." },
  { icon: Users, title: "Private Community", desc: "Post wins, ask questions, connect with other doctors in the program." },
  { icon: Play, title: "Lifetime Replay Access", desc: "Every call recorded. Watch anytime, forever." },
];

const weeks = [
  { num: 1, title: "Identity of a Nervous System Doctor", hook: "Show up with certainty from the moment they walk in" },
  { num: 2, title: "Chiropractic Neurology for REAL Practice", hook: "Explain findings so patients actually get it" },
  { num: 3, title: "Communication Mastery", hook: "Scripts that get patients to say yes" },
  { num: 4, title: "Philosophy (Modern + Powerful)", hook: "Talk about chiropractic without sounding outdated" },
  { num: 5, title: "Business: What School NEVER Taught You", hook: "Know your numbers. Get profitable." },
  { num: 6, title: "Care Plans, Day 1 / Day 2 Mastery", hook: "Master consultations and report of findings" },
  { num: 7, title: "Patient Management & Long-Term Clinical Leadership", hook: "Keep patients through their whole plan" },
  { num: 8, title: "Ownership, Contracts & Scaling", hook: "Contracts, associates, and scaling your practice" },
];

const proFeatures = [
  "Two Private 1:1 Coaching Calls with Dr. Nichols",
  "Direct Messaging — text Dr. Nichols anytime inside the portal",
  "Script Reviews — submit your scripts, get personal written feedback",
  "Practice Scorecard — monthly performance report with group benchmarks",
  "Pro Resource Vault — 15 premium documents (contracts, marketing, systems, financial tools)",
];

const testimonials = [
  { quote: "My revenue doubled during the program.", name: "Dr. Melissa", role: "Practicing Chiropractor" },
  { quote: "I finally know how to recommend care without feeling awkward.", name: "Dr. Mike", role: "Practicing Chiropractor" },
  { quote: "The playbooks alone were worth the investment. I use them every single day.", name: "Dr. Andrew", role: "Clinic Owner" },
];

const pricing = [
  { tier: "Doctor Intensive (90 Days)", early: "$697/mo", plan: "× 3 months or $1,797 PIF", regular: "$697/mo", regPlan: "× 3 months" },
  { tier: "Student Intensive (90 Days)", early: "$197/mo", plan: "× 3 months or $497 PIF", regular: "$197/mo", regPlan: "× 3 months" },
  { tier: "Doctor Inner Circle (Ongoing)", early: "$397/mo", plan: "after graduation", regular: "$397/mo", regPlan: "month-to-month" },
  { tier: "Student Inner Circle (Ongoing)", early: "$97/mo", plan: "after graduation", regular: "$97/mo", regPlan: "month-to-month" },
];

const faqs = [
  { q: "When does Cohort 3 start?", a: "July 21, 2026. Waitlist members get 48-hour early access before anyone else." },
  { q: "What if I'm a student with no practice yet?", a: "Perfect. Our Foundations Intensive is built specifically for students. You'll graduate with scripts, systems, and clinical confidence that most doctors take years to develop. Student pricing is $197/month." },
  { q: "How long is the program?", a: "The Intensive is 90 days (13 weeks). Weeks 1-8 are curriculum, Weeks 9-10 are implementation, Weeks 11-13 are results review. After that, you can join the Inner Circle for ongoing coaching at a lower monthly rate." },
  { q: "How much time does this take per week?", a: "1 live call per week (60-90 min) plus 15-30 min for the worksheet. About 2 hours/week total." },
  { q: "What's the Inner Circle?", a: "After you complete the 90-Day Intensive, you can stay on as an Inner Circle member. Monthly group call, community, content drops, and accountability — $397/month for doctors, $97/month for students. Month-to-month, cancel anytime." },
  { q: "What if I can't make a live call?", a: "Every call is recorded and available in your portal within 24 hours. Watch on your own time, forever." },
  { q: "Is there a guarantee?", a: "Yes. For doctors: hit 70% care plan acceptance or stay in the program free until you do. For students: feel confident presenting a care plan by Day 90 or stay free. Both guarantees are conditional — you have to do the work (attend calls, submit KPIs, implement)." },
  { q: "I have more questions.", a: "Book a free 15-minute call with Dr. Nichols to discuss your practice and see if the Mastermind is right for you." },
];

/* ─── Component ─── */

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    current_role: "",
    biggest_struggle: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.phone ||
      !formData.current_role
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    const result = await submitWaitlist(formData);
    setIsSubmitting(false);

    if (result.success) {
      router.push("/waitlist/confirmation");
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-[100dvh]">
      <MastermindHeader />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — Hero (bg-brand-cream)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-brand-cream py-16 md:py-24 px-5 md:px-6 pt-28 md:pt-40">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            <span className="text-sm font-bold text-brand-orange">
              Cohort 3 forming now — only 50 spots
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-navy tracking-tight leading-tight mb-6">
            Stop Second-Guessing Yourself.<br className="hidden md:block" />
            Start Leading Your Practice.
          </h1>

          <p className="text-lg md:text-xl text-brand-gray font-medium leading-relaxed max-w-3xl mx-auto mb-8">
            The NeuroChiro Mastermind is a 90-day coaching intensive that gives you the
            scripts, systems, and confidence to communicate like a pro, present care plans
            patients actually accept, and build the practice you were trained for.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <BrandButton
              variant="accent"
              className="py-4 px-8 text-base group"
              onClick={scrollToForm}
            >
              Join the Waitlist — Lock in Early Pricing
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </div>

          <div className="flex flex-wrap gap-6 justify-center text-sm text-brand-gray font-medium">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              Results guarantee — or stay free
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-orange" />
              13 weeks of live coaching
            </span>
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-orange" />
              Waitlist locks in lowest price
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — Problem (bg-brand-navy)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-brand-navy text-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            Sound Familiar?
          </h2>
          <p className="text-white/60 text-center text-base md:text-lg mb-12 max-w-2xl mx-auto">
            Most chiropractors weren&apos;t taught how to communicate, lead, or run a business. That&apos;s not your fault. But it is your problem.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              "You know the adjustment works — but patients still drop off after 3 visits.",
              "You dread the money conversation and discount your care to avoid it.",
              "You graduated with clinical skills but zero business training.",
              "You watch other doctors grow while you stay stuck at the same numbers.",
              "You second-guess your recommendations because you don't have the right words.",
              "You're working harder than ever but not seeing it in your bank account.",
            ].map((pain, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <p className="text-white/90 font-medium leading-relaxed">{pain}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl md:text-2xl font-black text-brand-orange">
              The Mastermind fixes all of it.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — Features (bg-brand-cream)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-brand-cream py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy text-center mb-4">
            Everything You Get
          </h2>
          <p className="text-brand-gray text-center text-base md:text-lg mb-12 max-w-2xl mx-auto">
            Not a course. A complete operating system for your practice.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-brand-navy/5"
              >
                <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="font-bold text-brand-navy mb-1">{f.title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — Curriculum (bg-white)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy text-center mb-4">
            The 90-Day Curriculum
          </h2>
          <p className="text-brand-gray text-center text-base md:text-lg mb-12 max-w-2xl mx-auto">
            Each week builds on the last. By Week 8, you&apos;ll run your practice with a completely different level of clarity and confidence.
          </p>

          <div className="space-y-4">
            {weeks.map((w) => (
              <div
                key={w.num}
                className="flex items-start gap-4 bg-brand-cream rounded-2xl p-5 md:p-6"
              >
                <div className="w-10 h-10 shrink-0 rounded-full bg-brand-orange flex items-center justify-center">
                  <span className="text-white font-black text-sm">{w.num}</span>
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy">{w.title}</h3>
                  <p className="text-sm text-brand-gray mt-1">{w.hook}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — Pro Tier (bg-brand-navy)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-brand-navy text-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/20 rounded-full mb-4">
              <Zap className="w-4 h-4 text-brand-orange" />
              <span className="text-sm font-bold text-brand-orange">Pro Upgrade</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black mb-4">
              Want Direct Access to Dr. Nichols?
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
              Pro members get everything in Standard — plus private coaching, direct messaging, and premium resources. This is the fastest path to results.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {proFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white/5 rounded-2xl p-5 border border-white/10"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-white/90 font-medium">{feature}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <BrandButton
              variant="accent"
              className="py-4 px-8 text-base group"
              onClick={scrollToForm}
            >
              Join the Waitlist — Includes Pro Option
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — Testimonials (bg-brand-cream)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-brand-cream py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy text-center mb-12">
            What Doctors Are Saying
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-brand-navy/5"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <p className="text-brand-navy font-medium leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-brand-navy">{t.name}</p>
                  <p className="text-sm text-brand-gray">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — Pricing (bg-white)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy text-center mb-4">
            Waitlist Pricing
          </h2>
          <p className="text-brand-gray text-center text-base md:text-lg mb-12 max-w-2xl mx-auto">
            Waitlist members lock in early bird pricing — the same rates as Cohort 2, before the price increase.
          </p>

          <div className="bg-brand-cream border border-brand-navy/10 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div />
              <div>
                <p className="text-xs font-bold text-brand-orange uppercase tracking-wide mb-1">
                  Early Bird
                </p>
                <p className="text-[10px] text-brand-gray font-medium">
                  (Waitlist Only)
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-wide mb-1">
                  Regular
                </p>
                <p className="text-[10px] text-brand-gray font-medium">
                  (After Waitlist)
                </p>
              </div>
            </div>
            <div className="border-t border-brand-navy/5 mt-3" />
            {pricing.map((row) => (
              <div
                key={row.tier}
                className="grid grid-cols-3 gap-4 text-center py-3 border-b border-brand-navy/5 last:border-0"
              >
                <p className="text-sm font-bold text-brand-navy text-left">
                  {row.tier}
                </p>
                <div>
                  <p className="text-sm font-black text-brand-orange">{row.early}</p>
                  <p className="text-xs text-brand-orange/60 font-medium">{row.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-brand-gray line-through">{row.regular}</p>
                  <p className="text-xs text-brand-gray/40 line-through">{row.regPlan}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <BrandButton
              variant="accent"
              className="py-4 px-8 text-base group"
              onClick={scrollToForm}
            >
              Reserve My Spot Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — FAQ (bg-brand-cream)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-brand-cream py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-brand-navy/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                >
                  <span className="font-bold text-brand-navy pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-gray shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <p className="text-brand-gray leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9 — Waitlist Form (bg-brand-navy)
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="waitlist-form"
        className="bg-brand-navy text-white py-16 md:py-24 px-5 md:px-6"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black mb-4">
              Reserve Your Spot for Cohort 3
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
              Waitlist members get 48-hour early access and the lowest price. No payment required today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">
                Full Name <span className="text-brand-orange">*</span>
              </label>
              <input
                type="text"
                autoComplete="name"
                enterKeyHint="next"
                placeholder="Dr. Jane Smith"
                value={formData.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-base font-medium text-white placeholder:text-white/30 focus:border-brand-orange/60 focus:ring-2 focus:ring-brand-orange/20 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">
                Email <span className="text-brand-orange">*</span>
              </label>
              <input
                type="email"
                autoComplete="email"
                enterKeyHint="next"
                inputMode="email"
                placeholder="doctor@practice.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-base font-medium text-white placeholder:text-white/30 focus:border-brand-orange/60 focus:ring-2 focus:ring-brand-orange/20 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">
                Phone <span className="text-brand-orange">*</span>
              </label>
              <input
                type="tel"
                autoComplete="tel"
                enterKeyHint="next"
                inputMode="tel"
                placeholder="555-555-5555"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-base font-medium text-white placeholder:text-white/30 focus:border-brand-orange/60 focus:ring-2 focus:ring-brand-orange/20 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">
                I am currently a: <span className="text-brand-orange">*</span>
              </label>
              <select
                value={formData.current_role}
                onChange={(e) => handleChange("current_role", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-base font-medium text-white focus:border-brand-orange/60 focus:ring-2 focus:ring-brand-orange/20 transition-all appearance-none outline-none"
              >
                <option value="" className="text-brand-navy">Select one...</option>
                <option value="Practicing Doctor" className="text-brand-navy">Practicing Doctor</option>
                <option value="Chiropractic Student" className="text-brand-navy">Chiropractic Student</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">
                What&apos;s the #1 thing you want to improve?
              </label>
              <textarea
                rows={3}
                enterKeyHint="done"
                placeholder="e.g. Patient communication, case acceptance, confidence in recommendations..."
                value={formData.biggest_struggle}
                onChange={(e) => handleChange("biggest_struggle", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-base font-medium text-white placeholder:text-white/30 focus:border-brand-orange/60 focus:ring-2 focus:ring-brand-orange/20 transition-all outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <BrandButton
                variant="accent"
                type="submit"
                className="w-full py-5 group text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Reserve My Spot
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </BrandButton>

              <p className="text-center text-sm text-white/40 font-medium mt-4">
                You&apos;ll get first access when enrollment opens. No commitment until you&apos;re ready.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10 — Footer (bg-brand-cream)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-brand-cream py-16 md:py-24 px-5 md:px-6 pb-32 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-navy font-black text-lg md:text-xl mb-2">
            NeuroChiro Mastermind
          </p>
          <p className="text-brand-gray text-sm mb-6">
            Built by Dr. Raymond Nichols for chiropractors who want to lead, not just adjust.
          </p>
          <div className="flex justify-center gap-6 text-sm text-brand-gray">
            <Link href="/privacy" className="hover:text-brand-navy transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-navy transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-brand-navy transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Mobile Sticky CTA
      ═══════════════════════════════════════════════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-navy/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.15)] p-4 safe-bottom z-40">
        <BrandButton
          variant="accent"
          type="button"
          className="w-full py-5 group text-base"
          disabled={isSubmitting}
          onClick={scrollToForm}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Reserve My Spot
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </BrandButton>
      </div>
    </div>
  );
}
