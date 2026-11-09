// Builds js/banks/tr/culture.ko.js (Korean version of the Culture générale quiz) from the Korean data in tools/culture-ko.
// node tools/build-culture-ko.js
// The French bank is generated (seeded shuffles, ~2,400 questions), so the Korean file has to follow exactly the same order: this script walks the datasets in the
// same order as js/banks/culture.js, takes the next French question of the bank for each slot, checks it is the expected one, and writes its Korean twin
// (same right answer, same wrong answers mapped word for word). Language-learning questions are re-phrased: the Korean word is the prompt, the answer stays in the target language.
const fs=require("fs"),path=require("path");
const D=n=>fs.readFileSync(path.join(__dirname,"culture-ko",n),"utf8").replace(/\s+$/,"").split("\n");
const FR=n=>{const s=fs.readFileSync(path.join(__dirname,"../js/banks/culture.js"),"utf8");return s.match(new RegExp("^const "+n+"=`([\\s\\S]*?)`","m"))[1].trim().split("\n").map(l=>l.split("|").map(x=>x.trim()))};
const KO=n=>D(n+".txt").map(l=>l.split("|").map(x=>x.trim()));
global.window={};require("../js/banks/culture.js");const B=window.BANK_CULTURE;
let qi=0,ti=0;const Q=[],TQ=[];
const err=m=>{console.error("culture.ko: "+m);process.exit(1)};
const jong=s=>{s=String(s).replace(/[」”’)\s.]+$/,"");const c=s.slice(-1).charCodeAt(0);return c>=0xAC00&&c<=0xD7A3?(c-0xAC00)%28:-1};
const eun=s=>s+(jong(s)<0?"은(는)":jong(s)?"은":"는");
const ga=s=>s+(jong(s)<0?"이(가)":jong(s)?"이":"가");
const nextQ=(fr)=>{const q=B.Q[qi++];if(!q||q.q!==fr)err("misaligned at Q "+(qi-1)+": expected «"+fr+"», bank has «"+(q&&q.q)+"»");return q};
const nextT=(fr)=>{const q=B.TQ[ti++];if(!q||q.q!==fr)err("misaligned at TQ "+(ti-1)+": expected «"+fr+"», bank has «"+(q&&q.q)+"»");return q};
// mcq: fr = French question, ko = [question, explanation(, hint)], m = French option -> Korean option
function mcq(fr,ko,m,hint){const q=nextQ(fr);const o=q.o.map(m);Q.push([ko[0],...o,ko[1],...(hint?[hint]:[])])}
function typed(fr,ko,ans,e){nextT(fr);TQ.push([ko,[...new Set(ans)],e])}

// ---------- hand-written ----------
const jl=n=>fs.readFileSync(path.join(__dirname,"culture-ko",n),"utf8").trim().split("\n").map(l=>JSON.parse(l));
const MCQ=jl("MCQ.jsonl"),TF=jl("TF.jsonl"),TY=jl("TYPED.jsonl");
const src=fs.readFileSync(path.join(__dirname,"../js/banks/culture.js"),"utf8");
const cnt=(a,b)=>src.slice(src.indexOf(a),src.indexOf(b)).split("\n").filter(l=>/^\[\d/.test(l)).length;
if(cnt("const MCQ=[","const TF=[")!==MCQ.length||cnt("const TF=[","const TYPED=[")!==TF.length||cnt("const TYPED=[","// ---------- generator")!==TY.length)err("hand-written counts differ from the bank");
MCQ.forEach(x=>{const q=B.Q[qi++];if(q.o.length!==4)err("MCQ shape");Q.push(x)});
TF.forEach(x=>{const q=B.Q[qi++];if(!q.tf)err("TF alignment at "+(qi-1));Q.push([x[0],(q.o[0]==="Vrai"?"참. ":"거짓. ")+x[1]])});
TY.forEach(x=>{B.TQ[ti++];TQ.push([x[0],x[1],x[2]])});

// ---------- dictionaries ----------
const ZONE={"Europe":"유럽","Asie":"아시아","Afrique":"아프리카","Amérique du Nord et centrale":"북·중미","Amérique du Sud":"남미","Océanie":"오세아니아"};
const frC=FR("COUNTRIES"),koC=KO("COUNTRIES");
const nameKo={},capKo={};
frC.forEach((r,i)=>{nameKo[r[0]]=koC[i][0];capKo[r[2]]=koC[i][1]});
Object.assign(nameKo,{"Afrique du Sud":"남아프리카공화국","Israël":"이스라엘","Indonésie":"인도네시아","Angleterre":"잉글랜드","Tchécoslovaquie":"체코슬로바키아","Corée du Sud et Japon":"대한민국·일본","Canada et États-Unis":"캐나다와 미국"});
const frMo=FR("MONUMENTS"),koMo=KO("MONUMENTS");
frMo.forEach((r,i)=>{capKo[r[1]]=capKo[r[1]]||koMo[i][1]});
Object.assign(capKo,{"Mexico":"멕시코시티","Munich":"뮌헨","Montréal":"몬트리올","Los Angeles":"로스앤젤레스","Atlanta":"애틀랜타","Rio de Janeiro":"리우데자네이루","Sydney":"시드니","Pékin":"베이징","Séoul":"서울","Tokyo":"도쿄","Londres":"런던","Berlin":"베를린","Barcelone":"바르셀로나","Moscou":"모스크바","Rome":"로마","Paris":"파리","Athènes":"아테네","New York":"뉴욕"});
const CAPNOTE={"Côte d'Ivoire":"공식 수도는 야무수크로이고, 가장 큰 도시는 아비잔입니다.","Bolivie":"수크레는 헌법상의 수도이며, 정부는 라파스에 있습니다.","Bénin":"공식 수도는 포르토노보이며, 정부는 주로 코토누에 있습니다.","Tanzanie":"공식 수도는 도도마이고, 가장 큰 도시는 다르에스살람입니다.","Nigeria":"아부자가 1991년에 라고스를 대신해 수도가 되었습니다.","Brésil":"신도시 브라질리아가 1960년에 리우데자네이루를 대신했습니다.","Australie":"캔버라는 시드니와 멜버른의 경쟁을 끝내려고 건설되었습니다.","Turquie":"1923년부터 이스탄불이 아니라 앙카라입니다.","Suisse":"베른은 ‘연방 도시’이며, 가장 큰 도시는 취리히입니다.","Canada":"토론토나 몬트리올이 아니라 오타와입니다.","Birmanie":"네피도가 2005년에 양곤을 대신했습니다.","Kazakhstan":"아스타나가 1997년에 알마티를 대신했습니다.","Pakistan":"카라치가 아니라 이슬라마바드입니다.","Maroc":"카사블랑카나 마라케시가 아니라 라바트입니다.","Nouvelle-Zélande":"오클랜드가 아니라 웰링턴입니다.","États-Unis":"뉴욕이 아니라 워싱턴 D.C.입니다.","Viêt Nam":"북쪽의 하노이이며, 호찌민시는 남쪽에 있습니다."};
const m_=d=>x=>{if(d[x]==null)err("no Korean for «"+x+"»");return d[x]};
const cn=m_(nameKo),cc=m_(capKo),zn=m_(ZONE);

// ---------- countries, capitals, flags ----------
frC.forEach((r,i)=>{const n=r[0],cap=r[2],z=r[3],N=koC[i][0],K=koC[i][1];
  const zone={EU:"유럽",AS:"아시아",AF:"아프리카",AN:"북·중미",SA:"남미",OC:"오세아니아"}[z];
  const e=(eun(K)+" "+N+"의 수도입니다. "+(CAPNOTE[n]||"")).trim();
  mcq("Quelle est la capitale "+r[1]+" ?",[N+"의 수도는 어디일까요?",e],cc);
  mcq(cap+" est la capitale de quel pays ?",[eun(K)+" 어느 나라의 수도일까요?",e],cn);
  mcq("À quel pays appartient ce drapeau ?",["이 국기는 어느 나라의 것일까요?",N+"의 국기입니다(수도: "+K+")."],cn,"이미지를 불러올 수 없습니다. 힌트: 수도는 "+K+"입니다.");
  typed("Quelle est la capitale "+r[1]+" ?",N+"의 수도는 어디일까요?",[K],e);
  mcq("Sur quel continent se trouve le pays suivant : "+n+" ?",["다음 나라는 어느 대륙에 있을까요? "+N,N+": "+zone+"(수도: "+K+")."],x=>({"Europe":"유럽","Asie":"아시아","Afrique":"아프리카","Amérique du Nord et centrale":"북·중미","Amérique du Sud":"남미","Océanie":"오세아니아"})[x]);
});
// ---------- currencies ----------
const frCu=FR("CURRENCIES"),koCu=KO("CURRENCIES"),curKo={};
frCu.forEach((r,i)=>curKo[r[1]]=koCu[i][1]);
frCu.forEach((r,i)=>mcq("Quelle est la monnaie "+r[0]+" ?",[koCu[i][0]+"의 화폐는 무엇일까요?",koCu[i][0]+"의 화폐: "+koCu[i][1]+"."],m_(curKo)));
// ---------- chemistry ----------
const frEl=FR("ELEMENTS"),koEl=KO("ELEMENTS"),elKo={};
frEl.forEach((r,i)=>elKo[r[0]]=koEl[i][0]);
const sym=x=>x;
frEl.forEach(([n,s,z],i)=>{const N=koEl[i][0],e=N+": 원소 기호 "+s+", 원자 번호 "+z+".";
  mcq("Quel élément chimique a pour symbole « "+s+" » ?",["원소 기호 「"+s+"」에 해당하는 원소는?",e],m_(elKo));
  mcq("Quel est le symbole chimique "+(/^[aeiouhéèêàâîôûœ]/i.test(n)?"de l'":"du ")+n.toLowerCase()+" ?",[N+"의 원소 기호는?",e],sym);
  typed("Quel élément chimique a pour symbole « "+s+" » ?","원소 기호 「"+s+"」에 해당하는 원소는?",[N],e);
  if(s.length===2&&!/^(As|Ba)$/.test(s))typed("Quel est le symbole chimique "+(/^[aeiouhéèêàâîôûœ]/i.test(n)?"de l'":"du ")+n.toLowerCase()+" ?",N+"의 원소 기호는?",[s],e);
});
// ---------- books ----------
const frBk=FR("BOOKS"),koBk=KO("BOOKS"),bkT={},bkA={};
frBk.forEach((r,i)=>{bkT[r[0]]=koBk[i][0];bkA[r[1]]=koBk[i][1]});
frBk.forEach(([w,a,v],i)=>{const W=koBk[i][0],A=koBk[i][1],al=(koBk[i][2]||"").split(";").filter(Boolean),e="「"+W+"」: "+A+".";
  mcq("Qui a "+v+" « "+w+" » ?",["「"+W+"」의 작가는?",e],m_(bkA));
  typed("Qui a "+v+" « "+w+" » ?","「"+W+"」의 작가는?",[A,...al],e);
  mcq("Laquelle de ces œuvres est "+((/^[aeiouhéèêàâîôûœ]/i.test(a)?"d'":"de ")+a)+" ?",["다음 중 "+A+"의 작품은?",e],m_(bkT));
});
// ---------- paintings ----------
const frPt=FR("PAINTINGS"),koPt=KO("PAINTINGS"),ptT={},ptA={};
frPt.forEach((r,i)=>{ptT[r[0]]=koPt[i][0];ptA[r[1]]=koPt[i][1]});
frPt.forEach(([t,a],i)=>{const T=koPt[i][0],A=koPt[i][1],al=(koPt[i][2]||"").split(";").filter(Boolean),e="「"+T+"」: "+A+".";
  mcq("Qui a peint « "+t+" » ?",["다음 그림을 그린 화가는? 「"+T+"」",e],m_(ptA));
  mcq("Comment s'appelle ce tableau ?",["이 그림의 제목은?","「"+T+"」, "+A+"의 작품입니다."],m_(ptT),"이미지를 불러올 수 없습니다. 힌트: "+A+"의 작품입니다.");
  typed("Qui a peint « "+t+" » ?","다음 그림을 그린 화가는? 「"+T+"」",[A,...al],e);
});
// ---------- monuments and sites ----------
const frSi=FR("SITES"),koSi=KO("SITES"),plKo={};
frMo.forEach((r,i)=>plKo[r[0].charAt(0).toUpperCase()+r[0].slice(1)]=koMo[i][0]);
frSi.forEach((r,i)=>plKo[r[0].charAt(0).toUpperCase()+r[0].slice(1)]=koSi[i][0]);
frMo.forEach(([n,city],i)=>{const N=koMo[i][0],C=koMo[i][1],e=eun(N)+" "+C+"에 있습니다.";
  mcq("Dans quelle ville se trouve "+n+" ?",[eun(N)+" 어느 도시에 있을까요?",e],cc);
  mcq("Quel est ce lieu célèbre ?",["이 유명한 장소는 어디일까요?",N+"입니다("+C+")."],m_(plKo),"이미지를 불러올 수 없습니다. 힌트: "+C+"에 있습니다.");
  typed("Dans quelle ville se trouve "+n+" ?",eun(N)+" 어느 도시에 있을까요?",[C],e);
});
frSi.forEach(([n,country],i)=>{const N=koSi[i][0],C=koSi[i][1],e=N+": "+C+".";
  mcq("Dans quel pays se trouve "+n+" ?",[eun(N)+" 어느 나라에 있을까요?",e],cn);
  mcq("Quel est ce lieu célèbre ?",["이 유명한 장소는 어디일까요?",N+"입니다("+C+")."],m_(plKo),"이미지를 불러올 수 없습니다. 힌트: 나라는 "+C+"입니다.");
});
// ---------- dates ----------
const frEv=FR("EVENTS"),koEv=D("EVENTS.txt"),OFF=[-30,-20,-15,-12,-10,-8,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,8,10,12,15,20,30];
frEv.forEach(([n,y],i)=>{const N=koEv[i],q="En quelle année a eu lieu "+n+" ?",kq=eun(N)+" 몇 년에 일어났을까요?",e=N+": "+y+"년.";
  mcq(q,[kq,e],x=>x+"년");typed(q,kq,[y,y+"년"],e)});
// ---------- inventions ----------
const frDi=FR("DISCOVERIES"),koDi=KO("DISCOVERIES"),diKo={};
frDi.forEach((r,i)=>diKo[r[1]]=koDi[i][1]);
frDi.forEach((r,i)=>{const k=koDi[i];mcq(r[0],[k[0],k[3]],m_(diKo));typed(r[0],k[0],[k[1],...(k[2]||"").split(";").filter(Boolean)],k[3])});
// ---------- films ----------
const frFi=FR("FILMS"),koFi=KO("FILMS"),fiT={},fiD={};
frFi.forEach((r,i)=>{fiT[r[0]]=koFi[i][0];fiD[r[1]]=koFi[i][1]});
frFi.forEach(([f,d],i)=>{const F=koFi[i][0],D_=koFi[i][1],al=(koFi[i][2]||"").split(";").filter(Boolean),e="「"+F+"」: "+D_+" 감독.";
  mcq("Qui a réalisé le film « "+f+" » ?",["영화 「"+F+"」의 감독은?",e],m_(fiD));
  typed("Qui a réalisé le film « "+f+" » ?","영화 「"+F+"」의 감독은?",[D_,...al],e);
  mcq("Quel film a été réalisé par "+d+" ?",["다음 중 "+D_+" 감독의 영화는?",e],m_(fiT));
});
// ---------- music ----------
const frMu=FR("MUSIC"),koMu=KO("MUSIC"),muT={},muA={};
frMu.forEach((r,i)=>{muT[r[0]]=koMu[i][0];muA[r[1]]=koMu[i][1]});
frMu.forEach(([t,a,v],i)=>{const T=koMu[i][0],A=koMu[i][1],al=(koMu[i][2]||"").split(";").filter(Boolean),pop=v==="chante",e="「"+T+"」: "+A+".";
  const q=pop?"Qui interprète « "+t+" » ?":"Qui a composé « "+t+" » ?",kq=pop?"다음 곡을 부른 가수는? 「"+T+"」":"다음 곡을 작곡한 사람은? 「"+T+"」";
  mcq(q,[kq,e],m_(muA));typed(q,kq,[A,...al],e);
  if(pop)mcq("Quelle chanson est interprétée par "+a+" ?",["다음 가수가 부른 노래는? "+A,e],m_(muT));
});
// ---------- mythology ----------
const frGo=FR("GODS"),koGo=KO("GODS"),grK={},roK={};
frGo.forEach((r,i)=>{grK[r[0]]=koGo[i][0];roK[r[1]]=koGo[i][1]});
frGo.forEach(([gr,ro,dom],i)=>{const G=koGo[i][0],R=koGo[i][1],P=koGo[i][2],e=G+"(그리스) = "+R+"(로마): "+P+".";
  mcq("Quel est l'équivalent romain de "+gr+" ?",["그리스 신 "+G+"에 해당하는 로마 신은?",e],m_(roK));
  mcq("Quel est l'équivalent grec de "+ro+" ?",["로마 신 "+R+"에 해당하는 그리스 신은?",e],m_(grK));
  mcq("Mythologie grecque : qui est le ou la "+dom+" ?",["그리스 신화에서 “"+P+"”은(는) 누구일까요?",e],m_(grK));
  typed("Quel est l'équivalent romain de "+gr+" ?","그리스 신 "+G+"에 해당하는 로마 신은?",[R],e);
});
// ---------- vocabulary: the Korean word is the prompt, the answer stays in the target language ----------
const frWo=FR("WORDS"),koWo=D("WORDS.txt"),woKo={};
frWo.forEach((r,i)=>woKo[r[0]]=koWo[i]);
const LANGS=[["anglais","영어",1],["espagnol","스페인어",2],["allemand","독일어",3],["italien","이탈리아어",4]];
frWo.forEach((w,wi)=>LANGS.forEach(([L,LK,i])=>{const K=koWo[wi],e="「"+K+"」을(를) "+LK+"로 하면 「"+w[i]+"」입니다.";
  const ee=e.replace("을(를)",jong(K)<0?"을(를)":jong(K)?"을":"를");
  mcq("Comment dit-on « "+w[0]+" » en "+L+" ?",["「"+K+"」"+(jong(K)<0?"을(를)":jong(K)?"을":"를")+" "+LK+"로 하면?",ee],x=>x);
  mcq("Que veut dire le mot "+L+" « "+w[i]+" » ?",[LK+" 「"+w[i]+"」의 뜻은?",ee],m_(woKo));
  if(i<=2)typed("Comment dit-on « "+w[0]+" » en "+L+" ?","「"+K+"」"+(jong(K)<0?"을(를)":jong(K)?"을":"를")+" "+LK+"로 하면?",[w[i]],ee);
}));
// ---------- portraits ----------
const frPe=FR("PEOPLE"),koPe=KO("PEOPLE"),peK={};
frPe.forEach((r,i)=>peK[r[0]]=koPe[i][0]);
frPe.forEach(([n],i)=>mcq("Qui est-ce ?",["이 사람은 누구일까요?",koPe[i][0]+": "+koPe[i][1]+"."],m_(peK),"이미지를 불러올 수 없습니다. 힌트: "+koPe[i][1]));
// ---------- sport ----------
FR("WORLDCUP").forEach(([y,host,win])=>{const W=cn(win)+(win==="Allemagne"&&+y<1991?"(서독)":""),H=cn(host);
  const e=y+"년 월드컵: "+W+" 우승, 개최국: "+H+".";
  mcq("Quel pays a remporté la Coupe du monde de football "+y+" ?",[y+"년 월드컵에서 우승한 나라는?",e],cn);
  mcq("Quel pays a organisé la Coupe du monde de football "+y+" ?",[y+"년 월드컵을 개최한 나라는?",e],cn);
});
FR("OLYMPICS").forEach(([y,city])=>{const q="Quelle ville a accueilli les Jeux olympiques d'été de "+y+" ?",kq=y+"년 하계 올림픽을 개최한 도시는?",e=y+"년 하계 올림픽: "+cc(city)+".";
  mcq(q,[kq,e],cc);typed(q,kq,[cc(city)],e)});

if(qi!==B.Q.length||ti!==B.TQ.length)err("covered "+qi+"/"+B.Q.length+" Q and "+ti+"/"+B.TQ.length+" TQ");
const T={"Géo":"지리","Histoire":"역사","Sciences":"과학","Nature":"자연","Arts":"예술","Ciné & musique":"영화·음악","Sport":"스포츠","Divers":"기타","Capitales":"수도","Drapeaux":"국기","Continents":"대륙","Monnaies":"화폐","Chimie":"화학","Livres":"책","Tableaux":"그림","Monuments":"명소","Dates":"연도","Inventions":"발명·발견","Films":"영화","Musique":"음악","Classique":"클래식","Mythologie":"신화","Langues":"언어","Qui est-ce ?":"인물","Football":"축구","JO":"올림픽"};
const out="// Korean version of Culture générale, built by tools/build-culture-ko.js from tools/culture-ko/*. Do not edit by hand.\n(window.BANK_TR=window.BANK_TR||{})[\"culture.ko\"]={T:"+JSON.stringify(T)+",\nQ:[\n"+Q.map(x=>JSON.stringify(x)).join(",\n")+"\n],\nTQ:[\n"+TQ.map(x=>JSON.stringify(x)).join(",\n")+"\n]};\n";
fs.writeFileSync(path.join(__dirname,"../js/banks/tr/culture.ko.js"),out);
console.log("culture.ko.js:",Q.length,"Q,",TQ.length,"TQ,",(out.length/1024|0)+" KB");
