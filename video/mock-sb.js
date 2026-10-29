// In-memory stand-in for supabase-js (container can't reach *.supabase.co)
(function(){
const QD={sess:{1:"Croissance",2:"Inflation"},mcq:[1,2,3,4,5,6].map(i=>({s:1+i%2,t:"Notion",q:"Question numéro "+i+" sur la croissance économique ?",o:["La bonne réponse "+i,"Une mauvaise réponse","Encore une autre","La dernière option"],e:"Explication."})),tf:[{s:1,q:"Le PIB mesure la richesse produite.",v:true,e:"Oui."}],typed:[{s:2,q:"Qui a écrit la Théorie générale ?",a:["Keynes"],e:"Keynes, 1936."}]};
const now=()=>new Date().toISOString();
const db={games:[],players:[],quizzes:[
 {id:"q1",title:"Macroéconomie, chapitres 1 à 4 : croissance, inflation et politiques monétaires",subject:"L2 Économie",lang:"fr",created_at:now(),data:QD},
 {id:"q2",title:"Droit constitutionnel",subject:"L1 Droit",lang:"fr",created_at:now(),data:QD}]};
const subs=[];
window.__db=db;
function mkState(code,status,nick,title){return {host:"x"+code,hostNick:nick,bank:"socio",bankTitle:title,status,qi:0,deck:Array(15).fill({id:1,o:[0,1,2,3]}),T:20,created:Date.now(),seq:1,sess:[1],fmt:"mix"}}
db.games.push({code:"KTRM",state:mkState("KTRM","lobby","Marie-Charlotte","Socio Trivia S1–S10"),updated_at:now()});
db.games.push({code:"BXQP",state:mkState("BXQP","q","Jean","Socio Trivia S1–S10"),updated_at:now()});
function Q(t){this.t=t;this.f=[];this.op="select";this.one=false;this.lim=null;this.ord=null}
Q.prototype.select=function(){return this};
Q.prototype.eq=function(k,v){this.f.push(r=>r[k]===v);return this};
Q.prototype.in=function(k,v){this.f.push(r=>v.includes(r[k]));return this};
Q.prototype.gt=function(k,v){this.f.push(r=>r[k]>v);return this};
Q.prototype.order=function(k,o){this.ord=[k,o&&o.ascending===false?-1:1];return this};
Q.prototype.limit=function(n){this.lim=n;return this};
Q.prototype.maybeSingle=function(){this.one=true;return this};
Q.prototype.insert=function(row){this.op="insert";this.row=row;return this};
Q.prototype.update=function(p){this.op="update";this.patch=p;return this};
Q.prototype.run=function(){
  const tb=db[this.t]||(db[this.t]=[]);
  if(this.op==="insert"){const r={created_at:now(),updated_at:now(),...JSON.parse(JSON.stringify(this.row))};
    if(this.t==="games"&&tb.some(x=>x.code===r.code))return {error:{code:"23505"}};tb.push(r);notify(this.t,r);return {data:null,error:null}}
  let rows=tb.filter(r=>this.f.every(f=>f(r)));
  if(this.op==="update"){rows.forEach(r=>{Object.assign(r,JSON.parse(JSON.stringify(this.patch)),{updated_at:now()});notify(this.t,r)});return {data:null,error:null}}
  if(this.ord){const [k,d]=this.ord;rows=rows.slice().sort((a,b)=>a[k]>b[k]?d:-d)}
  if(this.lim)rows=rows.slice(0,this.lim);
  rows=JSON.parse(JSON.stringify(rows));
  return {data:this.one?(rows[0]||null):rows,error:null};
};
Q.prototype.then=function(res,rej){return Promise.resolve().then(()=>this.run()).then(res,rej)};
function notify(t,r){setTimeout(()=>subs.forEach(s=>s.t===t&&s.cb({new:JSON.parse(JSON.stringify(r))})),0)}
window.__addPlayer=(code,pid,nick,ans)=>{const r={code,pid,nick,ans:ans||{},created_at:now()};db.players.push(r);notify("players",r)};
window.__setAns=(code,pid,ans)=>{const r=db.players.find(p=>p.code===code&&p.pid===pid);r.ans=ans;notify("players",r)};
window.supabase={createClient:()=>({
  from:t=>new Q(t),
  channel:()=>{const c={on:(e,o,cb)=>{subs.push({t:o.table,cb});return c},subscribe:()=>c};return c},
  removeChannel:()=>{}
})};
})();
