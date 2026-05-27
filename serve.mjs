import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const DESIGN_SYSTEM = path.join(ROOT, 'brand_assets', 'design-system.html');
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.md': 'text/markdown; charset=utf-8',
};

function sendFile(res, filePath, status = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 Not Found: ${path.basename(filePath)}`);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(status, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/') {
      sendFile(res, DESIGN_SYSTEM);
      return;
    }

    let rel = urlPath.replace(/^\//, '');
    if (rel.endsWith('/')) rel += 'index.html';

    const filePath = path.normalize(path.join(ROOT, rel));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    sendFile(res, filePath);
  })
  .listen(PORT, () => {
    console.log(`PageGains design system → http://localhost:${PORT}/`);
    console.log(`Original mirror       → http://localhost:${PORT}/original/`);
    console.log(`Serving root: ${ROOT}`);
  });
