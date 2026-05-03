'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { checkAdmin } from '@/app/actions/agent-actions'
import { EmailService } from '@/lib/emails'
import { revalidatePath } from 'next/cache'

const CALENDLY_LINK = 'https://calendly.com/drray-neurochirodirectory/15min'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://neurochiromastermind.com'

/**
 * Create a lead from a public capture page (free-training or quiz).
 * No auth required — this is called from public pages.
 */
export async function createLeadFromCapture(data: {
  name: string;
  email: string;
  source: 'free_training' | 'quiz';
  fit_score?: number;
  notes?: string;
}) {
  try {
    const adminClient = createAdminClient()

    // Check if this email already exists
    const { data: existing } = await adminClient
      .from('mastermind_prospects')
      .select('id')
      .eq('email', data.email)
      .limit(1)

    if (existing && existing.length > 0) {
      return { success: true, message: 'Already in pipeline', duplicate: true }
    }

    // Also check applications
    const { data: existingApp } = await adminClient
      .from('applications')
      .select('id')
      .eq('email', data.email)
      .limit(1)

    if (existingApp && existingApp.length > 0) {
      return { success: true, message: 'Already applied', duplicate: true }
    }

    // Insert the lead
    const { error } = await adminClient.from('mastermind_prospects').insert([{
      name: data.name,
      email: data.email,
      source: data.source,
      status: 'new',
      fit_score: data.fit_score || 50,
      notes: data.notes || null,
    }])

    if (error) return { success: false, error: error.message }

    // Send Day 0 email
    if (data.source === 'free_training') {
      const html = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #ffffff; background-color: #0A192F; border-radius: 12px;">
          <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; font-weight: 800; color: #E67E22; margin-bottom: 20px;">Free Training</p>
          <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 30px;">Your Training Is Ready</h1>
          <div style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 40px;">
            <p>Hey Dr. ${data.name.split(' ')[0]},</p>
            <p>Thanks for signing up. Your free training — <strong>"The 3 Mistakes Nervous System Chiropractors Make That Kill Their Collections"</strong> — is ready to watch.</p>
            <p>Inside, you'll learn the exact framework our Mastermind members use to fix their Day 1 and Day 2 flow and add $3-5K/month in collections.</p>
          </div>
          <div style="margin-bottom: 40px;">
            <a href="${SITE_URL}/free-training/confirmation" style="background-color: #E67E22; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Watch the Training</a>
          </div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 20px;">
            <p>Want to skip ahead and talk directly?</p>
            <a href="${CALENDLY_LINK}" style="color: #E67E22; text-decoration: underline;">Book a free 15-min call with Dr. Ray →</a>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
          <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">NeuroChiro Global Mastermind</p>
        </div>
      `
      await EmailService.send(data.email, 'Your Free Training Is Ready', html, 'lead_free_training')
    } else if (data.source === 'quiz') {
      const scoreLabel = (data.fit_score || 50) >= 70 ? 'Strong' : (data.fit_score || 50) >= 40 ? 'Developing' : 'Needs Work'
      const html = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #ffffff; background-color: #0A192F; border-radius: 12px;">
          <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; font-weight: 800; color: #E67E22; margin-bottom: 20px;">Practice Assessment</p>
          <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 30px;">Your Practice Score: ${data.fit_score || 50}/100</h1>
          <div style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 40px;">
            <p>Hey Dr. ${data.name.split(' ')[0]},</p>
            <p>Your practice scored <strong>${data.fit_score || 50}/100</strong> — that puts you in the <strong>"${scoreLabel}"</strong> category.</p>
            <p>I've prepared a personalized breakdown of your results with specific action steps. To get the full report, book a quick 15-minute call with me — I'll walk you through exactly what to focus on first.</p>
          </div>
          <div style="margin-bottom: 40px;">
            <a href="${CALENDLY_LINK}" style="background-color: #E67E22; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Get Your Full Results — Book a Call</a>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
          <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">NeuroChiro Global Mastermind</p>
        </div>
      `
      await EmailService.send(data.email, `Your Practice Score: ${data.fit_score || 50}/100`, html, 'lead_quiz_results')
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Fetch the mastermind prospect pipeline.
 */
export async function fetchHunterPipeline() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()

    const { data: prospects, error } = await adminClient
      .from('mastermind_prospects')
      .select('*')
      .order('fit_score', { ascending: false })

    if (error) return { success: false, error: error.message }

    // Pipeline summary
    const pipeline = {
      new: 0, contacted: 0, responded: 0, call_scheduled: 0,
      applied: 0, enrolled: 0, not_interested: 0, unresponsive: 0,
    }
    for (const p of prospects || []) {
      if (pipeline[p.status as keyof typeof pipeline] !== undefined) {
        pipeline[p.status as keyof typeof pipeline]++
      }
    }

    return { success: true, data: { prospects: prospects || [], pipeline } }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Import prospects from the neurochiro doctors directory.
 * Only imports doctors not already in mastermind_prospects or applications.
 */
export async function importFromDirectory() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()

    // Get all doctors from directory
    const { data: doctors } = await adminClient
      .from('doctors')
      .select('name, email, phone, clinic_name, city, state, website')

    if (!doctors || doctors.length === 0) {
      return { success: true, message: 'No doctors in directory' }
    }

    // Get existing prospect emails
    const { data: existing } = await adminClient
      .from('mastermind_prospects')
      .select('email')
    const existingEmails = new Set((existing || []).map((e: any) => e.email?.toLowerCase()))

    // Get existing application emails (already applied)
    const { data: apps } = await adminClient
      .from('applications')
      .select('email')
    const appEmails = new Set((apps || []).map((a: any) => a.email?.toLowerCase()))

    // Get existing member emails (already enrolled)
    const { data: members } = await adminClient
      .from('profiles')
      .select('email')
      .in('tier', ['standard', 'pro', 'admin'])
    const memberEmails = new Set((members || []).map((m: any) => m.email?.toLowerCase()))

    // Filter to only new prospects
    const newProspects = doctors.filter((d) => {
      const email = d.email?.toLowerCase()
      if (!email) return false
      return !existingEmails.has(email) && !appEmails.has(email) && !memberEmails.has(email)
    })

    if (newProspects.length === 0) {
      return { success: true, message: 'All directory doctors already tracked' }
    }

    // Score each prospect
    const scored = newProspects.map((d) => ({
      name: d.name || 'Unknown',
      email: d.email,
      phone: d.phone || null,
      clinic_name: d.clinic_name || null,
      city: d.city || null,
      state: d.state || null,
      website: d.website || null,
      source: 'directory',
      status: 'new',
      fit_score: calculateFitScore(d),
    }))

    const { error } = await adminClient
      .from('mastermind_prospects')
      .insert(scored)

    if (error) return { success: false, message: error.message }

    revalidatePath('/admin/agents/hunter')
    return { success: true, message: `Imported ${scored.length} new prospects` }
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}

/**
 * Calculate a fit score for a prospect (0-100).
 */
function calculateFitScore(doctor: any): number {
  let score = 30 // Base

  // Has email = contactable
  if (doctor.email) score += 15
  // Has phone
  if (doctor.phone) score += 10
  // Has website = established practice
  if (doctor.website) score += 15
  // Has clinic name = practice owner
  if (doctor.clinic_name) score += 15
  // US-based (most mastermind members)
  if (doctor.state && doctor.state.length === 2) score += 10
  // Has city = complete profile
  if (doctor.city) score += 5

  return Math.min(score, 100)
}

/**
 * Add a prospect manually.
 */
export async function addProspect(data: {
  name: string; email?: string; phone?: string; clinic_name?: string;
  city?: string; state?: string; source?: string; notes?: string;
}) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()
    const { error } = await adminClient.from('mastermind_prospects').insert([{
      ...data,
      source: data.source || 'manual',
      status: 'new',
      fit_score: calculateFitScore(data),
    }])

    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/agents/hunter')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Generate a personalized outreach email for a prospect.
 */
export async function generateOutreach(prospectId: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()
    const { data: prospect } = await adminClient
      .from('mastermind_prospects')
      .select('*')
      .eq('id', prospectId)
      .single()

    if (!prospect) return { success: false, error: 'Prospect not found' }

    const firstName = prospect.name?.split(' ')[0] || 'Doctor'
    const clinicRef = prospect.clinic_name ? ` at ${prospect.clinic_name}` : ''
    const locationRef = prospect.city && prospect.state ? ` in ${prospect.city}, ${prospect.state}` : ''

    const subject = `Dr. ${firstName}, quick question about your practice`

    const body = `Hey Dr. ${firstName},

I came across your profile${clinicRef}${locationRef} and wanted to reach out personally.

I run a program called the NeuroChiro Mastermind — it's a 90-day coaching intensive for nervous system chiropractors. We focus on three things: how you communicate with patients, how you structure care plans, and how you build a practice that actually pays you what you're worth.

Our last cohort had doctors adding $3-5K/month in collections within the first 4 weeks just by fixing their Day 1 and Day 2 flow.

I'm not sure if this is a fit for you, but if you're open to a quick 15-minute call, I'd love to learn more about where your practice is right now and see if the Mastermind could help.

Here's my calendar if you want to grab a time: ${CALENDLY_LINK}

Either way, keep doing great work.

— Dr. Ray Nichols
NeuroChiro Mastermind`

    // Save the draft to the prospect
    await adminClient
      .from('mastermind_prospects')
      .update({ outreach_subject: subject, outreach_body: body, updated_at: new Date().toISOString() })
      .eq('id', prospectId)

    return { success: true, data: { subject, body } }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Send outreach email to a prospect.
 */
export async function sendOutreach(prospectId: string, subject: string, body: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()
    const { data: prospect } = await adminClient
      .from('mastermind_prospects')
      .select('*')
      .eq('id', prospectId)
      .single()

    if (!prospect || !prospect.email) return { success: false, error: 'No email for prospect' }

    // Build HTML email
    const htmlBody = body.replace(/\n/g, '<br>')
    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #ffffff; background-color: #0A192F; border-radius: 12px;">
        <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; font-weight: 800; color: #E67E22; margin-bottom: 20px;">Personal Invitation</p>
        <div style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 40px;">
          ${htmlBody}
        </div>
        <div style="margin-bottom: 40px;">
          <a href="${CALENDLY_LINK}" style="background-color: #E67E22; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Book a Discovery Call</a>
        </div>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
        <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">
          NeuroChiro Global Mastermind
        </p>
      </div>
    `

    await EmailService.send(prospect.email, subject, html, 'mastermind_outreach')

    // Update prospect status
    await adminClient
      .from('mastermind_prospects')
      .update({
        status: 'contacted',
        contacted_at: new Date().toISOString(),
        outreach_subject: subject,
        outreach_body: body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', prospectId)

    revalidatePath('/admin/agents/hunter')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Generate and send follow-up email to a contacted prospect who hasn't responded.
 */
export async function sendFollowUp(prospectId: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()
    const { data: prospect } = await adminClient
      .from('mastermind_prospects')
      .select('*')
      .eq('id', prospectId)
      .single()

    if (!prospect || !prospect.email) return { success: false, error: 'No email' }

    const firstName = prospect.name?.split(' ')[0] || 'Doctor'
    const followUpNum = (prospect.follow_up_count || 0) + 1

    let subject: string
    let body: string

    if (followUpNum === 1) {
      subject = `Following up, Dr. ${firstName}`
      body = `Hey Dr. ${firstName},

Just bumping this to the top of your inbox. I know things get busy.

If you're curious about what we do inside the Mastermind, here's the short version: we help nervous system chiropractors fix their communication, care plans, and business in 8 weeks.

No pressure at all — but if you want to hop on a quick call and see if it's a fit, here's my calendar: ${CALENDLY_LINK}

— Dr. Ray`
    } else {
      subject = `Last check-in, Dr. ${firstName}`
      body = `Hey Dr. ${firstName},

This is my last follow-up — I don't want to be that person clogging your inbox.

If the timing isn't right, no worries at all. But if there's even a small part of you that's curious about growing your practice with a group of driven chiropractors, I'd love 15 minutes of your time.

${CALENDLY_LINK}

Either way, I respect your time. Keep crushing it.

— Dr. Ray`
    }

    const htmlBody = body.replace(/\n/g, '<br>')
    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #ffffff; background-color: #0A192F; border-radius: 12px;">
        <div style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 40px;">
          ${htmlBody}
        </div>
        <div style="margin-bottom: 40px;">
          <a href="${CALENDLY_LINK}" style="background-color: #E67E22; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Book a Call</a>
        </div>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
        <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">
          NeuroChiro Global Mastermind
        </p>
      </div>
    `

    await EmailService.send(prospect.email, subject, html, 'mastermind_followup')

    // Update prospect
    const update: any = {
      follow_up_count: followUpNum,
      follow_up_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    if (followUpNum >= 3) update.status = 'unresponsive'

    await adminClient
      .from('mastermind_prospects')
      .update(update)
      .eq('id', prospectId)

    revalidatePath('/admin/agents/hunter')
    return { success: true, message: `Follow-up #${followUpNum} sent` }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Update prospect status (e.g., mark as responded, call scheduled, not interested).
 */
export async function updateProspectStatus(prospectId: string, status: string, notes?: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()
    const update: any = { status, updated_at: new Date().toISOString() }

    if (status === 'responded') update.responded_at = new Date().toISOString()
    if (status === 'call_scheduled') update.call_scheduled_at = new Date().toISOString()
    if (status === 'applied') update.applied_at = new Date().toISOString()
    if (status === 'enrolled') update.enrolled_at = new Date().toISOString()
    if (notes) update.notes = notes

    const { error } = await adminClient
      .from('mastermind_prospects')
      .update(update)
      .eq('id', prospectId)

    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/agents/hunter')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Batch outreach: send emails to top N uncontacted prospects.
 */
export async function runBatchOutreach(limit: number = 10) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()

    // Get top uncontacted prospects with email, sorted by fit score
    const { data: prospects } = await adminClient
      .from('mastermind_prospects')
      .select('*')
      .eq('status', 'new')
      .not('email', 'is', null)
      .order('fit_score', { ascending: false })
      .limit(limit)

    if (!prospects || prospects.length === 0) {
      return { success: true, message: 'No new prospects to contact' }
    }

    let sentCount = 0
    for (const prospect of prospects) {
      // Generate and send outreach
      const genResult = await generateOutreach(prospect.id)
      if (!genResult.success || !genResult.data) continue

      const sendResult = await sendOutreach(prospect.id, genResult.data.subject, genResult.data.body)
      if (sendResult.success) sentCount++
    }

    return { success: true, message: `Sent ${sentCount} outreach email${sentCount !== 1 ? 's' : ''}` }
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}

/**
 * Batch follow-up: send follow-ups to contacted prospects who haven't responded (7+ days).
 */
export async function runBatchFollowUp() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' }

  try {
    const adminClient = createAdminClient()
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const { data: prospects } = await adminClient
      .from('mastermind_prospects')
      .select('*')
      .eq('status', 'contacted')
      .lt('contacted_at', sevenDaysAgo)
      .lt('follow_up_count', 3)
      .not('email', 'is', null)

    if (!prospects || prospects.length === 0) {
      return { success: true, message: 'No follow-ups needed' }
    }

    // Also check last follow_up_at is 7+ days ago
    const needsFollowUp = prospects.filter((p) => {
      if (!p.follow_up_at) return true
      return new Date(p.follow_up_at).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000
    })

    let sentCount = 0
    for (const prospect of needsFollowUp) {
      const result = await sendFollowUp(prospect.id)
      if (result.success) sentCount++
    }

    return { success: true, message: `Sent ${sentCount} follow-up${sentCount !== 1 ? 's' : ''}` }
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}
