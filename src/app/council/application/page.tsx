import { MastermindHeader } from "@/components/layout/mastermind-header";
import { SEOFooter } from "@/components/layout/seo-footer";
import CouncilApplyClient from "./CouncilApplyClient";

export const metadata = {
  title: "Council Application | The NeuroChiro Council",
  description: "Apply for the NeuroChiro Council. The elite implementation and coaching environment for chiropractors.",
};

export default function CouncilApplyPage() {
  return (
    <div className="min-h-screen bg-brand-cream font-body selection:bg-brand-orange selection:text-white">
      <MastermindHeader />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-12 space-y-4">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Membership Intake</p>
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">
            The Council <br /><span className="text-brand-orange">Application.</span>
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
