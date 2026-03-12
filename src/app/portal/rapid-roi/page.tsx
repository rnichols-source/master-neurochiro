import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  Zap, 
  Play, 
  FileText, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  ShieldCheck,
  Download
} from "lucide-react";
import Link from "next/link";

export default function RapidROIPage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full">
            <Zap size={16} className="fill-brand-orange" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">High Velocity Win</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-brand-navy tracking-tighter">Rapid ROI</h1>
          <p className="text-brand-gray text-lg font-medium max-w-2xl mx-auto">
            Our goal is simple: Help you save one case or close one new patient in the next 24 hours to pay for your entire month of membership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Video Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video bg-brand-navy rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                  <Play size={32} fill="white" className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-navy to-transparent">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                    <Clock size={12} /> 5:12
                  </div>
                  <h3 className="text-white font-black uppercase tracking-tight">The Emergency Case Rescue</h3>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-brand-navy">The "Rescue" Protocol</h3>
              <p className="text-brand-gray leading-relaxed">
                In this briefing, Dr. Nichols breaks down the exact neurological language pattern to use when a patient is about to walk away from a $5,000 care plan. Watch this, then go use it today.
              </p>
            </div>
          </div>

          {/* Action/Resources Section */}
          <div className="space-y-8">
            <EliteCard className="p-8 bg-brand-navy text-white border-none shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
                <FileText size={14} className="text-brand-orange" /> Required Resource
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-black">Emergency Case Rescue Script</h4>
                  <p className="text-white/40 text-xs mt-2 font-medium">Download this and keep it on your desk for your next ROF.</p>
                </div>
                <button className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all flex items-center justify-center gap-3 group shadow-xl">
                  <Download size={16} /> Download PDF <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </EliteCard>

            <EliteCard className="p-8 space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-2">The ROI Checklist</h3>
              <div className="space-y-4">
                {[
                  "Watch the 5-minute briefing",
                  "Print the Rescue Script",
                  "Use the 'Pattern Interrupt' on 1 patient today",
                  "Report your win in The Council"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full border-2 border-brand-orange flex-shrink-0" />
                    <p className="text-sm font-bold text-brand-navy">{item}</p>
                  </div>
                ))}
              </div>
            </EliteCard>
          </div>
        </div>

        {/* Success Proof */}
        <EliteCard className="bg-brand-orange/5 border-brand-orange/20 p-12 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-xl">
              <ShieldCheck size={32} className="text-brand-orange" />
            </div>
            <h3 className="text-2xl font-black text-brand-navy">Once you pay for your month...</h3>
            <p className="text-brand-gray font-medium">
              After you use this script to save a case, you've essentially gotten the NeuroChiro OS for free this month. Now you can focus on the long-term curriculum with zero pressure.
            </p>
            <Link href="/portal/curriculum">
              <button className="text-brand-orange font-black text-[10px] uppercase tracking-[0.2em] hover:text-brand-navy transition-colors">
                Proceed to Phase 01 Curriculum <ArrowRight size={12} className="inline ml-1" />
              </button>
            </Link>
          </div>
        </EliteCard>
      </div>
    </DashboardLayout>
  );
}
