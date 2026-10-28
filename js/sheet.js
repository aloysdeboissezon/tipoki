// study sheet: one scrollable, printable summary of the quiz, built from its flashcard facts (no AI call)
(function(){
  const btn=$("sheetBtn");
  let root=null,cover=false,lastFocus=null;

  function has(){return !!(BANK&&BANK.facts&&BANK.facts.length)}
  function accent(s){return "hsl("+((Number(s)*67+12)%360)+" 85% 78%)"}

  function build(){
    root=el("div","sheet");root.id="sheet";root.setAttribute("role","dialog");root.setAttribute("aria-modal","true");
    root.lang=BANK.lang||"fr";
    const facts=BANK.facts,known=(()=>{try{return fcStore()}catch(e){return {}}})();
    const groups=ALL_S.map(s=>({s,f:facts.filter(f=>Number(f[0])===s)})).filter(g=>g.f.length);
    const nKnown=facts.filter(f=>known[f[3]]===1).length;

    const bar=el("div","sh-bar");
    const close=el("button","btn ghost sh-close",tl("Close"));close.type="button";close.onclick=hide;
    const tools=el("div","sh-tools");
    const cv=el("button","chip",tl("Cover definitions"));cv.type="button";cv.setAttribute("aria-pressed",cover);
    cv.onclick=()=>{cover=!cover;cv.setAttribute("aria-pressed",cover);root.classList.toggle("covered",cover);root.querySelectorAll(".sh-n.open").forEach(n=>n.classList.remove("open"))};
    const pr=el("button","chip","PDF");pr.type="button";pr.onclick=()=>window.print();
    tools.append(cv,pr);bar.append(close,tools);

    const nav=el("nav","sh-nav");nav.setAttribute("aria-label",tl("Sections"));
    groups.forEach(g=>{const a=el("a","sh-jump",sLabel(g.s));a.href="#sh-s"+g.s;a.style.setProperty("--ac",accent(g.s));
      a.onclick=e=>{e.preventDefault();const t=root.querySelector("#sh-s"+g.s);if(t)t.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"})};nav.append(a)});

    const hero=el("header","sh-hero");
    hero.append(el("div","sh-kick",tl("Study sheet")),el("h2","sh-title",BANK.title));
    if(BANK.subject)hero.append(el("p","sh-sub",BANK.subject));
    const st=el("div","sh-stats");
    [[facts.length,tl(facts.length>1?"key notions":"key notion")],[groups.length,unit(groups.length>1?1:0)]].forEach(([n,l])=>{
      const d=el("div","sh-stat");d.append(el("b","",fmtN(n)),el("span","",l));st.append(d)});
    if(nKnown){const d=el("div","sh-stat ok");d.append(el("b","",fmtN(nKnown)),el("span","",tl("already known")));st.append(d)}
    hero.append(st);

    const body=el("main","sh-body");
    groups.forEach(g=>{
      const sec=el("section","sh-sec");sec.id="sh-s"+g.s;sec.style.setProperty("--ac",accent(g.s));
      const h=el("div","sh-sech");
      h.append(el("span","sh-num",String(g.s)));
      const ht=el("div","sh-sect");ht.append(el("h3","",SESS[g.s]||sLabel(g.s)),el("span","",tl(g.f.length>1?"{n} notions":"1 notion",{n:g.f.length})));
      h.append(ht);sec.append(h);
      const grid=el("div","sh-grid");
      g.f.forEach(f=>{
        const n=el("article","sh-n"+(f[2]==="p"?" who":"")+(known[f[3]]===1?" got":""));
        n.tabIndex=0;
        const top=el("div","sh-nt");
        top.append(el("h4","",f[3]));
        if(f[2]==="p")top.append(el("span","sh-tag",tl("Who")));
        n.append(top,el("p","sh-d",f[4]));
        if(f[5])n.append(el("div","sh-al",tl("Also: ")+f[5].split(";").join(" · ")));
        const tog=()=>{if(cover)n.classList.toggle("open")};
        n.onclick=tog;n.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();tog()}};
        grid.append(n);
      });
      sec.append(grid);body.append(sec);
    });
    const foot=el("div","sh-foot");
    const go=el("button","btn big",tl("Test yourself"));go.type="button";go.onclick=()=>{hide();$("createPanel").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"})};
    foot.append(el("p","muted",tl("Read it through once, then play a round to lock it in.")),go);
    body.append(foot);

    root.append(bar,nav,hero,body);
    root.classList.toggle("covered",cover);
    document.body.append(root);
  }

  function show(){
    if(!has())return;
    if(root)root.remove();
    build();lastFocus=document.activeElement;
    document.body.classList.add("sheet-open");
    root.scrollTop=0;root.querySelector(".sh-close").focus({preventScroll:true});
  }
  function hide(){
    if(!root)return;
    root.remove();root=null;document.body.classList.remove("sheet-open");
    if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true});
  }
  btn.onclick=show;
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&root)hide()});
  const old=window.renderBankUI;
  window.renderBankUI=function(){old.apply(this,arguments);btn.hidden=!has();if(root)hide()};
  btn.hidden=!(BANK&&has());
})();
