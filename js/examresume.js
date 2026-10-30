// ---------- exam in progress survives a refresh, a phone call, a closed tab ----------
// device-only localStorage key "tpk-examrun" = {bank, EX}; the clock is real time (EX.endAt), so time keeps running while away.
// Saved every second while an exam is on; removed when it is handed in or quit.
(function(){
  const KEY="tpk-examrun",MAX_AGE=12*36e5;
  let wasOn=false,last="";
  function load(){try{const s=JSON.parse(lsGet(KEY)||"null");if(s&&s.bank&&s.ex&&s.ex.deck&&Date.now()-s.ex.startAt<MAX_AGE)return s}catch(e){}return null}
  function drop(){try{localStorage.removeItem(KEY)}catch(e){}last=""}
  setInterval(()=>{
    if(EX.on){wasOn=true;
      const j=JSON.stringify({bank:BANK.id,ex:{deck:EX.deck,ans:EX.ans,i:EX.i,endAt:EX.endAt,startAt:EX.startAt,total:EX.total}});
      if(j!==last){last=j;lsSet(KEY,j)}}
    else if(wasOn){wasOn=false;drop()}
  },1000);
  const box=document.createElement("div");box.className="ex-resume";box.hidden=true;
  box.innerHTML='<span id="exResumeTxt"></span><button class="btn dark" id="exResumeGo" type="button"></button><button class="btn ghost" id="exResumeDrop" type="button"></button>';
  const panel=$("examPanel");panel.insertBefore(box,panel.children[1]);
  function render(){
    const s=load();box.hidden=!(s&&BANK&&s.bank===BANK.id&&!EX.on);if(box.hidden)return;
    const left=s.ex.total?s.ex.endAt-Date.now():0,done=s.ex.ans.filter(exAnswered).length;
    $("exResumeTxt").textContent=tl("Exam in progress: {a} / {n} answered",{a:done,n:s.ex.deck.length})+(s.ex.total?" · "+(left>0?tl("{t} left",{t:exClock(left)}):tl("time is up")):"");
    $("exResumeGo").textContent=s.ex.total&&left<=0?tl("See my result"):tl("Resume");
    $("exResumeDrop").textContent=tl("Discard");
  }
  $("exResumeGo").onclick=()=>{
    const s=load();if(!s||s.bank!==BANK.id)return;
    EX={deck:s.ex.deck,ans:s.ex.ans,i:Math.min(s.ex.i,s.ex.deck.length-1),startAt:s.ex.startAt,endAt:s.ex.endAt,total:s.ex.total,on:true,timeUp:false,rev:"bad"};
    $("exBar").parentNode.hidden=!EX.total;$("exClock").setAttribute("aria-label",EX.total?tl("Time left"):tl("Time elapsed"));
    show("exam");$("exPlay").hidden=false;$("exDone").hidden=true;$("exConfirm").hidden=true;
    wasOn=true;renderExQ();exTick();
    if(EX.total&&EX.endAt<=Date.now())handInExam(true);
  };
  $("exResumeDrop").onclick=()=>{drop();render()};
  const o=renderExamPanel;renderExamPanel=function(){o();render()};
  render();
})();
