"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Copy, 
  Check, 
  MessageSquare, 
  Phone, 
  Zap, 
  Target
} from "lucide-react";

const scriptCategories = [
  { id: 'day1', name: 'Day 1: Discovery', icon: Search },
  { id: 'day2', name: 'Day 2: The Close', icon: Target },
  { id: 'objections', name: 'Objections', icon: MessageSquare },
  { id: 'marketing', name: 'Marketing / Reactivation', icon: Phone },
];

const scripts = [
  {
    id: 1,
    category: 'day1',
    title: "The 'Certainty' Consultation Opening",
    hook: "Use this in the first 2 minutes to establish authority.",
    content: "Dr: 'Mrs. Jones, before we begin, I want to be clear about my goal today. I am not here to treat your symptoms. I am here to evaluate the integrity of your nervous system. If I find a pattern of interference that I can help with, I will tell you. If I don't, I will help you find who can. Does that sound fair?'",
    tips: ["Maintain eye contact", "Lower your vocal tonality", "Do not rush the final question"]
  },
  {
    id: 2,
    category: 'day2',
    title: "The Gap Close (Financial Recommendation)",
    hook: "The transition from clinical findings to financial commitment.",
    content: "Dr: 'Based on your scan, we see a significant gap between where your body is and where it needs to be to heal. To close that gap, we need to move from crisis care into reconstruction. This requires 3 visits per week for the next 12 weeks. The total investment for this phase of reconstruction is $X,XXX. Most of our families choose the monthly installment of $XXX. Which works better for your budget?'",
    tips: ["Stop talking after asking the budget question", "Have the care plan sheet visible", "Stay neutral"]
  },
  {
    id: 3,
    category: 'objections',
    title: "The 'I need to think about it' Reframe",
    hook: "Use when a patient is hesitating on the commitment.",
    content: "Dr: 'I understand. Usually, when someone says they need to think about it, it's either because they don't believe this is the solution to their problem, or they don't believe they can afford it. Which one is it for you?'",
    tips: ["Deliver with extreme empathy, not aggression", "This is about uncovering the real barrier"]
  }
];

export function ScriptVaultClient() {
  const [activeCategory, setActiveCategory] = useState('day1');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredScripts = scripts.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">Proprietary Assets</p>
          <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Script & ROF Vault</h1>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4">
        {scriptCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-6 py-4 rounded-2xl flex items-center gap-3 transition-all font-black uppercase tracking-widest text-[10px]",
              activeCategory === cat.id 
                ? "bg-brand-navy text-white shadow-xl shadow-brand-navy/20" 
                : "bg-white text-brand-navy/40 border border-brand-navy/5 hover:border-brand-orange/20"
            )}
          >
            <cat.icon className="w-4 h-4" />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Script Display */}
      <div className="grid grid-cols-1 gap-8">
        {filteredScripts.map((script) => (
          <EliteCard key={script.id} className="p-0 overflow-hidden">
            <div className="border-b border-brand-navy/5 p-8 bg-brand-cream/30 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-brand-navy">{script.title}</h3>
                <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mt-1">{script.hook}</p>
              </div>
              <BrandButton 
                variant="outline" 
                size="sm" 
                onClick={() => copyToClipboard(script.content, script.id)}
              >
                {copiedId === script.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </BrandButton>
            </div>
            <div className="p-8 space-y-8">
              <div className="bg-white border border-brand-navy/5 rounded-2xl p-8 font-serif italic text-xl text-brand-navy leading-relaxed relative">
                <div className="absolute top-4 left-4 text-4xl text-brand-orange/10 font-black">"</div>
                {script.content}
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Execution Protocol</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {script.tips.map((tip, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-brand-navy/5 rounded-xl">
                      <Zap className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs font-bold text-brand-navy">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </EliteCard>
        ))}
      </div>
    </div>
  );
}
