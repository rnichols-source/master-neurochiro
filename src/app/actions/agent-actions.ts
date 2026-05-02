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

    return {
      success: true,
      data: {
        scout: { pendingApps: pendingApps || 0 },
        pulse: { atRisk: atRiskCount || 0, totalMembers: totalMembers || 0 },
        chief: { kpiThisWeek: kpiThisWeek || 0 },
        sage: { totalCompletions: totalCompletions || 0 },
        echo: { pendingReviews: pendingReviews || 0, unreadMessages: unreadMessages || 0 },
        sentinel: { failedAutomations: failedAutomations || 0 },
      }
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
