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
        title: 'Your First 2 Minutes With a Patient',
        description: 'How to start every consultation with confidence — what to say and how to say it.',
        category: 'communication',
        resource_type: 'pdf',
        url: '/resources/week-6/authority-consultation.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-comm-2',
        title: 'When a Patient Hesitates',
        description: 'What to say when a patient likes the plan but isn\'t ready to commit.',
        category: 'communication',
        resource_type: 'pdf',
        url: '/resources/week-6/certainty-framework.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-comm-3',
        title: 'The Power of Saying Less',
        description: 'How to use silence and calm confidence during care plan presentations.',
        category: 'communication',
        resource_type: 'pdf',
        url: '/resources/week-6/restraint-manual.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-rof-1',
        title: 'Setting the Frame: Pre-Presentation Script',
        description: 'How to establish authority before presenting your care plan.',
        category: 'rof',
        resource_type: 'pdf',
        url: '/portal/triage/authority-reset',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-rof-2',
        title: 'Family Decision Guide',
        description: 'How to handle "I need to talk to my spouse" with confidence.',
        category: 'rof',
        resource_type: 'pdf',
        url: '/portal/triage/spouse-shield',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-rof-3',
        title: 'Investment Conversation Script',
        description: 'How to present care plan pricing with clarity and confidence.',
        category: 'rof',
        resource_type: 'pdf',
        url: '/portal/triage/price-pivot',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-rof-rescue',
        title: 'When a Patient Is About to Walk Away',
        description: 'The exact conversation to save a case when they\'re ready to leave.',
        category: 'rof',
        resource_type: 'pdf',
        url: '/portal/rapid-roi/script',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-care-1',
        title: 'How to Build a Care Plan',
        description: 'Step-by-step guide for choosing visit frequency and duration based on patient findings.',
        category: 'care_plan',
        resource_type: 'pdf',
        url: '/resources/week-6/masterplan-architecture.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-care-2',
        title: 'Presenting a $5K+ Care Plan',
        description: 'How to present higher-value plans with confidence and clarity.',
        category: 'care_plan',
        resource_type: 'pdf',
        url: '/resources/week-6/value-anchor-engineering.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-care-3',
        title: 'Keeping Patients Long-Term',
        description: 'What to say when a patient says "I feel better" and wants to stop care early.',
        category: 'care_plan',
        resource_type: 'pdf',
        url: '/resources/week-6/retention-architect.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-objection-1',
        title: 'Handling "I Need to Think About It"',
        description: 'What to say when a patient wants to wait before starting care.',
        category: 'objections',
        resource_type: 'pdf',
        url: '/resources/week-6/objection-think-about-it.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-objection-2',
        title: 'When Insurance Doesn\'t Cover It',
        description: 'How to explain the value of care when a patient says "my insurance won\'t pay for this."',
        category: 'objections',
        resource_type: 'pdf',
        url: '/resources/week-6/objection-insurance-immunity.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-objection-3',
        title: "When Others Question the Plan",
        description: "How to handle it when a spouse, MD, or Google makes your patient doubt their care plan.",
        category: 'objections',
        resource_type: 'pdf',
        url: '/resources/week-6/objection-decision-shield.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-marketing-1',
        title: 'Why Patients Stop Coming',
        description: 'The real reasons long-term patients drift away and how to prevent it.',
        category: 'marketing',
        resource_type: 'pdf',
        url: '/resources/week-6/behavior-blueprint.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-marketing-2',
        title: 'Handling No-Shows',
        description: 'What to say when a patient misses a visit — and how to get them back.',
        category: 'marketing',
        resource_type: 'pdf',
        url: '/resources/week-6/drift-defender.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-marketing-3',
        title: 'Preventing "I Feel Better, I\'m Done"',
        description: 'How to set expectations early so patients complete their care plan instead of quitting when symptoms improve.',
        category: 'marketing',
        resource_type: 'pdf',
        url: '/resources/week-6/emotional-arc.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-staff-1',
        title: 'Training Your Team to Stay on Script',
        description: 'How to keep your staff consistent when things get busy or stressful.',
        category: 'staff',
        resource_type: 'pdf',
        url: '/resources/week-6/containment-protocol.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-staff-2',
        title: 'Team Performance Check-In',
        description: 'A simple audit to find where your team is strong and where they need support.',
        category: 'staff',
        resource_type: 'pdf',
        url: '/resources/week-6/culture-calibration.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-staff-3',
        title: 'Delegating Without Losing Control',
        description: 'How to give your team ownership of tasks without micro-managing every step.',
        category: 'staff',
        resource_type: 'pdf',
        url: '/resources/week-6/ownership-architecture.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-leadership-1',
        title: 'Thinking Like a CEO',
        description: 'How to shift from doing everything yourself to leading the practice.',
        category: 'leadership',
        resource_type: 'pdf',
        url: '/resources/week-6/ceo-standard.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-leadership-2',
        title: 'Building Systems That Run Without You',
        description: 'How to create repeatable processes so your practice grows even when you\'re not there.',
        category: 'leadership',
        resource_type: 'pdf',
        url: '/resources/week-6/clinical-os-architecture.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-leadership-3',
        title: 'Growing Revenue Without More Patients',
        description: 'How to increase case values and profit margins with the patients you already have.',
        category: 'leadership',
        resource_type: 'pdf',
        url: '/resources/week-6/profit-pivot-economics.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-leadership-4',
        title: 'Hiring and Keeping Good People',
        description: 'How to find, onboard, and retain team members who care as much as you do.',
        category: 'leadership',
        resource_type: 'pdf',
        url: '/resources/week-6/culture-doctrine-talent.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-leadership-5',
        title: 'Your 10-Year Vision',
        description: 'Making the decisions now that set up your practice for long-term success.',
        category: 'leadership',
        resource_type: 'pdf',
        url: '/resources/week-6/vision-architect-strategy.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-leadership-6',
        title: 'Making Money When You\'re Not There',
        description: 'How to build a practice that generates income without requiring you in the room every hour.',
        category: 'leadership',
        resource_type: 'pdf',
        url: '/resources/week-6/freedom-metric-leverage.html',
        tier: 'pro',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-edu-1',
        title: 'The Human Potential: Neurological Regulation',
        description: 'Explain the "Why" of NeuroChiro with elite clarity. Move patients from pain-focus to regulation-focus.',
        category: 'patient_edu',
        resource_type: 'pdf',
        url: '/resources/week-6/edu-neurological-regulation.html',
        tier: 'standard',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-edu-2',
        title: 'The Stress Adaptation Blueprint',
        description: 'Why the body breaks down. A deep dive into the 3 Ts (Thoughts, Traumas, Toxins) and neurological thresholds.',
        category: 'patient_edu',
        resource_type: 'pdf',
        url: '/resources/week-6/edu-stress-adaptation.html',
        tier: 'standard',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-edu-3',
        title: 'The Wave of Healing: What to Expect',
        description: 'The nonlinear path of recovery. Explain retracing, flare-ups, and regulatory shifts with authority.',
        category: 'patient_edu',
        resource_type: 'pdf',
        url: '/resources/week-6/edu-wave-of-healing.html',
        tier: 'standard',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-edu-4',
        title: 'The Vagus Nerve Standard',
        description: 'The Master Regulator. Why Vagal Tone is the key to unlocking system recovery and long-term stability.',
        category: 'patient_edu',
        resource_type: 'pdf',
        url: '/resources/week-6/edu-vagus-nerve.html',
        tier: 'standard',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-edu-5',
        title: 'The Modern Subluxation: Survival Mode',
        description: 'Updated for 2026. Explain why the brain gets "stuck" in protection and how to interrupt the loop.',
        category: 'patient_edu',
        resource_type: 'pdf',
        url: '/resources/week-6/edu-modern-subluxation.html',
        tier: 'standard',
        content: 'Premium Branded HTML Asset'
      },
      {
        id: 'premium-edu-6',
        title: 'The Lifetime Standard: Architecture of Longevity',
        description: 'The vision for continuous optimization. Why neurological regulation is a life-long standard, not a project.',
        category: 'patient_edu',
        resource_type: 'pdf',
        url: '/resources/week-6/edu-lifetime-standard.html',
        tier: 'standard',
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
