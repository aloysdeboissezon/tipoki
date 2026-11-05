// ---------- engine: writes ----------
// network state: a thin banner shows while writes or polls fail; writes are retried a few times before giving up
let netBad=false;
function setNet(bad){if(bad===netBad)return;netBad=bad;let b=$("netBar");if(!b&&bad){b=el("div","netbar");b.id="netBar";b.setAttribute("role","status");b.textContent=tl("Reconnecting…");document.body.appendChild(b)}if(b)b.hidden=!bad}
window.addEventListener("online",()=>{if(mode==="multi")poll()});
async function withRetry(fn){for(let i=0;;i++){try{const r=await fn();setNet(false);return r}catch(err){setNet(true);if(i>=3)throw err;await new Promise(r=>setTimeout(r,800*(i+1)))}}}
function queue(fn){writeChain=writeChain.then(()=>withRetry(fn)).catch(err=>{console.warn(err);toast(tl("Connection problem, try again"))});return writeChain}
function writeGame(patch){
  const ng={...G,...patch,seq:(G.seq||0)+1};
  if(patch.status&&!("pz" in patch))ng.pz=0;
  if(patch.status==="q")ng.qAt=Date.now();   // lets someone who joins mid-question get the time that is really left
  onGame(ng);
  if(mode==="solo")return Promise.resolve();
  const c=code;
  return queue(async()=>{const {error}=await sb.from("games").update({state:ng}).eq("code",c);if(error)throw error});
}
function missKey(qi){const d=G.deck[qi];return d.t!=null?"t"+d.t:"m"+d.id}
function missBank(){try{return JSON.parse(lsGet(lsKey("miss"))||"[]")}catch(e){return []}}
function trackMiss(qi,ok){const k=missKey(qi);let b=missBank().filter(x=>x!==k);if(!ok)b.push(k);lsSet(lsKey("miss"),JSON.stringify(b.slice(-300)));renderMissBtn()}
// missed questions bank: keys "m<id>" / "t<id>" of questions answered wrong, a key leaves as soon as it is answered right
function missLive(){return missBank().filter(k=>k[0]==="t"?TQ[+k.slice(1)]:Q[+k.slice(1)])}
function missItem(k){if(k[0]==="t")return {t:+k.slice(1)};const id=+k.slice(1);return {id,o:Q[id].tf?tfOrder(Q[id]):shuffle([0,1,2,3])}}
function playMissed(first){const all=missLive(),f=(first||[]).filter(k=>all.includes(k));
  const keys=shuffle(f).concat(shuffle(all.filter(k=>!f.includes(k)))).slice(0,Math.max(MISS_RUN,f.length));
  if(keys.length)startSolo(keys.map(missItem),{miss:all.length})}
const MISS_RUN=30;
function renderMissBtn(){const n=missLive().length;$("missPanel").hidden=!n;$("missN").textContent=n;
  $("missTitle").textContent=n===1?tl("1 missed question"):tl("{n} missed questions",{n});
  $("missBtn").textContent=n>MISS_RUN?tl("Replay {n}",{n:MISS_RUN}):tl(n===1?"Replay it":"Replay them")}
function writeAnswer(qi,entry){trackMiss(qi,isRight(entry,qi));
  P[me]={...(P[me]||{nick:myNick(),country:myCountry(),joined:Date.now()}),ans:{...((P[me]||{}).ans||{}),[qi]:entry}};onPlayers();
  if(mode==="solo"){saveSolo();return}
  const ans=P[me].ans,c=code;
  queue(async()=>{const {error}=await sb.from("players").update({ans}).eq("code",c).eq("pid",me);if(error)throw error});
}
function toast(msg){$("status").textContent=msg}

// ---------- engine: create / join ----------
async function insertGame(g){
  for(let i=0;i<8;i++){const c=genCode();const {error}=await sb.from("games").insert({code:c,state:g});
    if(!error)return c;if(error.code!=="23505")throw error}
  throw new Error("code");
}
async function createGame(){
  showErr("createErr","");if(needNick())return;
  if(!settings.sess.size){showErr("createErr",tl("Choose at least {unit}.",{unit:unit(2)}));return}
  lsSet("socio-nick",myNick());
  $("createBtn").disabled=true;
  try{
    const g={host:me,hostNick:myNick(),bank:BANK.id,bankTitle:BANK.title,status:"lobby",qi:0,deck:buildDeck(null,0,null,{diff:settings.diff}),T:settings.T,created:Date.now(),seq:1,sess:[...settings.sess],fmt:settings.fmt,diff:settings.diff,inf:settings.len===LEN_INF};
    const c=await insertGame(g);
    await joinGame(c);
  }catch(e){showErr("createErr",tl("Couldn't create the game. Check your connection."))}
  finally{$("createBtn").disabled=false}
}
function applyGame(s){if(!s)return;if(G&&local.lastStatus!==null&&(s.seq||0)<=(G.seq||0))return;onGame(s)}
function rowToPlayer(r){let ans=r.ans||{};const l=P[r.pid];if(r.pid===me&&l)ans={...ans,...(l.ans||{})};return {nick:tpkNick.show(r.nick),country:r.country||"",joined:Date.parse(r.created_at)||0,ans}}
async function loadPlayers(){
  const {data,error}=await sb.from("players").select(ctCol?"pid,nick,ans,created_at,country":"pid,nick,ans,created_at").eq("code",code);
  if(error&&ctCol){ctCol=false;return loadPlayers()}   // no country column yet (see supabase/migrations/add_player_country.sql)
  if(error||!data)return;
  const n={};data.forEach(r=>n[r.pid]=rowToPlayer(r));
  if(JSON.stringify(n)!==JSON.stringify(P)){P=n;onPlayers()}
  loadAvatars(Object.keys(n));
}
// photos are only fetched once per player (polling skips them to save bandwidth)
let avAsked=new Set(),avCol=true,ctCol=true;
async function loadAvatars(ids){
  ids=ids.filter(id=>id!==me&&!avAsked.has(id));if(!avCol||!ids.length)return;
  ids.forEach(id=>avAsked.add(id));const c=code;
  const {data,error}=await sb.from("players").select("pid,avatar").eq("code",c).in("pid",ids);
  if(error){avCol=false;return}
  let got=false;(data||[]).forEach(r=>{if(r.avatar&&avs[r.pid]!==r.avatar){avs[r.pid]=r.avatar;got=true}});
  if(got&&code===c)onPlayers();
}
async function poll(){
  if(mode!=="multi"||!code||document.hidden)return;
  try{
    const {data,error}=await sb.from("games").select("state").eq("code",code).maybeSingle();
    if(error)throw error;
    setNet(false);
    if(data)applyGame(data.state);
    await loadPlayers();
  }catch(e){setNet(true)}
}
async function joinGame(c){
  showErr("joinErr","");if(needNick())return;
  lsSet("socio-nick",myNick());
  const {data,error}=await sb.from("games").select("state").eq("code",c).maybeSingle();
  if(error){showErr("joinErr",tl("Can't connect, try again."));return}
  if(!data){showErr("joinErr",tl("No game with this code."));return}
  if(!await useBank(data.state.bank)){showErr("joinErr",esadeDenied?tl("This game uses an ESADE quiz. Verify your ESADE email, then join again."):tl("Couldn't load this game's quiz."));return}
  leaveGame(true);
  mode="multi";code=c;G=data.state;P={};local={qi:-1,shownAt:0,revealing:false,lastStatus:null};
  const {data:mine}=await sb.from("players").select("pid").eq("code",c).eq("pid",me).maybeSingle();
  if(G.status==="end"&&!mine){mode=null;code=null;G=null;show("home");showErr("joinErr",tl("This game is already over. Ask the host for a rematch."));return}
  // joining a game already under way: you play from the current question on (the next one if answers are being shown)
  if(G.status!=="lobby"&&!mine)local.joinQi=G.status==="q"?G.qi:G.qi+1;
  avAsked=new Set();
  const save=row=>mine?sb.from("players").update(row).eq("code",c).eq("pid",me):sb.from("players").insert({code:c,pid:me,...row});
  let res=await save({nick:myNick(),...(avCol?{avatar:myAv()}:{}),...(ctCol?{country:myCountry()||null}:{})});
  if(res.error&&ctCol){ctCol=false;res=await save({nick:myNick(),...(avCol?{avatar:myAv()}:{})})}   // no country column yet: play without flags
  if(res.error&&avCol){avCol=false;res=await save({nick:myNick()})}   // no avatar column yet: play without photos
  if(res.error){mode=null;code=null;show("home");showErr("joinErr",tl("Couldn't join, try again."));return}
  chan=sb.channel("g-"+c,{config:{broadcast:{self:true}}})
    .on("broadcast",{event:"react"},m=>{if(code===c&&window.tpkReact)tpkReact(m.payload)})
    .on("postgres_changes",{event:"*",schema:"public",table:"games",filter:"code=eq."+c},p=>{if(code===c&&p.new&&p.new.state)applyGame(p.new.state)})
    .on("postgres_changes",{event:"*",schema:"public",table:"players",filter:"code=eq."+c},p=>{if(code===c&&p.new&&p.new.pid){if(p.new.avatar&&p.new.pid!==me)avs[p.new.pid]=p.new.avatar;P={...P,[p.new.pid]:rowToPlayer(p.new)};onPlayers()}})
    .subscribe();
  pollT=setInterval(poll,2500);
  await loadPlayers();
  onGame(G);
}
function startSolo(customDeck,opt){
  if(!customDeck&&!settings.sess.size){showErr("createErr",tl("Choose at least {unit}.",{unit:unit(2)}));return}
  leaveGame(true);
  mode="solo";code=null;
  G={host:me,status:"q",qi:0,deck:customDeck||buildDeck(null,0,null,{diff:settings.diff}),T:settings.T,created:Date.now(),seq:1,inf:!customDeck&&settings.len===LEN_INF,review:!!customDeck,sess:[...settings.sess],fmt:settings.fmt,diff:settings.diff};
  if(opt&&opt.miss)G.miss=opt.miss;   // replaying the missed questions: remembers how many there were
  P={[me]:{nick:myNick(),country:myCountry(),joined:Date.now(),ans:{}}};local={qi:-1,shownAt:0,revealing:false,lastStatus:null};
  onGame(G);
}
function leaveGame(silent){
  if(chan){try{sb.removeChannel(chan)}catch(e){}chan=null}
  if(pollT){clearInterval(pollT);pollT=null}
  if(!silent){mode=null;code=null;G=null;P={};show("topic")}   // back to the quiz you just played, ready for another round
}
function isHost(){return G&&G.host===me}

// ---------- resume an interrupted solo game ----------
// one saved game per device: kept after each answer, dropped at the podium, by tl("Discard"), or after a week
const RESUME_KEY="tpk-resume",RESUME_MAX=7*864e5;
function savedSolo(){try{const s=JSON.parse(lsGet(RESUME_KEY)||"null");if(s&&s.G&&s.G.deck&&s.ans&&Date.now()-s.at<RESUME_MAX)return s}catch(e){}return null}
function clearSolo(){try{localStorage.removeItem(RESUME_KEY)}catch(e){}}
function saveSolo(force){
  if(!G||!BANK)return;
  if(G.status==="end"){clearSolo();return}
  const ans=(P[me]&&P[me].ans)||{};if(!force&&!Object.keys(ans).length)return;   // force = the player paused on purpose   // nothing answered yet: keep any older save
  lsSet(RESUME_KEY,JSON.stringify({bank:BANK.id,title:BANK.title,G,ans,at:Date.now()}));
}
function ago(t){const m=Math.round((Date.now()-t)/60000);return m<2?tl("just now"):m<60?tl("{n} min ago",{n:m}):m<1440?tl("{n} h ago",{n:Math.round(m/60)}):tl("{n} d ago",{n:Math.round(m/1440)})}
function renderResume(){
  const s=mode?null:savedSolo(),c=$("resumeCard");c.hidden=!s;if(!s)return;
  const g=s.G,n=Object.keys(s.ans).length,ok=Object.keys(s.ans).filter(i=>{const a=s.ans[i],d=g.deck[i];return d&&(d.t!=null?a.ok===true:d.o&&a.c===d.o.indexOf(0))}).length;
  const at=Math.min(g.qi+(s.ans[g.qi]||g.status==="reveal"?2:1),g.inf?Infinity:g.deck.length);
  $("resumeTitle").textContent=s.title||tl("Your quiz");
  $("resumeSub").textContent=tl("Question {at} / {total} · {ok} / {n} correct · {ago}",{at,total:g.inf?"∞":g.deck.length,ok,n,ago:ago(s.at)});
}
async function resumeSolo(){
  const s=savedSolo();if(!s){renderResume();return}
  $("resumeGo").disabled=true;const ok=await useBank(s.bank);$("resumeGo").disabled=false;
  if(!ok){if(!esadeDenied)toast(tl("Couldn't load this quiz, check your connection"));return}
  setQuizParam();leaveGame(true);
  mode="solo";code=null;
  // a question that was already answered (or timed out) reopens on its answer; an unanswered one starts again
  G={...s.G,host:me,status:s.ans[s.G.qi]||s.G.status==="reveal"?"reveal":"q",seq:(s.G.seq||0)+1};
  P={[me]:{nick:myNick(),country:myCountry(),joined:Date.now(),ans:s.ans}};local={qi:-1,shownAt:0,revealing:false,lastStatus:null};
  onGame(G);
}
$("resumeGo").onclick=resumeSolo;
$("resumeDrop").onclick=()=>{clearSolo();renderResume()};

// ---------- engine: reactions ----------
function onGame(g){
  if(g&&g.deck&&(!G||G.deck!==g.deck))preloadImgs(g.deck);
  const prevNext=G&&G.next;
  G=g;
  if(typeof recordStart==="function")recordStart();
  if(g.next&&g.next!==code&&mode==="multi"&&!isHost()&&g.next!==prevNext){setTimeout(()=>joinGame(g.next),600);return}
  if(g.status==="q"&&g.qi!==local.qi){local.qi=g.qi;local.revealing=false;
    // arriving mid-question (late join or reload): the clock keeps running, so skip the intro and take off the time already gone (always leave 3 s)
    const gone=local.lastStatus===null&&g.qAt?Math.min(Date.now()-g.qAt-1100,qT(g.qi)-3000):0;
    local.shownAt=gone>0?performance.now()-gone:performance.now()+1100;renderQuestion()}
  else if(g.status!==local.lastStatus||g.status!=="q")renderScreen();
  local.lastStatus=g.status;
  if(mode==="solo")saveSolo();
}
function onPlayers(){
  if(!G)return;
  // someone joined a game already under way: let everyone know
  const ids=Object.keys(P);if(local.known&&mode==="multi"&&G.status!=="lobby"){const nw=ids.filter(id=>!local.known.has(id)&&id!==me);if(nw.length){sfx("join");joinToast(tl("{names} joined the game",{names:nw.map(nameOf).join(", ")}))}}
  local.known=new Set(ids);
  if(G.status==="lobby")renderLobby();
  else if(G.status==="q")renderQState();
  else if(G.status==="reveal")renderReveal();
  else if(G.status==="end")renderEnd();
  
}
function joinToast(msg){let t=$("joinToast");if(!t){t=el("div","jointoast");t.id="joinToast";t.setAttribute("role","status");document.body.appendChild(t)}
  t.textContent=msg;t.hidden=false;t.style.animation="none";void t.offsetWidth;t.style.animation="";clearTimeout(t._h);t._h=setTimeout(()=>t.hidden=true,2600)}
function renderScreen(){
  if(G.status==="lobby"){show("lobby");renderLobby()}
  else if(G.status==="q"){renderQuestion()}
  else if(G.status==="reveal"){show("reveal");renderReveal()}
  else if(G.status==="end"){show("end");renderEnd()}
}
function show(id){["home","topic","make","lobby","question","reveal","end","cards","stats","exam","league"].forEach(s=>$(s).hidden=s!==id);
  // the name + photo panel follows the player between the two start screens
  const slot=id==="home"?$("meHome"):id==="topic"?$("meTopic"):null,me=document.querySelector(".me-panel");if(slot&&me.parentNode!==slot)slot.appendChild(me);
  $("langBtn").hidden=!(id==="home"||id==="topic");   // switching reloads the page, so only offer it between games
  if(id==="home"||id==="topic")renderProgressUI();
  const rslot=id==="home"?$("resumeHome"):id==="topic"?$("resumeTopic"):null;if(rslot){if($("resumeCard").parentNode!==rslot)rslot.appendChild($("resumeCard"));renderResume()}
  $("status").textContent=code?(tl("Game {code}",{code})):(mode==="solo"?tl("Solo"):"");window.scrollTo(0,0)}
// two players of one room with the same name AND the same country get "(2)", "(3)"... in order of arrival (same result on every phone)
let _nm={p:null,m:{}};
function dupMap(){if(_nm.p===P)return _nm.m;const g={},m={};
  Object.keys(P).forEach(id=>{const p=P[id],k=String(p.nick||"").trim().toLowerCase()+"|"+(p.country||"");(g[k]=g[k]||[]).push(id)});
  for(const k in g)if(g[k].length>1)g[k].sort((a,b)=>((P[a].joined||0)-(P[b].joined||0))||(a<b?-1:1)).forEach((id,i)=>{if(i)m[id]=i+1});
  _nm={p:P,m};return m}
function baseName(id){const p=P[id];return (p&&p.nick&&tpkNick.show(p.nick))||(profiles[id]&&profiles[id].name)||tl("Player")}
function nameOf(id){const n=dupMap()[id];return baseName(id)+(n?" ("+n+")":"")}
function flagOf(id){const p=P[id];return p&&window.tpkCountry?tpkCountry.flag(p.country):""}
// name with the player's flag in front, for lists on screen
function dispName(id){const f=flagOf(id);return (f?f+"\u00a0":"")+nameOf(id)}

// ---------- scoring ----------
function correctPos(qi){return isT(qi)?-1:G.deck[qi].o.indexOf(0)}
function isRight(a,qi){return !!a&&(isT(qi)?a.ok===true:a.c===correctPos(qi))}
const HINT_COST=250;
function ptsParts(id,qi){const a=P[id]&&P[id].ans&&P[id].ans[qi];if(!isRight(a,qi))return null;
  const sp=Math.max(0,1-a.ms/qT(qi)),base=isT(qi)?700:500;return {base,speed:Math.round(500*sp),hint:a.h?HINT_COST:0}}
function pts(id,qi){const x=ptsParts(id,qi);return x?x.base+x.speed-x.hint:0}
// live value of a correct answer right now (base + speed bonus still on the table)
function potential(qi){const left=Math.max(0,Math.min(1,timeLeft()/qT(qi)));return {base:isT(qi)?700:500,speed:Math.round(500*left)}}
function scoreRun(id,upto){let t=0,st=0,gain=0;for(let i=0;i<=upto;i++){const p=pts(id,i);let g=0;if(p>0){st++;g=p+Math.min(300,(st-1)*100)}else st=0;t+=g;if(i===upto)gain=g}return {t,gain,streak:st}}
function totals(upto){return Object.keys(P).map(id=>({id,...scoreRun(id,upto)})).sort((a,b)=>b.t-a.t)}

// ---------- lobby ----------
function renderLobby(){
  show("lobby");
  $("lobbyCode").textContent=code;
  $("lobbyInfo").textContent=tl("{fmt} · {n} questions · {s} s per question · {units}: {list}",{fmt:{mix:tl("Multiple choice + typed answers"),mcq:tl("Multiple choice"),typed:tl("Typed answers")}[G.fmt||"mcq"],n:G.inf?"∞":G.deck.length,s:G.T,units:unit(1),list:(G.sess||[]).map(sLabel).join(", ")});
  const ids=Object.keys(P).sort((a,b)=>(P[a].joined||0)-(P[b].joined||0));
  $("lobbyCount").textContent=tl(ids.length>1?"{n} players":"{n} player",{n:ids.length});
  const box=$("lobbyPlayers");box.textContent="";
  ids.forEach(id=>{const d=el("div","pl pop");d.append(avatar(id,nameOf(id)),el("span",null,dispName(id)));if(id===me)d.appendChild(el("span","you",tl("you")));if(id===G.host)d.appendChild(el("span","you",tl("host")));box.appendChild(d)});
  $("lobbyStart").hidden=!isHost();$("lobbyWait").hidden=isHost();
  $("inviteUrl").textContent=inviteUrl();
  if(local.lobbyN!=null&&ids.length>local.lobbyN)sfx("join");local.lobbyN=ids.length;
}
function inviteUrl(){return location.origin+location.pathname+"?code="+code}
$("inviteBtn").onclick=()=>{const u=inviteUrl();
  const done=()=>{$("inviteBtn").textContent=tl("Link copied!");setTimeout(()=>$("inviteBtn").textContent=tl("Copy invite link"),1800)};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(u).then(done,()=>selectInvite());else selectInvite();
  function selectInvite(){const r=document.createRange();r.selectNodeContents($("inviteUrl"));const sel=getSelection();sel.removeAllRanges();sel.addRange(r)}};
$("lobbyStart").onclick=()=>writeGame({status:"q",qi:0});
$("lobbyLeave").onclick=()=>leaveGame(false);

$("createBtn").onclick=createGame;
