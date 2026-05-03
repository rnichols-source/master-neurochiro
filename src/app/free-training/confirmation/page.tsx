import Link from "next/link";
import { CheckCircle2, Play, ArrowLeft, Calendar } from "lucide-react";

export default function FreeTrainingConfirmation() {
  return (
    <div className="min-h-[100dvh] bg-[#050E1D] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-5 md:px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto w-full text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#E67E22]/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#E67E22]" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Your Training Is Ready
          </h1>

          <p className="text-white/50 text-base md:text-lg mb-10 max-w-lg mx-auto">
            Check your email &mdash; we also sent you a link.
          </p>

          {/* Video Placeholder */}
          <div className="bg-white/5 border border-white/10 rounded-2xl aspect-video flex flex-col items-center justify-center mb-10">
            <div className="w-16 h-16 rounded-full bg-[#E67E22]/20 flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-[#E67E22] ml-1" />
            </div>
            <p className="text-white/40 font-bold text-sm uppercase tracking-wider">
              Video Coming Soon
            </p>
          </div>

          {/* Discovery Call CTA */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
            <p className="text-white font-bold text-lg mb-2">
              Want personalized guidance?
            </p>
            <p className="text-white/50 text-sm mb-6">
              Book a free 15-minute call with Dr. Ray to discuss your practice
              and see how the Mastermind can help.
            </p>
            <a
              href="https://calendly.com/drray-neurochirodirectory/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E67E22] hover:bg-[#d4711d] text-white font-bold text-base py-4 px-8 rounded-xl transition-colors group"
            >
              <Calendar className="w-5 h-5" />
              Book a Free Discovery Call
            </a>
          </div>

          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to homepage
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-5 md:px-6 py-10 border-t border-white/5">
        <p className="text-center text-sm text-white/30 font-medium">
          NeuroChiro Global Mastermind
        </p>
      </footer>
    </div>
  );
}
