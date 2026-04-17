'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { EmailService } from '@/lib/emails'
import crypto from 'crypto'

/**
 * Trigger Onboarding Preview for Admin
 */
export async function triggerAdminPreview() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  // Check if admin
  const { data: profile } = await supabase.from('profiles').select('tier, full_name').eq('id', user.id).single()
  if (profile?.tier !== 'admin') return { success: false, error: 'Unauthorized' }

  const previewToken = 'preview-token-' + crypto.randomBytes(8).toString('hex')
  const previewLink = `${process.env.NEXT_PUBLIC_SITE_URL}/portal/activate/${previewToken}`

  try {
    await EmailService.sendAdminPreview(user.email!, profile.full_name || 'Admin', previewLink)
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Trigger Onboarding for All Active Members
 * This would typically find all 'pro' members or a specific list
 */
export async function triggerCohortOnboarding() {
  const supabaseAdmin = createAdminClient()
  
  // 1. Find all members who don't have an auth account yet but are in our 'approved' applications
  // OR just a list of emails for the transition
  const { data: apps, error } = await supabaseAdmin
    .from('applications')
    .select('email, full_name')
    .in('status', ['approved', 'paid'])

  if (error) return { success: false, error: error.message }
  
  const results = []
  
  for (const app of apps) {
    // Generate unique token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days

    const { error: invError } = await supabaseAdmin
      .from('invitations')
      .upsert({
        email: app.email,
        full_name: app.full_name,
        token: token,
        expires_at: expiresAt
      }, { onConflict: 'email' })

    if (invError) {
      results.push({ email: app.email, status: 'error', error: invError.message })
      continue
    }

    const activationLink = `${process.env.NEXT_PUBLIC_SITE_URL}/portal/activate/${token}`
    
    try {
      await EmailService.sendOnboardingReady(app.email, app.full_name || 'Doctor', activationLink)
      results.push({ email: app.email, status: 'sent' })
    } catch (err: any) {
      results.push({ email: app.email, status: 'email_error', error: err.message })
    }
  }

  return { success: true, results }
}

/**
 * Validate Token
 */
export async function validateActivationToken(token: string) {
  if (token.startsWith('preview-token-')) return { success: true, isPreview: true }

  const supabaseAdmin = createAdminClient()
  const { data, error } = await supabaseAdmin
    .from('invitations')
    .select('*')
    .eq('token', token)
    .eq('status', 'pending')
    .gt('expires_at', new Date().toISOString())
    .maybeSingle()

  if (error || !data) return { success: false, error: 'Invalid or expired activation link' }
  
  return { success: true, data }
}

/**
 * Complete Activation
 */
export async function activateMemberProfile(token: string, password: string, profileData: any) {
  const supabaseAdmin = createAdminClient()

  // 1. Validate token again
  const validation = await validateActivationToken(token)
  if (!validation.success) return { success: false, error: validation.error }
  if (validation.isPreview) return { success: true, message: 'Preview mode: No account created.' }

  const invitation = validation.data!

  // 2. Create Auth User
  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: invitation.email,
    password: password,
    email_confirm: true,
    user_metadata: { 
      full_name: profileData.first_name + ' ' + profileData.last_name,
      onboarding_source: 'mastermind_transition'
    }
  })

  if (authError) return { success: false, error: authError.message }

  // 3. Create Profile
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id: authUser.user.id,
      email: invitation.email,
      full_name: profileData.first_name + ' ' + profileData.last_name,
      user_type: profileData.user_type,
      practice_name: profileData.practice_name,
      practice_city: profileData.practice_city,
      practice_state: profileData.practice_state,
      years_in_practice: profileData.years_in_practice ? parseInt(profileData.years_in_practice) : null,
      practice_type: profileData.practice_type,
      website: profileData.website,
      chiropractic_school: profileData.chiropractic_school,
      graduation_year: profileData.graduation_year,
      current_year_in_school: profileData.current_year_in_school,
      areas_of_interest: profileData.areas_of_interest || [],
      tier: 'pro',
      status: 'profile_completed',
      is_first_login: true,
      onboarding_completed_at: new Date().toISOString()
    })

  if (profileError) return { success: false, error: profileError.message }

  // 4. Mark invitation as accepted
  await supabaseAdmin.from('invitations').update({ status: 'accepted' }).eq('id', invitation.id)

  return { success: true }
}

/**
 * Mark First Login as Done
 */
export async function markFirstLoginDone() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const { error } = await supabase
    .from('profiles')
    .update({ is_first_login: false })
    .eq('id', user.id)

  if (error) return { success: false, error: error.message }
  
  revalidatePath('/portal')
  return { success: true }
}
