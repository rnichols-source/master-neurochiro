import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton } from "@/components/ui/elite-ui";
import { SEOFooter } from "@/components/layout/seo-footer";
import {
  ArrowRight,
  CheckCircle2,
  Quote,
  TrendingUp,
  ShieldCheck,
  Check,
  Play,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import StructuredData from "@/components/layout/StructuredData";
import { FAQSection } from "@/components/ui/faq-section";

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NeuroChiro Mastermind",
    url: "https://neurochiromastermind.com",
    logo: "https://neurochiromastermind.com/logo-dark.png",
    description:
      "The 90-day chiropractic coaching intensive. Master patient communication, clinical certainty, and practice growth.",
    founder: {
      "@type": "Person",
      name: "Dr. Raymond Nichols",
      jobTitle: "Chiropractor and Founder",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the NeuroChiro Mastermind?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The NeuroChiro Mastermind is a 90-day coaching intensive for chiropractors and students to master patient communication, clinical certainty, and practice growth.",
        },
      },
      {
        "@type": "Question",
        name: "How long is the program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The program runs for 90 days with live coaching, curriculum, and implementation support.",
        },
      },
      {
        "@type": "Question",
        name: "Is it suitable for chiropractic students?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We have a dedicated path for students to build clinical authority before graduation.",
        },
      },
    ],
  };

  return (
    <div className="min-h-[100dvh] bg-brand-cream overflow-x-hidden">
      <StructuredData data={organizationSchema} />
      <StructuredData data={faqSchema} />
      <MastermindHeader />

      {/* ──────────────── HERO ──────────────── */}
      <section className="pt-20 md:pt-32 pb-16 md:pb-24 px-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-6 md:space-y-8 text-center md:text-left">
              <div className="space-y-3">
                <p className="text-sm font-bold text-brand-orange uppercase tracking-widest">The Coaching Intensive for Nervous System Chiropractors</p>
                <div className="inline-flex items-center gap-2 bg-brand-navy/5 rounded-full px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-bold text-brand-navy">Cohort 3 starts July 21, 2026 · Applications open</span>
                </div>
              </div>

              <h1 className="text-[2rem] leading-[1.1] md:text-5xl font-black text-brand-navy tracking-tight">
                Stop Losing Patients to{" "}
                <span className="text-brand-orange whitespace-nowrap">&ldquo;I Need to Think About It.&rdquo;</span>
              </h1>

              <p className="text-base md:text-lg text-brand-gray font-medium leading-relaxed">
                The 90-day coaching intensive for chiropractors who want to present care plans with certainty, convert more patients, and collect what they&apos;re worth. Word-for-word scripts, live coaching, and a system you&apos;ll use for the rest of your career.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/apply">
                  <BrandButton
                    variant="primary"
                    size="lg"
                    className="group w-full sm:w-auto px-8 py-4 text-base"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                </Link>
                <Link href="/pricing">
                  <BrandButton
                    variant="outline"
                    size="lg"
                    className="group w-full sm:w-auto px-8 py-4 text-base"
                  >
                    See Pricing
                  </BrandButton>
                </Link>
              </div>

              <p className="text-xs text-brand-gray">
                For practicing chiropractors and students. Students: $197/month · Doctors: $697/month
              </p>
            </div>

            {/* Right: Photo */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-brand-navy max-w-sm mx-auto md:max-w-none shadow-2xl shadow-brand-navy/20">
                <Image
                  src="/dr-raymond-hero.jpg"
                  alt="Dr. Raymond Nichols"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-2xl shadow-lg p-4 border border-brand-navy/5">
                <p className="text-2xl font-black text-brand-navy leading-none">150+</p>
                <p className="text-xs text-brand-gray font-medium mt-0.5">Doctors trained</p>
              </div>
              <div className="absolute -top-2 -right-2 md:-right-6 bg-white rounded-2xl shadow-lg p-4 border border-brand-navy/5">
                <p className="text-2xl font-black text-brand-orange leading-none">90</p>
                <p className="text-xs text-brand-gray font-medium mt-0.5">Day Intensive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SOCIAL PROOF BAR ──────────────── */}
      <section className="py-6 md:py-8 px-5 md:px-6 bg-brand-navy">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { number: "150+", label: "Doctors Trained" },
            { number: "5", label: "Countries" },
            { number: "30 Max", label: "Per Cohort" },
            { number: "100+", label: "Workshops Led" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl md:text-2xl font-black text-white leading-none">{stat.number}</p>
              <p className="text-xs text-white/50 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────── WHAT YOU'LL LEARN ──────────────── */}
      <section id="how-it-works" className="py-16 md:py-28 px-5 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
              The 90-Day Framework: Learn. Build. Prove.
            </h2>
            <p className="text-base text-brand-gray font-medium mt-3">
              Not theory. A step-by-step system you practice on real patients starting week 1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { stage: "1", title: "LEARN (Weeks 1-8)", desc: "Master your identity, communication, care plans, and business systems through our proven 8-module curriculum with weekly coaching calls." },
              { stage: "2", title: "BUILD (Weeks 9-10)", desc: "Implement everything on real patients. Submit recordings. Get live feedback. Install your KPI tracking system." },
              { stage: "3", title: "PROVE (Weeks 11-13)", desc: "Show us the numbers. Compare your KPIs to baseline. Hot seats, coaching, and graduation into the Inner Circle." },
            ].map((item) => (
              <div key={item.stage} className="group flex gap-4 p-5 rounded-2xl border border-brand-navy/5 bg-white hover:bg-brand-cream/50 hover:border-brand-orange/20 transition-all">
                <div className="w-11 h-11 rounded-xl bg-brand-orange text-white flex items-center justify-center shrink-0">
                  <span className="text-sm font-black">{item.stage}</span>
                </div>
                <div>
                  <p className="text-sm font-black text-brand-navy">{item.title}</p>
                  <p className="text-sm text-brand-gray font-medium mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── RESULTS ──────────────── */}
      <section id="results" className="py-16 md:py-28 px-5 md:px-6 bg-brand-cream">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
              Real Results From Real Doctors
            </h2>
            <p className="text-base text-brand-gray font-medium mt-3">
              Here&apos;s what happens when you stop guessing and start communicating with certainty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Dr. Melissa",
                role: "Practicing Chiropractor",
                result: "2x revenue",
                quote:
                  "NeuroChiro gave me the breakthrough I needed. My philosophy, language, and recommendations are finally aligned. It completely changed how I communicate with patients — more clarity, stronger communication, and real patient confidence.",
              },
              {
                name: "Dr. Mike",
                role: "Practicing Chiropractor",
                result: "Case presentations transformed",
                quote:
                  "I realized I was talking too much when recommending care because I was uncertain. Through the framework, I learned to speak with certainty, say less, and let the silence work. My recommendations are stronger than ever.",
              },
            ].map((study) => (
              <div
                key={study.name}
                className="bg-white rounded-2xl border border-brand-navy/5 shadow-sm overflow-hidden"
              >
                {/* Result banner */}
                <div className="bg-brand-navy px-6 py-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-orange" />
                  <span className="text-sm font-bold text-white">{study.result}</span>
                </div>

                <div className="p-6 md:p-8 space-y-5">
                  <p className="text-base font-medium text-brand-navy leading-relaxed italic">
                    &ldquo;{study.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-brand-navy/5">
                    <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-sm font-black text-white shrink-0">
                      {study.name.split(" ")[1]?.[0] || study.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-brand-navy">{study.name}</p>
                      <p className="text-xs text-brand-gray font-medium">{study.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── ABOUT DR. NICHOLS ──────────────── */}
      <section className="py-16 md:py-28 px-5 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-brand-cream rounded-3xl p-6 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
              <div className="md:col-span-2">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-navy max-w-xs mx-auto">
                  <Image
                    src="/dr-raymond-hero.jpg"
                    alt="Dr. Raymond Nichols"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="md:col-span-3 space-y-4">
                <p className="text-xs font-bold text-brand-orange">Your Coach</p>
                <h2 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
                  Dr. Raymond Nichols
                </h2>
                <p className="text-base text-brand-gray font-medium leading-relaxed">
                  After years of watching chiropractors struggle with clinical
                  certainty, patient communication, and practice stability, Dr.
                  Nichols created the NeuroChiro framework — a practical system for
                  communicating the value of chiropractic care without the
                  awkwardness or the sales pitch.
                </p>
                <p className="text-base text-brand-gray font-medium leading-relaxed">
                  150+ doctors trained. 100+ workshops. 5 countries. This program
                  gives every chiropractor the tools to lead their patients with
                  confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── PRICING ──────────────── */}
      <section id="pricing" className="py-16 md:py-28 px-5 md:px-6 bg-brand-navy text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-3">
            Everything You Need for $697/month
          </h2>
          <p className="text-base text-white/50 font-medium mb-10 md:mb-14">
            One investment. A complete system you&apos;ll use for the rest of your career.
          </p>

          <div className="bg-white rounded-3xl p-6 md:p-10 text-left space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "13 weekly coaching calls (30 seats per cohort)",
                "38 ready-to-use patient communication scripts",
                "12 practice tools (KPI tracker, calculators, and more)",
                "Word-for-word scripts for Day 1, care plans, and objections",
                "Weekly KPI tracking with personalized benchmarks",
                "Lifetime access to all replays and resources",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-navy font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-navy/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-brand-navy">$697/month</span>
                  <span className="text-sm text-brand-gray font-medium">&times; 3 months (or $1,797 pay-in-full)</span>
                </div>
              </div>
              <Link href="/apply" className="w-full sm:w-auto">
                <BrandButton
                  variant="primary"
                  size="lg"
                  className="group w-full sm:w-auto px-10 py-4 text-base"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </Link>
            </div>

            <p className="text-xs text-brand-gray text-center">
              Student Intensive: $197/month. <Link href="/pricing" className="text-brand-orange hover:text-brand-navy transition-colors underline">See all options</Link>.
            </p>
            <p className="text-xs text-brand-orange font-bold text-center">
              Cohort 3 starts July 21 — <Link href="/apply" className="underline hover:text-brand-navy transition-colors">applications open now</Link>.
            </p>
            <p className="text-xs text-brand-gray text-center pt-2">
              Not sure yet?{" "}
              <a href="https://calendly.com/drray-neurochirodirectory/15min" target="_blank" rel="noopener noreferrer" className="text-brand-orange underline hover:text-white transition-colors">
                Book a free 15-min call with Dr. Nichols
              </a>
            </p>
          </div>

          {/* Trust */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 text-sm text-white/40 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure checkout via Stripe</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>70% acceptance guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── INNER CIRCLE ──────────────── */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-brand-cream">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-bold text-brand-orange uppercase tracking-wide">After the Intensive</p>
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            The NeuroChiro Inner Circle
          </h2>
          <p className="text-base text-brand-gray font-medium leading-relaxed max-w-xl mx-auto">
            $397/month ongoing coaching, community, and accountability for graduates.
          </p>
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section className="py-16 md:py-28 px-5 md:px-6 bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-12 space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
              Common Questions
            </h2>
            <p className="text-base text-brand-gray font-medium">
              Everything you need to know before applying.
            </p>
          </div>
          <FAQSection />
        </div>
      </section>

      {/* ──────────────── FINAL CTA ──────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-navy rounded-3xl p-8 md:p-14 text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Ready to Lead With Certainty?
            </h2>
            <p className="text-base text-white/60 font-medium leading-relaxed max-w-xl mx-auto">
              The next cohort starts July 21, 2026. Only 30 seats per group. Apply today and we&apos;ll follow up within 48 hours.
            </p>
            <Link href="/apply" className="block sm:inline-block">
              <BrandButton
                variant="accent"
                size="lg"
                className="group w-full sm:w-auto px-10 py-5 text-base"
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
          </div>
        </div>
      </section>

      <SEOFooter />
    </div>
  );
}
