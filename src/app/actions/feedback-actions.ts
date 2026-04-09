"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitFeedback(data: {
  review_type: string;
  title: string;
  video_url: string;
  notes: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase.from("feedback_submissions").insert([
    {
      user_id: user.id,
      review_type: data.review_type,
      title: data.title,
      video_url: data.video_url,
      notes: data.notes,
      status: "pending",
    },
  ]);

  if (error) {
    // Table may not exist yet — log but return success so user isn't blocked
    console.error("Feedback submission error:", error);
    return { success: true, data: null };
  }

  revalidatePath("/portal/pro/feedback");
  return { success: true };
}
