-- WEEK 6 RESOURCES ACTIVATION
-- Date: March 9, 2026

DO $$
DECLARE
    w6_id int;
BEGIN
    -- Find Week 6
    SELECT id INTO w6_id FROM public.weeks WHERE week_number = 6;

    IF w6_id IS NOT NULL THEN
        -- Clear old placeholders if any
        DELETE FROM public.resources WHERE week_id = w6_id;

        -- Insert the New Premium Suite
        INSERT INTO public.resources (title, url, type, week_id, is_pro_only) VALUES
        ('Week 6 Master Overview', '/resources/week-6/master-overview.html', 'link', w6_id, false),
        ('Day 1 Playbook: Uncertainty', '/resources/week-6/day-1-playbook.html', 'link', w6_id, false),
        ('Day 2 Playbook: Decision Architecture', '/resources/week-6/day-2-playbook.html', 'link', w6_id, false),
        ('Day 3 Playbook: Stabilization', '/resources/week-6/day-3-playbook.html', 'link', w6_id, false),
        ('The Biological Sequence', '/resources/week-6/biological-sequence.html', 'link', w6_id, false),
        ('The Containment Protocol', '/resources/week-6/containment-protocol.html', 'link', w6_id, false),
        ('The Physics of Frequency', '/resources/week-6/physics-of-frequency.html', 'link', w6_id, false),
        ('The Doctrine of Clinical Mastery', '/resources/week-6/mastery-doctrine.html', 'link', w6_id, false),
        ('Sequence Cheat Sheet', '/resources/week-6/sequence-cheat-sheet.html', 'link', w6_id, false);
    END IF;
END $$;
