'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function uploadResource(formData: FormData, moduleId: string) {
  const supabase = createAdminClient();
  
  const file = formData.get('file') as File;
  if (!file) return { success: false, error: "No file provided" };

  const fileExt = file.name.split('.').pop();
  const fileName = `${moduleId}/${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `curriculum-resources/${fileName}`;

  // 1. Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('resources')
    .upload(filePath, file, {
      upsert: true,
      contentType: file.type
    });

  if (uploadError) {
    // If bucket doesn't exist, we might need to create it manually in dashboard
    // but we'll return the error for now.
    console.error("Storage Error:", uploadError);
    return { success: false, error: uploadError.message };
  }

  // 2. Get Public URL
  const { data: { publicUrl } } = supabase.storage
    .from('resources')
    .getPublicUrl(filePath);

  // 3. Save reference to DB
  const { data: resource, error: dbError } = await supabase
    .from('resources')
    .insert({
      title: file.name,
      url: publicUrl,
      type: file.type.includes('pdf') ? 'pdf' : 'other',
      module_id: moduleId,
      is_pro_only: false // Default to standard
    })
    .select()
    .single();

  if (dbError) return { success: false, error: dbError.message };

  revalidatePath('/admin/curriculum');
  return { success: true, data: resource };
}

export async function deleteResource(id: string, storagePath: string) {
  const supabase = createAdminClient();

  // 1. Delete from Storage
  const { error: storageError } = await supabase.storage
    .from('resources')
    .remove([storagePath]);

  // 2. Delete from DB
  const { error: dbError } = await supabase
    .from('resources')
    .delete()
    .eq('id', id);

  if (dbError) return { success: false, error: dbError.message };
  
  revalidatePath('/admin/curriculum');
  return { success: true };
}
