"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Loader2,
  PartyPopper,
  Instagram
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitApplication } from "@/app/actions/submit-application";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "identity",
    title: "The Doctor",
    questions: [
      { id: "full_name", label: "Full Name", type: "text", placeholder: "Dr. Jane Smith", required: true },
      { id: "email", label: "Practice Email", type: "email", placeholder: "doctor@practice.com", required: true },
      { id: "phone", label: "Phone Number", type: "text", placeholder: "555-555-5555", required: true },
      { id: "instagram", label: "Instagram Handle (Optional)", type: "text", placeholder: "@dr.handle" },
      { id: "current_role", label: "I am currently a:", type: "select", options: ["Chiropractic Student", "Associate Doctor", "Clinic Owner", "Multi-Clinic Owner"], required: true },
      { id: "student_info", label: "If student, school & grad year? (Otherwise N/A)", type: "text", placeholder: "Life University 2026", required: true },
      { id: "years_practicing", label: "Years in Practice? (Otherwise N/A)", type: "text", placeholder: "e.g. 5 years", required: true },
    ]
  },
  {
    id: "metrics",
    title: "Practice Data",
    questions: [
      { id: "monthly_revenue", label: "Avg Monthly Revenue", type: "select", options: ["Under $10k", "$10k–$25k", "$25k–$50k", "$50k–$100k", "$100k+", "I do not track this", "I am a student"], required: true },
      { id: "weekly_visits", label: "Avg Weekly Patient Visits", type: "select", options: ["Under 50", "50–100", "100–200", "200+", "I do not track this", "I am a student"], required: true },
      { id: "conversion_rate", label: "New Patient Conversion Rate", type: "select", options: ["Under 40%", "40–60%", "60–80%", "80%+", "I do not track this", "I am a student"], required: true },
      { id: "confidence_score", label: "Nervous-System Confidance (1-10)", type: "range", min: 1, max: 10, required: true },
      { id: "stability_score", label: "Practice Stability (1-10)", type: "range", min: 1, max: 10, required: true },
    ]
  },
  {
    id: "vision",
    title: "The Transformation",
    questions: [
      { id: "biggest_struggle", label: "Biggest struggle in training or practice?", type: "textarea", placeholder: "Be specific...", required: true },
      { id: "success_vision", label: "If successful, what changes in 6-12 months?", type: "textarea", placeholder: "Confidence, income, communication...", required: true },
      { id: "prevention_factor", label: "What has prevented this so far?", type: "textarea", placeholder: "Be honest...", required: true },
      { id: "why_now", label: "Why is NOW the right time for you?", type: "textarea", placeholder: "Internal/External drivers...", required: true },
    ]
  },
  {
    id: "commitment",
    title: "Commitment",
    questions: [
      { id: "tier_applying", label: "Which tier are you applying for?", type: "select", options: ["Mastermind Standard ($997)", "Mastermind Pro ($1,997 — Limited to 5 Seats)", "Not sure yet"], required: true },
      { id: "pro_fit", label: "If Pro, why are you a strong fit? (Otherwise N/A)", type: "textarea", placeholder: "Leadership goals...", required: true },
      { id: "open_analysis", label: "Open to deep self-analysis & leadership evaluation?", type: "select", options: ["Yes", "No", "Not applying for Pro"], required: true },
      { id: "accountability", label: "Willing to operate at Pro level accountability?", type: "select", options: ["Yes", "No", "Not applying for Pro"], required: true },
      { id: "participation", label: "Able to commit 90 minutes per week live?", type: "select", options: ["Yes", "No"], required: true },
      { id: "financial_ready", label: "Financially prepared to invest at level selected?", type: "select", options: ["Yes — Pay in Full", "Yes — Payment Plan", "Not yet ready"], required: true },
      { id: "seriousness_score", label: "Seriousness to scale this year (1-10)", type: "range", min: 1, max: 10, required: true },
      { id: "higher_standard", label: "Willing to be held to a higher standard?", type: "select", options: ["Yes", "No"], required: true },
      { id: "why_selected", label: "Why should you be selected for Cohort II?", type: "textarea", placeholder: "What do you bring to the cohort?", required: true },
    ]
  }
];

export default function ApplicationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    confidence_score: 5,
    stability_score: 5,
    seriousness_score: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (id: string, value: string | number) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setIsSubmitting(true);
      const result = await submitApplication(formData);
      setIsSubmitting(false);
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert("Submission failed: " + result.error);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-8">
        <MastermindHeader />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl w-full text-center space-y-8">
          <div className="inline-flex p-6 bg-brand-orange/10 rounded-full"><PartyPopper className="w-12 h-12 text-brand-orange" /></div>
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-brand-navy tracking-tighter">Cohort II Application Received.</h1>
            <p className="text-xl text-brand-gray font-medium leading-relaxed">
              We have received your practice data. Dr. Nichols and the leadership team will 
              manually review your responses. You will receive a decision via email within 24-48 hours.
            </p>
          </div>
          <Link href="/mastermind"><BrandButton variant="outline">Return to Home</BrandButton></Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pb-32">
      <MastermindHeader />
      <section className="pt-48 pb-20 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Sidebar */}
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Cohort II Selection</p>
              <h1 className="text-5xl font-black text-brand-navy leading-none tracking-tighter">Elite <br />Admission.</h1>
            </div>
            <nav className="space-y-6">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center gap-4 group">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs transition-all", i <= currentStep ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/20" : "bg-brand-navy/5 text-brand-navy/30")}>
                    {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", i === currentStep ? "text-brand-navy" : "text-brand-navy/30")}>{step.title}</span>
                </div>
              ))}
            </nav>
            <EliteCard className="bg-brand-navy text-white border-none p-8">
              <ShieldCheck className="w-8 h-8 text-brand-orange mb-4" />
              <p className="text-[10px] font-bold leading-relaxed text-white/40 uppercase tracking-widest">Confidential Data Protocol</p>
              <p className="text-xs font-medium text-white/60 mt-2">Your clinical metrics and personal responses are encrypted and accessible only by the leadership team.</p>
            </EliteCard>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-brand-navy tracking-tight">{steps[currentStep].title}</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Step {currentStep + 1} of {steps.length} &bull; Clinical Background</p>
                </div>

                <div className="space-y-8">
                  {steps[currentStep].questions.map((q) => (
                    <div key={q.id} className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60 ml-1">
                        {q.label} {q.required && <span className="text-brand-orange">*</span>}
                      </label>
                      {q.type === "select" ? (
                        <select value={formData[q.id] || ""} onChange={(e) => handleInputChange(q.id, e.target.value)} className="w-full bg-white border border-brand-navy/10 rounded-2xl py-5 px-6 text-sm font-bold text-brand-navy focus:border-brand-orange/20 transition-all appearance-none outline-none">
                          <option value="">Select an option...</option>
                          {q.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : q.type === "range" ? (
                        <div className="space-y-4 pt-2">
                          <input type="range" min={q.min} max={q.max} value={formData[q.id] || 5} onChange={(e) => handleInputChange(q.id, Number(e.target.value))} className="w-full accent-brand-orange" />
                          <div className="flex justify-between text-[10px] font-black text-brand-navy/40 px-1">
                            <span>1 - LOW</span>
                            <span className="text-brand-orange text-lg">{formData[q.id] || 5}</span>
                            <span>10 - HIGH</span>
                          </div>
                        </div>
                      ) : q.type === "textarea" ? (
                        <textarea rows={4} placeholder={q.placeholder} value={formData[q.id] || ""} onChange={(e) => handleInputChange(q.id, e.target.value)} className="w-full bg-white border border-brand-navy/10 rounded-2xl py-5 px-6 text-sm font-bold text-brand-navy focus:border-brand-orange/20 transition-all outline-none resize-none" />
                      ) : (
                        <input type={q.type} placeholder={q.placeholder} value={formData[q.id] || ""} onChange={(e) => handleInputChange(q.id, e.target.value)} className="w-full bg-white border border-brand-navy/10 rounded-2xl py-5 px-6 text-sm font-bold text-brand-navy focus:border-brand-orange/20 transition-all outline-none" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-8">
                  {currentStep > 0 && <BrandButton variant="outline" onClick={handleBack} disabled={isSubmitting}><ChevronLeft className="w-4 h-4" /></BrandButton>}
                  <BrandButton variant="primary" className="flex-1 group py-6" onClick={handleNext} isLoading={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <>{currentStep === steps.length - 1 ? "Submit Elite Application" : "Continue to Next Phase"} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                  </BrandButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
