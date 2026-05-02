'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdmin } from '@/app/actions/agent-actions'

function calculatePercentile(sorted: number[], percentile: number): number {
  if (sorted.length === 0) return 0;
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

function calculateMedian(sorted: number[]): number {
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * Aggregate KPI benchmarks across all members for the last 4 weeks.
 */
export async function fetchCohortBenchmarks() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' };

  try {
    const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString();
    const { data: entries, error } = await supabase
      .from('kpi_entries')
      .select('user_id, collections, new_patients, patient_visits, care_plans_accepted')
      .gte('week_start_date', fourWeeksAgo);

    if (error) throw error;

    const rows = entries || [];
    const uniqueMembers = new Set(rows.map((r: any) => r.user_id)).size;

    const metrics = ['collections', 'new_patients', 'patient_visits', 'care_plans_accepted'] as const;
    const benchmarks: Record<string, { avg: number; median: number; top25: number; bottom25: number }> = {};

    for (const metric of metrics) {
      const values = rows.map((r: any) => r[metric] || 0).sort((a: number, b: number) => a - b);
      const sum = values.reduce((acc: number, v: number) => acc + v, 0);
      benchmarks[metric] = {
        avg: values.length > 0 ? Math.round(sum / values.length) : 0,
        median: Math.round(calculateMedian(values)),
        top25: Math.round(calculatePercentile(values, 75)),
        bottom25: Math.round(calculatePercentile(values, 25)),
      };
    }

    return {
      success: true,
      data: {
        benchmarks,
        totalEntries: rows.length,
        uniqueMembers,
      },
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Member rankings sorted by average collections over the last 4 weeks.
 */
export async function fetchLeaderboard() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' };

  try {
    const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString();
    const { data: entries, error } = await supabase
      .from('kpi_entries')
      .select('user_id, collections, new_patients, patient_visits, care_plans_accepted')
      .gte('week_start_date', fourWeeksAgo);

    if (error) throw error;

    // Group by user
    const byUser: Record<string, any[]> = {};
    for (const entry of entries || []) {
      if (!byUser[entry.user_id]) byUser[entry.user_id] = [];
      byUser[entry.user_id].push(entry);
    }

    const userIds = Object.keys(byUser);
    if (userIds.length === 0) {
      return { success: true, data: [] };
    }

    // Fetch profiles
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, tier')
      .in('id', userIds);

    const profileMap: Record<string, any> = {};
    for (const p of profiles || []) {
      profileMap[p.id] = p;
    }

    const leaderboard = userIds.map((userId) => {
      const userEntries = byUser[userId];
      const count = userEntries.length;
      const profile = profileMap[userId] || {};
      return {
        id: userId,
        full_name: profile.full_name || 'Unknown',
        tier: profile.tier || 'standard',
        avgCollections: Math.round(userEntries.reduce((s: number, e: any) => s + (e.collections || 0), 0) / count),
        avgNewPatients: Math.round((userEntries.reduce((s: number, e: any) => s + (e.new_patients || 0), 0) / count) * 10) / 10,
        avgVisits: Math.round((userEntries.reduce((s: number, e: any) => s + (e.patient_visits || 0), 0) / count) * 10) / 10,
        avgCarePlans: Math.round((userEntries.reduce((s: number, e: any) => s + (e.care_plans_accepted || 0), 0) / count) * 10) / 10,
        entriesCount: count,
      };
    });

    leaderboard.sort((a, b) => b.avgCollections - a.avgCollections);

    return { success: true, data: leaderboard };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Members with significant KPI jumps (20%+ increase) comparing latest week to prior 3-week average.
 */
export async function fetchBreakthroughs() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' };

  try {
    const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString();
    const { data: entries, error } = await supabase
      .from('kpi_entries')
      .select('user_id, week_start_date, collections, new_patients, patient_visits, care_plans_accepted')
      .gte('week_start_date', fourWeeksAgo)
      .order('week_start_date', { ascending: true });

    if (error) throw error;

    const byUser: Record<string, any[]> = {};
    for (const entry of entries || []) {
      if (!byUser[entry.user_id]) byUser[entry.user_id] = [];
      byUser[entry.user_id].push(entry);
    }

    // Fetch profiles for names
    const userIds = Object.keys(byUser);
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('id', userIds.length > 0 ? userIds : ['__none__']);

    const profileMap: Record<string, string> = {};
    for (const p of profiles || []) {
      profileMap[p.id] = p.full_name;
    }

    const metrics = ['collections', 'new_patients', 'patient_visits', 'care_plans_accepted'] as const;
    const breakthroughs: any[] = [];

    for (const userId of userIds) {
      const userEntries = byUser[userId];
      if (userEntries.length < 2) continue;

      const latest = userEntries[userEntries.length - 1];
      const prior = userEntries.slice(0, -1);

      for (const metric of metrics) {
        const priorAvg = prior.reduce((s: number, e: any) => s + (e[metric] || 0), 0) / prior.length;
        const currentValue = latest[metric] || 0;
        if (priorAvg > 0) {
          const changePercent = ((currentValue - priorAvg) / priorAvg) * 100;
          if (changePercent >= 20) {
            breakthroughs.push({
              id: userId,
              full_name: profileMap[userId] || 'Unknown',
              metric,
              previousAvg: Math.round(priorAvg * 100) / 100,
              currentValue,
              changePercent: Math.round(changePercent),
            });
          }
        }
      }
    }

    breakthroughs.sort((a, b) => b.changePercent - a.changePercent);

    return { success: true, data: breakthroughs };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Members with declining KPIs (20%+ decrease) comparing latest week to prior 3-week average.
 */
export async function fetchStruggles() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' };

  try {
    const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString();
    const { data: entries, error } = await supabase
      .from('kpi_entries')
      .select('user_id, week_start_date, collections, new_patients, patient_visits, care_plans_accepted')
      .gte('week_start_date', fourWeeksAgo)
      .order('week_start_date', { ascending: true });

    if (error) throw error;

    const byUser: Record<string, any[]> = {};
    for (const entry of entries || []) {
      if (!byUser[entry.user_id]) byUser[entry.user_id] = [];
      byUser[entry.user_id].push(entry);
    }

    const userIds = Object.keys(byUser);
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('id', userIds.length > 0 ? userIds : ['__none__']);

    const profileMap: Record<string, string> = {};
    for (const p of profiles || []) {
      profileMap[p.id] = p.full_name;
    }

    const metrics = ['collections', 'new_patients', 'patient_visits', 'care_plans_accepted'] as const;
    const struggles: any[] = [];

    for (const userId of userIds) {
      const userEntries = byUser[userId];
      if (userEntries.length < 2) continue;

      const latest = userEntries[userEntries.length - 1];
      const prior = userEntries.slice(0, -1);

      for (const metric of metrics) {
        const priorAvg = prior.reduce((s: number, e: any) => s + (e[metric] || 0), 0) / prior.length;
        const currentValue = latest[metric] || 0;
        if (priorAvg > 0) {
          const changePercent = ((currentValue - priorAvg) / priorAvg) * 100;
          if (changePercent <= -20) {
            struggles.push({
              id: userId,
              full_name: profileMap[userId] || 'Unknown',
              metric,
              previousAvg: Math.round(priorAvg * 100) / 100,
              currentValue,
              changePercent: Math.round(changePercent),
            });
          }
        }
      }
    }

    struggles.sort((a, b) => a.changePercent - b.changePercent);

    return { success: true, data: struggles };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Pre-call coaching brief for a specific member.
 */
export async function fetchCoachingBrief(userId: string) {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, error: 'Unauthorized' };

  try {
    const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString();

    const [kpiResult, healthResult, progressResult, notesResult, profileResult] = await Promise.all([
      supabase
        .from('kpi_entries')
        .select('*')
        .eq('user_id', userId)
        .gte('week_start_date', fourWeeksAgo)
        .order('week_start_date', { ascending: true }),
      supabase
        .from('member_health')
        .select('*')
        .eq('user_id', userId)
        .single(),
      supabase
        .from('member_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId),
      supabase
        .from('coaching_notes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(3),
      supabase
        .from('profiles')
        .select('full_name, tier, email')
        .eq('id', userId)
        .single(),
    ]);

    const kpiEntries = kpiResult.data || [];
    const health = healthResult.data;
    const modulesCompleted = progressResult.count || 0;
    const coachingNotes = notesResult.data || [];
    const profile = profileResult.data;

    // Build numbers summary with trend arrows
    const metrics = ['collections', 'new_patients', 'patient_visits', 'care_plans_accepted'] as const;
    const numbers: Record<string, { latest: number; trend: 'up' | 'down' | 'flat' }> = {};

    for (const metric of metrics) {
      if (kpiEntries.length === 0) {
        numbers[metric] = { latest: 0, trend: 'flat' };
        continue;
      }
      const latest = kpiEntries[kpiEntries.length - 1][metric] || 0;
      if (kpiEntries.length < 2) {
        numbers[metric] = { latest, trend: 'flat' };
      } else {
        const previous = kpiEntries[kpiEntries.length - 2][metric] || 0;
        numbers[metric] = {
          latest,
          trend: latest > previous ? 'up' : latest < previous ? 'down' : 'flat',
        };
      }
    }

    // Fetch cohort averages for comparison
    const { data: allEntries } = await supabase
      .from('kpi_entries')
      .select('collections, new_patients, patient_visits, care_plans_accepted')
      .gte('week_start_date', fourWeeksAgo);

    const cohortAvg: Record<string, number> = {};
    const allRows = allEntries || [];
    for (const metric of metrics) {
      const sum = allRows.reduce((s: number, e: any) => s + (e[metric] || 0), 0);
      cohortAvg[metric] = allRows.length > 0 ? sum / allRows.length : 0;
    }

    // Determine strengths and focus areas
    let bestMetric: string = metrics[0];
    let worstMetric: string = metrics[0];
    let bestRatio = -Infinity;
    let worstRatio = Infinity;

    for (const metric of metrics) {
      const avg = cohortAvg[metric];
      const latest = numbers[metric].latest;
      const ratio = avg > 0 ? latest / avg : 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestMetric = metric;
      }
      if (ratio < worstRatio) {
        worstRatio = ratio;
        worstMetric = metric;
      }
    }

    const formatMetricName = (m: string) => m.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    // Generate talking points
    const talkingPoints: string[] = [];
    if (bestRatio > 1) {
      talkingPoints.push(`Celebrate their ${formatMetricName(bestMetric)} - performing ${Math.round((bestRatio - 1) * 100)}% above cohort average.`);
    } else {
      talkingPoints.push(`Discuss strategies to improve ${formatMetricName(bestMetric)} - their strongest area but still below cohort average.`);
    }
    if (worstRatio < 0.8) {
      talkingPoints.push(`Deep-dive into ${formatMetricName(worstMetric)} - currently ${Math.round((1 - worstRatio) * 100)}% below cohort average. Identify specific bottlenecks.`);
    } else {
      talkingPoints.push(`Review ${formatMetricName(worstMetric)} trends and set stretch goals.`);
    }
    if (modulesCompleted === 0) {
      talkingPoints.push('Encourage starting the curriculum modules - no modules completed yet.');
    } else {
      talkingPoints.push(`Review curriculum progress (${modulesCompleted} modules completed) and connect learnings to KPI goals.`);
    }

    return {
      success: true,
      data: {
        brief: {
          member: {
            id: userId,
            full_name: profile?.full_name || 'Unknown',
            tier: profile?.tier || 'standard',
            email: profile?.email || '',
            healthScore: health?.health_score ?? null,
          },
          numbers,
          strengths: {
            metric: formatMetricName(bestMetric),
            value: numbers[bestMetric].latest,
            cohortAvg: Math.round(cohortAvg[bestMetric]),
            aboveCohort: bestRatio > 1,
          },
          focusAreas: {
            metric: formatMetricName(worstMetric),
            value: numbers[worstMetric].latest,
            cohortAvg: Math.round(cohortAvg[worstMetric]),
            belowCohort: worstRatio < 1,
          },
          recentNotes: coachingNotes.map((n: any) => ({
            title: n.title || n.note?.substring(0, 60) || 'Untitled',
            date: n.created_at,
          })),
          modulesCompleted,
          talkingPoints,
        },
      },
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
