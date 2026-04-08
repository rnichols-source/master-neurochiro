import Link from "next/link";

export function SEOFooter() {
  return (
    <footer className="bg-brand-navy text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
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
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              href="/curriculum"
              className="text-sm text-white/50 hover:text-white transition-colors font-medium"
            >
              Curriculum
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-white/50 hover:text-white transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/resources/blog"
              className="text-sm text-white/50 hover:text-white transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="/login"
              className="text-sm text-white/50 hover:text-white transition-colors font-medium"
            >
              Member Login
            </Link>
            <Link
              href="/apply"
              className="text-sm text-brand-orange hover:text-white transition-colors font-bold"
            >
              Apply Now
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-white/20 font-medium">
            &copy; 2026 NeuroChiro Mastermind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
