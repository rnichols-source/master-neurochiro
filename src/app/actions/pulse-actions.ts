'use server'
import { createClient } from '@/lib/supabase/server'
import { checkAdmin } from '@/app/actions/agent-actions'

export async function fetchRetentionIntelligence() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    // Get all members with health data
    const { data: members, error } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        email,
        tier,
        status,
        created_at,
        member_health (
          health_score,
          risk_level,
          modules_completed,
          kpis_submitted
        )
      `)
      .in('tier', ['standard', 'pro'])

    if (error) return { success: false, error: error.message }

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()

    // Get last activity per member (latest KPI entry)
    const memberIds = (members || []).map((m: any) => m.id)

    const { data: recentKpis } = await supabase
      .from('kpi_entries')
      .select('user_id, week_start_date, collections, new_patients, patient_visits')
      .in('user_id', memberIds)
      .gte('week_start_date', fourWeeksAgo)
      .order('week_start_date', { ascending: false })

    // Build KPI map: user_id -> entries (last 4 weeks)
    const kpiMap: Record<string, any[]> = {}
    for (const entry of recentKpis || []) {
      if (!kpiMap[entry.user_id]) kpiMap[entry.user_id] = []
      kpiMap[entry.user_id].push(entry)
    }

    // Get last activity dates (latest KPI or module completion)
    const { data: lastProgress } = await supabase
      .from('member_progress')
      .select('user_id, completed_at')
      .in('user_id', memberIds)
      .order('completed_at', { ascending: false })

    const lastActivityMap: Record<string, string> = {}
    for (const p of lastProgress || []) {
      if (!lastActivityMap[p.user_id]) lastActivityMap[p.user_id] = p.completed_at
    }
    for (const k of recentKpis || []) {
      const current = lastActivityMap[k.user_id]
      if (!current || k.week_start_date > current) {
        lastActivityMap[k.user_id] = k.week_start_date
      }
    }

    // Categorize members
    let active = 0, coasting = 0, atRisk = 0, churned = 0
    const memberList = (members || []).map((m: any) => {
      const health = Array.isArray(m.member_health) ? m.member_health[0] : m.member_health
      const healthScore = health?.health_score ?? 0
      const lastActivity = lastActivityMap[m.id] || m.created_at
      const isInactive = !lastActivityMap[m.id] || lastActivityMap[m.id] < thirtyDaysAgo
      const isChurned = isInactive || m.status !== 'active'

      let riskLevel: string
      if (isChurned) {
        riskLevel = 'churned'
        churned++
      } else if (healthScore >= 70) {
        riskLevel = 'active'
        active++
      } else if (healthScore >= 40) {
        riskLevel = 'coasting'
        coasting++
      } else {
        riskLevel = 'at-risk'
        atRisk++
      }

      // Determine trend from KPI entries
      const entries = kpiMap[m.id] || []
      let trend: 'up' | 'down' | 'flat' = 'flat'
      if (entries.length >= 2) {
        const recent = entries[0].collections ?? 0
        const previous = entries[1].collections ?? 0
        if (recent > previous) trend = 'up'
        else if (recent < previous) trend = 'down'
      }

      return {
        id: m.id,
        full_name: m.full_name,
        email: m.email,
        tier: m.tier,
        health_score: healthScore,
        risk_level: riskLevel,
        last_activity: lastActivity,
        modules_completed: health?.modules_completed ?? 0,
        kpis_submitted: health?.kpis_submitted ?? 0,
        trend,
      }
    })

    return {
      success: true,
      data: {
        summary: { active, coasting, atRisk, churned },
        members: memberList,
      },
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch retention data' }
  }
}

export async function fetchMemberTimeline(userId: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const [
      { data: progress },
      { data: kpis },
      { data: messages },
      { data: notes },
    ] = await Promise.all([
      supabase
        .from('member_progress')
        .select('completed_at, modules(title)')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false }),
      supabase
        .from('kpi_entries')
        .select('week_start_date, collections, new_patients, patient_visits')
        .eq('user_id', userId)
        .order('week_start_date', { ascending: false }),
      supabase
        .from('direct_messages')
        .select('created_at, sender_id, recipient_id')
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('coaching_notes')
        .select('created_at, note')
        .eq('user_id', userId)
        .order('created_at', { ascending: false }),
    ])

    const timeline: { type: string; title: string; date: string; detail: string }[] = []

    for (const p of progress || []) {
      const mod = p.modules as any
      timeline.push({
        type: 'module',
        title: 'Module Completed',
        date: p.completed_at,
        detail: mod?.title || 'Unknown module',
      })
    }

    for (const k of kpis || []) {
      timeline.push({
        type: 'kpi',
        title: 'KPI Submitted',
        date: k.week_start_date,
        detail: `Collections: $${k.collections?.toLocaleString() ?? 0} | NP: ${k.new_patients ?? 0} | Visits: ${k.patient_visits ?? 0}`,
      })
    }

    for (const m of messages || []) {
      const direction = m.sender_id === userId ? 'sent' : 'received'
      timeline.push({
        type: 'message',
        title: `Message ${direction}`,
        date: m.created_at,
        detail: direction === 'sent' ? 'Member sent a message' : 'Received a message from admin',
      })
    }

    for (const n of notes || []) {
      timeline.push({
        type: 'note',
        title: 'Coaching Note',
        date: n.created_at,
        detail: n.note?.substring(0, 120) || '',
      })
    }

    // Sort descending by date, limit 30
    timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const limited = timeline.slice(0, 30)

    return { success: true, data: limited }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch timeline' }
  }
}

export async function generateNudgeMessage(userId: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const [
      { data: profile },
      { data: health },
      { data: lastKpi },
      { data: lastProgress },
    ] = await Promise.all([
      supabase.from('profiles').select('full_name').eq('id', userId).single(),
      supabase.from('member_health').select('*').eq('user_id', userId).single(),
      supabase
        .from('kpi_entries')
        .select('*')
        .eq('user_id', userId)
        .order('week_start_date', { ascending: false })
        .limit(2),
      supabase
        .from('member_progress')
        .select('completed_at, modules(title)')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(1),
    ])

    const firstName = profile?.full_name?.split(' ')[0] || 'there'
    const lastModule = (lastProgress as any)?.[0]?.modules?.title

    // Determine situation and generate message
    let message: string
    let context: string

    const kpiEntries = lastKpi || []
    const hasKpiDecline = kpiEntries.length >= 2 &&
      (kpiEntries[0].collections ?? 0) < (kpiEntries[1].collections ?? 0)

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const lastActivity = lastProgress?.[0]?.completed_at || kpiEntries[0]?.week_start_date
    const isGoneSilent = !lastActivity || lastActivity < thirtyDaysAgo

    if (isGoneSilent) {
      message = `Hey ${firstName}, haven't heard from you in a bit. Everything good? The group misses your energy. Let me know if there's anything I can help with — even a quick 5-minute check-in can get the momentum going again.`
      context = 'Member has been inactive for 30+ days'
    } else if (hasKpiDecline) {
      message = `Hey ${firstName}, I see your numbers dipped this week. That's totally normal — every practice has ebbs and flows. Let's talk about what's going on and see if we can tweak the strategy. Sometimes one small adjustment changes everything.`
      context = `KPIs declined: collections went from $${kpiEntries[1]?.collections?.toLocaleString() ?? 0} to $${kpiEntries[0]?.collections?.toLocaleString() ?? 0}`
    } else if (lastModule) {
      message = `Hey ${firstName}, I noticed you left off at "${lastModule}". That's actually one of the most impactful modules in the curriculum — the doctors who implement it see results fast. Want to carve out 15 minutes this week to knock it out?`
      context = `Stalled on curriculum at: ${lastModule}`
    } else {
      message = `Hey ${firstName}, just checking in. How are things going at the practice? I'd love to hear what's working and where you could use some support. Let's connect this week.`
      context = 'General check-in — no specific trigger identified'
    }

    return { success: true, data: { message, context } }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to generate nudge' }
  }
}

export async function sendNudge(userId: string, message: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const { error: msgError } = await supabase.from('direct_messages').insert([
      { sender_id: user.id, recipient_id: userId, content: message },
    ])

    if (msgError) return { success: false, error: msgError.message }

    // Create notification for the member
    const { createNotification } = await import('@/app/actions/notification-actions')
    await createNotification(
      userId,
      'New Message',
      'Dr. Nichols sent you a message',
      'message',
      '/portal/pro/messages'
    )

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to send nudge' }
  }
}
