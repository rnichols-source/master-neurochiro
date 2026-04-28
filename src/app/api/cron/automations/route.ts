import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { EmailService } from "@/lib/emails";
import { NotificationService } from "@/lib/notifications";
import { stripe } from "@/lib/stripe";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const supabase = createAdminClient();
  const results: any[] = [];
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://neurochiromastermind.com";

  try {
    // =========================================================
    // 1. APPROVED BUT UNPAID — Follow-up at 24h, 48h, 7d
    // =========================================================
    const { data: approvedApps } = await supabase
      .from("applications")
      .select("id, email, full_name, responses, updated_at")
      .eq("status", "approved");

    if (approvedApps) {
      for (const app of approvedApps) {
        const approvedAt = app.responses?.approved_at || app.updated_at;
        if (!approvedAt) continue;

        const hoursSince = (Date.now() - new Date(approvedAt).getTime()) / (1000 * 60 * 60);

        // Determine which follow-up to send (24h, 48h, or 7d)
        let followUpKey: string | null = null;
        if (hoursSince >= 24 && hoursSince < 36) followUpKey = "approved_reminder_24h";
        else if (hoursSince >= 48 && hoursSince < 60) followUpKey = "approved_reminder_48h";
        else if (hoursSince >= 168 && hoursSince < 180) followUpKey = "approved_reminder_7d";

        if (followUpKey) {
          const { data: alreadySent } = await supabase
            .from("automation_logs")
            .select("id")
            .eq("user_email", app.email)
            .eq("event_type", followUpKey)
            .limit(1);

          if (!alreadySent || alreadySent.length === 0) {
            const tierRaw = app.responses?.tier_applying || app.responses?.tier_requested || "";
            const isPro = tierRaw.toLowerCase().includes("pro");
            const isStudent = (app.responses?.current_role || "").toLowerCase().includes("student");
            const prefix = isStudent ? "student-" : "";
            const pifKey = `${prefix}${isPro ? "pro" : "standard"}-pif`;

            const PRICE_MAP: Record<string, string> = {
              "standard-pif": "price_1TMIbJQ4WJOENoxrEKMvkpSn",
              "pro-pif": "price_1TMIcxQ4WJOENoxrOIzjxwFe",
              "student-standard-pif": "price_1TMIg4Q4WJOENoxr1yTHzAXn",
              "student-pro-pif": "price_1TMIenQ4WJOENoxrXqQnI23v",
            };

            try {
              const session = await stripe.checkout.sessions.create({
                mode: "payment",
                line_items: [{ price: PRICE_MAP[pifKey], quantity: 1 }],
                success_url: `${SITE}/apply/confirmation?name=${encodeURIComponent(app.full_name || "Doctor")}&role=enrolled&status=success`,
                cancel_url: `${SITE}/pricing`,
                customer_email: app.email,
                client_reference_id: app.id,
                payment_intent_data: { metadata: { price_key: pifKey, application_id: app.id } },
              });

              await EmailService.sendApprovedReminder(
                app.email,
                app.full_name || "Doctor",
                session.url!,
                Math.floor(hoursSince / 24)
              );
              results.push({ type: followUpKey, email: app.email });
            } catch (stripeErr) {
              console.error("Cron checkout error:", stripeErr);
            }
          }
        }
      }
    }

    // =========================================================
    // 2. PENDING APPLICATION NURTURE — 24h and 48h follow-ups
    // =========================================================
    const { data: pendingApps } = await supabase
      .from("applications")
      .select("id, email, full_name, created_at")
      .eq("status", "pending");

    if (pendingApps) {
      for (const app of pendingApps) {
        const hoursSince = (Date.now() - new Date(app.created_at).getTime()) / (1000 * 60 * 60);

        let followUpKey: string | null = null;
        if (hoursSince >= 24 && hoursSince < 36) followUpKey = "pending_followup_24h";
        else if (hoursSince >= 48 && hoursSince < 60) followUpKey = "pending_followup_48h";

        if (followUpKey) {
          const { data: alreadySent } = await supabase
            .from("automation_logs")
            .select("id")
            .eq("user_email", app.email)
            .eq("event_type", followUpKey)
            .limit(1);

          if (!alreadySent || alreadySent.length === 0) {
            await EmailService.sendPendingAppFollowUp(
              app.email,
              app.full_name || "Doctor",
              Math.floor(hoursSince)
            );
            results.push({ type: followUpKey, email: app.email });
          }
        }
      }
    }

    // =========================================================
    // 3. WEEKLY CURRICULUM DRIP — Monday morning emails
    // =========================================================
    const now = new Date();
    const isMonday = now.getUTCDay() === 1;
    const isMorningWindow = now.getUTCHours() >= 12 && now.getUTCHours() < 13; // ~8 AM ET

    if (isMonday && isMorningWindow) {
      const { data: activeMembers } = await supabase
        .from("profiles")
        .select("id, email, full_name")
        .neq("tier", "admin")
        .not("email", "is", null);

      if (activeMembers) {
        for (const member of activeMembers) {
          // Determine which week the member is on
          const { count: completedModules } = await supabase
            .from("member_progress")
            .select("id", { count: "exact", head: true })
            .eq("user_id", member.id)
            .not("completed_at", "is", null);

          // Rough mapping: ~3 modules per week
          const currentWeek = Math.min(Math.floor((completedModules || 0) / 3) + 1, 8);

          // Only send if they haven't finished and haven't received this week's drip
          if (currentWeek <= 8) {
            const dripKey = `weekly_drip_w${currentWeek}`;
            const { data: alreadySent } = await supabase
              .from("automation_logs")
              .select("id")
              .eq("user_email", member.email)
              .eq("event_type", dripKey)
              .limit(1);

            if (!alreadySent || alreadySent.length === 0) {
              const weekSlugs: Record<number, string> = {
                1: "week-1-identity", 2: "week-2-neurology", 3: "week-3-communication",
                4: "week-4-philosophy", 5: "week-5-business", 6: "week-6-care-plans",
                7: "week-7-patient-management", 8: "week-8-ownership",
              };
              const slug = weekSlugs[currentWeek] || "week-1-identity";
              await EmailService.sendWeeklyDrip(
                member.email,
                member.full_name || "Doctor",
                currentWeek,
                `${SITE}/portal/curriculum/${slug}`
              );
              results.push({ type: dripKey, email: member.email });
            }
          }
        }
      }
    }

    // =========================================================
    // 4. PRO 1:1 BOOKING REMINDER — 3 days and 14 days after activation
    // =========================================================
    const { data: proMembers } = await supabase
      .from("profiles")
      .select("id, email, full_name, created_at")
      .eq("tier", "pro");

    if (proMembers) {
      for (const pro of proMembers) {
        const daysSinceCreated = (Date.now() - new Date(pro.created_at).getTime()) / (1000 * 60 * 60 * 24);

        let reminderKey: string | null = null;
        if (daysSinceCreated >= 3 && daysSinceCreated < 4) reminderKey = "pro_booking_3d";
        else if (daysSinceCreated >= 14 && daysSinceCreated < 15) reminderKey = "pro_booking_14d";

        if (reminderKey) {
          const { data: alreadySent } = await supabase
            .from("automation_logs")
            .select("id")
            .eq("user_email", pro.email)
            .eq("event_type", reminderKey)
            .limit(1);

          if (!alreadySent || alreadySent.length === 0) {
            await EmailService.sendProBookingReminder(pro.email, pro.full_name || "Doctor");
            results.push({ type: reminderKey, email: pro.email });
          }
        }
      }
    }

    // =========================================================
    // 5. RE-ENGAGEMENT — 7 days inactive (with bug fix)
    // =========================================================
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: inactiveUsers } = await supabase
      .from("profiles")
      .select("id, email, full_name, last_sign_in_at")
      .neq("tier", "admin")
      .not("email", "is", null)
      .not("stripe_customer_id", "is", null);

    if (inactiveUsers) {
      for (const user of inactiveUsers) {
        // Bug fix: skip if last_sign_in_at is null (never logged in — onboarding issue, not re-engagement)
        if (!user.last_sign_in_at) continue;
        if (new Date(user.last_sign_in_at) >= new Date(sevenDaysAgo)) continue;

        const { data: alreadySent } = await supabase
          .from("automation_logs")
          .select("id")
          .eq("user_email", user.email)
          .eq("event_type", "reengagement")
          .gte("created_at", sevenDaysAgo)
          .limit(1);

        if (!alreadySent || alreadySent.length === 0) {
          await EmailService.sendReengagement(user.email, user.full_name || "Doctor", `${SITE}/portal`);
          // Belt-and-suspenders: log directly in case EmailService logging fails
          await supabase.from("automation_logs").insert({
            user_id: user.id,
            user_email: user.email,
            event_type: "reengagement",
            automation_type: "email",
            status: "sent",
            metadata: { source: "cron_direct_log" }
          });
          results.push({ type: "reengagement", email: user.email });
        }
      }
    }

    // =========================================================
    // 6. COUNCIL TRANSITION — 20+ completed modules
    // =========================================================
    const { data: completingMembers } = await supabase
      .from("profiles")
      .select("id, email, full_name")
      .eq("tier", "standard");

    if (completingMembers) {
      for (const member of completingMembers) {
        const { count } = await supabase
          .from("member_progress")
          .select("id", { count: "exact", head: true })
          .eq("user_id", member.id)
          .not("completed_at", "is", null);

        if (count && count >= 20) {
          const { data: alreadyInvited } = await supabase
            .from("automation_logs")
            .select("id")
            .eq("user_email", member.email)
            .eq("event_type", "council_transition")
            .limit(1);

          if (!alreadyInvited || alreadyInvited.length === 0) {
            await EmailService.sendCouncilTransition(
              member.email,
              member.full_name || "Doctor",
              `${SITE}/council/application`
            );
            results.push({ type: "council_transition", email: member.email });
          }
        }
      }
    }

    // =========================================================
    // 7. LIVE CALL REMINDERS — 1 hour before, with dedup
    // =========================================================
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
    const { data: upcomingCalls } = await supabase
      .from("live_calls")
      .select("*")
      .eq("is_completed", false)
      .gte("call_time", now.toISOString())
      .lte("call_time", oneHourFromNow);

    if (upcomingCalls && upcomingCalls.length > 0) {
      const { data: allMembers } = await supabase
        .from("profiles")
        .select("email, full_name")
        .neq("tier", "admin");

      if (allMembers) {
        for (const call of upcomingCalls) {
          const callDedupKey = `call_reminder_${call.id}`;
          const { data: alreadySent } = await supabase
            .from("automation_logs")
            .select("id")
            .eq("event_type", "call_reminder")
            .eq("user_email", callDedupKey)
            .limit(1);

          if (!alreadySent || alreadySent.length === 0) {
            for (const member of allMembers) {
              await EmailService.sendCallReminder(
                member.email,
                "Starting in 1 Hour",
                call.zoom_url || `${SITE}/portal`
              );
            }
            await EmailService.logAutomation({
              email: callDedupKey,
              event_type: "call_reminder",
              status: "sent",
              metadata: { call_id: call.id, member_count: allMembers.length },
            });
            results.push({ type: "call_reminder", call: call.title, members: allMembers.length });
          }
        }
      }
    }

    // =========================================================
    // 8. PAYMENT FAILURE FOLLOW-UP — Day 3 and Day 7
    // =========================================================
    const { data: failedPaymentLogs } = await supabase
      .from("automation_logs")
      .select("user_email, created_at")
      .eq("event_type", "payment_failed")
      .gte("created_at", new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString());

    if (failedPaymentLogs) {
      for (const log of failedPaymentLogs) {
        const daysSince = (Date.now() - new Date(log.created_at).getTime()) / (1000 * 60 * 60 * 24);

        let followUpKey: string | null = null;
        if (daysSince >= 3 && daysSince < 4) followUpKey = "payment_followup_3d";
        else if (daysSince >= 7 && daysSince < 8) followUpKey = "payment_followup_7d";

        if (followUpKey) {
          const { data: alreadySent } = await supabase
            .from("automation_logs")
            .select("id")
            .eq("user_email", log.user_email)
            .eq("event_type", followUpKey)
            .limit(1);

          if (!alreadySent || alreadySent.length === 0) {
            const portalUrl = `${SITE}/portal`;
            await EmailService.sendPaymentFollowUp(
              log.user_email,
              "Doctor",
              portalUrl,
              Math.floor(daysSince)
            );
            results.push({ type: followUpKey, email: log.user_email });
          }
        }
      }
    }

    return NextResponse.json({ success: true, processed: results, count: results.length });
  } catch (error: any) {
    console.error("Cron Error:", error);
    await NotificationService.sendAdminAlert(`Cron job failed: ${error.message}`, "critical");
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
