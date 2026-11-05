// ---------- online save of the progress (username + password, no email) ----------
// The app keeps reading and writing localStorage as before. This file watches the progress keys
// (seen questions, mistakes to review, flashcards, recent quizzes, nickname, photo), copies them to Supabase
// for a signed-in player, and brings them back on another device. Without an account nothing changes.
(()=>{
if(typeof sb==="undefined"||!sb)return;   // no backend: the app stays local-only
// Which sign-in buttons are shown. Email and Google need only Supabase settings (free). Apple needs a paid Apple Developer account
// (about 99 USD/year) and Phone needs a paid SMS provider (Twilio...): switch them to true once they are set up in Supabase.
const AUTH={email:true,google:true,apple:false,phone:false};
// Supabase Auth only proves who the person is (email link, Google...). The progress itself stays in the same online copy as before:
// right after signing in, tpk_auth_login hands the browser the usual save token. Nothing of the auth session is kept afterwards.
let sbA=null;
try{sbA=window.supabase.createClient(SB_URL,SB_KEY,{auth:{flowType:"implicit",persistSession:true,autoRefreshToken:false,detectSessionInUrl:true,storageKey:"qwebbo-auth"}})}catch(e){sbA=null}
if(sbA&&!(sbA.auth&&typeof sbA.auth.onAuthStateChange==="function"))sbA=null;
const ACCT="tpk-sync",DIRTY="tpk-sync-dirty",LINK="qwebbo-link";   // LINK: a username account waiting to get an email (the page may reload for Google)
const NOSYNC=new Set(["socio-pid","socio-sound","tpk-theme","tpk-lang","tpk-resume","tpk-examrun","tpk-cardrun","tpk-sid","tpk-lgq","tpk-lgseen"]);   // per device (a paused solo game stays on its device)
function synced(k){return /^(socio-|tpk-)/.test(k)&&!NOSYNC.has(k)&&!k.startsWith(ACCT)}
const S=Storage.prototype,oGet=S.getItem,oSet=S.setItem,oDel=S.removeItem;
function ls(){try{return window.localStorage}catch(e){return null}}
const store=ls();if(!store)return;
function get(k){try{return oGet.call(store,k)}catch(e){return null}}
function put(k,v){try{v==null?oDel.call(store,k):oSet.call(store,k,v)}catch(e){}}
let acct=null;try{acct=JSON.parse(get(ACCT)||"null")}catch(e){}
function saveAcct(){put(ACCT,acct?JSON.stringify(acct):null)}
// ESADE access. The page only keeps a HINT of "this account has a verified ESADE email" (to draw the tick on the logo); the real check is
// on the server: /api/esade sends the ESADE quizzes only to a token whose account has a verified ESADE email (see supabase/migrations/add_esade_access.sql).
const ESADE="qwebbo-esade",EPEND="qwebbo-esade-pending";   // EPEND: time a code was asked for (the link in the email may open in another tab)
let esade=null;try{esade=JSON.parse(get(ESADE)||"null")}catch(e){}
const esListeners=[];let esAfter=null;
function esSet(v){esade=v&&v.e?v:null;put(ESADE,esade?JSON.stringify(esade):null);esListeners.forEach(f=>{try{f(esade)}catch(e){}})}
const esPending=()=>{const t=+get(EPEND);return !!t&&Date.now()-t<1800000};

// every write to a progress key marks the copy online as out of date
let applying=false,edits=0;
S.setItem=function(k,v){const watch=this===store&&!applying&&synced(k),old=watch?oGet.call(this,k):null;
  oSet.call(this,k,v);if(watch&&old!==String(v))changed(k)};
S.removeItem=function(k){const watch=this===store&&!applying&&synced(k)&&oGet.call(this,k)!=null;
  oDel.call(this,k);if(watch)changed(k)};
function changed(k){if(k==="tpk-avatar")setTimeout(()=>{t0(renderEntry);if(!dlg.hidden&&!q("onbNick").closest("[hidden]"))t0(onbPaint)},0);edits++;put(DIRTY,"1");if(acct)later(2500)}

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
    const daily={...(b.daily||{})};for(const d in a.daily||{})daily[d]=Math.max(daily[d]||0,a.daily[d]);
    return {...b,...a,best,daily,days:[...new Set([...(b.days||[]),...(a.days||[])])].sort().slice(-400)}}
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
  t(()=>{if(window.tpkCountry)tpkCountry.paint()});t(renderMe);t(renderMissBtn);t(renderCardsPanel);t(renderMyQuizzes);
  t(renderEntry);t(()=>renderProgressUI());t(()=>{if(!$("exam")||$("exam").hidden)renderExamPanel()})}   // best scores / streak and exam history, from other features

async function rpc(fn,args,c){const {data,error}=await (c||sb).rpc(fn,args);
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
function dropAcct(){acct=null;saveAcct();esSet(null)}
addEventListener("online",()=>{if(acct&&!busy){get(DIRTY)?push():pull()}});
document.addEventListener("visibilitychange",()=>{if(!acct)return;
  if(document.visibilityState==="hidden"&&get(DIRTY))push();
  else if(document.visibilityState==="visible"&&!busy)pull()});

// ---------- UI: a line under the nickname + a small sign-in dialog ----------
const AUTH_ON=!!sbA&&(AUTH.email||AUTH.google||AUTH.apple||AUTH.phone);
const esc2=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const line=document.createElement("div");line.className="sync-line";line.id="syncLine";
const main=document.querySelector(".me-panel .me-main");if(!main)return;main.appendChild(line);
function setState(s){state=s;renderLine();renderEntry()}
// top bar: account button (always visible) + a gentle card on the home screen for signed-out players
const topr=document.querySelector(".topr"),acc=document.createElement("button");acc.type="button";acc.className="iconbtn accbtn";acc.id="accBtn";
if(topr)topr.insertBefore(acc,topr.firstChild);
const card=document.createElement("div");card.className="panel accard";card.id="accCard";card.hidden=true;
const home=document.getElementById("home"),heroEl=home&&home.querySelector(".hero");
if(home)home.insertBefore(card,heroEl?heroEl.nextSibling:home.firstChild);
const NUDGE="qwebbo-nudge";
function nudgeOff(){const t=+get(NUDGE)||0;return Date.now()-t<3*864e5}
function renderEntry(){
  const PERSON='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.500 20.500c.8-4 4-6 7.500-6s6.700 2 7.500 6"/></svg>';
  if(acct){
    const u=String(acct.u||"?"),nm=(get("socio-nick")||"").trim()||u.split("@")[0],ph=get("tpk-avatar");
    acc.className="iconbtn accbtn on";acc.title=acc.ariaLabel=tl("Saved online as {u}",{u});
    acc.innerHTML='<span class="acc-av" aria-hidden="true">'+(ph&&/^data:image\//.test(ph)?'<img alt="" src="'+esc2(ph)+'">':esc2(nm.charAt(0).toUpperCase()))+'</span><span class="bt acc-nm">'+esc2(nm)+'</span>';
    card.hidden=true;
  }else{
    acc.className="iconbtn accbtn off";acc.title=acc.ariaLabel=tl("Sign in");
    acc.innerHTML=PERSON+'<span class="bt">'+tl("Sign in")+'</span>';
    if(nudgeOff())card.hidden=true;
    else{card.hidden=false;
      card.innerHTML='<div class="acc-ico" aria-hidden="true">'+PERSON+'</div><div class="acc-main"><b>'+tl("Save your progress")+'</b><span>'+tl("Keep your scores on every device.")+'</span></div><div class="acc-act"><button type="button" class="btn" id="accGo">'+tl("Sign in")+'</button><button type="button" class="linkbtn" id="accNo" aria-label="'+tl("Not now")+'" title="'+tl("Not now")+'">×</button></div>';
      card.querySelector("#accGo").onclick=()=>openDlg(state==="expired"?"in":"new");
      card.querySelector("#accNo").onclick=()=>{put(NUDGE,String(Date.now()));card.hidden=true}}}
}
acc.onclick=()=>{if(acct)openOnb(null,true);else openDlg(state==="expired"?"in":"new")};
function renderLine(){
  if(acct){
    const st={saving:tl("Saving…"),offline:tl("Offline, will retry")}[state]||"";
    line.innerHTML='<span class="sync-txt"><span class="sync-ico" aria-hidden="true"></span>'+tl("Saved online as {u}",{u:"<b>"+esc2(acct.u)+"</b>"})+(st?'<span class="sync-st'+(state==="offline"?" off":"")+'"> · '+st+'</span>':'')+'</span>'+(AUTH_ON&&!acct.au?'<button type="button" class="linkbtn" id="syncAdd">'+tl("Add an email")+'</button>':'')+'<button type="button" class="linkbtn" id="syncOut">'+tl("Sign out")+'</button>';
    line.querySelector("#syncOut").onclick=signOut;
    const ad=line.querySelector("#syncAdd");if(ad)ad.onclick=()=>openDlg("link")}
  else{
    line.innerHTML='<span class="sync-txt"><span class="sync-ico off" aria-hidden="true"></span>'+(state==="expired"?tl("Signed out. Sign in again to keep saving."):tl("Your progress is only on this device."))+'</span><button type="button" class="linkbtn" id="syncIn">'+tl("Save it online")+'</button>';
    line.querySelector("#syncIn").onclick=()=>openDlg(state==="expired"?"in":"new")}
}

const dlg=document.createElement("div");dlg.className="sync-dlg";dlg.id="syncDlg";dlg.hidden=true;
dlg.setAttribute("role","dialog");dlg.setAttribute("aria-modal","true");dlg.setAttribute("aria-labelledby","syncTitle");
dlg.innerHTML=`<div class="sync-card" id="syncCard">
<div class="sync-view" data-v="choose">
  <h2>Save your progress</h2>
  <p class="muted sync-help" id="pvHelp">Pick how you want to sign in. Your scores, mistakes to review and flashcards will follow you on any device.</p>
  <button type="button" class="btn sync-prov" id="pvEmail" hidden><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 8 8 6 8-6"/></svg><span>Continue with Email</span></button>
  <div class="sync-or" id="pvOr" hidden><span>or</span></div>
  <button type="button" class="btn ghost sync-prov" id="pvPhone" hidden><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg><span>Continue with Phone</span></button>
  <button type="button" class="btn ghost sync-prov" id="pvGoogle" hidden><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1.100-3.8 1.100-2.900 0-5.400-2-6.300-4.600H2.100v2.800A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.700 14.100a6.600 6.600 0 0 1 0-4.200V7.100H2.100a11 11 0 0 0 0 9.800z"/><path fill="#EA4335" d="M12 5.400c1.600 0 3.100.6 4.200 1.700l3.100-3.100A11 11 0 0 0 2.100 7.100l3.600 2.800C6.600 7.400 9.100 5.400 12 5.400z"/></svg><span>Continue with Google</span></button>
  <button type="button" class="btn ghost sync-prov" id="pvApple" hidden><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M16.400 12.600c0-2.300 1.900-3.400 2-3.500-1.100-1.600-2.800-1.800-3.400-1.800-1.400-.1-2.800.9-3.500.9s-1.800-.8-3-.8c-1.500 0-3 .9-3.800 2.300-1.600 2.800-.4 7 1.200 9.300.8 1.100 1.700 2.400 2.900 2.300 1.200 0 1.600-.7 3-.7s1.800.7 3 .7c1.300 0 2.100-1.100 2.800-2.200.9-1.300 1.300-2.500 1.300-2.600-.1 0-2.500-1-2.500-3.900zM14.200 5.800c.6-.8 1.100-1.900.9-3-.9 0-2.100.6-2.700 1.400-.6.700-1.100 1.800-1 2.900 1.100.1 2.200-.5 2.800-1.300z"/></svg><span>Continue with Apple</span></button>
  <p class="err" id="pvErr" hidden></p>
  <button type="button" class="linkbtn" id="pvLegacy">Use a username and password instead</button>
  <div class="row sync-actions"><button type="button" class="btn ghost" id="pvCancel">Cancel</button></div>
</div>
<div class="sync-view" data-v="onb">
  <h2 id="onbTitle">Set up your profile</h2>
  <p class="muted sync-help">Your name and photo show next to your scores when you play with friends. You can change them any time.</p>
  <div class="onb-top"><button type="button" class="onb-av av big" id="onbAv" aria-label="Add a photo"></button><div class="sync-field onb-nm"><label class="label" for="onbNick">Your first name or nickname</label><input type="text" id="onbNick" maxlength="18" autocomplete="given-name" placeholder="e.g. Alex"></div></div>
  <button type="button" class="linkbtn onb-ph" id="onbPh">Add a photo</button>
  <div class="sync-field"><label class="label" for="onbCountry">Your country (optional)</label><select id="onbCountry" class="country-sel"></select></div>
  <div class="row sync-actions"><button type="button" class="btn ghost" id="onbSkip">Skip</button><button type="button" class="btn" id="onbDone">Done</button></div>
  <div class="onb-acct" id="onbAcctBox" hidden><p class="muted" id="onbAcct"></p><button type="button" class="linkbtn" id="onbOut">Sign out</button></div>
</div>
<div class="sync-view" data-v="account">
  <h2>Account</h2>
  <p class="muted sync-help" id="acInfo"></p>
  <div class="row sync-actions"><button type="button" class="btn ghost" id="acClose">Close</button><button type="button" class="btn" id="acOut">Sign out</button></div>
</div>
<form class="sync-view" id="emailForm" data-v="email" novalidate hidden>
  <h2>Continue with Email</h2>
  <p class="muted sync-help" id="emHelp">We'll email you a code: no password to remember.</p>
  <div class="sync-field"><label class="label" for="emAddr">Email</label><input type="email" id="emAddr" maxlength="120" autocomplete="email" autocapitalize="off" spellcheck="false" placeholder="you@example.com"></div>
  <div class="sync-field" id="emCodeBox" hidden><label class="label" for="emCode">Code from the email</label><input type="text" id="emCode" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="123456"></div>
  <p class="err" id="emErr" hidden></p>
  <div class="row sync-actions"><button type="button" class="btn ghost" id="emBack">Back</button><button type="submit" class="btn" id="emGo">Send me a code</button></div>
</form>
<form class="sync-view" id="phoneForm" data-v="phone" novalidate hidden>
  <h2>Continue with Phone</h2>
  <p class="muted sync-help" id="phHelp">We'll text you a code.</p>
  <div class="sync-field"><label class="label" for="phNum">Phone number</label><input type="tel" id="phNum" maxlength="20" autocomplete="tel" placeholder="+33 6 12 34 56 78"></div>
  <div class="sync-field" id="phCodeBox" hidden><label class="label" for="phCode">Code</label><input type="text" id="phCode" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="123456"></div>
  <p class="err" id="phErr" hidden></p>
  <div class="row sync-actions"><button type="button" class="btn ghost" id="phBack">Back</button><button type="submit" class="btn" id="phGo">Send me a code</button></div>
</form>
<form class="sync-view" id="esadeForm" data-v="esade" novalidate hidden>
  <div class="es-head"><img class="esade-logo" src="/img/esade.png" width="40" height="40" alt="ESADE"><h2>ESADE only</h2></div>
  <p class="muted sync-help" id="esHelp">These quizzes are for ESADE students and alumni. Enter your ESADE email address and we'll send you a code to confirm it's really yours.</p>
  <div class="sync-field"><label class="label" for="esAddr">Your ESADE email</label><input type="email" id="esAddr" maxlength="120" autocomplete="email" autocapitalize="off" spellcheck="false" placeholder="name@esade.edu"></div>
  <div class="sync-field" id="esCodeBox" hidden><label class="label" for="esCode">Code from the email</label><input type="text" id="esCode" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="123456"></div>
  <p class="muted sync-foot"><span>By continuing you accept the</span> <a href="/terms.html" target="_blank" rel="noopener">terms and conditions</a>.</p>
  <p class="err" id="esErr" hidden></p>
  <div class="row sync-actions"><button type="button" class="btn ghost" id="esCancel">Cancel</button><button type="submit" class="btn" id="esGo">Send me a code</button></div>
  <button type="button" class="linkbtn" id="esSignin">Already have a qwebbo account? Sign in first</button>
</form>
<form class="sync-view" id="syncForm" data-v="legacy" novalidate>
  <button type="button" class="linkbtn sync-back" id="syncBack" hidden>← Other ways to sign in</button>
  <h2 id="syncTitle">Save your progress</h2>
  <p class="muted sync-help">Find your scores, mistakes to review and flashcards on any device. No email needed.</p>
  <div class="chips sync-tabs" role="group" aria-label="Account"><button type="button" class="chip" data-m="new">New account</button><button type="button" class="chip" data-m="in">I have one</button></div>
  <div class="sync-field"><label class="label" for="syncUser">Username</label><input type="text" id="syncUser" maxlength="20" autocomplete="username" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="e.g. alex_martin"></div>
  <div class="sync-field"><label class="label" for="syncPass">Password</label><input type="password" id="syncPass" maxlength="100" placeholder="At least 6 characters"></div>
  <p class="muted sync-foot" id="syncFoot">There's no email, so keep your password somewhere safe: it's the only way back to your progress.</p>
  <p class="err" id="syncErr" hidden></p>
  <div class="row sync-actions"><button type="button" class="btn ghost" id="syncCancel">Cancel</button><button type="submit" class="btn" id="syncGo">Create account</button></div>
</form>
</div>`;
tpkTranslate(dlg);document.body.appendChild(dlg);
const q=id=>dlg.querySelector("#"+id);
let dmode="new";
function setMode(m){m=m==="link"?"new":m;dmode=m;dlg.querySelectorAll(".sync-tabs .chip").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===m));
  q("syncGo").textContent=m==="new"?tl("Create account"):tl("Sign in");
  q("syncPass").autocomplete=m==="new"?"new-password":"current-password";
  q("syncPass").placeholder=m==="new"?tl("At least 6 characters"):tl("Your password");
  q("syncFoot").hidden=m!=="new";err("")}
dlg.querySelectorAll(".sync-tabs .chip").forEach(b=>b.onclick=()=>setMode(b.dataset.m));
function err(m){q("syncErr").textContent=m;q("syncErr").hidden=!m}
let lastFocus=null,linking=false,sentTo=null;
function show(v){dlg.querySelectorAll(".sync-view").forEach(x=>x.hidden=x.dataset.v!==v)}
function perr(id,m){const e=q(id);e.textContent=m;e.hidden=!m}
function onbPaint(){const a=q("onbAv");a.removeAttribute("style");a.className="onb-av av big";
  const nm=q("onbNick").value.trim()||"?",ph=get("tpk-avatar");a.style.backgroundColor="hsl("+(nm.charCodeAt(0)*37%360)+" 55% 42%)";a.textContent=nm.charAt(0).toUpperCase();
  if(ph){a.textContent="";a.classList.add("photo");a.style.backgroundImage="url("+JSON.stringify(ph)+")";a.style.backgroundSize="cover";a.style.backgroundPosition="center"}
  q("onbPh").textContent=ph?tl("Change photo"):tl("Add a photo")}
function openOnb(name,edit){
  dlg.classList.add("page");q("onbAcctBox").hidden=!edit;
  q("onbSkip").textContent=edit?tl("Close"):tl("Skip");
  q("onbTitle").textContent=edit?tl("Your profile"):tl("Set up your profile");
  if(edit)q("onbAcct").innerHTML=tl("Saved online as {u}",{u:"<b>"+esc2(acct?acct.u:"")+"</b>"});
  const sel=q("onbCountry");if(window.tpkCountry){tpkCountry.paint();sel.innerHTML=($("country")||{}).innerHTML||"";sel.value=tpkCountry.mine()}
  q("onbNick").value=((get("socio-nick")||"").trim()||(name?name.charAt(0).toUpperCase()+name.slice(1):"")).slice(0,18);onbPaint();
  lastFocus=null;show("onb");dlg.hidden=false;document.body.classList.add("noscroll")}
function onbEnd(save){
  if(save){const n=q("onbNick").value.trim();
    try{if(n){store.setItem("socio-nick",n);$("nick").value=n}if(window.tpkCountry){tpkCountry.set(q("onbCountry").value);tpkCountry.paint()}}catch(e){}
    t0(renderMe);t0(renderEntry)}
  put("tpk-onboarded","1");closeDlg()}
const t0=f=>{try{f()}catch(e){}};
function openDlg(m){lastFocus=document.activeElement;
  if(m==="account"){q("acInfo").innerHTML=tl("Saved online as {u}",{u:"<b>"+esc2(acct?acct.u:"")+"</b>"})+(esade?"<br>"+tl("ESADE verified: {e}",{e:"<b>"+esc2(esade.e)+"</b>"}):"");show("account");dlg.hidden=false;document.body.classList.add("noscroll");return}linking=m==="link";perr("pvErr","");sentTo=null;
  q("pvEmail").hidden=!AUTH.email;q("pvPhone").hidden=!AUTH.phone;q("pvGoogle").hidden=!AUTH.google;q("pvApple").hidden=!AUTH.apple;
  q("pvOr").hidden=!AUTH.email||!(AUTH.phone||AUTH.google||AUTH.apple);
  q("pvLegacy").hidden=linking;   // adding an email to a username account: no new username
  q("pvHelp").textContent=linking?tl("Add an email or Google account to this account. Your username and password keep working."):tl("Pick how you want to sign in. Your scores, mistakes to review and flashcards will follow you on any device.");
  q("syncBack").hidden=!AUTH_ON;
  if(AUTH_ON)show("choose");else{show("legacy");setMode(m)}
  q("syncPass").value="";
  if(!q("syncUser").value)q("syncUser").value=(get("socio-nick")||"").replace(/[^A-Za-z0-9_.-]/g,"").slice(0,20);
  dlg.hidden=false;document.body.classList.add("noscroll");
  setTimeout(()=>{if(!AUTH_ON)(q("syncUser").value?q("syncPass"):q("syncUser")).focus()},0)}
function closeDlg(){dlg.hidden=true;dlg.classList.remove("page");document.body.classList.remove("noscroll");q("syncGo").disabled=false;if(lastFocus&&lastFocus.focus)lastFocus.focus()}
q("syncCancel").onclick=closeDlg;
dlg.addEventListener("keydown",e=>{if(e.key==="Escape")closeDlg()});
dlg.addEventListener("click",e=>{if(e.target===dlg)closeDlg()});
q("pvCancel").onclick=closeDlg;
q("onbSkip").onclick=()=>onbEnd(false);q("onbOut").onclick=()=>{closeDlg();signOut()};q("onbDone").onclick=()=>onbEnd(true);q("onbNick").addEventListener("input",onbPaint);
q("onbAv").onclick=q("onbPh").onclick=()=>{const f=$("pfpIn");if(f)f.click()};q("acClose").onclick=closeDlg;q("acOut").onclick=()=>{closeDlg();signOut()};
q("pvLegacy").onclick=()=>{show("legacy");setMode("in");q("syncUser").focus()};
q("syncBack").onclick=()=>show("choose");
q("emBack").onclick=q("phBack").onclick=()=>{show("choose");sentTo=null};

// ---------- sign in with Email / Phone / Google / Apple (Supabase Auth) ----------
const AMSG={already_linked:tl("This email is already linked to another qwebbo account."),
  rate:tl("Too many messages sent. Wait a few minutes, then try again."),bad_code:tl("This code is wrong or has expired."),
  bad_email:tl("Enter a valid email address."),bad_phone:tl("Enter your number with the country code, like +33 6 12 34 56 78."),
  not_esade:tl("This email isn't an ESADE address. Use the one that ends with esade.edu."),
  fail:tl("Sign-in didn't work. Try again."),net:tl("Can't reach the server. Check your connection and try again.")};
function aerr(e){const m=String(e&&(e.code||e.message)||"");
  if(e&&(e.status===429||/rate|too_many|over_/i.test(m)))return AMSG.rate;
  if(/otp_expired|invalid.*(token|otp)|expired/i.test(m))return AMSG.bad_code;
  if(/email.*(invalid|valid)|validation_failed/i.test(m))return AMSG.bad_email;
  if(/phone/i.test(m))return AMSG.bad_phone;
  return /fetch|network/i.test(m)?AMSG.net:AMSG.fail}
const redirectUrl=()=>location.origin+location.pathname;
function rememberLink(){put(LINK,linking&&acct?acct.tok:null)}   // survives the trip to Google and back
q("pvEmail").onclick=()=>{show("email");q("emCodeBox").hidden=true;q("emGo").textContent=tl("Send me a code");perr("emErr","");sentTo=null;q("emAddr").focus()};
q("pvPhone").onclick=()=>{show("phone");q("phCodeBox").hidden=true;q("phGo").textContent=tl("Send me a code");perr("phErr","");sentTo=null;q("phNum").focus()};
async function oauth(provider){perr("pvErr","");rememberLink();
  try{const {error}=await sbA.auth.signInWithOAuth({provider,options:{redirectTo:redirectUrl()}});if(error)throw error}
  catch(e){perr("pvErr",aerr(e))}}
q("pvGoogle").onclick=()=>oauth("google");
q("pvApple").onclick=()=>oauth("apple");
q("emailForm").onsubmit=async e=>{e.preventDefault();perr("emErr","");
  const go=q("emGo"),em=q("emAddr").value.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){perr("emErr",AMSG.bad_email);q("emAddr").focus();return}
  go.disabled=true;
  try{
    if(sentTo===em&&q("emCode").value.trim()){
      const {error}=await sbA.auth.verifyOtp({email:em,token:q("emCode").value.trim(),type:"email"});if(error)throw error}   // signed in: onAuthStateChange takes over
    else{rememberLink();
      const {error}=await sbA.auth.signInWithOtp({email:em,options:{emailRedirectTo:redirectUrl(),shouldCreateUser:true}});if(error)throw error;
      sentTo=em;q("emCodeBox").hidden=false;go.textContent=tl("Confirm the code");
      q("emHelp").textContent=tl("We sent a code to {e}. Type it below.",{e:em})}
  }catch(x){perr("emErr",aerr(x))}finally{go.disabled=false}};
q("phoneForm").onsubmit=async e=>{e.preventDefault();perr("phErr","");
  const go=q("phGo"),ph=q("phNum").value.replace(/[\s().-]/g,"");
  if(!/^\+[1-9]\d{7,14}$/.test(ph)){perr("phErr",AMSG.bad_phone);q("phNum").focus();return}
  go.disabled=true;
  try{
    if(sentTo===ph&&q("phCode").value.trim()){
      const {error}=await sbA.auth.verifyOtp({phone:ph,token:q("phCode").value.trim(),type:"sms"});if(error)throw error}
    else{rememberLink();
      const {error}=await sbA.auth.signInWithOtp({phone:ph});if(error)throw error;
      sentTo=ph;q("phCodeBox").hidden=false;go.textContent=tl("Confirm the code");q("phHelp").textContent=tl("We texted a code to {p}.",{p:ph});q("phCode").focus()}
  }catch(x){perr("phErr",aerr(x))}finally{go.disabled=false}};

// ---------- ESADE access: confirm an ESADE email with a code ----------
function openEsade(after){lastFocus=document.activeElement;esAfter=typeof after==="function"?after:null;sentTo=null;
  perr("esErr","");q("esCodeBox").hidden=true;q("esCode").value="";q("esGo").textContent=tl("Send me a code");q("esGo").disabled=false;
  q("esSignin").hidden=!!acct||!AUTH_ON;
  q("esHelp").textContent=tl("These quizzes are for ESADE students and alumni. Enter your ESADE email address and we'll send you a code to confirm it's really yours.");
  dlg.classList.remove("page");show("esade");dlg.hidden=false;document.body.classList.add("noscroll");setTimeout(()=>q("esAddr").focus(),0)}
q("esCancel").onclick=closeDlg;
q("esSignin").onclick=()=>openDlg("new");
q("esadeForm").onsubmit=async e=>{e.preventDefault();perr("esErr","");
  const go=q("esGo"),em=q("esAddr").value.trim().toLowerCase();
  if(!AUTH_ON){perr("esErr",AMSG.fail);return}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){perr("esErr",tl("Use your ESADE email address, like name@esade.edu."));q("esAddr").focus();return}
  go.disabled=true;
  try{
    if(sentTo===em&&q("esCode").value.trim()){
      put(EPEND,String(Date.now()));
      const {error}=await sbA.auth.verifyOtp({email:em,token:q("esCode").value.trim(),type:"email"});if(error)throw error}   // signed in: onAuthStateChange takes over
    else{
      let ok=null;try{ok=(await sb.rpc("esade_domain_ok",{p_email:em})).data}catch(x){}
      if(ok===false){perr("esErr",AMSG.not_esade);q("esAddr").focus();return}
      rememberLink();put(EPEND,String(Date.now()));
      const {error}=await sbA.auth.signInWithOtp({email:em,options:{emailRedirectTo:redirectUrl(),shouldCreateUser:true}});if(error)throw error;
      sentTo=em;q("esCodeBox").hidden=false;go.textContent=tl("Confirm the code");
      q("esHelp").textContent=tl("We sent a code to {e}. Type it below.",{e:em});q("esCode").focus()}
  }catch(x){perr("esErr",aerr(x))}finally{go.disabled=false}};
// the code was accepted while an account is already signed in on this device: attach the ESADE address to it
async function esFinish(){
  if(finishing)return;finishing=true;
  try{
    const r=await rpc("esade_verify",{p_token:acct.tok},sbA);
    put(EPEND,null);esSet({e:r.email});closeDlg();if(typeof toast==="function")toast(tl("ESADE quizzes unlocked"));
    const f=esAfter;esAfter=null;if(f)setTimeout(f,0);
  }catch(x){
    put(EPEND,null);const m=x&&x.message;
    if(m==="bad_token"){dropAcct();setState("expired");closeDlg();openDlg("new");perr("pvErr",AMSG.fail)}
    else{openEsade(esAfter);perr("esErr",m==="not_esade"?AMSG.not_esade:AMSG.fail)}}
  finally{finishing=false;try{await sbA.auth.signOut({scope:"local"})}catch(x){}}
}
async function esRefresh(){if(!acct)return;
  try{const r=await rpc("esade_status",{p_token:acct.tok});if(r&&typeof r.verified==="boolean")esSet(r.verified?{e:r.email}:null)}catch(x){}}
window.tpkEsade={ok:()=>!!esade,email:()=>esade?esade.e:"",token:()=>acct?acct.tok:"",open:openEsade,on:f=>{esListeners.push(f)},refresh:esRefresh};
try{document.dispatchEvent(new Event("tpk-esade-ready"))}catch(x){}

// Supabase Auth says "signed in" (link opened, Google came back, code accepted): trade that for the usual save token
let finishing=false;
const RET=(()=>{try{return /[?&]code=|access_token=|error=|error_description=/.test((location.hash||"")+(location.search||""))}catch(e){return false}})();   // the page was opened by a sign-in return
function dbg(){}
async function finishAuth(ses){
  if(finishing)return;finishing=true;
  const link=get(LINK),e0=edits;dbg("session found, saving your account…");
  try{
    const r=await rpc("tpk_auth_login",{p_link:link||null,p_data:snap()},sbA);
    acct={u:r.username,tok:r.token,rev:r.rev,au:1};saveAcct();put(LINK,null);
    const wasEs=esPending();put(EPEND,null);if(r.esade)esSet({e:r.esade});else esRefresh();
    try{const md=(ses&&ses.user&&ses.user.user_metadata)||{},nm=String(md.full_name||md.name||"").trim().slice(0,18);   // Google gives a name: use it as the nickname if there is none yet
      if(nm&&!(get("socio-nick")||"").trim())store.setItem("socio-nick",nm)}catch(x){}
    if(r.created){if(edits===e0)put(DIRTY,null);else later(500)}
    else{const m=merge(snap(),r.data||{});apply(m);
      if(same(m,r.data||{}))put(DIRTY,null);else{put(DIRTY,"1");push()}}
    try{const c=new URLSearchParams(location.search);if(c.has("code")){c.delete("code");history.replaceState(null,"",location.pathname+(c.toString()?"?"+c:"")+location.hash)}}catch(x){}
    dbg("signed in as "+(r.username||"?")+(r.created?" (new account)":""));
    setState("ok");closeDlg();if(typeof toast==="function")toast(wasEs&&r.esade?tl("ESADE quizzes unlocked"):r.created?tl("Progress saved online"):tl("Progress restored"));
    if(wasEs&&r.esade&&esAfter){const f=esAfter;esAfter=null;setTimeout(f,0)}
    if(!get("tpk-onboarded")&&(r.created||!(get("socio-nick")||"").trim())){const md=(ses&&ses.user&&ses.user.user_metadata)||{};
      openOnb(String(md.full_name||md.name||String(r.username||"").split("@")[0]).replace(/[^\p{L}\p{N} ._-]/gu,"").trim())}
  }catch(x){dbg("error: "+String(x&&x.message||x).slice(0,120));put(LINK,null);openDlg("new");perr("pvErr",AMSG[x.message]||AMSG.fail+" ("+String(x&&x.message||x).slice(0,80)+")")}
  finally{finishing=false;try{await sbA.auth.signOut({scope:"local"})}catch(x){}}
}
if(AUTH_ON){
  sbA.auth.onAuthStateChange((ev,ses)=>{dbg("auth event "+ev+(ses?" (session)":" (no session)"));if((ev==="SIGNED_IN"||ev==="INITIAL_SESSION")&&ses){
    if(acct&&!get(LINK)&&esPending())setTimeout(()=>esFinish(ses),0);   // an ESADE code, asked for while signed in
    else if(!acct||get(LINK))setTimeout(()=>finishAuth(ses),0)}});   // INITIAL_SESSION: a sign-in that was not finished before the page reloaded
  if(RET)try{sbA.auth.getSession().then(r=>{if(r&&r.error)dbg("error: "+String(r.error.message||r.error).slice(0,120))}).catch(()=>{})}catch(x){}
  // back from Google with a ?code=: supabase-js must read it first, so the address is only cleaned after the sign-in; if nothing happens after a while, say so
  try{if(!acct&&/[?&]code=/.test(location.search))setTimeout(()=>{if(!acct&&!finishing){openDlg("new");dbg("no session after 9s: the sign-in code was not accepted");perr("pvErr",AMSG.fail+" (no session after Google)")}},9000)}catch(x){}
  // a link that expired, or a Google sign-in that was refused, comes back with the reason in the address
  try{const h=location.hash.includes("error_description=")?location.hash.slice(1):"",qs=new URLSearchParams(h||location.search);
    if(qs.get("error_description")){dbg("error: "+qs.get("error_description").slice(0,120));history.replaceState(null,"",location.pathname);
      setTimeout(()=>{openDlg("new");perr("pvErr",/expired|invalid/i.test(qs.get("error_description"))?AMSG.bad_code:AMSG.fail+" ("+qs.get("error_description").slice(0,80)+")")},800)}}catch(x){}}

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

renderLine();renderEntry();
if(acct){setState("saving");pull();esRefresh()}
})();
