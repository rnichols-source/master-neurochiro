-- ADD THE VAGUS NERVE GUIDE TO THE VAULT
INSERT INTO public.vault_resources (
  title, 
  description, 
  category, 
  tier, 
  resource_type, 
  content, 
  is_featured,
  url
)
VALUES (
  'The Vagus Nerve Guide: Master Regulation',
  'A premium 15-page educational framework explaining the Vagus Nerve, dysregulation, and the chiropractic connection. Perfect for patient handouts or internal team training.',
  'patient_edu',
  'standard',
  'script',
  'THE VAGUS NERVE GUIDE\nUnderstanding the Body’s Master Regulation System\n\nWHY THIS MATTERS:\nThe Vagus Nerve is one of the primary communication highways between your brain and your body. Its integrity determines your ability to handle stress, digest food, and heal from injury.\n\nWHAT IT CONTROLS:\n- Heart Rate & Rhythm\n- Respiratory Pattern\n- Digestive Enzymes & Motility\n- Systemic Inflammation (The "Off-Switch")\n- Sleep Cycles\n\nTHE CHIROPRACTIC CONNECTION:\nThe Vagus Nerve exits the skull right next to the top bone in your neck (the Atlas). Structural stress here acts like "static on a radio station," preventing the brain from sending the "Rest and Regulate" signal. We remove the static to restore the highway.',
  true,
  'https://neurochiromastermind.com/portal/vault'
) ON CONFLICT DO NOTHING;
