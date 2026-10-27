// search inside the current quiz: flashcards (facts) + hand-written questions, by term, definition, question or answer text
(function(){
  const input=$("srchIn"),list=$("srchList"),sum=$("srchSum"),kinds=$("srchKind"),PAGE=20;
  let kind="all",shown=PAGE,bankId=null,items=null;
  // accents and case ignored: "etat" finds "État"
  const fold=t=>String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
  function build(){
    items=[];
    (BANK.facts||[]).forEach(f=>items.push({k:"card",s:f[0],t:f[3],x:f[4],al:f[5]||""}));
    // generated questions come from the facts (they would only repeat the cards): keep the hand-written ones
    Q.slice(0,NHQ).forEach(q=>items.push({k:"q",s:q.s,t:q.q,x:q.o?q.o[0]:"",e:q.e||"",tf:!!q.tf}));
    TQ.slice(0,NHT).forEach(q=>items.push({k:"q",s:q.s,t:q.q,x:(q.a||[])[0]||"",e:q.e||""}));
    items.forEach(i=>i.h=fold([i.t,i.x,i.al,i.e].join(" \n ")));
    bankId=BANK.id;
  }
  function hl(parent,text,words){
    const f=fold(text);let ranges=[];
    words.forEach(w=>{let p=0,i;while((i=f.indexOf(w,p))>=0){ranges.push([i,i+w.length]);p=i+w.length}});
    ranges.sort((a,b)=>a[0]-b[0]);let pos=0;
    ranges.forEach(([a,b])=>{if(a<pos)a=pos;if(b<=a)return;parent.append(text.slice(pos,a));parent.append(Object.assign(document.createElement("mark"),{textContent:text.slice(a,b)}));pos=b});
    parent.append(text.slice(pos));
  }
  function row(i,words){
    const r=el("div","sr-item"),top=el("div","sr-top");
    top.append(el("span","sr-tag",i.k==="card"?"Flashcard":i.tf?"True / false":"Question"));
    if(i.s!=null&&SESS[i.s])top.append(el("span","",sLabel(i.s)));
    r.append(top);
    const t=el("div","sr-t");hl(t,i.t,words);r.append(t);
    if(i.k==="card"){const d=el("div","sr-d");hl(d,i.x,words);r.append(d)}
    else if(i.x){const a=el("div","sr-a");a.append(el("b","","Answer: "));hl(a,i.x,words);r.append(a)}
    return r;
  }
  function render(){
    if(!BANK)return;
    if(!items){const prev=bankId;build();if(prev&&prev!==bankId){input.value="";kind="all";shown=PAGE}}
    const hasCards=items.some(i=>i.k==="card"),hasQ=items.some(i=>i.k==="q");
    kinds.hidden=!(hasCards&&hasQ);
    kinds.textContent="";
    [["all","All"],["card","Flashcards"],["q","Questions"]].forEach(([v,l])=>{const c=el("button","chip",l);c.type="button";c.setAttribute("aria-pressed",kind===v);c.onclick=()=>{kind=v;shown=PAGE;render()};kinds.append(c)});
    list.textContent="";
    const words=fold(input.value).split(/\s+/).filter(Boolean);
    if(!words.length){sum.textContent=(hasCards?items.filter(i=>i.k==="card").length+" flashcards":"")+(hasCards&&hasQ?" and ":"")+(hasQ?items.filter(i=>i.k==="q").length+" questions":"")+" to search.";return}
    const res=items.filter(i=>(kind==="all"||i.k===kind)&&words.every(w=>i.h.includes(w)));
    // term matches first, then the rest
    res.sort((a,b)=>(fold(b.t).includes(fold(input.value.trim()))?1:0)-(fold(a.t).includes(fold(input.value.trim()))?1:0));
    sum.textContent=res.length?res.length+" result"+(res.length>1?"s":""):"Nothing found. Try a shorter word.";
    res.slice(0,shown).forEach(i=>list.append(row(i,words)));
    if(res.length>shown){const m=el("button","btn ghost sr-more","Show more");m.type="button";m.onclick=()=>{shown+=PAGE;render()};list.append(m)}
  }
  input.addEventListener("input",()=>{shown=PAGE;render()});
  // refresh whenever a quiz is (re)loaded
  const old=window.renderBankUI;
  window.renderBankUI=function(){old.apply(this,arguments);items=null;render()};
  render();
})();
