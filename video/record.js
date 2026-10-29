// Records the Tipoki presentation video (v3): node video/record.js <en|fr> <outdir>
// Needs the repo served on http://localhost:8765 and Playwright. Stage = video/stage.html, phones = the real site in iframes.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const LANG=process.argv[2]||'en',OUT=path.resolve(process.argv[3]||'out');fs.mkdirSync(OUT,{recursive:true});
const MOCK=fs.readFileSync(path.join(__dirname,'mock-sb.js'),'utf8');
const T={en:{
 intro:['Study by *beating* your *friends.*','Tipoki · the quiz game that makes you revise'],
 pick:['Pick *what* to *revise*','One quiz, split in parts. Tap the ones you need.','01 · PICK'],
 modes:['Four ways to *study*','Quiz, flashcards, study sheet, exam.',null],
 lvl:['Choose your *level*','Easy, medium, hard, or climbing.','02 · QUIZ'],
 streak:['Fast and right *scores*','Chain good answers to build a streak.',null],
 cards:['*Flashcards* that adapt','"Got it" or "Not yet". Misses come back soon.','03 · FLASHCARDS'],
 sheet:['The course on *one sheet*','Key ideas, formulas, examples. PDF too.',null],
 exam:['A real *exam*','One clock. A grade out of 20.','04 · EXAM'],
 nolim:['Or *no time limit*','Prefer to take your time? Counts up instead.',null],
 multi:['Challenge your *friends*','Share a code. Everyone plays on their phone.','05 · MULTIPLAYER'],
 board:['Fastest *brain* wins','Live leaderboard after every question.',null],
 end:['','Pick a quiz. Beat your friends. Revise.','FREE · NO SIGN-UP']},
fr:{
 intro:['Révise en *battant* tes *potes.*','Tipoki · le jeu de quiz qui fait réviser'],
 pick:['Choisis *quoi* réviser','Un quiz découpé en parties. Touche celles qu\'il te faut.','01 · CHOISIS'],
 modes:['Quatre façons de *réviser*','Quiz, flashcards, fiche de synthèse, examen.',null],
 lvl:['Choisis ton *niveau*','Facile, moyen, difficile ou progressif.','02 · QUIZ'],
 streak:['Rapide et juste *rapporte*','Enchaîne les bonnes réponses pour faire une série.',null],
 cards:['Des *flashcards* qui s\'adaptent','« Je sais » ou « Pas encore ». Les ratées reviennent vite.','03 · FLASHCARDS'],
 sheet:['Le cours sur *une fiche*','Idées clés, formules, exemples. PDF aussi.',null],
 exam:['Un vrai *examen*','Un seul chrono. Une note sur 20.','04 · EXAMEN'],
 nolim:['Ou *sans limite* de temps','Tu préfères prendre ton temps ? Le chrono compte en croissant.',null],
 multi:['Défie tes *potes*','Partage un code. Chacun joue sur son téléphone.','05 · MULTIJOUEUR'],
 board:['Le plus *rapide* gagne','Classement en direct après chaque question.',null],
 end:['','Choisis un quiz. Bats tes potes. Révise.','GRATUIT · SANS INSCRIPTION']}}[LANG];
const K=0.45,rs=ms=>new Promise(r=>setTimeout(r,ms)),sleep=ms=>rs(ms*K); // K tightens every pause; rs() is a real-time pause
(async()=>{
 const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:1280,height:720},deviceScaleFactor:1,recordVideo:{dir:OUT,size:{width:1280,height:720}}});
 await ctx.route(/_vercel/,r=>r.fulfill({contentType:'text/javascript',body:''}));
 await ctx.route(/supabase-js/,r=>r.fulfill({contentType:'text/javascript',body:MOCK}));
 await ctx.addInitScript(l=>{try{localStorage.setItem('tpk-lang',l);localStorage.setItem('tpk-theme','light')}catch(e){}},LANG);
 const p=await ctx.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('http://localhost:8765/video/stage.html');await p.waitForTimeout(1200);
 const t0=Date.now();
 const E=(f,...a)=>p.evaluate(f,...a);
 const say=(k,c,sm)=>(console.log('T',k,((Date.now()-t0)/1000).toFixed(1)),0)||E(([h,s,pl,c,sm])=>say(h,s,pl,c,sm),[T[k][0],T[k][1],T[k][2]||null,!!c,!!sm]);
 const fr=async id=>(await (await p.$('#'+id)).contentFrame());
 const load=async(id,url)=>{await E(([i,u])=>load(i,u),[id,url]);await sleep(1000);return fr(id)};
 const reset=()=>E(()=>{const l=localStorage.getItem('tpk-lang');localStorage.clear();localStorage.setItem('tpk-lang',l)});
 // scripted answer in a game frame; the pause before clicking is on purpose, so the viewer can read the question
 const ans=async(f,right=true,read=2200)=>{
   await f.waitForSelector('#question:not([hidden])',{timeout:8000});await rs(read);
   await f.evaluate(right=>{const it=G.deck[G.qi];if(isT(G.qi)){$('qInput').value=right?TQ[it.t].a[0]:'zzz';sendTyped()}else{const k=it.o.indexOf(0);const tiles=[...$('qTiles').children];tiles[right?k:(k+1)%tiles.length].click()}},right);
   await E(()=>punch('pA'));await rs(1700)};
 const jsClick=(f,id)=>f.evaluate(i=>document.getElementById(i).click(),id);
 const mode=async(f,id)=>{if(await f.isVisible('#modeBack')){await jsClick(f,'modeBack');await sleep(900)}await jsClick(f,id)};
 const nextQ=async f=>{await f.waitForSelector('#rNext:not([hidden])',{timeout:6000});await f.click('#rNext');await sleep(600)};
 const A={x:790,y:0,r:0,ry:-10,s:1};
 E(()=>progress(60000));
 // ---------- intro
 await E(()=>{logo(true);burst(640,320,30)});await sleep(400);await E(()=>{flash();shake()});await sleep(1300);
 await E(()=>{$('logo').animate([{opacity:1,transform:'none'},{opacity:0,transform:'scale(.6) translateY(-200px)'}],{duration:400,fill:'forwards'})});
 await say('intro',true);await rs(2400);
 // ---------- 01 pick
 const fa=load('fA','/');
 await say('pick');await E(()=>num('01'));await sleep(500);
 await E(a=>fly('pA',{x:1400,y:30,r:25},a,800),A);const fA=await fa;
 await sleep(1500);
 await fA.locator('#quizGrid .qcard').first().click();await sleep(2600);
 // showcase: tap a few parts
 for(const i of [1,2]){await fA.locator('#scGrid > *').nth(i).click().catch(()=>{});await sleep(900)}
 // ---------- modes dock
 await say('modes');await rs(2400);
 // ---------- 02 quiz + level
 await say('lvl');await E(()=>num('02'));
 await fA.click('#playTab');await sleep(1500);
 for(const i of [1,3,4]){await fA.locator('#diffChips .chip').nth(i).click();await sleep(900)}
 await fA.locator('#lenChips .chip').nth(0).click();await sleep(500);
 await fA.fill('#nick','Alex');await sleep(500);await fA.click('#soloBtn');
 await ans(fA,true);await E(()=>chip('<b>+972</b> pts',650,250));await say('streak');await sleep(900);await nextQ(fA);
 await ans(fA,true);await E(()=>chip('STREAK <b>×2</b>',1090,150));await sleep(900);await nextQ(fA);
 // ---------- 03 flashcards + sheet
 await say('cards');await E(()=>num('03'));
 const fb=load('fB','/?quiz=socio');
 await load('fA','/?quiz=socio');const FA=await fr('fA');
 await mode(FA,'cardsJump');await sleep(1800);
 await FA.click('#fcGo');await sleep(1500);
 for(const g of ['#fcGot','#fcAgain','#fcGot']){await sleep(1200);await FA.click('#fcFlip');await sleep(1500);await FA.click(g);await E(t=>chip(t,690,300+Math.random()*100),g==='#fcGot'?'Got it ✓':'<b>Not yet</b> ↺');await sleep(800)}
 await say('sheet',false,true);
 const FB=await fb;await mode(FB,'sheetCard');await sleep(700);
 await E(()=>fly('pA',{x:790,y:0,r:0,ry:-10},{x:610,y:20,r:-4,ry:14,s:.96},800));
 await E(()=>fly('pB',{x:1400,y:0,r:30},{x:940,y:20,r:4,ry:-14,s:.96},700,'cubic-bezier(.5,0,.8,.4)'));
 await E(()=>{flash();shake();burst(780,350,34)});
 await FB.evaluate(()=>setTimeout(()=>{const t=document.querySelector('.dc-toc');t&&t.scrollIntoView({behavior:'smooth',block:'start'})},900));await rs(2800);
 // ---------- 04 exam
 await say('exam');await E(()=>num('04'));
 await E(()=>fly('pB',{x:940,y:20,r:4,ry:-14,s:.96},{x:1500,y:80,r:30,s:.9},500,'ease-in'));
 await E(()=>fly('pA',{x:610,y:20,r:-4,ry:14,s:.96},{x:790,y:0,r:0,ry:-10,s:1},700));
 await load('fA','/?quiz=socio');const XA=await fr('fA');
 await mode(XA,'examJump');await sleep(1800);
 await XA.locator('#exLenChips .chip').nth(0).click();await sleep(600);
 await XA.locator('#exPaceChips .chip').nth(2).click();await sleep(1200);
 await say('nolim');await XA.locator('#exPaceChips .chip').nth(0).click();await sleep(1800);
 await XA.click('#exGo');await sleep(1800);
 for(let i=0;i<3;i++){await rs(1000);await XA.evaluate(w=>{const d=EX.deck[EX.i];if(d.t!=null){const e=document.getElementById('exInput');e.value=w?'x':TQ[d.t].a[0];e.dispatchEvent(new Event('input',{bubbles:true}))}else{const k=d.o.indexOf(0);const ts=[...document.querySelectorAll('#exTiles button')];ts[w?(k+1)%ts.length:k].click()}},i===1);await rs(600);await XA.click('#exNext');await sleep(400)}
 await E(()=>{burst(900,300,20)});await sleep(1200);
 // ---------- 05 multiplayer
 await say('multi',false,true);await E(()=>num('05'));
 await reset();await load('fA','/?quiz=socio');const MA=await fr('fA');
 await E(()=>fly('pA',{x:790,y:0,r:0,ry:-10},{x:610,y:20,r:-2,ry:12},600));
 await load('fB','/');const MB=await fr('fB');
 await E(()=>{fly('pB',{x:1400,y:0,r:20},{x:940,y:30,r:3,ry:-12},800)});await sleep(1000);
 await MB.fill('#nick','Lea');await MB.click('#codeIn');await MB.type('#codeIn','KTRM',{delay:260});await sleep(800);
 await MA.fill('#nick','Alex');await MA.locator('#lenChips .chip').nth(0).click();await MA.click('#createBtn');await sleep(1200);
 const code=(await MA.textContent('#lobbyCode')).trim();
 for(const [i,n] of ['Lea','Noah','Inès','Max'].entries()){await MA.evaluate(([c,i,n])=>__addPlayer(c,'f'+i,n),[code,i,n]);await E(([n,i])=>chip('👋 <b>'+n+'</b> joined',560,120+i*70),[n,i]);await sleep(900)}
 await MA.click('#lobbyStart');await sleep(600);
 await MA.waitForSelector('#question:not([hidden])');await sleep(2800);
 await MA.evaluate(async c=>{const it=G.deck[G.qi];if(isT(G.qi))return;const k=it.o.indexOf(0),w=(k+1)%4;
   [['f0',k,2100],['f1',k,3400],['f2',w,2600]].forEach(([id,cc,ms])=>__setAns(c,id,{[G.qi]:{c:cc,ms}}));
   const tiles=[...$('qTiles').children];tiles[k].click()},code);
 await rs(1200);await E(()=>chip('⚡ <b>2.1 s</b>',650,560));await say('board',false,true);
 await MA.evaluate(()=>writeGame({status:'reveal'}));await sleep(1500);
 await MA.evaluate(()=>document.querySelector('.board').scrollIntoView({behavior:'smooth',block:'start'}));await rs(2800);
 // ---------- outro
 await E(()=>{fly('pA',{x:610,y:20,r:-2,ry:12},{x:-500,y:40,r:-20},600,'ease-in');fly('pB',{x:940,y:30,r:3,ry:-12},{x:1500,y:40,r:20},600,'ease-in')});
 await sleep(500);await E(()=>{wipe();shake()});await sleep(400);
 await E(()=>{$('num')&&$('num').remove();logo(true);burst(640,360,40)});
 await say('end',true);await E(()=>{$('logo').style.top='22%'});await rs(3200);
 const secs=(Date.now()-t0)/1000;fs.writeFileSync(path.join(OUT,'meta.json'),JSON.stringify({secs}));
 const v=p.video();await ctx.close();await b.close();console.log('done',secs,await v.path());
})().catch(e=>{console.error(e);process.exit(1)});
