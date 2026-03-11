import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { EmailService } from '@/lib/emails';
import { NotificationService } from '@/lib/notifications';

// This endpoint should be hit by a cron job (e.g., Vercel Cron or GitHub Actions)
// It scans for scheduled automations: call reminders, re-engagement, etc.
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const supabase = createAdminClient();
  const results = [];

  try {
    // 1. RE-ENGAGEMENT: 7 Days No Login
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: inactiveUsers } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .lt('last_sign_in_at', sevenDaysAgo)
      .eq('tier', 'standard'); // Or whatever logic for active members

    if (inactiveUsers) {
      for (const user of inactiveUsers) {
        await EmailService.sendReengagement(user.email, user.full_name || 'Doctor', `${process.env.NEXT_PUBLIC_SITE_URL}/portal`);
        await NotificationService.sendAdminAlert(`⚠️ Member Inactive for 7 Days: ${user.full_name} (${user.email})`, 'warning');
        results.push({ type: 'reengagement', email: user.email });
      }
    }

    // 2. PRO REMINDERS: 1:1 Booking
    const { data: proMembers } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('tier', 'pro');

    if (proMembers) {
      for (const pro of proMembers) {
        // Logic: Check if they have a booked call in a hypothetical 'appointments' table
        // For now, we'll send a high-value reminder every 30 days if no activity.
        // results.push({ type: 'pro_reminder', email: pro.email });
      }
    }

    // 3. COUNCIL TRANSITION: Check for 8-week completion
    const { data: completingMembers } = await supabase
      .from('profiles')
      .select('id, email, full_name, created_at')
      .eq('tier', 'standard')
      .lt('created_at', new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString()); // 8 weeks old

    if (completingMembers) {
      for (const member of completingMembers) {
        // Only send if not already invited (check logs)
        const { data: alreadyInvited } = await supabase
          .from('automation_logs')
          .select('id')
          .eq('user_email', member.email)
          .eq('event_type', 'council_transition')
          .limit(1);

        if (!alreadyInvited || alreadyInvited.length === 0) {
          await EmailService.sendCouncilTransition(member.email, member.full_name || 'Doctor', `${process.env.NEXT_PUBLIC_SITE_URL}/apply/council`);
          results.push({ type: 'council_transition', email: member.email });
        }
      }
    }

    // 4. LIVE CALL REMINDERS
    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    const { data: upcomingCalls } = await supabase
      .from('events')
      .select('*')
      .gte('start_date', new Date().toISOString())
      .lte('start_date', oneHourFromNow);

    if (upcomingCalls) {
      const { data: allMembers } = await supabase.from('profiles').select('email, full_name').neq('tier', 'admin');
      if (allMembers) {
        for (const call of upcomingCalls) {
          for (const member of allMembers) {
            await EmailService.sendCallReminder(member.email, 'Starting in 1 Hour', call.zoom_link || `${process.env.NEXT_PUBLIC_SITE_URL}/portal/calls`);
            results.push({ type: 'call_reminder', email: member.email, call: call.title });
          }
        }
      }
    }

    return NextResponse.json({ success: true, processed: results });
  } catch (error: any) {
    console.error("Cron Error:", error);
    await NotificationService.sendAdminAlert(`❌ CRON JOB FAILED: ${error.message}`);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
