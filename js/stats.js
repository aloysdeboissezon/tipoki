// ---------- anonymous play stats (for teachers) ----------
// Each device sends one row at the end of a game: quiz, game, a hashed random id, and which questions it got right.
// No name, no photo. Teachers read the totals at ?stats=<quiz> with the code Aloys gives them.
function statsSid(){let s=lsGet("tpk-sid");if(!s){s=Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)+Date.now().toString(36);lsSet("tpk-sid",s)}return s}
async function statsPlayer(quiz){const txt=statsSid()+":"+quiz;
  try{const h=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(txt));return [...new Uint8Array(h)].slice(0,16).map(b=>b.toString(16).padStart(2,"0")).join("")}
  catch(e){let a=0x811c9dc5,b=0x9747b28c;for(const c of txt){a=Math.imul(a^c.charCodeAt(0),16777619);b=Math.imul(b^c.charCodeAt(0),2246822519)}return "f"+(a>>>0).toString(16).padStart(8,"0")+(b>>>0).toString(16).padStart(8,"0")}}
// Switch in Options ("Anonymous usage stats"): off = nothing is sent at all. Writes made offline wait in the queue of js/offline.js.
function statsOn(){return lsGet("tpk-nostats")!=="1"}
let statsSent=null,startSent=null;
function statsGameId(){return mode==="multi"?code+"-"+G.created:"s"+G.created+"-"+statsSid().slice(0,6)}
// a game that starts: with the finished-game row this tells how many are abandoned halfway
async function recordStart(){
  if(!statsOn()||!sb||!G||!G.deck||!BANK||G.status!=="q")return;
  const game=statsGameId();if(startSent===game)return;startSent=game;
  try{await tpkInsert("play_starts",{quiz:BANK.id,game,player:await statsPlayer(BANK.id),mode:mode==="multi"?"multi":G.review?"review":"solo"})}catch(e){console.warn(e)}
}
async function recordExamStart(ex){
  if(!statsOn()||!sb||!BANK)return;
  ex.sid="x"+ex.startAt+"-"+statsSid().slice(0,6);
  try{await tpkInsert("play_starts",{quiz:BANK.id,game:ex.sid,player:await statsPlayer(BANK.id),mode:"exam"})}catch(e){console.warn(e)}
}
async function recordExam(ex){
  if(!statsOn()||!sb||!BANK)return;
  if(!ex.sid)ex.sid="x"+ex.startAt+"-"+statsSid().slice(0,6);   // exam resumed after a reload
  const qs={};let correct=0;
  ex.deck.forEach((d,i)=>{const ok=ex.res[i]===1;qs[d.t!=null?"t"+d.t:"m"+d.id]=ok?1:0;if(ok)correct++});
  if(!ex.deck.length||ex.res.every(r=>r===-1))return;   // handed in blank: not counted
  try{await tpkInsert("play_stats",{quiz:BANK.id,game:ex.sid,player:await statsPlayer(BANK.id),mode:"exam",n:ex.deck.length,correct,qs})}catch(e){console.warn(e)}
}
async function recordPlay(){
  if(!statsOn()||!(sb||BANK&&BANK.demo)||!G||!G.deck||!BANK)return;
  const game=statsGameId();
  if(statsSent===game)return;
  const mine=(P[me]&&P[me].ans)||{};if(!Object.keys(mine).length)return;   // joined but never answered: not counted
  statsSent=game;
  const qs={};let correct=0;
  G.deck.forEach((d,i)=>{const ok=isRight(mine[i],i);qs[d.t!=null?"t"+d.t:"m"+d.id]=ok?1:0;if(ok)correct++});
  const row={quiz:BANK.id,game,player:await statsPlayer(BANK.id),mode:mode==="multi"?"multi":G.review?"review":"solo",n:G.deck.length,correct,qs};
  // a professor's course also records WHICH wrong option was picked (original option number), for "most chosen wrong answer" on the class dashboard
  if(BANK.course){const w={};G.deck.forEach((d,i)=>{const a=mine[i];if(d.t==null&&a&&a.c!=null&&d.o&&d.o[a.c]!==0&&d.o[a.c]!=null)w["m"+d.id]=d.o[a.c]});row.w=w}
  if(BANK.demo){if(window.QwebboCourse)QwebboCourse.demoAdd("play",row);return}   // demo: kept in this browser, never sent
  try{await tpkInsert("play_stats",row)}catch(e){console.warn(e)}
}

// ---------- stats page ----------
function statsKeyLs(id){return "tpk-statskey-"+id}
const STATS_ALL="all";   // ?stats=all: overview of every quiz (code stored under the quiz name '*')
async function openStats(id,key){
  show("stats");
  $("stTitle").textContent=tl("Loading…");$("stBody").hidden=true;$("stRefresh").hidden=true;$("stGate").hidden=true;$("stErr").hidden=true;$("stPrint").hidden=true;
  if(id===STATS_ALL){$("stTitle").textContent=tl("qwebbo: usage overview");$("stSub").textContent=tl("All quizzes together, anonymous.")}
  else{
    if(!await useBank(id)){$("stTitle").textContent=tl("Quiz not found");return}
    $("stTitle").textContent=BANK.title;$("stSub").textContent=BANK.subject||""}
  statsFor=id;
  key=key||lsGet(statsKeyLs(id));
  if(!key){$("stGate").hidden=false;$("stCode").focus();return}
  await loadStats(id,key);
}
let statsFor=null;
async function loadStats(id,key){
  showErr("stErr","");
  const {data,error}=sb?await (id===STATS_ALL?sb.rpc("site_stats",{p_code:key}):sb.rpc("quiz_stats",{p_quiz:id,p_code:key})):{error:true};
  if(error){$("stGate").hidden=false;showErr("stErr",tl("Can't reach the server, try again."));return}
  if(!data){$("stGate").hidden=false;try{localStorage.removeItem(statsKeyLs(id))}catch(e){}showErr("stErr",tl("Wrong code for this quiz."));return}
  lsSet(statsKeyLs(id),key);$("stGate").hidden=true;renderStats(data,id===STATS_ALL);
}
function pct(a,b){return b?Math.round(100*a/b):0}
function renderStats(s,all){
  $("stBody").hidden=false;$("stRefresh").hidden=false;$("stPrint").hidden=false;
  const tiles=[[tl("Games played"),s.games],["Players",s.players],["Answers",s.answers],[tl("Average score"),s.answers?pct(s.correct,s.answers)+" %":"–"]];
  // drop-off and retention (starts exist only since this feature went live)
  if(s.starts)tiles.push([tl("Games left unfinished"),pct(s.abandoned,s.starts)+" %"]);
  if(s.players)tiles.push([tl("Players who came back"),pct(s.returning,s.players)+" %"]);
  const wk=s.weeks||[];if(wk.length)tiles.push([tl("Active players this week"),wk[wk.length-1][1]]);
  if(s.since)tiles.push([tl("Data since"),new Date(s.since+"T12:00:00").toLocaleDateString(DATELOC,{day:"numeric",month:"short",year:"numeric"})]);
  const tb=$("stTiles");tb.textContent="";
  tiles.forEach(([l,v])=>{const d=el("div","st-tile");d.append(el("b",null,typeof v==="number"?v.toLocaleString(LOCALE):v),el("span",null,l));tb.appendChild(d)});
  const m=s.modes||{},parts=[["multi",tl("multiplayer")],["solo",tl("solo")],["exam",tl("exams")],["review",tl("mistake reviews")]].filter(([k])=>m[k]).map(([k,l])=>m[k]+" "+l);
  $("stModes").hidden=!s.games;$("stModes").textContent=s.games?tl("Games: {list}.",{list:parts.join(" · ")}):tl("No games yet. Stats appear here after the first finished game.");
  // last 30 days, one bar per day
  const days=new Map((s.days||[]).map(x=>[x[0],x])),bars=$("stDays");bars.textContent="";
  const list=[];for(let i=29;i>=0;i--){const d=new Date(Date.now()-i*864e5);list.push(d.toLocaleDateString("en-CA",{timeZone:"Europe/Paris"}))}
  const max=Math.max(1,...list.map(d=>(days.get(d)||[0,0])[1]));
  list.forEach(d=>{const x=days.get(d),g=x?x[1]:0,b=el("div","st-bar"+(g?"":" zero"));b.style.setProperty("--h",(g/max).toFixed(3));
    b.title=new Date(d+"T12:00:00").toLocaleDateString(DATELOC,{day:"numeric",month:"short"})+": "+tl(g===1?"{n} game":"{n} games",{n:g})+(x?", "+tl(x[2]===1?"{n} player":"{n} players",{n:x[2]}):"");bars.appendChild(b)});
  $("stDaysWrap").hidden=!s.games;
  const old=$("stBody").querySelector(".empty");if(old)old.remove();
  if(!s.games)$("stTiles").after(emptyState("M4 20V10M10 20V4M16 20v-8M22 20H2",tl("No games yet"),tl("Share the quiz link with your class: stats show up here after the first finished game.")));
  // weekly active players, last 8 weeks
  const wb=$("stWeeks");wb.textContent="";const wmax=Math.max(1,...wk.map(x=>x[1]));
  wk.forEach(([d,p])=>{const b=el("div","st-bar");b.style.setProperty("--h",(p/wmax).toFixed(3));
    b.title=tl("Week of {d}",{d:new Date(d+"T12:00:00").toLocaleDateString(DATELOC,{day:"numeric",month:"short"})})+": "+tl(p===1?"{n} player":"{n} players",{n:p});wb.appendChild(b)});
  $("stWeeksWrap").hidden=!wk.length;
  // overview: one row per quiz, with a link to its own page (most missed questions need the quiz loaded)
  const qz=$("stQuizzes");qz.textContent="";
  (all?s.quizzes||[]:[]).forEach(([id,g,p,a,c,ret])=>{
    const bk=BUILTIN[id]&&BUILTIN[id](),r=el("div","st-row st-qz"),name=el("a","nm",(bk&&qmeta(Object.assign({id},bk)).title)||id.slice(0,8));
    name.href="?stats="+encodeURIComponent(id);name.title=tl("Open this quiz's stats");
    r.append(name,el("span","muted",tl(g===1?"{n} game":"{n} games",{n:g})+" · "+tl(p===1?"{n} player":"{n} players",{n:p})),el("span","v",pct(c,a)+" %"));qz.appendChild(r)});
  $("stQuizWrap").hidden=!(all&&(s.quizzes||[]).length);
  $("stMissWrap").hidden=true;$("stSessWrap").hidden=true;
  if(all)return;
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
    const head=el("div","label",sLabel(x.q.s)+" · "+(x.typed?tl("Typed answer"):x.q.t||"Question"));
    const rate=el("span","st-rate",tl("{p} % wrong",{p}));rate.title=tl("{w} wrong out of {t}",{w:x.w,t:x.t});head.appendChild(rate);
    r.append(head,el("div",null,x.q.q),el("div","a","→ "+(x.typed?x.q.a[0]:x.q.o[x.q.a])),el("div","muted st-n",tl("{w} / {t} answers wrong",{w:x.w,t:x.t})));mb.appendChild(r)});
  $("stMissWrap").hidden=!worst.length;
}
$("stGo").onclick=()=>{const k=$("stCode").value.trim();if(!k){showErr("stErr",tl("Enter the code."));return}loadStats(statsFor,k)};
$("stCode").addEventListener("keydown",e=>{if(e.key==="Enter")$("stGo").click()});
$("stRefresh").onclick=()=>{const k=lsGet(statsKeyLs(statsFor));if(k)loadStats(statsFor,k)};
$("stPrint").onclick=()=>window.print();
$("stHome").onclick=()=>{try{history.replaceState(null,"",location.pathname)}catch(e){}show("home");renderMyQuizzes()};
(()=>{let p=null;try{p=new URLSearchParams(location.search)}catch(e){return}
  const id=p.get("stats");if(!id||!(id===STATS_ALL||BUILTIN[id]||/^[0-9a-f-]{36}$/i.test(id)))return;
  const k=p.get("k");if(k){lsSet(statsKeyLs(id),k);try{history.replaceState(null,"",location.pathname+"?stats="+encodeURIComponent(id))}catch(e){}}   // keep the code out of the address bar
  openStats(id,k)})();
