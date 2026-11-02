// ---------- difficulty: 1 easy, 2 medium, 3 hard ----------
// a question can carry its own level (q.d, set by hand in the bank); the others are scored from their kind and wording,
// then the lower third of the quiz is "easy", the middle third "medium" and the top third "hard" (so every quiz gets all three levels)
function diffScore(q,typed){
  const wd=t=>new Set(String(t).toLowerCase().split(/[^a-zà-ÿ0-9]+/).filter(w=>w.length>3));
  const nm=/\d/.test(q.q)||/\d/.test(typed?q.a[0]:q.o[q.a]);
  if(typed)return 2.5+Math.min(String(q.a[0]).length,40)/20+(nm?.6:0)+Math.min(q.q.length,240)/240;
  const ok=String(q.o[q.a]);
  if(q.tf)return Math.min(q.q.length,260)/130+(nm?.4:0);
  const A=wd(ok);let sim=0,n=0;
  q.o.forEach((o,i)=>{if(i===q.a)return;const B=wd(o);let c=0;A.forEach(w=>{if(B.has(w))c++});sim+=c/Math.max(1,Math.min(A.size,B.size));n++});
  return 1+Math.min(ok.length,120)/50+Math.min(q.q.length,240)/120+(n?sim/n*2:0)+(nm?.6:0);
}
function diffInit(){   // called once the quiz's question lists are final; multiple choice and typed answers are ranked apart so each format has all three levels
  [[Q,0],[TQ,1]].forEach(([L,typed])=>{
    const items=[];L.forEach(q=>{if(!q.d)items.push([diffScore(q,typed),q])});
    items.sort((x,y)=>x[0]-y[0]);const n=items.length;
    items.forEach(([,q],i)=>{q.d=i<n/3?1:i<2*n/3?2:3});
  });
}
function diffOf(q){return q.d||2}
const DIFFS=[[0,"All levels"],[1,"Easy"],[2,"Medium"],[3,"Hard"],[4,"Climbing"]];
function diffOk(dv){return dv>=1&&dv<=3?q=>diffOf(q)===dv:()=>true}   // "climbing" (4) keeps every question and orders them easy to hard
function diffName(d){return tl(DIFFS[d][1])}
function seenGet(){try{const s=JSON.parse(lsGet(lsKey("seen"))||"{}");return{m:new Set(s.m||[]),t:new Set(s.t||[])}}catch(e){return{m:new Set(),t:new Set()}}}
function seenSave(s){lsSet(lsKey("seen"),JSON.stringify({m:[...s.m],t:[...s.t]}))}
// round-robin over shuffled groups, so big banks alternate between themes (and kinds of question within a theme)
function interleave(groups){groups=shuffle(groups.map(shuffle));const o=[];for(let k=0;groups.some(g=>k<g.length);k++)groups.forEach(g=>{if(k<g.length)o.push(g[k])});return o}
function groupBy(ids,f){const m={};ids.forEach(i=>{const k=f(i);(m[k]=m[k]||[]).push(i)});return Object.values(m)}
function orderPool(ids,isHand,seen,src){
  let un=ids.filter(i=>!seen.has(i));
  if(!un.length&&ids.length){ids.forEach(i=>seen.delete(i));un=ids.slice()}   // everything seen -> start over
  const se=ids.filter(i=>seen.has(i));
  const mix=BANK.balance?arr=>interleave(groupBy(arr,i=>src[i].s).map(g=>interleave(groupBy(g,i=>src[i].t||"")))):arr=>{const h=shuffle(arr.filter(isHand)),g=shuffle(arr.filter(i=>!isHand(i))),o=[];let a=0,b=0;while(a<h.length||b<g.length){if(a<h.length)o.push(h[a++]);if(b<g.length)o.push(g[b++])}return o};
  return mix(un).concat(mix(se));
}
function buildDeck(sessArr,len,fmt,opt){
  const ss=new Set(sessArr||[...settings.sess]);len=len||settings.len;fmt=fmt||settings.fmt;
  const inf=len===LEN_INF,n=inf?(opt&&opt.more?30:40):len;
  const seen=seenGet(),ex=(opt&&opt.exclude)||[];
  const exM=new Set(ex.filter(d=>d.t==null).map(d=>d.id)),exT=new Set(ex.filter(d=>d.t!=null).map(d=>d.t));
  const qk=q=>q.q+(q.img||""),used=new Set(ex.map(d=>qk(d.t!=null?TQ[d.t]:Q[d.id])));
  const dv=(opt&&opt.diff)||0,dk=diffOk(dv);
  const mids=orderPool(Q.map((q,i)=>i).filter(i=>ss.has(Q[i].s)&&!exM.has(i)&&dk(Q[i])),i=>i<NHQ,seen.m,Q);
  const tids=orderPool(TQ.map((q,i)=>i).filter(i=>ss.has(TQ[i].s)&&!exT.has(i)&&dk(TQ[i])),i=>i<NHT,seen.t,TQ);
  let a=0,b=0;
  const takeM=()=>{while(a<mids.length){const id=mids[a++],tx=qk(Q[id]);if(used.has(tx))continue;used.add(tx);return{id,o:Q[id].tf?tfOrder(Q[id]):shuffle([0,1,2,3])}}return null};
  const takeT=()=>{while(b<tids.length){const t=tids[b++],tx=qk(TQ[t]);if(used.has(tx))continue;used.add(tx);return{t}}return null};
  const out=[];
  while(out.length<n){
    const it=fmt==="mcq"?takeM():fmt==="typed"?takeT():(out.length%2===1?(takeT()||takeM()):(takeM()||takeT()));
    if(!it)break;out.push(it);
  }
  out.forEach(d=>d.t!=null?seen.t.add(d.t):seen.m.add(d.id));seenSave(seen);
  if(dv===4)out.sort((x,y)=>diffOf(x.t!=null?TQ[x.t]:Q[x.id])-diffOf(y.t!=null?TQ[y.t]:Q[y.id]));   // stable: easy first, hard last
  return out;
}
// ---------- typed answers: tolerant matching ----------
const STOP=new Set(["the","a","an","le","la","les","l","un","une","de","du","des","of","theory","theorie","concept","its","it","is","c","est","and","et"]);
function norm(x){return String(x).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/&/g," and ").replace(/[^a-z0-9]+/g," ").trim().split(" ").filter(w=>w&&!STOP.has(w)).map(stem).join(" ")}
function stem(w){if(/^[0-9]+$/.test(w))return w;return w.replace(/isation$/,"ization").replace(/ised$/,"ized").replace(/our$/,"or").replace(/ies$/,"y").replace(/([^s])s$/,"$1")}
function lev(a,b){if(a===b)return 0;const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=Array.from({length:n+1},(_,j)=>j);
  for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
function tol(v){if(/^[0-9]+$/.test(v))return 0;const L=v.length;return L<=3?0:L<=4?0:L<=6?1:L<=10?2:3}
function wordHit(words,vw){return words.some(w=>lev(w,vw)<=tol(vw))}
function closeTo(n,v){const nc=n.replace(/ /g,""),vc=v.replace(/ /g,"");if(!vc)return false;
  if(lev(nc,vc)<=tol(vc))return true;
  const words=n.split(" "),vws=v.split(" ");
  if(vws.every(vw=>wordHit(words,vw)))return true;                       // every word of the answer is present (typos ok)
  return false}
function checkTyped(input,variants,wrong){
  const n=norm(input);if(!n)return false;
  const nc=n.replace(/ /g,"");
  const ok=variants.some(v=>closeTo(n,norm(v)));if(!ok)return false;
  if(!wrong||!wrong.length)return true;
  const dR=Math.min(...variants.map(v=>lev(nc,norm(v).replace(/ /g,""))));
  return !wrong.some(w=>{const wn=norm(w);if(!wn)return false;const dW=lev(nc,wn.replace(/ /g,""));return dW<dR||(dW===0)||((" "+n+" ").includes(" "+wn+" ")&&!variants.some(v=>(" "+n+" ").includes(" "+norm(v)+" ")))});
}
// true/false questions always show "true" first, whatever the quiz's language
function tfOrder(q){return /^(Vrai|True)$/.test(q.o[0])?[0,1]:[1,0]}
function isT(qi){return G.deck[qi].t!=null}
// typed answers get 10 s more; exercises with a long statement get up to 30 s more to read it
function qT(qi){const n=qOf(qi).q.length;return (G.T+(isT(qi)?10:0)+(n>170?Math.min(30,Math.ceil((n-170)/25)):0))*1000}
function qOf(qi){const d=G.deck[qi];return d.t!=null?TQ[d.t]:Q[d.id]}

// ---------- generated questions (deterministic: same on every device) ----------
function expandFacts(FACTS,lang){
  const fr=lang==="fr",L=fr?{who:"Qui est-ce ? “",which:"Quel concept ? “",known:t=>"Pour quoi "+t+" est connu·e ?",what:t=>"Que désigne « "+t+" » ?",tWho:"Qui ? “",tName:"Donne le concept : “",lWho:"Qui ?",lDef:"Définition",tf:"Vrai ou faux",T:"Vrai",F:"Faux",sep:" : "}
    :{who:"Who is this? “",which:"Which concept is this? “",known:t=>"What is "+t+" known for?",what:t=>"What is “"+t+"”?",tWho:"Who? “",tName:"Name the concept: “",lWho:"Who?",lDef:tl("Definition"),tf:"True or false",T:"True",F:"False",sep:": "};
  function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  const R=rng(20261022);
  const sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=(R()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]]}return a};
  const F=FACTS.map(x=>({s:x[0],c:x[1],k:x[2],t:x[3],d:x[4],al:x[5]?x[5].split(";"):[]}));
  const byK={c:F.filter(f=>f.k==="c"),p:F.filter(f=>f.k==="p")};
  function others(f,n,field,sameCat){
    const pool=byK[f.k].filter(g=>g.t!==f.t&&g.d!==f.d);
    const same=sh(pool.filter(g=>g.c===f.c)),rest=sh(pool.filter(g=>g.c!==f.c));
    const seen=new Set([f[field]]),out=[];
    for(const g of(sameCat?same.concat(rest):rest)){if(seen.has(g[field]))continue;seen.add(g[field]);out.push(g);if(out.length>=n)break}
    return out;
  }
  const clean=t=>t.replace(/\s*\(.*?\)/g,"").trim();
  const sq=t=>norm(t).replace(/ /g,"");
  const toks=t=>new Set(norm(clean(t)).split(" "));
  const sub=(x,y)=>{const a=toks(x),b=toks(y);return[...a].every(w=>b.has(w))||[...b].every(w=>a.has(w))};
  function variants(f){return [clean(f.t),...f.al]}
  const gq=[],gt=[];
  for(const f of F){
    const P=f.k==="p";
    for(let v=0;v<2;v++){   // definition -> term
      const o=others(f,3,"t",true);if(o.length===3)gq.push({s:f.s,t:P?L.lWho:L.lDef,q:(P?L.who:L.which)+f.d+"”",o:[f.t,...o.map(g=>g.t)],a:0,e:f.t+" — "+f.d+"."});
    }
    for(let v=0;v<2;v++){   // term -> definition
      const o=others(f,3,"d",true);if(o.length===3)gq.push({s:f.s,t:P?L.lWho:tl("Concept"),q:P?L.known(f.t):L.what(f.t),o:[f.d,...o.map(g=>g.d)],a:0,e:f.t+" — "+f.d+"."});
    }
    // true / false (true version and false version with a definition from another concept)
    gq.push({s:f.s,t:L.tf,q:"“"+f.t+"” — "+f.d+".",o:[L.T,L.F],a:0,e:L.T+L.sep+f.t+" — "+f.d+".",tf:true});
    const o1=others(f,1,"d",false)[0];
    if(o1)gq.push({s:f.s,t:L.tf,q:"“"+f.t+"” — "+o1.d+".",o:[L.F,L.T],a:0,e:L.F+L.sep+"“"+f.t+"” = "+f.d+" (“"+o1.t+"” = "+o1.d+").",tf:true});
    // typed
    if(clean(f.t).length<=30){
      const va=variants(f),vs=va.map(sq);
      const n=byK[f.k].filter(g=>g.t!==f.t&&!variants(g).some(x=>va.includes(x))&&!sub(g.t,f.t)&&vs.some(v=>lev(sq(g.t),v)<=Math.max(3,Math.round(v.length*.4)))).map(g=>clean(g.t));
      gt.push({s:f.s,q:(P?L.tWho:L.tName)+f.d+"”",a:va,e:f.t+" — "+f.d+".",n:n.length?n:undefined});
    }
  }
  Q.push(...gq);TQ.push(...gt);
}

// AI-generated quizzes are stored as {sess,mcq,tf,typed,facts}; the engine wants Q/TQ arrays where the right option is o[0]
function normBank(b){
  if(b.Q)return b;
  const Q=(b.mcq||[]).filter(x=>x.o&&x.o.length===4).map(x=>({s:x.s,t:x.t||"",q:x.q,o:x.o,a:0,e:x.e||""}));
  const fr=(b.lang||"fr")==="fr",T=fr?"Vrai":"True",F=fr?"Faux":"False";
  (b.tf||[]).forEach(x=>Q.push({s:x.s,t:fr?"Vrai ou faux":"True or false",q:x.q,o:x.v?[T,F]:[F,T],a:0,e:x.e||"",tf:true}));
  const TQ=(b.typed||[]).filter(x=>x.a&&x.a.length).map(x=>({s:x.s,q:x.q,a:x.a,e:x.e||"",n:x.n&&x.n.length?x.n:undefined}));
  const facts=(b.facts||[]).map(f=>Array.isArray(f)?f:[f.s,f.cat||"",f.kind==="p"?"p":"c",f.term,f.def,(f.aliases||[]).join(";")]);
  return {...b,Q,TQ,facts};
}
function lsKey(k){return BANK.id==="socio"?"socio-"+k:"tpk-"+k+"-"+BANK.id}
function loadBank(raw){
  const b=normBank(raw);
  BANK=b;SESS={...b.sess};Q=b.Q.slice();TQ=b.TQ.slice();NHQ=Q.length;NHT=TQ.length;
  if(b.facts&&b.facts.length)expandFacts(b.facts,b.lang);
  diffInit();
  ALL_S=Object.keys(SESS).map(Number).sort((x,y)=>x-y);
  settings.sess=new Set(ALL_S);
  // questions are in the quiz's language (often English): lets the browser hyphenate long words in the right language
  ["question","reveal","end","cards","exam"].forEach(id=>$(id).lang=b.lang||"fr");
  renderBankUI();
}
// previews behind the glass of the four squares, drawn from the quiz's own content
function plainText(h){const d=document.createElement("div");d.innerHTML=(h||"").replace(/<br\s*\/?>/gi," ");return (d.textContent||"").replace(/\s+/g," ").trim()}
function pickOne(list){return list.length?list[Math.floor(Math.random()*list.length)]:null}
function renderPreviews(){
  if(!BANK)return;
  const clear=id=>{const b=$(id);b.textContent="";return b};
  const ok=q=>q&&q.q&&!q.img;
  const mc=Q.filter(q=>ok(q)&&q.o&&q.o.length>=3&&!q.tf),short=mc.filter(q=>q.q.length<80&&q.o.every(o=>String(o).length<20));
  const q1=pickOne(short.length?short:mc);let b=clear("pvQuiz");
  if(q1){b.append(el("span","pv-q",cut(q1.q,80)));const t=el("span","pv-tiles");shuffle(q1.o.slice(0,4)).forEach((o,i)=>t.append(el("i","pv-t"+i,cut(String(o),28))));b.append(t)}
  const all=Q.concat(TQ).filter(ok),sh=all.filter(q=>q.q.length<70),q2=pickOne(sh.length?sh:all);b=clear("pvExam");
  if(q2){const bar=el("span","pv-bar"),NS="http://www.w3.org/2000/svg",sv=document.createElementNS(NS,"svg");sv.setAttribute("viewBox","0 0 24 24");sv.setAttribute("aria-hidden","true");
    [["path","M6 2h12M6 22h12M7 2c0 6 5 7 5 10s-5 4-5 10M17 2c0 6-5 7-5 10s5 4 5 10"],["path","M9.5 19.5h5L12 16z","fill"],["path","M10 6h4l-2 3z","fill"]].forEach(([t,d,f])=>{const p=document.createElementNS(NS,t);p.setAttribute("d",d);if(f)p.setAttribute("class","sand");sv.append(p)});
    const tr=el("span","pv-time");tr.append(el("i"));bar.append(sv,tr);b.append(bar,el("span","pv-q",cut(q2.q,64)),el("span","pv-ans"))}
  const f=pickOne((BANK.facts||[]).filter(x=>x[3]&&x[3].length<40&&x[4]));b=clear("pvCards");
  if(f){b.append(el("span","pv-card back"),el("span","pv-card front"));const fr=b.querySelector(".front");fr.append(el("small",null,tl("Concept")),el("b",null,f[3]),el("span",null,cut(f[4],110)))}
  const S=window.SHEETS&&window.SHEETS[BANK.id];b=clear("pvSheet");
  if(S){const page=el("span","pv-page"),cv=el("span","pv-cover");cv.append(el("small",null,plainText(S.tag||"")),el("b",null,plainText(S.title)));page.append(cv);
    const sec=S.sections&&S.sections[0];if(sec){page.append(el("em",null,plainText(sec.title)));
      const dl=(sec.blocks||[]).find(x=>x.t==="dl");if(dl&&dl.items.length)dl.items.slice(0,2).forEach(([k,v])=>page.append(el("span","pv-line",cut(k+" · "+v,70))));else page.append(el("span","pv-line",cut(sec.lead||S.intro,90)))}
    page.append(el("span","pv-bars"));b.append(page)}
  requestAnimationFrame(fitPreviews);
}
// the previews fill their square: every text block grows to the biggest size that still fits its box (css/refine.css gives the boxes their share of the height)
function fitsBox(box,flow){
  const cs=getComputedStyle(box),pb=parseFloat(cs.paddingBottom),pv=parseFloat(cs.paddingTop)+pb,ph=parseFloat(cs.paddingLeft)+parseFloat(cs.paddingRight),br=box.getBoundingClientRect();
  if(flow){const kids=[...box.children].filter(c=>!c.classList.contains("pv-bars"));if(!kids.length)return true;
    if(kids.some(k=>k.scrollWidth>k.clientWidth+1))return false;
    return kids[kids.length-1].getBoundingClientRect().bottom<=br.bottom-pb-(flow===2&&box.querySelector(".pv-bars")&&box.querySelector(".pv-bars").offsetHeight?24:0)+.5}
  const r=document.createRange();r.selectNodeContents(box);const rr=r.getBoundingClientRect();
  return rr.height<=box.clientHeight-pv+.5&&rr.width<=box.clientWidth-ph+.5;
}
function fitText(box,min,max,set,flow){
  const run=()=>{let lo=min,hi=max,best=min;
    for(let i=0;i<8&&lo<=hi;i++){const m=Math.floor((lo+hi)/2);set(m);if(fitsBox(box,flow)){best=m;lo=m+1}else hi=m-1}
    set(best);return best};
  box.style.overflowWrap="";
  if(run()===min&&!fitsBox(box,flow)){box.style.overflowWrap="anywhere";run()}   // a very long word in a very narrow showcase may be broken, as a last resort
}
function fitPreviews(){
  const mt=$("modeTabs");if(mt)mt.dataset.n=mt.querySelectorAll(".mcard:not([hidden])").length;   // lets the phone layout (2x2) know how many squares there are
  document.querySelectorAll("#topic .mc-pv").forEach(pv=>{
    pv.classList.remove("tight","tighter");if(!pv.offsetParent)return;pv.lang=(BANK&&BANK.lang)||"fr";
    pv.querySelectorAll(".pv-q").forEach(q=>fitText(q,7,26,v=>{q.style.fontSize=v+"px"}));
    pv.querySelectorAll(".pv-tiles i").forEach(t=>fitText(t,7,20,v=>{t.style.fontSize=v+"px"}));
    const f=pv.querySelector(".pv-card.front");if(f){const tb=f.querySelector("b");fitText(f,6,22,v=>{f.style.setProperty("--fs",v+"px");if(tb)for(let k=2.6;k>=1;k-=.2){tb.style.fontSize=(v*k).toFixed(1)+"px";if(tb.scrollWidth<=tb.clientWidth+1)break}},1)}
    const pg=pv.querySelector(".pv-page");if(pg)fitText(pg,6,16,v=>{pg.style.setProperty("--fs",v+"px")},2)})
}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(!$("topic").hidden)fitPreviews()});
addEventListener("resize",()=>{if(!$("topic").hidden)fitPreviews()});
function cut(s,n){s=plainText(s);if(s.length<=n)return s;s=s.slice(0,n);return s.replace(/\s+\S*$/,"")+"…"}
function renderBankUI(){
  $("bankTitle").textContent=BANK.title;
  $("bankIco").innerHTML=quizIcon(BANK);
  $("bankSub").textContent=BANK.subject||"";
  try{$("qCount").textContent=(Q.length+TQ.length).toLocaleString(LOCALE)}catch(e){}
  const w=BANK.ticker||(BANK.facts||[]).map(f=>f[3]).filter(t=>t&&t.length<=28);
  $("sessLbl").textContent=unit(1).charAt(0).toUpperCase()+unit(1).slice(1);
  const words=shuffle(w).slice(0,28).map((t,i)=>i%2?esc(t):"<b>"+esc(t)+"</b>");
  const h=words.join("  ·  ")+"  ·  ";$("tickerTxt").innerHTML=words.length?h+h:"";
  $("shareQuizBtn").hidden=BANK.id==="socio";
  renderSettings();renderMissBtn();renderPreviews();
}
function sLabel(s){return BANK.tags?BANK.tags[s]:(BANK.id==="socio"?"S":"Ch.")+s}
function unit(k){return tl((BANK.unit||(BANK.id==="socio"?["session","sessions","a session"]:["chapter","chapters","a chapter"]))[k])}
const BUILTIN={socio:()=>window.BANK_SOCIO,culture:()=>window.BANK_CULTURE,energie:()=>window.BANK_ENERGIE,populism:()=>window.BANK_POPULISM,compta2:()=>window.BANK_COMPTA2};
const bankCache={};
// the default quiz ships with the page; the other built-in quizzes (and their study sheets) are fetched the first time they are opened
const scriptP={};
function appVer(){try{return new URL(document.querySelector('script[src*="js/app/"]').src).search}catch(e){return ""}}
function loadScript(src){return scriptP[src]||(scriptP[src]=new Promise(res=>{const s=document.createElement("script");s.src=src+appVer();s.onload=()=>res(true);s.onerror=()=>{delete scriptP[src];res(false)};document.head.appendChild(s)}))}
async function ensureBank(id){
  if(BUILTIN[id]())return true;
  const m=(window.BANK_META||{})[id];
  const [ok]=await Promise.all([loadScript("js/banks/"+id+".js"),m&&m.sheet?loadScript("js/sheets/"+id+".js"):0]);
  if(!ok||!BUILTIN[id]())return false;
  if(window.TipokiFig&&TipokiFig.tagLate)TipokiFig.tagLate("BANK_"+id.toUpperCase());
  return true}
async function useBank(id){
  id=id||"socio";if(BANK&&BANK.id===id)return true;
  if(BUILTIN[id]){if(!await ensureBank(id))return false;loadBank(BUILTIN[id]());return true}
  let b=bankCache[id];
  if(!b){
    let data=null;
    if(sb&&navigator.onLine){try{const r=await sb.from("quizzes").select("id,title,subject,lang,data").eq("id",id).maybeSingle();if(!r.error)data=r.data}catch(e){}}
    if(data)tpkSaveData("quiz-"+id,data);   // a copy on the device, for offline
    else data=await tpkLoadData("quiz-"+id);
    if(!data)return false;
    b=bankCache[id]={...data.data,id:data.id,title:data.title,subject:data.subject,lang:data.lang}}
  loadBank(b);rememberQuiz(b);return true;
}
function myQuizzes(){try{return JSON.parse(lsGet("tpk-quizzes")||"[]")}catch(e){return []}}
function rememberQuiz(b){if(BUILTIN[b.id])return;const l=myQuizzes().filter(x=>x.id!==b.id);l.unshift({id:b.id,title:b.title});lsSet("tpk-quizzes",JSON.stringify(l.slice(0,30)))}
function esc(t){return String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function genCode(){const A="ABCDEFGHJKLMNPQRSTUVWXYZ";let s="";for(let i=0;i<4;i++)s+=A[Math.floor(Math.random()*A.length)];return s}

$("codeIn").addEventListener("input",e=>{e.target.value=e.target.value.toUpperCase().replace(/[^A-Z]/g,"")});
$("codeIn").addEventListener("keydown",e=>{if(e.key==="Enter")$("joinBtn").click()});
$("joinBtn").onclick=()=>{const c=$("codeIn").value.trim();if(c.length!==4){showErr("joinErr",tl("The code is 4 letters."));return}joinGame(c)};
$("soloBtn").onclick=()=>startSolo();
$("missBtn").onclick=()=>playMissed();
function showErr(id,msg){const e=$(id);e.style.color="";e.textContent=msg;e.hidden=!msg}

