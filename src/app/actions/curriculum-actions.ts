'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function fetchCurriculumWithProgress() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    console.log('[CURRICULUM] Fetch failed: Not authenticated')
    return { success: false, error: 'Not authenticated' }
  }

  // Fetch all weeks
  const { data: weeks, error: weeksError } = await supabase
    .from('weeks')
    .select('*')
    .order('week_number', { ascending: true })

  if (weeksError) {
    console.error('[CURRICULUM] Weeks fetch error:', weeksError.message)
    return { success: false, error: weeksError.message }
  }

  // Fetch user progress
  let completedModuleIds = new Set<string>()
  try {
    const { data: progress, error: progressError } = await supabase
      .from('member_progress')
      .select('module_id')
      .eq('user_id', user.id)

    if (progress && !progressError) {
      completedModuleIds = new Set(progress.map(p => p.module_id))
    }
  } catch (err) {
    console.warn('[CURRICULUM] Progress fetch failed, continuing with empty progress')
  }

  // Fetch all modules
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('id, week_id')

  if (modulesError) {
    console.error('[CURRICULUM] Modules fetch error:', modulesError.message)
    return { success: false, error: modulesError.message }
  }

  // Fetch user profile for tier check
  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single()
  
  const isAdmin = profile?.tier === 'admin'

  // Determine status for each week
  const formattedWeeks = weeks.map((week, index) => {
    const weekModules = modules.filter(m => m.week_id === week.id)
    const isCompleted = weekModules.length > 0 && weekModules.every(m => completedModuleIds.has(m.id))
    
    let status: 'locked' | 'active' | 'completed' = 'locked'
    
    if (isCompleted) {
      status = 'completed'
    } else if (index === 0) {
      status = 'active'
    } else {
      const prevWeek = weeks[index - 1]
      const prevWeekModules = modules.filter(m => m.week_id === prevWeek.id)
      const prevWeekCompleted = prevWeekModules.length > 0 && prevWeekModules.every(m => completedModuleIds.has(m.id))
      
      if (prevWeekCompleted) {
        status = 'active'
      }
    }

    // OVERRIDE: Unlock Week 6 specifically for the current mastermind phase
    // ALSO: Unlock all weeks for admins
    if (isAdmin || week.week_number <= 6) {
      if (status === 'locked') status = 'active'
    }

    return {
      ...week,
      status
    }
  })

  return { success: true, data: formattedWeeks }
}

export async function fetchWeekDetail(slug: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  // 1. Fetch week
  const { data: week, error: weekError } = await supabase
    .from('weeks')
    .select('*')
    .eq('slug', slug)
    .single()

  if (weekError || !week) {
    console.error(`[CURRICULUM] Week not found for slug: ${slug}`, weekError)
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
    return { success: false, error: modulesError.message }
  }

  // 3. Fetch progress (With resilience)
  let completedModuleIds = new Set<string>()
  try {
    const { data: progress } = await supabase
      .from('member_progress')
      .select('module_id')
      .eq('user_id', user.id)
      .in('module_id', modules.map(m => m.id))

    if (progress) {
      completedModuleIds = new Set(progress.map(p => p.module_id))
    }
  } catch (err) {
    console.warn('[CURRICULUM] Progress fetch failed in Detail, continuing...')
  }

  const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single()
  const isAdmin = profile?.tier === 'admin'

  const formattedModules = modules.map((mod, index) => {
    const isCompleted = completedModuleIds.has(mod.id)
    let status: 'locked' | 'active' | 'completed' = 'locked'

    if (isCompleted) {
      status = 'completed'
    } else if (index === 0 || completedModuleIds.has(modules[index - 1]?.id)) {
      status = 'active'
    }

    // OVERRIDE: Unlock for admins or for current focused weeks
    if (isAdmin || week.week_number <= 6) {
      if (status === 'locked') status = 'active'
    }

    return {
      ...mod,
      status
    }
  })

  return { 
    success: true, 
    data: { 
      week, 
      modules: formattedModules 
    } 
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

  revalidatePath('/portal/curriculum')
  return { success: true }
}

export async function verifyPhase(weekId: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  // Get all modules
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('id')
    .eq('week_id', weekId)

  if (modulesError) return { success: false, error: modulesError.message }
  if (!modules || modules.length === 0) return { success: false, error: 'No modules found' }

  const progressEntries = modules.map(m => ({
    user_id: user.id,
    module_id: m.id,
    completed_at: new Date().toISOString()
  }))

  const { error } = await supabase
    .from('member_progress')
    .upsert(progressEntries, { onConflict: 'user_id,module_id' })

  if (error) return { success: false, error: error.message }

  revalidatePath('/portal/curriculum')
  return { success: true }
}

export async function fetchResources() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single()
  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin'

  try {
    const { data, error } = await supabase.from('resources').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return { success: true, data: data.filter(r => isPro || !r.is_pro_only) }
  } catch (err) {
    return { success: true, data: [] } // Safe fallback
  }
}
