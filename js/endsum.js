// ---------- end of game: where you lose points (by chapter) + one button to train exactly that ----------
(function(){
  const box=$("endChap");if(!box)return;
  function build(){
    box.textContent="";box.hidden=true;
    if(!G||G.status!=="end"||G.review)return;
    const from=mode==="multi"&&local.joinQi||0,by={};
    G.deck.forEach((d,i)=>{if(i<from)return;const a=P[me]&&P[me].ans&&P[me].ans[i];if(!a)return;
      const s=qOf(i).s,e=by[s]||(by[s]={s,n:0,ok:0,miss:[]});e.n++;if(isRight(a,i))e.ok++;else e.miss.push(i)});
    const rows=Object.values(by);
    if(rows.length<2)return;   // one chapter only: the plain score says it all
    rows.sort((a,b)=>a.ok/a.n-b.ok/b.n||b.n-a.n);
    box.hidden=false;
    box.appendChild(el("div","label",tl("By {unit}",{unit:unit(0)})));
    rows.forEach(r=>{const p=Math.round(r.ok/r.n*100),row=el("div","chap-row");
      const bar=el("div","chap-bar");const f=el("i");f.style.width=p+"%";f.className=p>=70?"hi":p>=40?"mid":"lo";bar.appendChild(f);
      row.append(el("span","chap-nm",sLabel(r.s)),bar,el("span","chap-sc",r.ok+" / "+r.n));row.title=SESS[r.s]||"";box.appendChild(row)});
    const w=rows[0];
    if(w.miss.length&&w.ok/w.n<.7){
      const b=el("button","btn dark",tl("Train {unit} {s} ({n})",{unit:unit(0),s:sLabel(w.s),n:w.miss.length}));b.type="button";
      b.onclick=()=>{const keys=w.miss.map(i=>missKey(i));startSolo(shuffle(keys.map(missItem)))};
      box.appendChild(b)}
  }
  const o=renderEnd;renderEnd=function(){o();build()};
})();
