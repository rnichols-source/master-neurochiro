-- ACTIVATION MIGRATION: Mastermind Platform Live Usage
-- Date: March 8, 2026

-- 1. ENUMS
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'profile_status') THEN
        CREATE TYPE profile_status AS ENUM ('pending_profile', 'profile_started', 'profile_completed');
    END IF;
END $$;

-- 2. UPDATE PROFILES TABLE
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'member', -- mastermind_member, etc.
ADD COLUMN IF NOT EXISTS status profile_status DEFAULT 'pending_profile',
ADD COLUMN IF NOT EXISTS clinic_name text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS years_practicing int,
ADD COLUMN IF NOT EXISTS school text,
ADD COLUMN IF NOT EXISTS graduation_year int,
ADD COLUMN IF NOT EXISTS technique_focus text,
ADD COLUMN IF NOT EXISTS specialty_tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS intro_video_url text,
ADD COLUMN IF NOT EXISTS onboarding_completed_at timestamptz;

-- 3. RENAME PROGRESS TO MEMBER_PROGRESS (Step 3 Requirement)
ALTER TABLE IF EXISTS public.progress RENAME TO member_progress;

-- 4. CREATE MEMBER ACTIVITY TABLE (Step 11 Requirement)
CREATE TABLE IF NOT EXISTS public.member_activity (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    activity_type text NOT NULL, -- 'login', 'video_start', 'video_complete', 'resource_download', 'dashboard_view'
    module_id uuid REFERENCES public.modules(id) ON DELETE SET NULL,
    details jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now()
);

-- RLS: Member Activity
ALTER TABLE public.member_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activity"
    ON public.member_activity FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity"
    ON public.member_activity FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND tier = 'admin'));

-- 5. UPDATE WEEK 6 CONTENT (Step 2 Requirement)
DO $$
DECLARE
    week6_id int;
    module_id uuid;
BEGIN
    SELECT id INTO week6_id FROM public.weeks WHERE slug = 'week-6-care-plans';

    -- Ensure we have the main Week 6 training module
    -- We'll update the existing ones if they exist or insert new ones
    
    -- Main Training Video
    UPDATE public.modules 
    SET title = 'Week 6 — Care Plans / Day 1 & Day 2 Mastery',
        content = '## Section 1 — Implementation Summary\nComplete the Care Plan Worksheet before the next coaching call.\n\n## Section 2 — Day 1 Consultation Architecture\nMastering the history and exam to build unshakeable value.\n\n## Section 3 — Day 2 Report of Findings Structure\nThe 4-step framework for recommending care with certainty.',
        video_url = 'https://www.w3schools.com/html/mov_bbb.mp4' -- Placeholder for adaptive streaming demo
    WHERE week_id = week6_id AND order_index = 1;

    -- Resources for Week 6
    -- First, get the module id for the first module of week 6
    SELECT id INTO module_id FROM public.modules WHERE week_id = week6_id AND order_index = 1;

    -- Insert Resources
    INSERT INTO public.resources (title, url, type, week_id, module_id) VALUES
    ('Care Plan Worksheet', 'https://storage.neurochiromastermind.com/resources/care-plan-worksheet.pdf', 'pdf', week6_id, module_id),
    ('Day 1 Script', 'https://storage.neurochiromastermind.com/resources/day-1-script.pdf', 'pdf', week6_id, module_id),
    ('Day 2 ROF Framework', 'https://storage.neurochiromastermind.com/resources/day-2-rof-framework.pdf', 'pdf', week6_id, module_id)
    ON CONFLICT DO NOTHING;

END $$;
