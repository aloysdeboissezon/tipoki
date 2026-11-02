// ---------- production error tracking ----------
// Catches JavaScript errors and unhandled promise rejections and sends them, anonymously, to the Supabase table
// public.error_log (see supabase/migrations/add_error_log.sql). No cookie, no third-party service, no player name,
// no query string (game codes stay out). Offline: the report waits in the same queue as the other writes (js/offline.js).
// Read them in the Supabase SQL editor: select * from public.error_summary;
(()=>{
if(/^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname))return;   // not while developing
const VER=(()=>{try{const s=[...document.scripts].find(x=>/js\/app\.js/.test(x.src));return(s&&/[?&]v=([\w-]+)/.exec(s.src)||[])[1]||null}catch(e){return null}})();
const MAX=5,seen=new Set(),WIN=[];let sent=0;
const clean=s=>String(s==null?"":s).replace(/(https?:\/\/[^\s)]*?)[?#][^\s):]*/g,"$1");   // strip query and hash from URLs
const IGNORE=/ResizeObserver loop|^Script error\.?$|chrome-extension:|moz-extension:|safari-extension:|Non-Error promise rejection/i;
function report(kind,msg,src,stack){
  try{
    msg=clean(msg).replace(/\s+/g," ").trim().slice(0,300);if(!msg)return;
    stack=clean(stack||"").slice(0,2000);src=clean(src||"").slice(0,200)||null;
    if(IGNORE.test(msg)||IGNORE.test(stack)||IGNORE.test(src||""))return;
    const key=kind+msg+src;if(seen.has(key)||sent>=MAX)return;   // same error once, and at most 5 per page load
    const now=Date.now();while(WIN.length&&now-WIN[0]>60000)WIN.shift();if(WIN.length>=3)return;   // and at most 3 a minute
    seen.add(key);WIN.push(now);sent++;
    const row={kind,msg,src,stack:stack||null,page:location.pathname.slice(0,120),ver:VER,ua:navigator.userAgent.slice(0,200),late:!navigator.onLine};
    if(typeof window.tpkInsert==="function")window.tpkInsert("error_log",row);
    else{   // offline.js not loaded yet: put it straight in the queue, it goes out on the next flush
      const q=JSON.parse(localStorage.getItem("offq-queue")||"[]");q.push({t:"error_log",r:row});localStorage.setItem("offq-queue",JSON.stringify(q.slice(-100)))}
  }catch(e){}
}
addEventListener("error",e=>{
  if(e.target&&e.target!==window)return;   // failed <img>/<script> loads are not JS errors
  const er=e.error;report("error",e.message||(er&&er.message),e.filename?e.filename.split("/").slice(-2).join("/")+":"+e.lineno+":"+e.colno:null,er&&er.stack)},true);
addEventListener("unhandledrejection",e=>{
  const r=e.reason;report("rejection",(r&&r.message)||String(r),null,r&&r.stack)});
})();
