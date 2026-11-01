// ---------- offline mode ----------
// The service worker (sw.js) keeps the app itself; this file covers the data around it:
//  - a small banner while there's no network (revising keeps working: built-in quizzes and quizzes opened before),
//  - quizzes opened from the cloud are copied on the device, so they open offline too,
//  - writes made offline (play stats, question reports) wait in a queue and go out when the network is back,
//  - progress sync (js/sync.js) is triggered here too the moment the connection returns.
// The queue and quiz copies use "offq-" / Cache Storage, which the online progress save ignores.
(()=>{
const QK="offq-queue",DATA="tipoki-data-v1";
function lget(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lset(k,v){try{localStorage.setItem(k,v)}catch(e){}}

// ----- banner -----
const bar=document.createElement("div");bar.className="off-bar";bar.id="offBar";bar.hidden=true;bar.setAttribute("role","status");
function paint(){
  const n=queue().length;
  bar.textContent=tl("You're offline. You can still revise; your progress syncs when you're back.")+(n?" · "+tl("{n} waiting to send",{n}):"");
  bar.hidden=navigator.onLine;document.body.classList.toggle("is-offline",!navigator.onLine)}
document.body.appendChild(bar);

// ----- queue of writes -----
function queue(){try{return JSON.parse(lget(QK)||"[]")}catch(e){return[]}}
function save(q){lset(QK,JSON.stringify(q.slice(-100)))}
const netErr=e=>!navigator.onLine||/fetch|network|load failed|timeout/i.test((e&&(e.message||e.details))||String(e||""));
let flushing=false;
async function flush(){
  if(flushing||!navigator.onLine||typeof sb==="undefined"||!sb)return;
  flushing=true;
  try{
    let q=queue();
    while(q.length){
      const it=q[0];let err=null;
      try{({error:err}=await sb.from(it.t).insert(it.r))}catch(e){err=e}
      if(err&&netErr(err))break;   // still no network: keep the rest for later
      q=queue().slice(1);save(q)}   // sent, or refused for good (a duplicate): drop it
  }finally{flushing=false;paint()}}
// insert now, or queue it when the network is down
window.tpkInsert=async function(table,row){
  if(typeof sb==="undefined"||!sb)return;
  let err=null;
  if(navigator.onLine){try{({error:err}=await sb.from(table).insert(row))}catch(e){err=e}}
  else err={message:"offline"};
  if(err&&netErr(err)){const q=queue();q.push({t:table,r:row});save(q);paint()}
  else if(err)console.warn(err)};

// ----- quizzes from the cloud, copied on the device -----
async function cache(){try{return await caches.open(DATA)}catch(e){return null}}
window.tpkSaveData=async function(key,obj){const c=await cache();if(!c)return;
  try{await c.put("/__data/"+encodeURIComponent(key),new Response(JSON.stringify(obj),{headers:{"content-type":"application/json"}}))}catch(e){}};
window.tpkLoadData=async function(key){const c=await cache();if(!c)return null;
  try{const r=await c.match("/__data/"+encodeURIComponent(key));return r?await r.json():null}catch(e){return null}};

// ----- back online -----
function back(){paint();flush()}
addEventListener("online",back);addEventListener("offline",paint);
paint();addEventListener("load",flush);
})();
