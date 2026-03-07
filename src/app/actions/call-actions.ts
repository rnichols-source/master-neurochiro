'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function fetchNextCall() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('mastermind_calls')
    .select('*')
    .order('next_call', { ascending: true })
    .gt('next_call', new Date().toISOString())
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching call:", error);
    // Fallback to a default if nothing found
    return { 
      success: false, 
      data: { next_call: new Date().toISOString(), zoom_url: 'https://zoom.us' } 
    };
  }

  return { success: true, data };
}

export async function updateNextCall(date: string, zoomUrl: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('mastermind_calls')
    .insert({
      next_call: date,
      zoom_url: zoomUrl
    });

  if (error) return { success: false, error: error.message };

  revalidatePath('/portal');
  revalidatePath('/admin');
  return { success: true };
}
