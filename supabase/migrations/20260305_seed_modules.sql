-- Seed Modules for each Week
-- Using fixed UUIDs for consistent testing/links if needed, but uuid_generate_v4() is fine too.

-- Week 1: Identity of a Nervous System Doctor
DO $$
declare
    week1_id int;
begin
    select id into week1_id from public.weeks where slug = 'week-1-identity';
    
    insert into public.modules (week_id, title, slug, order_index, video_url) values
    (week1_id, 'The Identity Gap', '1-1-identity-gap', 1, 'vimeo_101'),
    (week1_id, 'Eliminating Neediness', '1-2-eliminating-neediness', 2, 'vimeo_102'),
    (week1_id, 'Authority Calibration', '1-3-authority-calibration', 3, 'vimeo_103'),
    (week1_id, 'The Expert Framing', '1-4-expert-framing', 4, 'vimeo_104');
end $$;

-- Week 2: Chiropractic Neurology for REAL Practice
DO $$
declare
    week2_id int;
begin
    select id into week2_id from public.weeks where slug = 'week-2-neuro-real';
    
    insert into public.modules (week_id, title, slug, order_index, video_url) values
    (week2_id, 'Tone and Adaptability', '2-1-tone-adaptability', 1, 'vimeo_201'),
    (week2_id, 'HRV: The Clinical Gold Standard', '2-2-hrv-gold-standard', 2, 'vimeo_202'),
    (week2_id, 'The Neurological Baseline', '2-3-neuro-baseline', 3, 'vimeo_203'),
    (week2_id, 'Explaining the Scan', '2-4-explaining-scan', 4, 'vimeo_204');
end $$;

-- Week 3: Communication Mastery
DO $$
declare
    week3_id int;
begin
    select id into week3_id from public.weeks where slug = 'week-3-communication';
    
    insert into public.modules (week_id, title, slug, order_index, video_url) values
    (week3_id, 'The Certainty Script', '3-1-certainty-script', 1, 'vimeo_301'),
    (week3_id, 'Tone Calibration', '3-2-tone-calibration', 2, 'vimeo_302'),
    (week3_id, 'Handling the Money Talk', '3-3-money-talk', 3, 'vimeo_303'),
    (week3_id, 'The Master Report of Findings', '3-4-master-rof', 4, 'vimeo_304');
end $$;

-- Week 4: Philosophy (Modern + Powerful)
DO $$
declare
    week4_id int;
begin
    select id into week4_id from public.weeks where slug = 'week-4-philosophy';
    
    insert into public.modules (week_id, title, slug, order_index, video_url) values
    (week4_id, 'Subluxation in 2026', '4-1-subluxation-modern', 1, 'vimeo_401'),
    (week4_id, 'The Science of Vitalism', '4-2-science-vitalism', 2, 'vimeo_402'),
    (week4_id, 'Philosophy as a Business Strategy', '4-3-philosophy-strategy', 3, 'vimeo_403'),
    (week4_id, 'Answering Tough Questions', '4-4-tough-questions', 4, 'vimeo_404');
end $$;

-- Week 5: Business: What School NEVER Taught You
DO $$
declare
    week5_id int;
begin
    select id into week5_id from public.weeks where slug = 'week-5-business';
    
    insert into public.modules (week_id, title, slug, order_index, video_url) values
    (week5_id, 'Revenue Mapping', '5-1-revenue-mapping', 1, 'vimeo_501'),
    (week5_id, 'Case Value Clarity', '5-2-case-value', 2, 'vimeo_502'),
    (week5_id, 'The Freedom Metric', '5-3-freedom-metric', 3, 'vimeo_503'),
    (week5_id, 'Hiring for Value', '5-4-hiring-value', 4, 'vimeo_504');
end $$;

-- Week 6: Care Plans, Day 1 / Day 2 Mastery
DO $$
declare
    week6_id int;
begin
    select id into week6_id from public.weeks where slug = 'week-6-care-plans';
    
    insert into public.modules (week_id, title, slug, order_index, video_url) values
    (week6_id, 'The Day 1 Consultation', '6-1-day-1-consult', 1, 'vimeo_601'),
    (week6_id, 'The Clinical Exam', '6-2-clinical-exam', 2, 'vimeo_602'),
    (week6_id, 'Day 2 Preparation', '6-3-day-2-prep', 3, 'vimeo_603'),
    (week6_id, 'Executing the Close', '6-4-executing-close', 4, 'vimeo_604');
end $$;

-- Week 7: EQ + Psychosomatic Patterns
DO $$
declare
    week7_id int;
begin
    select id into week7_id from public.weeks where slug = 'week-7-eq';
    
    insert into public.modules (week_id, title, slug, order_index, video_url) values
    (week7_id, 'Reading the Patient', '7-1-reading-patient', 1, 'vimeo_701'),
    (week7_id, 'Stress Overlays', '7-2-stress-overlays', 2, 'vimeo_702'),
    (week7_id, 'Trauma-Informed Adjustment', '7-3-trauma-adjustment', 3, 'vimeo_703'),
    (week7_id, 'The Emotional ROF', '7-4-emotional-rof', 4, 'vimeo_704');
end $$;

-- Week 8: Career Strategy
DO $$
declare
    week8_id int;
begin
    select id into week8_id from public.weeks where slug = 'week-8-strategy';
    
    insert into public.modules (week_id, title, slug, order_index, video_url) values
    (week8_id, 'Authority Branding', '8-1-authority-branding', 1, 'vimeo_801'),
    (week8_id, 'Practice Model Clarity', '8-2-model-clarity', 2, 'vimeo_802'),
    (week8_id, 'The 10-Year Vision', '8-3-10-year-vision', 3, 'vimeo_803'),
    (week8_id, 'Becoming the Leader', '8-4-becoming-leader', 4, 'vimeo_804');
end $$;
