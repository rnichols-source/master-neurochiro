'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { EmailService } from '@/lib/emails'

/**
 * Step 4: Activate Member Account Access
 * Checks approved applications and ensures auth accounts + profiles exist.
 */
export async function activateApprovedMembers() {
  const supabaseAdmin = createAdminClient()
  
  // 1. Identify all approved applications (surrogate for "mastermind purchasers")
  const { data: approvedApps, error: appsError } = await supabaseAdmin
    .from('applications')
    .select('*')
    .eq('status', 'approved')

  if (appsError) return { success: false, error: appsError.message }
  if (!approvedApps || approvedApps.length === 0) {
    return { success: true, message: 'No pending approved members to activate.' }
  }

  const results = []

  for (const app of approvedApps) {
    // 2. Verify account exists in profiles
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', app.email)
      .single()

    if (existingProfile) {
      // Update role if already exists
      await supabaseAdmin.from('profiles').update({ 
        role: 'mastermind_member',
        full_name: app.full_name
      }).eq('id', existingProfile.id)
      
      results.push({ email: app.email, status: 'updated' })
      continue
    }

    // 3. Create account automatically if it doesn't exist
    // Note: We use a random password for now; Step 9 handles the password creation flow.
    const tempPassword = Math.random().toString(36).slice(-12) + '!'
    
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: app.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { 
        full_name: app.full_name,
        source: 'mastermind_activation'
      }
    })

    if (authError) {
      results.push({ email: app.email, status: 'error', error: authError.message })
      continue
    }

    // 4. Assign role and basic info
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: authUser.user.id,
        email: app.email,
        full_name: app.full_name,
        role: 'mastermind_member',
        status: 'pending_profile'
      })

    if (profileError) {
      results.push({ email: app.email, status: 'profile_error', error: profileError.message })
    } else {
      results.push({ email: app.email, status: 'created' })
      
      // Step 8 & 9: Trigger Onboarding & Password Emails
      await EmailService.sendOnboardingReady(app.email, app.full_name);
      
      // Step 9: Trigger Password Set link (via Supabase)
      const { data: resetData } = await supabaseAdmin.auth.admin.generateLink({
        type: 'recovery',
        email: app.email,
        options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/portal` }
      })
      
      if (resetData?.properties?.action_link) {
        await EmailService.sendPasswordReset(app.email, resetData.properties.action_link);
      }
    }
  }

  revalidatePath('/admin')
  return { success: true, results }
}

/**
 * Step 5: Update Profile Status
 */
export async function updateProfileStatus(userId: string, status: 'pending_profile' | 'profile_started' | 'profile_completed') {
  const supabaseAdmin = createAdminClient()
  
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ status })
    .eq('id', userId)

  if (error) return { success: false, error: error.message }
  
  revalidatePath('/dashboard')
  revalidatePath('/profile')
  return { success: true }
}

/**
 * Step 6: Save Profile Data
 */
export async function saveProfileData(userId: string, data: any) {
  const supabaseAdmin = createAdminClient()
  
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({
      ...data,
      status: 'profile_completed',
      onboarding_completed_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (error) return { success: false, error: error.message }
  
  revalidatePath('/dashboard')
  revalidatePath('/profile')
  return { success: true }
}

/**
 * Step 11: Track Engagement
 */
export async function trackActivity(userId: string, type: string, moduleId?: string, details?: any) {
  const supabaseAdmin = createAdminClient()
  
  const { error } = await supabaseAdmin
    .from('member_activity')
    .insert({
        user_id: userId,
        activity_type: type,
        module_id: moduleId,
        details: details || {}
    })

  return { success: !error }
}

/**
 * One-click sync for Week 6 Premium Resources
 */
export async function syncWeek6Resources() {
  const supabaseAdmin = createAdminClient()
  
  // Find Week 6 ID
  const { data: week } = await supabaseAdmin
    .from('weeks')
    .select('id')
    .eq('week_number', 6)
    .single()

  if (!week) return { success: false, error: 'Week 6 not found' }

  // Clear existing to avoid duplicates
  await supabaseAdmin.from('resources').delete().eq('week_id', week.id)

  // Insert the New Premium Suite
  const { error } = await supabaseAdmin.from('resources').insert([
    { title: 'Week 6 Master Overview', url: '/resources/week-6/master-overview.html', type: 'link', week_id: week.id },
    { title: 'Day 1 Playbook: Uncertainty', url: '/resources/week-6/day-1-playbook.html', type: 'link', week_id: week.id },
    { title: 'Day 2 Playbook: Decision Architecture', url: '/resources/week-6/day-2-playbook.html', type: 'link', week_id: week.id },
    { title: 'Day 3 Playbook: Stabilization', url: '/resources/week-6/day-3-playbook.html', type: 'link', week_id: week.id },
    { title: 'The Biological Sequence', url: '/resources/week-6/biological-sequence.html', type: 'link', week_id: week.id },
    { title: 'The Containment Protocol', url: '/resources/week-6/containment-protocol.html', type: 'link', week_id: week.id },
    { title: 'The Physics of Frequency', url: '/resources/week-6/physics-of-frequency.html', type: 'link', week_id: week.id },
    { title: 'The Doctrine of Clinical Mastery', url: '/resources/week-6/mastery-doctrine.html', type: 'link', week_id: week.id },
    { title: 'Sequence Cheat Sheet', url: '/resources/week-6/sequence-cheat-sheet.html', type: 'link', week_id: week.id }
  ])

  if (error) return { success: false, error: error.message }
  
  revalidatePath('/portal/curriculum')
  return { success: true }
}
