import { LiveHero } from "./components/hero";
import { WhoItIsFor } from "./components/who-it-is-for";
import { LiveFramework } from "./components/framework";
import { LiveSchedule } from "./components/schedule";
import { LiveSpeaker } from "./components/speaker";
import { LivePricing } from "./components/pricing";
import Link from "next/link";
import { Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function NeuroChiroLivePage() {
  const supabase = await createClient();
  
  // Fetch event and ticket types
  const { data: event } = await supabase
    .from("events")
    .select("*, ticket_types(*)")
    .eq("slug", "adelaide-2026")
    .single();

  return (
    <div className="min-h-screen bg-brand-navy selection:bg-brand-orange selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-brand-navy shadow-2xl group-hover:scale-110 transition-transform">N</div>
            <span className="font-black text-white tracking-[0.2em] uppercase text-xs hidden md:block">NeuroChiro</span>
          </Link>
          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-white/40">
              <Link href="/curriculum" className="hover:text-white transition-colors">Curriculum</Link>
              <Link href="/case-studies" className="hover:text-white transition-colors">Evidence</Link>
            </div>
            <Link href="/login">
              <button className="px-6 py-2.5 rounded-full border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <LiveHero />
        <WhoItIsFor />
        <LiveFramework />
        <LiveSchedule />
        <LiveSpeaker />
        <LivePricing event={event} />
        
        {/* Urgency Section */}
        <section className="section-padding bg-brand-orange/10 text-center px-8 relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <Shield className="w-16 h-16 text-brand-orange mx-auto opacity-30" />
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">Only 50 Seats. <br /><span className="text-brand-orange">Zero Compromise.</span></h2>
            <p className="text-xl text-white/50 font-medium">We maintain a strict limit on attendance to ensure every attendee receives direct interaction and high-value strategic feedback.</p>
          </div>
        </section>

        {/* Location Section */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-8 text-center space-y-12">
            <div className="space-y-4">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Location</p>
              <h2 className="text-7xl font-black text-brand-navy tracking-tighter leading-none uppercase">Adelaide, <br />Australia.</h2>
            </div>
            <div className="aspect-[21/9] bg-brand-navy/5 rounded-[4rem] overflow-hidden relative flex items-center justify-center border border-brand-navy/5">
                <p className="text-brand-navy/20 font-black text-4xl uppercase tracking-widest">Map Placeholder</p>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05),transparent_70%)]" />
            </div>
            <p className="text-xl text-brand-navy/40 font-bold max-w-2xl mx-auto uppercase tracking-tighter">Specific venue details and accommodation recommendations will be provided upon registration.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 bg-brand-navy text-center">
        <div className="max-w-7xl mx-auto px-8 space-y-8">
           <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-brand-navy">N</div>
              <span className="font-bold text-white tracking-widest uppercase text-[10px]">NeuroChiro Intelligence</span>
            </div>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-loose">
              Master NeuroChiro is an elite professional training platform. <br />
              © 2026 NeuroChiro. Adelaide, Australia.
            </p>
        </div>
      </footer>
    </div>
  );
}
