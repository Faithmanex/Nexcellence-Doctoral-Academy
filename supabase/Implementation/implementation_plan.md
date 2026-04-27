# Implementation Plan: Doctoral Application & Onboarding Flow

This plan details the code changes required to implement the finalized application flow for Doctoral Services, moving away from the legacy "upload token" architecture to a streamlined "Form -> Simulated Payment -> Signup" flow.

## User Review Required
> [!IMPORTANT]
> **Simulated Payment UI:** I will build a clean, modern mock payment screen (e.g., fields for Name on Card, Card Number, Expiry, CVC) to mimic a Stripe element. It will process automatically upon clicking "Pay Now". Please confirm this is sufficient for your development needs.
> **Database Submission:** The application form details will only be written to the `contact_submissions` table *after* the simulated payment is completed.
> **Post-Payment Routing:** After a successful demo payment, users will be redirected directly to `/register?email=[their_email]`. Please confirm `/register` is the correct destination.

## Proposed Changes

### 1. Doctoral Services Page Updates
#### [MODIFY] `app/(public)/services/doctoral/page.tsx`
- **Populate Missing Services:** Expand the `plans` array to include all 10 doctoral services from the specs (e.g., 90-Day Program, Accelerator Weekend, Success Package, Proposal Editing, Full Editing, Defense Prep).
- **Dynamic Call-to-Actions (CTAs):**
  - For **Consultations** (Strategy Session, Research Consultation, Defense Prep), the CTA will use the `BookSessionButton` component (triggering Calendly) instead of linking to `/apply`.
  - For **Fixed-Price/Coaching** (Chapter Editing, 90-Day Program, etc.), the CTA will link to `/apply?program=[encoded_program_name]` to pre-select their choice in the application form.

---

### 2. Multi-Step Application & Checkout Flow
#### [MODIFY] `app/(public)/apply/page.tsx`
Refactor the current single-page form into a multi-step checkout component using React state (`step = 1 | 2 | 3`):
- **Step 1 (Application Details):** The current form fields (Name, Email, Role, Goals, etc.). When the user clicks "Continue to Payment", validate the fields and proceed to Step 2 instead of submitting to the database.
- **Step 2 (Simulated Payment):** A mock checkout interface displaying the selected program name, price summary, and mock credit card inputs. 
- **Step 3 (Processing & Submission):** Upon clicking "Submit Payment", simulate a 1.5-second processing delay. Once "approved", insert the data into the `contact_submissions` table in Supabase.
- **Redirect:** Instead of showing a "Success" message on the page, redirect the user immediately to `/register?email=${encodedEmail}&source=checkout_success` so they can create their account and access the dashboard.

---

### 3. Cleanup & Decoupling
#### [MODIFY] `app/(public)/apply/page.tsx`
- Remove the "Elite Transformation Program" from the dropdown options in the application form to strictly enforce the rule that Elite candidates must use the dedicated `/elite` page.

## Verification Plan

### Manual Verification
1. Navigate to `/services/doctoral` and verify all 10 services are present.
2. Click a Consultation CTA and verify it triggers the booking flow rather than the `/apply` page.
3. Click a Coaching CTA and verify it routes to `/apply` with the correct program pre-selected.
4. Fill out the application form, proceed to the Simulated Payment screen, and submit mock payment details.
5. Verify the application record only appears in the Supabase `contact_submissions` table *after* the simulated payment succeeds.
6. Verify the automatic redirect to the `/register` page occurs seamlessly after payment.
