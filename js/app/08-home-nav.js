// ---------- quiz maker ----------
// AI generation needs the ANTHROPIC_API_KEY secret on Supabase; until then quizzes are added by hand and the upload form is hidden
const MAKER_ON=false;
function quizUrl(id){return location.origin+location.pathname+"?quiz="+id}
function setQuizParam(){try{history.replaceState(null,"",BANK.id==="socio"?location.pathname:"?quiz="+BANK.id)}catch(e){}}
// the quiz screen shows one way of studying at a time (quiz / flashcards / exam) so it stays short on a phone
function setMode(m){
  if(m==="sheet"){$("sheetBtn").click();return}
  if(m==="cards"&&$("cardsJump").hidden||m==="exam"&&$("examJump").hidden)m="menu";
  $("topic").dataset.mode=m;
  if(m!=="menu")window.scrollTo(0,0);else requestAnimationFrame(fitPreviews);
}
document.querySelectorAll("#modeTabs .mcard").forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
$("modeBack").onclick=()=>setMode("menu");
new MutationObserver(()=>{$("sheetCard").hidden=$("sheetBtn").hidden}).observe($("sheetBtn"),{attributes:true,attributeFilter:["hidden"]});
// step 1 of the start flow: one card per quiz, tapping it opens the settings / create screen
async function openQuiz(id,btn){
  if(btn)btn.disabled=true;const ok=await useBank(id);if(btn)btn.disabled=false;
  if(!ok){toast(tl("Quiz not found"));return}
  setQuizParam();setMode("menu");show("topic");recentMark(id);renderPreviews();
}
// quizzes you opened most recently come first on the home screen
function recentGet(){try{return JSON.parse(lsGet("tpk-recent")||"{}")}catch(e){return {}}}
function recentMark(id){const r=recentGet();r[id]=Date.now();const ks=Object.keys(r);if(ks.length>40)ks.sort((a,b)=>r[a]-r[b]).slice(0,ks.length-40).forEach(k=>delete r[k]);lsSet("tpk-recent",JSON.stringify(r))}
function quizList(extra){const seen=new Set();return Object.keys(BUILTIN).map(id=>{const b=BUILTIN[id]()||(window.BANK_META||{})[id]||{};return qmeta({id,group:b.group,title:b.title,subject:b.subject,kw:b.kw,sess:b.sess,tags:b.tags})}).concat(myQuizzes(),extra||[]).filter(q=>!seen.has(q.id)&&seen.add(q.id))}
// search: lowercase, no accents, punctuation as spaces, so "energie" finds "Énergie électrique"
function fold(s){return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}
function quizHay(q){return fold([q.title,q.title0,q.subject,q.subject0,q.kw].concat(Object.values(q.sess||(q.data&&q.data.sess)||{}),Object.values(q.sess0||{}),Object.values(q.tags||{}),Object.values(q.tags0||{})).join(" "))}
// ESADE collection: to put a new quiz in it, add its id here (or give its bank/catalog entry group:"esade")
const ESADE_IDS=["socio","compta2","populism"];
function isEsade(q){return ESADE_IDS.includes(q.id)||q.group==="esade"}
let esadeOn=lsGet("tpk-esade")==="1",favOn=false,lastQuizList=null;
function setEsade(on){esadeOn=on;if(on)favOn=false;lsSet("tpk-esade",on?"1":"0");renderQuizGrid(lastQuizList||quizList());$("quizGrid").scrollLeft=0}
function setFavOn(on){favOn=on;if(on&&esadeOn){esadeOn=false;lsSet("tpk-esade","0")}renderQuizGrid(lastQuizList||quizList());$("quizGrid").scrollLeft=0}
// favourites: hearts on the cards, saved on this device (and with the online save); they always come first
function favGet(){try{const a=JSON.parse(lsGet("tpk-favs")||"[]");return Array.isArray(a)?a:[]}catch(e){return []}}
function favToggle(id){const a=favGet(),i=a.indexOf(id);if(i<0)a.push(id);else a.splice(i,1);lsSet("tpk-favs",JSON.stringify(a));return i<0}
// language of a quiz's questions: the one interface language its names are not translated into (see js/qmeta.js);
// quizzes of your own language (or about your country) rise above the others, school (ESADE) quizzes stay in their own list
const LOCAL_QUIZZES={fr:["gastro"],es:["barcelona"],ko:["kwave","korea"]};
function quizLang(id){const m=window.QMETA&&QMETA[id];if(!m)return "";return ["en","fr","es","ko"].find(l=>!m[l])||""}
function langFit(q){const L=window.LANG||"en";return (quizLang(q.id)===L||(LOCAL_QUIZZES[L]||[]).includes(q.id))?1:0}
function renderQuizGrid(all){
  lastQuizList=all;const favs=favGet();let list=all.filter(q=>favOn?favs.includes(q.id):isEsade(q)===esadeOn);
  $("esadeBtn").setAttribute("aria-pressed",esadeOn?"true":"false");
  const fb=$("favBtn");fb.setAttribute("aria-pressed",favOn?"true":"false");fb.classList.toggle("has",favs.length>0);
  const box=$("quizGrid");box.textContent="";
  const rc=recentGet();list=list.map((q,i)=>[q,i]).sort((a,b)=>(favs.includes(b[0].id)-favs.includes(a[0].id))||(rc[b[0].id]||0)-(rc[a[0].id]||0)||(langFit(b[0])-langFit(a[0]))||a[1]-b[1]).map(x=>x[0]);
  const heart=q=>{const h=el("span","qfav");h.setAttribute("role","button");h.tabIndex=0;const on=favs.includes(q.id);h.setAttribute("aria-pressed",on?"true":"false");h.setAttribute("aria-label",tl(on?"Remove from favorites":"Add to favorites"));h.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.8 4.2 13.4A5 5 0 0 1 11 6.2l1 1 1-1a5 5 0 0 1 6.8 7.2z"/></svg>';
    const go=e=>{e.stopPropagation();e.preventDefault();favToggle(q.id);renderQuizGrid(lastQuizList)};h.onclick=go;h.onkeydown=e=>{if(e.key==="Enter"||e.key===" ")go(e)};return h};
  list.forEach(q=>{const c=el("button","qcard");c.type="button";c.dataset.hay=quizHay(q);c.dataset.id=q.id;
    const ico=el("span","qico");ico.innerHTML=quizIcon(q);
    const t=el("span","qtxt");t.append(el("b",null,q.title));if(q.subject)t.append(el("small",null,q.subject));const qb=el("span","qbest");qb.hidden=true;t.append(qb);
    c.append(ico,t,el("span","qgo","›"),heart(q));c.onclick=()=>openQuiz(q.id,c);box.appendChild(c)});
  const L=$("qList");L.textContent="";
  list.forEach((q,i)=>{const b=el("button","qchip");b.type="button";b.dataset.hay=quizHay(q);b.dataset.id=q.id;b.dataset.i=i%8;
    const li=el("span","qchip-l");li.innerHTML=quizIcon(q);b.append(li,el("b",null,q.title),heart(q),el("span","qgo","›"));b.onclick=()=>openQuiz(q.id,b);L.appendChild(b)});
  $("qAllT").textContent=tl(favOn?"Favorites ({n})":esadeOn?"ESADE quizzes ({n})":"All quizzes ({n})",{n:list.length});
  filterQuizzes();renderProgressUI();carouselUpdate();
}
// every typed word must appear somewhere in the quiz's title, subject, keywords or chapter names
// home carousel: swipe sideways, the quiz in the middle grows and the others shrink back
function carouselUpdate(){
  const box=$("quizGrid");if(!box)return;const r=box.getBoundingClientRect(),mid=r.left+r.width/2;
  const cards=[...box.querySelectorAll(".qcard:not([hidden])")],dots=$("cDots");let best=0,bd=1e9;
  if(dots.childElementCount!==cards.length){dots.textContent="";cards.forEach((c,i)=>{const d=el("button","cdot");d.type="button";d.setAttribute("aria-label",c.querySelector("b").textContent);d.onclick=()=>c.scrollIntoView({behavior:RM?"auto":"smooth",inline:"center",block:"nearest"});dots.appendChild(d)})}
  cards.forEach((c,i)=>{const b=c.getBoundingClientRect();if(!b.width)return;
    const ad=Math.abs(b.left+b.width/2-mid);if(ad<bd){bd=ad;best=i}
    const d=Math.min(1,ad/(b.width*1.1));
    c.style.setProperty("--s",(1-.14*d).toFixed(3));c.style.setProperty("--o",(1-.4*d).toFixed(3));c.style.zIndex=String(10-Math.round(d*10))});
  [...dots.children].forEach((d,i)=>d.setAttribute("aria-current",i===best))
}
let carRaf=0;
$("quizGrid").addEventListener("scroll",()=>{if(!carRaf)carRaf=requestAnimationFrame(()=>{carRaf=0;carouselUpdate()})},{passive:true});
addEventListener("resize",carouselUpdate);
// mouse: drag to swipe
(()=>{const box=$("quizGrid");let x0=0,s0=0,down=false,moved=false;
  box.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")return;down=true;moved=false;x0=e.clientX;s0=box.scrollLeft});
  addEventListener("pointermove",e=>{if(!down)return;const dx=e.clientX-x0;if(Math.abs(dx)>6){moved=true;box.classList.add("dragging")}if(moved)box.scrollLeft=s0-dx});
  addEventListener("pointerup",()=>{if(!down)return;down=false;box.classList.remove("dragging")});
  box.addEventListener("click",e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false}},true)})();
function filterQuizzes(){
  const raw=$("quizSearch").value,words=fold(raw).split(" ").filter(Boolean);let n=0;
  $("quizGrid").querySelectorAll(".qcard").forEach(c=>{const ok=words.every(w=>c.dataset.hay.includes(w));c.hidden=!ok;if(ok)n++});
  $("quizSearchClear").hidden=!raw;
  $("qList").querySelectorAll(".qchip").forEach(c=>{c.hidden=!words.every(w=>c.dataset.hay.includes(w))});$("quizEmpty").hidden=n>0||!words.length;carouselUpdate();$("quizEmptyQ").textContent=raw.trim();
}
function clearQuizSearch(focus){$("quizSearch").value="";filterQuizzes();if(focus)$("quizSearch").focus()}
$("quizSearch").addEventListener("input",filterQuizzes);
$("esadeBtn").onclick=()=>setEsade(!esadeOn);
$("favBtn").onclick=()=>setFavOn(!favOn);
$("quizSearch").addEventListener("keydown",e=>{
  if(e.key==="Escape"&&$("quizSearch").value){e.preventDefault();clearQuizSearch(true)}
  else if(e.key==="Enter"){e.preventDefault();$("quizSearch").blur()}
});
$("quizSearchClear").onclick=()=>clearQuizSearch(true);
$("quizEmptyClear").onclick=()=>clearQuizSearch(true);
async function renderMyQuizzes(){
  renderQuizGrid(quizList());
  let data=null;
  if(sb&&navigator.onLine){try{const r=await sb.from("quizzes").select("id,title,subject,sess:data->sess").order("created_at",{ascending:false}).limit(50);data=r.data}catch(e){}}
  if(data&&data.length)tpkSaveData("quiz-list",data);
  else data=await tpkLoadData("quiz-list");
  if(data&&data.length)renderQuizGrid(quizList(data));
}
$("makePanel").hidden=!MAKER_ON;
$("topicBack").onclick=()=>{show("home");renderMyQuizzes()};
// the logo goes back to the quiz grid from any screen; a game still running asks first
$("brandHome").onclick=e=>{
  if(e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;   // let "open in a new tab" work
  e.preventDefault();
  if(window.examBusy&&examBusy()){if(!confirm(tl("Leave the exam? It stays paused and you can resume it from this quiz page.")))return;EX.on=false}
  else if(G&&mode==="multi"&&(G.status==="q"||G.status==="reveal")&&!confirm(tl("Leave the current game? The other players will carry on without you.")))return;   // a solo game is saved, it can be resumed
  if(mode){leaveGame(true);mode=null;code=null;G=null;P={}}
  try{history.replaceState(null,"",location.pathname)}catch(e){}
  show("home");renderMyQuizzes()};
$("shareQuizBtn").onclick=async()=>{const u=quizUrl(BANK.id);try{await navigator.clipboard.writeText(u);toast(tl("Quiz link copied"))}catch(e){prompt(tl("Quiz link"),u)}};
let mkFile=null;
function setMkFile(f){
  showErr("mkErr","");
  if(f&&f.size>20*1024*1024){showErr("mkErr",tl("File too large (20 MB max)."));f=null}
  if(f&&!/\.(pdf|txt|md)$/i.test(f.name)){showErr("mkErr",tl("Accepted formats: PDF, TXT, MD."));f=null}
  mkFile=f||null;$("mkDrop").classList.toggle("has",!!mkFile);
  $("mkFileTxt").textContent=mkFile?tl("{name} ({kb} KB) · click to change",{name:mkFile.name,kb:Math.ceil(mkFile.size/1024)}):tl("Click or drop a PDF here (20 MB max)");
  if(mkFile&&!$("mkTitle").value.trim())$("mkTitle").value=mkFile.name.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ").slice(0,60);
}
$("mkFile").onchange=e=>setMkFile(e.target.files[0]);
["dragenter","dragover"].forEach(t=>$("mkDrop").addEventListener(t,e=>{e.preventDefault();$("mkDrop").classList.add("over")}));
["dragleave","drop"].forEach(t=>$("mkDrop").addEventListener(t,e=>{e.preventDefault();$("mkDrop").classList.remove("over")}));
$("mkDrop").addEventListener("drop",e=>{const f=e.dataTransfer.files[0];if(f)setMkFile(f)});
function readFile(f,asText){return new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=ko;asText?r.readAsText(f):r.readAsDataURL(f)})}
$("mkGo").onclick=async()=>{
  showErr("mkErr","");
  const title=$("mkTitle").value.trim();let text=$("mkText").value.trim();
  if(!mkFile&&text.length<200){showErr("mkErr",tl("Add a PDF or paste at least a few paragraphs of notes."));return}
  const body={title};
  try{
    if(mkFile&&/\.pdf$/i.test(mkFile.name))body.pdf=(await readFile(mkFile)).split(",")[1];
    else if(mkFile)text=(await readFile(mkFile,true))+"\n\n"+text;
  }catch(e){showErr("mkErr",tl("Couldn't read the file."));return}
  if(text)body.text=text.slice(0,200000);
  const st=$("mkStatus"),steps=[tl("Reading your notes…"),tl("Finding the key ideas…"),tl("Writing the questions…"),tl("Checking the answers…"),tl("Almost done…")];
  let k=0;st.hidden=false;st.textContent=steps[0];const tick=setInterval(()=>{k=Math.min(k+1,steps.length-1);st.textContent=steps[k]},12000);
  $("mkGo").disabled=true;
  try{
    const res=await fetch(SB_URL+"/functions/v1/generate-quiz",{method:"POST",headers:{"Content-Type":"application/json",apikey:SB_KEY},body:JSON.stringify(body)});
    const raw=(await res.text()).trim();let out=null;try{out=JSON.parse(raw)}catch(e){}
    if(!out||!out.id)throw new Error((out&&out.error)||tl("Generation failed, try again."));
    if(!await useBank(out.id))throw new Error(tl("Quiz created but couldn't be loaded."));
    setQuizParam();mkFile=null;setMkFile(null);$("mkText").value="";$("mkTitle").value="";
    show("topic");toast(tl("Quiz ready: {n} questions",{n:Q.length+TQ.length}));
  }catch(e){showErr("mkErr",e.message||tl("Generation failed, try again."))}
  finally{clearInterval(tick);st.hidden=true;$("mkGo").disabled=false}
};

// ---------- back button: one level up (game -> mode -> quiz page -> home) ----------
// every level the visitor reaches is a browser-history entry, so the phone's back gesture and the arrow behave like the in-app buttons
(function(){
  const PAGE=location.href.split("#")[0],KEEP=history.replaceState.bind(history);
  history.replaceState=(s,t,u)=>KEEP(s||history.state,t,u);   // other code rewrites the address with no state: keep ours
  const stack=[],kindOf=id=>id==="topic"?"topic":(id==="home"||id==="make"||id==="stats")?"home":"run";
  let cur=0,skip=0,rawShow=show,rawMode=setMode;
  const url=e=>e.k==="topic"&&e.q&&e.q!=="socio"?"?quiz="+e.q:location.pathname;
  const mk=k=>({k,q:BANK&&BANK.id,m:$("topic").dataset.mode||"menu"});
  const put=(e,push)=>{e.i=push?cur+1:cur;if(push)cur++;stack[cur]=e;stack.length=cur+1;
    try{if(push&&cur===1&&/[?&]quiz=/.test(location.search))KEEP(stack[0],"",location.pathname);push?history.pushState(e,"",url(e)):KEEP(e,"",e.k==="topic"?url(e):undefined)}catch(x){}};
  const same=(a,b)=>a&&b&&a.k===b.k&&(a.k!=="topic"||a.q===b.q&&a.m===b.m);
  const back=d=>{skip++;history.go(d)};
  stack[0]={k:"home",i:0,q:null,m:"menu"};try{KEEP(stack[0],"")}catch(x){}
  window.show=function(id){
    rawShow(id);
    const e=mk(kindOf(id)),top=stack[cur];
    if(e.k==="home"){if(top.k==="home")put(e);else{let j=cur;while(j>0&&stack[j].k!=="home")j--;if(stack[j].k==="home"&&j<cur)back(j-cur);else put(e)}}
    else if(e.k==="topic"){
      if(top.k==="home")put(e,true);
      else if(top.k==="topic")put(e);
      else{const b=stack[cur-1];if(b&&b.k==="topic"&&b.q===e.q)back(-1);else put(e)}}
    else if(top.k==="run")put(e);else put(e,true)};
  window.setMode=function(m){
    const prev=$("topic").dataset.mode||"menu";rawMode(m);
    const now=$("topic").dataset.mode||"menu",top=stack[cur];
    if(now===prev||!top||top.k!=="topic"||top.q!==(BANK&&BANK.id))return;
    const e=mk("topic");
    if(now==="menu"&&stack[cur-1]&&stack[cur-1].k==="topic"&&stack[cur-1].q===e.q)back(-1);
    else if(prev==="menu")put(e,true);else put(e)};
  function stopRun(){if(window.examBusy&&examBusy()){if(window.exSnap)exSnap();window.exPaused=true;EX.on=false}if(mode){leaveGame(true);mode=null;code=null;G=null;P={}}}
  function running(){return (window.examBusy&&examBusy())||(mode==="multi"&&G&&(G.status==="q"||G.status==="reveal"))}
  addEventListener("popstate",async ev=>{
    const e=ev.state;
    if(skip){skip--;if(e&&e.i!=null){cur=e.i;stack[cur]=e}return}
    if(!e||e.i==null){if(!e&&location.href.split("#")[0]===PAGE)return;   // only the #fragment changed (the sign-in library clears it after a sign-in link): not a way out of the app
      history.go(cur-(history.length-1));return}
    const from=stack[cur];
    if(from&&from.k==="run"&&e.k!=="run"&&running()){
      const q=window.examBusy&&examBusy()?tl("Leave the exam? It stays paused and you can resume it from this quiz page."):tl("Leave the current game? The other players will carry on without you.");
      if(!confirm(q)){back(cur-e.i);return}}
    cur=e.i;stack[cur]=e;
    if(e.k==="run"){if(!from||from.k!=="run")back(-1);return}   // a game can't be re-opened from history
    stopRun();
    if(e.k==="home"){rawShow("home");renderMyQuizzes();return}
    if(!BANK||BANK.id!==e.q){if(!await useBank(e.q)){rawShow("home");return}}
    rawMode(e.m);rawShow("topic");
    if(typeof renderCardsPanel==="function")renderCardsPanel();if(window.renderExamPanel)renderExamPanel();
  });
})();

loadBank(window.BANK_SOCIO);renderMyQuizzes();renderResume();addEventListener("load",()=>renderPreviews());
if(sb){setMultiNote(true)}else setMultiNote(false);
(async()=>{let id=null;try{id=new URLSearchParams(location.search).get("quiz")}catch(e){}
  if(!id||!(BUILTIN[id]||/^[0-9a-f-]{36}$/i.test(id)))return;
  if(!await useBank(id)){toast(tl("Quiz not found"));return}
  show("topic")})();
(()=>{let c=null;try{c=(new URLSearchParams(location.search).get("code")||"").toUpperCase().replace(/[^A-Z]/g,"").slice(0,4)}catch(e){}
  if(!c||c.length!==4)return;$("codeIn").value=c;
  try{history.replaceState(null,"",location.pathname)}catch(e){}
  if(sb&&lsGet("socio-nick"))joinGame(c);
  else{$("nick").focus();showErr("joinErr",tl("Enter your first name, then tap Join."));$("joinErr").style.color="var(--hl)"}})();
