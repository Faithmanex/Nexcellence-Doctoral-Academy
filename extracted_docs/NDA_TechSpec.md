Nexcellence Academy™

Technical Stack & Developer Specification



⚠ This document defines the recommended tech stack, integrations, environment variables, and development conventions for the Nexcellence Academy website. It is the authoritative reference for the developer or AI agent building the site.



1. Recommended Tech Stack



Layer

Choice

Reason

Frontend

Next.js 14 (App Router)

React-based, SSR/SSG, best for SEO and performance

Styling

Tailwind CSS

Utility-first, fast to build, easy to maintain

UI Components

shadcn/ui

Accessible, unstyled base components built on Radix UI

Backend / API

Next.js API Routes + FastAPI (Python)

Next.js for standard routes; FastAPI for AI topic generator endpoint

Database

Supabase (PostgreSQL)

Managed Postgres, built-in auth, row-level security

Auth

Supabase Auth

JWT-based, email/password + magic link, role support

File Storage

Supabase Storage

Document upload buckets, per-user scoping

Payments

Stripe

One-time links + recurring subscriptions

Email

Resend

Transactional email: confirmations, upload links, notifications

CMS / Blog

Contentlayer + MDX files

Markdown-based blog, no external CMS dependency

Deployment

Vercel (frontend) + Railway (FastAPI)

Vercel for Next.js, Railway for Python API service

Analytics

Vercel Analytics + Posthog (optional)

Page views + user behaviour

Forms

React Hook Form + Zod

Validation and form state management



2. Project Structure



/app                     — Next.js App Router pages

  /(public)              — Public-facing pages

    /page.tsx             — Home

    /program/page.tsx     — 90-Day Program

    /workshop/page.tsx    — Workshop

    /services/doctoral    — Doctoral Services

    /services/faculty     — Faculty Advancement

    /services/leadership  — Academic Leadership

    /services/curriculum  — Curriculum Design

    /services/publishing  — Dissertation & Publishing

    /services/book        — Book Publishing

    /elite/page.tsx       — Elite Program

    /pricing/page.tsx     — Pricing

    /resources/page.tsx   — Resources hub

    /resources/quiz       — Readiness Quiz

    /resources/generator  — Topic Generator

    /resources/topics     — 100 Topics

    /insights/page.tsx    — Blog index

    /insights/[slug]      — Blog post

    /founder/page.tsx     — Founder bio

    /workshops/page.tsx   — Institutional workshops

    /upload/page.tsx      — Document upload

    /testimonials         — Testimonials

    /contact/page.tsx     — Contact

    /privacy              — Privacy Policy

    /terms                — Terms of Service

    /academic-integrity   — Academic Integrity

  /(auth)                — Auth pages

    /login                — Client login

    /forgot-password      — Password reset

  /(dashboard)           — Protected dashboard

    /dashboard/page.tsx   — Client dashboard home

    /admin/page.tsx       — Coach admin view

/api                     — Next.js API routes

  /api/contact            — Contact form handler

  /api/upload-token       — Generate upload token post-payment

  /api/stripe-webhook     — Stripe webhook handler

/fastapi                  — Python FastAPI service

  /api/generate-topics    — AI topic generation endpoint

/components               — Shared UI components

/lib                      — Utilities, Supabase client, Stripe client

/content/blog             — MDX blog posts

/content/topics           — 100 topics data file



3. Environment Variables

⚠ Never commit these to version control. Store in Vercel environment variables (frontend) and Railway environment variables (FastAPI).



Variable

Purpose

Scope

NEXT_PUBLIC_SUPABASE_URL

Supabase project URL

Frontend

NEXT_PUBLIC_SUPABASE_ANON_KEY

Supabase public anon key

Frontend

SUPABASE_SERVICE_ROLE_KEY

Supabase service role key (never expose client-side)

Server only

STRIPE_SECRET_KEY

Stripe secret API key

Server only

STRIPE_WEBHOOK_SECRET

Stripe webhook signing secret

Server only

RESEND_API_KEY

Resend email API key

Server only

ANTHROPIC_API_KEY or OPENAI_API_KEY

AI API key for topic generator

FastAPI service only

ADMIN_EMAIL

Email to notify on new uploads and contact form submissions

Server only

NEXT_PUBLIC_SITE_URL

Full site URL (e.g. https://nexcellenceacademy.com)

Frontend



4. Supabase Schema



Tables

Table

Columns

Purpose

profiles

id (uuid, FK to auth.users), full_name, email, role (client|admin), enrolled_service, created_at

One row per user

milestones

id, user_id (FK), title, status (pending|complete), created_at, completed_at

Client progress tracking

coach_notes

id, user_id (FK), content (text), created_at, updated_at

Visible to client (read-only)

documents

id, user_id (FK), filename, storage_path, service_type, status (pending|review|returned), uploaded_at

Uploaded document records

upload_tokens

id, user_id (FK), token (uuid), service_type, used (bool), expires_at

One-time upload tokens

contact_submissions

id, name, email, phone, role_type, interested_in, message, source, created_at

Contact form log



Row-Level Security Rules

profiles: users can read and update only their own row

milestones: users can read only their own milestones; only admin can insert/update

coach_notes: users can read only their own notes; only admin can insert/update

documents: users can read only their own documents; insert on upload; only admin can update status

upload_tokens: users can read only their own token; server-side only for insert

contact_submissions: insert only (no user auth required); admin read



5. Stripe Integration



Payment Links

All one-time services use Stripe Payment Links (no code required — generated in Stripe dashboard). Each link maps to one button in the site. See v4 Content doc for full button/link map.

Recurring Subscriptions

Three services use Stripe recurring billing:

Monthly Dissertation Coaching — $350/month

Faculty Coaching & Mentorship — $350/month

Monthly Leadership Advisory — $1,200/month

Create these as Stripe Products with recurring prices. Link to Stripe Customer Portal for client subscription management.

Webhook Events to Handle

Event

Action

payment_intent.succeeded

Create Supabase user account (if not exists), send upload link email via Resend, log to contact_submissions

customer.subscription.created

Create or activate client account for subscription services

customer.subscription.deleted

Flag account as inactive in profiles table

invoice.payment_failed

Send payment failure notification email to client



6. Email Templates (Resend)



Template

Content

payment-confirmation

Sent on payment_intent.succeeded. Includes: service purchased, next steps, upload link (if applicable), coach contact.

upload-link

Sent when upload token is generated. Includes: unique upload URL, token expiry (72 hours), accepted file formats.

upload-received

Sent when client uploads a document. Confirms receipt and estimated review timeline.

contact-form-admin

Internal notification to ADMIN_EMAIL on new contact form submission. Includes all form fields.

contact-form-confirmation

Sent to contact form submitter. Confirms receipt, expected response time (1 business day), and a CTA to book directly.

password-reset

Supabase default magic link — no custom template required.



7. Key Component Specifications



Readiness Quiz Component

State: current question index (0–9), answers array (10 items), submitted (bool)

Render: one question at a time with progress bar (e.g. Question 3 of 10)

On submit: calculate total score, determine bucket (0–6 / 7–13 / 14–20), render result card

Result card: score display, readiness label, 2-sentence summary, CTA button linking to recommended service

No backend required — entirely client-side



Topic Generator Component

State: current step (1–5), form values object, loading (bool), results array, error (string)

Steps 1–4: controlled dropdowns (Step 2 is open text). Back/Next navigation.

Step 5: Generate button triggers POST to /api/generate-topics (Next.js API route) which calls FastAPI

FastAPI endpoint: receives form values, builds prompt, calls AI API, parses JSON response, returns to Next.js

Display: 3 topic cards with title, rationale, methodology badge

Regenerate button resets results and calls API again with same inputs

Rate limit: store generation count in sessionStorage, block after 3 attempts with friendly message



Dashboard Component

Protected route: check Supabase session on load, redirect to /login if null

Fetch on load: profiles, milestones, coach_notes, documents (all filtered by user_id via RLS)

Milestones: rendered as vertical timeline with status indicator (pending = grey / complete = green)

Documents: table with filename, service_type, status badge, upload date

Coach notes: read-only card list, newest first

Upload link: button linking to /upload with user’s active upload token (fetch from upload_tokens table)



8. SEO Defaults



Setting

Value

Scope

Title format

[Page Name] — Nexcellence Academy™

All pages

Meta description

130–160 character unique description per page

All pages

OG image

1200×630px branded image per major page category

Home, Program, Elite, Faculty, Blog

Canonical URLs

Always set canonical to production URL

All pages

Robots

index, follow for all public pages. noindex for dashboard, admin, upload.



Sitemap

Auto-generated via next-sitemap package on build



Schema markup

Organisation schema on Home. FAQ schema on Pricing. BreadcrumbList on service pages.





9. Performance & Accessibility

Target Lighthouse score: 90+ on Performance, Accessibility, Best Practices, SEO

All images: Next.js <Image> component with alt text. WebP format preferred.

Fonts: Load Inter via next/font (zero layout shift). Subset to Latin.

Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms

All interactive elements keyboard-navigable

Colour contrast ratio: minimum 4.5:1 for body text, 3:1 for large text

All form inputs have associated labels

Error messages are descriptive and associated with their fields



10. Launch Checklist for Developer

All 19 pages built and responsive across mobile/tablet/desktop

All Stripe payment links replaced with live URLs

Stripe recurring products created for 3 subscription services

Stripe webhook endpoint registered and tested

Supabase tables created with RLS policies applied

Supabase Auth configured (email/password + magic link)

Resend email templates created and tested

FastAPI topic generator deployed to Railway and tested

All environment variables set in Vercel and Railway

Contact form tested end-to-end (submission → admin email → confirmation email)

Upload flow tested end-to-end (payment → token email → upload → dashboard)

Dashboard login/logout tested

Admin view tested

All blog articles published (minimum 6 at launch)

Free guide PDF uploaded to /public or Supabase Storage

Privacy, Terms, and Academic Integrity pages live

Sitemap generated and submitted to Google Search Console

Analytics verified (Vercel Analytics active)

Lighthouse audit run — all scores 90+

Mobile tested on iOS Safari and Android Chrome

All placeholder copy replaced with approved content



