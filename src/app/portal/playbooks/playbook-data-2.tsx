import { ReactNode } from "react";

interface PlaybookSection {
  label: string;
  icon: string;
  title: string;
  content: ReactNode;
}

interface Playbook {
  id: string;
  title: string;
  tagline: string;
  summary: string[];
  icon: string;
  sections: PlaybookSection[];
}

export const playbooks5to8: Playbook[] = [
  // ─────────────────────────────────────────────────────────────────
  // PLAYBOOK 5: CLINICAL DRIFT PREVENTION
  // ─────────────────────────────────────────────────────────────────
  {
    id: "drift",
    title: "Clinical Drift Prevention",
    tagline: "The weekly system that keeps your protocols sharp and your results consistent.",
    summary: [
      "Drift is the silent trade of structure for comfort — and it always costs you.",
      "PVA drops, results decline, income follows. In that order. Every time.",
      "A weekly 7-point audit is the only proven antidote to clinical decay."
    ],
    icon: "RefreshCw",
    sections: [
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p><strong>Clinical drift is the quiet erosion of everything you built.</strong> It is the natural, gravitational pull toward comfort that every operator experiences. It starts with one shortcut. One skipped step. One patient you let slide because you were tired, busy, or distracted.</p>
            <p>Drift is not a character flaw. It is a systems failure. Without a weekly mechanism to catch it, drift becomes your default operating mode within 90 days of building any new protocol.</p>
            <p><strong>Drift defined:</strong> Trading structural discipline for emotional comfort. Choosing what feels easy over what produces results. Letting the urgency of the day override the architecture of the system.</p>
            <p>This playbook gives you the weekly audit, the reset protocol, and the team accountability framework to catch drift before it costs you patients, revenue, and clinical outcomes.</p>
          </div>
        )
      },
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p><strong>Drift follows a predictable sequence.</strong> It is never random. It always moves in the same direction:</p>
            <p><strong>Step 1: Protocol softening.</strong> You skip one step because it feels redundant. Maybe you stop doing the full Day 1 orientation. Maybe you shorten your re-exam by five minutes. It feels harmless.</p>
            <p><strong>Step 2: PVA drops.</strong> Within 30 days of protocol softening, your patient visit average begins declining. Not dramatically. Just 2-3 visits. Enough that you don't notice it in real-time.</p>
            <p><strong>Step 3: Results decline.</strong> Patients who were getting better start plateauing. Re-exam numbers flatten. You start seeing more dropouts at visit 12-15.</p>
            <p><strong>Step 4: Revenue follows.</strong> Collections drop. New patient flow can't compensate for the retention loss. You start feeling the financial pressure and respond by working harder instead of working tighter.</p>
            <p><strong>The brutal truth:</strong> A 10% drop in PVA across 20 new patients per month costs you $120,000-$180,000 annually. That is the price of drift. That is the price of comfort.</p>
          </div>
        )
      },
      {
        label: "03 The Amateur Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p><strong>The Experience Fallacy.</strong> The most dangerous belief in chiropractic is: "I've been doing this long enough that I don't need the checklist anymore."</p>
            <p>Airline pilots have been flying for 30 years and they still use a pre-flight checklist. Surgeons with 10,000 procedures still follow the surgical safety protocol. The checklist is not for beginners. The checklist is the system.</p>
            <p><strong>Experience does not replace systems. Experience without systems is just confident inconsistency.</strong></p>
            <p>The doctor who has been in practice for 15 years and thinks they can "feel" when to skip the re-exam is the same doctor whose PVA has silently dropped from 48 to 31 over five years. They didn't notice because the drop was gradual.</p>
            <p>The top 1% of operators follow the system more strictly in year 10 than they did in year 1. That is not a coincidence. That is the difference between mastery and mediocrity.</p>
          </div>
        )
      },
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "The 5 most common drift patterns",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Drift Pattern 1: Shortening Visit Explanations Because You Are Busy</h5>
              <p className="text-sm text-brand-gray">This is the most common and the most expensive. You start dropping the opening frame on adjustments. Instead of explaining what you are checking and why, you walk in, adjust, and walk out. The patient stops understanding the value of each visit. They start thinking: "He just cracked my back." Within 8 weeks, they are questioning why they need to keep coming. Your busyness created their confusion.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Drift Pattern 2: Skipping the Day 1 Orientation Because "This Patient Seems Ready"</h5>
              <p className="text-sm text-brand-gray">A patient walks in and seems educated. Maybe they have been to a chiropractor before. Maybe they are a referral. You think: "They already get it. I can skip the orientation." This is a trap. Every single patient needs the full orientation. Not because they are uneducated. Because the orientation establishes YOUR authority in THIS office. Without it, they are comparing you to their last chiropractor for the entire care plan.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Drift Pattern 3: Not Following Up on No-Shows Within 24 Hours</h5>
              <p className="text-sm text-brand-gray">A patient misses a visit. You tell yourself you will call them tomorrow. Tomorrow becomes next week. Next week becomes never. The data is clear: a no-show contacted within 24 hours has a 73% chance of returning. A no-show contacted after 72 hours has a 22% chance. After 7 days, it drops to 8%. Every day you delay, you are choosing to lose that patient.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Drift Pattern 4: Letting Patients Set Their Own Schedule</h5>
              <p className="text-sm text-brand-gray">The patient says: "Can I come in next week instead of Wednesday?" You say yes because you don't want conflict. This is the moment you surrendered clinical authority. The care plan is not a suggestion. When you let patients modify the frequency, you are telling them that the schedule is negotiable. If the schedule is negotiable, the entire plan is negotiable. If the plan is negotiable, they will negotiate themselves out of care.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Drift Pattern 5: Dropping Re-Exams Because "They Are Doing Fine"</h5>
              <p className="text-sm text-brand-gray">The patient is feeling great. No complaints. You think: "Why run the re-exam? They are happy." This is the single biggest retention killer in chiropractic. The re-exam is not about finding problems. The re-exam is about proving progress. Without documented proof of improvement, the patient's decision to continue care is based entirely on how they feel. And feelings change. The moment they have a bad week, they quit because there is no objective reason to stay.</p>
            </div>
          </div>
        )
      },
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "The Weekly Audit System",
        content: (
          <div className="space-y-6">
            <p><strong>Run this 7-point checklist every Friday.</strong> It takes 15 minutes. It saves you $10,000+ per month in preventable drift.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Audit Point 1: Day 1 Orientation Compliance</h5>
              <p className="text-sm text-brand-gray">Pull the files of every new patient from this week. Did every single one receive the full orientation? Check for the orientation notes in the file. If even one patient was skipped, flag it and document why.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Audit Point 2: No-Show Follow-Up Speed</h5>
              <p className="text-sm text-brand-gray">Pull the no-show list for the week. For each no-show, check: Was the patient contacted within 24 hours? Was a specific return appointment scheduled during that call? If the answer to either is no, you have a drift problem in your front desk system.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Audit Point 3: Re-Exam Completion Rate</h5>
              <p className="text-sm text-brand-gray">How many patients were due for a re-exam this week? How many actually completed it? Your target is 95% completion. Below 90%, you have a scheduling problem. Below 80%, you have a clinical authority problem. Below 70%, you have a culture problem.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Audit Point 4: Visit Explanation Quality</h5>
              <p className="text-sm text-brand-gray">Have your CA or office manager observe 3 random patient visits. Are you delivering the opening frame? Are you explaining what you checked and what you found? Or are you adjusting and walking out? Be honest. Self-assessment is unreliable here. You need a second set of eyes.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Audit Point 5: Schedule Integrity</h5>
              <p className="text-sm text-brand-gray">Review the schedule for next week. How many patients are on their prescribed frequency? How many have self-modified? If more than 10% of your active patients are off-schedule, you have a drift problem in your scheduling conversations.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Audit Point 6: Care Plan Presentation Consistency</h5>
              <p className="text-sm text-brand-gray">For every Day 2 this week, did the doctor follow the full ROF structure? Check for the three phases. Check for the financial presentation. Check for the commitment close. If any step was skipped or shortened, that is drift.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Audit Point 7: Team Alignment Check</h5>
              <p className="text-sm text-brand-gray">Ask each team member one question: "What is the most important thing we do on Day 1?" If they cannot answer with "Reduce uncertainty and establish authority," your team has drifted from the operating system. Re-train immediately.</p>
            </div>
          </div>
        )
      },
      {
        label: "06 The Reset",
        icon: "RefreshCw",
        title: "How to reset when you have drifted: The 72-Hour Protocol",
        content: (
          <div className="space-y-6">
            <p><strong>You will drift. Every operator does.</strong> The question is not whether you will drift. The question is how fast you catch it and how aggressively you reset. Here is the 72-hour protocol for a full system reset.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Hour 0-24: The Honest Audit</h5>
              <p className="text-sm text-brand-gray">Block 30 minutes. Close your door. Run the 7-point audit above with complete honesty. Score yourself 1-10 on each point. Total score below 50 means significant drift. Below 35 means your operating system has effectively collapsed. Write down every specific area where you have softened.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Hour 24-48: The Team Reset Meeting</h5>
              <p className="text-sm text-brand-gray italic">"Team, I am going to be direct with you. We have drifted from our system. That is my responsibility, not yours. Starting tomorrow, we are going back to the full operating protocol. Here is exactly what that means for each of you."</p>
              <p className="text-sm text-brand-gray mt-2">Go through each role. Spell out the specific behaviors that need to return. Do not shame anyone. Do not blame anyone. Own it as the leader. But be crystal clear about the standard.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Hour 48-72: Full Protocol Execution</h5>
              <p className="text-sm text-brand-gray">For the next 5 business days, follow every single step of the operating system with zero deviation. No shortcuts. No exceptions. No "just this once." This is the recalibration period. It will feel slow. It will feel tedious. That discomfort is the feeling of structure replacing comfort. Lean into it.</p>
            </div>
          </div>
        )
      },
      {
        label: "07 Team Accountability",
        icon: "Users",
        title: "Team accountability framework",
        content: (
          <div className="space-y-6">
            <p><strong>Your team cannot hold a standard they have not been taught.</strong> Most accountability failures are clarity failures disguised as effort failures.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Morning Huddle Script (5 Minutes, Every Day, Non-Negotiable)</h5>
              <p className="text-sm text-brand-gray italic">"Good morning. Here is our day. We have [number] patients on the schedule. [Number] are new patients. [Number] are re-exams. Here are the three things I need from each of you today:"</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Sarah, I need every no-show from yesterday contacted before 10 AM. Read me the list."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Tom, I need the re-exam room set up by 9:15 for Mrs. Johnson. Her folder with her initial scans needs to be on the table."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Candace, the new patient at 2:00 is a referral from Mr. Davis. Make sure the orientation packet is printed and ready. Any questions? Good. Let us go."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Weekly Team Review (15 Minutes, Every Friday)</h5>
              <p className="text-sm text-brand-gray italic">"Team, here are our numbers for the week. We saw [number] patient visits. Our show rate was [percentage]. We had [number] no-shows. Of those no-shows, [number] were contacted within 24 hours. Our re-exam completion rate was [percentage]."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Here is what I am proud of this week: [specific win]. Here is what we need to tighten up: [specific area]. This is not about blame. This is about calibration. Questions?"</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Scripts",
        icon: "MessageSquare",
        title: "Scripts for holding your team accountable without being a jerk",
        content: (
          <div className="space-y-6">
            <p><strong>Accountability is not aggression.</strong> It is clarity delivered with respect. Here are the exact words for the most common situations.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">When a Team Member Skips a Step</h5>
              <p className="text-sm text-brand-gray italic">"Sarah, I noticed Mrs. Johnson did not get the orientation packet today. Help me understand what happened. I am not upset. I want to make sure the system is set up so this does not happen again. What do you need from me to make sure this step happens every time?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">When No-Shows Are Not Being Called</h5>
              <p className="text-sm text-brand-gray italic">"Tom, I pulled the no-show report from this week. Three patients were not contacted within 24 hours. That is not a criticism of your work ethic. That is a gap in our system. Let us fix it together. Can we block 9:00 to 9:30 every morning specifically for no-show calls? I will check in with you at 9:30 each day this week to make sure the system is working."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">When the Team Is Resisting the System</h5>
              <p className="text-sm text-brand-gray italic">"I hear you. The system feels like a lot of steps. I understand that. But here is what I need you to understand: every step exists because it protects a patient outcome. When we skip the orientation, patients drop out at visit 6. When we skip the no-show call, they never come back. These are not my rules. These are the rules that keep our patients getting better and keep this practice healthy. I need you with me on this. Are you with me?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">When You Need to Have a Difficult Conversation About Performance</h5>
              <p className="text-sm text-brand-gray italic">"Candace, I want to have a conversation with you. This is not a reprimand. This is a calibration. Over the past two weeks, I have noticed that re-exam scheduling has slipped. Three patients who were due did not get scheduled. I know you are capable of this because you were at 100% last month. What changed? What do you need from me to get back to that standard?"</p>
            </div>
          </div>
        )
      },
      {
        label: "09 Mastery",
        icon: "Eye",
        title: "Mastery indicators",
        content: (
          <div className="space-y-4">
            <p><strong>You have mastered drift prevention when:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your Friday audit takes less than 10 minutes because your team already knows the answers</li>
              <li>Your PVA has been stable within 2 visits for 90 consecutive days</li>
              <li>Your team corrects drift before you notice it</li>
              <li>No-show follow-up happens automatically without your involvement</li>
              <li>Every new patient receives the identical orientation experience regardless of how busy you are</li>
              <li>You feel mild discomfort when anyone suggests skipping a step. That discomfort is the system working</li>
              <li>Your re-exam completion rate is above 95% for 4 consecutive weeks</li>
              <li>You catch yourself drifting before the audit catches you. Self-awareness has become automatic</li>
            </ul>
          </div>
        )
      },
      {
        label: "10 Checkpoints",
        icon: "ClipboardCheck",
        title: "Action checklist",
        content: (
          <div className="space-y-3">
            <ul className="space-y-2">
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Block 15 minutes every Friday at 4:00 PM for the weekly audit
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Print the 7-point checklist and keep it on your desk
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Implement the daily morning huddle starting Monday
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Assign no-show follow-up to a specific team member with a specific daily time block
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Run the 72-hour reset protocol if your audit score is below 50
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Have one accountability conversation this week using the scripts above
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Track your PVA weekly and chart it. Look for the trend, not the number
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Schedule a monthly "System Integrity Day" where you re-read this playbook
              </li>
            </ul>
          </div>
        )
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // PLAYBOOK 6: RE-EXAM DECISION LOGIC
  // ─────────────────────────────────────────────────────────────────
  {
    id: "reexam",
    title: "Re-Exam Decision Logic",
    tagline: "Turn routine re-exams into the moments that lock in long-term commitment.",
    summary: [
      "Re-exams are where retention is won or lost. Treat them like the most important visit.",
      "Follow the 12/24/36 schedule: Stabilization, Recovery, Integration.",
      "The script for 'You are improving, here is why we continue' is worth $100K annually."
    ],
    icon: "ClipboardCheck",
    sections: [
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p><strong>The re-exam is the most underutilized revenue and retention tool in chiropractic.</strong> Most doctors treat it as an administrative obligation. A box to check. A form to fill out. That mistake costs the average practice $150,000 or more per year in lost retention.</p>
            <p>A re-exam is not paperwork. A re-exam is a strategic inflection point where you show the patient objective proof of change, reconnect them to their clinical goals, and transition them into the next phase of care.</p>
            <p>Done correctly, the re-exam is the single most powerful retention event in your entire care cycle. It is the moment where a patient who was thinking about quitting decides to stay. It is the moment where a patient who was on the fence about wellness care sees the evidence and commits.</p>
            <p>This playbook gives you the exact timing, the exact scripts, and the exact framework for making every re-exam a retention event.</p>
          </div>
        )
      },
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p><strong>Re-exams are where retention is won or lost.</strong> Not at the front desk. Not in the adjustment room. At the re-exam table.</p>
            <p>Here is why: Between re-exams, the patient is relying on subjective experience. "Do I feel better?" "Am I still in pain?" "Is this worth the time and money?" Those are emotional questions with unstable answers. A bad day at work can turn "I feel great" into "I am not sure this is working."</p>
            <p><strong>The re-exam replaces emotion with evidence.</strong> It gives the patient something they cannot argue with: objective data showing measurable change. When they can see the improvement on the scan, the conversation shifts from "Do I feel like continuing?" to "The data says I am improving."</p>
            <p>Practices that run re-exams at every milestone retain patients 2.4 times longer than practices that skip them. That is not a theory. That is data from thousands of practices. The re-exam is worth more to your bottom line than any marketing campaign you will ever run.</p>
          </div>
        )
      },
      {
        label: "03 The Amateur Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p><strong>The Paperwork Trap.</strong> Most doctors treat re-exams as documentation events. They rush through the scans, update the chart, and say something vague like: "Things look good, let's keep going." That is not a re-exam. That is a missed opportunity.</p>
            <p><strong>The second mistake: skipping the comparison.</strong> A re-exam without side-by-side comparison to the initial exam is worthless. The patient cannot see improvement unless you show them improvement. You must put the Day 1 scan next to the current scan and walk them through every single change.</p>
            <p><strong>The third mistake: no phase transition.</strong> The re-exam is where you move the patient from one phase of care to the next. If you do not explicitly name the transition, the patient does not know they have progressed. They think they are just "still coming to the chiropractor." Naming the phase change gives them a sense of accomplishment and a reason to continue.</p>
          </div>
        )
      },
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "Hidden breakdowns in the re-exam process",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Breakdown 1: The Re-Exam Gets Scheduled But Not Prioritized</h5>
              <p className="text-sm text-brand-gray">The patient is due for a re-exam at visit 12. But the schedule is packed. So you push it to visit 14. Then 16. By visit 18, the patient has been in care for 6 weeks without any objective feedback. They are making decisions based on feelings alone. That is how you lose patients.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Breakdown 2: The Doctor Rushes the Re-Exam</h5>
              <p className="text-sm text-brand-gray">A proper re-exam takes 10-12 minutes. If you are doing it in 4 minutes, you are not doing a re-exam. You are checking a box. The patient can feel the difference. When you rush, they think: "This must not be that important." If the re-exam is not important, the care plan is not important.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Breakdown 3: No Emotional Connection to the Progress</h5>
              <p className="text-sm text-brand-gray">You show the scans and say: "Your numbers are better." That is a fact, not a story. The patient needs to feel the progress. Connect the data to their life. "Mrs. Johnson, remember when you told me on Day 1 that you could not pick up your grandchildren? Look at this scan. This is why you can do that now."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Breakdown 4: The Doctor Does Not Ask for Recommitment</h5>
              <p className="text-sm text-brand-gray">The re-exam ends. The doctor says: "Great, see you next visit." There is no explicit ask for the patient to recommit to the next phase. Without that ask, the patient walks out thinking about whether to continue instead of having already decided to continue.</p>
            </div>
          </div>
        )
      },
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "Re-Exam at Visit 12, 24, and 36",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Visit 12: The Stabilization Check</h5>
              <p className="text-sm text-brand-gray"><strong>Purpose:</strong> Confirm that the initial pattern is responding to care. The question you are answering: "Is the pattern holding?"</p>
              <p className="text-sm text-brand-gray mt-2"><strong>What you are looking for:</strong> Reduction in acute findings. Improved range of motion. Changes in neurological scan patterns. Reduction in pain reports. Early signs of structural adaptation.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>The narrative for the patient:</strong> "Your body has moved out of crisis mode. The acute pattern is beginning to stabilize. We are now entering the corrective phase where we build on this foundation."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Visit 24: The Recovery Check</h5>
              <p className="text-sm text-brand-gray"><strong>Purpose:</strong> Verify that structural changes are becoming habitual. The question you are answering: "Is the new habit forming?"</p>
              <p className="text-sm text-brand-gray mt-2"><strong>What you are looking for:</strong> Consistent scan patterns between visits. Structural alignment holding for longer periods. Patient reporting functional improvements, not just pain reduction. Fewer acute flare-ups.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>The narrative for the patient:</strong> "Your nervous system is building a new pattern. The old habit is being replaced by a healthier one. We are transitioning from fixing the problem to maintaining the solution."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Visit 36: The Integration Check</h5>
              <p className="text-sm text-brand-gray"><strong>Purpose:</strong> Determine readiness for lifestyle care frequency. The question you are answering: "Is this patient ready for maintenance?"</p>
              <p className="text-sm text-brand-gray mt-2"><strong>What you are looking for:</strong> Stable scan patterns over multiple visits. Structural alignment holding between visits. Patient living at full functional capacity. No recurring acute episodes.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>The narrative for the patient:</strong> "Your structure is stable. Your nervous system has integrated the correction. Now we shift to lifestyle care, the same way you maintain your teeth with regular dental visits. This is about protecting what we built."</p>
            </div>
          </div>
        )
      },
      {
        label: "06 Visit 12 Script",
        icon: "MessageSquare",
        title: "Full Re-Exam Script at Visit 12",
        content: (
          <div className="space-y-6">
            <p><strong>Total time: 10 minutes. Every word matters.</strong></p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Opening (60 Seconds)</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, today is an important day. This is your first progress evaluation. I am going to run the same scans we did on Day 1, and then we are going to compare them side by side. This is where we find out exactly what your body has been doing over the past few weeks. Are you ready?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Running the Scans (3 Minutes)</h5>
              <p className="text-sm text-brand-gray">Run the scans in silence. Do not interpret as you go. Let the patient sit with the anticipation. This builds the emotional weight of the reveal.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Comparison (3 Minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, look at this. On the left is your scan from Day 1. On the right is today. Do you see this area here? On Day 1, this was showing significant neurological interference. Today, look at the change. Your nervous system is responding. This is not just pain relief. This is your body actually healing the pattern that was causing the problem."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Now, I want to be honest with you. We are not done. What we have accomplished is stabilization. The acute crisis is over. Your body has moved out of emergency mode. But the underlying structural pattern that caused this problem in the first place still needs correction. That is what the next phase is about."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Life Connection (2 Minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Let me ask you something. When you first came in, you told me you could not sleep through the night. You told me you were missing your grandchildren's soccer games. How has that been over the past few weeks?"</p>
              <p className="text-sm text-brand-gray mt-2">[Let the patient share. This is their moment. Their words become the evidence.]</p>
              <p className="text-sm text-brand-gray mt-2 italic">"That is what the scans are showing us. The changes you are feeling are matching the changes we are measuring. Your body is doing exactly what we need it to do."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Recommitment (60 Seconds)</h5>
              <p className="text-sm text-brand-gray italic">"Here is what happens next. We are entering the corrective phase. This is where we take the stability we have built and start correcting the structural pattern. Your visit frequency stays the same for now. At visit 24, we will run these scans again and see how the correction is holding. I am confident in where you are heading. Are you ready to keep going?"</p>
            </div>
          </div>
        )
      },
      {
        label: "07 Visit 24 Script",
        icon: "MessageSquare",
        title: "Full Re-Exam Script at Visit 24",
        content: (
          <div className="space-y-6">
            <p><strong>The Visit 24 re-exam is where you begin the wellness transition.</strong> The messaging shifts from "fixing" to "maintaining."</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Opening (60 Seconds)</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, we have reached a significant milestone. This is your second progress evaluation. You have been in care for approximately three months now, and I want to show you exactly where your body stands. This is one of my favorite visits because this is usually where we see the structural pattern really start to change."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Three-Scan Comparison (3 Minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, look at these three scans side by side. On the left is Day 1. In the middle is visit 12. On the right is today. Watch the progression. Day 1, your nervous system was in crisis. Visit 12, we saw stabilization. Today, look at this. Your nervous system is building a new pattern. The correction is not just holding. It is integrating. Your body is learning a new normal."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Wellness Transition (3 Minutes)</h5>
              <p className="text-sm text-brand-gray italic">"Here is what this means for your care going forward. Your body has done the hard work. The crisis is resolved. The correction is holding. Now we enter the most important phase, and honestly, this is the phase most people do not understand."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Think about it this way. If you worked out for three months and got into great shape, would you stop working out and expect to stay in shape? Of course not. Your spine and nervous system work the same way. The correction we have built needs to be maintained. Without regular check-ups, the old pattern has a tendency to creep back in over time."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"So here is my recommendation. We are going to begin reducing your visit frequency. Instead of three times per week, we are moving to twice per week. At visit 36, we will re-evaluate and likely move you to a maintenance schedule. This is progress. This is exactly where I want you to be."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Recommitment (60 Seconds)</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, I want you to feel proud of what you have accomplished. You committed to a plan and you followed through. Most people do not do that. Now let us finish what we started. Are you with me for the next phase?"</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Critical Scripts",
        icon: "MessageSquare",
        title: "The essential re-exam scripts",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Script: "You Are Improving — Here Is Why We Continue"</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>This is the most important script in your entire practice.</strong> This is the script you use when the patient is getting better and is starting to think: "If I am better, why do I still need to come?"</p>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, your results are excellent. Let me show you exactly what I mean. Look at the change from Day 1 to today. Your nervous system is responding beautifully. Now, here is the critical thing I need you to understand. The fact that you are feeling better is a sign that the correction is working. But feeling better and being corrected are two very different things."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Think about it this way. When you have a cavity filled at the dentist, the pain stops immediately. But the tooth is not fully healed for weeks. If you stopped taking care of it just because the pain was gone, the problem would come back, often worse than before."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Your spine works the same way. The pain is gone because the pressure on your nervous system has been reduced. But the structural pattern that caused the pressure is still being corrected. If we stop now, the pattern will return, and next time it will be harder to fix because your body will be older and less adaptable."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"I am not asking you to come forever. I am asking you to finish what we started. Let us get to the point where your correction is fully integrated, and then we will move you to a maintenance schedule that protects everything we have built. Fair enough?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Script: "Your Scans Show We Need to Adjust the Plan"</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, I want to be completely transparent with you. Your scans today are showing me that the correction is not holding the way I expected. Now, that does not mean we are going backward. It means your body needs more time in this phase before we can progress."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"There are a few reasons this can happen. Stress, sleep, posture habits at work, or even just the fact that the original pattern was more deeply ingrained than we initially measured. None of this is your fault. None of this means the care is not working. It means we need to adjust."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Here is what I recommend. We are going to maintain your current frequency for another four to six weeks. I am also going to add a specific adjustment to target this area that is not responding as quickly. At your next re-exam, I expect to see a significant shift. If I do not, we will have a deeper conversation about what is happening structurally. Sound good?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Script: Transitioning to Wellness and Maintenance</h5>
              <p className="text-sm text-brand-gray italic">"Sarah, this is the visit I have been looking forward to. Your scans are stable. Your correction is holding. Your nervous system has integrated the changes we made. You have graduated from corrective care."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Now, here is what I want you to consider. You have invested significant time and money into getting to this point. You have built something valuable. Maintenance care is how you protect that investment. Just like you get your teeth cleaned every six months, just like you get your car serviced every 5,000 miles, your spine and nervous system need regular check-ups to maintain optimal function."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"I am recommending that we move you to a wellness schedule. For most of my patients at this stage, that means once every two to four weeks, depending on your lifestyle and stress levels. This is not about fixing a problem anymore. This is about maintaining peak performance. This is about making sure that five years from now, you are still picking up your kids, still sleeping through the night, still living at the level you are living right now."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"What questions do you have about the wellness phase?"</p>
            </div>
          </div>
        )
      },
      {
        label: "09 Mastery",
        icon: "Eye",
        title: "Mastery indicators",
        content: (
          <div className="space-y-4">
            <p><strong>You have mastered the re-exam system when:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your re-exam completion rate is above 95% for all milestone visits</li>
              <li>Patients walk out of re-exams feeling more committed than when they walked in</li>
              <li>You can deliver the Visit 12 script in exactly 10 minutes without rushing or padding</li>
              <li>Patients start asking about their next re-exam before you bring it up</li>
              <li>Your transition rate from corrective to wellness care is above 60%</li>
              <li>You never skip the side-by-side comparison, even when the schedule is packed</li>
              <li>Your team schedules re-exams proactively without being reminded</li>
              <li>Patients refer to their care in phases: "I am in the corrective phase" or "I am in wellness care"</li>
            </ul>
          </div>
        )
      },
      {
        label: "10 Checkpoints",
        icon: "ClipboardCheck",
        title: "Action checklist",
        content: (
          <div className="space-y-3">
            <ul className="space-y-2">
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Set up your scheduling system to auto-flag re-exams at visits 12, 24, and 36
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Print the Visit 12 script and rehearse it until you can deliver it naturally
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Create a re-exam folder template with space for side-by-side scan comparisons
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Block 15 minutes per re-exam on the schedule. No exceptions
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Practice the "You are improving, here is why we continue" script with a team member this week
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Track your corrective-to-wellness transition rate starting this month
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Assign a team member to prepare the re-exam room and scan comparisons before each re-exam
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Review your re-exam completion rate every Friday as part of your weekly audit
              </li>
            </ul>
          </div>
        )
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // PLAYBOOK 7: RETENTION ARCHITECTURE
  // ─────────────────────────────────────────────────────────────────
  {
    id: "retention",
    title: "Retention Architecture",
    tagline: "The complete system for keeping patients from Day 1 through lifetime care.",
    summary: [
      "80% of your revenue comes from retention, not new patients. Act accordingly.",
      "Patients drop off at 4 predictable phases. You can prevent every single one.",
      "The Re-Activation System recovers 30-40% of lost patients when executed within 7 days."
    ],
    icon: "RefreshCw",
    sections: [
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p><strong>Retention is not a strategy you add to your practice. Retention IS your practice.</strong> Every system, every script, every interaction either builds retention or destroys it. There is no neutral ground.</p>
            <p>This playbook is the complete architecture for keeping patients from their first visit through lifetime care. It covers the four phases where patients drop off, the exact scripts to prevent each dropout, the re-activation system for patients who have already left, and the patient appreciation framework that builds genuine loyalty.</p>
            <p><strong>The math is simple and brutal:</strong> Acquiring a new patient costs $150-$500 in marketing, time, and overhead. Retaining an existing patient costs $0. Every patient who drops off at visit 12 instead of transitioning to wellness care costs you $3,000-$8,000 in lifetime value. If that happens 5 times per month, you are losing $180,000-$480,000 per year.</p>
            <p>Retention is not a "nice to have." Retention is the foundation of a stable, profitable, low-stress practice.</p>
          </div>
        )
      },
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p><strong>80% of revenue in a mature chiropractic practice comes from retention, not new patients.</strong> Read that again. The industry obsesses over new patient numbers. Marketing funnels. Lead generation. And all of it combined accounts for roughly 20% of a well-run practice's revenue.</p>
            <p>The other 80% comes from patients who stay. Patients who transition from corrective to wellness. Patients who refer. Patients who come back year after year because they understand the value of maintenance care.</p>
            <p><strong>Here is the uncomfortable truth:</strong> If your retention is broken, no amount of new patient marketing will fix your revenue problem. You are filling a bucket with holes. More water does not help when the bucket is leaking.</p>
            <p>The practices collecting $80,000-$150,000 per month are not necessarily seeing more new patients than you. They are keeping the patients they already have. Their PVA is higher. Their wellness base is larger. Their referral network is deeper. All of that is retention.</p>
          </div>
        )
      },
      {
        label: "03 The Amateur Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p><strong>The Reactive Retention Trap.</strong> Most doctors do not think about retention until a patient leaves. By then, it is too late. Retention is not a reaction to patient dropout. Retention is a proactive system that starts on Day 1 and never stops.</p>
            <p><strong>The second mistake: blaming the patient.</strong> "They just were not committed." "They did not follow through." "Some people just are not wellness patients." These are all excuses. The patient did exactly what your system trained them to do. If they dropped off at visit 12, it is because nothing in your system prevented it. If they never transitioned to wellness, it is because nobody gave them a compelling reason to stay.</p>
            <p><strong>The third mistake: relying on the adjustment to create retention.</strong> A good adjustment is necessary but not sufficient. The patient needs to understand why they are coming, what phase they are in, and what happens next. Without narrative structure, even great clinical results will not prevent dropout.</p>
          </div>
        )
      },
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "The 4 phases where patients drop off",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Phase 1: After Day 2 — They Never Started Care</h5>
              <p className="text-sm text-brand-gray"><strong>What happened:</strong> The patient came for Day 1. They came for Day 2 and heard the care plan. They said yes. And then they never scheduled visit 3. Or they scheduled and did not show.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Why it happens:</strong> The Day 2 presentation created intellectual agreement but not emotional commitment. The patient understood the plan logically but did not feel the urgency to begin. They went home, talked to their spouse, looked at their calendar, and decided it was "not the right time."</p>
              <p className="text-sm text-brand-gray mt-2"><strong>The fix:</strong> Schedule the first three visits before the patient leaves Day 2. Do not let them walk out with a plan and no schedule. The commitment is not real until it is on the calendar. Say: "Mrs. Johnson, let us get your first week on the schedule right now. Sarah at the front desk will get you set up. I will see you Wednesday at 4:00."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Phase 2: Visit 4-6 — Early Dropout ("I Am Not Feeling Different Yet")</h5>
              <p className="text-sm text-brand-gray"><strong>What happened:</strong> The patient has been coming for 2 weeks. They expected to feel better by now. They do not. They are questioning whether this is working.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Why it happens:</strong> Unrealistic expectations set on Day 2, or a failure to pre-frame the healing timeline. The patient assumed chiropractic works like medication: take it, feel better immediately.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>The fix:</strong> Pre-frame on Day 2: "Most patients feel their first significant change between visit 8 and visit 12. The first few weeks, your body is adapting to the correction. You might feel sore, tired, or even temporarily worse. That is normal. It means your body is responding." Then at visit 4, check in: "Mr. Davis, how are you feeling? Remember what I told you about the adaptation phase? You are right in the middle of it. This is exactly where I expect you to be."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Phase 3: Visit 12-15 — Feeling Better, Questioning Need</h5>
              <p className="text-sm text-brand-gray"><strong>What happened:</strong> The patient is feeling significantly better. The pain that brought them in is mostly gone. They start thinking: "Do I really need to keep coming?"</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Why it happens:</strong> The patient equates "feeling better" with "being fixed." Without a re-exam showing objective data, they have no reason to believe they need more care. Their body feels good. Their wallet feels lighter. The math stops making sense to them.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>The fix:</strong> This is exactly why the Visit 12 re-exam exists. Show them the data. Show them the progress. And explicitly name the gap between "feeling better" and "being corrected." Use the script from Playbook 6: "Feeling better and being corrected are two very different things."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Phase 4: After Corrective Plan Ends — No Transition to Wellness</h5>
              <p className="text-sm text-brand-gray"><strong>What happened:</strong> The patient completed their corrective care plan. The doctor said: "You are doing great." The patient interpreted this as: "You are done." They stopped coming.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Why it happens:</strong> There was no explicit transition conversation. The doctor assumed the patient understood that wellness care was the next step. The patient assumed the plan was complete. Nobody bridged the gap.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>The fix:</strong> The Visit 36 re-exam must include the wellness transition script. Never let a patient "graduate" from corrective care without immediately enrolling them in a wellness plan. The transition happens in the re-exam room, not at the front desk. The doctor makes the recommendation. The front desk schedules it. There is no gap.</p>
            </div>
          </div>
        )
      },
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "The Retention Arc: Day 1 through Lifetime Care",
        content: (
          <div className="space-y-6">
            <p><strong>The Retention Arc is the complete patient journey mapped to specific actions at each stage.</strong></p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Stage 1: Acute Care (Visit 1-12)</h5>
              <p className="text-sm text-brand-gray"><strong>Patient mindset:</strong> "Fix my pain." <strong>Your job:</strong> Reduce symptoms while building trust and clinical authority. Pre-frame the correction timeline. Schedule visits in advance. Follow up on every no-show within 24 hours. Check in at visit 4 with: "You are right where I expect you to be." Run the Visit 12 re-exam.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Stage 2: Corrective Care (Visit 12-36)</h5>
              <p className="text-sm text-brand-gray"><strong>Patient mindset:</strong> "I feel better. Do I need this?" <strong>Your job:</strong> Shift the narrative from pain to function. Show objective progress at every re-exam. Begin wellness education. Name the phases. Make the patient feel like they are progressing, not just "still coming." Run the Visit 24 re-exam with wellness transition messaging.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Stage 3: Wellness Transition (Visit 36-48)</h5>
              <p className="text-sm text-brand-gray"><strong>Patient mindset:</strong> "Is maintenance really necessary?" <strong>Your job:</strong> Run the Visit 36 re-exam. Deliver the wellness transition script. Reduce frequency. Introduce the concept of "protecting your investment." Schedule the first month of wellness visits before they leave the re-exam. Make the transition feel like an achievement, not an upsell.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Stage 4: Lifetime Care (Ongoing)</h5>
              <p className="text-sm text-brand-gray"><strong>Patient mindset:</strong> "This is part of my health routine." <strong>Your job:</strong> Monthly or bi-monthly check-ups. Annual comprehensive re-exam. Patient appreciation touchpoints. Referral conversations. Community events. This patient is now your ambassador. Treat them accordingly. They are worth $5,000-$15,000 in lifetime value and $20,000+ in referral value.</p>
            </div>
          </div>
        )
      },
      {
        label: "06 Phase Scripts",
        icon: "MessageSquare",
        title: "Phase transition scripts",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Script: Acute to Corrective — "Your Pain Is Better, Now We Fix the Structure"</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, I have good news and important news. The good news is that your pain has reduced significantly. You are sleeping better. You are moving better. That tells me your body is responding to the adjustments. Now here is the important part. The pain was a symptom. It was your body's alarm system telling you something was wrong structurally. We have turned down the alarm. But the structural problem that triggered the alarm is still there."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Think of it like a fire alarm in your house. If the alarm is going off and you take the batteries out, the noise stops. But the fire is still burning. Your pain was the alarm. The adjustments stopped the alarm. Now we need to put out the fire. That is what the corrective phase is about. We are correcting the structural pattern so the alarm does not come back."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"This phase typically takes 12 to 16 weeks. Your visit frequency will stay the same for now. I will monitor your progress with regular check-ins, and at visit 24, we will run another full evaluation. Sound good?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Script: Corrective to Wellness — "Your Structure Is Stable, Now We Maintain It"</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, today is a milestone day. Your scans are showing me exactly what I wanted to see. Your structural correction is holding. Your nervous system has adapted to the new pattern. You have done the hard work, and it is paying off."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Now we move into the phase that separates people who get better from people who stay better. Wellness care. This is not about fixing anything. Everything we needed to fix has been fixed. This is about maintenance. This is about making sure that the correction you worked so hard for does not slowly reverse over time."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Here is what wellness care looks like. Instead of coming in two to three times per week, you will come in every two to four weeks. Each visit, I will check your alignment, run a quick scan, and make any necessary adjustments. Think of it as a tune-up. Your car does not break down and then you change the oil. You change the oil so your car does not break down. Same principle."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"The cost of wellness care is a fraction of what corrective care costs. And the value is enormous. You are protecting an investment of months of time and thousands of dollars. A $65 adjustment every two weeks is the cheapest insurance policy you will ever have for your spine. Ready to get started?"</p>
            </div>
          </div>
        )
      },
      {
        label: "07 'I Feel Better' Scripts",
        icon: "MessageSquare",
        title: "Handling 'I feel better' at every stage",
        content: (
          <div className="space-y-6">
            <p><strong>This is the single most common reason patients leave care.</strong> The response must be different depending on when they say it.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Week 2: "I Feel Better" (Way Too Early)</h5>
              <p className="text-sm text-brand-gray italic">"That is great news, Mrs. Johnson. I am glad you are noticing a change. Now, I want to be honest with you about what that means. At this stage, what you are feeling is your body's initial response to the adjustments. The inflammation is reducing. The pressure on your nerves is decreasing. That is why you feel better. But the structural problem that caused the inflammation has not been corrected yet. We are two weeks into a process that takes months."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Here is what I see happen when patients stop care because they feel better at this stage. They feel great for two to four weeks. Then the pain comes back. And when it comes back, it is usually worse than before because the structural problem has progressed. I do not want that for you. Let us stay the course. Your body is responding, which tells me the plan is working. That is a reason to continue, not a reason to stop."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Month 1: "I Feel Better" (Common but Still Early)</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, that is exactly what I want to hear. You are right on track. Let me explain where you are in the process. Your body has moved through the acute phase. The crisis is over. You are now in the early corrective phase. Feeling better at this point means the adjustments are taking hold. Your nervous system is starting to stabilize."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"But here is the thing I need you to understand. Stabilization is not correction. Your body has stopped the acute problem, but it has not yet built the new structural pattern we need. If we stop now, you will slowly drift back to where you started. The correction happens between month 2 and month 4. That is when the real structural change takes place. We are just getting to the good part."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Month 3: "I Feel Better" (The Critical Moment)</h5>
              <p className="text-sm text-brand-gray italic">"Sarah, you feel better because the correction is working. That is the whole point. Let me show you something."</p>
              <p className="text-sm text-brand-gray mt-2 italic">[Pull up the scan comparison]</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Look at the difference between Day 1 and today. This is not just pain relief. This is structural change. Your nervous system is functioning differently than it was three months ago. Now, here is the critical question. Do you want to maintain this improvement, or do you want to risk losing it? Because the research is very clear. Without regular maintenance, structural corrections tend to reverse over 6 to 12 months. I am not trying to keep you coming forever. I am trying to protect what you worked hard to build. Let me recommend a wellness schedule that keeps you here without disrupting your life."</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Re-Activation",
        icon: "UserPlus",
        title: "The Re-Activation System",
        content: (
          <div className="space-y-6">
            <p><strong>Patients who leave are not lost. They are waiting to be invited back.</strong> The key is timing and tone. Never guilt. Never pressure. Always genuine concern.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">7-Day No-Show Call Script</h5>
              <p className="text-sm text-brand-gray italic">"Hi Mrs. Johnson, this is Sarah from Dr. Smith's office. I am calling because we noticed you missed your last appointment and we have not heard from you. I want to make sure everything is okay. Dr. Smith reviewed your file and wanted me to let you know that you are at a really important point in your care right now. He does not want you to lose the progress you have made."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"I have a few openings this week. Would Tuesday at 3:00 or Thursday at 10:00 work better for you?"</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Key principles:</strong> Express genuine concern, not frustration. Reference the doctor by name. Mention the patient's progress. Offer two specific times, not an open-ended question. Do not ask "Would you like to reschedule?" Ask "Which time works better?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">30-Day Inactive Call Script</h5>
              <p className="text-sm text-brand-gray italic">"Hi Mr. Davis, this is Tom from Dr. Smith's office. We have missed seeing you these past few weeks and I wanted to reach out personally. I know life gets busy, and sometimes appointments fall off the radar. Dr. Smith asked me to call because he has been thinking about your case."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"He wanted me to tell you that the progress you made during your care was significant, and he would hate to see that progress reverse. He has some availability next week if you would like to come in for a check-up. There is no pressure, no judgment. We just want to make sure your spine is holding up. Would you be open to coming in for a quick evaluation?"</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Key principles:</strong> Acknowledge the gap without blame. Use "we have missed you" not "you missed your appointment." Offer a low-commitment re-entry: a check-up, not a full care plan restart. Remove pressure explicitly.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">90-Day Re-Activation Call Script</h5>
              <p className="text-sm text-brand-gray italic">"Hi Sarah, this is Candace from Dr. Smith's office. I know it has been a while since we have seen you, and I hope you are doing well. I am reaching out because Dr. Smith is doing a special re-evaluation for patients who have not been in for a while. He wants to check in on the progress you made and see how your spine is doing."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"The re-evaluation is complimentary. It takes about 15 minutes. He will run a quick scan, compare it to your last visit, and let you know where things stand. No commitment required. He just genuinely wants to know how you are doing. Would you be interested in scheduling that?"</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Key principles:</strong> After 90 days, you need a compelling offer. A complimentary re-evaluation removes the financial barrier. Frame it as the doctor's initiative, not a sales call. Use "check in" language, not "come back to care" language. The goal is to get them in the door. Once they see their scan comparison, the conversation about resuming care happens naturally.</p>
            </div>
          </div>
        )
      },
      {
        label: "09 Patient Appreciation",
        icon: "HeartPulse",
        title: "Patient appreciation framework",
        content: (
          <div className="space-y-6">
            <p><strong>Loyalty is not built on great adjustments alone. Loyalty is built on the feeling of being valued.</strong> Here are the monthly touchpoints that build genuine patient loyalty.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Birthday Call (Not a Card — A Call)</h5>
              <p className="text-sm text-brand-gray">Have the doctor personally call every patient on their birthday. Not a text. Not an email. A 45-second phone call. "Hi Mrs. Johnson, this is Dr. Smith. I just wanted to call and wish you a happy birthday. I hope you have a wonderful day. We appreciate you being part of our practice family." This takes less than a minute per patient and creates more loyalty than any marketing campaign ever will.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Progress Milestone Acknowledgment</h5>
              <p className="text-sm text-brand-gray">At visit 25, 50, 75, and 100, acknowledge the milestone. A handwritten note from the doctor. "Mr. Davis, you just completed your 50th visit. I want you to know that your commitment to your health is rare and admirable. The changes I have seen in your scans and in your life are a direct result of your consistency. Thank you for trusting me with your care." Put it in a card. Hand it to them after their adjustment.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Quarterly Patient Appreciation Event</h5>
              <p className="text-sm text-brand-gray">Once per quarter, host a patient appreciation event. It does not need to be expensive. A lunch-and-learn. A health workshop. A family wellness day. The purpose is not education. The purpose is community. Patients who feel connected to a community stay longer. They refer more. They become advocates, not just patients. Budget: $200-$500 per event. ROI: immeasurable.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Referral Thank-You</h5>
              <p className="text-sm text-brand-gray">Every time a patient refers someone, send a handwritten thank-you card within 48 hours. "Mrs. Johnson, thank you for referring Mr. Davis to our office. It means the world to me that you trust us enough to share our practice with the people you care about. As a small thank you, I would like to offer you a complimentary wellness adjustment on your next visit." This is not a referral program. This is gratitude. The difference matters.</p>
            </div>
          </div>
        )
      },
      {
        label: "10 Lifestyle Care",
        icon: "Sparkles",
        title: "The 'Lifestyle Care' conversation",
        content: (
          <div className="space-y-6">
            <p><strong>The word "maintenance" makes care feel optional. The word "lifestyle" makes it feel essential.</strong> Language matters. Stop calling it maintenance. Start calling it lifestyle care.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Script: Making Lifestyle Care Feel Essential</h5>
              <p className="text-sm text-brand-gray italic">"Tom, let me ask you a question. You work out, right? You eat reasonably well. You get your teeth cleaned. You get your eyes checked. You do all of those things not because something is wrong, but because you understand that prevention is cheaper, easier, and more effective than crisis care. Your spine is no different."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Lifestyle chiropractic care is not about being in pain. It is about performing at your best. It is about your nervous system functioning at 100% so that your sleep is better, your energy is higher, your immune system is stronger, and your body handles stress more efficiently."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"The patients who make chiropractic part of their lifestyle do not just avoid back pain. They get sick less often. They sleep deeper. They have more energy. They age better. That is not marketing. That is what I see in my practice every single day."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"I am not asking you to commit to something you do not believe in. I am asking you to try lifestyle care for 90 days. Come in every two weeks. If after 90 days you do not feel a noticeable difference in your overall health and energy, I will tell you to stop. Fair enough?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Spouse and Family Conversation</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, now that you have experienced the difference chiropractic makes in your own life, I want to ask you something. How is your husband doing? How are your kids doing? Because the same benefits you are experiencing are available to them. I am not trying to sell you on family care. I am telling you that if your husband is dealing with the same stress you were dealing with, the same tension, the same sleep issues, there is a real solution sitting right here."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"I offer a family wellness plan that makes it affordable for your whole family to be under care. Would you be open to bringing him in for an evaluation? No cost. No pressure. I just want to see if I can help."</p>
            </div>
          </div>
        )
      },
      {
        label: "11 Mastery",
        icon: "Eye",
        title: "Mastery indicators",
        content: (
          <div className="space-y-4">
            <p><strong>You have mastered retention architecture when:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your PVA is above 40 and has been stable for 90 days</li>
              <li>More than 50% of patients who complete corrective care transition to wellness</li>
              <li>Your 7-day no-show recovery rate is above 70%</li>
              <li>You have a growing wellness base of 50+ patients on regular lifestyle care schedules</li>
              <li>Patients refer without being asked because they feel genuinely valued</li>
              <li>Your team runs the re-activation system without your involvement</li>
              <li>You can predict exactly where each patient is in the retention arc and what conversation they need next</li>
              <li>Your monthly collections are stable regardless of new patient fluctuations because your retention base is solid</li>
              <li>Patients describe your practice as "my chiropractor" not "a chiropractor I go to"</li>
              <li>Your dropout rate at each of the four phases is below 10%</li>
            </ul>
          </div>
        )
      },
      {
        label: "12 Checkpoints",
        icon: "ClipboardCheck",
        title: "Action checklist",
        content: (
          <div className="space-y-3">
            <ul className="space-y-2">
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Map every current patient to their position on the Retention Arc
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Implement the 24-hour no-show follow-up protocol starting Monday
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Print the "I feel better" scripts for each stage and keep them in the adjustment room
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Pull a list of all patients inactive for 30+ days and start the re-activation calls this week
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Schedule your first quarterly patient appreciation event
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Replace the word "maintenance" with "lifestyle care" in all patient communications
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Set up birthday call reminders for every patient in your system
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Practice the acute-to-corrective and corrective-to-wellness transition scripts this week
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Track your dropout rate at each of the four phases starting this month
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Write 5 handwritten thank-you cards to your most loyal patients this week
              </li>
            </ul>
          </div>
        )
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // PLAYBOOK 8: AUTHORITY UNDER EVALUATION
  // ─────────────────────────────────────────────────────────────────
  {
    id: "authority",
    title: "Authority Under Evaluation",
    tagline: "How to maintain clinical certainty when patients question everything.",
    summary: [
      "Authority is not dominance. Authority is stability under pressure.",
      "When challenged, speak slower, speak lower, and use fewer words.",
      "The Clinical Pause is the single most powerful tool in your communication arsenal."
    ],
    icon: "ShieldCheck",
    sections: [
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p><strong>Authority is stability under pressure.</strong> It is the ability to remain grounded, clear, and certain when a patient questions your care, challenges your methods, or tests your confidence. It is not about being right. It is about being steady.</p>
            <p>Every patient will evaluate you at some point. Some will do it on Day 1. Some will do it at visit 12 when they are feeling better and questioning cost. Some will do it when their medical doctor tells them chiropractic is a waste of money. Some will do it when they read something online that contradicts what you told them.</p>
            <p><strong>Your response to that evaluation defines your authority.</strong> If you get defensive, you lose. If you get emotional, you lose. If you over-explain, you lose. The only response that builds authority is calm, grounded certainty delivered with fewer words and lower energy than the challenge came with.</p>
            <p>This playbook gives you the framework, the scripts, the body language, and the vocal techniques to maintain absolute clinical authority under any form of evaluation.</p>
          </div>
        )
      },
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p><strong>A patient's decision to stay in care or leave is almost never based on clinical evidence.</strong> It is based on their perception of your certainty. If you seem certain, they feel safe. If you seem uncertain, they feel unsafe. Unsafe patients leave.</p>
            <p>Every time a patient challenges you and you respond with defensiveness, over-explanation, or emotional reactivity, you are depositing doubt into their decision-making process. It does not matter if your clinical reasoning is flawless. If your delivery signals insecurity, the patient's brain registers: "This doctor is not sure."</p>
            <p><strong>The math:</strong> A single moment of lost authority can undo 12 weeks of clinical progress in a patient's mind. One defensive reaction to a Google search can turn a committed patient into a dropout. One frustrated response to "my medical doctor said chiropractic does not work" can erase every positive re-exam result you have shown them.</p>
            <p>Authority is not optional. Authority is the container that holds everything else in place. Without it, your scripts do not work, your re-exams do not retain, and your care plans do not stick.</p>
          </div>
        )
      },
      {
        label: "03 The Amateur Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p><strong>The Defense Trap.</strong> When a patient challenges them, most doctors instinctively defend. They pull up research. They cite studies. They talk faster. They talk louder. They try to win the argument.</p>
            <p><strong>Here is the problem: winning the argument loses the patient.</strong> When you defend, you are signaling that the challenge has destabilized you. You are telling the patient's unconscious brain: "This doctor feels threatened by my question." A threatened authority is not an authority at all.</p>
            <p><strong>The second trap: taking it personally.</strong> When Mrs. Johnson says "My medical doctor told me chiropractic is a waste of money," she is not attacking you. She is expressing uncertainty. She is looking for stability. She is giving you an opportunity to demonstrate authority. If you take it personally, you miss the opportunity and lose the patient.</p>
            <p><strong>The third trap: over-explaining.</strong> The insecure doctor responds to a 10-second challenge with a 5-minute monologue. Every additional word weakens the response. Authority is inversely proportional to word count. The fewer words you use, the more authority you project.</p>
          </div>
        )
      },
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "The body language leaks that destroy authority",
        content: (
          <div className="space-y-6">
            <p><strong>Your body speaks before your mouth does.</strong> These are the unconscious signals that destroy authority in seconds:</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Leak 1: Breaking Eye Contact When Challenged</h5>
              <p className="text-sm text-brand-gray">When a patient questions you and you look away, look down, or shift your gaze, you are signaling submission. The patient reads this instantly: "He is not sure." Maintain steady, relaxed eye contact. Not aggressive staring. Relaxed, confident, unhurried eye contact. The kind that says: "I hear you. And I am not going anywhere."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Leak 2: Speeding Up Your Speech</h5>
              <p className="text-sm text-brand-gray">When you feel evaluated, your nervous system wants to talk faster. It wants to fill the silence. It wants to overwhelm the challenge with information. This is the opposite of what authority looks like. Authority speaks slowly. Authority pauses. Authority lets silence do the heavy lifting. If you catch yourself speeding up, stop. Take a breath. Start the next sentence at half the speed.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Leak 3: Leaning Forward or Shifting Your Weight</h5>
              <p className="text-sm text-brand-gray">When challenged, insecure operators lean forward. They physically move toward the threat. This signals anxiety. Confident operators lean back slightly. They take up space. They are grounded. Their weight is balanced. They are not chasing the patient's approval. They are occupying their own space with quiet certainty.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Leak 4: Nervous Filler Words</h5>
              <p className="text-sm text-brand-gray">"Well, you know, the thing is, um, actually, the research shows..." Every filler word is a leak. Every "um" is a moment of uncertainty made audible. Replace filler words with silence. A two-second pause between sentences projects more authority than any research citation ever will.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Leak 5: Smiling Inappropriately</h5>
              <p className="text-sm text-brand-gray">When a patient says something challenging and you respond with a nervous smile, you are telling them: "I am uncomfortable and I want you to like me." Clinical authority does not need to be liked. It needs to be trusted. A neutral, grounded expression communicates: "I take your concern seriously. And I have an answer." Save the smile for when they share good news about their progress.</p>
            </div>
          </div>
        )
      },
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "The Authority Framework",
        content: (
          <div className="space-y-6">
            <p><strong>Every challenge from a patient follows the same pattern. Your response should follow this 4-step framework every single time.</strong></p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 1: The Pause (2 Seconds of Silence)</h5>
              <p className="text-sm text-brand-gray">When the patient finishes their challenge, do not respond immediately. Wait two full seconds. Look at them calmly. Let the silence settle. This does three things: it shows you are not reactive, it gives you time to choose your words, and it signals to the patient that their challenge did not destabilize you. The pause is power. Most doctors skip this step because silence feels uncomfortable. That discomfort is exactly why it works.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 2: The Acknowledgment (Validate Without Agreeing)</h5>
              <p className="text-sm text-brand-gray">Acknowledge what the patient said without agreeing with their conclusion. This is not manipulation. This is respect. The patient needs to feel heard before they can hear you. Example: "I understand why you would think that." "That is a fair question." "I appreciate you being honest with me about that." Notice what these phrases do NOT do: they do not agree with the patient's premise. They do not concede the point. They simply acknowledge the patient's right to ask the question.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 3: The Reframe (Redirect to Clinical Reality)</h5>
              <p className="text-sm text-brand-gray">Take the patient's challenge and redirect it to the clinical evidence in their own case. Do not argue philosophy. Do not cite generic research. Point to their scans, their progress, their own words from Day 1. Make it personal and objective. Example: "Here is what your scans show." "Let me show you the data from your case specifically." "Remember what you told me on Day 1 about not being able to sleep? Let us look at where you are now." The reframe takes the conversation from opinion to evidence.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 4: The Redirect (Move to Next Step)</h5>
              <p className="text-sm text-brand-gray">After the reframe, do not wait for the patient to respond with another challenge. Move forward. Direct the conversation to the next clinical step. "Let us take a look at your adjustment today." "Here is what I want to check on your next visit." "Let us keep moving forward and re-evaluate at your next progress check." The redirect signals that the challenge has been heard, addressed, and resolved. The conversation moves on. You do not dwell. You do not circle back. You lead forward.</p>
            </div>
          </div>
        )
      },
      {
        label: "06 Challenge Scripts",
        icon: "MessageSquare",
        title: "Scripts for specific challenges",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">"I Googled My Condition and..."</h5>
              <p className="text-sm text-brand-gray italic">[Pause. Two seconds. Calm eye contact.]</p>
              <p className="text-sm text-brand-gray mt-2 italic">"I appreciate that you are doing your own research. That tells me you take your health seriously, and I respect that. Here is what I want you to consider. Google gives you general information about general conditions. What I am looking at is specific data from your body. Your scans. Your history. Your response to care. No website can give you that."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Let me show you something. This is your scan from Day 1. This is your scan from today. Whatever Google told you, this is what is actually happening in your body. This is specific to you. And based on this data, here is what I recommend we do next."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">"My Friend's Chiropractor Does It Differently"</h5>
              <p className="text-sm text-brand-gray italic">[Pause. Two seconds.]</p>
              <p className="text-sm text-brand-gray mt-2 italic">"That makes sense. There are different approaches within chiropractic, just like there are different approaches within medicine. A cardiologist and a family doctor treat the same body differently. Neither is wrong. They have different specializations."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"My approach is based on neurological assessment and structural correction. I use objective scans to measure your nervous system's function and track your progress with data, not guesswork. That is the system I have built my practice on, and it is the system that is producing the results we are seeing in your case."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Let me show you your progress. That is the best answer I can give you about whether this approach is working for you."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">"My Medical Doctor Said Chiropractic Does Not Work"</h5>
              <p className="text-sm text-brand-gray italic">[Pause. Two seconds. No facial reaction.]</p>
              <p className="text-sm text-brand-gray mt-2 italic">"I respect your medical doctor. They are looking at your health through the lens of their training, which is valuable. My lens is different. I am specifically trained to assess and correct structural and neurological dysfunction. It is not a competition between approaches. It is about using the right tool for the right job."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Here is what I would ask you to consider. Forget what I say. Forget what your medical doctor says. Look at the evidence from your own body. How were you feeling when you walked in here on Day 1? How are you feeling now? What do your scans show?"</p>
              <p className="text-sm text-brand-gray mt-2 italic">"The evidence in your case is the only opinion that matters. And based on that evidence, your body is responding. I am going to keep doing what the data tells me is working. Fair enough?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">"I Watched a Video That Says Adjustments Are Dangerous"</h5>
              <p className="text-sm text-brand-gray italic">[Pause. Two seconds.]</p>
              <p className="text-sm text-brand-gray mt-2 italic">"I understand that concern, and I am glad you brought it up. Safety is my number one priority. Let me address that directly."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Chiropractic adjustments are one of the safest healthcare interventions that exist. The risk of a serious adverse event from a chiropractic adjustment is approximately one in several million. To put that in perspective, the risk of a serious adverse event from over-the-counter anti-inflammatory medication is significantly higher."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Beyond the general statistics, I want you to know what I specifically do to ensure your safety. I run neurological scans before every care plan. I take detailed imaging when indicated. I use specific, controlled techniques that are tailored to your body, your condition, and your comfort level. I do not adjust the same way for every patient because every patient is different."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"You are safe here. And if I ever found something in your case that made me think chiropractic was not the right approach, I would tell you and refer you to someone who could help. That is my commitment to you. Ready to continue?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">"How Do I Know This Is Actually Working?"</h5>
              <p className="text-sm text-brand-gray italic">[Pause. Two seconds. Slight nod.]</p>
              <p className="text-sm text-brand-gray mt-2 italic">"That is exactly the right question to ask. And I am glad you asked it because I have the answer. We do not guess in this office. We measure."</p>
              <p className="text-sm text-brand-gray mt-2 italic">[Pull up their scans]</p>
              <p className="text-sm text-brand-gray mt-2 italic">"This is your scan from Day 1. This is your most recent scan. The changes here are not subjective. They are not based on how you feel on a given day. They are objective measurements of your nervous system function. And they show clear, measurable improvement."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"Beyond the scans, let me ask you something. When you first came in, what were you struggling with? How is that now? The changes you are describing, sleeping better, less pain, more energy, those are not coincidental. Those are the functional results of the structural changes we are seeing on the scans."</p>
              <p className="text-sm text-brand-gray mt-2 italic">"It is working. The data confirms it. Your body confirms it. And I am going to keep tracking it so that neither of us ever has to guess. Sound good?"</p>
            </div>
          </div>
        )
      },
      {
        label: "07 Body Language",
        icon: "Eye",
        title: "Body language and tone frameworks",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Where to Stand or Sit During Difficult Conversations</h5>
              <p className="text-sm text-brand-gray"><strong>Never stand over a seated patient during a challenge.</strong> If the patient is sitting, sit down. Position yourself at their eye level or slightly below. This removes the physical power dynamic and allows the conversation to feel collaborative rather than confrontational.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Sit at a 45-degree angle, not directly across.</strong> Direct face-to-face positioning feels adversarial. A slight angle feels conversational. If you are at a desk or table, sit at the corner rather than across. This subtle positioning change reduces the patient's defensive response.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Keep your hands visible and still.</strong> Clasped hands, fidgeting, or hidden hands all signal anxiety. Rest your hands on the table or on your thighs. Open palms facing slightly upward signal openness. Still hands signal control.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Voice Tone Adjustments: Slower, Lower, Fewer Words</h5>
              <p className="text-sm text-brand-gray"><strong>Slower:</strong> When you feel the impulse to speed up, cut your speaking pace in half. Literally. Count to two between sentences. A slow speaker is a certain speaker. A fast speaker is an anxious speaker. The patient reads pace before they process content.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Lower:</strong> Drop your pitch by 10-15%. Not artificially deep. Just slightly lower than your conversational tone. Lower pitch is neurologically associated with competence and trustworthiness. Higher pitch is associated with uncertainty and submission.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Fewer words:</strong> Challenge yourself to respond to every patient challenge in 3 sentences or fewer. Then let silence do the rest. The master operator says less in a difficult conversation, not more. Every additional word is a potential leak. Say what needs to be said. Stop. Wait.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Power of Clinical Silence</h5>
              <p className="text-sm text-brand-gray"><strong>Silence is the most underused tool in clinical communication.</strong> Most doctors are terrified of silence. They fill every gap with words. But silence is where authority lives.</p>
              <p className="text-sm text-brand-gray mt-2">When you pause after a patient challenge, three things happen. First, the patient realizes their challenge did not rattle you. Second, they have time to hear their own words and often self-correct. Third, when you finally speak, your words carry ten times the weight because they were chosen, not reactive.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Practice this:</strong> After a patient finishes a challenging statement, count to three silently. Maintain eye contact. Let your face remain neutral. Then respond with your acknowledgment. The first few times, it will feel excruciating. After a week, it will feel like a superpower.</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Clinical Pause",
        icon: "Brain",
        title: "The 'Clinical Pause' technique (detailed)",
        content: (
          <div className="space-y-6">
            <p><strong>The Clinical Pause is the most powerful tool in your authority arsenal.</strong> It is a deliberate, practiced moment of silence that transforms every difficult conversation. Here is the full technique broken down.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Trigger</h5>
              <p className="text-sm text-brand-gray">The Clinical Pause is triggered anytime a patient says something that creates an internal reaction in you. Anytime you feel the urge to defend, explain, justify, or react, that is the trigger. Instead of following the urge, you pause.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Mechanics</h5>
              <p className="text-sm text-brand-gray"><strong>Step 1:</strong> Close your mouth. If it is already open to respond, close it. This is the physical override of the reactive impulse.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Step 2:</strong> Take one slow breath through your nose. Not a dramatic sigh. A quiet, controlled inhale. This activates your parasympathetic nervous system and drops your heart rate.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Step 3:</strong> Maintain relaxed eye contact. Do not look away. Do not look at the chart. Do not look at the scans. Look at the patient. Your eyes say: "I heard you. I am not threatened."</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Step 4:</strong> Let two to three seconds pass. In real time, this feels like an eternity. To the patient, it feels like confidence. It feels like the doctor is actually thinking about their concern instead of having a canned response ready.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Step 5:</strong> Respond with the Acknowledgment. Keep your voice lower and slower than theirs. Use half the words you think you need.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Practice Protocol</h5>
              <p className="text-sm text-brand-gray"><strong>Week 1:</strong> Practice the Clinical Pause in every conversation, not just challenging ones. When your spouse asks a question, pause. When your team member asks something, pause. Build the muscle memory of pausing before responding.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Week 2:</strong> Practice with a team member role-playing patient challenges. Have them say: "I am not sure this is working." Practice the pause, the acknowledgment, the reframe, and the redirect. Do it 10 times until it feels natural.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Week 3:</strong> Deploy in live patient interactions. Start with mild challenges first. Build up to the difficult conversations. Record yourself if possible and review your pace, your tone, and your body language.</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Week 4:</strong> The Clinical Pause should now be automatic. When a patient challenges you, your first instinct should be to pause, not to speak. If it is not automatic yet, repeat weeks 1-3.</p>
            </div>
          </div>
        )
      },
      {
        label: "09 Mastery",
        icon: "Eye",
        title: "Mastery indicators",
        content: (
          <div className="space-y-4">
            <p><strong>You have mastered authority under evaluation when:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Patient challenges make you curious instead of defensive</li>
              <li>Your first instinct when challenged is to pause, not to speak</li>
              <li>Your team members notice that you seem calmer during difficult conversations</li>
              <li>Patients who challenged you at visit 4 are still in care at visit 24 because you held them with stability, not arguments</li>
              <li>You can deliver the "My medical doctor said chiropractic does not work" response without any change in your heart rate or facial expression</li>
              <li>You use fewer words in difficult conversations than you did six months ago</li>
              <li>Your voice naturally drops in pitch and pace when under evaluation without conscious effort</li>
              <li>Other doctors ask you how you handle difficult patients and your answer is: "I just pause"</li>
              <li>You have stopped taking patient challenges personally. You see them as markers of uncertainty, not attacks on your competence</li>
              <li>Silence feels comfortable. You no longer rush to fill gaps in conversation</li>
            </ul>
          </div>
        )
      },
      {
        label: "10 Checkpoints",
        icon: "ClipboardCheck",
        title: "Action checklist",
        content: (
          <div className="space-y-3">
            <ul className="space-y-2">
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Practice the 2-second Clinical Pause in every conversation today, clinical or not
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Role-play the "Google" script with a team member until you can deliver it without notes
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Role-play the "Medical doctor" script until you can deliver it without any emotional charge
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Record yourself responding to a simulated patient challenge and review your pace, pitch, and body language
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Identify your top 3 body language leaks from the list above and consciously correct them this week
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Count your filler words during 5 patient interactions and set a goal to reduce them by 50%
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Practice responding to challenges in 3 sentences or fewer for one full day
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Ask a trusted team member to observe your body language during a difficult conversation and give you honest feedback
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="text-green-500 shrink-0">&#10003;</span> Review this playbook every Monday morning for 4 consecutive weeks until the framework is automatic
              </li>
            </ul>
          </div>
        )
      }
    ]
  }
];
