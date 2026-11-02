// ---------- pause and pick up later, in every solo mode ----------
// quiz / missed / weak points / challenge: "Pause" saves the game (tpk-resume, see js/app/*.js) and goes back to the quiz page, where the resume card waits
// flashcards: the round is kept in tpk-cardrun (device only) and offered on the flashcards panel
// exam: pausing keeps tpk-examrun (see examresume.js); the exam clock keeps running in real time
(function(){
  if(window.FR)Object.assign(FR,{
    "Game paused. Resume it from this quiz page.":"Partie en pause. Reprends-la depuis la page de ce quiz.",
    "Cards in progress: {i} / {n}":"Cartes en cours : {i} / {n}",
    "Pause the exam? Your answers are kept and you can resume it from this quiz page.":"Mettre l'examen en pause ? Tes réponses sont gardées et tu peux le reprendre depuis la page de ce quiz.",
    "Leave the exam? It stays paused and you can resume it from this quiz page.":"Quitter l'examen ? Il reste en pause et tu peux le reprendre depuis la page de ce quiz.",
    "Pause the exam":"Mettre l'examen en pause",
    "Round paused. Resume it from the flashcards panel.":"Série en pause. Reprends-la depuis le panneau des cartes."
  });
  if(window.ES)Object.assign(ES,{
    "Game paused. Resume it from this quiz page.":"Partida en pausa. Reanúdala desde la página de este quiz.",
    "Cards in progress: {i} / {n}":"Tarjetas en curso: {i} / {n}",
    "Pause the exam? Your answers are kept and you can resume it from this quiz page.":"¿Poner el examen en pausa? Se guardan tus respuestas y podrás reanudarlo desde la página de este quiz.",
    "Leave the exam? It stays paused and you can resume it from this quiz page.":"¿Salir del examen? Queda en pausa y podrás reanudarlo desde la página de este quiz.",
    "Pause the exam":"Poner el examen en pausa",
    "Round paused. Resume it from the flashcards panel.":"Ronda en pausa. Reanúdala desde el panel de tarjetas."
  });
  $("exQuit").textContent=tl("Pause the exam");
  // ----- solo quiz games -----
  function pauseGame(){
    if(mode!=="solo"||!G)return;
    saveSolo(true);leaveGame(false);toast(tl("Game paused. Resume it from this quiz page."));
  }
  function mk(host){const b=el("button","btn ghost pausebtn",tl("Pause"));b.type="button";b.hidden=true;b.onclick=pauseGame;host.appendChild(b);return b}
  const btns=[mk(document.querySelector("#question .hud>.row")),mk(document.querySelector("#reveal .hud>.row"))];
  const oShow=show;
  show=function(id){oShow(id);if(id==="topic")render();const on=mode==="solo"&&(id==="question"||id==="reveal");btns.forEach(b=>b.hidden=!on)};
  // ----- flashcards -----
  const KEY="tpk-cardrun",MAX_AGE=7*864e5;
  function load(){try{const s=JSON.parse(lsGet(KEY)||"null");if(s&&s.bank&&Array.isArray(s.terms)&&s.terms.length&&Date.now()-s.at<MAX_AGE)return s}catch(e){}return null}
  function drop(){try{localStorage.removeItem(KEY)}catch(e){}}
  function save(){
    if(!BANK||!FC.deck.length)return;
    if(FC.i>=FC.deck.length){drop();return}   // round finished
    if(FC.i>0)lsSet(KEY,JSON.stringify({bank:BANK.id,terms:FC.deck.map(f=>f[3]),i:FC.i,res:FC.res,side:settings.fcSide,at:Date.now()}));
  }
  const oCard=renderCard;renderCard=function(){oCard();save()};
  const box=document.createElement("div");box.className="fc-resume";box.hidden=true;
  box.innerHTML='<span></span><button class="btn dark" type="button"></button><button class="btn ghost" type="button"></button>';
  $("resumeTopic").appendChild(box);   // same spot as the solo-game resume card, so it shows whatever study mode the quiz page is in
  const [txt,go,del]=[box.querySelector("span"),...box.querySelectorAll("button")];
  function render(){
    const s=load();box.hidden=!(s&&BANK&&s.bank===BANK.id&&$("cards").hidden);if(box.hidden)return;
    txt.textContent=tl("Cards in progress: {i} / {n}",{i:s.i,n:s.terms.length});go.textContent=tl("Resume");del.textContent=tl("Discard");
  }
  go.onclick=()=>{
    const s=load();if(!s||!BANK||s.bank!==BANK.id)return;
    const by={};(BANK.facts||[]).forEach(f=>by[f[3]]=f);
    const deck=s.terms.map(t=>by[t]).filter(Boolean);if(deck.length!==s.terms.length){drop();render();return}   // the quiz changed since: start fresh
    settings.fcSide=s.side||settings.fcSide;
    FC={deck,i:Math.min(s.i,deck.length-1),flip:false,res:s.res||{}};
    show("cards");renderCard();
  };
  del.onclick=()=>{drop();render()};
  $("fcQuit").textContent=tl("Pause");$("fcQuit").onclick=()=>{if(FC.i>0)toast(tl("Round paused. Resume it from the flashcards panel."));show("topic");renderCardsPanel()};
  const oPanel=renderCardsPanel;renderCardsPanel=function(){oPanel();render()};
  render();
})();
