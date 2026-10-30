// Music while revising: paste a Spotify or Deezer link, play it through the official embed in a mini player that stays put across screens.
// No login or API key: the embed plays full tracks when the visitor is signed in to Spotify/Deezer in this browser, 30 s previews otherwise.
(function(){
const $=id=>document.getElementById(id);
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{if(v==null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}}

// Turns a pasted link (or Spotify URI) into an embed. Returns {src,h,name} or {err}.
function parse(raw){
  const s=String(raw||"").trim();if(!s)return {err:tl("Paste a playlist link.")};
  let m=s.match(/^spotify:(playlist|album|track|artist|show|episode):([A-Za-z0-9]+)/);
  if(!m)m=s.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/i);
  if(m)return {src:"https://open.spotify.com/embed/"+m[1].toLowerCase()+"/"+m[2]+"?utm_source=generator",open:"https://open.spotify.com/"+m[1].toLowerCase()+"/"+m[2],h:152,name:"Spotify"};
  m=s.match(/deezer\.com\/(?:[a-z]{2}\/)?(playlist|album|track|artist)\/(\d+)/i);
  if(m)return {src:"https://widget.deezer.com/widget/auto/"+m[1].toLowerCase()+"/"+m[2]+"?tracklist=false",open:"https://www.deezer.com/"+m[1].toLowerCase()+"/"+m[2],h:152,name:"Deezer"};
  if(/spotify\.link|link\.deezer\.com|deezer\.page\.link/i.test(s))
    return {err:tl("That's a short link: open it in your browser, then copy the full page address.")};
  return {err:tl("Link not recognised. Paste a Spotify or Deezer playlist, album or track link.")};
}

const btn=document.createElement("button");
btn.id="musicBtn";btn.type="button";btn.textContent=tl("Music");btn.title="Listen to your playlist while you study";
const topr=document.querySelector(".topr");topr.insertBefore(btn,topr.firstChild);

const box=document.createElement("aside");
box.id="music";box.hidden=true;box.setAttribute("aria-label",tl("Music player"));
box.innerHTML='<div class="mu-head"><span class="mu-title" id="muTitle">Music</span>'+
  '<button type="button" class="mu-ic" id="muEdit" title="Change playlist">Change</button>'+
  '<button type="button" class="mu-ic" id="muMin" title="Minimise" aria-label="Minimise">–</button>'+
  '<button type="button" class="mu-ic" id="muClose" title="Close and stop the music" aria-label="Close">×</button></div>'+
  '<div class="mu-body"><form class="mu-form" id="muForm">'+
  '<label class="label" for="muUrl">Paste your Spotify or Deezer playlist link</label>'+
  '<div class="mu-row"><input type="text" id="muUrl" placeholder="https://open.spotify.com/playlist/…" autocomplete="off" spellcheck="false"><button class="btn" type="submit">Play</button></div>'+
  '<p class="err" id="muErr" hidden></p>'+
  '<p class="muted mu-tip">In the app: Share, then Copy link. Sign in to Spotify or Deezer in this browser to hear full tracks (otherwise you get 30 s previews).</p>'+
  '</form><div class="mu-frame" id="muFrame"></div>'+
  '</div>';
tpkTranslate(box);
const nameSp='<span class="muName"></span>';
const note=document.createElement("p");note.className="muted mu-tip mu-note";note.id="muNote";
note.innerHTML=tl("Track changing every 30 s? Those are previews: sign in to")+" "+nameSp+" "+tl("in this browser, or")+' <a id="muOpen" target="_blank" rel="noopener">'+tl("open the playlist in the {app} app",{app:nameSp})+"</a>"+tl(", it keeps playing in the background while you play.");
box.querySelector(".mu-body").appendChild(note);
document.body.appendChild(box);

let cur=null;
function setState(st){
  box.hidden=st==="closed";box.classList.toggle("min",st==="min");
  document.body.classList.toggle("has-music",st==="open");
  btn.setAttribute("aria-pressed",st!=="closed"&&!!cur);
  $("muMin").textContent=st==="min"?"+":"–";$("muMin").title=st==="min"?tl("Expand"):tl("Minimise");$("muMin").setAttribute("aria-label",$("muMin").title);
  lsSet("tipoki-music-state",cur?st:null);
}
function editMode(on){
  $("muForm").hidden=!on;$("muFrame").hidden=on;$("muNote").hidden=on||!cur;$("muEdit").hidden=on||!cur;
  if(on){$("muErr").hidden=true;$("muUrl").value=lsGet("tipoki-music")||"";setTimeout(()=>$("muUrl").focus(),0)}
}
function play(raw){
  const p=parse(raw);if(p.err){$("muErr").textContent=p.err;$("muErr").hidden=false;return false}
  cur=p;lsSet("tipoki-music",String(raw).trim());
  const f=document.createElement("iframe");
  f.src=p.src;f.height=p.h;f.title=tl("{name} player",{name:p.name});
  f.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  $("muFrame").replaceChildren(f);$("muTitle").textContent=tl("Music")+" · "+p.name;
  $("muOpen").href=p.open;document.querySelectorAll(".muName").forEach(e=>e.textContent=p.name);
  editMode(false);return true;
}
function stop(){cur=null;$("muFrame").replaceChildren();$("muTitle").textContent=tl("Music")}

btn.onclick=()=>{
  if(box.hidden||box.classList.contains("min")){if(!cur)editMode(true);setState("open")}
  else setState("min");
};
$("muForm").onsubmit=e=>{e.preventDefault();if(play($("muUrl").value))setState("open")};
$("muEdit").onclick=()=>{editMode(true);setState("open")};
$("muMin").onclick=()=>{if(!cur){setState("closed");return}setState(box.classList.contains("min")?"open":"min")};
$("muClose").onclick=()=>{stop();setState("closed")};
// Music now comes from the Spotify/Deezer app: stop the embed so both don't play, and let the game's sound effects mix with the app
// instead of interrupting it (iPhone).
$("muOpen").onclick=()=>{try{if(navigator.audioSession)navigator.audioSession.type="ambient"}catch(e){}stop();setState("closed")};

// On phones the player would sit on top of the answer tiles: fold it away when a question starts.
const q=$("question");
if(q)new MutationObserver(()=>{if(!q.hidden&&cur&&!box.hidden&&matchMedia("(max-width:700px)").matches)setState("min")}).observe(q,{attributes:true,attributeFilter:["hidden"]});

// Come back with the same playlist loaded (browsers won't autoplay it, one tap on play resumes).
const saved=lsGet("tipoki-music"),st=lsGet("tipoki-music-state");
if(saved&&st&&st!=="closed"&&play(saved))setState("min");else setState("closed");
})();
