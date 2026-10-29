// Records the Tipoki presentation video: node video/record.js <en|fr> <outdir>
// Needs the repo served on http://localhost:8765 and Playwright. Stage = video/stage.html, phones = the real site in iframes.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const LANG=process.argv[2]||'en',OUT=path.resolve(process.argv[3]||'out');fs.mkdirSync(OUT,{recursive:true});
const MOCK=fs.readFileSync(path.join(__dirname,'mock-sb.js'),'utf8');
const T={en:{
 intro:['Study by *beating* your *friends.*','Tipoki · quizzes that make you want to revise'],
 pick:['Pick *what* to *study*','Search any quiz. Your notes, your course.','1 · PICK'],
 lvl:['Play *solo* at your *level*','Easy, medium, hard, or climbing: it starts easy and ends hard.','2 · SOLO'],
 streak:['Build your *streak*','Fast and right = more points.',null],
 cards:['*Flashcards* that know what you miss','Flip, then "Got it" or "Not yet". Misses come back soon.','3 · FLASHCARDS'],
 sheet:['The whole course, *one sheet*','Key ideas, formulas, examples. Read it, or download the PDF.','+ STUDY SHEET'],
 exam:['Real *exam* mode','Random questions, one clock, a grade out of 20.','4 · EXAM'],
 nolim:['Or *no time limit*','Take your time: the clock counts up.',null],
 grade:['Your *grade* /20','Review every mistake, replay them.',null],
 multi:['Take on your *friends*','Share a code. Everyone plays on their own phone.','5 · MULTIPLAYER'],
 board:['Fastest *brain* wins','Live leaderboard after every question.',null],
 end:['','Pick a quiz. Beat your friends. Revise.','FREE · NO SIGN-UP']},
fr:{
 intro:['Révise en *battant* tes *potes.*','Tipoki · des quiz qui donnent envie de réviser'],
 pick:['Choisis *quoi* réviser','Cherche un quiz. Ton cours, tes notes.','1 · CHOISIS'],
 lvl:['Joue *solo* à ton *niveau*','Facile, moyen, difficile ou progressif : ça commence facile et finit dur.','2 · SOLO'],
 streak:['Fais monter ta *série*','Rapide et juste = plus de points.',null],
 cards:['Des *flashcards* qui savent ce que tu rates','Retourne, puis « Je sais » ou « Pas encore ». Les ratées reviennent vite.','3 · FLASHCARDS'],
 sheet:['Tout le cours sur *une fiche*','Idées clés, formules, exemples. Lis-la ou télécharge le PDF.','+ FICHE DE SYNTHÈSE'],
 exam:['Un vrai mode *examen*','Questions au hasard, un seul chrono, une note sur 20.','4 · EXAMEN'],
 nolim:['Ou *sans limite* de temps','Prends ton temps : le chrono compte en croissant.',null],
 grade:['Ta *note* /20','Relis chaque erreur, rejoue-les.',null],
 multi:['Défie tes *potes*','Partage un code. Chacun joue sur son téléphone.','5 · MULTIJOUEUR'],
 board:['Le plus *rapide* gagne','Classement en direct après chaque question.',null],
 end:['','Choisis un quiz. Bats tes potes. Révise.','GRATUIT · SANS INSCRIPTION']}}[LANG];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:1280,height:720},deviceScaleFactor:1,recordVideo:{dir:OUT,size:{width:1280,height:720}}});
 await ctx.route(/_vercel/,r=>r.fulfill({contentType:'text/javascript',body:''}));
 await ctx.route(/supabase-js/,r=>r.fulfill({contentType:'text/javascript',body:MOCK}));
 await ctx.addInitScript(l=>{try{localStorage.setItem('tpk-lang',l);localStorage.setItem('tpk-theme','light')}catch(e){}},LANG);
 const p=await ctx.newPage();p.on('console',m=>{if(m.type()!=='log'||/tpk|fail|error/i.test(m.text()))console.log('C',m.text())});p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('http://localhost:8765/video/stage.html');await p.waitForTimeout(1200);
 const t0=Date.now();
 const E=(f,...a)=>p.evaluate(f,...a);
 const say=(k,c,sm)=>E(([h,s,pl,c,sm])=>say(h,s,pl,c,sm),[T[k][0],T[k][1],T[k][2]||null,!!c,!!sm]);
 const fr=async id=>(await (await p.$('#'+id)).contentFrame());
 const load=async(id,url)=>{await E(([i,u])=>load(i,u),[id,url]);await sleep(900);return fr(id)};
 // scripted answer in a game frame (solo/multi question screen)
 const ans=async(f,right=true)=>{
   await f.waitForSelector('#question:not([hidden])',{timeout:8000});await sleep(1700);
   await f.evaluate(right=>{const it=G.deck[G.qi];if(isT(G.qi)){$('qInput').value=right?TQ[it.t].a[0]:'zzz';sendTyped()}else{const k=it.o.indexOf(0);const tiles=[...$('qTiles').children];tiles[right?k:(k+1)%tiles.length].click()}},right);
   await sleep(1600)};
 const nextQ=async f=>{await f.waitForSelector('#rNext:not([hidden])',{timeout:6000});await f.click('#rNext');await sleep(500)};
 const scrollTo=async(f,sel)=>{await f.evaluate(s=>document.querySelector(s).scrollIntoView({behavior:'smooth',block:'start'}),sel);await sleep(900)};
 const A={x:790,y:0,r:0,s:1};
 E(()=>progress(92000));
 // ---------- intro
 await E(()=>{logo(true);burst(640,320,30)});await sleep(300);await E(()=>{flash();shake()});await sleep(1100);
 await E(()=>{$('logo').animate([{opacity:1,transform:'none'},{opacity:0,transform:'scale(.6) translateY(-200px)'}],{duration:400,fill:'forwards'})});
 await say('intro',true);await sleep(2600);
 // ---------- 1 pick
 const fa=load('fA','/');
 await E(()=>{say&&0});await say('pick');await E(()=>{tiles()});await sleep(500);
 await E(a=>fly('pA',{x:1400,y:30,r:25},a,800),A);const fA=await fa;
 await sleep(900);
 await fA.click('#quizSearch');await fA.type('#quizSearch','soc',{delay:160});await sleep(700);
 await fA.fill('#quizSearch','');await sleep(300);
 await fA.locator('#quizGrid .qcard').first().click();await sleep(1000);
 // ---------- 2 solo + difficulty
 await say('lvl');await scrollTo(fA,'#createPanel');
 for(const i of [1,2,3,4]){await fA.locator('#diffChips .chip').nth(i).click();await sleep(450)}
 await fA.locator('#lenChips .chip').nth(0).click();await sleep(300);
 await fA.fill('#nick','Alex');await fA.click('#soloBtn');
 await ans(fA,true);await E(()=>chip('<b>+972</b> pts',690,250));await say('streak');await nextQ(fA);await ans(fA,true);await E(()=>chip('STREAK <b>×3</b>',1080,140));await nextQ(fA);await ans(fA,false);await nextQ(fA);await ans(fA,true);
 await E(()=>{burst(900,300,26);shake()});await sleep(1200);
 // ---------- 3 flashcards + sheet (collision)
 await say('cards');
 const fb=load('fB','/?quiz=socio');
 await load('fA','/?quiz=socio');
 await E(()=>fly('pA',{x:790,y:0,r:0},{x:790,y:0,r:0},1));
 await scrollTo(await fr('fA'),'#cardsPanel');
 const FA=await fr('fA');await FA.click('#fcGo');await sleep(800);
 for(const g of ['#fcGot','#fcAgain','#fcGot']){await FA.click('#fcFlip');await sleep(900);await FA.click(g);await E(t=>chip(t,700,300+Math.random()*120),g==='#fcGot'?'Got it ✓':'<b>Not yet</b> ↺');await sleep(500)}
 // sheet phone B crashes into A
 await say('sheet',false,true);
 const FB=await fb;await FB.waitForSelector('#sheetPanel:not([hidden])',{timeout:8000}).catch(()=>{});
 await E(()=>fly('pA',{x:790,y:0,r:0},{x:610,y:20,r:-4,ry:14,s:.96},700));
 await E(()=>fly('pB',{x:1400,y:0,r:30},{x:940,y:20,r:4,ry:-14,s:.96},650,'cubic-bezier(.5,0,.8,.4)'));
 await E(()=>{flash();shake();burst(780,350,34)});
 await FB.evaluate(()=>document.querySelector('#sheetPanel').scrollIntoView({block:'start'}));await sleep(1200);
 await FB.click('#sheetOpen').catch(()=>{});await sleep(2200);
 // ---------- 4 exam
 await say('exam');
 await E(()=>fly('pB',{x:940,y:20,r:4,ry:-14,s:.96},{x:1500,y:80,r:30,s:.9},500,'ease-in'));
 await E(()=>fly('pA',{x:610,y:20,r:-4,ry:14,s:.96},{x:790,y:0,r:0,s:1},600));
 await load('fA','/?quiz=socio');const XA=await fr('fA');
 await scrollTo(XA,'#examPanel');
 await XA.locator('#exLenChips .chip').nth(0).click();await sleep(400);
 await XA.locator('#exPaceChips .chip').nth(2).click();await sleep(800);
 await say('nolim');await XA.locator('#exPaceChips .chip').nth(0).click();await sleep(1200);
 await XA.click('#exGo');await sleep(1200);
 for(let i=0;i<6;i++){await XA.evaluate(w=>{const d=EX.deck[EX.i];if(d.t!=null){const e=document.getElementById('exInput');e.value=w?'x':TQ[d.t].a[0];e.dispatchEvent(new Event('input',{bubbles:true}))}else{const k=d.o.indexOf(0);const ts=[...document.querySelectorAll('#exTiles button')];ts[w?(k+1)%ts.length:k].click()}},i===2);await sleep(750);await XA.click('#exNext');await sleep(450)}
 await say('grade');await XA.click('#exSubmit');await sleep(500);await XA.click('#exConfirmOk').catch(()=>{});await sleep(1800);
 await E(()=>{burst(900,300,26)});await sleep(1500);
 // ---------- 5 multiplayer
 await say('multi',false,true);
 await E(()=>{const l=localStorage.getItem('tpk-lang');localStorage.clear();localStorage.setItem('tpk-lang',l)});await load('fA','/?quiz=socio');const MA=await fr('fA');
 await E(()=>fly('pA',{x:790,y:0,r:0},{x:610,y:20,r:-2,ry:12},500));
 await load('fB','/');const MB=await fr('fB');
 await E(()=>{fly('pB',{x:1400,y:0,r:20},{x:940,y:30,r:3,ry:-12},700)});await sleep(800);
 await MB.fill('#nick','Lea');await MB.click('#codeIn');await MB.type('#codeIn','KTRM',{delay:260});await sleep(500);
 await MA.fill('#nick','Alex');await MA.locator('#lenChips .chip').nth(0).click();await MA.click('#createBtn');await sleep(1000);
 const code=(await MA.textContent('#lobbyCode')).trim();
 for(const [i,n] of ['Lea','Noah','Inès','Max'].entries()){await MA.evaluate(([c,i,n])=>__addPlayer(c,'f'+i,n),[code,i,n]);await E(([n,i])=>chip('👋 <b>'+n+'</b> joined',560,120+i*70),[n,i]);await sleep(600)}
await p.screenshot({path:'/tmp/claude-0/-home-claude-tipoki/6991bf9c-3e70-51f6-a6f8-e536654e7812/scratchpad/dbg2.png'});console.log(await MA.evaluate(()=>[document.querySelector('#createErr').textContent,document.querySelector('#lobby').hidden,document.querySelector('#lobbyStart').hidden,String(isHost()),location.href]));
 await MA.click('#lobbyStart');await sleep(600);
 await MA.waitForSelector('#question:not([hidden])');await sleep(1800);
 await MA.evaluate(async c=>{const it=G.deck[G.qi];if(isT(G.qi))return;const k=it.o.indexOf(0),w=(k+1)%4;
   [['f0',k,2100],['f1',k,3400],['f2',w,2600]].forEach(([id,cc,ms])=>__setAns(c,id,{[G.qi]:{c:cc,ms}}));
   const tiles=[...$('qTiles').children];tiles[k].click()},code);
 await sleep(1500);await E(()=>chip('⚡ <b>2.1 s</b>',650,560));await say('board',false,true);
 await MA.evaluate(()=>writeGame({status:'reveal'}));await sleep(1200);
 await scrollTo(MA,'.board');await sleep(2800);
 // ---------- outro
 await E(()=>{fly('pA',{x:610,y:20,r:-2,ry:12},{x:-500,y:40,r:-20},600,'ease-in');fly('pB',{x:940,y:30,r:3,ry:-12},{x:1500,y:40,r:20},600,'ease-in')});
 await sleep(500);await E(()=>{tiles();flash();shake()});await sleep(500);
 await E(()=>{logo(true);burst(640,360,40)});
 await say('end',true);await E(()=>{$('logo').style.top='24%'});await sleep(4200);
 const secs=(Date.now()-t0)/1000;fs.writeFileSync(path.join(OUT,'meta.json'),JSON.stringify({secs,lead:1.2}));
 const v=p.video();await ctx.close();await b.close();console.log('done',secs,await v.path());
})().catch(e=>{console.error(e);process.exit(1)});
