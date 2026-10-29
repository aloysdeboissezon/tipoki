// Tipoki service worker: the site opens instantly on repeat visits and the built-in quizzes work offline.
// Strategy: same-origin files are served from the cache and refreshed in the background (so a new deploy shows up on the next visit).
// Supabase, analytics and the fonts are never touched.
const CACHE="tipoki-v1";
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin||u.pathname.startsWith("/_vercel/"))return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(r,{ignoreSearch:r.mode==="navigate"});
    const net=fetch(r).then(res=>{if(res.ok)c.put(r.mode==="navigate"?new Request(u.origin+"/"):r,res.clone());return res}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}
    return (await net)||(r.mode==="navigate"?c.match(u.origin+"/"):Response.error())}))});
