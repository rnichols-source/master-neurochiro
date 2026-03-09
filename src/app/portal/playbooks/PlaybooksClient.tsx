"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Target, 
  Zap, 
  Users, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Search,
  Brain,
  Stethoscope,
  Activity,
  MessageSquare,
  AlertTriangle,
  Clock,
  UserPlus,
  RefreshCw,
  Info,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PlaybookSection {
  title: string;
  content: string;
  script?: string;
  tone?: string;
  pitfalls?: string[];
}

interface Playbook {
  id: string;
  title: string;
  description: string;
  icon: any;
  overview: string;
  sections: PlaybookSection[];
}

const playbooks: Playbook[] = [
  {
    id: "day1",
    title: "Day 1: The Discovery System",
    description: "Orientation, data collection, and authority stabilization.",
    icon: Search,
    overview: "Day 1 is not about education. It is about reducing uncertainty and stabilizing authority. The brain cannot commit when uncertainty is high. Your job is to lower the noise and gather clean data.",
    sections: [
      {
        title: "The Pre-Frame (First 2 Minutes)",
        content: "Orientation means the patient knows where they are, what is happening, and why. Predictability lowers stress.",
        script: "Dr: 'Mrs. Jones, before we begin, I want to be clear about my goal today. I am not here to treat your symptoms. I am here to evaluate the integrity of your nervous system. If I find a pattern of interference that I can help with, I will tell you. If I don't, I will help you find who can. Does that sound fair?'",
        tone: "Low vocal tonality, steady eye contact, non-rushed delivery.",
        pitfalls: ["Rushing to fill silence", "Trying to impress with big words", "Leaking reassurance too early"]
      },
      {
        title: "Clean Data Collection",
        content: "Collecting is not analyzing. Analyzing is not explaining. Gather information without interpreting it prematurely.",
        script: "Dr: 'When you say you have headaches, what is that preventing you from doing that is most important to you?' (Listen for the 'Why').",
        tone: "Curious, objective, investigative.",
        pitfalls: ["Giving mini-reports during the exam", "Solving the problem out loud", "Blurring Day 1 and Day 2 logic"]
      },
      {
        title: "The Post-Frame (Creating Anticipation)",
        content: "End Day 1 cleanly. The transition to Day 2 is where anticipation for clarity is built.",
        script: "Dr: 'We have gathered the data we need. I need time to step back and analyze these findings to see exactly how your system is adapting. I will have your results ready tomorrow at 5:00 PM. Do not change anything in your routine until we speak then.'",
        tone: "Stable, structured, authoritative.",
        pitfalls: ["Ending vaguely ('We'll see what's going on')", "Casual goodbyes", "Talking about price in the hallway"]
      }
    ]
  },
  {
    id: "day2",
    title: "Day 2: Report of Findings",
    description: "Problem definition and biologically justified recommendations.",
    icon: Target,
    overview: "Day 2 is not about convincing; it is about clarifying what is already structurally true. The brain commits when uncertainty drops through a clean decision architecture.",
    sections: [
      {
        title: "Problem Definition (The Revelation)",
        content: "A clean problem definition answers one question: what is actually wrong? Shorter explanations increase commitment by lowering cognitive load.",
        script: "Dr: 'Based on your scans, we see a significant gap between where your body is and where it needs to be to heal. This pattern of interference is called dysregulation.'",
        tone: "Serious, direct, simplified.",
        pitfalls: ["Data dumping every finding", "The anatomy lecture trap", "Overloading with complexity"]
      },
      {
        title: "The Biologically Justified Recommendation",
        content: "A recommendation is not a menu or a suggestion. It is a sequence based on adaptation, repetition, and structural logic.",
        script: "Dr: 'To reorganize this pattern, the biology requires consistent input. We are recommending 3 visits per week for the next 12 weeks to stabilize this baseline.'",
        tone: "Grounded, non-negotiable, contained.",
        pitfalls: ["Asking 'What do you want to do?'", "Offering multiple options to reduce tension", "Softening the plan when the patient looks unsure"]
      },
      {
        title: "The Financial Transition",
        content: "Present the investment confidently. Needing agreement destabilizes your tone.",
        script: "Dr: 'The total investment for this phase of reconstruction is $X,XXX. Most of our families choose the monthly installment of $XXX. Which works better for your budget?' (Then STOP talking).",
        tone: "Neutral, steady, comfortable with silence.",
        pitfalls: ["Apologetic tone", "Talking through the silence", "Identity attachment to the 'Yes'"]
      }
    ]
  },
  {
    id: "careplan",
    title: "Care Plan Architecture",
    description: "Protecting adaptation through frequency and timing.",
    icon: Zap,
    overview: "Care plans are not financial structures; they are biological sequences. Frequency is the spacing of neurological input required for the system to reorganize.",
    sections: [
      {
        title: "Repetition vs. Adaptation",
        content: "The nervous system learns through repetition. Spacing that is too wide allows the old pattern to regain dominance.",
        script: "Dr: 'We aren't just moving bone; we are retraining a neurological reflex. Like a workout, the frequency creates the change, not just the individual visit.'",
        tone: "Educational, firm, grounded in biology.",
        pitfalls: ["Reducing frequency because the patient 'feels better'", "Letting the schedule dictate the biology", "Vague end points"]
      },
      {
        title: "The Early Improvement Trap",
        content: "Symptom relief is a perception shift. Pattern change is a regulatory shift. Do not shrink structure to reduce emotional tension.",
        script: "Dr: 'I am glad you are feeling better, but remember: feeling better is not the same as functioning better. We are in the stabilization phase, and the pattern is still fragile.'",
        tone: "Protective, steady, leadership-driven.",
        pitfalls: ["Relief-based care", "Softening frequency to be 'liked'", "Skipping re-exams"]
      }
    ]
  },
  {
    id: "objections",
    title: "The Objection Handling Matrix",
    description: "Containment of uncertainty and non-reactive posture.",
    icon: ShieldCheck,
    overview: "Objections are not disagreement; they are uncertainty expressed out loud. Persuasion is pressure, and pressure increases uncertainty. Containment stabilizes the environment.",
    sections: [
      {
        title: "The 'I Need to Think About It' Matrix",
        content: "When someone hesitates, they are scanning for risk. Silence is leverage because it gives the nervous system room to regulate.",
        script: "Dr: 'I understand. Usually, when someone says they need to think about it, it is either because they do not believe this is the solution to their problem, or they do not believe they can afford it. Which one is it for you?'",
        tone: "Extreme empathy, zero aggression, total stability.",
        pitfalls: ["Breaking the silence too quickly", "Speeding up your speech", "Defending your intelligence"]
      },
      {
        title: "The Spouse Objection",
        content: "This represents relational risk. Do not try to move them; hold the structure.",
        script: "Dr: 'I hear you. When you go home and explain this to [Spouse], are you going to tell them you found the solution, or that you are still looking for one?'",
        tone: "Challenging but calm.",
        pitfalls: ["Giving them a brochure to 'explain it'", "Becoming a salesman", "Softening the recommendation"]
      }
    ]
  },
  {
    id: "reexam",
    title: "The Re-Exam System",
    description: "Transitioning from stabilization to wellness.",
    icon: RefreshCw,
    overview: "Evaluation never stops. The re-exam is the hinge where commitment becomes long-term behavior. It is about reinforcing the 'Highway' logic.",
    sections: [
      {
        title: "The Transition Conversation",
        content: "Moving from Phase 1 (Stabilization) to Phase 2 (Reconstruction).",
        script: "Dr: 'Your system has stopped reacting to stress and has started adapting to the adjustments. We have stabilized the baseline. Now, we begin the work of making this permanent.'",
        tone: "Celebratory but clinical.",
        pitfalls: ["Asking 'How do you feel?' as the primary metric", "Assuming they will just keep coming", "Vague future planning"]
      }
    ]
  },
  {
    id: "newhire",
    title: "Team Training: The 1st Phone Call",
    description: "Authority-driven front desk operations.",
    icon: UserPlus,
    overview: "Your team must mirror your clinical architecture. The first phone call is the 'Day 0' orientation. It must lower uncertainty before they ever see you.",
    sections: [
      {
        title: "Handling the Price Shopper",
        content: "The goal is to shift from 'How much?' to 'Can you help?'.",
        script: "Team: 'I understand price is important. Our doctors focus on evaluating the integrity of your nervous system first. We need to see if you have a pattern we can actually help with before we discuss care plans. Does that make sense?'",
        tone: "Helpful, structured, firm.",
        pitfalls: ["Quoting prices over the phone", "Being overly defensive", "Not orienting to the Day 1 process"]
      }
    ]
  }
];

export function PlaybooksClient() {
  const [activePlaybookId, setActivePlaybookId] = useState<string>(playbooks[0].id);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const activePlaybook = playbooks.find(p => p.id === activePlaybookId) || playbooks[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-32">
      {/* Sidebar Navigation */}
      <div className="lg:w-80 shrink-0 space-y-4">
        <div className="px-4 pb-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-navy/40">Clinical OS</p>
          <h2 className="text-xl font-black text-brand-navy">Playbook Library</h2>
        </div>
        <div className="space-y-2">
          {playbooks.map((p) => (
            <div 
              key={p.id}
              onClick={() => {
                setActivePlaybookId(p.id);
                setExpandedSection(0);
              }}
              className={cn(
                "p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 group",
                activePlaybookId === p.id 
                  ? "bg-brand-navy border-brand-navy text-white shadow-xl shadow-brand-navy/20" 
                  : "bg-white border-brand-navy/5 text-brand-navy/60 hover:border-brand-orange/40 hover:bg-brand-navy/5"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                activePlaybookId === p.id ? "bg-brand-orange text-white" : "bg-brand-navy/5 text-brand-navy/40 group-hover:text-brand-orange"
              )}>
                <p.icon size={20} />
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-sm truncate">{p.title}</h4>
                <p className={cn("text-[10px] font-bold uppercase tracking-wider", activePlaybookId === p.id ? "text-white/40" : "text-brand-navy/20")}>
                  {p.sections.length} Protocols
                </p>
              </div>
            </div>
          ))}
        </div>

        <EliteCard className="p-6 bg-brand-orange/5 border-brand-orange/20 mt-8">
          <div className="flex items-center gap-3 text-brand-orange mb-3">
            <Info size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Mastery Logic</span>
          </div>
          <p className="text-xs text-brand-navy/60 font-medium leading-relaxed italic">
            "Structure reduces persuasion. Sequencing reduces stress. Containment reduces volatility. Clarity reduces panic."
          </p>
        </EliteCard>
      </div>

      {/* Main Content Area: The Manual Reader */}
      <div className="flex-1 min-w-0">
        <motion.div
          key={activePlaybook.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* Playbook Header */}
          <div className="bg-white border border-brand-navy/5 rounded-[2rem] p-8 md:p-12 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <activePlaybook.icon size={180} className="text-brand-navy" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-brand-orange">
                <activePlaybook.icon size={20} />
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Active Protocol</p>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tighter leading-none">{activePlaybook.title}</h1>
              <p className="text-brand-gray text-lg font-medium max-w-2xl leading-relaxed">{activePlaybook.overview}</p>
            </div>
          </div>

          {/* Protocol Steps */}
          <div className="space-y-6">
            {activePlaybook.sections.map((section, idx) => (
              <EliteCard key={idx} className="p-0 overflow-hidden border-brand-navy/5 group/card">
                <div 
                  onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                  className="p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-brand-navy/5 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-black text-xs shrink-0 group-hover/card:bg-brand-orange transition-colors">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-black text-brand-navy">{section.title}</h3>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 text-brand-navy/20 transition-transform duration-300", expandedSection === idx && "rotate-180")} />
                </div>

                <AnimatePresence>
                  {expandedSection === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 md:p-12 pt-0 space-y-10 bg-brand-cream/20">
                        {/* Core Content */}
                        <div className="space-y-4">
                          <p className="text-brand-gray text-base leading-relaxed font-medium">
                            {section.content}
                          </p>
                        </div>

                        {/* Word-for-Word Script */}
                        {section.script && (
                          <div className="relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-orange rounded-full" />
                            <div className="bg-white border border-brand-navy/5 p-8 rounded-2xl shadow-sm italic font-serif text-xl text-brand-navy leading-relaxed relative">
                              <MessageSquare className="absolute top-4 right-4 w-5 h-5 text-brand-orange opacity-20" />
                              <div className="absolute -top-3 left-6 bg-brand-orange text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Exact Script</div>
                              "{section.script}"
                            </div>
                          </div>
                        )}

                        {/* Execution Details: Tone & Pitfalls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-brand-navy text-[10px] font-black uppercase tracking-widest">
                              <Activity className="w-4 h-4 text-brand-orange" />
                              Tone of Voice
                            </div>
                            <div className="p-5 bg-brand-navy text-white rounded-2xl text-sm font-bold leading-relaxed">
                              {section.tone}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-brand-navy text-[10px] font-black uppercase tracking-widest">
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                              Common Pitfalls
                            </div>
                            <div className="space-y-2">
                              {section.pitfalls?.map((p, i) => (
                                <div key={i} className="flex gap-3 text-xs font-bold text-brand-gray bg-white/50 border border-brand-navy/5 p-3 rounded-xl">
                                  <span className="text-red-500">•</span>
                                  {p}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-8 border-t border-brand-navy/5 flex justify-between items-center">
                          <div className="flex items-center gap-2 text-brand-navy/40">
                            <CheckCircle2 size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Protocol Checkpoint</span>
                          </div>
                          <BrandButton variant="outline" size="sm">Download Checklist</BrandButton>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </EliteCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
