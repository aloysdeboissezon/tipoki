// ---------- weekly leagues (Bronze -> Diamond) ----------
// XP: +10 for a right answer, +2 for a wrong one (games, replays, exams), +3 / +1 for a flashcard.
// XP is queued on this device (localStorage "tpk-lgq") and sent to the server (RPC tpk_league_sync, see supabase/migrations/add_leagues.sql),
// which keeps the weekly board of each league and moves players up or down on Monday 00:00 (Paris).
// "tpk-lgid" identifies the player in the league (it travels with the online save); the queue and the last result shown stay on the device.
(function(){
  const LEAGUES=["Bronze","Silver","Gold","Platinum","Emerald","Ruby","Diamond"];
  const COLORS=[["#E3A06A","#9A5B2B"],["#E4EAF2","#8C98AA"],["#FFE07A","#D99A12"],["#9BE7F0","#2FA6BA"],["#7BE3A8","#15955A"],["#FF8C8F","#C42B35"],["#B8A8FF","#5B45E8"]];
  const ID="tpk-lgid",QUEUE="tpk-lgq",SEEN="tpk-lgseen";
  let LG=null,busy=false,timer=null;
  const lgName=i=>tl(LEAGUES[i]);
  function lid(create){let v=lsGet(ID);if(!v&&create){v="lg"+Math.random().toString(36).slice(2,12)+Date.now().toString(36);lsSet(ID,v)}return v}
  const pend=()=>+lsGet(QUEUE)||0;
  function gem(i,size){
    const c=COLORS[i]||COLORS[0],id="lgg"+i+"_"+size;
    return '<svg class="lggem" width="'+size+'" height="'+size+'" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[1]+'"/></linearGradient></defs>'+
      '<path d="M24 3 42 12v14c0 9-7 15-18 19C13 41 6 35 6 26V12z" fill="url(#'+id+')" stroke="'+c[1]+'" stroke-width="2" stroke-linejoin="round"/><path d="M24 11l10 5v9c0 5-4 9-10 11-6-2-10-6-10-11v-9z" fill="rgba(255,255,255,.28)"/><text x="24" y="29" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" stroke="'+c[1]+'" stroke-width=".6" font-family="inherit">'+(i+1)+'</text></svg>';
  }
  function addXp(n){if(n<=0)return;lsSet(QUEUE,String(pend()+Math.round(n)));lid(true);clearTimeout(timer);timer=setTimeout(()=>sync(),15000);renderChip()}
  async function sync(open){
    if(!sb||busy)return LG;
    const id=lid(!!open);if(!id)return LG;
    busy=true;const send=Math.min(pend(),600);
    try{
      const {data,error}=await sb.rpc("tpk_league_sync",{p_pid:id,p_nick:($("nick").value.trim()||"").slice(0,18),p_xp:send});
      if(error)throw error;
      LG=data;lsSet(QUEUE,String(Math.max(0,pend()-send)));
      if(pend()>0){clearTimeout(timer);timer=setTimeout(()=>sync(),2000)}
    }catch(e){/* offline or function missing: the XP stays queued */}
    busy=false;renderChip();if(!$("league").hidden)renderLeague();return LG;
  }
  // ---- home chip
  function renderChip(){
    const b=$("leagueChip");if(!b)return;
    const lg=LG&&LG.league!=null?LG.league:0;
    b.innerHTML=gem(lg,22)+"<span></span>";
    const t=b.lastChild,q=pend();
    t.textContent=LG?lgName(lg)+" · "+(LG.rank?tl("#{r} of {n}",{r:LG.rank,n:LG.n}):tl("{x} XP this week",{x:LG.xp+q})):tl("Weekly league");
    b.hidden=!sb;
  }
  // ---- league page
  function left(ms){const m=Math.max(0,Math.floor(ms/6e4)),d=Math.floor(m/1440),h=Math.floor(m%1440/60);return d>0?tl("{d} d {h} h",{d,h}):h>0?tl("{h} h {m} min",{h,m:m%60}):tl("{m} min",{m})}
  function renderLeague(){
    const root=$("leagueBody");root.textContent="";
    if(!LG){root.appendChild(el("p","muted",tl("Loading the league…")));return}
    const lg=LG.league,ends=Date.parse(LG.ends_at)||0,xp=LG.xp+pend();
    const head=el("div","lg-head");head.innerHTML=gem(lg,84);
    const ht=el("div","lg-ht");ht.append(el("h2",null,tl("{name} league",{name:lgName(lg)})),el("div","muted",tl("Ends in {t}",{t:left(ends-Date.now())})));head.append(ht);root.appendChild(head);
    // last week's result, once
    const L=LG.last;
    if(L&&lsGet(SEEN)!==L.week){
      const up=L.to>L.from,down=L.to<L.from;
      const note=el("div","lg-last "+(up?"up":down?"down":""));
      note.append(el("b",null,up?tl("Promoted to {name}!",{name:lgName(L.to)}):down?tl("Moved down to {name}",{name:lgName(L.to)}):tl("You stay in {name}",{name:lgName(L.to)})),
        el("span",null,L.rank?tl("Last week: #{r} of {n}, {x} XP",{r:L.rank,n:L.n,x:L.xp}):tl("Last week: no XP")));
      root.appendChild(note);if(up)confetti(120);
      lsSet(SEEN,L.week);
    }
    // ladder
    const lad=el("div","lg-ladder");lad.setAttribute("aria-hidden","true");
    LEAGUES.forEach((_,i)=>{const s=el("span","lg-step"+(i===lg?" cur":i<lg?" done":""));s.innerHTML=gem(i,i===lg?34:24);lad.appendChild(s)});
    root.appendChild(lad);
    const sub=el("p","lg-sub");
    sub.textContent=xp<=0?tl("Answer questions to earn XP and enter the ranking."):LG.rank?tl("You are #{r} with {x} XP.",{r:LG.rank,n:LG.n,x:xp}):tl("{x} XP, syncing…",{x:xp});
    root.appendChild(sub);
    if(LG.up||LG.down){const z=el("p","muted lg-rule");z.textContent=(lg<6?tl("Top {k} move up",{k:LG.up}):"")+(lg<6&&LG.down?" · ":"")+(LG.down?tl("bottom {k} move down",{k:LG.down}):"");root.appendChild(z)}
    // board
    const box=el("div","lg-board");
    const rows=(LG.board||[]).slice();
    rows.forEach((r,i)=>{
      const zone=i<LG.up&&lg<6?" upz":(LG.down&&i>=LG.n-LG.down?" dnz":"");
      const row=el("div","lg-row"+(r.me?" me":"")+zone);
      const av=el("div","av",(r.nick||"?").charAt(0).toUpperCase());av.style.backgroundColor="hsl("+hue(r.nick)+" 55% 42%)";
      row.append(el("span","lg-rk",String(i+1)),av,el("span","lg-nm",r.me?tl("You"):r.nick),el("span","lg-xp",r.xp+" XP"));
      box.appendChild(row)});
    if(!rows.length)box.appendChild(el("p","muted",tl("Nobody has earned XP in this league yet this week. Be the first!")));
    root.appendChild(box);
    root.appendChild(el("p","muted lg-how",tl("XP: +10 for a right answer, +2 for a wrong one, +3 for a flashcard you know. Every Monday the top players move up a league.")));
    if(!$("nick").value.trim())root.appendChild(el("p","muted lg-how",tl("Add a nickname on the home page so friends see your name.")));
  }
  function open(){show("league");LG=LG||null;renderLeague();sync(true)}
  $("leagueChip").onclick=open;
  $("leagueBack").onclick=()=>{show("home");renderMyQuizzes()};
  // ---- XP sources, hooked on top of the existing handlers
  const o1=trackMiss;trackMiss=function(qi,ok){o1(qi,ok);addXp(ok?10:2)};
  const o2=fcMark;fcMark=function(f,ok){o2(f,ok);addXp(ok?3:1)};
  const o3=handInExam;handInExam=function(timeUp){const was=EX.on;o3(timeUp);if(was&&EX.res)addXp(EX.res.reduce((s,r)=>s+(r===1?10:r===0?2:0),0))};
  document.addEventListener("visibilitychange",()=>{if(document.hidden&&pend()>0)sync()});
  addEventListener("pagehide",()=>{if(pend()>0)sync()});
  renderChip();
  if(lid(false))setTimeout(()=>sync(),1500);
})();
