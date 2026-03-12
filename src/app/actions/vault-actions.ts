"use server";

import { createClient } from "@/lib/supabase/server";

export async function fetchVaultResources(category?: string, query?: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Not authenticated" };

    // Define Premium Branded Assets
    const premiumAssets = [
      {
        id: 'premium-comm-1',
        title: 'The Authority Consultation: The First 2 Minutes',
        description: 'Elite framing protocol to establish clinical leadership and eliminate neediness before the exam begins.',
        category: 'communication',
        resource_type: 'pdf',
        url: '/resources/week-6/authority-consultation.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-comm-2',
        title: 'The Certainty Framework: Neutralizing Hesitation',
        description: 'Advanced communication framework for transitioning from clinical findings to financial commitment with elite posture.',
        category: 'communication',
        resource_type: 'pdf',
        url: '/resources/week-6/certainty-framework.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-comm-3',
        title: 'The Restraint Manual: The Architecture of Tone',
        description: 'Mastering the psychology of silence and the power of minimal language to stabilize the room during high-ticket reports.',
        category: 'communication',
        resource_type: 'pdf',
        url: '/resources/week-6/restraint-manual.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
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
      },
      {
        id: 'premium-care-1',
        title: 'The Masterplan: Architecture of Pattern Reorganization',
        description: 'Deep-dive clinical logic for frequency and duration, pulling from BJ Palmer, Gonstead, and modern neurological research.',
        category: 'care_plan',
        resource_type: 'pdf',
        url: '/resources/week-6/masterplan-architecture.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-care-2',
        title: 'The Value Anchor: Engineering High-Ticket Certainty',
        description: 'Master the economics of value and the presentation architecture required for $5k+ care plans.',
        category: 'care_plan',
        resource_type: 'pdf',
        url: '/resources/week-6/value-anchor-engineering.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-care-3',
        title: 'The Retention Architect: Transitioning to Lifetime Care',
        description: 'The blueprint for preventing the "I am better now" exit point and building the bridge to lifetime wellness.',
        category: 'care_plan',
        resource_type: 'pdf',
        url: '/resources/week-6/retention-architect.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-objection-1',
        title: 'The "Think About It" Terminator: The End of Indecision',
        description: 'Elite protocol to eliminate the uncertainty loop and secure clinical commitment without being defensive.',
        category: 'objections',
        resource_type: 'pdf',
        url: '/resources/week-6/objection-think-about-it.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-objection-2',
        title: 'The Insurance Immunity Protocol: Value over Coverage',
        description: 'Advanced framework for transitioning patients from financial permission to clinical necessity.',
        category: 'objections',
        resource_type: 'pdf',
        url: '/resources/week-6/objection-insurance-immunity.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-objection-3',
        title: 'The Decision Shield: Neutralizing Interference',
        description: 'Protect the patient’s commitment from the doubts of spouses, medical doctors, and Google.',
        category: 'objections',
        resource_type: 'pdf',
        url: '/resources/week-6/objection-decision-shield.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-marketing-1',
        title: 'The Behavior Blueprint: Mastering Human Drift',
        description: 'Understand why long-term patients drift and how to build a firewall against it.',
        category: 'marketing',
        resource_type: 'pdf',
        url: '/resources/week-6/behavior-blueprint.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-marketing-2',
        title: 'The Drift Defender: Neutralizing No-Shows',
        description: 'The exact protocol to handle missed visits without losing authority or momentum.',
        category: 'marketing',
        resource_type: 'pdf',
        url: '/resources/week-6/drift-defender.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-marketing-3',
        title: 'The Emotional Arc: Certainty Engineering',
        description: 'Map the patient experience to predict and prevent the "I am good now" drift point.',
        category: 'marketing',
        resource_type: 'pdf',
        url: '/resources/week-6/emotional-arc.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-staff-1',
        title: 'The Containment Protocol: Enforcing Structure',
        description: 'Training for your team on how to maintain the clinical container under pressure.',
        category: 'staff',
        resource_type: 'pdf',
        url: '/resources/week-6/containment-protocol.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-staff-2',
        title: 'The Culture Calibration: Performance Audit',
        description: 'Elite diagnostic tool to identify hidden leaks in your team culture and authority.',
        category: 'staff',
        resource_type: 'pdf',
        url: '/resources/week-6/culture-calibration.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-staff-3',
        title: 'The Ownership Architecture: Accountability Systems',
        description: 'How to transition from micro-management to a high-leverage ownership culture.',
        category: 'staff',
        resource_type: 'pdf',
        url: '/resources/week-6/ownership-architecture.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      }
    ];

    // Fetch bookmarks separately to avoid query failure if table is weird
    let bookmarks: any[] = [];
    try {
      const { data: bData } = await supabase
        .from('vault_bookmarks')
        .select('resource_id, premium_id')
        .eq('user_id', user.id);
      bookmarks = bData || [];
    } catch (e) {
      console.warn("Bookmark fetch failed, continuing without bookmarks");
    }

    // Fetch DB resources
    let dbResources: any[] = [];
    try {
      const { data, error } = await supabase
        .from("resources")
        .select('*')
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        dbResources = data.map(r => ({
          ...r,
          vault_bookmarks: bookmarks.filter(b => b.resource_id === r.id)
        }));
      }
    } catch (e) {
      console.warn("DB Resource fetch failed, showing premium only");
    }

    // Merge and map bookmarks for premium assets
    const mappedPremium = premiumAssets.map(p => ({
      ...p,
      vault_bookmarks: bookmarks.filter(b => b.premium_id === p.id)
    }));

    let allResources = [...mappedPremium, ...dbResources];

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
    console.error("Global Vault Error:", err);
    return { success: false, error: err.message };
  }
}

export async function toggleBookmark(resourceId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    const isPremium = resourceId.startsWith('premium-');
    
    const query = supabase
      .from('vault_bookmarks')
      .select('id')
      .eq('user_id', user.id);
    
    if (isPremium) {
      query.eq('premium_id', resourceId);
    } else {
      query.eq('resource_id', resourceId);
    }

    const { data: existing } = await query.maybeSingle();

    if (existing) {
      await supabase.from('vault_bookmarks').delete().eq('id', existing.id);
    } else {
      await supabase.from('vault_bookmarks').insert({ 
        user_id: user.id, 
        [isPremium ? 'premium_id' : 'resource_id']: resourceId 
      });
    }

    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export async function incrementDownload(resourceId: string) {
  const supabase = await createClient();
  if (!resourceId.startsWith('premium-')) {
    try {
      await supabase.rpc('increment_resource_downloads', { res_id: resourceId });
    } catch (e) {}
  }
  return { success: true };
}
