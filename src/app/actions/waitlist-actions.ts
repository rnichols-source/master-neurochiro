"use server";

import { createClient } from "@/lib/supabase/server";
import { EmailService } from "@/lib/emails";
import { revalidatePath } from "next/cache";

export async function submitWaitlist(formData: {
  full_name: string;
  email: string;
  phone: string;
  current_role: string;
  biggest_struggle: string;
}) {
  const supabase = await createClient();

  // Insert into applications
  const { error } = await supabase.from("applications").insert({
    full_name: formData.full_name,
    email: formData.email,
    phone: formData.phone,
    status: "waitlist",
    responses: {
      application_type: "Mastermind",
      current_role: formData.current_role,
      biggest_struggle: formData.biggest_struggle,
      cohort: "3",
      waitlist: true,
      waitlist_date: new Date().toISOString(),
    },
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "You're already on the waitlist!" };
    }
    return { success: false, error: error.message };
  }

  // Send confirmation email
  try {
    await EmailService.sendWaitlistConfirmation(
      formData.email,
      formData.full_name
    );
  } catch {}

  revalidatePath("/waitlist");
  return { success: true };
}

export async function getWaitlistCount() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("applications")
    .select("id", { count: "exact", head: true })
    .eq("status", "waitlist");
  return count || 0;
}
