"use server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function fetchNotifications() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, data: [] };

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return { success: true, data: data || [] };
}

export async function getUnreadCount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { count } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_read", false);

  return count || 0;
}

export async function markAsRead(notificationId: string) {
  const supabase = await createClient();
  await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId);
  revalidatePath("/portal");
}

export async function markAllAsRead() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
  revalidatePath("/portal");
}

export async function createNotification(userId: string, title: string, message: string, type: string, link: string) {
  const admin = createAdminClient();
  await admin.from("notifications").insert({ user_id: userId, title, message, type, link });
}

export async function createBulkNotifications(title: string, message: string, type: string, link: string) {
  const admin = createAdminClient();
  const { data: members } = await admin
    .from("profiles")
    .select("id")
    .not("tier", "eq", "admin")
    .not("onboarding_completed_at", "is", null);

  if (members && members.length > 0) {
    const notifications = members.map(m => ({ user_id: m.id, title, message, type, link }));
    await admin.from("notifications").insert(notifications);
  }
  return members?.length || 0;
}

export async function fetchAnnouncements() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false })
    .limit(3);
  return data || [];
}
