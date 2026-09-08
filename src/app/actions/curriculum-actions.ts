'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { awardMasteryPoints } from './mastery-actions'

export async function fetchCurriculumWithProgress() {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    // Fetch user profile for tier + track + cohort
    let isAdmin = false
    let userTrack = 'doctor'
    let cohortStartDate: string | null = null
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('tier, track, cohort_id')
        .eq('id', user.id)
        .single()
      isAdmin = profile?.tier === 'admin'
      userTrack = profile?.track || 'doctor'

      // Get cohort start date if assigned
      if (profile?.cohort_id) {
        const { data: cohort } = await supabase
          .from('cohorts')
          .select('start_date, name')
          .eq('id', profile.cohort_id)
          .single()
        cohortStartDate = cohort?.start_date || null
      }
    } catch (e) {}

    // Determine which program to show based on cohort
    // Legacy Cohort 2 members see the old 8-week structure
    // New members see Above Atlas 12-week
    const program = isAdmin ? 'above-atlas' : 'above-atlas'
    // TODO: When Cohort 2 members need legacy view, filter by program = 'legacy'

    // Fetch weeks for user's track and program
    let weeksQuery = supabase
      .from('weeks')
      .select('*')
      .order('week_number', { ascending: true })

    // Admins see all Above Atlas weeks; members see their track
    if (!isAdmin) {
      weeksQuery = weeksQuery.eq('track', userTrack).eq('program', program)
    } else {
      weeksQuery = weeksQuery.eq('program', program)
    }

    const { data: weeks, error: weeksError } = await weeksQuery

    if (weeksError) {
      console.error('[CURRICULUM] Weeks fetch error:', weeksError.message)
      return { success: false, error: weeksError.message }
    }

    // Fetch user progress
    let completedModuleIds = new Set<string>()
    try {
      const { data: progress } = await supabase
        .from('member_progress')
        .select('module_id')
        .eq('user_id', user.id)

      if (progress) {
        completedModuleIds = new Set(progress.map(p => p.module_id))
      }
    } catch (err) {
      console.warn('[CURRICULUM] Progress fetch failed, continuing...')
    }

    // Fetch rep submissions for this user
    let repSubmissions = new Map<number, string>()
    try {
      const weekIds = (weeks || []).map(w => w.id)
      if (weekIds.length > 0) {
        const { data: reps } = await supabase
          .from('rep_submissions')
          .select('week_id, status')
          .eq('user_id', user.id)
          .in('week_id', weekIds)
        if (reps) {
          reps.forEach(r => repSubmissions.set(r.week_id, r.status))
        }
      }
    } catch (err) {}

    // Fetch all modules for these weeks
    const weekIds = (weeks || []).map(w => w.id)
    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('id, week_id')
      .in('week_id', weekIds.length > 0 ? weekIds : [0])

    if (modulesError) {
      console.error('[CURRICULUM] Modules fetch error:', modulesError.message)
      return { success: false, error: modulesError.message }
    }

    // Determine unlock based on cohort start date
    const startDate = cohortStartDate
      ? new Date(cohortStartDate)
      : new Date('2026-04-21T00:00:00-04:00')
    const now = new Date()
    const msPerWeek = 7 * 24 * 60 * 60 * 1000
    const weeksSinceStart = Math.floor((now.getTime() - startDate.getTime()) / msPerWeek)
    const maxUnlockedWeek = Math.max(0, weeksSinceStart + 1)

    // Determine status for each week
    // A week is "completed" when the rep is submitted, NOT when modules are watched
    const formattedWeeks = (weeks || []).map((week: any) => {
      const repStatus = repSubmissions.get(week.id)
      const hasRepSubmission = !!repStatus

      let status: 'locked' | 'active' | 'completed' = 'locked'

      if (hasRepSubmission) {
        status = 'completed'
      } else if (week.week_number <= maxUnlockedWeek) {
        status = 'active'
      }

      if (isAdmin && status === 'locked') {
        status = 'active'
      }

      return {
        ...week,
        status,
        rep_status: repStatus || null,
      }
    })

    return { success: true, data: formattedWeeks }
  } catch (err: any) {
    console.error('[CURRICULUM] Global crash in fetchCurriculumWithProgress:', err.message)
    return { success: false, error: 'Internal system error' }
  }
}

export async function fetchWeekDetail(slug: string) {
  try {
    console.log(`[CURRICULUM] Fetching detail for: ${slug}`)
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    // 1. Fetch week
    const { data: week, error: weekError } = await supabase
      .from('weeks')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (weekError || !week) {
      console.error(`[CURRICULUM] Week not found for slug: ${slug}`, weekError?.message)
      return { success: false, error: 'Week not found' }
    }

    // 2. Fetch modules
    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('*')
      .eq('week_id', week.id)
      .order('order_index', { ascending: true })

    if (modulesError) {
      console.error('[CURRICULUM] Modules fetch error:', modulesError.message)
      return { success: false, error: 'Error fetching modules' }
    }

    // 3. Fetch resources (Linked to week OR any module in the week)
    let resources = []
    try {
      const moduleIds = modules?.map(m => m.id) || []
      const { data: resData } = await supabase
        .from('resources')
        .select('*')
        .or(`week_id.eq.${week.id},module_id.in.(${moduleIds.join(',')})`)
      if (resData) resources = resData
    } catch (e) {
      console.warn('[CURRICULUM] Resources fetch failed:', e)
    }

    // 4. Fetch progress
    let completedModuleIds = new Set<string>()
    try {
      const { data: progress } = await supabase
        .from('member_progress')
        .select('module_id')
        .eq('user_id', user.id)
        .in('module_id', (modules || []).map(m => m.id))

      if (progress) {
        completedModuleIds = new Set(progress.map(p => p.module_id))
      }
    } catch (err) {}

    let isAdmin = false
    try {
      const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single()
      isAdmin = profile?.tier === 'admin'
    } catch (e) {}

    // Check if this week is unlocked based on cohort date
    const COHORT_START = new Date('2026-04-21T00:00:00-04:00')
    const now = new Date()
    const msPerWeek = 7 * 24 * 60 * 60 * 1000
    const weeksSinceStart = Math.floor((now.getTime() - COHORT_START.getTime()) / msPerWeek)
    const maxUnlockedWeek = Math.max(0, weeksSinceStart + 1)
    const weekIsUnlocked = isAdmin || week.week_number <= maxUnlockedWeek

    const formattedModules = (modules || []).map((mod, index) => {
      const isCompleted = completedModuleIds.has(mod.id)
      let status: 'locked' | 'active' | 'completed' = 'locked'

      if (isCompleted) {
        status = 'completed'
      } else if (weekIsUnlocked && (index === 0 || (modules[index - 1] && completedModuleIds.has(modules[index - 1].id)))) {
        status = 'active'
      }

      // Admins see all modules as active
      if (isAdmin && status === 'locked') {
        status = 'active'
      }

      return { ...mod, status }
    })

    return { 
      success: true, 
      data: { week, modules: formattedModules, resources } 
    }
  } catch (err: any) {
    console.error('[CURRICULUM] Global crash in fetchWeekDetail:', err.message)
    return { success: false, error: 'Internal system error' }
  }
}

export async function completeModule(moduleId: string, reflection?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const { error } = await supabase
    .from('member_progress')
    .upsert({
      user_id: user.id,
      module_id: moduleId,
      reflection,
      completed_at: new Date().toISOString()
    }, { onConflict: 'user_id,module_id' })

  if (error) return { success: false, error: error.message }
  
  // Award Points
  await awardMasteryPoints('module_complete');
  
  revalidatePath('/portal/curriculum')
  return { success: true }
}

export async function verifyPhase(weekId: number) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('id')
      .eq('week_id', weekId)

    if (modulesError) throw modulesError
    if (!modules || modules.length === 0) return { success: false, error: 'No modules' }

    const progressEntries = modules.map(m => ({
      user_id: user.id,
      module_id: m.id,
      completed_at: new Date().toISOString()
    }))

    const { error: upsertError } = await supabase
      .from('member_progress')
      .upsert(progressEntries, { onConflict: 'user_id,module_id' })

    if (upsertError) throw upsertError

    // Award Points for Status Claim
    await awardMasteryPoints('status_claim');

    revalidatePath('/portal/curriculum')
    return { success: true }
  } catch (err: any) {
    console.error('[CURRICULUM] Verify phase failed:', err.message)
    return { success: false, error: err.message }
  }
}

// =============================================================================
// REP SUBMISSIONS — Core mechanic of Above Atlas
// A week completes on rep-submitted, NOT on video-watched.
// =============================================================================

export async function submitRep(weekId: number, content: string, attachmentUrl?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  if (!content || content.trim().length < 10) {
    return { success: false, error: 'Rep submission must be at least 10 characters.' }
  }

  const { data, error } = await supabase
    .from('rep_submissions')
    .upsert({
      user_id: user.id,
      week_id: weekId,
      content: content.trim(),
      attachment_url: attachmentUrl || null,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,week_id' })
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  await awardMasteryPoints('status_claim')
  revalidatePath('/portal/curriculum')
  return { success: true, data }
}

export async function fetchRepForWeek(weekId: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('rep_submissions')
    .select('*')
    .eq('user_id', user.id)
    .eq('week_id', weekId)
    .maybeSingle()

  if (error) return { success: false, error: error.message }
  return { success: true, data }
}

// Admin: Fetch all rep submissions for a week (or all weeks)
export async function fetchAllReps(weekId?: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  // Verify admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single()
  if (profile?.tier !== 'admin') return { success: false, error: 'Unauthorized' }

  let query = supabase
    .from('rep_submissions')
    .select(`
      *,
      profiles:user_id (full_name, email, track),
      weeks:week_id (title, week_number, track)
    `)
    .order('submitted_at', { ascending: false })

  if (weekId) {
    query = query.eq('week_id', weekId)
  }

  const { data, error } = await query
  if (error) return { success: false, error: error.message }
  return { success: true, data }
}

// Admin: Review a rep submission
export async function reviewRep(repId: string, status: 'reviewed' | 'needs_revision', feedback: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single()
  if (profile?.tier !== 'admin') return { success: false, error: 'Unauthorized' }

  const { error } = await supabase
    .from('rep_submissions')
    .update({
      status,
      admin_feedback: feedback,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', repId)

  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/reps')
  return { success: true }
}

export async function fetchResources() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single()
    const isPro = profile?.tier === 'pro' || profile?.tier === 'admin'

    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('[RESOURCES] Fetch error:', error.message)
      return { success: true, data: [] }
    }

    return { success: true, data: data.filter(r => isPro || !r.is_pro_only) }
  } catch (err) {
    return { success: true, data: [] }
  }
}
