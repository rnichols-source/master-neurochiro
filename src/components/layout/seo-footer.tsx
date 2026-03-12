import Link from "next/link";

export function SEOFooter() {
  const sections = [
    {
      title: "The Mastermind",
      links: [
        { name: "8-Week Mastermind", href: "/chiropractic-mastermind" },
        { name: "Curriculum", href: "/curriculum" },
        { name: "Pricing", href: "/pricing" },
        { name: "Live Immersion", href: "/neurochiro-live" },
      ]
    },
    {
      title: "Solutions",
      links: [
        { name: "Chiropractic Coaching", href: "/chiropractic-coaching" },
        { name: "Practice Management", href: "/chiropractic-practice-management" },
        { name: "Case Acceptance Training", href: "/chiropractic-case-acceptance" },
        { name: "Training Blog", href: "/resources/blog" },
      ]
    },
    {
      title: "Training Hubs",
      links: [
        { name: "Report of Findings (ROF)", href: "/report-of-findings-training" },
        { name: "Patient Communication", href: "/chiropractic-patient-communication" },
        { name: "Clinical Certainty", href: "/vision" },
      ]
    }
  ];

  return (
    <footer className="bg-brand-navy text-white pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-brand-navy">N</div>
              <span className="font-black tracking-[0.2em] uppercase text-xs">NeuroChiro</span>
            </div>
            <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs">
              Reconstructing the chiropractic profession through clinical certainty and objective communication systems.
            </p>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-white/60 hover:text-white transition-colors text-sm font-bold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            © 2026 NeuroChiro Intelligence. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
             <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Member Login</Link>
             <Link href="/apply" className="text-[10px] font-black uppercase tracking-widest text-brand-orange hover:text-white transition-colors">Apply for Admission</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
