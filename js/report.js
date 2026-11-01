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

  // one-tap flag during the question: sends a report ("other") straight away, no menu
  const flag=$("qFlag");
  if(flag){
    function flagRefresh(){
      if(!G||!BANK||G.status!=="q"){return}
      const done=store().includes(missKey(G.qi));
      flag.classList.toggle("on",done);flag.disabled=done;
      flag.setAttribute("aria-label",done?tl("Thanks, reported"):tl("Report this question"));
    }
    flag.onclick=async()=>{
      if(!G||!BANK)return;
      const k=missKey(G.qi),s=store();
      if(s.includes(k))return;
      s.push(k);lsSet(lsKey("reported"),JSON.stringify(s.slice(-300)));
      flagRefresh();toast(tl("Thanks, reported"));
      try{await tpkInsert("question_reports",{quiz:BANK.id,q:k,reason:"other",player:me})}catch(err){}
    };
    const oq=renderQuestion;
    renderQuestion=function(){oq();flagRefresh()};
  }
})();
