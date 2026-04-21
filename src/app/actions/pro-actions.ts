"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ─── Coaching Notes ───────────────────────────────────────────────

export async function fetchCoachingNotes() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated", data: [] };

  const { data, error } = await supabase
    .from("coaching_notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return { success: false, error: error.message, data: [] };
  return { success: true, data: data || [] };
}

export async function createCoachingNote(userId: string, title: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  // Verify admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();
  if (profile?.tier !== "admin") return { success: false, error: "Unauthorized" };

  const { error } = await supabase.from("coaching_notes").insert([
    { user_id: userId, title, content, created_by: user.id },
  ]);

  if (error) return { success: false, error: error.message };

  const { createNotification } = await import('@/app/actions/notification-actions');
  await createNotification(userId, 'New Coaching Note', title, 'coaching_note', '/portal/pro/coaching');

  revalidatePath("/portal/pro/coaching");
  revalidatePath("/admin/coaching");
  return { success: true };
}

// ─── Direct Messages ──────────────────────────────────────────────

export async function fetchDirectMessages(otherUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated", data: [] };

  const { data, error } = await supabase
    .from("direct_messages")
    .select("*")
    .or(
      `and(sender_id.eq.${user.id},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${user.id})`
    )
    .order("created_at", { ascending: true });

  if (error) return { success: false, error: error.message, data: [] };
  return { success: true, data: data || [] };
}

export async function sendDirectMessage(recipientId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase.from("direct_messages").insert([
    { sender_id: user.id, recipient_id: recipientId, content },
  ]);

  if (error) return { success: false, error: error.message };

  // Notify recipient if sender is admin
  const { data: senderProfile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();
  if (senderProfile?.tier === "admin") {
    const { createNotification } = await import('@/app/actions/notification-actions');
    await createNotification(recipientId, 'New Message', 'Dr. Nichols sent you a message', 'message', '/portal/pro/messages');
  }

  revalidatePath("/portal/pro/messages");
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function fetchAllConversations() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated", data: [] };

  // Verify admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();
  if (profile?.tier !== "admin") return { success: false, error: "Unauthorized", data: [] };

  // Get all Pro members
  const { data: proMembers } = await supabase
    .from("profiles")
    .select("id, full_name, email, avatar_url")
    .eq("tier", "pro");

  if (!proMembers) return { success: true, data: [] };

  // For each pro member, get the latest message
  const conversations = await Promise.all(
    proMembers.map(async (member) => {
      const { data: messages } = await supabase
        .from("direct_messages")
        .select("*")
        .or(
          `and(sender_id.eq.${member.id},recipient_id.eq.${user.id}),and(sender_id.eq.${user.id},recipient_id.eq.${member.id})`
        )
        .order("created_at", { ascending: false })
        .limit(1);

      const { count } = await supabase
        .from("direct_messages")
        .select("*", { count: "exact", head: true })
        .eq("sender_id", member.id)
        .eq("recipient_id", user.id)
        .eq("is_read", false);

      return {
        member,
        lastMessage: messages?.[0] || null,
        unreadCount: count || 0,
      };
    })
  );

  return { success: true, data: conversations };
}

export async function markMessagesRead(senderId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("direct_messages")
    .update({ is_read: true })
    .eq("sender_id", senderId)
    .eq("recipient_id", user.id)
    .eq("is_read", false);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

// ─── Script Reviews ───────────────────────────────────────────────

export async function fetchScriptReviews() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated", data: [] };

  const { data, error } = await supabase
    .from("script_reviews")
    .select("*")
    .eq("user_id", user.id)
    .order("submitted_at", { ascending: false });

  if (error) return { success: false, error: error.message, data: [] };
  return { success: true, data: data || [] };
}

export async function submitScriptReview(title: string, scriptType: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase.from("script_reviews").insert([
    { user_id: user.id, title, script_type: scriptType, content },
  ]);

  if (error) return { success: false, error: error.message };
  revalidatePath("/portal/pro/script-review");
  return { success: true };
}

export async function reviewScript(reviewId: string, feedback: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  // Verify admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();
  if (profile?.tier !== "admin") return { success: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("script_reviews")
    .update({ feedback, status: "reviewed", reviewed_at: new Date().toISOString() })
    .eq("id", reviewId);

  if (error) return { success: false, error: error.message };

  // Notify the script author
  const { data: review } = await supabase
    .from("script_reviews")
    .select("user_id, title")
    .eq("id", reviewId)
    .single();
  if (review) {
    const { createNotification } = await import('@/app/actions/notification-actions');
    await createNotification(review.user_id, 'Script Reviewed', `Dr. Nichols reviewed: ${review.title}`, 'script_reviewed', '/portal/pro/script-review');
  }

  revalidatePath("/admin/script-reviews");
  revalidatePath("/portal/pro/script-review");
  return { success: true };
}

// ─── Helpers ──────────────────────────────────────────────────────

export async function fetchAdminUserId() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("tier", "admin")
    .limit(1)
    .single();
  return data?.id || null;
}

export async function fetchProMembers() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, data: [] };

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();
  if (profile?.tier !== "admin") return { success: false, data: [] };

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .eq("tier", "pro")
    .order("full_name");

  return { success: true, data: data || [] };
}

export async function fetchAdminCoachingNotes() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, data: [] };

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();
  if (profile?.tier !== "admin") return { success: false, data: [] };

  const { data } = await supabase
    .from("coaching_notes")
    .select("*, profiles!coaching_notes_user_id_fkey(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(20);

  return { success: true, data: data || [] };
}

export async function fetchPendingScriptReviews() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, data: [] };

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();
  if (profile?.tier !== "admin") return { success: false, data: [] };

  const { data } = await supabase
    .from("script_reviews")
    .select("*, profiles!script_reviews_user_id_fkey(full_name, email)")
    .order("submitted_at", { ascending: false });

  return { success: true, data: data || [] };
}
