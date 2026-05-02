'use server'
import { createClient } from '@/lib/supabase/server'
import { checkAdmin } from '@/app/actions/agent-actions'

export async function fetchPipelineFunnel() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const [
      { count: total },
      { count: approved },
      { count: rejected },
      { count: pending },
      { count: converted },
    ] = await Promise.all([
      supabase.from('applications').select('*', { count: 'exact', head: true }),
      supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
      supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
      supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).in('tier', ['standard', 'pro']),
    ])

    // Engaged = converted members with health_score >= 40
    const { count: engaged } = await supabase
      .from('profiles')
      .select(`
        id,
        member_health!inner (
          health_score
        )
      `, { count: 'exact', head: true })
      .in('tier', ['standard', 'pro'])
      .gte('member_health.health_score', 40)

    return {
      success: true,
      data: {
        total: total || 0,
        pending: pending || 0,
        approved: approved || 0,
        rejected: rejected || 0,
        converted: converted || 0,
        engaged: engaged || 0,
      },
    }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function fetchApplicationQueue() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const { data: applications, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return { success: false, error: error.message }

    const scored = (applications || []).map((app: any) => {
      const r = app.responses || {}
      let fitScore = 10 // base

      // +30 if application_type is Mastermind or Private Coaching
      const appType = r.application_type || ''
      if (appType === 'Mastermind' || appType === 'Private Coaching') fitScore += 30

      // +20 if role is doctor or clinic_owner
      const role = (r.current_role || '').toLowerCase()
      if (role.includes('doctor') || role.includes('clinic owner') || role.includes('chiropractor')) fitScore += 20

      // +15 if goals field length > 100 (map to success_vision or success_goals)
      const goals = r.success_vision || r.life_impact || ''
      if (goals.length > 100) fitScore += 15

      // +15 if pain_points field length > 100 (map to not_working_description or biggest_struggle)
      const painPoints = r.not_working_description || r.biggest_struggle || ''
      if (painPoints.length > 100) fitScore += 15

      // +10 if current_situation field length > 50 (map to why_now)
      const currentSituation = r.why_now || ''
      if (currentSituation.length > 50) fitScore += 10

      return {
        id: app.id,
        full_name: app.full_name,
        email: app.email,
        status: app.status,
        created_at: app.created_at,
        score: app.score,
        fitScore: Math.min(fitScore, 100),
        role: r.current_role || 'Unknown',
        type: r.application_type || 'Mastermind',
        goals,
        painPoints,
        currentSituation,
      }
    })

    // Sort: pending first sorted by fitScore desc, then others by created_at desc
    const pendingApps = scored
      .filter((a: any) => a.status === 'pending')
      .sort((a: any, b: any) => b.fitScore - a.fitScore)
    const otherApps = scored
      .filter((a: any) => a.status !== 'pending')
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return { success: true, data: [...pendingApps, ...otherApps] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function generateOutreachDraft(applicationId: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const { data: app, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .single()

    if (error || !app) return { success: false, error: 'Application not found' }

    const r = app.responses || {}
    const firstName = (app.full_name || '').split(' ')[0]
    const painPoints = r.not_working_description || r.biggest_struggle || 'growing your practice'
    const goals = r.success_vision || r.life_impact || 'taking your practice to the next level'

    let subject = ''
    let body = ''

    if (app.status === 'pending') {
      subject = `Your NeuroChiro Mastermind Application`
      body = `Hi ${firstName}, thanks for applying to the NeuroChiro Mastermind. I read through your application and your note about "${painPoints.substring(0, 120).trim()}" really stood out to me. That's exactly what we work on inside the program.\n\nThe doctors who get the biggest breakthroughs are the ones who are honest about where they're stuck — and you clearly are. I'd love to chat more about your goals around "${goals.substring(0, 100).trim()}" and see if the Mastermind is the right fit.\n\nWould you be open to a quick call this week?\n\n— Dr. Ray`
    } else if (app.status === 'approved') {
      subject = `You're Approved — Welcome to the NeuroChiro Mastermind`
      body = `Hi ${firstName}, great news — you're approved for the NeuroChiro Mastermind! Based on what you shared about "${goals.substring(0, 120).trim()}", I think you're going to get a lot out of this.\n\nHere's what happens next:\n1. Complete your enrollment (link below)\n2. Get access to the member portal\n3. Join our next live session\n\nThe fact that you're taking action on this tells me a lot about where you're headed. Let's build something great.\n\n— Dr. Ray`
    } else {
      subject = `Following Up — NeuroChiro`
      body = `Hi ${firstName}, I wanted to follow up on your application to the NeuroChiro Mastermind. I noticed your interest in "${goals.substring(0, 100).trim()}" and wanted to see if there's another way we can support you right now.\n\nWould a quick call be helpful?\n\n— Dr. Ray`
    }

    return { success: true, data: { subject, body } }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function fetchConversionInsights() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    // Get all profiles (converted members)
    const { data: profiles } = await supabase
      .from('profiles')
      .select('email, tier')
      .in('tier', ['standard', 'pro'])

    const convertedEmails = new Set((profiles || []).map((p: any) => p.email?.toLowerCase()))

    // Get all applications
    const { data: applications } = await supabase
      .from('applications')
      .select('email, responses')

    const converted: any[] = []
    const unconverted: any[] = []

    for (const app of applications || []) {
      const r = app.responses || {}
      const entry = {
        goalsLength: (r.success_vision || r.life_impact || '').length,
        painPointsLength: (r.not_working_description || r.biggest_struggle || '').length,
        role: r.current_role || 'Unknown',
        type: r.application_type || 'Mastermind',
      }

      if (convertedEmails.has(app.email?.toLowerCase())) {
        converted.push(entry)
      } else {
        unconverted.push(entry)
      }
    }

    const analyze = (list: any[]) => {
      if (list.length === 0) return { avgGoalsLength: 0, avgPainPointsLength: 0, topRole: 'N/A', topType: 'N/A', count: 0 }

      const avgGoalsLength = Math.round(list.reduce((s, e) => s + e.goalsLength, 0) / list.length)
      const avgPainPointsLength = Math.round(list.reduce((s, e) => s + e.painPointsLength, 0) / list.length)

      // Most common role
      const roleCounts: Record<string, number> = {}
      const typeCounts: Record<string, number> = {}
      for (const e of list) {
        roleCounts[e.role] = (roleCounts[e.role] || 0) + 1
        typeCounts[e.type] = (typeCounts[e.type] || 0) + 1
      }
      const topRole = Object.entries(roleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
      const topType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

      return { avgGoalsLength, avgPainPointsLength, topRole, topType, count: list.length }
    }

    return {
      success: true,
      data: {
        converted: analyze(converted),
        unconverted: analyze(unconverted),
      },
    }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
