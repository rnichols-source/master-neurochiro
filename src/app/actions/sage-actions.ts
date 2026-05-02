'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdmin } from '@/app/actions/agent-actions'

/**
 * Per-module completion analytics grouped by week.
 */
export async function fetchModuleAnalytics() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    // Get weeks with their modules
    const { data: weeks, error: weeksErr } = await supabase
      .from('weeks')
      .select('id, week_number, title')
      .order('week_number', { ascending: true })

    if (weeksErr) throw weeksErr

    const { data: modules, error: modsErr } = await supabase
      .from('modules')
      .select('id, title, week_id, order_index')
      .order('order_index', { ascending: true })

    if (modsErr) throw modsErr

    // Get completion counts per module
    const { data: progress } = await supabase
      .from('member_progress')
      .select('module_id')

    const completionMap: Record<string, number> = {}
    for (const p of progress || []) {
      completionMap[p.module_id] = (completionMap[p.module_id] || 0) + 1
    }

    // Get total paying members
    const { count: totalMembers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .in('tier', ['standard', 'pro'])

    const memberCount = totalMembers || 0

    const weeksWithModules = (weeks || []).map((week) => {
      const weekModules = (modules || [])
        .filter((m) => m.week_id === week.id)
        .map((m) => {
          const completions = completionMap[m.id] || 0
          return {
            id: m.id,
            title: m.title,
            completions,
            completionRate: memberCount > 0
              ? Math.round((completions / memberCount) * 100)
              : 0,
          }
        })

      return {
        week_number: week.week_number,
        title: week.title,
        modules: weekModules,
      }
    })

    return { success: true, data: { weeks: weeksWithModules, totalMembers: memberCount } }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Week-by-week funnel showing how many members completed ALL modules in each week.
 */
export async function fetchCurriculumFunnel() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const { data: weeks } = await supabase
      .from('weeks')
      .select('id, week_number, title')
      .order('week_number', { ascending: true })

    const { data: modules } = await supabase
      .from('modules')
      .select('id, week_id')

    const { data: progress } = await supabase
      .from('member_progress')
      .select('user_id, module_id')

    // Build user->completed modules set
    const userCompletions: Record<string, Set<string>> = {}
    for (const p of progress || []) {
      if (!userCompletions[p.user_id]) userCompletions[p.user_id] = new Set()
      userCompletions[p.user_id].add(p.module_id)
    }

    const funnel = (weeks || []).map((week) => {
      const weekModuleIds = (modules || [])
        .filter((m) => m.week_id === week.id)
        .map((m) => m.id)

      // Count users who completed ALL modules in this week
      let completedBy = 0
      if (weekModuleIds.length > 0) {
        for (const userId of Object.keys(userCompletions)) {
          const userSet = userCompletions[userId]
          if (weekModuleIds.every((mid) => userSet.has(mid))) {
            completedBy++
          }
        }
      }

      return {
        week: week.week_number,
        title: week.title,
        completedBy,
      }
    })

    return { success: true, data: funnel }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Recent reflections from member_progress entries.
 */
export async function fetchReflectionInsights() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const { data, error } = await supabase
      .from('member_progress')
      .select('reflection, completed_at, user_id, module_id')
      .not('reflection', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(20)

    if (error) throw error

    if (!data || data.length === 0) {
      return { success: true, data: [] }
    }

    // Get profile names and module titles
    const userIds = [...new Set(data.map((d) => d.user_id))]
    const moduleIds = [...new Set(data.map((d) => d.module_id))]

    const [{ data: profiles }, { data: modules }] = await Promise.all([
      supabase.from('profiles').select('id, full_name').in('id', userIds),
      supabase.from('modules').select('id, title').in('id', moduleIds),
    ])

    const profileMap: Record<string, string> = {}
    for (const p of profiles || []) profileMap[p.id] = p.full_name || 'Unknown'

    const moduleMap: Record<string, string> = {}
    for (const m of modules || []) moduleMap[m.id] = m.title

    const reflections = data.map((entry) => ({
      memberName: profileMap[entry.user_id] || 'Unknown',
      moduleTitle: moduleMap[entry.module_id] || 'Unknown Module',
      reflection: entry.reflection,
      completedAt: entry.completed_at,
    }))

    return { success: true, data: reflections }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Correlation between module completion and KPI improvement over last 30 days.
 */
export async function fetchContentImpact() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

    // Get users who completed modules in last 30 days
    const { data: recentProgress } = await supabase
      .from('member_progress')
      .select('user_id, module_id, completed_at')
      .gte('completed_at', thirtyDaysAgo)

    const activeUserIds = [...new Set((recentProgress || []).map((p) => p.user_id))]
    const modulesCompleted = recentProgress?.length || 0

    if (activeUserIds.length === 0) {
      return {
        success: true,
        data: { modulesCompleted: 0, avgCollectionsChange: 0, avgNewPatientsChange: 0 },
      }
    }

    // For each active user, compare KPI before and after the 30-day window
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()

    const { data: kpiEntries } = await supabase
      .from('kpi_entries')
      .select('user_id, week_start_date, collections, new_patients')
      .in('user_id', activeUserIds)
      .gte('week_start_date', sixtyDaysAgo)
      .order('week_start_date', { ascending: true })

    let totalCollectionsChange = 0
    let totalNewPatientsChange = 0
    let usersWithData = 0

    for (const userId of activeUserIds) {
      const userKPIs = (kpiEntries || []).filter((k) => k.user_id === userId)
      if (userKPIs.length < 2) continue

      // Split into before/after the 30-day mark
      const before = userKPIs.filter((k) => k.week_start_date < thirtyDaysAgo)
      const after = userKPIs.filter((k) => k.week_start_date >= thirtyDaysAgo)

      if (before.length === 0 || after.length === 0) continue

      const avgCollBefore = before.reduce((s, k) => s + (k.collections || 0), 0) / before.length
      const avgCollAfter = after.reduce((s, k) => s + (k.collections || 0), 0) / after.length
      const avgNPBefore = before.reduce((s, k) => s + (k.new_patients || 0), 0) / before.length
      const avgNPAfter = after.reduce((s, k) => s + (k.new_patients || 0), 0) / after.length

      totalCollectionsChange += avgCollAfter - avgCollBefore
      totalNewPatientsChange += avgNPAfter - avgNPBefore
      usersWithData++
    }

    return {
      success: true,
      data: {
        modulesCompleted,
        avgCollectionsChange: usersWithData > 0
          ? Math.round(totalCollectionsChange / usersWithData)
          : 0,
        avgNewPatientsChange: usersWithData > 0
          ? Math.round((totalNewPatientsChange / usersWithData) * 10) / 10
          : 0,
      },
    }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
