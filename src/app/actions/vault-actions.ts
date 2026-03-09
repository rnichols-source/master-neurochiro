'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function fetchVaultResources(category?: string, search?: string) {
  const supabase = await createClient()
  
  let query = supabase
    .from('vault_resources')
    .select(`
      *,
      vault_bookmarks(id)
    `)
    .order('created_at', { ascending: false })

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching vault resources:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function toggleBookmark(resourceId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  // Check if bookmark exists
  const { data: existing } = await supabase
    .from('vault_bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('resource_id', resourceId)
    .maybeSingle()

  if (existing) {
    // Remove
    await supabase.from('vault_bookmarks').delete().eq('id', existing.id)
  } else {
    // Add
    await supabase.from('vault_bookmarks').insert({
      user_id: user.id,
      resource_id: resourceId
    })
  }

  revalidatePath('/portal/vault')
  return { success: true }
}

export async function incrementDownload(resourceId: string) {
  const supabase = await createClient()
  
  // RPC or direct update? Let's use direct for now
  const { data: resource } = await supabase
    .from('vault_resources')
    .select('download_count')
    .eq('id', resourceId)
    .single()

  if (resource) {
    await supabase
      .from('vault_resources')
      .update({ download_count: (resource.download_count || 0) + 1 })
      .eq('id', resourceId)
  }

  return { success: true }
}
