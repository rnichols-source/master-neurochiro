"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  User, 
  Building2, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  MapPin,
  Calendar,
  Zap,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { activateMemberProfile } from "@/app/actions/onboarding-actions";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ActivationClient({ token, invitation, isPreview }: any) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    user_type: "chiropractor" as "chiropractor" | "student",
    first_name: invitation?.full_name?.split(' ')[0] || "",
    last_name: invitation?.full_name?.split(' ')[1] || "",
    
    // Chiropractor Fields
    practice_name: "",
    years_in_practice: "",
    practice_city: "",
    practice_state: "",
    practice_type: "",
    website: "",

    // Student Fields
    chiropractic_school: "",
    graduation_year: "",
    current_year_in_school: "",
    areas_of_interest: [] as string[],

    password: "",
    confirm_password: ""
  });

  const [error, setError] = useState("");

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      areas_of_interest: prev.areas_of_interest.includes(interest)
        ? prev.areas_of_interest.filter(i => i !== interest)
        : [...prev.areas_of_interest, interest]
    }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await activateMemberProfile(token, formData.password, formData) as any;
      
      if (res.success) {
        if (isPreview) {
          alert("Preview Mode: Profile created (simulated). Redirecting to login...");
          router.push("/login");
          return;
        }

        // Auto login
        const supabase = createClient();
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: invitation.email,
          password: formData.password
        });

        if (loginError) {
          router.push("/login?message=Account activated. Please log in.");
        } else {
          router.push("/portal");
        }
      } else {
        setError(res.error || "Failed to activate profile");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Select Role", icon: User },
    { title: "Personal Info", icon: User },
    { title: formData.user_type === 'chiropractor' ? "Practice Details" : "Student Details", icon: formData.user_type === 'chiropractor' ? Building2 : GraduationCap },
    { title: "Security", icon: Lock },
    { title: "Complete", icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-navy/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 space-y-12">
        <div className="text-center space-y-4">
          <div className="relative w-48 h-12 mx-auto mb-8">
            <Image src="/logo-white.png" alt="NeuroChiro" fill className="object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Activate Your Access.</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Step {step} of 4 &bull; {steps[step-1]?.title}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between items-center max-w-md mx-auto relative px-4">
           <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0" />
           {steps.slice(0, 4).map((s, i) => (
             <div key={i} className="relative z-10">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                 step > i + 1 ? "bg-green-500 text-white" : 
                 step === i + 1 ? "bg-brand-orange text-white scale-110 shadow-lg shadow-brand-orange/20" : 
                 "bg-brand-navy border border-white/10 text-white/20"
               }`}>
                 <s.icon size={18} />
               </div>
             </div>
           ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <EliteCard className="p-8 md:p-10 border-white/5 bg-white/5 backdrop-blur-md">
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-white text-center mb-6">Select Your Role</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      onClick={() => setFormData({...formData, user_type: 'chiropractor'})}
                      className={cn(
                        "p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4",
                        formData.user_type === 'chiropractor' ? "border-brand-orange bg-brand-orange/10" : "border-white/10 hover:border-white/30 bg-white/5"
                      )}
                    >
                      <Briefcase className={cn("w-8 h-8", formData.user_type === 'chiropractor' ? "text-brand-orange" : "text-white/40")} />
                      <div>
                        <h4 className="text-white font-bold">Practicing Chiropractor</h4>
                        <p className="text-white/40 text-xs uppercase tracking-widest mt-1">I am in practice</p>
                      </div>
                    </div>
                    <div 
                      onClick={() => setFormData({...formData, user_type: 'student'})}
                      className={cn(
                        "p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4",
                        formData.user_type === 'student' ? "border-brand-orange bg-brand-orange/10" : "border-white/10 hover:border-white/30 bg-white/5"
                      )}
                    >
                      <GraduationCap className={cn("w-8 h-8", formData.user_type === 'student' ? "text-brand-orange" : "text-white/40")} />
                      <div>
                        <h4 className="text-white font-bold">Chiropractic Student</h4>
                        <p className="text-white/40 text-xs uppercase tracking-widest mt-1">I am in school</p>
                      </div>
                    </div>
                  </div>
                  <BrandButton onClick={nextStep} className="w-full py-4 mt-4">Continue <ArrowRight className="ml-2 w-4 h-4" /></BrandButton>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">First Name</label>
                      <input 
                        type="text" 
                        value={formData.first_name}
                        onChange={e => setFormData({...formData, first_name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Last Name</label>
                      <input 
                        type="text" 
                        value={formData.last_name}
                        onChange={e => setFormData({...formData, last_name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Confirmed Email</label>
                    <input 
                      type="email" 
                      disabled
                      value={invitation?.email || "admin-preview@neurochiro.com"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white/40 font-bold outline-none"
                    />
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button onClick={prevStep} className="flex-1 py-4 text-white/40 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Go Back</button>
                    <BrandButton onClick={nextStep} className="flex-[2] py-4">Continue <ArrowRight className="ml-2 w-4 h-4" /></BrandButton>
                  </div>
                </div>
              )}

              {step === 3 && formData.user_type === 'chiropractor' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Practice Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                          type="text" 
                          value={formData.practice_name}
                          onChange={e => setFormData({...formData, practice_name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                          placeholder="Elite Chiropractic Center"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">City</label>
                      <input 
                        type="text" 
                        value={formData.practice_city}
                        onChange={e => setFormData({...formData, practice_city: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="Austin"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">State / Country</label>
                      <input 
                        type="text" 
                        value={formData.practice_state}
                        onChange={e => setFormData({...formData, practice_state: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="TX, USA"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Years in Practice</label>
                      <input 
                        type="number" 
                        value={formData.years_in_practice}
                        onChange={e => setFormData({...formData, years_in_practice: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="5"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Practice Type</label>
                      <input 
                        type="text" 
                        value={formData.practice_type}
                        onChange={e => setFormData({...formData, practice_type: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="e.g. Cash-based, Insurance"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Website (Optional)</label>
                      <input 
                        type="url" 
                        value={formData.website}
                        onChange={e => setFormData({...formData, website: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="https://"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 py-4 text-white/40 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Go Back</button>
                    <BrandButton onClick={nextStep} className="flex-[2] py-4">Security Setup <ArrowRight className="ml-2 w-4 h-4" /></BrandButton>
                  </div>
                </div>
              )}

              {step === 3 && formData.user_type === 'student' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Chiropractic School</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                          type="text" 
                          value={formData.chiropractic_school}
                          onChange={e => setFormData({...formData, chiropractic_school: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                          placeholder="e.g. Life University"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Graduation Year</label>
                      <input 
                        type="text" 
                        value={formData.graduation_year}
                        onChange={e => setFormData({...formData, graduation_year: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="2026"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Current Trimester/Quarter</label>
                      <input 
                        type="text" 
                        value={formData.current_year_in_school}
                        onChange={e => setFormData({...formData, current_year_in_school: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="e.g. Tri 8"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">City / Country</label>
                      <input 
                        type="text" 
                        value={formData.practice_city}
                        onChange={e => setFormData({...formData, practice_city: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="Marietta, USA"
                      />
                    </div>
                    
                    <div className="space-y-3 md:col-span-2 mt-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Areas of Interest (Optional)</label>
                      <div className="flex flex-wrap gap-2">
                        {['Pediatrics', 'Neurology', 'Sports', 'Family Care', 'Functional Health'].map(interest => (
                          <div 
                            key={interest}
                            onClick={() => handleInterestToggle(interest)}
                            className={cn(
                              "px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-colors border",
                              formData.areas_of_interest.includes(interest) 
                                ? "bg-brand-orange border-brand-orange text-white" 
                                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                            )}
                          >
                            {interest}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button onClick={prevStep} className="flex-1 py-4 text-white/40 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Go Back</button>
                    <BrandButton onClick={nextStep} className="flex-[2] py-4">Security Setup <ArrowRight className="ml-2 w-4 h-4" /></BrandButton>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Create Password</label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-base text-white font-medium focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Confirm Password</label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={formData.confirm_password}
                      onChange={e => setFormData({...formData, confirm_password: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-base text-white font-medium focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  {error && <p className="text-red-400 text-xs font-bold text-center">{error}</p>}
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 py-4 text-white/40 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Go Back</button>
                    <BrandButton onClick={handleSubmit} isLoading={loading} className="flex-[2] py-4">Activate Profile <Zap className="ml-2 w-4 h-4" /></BrandButton>
                  </div>
                </div>
              )}
            </EliteCard>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-white/20 text-xs font-bold uppercase tracking-wider">
          Secure Activation System &bull; NeuroChiro OS
        </p>
      </div>
    </div>
  );
}