-- Add new columns for role-based onboarding
alter table public.profiles 
  add column if not exists user_type text,
  add column if not exists practice_type text,
  add column if not exists website text,
  add column if not exists chiropractic_school text,
  add column if not exists graduation_year text,
  add column if not exists current_year_in_school text,
  add column if not exists areas_of_interest text[];
