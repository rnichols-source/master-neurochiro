'use server'

import { createServerSupabase } from '@/lib/supabase-server'
import { MOCK_DOCTORS } from '@/lib/mock-data'
import { Doctor } from '@/types/directory'
export async function getDoctors(options: {
  regionCode?: string;
  bounds?: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
  page?: number;
  limit?: number;
  searchQuery?: string;
} = {}) {
  const { regionCode, bounds, page = 1, limit = 20, searchQuery } = options;
  const supabase = createServerSupabase()

  try {
    let query = supabase
      .from('doctors')
      .select('*', { count: 'exact' })
      .eq('verification_status', 'verified')

    // 1. Search Query (Simple ILIKE on name/clinic)
    if (searchQuery) {
      query = query.or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,clinic_name.ilike.%${searchQuery}%`);
    }

    // 2. Filter by Region if provided
    if (regionCode) {
      query = query.eq('region_code', regionCode)
    }

    // 2. Filter by Bounding Box (Map Viewport)
    if (bounds) {
      query = query
        .gte('longitude', bounds[0])
        .gte('latitude', bounds[1])
        .lte('longitude', bounds[2])
        .lte('latitude', bounds[3]);
    }

    // 3. Apply Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query

    if (error || !data || data.length === 0) {
      console.log("No DB results, returning mock subset")
      // Return a slice of mock data to simulate pagination/filtering
      return {
        doctors: regionCode 
          ? MOCK_DOCTORS.filter(d => d.region_code === regionCode).slice(0, limit)
          : MOCK_DOCTORS.slice(0, limit),
        total: count || MOCK_DOCTORS.length
      };
    }

    return {
      doctors: data as Doctor[],
      total: count || 0
    };
  } catch (e) {
    console.error("Error fetching doctors:", e)
    return { doctors: MOCK_DOCTORS.slice(0, 20), total: MOCK_DOCTORS.length };
  }
}
