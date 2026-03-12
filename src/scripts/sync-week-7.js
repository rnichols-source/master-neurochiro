const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncWeek7() {
  console.log('🚀 Starting Week 7 Sync...');

  // 1. Get Week 7 ID
  const { data: week } = await supabase
    .from('weeks')
    .select('id')
    .eq('week_number', 7)
    .single();

  if (!week) {
    console.error('❌ Week 7 not found');
    return;
  }

  // 2. Clear placeholder modules for Week 7
  await supabase.from('modules').delete().eq('week_id', week.id);

  // 3. Insert real Week 7 Training Units
  const modules = [
    { 
      week_id: week.id, 
      title: 'The Reality of Patient Behavior', 
      slug: 'reality-of-patient-behavior', 
      order_index: 1
    },
    { 
      week_id: week.id, 
      title: 'Missed Visits & Structural Containment', 
      slug: 'missed-visits-containment', 
      order_index: 2
    },
    { 
      week_id: week.id, 
      title: 'Re-Exams as Authority Anchors', 
      slug: 're-exams-authority-anchors', 
      order_index: 3
    },
    { 
      week_id: week.id, 
      title: 'Symptom Flare-Ups & Setbacks', 
      slug: 'symptom-flare-ups', 
      order_index: 4
    },
    { 
      week_id: week.id, 
      title: 'Correction vs. Protection', 
      slug: 'correction-vs-protection', 
      order_index: 5
    },
    { 
      week_id: week.id, 
      title: 'The Emotional Cycle of Patients', 
      slug: 'emotional-cycle-patients', 
      order_index: 6
    }
  ];

  const { data: insertedModules, error: modError } = await supabase
    .from('modules')
    .insert(modules)
    .select();

  if (modError) console.error('❌ Error inserting modules:', modError);
  else console.log('✅ 6 Training Units installed.');

  // 4. Register Proprietary Assets (Resources 10-15)
  const resources = [
    { week_id: week.id, title: 'Week 7 Master Overview', type: 'guide', url: '/playbooks/week-7/Week_7_Master_Overview.md' },
    { week_id: week.id, title: 'Population Thinking Playbook', type: 'playbook', url: '/playbooks/week-7/Population_Thinking_Playbook.md' },
    { week_id: week.id, title: 'The Containment Protocol', type: 'cheat-sheet', url: '/playbooks/week-7/The_Containment_Protocol_Cheat_Sheet.md' },
    { week_id: week.id, title: 'Re-Exam Certainty Blueprint', type: 'blueprint', url: '/playbooks/week-7/Re-Exam_Certainty_Blueprint.md' },
    { week_id: week.id, title: 'The Flare-Up Protocol', type: 'protocol', url: '/playbooks/week-7/The_Flare-Up_Protocol.md' },
    { week_id: week.id, title: 'The Emotional Cycle Map', type: 'visual', url: '/playbooks/week-7/The_Emotional_Cycle_Map.md' },
    { week_id: week.id, title: 'Identity Detachment Guide', type: 'guide', url: '/playbooks/week-7/Identity_Detachment_Guide.md' },
    { week_id: week.id, title: 'Correction vs Protection Script', type: 'script', url: '/playbooks/week-7/Correction_vs_Protection_Script.md' }
  ];

  const { error: resError } = await supabase
    .from('resources')
    .insert(resources);

  if (resError) console.error('❌ Error inserting resources:', resError);
  else console.log('✅ 8 Proprietary Assets registered.');

  console.log('🏁 Week 7 Sync Complete.');
}

syncWeek7();
