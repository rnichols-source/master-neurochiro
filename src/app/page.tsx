import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton } from "@/components/ui/elite-ui";
import { SEOFooter } from "@/components/layout/seo-footer";
import {
  ArrowRight,
  CheckCircle2,
  Quote,
  TrendingUp,
  ShieldCheck,
  Users,
  Globe,
  Calendar,
  Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import StructuredData from "@/components/layout/StructuredData";

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NeuroChiro Mastermind",
    url: "https://neurochiromastermind.com",
    logo: "https://neurochiromastermind.com/logo-dark.png",
    description:
      "The 8-week chiropractic coaching program. Master patient communication, clinical certainty, and practice growth.",
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
          text: "The NeuroChiro Mastermind is an 8-week coaching program for chiropractors and students to master patient communication, clinical certainty, and practice growth.",
        },
      },
      {
        "@type": "Question",
        name: "How long is the program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The program runs for 8 weeks with live coaching, curriculum, and implementation support.",
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
    <div className="min-h-screen bg-brand-cream">
      <StructuredData data={organizationSchema} />
      <StructuredData data={faqSchema} />
      <MastermindHeader />

      {/* ──────────────── HERO ──────────────── */}
      <section className="pt-28 md:pt-40 pb-20 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-navy tracking-tight leading-[1.05]">
            Communicate With Certainty.{" "}
            <span className="text-brand-orange">Grow Your Practice.</span>
          </h1>

          <p className="text-lg md:text-xl text-brand-gray font-medium leading-relaxed max-w-2xl mx-auto">
            An 8-week coaching program that gives chiropractors and students the
            communication skills, clinical confidence, and practice systems to
            get better patient outcomes and predictable growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/apply">
              <BrandButton
                variant="primary"
                size="lg"
                className="group px-10 py-5"
              >
                Apply Now{" "}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-8 border-t border-brand-navy/5">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-brand-orange" />
              <div>
                <p className="text-lg font-black text-brand-navy">150+</p>
                <p className="text-xs text-brand-gray font-medium">
                  Doctors Trained
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-brand-orange" />
              <div>
                <p className="text-lg font-black text-brand-navy">5</p>
                <p className="text-xs text-brand-gray font-medium">Countries</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-brand-orange" />
              <div>
                <p className="text-lg font-black text-brand-navy">8 Weeks</p>
                <p className="text-xs text-brand-gray font-medium">
                  Start to Finish
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── HOW IT WORKS ──────────────── */}
      <section id="how-it-works" className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
              How It Works
            </h2>
            <p className="text-lg text-brand-gray font-medium max-w-2xl mx-auto">
              A simple, structured program — not another course you&apos;ll never
              finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Apply & Get Accepted",
                desc: "Tell us about your practice or where you are in school. We review every application personally to make sure this is the right fit.",
              },
              {
                step: "02",
                title: "8 Weeks of Live Coaching",
                desc: "Weekly live sessions with Dr. Nichols, step-by-step curriculum, scripts for every patient interaction, and a private community for support.",
              },
              {
                step: "03",
                title: "Transform Your Practice",
                desc: "Walk away with a complete system for patient communication, case presentations, and practice growth you can use for the rest of your career.",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center">
                  <span className="text-lg font-black text-brand-orange">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-black text-brand-navy">
                  {item.title}
                </h3>
                <p className="text-base text-brand-gray font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── RESULTS ──────────────── */}
      <section id="results" className="py-20 md:py-28 px-6 bg-brand-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
              Real Results From Real Doctors
            </h2>
            <p className="text-lg text-brand-gray font-medium max-w-2xl mx-auto">
              Here&apos;s what happens when you stop guessing and start
              communicating with certainty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Dr. Melissa",
                role: "Practicing Chiropractor",
                result: "2x practice revenue",
                quote:
                  "NeuroChiro gave me the breakthrough I needed. My philosophy, language, and recommendations are finally aligned. It completely changed how I communicate with patients — more clarity, stronger communication, and real patient confidence.",
                icon: TrendingUp,
              },
              {
                name: "Dr. Mike",
                role: "Practicing Chiropractor",
                result: "Transformed case presentations",
                quote:
                  "I realized I was talking too much when recommending care because I was uncertain. Through the framework, I learned to speak with certainty, say less, and let the silence work. My recommendations are stronger than ever.",
                icon: ShieldCheck,
              },
            ].map((study) => (
              <div
                key={study.name}
                className="bg-white rounded-2xl p-8 md:p-10 border border-brand-navy/5 shadow-sm space-y-6"
              >
                <Quote className="w-8 h-8 text-brand-orange/20" />

                <p className="text-base md:text-lg font-medium text-brand-navy leading-relaxed italic">
                  &ldquo;{study.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-brand-navy/5">
                  <div>
                    <p className="text-base font-black text-brand-navy">
                      {study.name}
                    </p>
                    <p className="text-sm text-brand-gray font-medium">
                      {study.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-brand-orange/10 rounded-full px-4 py-2">
                    <study.icon className="w-4 h-4 text-brand-orange" />
                    <span className="text-sm font-bold text-brand-orange">
                      {study.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── FOUNDER ──────────────── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-navy max-w-sm mx-auto md:mx-0">
              <Image
                src="/dr-raymond-hero.jpg"
                alt="Dr. Raymond Nichols"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
                Meet Dr. Raymond Nichols
              </h2>
              <p className="text-base text-brand-gray font-medium leading-relaxed">
                After years of watching chiropractors struggle with clinical
                certainty, patient communication, and practice stability, Dr.
                Nichols created the NeuroChiro framework — a practical system for
                communicating the value of chiropractic care without the
                awkwardness or the sales pitch.
              </p>
              <p className="text-base text-brand-gray font-medium leading-relaxed">
                He has trained over 150 doctors across 5 countries, led 100+
                clinical workshops, and built this program to give every
                chiropractor the tools to lead their patients with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── WHAT'S INCLUDED + PRICING ──────────────── */}
      <section id="pricing" className="py-20 md:py-28 px-6 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Everything You Need for $997
            </h2>
            <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto">
              One investment. A complete system you&apos;ll use for the rest of your
              career.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "8 weeks of live group coaching with Dr. Nichols",
                "Step-by-step patient communication curriculum",
                "Proven scripts for every patient interaction",
                "KPI tracking tools and templates",
                "Private mastermind community access",
                "Lifetime access to all session replays",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-sm text-white/40 font-medium mb-1">
                  Enrollment
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-white">$997</span>
                  <span className="text-sm text-white/40 font-medium">
                    or 3 payments of $350
                  </span>
                </div>
              </div>
              <Link href="/apply">
                <BrandButton
                  variant="accent"
                  size="lg"
                  className="group px-10 py-5"
                >
                  Apply Now{" "}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </Link>
            </div>

            <p className="text-sm text-white/30 font-medium text-center">
              Want more hands-on support? We also offer a{" "}
              <Link
                href="/pricing"
                className="text-brand-orange hover:text-white transition-colors underline"
              >
                Pro tier with private coaching
              </Link>
              .
            </p>
          </div>

          {/* Trust Row */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-white/40 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure checkout via Stripe</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Satisfaction guarantee after Week 1</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── FINAL CTA ──────────────── */}
      <section className="py-20 md:py-28 px-6 bg-brand-cream">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
            Ready to Lead With Certainty?
          </h2>
          <p className="text-lg text-brand-gray font-medium leading-relaxed">
            The next cohort starts April 21, 2026. Seats are limited. Apply
            today and we&apos;ll follow up within 48 hours.
          </p>
          <Link href="/apply">
            <BrandButton
              variant="primary"
              size="lg"
              className="group px-10 py-5"
            >
              Apply Now{" "}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </Link>
        </div>
      </section>

      <SEOFooter />
    </div>
  );
}
