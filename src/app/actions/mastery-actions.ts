"use server";

import { createClient } from "@/lib/supabase/server";

export type MasteryEvent = 
  | 'module_complete'   // +25 pts
  | 'kpi_entry'         // +50 pts
  | 'status_claim'      // +100 pts
  | 'roi_win';          // +250 pts

const POINT_VALUES: Record<MasteryEvent, number> = {
  module_complete: 25,
  kpi_entry: 50,
  status_claim: 100,
  roi_win: 250
};

export async function awardMasteryPoints(event: MasteryEvent) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Not authenticated" };

    const points = POINT_VALUES[event];

    // Increment the score in the database
    const { data, error } = await supabase.rpc('increment_mastery_score', { 
      row_id: user.id, 
      points_to_add: points 
    });

    // Fallback if RPC doesn't exist yet (standard update)
    if (error) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('mastery_score')
        .eq('id', user.id)
        .single();
      
      const newScore = (profile?.mastery_score || 0) + points;
      
      await supabase
        .from('profiles')
        .update({ mastery_score: newScore })
        .eq('id', user.id);
    }

    return { success: true, pointsAdded: points };
  } catch (err) {
    return { success: false, error: "Failed to award points" };
  }
}
