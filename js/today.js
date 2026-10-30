// ---------- "Today": one place that says what to do now (cards due + weak points + exam date) ----------
// reads the other features' data (flashcard schedule, weak points, exam planner), stores nothing itself
(function(){
  const panel=$("todayPanel");if(!panel)return;
  const RUN=10;
  function dueCards(){const sr=fcSrStore();return (BANK.facts||[]).filter(f=>{const e=sr[f[3]];return e&&e.d<=Date.now()})}
  function weakKeys(){return wkList().sort((a,b)=>b.score-a.score).slice(0,RUN).map(x=>x.k)}
  function render(){
    if(!BANK){panel.hidden=true;return}
    const cards=dueCards(),weak=wkList().length,miss=missLive().length,p=planGet();
    const dl=p.date?planDaysLeft(p.date):-1;
    const qs=weak?weakKeys().length:Math.min(RUN,miss);
    panel.hidden=!(cards.length||qs);
    if(panel.hidden)return;
    const bits=[];
    if(cards.length)bits.push(tl(cards.length===1?"1 card to review":"{n} cards to review",{n:cards.length}));
    if(weak)bits.push(tl(weak===1?"1 weak point":"{n} weak points",{n:weak}));
    else if(miss)bits.push(tl(miss===1?"1 missed question":"{n} missed questions",{n:miss}));
    if(dl>=0)bits.push(dl===0?tl("exam today"):tl(dl===1?"exam tomorrow":"exam in {n} days",{n:dl}));
    $("todaySub").textContent=bits.join(" · ");
    $("todayCards").hidden=!cards.length;
    $("todayCards").textContent=tl("Review {n} cards",{n:Math.min(cards.length,30)});
    $("todayQs").hidden=!qs;
    $("todayQs").textContent=tl("Train {n} questions",{n:qs});
  }
  $("todayCards").onclick=()=>{const l=dueCards();if(!l.length)return;settings.fcOrd="shuffle";startCards(shuffle(l).slice(0,30))};
  $("todayQs").onclick=()=>{const ks=weakKeys();const keys=ks.length?ks:shuffle(missLive()).slice(0,RUN);if(keys.length)startSolo(shuffle(keys.map(missItem)))};
  const o1=renderSettings;renderSettings=function(){o1();render()};
  const o2=renderCardsPanel;renderCardsPanel=function(){o2();render()};
  render();
})();
