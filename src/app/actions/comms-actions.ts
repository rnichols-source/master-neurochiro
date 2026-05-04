'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { checkAdmin } from '@/app/actions/agent-actions'
import { EmailService } from '@/lib/emails'
import { revalidatePath } from 'next/cache'

/**
 * Get all paid mastermind members (only people we should email).
 */
async function getPaidMembers(adminClient: any) {
  const { data: paidApps } = await adminClient
    .from('applications')
    .select('email')
    .eq('status', 'paid')
  const paidEmails = new Set((paidApps || []).map((a: any) => a.email?.toLowerCase()))

  const { data: profiles } = await adminClient
    .from('profiles')
    .select('id, email, full_name, tier')
    .in('tier', ['standard', 'pro'])

  return (profiles || []).filter((p: any) => p.email && paidEmails.has(p.email.toLowerCase()))
}

/**
 * Send an announcement email to all paid members.
 */
export async function sendAnnouncementToMembers(title: string, body: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()
    const members = await getPaidMembers(adminClient)

    if (members.length === 0) return { success: true, message: 'No paid members to email' }

    let sentCount = 0
    for (const member of members) {
      await EmailService.sendAnnouncement(member.email, member.full_name || 'Doctor', title, body)
      sentCount++
    }

    revalidatePath('/admin/comms')
    return { success: true, message: `Sent to ${sentCount} member${sentCount !== 1 ? 's' : ''}` }
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}

/**
 * Send a call reminder to all paid members.
 */
export async function sendCallReminder(callDate: string, callTime: string, zoomLink: string, weekTopic: string, prepInstructions: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()
    const members = await getPaidMembers(adminClient)

    if (members.length === 0) return { success: true, message: 'No paid members' }

    const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://neurochiromastermind.com'
    let sentCount = 0

    for (const member of members) {
      const firstName = member.full_name?.split(' ')[0] || 'Doctor'
      const html = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #ffffff; background-color: #0A192F; border-radius: 12px;">
          <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; font-weight: 800; color: #E67E22; margin-bottom: 20px;">Call Reminder</p>
          <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 30px;">Your Coaching Call Is Coming Up</h1>
          <div style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 30px;">
            <p>Hey Dr. ${firstName},</p>
            <p>Your Mastermind coaching call is <strong>${callDate} at ${callTime} ET</strong>.</p>
          </div>
          <div style="background: rgba(230,126,34,0.1); border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <p style="font-size: 14px; font-weight: 800; color: #E67E22; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">This Week's Topic</p>
            <p style="font-size: 18px; font-weight: 900; color: #ffffff; margin-bottom: 12px;">${weekTopic}</p>
            <p style="font-size: 14px; font-weight: 800; color: #E67E22; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">How to Prepare</p>
            <p style="font-size: 16px; color: rgba(255,255,255,0.85); line-height: 1.8;">${prepInstructions.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-bottom: 40px;">
            <a href="${zoomLink}" style="background-color: #E67E22; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Join Zoom Call</a>
          </div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.5);">
            <p>Can't make it? Every call is recorded and uploaded to your <a href="${SITE}/portal" style="color: #E67E22;">portal</a> within 24 hours.</p>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
          <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">NeuroChiro Global Mastermind</p>
        </div>
      `
      await EmailService.send(member.email, `${weekTopic} — ${callDate} at ${callTime} ET`, html, 'call_reminder_manual')
      sentCount++
    }

    revalidatePath('/admin/comms')
    return { success: true, message: `Reminder sent to ${sentCount} member${sentCount !== 1 ? 's' : ''}` }
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}

/**
 * Send a KPI submission reminder to all paid members.
 */
export async function sendKPIReminder() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()
    const members = await getPaidMembers(adminClient)

    if (members.length === 0) return { success: true, message: 'No paid members' }

    const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://neurochiromastermind.com'
    let sentCount = 0

    for (const member of members) {
      const firstName = member.full_name?.split(' ')[0] || 'Doctor'
      const html = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #ffffff; background-color: #0A192F; border-radius: 12px;">
          <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; font-weight: 800; color: #E67E22; margin-bottom: 20px;">Weekly KPIs</p>
          <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 30px;">Time to Submit Your Numbers</h1>
          <div style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 40px;">
            <p>Hey Dr. ${firstName},</p>
            <p>End of the week — time to log your KPIs. Takes 2 minutes.</p>
            <p><strong>What gets measured gets managed.</strong></p>
            <p>Your numbers this week tell the story of your growth. Don't skip it.</p>
          </div>
          <div style="margin-bottom: 40px;">
            <a href="${SITE}/portal/kpi" style="background-color: #E67E22; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Submit KPIs Now</a>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
          <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">NeuroChiro Global Mastermind</p>
        </div>
      `
      await EmailService.send(member.email, 'Submit Your Weekly KPIs', html, 'kpi_reminder_manual')
      sentCount++
    }

    revalidatePath('/admin/comms')
    return { success: true, message: `KPI reminder sent to ${sentCount} member${sentCount !== 1 ? 's' : ''}` }
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}

/**
 * Send a weekly recap email to all paid members.
 */
export async function sendWeeklyRecap(weekNumber: number, topicsCovered: string, homework: string, nextCallDate: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()
    const members = await getPaidMembers(adminClient)

    if (members.length === 0) return { success: true, message: 'No paid members' }

    const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://neurochiromastermind.com'
    let sentCount = 0

    for (const member of members) {
      const firstName = member.full_name?.split(' ')[0] || 'Doctor'
      const html = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #ffffff; background-color: #0A192F; border-radius: 12px;">
          <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; font-weight: 800; color: #E67E22; margin-bottom: 20px;">Week ${weekNumber} Recap</p>
          <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 30px;">Here's What We Covered</h1>
          <div style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 30px;">
            <p>Hey Dr. ${firstName},</p>
            <p>Great call this week. Here's your recap:</p>
            <p><strong>Topics Covered:</strong></p>
            <p>${topicsCovered.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="background: rgba(230,126,34,0.1); border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <p style="font-size: 14px; font-weight: 800; color: #E67E22; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">This Week's Homework</p>
            <p style="font-size: 16px; color: rgba(255,255,255,0.85); line-height: 1.8;">${homework.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="font-size: 16px; color: rgba(255,255,255,0.85); margin-bottom: 40px;">
            <p><strong>Next Call:</strong> ${nextCallDate}</p>
            <p>Come ready with your homework done and your KPIs submitted.</p>
          </div>
          <div style="margin-bottom: 40px;">
            <a href="${SITE}/portal/curriculum" style="background-color: #E67E22; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Go to Your Portal</a>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
          <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">NeuroChiro Global Mastermind</p>
        </div>
      `
      await EmailService.send(member.email, `Week ${weekNumber} Recap — Here's What We Covered`, html, `weekly_recap_w${weekNumber}`)
      sentCount++
    }

    revalidatePath('/admin/comms')
    return { success: true, message: `Recap sent to ${sentCount} member${sentCount !== 1 ? 's' : ''}` }
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}

/**
 * Post a discussion prompt to the community as admin.
 */
export async function postCommunityPrompt(content: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, message: 'Not authenticated' }

    const adminClient = createAdminClient()
    const { error } = await adminClient
      .from('community_posts')
      .insert({ user_id: user.id, content: content.trim() })

    if (error) return { success: false, message: error.message }
    revalidatePath('/portal/community')
    revalidatePath('/admin/comms')
    return { success: true, message: 'Posted!' }
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}

/**
 * Get a scheduled community prompt based on the day of the week.
 * Returns a pre-written engagement prompt.
 */
export async function getScheduledPrompt() {
  const day = new Date().getDay() // 0=Sun, 1=Mon, etc.

  // Prompts are deeply tied to the NeuroChiro Mastermind curriculum:
  // - Identity as a nervous system chiropractor
  // - Day 1 consultation & Day 2 ROF system
  // - Care plan presentation & acceptance
  // - Objection handling scripts
  // - KPI tracking (collections, NP, PVA, case acceptance)
  // - Patient communication & trust building
  // - The "certainty" transformation
  // - Learn. Build. Prove. framework

  const prompts: Record<number, string[]> = {
    1: [ // Monday — Identity & Intention
      "🧠 Monday Identity Check.\n\nIf a patient walked in RIGHT NOW and asked 'What kind of chiropractor are you?' — what would you say?\n\nWrite your 30-second identity statement below. Not what you think it should be — what you'd ACTUALLY say today.\n\nThis is where everything starts. Identity first. Certainty follows.",
      "New week. One intention.\n\nWhat's the ONE thing from the Mastermind that you're going to implement this week? Not three things. ONE.\n\nA Day 1 script change? A new way you present findings? Actually tracking your PVA?\n\nDrop it below. We'll check back Friday.",
      "Question: When you walk into your office Monday morning — do you feel certain about who you are as a doctor? Or are you still figuring it out?\n\nNo judgment. But the patients feel it either way.\n\nWhat would need to change for you to walk in with complete certainty? Let's talk about it.",
    ],
    2: [ // Tuesday — Clinical Communication & Day 1/Day 2
      "Let's sharpen your Day 1.\n\nWhat's the FIRST thing you say after the patient sits down for their consultation? Not the history intake — the very first words.\n\nDrop your opening line below. Let's compare and refine.\n\nRemember: the first 2 minutes determine whether they trust you enough to come back for Day 2.",
      "Role play 🎯\n\nYour patient is sitting across from you at the ROF. You've shown them their scans and explained the findings. Now it's time to present the care plan.\n\nA patient says: 'That sounds like a lot of visits. Do I really need to come that often?'\n\nWhat do you say? Drop your response. Let's coach each other.\n\nHint: If you're defending the number of visits, you've already lost. Reframe around the nervous system.",
      "How do you explain what a nervous system chiropractor does — to someone who's never been to a chiropractor?\n\nNo jargon. No 'subluxation.' No 'interference.' Plain language that makes them lean in.\n\nDrop your explanation below. Keep it under 3 sentences.\n\nThis is the skill that separates a busy practice from a struggling one.",
    ],
    3: [ // Wednesday — Wins & Implementation
      "🏆 WIN WEDNESDAY\n\nShare ONE moment from your practice this week where you felt CERTAIN.\n\nMaybe a patient said yes without hesitation. Maybe you nailed your ROF. Maybe you tracked your KPIs for the first time and saw a number go up.\n\nBig or small — if it felt different than before the Mastermind, it counts.\n\nLet's celebrate the identity shifts happening in this group.",
      "Implementation check ✅\n\nLast call, we worked on [insert topic]. Did you implement it this week?\n\n- If YES: What happened? How did patients respond?\n- If NO: What got in the way? Let's troubleshoot.\n\nThe Mastermind only works if you do the work. Learn. Build. Prove.\n\nWe're in the BUILD phase. Show us what you're building.",
      "Honest question: Has your CONFIDENCE presenting care plans changed since you joined the Mastermind?\n\nI'm not asking about your numbers yet. I'm asking — do you FEEL different when you walk into a ROF?\n\nThat feeling is the identity shift. The numbers follow.\n\nShare where you are right now.",
    ],
    4: [ // Thursday — Business, KPIs & Numbers
      "Let's talk real numbers.\n\nWhat's your care plan acceptance rate THIS week? Not your best week ever — THIS week.\n\n- How many new patients did you see?\n- How many started a full care plan?\n- What percentage is that?\n\nNo judgment. The whole point of tracking is to know where you stand so you can improve.\n\nIf you don't know your number — that IS the problem. Go calculate it right now.",
      "PVA check.\n\nYour Patient Visit Average tells you whether patients are completing care or dropping off.\n\n- Under 12: Your care plan presentation has a leak\n- 12-24: You're getting partial compliance\n- 24+: Your patients trust the plan\n\nWhat's yours? And what do you think is causing it?\n\nThis is the number that determines your collections more than anything else.",
      "Collections reality check.\n\nTake your total collections this week. Divide by total visits.\n\nThat's your collections per visit.\n\nIf it's under $50/visit — your fee schedule, your payment structure, or your case presentation needs work.\n\nIf it's over $75/visit — you're doing something right. Share what's working.\n\nThis number is more important than new patient count.",
    ],
    5: [ // Friday — KPIs, Reflection & Weekend Prep
      "📊 FRIDAY KPI DROP\n\nPost your numbers for the week:\n\n• Collections: $___\n• New patients: ___\n• Patient visits: ___\n• Care plans accepted: ___ out of ___\n• PVA: ___\n\nThen go submit them in the KPI tracker in your portal.\n\nWhat gets measured gets managed. What gets shared gets improved.\n\nYour numbers are your proof. This is the PROVE phase.",
      "End of week reflection. Answer honestly:\n\n1. Did I present every care plan with certainty this week — or did I hedge?\n2. Did I track my KPIs — or did I guess?\n3. Did I implement what we discussed on the call — or did I put it off?\n4. Am I closer to the doctor I want to be than I was Monday?\n\nWrite it out. Your future self will thank you.\n\nSee you on the call next week. Come with your numbers and your biggest question.",
      "Weekend homework 📝\n\nBefore Monday:\n\n1. Submit your KPIs in the portal (takes 2 minutes)\n2. Re-read your identity statement from Week 1 — does it still feel true? Update it if not.\n3. Practice your Day 2 ROF script out loud. One time. Just once.\n\nThe chiropractors who do the reps between calls are the ones who see their numbers move.\n\nIdentity first. Certainty second. Collections third.\n\nHave a great weekend. 🔥",
    ],
  }

  const todayPrompts = prompts[day]
  if (!todayPrompts) return { success: true, data: null }

  // Pick a random prompt for today
  const prompt = todayPrompts[Math.floor(Math.random() * todayPrompts.length)]
  return { success: true, data: prompt }
}

/**
 * Auto-post today's community prompt (called from admin or cron).
 */
export async function autoPostDailyPrompt() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' }

  try {
    const { data: prompt } = await getScheduledPrompt()
    if (!prompt) return { success: true, message: 'No prompt for today (weekend)' }

    // Check if we already posted today
    const adminClient = createAdminClient()
    const today = new Date().toISOString().slice(0, 10)
    const { data: existing } = await adminClient
      .from('community_posts')
      .select('id')
      .gte('created_at', `${today}T00:00:00`)
      .lt('created_at', `${today}T23:59:59`)
      .limit(1)

    // Only auto-post if no posts today
    if (existing && existing.length > 0) {
      return { success: true, message: 'Already posted today' }
    }

    const result = await postCommunityPrompt(prompt)
    return result
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}

/**
 * Fetch recent sent emails from automation_logs.
 */
export async function fetchSentHistory(limit: number = 30) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, data: [] }

  try {
    const adminClient = createAdminClient()
    const { data } = await adminClient
      .from('automation_logs')
      .select('id, user_email, event_type, status, created_at, error_message')
      .order('created_at', { ascending: false })
      .limit(limit)

    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, data: [] }
  }
}
