"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  Brain, 
  Target, 
  Copy, 
  Check,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CertaintyAIGeneratorClient() {
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    concern: "",
    scanFindings: [] as string[],
    personality: "Analytical"
  });

  const scanOptions = ["Low HRV", "High Tone (Stuck On)", "Low Adaptability", "Asymmetry", "Vagus Nerve Fatigue"];
  const personalityTypes = [
    { name: "Analytical", desc: "Wants data and logic" },
    { name: "Driver", desc: "Wants results and speed" },
    { name: "Amiable", desc: "Wants trust and safety" },
    { name: "Expressive", desc: "Wants big picture and energy" }
  ];

  const handleScanToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      scanFindings: prev.scanFindings.includes(option)
        ? prev.scanFindings.filter(o => o !== option)
        : [...prev.scanFindings, option]
    }));
  };

  const generateScript = () => {
    setLoading(true);
    setGeneratedScript(null);
    
    // Simulate AI thinking
    setTimeout(() => {
      let script = "";
      const { concern, scanFindings, personality } = formData;
      const findings = scanFindings.join(" and ");

      if (personality === "Analytical") {
        script = `Dr: "Based on the data, your ${findings} indicates a structural shift in how your nervous system is processing stress. Specifically regarding your ${concern || 'health'}, the numbers show your body is stuck in a defensive state. To correct this, we need a 12-week objective plan to move your HRV back into the green zone. Does the math of that make sense?"`;
      } else if (personality === "Driver") {
        script = `Dr: "Here is the bottom line: your scans show ${findings}. This is why you aren't seeing the results you want with ${concern || 'your health'}. My goal is to get you back to 100% as fast as possible. We start with a 3-month intensive phase to break this pattern. Are you ready to get to work?"`;
      } else if (personality === "Amiable") {
        script = `Dr: "I'm so glad we did these scans. They show that your body has been under a lot of pressure, specifically with ${findings}. This explains why ${concern || "you haven't been feeling like yourself"}. We're going to work together over the next few months to safely restore that balance so you can get back to what matters most. How does that feel?"`;
      } else {
        script = `Dr: "Imagine your body finally having the energy it needs! These scans of your ${findings} show us exactly where the 'power' is being drained. By fixing this, we aren't just helping with ${concern || 'your symptoms'}—we are unlocking a whole new level of performance for you. Can you see that potential?"`;
      }

      setGeneratedScript(script);
      setLoading(false);
    }, 2000);
  };

  const copyScript = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" /> AI-Powered
          </div>
          <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Certainty AI Script Generator</h1>
          <p className="text-brand-gray mt-2 font-medium">Input your patient findings to generate a custom Authority Script.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Inputs Section */}
        <div className="lg:col-span-5 space-y-6">
          <EliteCard title="Patient Intelligence" subtitle="Clinical Inputs" icon={Brain}>
            <div className="space-y-8 mt-8">
              {/* Primary Concern */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Primary Concern / Symptom</label>
                <input 
                  type="text" 
                  placeholder="e.g. Chronic Fatigue, LBP, Brain Fog"
                  className="w-full bg-brand-cream/50 border border-brand-navy/5 rounded-xl p-4 text-sm font-bold outline-none focus:border-brand-orange/40 transition-all"
                  value={formData.concern}
                  onChange={(e) => setFormData({...formData, concern: e.target.value})}
                />
              </div>

              {/* Scan Findings */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Scan Findings</label>
                <div className="flex flex-wrap gap-2">
                  {scanOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => handleScanToggle(option)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-bold border transition-all",
                        formData.scanFindings.includes(option)
                          ? "bg-brand-navy text-white border-brand-navy shadow-md"
                          : "bg-white text-brand-navy/40 border-brand-navy/5 hover:border-brand-orange/20"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personality Type */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Patient Personality Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {personalityTypes.map(type => (
                    <button
                      key={type.name}
                      onClick={() => setFormData({...formData, personality: type.name})}
                      className={cn(
                        "p-4 rounded-xl text-left border transition-all",
                        formData.personality === type.name
                          ? "bg-brand-orange/5 border-brand-orange shadow-sm"
                          : "bg-white border-brand-navy/5 hover:border-brand-navy/10"
                      )}
                    >
                      <p className={cn("text-xs font-black", formData.personality === type.name ? "text-brand-orange" : "text-brand-navy")}>{type.name}</p>
                      <p className="text-xs font-medium text-brand-navy/40 uppercase tracking-widest">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <BrandButton 
                onClick={generateScript} 
                disabled={loading || formData.scanFindings.length === 0}
                className="w-full py-4 group"
              >
                {loading ? "AI is Crafting Script..." : "Generate Authority Script"} 
                {!loading && <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />}
              </BrandButton>
            </div>
          </EliteCard>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {generatedScript ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <EliteCard className="h-full bg-brand-navy text-white border-none p-0 overflow-hidden shadow-2xl">
                  <div className="p-10 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                          <Target className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-white/40">Generated Script</p>
                          <h3 className="text-xl font-black">The NeuroChiro Close</h3>
                        </div>
                      </div>
                      <button 
                        onClick={copyScript}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white/40" />}
                      </button>
                    </div>

                    <div className="flex-1 bg-white/5 rounded-2xl p-10 font-serif italic text-2xl md:text-3xl leading-relaxed text-brand-cream relative">
                      <span className="absolute top-6 left-6 text-6xl text-brand-orange/20 font-black">"</span>
                      {generatedScript}
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-xs font-black uppercase text-brand-orange tracking-widest mb-3 flex items-center gap-2">
                          <Zap className="w-3 h-3" /> Delivery Tip
                        </p>
                        <p className="text-xs font-medium text-white/60 leading-relaxed">
                          {formData.personality === "Driver" ? "Don't pause. Maintain eye contact and stay neutral when asking for the commitment." : "Slow down during the findings and use their name at least twice."}
                        </p>
                      </div>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-xs font-black uppercase text-brand-orange tracking-widest mb-3 flex items-center gap-2">
                          <ShieldCheck className="w-3 h-3" /> Authority Lock
                        </p>
                        <p className="text-xs font-medium text-white/60 leading-relaxed">
                          If they hesitate, remind them that the scan findings represent their body's objective capacity to heal.
                        </p>
                      </div>
                    </div>
                  </div>
                </EliteCard>
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] border-2 border-dashed border-brand-navy/5 rounded-2xl flex flex-col items-center justify-center text-center p-12 space-y-6">
                {loading ? (
                  <div className="space-y-6 flex flex-col items-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-brand-orange/10 border-t-brand-orange animate-spin" />
                      <Sparkles className="w-8 h-8 text-brand-orange absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-xl font-black text-brand-navy animate-pulse">Analyzing Neural Patterns...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-2xl bg-brand-cream flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-brand-navy/20" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-brand-navy">Ready to Generate</h3>
                      <p className="text-brand-gray font-medium max-w-xs mx-auto">
                        Fill out the patient findings on the left to create your customized authority script.
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
