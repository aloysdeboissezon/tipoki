// ---------- profile picture ----------
function myAv(){return lsGet("tpk-avatar")||null}
if(myAv())avs[me]=myAv();
function renderMe(){
  const a=$("pfpAv");a.className="av big";a.removeAttribute("style");a.style.backgroundColor="hsl("+hue(me)+" 55% 42%)";
  a.textContent=($("nick").value.trim()||"?").charAt(0).toUpperCase();paintAv(a,myAv());
  const pb=$("pfpBtn"),pl=tl(myAv()?"Change photo":"Add a photo");pb.title=pl;pb.setAttribute("aria-label",pl);$("pfpDel").hidden=!myAv();
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
  if(lsGet("tpk-avatar")!==d){closeCrop();showErr("nickErr",tl("Couldn't save the photo on this device."));return}
  avs[me]=d;closeCrop();renderMe()};
$("pfpIn").onchange=async e=>{const f=e.target.files[0];e.target.value="";if(!f)return;showErr("nickErr","");
  try{openCrop(await loadForCrop(f))}
  catch(err){showErr("nickErr",tl("Can't use this image, try another photo (JPG or PNG)."))}};
$("pfpDel").onclick=()=>{try{localStorage.removeItem("tpk-avatar")}catch(e){}delete avs[me];renderMe()};
renderMe();
// showcase: one big illustrated tile per part of the quiz; tapping toggles it in the selection used by every mode
const SC_PAL=[["#6C4DFF","#A58BFF","#fff"],["#FF8F73","#FFC1A8","#2a1208"],["#18C29C","#7DEBCB","#04251d"],["#FFC933","#FFE58A","#2b2200"],["#2F9BFF","#8FCBFF","#041a30"],["#FF5FA2","#FFA6CB","#32061a"],["#7AC943","#BDEE96","#12260a"],["#9B6BFF","#D3BCFF","#1b0b3a"]];
const SC_ICO=[[/induct|électromag|magn|aimant|champ/i,"🧲"],[/altern|moteur|machine|turbine/i,"⚙️"],[/calcul|exercice|formule|rendement|math|chiffr/i,"🧮"],[/photovolta|solaire|soleil|solar/i,"☀️"],[/semi|silicium|bande|puce|transistor/i,"🔬"],[/énerg|energ|électri|electri|courant|puissance/i,"⚡"],[/compta|bilan|compte|financ|invest|capital|budget|bourse/i,"📊"],[/histoir|guerre|révolution|siècle|empire|histor/i,"🏛️"],[/géo|monde|pays|europe|carte|geo/i,"🌍"],[/science|chimi|biolog|cell|atom/i,"🧪"],[/art|cinéma|film|musique|peinture|litt/i,"🎨"],[/sport|jeu|game/i,"🏅"],[/popul|politi|démocra|élection|etat|état|pouvoir|gouvern/i,"🗳️"],[/social|sociolog|classe|culture|société|norme|groupe|famille|école|travail/i,"👥"],[/droit|loi|justice|jurid/i,"⚖️"],[/langue|mot|gramm|anglais|english|vocab/i,"💬"]];
const SC_FALL=["📚","💡","🎯","🧠","✨","🔍","🚀","🧩"];
function scIcon(s,i){for(const t of [(BANK.sess0||SESS)[s]||"",(BANK.tags0||BANK.tags||{})[s]||""])for(const [re,e] of SC_ICO)if(re.test(t))return e;return SC_FALL[i%SC_FALL.length]}
function renderShowcase(){
  const g=$("scGrid");if(!g||!BANK)return;g.textContent="";
  const st=fcStore(),cnt={};
  ALL_S.forEach(s=>cnt[s]={q:0,f:0,k:0});
  Q.forEach(q=>{if(cnt[q.s])cnt[q.s].q++});TQ.forEach(q=>{if(cnt[q.s])cnt[q.s].q++});
  (BANK.facts||[]).forEach(f=>{const c=cnt[Number(f[0])];if(c){c.f++;if(st[fk(f)]===1)c.k++}});
  ALL_S.forEach((s,i)=>{
    const [c1,c2,ink]=SC_PAL[i%SC_PAL.length],c=cnt[s],on=settings.sess.has(s);
    const b=el("button","sctile");b.type="button";b.setAttribute("aria-pressed",on);
    b.style.cssText="--c1:"+c1+";--c2:"+c2+";--ink:"+ink;
    b.appendChild(el("span","sc-n",String(i+1)));
    b.appendChild(el("span","sc-ico",scIcon(s,i)));
    b.appendChild(el("span","sc-ck","✓"));
    b.appendChild(el("b","sc-t",SESS[s]||sLabel(s)));
    const meta=[tl(c.q===1?"{n} question":"{n} questions",{n:c.q})];if(c.f)meta.push(tl(c.f===1?"{n} card":"{n} cards",{n:c.f}));
    b.appendChild(el("span","sc-m",meta.join(" · ")));
    if(c.f){const bar=el("span","sc-bar");const fi=el("i");fi.style.width=Math.round(100*c.k/c.f)+"%";bar.appendChild(fi);b.appendChild(bar)}
    b.onclick=()=>{settings.sess.has(s)?settings.sess.delete(s):settings.sess.add(s);renderSettings()};
    g.appendChild(b)});
  const all=settings.sess.size===ALL_S.length;
  $("scCount").textContent=tl("{n} of {m} selected",{n:settings.sess.size,m:ALL_S.length});
  $("scAll").textContent=all?tl("Deselect all"):tl("Select all");
  $("scAll").onclick=()=>{settings.sess=new Set(all?[]:ALL_S);renderSettings()};
}
function renderSettings(){
  renderShowcase();
  const sc=$("sessChips");sc.textContent="";
  const sl=[...settings.sess].sort((a,b)=>a-b);
  $("sessSel").textContent=!sl.length?tl("Pick at least one."):sl.length===ALL_S.length?"":sl.length<=2?sl.map(s=>sLabel(s)+" · "+(SESS[s]||"")).join("  |  "):tl("{n} selected",{n:sl.length});
  const all=el("button","chip",tl("All"));all.setAttribute("aria-pressed",settings.sess.size===ALL_S.length);
  all.onclick=()=>{settings.sess=new Set(settings.sess.size===ALL_S.length?[]:ALL_S);renderSettings()};sc.appendChild(all);
  for(const s of ALL_S){const b=el("button","chip",sLabel(s));b.title=SESS[s];b.setAttribute("aria-pressed",settings.sess.has(s));
    b.onclick=()=>{settings.sess.has(s)?settings.sess.delete(s):settings.sess.add(s);renderSettings()};sc.appendChild(b)}
  // question count: only offer lengths the chosen units + format can fill, plus "all" when that is fewer than 50
  const lc=$("lenChips");lc.textContent="";const av=poolSize();
  const want=settings.lenWant||settings.len;settings.len=want===LEN_INF||!av?want:Math.min(want,av);
  const lens=LENS.filter(n=>n===LEN_INF||!av||n<av);
  [av,settings.len].forEach(n=>{if(n&&n!==LEN_INF&&n<=Math.max(50,settings.len)&&!lens.includes(n)){lens.push(n);lens.sort((a,b)=>a===LEN_INF?1:b===LEN_INF?-1:a-b)}});
  lens.forEach(n=>{const b=el("button","chip",n===LEN_INF?"∞":n===av&&!LENS.includes(n)?tl("All {n}",{n}):String(n));if(n===LEN_INF)b.title=tl("Endless questions, until the host ends the game");else if(n===av)b.title=tl("Every question in the {units} you picked",{units:unit(1)});
    b.setAttribute("aria-pressed",settings.len===n);b.onclick=()=>{settings.lenWant=n;renderSettings()};lc.appendChild(b)});
  $("lenAvail").textContent=av?tl("{n} available",{n:av.toLocaleString(LOCALE)}):"";
  const fc=$("fmtChips");fc.textContent="";
  [["mix",tl("Mix")],["mcq",tl("Multiple choice")],["typed",tl("Typed answer")]].forEach(([k,l])=>{const b=el("button","chip",l);b.setAttribute("aria-pressed",settings.fmt===k);b.onclick=()=>{settings.fmt=k;renderSettings()};fc.appendChild(b)});
  const dc=$("diffChips");dc.textContent="";
  DIFFS.forEach(([k,l])=>{const b=el("button","chip",tl(l));b.setAttribute("aria-pressed",settings.diff===k);if(k===4)b.title=tl("Starts easy, ends hard");b.onclick=()=>{settings.diff=k;renderSettings()};dc.appendChild(b)});
  const tc=$("timeChips");tc.textContent="";
  [15,20,30].forEach(n=>{const b=el("button","chip",n+" s");b.setAttribute("aria-pressed",settings.T===n);b.onclick=()=>{settings.T=n;renderSettings()};tc.appendChild(b)});
  renderCardsPanel();if(window.renderExamPanel)renderExamPanel();
}

const LENS=[5,10,15,20,30,50,LEN_INF];
// how many distinct questions the current units + format can give (what buildDeck can fill at most)
function poolSize(){const ss=settings.sess,u=new Set(),add=q=>u.add(q.q+(q.img||"")),dk=diffOk(settings.diff);
  if(settings.fmt!=="typed")Q.forEach(q=>{if(ss.has(q.s)&&dk(q))add(q)});
  if(settings.fmt!=="mcq")TQ.forEach(q=>{if(ss.has(q.s)&&dk(q))add(q)});
  return u.size}
