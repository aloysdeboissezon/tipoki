// ---------- Figures in the "Why?" card: small SVG diagrams drawn from the question's own numbers (no image files, no network, so they work offline) ----------
// A question can carry  g:{k:"gw",price,own,pct}  (kinds below)  or  g:{img:"img/figs/x.svg",alt:"…"}  for a ready-made file.
// Colours come from the theme variables, so every figure follows light / dark mode.
window.TipokiFig=(function(){
  const NS="http://www.w3.org/2000/svg",W=360;
  const T=(s,v)=>typeof tl==="function"?tl(s,v):(v?s.replace(/\{(\w+)\}/g,(m,k)=>v[k]):s);
  const n=x=>{const r=Math.round(Math.abs(x)*100)/100,[i,d]=String(r).split(".");return(x<0&&r?"−":"")+i.replace(/\B(?=(\d{3})+(?!\d))/g,",")+(d?"."+d:"")};
  const pct=p=>n(Math.round(p*1000)/10)+"%";
  function s(tag,a,txt){const e=document.createElementNS(NS,tag);for(const k in a||{})e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;return e}
  const sm=(x,y,t,c,an)=>{const e=s("text",{x,y,class:"fg-t"+(c?" "+c.split(" ").map(v=>"fg-"+v).join(" "):""),"text-anchor":an||"start"},t);e.style.fontSize="12px";return e};
  const rect=(x,y,w,h,c)=>s("rect",{x,y,width:Math.max(w,0),height:h,rx:6,class:"fg-"+c});
  const text=(x,y,t,c,anchor)=>s("text",{x,y,class:"fg-t"+(c?" "+c.split(" ").map(x=>"fg-"+x).join(" "):""),"text-anchor":anchor||"start"},t);
  function arrow(x1,y1,x2,y2){const g=s("g");g.append(s("line",{x1,y1,x2,y2,class:"fg-ln"}),s("path",{d:`M${x2-5} ${y2-7}L${x2} ${y2}L${x2+5} ${y2-7}`,class:"fg-ln fg-nofill"}));return g}
  function box(x,y,w,h,t,c){const g=s("g");g.append(rect(x,y,w,h,c||"box"),text(x+w/2,y+h/2+5,t,c==="hl"?"onhl":"b","middle"));return g}

  // goodwill / bargain purchase: price paid next to the group's share of the equity
  function gw(g){
    const R=t=>g.sn?t.replace(/\bS\b/g,g.sn):t,price=g.price,own=g.own,mx=Math.max(price,own),k=340/mx,x0=10,diff=price-own,gain=diff<0;
    const a=s("g");
    a.append(text(x0,16,T("Price paid")+" · "+n(price),"b"),rect(x0,22,price*k,24,"hl"));
    a.append(text(x0,76,R(T("{p} of S's equity",{p:pct(g.pct)}))+" · "+n(own),"b"),rect(x0,82,own*k,24,"hl"));
    if(diff)a.append(rect(x0+Math.min(price,own)*k,gain?82:22,Math.abs(diff)*k,24,"hot"));
    a.append(text(W/2,138,(gain?T("Bargain-purchase gain"):T("Goodwill"))+" = "+n(Math.max(price,own))+" − "+n(Math.min(price,own))+" = "+n(Math.abs(diff)),"b b2","middle"));
    if(!diff)a.lastChild.textContent=T("Price = group share, so no goodwill and no gain");
    return {h:150,el:a,cap:gain?T("The group pays less than its share of the equity: the difference is a gain."):T("The group pays more than its share of the equity: the difference is goodwill.")};
  }
  // equity split between the parent and the non-controlling interests
  function nci(g){
    const eq=g.eq,p=g.pct,x0=10,w=340,a=s("g"),R=t=>g.sn?t.replace(/\bS\b/g,g.sn):t;
    a.append(text(x0,16,R(T("Equity of S"))+" · "+n(eq),"b"),rect(x0,22,w*p,28,"hl"),rect(x0+w*p,22,w*(1-p),28,"hot"));
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
  // ---------- generic helpers for the other banks (labels come from the question's own g, so any language works) ----------
  const wrap=(t,max)=>{const o=[];let c="";for(const w of String(t).split(/\s+/)){if(c&&(c+" "+w).length>max){o.push(c);c=w}else c=c?c+" "+w:w}if(c)o.push(c);return o};
  function lines(x,y,t,max,c,an,lh){const g=s("g"),L=wrap(t,max);L.forEach((l,i)=>g.append(text(x,y+i*(lh||17),l,c,an)));return {g,n:L.length}}
  const hlOf=(g,i)=>[].concat(g.hl==null?[]:g.hl).includes(i);
  // efficiency / energy balance: what is received splits into useful + lost
  function flow(g){
    const k=340/g.rec,uw=g.use*k,a=s("g"),L=g.l||["Received","Useful","Lost"],u=g.u||"",T0=lines(10,16,L[0]+" · "+n(g.rec)+" "+u,40,"b","start",18),y0=16+(T0.n-1)*18;
    a.append(T0.g,rect(10,y0+8,340,24,"hl"),arrow(180,y0+36,180,y0+56),rect(10,y0+64,uw,24,"hl"),rect(10+uw,y0+64,340-uw,24,"hot"));
    const A=lines(10,y0+110,L[1]+" · "+n(g.use)+" "+u,40,"b","start",18),B=lines(10,y0+110+A.n*18+6,L[2]+" · "+n(g.rec-g.use)+" "+u,40,"b","start",18);
    a.append(A.g,B.g);let y=y0+110+(A.n+B.n)*18+6;
    if(g.f){a.append(text(W/2,y+16,g.f,"b fg-b2","middle"));y+=24}
    return {h:y+10,el:a,cap:g.cap};
  }
  // alternator: turbine -> rotor inside stator -> electricity, losses as heat
  function alt(g){
    const a=s("g"),L=g.l||["Turbine","Stator","Rotor","Electricity","Losses: heat"],c=i=>hlOf(g,i)?"hl":"box";
    a.append(box(8,56,84,40,L[0],c("turbine")),arrow(92,76,124,76));
    a.append(rect(124,14,124,112,c("stator")),text(186,34,L[1],c("stator")==="hl"?"onhl":"b","middle"));
    a.append(s("circle",{cx:186,cy:82,r:30,class:"fg-"+(hlOf(g,"rotor")?"hl":"hot")}),text(186,87,L[2],"b","middle"));
    a.append(arrow(248,76,272,76),box(272,56,82,40,L[3],c("elec")),rect(124,134,124,20,"hot"),text(186,149,L[4],"b","middle"));
    return {h:162,el:a,cap:g.cap};
  }
  // rotor with N magnets: f = N x w
  function freq(g){
    const a=s("g"),cx=82,cy=82;
    a.append(s("circle",{cx,cy,r:58,class:"fg-box"}),s("circle",{cx,cy,r:34,class:"fg-hl"}));
    for(let i=0;i<g.N;i++){const t=i/g.N*2*Math.PI-Math.PI/2;a.append(s("circle",{cx:cx+46*Math.cos(t),cy:cy+46*Math.sin(t),r:g.N>8?5:8,class:"fg-hot"}))}
    a.append(s("path",{d:`M${cx+30} ${cy-66}a68 68 0 0 1 36 36`,class:"fg-ln fg-nofill"}));
    (g.lines||[]).forEach((t,i)=>a.append(text(170,52+i*30,t,i===g.lines.length-1?"b b2":"b")));
    return {h:164,el:a,cap:g.cap};
  }
  // P = U x I as the area of a rectangle on the characteristic
  function pv(g){
    const a=s("g"),X0=16,Y0=150,aw=320,ah=110,w=aw*g.U/(g.U*1.25),h=ah*g.I/(g.I*1.25);
    a.append(rect(X0,Y0-h,w,h,"hl"),s("line",{x1:X0,y1:Y0,x2:X0+aw,y2:Y0,class:"fg-ln"}),s("line",{x1:X0,y1:Y0,x2:X0,y2:Y0-ah,class:"fg-ln"}));
    a.append(s("circle",{cx:X0+w,cy:Y0-h,r:7,class:"fg-hot"}),text(X0+w/2,Y0-h/2+5,g.P,"onhl","middle"),text(X0+w/2,Y0+20,g.Ul||"U = "+g.U,"b","middle"),text(X0+4,Y0-h-14,g.Il||"I = "+g.I,"b"));
    a.append(text(X0+aw,Y0+20,"U","m","end"));
    return {h:176,el:a,cap:g.cap};
  }
  // energy bands: conductor / semiconductor / insulator, one of them highlighted
  function gap(g){
    const a=s("g"),L=g.l||["Conductor","Semiconductor","Insulator","Conduction","Valence"],cols=[["cond",75,g.ov||"overlap"],["semi",58,"≈ 1 eV"],["iso",10,"≈ 6 eV"]];
    cols.forEach(([id,cy,lab],i)=>{const x=10+i*118,on=g.hl===id,c=on?"hl":"box";
      a.append(rect(x,cy,104,30,c),rect(x,100,104,38,c),text(x+52,cy+20,L[3],on?"onhl":"m","middle"),text(x+52,124,L[4],on?"onhl":"m","middle"),text(x+52,160,L[i],on?"b":"m","middle"),sm(x+52,180,(g.gl||"gap")+" "+lab,"b","middle"));
      if(on&&g.ph&&id==="semi")a.append(arrow(x+90,130,x+90,60));
    });
    return {h:192,el:a,cap:g.cap};
  }
  // a magnet moving past a coil makes a current
  function ind(g){
    const a=s("g"),L=g.l||["N","S","Motion","Coil","Current"];
    a.append(rect(14,56,44,34,"hot"),rect(58,56,44,34,"hl"),text(36,78,L[0],"b","middle"),text(80,78,L[1],"onhl","middle"),arrow(108,73,150,73),text(60,40,L[2],"m","middle"));
    for(let i=0;i<5;i++)a.append(s("ellipse",{cx:196+i*22,cy:73,rx:14,ry:30,class:"fg-ln fg-nofill"}));
    a.append(s("path",{d:"M210 103V138H306V103",class:"fg-ln fg-nofill"}),text(W/2+30,158,L[4]+(g.alt?" ⇄":""),"b","middle"),text(258,36,L[3],"m","middle"));
    return {h:166,el:a,cap:g.cap};
  }
  // timeline
  function tl_(g){
    const Y=g.y,S=[0,1000,1500,1800,1900,1950].filter(v=>v<Y-5).pop()||0,E=2026,span=E-S,step=span>1500?500:span>500?100:span>100?25:10,xs=v=>20+(v-S)/span*320,a=s("g");
    a.append(s("line",{x1:20,y1:84,x2:340,y2:84,class:"fg-ln"}));
    for(let v=Math.ceil(S/step)*step;v<=E;v+=step)a.append(s("line",{x1:xs(v),y1:78,x2:xs(v),y2:90,class:"fg-ln"}),text(xs(v),110,v,"m","middle"));
    const x=xs(Y),an=x<95?"start":x>265?"end":"middle";
    a.append(s("line",{x1:x,y1:46,x2:x,y2:84,class:"fg-ln"}),s("circle",{cx:x,cy:84,r:9,class:"fg-hot"}),text(x,38,String(Y),"b b2",an));
    if(g.t)a.append(text(x,14,g.t.length>38?g.t.slice(0,37)+"…":g.t,"m",an));
    return {h:122,el:a,cap:g.cap||String(Y)};
  }
  // chemical element tile
  function elem(g){
    const a=s("g");
    a.append(rect(120,6,120,128,"box"),text(132,30,String(g.z),"b"),text(180,88,g.sym,"b big","middle"),text(180,122,g.n,"m","middle"));
    a.append(text(260,70,"Z = "+g.z,"b"),text(260,92,g.z+" p⁺","m"));
    return {h:142,el:a,cap:g.cap};
  }
  // solar system order
  function sol(g){
    const P=["Mercure","Vénus","Terre","Mars","Jupiter","Saturne","Uranus","Neptune"],R=[3,5,5,4,12,10,7,7],a=s("g");
    a.append(s("circle",{cx:0,cy:70,r:34,class:"fg-hot"}),s("line",{x1:34,y1:70,x2:352,y2:70,class:"fg-ln",opacity:.35}));
    P.forEach((p,i)=>{const x=58+i*38,on=g.hl===p;a.append(s("circle",{cx:x,cy:70,r:R[i],class:on?"fg-hl":"fg-box"}),sm(x,i%2?104:46,p,on?"b":"m","middle"))});
    return {h:116,el:a,cap:g.cap};
  }
  // waterfall: a starting amount, then changes, then the total
  function bridge(g){
    const a=s("g"),it=g.items;let c=0,mx=0,y=6;const rows=it.map(o=>{const from=o.tot?0:c,to=o.tot?o.v:c+o.v;if(!o.tot)c=to;mx=Math.max(mx,from,to);return {o,from,to}});
    const k=340/mx;rows.forEach(({o,from,to},i)=>{const T=lines(10,y+12,o.l+" · "+(o.tot||i===0?"":o.v<0?"−":"+")+n(o.v),38,"b","start",17),yy=y+(T.n-1)*17;
      a.append(T.g,rect(10+Math.min(from,to)*k,yy+20,Math.abs(to-from)*k,18,o.tot||i===0?"hl":"hot"));y=yy+50});
    return {h:y,el:a,cap:g.cap};
  }
  // chain of steps, some highlighted
  function steps(g){
    const a=s("g"),it=g.items,per=3,bw=100,gp=20;let y=6;
    it.forEach((t,i)=>{const r=Math.floor(i/per),c=i%per,x=10+c*(bw+gp),yy=6+r*72,on=hlOf(g,i);
      a.append(rect(x,yy,bw,56,on?"hl":"box"));const L=wrap(t,13).slice(0,3);L.forEach((l,j)=>a.append(text(x+bw/2,yy+28-(L.length-1)*8+j*16+4,l,on?"onhl":"b","middle")));
      if(c<per-1&&i<it.length-1)a.append(arrow(x+bw+2,yy+28,x+bw+gp-2,yy+28)); y=yy+56});
    return {h:y+8,el:a,cap:g.cap};
  }
  // set of boxes (two columns), with an optional small line under each title
  function set(g){
    const a=s("g"),it=g.items;let y=6;
    it.forEach((o,i)=>{const t=typeof o==="string"?o:o.t,sub=typeof o==="string"?"":o.s||"",x=10+(i%2)*175,yy=6+Math.floor(i/2)*66,on=hlOf(g,i),c=on?"onhl":"b";
      a.append(rect(x,yy,165,58,on?"hl":"box"));const L=wrap(t,20).slice(0,2),S=sub?wrap(sub,26).slice(0,1):[];
      const tot=L.length+S.length,y0=yy+29-(tot-1)*9+5;L.forEach((l,j)=>a.append(text(x+82,y0+j*18,l,c,"middle")));S.forEach((l,j)=>a.append(sm(x+82,y0+(L.length+j)*18,l,on?"onhl":"m","middle")));
      y=yy+58});
    return {h:y+8,el:a,cap:g.cap};
  }
  // nested rings, outer first
  function nest(g){
    const a=s("g"),k=g.items.length,band=22,bot=[];let b=4+band*(k-1)+band+10;
    for(let i=k-1;i>=0;i--){bot[i]=b;b+=8}
    g.items.forEach((t,i)=>{const on=hlOf(g,i),x=10+i*16,top=4+i*band;
      a.append(s("rect",{x,y:top,width:340-i*32,height:bot[i]-top,rx:12,class:"fg-"+(on?"hl":"box")}),text(x+10,top+16,t,on?"onhl":"b"))});
    return {h:bot[0]+8,el:a,cap:g.cap};
  }
  // two overlapping circles
  let vid=0;
  function venn(g){
    const a=s("g"),id="fgc"+(++vid),df=s("defs"),cp=s("clipPath",{id});cp.append(s("circle",{cx:125,cy:80,r:74}));df.append(cp);
    a.append(df,s("circle",{cx:125,cy:80,r:74,class:"fg-v1"}),s("circle",{cx:235,cy:80,r:74,class:"fg-v2"}),s("circle",{cx:235,cy:80,r:74,class:"fg-hl","clip-path":`url(#${id})`,"fill-opacity":.55}));
    [[70,g.a],[290,g.b]].forEach(([x,t])=>{const w=wrap(t,10);a.append(lines(x,80-(w.length-1)*8,t,10,"b","middle",17).g)});
    a.append(text(180,176,"= "+g.m,"b fg-b2","middle"));
    return {h:190,el:a,cap:g.cap};
  }
  // two sides facing each other, each with a few points
  function vs(g){
    const a=s("g"),mx=Math.max(g.l.p.length,g.r.p.length);
    [[g.l,10,"hl"],[g.r,190,"hot"]].forEach(([o,x,c])=>{a.append(rect(x,6,160,34,c),text(x+80,28,o.t,c==="hl"?"onhl":"b","middle"));
      o.p.forEach((t,i)=>{const L=wrap(t,22);a.append(lines(x+4,62+i*40,t,22,"m","start",16).g)})});
    return {h:62+mx*40,el:a,cap:g.cap};
  }
  // a part of the people claims to be the whole people
  function pars(g){
    const a=s("g"),L=g.l||["All citizens","“The real people”"];
    a.append(s("circle",{cx:100,cy:86,r:76,class:"fg-box"}),s("circle",{cx:78,cy:70,r:36,class:"fg-hl"}),text(78,66,wrap(L[1],10)[0],"onhl","middle"),text(78,84,(wrap(L[1],10)[1]||""),"onhl","middle"),text(100,160,L[0],"m","middle"));
    a.append(arrow(150,86,196,86),lines(204,70,g.t||"",16,"b","start",18).g);
    return {h:176,el:a,cap:g.cap};
  }
  // tags the questions of a bank: rules are functions (question -> figure data or nothing)
  function tag(bank,rules){let c=0;for(const q of [].concat(bank.Q||[],bank.TQ||[])){if(q.g)continue;for(const r of rules){const g=r(q);if(g){q.g=g;c++;break}}}return c}
  const KINDS={bridge,gw,nci,grp,flow,alt,freq,pv,gap,ind,tl:tl_,elem,sol,steps,set,nest,venn,vs,pars};
  // returns a <figure> or null
  function make(g){
    if(!g)return null;
    const f=document.createElement("figure");f.className="expl-fig";
    if(g.img){const i=document.createElement("img");i.src=g.img;i.alt=g.alt||"";i.loading="lazy";i.decoding="async";f.append(i);
      if(g.cap){const c=document.createElement("figcaption");c.textContent=g.cap;f.append(c)}return f}
    const b=KINDS[g.k];if(!b)return null;
    const r=b(g),sv=s("svg",{viewBox:`0 0 ${W} ${r.h}`,role:"img","aria-label":r.cap||"",focusable:"false"});
    sv.append(s("title",null,r.cap),r.el);f.append(sv);
    if(r.cap){const c=document.createElement("figcaption");c.textContent=r.cap;f.append(c)}return f;
  }
  return {make,tag};
})();
