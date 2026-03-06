# Master NeuroChiro: Elite Mastermind OS

## 🎯 Project Vision
An elite, high-performance platform for "Nervous-System-First" chiropractors to master clinical certainty and practice growth. The platform handles everything from the initial application funnel to a data-driven clinical dashboard and an 8-week curriculum.

## 🛠 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database/Auth:** Supabase (@supabase/ssr)
- **Styling:** Tailwind CSS v4 + Framer Motion (Elite/Premium Aesthetic)
- **UI Components:** Custom "Elite UI" (EliteCard, BrandButton)
- **Payments:** Stripe (Standard & Pro PIF/Payment Plans)
- **Charts:** Recharts (KPI Visualization)

## 📍 Current Project State (March 2026)

### ✅ Completed & Live
- **Landing Page:** High-converting "Elite Admission" branding.
- **KPI Dashboard:** Fully integrated with Supabase. Displays live trends for Patient Visits, Collections, and New Patients.
- **KPI Entry Engine:** `KPIEntryModal` and `kpi-actions.ts` allow doctors to submit weekly "Intelligence Input" directly to the database.
- **Revenue Velocity Engine:** Proprietary forecaster calculating "Hidden Equity" and time saved.
- **OS Curriculum Portal:** Dynamically fetches phases from the Supabase `weeks` table.
- **Pricing & Application:** Multi-step application funnel with scoring logic and live Stripe checkout links.
- **Automation Simulator:** Admin tool to test the end-to-end lifecycle (Submission -> Approval -> Webhook).

### 🛠 Active Work / Pending
- **Module Pages:** Building out `/portal/curriculum/[slug]` to display video content (Mux/Vimeo) and resources.
- **Implementation Proof:** Hooking up the verification logic to the `progress` table in Supabase to unlock subsequent phases.
- **Admin Applications:** Building the review queue at `/admin/applications` for manual cohort selection.

## 🔗 Critical References
- **Stripe Standard PIF:** `https://buy.stripe.com/5kQdRb8Z1eEscGOfas7wA0f`
- **Stripe Pro PIF:** `https://buy.stripe.com/3cIeVfa351RG6iqaUc7wA0h`
- **Primary Database Tables:** `profiles`, `weeks`, `modules`, `kpi_entries`, `applications`.

## ⚠️ Guidelines for Gemini
1. **PRIMARY MANDATE:** This directory (`master-neurochiro/`) is the ONLY correct version of the project. Ignore all other versions (like `master-neural-chiro`).
2. **PRIMARY ENTRY POINT:** The "real" website and landing page is located at `/mastermind` (`http://localhost:3000/mastermind`). Always treat this as the home of the project.
3. **Branding:** Maintain the "Elite" aesthetic (Navy, Cream, Orange) using the `EliteCard` and `BrandButton` components.
4. **Copywriting Tone:** Always use a "Human-First" tone (clear, direct, relatable) as per the conversion copywriting standards. No academic or corporate jargon.
5. **Data:** Always use Server Actions (`src/app/actions`) for database mutations.
