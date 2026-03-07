import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import * as webpush from "web-push";

export async function POST(req: Request) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:admin@neurochiromastermind.com",
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );

  const supabase = createAdminClient();
  
  // 1. Verify Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  if (profile?.tier !== 'admin') {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2. Get Payload
  const { title, body, url, targetUserId } = await req.json();

  // 3. Get Subscriptions
  let query = supabase.from("push_subscriptions").select("*");
  
  if (targetUserId) {
    query = query.eq("user_id", targetUserId);
  }

  const { data: subscriptions, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 4. Send Notifications
  const results = await Promise.allSettled(
    subscriptions.map(async (sub: any) => {
      try {
        await webpush.sendNotification(
          sub.subscription,
          JSON.stringify({ title, body, url })
        );
      } catch (err: any) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          // Subscription expired/invalid, remove it
          await supabase.from("push_subscriptions").delete().eq("id", sub.id);
        }
        throw err;
      }
    })
  );

  return NextResponse.json({ 
    success: true, 
    sentCount: results.filter(r => r.status === 'fulfilled').length 
  });
}
