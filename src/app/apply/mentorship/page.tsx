import { MastermindHeader } from "@/components/layout/mastermind-header";
import { SEOFooter } from "@/components/layout/seo-footer";
import MentorshipApplyClient from "./MentorshipApplyClient";

export const metadata = {
  title: "Apply for Private Mentorship | The Architecture Room",
  description: "Begin your clinical diagnostic. Apply for 1-on-1 practice architecture with Dr. Raymond Nichols.",
};

export default function MentorshipApplyPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <MastermindHeader />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-12 space-y-4">
          <p className="text-brand-orange font-black uppercase tracking-widest text-xs">The Intake Process</p>
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">
            Clinic Diagnostic <br /><span className="text-brand-orange">& Mentorship Application.</span>
          </h1>
          <p className="text-brand-gray font-medium max-w-xl mx-auto">
            Please complete this audit accurately. Dr. Nichols reviews all applications personally to ensure clinical and strategic alignment.
          </p>
        </div>

        <MentorshipApplyClient />
      </div>

      <SEOFooter />
    </div>
  );
}
