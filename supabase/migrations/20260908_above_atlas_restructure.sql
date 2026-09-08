-- =============================================================================
-- ABOVE ATLAS — 8→12 Week Restructure + Dual Track + Rep System
-- =============================================================================
-- This migration:
-- 1. Adds a 'track' column to weeks (doctor/student)
-- 2. Adds a 'track' column to profiles
-- 3. Adds phase metadata to weeks
-- 4. Creates the rep_submissions table (core mechanic)
-- 5. Tags existing 8 weeks as 'doctor' track (backward compatible)
-- 6. Seeds new 12-week structure for both tracks
--
-- IMPORTANT: Does NOT delete existing weeks or modules.
-- Existing Cohort 2 progress records remain valid.
-- =============================================================================

-- 1. Add track column to weeks table
ALTER TABLE public.weeks ADD COLUMN IF NOT EXISTS track text DEFAULT 'doctor' CHECK (track IN ('doctor', 'student'));
ALTER TABLE public.weeks ADD COLUMN IF NOT EXISTS phase int;
ALTER TABLE public.weeks ADD COLUMN IF NOT EXISTS phase_name text;
ALTER TABLE public.weeks ADD COLUMN IF NOT EXISTS rep_prompt text;
ALTER TABLE public.weeks ADD COLUMN IF NOT EXISTS program text DEFAULT 'above-atlas';

-- Drop the unique constraint on week_number (now need track+week_number unique)
ALTER TABLE public.weeks DROP CONSTRAINT IF EXISTS weeks_week_number_key;
ALTER TABLE public.weeks ADD CONSTRAINT weeks_track_week_number_key UNIQUE (track, week_number, program);

-- 2. Add track column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS track text DEFAULT 'doctor' CHECK (track IN ('doctor', 'student'));

-- 3. Create rep submissions table
CREATE TABLE IF NOT EXISTS public.rep_submissions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  week_id int REFERENCES public.weeks(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  attachment_url text,
  status text DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewed', 'needs_revision')),
  admin_feedback text,
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES public.profiles(id),
  submitted_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, week_id)
);

-- RLS: Rep Submissions
ALTER TABLE public.rep_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reps"
  ON public.rep_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can submit their own reps"
  ON public.rep_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reps"
  ON public.rep_submissions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reps"
  ON public.rep_submissions FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND tier = 'admin'));

-- 4. Tag existing 8 weeks as legacy (Cohort 2 / old program)
UPDATE public.weeks SET program = 'legacy', track = 'doctor' WHERE week_number <= 8 AND program IS NULL OR program = 'above-atlas';

-- 5. Seed Above Atlas Doctor Track (12 weeks)
INSERT INTO public.weeks (title, theme, slug, description, week_number, track, phase, phase_name, rep_prompt, program, is_published) VALUES
-- Phase 1: You're the Problem
('The Subluxation Above Atlas', 'Identity', 'aa-doc-wk1', 'He has never seriously considered that the ceiling is him.', 1, 'doctor', 1, 'You''re the Problem', 'Record your own report of findings. Watch it back. Count how many times you hedged, how long you waited after saying the number, and whether you apologized. Turn in the count, not the recording.', 'above-atlas', true),
('Where You Learned to Shrink', 'Identity', 'aa-doc-wk2', 'Somewhere he learned to make himself smaller. He over-explains to MDs. He downplays what he does at parties.', 2, 'doctor', 1, 'You''re the Problem', 'Write the origin story of the flinch. When did you first learn that being a chiropractor required a defense? Who taught you? Then write what you''d say now.', 'above-atlas', true),
('The Congruence Audit', 'Identity', 'aa-doc-wk3', 'He recommends 3x/week for 12 weeks and hasn''t been adjusted himself in five months.', 3, 'doctor', 1, 'You''re the Problem', 'Get on a care plan. With a real DC, at full fee, paid. Book it this week and turn in the receipt.', 'above-atlas', true),
-- Phase 2: Pick a Side
('What You Actually Believe', 'Philosophy', 'aa-doc-wk4', 'He''s philosophically homeless. Too evidence-minded for the straight crowd, too principled for the mechanical crowd.', 4, 'doctor', 2, 'Pick a Side', 'Write a one-page philosophy. Not a mission statement. What you believe about the body, healing, and your role. Read it out loud on the call.', 'above-atlas', true),
('Certainty Without Overclaiming', 'Communication', 'aa-doc-wk5', 'Two failure modes: overclaim and feel like a fraud, or underclaim and sound like a PT with worse equipment.', 5, 'doctor', 2, 'Pick a Side', 'Build your defensible claims list. Every claim you make clinically, what backs it, and your exact wording.', 'above-atlas', true),
('The Right to Recommend', 'Sales', 'aa-doc-wk6', 'He was trained to feel dirty about recommending care. So he soft-pedals the plan and discounts before being asked.', 6, 'doctor', 2, 'Pick a Side', 'Recommend the full plan, at full fee, to the next five patients. No pre-discount. Log what happened with all five, including the ones who said no.', 'above-atlas', true),
-- Phase 3: Open Your Mouth
('The Room', 'Presence', 'aa-doc-wk7', 'He talks too fast. He fills silence because silence feels like rejection. All of it reads as uncertainty.', 7, 'doctor', 3, 'Open Your Mouth', 'Say the number, then say nothing. Count to five before speaking again. Five patients. Report what happened in the silence.', 'above-atlas', true),
('The Report of Findings as Leadership', 'Clinical', 'aa-doc-wk8', 'He''s presenting information and hoping the patient draws the conclusion. That''s a briefing, not leadership.', 8, 'doctor', 3, 'Open Your Mouth', 'Rebuild your Day 1 / Day 2 architecture around one question: at what moment does the patient understand this is a recommendation, not a menu?', 'above-atlas', true),
('Holding the Line', 'Objections', 'aa-doc-wk9', '"I need to talk to my spouse." He takes objections as verdicts on his worth instead of normal moments in a conversation.', 9, 'doctor', 3, 'Open Your Mouth', 'Live role-play on the call. Unscripted. You in the chair.', 'above-atlas', true),
-- Phase 4: Don't Go Back
('The Practice Is Downstream', 'Business', 'aa-doc-wk10', 'His numbers are attached to his self-worth. Low PVA is a Day 1 problem. Low case average is a conviction problem.', 10, 'doctor', 4, 'Don''t Go Back', 'Pull your numbers for the last 90 days. Map each metric back upstream to the identity moment that drives it. Present the map on the call.', 'above-atlas', true),
('Leading People Who Aren''t Patients', 'Leadership', 'aa-doc-wk11', 'He''s a doctor in the adjusting room and a conflict-avoidant employee in his own business.', 11, 'doctor', 4, 'Don''t Go Back', 'The conversation you''ve been avoiding. Have it this week. Report what happened.', 'above-atlas', true),
('The Doctor You''ll Be in Ten Years', 'Integration', 'aa-doc-wk12', 'Twelve weeks of change with no structure to hold it reverts inside a quarter.', 12, 'doctor', 4, 'Don''t Go Back', 'Write your doctor''s code. Non-negotiables, your fee, your plan, your own care, your standards. Plus name the person who is allowed to check you.', 'above-atlas', true)
ON CONFLICT (track, week_number, program) DO NOTHING;

-- 6. Seed Above Atlas Student Track (12 weeks)
INSERT INTO public.weeks (title, theme, slug, description, week_number, track, phase, phase_name, rep_prompt, program, is_published) VALUES
-- Phase 1: You're the Problem
('Nobody Is Coming to Give You Permission', 'Identity', 'aa-stu-wk1', 'Sixteen years of being graded. He''s waiting for someone to tell him he''s ready. They don''t appear at graduation.', 1, 'student', 1, 'You''re the Problem', 'Introduce yourself as a doctor to five people this week. Not "I''m a student." Watch what your body does when you say it. Write that down.', 'above-atlas', true),
('Where You Learned to Hedge', 'Identity', 'aa-stu-wk2', '"I think." "Hopefully." "We can try." Every sentence has an escape hatch.', 2, 'student', 1, 'You''re the Problem', 'Record yourself explaining a finding to a classmate. Count the hedges. Do it again with zero.', 'above-atlas', true),
('The Congruence Audit', 'Identity', 'aa-stu-wk3', 'He''s about to spend a career telling people to get adjusted and hasn''t been checked since the last technique lab.', 3, 'student', 1, 'You''re the Problem', 'Get on a care plan with a DC in town. Pay for it. Turn in the receipt.', 'above-atlas', true),
-- Phase 2: Pick a Side
('What You Actually Believe', 'Philosophy', 'aa-stu-wk4', 'Campus tribalism handed him two boxes. He picked whichever one his favorite instructor was in.', 4, 'student', 2, 'Pick a Side', 'One page. What you believe and why. Read aloud on the call.', 'above-atlas', true),
('Say It at Thanksgiving', 'Communication', 'aa-stu-wk5', 'His uncle asks what chiropractic actually does. He either gets defensive, gets technical, or shrugs.', 5, 'student', 2, 'Pick a Side', 'Explain what you do, under sixty seconds, no jargon, to three different people. Refine it each time. Turn in all three versions.', 'above-atlas', true),
('Your Hands', 'Technique', 'aa-stu-wk6', 'Technique anxiety. He compensates by studying more theory because reading is safe and adjusting is not.', 6, 'student', 2, 'Pick a Side', 'Reps under observation. Volume, with feedback, in front of people.', 'above-atlas', true),
-- Phase 3: Open Your Mouth
('The Room', 'Presence', 'aa-stu-wk7', 'Eye contact, pace, posture. Nobody has coached him on how to be in a room with someone scared and in pain.', 7, 'student', 3, 'Open Your Mouth', 'Practice entering a room, making eye contact, and holding silence for five seconds before speaking. Five reps. Report what you noticed.', 'above-atlas', true),
('Learn the Consult Before You Need It', 'Clinical', 'aa-stu-wk8', 'He will learn the consultation by failing at it on real patients in his first job. That''s a brutal way to learn.', 8, 'student', 3, 'Open Your Mouth', 'Build your full consult and ROF architecture. Rehearse until it''s yours. Present on the call.', 'above-atlas', true),
('Holding the Line', 'Objections', 'aa-stu-wk9', 'In clinic he begs. He needs the numbers to graduate, so he discounts and over-accommodates.', 9, 'student', 3, 'Open Your Mouth', 'Live objection role-play. Same as the doctor track, no easier.', 'above-atlas', true),
-- Phase 4: Don't Go Back
('The Money Reality', 'Business', 'aa-stu-wk10', 'Six figures of debt and no idea what a practice grosses or what a fair associate contract looks like.', 10, 'student', 4, 'Don''t Go Back', 'Read a real associate contract. Line by line. Know what every clause does. Turn in your annotated version.', 'above-atlas', true),
('Choosing Your First Five Years', 'Career', 'aa-stu-wk11', 'He thinks the big decision is associate versus start your own. It isn''t. It''s who he stands next to every day.', 11, 'student', 4, 'Don''t Go Back', 'Write your criteria before you interview anywhere. What you will and won''t accept.', 'above-atlas', true),
('Day One', 'Integration', 'aa-stu-wk12', 'Most new grads spend eighteen months apologizing for their inexperience, and patients believe them.', 12, 'student', 4, 'Don''t Go Back', 'Write your code, your standards, your fee floor, and name the person who checks you.', 'above-atlas', true)
ON CONFLICT (track, week_number, program) DO NOTHING;
