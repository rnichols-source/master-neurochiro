import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import * as webpush from "web-push";

export async function POST(req: Request) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:admin@neurochiromastermind.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );

  // Verify admin using the request's auth session (not admin client)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const adminClient = createAdminClient();
  const { data: profile } = await adminClient
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  if (profile?.tier !== "admin") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Get Payload
  const { title, body, url, targetUserId } = await req.json();

  // Get Subscriptions
  let query = adminClient.from("push_subscriptions").select("*");
  if (targetUserId) {
    query = query.eq("user_id", targetUserId);
  }
  const { data: subscriptions, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ success: true, sentCount: 0 });
  }

  // Send Notifications
  const results = await Promise.allSettled(
    subscriptions.map(async (sub: any) => {
      try {
        await webpush.sendNotification(
          sub.subscription,
          JSON.stringify({ title, body, url })
        );
      } catch (err: any) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          await adminClient.from("push_subscriptions").delete().eq("id", sub.id);
        }
        throw err;
      }
    })
  );

  return NextResponse.json({
    success: true,
    sentCount: results.filter((r) => r.status === "fulfilled").length,
  });
}
