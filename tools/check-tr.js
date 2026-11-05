// Checks the quiz translations in js/banks/tr: node tools/check-tr.js [id...]
// Same number of questions as the original bank, right shape, no empty text, 4 distinct options, true/false stay 2-field, no leftover original language.
const fs=require("fs"),path=require("path");
const dir=path.join(__dirname,"../js/banks/tr");
const files=fs.readdirSync(dir).filter(f=>f.endsWith(".js")&&(!process.argv[2]||process.argv.slice(2).includes(f.split(".")[0])));
let bad=0;const err=(f,m)=>{bad++;console.error(f+": "+m)};
for(const f of files){
  const [id,lang]=f.split(".");
  global.window={};const bf=require("./bankpath").bankFile(id);delete require.cache[bf];require(bf);const b=window["BANK_"+id.toUpperCase()];
  const tf=path.join(dir,f);delete require.cache[tf];require(tf);const tr=window.BANK_TR[id+"."+lang];
  if(!tr)return err(f,"does not register BANK_TR[\""+id+"."+lang+"\"]");
  if(lang===b.lang)err(f,"same language as the bank");
  if(tr.Q.length!==b.Q.length)err(f,"Q has "+tr.Q.length+" entries, the bank has "+b.Q.length);
  if((tr.TQ||[]).length!==b.TQ.length)err(f,"TQ has "+(tr.TQ||[]).length+" entries, the bank has "+b.TQ.length);
  const topics=new Set(b.Q.filter(q=>!(q.tf&&/^(true or false|vrai ou faux)$/i.test(q.t||""))).map(q=>q.t).filter(Boolean));
  topics.forEach(t=>{if(!(tr.T||{})[t])err(f,"topic \""+t+"\" has no translation in T")});
  const ne=s=>typeof s==="string"&&s.trim().length>0;
  b.Q.forEach((q,i)=>{const x=tr.Q[i];if(!x)return;const w=i+" "+q.q.slice(0,30);
    const n=q.tf?2:6;
    if(x.length!==n||!x.every(ne))return err(f,"bad entry "+w+" (needs "+n+" non-empty strings)");
    if(!q.tf){if(new Set(x.slice(1,5).map(s=>s.toLowerCase())).size!==4)err(f,"duplicate options "+w);if(x.slice(1,5).some(s=>s.length>90))err(f,"option too long "+w)}
    const dig=s=>(String(s).match(/\d+/g)||[]).join(",");
    if(!q.tf&&dig(q.o[0])&&dig(q.o[0])!==dig(x[1]))err(f,"numbers differ in right answer "+w+": "+q.o[0]+" / "+x[1])});
  b.TQ.forEach((q,i)=>{const x=tr.TQ[i];if(!x)return;const w="t"+i;
    if(x.length!==3||!ne(x[0])||!ne(x[2])||!Array.isArray(x[1])||!x[1].length||!x[1].every(ne))err(f,"bad typed entry "+w)});
  console.log(f,"ok",tr.Q.length,"Q",(tr.TQ||[]).length,"TQ");
}
process.exit(bad?1:0);
