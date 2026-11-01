// Emoji reactions in multiplayer: sent as ephemeral Supabase broadcast messages (nothing is stored, the host's game state is untouched).
(function(){
  var EMOJI=["👏","🔥","😂","😮","😭"],last=0,live=0,bar=null,fx=null;
  function ensure(){
    if(bar)return;
    fx=document.createElement("div");fx.id="reactFx";fx.setAttribute("aria-hidden","true");document.body.appendChild(fx);
    bar=document.createElement("div");bar.id="reactBar";bar.setAttribute("role","group");bar.setAttribute("aria-label",tl("React"));
    EMOJI.forEach(function(e){var b=document.createElement("button");b.type="button";b.textContent=e;b.setAttribute("aria-label",e);
      b.onclick=function(){send(e)};bar.appendChild(b)});
    document.body.appendChild(bar);
  }
  function send(e){
    var t=Date.now();if(t-last<600||!chan)return;last=t;
    try{chan.send({type:"broadcast",event:"react",payload:{pid:me,e:e}})}catch(err){}
  }
  window.tpkReact=function(p){
    if(!p||EMOJI.indexOf(p.e)<0||live>=14)return;
    ensure();live++;
    var d=document.createElement("div");d.className="rfloat";d.style.left=(8+Math.random()*70)+"%";
    var em=document.createElement("span");em.textContent=p.e;
    var nm=document.createElement("small");nm.textContent=p.pid===me?tl("you"):String(nameOf(p.pid)).slice(0,14);
    d.append(em,nm);fx.appendChild(d);
    setTimeout(function(){d.remove();live--},2600);
  };
  function sync(){
    ensure();
    var on=typeof mode!=="undefined"&&mode==="multi"&&G&&(G.status==="q"||G.status==="reveal");
    bar.hidden=!on;
  }
  setInterval(sync,700);
})();
