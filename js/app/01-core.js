
const LETTERS="ABCD";
const $=id=>document.getElementById(id);
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
// friendly empty state: round icon (SVG path data), title, one line of help
function emptyState(path,title,hint){const d=el("div","empty"),i=el("div","em-ico");i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+path+'"/></svg>';d.append(i,el("b",null,title),el("p",null,hint));return d}
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
let settings={sess:new Set(),len:15,T:20,fmt:"mix",diff:0,fcSide:"term",fcSet:"due",fcOrd:"shuffle"};
let writeChain=Promise.resolve();

// ---------- backend (Supabase) ----------
const SB_URL="https://eowcxqqkewijzgemqbhi.supabase.co",SB_KEY="sb_publishable_WYtzPauL3s0sPu_Vvj0iOQ_uUTg1uW7";
let sb=null,chan=null,pollT=null;
me=lsGet("socio-pid");if(!me){me="p"+Math.random().toString(36).slice(2,12)+Date.now().toString(36);lsSet("socio-pid",me)}
try{sb=window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}})}catch(e){sb=null}
function setMultiNote(ok){
  const n=$("multiNote");n.hidden=ok;
  $("createBtn").disabled=!ok;$("joinBtn").disabled=!ok;$("codeIn").disabled=!ok;
  if(!ok)n.textContent=tl("Can't reach the server. Check your internet connection, then reload the page. Solo mode still works.");
}

// ---------- home ----------

$("nick").value=lsGet("socio-nick")||"";
$("nick").addEventListener("input",()=>{lsSet("socio-nick",$("nick").value.trim());showErr("nickErr","");renderMe()});
function myCountry(){return window.tpkCountry?tpkCountry.mine():""}
function myNick(){return ($("nick").value.trim()||tl("Player")).slice(0,18)}
// multiplayer needs a real name, so friends know who is who
function needNick(){if($("nick").value.trim())return false;showErr("nickErr",tl("Enter your first name so your friends know who you are."));$("nick").focus();$("nick").scrollIntoView({block:"center"});return true}

