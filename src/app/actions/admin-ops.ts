'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { EmailService } from '@/lib/emails'
import { revalidatePath } from 'next/cache'

/**
 * 1. SEED DASHBOARD DATA
 * Populates the database with realistic mock data for the demo.
 */
export async function seedDashboardData() {
  const supabaseAdmin = createAdminClient()
  
  console.log('[ADMIN-OPS] Seeding dashboard data...')

  // A. Ensure a Cohort exists
  const { data: cohort, error: cohortError } = await supabaseAdmin
    .from('cohorts')
    .upsert({ 
      name: 'Alpha Cohort (Demo)', 
      status: 'active',
      start_date: new Date().toISOString()
    }, { onConflict: 'name' })
    .select()
    .single()

  if (cohortError) return { success: false, error: cohortError.message }

  // A.2 Ensure Curriculum exists (Weeks & Modules)
  const weeksData = [
    { week_number: 1, title: 'Identity of a Nervous System Doctor', theme: 'Who you are determines how you practice.', slug: 'week-1-identity', description: 'Doctor identity reconstruction, Certainty vs insecurity.' },
    { week_number: 2, title: 'Chiropractic Neurology for REAL Practice', theme: 'Not theory. Application.', slug: 'week-2-neurology', description: 'Functional nervous system explanation, HRV, tone, adaptability.' },
    { week_number: 3, title: 'Communication Mastery', theme: 'Recommend with certainty. No chasing yes.', slug: 'week-3-communication', description: 'ROF mastery, Tone calibration, Removing persuasion energy.' },
    { week_number: 4, title: 'Philosophy (Modern + Powerful)', theme: 'Make it make sense in today\'s world.', slug: 'week-4-philosophy', description: 'Subluxation without sounding outdated, Science + philosophy integration.' },
    { week_number: 5, title: 'Business: What School NEVER Taught You', theme: 'Money, structure, sustainability.', slug: 'week-5-business', description: 'Revenue structure, Case value clarity, Systems vs chaos.' },
    { week_number: 6, title: 'Care Plans, Day 1 / Day 2 Mastery', theme: 'Clarity removes pressure.', slug: 'week-6-care-plans', description: 'Day 1 consultation structure, Day 2 report of findings.' },
    { week_number: 7, title: 'Patient Management & Long-Term Clinical Leadership', theme: 'Build retention systems and lead patients through complete care.', slug: 'week-7-patient-management', description: 'Retention systems, handling "I feel better", long-term care leadership.' },
    { week_number: 8, title: 'Ownership, Contracts & Scaling', theme: 'Build something bigger than a job.', slug: 'week-8-ownership', description: 'Contracts, associate agreements, scaling your practice.' },
  ]

  const { data: seededWeeks, error: sWeekError } = await supabaseAdmin
    .from('weeks')
    .upsert(weeksData, { onConflict: 'slug' })
    .select()

  if (sWeekError) return { success: false, error: sWeekError.message }

  // Seed modules for all 8 weeks
  if (seededWeeks) {
    const moduleMap: Record<number, Array<{ title: string; slug: string; order_index: number }>> = {
      1: [
        { title: 'The Identity Gap', slug: '1-1-identity-gap', order_index: 1 },
        { title: 'Eliminating Neediness', slug: '1-2-eliminating-neediness', order_index: 2 },
      ],
      2: [
        { title: 'Tone and Adaptability', slug: '2-1-tone-adaptability', order_index: 1 },
        { title: 'HRV: The Gold Standard', slug: '2-2-hrv-gold-standard', order_index: 2 },
      ],
      3: [
        { title: 'The Script System', slug: '3-1-script-system', order_index: 1 },
        { title: 'Handling Money Talks', slug: '3-2-money-talks', order_index: 2 },
        { title: 'The Confident Close', slug: '3-3-confident-close', order_index: 3 },
      ],
      4: [
        { title: 'Modern Framing of Chiropractic', slug: '4-1-modern-framing', order_index: 1 },
        { title: 'Science + Philosophy Integration', slug: '4-2-science-philosophy', order_index: 2 },
        { title: 'Clear Patient Explanations', slug: '4-3-clear-explanations', order_index: 3 },
      ],
      5: [
        { title: 'Revenue Structure & Break-Even Mastery', slug: '5-1-revenue-structure', order_index: 1 },
        { title: 'Pricing With Confidence', slug: '5-2-pricing-confidence', order_index: 2 },
        { title: 'Systems vs Chaos: Building Predictable Growth', slug: '5-3-systems-growth', order_index: 3 },
      ],
      6: [
        { title: 'Day 1 Consultation Architecture', slug: '6-1-day1-consultation', order_index: 1 },
        { title: 'Day 2 Report of Findings Structure', slug: '6-2-day2-rof', order_index: 2 },
        { title: 'Care Plan Worksheet & Practice Scenarios', slug: '6-3-care-plan-practice', order_index: 3 },
      ],
      7: [
        { title: 'Retention Systems That Work', slug: '7-1-retention-systems', order_index: 1 },
        { title: 'Leading Patients Through Complete Care', slug: '7-2-leading-patients', order_index: 2 },
        { title: 'Long-Term Practice Leadership', slug: '7-3-practice-leadership', order_index: 3 },
      ],
      8: [
        { title: 'Contracts & Associate Agreements', slug: '8-1-contracts-agreements', order_index: 1 },
        { title: 'Scaling Your Practice', slug: '8-2-scaling-practice', order_index: 2 },
        { title: 'Your 10-Year Vision & Next Chapter', slug: '8-3-vision-next-chapter', order_index: 3 },
      ],
    }

    const modulesToSeed = []
    for (const week of seededWeeks) {
      const modules = moduleMap[week.week_number]
      if (modules) {
        for (const mod of modules) {
          modulesToSeed.push({ week_id: week.id, ...mod })
        }
      }
    }
    if (modulesToSeed.length > 0) {
      await supabaseAdmin.from('modules').upsert(modulesToSeed, { onConflict: 'week_id,slug' })
    }
  }

  // B. Create Mock Members (These IDs won't exist in auth.users, but RLS bypass allows it for demo profiles)
  // We use dummy UUIDs for demo profiles
  const mockMembers = [
    { id: '00000000-0000-0000-0000-000000000001', full_name: 'Dr. Sarah Smith', email: 'sarah@demo.com', tier: 'pro', cohort_id: cohort.id },
    { id: '00000000-0000-0000-0000-000000000002', full_name: 'Dr. Mike Jones', email: 'mike@demo.com', tier: 'standard', cohort_id: cohort.id },
    { id: '00000000-0000-0000-0000-000000000003', full_name: 'Dr. Lisa Wong', email: 'lisa@demo.com', tier: 'pro', cohort_id: cohort.id },
    { id: '00000000-0000-0000-0000-000000000004', full_name: 'Dr. David Miller', email: 'david@demo.com', tier: 'standard', cohort_id: cohort.id },
  ]

  const { error: profError } = await supabaseAdmin
    .from('profiles')
    .upsert(mockMembers, { onConflict: 'email' })

  if (profError) return { success: false, error: profError.message }

  // C. Add Mock Health Metrics
  const healthMetrics = [
    { user_id: mockMembers[0].id, health_score: 95, risk_level: 'low', modules_completed: 12, kpis_submitted: 4 },
    { user_id: mockMembers[1].id, health_score: 45, risk_level: 'high', modules_completed: 2, kpis_submitted: 1 },
    { user_id: mockMembers[2].id, health_score: 82, risk_level: 'low', modules_completed: 10, kpis_submitted: 4 },
    { user_id: mockMembers[3].id, health_score: 65, risk_level: 'medium', modules_completed: 5, kpis_submitted: 2 },
  ]

  await supabaseAdmin.from('member_health').upsert(healthMetrics)

  // D. Add some progress activity
  const { data: mods } = await supabaseAdmin.from('modules').select('id').limit(5)
  if (mods && mods.length > 0) {
    const progress = [
      { user_id: mockMembers[0].id, module_id: mods[0].id, completed_at: new Date().toISOString() },
      { user_id: mockMembers[2].id, module_id: mods[0].id, completed_at: new Date().toISOString() },
    ]
    await supabaseAdmin.from('member_progress').upsert(progress)
  }

  console.log('[ADMIN-OPS] Seeding complete.')
  revalidatePath('/admin')
  return { success: true }
}

/**
 * 2. SEND ANNOUNCEMENT
 */
export async function sendAnnouncement(title: string, content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const { error } = await supabase
    .from('announcements')
    .insert({
      title,
      content,
      created_by: user.id
    })

  if (error) return { success: false, error: error.message }

  // Send notifications to all members
  const { createBulkNotifications } = await import('@/app/actions/notification-actions')
  const count = await createBulkNotifications(title, content, 'announcement', '/portal')

  // Send emails to all members
  const adminClient = createAdminClient()
  const { data: members } = await adminClient
    .from('profiles')
    .select('email, full_name')
    .not('tier', 'eq', 'admin')
    .not('onboarding_completed_at', 'is', null)

  if (members) {
    for (const member of members) {
      try {
        await EmailService.sendAnnouncement(member.email, member.full_name || 'Doctor', title, content)
      } catch (e) { /* continue on email error */ }
    }
  }

  revalidatePath('/admin')
  revalidatePath('/portal')
  return { success: true, message: `Announcement sent to ${count} members` }
}

/**
 * 3. RUN ENGAGEMENT PULSE
 */
export async function runEngagementPulse() {
  const supabase = await createClient()
  
  // Find members with health score < 70
  const { data: atRisk, error } = await supabase
    .from('member_health')
    .select('user_id')
    .lt('health_score', 70)

  if (error) return { success: false, error: error.message }
  
  // Log intervention (In real life, trigger Resend email)
  console.log(`[PULSE] Triggered engagement pulse for ${atRisk?.length || 0} members.`)

  return { success: true, count: atRisk?.length || 0 }
}
