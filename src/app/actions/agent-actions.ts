'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * Shared admin check for all agent actions.
 */
export async function checkAdmin(supabase: any) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return false;
    if (user.app_metadata?.role === 'admin') return true;
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single();
    return profile?.tier === 'admin';
  } catch {
    return false;
  }
}

/**
 * Get authenticated supabase client + admin guard. Returns null if not admin.
 */
export async function getAdminClient() {
  const supabase = await createClient();
  const isAdmin = await checkAdmin(supabase);
  if (!isAdmin) return null;
  return supabase;
}

/**
 * Quick hub stats for each agent — lightweight queries for the hub cards.
 */
export async function fetchAgentHubStats() {
  const supabase = await getAdminClient();
  if (!supabase) return { success: false, error: 'Unauthorized' };

  try {
    const [
      { count: pendingApps },
      { count: totalMembers },
      { count: atRiskCount },
      { count: pendingReviews },
      { count: unreadMessages },
    ] = await Promise.all([
      supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).in('tier', ['standard', 'pro']),
      supabase.from('member_health').select('*', { count: 'exact', head: true }).lt('health_score', 40),
      supabase.from('script_reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('direct_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
    ]);

    // Get KPI entries count for this week
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { count: kpiThisWeek } = await supabase
      .from('kpi_entries')
      .select('*', { count: 'exact', head: true })
      .gte('updated_at', weekAgo);

    // Get automation stats
    const { count: failedAutomations } = await supabase
      .from('automation_logs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'failed');

    // Get module completion stats
    const { count: totalCompletions } = await supabase
      .from('member_progress')
      .select('*', { count: 'exact', head: true });

    // Get mastermind prospect count
    let newProspects = 0;
    try {
      const { count } = await supabase
        .from('mastermind_prospects')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');
      newProspects = count || 0;
    } catch {}

    return {
      success: true,
      data: {
        scout: { pendingApps: pendingApps || 0 },
        pulse: { atRisk: atRiskCount || 0, totalMembers: totalMembers || 0 },
        chief: { kpiThisWeek: kpiThisWeek || 0 },
        sage: { totalCompletions: totalCompletions || 0 },
        echo: { pendingReviews: pendingReviews || 0, unreadMessages: unreadMessages || 0 },
        sentinel: { failedAutomations: failedAutomations || 0 },
        hunter: { newProspects },
      }
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Daily Briefing — aggregates actionable intel from all 6 agents into one report.
 */
export async function runDailyBriefing() {
  const supabase = await getAdminClient();
  if (!supabase) return { success: false, error: 'Unauthorized' };

  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // --- SCOUT: Pipeline ---
    const [
      { count: pendingApps },
      { count: approvedApps },
      { data: recentApps },
    ] = await Promise.all([
      supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
      supabase.from('applications').select('full_name, role, application_type, created_at').eq('status', 'pending').order('created_at', { ascending: false }).limit(3),
    ]);

    // --- PULSE: Retention ---
    const [
      { count: totalMembers },
      { data: atRiskMembers },
      { data: inactiveMembers },
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }).in('tier', ['standard', 'pro']),
      supabase.from('member_health').select('user_id, health_score, last_activity, profiles!inner(full_name)').lt('health_score', 40).order('health_score', { ascending: true }).limit(5),
      supabase.from('member_health').select('user_id, last_activity, profiles!inner(full_name)').lt('last_activity', thirtyDaysAgo).limit(5),
    ]);

    // --- CHIEF: KPI Performance ---
    const { data: kpiEntries } = await supabase
      .from('kpi_entries')
      .select('user_id, collections, new_patients, patient_visits, care_plans_accepted, week_start_date')
      .gte('updated_at', sevenDaysAgo);

    const kpiCount = kpiEntries?.length || 0;
    let avgCollections = 0;
    let avgNewPatients = 0;
    if (kpiEntries && kpiEntries.length > 0) {
      avgCollections = Math.round(kpiEntries.reduce((s, e) => s + (e.collections || 0), 0) / kpiEntries.length);
      avgNewPatients = Math.round(kpiEntries.reduce((s, e) => s + (e.new_patients || 0), 0) / kpiEntries.length * 10) / 10;
    }

    // --- SAGE: Curriculum ---
    const [
      { count: modulesCompletedThisWeek },
      { count: totalModulesCompleted },
    ] = await Promise.all([
      supabase.from('member_progress').select('*', { count: 'exact', head: true }).gte('completed_at', sevenDaysAgo),
      supabase.from('member_progress').select('*', { count: 'exact', head: true }),
    ]);

    // --- ECHO: Communications ---
    const [
      { count: unreadDMs },
      { count: pendingReviews },
      { data: unansweredDMs },
    ] = await Promise.all([
      supabase.from('direct_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
      supabase.from('script_reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('direct_messages').select('content, created_at, profiles!direct_messages_sender_id_fkey(full_name)').eq('is_read', false).order('created_at', { ascending: false }).limit(3),
    ]);

    // --- SENTINEL: Operations ---
    const [
      { count: failedAutomations },
      { count: automationsLast24h },
      { data: stuckOnboarding },
    ] = await Promise.all([
      supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('status', 'failed'),
      supabase.from('automation_logs').select('*', { count: 'exact', head: true }).gte('created_at', twentyFourHoursAgo),
      supabase.from('invitations').select('email, full_name, created_at').eq('status', 'pending').order('created_at', { ascending: true }).limit(3),
    ]);

    // Build the briefing
    const briefing = {
      generatedAt: now.toISOString(),
      sections: [
        {
          agent: 'Scout',
          icon: 'Radar',
          status: (pendingApps || 0) > 0 ? 'action' : 'clear',
          headline: (pendingApps || 0) > 0
            ? `${pendingApps} application${(pendingApps || 0) !== 1 ? 's' : ''} waiting for review`
            : 'Pipeline clear — no pending applications',
          details: [
            `${approvedApps || 0} approved & awaiting payment`,
            ...(recentApps || []).map((a: any) => `New: ${a.full_name} (${a.role}, ${a.application_type})`),
          ],
          action: (pendingApps || 0) > 0 ? 'Review applications' : null,
          actionHref: '/admin/agents/scout',
        },
        {
          agent: 'Pulse',
          icon: 'HeartPulse',
          status: (atRiskMembers?.length || 0) > 0 ? 'warning' : 'clear',
          headline: (atRiskMembers?.length || 0) > 0
            ? `${atRiskMembers!.length} member${atRiskMembers!.length !== 1 ? 's' : ''} at risk of churning`
            : `All ${totalMembers || 0} members healthy`,
          details: [
            `${totalMembers || 0} total active members`,
            ...(atRiskMembers || []).map((m: any) => {
              const name = Array.isArray(m.profiles) ? m.profiles[0]?.full_name : m.profiles?.full_name;
              return `⚠ ${name || 'Unknown'} — health score ${m.health_score}`;
            }),
            ...(inactiveMembers || []).map((m: any) => {
              const name = Array.isArray(m.profiles) ? m.profiles[0]?.full_name : m.profiles?.full_name;
              return `Inactive 30+ days: ${name || 'Unknown'}`;
            }),
          ],
          action: (atRiskMembers?.length || 0) > 0 ? 'Send nudges' : null,
          actionHref: '/admin/agents/pulse',
        },
        {
          agent: 'Chief',
          icon: 'Trophy',
          status: kpiCount > 0 ? 'info' : 'warning',
          headline: kpiCount > 0
            ? `${kpiCount} KPI entries this week — avg $${avgCollections.toLocaleString()} collections`
            : 'No KPI entries submitted this week',
          details: [
            kpiCount > 0 ? `Avg new patients: ${avgNewPatients}` : 'Remind members to submit KPIs',
          ],
          action: 'View leaderboard',
          actionHref: '/admin/agents/chief',
        },
        {
          agent: 'Sage',
          icon: 'GraduationCap',
          status: (modulesCompletedThisWeek || 0) > 0 ? 'info' : 'warning',
          headline: (modulesCompletedThisWeek || 0) > 0
            ? `${modulesCompletedThisWeek} modules completed this week`
            : 'No module completions this week',
          details: [
            `${totalModulesCompleted || 0} total completions all-time`,
          ],
          action: 'View curriculum analytics',
          actionHref: '/admin/agents/sage',
        },
        {
          agent: 'Echo',
          icon: 'Radio',
          status: ((unreadDMs || 0) + (pendingReviews || 0)) > 0 ? 'action' : 'clear',
          headline: ((unreadDMs || 0) + (pendingReviews || 0)) > 0
            ? `${(unreadDMs || 0) + (pendingReviews || 0)} items need your response`
            : 'All caught up — inbox clear',
          details: [
            unreadDMs ? `${unreadDMs} unread DMs` : 'No unread DMs',
            pendingReviews ? `${pendingReviews} pending script reviews` : 'No pending reviews',
            ...(unansweredDMs || []).map((dm: any) => {
              const name = Array.isArray(dm.profiles) ? dm.profiles[0]?.full_name : dm.profiles?.full_name;
              return `💬 ${name || 'Unknown'}: "${(dm.content || '').slice(0, 60)}..."`;
            }),
          ],
          action: ((unreadDMs || 0) + (pendingReviews || 0)) > 0 ? 'Open inbox' : null,
          actionHref: '/admin/agents/echo',
        },
        {
          agent: 'Sentinel',
          icon: 'Shield',
          status: (failedAutomations || 0) > 0 ? 'warning' : 'clear',
          headline: (failedAutomations || 0) > 0
            ? `${failedAutomations} failed automations need attention`
            : 'All systems operational',
          details: [
            `${automationsLast24h || 0} automations ran in last 24h`,
            ...(stuckOnboarding || []).map((inv: any) => `Stuck onboarding: ${inv.full_name} (${inv.email})`),
          ],
          action: (failedAutomations || 0) > 0 ? 'Fix failed jobs' : null,
          actionHref: '/admin/agents/sentinel',
        },
      ],
    };

    return { success: true, data: briefing };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
