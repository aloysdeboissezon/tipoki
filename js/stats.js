// ---------- anonymous play stats (for teachers) ----------
// Each device sends one row at the end of a game: quiz, game, a hashed random id, and which questions it got right.
// No name, no photo. Teachers read the totals at ?stats=<quiz> with the code Aloys gives them.
function statsSid(){let s=lsGet("tpk-sid");if(!s){s=Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)+Date.now().toString(36);lsSet("tpk-sid",s)}return s}
async function statsPlayer(quiz){const txt=statsSid()+":"+quiz;
  try{const h=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(txt));return [...new Uint8Array(h)].slice(0,16).map(b=>b.toString(16).padStart(2,"0")).join("")}
  catch(e){let a=0x811c9dc5,b=0x9747b28c;for(const c of txt){a=Math.imul(a^c.charCodeAt(0),16777619);b=Math.imul(b^c.charCodeAt(0),2246822519)}return "f"+(a>>>0).toString(16).padStart(8,"0")+(b>>>0).toString(16).padStart(8,"0")}}
let statsSent=null;
async function recordPlay(){
  if(!sb||!G||!G.deck||!BANK)return;
  const game=mode==="multi"?code+"-"+G.created:"s"+G.created+"-"+statsSid().slice(0,6);
  if(statsSent===game)return;
  const mine=(P[me]&&P[me].ans)||{};if(!Object.keys(mine).length)return;   // joined but never answered: not counted
  statsSent=game;
  const qs={};let correct=0;
  G.deck.forEach((d,i)=>{const ok=isRight(mine[i],i);qs[d.t!=null?"t"+d.t:"m"+d.id]=ok?1:0;if(ok)correct++});
  const row={quiz:BANK.id,game,player:await statsPlayer(BANK.id),mode:mode==="multi"?"multi":G.review?"review":"solo",n:G.deck.length,correct,qs};
  try{const {error}=await sb.from("play_stats").insert(row);if(error)console.warn(error)}catch(e){console.warn(e)}
}

// ---------- stats page ----------
function statsKeyLs(id){return "tpk-statskey-"+id}
async function openStats(id,key){
  show("stats");
  $("stTitle").textContent="Loading…";$("stBody").hidden=true;$("stRefresh").hidden=true;$("stGate").hidden=true;$("stErr").hidden=true;
  if(!await useBank(id)){$("stTitle").textContent="Quiz not found";return}
  $("stTitle").textContent=BANK.title;$("stSub").textContent=BANK.subject||"";
  key=key||lsGet(statsKeyLs(id));
  if(!key){$("stGate").hidden=false;$("stCode").focus();return}
  await loadStats(id,key);
}
async function loadStats(id,key){
  showErr("stErr","");
  const {data,error}=sb?await sb.rpc("quiz_stats",{p_quiz:id,p_code:key}):{error:true};
  if(error){$("stGate").hidden=false;showErr("stErr","Can't reach the server, try again.");return}
  if(!data){$("stGate").hidden=false;try{localStorage.removeItem(statsKeyLs(id))}catch(e){}showErr("stErr","Wrong code for this quiz.");return}
  lsSet(statsKeyLs(id),key);$("stGate").hidden=true;renderStats(data);
}
function pct(a,b){return b?Math.round(100*a/b):0}
function renderStats(s){
  $("stBody").hidden=false;$("stRefresh").hidden=false;
  const tiles=[["Games played",s.games],["Players",s.players],["Answers",s.answers],["Average score",s.answers?pct(s.correct,s.answers)+" %":"–"]];
  const tb=$("stTiles");tb.textContent="";
  tiles.forEach(([l,v])=>{const d=el("div","st-tile");d.append(el("b",null,typeof v==="number"?v.toLocaleString("en-US"):v),el("span",null,l));tb.appendChild(d)});
  const m=s.modes||{},parts=[["multi","multiplayer"],["solo","solo"],["review","mistake reviews"]].filter(([k])=>m[k]).map(([k,l])=>m[k]+" "+l);
  $("stModes").textContent=s.games?"Games: "+parts.join(" · ")+".":"No games yet. Stats appear here after the first finished game.";
  // last 30 days, one bar per day
  const days=new Map((s.days||[]).map(x=>[x[0],x])),bars=$("stDays");bars.textContent="";
  const list=[];for(let i=29;i>=0;i--){const d=new Date(Date.now()-i*864e5);list.push(d.toLocaleDateString("en-CA",{timeZone:"Europe/Paris"}))}
  const max=Math.max(1,...list.map(d=>(days.get(d)||[0,0])[1]));
  list.forEach(d=>{const x=days.get(d),g=x?x[1]:0,b=el("div","st-bar"+(g?"":" zero"));b.style.setProperty("--h",(g/max).toFixed(3));
    b.title=new Date(d+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short"})+": "+g+" game"+(g===1?"":"s")+(x?", "+x[2]+" player"+(x[2]===1?"":"s"):"");bars.appendChild(b)});
  $("stDaysWrap").hidden=!s.games;
  // questions: resolve keys with the quiz loaded on this page
  const qs=(s.qs||[]).map(([k,t,w])=>({q:k[0]==="t"?TQ[+k.slice(1)]:Q[+k.slice(1)],typed:k[0]==="t",t,w})).filter(x=>x.q);
  const bys={};qs.forEach(x=>{const b=bys[x.q.s]=bys[x.q.s]||[0,0];b[0]+=x.t-x.w;b[1]+=x.t});
  const sbox=$("stSess");sbox.textContent="";
  Object.keys(bys).sort((a,b)=>a-b).forEach(k=>{const [ok,t]=bys[k],p=pct(ok,t),r=el("div","st-row");
    const name=el("span","nm",sLabel(k)+(SESS[k]&&SESS[k]!==sLabel(k)?" · "+SESS[k]:""));name.title=SESS[k]||"";
    const bar=el("span","st-meter");bar.style.setProperty("--p",p/100);
    r.append(name,bar,el("span","v",p+" %"));sbox.appendChild(r)});
  $("stSessWrap").hidden=!Object.keys(bys).length;
  // most missed: enough answers to mean something, worst rate first
  const minT=s.rows>=10?3:1;
  const worst=qs.filter(x=>x.t>=minT&&x.w>0).sort((a,b)=>b.w/b.t-a.w/a.t||b.t-a.t).slice(0,10);
  const mb=$("stMiss");mb.textContent="";
  worst.forEach(x=>{const r=el("div","st-q"),p=pct(x.w,x.t);
    const head=el("div","label",sLabel(x.q.s)+" · "+(x.typed?"Typed answer":x.q.t||"Question"));
    const rate=el("span","st-rate",p+" % wrong");rate.title=x.w+" wrong out of "+x.t;head.appendChild(rate);
    r.append(head,el("div",null,x.q.q),el("div","a","→ "+(x.typed?x.q.a[0]:x.q.o[x.q.a])),el("div","muted st-n",x.w+" / "+x.t+" answers wrong"));mb.appendChild(r)});
  $("stMissWrap").hidden=!worst.length;
}
$("stGo").onclick=()=>{const k=$("stCode").value.trim();if(!k){showErr("stErr","Enter the code.");return}loadStats(BANK.id,k)};
$("stCode").addEventListener("keydown",e=>{if(e.key==="Enter")$("stGo").click()});
$("stRefresh").onclick=()=>{const k=lsGet(statsKeyLs(BANK.id));if(k)loadStats(BANK.id,k)};
$("stHome").onclick=()=>{try{history.replaceState(null,"",location.pathname)}catch(e){}show("home");renderMyQuizzes()};
(()=>{let p=null;try{p=new URLSearchParams(location.search)}catch(e){return}
  const id=p.get("stats");if(!id||!(BUILTIN[id]||/^[0-9a-f-]{36}$/i.test(id)))return;
  const k=p.get("k");if(k){lsSet(statsKeyLs(id),k);try{history.replaceState(null,"",location.pathname+"?stats="+encodeURIComponent(id))}catch(e){}}   // keep the code out of the address bar
  openStats(id,k)})();
