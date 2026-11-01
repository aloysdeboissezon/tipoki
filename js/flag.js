// ---------- flag a question to review later ----------
// star button on the question and answer screens; the flagged ones are listed on the quiz page and can be replayed.
// per quiz, localStorage lsKey("flag") = ["m12","t3"] (same keys as the missed list); synced like every tpk- key
(function(){
  const panel=$("flagPanel");if(!panel)return;
  const RUN=30;
  const store=()=>{try{const a=JSON.parse(lsGet(lsKey("flag"))||"[]");return Array.isArray(a)?a:[]}catch(e){return[]}};
  const live=()=>store().filter(k=>k[0]==="t"?TQ[+k.slice(1)]:Q[+k.slice(1)]);
  const qOfKey=k=>k[0]==="t"?TQ[+k.slice(1)]:Q[+k.slice(1)];
  function toggle(k){
    const s=store(),i=s.indexOf(k);if(i<0)s.push(k);else s.splice(i,1);
    lsSet(lsKey("flag"),JSON.stringify(s.slice(-300)));refreshAll();
  }
  // one star in each game screen
  const btns=[];
  function addBtn(sectionId,anchor){
    const host=document.querySelector("#"+sectionId+" .hud");if(!host)return;
    const b=el("button","flagbtn");b.type="button";b.onclick=()=>{if(G&&G.deck&&G.deck[G.qi])toggle(missKey(G.qi))};
    host.appendChild(b);btns.push(b);
  }
  addBtn("question");addBtn("reveal");
  function paintBtns(){
    if(!BANK||!G||!G.deck||!G.deck[G.qi])return;
    const on=store().includes(missKey(G.qi));
    btns.forEach(b=>{b.classList.toggle("on",on);b.setAttribute("aria-pressed",on);
      b.textContent=(on?"★ ":"☆ ")+tl(on?"Flagged":"Flag to review");
      b.title=tl(on?"Remove from your flagged questions":"Save this question to review it later")});
  }
  // list on the quiz page
  const list=$("flagList"),open=$("flagToggle");let shown=false;
  function paintPanel(){
    if(!BANK){panel.hidden=true;return}
    const ks=live(),n=ks.length;panel.hidden=!n;if(!n){shown=false;return}
    $("flagN").textContent=n;
    $("flagBtn").textContent=n>RUN?tl("Review {n}",{n:RUN}):tl(n===1?"Review it":"Review them");
    open.textContent=tl(shown?"Hide the list":"Show the list");open.setAttribute("aria-expanded",shown);
    list.hidden=!shown;list.textContent="";
    if(shown)ks.slice().reverse().forEach(k=>{
      const q=qOfKey(k),li=el("li","flagitem"),t=el("span","flagq",(q.q||"").replace(/\s+/g," ").slice(0,140));
      const x=el("button","linkbtn",tl("Remove"));x.type="button";x.onclick=()=>toggle(k);
      li.append(el("span","stag",sLabel(q.s)),t,x);list.appendChild(li)});
  }
  open.onclick=()=>{shown=!shown;paintPanel()};
  $("flagBtn").onclick=()=>{
    const ks=live();if(!ks.length)return;
    startSolo(shuffle(ks.slice()).slice(0,RUN).map(missItem))};
  function refreshAll(){paintBtns();paintPanel()}
  const rq=renderQuestion;renderQuestion=function(){rq();paintBtns()};
  const rr=renderReveal;renderReveal=function(){rr();paintBtns()};
  const rs=renderSettings;renderSettings=function(){rs();paintPanel()};
  refreshAll();
})();
