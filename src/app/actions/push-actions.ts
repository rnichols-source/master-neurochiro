"use server";

import { createClient } from "@/lib/supabase/server";

export async function savePushSubscription(subscription: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("push_subscriptions")
    .upsert({
      user_id: user.id,
      subscription: subscription,
    }, { onConflict: 'user_id, subscription' });

  if (error) {
    console.error("Error saving push subscription:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
