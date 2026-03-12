"use server";

import { createClient } from "@/lib/supabase/server";

export async function fetchVaultResources(category?: string, query?: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Not authenticated" };

    // Define Premium Branded Assets (Static for now, but formatted like DB resources)
    const premiumAssets = [
      {
        id: 'premium-rof-1',
        title: 'The Authority Reset: Pre-ROF Frame',
        description: 'Framing protocol to establish clinical leadership in the first 2 minutes of your report.',
        category: 'rof',
        resource_type: 'pdf',
        url: '/portal/triage/authority-reset',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-rof-2',
        title: 'The Spouse Shield: Objection Destroyer',
        description: 'Pre-emptive script to neutralize the "I need to talk to my spouse" excuse before it happens.',
        category: 'rof',
        resource_type: 'pdf',
        url: '/portal/triage/spouse-shield',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-rof-3',
        title: 'The Price Pivot: Financial Certainty',
        description: 'How to present a $5,000+ care plan with zero flinch and immediate value anchoring.',
        category: 'rof',
        resource_type: 'pdf',
        url: '/portal/triage/price-pivot',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-rof-rescue',
        title: 'The Emergency Case Rescue Script',
        description: 'The high-authority neurological pivot to save a case when they are about to walk away.',
        category: 'rof',
        resource_type: 'pdf',
        url: '/portal/rapid-roi/script',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      }
    ];

    let { data, error } = await supabase
      .from("resources")
      .select(`
        *,
        vault_bookmarks(id)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Merge static premium assets with DB assets
    let allResources = [...premiumAssets, ...(data || [])];

    // Filter by Category
    if (category && category !== 'all') {
      allResources = allResources.filter(r => r.category === category);
    }

    // Search Query
    if (query) {
      const q = query.toLowerCase();
      allResources = allResources.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.description?.toLowerCase().includes(q)
      );
    }

    return { success: true, data: allResources };
  } catch (err: any) {
    console.error("Vault Fetch Error:", err);
    return { success: false, error: err.message };
  }
}

export async function toggleBookmark(resourceId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false };

  // Check if premium asset (don't bookmark static ones for now or use different logic)
  if (resourceId.startsWith('premium-')) return { success: true };

  const { data: existing } = await supabase
    .from('vault_bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('resource_id', resourceId)
    .maybeSingle();

  if (existing) {
    await supabase.from('vault_bookmarks').delete().eq('id', existing.id);
  } else {
    await supabase.from('vault_bookmarks').insert({ user_id: user.id, resource_id: resourceId });
  }

  return { success: true };
}

export async function incrementDownload(resourceId: string) {
  const supabase = await createClient();
  // Simplified increment
  if (!resourceId.startsWith('premium-')) {
    await supabase.rpc('increment_resource_downloads', { res_id: resourceId });
  }
  return { success: true };
}
