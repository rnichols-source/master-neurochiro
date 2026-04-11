"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  FileText, Target, Zap, Users, ShieldCheck, CheckCircle2,
  ChevronDown, Search, Activity, MessageSquare, AlertTriangle,
  UserPlus, RefreshCw, Info, BookOpen, Scale, Eye, Brain,
  TrendingUp, Settings, HeartPulse, Sparkles, ClipboardCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Playbook {
  id: string;
  title: string;
  tagline: string;
  summary: string[];
  icon: any;
  sections: {
    label: string;
    icon: any;
    title: string;
    content: React.ReactNode;
  }[];
}

const playbookLibrary: Playbook[] = [
  {
    id: "day1",
    title: "Day 1: The Discovery System",
    tagline: "Reducing uncertainty and establishing authority through clinical orientation.",
    summary: [
      "Day 1 is about reducing patient anxiety, not education.",
      "Follow the 10/20/70 rule: 10% Orientation, 20% Data, 70% Listening.",
      "The goal is to create a 'Gap' that only Day 2 can fill."
    ],
    icon: Search,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "Day 1 is not an exam; it is a reducing patient anxiety. When a patient walks in, their nervous system is in 'alert mode.' They aren't looking for a neurology lecture; they are looking for safety, authority, and a reason to trust you. This system gathers clean data while establishing total clinical stability."
      },
      {
        label: "02 The Stakes",
        icon: Target,
        title: "Why it matters",
        content: "Uncertainty is a threat response. A threatened brain cannot choose health; it can only choose safety—which usually means doing nothing. If you miss the orientation on Day 1, the patient's brain stays in 'protection' mode. You can be the best doctor in the world, but if they don't feel safe, they will hesitate on Day 2."
      },
      {
        label: "03 The Amateur Trap",
        icon: AlertTriangle,
        title: "What most doctors get wrong",
        content: "The 'Lecture Trap.' Doctors walk into Day 1 feeling a quiet pressure to prove themselves. They talk too much, explain too much philosophy, and show too many scans. This increases the patient's 'information overload.' The more you talk, the more you signal insecurity. Authority isn't personality; it's stability under evaluation."
      },
      {
        label: "04 Hidden Breakdowns",
        icon: Zap,
        title: "The Information Overload Problem",
        content: "Explaining scans or findings in real-time is a massive mistake. It forces the patient to process complex data while they are already stressed. This creates 'Mental Friction.' When a patient feels overwhelmed, they don't say 'I'm confused'—they say 'I need to think about it' on Day 2."
      },
      {
        label: "05 The Blueprint",
        icon: Scale,
        title: "What good structure looks like",
        content: (
          <div className="space-y-4">
            <p>The 10/20/70 Rule for Day 1:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>10% Orientation:</strong> Tell them exactly what is happening next. Predictability kills stress.</li>
              <li><strong>20% Data:</strong> Gathering the clinical markers you need without interpreting them out loud.</li>
              <li><strong>70% Listening:</strong> Letting the patient articulate the 'Gap' between their current state and their desired life.</li>
            </ul>
          </div>
        )
      },
      {
        label: "06 Downstream Effect",
        icon: TrendingUp,
        title: "What weak structure causes",
        content: "Weak Day 1 structure leads to 'No-Shows' for Day 2 and price objections. If the patient doesn't feel the weight of their problem by the end of Day 1, they won't feel the value of your solution on Day 2. You cannot 'close' someone on Day 2 if you didn't 'open' them on Day 1."
      },
      {
        label: "07 Implementation",
        icon: Settings,
        title: "Step-by-Step Execution",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 1: The Orientation (First 5 Mins)</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Jones, here is what we're doing today. First, I'm going to listen to your story. Then, we'll run a few specific scans. Finally, I'll take that data and analyze it tonight. My goal is simple: to see if I can help you, or if I need to refer you to someone who can."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 2: Clean Data Collection</h5>
              <p className="text-sm text-brand-gray">Listen more than you speak. Ask: 'What is this preventing you from doing that matters most?' Do not interpret results out loud. Premature explanation weakens Day 2.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 3: The Post-Frame (The Gap)</h5>
              <p className="text-sm text-brand-gray italic">"I have the data. I'm going to step back and analyze this tonight. I'll have your results ready tomorrow. Until then, don't change anything. I'll see you at 5:00 PM."</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Mastery",
        icon: Eye,
        title: "What mastery looks like",
        content: "The master operator moves slower than everyone else. They don't rush. They don't leak reassurance. They are comfortable with silence. When they feel evaluated, they speak less, not more. They own the pace of the room."
      },
      {
        label: "09 Key Reminders",
        icon: Brain,
        title: "The Key Reminders",
        content: (
          <div className="space-y-3">
            <p className="font-bold italic">"Authority is stability."</p>
            <p className="font-bold italic">"Predictability is the antidote to uncertainty."</p>
            <p className="font-bold italic">"If you are explaining, you are losing."</p>
          </div>
        )
      },
      {
        label: "10 Checkpoints",
        icon: ClipboardCheck,
        title: "Action Checkpoints",
        content: (
          <ul className="space-y-2">
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Did I tell them the sequence of the visit within the first 5 minutes?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Did I interpret a finding before I was done with the whole exam?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Did I speak faster when they asked a question?</li>
          </ul>
        )
      }
    ]
  },
  {
    id: "day2",
    title: "Day 2: Report of Findings",
    tagline: "Moving from convincing to clarifying in the decision environment.",
    summary: [
      "ROF should be under 12 minutes. Clarity > Explanation.",
      "Move from 'Convincing' to 'Clarifying' structural truth.",
      "The recommendation is a biological requirement, not a preference."
    ],
    icon: Target,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "Day 2 is not a sales pitch; it is a Decision Architecture environment. You are clarifying the problem, the consequence of that problem, and the biologically justified path to fix it. If you feel pressure to persuade, your structure is weak."
      },
      {
        label: "02 The Stakes",
        icon: Target,
        title: "Why it matters",
        content: "This is the hinge of the entire clinical system. Day 2 either stabilizes commitment or introduces hesitation. The brain commits when uncertainty drops. Uncertainty drops when four things are clear: The problem, the consequence, the recommendation, and the next step."
      },
      {
        label: "03 The Amateur Trap",
        icon: AlertTriangle,
        title: "The 'Anatomy Lecture' Mistake",
        content: "Most doctors confuse explanation with clarity. They give 20-minute anatomy lectures thinking it builds value. It doesn't. It builds 'Cognitive Fatigue.' A tired brain delays. You are not there to teach them neurology; you are there to show them their life back."
      },
      {
        label: "04 Hidden Breakdowns",
        icon: Zap,
        title: "Unjustified Menus",
        content: "Offering 'menus' of options (1x, 2x, or 3x per week) without biological justification is just uncertainty transfer. When you ask a patient 'What do you want to do?' you are forcing them to be the doctor. This triggers a threat response and leads to 'I need to think about it.'"
      },
      {
        label: "05 The Blueprint",
        icon: Scale,
        title: "What good structure looks like",
        content: (
          <div className="space-y-4">
            <p>The ROF should be under 12 minutes. The focus is:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>The Gap:</strong> Where they are vs. where they need to be.</li>
              <li><strong>The Requirement:</strong> What biology demands to close that gap.</li>
              <li><strong>The Investment:</strong> A clean, stable financial presentation.</li>
            </ul>
          </div>
        )
      },
      {
        label: "06 Downstream Effect",
        icon: TrendingUp,
        title: "What weak structure causes",
        content: "Weak ROF structure causes 'Retention Drift.' If they don't understand the requirement, they will stop coming as soon as the pain goes away. A weak Day 2 is a guarantee of a weak Day 60."
      },
      {
        label: "07 Implementation",
        icon: Settings,
        title: "Step-by-Step Execution",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 1: Simple Problem Definition</h5>
              <p className="text-sm text-brand-gray">"Mrs. Jones, we found a significant gap between where your system is and where it needs to be to heal. This isn't just a symptom; it's a pattern of instability."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 2: Biologically Justified Recommendation</h5>
              <p className="text-sm text-brand-gray">Present the plan as a requirement of biology. "To close this gap, we need 3 visits per week for the next 12 weeks. This is the timeline your nervous system needs to rebuild."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 3: Confident Financial Transition</h5>
              <p className="text-sm text-brand-gray">State the investment. Name the monthly option. And then tolerate the silence. "Which works better for your budget?"</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Mastery",
        icon: Eye,
        title: "What mastery looks like",
        content: "Mastery is steady voice tone. If your voice goes up at the end of the price presentation, you've signaled uncertainty. The master speaks with 'a calm, steady tone.' They don't rescue the patient from the silence of the decision."
      },
      {
        label: "09 Key Reminders",
        icon: Brain,
        title: "The Key Reminders",
        content: (
          <div className="space-y-3">
            <p className="font-bold italic">"Move from convincing to clarifying."</p>
            <p className="font-bold italic">"A tired brain chooses 'No'."</p>
            <p className="font-bold italic">"Tolerate the silence."</p>
          </div>
        )
      },
      {
        label: "10 Checkpoints",
        icon: ClipboardCheck,
        title: "Action Checkpoints",
        content: (
          <ul className="space-y-2">
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Did I speak for more than 10 minutes before giving the recommendation?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Did I use 'soft' language like 'I think' or 'I hope'?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Did I wait at least 5 seconds after presenting the price?</li>
          </ul>
        )
      }
    ]
  },
  {
    id: "careplan",
    title: "Care Plan Architecture",
    tagline: "Protecting adaptation, repetition, and timing.",
    summary: [
      "Care plans are biological sequences, not financial packages.",
      "Adaptation requires repetition and timing. Spacing is clinical, not optional.",
      "Watch for the 'Early Improvement Trap' at visit 4-6."
    ],
    icon: Activity,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "Care plans are not financial packages; they are biological sequences. A care plan is a structured timeline designed to allow the nervous system to reorganize and run new patterns. It is a regulatory timeline based on Adaptation, not symptoms."
      },
      {
        label: "02 The Stakes",
        icon: Target,
        title: "Why it matters",
        content: "Adaptation requires repetition and timing. If the spacing between inputs is too long, the old pattern regains dominance. Frequency clarity stabilizes retention. If your frequency is emotional (based on how they feel) rather than biological, your results will be volatile."
      },
      {
        label: "03 The Amateur Trap",
        icon: AlertTriangle,
        title: "The 'Early Improvement' Trap",
        content: "This is where most care plans collapse. A patient feels 40% better after 4 visits. Both the doctor and patient feel relief. The doctor then softens the frequency to reduce emotional tension. But symptom relief is just a perception shift; pattern change is a regulatory shift. Reducing frequency early leads to inconsistent input and unstable adaptation."
      },
      {
        label: "04 Hidden Breakdowns",
        icon: Zap,
        title: "Frequency Negotiation",
        content: "When a doctor allows a patient to negotiate frequency ('Can I just do 1x/week?'), they are abdicating clinical authority. This signals that the frequency was arbitrary, not biological. If the frequency is arbitrary, the results are optional. This kills PVA and long-term retention."
      },
      {
        label: "05 The Blueprint",
        icon: Scale,
        title: "What good structure looks like",
        content: (
          <div className="space-y-4">
            <p>A robust care plan follows three distinct neurological phases:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Stabilization:</strong> High frequency to break the old stress pattern.</li>
              <li><strong>Recovery:</strong> Moderate frequency to build new neuro-structural habits.</li>
              <li><strong>Integration:</strong> Lower frequency to integrate the new pattern into daily life.</li>
            </ul>
          </div>
        )
      },
      {
        label: "06 Downstream Effect",
        icon: TrendingUp,
        title: "What weak structure causes",
        content: "Weak care plans collapse PVA (Patient Visit Average) and results. Patients drop out as soon as they feel better because they were never oriented to the 'Adaptation Window.' You end up with a revolving door of new patients instead of a stable community of lifestyle care."
      },
      {
        label: "07 Implementation",
        icon: Settings,
        title: "How to protect adaptation",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Phase 1: Stabilization (Momentum)</h5>
              <p className="text-sm text-brand-gray">"Mrs. Jones, we are in the Stabilization phase. Our goal is to break the momentum of your old stress pattern. This requires frequency. We cannot build a new habit with inconsistent input."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Handling the Early Improvement</h5>
              <p className="text-sm text-brand-gray">"I'm glad you're feeling better. But remember: feeling better is not the same as functioning better. We are building a new baseline, and that baseline is still very fragile. We must maintain the frequency to protect the change."</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Mastery",
        icon: Eye,
        title: "What mastery looks like",
        content: "Mastery is the ability to hold the structure under emotional evaluation. When a patient asks to come in less, the master doesn't get defensive—they simply restate the biological requirement with zero charge. They protect the adaptation, not their own comfort."
      },
      {
        label: "09 Key Reminders",
        icon: Brain,
        title: "The Key Reminders",
        content: (
          <div className="space-y-3">
            <p className="font-bold italic">"Protect the adaptation, not the comfort."</p>
            <p className="font-bold italic">"Feeling better is the trap; functioning better is the goal."</p>
            <p className="font-bold italic">"Frequency is biological, not emotional."</p>
          </div>
        )
      },
      {
        label: "10 Checkpoints",
        icon: ClipboardCheck,
        title: "Action Checkpoints",
        content: (
          <ul className="space-y-2">
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Have I explained the 'Early Improvement Trap' to my patients?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Did I lower frequency just because the patient looked 'busy'?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Are my re-exams scheduled at the end of phases, or are they random?</li>
          </ul>
        )
      }
    ]
  },
  {
    id: "objections",
    title: "The Objection Handling Matrix",
    tagline: "Containing uncertainty through non-reactive posture.",
    summary: [
      "Objections are just spikes in uncertainty, not disagreements.",
      "Containment > Persuasion. Maintain tonal stability.",
      "Silence is your most powerful clinical tool during a decision."
    ],
    icon: ShieldCheck,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "Objections are not disagreements; they are uncertainty expressed out loud. When a patient says 'It's expensive,' they are signaling a nervous system spike. Persuasion is an attempt to move them (pressure). Containment is the ability to stabilize the room."
      },
      {
        label: "02 The Stakes",
        icon: Target,
        title: "Why it matters",
        content: "If you react to their hesitation by talking faster or explaining more, you signal your own uncertainty. This confirms their fear. If you can contain their hesitation with silence and stability, you reduce their threat response and allow them to decide."
      },
      {
        label: "03 The Amateur Trap",
        icon: AlertTriangle,
        title: "The 'Rescue' Impulse",
        content: "When a patient hesitates, most doctors feel an impulse to 'rescue' them by offering a discount or talking them out of their fear. This weakens authority. You are not there to rescue them from their feelings; you are there to lead them through their decision."
      },
      {
        label: "04 Hidden Breakdowns",
        icon: Zap,
        title: "Tonal Reactivity",
        content: "Your tone tells the truth. If your voice becomes sharp, defensive, or overly sweet when an objection is raised, you have lost the room. The master maintains a neutral, stable 'Down-Tone' regardless of the patient's emotional state."
      },
      {
        label: "05 The Blueprint",
        icon: Scale,
        title: "What good structure looks like",
        content: (
          <div className="space-y-4">
            <p>The 3-Step Containment Sequence:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Listen:</strong> Allow them to finish their entire thought without interruption.</li>
              <li><strong>Reflect:</strong> Repeat back their concern with zero judgment.</li>
              <li><strong>Stabilize:</strong> Restate the requirement and tolerate the silence.</li>
            </ul>
          </div>
        )
      },
      {
        label: "07 Implementation",
        icon: Settings,
        title: "Step-by-Step Execution",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Handling the 'Price' Objection</h5>
              <p className="text-sm text-brand-gray italic">"I understand. It's a significant investment. My role is to tell you what your system requires to heal. Your role is to decide if that is a priority for you right now. I'm comfortable either way."</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Mastery",
        icon: Eye,
        title: "What mastery looks like",
        content: "Mastery is the ability to stay 'Parasympathetic' while the patient is 'Sympathetic.' You are the anchor in their storm of uncertainty. You don't take their hesitation personally because it isn't about you."
      },
      {
        label: "09 Key Reminders",
        icon: Brain,
        title: "The Key Reminders",
        content: (
          <div className="space-y-3">
            <p className="font-bold italic">"Objections are just spikes in uncertainty."</p>
            <p className="font-bold italic">"Contain, don't convince."</p>
            <p className="font-bold italic">"Your stability is their safety."</p>
          </div>
        )
      },
      {
        label: "10 Checkpoints",
        icon: ClipboardCheck,
        title: "Action Checkpoints",
        content: (
          <ul className="space-y-2">
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Did I interrupt them while they were expressing a concern?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Did my heart rate increase when they said 'It's expensive'?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Did I offer a discount before they even asked for one?</li>
          </ul>
        )
      }
    ]
  },
  {
    id: "drift",
    title: "Clinical Drift Prevention",
    tagline: "Identifying and correcting the silent softening of protocols.",
    summary: [
      "Drift is the trading of structural stability for emotional comfort.",
      "Most drift happens during 'early improvement' or busy shifts.",
      "Auditing your systems weekly is the only antidote to decay."
    ],
    icon: RefreshCw,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "Clinical Drift is the natural tendency of an operator to trade structural stability for emotional comfort over time. It starts with one exception ('Just this once') and ends with a chaotic, unpredictable practice."
      },
      {
        label: "02 The Stakes",
        icon: Target,
        title: "Why it matters",
        content: "Drift is the silent killer of PVA and clinical results. When you drift, you introduce uncertainty. When uncertainty rises, retention drops. You cannot lead a high-performance clinic with soft protocols."
      },
      {
        label: "03 The Amateur Trap",
        icon: AlertTriangle,
        title: "The 'Experience' Trap",
        content: "Thinking that because you've been in practice for years, you can 'wing it' without following the system. The most successful operators are those who follow the structure even when it feels repetitive."
      },
      {
        label: "04 Hidden Breakdowns",
        icon: Zap,
        title: "The Slow Softening",
        content: "Drift doesn't happen all at once. It happens when you stop doing the Day 3 onboarding, or when you start explaining findings on Day 1 because you're 'excited.' Every deviation from the operating system is a seed of practice instability."
      }
    ]
  },
  {
    id: "reexam",
    title: "Re-Exam Decision Logic",
    tagline: "Turning administrative tasks into neurological stabilization points.",
    summary: [
      "Re-exams are for decision-making, not just documentation.",
      "Move patients from 'Relief' into 'Lifestyle' through adaptation markers.",
      "Use stabilization points at visit 12, 24, and 36."
    ],
    icon: ClipboardCheck,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "Re-exams are the 'checkpoints' of the nervous system. They are not administrative tasks; they are strategic environments where you move the patient from the 'Crisis' phase into 'Lifestyle' care."
      },
      {
        label: "05 The Blueprint",
        icon: Scale,
        title: "The Re-Exam Schedule",
        content: (
          <div className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Visit 12:</strong> Stabilization check. Is the pattern holding?</li>
              <li><strong>Visit 24:</strong> Recovery check. Is the new habit forming?</li>
              <li><strong>Visit 36:</strong> Integration check. Moving to lifestyle frequency.</li>
            </ul>
          </div>
        )
      }
    ]
  },
  {
    id: "retention",
    title: "Retention Architecture",
    tagline: "Building a system that moves patients from pain to lifestyle care.",
    summary: [
      "Retention is built on Day 1 orientation, not Day 60 persuasion.",
      "Move patients from 'Relief' to 'Pattern' to 'Lifestyle'.",
      "Shift the goal from 'Feeling better' to 'Neurological baseline'."
    ],
    icon: RefreshCw,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "Retention is not about keeping people; it is about building a clinical culture where the nervous system is the primary asset. It is the architecture of long-term commitment based on biological reality, not symptom chasing."
      },
      {
        label: "02 The Stakes",
        icon: Target,
        title: "Why it matters",
        content: "High-volume clinics often struggle with retention because they focus on 'New Patient' acquisition. True stability comes from a base of lifestyle members who understand that the nervous system requires regular input to maintain regulation."
      }
    ]
  },
  {
    id: "authority",
    title: "Authority Under Evaluation",
    tagline: "Maintaining clinical stability when results or protocols are questioned.",
    summary: [
      "Stability IS Authority. Do not leak reassurance when challenged.",
      "Speak slower and use fewer words when under evaluation.",
      "Don't take clinical challenges personally; they are markers of patient uncertainty."
    ],
    icon: ShieldCheck,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "Authority is the ability to remain stable while being evaluated. When a patient challenges your care plan, your scans, or your results, they are testing the room for stability. If you react, you lose."
      },
      {
        label: "08 Mastery",
        icon: Eye,
        title: "The Silent Authority",
        content: "When a patient says 'I'm not sure this is working,' the master operator doesn't rush to show them a scan. They pause, hold eye contact, and say: 'Healing isn't a straight line. We are looking for the pattern of change, not the absence of symptoms. Are you ready to continue?'"
      }
    ]
  },
  {
    id: "environment",
    title: "Patient Decision Environment",
    tagline: "Structuring the clinic to support clear, high-level choices.",
    summary: [
      "The physical and tonal environment dictates the decision quality.",
      "Reduce clutter and noise to lower cognitive load.",
      "Every interaction should signal stability and high-level care."
    ],
    icon: Sparkles,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "The Decision Environment is the sum total of the sensory inputs a patient receives while in your clinic. If the environment is chaotic, their decisions will be based on survival. If it is stable, their decisions will be based on health."
      }
    ]
  },
  {
    id: "improvisation",
    title: "Structure vs Improvisation",
    tagline: "Balancing clinical systems with the need for individual connection.",
    summary: [
      "Structure provides safety; improvisation provides connection.",
      "Never improvise the system; only improvise the connection.",
      "A stable system allows the doctor to be fully present with the person."
    ],
    icon: Brain,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "This playbook defines the boundary between the 'Mechanical' parts of the practice (the system) and the 'Human' parts (the connection). High-level operators know that you cannot have deep connection without a stable structure to hold it."
      }
    ]
  },
  {
    id: "day3",
    title: "Day 3: Behavioral Stabilization",
    tagline: "Anchoring the patient to the clinical structure for long-term retention.",
    summary: [
      "Day 3 is about Onboarding, not reselling.",
      "Set the 'Rules of the Road' for rescheduling and re-exams.",
      "Anchor behavior early to prevent week-three drop-off."
    ],
    icon: UserPlus,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "Day 3 is not a 'resell'; it is Onboarding. Day 2 creates cognitive agreement; Day 3 creates behavioral stability. This is the visit where you train the patient how to navigate your system, hold their frequency, and understand the 'Rules of the Road' in your clinic."
      },
      {
        label: "02 The Stakes",
        icon: Target,
        title: "Why it matters",
        content: "Most retention collapses quietly because Day 3 was skipped or rushed. If you don't anchor behavior on Day 3, patients will start missing appointments by week three because the 'New Patient Energy' has faded and the clinical structure wasn't established."
      }
    ]
  },
  {
    id: "ceo",
    title: "CEO Nervous System Stability",
    tagline: "Managing self-regulation to lead a high-performance clinic.",
    summary: [
      "Your clinic is a mirror of your own nervous system.",
      "A Sympathetic doctor cannot lead a Parasympathetic healing room.",
      "Own your state before you walk through the clinical doors."
    ],
    icon: HeartPulse,
    sections: [
      {
        label: "01 Identity",
        icon: Info,
        title: "What this playbook is",
        content: "Your clinic mirrors your nervous system. If you are in a state of panic, your team will tighten, and your structure will soften. This playbook is about the internal work required to lead a $1M+ clinic."
      },
      {
        label: "03 The Amateur Trap",
        icon: AlertTriangle,
        title: "The Reactivity Cycle",
        content: "Revenue dips -> CEO panics -> CEO talks more in the ROF -> Conversion drops. Mastery is stopping the drift at the source: your own state."
      }
    ]
  }
];

export function PlaybooksClient() {
  const [activeId, setActiveId] = useState(playbookLibrary[0].id);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const activePlaybook = playbookLibrary.find(p => p.id === activeId) || playbookLibrary[0];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Playbooks</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Step-by-step guides for every patient interaction.</p>
      </div>

      {/* Playbook Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {playbookLibrary.map((p) => (
          <button
            key={p.id}
            onClick={() => { setActiveId(p.id); setExpandedSection(0); }}
            className={cn(
              "flex items-center gap-3 px-5 py-3 rounded-xl border transition-all whitespace-nowrap touch-target",
              activeId === p.id
                ? "bg-brand-navy border-brand-navy text-white shadow-sm"
                : "bg-white border-brand-navy/5 text-brand-navy/60 hover:border-brand-orange/40"
            )}
          >
            <p.icon size={16} className={activeId === p.id ? "text-brand-orange" : ""} />
            <span className="text-sm font-bold">{p.title}</span>
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-brand-navy/5 rounded-2xl p-5 md:p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-3">Key Takeaways</p>
        <ul className="space-y-2">
          {activePlaybook.summary.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm font-medium text-brand-navy">
              <span className="w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center shrink-0 text-xs font-bold text-brand-orange">{i + 1}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3">
        {activePlaybook.sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-brand-navy/5 overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left touch-target"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0",
                  expandedSection === idx ? "bg-brand-orange text-white" : "bg-brand-navy/5 text-brand-navy/40"
                )}>
                  <section.icon size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-orange">{section.label}</p>
                  <h3 className="text-base font-black text-brand-navy">{section.title}</h3>
                </div>
              </div>
              <ChevronDown className={cn("w-5 h-5 text-brand-navy/20 transition-transform shrink-0", expandedSection === idx && "rotate-180")} />
            </button>

            <AnimatePresence>
              {expandedSection === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 md:px-5 pb-5 pt-0">
                    <div className="text-sm text-brand-gray font-medium leading-relaxed pl-13">
                      {section.content}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
