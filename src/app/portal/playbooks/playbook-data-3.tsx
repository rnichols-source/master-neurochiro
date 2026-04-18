import { ReactNode } from "react";

export const playbooks9to12 = [
  {
    id: "environment",
    title: "Playbook 9: Patient Decision Environment",
    tagline: "How your physical space and setup directly affect case acceptance.",
    summary: [
      "The room sells before you speak — environment accounts for 30%+ of case acceptance.",
      "There are 5 zones in every practice. Each one either builds trust or breaks it.",
      "The ROF room setup is the single highest-leverage physical change you can make."
    ],
    icon: "Eye",
    sections: [
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p><strong>The room sells before you speak.</strong> Every surface, every chair, every poster, every smell in your office is either building trust or eroding it. Most doctors spend thousands on marketing to get a patient through the door, then lose them because the environment screams "I don't take this seriously."</p>
            <p>This playbook is about <strong>intentional environmental design</strong> — treating your physical space as a clinical tool, not just a place where clinical tools happen to live. The patient's nervous system is reading your office from the moment they park their car. By the time they sit down in the ROF room, they have already made dozens of micro-decisions about whether they trust you.</p>
            <p>You cannot out-talk a bad environment. You cannot out-script a cluttered desk. You cannot out-close a room that feels like a storage closet.</p>
          </div>
        )
      },
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p><strong>Environment accounts for 30% or more of case acceptance.</strong> That is not a guess — it is observable in every practice that has done an environment overhaul and tracked their numbers before and after.</p>
            <p>Here is the reality: a patient who walks into a clean, organized, intentionally designed office <strong>feels safe before you say a word.</strong> A patient who walks into a cluttered, outdated, casual environment <strong>feels uncertain before you say a word.</strong></p>
            <p>That uncertainty compounds. It makes your Day 1 harder. It makes your ROF less effective. It makes your financial conversation feel like a pitch instead of a recommendation. And the worst part? <strong>You will never know it is happening.</strong> No patient says "your office felt unprofessional." They just say "I need to think about it."</p>
            <p>The doctors who run 90%+ case acceptance have offices that feel like they belong to someone who is in demand. The environment communicates: <strong>"This is a serious clinical facility where important work happens."</strong></p>
          </div>
        )
      },
      {
        label: "03 The Amateur Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p><strong>Three major mistakes:</strong></p>
            <p><strong>1. The "Home Office" Problem.</strong> The office looks like it was decorated by someone who had leftover furniture from their living room. Mismatched chairs, personal photos everywhere, a desk covered in papers. This communicates "casual" — and casual is the enemy of clinical authority.</p>
            <p><strong>2. The "Insurance Office" Problem.</strong> Signs everywhere about what insurance you accept. Pamphlets on the front desk about coverage. A whiteboard in the hallway listing plan options. This communicates "we are a billing operation," not "we are a clinical facility." Every insurance sign reduces the perceived value of your care.</p>
            <p><strong>3. The "No Design" Problem.</strong> The doctor never thought about their space intentionally. They moved in, put things where they fit, and never changed it. The office evolved by accident, not by design. Random posters from vendors. A children's play area that has not been cleaned in months. A bathroom that smells like the 1990s.</p>
            <p>Your office is not a place. <strong>It is a statement.</strong> Right now, what is yours saying?</p>
          </div>
        )
      },
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "Visual noise, seating psychology, and wall content",
        content: (
          <div className="space-y-4">
            <p><strong>Visual noise.</strong> Every item in a patient's line of sight is either reinforcing your message or diluting it. That stack of files on the counter? Visual noise. That poster from a supplement company next to your degree? Visual noise. That whiteboard with staff notes visible to patients? Visual noise. The patient's brain is processing all of it, and none of it is helping your case.</p>
            <p><strong>Seating psychology.</strong> Where the patient sits in the ROF room changes everything. If they are sitting behind a desk with you across from them, you have created a negotiation, not a consultation. If they are sitting in a low chair while you stand, you have created intimidation, not authority. If they are sitting next to the door, they have an escape route and their brain knows it.</p>
            <p><strong>Wall content.</strong> What is on your walls? If the answer is "motivational posters" or "random anatomy charts," you are wasting the most valuable real estate in your office. Walls should do one thing: <strong>reinforce the clinical narrative.</strong> Before-and-after scans. Patient outcome data. Your credentials displayed with intention. Nothing else.</p>
            <p><strong>Lighting.</strong> Fluorescent overhead lighting makes people feel like they are in a government building. It triggers stress. Warm, layered lighting makes people feel safe and attentive. This is not interior design advice — this is neuroscience.</p>
          </div>
        )
      },
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "The 5 Zones of the Clinical Environment",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Zone 1: The Waiting Area (First Impression)</h5>
              <p className="text-sm text-brand-gray mb-2">This is where anxiety either escalates or decreases. The patient has just arrived. They do not know what is going to happen. Their nervous system is scanning for threat or safety.</p>
              <p className="text-sm text-brand-gray mb-2"><strong>Requirements:</strong> Clean, uncluttered, warm lighting, comfortable seating (not cheap plastic chairs), a monitor playing patient testimonials or educational content on loop (no sound — captions only), no insurance signage, no clutter on the front desk, a welcoming team member who makes eye contact and uses their name.</p>
              <p className="text-sm text-brand-gray"><strong>The standard:</strong> A new patient should feel like they walked into a place that is expecting them, not a place that is processing them.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Zone 2: The Consultation Room (Authority + Safety + Privacy)</h5>
              <p className="text-sm text-brand-gray mb-2">This is where Day 1 listening happens. The patient needs to feel like they can be honest. The room needs to feel private, professional, and calm.</p>
              <p className="text-sm text-brand-gray mb-2"><strong>Requirements:</strong> Door that closes completely, no windows where staff can see in, two chairs at a slight angle (not directly across from each other — angled seating reduces confrontation), no desk between you and the patient, your credentials visible on the wall behind you, warm lighting, tissue box within reach.</p>
              <p className="text-sm text-brand-gray"><strong>The standard:</strong> The patient should feel like this is the safest room in the building.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Zone 3: The Exam/Scan Area (Clinical + Professional + Organized)</h5>
              <p className="text-sm text-brand-gray mb-2">This is where data is collected. The patient needs to feel like they are in a legitimate clinical facility, not a back room.</p>
              <p className="text-sm text-brand-gray mb-2"><strong>Requirements:</strong> Equipment organized and visible (not hidden in drawers — visible equipment communicates thoroughness), surfaces clean and clear, scan results not visible to the patient during collection (they should not see their own scans until Day 2), professional attire for all staff in this area, no personal items.</p>
              <p className="text-sm text-brand-gray"><strong>The standard:</strong> The patient should think "this is serious" when they walk in.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Zone 4: The ROF Room (The Decision Room)</h5>
              <p className="text-sm text-brand-gray mb-2">This is the most important room in your entire practice. This is where the patient decides. Every detail matters. See the dedicated section below for the full setup.</p>
              <p className="text-sm text-brand-gray mb-2"><strong>Requirements:</strong> Large monitor or screen for scan display, specific seating arrangement, no distractions, door closed, no interruptions allowed, financial documents prepared and ready, nothing on the desk except what is needed for this conversation.</p>
              <p className="text-sm text-brand-gray"><strong>The standard:</strong> The patient should feel the weight of this moment. This is not a casual chat. This is a clinical decision.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Zone 5: The Adjustment Area (Confidence + Routine + Results)</h5>
              <p className="text-sm text-brand-gray mb-2">This is where ongoing care happens. The patient needs to feel confident that what is happening is precise and purposeful, not random.</p>
              <p className="text-sm text-brand-gray mb-2"><strong>Requirements:</strong> Clean adjustment tables, organized instruments, a progress board or display showing their care plan milestones, a consistent flow from check-in to adjustment to check-out, no waiting in the adjustment area (waiting kills confidence), results and progress visible.</p>
              <p className="text-sm text-brand-gray"><strong>The standard:</strong> Every visit should feel like a step forward, not just another appointment.</p>
            </div>
          </div>
        )
      },
      {
        label: "06 The ROF Room",
        icon: "Eye",
        title: "The ROF Room Setup — Exactly How to Build It",
        content: (
          <div className="space-y-4">
            <p><strong>This is the room where 80% of your revenue is decided.</strong> Treat it that way.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Seating Arrangement</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>Doctor's chair:</strong> Positioned at the head of the room, slightly angled toward the screen. You should be able to gesture toward the screen without turning your back to the patient. Use a professional chair — not your adjustment stool.</p>
              <p className="text-sm text-brand-gray mb-2"><strong>Patient's chair:</strong> Positioned so they face the screen directly. Their back should be toward the door (not facing the exit — this is critical). The chair should be comfortable but not so comfortable that they sink into it. They need to be slightly forward, attentive.</p>
              <p className="text-sm text-brand-gray"><strong>Spouse/partner chair:</strong> If a second person is present, their chair should be next to the patient, not across from them. They are a team, not an audience. Both should face the screen.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">What Is on the Screen</h5>
              <p className="text-sm text-brand-gray mb-2">The patient's scan results, pre-loaded and ready. Do not fumble with a computer when they walk in. The screen should already show their name and their first scan image. This communicates preparation and authority.</p>
              <p className="text-sm text-brand-gray">Use a large monitor — 40 inches minimum. The patient needs to see the details of their scans clearly. Small screens force squinting and reduce impact.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">What Is on the Walls</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>Behind you:</strong> Your credentials. Degree, certifications, advanced training. This is not ego — this is environmental authority. The patient sees it while they listen to you speak.</p>
              <p className="text-sm text-brand-gray mb-2"><strong>To the patient's left or right:</strong> A before-and-after scan comparison from a real patient (anonymized). One image. One result. No explanation needed — the visual does the work.</p>
              <p className="text-sm text-brand-gray"><strong>Nothing else.</strong> No motivational quotes. No anatomy posters. No pamphlets. Nothing that divides attention.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Lighting</h5>
              <p className="text-sm text-brand-gray">Warm, focused lighting. Not overhead fluorescents. A lamp on the desk or recessed lighting that creates a calm, focused atmosphere. The screen should be the brightest thing in the room — it draws attention where you want it. Think "serious consultation," not "conference room."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Desk</h5>
              <p className="text-sm text-brand-gray">Nothing on it except the care plan document and a pen. No computer (the screen is separate). No phone. No coffee cup. No files from other patients. The desk communicates: "This time is yours. This is all about you."</p>
            </div>
          </div>
        )
      },
      {
        label: "07 Visual Tools",
        icon: "TrendingUp",
        title: "Visual tools that increase case acceptance",
        content: (
          <div className="space-y-4">
            <p><strong>Visuals do what words cannot.</strong> A patient can argue with what you say. They cannot argue with what they see.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Before-and-After Scans Displayed</h5>
              <p className="text-sm text-brand-gray">Mount one large before-and-after scan comparison in the ROF room and one in the adjustment area. Use real patient scans (anonymized). Choose your most dramatic improvement. No text explanation — just the images and the timeframe: "Before — 12 months later." The patient fills in the story themselves, and the story they tell themselves is more powerful than anything you could say.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Progress Charts on the Wall</h5>
              <p className="text-sm text-brand-gray">In the adjustment area, have a visible progress chart or digital display that shows general milestones of care. Not individual patient data — general patterns. "Weeks 1-4: Nervous system adapting. Weeks 5-12: Structural changes beginning. Weeks 13-24: Stabilization phase." This gives every patient context for where they are in the process and why continuing matters.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Patient Testimonial Board</h5>
              <p className="text-sm text-brand-gray">A physical board in the waiting area with printed patient testimonials. Not a binder they have to open — a display they cannot avoid seeing. Include a photo (with permission), a first name, and a one-sentence quote. Rotate monthly. Digital screens work too, but physical boards feel more authentic. The message: "Other people like you made this decision. It worked."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The "Wall of Transformation" in the Hallway</h5>
              <p className="text-sm text-brand-gray">Between the waiting area and the ROF room, line the hallway with framed patient success stories. The patient walks past proof on their way to their decision. This is not decoration — this is a psychological runway. By the time they sit down for their ROF, they have already seen a dozen people who said yes and got results.</p>
            </div>
          </div>
        )
      },
      {
        label: "08 What to Remove",
        icon: "AlertTriangle",
        title: "What to remove from your space immediately",
        content: (
          <div className="space-y-4">
            <p><strong>Addition is easy. Subtraction is where the power is.</strong> Here is what needs to go:</p>
            <div className="space-y-3">
              <p><strong>Insurance signs.</strong> Every sign that says "We accept Blue Cross" or "In-network with Aetna" reduces the perceived value of your care. It frames you as a vendor, not a doctor. Remove all of them. If patients ask about insurance, your team handles it verbally.</p>
              <p><strong>Casual decor.</strong> Family vacation photos in the consultation room. Sports memorabilia in the hallway. A fish tank that has not been cleaned. Anything that says "this is someone's hobby space" instead of "this is a clinical facility."</p>
              <p><strong>Cluttered desks.</strong> If a patient can see a pile of files, a half-eaten lunch, or a stack of mail on any surface, it communicates disorganization. Disorganization erodes trust. Every visible surface should be intentional.</p>
              <p><strong>Outdated materials.</strong> Pamphlets from 2019. Posters with yellowed edges. A magazine rack with last year's issues. Anything outdated signals neglect.</p>
              <p><strong>Vendor promotional materials.</strong> Supplement company posters, equipment brand logos, technique system banners. These make you look like a franchise, not an authority. Your walls should promote your results, not someone else's brand.</p>
              <p><strong>Personal electronics visible to patients.</strong> Your phone on the desk. A personal laptop open. AirPods on the counter. Every personal device visible to a patient communicates divided attention.</p>
            </div>
          </div>
        )
      },
      {
        label: "09 Walk-Through Audit",
        icon: "ClipboardCheck",
        title: "The Walk-Through Audit — Room by Room Checklist",
        content: (
          <div className="space-y-4">
            <p><strong>Walk your office as if you are a new patient who has never been here before.</strong> Start in the parking lot. Do this audit once per month.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Parking Lot and Entrance</h5>
              <p className="text-sm text-brand-gray">Is the signage clear and professional? Is the entrance clean? Is the door easy to find? Is there any trash, cigarette butts, or clutter near the entrance? Does the door open smoothly? Is the first thing they see when they walk in intentional?</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Front Desk and Waiting Area</h5>
              <p className="text-sm text-brand-gray">Is the front desk clear of clutter? Can the patient see personal items behind the desk? Is the seating comfortable and clean? Is the temperature comfortable? Is there a screen playing testimonials or educational content? Are the magazines current? Is the lighting warm? Does the space smell clean (not overly perfumed — clean)?</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Hallways</h5>
              <p className="text-sm text-brand-gray">Are the walls being used intentionally? Is there clutter on the floor (boxes, supplies, equipment)? Are all lights working? Is the flooring clean and in good condition? Can the patient hear staff conversations from the hallway?</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Consultation Room</h5>
              <p className="text-sm text-brand-gray">Is the door fully closeable? Is the seating arranged at an angle? Are your credentials visible? Is the tissue box stocked and within reach? Is the lighting warm? Are there any distractions on the desk or walls?</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Exam/Scan Area</h5>
              <p className="text-sm text-brand-gray">Is the equipment organized and visible? Are surfaces clean? Can the patient see scan results during collection? Is the area well-lit? Does the staff in this area look professional?</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">ROF Room</h5>
              <p className="text-sm text-brand-gray">Is the screen large enough and pre-loaded? Is the seating arranged correctly? Is the desk clear? Are the walls intentional? Is the lighting warm and focused? Is the door closed during every ROF?</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Adjustment Area</h5>
              <p className="text-sm text-brand-gray">Are the tables clean? Is the progress display visible? Is the flow from check-in to adjustment to check-out smooth? Are patients waiting in the adjustment area? Is the area organized?</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Restroom</h5>
              <p className="text-sm text-brand-gray">Is it clean? Is it stocked? Does it smell fresh? Is the mirror clean? Is there a lock that works? This is the one room where the patient is completely alone with their thoughts. Make it spotless.</p>
            </div>
          </div>
        )
      },
      {
        label: "10 Mastery + Action",
        icon: "CheckCircle2",
        title: "Mastery indicators and action checklist",
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-black text-brand-navy mb-3">Mastery Indicators</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong>Level 1:</strong> You have completed the walk-through audit and identified at least 5 changes to make.</p>
                <p className="text-sm"><strong>Level 2:</strong> Your ROF room is fully set up according to the blueprint — correct seating, correct screen, correct walls, correct lighting.</p>
                <p className="text-sm"><strong>Level 3:</strong> A new patient walks through your office and every room reinforces the same message: "This is a serious clinical facility where transformation happens."</p>
                <p className="text-sm"><strong>Level 4:</strong> You conduct monthly walk-through audits and your team knows the environmental standards. Nothing is ever out of place.</p>
              </div>
            </div>
            <div>
              <h4 className="font-black text-brand-navy mb-3">Action Checklist</h4>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Complete the walk-through audit this week</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Remove all insurance signage from the office</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Set up the ROF room according to the blueprint</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Install or print at least one before-and-after scan display</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Clear every desk surface of non-essential items</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Replace any fluorescent lighting in the ROF room with warm lighting</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Create or update the patient testimonial board in the waiting area</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Remove all vendor promotional materials from visible walls</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Schedule a monthly walk-through audit on your calendar</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Brief your team on the environmental standards so they maintain them daily</li>
              </ul>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "improvisation",
    title: "Playbook 10: Structure vs Improvisation",
    tagline: "When to follow the script exactly, and when to adapt in the moment.",
    summary: [
      "80% structure, 20% adaptation — never the reverse.",
      "Structure creates freedom. Improvisation without structure creates chaos.",
      "Scripts should sound natural because you have practiced them 100 times, not because you are winging it."
    ],
    icon: "Settings",
    sections: [
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p>This playbook answers the question every doctor eventually asks: <strong>"Do I really have to say it exactly like that?"</strong></p>
            <p>The answer is nuanced, and getting it wrong in either direction will cost you. Follow every script robotically and patients feel like they are talking to a telemarketer. Improvise everything and you will miss critical steps, drop patients, and wonder why your numbers fluctuate wildly from week to week.</p>
            <p><strong>Structure is not a cage. Structure is a runway.</strong> A pilot does not improvise takeoff. They follow a checklist every single time — not because they are incapable of thinking for themselves, but because the checklist ensures nothing critical gets missed. Then, once they are in the air, they adapt to conditions.</p>
            <p>That is the model. Follow the framework exactly, then adapt within it. This playbook teaches you the difference between the parts you never change and the parts where your personality, intuition, and experience get to show up.</p>
          </div>
        )
      },
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p><strong>Structure creates freedom. Improvisation without structure creates chaos.</strong></p>
            <p>Here is what happens in practices without structure: Monday the doctor is energized and crushes the ROF. Tuesday the doctor is tired and skips the emotional bridge. Wednesday the doctor is stressed about payroll and rushes the financial conversation. By Friday, the doctor cannot figure out why three patients said "I need to think about it."</p>
            <p>The answer is simple: <strong>inconsistency.</strong> When your process changes based on your mood, your results will change based on your mood. That is not a practice — that is a gamble.</p>
            <p>Structure eliminates the variable of "how you are feeling today." It ensures that every patient gets the same level of care, the same clarity, and the same opportunity to say yes — regardless of whether you slept well, had a fight with your spouse, or are worried about your tax bill.</p>
            <p><strong>The best doctors in this program do not have better personalities. They have better systems.</strong></p>
          </div>
        )
      },
      {
        label: "03 The Amateur Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p><strong>Two opposite mistakes. Both are fatal.</strong></p>
            <p><strong>The Robot.</strong> This doctor memorizes every script and delivers it with zero emotional intelligence. They say the right words, but the tone is flat, the eye contact is rehearsed, and the patient feels like they are watching a performance, not having a conversation. The Robot hits every checkpoint and misses every human being.</p>
            <p><strong>The Cowboy.</strong> This doctor refuses to follow scripts because they believe their "authenticity" is their superpower. They wing every conversation, trust their gut on every ROF, and improvise the financial presentation based on what "feels right." The Cowboy has occasional brilliant days and frequent terrible ones. They are addicted to the highs and confused by the lows.</p>
            <p>The Cowboy will tell you: "I just connect with people. I do not need a script." What they really mean is: "I have not done the work to internalize a framework, so I have relabeled my laziness as a personality trait."</p>
            <p><strong>Mastery is neither robotic nor reckless.</strong> It is structured fluency — like a jazz musician who knows the chord changes so well that their improvisation sounds effortless.</p>
          </div>
        )
      },
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "Confusing personality with skill",
        content: (
          <div className="space-y-4">
            <p><strong>"Being authentic" is not a clinical strategy.</strong> It is an excuse for being unprepared.</p>
            <p>Here are the hidden breakdowns that happen when you confuse personality with skill:</p>
            <p><strong>You skip the emotional bridge on Day 2</strong> because you "felt like the patient was already on board." They were not. They were being polite. You read agreement where there was only agreeableness. Two days later, they cancel.</p>
            <p><strong>You adjust the financial presentation based on what you think the patient can afford.</strong> You look at their clothes, their car, their job title, and you pre-decide what to offer. This is not intuition — this is projection. You are making their financial decision for them, and you are usually wrong.</p>
            <p><strong>You skip the post-adjustment frame because you are running behind.</strong> The patient leaves without knowing what to expect, feels sore the next day, panics, and calls to cancel. All because you saved 90 seconds.</p>
            <p><strong>You add personal opinions to the ROF</strong> — about supplements, about diet, about exercise — that dilute the core message. The patient leaves with 15 things to think about instead of one clear decision.</p>
            <p>Every one of these is an improvisation that felt right in the moment and cost you in the outcome.</p>
          </div>
        )
      },
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "The 80/20 Rule of Clinical Communication",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">80% Structure — The Non-Negotiables</h5>
              <p className="text-sm text-brand-gray mb-3">These are the scripts, frameworks, and sequences that you follow every single time, with every single patient, regardless of how you are feeling or what is happening in your day.</p>
              <ul className="text-sm text-brand-gray space-y-2">
                <li><strong>The Day 1 orientation script.</strong> You say it the same way every time. The words, the sequence, the tone.</li>
                <li><strong>The Day 2 ROF framework.</strong> The three phases, the emotional bridge, the recommendation language. Every time.</li>
                <li><strong>The financial presentation.</strong> The exact words, the pause, the silence after the number. Every time.</li>
                <li><strong>The re-exam conversation.</strong> The progress frame, the next-phase language, the recommitment. Every time.</li>
                <li><strong>The post-adjustment frame.</strong> What to expect, what is normal, when the next visit is. Every time.</li>
              </ul>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">20% Adaptation — The Human Layer</h5>
              <p className="text-sm text-brand-gray mb-3">This is where you read the room, adjust your tone, meet the patient where they are, and bring your unique personality. But adaptation only works inside the structure.</p>
              <ul className="text-sm text-brand-gray space-y-2">
                <li><strong>Adjusting your pace</strong> — speaking slower with an anxious patient, more directly with an analytical one.</li>
                <li><strong>Choosing which personal story to share</strong> — matching your example to their situation.</li>
                <li><strong>Reading emotional cues</strong> — pausing when they tear up, giving space when they need to process.</li>
                <li><strong>Cultural awareness</strong> — adjusting eye contact, physical proximity, or communication style based on the patient's background.</li>
                <li><strong>Following their language</strong> — if they say "my back is killing me," you do not correct them to "spinal subluxation." You meet them where they are first.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        label: "06 When to Follow Exactly",
        icon: "ShieldCheck",
        title: "When to follow the script exactly — no exceptions",
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Day 1 Orientation — Always</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, here is what we are doing today. First, I am going to listen to your story. Then we will run a few specific scans. Finally, I will take that data and analyze it tonight. My goal is simple: to see if I can help you, or if I need to refer you to someone who can."</p>
              <p className="text-sm text-brand-gray mt-2">This script sets the frame for the entire patient relationship. Every word matters. Do not paraphrase. Do not add to it. Do not skip it because the patient "seems relaxed." Say it exactly.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Day 2 ROF Framework — Always</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, I spent time last night going through your results. I want to walk you through what I found, what it means, and what I recommend. At the end, you will have all the information you need to make a decision."</p>
              <p className="text-sm text-brand-gray mt-2">The ROF framework is the engine of your case acceptance. The three phases — findings, meaning, recommendation — must happen in that order every time. Skipping or rearranging them is like removing a step from a surgical procedure.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Financial Presentation — Always</h5>
              <p className="text-sm text-brand-gray italic">"The investment for your complete care plan is [amount]. That covers everything — every visit, every re-exam, every adjustment for the next [timeframe]. I do not want finances to be the thing that keeps you from getting the care you need. Let me show you the options we have."</p>
              <p className="text-sm text-brand-gray mt-2">The financial script is the most tempting one to improvise, because money feels personal. Do not adjust the number based on assumptions. Do not apologize for the price. Do not offer a discount before they ask. Say the script. Then be silent.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Re-Exam Conversations — Always</h5>
              <p className="text-sm text-brand-gray italic">"Sarah, today is an important day. We are going to re-scan you and compare your results to where you were when you started. This will tell us exactly how your nervous system is responding and what the next phase of your care looks like."</p>
              <p className="text-sm text-brand-gray mt-2">Re-exams are where patients either recommit or start fading. The script ensures you frame it as progress and forward momentum, not just another appointment.</p>
            </div>
          </div>
        )
      },
      {
        label: "07 When to Adapt",
        icon: "HeartPulse",
        title: "When to adapt — and how to do it without losing the framework",
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Patient Is Emotional or Crying</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>What to do:</strong> Stop the script. Do not keep presenting. Put down whatever you are holding. Make eye contact. Say nothing for 5 seconds. Then:</p>
              <p className="text-sm text-brand-gray italic">"Take your time. I am not in a rush. This is important, and your feelings are telling you something. When you are ready, we will keep going."</p>
              <p className="text-sm text-brand-gray mt-2">Then resume the framework exactly where you left off. The adaptation was the pause and the acknowledgment. The structure remains the same.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Patient Brings Up a Personal Crisis</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>What to do:</strong> Acknowledge it genuinely, then redirect to the clinical conversation. Do not become their therapist. Do not spend 20 minutes on their divorce.</p>
              <p className="text-sm text-brand-gray italic">"Tom, I am sorry you are going through that. That kind of stress is real, and honestly, it is one more reason your nervous system needs what we are talking about today. Let me show you what I found."</p>
              <p className="text-sm text-brand-gray mt-2">The adaptation is the empathy. The structure is the redirect back to the framework.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Patient Has a Unique or Complex Medical History</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>What to do:</strong> Acknowledge the complexity, validate their experience, then stay in the framework.</p>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, I can see you have been through a lot medically. That actually makes this conversation more important, not less. What I found in your scans is independent of your other conditions — this is about how your nervous system is functioning right now. Let me show you."</p>
              <p className="text-sm text-brand-gray mt-2">Do not get pulled into a medical debate. Do not try to explain how chiropractic relates to their other conditions. Stay in your lane. Present your findings.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Cultural or Communication Differences</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>What to do:</strong> Adjust the delivery, not the content. If a patient is not a native English speaker, speak slower and simpler — but do not skip steps. If a patient comes from a culture where direct eye contact is uncomfortable, adjust your gaze. If a patient has a family member translating, speak to the patient, not the translator.</p>
              <p className="text-sm text-brand-gray italic">"I want to make sure you understand everything clearly. Please stop me at any point if you want me to explain something differently."</p>
              <p className="text-sm text-brand-gray mt-2">The framework stays the same. The speed, tone, and eye contact adapt.</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Practice Drills",
        icon: "RefreshCw",
        title: "Practice drills for internalizing scripts — the daily 10-minute routine",
        content: (
          <div className="space-y-6">
            <p><strong>Scripts do not become natural by thinking about them. They become natural by saying them out loud, repeatedly, until the words live in your mouth, not in your head.</strong> Here is your daily routine:</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Drill 1: Morning Mirror Drill (3 minutes)</h5>
              <p className="text-sm text-brand-gray mb-2">Stand in front of your bathroom mirror. Make eye contact with yourself. Deliver the Day 1 orientation script out loud, at full volume, with intention. Watch your face. Watch your hands. Are you rushing? Are you monotone? Are you making eye contact with yourself?</p>
              <p className="text-sm text-brand-gray">Do this every morning for 30 days. By day 15, you will not need to think about the words. By day 30, the script will feel like your own language.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Drill 2: Drive-Time Rehearsal (3 minutes)</h5>
              <p className="text-sm text-brand-gray mb-2">Pick one objection response per day. On your drive to the office, practice it out loud. Say it three times. The first time, just get the words right. The second time, add the tone and the pause. The third time, say it like you are talking to a real patient sitting next to you.</p>
              <p className="text-sm text-brand-gray">Monday: "I need to think about it." Tuesday: "I cannot afford it." Wednesday: "I want to check with my spouse." Thursday: "My insurance does not cover this." Friday: "How long will this take?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Drill 3: End-of-Day Review (2 minutes)</h5>
              <p className="text-sm text-brand-gray mb-2">Before you leave the office, answer three questions:</p>
              <p className="text-sm text-brand-gray">1. What script did I use today exactly as written?</p>
              <p className="text-sm text-brand-gray">2. Where did I improvise? Was it a conscious choice or a lazy one?</p>
              <p className="text-sm text-brand-gray">3. If I improvised, did the outcome improve or decline compared to when I follow the script?</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Drill 4: Weekly Role-Play with a Team Member (10 minutes)</h5>
              <p className="text-sm text-brand-gray mb-2">Once a week, grab your CA or office manager. Have them play the patient. Run through one complete scenario — a Day 2 ROF, a financial conversation, an objection sequence. Have them throw curveballs. Practice adapting without losing the framework.</p>
              <p className="text-sm text-brand-gray">After the role-play, ask your team member: "Did I sound natural? Did I rush anywhere? Did I skip anything?" Their feedback is more valuable than your self-assessment.</p>
            </div>
          </div>
        )
      },
      {
        label: "09 Sounding Natural",
        icon: "MessageSquare",
        title: "How to make scripts sound natural, not robotic",
        content: (
          <div className="space-y-4">
            <p><strong>The goal is not to sound scripted. The goal is to be so prepared that the script disappears.</strong> Here is how:</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Own the Words, Do Not Just Read Them</h5>
              <p className="text-sm text-brand-gray">The scripts in this program are not sacred text. They are frameworks. Once you have practiced them enough to know them cold, you will naturally start to use your own phrasing for the connecting tissue between the key phrases. That is fine. The critical lines — the ones marked as "say exactly this" — stay the same. The transitions between them can be yours.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Add Your Personal Stories at Specific Moments</h5>
              <p className="text-sm text-brand-gray mb-2">There are exactly three moments in the patient journey where a personal story is powerful:</p>
              <p className="text-sm text-brand-gray">1. <strong>Day 1, after listening to their story:</strong> Share a brief story about why you became a chiropractor. Keep it under 60 seconds.</p>
              <p className="text-sm text-brand-gray">2. <strong>Day 2, after presenting findings:</strong> Share a story about a patient (anonymized) who had similar findings and what happened when they followed through with care.</p>
              <p className="text-sm text-brand-gray">3. <strong>During an objection:</strong> Share a brief story about a patient who had the same concern and how it resolved.</p>
              <p className="text-sm text-brand-gray mt-2">These are the only three moments. Do not scatter personal stories throughout. They dilute the framework.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The "Anchor Phrase" Technique</h5>
              <p className="text-sm text-brand-gray mb-2">For every script, there is one sentence that anchors the entire message. Memorize that sentence first. Once you have the anchor phrase locked in, the rest of the script flows naturally from it.</p>
              <p className="text-sm text-brand-gray"><strong>Day 1 anchor:</strong> "My goal is simple: to see if I can help you, or if I need to refer you to someone who can."</p>
              <p className="text-sm text-brand-gray"><strong>Day 2 anchor:</strong> "This is what your nervous system is doing right now — and this is what it should be doing."</p>
              <p className="text-sm text-brand-gray"><strong>Financial anchor:</strong> "I do not want finances to be the thing that keeps you from getting the care you need."</p>
              <p className="text-sm text-brand-gray"><strong>Objection anchor:</strong> "I completely understand. Let me ask you one question before you decide."</p>
              <p className="text-sm text-brand-gray mt-2">Memorize the anchors first. Practice the full scripts second. In time, you will be able to reconstruct any script from its anchor phrase alone.</p>
            </div>
          </div>
        )
      },
      {
        label: "10 Mastery + Action",
        icon: "CheckCircle2",
        title: "Mastery indicators and action checklist",
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-black text-brand-navy mb-3">Mastery Indicators</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong>Level 1:</strong> You can deliver the Day 1 orientation, Day 2 ROF framework, and financial presentation from memory without looking at notes.</p>
                <p className="text-sm"><strong>Level 2:</strong> Patients never describe your conversations as "scripted" or "salesy." They say things like "you were so clear" or "I felt like you really understood."</p>
                <p className="text-sm"><strong>Level 3:</strong> You can identify in real-time when you are improvising and consciously choose whether to continue or return to the framework. Your improvisations are intentional, not accidental.</p>
                <p className="text-sm"><strong>Level 4:</strong> Your case acceptance is consistent week over week — not because every patient says yes, but because your delivery is the same regardless of your mood, energy, or stress level. The framework runs on autopilot and your personality enhances it.</p>
              </div>
            </div>
            <div>
              <h4 className="font-black text-brand-navy mb-3">Action Checklist</h4>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Start the morning mirror drill tomorrow — commit to 30 days</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Write down the 4 anchor phrases and tape them to your bathroom mirror</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Assign one objection to each day of the week for drive-time rehearsal</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Schedule a weekly 10-minute role-play session with a team member</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; At the end of each day this week, journal your 3 review questions</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Record yourself delivering the ROF script and listen back — note where you rush or sound flat</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Identify your 3 personal stories (why you became a chiropractor, a patient success, an objection story) and rehearse them to under 60 seconds each</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Track your case acceptance for 2 weeks and note which days you followed the scripts exactly vs improvised</li>
              </ul>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "day3",
    title: "Playbook 11: Day 3 — Behavioral Stabilization",
    tagline: "The first adjustment visit that sets the tone for the entire care plan.",
    summary: [
      "Day 3 is the first adjustment — the visit that determines whether they complete their care plan or drop at visit 4.",
      "Most doctors just adjust and send them home. That is a missed opportunity worth thousands.",
      "The Day 3 Framework has 5 steps and takes 7 extra minutes. Those 7 minutes protect the entire care plan."
    ],
    icon: "Activity",
    sections: [
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p><strong>Day 3 is the first adjustment visit.</strong> The patient said yes on Day 2. They committed to a care plan. They paid money. And now they are back for their first actual adjustment. This is the most critical moment for establishing the behavioral pattern that will carry them through 24, 36, or 48 visits.</p>
            <p>Think of Day 3 as the patient's first day at a new gym. They signed the membership. They showed up. But everything about the experience — the greeting, the orientation, how they feel during and after — determines whether they come back tomorrow or let the membership collect dust.</p>
            <p><strong>Day 3 is not just an adjustment. It is a behavioral installation.</strong> You are installing the pattern of showing up, trusting the process, and expecting progress. If you treat Day 3 as "just another visit," you will lose them by visit 4 or 5. If you treat Day 3 as the foundation of their entire care plan, you will keep them for months.</p>
          </div>
        )
      },
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p><strong>Day 3 determines whether they complete their care plan or drop off at visit 4.</strong></p>
            <p>Here is the pattern that kills practices: Patient starts care. First adjustment feels different — maybe good, maybe sore, maybe nothing. Patient goes home and their spouse asks "How was it?" Patient does not have the language to explain what happened or why it matters. Spouse says "Are you sure about this?" Patient's commitment wobbles. By visit 4, they are "too busy" to come in. By visit 6, they have stopped scheduling.</p>
            <p>This happens because the doctor never gave them the framework for understanding their early experience. The patient was left to interpret new sensations without context, and their brain defaulted to uncertainty.</p>
            <p><strong>The doctor who controls the Day 3 narrative controls retention.</strong> When you tell a patient exactly what to expect before they feel it, every sensation becomes confirmation that the care is working — not evidence that something is wrong.</p>
            <p>Day 3 is where you turn a buyer into a believer.</p>
          </div>
        )
      },
      {
        label: "03 The Amateur Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p><strong>The "Adjust and Eject" problem.</strong> Patient comes in, doctor adjusts them, says "see you Wednesday," and moves on to the next patient. No check-in. No expectation-setting. No post-adjustment frame. No hook for the next visit. Just a click and a goodbye.</p>
            <p>This doctor treats Day 3 like visit 47 — routine, mechanical, forgettable. But Day 3 is not routine for the patient. It is terrifying, exciting, uncertain, and loaded with expectation. They just committed thousands of dollars. They want to know it is working. They need a frame for interpreting what they are about to feel.</p>
            <p>The "Adjust and Eject" approach creates a vacuum. And in that vacuum, the patient fills in their own narrative — usually one driven by fear, buyer's remorse, or the skepticism of the people around them.</p>
            <p><strong>The other trap: over-educating.</strong> Some doctors swing the other direction and turn Day 3 into a second ROF. They lecture about neurology, explain subluxation theory, and show more scans. The patient is overwhelmed and leaves thinking "I thought we already covered this." Day 3 is not about education. It is about experience, expectation, and behavioral anchoring.</p>
          </div>
        )
      },
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "Missing the education window and expectation gap",
        content: (
          <div className="space-y-4">
            <p><strong>The education window on Day 3 is exactly 4 minutes.</strong> Two minutes before the adjustment, two minutes after. That is it. If you try to teach during the adjustment, they are not listening — they are processing a physical experience. If you try to teach after they have stood up and are heading to the front desk, the moment is gone.</p>
            <p><strong>The soreness problem.</strong> At least 30% of patients will feel sore, tired, or "off" after their first adjustment. If you did not warn them, they will interpret the soreness as "it made me worse." This is the number one reason patients drop after visit 3. Not because they actually got worse, but because no one told them that feeling different is part of the process.</p>
            <p><strong>The spouse problem.</strong> The patient goes home and their spouse, parent, or friend asks about the visit. If the patient cannot articulate what happened and why it matters, the outside voice wins. You need to give them the words to use — literally, the sentences to say when someone asks "How was your appointment?"</p>
            <p><strong>The "nothing happened" problem.</strong> Some patients feel nothing after their first adjustment. No relief, no soreness, nothing. Without a frame, they think the care is not working. You need to preempt this by explaining that the nervous system often takes time to respond, and that "feeling nothing" is actually the most common Day 3 response.</p>
          </div>
        )
      },
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "The Day 3 Framework — 5 Steps, 7 Extra Minutes",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 1: The Check-In (2 minutes)</h5>
              <p className="text-sm text-brand-gray mb-2">Before anything clinical happens, check in with the patient emotionally and physically. This is not small talk — it is data collection and relationship building.</p>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson, welcome back. Before we get started, how are you feeling since your last visit? Any changes, any questions, anything you noticed?"</p>
              <p className="text-sm text-brand-gray mt-2">Listen to their answer. If they say "great," affirm it. If they say "nervous," acknowledge it. If they say "my husband thinks this is a waste of money," address it directly. The check-in tells you what frame they walked in with so you can set the right frame before you adjust them.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 2: The Expectation Set (2 minutes)</h5>
              <p className="text-sm text-brand-gray mb-2">Before you touch them, tell them exactly what is going to happen and what they might feel afterward.</p>
              <p className="text-sm text-brand-gray italic">"Today is your first adjustment, and I want you to know what to expect. The adjustment itself takes a few minutes. You might hear a sound — that is completely normal. Afterward, you might feel amazing. You might feel a little sore, like you started a new workout. Or you might feel nothing at all. All three are normal, and all three tell me something useful. I am going to check in with you after to walk you through it."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 3: The Adjustment (Clinical)</h5>
              <p className="text-sm text-brand-gray">Perform the adjustment with confidence and precision. Do not narrate every move unless the patient is visibly anxious (in which case, brief narration reduces threat). Minimal talking during the adjustment. Let the clinical work speak.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 4: The Post-Adjustment Frame (2 minutes)</h5>
              <p className="text-sm text-brand-gray mb-2">Immediately after the adjustment, while they are still on the table or just sitting up, deliver the post-adjustment frame.</p>
              <p className="text-sm text-brand-gray italic">"Good. Here is what I want you to pay attention to over the next 24 to 48 hours. You might notice some changes — better sleep, more energy, less tension. You might also feel some soreness, like your body is recalibrating. Both are signs that your nervous system is responding. Drink extra water today. If you feel anything unusual, that is your body adjusting, not getting worse. I will check in with you next visit."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 5: The Next Visit Hook (1 minute)</h5>
              <p className="text-sm text-brand-gray mb-2">Before they leave the adjustment area, create anticipation for the next visit.</p>
              <p className="text-sm text-brand-gray italic">"Next time you come in, I am going to be looking for something specific — how your body held the adjustment. That is going to tell us a lot about how your nervous system is adapting. I am genuinely curious to see what happens between now and then."</p>
              <p className="text-sm text-brand-gray mt-2">This single sentence does three things: it creates curiosity (they want to know what you find), it makes the next visit feel purposeful (not just another appointment), and it frames progress as something measurable (not just how they feel).</p>
            </div>
          </div>
        )
      },
      {
        label: "06 Full Day 3 Script",
        icon: "FileText",
        title: "Full Day 3 Script — word for word",
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Walking Them from Waiting Room to Adjustment Room</h5>
              <p className="text-sm text-brand-gray italic">"Mrs. Johnson? Come on back. How are you doing today?"</p>
              <p className="text-sm text-brand-gray mt-2">[Walk with them. Do not rush. Match their pace. If they talk, listen. If they are quiet, that is fine too. You are reading their energy.]</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Pre-Adjustment Conversation (In the Adjustment Room)</h5>
              <p className="text-sm text-brand-gray italic">"So, this is your first adjustment day. How are you feeling about everything — any questions since your last visit?"</p>
              <p className="text-sm text-brand-gray mt-2">[Let them answer. If they have questions, answer them briefly and directly. Do not re-explain the entire care plan. If they say "no questions," move to the expectation set.]</p>
              <p className="text-sm text-brand-gray italic mt-3">"Great. Here is what is going to happen today. I am going to check your spine, make the adjustment, and then we will talk about what to expect over the next couple of days. The adjustment itself is quick — a few minutes. You might hear a pop or a click. That is just the joint releasing gas — it is completely normal and safe. Ready?"</p>
              <p className="text-sm text-brand-gray mt-2">[Wait for their confirmation. Do not start until they say yes or nod.]</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Post-Adjustment Conversation (While They Are Still Seated or Lying Down)</h5>
              <p className="text-sm text-brand-gray italic">"Good. How does that feel?"</p>
              <p className="text-sm text-brand-gray mt-2">[Let them respond. Common answers: "Different." "Lighter." "I do not know." "Good." All are fine.]</p>
              <p className="text-sm text-brand-gray italic mt-3">"Here is what I want you to know. Over the next day or two, your body is going to respond to what we just did. Some people feel amazing right away — more energy, less pain, better sleep tonight. Other people feel a little sore or tired. Both of those are your nervous system recalibrating. Think of it like this: if you have not worked out in months and you go to the gym, you feel it the next day. That does not mean the gym hurt you — it means your body is adapting. Same thing here."</p>
              <p className="text-sm text-brand-gray italic mt-3">"Drink more water than usual today. That helps your body process the changes. And if you feel anything that concerns you, call us. But in most cases, whatever you feel in the next 48 hours is exactly what is supposed to happen."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Scheduling the Next Visit</h5>
              <p className="text-sm text-brand-gray italic">"Before you check out, I want to tell you what I will be looking for next time. I am going to check how your body held the adjustment — how your spine and nervous system responded between now and then. That is going to give us important data. So make sure you keep your next appointment. It matters."</p>
              <p className="text-sm text-brand-gray mt-2">[Walk them toward the front desk. Hand them off to the CA with context.]</p>
              <p className="text-sm text-brand-gray italic mt-3">[To the CA]: "Sarah, Mrs. Johnson just had her first adjustment. Let us get her scheduled for her next visit — we want to keep the momentum going."</p>
              <p className="text-sm text-brand-gray mt-2">[To the patient]: "You did great. I will see you next time."</p>
            </div>
          </div>
        )
      },
      {
        label: "07 Healing Crisis",
        icon: "HeartPulse",
        title: "Script for explaining healing crisis and initial soreness",
        content: (
          <div className="space-y-4">
            <p><strong>This script should be delivered during Step 4 (Post-Adjustment Frame) or when a patient calls or comes in reporting that they "feel worse."</strong></p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Healing Crisis Script — Proactive Version (Day 3, Post-Adjustment)</h5>
              <p className="text-sm text-brand-gray italic">"Some patients feel amazing after their first adjustment. Others feel sore, tired, or even a little off. Both are normal. Your nervous system has been stuck in a pattern, and we just changed it. Think of it like starting a new workout — your body is adapting. The soreness is not damage. It is your nervous system waking up and recalibrating. It typically lasts 24 to 48 hours. By your next visit, I expect you to feel different — and I will be checking to see exactly how your body responded."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Healing Crisis Script — Reactive Version (Patient Calls or Reports at Next Visit)</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, I am glad you told me that. What you are describing is actually a sign that your nervous system is responding. Remember, your spine has been in that pattern for years — maybe decades. When we start to change it, your body notices. The soreness you felt is your muscles and nervous system adapting to a new position. It is like breaking in a new pair of shoes — it is uncomfortable at first, but it means the fit is changing. If we did nothing and you felt nothing, I would actually be more concerned. The fact that your body reacted tells me it is paying attention. Let us see what happens today."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Take-Home Instructions Framework</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>What to give them:</strong> A simple, branded one-page sheet that says "After Your Adjustment" at the top. Include:</p>
              <p className="text-sm text-brand-gray">1. <strong>Drink water.</strong> "Your body is processing changes. Water helps."</p>
              <p className="text-sm text-brand-gray">2. <strong>Expect changes.</strong> "Soreness, tiredness, or feeling great are all normal responses."</p>
              <p className="text-sm text-brand-gray">3. <strong>Move gently.</strong> "Take a light walk today. Avoid heavy lifting or intense exercise for 24 hours."</p>
              <p className="text-sm text-brand-gray">4. <strong>Keep your next appointment.</strong> "Your next visit is when we check how your body responded. Do not skip it."</p>
              <p className="text-sm text-brand-gray">5. <strong>Call us if you have questions.</strong> "Our number is on this sheet. Do not Google your symptoms — call us."</p>
              <p className="text-sm text-brand-gray mt-2"><strong>What to say when you hand it to them:</strong></p>
              <p className="text-sm text-brand-gray italic">"Take this home. It covers everything I just told you about what to expect. If your spouse or anyone asks how it went, you can show them this. And if you feel anything that worries you, our number is right there. But I expect you to feel great."</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Visit 4 Hook",
        icon: "TrendingUp",
        title: "Script for making them excited about visit 4",
        content: (
          <div className="space-y-4">
            <p><strong>The bridge between Day 3 and visit 4 is where most patients are lost.</strong> The excitement of starting has faded, the soreness is real, and the voice in their head (or their spouse's voice) is saying "is this really worth it?" You need to create a reason for them to come back that is not just "you have an appointment."</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Visit 4 Hook Script</h5>
              <p className="text-sm text-brand-gray italic">"Next time, I am going to be looking for something specific. I want to see how your body held the adjustment — did it hold, or did it go back to the old pattern? That is going to tell us a lot about how your nervous system is responding to the care. I am genuinely curious to see what happens. Some patients hold the adjustment right away. Others take a few visits. Either way, it tells me exactly what your body needs. I will see you on [day]."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Why This Works</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>Curiosity.</strong> You told them you are looking for something specific. Now they want to know what you find. They cannot get that answer if they skip the appointment.</p>
              <p className="text-sm text-brand-gray mb-2"><strong>Purpose.</strong> The next visit is not just "another adjustment." It is a checkpoint. It has meaning. There is data to collect and a question to answer.</p>
              <p className="text-sm text-brand-gray"><strong>Progress framing.</strong> You introduced the idea that their body will either "hold" or "go back." Both are presented as valuable data, not pass/fail. This removes the pressure of "am I getting better?" and replaces it with "let us see how my body is responding."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Alternate Hook for the Analytical Patient</h5>
              <p className="text-sm text-brand-gray italic">"Tom, next visit I am going to run a quick check on the segments we adjusted today. The data from that check is going to show me whether your nervous system is starting to adapt or whether we need to adjust our approach. I have a hypothesis about what we will find, but I want to see the data before I say anything. I will see you Thursday."</p>
            </div>
          </div>
        )
      },
      {
        label: "09 I Feel Worse",
        icon: "AlertTriangle",
        title: "How to handle 'I feel worse after the adjustment'",
        content: (
          <div className="space-y-4">
            <p><strong>This is the most important script you will ever learn.</strong> When a patient says "I feel worse," your response in the next 30 seconds determines whether they continue care or walk out the door. Most doctors panic, over-explain, or get defensive. All three are fatal.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 1: Do Not React — Respond</h5>
              <p className="text-sm text-brand-gray">Do not flinch. Do not look concerned. Do not say "oh no" or "that should not have happened." Your face and your body language must communicate calm confidence. If you look worried, they will be terrified.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 2: Validate and Normalize</h5>
              <p className="text-sm text-brand-gray italic">"Tell me exactly what you are feeling. I want to hear all of it."</p>
              <p className="text-sm text-brand-gray mt-2">[Listen completely. Do not interrupt. Let them finish.]</p>
              <p className="text-sm text-brand-gray italic mt-3">"Thank you for telling me that. Here is what I want you to know — what you are describing is something I see regularly when someone's nervous system starts to change. It does not mean you are getting worse. It means your body is responding."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 3: Reframe with an Analogy</h5>
              <p className="text-sm text-brand-gray italic">"Think about it this way, Mrs. Johnson. If you have been sitting in a bad posture for 10 years and someone finally corrects it, the first thing your body says is 'what is happening?' That reaction is not damage — it is awareness. Your nervous system is noticing the change. The discomfort you are feeling is your body learning a new pattern. That takes time, and it is not always comfortable."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 4: Redirect to the Plan</h5>
              <p className="text-sm text-brand-gray italic">"Here is what I want to do. I am going to check you today and see exactly what is going on. Then I am going to adjust based on what I find. If your body reacted strongly, it might mean we modify the approach slightly — different pressure, different angle. But the direction does not change. Your nervous system still needs what we are doing. I just want to make sure we are doing it in a way your body can handle. Fair enough?"</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 5: Create the Benchmark</h5>
              <p className="text-sm text-brand-gray italic">"After today's adjustment, I want you to track how you feel over the next 48 hours. Compare it to how you felt after the last one. What I expect to see is that the response gets smaller each time. Your body is adapting. If you had the same reaction to the second adjustment that you had to the first, I would want to know about that. But I would bet that today is going to go smoother. Let us find out."</p>
            </div>
            <p><strong>What you never say:</strong> "That should not have happened." "Let me check if I did something wrong." "Maybe we should slow down." "Why do you think it happened?" Every one of these statements transfers doubt to the patient. You stay certain. You stay calm. You stay the authority.</p>
          </div>
        )
      },
      {
        label: "10 Mastery + Action",
        icon: "CheckCircle2",
        title: "Mastery indicators and action checklist",
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-black text-brand-navy mb-3">Mastery Indicators</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong>Level 1:</strong> You deliver all 5 steps of the Day 3 Framework without skipping any. The check-in, expectation set, adjustment, post-adjustment frame, and next visit hook all happen, in order, every time.</p>
                <p className="text-sm"><strong>Level 2:</strong> Patients leave Day 3 able to explain to their spouse what happened, why they might feel sore, and when their next visit is. They have the language because you gave it to them.</p>
                <p className="text-sm"><strong>Level 3:</strong> When a patient reports "I feel worse," you deliver the response script with calm confidence and the patient stays in care. Zero patients are lost to post-adjustment soreness.</p>
                <p className="text-sm"><strong>Level 4:</strong> Your visit 4 show rate is above 95%. Patients come back for visit 4 not because they feel obligated, but because they are curious about what you are going to find. You have created anticipation, not just compliance.</p>
              </div>
            </div>
            <div>
              <h4 className="font-black text-brand-navy mb-3">Action Checklist</h4>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Print and practice the full Day 3 script until you can deliver it without notes</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Create the "After Your Adjustment" take-home sheet with the 5 key instructions</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Practice the "I feel worse" response script 5 times out loud — focus on your facial expression and tone</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Role-play the healing crisis conversation with a team member — have them push back</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Memorize the visit 4 hook and the alternate version for analytical patients</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Track your visit 4 show rate for the next 30 days — set a target of 95%+</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Train your CA on how to handle same-day calls from patients who "feel worse" — give them a script too</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Review and refine your Day 3 process after 10 patients — what is working, what needs adjustment?</li>
              </ul>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "ceo",
    title: "Playbook 12: CEO Nervous System Stability",
    tagline: "Your nervous system runs the practice. Here's how to keep it regulated.",
    summary: [
      "Your state determines your patients' experience. Stressed doctor equals stressed patients equals low case acceptance.",
      "You need a Doctor Operating System — a daily protocol that keeps you regulated regardless of circumstances.",
      "Separating 'owner stress' from 'doctor stress' is the unlock most practice owners never find."
    ],
    icon: "Brain",
    sections: [
      {
        label: "01 Identity",
        icon: "Info",
        title: "What this playbook is",
        content: (
          <div className="space-y-4">
            <p><strong>Your state determines your patients' experience.</strong> This is not a motivational statement — it is a clinical reality. When you are calm, certain, and present, your patients feel safe. When you are stressed, rushed, or distracted, your patients feel uncertain. And uncertain patients do not say yes to care plans.</p>
            <p>You are not just a doctor. You are a nervous system that other nervous systems calibrate to. Every patient in your office is unconsciously reading your body language, your voice, your energy, and your pace — and their brain is making decisions based on what it finds.</p>
            <p>This playbook is your <strong>Doctor Operating System</strong> — a daily protocol for managing your internal state so that your external performance never drops below your standard. It is not about mindfulness or meditation (though both are fine). It is about <strong>tactical state management</strong> — specific routines, rituals, and recovery protocols that keep your nervous system regulated from first patient to last.</p>
            <p>You are the instrument. This playbook teaches you how to tune it.</p>
          </div>
        )
      },
      {
        label: "02 The Stakes",
        icon: "Target",
        title: "Why it matters",
        content: (
          <div className="space-y-4">
            <p><strong>Stressed doctor equals stressed patients equals low case acceptance.</strong> The math is simple and unforgiving.</p>
            <p>When you are dysregulated — running behind, frustrated with staff, worried about money, exhausted from poor sleep — it shows up in every interaction. You do not have to say "I am stressed" for your patients to feel it. Your body says it for you. Your voice gets faster. Your explanations get shorter. Your eye contact gets weaker. Your patience gets thinner.</p>
            <p>And here is the brutal truth: <strong>the patient does not know why you feel off. They just know something feels off.</strong> And that feeling becomes "I need to think about it." That feeling becomes a no-show for visit 4. That feeling becomes a one-star review that says "the doctor seemed rushed."</p>
            <p>You can have perfect scripts, a perfect environment, and a perfect care plan — and still lose the patient because your nervous system was not in the right state to deliver it.</p>
            <p><strong>Your regulation is not self-care. It is business strategy.</strong> Every dollar you have ever lost to a patient who said "I need to think about it" was at least partially caused by a state problem, not a script problem.</p>
          </div>
        )
      },
      {
        label: "03 The Amateur Trap",
        icon: "AlertTriangle",
        title: "What most doctors get wrong",
        content: (
          <div className="space-y-4">
            <p><strong>Grinding through burnout and thinking it does not show.</strong></p>
            <p>The most dangerous lie a practice owner tells themselves is: "I can push through it. The patients will not notice." They always notice. Maybe not consciously. But their nervous system picks up every signal yours is sending.</p>
            <p>Here is what "pushing through" actually looks like from the patient's perspective:</p>
            <p><strong>The doctor who is running behind:</strong> They walk in already thinking about the next patient. They rush the check-in. They skip the post-adjustment frame. The patient feels like a number, not a person. The patient does not come back.</p>
            <p><strong>The doctor who is burned out:</strong> Their energy is flat. Their voice has no conviction. They say the right words but the music is wrong. The patient hears "you need care" but feels "this person does not care." The patient cancels.</p>
            <p><strong>The doctor who is stressed about money:</strong> They unconsciously push harder during the financial conversation. They oversell. They get attached to the outcome. The patient senses desperation and pulls away. The doctor loses the case and the stress gets worse. The cycle repeats.</p>
            <p><strong>You cannot outwork a state problem.</strong> You can only out-regulate it.</p>
          </div>
        )
      },
      {
        label: "04 Hidden Breakdowns",
        icon: "Zap",
        title: "How stress leaks into body language, voice, and patience",
        content: (
          <div className="space-y-4">
            <p><strong>Stress does not announce itself. It leaks.</strong> Here are the specific ways it shows up in your practice — often without you realizing it:</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Speaking Faster When Behind Schedule</h5>
              <p className="text-sm text-brand-gray">When you are running 15 minutes late, your speaking pace increases by 20-30% without you noticing. The patient hears urgency, not authority. They feel like they are an inconvenience, not a priority. Your ROF script that normally takes 10 minutes gets compressed to 7, and those 3 missing minutes contained the emotional bridge that makes patients say yes.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Shorter Explanations When Tired</h5>
              <p className="text-sm text-brand-gray">By 3 PM, your Day 2 ROF is half the length it was at 9 AM. You skip the analogy. You condense the findings. You rush the recommendation. The afternoon patient gets 60% of the experience the morning patient got — and you wonder why your afternoon case acceptance is lower than your morning numbers.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Irritability with Staff That Patients Can Sense</h5>
              <p className="text-sm text-brand-gray">You snap at your CA about a scheduling mistake. You sigh audibly when a patient's file is not ready. You roll your eyes at a question from a team member. The patient in the next room heard that. Or they saw your face when you walked in — still carrying the frustration from the hallway. They do not know what happened, but they know something is wrong. Their trust drops by 20% before you say a word.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Checking Phone Between Patients</h5>
              <p className="text-sm text-brand-gray">You glance at your phone between patients. A text from your accountant. An email about a vendor invoice. A notification about your kid's school. Each one pulls your attention out of clinical mode and into CEO mode or parent mode. You walk into the next patient carrying cognitive residue from a problem that has nothing to do with their spine. Your presence is fractured, and they feel it.</p>
            </div>
          </div>
        )
      },
      {
        label: "05 The Blueprint",
        icon: "Scale",
        title: "The Doctor Operating System — Your Daily Protocol",
        content: (
          <div className="space-y-6">
            <p><strong>This is your operating system. Four protocols, four moments in the day, non-negotiable.</strong></p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">1. Morning Protocol (Before You See Anyone)</h5>
              <p className="text-sm text-brand-gray">15 minutes before first patient. This sets your state for the entire day. Details in the next section.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">2. Pre-Patient Ritual (2 Minutes Before Each Patient)</h5>
              <p className="text-sm text-brand-gray">A 120-second reset between patients that clears the last interaction and prepares you for the next. Details in the dedicated section below.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">3. Mid-Day Reset (Between Morning and Afternoon)</h5>
              <p className="text-sm text-brand-gray mb-2">A 10-minute break between your morning and afternoon blocks. This is not optional. This is not "eat lunch at your desk while reviewing charts." This is a deliberate state reset.</p>
              <p className="text-sm text-brand-gray">Leave the clinical area. Go outside if possible. Eat something. Do not look at your phone. Do not talk about patients. Let your nervous system come down from the morning. Then, before your first afternoon patient, repeat a shortened version of the Morning Protocol: 3 deep breaths, review the afternoon schedule, set your intention.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">4. End-of-Day Debrief (5 Minutes Before Leaving)</h5>
              <p className="text-sm text-brand-gray mb-2">Before you leave the office, sit in your chair for 5 minutes. Answer three questions:</p>
              <p className="text-sm text-brand-gray">1. What went well today? (Name one specific patient interaction.)</p>
              <p className="text-sm text-brand-gray">2. Where did I lose my state? (Name the moment your regulation broke.)</p>
              <p className="text-sm text-brand-gray">3. What will I do differently tomorrow?</p>
              <p className="text-sm text-brand-gray mt-2">Then close the office mentally. What happens at the office stays at the office. Drive home as a spouse, parent, or human — not as a doctor reviewing cases in your head.</p>
            </div>
          </div>
        )
      },
      {
        label: "06 Morning Protocol",
        icon: "Sparkles",
        title: "The Morning Protocol — detailed routine",
        content: (
          <div className="space-y-4">
            <p><strong>Arrive 15 minutes before your first patient. Not 5. Fifteen.</strong> Those 15 minutes are the foundation of your entire day. Here is exactly what you do:</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Minute 1-3: Review the Day's Schedule</h5>
              <p className="text-sm text-brand-gray">Open your schedule and scan it. Who are your new patients today? Who is coming in for a re-exam? Who has been struggling with compliance? Who was emotional at their last visit? Flag the patients who need extra attention. Know their names before they walk in. Know their story before you open their chart.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Minute 4-6: Three Deep Breaths at Your Desk</h5>
              <p className="text-sm text-brand-gray">Sit in your chair. Feet flat on the floor. Close your eyes. Take three deep breaths — 4 seconds in through the nose, hold for 4 seconds, 6 seconds out through the mouth. This activates the parasympathetic nervous system. It drops your heart rate. It calms the prefrontal cortex. You are not meditating. You are calibrating your instrument.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Minute 7-9: Read Your Identity Statement</h5>
              <p className="text-sm text-brand-gray">Read one affirmation from your identity statement (see the dedicated section below). Read it out loud if you are alone. Read it silently if others are around. Let the words land. You are not just reading words — you are reminding yourself who you are before the day tries to tell you otherwise.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Minute 10-15: Walk the Office</h5>
              <p className="text-sm text-brand-gray">Get up and walk through every room your patients will see today. Is the waiting area clean? Is the ROF room set up? Are the adjustment tables clean? Is the bathroom stocked? Is anything out of place? This is not micromanagement — this is environmental control. You are the pilot doing a pre-flight check. By the time you walk back to your chair, you own the space. Nothing will surprise you. You are ready.</p>
            </div>
          </div>
        )
      },
      {
        label: "07 Pre-Patient Ritual",
        icon: "Activity",
        title: "The Pre-Patient Ritual — 2 minutes before each patient",
        content: (
          <div className="space-y-4">
            <p><strong>Every patient deserves a version of you that is fully present.</strong> That does not happen by accident. It happens because you take 120 seconds between patients to reset. Here is the protocol:</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 1: Close the Last Patient (Mentally and Physically)</h5>
              <p className="text-sm text-brand-gray">Close their chart. Put down their file. If the last patient was difficult, frustrated, or emotional, take 3 seconds to acknowledge it internally: "That was hard." Then let it go. You cannot carry the weight of one patient into the room of the next one. Close the chapter. Start a new one.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 2: One Deep Breath</h5>
              <p className="text-sm text-brand-gray">One breath. Four seconds in, six seconds out. That is all it takes to shift your physiology from the last interaction to the next one. Do it before you open the next chart.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 3: Read Patient Name and Last Note</h5>
              <p className="text-sm text-brand-gray">Open the chart. Read their name. Read the last note. What did you talk about? What were they feeling? What were you looking for? This takes 30 seconds and it transforms the interaction. When you walk in and say "Mrs. Johnson, last time we talked about your sleep — how has that been?" you just told her nervous system "you matter to me. I remember you. You are not a number."</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 4: Set Your Intention</h5>
              <p className="text-sm text-brand-gray">Ask yourself one question: "What does this person need from me right now?" Not what adjustment they need — what do they need from you as a human being? Do they need reassurance? Do they need directness? Do they need patience? Do they need to be challenged? Set the intention. Then walk in with purpose, not urgency.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Step 5: Walk in with Purpose, Not Urgency</h5>
              <p className="text-sm text-brand-gray">Do not rush into the room. Do not open the door while still looking at your phone. Do not walk in mid-conversation with a staff member. Open the door. Make eye contact. Smile. Say their name. You just entered their world. Be fully in it.</p>
            </div>
          </div>
        )
      },
      {
        label: "08 Recovery",
        icon: "RefreshCw",
        title: "How to recover from a bad patient interaction",
        content: (
          <div className="space-y-4">
            <p><strong>Bad interactions happen.</strong> A patient gets angry. Someone cancels their care plan. A new patient says no after a strong ROF. A patient accuses you of making them worse. These moments are inevitable. What is not inevitable is letting one bad interaction ruin the next 5 patients.</p>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The 90-Second Reset Between Patients</h5>
              <p className="text-sm text-brand-gray mb-2">When a bad interaction just happened, extend your Pre-Patient Ritual from 2 minutes to 3. The extra 60 seconds is for processing:</p>
              <p className="text-sm text-brand-gray">1. <strong>Name it.</strong> Say to yourself (silently): "That interaction was frustrating" or "That patient's anger triggered me" or "I am disappointed that I lost that case." Naming the emotion reduces its power.</p>
              <p className="text-sm text-brand-gray">2. <strong>Feel it for 10 seconds.</strong> Do not stuff it. Let the frustration, disappointment, or anger be present in your body for 10 seconds. Then consciously release it with an exhale.</p>
              <p className="text-sm text-brand-gray">3. <strong>Redirect.</strong> Ask yourself: "The next patient has nothing to do with what just happened. What do they need from me?" Answer the question. Then walk in.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Script for When You Are Running Late</h5>
              <p className="text-sm text-brand-gray italic">"Mr. Davis, I apologize for the wait. I was with another patient who needed extra time, and I did not want to rush their care — just like I would never rush yours. I am fully here now. Let us get started."</p>
              <p className="text-sm text-brand-gray mt-2">Do not over-apologize. Do not explain what happened with the other patient. One sentence of acknowledgment, one sentence of reassurance, then move forward. The patient does not want a long apology — they want to feel like they now have your full attention.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">How to Prevent One Bad Interaction from Ruining the Whole Day</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>Rule 1:</strong> Do not debrief a bad interaction during patient hours. If you need to talk about it, write one sentence in your phone and deal with it during the End-of-Day Debrief. Do not process it in real-time — it will contaminate every interaction that follows.</p>
              <p className="text-sm text-brand-gray mb-2"><strong>Rule 2:</strong> Do not tell your staff about it between patients. When you tell the story, you re-live the emotion. Now your CA is upset too, and the next patient walks into an office full of stressed people.</p>
              <p className="text-sm text-brand-gray"><strong>Rule 3:</strong> Use the Mid-Day Reset as your firewall. Whatever happened in the morning stays in the morning. The afternoon is a new day. Reset, re-breathe, re-calibrate.</p>
            </div>
          </div>
        )
      },
      {
        label: "09 Stress Management",
        icon: "ShieldCheck",
        title: "Stress management for practice owners and the identity statement",
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">Separating "Owner Stress" from "Doctor Stress"</h5>
              <p className="text-sm text-brand-gray mb-2">You have two jobs. You are a doctor and you are a business owner. The mistake is blending them. When you are worried about payroll while adjusting a patient, neither role gets your best. When you are thinking about a difficult patient case while reviewing your P&L, you cannot make clear business decisions.</p>
              <p className="text-sm text-brand-gray"><strong>The rule:</strong> During patient hours, you are a doctor. Only a doctor. Business problems exist, but they wait. After patient hours, you are a CEO. Patient problems exist, but they wait. Compartmentalization is not avoidance — it is discipline.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">When to Make Business Decisions</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>Never during patient hours.</strong> Never between patients. Never while eating lunch at your desk. Business decisions require a calm, analytical mind — not a mind that just processed 8 nervous systems in a row.</p>
              <p className="text-sm text-brand-gray">Schedule a specific block for business decisions. Do not let them leak into clinical time. If a staff issue comes up during patient hours, your response is: "We will address this at 5:30. Right now, I am seeing patients." That is it.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Friday CEO Hour</h5>
              <p className="text-sm text-brand-gray mb-2">Block one hour every Friday for CEO work. Not clinical work. Not patient reviews. Business. During this hour, you review numbers, make hiring decisions, evaluate marketing, plan the next month, and address any business issues that accumulated during the week.</p>
              <p className="text-sm text-brand-gray">This hour gives you permission to ignore business problems Monday through Thursday. When a business worry pops into your head during patient hours, you say to yourself: "That is a Friday problem." Write it down, put it away, and go back to doctoring.</p>
            </div>
            <div className="p-4 bg-brand-navy/5 rounded-xl border-l-4 border-brand-orange">
              <h5 className="font-black text-brand-navy text-sm uppercase mb-2">The Identity Statement Exercise</h5>
              <p className="text-sm text-brand-gray mb-2"><strong>Write 3 sentences about who you are as a doctor. Read them daily.</strong> This is your anchor. When the day gets hard, when a patient says no, when your staff frustrates you, when the numbers are down — your identity statement reminds you who you are underneath all of it.</p>
              <p className="text-sm text-brand-gray mb-2"><strong>How to write it:</strong> Complete these three prompts:</p>
              <p className="text-sm text-brand-gray">1. "I am a doctor who..." (describe how you show up clinically)</p>
              <p className="text-sm text-brand-gray">2. "My patients experience..." (describe what patients feel in your care)</p>
              <p className="text-sm text-brand-gray">3. "I am building a practice that..." (describe the legacy you are creating)</p>
              <p className="text-sm text-brand-gray mt-2"><strong>Example:</strong></p>
              <p className="text-sm text-brand-gray italic">"I am a doctor who moves with calm authority and never rushes the process. My patients experience clarity, safety, and genuine care every single visit. I am building a practice that transforms lives and runs without me having to sacrifice my own health to do it."</p>
              <p className="text-sm text-brand-gray mt-2">Print this. Tape it to your desk. Read it every morning during the Morning Protocol. Read it again when the day gets hard. These are not just words — they are your operating instructions.</p>
            </div>
          </div>
        )
      },
      {
        label: "10 Mastery + Action",
        icon: "CheckCircle2",
        title: "Mastery indicators and action checklist",
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-black text-brand-navy mb-3">Mastery Indicators</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong>Level 1:</strong> You arrive 15 minutes before your first patient and complete the Morning Protocol every day for 30 consecutive days. The Pre-Patient Ritual is happening between every patient, not just the ones you remember.</p>
                <p className="text-sm"><strong>Level 2:</strong> Your afternoon case acceptance is within 5% of your morning case acceptance. Your energy, presence, and delivery are consistent from 9 AM to 5 PM. The Mid-Day Reset is working.</p>
                <p className="text-sm"><strong>Level 3:</strong> When a bad interaction happens, you recover within 90 seconds and the next patient never knows. You have stopped carrying emotional residue from one patient to the next. Your team comments that you seem calmer.</p>
                <p className="text-sm"><strong>Level 4:</strong> You have fully separated doctor stress from owner stress. Business decisions happen on Friday. Clinical decisions happen in real-time. You no longer think about payroll while adjusting a patient. Your identity statement is memorized and you live it without reading it. People describe your office as "calm" and your presence as "grounding."</p>
              </div>
            </div>
            <div>
              <h4 className="font-black text-brand-navy mb-3">Action Checklist</h4>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Write your 3-sentence identity statement today — print it and tape it to your desk</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Set your alarm 15 minutes earlier tomorrow and complete the Morning Protocol</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Practice the Pre-Patient Ritual between your next 5 patients — all 5 steps</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Block a 10-minute Mid-Day Reset on your schedule — protect it from being overbooked</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Practice the 90-second bad interaction reset the next time something goes wrong</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Memorize the "running late" script and use it the next time you fall behind</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Block 1 hour on Friday as your CEO Hour — label it on your calendar and protect it</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Put your phone in a drawer during patient hours starting tomorrow</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Do the End-of-Day Debrief (3 questions) for 5 consecutive days this week</li>
                <li className="flex gap-3 text-sm font-bold text-brand-navy">&#9744; Compare your morning vs afternoon case acceptance for the next 2 weeks — track the gap</li>
              </ul>
            </div>
          </div>
        )
      }
    ]
  }
];
