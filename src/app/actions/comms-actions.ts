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
export async function sendCallReminder(callDate: string, callTime: string, zoomLink: string) {
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
          <div style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 40px;">
            <p>Hey Dr. ${firstName},</p>
            <p>Just a reminder — your Mastermind coaching call is <strong>${callDate} at ${callTime} ET</strong>.</p>
            <p>Come ready with your KPIs and your biggest question. See you there.</p>
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
      await EmailService.send(member.email, `Coaching Call Reminder — ${callDate} at ${callTime} ET`, html, 'call_reminder_manual')
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
