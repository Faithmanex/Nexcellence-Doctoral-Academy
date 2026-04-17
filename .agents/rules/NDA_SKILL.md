---
name: nexcellence-website
description: "Use this skill whenever working on any aspect of the Nexcellence Doctoral Academy (NDA) website build. Triggers include: building pages, writing copy, wiring payments, setting up the dashboard, implementing the quiz or topic generator, configuring Supabase, deploying, or resolving any conflict between spec documents. This skill is the authoritative reference for the full project — read it before touching any NDA file."
license: Proprietary
---

# Nexcellence Doctoral Academy — Website Build Reference

## What This Project Is

Nexcellence Academy™ is a multi-arm academic consulting brand offering services across seven categories: Doctoral Academy, Faculty Advancement, Academic Leadership, Curriculum Design, Dissertation & Publishing, Book Publishing, and the Elite Transformation Program. The website has 19 pages, ~35 paid services, three recurring subscriptions, an AI-powered topic generator, a scored readiness quiz, a login-gated client dashboard, and a token-gated document upload portal.

---

## Document Map

There are 8 source documents. Read the right one for the task.

| Document | What It Contains | When to Use It |
|---|---|---|
| `Nexcellence_Layout_v4.docx` | Site architecture, sitemap, page layouts, homepage section order, component rules, mobile breakpoints, launch checklist | Starting a new page, planning layout, checking structure |
| `Nexcellence_Content_v4.docx` | All service names, prices, payment plan breakdowns, Stripe placeholder links, arm groupings | Wiring buttons, building pricing tables, generating payment flows |
| `NDA_PageCopy.docx` | Complete copy for all 19 pages — headlines, subheadlines, body text, CTAs, form labels, microcopy | Writing any text that appears on the site |
| `NDA_Testimonials.docx` | 18 placeholder testimonials grouped by service category, each with quote, name, credential | Building testimonial sections and the Testimonials page |
| `NDA_FounderBio.docx` | Full founder page copy for Dr. William Triplett — bio, expertise, credentials, page CTA | Building the Founder page |
| `NDA_QuizAndGenerator.docx` | Readiness quiz (10 questions, scoring, 3 result cards) and topic generator (5-step form, AI prompt template, output spec, rate limiting) | Building either interactive tool |
| `NDA_LegalPolicies.docx` | Privacy Policy, Terms of Service, Academic Integrity Statement | Building the 3 legal pages |
| `NDA_TechSpec.docx` | Full tech stack, project folder structure, all environment variables, Supabase schema + RLS, Stripe webhook events, email templates, component specs, SEO defaults, performance targets, developer launch checklist | Starting the build, configuring infrastructure, resolving any technical decision |

---

## Canonical Rules

### On conflicts between documents
- `Nexcellence_Content_v4.docx` is the canonical source for **all prices and payment plan amounts**. If any other document shows a different price, use v4.
- `NDA_TechSpec.docx` is the canonical source for **all technical decisions**. Stack, schema, env vars, routing — defer to it.
- `NDA_PageCopy.docx` is the canonical source for **all copy**. If layout and copy docs say different things, copy wins.

### On placeholder content
- All `buy.stripe.com/nexcellence-*` links are **build-simulation placeholders**. Replace with live Stripe-generated URLs before go-live.
- All `yourwebsite.com/*` links are placeholders for the real domain.
- Testimonials in `NDA_Testimonials.docx` are **placeholder copy** — must be replaced with real verified client testimonials before launch.
- Founder credentials in `NDA_FounderBio.docx` marked `[BRACKET]` must be filled in by Dr. Triplett.
- Legal pages in `NDA_LegalPolicies.docx` must be reviewed by a licensed attorney before publication.
- Stat bar on the homepage (200+ scholars, 94% completion rate, etc.) must be verified or removed before launch.

---

## Service Categories & Pages

| # | Category | Page Route | Services |
|---|---|---|---|
| 1 | Doctoral Academy | `/services/doctoral` | 90-Day Program, Workshop, Strategy Session, Research Consultation, Monthly Coaching, Success Package, Chapter Edit, Proposal Edit, Full Edit, Defense Prep |
| 2 | Faculty Advancement | `/services/faculty` | Academic Identity & Positioning™, Research & Publication Strategy, Tenure Strategy, Faculty Success Package, Faculty Coaching |
| 3 | Academic Leadership | `/services/leadership` | Leadership Intensive, 1:1 Strategy Session, Monthly Advisory |
| 4 | Curriculum Design | `/services/curriculum` | Custom Course Design, Course Enhancement, Multi-Course Program, Certificate Program, Academic Program Proposal |
| 5 | Dissertation & Publishing | `/services/publishing` | Proposal Development, Full Dissertation Edit, Chapter Edit, Proposal Edit, Defense Prep, Journal Article Dev, Manuscript Review ×2, Journal Targeting |
| 6 | Book Publishing | `/services/book` | Book Coaching Program, Book Writing Coaching, Self-Publishing Strategy, Author Positioning, Book Proposal Dev |
| 7 | Elite Program | `/elite` | 6-Month Elite Academic Transformation Program™ |

**Add-ons** (accessible from any service page): Document Review ($150), Portfolio Review ($400), Expedited Service ($200–$500).

**Institutional** (inquiry only, no direct checkout): Faculty Development Workshop, Curriculum Design Workshop.

---

## Recurring Subscriptions

Three services use Stripe recurring billing — **not** one-time payment links:

| Service | Price | Stripe Type |
|---|---|---|
| Monthly Dissertation Coaching | $350/month | Recurring product |
| Faculty Coaching & Mentorship | $350/month | Recurring product |
| Monthly Leadership Advisory | $1,200/month | Recurring product |

---

## Payment Plans

All three-part payment plans are verified correct in `Nexcellence_Content_v4.docx` Section 6. Every plan total matches the full price. Do not recalculate — use the amounts as written.

---

## Interactive Tools

### Readiness Quiz
- 10 questions, 3 options each (0/1/2 points), max score 20
- Three buckets: Low (0–6), Medium (7–13), High (14–20)
- Each bucket has a result card with title, summary, recommended service, and CTA
- Entirely client-side — no backend required
- Full spec in `NDA_QuizAndGenerator.docx` Part 1

### Topic Generator
- 5-step guided form: Field → Interest → Population → Methodology → Generate
- Calls `/api/generate-topics` (Next.js API route) → FastAPI → AI API
- Returns 3 topic suggestions as JSON: `{title, rationale, methodology}`
- Rate limit: 3 generations per session (sessionStorage counter)
- Full spec including exact AI prompt template in `NDA_QuizAndGenerator.docx` Part 2

---

## Auth & Dashboard

- Auth: Supabase Auth (JWT), email/password + magic link
- Protected route: `/client-dashboard` — redirect to `/login` if no session
- Admin route: `/admin` — protected by `role = admin` in profiles table
- Row-level security enforced in Supabase — users see only their own data
- Client provisioning: manual at launch, automated via Stripe webhook post-launch
- Full schema in `NDA_TechSpec.docx` Section 4

---

## Upload Portal

- Access: one-time token emailed on payment confirmation
- Token format: `/upload?token=<uuid>`
- Token expires after first use or 72 hours
- Accepted: PDF, DOCX, DOC — max 25MB
- Files stored in Supabase Storage under `documents/{user_id}/`
- On upload: create record in `documents` table, send confirmation email, notify admin
- Full flow in `NDA_TechSpec.docx` Section 6

---

## Environment Variables

Never hardcode. Full list with scopes in `NDA_TechSpec.docx` Section 3.

Required before any page can function:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `ANTHROPIC_API_KEY` (or `OPENAI_API_KEY`) — FastAPI service only
- `NEXT_PUBLIC_SITE_URL`

---

## Build Order

Follow this sequence to avoid blocking dependencies:

1. Set up Supabase project — create tables, apply RLS policies
2. Configure Supabase Auth — enable email/password and magic link
3. Set up Stripe — create all payment links and recurring products
4. Register Stripe webhook endpoint
5. Configure Resend — create all 6 email templates
6. Deploy FastAPI topic generator to Railway — test `/api/generate-topics`
7. Build all 19 frontend pages with placeholder links
8. Wire Stripe links to buttons
9. Build and test auth flow (login, dashboard, admin)
10. Build and test upload flow (token generation, file upload, confirmation)
11. Build quiz and topic generator components
12. Replace all placeholder copy with approved content
13. Run Lighthouse audit — resolve any score below 90
14. Final QA on iOS Safari and Android Chrome
15. Go live

---

## Quick Lookup

| I need to... | Go to... |
|---|---|
| Find the price of a service | `Nexcellence_Content_v4.docx` |
| Find the copy for a page section | `NDA_PageCopy.docx` |
| Check a payment plan breakdown | `Nexcellence_Content_v4.docx` Section 6 |
| Build the quiz | `NDA_QuizAndGenerator.docx` Part 1 |
| Build the topic generator | `NDA_QuizAndGenerator.docx` Part 2 |
| Set up Supabase schema | `NDA_TechSpec.docx` Section 4 |
| Handle a Stripe webhook | `NDA_TechSpec.docx` Section 5 |
| Write an email template | `NDA_TechSpec.docx` Section 6 |
| Build the dashboard | `NDA_TechSpec.docx` Section 7 |
| Check mobile layout rules | `Nexcellence_Layout_v4.docx` Section 12 |
| Build the Founder page | `NDA_FounderBio.docx` |
| Build the Testimonials page | `NDA_Testimonials.docx` |
| Build a legal page | `NDA_LegalPolicies.docx` |
