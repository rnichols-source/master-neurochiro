"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function fetchPosts() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("community_posts")
    .select(`
      *,
      author:profiles!community_posts_user_id_fkey(id, full_name, tier, avatar_url),
      replies:community_replies(
        id, content, created_at,
        author:profiles!community_replies_user_id_fkey(id, full_name, tier, avatar_url)
      )
    `)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return { success: false, error: error.message };
  return { success: true, data: data || [] };
}

export async function createPost(content: string, fileUrl?: string, fileName?: string, fileType?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  if (!content.trim()) return { success: false, error: "Post cannot be empty" };

  const { error } = await supabase
    .from("community_posts")
    .insert({
      user_id: user.id,
      content: content.trim(),
      file_url: fileUrl || null,
      file_name: fileName || null,
      file_type: fileType || null,
    });

  if (error) return { success: false, error: error.message };
  revalidatePath("/portal/community");
  return { success: true };
}

export async function createReply(postId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  if (!content.trim()) return { success: false, error: "Reply cannot be empty" };

  const { error } = await supabase
    .from("community_replies")
    .insert({
      post_id: postId,
      user_id: user.id,
      content: content.trim(),
    });

  if (error) return { success: false, error: error.message };
  revalidatePath("/portal/community");
  return { success: true };
}

export async function deletePost(postId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("community_posts")
    .delete()
    .eq("id", postId);

  if (error) return { success: false, error: error.message };
  revalidatePath("/portal/community");
  return { success: true };
}

export async function deleteReply(replyId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("community_replies")
    .delete()
    .eq("id", replyId);

  if (error) return { success: false, error: error.message };
  revalidatePath("/portal/community");
  return { success: true };
}

export async function togglePinPost(postId: string, pinned: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  // Admin only
  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  if (profile?.tier !== "admin") return { success: false, error: "Admin only" };

  const { error } = await supabase
    .from("community_posts")
    .update({ pinned })
    .eq("id", postId);

  if (error) return { success: false, error: error.message };
  revalidatePath("/portal/community");
  return { success: true };
}
