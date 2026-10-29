// ---------- exam planner: set the date of your exam, get a daily question goal ----------
// per quiz, localStorage lsKey("plan") = {date:"YYYY-MM-DD"|"", day:"YYYY-MM-DD", n:questions answered that day}
function planGet(){try{return JSON.parse(lsGet(lsKey("plan"))||"{}")}catch(e){return {}}}
function planSave(p){lsSet(lsKey("plan"),JSON.stringify(p))}
function planCount(k){const p=planGet(),d=dayKey();if(p.day!==d){p.day=d;p.n=0}p.n=(p.n||0)+(k||1);planSave(p);renderPlan()}
function planDaysLeft(date){const [y,m,d]=date.split("-").map(Number),t=new Date();
  return Math.round((new Date(y,m-1,d)-new Date(t.getFullYear(),t.getMonth(),t.getDate()))/864e5)}
function planGoal(daysLeft){const total=Q.length+TQ.length;return Math.max(10,Math.min(150,Math.ceil(total/Math.max(1,daysLeft+1))))}
function renderPlan(){
  if(!BANK)return;
  const p=planGet(),box=$("planBody"),inp=$("planDate");box.textContent="";
  inp.value=p.date||"";inp.min=dayKey();
  $("planClear").hidden=!p.date;
  if(!p.date){box.appendChild(el("p","muted",tl("Set the date of your exam and Tipoki tells you how many questions to do each day.")));return}
  const dl=planDaysLeft(p.date);
  if(dl<0){box.appendChild(el("p","muted",tl("This exam date has passed. Pick a new one or clear it.")));return}
  const goal=planGoal(dl),done=p.day===dayKey()?(p.n||0):0,pc=Math.min(100,Math.round(done/goal*100));
  box.appendChild(el("div","pl-head",dl===0?tl("Exam today. Good luck!"):tl(dl===1?"Exam tomorrow":"Exam in {n} days",{n:dl})));
  box.appendChild(el("div","pl-sum",done>=goal?tl("Today's goal is done: {d} questions. Nice.",{d:done}):tl("Today: {d} / {g} questions",{d:done,g:goal})));
  const bar=el("div","tbar pl-bar");bar.setAttribute("role","progressbar");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax",goal);bar.setAttribute("aria-valuenow",Math.min(done,goal));
  const i=el("i");i.style.width=pc+"%";bar.appendChild(i);box.appendChild(bar);
  box.appendChild(el("p","muted pl-note",tl("The goal spreads the whole quiz ({t} questions) over the days left.",{t:Q.length+TQ.length})))}
$("planDate").onchange=e=>{const p=planGet();p.date=e.target.value||"";planSave(p);renderPlan()};
$("planClear").onclick=()=>{const p=planGet();p.date="";planSave(p);renderPlan()};
// every answered question counts (solo, multiplayer, replays), and every question of a handed-in exam
const plTrackMiss=trackMiss;
trackMiss=function(qi,ok){plTrackMiss(qi,ok);planCount(1)};
const plHandIn=handInExam;
handInExam=function(timeUp){const was=EX.on;plHandIn(timeUp);if(was&&EX.res)planCount(EX.res.filter(r=>r!==-1).length)};
const plRenderSettings=renderSettings;
renderSettings=function(){plRenderSettings();renderPlan()};
renderPlan();
