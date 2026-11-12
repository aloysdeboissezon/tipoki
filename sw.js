// qwebbo service worker: installable app + offline revision.
// Install: the whole app shell (page, scripts, styles, quiz banks, images, Supabase client, fonts) is stored, so the app opens and the built-in quizzes play with no network.
// Fetch: the page is network first with a short timeout (a new deploy shows up on the next visit; a weak connection falls back to the stored copy).
// Supabase API calls, analytics and the video are never touched (the page queues its own writes, see js/offline.js).
const CACHE="qwebbo-v30",SHELL_PAGE="/",NET_MS=4000;
const CDN=/^https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
self.addEventListener("install",e=>{e.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  try{
    const res=await timeout(fetch(SHELL_PAGE,{cache:"reload"}),15000);await c.put(SHELL_PAGE,res.clone());
    const html=await res.text(),urls=new Set(["/manifest.webmanifest","/favicon.svg","/apple-touch-icon.png","/img/icon-192.png","/img/icon-512.png","/img/logo.svg","/img/logo-dark.svg","/img/mark.svg","/img/esade.png","/about.html","/contact.html","/privacy.html","/terms.html","/legal.html"]);
    // the professor space and its demo also work offline (its own files are read from prof.html, like the shell's)
    try{const pr=await timeout(fetch("/prof.html",{cache:"reload"}),15000);if(pr.ok){await c.put("/prof.html",pr.clone());for(const m of (await pr.text()).matchAll(/(?:src|href)="([^"#]+)"/g)){const u=new URL(m[1],location.origin+"/");if(u.origin===location.origin||CDN.test(u.href))urls.add(u.href)}urls.add("/js/vendor/pdfjs/pdf.min.mjs");urls.add("/js/vendor/pdfjs/pdf.worker.min.mjs")}}catch(err){}
    for(const m of html.matchAll(/(?:src|href|data-lazy)="([^"#]+)"/g)){
      const u=new URL(m[1],location.origin+SHELL_PAGE);
      if(u.origin===location.origin?!u.pathname.startsWith("/_vercel/"):CDN.test(u.href))urls.add(u.href)}
    // one failed file must not block the install: store what we can
    await Promise.all([...urls].map(async u=>{try{const r=await timeout(fetch(u,{cache:"reload"}),15000);if(r.ok)await c.put(u,r)}catch(err){}}));
    // the Google Fonts stylesheet points to font files: store those too
    for(const u of urls)if(u.startsWith("https://fonts.googleapis.com/")){
      try{const css=await (await c.match(u)).text();
        await Promise.all([...css.matchAll(/url\((https:[^)]+)\)/g)].map(async m=>{try{const r=await fetch(m[1]);if(r.ok)await c.put(m[1],r)}catch(err){}}))}catch(err){}}
  }catch(err){}
  self.skipWaiting()})())});
// activation: drop every older cache; when this replaces an older version, reload the open tabs once so nobody keeps looking at a stale page
self.addEventListener("activate",e=>{e.waitUntil((async()=>{const ks=await caches.keys(),old=ks.filter(k=>k!==CACHE);await Promise.all(old.map(k=>caches.delete(k)));await self.clients.claim();
  if(old.length){const cs=await self.clients.matchAll({type:"window"});cs.forEach(c=>{try{c.navigate(c.url)}catch(err){}})}})())});
function timeout(p,ms){return Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error("slow")),ms))])}
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET")return;
  if(u.origin===location.origin&&u.pathname.startsWith("/api/"))return;   // ESADE quizzes (api/esade.js): never stored, the server decides each time
  const same=u.origin===location.origin;
  if(same?u.pathname.startsWith("/_vercel/"):!CDN.test(u.href))return;
  e.respondWith((async()=>{
    const c=await caches.open(CACHE),nav=r.mode==="navigate",shell=nav&&(u.pathname==="/"||u.pathname==="/index.html");   // only the app page is the offline shell; about/privacy/... keep their own copy
    // fonts and library files never change under the same URL: stored copy first
    if(!same){const hit=await c.match(r);if(hit)return hit;
      try{const res=await fetch(r);if(res.ok||res.type==="opaque")c.put(r,res.clone());return res}catch(err){return Response.error()}}
    // files named with ?v=<release> (scripts, styles, quizzes) only change when the page links a new ?v=, so the stored copy is served at once and refreshed in the background: no round trip on a slow connection
    if(!nav&&u.searchParams.has("v")){const hit=await c.match(r);if(hit){e.waitUntil(fetch(r,{cache:"no-cache"}).then(res=>{if(res.ok)return c.put(r,res)}).catch(()=>{}));return hit}}
    try{const res=await timeout(fetch(r,{cache:"no-cache"}),nav?NET_MS:NET_MS*2);if(res.ok)c.put(shell?new Request(u.origin+SHELL_PAGE):r,res.clone());return res}
    catch(err){return (await c.match(r,{ignoreSearch:nav}))||(shell?await c.match(SHELL_PAGE):null)||Response.error()}})())});
