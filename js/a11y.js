// ---------- accessibility layer: screen reader announcements, labelled answers, A-D keys ----------
// wraps the render functions of app.js, so the game code itself stays untouched
(function(){
  const live=document.createElement("div");live.className="sr-only";live.id="srLive";live.setAttribute("role","status");live.setAttribute("aria-live","polite");document.body.appendChild(live);
  function say(t){live.textContent="";setTimeout(()=>{live.textContent=t},60)}
  const qt=$("qTimer");if(qt){qt.setAttribute("role","timer");qt.setAttribute("aria-label",tl("Time left"))}
  const tiles=$("qTiles"),rt=$("rTiles");
  if(tiles){tiles.setAttribute("role","group");tiles.setAttribute("aria-label",tl("Answers, press 1 to 4 or A to D")) }
  if(rt){rt.setAttribute("role","group");rt.setAttribute("aria-label",tl("Answers"))}
  const rq=renderQuestion;
  renderQuestion=function(){
    rq();
    const typed=isT(G.qi);
    say(tl("Question {i} of {n}",{i:G.qi+1,n:G.inf?"∞":G.deck.length})+". "+$("qText").textContent);
    if(!typed)$("qTiles").querySelectorAll(".tile").forEach(b=>b.setAttribute("aria-label",b.textContent.replace(/^([A-D])/,"$1: ")));
  };
  const rr=renderReveal;
  renderReveal=function(){
    rr();
    $("rTiles").querySelectorAll(".tile").forEach(b=>{
      const extra=b.classList.contains("right")?tl("correct answer"):b.classList.contains("mine")?tl("your answer, wrong"):"";
      b.setAttribute("aria-label",b.textContent.replace(/^([A-D])/,"$1: ")+(extra?" ("+extra+")":""));
    });
  };
  // A-D answer like 1-4 (not while typing, not with a modifier key)
  document.addEventListener("keydown",e=>{
    if(e.ctrlKey||e.metaKey||e.altKey||$("question").hidden)return;
    const k=e.key.toLowerCase();
    if(!/^[a-d]$/.test(k)||/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName))return;
    pick(k.charCodeAt(0)-97);
  });
})();
