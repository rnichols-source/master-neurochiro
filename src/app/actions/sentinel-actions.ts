'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdmin } from '@/app/actions/agent-actions'

/**
 * Fetch system health overview: automation stats, member counts, invitation counts.
 */
export async function fetchOpsIntelligence() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' };

  try {
    const [
      { count: totalAutomations },
      { count: sentAutomations },
      { count: failedAutomations },
      { count: activeMembers },
      { count: pendingProfileMembers },
      { count: profileCompletedMembers },
      { count: pendingInvitations },
      { count: activatedInvitations },
    ] = await Promise.all([
      supabase.from('automation_logs').select('*', { count: 'exact', head: true }),
      supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('status', 'sent'),
      supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('status', 'failed'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'pending_profile'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'profile_completed'),
      supabase.from('invitations').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('invitations').select('*', { count: 'exact', head: true }).eq('status', 'activated'),
    ]);

    // Count by event_type
    const { data: allLogs } = await supabase
      .from('automation_logs')
      .select('event_type');

    const byType: Record<string, number> = {};
    (allLogs || []).forEach((log: any) => {
      byType[log.event_type] = (byType[log.event_type] || 0) + 1;
    });

    // Count by tier
    const { data: tierData } = await supabase
      .from('profiles')
      .select('tier');

    const byTier: Record<string, number> = {};
    (tierData || []).forEach((p: any) => {
      byTier[p.tier] = (byTier[p.tier] || 0) + 1;
    });

    return {
      success: true,
      data: {
        automations: {
          total: totalAutomations || 0,
          sent: sentAutomations || 0,
          failed: failedAutomations || 0,
          byType,
        },
        members: {
          byStatus: {
            active: activeMembers || 0,
            pending_profile: pendingProfileMembers || 0,
            profile_completed: profileCompletedMembers || 0,
          },
          byTier,
        },
        invitations: {
          pending: pendingInvitations || 0,
          activated: activatedInvitations || 0,
        },
      },
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch onboarding funnel stages with counts.
 */
export async function fetchOnboardingPipeline() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' };

  try {
    const [
      { count: approved },
      { count: pendingInvites },
      { count: activated },
      { count: onboarded },
    ] = await Promise.all([
      supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
      supabase.from('invitations').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('invitations').select('*', { count: 'exact', head: true }).eq('status', 'activated'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).not('onboarding_completed_at', 'is', null),
    ]);

    // Count distinct users with at least 1 module completion
    const { data: progressUsers } = await supabase
      .from('member_progress')
      .select('user_id');

    const uniqueUsers = new Set((progressUsers || []).map((r: any) => r.user_id));

    return {
      success: true,
      data: [
        { stage: 'Applied & Approved', count: approved || 0 },
        { stage: 'Invited', count: pendingInvites || 0 },
        { stage: 'Activated', count: activated || 0 },
        { stage: 'Onboarded', count: onboarded || 0 },
        { stage: 'First Module', count: uniqueUsers.size },
      ],
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch automation effectiveness: sent/failed by type + recent logs.
 */
export async function fetchAutomationEffectiveness() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' };

  try {
    const { data: allLogs } = await supabase
      .from('automation_logs')
      .select('event_type, status');

    const typeMap: Record<string, { sent: number; failed: number }> = {};
    (allLogs || []).forEach((log: any) => {
      if (!typeMap[log.event_type]) typeMap[log.event_type] = { sent: 0, failed: 0 };
      if (log.status === 'sent') typeMap[log.event_type].sent++;
      else if (log.status === 'failed') typeMap[log.event_type].failed++;
    });

    const byType = Object.entries(typeMap).map(([eventType, counts]) => ({
      eventType,
      sent: counts.sent,
      failed: counts.failed,
      successRate: counts.sent + counts.failed > 0
        ? Math.round((counts.sent / (counts.sent + counts.failed)) * 100)
        : 0,
    }));

    const { data: recentLogs } = await supabase
      .from('automation_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    return {
      success: true,
      data: {
        byType,
        recentLogs: recentLogs || [],
      },
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch failed automation jobs.
 */
export async function fetchFailedJobs() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' };

  try {
    const { data, error } = await supabase
      .from('automation_logs')
      .select('*')
      .eq('status', 'failed')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Retry a failed automation by marking it as 'retried'.
 */
export async function retryFailedAutomation(logId: string) {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' };

  try {
    const { error } = await supabase
      .from('automation_logs')
      .update({ status: 'retried' })
      .eq('id', logId);

    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
