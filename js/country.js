// ---------- country (optional): a flag next to the player's name, so 50 "Charles" can be told apart ----------
// Stored on the device in tpk-country (synced with the online save like every tpk- key): "FR", or "" when the player chose no flag.
// While nothing is stored the browser language is used as a starting guess (fr-FR -> FR); it is never saved until the player picks.
(function(){
// Phones and Macs draw flag emoji themselves; Windows shows two letters instead. Only there is the flag font downloaded (77 KB).
// Test: a colour emoji keeps its own colours whatever the fill colour, and is narrower than two letters (same idea as country-flag-emoji-polyfill).
function flagsNative(){try{const x=document.createElement("canvas").getContext("2d",{willReadFrequently:true}),W=20,H=25;
  x.canvas.width=W*2;x.canvas.height=H;x.font="12px Arial, sans-serif";x.textBaseline="top";
  x.fillStyle="#FF0000";x.fillText("\u{1F1E8}\u{1F1ED}",0,22);x.fillStyle="#0000FF";x.fillText("\u{1F1E8}\u{1F1ED}",W,22);
  const a=x.getImageData(0,0,W,H).data;let i=0;while(i<a.length&&!a[i+3])i+=4;if(i>=a.length)return false;
  const b=x.getImageData(W+(i/4)%W,Math.floor(i/4/W),1,1).data;
  return a[i]===b[0]&&a[i+2]===b[2]&&x.measureText("\u{1F1E8}\u{1F1ED}").width<W}catch(e){return false}}
try{if(!flagsNative()&&window.FontFace&&document.fonts)document.fonts.add(new FontFace("Twemoji Country Flags",'url("css/TwemojiCountryFlags.woff2") format("woff2")',{unicodeRange:"U+1F1E6-1F1FF, U+1F3F4, U+E0062-E007F",display:"swap"}))}catch(e){}
const CC=("AD AE AF AG AI AL AM AO AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GT GU GW GY HK HN HR HT HU ID IE IL IM IN IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SI SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW").split(" ");
const KEY="tpk-country";
const ok=c=>typeof c==="string"&&CC.indexOf(c)>=0;
const flag=c=>ok(c)?String.fromCodePoint(0x1F1E6+c.charCodeAt(0)-65,0x1F1E6+c.charCodeAt(1)-65):"";
let dn=null;
function name(c){try{dn=dn||new Intl.DisplayNames([window.LANG||"en"],{type:"region"});return dn.of(c)||c}catch(e){return c}}
function stored(){try{return localStorage.getItem(KEY)}catch(e){return null}}
function guess(){const ls=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||""];
  for(const l of ls){const m=/-([A-Za-z]{2})(?:$|[-_])/.exec(l||"");if(m&&ok(m[1].toUpperCase()))return m[1].toUpperCase()}return ""}
// the player's country code, or "" for none
function mine(){const v=stored();return v===null?guess():(ok(v)?v:"")}
function set(c){try{localStorage.setItem(KEY,ok(c)?c:"")}catch(e){}}
const label=c=>flag(c)+" "+name(c);
// names are looked up once and compared with one collator (localeCompare with a locale builds a new one at every call: slow on phones)
function sorted(){const loc=window.LANG||"en",nm={};CC.forEach(c=>nm[c]=name(c));let col;try{col=new Intl.Collator(loc).compare}catch(e){col=(a,b)=>a<b?-1:a>b?1:0}
  return CC.slice().sort((a,b)=>col(nm[a],nm[b]))}
// the picker in the profile card
function paint(){const s=document.getElementById("country");if(!s)return;
  if(!s.options.length){const o0=document.createElement("option");o0.value="";o0.textContent=window.tl?tl("No flag"):"No flag";s.appendChild(o0);
    sorted().forEach(c=>{const o=document.createElement("option");o.value=c;o.textContent=label(c);s.appendChild(o)})}
  s.value=mine()}
function init(){const s=document.getElementById("country");if(!s)return;paint();
  s.addEventListener("change",()=>{set(s.value);if(window.renderMe)renderMe()})}
// a small flag element for rows built with el()
function flagEl(c){const f=flag(c);if(!f)return null;const e=document.createElement("span");e.className="flag";e.textContent=f;e.title=name(c);e.setAttribute("role","img");e.setAttribute("aria-label",name(c));return e}
window.tpkCountry={codes:CC,ok,flag,name,mine,set,paint,flagEl,guess};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
