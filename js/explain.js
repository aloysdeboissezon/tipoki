// ---------- "Why?" notes: what the wrong answer you picked actually is, found in the quiz's own facts (no AI call) ----------
window.TipokiWhy=(function(){
  const key=s=>String(s==null?"":s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s*\(.*?\)/g,"").replace(/[^a-z0-9]+/g," ").trim();
  let cache=null,cacheFor=null;
  function index(facts){
    if(cacheFor===facts)return cache;
    const byT=new Map(),byD=new Map();
    (facts||[]).forEach(f=>{if(f[3])byT.set(key(f[3]),f);if(f[4])byD.set(key(f[4]),f)});
    cacheFor=facts;cache={byT,byD};return cache;
  }
  const trim=s=>String(s).trim().replace(/[.\s]+$/,"");
  // text of the wrong answer the player gave -> one sentence explaining what it really is, or ""
  function whyNot(facts,txt){
    if(!txt||!facts||!facts.length)return "";
    const k=key(txt);if(!k)return "";
    const ix=index(facts),t=ix.byT.get(k);
    if(t)return tl("“{t}” actually means: {d}.",{t:trim(t[3]),d:trim(t[4])});
    const d=ix.byD.get(k);
    if(d)return tl("That describes “{t}”.",{t:trim(d[3])});
    return "";
  }
  // richer explanation after an answer: the term in bold, a worked example or context taken from the quiz's study sheet, and a link into that sheet
  const plain=h=>{const d=document.createElement("div");d.innerHTML=h;return d.textContent.trim()};
  function fill(q,box,main,more){
    const e=q.e||"",i=e.indexOf(" — "),st=e.indexOf(": ");
    main.textContent="";more.textContent="";
    const k=i>0&&i<=60?i:-1,from=k>0&&st>=0&&st<k?st+2:0;
    if(k>0){const b=document.createElement("b");b.className="expl-t";b.textContent=e.slice(from,k);
      if(from)main.append(e.slice(0,from));main.append(b," — "+e.slice(k+3))}
    else main.textContent=e;
    if(q.g&&window.TipokiFig){const fg=window.TipokiFig.make(q.g);if(fg)more.append(fg)}
    const S=window.SHEETS&&BANK&&window.SHEETS[BANK.id],sec=S&&S.sections[(q.s||0)-1];
    if(!sec)return;
    const ex=sec.blocks.find(b=>b.t==="ex");
    const txt=ex?plain((ex.x||[])[0]||""):(sec.lead?plain(sec.lead):"");
    if(txt){const p=document.createElement("p");p.className="expl-ex";const h=document.createElement("span");h.className="expl-xh";
      h.textContent=ex?tl("Example"):tl("In context");p.append(h," ",txt.length>260?txt.slice(0,257).replace(/\s+\S*$/,"")+"…":txt);more.append(p)}
    if(window.TipokiSheet&&window.TipokiSheet.has()){const a=document.createElement("button");a.type="button";a.className="expl-link";
      a.textContent=tl("Read it in the study sheet")+" → "+plain(sec.title);a.onclick=()=>window.TipokiSheet.open((q.s||1)-1);more.append(a)}
  }
  return {whyNot,fill};
})();
