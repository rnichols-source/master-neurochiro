# ABOVE ATLAS — Phase 1 Audit Report
**Date:** 2026-09-08
**Status:** AWAITING APPROVAL

---

## 1. NAMING OCCURRENCES

### "NeuroChiro Mastermind" (exact phrase) — 60+ hits

**COPY (safe to rewrite):**
- `src/lib/emails.ts` — Lines 87, 92, 102, 112, 114, 123, 133, 140, 142, 192, 233, 251 (email subject lines, body copy, footer text)
- `src/app/layout.tsx` — Lines 29-30, 40, 43, 49, 57 (metadata, og:title, schema.org)
- `src/app/page.tsx` — Lines 23-24 (schema org name/logo)
- `src/app/links/page.tsx` — Lines 7, 9 (link-in-bio page title)
- `src/app/login/layout.tsx` — Line 5 (page title)
- `src/app/apply/mentorship/page.tsx` — Line 7 (metadata)
- `src/app/pricing/page.tsx` — product descriptions throughout
- `src/app/waitlist/page.tsx` — Lines 158, 599
- `src/app/free-training/confirmation/page.tsx` — Line 36
- `src/app/council/application/CouncilApplyClient.tsx` — Line 207
- `src/components/layout/seo-footer.tsx` — Line 49
- `src/app/resources/blog/[slug]/page.tsx` — Line 75
- `src/content/blog/*.md` — 6 blog posts reference "NeuroChiro Mastermind" (10+ hits)
- `src/app/portal/rapid-roi/script/page.tsx` — Line 209
- `src/app/portal/triage/script/page.tsx` — Line 200
- `src/app/portal/triage/TriageClient.tsx` — Line 157
- `src/app/actions/scout-actions.ts` — Lines 140-143 (AI agent prompt text)
- `src/app/actions/comms-actions.ts` — Line 238 (email template text)
- `src/app/actions/hunter-actions.ts` — Lines 363, 374 (agent prompt text)

**ROUTE/URL:**
- No routes contain "mastermind" in the path. Routes use `/portal/`, `/apply/`, `/pricing/`, `/council/`. Safe.

**DATA KEY:**
- `applications.responses.application_type` stores `'Mastermind'` as a value — `src/app/actions/submit-application.ts:9`, `src/app/apply/page.tsx:49`
- `supabase/migrations/20260416_seed_weeks_5_8.sql:203` — "Welcome to Cohort 2 of the NeuroChiro Mastermind!" seeded into community posts
- `supabase/migrations/20260623_inner_circle.sql:12` — `mastermind_cohort text` column on inner_circle_members table

**EXTERNAL:**
- `neurochiromastermind.com` domain hardcoded in:
  - `src/lib/emails.ts:8` — FROM_EMAIL (`support@neurochiromastermind.com`)
  - `src/lib/notifications.ts:30` — avatar URL
  - `src/components/layout/AccountMenu.tsx:73` — support email link
  - `src/app/page.tsx:23-24` — schema.org URL
  - `src/app/layout.tsx:27, 42` — metadata base URL
  - `src/app/api/stripe/create-checkout/route.ts:40` — SITE_URL fallback
  - `src/app/actions/update-application.ts` — SITE_URL fallback
  - Multiple action files — portal links in emails

### "Mastermind" (standalone) — 30+ additional hits
Same files as above, plus sidebar, header components, COHORT_3_PLAYBOOK.md.

### "NCM" — 0 hits. Clean.

### Tier Names

**"90-Day Intensive" / "Foundations Intensive":**
- `src/app/pricing/page.tsx` — Lines 10-15, 62-87 (COPY)
- `src/app/page.tsx` — Lines 40-43, 78, 139, 340, 370 (COPY)
- `src/components/ui/faq-section.tsx` — Lines 10, 26 (COPY)

**"Inner Circle":**
- 40+ occurrences across: `src/app/inner-circle/`, `src/app/portal/council/`, `src/lib/emails.ts`, `src/app/pricing/page.tsx`, sidebar, FAQ
- DATA KEY: `profiles.tier` can be `'inner-circle'` — stored in DB
- DATA KEY: `inner_circle_members` table name — migration `20260623`
- STRIPE: `"inner-circle"` price key in `src/app/api/stripe/create-checkout/route.ts:10`

**"The Council":**
- 25+ occurrences across: `src/app/council/`, Council application form, FAQ
- ROUTE: `/council/`, `/council/application/`, `/portal/council/`
- The Council keeps its name per instructions. No action needed.

**"Standard" / "Pro" (as tier names):**
- DATA KEY: `profiles.tier` enum: `'standard'`, `'pro'`, `'admin'` — `supabase/migrations/20260304_init.sql:7`
- STRIPE: `"standard-pif"`, `"standard-plan"`, `"pro-pif"`, `"pro-plan"` + student variants — 8 price keys
- These are internal tier identifiers. Display labels can change; keys cannot without migration.

### Stripe Price Keys (DO NOT CHANGE without Stripe dashboard update)
```
Legacy (Cohort 1 & 2):
  standard-pif, standard-plan, pro-pif, pro-plan
  student-standard-pif, student-standard-plan, student-pro-pif, student-pro-plan

Cohort 3+:
  intensive-monthly, intensive-pif
  inner-circle, founding-member
  student-intensive-monthly, student-intensive-pif, student-inner-circle

Private Coaching (env vars, no Stripe products created yet):
  coaching-private-pif, coaching-private-plan
  coaching-intensive-pif, coaching-intensive-plan
  coaching-onsite-pif, coaching-onsite-plan
```

### No Manychat or Google Apps Script references found in codebase.
GHL migration reference exists: `src/app/actions/activation-actions.ts:177` — `source: 'ghl_migration'` (DATA KEY, do not change).

---

## 2. EXISTING CURRICULUM INVENTORY

### Database-Driven LMS (8 weeks, 28 modules)

| Week | Title | Modules | Content Status |
|------|-------|---------|----------------|
| 1 | Identity of a Nervous System Doctor | 4 (Identity Gap, Eliminating Neediness, Authority Calibration, Expert Framing) | Minimal markdown |
| 2 | Chiropractic Neurology for REAL Practice | 4 (Re-Orientation, Academic Residue, What the Adjustment Does, Translating Neurology) | Minimal markdown |
| 3 | Communication Mastery | 4 (Certainty Script, Tone Calibration, Money Talk, Master ROF) | Minimal markdown |
| 4 | Philosophy (Modern + Powerful) | 4 (Subluxation in 2026, Science of Vitalism, Philosophy as Strategy, Tough Questions) | Minimal markdown |
| 5 | Business: What School NEVER Taught You | 3 (Revenue Structure, Pricing Confidence, Systems vs Chaos) | Full markdown (seeded) |
| 6 | Care Plans, Day 1/Day 2 Mastery | 3 (Day 1 Consultation, Day 2 ROF, Care Plan Practice) | Full markdown (seeded) |
| 7 | Patient Management & Long-Term Clinical Leadership | 3 (Retention Systems, Leading Patients, Practice Leadership) | Full markdown (seeded) |
| 8 | Ownership, Contracts & Scaling | 3 (Contracts & Agreements, Scaling Practice, 10-Year Vision) | Full markdown (seeded) |

### Static HTML Deploy (Weeks 1-2 only, finished content)

Location: `/Users/raymondnichols/Projects/neurochiro-mastermind-deploy/index.html`

- **Week 1:** 6 sections, fully written (Arrival/Tone, Doctor Mode vs Student Mode, Identity Installation, Week 1 Integration, Basic Communication, Simplicity as Integration)
- **Week 2:** 7 sections, fully written (Re-Orientation, Academic Residue, What the Adjustment Does, Translating Neurology, Assignment Architecture, Week 2 Integration, Close)
- Each section: 800-1500 words with Opening Hook, Core Content, Key Clinical Pearls, Section Summary
- 80+ pearls extracted
- Stored as JavaScript constants: `SECTIONS` (Week 1), `SECTIONS_W2` (Week 2)
- State in localStorage keys: `neurochiro_w1`, `neurochiro_w2`

### Manuscript
`MANUSCRIPT.md` — 10,000+ word book providing the intellectual foundation. Not directly in the LMS but informs all content.

---

## 3. 8-WEEK → 12-WEEK CONTENT MAPPING

Per the curriculum doc's BUILD NOTES, here is how existing content maps:

| New Week (Above Atlas Doctors) | Existing Content | Status |
|------|------|--------|
| **Wk 1 — The Subluxation Above Atlas** | NONE | NEW CONTENT NEEDED |
| **Wk 2 — Where You Learned to Shrink** | NONE | NEW CONTENT NEEDED |
| **Wk 3 — The Congruence Audit** | NONE | NEW CONTENT NEEDED |
| **Wk 4 — What You Actually Believe** | Old Wk 4 (Philosophy) — partial overlap | REFRAME needed |
| **Wk 5 — Certainty Without Overclaiming** | Old Wk 2 (Neurology) + Old Wk 3 (Communication) — elements of both | REFRAME + MERGE |
| **Wk 6 — The Right to Recommend** | NONE | NEW CONTENT NEEDED |
| **Wk 7 — The Room** | Old Wk 1 (Identity, Tone, Presence) — heavy overlap with static HTML Week 1 content | REFRAME existing |
| **Wk 8 — Report of Findings as Leadership** | Old Wk 6 (Care Plans, Day 1/Day 2) — direct match, curriculum doc says "Your existing Week 6 content lives here" | MOVE + REFRAME |
| **Wk 9 — Holding the Line** | Old Wk 3 (Communication — objection handling portions) | REFRAME |
| **Wk 10 — The Practice Is Downstream** | Old Wk 5 (Business) — curriculum doc says "Your existing Week 5 business content lives here, reframed" | MOVE + REFRAME |
| **Wk 11 — Leading People Who Aren't Patients** | Old Wk 8 (Ownership, Contracts) — curriculum doc says "Your existing Week 8 contracts and ownership content lives here" | MOVE + REFRAME |
| **Wk 12 — The Doctor You'll Be in Ten Years** | Old Wk 7 (Patient Management) — partial, plus new closing framework | PARTIAL + NEW |

**Summary:** ~5 weeks are genuinely new (1, 2, 3, 6, 12). The other 7 reframe and reposition existing content.

**Student track** is entirely new content across all 12 weeks. No existing student-specific curriculum exists beyond the student pricing/application flow.

---

## 4. 8→12 WEEK DATA MIGRATION PROBLEM

### What breaks:

**A. `weeks` table has 8 rows (week_number 1-8).**
Moving to 12 weeks across two tracks means:
- Need 24 week rows (12 doctor + 12 student), OR
- Need a `track` column on the `weeks` table (`'doctor'` | `'student'`)
- All existing `week_number` values (1-8) become ambiguous without a track identifier

**B. `modules` table has 28 modules linked to 8 week IDs.**
- Modules must be reassigned to new week IDs
- Some modules move weeks (e.g., old Week 5 modules move to new Week 10)
- Module slugs may need updating if week context changes

**C. `member_progress` tracks completion by module_id.**
- If module IDs stay the same and just re-parent to new weeks, existing progress records survive
- If modules are deleted/recreated, all progress is lost
- **Recommendation:** Keep existing module UUIDs. Re-parent them to new week IDs. Progress survives.

**D. Sequential unlock logic is hardcoded to 8 weeks.**
```javascript
const COHORT_START = new Date('2026-04-21T00:00:00-04:00')
const weeksSinceStart = Math.floor((now - COHORT_START) / msPerWeek)
const maxUnlockedWeek = Math.max(0, weeksSinceStart + 1)
```
- This formula assumes 8 linear weeks from one start date
- Must be updated to: per-track week count (12), per-cohort start date (not hardcoded), track-aware unlock
- **Currently all weeks are unlocked** (20+ weeks since April 21) so the formula won't break immediately, but it's wrong for new cohorts

**E. Curriculum UI assumes one linear track.**
- `/portal/curriculum/page.tsx` fetches all weeks ordered by `week_number`
- Must filter by user's track (doctor vs student)
- Week detail page `/portal/curriculum/[slug]/` needs track-aware routing

**F. `profiles.cohort_id` links to a single cohort.**
- Must support track assignment (doctor vs student within same cohort)
- Options: add `track` column to `profiles`, or encode track in cohort name

**G. Static HTML deploy uses localStorage keys `neurochiro_w1`, `neurochiro_w2`.**
- Separate product, separate deploy. Can rename or leave as-is.
- If Above Atlas gets its own static deploy, new keys.

### What happens to mid-program members:
- **Cohort 2 is 20+ weeks past start (April 21).** All 8 weeks are unlocked. All content is accessible.
- If we re-parent modules to new week IDs, Cohort 2 members' `member_progress` records still point to valid module UUIDs. Their progress survives.
- Their curriculum view will show the NEW 12-week structure with their completions scattered across it.
- **This is the problem.** Cohort 2 paid for "NeuroChiro Mastermind" 8-week. Showing them a 12-week Above Atlas view with 4 empty weeks is confusing and arguably a different product.

### Recommended approach:
- Cohort 2 members stay on the old 8-week structure (frozen view)
- New Above Atlas cohorts get the 12-week structure
- Filter by `profiles.cohort_id` to determine which curriculum view to render
- This means maintaining both structures temporarily

---

## 5. COHORT 2 FLAGS

**Cohort 2 is live.** Started April 21, 2026. Currently 20 weeks in (program complete).

**DO NOT rename:**
- Community welcome post: "Welcome to Cohort 2 of the NeuroChiro Mastermind!" (seeded in migration `20260416`)
- Any email already sent to Cohort 2 members
- Their `profiles.cohort_id` record
- Their `member_progress` records

**Cohort 2 members who are now in Inner Circle:**
- `inner_circle_members.mastermind_cohort` field stores their original cohort
- Their Inner Circle experience can rebrand to Above Atlas (it's a separate ongoing product)
- But their historical cohort reference should stay "Cohort 2"

**Cohort 3 (planned for July, may not have launched):**
- If Cohort 3 hasn't started: rebrand it as Above Atlas Cohort 1
- If Cohort 3 has started: same rules as Cohort 2, don't rename mid-delivery

**Pricing page, application flow, sales pages:**
- These are forward-looking. Safe to rebrand to Above Atlas immediately.
- Old Stripe price keys stay. New Above Atlas products get new Stripe products/prices.

---

## SUMMARY: RISK MATRIX

| Category | Count | Risk |
|----------|-------|------|
| COPY (display text) | 90+ occurrences | LOW — find and replace, no breakage |
| ROUTE/URL | 0 "mastermind" routes | LOW — no path contains "mastermind" |
| DATA KEY | 6 critical keys | HIGH — `application_type: 'Mastermind'`, tier enum values, `mastermind_cohort` column, Stripe price keys |
| EXTERNAL | Domain `neurochiromastermind.com` in 10+ files | MEDIUM — need redirect plan or keep domain as alias |
| Curriculum restructure | 8→12 weeks, single→dual track | HIGH — requires schema changes, new unlock logic, cohort-aware views |
| Cohort 2 protection | Active members with existing data | HIGH — must freeze their view |

---

**AWAITING YOUR APPROVAL TO PROCEED TO PHASE 2.**
