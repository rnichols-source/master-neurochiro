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

  console.log(`[CURRICULUM] Found ${weeks?.length || 0} weeks`)

  // Fetch user progress
  const { data: progress, error: progressError } = await supabase
    .from('progress')
    .select('module_id, completed_at')
    .eq('user_id', user.id)

  if (progressError) {
    if (progressError.code === 'PGRST205' || progressError.message.includes('not find')) {
      console.warn('[CURRICULUM] Progress table missing, defaulting to empty progress')
    } else {
      console.error('[CURRICULUM] Progress fetch error:', progressError.message)
      // We continue with empty progress if it's just a missing table for now
    }
  }

  const userProgress = progress || []
  console.log(`[CURRICULUM] Found ${userProgress.length} completed modules for user ${user.id}`)

  // Fetch all modules to check completion per week
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('id, week_id')

  if (modulesError) {
    console.error('[CURRICULUM] Modules fetch error:', modulesError.message)
    return { success: false, error: modulesError.message }
  }

  console.log(`[CURRICULUM] Found ${modules?.length || 0} total modules`)

  const completedModuleIds = new Set(userProgress.map(p => p.module_id))

  // Determine status for each week
  // Logic: Week 1 is active by default. 
  // Week N is active if Week N-1 is completed.
  // A week is completed if all its modules are in the progress table.
  
  const formattedWeeks = weeks.map((week, index) => {
    const weekModules = modules.filter(m => m.week_id === week.id)
    const isCompleted = weekModules.length > 0 && weekModules.every(m => completedModuleIds.has(m.id))
    
    let status: 'locked' | 'active' | 'completed' = 'locked'
    
    if (isCompleted) {
      status = 'completed'
    } else if (index === 0) {
      status = 'active'
    } else {
      // Check if previous week is completed
      const prevWeek = weeks[index - 1]
      const prevWeekModules = modules.filter(m => m.week_id === prevWeek.id)
      const prevWeekCompleted = prevWeekModules.length > 0 && prevWeekModules.every(m => completedModuleIds.has(m.id))
      
      if (prevWeekCompleted) {
        status = 'active'
      }
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

  // Fetch week
  const { data: week, error: weekError } = await supabase
    .from('weeks')
    .select('*')
    .eq('slug', slug)
    .single()

  if (weekError) return { success: false, error: weekError.message }

  // Fetch modules for this week
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('*')
    .eq('week_id', week.id)
    .order('order_index', { ascending: true })

  if (modulesError) return { success: false, error: modulesError.message }

  // Fetch progress for these modules
  const { data: progress, error: progressError } = await supabase
    .from('progress')
    .select('module_id')
    .eq('user_id', user.id)
    .in('module_id', modules.map(m => m.id))

  if (progressError) return { success: false, error: progressError.message }

  const completedModuleIds = new Set(progress.map(p => p.module_id))

  const formattedModules = modules.map((mod, index) => {
    const isCompleted = completedModuleIds.has(mod.id)
    let status: 'locked' | 'active' | 'completed' = 'locked'

    if (isCompleted) {
      status = 'completed'
    } else if (index === 0 || completedModuleIds.has(modules[index - 1]?.id)) {
      status = 'active'
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
    .from('progress')
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

  // Get all modules for this week
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('id')
    .eq('week_id', weekId)

  if (modulesError) return { success: false, error: modulesError.message }
  if (!modules || modules.length === 0) return { success: false, error: 'No modules found for this phase' }

  // Mark all as completed
  const progressEntries = modules.map(m => ({
    user_id: user.id,
    module_id: m.id,
    completed_at: new Date().toISOString()
  }))

  const { error } = await supabase
    .from('progress')
    .upsert(progressEntries, { onConflict: 'user_id,module_id' })

  if (error) return { success: false, error: error.message }

  revalidatePath('/portal/curriculum')
  return { success: true }
}

export async function fetchResources() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  // Fetch profile to check tier
  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single()

  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin'

  try {
    let query = supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    // If not pro, filter out pro-only resources
    if (!isPro) {
      query = query.eq('is_pro_only', false)
    }

    const { data, error } = await query

    if (error) {
      if (error.code === 'PGRST205' || error.message.includes('not find')) {
        console.warn('Resources table missing, using mock data');
        return { 
          success: true, 
          data: [
            { id: '1', title: 'Phase 01: Identity Audit Worksheet', type: 'pdf', url: '#', is_pro_only: false, created_at: new Date().toISOString() },
            { id: '2', title: 'Clinical Certainty Scripts V1', type: 'pdf', url: '#', is_pro_only: false, created_at: new Date().toISOString() },
            { id: '3', title: 'Neuro-Real Scan Talk Tutorial', type: 'video', url: '#', is_pro_only: true, created_at: new Date().toISOString() },
          ].filter(r => isPro || !r.is_pro_only)
        }
      }
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    return { success: false, error: 'Failed to fetch resources' }
  }
}
