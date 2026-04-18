import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { fetchWorksheet } from "@/app/actions/worksheet-actions";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import WorksheetClient from "./WorksheetClient";

const weekWorksheets: Record<string, { type: string; title: string; intro: string; questions: { id: string; label: string; hint: string; placeholder: string }[] }> = {
  "week-1-identity": {
    type: "identity-week-1",
    title: "Identity Worksheet",
    intro: "Before you learn scripts or systems, you need to get clear on who you are as a doctor. Take 15 minutes. Be honest. There are no wrong answers.",
    questions: [
      { id: "who_are_you", label: "Who are you as a doctor?", hint: "Not your credentials — your identity. How do you want to be known?", placeholder: "I am a doctor who..." },
      { id: "what_patients_feel", label: "What do you want patients to feel when they meet you?", hint: "Think about the first 30 seconds. Before you say a word — what energy do you bring?", placeholder: "I want them to feel..." },
      { id: "identity_gap", label: "What's the gap between who you are now and who you want to be?", hint: "Be honest. Where do you feel uncertain or like you're performing instead of leading?", placeholder: "The gap I see is..." },
      { id: "biggest_insecurity", label: "What's your biggest insecurity in practice right now?", hint: "The thing you avoid thinking about. The situation that makes you uncomfortable.", placeholder: "I feel most uncertain when..." },
      { id: "when_confident", label: "When do you feel most confident as a doctor?", hint: "Think of a specific moment — what made it different?", placeholder: "I feel most confident when..." },
      { id: "one_change", label: "If you could change one thing about how you show up in practice, what would it be?", hint: "Not your technique — how YOU show up. Your energy, your certainty, your presence.", placeholder: "I would change..." },
      { id: "week8_vision", label: "8 weeks from now, what does the new version of you look like?", hint: "Be specific. How do you walk into the room? How do you present a care plan?", placeholder: "In 8 weeks, I will..." },
    ],
  },
  "week-2-neurology": {
    type: "neurology-week-2",
    title: "Patient Explanation Drill",
    intro: "This week is about explaining neurology in a way patients actually understand. Practice translating clinical concepts into simple language.",
    questions: [
      { id: "subluxation_explain", label: "How would you explain subluxation to a patient in 2 sentences?", hint: "No jargon. Imagine you're talking to your neighbor.", placeholder: "A subluxation is when..." },
      { id: "nervous_system_explain", label: "How would you explain why the nervous system matters to a new patient?", hint: "Connect it to something they care about — their daily life, not anatomy.", placeholder: "Your nervous system..." },
      { id: "scan_explain", label: "Write out how you'd explain a scan result without using medical terms.", hint: "Point to something on the scan and make it meaningful to their life.", placeholder: "What this scan shows us is..." },
      { id: "hrv_explain", label: "How would you explain HRV to a patient in plain language?", hint: "They don't need to know the science. They need to know what it means for them.", placeholder: "HRV tells us..." },
      { id: "worst_explanation", label: "What's one thing you currently over-explain to patients?", hint: "The thing where their eyes glaze over. Be honest.", placeholder: "I tend to over-explain..." },
      { id: "simple_version", label: "Rewrite that explanation in 1-2 simple sentences.", hint: "Less is more. If a 12-year-old can understand it, you've got it.", placeholder: "The simple version is..." },
    ],
  },
  "week-3-communication": {
    type: "communication-week-3",
    title: "Script Practice Sheet",
    intro: "Communication mastery comes from practice, not theory. Write out your versions of these key scripts so they feel natural in your voice.",
    questions: [
      { id: "rof_opening", label: "Write your opening line for a Report of Findings.", hint: "The first thing you say when you sit down with a patient on Day 2. Set the frame.", placeholder: "Thank you for coming back. Today..." },
      { id: "recommendation_script", label: "Write how you'd recommend a care plan to a patient.", hint: "Be direct. One recommendation. No menu of options.", placeholder: "Based on what I found..." },
      { id: "money_script", label: "Write how you'd present the financial commitment.", hint: "State the number with confidence. No apology. No 'unfortunately.'", placeholder: "The investment for your care plan is..." },
      { id: "think_about_it", label: "Write your response to 'I need to think about it.'", hint: "Don't panic. Validate, then reframe.", placeholder: "I understand. Can I ask what specifically..." },
      { id: "too_expensive", label: "Write your response to 'That's too expensive.'", hint: "Don't drop the price. Reframe the value.", placeholder: "I hear you. Let me ask you this..." },
      { id: "biggest_comm_fear", label: "What conversation in practice do you dread most?", hint: "Name it. The one that makes your stomach tighten.", placeholder: "I dread when a patient says..." },
      { id: "new_response", label: "Write a new response for that dreaded conversation.", hint: "Use the Pause → Validate → Reframe → Redirect framework.", placeholder: "My new response would be..." },
    ],
  },
  "week-4-philosophy": {
    type: "philosophy-week-4",
    title: "Philosophy Builder",
    intro: "Your philosophy drives every recommendation you make. If it's weak, your recommendations will be weak. Build a philosophy that's modern, powerful, and yours.",
    questions: [
      { id: "why_chiro", label: "Why did you become a chiropractor? (The real reason, not the résumé answer.)", hint: "Dig deeper than 'to help people.' What moment made you choose this?", placeholder: "I became a chiropractor because..." },
      { id: "what_chiro_is", label: "In 2 sentences, what IS chiropractic to you?", hint: "Not the textbook definition. YOUR definition that you'd say to a patient.", placeholder: "Chiropractic is..." },
      { id: "subluxation_modern", label: "How do you explain subluxation in a way that sounds modern and credible?", hint: "Bridge the science and the philosophy without sounding outdated.", placeholder: "The way I explain it is..." },
      { id: "vs_medical", label: "A patient asks: 'How is this different from going to a regular doctor?'", hint: "Don't bash medicine. Elevate what you do.", placeholder: "Great question. The difference is..." },
      { id: "lifetime_care", label: "Why should someone see a chiropractor for life, not just when they hurt?", hint: "This answer determines your retention. Make it compelling.", placeholder: "The reason is..." },
      { id: "elevator_pitch", label: "Write your 30-second elevator pitch for chiropractic.", hint: "If someone at a party asks what you do, what do you say?", placeholder: "I help people..." },
    ],
  },
  "week-5-business": {
    type: "business-week-5",
    title: "Practice Numbers Audit",
    intro: "You can't grow what you don't measure. This worksheet forces you to look at your real numbers — no guessing, no avoiding.",
    questions: [
      { id: "monthly_overhead", label: "What is your total monthly overhead? (rent, staff, supplies, everything)", hint: "If you don't know the exact number, estimate and then go find the real one this week.", placeholder: "$..." },
      { id: "break_even", label: "How many patients per week do you need to break even?", hint: "Divide your monthly overhead by your average collection per visit, then by 4.", placeholder: "I need approximately..." },
      { id: "avg_collection", label: "What is your average collection per visit?", hint: "Total collections last month ÷ total visits last month.", placeholder: "$..." },
      { id: "case_value", label: "What is your average case value (total revenue per new patient)?", hint: "Total revenue from new patients started last quarter ÷ number of new patients.", placeholder: "$..." },
      { id: "biggest_leak", label: "Where is money leaving your practice right now?", hint: "Uncollected fees? Low case acceptance? Patients dropping off? Name it.", placeholder: "The biggest leak is..." },
      { id: "revenue_goal", label: "What monthly revenue do you want to hit in 90 days?", hint: "Be specific. Not 'more money' — an actual number.", placeholder: "$..." },
      { id: "one_action", label: "What's the ONE thing you could change this week to move toward that number?", hint: "Not five things. One thing you'll actually do.", placeholder: "This week I will..." },
    ],
  },
  "week-6-care-plans": {
    type: "careplan-week-6",
    title: "Day 1 / Day 2 Role-Play Sheet",
    intro: "You've learned the frameworks. Now practice them. Write out your scripts for each stage of the patient experience.",
    questions: [
      { id: "day1_opening", label: "Write your Day 1 orientation script (first 2 minutes).", hint: "Tell them exactly what's happening today. Predictability kills anxiety.", placeholder: "Welcome, Mrs. Johnson. Here's what we're going to do today..." },
      { id: "day1_listening", label: "Write 3 questions you'll ask during the listening phase.", hint: "Open-ended questions that uncover what they really want, not just where it hurts.", placeholder: "1. What brought you in today?\n2. ...\n3. ..." },
      { id: "day1_close", label: "Write your Day 1 closing statement (the gap).", hint: "This is what creates urgency for Day 2. Leave them wanting the answer.", placeholder: "I have everything I need. I'm going to analyze this tonight..." },
      { id: "day2_opening", label: "Write your Day 2 ROF opening (first 60 seconds).", hint: "Set the frame for the entire conversation.", placeholder: "Thank you for coming back. I spent time reviewing your case..." },
      { id: "day2_recommendation", label: "Write how you present your recommendation.", hint: "One option. Biologically justified. No menu.", placeholder: "Based on what I found, here's what I recommend..." },
      { id: "day2_financial", label: "Write your financial presentation script.", hint: "State the number. Offer the payment plan. Stop talking.", placeholder: "The investment for your care is..." },
    ],
  },
  "week-7-patient-management": {
    type: "retention-week-7",
    title: "Retention System Builder",
    intro: "Retention isn't about convincing patients to stay. It's about building systems that make staying the obvious choice.",
    questions: [
      { id: "dropout_point", label: "Where do most of your patients drop off? (visit number or timeframe)", hint: "Look at your data. Is it visit 4? Visit 12? After they feel better?", placeholder: "Most patients drop off at..." },
      { id: "why_dropout", label: "Why do you think they leave at that point?", hint: "Be honest. Is it your systems, your communication, or something else?", placeholder: "I think they leave because..." },
      { id: "feel_better_script", label: "Write your response for when a patient says 'I feel better, do I still need to come?'", hint: "This is THE most important retention script. Don't wing it.", placeholder: "That's great news. Here's what that means..." },
      { id: "reexam_script", label: "Write your re-exam script for visit 12.", hint: "Show progress, celebrate wins, recommit to the plan.", placeholder: "Let's look at where you started versus where you are now..." },
      { id: "noshow_protocol", label: "What happens when a patient no-shows? (Your exact protocol)", hint: "If you don't have one, write one now. Who calls? When? What do they say?", placeholder: "Within 24 hours, we..." },
      { id: "wellness_transition", label: "Write how you transition a patient from corrective care to wellness.", hint: "This is where lifetime patients are made. Make it compelling.", placeholder: "You've done the hard work. Now the question is..." },
    ],
  },
  "week-8-ownership": {
    type: "ownership-week-8",
    title: "10-Year Vision & Action Plan",
    intro: "This is the final worksheet. Look back at where you started, see how far you've come, and map out what's next.",
    questions: [
      { id: "biggest_shift", label: "What's the biggest shift in how you practice since Week 1?", hint: "Not just what you learned — how you've changed. How you show up differently.", placeholder: "The biggest shift is..." },
      { id: "identity_now", label: "Go back to your Week 1 Identity Worksheet. How would you answer those questions now?", hint: "Compare who you were 8 weeks ago to who you are today.", placeholder: "Now I would say..." },
      { id: "kpi_progress", label: "Compare your Week 1 KPIs to your Week 8 KPIs. What changed?", hint: "Pull your numbers. Let the data tell the story.", placeholder: "My numbers went from... to..." },
      { id: "ten_year_vision", label: "Where do you want to be in 10 years? (Practice, income, lifestyle, impact)", hint: "Think big. Be specific. What does your life look like?", placeholder: "In 10 years, I..." },
      { id: "one_year_goal", label: "What's the one goal that, if you hit it in the next 12 months, changes everything?", hint: "Revenue target? New location? Associate hire? Pick one.", placeholder: "My one goal is..." },
      { id: "first_step", label: "What's the very first step you're taking this week toward that goal?", hint: "Not a plan. A step. Something you do before Friday.", placeholder: "This week I will..." },
      { id: "message_to_self", label: "Write a message to yourself to read in 12 months.", hint: "Future you needs to hear this. Be real.", placeholder: "Dear future me..." },
    ],
  },
};

export default async function DynamicWorksheetPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const worksheetConfig = weekWorksheets[slug];
  if (!worksheetConfig) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const result = await fetchWorksheet(worksheetConfig.type);
  const responses = result.data?.responses || null;
  const firstName = profile?.full_name?.split(" ").pop() || "Doctor";

  return (
    <DashboardLayout>
      <WorksheetClient
        initialData={responses}
        userName={firstName}
        weekSlug={slug}
        worksheetType={worksheetConfig.type}
        title={worksheetConfig.title}
        intro={worksheetConfig.intro}
        questions={worksheetConfig.questions}
      />
    </DashboardLayout>
  );
}
