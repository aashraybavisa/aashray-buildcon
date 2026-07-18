# Aashray Buildcon — Build Roadmap

**Progress: 6 of 9 stages complete (~67%)** · In progress: 2 · Up next: configure Stage 7 lead delivery

> See [PLAN.md](PLAN.md) for the full product plan (sitemap, page content, architecture).

---

## Stage 1 · Project setup and scaffold — ✅ DONE

- [x] Expo app created (SDK 57)
- [x] expo-router, universal web + mobile
- [x] Static web output configured

## Stage 2 · Brand and design tokens — ✅ DONE

- [x] Logo suite in `assets/brand`
- [x] Amber/charcoal token system (`src/theme`)
- [x] Light + dark, type scale, shadows
- [x] Data layer (`src/data`) + fonts + icons installed

## Stage 3 · Core UI components — ✅ DONE

- [x] Logo, Button, Badge, Eyebrow
- [x] Section heading, cards (Service/Project/Testimonial), process step
- [x] CTA band, form field, photo placeholder

## Stage 4 · Navigation and chrome — ✅ DONE

- [x] Font loading + theme in root layout
- [x] Responsive header + footer
- [x] Mobile bottom tabs

## Stage 5 · Marketing screens — ✅ DONE

- [x] Home
- [x] Services
- [x] Projects (with filter)
- [x] Quote
- [x] About, Contact

## Stage 6 · App icon, splash and favicon — ✅ DONE

- [x] Rasterize logo to PNG sizes
- [x] Update `app.json` with brand icon, splash, adaptive icon, and favicon

## Stage 7 · Forms and lead capture — ▶ IN PROGRESS

- [ ] Wire quote + contact to an approved form-service or serverless endpoint
- [x] Validation, spam guard, error and success states
- [ ] **Decision needed:** where should leads go — email / spreadsheet / CRM?

## Stage 8 · Admin section — ⏳ REMAINING

- [ ] Login + protected dashboard
- [ ] Letterhead design + download
- [ ] Dynamic quote builder
- [ ] **Input needed:** letterhead design + how the quote builder should work

## Stage 9 · SEO, analytics, launch — ▶ IN PROGRESS

- [x] Meta, JSON-LD, robots, and static sitemap route
- [ ] Analytics + accessibility pass
- [ ] Deploy web + EAS mobile build
