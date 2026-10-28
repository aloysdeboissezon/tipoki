// Checks the quiz "compta2" against the official solutions of the course (assignments 1–5, Cases 1 & 2, slides).
// Usage: node tools/check-compta2.js   (exits with code 1 if something is wrong)
global.window={};require('../js/banks/compta2.js');
const B=window.BANK_COMPTA2;let fail=0;
const find=(...subs)=>B.Q.filter(q=>!q.tf&&subs.every(s=>(q.t+' '+q.q).includes(s)));
const ok=(label,subs,expected)=>{
  const hits=find(...subs);
  if(!hits.length){console.log('MISSING',label);fail++;return}
  for(const q of hits)if(q.o[0]!==expected){console.log('WRONG',label,'→',q.o[0],'expected',expected,'|',q.q.slice(-90));fail++}
};
// structure
B.Q.forEach((q,i)=>{if(!q.tf&&new Set(q.o).size!==4){console.log('BAD OPTIONS',i,q.q.slice(0,70));fail++}if(![1,2,3].includes(q.d)){console.log('NO LEVEL',i);fail++}});
B.TQ.forEach((q,i)=>{if(!q.a||!q.a.length||![1,2,3].includes(q.d)){console.log('BAD TYPED',i);fail++}});
// assignments 1–2 (acquisition date) and 3–5 (after acquisition): [exercise, question end, official answer]
const EX=[
 ['Exercise 1 —','Compare the price','A gain from a bargain purchase of 300'],['Exercise 1 —','What are the consolidated total assets','6,010'],
 ['Exercise 2 —','Compare the price','A gain from a bargain purchase of 475'],['Exercise 2 —','What is the NCI at the acquisition date','975'],['Exercise 2 —','What are the consolidated total assets','16,900'],
 ['Exercise 3 —','Compare the price','Goodwill of 50'],['Exercise 3 —','What is the NCI at the consolidation date','975'],['Exercise 3 —','What are the consolidated (group) reserves','525'],['Exercise 3 —','What are the consolidated total assets','16,950'],
 ['Exercise 4 —','Compare the price','Goodwill of 80'],['Exercise 4 —','What is the NCI at the consolidation date','1,132'],['Exercise 4 —','What are the consolidated (group) reserves','498'],['Exercise 4 —','What are the consolidated total assets','13,920'],
 ['Exercise 5 —','Compare the price','Goodwill of 16'],['Exercise 5 —','What is the NCI at the consolidation date','32'],['Exercise 5 —','What are the consolidated (group) reserves','−16'],['Exercise 5 —','What are the consolidated total assets','616'],
 ['Slide example 6','Compare the price','Goodwill of 4,120'],['Slide example 6','What is the NCI at the acquisition date','4,920'],['Slide example 6','What is the NCI at the consolidation date','5,430'],['Slide example 6','What are the consolidated (group) reserves','1,190']
];
EX.forEach(([e,a,x])=>ok(e+' '+a,[e,a],x));
// slide examples 1–5 (Company A buys Company B): [price, %, expected classification line]
const SL=[['7,200','100%','Goodwill of 1,300'],['4,500','100%','A gain from a bargain purchase of 1,400'],['7,200','80%','Goodwill of 2,480'],['4,100','75%','A gain from a bargain purchase of 325']];
SL.forEach(([pr,p,x])=>ok('slide '+pr+' '+p,['Company A buys '+p+' of the shares of Company B for €'+pr,'retained earnings 1,400.','What does the Investment-Equity adjustment show'],x));
ok('slide 5 goodwill',['undervalued by 150','What does the Investment-Equity adjustment show'],'Goodwill of 2,360');
ok('slide 3 NCI',['buys 80% of the shares of Company B for €7,200','legal reserves 2,500, retained earnings 1,400.','What is the NCI at the acquisition date?'],'1,180');
ok('slide 4 NCI',['buys 75% of the shares of Company B for €4,100','What is the NCI at the acquisition date?'],'1,475');
ok('slide 5 NCI',['undervalued by 150','What is the NCI at the acquisition date?'],'1,210');
// internal transactions
ok('inv 150',['sells to B inventories for €500 with a profit of €150','All the goods are still','unrealised profit to eliminate'],'150');
ok('inv 60',['sells to B inventories for €500 with a profit of €150','60% of the goods were resold','unrealised profit to eliminate'],'60');
ok('land 90k',['sells 3 pieces of land','All the pieces are still held','unrealised profit (€)'],'90,000');
ok('land 60k',['sells 3 pieces of land','resold 1 of them','unrealised profit (€)'],'60,000');
ok('machine 48k',['sells a machine to A (same group) for €120,000','31 December X1','reduced at the consolidation date'],'48,000');
ok('loan 1m',['€350,000','1 month of interest','eliminated between'],'1,458.33');
ok('loan 10m',['€350,000','10 months of interest','eliminated between'],'14,583.33');
// equity method
ok('assoc goodwill 20k',['40% of the shares of A for €340,000','What is the goodwill of the associate'],'20,000');
ok('assoc share 120k',['40% of the shares of A for €340,000','post-acquisition change'],'120,000');
ok('assoc value 460k',['40% of the shares of A for €340,000','carrying amount of the investment'],'460,000');
ok('C goodwill',['25% of the shares of C for €65,000','What is the goodwill of the associate'],'27,500');
ok('C share',['25% of the shares of C for €65,000','post-acquisition change'],'35,000');
ok('C value',['25% of the shares of C for €65,000','carrying amount of the investment'],'100,000');
// Case 1 and Case 2
ok('C1 goodwill',['Case 1','What is the goodwill (€)?'],'114,000');
ok('C1 NCI',['Case 1','What is the NCI at 31 December X5 (€)?'],'78,800');
ok('C1 reserves',['Case 1','consolidated reserves arising from B (€)?'],'−20,800');
ok('C1 TA',['Case 1','What are the consolidated total assets (€)?'],'2,813,000');
ok('C1 PPE',['Case 1','consolidated PPE'],'1,485,000');
ok('C1 inventories',['Case 1','consolidated inventories'],'783,000');
ok('C1 RE A',['Case 1','retained earnings of A'],'498,000');
ok('C2 goodwill',['Case 2','What is the goodwill (€ thousand)?'],'25');
ok('C2 NCI',['Case 2','What is the NCI at 31 August X3'],'110');
ok('C2 reserves',['Case 2','consolidated reserves arising from Shove (€ thousand)?'],'60');
ok('C2 TA',['Case 2','What are the consolidated total assets (€ thousand)?'],'1,533.8');
ok('C2 RE',['Case 2','consolidated retained earnings'],'228.8');
// every numeric typed answer must also be reachable from its explanation (spot check on a few)
const t=B.TQ.filter(q=>q.q.includes('Case 2. ')&&q.q.includes('consolidated total assets'));
if(!t.length||!t[0].a.includes('1533.8')){console.log('Typed case 2 total assets missing');fail++}
console.log(fail?fail+' problem(s)':'all checks passed ('+B.Q.length+' choice questions, '+B.TQ.length+' typed)');
process.exit(fail?1:0);
