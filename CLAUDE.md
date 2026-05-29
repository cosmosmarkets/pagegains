# CLAUDE.md — PageGains Redesign (project root)

This is the **live build** of the PageGains homepage redesign. The original site mirror lives in
`original/`, brand rules in `brand_assets/`, and the full build brief in `REDESIGN_PLAN.md`.
Read `REDESIGN_PLAN.md` before touching any stage — it is the source of truth for structure,
copy, and per-stage specs.

## Ship loop — after every stage
1. Build the stage exactly as `REDESIGN_PLAN.md` specifies. One stage at a time. Never write ahead.
2. Visually verify locally (`npm run dev`, screenshot, compare).
3. `npm run build` must pass clean before committing.
4. Commit, then push to `origin main` → `https://github.com/cosmosmarkets/pagegains`.
5. Vercel auto-deploys to `https://pagegains-roan.vercel.app/`. Confirm the deploy is green and
   the live page renders the completed stage. **A stage is not done until the live URL loads it.**
6. **Fix any 404 on the live URL before moving on.** Most likely causes & fixes:
   - Wrong/missing build output → Vercel must use Vite preset, build `npm run build`, output `dist`.
   - Asset paths: reference public assets as root-absolute (`/audit-result-screenshot.webp`), never
     relative or `file://`. Everything the page loads must live in `public/`.
   - SPA fallback: this is a single page (no router), so no rewrite is normally needed. If deep
     links 404, add a `vercel.json` rewrite of `/(.*)` → `/index.html`.
   - Case sensitivity: Vercel's Linux build is case-sensitive; match asset filenames exactly.
7. After a stage is verified live, **stop and ask for manual approval** before starting the next.

## Project structure (locked)
- Vite + React app lives at the **repo root**. `brand_assets/` and `original/` are reference only —
  they are not imported by the app and must not ship as routes.
- Stack is locked: GSAP + ScrollTrigger, Lenis, plain CSS files (one per component/section,
  imported in JSX). No CSS Modules, no Tailwind, no styled-components, no router.
- All design tokens come from `src/tokens.css` (copied from `brand_assets/tokens.css`). Never
  hardcode a hex that exists as a `--pg-*` token.

## Content & brand
- All copy, testimonials, stats, pricing, and FAQ answers come from `original/index.html` and the
  Real Data Reference in `REDESIGN_PLAN.md`. **Never fabricate numbers or quotes.**
- Colors are locked: `#FF4D3A` coral · `#F6F4EF` paper · `#0B0B0C` ink · `#C41E2A` crimson (urgency
  only). No default Tailwind palette, no purple gradients, no glassmorphism.
- Typography: Geist (display) · Instrument Serif italic (3–6 accent words/section) · JetBrains Mono
  (eyebrows/meta). Never one font for both headings and body.

## Motion rules (hard)
- Animate **only `transform` and `opacity`**. **Never `transition-all`** — list each property.
- Every GSAP effect lives inside a `gsap.context()` and is reverted in the `useEffect` cleanup
  (StrictMode-safe). Gate all motion behind a `prefers-reduced-motion` check.
- `will-change: transform` only on elements that actually animate.

## No backend
- Prototype only. No API calls, no real form submission. The URL bar is visual; pressing enter
  does nothing destructive.

## Local tooling
- Dev server: `npm run dev` (Vite, default `http://localhost:5173`). The legacy `node serve.mjs`
  (port 3000) only serves the static design-system/original mirror — not the React app.
- Screenshot workflow per the parent CLAUDE.md exists but its puppeteer path points at a different
  user profile (`C:/Users/nateh/...`); verify/relocate before relying on it on this machine.
