# JetQ Lamborghini-Inspired Redesign Plan

## Goal

Redesign the entire JetQ Next.js website according to `DESIGN.md` in the project root: true-black canvas, Lamborghini Gold (#FFC000) accents, sharp angular components, uppercase display typography, and a minimal floating navigation.

## Global Design Rules (from DESIGN.md)

- Background: absolute black `#000000` (dark mode), `#F8F8F8` (light mode rare surfaces)
- Primary CTA: Lamborghini Gold `#FFC000` with black text, zero border-radius
- Secondary CTA: transparent ghost button with 1px white border at 50% opacity
- Surfaces: Charcoal `#202020`, Dark Iron `#181818`
- Text: Pure White `#FFFFFF` headings, Ash `#7D7D7D` body, Smoke `#F5F5F5` secondary
- Accent hover: Dark Gold `#917300`, Cyan Pulse `#29ABE2`, Link Blue `#3860BE`
- Border-radius: 0px everywhere except toggle switches
- Typography: uppercase display headings, tight line-heights (0.92–1.19), weight 400
- Font: LamboType unavailable → use `Oswald` from Google Fonts as aggressive geometric sans fallback
- Layout: full-viewport hero video, centered content, generous black whitespace

## Tasks

### Task 1: Global Theme & Shared Components

Files to modify/create:
- `app/globals.css` — update CSS variables to Lamborghini palette
- `app/layout.tsx` — switch font to Oswald with Cyrillic, update metadata
- `tailwind.config.ts` — extend colors to match palette exactly
- `components/navbar.tsx` — minimal transparent floating nav, centered logo, "МЕНЮ" hamburger left, theme toggle right, no borders
- `components/footer.tsx` — charcoal surface (#202020), uppercase micro labels, social links
- `components/cta-button.tsx` — zero radius, gold primary, ghost secondary, white filled variant
- `components/theme-toggle.tsx` — keep but style as sharp ghost icon
- `components/mobile-menu.tsx` — full-screen black overlay, large uppercase links
- `components/hero-video.tsx` — keep video, ensure overlay and sizing
- `components/section-header.tsx` — uppercase section titles, gold accent optional
- `components/service-card.tsx` — charcoal background, sharp corners, uppercase title
- `components/process-step.tsx` — gold number circle, uppercase title
- `components/contact-block.tsx` — minimal, uppercase labels

### Task 2: Page Content Redesign

Files to modify:
- `app/page.tsx` — hero with massive uppercase headline, gold CTA, ghost CTA, charcoal service cards, process steps, contact
- `app/detailing/page.tsx` — same Lamborghini treatment: uppercase hero, charcoal service grid, gallery, contact
- `app/cars/page.tsx` — uppercase hero, charcoal car cards, purchase options, trade-in block, contact

### Task 3: Verification

- `npm run lint`
- `npm run build`
- Check `dist/` output

## Constraints

- Keep Russian language
- Keep existing page routes and video sources
- Keep contact info unchanged
- Maintain static export
