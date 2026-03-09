-- ADD WEEK 7 LIVE CALL
-- Date: March 8, 2026

INSERT INTO public.live_calls (title, description, call_time, zoom_url)
VALUES (
  'Week 7 Live Call',
  'Live mastermind session for Week 7. Join on Zoom at the scheduled time.',
  '2026-03-10 23:00:00+00', -- 7:00 PM ET (assuming -04:00 offset for DST starting March 8)
  'https://zoom.us/j/mastermind-week-7'
) ON CONFLICT DO NOTHING;
