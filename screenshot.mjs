// Screenshot helper for the PageGains redesign.
//
// Puppeteer is intentionally installed OUTSIDE this repo (in a sibling tools
// dir) so it never bloats the Vercel build with a Chromium download. This script
// resolves it from there via createRequire. Override the location with the
// PUPPETEER_DIR env var if your tools dir differs.
//
// Usage:
//   node screenshot.mjs <url> [label]
// Examples:
//   node screenshot.mjs http://localhost:5173
//   node screenshot.mjs http://localhost:5173 nav-scrolled
//
// Saves to ./temporary screenshots/screenshot-N[-label].png (auto-incremented).

import { createRequire } from 'node:module'
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

const TOOLS_DIR =
  process.env.PUPPETEER_DIR || 'C:/Users/cubit/pagegains-tools'

function loadPuppeteer() {
  for (const candidate of ['puppeteer', join(TOOLS_DIR, 'node_modules', 'puppeteer')]) {
    try {
      return require(candidate)
    } catch {
      /* try next */
    }
  }
  throw new Error(
    `Could not resolve puppeteer. Install it with:\n  cd "${TOOLS_DIR}" && npm install puppeteer\nor set PUPPETEER_DIR to its location.`,
  )
}

const url = process.argv[2] || 'http://localhost:5173'
const label = process.argv[3] ? `-${process.argv[3]}` : ''

const outDir = join(__dirname, 'temporary screenshots')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

// Auto-increment so screenshots are never overwritten.
const existing = readdirSync(outDir).filter((f) => /^screenshot-\d+/.test(f))
const next =
  existing.reduce((max, f) => {
    const n = parseInt(f.match(/^screenshot-(\d+)/)[1], 10)
    return n > max ? n : max
  }, 0) + 1
const outPath = join(outDir, `screenshot-${next}${label}.png`)

const puppeteer = loadPuppeteer()

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  // Let webfonts settle so type renders correctly in the capture.
  await page.evaluate(() => document.fonts && document.fonts.ready)
  await page.screenshot({ path: outPath, fullPage: true })
  console.log(`Saved ${outPath}`)
} finally {
  await browser.close()
}
