'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

// ── Fetch current user's Inner Circle membership ──
export async function fetchInnerCircleMembership() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  const { data, error } = await supabase
    .from('inner_circle_members')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

// ── Fetch next Inner Circle call ──
export async function fetchNextInnerCircleCall() {
  const supabase = await createClient();
  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

  // Get the Inner Circle cohort ID
  const { data: cohort } = await supabase
    .from('cohorts')
    .select('id')
    .eq('name', 'Inner Circle')
    .maybeSingle();

  if (!cohort) return { success: true, data: null };

  const { data, error } = await supabase
    .from('live_calls')
    .select('*')
    .eq('cohort_id', cohort.id)
    .eq('is_completed', false)
    .gt('call_time', threeHoursAgo)
    .order('call_time', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

// ── Submit pre-call KPIs ──
export async function submitPreCallKPI(data: {
  callId: string;
  carePlanAcceptancePct: number;
  newPatients: number;
  collectionsPerVisit: number;
  notes?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  const { error } = await supabase
    .from('pre_call_kpis')
    .insert({
      user_id: user.id,
      call_id: data.callId,
      care_plan_acceptance_pct: data.carePlanAcceptancePct,
      new_patients: data.newPatients,
      collections_per_visit: data.collectionsPerVisit,
      notes: data.notes || null,
    });

  if (error) return { success: false, error: error.message };

  revalidatePath('/portal/council');
  revalidatePath('/portal/council/pre-call');
  return { success: true };
}

// ── Fetch pre-call KPI for a specific call ──
export async function fetchPreCallKPI(callId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  const { data, error } = await supabase
    .from('pre_call_kpis')
    .select('*')
    .eq('user_id', user.id)
    .eq('call_id', callId)
    .maybeSingle();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

// ── Fetch coaching recaps for current user ──
export async function fetchCoachingRecaps() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  const { data, error } = await supabase
    .from('coaching_recaps')
    .select('*, live_calls(title, call_time)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return { success: false, error: error.message };
  return { success: true, data: data || [] };
}

// ── Fetch Inner Circle benchmarks (anonymized peer comparison) ──
export async function fetchInnerCircleBenchmarks() {
  const supabase = await createClient();

  // Get all active IC member user IDs
  const { data: members } = await supabase
    .from('inner_circle_members')
    .select('user_id')
    .eq('status', 'active');

  if (!members || members.length === 0) return { success: true, data: null };

  const memberIds = members.map(m => m.user_id);

  // Get latest KPI entry per member
  const { data: kpis } = await supabase
    .from('kpi_entries')
    .select('user_id, care_plans_accepted, new_patients, collections, patient_visits')
    .in('user_id', memberIds)
    .order('week_start_date', { ascending: false });

  if (!kpis || kpis.length === 0) return { success: true, data: null };

  // Get latest entry per user
  const latestByUser = new Map<string, typeof kpis[0]>();
  for (const kpi of kpis) {
    if (!latestByUser.has(kpi.user_id)) {
      latestByUser.set(kpi.user_id, kpi);
    }
  }

  const entries = Array.from(latestByUser.values());

  // Calculate benchmarks
  const acceptanceRates = entries
    .filter(e => e.care_plans_accepted != null && e.patient_visits)
    .map(e => Math.round((e.care_plans_accepted! / Math.max(e.patient_visits!, 1)) * 100));

  const newPatients = entries
    .filter(e => e.new_patients != null)
    .map(e => e.new_patients!);

  const cva = entries
    .filter(e => e.collections != null && e.patient_visits)
    .map(e => Math.round(e.collections! / Math.max(e.patient_visits!, 1)));

  const avg = (arr: number[]) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
  const top = (arr: number[]) => arr.length ? Math.max(...arr) : 0;

  return {
    success: true,
    data: {
      memberCount: entries.length,
      acceptance: { avg: avg(acceptanceRates), top: top(acceptanceRates) },
      newPatients: { avg: avg(newPatients), top: top(newPatients) },
      collectionsPerVisit: { avg: avg(cva), top: top(cva) },
    },
  };
}

// ── Admin: Onboard a member into Inner Circle ──
export async function onboardInnerCircleMember(userId: string, membershipType: 'founding' | 'standard') {
  const supabase = createAdminClient();

  // Set tier on profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ tier: 'inner-circle' })
    .eq('id', userId);

  if (profileError) return { success: false, error: profileError.message };

  // Create membership row
  const { error: memberError } = await supabase
    .from('inner_circle_members')
    .upsert({
      user_id: userId,
      membership_type: membershipType,
      status: 'active',
    }, { onConflict: 'user_id' });

  if (memberError) return { success: false, error: memberError.message };

  revalidatePath('/portal');
  revalidatePath('/portal/council');
  revalidatePath('/admin');
  return { success: true };
}
