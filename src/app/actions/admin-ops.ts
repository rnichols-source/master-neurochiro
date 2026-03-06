'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
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
    await supabaseAdmin.from('progress').upsert(progress)
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

  revalidatePath('/admin')
  revalidatePath('/portal')
  return { success: true }
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
