// ---------- online save of the progress (username + password, no email) ----------
// The app keeps reading and writing localStorage as before. This file watches the progress keys
// (seen questions, mistakes to review, flashcards, recent quizzes, nickname, photo), copies them to Supabase
// for a signed-in player, and brings them back on another device. Without an account nothing changes.
(()=>{
if(typeof sb==="undefined"||!sb)return;   // no backend: the app stays local-only
const ACCT="tpk-sync",DIRTY="tpk-sync-dirty";
const NOSYNC=new Set(["socio-pid","socio-sound","tpk-theme","tpk-lang","tpk-resume","tpk-examrun","tpk-sid"]);   // per device (a paused solo game stays on its device)
function synced(k){return /^(socio-|tpk-)/.test(k)&&!NOSYNC.has(k)&&!k.startsWith(ACCT)}
const S=Storage.prototype,oGet=S.getItem,oSet=S.setItem,oDel=S.removeItem;
function ls(){try{return window.localStorage}catch(e){return null}}
const store=ls();if(!store)return;
function get(k){try{return oGet.call(store,k)}catch(e){return null}}
function put(k,v){try{v==null?oDel.call(store,k):oSet.call(store,k,v)}catch(e){}}
let acct=null;try{acct=JSON.parse(get(ACCT)||"null")}catch(e){}
function saveAcct(){put(ACCT,acct?JSON.stringify(acct):null)}

// every write to a progress key marks the copy online as out of date
let applying=false,edits=0;
S.setItem=function(k,v){const watch=this===store&&!applying&&synced(k),old=watch?oGet.call(this,k):null;
  oSet.call(this,k,v);if(watch&&old!==String(v))changed()};
S.removeItem=function(k){const watch=this===store&&!applying&&synced(k)&&oGet.call(this,k)!=null;
  oDel.call(this,k);if(watch)changed()};
function changed(){edits++;put(DIRTY,"1");if(acct)later(2500)}

function snap(){const o={};try{for(let i=0;i<store.length;i++){const k=store.key(i);if(synced(k))o[k]=get(k)}}catch(e){}return o}
function apply(o,replace){applying=true;
  try{if(replace)Object.keys(snap()).forEach(k=>{if(!(k in o))store.removeItem(k)});
    for(const k in o)if(synced(k)&&typeof o[k]==="string"&&get(k)!==o[k])store.setItem(k,o[k])}
  catch(e){}finally{applying=false}
  refreshApp()}

// two copies of the progress (this device + online): keep everything from both
function mergeJ(a,b){   // a = this device, b = online
  if(Array.isArray(a)&&Array.isArray(b)){
    if(a.concat(b).every(x=>x&&typeof x==="object"&&"id" in x)){const ids=new Set(a.map(x=>x.id));return a.concat(b.filter(x=>!ids.has(x.id)))}
    const seen=new Set(b.map(x=>JSON.stringify(x)));return b.concat(a.filter(x=>!seen.has(JSON.stringify(x))))}
  if(a&&b&&typeof a==="object"&&typeof b==="object"&&!Array.isArray(a)&&!Array.isArray(b)){
    const o={...b};for(const k in a)o[k]=k in b&&b[k]&&typeof b[k]==="object"?mergeJ(a[k],b[k]):a[k];return o}
  return a}
// keys whose generic merge would be wrong: best score = the better game, study days and exam history stay in order
const better=(a,b)=>!b||a.c*b.n>b.c*a.n||(a.c*b.n===b.c*a.n&&a.pts>b.pts);
function special(k,a,b){
  if(k==="tpk-stats"){const best={...(b.best||{})};for(const id in a.best||{})if(better(a.best[id],best[id]))best[id]=a.best[id];
    return {...b,...a,best,days:[...new Set([...(b.days||[]),...(a.days||[])])].sort().slice(-400)}}
  if(/-cards-sr$/.test(k)){const o={...b};for(const t in a)if(!o[t]||(a[t].t||0)>=(o[t].t||0))o[t]=a[t];return o}   // the most recent review of each card wins
  if(/-exam(-|$)/.test(k)&&Array.isArray(a)&&Array.isArray(b))return mergeJ(a,b).sort((x,y)=>(y.at||0)-(x.at||0)).slice(0,20);
  return mergeJ(a,b)}
function merge(loc,net){const o={...net};
  for(const k in loc){const l=loc[k],n=net[k];
    if(n==null||n===l||l==="")o[k]=n==null||l!==""?l:n;
    else{try{o[k]=JSON.stringify(special(k,JSON.parse(l),JSON.parse(n)))}catch(e){o[k]=l}}}
  return o}
function same(a,b){const ka=Object.keys(a),kb=Object.keys(b);return ka.length===kb.length&&ka.every(k=>a[k]===b[k])}

// the app reads most progress on demand; these parts are already on screen
function refreshApp(){const t=f=>{try{f()}catch(e){}};
  t(()=>{if(document.activeElement!==$("nick"))$("nick").value=get("socio-nick")||""});
  t(()=>{const a=get("tpk-avatar");if(a)avs[me]=a;else delete avs[me]});
  t(renderMe);t(renderMissBtn);t(renderCardsPanel);t(renderMyQuizzes);
  t(()=>renderProgressUI());t(()=>{if(!$("exam")||$("exam").hidden)renderExamPanel()})}   // best scores / streak and exam history, from other features

async function rpc(fn,args){const {data,error}=await sb.rpc(fn,args);
  if(error)throw new Error(/^[a-z_]+$/.test(error.message||"")?error.message:"network");
  if(data&&data.error)throw new Error(data.error);return data}

// ---------- saving ----------
let timer=null,busy=false,again=false,state="ok";
function later(ms){clearTimeout(timer);timer=setTimeout(push,ms)}
async function push(){
  if(!acct)return;if(busy){again=true;return}
  busy=true;again=false;clearTimeout(timer);setState("saving");
  try{
    for(let n=0;n<4;n++){const e0=edits,data=snap();
      const r=await rpc("tpk_push",{p_token:acct.tok,p_data:data,p_rev:acct.rev});
      if(!acct)return;
      if(!r.conflict){acct.rev=r.rev;saveAcct();if(edits===e0)put(DIRTY,null);setState("ok");break}
      apply(merge(snap(),r.data||{}));acct.rev=r.rev;saveAcct()}   // another device saved first: merge, then try again
  }catch(e){
    if(e.message==="bad_token"){dropAcct();setState("expired")}
    else{setState("offline");later(30000)}
  }finally{busy=false;if(again&&acct)later(500)}
}
async function pull(){
  try{const r=await rpc("tpk_pull",{p_token:acct.tok});if(!acct)return;
    acct.u=r.username;
    if(r.rev!==acct.rev){
      if(get(DIRTY))apply(merge(snap(),r.data||{}));   // changes on both sides: keep both
      else apply(r.data||{},true);   // only the other device changed things: take its copy
      acct.rev=r.rev;saveAcct();
      if(get(DIRTY))push();else setState("ok")}
    else if(get(DIRTY))push();else setState("ok");
  }catch(e){if(e.message==="bad_token"){dropAcct();setState("expired")}else setState("offline")}
}
function dropAcct(){acct=null;saveAcct()}
document.addEventListener("visibilitychange",()=>{if(!acct)return;
  if(document.visibilityState==="hidden"&&get(DIRTY))push();
  else if(document.visibilityState==="visible"&&!busy)pull()});

// ---------- UI: a line under the nickname + a small sign-in dialog ----------
const esc2=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const line=document.createElement("div");line.className="sync-line";line.id="syncLine";
const main=document.querySelector(".me-panel .me-main");if(!main)return;main.appendChild(line);
function setState(s){state=s;renderLine()}
function renderLine(){
  if(acct){
    const st={saving:tl("Saving…"),offline:tl("Offline, will retry")}[state]||"";
    line.innerHTML='<span class="sync-txt"><span class="sync-ico" aria-hidden="true"></span>'+tl("Saved online as {u}",{u:"<b>"+esc2(acct.u)+"</b>"})+(st?'<span class="sync-st'+(state==="offline"?" off":"")+'"> · '+st+'</span>':'')+'</span><button type="button" class="linkbtn" id="syncOut">'+tl("Sign out")+'</button>';
    line.querySelector("#syncOut").onclick=signOut}
  else{
    line.innerHTML='<span class="sync-txt"><span class="sync-ico off" aria-hidden="true"></span>'+(state==="expired"?tl("Signed out. Sign in again to keep saving."):tl("Your progress is only on this device."))+'</span><button type="button" class="linkbtn" id="syncIn">'+tl("Save it online")+'</button>';
    line.querySelector("#syncIn").onclick=()=>openDlg(state==="expired"?"in":"new")}
}

const dlg=document.createElement("div");dlg.className="sync-dlg";dlg.id="syncDlg";dlg.hidden=true;
dlg.setAttribute("role","dialog");dlg.setAttribute("aria-modal","true");dlg.setAttribute("aria-labelledby","syncTitle");
dlg.innerHTML=`<form class="sync-card" id="syncForm" novalidate>
  <h2 id="syncTitle">Save your progress</h2>
  <p class="muted sync-help">Find your scores, mistakes to review and flashcards on any device. No email needed.</p>
  <div class="chips sync-tabs" role="group" aria-label="Account"><button type="button" class="chip" data-m="new">New account</button><button type="button" class="chip" data-m="in">I have one</button></div>
  <div class="sync-field"><label class="label" for="syncUser">Username</label><input type="text" id="syncUser" maxlength="20" autocomplete="username" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="E.g. alex_martin"></div>
  <div class="sync-field"><label class="label" for="syncPass">Password</label><input type="password" id="syncPass" maxlength="100" placeholder="At least 6 characters"></div>
  <p class="muted sync-foot" id="syncFoot">There's no email, so keep your password somewhere safe: it's the only way back to your progress.</p>
  <p class="err" id="syncErr" hidden></p>
  <div class="row sync-actions"><button type="button" class="btn ghost" id="syncCancel">Cancel</button><button type="submit" class="btn" id="syncGo">Create account</button></div>
</form>`;
tpkTranslate(dlg);document.body.appendChild(dlg);
const q=id=>dlg.querySelector("#"+id);
let dmode="new";
function setMode(m){dmode=m;dlg.querySelectorAll(".sync-tabs .chip").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===m));
  q("syncGo").textContent=m==="new"?tl("Create account"):tl("Sign in");
  q("syncPass").autocomplete=m==="new"?"new-password":"current-password";
  q("syncPass").placeholder=m==="new"?tl("At least 6 characters"):tl("Your password");
  q("syncFoot").hidden=m!=="new";err("")}
dlg.querySelectorAll(".sync-tabs .chip").forEach(b=>b.onclick=()=>setMode(b.dataset.m));
function err(m){q("syncErr").textContent=m;q("syncErr").hidden=!m}
let lastFocus=null;
function openDlg(m){lastFocus=document.activeElement;setMode(m);q("syncPass").value="";
  if(!q("syncUser").value)q("syncUser").value=(get("socio-nick")||"").replace(/[^A-Za-z0-9_.-]/g,"").slice(0,20);
  dlg.hidden=false;document.body.classList.add("noscroll");setTimeout(()=>(q("syncUser").value?q("syncPass"):q("syncUser")).focus(),0)}
function closeDlg(){dlg.hidden=true;document.body.classList.remove("noscroll");q("syncGo").disabled=false;if(lastFocus&&lastFocus.focus)lastFocus.focus()}
q("syncCancel").onclick=closeDlg;
dlg.addEventListener("keydown",e=>{if(e.key==="Escape")closeDlg()});
dlg.addEventListener("click",e=>{if(e.target===dlg)closeDlg()});
const MSG={bad_username:tl("Username: 3 to 20 letters, numbers, dots, dashes or underscores (no spaces)."),
  bad_password:tl("Password: at least 6 characters."),name_taken:tl("This username is taken. Pick another one, or tap “I have one” if it's yours."),
  bad_login:tl("Wrong username or password."),locked:tl("Too many wrong passwords. Wait 15 minutes, then try again."),
  slow_down:tl("Too many new accounts from this network. Try again in an hour."),too_big:tl("Your progress is too big to save online.")};
q("syncForm").onsubmit=async e=>{e.preventDefault();err("");
  const u=q("syncUser").value.trim(),p=q("syncPass").value;
  if(!/^[A-Za-z0-9_.-]{3,20}$/.test(u)){err(MSG.bad_username);q("syncUser").focus();return}
  if(p.length<6&&dmode==="new"){err(MSG.bad_password);q("syncPass").focus();return}
  q("syncGo").disabled=true;q("syncGo").textContent=dmode==="new"?tl("Creating…"):tl("Signing in…");
  try{
    if(dmode==="new"){const e0=edits,r=await rpc("tpk_signup",{p_username:u,p_password:p,p_data:snap()});
      acct={u:r.username,tok:r.token,rev:r.rev};saveAcct();if(edits===e0)put(DIRTY,null);else later(500)}
    else{const r=await rpc("tpk_login",{p_username:u,p_password:p});
      acct={u:r.username,tok:r.token,rev:r.rev};saveAcct();
      const loc=snap(),m=merge(loc,r.data||{});apply(m);   // keep what was done on this device before signing in
      if(same(m,r.data||{}))put(DIRTY,null);else{put(DIRTY,"1");push()}}
    setState("ok");closeDlg();if(typeof toast==="function")toast(dmode==="new"?tl("Progress saved online"):tl("Progress restored"))
  }catch(x){err(MSG[x.message]||tl("Can't reach the server. Check your connection and try again."))}
  finally{q("syncGo").disabled=false;q("syncGo").textContent=dmode==="new"?tl("Create account"):tl("Sign in")}};
async function signOut(){const t=acct&&acct.tok;
  if(get(DIRTY))await push();
  dropAcct();setState("ok");if(t)rpc("tpk_logout",{p_token:t}).catch(()=>{});
  if(typeof toast==="function")toast(tl("Signed out. Your progress stays on this device."))}

renderLine();
if(acct){setState("saving");pull()}
})();
