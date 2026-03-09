-- ENSURE WEEK 7 LIVE CALL IS SET CORRECTLY
-- Date: March 10, 2026 at 7:00 PM ET

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM public.live_calls WHERE title = 'Week 7 Live Call') THEN
        UPDATE public.live_calls
        SET 
            description = 'Live mastermind session for Week 7: EQ + Psychosomatic Patterns. Join on Zoom at the scheduled time.',
            call_time = '2026-03-10 23:00:00+00',
            zoom_url = 'https://zoom.us/j/mastermind-week-7',
            is_completed = false
        WHERE title = 'Week 7 Live Call';
    ELSE
        INSERT INTO public.live_calls (title, description, call_time, zoom_url, is_completed)
        VALUES (
          'Week 7 Live Call',
          'Live mastermind session for Week 7: EQ + Psychosomatic Patterns. Join on Zoom at the scheduled time.',
          '2026-03-10 23:00:00+00', -- 7:00 PM ET (UTC-4)
          'https://zoom.us/j/mastermind-week-7',
          false
        );
    END IF;
END $$;
