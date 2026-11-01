// ---------- Figures in the "Why?" card: small SVG diagrams drawn from the question's own numbers (no image files, no network, so they work offline) ----------
// A question can carry  g:{k:"gw",price,own,pct}  (kinds below)  or  g:{img:"img/figs/x.svg",alt:"…"}  for a ready-made file.
// Colours come from the theme variables, so every figure follows light / dark mode.
window.TipokiFig=(function(){
  const NS="http://www.w3.org/2000/svg",W=360;
  const T=(s,v)=>typeof tl==="function"?tl(s,v):(v?s.replace(/\{(\w+)\}/g,(m,k)=>v[k]):s);
  const n=x=>{const r=Math.round(Math.abs(x)*100)/100,[i,d]=String(r).split(".");return(x<0&&r?"−":"")+i.replace(/\B(?=(\d{3})+(?!\d))/g,",")+(d?"."+d:"")};
  const pct=p=>n(Math.round(p*1000)/10)+"%";
  function s(tag,a,txt){const e=document.createElementNS(NS,tag);for(const k in a||{})e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;return e}
  const rect=(x,y,w,h,c)=>s("rect",{x,y,width:Math.max(w,0),height:h,rx:6,class:"fg-"+c});
  const text=(x,y,t,c,anchor)=>s("text",{x,y,class:"fg-t"+(c?" fg-"+c:""),"text-anchor":anchor||"start"},t);
  function arrow(x1,y1,x2,y2){const g=s("g");g.append(s("line",{x1,y1,x2,y2,class:"fg-ln"}),s("path",{d:`M${x2-5} ${y2-7}L${x2} ${y2}L${x2+5} ${y2-7}`,class:"fg-ln fg-nofill"}));return g}
  function box(x,y,w,h,t,c){const g=s("g");g.append(rect(x,y,w,h,c||"box"),text(x+w/2,y+h/2+5,t,c==="hl"?"onhl":"b","middle"));return g}

  // goodwill / bargain purchase: price paid next to the group's share of the equity
  function gw(g){
    const price=g.price,own=g.own,mx=Math.max(price,own),k=340/mx,x0=10,diff=price-own,gain=diff<0;
    const a=s("g");
    a.append(text(x0,16,T("Price paid")+" · "+n(price),"b"),rect(x0,22,price*k,24,"hl"));
    a.append(text(x0,76,T("{p} of S's equity",{p:pct(g.pct)})+" · "+n(own),"b"),rect(x0,82,own*k,24,"hl"));
    if(diff)a.append(rect(x0+Math.min(price,own)*k,gain?82:22,Math.abs(diff)*k,24,"hot"));
    a.append(text(W/2,138,(gain?T("Bargain-purchase gain"):T("Goodwill"))+" = "+n(Math.max(price,own))+" − "+n(Math.min(price,own))+" = "+n(Math.abs(diff)),"b b2","middle"));
    if(!diff)a.lastChild.textContent=T("Price = group share, so no goodwill and no gain");
    return {h:150,el:a,cap:gain?T("The group pays less than its share of the equity: the difference is a gain."):T("The group pays more than its share of the equity: the difference is goodwill.")};
  }
  // equity split between the parent and the non-controlling interests
  function nci(g){
    const eq=g.eq,p=g.pct,x0=10,w=340,a=s("g");
    a.append(text(x0,16,T("Equity of S")+" · "+n(eq),"b"),rect(x0,22,w*p,28,"hl"),rect(x0+w*p,22,w*(1-p),28,"hot"));
    if(p<1){a.append(text(x0,74,T("Parent")+" · "+pct(p),"b"),text(x0,92,n(eq*p),"m"),
      text(x0+w,74,T("NCI")+" · "+pct(1-p),"b","end"),text(x0+w,92,n(eq*(1-p)),"m","end"));
      a.append(text(W/2,124,T("NCI")+" = "+pct(1-p)+" × "+n(eq)+" = "+n(eq*(1-p)),"b b2","middle"))}
    else a.append(text(W/2,84,T("100% owned: no NCI"),"b b2","middle"));
    return {h:p<1?138:100,el:a,cap:p<1?T("The non-controlling shareholders own the part of the subsidiary's equity that the parent does not."):T("The parent owns all the shares, so nobody else holds a part of S's equity.")};
  }
  // group structure: parent owns x% of the subsidiary, the rest is held by others
  function grp(g){
    const p=g.pct,a=s("g");
    a.append(box(120,6,120,34,T("Parent P")),box(120,98,120,34,T("Subsidiary S"),"hl"),arrow(180,40,180,98),text(188,74,T("owns {p}",{p:pct(p)}),"m"));
    if(p<1){a.append(box(262,98,88,34,T("Others"),"hot"),s("line",{x1:262,y1:115,x2:246,y2:115,class:"fg-ln"}),text(306,94,pct(1-p),"m","middle"))}
    return {h:142,el:a,cap:T("Control: the parent owns more than 50% of the votes, so S is fully consolidated.")};
  }
  const KINDS={gw,nci,grp};
  // returns a <figure> or null
  function make(g){
    if(!g)return null;
    const f=document.createElement("figure");f.className="expl-fig";
    if(g.img){const i=document.createElement("img");i.src=g.img;i.alt=g.alt||"";i.loading="lazy";i.decoding="async";f.append(i);
      if(g.cap){const c=document.createElement("figcaption");c.textContent=g.cap;f.append(c)}return f}
    const b=KINDS[g.k];if(!b)return null;
    const r=b(g),sv=s("svg",{viewBox:`0 0 ${W} ${r.h}`,role:"img","aria-label":r.cap,focusable:"false"});
    sv.append(s("title",null,r.cap),r.el);f.append(sv);
    const c=document.createElement("figcaption");c.textContent=r.cap;f.append(c);return f;
  }
  return {make};
})();
