// Tipoki service worker: the site opens instantly on repeat visits and the built-in quizzes work offline.
// Strategy: same-origin files are served from the cache and refreshed in the background (so a new deploy shows up on the next visit).
// Supabase, analytics and the fonts are never touched.
const CACHE="tipoki-v3";
self.addEventListener("install",e=>{self.skipWaiting()});
// activation: drop every older cache; when this replaces an older version, reload the open tabs once so nobody keeps looking at a stale page
self.addEventListener("activate",e=>{e.waitUntil((async()=>{const ks=await caches.keys(),old=ks.filter(k=>k!==CACHE);await Promise.all(old.map(k=>caches.delete(k)));await self.clients.claim();
  if(old.length){const cs=await self.clients.matchAll({type:"window"});cs.forEach(c=>{try{c.navigate(c.url)}catch(err){}})}})())});
// network first: a new deploy shows up on the very next visit (no stale mix of old and new files); the cache only answers when offline
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin||u.pathname.startsWith("/_vercel/"))return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    try{const res=await fetch(r,{cache:"no-cache"});if(res.ok)c.put(r.mode==="navigate"?new Request(u.origin+"/"):r,res.clone());return res}
    catch(err){return (await c.match(r,{ignoreSearch:r.mode==="navigate"}))||(r.mode==="navigate"?await c.match(u.origin+"/"):null)||Response.error()}}))});
