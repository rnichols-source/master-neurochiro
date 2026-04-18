import { ReactNode } from "react";

export interface PlaybookSection {
  label: string;
  icon: string;
  title: string;
  content: ReactNode;
}

export interface PlaybookData {
  id: string;
  title: string;
  tagline: string;
  summary: string[];
  iconName: string;
  sections: PlaybookSection[];
}

export const playbooks1to4: PlaybookData[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // PLAYBOOK 1: DAY 1 — THE DISCOVERY SYSTEM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "day1",
    title: "Day 1: The Discovery System",
    tagline: "The complete first-visit system that builds trust and creates urgency for Day 2.",
    summary: [
      "Day 1 is about building safety, not delivering education.",
      "Follow the 10/20/70 Rule: 10% Orientation, 20% Data Collection, 70% Listening.",
      "Your only goal is to create a gap that only Day 2 can fill.",
      "Never interpret findings on Day 1. Premature explanation destroys Day 2 leverage."
    ],
    iconName: "Search",
    sections: [
      // SECTION 1: What this playbook is
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p>Day 1 is not an examination. It is a <strong>trust-building system</strong> disguised as a clinical visit.</p>
            <p>When a new patient walks through your door, their nervous system is in full alert mode. They are scanning everything: your handshake, your eye contact, your office, your staff, the way you move. They are not listening to your words. They are evaluating your <strong>stability</strong>.</p>
            <p>This playbook gives you the exact sequence, scripts, and checkpoints to convert that anxious stranger into a patient who shows up for Day 2 ready to commit. Not because you convinced them. Because you made them feel safe enough to decide.</p>
            <p><strong>The Discovery System has three jobs:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reduce the patient's threat response through predictability and calm authority.</li>
              <li>Gather clean clinical data without interpreting it prematurely.</li>
              <li>Create a gap — the emotional distance between where they are and where they want to be — that only your Day 2 Report of Findings can bridge.</li>
            </ul>
            <p>If you do Day 1 right, Day 2 sells itself. If you do Day 1 wrong, Day 2 becomes a fight.</p>
          </div>
        )
      },
      // SECTION 2: Why it matters
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p><strong>Here is the math that should scare you:</strong></p>
            <p>The average chiropractic office loses 30-40% of new patients between Day 1 and Day 2. They no-show. They cancel. They ghost. And the doctor blames the patient: "They weren't serious." "They were just shopping."</p>
            <p>Wrong. <strong>They were scared.</strong> And your Day 1 didn't make them safe enough to come back.</p>
            <p>Every lost Day 2 is a lost care plan. A lost care plan at $3,000 average case value means you are bleeding $90,000-$120,000 per year from a broken Day 1 system. That is not a clinical problem. That is a structural failure.</p>
            <p>But it gets worse. The patients who do show up for Day 2 after a weak Day 1 arrive with their guard up. They hit you with price objections, spouse excuses, and "I need to think about it." These aren't real objections. They are the residue of unresolved Day 1 anxiety.</p>
            <p><strong>A strong Day 1 eliminates 80% of Day 2 objections before they ever form.</strong></p>
          </div>
        )
      },
      // SECTION 3: What most doctors get wrong
      {
        label: "03 The Lecture Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p>Most doctors walk into Day 1 with a quiet, unconscious pressure to <strong>prove themselves</strong>. They feel evaluated — because they are. And when humans feel evaluated, they do one of two things: they shrink, or they perform.</p>
            <p>The shrinking doctor rushes through the exam, avoids eye contact, and seems uncertain. The performing doctor talks too much, explains too much philosophy, shows too many scans, and essentially delivers a TED talk the patient never asked for.</p>
            <p><strong>Both responses are failures.</strong></p>
            <p>The Lecture Trap sounds like this:</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Way</h5>
              <p className="text-sm text-brand-gray italic">"So Mrs. Johnson, let me explain how the nervous system works. You see, the brain sends signals down through the spinal cord, and when there's a subluxation — that's a misalignment — it puts pressure on the nerves and that's what causes your symptoms. Let me show you this model..."</p>
            </div>
            <p className="mt-4">The patient is nodding. But inside, their brain is doing one thing: <strong>building a wall</strong>. Information overload triggers the same neural pathway as physical threat. The more you talk, the more their brain says "this is complicated, this is risky, I need to think about this."</p>
            <p><strong>Authority is not personality. It is stability under evaluation.</strong> The best Day 1 doctors speak less than anyone else in the room.</p>
          </div>
        )
      },
      // SECTION 4: Hidden breakdowns
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "The 5 silent killers of Day 1",
        content: (
          <div className="space-y-4">
            <p>These are the mistakes you don't know you're making. They feel natural. They feel helpful. They destroy your conversion rate.</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Information Overload:</strong> Explaining subluxation, nervous system function, or your technique on Day 1. The patient's brain cannot process complex information while in a threat state. Save it for Day 2 when they feel safe.</li>
              <li><strong>Premature Interpretation:</strong> Looking at an X-ray and saying "Wow, look at this degeneration." You just scared them. Fear does not create commitment. Fear creates flight. Never interpret findings in real-time.</li>
              <li><strong>Reassurance Leaking:</strong> Saying "Don't worry, we can fix this" before you have even finished the exam. You are trying to make yourself feel better, not the patient. Premature reassurance signals that you are uncomfortable with their discomfort.</li>
              <li><strong>Pace Matching:</strong> When the patient talks fast (anxious), you start talking fast. When they seem rushed, you rush. You should be the metronome. Your pace sets the room. Slow down when they speed up.</li>
              <li><strong>The Buddy Trap:</strong> Trying to be their friend instead of their doctor. Excessive small talk, self-deprecating humor, oversharing personal stories. Warmth is important. But warmth without authority is just a nice person they won't take seriously.</li>
            </ul>
          </div>
        )
      },
      // SECTION 5: The Blueprint — 10/20/70 Rule
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "The 10/20/70 Rule",
        content: (
          <div className="space-y-6">
            <p>This is the structural framework for every Day 1 visit. Memorize it. Drill it. Never deviate.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">10% — Orientation (First 3-5 Minutes)</h5>
              <p className="text-sm text-brand-gray">Tell them exactly what is going to happen. Sequence kills anxiety. When a brain knows what is coming next, it downregulates threat.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>You say:</strong> "Here's what we're doing today. First, I'm going to listen to your story. Then we'll run some specific scans and tests. After that, I'll take all of this data home tonight and analyze it carefully. Tomorrow, I'll walk you through exactly what I found and whether or not I can help you."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">20% — Data Collection (15-20 Minutes)</h5>
              <p className="text-sm text-brand-gray">Run your clinical exam. Gather your scans, X-rays, orthopedic tests, neurological screens. But here is the critical rule: <strong>Do not interpret anything out loud.</strong> When you see something on the scan, your face stays neutral. You write it down. You move on. Every finding you interpret in real-time is a piece of Day 2 leverage you just gave away for free.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">70% — Listening (The Majority of the Visit)</h5>
              <p className="text-sm text-brand-gray">This is where the magic happens. You are not listening for symptoms. You are listening for the <strong>gap</strong> — the distance between their current life and the life they want. Ask: "What is this pain preventing you from doing?" Ask: "If this were fixed, what would your life look like?" Ask: "What have you already tried?" Let them talk. The more they articulate the gap, the more they sell themselves on the solution.</p>
            </div>
          </div>
        )
      },
      // SECTION 6: Script — Standard New Patient
      {
        label: "06 Script: Standard",
        icon: "UserPlus",
        title: "Word-for-word: The Standard New Patient",
        content: (
          <div className="space-y-6">
            <p>This is your bread-and-butter Day 1 script. The patient has neck or back pain, found you online or through insurance, and has no strong opinion about chiropractic one way or another.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Greeting (30 seconds)</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, I'm Dr. [Name]. Thank you for coming in today. I know it takes a lot to pick up the phone and make this appointment, so I want to make sure your time here is well spent."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Orientation (2 minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Here's exactly what we're going to do today. First, I'm going to listen to you. I want to understand what's going on, how long it's been happening, and what it's keeping you from doing. Then, I'm going to run some very specific tests and scans so I can see what's happening inside — not guess, but see. After that, I'm going to take all of this data and analyze it tonight. Tomorrow, we'll sit down for about 12 minutes and I'll show you exactly what I found, whether I can help, and what the plan would look like. Fair enough?"</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Story (5-7 minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Tell me what's going on. Start wherever you want."</p>
              <p className="text-sm text-brand-gray mt-2">Let them talk. Do not interrupt. Nod. Take notes. When they finish, ask:</p>
              <p className="text-sm text-brand-gray italic mt-2">"And what is this preventing you from doing that matters most to you?"</p>
              <p className="text-sm text-brand-gray mt-2">This question is everything. Their answer IS the gap. Write it down verbatim. You will use their exact words on Day 2.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Exam (15-20 minutes)</h5>
              <p className="text-sm text-brand-gray">Run your scans. Perform your tests. Stay silent during findings. If the patient asks "Is that bad?" your response is always:</p>
              <p className="text-sm text-brand-gray italic mt-2">"I want to see the full picture before I give you any conclusions. I don't guess — I analyze."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Post-Frame (2 minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, I have everything I need. I'm going to take this data and go through it carefully tonight. I'm not going to rush this. Tomorrow at [specific time], I'll walk you through what I found. I'll tell you three things: what's happening, why it's happening, and exactly what we need to do about it. I'll see you at [time]. Do you have any questions before you leave?"</p>
            </div>

            <p><strong>Key:</strong> Notice the post-frame does not include reassurance. You did not say "Don't worry." You did not say "I think I can help." You created a clean gap. The patient now has to come back to close it.</p>
          </div>
        )
      },
      // SECTION 7: Script — The Skeptic
      {
        label: "07 Script: Skeptic",
        icon: "ShieldCheck",
        title: "Word-for-word: The Skeptic",
        content: (
          <div className="space-y-6">
            <p>This patient says something like: "I don't really believe in chiropractic" or "My doctor said I shouldn't see a chiropractor" or "I'm just here because nothing else worked." They are testing you. They want to see if you get defensive.</p>

            <p><strong>The wrong response:</strong> Getting triggered and launching into a defense of chiropractic. "Well actually, studies show..." You just lost. You took the bait.</p>

            <p><strong>The right posture:</strong> Complete non-reactivity. You don't need them to believe in chiropractic. You need them to trust your process.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">When They Say: "I don't really believe in chiropractic"</h5>
              <p className="text-sm text-brand-gray italic">"That's completely fair, Mr. Davis. I wouldn't ask you to believe in anything. I'm not here to sell you on chiropractic. I'm here to run some tests, look at the data, and tell you what I find. If it's something I can help with, I'll tell you. If it's not, I'll tell you that too and point you in the right direction. Either way, you'll leave here with more clarity than you walked in with. Fair enough?"</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">When They Say: "My doctor said I shouldn't see a chiropractor"</h5>
              <p className="text-sm text-brand-gray italic">"I respect your doctor. And I'd never ask you to go against their advice. What I can do today is run some specific tests that your medical doctor doesn't run — neurological scans that look at how your nervous system is functioning under stress. If the data shows something I can help with, I'll explain it to you. If it doesn't, I'll be the first to tell you. You're here. Let's at least get you some answers."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">When They Challenge During the Exam</h5>
              <p className="text-sm text-brand-gray italic">"Does this actually work?" or "How is cracking my back going to help?"</p>
              <p className="text-sm text-brand-gray italic mt-2">"Great question. And I'm not going to give you my opinion — I'm going to show you your data tomorrow and let you decide for yourself. I'd rather you make that call based on evidence than on my sales pitch."</p>
            </div>

            <p><strong>The principle:</strong> Never defend. Never debate. Redirect to data and process. The skeptic respects competence and hates being sold to. Give them competence. Remove the sales pressure. They will convert at a higher rate than your average patient because once they trust you, the trust is deep.</p>
          </div>
        )
      },
      // SECTION 8: Script — Chronic Pain Patient
      {
        label: "08 Script: Chronic",
        icon: "HeartPulse",
        title: "Word-for-word: The Chronic Pain Patient",
        content: (
          <div className="space-y-6">
            <p>This patient has been everywhere. They have seen medical doctors, specialists, physical therapists, acupuncturists, and maybe even other chiropractors. They carry a thick folder of MRIs. They speak in medical terminology. And beneath all of that, they are exhausted and skeptical.</p>

            <p><strong>What they are really saying:</strong> "I've been let down before. Please don't let me down again."</p>

            <p><strong>What most doctors do wrong:</strong> They try to differentiate themselves by bashing previous providers or making big promises. "Those other doctors didn't know what they were doing. I can fix this." This triggers the patient's BS detector immediately.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Opening — Acknowledge Their Journey</h5>
              <p className="text-sm text-brand-gray italic">"Sarah, I can see you've been through a lot. You've done the work. You've seen the doctors. You've tried the treatments. And the fact that you're still looking tells me something important — you haven't given up on yourself. That matters."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Reframe — Different Lens, Not Better Doctor</h5>
              <p className="text-sm text-brand-gray italic">"I'm not going to promise you anything today. What I am going to do is look at your situation through a different lens than what you've had before. Most of the providers you've seen were focused on the site of pain. I'm going to look at the system that's controlling the pain — your nervous system. It's possible that the reason nothing has worked is that nobody's looked at the right thing."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Gap Question — Go Deeper</h5>
              <p className="text-sm text-brand-gray italic">"Sarah, I have one important question. If we could change this — and I'm not saying we can yet — but if we could, what would your life actually look like? What would you do that you've stopped doing?"</p>
              <p className="text-sm text-brand-gray mt-2">This question often creates an emotional moment. Chronic pain patients have stopped dreaming. When you invite them to dream again, you unlock something no pill or injection ever touched. Let them sit in that moment. Do not rush past it.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Post-Frame — Honest and Clean</h5>
              <p className="text-sm text-brand-gray italic">"I'm going to be straight with you. I don't know yet if I can help. I need to look at your data. But I will know by tomorrow. And when you come in, I'll give you my honest answer — not a sales pitch, just the truth. Can you be here at [time]?"</p>
            </div>

            <p><strong>Why this works:</strong> Chronic pain patients have been over-promised their entire medical journey. When you under-promise and show genuine curiosity about their data, you become the first provider who didn't try to sell them. That is the most powerful position you can be in on Day 2.</p>
          </div>
        )
      },
      // SECTION 9: Script — The Referral
      {
        label: "09 Script: Referral",
        icon: "Users",
        title: "Word-for-word: The Referral Patient",
        content: (
          <div className="space-y-6">
            <p>This patient came in because someone told them to. Their friend. Their spouse. Their coworker. They don't have their own motivation yet. They are doing this for someone else.</p>

            <p><strong>The danger:</strong> Referral patients have borrowed urgency, not personal urgency. If you don't convert that borrowed urgency into their own why, they will drop off as soon as the referrer stops asking about it.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Opening — Honor the Referral, Then Shift</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, who sent you in?"</p>
              <p className="text-sm text-brand-gray italic mt-2">[Patient: "My wife, actually. She comes here and she's been telling me I need to get checked."]</p>
              <p className="text-sm text-brand-gray italic mt-2">"Smart wife. But here's what I want to know — setting aside what she wants for a second — is there something going on with you that you'd want to fix if you could?"</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Finding Their Own Gap</h5>
              <p className="text-sm text-brand-gray">Most referral patients, when asked directly, will reveal something: headaches they've been living with, stiffness they've accepted as normal, sleep problems, energy issues. They just never connected those things to something a chiropractor could address.</p>
              <p className="text-sm text-brand-gray italic mt-2">"So you've been waking up stiff every morning for two years and you just thought that was normal? Let's take a look at that. That's not normal — that's your body telling you something."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Post-Frame — Make It Personal</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, I'm glad your wife pushed you to come in. But this isn't about her anymore. What I'm seeing in your exam tells me we need to look at this more carefully. I'm going to analyze your data tonight. Come back tomorrow at [time] — not for her. For you."</p>
            </div>

            <p><strong>Key shift:</strong> You must transition ownership from the referrer to the patient within the first 10 minutes. If they leave Day 1 still thinking "I'm doing this for my wife," they will not commit on Day 2.</p>
          </div>
        )
      },
      // SECTION 10: Common Scenarios
      {
        label: "10 Scenarios",
        icon: "MessageSquare",
        title: "Common Day 1 scenarios with exact responses",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Patient asks: "Can you just adjust me today?"</h5>
              <p className="text-sm text-brand-gray italic">"I understand the temptation. But I never adjust on the first visit. Here's why: I don't guess with people's spines. I need to see the full picture first — your scans, your X-rays, the neurological data — before I put my hands on you. I want to be precise, not hopeful. Tomorrow I'll have your full analysis and we'll go from there."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Patient asks: "How much is this going to cost?"</h5>
              <p className="text-sm text-brand-gray italic">"Great question, and I promise I'll answer it fully tomorrow. Right now, I don't even know what you need yet. It would be irresponsible for me to quote you a number before I've analyzed your data. Tomorrow I'll give you the full picture — what's going on, what we need to do, and exactly what the investment looks like. Fair?"</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Patient asks: "Is it serious?"</h5>
              <p className="text-sm text-brand-gray italic">"I'm not going to speculate before I've looked at everything carefully. What I can tell you is that I'm glad you came in. Tomorrow I'll walk you through exactly what I'm seeing. No guesswork."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Patient seems rushed: "I only have 20 minutes"</h5>
              <p className="text-sm text-brand-gray italic">"I understand you're busy. But this is your health, and I don't cut corners. The exam takes about 30-35 minutes because I need accurate data to give you accurate answers. If today doesn't work, we can reschedule — but I won't rush this. You deserve better than that."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Patient starts crying during the history</h5>
              <p className="text-sm text-brand-gray">Do not fill the silence. Do not hand them a tissue and rush past it. Let them feel it. After a moment, say quietly:</p>
              <p className="text-sm text-brand-gray italic mt-2">"Take your time. This matters."</p>
              <p className="text-sm text-brand-gray mt-2">Three words. Then silence. This is one of the most powerful moments you can create. It shows the patient that you can hold space for their pain without flinching. That is authority.</p>
            </div>
          </div>
        )
      },
      // SECTION 11: Downstream effects
      {
        label: "11 Downstream",
        icon: "TrendingUp",
        title: "Downstream effects of a weak Day 1",
        content: (
          <div className="space-y-4">
            <p>Every problem in your practice can be traced back to a structural failure on Day 1. Here is the cascade:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Weak Day 1 → Day 2 No-Shows:</strong> If the patient doesn't feel the weight of their problem, they won't prioritize coming back. You'll burn through new patients like kindling.</li>
              <li><strong>Weak Day 1 → Price Objections on Day 2:</strong> When the patient doesn't feel the gap between where they are and where they want to be, your fee feels arbitrary. "That's expensive" really means "I don't feel like I need this badly enough."</li>
              <li><strong>Weak Day 1 → Spouse Objections:</strong> "I need to talk to my spouse" means "I don't have enough conviction to defend this decision." If Day 1 created deep personal urgency, they wouldn't need permission.</li>
              <li><strong>Weak Day 1 → Low PVA:</strong> Patients who weren't properly oriented on Day 1 drop off at visit 4-6. They came for pain relief, got some, and left. Your Day 1 never showed them that this was about more than pain.</li>
              <li><strong>Weak Day 1 → Referral Drought:</strong> Patients who don't have a transformational experience don't refer. A strong Day 1 is the beginning of a story they'll tell their friends.</li>
            </ul>
          </div>
        )
      },
      // SECTION 12: Mastery Indicators
      {
        label: "12 Mastery",
        icon: "Eye",
        title: "Mastery indicators",
        content: (
          <div className="space-y-4">
            <p>You have mastered Day 1 when:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>You speak less than the patient.</strong> If you timed your Day 1 visits, the patient should be talking 60-70% of the time. If you're talking more, you're lecturing.</li>
              <li><strong>You never interpret findings during the exam.</strong> Your face stays neutral when you see something significant. You write it down and move on. Zero leakage.</li>
              <li><strong>Your Day 2 show rate is above 90%.</strong> If fewer than 9 out of 10 new patients show up for Day 2, your Day 1 has a structural leak.</li>
              <li><strong>You feel comfortable with silence.</strong> You can ask a question and wait 10 seconds without speaking. You don't rescue the patient from their own thoughts.</li>
              <li><strong>Patients say "I've never had an experience like that."</strong> Not because you did something flashy. Because you listened when nobody else did.</li>
              <li><strong>You don't feel the urge to prove yourself.</strong> You walk into the room knowing you're the most qualified person to help them. That certainty is felt, not explained.</li>
            </ul>
          </div>
        )
      },
      // SECTION 13: Action Checklist
      {
        label: "13 Checklist",
        icon: "ClipboardCheck",
        title: "Day 1 action checklist",
        content: (
          <ul className="space-y-2">
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I orient the patient to the visit sequence within the first 3 minutes?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I ask "What is this preventing you from doing?" and write down their exact words?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I avoid interpreting any findings during the exam?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I keep my face neutral when I saw significant findings?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I avoid saying "Don't worry" or "I think I can help" before the data was analyzed?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I set a specific Day 2 appointment time (not "sometime tomorrow")?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I speak slower than the patient when they were anxious?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I end with a clean post-frame that creates a gap without giving reassurance?</li>
          </ul>
        )
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PLAYBOOK 2: DAY 2 — REPORT OF FINDINGS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "day2",
    title: "Day 2: Report of Findings",
    tagline: "The 12-minute framework that turns uncertainty into commitment.",
    summary: [
      "The ROF is decision architecture, not a sales pitch.",
      "12 minutes or less. Four parts: Problem, Consequence, Recommendation, Next Step.",
      "Present one plan. One price. One path. Never offer a menu.",
      "Tolerate the silence after you name the investment."
    ],
    iconName: "Target",
    sections: [
      // SECTION 1: What this playbook is
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p>The Report of Findings is not a sales presentation. It is <strong>decision architecture</strong>.</p>
            <p>You are constructing an environment where the patient can make a clear, informed decision about their health. You are not convincing them. You are not persuading them. You are removing the uncertainty that prevents commitment.</p>
            <p>Think of it this way: the patient walked into Day 1 with a question — "Can anyone help me?" Your job on Day 2 is to answer that question with absolute clarity in 12 minutes or less.</p>
            <p><strong>The 4-Part Structure:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>The Problem:</strong> What the data shows, in plain language.</li>
              <li><strong>The Consequence:</strong> What happens if they do nothing.</li>
              <li><strong>The Recommendation:</strong> Specific, singular, biologically justified.</li>
              <li><strong>The Next Step:</strong> Immediate action — not "think about it."</li>
            </ul>
            <p>If any one of these four parts is weak, the whole structure collapses and you'll hear: "I need to think about it."</p>
          </div>
        )
      },
      // SECTION 2: Why it matters
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p>This is the hinge of your entire practice. <strong>Everything leads to this moment and everything flows from it.</strong></p>
            <p>Your marketing brought them in. Your Day 1 created the gap. Now Day 2 either bridges that gap with a commitment or lets them walk out the door to "think about it" — which is code for "never come back."</p>
            <p>The numbers are brutal. The average chiropractic office closes 50-60% of Day 2 patients on a care plan. That means 4-5 out of every 10 new patients walk away. At a $3,000 average case value, a practice seeing 20 new patients per month is leaving $36,000-$60,000 on the table every single month.</p>
            <p>Not because the doctor is bad. Not because the patients don't need care. <strong>Because the ROF structure is weak.</strong></p>
            <p>A clean, well-structured ROF should convert 80-90% of patients. The difference between 55% and 85% close rate on 20 new patients per month at $3,000 average case value is <strong>$216,000 per year</strong>. That is the cost of a bad Day 2.</p>
          </div>
        )
      },
      // SECTION 3: What most doctors get wrong
      {
        label: "03 The Amateur Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p><strong>Trap #1: The Anatomy Lecture</strong></p>
            <p>The doctor spends 20-30 minutes explaining disc anatomy, nerve root compression, phases of degeneration, and the history of chiropractic. The patient nods along. Their eyes glaze. Internally, they are building a wall of cognitive fatigue. A tired brain does not commit — it delays.</p>

            <p><strong>Trap #2: The Menu of Options</strong></p>
            <p>"Well, Mrs. Johnson, you could come in once a week, twice a week, or three times a week. What do you think?" You just transferred all the clinical authority to the patient. You are asking them to be the doctor. This triggers a threat response. When humans are forced to make decisions they're unqualified to make, they default to the safest option: doing nothing.</p>

            <p><strong>Trap #3: The Apology Price</strong></p>
            <p>The doctor gets to the financial portion and their voice changes. It goes up. It speeds up. They start adding qualifiers: "Now, I know this might seem like a lot, but..." or "We do offer payment plans if that's easier..." Before the patient has even reacted, the doctor has apologized for the price. This signals that the doctor doesn't believe in their own value.</p>

            <p><strong>Trap #4: The "What Do You Think?" Close</strong></p>
            <p>Ending the ROF with "So, what do you think?" is handing the patient a loaded question with no right answer. They don't know what to think. Give them a next step, not an open-ended question.</p>
          </div>
        )
      },
      // SECTION 4: Hidden Breakdowns
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "The silent failures inside your ROF",
        content: (
          <div className="space-y-4">
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Unjustified Recommendation:</strong> Telling the patient they need 3x/week for 12 weeks without explaining the biological reason. The patient hears "36 visits" and thinks "that's a lot of visits." Without justification, frequency sounds like a sales target, not a clinical requirement.</li>
              <li><strong>Price Without Anchor:</strong> Saying "$3,200 for the full program" without first establishing what they'd lose by NOT doing it. Price without consequence is just a number. Price after consequence is an investment.</li>
              <li><strong>Rushing Past the Silence:</strong> You present the price. The patient pauses. Three seconds of silence feel like an hour. You panic and start talking: "We also offer a payment plan..." You just communicated that you're uncomfortable with your own fee. If you're uncomfortable, they will be too.</li>
              <li><strong>Emotional Leakage:</strong> Your tone changes when you discuss money. Your voice goes up at the end of the price ("It's three thousand two hundred?"). That upward inflection is a question — and it tells the patient you're not sure it's worth it.</li>
              <li><strong>No Transition Script:</strong> Moving from the clinical recommendation to the financial presentation without a clean bridge. The shift from "doctor" to "financial conversation" feels jarring when it's abrupt. You need a scripted transition.</li>
            </ul>
          </div>
        )
      },
      // SECTION 5: The Blueprint — 4-Part ROF
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "The 4-Part ROF Structure",
        content: (
          <div className="space-y-6">
            <p>Every ROF follows these four parts in this exact order. Do not rearrange them. Do not skip any of them. The sequence is designed to build neural momentum toward a decision.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Part 1: The Problem (3 minutes)</h5>
              <p className="text-sm text-brand-gray">Show them what's wrong using their own scans. Use plain language. No medical jargon. Compare their scans to normal. Point to the gap between where they are and where they should be. Use their own words from Day 1: "Remember yesterday when you told me you can't pick up your grandson? Here's why."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Part 2: The Consequence (2 minutes)</h5>
              <p className="text-sm text-brand-gray">This is where most doctors lose. They show the problem but skip the consequence. The patient thinks "Okay, so I have a misalignment. So what?" You must paint the picture of what happens if they do nothing. Not to scare them — to clarify the stakes. "Without correction, this pattern will continue to degrade. This is not something that gets better on its own. In 5 years, this is what this typically looks like."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Part 3: The Recommendation (3 minutes)</h5>
              <p className="text-sm text-brand-gray">One plan. One frequency. One duration. Biologically justified. "Based on what I'm seeing, your nervous system needs a specific correction protocol. That's 3 visits per week for the first 4 weeks, stepping down to 2 per week for 8 weeks. This isn't a preference — it's what your system requires to rebuild stability."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Part 4: The Next Step (2-4 minutes)</h5>
              <p className="text-sm text-brand-gray">Do not ask "What do you think?" Give them a clear next step. "Here's the investment for the full program. We have two ways to handle that. Which works better for you?" Then present the financial options and tolerate the silence.</p>
            </div>
          </div>
        )
      },
      // SECTION 6: The Full 12-Minute ROF Script
      {
        label: "06 Full ROF Script",
        icon: "BookOpen",
        title: "The complete 12-minute ROF dialogue",
        content: (
          <div className="space-y-6">
            <p><strong>Setting:</strong> The patient is seated across from you. Scans are on the screen. Door is closed. No interruptions.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Opening (30 seconds)</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, thank you for coming back today. I spent time with your data last night and I want to walk you through what I found. This should take about 12 minutes. Then I'm going to give you my honest recommendation and we'll go from there. Sound good?"</p>
              <p className="text-sm text-brand-gray mt-2">[Patient nods: "Yes."]</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Part 1: The Problem (3 minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Here's what I found. This is your scan, and this is what a healthy scan looks like. Do you see the difference here?"</p>
              <p className="text-sm text-brand-gray mt-2">[Patient: "Yeah, mine looks... worse."]</p>
              <p className="text-sm text-brand-gray italic mt-2">"Exactly. What this tells me is that your nervous system has been under significant stress. It's not functioning the way it should. This area here — this is what's driving the pain in your lower back and the stiffness you told me about yesterday. But here's the important thing: the pain is the symptom. This pattern of dysfunction is the cause."</p>
              <p className="text-sm text-brand-gray mt-2">[Patient: "So the pain is just the tip of the iceberg?"]</p>
              <p className="text-sm text-brand-gray italic mt-2">"That's exactly right. And that's why taking a pain pill or waiting it out won't fix the underlying issue."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Part 2: The Consequence (2 minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, I want to be honest with you. This pattern doesn't improve on its own. What happens over time is that it gets worse — slowly, but consistently. The degeneration we're seeing here is the result of years of this stress pattern going uncorrected. If we don't address it now, in 3-5 years, we're looking at a much more significant problem — potentially one that limits your options."</p>
              <p className="text-sm text-brand-gray mt-2">[Patient: "That's scary."]</p>
              <p className="text-sm text-brand-gray italic mt-2">"It's not meant to scare you. It's meant to give you the full picture so you can make the best decision for yourself. You told me yesterday that you want to be able to play with your grandkids without being in pain. This is what's standing between you and that."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Part 3: The Recommendation (3 minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Here's what I recommend. Based on the severity of what I'm seeing, your system needs a structured corrective protocol. That means 3 visits per week for the first 4 weeks to break the old pattern. Then we step down to 2 visits per week for the next 8 weeks as we rebuild stability. At the end of that 12 weeks, we re-scan and I'll show you the objective change."</p>
              <p className="text-sm text-brand-gray mt-2">[Patient: "Three times a week? That's a lot."]</p>
              <p className="text-sm text-brand-gray italic mt-2">"I understand it feels like a lot. Here's why it matters: your nervous system has been running this dysfunctional pattern for years. To interrupt that pattern and build a new one, it requires consistent input — especially early on. Think of it like physical therapy after a knee surgery. Nobody does PT once a month and expects to walk again. The frequency isn't my preference — it's what your system biologically requires to change."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Part 4: The Transition to Investment (2-3 minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, let me walk you through the investment. The full corrective program is 36 visits over 12 weeks. The total investment is $3,200."</p>
              <p className="text-sm text-brand-gray mt-2">[Pause. Do not speak. Count to 5 silently.]</p>
              <p className="text-sm text-brand-gray italic mt-2">"We handle that two ways. You can take care of it upfront and save 10%, which brings it to $2,880. Or we can break it into 3 monthly payments of $1,067. Which works better for you?"</p>
              <p className="text-sm text-brand-gray mt-2">[Patient: "Um... the monthly payments, I think."]</p>
              <p className="text-sm text-brand-gray italic mt-2">"Perfect. Let's get you set up. We'll start your first visit today."</p>
            </div>

            <p><strong>Total time:</strong> 10-12 minutes. Notice there was no anatomy lecture. No philosophy. No history of chiropractic. Just their problem, the consequence, the solution, and the next step.</p>
          </div>
        )
      },
      // SECTION 7: Financial Presentation Framework
      {
        label: "07 Financial Scripts",
        icon: "Activity",
        title: "Financial Presentation Framework",
        content: (
          <div className="space-y-6">
            <p>The financial conversation is not separate from the clinical conversation. It is the final part of it. The transition should feel seamless, not awkward.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Transition Script</h5>
              <p className="text-sm text-brand-gray italic">"Now let me walk you through the investment side. I want to be completely transparent with you about what this looks like financially, because I don't want money to be the thing that keeps you from getting the help you need."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Script: Presenting a $3,000 Care Plan</h5>
              <p className="text-sm text-brand-gray italic">"The full corrective program — everything we just talked about, the 36 visits over 12 weeks, the re-examinations, the progress scans — the total investment is $3,000. If you handle it upfront, I'll take 10% off, which brings it to $2,700. Or we can split it into 3 monthly payments of $1,000. Which works better for your situation?"</p>
              <p className="text-sm text-brand-gray mt-2">Then stop talking. The silence is not awkward — it is the space they need to decide. If you fill it, you communicate anxiety.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Script: Presenting a $5,000 Care Plan</h5>
              <p className="text-sm text-brand-gray italic">"Based on the severity of what we're seeing — and I want to be straight with you — this requires a more intensive protocol than average. The full corrective and stabilization program is $5,200 over 6 months. That covers all 60 visits, the re-examinations at week 6, 12, and 24, and the follow-up neurological scans. Upfront, with the prepay discount, that's $4,680. Or we can spread it across 6 monthly payments of $867. Which option works for you?"</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">How to Offer Payment Plans Without Apologizing</h5>
              <p className="text-sm text-brand-gray">The wrong way: "I know it's a lot of money, so we do have payment plans if you need them..."</p>
              <p className="text-sm text-brand-gray mt-2">The right way: Present both options as equals. The payment plan is not a concession — it is a standard option. Your voice tone should be identical when presenting either option. No vocal shift. No apologetic inflection.</p>
              <p className="text-sm text-brand-gray italic mt-2">"We handle it two ways. Upfront or monthly. Which works better for you?"</p>
              <p className="text-sm text-brand-gray mt-2">Notice the word "better." Not "easier." Not "more comfortable." "Better" implies both are good options.</p>
            </div>
          </div>
        )
      },
      // SECTION 8: Common Day 2 Scenarios
      {
        label: "08 Scenarios",
        icon: "MessageSquare",
        title: "Common Day 2 scenarios with exact responses",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Price Shocker: "Wow, that's a lot of money"</h5>
              <p className="text-sm text-brand-gray italic">"I understand. It is a significant investment. And I'd rather be honest with you about what it takes than give you a cheaper plan that doesn't work. Let me ask you this — what would it be worth to you to be able to [their Day 1 gap — pick up your grandson, sleep through the night, get back to the gym] without this hanging over you? We can break it into monthly payments that make it manageable. Which option works better?"</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Spouse Excuse: "I need to talk to my wife/husband"</h5>
              <p className="text-sm text-brand-gray italic">"Absolutely. I'd want you to include them in this decision. Let me ask you this though — if your spouse were sitting here right now, what do you think they'd want to know?"</p>
              <p className="text-sm text-brand-gray mt-2">[Patient usually says something about cost or necessity]</p>
              <p className="text-sm text-brand-gray italic mt-2">"Good. So they'd want to know if it's necessary and what it costs. You now have both of those answers. Would it help if I put together a simple summary you can show them tonight? And let's go ahead and hold your spot for tomorrow at [time]. If after talking to them you decide it's not the right time, just call us. But I don't want you to lose momentum."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The "Just Adjust Me" Patient: "Can you just pop my back?"</h5>
              <p className="text-sm text-brand-gray italic">"I could do that. But I'd be doing you a disservice. What I'm seeing on your scans isn't something that one adjustment fixes. It's a pattern of dysfunction that took years to develop. If I adjust you today and send you home, I'm putting a band-aid on a structural problem. You'll feel better for a day or two, and then you'll be right back where you started. I'd rather do it right than do it quick. That's why I'm recommending this protocol."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Insurance Question: "What does my insurance cover?"</h5>
              <p className="text-sm text-brand-gray italic">"Great question. Your insurance may cover a portion of the visits, and we'll verify those benefits for you. But I want to be clear about something: I design your care plan based on what your body needs, not what your insurance allows. If your insurance covers 12 visits but your system needs 36, the 12 visits won't fix the problem. So let's start with the right plan, and then we'll maximize whatever benefits you have. Fair?"</p>
            </div>
          </div>
        )
      },
      // SECTION 9: Downstream Effects
      {
        label: "09 Downstream",
        icon: "TrendingUp",
        title: "Downstream effects of a weak Day 2",
        content: (
          <div className="space-y-4">
            <p>A weak Day 2 doesn't just lose the patient. It poisons everything downstream.</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Weak Day 2 → Low Case Acceptance:</strong> You close 50% instead of 85%. On 20 new patients per month at $3,000 ACV, that's $21,000/month left on the table.</li>
              <li><strong>Weak Day 2 → Care Plan Negotiation:</strong> Instead of accepting your recommendation, patients negotiate. "Can I just try 2x/week?" Now you're the order-taker, not the doctor. Your clinical authority is gone.</li>
              <li><strong>Weak Day 2 → Early Dropoffs:</strong> Patients who weren't fully committed on Day 2 are the first to cancel at visit 6-8 when the initial relief wears off.</li>
              <li><strong>Weak Day 2 → Team Morale Issues:</strong> Your staff watches you stumble through ROFs. They hear patients leave without committing. They start doubting the system. That doubt spreads.</li>
              <li><strong>Weak Day 2 → Financial Stress:</strong> When you can't close, you start discounting. When you discount, you devalue your care. When you devalue your care, you resent your patients. That resentment shows up in your clinical delivery. It's a death spiral.</li>
            </ul>
          </div>
        )
      },
      // SECTION 10: The Post-ROF Protocol
      {
        label: "10 Post-ROF",
        icon: "RefreshCw",
        title: "What happens immediately after the ROF",
        content: (
          <div className="space-y-6">
            <p>The ROF doesn't end when the patient says yes. The next 15 minutes are critical for cementing commitment and preventing buyer's remorse.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Immediate First Adjustment</h5>
              <p className="text-sm text-brand-gray">Adjust them immediately after they commit. Do not let them leave without their first adjustment. This creates a physical anchor to the decision. They felt something change. Now their body confirms what their brain decided.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Scheduling Protocol</h5>
              <p className="text-sm text-brand-gray italic">"Let's get your first two weeks scheduled right now. We want to build momentum while your system is most responsive."</p>
              <p className="text-sm text-brand-gray mt-2">Schedule the next 6-8 visits before they leave. The more visits on the calendar, the more committed they feel.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Reinforcement Statement</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, you made a great decision today. Not because you chose our office — but because you chose to stop accepting pain as normal. That takes courage. We'll take it from here."</p>
            </div>
          </div>
        )
      },
      // SECTION 11: Mastery Indicators
      {
        label: "11 Mastery",
        icon: "Eye",
        title: "Mastery indicators",
        content: (
          <div className="space-y-4">
            <p>You have mastered Day 2 when:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Your ROF takes 12 minutes or less.</strong> If it takes 20+ minutes, you are lecturing, not clarifying.</li>
              <li><strong>Your case acceptance rate is 80% or above.</strong> Consistently. Not on good days — every day.</li>
              <li><strong>Your voice tone stays flat when you say the price.</strong> No upward inflection. No speeding up. No qualifiers. Just the number, then silence.</li>
              <li><strong>You never offer a menu of options.</strong> One plan. One price. Two payment methods. That's it.</li>
              <li><strong>You use the patient's own words from Day 1.</strong> "You told me yesterday that you can't pick up your grandson..." This is devastatingly effective because it shows you listened.</li>
              <li><strong>You don't chase patients who say no.</strong> You present with clarity and confidence, and then you respect their decision. Chasing signals desperation.</li>
              <li><strong>Patients say "When do we start?" before you finish.</strong> That means your structure built enough momentum that the decision became obvious.</li>
            </ul>
          </div>
        )
      },
      // SECTION 12: Action Checklist
      {
        label: "12 Checklist",
        icon: "ClipboardCheck",
        title: "Day 2 action checklist",
        content: (
          <ul className="space-y-2">
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I keep the entire ROF under 12 minutes?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I use the patient's own words from Day 1 when describing their problem?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I clearly state the consequence of inaction?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I present ONE recommendation — not a menu of options?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I biologically justify the frequency?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I state the price with a steady, downward tone?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I wait at least 5 seconds after stating the price before speaking?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I present two payment options as equals — not one as a fallback?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I adjust the patient immediately after they committed?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Did I schedule the next 6-8 visits before they walked out?</li>
          </ul>
        )
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PLAYBOOK 3: CARE PLAN ARCHITECTURE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "careplan",
    title: "Care Plan Architecture",
    tagline: "How to build and present care plans that patients accept with confidence.",
    summary: [
      "Care plans are biological protocols, not financial packages.",
      "Three phases: Acute Correction, Stabilization, Wellness/Maintenance.",
      "Never let a patient negotiate frequency. It undermines clinical authority.",
      "The financial conversation is clinical — present it that way."
    ],
    iconName: "FileText",
    sections: [
      // SECTION 1: What this playbook is
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p>A care plan is not a menu of visits. It is not a financial package. It is a <strong>biological protocol</strong> — a structured sequence of inputs designed to interrupt a dysfunctional pattern in the nervous system and replace it with a functional one.</p>
            <p>This playbook teaches you how to build care plans that are clinically defensible, financially profitable, and presented in a way that patients accept with confidence — not reluctance.</p>
            <p>The best care plan in the world is worthless if the patient doesn't accept it. And the most easily accepted care plan is worthless if it doesn't produce results. This playbook gives you both: <strong>clinical integrity and conversion power.</strong></p>
          </div>
        )
      },
      // SECTION 2: Why it matters
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p><strong>Your revenue is built on care plans.</strong> Not adjustments. Not walk-ins. Not insurance reimbursements. Care plans.</p>
            <p>A practice seeing 20 new patients per month with 80% case acceptance at $3,500 average care plan value generates $56,000/month in committed revenue. Drop that care plan value to $1,800 because you're building weak plans, and you're at $28,800. Same number of new patients. Half the revenue.</p>
            <p>But revenue is only half the story. Weak care plans produce weak clinical outcomes. Patients who come in sporadically get sporadic results. Then they tell their friends: "I tried chiropractic. It didn't really work." That kills your referral pipeline.</p>
            <p><strong>Strong care plans build strong outcomes, strong retention, and strong referrals.</strong> They are the engine of a scalable practice.</p>
          </div>
        )
      },
      // SECTION 3: What most doctors get wrong
      {
        label: "03 The Amateur Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p><strong>Mistake #1: Cookie-Cutter Plans</strong></p>
            <p>Every patient gets the same plan: 3x/week for 12 weeks, regardless of condition severity, age, or history. The patient can sense when the plan feels generic. If it feels like a template, it feels like a sales quota — not a clinical recommendation.</p>

            <p><strong>Mistake #2: Menu of Options</strong></p>
            <p>"You could come in once, twice, or three times a week." This is not patient empowerment. This is clinical abdication. You are the doctor. You know what their system needs. Present one plan. The right plan.</p>

            <p><strong>Mistake #3: Apologizing for Frequency</strong></p>
            <p>"I know three times a week is a lot, but..." You just told the patient that you think it's too much. If the doctor thinks it's too much, the patient will definitely think it's too much. Never apologize for what biology requires.</p>

            <p><strong>Mistake #4: Phase-Less Plans</strong></p>
            <p>A care plan without distinct phases feels endless. "Just keep coming in" is not a plan — it's a subscription with no exit strategy. Patients need to see a beginning, middle, and end. Each phase should have a name, a purpose, and a milestone.</p>

            <p><strong>Mistake #5: No Re-Exam Anchors</strong></p>
            <p>Without scheduled re-exams, the patient has no proof that the plan is working. They're paying for faith. Re-exams turn faith into evidence and are the most powerful retention tool you have.</p>
          </div>
        )
      },
      // SECTION 4: Hidden Breakdowns
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "Hidden breakdowns in care plan design",
        content: (
          <div className="space-y-4">
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Frequency Negotiation:</strong> When a patient says "Can I just do twice a week?" and you say "Sure, we can try that," you just communicated that the original frequency was negotiable — meaning it wasn't biologically necessary. This destroys trust in every future recommendation you make.</li>
              <li><strong>The Early Relief Dropout:</strong> Patient feels 40% better at visit 6. They start canceling. They say "I'm feeling better, do I still need to come?" You never oriented them to the difference between symptom relief and structural correction. The dropout was baked in from the start.</li>
              <li><strong>Financial Ambiguity:</strong> The patient accepted the plan but doesn't clearly understand the payment structure. They get confused. Confusion breeds resentment. Resentment breeds cancellation.</li>
              <li><strong>Missing the Transition to Wellness:</strong> You finish the corrective phase and... nothing. No transition conversation. No wellness presentation. The patient thinks they're "done" and disappears. You lost a lifetime patient because you didn't build the bridge.</li>
            </ul>
          </div>
        )
      },
      // SECTION 5: The Blueprint — Phase Structure
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "Building condition-specific care plans",
        content: (
          <div className="space-y-6">
            <p>Every care plan has three distinct phases. Each phase has a biological purpose, a specific frequency, and a clear milestone that marks the transition to the next phase.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Phase 1: Acute Correction (Weeks 1-4)</h5>
              <p className="text-sm text-brand-gray"><strong>Purpose:</strong> Break the dysfunctional pattern. Interrupt the stress cycle. Create neurological momentum.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Typical Frequency:</strong> 3x/week</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Why this frequency:</strong> The nervous system requires consistent, repeated input to break an established pattern. Less than 3x/week in the acute phase gives the old pattern time to re-establish between visits.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Milestone:</strong> Subjective symptom reduction of 30-50%. Objective improvement on functional tests. This is when the patient says "I'm starting to feel better." Your response: "Good. Now we protect the change."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Phase 2: Stabilization / Corrective (Weeks 5-12)</h5>
              <p className="text-sm text-brand-gray"><strong>Purpose:</strong> Build a new neurological baseline. Train the system to hold the correction without constant input.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Typical Frequency:</strong> 2x/week</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Why this frequency:</strong> The new pattern is fragile. It needs reinforcement, but not as intensively as Phase 1. Think of it as moving from "installing" to "hardening" the update.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Milestone:</strong> Subjective symptom reduction of 70-80%. Objective improvement on re-examination. Functional gains — patient reports doing things they couldn't before.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Phase 3: Wellness / Maintenance (Ongoing)</h5>
              <p className="text-sm text-brand-gray"><strong>Purpose:</strong> Maintain the new baseline. Prevent regression. Optimize long-term function.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Typical Frequency:</strong> 1-2x/month</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Why this frequency:</strong> The new pattern is established but still influenced by daily stress, posture, and lifestyle. Regular maintenance prevents the slow drift back into dysfunction.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Milestone:</strong> This is ongoing. The goal shifts from "fixing a problem" to "optimizing function." Re-exams every 12 weeks to monitor and adjust.</p>
            </div>
          </div>
        )
      },
      // SECTION 6: Script — 3-Month Corrective Plan
      {
        label: "06 Script: 3-Month Plan",
        icon: "BookOpen",
        title: "Word-for-word: Presenting a 3-month corrective care plan",
        content: (
          <div className="space-y-6">
            <p>This script picks up after you've completed the ROF (Problem, Consequence, Recommendation) and are transitioning into the specific plan structure.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Plan Presentation</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, here's exactly what I'm recommending and why. Your care plan has two phases.</p>
              <p className="text-sm text-brand-gray italic mt-2">Phase one is what I call the Correction Phase. This is where we break the pattern. It's 3 visits per week for the first 4 weeks — that's 12 visits. I know that sounds like a lot, but this is the most important window. Your nervous system has been running this dysfunctional pattern for years. To interrupt it, we need consistent, focused input. Skipping visits in this phase is like taking antibiotics for 3 days and then stopping — the infection comes back stronger.</p>
              <p className="text-sm text-brand-gray italic mt-2">Phase two is the Stabilization Phase. We step down to 2 visits per week for 8 weeks — that's 16 visits. Your body is learning to hold the correction on its own. We're building a new normal. At the end of these 12 weeks, we do a full re-scan and I'll show you — objectively — how much has changed.</p>
              <p className="text-sm text-brand-gray italic mt-2">The total program is 28 visits over 12 weeks."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Financial Bridge</h5>
              <p className="text-sm text-brand-gray italic">"Now let me tell you what this investment looks like. The full corrective program — all 28 visits, the mid-point exam, the final re-scan — is $3,200 total. You can take care of it upfront and save 10%, bringing it to $2,880. Or we break it into 3 monthly payments of $1,067. Which works better for you?"</p>
              <p className="text-sm text-brand-gray mt-2">[Silence. Wait.]</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">If They Say "That's a lot of visits"</h5>
              <p className="text-sm text-brand-gray italic">"I understand. And if there were a faster way to do this, I'd tell you. But the timeline is based on how your nervous system adapts — not my schedule. Cutting visits short is like stopping rehab before the bone heals. The pattern comes back. I'd rather do it right once than do it halfway and have you back here in 6 months with the same problem."</p>
            </div>
          </div>
        )
      },
      // SECTION 7: Script — 12-Month Wellness Plan
      {
        label: "07 Script: Wellness Plan",
        icon: "Sparkles",
        title: "Word-for-word: Presenting a 12-month wellness plan",
        content: (
          <div className="space-y-6">
            <p>This conversation happens at the re-exam at the end of the corrective phase. The patient has completed their initial care plan and you're transitioning them to ongoing wellness care.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Re-Exam Celebration</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, look at this. This is your scan from 12 weeks ago, and this is your scan today. Do you see the difference?"</p>
              <p className="text-sm text-brand-gray mt-2">[Patient: "Wow, that's a huge difference."]</p>
              <p className="text-sm text-brand-gray italic mt-2">"It really is. Your nervous system has made significant progress. You've done the hard work. And I think you can feel the difference, right?"</p>
              <p className="text-sm text-brand-gray mt-2">[Patient: "Absolutely. I feel like a different person."]</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Transition — Why Wellness Matters</h5>
              <p className="text-sm text-brand-gray italic">"Here's the thing I want to be honest with you about. This progress is real. But it's also new. Your nervous system has built a new pattern, but it's still the younger pattern — the old one has been there for years. Stress, posture, daily life — all of these can pull you back toward the old pattern if we don't maintain this. I've seen it happen. Patient does great through correction, stops care, and 6 months later they're back where they started."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Wellness Recommendation</h5>
              <p className="text-sm text-brand-gray italic">"What I recommend is a wellness program. This is maintenance — not intensive care. You'd come in twice a month. We'd do a re-scan every 12 weeks to make sure you're holding. The annual investment is $1,800 — that breaks down to $150 per month. Think of it like changing the oil in your car. You don't wait for the engine to blow. You maintain it so it keeps running well."</p>
              <p className="text-sm text-brand-gray mt-2">[Patient: "That sounds reasonable."]</p>
              <p className="text-sm text-brand-gray italic mt-2">"It is. And here's the best part — if anything starts to drift on your scans, we catch it early and correct it before it becomes a problem. You'll never be starting from scratch again."</p>
            </div>
          </div>
        )
      },
      // SECTION 8: Financial Conversation Framework
      {
        label: "08 Financial Framework",
        icon: "Activity",
        title: "The Financial Conversation Framework",
        content: (
          <div className="space-y-6">
            <p>The financial conversation is not a separate event from the clinical conversation. It is the final chapter of the same story. When you treat it as a separate, awkward event, the patient feels the shift in energy and their guard goes up.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Rule 1: Consequence Before Cost</h5>
              <p className="text-sm text-brand-gray">Never state the price before you've established the consequence of inaction. The price has no context without the stakes. $3,200 feels expensive when the problem feels optional. $3,200 feels reasonable when the alternative is progressive degeneration and a life limited by pain.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Rule 2: State the Price Once</h5>
              <p className="text-sm text-brand-gray">Say the number one time. Clearly. Confidently. With a downward inflection. Then stop. Do not repeat it. Do not qualify it. Do not immediately follow it with "but we have payment plans." Let the number land. Give it weight.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Rule 3: Two Options, Not Three</h5>
              <p className="text-sm text-brand-gray">Offer exactly two payment methods: pay in full (with discount) or monthly payments. Three options create decision paralysis. Two options create a simple binary choice. "Which works better for you?" Not "Which do you prefer?" — "prefer" implies one is worse.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Rule 4: Never Discount Under Pressure</h5>
              <p className="text-sm text-brand-gray">If a patient pushes back on price, do not lower it. The moment you lower the price, you confirm that the original price was inflated. Instead, hold the price and adjust the payment structure. "I can't lower the fee because the care plan is what your system requires. But I can add a fourth monthly payment to make it more manageable."</p>
            </div>
          </div>
        )
      },
      // SECTION 9: Handling "That's too many visits"
      {
        label: "09 Too Many Visits",
        icon: "MessageSquare",
        title: "Handling: \"That's too many visits\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> The patient isn't really saying "that's too many visits." They're saying "I don't understand why I need that many." It's a clarity problem, not a scheduling problem.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Response Option 1: The Biological Justification</h5>
              <p className="text-sm text-brand-gray italic">"I understand that feels like a lot. Let me explain why the frequency matters. Your nervous system has been running this pattern for years — maybe decades. To interrupt a pattern that deeply embedded, we need consistent, repeated input. Coming in once a week is like going to the gym once a week and expecting to get in shape. The frequency isn't about my schedule — it's about how your nervous system adapts. I'm working with biology here, not preference."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Response Option 2: The Comparison</h5>
              <p className="text-sm text-brand-gray italic">"If you tore your ACL and your orthopedic surgeon said you needed physical therapy 3 times a week for 8 weeks, would you say 'that's too much'? Probably not — because you'd understand the injury requires it. This is the same thing. Your nervous system has a structural problem that requires a specific amount of input to correct. I wouldn't ask you to come in more than you need. But I won't ask you to come in less than what works."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Response Option 3: The Direct Challenge</h5>
              <p className="text-sm text-brand-gray italic">"I hear you. And I could give you a plan with fewer visits. But I'd be doing you a disservice. A lower-frequency plan for your condition won't produce lasting results. You'll feel better temporarily, and then you'll be right back where you started. I'd rather give you the plan that actually works than the plan that's easier to say yes to."</p>
            </div>
          </div>
        )
      },
      // SECTION 10: Handling "That's too expensive"
      {
        label: "10 Too Expensive",
        icon: "MessageSquare",
        title: "Handling: \"That's too expensive\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> "Too expensive" almost never means they literally cannot afford it. It means the perceived value doesn't match the price. They haven't connected the investment to the outcome in a way that feels urgent.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Response Option 1: The Value Reframe</h5>
              <p className="text-sm text-brand-gray italic">"I understand. And I never want money to be the reason you don't get the help you need. Let me put this in perspective: over 12 weeks, this works out to about $38 per day. That's less than your daily coffee and lunch combined. The question isn't whether you can afford it — it's whether your health is worth $38 a day. Based on what your scans showed me, I think it is."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Response Option 2: The Consequence Reframe</h5>
              <p className="text-sm text-brand-gray italic">"I hear you. And I want to be honest with you about the alternative. The pattern we're seeing on your scans doesn't stay the same — it gets worse. In 3-5 years, you're looking at a much more significant problem with much more expensive solutions. An MRI is $2,000. A cortisone injection series is $3,000-$5,000. Surgery starts at $50,000. What I'm recommending is the most affordable option you have right now — because right now, correction is still possible."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Response Option 3: The Payment Restructure</h5>
              <p className="text-sm text-brand-gray italic">"Let's find a way to make this work. I can't lower the fee because the care plan is based on what your system needs. But I can restructure the payments. Instead of 3 payments, we can do 6 monthly payments of [amount]. Would that make it more manageable?"</p>
              <p className="text-sm text-brand-gray mt-2">Notice: you are restructuring the payment, not lowering the price. The fee stays the same. The flexibility is in the payment schedule.</p>
            </div>
          </div>
        )
      },
      // SECTION 11: Handling "My insurance only covers X visits"
      {
        label: "11 Insurance Limits",
        icon: "ShieldCheck",
        title: "Handling: \"My insurance only covers X visits\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> The patient has been trained by the medical system to believe that insurance defines the scope of care. They think if insurance covers 12 visits, then 12 visits is all they need. This is a framing problem, not an insurance problem.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Response Option 1: The Clinical Priority</h5>
              <p className="text-sm text-brand-gray italic">"I completely understand, and we'll absolutely use every benefit you have. Here's what I want you to understand though: I design your care plan based on what your body needs, not what your insurance allows. If your insurance covers 12 visits but your nervous system needs 28 visits to correct this, the 12 visits won't finish the job. They'll start it. And then you'll be somewhere in the middle — better than when you came in, but not corrected. We'll maximize your insurance benefits and then we'll work together on the balance."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Response Option 2: The Insurance Reality</h5>
              <p className="text-sm text-brand-gray italic">"Let me be real with you about how insurance works in this situation. Your insurance company doesn't know you. They haven't seen your scans. They haven't examined you. They set a generic visit limit based on averages, not on your specific condition. I've examined you. I've analyzed your data. And I'm telling you what your body specifically requires. We'll use every dollar of your insurance benefits. For the remainder, we have flexible payment options. Let's not let an insurance company's generic limit determine the quality of your health."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Response Option 3: The Out-of-Pocket Simplification</h5>
              <p className="text-sm text-brand-gray italic">"Great news — your insurance covers [X] visits, which reduces your out-of-pocket significantly. After insurance, your investment for the full program is [adjusted amount]. We can handle that upfront or spread it into monthly payments. Which works better?"</p>
              <p className="text-sm text-brand-gray mt-2">This is often the most effective approach. Instead of debating insurance philosophy, just do the math and present the remaining balance as the patient's investment. Simple. Clean. No debate.</p>
            </div>
          </div>
        )
      },
      // SECTION 12: Mastery Indicators
      {
        label: "12 Mastery",
        icon: "Eye",
        title: "Mastery indicators",
        content: (
          <div className="space-y-4">
            <p>You have mastered Care Plan Architecture when:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Every care plan has named phases.</strong> "Correction Phase" and "Stabilization Phase" are not optional labels — they are structural anchors that give patients clarity about where they are and where they're going.</li>
              <li><strong>You never offer a menu of frequency options.</strong> You present one plan. If the patient pushes back on frequency, you justify it biologically — you don't negotiate it.</li>
              <li><strong>Your average care plan value is $3,000+.</strong> If your ACV is below $2,500, your plans are too short, too infrequent, or underpriced.</li>
              <li><strong>Your Patient Visit Average (PVA) is 30+.</strong> If patients are dropping off before visit 20, your plan structure or re-exam process is broken.</li>
              <li><strong>You have a wellness transition script.</strong> Every corrective patient should be presented with a wellness option at their final re-exam. If you're losing patients at the end of correction, you're missing this transition.</li>
              <li><strong>Patients can explain their own plan.</strong> Ask a patient at visit 10: "What phase are you in and why?" If they can answer, your orientation was strong. If they can't, you over-explained the science and under-explained the structure.</li>
            </ul>
          </div>
        )
      },
      // SECTION 13: Action Checklist
      {
        label: "13 Checklist",
        icon: "ClipboardCheck",
        title: "Care plan action checklist",
        content: (
          <ul className="space-y-2">
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Does every care plan have at least 2 distinct, named phases?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Is the frequency in each phase biologically justified — not just "what I always recommend"?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Does the plan include scheduled re-exam dates before the patient starts?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Am I presenting one plan — not a menu of options?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Am I stating the price with a steady, confident tone and then waiting in silence?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Am I offering exactly two payment methods — not three?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Do I have a scripted response for "that's too many visits"?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Do I have a scripted response for "that's too expensive"?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Do I have a wellness transition script for the end of corrective care?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Can my patients explain what phase they're in and why?</li>
          </ul>
        )
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PLAYBOOK 4: THE OBJECTION HANDLING MATRIX
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "objections",
    title: "The Objection Handling Matrix",
    tagline: "Every objection you'll ever hear, with 2-3 proven responses for each.",
    summary: [
      "Objections are fear expressed as logic. Treat the fear, not the logic.",
      "Master Response Framework: Pause, Validate, Reframe, Redirect.",
      "Never defend. Never discount. Never chase.",
      "Your stability during objections IS the treatment."
    ],
    iconName: "MessageSquare",
    sections: [
      // SECTION 1: What this playbook is
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p>This is the largest playbook in the system, and for good reason. <strong>Objections are where cases are won or lost.</strong></p>
            <p>This playbook gives you word-for-word responses for every major objection you will encounter in practice. Not theoretical frameworks. Not "try something like this." Exact words. Proven scripts. Field-tested responses that convert hesitation into commitment.</p>
            <p>But scripts alone won't save you. You need to understand <strong>what an objection actually is</strong> before you can handle one. An objection is not a logical argument. It is not a rational analysis. An objection is a <strong>nervous system spike</strong> — a moment where the patient's threat response fires because something feels uncertain, scary, or too big.</p>
            <p>When you understand this, everything changes. You stop debating. You stop defending. You start <strong>containing</strong> — holding steady while the patient's nervous system regulates itself.</p>
          </div>
        )
      },
      // SECTION 2: Why objections happen
      {
        label: "02 Why Objections",
        icon: "Brain",
        title: "Why objections happen (fear, not logic)",
        content: (
          <div className="space-y-4">
            <p>Every objection is a fear wearing a logical disguise.</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>"I need to think about it"</strong> = I'm afraid of making the wrong decision.</li>
              <li><strong>"That's too expensive"</strong> = I'm afraid this won't be worth it.</li>
              <li><strong>"I need to talk to my spouse"</strong> = I'm afraid of getting in trouble for spending money.</li>
              <li><strong>"I'll just come when I'm in pain"</strong> = I'm afraid of committing to something I might not need.</li>
              <li><strong>"How long will this take?"</strong> = I'm afraid this will never end.</li>
            </ul>
            <p>When you respond to the logic — debating the price, explaining the timeline, justifying the frequency — you are treating the symptom. The fear underneath remains untouched. And fear that isn't addressed doesn't go away. It hardens into a "no."</p>
            <p><strong>The master operator treats the fear.</strong> They don't argue with the disguise. They validate the feeling, stabilize the room, and redirect toward the decision.</p>
          </div>
        )
      },
      // SECTION 3: Master Response Framework
      {
        label: "03 The Framework",
        icon: "Scale",
        title: "The Master Response Framework",
        content: (
          <div className="space-y-6">
            <p>Every objection response follows this four-step sequence. Memorize it until it becomes automatic.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 1: Pause (2-3 seconds)</h5>
              <p className="text-sm text-brand-gray">When the objection lands, do nothing. Do not react. Do not lean forward. Do not start formulating your response. Just pause. This communicates that you are not threatened by their hesitation. Most doctors react instantly — which signals anxiety. Your pause signals strength.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 2: Validate</h5>
              <p className="text-sm text-brand-gray">Acknowledge their feeling without agreeing with their conclusion. "I understand" or "That's a fair concern" or "I appreciate you being honest about that." Validation disarms the defensive posture. It says: "I heard you. You're not crazy for feeling that way."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 3: Reframe</h5>
              <p className="text-sm text-brand-gray">Shift the perspective without arguing. This is the art. You are not telling them they're wrong. You are showing them the situation from a different angle. "I understand it feels expensive. Let me put it in a different context..." or "I hear you. Let me share what usually happens when patients wait..."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 4: Redirect</h5>
              <p className="text-sm text-brand-gray">Move them back toward a decision. Not "So what do you think?" but "Which payment option works better for you?" or "Can you come in tomorrow at 3?" The redirect gives them a clear next step — it pulls them out of the objection loop and into action.</p>
            </div>
          </div>
        )
      },
      // SECTION 4: Objection 1 — "I need to think about it"
      {
        label: "04 Think About It",
        icon: "AlertTriangle",
        title: "Objection: \"I need to think about it\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> This is the most common objection and the most misunderstood. "I need to think about it" almost never means they need more time. It means they don't have enough clarity to decide right now. Something in your ROF left a gap — the problem didn't feel urgent enough, the recommendation didn't feel justified enough, or the price felt disconnected from the value.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Response</h5>
              <p className="text-sm text-brand-gray italic">"Sure, take your time. Here's my card. Call us when you're ready."</p>
              <p className="text-sm text-brand-gray mt-2">You just gave them permission to never come back. They won't call. They will "think about it" for 24 hours, life will get in the way, and you'll never hear from them again.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #1: The Clarity Check</h5>
              <p className="text-sm text-brand-gray italic">"I completely understand. This is a big decision and I want you to feel confident about it. Can I ask — what specifically do you want to think about? Is it the time commitment, the financial side, or whether this is the right approach? If I can give you clarity on any of those, I'd rather do it now while we're together than have you go home with unanswered questions."</p>
              <p className="text-sm text-brand-gray mt-2">This isolates the real objection. Often, "I need to think about it" is a mask for "it's too expensive" or "I'm not sure it'll work." Once you surface the real concern, you can address it directly.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #2: The Urgency Reframe</h5>
              <p className="text-sm text-brand-gray italic">"Of course. And I'd never pressure you into a decision. But I do want you to know something: the pattern we saw on your scans is progressive. It doesn't pause while you think about it. Every week that passes, the correction becomes harder and takes longer. I'm not saying this to rush you — I'm saying it because I'd feel terrible if you came back in 6 months and the situation was significantly worse. Can we at least get you started with the first two weeks while you think about the rest?"</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #3: The Appointment Hold</h5>
              <p className="text-sm text-brand-gray italic">"Absolutely. Take the time you need. Here's what I'd suggest — let me hold a spot for you tomorrow at [time]. That way, if you decide to move forward, you don't lose any momentum. If you decide it's not the right time, just give us a call. No pressure either way. But I don't want you to have to wait another week for an appointment if you do decide to start."</p>
              <p className="text-sm text-brand-gray mt-2">This keeps the door open without chasing. You've given them an easy next step that doesn't feel like commitment but maintains forward motion.</p>
            </div>
          </div>
        )
      },
      // SECTION 5: Objection 2 — "That's too expensive / I can't afford it"
      {
        label: "05 Too Expensive",
        icon: "AlertTriangle",
        title: "Objection: \"That's too expensive\" / \"I can't afford it\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> "Too expensive" is rarely a statement of financial reality. People who truly cannot afford something say "I can't do it." People who say "that's too expensive" are telling you the perceived value doesn't match the price tag. They can probably find the money — they just aren't convinced it's worth it yet.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Response</h5>
              <p className="text-sm text-brand-gray italic">"Well, we could reduce the visits and bring the cost down..." or "I understand, let me see what I can do on the price..."</p>
              <p className="text-sm text-brand-gray mt-2">You just confirmed that the price was inflated. And you just communicated that the care plan was negotiable — meaning it wasn't really based on clinical need. You've undermined your authority for this patient and every future patient they talk to.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #1: The Daily Breakdown</h5>
              <p className="text-sm text-brand-gray italic">"I hear you, and I respect you being upfront about that. Let me reframe this for a second. Over 12 weeks, this comes out to about $38 per day. I know that adds up. But let me ask you this — you told me yesterday that this pain is keeping you from [their specific gap from Day 1]. What is that worth to you? Not in dollars — in life. Because that's what we're really talking about here. This isn't a luxury. This is the investment to get your life back. And we can break the payments into monthly installments to make it workable."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #2: The Cost of Waiting</h5>
              <p className="text-sm text-brand-gray italic">"I understand the investment feels significant. Let me share something I've learned in [X] years of practice. Every patient who waits ends up spending more — not less. The problem progresses. The correction takes longer. And the options become more expensive and more invasive. An MRI alone is $2,000. A round of injections is $3,000-$5,000. Surgery is $50,000+. What I'm recommending right now is the least expensive path to correction that you have. In a year, that may not be true."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #3: The Payment Flexibility</h5>
              <p className="text-sm text-brand-gray italic">"I appreciate your honesty. The fee is the fee because the care plan is based on what your body needs — I won't compromise on that. But I can absolutely work with you on how we structure the payments. Instead of 3 payments, let's do 6 monthly payments of [amount]. Does that feel more manageable? The important thing is that we start. We can figure out the payment logistics."</p>
            </div>
          </div>
        )
      },
      // SECTION 6: Objection 3 — "My insurance won't cover that"
      {
        label: "06 Insurance",
        icon: "ShieldCheck",
        title: "Objection: \"My insurance won't cover that\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> The patient has been conditioned to believe that healthcare should be covered by insurance. If insurance doesn't cover it, it must not be necessary. This is a deeply ingrained belief that you cannot fight with logic — you have to reframe it.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Response</h5>
              <p className="text-sm text-brand-gray italic">"Yeah, insurance doesn't really cover chiropractic well..." or "Unfortunately, your plan doesn't cover this type of care..."</p>
              <p className="text-sm text-brand-gray mt-2">You just aligned yourself with the insurance company against the patient's care. You positioned insurance as the authority on what they need, not you.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #1: The Authority Reclaim</h5>
              <p className="text-sm text-brand-gray italic">"I understand the frustration with insurance. But here's something important: your insurance company has never examined you. They've never seen your scans. They don't know what's going on inside your nervous system. They set coverage limits based on averages and profit margins — not on your specific condition. I have examined you. I have seen your data. And my recommendation is based on what your body requires, not what an insurance algorithm allows. Let's use every benefit you have, and for the balance, we'll set up a payment plan that works."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #2: The Perspective Shift</h5>
              <p className="text-sm text-brand-gray italic">"Let me ask you something. Does your insurance cover a gym membership? A personal trainer? Organic groceries? Probably not. But you'd still invest in those things if they mattered to your health, right? Your insurance covers certain things and doesn't cover others. That doesn't mean the things it doesn't cover aren't valuable — it means insurance is limited. Your health shouldn't be limited by what your insurance decides to pay for."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #3: The Simplified Math</h5>
              <p className="text-sm text-brand-gray italic">"Good news — your insurance does cover [X visits / $X amount]. That means instead of $3,200, your out-of-pocket is only $2,100. We can split that into 3 monthly payments of $700. That's very manageable. And you're still getting the full corrective program. Which payment option works better for you?"</p>
              <p className="text-sm text-brand-gray mt-2">Skip the insurance debate entirely. Do the math. Present the remaining balance. Move to the close. Simple, clean, and non-confrontational.</p>
            </div>
          </div>
        )
      },
      // SECTION 7: Objection 4 — "I'll just come when I'm in pain"
      {
        label: "07 Come When Pain",
        icon: "AlertTriangle",
        title: "Objection: \"I'll just come when I'm in pain\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> This patient views chiropractic as a reactive service — like going to the ER. They don't understand the difference between pain management and structural correction. This is an education gap that your Day 1 and Day 2 should have prevented. If you're hearing this, your ROF didn't adequately separate symptom relief from pattern correction.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Response</h5>
              <p className="text-sm text-brand-gray italic">"Sure, we're always here when you need us."</p>
              <p className="text-sm text-brand-gray mt-2">You just agreed that symptom-based care is acceptable. You positioned your practice as a walk-in pain clinic. Your PVA will be 3-5 visits per patient and your revenue will be a fraction of what it should be.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #1: The Check Engine Light</h5>
              <p className="text-sm text-brand-gray italic">"I understand that instinct. Most people think about healthcare that way. But let me share something with you. Pain is your body's check engine light. By the time the light comes on, the damage has been building for a while. If you only come in when you're in pain, I'm just turning off the light — not fixing the engine. What I showed you on your scans today is the engine problem. The pain is just the warning signal. If we only address the signal and not the cause, you'll be back. And the next time, the problem will be worse."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #2: The Dental Analogy</h5>
              <p className="text-sm text-brand-gray italic">"Let me ask you this. Do you go to the dentist only when your tooth hurts? Or do you go for regular cleanings to prevent the cavity in the first place? Most people prevent dental problems. But for some reason, we wait until our spine — which protects our entire nervous system — is screaming at us before we do anything. What I'm recommending is the spinal equivalent of regular dental care. It's not about pain. It's about preventing the next crisis."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #3: The Pattern Reality</h5>
              <p className="text-sm text-brand-gray italic">"Here's what I've seen happen over and over again in my [X] years of practice. Patient comes in with pain. We fix the pain. They leave. Six months later, same pain, sometimes worse. They come back. We fix it again. They leave. This cycle repeats for years. Each time, the underlying problem gets a little worse. Each time, the correction takes a little longer. The patients who break the cycle are the ones who commit to the full correction protocol and then transition to maintenance care. They don't come back in crisis. They come in for check-ups. That's the difference between managing a problem and solving it."</p>
            </div>
          </div>
        )
      },
      // SECTION 8: Objection 5 — "I need to talk to my spouse"
      {
        label: "08 Spouse",
        icon: "Users",
        title: "Objection: \"I need to talk to my spouse\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> Sometimes this is genuine — they share finances and major decisions with their partner. But more often, it's a socially acceptable delay tactic. The patient doesn't feel confident enough in the decision to commit, so they invoke the one excuse you can't argue with: their spouse.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Response</h5>
              <p className="text-sm text-brand-gray italic">"Sure, talk it over and let us know."</p>
              <p className="text-sm text-brand-gray mt-2">Translation: "Go home, lose all emotional momentum, try to explain medical findings you half-remember to someone who wasn't here, and let them talk you out of it." This patient is gone.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #1: The Spouse Empowerment</h5>
              <p className="text-sm text-brand-gray italic">"Absolutely, I think that's smart. Big health decisions should involve your partner. Let me ask you — if your husband/wife were sitting here right now, what do you think their biggest question would be?"</p>
              <p className="text-sm text-brand-gray mt-2">[Patient usually answers: the cost or whether it's necessary]</p>
              <p className="text-sm text-brand-gray italic mt-2">"Good. So they'd want to know if it's medically necessary and how much it costs. You now have both answers. Here's what I'd suggest: I'll put together a simple summary you can show them. And let's hold a spot for you tomorrow at [time]. If they have questions, they're welcome to call me directly. But let's not lose the momentum."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #2: The Health Question</h5>
              <p className="text-sm text-brand-gray italic">"I respect that. Let me ask you this though — if you went to the emergency room today and the doctor said 'You need this treatment,' would you call your spouse first? Or would you do what the doctor recommended because it was medically necessary? I'm not saying this is an emergency. But I am saying this is medically necessary based on what I'm seeing. Your spouse trusts you to make good health decisions. What do you think they'd want you to do?"</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #3: The Invitation</h5>
              <p className="text-sm text-brand-gray italic">"How about this — bring them in. I'd love to show them your scans and walk them through what I showed you today. Sometimes seeing the data makes all the difference. Can they come in tomorrow at [time]? I'll take 10 minutes and answer all their questions directly."</p>
              <p className="text-sm text-brand-gray mt-2">This is a power move. Most patients won't actually bring their spouse, but the offer communicates confidence. You're not afraid of their spouse's scrutiny. You're inviting it.</p>
            </div>
          </div>
        )
      },
      // SECTION 9: Objection 6 — "How long will this take?"
      {
        label: "09 How Long",
        icon: "AlertTriangle",
        title: "Objection: \"How long will this take?\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> This patient is afraid of an endless commitment. They've probably been to other providers where the plan kept extending: "Just a few more visits." They want to know there's a finish line. This is a trust question disguised as a logistics question.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Response</h5>
              <p className="text-sm text-brand-gray italic">"It depends on how your body responds..." or "Everyone's different, so it's hard to say..."</p>
              <p className="text-sm text-brand-gray mt-2">You just introduced maximum uncertainty. The patient now pictures an endless, open-ended commitment with no exit strategy. Their threat response spikes. They're out.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #1: The Defined Timeline</h5>
              <p className="text-sm text-brand-gray italic">"Great question. I've designed your plan in two phases. Phase one is 4 weeks of intensive correction — that's where we break the old pattern. Phase two is 8 weeks of stabilization — that's where we build the new one. At the end of 12 weeks, we re-scan. At that point, I'll show you objectively what's changed and we'll decide together what the next step is. You'll always know exactly where you are in the plan. There are no surprises."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #2: The Milestone Approach</h5>
              <p className="text-sm text-brand-gray italic">"I won't keep you here a day longer than necessary. Here's how we'll know: at week 4, we do a progress check. At week 8, another one. At week 12, a full re-scan. Each checkpoint tells us exactly where you are and whether the plan needs to be adjusted. You'll always have evidence — not just my word. If at any point the data shows you're corrected ahead of schedule, we'll move you forward. I'm guided by the data, not a calendar."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #3: The Honest Comparison</h5>
              <p className="text-sm text-brand-gray italic">"I understand you want a clear timeline. Here's the honest answer: the corrective phase is 12 weeks. That's the timeline your nervous system needs based on the severity of what I'm seeing. I know that feels like a long time. But compare that to the alternative — living with this for the next 10 years because nobody corrected it. Twelve weeks to potentially change the trajectory of your health for the rest of your life. That's a pretty good trade."</p>
            </div>
          </div>
        )
      },
      // SECTION 10: Objection 7 — "I feel better, do I still need to come?"
      {
        label: "10 Feel Better",
        icon: "HeartPulse",
        title: "Objection: \"I feel better, do I still need to come?\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> This is the most dangerous objection because it feels positive. The patient is happy. They feel better. And now they want to quit early. They don't understand the difference between symptom relief and structural correction. If you lose them here, you lose them forever — and they'll tell everyone chiropractic "kind of worked."</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Response</h5>
              <p className="text-sm text-brand-gray italic">"Well, it's up to you. You can always come back if it flares up again."</p>
              <p className="text-sm text-brand-gray mt-2">You just validated quitting. You told them early relief = fixed. And you positioned your office as a place they come when things go wrong, not a partner in long-term health. They will quit. They will relapse. And they may or may not come back.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #1: The Construction Analogy</h5>
              <p className="text-sm text-brand-gray italic">"I'm so glad you're feeling better — that tells me your nervous system is responding. But here's the important thing: feeling better and being better are two different things. Think of it like building a house. The foundation is poured, the frame is up, and it looks like a house. But if you stop building now, it's not livable. It won't hold up in a storm. We're in the middle of building your neurological foundation. The pain going away is a great sign. But the structural correction isn't complete yet. If we stop now, the old pattern will come back — and next time it'll be harder to correct."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #2: The Data Anchor</h5>
              <p className="text-sm text-brand-gray italic">"That's great news, and I expected you to start feeling better around this point. Here's what I want to show you though — [pull up scans or functional tests]. This is where you started. This is where you need to be. And this is where you are now. You've made progress, but you're here in the middle. If we stop at this point, you'll drift back. The pattern isn't fully corrected yet. Let's finish what we started so the results stick."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #3: The Medication Analogy</h5>
              <p className="text-sm text-brand-gray italic">"Let me ask you this. If your doctor prescribed 30 days of antibiotics for an infection, and you felt better at day 10, would you stop taking them? You wouldn't — because you know the infection isn't gone just because the symptoms are. Same principle here. The symptoms are improving, which is great. But the underlying structural issue isn't resolved yet. We need to finish the protocol to make sure this doesn't come back."</p>
            </div>
          </div>
        )
      },
      // SECTION 11: Objection 8 — "My friend/other doctor said I don't need this"
      {
        label: "11 Outside Opinion",
        icon: "Users",
        title: "Objection: \"My friend / other doctor said I don't need this\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> Outside opinions create uncertainty. The patient was leaning toward yes, then someone they trust planted doubt. They're not disagreeing with you — they're confused by conflicting information. Your job is to re-establish clinical authority without bashing the outside voice.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Response</h5>
              <p className="text-sm text-brand-gray italic">"Well, your friend isn't a doctor..." or "That doctor doesn't know what they're talking about..."</p>
              <p className="text-sm text-brand-gray mt-2">You just attacked someone they trust. Now you're the defensive one, and they're going to side with the person who didn't seem threatened. Never bash an outside voice. It makes you look insecure.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #1: The Respectful Redirect</h5>
              <p className="text-sm text-brand-gray italic">"I appreciate you sharing that. And I respect anyone who's looking out for you. But here's the thing — your friend [or your doctor] hasn't seen your scans. They haven't examined your nervous system. They're giving an opinion based on limited information. I'm giving you a recommendation based on your data. Let me show you what I'm looking at and you can decide who has the fuller picture."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #2: The Different Lens</h5>
              <p className="text-sm text-brand-gray italic">"That's fair, and I appreciate you being open about that. Let me say something important: different providers look at different things. Your medical doctor is looking at blood work, imaging for fractures, and medication management. I'm looking at neurological function — how your nervous system is controlling your body. These are different lenses, and they can lead to different conclusions. Neither is wrong. But the lens I'm using shows something that needs attention. I'd rather you have all the information and make your own decision."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #3: The Evidence Offer</h5>
              <p className="text-sm text-brand-gray italic">"Here's what I'd suggest. You don't have to take my word for it. Let me print your scans and your results. Take them to your friend. Take them to your other doctor. Show them exactly what I showed you today. If after seeing the data they still say you don't need this, I respect that. But at least the opinion will be based on evidence, not assumption. Fair?"</p>
              <p className="text-sm text-brand-gray mt-2">This is a confident move. You're not threatened by outside scrutiny. You're inviting it. Most patients won't actually take the scans to their other doctor. But the confidence of the offer resolves the objection.</p>
            </div>
          </div>
        )
      },
      // SECTION 12: Objection 9 — "I want to try [other treatment] first"
      {
        label: "12 Other Treatment",
        icon: "RefreshCw",
        title: "Objection: \"I want to try [other treatment] first\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> The patient is hedging their bets. They might be thinking about massage, acupuncture, physical therapy, medication, or even just "resting and seeing if it goes away." This is a commitment avoidance strategy — they're choosing the less scary option first.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Response</h5>
              <p className="text-sm text-brand-gray italic">"Sure, try that and if it doesn't work, come back."</p>
              <p className="text-sm text-brand-gray mt-2">You just positioned yourself as the backup plan. The last resort. And you communicated that the other treatment might work — which undermines your own recommendation.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #1: The Upstream Explanation</h5>
              <p className="text-sm text-brand-gray italic">"I understand the instinct to explore options. Let me share something that might help your decision. [Massage/PT/medication/etc.] addresses the muscles, the symptoms, or the pain signals. What I'm addressing is the nervous system — the control center that's driving the dysfunction in the first place. It's like trying to fix a software problem by replacing the screen. The screen isn't the issue. If you want to try [treatment] first, that's your choice and I respect it. But in my experience, most people who try that route end up here eventually — because they treated the symptom but not the source."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #2: The Time Factor</h5>
              <p className="text-sm text-brand-gray italic">"Here's what concerns me about that approach. Every month that passes, the pattern we identified on your scans continues to progress. If you try [treatment] for 2-3 months and it doesn't address the structural issue — and based on my experience, it won't — you've lost 3 months of correction time. The problem will be harder to fix then. I'm not saying [treatment] is bad. I'm saying it addresses a different problem than the one I'm seeing on your scans."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #3: The "And" Approach</h5>
              <p className="text-sm text-brand-gray italic">"Actually, [treatment] can work really well alongside what we're doing. But it shouldn't be instead of it. Think of it this way: [massage/PT] addresses the muscles and soft tissue. I'm addressing the neurological pattern driving the problem. When you do both, the results are faster and more complete. But if you only do [treatment] without correcting the nervous system, the problem keeps coming back because the source is still there. Why not do both? Start the correction here, and add [treatment] if you want to accelerate the process."</p>
            </div>
          </div>
        )
      },
      // SECTION 13: Objection 10 — "Can I just get adjusted today?"
      {
        label: "13 Just Adjust Me",
        icon: "Zap",
        title: "Objection: \"Can I just get adjusted today?\"",
        content: (
          <div className="space-y-6">
            <p><strong>The psychology:</strong> This patient is trying to bypass the system. They want the service without the commitment. It's the equivalent of walking into a surgeon's office and saying "Can you just do the surgery without the pre-op?" They want relief, not correction. And they don't want to hear a recommendation that requires time and money.</p>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-red-400">
              <h5 className="font-black text-red-600 text-sm uppercase mb-2">The Wrong Response</h5>
              <p className="text-sm text-brand-gray italic">"Sure, let me adjust you real quick."</p>
              <p className="text-sm text-brand-gray mt-2">Congratulations — you just became a commodity. You're now "the cracker." They'll come in when they hurt, pay per visit, and never commit to a care plan. Your PVA will be 3. Your case value will be $150. And you'll need 200+ new patients per year just to keep the lights on.</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #1: The Professional Standard</h5>
              <p className="text-sm text-brand-gray italic">"I understand you want relief, and I want that for you too. But I don't adjust without data. I wouldn't feel right putting my hands on your spine without knowing exactly what I'm working with. It would be like a surgeon operating without imaging. I need to see what's going on inside before I can give you a safe, specific correction. That's not me being difficult — that's me protecting you. Let's get the data today, and tomorrow I'll have a complete picture and we'll go from there."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #2: The Precision Argument</h5>
              <p className="text-sm text-brand-gray italic">"I could adjust you right now and you might feel some temporary relief. But here's the problem: without analyzing your data, I'd be guessing. I don't guess with people's spines. I want to know exactly which segments need correction, in what direction, and with how much force. That precision is the difference between a random pop and a targeted neurological correction. Give me 24 hours with your data, and I'll give you the most precise adjustment you've ever had."</p>
            </div>

            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Right Response #3: The Value Distinction</h5>
              <p className="text-sm text-brand-gray italic">"I know you've probably had adjustments before where someone just cracked your back and sent you on your way. That's not what we do here. What I do is analyze your nervous system, identify the specific pattern of dysfunction, and deliver targeted corrections designed to change that pattern over time. That's why our patients get lasting results — not temporary relief. The analysis comes first. Always. Let's get your data and I'll have answers for you tomorrow."</p>
            </div>
          </div>
        )
      },
      // SECTION 14: Mastery Indicators
      {
        label: "14 Mastery",
        icon: "Eye",
        title: "Mastery indicators",
        content: (
          <div className="space-y-4">
            <p>You have mastered objection handling when:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>You welcome objections.</strong> You don't dread them. You see them as a sign the patient is engaged. A patient who raises objections is closer to yes than a patient who says nothing and leaves.</li>
              <li><strong>You pause before responding.</strong> Every time. Automatically. The 2-3 second pause has become a reflex, not a technique.</li>
              <li><strong>Your voice tone doesn't change.</strong> Whether the patient says "That sounds great" or "That's way too expensive," your tone stays steady. Your autonomic nervous system is regulated. You are the anchor.</li>
              <li><strong>You never discount.</strong> Not once. Not ever. You may restructure payments. You may add flexibility. But the fee never drops. Because you know the fee represents the value of the care.</li>
              <li><strong>You don't chase.</strong> If a patient walks out without committing, you don't call them 3 times. You send one follow-up message and move on. Desperation repels. Confidence attracts.</li>
              <li><strong>You can handle any objection in under 60 seconds.</strong> Your responses are concise and practiced. No rambling. No over-explaining. Validate, reframe, redirect. Done.</li>
              <li><strong>Your close rate on "objection patients" is above 60%.</strong> Not every objection converts. But if you're losing more than 40% of patients who raise objections, your responses need sharpening.</li>
            </ul>
          </div>
        )
      },
      // SECTION 15: Action Checklist
      {
        label: "15 Checklist",
        icon: "ClipboardCheck",
        title: "Objection handling action checklist",
        content: (
          <ul className="space-y-2">
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Have I memorized the Pause → Validate → Reframe → Redirect framework?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Have I practiced responses to all 10 objections out loud — not just read them?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Can I handle "I need to think about it" in under 60 seconds?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Can I handle "that's too expensive" without flinching, discounting, or apologizing?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Do I have my daily cost breakdown memorized for my most common care plan?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Am I tracking which objections I hear most often to identify ROF weaknesses?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Have I role-played objection scenarios with my team this week?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Am I pausing for 2-3 seconds before every objection response — every time?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Is my voice tone steady and downward when I respond to objections?</li>
            <li className="flex gap-3 text-sm font-bold text-brand-navy">✓ Am I following up with patients who said "I need to think about it" within 24 hours — once, not multiple times?</li>
          </ul>
        )
      }
    ]
  }
];
