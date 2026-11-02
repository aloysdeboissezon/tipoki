// ---------- end ----------
function renderEnd(){
  show("end");
  const t=totals(G.deck.length-1);
  const myRank=t.findIndex(r=>r.id===me)+1;
  const from=mode==="multi"&&local.joinQi||0;   // joined mid-game: the questions before you arrived don't count as misses
  const correct=G.deck.filter((d,i)=>isRight(P[me]&&P[me].ans&&P[me].ans[i],i)).length;
  $("endTitle").textContent=mode==="solo"?tl("{c} / {n} correct answers",{c:correct,n:G.deck.length}):myRank<1?tl("Game over"):(myRank===1?tl("You win!"):tl("You finished {rank}",{rank:ordinal(myRank)}));
  const bys={};G.deck.forEach((d,i)=>{if(i<from)return;const s=(d.t!=null?TQ[d.t]:Q[d.id]).s;bys[s]=bys[s]||[0,0];bys[s][1]++;if(isRight(P[me]&&P[me].ans&&P[me].ans[i],i))bys[s][0]++});
  $("endSess").textContent=tl("Your score by {unit}: {list}",{unit:unit(0),list:Object.keys(bys).sort((a,b)=>a-b).map(s=>sLabel(s)+" "+bys[s][0]+"/"+bys[s][1]).join(" · ")});
  const pod=$("podium");pod.textContent="";pod.hidden=mode==="solo";
  [1,0,2].forEach(i=>{const r=t[i];const d=el("div","pod p"+(i+1));if(r){d.append(avatar(r.id,nameOf(r.id)),el("div","nm",nameOf(r.id)),el("div","pts",r.t+" pts"))}d.appendChild(el("div","blk",r?String(i+1):""));pod.appendChild(d)});
  renderBoard($("endBoard"),t,false);
  if(typeof recordPlay==="function")recordPlay();
  if(local.confEnd!==G.created){local.confEnd=G.created;
    const r={c:correct,n:G.deck.length-from,pts:(t.find(x=>x.id===me)||{t:0}).t},played=!!P[me],prev=!played||G.review?bestOf(BANK.id):recordGame(BANK.id,r);
    local.endRes=played?{r,prev,newDay:markStudyDay()}:null;if(played)addDaily(r.n);
    // light confetti, a bigger burst for a new record or a win
    const big=(!G.review&&r.n>=BEST_MIN&&prev&&beats(r,prev))||(mode==="multi"&&myRank===1);
    if(big||(played&&r.c*2>=r.n))setTimeout(()=>confetti(big?160:60),300);sfx("win")}
  renderEndProgress();
  const miss=$("endMiss");miss.textContent="";
  G.deck.forEach((d,i)=>{const a=P[me]&&P[me].ans&&P[me].ans[i];if(i<from||isRight(a,i))return;const q=qOf(i);
    const x=el("div");x.append(el("div","label",sLabel(q.s)+" · "+(d.t!=null?tl("Typed answer"):q.t)),el("div",null,q.q),el("div","a","→ "+(d.t!=null?q.a[0]:q.o[q.a])));miss.appendChild(x)});
  $("endMissWrap").hidden=!miss.children.length;
  $("endAgain").hidden=!isHost();$("endAgain").textContent=mode==="solo"?tl("Play again"):tl("Rematch");$("endWait").hidden=isHost()||mode!=="multi";
  const k=miss.children.length,n=missLive().length;
  $("endBankBtn").hidden=!n;$("endBankBtn").textContent=tl("Replay my missed questions ({n})",{n});
  $("endMissBtn").hidden=!k||k>=n||G.miss;$("endMissBtn").textContent=k===1?tl("Replay this game's mistake"):tl("Replay this game's {n} mistakes",{n:k});
  if(G.miss){const fixed=G.deck.length-k;   // a missed-questions replay: say how much of the list got cleared
    $("endAgain").hidden=!!n;   // replaying what is left comes first
    $("endTitle").textContent=n?tl("{c} / {n} cleared",{c:fixed,n:G.deck.length}):tl("All cleared!");
    $("endSess").textContent=n?(n===1?tl("1 missed question left"):tl("{n} missed questions left",{n}))+". "+tl("Answer one right and it leaves the list."):tl("No missed questions left on this quiz. Nice work.")}
}
$("endHome").onclick=()=>leaveGame(false);
$("endBankBtn").onclick=()=>playMissed(G.deck.map((d,i)=>i<(mode==="multi"&&local.joinQi||0)||isRight(P[me]&&P[me].ans&&P[me].ans[i],i)?null:d.t!=null?"t"+d.t:"m"+d.id).filter(Boolean));
$("endMissBtn").onclick=()=>{const from=mode==="multi"&&local.joinQi||0;const deck=G.deck.filter((d,i)=>i>=from&&!isRight(P[me]&&P[me].ans&&P[me].ans[i],i)).map(d=>d.t!=null?{t:d.t}:{id:d.id,o:shuffle(d.o)});
  const fix=deck.map(d=>d.t==null&&Q[d.id].tf?{id:d.id,o:tfOrder(Q[d.id])}:d);if(fix.length)startSolo(shuffle(fix))};
$("endAgain").onclick=async()=>{
  if(mode==="solo"){startSolo();return}
  $("endAgain").disabled=true;
  try{
    const g={host:me,hostNick:myNick(),bank:BANK.id,bankTitle:BANK.title,status:"lobby",qi:0,deck:buildDeck(G.sess,G.inf?LEN_INF:G.deck.length,G.fmt||"mcq",{diff:G.diff}),T:G.T,created:Date.now(),seq:1,sess:G.sess,fmt:G.fmt,diff:G.diff,inf:!!G.inf};
    const c=await insertGame(g);
    await writeGame({next:c});
    await writeChain;
    await joinGame(c);
  }catch(e){toast(tl("Couldn't start a rematch, try again."))}
  finally{$("endAgain").disabled=false}
};
document.addEventListener("keydown",e=>{
  if(!$("question").hidden&&/^[1-4]$/.test(e.key)&&document.activeElement!==$("qInput"))pick(+e.key-1);
  else if(!$("reveal").hidden&&e.key==="Enter"&&isHost()&&!$("rNext").hidden)$("rNext").click();
});
// ---------- flashcards (built from the quiz's facts: term on one side, definition on the other) ----------
let FC={deck:[],i:0,flip:false,res:{}};
function fcStore(){try{return JSON.parse(lsGet(lsKey("cards"))||"{}")}catch(e){return {}}}   // term -> 1 got it, 0 not yet
// spaced repetition (Leitner boxes) kept apart from the 1/0 above: term -> {b: box, d: due timestamp, t: last review}
const FC_GAPS=[0,1,3,7,16,35],FC_SOON=10*60e3,FC_DAY=864e5;   // days between reviews per box; a missed card is back in 10 min
function fcSrStore(){try{return JSON.parse(lsGet(lsKey("cards-sr"))||"{}")}catch(e){return {}}}
function fcDue(f,sr){const e=sr[f[3]];return !e||e.d<=Date.now()}   // never scheduled (new, or studied before this update) = due
function fcSchedule(f,ok){const sr=fcSrStore(),st=fcStore(),e=sr[f[3]],now=Date.now();
  let b=e?e.b:(st[f[3]]===1?1:0);b=ok?Math.min(b+1,FC_GAPS.length-1):0;
  sr[f[3]]={b,d:now+(ok?FC_GAPS[b]*FC_DAY:FC_SOON),t:now};lsSet(lsKey("cards-sr"),JSON.stringify(sr))}
function fcWhen(d){const m=Math.round((d-Date.now())/6e4);return m<=0?tl("now"):m<60?tl("in {n} min",{n:m}):m<2880?tl("in {n} h",{n:Math.round(m/60)}):tl("in {n} days",{n:Math.round(m/1440)})}
function fcMark(f,ok){fcSchedule(f,ok);const st=fcStore();st[f[3]]=ok?1:0;lsSet(lsKey("cards"),JSON.stringify(st));markStudyDay();addDaily(1)}
function fcPool(){return (BANK.facts||[]).filter(f=>settings.sess.has(Number(f[0])))}
function fcPick(){const st=fcStore(),pool=fcPool();
  if(settings.fcSet==="due"){const sr=fcSrStore();return pool.filter(f=>fcDue(f,sr))}
  return settings.fcSet==="todo"?pool.filter(f=>st[f[3]]!==1):settings.fcSet==="bad"?pool.filter(f=>st[f[3]]===0):pool}
function renderCardsPanel(){
  const has=!!(BANK&&BANK.facts&&BANK.facts.length);$("cardsPanel").hidden=$("cardsJump").hidden=!has;if(!has)return;
  const st=fcStore(),pool=fcPool(),nTodo=pool.filter(f=>st[f[3]]!==1).length,nBad=pool.filter(f=>st[f[3]]===0).length;
  const sr=fcSrStore(),nDue=pool.filter(f=>fcDue(f,sr)).length;
  if(settings.fcSet==="bad"&&!nBad||settings.fcSet==="due"&&!nDue)settings.fcSet="all";
  $("fcUnits").textContent=unit(1);
  const chips=(box,key,opts)=>{const c=$(box);c.textContent="";opts.forEach(([k,l,t])=>{const b=el("button","chip",l);if(t)b.title=t;b.setAttribute("aria-pressed",settings[key]===k);b.onclick=()=>{settings[key]=k;renderCardsPanel()};c.appendChild(b)})};
  chips("fcSideChips","fcSide",[["term",tl("Term")],["def",tl("Definition")]]);
  const sets=[["due",tl("Due now ({n})",{n:nDue}),tl("Cards you have not seen, plus the ones whose review time has come")],["all",tl("All ({n})",{n:pool.length})],["todo",tl("Not known yet ({n})",{n:nTodo}),tl("Skips the cards you marked “Got it”")]];
  if(nBad)sets.push(["bad",tl("To review ({n})",{n:nBad}),tl("Only the cards you marked “Not yet”")]);
  chips("fcSetChips","fcSet",sets);
  const later=pool.map(f=>sr[f[3]]).filter(e=>e&&e.d>Date.now()).map(e=>e.d);
  $("fcNext").textContent=!nDue&&later.length?tl("All caught up! Next review {when}.",{when:fcWhen(Math.min(...later))}):"";
  chips("fcOrdChips","fcOrd",[["shuffle",tl("Shuffled")],["course",tl("Course order")]]);
  const n=fcPick().length;$("fcGo").textContent=n?tl(n>1?"Study {n} cards":"Study 1 card",{n}):tl("Study flashcards");
  showErr("fcErr","");
}
function startCards(list){
  if(!list){if(!settings.sess.size){showErr("fcErr",tl("Choose at least {unit}.",{unit:unit(2)}));return}
    list=fcPick();if(!list.length){showErr("fcErr",settings.fcSet==="all"?tl("No cards in these {units}.",{units:unit(1)}):tl("Nothing to review right now. Pick “All” to go through them again."));return}}
  list=settings.fcOrd==="course"?list.slice().sort((a,b)=>a[0]-b[0]):shuffle(list);
  FC={deck:list,i:0,flip:false,res:{}};
  show("cards");renderCard();
}
function renderCard(){
  const n=FC.deck.length,done=FC.i>=n;
  $("fcPlay").hidden=done;$("fcDone").hidden=!done;
  $("fcBar").style.width=(100*Math.min(FC.i,n)/n)+"%";
  if(done){
    const bad=FC.deck.filter((f,i)=>FC.res[i]===0).length,ok=n-bad;
    $("fcSess").hidden=true;$("fcNum").textContent=tl(n>1?"{n} cards studied":"1 card studied",{n});
    $("fcDoneTitle").textContent=bad?tl(bad>1?"Round done! {n} cards to go over again.":"Round done! 1 card to go over again.",{n:bad}):tl("Round done! You know them all.");
    $("fcDoneOk").textContent=ok;$("fcDoneBad").textContent=bad;
    $("fcRedo").hidden=!bad;$("fcRedo").textContent=tl("Review the {n} again",{n:bad});
    if(!bad){sfx("win");confetti(80)}
    return;
  }
  const f=FC.deck[FC.i],P=f[2]==="p",term=f[3],def=f[4],byDef=settings.fcSide==="def";
  $("fcSess").hidden=false;$("fcSess").textContent=sLabel(f[0]);$("fcSess").title=SESS[f[0]]||"";
  $("fcNum").textContent=tl("Card {i} / {n}",{i:FC.i+1,n});
  $("fcKindF").textContent=byDef?(P?tl("Who is it?"):tl("Which concept?")):(P?tl("Person"):tl("Concept"));
  $("fcKindB").textContent=byDef?(P?tl("Person"):tl("Concept")):tl("Definition");
  $("fcFront").textContent=byDef?def:term;$("fcBack").textContent=byDef?term:def;$("fcBackSub").textContent=byDef?def:term;
  $("fcCard").classList.toggle("def",byDef);
  fcSetFlip(false,true);
  $("fcPrev").disabled=FC.i===0;
}
function fcSetFlip(v,instant){
  FC.flip=v;const c=$("fcCard");
  if(instant){c.classList.add("noanim");c.style.transform="";void c.offsetWidth}
  c.classList.toggle("flipped",v);c.setAttribute("aria-label",v?tl("Answer shown"):tl("Flip the card"));
  if(instant)requestAnimationFrame(()=>c.classList.remove("noanim"));
  $("fcFlip").hidden=v;$("fcAgain").hidden=!v;$("fcGot").hidden=!v;
}
function fcAnswer(ok){
  if(!FC.flip||FC.i>=FC.deck.length)return;
  FC.res[FC.i]=ok?1:0;fcMark(FC.deck[FC.i],ok);buzz(ok?15:[10,40,10]);
  const c=$("fcCard");c.classList.add(ok?"out-r":"out-l");
  setTimeout(()=>{c.classList.remove("out-r","out-l");FC.i++;renderCard()},RM?0:220);
}
$("fcGo").onclick=()=>startCards();

$("fcCard").onclick=()=>{if(fcDrag.moved)return;fcSetFlip(!FC.flip)};
$("fcFlip").onclick=()=>fcSetFlip(true);
$("fcGot").onclick=()=>fcAnswer(true);
$("fcAgain").onclick=()=>fcAnswer(false);
$("fcPrev").onclick=()=>{if(FC.i>0){FC.i--;renderCard()}};
$("fcRedo").onclick=()=>startCards(FC.deck.filter((f,i)=>FC.res[i]===0));
$("fcRestart").onclick=()=>startCards(FC.deck.slice());
$("fcQuit").onclick=$("fcHome").onclick=()=>{show("topic");renderCardsPanel()};
// swipe the flipped card: right = got it, left = not yet
const fcDrag={x:0,y:0,on:false,moved:false};
$("fcCard").addEventListener("pointerdown",e=>{fcDrag.on=true;fcDrag.moved=false;fcDrag.x=e.clientX;fcDrag.y=e.clientY});
$("fcCard").addEventListener("pointermove",e=>{if(!fcDrag.on||!FC.flip)return;const dx=e.clientX-fcDrag.x;
  if(!fcDrag.moved&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(e.clientY-fcDrag.y)){fcDrag.moved=true;try{$("fcCard").setPointerCapture(e.pointerId)}catch(err){}}
  if(fcDrag.moved){const c=$("fcCard");c.classList.add("noanim");c.style.transform="translateX("+dx+"px) rotate("+(dx/20)+"deg) rotateY(180deg)";c.dataset.swipe=dx>40?"ok":dx<-40?"bad":""}});
function fcDragEnd(e){if(!fcDrag.on)return;fcDrag.on=false;if(!fcDrag.moved)return;
  const c=$("fcCard"),dx=e.clientX-fcDrag.x;c.classList.remove("noanim");c.style.transform="";delete c.dataset.swipe;
  if(Math.abs(dx)>90)fcAnswer(dx>0);
  setTimeout(()=>{fcDrag.moved=false},0)}
$("fcCard").addEventListener("pointerup",fcDragEnd);
$("fcCard").addEventListener("pointercancel",fcDragEnd);
document.addEventListener("keydown",e=>{
  if($("cards").hidden||!$("fcDone").hidden||e.metaKey||e.ctrlKey||e.altKey)return;
  const onBtn=document.activeElement&&document.activeElement.tagName==="BUTTON";   // a focused button already reacts to Space / Enter
  if((e.key===" "||e.key==="Enter")&&!onBtn){e.preventDefault();fcSetFlip(!FC.flip)}
  else if(e.key==="ArrowRight"){e.preventDefault();FC.flip?fcAnswer(true):fcSetFlip(true)}
  else if(e.key==="ArrowLeft"){e.preventDefault();FC.flip?fcAnswer(false):$("fcPrev").click()}
});
