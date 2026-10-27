// ---------- weak points: tracks how often each question is missed and trains the ones you keep getting wrong ----------
// per quiz, localStorage lsKey("weak") = {"m<id>"|"t<id>": [attempts, wrong, right-in-a-row, last time]}; synced like every tpk- key
const WK_RUN=15,WK_MIN=3;
let wkSess=null;   // session/chapter the panel is focused on (null = all)
function wkStore(){try{return JSON.parse(lsGet(lsKey("weak"))||"{}")}catch(e){return {}}}
function wkRec(k,ok){
  const st=wkStore(),e=st[k]||[0,0,0,0];
  e[0]++;if(ok)e[2]++;else{e[1]++;e[2]=0}e[3]=Date.now();st[k]=e;
  const ks=Object.keys(st);   // keep the 800 most recent
  if(ks.length>800)ks.sort((a,b)=>st[a][3]-st[b][3]).slice(0,ks.length-800).forEach(x=>delete st[x]);
  lsSet(lsKey("weak"),JSON.stringify(st));renderWeak();
}
function wkQ(k){return k[0]==="t"?TQ[+k.slice(1)]:Q[+k.slice(1)]}
// still weak = missed at least once and not yet answered right 3 times running
function wkList(){
  const st=wkStore(),out=[];
  for(const k in st){const q=wkQ(k),e=st[k];if(!q||!e[1]||e[2]>=3)continue;
    out.push({k,q,n:e[0],w:e[1],score:(e[1]+.5)/(e[0]+1)*(e[2]===0?1.6:1/(1+e[2]))})}
  return out}
function wkSessions(list){
  const m={};list.forEach(x=>{const s=x.q.s;(m[s]=m[s]||{s,n:0,w:0,c:0});m[s].n+=x.n;m[s].w+=x.w;m[s].c++});
  return Object.values(m).sort((a,b)=>b.w/b.n-a.w/a.n||b.c-a.c)}
function wkNotion(q){const e=q.e||"",i=e.indexOf(" — ");return i>0&&i<=40?e.slice(0,i):""}
function renderWeak(){
  if(!BANK)return;
  const all=wkList(),on=all.length>=WK_MIN;$("weakPanel").hidden=!on;if(!on)return;
  if(wkSess!=null&&!all.some(x=>x.q.s===wkSess))wkSess=null;
  const list=wkSess==null?all:all.filter(x=>x.q.s===wkSess);
  $("weakTitle").textContent="Your weak points";
  const top=list.slice().sort((a,b)=>b.score-a.score),names=[...new Set(top.map(x=>wkNotion(x.q)).filter(Boolean))].slice(0,3);
  $("weakSub").textContent=all.length+" questions you keep missing"+(names.length?", like "+names.join(", "):"")+". Answer one right 3 times in a row and it's off the list.";
  const ch=$("weakChips");ch.textContent="";
  const ss=wkSessions(all);
  if(ss.length>1){
    const a=el("button","chip","All");a.type="button";a.setAttribute("aria-pressed",wkSess==null);a.onclick=()=>{wkSess=null;renderWeak()};ch.appendChild(a);
    ss.slice(0,6).forEach(x=>{const b=el("button","chip",sLabel(x.s)+" · "+Math.round(x.w/x.n*100)+"% missed");b.type="button";b.title=SESS[x.s]||"";
      b.setAttribute("aria-pressed",wkSess===x.s);b.onclick=()=>{wkSess=wkSess===x.s?null:x.s;renderWeak()};ch.appendChild(b)})}
  const n=Math.min(WK_RUN,list.length);
  $("weakBtn").textContent="Train "+n+" now";$("weakBtn").disabled=!n;
}
function playWeak(){
  const all=wkList(),list=wkSess==null?all:all.filter(x=>x.q.s===wkSess);
  const pick=list.map(x=>({...x,r:x.score*(.75+Math.random()*.5)})).sort((a,b)=>b.r-a.r).slice(0,WK_RUN);
  if(pick.length)startSolo(shuffle(pick.map(x=>missItem(x.k))))}
// hook into answers (solo and multiplayer) and the exam hand-in without touching their code
const wkTrackMiss=trackMiss;
trackMiss=function(qi,ok){wkTrackMiss(qi,ok);wkRec(missKey(qi),ok)};
const wkHandIn=handInExam;
handInExam=function(timeUp){const was=EX.on;wkHandIn(timeUp);
  if(was&&EX.res)EX.deck.forEach((d,i)=>{if(EX.res[i]!==-1)wkRec(d.t!=null?"t"+d.t:"m"+d.id,EX.res[i]===1)})};
$("weakBtn").onclick=playWeak;
const wkRenderSettings=renderSettings;
renderSettings=function(){wkRenderSettings();renderWeak()};
renderWeak();
