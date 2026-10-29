// Captures real-site stills for the video renderer: node video/capture.js <en|fr> <outdir>
// Needs the repo served on http://localhost:8765. Supabase is replaced by video/mock-sb.js.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const LANG=process.argv[2]||'en',OUT=path.resolve(process.argv[3]||'shots');fs.mkdirSync(OUT,{recursive:true});
const MOCK=fs.readFileSync(path.join(__dirname,'mock-sb.js'),'utf8');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 await ctx.route(/_vercel/,r=>r.fulfill({contentType:'text/javascript',body:''}));
 await ctx.route(/supabase-js/,r=>r.fulfill({contentType:'text/javascript',body:MOCK}));
 await ctx.addInitScript(l=>{try{localStorage.setItem('tpk-lang',l);localStorage.setItem('tpk-theme','light')}catch(e){}},LANG);
 const p=await ctx.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
 const shot=async n=>{await sleep(500);await p.screenshot({path:path.join(OUT,n+'.png')});console.log('shot',n)};
 const js=id=>p.evaluate(i=>document.getElementById(i).click(),id);
 await p.goto('http://localhost:8765/');await sleep(1500);await shot('home');
 await p.locator('#quizGrid > *').first().click();await sleep(1000);await shot('menu');
 await p.locator('#modeTabs').screenshot({path:path.join(OUT,'tiles.png')});
 // quiz: question + reveal
 await js('playTab');await sleep(900);await shot('settings');
 await p.fill('#nick','Alex');await p.locator('#lenChips .chip').nth(0).click();await js('soloBtn');
 await p.waitForSelector('#question:not([hidden])');await sleep(2200);await shot('question');
 await p.evaluate(()=>{const k=G.deck[G.qi].o.indexOf(0);[...$('qTiles').children][k].click()});await sleep(900);await shot('reveal');
 await p.evaluate(()=>{window.scrollTo(0,0)});
 // flashcards
 await p.goto('http://localhost:8765/?quiz=socio');await sleep(1200);
 await js('modeBack');await sleep(700);await js('cardsJump');await sleep(900);await js('fcGo');await sleep(1200);await shot('card-front');
 await js('fcFlip');await sleep(900);await shot('card-back');
 // study sheet
 await p.goto('http://localhost:8765/?quiz=socio');await sleep(1200);
 await js('modeBack');await sleep(700);await js('sheetCard');await sleep(1500);await shot('sheet');
 // exam
 await p.goto('http://localhost:8765/?quiz=socio');await sleep(1200);
 await js('modeBack');await sleep(700);await js('examJump');await sleep(900);
 await p.locator('#exPaceChips .chip').nth(0).click();await sleep(300);await js('exGo');await sleep(1500);await shot('exam');
 // multiplayer
 await p.evaluate(()=>{const l=localStorage.getItem('tpk-lang');localStorage.clear();localStorage.setItem('tpk-lang',l)});
 await p.goto('http://localhost:8765/?quiz=socio');await sleep(1200);
 await p.fill('#nick','Alex');await p.locator('#lenChips .chip').nth(0).click();await js('createBtn');await sleep(1200);
 const code=(await p.textContent('#lobbyCode')).trim();
 for(const [i,n] of ['Lea','Noah','Inès','Max'].entries()){await p.evaluate(([c,i,n])=>__addPlayer(c,'f'+i,n),[code,i,n]);await sleep(300)}
 await shot('lobby');
 await js('lobbyStart');await p.waitForSelector('#question:not([hidden])');await sleep(2200);await shot('multi-q');
 await p.evaluate(async c=>{const it=G.deck[G.qi],k=it.o.indexOf(0),w=(k+1)%4;
   [['f0',k,2100],['f1',k,3400],['f2',w,2600]].forEach(([id,cc,ms])=>__setAns(c,id,{[G.qi]:{c:cc,ms}}));
   [...$('qTiles').children][k].click()},code);
 await sleep(1500);await p.evaluate(()=>writeGame({status:'reveal'}));await sleep(1200);
 await p.evaluate(()=>document.querySelector('.board').scrollIntoView({block:'start'}));await shot('board');
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
