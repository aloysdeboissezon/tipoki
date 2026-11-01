// ---------- report a doubtful question ----------
// button on the answer screen -> one row in public.question_reports (see supabase/migrations/add_question_reports.sql)
// a device never reports the same question twice: localStorage lsKey("reported") = ["m12","t3"]
(function(){
  const box=$("rReportBox"),btn=$("rReport"),pick=$("rReportPick");
  if(!box||!btn||!pick)return;
  const store=()=>{try{return JSON.parse(lsGet(lsKey("reported"))||"[]")}catch(e){return[]}};
  function refresh(){
    if(!G||!BANK||G.status!=="reveal"){box.hidden=true;return}
    const k=missKey(G.qi),done=store().includes(k);
    box.hidden=false;pick.hidden=true;btn.hidden=false;btn.disabled=done;
    btn.textContent=done?tl("Thanks, reported"):tl("Report this question");
  }
  btn.onclick=()=>{pick.hidden=!pick.hidden;btn.setAttribute("aria-expanded",!pick.hidden)};
  pick.addEventListener("click",async e=>{
    const b=e.target.closest("[data-why]");if(!b)return;
    const k=missKey(G.qi),why=b.dataset.why;
    const s=store();if(!s.includes(k)){s.push(k);lsSet(lsKey("reported"),JSON.stringify(s.slice(-300)))}
    pick.hidden=true;btn.disabled=true;btn.textContent=tl("Thanks, reported");
    try{await tpkInsert("question_reports",{quiz:BANK.id,q:k,reason:why,player:me})}catch(err){}
  });
  const orig=renderReveal;
  renderReveal=function(){orig();refresh()};

  // flag during the question: tapping it pauses the timer and opens the reasons; picking one sends the report and resumes
  const flag=$("qFlag"),pbox=$("qPauseBox");
  if(flag&&pbox){
    function flagRefresh(){
      if(!G||!BANK||G.status!=="q")return;
      const done=store().includes(missKey(G.qi));
      flag.classList.toggle("on",done);flag.disabled=done;
      flag.setAttribute("aria-label",done?tl("Thanks, reported"):tl("Report this question"));
    }
    function resume(){
      if(local.qPause){local.shownAt+=performance.now()-local.qPause;local.qPause=0}
      pbox.hidden=true;document.body.classList.remove("qpaused");
    }
    flag.onclick=()=>{
      if(!G||!BANK||G.status!=="q"||local.qPause||myAns())return;
      local.qPause=performance.now();pbox.hidden=false;document.body.classList.add("qpaused");
    };
    $("qPauseBack").onclick=resume;
    pbox.addEventListener("click",async e=>{
      const b=e.target.closest("[data-why]");if(!b)return;
      const k=missKey(G.qi),why=b.dataset.why,s=store();
      if(!s.includes(k)){s.push(k);lsSet(lsKey("reported"),JSON.stringify(s.slice(-300)))}
      resume();flagRefresh();toast(tl("Thanks, reported"));
      try{await tpkInsert("question_reports",{quiz:BANK.id,q:k,reason:why,player:me})}catch(err){}
    });
    const oq=renderQuestion;
    renderQuestion=function(){
      if(local.qPause&&local.goQ!==G.qi){local.qPause=0;pbox.hidden=true;document.body.classList.remove("qpaused")}
      oq();flagRefresh();
    };
  }
})();
