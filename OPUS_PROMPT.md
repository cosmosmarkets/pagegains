# PageGains Homepage Redesign — Implementation Planning Prompt

---

You are about to plan and then build a homepage redesign for **PageGains** (https://pagegains.com), a CRO audit tool. This is a frontend-only commission pitch prototype — no backend, no auth, no API calls.

**Your first job is to plan before you write a single component.** Read the files below, think through the technical decisions and gotchas, produce a pre-flight architecture document, then await confirmation before writing any code.

---

## Read these files first

```
REDESIGN_PLAN.md          — full stage-by-stage implementation plan (your primary brief)
brand_assets/BRAND.md     — locked brand guidelines
brand_assets/tokens.css   — design token system (CSS custom properties)
original/index.html       — the original site, source of truth for all copy and FAQ answers
```

Do not change the design direction, tech stack, or content. Those are locked. Your job is to think through *how* to build what the plan describes.

---

## Tech stack — locked, do not suggest alternatives

- **Vite + React** — single page, no router
- **GSAP + ScrollTrigger** — all scroll animations
- **Lenis.js** — smooth scroll
- **Plain CSS files** — one per component/section, imported in JSX. No CSS Modules, no Tailwind, no styled-components
- **Google Fonts** — Geist, Instrument Serif, JetBrains Mono (loaded via `<link>` in `index.html`)

---

## Technical questions to think through deeply

These are the genuinely tricky decisions that need resolving before implementation starts. Think through each one and make a concrete recommendation.

**1. GSAP cleanup in React StrictMode**
React 18 StrictMode runs effects twice in development. Unclean GSAP animations will double-fire — stuttering, duplicate triggers, memory leaks. What is the correct cleanup pattern? Should `gsap.context()` be used per component, and how should the cleanup integrate with `useEffect`'s return?

**2. Lenis vs the horizontal scroll testimonials container**
Lenis intercepts all wheel and touch events globally. The Testimonials section has a horizontal drag-to-scroll card container. On a trackpad, a two-finger horizontal swipe could conflict with Lenis's vertical interception. How should this be handled? (`data-lenis-prevent`? Stop/start on hover? Something else?)

**3. ScrollTrigger position measurement timing**
ScrollTrigger calculates element positions on mount. If custom fonts haven't loaded yet, line heights and element positions can be measured wrong — causing animations to fire at the wrong scroll depth. How should this be handled? (`document.fonts.ready`? `window.load`? `ScrollTrigger.refresh()`? When exactly should it fire?)

**4. URLBar inside a dark section**
The `URLBar` component uses `border: 2px solid var(--pg-ink)` and `box-shadow: 10px 10px 0 var(--pg-red)`. It appears in both the Hero (light section) and FinalCTA (`data-theme="dark"` section). In a dark section, `var(--pg-ink)` resolves to `var(--pg-neutral-100)` (near-white) per `tokens.css`. The border will flip colour. Is this correct behaviour, or does the URLBar need its own dark-mode CSS override? Think through the implications for each property.

**5. HighlightChip shadow clipping inside a tight H1**
The H1 uses `line-height: 0.88` (very compressed). The `HighlightChip` has `box-shadow: 6px 6px 0 var(--pg-ink)` extending 6px downward. At this line-height, the shadow risks being clipped by the next line of text, or clipped by the H1's own overflow. What CSS is needed to prevent this? Does the H1 need `overflow: visible`? Does the chip need padding?

**6. Rotating H1 — layout stability**
The plan calls for CSS-only rotating text (`pricing page` / `landing page` / `homepage` / `signup flow`) using absolute-positioned spans. At `clamp(52px, 8vw, 110px)`, these words have very different rendered widths at every viewport size. Absolute positioning means the container collapses to zero width unless explicitly sized. How should the container width be handled to prevent layout shift while staying CSS-only? Consider all options (hardcoded min-width, slot machine with overflow hidden, etc.) and pick the most robust.

**7. `rotateX` on the Sample Output screenshot + GSAP transform conflict**
The plan sets `transform: perspective(1200px) rotateX(8deg)` in CSS, then animates `rotateX` to 0 with GSAP's scrub. GSAP rewrites the `transform` property and will clobber the CSS-set `perspective`. How should `perspective` be handled so GSAP's animation doesn't break it? (Wrapper element? `gsap.set()` on mount? `transformPerspective` in GSAP?)

**8. Marquee velocity clamping**
The plan adjusts marquee `animationDuration` based on Lenis scroll velocity: `1 + Math.abs(velocity) * 0.3`. At high velocity (fast scroll), this multiplier can produce extreme values. What are realistic Lenis velocity ranges, and what clamping should be applied to keep the speed effect feeling intentional rather than broken?

**9. Dark mode via `data-theme="dark"` on section elements — CSS cascade implications**
The design uses `data-theme="dark"` on individual `<section>` elements, not on `<html>` or `<body>`. The `tokens.css` `[data-theme="dark"]` selector overrides CSS custom properties for that subtree. Think through: which fixed/absolutely positioned elements (the nav, the grain overlay on `body::after`) live outside this subtree and are unaffected? Do they need their own dark-state handling? Are there any z-index or stacking context issues introduced by section-level theming?

**10. GSAP + Lenis official wiring pattern**
The plan specifies:
```js
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)
```
Is this the current correct pattern for the versions of Lenis and GSAP that will be installed via npm? Are there any known breaking changes or version-specific considerations to flag before installation?

**11. CSS custom property inheritance in component files**
Since each component imports its own CSS file, dark mode overrides need to be written as `[data-theme="dark"] .component-class { }` within that component's CSS file. Which components are used in dark sections and will therefore need dark-mode CSS rules written at build time? Produce a complete list.

**12. The `body::after` grain overlay at `z-index: 9999`**
This overlay sits above everything in the stacking order. `pointer-events: none` means it won't block clicks. But will it visually sit above the FAQ accordion open state, any hover effects, or the nav's scrolled state? Think through whether any interactive UI element could appear visually obscured by it in ways that matter.

**13. Pricing counter and React state**
The GSAP counter animates a DOM node's `textContent` directly (imperatively). In React this is fine but needs care — the ref must point to a real DOM element, not a React component. The `once: true` flag in ScrollTrigger means it fires once. But if the component re-renders (e.g. parent state change), does GSAP lose the reference or re-attach? How should this be written defensively?

---

## What to produce

After thinking through all of the above, produce:

### 1. Technical Architecture Decisions
A short document (can be in this conversation) covering your recommendation for each question above. Be concrete — pick an approach and explain why. Flag anything the plan should be amended to address.

### 2. Amendments to REDESIGN_PLAN.md
List any specific changes worth making to the plan before implementation begins. Keep this list short — only things that would cause real problems if left unaddressed.

### 3. Phase 0 ready-check
Confirm you have everything needed to begin Phase 0 (project scaffold, dependencies, folder structure, `main.jsx` Lenis+GSAP init, `index.html` font loading). State any missing information. If nothing is missing, say so and await instruction to begin.

---

## Constraints — do not revisit these

- Design direction, colour palette, typography, and dark/light section map are locked per `REDESIGN_PLAN.md`
- All copy, testimonials, and statistics must come from `original/index.html` — do not fabricate
- No backend, no API calls, no real form submission
- Build one stage at a time per the plan — do not write ahead of the confirmed current stage
- The audience for this build is the site owner who will see it as a pitch — quality bar is show-stopping
