# Aashray BuildCon — Website Plan

A marketing + lead-generation website for a construction company, built with **Expo (SDK 57) + expo-router**, deployed as a static website (`web.output: "static"`). Because it's Expo, the same codebase can later ship as iOS/Android apps with little extra work.

> Assumptions (adjust as needed): web-first marketing site; primary goal is **generating enquiries** (quote requests / callbacks); content is placeholder until the client provides real copy, photos, and project data. No login/accounts in v1.

---

## 1. Goals & Success Metrics

| Goal | How the site serves it | Metric |
|------|------------------------|--------|
| Win new projects | Clear services + strong project gallery + easy quote form | Quote-form submissions / month |
| Build trust | Real photos, certifications, testimonials, safety record | Time on Projects page, testimonial views |
| Be findable | SEO, fast static pages, local business schema | Organic traffic, Google ranking for "construction <city>" |
| Recruit | Careers page with open roles | Applications |

---

## 2. Sitemap (Pages)

```
/                     Home
/about                About us (story, team, values, certifications)
/services             Services overview
/services/[slug]      Individual service detail (residential, commercial, renovation, ...)
/projects             Portfolio grid (filterable by category)
/projects/[slug]      Case study / project detail (gallery, scope, outcome)
/process              How we work (steps: consult → design → build → handover)
/testimonials         Client reviews (can also embed on Home)
/careers              Open roles + application CTA
/contact              Contact form, map, phone, email, hours, service area
/quote                "Request a quote" multi-field form (primary conversion page)
/privacy, /terms      Legal
```

expo-router mapping under `src/app/`:
```
src/app/
  _layout.tsx           # root: fonts, theme, SafeArea, <Header/> + <Footer/>
  index.tsx             # Home
  about.tsx
  process.tsx
  testimonials.tsx
  careers.tsx
  contact.tsx
  quote.tsx
  services/
    _layout.tsx
    index.tsx           # services overview
    [slug].tsx          # service detail
  projects/
    _layout.tsx
    index.tsx           # portfolio
    [slug].tsx          # project detail
  privacy.tsx
  terms.tsx
  +not-found.tsx
```

---

## 3. Page-by-Page Content

### Home (`/`)
1. **Hero** — full-bleed build/site photo, headline ("Building <city>'s future, one project at a time"), subhead, two CTAs: *Request a Quote* (primary) + *View Projects*.
2. **Trust bar** — years in business, projects completed, sq-ft built, client satisfaction (animated counters).
3. **Services teaser** — 3–6 cards linking to `/services/[slug]`.
4. **Featured projects** — 3 case studies from `/projects`.
5. **Why choose us** — 4 differentiators (on-time, on-budget, licensed & insured, safety-first).
6. **Process strip** — 4-step overview linking to `/process`.
7. **Testimonials carousel**.
8. **Certifications / clients logos**.
9. **Final CTA band** — "Ready to start? Get a free quote."
10. **Footer** — contact, service area, socials, quick links.

### Services (`/services`, `/services/[slug]`)
- Overview grid. Suggested categories: **Residential Construction, Commercial Construction, Renovation & Remodeling, Interior Fit-out, Project Management / Consulting, Maintenance**.
- Detail page: hero, description, what's included, related projects, FAQ, CTA to quote.

### Projects (`/projects`, `/projects/[slug]`)
- Filterable grid (All / Residential / Commercial / Renovation). Card = cover image, title, category, year.
- Detail: image gallery (`expo-image`), client, location, scope, timeline, challenge → solution → result, testimonial.

### About / Process / Testimonials / Careers / Contact / Quote
- **About**: story, mission/values, leadership team cards, licenses & insurance, community/safety.
- **Process**: numbered stepper with illustrations.
- **Contact**: form (name, email, phone, message) + office address, embedded map, hours, phone/email click-to-call.
- **Quote** (key conversion): project type, budget range, timeline, location, description, file upload (plans), contact details.

---

## 4. Data Model (content-as-data)

Start with typed local data in `src/data/` (no backend needed for v1). Easy to swap for a CMS later.

```ts
// src/data/types.ts
type Service  = { slug: string; title: string; excerpt: string; icon: string; body: string; faqs: {q:string;a:string}[] }
type Project  = { slug: string; title: string; category: 'residential'|'commercial'|'renovation'; year: number;
                  location: string; cover: string; gallery: string[]; scope: string; result: string }
type Testimonial = { name: string; role: string; company?: string; quote: string; avatar?: string; rating: number }
type TeamMember  = { name: string; role: string; photo: string; bio: string }
```
Files: `services.ts`, `projects.ts`, `testimonials.ts`, `team.ts`, `company.ts` (name, phone, email, address, hours, service areas, socials).

---

## 5. Design System

- **Palette**: construction-industry standard — a strong primary (safety amber/orange **or** trust blue), deep charcoal/graphite neutrals, white space. The scaffold already ships a blue accent (`#208AEF`); consider amber `#F4A300` as accent over charcoal `#1F2429` for a "builder" feel. Decide with client branding.
- **Typography**: display font already wired in `global.css` (Spline Sans / Inter). Strong bold headings, high-contrast body.
- **Components** (in `src/components/`): `Header` (sticky nav + mobile menu), `Footer`, `Hero`, `SectionHeading`, `ServiceCard`, `ProjectCard`, `StatCounter`, `TestimonialCard`, `ProcessStep`, `CTABand`, `Button`, `FormField`, `Container` (max-width wrapper), `Gallery`.
- Reuse existing `ThemedText` / `ThemedView` / `useTheme` and extend `src/constants/theme.ts` with brand tokens (colors, spacing, radii, breakpoints).
- **Responsive**: mobile-first; use `useWindowDimensions()` + breakpoint helpers for 2/3/4-col grids.
- **Light/dark**: scaffold supports it — keep or lock to light for a marketing site (decide).

---

## 6. Technical Decisions

| Concern | Recommendation |
|---------|----------------|
| Routing | expo-router file-based (already set up), typed routes on |
| Styling | Extend `theme.ts` tokens + `StyleSheet`; optionally add **NativeWind** for Tailwind-style utilities (not installed — add only if wanted) |
| Images | `expo-image` (already a dep) with blurhash placeholders; store in `assets/images/` for v1, move to CDN later |
| Forms | Controlled RN inputs; validate client-side; submit to a serverless endpoint or form service (see §7) |
| SEO | Static output gives per-route HTML. Add per-page `<title>`/meta via expo-router `Head`; add JSON-LD `LocalBusiness`/`GeneralContractor` schema, sitemap.xml, robots.txt, OG images |
| Analytics | Add lightweight analytics (Plausible/GA4) — decide, privacy-friendly preferred |
| Accessibility | Semantic roles, alt text, focus states, color-contrast AA |
| Icons | `expo-symbols` (SF Symbols on web fallback) or a vector icon set |

---

## 7. Backend / Forms (only piece needing a server)

The site is static; the only dynamic need is **form submission**. Options, simplest → most control:
1. **Form service** (Formspree, Web3Forms, Formspark) — POST from the client, emails you the lead. Zero backend. *Recommended for v1.*
2. **Serverless function** (Vercel/Netlify function or Cloudflare Worker) — validate + send email (Resend/SendGrid) + optional store in a DB/Airtable/Google Sheet.
3. **Full backend/CMS** later if content editing by non-devs is needed (Sanity, Contentful, or a headless WordPress).

Include spam protection (honeypot + optional hCaptcha) and a success/thank-you state.

---

## 8. Deployment

- Build: `npx expo export --platform web` → static `dist/`.
- Host: **Vercel / Netlify / Cloudflare Pages** (all handle Expo static output + SPA fallback + serverless functions for forms).
- Custom domain + HTTPS, redirect www, set cache headers for assets.
- Later: `eas build` for iOS/Android from the same repo if a mobile app is wanted.

---

## 9. Build Phases / Milestones

**Phase 0 — Foundation (done / in progress)**
- [x] Scaffold Expo project
- [ ] Add brand tokens to `theme.ts`, wire fonts, set favicon/OG defaults
- [ ] Build `Header`, `Footer`, `Container`, `Button` shell + root `_layout`

**Phase 1 — Core pages (static content)**
- [ ] Home with all sections (placeholder content/images)
- [ ] Services overview + detail template
- [ ] Projects grid + detail template + filtering
- [ ] About, Process, Contact, Quote pages
- [ ] Data files in `src/data/` with sample entries

**Phase 2 — Conversion & polish**
- [ ] Quote + Contact forms wired to a form service (§7)
- [ ] Testimonials, Careers, legal pages
- [ ] Responsive pass (mobile menu, grids), animations (reanimated), image optimization

**Phase 3 — SEO, analytics, launch**
- [ ] Meta/OG per page, JSON-LD schema, sitemap.xml, robots.txt
- [ ] Analytics + accessibility audit + Lighthouse pass
- [ ] Deploy to Vercel/Netlify, custom domain, final QA

**Phase 4 (optional, later)**
- [ ] CMS for editable content
- [ ] Blog / news section
- [ ] Native iOS/Android build via EAS

---

## 10. Open Questions for the Client

1. **Platform**: web only, or also native mobile app?
2. **Brand**: existing logo, colors, fonts? Company details (real name, phone, email, address, service areas)?
3. **Content**: real project photos, case studies, team bios, testimonials — available, or use placeholders for now?
4. **Services**: exact list and categories.
5. **Forms**: where should leads go (email, CRM, spreadsheet)? Any existing form service?
6. **Extras**: blog? careers with live listings? multiple languages? online project tracking for clients?
7. **Analytics/legal**: preferred analytics; need cookie consent / GDPR?

---

## Commands

```bash
cd /Users/aashraybavisa/Desktop/aashray-buildcon
npm run web      # dev server (web)
npm run ios      # iOS simulator
npm run android  # Android emulator
npx expo export --platform web   # production static build → dist/
```
