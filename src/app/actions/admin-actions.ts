'use server'

import { createClient } from '@/lib/supabase/server'

export async function fetchAdminStats() {
  const supabase = await createClient()

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

  if (progressError) return { success: false, error: progressError.message }

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

  // Mocking completion rates for now since we don't have many real users
  const completionRates = weeks.map(w => ({
    week: w.week_number,
    title: w.title,
    rate: Math.max(100 - (w.week_number * 12), 15) // Simplified mock decay
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

  const { data: members, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      email,
      tier,
      created_at,
      member_health (
        health_score,
        risk_level,
        modules_completed,
        kpis_submitted
      )
    `)
    .not('tier', 'eq', 'admin')
    .order('created_at', { ascending: false })

  if (error) return { success: false, error: error.message }

  return { success: true, data: members }
}

export async function fetchRecentActivity() {
  const supabase = await createClient()

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

  // In a real app, we would query a 'payments' or 'subscriptions' table
  // For now, we derive it from profiles and tiers
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

  // Mock monthly data for the chart
  const monthlyData = [
    { month: 'Jan', revenue: totalRevenue * 0.4 },
    { month: 'Feb', revenue: totalRevenue * 0.7 },
    { month: 'Mar', revenue: totalRevenue },
  ]

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
