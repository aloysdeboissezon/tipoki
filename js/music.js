// Music while revising: paste a Spotify or Deezer link, play it through the official embed in a mini player that stays put across screens.
// No login or API key: the embed plays full tracks when the visitor is signed in to Spotify/Deezer in this browser, 30 s previews otherwise.
(function(){
const $=id=>document.getElementById(id);
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{if(v==null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}}

// Turns a pasted link (or Spotify URI) into an embed. Returns {src,h,name} or {err}.
function parse(raw){
  const s=String(raw||"").trim();if(!s)return {err:"Colle un lien de playlist."};
  let m=s.match(/^spotify:(playlist|album|track|artist|show|episode):([A-Za-z0-9]+)/);
  if(!m)m=s.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/i);
  if(m)return {src:"https://open.spotify.com/embed/"+m[1].toLowerCase()+"/"+m[2]+"?utm_source=generator",h:152,name:"Spotify"};
  m=s.match(/deezer\.com\/(?:[a-z]{2}\/)?(playlist|album|track|artist)\/(\d+)/i);
  if(m)return {src:"https://widget.deezer.com/widget/auto/"+m[1].toLowerCase()+"/"+m[2]+"?tracklist=false",h:152,name:"Deezer"};
  if(/spotify\.link|link\.deezer\.com|deezer\.page\.link/i.test(s))
    return {err:"C'est un lien court : ouvre-le dans ton navigateur, puis copie l'adresse complète de la page."};
  return {err:"Lien non reconnu. Colle un lien de playlist, d'album ou de titre Spotify ou Deezer."};
}

const btn=document.createElement("button");
btn.id="musicBtn";btn.type="button";btn.textContent="Musique";btn.title="Écouter ta playlist en révisant";
const topr=document.querySelector(".topr");topr.insertBefore(btn,topr.firstChild);

const box=document.createElement("aside");
box.id="music";box.hidden=true;box.setAttribute("aria-label","Lecteur de musique");
box.innerHTML='<div class="mu-head"><span class="mu-title" id="muTitle">Musique</span>'+
  '<button type="button" class="mu-ic" id="muEdit" title="Changer de playlist">Changer</button>'+
  '<button type="button" class="mu-ic" id="muMin" title="Réduire" aria-label="Réduire">–</button>'+
  '<button type="button" class="mu-ic" id="muClose" title="Fermer et couper la musique" aria-label="Fermer">×</button></div>'+
  '<div class="mu-body"><form class="mu-form" id="muForm">'+
  '<label class="label" for="muUrl">Colle le lien de ta playlist Spotify ou Deezer</label>'+
  '<div class="mu-row"><input type="text" id="muUrl" placeholder="https://open.spotify.com/playlist/…" autocomplete="off" spellcheck="false"><button class="btn" type="submit">Écouter</button></div>'+
  '<p class="err" id="muErr" hidden></p>'+
  '<p class="muted mu-tip">Dans l\'app : Partager puis Copier le lien. Connecte-toi à Spotify ou Deezer dans ce navigateur pour écouter les titres en entier (sinon, extraits de 30 s).</p>'+
  '</form><div class="mu-frame" id="muFrame"></div></div>';
document.body.appendChild(box);

let cur=null;
function setState(st){
  box.hidden=st==="closed";box.classList.toggle("min",st==="min");
  document.body.classList.toggle("has-music",st==="open");
  btn.setAttribute("aria-pressed",st!=="closed"&&!!cur);
  $("muMin").textContent=st==="min"?"+":"–";$("muMin").title=st==="min"?"Agrandir":"Réduire";$("muMin").setAttribute("aria-label",$("muMin").title);
  lsSet("tipoki-music-state",cur?st:null);
}
function editMode(on){
  $("muForm").hidden=!on;$("muFrame").hidden=on;$("muEdit").hidden=on||!cur;
  if(on){$("muErr").hidden=true;$("muUrl").value=lsGet("tipoki-music")||"";setTimeout(()=>$("muUrl").focus(),0)}
}
function play(raw){
  const p=parse(raw);if(p.err){$("muErr").textContent=p.err;$("muErr").hidden=false;return false}
  cur=p;lsSet("tipoki-music",String(raw).trim());
  const f=document.createElement("iframe");
  f.src=p.src;f.height=p.h;f.title="Lecteur "+p.name;f.loading="lazy";
  f.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  $("muFrame").replaceChildren(f);$("muTitle").textContent="Musique · "+p.name;
  editMode(false);return true;
}
function stop(){cur=null;$("muFrame").replaceChildren();$("muTitle").textContent="Musique"}

btn.onclick=()=>{
  if(box.hidden||box.classList.contains("min")){if(!cur)editMode(true);setState("open")}
  else setState("min");
};
$("muForm").onsubmit=e=>{e.preventDefault();if(play($("muUrl").value))setState("open")};
$("muEdit").onclick=()=>{editMode(true);setState("open")};
$("muMin").onclick=()=>{if(!cur){setState("closed");return}setState(box.classList.contains("min")?"open":"min")};
$("muClose").onclick=()=>{stop();setState("closed")};

// On phones the player would sit on top of the answer tiles: fold it away when a question starts.
const q=$("question");
if(q)new MutationObserver(()=>{if(!q.hidden&&cur&&!box.hidden&&matchMedia("(max-width:700px)").matches)setState("min")}).observe(q,{attributes:true,attributeFilter:["hidden"]});

// Come back with the same playlist loaded (browsers won't autoplay it, one tap on play resumes).
const saved=lsGet("tipoki-music"),st=lsGet("tipoki-music-state");
if(saved&&st&&st!=="closed"&&play(saved))setState("min");else setState("closed");
})();
