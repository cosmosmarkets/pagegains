# PageGains Homepage Redesign — Implementation Plan

**Stack:** Vite + React · GSAP + ScrollTrigger · Lenis.js · Frontend prototype only (no backend)  
**Goal:** Show-stopping, conversion-focused redesign to pitch to the site owner as a commission.

> **Rule:** Build one stage at a time. Complete and visually verify each stage before moving to the next. Do not jump ahead.

---

## Design Direction

**Style: Editorial Brutalism.** Push the existing editorial newspaper feel into asymmetric, grid-breaking territory. The current site is symmetrical, polite, and safe. The redesign should feel heavy, show-stopping, and unapologetic.

**Core adjectives:** Asymmetrical · Blunt · Heavy · Show-stopping · Urgent

**Core rules:**
- Typography IS the layout in key sections — the headline is the structure, not content inside a box
- Hard 2px solid ink-colour lines as section dividers, not just whitespace
- 1–2 deliberate grid breaks per section: bleeds, rotations, oversized elements
- Grain texture: SVG noise overlay at ~4% opacity on the paper background
- Depth via hard offset shadows — push to 10–12px on key elements
- Horizontal scroll in **Testimonials only**
- Marquee ticker strip between Hero and How It Works
- **NEVER use `transition-all`.** Animate only `transform` and `opacity`
- No glassmorphism. No purple gradients. No illustration packs.

**Colour:** Keep exactly. `#FF4D3A` coral red · `#F6F4EF` paper · `#0B0B0C` ink · `#C41E2A` crimson (urgency only)

**Typography:**
- Display: Geist 700–800 (headlines, pricing figures)
- Accent: Instrument Serif italic (3–6 words per section max)
- UI/Meta: JetBrains Mono (eyebrows, stats, labels, code)

---

## Page Rhythm — Light / Dark Map

| Section | Theme |
|---|---|
| Nav | LIGHT |
| Hero | LIGHT |
| Marquee Strip | RED (`#FF4D3A` bg, 2px ink borders) |
| How It Works | LIGHT |
| Sample Output | LIGHT |
| Testimonials | **DARK** — `data-theme="dark"` |
| Pricing | **DARK** — continues |
| FAQ | LIGHT — returns |
| Final CTA | **DARK** — `data-theme="dark"` |
| Footer | **DARK** — continues |

---

## Real Data Reference

> Do not fabricate any statistics, testimonials, pricing, or copy. Use only what is listed here.

**Pricing:**
- Single audit: **$3.99**
- Free to start: score + issue preview free; $3.99 to unlock full report
- Starter pack: 5 audits · $9.99 · $2.00/audit · 50% off
- Growth pack: 20 audits · $29.99 · $1.50/audit · 62% off
- Scale pack: 50 audits · $49.99 · $1.00/audit · 75% off

**Stats:**
- Result time: ~60 seconds / median **52s**
- Issues per page: avg **17** / range 10–20 ranked
- Signals scanned: **120**
- Benchmarked against: **8,000+** converting SaaS pages
- Agency comparison (from public FAQ): agencies charge $3,000–$10,000/month and take weeks

**Testimonials (verbatim — do not paraphrase):**
- **Marco D., Indie hacker:** "For four bucks I got a sharper audit than the agency I paid $2,400 for last quarter. Uncomfortable truths." ★★★★★
- **Jonathan B., Myloops.net:** "Conversion rate went from 2.6% to 3.3% within a few weeks. Ranked by impact is the killer feature." ★★★★★
  - Photo: `jonathan-b.jpg` in `public/`
  - Stat from public FAQ: +$1,933/month — can appear near Jonathan's card
- **Eric F., Founder at Editaura:** "Every single tip was extremely useful." ★★★★★
- **Section H2 pull quote (Eric's):** "It found things a $3k consultant missed."

**Assets — copy to `/public/`:**
```
pagegains-logo-new.png
audit-result-screenshot.webp
jonathan-b.jpg
gainbot-icon.png
favicon.png
```

**Launch badges (load via external URLs, do not download):**

| Name | Image src | Link href |
|---|---|---|
| Nick Launches | `https://nicklaunches.com/badges/featured-dark.svg` | `https://nicklaunches.com/products/pagegains/` |
| Startup Fame | `https://startupfa.me/badges/featured-badge.webp` | `https://startupfa.me/s/pagegains` |
| Launchit | `https://www.launchit.site/badges/launchit-dark.svg` | `https://www.launchit.site/launches/pagegains` |
| Better Launch | `https://www.betterlaunch.co/badge-light.svg` | `https://www.betterlaunch.co` |
| ListBulb | `https://www.listbulb.com/featured-on-listbulb-light.svg` | `https://www.listbulb.com/tools/pagegains` |

**Reference files:**
- `original/index.html` — source of truth for all copy and FAQ answers
- `brand_assets/BRAND.md` — brand guidelines
- `brand_assets/tokens.css` — design tokens (copy to `src/tokens.css`)
- `brand_assets/design-system.html` — visual reference

---

---

# PHASE 0 — Project Setup

**What to deliver:** A clean running Vite + React dev environment with dependencies installed, fonts loading, and folder structure in place. No visual output yet.

## Commands

```bash
npm create vite@latest pagegains-redesign -- --template react
cd pagegains-redesign
npm install
npm install gsap lenis
```

## Copy assets

```bash
# From brand_assets/ into the project:
cp brand_assets/tokens.css src/tokens.css

# From brand_assets/ or original/ into public/:
cp brand_assets/pagegains-logo-new.png public/
cp brand_assets/favicon.png public/
cp original/audit-result-screenshot.webp public/
cp original/jonathan-b.jpg public/
cp original/gainbot-icon.png public/
```

## Folder structure

```
src/
  components/
    Eyebrow.jsx        — JetBrains Mono label
    HighlightChip.jsx  — Skewed red keyword chip
    CTAButton.jsx      — Hard offset shadow CTA
    URLBar.jsx         — URL input / hero conversion element
    Marquee.jsx        — Horizontal scrolling ticker strip
  sections/
    Nav.jsx
    Hero.jsx
    HowItWorks.jsx
    SampleOutput.jsx
    Testimonials.jsx
    Pricing.jsx
    FAQ.jsx
    FinalCTA.jsx
    Footer.jsx
  App.jsx
  main.jsx
  tokens.css
  global.css
```

## `index.html` — add to `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700;800&family=Instrument+Serif:ital@0,1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="preload" as="image" href="/audit-result-screenshot.webp">
<link rel="icon" href="/favicon.png">
<title>PageGains — Find What's Killing Your Conversions In 60s</title>
```

## `main.jsx` — Lenis + GSAP init

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import App from './App'
import './tokens.css'
import './global.css'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5,
})

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
)
```

> **Note:** the shipped `src/main.jsx` is intentionally richer than this snippet and is the source of
> truth — it adds `document.fonts.ready` + `window load` → `ScrollTrigger.refresh()` (Q3), a
> reduced-motion teardown of Lenis (Q1/motion rules), and exposes `window.__lenis` for the marquee
> velocity coupling (Q8). Do not regress it back to this minimal version.

## `App.jsx`

```jsx
import Nav          from './sections/Nav'
import Hero         from './sections/Hero'
import HowItWorks   from './sections/HowItWorks'
import SampleOutput from './sections/SampleOutput'
import Testimonials from './sections/Testimonials'
import Pricing      from './sections/Pricing'
import FAQ          from './sections/FAQ'
import FinalCTA     from './sections/FinalCTA'
import Footer       from './sections/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <SampleOutput />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
```

**Verify:** `npm run dev` runs without errors, Google Fonts load in the browser.

---

# PHASE 1 — Global Design Pass

**What to deliver:** Global CSS baseline, grain texture, shared component atoms. The page should *feel* like PageGains from body background and font rendering alone — before any section exists.

## `global.css`

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; } /* Lenis handles smooth scroll */

body {
  background: var(--pg-paper);
  color: var(--pg-ink);
  font-family: var(--pg-font-display);
  font-size: var(--pg-text-body);
  line-height: var(--pg-leading-body);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Grain texture overlay */
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 9999;
  pointer-events: none; opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

::selection { background: var(--pg-red); color: #fff; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--pg-line); }
::-webkit-scrollbar-thumb { background: var(--pg-red); border-radius: 3px; }

img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

.pg-section {
  padding: var(--pg-section-y) var(--pg-gutter);
  max-width: var(--pg-max-width);
  margin: 0 auto;
}
@media (max-width: 768px) {
  .pg-section { padding: var(--pg-section-y-sm) var(--pg-gutter-sm); }
}
```

## Shared component atoms

### `Eyebrow.jsx`

JetBrains Mono, 11px, uppercase, letter-spacing 0.14em, `var(--pg-mute)`. Props: `text`.

```jsx
export default function Eyebrow({ text }) {
  return <span className="eyebrow">{text}</span>
}
```

```css
.eyebrow {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-meta);
  color: var(--pg-mute);
  letter-spacing: var(--pg-tracking-meta);
  text-transform: uppercase;
  display: block;
  margin-bottom: 16px;
}
```

### `HighlightChip.jsx`

Skewed red chip. Use on **1–2 words per headline maximum**. Props: `children`.

```jsx
export default function HighlightChip({ children }) {
  return <mark className="highlight-chip">{children}</mark>
}
```

```css
.highlight-chip {
  background: var(--pg-red);
  color: #fff;
  padding: 0 0.1em;
  display: inline-block;
  transform: skew(-4deg);
  box-shadow: 6px 6px 0 var(--pg-ink);
  font-style: normal;
}
```

### `CTAButton.jsx`

Props: `label`, `href`, `size` (`'default'` | `'small'`), `theme` (`'red'` | `'ink'`).

```jsx
export default function CTAButton({ label, href, size = 'default', theme = 'red' }) {
  return (
    <a href={href} className={`cta-btn cta-btn--${size} cta-btn--${theme}`}>
      {label}
    </a>
  )
}
```

```css
.cta-btn {
  display: inline-flex;
  align-items: center;
  font-family: var(--pg-font-display);
  font-weight: 700;
  font-size: 15px;
  border-radius: var(--pg-radius-sm);
  padding: 14px 28px;
  cursor: pointer;
  transition: transform 150ms var(--pg-ease-default),
              box-shadow 150ms var(--pg-ease-default);
}
.cta-btn--red { background: var(--pg-red); color: #fff; box-shadow: 6px 6px 0 var(--pg-ink); }
.cta-btn--ink { background: var(--pg-ink); color: #fff; box-shadow: 6px 6px 0 var(--pg-red); }
.cta-btn--small { padding: 10px 20px; font-size: 13px; }
.cta-btn:hover { transform: translate(3px, 3px); box-shadow: 3px 3px 0 var(--pg-ink); }
.cta-btn--ink:hover { box-shadow: 3px 3px 0 var(--pg-red); }
```

### `URLBar.jsx`

Primary conversion element. Styled as a terminal prompt. No real form submission needed for this prototype.

```jsx
export default function URLBar({ id }) {
  return (
    <div className="url-bar" id={id}>
      <div className="url-bar__prefix">https://</div>
      <input
        className="url-bar__input"
        type="text"
        placeholder="yoursite.com/pricing"
        aria-label="Enter your page URL"
      />
      <button className="url-bar__btn">Audit my page →</button>
    </div>
  )
}
```

```css
.url-bar {
  display: flex;
  align-items: center;
  border: 2px solid var(--pg-ink);
  border-radius: var(--pg-radius-sm);
  background: #fff;
  box-shadow: 10px 10px 0 var(--pg-red);
  overflow: hidden;
  transition: box-shadow 150ms var(--pg-ease-default);
}
.url-bar:focus-within { box-shadow: 10px 10px 0 var(--pg-ink); }
.url-bar__prefix {
  font-family: var(--pg-font-mono);
  font-size: 14px;
  color: var(--pg-mute);
  padding: 0 12px 0 16px;
  border-right: 1px solid var(--pg-line);
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.url-bar__input {
  flex: 1;
  border: none;
  outline: none;
  font-family: var(--pg-font-mono);
  font-size: 14px;
  padding: 16px 12px;
  background: transparent;
  color: var(--pg-ink);
}
.url-bar__btn {
  background: var(--pg-ink);
  color: #fff;
  border: none;
  font-family: var(--pg-font-display);
  font-weight: 700;
  font-size: 14px;
  padding: 16px 24px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms;
}
.url-bar__btn:hover { background: var(--pg-red); }
```

**Dark-section override (Q4 — REQUIRED).** URLBar is a light "card" that floats in BOTH the light
Hero and the dark FinalCTA. In `[data-theme="dark"]`, `var(--pg-ink)` resolves to near-white, which
would turn the input text white-on-white and the submit button near-white with white text. Re-pin the
ink-coloured parts to a **literal** dark neutral so the bar renders identically in both themes:

```css
[data-theme="dark"] .url-bar { background: #fff; }
[data-theme="dark"] .url-bar__input { color: var(--pg-neutral-950); }
[data-theme="dark"] .url-bar__btn  { background: var(--pg-neutral-950); color: #fff; }
[data-theme="dark"] .url-bar__btn:hover { background: var(--pg-red); }
/* border + 10px red shadow already read correctly on dark — leave them. */
```

**Verify:** Grain is subtle but visible. Fonts render correctly. URLBar and CTAButton hard shadows look right at a glance.

---

# PHASE 2 — Tone Pass

**What to deliver:** All sections stubbed with placeholder headings and background colours only. No real content yet. Scroll the full page and validate the overall feel before any real section is built.

Stub every section as a simple coloured block with its heading. Use `data-theme="dark"` on dark sections.

**Checklist — only proceed to Stage 1 after all of these pass:**

- [ ] Light → Red marquee → Light → Dark → Light → Dark rhythm reads correctly on scroll
- [ ] Lenis scrolls smoothly at `duration: 1.2` — tune to 0.8–1.4 range here if needed
- [ ] Grain texture is present but not distracting
- [ ] Typography scale feels massive enough in the hero area
- [ ] Section heights feel balanced — not too cramped, not too padded
- [ ] Hard offset shadows on `URLBar` and `CTAButton` look right in context
- [ ] Dark sections (`#0B0B0C`) contrast sharply against light (`#F6F4EF`)

---

---

# STAGE 1 — Nav

**What to deliver:** A sticky fixed navigation bar. Transparent until scroll, then gets a background.

## Spec

- **Position:** `fixed`, `top: 0`, `z-index: 100`
- **Height:** `64px`
- **Layout:** `flex`, `justify-content: space-between`, `align-items: center`, `max-width: 1400px`, `padding: 0 40px`, `margin: 0 auto`

| Zone | Content |
|---|---|
| Left | `<img src="/pagegains-logo-new.png" height="28">` wrapped in `<a href="/">` |
| Centre | Links: `How it works` / `Pricing` / `FAQ` — JetBrains Mono 12px uppercase, `letter-spacing: 0.1em`, colour `var(--pg-body)`, hover `var(--pg-ink)` |
| Right | `<CTAButton label="Audit my page →" size="small" href="#hero-url-bar">` |

**On scroll:** Add class `.nav--scrolled` when `window.scrollY > 20`. This class adds `background: var(--pg-paper)` and `border-bottom: 1px solid var(--pg-line)`.

```jsx
useEffect(() => {
  const fn = () => navRef.current.classList.toggle('nav--scrolled', window.scrollY > 20)
  window.addEventListener('scroll', fn, { passive: true })
  return () => window.removeEventListener('scroll', fn)
}, [])
```

**Mobile (`< 768px`):** Hide centre links. Logo and CTA only.

**Verify:** Scrolling the stub page triggers the border correctly. CTA button shadow looks sharp.

---

# STAGE 2 — Hero

**What to deliver:** The most important section. Asymmetric two-column layout with massive headline, rotating page-type text, URLBar, and the floating audit screenshot.

## Layout

```css
.hero-grid {
  display: grid;
  grid-template-columns: 65fr 35fr;
  gap: 60px;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 140px 40px 100px; /* extra top padding accounts for fixed nav */
}
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; padding: 100px 20px 60px; }
}
```

## Left column (top to bottom)

### 1. Eyebrow with live indicator

```jsx
<span className="eyebrow">
  CONVERSION AUDIT · v1.2 ·
  <span className="live-dot" />
  LIVE · BUILT FOR SAAS
</span>
```

```css
.live-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--pg-crimson);
  animation: pulse 1.5s ease-in-out infinite;
  margin: 0 5px;
  vertical-align: middle;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
```

### 2. H1 — Rotating headline

**Font:** Geist 800, `clamp(52px, 8vw, 110px)`, `line-height: 0.88`, `letter-spacing: -0.045em`

**Structure:** `Your [rotating type] is` **`[HighlightChip]losing[/HighlightChip]`** `conversions right now.`

Rotating values: `pricing page` / `landing page` / `homepage` / `signup flow`

Implement with **CSS @keyframes only — no JavaScript text-scramble libraries.**

**Width stability (Q6).** Do NOT hardcode `min-width` — it can't track the `clamp()` font-size across
viewports. Use a **single-cell grid stack**: the container is `inline-grid` and every word occupies the
same cell via `grid-area: 1 / 1`. The grid track auto-sizes to the widest word at every font-size, all
four words overlap, and each animates `opacity`/`transform` only. Fully CSS-only, zero magic numbers.

```css
.rotating-word {
  display: inline-grid;       /* track auto-sizes to widest word */
  vertical-align: baseline;   /* tune so the stack sits on the headline baseline */
}
.rotating-word span {
  grid-area: 1 / 1;           /* all words share one cell — no collapse, no absolute positioning */
  opacity: 0;
  animation: wordCycle 12s linear infinite;
}
.rotating-word span:nth-child(1) { animation-delay: 0s; }
.rotating-word span:nth-child(2) { animation-delay: 3s; }
.rotating-word span:nth-child(3) { animation-delay: 6s; }
.rotating-word span:nth-child(4) { animation-delay: 9s; }

@keyframes wordCycle {
  0%, 5%   { opacity: 0; transform: translateY(8px);  }
  10%, 20% { opacity: 1; transform: translateY(0);    }
  25%, 100%{ opacity: 0; transform: translateY(-8px); }
}
```

### 3. Subline

- **Text:** `10–20 ranked fixes. ~60 seconds. $3.99.`
- **Font:** Geist 400, 22px, `line-height: 1.35`, colour `var(--pg-body)`
- **Margin:** 24px top, 32px bottom

### 4. URLBar

```jsx
<URLBar id="hero-url-bar" />
```

### 5. Stats row

`flex`, `gap: 32px`, `margin-top: 20px`. JetBrains Mono 11px.

Stats: `Median 52s` · `Avg 17 issues` · `Money-back guarantee`

Numbers/bold words in `var(--pg-ink)`. Labels in `var(--pg-mute)`. Separator dots in `var(--pg-line-strong)`.

## Right column

`audit-result-screenshot.webp`. Use `loading="eager"`.

```css
.hero-screenshot {
  width: 100%;
  max-width: 520px;
  transform: rotate(1.5deg);
  box-shadow: var(--pg-shadow-float);
  border-radius: var(--pg-radius-md);
  margin-left: -20px;  /* overlaps left column slightly */
  position: relative;
  z-index: 2;
  will-change: transform;
}
@media (max-width: 900px) {
  .hero-screenshot { transform: none; margin-left: 0; margin-top: 40px; }
}
```

## GSAP — onMount animations (not scroll-triggered)

All: `ease: 'power3.out'`, `duration: 0.8`

```js
useEffect(() => {
  const tl = gsap.timeline()
  tl.from(eyebrowRef.current,    { opacity: 0, y: 16 }, 0.10)
    .from(h1Ref.current,         { opacity: 0, y: 24 }, 0.20)
    .from(screenshotRef.current, { opacity: 0, x: 30  }, 0.25)
    .from(sublineRef.current,    { opacity: 0, y: 16  }, 0.35)
    .from(urlBarRef.current,     { opacity: 0, y: 12, scale: 0.98 }, 0.45)
    .from(statsItems,            { opacity: 0, y: 8, stagger: 0.08 }, 0.55)
}, [])
```

**Verify:** Headline feels massive. Rotating text cycles cleanly. Screenshot floats with rotation. Stats row reads clearly. The whole section should feel punchy without even scrolling.

---

# STAGE 3 — Marquee Strip + How It Works

**What to deliver:** The red ticker strip and the three-step section. Two components in one stage — they share a similar build complexity.

## Marquee Strip

Full-width red band between Hero and How It Works.

```jsx
// Marquee.jsx
export default function Marquee() {
  const text = "YOUR PRICING PAGE IS BLEEDING SIGNUPS · $3.99 · 52 SECONDS · YOUR HOMEPAGE IS COSTING YOU DEMOS · 10–20 RANKED FIXES · NO SUBSCRIPTION · MONEY-BACK GUARANTEE · "

  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        <span>{text}</span>
        <span>{text}</span> {/* duplicate for seamless loop */}
      </div>
    </div>
  )
}
```

```css
.marquee-strip {
  background: var(--pg-red);
  overflow: hidden;
  border-top: 2px solid var(--pg-ink);
  border-bottom: 2px solid var(--pg-ink);
  height: 42px;
  display: flex;
  align-items: center;
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 35s linear infinite;
  will-change: transform;
}
.marquee-track span {
  font-family: var(--pg-font-mono);
  font-size: 11px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  white-space: nowrap;
  padding: 0 32px;
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

Wire scroll velocity to marquee speed (Q8). Source it off the already-exposed `window.__lenis` (do
NOT re-instantiate Lenis or open a competing listener), **clamp** the multiplier so fast scrolls don't
spike, smooth toward the target, and decay back to base when idle. Guard on reduced-motion.

```js
// In Marquee.jsx useEffect (gsap.context-free; raw rAF loop), or wired in Stage 9.
const lenis = window.__lenis
const track = trackRef.current
if (lenis && track && !prefersReducedMotion) {
  let target = 1, current = 1
  lenis.on('scroll', ({ velocity }) => {
    target = Math.min(3, 1 + Math.abs(velocity) * 0.2)   // clamp top end
  })
  gsap.ticker.add(() => {
    target += (1 - target) * 0.05                          // decay toward base when idle
    current += (target - current) * 0.1                    // smooth applied value
    track.style.animationDuration = `${35 / current}s`
  })
}
```

## How It Works

- **Eyebrow:** `HOW IT WORKS · 3 STEPS`
- **H2:** `Three clicks. A` *`brutal`* `, honest report.` — "brutal" in Instrument Serif italic
- **H2 font:** Geist 800, `clamp(42px, 5.4vw, 78px)`, `letter-spacing: -0.035em`

### Grid — 2px gap IS the border

```css
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: var(--pg-line); /* the gap colour = the divider */
  margin-top: 60px;
}
.step-card {
  background: var(--pg-paper);
  padding: 40px 36px;
}
@media (max-width: 768px) {
  .steps-grid { grid-template-columns: 1fr; }
}
```

### Step content

**Step 01 / PASTE**
- Decorative number: `01` — JetBrains Mono 64px, colour `var(--pg-line-strong)`, `margin-bottom: 16px`
- Title: `Drop in any URL`
- Body: `Landing, product, pricing, checkout. We crawl the page the way a real visitor sees it — above-the-fold, scroll depth, forms, CTAs.`

**Step 02 / ANALYZE**
- Title: `AI scans 120 signals`
- Body: `Clarity, friction, trust, hierarchy, readability, pricing anchors, form length, mobile layout. Benchmarked against 8,000+ converting SaaS pages.`

**Step 03 / FIX**
- Title: `Ranked fixes, not fluff.`
- Body: `Every issue comes with the exact rewrite, severity, and a predicted lift range. Ship it in an afternoon.`

### GSAP — staggered card entry

```js
gsap.from(cardEls, {
  opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', stagger: 0.15,
  scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true }
})
```

**Verify:** Marquee scrolls seamlessly and speeds up on fast scroll. Steps grid uses line-gap borders, not box shadows. Decorative numbers feel heavy and editorial.

---

# STAGE 4 — Sample Output

**What to deliver:** The screenshot section with the perspective "stand-up" scroll animation. Short section, high visual impact.

- **Eyebrow:** `SAMPLE OUTPUT · REAL PAGE`
- **H2:** `This is what` **`$3.99`** `actually buys you.` — "$3.99" in `<HighlightChip>`
- **Image:** `audit-result-screenshot.webp`, `max-width: 1100px`, centered, `margin-top: 48px`, `loading="lazy"`

**Perspective ownership (Q7).** GSAP rewrites the `transform` property and would drop a CSS
`perspective(...)` set on the same element. Put perspective on a **wrapper** and animate `rotateX` on
the inner image only:

```css
.sample-wrap { perspective: 1200px; }        /* wrapper owns depth; GSAP never touches it */
.sample-screenshot {
  width: 100%;
  max-width: 1100px;
  margin: 48px auto 0;
  border-radius: var(--pg-radius-md);
  border: 1px solid var(--pg-line);
  box-shadow: var(--pg-shadow-float);
  transform: rotateX(8deg);                   /* GSAP animates this to 0 (scrub) */
  will-change: transform;
  backface-visibility: hidden;
}
```

### GSAP — screenshot "stands up" on scroll (scrub, not one-shot)

```js
gsap.fromTo(
  screenshotRef.current,
  { rotateX: 10, opacity: 0.7 },
  {
    rotateX: 0,
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: screenshotRef.current,
      start: 'top 85%',
      end: 'top 30%',
      scrub: 1.5,
    }
  }
)
```

**Verify:** Screenshot tilts at an angle initially, gradually straightens as you scroll into it. The effect should feel cinematic, not jarring.

---

# STAGE 5 — Testimonials

**What to deliver:** Dark section with horizontal drag-to-scroll card row. Three real testimonials, Marco first.

- **Section:** `data-theme="dark"`, `background: var(--pg-ink)`, `padding: 100px 40px`
- **Eyebrow:** `WHAT FOUNDERS SAY`
- **H2 (pull quote):** `"It found things a $3k consultant missed."` — consider Instrument Serif italic here, `clamp(36px, 4vw, 64px)`
- **Attribution below H2:** `— Eric F., Founder at Editaura` — JetBrains Mono 12px, `var(--pg-neutral-500)`

## Horizontal scroll container

```css
.testimonials-track-wrapper {
  overflow-x: scroll;
  cursor: grab;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-top: 60px;
}
.testimonials-track-wrapper::-webkit-scrollbar { display: none; }
.testimonials-track-wrapper:active { cursor: grabbing; }

.testimonials-track {
  display: flex;
  gap: 24px;
  padding: 8px 40px 40px;
}

.testimonial-card {
  background: var(--pg-neutral-900);
  border: 1px solid var(--pg-neutral-800);
  border-radius: var(--pg-radius-xl);
  padding: 36px;
  min-width: 380px;
  flex-shrink: 0;
  box-shadow: 8px 8px 0 var(--pg-red);
  transition: transform 200ms var(--pg-ease-default);
}
.testimonial-card:hover { transform: translate(-3px, -3px); }
```

## Drag-to-scroll behaviour

```js
useEffect(() => {
  const el = trackRef.current
  let isDown = false, startX, scrollLeft
  const onDown  = e => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft }
  const onUp    = () => { isDown = false }
  const onMove  = e => {
    if (!isDown) return
    e.preventDefault()
    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5
  }
  el.addEventListener('mousedown', onDown)
  el.addEventListener('mouseleave', onUp)
  el.addEventListener('mouseup', onUp)
  el.addEventListener('mousemove', onMove)
  return () => {
    el.removeEventListener('mousedown', onDown)
    el.removeEventListener('mouseleave', onUp)
    el.removeEventListener('mouseup', onUp)
    el.removeEventListener('mousemove', onMove)
  }
}, [])
```

## Cards

**Card 1 — Marco D.** *(leads — strongest agency contrast)*
- Stars: ★★★★★ in `var(--pg-red)`
- Quote (18px, `line-height: 1.4`): *"For four bucks I got a sharper audit than the agency I paid $2,400 for last quarter. Uncomfortable truths."*
- Attribution: `Marco D. · Indie hacker` — JetBrains Mono 11px, `var(--pg-neutral-500)`

**Card 2 — Jonathan B.** *(only hard CR numbers)*
- Stars: ★★★★★
- Stat callout **above** quote: `+$1,933/mo` — Geist 800, 40px, `var(--pg-red)`. `Myloops.net` below in mono 11px
- Quote: *"Conversion rate went from 2.6% to 3.3% within a few weeks. Ranked by impact is the killer feature."*
- Attribution row: `jonathan-b.jpg` (32px circle) + `Jonathan B. · Myloops.net` in mono

**Card 3 — Eric F.**
- Stars: ★★★★★
- Quote: *"Every single tip was extremely useful."*
- Attribution: `Eric F. · Founder, Editaura`

**Verify:** Cards drag smoothly. Hover lifts cards. Marco's card comes first. The dark section contrasts hard against the light section above.

---

# STAGE 6 — Pricing

**What to deliver:** Dark pricing section continuing from Testimonials. Hero audit card with animated price, three pack cards below.

- **Section:** `data-theme="dark"`, `border-top: 1px solid var(--pg-neutral-800)`, `padding: 100px 40px`
- **Eyebrow:** `PRICING · ONE PRICE, ONE THING`
- **H2:** `No subscription. No calls.` *`No plans.`* — "No plans." in Instrument Serif italic

## Hero audit card

```css
.pricing-hero-card {
  max-width: 480px;
  margin: 48px auto 0;
  background: var(--pg-neutral-900);
  border: 2px solid var(--pg-neutral-700);
  border-radius: var(--pg-radius-xl);
  box-shadow: 10px 10px 0 var(--pg-red);
  padding: 48px;
}
```

**Card contents (top to bottom):**

1. Price: `$3.99` — Geist 800, 80px, `var(--pg-red)`, `letter-spacing: -0.04em` — animated via GSAP counter (Stage 9)
2. Label: `Per audit · no subscription` — JetBrains Mono 11px, `var(--pg-neutral-500)`
3. Divider: `1px solid var(--pg-neutral-800)`, `margin: 24px 0`
4. Feature list — each item: `→` in `var(--pg-red)`, text in `var(--pg-neutral-200)`, 14px:
   - Full conversion audit of one page
   - Ranked list of 10–20 issues with predicted lift
   - Exact rewrites for headlines, CTAs, microcopy
   - 10× Chat with GainBot (ask anything about any fix)
   - Sharable HTML + PDF report
   - Results in under 60 seconds
5. `<CTAButton label="Start for free →" theme="red">` — full width
6. Fine print: `Money-back guarantee · Audits never expire · No subscription` — JetBrains Mono 10px, centred, `var(--pg-neutral-600)`

## Pack cards row

`flex`, `gap: 16px`, `margin-top: 48px`

```css
.pack-card {
  flex: 1;
  background: var(--pg-neutral-900);
  border: 1px solid var(--pg-neutral-800);
  border-radius: var(--pg-radius-lg);
  padding: 28px 24px;
  transition: box-shadow 200ms var(--pg-ease-default),
              transform 200ms var(--pg-ease-default);
}
.pack-card:hover { box-shadow: 6px 6px 0 var(--pg-red); transform: translate(-3px, -3px); }
.pack-card--popular { border-color: var(--pg-red); }
```

| Pack | Audits | Price | Per audit | Discount |
|---|---|---|---|---|
| Starter | 5 | $9.99 | $2.00 | 50% off |
| Growth *(POPULAR)* | 20 | $29.99 | $1.50 | 62% off |
| Scale | 50 | $49.99 | $1.00 | 75% off |

POPULAR badge: JetBrains Mono 9px uppercase, background `var(--pg-red)`, colour white, `border-radius: var(--pg-radius-pill)`, `padding: 2px 8px`.

**Verify:** "$3.99" in coral on dark background is the dominant visual. Free-to-start mechanic is clearly communicated. Pack cards hover lifts correctly.

---

# STAGE 7 — FAQ

**What to deliver:** Light accordion section. Narrow reading column. GSAP height animation.

- **Section:** LIGHT, `max-width: 800px`, `margin: 0 auto`, `padding: 100px 40px`
- **Eyebrow:** `FAQ`
- **H2:** `Things you'll want to know.`

## Accordion

One item open at a time. Track open index in React state.

**Item styling:**
- `border-bottom: 2px solid var(--pg-line)`
- Question: Geist 600, 17px, `padding: 20px 0`, `cursor: pointer`
- Expand icon: `+` / `×` in mono, colour `var(--pg-red)`, `float: right`
- **Open item:** `border-left: 3px solid var(--pg-red)`, `padding-left: 16px`
- Answer: Geist 400, 15px, `line-height: 1.6`, colour `var(--pg-body)`, `padding-bottom: 20px`

**Height animation — GSAP, not CSS transition:**

```js
function toggleItem(index) {
  const answer = answerRefs.current[index]
  const isOpen = openIndex === index
  gsap.to(answer, {
    height: isOpen ? 0 : answer.scrollHeight,
    duration: 0.3,
    ease: 'power2.inOut',
    onComplete: () => { if (!isOpen) answer.style.height = 'auto' }
  })
  setOpenIndex(isOpen ? null : index)
}
```

Initialise answers with `height: 0; overflow: hidden`.

## Question order

Get all answers verbatim from `original/index.html`.

1. How much does it cost?
2. How fast is it?
3. Do I need to create an account?
4. What pages should I audit first?
5. What kind of fixes will I get?
6. Does it work for SaaS landing pages?
7. Is my data secure?
8. What if the analysis results aren't helpful?

**Verify:** Accordion opens and closes smoothly with GSAP. Open item gets the red left border. Only one item can be open at a time.

---

# STAGE 8 — Final CTA + Footer

**What to deliver:** The closing dark sections. Minimal but impactful.

## Final CTA

- **Section:** `data-theme="dark"`, `text-align: center`, `padding: 120px 40px`
- **H2 line 1:** `Stop guessing.` — Instrument Serif italic, Geist 800, `clamp(48px, 6vw, 90px)`
- **H2 line 2:** `Paste the URL.` — Geist 800, same size
- **Subline:** `Free to start · $3.99 to unlock · Money-back guarantee` — JetBrains Mono 12px, `var(--pg-neutral-500)`, `margin: 24px 0 40px`
- **URLBar:** `max-width: 640px`, `margin: 0 auto`

```js
// GSAP scroll reveal
gsap.from(h2El, {
  opacity: 0, y: 40, scale: 0.97,
  duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: h2El, start: 'top 80%', once: true }
})
```

## Footer

- **Section:** `data-theme="dark"`, continues from Final CTA, `border-top: 1px solid var(--pg-neutral-800)`, `padding: 60px 40px 40px`

**Badges row:** `flex`, `gap: 16px`, `flex-wrap: wrap`, `justify-content: center`. Badge `height: 32px`.

| Badge | Image | Link |
|---|---|---|
| Nick Launches | `https://nicklaunches.com/badges/featured-dark.svg` | `https://nicklaunches.com/products/pagegains/` |
| Startup Fame | `https://startupfa.me/badges/featured-badge.webp` | `https://startupfa.me/s/pagegains` |
| Launchit | `https://www.launchit.site/badges/launchit-dark.svg` | `https://www.launchit.site/launches/pagegains` |
| Better Launch | `https://www.betterlaunch.co/badge-light.svg` | `https://www.betterlaunch.co` |
| ListBulb | `https://www.listbulb.com/featured-on-listbulb-light.svg` | `https://www.listbulb.com/tools/pagegains` |

**Footer bottom:** `flex`, `justify-content: space-between`, `margin-top: 40px`
- Left: logo (24px height) + `© 2026 PageGains · J2FB SAS` — mono 11px, `var(--pg-neutral-600)`
- Right: `Blog · Free Resources · Legal · Contact` — mono 11px, `gap: 24px`, hover: `var(--pg-neutral-300)`

**Verify:** "Stop guessing." hits hard. URLBar in the dark section looks correct. Badges load from external URLs without issues.

---

# STAGE 9 — Motion Layer

**What to deliver:** Apply GSAP scroll animations across all sections. Wire up the pricing counter, parallax, and marquee velocity. Do not add new elements — motion only.

## Default scroll reveal

Add `className="reveal"` to: all `<Eyebrow>` instances, all `<h2>` elements, lead paragraphs, and the Final CTA button. Then run once in `App.jsx` or a top-level `useEffect` after mount:

```js
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 82%', once: true }
  })
})
```

## Staggered card/grid reveals

Apply to: step cards (How It Works), pack cards (Pricing), FAQ items.

```js
gsap.from(cardEls, {
  opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', stagger: 0.12,
  scrollTrigger: { trigger: containerEl, start: 'top 78%', once: true }
})
```

## Pricing counter — `$0.00` → `$3.99`

Render the price node with its **final** value as static JSX text so non-JS, reduced-motion, and
re-render states always show the correct figure; drive the count-up imperatively via the ref (Q13).
The ref must point to the DOM `<span>`, not a component. Because the JSX text already equals the final
value, a parent re-render won't visually reset it.

```jsx
<span className="pricing-price" ref={priceRef}>$3.99</span>   {/* static final value */}
```

```js
if (prefersReducedMotion) {
  priceRef.current.textContent = '$3.99'          // skip the tween, show final
} else {
  const counter = { val: 0 }
  ScrollTrigger.create({
    trigger: priceRef.current,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        val: 3.99,
        duration: 1.2,
        ease: 'power2.out',
        snap: { val: 0.01 },
        onUpdate: () => { priceRef.current.textContent = '$' + counter.val.toFixed(2) },
      })
    },
  })
}
```

## Hero screenshot parallax

```js
gsap.to(screenshotRef.current, {
  y: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: heroRef.current,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
})
```

## Motion hard rules

- **NEVER `transition-all`** — write each property: `transition: transform 150ms, box-shadow 150ms`
- **Only `transform` and `opacity`** for GPU-accelerated animations
- `will-change: transform` on all GSAP-animated elements
- `backface-visibility: hidden` on all 3D transforms
- All one-shot scroll animations: `once: true`
- **Every section's GSAP runs inside `gsap.context(fn, scopeRef)` and is reverted in the `useEffect`
  cleanup (Q1, StrictMode-safe)** — the raw `gsap.from(...)` / `ScrollTrigger.create(...)` snippets
  below are illustrative; in code each is wrapped:
  ```js
  const scope = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => { /* tweens + ScrollTrigger here */ }, scope)
    return () => ctx.revert()
  }, [])
  ```
- Wrap all GSAP in a `prefers-reduced-motion` check:

```js
const pRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!pRM) {
  // all GSAP ScrollTrigger animations
}
```

**Verify:** Scroll through the full page. Reveals feel snappy, not laggy. Pricing counter fires once. Screenshot parallax is subtle. Marquee speeds up on fast scroll.

---

# STAGE 10 — Polish + Performance

**What to deliver:** Final pass on visual consistency, mobile layout, and performance. No new features.

## Visual polish checklist

- [ ] Typography scale is consistent — no rogue font sizes outside the token system
- [ ] All `<Eyebrow>` components have the same letter-spacing and casing
- [ ] `<HighlightChip>` used on **maximum 1–2 words per section** — remove any extras
- [ ] Hard shadows are consistent — `6px` on buttons/CTAs, `10px` on URLBar, `8–10px` on testimonial cards
- [ ] Dark sections have `border-top` separators from adjacent light sections where needed
- [ ] Marquee text has no orphan words or awkward line breaks
- [ ] All images have `alt` attributes

## Mobile checklist (`< 768px`)

- [ ] Hero stacks to single column, screenshot goes below stats row, rotation removed
- [ ] Nav hides centre links
- [ ] Steps grid stacks to single column
- [ ] Testimonial cards still horizontally scrollable (natural touch scroll on mobile)
- [ ] Pack cards stack to single column
- [ ] URLBar doesn't overflow on small screens — `button` may need shorter text on mobile
- [ ] Font sizes feel right at 390px viewport width — nothing feels too big or too small

## Performance checklist

- [ ] `<link rel="preload">` for `audit-result-screenshot.webp` in `index.html`
- [ ] All images except hero screenshot use `loading="lazy"`
- [ ] Google Fonts URL loads only used weights: Geist 400/700/800, Instrument Serif italic, JetBrains Mono 400
- [ ] `will-change: transform` only on elements that actually animate — remove from static elements
- [ ] `npm run build` completes without errors
- [ ] Built site in `/dist` opens correctly in browser

**Final verify:** Open the built site (`npm run build && npm run preview`). Scroll the full page on both desktop and a mobile viewport. The redesign should feel like a completely different product — heavy, fast, and impossible to scroll past without reading.

---

*Reference: `original/index.html` for all copy · `brand_assets/tokens.css` for all design tokens · `https://pagegains.com/` for the live original*
