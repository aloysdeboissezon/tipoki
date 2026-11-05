// Where a quiz's files are: public ones in js/banks + js/sheets, ESADE ones (served only to verified accounts) in api/_esade.
const fs=require("fs"),path=require("path"),root=path.join(__dirname,"..");
const pick=(a,b)=>fs.existsSync(path.join(root,a))?path.join(root,a):(fs.existsSync(path.join(root,b))?path.join(root,b):null);
exports.bankFile=id=>pick("js/banks/"+id+".js","api/_esade/banks/"+id+".js");
exports.sheetFile=id=>pick("js/sheets/"+id+".js","api/_esade/sheets/"+id+".js");
exports.isPrivate=id=>fs.existsSync(path.join(root,"api/_esade/banks/"+id+".js"));
exports.privateIds=()=>fs.readdirSync(path.join(root,"api/_esade/banks")).map(f=>f.replace(/\.js$/,"")).sort();
