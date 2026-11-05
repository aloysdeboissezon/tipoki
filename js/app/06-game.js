// ---------- question ----------
// exercises state all their figures, so their text is long: smaller type, left-aligned, line breaks kept
// Question text → readable blocks. Syntax in the banks: blank line = new paragraph, "• " = bullet list, lines starting with "|" = table
// ("|# x" = section row, "|^ a | b" = total row; the first "|" row is the header). Plain long questions get their last sentence (the actual question) on its own line.
function qBlocks(t){
  if(!/\n/.test(t)&&t.length>=80&&/\?$/.test(t)){const m=t.match(/^([\s\S]*[.!:”»)"]) +([A-ZÀ-ÝÉ“«][^.!:]*\?)$/);if(m&&m[1].length>=40)t=m[1]+"\n\n"+m[2]}
  const out=[];let cur=null;
  const push=(k,line)=>{if(!cur||cur.k!==k){cur={k,l:[]};out.push(cur)}cur.l.push(line)};
  t.split("\n").forEach(line=>{
    if(!line.trim()){cur=null;return}
    if(line[0]==="|")push("t",line);else if(line.startsWith("• "))push("u",line.slice(2));else push("p",line)});
  return out}
function qPlain(t){return t.replace(/^\|[#^]?\s*(.*)$/gm,(_,r)=>r.split("|").map(c=>c.trim()).join(" ")).replace(/\s*\n+\s*/g," ")}
function qRich(e,t){
  e.textContent="";const bl=qBlocks(t);let rich=bl.length>1,row=null;
  bl.forEach(b=>{
    if(b.k==="p"){if(!row||row.k!=="t")row=null;e.append(el("p","qp",b.l.join("\n")));return}
    if(b.k==="u"){row=null;const u=el("ul","qul");b.l.forEach(x=>u.append(el("li",null,x)));e.append(u);return}
    rich=true;
    const tb=el("table","qtbl"),cells=l=>l.slice(1).split("|").map(c=>c.trim());let head=true,tbody=null;
    b.l.forEach(l=>{
      if(head){head=false;const th=el("thead"),tr=el("tr");cells(l).forEach((c,i)=>tr.append(el("th",i?"n":null,c)));th.append(tr);tb.append(th);tbody=el("tbody");tb.append(tbody);return}
      const sec=l[1]==="#",tot=l[1]==="^",c=cells(sec||tot?l.slice(1):l),tr=el("tr",sec?"sec":tot?"tot":null);
      if(sec){const td=el("td",null,c[0]);td.colSpan=2;tr.append(td)}
      else c.forEach((x,i)=>tr.append(el("td",i&&/^[−-]?[\d.,\s]+%?$|^[\d.,\s]+[%€]$/.test(x)?"n":i?"x":null,x)));
      tbody.append(tr)});
    const w=el("div","qtw");w.append(tb);
    const prev=e.lastElementChild;if(prev&&prev.classList.contains("qtg"))prev.append(w);else{const g=el("div","qtg");g.append(w);e.append(g)}});
  e.classList.toggle("rich",rich)}
function setQText(id,t){const e=$(id);qRich(e,t);e.classList.toggle("long",t.length>170||e.classList.contains("rich"))}
function renderQuestion(){
  show("question");
  const item=G.deck[G.qi],q=qOf(G.qi),typed=isT(G.qi);
  $("qSess").textContent=sLabel(q.s);$("qNum").textContent=tl("Question {i} / {n}",{i:G.qi+1,n:G.inf?"∞":G.deck.length})+" · "+(typed?tl("Typed answer"):(q.t||tl("Multiple choice")))+" · "+diffName(diffOf(q));
  setQText("qText",q.q);
  showImg("qImgBox","qImg",q,"qHint");
  const st=G.qi>0?scoreRun(me,G.qi-1).streak:0;$("qStreak").hidden=st<2;$("qStreak").textContent=tl("STREAK ×{n}",{n:st});
  if(local.goQ!==G.qi){local.goQ=G.qi;sfx("go");local.lastTick=null}
  const intro=$("qIntro");$("qIntroN").textContent=(G.qi+1)+"/"+(G.inf?"∞":G.deck.length);$("qIntroType").textContent=typed?tl("Typed answer"):(q.t||tl("Multiple choice"));
  if(performance.now()<local.shownAt){intro.hidden=false;clearTimeout(local.introT);local.introT=setTimeout(()=>{intro.hidden=true;if(isT(G.qi))$("qInput").focus()},Math.max(0,local.shownAt-performance.now()))}else intro.hidden=true;
  const box=$("qTiles");box.textContent="";box.hidden=typed;$("qType").hidden=!typed;
  if(typed){$("qInput").value="";$("qInput").disabled=false;$("qSend").disabled=false;setTimeout(()=>$("qInput").focus(),50)}
  const hid=local.hint&&local.hint.qi===G.qi?local.hint.ks:[];
  if(!typed)item.o.forEach((oi,k)=>{const b=el("button","tile t"+k);b.dataset.k=k;b.style.setProperty("--i",k+3);
    b.append(el("span","k",LETTERS[k]),el("span",null,q.o[oi]));b.onclick=()=>pick(k);if(hid.includes(k)){b.hidden=true;b.disabled=true}box.appendChild(b)});
  renderQState();
}
function myAns(){return P[me]&&P[me].ans&&P[me].ans[G.qi]}
function pick(k){
  if(myAns()||G.status!=="q"||isT(G.qi))return;
  if(local.qPause)return;
  const ms=performance.now()-local.shownAt;if(ms<0||ms>qT(G.qi))return;
  const e={c:k,ms:Math.round(ms)};if(hinted())e.h=1;
  writeAnswer(G.qi,e);
}
function hinted(){return !!(local.hint&&local.hint.qi===G.qi)}
// hint: hides two wrong answers; a correct answer then scores HINT_COST points less
$("qHint2").onclick=()=>{
  if(myAns()||G.status!=="q"||isT(G.qi)||hinted()||timeLeft()<=0)return;
  const wrong=[...$("qTiles").children].map(b=>+b.dataset.k).filter(k=>k!==correctPos(G.qi)),ks=[];
  while(ks.length<2&&wrong.length){ks.push(wrong.splice(Math.floor(Math.random()*wrong.length),1)[0])}
  local.hint={qi:G.qi,ks};sfx("tick");
  [...$("qTiles").children].forEach(b=>{if(ks.includes(+b.dataset.k)){b.hidden=true;b.disabled=true}});renderQState()};
function sendTyped(){
  if(myAns()||G.status!=="q"||!isT(G.qi))return;
  if(local.qPause)return;
  const txt=$("qInput").value.trim().slice(0,80);if(!txt)return;
  const ms=performance.now()-local.shownAt;if(ms<0||ms>qT(G.qi))return;
  writeAnswer(G.qi,{txt,ok:checkTyped(txt,TQ[G.deck[G.qi].t].a,TQ[G.deck[G.qi].t].n),ms:Math.round(ms)});
}
$("qSend").onclick=sendTyped;
$("qInput").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();sendTyped()}});
function renderQState(){
  if(!G||G.status!=="q")return;
  const a=myAns();
  if(isT(G.qi)){const off=!!a||timeLeft()<=0;$("qInput").disabled=off;$("qSend").disabled=off}
  [...$("qTiles").children].forEach(b=>{const k=+b.dataset.k;b.disabled=!!a||timeLeft()<=0;
    b.classList.toggle("picked",!!a&&a.c===k);b.classList.toggle("dim",!!a&&a.c!==k)});
  $("qHintRow").hidden=isT(G.qi)||!!a||hinted()||timeLeft()<=0||[...$("qTiles").children].length<4;
  const ids=Object.keys(P),done=ids.filter(id=>P[id].ans&&P[id].ans[G.qi]).length;
  const w=$("qWait");
  if(a){w.hidden=false;w.textContent=mode==="multi"&&done<ids.length?tl("Answer sent · waiting for {n} more",{n:ids.length-done}):tl("Answer sent")}
  else if(timeLeft()<=0){w.hidden=false;w.textContent=tl("Time's up")}
  else w.hidden=true;
  $("qHostRow").hidden=!(isHost()&&mode==="multi");
  $("qPlayers").hidden=mode!=="multi";$("qLate").hidden=!(mode==="multi"&&local.joinQi===G.qi&&G.qi>0);
  if(mode==="multi")renderAnswered(ids,done);
}
// who has answered this question: answered players first (fastest first), then those still thinking; never shows what they picked
function renderAnswered(ids,done){
  const at=id=>{const x=P[id].ans&&P[id].ans[G.qi];return x?x.ms:null};
  const order=ids.slice().sort((a,b)=>{const x=at(a),y=at(b);if((x==null)!==(y==null))return x==null?1:-1;return x!=null?x-y:(P[a].joined||0)-(P[b].joined||0)});
  $("qAnsN").textContent=done+" / "+ids.length;
  const box=$("qAnsList"),key=order.map(id=>id+(at(id)!=null?"+":"")+nameOf(id)).join(",");
  if(box.dataset.k===key&&box.dataset.q===String(G.qi))return;   // no flicker on every poll
  const was=new Set(box.dataset.q===String(G.qi)?(box.dataset.done||"").split(","):[]);
  box.dataset.k=key;box.dataset.q=String(G.qi);box.dataset.done=order.filter(id=>at(id)!=null).join(",");box.textContent="";
  order.forEach(id=>{const ok=at(id)!=null,c=el("div","ach"+(ok?" done":"")+(ok&&!was.has(id)?" pop":"")+(id===me?" me":""));
    c.append(avatar(id,nameOf(id)),el("span","nm",id===me?tl("You"):dispName(id)));if(ok)c.appendChild(el("span","ck","✓"));
    c.title=tl(ok?"{name} has answered":"{name} is thinking…",{name:nameOf(id)});box.appendChild(c)});
}
function timeLeft(){return qT(G.qi)-((local.qPause||performance.now())-local.shownAt)}
$("qSkip").onclick=()=>{if(isHost()&&G.status==="q"&&!local.revealing){local.revealing=true;writeGame({status:"reveal"})}};
$("qTake").onclick=()=>{if(G.status==="q")writeGame({host:me,status:"reveal"})};

// tick: timer display + host auto-advance
setInterval(()=>{
  if(!G||G.status!=="q"||$("question").hidden)return;
  const left=timeLeft();
  const sec=Math.max(0,Math.ceil(Math.min(left,qT(G.qi))/1000));$("qTimer").textContent=sec;$("qTimer").style.setProperty("--p",Math.max(0,Math.min(1,left/qT(G.qi))).toFixed(3));
  const warn=left<5000&&left>0&&!myAns();if(warn&&local.lastTick!==sec){local.lastTick=sec;sfx("tick")}$("qTimer").classList.toggle("warn",warn);$("qBar").classList.toggle("warn",warn);
  $("qBar").style.width=Math.max(0,Math.min(1,left/qT(G.qi))*100)+"%";
  const pe=$("qPot");pe.hidden=!!myAns();if(!pe.hidden){const o=potential(G.qi);pe.textContent=tl("+{n} pts",{n:o.base+o.speed})+" · "+tl("speed bonus +{n}",{n:o.speed})}
  if(left<=0&&!myAns()&&$("qWait").hidden)renderQState();
  const ids=Object.keys(P);
  const all=ids.length>0&&ids.every(id=>P[id].ans&&P[id].ans[G.qi]);
  if(isHost()&&!local.revealing&&(left<-800||all)){local.revealing=true;const qi=G.qi,c=G.created;setTimeout(()=>{if(G&&G.created===c&&G.qi===qi&&G.status==="q")writeGame({status:"reveal"})},all?600:0)}
  $("qTakeRow").hidden=!(mode==="multi"&&!isHost()&&left<-10000);
},150);
// no timer on the answer screen: explanations can be long (diagrams, images), so only the host's Next button moves the game on
function renderAuto(){
  const last=!G.inf&&G.qi>=G.deck.length-1;
  $("rWait").textContent=last?tl("Waiting for the host to show the podium…"):tl("Waiting for the host to go to the next question…");
}

// ---------- reveal ----------
function renderReveal(){
  show("reveal");
  if(local.autoQ!==G.qi){local.autoQ=G.qi;local.autoAt=performance.now();local.autoFired=false}
  const item=G.deck[G.qi],q=qOf(G.qi),cp=correctPos(G.qi),a=myAns(),typed=isT(G.qi);
  $("rSess").textContent=sLabel(q.s);$("rNum").textContent=tl("Question {i} / {n}",{i:G.qi+1,n:G.inf?"∞":G.deck.length})+" · "+(typed?tl("Typed answer"):(q.t||tl("Multiple choice")))+" · "+diffName(diffOf(q));
  const v=$("rVerdict");$("rBreak").hidden=true;
  const late=mode==="multi"&&local.joinQi>G.qi;   // just joined: this question was before your time
  if(local.sfxQ!==G.qi){local.sfxQ=G.qi;if(a&&isRight(a,G.qi)){rightFx(scoreRun(me,G.qi).streak)}else if(!late){sfx("bad");buzz([60,40,60])}}
  const winners=Object.keys(P).map(id=>({id,a:P[id].ans&&P[id].ans[G.qi]})).filter(x=>isRight(x.a,G.qi)).sort((x,y)=>x.a.ms-y.a.ms);
  $("rFast").hidden=mode!=="multi"||!winners.length;if(winners.length)$("rFast").textContent=tl("Fastest: {name} in {s} s",{name:nameOf(winners[0].id),s:fmtDec(winners[0].a.ms/1000)});
  const ok=isRight(a,G.qi);$("rMiss").hidden=!G.miss||!a;$("rMiss").className="missnote "+(ok?"ok":"bad");
  $("rMiss").textContent=ok?tl("✓ Off your missed questions list"):tl("Still on your missed questions list");
  if(late&&!a){v.textContent=tl("You're in! You'll play from the next question");v.className="verdict late"}
  else if(isRight(a,G.qi)){const r=scoreRun(me,G.qi),pp=ptsParts(me,G.qi);v.textContent=tl("verdict|Correct")+" · +"+r.gain+(r.streak>=2?" · "+tl("streak ×{n}",{n:r.streak}):"");
    $("rBreak").hidden=false;$("rBreak").textContent=tl("Base {b} + speed bonus {s}",{b:pp.base,s:pp.speed})+(pp.hint?" − "+tl("hint {n}",{n:pp.hint}):"")+(r.gain>pp.base+pp.speed-pp.hint?" + "+tl("streak bonus {n}",{n:r.gain-(pp.base+pp.speed-pp.hint)}):"");if(local.confQ!==G.qi){local.confQ=G.qi;confetti(r.streak>=3?120:60)}v.className="verdict ok pop"}
  else if(!a){v.textContent=tl("No answer");v.className="verdict bad pop"}
  else {v.textContent=tl("verdict|Wrong");v.className="verdict bad pop"}
  setQText("rText",q.q);
  showImg("rImgBox","rImg",q,null);
  const box=$("rTiles");box.textContent="";box.hidden=typed;$("rTyped").hidden=!typed;
  if(typed){$("rGood").textContent=q.a[0];const al=$("rAns");al.textContent="";
    Object.keys(P).forEach(id=>{const x=P[id].ans&&P[id].ans[G.qi];const r=el("div");
      r.append(avatar(id,nameOf(id)),el("span","nm",dispName(id)+(LANG==="fr"?"\u00a0:":":")),el("span","txt",x?x.txt:"—"),el("span",x&&x.ok?"okm":"bdm",x&&x.ok?"✓":"✗"));al.appendChild(r)})}
  const counts=[0,0,0,0];if(!typed)Object.values(P).forEach(p=>{const x=p.ans&&p.ans[G.qi];if(x&&x.c!=null)counts[x.c]++});
  if(!typed)item.o.forEach((oi,k)=>{const b=el("button","tile t"+k);b.disabled=true;
    b.append(el("span","k",LETTERS[k]),el("span",null,q.o[oi]));
    if(k===cp)b.classList.add("right");else b.classList.add("dim");if(a&&a.c===k&&k!==cp)b.classList.add("mine");
    if(mode==="multi")b.appendChild(el("span","cnt",tl(counts[k]===1?"{n} player":"{n} players",{n:counts[k]})));
    box.appendChild(b)});
  $("rExplBox").hidden=!q.e;TipokiWhy.fill(q,$("rExplBox"),$("rExpl"),$("rExplMore"));
  const wn=$("rWhyNot"),mine=a&&!ok?(typed?a.txt:a.c!=null?q.o[item.o[a.c]]:""):"",why=mine?TipokiWhy.whyNot(BANK&&(BANK.factsEn||BANK.facts),mine):"";
  wn.hidden=!why;wn.textContent=why?tl("Your answer: ")+why:"";
  {const all=totals(G.qi),prev=mode==="multi"&&G.qi>0?totals(G.qi-1).map(r=>r.id):null;
    all.forEach((r,i)=>{r.mv=prev&&prev.includes(r.id)?prev.indexOf(r.id)-i:0});
    let rows=all.slice(0,mode==="solo"?1:8);const mi=all.findIndex(r=>r.id===me);
    if(mode==="multi"&&mi>=8){rows=rows.slice(0,7);rows.push(all[mi]);rows[7].rk=mi+1}
    renderBoard($("rBoard"),rows,true)}
  const last=!G.inf&&G.qi>=G.deck.length-1;
  $("rEnd").hidden=!(G.inf&&isHost());
  $("rNext").hidden=!isHost();$("rNext").textContent=last?tl("See the podium"):tl("Next question");
  $("rWait").hidden=isHost();
  renderAuto();
}
function renderBoard(box,rows,gains){
  box.textContent="";
  rows.forEach((r,i)=>{const d=el("div","brow"+(r.id===me?" me":""));
    const mv=r.mv?el("span","mv "+(r.mv>0?"up":"dn"),(r.mv>0?"▲":"▼")+Math.abs(r.mv)):null;if(mv)mv.setAttribute("aria-label",tl(r.mv>0?"Up {n}":"Down {n}",{n:Math.abs(r.mv)}));
    d.append(el("span","rk",(r.rk||i+1)+"."),avatar(r.id,nameOf(r.id)),(()=>{const n=el("span","nm",dispName(r.id)+(r.id===me?" ("+tl("you")+")":""));if(mv)n.append(" ",mv);return n})(),
      el("span","gain",gains&&r.gain?"+"+r.gain:""),el("span","pts",r.t+" pts"));box.appendChild(d);if(gains&&r.gain)countUp(d.lastChild,r.t-r.gain,r.t)});
}
$("rNext").onclick=()=>{if(!isHost()||local.autoFired)return;local.autoFired=true;goNext()};
function goNext(){
  if(!isHost()||G.status!=="reveal")return;$("rNext").disabled=true;setTimeout(()=>$("rNext").disabled=false,800);
  if(G.inf){const p={status:"q",qi:G.qi+1};if(G.qi+1>=G.deck.length-5)p.deck=G.deck.concat(buildDeck(G.sess||[...settings.sess],LEN_INF,G.fmt||settings.fmt,{exclude:G.deck,more:true,diff:G.diff}));writeGame(p);return}
  if(G.qi>=G.deck.length-1)writeGame({status:"end"});else writeGame({status:"q",qi:G.qi+1});
}
// the host's client drives the game: if it goes quiet (closed tab, lost connection), the longest-standing other player takes over.
// each candidate waits longer than the one before, so only one steps in; a paused game (G.pz) is left alone
function succession(){return Object.keys(P).filter(id=>id!==G.host).sort((a,b)=>(P[a].joined||0)-(P[b].joined||0)||(a<b?-1:1))}
setInterval(()=>{
  if(mode!=="multi"||!G||isHost()||document.hidden||netBad)return;
  if(G.status==="q"&&!$("question").hidden)var over=-timeLeft();
  else if(G.status==="reveal"&&local.autoAt)over=performance.now()-local.autoAt;
  else return;
  if(G.pz&&Date.now()-G.pz<10*60000)return;
  const rank=succession().indexOf(me);if(rank<0)return;
  const grace=(G.status==="q"?4000:300000)+rank*6000;
  if(over>grace){writeGame({host:me,pz:0}).then(()=>{local.autoFired=false;local.revealing=false;joinToast(tl("The host left the game, you are now running it"))})}
},1000);
$("rEnd").onclick=()=>{if(isHost())writeGame({status:"end",deck:G.deck.slice(0,G.qi+1),inf:false})};

// ---------- progress: best score per quiz + daily study streak ----------
// kept in this browser for now: statsLoad / statsSave are the only functions touching storage, so an online save can plug in there
const STATS_KEY="tpk-stats",BEST_MIN=5;   // a game needs 5+ questions to count as a record
function statsLoad(){try{const s=JSON.parse(lsGet(STATS_KEY)||"{}");return {best:s.best||{},days:s.days||[],daily:s.daily||{},goal:s.goal||0}}catch(e){return {best:{},days:[],daily:{},goal:0}}}
function statsSave(s){lsSet(STATS_KEY,JSON.stringify(s))}
function dayKey(d){d=d||new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function accPct(r){return Math.round(100*r.c/r.n)}
function bestOf(id){return statsLoad().best[id]||null}
function beats(a,b){return !b||a.c*b.n>b.c*a.n||(a.c*b.n===b.c*a.n&&a.pts>b.pts)}   // accuracy first, then points
// saves the game if it is a new record, returns the record held before it
function recordGame(id,r){const s=statsLoad(),prev=s.best[id]||null;if(r.n>=BEST_MIN&&beats(r,prev)){s.best[id]={c:r.c,n:r.n,pts:r.pts,at:Date.now()};statsSave(s)}return prev}
// true when today is a new study day
function markStudyDay(){const s=statsLoad(),k=dayKey();if(s.days[s.days.length-1]===k)return false;s.days=s.days.filter(d=>d!==k).concat(k).slice(-400);statsSave(s);return true}
// daily goal: questions/cards answered per day (kept 60 days, saved online with the rest of tpk-stats)
const GOALS=[5,10,20,30];
function goalOf(){const g=statsLoad().goal;return GOALS.includes(g)?g:10}
function addDaily(n){if(!(n>0))return;const s=statsLoad(),k=dayKey();s.daily[k]=(s.daily[k]||0)+n;
  Object.keys(s.daily).sort().slice(0,-60).forEach(d=>delete s.daily[d]);statsSave(s)}
function goalInfo(){const s=statsLoad(),g=goalOf(),done=s.daily[dayKey()]||0;return {g,done,hit:done>=g}}
function setGoal(g){const s=statsLoad();s.goal=g;statsSave(s);renderProgressUI()}
document.addEventListener('click',e=>{if(e.target.id==='goalSet'){const g=goalOf();setGoal(GOALS[(GOALS.indexOf(g)+1)%GOALS.length])}});
function renderGoal(){const box=$("homeGoal");if(!box)return;const {g,done,hit}=goalInfo(),st=streakInfo();
  $("goalFill").style.width=Math.min(100,Math.round(100*done/g))+"%";box.classList.toggle("hit",hit);
  $("goalTxt").textContent=tl("Daily goal: {d}/{g}",{d:Math.min(done,g),g});
  $("goalHint").textContent=hit?tl("Goal reached. Nice!"):st.n&&!st.today?tl("{k} more to keep your {n}-day streak",{k:g-done,n:st.n}):tl(g-done===1?"1 more to go":"{k} more to go",{k:g-done});
  $("goalSet").textContent=tl("Goal")+": "+g}
// days in a row up to today (or up to yesterday while today is not done yet)
function streakInfo(){const days=new Set(statsLoad().days),d=new Date(),today=days.has(dayKey(d));if(!today)d.setDate(d.getDate()-1);
  let n=0;while(days.has(dayKey(d))){n++;d.setDate(d.getDate()-1)}return {n,today}}
const FLAME='<svg class="flame" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 3.5 5.5 6 5.5 11.2A5.5 5.5 0 0 1 12 19a5.5 5.5 0 0 1-5.5-5.8c0-2.4 1.3-4 2.6-5.2.2 1.8 1 2.9 2.2 3.4C11 9 11.3 5.3 12 2z"/></svg>';
function renderStreak(box,txt){const st=streakInfo();box.hidden=!st.n;if(!st.n)return st;
  box.innerHTML=FLAME+"<b></b><span></span>";box.children[1].textContent=tl(st.n===1?"1-day streak":"{n}-day streak",{n:st.n});box.children[2].textContent=txt(st);return st}
function renderProgressUI(){
  renderGoal();
  renderStreak($("homeStreak"),st=>st.today?tl("Done for today"):tl("Play today to keep it"));
  const best=statsLoad().best;
  $("quizGrid").querySelectorAll(".qcard").forEach(c=>{const b=best[c.dataset.id],x=c.querySelector(".qbest");
    if(x)x.hidden=!b;if(b&&x)x.textContent=tl("Best {p}%",{p:accPct(b)})});
  const b=BANK&&best[BANK.id];$("bankBest").hidden=!b;if(b)$("bankBest").textContent=tl("Your best: {p}% ({c}/{n})",{p:accPct(b),c:b.c,n:b.n});
}
function renderEndProgress(){
  const R=local.endRes,box=$("endProg");$("endStreak").hidden=box.hidden=$("endGoal").hidden=!R;if(!R)return;
  const r=R.r,prev=R.prev,counts=r.n>=BEST_MIN&&!G.review;box.hidden=!counts;
  if(counts){const nb=beats(r,prev);let badge,txt;
    if(!prev){badge=tl("First score");txt=tl("{p}% correct. Play again to beat it!",{p:accPct(r)})}
    else if(nb){badge=tl("New best!");txt=tl("{p}% correct, up from {q}%.",{p:accPct(r),q:accPct(prev)})}
    else if(r.c*prev.n===prev.c*r.n){badge=tl("Best: {p}%",{p:accPct(prev)});txt=tl("Same accuracy as your best. Answer faster to beat it.")}
    else{const k=Math.floor(prev.c*r.n/prev.n)-r.c+1;badge=tl("Best: {p}%",{p:accPct(prev)});
      txt=tl("You got {p}%.",{p:accPct(r)})+" "+(k<=r.n-r.c?tl(k>1?"{k} more correct answers would beat your best.":"1 more correct answer would beat your best.",{k}):tl("Your best is perfect: get them all right, and faster, to beat it."))}
    box.classList.toggle("rec",nb);$("endBadge").textContent=badge;$("endProgTxt").textContent=txt;
    $("endMark").hidden=!prev||nb;if(prev)$("endMark").style.left=accPct(prev)+"%";
    const f=$("endFill");f.style.width="0%";requestAnimationFrame(()=>requestAnimationFrame(()=>f.style.width=accPct(r)+"%"))}
  const gi=goalInfo();$("endGoal").hidden=false;$("endGoal").textContent=gi.hit?tl("Daily goal reached ({d}/{g})",{d:gi.done,g:gi.g}):tl("Daily goal: {d}/{g}",{d:gi.done,g:gi.g});
  renderStreak($("endStreak"),st=>R.newDay?(st.n>1?tl("Day {n} in a row. See you tomorrow!",{n:st.n}):tl("Day 1. Come back tomorrow to keep it going.")):tl("You already studied today. Come back tomorrow for day {n}.",{n:st.n+1}));
}

