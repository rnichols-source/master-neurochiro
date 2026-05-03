import Link from "next/link";
import { CheckCircle2, ArrowLeft, Calendar, ArrowRight } from "lucide-react";

export default function FreeTrainingConfirmation() {
  return (
    <div className="min-h-[100dvh] bg-[#050E1D] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-5 md:px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto w-full">
          {/* Success Icon + Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-400" />
              </div>
            </div>
            <p className="text-[#E67E22] text-sm font-bold uppercase tracking-widest mb-3">
              You&apos;re In — Watch Now
            </p>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
              A Real Mastermind Session — Uncut
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
              This is an actual Week 1 coaching call from Cohort 2. Not a highlight reel — the full session. See exactly how Dr. Ray coaches and what happens inside the Mastermind.
            </p>
          </div>

          {/* Video Embed */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 mb-8">
            <div className="relative w-full" style={{ padding: "56.25% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/1185350222?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="NeuroChiro Mastermind — Week 1 Coaching Session"
              />
            </div>
          </div>

          {/* What you just watched */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-white font-bold text-lg mb-4">What you just watched:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "How Dr. Ray opens a coaching call and sets the tone",
                "The identity framework — who you are as a nervous system chiropractor",
                "Live Q&A with real Mastermind members",
                "The homework assignment that changes everything in Week 1",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22] mt-2 shrink-0" />
                  <span className="text-sm text-white/60 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6">
            <p className="text-white/40 text-sm font-medium">
              This is Week 1 of 13. Imagine what happens by Week 13.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/drray-neurochirodirectory/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#E67E22] hover:bg-[#d4711d] text-white font-bold text-base py-4 px-8 rounded-xl transition-colors group"
              >
                <Calendar className="w-5 h-5" />
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 font-bold text-base py-4 px-8 rounded-xl transition-colors"
              >
                See Pricing & Plans
              </Link>
            </div>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-1 text-sm text-white/30 hover:text-[#E67E22] transition-colors"
            >
              Or take the free Practice Assessment first
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Back Link */}
          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/30 hover:text-white/50 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to homepage
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-5 md:px-6 py-10 border-t border-white/5">
        <p className="text-center text-sm text-white/20 font-medium">
          NeuroChiro Global Mastermind
        </p>
      </footer>
    </div>
  );
}
