// Motion layer: GSAP for screen entrances and the hero title, Lenis for smooth scrolling on desktop, small pointer effects in the style of React Bits.
// Everything is progressive: content is visible by default, so if a script is missing or the visitor prefers reduced motion, nothing is hidden or lost.
(function(){
  "use strict";
  const RM=matchMedia("(prefers-reduced-motion: reduce)");
  const FINE=matchMedia("(hover: hover) and (pointer: fine)").matches;
  const g=window.gsap;
  const $=id=>document.getElementById(id);
  const ease="power3.out"; // GSAP's closest match to the site's --ease-out

  // ---- pointer: spotlight on tiles, light tilt on the quiz-page squares (fine pointers only) ----
  if(FINE){
    const TILT=".mcard";
    document.addEventListener("pointermove",e=>{
      const t=e.target.closest&&e.target.closest(".qcard,.qchip,.sctile,.mcard");
      if(!t)return;
      const r=t.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
      t.style.setProperty("--mx",x+"px");t.style.setProperty("--my",y+"px");
      if(!RM.matches&&t.matches(TILT)){
        t.style.setProperty("--ry",((x/r.width-.5)*7).toFixed(2)+"deg");
        t.style.setProperty("--rx",((.5-y/r.height)*7).toFixed(2)+"deg");
      }
    },{passive:true});
    document.addEventListener("pointerout",e=>{
      const t=e.target.closest&&e.target.closest(".mcard");
      if(t&&!t.contains(e.relatedTarget)){t.style.removeProperty("--rx");t.style.removeProperty("--ry")}
    },{passive:true});
  }

  if(!g)return;

  // ---- smooth scroll: desktop with a mouse only; phones keep native momentum scrolling ----
  let lenis=null;
  function startLenis(){
    if(lenis||!window.Lenis||!FINE||innerWidth<900||RM.matches)return;
    lenis=new Lenis({duration:1.05,easing:t=>1-Math.pow(1-t,4),smoothWheel:true,allowNestedScroll:true});
    g.ticker.add(t=>lenis.raf(t*1000));g.ticker.lagSmoothing(0);
  }
  function stopLenis(){if(lenis){lenis.destroy();lenis=null}}
  startLenis();
  RM.addEventListener&&RM.addEventListener("change",()=>RM.matches?stopLenis():startLenis());
  ["music","tourModal"].forEach(id=>{const n=$(id);if(n)n.setAttribute("data-lenis-prevent","")});

  // ---- hero title: words rise out of a mask, once per visit ----
  let heroDone=false;
  function heroWords(){
    if(heroDone||RM.matches)return;
    const h=document.querySelector(".hero h1");
    if(!h||h.children.length||!h.textContent.trim())return;
    heroDone=true;
    const text=h.textContent.trim();
    h.setAttribute("aria-label",text);
    h.textContent="";
    const inner=[];
    text.split(/\s+/).forEach((w,i,a)=>{
      const o=document.createElement("span");o.className="w";o.setAttribute("aria-hidden","true");
      const s=document.createElement("span");s.textContent=w;o.appendChild(s);h.appendChild(o);inner.push(s);
      if(i<a.length-1)h.appendChild(document.createTextNode(" "));
    });
    g.fromTo(inner,{yPercent:110},{yPercent:0,duration:.8,ease,stagger:.07,clearProps:"transform",delay:.05});
  }

  // ---- screen entrances: children of a screen rise in with a short stagger (not on question/reveal: those repeat all game long) ----
  const FIXED_KIDS="createPanel,examPanel,cardsPanel"; // hold position:fixed bars, a transform on them would break pinning
  function enter(sec){
    if(RM.matches||!sec||sec.hidden)return;
    const kids=[...sec.children].filter(k=>!k.hidden&&k.offsetParent!==null&&!k.matches("script,style"));
    if(!kids.length)return;
    const fixedKids=kids.filter(k=>FIXED_KIDS.includes(k.id)),moving=kids.filter(k=>!fixedKids.includes(k));
    g.killTweensOf(kids);
    g.fromTo(moving,{opacity:0,y:18},{opacity:1,y:0,duration:.5,ease,stagger:.05,clearProps:"transform,opacity"});
    if(fixedKids.length)g.fromTo(fixedKids,{opacity:0},{opacity:1,duration:.35,ease:"power2.out",clearProps:"opacity"});
    if(sec.id==="home")heroWords();
    if(sec.id==="end")endFlourish(sec);
  }
  // end screen: the podium columns grow (CSS) and the score title lands with a little weight
  function endFlourish(sec){
    const t=$("endTitle");
    if(t)g.fromTo(t,{scale:.86,opacity:0},{scale:1,opacity:1,duration:.7,ease,clearProps:"transform,opacity"});
  }

  const watch=["home","topic","lobby","end"];
  watch.forEach(id=>{
    const s=$(id);if(!s)return;
    new MutationObserver(m=>{
      for(const r of m){
        if(r.attributeName==="hidden"&&!s.hidden){enter(s);break}
        if(r.attributeName==="data-mode"&&id==="topic"&&!s.hidden){enter(s);break}
      }
    }).observe(s,{attributes:true,attributeFilter:["hidden","data-mode"]});
  });

  // first paint of the home screen
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>enter($("home")));
  else enter($("home"));
  // the hero text can be re-written by the language switcher after load: only the first render is animated
})();
