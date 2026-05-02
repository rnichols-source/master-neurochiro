'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdmin } from '@/app/actions/agent-actions'

export async function fetchCommunicationsDashboard() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const [
      { count: unreadDMs },
      { count: pendingReviews },
      { data: recentDMs },
      { data: recentReviews },
    ] = await Promise.all([
      supabase
        .from('direct_messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', user.id)
        .eq('is_read', false),
      supabase
        .from('script_reviews')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending'),
      supabase
        .from('direct_messages')
        .select('id, content, created_at, sender_id, profiles!direct_messages_sender_id_fkey(full_name, email)')
        .eq('recipient_id', user.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('script_reviews')
        .select('id, script_content, script_type, submitted_at, status, user_id, profiles!script_reviews_user_id_fkey(full_name, email)')
        .eq('status', 'pending')
        .order('submitted_at', { ascending: false })
        .limit(5),
    ])

    // Count distinct conversations
    const { data: convos } = await supabase
      .from('direct_messages')
      .select('sender_id')
      .eq('recipient_id', user.id)

    const distinctSenders = new Set((convos || []).map((m: any) => m.sender_id))
    const totalConversations = distinctSenders.size

    return {
      success: true,
      data: {
        unreadDMs: unreadDMs || 0,
        pendingReviews: pendingReviews || 0,
        totalConversations,
        recentDMs: recentDMs || [],
        recentReviews: recentReviews || [],
      },
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch communications dashboard' }
  }
}

export async function fetchUnifiedInbox() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const [{ data: dms }, { data: reviews }] = await Promise.all([
      supabase
        .from('direct_messages')
        .select('id, content, created_at, sender_id, profiles!direct_messages_sender_id_fkey(full_name, email)')
        .eq('recipient_id', user.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('script_reviews')
        .select('id, script_content, script_type, submitted_at, status, user_id, profiles!script_reviews_user_id_fkey(full_name, email)')
        .eq('status', 'pending')
        .order('submitted_at', { ascending: false })
        .limit(10),
    ])

    const dmItems = (dms || []).map((dm: any) => ({
      type: 'dm' as const,
      id: dm.id,
      content: dm.content,
      date: dm.created_at,
      senderName: dm.profiles?.full_name || 'Unknown',
      senderEmail: dm.profiles?.email || '',
      senderId: dm.sender_id,
    }))

    const reviewItems = (reviews || []).map((r: any) => ({
      type: 'review' as const,
      id: r.id,
      content: r.script_content,
      scriptType: r.script_type,
      date: r.submitted_at,
      senderName: r.profiles?.full_name || 'Unknown',
      senderEmail: r.profiles?.email || '',
      senderId: r.user_id,
    }))

    const merged = [...dmItems, ...reviewItems].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return { success: true, data: merged }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch unified inbox' }
  }
}

export async function generateDMResponse(messageContent: string, senderName: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const firstName = senderName.split(' ')[0]
    const lowerContent = messageContent.toLowerCase()
    let draft: string

    if (lowerContent.includes('schedule') || lowerContent.includes('appointment') || lowerContent.includes('time') || lowerContent.includes('calendar')) {
      draft = `Hey ${firstName}, great question! For scheduling, the best thing to do is check the calendar in your portal — you can book directly from there. If you're not seeing availability that works, shoot me a message and we'll make it happen. You're a priority.`
    } else if (lowerContent.includes('struggle') || lowerContent.includes('stuck') || lowerContent.includes('hard') || lowerContent.includes('help') || lowerContent.includes('progress') || lowerContent.includes('frustrated')) {
      draft = `Hey ${firstName}, appreciate you reaching out. Let's work through this together — that's what this mastermind is for. You're not alone in this, and the fact that you're being honest about where you're at tells me you're going to break through. Let's hop on a quick call this week and map out your next move.`
    } else if (lowerContent.includes('script') || lowerContent.includes('rof') || lowerContent.includes('consultation')) {
      draft = `Hey ${firstName}, thanks for the message! I love that you're putting in the work on your scripts. Submit it through the script review and I'll give you detailed feedback. The reps are what separate good from great.`
    } else {
      draft = `Hey ${firstName}, thanks for the message! I appreciate you being engaged in the mastermind — that's how you get the most out of it. Let me take a look at this and I'll get back to you with some thoughts.`
    }

    return { success: true, data: { draft } }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to generate response' }
  }
}

export async function generateScriptFeedback(scriptContent: string, scriptType: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const typeLabel = scriptType === 'rof' ? 'Report of Findings' : scriptType === 'consultation' ? 'Consultation' : scriptType === 'objection' ? 'Objection Handling' : scriptType

    const contentLength = scriptContent.length
    const hasQuestions = scriptContent.includes('?')
    const hasPauses = scriptContent.includes('...') || scriptContent.includes('[pause]')

    const strengths: string[] = []
    const improvements: string[] = []

    // Analyze strengths
    if (contentLength > 200) {
      strengths.push('Good depth and detail — you\'re not rushing through the conversation.')
    } else {
      improvements.push('Consider adding more detail. The best scripts feel like a natural conversation, not a checklist.')
    }

    if (hasQuestions) {
      strengths.push('Great use of questions — this keeps the patient engaged and feeling heard.')
    } else {
      improvements.push('Try adding open-ended questions. "How does that make you feel?" or "What would it mean to you if we could fix this?" creates buy-in.')
    }

    if (hasPauses) {
      strengths.push('Love the intentional pauses — silence is one of the most powerful tools in communication.')
    }

    if (strengths.length < 2) {
      strengths.push('You\'re taking the time to practice and submit for review — that alone puts you ahead of 90% of chiropractors.')
    }

    if (improvements.length === 0) {
      improvements.push('Practice delivering this out loud 10 times. The script is solid — now it\'s about making it feel effortless.')
    }

    const feedback = `**${typeLabel} Script Feedback**

**Strengths:**
${strengths.map(s => `- ${s}`).join('\n')}

**Areas for Improvement:**
${improvements.map(i => `- ${i}`).join('\n')}

**Overall Assessment:**
You're heading in the right direction. The key now is repetition — practice this until it doesn't sound like a script anymore. Record yourself, listen back, and refine. You've got this.`

    return { success: true, data: { feedback } }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to generate script feedback' }
  }
}

export async function fetchCommunityPulse() {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' }

  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const [
      { count: totalPosts },
      { count: postsThisWeek },
      { data: recentPosts },
    ] = await Promise.all([
      supabase
        .from('community_posts')
        .select('*', { count: 'exact', head: true }),
      supabase
        .from('community_posts')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo),
      supabase
        .from('community_posts')
        .select('user_id, profiles!community_posts_user_id_fkey(full_name)')
        .gte('created_at', sevenDaysAgo),
    ])

    // Count distinct posters this week
    const posterIds = new Set((recentPosts || []).map((p: any) => p.user_id))
    const activePostersThisWeek = posterIds.size

    // Top 5 contributors by post count
    const posterCounts: Record<string, { full_name: string; postCount: number }> = {}
    for (const post of recentPosts || []) {
      const profileData = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles
      const name = profileData?.full_name || 'Unknown'
      if (!posterCounts[post.user_id]) {
        posterCounts[post.user_id] = { full_name: name, postCount: 0 }
      }
      posterCounts[post.user_id].postCount++
    }
    const topContributors = Object.values(posterCounts)
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5)

    return {
      success: true,
      data: {
        totalPosts: totalPosts || 0,
        postsThisWeek: postsThisWeek || 0,
        activePostersThisWeek,
        topContributors,
      },
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch community pulse' }
  }
}
