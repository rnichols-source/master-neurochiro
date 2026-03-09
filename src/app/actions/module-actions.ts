'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function addModule(weekId: number, orderIndex: number) {
  const supabase = createAdminClient()
  
  const slug = `new-module-${Date.now()}`
  const { data, error } = await supabase
    .from('modules')
    .insert({
      week_id: weekId,
      title: 'New Training Module',
      slug,
      order_index: orderIndex,
      is_published: true
    })
    .select()
    .single()

  if (error) return { success: false, error: error.message }
  
  revalidatePath('/admin/curriculum')
  return { success: true, data }
}
