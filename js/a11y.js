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

  // ---- skip link: first tab stop, jumps to the visible screen ----
  const skip=document.createElement("a");skip.className="skip-link";skip.href="#main";skip.textContent=tl("Skip to content");
  skip.onclick=e=>{e.preventDefault();focusScreen(true)};
  document.body.insertBefore(skip,document.body.firstChild);

  // ---- text size: 100 / 115 / 130 % (zoom on body, see css/a11y.css) ----
  const sb=$("sizeBtn"),SZ=[100,115,130],root=document.documentElement;
  function sizeNow(){const v=+root.getAttribute("data-tsize")||0;return v>=0&&v<3?v:0}
  function syncSize(){const l=sizeNow(),t=tl("Text size {n}%",{n:SZ[l]});sb.dataset.level=l;sb.title=t;sb.setAttribute("aria-label",t)}
  if(sb){sb.onclick=()=>{const l=(sizeNow()+1)%3;if(l)root.setAttribute("data-tsize",l);else root.removeAttribute("data-tsize");try{localStorage.setItem("tpk-tsize",l)}catch(e){}syncSize();say(tl("Text size {n}%",{n:SZ[l]}))};syncSize()}

  // ---- screen changes: move the focus to the new screen's heading so keyboard and screen-reader users are not left behind ----
  function focusScreen(force){
    const sec=[...document.querySelectorAll(".wrap > section")].find(s=>!s.hidden&&s.offsetParent!==null);if(!sec)return;
    if(!force&&/^(question|reveal)$/.test(sec.id))return;   // the question is announced by the live region, keep the answer keys working
    const h=sec.querySelector("h1,h2,h3")||sec;if(!h.hasAttribute("tabindex"))h.setAttribute("tabindex","-1");
    h.focus({preventScroll:true});
  }
  let first=true;const sh=show;
  show=function(id){sh(id);if(first){first=false;return}setTimeout(()=>focusScreen(false),30)};
  window.show=show;

  // ---- names for controls that only have a placeholder or an icon ----
  [["nick"],["qInput"],["stCode"],["codeIn"]].forEach(([id])=>{const e=$(id);if(e&&!e.getAttribute("aria-label")&&!document.querySelector('label[for="'+id+'"]')){const t=e.getAttribute("placeholder")||e.title;if(t)e.setAttribute("aria-label",t)}});
  const lb=$("langBtn");if(lb&&!lb.getAttribute("aria-label")){lb.setAttribute("aria-label",tl("Language"))}
  // file pickers hide their <input>: make the label itself a keyboard button
  document.querySelectorAll("label.drop,label.pfp").forEach(l=>{
    const inp=l.querySelector("input[type=file]");if(!inp)return;
    l.tabIndex=0;l.setAttribute("role","button");
    l.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();inp.click()}});
  });
})();
