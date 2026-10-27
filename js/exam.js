// ---------- exam mode: N random questions, one clock for the whole exam, no correction until you hand in, grade out of 20 ----------
// uses the sessions and format picked in the game settings; answers can be changed until the end
let EX={deck:[],ans:[],i:0,endAt:0,startAt:0,on:false,total:0,timeUp:false,rev:"bad"};
let exOpt={len:20,pace:45};
const EX_LENS=[20,40,"all"],EX_PACES=[[30,"30 s"],[45,"45 s"],[60,"1 min"],[90,"1 min 30"]];
function exQ(d){return d.t!=null?TQ[d.t]:Q[d.id]}
function exAvail(){   // questions the deck builder can draw from (same text counted once)
  const ss=settings.sess,fmt=settings.fmt,seen=new Set();
  if(fmt!=="typed")Q.forEach(q=>{if(ss.has(q.s))seen.add(q.q+(q.img||""))});
  if(fmt!=="mcq")TQ.forEach(q=>{if(ss.has(q.s))seen.add(q.q+(q.img||""))});
  return seen.size}
function exCount(){const n=exAvail();return exOpt.len==="all"?n:Math.min(exOpt.len,n)}
function exHist(){try{return JSON.parse(lsGet(lsKey("exam"))||"[]")}catch(e){return []}}
function exFmtG(g){return fmtDec(g)}
function exClock(ms){const s=Math.max(0,Math.ceil(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60),r=s%60;
  return (h?h+":"+String(m).padStart(2,"0"):String(m))+":"+String(r).padStart(2,"0")}
function exDur(ms){const m=Math.round(ms/60000);return m<60?m+" min":Math.floor(m/60)+" h"+(m%60?" "+String(m%60).padStart(2,"0"):"")}
function renderExamPanel(){
  if(!BANK)return;
  const n=exAvail();$("examPanel").hidden=$("examJump").hidden=!n;if(!n)return;
  $("exUnits").textContent=unit(1);
  const lc=$("exLenChips");lc.textContent="";
  EX_LENS.filter(k=>k==="all"||k<n).forEach(k=>{const b=el("button","chip",k==="all"?tl("All ({n})",{n}):String(k));
    b.setAttribute("aria-pressed",exOpt.len===k||(k==="all"&&exOpt.len!=="all"&&exOpt.len>=n));b.onclick=()=>{exOpt.len=k;renderExamPanel()};lc.appendChild(b)});
  const pc=$("exPaceChips");pc.textContent="";
  EX_PACES.forEach(([s,l])=>{const b=el("button","chip",l);b.setAttribute("aria-pressed",exOpt.pace===s);b.onclick=()=>{exOpt.pace=s;renderExamPanel()};pc.appendChild(b)});
  const c=exCount();
  $("exSum").textContent=tl(c>1?"{n} questions · {d} on the clock":"1 question · {d} on the clock",{n:c,d:exDur(c*exOpt.pace*1000)});
  const h=exHist();$("exBest").hidden=!h.length;
  if(h.length)$("exBest").textContent=tl("Last exam: {g}/20 · Best: {b}/20",{g:exFmtG(h[0].g),b:exFmtG(Math.max(...h.map(x=>x.g)))});
  showErr("exErr","");
}
function startExam(){
  if(!settings.sess.size){showErr("exErr",tl("Choose at least {unit}.",{unit:unit(2)}));return}
  const n=exCount();if(!n){showErr("exErr",tl("No questions in these {units}.",{units:unit(1)}));return}
  const deck=buildDeck([...settings.sess],exOpt.len==="all"?1e6:n,settings.fmt);
  if(!deck.length){showErr("exErr",tl("No questions in these {units}.",{units:unit(1)}));return}
  EX={deck,ans:deck.map(()=>null),i:0,startAt:Date.now(),total:deck.length*exOpt.pace*1000,on:true,timeUp:false,rev:"bad"};
  EX.endAt=EX.startAt+EX.total;
  show("exam");$("exPlay").hidden=false;$("exDone").hidden=true;$("exConfirm").hidden=true;
  sfx("go");renderExQ();exTick();
}
function exAnswered(a){return !!a&&(a.c!=null||!!(a.txt&&a.txt.trim()))}
function renderExQ(){
  const d=EX.deck[EX.i],q=exQ(d),typed=d.t!=null,n=EX.deck.length,a=EX.ans[EX.i];
  $("exSess").textContent=sLabel(q.s);$("exSess").title=SESS[q.s]||"";
  $("exNum").textContent=tl("Question {i} / {n}",{i:EX.i+1,n})+" · "+(typed?tl("Typed answer"):q.t||tl("Multiple choice"));
  $("exText").textContent=q.q;
  const box=$("exImgBox"),img=$("exImg");box.hidden=!q.img;$("exHint").textContent="";
  if(q.img){img.removeAttribute("src");img.hidden=true;const want=EX.i;
    wikiImg(q.img).then(u=>{if(EX.i!==want||!EX.on)return;if(u){img.src=u;img.hidden=false}else $("exHint").textContent=q.hint||""})}
  const tiles=$("exTiles");tiles.textContent="";tiles.hidden=typed;$("exType").hidden=!typed;
  if(typed){$("exInput").value=a&&a.txt||"";if(matchMedia("(hover:hover)").matches)setTimeout(()=>$("exInput").focus(),30)}
  else d.o.forEach((oi,k)=>{const b=el("button","tile t"+k);b.type="button";b.dataset.k=k;b.style.setProperty("--i",k);
    b.setAttribute("aria-pressed",!!a&&a.c===k);
    b.append(el("span","k",LETTERS[k]),el("span",null,q.o[oi]));b.onclick=()=>exPick(k);tiles.appendChild(b)});
  exMarkTiles();
  $("exPrev").disabled=EX.i===0;
  const last=EX.i>=n-1;$("exNext").textContent=last?tl("Hand in"):tl("Next →");$("exNext").classList.toggle("dark",last);
  renderExGrid();
}
function exMarkTiles(){const a=EX.ans[EX.i];
  [...$("exTiles").children].forEach(b=>{const on=!!a&&a.c===+b.dataset.k;b.classList.toggle("sel",on);b.classList.toggle("dim",!!a&&a.c!=null&&!on);b.setAttribute("aria-pressed",on)})}
function exPick(k){if(!EX.on)return;const a=EX.ans[EX.i];
  EX.ans[EX.i]=a&&a.c===k?null:{c:k};   // tap the same answer again to clear it
  buzz(10);exMarkTiles();renderExGrid()}
function renderExGrid(){
  const g=$("exGrid"),n=EX.deck.length;
  if(g.children.length!==n){g.textContent="";for(let i=0;i<n;i++){const b=el("button","ex-cell",String(i+1));b.type="button";b.onclick=()=>exGo(i);g.appendChild(b)}}
  [...g.children].forEach((b,i)=>{b.classList.toggle("done",exAnswered(EX.ans[i]));b.classList.toggle("cur",i===EX.i);
    b.setAttribute("aria-label",tl(exAnswered(EX.ans[i])?"Question {n}, answered":"Question {n}, not answered",{n:i+1}))});
  const left=EX.ans.filter(a=>!exAnswered(a)).length;
  $("exLeft").textContent=left?tl("{n} left to answer",{n:left}):tl("all answered");
}
function exGo(i){if(i<0||i>=EX.deck.length)return;EX.i=i;$("exConfirm").hidden=true;renderExQ();
  const t=$("exam").getBoundingClientRect().top;if(t<0)window.scrollTo(0,scrollY+t-8)}
function exAsk(kind){
  const left=EX.ans.filter(a=>!exAnswered(a)).length,c=$("exConfirm");
  if(kind==="hand"&&!left){handInExam(false);return}
  c.dataset.kind=kind;c.hidden=false;
  $("exConfirmTxt").textContent=kind==="quit"?tl("Quit the exam? Your answers will be lost."):tl(left>1?"{n} questions not answered yet. Hand in anyway?":"1 question not answered yet. Hand in anyway?",{n:left});
  $("exConfirmOk").textContent=kind==="quit"?tl("Quit"):tl("Hand in");
  c.scrollIntoView({block:"nearest",behavior:RM?"auto":"smooth"});$("exConfirmNo").focus()}
function exTick(){
  if(!EX.on)return;
  const left=EX.endAt-Date.now(),k=Math.max(0,Math.min(1,left/EX.total));
  $("exClock").textContent=exClock(left);$("exBar").style.width=k*100+"%";
  const warn=left<60000;$("exClock").classList.toggle("warn",warn);$("exBar").classList.toggle("warn",warn);
  if(warn&&left>0&&left<=10000){const s=Math.ceil(left/1000);if(EX.lastTick!==s){EX.lastTick=s;sfx("tick")}}
  if(left<=0)handInExam(true)}
setInterval(exTick,250);
function exRight(d,a){if(!exAnswered(a))return false;if(d.t!=null)return checkTyped(a.txt,TQ[d.t].a,TQ[d.t].n);return d.o[a.c]===0}
function handInExam(timeUp){
  if(!EX.on)return;EX.on=false;EX.timeUp=timeUp;EX.usedMs=Math.min(EX.total,Date.now()-EX.startAt);
  EX.res=EX.deck.map((d,i)=>exAnswered(EX.ans[i])?(exRight(d,EX.ans[i])?1:0):-1);   // 1 right, 0 wrong, -1 blank
  const n=EX.deck.length,ok=EX.res.filter(r=>r===1).length;EX.grade=Math.round(ok/n*200)/10;
  // mistakes go to the "Review my mistakes" bank of the quiz, right answers leave it
  let mb=missBank();EX.deck.forEach((d,i)=>{const k=d.t!=null?"t"+d.t:"m"+d.id;mb=mb.filter(x=>x!==k);if(EX.res[i]!==1)mb.push(k)});
  lsSet(lsKey("miss"),JSON.stringify(mb.slice(-300)));renderMissBtn();
  const h=exHist();h.unshift({g:EX.grade,n,ok,at:Date.now()});lsSet(lsKey("exam"),JSON.stringify(h.slice(0,20)));markStudyDay();
  renderExDone();
}
function exVerdict(g){return g>=16?tl("Outstanding, top marks."):g>=14?tl("Very good, well done."):g>=12?tl("Good, a solid pass."):g>=10?tl("Passed. A few gaps to fill."):tl("Not passed yet. Go over your mistakes and try again.")}
function renderExDone(){
  $("exPlay").hidden=true;$("exDone").hidden=false;window.scrollTo(0,0);
  const n=EX.deck.length,r=EX.res,ok=r.filter(x=>x===1).length,bad=r.filter(x=>x===0).length,blank=r.filter(x=>x===-1).length;
  $("exTimeUp").hidden=!EX.timeUp;
  $("exGrade").textContent=exFmtG(EX.grade);$("exGradeBox").className="ex-grade "+(EX.grade>=10?"pass":"fail");
  $("exVerdict").textContent=exVerdict(EX.grade);
  $("exOk").textContent=ok;$("exBad").textContent=bad;$("exBlank").textContent=blank;
  const bys={};EX.deck.forEach((d,i)=>{const s=exQ(d).s;bys[s]=bys[s]||[0,0];bys[s][1]++;if(r[i]===1)bys[s][0]++});
  $("exMeta").textContent=tl("{ok} / {n} correct · time used {a} of {b}",{ok,n,a:exClock(EX.usedMs),b:exClock(EX.total)})+
    (Object.keys(bys).length>1?" · "+tl("by {unit}: {list}",{unit:unit(0),list:Object.keys(bys).sort((a,b)=>a-b).map(s=>sLabel(s)+" "+bys[s][0]+"/"+bys[s][1]).join(", ")}):"");
  $("exMissBtn").hidden=ok===n;
  if(EX.grade>=10){sfx("win");confetti(EX.grade>=16?200:90)}else sfx("bad");
  renderExRev();
}
function renderExRev(){
  const r=EX.res,nBad=r.filter(x=>x!==1).length;if(!nBad)EX.rev="all";
  const rc=$("exRevChips");rc.textContent="";
  [["bad",tl("Mistakes ({n})",{n:nBad})],["all",tl("All questions ({n})",{n:r.length})]].forEach(([k,l])=>{if(k==="bad"&&!nBad)return;
    const b=el("button","chip",l);b.setAttribute("aria-pressed",EX.rev===k);b.onclick=()=>{EX.rev=k;renderExRev()};rc.appendChild(b)});
  const box=$("exRev");box.textContent="";
  EX.deck.forEach((d,i)=>{if(EX.rev==="bad"&&r[i]===1)return;
    const q=exQ(d),a=EX.ans[i],typed=d.t!=null,good=typed?q.a[0]:q.o[0];
    const it=el("div","ex-ri "+(r[i]===1?"ok":r[i]===0?"bad":"blank"));
    it.append(el("div","ex-rl",(i+1)+". "+sLabel(q.s)+" · "+(typed?tl("Typed answer"):q.t||tl("Multiple choice"))),el("div","ex-rq",q.q));
    const mine=r[i]===-1?tl("No answer"):typed?a.txt:q.o[d.o[a.c]];
    if(r[i]!==1)it.append(el("div","ex-ra mine",tl("Your answer: {a}",{a:mine})));
    it.append(el("div","ex-ra good",tl(r[i]===1?"Your answer: {a}":"Correct answer: {a}",{a:(r[i]===1&&typed?a.txt:good)})+(r[i]===1?" ✓":"")));
    if(q.e)it.append(el("p","ex-re",q.e));
    const why=r[i]===0?TipokiWhy.whyNot(BANK&&BANK.facts,mine):"";if(why)it.append(el("p","ex-re",why));
    box.appendChild(it)});
}
function exMissDeck(){return EX.deck.filter((d,i)=>EX.res[i]!==1).map(d=>d.t!=null?{t:d.t}:{id:d.id,o:Q[d.id].tf?tfOrder(Q[d.id]):shuffle([0,1,2,3])})}
function examBusy(){return EX.on&&!$("exam").hidden}
function exLeave(){EX.on=false;show("topic");renderExamPanel()}

$("exGo").onclick=startExam;
$("examJump").onclick=()=>$("examPanel").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
$("exPrev").onclick=()=>exGo(EX.i-1);
$("exNext").onclick=()=>EX.i>=EX.deck.length-1?exAsk("hand"):exGo(EX.i+1);
$("exSubmit").onclick=()=>exAsk("hand");
$("exQuit").onclick=()=>exAsk("quit");
$("exConfirmNo").onclick=()=>{$("exConfirm").hidden=true};
$("exConfirmOk").onclick=()=>{const k=$("exConfirm").dataset.kind;$("exConfirm").hidden=true;if(k==="quit")exLeave();else handInExam(false)};
$("exInput").addEventListener("input",e=>{if(!EX.on)return;const v=e.target.value.slice(0,80);EX.ans[EX.i]=v.trim()?{txt:v}:null;renderExGrid()});
$("exInput").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("exNext").click()}});
$("exRetake").onclick=startExam;
$("exMissBtn").onclick=()=>{const d=exMissDeck();if(d.length)startSolo(shuffle(d))};
$("exHome").onclick=exLeave;
document.addEventListener("keydown",e=>{
  if(!examBusy()||e.metaKey||e.ctrlKey||e.altKey||document.activeElement===$("exInput"))return;
  if(/^[1-4]$/.test(e.key)&&EX.deck[EX.i].t==null){e.preventDefault();const k=+e.key-1;if(k<EX.deck[EX.i].o.length)exPick(k)}
  else if(e.key==="ArrowRight"){e.preventDefault();exGo(EX.i+1)}
  else if(e.key==="ArrowLeft"){e.preventDefault();exGo(EX.i-1)}
});
window.addEventListener("beforeunload",e=>{if(examBusy()){e.preventDefault();e.returnValue=""}});
renderExamPanel();
