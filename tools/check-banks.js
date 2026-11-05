// Quality checks for hand-written quizzes: node tools/check-banks.js [id...]
// Fails on: wrong option count, duplicate options, duplicate questions, answer given away in the question,
// missing explanation or difficulty, typed answers that are empty, unknown session numbers.
const path=require("path");
const ids=process.argv.slice(2).length?process.argv.slice(2):["uspop","gastro","ukculture","startups","brands","barcelona","finance","econ","strategy","jargon","bigtech","worldtour","emoji","internet","hits","screen","sports","gamer","kids","myths","foodtravel","countryclues","oddemoji","braintraps","kwave","korea"];
const norm=s=>String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g," ").trim();
let bad=0;const err=(id,msg)=>{bad++;console.error(id+": "+msg)};
for(const id of ids){
  global.window={};require(require("./bankpath").bankFile(id));
  const b=window["BANK_"+id.toUpperCase()],seen=new Set(),per={};
  for(const q of b.Q){
    const w=q.q.slice(0,50);per[q.s]=(per[q.s]||0)+1;
    if(!b.sess[q.s])err(id,"unknown session "+q.s+" in "+w);
    const dk=norm(q.q)+"|"+(q.q.match(/\p{Extended_Pictographic}/gu)||[]).join("");if(seen.has(dk))err(id,"duplicate question "+w);seen.add(dk);
    if(q.tf){if(q.o.length!==2)err(id,"TF needs 2 options: "+w)}
    else{if(q.o.length!==4)err(id,"needs 4 options: "+w);
      if(new Set(q.o.map(norm)).size!==q.o.length)err(id,"duplicate options: "+w);
      const ok=norm(q.o[0]);if(ok.length>3&&norm(q.q).includes(ok))err(id,"answer in question: "+w)}
    if(!q.e||q.e.length<15)err(id,"missing explanation: "+w);
    if(![1,2,3].includes(q.d))err(id,"missing difficulty: "+w);
    if(q.o.some(x=>x.length>90))err(id,"option too long: "+w);
  }
  const ts=new Set();
  for(const q of b.TQ){const w=q.q.slice(0,50);
    if(!b.sess[q.s])err(id,"unknown session "+q.s+" in typed "+w);
    if(!q.a||!q.a.length||q.a.some(x=>!norm(x)))err(id,"empty typed answer: "+w);
    if(q.a.some(x=>norm(x).length>3&&norm(q.q).includes(norm(x))))err(id,"typed answer in question: "+w);
    if(ts.has(norm(q.q)))err(id,"duplicate typed question "+w);ts.add(norm(q.q));
    if(!q.e)err(id,"typed missing explanation: "+w)}
  for(const s of Object.keys(b.sess))if((per[s]||0)<8)err(id,"session "+s+" has only "+(per[s]||0)+" questions");
  console.log(id,"Q",b.Q.length,"TQ",b.TQ.length,JSON.stringify(per),"d:",[1,2,3].map(d=>b.Q.filter(q=>q.d===d).length).join("/"));
}
process.exit(bad?1:0);
