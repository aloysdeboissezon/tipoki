// study sheet: a styled, A4-style revision document per quiz. The text is written by hand (js/sheets/<quiz id>.js, window.SHEETS[id]);
// the PDF next to it (sheets/<quiz id>.pdf) is produced from this same rendering by tools/make-pdfs.js
(function(){
  const btn=$("sheetBtn");
  let root=null,lastFocus=null;
  const get=()=>BANK&&window.SHEETS&&window.SHEETS[BANK.id];

  // blocks: p, h3, dl (term / definition rows), ul, ol, formula, key (to remember), table, ex (worked example)
  // the document speaks the quiz's language, whatever the interface language is
  const L={fr:{key:"À retenir",ex:"Exemple chiffré",toc:"Sommaire",end:"Relis-la une fois, puis fais une partie pour bien l'ancrer."},en:{key:"Key takeaways",ex:"Worked example",toc:"Contents",end:"Read it through once, then play a round to lock it in."}};
  let lg=L.en;
  function block(b){
    const t=b.t;let e;
    if(t==="p"){e=el("p","dc-p");e.innerHTML=b.x}
    else if(t==="h3"){e=el("h3","dc-h3");e.innerHTML=b.x}
    else if(t==="dl"){e=el("dl","dc-dl");b.items.forEach(([k,v])=>{const r=el("div","dc-dr"),dt=el("dt"),dd=el("dd");dt.innerHTML=k;dd.innerHTML=v;r.append(dt,dd);e.append(r)})}
    else if(t==="ul"||t==="ol"){e=el(t,"dc-l");b.items.forEach(x=>{const li=el("li");li.innerHTML=x;e.append(li)})}
    else if(t==="formula"){e=el("div","dc-f");const n=el("div","dc-fn");n.innerHTML=b.name;const x=el("div","dc-fx");x.innerHTML=b.x;e.append(n,x);if(b.note){const s=el("div","dc-fs");s.innerHTML=b.note;e.append(s)}}
    else if(t==="key"){e=el("aside","dc-key");const h=el("div","dc-kh");h.textContent=b.title||lg.key;e.append(h);const u=el("ul");b.items.forEach(x=>{const li=el("li");li.innerHTML=x;u.append(li)});e.append(u)}
    else if(t==="table"){e=el("div","dc-tw");const tb=el("table","dc-t");
      if(b.cap){const c=el("caption");c.innerHTML=b.cap;tb.append(c)}
      const th=el("thead"),tr=el("tr");b.head.forEach(h=>{const c=el("th");c.innerHTML=h;tr.append(c)});th.append(tr);tb.append(th);
      const tbd=el("tbody");b.rows.forEach(r=>{const tr=el("tr");r.forEach((x,i)=>{const c=el(i?"td":"th");if(!i)c.scope="row";c.innerHTML=x;tr.append(c)});tbd.append(tr)});tb.append(tbd);e.append(tb)}
    else if(t==="ex"){e=el("div","dc-ex");const h=el("div","dc-eh");h.innerHTML=b.title||lg.ex;e.append(h);b.x.forEach(x=>{const p=el("p");p.innerHTML=x;e.append(p)})}
    return e;
  }

  function build(S){
    const doc=el("article","doc");doc.lang=S.lang||BANK.lang||"fr";lg=L[doc.lang]||L.en;
    // cover
    const cv=el("header","dc-cover"),top=el("div","dc-ctop");
    top.append(el("div","dc-tag",S.tag||tl("Study sheet")));
    const h=el("h1","dc-title");h.innerHTML=S.title;top.append(h);
    if(S.sub){const p=el("p","dc-sub");p.innerHTML=S.sub;top.append(p)}
    top.append(el("div","dc-brand","Tipoki"));
    const bot=el("div","dc-cbot");bot.append(el("div","dc-toch",lg.toc));
    const ol=el("ol","dc-toc");
    S.sections.forEach((s,i)=>{const li=el("li"),a=el("a");a.href="#dc-"+i;a.innerHTML="<b>"+String(i+1).padStart(2,"0")+"</b><span>"+s.title+"</span>";
      a.onclick=ev=>{ev.preventDefault();const t=doc.querySelector("#dc-"+i);if(t)t.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"})};li.append(a);ol.append(li)});
    bot.append(ol);
    if(S.source)bot.append(el("div","dc-src",S.source));
    cv.append(top,bot);doc.append(cv);
    // body
    const body=el("main","dc-body");
    if(S.intro){const p=el("p","dc-intro");p.innerHTML=S.intro;body.append(p)}
    S.sections.forEach((s,i)=>{
      const sec=el("section","dc-sec");sec.id="dc-"+i;
      const hd=el("div","dc-sh");hd.append(el("span","dc-num",String(i+1).padStart(2,"0")));
      const h2=el("h2");h2.innerHTML=s.title;hd.append(h2);sec.append(hd);
      if(s.lead){const p=el("p","dc-lead");p.innerHTML=s.lead;sec.append(p)}
      s.blocks.forEach(b=>{const e=block(b);if(e)sec.append(e)});
      body.append(sec);
    });
    const ft=el("footer","dc-end");ft.innerHTML="<span>Tipoki</span> · "+lg.end;body.append(ft);
    doc.append(body);return doc;
  }

  function show(){
    const S=get();if(!S)return;
    if(root)root.remove();
    root=el("div","sheet");root.id="sheet";root.setAttribute("data-lenis-prevent","");root.setAttribute("role","dialog");root.setAttribute("aria-modal","true");root.setAttribute("aria-label",tl("Study sheet"));
    const bar=el("div","sh-bar");
    const close=el("button","btn ghost sh-close",tl("Close"));close.type="button";close.onclick=hide;
    const dl=el("a","btn sh-dl",tl("Download PDF"));dl.href="sheets/"+encodeURIComponent(BANK.id)+".pdf";dl.setAttribute("download",(S.file||BANK.id)+".pdf");dl.target="_blank";dl.rel="noopener";
    const pr=el("button","btn ghost sh-pr",tl("Print"));pr.type="button";pr.onclick=()=>window.print();
    const sp=el("span","sh-sp");
    bar.append(close,sp,pr,dl);
    const stage=el("div","sh-stage");stage.append(build(S));
    root.append(bar,stage);
    lastFocus=document.activeElement;
    document.body.append(root);document.body.classList.add("sheet-open");
    root.scrollTop=0;close.focus({preventScroll:true});
  }
  function hide(){
    if(!root)return;
    root.remove();root=null;document.body.classList.remove("sheet-open");
    if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true});
  }
  const panel=$("sheetPanel"),pdf=$("sheetPdf");
  function sync(){const S=get();btn.hidden=!S;panel.hidden=!S;if(S){pdf.href="sheets/"+encodeURIComponent(BANK.id)+".pdf";pdf.setAttribute("download",(S.file||BANK.id)+".pdf")}}
  btn.onclick=show;$("sheetOpen").onclick=show;
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&root)hide()});
  const old=window.renderBankUI;
  window.renderBankUI=function(){old.apply(this,arguments);sync();if(root)hide()};
  sync();
})();
