import { MastermindHeader } from "@/components/layout/mastermind-header";
import { SEOFooter } from "@/components/layout/seo-footer";
import CouncilApplyClient from "./CouncilApplyClient";

export const metadata = {
  title: "Inner Circle Application | The NeuroChiro Inner Circle",
  description: "Apply for the NeuroChiro Inner Circle. Ongoing bi-weekly coaching for Mastermind graduates.",
};

export default function CouncilApplyPage() {
  return (
    <div className="min-h-screen bg-brand-cream font-body selection:bg-brand-orange selection:text-white">
      <MastermindHeader />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-12 space-y-4">
          <p className="text-brand-orange font-black uppercase tracking-widest text-xs">Membership Intake</p>
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">
            The Inner Circle <br /><span className="text-brand-orange">Application.</span>
          </h1>
          <p className="text-brand-gray font-medium max-w-xl mx-auto">
            This is where execution happens. Please complete your clinical position audit below.
          </p>
        </div>

        <CouncilApplyClient />
      </div>

      <SEOFooter />
    </div>
  );
}
