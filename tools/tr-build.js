// Builds a quiz translation file from a line-by-line translation (the layout printed by tools/tr-dump.js).
// Usage: node tools/tr-build.js <id> <lang> <translated.txt> [more.txt ...]
// Each line: "T: {...topics}" | "<i> [question, right, wrong1, wrong2, wrong3, explanation(, hint)]" | "<i> [question, explanation]" (true/false) | "t<i> [question, [answers], explanation]"
// Writes js/banks/tr/<id>.<lang>.js, or api/_esade/tr/<id>.<lang>.js for an ESADE quiz. Then run: node tools/check-tr.js <id> && node tools/build-catalog.js
const fs=require("fs"),path=require("path"),bp=require("./bankpath");
const [id,lang,...inputs]=process.argv.slice(2);
if(!id||!lang||!inputs.length){console.error("usage: node tools/tr-build.js <id> <lang> <file>...");process.exit(2)}
global.window={};require(bp.bankFile(id));const b=window["BANK_"+id.toUpperCase()];
const Q=new Array(b.Q.length),TQ=new Array(b.TQ.length);let T={};
for(const f of inputs)for(const raw of fs.readFileSync(f,"utf8").split("\n")){const line=raw.trim();if(!line||line.startsWith("lang "))continue;
  if(line.startsWith("T:")){T={...T,...JSON.parse(line.slice(2))};continue}
  const m=/^(t?)(\d+) (.*)$/.exec(line);if(!m)throw new Error(f+": cannot read line: "+line.slice(0,80));
  const v=JSON.parse(m[3]);if(m[1])TQ[+m[2]]=v;else Q[+m[2]]=b.Q[+m[2]].tf?v.slice(0,2):v}
const miss=[...Q.keys()].filter(i=>!Q[i]).concat([...TQ.keys()].filter(i=>!TQ[i]).map(i=>"t"+i));
if(miss.length){console.error("missing: "+miss.slice(0,30).join(" ")+(miss.length>30?" …":""));process.exit(1)}
const dir=bp.isPrivate(id)?"api/_esade/tr":"js/banks/tr",out=path.join(__dirname,"..",dir,id+"."+lang+".js");
fs.mkdirSync(path.dirname(out),{recursive:true});
const J=x=>JSON.stringify(x);
fs.writeFileSync(out,"(window.BANK_TR=window.BANK_TR||{})["+J(id+"."+lang)+"]={T:"+J(T)+",\nQ:[\n"+Q.map(J).join(",\n")+"\n],\nTQ:[\n"+TQ.map(J).join(",\n")+"\n]};\n");
console.log("wrote "+path.relative(path.join(__dirname,".."),out)+": "+Q.length+" Q, "+TQ.length+" TQ");
