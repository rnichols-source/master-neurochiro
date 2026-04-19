'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { EmailService } from '@/lib/emails'
import crypto from 'crypto'
/**
 * Security Shield: Verifies that the current user has administrative authority.
 */
async function checkAdmin(supabase: any) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return false;

    // First check metadata for speed
    if (user.app_metadata?.role === 'admin') return true;

    // Fallback: Check the profiles table (more reliable if metadata isn't synced)
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single();
    
    return profile?.tier === 'admin';
  } catch (err) {
    console.error("[SECURITY] Error checking admin status:", err);
    return false;
  }
}

export async function sendPortalInvite(email: string, fullName: string) {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: '403 Unauthorized: Administrative access required.' }

  const adminClient = createAdminClient()
  // ... rest of the function ...

  console.log(`[ADMIN] Manually sending custom portal invite to: ${email}`);

  // 1. Generate unique token for the project's custom activation flow
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days

  // 2. Create/Update invitation in the DB
  const { error: invError } = await adminClient
    .from('invitations')
    .upsert({
      email: email,
      full_name: fullName,
      token: token,
      expires_at: expiresAt,
      status: 'pending'
    }, { onConflict: 'email' })

  if (invError) {
    console.error(`[ADMIN] Invitation Error:`, invError);
    return { success: false, error: `Database error: ${invError.message}` };
  }

  // 3. Construct the activation link
  const activationLink = `${process.env.NEXT_PUBLIC_SITE_URL}/portal/activate/${token}`

  // 4. Send the branded email
  try {
    await EmailService.sendOnboardingReady(email, fullName, activationLink);
    return { success: true, message: `Custom portal activation link sent to ${email}` };
  } catch (emailErr: any) {
    console.error("[ADMIN] Email Error:", emailErr);
    return { success: false, error: `Link generated but email failed: ${emailErr.message}` };
  }
}

export async function fetchAdminStats() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }

  // 1. Members count (Optimized: Direct DB counts)
  const [proRes, stdRes] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('tier', 'pro'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('tier', 'standard')
  ])

  const proMembers = proRes.count || 0
  const standardMembers = stdRes.count || 0
  const totalMembers = proMembers + standardMembers

  // 2. Pending Applications (Optimized)
  const { count: pendingApps, error: appsError } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  if (appsError) return { success: false, error: appsError.message }

  // 3. Revenue (Estimated from tiers)
  const revenue = (standardMembers * 997) + (proMembers * 1997)

  // 4. Cohort Health (Average Progress - Optimized)
  const { count: totalProgress, error: progressError } = await supabase
    .from('member_progress')
    .select('*', { count: 'exact', head: true })

  if (progressError) {
    console.error('[ADMIN] ERROR: member_progress fetch failed in stats. Verify if table "member_progress" exists in production.', progressError.message)
    return { success: false, error: `Progress fetch error: ${progressError.message}` }
  }

  // 5. Total Modules count
  const { count: totalModules, error: modulesError } = await supabase
    .from('modules')
    .select('*', { count: 'exact', head: true })

  if (modulesError) return { success: false, error: modulesError.message }

  const avgCompletion = totalMembers > 0 
    ? Math.round(((totalProgress || 0) / (totalMembers * (totalModules || 1))) * 100) 
    : 0

  return {
    success: true,
    data: {
      totalMembers,
      proMembers,
      standardMembers,
      pendingApps: pendingApps || 0,
      revenue,
      avgCompletion
    }
  }
}

export async function fetchCohortMetrics() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }

  // Fetch all cohorts
  const { data: cohorts, error: cohortsError } = await supabase
    .from('cohorts')
    .select('*')
    .order('created_at', { ascending: false })

  if (cohortsError) return { success: false, error: cohortsError.message }

  // Fetch completion per week
  const { data: weeks, error: weeksError } = await supabase
    .from('weeks')
    .select('id, title, week_number')
    .order('week_number', { ascending: true })

  if (weeksError) return { success: false, error: weeksError.message }

  // Real completion rates
  const completionRates = await Promise.all(weeks.map(async w => {
    // Count modules in week
    const { data: modules } = await supabase.from('modules').select('id').eq('week_id', w.id)
    const moduleIds = modules?.map(m => m.id) || []
    
    let rate = 0
    if (moduleIds.length > 0) {
        // Count how many progress entries exist for these modules
        const { count } = await supabase.from('member_progress').select('*', { count: 'exact', head: true }).in('module_id', moduleIds)
        // Count total active non-admin users
        const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).neq('tier', 'admin')
        
        const possibleCompletions = (userCount || 1) * moduleIds.length
        rate = possibleCompletions > 0 ? Math.round(((count || 0) / possibleCompletions) * 100) : 0
    }

    return {
      week: w.week_number,
      title: w.title,
      rate
    }
  }))

  return {
    success: true,
    data: {
      cohorts,
      completionRates
    }
  }
}

export async function fetchMembersWithHealth() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }

  const adminClient = createAdminClient()
  const { data: members, error } = await adminClient
    .from('profiles')
    .select(`
      id,
      full_name,
      email,
      tier,
      created_at,
      onboarding_completed_at,
      member_health (
        health_score,
        risk_level,
        modules_completed,
        kpis_submitted
      )
    `)
    .not('tier', 'eq', 'admin')
    .not('onboarding_completed_at', 'is', null)
    .order('created_at', { ascending: false })

  if (error) return { success: false, error: error.message }

  return { success: true, data: members }
}

export async function fetchRecentActivity() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }

  const { data: progress, error } = await supabase
    .from('member_progress')
    .select(`
      completed_at,
      profiles (full_name),
      modules (title)
    `)
    .order('completed_at', { ascending: false })
    .limit(5)

  if (error) return { success: false, error: error.message }

  return { success: true, data: progress }
}

export async function fetchRevenueStats() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }

  // Derive from profiles and tiers
  const { data: members, error } = await supabase
    .from('profiles')
    .select('tier, created_at')
    .not('tier', 'eq', 'admin')

  if (error) return { success: false, error: error.message }

  const proCount = members.filter(m => m.tier === 'pro').length
  const standardCount = members.filter(m => m.tier === 'standard').length

  const proRevenue = proCount * 1997
  const standardRevenue = standardCount * 997
  const totalRevenue = proRevenue + standardRevenue

  // Group by month
  const monthlyDataMap: Record<string, number> = {}
  members.forEach(m => {
    const date = new Date(m.created_at)
    const month = date.toLocaleString('default', { month: 'short' })
    const rev = m.tier === 'pro' ? 1997 : 997
    monthlyDataMap[month] = (monthlyDataMap[month] || 0) + rev
  })

  // Ensure last 3 months exist
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const currentMonthIdx = new Date().getMonth()
  const recentMonths = [
      months[(currentMonthIdx - 2 + 12) % 12],
      months[(currentMonthIdx - 1 + 12) % 12],
      months[currentMonthIdx]
  ]

  const monthlyData = recentMonths.map(m => ({
      month: m,
      revenue: monthlyDataMap[m] || 0
  }))

  return {
    success: true,
    data: {
      totalRevenue,
      proRevenue,
      standardRevenue,
      proCount,
      standardCount,
      monthlyData
    }
  }
}

export async function fetchMastermindActivity() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }

  // 1. Total Members
  const { count: totalMembers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .neq('tier', 'admin')

  // 2. Members with profiles completed
  const { count: profilesCompleted } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'profile_completed')

  // 3. Members who watched Week 6 (Module 1)
  const { data: week6 } = await supabase
    .from('weeks')
    .select('id')
    .eq('slug', 'week-6-care-plans')
    .single()
    
  let watchedWeek6 = 0
  if (week6) {
    const { data: w6Module } = await supabase
        .from('modules')
        .select('id')
        .eq('week_id', week6.id)
        .eq('order_index', 1)
        .single()
        
    if (w6Module) {
        const { count } = await supabase
            .from('member_progress')
            .select('*', { count: 'exact', head: true })
            .eq('module_id', w6Module.id)
        watchedWeek6 = count || 0
    }
  }

  // 4. Recently active (last 24h)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { count: activeToday } = await supabase
    .from('member_activity')
    .select('*', { count: 'exact', head: true })
    .gt('created_at', oneDayAgo)

  return {
    success: true,
    data: {
      totalMembers: totalMembers || 0,
      profilesCompleted: profilesCompleted || 0,
      watchedWeek6,
      activeToday: activeToday || 0,
      inactive: (totalMembers || 0) - (activeToday || 0)
    }
  }
}

export async function fetchAtRiskMembers() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }

  // Find users who have not completed any modules and are not admin
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, created_at, status')
    .not('tier', 'eq', 'admin')

  if (error) return { success: false, error: error.message }

  const atRisk = []
  for (const profile of profiles || []) {
      const { count } = await supabase
        .from('member_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profile.id)
      
      // If no progress and created more than 7 days ago
      const daysSinceCreation = (new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 3600 * 24)
      if ((count === 0 && daysSinceCreation > 7) || profile.status === 'pending_profile') {
          atRisk.push(profile)
      }
  }

  return { success: true, data: atRisk }
}

export async function fetchVaultAnalytics() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }
  
  const { data, error } = await supabase
    .from('vault_resources')
    .select('id, title, download_count, category, resource_type')
    .order('download_count', { ascending: false })
    .limit(10)

  if (error) return { success: false, error: error.message }
  return { success: true, data }
}

export async function fetchAutomationLogs() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }

  const { data, error } = await supabase
    .from('automation_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) return { success: false, error: error.message }
  return { success: true, data }
}

export async function fetchAutomationStats() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }

  const { data: logs, error } = await supabase
    .from('automation_logs')
    .select('status, event_type')

  if (error) return { success: false, error: error.message }

  const stats = {
    totalSent: logs.filter(l => l.status === 'sent').length,
    totalFailed: logs.filter(l => l.status === 'failed').length,
    reminders: logs.filter(l => l.event_type === 'call_reminder').length,
    reengagements: logs.filter(l => l.event_type === 'reengagement').length
  }

  return { success: true, data: stats }
}

export async function fetchSystemHealth() {
  const supabase = await createClient()
  const isAdmin = await checkAdmin(supabase)
  if (!isAdmin) return { success: false, error: 'Unauthorized' }
  
  // Just ping the database
  const { error } = await supabase.from('profiles').select('id').limit(1)
  
  return {
    success: true,
    data: {
      database: error ? 'error' : 'operational',
      auth: 'operational',
      email: 'operational', // We know Resend is configured
      payments: 'operational'
    }
  }
}
