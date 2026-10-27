
const LETTERS="ABCD";
const $=id=>document.getElementById(id);
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function hue(s){let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h%360}
// profile pictures: small JPEG data URLs, by player id (avs[me] comes from this device)
let avs={};
function avatar(id,name){const a=el("div","av",(name||"?").trim().charAt(0).toUpperCase()||"?");a.style.backgroundColor="hsl("+hue(id)+" 55% 42%)";paintAv(a,avs[id]);return a}
function paintAv(a,src){if(!src)return;a.textContent="";a.classList.add("photo");a.style.backgroundImage="url("+JSON.stringify(src)+")";a.style.backgroundSize="cover";a.style.backgroundPosition="center";a.style.backgroundRepeat="no-repeat"}

// ---------- state ----------
let db=null,user=null,room=null,groom=null,me=null,canWrite=null;
let mode=null, code=null, G=null, P={}, unsubs=[];
let local={qi:-1,shownAt:0,revealing:false,lastStatus:null};
let profiles={};
let ALL_S=[];
// current question bank (built-in socio, or a quiz generated from someone's course)
let BANK=null,SESS={},Q=[],TQ=[],NHQ=0,NHT=0;
const LEN_INF="inf";
let settings={sess:new Set(),len:15,T:20,fmt:"mix",fcSide:"term",fcSet:"all",fcOrd:"shuffle"};
let writeChain=Promise.resolve();

// ---------- backend (Supabase) ----------
const SB_URL="https://eowcxqqkewijzgemqbhi.supabase.co",SB_KEY="sb_publishable_WYtzPauL3s0sPu_Vvj0iOQ_uUTg1uW7";
let sb=null,chan=null,pollT=null;
me=lsGet("socio-pid");if(!me){me="p"+Math.random().toString(36).slice(2,12)+Date.now().toString(36);lsSet("socio-pid",me)}
try{sb=window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:false,autoRefreshToken:false}})}catch(e){sb=null}
function setMultiNote(ok){
  const n=$("multiNote");n.hidden=ok;
  $("createBtn").disabled=!ok;$("joinBtn").disabled=!ok;$("codeIn").disabled=!ok;
  if(!ok)n.textContent="Can't reach the server. Check your internet connection, then reload the page. Solo mode still works.";
}

// ---------- home ----------

$("nick").value=lsGet("socio-nick")||"";
$("nick").addEventListener("input",()=>{lsSet("socio-nick",$("nick").value.trim());showErr("nickErr","");renderMe()});
function myNick(){return ($("nick").value.trim()||"Player").slice(0,18)}
// multiplayer needs a real name, so friends know who is who
function needNick(){if($("nick").value.trim())return false;showErr("nickErr","Enter your first name so your friends know who you are.");$("nick").focus();$("nick").scrollIntoView({block:"center"});return true}

// ---------- profile picture ----------
function myAv(){return lsGet("tpk-avatar")||null}
if(myAv())avs[me]=myAv();
function renderMe(){
  const a=$("pfpAv");a.className="av big";a.removeAttribute("style");a.style.backgroundColor="hsl("+hue(me)+" 55% 42%)";
  a.textContent=($("nick").value.trim()||"?").charAt(0).toUpperCase();paintAv(a,myAv());
  $("pfpPick").textContent=myAv()?"Change photo":"Add a photo";$("pfpDel").hidden=!myAv();
}
// ---- cropper: drag + zoom (slider, wheel, pinch) in a square view shown through a circular mask ----
const AV_OUT=256,AV_MAX=90000;   // saved size: 4x the biggest place it is shown (64 px) so it stays sharp on retina phones
const crop={img:null,V:280,z:1,ox:0,oy:0,pts:new Map(),pinch0:null};
function cropBase(){return crop.V/Math.min(crop.img.width,crop.img.height)}   // scale at which the photo just covers the square
function cropClamp(){const k=cropBase()*crop.z,w=crop.img.width*k,h=crop.img.height*k;
  crop.ox=Math.min(0,Math.max(crop.V-w,crop.ox));crop.oy=Math.min(0,Math.max(crop.V-h,crop.oy))}
function cropDraw(){const c=$("cropCv"),dpr=window.devicePixelRatio||1,V=crop.V;
  if(c.width!==Math.round(V*dpr)){c.width=c.height=Math.round(V*dpr);c.style.width=c.style.height=V+"px"}
  const x=c.getContext("2d");x.setTransform(dpr,0,0,dpr,0,0);x.fillStyle="#fff";x.fillRect(0,0,V,V);x.imageSmoothingQuality="high";
  const k=cropBase()*crop.z;x.drawImage(crop.img,crop.ox,crop.oy,crop.img.width*k,crop.img.height*k)}
// zoom around a point of the view so the photo does not jump
function cropZoomTo(z,fx,fy){z=Math.min(4,Math.max(1,z));const k0=cropBase()*crop.z,k1=cropBase()*z;
  crop.ox=fx-(fx-crop.ox)*k1/k0;crop.oy=fy-(fy-crop.oy)*k1/k0;crop.z=z;$("cropZoom").value=z;cropClamp();cropDraw()}
// big photos are shrunk once, in steps, so the final downscale stays crisp
function loadForCrop(file){return new Promise((ok,ko)=>{const u=URL.createObjectURL(file),img=new Image();
  img.onload=()=>{let w=img.naturalWidth,h=img.naturalHeight;if(!w||!h){URL.revokeObjectURL(u);ko(new Error("img"));return}
    const M=1600,r=Math.min(1,M/Math.max(w,h));
    const c=document.createElement("canvas");c.width=Math.round(w*r);c.height=Math.round(h*r);const x=c.getContext("2d");x.imageSmoothingQuality="high";x.drawImage(img,0,0,c.width,c.height);
    URL.revokeObjectURL(u);ok(c)};   // always go through a canvas: the photo is then decoded and EXIF-rotated once, whatever its size
  img.onerror=()=>{URL.revokeObjectURL(u);ko(new Error("img"))};img.src=u})}
function openCrop(img){
  crop.img=img;crop.pts.clear();crop.pinch0=null;
  crop.V=Math.max(200,Math.min(300,innerWidth-72,innerHeight-300));
  $("cropStage").style.width=$("cropStage").style.height=crop.V+"px";
  crop.z=1;const k=cropBase();crop.ox=(crop.V-img.width*k)/2;crop.oy=(crop.V-img.height*k)/2;
  $("cropZoom").value=1;$("crop").hidden=false;document.body.classList.add("noscroll");cropDraw();$("cropOk").focus()}
function closeCrop(){$("crop").hidden=true;document.body.classList.remove("noscroll");crop.img=null;crop.pts.clear()}
const cst=$("cropStage");
cst.addEventListener("pointerdown",e=>{cst.setPointerCapture(e.pointerId);crop.pts.set(e.pointerId,{x:e.clientX,y:e.clientY});crop.pinch0=null});
cst.addEventListener("pointermove",e=>{const p=crop.pts.get(e.pointerId);if(!p||!crop.img)return;
  if(crop.pts.size===1){crop.ox+=e.clientX-p.x;crop.oy+=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;cropClamp();cropDraw()}
  else{p.x=e.clientX;p.y=e.clientY;const [a,b]=[...crop.pts.values()],d=Math.hypot(a.x-b.x,a.y-b.y);
    if(!crop.pinch0)crop.pinch0={d,z:crop.z};
    const r=cst.getBoundingClientRect();cropZoomTo(crop.pinch0.z*d/Math.max(1,crop.pinch0.d),(a.x+b.x)/2-r.left,(a.y+b.y)/2-r.top)}});
["pointerup","pointercancel"].forEach(t=>cst.addEventListener(t,e=>{crop.pts.delete(e.pointerId);crop.pinch0=null;
}));
cst.addEventListener("wheel",e=>{e.preventDefault();const r=cst.getBoundingClientRect();cropZoomTo(crop.z*Math.exp(-e.deltaY*.002),e.clientX-r.left,e.clientY-r.top)},{passive:false});
$("cropZoom").addEventListener("input",e=>cropZoomTo(+e.target.value,crop.V/2,crop.V/2));
$("cropCancel").onclick=closeCrop;
$("crop").addEventListener("keydown",e=>{if(e.key==="Escape")closeCrop()});
$("cropOk").onclick=()=>{if(!crop.img)return;
  const c=document.createElement("canvas");c.width=c.height=AV_OUT;const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,AV_OUT,AV_OUT);x.imageSmoothingQuality="high";
  const f=AV_OUT/crop.V,k=cropBase()*crop.z*f;x.drawImage(crop.img,crop.ox*f,crop.oy*f,crop.img.width*k,crop.img.height*k);
  let d=c.toDataURL("image/jpeg",.9);for(let q=.8;d.length>AV_MAX&&q>.4;q-=.1)d=c.toDataURL("image/jpeg",q);   // keep it under the database limit
  lsSet("tpk-avatar",d);
  if(lsGet("tpk-avatar")!==d){closeCrop();showErr("nickErr","Couldn't save the photo on this device.");return}
  avs[me]=d;closeCrop();renderMe()};
$("pfpPick").onclick=()=>$("pfpIn").click();
$("pfpIn").onchange=async e=>{const f=e.target.files[0];e.target.value="";if(!f)return;showErr("nickErr","");
  try{openCrop(await loadForCrop(f))}
  catch(err){showErr("nickErr","Can't use this image, try another photo (JPG or PNG).")}};
$("pfpDel").onclick=()=>{try{localStorage.removeItem("tpk-avatar")}catch(e){}delete avs[me];renderMe()};
renderMe();
function renderSettings(){
  const sc=$("sessChips");sc.textContent="";
  const all=el("button","chip","All");all.setAttribute("aria-pressed",settings.sess.size===ALL_S.length);
  all.onclick=()=>{settings.sess=new Set(settings.sess.size===ALL_S.length?[]:ALL_S);renderSettings()};sc.appendChild(all);
  for(const s of ALL_S){const b=el("button","chip",sLabel(s));b.title=SESS[s];b.setAttribute("aria-pressed",settings.sess.has(s));
    b.onclick=()=>{settings.sess.has(s)?settings.sess.delete(s):settings.sess.add(s);renderSettings()};sc.appendChild(b)}
  // question count: only offer lengths the chosen units + format can fill, plus "all" when that is fewer than 50
  const lc=$("lenChips");lc.textContent="";const av=poolSize();
  const want=settings.lenWant||settings.len;settings.len=want===LEN_INF||!av?want:Math.min(want,av);
  const lens=LENS.filter(n=>n===LEN_INF||!av||n<av);
  [av,settings.len].forEach(n=>{if(n&&n!==LEN_INF&&n<=Math.max(50,settings.len)&&!lens.includes(n)){lens.push(n);lens.sort((a,b)=>a===LEN_INF?1:b===LEN_INF?-1:a-b)}});
  lens.forEach(n=>{const b=el("button","chip",n===LEN_INF?"∞":n===av&&!LENS.includes(n)?"All "+n:String(n));if(n===LEN_INF)b.title="Endless questions, until the host ends the game";else if(n===av)b.title="Every question in the "+unit(1)+" you picked";
    b.setAttribute("aria-pressed",settings.len===n);b.onclick=()=>{settings.lenWant=n;renderSettings()};lc.appendChild(b)});
  $("lenAvail").textContent=av?av.toLocaleString("en-US")+" available":"";
  const fc=$("fmtChips");fc.textContent="";
  [["mix","Mix"],["mcq","Multiple choice"],["typed","Typed answer"]].forEach(([k,l])=>{const b=el("button","chip",l);b.setAttribute("aria-pressed",settings.fmt===k);b.onclick=()=>{settings.fmt=k;renderSettings()};fc.appendChild(b)});
  const tc=$("timeChips");tc.textContent="";
  [15,20,30].forEach(n=>{const b=el("button","chip",n+" s");b.setAttribute("aria-pressed",settings.T===n);b.onclick=()=>{settings.T=n;renderSettings()};tc.appendChild(b)});
  renderCardsPanel();if(window.renderExamPanel)renderExamPanel();
}

const LENS=[5,10,15,20,30,50,LEN_INF];
// how many distinct questions the current units + format can give (what buildDeck can fill at most)
function poolSize(){const ss=settings.sess,u=new Set(),add=q=>u.add(q.q+(q.img||""));
  if(settings.fmt!=="typed")Q.forEach(q=>{if(ss.has(q.s))add(q)});
  if(settings.fmt!=="mcq")TQ.forEach(q=>{if(ss.has(q.s))add(q)});
  return u.size}
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
  const mids=orderPool(Q.map((q,i)=>i).filter(i=>ss.has(Q[i].s)&&!exM.has(i)),i=>i<NHQ,seen.m,Q);
  const tids=orderPool(TQ.map((q,i)=>i).filter(i=>ss.has(TQ[i].s)&&!exT.has(i)),i=>i<NHT,seen.t,TQ);
  let a=0,b=0;
  const takeM=()=>{while(a<mids.length){const id=mids[a++],tx=qk(Q[id]);if(used.has(tx))continue;used.add(tx);return{id,o:Q[id].tf?tfOrder(Q[id]):shuffle([0,1,2,3])}}return null};
  const takeT=()=>{while(b<tids.length){const t=tids[b++],tx=qk(TQ[t]);if(used.has(tx))continue;used.add(tx);return{t}}return null};
  const out=[];
  while(out.length<n){
    const it=fmt==="mcq"?takeM():fmt==="typed"?takeT():(out.length%2===1?(takeT()||takeM()):(takeM()||takeT()));
    if(!it)break;out.push(it);
  }
  out.forEach(d=>d.t!=null?seen.t.add(d.t):seen.m.add(d.id));seenSave(seen);
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
function qT(qi){return (G.T+(isT(qi)?10:0))*1000}
function qOf(qi){const d=G.deck[qi];return d.t!=null?TQ[d.t]:Q[d.id]}

// ---------- generated questions (deterministic: same on every device) ----------
function expandFacts(FACTS,lang){
  const fr=lang==="fr",L=fr?{who:"Qui est-ce ? “",which:"Quel concept ? “",known:t=>"Pour quoi "+t+" est connu·e ?",what:t=>"Que désigne « "+t+" » ?",tWho:"Qui ? “",tName:"Donne le concept : “",lWho:"Qui ?",lDef:"Définition",tf:"Vrai ou faux",T:"Vrai",F:"Faux",sep:" : "}
    :{who:"Who is this? “",which:"Which concept is this? “",known:t=>"What is "+t+" known for?",what:t=>"What is “"+t+"”?",tWho:"Who? “",tName:"Name the concept: “",lWho:"Who?",lDef:"Definition",tf:"True or false",T:"True",F:"False",sep:": "};
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
      const o=others(f,3,"d",true);if(o.length===3)gq.push({s:f.s,t:P?L.lWho:"Concept",q:P?L.known(f.t):L.what(f.t),o:[f.d,...o.map(g=>g.d)],a:0,e:f.t+" — "+f.d+"."});
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
  ALL_S=Object.keys(SESS).map(Number).sort((x,y)=>x-y);
  settings.sess=new Set(ALL_S);
  // questions are in the quiz's language (often English): lets the browser hyphenate long words in the right language
  ["question","reveal","end","cards","exam"].forEach(id=>$(id).lang=b.lang||"fr");
  renderBankUI();
}
function renderBankUI(){
  $("bankTitle").textContent=BANK.title;
  $("bankIco").textContent=(BANK.title||"?").trim().charAt(0).toUpperCase();$("bankIco").style.background="hsl("+hue(BANK.id||BANK.title||"")+" 90% 80%)";
  $("bankSub").textContent=BANK.subject||"";
  try{$("qCount").textContent=(Q.length+TQ.length).toLocaleString("en-US")}catch(e){}
  const w=BANK.ticker||(BANK.facts||[]).map(f=>f[3]).filter(t=>t&&t.length<=28);
  $("sessLbl").textContent=unit(1).charAt(0).toUpperCase()+unit(1).slice(1);
  const words=shuffle(w).slice(0,28).map((t,i)=>i%2?esc(t):"<b>"+esc(t)+"</b>");
  const h=words.join("  ·  ")+"  ·  ";$("tickerTxt").innerHTML=words.length?h+h:"";
  $("shareQuizBtn").hidden=BANK.id==="socio";
  renderSettings();renderMissBtn();
}
function sLabel(s){return BANK.tags?BANK.tags[s]:(BANK.id==="socio"?"S":"Ch.")+s}
function unit(k){return (BANK.unit||(BANK.id==="socio"?["session","sessions","a session"]:["chapter","chapters","a chapter"]))[k]}
const BUILTIN={socio:()=>window.BANK_SOCIO,culture:()=>window.BANK_CULTURE,energie:()=>window.BANK_ENERGIE,populism:()=>window.BANK_POPULISM};
const bankCache={};
async function useBank(id){
  id=id||"socio";if(BANK&&BANK.id===id)return true;
  if(BUILTIN[id]){loadBank(BUILTIN[id]());return true}
  let b=bankCache[id];
  if(!b){if(!sb)return false;
    const {data,error}=await sb.from("quizzes").select("id,title,subject,lang,data").eq("id",id).maybeSingle();
    if(error||!data)return false;
    b=bankCache[id]={...data.data,id:data.id,title:data.title,subject:data.subject,lang:data.lang}}
  loadBank(b);rememberQuiz(b);return true;
}
function myQuizzes(){try{return JSON.parse(lsGet("tpk-quizzes")||"[]")}catch(e){return []}}
function rememberQuiz(b){if(BUILTIN[b.id])return;const l=myQuizzes().filter(x=>x.id!==b.id);l.unshift({id:b.id,title:b.title});lsSet("tpk-quizzes",JSON.stringify(l.slice(0,30)))}
function esc(t){return String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function genCode(){const A="ABCDEFGHJKLMNPQRSTUVWXYZ";let s="";for(let i=0;i<4;i++)s+=A[Math.floor(Math.random()*A.length)];return s}

async function refreshOpen(){
  const since=new Date(Date.now()-4*3600e3).toISOString();
  const {data,error}=await sb.from("games").select("code,state,updated_at").gt("updated_at",since).order("updated_at",{ascending:false}).limit(15);
  if(error||!data)return;
  const list=data.filter(r=>r.state&&r.state.status!=="end");
  const box=$("openGames");box.textContent="";
  if(!list.length){box.appendChild(el("p","muted","No open games right now. Create one or enter a code."));return}
  list.forEach(r=>{const g=r.state;
    const row=el("div","gamerow");
    const left=el("div");left.appendChild(el("div","code",r.code));
    left.appendChild(el("div","muted",(g.hostNick||"Someone")+" · "+(g.bankTitle||"Socio Trivia")+" · "+(g.status==="lobby"?"waiting":"question "+(g.qi+1)+(g.inf?"":"/"+g.deck.length))+" · "+(g.inf?"∞":g.deck.length)+" questions"));
    const b=el("button","btn dark","Join");b.onclick=()=>joinGame(r.code);
    row.append(left,b);box.appendChild(row)});
}
function watchOpenGames(){refreshOpen();setInterval(()=>{if(!$("home").hidden)refreshOpen()},4000)}
$("codeIn").addEventListener("input",e=>{e.target.value=e.target.value.toUpperCase().replace(/[^A-Z]/g,"")});
$("codeIn").addEventListener("keydown",e=>{if(e.key==="Enter")$("joinBtn").click()});
$("joinBtn").onclick=()=>{const c=$("codeIn").value.trim();if(c.length!==4){showErr("joinErr","The code is 4 letters.");return}joinGame(c)};
$("createBtn").onclick=createGame;
$("soloBtn").onclick=()=>startSolo();
$("missBtn").onclick=()=>playMissed();
function showErr(id,msg){const e=$(id);e.style.color="";e.textContent=msg;e.hidden=!msg}

// ---------- images (public-domain portraits via Wikipedia) ----------
const imgCache={};
function wikiImg(title){if(imgCache[title])return imgCache[title];
  imgCache[title]=fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(title)).then(r=>r.ok?r.json():null).then(j=>j&&j.thumbnail?j.thumbnail.source:null).catch(()=>null);
  return imgCache[title]}
function preloadImgs(deck){deck.forEach(d=>{if(d.t==null&&Q[d.id]&&Q[d.id].img)wikiImg(Q[d.id].img).then(u=>{if(u){const i=new Image();i.src=u}})})}
function showImg(boxId,imgId,q,hintId){
  const box=$(boxId),img=$(imgId);box.hidden=!q.img;if(!q.img)return;
  img.removeAttribute("src");if(hintId)$(hintId).textContent="";
  const want=q;wikiImg(q.img).then(u=>{if(qOf(G.qi)!==want)return;
    if(u){img.src=u;img.alt=q.o?q.o[q.a]:"";img.onerror=()=>{img.hidden=true;if(hintId)$(hintId).textContent=q.hint||""};img.hidden=false}
    else{img.hidden=true;if(hintId)$(hintId).textContent=q.hint||""}})}

// ---------- sound ----------
let soundOn=lsGet("socio-sound")!=="off",actx=null;
function syncSoundBtn(){$("soundBtn").setAttribute("aria-pressed",soundOn);$("soundBtn").textContent=soundOn?"Sound":"Muted"}
syncSoundBtn();
$("soundBtn").onclick=()=>{soundOn=!soundOn;lsSet("socio-sound",soundOn?"on":"off");syncSoundBtn();if(soundOn)sfx("ok")};
function tone(f,t0,d,type,vol){const o=actx.createOscillator(),g=actx.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,actx.currentTime+t0);
  g.gain.setValueAtTime(0.0001,actx.currentTime+t0);g.gain.exponentialRampToValueAtTime(vol||.18,actx.currentTime+t0+.015);g.gain.exponentialRampToValueAtTime(0.0001,actx.currentTime+t0+d);
  o.connect(g);g.connect(actx.destination);o.start(actx.currentTime+t0);o.stop(actx.currentTime+t0+d+.05)}
function sfx(kind){if(!soundOn)return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==="suspended")actx.resume();
  if(kind==="tick")tone(880,0,.08,"square",.06);
  else if(kind==="go"){tone(523,0,.12,"triangle");tone(784,.12,.18,"triangle")}
  else if(kind==="ok"){tone(659,0,.12,"triangle");tone(880,.1,.12,"triangle");tone(1319,.2,.28,"triangle",.14)}
  else if(kind==="bad"){tone(196,0,.22,"sawtooth",.09);tone(147,.18,.3,"sawtooth",.08)}
  else if(kind==="join")tone(1047,0,.1,"sine",.1);
  else if(kind==="win"){[523,659,784,1047,784,1047].forEach((f,i)=>tone(f,i*.13,.22,"triangle",.15))}
}catch(e){}}
function buzz(p){try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}}
document.addEventListener("pointerdown",()=>{if(soundOn&&!actx){try{actx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}},{once:true});

// ---------- confetti ----------
const RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function confetti(n){if(RM)return;let c=$("fx");if(!c){c=document.createElement("canvas");c.id="fx";document.body.appendChild(c)}
  const x=c.getContext("2d"),W=c.width=innerWidth,H=c.height=innerHeight,cols=["#4B2FE0","#E8492B","#1F6FE0","#158A4A","#FFC21A","#FFE36E"];
  const ps=Array.from({length:n},()=>({x:W/2+(Math.random()-.5)*W*.3,y:H*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*14-4,r:Math.random()*6+4,c:cols[Math.floor(Math.random()*5)],a:Math.random()*6,va:(Math.random()-.5)*.4}));
  let f=0;(function step(){x.clearRect(0,0,W,H);ps.forEach(p=>{p.vy+=.35;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);x.restore()});
    if(++f<150)requestAnimationFrame(step);else x.clearRect(0,0,W,H)})()}
function countUp(elm,from,to){if(RM||from===to){elm.textContent=to+" pts";return}const t0=performance.now();
  (function f(t){const k=Math.min(1,(t-t0)/700),v=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));elm.textContent=v+" pts";if(k<1)requestAnimationFrame(f)})(t0)}

// ---------- engine: writes ----------
function queue(fn){writeChain=writeChain.then(fn).catch(err=>{console.warn(err);toast("Connection problem, try again")});return writeChain}
function writeGame(patch){
  const ng={...G,...patch,seq:(G.seq||0)+1};
  if(patch.status==="q")ng.qAt=Date.now();   // lets someone who joins mid-question get the time that is really left
  onGame(ng);
  if(mode==="solo")return Promise.resolve();
  const c=code;
  return queue(async()=>{const {error}=await sb.from("games").update({state:ng}).eq("code",c);if(error)throw error});
}
function missKey(qi){const d=G.deck[qi];return d.t!=null?"t"+d.t:"m"+d.id}
function missBank(){try{return JSON.parse(lsGet(lsKey("miss"))||"[]")}catch(e){return []}}
function trackMiss(qi,ok){const k=missKey(qi);let b=missBank().filter(x=>x!==k);if(!ok)b.push(k);lsSet(lsKey("miss"),JSON.stringify(b.slice(-300)));renderMissBtn()}
// missed questions bank: keys "m<id>" / "t<id>" of questions answered wrong, a key leaves as soon as it is answered right
function missLive(){return missBank().filter(k=>k[0]==="t"?TQ[+k.slice(1)]:Q[+k.slice(1)])}
function missItem(k){if(k[0]==="t")return {t:+k.slice(1)};const id=+k.slice(1);return {id,o:Q[id].tf?tfOrder(Q[id]):shuffle([0,1,2,3])}}
function playMissed(first){const all=missLive(),f=(first||[]).filter(k=>all.includes(k));
  const keys=shuffle(f).concat(shuffle(all.filter(k=>!f.includes(k)))).slice(0,Math.max(MISS_RUN,f.length));
  if(keys.length)startSolo(keys.map(missItem),{miss:all.length})}
const MISS_RUN=30;
function renderMissBtn(){const n=missLive().length;$("missPanel").hidden=!n;$("missN").textContent=n;
  $("missTitle").textContent=n===1?"1 missed question":n+" missed questions";
  $("missBtn").textContent=n>MISS_RUN?"Replay "+MISS_RUN:"Replay "+(n===1?"it":"them")}
function writeAnswer(qi,entry){trackMiss(qi,isRight(entry,qi));
  P[me]={...(P[me]||{nick:myNick(),joined:Date.now()}),ans:{...((P[me]||{}).ans||{}),[qi]:entry}};onPlayers();
  if(mode==="solo")return;
  const ans=P[me].ans,c=code;
  queue(async()=>{const {error}=await sb.from("players").update({ans}).eq("code",c).eq("pid",me);if(error)throw error});
}
function toast(msg){$("status").textContent=msg}

// ---------- engine: create / join ----------
async function insertGame(g){
  for(let i=0;i<8;i++){const c=genCode();const {error}=await sb.from("games").insert({code:c,state:g});
    if(!error)return c;if(error.code!=="23505")throw error}
  throw new Error("code");
}
async function createGame(){
  showErr("createErr","");if(needNick())return;
  if(!settings.sess.size){showErr("createErr","Choose at least "+unit(2)+".");return}
  lsSet("socio-nick",myNick());
  $("createBtn").disabled=true;
  try{
    const g={host:me,hostNick:myNick(),bank:BANK.id,bankTitle:BANK.title,status:"lobby",qi:0,deck:buildDeck(),T:settings.T,created:Date.now(),seq:1,sess:[...settings.sess],fmt:settings.fmt,inf:settings.len===LEN_INF};
    const c=await insertGame(g);
    await joinGame(c);
  }catch(e){showErr("createErr","Couldn't create the game. Check your connection.")}
  finally{$("createBtn").disabled=false}
}
function applyGame(s){if(!s)return;if(G&&local.lastStatus!==null&&(s.seq||0)<=(G.seq||0))return;onGame(s)}
function rowToPlayer(r){let ans=r.ans||{};const l=P[r.pid];if(r.pid===me&&l)ans={...ans,...(l.ans||{})};return {nick:r.nick,joined:Date.parse(r.created_at)||0,ans}}
async function loadPlayers(){
  const {data,error}=await sb.from("players").select("pid,nick,ans,created_at").eq("code",code);
  if(error||!data)return;
  const n={};data.forEach(r=>n[r.pid]=rowToPlayer(r));
  if(JSON.stringify(n)!==JSON.stringify(P)){P=n;onPlayers()}
  loadAvatars(Object.keys(n));
}
// photos are only fetched once per player (polling skips them to save bandwidth)
let avAsked=new Set(),avCol=true;
async function loadAvatars(ids){
  ids=ids.filter(id=>id!==me&&!avAsked.has(id));if(!avCol||!ids.length)return;
  ids.forEach(id=>avAsked.add(id));const c=code;
  const {data,error}=await sb.from("players").select("pid,avatar").eq("code",c).in("pid",ids);
  if(error){avCol=false;return}
  let got=false;(data||[]).forEach(r=>{if(r.avatar&&avs[r.pid]!==r.avatar){avs[r.pid]=r.avatar;got=true}});
  if(got&&code===c)onPlayers();
}
async function poll(){
  if(mode!=="multi"||!code)return;
  const {data}=await sb.from("games").select("state").eq("code",code).maybeSingle();
  if(data)applyGame(data.state);
  await loadPlayers();
}
async function joinGame(c){
  showErr("joinErr","");if(needNick())return;
  lsSet("socio-nick",myNick());
  const {data,error}=await sb.from("games").select("state").eq("code",c).maybeSingle();
  if(error){showErr("joinErr","Can't connect, try again.");return}
  if(!data){showErr("joinErr","No game with this code.");return}
  if(!await useBank(data.state.bank)){showErr("joinErr","Couldn't load this game's quiz.");return}
  leaveGame(true);
  mode="multi";code=c;G=data.state;P={};local={qi:-1,shownAt:0,revealing:false,lastStatus:null};
  const {data:mine}=await sb.from("players").select("pid").eq("code",c).eq("pid",me).maybeSingle();
  if(G.status==="end"&&!mine){mode=null;code=null;G=null;show("home");showErr("joinErr","This game is already over. Ask the host for a rematch.");return}
  // joining a game already under way: you play from the current question on (the next one if answers are being shown)
  if(G.status!=="lobby"&&!mine)local.joinQi=G.status==="q"?G.qi:G.qi+1;
  avAsked=new Set();
  const save=row=>mine?sb.from("players").update(row).eq("code",c).eq("pid",me):sb.from("players").insert({code:c,pid:me,...row});
  let res=await save(avCol?{nick:myNick(),avatar:myAv()}:{nick:myNick()});
  if(res.error&&avCol){avCol=false;res=await save({nick:myNick()})}   // no avatar column yet: play without photos
  if(res.error){mode=null;code=null;show("home");showErr("joinErr","Couldn't join, try again.");return}
  chan=sb.channel("g-"+c)
    .on("postgres_changes",{event:"*",schema:"public",table:"games",filter:"code=eq."+c},p=>{if(code===c&&p.new&&p.new.state)applyGame(p.new.state)})
    .on("postgres_changes",{event:"*",schema:"public",table:"players",filter:"code=eq."+c},p=>{if(code===c&&p.new&&p.new.pid){if(p.new.avatar&&p.new.pid!==me)avs[p.new.pid]=p.new.avatar;P={...P,[p.new.pid]:rowToPlayer(p.new)};onPlayers()}})
    .subscribe();
  pollT=setInterval(poll,2500);
  await loadPlayers();
  onGame(G);
}
function startSolo(customDeck,opt){
  if(!customDeck&&!settings.sess.size){showErr("createErr","Choose at least "+unit(2)+".");return}
  leaveGame(true);
  mode="solo";code=null;
  G={host:me,status:"q",qi:0,deck:customDeck||buildDeck(),T:settings.T,created:Date.now(),seq:1,inf:!customDeck&&settings.len===LEN_INF,review:!!customDeck,sess:[...settings.sess],fmt:settings.fmt};
  if(opt&&opt.miss)G.miss=opt.miss;   // replaying the missed questions: remembers how many there were
  P={[me]:{nick:myNick(),joined:Date.now(),ans:{}}};local={qi:-1,shownAt:0,revealing:false,lastStatus:null};
  onGame(G);
}
function leaveGame(silent){
  if(chan){try{sb.removeChannel(chan)}catch(e){}chan=null}
  if(pollT){clearInterval(pollT);pollT=null}
  if(!silent){mode=null;code=null;G=null;P={};show("topic");if(sb)refreshOpen()}   // back to the quiz you just played, ready for another round
}
function isHost(){return G&&G.host===me}

// ---------- engine: reactions ----------
function onGame(g){
  if(g&&g.deck&&(!G||G.deck!==g.deck))preloadImgs(g.deck);
  const prevNext=G&&G.next;
  G=g;
  if(g.next&&g.next!==code&&mode==="multi"&&!isHost()&&g.next!==prevNext){setTimeout(()=>joinGame(g.next),600);return}
  if(g.status==="q"&&g.qi!==local.qi){local.qi=g.qi;local.revealing=false;
    // arriving mid-question (late join or reload): the clock keeps running, so skip the intro and take off the time already gone (always leave 3 s)
    const gone=local.lastStatus===null&&g.qAt?Math.min(Date.now()-g.qAt-1100,qT(g.qi)-3000):0;
    local.shownAt=gone>0?performance.now()-gone:performance.now()+1100;renderQuestion()}
  else if(g.status!==local.lastStatus||g.status!=="q")renderScreen();
  local.lastStatus=g.status;
}
function onPlayers(){
  if(!G)return;
  // someone joined a game already under way: let everyone know
  const ids=Object.keys(P);if(local.known&&mode==="multi"&&G.status!=="lobby"){const nw=ids.filter(id=>!local.known.has(id)&&id!==me);if(nw.length){sfx("join");joinToast(nw.map(nameOf).join(", ")+" joined the game")}}
  local.known=new Set(ids);
  if(G.status==="lobby")renderLobby();
  else if(G.status==="q")renderQState();
  else if(G.status==="reveal")renderReveal();
  else if(G.status==="end")renderEnd();
  
}
function joinToast(msg){let t=$("joinToast");if(!t){t=el("div","jointoast");t.id="joinToast";t.setAttribute("role","status");document.body.appendChild(t)}
  t.textContent=msg;t.hidden=false;t.style.animation="none";void t.offsetWidth;t.style.animation="";clearTimeout(t._h);t._h=setTimeout(()=>t.hidden=true,2600)}
function renderScreen(){
  if(G.status==="lobby"){show("lobby");renderLobby()}
  else if(G.status==="q"){renderQuestion()}
  else if(G.status==="reveal"){show("reveal");renderReveal()}
  else if(G.status==="end"){show("end");renderEnd()}
}
function show(id){["home","topic","make","lobby","question","reveal","end","cards","stats","exam"].forEach(s=>$(s).hidden=s!==id);
  // the name + photo panel follows the player between the two start screens
  const slot=id==="home"?$("meHome"):id==="topic"?$("meTopic"):null,me=document.querySelector(".me-panel");if(slot&&me.parentNode!==slot)slot.appendChild(me);
  if(id==="home"||id==="topic")renderProgressUI();
  $("status").textContent=code?("Game "+code):(mode==="solo"?"Solo":"");window.scrollTo(0,0)}
function nameOf(id){const p=P[id];return (p&&p.nick)||(profiles[id]&&profiles[id].name)||"Player"}

// ---------- scoring ----------
function correctPos(qi){return isT(qi)?-1:G.deck[qi].o.indexOf(0)}
function isRight(a,qi){return !!a&&(isT(qi)?a.ok===true:a.c===correctPos(qi))}
function pts(id,qi){const a=P[id]&&P[id].ans&&P[id].ans[qi];if(!isRight(a,qi))return 0;
  const sp=Math.max(0,1-a.ms/qT(qi));return isT(qi)?700+Math.round(500*sp):500+Math.round(500*sp)}
function scoreRun(id,upto){let t=0,st=0,gain=0;for(let i=0;i<=upto;i++){const p=pts(id,i);let g=0;if(p>0){st++;g=p+Math.min(300,(st-1)*100)}else st=0;t+=g;if(i===upto)gain=g}return {t,gain,streak:st}}
function totals(upto){return Object.keys(P).map(id=>({id,...scoreRun(id,upto)})).sort((a,b)=>b.t-a.t)}

// ---------- lobby ----------
function renderLobby(){
  show("lobby");
  $("lobbyCode").textContent=code;
  $("lobbyInfo").textContent=({mix:"Multiple choice + typed answers",mcq:"Multiple choice",typed:"Typed answers"}[G.fmt||"mcq"])+" · "+(G.inf?"∞":G.deck.length)+" questions · "+G.T+" s per question · "+unit(1)+": "+(G.sess||[]).map(sLabel).join(", ");
  const ids=Object.keys(P).sort((a,b)=>(P[a].joined||0)-(P[b].joined||0));
  $("lobbyCount").textContent=ids.length+(ids.length>1?" players":" player");
  const box=$("lobbyPlayers");box.textContent="";
  ids.forEach(id=>{const d=el("div","pl pop");d.append(avatar(id,nameOf(id)),el("span",null,nameOf(id)));if(id===me)d.appendChild(el("span","you","you"));if(id===G.host)d.appendChild(el("span","you","host"));box.appendChild(d)});
  $("lobbyStart").hidden=!isHost();$("lobbyWait").hidden=isHost();
  $("inviteUrl").textContent=inviteUrl();
  if(local.lobbyN!=null&&ids.length>local.lobbyN)sfx("join");local.lobbyN=ids.length;
}
function inviteUrl(){return location.origin+location.pathname+"?code="+code}
$("inviteBtn").onclick=()=>{const u=inviteUrl();
  const done=()=>{$("inviteBtn").textContent="Link copied!";setTimeout(()=>$("inviteBtn").textContent="Copy invite link",1800)};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(u).then(done,()=>selectInvite());else selectInvite();
  function selectInvite(){const r=document.createRange();r.selectNodeContents($("inviteUrl"));const sel=getSelection();sel.removeAllRanges();sel.addRange(r)}};
$("lobbyStart").onclick=()=>writeGame({status:"q",qi:0});
$("lobbyLeave").onclick=()=>leaveGame(false);

// ---------- question ----------
function renderQuestion(){
  show("question");
  const item=G.deck[G.qi],q=qOf(G.qi),typed=isT(G.qi);
  $("qSess").textContent=sLabel(q.s);$("qNum").textContent="Question "+(G.qi+1)+" / "+(G.inf?"∞":G.deck.length)+" · "+(typed?"Typed answer":q.t);
  $("qText").textContent=q.q;
  showImg("qImgBox","qImg",q,"qHint");
  const st=G.qi>0?scoreRun(me,G.qi-1).streak:0;$("qStreak").hidden=st<2;$("qStreak").textContent="STREAK ×"+st;
  if(local.goQ!==G.qi){local.goQ=G.qi;sfx("go");local.lastTick=null}
  const intro=$("qIntro");$("qIntroN").textContent=(G.qi+1)+"/"+(G.inf?"∞":G.deck.length);$("qIntroType").textContent=typed?"Typed answer":(q.t||"Multiple choice");
  if(performance.now()<local.shownAt){intro.hidden=false;clearTimeout(local.introT);local.introT=setTimeout(()=>{intro.hidden=true;if(isT(G.qi))$("qInput").focus()},Math.max(0,local.shownAt-performance.now()))}else intro.hidden=true;
  const box=$("qTiles");box.textContent="";box.hidden=typed;$("qType").hidden=!typed;
  if(typed){$("qInput").value="";$("qInput").disabled=false;$("qSend").disabled=false;setTimeout(()=>$("qInput").focus(),50)}
  if(!typed)item.o.forEach((oi,k)=>{const b=el("button","tile t"+k);b.dataset.k=k;b.style.setProperty("--i",k+3);
    b.append(el("span","k",LETTERS[k]),el("span",null,q.o[oi]));b.onclick=()=>pick(k);box.appendChild(b)});
  renderQState();
}
function myAns(){return P[me]&&P[me].ans&&P[me].ans[G.qi]}
function pick(k){
  if(myAns()||G.status!=="q"||isT(G.qi))return;
  const ms=performance.now()-local.shownAt;if(ms<0||ms>qT(G.qi))return;
  writeAnswer(G.qi,{c:k,ms:Math.round(ms)});
}
function sendTyped(){
  if(myAns()||G.status!=="q"||!isT(G.qi))return;
  const txt=$("qInput").value.trim().slice(0,80);if(!txt)return;
  const ms=performance.now()-local.shownAt;if(ms<0||ms>qT(G.qi))return;
  writeAnswer(G.qi,{txt,ok:checkTyped(txt,TQ[G.deck[G.qi].t].a,TQ[G.deck[G.qi].t].n),ms:Math.round(ms)});
}
$("qSend").onclick=sendTyped;
$("qInput").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();sendTyped()}});
function renderQState(){
  if(!G||G.status!=="q")return;
  const a=myAns();
  if(isT(G.qi)){const off=!!a||timeLeft()<=0;$("qInput").disabled=off;$("qSend").disabled=off}
  [...$("qTiles").children].forEach(b=>{const k=+b.dataset.k;b.disabled=!!a||timeLeft()<=0;
    b.classList.toggle("picked",!!a&&a.c===k);b.classList.toggle("dim",!!a&&a.c!==k)});
  const ids=Object.keys(P),done=ids.filter(id=>P[id].ans&&P[id].ans[G.qi]).length;
  const w=$("qWait");
  if(a){w.hidden=false;w.textContent=mode==="multi"&&done<ids.length?"Answer sent · waiting for "+(ids.length-done)+" more":"Answer sent"}
  else if(timeLeft()<=0){w.hidden=false;w.textContent="Time's up"}
  else w.hidden=true;
  $("qHostRow").hidden=!(isHost()&&mode==="multi");
  $("qPlayers").hidden=mode!=="multi";$("qLate").hidden=!(mode==="multi"&&local.joinQi===G.qi&&G.qi>0);
  if(mode==="multi")renderAnswered(ids,done);
}
// who has answered this question: answered players first (fastest first), then those still thinking; never shows what they picked
function renderAnswered(ids,done){
  const at=id=>{const x=P[id].ans&&P[id].ans[G.qi];return x?x.ms:null};
  const order=ids.slice().sort((a,b)=>{const x=at(a),y=at(b);if((x==null)!==(y==null))return x==null?1:-1;return x!=null?x-y:(P[a].joined||0)-(P[b].joined||0)});
  $("qAnsN").textContent=done+" / "+ids.length;
  const box=$("qAnsList"),key=order.map(id=>id+(at(id)!=null?"+":"")+nameOf(id)).join(",");
  if(box.dataset.k===key&&box.dataset.q===String(G.qi))return;   // no flicker on every poll
  const was=new Set(box.dataset.q===String(G.qi)?(box.dataset.done||"").split(","):[]);
  box.dataset.k=key;box.dataset.q=String(G.qi);box.dataset.done=order.filter(id=>at(id)!=null).join(",");box.textContent="";
  order.forEach(id=>{const ok=at(id)!=null,c=el("div","ach"+(ok?" done":"")+(ok&&!was.has(id)?" pop":"")+(id===me?" me":""));
    c.append(avatar(id,nameOf(id)),el("span","nm",id===me?"You":nameOf(id)));if(ok)c.appendChild(el("span","ck","✓"));
    c.title=nameOf(id)+(ok?" has answered":" is thinking…");box.appendChild(c)});
}
function timeLeft(){return qT(G.qi)-(performance.now()-local.shownAt)}
$("qSkip").onclick=()=>{if(isHost()&&G.status==="q"&&!local.revealing){local.revealing=true;writeGame({status:"reveal"})}};
$("qTake").onclick=()=>{if(G.status==="q")writeGame({host:me,status:"reveal"})};

// tick: timer display + host auto-advance
setInterval(()=>{
  if(!G||G.status!=="q"||$("question").hidden)return;
  const left=timeLeft();
  const sec=Math.max(0,Math.ceil(Math.min(left,qT(G.qi))/1000));$("qTimer").textContent=sec;$("qTimer").style.setProperty("--p",Math.max(0,Math.min(1,left/qT(G.qi))).toFixed(3));
  const warn=left<5000&&left>0&&!myAns();if(warn&&local.lastTick!==sec){local.lastTick=sec;sfx("tick")}$("qTimer").classList.toggle("warn",warn);$("qBar").classList.toggle("warn",warn);
  $("qBar").style.width=Math.max(0,Math.min(1,left/qT(G.qi))*100)+"%";
  if(left<=0&&!myAns()&&$("qWait").hidden)renderQState();
  const ids=Object.keys(P);
  const all=ids.length>0&&ids.every(id=>P[id].ans&&P[id].ans[G.qi]);
  if(isHost()&&!local.revealing&&(left<-800||all)){local.revealing=true;setTimeout(()=>writeGame({status:"reveal"}),all?600:0)}
  $("qTakeRow").hidden=!(mode==="multi"&&!isHost()&&left<-10000);
},150);
// after each answer reveal, the next question starts by itself after AUTO_MS (the host's clock drives everyone)
const AUTO_MS=5000;
setInterval(()=>{
  if(!G||G.status!=="reveal"||$("reveal").hidden||!local.autoAt)return;
  const left=local.paused?local.autoLeft:local.autoAt-performance.now();
  renderAuto(left);
  if(isHost()&&!local.paused&&left<=0&&!local.autoFired){local.autoFired=true;goNext()}
},150);
function renderAuto(left){
  const sec=Math.max(0,Math.ceil(left/1000)),host=isHost(),b=$("rAuto");
  $("rBar").style.width=Math.max(0,Math.min(1,left/AUTO_MS))*100+"%";
  const last=!G.inf&&G.qi>=G.deck.length-1,what=last?"Podium":"Next";
  b.disabled=!host;b.classList.toggle("paused",!!local.paused);
  b.textContent=local.paused?"Paused · Resume":(sec>0?what+" in "+sec+" s":what+"…")+(host&&sec>0?" · Pause":"");
  if(!host)$("rWait").textContent=sec>0?(last?"Podium":"Next question")+" in "+sec+" s…":"The host is starting the next one…";
}
$("rAuto").onclick=()=>{if(!isHost()||!local.autoAt||local.autoFired)return;
  if(local.paused){local.paused=false;local.autoAt=performance.now()+Math.max(1500,local.autoLeft)}
  else{local.paused=true;local.autoLeft=local.autoAt-performance.now()}
  renderAuto(local.paused?local.autoLeft:local.autoAt-performance.now())};

// ---------- reveal ----------
function renderReveal(){
  show("reveal");
  if(local.autoQ!==G.qi){local.autoQ=G.qi;local.autoAt=performance.now()+AUTO_MS;local.paused=false;local.autoFired=false}
  const item=G.deck[G.qi],q=qOf(G.qi),cp=correctPos(G.qi),a=myAns(),typed=isT(G.qi);
  $("rSess").textContent=sLabel(q.s);$("rNum").textContent="Question "+(G.qi+1)+" / "+(G.inf?"∞":G.deck.length)+" · "+(typed?"Typed answer":q.t);
  const v=$("rVerdict");
  const late=mode==="multi"&&local.joinQi>G.qi;   // just joined: this question was before your time
  if(local.sfxQ!==G.qi){local.sfxQ=G.qi;if(a&&isRight(a,G.qi)){sfx("ok");buzz(40)}else if(!late){sfx("bad");buzz([60,40,60])}}
  const winners=Object.keys(P).map(id=>({id,a:P[id].ans&&P[id].ans[G.qi]})).filter(x=>isRight(x.a,G.qi)).sort((x,y)=>x.a.ms-y.a.ms);
  $("rFast").hidden=mode!=="multi"||!winners.length;if(winners.length)$("rFast").textContent="Fastest: "+nameOf(winners[0].id)+" in "+(winners[0].a.ms/1000).toFixed(1)+" s";
  const ok=isRight(a,G.qi);$("rMiss").hidden=!G.miss||!a;$("rMiss").className="missnote "+(ok?"ok":"bad");
  $("rMiss").textContent=ok?"✓ Off your missed questions list":"Still on your missed questions list";
  if(late&&!a){v.textContent="You're in! You'll play from the next question";v.className="verdict late"}
  else if(isRight(a,G.qi)){const r=scoreRun(me,G.qi);v.textContent="Correct · +"+r.gain+(r.streak>=2?" · streak ×"+r.streak:"");if(local.confQ!==G.qi){local.confQ=G.qi;confetti(r.streak>=3?120:60)}v.className="verdict ok pop"}
  else if(!a){v.textContent="No answer";v.className="verdict bad pop"}
  else {v.textContent="Wrong";v.className="verdict bad pop"}
  $("rText").textContent=q.q;
  showImg("rImgBox","rImg",q,null);
  const box=$("rTiles");box.textContent="";box.hidden=typed;$("rTyped").hidden=!typed;
  if(typed){$("rGood").textContent=q.a[0];const al=$("rAns");al.textContent="";
    Object.keys(P).forEach(id=>{const x=P[id].ans&&P[id].ans[G.qi];const r=el("div");
      r.append(avatar(id,nameOf(id)),el("span","nm",nameOf(id)+" :"),el("span","txt",x?x.txt:"—"),el("span",x&&x.ok?"okm":"bdm",x&&x.ok?"✓":"✗"));al.appendChild(r)})}
  const counts=[0,0,0,0];if(!typed)Object.values(P).forEach(p=>{const x=p.ans&&p.ans[G.qi];if(x&&x.c!=null)counts[x.c]++});
  if(!typed)item.o.forEach((oi,k)=>{const b=el("button","tile t"+k);b.disabled=true;
    b.append(el("span","k",LETTERS[k]),el("span",null,q.o[oi]));
    if(k===cp)b.classList.add("right");else b.classList.add("dim");if(a&&a.c===k&&k!==cp)b.classList.add("mine");
    if(mode==="multi")b.appendChild(el("span","cnt",counts[k]+" ✓".replace(" ✓","")+(counts[k]===1?" player":" players")));
    box.appendChild(b)});
  $("rExpl").textContent=q.e;
  renderBoard($("rBoard"),totals(G.qi).slice(0,mode==="solo"?1:6),true);
  const last=!G.inf&&G.qi>=G.deck.length-1;
  $("rEnd").hidden=!(G.inf&&isHost());
  $("rNext").hidden=!isHost();$("rNext").textContent=last?"See the podium":"Next question";
  $("rWait").hidden=isHost();
  renderAuto(local.paused?local.autoLeft:local.autoAt-performance.now());
}
function ordinal(n){const v=n%100;return n+(v>=11&&v<=13?"th":["th","st","nd","rd"][n%10]||"th")}
function renderBoard(box,rows,gains){
  box.textContent="";
  rows.forEach((r,i)=>{const d=el("div","brow"+(r.id===me?" me":""));
    d.append(el("span","rk",(i+1)+"."),avatar(r.id,nameOf(r.id)),el("span","nm",nameOf(r.id)+(r.id===me?" (you)":"")),
      el("span","gain",gains&&r.gain?"+"+r.gain:""),el("span","pts",r.t+" pts"));box.appendChild(d);if(gains&&r.gain)countUp(d.lastChild,r.t-r.gain,r.t)});
}
$("rNext").onclick=()=>{if(!isHost()||local.autoFired)return;local.autoFired=true;goNext()};
function goNext(){
  if(!isHost()||G.status!=="reveal")return;$("rNext").disabled=true;setTimeout(()=>$("rNext").disabled=false,800);
  if(G.inf){const p={status:"q",qi:G.qi+1};if(G.qi+1>=G.deck.length-5)p.deck=G.deck.concat(buildDeck(G.sess||[...settings.sess],LEN_INF,G.fmt||settings.fmt,{exclude:G.deck,more:true}));writeGame(p);return}
  if(G.qi>=G.deck.length-1)writeGame({status:"end"});else writeGame({status:"q",qi:G.qi+1});
}
$("rEnd").onclick=()=>{if(isHost())writeGame({status:"end",deck:G.deck.slice(0,G.qi+1),inf:false})};

// ---------- progress: best score per quiz + daily study streak ----------
// kept in this browser for now: statsLoad / statsSave are the only functions touching storage, so an online save can plug in there
const STATS_KEY="tpk-stats",BEST_MIN=5;   // a game needs 5+ questions to count as a record
function statsLoad(){try{const s=JSON.parse(lsGet(STATS_KEY)||"{}");return {best:s.best||{},days:s.days||[]}}catch(e){return {best:{},days:[]}}}
function statsSave(s){lsSet(STATS_KEY,JSON.stringify(s))}
function dayKey(d){d=d||new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function accPct(r){return Math.round(100*r.c/r.n)}
function bestOf(id){return statsLoad().best[id]||null}
function beats(a,b){return !b||a.c*b.n>b.c*a.n||(a.c*b.n===b.c*a.n&&a.pts>b.pts)}   // accuracy first, then points
// saves the game if it is a new record, returns the record held before it
function recordGame(id,r){const s=statsLoad(),prev=s.best[id]||null;if(r.n>=BEST_MIN&&beats(r,prev)){s.best[id]={c:r.c,n:r.n,pts:r.pts,at:Date.now()};statsSave(s)}return prev}
// true when today is a new study day
function markStudyDay(){const s=statsLoad(),k=dayKey();if(s.days[s.days.length-1]===k)return false;s.days=s.days.filter(d=>d!==k).concat(k).slice(-400);statsSave(s);return true}
// days in a row up to today (or up to yesterday while today is not done yet)
function streakInfo(){const days=new Set(statsLoad().days),d=new Date(),today=days.has(dayKey(d));if(!today)d.setDate(d.getDate()-1);
  let n=0;while(days.has(dayKey(d))){n++;d.setDate(d.getDate()-1)}return {n,today}}
const FLAME='<svg class="flame" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 3.5 5.5 6 5.5 11.2A5.5 5.5 0 0 1 12 19a5.5 5.5 0 0 1-5.5-5.8c0-2.4 1.3-4 2.6-5.2.2 1.8 1 2.9 2.2 3.4C11 9 11.3 5.3 12 2z"/></svg>';
function renderStreak(box,txt){const st=streakInfo();box.hidden=!st.n;if(!st.n)return st;
  box.innerHTML=FLAME+"<b></b><span></span>";box.children[1].textContent=st.n+"-day streak";box.children[2].textContent=txt(st);return st}
function renderProgressUI(){
  renderStreak($("homeStreak"),st=>st.today?"Done for today":"Play today to keep it");
  const best=statsLoad().best;
  $("quizGrid").querySelectorAll(".qcard").forEach(c=>{const b=best[c.dataset.id],x=c.querySelector(".qbest");
    if(x)x.hidden=!b;if(b&&x)x.textContent="Best "+accPct(b)+"%"});
  const b=BANK&&best[BANK.id];$("bankBest").hidden=!b;if(b)$("bankBest").textContent="Your best: "+accPct(b)+"% ("+b.c+"/"+b.n+")";
}
function renderEndProgress(){
  const R=local.endRes,box=$("endProg");$("endStreak").hidden=box.hidden=!R;if(!R)return;
  const r=R.r,prev=R.prev,counts=r.n>=BEST_MIN&&!G.review;box.hidden=!counts;
  if(counts){const nb=beats(r,prev);let badge,txt;
    if(!prev){badge="First score";txt=accPct(r)+"% correct. Play again to beat it!"}
    else if(nb){badge="New best!";txt=accPct(r)+"% correct, up from "+accPct(prev)+"%."}
    else if(r.c*prev.n===prev.c*r.n){badge="Best: "+accPct(prev)+"%";txt="Same accuracy as your best. Answer faster to beat it."}
    else{const k=Math.floor(prev.c*r.n/prev.n)-r.c+1;badge="Best: "+accPct(prev)+"%";
      txt="You got "+accPct(r)+"%. "+(k<=r.n-r.c?k+" more correct answer"+(k>1?"s":"")+" would beat your best.":"Your best is perfect: get them all right, and faster, to beat it.")}
    box.classList.toggle("rec",nb);$("endBadge").textContent=badge;$("endProgTxt").textContent=txt;
    $("endMark").hidden=!prev||nb;if(prev)$("endMark").style.left=accPct(prev)+"%";
    const f=$("endFill");f.style.width="0%";requestAnimationFrame(()=>requestAnimationFrame(()=>f.style.width=accPct(r)+"%"))}
  renderStreak($("endStreak"),st=>R.newDay?(st.n>1?"Day "+st.n+" in a row. See you tomorrow!":"Day 1. Come back tomorrow to keep it going."):"You already studied today. Come back tomorrow for day "+(st.n+1)+".");
}

// ---------- end ----------
function renderEnd(){
  show("end");
  const t=totals(G.deck.length-1);
  const myRank=t.findIndex(r=>r.id===me)+1;
  const from=mode==="multi"&&local.joinQi||0;   // joined mid-game: the questions before you arrived don't count as misses
  const correct=G.deck.filter((d,i)=>isRight(P[me]&&P[me].ans&&P[me].ans[i],i)).length;
  $("endTitle").textContent=mode==="solo"?(correct+" / "+G.deck.length+" correct answers"):myRank<1?"Game over":(myRank===1?"You win!":"You finished "+ordinal(myRank));
  const bys={};G.deck.forEach((d,i)=>{if(i<from)return;const s=(d.t!=null?TQ[d.t]:Q[d.id]).s;bys[s]=bys[s]||[0,0];bys[s][1]++;if(isRight(P[me]&&P[me].ans&&P[me].ans[i],i))bys[s][0]++});
  $("endSess").textContent="Your score by "+unit(0)+": "+Object.keys(bys).sort((a,b)=>a-b).map(s=>sLabel(s)+" "+bys[s][0]+"/"+bys[s][1]).join(" · ");
  const pod=$("podium");pod.textContent="";pod.hidden=mode==="solo";
  [1,0,2].forEach(i=>{const r=t[i];const d=el("div","pod p"+(i+1));if(r){d.append(avatar(r.id,nameOf(r.id)),el("div","nm",nameOf(r.id)),el("div","pts",r.t+" pts"))}d.appendChild(el("div","blk",r?String(i+1):""));pod.appendChild(d)});
  renderBoard($("endBoard"),t,false);
  if(typeof recordPlay==="function")recordPlay();
  if(local.confEnd!==G.created){local.confEnd=G.created;
    const r={c:correct,n:G.deck.length-from,pts:(t.find(x=>x.id===me)||{t:0}).t},played=!!P[me],prev=!played||G.review?bestOf(BANK.id):recordGame(BANK.id,r);
    local.endRes=played?{r,prev,newDay:markStudyDay()}:null;
    // light confetti, a bigger burst for a new record or a win
    const big=(!G.review&&r.n>=BEST_MIN&&prev&&beats(r,prev))||(mode==="multi"&&myRank===1);
    if(big||(played&&r.c*2>=r.n))setTimeout(()=>confetti(big?160:60),300);sfx("win")}
  renderEndProgress();
  const miss=$("endMiss");miss.textContent="";
  G.deck.forEach((d,i)=>{const a=P[me]&&P[me].ans&&P[me].ans[i];if(i<from||isRight(a,i))return;const q=qOf(i);
    const x=el("div");x.append(el("div","label",sLabel(q.s)+" · "+(d.t!=null?"Typed answer":q.t)),el("div",null,q.q),el("div","a","→ "+(d.t!=null?q.a[0]:q.o[q.a])));miss.appendChild(x)});
  $("endMissWrap").hidden=!miss.children.length;
  $("endAgain").hidden=!isHost();$("endAgain").textContent=mode==="solo"?"Play again":"Rematch";$("endWait").hidden=isHost()||mode!=="multi";
  const k=miss.children.length,n=missLive().length;
  $("endBankBtn").hidden=!n;$("endBankBtn").textContent="Replay my missed questions ("+n+")";
  $("endMissBtn").hidden=!k||k>=n||G.miss;$("endMissBtn").textContent="Replay this game's "+(k===1?"mistake":k+" mistakes");
  if(G.miss){const fixed=G.deck.length-k;   // a missed-questions replay: say how much of the list got cleared
    $("endAgain").hidden=!!n;   // replaying what is left comes first
    $("endTitle").textContent=n?fixed+" / "+G.deck.length+" cleared":"All cleared!";
    $("endSess").textContent=n?(n===1?"1 missed question left":n+" missed questions left")+". Answer one right and it leaves the list.":"No missed questions left on this quiz. Nice work."}
}
$("endHome").onclick=()=>leaveGame(false);
$("endBankBtn").onclick=()=>playMissed(G.deck.map((d,i)=>i<(mode==="multi"&&local.joinQi||0)||isRight(P[me]&&P[me].ans&&P[me].ans[i],i)?null:d.t!=null?"t"+d.t:"m"+d.id).filter(Boolean));
$("endMissBtn").onclick=()=>{const from=mode==="multi"&&local.joinQi||0;const deck=G.deck.filter((d,i)=>i>=from&&!isRight(P[me]&&P[me].ans&&P[me].ans[i],i)).map(d=>d.t!=null?{t:d.t}:{id:d.id,o:shuffle(d.o)});
  const fix=deck.map(d=>d.t==null&&Q[d.id].tf?{id:d.id,o:tfOrder(Q[d.id])}:d);if(fix.length)startSolo(shuffle(fix))};
$("endAgain").onclick=async()=>{
  if(mode==="solo"){startSolo();return}
  $("endAgain").disabled=true;
  try{
    const g={host:me,hostNick:myNick(),bank:BANK.id,bankTitle:BANK.title,status:"lobby",qi:0,deck:buildDeck(G.sess,G.inf?LEN_INF:G.deck.length,G.fmt||"mcq"),T:G.T,created:Date.now(),seq:1,sess:G.sess,fmt:G.fmt,inf:!!G.inf};
    const c=await insertGame(g);
    await writeGame({next:c});
    await writeChain;
    await joinGame(c);
  }catch(e){toast("Couldn't start a rematch, try again.")}
  finally{$("endAgain").disabled=false}
};
document.addEventListener("keydown",e=>{
  if(!$("question").hidden&&/^[1-4]$/.test(e.key)&&document.activeElement!==$("qInput"))pick(+e.key-1);
  else if(!$("reveal").hidden&&e.key==="Enter"&&isHost()&&!$("rNext").hidden)$("rNext").click();
});
// ---------- flashcards (built from the quiz's facts: term on one side, definition on the other) ----------
let FC={deck:[],i:0,flip:false,res:{}};
function fcStore(){try{return JSON.parse(lsGet(lsKey("cards"))||"{}")}catch(e){return {}}}   // term -> 1 got it, 0 not yet
function fcMark(f,ok){const st=fcStore();st[f[3]]=ok?1:0;lsSet(lsKey("cards"),JSON.stringify(st));markStudyDay()}
function fcPool(){return (BANK.facts||[]).filter(f=>settings.sess.has(Number(f[0])))}
function fcPick(){const st=fcStore(),pool=fcPool();
  return settings.fcSet==="todo"?pool.filter(f=>st[f[3]]!==1):settings.fcSet==="bad"?pool.filter(f=>st[f[3]]===0):pool}
function renderCardsPanel(){
  const has=!!(BANK&&BANK.facts&&BANK.facts.length);$("cardsPanel").hidden=$("cardsJump").hidden=!has;if(!has)return;
  const st=fcStore(),pool=fcPool(),nTodo=pool.filter(f=>st[f[3]]!==1).length,nBad=pool.filter(f=>st[f[3]]===0).length;
  if(settings.fcSet==="bad"&&!nBad)settings.fcSet="all";
  $("fcUnits").textContent=unit(1);
  const chips=(box,key,opts)=>{const c=$(box);c.textContent="";opts.forEach(([k,l,t])=>{const b=el("button","chip",l);if(t)b.title=t;b.setAttribute("aria-pressed",settings[key]===k);b.onclick=()=>{settings[key]=k;renderCardsPanel()};c.appendChild(b)})};
  chips("fcSideChips","fcSide",[["term","Term"],["def","Definition"]]);
  const sets=[["all","All ("+pool.length+")"],["todo","Not known yet ("+nTodo+")","Skips the cards you marked “Got it”"]];
  if(nBad)sets.push(["bad","To review ("+nBad+")","Only the cards you marked “Not yet”"]);
  chips("fcSetChips","fcSet",sets);
  chips("fcOrdChips","fcOrd",[["shuffle","Shuffled"],["course","Course order"]]);
  const n=fcPick().length;$("fcGo").textContent=n?"Study "+n+" card"+(n>1?"s":""):"Study flashcards";
  showErr("fcErr","");
}
function startCards(list){
  if(!list){if(!settings.sess.size){showErr("fcErr","Choose at least "+unit(2)+".");return}
    list=fcPick();if(!list.length){showErr("fcErr",settings.fcSet==="all"?"No cards in these "+unit(1)+".":"You know all these cards. Pick “All” to go through them again.");return}}
  list=settings.fcOrd==="course"?list.slice().sort((a,b)=>a[0]-b[0]):shuffle(list);
  FC={deck:list,i:0,flip:false,res:{}};
  show("cards");renderCard();
}
function renderCard(){
  const n=FC.deck.length,done=FC.i>=n;
  $("fcPlay").hidden=done;$("fcDone").hidden=!done;
  $("fcBar").style.width=(100*Math.min(FC.i,n)/n)+"%";
  if(done){
    const bad=FC.deck.filter((f,i)=>FC.res[i]===0).length,ok=n-bad;
    $("fcSess").hidden=true;$("fcNum").textContent=n+" card"+(n>1?"s":"")+" studied";
    $("fcDoneTitle").textContent=bad?"Round done! "+bad+" card"+(bad>1?"s":"")+" to go over again.":"Round done! You know them all.";
    $("fcDoneOk").textContent=ok;$("fcDoneBad").textContent=bad;
    $("fcRedo").hidden=!bad;$("fcRedo").textContent="Review the "+bad+" again";
    if(!bad){sfx("win");confetti(80)}
    return;
  }
  const f=FC.deck[FC.i],P=f[2]==="p",term=f[3],def=f[4],byDef=settings.fcSide==="def";
  $("fcSess").hidden=false;$("fcSess").textContent=sLabel(f[0]);$("fcSess").title=SESS[f[0]]||"";
  $("fcNum").textContent="Card "+(FC.i+1)+" / "+n;
  $("fcKindF").textContent=byDef?(P?"Who is it?":"Which concept?"):(P?"Person":"Concept");
  $("fcKindB").textContent=byDef?(P?"Person":"Concept"):"Definition";
  $("fcFront").textContent=byDef?def:term;$("fcBack").textContent=byDef?term:def;$("fcBackSub").textContent=byDef?def:term;
  $("fcCard").classList.toggle("def",byDef);
  fcSetFlip(false,true);
  $("fcPrev").disabled=FC.i===0;
}
function fcSetFlip(v,instant){
  FC.flip=v;const c=$("fcCard");
  if(instant){c.classList.add("noanim");c.style.transform="";void c.offsetWidth}
  c.classList.toggle("flipped",v);c.setAttribute("aria-label",v?"Answer shown":"Flip the card");
  if(instant)requestAnimationFrame(()=>c.classList.remove("noanim"));
  $("fcFlip").hidden=v;$("fcAgain").hidden=!v;$("fcGot").hidden=!v;
}
function fcAnswer(ok){
  if(!FC.flip||FC.i>=FC.deck.length)return;
  FC.res[FC.i]=ok?1:0;fcMark(FC.deck[FC.i],ok);buzz(ok?15:[10,40,10]);
  const c=$("fcCard");c.classList.add(ok?"out-r":"out-l");
  setTimeout(()=>{c.classList.remove("out-r","out-l");FC.i++;renderCard()},RM?0:220);
}
$("fcGo").onclick=()=>startCards();
$("cardsJump").onclick=()=>$("cardsPanel").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
$("fcCard").onclick=()=>{if(fcDrag.moved)return;fcSetFlip(!FC.flip)};
$("fcFlip").onclick=()=>fcSetFlip(true);
$("fcGot").onclick=()=>fcAnswer(true);
$("fcAgain").onclick=()=>fcAnswer(false);
$("fcPrev").onclick=()=>{if(FC.i>0){FC.i--;renderCard()}};
$("fcRedo").onclick=()=>startCards(FC.deck.filter((f,i)=>FC.res[i]===0));
$("fcRestart").onclick=()=>startCards(FC.deck.slice());
$("fcQuit").onclick=$("fcHome").onclick=()=>{show("topic");renderCardsPanel()};
// swipe the flipped card: right = got it, left = not yet
const fcDrag={x:0,y:0,on:false,moved:false};
$("fcCard").addEventListener("pointerdown",e=>{fcDrag.on=true;fcDrag.moved=false;fcDrag.x=e.clientX;fcDrag.y=e.clientY});
$("fcCard").addEventListener("pointermove",e=>{if(!fcDrag.on||!FC.flip)return;const dx=e.clientX-fcDrag.x;
  if(!fcDrag.moved&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(e.clientY-fcDrag.y)){fcDrag.moved=true;try{$("fcCard").setPointerCapture(e.pointerId)}catch(err){}}
  if(fcDrag.moved){const c=$("fcCard");c.classList.add("noanim");c.style.transform="translateX("+dx+"px) rotate("+(dx/20)+"deg) rotateY(180deg)";c.dataset.swipe=dx>40?"ok":dx<-40?"bad":""}});
function fcDragEnd(e){if(!fcDrag.on)return;fcDrag.on=false;if(!fcDrag.moved)return;
  const c=$("fcCard"),dx=e.clientX-fcDrag.x;c.classList.remove("noanim");c.style.transform="";delete c.dataset.swipe;
  if(Math.abs(dx)>90)fcAnswer(dx>0);
  setTimeout(()=>{fcDrag.moved=false},0)}
$("fcCard").addEventListener("pointerup",fcDragEnd);
$("fcCard").addEventListener("pointercancel",fcDragEnd);
document.addEventListener("keydown",e=>{
  if($("cards").hidden||!$("fcDone").hidden||e.metaKey||e.ctrlKey||e.altKey)return;
  const onBtn=document.activeElement&&document.activeElement.tagName==="BUTTON";   // a focused button already reacts to Space / Enter
  if((e.key===" "||e.key==="Enter")&&!onBtn){e.preventDefault();fcSetFlip(!FC.flip)}
  else if(e.key==="ArrowRight"){e.preventDefault();FC.flip?fcAnswer(true):fcSetFlip(true)}
  else if(e.key==="ArrowLeft"){e.preventDefault();FC.flip?fcAnswer(false):$("fcPrev").click()}
});
// ---------- quiz maker ----------
// AI generation needs the ANTHROPIC_API_KEY secret on Supabase; until then quizzes are added by hand and the upload form is hidden
const MAKER_ON=false;
function quizUrl(id){return location.origin+location.pathname+"?quiz="+id}
function setQuizParam(){try{history.replaceState(null,"",BANK.id==="socio"?location.pathname:"?quiz="+BANK.id)}catch(e){}}
// step 1 of the start flow: one card per quiz, tapping it opens the settings / create screen
async function openQuiz(id,btn){
  if(btn)btn.disabled=true;const ok=await useBank(id);if(btn)btn.disabled=false;
  if(!ok){toast("Quiz not found");return}
  setQuizParam();show("topic");
}
function quizList(extra){const seen=new Set();return Object.keys(BUILTIN).map(id=>{const b=BUILTIN[id]();return {id,title:b.title,subject:b.subject,kw:b.kw,sess:b.sess,tags:b.tags}}).concat(myQuizzes(),extra||[]).filter(q=>!seen.has(q.id)&&seen.add(q.id))}
// search: lowercase, no accents, punctuation as spaces, so "energie" finds "Énergie électrique"
function fold(s){return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}
function quizHay(q){return fold([q.title,q.subject,q.kw].concat(Object.values(q.sess||(q.data&&q.data.sess)||{}),Object.values(q.tags||{})).join(" "))}
function renderQuizGrid(list){
  const box=$("quizGrid");box.textContent="";
  list.forEach(q=>{const c=el("button","qcard");c.type="button";c.dataset.hay=quizHay(q);c.dataset.id=q.id;
    const ico=el("span","qico",(q.title||"?").trim().charAt(0).toUpperCase());ico.style.background="hsl("+hue(q.id||q.title||"")+" 90% 80%)";
    const t=el("span","qtxt");t.append(el("b",null,q.title));if(q.subject)t.append(el("small",null,q.subject));const qb=el("span","qbest");qb.hidden=true;t.append(qb);
    c.append(ico,t,el("span","qgo","›"));c.onclick=()=>openQuiz(q.id,c);box.appendChild(c)});
  filterQuizzes();renderProgressUI();
}
// every typed word must appear somewhere in the quiz's title, subject, keywords or chapter names
function filterQuizzes(){
  const raw=$("quizSearch").value,words=fold(raw).split(" ").filter(Boolean);let n=0;
  $("quizGrid").querySelectorAll(".qcard").forEach(c=>{const ok=words.every(w=>c.dataset.hay.includes(w));c.hidden=!ok;if(ok)n++});
  $("quizSearchClear").hidden=!raw;
  $("quizEmpty").hidden=n>0||!words.length;$("quizEmptyQ").textContent=raw.trim();
}
function clearQuizSearch(focus){$("quizSearch").value="";filterQuizzes();if(focus)$("quizSearch").focus()}
$("quizSearch").addEventListener("input",filterQuizzes);
$("quizSearch").addEventListener("keydown",e=>{
  if(e.key==="Escape"&&$("quizSearch").value){e.preventDefault();clearQuizSearch(true)}
  else if(e.key==="Enter"){e.preventDefault();$("quizSearch").blur()}
});
$("quizSearchClear").onclick=()=>clearQuizSearch(true);
$("quizEmptyClear").onclick=()=>clearQuizSearch(true);
async function renderMyQuizzes(){
  renderQuizGrid(quizList());
  if(!sb)return;
  const {data}=await sb.from("quizzes").select("id,title,subject,sess:data->sess").order("created_at",{ascending:false}).limit(50);
  if(data&&data.length)renderQuizGrid(quizList(data));
}
$("makePanel").hidden=!MAKER_ON;
$("topicBack").onclick=()=>{show("home");renderMyQuizzes()};
// the logo goes back to the quiz grid from any screen; a game still running asks first
$("brandHome").onclick=e=>{
  if(e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;   // let "open in a new tab" work
  e.preventDefault();
  if(window.examBusy&&examBusy()){if(!confirm("Quit the exam? Your answers will be lost."))return;EX.on=false}
  else if(G&&(G.status==="q"||G.status==="reveal")&&!confirm(mode==="multi"?"Leave the current game? The other players will carry on without you.":"Leave the current game? Your progress will be lost."))return;
  if(mode){leaveGame(true);mode=null;code=null;G=null;P={}}
  try{history.replaceState(null,"",location.pathname)}catch(e){}
  show("home");renderMyQuizzes();if(sb)refreshOpen()};
$("shareQuizBtn").onclick=async()=>{const u=quizUrl(BANK.id);try{await navigator.clipboard.writeText(u);toast("Quiz link copied")}catch(e){prompt("Quiz link",u)}};
let mkFile=null;
function setMkFile(f){
  showErr("mkErr","");
  if(f&&f.size>20*1024*1024){showErr("mkErr","File too large (20 MB max).");f=null}
  if(f&&!/\.(pdf|txt|md)$/i.test(f.name)){showErr("mkErr","Accepted formats: PDF, TXT, MD.");f=null}
  mkFile=f||null;$("mkDrop").classList.toggle("has",!!mkFile);
  $("mkFileTxt").textContent=mkFile?mkFile.name+" ("+Math.ceil(mkFile.size/1024)+" KB) · click to change":"Click or drop a PDF here (20 MB max)";
  if(mkFile&&!$("mkTitle").value.trim())$("mkTitle").value=mkFile.name.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ").slice(0,60);
}
$("mkFile").onchange=e=>setMkFile(e.target.files[0]);
["dragenter","dragover"].forEach(t=>$("mkDrop").addEventListener(t,e=>{e.preventDefault();$("mkDrop").classList.add("over")}));
["dragleave","drop"].forEach(t=>$("mkDrop").addEventListener(t,e=>{e.preventDefault();$("mkDrop").classList.remove("over")}));
$("mkDrop").addEventListener("drop",e=>{const f=e.dataTransfer.files[0];if(f)setMkFile(f)});
function readFile(f,asText){return new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=ko;asText?r.readAsText(f):r.readAsDataURL(f)})}
$("mkGo").onclick=async()=>{
  showErr("mkErr","");
  const title=$("mkTitle").value.trim();let text=$("mkText").value.trim();
  if(!mkFile&&text.length<200){showErr("mkErr","Add a PDF or paste at least a few paragraphs of notes.");return}
  const body={title};
  try{
    if(mkFile&&/\.pdf$/i.test(mkFile.name))body.pdf=(await readFile(mkFile)).split(",")[1];
    else if(mkFile)text=(await readFile(mkFile,true))+"\n\n"+text;
  }catch(e){showErr("mkErr","Couldn't read the file.");return}
  if(text)body.text=text.slice(0,200000);
  const st=$("mkStatus"),steps=["Reading your notes…","Finding the key ideas…","Writing the questions…","Checking the answers…","Almost done…"];
  let k=0;st.hidden=false;st.textContent=steps[0];const tick=setInterval(()=>{k=Math.min(k+1,steps.length-1);st.textContent=steps[k]},12000);
  $("mkGo").disabled=true;
  try{
    const res=await fetch(SB_URL+"/functions/v1/generate-quiz",{method:"POST",headers:{"Content-Type":"application/json",apikey:SB_KEY},body:JSON.stringify(body)});
    const raw=(await res.text()).trim();let out=null;try{out=JSON.parse(raw)}catch(e){}
    if(!out||!out.id)throw new Error((out&&out.error)||"Generation failed, try again.");
    if(!await useBank(out.id))throw new Error("Quiz created but couldn't be loaded.");
    setQuizParam();mkFile=null;setMkFile(null);$("mkText").value="";$("mkTitle").value="";
    show("topic");toast("Quiz ready: "+(Q.length+TQ.length)+" questions");
  }catch(e){showErr("mkErr",e.message||"Generation failed, try again.")}
  finally{clearInterval(tick);st.hidden=true;$("mkGo").disabled=false}
};

loadBank(window.BANK_SOCIO);renderMyQuizzes();
if(sb){setMultiNote(true);watchOpenGames()}else setMultiNote(false);
(async()=>{let id=null;try{id=new URLSearchParams(location.search).get("quiz")}catch(e){}
  if(!id||!(BUILTIN[id]||/^[0-9a-f-]{36}$/i.test(id)))return;
  if(!await useBank(id)){toast("Quiz not found");return}
  show("topic")})();
(()=>{let c=null;try{c=(new URLSearchParams(location.search).get("code")||"").toUpperCase().replace(/[^A-Z]/g,"").slice(0,4)}catch(e){}
  if(!c||c.length!==4)return;$("codeIn").value=c;
  try{history.replaceState(null,"",location.pathname)}catch(e){}
  if(sb&&lsGet("socio-nick"))joinGame(c);
  else{$("nick").focus();showErr("joinErr","Enter your first name, then tap Join.");$("joinErr").style.color="var(--hl)"}})();
