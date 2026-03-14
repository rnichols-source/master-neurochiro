'use server'

import { createClient } from '@/lib/supabase/server'

export interface SearchResult {
  success: boolean;
  data?: {
    modules: any[];
    resources: any[];
  };
  error?: string;
}

export async function searchPortal(query: string): Promise<SearchResult> {
  if (!query || query.length < 2) return { success: true, data: { modules: [], resources: [] } };

  const supabase = await createClient();
  const searchTerm = `%${query}%`;

  // 1. Search Modules
  const { data: modules, error: modError } = await supabase
    .from('modules')
    .select(`
      id,
      title,
      slug,
      weeks (slug, title)
    `)
    .ilike('title', searchTerm)
    .limit(10);

  // 2. Search Resources
  const { data: resources, error: resError } = await supabase
    .from('resources')
    .select('*')
    .ilike('title', searchTerm)
    .limit(10);

  if (modError || resError) {
    console.error("Search Error:", modError || resError);
    return { success: false, error: "Failed to perform search" };
  }

  return {
    success: true,
    data: {
      modules: modules || [],
      resources: resources || []
    }
  };
}
