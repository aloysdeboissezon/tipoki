// ---------- nickname filter: no insults, slurs, links or contact details in the name shown to friends and on the league board ----------
// tpkNick.check(name) -> "" when the name is fine, otherwise "bad" (offensive) or "link" (URL, e-mail, phone number).
// tpkNick.show(name)  -> the name to display for somebody else ("Player" when it would not pass), tpkNick.ok(name) -> boolean.
// The same lists build the server check (supabase/migrations/add_nick_filter.sql, written by `node tools/gen-nick-sql.js`),
// so a name that skips this page is still refused by the database. Edit the lists below, then regenerate the SQL.
//
// How a name is matched (the "Scunthorpe problem": "Scunthorpe" or "Monique" must stay fine):
//  - lower-case, accents removed, look-alikes undone (0->o 1->i 3->e 4->a 5->s 7->t @->a $->s !->i, Cyrillic a/e/o/c/p/x), so "sh!t", "f.u.c.k", "FUUUCK" are caught;
//  - TOKEN words are only refused as a whole word (the name is split on spaces and punctuation), so "ass" does not hit "Assunta";
//  - SUB words are long and unambiguous: refused anywhere inside a word ("xxfuckxx");
//  - letters spread apart ("f u c k", "f.u.c.k") are glued back together before matching;
//  - Korean terms are matched anywhere in the name once spaces are removed.
(function(){
// whole-word terms (Latin script): English, French, Spanish, Catalan
const TOKEN=("ass arse asshat cock cocks cunt cum twat prick pussy whore slut fag faggot tranny shemale chink gook spic coon paki wetback nazi nazis kkk "+
 "rape raped rapist porn pedo kys wank wanker dildo penis vagina anus tits titty boobs jizz "+
 "conne connard connasse pute putes putain salope salaud encule enculee nique niquer ntm fdp batard petasse chatte zob couille couilles foutre tapette gouine "+
 "puta puto putas putos joder cono polla verga zorra culo follar capullo boludo pajero carajo marica maricon cabron "+
 "merda collons").split(" ");
// anywhere-in-a-word terms: long enough that no real name or common word contains them
const SUB=("fuck fuk motherfuck shit bullshit bitch bastard asshole arsehole cocksucker blowjob handjob jerkoff dumbass dickhead retard nigger nigga niggas faggot hitler heilhitler pornhub pornos whorehouse wanker bollocks pussy "+
 "putain salope salaud connard connasse encule enculer merde niquetamere niktamer trouduc troudcul branleur branlette bougnoul youpin petasse couillon filsdepute "+
 "hijoputa hijodeputa mierda gilipollas gilipolla pendejo cabron chingada chingar chinga putamadre sudaca negrata mamahuevo "+
 "merda collonut").split(" ");
// Korean (matched anywhere once spaces are removed): swearing, slurs and the consonant-only shorthand
const KO="시발 씨발 씨바 씹 개새끼 개색 새끼 병신 븅신 좆 존나 지랄 느금마 니애미 보지 자지 창녀 걸레 미친놈 미친년 닥쳐 꺼져 한남충 김치녀 일베 짱깨 쪽바리 틀딱 ㅅㅂ ㅆㅂ ㅂㅅ ㅄ ㅈㄹ ㅈㄴ ㄲㅈ ㅁㅊ".split(" ");
// whole words that contain a SUB term but are fine
const ALLOW=["shiitake","shitake","shitzu","shihtzu"];
// a hard-coded version of what a name means; the SQL generator reuses it, so keep it a plain function
const LEET={"0":"o","1":"i","3":"e","4":"a","5":"s","7":"t","@":"a","$":"s","!":"i","+":"t","|":"i","€":"e","£":"e","ß":"ss","ø":"o","æ":"ae","œ":"oe","а":"a","е":"e","о":"o","с":"c","р":"p","х":"x","і":"i"};
const WORD="a-z0-9ㄱ-ㆎ가-힣";
// "ass" -> a+s{2,} : a letter written once may be stretched, a letter written twice stays at least twice ("as" is not "ass")
function stretch(w){return w.replace(/(.)\1*/g,(m,c)=>c+(m.length>1?"{"+m.length+",}":"+"))}
const T_RE=new RegExp("^(?:"+TOKEN.filter(w=>!/[ㄱ-힣]/.test(w)).map(stretch).join("|")+")(?:s|es)?$");
const S_RE=new RegExp(SUB.map(stretch).join("|"));
const K_RE=new RegExp(KO.join("|"));
function clean(s){return String(s==null?"":s).replace(/[\u200b-\u200f\u2028-\u202f\u2060\ufeff]/g,"").replace(/\s+/g," ").trim()}
function fold(s){
  s=clean(s).toLowerCase();
  try{s=s.normalize("NFD").replace(/[̀-ͯ]/g,"").normalize("NFC")}catch(e){}
  return s.replace(/[0134577@$!+|€£ßøæœасрхі]/g,c=>LEET[c]||c)}
function parts(name){
  const v=fold(name),toks=v.split(new RegExp("[^"+WORD+"]+")).filter(Boolean),out=[];
  toks.forEach(t=>{const a=ALLOW.reduce((x,w)=>x.split(w).join(" "),t);out.push(...a.split(" ").filter(Boolean))});
  // single letters spread apart ("f u c k", "f.u.c.k") are glued into one word
  let run="";toks.forEach(t=>{if(t.length===1)run+=t;else{if(run.length>1)out.push(run);run=""}});if(run.length>1)out.push(run);
  return {tokens:out,flat:v.replace(new RegExp("[^"+WORD+"]+","g"),"")}}
function check(name){
  const raw=clean(name).toLowerCase();
  if(!raw)return "";
  if(/https?:|www\.|[a-z0-9]@[a-z0-9]|\.(com|net|org|fr|es|io|eu|co|me|ly|gg|tv|xyz|app|link|ru|cn)([^a-z]|$)/.test(raw)||/[0-9]([ .-]?[0-9]){6,}/.test(raw))return "link";
  const p=parts(name);
  if(K_RE.test(p.flat))return "bad";
  for(const t of p.tokens){if(T_RE.test(t)||S_RE.test(t))return "bad"}
  return ""}
const ok=n=>!check(n);
function show(n){n=clean(n);return n&&ok(n)?n:(typeof tl==="function"?tl("Player"):"Player")}
// the message under the field
const msg=c=>c==="link"?tl("Names can't contain links, e-mails or phone numbers."):tl("That name isn't allowed. Please pick a friendlier one.");
const api={check,ok,show,msg,clean,TOKEN,SUB,KO,ALLOW,stretch,fold};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
if(typeof window!=="undefined")window.tpkNick=api;
})();
