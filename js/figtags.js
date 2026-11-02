// ---------- Figures for the "Why?" card of the other built-in quizzes ----------
// Each rule looks at one question (text, explanation, right answer) and, when a diagram helps, returns the data of a figure (see js/figs.js for the kinds).
// The figures are drawn from the question's own numbers / the course's own terms, so they work offline and follow the dark theme.
(function(){
const F=window.TipokiFig;if(!F||!F.tag)return;
// some banks load on demand (see ensureBank in js/app/*.js): their rules wait here and are applied right after the bank file arrives
const RULES={},DONE={};
function reg(name,rules){RULES[name]=rules;F.tagLate(name)}
F.tagLate=name=>{const b=window[name],r=RULES[name];if(b&&r&&!DONE[name]){DONE[name]=1;F.tag(b,r)}};
const txt=q=>(q.q||"")+" "+(q.e||"");
const right=q=>String(q.o?q.o[q.a]:[].concat(q.a)[0]||"").toLowerCase();
const num=t=>parseFloat(String(t).replace(/[\s  ]/g,"").replace(",","."));
const fr=x=>{const r=Math.round(x*100)/100,[i,d]=String(r).split(".");return i.replace(/\B(?=(\d{3})+(?!\d))/g," ")+(d?","+d:"")};
const pick=(items,key,hay)=>{const i=items.findIndex(t=>hay.includes(t[key]||t));return i<0?undefined:i};

// ===================== Énergie (français) =====================
const U={W:1,kW:1e3,MW:1e6,J:1,kJ:1e3,MJ:1e6};
const N="(\\d[\\d  ,]*)",UN="(MW|kW|W|MJ|kJ|J)\\b";
function eff(q){
  if(q.s!==3||!/Exercice/.test(q.t||""))return;
  const t=q.q;let m,rec,use,u;
  if(m=t.match(new RegExp("reçoit (?:Pf = |Ereçue = )?"+N+" ?"+UN+" et fournit (?:Pu = |Eu = )?"+N+" ?"+UN))){u=m[2];rec=num(m[1]);use=num(m[3])*U[m[4]]/U[u]}
  else if(m=t.match(new RegExp("rendement (\\d+) % reçoit (?:Pf = )?"+N+" ?"+UN))){u=m[3];rec=num(m[2]);use=rec*m[1]/100}
  else if(m=t.match(new RegExp("rendement (\\d+) % fournit (?:Pu = )?"+N+" ?"+UN))){u=m[3];use=num(m[2]);rec=use/(m[1]/100)}
  else return;
  const en=/Ereçue|MJ|kJ|\bJ\b/.test(t)&&!/puissance|Pf|W\b/.test(t),r=use/rec;
  return {k:"flow",rec,use,u,l:[en?"Énergie reçue":"Puissance reçue (Pf)",en?"Énergie utile":"Puissance utile (Pu)",en?"Énergie dissipée":"Puissance dissipée"],
    f:"r = "+fr(use)+" / "+fr(rec)+" = "+fr(Math.round(r*10000)/100)+" %",
    cap:"Ce que l'alternateur reçoit se partage en énergie utile (électrique) et en pertes thermiques : r = utile / reçue, toujours inférieur à 1."};
}
function pvEff(q){
  if(q.s!==6||!/rendement/.test(q.q)||!/Pf = /.test(q.e))return;
  const pf=(q.e.match(/Pf = ([^;]*?) W/)||[])[1];if(!pf)return;
  const rec=num(pf.split("=").pop());let r=(q.q.match(/rendement (?:de )?(\d+) %/)||[])[1];
  r=r?r/100:(q.e.match(/(\d+) %\.?\s*$/)||q.e.match(/= (\d+) %/)||[])[1]/100;
  if(!rec||!r)return;
  return {k:"flow",rec,use:rec*r,u:"W",l:["Puissance lumineuse reçue (Pf)","Puissance électrique utile","Puissance perdue (chaleur)"],f:"r = "+fr(rec*r)+" / "+fr(rec)+" = "+fr(Math.round(r*10000)/100)+" %",
    cap:"Le panneau transforme en électricité une petite part de la lumière reçue ; le reste est perdu en chaleur."};
}
function alt(q){
  if(q.s!==2)return;const t=q.q;if(!/rotor|stator|turbine|aimant|enroulement|fluide|vapeur|convertit|chaîne|chaleur|pertes/i.test(t))return;
  let hl;if(/turbine|fluide|vapeur|éolienne|vent|fait tourner l'aimant/i.test(t))hl="turbine";
  else if(/stator/i.test(t)&&!/rotor/i.test(t))hl="stator";else if(/rotor/i.test(t)&&!/stator/i.test(t))hl="rotor";
  else if(/stator|rotor/i.test(t))hl=undefined;else if(/FIXE|fixe|statique/.test(t))hl="stator";else if(/MOBILE|mobile|aimant/.test(t))hl="rotor";else if(/convertit/i.test(t))hl="elec";
  return {k:"alt",hl,l:["Turbine","Stator (bobines)","Rotor (aimant)","Électricité","Pertes : chaleur"],cap:"Une turbine fait tourner le rotor (un aimant) dans le stator (des bobines fixes) : l'énergie mécanique devient électrique, avec des pertes thermiques."};
}
function freq(q){
  if(q.s!==3||!/rotor/i.test(q.q)||!/aimant/.test(q.q))return;
  const t=q.q,n=(t.match(/N = (\d+)/)||t.match(/de (\d+) aimants?/)||t.match(/(\d+) aimants? tourne/)||[])[1];if(!n)return;
  let w,m;if(m=t.match(/(\d[\d,]*) tr\/min/))w=num(m[1])/60;else if(m=t.match(/(\d[\d,]*) tr\/s/))w=num(m[1]);
  const f0=(t.match(/(\d+) Hz/)||[])[1];if(w==null&&f0)w=f0/n;if(w==null)return;
  return {k:"freq",N:+n,lines:["N = "+n+(n>1?" aimants":" aimant"),"ω = "+fr(w)+" tr/s","f = N × ω = "+fr(n*w)+" Hz"],cap:"La fréquence du courant est proportionnelle au nombre d'aimants et à la vitesse de rotation (en tours par seconde)."};
}
function pv(q){
  if(q.s!==6)return;const t=q.q,u=(t.match(/Umax = ([\d,]+) V/)||[])[1],i=(t.match(/Imax = ([\d,]+) A/)||[])[1];if(!u||!i)return;
  return {k:"pv",U:num(u),I:num(i),Ul:"Umax = "+u+" V",Il:"Imax = "+i+" A",P:"Pmax = "+fr(num(u)*num(i))+" W",cap:"Au point de puissance maximale, la puissance est l'aire du rectangle U × I ; la résistance optimale est Rmax = Umax / Imax."};
}
function gap(q){
  if(q.s!==5)return;const t=q.q+" "+right(q);
  if(!/isolant|conducteur|gap|bande interdite|Eg\b|photon|trou/i.test(q.q)||/coût|cher|abondant|élémentaire|métaux|dop|germanium|longueur|nm\b|bon conducteur|cuivre|rouge|conductivité|éclaire|chauffe|température/i.test(q.q))return;
  const ph=/photon/i.test(q.q),semi=/semi|silicium|Eg\b|photon|trou|gap/i.test(q.q),iso=/isolant/i.test(q.q),cond=/(^|[^-])conducteur/i.test(q.q.replace(/semi-conducteur/gi,""));
  const hl=(semi+iso+cond)===1?(iso?"iso":cond?"cond":"semi"):(/gap|Eg\b/.test(q.q)&&!iso&&!cond?"semi":undefined);
  return {k:"gap",hl,ph,l:["Conducteur","Semi-conducteur","Isolant","Conduction","Valence"],ov:"se chevauchent",cap:"Plus la bande interdite (gap) est large, moins le matériau conduit : conducteur (aucune), semi-conducteur (≈ 1 eV, 1,12 eV pour le silicium), isolant (≈ 6 eV). Un photon d'énergie ≥ Eg fait passer un électron dans la bande de conduction."};
}
function ind(q){
  if(q.s!==1||!/aimant/.test(q.q)||!/bobine/.test(q.q))return;
  return {k:"ind",alt:/va-et-vient|alternatif/.test(txt(q)),l:["N","S","Mouvement","Bobine","Courant induit"],cap:"Un aimant en mouvement par rapport à une bobine met les électrons libres en mouvement : c'est l'induction (Faraday, 1831). Le sens du courant dépend du pôle et du sens du mouvement."};
}
reg("BANK_ENERGIE",[eff,pvEff,freq,pv,alt,gap,ind]);

// ===================== Culture générale (français) =====================
function dates(q){
  if(q.s!==2||!/^En quelle année a eu lieu /.test(q.q))return;
  const y=+(q.e.match(/(\d{3,4})\.$/)||[])[1];if(!y)return;
  return {k:"tl",y,t:q.q.replace(/^En quelle année a eu lieu /,"").replace(/ \?$/,""),cap:"Repère sur la frise du temps : "+y+"."};
}
function elem(q){
  if(q.s!==3||!/numéro atomique/.test(q.e||""))return;
  const m=q.e.match(/^(.+?) : symbole (\w+), numéro atomique (\d+)\./);if(!m)return;
  return {k:"elem",n:m[1],sym:m[2],z:+m[3],cap:m[1]+" : symbole "+m[2]+", numéro atomique "+m[3]+" (nombre de protons)."};
}
function sol(q){
  if(q.s!==3||!/plan[èe]te|système solaire/i.test(q.q))return;
  const hl=right(q).match(/mercure|vénus|mars|jupiter|saturne|uranus|neptune|la terre/i);
  const name={"la terre":"Terre"},h=hl&&(name[hl[0]]||hl[0][0].toUpperCase()+hl[0].slice(1));
  return {k:"sol",hl:/Combien/.test(q.q)?undefined:h,cap:"Les huit planètes, de la plus proche du Soleil à la plus lointaine : Mercure, Vénus, la Terre, Mars, Jupiter, Saturne, Uranus, Neptune."};
}
reg("BANK_CULTURE",[dates,elem,sol]);

// ===================== Socio (English) =====================
const BOURD=[{t:"Economic",s:"money, property"},{t:"Cultural",s:"education, tastes, diplomas"},{t:"Social",s:"networks, relationships"},{t:"Symbolic",s:"prestige, recognition"}];
function bourdieu(q){
  const t=txt(q);if(!/Bourdieu/.test(t)||!/capital/i.test(q.q)||/habitus|symbolic violence|Distinction/.test(q.q))return;
  if(/diploma|embodied|objectified|institutionali[sz]ed/i.test(q.q+right(q))){
    return {k:"set",items:[{t:"Embodied",s:"how you speak, think, behave"},{t:"Objectified",s:"books, instruments, art"},{t:"Institutionalised",s:"diplomas, credentials"}],hl:/diploma|institutionali/i.test(q.q)?2:undefined,cap:"Cultural capital takes three forms: embodied, objectified and institutionalised."};
  }
  let hl;if(/Networks|relationships|social capital/i.test(q.q))hl=2;else if(/Prestige|recognition|symbolic capital/i.test(q.q))hl=3;else if(/money|property|economic capital/i.test(q.q))hl=0;else if(/education|tastes|credentials|books|cultural capital/i.test(q.q))hl=1;
  return {k:"set",items:BOURD,hl:/NOT/.test(q.q)?undefined:hl,cap:"Bourdieu's four forms of capital: economic, cultural, social and symbolic."};
}
const ACT=[{t:"Instrumental rationality",s:"best means to a goal"},{t:"Value rationality",s:"acting on principles"},{t:"Affectual action",s:"driven by emotions"},{t:"Traditional action",s:"habit and custom"}];
function weberAction(q){
  if(!/Weber|type of (social )?action/i.test(q.q)||/stratification|dimension/i.test(q.q))return;
  const a=right(q);if(!/action|rationality|instrumental|value|affectual|traditional/i.test(q.q+a))return;
  const hl=/NOT/.test(q.q)?-1:ACT.findIndex(o=>a.includes(o.t.toLowerCase().split(" ")[0]));
  return {k:"set",items:ACT,hl:hl<0?undefined:hl,cap:"Weber's four types of social action."};
}
function weberStrat(q){
  if(!/Weber/.test(q.q)||!/stratification|class, status|power/i.test(q.q+right(q)))return;
  return {k:"set",items:[{t:"Class",s:"economic position"},{t:"Status",s:"prestige, honour"},{t:"Power",s:"ability to impose one's will"}],cap:"For Weber, stratification is multidimensional: class, status and power."};
}
function mead(q){
  if(!/Mead/.test(txt(q))&&!/(play|game|preparatory) stage/i.test(q.q))return;
  if(!/stage|preparatory|play|game/i.test(q.q))return;
  const a=right(q),w=[/prepar/.test(a),/play/.test(a),/game/.test(a)],c=w.filter(Boolean).length;
  let hl=c===1?w.indexOf(true):undefined;
  if(c===0&&!/NOT|order/.test(q.q)){if(/plays? at being|play stage/i.test(q.q))hl=1;else if(/team|game stage/i.test(q.q))hl=2}
  return {k:"steps",items:["Preparatory: imitation","Play: significant others","Game: the generalised other"],hl,cap:"Mead's stages of self-development: preparatory, play, game."};
}
function looking(q){
  if(!/looking-glass/i.test(txt(q)))return;
  return {k:"steps",items:["I imagine how others see me","I imagine their judgement","I feel pride or shame and adapt my self-image"],cap:"Cooley's looking-glass self: our self-image is built from how we think others see us."};
}
function merton(q){
  if(!/Merton/.test(txt(q))||!/manifest|latent|unintended|unrecognised|unnoticed/i.test(q.q+right(q))||/functionalis/i.test(right(q)))return;
  return {k:"vs",l:{t:"Manifest function",p:["Intended","Recognised by participants"]},r:{t:"Latent function",p:["Unintended","Unrecognised by participants"]},cap:"Merton: manifest functions are intended and recognised, latent functions are not."};
}
function levels(q){
  if(!/\b(micro|meso|macro)\b/i.test(q.q+right(q))||/paradigm/i.test(q.q))return;
  const a=right(q)+" "+q.q.toLowerCase(),hl=/meso/.test(right(q))?1:/macro/.test(right(q))?0:/micro/.test(right(q))?2:undefined;
  return {k:"nest",items:["Macro: large-scale structures","Meso: groups, communities","Micro: individuals"],hl,cap:"Levels of analysis, from large-scale structures down to individual interactions."};
}
function bronf(q){
  if(!/Bronfenbrenner/.test(q.q))return;
  return {k:"nest",items:["Macrosystem: culture, laws","Exosystem: parents' work","Mesosystem: links","Microsystem: family"],cap:"Bronfenbrenner: development is shaped by nested environmental systems."};
}
function culture6(q){
  if(!/six components of culture/i.test(q.q))return;
  return {k:"set",items:[{t:"Material culture",s:"objects, technology"},{t:"Symbols",s:"gestures, flags"},{t:"Language",s:"shared communication"},{t:"Values",s:"what is good"},{t:"Beliefs",s:"what is true"},{t:"Norms",s:"rules of behaviour"}],cap:"The six components of culture."};
}
function durk(q){
  if(!/Durkheim/.test(q.q)||!/cohesion/i.test(q.q)||!/integration/i.test(right(q)))return;
  return {k:"venn",a:"Integration",b:"Regulation",m:"Social cohesion",cap:"For Durkheim, social cohesion results from integration plus regulation."};
}
function caste(q){
  if(q.s!==4||!/caste/i.test(q.q))return;
  return {k:"vs",l:{t:"Caste system",p:["Status ascribed at birth","Closed: no social mobility"]},r:{t:"Class system",p:["Status partly achieved","Open: mobility is possible"]},cap:"Caste systems are closed; class systems allow some mobility."};
}
reg("BANK_SOCIO",[bourdieu,weberStrat,weberAction,mead,looking,merton,levels,bronf,culture6,durk,caste]);

// ===================== Populism (English) =====================
function pvenn(q){
  if(q.s!==1||!/elit|pluralis/i.test(txt(q))||!/populis/i.test(q.q+q.e)||/Lefort|Rosenblum|Nietzsche|pars pro toto|holism|extracted/i.test(q.q))return;
  if(!/necessary|sufficient|critici[sz]|antipluralis|antielitis|core claim/i.test(q.q))return;
  return {k:"venn",a:"Anti-elitism",b:"Anti-pluralism",m:"Populism",cap:"Müller: criticising elites is necessary but not sufficient. Populists also claim that they, and only they, represent the people."};
}
function ppars(q){
  if(q.s>3||!/pars pro toto|extracted|real people|proper (people|members)|whole people|holism|only they|only we|other half/i.test(q.q)||/^(Who|Which politician)|criterion|conceive|ultimately/i.test(q.q))return;
  return {k:"pars",l:["All citizens","“The real people”"],t:"A part of the people claims to be the whole people",cap:"Pars pro toto: populists present a part of the citizens as “the people” and deny the others a place in it."};
}
function polar(q){
  if(q.s<4||!/polari[sz]|partisan cue|deliberati(on|ve) incorporates|mutual justification/i.test(q.q))return;
  return {k:"vs",l:{t:"Polarised, uncivil",p:["Citizens follow partisan cues","…or drop out"]},r:{t:"Deliberation",p:["Mutual justification","Listening and respect","Openness to persuasion"]},cap:"Dryzek et al.: deliberation offers an alternative to polarisation."};
}
function minip(q){
  if(q.s<5||!/have in common|mini-public|citizens' jur|citizen panels/i.test(q.q))return;
  return {k:"set",items:["Citizens' juries","Citizens' panels","Deliberative polls","Consensus conferences","Citizens' assemblies",{t:"In common",s:"diverse, facilitated"}],hl:/in common/i.test(q.q)?5:undefined,cap:"Mini-publics: different formats that share diverse participants, facilitated dialogue and civility norms."};
}
reg("BANK_POPULISM",[pvenn,ppars,polar,minip]);
})();
