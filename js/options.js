// ---------- Options: one place for the settings that used to be scattered ----------
// Sound and vibration are separate here; animations can be turned off by hand; local data can be wiped.
// Keys: "tpk-haptic" (on|off, unset = follows the sound), "tpk-motion" (off = no animations).
(function(){
const root=document.documentElement,topr=document.querySelector(".topr");if(!topr)return;
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function motionOff(){return get("tpk-motion")==="off"}
function applyMotion(){if(motionOff())root.setAttribute("data-motion","off");else root.removeAttribute("data-motion")}
applyMotion();

const gear=document.createElement("button");gear.type="button";gear.className="iconbtn";gear.id="optBtn";
gear.title=tl("Options");gear.setAttribute("aria-label",tl("Options"));gear.setAttribute("aria-haspopup","dialog");
gear.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/><circle cx="12" cy="12" r="3"/></svg>';
topr.insertBefore(gear,topr.firstChild);

const dlg=document.createElement("div");dlg.className="sync-dlg";dlg.id="optDlg";dlg.hidden=true;
dlg.setAttribute("role","dialog");dlg.setAttribute("aria-modal","true");dlg.setAttribute("aria-labelledby","optTitle");
dlg.innerHTML='<div class="sync-card opt-card"><h2 id="optTitle"></h2><div id="optRows"></div><div class="sync-actions"><button type="button" class="btn" id="optClose"></button></div></div>';
document.body.appendChild(dlg);
const rows=dlg.querySelector("#optRows");
dlg.querySelector("#optTitle").textContent=tl("Options");
dlg.querySelector("#optClose").textContent=tl("Done");

function row(label,ctl){const r=document.createElement("div");r.className="opt-row";const s=document.createElement("span");s.textContent=label;r.append(s,ctl);return r}
function toggle(label,get_,toggle_){
  const b=document.createElement("button");b.type="button";b.className="chip";
  const paint=()=>{const on=get_();b.setAttribute("aria-pressed",on);b.textContent=on?tl("On"):tl("Off");b.classList.toggle("on",on)};
  b.onclick=()=>{toggle_();paint()};paint();
  return {row:row(label,b),paint};
}
function hapticOn(){const h=get("tpk-haptic");return h?h!=="off":soundOn}
const items=[];
function build(){
  rows.textContent="";items.length=0;
  items.push(toggle(tl("Sound effects"),()=>soundOn,()=>{$("soundBtn").click()}));
  items.push(toggle(tl("Vibration"),hapticOn,()=>{set("tpk-haptic",hapticOn()?"off":"on");if(hapticOn()&&navigator.vibrate)navigator.vibrate(40)}));
  items.push(toggle(tl("Animations"),()=>!motionOff(),()=>{set("tpk-motion",motionOff()?"on":"off");applyMotion()}));
  items.push(toggle(tl("Anonymous usage stats"),()=>get("tpk-nostats")!=="1",()=>{set("tpk-nostats",get("tpk-nostats")==="1"?"0":"1")}));
  items.forEach(i=>rows.appendChild(i.row));
  const an=document.createElement("p");an.className="muted opt-note";an.textContent=tl("Counts finished and abandoned games without any name, cookie or email, to see how qwebbo is used.");rows.appendChild(an);
  // shortcuts to the settings that live elsewhere
  const sh=document.createElement("div");sh.className="opt-links";
  [["sizeBtn",tl("Text size")],["themeBtn",tl("Theme")]].forEach(([id,t])=>{
    const b=document.createElement("button");b.type="button";b.className="chip";b.textContent=t;b.onclick=()=>{const e=$(id);e&&e.click()};sh.appendChild(b)});
  tpkLangPick().forEach(b=>sh.appendChild(b));   // EN / FR / ES chips
  rows.appendChild(row(tl("Display"),sh));
  const g=$("goalSet");
  if(g){const b=document.createElement("button");b.type="button";b.className="chip";const p=()=>{b.textContent=g.textContent||tl("Goal")};p();b.onclick=()=>{g.click();setTimeout(p,0)};rows.appendChild(row(tl("Daily goal"),b))}
  // data
  const d=document.createElement("div");d.className="opt-data";
  const c=document.createElement("button");c.type="button";c.className="btn ghost";c.textContent=tl("Clear offline copies");
  c.onclick=async()=>{try{await caches.delete("tipoki-data-v1");try{localStorage.removeItem("offq-queue")}catch(e){}c.textContent=tl("Cleared")}catch(e){c.textContent=tl("Nothing to clear")}};
  const w=document.createElement("button");w.type="button";w.className="btn ghost danger";w.textContent=tl("Erase my data on this device");
  let armed=false;
  w.onclick=async()=>{
    if(!armed){armed=true;w.textContent=tl("Tap again to erase everything");return}
    try{Object.keys(localStorage).filter(k=>/^(tpk-|socio-|offq-)/.test(k)).forEach(k=>localStorage.removeItem(k))}catch(e){}
    try{await caches.delete("tipoki-data-v1")}catch(e){}
    location.reload()};
  const n=document.createElement("p");n.className="muted opt-note";n.textContent=tl("Erasing keeps your online account: sign in again to get your progress back.");
  d.append(c,w,n);rows.appendChild(d);
}
function open(){build();dlg.hidden=false;dlg.querySelector("#optClose").focus()}
function close(){dlg.hidden=true;gear.focus()}
gear.onclick=open;
dlg.querySelector("#optClose").onclick=close;
dlg.addEventListener("click",e=>{if(e.target===dlg)close()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!dlg.hidden)close()});
})();
