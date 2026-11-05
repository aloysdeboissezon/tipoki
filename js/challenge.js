// ---------- challenge a friend by link ----------
// No lobby, no server: the link carries the exact questions (and their answer order), the sender's name and score.
// The friend plays the same questions whenever they like, then sees both scores side by side.
(function(){
  const MAXQ=60;
  if(window.FR)Object.assign(FR,{
    "Challenge a friend":"Défie un ami",
    "Challenge back":"Défie-le en retour",
    "Send a challenge link":"Envoyer un lien de défi",
    "Challenge":"Défi",
    "{name} challenges you":"{name} te défie",
    "{name} scored {c} / {n} on this quiz. Same {n} questions for you. Can you beat it?":"{name} a fait {c} / {n} sur ce quiz. Les mêmes {n} questions pour toi. Tu peux faire mieux ?",
    "Accept the challenge":"Relever le défi",
    "Not now":"Pas maintenant",
    "A friend":"Un ami",
    "You win!":"Tu gagnes !",
    "It's a tie":"Égalité",
    "{name} wins":"{name} gagne",
    "You: {c} / {n} · {p} pts":"Toi : {c} / {n} · {p} pts",
    "{name}: {c} / {n} · {p} pts":"{name} : {c} / {n} · {p} pts",
    "Send this link to a friend: they play the same {n} questions, whenever they want, and you both see who scored more.":"Envoie ce lien à un ami : il joue les mêmes {n} questions quand il veut, et vous voyez qui a le mieux réussi.",
    "{name} challenges you: can you beat {c} / {n} on {title}?":"{name} te défie : tu peux battre {c} / {n} sur {title} ?",
    "Challenge link copied":"Lien de défi copié",
    "This challenge link is out of date":"Ce lien de défi n'est plus valide"
  });
  if(window.ES)Object.assign(ES,{
    "Challenge a friend":"Reta a un amigo",
    "Challenge back":"Devuélvele el reto",
    "Send a challenge link":"Enviar un enlace de reto",
    "Challenge":"Reto",
    "{name} challenges you":"{name} te reta",
    "{name} scored {c} / {n} on this quiz. Same {n} questions for you. Can you beat it?":"{name} ha sacado {c} / {n} en este quiz. Tienes las mismas {n} preguntas. ¿Puedes superarlo?",
    "Accept the challenge":"Aceptar el reto",
    "Not now":"Ahora no",
    "A friend":"Un amigo",
    "You win!":"¡Has ganado!",
    "It's a tie":"Empate",
    "{name} wins":"Gana {name}",
    "You: {c} / {n} · {p} pts":"Tú: {c} / {n} · {p} pts",
    "{name}: {c} / {n} · {p} pts":"{name}: {c} / {n} · {p} pts",
    "Send this link to a friend: they play the same {n} questions, whenever they want, and you both see who scored more.":"Envía este enlace a un amigo: jugará las mismas {n} preguntas cuando quiera y los dos veréis quién ha puntuado más.",
    "{name} challenges you: can you beat {c} / {n} on {title}?":"{name} te reta: ¿puedes superar {c} / {n} en {title}?",
    "Challenge link copied":"Enlace de reto copiado",
    "This challenge link is out of date":"Este enlace de reto ya no es válido"
  });
  const b64e=s=>btoa(unescape(encodeURIComponent(s))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
  const b64d=s=>{s=s.replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";return decodeURIComponent(escape(atob(s)))};

  function encode(r){
    const items=r.deck.map(d=>d.t!=null?"t"+d.t:d.id+"."+d.o.join(""));
    return b64e(["1",r.name.replace(/\|/g,""),r.T,r.c,r.n,r.p,items.join(",")].join("|"));
  }
  // returns null when the link is damaged or doesn't match the quiz's current questions
  function decode(s){
    try{
      const a=b64d(s).split("|");if(a[0]!=="1"||a.length<7)return null;
      const T=+a[2],c=+a[3],n=+a[4],p=+a[5],deck=[];
      if(!(T>=5&&T<=120)||!(n>=1&&n<=MAXQ)||!(c>=0&&c<=n))return null;
      for(const x of a[6].split(",")){
        if(x[0]==="t"){const t=+x.slice(1);if(!(t>=0&&t<TQ.length))return null;deck.push({t})}
        else{const [i,o]=x.split(".");const id=+i;if(!(id>=0&&id<Q.length)||!o||o.length!==Q[id].o.length)return null;
          const ord=[...o].map(Number);if(ord.some(k=>!(k>=0&&k<ord.length))||new Set(ord).size!==ord.length)return null;deck.push({id,o:ord})}
      }
      if(deck.length!==n)return null;
      return {name:a[1]||tl("A friend"),T,c,n,p,deck};
    }catch(e){return null}
  }
  function myResult(){
    const ans=(P[me]&&P[me].ans)||{};
    return {c:G.deck.filter((d,i)=>isRight(ans[i],i)).length,n:G.deck.length,p:scoreRun(me,G.deck.length-1).t};
  }
  function linkFor(){
    const r=myResult();
    return location.origin+location.pathname+"?quiz="+BANK.id+"&lang="+LANG+"&ch="+encode({deck:G.deck,name:myNick(),T:G.T,...r});
  }
  async function share(){
    const r=myResult(),u=linkFor(),text=tl("{name} challenges you: can you beat {c} / {n} on {title}?",{name:myNick(),c:r.c,n:r.n,title:BANK.title});
    if(navigator.share){try{await navigator.share({title:"qwebbo",text,url:u});return}catch(e){if(e&&e.name==="AbortError")return}}
    try{await navigator.clipboard.writeText(text+" "+u);toast(tl("Challenge link copied"))}catch(e){prompt(tl("Send a challenge link"),u)}
  }

  // ----- play a received challenge -----
  function start(ch){
    leaveGame(true);
    mode="solo";code=null;
    const sess=[...new Set(ch.deck.map(d=>(d.t!=null?TQ[d.t]:Q[d.id]).s))];
    G={host:me,status:"q",qi:0,deck:ch.deck,T:ch.T,created:Date.now(),seq:1,inf:false,review:false,sess,fmt:"mix",diff:0,ch:{name:ch.name,c:ch.c,n:ch.n,p:ch.p}};
    P={[me]:{nick:myNick(),country:myCountry(),joined:Date.now(),ans:{}}};local={qi:-1,shownAt:0,revealing:false,lastStatus:null};
    onGame(G);
  }
  const banner=el("div","prog chal");banner.hidden=true;
  banner.innerHTML='<div class="prog-top"><span class="prog-badge"></span><b class="chal-t"></b></div><p class="chal-p"></p><div class="row"><button class="btn" type="button"></button><button class="btn ghost" type="button"></button></div>';
  $("topic").insertBefore(banner,$("topic").children[1]||null);
  let pending=null;
  const [accept,later]=banner.querySelectorAll("button");
  accept.onclick=()=>{const ch=pending;pending=null;banner.hidden=true;if(ch)start(ch)};
  later.onclick=()=>{pending=null;banner.hidden=true};
  (async()=>{
    let qz=null,raw=window.TPK_CH;try{qz=new URLSearchParams(location.search).get("quiz")||"socio"}catch(e){}   // js/app/*.js rewrites the address bar on load, so ch is read before it (see index.html)
    if(!raw||!qz||!await useBank(qz))return;
    const ch=decode(raw);
    if(!ch){toast(tl("This challenge link is out of date"));return}
    pending=ch;
    banner.querySelector(".prog-badge").textContent=tl("Challenge");
    banner.querySelector(".chal-t").textContent=tl("{name} challenges you",{name:ch.name});
    banner.querySelector(".chal-p").textContent=tl("{name} scored {c} / {n} on this quiz. Same {n} questions for you. Can you beat it?",{name:ch.name,c:ch.c,n:ch.n});
    accept.textContent=tl("Accept the challenge");later.textContent=tl("Not now");
    banner.hidden=false;
  })();

  // ----- end screen: scores side by side + send a challenge -----
  const box=el("div","prog chal");box.hidden=true;
  box.innerHTML='<div class="prog-top"><span class="prog-badge"></span></div><div class="chal-vs"><div></div><div></div></div><p class="chal-p"></p><div class="row"><button class="btn dark" type="button"></button></div>';
  const endProg=$("endProg");endProg.parentNode.insertBefore(box,endProg);
  box.querySelector("button").onclick=share;
  const prevEnd=renderEnd;
  renderEnd=function(){
    prevEnd();
    box.hidden=true;
    if(!G||G.status!=="end"||mode!=="solo"||G.review||G.miss||!P[me]||G.deck.length<5||G.deck.length>MAXQ)return;
    const r=myResult(),ch=G.ch,btn=box.querySelector("button"),vs=box.querySelectorAll(".chal-vs div"),note=box.querySelector(".chal-p");
    box.classList.remove("rec");
    if(ch){
      const d=r.c-ch.c||r.p-ch.p,badge=d>0?tl("You win!"):d<0?tl("{name} wins",{name:ch.name}):tl("It's a tie");
      box.querySelector(".prog-badge").textContent=badge;box.classList.toggle("rec",d>0);
      vs[0].textContent=tl("You: {c} / {n} · {p} pts",{c:r.c,n:r.n,p:r.p});
      vs[1].textContent=tl("{name}: {c} / {n} · {p} pts",{name:ch.name,c:ch.c,n:ch.n,p:ch.p});
      note.hidden=true;btn.textContent=tl("Challenge back");
    }else{
      box.querySelector(".prog-badge").textContent=tl("Challenge");vs[0].textContent=vs[1].textContent="";
      note.hidden=false;note.textContent=tl("Send this link to a friend: they play the same {n} questions, whenever they want, and you both see who scored more.",{n:r.n});
      btn.textContent=tl("Challenge a friend");
    }
    box.hidden=false;
  };
})();
