// Prints the translatable text of a bank in the layout of js/banks/tr/<id>.<lang>.js, one question per line.
// Usage: node tools/tr-dump.js <id> [from] [to]      (question indices, to excluded)
global.window={};const id=process.argv[2];require(require("./bankpath").bankFile(id));
const b=window["BANK_"+id.toUpperCase()],from=+process.argv[3]||0,to=+process.argv[4]||1e9;
const topics=[...new Set(b.Q.map(q=>q.t).filter(Boolean))];
if(from===0)console.log("T: "+JSON.stringify(topics)+"\nlang "+b.lang);
b.Q.forEach((q,i)=>{if(i<from||i>=to)return;console.log(i+" "+JSON.stringify(q.tf?[q.q,q.e,(q.o[0]).slice(0,5)]:[q.q,...q.o,q.e]))});
if(to>=b.Q.length)b.TQ.forEach((q,i)=>console.log("t"+i+" "+JSON.stringify([q.q,q.a,q.e])));
