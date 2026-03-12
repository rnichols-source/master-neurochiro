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
        ('The Master Architect: Week 6 Overview', '/resources/week-6/master-overview.html', 'link', w6_id, false),
        ('Day 1 Playbook: The Uncertainty Filter', '/resources/week-6/day-1-playbook.html', 'link', w6_id, false),
        ('Day 2 Playbook: The Decision Engine', '/resources/week-6/day-2-playbook.html', 'link', w6_id, false),
        ('Day 3 Playbook: The Stabilization Protocol', '/resources/week-6/day-3-playbook.html', 'link', w6_id, false),
        ('The Biological Sequence: Timing & Frequency', '/resources/week-6/biological-sequence.html', 'link', w6_id, false),
        ('The Containment Protocol: Enforcing Structure', '/resources/week-6/containment-protocol.html', 'link', w6_id, false),
        ('The Physics of Frequency: Neurological Timing', '/resources/week-6/physics-of-frequency.html', 'link', w6_id, false),
        ('The Doctrine: Clinical Mastery Standards', '/resources/week-6/mastery-doctrine.html', 'link', w6_id, false),
        ('The Sequence Logic: Rapid Implementation Guide', '/resources/week-6/sequence-cheat-sheet.html', 'link', w6_id, false),
        ('The Behavior Blueprint: Mastering Human Drift', '/resources/week-6/behavior-blueprint.html', 'link', w6_id, false),
        ('The Drift Defender: Neutralizing No-Shows', '/resources/week-6/drift-defender.html', 'link', w6_id, false),
        ('The Authority Anchor: The Re-Exam Reset', '/resources/week-6/authority-anchor.html', 'link', w6_id, false),
        ('The Flare-Up Firewall: Protecting Progress', '/resources/week-6/flare-up-firewall.html', 'link', w6_id, false),
        ('The Protection Pivot: Correction Mastery', '/resources/week-6/protection-pivot.html', 'link', w6_id, false),
        ('The Emotional Arc: Certainty Engineering', '/resources/week-6/emotional-arc.html', 'link', w6_id, false);
    END IF;
END $$;
