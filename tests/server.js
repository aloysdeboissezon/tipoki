// Tiny static file server for the tests (the site has no build step).
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
// /api/esade is the real function (api/esade.js); only the "is this token an ESADE account?" question is answered locally, by the token's name
const esade = require("../api/esade").createHandler({ open: false, check: async t => (t.startsWith("e2e-esade") ? "ok" : t.startsWith("e2e-plain") ? "not_esade" : "bad_token") });
const home = require("../api/home");
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".json": "application/json", ".webmanifest": "application/manifest+json", ".mp4": "video/mp4", ".pdf": "application/pdf",
};

http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/api/esade") { esade(req, res); return; }
  if (url.pathname === "/" && url.searchParams.has("lang")) { home(req, res); return; }   // like the vercel.json rewrite
  if (url.pathname.startsWith("/api/")) { res.writeHead(404).end("not found"); return; }   // like Vercel: the folder api/ is code, not files to download
  let p = path.normalize(decodeURIComponent(url.pathname));
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(root, p);
  if (!file.startsWith(root) || file.includes(`${path.sep}.git${path.sep}`)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404).end("not found"); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream", "cache-control": "no-store" });
    res.end(buf);
  });
}).listen(process.env.PORT || 4173);
