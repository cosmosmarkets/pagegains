# PageGains — Brand Identity (locked)

**Status:** Approved · **Last updated:** 2026-05-26  
**Use with:** `brand_assets/tokens.css` for all redesign and product marketing surfaces.

---

## North star

**PageGains** is the brand. **GainBot** is the AI inside the product — name it in copy and UI, never as the public face (no mascot-led hero, no GainBot-first logo lockup).

| | |
|---|---|
| **Category** | Fast, blunt, useful CRO for SaaS — not SEO, not analytics, not a full agency replacement |
| **Feel** | Editorial newspaper × audit terminal × product demo |
| **Direction** | **Evolve (A)** current editorial system + **product-led (C)** URL bar and real report output |
| **Not** | Premium enterprise SaaS, soft luxury, vague “optimize your funnel” fluff |

---

## Primary customer

**SaaS first:** founders, marketers, and builders optimizing landing pages, pricing pages, feature pages, and signup flows.

**E-commerce:** Supported and mentioned in proof, FAQ, or a single secondary line — not co-equal in the hero or main headline hierarchy.

---

## Positioning

### Hero territory (locked — Direction 1)

**Call out the page, not the user.** Name the wound on *their* URL type.

**Primary H1 pattern:**

> Your **[pricing page / landing page / signup flow]** is losing **[trials / signups / conversions]** right now.

**Examples:**

- “Your pricing page is losing trials right now.”
- “Your landing page is bleeding signups.”
- “Your homepage is costing you demos today.”

**Supporting lines (rotate, don’t stack all at once):**

- Speed/value: “Agency-grade audit in ~60 seconds. $3.99.”
- Anti-fluff: “10–20 ranked fixes. Not a deck of maybes.”

### Message hierarchy (landing page)

1. **Who** — SaaS pages that should convert  
2. **What** — Paste URL → ranked issues + exact fixes in ~60s  
3. **Proof** — Real report screenshot, SaaS testimonial, speed stat  
4. **Price** — $3.99, no subscription (one sharp line)  
5. **Also** — E-commerce / Shopify (footer, FAQ, or one proof row)

### Competitive frame

Contrast with agencies and consultants on **price and speed**, not on sounding enterprise:

- Agencies: $3k–$10k/mo, weeks  
- PageGains: ~60s, from $3.99 per audit, no subscription  

---

## GainBot naming

| Do | Don’t |
|----|--------|
| “GainBot scans your page” | GainBot as logo or H1 |
| “Chat with GainBot about your report” | Cartoon mascot in hero |
| “Powered by GainBot” as subline (optional) | “GainBot.com” energy |

---

## Voice & tone

**Personality:** Senior CRO reviewer who’s impatient with weak pages — direct, useful, fast. **More aggressive than the current site**, with hard clarity rules.

### Do

- Short sentences. Numbers. Second person: “your page,” “your CTA.”
- Name specific failures: vague headline, missing proof, pricing friction
- Imperatives: “Paste the URL.” “Fix this first.”
- SaaS examples in every major block
- Contrast with expensive, slow alternatives

### Don’t

- Hedge: “might,” “could potentially,” “consider exploring”
- Corporate filler: leverage, holistic, solutions, synergy
- SEO or analytics positioning
- Talk down to the reader — attack the **page** and **industry**, not the person
- 50/50 SaaS + e-commerce in hero copy

### Clarity guardrails

- One idea per sentence above the fold  
- Every bold claim → concrete next step (paste URL, see score, unlock report)  
- Explain acronyms inline once if used (“CRO — conversion fixes, not SEO”)  
- Aggression targets the **page** and **lazy defaults**, not the user  

### Tone ceiling

Push harder than today on urgency and honesty. Stay scannable in under 3 seconds. If a line needs a second read to understand the offer, rewrite it.

---

## Visual identity

### Concept

**Editorial evolve + product ritual.** Warm paper, black ink, mono “instrument” labels, serif accent sparingly, hard shadows, skewed red highlight chips. Hero = URL command bar + real audit screenshot early.

### Color

| Token | Role |
|--------|------|
| **Coral red** (`--pg-red`) | Brand primary — CTAs, skew highlights, stars, logo accent |
| **Crimson** (`--pg-crimson`) | Urgency only — live indicators, critical labels, loss semantics |
| **Paper** | Page background, light cards |
| **Ink** | Body text, dark UI blocks (e.g. pricing) |
| **Line / mute** | Borders, captions, meta |

**Rule:** One coral for brand moments; crimson for warning/urgency so the palette stays sharp, not muddy. Keep saturation high — no dusty pastel coral.

### Typography

| Role | Family | Use |
|------|--------|-----|
| Display | Geist (700–800) | Headlines, large pricing figures |
| Accent | Instrument Serif *italic* | 3–6 emphasized words per section max |
| UI / meta | JetBrains Mono | Eyebrows, stats, form chrome, section labels |

Load via Google Fonts or self-hosted woff2 in production. See `tokens.css` for stacks.

### Signature elements (keep, refine)

- Skewed red highlight on 1–2 words per major headline (`transform: skew(-4deg)` + hard shadow)
- Hard offset shadows on primary CTAs (`6px 6px 0` accent)
- Mono uppercase eyebrows with letter-spacing (`0.12em–0.14em`)
- 2px grid gaps on step cards (line color as grid background)

### Product-led (lean in)

- URL / command bar as visual hero  
- Real report screenshot above the fold or immediately below hero  
- Live stats: median time, issues per page, audits run  
- Snappy motion — `transform` and `opacity` only; no `transition-all`

### Avoid

- Glassmorphism, purple gradients, generic illustration packs  
- Premium “luxury SaaS” whitespace and soft-only shadows  
- Skew/highlight on every line (dilutes signature)

---

## Logo & marks

- **Wordmark:** PageGains — header, OG, footer, email  
- **GainBot icon:** App, report UI, optional footer — not in primary lockup  
- **Favicon / OG:** PageGains mark; align with coral red + ink when OG is redesigned  

---

## Layout tokens (defaults)

| Token | Value | Notes |
|--------|--------|--------|
| Max content width | `1400px` | Hero, sections |
| Section padding | `100px 40px` desktop · `60px 20px` mobile | Adjust per section |
| Radius | `10px` inputs · `12–18px` cards/sections | |
| Display tracking | `-0.045em` hero · `-0.035em` h2 | |

Full values in `tokens.css`.

---

## Checklist (approved)

- [x] Primary customer: **SaaS**  
- [x] Brand face: **PageGains**; GainBot = feature name  
- [x] Visual: **Editorial evolve (A) + product hero (C)**  
- [x] Tone: **More aggressive than today**, clarity guardrails above  
- [x] Color: **Coral-leaning primary red** + **crimson** for urgency  
- [x] Not premium; **speed + report output** sell the product  
- [x] Hero: **Direction 1** — call out the page (“Your pricing page is losing trials”)  

---

## Reference

- Production mirror (pre-redesign): `original/index.html`  
- Design tokens: `brand_assets/tokens.css`  
- Redesign work lives outside `original/` (e.g. root `index.html`)
