-- SEED VAULT DATA
INSERT INTO public.vault_resources (title, description, category, tier, resource_type, content, is_featured)
VALUES 
-- Category: Clinical Communication
('The Authority Consultation Opening', 'Establish clinical certainty in the first 2 minutes of the consultation.', 'communication', 'standard', 'script', 'Dr: "Mrs. Jones, before we begin, I want to be clear about my goal today. I am not here to treat your symptoms. I am here to evaluate the integrity of your nervous system..."', true),
('Day 2: The High-Ticket Close', 'Advanced financial transition script for $5k+ care plans.', 'communication', 'pro', 'script', 'The transition from clinical findings to financial commitment needs to be seamless...', false),
('Objection Mastery: "I Need to Think About It"', 'Empathy-driven framework to uncover the real barrier to care.', 'communication', 'pro', 'script', 'Dr: "I understand. Usually, when someone says they need to think about it, it is either because they do not believe this is the solution, or they do not believe they can afford it..."', true),

-- Category: ROF System
('The Decision Architecture ROF', 'A complete slide deck for the modern Nervous-System-First Report of Findings.', 'rof', 'pro', 'pdf', null, true),
('Visual ROF Diagrams: The Adaptation Arc', 'Simple visual tool to explain neurological stress patterns to patients.', 'rof', 'standard', 'pdf', null, false),

-- Category: Care Plan Architecture
('The Biological Frequency Framework', 'Why 3x per week is not arbitrary. Clinical logic for care plan frequency.', 'care_plan', 'pro', 'pdf', null, true),
('Re-Exam Script: Transitioning to Wellness', 'How to move a patient from corrective care into lifetime wellness.', 'care_plan', 'pro', 'script', 'The re-exam is the bridge to the future...', false),

-- Category: Marketing & Reactivation
('The "Neural Pulse" Reactivation Campaign', 'Complete email and SMS sequence to bring back inactive patients.', 'marketing', 'pro', 'template', null, true),
('Community Talk Outline: The Vagus Nerve', 'High-conversion community presentation outline focusing on the Vagus Nerve.', 'marketing', 'standard', 'pdf', null, false),

-- Category: Staff Training
('Front Desk Excellence: The 1st Phone Call', 'The exact script for your team to turn a price-shopper into a Day 1 appointment.', 'staff', 'pro', 'script', 'Greeting: "Welcome to [Clinic Name], this is [Name], how can I help you save your life today?" (Just kidding, do not say that)...', false),

-- Category: Clinic OS
('The CEO KPI Tracker V2', 'Advanced Excel/Google Sheet for tracking practice health beyond just revenue.', 'clinic_os', 'pro', 'template', null, true),

-- Category: Patient Education
('The Vagus Nerve Guide (Branded PDF)', 'Patient-facing guide explaining the role of the Vagus Nerve in health.', 'patient_edu', 'standard', 'pdf', null, false),

-- Category: Leadership
('The Burnout Prevention Protocol', 'Leadership framework for practice owners to maintain high-performance without exhaustion.', 'leadership', 'pro', 'pdf', null, false),

-- Category: Masterclass
('Masterclass: The Physics of Frequency', 'Dr. Nichols explains the neurological basis for high-frequency care.', 'masterclass', 'pro', 'video', null, true)
ON CONFLICT DO NOTHING;
