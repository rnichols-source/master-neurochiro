import { Metadata } from "next";
import Link from "next/link";
import { STUDENT_TRACK_NAME, STUDENT_SUBTITLE } from "@/lib/above-atlas";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Above Atlas for Students | 12-Week Workshop Intensive",
  description:
    "A 12-week intensive for chiropractic students who want to graduate ready, not guessing. Identity-first, rep-based. From student mode to doctor mode.",
};

export default function StudentsPage() {
  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: "#F2EDE4" }}>
      {/* Header */}
      <header className="px-6 py-6 md:py-8 max-w-5xl mx-auto flex items-center justify-between">
        <img
          src="/above-atlas-logo/above-atlas-horizontal.svg"
          alt="Above Atlas"
          className="h-8 md:h-10"
        />
        <Link
          href="/apply"
          className="text-xs font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-lg transition-colors"
          style={{ backgroundColor: "#12213A", color: "#F2EDE4" }}
        >
          Apply
        </Link>
      </header>

      {/* Hero */}
      <section className="px-6 pt-16 md:pt-28 pb-16 md:pb-24 max-w-3xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A" }}
        >
          {STUDENT_TRACK_NAME}
        </p>
        <h1
          className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6"
          style={{ color: "#101010" }}
        >
          Nobody is going to give you permission to be a doctor. You have to
          take it.
        </h1>
        <p
          className="text-base md:text-lg font-medium leading-relaxed max-w-2xl"
          style={{ color: "#12213A", opacity: 0.7 }}
        >
          {STUDENT_SUBTITLE}
        </p>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* The Problem */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A", opacity: 0.4 }}
        >
          The Problem
        </p>
        <h2
          className="text-2xl md:text-4xl font-black tracking-tight leading-[1.15] mb-8"
          style={{ color: "#101010" }}
        >
          School teaches you how to pass boards. It does not teach you how to be
          a doctor.
        </h2>
        <div
          className="space-y-5 text-base md:text-lg font-medium leading-relaxed"
          style={{ color: "#101010", opacity: 0.75 }}
        >
          <p>
            You can name every nerve root. You can palpate a subluxation. You
            have spent years learning the science. But the moment you walk into
            a room with a real patient, the gap between knowing and doing feels
            enormous.
          </p>
          <p>
            How do you tell someone they need a $3,000 care plan? How do you
            handle the spouse who thinks chiropractic is a scam? How do you
            present with the kind of certainty that makes people trust you with
            their health?
          </p>
          <p>
            Nobody teaches this. Not in school. Not in a weekend technique
            class. You are expected to figure it out on your own, and most
            doctors spend the first five years stumbling through it.
          </p>
          <p>
            You do not have to.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* What This Is */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A", opacity: 0.4 }}
        >
          What This Is
        </p>
        <h2
          className="text-2xl md:text-4xl font-black tracking-tight leading-[1.15] mb-8"
          style={{ color: "#101010" }}
        >
          12 weeks to go from student mode to doctor mode.
        </h2>
        <div
          className="space-y-5 text-base md:text-lg font-medium leading-relaxed"
          style={{ color: "#101010", opacity: 0.75 }}
        >
          <p>
            Above Atlas for Students is a 12-week workshop intensive designed
            for chiropractic students in their final two years and new graduates
            under one year out.
          </p>
          <p>
            You do not need patients yet. You will practice through role-play,
            video submissions, and live coaching. By the time you see your first
            real patient, the words will already be there.
          </p>
          <p>
            This is not passive learning. Every week you turn in a rep. A
            recorded care plan presentation. A script you practiced out loud. A
            Day 1 walkthrough. If you did not do the work, there is nothing to
            coach.
          </p>
          <p>
            The goal is simple: walk out of this program knowing exactly what to
            say, when to say it, and why it matters. Before your career even
            starts.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* How It Works */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A", opacity: 0.4 }}
        >
          How It Works
        </p>
        <h2
          className="text-2xl md:text-4xl font-black tracking-tight leading-[1.15] mb-12"
          style={{ color: "#101010" }}
        >
          Five steps. No mystery.
        </h2>

        <div className="space-y-10">
          {[
            {
              step: "01",
              title: "Apply",
              desc: "Submit a short application. Tell us where you are in school, what kind of doctor you want to be, and why now.",
            },
            {
              step: "02",
              title: "Get approved",
              desc: "If it is a fit, you are in. We keep the cohort small so every student gets direct attention.",
            },
            {
              step: "03",
              title: "12 weekly workshops",
              desc: "Live group coaching on a separate student track. You learn the systems, scripts, and frameworks before you need them in the real world.",
            },
            {
              step: "04",
              title: "Turn in your rep",
              desc: "Every week you record yourself practicing. A care plan presentation, a Day 1 script, a report of findings. Dr. Nichols reviews it and gives direct feedback.",
            },
            {
              step: "05",
              title: "Graduate ready",
              desc: "By week 12, you will have presented dozens of care plans via role-play. You will know your scripts cold. You will walk into your first job or your first practice with certainty, not hope.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-6 md:gap-8">
              <div
                className="text-2xl md:text-3xl font-black tracking-tight shrink-0 w-12"
                style={{ color: "#12213A", opacity: 0.15 }}
              >
                {item.step}
              </div>
              <div>
                <h3
                  className="text-lg md:text-xl font-black tracking-tight mb-2"
                  style={{ color: "#101010" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-base font-medium leading-relaxed"
                  style={{ color: "#101010", opacity: 0.7 }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* Pricing */}
      <section className="px-6 py-16 md:py-24 max-w-4xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A", opacity: 0.4 }}
        >
          Investment
        </p>
        <h2
          className="text-2xl md:text-4xl font-black tracking-tight leading-[1.15] mb-12"
          style={{ color: "#101010" }}
        >
          Built for student budgets.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Foundations Intensive */}
          <div
            className="rounded-2xl p-8 md:p-10 border flex flex-col"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(18,33,58,0.1)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#12213A" }}
            >
              Start Here
            </p>
            <h3
              className="text-xl md:text-2xl font-black tracking-tight mb-1"
              style={{ color: "#101010" }}
            >
              Foundations Workshop
            </h3>
            <p
              className="text-sm font-medium mb-6"
              style={{ color: "#101010", opacity: 0.5 }}
            >
              Learn. Build. Prove.
            </p>
            <div className="flex items-baseline gap-1 mb-1">
              <span
                className="text-sm font-black"
                style={{ color: "#101010", opacity: 0.3 }}
              >
                $
              </span>
              <span
                className="text-4xl md:text-5xl font-black tracking-tight"
                style={{ color: "#101010" }}
              >
                197
              </span>
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "#101010", opacity: 0.5 }}
            >
              /month x 3 months
            </p>
            <p
              className="text-sm font-bold mb-8"
              style={{ color: "#12213A" }}
            >
              or $497 pay-in-full (save $94)
            </p>
            <div className="space-y-3 flex-1 mb-8">
              {[
                "13 weekly coaching calls (student track)",
                "Student-specific clinical curriculum",
                "Day 1 and Day 2 scripts, practiced via role-play",
                "Interview prep and resume building",
                "Career planning and associate contract review",
                "Build your professional brand before graduation",
                "Private student community",
                "Video submission feedback from Dr. Nichols",
                "Guarantee: confident presenting a care plan by Day 90 or stay free",
              ].map((feat) => (
                <div key={feat} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(18,33,58,0.06)" }}
                  >
                    <Check className="w-3 h-3" style={{ color: "#12213A" }} />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#101010", opacity: 0.75 }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/apply"
              className="block w-full text-center text-sm font-bold uppercase tracking-[0.15em] px-6 py-4 rounded-xl transition-all"
              style={{ backgroundColor: "#12213A", color: "#F2EDE4" }}
            >
              Apply as Student
            </Link>
            <p
              className="text-xs text-center font-medium mt-3"
              style={{ color: "#101010", opacity: 0.35 }}
            >
              Open enrollment
            </p>
          </div>

          {/* Student Inner Circle */}
          <div
            className="rounded-2xl p-8 md:p-10 border flex flex-col"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(18,33,58,0.06)",
              opacity: 0.8,
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#12213A", opacity: 0.5 }}
            >
              After Graduation
            </p>
            <h3
              className="text-xl md:text-2xl font-black tracking-tight mb-1"
              style={{ color: "#101010" }}
            >
              Student Inner Circle
            </h3>
            <p
              className="text-sm font-medium mb-6"
              style={{ color: "#101010", opacity: 0.5 }}
            >
              For Foundations graduates only.
            </p>
            <div className="flex items-baseline gap-1 mb-1">
              <span
                className="text-sm font-black"
                style={{ color: "#101010", opacity: 0.3 }}
              >
                $
              </span>
              <span
                className="text-4xl md:text-5xl font-black tracking-tight"
                style={{ color: "#101010" }}
              >
                97
              </span>
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "#101010", opacity: 0.5 }}
            >
              /month
            </p>
            <p
              className="text-sm font-bold mb-8"
              style={{ color: "#12213A", opacity: 0.6 }}
            >
              Month-to-month. Cancel anytime.
            </p>
            <div className="space-y-3 flex-1 mb-8">
              {[
                "Bi-weekly student group call",
                "Job board access and placement support",
                "Community with working new grads",
                "Script library and career resources",
                "Resume review on request",
                "Path to Doctor Intensive when you open your practice",
              ].map((feat) => (
                <div key={feat} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(18,33,58,0.04)" }}
                  >
                    <Check
                      className="w-3 h-3"
                      style={{ color: "#12213A", opacity: 0.5 }}
                    />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#101010", opacity: 0.55 }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="block w-full text-center text-sm font-bold uppercase tracking-[0.15em] px-6 py-4 rounded-xl cursor-not-allowed"
              style={{
                backgroundColor: "rgba(18,33,58,0.06)",
                color: "rgba(16,16,16,0.35)",
              }}
            >
              Graduates Only
            </div>
            <p
              className="text-xs text-center font-medium mt-3"
              style={{ color: "#101010", opacity: 0.35 }}
            >
              Complete the Foundations Workshop first
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* Your Coach */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A", opacity: 0.4 }}
        >
          Your Coach
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shrink-0">
            <img
              src="/dr-ray-headshot.png"
              alt="Dr. Raymond Nichols"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3
                className="text-xl md:text-2xl font-black tracking-tight"
                style={{ color: "#101010" }}
              >
                Dr. Raymond Nichols
              </h3>
              <p
                className="text-sm font-bold uppercase tracking-[0.1em] mt-1"
                style={{ color: "#12213A", opacity: 0.5 }}
              >
                Doctor of Chiropractic. Practice Owner. Builder.
              </p>
            </div>
            <div
              className="space-y-4 text-base font-medium leading-relaxed"
              style={{ color: "#101010", opacity: 0.7 }}
            >
              <p>
                Owner of AlignLife Chiropractic in Greenville, SC. Still in
                practice every day. Every system, script, and framework inside
                Above Atlas was built from the chair, not the sideline.
              </p>
              <p>
                Dr. Nichols built the student track because he remembers what it
                felt like to graduate with clinical knowledge and zero business
                confidence. The gap between school and practice does not have to
                take five years to close.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* Final CTA */}
      <section className="px-6 py-20 md:py-32 max-w-3xl mx-auto text-center">
        <h2
          className="text-2xl md:text-4xl font-black tracking-tight leading-[1.15] mb-6"
          style={{ color: "#101010" }}
        >
          Your career starts before graduation. If you are ready, apply.
        </h2>
        <p
          className="text-base md:text-lg font-medium leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: "#101010", opacity: 0.6 }}
        >
          No pitch. No pressure. Submit the application and we will review it
          within 48 hours.
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-xl transition-all group"
          style={{ backgroundColor: "#12213A", color: "#F2EDE4" }}
        >
          Apply as Student
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center"
        style={{ borderTop: "1px solid rgba(18,33,58,0.08)" }}
      >
        <p
          className="text-xs font-medium"
          style={{ color: "#101010", opacity: 0.3 }}
        >
          Above Atlas. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
