'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { checkAdmin } from '@/app/actions/agent-actions'
import { EmailService } from '@/lib/emails'

/**
 * PULSE: Send re-engagement nudges to at-risk members via email.
 * Targets members with health_score < 40.
 */
export async function runPulseNudges() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' };

  try {
    const adminClient = createAdminClient();

    // Get at-risk members
    const { data: atRisk } = await adminClient
      .from('member_health')
      .select('user_id, health_score, last_activity')
      .lt('health_score', 40);

    if (!atRisk || atRisk.length === 0) {
      return { success: true, message: 'No at-risk members' };
    }

    // Get their profile info
    const userIds = atRisk.map((m) => m.user_id);
    const { data: profiles } = await adminClient
      .from('profiles')
      .select('id, email, full_name')
      .in('id', userIds);

    if (!profiles || profiles.length === 0) {
      return { success: true, message: 'No profiles found' };
    }

    // Check which ones haven't been nudged in the last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    let sentCount = 0;

    for (const profile of profiles) {
      // Dedup: check automation_logs
      const { data: alreadySent } = await adminClient
        .from('automation_logs')
        .select('id')
        .eq('user_email', profile.email)
        .eq('event_type', 'pulse_nudge')
        .gte('created_at', sevenDaysAgo)
        .limit(1);

      if (alreadySent && alreadySent.length > 0) continue;

      const portalLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neurochiromastermind.com'}/portal`;
      await EmailService.sendReengagement(profile.email, profile.full_name || 'Doctor', portalLink);
      sentCount++;
    }

    return { success: true, message: `Sent ${sentCount} nudge${sentCount !== 1 ? 's' : ''}` };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

/**
 * CHIEF: Send KPI submission reminders to members who haven't submitted this week.
 */
export async function runKPIReminders() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' };

  try {
    const adminClient = createAdminClient();

    // Get all active members
    const { data: members } = await adminClient
      .from('profiles')
      .select('id, email, full_name')
      .in('tier', ['standard', 'pro']);

    if (!members || members.length === 0) {
      return { success: true, message: 'No members' };
    }

    // Get who already submitted KPIs this week
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recentKPIs } = await adminClient
      .from('kpi_entries')
      .select('user_id')
      .gte('updated_at', weekAgo);

    const submittedIds = new Set((recentKPIs || []).map((k) => k.user_id));
    const needsReminder = members.filter((m) => !submittedIds.has(m.id));

    // Dedup check
    const todayKey = new Date().toISOString().slice(0, 10);
    let sentCount = 0;

    for (const member of needsReminder) {
      const { data: alreadySent } = await adminClient
        .from('automation_logs')
        .select('id')
        .eq('user_email', member.email)
        .eq('event_type', `kpi_reminder_${todayKey}`)
        .limit(1);

      if (alreadySent && alreadySent.length > 0) continue;

      const portalLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neurochiromastermind.com'}/portal/kpi`;
      const html = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #ffffff; background-color: #0A192F; border-radius: 12px;">
          <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; font-weight: 800; color: #E67E22; margin-bottom: 20px;">Weekly Check-In</p>
          <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 30px;">Time to Submit Your KPIs</h1>
          <div style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8); margin-bottom: 40px;">
            <p>Dr. ${member.full_name || 'Doctor'}, it's the end of the week and I haven't seen your numbers yet.</p>
            <p>Takes 2 minutes. Your KPIs are how we track your growth and spot opportunities to coach you better.</p>
            <p><strong>What gets measured gets managed.</strong></p>
          </div>
          <div style="margin-bottom: 40px;">
            <a href="${portalLink}" style="background-color: #E67E22; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Submit KPIs Now</a>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
          <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">
            NeuroChiro Global Mastermind
          </p>
        </div>
      `;
      await EmailService.send(member.email, 'Submit Your Weekly KPIs', html, `kpi_reminder_${todayKey}`);
      sentCount++;
    }

    return { success: true, message: `Sent ${sentCount} reminder${sentCount !== 1 ? 's' : ''}` };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

/**
 * SENTINEL: Chase members stuck in onboarding (invited but not activated).
 */
export async function runOnboardingChase() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' };

  try {
    const adminClient = createAdminClient();

    // Get pending invitations older than 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: stuckInvitations } = await adminClient
      .from('invitations')
      .select('email, full_name, token, created_at')
      .eq('status', 'pending')
      .lt('created_at', oneDayAgo);

    if (!stuckInvitations || stuckInvitations.length === 0) {
      return { success: true, message: 'No stuck onboarding' };
    }

    let sentCount = 0;

    for (const inv of stuckInvitations) {
      // Dedup
      const { data: alreadySent } = await adminClient
        .from('automation_logs')
        .select('id')
        .eq('user_email', inv.email)
        .eq('event_type', 'onboarding_chase')
        .limit(1);

      if (alreadySent && alreadySent.length > 0) continue;

      const activationLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neurochiromastermind.com'}/portal/activate/${inv.token}`;
      await EmailService.sendOnboardingReady(inv.email, inv.full_name || 'Doctor', activationLink);
      sentCount++;
    }

    return { success: true, message: `Chased ${sentCount} member${sentCount !== 1 ? 's' : ''}` };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

/**
 * SAGE / PULSE: Send re-engagement emails to members who haven't logged in for 14+ days.
 */
export async function runReengagement() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' };

  try {
    const adminClient = createAdminClient();
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

    // Get members whose last activity was 14+ days ago
    const { data: inactive } = await adminClient
      .from('member_health')
      .select('user_id, last_activity')
      .lt('last_activity', fourteenDaysAgo);

    if (!inactive || inactive.length === 0) {
      return { success: true, message: 'No inactive members' };
    }

    const userIds = inactive.map((m) => m.user_id);
    const { data: profiles } = await adminClient
      .from('profiles')
      .select('id, email, full_name')
      .in('id', userIds);

    if (!profiles || profiles.length === 0) {
      return { success: true, message: 'No profiles' };
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    let sentCount = 0;

    for (const profile of profiles) {
      const { data: alreadySent } = await adminClient
        .from('automation_logs')
        .select('id')
        .eq('user_email', profile.email)
        .eq('event_type', 'reengagement')
        .gte('created_at', sevenDaysAgo)
        .limit(1);

      if (alreadySent && alreadySent.length > 0) continue;

      const portalLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neurochiromastermind.com'}/portal`;
      await EmailService.sendReengagement(profile.email, profile.full_name || 'Doctor', portalLink);
      sentCount++;
    }

    return { success: true, message: `Sent ${sentCount} email${sentCount !== 1 ? 's' : ''}` };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

/**
 * SCOUT: Send reminder emails to approved applicants who haven't paid yet.
 */
export async function runApprovedReminders() {
  const supabase = await createClient();
  if (!(await checkAdmin(supabase))) return { success: false, message: 'Unauthorized' };

  try {
    const adminClient = createAdminClient();

    // Get approved applications that don't have a matching profile (haven't paid/enrolled)
    const { data: approved } = await adminClient
      .from('applications')
      .select('id, email, full_name, created_at')
      .eq('status', 'approved');

    if (!approved || approved.length === 0) {
      return { success: true, message: 'No approved apps' };
    }

    // Check which ones already have a profile (already enrolled)
    const emails = approved.map((a) => a.email);
    const { data: existingProfiles } = await adminClient
      .from('profiles')
      .select('email')
      .in('email', emails);

    const enrolledEmails = new Set((existingProfiles || []).map((p) => p.email));
    const needsChase = approved.filter((a) => !enrolledEmails.has(a.email));

    if (needsChase.length === 0) {
      return { success: true, message: 'All approved have enrolled' };
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    let sentCount = 0;

    for (const app of needsChase) {
      const { data: alreadySent } = await adminClient
        .from('automation_logs')
        .select('id')
        .eq('user_email', app.email)
        .eq('event_type', 'approved_reminder')
        .gte('created_at', sevenDaysAgo)
        .limit(1);

      if (alreadySent && alreadySent.length > 0) continue;

      const daysSince = Math.floor((Date.now() - new Date(app.created_at).getTime()) / (1000 * 60 * 60 * 24));
      const checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neurochiromastermind.com'}/pricing`;
      await EmailService.sendApprovedReminder(app.email, app.full_name || 'Doctor', checkoutUrl, daysSince);
      sentCount++;
    }

    return { success: true, message: `Sent ${sentCount} reminder${sentCount !== 1 ? 's' : ''}` };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
