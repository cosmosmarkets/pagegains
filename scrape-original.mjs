/**
 * Mirrors https://pagegains.com landing page for offline local use.
 * Downloads HTML, CSS, JS, fonts, images; rewrites URLs to relative paths.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'original');
const BASE = 'https://pagegains.com';
const ORIGIN = new URL(BASE);

const downloaded = new Set();
const queue = [];

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function localPathFromUrl(urlStr) {
  const u = new URL(urlStr, BASE);
  if (u.origin !== ORIGIN.origin) return null;
  let p = decodeURIComponent(u.pathname);
  if (p.endsWith('/')) p += 'index.html';
  return path.join(OUT, p.replace(/^\//, '').split('/').join(path.sep));
}

function enqueue(urlStr) {
  const u = new URL(urlStr, BASE);
  if (u.origin !== ORIGIN.origin) return;
  const key = u.pathname + (u.search || '');
  if (downloaded.has(key)) return;
  downloaded.add(key);
  queue.push(u.href);
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'PageGains-Archive/1.0 (local redesign reference)',
      Accept: '*/*',
    },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function extractUrls(html) {
  const urls = new Set();
  const patterns = [
    /(?:href|src)=["']([^"']+)["']/gi,
    /(?:href|src)=([^\s>]+)/gi,
    /imageSrcSet=["']([^"']+)["']/gi,
    /url\((['"]?)([^'")]+)\1\)/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html)) !== null) {
      const raw = m[2] ?? m[1];
      if (!raw || raw.startsWith('data:') || raw.startsWith('#')) continue;
      urls.add(raw.trim());
    }
  }
  // srcSet: "url 1x, url 2x"
  for (const block of html.matchAll(/srcSet=["']([^"']+)["']/gi)) {
    for (const part of block[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (u) urls.add(u);
    }
  }
  return [...urls];
}

function rewriteHtml(html) {
  let out = html;
  // Absolute same-origin → relative
  out = out.replaceAll(BASE, '');
  out = out.replaceAll('https://pagegains.com', '');
  // Strip Next.js RSC/hydration payloads (not needed for static archive)
  out = out.replace(/<script>\s*self\.__next_f[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<script src="\/_next\/static\/chunks\/[^"]+\.js"[^>]*><\/script>/gi, '');
  out = out.replace(/<link rel="preload" as="script"[^>]*>/gi, '');
  out = out.replace(/<script[^>]*id="_R_"[^>]*><\/script>/gi, '');
  // Remove GA
  out = out.replace(/<link rel="preload" href="https:\/\/www\.googletagmanager\.com[^>]*>/gi, '');
  out = out.replace(/<script[^>]*googletagmanager[^>]*><\/script>/gi, '');
  // Fix _next/image to direct assets where we have originals
  const imageMap = {
    '%2Fpagegains-logo-new.png': '/pagegains-logo-new.png',
    '%2Faudit-result-screenshot.webp': '/audit-result-screenshot.webp',
    '%2Fjonathan-b.jpg': '/jonathan-b.jpg',
  };
  for (const [enc, local] of Object.entries(imageMap)) {
    const re = new RegExp(
      `/_next/image\\?url=${enc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"']*`,
      'gi'
    );
    out = out.replace(re, local);
  }
  return out;
}

function rewriteCss(css, cssFile) {
  const dir = path.dirname(cssFile);
  return css.replace(/url\((['"]?)([^'")]+)\1\)/g, (_, quote, raw) => {
    if (raw.startsWith('data:')) return `url(${quote}${raw}${quote})`;
    try {
      const abs = new URL(raw, `https://pagegains.com/${path.relative(OUT, dir).replace(/\\/g, '/')}/`);
      if (abs.origin !== ORIGIN.origin) return `url(${quote}${raw}${quote})`;
      const rel = path.relative(dir, localPathFromUrl(abs.href)).replace(/\\/g, '/');
      return `url(${quote}${rel}${quote})`;
    } catch {
      return `url(${quote}${raw}${quote})`;
    }
  });
}

async function processQueue() {
  while (queue.length) {
    const url = queue.shift();
    let local;
    try {
      local = localPathFromUrl(url);
    } catch {
      continue;
    }
    if (!local) continue;
    if (fs.existsSync(local)) continue;

    console.log('GET', url);
    try {
      const buf = await fetchBuffer(url);
      ensureDir(local);
      fs.writeFileSync(local, buf);

      const ext = path.extname(local).toLowerCase();
      if (ext === '.html' || ext === '') {
        let html = buf.toString('utf8');
        for (const u of extractUrls(html)) enqueue(u);
        html = rewriteHtml(html);
        fs.writeFileSync(local, html, 'utf8');
      } else if (ext === '.css') {
        let css = buf.toString('utf8');
        for (const u of extractUrls(css)) enqueue(u);
        css = rewriteCss(css, local);
        fs.writeFileSync(local, css, 'utf8');
      } else if (ext === '.js') {
        const js = buf.toString('utf8');
        for (const u of extractUrls(js)) enqueue(u);
      }
    } catch (e) {
      console.warn('SKIP', url, e.message);
    }
  }
}

// Known static assets (bypass _next/image)
const STATIC_ASSETS = [
  '/pagegains-logo-new.png',
  '/pagegains-logo.png',
  '/audit-result-screenshot.webp',
  '/jonathan-b.jpg',
  '/favicon.png',
  '/favicon.ico',
  '/og-image-2.png',
  '/gainbot-icon.png',
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  enqueue(BASE + '/');
  for (const p of STATIC_ASSETS) enqueue(BASE + p);

  await processQueue();

  // Ensure index at root of original
  const idx = path.join(OUT, 'index.html');
  if (!fs.existsSync(idx)) {
    const alt = path.join(OUT, 'index.html');
    if (!fs.existsSync(alt)) {
      console.error('No index.html produced');
      process.exit(1);
    }
  }

  // Wire static interactions (FAQ, packs, mobile nav)
  const interactionsSrc = path.join(__dirname, 'original-interactions.mjs');
  const interactionsOut = path.join(OUT, 'original-interactions.js');
  if (fs.existsSync(interactionsSrc)) {
    const js = fs.readFileSync(interactionsSrc, 'utf8').replace(/^\/\*[\s\S]*?\*\/\s*/, '');
    fs.writeFileSync(interactionsOut, js);
  }
  const idx = path.join(OUT, 'index.html');
  if (fs.existsSync(idx)) {
    let html = fs.readFileSync(idx, 'utf8');
    html = html.replace(/<script>\s*\(self\.__next_f[\s\S]*?<\/script>/gi, '');
    if (!html.includes('original-interactions.js')) {
      html = html.replace(
        '</body>',
        '<script src="/original-interactions.js" defer></script></body>'
      );
    }
    fs.writeFileSync(idx, html, 'utf8');
  }

  const manifest = {
    scrapedAt: new Date().toISOString(),
    source: BASE,
    files: downloaded.size,
  };
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Done.', manifest.files, 'URLs processed →', OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
