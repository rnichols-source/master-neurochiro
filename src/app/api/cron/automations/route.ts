import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { EmailService } from '@/lib/emails';
import { NotificationService } from '@/lib/notifications';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const supabase = createAdminClient();
  const results = [];

  try {
    // 1. RE-ENGAGEMENT: 7 Days No Login (all tiers)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: inactiveUsers } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .lt('last_sign_in_at', sevenDaysAgo)
      .neq('tier', 'admin');

    if (inactiveUsers) {
      for (const user of inactiveUsers) {
        // Check if already sent in last 7 days to avoid spam
        const { data: alreadySent } = await supabase
          .from('automation_logs')
          .select('id')
          .eq('user_email', user.email)
          .eq('event_type', 'reengagement')
          .gte('created_at', sevenDaysAgo)
          .limit(1);

        if (!alreadySent || alreadySent.length === 0) {
          await EmailService.sendReengagement(user.email, user.full_name || 'Doctor', `${process.env.NEXT_PUBLIC_SITE_URL}/portal`);
          results.push({ type: 'reengagement', email: user.email });
        }
      }
    }

    // 2. COUNCIL TRANSITION: Check for curriculum completion (8 weeks)
    // Use module completion data instead of profile created_at
    const { data: completingMembers } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .eq('tier', 'standard');

    if (completingMembers) {
      for (const member of completingMembers) {
        // Check if they've completed enough modules (proxy for 8 weeks)
        const { count } = await supabase
          .from('module_progress')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', member.id)
          .eq('is_completed', true);

        // If they've completed 20+ modules (roughly 8 weeks of content)
        if (count && count >= 20) {
          const { data: alreadyInvited } = await supabase
            .from('automation_logs')
            .select('id')
            .eq('user_email', member.email)
            .eq('event_type', 'council_transition')
            .limit(1);

          if (!alreadyInvited || alreadyInvited.length === 0) {
            await EmailService.sendCouncilTransition(member.email, member.full_name || 'Doctor', `${process.env.NEXT_PUBLIC_SITE_URL}/council/application`);
            results.push({ type: 'council_transition', email: member.email });
          }
        }
      }
    }

    // 3. LIVE CALL REMINDERS (with deduplication)
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
    const { data: upcomingCalls } = await supabase
      .from('events')
      .select('*')
      .gte('start_date', now.toISOString())
      .lte('start_date', oneHourFromNow);

    if (upcomingCalls && upcomingCalls.length > 0) {
      const { data: allMembers } = await supabase
        .from('profiles')
        .select('email, full_name')
        .neq('tier', 'admin');

      if (allMembers) {
        for (const call of upcomingCalls) {
          // Check if reminders already sent for this call
          const { data: alreadySent } = await supabase
            .from('automation_logs')
            .select('id')
            .eq('event_type', 'call_reminder')
            .eq('metadata->>call_id', call.id)
            .limit(1);

          if (!alreadySent || alreadySent.length === 0) {
            for (const member of allMembers) {
              await EmailService.sendCallReminder(
                member.email,
                'Starting in 1 Hour',
                call.zoom_link || `${process.env.NEXT_PUBLIC_SITE_URL}/portal`
              );
            }
            // Log once per call to mark as sent
            await EmailService.logAutomation({
              email: 'system',
              event_type: 'call_reminder',
              status: 'sent',
              metadata: { call_id: call.id, member_count: allMembers.length }
            });
            results.push({ type: 'call_reminder', call: call.title, members: allMembers.length });
          }
        }
      }
    }

    return NextResponse.json({ success: true, processed: results });
  } catch (error: any) {
    console.error("Cron Error:", error);
    await NotificationService.sendAdminAlert(`Cron job failed: ${error.message}`, 'critical');
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
