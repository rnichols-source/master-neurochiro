const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedCouncilResources() {
  console.log('🚀 Seeding Council Resources...');

  const resources = [
    {
      title: 'Advanced Reactivation Sequence (Email + Text)',
      description: 'The exact multi-touch sequence used to reactivate patients who have drifted from care over the last 6-12 months.',
      category: 'council',
      resource_type: 'script',
      content: 'SUBJECT: Thinking of you...\n\nHi [Name],\n\nI was just reviewing some clinical files and your name came up. It\'s been a while since we last saw you in the office, and I wanted to check in on how your nervous system is adapting to [Life Stressor] we discussed.\n\nWe\'ve seen some incredible shifts lately with our current cohort, and I\'d love to get you back in for a quick "Neural Reset" to make sure you aren\'t sliding back into those old patterns.\n\nAre you free for a 15-minute check-in this week?\n\n- Dr. [Name]',
      tier: 'pro'
      },
      {
      title: 'High-Authority Care Plan Pitch (Full Script)',
      description: 'Moving beyond "insurance coverage" to "clinical necessity." How to present a $5k+ care plan with total certainty.',
      category: 'council',
      resource_type: 'script',
      content: 'THE PITCH ARCHITECTURE:\n\n1. The Problem Definition: "Based on your scans, your nervous system is currently stuck in a protective state."\n2. The Consequence: "If we don\'t reorganize this pattern, the symptoms you are feeling today will become the structural limitations of tomorrow."\n3. The Solution: "My recommendation is a 12-month reconstruction phase. This isn\'t about the pain; it\'s about the pattern."\n4. The Commitment: "Are you ready to commit to the reorganization of your health, or are we just looking for temporary relief today?"',
      tier: 'pro'
      },
      {
      title: 'Clinic CEO: Quarterly Planning Toolkit',
      description: 'The 90-day execution framework for clinic owners. Set targets, track KPIs, and lead your team with precision.',
      category: 'council',
      resource_type: 'pdf',
      content: 'PHASE 1: THE AUDIT\nReview your last 90 days. What were your PVA, Case Average, and Overhead numbers?\n\nPHASE 2: THE TARGET\nSet one "North Star" metric for the next quarter. Is it conversion? Is it retention? Is it team expansion?\n\nPHASE 3: THE EXECUTION\nDaily standups + Weekly KPI reviews + Bi-Weekly Triage calls.\n\nPHASE 4: THE REVIEW\n90-day debrief and recalibration.',
      tier: 'pro'
      }

  ];

  const { error } = await supabase
    .from('vault_resources')
    .insert(resources);

  if (error) console.error('❌ Error seeding resources:', error);
  else console.log('✅ Council Resources seeded successfully.');
}

seedCouncilResources();
