# Nexcellence Academy™ - Implementation Plan

**Document Version:** 1.0  
**Last Updated:** April 21, 2026  
**Source Reference:** `extracted_docs/Nexcellence_Layout_v4.md`

---

## Executive Summary

This document outlines the gap analysis between the current website implementation and the specifications defined in the Nexcellence Academy™ Layout Document (Sections 11, 12, and 13). It provides a prioritized task list with clear status indicators and implementation guidance.

---

## Section 11: Visual Style

### 11.1 Color Palette

| Role | Spec Hex | Current Implementation | Status | Action Required |
|------|---------|---------------------|--------|----------------|
| Primary / Navy | `#1B2A4A` | `slate-900` (#0f172a) | ⚠️ Close | Update to exact spec |
| Accent / Blue | `#2E6DA4` | Not used | ❌ Missing | Add accent color |
| Light Blue Tint | `#D6E4F0` | Not used | ❌ Missing | Add for section backgrounds |
| White | `#FFFFFF` | `#ffffff` | ✅ Done | — |
| Light Gray | `#F5F5F5` | `slate-50` (#f8fafc) | ⚠️ Close | Update to exact spec |
| Warning / Note | `#FFF8E1` + `#7A5C00` | Not used | ❌ Missing | Add callout box styles |

### 11.2 Typography

| Spec Requirement | Current Implementation | Status | Action Required |
|-----------------|----------------------|--------|----------------|
| Font Family: Inter or DM Sans | Lato / Noto Serif | ❌ Wrong | Change to Inter or DM Sans |
| H1: 40–48px | ~48px (lg:text-5xl) | ✅ Done | — |
| H2: 28–32px | ~32px (text-2xl/3xl) | ✅ Done | — |
| H3: 20–24px | ~20px (text-xl) | ✅ Done | — |
| Body: 16–18px, line-height 1.6 | 16px | ✅ Done | Update line-height to 1.6 |
| Buttons: 15–16px, border-radius 6px | 16px, border-radius varies | ⚠️ Partial | Standardize button radius to 6px |

### 11.3 Component Rules

| Spec Requirement | Current Status | Action Required |
|-----------------|---------------|----------------|
| Service cards: 3-col desktop / 1-col mobile | ✅ Done | — |
| 7-card grid (4+3) with distinct accent colors | ⚠️ Partial | Review accent color differentiation |
| Elite Program: full-width hero with premium treatment | ✅ Done | — |
| How It Works: 4-step horizontal desktop, vertical mobile | ✅ Done | — |
| Founder block: 2-col desktop, stacked mobile | ❌ Missing | Create Founder page |
| Buttons: solid fill primary, outlined secondary | ⚠️ Partial | Review button variants |
| Section spacing: 80–120px vertical padding | ✅ Done | — |

---

## Section 12: Mobile Layout Guidance

### 12.1 Breakpoint Verification

| Tier | Spec Width | Behaviour | Current Status |
|------|-----------|-----------|----------------|
| Mobile | < 640px | Single column, full-width buttons, cards stack | ✅ Done |
| Tablet | 640px – 1024px | 2-column grids, hamburger nav | ✅ Done |
| Desktop | > 1024px | 3-column cards, full nav, wide hero | ✅ Done |

### 12.2 Mobile Components

| Component | Spec Behaviour | Current Status |
|-----------|--------------|--------------|
| Hero | H1 28–32px, buttons stack full-width | ⚠️ H1 size check |
| 7 Pathways Block | 4+3 grid → 2-col tablet → 1-col mobile | ✅ Done |
| Service Cards | 3-col → 2-col tablet → 1-col mobile | ✅ Done |
| Elite Program Banner | Full-width on all, reduce font mobile | ✅ Done |
| Pricing Table | Horizontal scroll or card-per-row on mobile | ✅ Done |
| Founder Block | 2-col → stacked (photo above bio) | ❌ Missing |
| Topic Generator | Full-width step form | ✅ Done |
| Quiz | One question per screen, progress bar | ✅ Done |
| Upload Form | Full-width drop zone, tap-to-select | ✅ Done |
| Dashboard | Card-based, milestones as timeline | ✅ Done |
| Footer | Multi-col → stacked single-col mobile | ✅ Done |
| Navigation | Hamburger on mobile/tablet, sticky header | ✅ Done |

### 12.3 Mobile Accessibility

| Requirement | Status | Action Required |
|------------|--------|----------------|
| Minimum tap target: 44×44px | ⚠️ Partial | Audit all buttons/links |
| Body minimum 16px | ✅ Done | — |
| No hover-only interactions | ✅ Done | — |
| Correct keyboard types (email, tel, number) | ⚠️ Partial | Audit form inputs |
| Responsive images (srcset) | ⚠️ Partial | Audit image components |
| Test on iOS Safari and Android Chrome | ❌ Pending | Schedule testing |

---

## Section 13: Launch Checklist

### 13.1 Stripe Integration

| Item | Spec Requirement | Current Status | Action Required |
|------|----------------|--------------|----------------|
| Payment links | Create for all ~30 paid services | ⚠️ Partial | Verify all links exist and are live |
| 3-part payment plans | Separate links per installment | ❌ Missing | Create installment links |
| Recurring billing | Monthly Coaching ($350), Faculty Coaching ($350), Leadership Advisory ($1,200) | ❌ Missing | Set up Stripe subscriptions |
| Test checkout | Test in Stripe test mode before go-live | ❌ Pending | Run full test flow |

### 13.2 Pages & Content

| Page | Status | Priority |
|------|--------|----------|
| Home | ✅ Done | — |
| About | ✅ Done | — |
| Services Overview | ✅ Done | — |
| Doctoral Academy | ✅ Done | — |
| Faculty Advancement | ✅ Done | — |
| Leadership | ✅ Done | — |
| Workshops | ✅ Done | — |
| Curriculum | ✅ Done | — |
| Publishing | ✅ Done | — |
| Elite Program | ✅ Done | — |
| Pricing | ✅ Done | — |
| Contact | ✅ Done | — |
| Apply | ✅ Done | — |
| Resources - Quiz | ✅ Done | — |
| Resources - Generator | ✅ Done | — |
| Resources - Topics | ✅ Done | — |
| Testimonials | ✅ Done | — |
| Privacy Policy | ✅ Done | — |
| Terms of Service | ✅ Done | — |
| Academic Integrity | ✅ Done | — |
| Upload | ✅ Done | — |
| Checkout Success | ✅ Done | — |
| Login / Register | ✅ Done | — |
| Dashboard | ✅ Done | — |
| Client Dashboard | ✅ Done | — |
| Admin Dashboard | ✅ Done | — |
| **Founder Page** | ❌ Missing | HIGH |
| **100 Dissertation Topics** | ✅ Done | — |

### 13.3 Tools & Platform

| Feature | Spec Requirement | Current Status | Action Required |
|--------|-----------------|---------------|----------------|
| Calendly | Strategy Sessions, Research Consultations, Defense Prep, Faculty sessions, Leadership sessions | ❌ Missing | Integrate Calendly widget |
| Supabase Auth | Set up authentication | ✅ Done | — |
| Upload Portal | Token-gated upload | ✅ Done | — |
| Free Guide PDF | Upload PDF | ❌ Missing | Upload file |
| Readiness Quiz | Scoring and result cards | ✅ Done | — |
| Topic Generator | Guided form with AI | ✅ Done | — |

### 13.4 Pre-Launch QA

| Item | Status | Priority |
|------|--------|----------|
| All payment links tested | ❌ Pending | HIGH |
| All forms submit and notify | ✅ Done | — |
| Mobile tested (iOS Safari, Android Chrome) | ❌ Pending | HIGH |
| All placeholder URLs replaced | ✅ Done | — |

---

## Section 14: Pages Accessibility

### 14.1 Navigation & Links Audit

| Check Item | Status | Notes |
|------------|--------|-------|
| All internal links work (no 404s) | ⚠️ Needs Audit | Verify all hrefs |
| External links open in new tab with rel="noopener" | ⚠️ Needs Audit | Check footer social links |
| No broken images or missing alt text | ⚠️ Needs Audit | Full site image audit |
| All CTA buttons navigate correctly | ⚠️ Needs Audit | Verify button links |
| Breadcrumbs work on all pages | ✅ Done | — |
| Footer links complete | ⚠️ Needs Audit | Verify all footer sections |
| Header navigation complete | ✅ Done | Hamburger menu working |

### 14.2 Page-Specific Accessibility

| Page | Broken Links | Missing Content | Forms Work | Notes |
|------|-------------|-----------------|-----------|-------|
| Home | — | — | N/A | — |
| About | — | — | — | Missing Founder section |
| Services Overview | — | — | — | — |
| Doctoral Academy | — | — | ✅ | — |
| Faculty Advancement | — | — | ✅ | — |
| Leadership | — | — | ✅ | — |
| Workshops | — | — | ✅ | — |
| Curriculum | — | — | ✅ | — |
| Publishing | — | — | ✅ | — |
| Elite Program | — | — | — | — |
| Pricing | — | — | ✅ | Payment links |
| Contact | — | — | ✅ | — |
| Apply | — | — | ✅ | — |
| Resources - Quiz | — | — | ✅ | — |
| Resources - Generator | — | — | ✅ | — |
| Resources - Topics | — | — | — | — |
| Testimonials | — | — | — | — |
| Privacy Policy | — | — | — | — |
| Terms of Service | — | — | — | — |
| Academic Integrity | — | — | — | — |
| Upload | — | — | ✅ | Token gating |
| Checkout Success | — | — | — | — |
| Login / Register | — | — | ✅ | Supabase Auth |
| Dashboard | — | — | — | — |
| Client Dashboard | — | — | — | — |
| Admin Dashboard | — | — | — | — |
| Founder Page | ❌ Missing | ❌ Missing | ❌ N/A | Page not created |

### 14.3 Form Accessibility

| Form | Labels | Error Messages | Success States | Notes |
|------|--------|----------------|----------------|-------|
| Apply | ✅ Done | ✅ Done | ✅ Done | Full validation |
| Contact | ✅ Done | ✅ Done | ✅ Done | — |
| Register | ✅ Done | ✅ Done | ✅ Done | Supabase Auth |
| Login | ✅ Done | ✅ Done | ✅ Done | Supabase Auth |
| Upload | ✅ Done | ✅ Done | ✅ Done | Token gated |
| Client Forms | ✅ Done | ✅ Done | ✅ Done | Dashboard |

### 14.4 Keyboard & Screen Reader Accessibility

| Check Item | Status | Priority |
|------------|--------|----------|
| All interactive elements focusable | ⚠️ Needs Audit | — |
| Focus visible on all elements | ⚠️ Needs Audit | — |
| Skip to content link | ✅ Done | — |
| ARIA labels on icon-only buttons | ⚠️ Needs Audit | — |
| Alt text on all images | ⚠️ Needs Audit | — |
| Form labels associated with inputs | ✅ Done | — |
| Error messages announced to screen readers | ⚠️ Needs Audit | — |
| Heading hierarchy correct (h1 → h6) | ⚠️ Needs Audit | — |

### 14.5 Page Performance & Functionality

| Check Item | Status | Priority |
|------------|--------|----------|
| Pages load without JavaScript errors | ⚠️ Needs Audit | HIGH |
| No console errors on any page | ⚠️ Needs Audit | HIGH |
| Images optimized (WebP where possible) | ⚠️ Needs Audit | — |
| Responsive images load correctly | ⚠️ Needs Audit | — |
| Lazy loading implemented | ⚠️ Needs Audit | — |
| No layout shift (CLS) issues | ⚠️ Needs Audit | — |

### 14.6 Findability & Navigation Usability

#### Primary Navigation Link Audit
*A user should be able to find every page within 3 clicks from any page on the site*

| Page | In Header Nav | In Footer | In Content Links | Easy to Find? | Fix Required |
|------|-------------|-----------|-----------------|---------------|-------------|
| Home | ✅ | ✅ | ✅ | ✅ | — |
| About | ❌ | ✅ | ⚠️ | ❌ | Add to header nav |
| Services Overview | ✅ | ✅ | ✅ | ✅ | — |
| Doctoral Academy | ✅ | ✅ | ✅ | ✅ | — |
| Faculty Advancement | ✅ | ✅ | ✅ | ✅ | — |
| Leadership | ✅ | ✅ | ✅ | ✅ | — |
| Workshops | ✅ | ✅ | ⚠️ | ⚠️ | Check content links |
| Curriculum | ✅ | ✅ | ⚠️ | ⚠️ | Check content links |
| Publishing | ✅ | ✅ | ⚠️ | ⚠️ | Check content links |
| Elite Program | ✅ | ✅ | ✅ | ✅ | — |
| Pricing | ✅ | ✅ | ✅ | ✅ | — |
| Contact | ✅ | ✅ | ✅ | ✅ | — |
| Apply | ✅ | ✅ | ✅ | ✅ | — |
| Resources | ⚠️ | ✅ | ⚠️ | ⚠️ | Verify header link |
| Testimonials | ⚠️ | ✅ | ⚠️ | ⚠️ | Verify header link |
| Founder Page | ❌ | ❌ | ❌ | ❌ | Create page + add nav |
| Privacy Policy | ⚠️ | ✅ | ✅ | ✅ | — |
| Terms of Service | ⚠️ | ✅ | ✅ | ✅ | — |
| Academic Integrity | ⚠️ | ✅ | ✅ | ✅ | — |

#### Navigation Clarity Audit
| Check Item | Status | Notes |
|------------|--------|-------|
| Header nav labels are clear and descriptive | ✅ | — |
| Users can find About page within 3 clicks | ❌ | Not in header |
| Users can find Founder page within 3 clicks | ❌ | Page missing |
| Footer pages are complete and organized | ⚠️ Needs Audit | — |
| Dropdown/hamburger menu is discoverable | ✅ | — |
| No orphaned pages (no way to navigate to them) | ⚠️ Needs Audit | — |
| Footer links complete and organized | ✅ | — |
| Breadcrumbs show current location | ✅ | — |

#### User Journey Audit
| Journey | From Homepage | From Services | From Mobile |
|---------|--------------|--------------|--------------|
| Find About page | ❌ | ❌ | ❌ |
| Find Pricing page | ✅ | ✅ | ✅ |
| Find Apply page | ✅ | ✅ | ✅ |
| Find Contact page | ✅ | ✅ | ✅ |
| Find Services | ✅ | ✅ | ✅ |
| Find Resources | ⚠️ | ⚠️ | ⚠️ |
| Find Elite Program | ✅ | ✅ | ✅ |
| Find Founder page | ❌ | ❌ | ❌ |

### 14.7 Client Login & Auth Audit
*Based on `NDA_ClientDashboard.md` specification*

| Feature | Spec Requirement | Current Status | Action Required |
|---------|-----------------|---------------|----------------|
| **Login Flow** | Password login + Google OAuth | ✅ Done | — |
| **Client Dashboard** | Displays current milestones | ⚠️ Needs Verification | Verify timeline logic |
| **Admin Dashboard** | Set custom Calendly URLs per user | ❌ Missing | Connect to Calendly task |

---

## Prioritized Task List

### 🔴 HIGH PRIORITY

| # | Task | Category | Est. Time |
|---|------|---------|----------|
| 1 | **Integrate Calendly** for booking sessions | Calendly | 4-6 hours |
| 2 | **Create Founder Page** for Dr. William Triplett | Pages | 2-3 hours |
| 3 | **Upload Free Guide PDF** | Content | 1 hour |
| 4 | **Mobile Testing** (iOS Safari, Android Chrome) | QA | 2-4 hours |
| 5 | **Verify Stripe Payment Links** | Stripe | 2-3 hours |
| 6 | **Audit All Pages for Broken Links** | Accessibility | 2-3 hours |
| 7 | **Fix JavaScript Console Errors** | Accessibility | 2-3 hours |
| 8 | **Verify All Forms Work End-to-End** | Accessibility | 2-3 hours |
| 9 | **Add About Page to Header Navigation** | Findability | 30 min |
| 10 | **Add Founder Page to Header/Footer Navigation** | Findability | 30 min |
| 11 | **Ensure All Pages Are Reachable Within 3 Clicks** | Findability | 1-2 hours |

### 🟡 MEDIUM PRIORITY

| # | Task | Category | Est. Time |
|---|------|---------|----------|
| 6 | **Update Color Palette** to exact spec hex values | Visual Style | 1-2 hours |
| 7 | **Change Fonts** to Inter/DM Sans | Typography | 1 hour |
| 8 | **Standardize Button Radius** to 6px | Components | 1 hour |
| 9 | **Add Accent/Blue** color (#2E6DA4) for links/hover | Visual Style | 1 hour |
| 10 | **Add Warning Callout Box** styles | Components | 1 hour |
| 11 | **Audit Form Keyboard Types** (email, tel, number) | Accessibility | 1-2 hours |
| 12 | **Set Up Stripe Recurring Billing** | Stripe | 2-3 hours |
| 13 | **Keyboard Navigation Audit** (focus states) | Accessibility | 1-2 hours |
| 14 | **Alt Text Audit** for all images | Accessibility | 1 hour |
| 15 | **ARIA Labels Audit** for icon buttons | Accessibility | 1 hour |
| 16 | **Heading Hierarchy Audit** (h1→h6) | Accessibility | 1 hour |

### 🟢 LOW PRIORITY

| # | Task | Category | Est. Time |
|---|------|---------|----------|
| 13 | **Update Body Line-Height** to 1.6 | Typography | 15 min |
| 14 | **Audit Tap Targets** (44×44px minimum) | Accessibility | 1 hour |
| 15 | **Run Full Stripe Test Checkout** | QA | 1-2 hours |
| 16 | **Image Optimization** (WebP, lazy loading) | Performance | 2-3 hours |
| 17 | **Core Web Vitals Audit** (CLS, LCP) | Performance | 1-2 hours |

---

## Implementation Notes

### Calendly Integration Approach

1. Install `react-calendly` package
2. Create a shared Calendly component with theme matching
3. Add to:
   - `/apply` page (strategy sessions)
   - `/services/doctoral` page (defense prep)
   - `/services/faculty` page (faculty sessions)
   - `/services/leadership` page (leadership sessions)
   - `/services/publishing` page (research consultations)
   - Client dashboard (enrolled clients)

### Stripe Integration Approach

1. Verify all payment links in `lib/supabase.ts`
2. Create 3-part installment payment links
3. Set up recurring subscriptions for:
   - Monthly Coaching: $350/month
   - Faculty Coaching: $350/month
   - Leadership Advisory: $1,200/month
4. Test in Stripe dashboard test mode

### Founder Page Content

Reference from `extracted_docs/NDA_Founder.md`:
- Dr. William Triplett bio
- Professional credentials
- Services offered
- Contact information

---

## Sign-Off

| Item | Status | Date |
|------|--------|------|
| High Priority Tasks | Pending | — |
| Medium Priority Tasks | Pending | — |
| Low Priority Tasks | Pending | — |
| Pre-Launch QA | Pending | — |
| Go-Live Ready | ❌ No | — |

---

*Document generated from Nexcellence Academy™ Layout Document review*