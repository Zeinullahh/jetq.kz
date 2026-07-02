# JetQ Website Redesign — Design Specification

## 1. Project Overview

Rebuild the JetQ brand website as a premium, multi-page Next.js application. The site should feel elegant and high-end, comparable to the visual language of Zeekr/Rolls-Royce, with full light/dark mode support.

**Business focus:**
- Primary highlight on **JetQ Detailing** on the homepage.
- Additional service overviews: car sales, auto exchange (trade-in), and car import from China.
- Dedicated detail pages for `/detailing` and `/cars` (sales includes exchange info).

**Language:** Russian only.

**Reference sites:**
- `https://www.newtone.kz/` — structure and premium automotive feel.
- `https://jetq.kz/` — current brand content and contact details.
- `https://www.instagram.com/jetqauto.kz/` — brand identity reference.

## 2. Visual Direction

- **Style:** Premium, elegant, automotive luxury.
- **Mood:** Clean, confident, cinematic.
- **Color palette:**
  - Dark mode: near-black background (`#0a0a0a`), soft white text, subtle gray accents.
  - Light mode: warm off-white background (`#fafafa`), deep charcoal text.
  - Accent: deep metallic blue or champagne gold (default to deep blue `#1e3a8a` that works in both modes).
- **Typography:** Geometric sans-serif for headings (Inter or similar), clean sans-serif for body.
- **Imagery:** High-resolution car and detailing photography. Use current `jetq.kz` assets where possible; fall back to Unsplash placeholders.

## 3. Site Structure

| Route | Purpose |
|-------|---------|
| `/` | Main overview page: hero video, intro, service highlights, why JetQ, process, contacts. |
| `/detailing` | Dedicated detailing page: hero, service list, packages, process, gallery, contacts. |
| `/cars` | Car sales page: hero, catalog, trade-in/exchange section, purchase options, contacts. |

## 4. Shared Components

- **Navbar:** Logo, navigation links, light/dark toggle, mobile hamburger menu.
- **Footer:** Contact info, working hours, social links, quick links.
- **HeroVideo:** Full-screen background video. YouTube embed for desktop/tablet landscape; Instagram Reel embed for mobile portrait.
- **SectionHeader:** Centered title + subtitle block.
- **ServiceCard:** Image/icon, title, short description, link.
- **ProcessStep:** Numbered step with title and description.
- **ContactBlock:** Address, phone, hours, map placeholder.
- **CTAButton:** Primary and secondary button variants.

## 5. Page Sections

### Homepage (`/`)
1. Hero with background video and main tagline.
2. Short brand intro.
3. Service highlights: Detailing, Sales, Exchange, Import.
4. Why JetQ (advantages).
5. Process overview (4–5 steps).
6. Contact / CTA.
7. Footer.

### Detailing Page (`/detailing`)
1. Hero with detailing-specific tagline.
2. Service list (interior, exterior, ceramic coating, paint protection, etc.).
3. Process steps for detailing.
4. Gallery / before-after placeholder.
5. Contact / booking CTA.
6. Footer.

### Cars Page (`/cars`)
1. Hero with sales tagline.
2. Featured / popular cars catalog grid.
3. Trade-in / exchange section.
4. Purchase options (cash, credit, leasing).
5. Contact CTA.
6. Footer.

## 6. Theme System

- Next.js 14 App Router.
- Tailwind CSS with CSS variables for light/dark colors.
- `next-themes` for theme toggling and persistence.
- Theme toggle in navbar.

## 7. Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** `lucide-react`
- **Theme:** `next-themes`
- **Video:** Embedded YouTube and Instagram players
- **Fonts:** Inter (via `next/font`)

## 8. Assets & Content

- **Hero video desktop:** `https://youtu.be/3Kh2gpornEY?si=kzUN7AYd27D_bgrS`
- **Hero video mobile:** `https://www.instagram.com/reel/DWoVn-0DfAz/?utm_source=ig_web_copy_link`
- **Logo:** Placeholder elegant "JETQ" logotype until a logo file is provided.
- **Photos:** Use current `jetq.kz` imagery where possible; otherwise Unsplash automotive/detailing photos.
- **Contacts (from current site):**
  - Address: г. Алматы, ЖК Forum Residence, ул. Байтурсынова 179/2, блок 2
  - Phone: +7 (775) 006-14-11
  - Hours: 10:00 – 19:00, ежедневно

## 9. Implementation Notes

- Use React Server Components by default; client components only for theme toggle and mobile menu.
- Keep all text in Russian.
- Make sure video embeds are responsive and do not autoplay with sound.
- Optimize images via `next/image` where possible; external images require `remotePatterns` config.
- Build mobile-first, ensure full responsiveness.
