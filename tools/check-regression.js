// Structure checks for the quiz "regression" (Unit 5, linear regression).
// Usage: node tools/check-regression.js   (exits with code 1 if something is wrong)
// The numbers are verified separately and independently by: python3 tools/check-regression.py
global.window={};require("../js/banks/regression.js");
const b=window.BANK_REGRESSION;let bad=0;const err=m=>{bad++;console.error(m)};
const seen=new Set();
for(const q of b.Q){
  const w=q.q.slice(0,60);
  if(!b.sess[q.s])err("unknown session: "+w);
  if(seen.has(q.q))err("duplicate question: "+w);seen.add(q.q);
  if(q.o.length!==(q.tf?2:4))err("wrong option count: "+w);
  const t=q.o.map(x=>String(x).trim());
  if(new Set(t).size!==t.length||t.some((x,i)=>x!==q.o[i]))err("duplicate or untrimmed options: "+w);
  if(q.a!==0)err("a must be 0: "+w);
  if(q.o.some(x=>x.length>150||!x))err("option empty or too long: "+w);
  if(!q.e||q.e.length<15)err("missing explanation: "+w);
  if(![1,2,3].includes(q.d))err("missing difficulty: "+w);
  if(q.o.slice(1).some(x=>x===q.o[0]))err("wrong option equals right one: "+w);
}
const ts=new Set();
for(const q of b.TQ){const w=q.q.slice(0,60);
  if(!b.sess[q.s])err("unknown session (typed): "+w);
  if(!q.a||!q.a.length||q.a.some(x=>!String(x).trim()))err("empty typed answer: "+w);
  if(q.a.some(x=>x.length>3&&q.q.toLowerCase().includes(String(x).toLowerCase())))err("typed answer in question: "+w);
  if(ts.has(q.q))err("duplicate typed: "+w);ts.add(q.q);
  if(!q.e||q.e.length<15)err("typed missing explanation: "+w);
  if(![1,2,3].includes(q.d))err("typed missing difficulty: "+w)}
const per={};b.Q.concat(b.TQ).forEach(q=>per[q.s]=(per[q.s]||0)+1);
for(const s of Object.keys(b.sess))if((per[s]||0)<8)err("session "+s+" has only "+(per[s]||0)+" questions");
const tot=b.Q.length+b.TQ.length;
console.log("regression: MCQ+TF",b.Q.length,"written",b.TQ.length,"("+(100*b.TQ.length/tot).toFixed(1)+"% written)",JSON.stringify(per));
process.exit(bad?1:0);
