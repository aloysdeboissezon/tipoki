// Built-in bank: Financial analysis, consolidation of financial statements (English, like the course slides).
// Sources: slides parts 1–4 (groups, full consolidation, goodwill & NCI, internal transactions, equity method),
// assignments 1–5 (Pescanova, P/S, Black/White, Planet/Sun) and Cases 1 & 2 (A/B/C, Push/Shove).
// Every exercise question carries its full statement (all the figures needed), so it can be answered on its own.
// Numeric answers are computed from the data below and were checked against the official solutions (see tools/check-compta2.js).
// Difficulty d: 1 = easy (definitions), 2 = medium (one calculation), 3 = hard (several steps / totals).
// Static and deterministic (no randomness), so every device builds the same Q/TQ arrays for multiplayer.
window.BANK_COMPTA2=(function(){
const SESS={1:"Groups & types of investment",2:"Goodwill & NCI at acquisition",3:"Consolidating after the acquisition",4:"Internal transactions",5:"Equity method (associates & JVs)",6:"Worked cases: A/B/C and Push/Shove"};
const TAGS={1:"Groups",2:"Goodwill & NCI",3:"Post-acquisition",4:"Intragroup",5:"Equity method",6:"Cases"};
const Q=[],TQ=[];

// ---------- helpers ----------
const f=n=>{const r=Math.round(Math.abs(n)*100)/100,[i,d]=String(r).split(".");return(n<0&&r?"−":"")+i.replace(/\B(?=(\d{3})+(?!\d))/g,",")+(d?"."+d:"")};   // 1458.33 → "1,458.33"
const pc=x=>f(Math.round(x*10000)/100)+"%";                                                                                                          // 0.75 → "75%"
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,n,d)=>{const x={s,q,a,e,d:d||2};if(n)x.n=n;TQ.push(x)};
// MCQ from a right text + candidate wrong texts (duplicates of the right one are dropped)
const mt=(s,t,q,ok,c,e,d)=>{const seen=new Set([ok]),w=[];for(const x of c)if(x&&!seen.has(x)){seen.add(x);w.push(x);if(w.length===3)break}Q.push({s,t,q,o:[ok,...w],a:0,e,d:d||2})};
// MCQ on a number: candidates are typical wrong results; padded with near values if needed
const nm=(s,t,q,ok,c,e,d)=>mt(s,t,q,f(ok),[...c,ok*2,ok/2,ok+10,ok-10,ok+1,ok-1].filter(x=>typeof x==="number"&&isFinite(x)).map(f),e,d);
// typed number (accepts 1300 / 1,300)
const vr=x=>{const r=Math.round(Math.abs(x)*100)/100;return[...new Set([String(r),f(r)])]};
const tn=(s,q,x,e,d)=>ty(s,q,vr(x),e,undefined,d||2);

// ---------- full consolidation exercises (goodwill, NCI, group reserves, totals), computed from the data ----------
function fc(o){
  const{s,nm:nme,stmt,p,price,eq0,eqN,same,agg,liab,peq,alt,eq0t,eqNt,shares}=o,PN=o.pn||"P",SN=o.sn||"S";
  const R=t=>PN==="P"&&SN==="S"?t:t.replace(/\bS's/g,SN+"'s").replace(/\bP's/g,PN+"'s").replace(/\bS\b/g,SN).replace(/\bP\b/g,PN);   // exercises named Black/White, Planet/Sun
  const ask=a=>stmt+"\n\n"+R(a);
  const M=(s,t,q,ok,c,e,d)=>nm(s,t,q,ok,c,R(e),d),MT=(s,t,q,ok,c,e,d)=>mt(s,t,q,ok,c,R(e),d),TN=(s,q,x,e,d)=>tn(s,q,x,R(e),d),VF=(s,q,v,e,d)=>vf(s,q,v,R(e),d);
  const raw=price-p*eq0,gw=Math.max(raw,0),bp=Math.max(-raw,0),n0=(1-p)*eq0,nN=(1-p)*eqN,res=same?0:p*(eqN-eq0);
  const P=pc(p),N=pc(1-p),amt=Math.abs(raw),word=gw?"goodwill":"gain from a bargain purchase";
  const cls=r=>r>0?"Goodwill of "+f(r):r<0?"A gain from a bargain purchase of "+f(-r):"No goodwill and no gain";
  const share=`${P} × ${eq0t?"("+eq0t+") = ":""}${f(eq0)} = ${f(p*eq0)}`;
  if(shares)ty(s,ask("What percentage of S's shares does P own?"),[String(p*100),P],`${shares} = ${P}.`,undefined,1);
  M(s,nme,ask("What was S's total equity at the acquisition date (€ thousand)?"),eq0,[eqN,p*eq0,price],(eq0t?eq0t+" = ":"")+f(eq0)+" (all components: share capital and every reserve).",1);
  M(s,nme,ask("What is P's share of S's equity at the acquisition date (€ thousand)?"),p*eq0,[eq0,n0,price,p*eqN],"Group share = "+share+".",2);
  MT(s,nme,ask("Compare the price paid with P's share of S's equity at the acquisition date. What does the consolidation show (€ thousand)?"),cls(raw),
    [cls(-raw),cls(price-eq0),cls(price-n0),cls(price-p*eqN),"Goodwill of "+f(price),"No goodwill and no gain: the difference goes to NCI"],
    `${f(price)} − ${f(p*eq0)} = ${f(raw)}: ${raw>0?"the price is higher than the group share, so goodwill":"the price is lower than the group share, so a gain from a bargain purchase"}.`,2);
  TN(s,ask(`What is the ${word} (€ thousand)?`),amt,`${f(price)} − ${f(p*eq0)} = ${f(raw)}; the ${word} is ${f(amt)}.`,2);
  if(p<1){
    M(s,nme,ask("What is the NCI at the acquisition date (€ thousand)?"),n0,[p*eq0,(1-p)*price,nN,eq0],`NCI = ${N} × ${f(eq0)} = ${f(n0)}.`,2);
    if(!same){
      M(s,nme,ask("What is the NCI at the consolidation date (€ thousand)?"),nN,[n0,p*eqN,(1-p)*(eqN-eq0),eqN],`NCI = ${N} × current equity of S = ${N} × ${eqNt?"("+eqNt+") = ":""}${f(eqN)} = ${f(nN)}. It uses the equity at the consolidation date, not at acquisition.`,2);
      TN(s,ask("What is the NCI at the consolidation date (€ thousand)?"),nN,`${N} × ${f(eqN)} = ${f(nN)}.`,2);
    }else TN(s,ask("What is the NCI (€ thousand)?"),nN,`${N} × ${f(eqN)} = ${f(nN)}.`,2);
  }else VF(s,ask("Does the consolidation show any non-controlling interests (NCI)?"),false,"P owns 100%, so NCI = 0% × equity = 0.",1);
  if(!same){
    M(s,nme,ask("What are the consolidated (group) reserves arising from S (€ thousand)?"),res,[(1-p)*(eqN-eq0),p*eqN,eqN-eq0,-res],`${P} × (${f(eqN)} − ${f(eq0)}) = ${P} × ${f(eqN-eq0)} = ${f(res)}. Only the change since acquisition belongs to the group reserves.`,3);
    TN(s,ask("What are the consolidated reserves arising from S (€ thousand)? Give the amount, ignoring the sign."),Math.abs(res),`${P} × (${f(eqN)} − ${f(eq0)}) = ${f(res)}${res<0?" (negative group reserves)":""}.`,3);
  }
  if(agg!=null){
    const ta=agg-price+gw,att=peq+bp+res,te=att+nN;
    M(s,nme,ask("What are the consolidated total assets (€ thousand)?"),ta,[agg,agg-price,agg+gw,agg-price+bp],
      `P + S = ${f(agg)}; the investment of ${f(price)} is eliminated${gw?` and goodwill of ${f(gw)} is added`:" (no goodwill: a bargain purchase is a gain in equity, not an asset)"}: ${f(ta)}.`,3);
    TN(s,ask("What are the consolidated total assets (€ thousand)?"),ta,`${f(agg)} − ${f(price)}${gw?" + "+f(gw):""} = ${f(ta)}.`,3);
    M(s,nme,ask("What is the consolidated equity attributable to P's shareholders, i.e. excluding NCI (€ thousand)?"),att,[peq,peq+res,te,peq+nN],
      `P's own equity ${f(peq)}${bp?` + bargain purchase gain ${f(bp)}`:""}${res?` ${res<0?"−":"+"} group reserves ${f(Math.abs(res))}`:""} = ${f(att)}.`,3);
    M(s,nme,ask("What is the consolidated total equity, including NCI (€ thousand)?"),te,[att,peq+nN,peq+eqN,att+n0],`Equity of P's shareholders ${f(att)} + NCI ${f(nN)} = ${f(te)}.`,3);
    M(s,nme,ask("What are the consolidated total liabilities (€ thousand)?"),liab,[liab+nN,liab+gw,liab-price,liab+bp],"Liabilities of P and S are simply added (nothing to eliminate here): "+f(liab)+". Check: equity "+f(te)+" + liabilities "+f(liab)+" = total assets "+f(ta)+".",2);
  }
  if(alt!=null){
    const r2=alt-p*eq0;
    MT(s,nme,ask(`Suppose P had paid ${f(alt)} instead of ${f(price)} for the shares. What would the consolidation show at the acquisition date (€ thousand)?`),cls(r2),
      [cls(-r2),cls(alt-eq0),cls(alt-n0),"Goodwill of "+f(alt),"No goodwill and no gain"],`${f(alt)} − ${f(p*eq0)} = ${f(r2)}.`,3);
  }
}

// ---------- slide-style acquisition examples (no balance sheets): goodwill, NCI, group share ----------
function acq(o){
  const{s,nm:nme,p,price,comp,fv,lead}=o;
  const eq=comp.reduce((a,c)=>a+c[1],0)+(fv||0);
  const stmt=(lead||"Company A buys "+pc(p)+" of the shares of Company B")+` for €${f(price)}. At that date B's equity is: ${comp.map(c=>c[0]+" "+f(c[1])).join(", ")}${fv?`; in addition, one non-current asset of B is undervalued by ${f(fv)} (fair value above book value), which must be added to B's equity`:""}.`;
  const ask=a=>stmt+"\n\n"+a;
  const raw=price-p*eq,n0=(1-p)*eq,amt=Math.abs(raw);
  const cls=r=>r>0?"Goodwill of "+f(r):r<0?"A gain from a bargain purchase of "+f(-r):"No goodwill and no gain";
  const eqt=comp.map(c=>f(c[1])).join(" + ")+(fv?" + "+f(fv):"")+" = "+f(eq);
  mt(s,nme,ask("What does the Investment-Equity adjustment show?"),cls(raw),[cls(-raw),cls(price-eq),cls(price-n0),"Goodwill of "+f(price),"A gain from a bargain purchase of "+f(price),"No goodwill and no gain"],
    `Equity of B = ${eqt}. Group share = ${pc(p)} × ${f(eq)} = ${f(p*eq)}. ${f(price)} − ${f(p*eq)} = ${f(raw)}.`,2);
  tn(s,ask(`What is the ${raw>0?"goodwill":"gain from a bargain purchase"}?`),amt,`${f(price)} − ${pc(p)} × ${f(eq)} = ${f(raw)}.`,2);
  if(p<1){
    nm(s,nme,ask("What is the NCI at the acquisition date?"),n0,[p*eq,(1-p)*price,(1-p)*(eq-(fv||0)),price-p*eq],`NCI = ${pc(1-p)} × ${f(eq)} = ${f(n0)}.`,2);
    tn(s,ask("What is the NCI at the acquisition date?"),n0,`${pc(1-p)} × ${f(eq)} = ${f(n0)}.`,2);
  }
  nm(s,nme,ask("What is the total equity of B used in the calculation (including any fair value adjustment)?"),eq,[eq-(fv||0),p*eq,price,eq+(fv||0)],eqt+".",1);
}

// ---------- unrealised profit and internal transactions ----------
function inventory(o){
  const{s,nm:nme,price,profit,sold,cost,seller,buyer}=o;
  const se=seller||"A",bu=buyer||"B",left=1-sold,u=profit*left;
  const pr=cost!=null?`${se} sells to ${bu} inventories that cost ${se} €${f(cost)}, for €${f(price)}`:`${se} sells to ${bu} inventories for €${f(price)} with a profit of €${f(profit)}`;
  const where=sold===0?`All the goods are still in ${bu}'s stock at year end.`:sold===1?`All the goods were resold by ${bu} to third parties before year end.`:`${pc(sold)} of the goods were resold by ${bu} to third parties; ${pc(left)} are still in ${bu}'s stock at year end.`;
  const stmt=`${se} and ${bu} belong to the same group. ${pr}${cost!=null?` (profit €${f(profit)})`:""}. ${where}`;
  nm(s,nme,stmt+"\n\nWhat is the unrealised profit to eliminate (€)?",u,[profit,price*left,profit*sold,price-profit],`Profit ${f(profit)} × ${pc(left)} still in stock = ${f(u)}.`,2);
  tn(s,stmt+"\n\nHow much unrealised profit must be eliminated (€)?",u,`${f(profit)} × ${pc(left)} = ${f(u)}.`,2);
  if(left>0&&left<1)nm(s,nme,stmt+"\n\nBy how much are the consolidated inventories reduced (€)?",u,[profit,price*left,price-profit,profit*sold],`Inventories are reduced by the unrealised profit: ${f(u)}.`,2);
  if(left>0)nm(s,nme,stmt+"\n\nWhich intragroup sales and purchases are eliminated against each other (€)?",price,[profit,price*left,price-profit,u],`The whole intragroup sale of ${f(price)} is cancelled against the buyer's purchases/COGS, whatever the % resold.`,2);
}
function land(o){
  const{s,nm:nme,n,price,profit,resold,seller,buyer}=o;
  const se=seller||"B",bu=buyer||"A",rem=n-resold,u=rem*profit;
  const stmt=`${se} sells ${n} pieces of land to ${bu} (same group) at €${f(price)} each, with a profit of €${f(profit)} per piece.${resold?` ${bu} has resold ${resold} of them to third parties.`:` All the pieces are still held by ${bu}.`}`;
  nm(s,nme,stmt+"\n\nWhat is the unrealised profit (€)?",u,[n*profit,rem*price,resold*profit,n*price],`${rem} piece(s) remain in the group × ${f(profit)} = ${f(u)}.`,2);
  tn(s,stmt+"\n\nWhat unrealised profit must be eliminated from the land and from "+se+"'s net income (€)?",u,`${rem} × ${f(profit)} = ${f(u)}.`,2);
}
function machine(o){
  const{s,nm:nme,price,profit,life,yrs,seller,buyer}=o;
  const se=seller||"B",bu=buyer||"A",ex=profit/life,net=profit-ex*yrs;
  const stmt=`On 1 January X1, ${se} sells a machine to ${bu} (same group) for €${f(price)}, making a profit of €${f(profit)}. The remaining useful life of the machine is ${life} years (straight line). Consolidate at 31 December X${yrs}.`;
  nm(s,nme,stmt+"\n\nWhat is the yearly excess depreciation recorded by "+bu+" (€)?",ex,[profit,profit/(life+1),price/life,ex*2],`Overstated cost ${f(profit)} / ${life} years = ${f(ex)} a year.`,2);
  nm(s,nme,stmt+"\n\nBy how much is the group's net income (that of "+se+") reduced at the consolidation date (€)?",net,[profit,ex*yrs,profit+ex*yrs,price],
    yrs===1?`Unrealised profit ${f(profit)} − excess depreciation ${f(ex)} = ${f(net)}.`:`Unrealised profit ${f(profit)} − excess depreciation ${f(ex)} × ${yrs} years = ${f(net)} (cumulative).`,3);
  tn(s,stmt+"\n\nWhat is the net adjustment to net income at the consolidation date (€)?",net,`${f(profit)} − ${f(ex)}${yrs>1?" × "+yrs:""} = ${f(net)}.`,3);
}
function loanInt(o){
  const{s,nm:nme,pr,rate,mo}=o;
  const i=pr*rate*mo/12;
  const stmt=`A (the parent) lent €${f(pr)} to its subsidiary B at ${pc(rate)} a year. At the consolidation date, ${mo} month${mo>1?"s":""} of interest are accounted for.`;
  nm(s,nme,stmt+"\n\nWhat interest amount is eliminated between A's interest revenue and B's interest expense (€)?",i,[pr*rate,pr*rate*mo,i*2,pr*rate/12],`${f(pr)} × ${pc(rate)} × ${mo}/12 = ${f(i)}.`,2);
  tn(s,stmt+"\n\nHow much interest is eliminated (€)?",i,`${f(pr)} × ${pc(rate)} × ${mo}/12 = ${f(i)}.`,2);
}
// who sold? an unrealised profit made by a (partly owned) subsidiary also reduces NCI
function upstream(o){
  const{s,nm:nme,p,u}=o,k=1-p;
  const stmt=`P owns ${pc(p)} of S (full consolidation). During the year S sold goods to P with a profit of €${f(u)}, all still in P's inventory at year end.`;
  nm(s,nme,stmt+"\n\nBy how much does this reduce the NCI at the consolidation date (€)?",u*k,[u,u*p,0,u*k*2],`The profit belongs to S, so S's equity falls by ${f(u)}; NCI = ${pc(k)} of it = ${f(u*k)}.`,3);
  nm(s,nme,stmt+"\n\nBy how much does it reduce the consolidated reserves arising from S (€)?",u*p,[u,u*k,0,u*p*2],`The group bears ${pc(p)} of the fall in S's equity: ${f(u*p)}.`,3);
  const stmt2=`P owns ${pc(p)} of S (full consolidation). During the year P sold goods to S with a profit of €${f(u)}, all still in S's inventory at year end.`;
  nm(s,nme,stmt2+"\n\nBy how much does this reduce the NCI at the consolidation date (€)?",0,[u*k,u,u*p,u*k*2],"The profit belongs to P, so it is taken out of P's retained earnings. S's equity is unchanged: NCI is not affected.",3);
}

// ---------- equity method ----------
function eqm(o){
  const{s,nm:nme,p,price,eq0,eqN,lead,eq0t,imp}=o;
  const stmt=(lead||"P buys "+pc(p)+" of the shares of A")+` for €${f(price)}. At that date A's equity is €${f(eq0)}${eq0t?" ("+eq0t+")":""}. At the consolidation date A's equity is €${f(eqN)}.`;
  const g=price-p*eq0,sh=p*(eqN-eq0),cv=price+sh,fin=imp!=null?cv-imp:cv;
  const ask=a=>stmt+(imp!=null?` The investment has been impaired by €${f(imp)}.`:"")+"\n\n"+a;
  nm(s,nme,ask("What is the goodwill of the associate (€)? (It is not shown separately in the consolidated balance sheet.)"),g,[price-eq0,p*eq0,price,sh],`${f(price)} − ${pc(p)} × ${f(eq0)} = ${f(g)}.`,2);
  nm(s,nme,ask("What is the group's share of the post-acquisition change in A's equity (€)?"),sh,[eqN-eq0,p*eqN,p*eq0,(1-p)*(eqN-eq0)],`${pc(p)} × (${f(eqN)} − ${f(eq0)}) = ${f(sh)}.`,2);
  nm(s,nme,ask("What is the carrying amount of the investment in A in the consolidated balance sheet (€)?"),fin,[price,p*eqN,price+(eqN-eq0),imp!=null?cv:price-sh],
    `${f(price)} (cost, goodwill included) ${sh<0?"−":"+"} ${f(Math.abs(sh))} (share of change in equity)${imp!=null?" − "+f(imp)+" (impairment)":""} = ${f(fin)}.`,3);
  tn(s,ask("What is the value of the equity investment in A in the consolidated balance sheet (€)?"),fin,`${f(price)} ${sh<0?"−":"+"} ${f(Math.abs(sh))}${imp!=null?" − "+f(imp):""} = ${f(fin)}.`,3);
  tn(s,ask("What amount is credited to the group's reserves for the associate (€)? Ignore the sign."),Math.abs(sh),`${pc(p)} × (${f(eqN)} − ${f(eq0)}) = ${f(sh)}.`,2);
}

// ---------- classification drills ----------
const CAT={S:["Subsidiary","full consolidation"],A:["Associate","equity method"],J:["Joint venture","equity method"],T:["Simple investment","no consolidation"]};
const LBL=c=>CAT[c][0]+" · "+CAT[c][1];
function classify(s,t,q,c,e,d){mt(s,t,q+" How is it classified and consolidated?",LBL(c),["S","A","J","T"].filter(x=>x!==c).map(LBL),e,d||2)}

// ===================== 1. Groups & types of investment =====================
m(1,"Group","How does IFRS define a “group”?","A parent and all its subsidiaries",["Any two companies that trade with each other","A company and all the entities in which it holds a stake","All companies sharing the same auditor"],"IFRS: a group is “a parent and all its subsidiaries”.");
m(1,"Group","When must consolidated financial statements (CFS) be prepared under IFRS?","When a parent company owns one or more subsidiaries",["Whenever a company owns shares in another company","Only when the parent holds 100% of its subsidiary","Only when the group is listed on a stock exchange"],"A group exists as soon as a parent owns at least one subsidiary, and CFS are then required (subject to exemptions).");
m(1,"Group","What do consolidated financial statements show?","The financial and economic position of the group as if it were a single entity",["The sum of the separate statements without any elimination","Only the financial position of the parent","Only the assets of the subsidiaries"],"CFS present the group AS IF it were one entity, which also avoids accounting manipulation.");
m(1,"Group","What are the financial statements of a single company called, as opposed to those of a group?","Separate financial statements",["Parent-only consolidated statements","Subgroup statements","Aggregated statements"],"Statements of one single company are “separate financial statements”; those of a group are “consolidated”.");
m(1,"Group","Why are the statements of a parent alone not enough for users such as banks and investors?","They do not give a complete account of the economic activities and position the parent controls through its subsidiaries",["They are always wrong","They are not audited","They ignore the parent's own assets"],"That is the economic need for CFS, beyond the legal requirement. It also avoids accounting manipulation.");
m(1,"Exemption","Which of these is an IFRS exemption from preparing CFS?","The parent is itself a wholly-owned subsidiary (subgroup exemption)",["The parent has more than ten subsidiaries","The subsidiaries are located abroad","The parent is profitable"],"Exemptions: the parent is itself a wholly-owned subsidiary, or its debt/equity instruments are not traded in a public market.");
m(1,"Exemption","Which other situation is an exemption from preparing CFS under IFRS?","The parent's debt or equity instruments are not traded in a public market",["The parent owns only one subsidiary","The subsidiary makes a loss","The parent is a very small company with no employees"],"The two IFRS exemptions: wholly-owned subsidiary parent, and instruments not publicly traded (local rules can add others).");
m(1,"Exemption","M owns 100% of A, and A owns 100% of B. Because A is itself a wholly-owned subsidiary, A does not consolidate A–B. Who is then the parent of the group that consolidates?","M is the parent, and A and B are its subsidiaries",["A is the parent and M is a subsidiary","B is the parent","Nobody consolidates"],"With the subgroup exemption, M consolidates A and B in one group (M is the parent).",2);
m(1,"Subsidiary","Control of an entity is presumed to exist when the investor owns…","More than 50% of the voting power",["At least 20% of the voting power","Exactly 50% of the shares","More than 10% of the share capital"],"IFRS 10: control is presumed above 50% of the voting rights.");
m(1,"Subsidiary","A holds 45% of the votes of B and has an agreement with another investor who holds 8%. What is B for A?","A subsidiary, because A controls more than 50% of the votes by agreement",["An associate, because 45% is below 50%","A joint venture","A simple investment"],"45% + 8% = 53% of the voting rights under an agreement, so control exists.",2);
m(1,"Subsidiary","Which of these can give control even without owning more than 50% of the votes?","The power to appoint or remove the majority of the board",["Having a good commercial relationship with the investee","Buying inventories from the investee","Sitting on the board with a single seat"],"Control can come from agreements, statutes or power over the board, not only from the percentage.");
m(1,"Subsidiary","Which method applies to a subsidiary?","Full consolidation",["Equity method","No consolidation","Proportional method"],"Subsidiaries are accounted for using full consolidation.");
m(1,"Subsidiary","In full consolidation, which part of the subsidiary's balance sheet, income statement and cash flows is added to the parent's?","100% of it",["Only the percentage owned by the parent","Only its equity","Only its assets"],"The parent controls the subsidiary, so it adds it fully; the share of outsiders appears as NCI.");
m(1,"Subsidiary","Can an entity in which the parent owns more than 50% fail to be a subsidiary?","Yes, if control cannot be exercised (for legal or political reasons)",["No, more than 50% always means control","Yes, if it makes a loss","Yes, if it is located abroad"],"Control, not only the percentage, decides. See Pescamar in the Pescanova assignment.",2);
m(1,"Associate","Which method applies to an associate?","Equity method",["Full consolidation","No consolidation","Cost method with annual write-off"],"Associates (significant influence, usually 20% to 50%) use the equity method.");
m(1,"Associate","Significant influence is…","The power to participate in the financial and operating policy decisions without controlling them",["The power to decide alone on all policies","The right to receive all the dividends","The ownership of at least 60% of the votes"],"It is the power to participate in policy decisions, but it is NOT control or joint control.");
m(1,"Associate","Which is the strongest evidence of significant influence?","Representation on the board of directors of the investee",["A single material supplier contract","A friendly relationship between the CEOs","Holding 15% of the shares"],"Board representation is the strongest evidence, ahead of policy-making participation, material transactions, managerial interchange and technical information.");
m(1,"Associate","Which of these is NOT listed as evidence of significant influence?","The investor receives a loyalty discount from the investee",["Participation in decisions about dividends","Interchange of managerial personnel","Provision of essential technical information"],"Evidence: board representation, policy-making participation, material transactions, managerial interchange, essential technical information.",2);
m(1,"Associate","What range of voting power usually gives rise to an associate?","20% to 50%",["Below 20%","50% to 100%","Exactly 50% only"],"Between 20% and 50% usually means significant influence, unless this can be rebutted.");
m(1,"Joint venture","What defines a joint venture?","Joint control: strategic decisions require the unanimous consent of the parties",["Ownership of more than 50% by one party","Ownership of less than 20% by each party","A temporary loan between two companies"],"Joint control is the contractually agreed sharing of control; unanimous consent is needed for the key decisions.");
m(1,"Joint venture","Which method is used for a joint venture?","Equity method",["Full consolidation","No consolidation","Fair value through profit"],"Joint ventures, like associates, are accounted for with the equity method.");
m(1,"Joint venture","What distinguishes a joint venture from an associate?","Joint control (shared, with unanimous consent) instead of mere significant influence",["A higher percentage of shares","A different consolidation method","Being located abroad"],"Both use the equity method, but a joint venture is subject to joint control.",2);
m(1,"Simple investment","How is a stake below 20% with no significant influence treated?","As a simple (trade) investment, not included in the consolidation",["Full consolidation","Equity method","Joint venture"],"Below 20% without significant influence: simple investment (IFRS 9), no consolidation.");
m(1,"Operating policies","Which of these is part of the “financial and operating policies” of an entity?","Dividend policy",["The colour of the logo","The names of the clients","The holiday calendar"],"Operating and financial policies: dividend policy, raising finance, strategic direction, business plans and budgets, capital expenditure.");
m(1,"Summary","Which row matches the IFRS summary?","Subsidiary · control · more than 50% of votes · full consolidation",["Associate · control · more than 50% of votes · equity method","Joint venture · limited influence · 20% to 50% · full consolidation","Simple investment · joint control · below 20% · equity method"],"Subsidiary: control, >50%, full consolidation. Associate: limited influence, 20–50%, equity method. JV: joint control, equity method. Simple investment: <20%, no consolidation.",2);
m(1,"Acquisition date","A subsidiary (100%) was acquired on 1 October X1 and the consolidation date is 31 December X1. What part of its income statement is included in the consolidated income statement?","Only October to December",["The whole year","Nothing, since it was just bought","Only December"],"Only the post-acquisition period (3 months) goes into the consolidated income statement; the rest is treated as reserves generated before it joined the group.",2);
m(1,"Users","Who uses consolidated financial statements?","Government, investors, banks, auditors and tax authorities",["Only the employees of the parent","Only the minority shareholders","Only the subsidiaries' managers"],"These are the users listed in the slides.");
m(1,"Example","B sold a non-current asset that cost B 1 to A for 9 (profit 8). Net income: A 4 and B 5 (B's figure includes the 8 profit). What is the profit of the group?","1",["9","8","13"],"4 + 5 − 8 (unrealised internal profit) = 1. The internal profit is cancelled in consolidation.",2);

m(1,"Control","X holds 30% of the votes of Y. Z, which holds 25% of Y's votes, has signed an agreement giving X the right to use Z's votes. What is Y for X?","A subsidiary: 30% + 25% = 55% of the votes under an agreement",["An associate, because X holds only 30%","A joint venture, because two investors are involved","A simple investment, because 30% is below 50%"],"Control can come from power over more than 50% of the votes by agreement with other investors.",3);
m(1,"Control","Pescanova S.A. owns 40% of Alfa directly and 100% of Beta, which owns 15% of Alfa. Pescanova's direct and indirect share of Alfa is 55%, and nothing prevents control. How is Alfa treated?","As a subsidiary, fully consolidated",["As an associate, because the direct stake is only 40%","As a joint venture","As a simple investment because 15% is below 20%"],"The table of the Pescanova assignment shows the direct and indirect %: 55% with control means subsidiary.",3);
m(1,"Control","P owns 100% of M, and M owns 30% of N. N has no other shareholder holding more than 30% and M sits on its board. How does P's group treat N?","As an associate, equity method",["As a subsidiary, because M is a subsidiary","As a simple investment, because P owns none of N directly","As a joint venture"],"The group's interest in N is 30% with board representation: significant influence, so equity method.",3);
m(1,"Control","Which statement is correct?","A 40% investor with joint control by contract is a joint venture, while a 40% investor with board seats but no joint control is an associate",["Any investor above 20% has joint control","A 40% investor always has control","A joint venture is the same as a subsidiary"],"The percentage gives a presumption; joint control depends on the unanimous consent of the parties, significant influence on participation in policy decisions.",3);
m(1,"Consolidation","P owns 80% of S, 35% of A and 12% of T. In the consolidated balance sheet of P, which investments are replaced by assets and liabilities line by line?","Only the investment in S",["The investments in S and A","The investments in S, A and T","None of them"],"Full consolidation (S) replaces the investment by the assets and liabilities. A uses the equity method (investment carried and updated). T is a simple investment, not consolidated.",3);

// stakes drills: what is the investee, and which method?
[[8,"T","Nothing else is known about the investor's influence."],[15,"T","Nothing else is known about the investor's influence."],[19,"T","Nothing else is known about the investor's influence."],
 [20,"A","The investor sits on the board of the investee."],[30,"A","Nothing suggests that significant influence is absent."],[45,"A","The investor has no agreement with other shareholders."],
 [49,"A","The investor has a seat on the board; there is no joint control."],[51,"S","Nothing prevents the investor from exercising control."],[65,"S","Nothing prevents the investor from exercising control."],[100,"S","Nothing prevents the investor from exercising control."]
].forEach(([pct,c,note])=>classify(1,"Stakes","Investor X holds "+pct+"% of the voting shares of Y. "+note,c,pct+"% of the votes: "+(c==="T"?"below 20% without influence, so a simple investment.":c==="A"?"between 20% and 50%, so significant influence.":"more than 50%, so control.")));

// slide examples 1 and 2
classify(1,"Slide example","Paint Ltd and Cement Ltd (unrelated) each acquire 50% of Grass Ltd and jointly control its activities, sharing dividends and assets equally in liquidation.","J","Two parties with joint control: joint venture, equity method.");
classify(1,"Slide example","Pepper Ltd owns 50% of Salt Ltd and appoints 5 of its 10 directors, one of whom is always the chairman with a casting vote.","S","Pepper controls the board (casting vote), so there is control even at exactly 50%.",3);
classify(1,"Slide example","Pear Ltd (which has a subsidiary, Sloe Ltd) acquires 80,000 of the 200,000 ordinary shares of Lemon Ltd.","A","80,000 / 200,000 = 40%, between 20% and 50%: associate, equity method.");
classify(1,"Slide example","Pot Ltd (which has two subsidiaries) acquires 15% of the ordinary shares of Kettle Ltd as part of its investment strategy.","T","15% < 20% and no significant influence: simple investment, not consolidated.");
classify(1,"Slide example","Park Ltd acquires 240,000 of the 300,000 ordinary shares of Stop Ltd.","S","240,000 / 300,000 = 80% > 50%: subsidiary, full consolidation.");
classify(1,"Slide example","Red Ltd has 2,000,000 ordinary shares in issue. Black Ltd acquires 800,000 of them.","A","800,000 / 2,000,000 = 40%: associate.");
classify(1,"Slide example","Red Ltd has 2,000,000 ordinary shares in issue. Black Ltd acquires 1,500,000 of them.","S","1,500,000 / 2,000,000 = 75%: subsidiary.");
classify(1,"Slide example","Red Ltd has 2,000,000 ordinary shares in issue. Black Ltd acquires 200,000 of them.","T","200,000 / 2,000,000 = 10%: simple investment.");
classify(1,"Slide example","Red Ltd has 2,000,000 ordinary shares in issue. Black Ltd and Cloud Ltd each acquire 1,000,000 of them and will exercise joint control over its affairs.","J","Two parties sharing control: joint venture, equity method.");

// Pescanova assignment (Grupo Pescanova, parent Pescanova S.A., 31 Dec X1)
[["Frinova, S.A.","processing and commercialising fish products, Spain","90.36%","S",""],
 ["Eiranova Fisheries Limited","producing and commercialising fish products, Cork (Ireland)","100%","S",""],
 ["Eyethu Nova","producing and commercialising fish products, Cape Town","49%","A",""],
 ["Pesquerias Belnova, S.A.","producing and commercialising fish products, Montevideo (Uruguay)","100%","S",""],
 ["American Shipping, S.A.","producing and commercialising fish products, Montevideo (Uruguay)","19%","T",""],
 ["Novagrup (Pty) Ltd.","other services, Cape Town","92.50%","S",""],
 ["Pescanova France, S.A.","commercialising fish products, Saint Contest (France)","100%","S",""],
 ["Pescamar, Lda","producing and commercialising fish products, Beira (Mozambique)","60%","A","Political problems in this country do not allow Pescanova to exercise control over the company, although it can exert a certain influence on it."],
 ["Austral Fisheries Pty, Ltd","producing and commercialising fish products, Perth (Australia)","50%","J","This company's statutes establish joint management between Pescanova S.A. and an Australian company also dedicated to fish products."],
 ["Serviconsa","producing and commercialising fish products, Chinandega (Nicaragua)","67%","S",""],
 ["Acuinova Actividades Piscícolas","producing and commercialising fish products, Lisbon (Portugal)","100%","S",""],
 ["Novanam Limited","producing and commercialising fish products, Luderitz (Namibia)","49%","A",""],
 ["Boapesca, S.A.","other services, La Coruña (Spain)","50%","A","Nothing indicates control or joint control."],
 ["Novaguatemala, S.A.","producing and commercialising fish products, Guatemala","100%","S","It was acquired on 1 October X1, and the consolidation date is 31 December X1."],
 ["Abad Overseas Private Ltd","producing and commercialising fish products, Chennai (India)","45%","A",""],
 ["Pesquera Yelcho, S.A.","producing and commercialising fish products, Providencia (Chile)","33%","A",""]
].forEach(([n,a,pct,c,note])=>classify(1,"Pescanova",`Grupo Pescanova (parent: Pescanova S.A.) holds ${pct} (direct and indirect) of ${n} (${a}). ${note}`.trim(),c,
  `${pct}: `+(c==="S"?"more than 50% with control, so a subsidiary.":c==="T"?"below 20%, so a simple investment.":c==="J"?"statutes establish joint management: joint control.":(pct==="60%"?"more than 50% but control cannot be exercised, only significant influence.":"between 20% and 50%, so significant influence."))));
m(1,"Pescanova","Pescanova acquired Novaguatemala (100%) on 1 October X1 and consolidates at 31 December X1. What happens to the net income of Novaguatemala when its balance sheet is added?","Only the net income of October–December stays in the consolidated income; the difference goes to reserves",["The whole year's net income is kept","The net income is ignored completely","The net income is moved to NCI"],"The income statement only includes the 3 months after acquisition; the profit generated before is treated as reserves existing before it belonged to the group.",3);

vf(1,"Under IFRS, a group exists when a parent owns one or more subsidiaries.",true,"That is the condition for preparing CFS.");
vf(1,"Control can only exist if the investor owns more than 50% of the shares.",false,"Control can also come from agreements, statutes or board appointment powers, and 50%+ ownership does not guarantee control.");
vf(1,"An associate is consolidated with full consolidation.",false,"Associates use the equity method.");
vf(1,"A joint venture is accounted for with the equity method.",true,"Joint ventures and associates both use the equity method.");
vf(1,"A trade investment below 20% with no significant influence is included in the consolidation.",false,"It is not consolidated (IFRS 9).");
vf(1,"Owning 20% to 50% of the voting shares usually gives rise to an associate.",true,"Unless it can be shown that significant influence does not exist.");
vf(1,"A company with 60% of the votes can never be an associate.",false,"If control cannot be exercised (legal, political reasons), it may be an associate, as for Pescamar in the Pescanova assignment.",2);
vf(1,"A parent needs at least one subsidiary to be able to form a group and consolidate.",true,"Without a subsidiary there is no group, hence no consolidation.");
vf(1,"The operating and financial policies of an entity include dividend policy, raising finance and approving capital expenditure.",true,"These are examples listed in the slides.");
vf(1,"In full consolidation, only the share of the subsidiary owned by the parent is added to the parent's balance sheet.",false,"100% of the subsidiary is added, regardless of the percentage owned.");
vf(1,"A parent that is itself a wholly-owned subsidiary can be exempt from preparing consolidated statements.",true,"This is the subgroup exemption.");
vf(1,"Consolidated statements are only required when the parent is listed on a stock exchange.",false,"A group exists as soon as there is a parent with a subsidiary; being traded publicly only matters for one exemption.",2);
vf(1,"In a joint venture, one of the parties can take the strategic decisions alone.",false,"Joint control means the strategic decisions need the unanimous consent of the parties sharing control.");
vf(1,"A simple investment is accounted for under IFRS 9 and is not consolidated.",true,"Below 20% without significant influence.");
vf(1,"Having 20% of the votes is enough to be a subsidiary.",false,"A subsidiary needs control (usually more than 50%). 20% is the lower threshold of an associate.");
vf(1,"Consolidated financial statements make it harder to manipulate the accounts through transactions inside the group.",true,"Avoiding accounting manipulation is part of the economic need for CFS.",2);

ty(1,"What is the name of the entity controlled by another entity?",["subsidiary","a subsidiary"],"A subsidiary is controlled by a parent.",undefined,1);
ty(1,"Which method is applied to a subsidiary?",["full consolidation","full"],"Subsidiaries: full consolidation.",["equity method"],1);
ty(1,"Which method is applied to an associate?",["equity method","equity","equity accounting"],"Associates: equity method.",["full consolidation"],1);
ty(1,"Which method is applied to a joint venture?",["equity method","equity","equity accounting"],"Joint ventures: equity method.",["full consolidation"],1);
ty(1,"What percentage of voting rights is the lower threshold of significant influence?",["20","20%","20 %"],"20% to 50% usually means associate.",undefined,1);
ty(1,"What percentage of the voting rights makes control presumed (it must be strictly exceeded)?",["50","50%","50 %"],"More than 50%.",undefined,1);
ty(1,"A buys 3,000 of the 5,000 shares of B. What % of B does it own?",["60","60%","60 %"],"3,000 / 5,000 = 60%.");
ty(1,"A buys 450,000 of the 1,500,000 shares of B. What % of B does it own?",["30","30%","30 %"],"450,000 / 1,500,000 = 30%: an associate.");
ty(1,"Companies A and B belong to the same group. B sold to A an asset that cost B 1 for 9. How much profit is generated by the internal sale?",["8"],"9 − 1 = 8, which must be cancelled in consolidation.");
ty(1,"What do we call the kind of arrangement in which two or more parties share control and need unanimous consent for strategic decisions?",["joint venture","a joint venture"],"A joint venture is subject to joint control.");
ty(1,"What is the name of the exemption that applies when the parent is itself a wholly-owned subsidiary?",["subgroup exemption","subgroup"],"The subgroup exemption.");
ty(1,"What do the initials CFS stand for? (three words)",["consolidated financial statements"],"Consolidated financial statements.",undefined,1);
ty(1,"Which accounting standard covers simple (trade) investments that are not consolidated? (IFRS followed by a number)",["ifrs 9","ifrs9"],"IFRS 9.",undefined,3);

// ===================== 2. Goodwill & NCI at acquisition =====================
m(2,"Cornerstone","What is the cornerstone of full consolidation?","Replacing the parent's investment in S by the assets and liabilities of S",["Adding the parent's profit to the subsidiary's profit","Writing off the subsidiary's equity against the parent's profit","Valuing the subsidiary at market price"],"The statements are aggregated, then the investment is eliminated against the equity of the subsidiary.");
m(2,"Cornerstone","What is eliminated in the “Investment-Equity adjustment”?","The parent's investment in S against 100% of the equity of S",["The parent's equity against the subsidiary's liabilities","Only the parent's share of the equity of S","The subsidiary's assets against the parent's liabilities"],"100% of the subsidiary's equity is eliminated, no matter what percentage the parent owns.");
m(2,"Cornerstone","What are the steps of the consolidation at the acquisition date, in order?","Compute goodwill, compute NCI, then eliminate the investment against the equity of S",["Compute NCI, add the profits, then compute goodwill","Eliminate the liabilities, then compute dividends","Compute reserves, then revalue the parent"],"1) goodwill, 2) NCI (if any), 3) adjust the consolidated balance sheet.",2);
m(2,"Goodwill","Goodwill is…","The excess of what the parent pays over its share of the subsidiary's equity at acquisition",["The excess of the subsidiary's equity over its market value","The parent's profit on the acquisition","The NCI share of the subsidiary's profit"],"Goodwill = price paid − group share of the (fair-valued) equity at the acquisition date.");
m(2,"Goodwill","Where is goodwill recorded in the consolidated balance sheet?","As an intangible non-current asset",["As a reserve in equity","As a current asset","As a liability"],"It is written down only if impaired under IFRS.");
m(2,"Goodwill","When is goodwill calculated?","Always at the acquisition date",["At each reporting date","At the consolidation date","At the end of the first year"],"Goodwill does not change with later changes of the subsidiary's equity.");
m(2,"Goodwill","How is goodwill treated afterwards under IFRS?","It is not amortised; it is written down only when it becomes impaired",["It is amortised over 5 years","It is revalued every year","It is transferred to NCI"],"Goodwill is tested for impairment.");
m(2,"Bargain purchase","What happens if the price paid is lower than the parent's share of the subsidiary's equity?","A gain from a bargain purchase is recognised in profit or loss",["Negative goodwill is shown as an asset","The difference is added to NCI","The difference is ignored"],"This “badwill” is a gain in the consolidated income statement.");
m(2,"NCI","What are non-controlling interests (NCI)?","The equity in a subsidiary not attributable, directly or indirectly, to the parent",["The part of the parent's equity owned by minority shareholders","The goodwill of the subsidiary","The loans granted to the subsidiary"],"IFRS definition. NCI arise when the parent owns less than 100%.");
m(2,"NCI","Where does NCI appear in the consolidated balance sheet?","Within equity, separately from the parent shareholders' equity",["As a non-current liability","As a current asset","Not at all"],"NCI is presented in equity, on its own line.");
m(2,"NCI","If the parent owns 80%, NCI at acquisition is…","20% of the subsidiary's equity at acquisition",["80% of the subsidiary's equity at acquisition","20% of the parent's equity","20% of the price paid"],"NCI = (100% − 80%) × equity of S.");
m(2,"Fair value","If a non-current asset of S is undervalued by 150 at acquisition, how does this affect the calculation?","The equity of S used for goodwill and NCI increases by 150",["It is ignored until the asset is sold","It is added to the parent's equity","It is deducted from the price paid"],"Fair value adjustments are added to the equity of S before computing the group share and NCI.");
m(2,"Adjustment","Why are consolidation “adjustments” and not “entries”?","They are made after each company's accounts are closed and do not change those accounts",["They are posted in the parent's ledger at year end","They are posted in the subsidiary's ledger","They are posted in the tax return"],"Consolidation adjustments do not modify the individual companies' accounting.");
m(2,"Which equity","When computing goodwill, which percentage of the subsidiary's equity do we use?","The percentage owned by the parent",["100%","The percentage owned by NCI","50%"],"Goodwill = price − (% owned × equity of S at acquisition). NCI uses the remaining percentage.");
m(2,"Reserves at acquisition","When computing goodwill, which components of S's equity at acquisition are included?","All of them: capital, share premium, revaluation reserve, retained earnings…",["Only the share capital","Only retained earnings","Only reserves, not capital"],"Share capital and all reserves at the acquisition date enter the calculation.");
m(2,"Adjustment","In the Investment-Equity adjustment for a purchase with goodwill, which side is the investment in S on?","Credit (it is removed), while the equity of S and goodwill are debited",["Debit (it is added)","Neither: it stays in the balance sheet","It is split between debit and credit"],"Dr capital, reserves, retained earnings of S and goodwill; Cr investment in S (and NCI if any).",2);
m(2,"Adjustment","In the Investment-Equity adjustment, where does a gain from a bargain purchase appear?","On the credit side",["On the debit side, as an asset","Nowhere","It reduces NCI"],"Dr equity of S; Cr investment in S, Cr gain from a bargain purchase (and NCI).",2);

vf(2,"In full consolidation, 100% of the subsidiary's assets and liabilities are added even if the parent owns only 75%.",true,"The remaining 25% appears as NCI in equity.");
vf(2,"Goodwill is recalculated at each consolidation date.",false,"It is always calculated at the acquisition date.");
vf(2,"A gain from a bargain purchase is recognised as an asset.",false,"It is recognised in profit or loss.");
vf(2,"NCI is presented in equity, separately from the parent shareholders' equity.",true,"This is the IFRS presentation.");
vf(2,"Goodwill is an intangible non-current asset only written down if impaired.",true,"IFRS: tested for impairment, not amortised.");
vf(2,"If the price paid is higher than the group share of S's equity, the difference is a bargain purchase.",false,"A higher price gives goodwill; a lower price gives a bargain purchase gain.");
vf(2,"Fair value adjustments of S's assets at acquisition are added to the equity of S in the goodwill and NCI calculation.",true,"They increase the equity of S used in both calculations.");
vf(2,"A parent that owns 100% of a subsidiary has no NCI.",true,"NCI = (100% − 100%) × equity = 0.");
vf(2,"The investment in S stays in the consolidated balance sheet next to the subsidiary's assets.",false,"It is eliminated against the equity of S: otherwise the group would count the same resources twice.");
vf(2,"NCI at acquisition is computed on the equity of S including fair value adjustments.",true,"NCI = NCI % × (equity of S + fair value increases).",2);
vf(2,"The goodwill calculation uses the percentage of S owned by the parent.",true,"Goodwill = price − parent % × equity of S at acquisition.");

// slide examples 1–5 (Company A buys Company B)
const B3=[["capital",2000],["legal reserves",2500],["retained earnings",1400]];
acq({s:2,nm:"Slide example 1",p:1,price:7200,comp:B3});
acq({s:2,nm:"Slide example 2",p:1,price:4500,comp:B3});
acq({s:2,nm:"Slide example 3",p:.8,price:7200,comp:B3});
acq({s:2,nm:"Slide example 4",p:.75,price:4100,comp:B3});
acq({s:2,nm:"Slide example 5",p:.8,price:7200,comp:B3,fv:150});
// practice variations
acq({s:2,nm:"Practice",p:.9,price:12000,comp:[["capital",5000],["reserves",3000],["retained earnings",2000]],lead:"Company A buys 90% of the shares of Company B"});
acq({s:2,nm:"Practice",p:.6,price:5000,comp:[["capital",4000],["retained earnings",3000]],fv:1000,lead:"Company A buys 60% of the shares of Company B"});
acq({s:2,nm:"Practice",p:.65,price:9000,comp:[["capital",8000],["share premium",2000],["retained earnings",4000]],lead:"Company A buys 65% of the shares of Company B"});
acq({s:2,nm:"Practice",p:1,price:3000,comp:[["capital",1000],["retained earnings",1500]],fv:300,lead:"Company A buys 100% of the shares of Company B"});
acq({s:2,nm:"Practice",p:.7,price:20000,comp:[["capital",10000],["reserves",8000],["retained earnings",4000]],lead:"Company A buys 70% of the shares of Company B"});
acq({s:2,nm:"Practice",p:.55,price:6600,comp:[["capital",6000],["retained earnings",3000]],lead:"Company A buys 55% of the shares of Company B"});
acq({s:2,nm:"Practice",p:.85,price:17500,comp:[["capital",8000],["reserves",7000],["retained earnings",3000]],fv:2000,lead:"Company A buys 85% of the shares of Company B"});

// assignment 1 and 2: consolidation on the acquisition date
const BS2=`P: PPE 8,500 · investment in S 2,450 · current assets 2,700 (total 13,650); share capital 5,000 · retained earnings 4,950 · non-current liabilities 1,800 · current liabilities 1,900.
S: PPE 4,300 · current assets 1,400 (total 5,700); share capital 2,000 · retained earnings 1,900 · non-current liabilities 700 · current liabilities 1,100.`;
fc({s:2,nm:"Exercise 1",p:1,price:1300,eq0:1600,eqN:1600,same:true,agg:7310,liab:2110,peq:3600,alt:1700,eq0t:"400 + 1,200",shares:"400,000 / 400,000",
 stmt:`Exercise 1 — P Ltd and S Ltd, 30 June X1 (€ thousand). P bought 100% of S (400,000 shares of €1) on 30 June X1 for 1,300, and consolidates on the same day.
P: PPE 2,800 · investment in S 1,300 · current assets 850 (total 4,950); share capital 1,000 · retained earnings 2,600 · non-current liabilities 900 · current liabilities 450.
S: PPE 1,900 · current assets 460 (total 2,360); share capital 400 · retained earnings 1,200 · non-current liabilities 500 · current liabilities 260.`});
fc({s:2,nm:"Exercise 2",p:.75,price:2450,eq0:3900,eqN:3900,same:true,agg:19350,liab:5500,peq:9950,alt:3100,eq0t:"2,000 + 1,900",shares:"1,500,000 / 2,000,000",
 stmt:`Exercise 2 — P Ltd and S Ltd, 30 June X1 (€ thousand). P bought 1,500,000 of the 2,000,000 shares of S (€1 each) on 30 June X1 for 2,450, and consolidates on the same day.
`+BS2});

// ===================== 3. Consolidating after the acquisition =====================
m(3,"Post-acquisition","What changes when we consolidate years after the purchase?","The equity of S has changed since acquisition, and its post-acquisition increase must be shared between the parent and NCI",["Goodwill must be recalculated","The parent's investment is revalued","NCI is no longer calculated"],"Goodwill stays fixed, but post-acquisition earnings are split between group reserves and NCI.");
m(3,"Post-acquisition","How is NCI calculated at the consolidation date?","NCI % × equity of S at the consolidation date (after adjustments)",["NCI % × equity of S at the acquisition date","NCI % × price paid","NCI % × equity of the parent"],"NCI = share of net assets at acquisition + share of post-acquisition earnings = NCI % × current equity of S.",2);
m(3,"Reserves","How are consolidated (group) reserves calculated?","Parent % × (equity of S now − equity of S at acquisition)",["NCI % × (equity of S now − equity of S at acquisition)","Parent % × equity of S now","Parent % × equity of S at acquisition"],"Only the post-acquisition change in S's equity belongs to the group reserves.",2);
m(3,"Reserves","If the equity of S has decreased since acquisition, what are the consolidated reserves arising from S?","Negative",["Zero","Positive, because goodwill increases","They are shown in NCI"],"Parent % × (negative change) = negative group reserves, as in Planet and Sun.",2);
m(3,"Reserves","Which items of S's equity are included in the change used for group reserves?","All elements: capital, premium, reserves and retained earnings",["Only the retained earnings","Only the capital","Only the share premium"],"“If some other elements of the equity of S changed, we would have taken into account the change in the overall equity of S.”",2);
m(3,"Post-acquisition","When we consolidate later than the acquisition, how are the post-acquisition retained earnings of S distributed?","Between the parent (group reserves) and the NCI",["Entirely to the parent","Entirely to the NCI","They are eliminated"],"The group takes its % through the consolidated reserves; the rest is in NCI.");
m(3,"Post-acquisition","Which figure is NOT recalculated when we consolidate years after the acquisition?","Goodwill",["NCI","Consolidated reserves","Retained earnings of S"],"Goodwill is calculated at the acquisition date and does not change (unless impaired).");
m(3,"NCI","NCI at the consolidation date also equals…","Their share of net assets at acquisition plus their share of the post-acquisition earnings",["Their share of the price paid","The parent's share of reserves","The goodwill multiplied by the NCI %"],"NCI(acquisition) + NCI % × change in the equity of S.",2);
m(3,"Interpretation","What does the consolidated total equity include?","The parent's equity, the group reserves and the NCI",["Only the parent's share capital","Only the parent's equity","The subsidiary's liabilities"],"Total equity includes the parent's equity, group reserves from subsidiaries (and associates) and NCI.");
m(3,"Interpretation","What do the consolidated total assets represent?","The assets controlled by the group: parent plus 100% of subsidiaries, plus goodwill, minus intragroup items",["Only the assets owned by the parent's shareholders","The market value of the group","The parent's assets plus the subsidiary's equity"],"All assets under the group's control, even those financed by NCI.");
m(3,"Interpretation","In the consolidated balance sheet, why do total assets include 100% of S's assets even when P owns only 60%?","Because P controls all of them; the part financed by outsiders appears as NCI in equity",["Because P pays 100% of S's debts","Because the other 40% belongs to P's directors","Because the investment is not eliminated"],"Full consolidation reflects control; NCI shows who financed the rest.",2);

vf(3,"Goodwill is always calculated at the acquisition date.",true,"It does not change with later changes of S's equity.");
vf(3,"Group reserves equal the parent % × the change in S's equity since acquisition.",true,"Only the post-acquisition change belongs to the group.",2);
vf(3,"NCI at the consolidation date = NCI % × equity of S at the acquisition date.",false,"It uses the equity of S at the consolidation date (after adjustments).",2);
vf(3,"Group reserves can be negative.",true,"If S's equity decreased since acquisition, as in Planet and Sun.",2);
vf(3,"When S's retained earnings increase after acquisition, NCI increases by NCI % × the increase.",true,"E.g. 4,920 + 1,700 × 0.3 = 5,430.",2);
vf(3,"Consolidated total equity includes the NCI.",true,"NCI is part of equity.");
vf(3,"Consolidated total assets include only the percentage of S's assets owned by the parent.",false,"They include 100% of S's assets.");
vf(3,"If S's equity has not changed since the acquisition, the consolidated reserves arising from S are zero.",true,"Parent % × 0 = 0 (this is the case when consolidating on the acquisition date).",2);

// slides, example 6 (relabelled P and S) and assignment 4 (exercises 3, 4, 5)
fc({s:3,nm:"Slide example 6",p:.7,price:15600,eq0:16400,eqN:18100,eq0t:"3,000 + 2,500 + 4,100 + 6,800",eqNt:"3,000 + 2,500 + 4,100 + 8,500",alt:11000,
 stmt:`Slide example 6 (€). P acquired 70% of S on 1 January X1 for 15,600. At that date S's equity was: share capital 3,000, share premium 2,500, revaluation reserve 4,100 and retained earnings 6,800. At 31 December X4 (consolidation date) S's equity is: share capital 3,000, share premium 2,500, revaluation reserve 4,100 and retained earnings 8,500.`});
fc({s:3,nm:"Exercise 3",p:.75,price:2450,eq0:3200,eqN:3900,agg:19350,liab:5500,peq:9950,alt:2250,eq0t:"2,000 + 1,200",eqNt:"2,000 + 1,900",shares:"1,500,000 / 2,000,000",
 stmt:`Exercise 3 — P Ltd and S Ltd, consolidation at 30 June X3 (€ thousand). P bought 1,500,000 of the 2,000,000 shares of S (€1 each) on 1 November X1 for 2,450, when S's retained earnings were 1,200 (share capital 2,000).
Balance sheets at 30 June X3:
`+BS2});
fc({s:3,nm:"Exercise 4",pn:"Black",sn:"White",p:.6,price:1280,eq0:2000,eqN:2830,agg:15120,liab:3670,peq:8620,alt:1100,eq0t:"1,000 + 200 + 800",eqNt:"1,000 + 200 + 1,630",shares:"600,000 / 1,000,000",
 stmt:`Exercise 4 — Black Ltd and White Ltd, consolidation at 31 July X3 (€ thousand). Black bought 600,000 of the 1,000,000 shares of White (€1 each) on 1 November X1 for 1,280, when White had share premium 200 and retained earnings 800 (share capital 1,000).
Black: PPE 7,600 · investment in White 1,280 · current assets 2,280 (total 11,160); share capital 4,000 · share premium 1,000 · retained earnings 3,620 · non-current liabilities 1,300 · current liabilities 1,240.
White: PPE 3,040 · current assets 920 (total 3,960); share capital 1,000 · share premium 200 · retained earnings 1,630 · non-current liabilities 500 · current liabilities 630.`});
fc({s:3,nm:"Exercise 5",pn:"Planet",sn:"Sun",p:.8,price:160,eq0:180,eqN:160,agg:760,liab:162,peq:438,alt:130,eq0t:"100 + 10 + 20 + 50",eqNt:"100 + 10 + 15 + 35",shares:"80,000 / 100,000",
 stmt:`Exercise 5 — Planet Plc and Sun Ltd, consolidation at 30 April X1 (€ thousand). Planet bought 80,000 of the 100,000 shares of Sun (€1 each) on 1 May X0 for 160, when Sun's reserves were: share premium 10, general reserve 20, retained earnings 50 (share capital 100).
Planet: PPE 218 · investment in Sun 160 · inventories 111 · trade receivables 30 · cash 19 (total 538); share capital 300 · share premium 20 · general reserve 68 · retained earnings 50 · non-current liabilities 50 · current liabilities 50.
Sun: PPE 140 · inventories 65 · trade receivables 15 · cash 2 (total 222); share capital 100 · share premium 10 · general reserve 15 · retained earnings 35 · non-current liabilities 32 · current liabilities 30.`});
// practice: consolidation some years after the acquisition (only S's equity is given)
const post=(p,price,a0,aN)=>{
  const sum=x=>x.reduce((t,c)=>t+c[1],0),txt=x=>x.map(c=>c[0]+" "+f(c[1])).join(", ");
  fc({s:3,nm:"Practice",p,price,eq0:sum(a0),eqN:sum(aN),eq0t:a0.map(c=>f(c[1])).join(" + "),eqNt:aN.map(c=>f(c[1])).join(" + "),
   stmt:`P acquired ${pc(p)} of S for €${f(price)}. At the acquisition date S's equity was: ${txt(a0)}. At the consolidation date, a few years later, S's equity is: ${txt(aN)}. (Assume no fair value adjustments and no internal transactions.)`});
};
post(.8,9000,[["share capital",4000],["reserves",3000],["retained earnings",2000]],[["share capital",4000],["reserves",3000],["retained earnings",3500]]);
post(.6,7000,[["share capital",5000],["retained earnings",4000]],[["share capital",5000],["retained earnings",2500]]);
post(.9,18000,[["share capital",10000],["share premium",2000],["retained earnings",6000]],[["share capital",10000],["share premium",2000],["revaluation reserve",1000],["retained earnings",9000]]);
post(.7,5000,[["share capital",3000],["retained earnings",4000]],[["share capital",3000],["retained earnings",6000]]);

ty(3,"Black owns 60% of White, whose retained earnings rose from 800 to 1,630 since the acquisition (nothing else changed). What percentage of that increase belongs to the NCI?",["40","40%","40 %"],"NCI % = 100% − 60% = 40%; the group takes 60% through its reserves.",undefined,1);
ty(3,"What name is given to the parent's share of the post-acquisition change in the equity of a subsidiary?",["consolidated reserves","group reserves","consolidated reserve"],"Consolidated (group) reserves.",undefined,1);
ty(3,"What is the name of the item, shown inside equity, that represents the share of S held by outsiders?",["non controlling interests","non-controlling interests","nci","non controlling interest","minority interests"],"Non-controlling interests (NCI).",undefined,1);

// ===================== 4. Internal transactions =====================
m(4,"Types","Which are the three types of internal transactions listed in the course?","Inventory, non-current assets, and financial transactions / intragroup balances",["Sales, purchases and wages","Dividends, taxes and rent","Cash, loans and shares"],"These are the three families of intragroup transactions to eliminate.");
m(4,"Inventory","When does unrealised inventory profit arise?","When a group entity sells goods to another at a profit and some are still in the buyer's inventory at year end",["When goods are sold to third parties at a profit","When the buyer pays late","When the seller has a loss"],"The profit is unrealised because the goods have not yet been sold outside the group.");
m(4,"Inventory","Why is the profit on goods still in the buyer's stock called “unrealised”?","Because the goods have not yet been sold to third parties outside the group",["Because the buyer has not paid","Because the profit is small","Because it is taxed later"],"Seen as a single entity, the group has not yet sold them.");
m(4,"Inventory","How are the sales and cost of sales (purchases) between two group companies treated in consolidation?","They are eliminated against each other",["They are kept in the consolidated income statement","Only the sales are eliminated","They are moved to NCI"],"The intragroup sale is cancelled against the buyer's purchases/COGS, whatever the % resold.");
m(4,"Net income","To decrease the net income of A in consolidation, you…","Debit net income in the balance sheet and credit net income in the income statement",["Credit net income in the balance sheet","Debit sales and credit assets","Debit cash"],"Net income of the income statement equals net income in equity; reducing the profit means debiting it in the balance sheet.",2);
m(4,"Inventory","Which balance-sheet adjustment removes the unrealised profit on inventories sold by A to B?","Credit inventories and debit net income / retained earnings of A (the seller)",["Debit inventories and credit retained earnings of B","Credit cash and debit sales","Credit retained earnings of A and debit inventories"],"Inventories are overstated by the unrealised profit, and so is the seller's profit.",2);
m(4,"Non-current assets","What is overstated when a group company sells a depreciable asset to another at a profit?","The asset's value, the seller's profit, and (afterwards) the buyer's depreciation",["Only the seller's cash","Only the buyer's liabilities","Nothing, if the buyer paid in full"],"Both the profit and the asset are overstated; the buyer then depreciates the overstated value.");
m(4,"Non-current assets","Why do we adjust depreciation when eliminating a profit on a depreciable asset?","The buyer depreciates the overstated cost, so its depreciation is too high",["The seller has not depreciated the asset","The asset has no useful life","Depreciation is a group transaction"],"Depreciation on the unrealised profit is also overstated and must be reversed.");
m(4,"Non-current assets","In the balance sheet adjustment for an internally sold machine (profit 60,000, life 5 years, 1 year elapsed), which account is credited with 60,000?","Machinery",["Accumulated depreciation","Net income of the buyer","Cash"],"Cr machinery 60,000; Dr accumulated depreciation 12,000; Dr net income of the seller 48,000.",2);
m(4,"Balances","What happens to intragroup balances such as loans and trade receivables / payables?","They are eliminated against each other",["They are added together","They are kept only in the parent","They are written off against equity"],"Otherwise assets and liabilities of the group are overstated.");
m(4,"Balances","Does eliminating intragroup balances change group profit?","No: it removes assets and liabilities (and possibly revenues and expenses)",["Yes, it always reduces profit","Yes, it always increases profit","It changes NCI only"],"These adjustments do not generate profit/loss corrections.");
m(4,"Balances","What can happen if intragroup balances do not agree?","The adjustments must first be included in the financial statements of the parent",["They are ignored","They are carried to NCI","They are cancelled automatically"],"Balances can only be eliminated if they are in agreement.");
m(4,"Loan","A (parent) lends money to B (subsidiary). Which two balance-sheet items are eliminated?","Loan receivable in A against loan payable in B",["Cash in A against share capital in B","Interest expense against goodwill","Investment in B against loan in A"],"Dr loan liability (B), Cr loan asset (A): no profit effect.");
m(4,"Loan","In the same loan, which income statement items are eliminated for the interest of the year?","Interest revenue (A) against interest expense (B)",["Sales against cost of sales","Interest revenue against depreciation","Nothing, because interest is real income"],"Dr interest revenue (A), Cr interest expense (B).");
m(4,"Loan","Accrued interest at the year end between A (lender) and B (borrower) is eliminated by…","Debiting interest payable (B) and crediting interest receivable (A)",["Debiting interest receivable (A)","Debiting cash","Crediting share capital"],"The intragroup receivable and payable cancel each other.",2);
m(4,"NCI","An adjustment that affects the post-acquisition retained earnings of the subsidiary also affects…","The calculation of NCI and group reserves",["Goodwill","The parent's share capital","The acquisition price"],"NCI and group reserves must be updated, because the subsidiary's equity changes.");
m(4,"Upstream","Which transaction reduces the equity of the subsidiary (and thus NCI)?","The subsidiary sells land to the parent at a profit that remains unrealised",["The parent sells inventory to the subsidiary","The parent lends money to the subsidiary","The parent receives interest from the subsidiary"],"The profit belongs to the subsidiary, so its retained earnings fall by the unrealised profit.",2);
m(4,"Downstream","When the parent sells goods at a profit to its subsidiary, which retained earnings are reduced by the unrealised profit?","Those of the parent",["Those of the subsidiary","Both equally","Neither: only inventories change"],"The seller's retained earnings are reduced; the NCI is unaffected.",2);

// inventory profit
inventory({s:4,nm:"Slide inventory 1",price:500,profit:150,sold:0});
inventory({s:4,nm:"Slide inventory 2",price:500,profit:150,sold:.6});
inventory({s:4,nm:"Inventory",price:800,profit:200,sold:.25,seller:"P",buyer:"S"});
inventory({s:4,nm:"Inventory",price:1200,cost:840,profit:360,sold:.5});
inventory({s:4,nm:"Inventory",price:900,profit:225,sold:.8});
inventory({s:4,nm:"Inventory",price:300,profit:60,sold:1});
inventory({s:4,nm:"Inventory",price:640,profit:160,sold:.75});
inventory({s:4,nm:"Inventory",price:1500,cost:1000,profit:500,sold:.4,seller:"P",buyer:"S"});
// land
land({s:4,nm:"Slide land 1",n:3,price:120000,profit:30000,resold:0});
land({s:4,nm:"Slide land 2",n:3,price:120000,profit:30000,resold:1});
land({s:4,nm:"Land",n:5,price:80000,profit:20000,resold:2});
land({s:4,nm:"Land",n:4,price:150000,profit:40000,resold:4});
land({s:4,nm:"Land",n:2,price:200000,profit:50000,resold:0,seller:"A",buyer:"B"});
// machinery
machine({s:4,nm:"Slide machinery",price:120000,profit:60000,life:5,yrs:1});
machine({s:4,nm:"Machinery",price:120000,profit:60000,life:5,yrs:2});
machine({s:4,nm:"Machinery",price:90000,profit:30000,life:6,yrs:1});
machine({s:4,nm:"Machinery",price:250000,profit:100000,life:10,yrs:3,seller:"A",buyer:"B"});
machine({s:4,nm:"Machinery",price:198000,profit:18000,life:10,yrs:1,seller:"Push",buyer:"Shove"});
// loans and interest
loanInt({s:4,nm:"Slide loan",pr:350000,rate:.05,mo:1});
loanInt({s:4,nm:"Slide loan",pr:350000,rate:.05,mo:10});
loanInt({s:4,nm:"Loan",pr:240000,rate:.06,mo:3});
loanInt({s:4,nm:"Loan",pr:120000,rate:.045,mo:8});
loanInt({s:4,nm:"Loan",pr:600000,rate:.03,mo:6});
loanInt({s:4,nm:"Loan",pr:90000,rate:.08,mo:5});
// who sold matters for NCI
upstream({s:4,nm:"Upstream / downstream",p:.8,u:100000});
upstream({s:4,nm:"Upstream / downstream",p:.75,u:48000});
upstream({s:4,nm:"Upstream / downstream",p:.9,u:30000});
upstream({s:4,nm:"Upstream / downstream",p:.6,u:25000});

// Case 1 and Case 2 internal transactions (each with its own statement)
const C1ACQ="A bought 80% of B on 1 January X2 for €450,000. At that date B's equity was: capital €300,000 and retained earnings €100,000; one property of B had a fair value of €120,000 against a book value of €100,000.";
const C1A="B sold a piece of land to A in X5 for €600,000. It had cost B €500,000. At 31 December X5 the land is still in A's balance sheet.";
const C1B="A sold inventories to B on 1 January X5 for €26,000. They had cost A €22,000. During X5, 50% of them were sold to third parties; the rest is still in B's warehouse at the end of X5.";
const C1C="On 31 December X5, A gave B a loan of €200,000.";
const C2G="Push Ltd supplied goods to Shove Ltd for €125 thousand, which it has not yet been paid. The goods cost Push €100 thousand and Shove still has 4/5 of them in inventory at 31 August X3.";
const C2M="On 1 September X2, Push Ltd supplied machinery to Shove Ltd at a price of €198 thousand. Push's profit on the transaction was €18 thousand. The remaining useful life of the machinery at that date is 10 years. The consolidation date is 31 August X3.";
const C2L="Push Ltd's loans (assets) include a loan of €130 thousand to Shove Ltd.";
m(4,"Case 1 (a)","Case 1. "+C1A+"\n\nWhat is the consolidation adjustment?","Reduce land by 100,000 and the retained earnings of B by 100,000",["Reduce land by 600,000","Reduce the retained earnings of A by 100,000","Increase land by 100,000"],"Unrealised profit = 600,000 − 500,000 = 100,000, taken out of PPE and out of B's retained earnings (B is the seller).",2);
m(4,"Case 1 (a)","Case 1. "+C1ACQ+" "+C1A+"\n\nWhy does this adjustment have to be taken into account in the NCI and the consolidated reserves?","Because the seller is the subsidiary B: its equity falls by 100,000",["Because the buyer is the parent","Because the land is a current asset","It does not have to be"],"The adjustment lowers B's retained earnings, so NCI and group reserves are calculated on B's equity after it.",3);
m(4,"Case 1 (b)","Case 1. "+C1B+"\n\nWhat is the adjustment?","Reduce inventories and the retained earnings of A by 2,000",["Reduce inventories by 4,000","Reduce the retained earnings of B by 2,000","No adjustment"],"Profit 26,000 − 22,000 = 4,000; 50% remains = 2,000. The seller is A, the parent.",2);
m(4,"Case 1 (b)","Case 1. "+C1ACQ+" "+C1B+"\n\nDoes this transaction change the NCI of B?","No: the profit belongs to A, so B's equity is not affected",["Yes, by 2,000","Yes, by 400","Yes, by 1,600"],"A is the seller; B's equity is unchanged, hence no effect on NCI or on the consolidated reserves from B.",3);
m(4,"Case 1 (c)","Case 1. "+C1C+"\n\nWhat is the adjustment?","Eliminate the loan asset (A) against the loan liability (B)",["Reduce retained earnings by 200,000","Reduce cash by 200,000","Increase goodwill by 200,000"],"Intragroup balance: 200,000 on both sides, with no profit effect.");
m(4,"Case 1 (c)","Case 1. "+C1ACQ+" "+C1C+"\n\nDoes this loan change B's equity (and so the NCI)?","No: a loan changes assets and liabilities only",["Yes, it reduces it by 200,000","Yes, it increases it by 200,000","Yes, it changes goodwill"],"Intragroup balances do not generate profit/loss corrections.",2);
nm(4,"Case 1 (a)","Case 1. "+C1A+"\n\nWhat is the unrealised profit (€)?",100000,[600000,500000,120000],"600,000 − 500,000.",2);
nm(4,"Case 1 (b)","Case 1. "+C1B+"\n\nWhat is the unrealised profit (€)?",2000,[4000,13000,11000],"(26,000 − 22,000) × 50%.",2);
tn(4,"Case 1. "+C1A+"\n\nWhat is the unrealised profit to eliminate (€)?",100000,"600,000 − 500,000.");
tn(4,"Case 1. "+C1B+"\n\nWhat is the unrealised profit to eliminate (€)?",2000,"(26,000 − 22,000) × 50%.");
m(4,"Case 2 (goods)","Case 2. "+C2G+"\n\nWhat is the unrealised profit to eliminate (€ thousand)?","20",["25","5","100"],"Profit 125 − 100 = 25; 25 × 4/5 = 20.",2);
m(4,"Case 2 (goods)","Case 2. "+C2G+"\n\nWhat is the adjustment for the unpaid amount of the goods?","Credit trade receivables (Push) 125 and debit trade payables (Shove) 125",["Credit trade receivables 20","Debit inventories 125","Credit retained earnings 125"],"Intragroup trade balance of 125 (the unrealised profit adjustment is separate).",2);
m(4,"Case 2 (goods)","Case 2. "+C2G+"\n\nWhich retained earnings are reduced by the unrealised profit?","Those of Push (the seller)",["Those of Shove","Both, in proportion to ownership","None"],"Push is the seller: −20 on Push's retained earnings and −20 on inventories.",2);
m(4,"Case 2 (machinery)","Case 2. "+C2M+"\n\nWhat is the excess depreciation (€ thousand)?","1.8",["18","19.8","0.9"],"Overstatement 18 / 10 = 1.8 a year (198/10 − 180/10).",2);
m(4,"Case 2 (machinery)","Case 2. "+C2M+"\n\nWhat is the net reduction in Push's retained earnings (€ thousand)?","16.2",["18","1.8","19.8"],"18 unrealised profit − 1.8 excess depreciation = 16.2.",3);
m(4,"Case 2 (machinery)","Case 2. "+C2M+"\n\nBy how much is the PPE reduced (gross), and by how much is the accumulated depreciation reduced (€ thousand)?","PPE −18, accumulated depreciation +1.8 (a reduction of the depreciation recorded)",["PPE −198, accumulated depreciation +19.8","PPE −1.8, accumulated depreciation −18","PPE −16.2, no change in depreciation"],"Cr PPE 18; Dr accumulated depreciation 1.8; Dr retained earnings of Push 16.2.",3);
m(4,"Case 2 (loan)","Case 2. "+C2L+" Push's loans total €180 thousand and Shove has long-term loans of €170 thousand.\n\nWhat are the consolidated loans (assets) and Shove's long-term loans after eliminating the intragroup loan (€ thousand)?","Loans (assets) 50 and long-term loans 40",["Loans 130 and long-term loans 170","Loans 50 and long-term loans 170","Loans 180 and long-term loans 40"],"Push: 180 − 130 = 50. Shove: 170 − 130 = 40.",3);
tn(4,"Case 2. "+C2G+"\n\nWhat is the unrealised profit to eliminate (in € thousand)?",20,"25 × 4/5 = 20.");
tn(4,"Case 2. "+C2M+"\n\nWhat is the net adjustment to Push's retained earnings (in €, not thousands)?",16200,"18,000 − 1,800 = 16,200.",3);
tn(4,"Case 2. "+C2M+"\n\nWhat is the excess depreciation (in €, not thousands)?",1800,"18,000 / 10 years = 1,800.");

vf(4,"Unrealised profit on inventories is eliminated only for the goods still held by the group at year end.",true,"Goods sold to third parties have realised their profit.");
vf(4,"Sales and purchases between group companies are eliminated in consolidation.",true,"They cancel each other against COGS.");
vf(4,"Eliminating an intragroup loan changes consolidated profit.",false,"It cancels the asset and the liability, with no profit effect (interest revenue and expense cancel each other).");
vf(4,"Group profit on an internal sale of an asset is recognised in full as soon as the sale happens.",false,"The profit is unrealised until the asset leaves the group.");
vf(4,"When the subsidiary sells to the parent at a profit, the adjustment affects the equity of the subsidiary and therefore NCI.",true,"The seller's retained earnings are reduced, and the subsidiary's equity is shared with NCI.",2);
vf(4,"When the parent sells to its subsidiary at a profit, the unrealised profit reduces the NCI.",false,"It reduces the parent's retained earnings; the subsidiary's equity is unchanged.",3);
vf(4,"Excess depreciation on an internally transferred asset increases the unrealised profit to be eliminated.",false,"It reduces the net adjustment: unrealised profit minus excess depreciation.",2);
vf(4,"Intragroup balances can only be eliminated if they are in agreement.",true,"Otherwise the parent must first adjust its statements.");
vf(4,"If all the goods sold inside the group have been resold to third parties by year end, no unrealised profit remains.",true,"The profit has been realised outside the group.");
vf(4,"For an internally sold depreciable asset, the unrealised profit and the excess depreciation both affect the seller's net income in the consolidation adjustment.",true,"Net adjustment = unrealised profit − excess depreciation.",2);
vf(4,"Intragroup trade receivables and payables are eliminated even if no profit is involved.",true,"Otherwise assets and liabilities of the group are overstated.");

ty(4,"Machinery: unrealised profit 60,000, remaining life 5 years. What is the annual excess depreciation?",["12000","12,000"],"60,000 / 5.");
ty(4,"Which kind of profit is cancelled in consolidation: realised or unrealised?",["unrealised","unrealized"],"The profit on goods or assets still held inside the group.",undefined,1);
ty(4,"What do we call the extra depreciation booked by the buyer on the profit of an intragroup asset sale?",["excess depreciation","excess of depreciation","overstated depreciation"],"Excess (overstated) depreciation.",undefined,1);

// ===================== 5. Equity method =====================
m(5,"Principle","What is the key difference between full consolidation and the equity method?","In the equity method the associate's assets and liabilities are not added line by line",["The equity method adds the associate's balance sheet at 50%","The equity method eliminates the investment","The equity method only applies to simple investments"],"With the equity method no addition takes place: only the investment value is updated.");
m(5,"Principle","What happens to the investment in an associate in the consolidated balance sheet?","It is kept and updated by the group's share of post-acquisition earnings",["It is replaced by the net assets of the associate","It is eliminated against equity","It is written off"],"The investment is “tipped up” each year.");
m(5,"Principle","How are the treatments of subsidiaries and associates related?","They are effectively opposite: the investment in a subsidiary is replaced, the investment in an associate is carried",["They are identical","Both replace the investment by net assets","Both ignore the investment"],"Subsidiary: investment replaced by net assets. Associate: investment carried forward.");
m(5,"Principle","The equity method initially recognises the investment…","At cost",["At fair value of the associate's assets","At nominal value","At zero"],"Then adjusted for post-acquisition changes in the investor's share of the investee's net assets.");
m(5,"Principle","What reduces the carrying amount of an associate in the equity method?","Impairment losses",["Dividends of the parent","Goodwill amortisation","The profit of the parent"],"The investment is increased by post-acquisition earnings and reduced by impairment.");
m(5,"Principle","If the associate makes a loss after acquisition, what happens to the investment?","It is reduced by the investor's share of the loss",["It is not changed","It is increased","It is eliminated at once"],"The investment follows the investor's share of the change in the associate's net assets (increase if profit, decrease if loss).",2);
m(5,"Reasons","Which is a reason to acquire an interest in an associate?","Ensuring the supply of a vital raw material",["Reducing its own taxes","Consolidating the associate's debt","Eliminating competitors completely"],"Other reasons: securing a stream of dividends and gaining management expertise.");
m(5,"Reasons","Which is NOT a reason listed in the course for acquiring an associate?","Obtaining full control over its assets",["Gaining management expertise","Securing a return through dividends","Ensuring supply of a vital raw material"],"Full control would make it a subsidiary.");
m(5,"Goodwill","How is the goodwill of an associate calculated?","Price paid − investor's % × equity of the associate at acquisition",["Price paid − 100% of the associate's equity","Price paid × % owned","Equity of the associate now − equity at acquisition"],"Same procedure as in full consolidation.",2);
m(5,"Goodwill","Where is the goodwill of an associate disclosed?","In the notes; it stays inside the equity-method investment",["As a separate asset","In NCI","In the income statement"],"It is carried forward in “Equity investment in A” in the balance sheet and mentioned in the notes.");
m(5,"Note","In a group with a subsidiary S and an associate A, why is the equity method applied by the group and not on its own?","Because a group only exists with a parent and at least one subsidiary: there must be consolidated statements to apply it in",["Because associates do not have an equity","Because associates must be below 20%","Because the equity method is applied by subsidiaries"],"“We always need at least one subsidiary to be able to form a group and, therefore, consolidate.”",2);
m(5,"Note","Which items are in the consolidated balance sheet when P has a subsidiary S and an associate A?","Investment in A updated, plus equity of P, NCI of S, consolidated reserves and % profit from A",["Assets and liabilities of A added in full","Investment in S kept at cost","Only P's equity"],"A's assets and liabilities are not added.",2);
m(5,"Joint ventures","How is the investment in a joint venture accounted for in the consolidated statements?","With the equity method, like an associate",["With full consolidation","It is not consolidated","At 50% of its assets and liabilities"],"Joint ventures and associates both use the equity method.");

// slide example 1 (P buys 40% of A) and Case 1 (A buys 25% of C), then practice
eqm({s:5,nm:"Slide example",p:.4,price:340000,eq0:800000,eqN:1100000,eq0t:"share capital 300,000 + retained earnings 500,000",lead:"P (which also has a subsidiary N) buys 40% of the shares of A"});
eqm({s:5,nm:"Case 1 (C)",p:.25,price:65000,eq0:150000,eqN:290000,eq0t:"capital 100,000 + retained earnings 50,000",lead:"A (which also has a subsidiary B) buys 25% of the shares of C"});
eqm({s:5,nm:"Practice",p:.3,price:50000,eq0:120000,eqN:200000,eq0t:"capital 100,000 + retained earnings 20,000",lead:"P buys 30% of the shares of A"});
eqm({s:5,nm:"Practice",p:.45,price:300000,eq0:600000,eqN:540000,lead:"P buys 45% of the shares of A"});
eqm({s:5,nm:"Practice",p:.35,price:210000,eq0:500000,eqN:900000,imp:20000,lead:"P buys 35% of the shares of A"});
eqm({s:5,nm:"Practice",p:.2,price:90000,eq0:400000,eqN:600000,lead:"P buys 20% of the shares of A (significant influence is shown by a seat on its board)"});
eqm({s:5,nm:"Practice",p:.25,price:130000,eq0:480000,eqN:560000,lead:"P buys 25% of the shares of A"});
eqm({s:5,nm:"Practice",p:.4,price:700000,eq0:1500000,eqN:1900000,lead:"P buys 40% of the shares of A"});
const EQ40="P (which has a subsidiary N) buys 40% of the shares of A for €340,000. At that date A's equity was: share capital 300,000 and retained earnings 500,000. At the consolidation date, A's retained earnings are 800,000.";
m(5,"Slide example","Equity method.\n"+EQ40+"\n\nWhich consolidation adjustment records the associate?","Debit equity investment in A 460,000; credit investment in A 340,000; credit retained earnings group 120,000",["Debit investment in A 340,000; credit equity investment in A 340,000","Debit equity investment in A 800,000; credit investment in A 340,000; credit retained earnings group 460,000","Debit retained earnings group 120,000; credit equity investment in A 120,000"],"Equity investment = 340,000 + 40% × (800,000 − 500,000) = 460,000. The 120,000 is the group's share of the new retained earnings. The 20,000 goodwill stays inside the 460,000.",3);
m(5,"Slide example","Equity method.\n"+EQ40+"\n\nIs the goodwill of 20,000 shown as a separate item in the consolidated balance sheet?","No: it stays inside the equity investment and is mentioned in the notes",["Yes, as an intangible asset","Yes, in NCI","It is deducted from the group reserves"],"Goodwill of an associate is carried forward in the equity investment and disclosed in the notes.",2);

vf(5,"In the equity method the assets and liabilities of the associate are added to the group's balance sheet.",false,"They are not added; only the updated investment is shown.");
vf(5,"An investor with 40% of a company usually has an associate under IFRS.",true,"20% to 50% usually means significant influence.");
vf(5,"Goodwill of an associate is shown on a separate line in the consolidated balance sheet.",false,"It is included in the equity investment and disclosed in the notes.",2);
vf(5,"Joint ventures are accounted for with the equity method.",true,"Yes, as are associates.");
vf(5,"The investment in an associate is increased each year by the investor's share of post-acquisition retained earnings.",true,"“Tipped up” by the share of new retained earnings.");
vf(5,"Participation in policy-making processes can evidence significant influence.",true,"Along with board representation, material transactions, managerial interchange and technical information.");
vf(5,"The treatments of a subsidiary and of an associate are effectively opposite in nature.",true,"The investment in a subsidiary is replaced by its net assets; the investment in an associate is carried forward.",2);
vf(5,"The consolidated reserves for an associate equal the associate's % × the whole equity of the associate.",false,"They equal the associate's % × the post-acquisition change in the associate's equity.",2);
vf(5,"An impairment loss reduces the carrying amount of an equity-method investment.",true,"The investment is reduced by any impairment loss.");

ty(5,"Which method is used to consolidate associates and joint ventures?",["equity method","equity"],"The equity method.",["full consolidation"],1);
ty(5,"What do we call the item that shows the value of an associate in the consolidated balance sheet after adding the share of new earnings? (two words + the name of the associate type)",["equity investment","equity investment in a"],"“Equity investment in A”.",undefined,2);
ty(5,"The equity investment in an associate is said to be “…… up” each year by the investor's share of new retained earnings. Which word is missing?",["tipped","tipped up"],"“Tipped up”.",undefined,2);
ty(5,"Where is the goodwill of an associate disclosed? (one word)",["notes","the notes","in the notes","note"],"In the notes to the consolidated statements.",undefined,2);

// ===================== 6. Worked cases =====================
const C1F=`Case 1 — group of A and B, with associate C (31 December X5).
• 1 Jan X2: A bought 80% of B for €450,000; B's equity then: capital €300,000 + retained earnings €100,000; one property of B had a fair value of €120,000 (book value €100,000).
• 1 Jan X5: A bought 25% of C for €65,000; C's equity then: capital €100,000 + retained earnings €50,000. At 31 Dec X5, C's retained earnings are €190,000.
• X5 internal transactions: (a) B sold land to A for €600,000 (cost to B €500,000), still held by A; (b) A sold inventories to B for €26,000 (cost €22,000), 50% resold, 50% still in B's stock; (c) A lent €200,000 to B on 31 Dec.
• Balance sheets 31 Dec X5 (€). A: PPE 1,200,000 · investment in B 450,000 · investment in C 65,000 · loans to group companies 200,000 · inventories 550,000 · trade receivables 35,000 · cash 120,000 (total 2,620,000); capital 1,000,000 · retained earnings 500,000 · share premium 300,000 · other reserves 105,000 · long-term debt 450,000 · short-term debt 102,000 · suppliers 163,000.
B: PPE 365,000 · inventories 235,000 · trade receivables 132,000 · cash 44,000 (total 776,000); capital 300,000 · retained earnings 174,000 · long-term debt 75,000 · loan from group companies 200,000 · short-term debt 22,000 · suppliers 5,000.`;
const C1N=C1ACQ+" At 31 December X5, B's capital is €300,000 and its retained earnings €174,000. Internal transaction: "+C1A+" (Other X5 internal transactions — an inventory sale by A to B and a loan from A to B — do not affect B's equity.)";
// goodwill / NCI / reserves of B
nm(6,"Case 1",C1ACQ+"\n\nWhat is the equity of B at the acquisition date, including the fair value adjustment (€)?",420000,[400000,300000,336000],"300,000 + 100,000 + 20,000 = 420,000.",1);
nm(6,"Case 1",C1ACQ+"\n\nWhat is the goodwill (€)?",114000,[336000,50000,130000,34000],"420,000 × 0.8 = 336,000; 450,000 − 336,000 = 114,000.",2);
tn(6,"Case 1. "+C1ACQ+"\n\nWhat is the goodwill from the acquisition of B (€)?",114000,"450,000 − 80% × 420,000 = 114,000.");
nm(6,"Case 1",C1N+"\n\nWhat is the NCI at 31 December X5 (€)?",78800,[98800,94800,84000,120000],"(300,000 + 174,000 + 20,000 − 100,000) × 0.2 = 78,800: the equity of B is updated for the unrealised profit on the land.",3);
tn(6,"Case 1. "+C1N+"\n\nWhat is the NCI at 31 December X5 (€)?",78800,"394,000 × 0.2 = 78,800.",3);
nm(6,"Case 1",C1N+"\n\nWhat are the consolidated reserves arising from B (€)? (They are negative: give the amount with its sign.)",-20800,[20800,-26000,-5200,59200],"Equity of B: 394,000 now vs 420,000 at acquisition → −26,000 × 0.8 = −20,800.",3);
tn(6,"Case 1. "+C1N+"\n\nWhat is the amount of the consolidated reserves arising from B (€)? Ignore the sign.",20800,"(394,000 − 420,000) × 0.8 = −20,800, negative consolidated reserves.",3);
nm(6,"Case 1",C1N+"\n\nIf A (instead of B) had sold the land with the same profit, what would the NCI be at 31 December X5 (€)?",98800,[78800,94800,120000,84000],"The profit would belong to A, so B's equity would not be reduced: (300,000 + 174,000 + 20,000) × 0.2 = 98,800.",3);
m(6,"Case 1","Case 1. "+C1ACQ+" "+C1A+" Other X5 internal transactions: an inventory sale by A to B, and a loan from A to B.\n\nWhy are the inventory sale and the loan NOT used in the NCI calculation?","They do not affect the equity of B",["They are immaterial","They only affect goodwill","They affect only the cash"],"The inventory profit is A's (the parent), and the loan has no profit effect, so B's equity is unchanged.",3);
// associate C
nm(6,"Case 1 (C)","Case 1. A bought 25% of C for €65,000 when C's equity was capital €100,000 + retained earnings €50,000. At 31 December X5, C's retained earnings are €190,000.\n\nWhat is the goodwill of the associate (€)?",27500,[37500,65000,35000],"150,000 × 0.25 = 37,500; 65,000 − 37,500 = 27,500.",2);
nm(6,"Case 1 (C)","Case 1. A bought 25% of C for €65,000 when C's equity was capital €100,000 + retained earnings €50,000. At 31 December X5, C's retained earnings are €190,000.\n\nWhat are the consolidated reserves for the associate C (€)?",35000,[25000,65000,27500,47500],"(190,000 − 50,000) × 25% = 35,000.",2);
nm(6,"Case 1 (C)","Case 1. A bought 25% of C for €65,000 when C's equity was capital €100,000 + retained earnings €50,000. At 31 December X5, C's retained earnings are €190,000.\n\nWhat is the equity investment in C in the consolidated balance sheet (€)?",100000,[65000,72500,290000,37500],"65,000 + 35,000 = 100,000 (goodwill of 27,500 included).",3);
// consolidated balance sheet lines
nm(6,"Case 1",C1F+"\n\nWhat is the consolidated PPE (including land) (€)?",1485000,[1565000,1585000,1465000,1685000],"1,200,000 + 365,000 + 20,000 (fair value) − 100,000 (unrealised profit on land) = 1,485,000.",3);
nm(6,"Case 1",C1F+"\n\nWhat are the consolidated inventories (€)?",783000,[785000,787000,781000,789000],"550,000 + 235,000 − 2,000 (unrealised profit of A) = 783,000.",3);
nm(6,"Case 1",C1F+"\n\nWhat is the total of A + B assets before any consolidation adjustment (€)?",3396000,[2813000,2620000,776000,3196000],"2,620,000 + 776,000 = 3,396,000.",1);
nm(6,"Case 1",C1F+"\n\nWhat are the consolidated trade receivables (€)?",167000,[35000,132000,367000,165000],"35,000 + 132,000: nothing to eliminate (the intragroup items are the loan and the inventories).",2);
nm(6,"Case 1",C1F+"\n\nWhat is the consolidated cash (€)?",164000,[120000,44000,364000,162000],"120,000 + 44,000.",1);
nm(6,"Case 1",C1F+"\n\nWhat are the consolidated loans to group companies (€)?",0,[200000,400000,100000,114000],"The loan of A to B (asset 200,000 / liability 200,000) is eliminated.",2);
nm(6,"Case 1",C1F+"\n\nWhat is the consolidated goodwill (€)?",114000,[27500,141500,336000,100000],"Goodwill of B = 114,000. The goodwill of the associate (27,500) is not shown separately.",2);
nm(6,"Case 1",C1F+"\n\nWhat is the equity investment in C shown in the consolidated balance sheet (€)?",100000,[65000,35000,27500,290000],"65,000 + 25% × (190,000 − 50,000) = 100,000.",2);
nm(6,"Case 1",C1F+"\n\nWhat are the consolidated total assets (€)?",2813000,[3396000,2620000,2913000,3396000-450000-65000],"3,396,000 − investments 515,000 − loans 200,000 − 100,000 (land) − 2,000 (inventories) + 20,000 (fair value) + 114,000 (goodwill) + 100,000 (equity investment) = 2,813,000.",3);
tn(6,"Case 1. "+C1F+"\n\nWhat are the consolidated total assets (€)?",2813000,"2,813,000.",3);
nm(6,"Case 1",C1F+"\n\nWhat is the consolidated retained earnings of A (€)?",498000,[500000,502000,598000,474000],"500,000 − 2,000 (unrealised profit on inventories sold by A) = 498,000.",3);
nm(6,"Case 1",C1F+"\n\nWhat is the consolidated total equity, including NCI (€)?",1996000,[1917200,1996000+78800,2813000,1898000],"Capital 1,000,000 + RE A 498,000 + share premium 300,000 + other reserves 105,000 + NCI 78,800 − reserves of B 20,800 + reserves of C 35,000 = 1,996,000.",3);
nm(6,"Case 1",C1F+"\n\nWhat is the consolidated equity attributable to A's shareholders, excluding NCI (€)?",1917200,[1996000,1898000,1917200-35000,2000000],"1,996,000 − NCI 78,800 = 1,917,200.",3);
nm(6,"Case 1",C1F+"\n\nWhat are the consolidated total liabilities (€)?",817000,[1017000,1201000,525000,1017000+200000],"Long-term debt 525,000 + short-term debt 124,000 + suppliers 168,000 = 817,000 (the loan between A and B is eliminated).",3);
m(6,"Case 1","Case 1. The consolidated balance sheet of A shows total equity of 1,996,000 and total assets of 2,813,000.\n\nWhat do the consolidated total assets include?","100% of B's assets (not C's), the goodwill of B, and the equity investment in C, minus the intragroup items",["Only the assets owned by A","A's assets plus 80% of B's assets","The assets of A, B and C added in full"],"Full consolidation of B (100%, even though A owns 80%), equity method for C (only the updated investment).",3);
m(6,"Case 1","Case 1. The consolidated total equity is 1,996,000.\n\nWhat does it include?","The equity of A's shareholders (with the consolidated reserves of B and C) plus the NCI of B",["Only the capital and reserves of A","The equity of A and 100% of the equity of B and C","The equity of A minus the NCI"],"Equity of the parent (adjusted), consolidated reserves of the subsidiary and of the associate, and the NCI (78,800).",3);
vf(6,"In Case 1 the associate C is consolidated using the equity method.",true,"A owns 25%, between 20% and 50%.");
vf(6,"In Case 1, the unrealised profit on the land reduces both PPE and the retained earnings of B.",true,"100,000 each: B is the seller.",2);
vf(6,"In Case 1, the unrealised profit on the inventories reduces the retained earnings of B.",false,"A sold the inventories, so the 2,000 reduces A's retained earnings.",2);
vf(6,"In Case 1, the 25% stake in C appears in the consolidated balance sheet at its cost of 65,000.",false,"It is updated: 65,000 + 35,000 = 100,000.",2);
vf(6,"In Case 1, the goodwill of the associate C (27,500) is shown as a separate line.",false,"It stays inside the equity investment and is disclosed in the notes.",2);
vf(6,"In Case 1, the consolidated reserves arising from B are negative.",true,"B's equity (394,000) is below its equity at acquisition (420,000).",3);

// ---- Case 2: Push Ltd and Shove Ltd ----
const C2ACQ="Push Ltd acquired 150,000 of the 200,000 shares (€1 each) of Shove Ltd for €295 thousand on 1 September X1, when Shove's retained earnings were €60 thousand (share capital €200 thousand) and its PPE had a fair value €100 thousand above its book value.";
const C2F=`Case 2 — Push Ltd and Shove Ltd, 31 August X3 (€ thousand).
Push: PPE 110 · loans 180 · investment in Shove 295 · inventories 300 · trade receivables 270 · cash 160 (total 1,315); ordinary shares 840 · retained earnings 265 · trade payables 210.
Shove: PPE 350 · inventories 190 · trade receivables 90 · cash 50 (total 680); ordinary shares 200 · retained earnings 140 · long-term loans 170 · trade payables 170.
• ${C2ACQ.replace("Push Ltd acquired","Push acquired")}
• Push's loans include a loan of €130 thousand to Shove.
• During X3, Push supplied goods to Shove for €125 thousand, not yet paid; they cost Push €100 thousand and Shove still has 4/5 of them in inventory.
• On 1 September X2, Push supplied machinery to Shove for €198 thousand, with a profit of €18 thousand for Push; remaining useful life 10 years.`;
const C2N=C2ACQ+" At 31 August X3 Shove's retained earnings are €140 thousand. Internal transactions in X3: Push sold goods (profit €25 thousand, 4/5 unsold) and a machine (profit €18 thousand) to Shove, and lent Shove €130 thousand.";
nm(6,"Case 2",C2ACQ+"\n\nWhat is Shove's equity at the acquisition date, including the fair value adjustment (€ thousand)?",360,[260,200,270],"200 + 60 + 100 = 360.",1);
nm(6,"Case 2",C2ACQ+"\n\nWhat is the goodwill (€ thousand)?",25,[270,70,110,65],"(200 + 60 + 100) × 0.75 = 270; 295 − 270 = 25.",2);
tn(6,"Case 2. "+C2ACQ+"\n\nWhat is the goodwill (€ thousand)?",25,"295 − 75% × 360 = 25.");
m(6,"Case 2","Case 2. "+C2ACQ+"\n\nWhat percentage of Shove does Push own, and how is Shove consolidated?","75%, a subsidiary: full consolidation",["75%, an associate: equity method","25%, a subsidiary: full consolidation","75%, a joint venture"],"150,000 / 200,000 = 75% > 50%.");
nm(6,"Case 2",C2N+"\n\nWhat is the NCI at 31 August X3 (€ thousand)?",110,[90,60,150,120],"Shove's equity = 200 + 140 + 100 = 440 (the internal transactions are Push's, so they do not change it); 440 × 0.25 = 110.",3);
tn(6,"Case 2. "+C2N+"\n\nWhat is the NCI at 31 August X3 (€ thousand)?",110,"440 × 0.25 = 110.",3);
nm(6,"Case 2",C2N+"\n\nWhat are the consolidated reserves arising from Shove (€ thousand)?",60,[80,110,25,330],"(440 − 360) × 0.75 = 60.",3);
tn(6,"Case 2. "+C2N+"\n\nWhat are the consolidated reserves arising from Shove (€ thousand)?",60,"(440 − 360) × 75% = 60.",3);
m(6,"Case 2","Case 2. "+C2N+"\n\nWhy do the intragroup adjustments not change Shove's equity?","Push (the parent) is the seller in the goods and machinery transactions, and the loan has no profit effect",["Because they are immaterial","Because the loan is repaid","Because Shove has no retained earnings"],"All unrealised profits (goods, machinery) belong to Push.",3);
nm(6,"Case 2",C2N+"\n\nSuppose instead that Shove had sold the goods to Push (same figures: profit 25, 4/5 unsold, and nothing else changed). What would the NCI be (€ thousand)?",105,[110,100,90,115],"The unrealised profit of 20 would reduce Shove's equity: (440 − 20) × 0.25 = 105.",3);
nm(6,"Case 2",C2N+"\n\nSuppose instead that Shove had sold the goods to Push (same figures: profit 25, 4/5 unsold, and nothing else changed). What would the consolidated reserves from Shove be (€ thousand)?",45,[60,50,55,15],"(440 − 20 − 360) × 0.75 = 45.",3);
nm(6,"Case 2",C2F+"\n\nWhat are the consolidated loans (assets) (€ thousand)?",50,[180,130,310,0],"180 − 130 (loan to Shove, eliminated) = 50.",2);
nm(6,"Case 2",C2F+"\n\nWhat are the consolidated inventories (€ thousand)?",470,[490,450,510,460],"300 + 190 − 20 (unrealised profit) = 470.",3);
nm(6,"Case 2",C2F+"\n\nWhat are the consolidated trade receivables (€ thousand)?",235,[360,270,485,125],"270 + 90 − 125 (intragroup receivable) = 235.",3);
nm(6,"Case 2",C2F+"\n\nWhat is the consolidated cash (€ thousand)?",210,[160,50,260,100],"160 + 50.",1);
nm(6,"Case 2",C2F+"\n\nWhat is the consolidated net PPE (after the fair value increase, the unrealised profit on the machinery and the excess depreciation) (€ thousand)?",543.8,[560,542,460,578],"110 + 350 + 100 (fair value) − 18 (unrealised profit) + 1.8 (excess depreciation reversed) = 543.8. (The course shows 542 for PPE and 1.8 for accumulated depreciation.)",3);
nm(6,"Case 2",C2F+"\n\nWhat is the consolidated goodwill (€ thousand)?",25,[270,110,125,100],"295 − 75% × 360 = 25.",2);
nm(6,"Case 2",C2F+"\n\nWhat is the total of Push + Shove assets before any adjustment (€ thousand)?",1995,[1315,680,1533.8,2000],"1,315 + 680 = 1,995.",1);
nm(6,"Case 2",C2F+"\n\nWhat are the consolidated total assets (€ thousand)?",1533.8,[1995,1553.8,1315,1533],"1,995 − 130 loan − 295 investment − 125 receivable − 20 inventory + 100 fair value − 18 + 1.8 + 25 goodwill = 1,533.8.",3);
tn(6,"Case 2. "+C2F+"\n\nWhat are the consolidated total assets (in € thousand, give the number with one decimal, e.g. 1234.5)?",1533.8,"1,533.8.",3);
nm(6,"Case 2",C2F+"\n\nWhat is the consolidated retained earnings (€ thousand)?",228.8,[405,265,285,244.2],"Push's 265 − 20 (goods) − 16.2 (machinery net) = 228.8; Shove's 140 is eliminated (part is in the consolidated reserves).",3);
nm(6,"Case 2",C2F+"\n\nWhat are the consolidated long-term loans (liabilities) (€ thousand)?",40,[170,130,300,0],"170 − 130 = 40.",3);
nm(6,"Case 2",C2F+"\n\nWhat are the consolidated trade payables (€ thousand)?",255,[380,210,170,505],"210 + 170 − 125 = 255.",3);
nm(6,"Case 2",C2F+"\n\nWhat is the consolidated total equity, including NCI (€ thousand)?",1238.8,[1533.8,1128.8,1105,1348.8],"Shares 840 + retained earnings 228.8 + consolidated reserves 60 + NCI 110 = 1,238.8.",3);
nm(6,"Case 2",C2F+"\n\nWhat are the consolidated total liabilities (€ thousand)?",295,[380,170,550,210],"Long-term loans 40 + trade payables 255 = 295. Check: equity 1,238.8 + liabilities 295 = 1,533.8.",3);
vf(6,"In Case 2, Shove is a subsidiary because Push holds 75%.",true,"150,000 of 200,000 shares.");
vf(6,"In Case 2, goodwill is computed on the equity of Shove at 31.08.X3.",false,"Goodwill uses the equity at the acquisition date (1 September X1).",2);
vf(6,"In Case 2, the unrealised profit on the goods reduces Shove's retained earnings.",false,"Push is the seller: it reduces Push's retained earnings by 20.",2);
vf(6,"In Case 2, the loan of 130 from Push to Shove disappears from the consolidated balance sheet (asset and liability).",true,"Intragroup balance eliminated on both sides.");
vf(6,"In Case 2, the NCI is 25% of Shove's equity at the consolidation date, fair value included.",true,"(200 + 140 + 100) × 25% = 110.",2);

// typed answers on the cases (full statement included)
tn(6,"Case 1. "+C1ACQ+"\n\nWhat is the equity of B at the acquisition date used in the goodwill calculation, including the fair value adjustment (€)?",420000,"300,000 + 100,000 + 20,000.");
tn(6,"Case 1. A bought 25% of C for €65,000 when C's equity was capital €100,000 + retained earnings €50,000. At 31 December X5, C's retained earnings are €190,000.\n\nWhat is the goodwill of the associate C (€)?",27500,"65,000 − 25% × 150,000 = 27,500.");
tn(6,"Case 1. A bought 25% of C for €65,000 when C's equity was capital €100,000 + retained earnings €50,000. At 31 December X5, C's retained earnings are €190,000.\n\nWhat is the equity investment in C at 31 December X5 (€)?",100000,"65,000 + 25% × 140,000.");
tn(6,"Case 2. "+C2ACQ+"\n\nWhat is Shove's equity at the acquisition date used in the goodwill calculation (€ thousand)?",360,"200 + 60 + 100.");
tn(6,"Case 2. "+C2F+"\n\nWhat is the consolidated retained earnings (in € thousand, one decimal if needed)?",228.8,"265 − 20 − 16.2.",3);

// ===================== More questions, each with its full statement and a difficulty (d: 1 easy, 2 medium, 3 hard) =====================
const lv=(d,f,...a)=>{f(...a);const L=f===ty?TQ:Q;L[L.length-1].d=d};
// ---- 1. Groups & types of investment
lv(1,m,1,"Classification","P owns 35% of the voting rights of T and has a seat on T's board. How is T treated?","An associate, consolidated with the equity method",["A subsidiary, fully consolidated","A joint venture","A simple investment, not consolidated"],"Between 20% and 50% with board representation = significant influence = associate.");
lv(2,m,1,"Classification","P owns 45% of the votes of T and has the power to appoint 3 of the 5 directors, who decide T's policies. How is T treated?","A subsidiary, fully consolidated: P controls the board",["An associate, because 45% is below 50%","A joint venture","A simple investment"],"Control can exist below 50% of the votes when the investor can appoint the majority of the board.");
lv(2,m,1,"Classification","P and Q each own 50% of T, and the statutes require both to agree on every strategic decision. How is T treated by P?","A joint venture, consolidated with the equity method",["A subsidiary, fully consolidated","A simple investment","An associate with control"],"Unanimous consent of the parties = joint control.");
lv(1,m,1,"Classification","P owns 12% of T for investment purposes and has no influence on its decisions. How is T treated?","As a simple investment, not consolidated",["As an associate","As a subsidiary","As a joint venture"],"Below 20% without significant influence.");
// ---- 2. Goodwill & NCI at acquisition
lv(2,m,2,"Goodwill","P buys 60% of S for 9,000. S's equity: capital 4,000, share premium 1,000, reserves 3,000, retained earnings 2,000. What is the goodwill?","3,000",["1,800","3,600","9,000"],"Equity 10,000 × 0.6 = 6,000; 9,000 − 6,000 = 3,000.");
lv(3,m,2,"Goodwill","P buys 60% of S for 9,000. S's equity is capital 4,000 + share premium 1,000 + reserves 3,000 + retained earnings 2,000, and a building of S is undervalued by 2,000. What is the goodwill?","1,800",["3,000","2,400","4,800"],"Equity at fair value = 10,000 + 2,000 = 12,000; 12,000 × 0.6 = 7,200; 9,000 − 7,200 = 1,800.");
lv(3,m,2,"NCI","Same acquisition: P buys 60% of S for 9,000; S's equity at fair value is 12,000 (including a building undervalued by 2,000). What is the NCI at acquisition?","4,800",["4,000","7,200","3,600"],"12,000 × 40% = 4,800.");
lv(3,m,2,"Bargain purchase","P buys 90% of S for 7,000. S's equity is 8,000. What is the result of the purchase and the NCI?","Bargain purchase gain of 200; NCI of 800",["Goodwill of 200; NCI of 800","Bargain purchase gain of 200; NCI of 1,000","Goodwill of 7,000; NCI of 0"],"8,000 × 0.9 = 7,200; 7,000 − 7,200 = −200 (gain). NCI = 10% × 8,000 = 800.");
lv(1,vf,2,"If P pays exactly its percentage of the subsidiary's equity, there is no goodwill and no bargain purchase.",true,"Price − % × equity = 0.");
lv(2,ty,2,"P buys 60% of S for 9,000. S's equity at fair value is 12,000. What is the goodwill?",["1800","1,800"],"9,000 − 0.6 × 12,000 = 1,800.");
lv(2,ty,2,"P buys 90% of S, whose equity is 8,000. What is the NCI at acquisition?",["800"],"8,000 × 10% = 800.");
// ---- 3. Consolidating after the acquisition
lv(3,m,3,"Group reserves","P bought 60% of S when S's equity at fair value was 12,000. At the consolidation date S's equity is 14,500. What are the consolidated reserves from S?","1,500",["2,500","8,700","1,000"],"0.6 × (14,500 − 12,000) = 1,500.");
lv(3,m,3,"NCI","P owns 60% of S, whose equity at the consolidation date is 14,500. What is the NCI?","5,800",["4,800","8,700","1,000"],"14,500 × 40% = 5,800.");
lv(3,m,3,"Consolidated assets","The assets of P and S added together total 110,000, including P's investment of 9,000 in S (60%). The goodwill is 1,800 and a building of S is undervalued by 2,000. No other adjustment. What are the consolidated total assets?","104,800",["110,000","101,000","106,800"],"110,000 − 9,000 (investment) + 1,800 (goodwill) + 2,000 (fair value of the building) = 104,800.");
lv(2,ty,3,"P bought 60% of S when S's equity was 12,000. It is now 14,500. What are the group reserves?",["1500","1,500"],"0.6 × 2,500 = 1,500.");
lv(2,ty,3,"P owns 60% of S, whose equity is now 14,500. What is the NCI?",["5800","5,800"],"14,500 × 0.4.");
lv(3,vf,3,"P owns 60% of S. S's equity falls from 12,000 to 11,000 after the acquisition. The goodwill must be recalculated and reduced.",false,"Goodwill is fixed at the acquisition date. The fall reduces group reserves by 0.6 × 1,000 = 600 and NCI is 40% × 11,000.");
// ---- 4. Internal transactions
lv(2,m,4,"Inventory","P sells goods to its subsidiary S for 1,000 (cost 700). Half of them are still in S's stock at year end. What is the unrealised profit to eliminate?","150",["300","350","500"],"Profit 300 × 50% = 150.");
lv(3,m,4,"Upstream","S (80% owned by P) sells goods to P for 1,000 (cost 700); half are still in P's stock. By how much does the NCI decrease because of this adjustment?","30",["0","60","150"],"Unrealised profit = 300 × 50% = 150, deducted from S's equity: NCI falls by 20% × 150 = 30 and the group's share by 120.");
lv(3,m,4,"Downstream","P (parent) sells goods to its 80% subsidiary S for 1,000 (cost 700); half remain in S's stock. By how much does the NCI change because of this adjustment?","0: the unrealised profit is entirely P's",["It decreases by 30","It decreases by 150","It increases by 30"],"The seller is the parent, so the unrealised profit (150) reduces the group's reserves only; S's equity, and so the NCI, does not change.");
lv(3,m,4,"Machinery","On 1 Jan X1 P sells equipment to its subsidiary S for 50,000 (carrying amount 40,000). Remaining life: 5 years. What is the net reduction of P's profit at 31 Dec X1?","8,000",["10,000","2,000","12,000"],"Unrealised profit 10,000, minus excess depreciation 10,000 / 5 = 2,000 → 8,000.");
lv(3,m,4,"Machinery","On 1 Jan X1 P sells equipment to its subsidiary S for 50,000 (carrying amount 40,000). Remaining life: 5 years. What is the cumulative reduction of consolidated reserves at 31 Dec X2?","6,000",["8,000","4,000","10,000"],"Profit 10,000 − 2 years × 2,000 of excess depreciation = 6,000.");
lv(2,m,4,"Loan","P lends 200,000 to S on 1 April X1 at 6%. What interest expense/revenue between P and S is eliminated for the 9 months to 31 December X1?","9,000",["12,000","6,000","1,000"],"200,000 × 6% × 9 / 12 = 9,000.");
lv(1,vf,4,"An intragroup loan is eliminated against the matching liability in the consolidated balance sheet.",true,"Assets and liabilities between group entities cancel out.");
lv(2,ty,4,"P sells goods to S for 1,000 (cost 700); 50% remain in stock. What is the unrealised profit?",["150"],"300 × 50%.");
lv(3,ty,4,"On 1 Jan X1 P sells equipment to S for 50,000 (carrying amount 40,000), remaining life 5 years. What is the net reduction of profit at 31 Dec X1?",["8000","8,000"],"10,000 − 2,000.");
lv(2,ty,4,"P lends 200,000 to S at 6% on 1 April X1. What interest is eliminated for 9 months?",["9000","9,000"],"200,000 × 6% × 9/12.");
// ---- 5. Equity method
lv(3,m,5,"Goodwill","P buys 30% of A for 500,000 when A's equity is 1,400,000. What is the goodwill of the associate?","80,000",["500,000","420,000","150,000"],"0.3 × 1,400,000 = 420,000; 500,000 − 420,000 = 80,000.");
lv(3,m,5,"Equity method","P bought 30% of A for 500,000 when A's equity was 1,400,000. A's equity is now 1,900,000. What is the investment in A under the equity method?","650,000",["570,000","500,000","1,900,000"],"500,000 + 0.3 × (1,900,000 − 1,400,000) = 650,000.");
lv(3,m,5,"Equity method","P bought 30% of A for 500,000 when A's equity was 1,400,000. A's equity has since fallen to 1,200,000. What is the investment in A under the equity method?","440,000",["560,000","500,000","360,000"],"500,000 + 0.3 × (1,200,000 − 1,400,000) = 500,000 − 60,000 = 440,000.");
lv(2,ty,5,"P buys 30% of A for 500,000 when A's equity is 1,400,000. What is the goodwill?",["80000","80,000"],"500,000 − 420,000.");
lv(2,ty,5,"P bought 30% of A when A's equity was 1,400,000; it is now 1,900,000. What is P's share of the post-acquisition profit?",["150000","150,000"],"0.3 × 500,000.");

// ===================== Key terms (definition cards and generated questions) =====================
// [part, category, c=concept / p=person, term, definition, accepted variants]
const FACTS=[
[1,"grp","c","Group (IFRS)","A parent and all its subsidiaries"],
[1,"grp","c","Consolidated financial statements","Statements presenting the financial and economic position of a group as if it were a single entity","CFS"],
[1,"grp","c","Separate financial statements","Financial statements corresponding to a single company"],
[1,"grp","c","Subgroup exemption","A parent that is itself a wholly-owned subsidiary does not have to prepare consolidated statements"],
[1,"inv","c","Subsidiary","An entity controlled by another entity (the parent), usually with more than 50% of the voting power"],
[1,"inv","c","Control","The power to govern the financial and operating policies of an entity, presumed when more than 50% of the voting rights are held"],
[1,"inv","c","Associate","An entity over which the investor has significant influence but not control, usually between 20% and 50% of the votes"],
[1,"inv","c","Joint venture","A contractual arrangement where two or more parties share joint control over an economic activity"],
[1,"inv","c","Simple investment","A stake below 20% of the votes that gives no significant influence and is not consolidated","Trade investment"],
[1,"inv","c","Significant influence","The power to participate in the financial and operating policy decisions of an investee without controlling them"],
[1,"inv","c","Joint control","The contractually agreed sharing of control, where key decisions need the unanimous consent of the parties"],
[2,"fc","c","Full consolidation","Method that adds 100% of the assets, liabilities, income and cash flows of a subsidiary to those of the parent"],
[2,"fc","c","Equity method","Method where the investment is recognised at cost and updated for the investor's share of post-acquisition earnings"],
[2,"fc","c","Goodwill","Excess of the price paid over the parent's share of the subsidiary's equity at acquisition"],
[2,"fc","c","Gain from a bargain purchase","Excess of the parent's share of the subsidiary's equity over the price paid, recognised in profit or loss","Badwill"],
[2,"fc","c","Non-controlling interests (NCI)","Equity in a subsidiary not attributable, directly or indirectly, to the parent","NCI;minority interests"],
[2,"fc","c","Investment-Equity adjustment","The consolidation adjustment that eliminates the parent's investment against the subsidiary's equity"],
[2,"fc","c","Fair value adjustment","Increase or decrease of the subsidiary's assets to their fair value at acquisition, added to its equity before computing goodwill and NCI"],
[3,"post","c","Consolidated reserves","Parent's share of the change in the subsidiary's equity since acquisition","Group reserves"],
[3,"post","c","NCI at the consolidation date","NCI % of the subsidiary's equity at the consolidation date, after the internal transaction adjustments"],
[4,"int","c","Unrealised profit","Profit on an intragroup sale on goods or assets that are still held within the group"],
[4,"int","c","Intragroup balances","Loans, receivables and payables between group companies, eliminated in consolidation"],
[4,"int","c","Excess depreciation","Extra depreciation recorded by the buyer on the unrealised profit of an intragroup asset sale"],
[4,"int","c","Upstream sale","A sale from the subsidiary to the parent: the unrealised profit reduces the subsidiary's equity, and therefore NCI too"],
[4,"int","c","Downstream sale","A sale from the parent to the subsidiary: the unrealised profit reduces the parent's retained earnings only"],
[5,"eq","c","Equity investment","Value of the investment in an associate after adding the investor's share of post-acquisition earnings"],
[5,"eq","c","Goodwill of an associate","Included in the equity-method investment and only disclosed in the notes"],
[5,"eq","c","Impairment loss","A reduction of the carrying amount of goodwill or of an equity-method investment when its value falls"]
];

return {id:"compta2",title:"Quiz compta 2",kw:"comptabilité compta consolidation consolidée consolidation financial statements goodwill NCI equity method associate subsidiary filiale analyse financière finance accounting quiz compta 2",subject:"Consolidation of financial statements: groups, full consolidation, internal transactions and equity method",lang:"en",sess:SESS,tags:TAGS,unit:["part","parts","a part"],balance:true,Q,TQ,facts:FACTS};
})();
