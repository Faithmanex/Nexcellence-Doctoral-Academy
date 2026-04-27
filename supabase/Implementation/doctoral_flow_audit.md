# Doctoral Services Application Flow Audit

**Date:** April 24, 2026
**Target:** `/app/(public)/services/doctoral/page.tsx` & `/app/(public)/apply/page.tsx`
**Reference Specs:** `NDA_TechSpec.md`, `Nexcellence_Content_v4.md`, `NDA_PageCopy.md`

## Executive Summary
An audit of the "Doctoral Services" application and checkout flow reveals significant discrepancies between the current codebase and the technical/content specifications. Currently, all doctoral services route users to a generic `/apply` contact form, bypassing the specified payment and onboarding flows. Furthermore, several flagship doctoral programs are missing from the page.

Based on recent updates, the legacy token-based upload flow has been deprecated in favor of a new, streamlined onboarding architecture.

---

## Findings

### 1. Missing Services on the Doctoral Page
**Spec:** `Nexcellence_Content_v4.md` lists the following Doctoral Programs:
- 90-Day Dissertation Completion Program ($3,997 or payment plans)
- Dissertation Accelerator Weekend ($497)
- Dissertation Strategy Session ($250)
- Research Consultation ($300)
- Monthly Dissertation Coaching ($350/mo)
- Dissertation Success Package ($1,200 or payment plans)
- Chapter Editing ($500)
- Proposal Editing ($1,100)
- Defense Preparation Coaching ($350)
- Full Dissertation Editing ($2,500–$3,000)

**Current Implementation:** `/app/services/doctoral/page.tsx` only lists 4 services:
- Dissertation Strategy Session
- Research Consultation
- Monthly Dissertation Coaching
- Chapter Editing

**Gap:** Over half of the doctoral services, including the flagship 90-Day Program and the Success Package, are missing from the frontend.

### 2. Incorrect Call-to-Action (CTA) Routing
**Spec:** The correct flow depends on the service type:
- **Consultations** (Strategy Session, Research Consultation, Defense Prep) should integrate with **Calendly**.
- **Fixed-Price Services & Coaching** (Chapter Editing, 90-Day Program, Monthly Coaching) should route to an application form, followed by a simulated demo payment.

**Current Implementation:** Every button on the Doctoral Services page wraps a `<Link href="/apply">`. 

**Gap:** The application flow is broken. Users trying to book a Consultation are redirected to a generic contact form instead of a booking calendar. Users purchasing editing or coaching are sent to the `/apply` form but lack the subsequent payment simulation step required for development.

### 3. The New Application & Onboarding Flow
**Spec:** The legacy flow (`payment → token email → upload → dashboard`) is obsolete. The new architecture is:
**Application Form Submission → Simulated Demo Payment → User Registration/Signup → Dashboard**
*Note: The application form data should only be officially "sent" (submitted/processed) once the simulated payment is successful.*

**Current Implementation:** The `/apply` form saves to `contact_submissions` immediately upon submission, with no payment gateway or signup redirection attached.

**Gap:** The form needs to be restructured so that it acts as step one of the checkout process for document editing and coaching programs, holding submission until payment succeeds, and then pushing the user to register an account before accessing the dashboard.

### 4. Elite Program Routing
**Spec:** The Elite Academic Transformation Program has its own dedicated page (`/elite`).

**Current Implementation:** The general `/apply` form includes options for the Elite Program.

**Gap:** The general application form should decouple from Elite services to avoid confusing the user journey, as Elite has its own bespoke intake process.

---

## Recommended Action Plan

To align the Doctoral Services flow with the updated specifications, the following actions should be taken:

1. **Populate Missing Services:** Update the `plans` array in `app/services/doctoral/page.tsx` to include all missing programs (90-Day Program, Accelerator Weekend, Success Package, Proposal Editing, Full Dissertation Editing, and Defense Prep).
2. **Implement Calendly Component:** Replace the application form links for consultation services with the `CalendlyWidget` or `BookSessionButton` component.
3. **Build the New Checkout Architecture:** For document editing and coaching programs, build a multi-step flow:
   - Step 1: User fills out the Application Form.
   - Step 2: User completes a **Simulated Demo Payment** (built for development purposes).
   - Step 3: Upon successful payment, the application form is submitted, and the user is redirected to the Signup/Registration page.
4. **Update Elite Links:** Ensure all references to the Elite program link to the dedicated `/elite` page.
