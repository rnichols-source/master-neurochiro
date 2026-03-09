-- ENSURE ALL 8 WEEKS HAVE MODULES
-- Date: March 8, 2026

DO $$
DECLARE
    w_id int;
BEGIN
    -- WEEK 1
    SELECT id INTO w_id FROM public.weeks WHERE week_number = 1;
    IF w_id IS NOT NULL THEN
        INSERT INTO public.modules (week_id, title, slug, order_index, video_url)
        VALUES (w_id, 'The Identity Gap', '1-1-identity-gap', 1, 'vimeo_101')
        ON CONFLICT (week_id, slug) DO NOTHING;
    END IF;

    -- WEEK 2
    SELECT id INTO w_id FROM public.weeks WHERE week_number = 2;
    IF w_id IS NOT NULL THEN
        INSERT INTO public.modules (week_id, title, slug, order_index, video_url)
        VALUES (w_id, 'Tone and Adaptability', '2-1-tone-adaptability', 1, 'vimeo_201')
        ON CONFLICT (week_id, slug) DO NOTHING;
    END IF;

    -- WEEK 3
    SELECT id INTO w_id FROM public.weeks WHERE week_number = 3;
    IF w_id IS NOT NULL THEN
        INSERT INTO public.modules (week_id, title, slug, order_index, video_url)
        VALUES (w_id, 'The Certainty Script', '3-1-certainty-script', 1, 'vimeo_301')
        ON CONFLICT (week_id, slug) DO NOTHING;
    END IF;

    -- WEEK 4
    SELECT id INTO w_id FROM public.weeks WHERE week_number = 4;
    IF w_id IS NOT NULL THEN
        INSERT INTO public.modules (week_id, title, slug, order_index, video_url)
        VALUES (w_id, 'Subluxation in 2026', '4-1-subluxation-modern', 1, 'vimeo_401')
        ON CONFLICT (week_id, slug) DO NOTHING;
    END IF;

    -- WEEK 5
    SELECT id INTO w_id FROM public.weeks WHERE week_number = 5;
    IF w_id IS NOT NULL THEN
        INSERT INTO public.modules (week_id, title, slug, order_index, video_url)
        VALUES (w_id, 'Revenue Mapping', '5-1-revenue-mapping', 1, 'vimeo_501')
        ON CONFLICT (week_id, slug) DO NOTHING;
    END IF;

    -- WEEK 6 (Ensuring multiple modules exist here)
    SELECT id INTO w_id FROM public.weeks WHERE week_number = 6;
    IF w_id IS NOT NULL THEN
        INSERT INTO public.modules (week_id, title, slug, order_index, video_url)
        VALUES 
        (w_id, 'The Day 1 Consultation', '6-1-day-1-consult', 1, 'https://www.w3schools.com/html/mov_bbb.mp4'),
        (w_id, 'The Clinical Exam', '6-2-clinical-exam', 2, 'vimeo_602'),
        (w_id, 'Day 2 Preparation', '6-3-day-2-prep', 3, 'vimeo_603'),
        (w_id, 'Executing the Close', '6-4-executing-close', 4, 'vimeo_604')
        ON CONFLICT (week_id, slug) DO UPDATE SET 
            title = EXCLUDED.title,
            order_index = EXCLUDED.order_index;
    END IF;

    -- WEEK 7
    SELECT id INTO w_id FROM public.weeks WHERE week_number = 7;
    IF w_id IS NOT NULL THEN
        INSERT INTO public.modules (week_id, title, slug, order_index, video_url)
        VALUES (w_id, 'Reading the Patient', '7-1-reading-patient', 1, 'vimeo_701')
        ON CONFLICT (week_id, slug) DO NOTHING;
    END IF;

    -- WEEK 8
    SELECT id INTO w_id FROM public.weeks WHERE week_number = 8;
    IF w_id IS NOT NULL THEN
        INSERT INTO public.modules (week_id, title, slug, order_index, video_url)
        VALUES (w_id, 'Authority Branding', '8-1-authority-branding', 1, 'vimeo_801')
        ON CONFLICT (week_id, slug) DO NOTHING;
    END IF;

END $$;
