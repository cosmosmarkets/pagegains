# PageGains landing page redesign workspace

## Design system (default)

```bash
node serve.mjs
```

| URL | Description |
|-----|-------------|
| **http://localhost:3000/** | Visual design system — colors, type, components |
| **http://localhost:3000/brand_assets/tokens.css** | CSS variables (`--pg-*`) for redesign pages |
| **http://localhost:3000/original/** | Scraped production homepage mirror |

Set `PORT=3456 node serve.mjs` if port 3000 is in use.

### Brand assets

| Path | Description |
|------|-------------|
| `brand_assets/design-system.html` | Live swatches, type specimens, component gallery |
| `brand_assets/tokens.css` | Design tokens (scales, spacing, dark mode) |
| `brand_assets/BRAND.md` | Voice, positioning, visual rules (locked) |

Hero direction: **call out the page** (e.g. “Your pricing page is losing trials right now”). SaaS-first; coral red + crimson urgency.

---

## Original mirror (reference)

The live homepage from [pagegains.com](https://pagegains.com) is archived under `original/` for side-by-side comparison.

### Re-scrape from production

```bash
node scrape-original.mjs
```

Downloads HTML, Next.js CSS chunks, fonts, images, and related static pages into `original/`. Strips Next.js hydration scripts (static snapshot). `original-interactions.js` restores FAQ accordion, pricing pack toggle, mobile nav, and CTA scroll-to-form behavior.

### Contents

| Path | Description |
|------|-------------|
| `original/index.html` | Server-rendered landing page snapshot |
| `original/_next/static/` | CSS, fonts, JS chunks from production |
| `original/*.webp`, `*.png`, `*.jpg` | Brand and screenshot assets |
| `original/manifest.json` | Scrape metadata |

Redesign work should live outside `original/` (e.g. root `index.html` when you start the new design).
