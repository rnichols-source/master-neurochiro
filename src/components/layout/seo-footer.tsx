import Link from "next/link";

export function SEOFooter() {
  return (
    <footer className="bg-brand-navy text-white py-10 md:py-12 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-brand-navy text-sm">
              N
            </div>
            <span className="font-black tracking-widest uppercase text-sm">
              NeuroChiro
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
            <Link
              href="/curriculum"
              className="text-sm text-white/50 hover:text-white transition-colors font-medium py-1"
            >
              Curriculum
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-white/50 hover:text-white transition-colors font-medium py-1"
            >
              Pricing
            </Link>
            <Link
              href="/resources/blog"
              className="text-sm text-white/50 hover:text-white transition-colors font-medium py-1"
            >
              Blog
            </Link>
            <Link
              href="/login"
              className="text-sm text-white/50 hover:text-white transition-colors font-medium py-1"
            >
              Login
            </Link>
            <Link
              href="/apply"
              className="text-sm text-brand-orange hover:text-white transition-colors font-bold py-1"
            >
              Apply Now
            </Link>
          </nav>
        </div>

        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-white/20 font-medium">
            &copy; 2026 NeuroChiro Mastermind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
