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
// off for new visitors (a quiz in the library shouldn't beep), visitors who already played keep sound unless they turned it off
const soundPref=lsGet("socio-sound");
let soundOn=soundPref?soundPref!=="off":!!lsGet("socio-nick"),actx=null;
function syncSoundBtn(){const b=$("soundBtn");b.setAttribute("aria-pressed",soundOn);b.querySelector(".bt").textContent=soundOn?tl("Sound"):tl("Muted");b.title=soundOn?tl("Turn sound effects off"):tl("Turn sound effects on")}
syncSoundBtn();
$("soundBtn").onclick=()=>{soundOn=!soundOn;lsSet("socio-sound",soundOn?"on":"off");syncSoundBtn();if(soundOn)sfx("ok")};
function audio(){
  // iPhone: "ambient" mixes the effects with music already playing (Spotify app, the player) instead of pausing it
  try{if(navigator.audioSession&&navigator.audioSession.type!=="ambient")navigator.audioSession.type="ambient"}catch(e){}
  actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==="suspended")actx.resume();return actx}
// quieter while a playlist is loaded in the music player, so the effects sit under the music
function musicOn(){return !!document.querySelector("#muFrame iframe")}
function tone(f,t0,d,type,vol){const o=actx.createOscillator(),g=actx.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,actx.currentTime+t0);
  vol=(vol||.18)*(musicOn()?.45:1);
  g.gain.setValueAtTime(0.0001,actx.currentTime+t0);g.gain.exponentialRampToValueAtTime(vol,actx.currentTime+t0+.015);g.gain.exponentialRampToValueAtTime(0.0001,actx.currentTime+t0+d);
  o.connect(g);g.connect(actx.destination);o.start(actx.currentTime+t0);o.stop(actx.currentTime+t0+d+.05)}
function sfx(kind){if(!soundOn)return;try{audio();
  if(kind==="tick")tone(880,0,.08,"square",.06);
  else if(kind==="go"){tone(523,0,.12,"triangle");tone(784,.12,.18,"triangle")}
  else if(kind==="ok"){tone(659,0,.12,"triangle");tone(880,.1,.12,"triangle");tone(1319,.2,.28,"triangle",.14)}
  else if(kind==="bad"){tone(196,0,.22,"sawtooth",.09);tone(147,.18,.3,"sawtooth",.08)}
  else if(kind==="join")tone(1047,0,.1,"sine",.1);
  else if(kind==="streak"){[784,988,1175,1568].forEach((f,i)=>tone(f,i*.07,.14,"triangle",.12))}
  else if(kind==="streak5"){[784,988,1175,1568,1976].forEach((f,i)=>tone(f,i*.06,.14,"triangle",.13));tone(2349,.32,.3,"sine",.1)}
  else if(kind==="streak10"){[523,659,784,1047,1319,1568,2093].forEach((f,i)=>tone(f,i*.055,.16,"triangle",.14));[1047,1319,1568,2093].forEach(f=>tone(f,.45,.5,"sine",.07))}
  else if(kind==="win"){[523,659,784,1047,784,1047].forEach((f,i)=>tone(f,i*.13,.22,"triangle",.15))}
}catch(e){}}
// haptics follow the sound toggle until the visitor sets them in Options (muted = silent and still) and are skipped for reduced-motion users
function buzz(p){const h=lsGet("tpk-haptic");if(h?h==="off":!soundOn)return;try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;navigator.vibrate&&navigator.vibrate(p)}catch(e){}}
// feedback for a right answer, escalating with the run of right answers: 1-2 plain, 3-4 chime, 5-9 fuller chime, 10+ fanfare
function rightFx(n){
  if(n>=10){sfx("streak10");buzz([40,30,40,30,40,30,120])}
  else if(n>=5){sfx("streak5");buzz([35,30,35,30,80])}
  else if(n>=3){sfx("streak");buzz([30,30,60])}
  else{sfx("ok");buzz(n===2?[25,30,25]:40)}}
document.addEventListener("pointerdown",()=>{if(soundOn&&!actx){try{audio()}catch(e){}}},{once:true});

// ---------- confetti ----------
const RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function confetti(n){if(RM)return;let c=$("fx");if(!c){c=document.createElement("canvas");c.id="fx";document.body.appendChild(c)}
  const x=c.getContext("2d"),W=c.width=innerWidth,H=c.height=innerHeight,cols=["#4B2FE0","#E8492B","#1F6FE0","#158A4A","#FFC21A","#FFE36E"];
  const ps=Array.from({length:n},()=>({x:W/2+(Math.random()-.5)*W*.3,y:H*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*14-4,r:Math.random()*6+4,c:cols[Math.floor(Math.random()*5)],a:Math.random()*6,va:(Math.random()-.5)*.4}));
  let f=0;(function step(){x.clearRect(0,0,W,H);ps.forEach(p=>{p.vy+=.35;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);x.restore()});
    if(++f<150)requestAnimationFrame(step);else x.clearRect(0,0,W,H)})()}
function countUp(elm,from,to){if(RM||from===to){elm.textContent=to+" pts";return}const t0=performance.now();
  (function f(t){const k=Math.min(1,(t-t0)/700),v=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));elm.textContent=v+" pts";if(k<1)requestAnimationFrame(f)})(t0)}

