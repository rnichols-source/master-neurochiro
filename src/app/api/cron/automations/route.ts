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

    // =========================================================
    // LEAD NURTURE — 5-email sequence for mastermind_prospects
    // Day 2: Case study, Day 5: What's inside, Day 7: Discovery call, Day 10: Final push
    // (Day 0 is sent immediately on capture)
    // =========================================================
    const CALENDLY = "https://calendly.com/drray-neurochirodirectory/15min";
    const { data: leads } = await supabase
      .from("mastermind_prospects")
      .select("id, name, email, source, created_at")
      .in("source", ["free_training", "quiz"])
      .in("status", ["new", "contacted"])
      .not("email", "is", null);

    if (leads) {
      for (const lead of leads) {
        const daysSince = (Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60 * 24);
        const firstName = lead.name?.split(" ")[0] || "Doctor";

        // Day 2: Case study
        if (daysSince >= 2 && daysSince < 4) {
          const key = "lead_nurture_day2";
          const { data: sent } = await supabase.from("automation_logs").select("id").eq("user_email", lead.email).eq("event_type", key).limit(1);
          if (!sent || sent.length === 0) {
            const html = `
              <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#fff;background-color:#0A192F;border-radius:12px;">
                <p style="text-transform:uppercase;letter-spacing:0.2em;font-size:11px;font-weight:800;color:#E67E22;margin-bottom:20px;">Member Spotlight</p>
                <h1 style="font-size:28px;font-weight:900;margin-bottom:30px;">How One Doctor Added $4K/Month in 90 Days</h1>
                <div style="font-size:16px;line-height:1.8;color:rgba(255,255,255,0.85);margin-bottom:40px;">
                  <p>Dr. ${firstName},</p>
                  <p>When this doctor joined the Mastermind, they were seeing 80 visits/week but collecting under $15K/month. Their care plan acceptance rate was under 40%.</p>
                  <p><strong>90 days later:</strong></p>
                  <ul style="margin:10px 0;padding-left:20px;">
                    <li>Care plan acceptance jumped to 78%</li>
                    <li>Collections increased by $4,200/month</li>
                    <li>Patient retention doubled</li>
                  </ul>
                  <p>The difference? They fixed their Day 1 script and restructured how they present care plans. That's exactly what we work on in the Mastermind.</p>
                  <p>Curious if this could work for your practice?</p>
                </div>
                <div style="margin-bottom:40px;"><a href="${CALENDLY}" style="background-color:#E67E22;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Book a Free Discovery Call</a></div>
                <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:40px 0;"/>
                <p style="font-size:10px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;text-align:center;">NeuroChiro Global Mastermind</p>
              </div>`;
            await EmailService.send(lead.email, "How One Doctor Added $4K/Month in 90 Days", html, key);
            results.push({ type: key, email: lead.email });
          }
        }

        // Day 5: What's inside the Mastermind
        if (daysSince >= 5 && daysSince < 7) {
          const key = "lead_nurture_day5";
          const { data: sent } = await supabase.from("automation_logs").select("id").eq("user_email", lead.email).eq("event_type", key).limit(1);
          if (!sent || sent.length === 0) {
            const html = `
              <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#fff;background-color:#0A192F;border-radius:12px;">
                <p style="text-transform:uppercase;letter-spacing:0.2em;font-size:11px;font-weight:800;color:#E67E22;margin-bottom:20px;">Inside the Mastermind</p>
                <h1 style="font-size:28px;font-weight:900;margin-bottom:30px;">What 90 Days Actually Looks Like</h1>
                <div style="font-size:16px;line-height:1.8;color:rgba(255,255,255,0.85);margin-bottom:40px;">
                  <p>Dr. ${firstName},</p>
                  <p>Here's the quick breakdown of what happens inside the NeuroChiro Mastermind:</p>
                  <p><strong>Week 1-2:</strong> Identity & Neurology — who you are as a doctor and how you explain what you do</p>
                  <p><strong>Week 3-4:</strong> Communication & Philosophy — scripts, objection handling, building trust fast</p>
                  <p><strong>Week 5-6:</strong> Business & Care Plans — pricing, Day 1/Day 2 flow, collections systems</p>
                  <p><strong>Week 7-8:</strong> Patient Management & Scaling — retention, contracts, building a real business</p>
                  <p>Plus: weekly live calls, KPI tracking, Pro members get 1-on-1 coaching with me.</p>
                  <p>It's not theory — it's implementation. You build as you learn.</p>
                </div>
                <div style="margin-bottom:40px;"><a href="${CALENDLY}" style="background-color:#E67E22;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">See If It's a Fit — Free Call</a></div>
                <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:40px 0;"/>
                <p style="font-size:10px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;text-align:center;">NeuroChiro Global Mastermind</p>
              </div>`;
            await EmailService.send(lead.email, "What 90 Days Inside the Mastermind Looks Like", html, key);
            results.push({ type: key, email: lead.email });
          }
        }

        // Day 7: Is this right for you?
        if (daysSince >= 7 && daysSince < 9) {
          const key = "lead_nurture_day7";
          const { data: sent } = await supabase.from("automation_logs").select("id").eq("user_email", lead.email).eq("event_type", key).limit(1);
          if (!sent || sent.length === 0) {
            const html = `
              <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#fff;background-color:#0A192F;border-radius:12px;">
                <p style="text-transform:uppercase;letter-spacing:0.2em;font-size:11px;font-weight:800;color:#E67E22;margin-bottom:20px;">Real Talk</p>
                <h1 style="font-size:28px;font-weight:900;margin-bottom:30px;">Is This Right for You?</h1>
                <div style="font-size:16px;line-height:1.8;color:rgba(255,255,255,0.85);margin-bottom:40px;">
                  <p>Dr. ${firstName},</p>
                  <p>The Mastermind isn't for everyone. It's for chiropractors who:</p>
                  <ul style="margin:10px 0;padding-left:20px;">
                    <li>Believe in nervous system-based care (not just pain chasing)</li>
                    <li>Want to build a real business, not just a busy practice</li>
                    <li>Are willing to be coached and do the work</li>
                    <li>Are tired of figuring it out alone</li>
                  </ul>
                  <p>If that sounds like you, let's talk. I set aside 15 minutes for a quick discovery call — no pitch, just a real conversation about where your practice is and where you want it to go.</p>
                </div>
                <div style="margin-bottom:40px;"><a href="${CALENDLY}" style="background-color:#E67E22;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Book Your Discovery Call</a></div>
                <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:40px 0;"/>
                <p style="font-size:10px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;text-align:center;">NeuroChiro Global Mastermind</p>
              </div>`;
            await EmailService.send(lead.email, "Is the Mastermind Right for You?", html, key);
            results.push({ type: key, email: lead.email });
          }
        }

        // Day 10: Final push
        if (daysSince >= 10 && daysSince < 12) {
          const key = "lead_nurture_day10";
          const { data: sent } = await supabase.from("automation_logs").select("id").eq("user_email", lead.email).eq("event_type", key).limit(1);
          if (!sent || sent.length === 0) {
            const html = `
              <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#fff;background-color:#0A192F;border-radius:12px;">
                <p style="text-transform:uppercase;letter-spacing:0.2em;font-size:11px;font-weight:800;color:#E67E22;margin-bottom:20px;">Last Chance</p>
                <h1 style="font-size:28px;font-weight:900;margin-bottom:30px;">Next Cohort Is Filling Up</h1>
                <div style="font-size:16px;line-height:1.8;color:rgba(255,255,255,0.85);margin-bottom:40px;">
                  <p>Dr. ${firstName},</p>
                  <p>This is my last email in this series — I don't want to be that person.</p>
                  <p>But I'd be doing you a disservice if I didn't tell you: our next Mastermind cohort is filling up, and spots are limited.</p>
                  <p>If there's even a small part of you that knows your practice could be more — more collections, more impact, more confidence — then take 15 minutes and let's talk.</p>
                  <p>No pressure. No pitch. Just a conversation.</p>
                </div>
                <div style="margin-bottom:40px;"><a href="${CALENDLY}" style="background-color:#E67E22;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Book a Call Before Spots Fill</a></div>
                <div style="font-size:14px;color:rgba(255,255,255,0.5);margin-bottom:20px;">
                  <p>Either way, keep doing great work. — Dr. Ray</p>
                </div>
                <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:40px 0;"/>
                <p style="font-size:10px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;text-align:center;">NeuroChiro Global Mastermind</p>
              </div>`;
            await EmailService.send(lead.email, "Last Call — Next Cohort Filling Up", html, key);
            results.push({ type: key, email: lead.email });
          }
        }
      }
    }

    // =========================================================
    // DAILY COMMUNITY PROMPT — Auto-post engagement prompt
    // Posts once per day Mon-Fri based on themed prompts
    // =========================================================
    try {
      const day = new Date().getDay();
      if (day >= 1 && day <= 5) { // Mon-Fri only
        const today = new Date().toISOString().slice(0, 10);

        // Check if admin already posted today
        const { data: adminProfile } = await supabase
          .from("profiles")
          .select("id")
          .eq("tier", "admin")
          .limit(1)
          .single();

        if (adminProfile) {
          const { data: todayPosts } = await supabase
            .from("community_posts")
            .select("id")
            .eq("user_id", adminProfile.id)
            .gte("created_at", `${today}T00:00:00`)
            .lt("created_at", `${today}T23:59:59`)
            .limit(1);

          if (!todayPosts || todayPosts.length === 0) {
            // Prompt bank tied to mastermind curriculum
            const promptBank: Record<number, string[]> = {
              1: [
                "🧠 Monday Identity Check.\n\nIf a patient walked in RIGHT NOW and asked 'What kind of chiropractor are you?' — what would you say?\n\nWrite your 30-second identity statement below. Not what you think it should be — what you'd ACTUALLY say today.\n\nIdentity first. Certainty follows.",
                "New week. One intention.\n\nWhat's the ONE thing from the Mastermind that you're going to implement this week? Not three things. ONE.\n\nDrop it below. We'll check back Friday.",
              ],
              2: [
                "Let's sharpen your Day 1.\n\nWhat's the FIRST thing you say after the patient sits down for their consultation? Drop your opening line below.\n\nRemember: the first 2 minutes determine whether they trust you enough to come back for Day 2.",
                "Role play 🎯\n\nA patient says: 'That sounds like a lot of visits. Do I really need to come that often?'\n\nWhat do you say? Drop your response.\n\nHint: If you're defending the number of visits, you've already lost. Reframe around the nervous system.",
              ],
              3: [
                "🏆 WIN WEDNESDAY\n\nShare ONE moment from your practice this week where you felt CERTAIN.\n\nBig or small — if it felt different than before the Mastermind, it counts.\n\nLet's celebrate the identity shifts happening in this group.",
                "Implementation check ✅\n\nDid you implement what we discussed on the last call? What happened?\n\nThe Mastermind only works if you do the work. Learn. Build. Prove.",
              ],
              4: [
                "Let's talk real numbers.\n\nWhat's your care plan acceptance rate THIS week?\n\n- How many new patients did you see?\n- How many started a full care plan?\n\nNo judgment. You can't fix what you don't measure.",
                "PVA check.\n\nUnder 12: Your care plan presentation has a leak\n12-24: You're getting partial compliance\n24+: Your patients trust the plan\n\nWhat's yours? And what do you think is causing it?",
              ],
              5: [
                "📊 FRIDAY KPI DROP\n\nPost your numbers:\n• Collections: $___\n• New patients: ___\n• Patient visits: ___\n• Care plans accepted: ___ / ___\n\nSubmit them in the KPI tracker too.\n\nIdentity first. Certainty second. Collections third. 🔥",
                "Weekend homework 📝\n\n1. Submit your KPIs in the portal\n2. Re-read your identity statement — does it still feel true?\n3. Practice your Day 2 ROF script out loud. Once.\n\nThe chiropractors who do the reps between calls are the ones who see their numbers move.",
              ],
            };

            const dayPrompts = promptBank[day];
            if (dayPrompts) {
              const prompt = dayPrompts[Math.floor(Math.random() * dayPrompts.length)];
              await supabase
                .from("community_posts")
                .insert({ user_id: adminProfile.id, content: prompt });
              results.push({ type: "daily_community_prompt", day });
            }
          }
        }
      }
    } catch (e) {
      console.warn("[CRON] Community prompt failed:", e);
    }

    return NextResponse.json({ success: true, processed: results, count: results.length });
  } catch (error: any) {
    console.error("Cron Error:", error);
    await NotificationService.sendAdminAlert(`Cron job failed: ${error.message}`, "critical");
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
