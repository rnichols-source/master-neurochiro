-- Seed modules for Weeks 5-8
-- Each week gets 3 modules: Main Training, Implementation, Application

-- Week 5: Business: What School NEVER Taught You
INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Revenue Structure & Break-Even Mastery', '5-1-revenue-structure',
  'https://player.vimeo.com/video/placeholder',
  '## Revenue Structure & Break-Even Mastery

Learn how to map your practice finances so you always know your numbers. This module covers break-even analysis, case value clarity, and building a revenue structure that gives you freedom instead of stress.

### Key Topics
- Calculating your true break-even point
- Understanding case value vs visit value
- Building predictable monthly revenue
- Overhead analysis and optimization',
  1, true
FROM public.weeks WHERE slug = 'week-5-business'
ON CONFLICT (week_id, slug) DO NOTHING;

INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Pricing With Confidence', '5-2-pricing-confidence',
  'https://player.vimeo.com/video/placeholder',
  '## Pricing With Confidence

Stop undercharging. Learn how to set pricing that reflects your value and present it to patients without awkwardness.

### Key Topics
- Setting your care plan pricing
- Presenting fees without flinching
- Payment plan structures that work
- Handling the "that''s expensive" objection',
  2, true
FROM public.weeks WHERE slug = 'week-5-business'
ON CONFLICT (week_id, slug) DO NOTHING;

INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Systems vs Chaos: Building Predictable Growth', '5-3-systems-growth',
  'https://player.vimeo.com/video/placeholder',
  '## Systems vs Chaos

Replace reactive management with structured systems that run your practice even when you are not there.

### Key Topics
- Daily, weekly, monthly practice rhythms
- KPI tracking that actually drives decisions
- Team accountability systems
- Scaling without burning out',
  3, true
FROM public.weeks WHERE slug = 'week-5-business'
ON CONFLICT (week_id, slug) DO NOTHING;

-- Week 6: Care Plans, Day 1 / Day 2 Mastery
INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Day 1 Consultation Architecture', '6-1-day1-consultation',
  'https://player.vimeo.com/video/placeholder',
  '## Day 1 Consultation Architecture

Master the first visit so patients feel heard, understood, and confident in your care from the very first interaction.

### Key Topics
- The 4-part consultation framework
- Building value before the exam
- History-taking that uncovers real concerns
- Setting up Day 2 with certainty',
  1, true
FROM public.weeks WHERE slug = 'week-6-care-plans'
ON CONFLICT (week_id, slug) DO NOTHING;

INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Day 2 Report of Findings Structure', '6-2-day2-rof',
  'https://player.vimeo.com/video/placeholder',
  '## Day 2 Report of Findings Structure

The ROF is where care plans are accepted or rejected. Learn the framework that removes pressure and lets patients choose care with confidence.

### Key Topics
- The 4-step ROF framework
- Presenting findings visually
- Recommending care without selling
- Handling questions and objections naturally',
  2, true
FROM public.weeks WHERE slug = 'week-6-care-plans'
ON CONFLICT (week_id, slug) DO NOTHING;

INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Care Plan Worksheet & Practice Scenarios', '6-3-care-plan-practice',
  'https://player.vimeo.com/video/placeholder',
  '## Care Plan Worksheet & Practice Scenarios

Apply the Day 1 and Day 2 frameworks to real-world patient scenarios. Practice presenting care plans until it feels natural.

### Key Topics
- Complete the Care Plan Worksheet
- Practice with 3 common patient scenarios
- Record yourself and review
- Peer feedback exercise',
  3, true
FROM public.weeks WHERE slug = 'week-6-care-plans'
ON CONFLICT (week_id, slug) DO NOTHING;

-- Week 7: Patient Management & Long-Term Clinical Leadership
INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Retention Systems That Work', '7-1-retention-systems',
  'https://player.vimeo.com/video/placeholder',
  '## Retention Systems That Work

Most patients drop off because of poor systems, not poor care. Learn the retention architecture that keeps patients engaged through their entire care plan.

### Key Topics
- The re-exam framework
- Handling "I feel better, do I still need to come?"
- Progress celebrations that build commitment
- Re-activation scripts for dropped patients',
  1, true
FROM public.weeks WHERE slug = 'week-7-patient-management'
ON CONFLICT (week_id, slug) DO NOTHING;

INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Leading Patients Through Complete Care', '7-2-leading-patients',
  'https://player.vimeo.com/video/placeholder',
  '## Leading Patients Through Complete Care

Shift from chasing compliance to leading with clinical authority. Patients follow doctors who lead with certainty.

### Key Topics
- Clinical leadership vs compliance chasing
- The progress conversation framework
- Building patient autonomy within your care plan
- When to adjust vs when to hold the course',
  2, true
FROM public.weeks WHERE slug = 'week-7-patient-management'
ON CONFLICT (week_id, slug) DO NOTHING;

INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Long-Term Practice Leadership', '7-3-practice-leadership',
  'https://player.vimeo.com/video/placeholder',
  '## Long-Term Practice Leadership

Build the clinical leadership skills that create a practice people refer to and a team that executes without micromanagement.

### Key Topics
- Staff training for patient interactions
- Team communication frameworks
- Building a referral-worthy reputation
- Auditing your patient experience',
  3, true
FROM public.weeks WHERE slug = 'week-7-patient-management'
ON CONFLICT (week_id, slug) DO NOTHING;

-- Week 8: Ownership, Contracts & Scaling
INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Contracts & Associate Agreements', '8-1-contracts-agreements',
  'https://player.vimeo.com/video/placeholder',
  '## Contracts & Associate Agreements

Whether you are hiring an associate or signing one yourself, understand the contracts that protect you and set clear expectations.

### Key Topics
- Associate agreement essentials
- Non-compete and non-solicitation clauses
- Compensation structures that align incentives
- Red flags to watch for',
  1, true
FROM public.weeks WHERE slug = 'week-8-ownership'
ON CONFLICT (week_id, slug) DO NOTHING;

INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Scaling Your Practice', '8-2-scaling-practice',
  'https://player.vimeo.com/video/placeholder',
  '## Scaling Your Practice

Go from solo practitioner to practice owner. Learn the systems, team structures, and mindset shifts required to scale.

### Key Topics
- When to hire your first associate
- Multi-location considerations
- Delegation frameworks
- Building a practice that runs without you',
  2, true
FROM public.weeks WHERE slug = 'week-8-ownership'
ON CONFLICT (week_id, slug) DO NOTHING;

INSERT INTO public.modules (week_id, title, slug, video_url, content, order_index, is_published)
SELECT id, 'Your 10-Year Vision & Next Chapter', '8-3-vision-next-chapter',
  'https://player.vimeo.com/video/placeholder',
  '## Your 10-Year Vision & Next Chapter

Review your 8-week progress, set your long-term vision, and plan the next phase of your career.

### Key Topics
- 8-week progress review and KPI comparison
- Setting your 10-year practice vision
- Identifying your next bottleneck
- Council and continued coaching options',
  3, true
FROM public.weeks WHERE slug = 'week-8-ownership'
ON CONFLICT (week_id, slug) DO NOTHING;

-- Welcome post in Community (pinned)
INSERT INTO public.community_posts (user_id, content, pinned)
SELECT id,
'Welcome to Cohort 2 of the NeuroChiro Mastermind!

This is your private community space. Use it to:

- Share wins from your practice
- Ask questions about the curriculum
- Post your KPI progress
- Connect with other doctors in the program

I check this daily and respond to everything. Don''t be shy — the doctors who engage the most get the most out of this program.

Your Week 1 module is live now. Start there, complete the Identity Worksheet, and post your biggest takeaway here.

Let''s build something great together.

— Dr. Nichols',
true
FROM public.profiles WHERE tier = 'admin' LIMIT 1
ON CONFLICT DO NOTHING;
