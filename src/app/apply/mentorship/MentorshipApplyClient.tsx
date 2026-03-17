"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Users, 
  Activity,
  ShieldCheck,
  Brain,
  MessageSquare,
  Instagram,
  Settings,
  AlertCircle,
  Zap,
  Heart,
  Lock,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { submitApplication } from "@/app/actions/submit-application";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function MentorshipApplyClient() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Section 1: Identity
    full_name: "",
    email: "",
    phone: "",
    instagram: "",
    current_role: "",
    years_in_practice: "",
    clinic_status: "",

    // Section 2: Numbers
    weekly_visits: "",
    monthly_revenue: "",
    avg_collection_per_visit: "",
    conversion_percentage: "",
    pva: "",
    team_size: "",
    track_kpis: "",

    // Section 3: Systems
    rof_system: "",
    care_plans: "",
    patient_flow: "",
    retention_system: "",
    team_training: "",

    // Section 4: Problems
    challenges: [] as string[],
    not_working_description: "",

    // Section 5: Outcome
    success_goals: [] as string[],
    life_impact: "",

    // Section 6: Commitment
    willing_to_implement: "",
    willing_to_change: "",
    coachable: "",
    why_now: "",
    investment_preparedness: "",
  });

  const handleNext = () => {
    setStep((s) => (s + 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBack = () => {
    setStep((s) => (s - 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleChallenge = (id: string) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(id) 
        ? prev.challenges.filter(c => c !== id) 
        : [...prev.challenges, id]
    }));
  };

  const toggleGoal = (id: string) => {
    setFormData(prev => ({
      ...prev,
      success_goals: prev.success_goals.includes(id) 
        ? prev.success_goals.filter(g => g !== id) 
        : [...prev.success_goals, id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Map formData to the structure expected by the server action
      const result = await submitApplication({
        ...formData,
        application_type: 'Private Coaching'
      } as any);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit application. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-brand-navy tracking-tight">Application Received.</h1>
            <p className="text-brand-gray text-xl font-medium leading-relaxed max-w-lg mx-auto">
              Your clinic diagnostic has been submitted. We are reviewing your data now. 
              Expect a reach-out within 48 hours if we identify clinical alignment.
            </p>
          </div>
          <div className="p-10 bg-brand-cream rounded-[3rem] border border-brand-navy/5 text-left space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-orange" />
              <p className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em]">Protocol Initiated</p>
            </div>
            <ul className="space-y-5">
              {[
                "Application & Data Audit (Underway)",
                "Dr. Nichols' Preliminary Review",
                "15-Minute Strategic Alignment Call",
                "Architecture Roadmap Delivery"
              ].map((step, i) => (
                <li key={i} className="flex gap-4 text-sm font-bold text-brand-navy items-center">
                  <span className="w-6 h-6 rounded-full bg-brand-navy text-white flex items-center justify-center text-[10px] shrink-0">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/" className="inline-block pt-8">
            <BrandButton variant="primary" size="lg">Return to Home</BrandButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Progress Section */}
      <div className="mb-16 space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-brand-orange uppercase tracking-[0.4em]">Clinic Intelligence Intake</p>
            <h1 className="text-3xl font-black text-brand-navy uppercase tracking-tighter">Architecture Room Application</h1>
          </div>
          <p className="text-[10px] font-black text-brand-navy/40 uppercase tracking-widest">Step {step} of 6</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className={`h-2 flex-1 rounded-full transition-all duration-700 ${
                step >= i ? "bg-brand-orange" : "bg-brand-navy/5"
              }`} 
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-3 text-sm font-bold">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <EliteCard className="p-8 md:p-12 bg-white border-brand-navy/5 shadow-2xl rounded-[3rem]">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* SECTION 1: IDENTITY & BASELINE */}
              {step === 1 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 01</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none">Identity & Baseline</h2>
                    <p className="text-brand-gray text-sm font-medium">Let's establish the clinical foundation.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Dr. John Doe"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.full_name}
                        onChange={e => setFormData({...formData, full_name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@clinic.com"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="555-0123"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 flex items-center gap-2">
                        <Instagram className="w-3 h-3" /> Instagram Handle
                      </label>
                      <input 
                        type="text" 
                        placeholder="@drjohndoe"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.instagram}
                        onChange={e => setFormData({...formData, instagram: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Current Role</label>
                      <select 
                        required
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all appearance-none"
                        value={formData.current_role}
                        onChange={e => setFormData({...formData, current_role: e.target.value})}
                      >
                        <option value="">Select Role</option>
                        <option value="Clinic Owner">Clinic Owner</option>
                        <option value="Multi-location Owner">Multi-location Owner</option>
                        <option value="Associate Doctor">Associate Doctor</option>
                        <option value="Student">Student</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Years in Practice</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. 5"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.years_in_practice}
                        onChange={e => setFormData({...formData, years_in_practice: e.target.value})}
                      />
                    </div>
                    <div className="col-span-full space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Current Clinic Status</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Startup", "Growing", "Plateaued", "Scaling"].map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setFormData({...formData, clinic_status: status})}
                            className={`p-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                              formData.clinic_status === status 
                                ? "bg-brand-navy border-brand-navy text-white" 
                                : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-orange/40"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: CURRENT PRACTICE NUMBERS */}
              {step === 2 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 02</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none">Practice Intelligence</h2>
                    <p className="text-brand-gray text-sm font-medium">The data doesn't lie. Provide your current metrics.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Avg Weekly Visits</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. 120"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.weekly_visits}
                        onChange={e => setFormData({...formData, weekly_visits: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Avg Monthly Revenue</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. $35,000"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.monthly_revenue}
                        onChange={e => setFormData({...formData, monthly_revenue: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Avg Collection Per Visit (CPV)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. $65"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.avg_collection_per_visit}
                        onChange={e => setFormData({...formData, avg_collection_per_visit: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Conversion % (Case Acceptance)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 70%"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.conversion_percentage}
                        onChange={e => setFormData({...formData, conversion_percentage: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">PVA (Patient Visit Average)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 24"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.pva}
                        onChange={e => setFormData({...formData, pva: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Team Size</label>
                      <select 
                        required
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-orange transition-all appearance-none"
                        value={formData.team_size}
                        onChange={e => setFormData({...formData, team_size: e.target.value})}
                      >
                        <option value="">Select Team Size</option>
                        <option value="Solo">Solo (Just me)</option>
                        <option value="2-5">Small Team (2-5)</option>
                        <option value="6+">Large Team (6+)</option>
                      </select>
                    </div>
                    <div className="col-span-full space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 block">Do you currently track KPIs daily?</label>
                      <div className="flex gap-4">
                        {["Yes", "No"].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => setFormData({...formData, track_kpis: choice})}
                            className={`flex-1 p-5 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all ${
                              formData.track_kpis === choice 
                                ? "bg-brand-navy border-brand-navy text-white" 
                                : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-orange/40"
                            }`}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: STRUCTURE & SYSTEMS */}
              {step === 3 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 03</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none">Architecture Audit</h2>
                    <p className="text-brand-gray text-sm font-medium">Evaluate your current operational systems.</p>
                  </div>

                  <div className="space-y-8">
                    {[
                      { id: "rof_system", label: "Do you have a structured ROF system?" },
                      { id: "care_plans", label: "Do you have consistent, clinical care plans?" },
                      { id: "patient_flow", label: "Do you follow a defined patient flow (Day 1-3)?" },
                      { id: "retention_system", label: "Do you have a system for active retention?" },
                      { id: "team_training", label: "Do you have structured team training systems?" },
                    ].map((sys) => (
                      <div key={sys.id} className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60 block">{sys.label}</label>
                        <div className="grid grid-cols-3 gap-3">
                          {["Yes", "No", "Somewhat"].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setFormData({...formData, [sys.id]: option})}
                              className={`p-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                                (formData as any)[sys.id] === option 
                                  ? "bg-brand-navy border-brand-navy text-white" 
                                  : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-orange/40"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 4: BIGGEST PROBLEMS */}
              {step === 4 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 04</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none">Structural Friction</h2>
                    <p className="text-brand-gray text-sm font-medium">Identify the primary leaks in your clinic.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: "low_conversions", label: "Low Conversions", icon: Target },
                        { id: "patient_dropout", label: "Patients Dropping Out", icon: Activity },
                        { id: "inconsistent_income", label: "Inconsistent Income", icon: TrendingUp },
                        { id: "pricing_confusion", label: "Pricing Confusion", icon: Settings },
                        { id: "team_issues", label: "Team Issues", icon: Users },
                        { id: "comm_struggles", label: "Communication Struggles", icon: MessageSquare },
                        { id: "burnout", label: "Burnout", icon: AlertCircle },
                        { id: "lack_of_systems", label: "Lack of Systems", icon: Settings },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleChallenge(item.id)}
                          className={`flex items-center gap-4 p-5 text-left rounded-2xl border-2 transition-all ${
                            formData.challenges.includes(item.id) 
                              ? "bg-brand-navy border-brand-navy text-white" 
                              : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-orange/40"
                          }`}
                        >
                          <item.icon className={`w-5 h-5 ${formData.challenges.includes(item.id) ? "text-brand-orange" : "text-brand-navy/20"}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Describe what is currently not working in your clinic:</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="Be specific. Where is the most stress coming from?"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-medium focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.not_working_description}
                        onChange={e => setFormData({...formData, not_working_description: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 5: DESIRED OUTCOME */}
              {step === 5 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 05</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none">The Vision</h2>
                    <p className="text-brand-gray text-sm font-medium">Define what successful architecture looks like for you.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: "consistent_income", label: "Consistent Income", icon: TrendingUp },
                        { id: "higher_conversions", label: "Higher Conversions", icon: Target },
                        { id: "better_systems", label: "Better Systems", icon: Settings },
                        { id: "less_stress", label: "Less Stress", icon: Activity },
                        { id: "stronger_team", label: "Stronger Team", icon: Users },
                        { id: "clinical_certainty", label: "Clinical Certainty", icon: Brain },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleGoal(item.id)}
                          className={`flex items-center gap-4 p-5 text-left rounded-2xl border-2 transition-all ${
                            formData.success_goals.includes(item.id) 
                              ? "bg-brand-navy border-brand-navy text-white" 
                              : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-orange/40"
                          }`}
                        >
                          <item.icon className={`w-5 h-5 ${formData.success_goals.includes(item.id) ? "text-brand-orange" : "text-brand-navy/20"}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">What would fixing these problems allow you to do in your life?</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="Time with family? Expansion? Mental peace?"
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-medium focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.life_impact}
                        onChange={e => setFormData({...formData, life_impact: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 6: COMMITMENT & QUALIFICATION */}
              {step === 6 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 06</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none">Elite Qualification</h2>
                    <p className="text-brand-gray text-sm font-medium">Final filters before protocol activation.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-6">
                      {[
                        { id: "willing_to_implement", label: "Are you willing to implement strict systems?" },
                        { id: "willing_to_change", label: "Are you willing to change how you currently operate?" },
                        { id: "coachable", label: "Are you 100% coachable?" },
                      ].map((q) => (
                        <div key={q.id} className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">{q.label}</label>
                          <div className="flex gap-4">
                            {["Yes", "No"].map((choice) => (
                              <button
                                key={choice}
                                type="button"
                                onClick={() => setFormData({...formData, [q.id]: choice})}
                                className={`flex-1 p-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                                  (formData as any)[q.id] === choice 
                                    ? "bg-brand-navy border-brand-navy text-white" 
                                    : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-orange/40"
                                }`}
                              >
                                {choice}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Why is NOW the right time to do this?</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-medium focus:ring-2 focus:ring-brand-orange transition-all"
                        value={formData.why_now}
                        onChange={e => setFormData({...formData, why_now: e.target.value})}
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">Private coaching ranges from $7,500 – $25,000+. Are you prepared to invest in solving these problems?</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { id: "Yes", label: "Yes" },
                          { id: "Serious but options", label: "Serious / Need Options" },
                          { id: "Not sure", label: "Not sure yet" },
                        ].map((choice) => (
                          <button
                            key={choice.id}
                            type="button"
                            onClick={() => setFormData({...formData, investment_preparedness: choice.id})}
                            className={`p-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                              formData.investment_preparedness === choice.id 
                                ? "bg-brand-navy border-brand-navy text-white" 
                                : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-orange/40"
                            }`}
                          >
                            {choice.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 bg-brand-navy rounded-[2.5rem] text-white relative overflow-hidden">
                       <Lock className="absolute top-4 right-4 w-12 h-12 text-white/5" />
                       <div className="relative z-10 space-y-4">
                          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[8px]">The Standard</p>
                          <p className="text-xs font-medium leading-relaxed italic text-white/70">
                            "This is not for everyone. We work with doctors who are ready to install real systems and operate at a higher level. Your application is a legal representation of your clinical data and intent."
                          </p>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex justify-between items-center pt-10 border-t border-brand-navy/5">
                {step > 1 ? (
                  <button 
                    type="button" 
                    onClick={handleBack}
                    className="flex items-center gap-2 text-[10px] font-black text-brand-navy/40 uppercase tracking-widest hover:text-brand-navy transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}
                
                {step < 6 ? (
                  <BrandButton 
                    type="button" 
                    variant="primary" 
                    onClick={handleNext}
                    className="group px-10 py-5 rounded-2xl"
                  >
                    Next Phase <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                ) : (
                  <BrandButton 
                    type="submit" 
                    variant="accent"
                    className="group px-12 py-6 rounded-2xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Processing Diagnostic <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                    ) : (
                      <>Submit Application <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /> </>
                    )}
                  </BrandButton>
                )}
              </div>
            </form>
          </EliteCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
