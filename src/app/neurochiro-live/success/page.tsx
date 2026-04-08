import Link from "next/link";
import { CheckCircle2, Calendar, MapPin, Mail } from "lucide-react";
import { BrandButton } from "@/components/ui/elite-ui";

export default function EventSuccessPage() {
  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center px-8 py-20">
      <div className="max-w-2xl w-full glass-panel p-12 md:p-20 rounded-2xl text-center space-y-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-orange/5 animate-pulse" />
        <div className="relative z-10">
          <div className="w-24 h-24 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-brand-orange/20">
            <CheckCircle2 className="w-12 h-12 text-brand-orange" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
            Seat <br /><span className="text-gradient uppercase">Secured.</span>
          </h1>
          <p className="text-xl text-white/50 font-medium leading-relaxed mb-12">
            You are officially registered for NeuroChiro Live Adelaide. <br />
            Get ready for a complete practice reconstruction.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-left space-y-2">
              <Calendar className="w-5 h-5 text-brand-orange mb-2" />
              <p className="text-xs font-black uppercase tracking-widest text-white/30">Dates</p>
              <p className="text-sm font-bold text-white">May 29 – 30, 2026</p>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-left space-y-2">
              <MapPin className="w-5 h-5 text-brand-orange mb-2" />
              <p className="text-xs font-black uppercase tracking-widest text-white/30">Location</p>
              <p className="text-sm font-bold text-white">Adelaide, Australia</p>
            </div>
          </div>
          <div className="space-y-4">
            <Link href="/">
              <BrandButton variant="accent" className="w-full py-5 rounded-2xl">
                Back to NeuroChiro
              </BrandButton>
            </Link>
            <p className="text-sm text-white/30 font-medium">
              Want to go deeper?{" "}
              <Link href="/apply" className="text-brand-orange hover:text-white transition-colors underline">
                Join the 8-week Mastermind
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
