-- Update week 7 and 8 titles and slugs to match actual curriculum
UPDATE public.weeks SET
  title = 'Patient Management & Long-Term Clinical Leadership',
  theme = 'Build retention systems and lead patients through complete care.',
  slug = 'week-7-patient-management',
  description = 'Retention systems, handling "I feel better", long-term care leadership.'
WHERE week_number = 7;

UPDATE public.weeks SET
  title = 'Ownership, Contracts & Scaling',
  theme = 'Build something bigger than a job.',
  slug = 'week-8-ownership',
  description = 'Contracts, associate agreements, scaling your practice.'
WHERE week_number = 8;

-- Also fix week 2 slug to be consistent with code references
UPDATE public.weeks SET
  slug = 'week-2-neurology'
WHERE week_number = 2;
