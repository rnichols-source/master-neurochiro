'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function fetchNextCall() {
  const supabase = await createClient();
  
  // Fetch the next uncompleted call
  // We include calls that started up to 3 hours ago to account for live sessions
  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('live_calls')
    .select('*')
    .eq('is_completed', false)
    .gt('call_time', threeHoursAgo)
    .order('call_time', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching call:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function updateNextCall(date: string, zoomUrl: string, title?: string, description?: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('live_calls')
    .insert({
      title: title || 'Weekly Mastermind Call',
      description: description || 'Live coaching and Q&A session.',
      call_time: date,
      zoom_url: zoomUrl,
      is_completed: false
    });

  if (error) return { success: false, error: error.message };

  revalidatePath('/portal');
  revalidatePath('/admin');
  return { success: true };
}
