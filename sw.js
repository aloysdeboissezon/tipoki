// Tipoki service worker: installable app + offline revision.
// Install: the whole app shell (page, scripts, styles, quiz banks, images, Supabase client, fonts) is stored, so the app opens and the built-in quizzes play with no network.
// Fetch: network first with a short timeout (a new deploy shows up on the next visit; a weak connection falls back to the stored copy).
// Supabase API calls, analytics and the video are never touched (the page queues its own writes, see js/offline.js).
const CACHE="tipoki-v8",SHELL_PAGE="/",NET_MS=4000;
const CDN=/^https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
self.addEventListener("install",e=>{e.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  try{
    const res=await timeout(fetch(SHELL_PAGE,{cache:"reload"}),15000);await c.put(SHELL_PAGE,res.clone());
    const html=await res.text(),urls=new Set(["/manifest.webmanifest","/favicon.svg","/apple-touch-icon.png","/img/icon-192.png","/img/icon-512.png","/img/logo.svg","/img/logo-dark.svg","/img/mark.svg"]);
    for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
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
  const same=u.origin===location.origin;
  if(same?u.pathname.startsWith("/_vercel/"):!CDN.test(u.href))return;
  e.respondWith((async()=>{
    const c=await caches.open(CACHE),nav=r.mode==="navigate";
    // fonts and library files never change under the same URL: stored copy first
    if(!same){const hit=await c.match(r);if(hit)return hit;
      try{const res=await fetch(r);if(res.ok||res.type==="opaque")c.put(r,res.clone());return res}catch(err){return Response.error()}}
    try{const res=await timeout(fetch(r,{cache:"no-cache"}),nav?NET_MS:NET_MS*2);if(res.ok)c.put(nav?new Request(u.origin+SHELL_PAGE):r,res.clone());return res}
    catch(err){return (await c.match(r,{ignoreSearch:nav}))||(nav?await c.match(SHELL_PAGE):null)||Response.error()}})())});
