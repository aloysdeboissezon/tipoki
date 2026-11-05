// Builds sheets/<quiz id>.pdf from the study sheet shown in the app (same rendering, A4, print CSS).
// Usage: serve the repo with the test server (PORT=8765 node tests/server.js) then `node tools/make-pdfs.js [ids]`. Needs Playwright.
// ESADE quizzes (api/_esade/) are not public files: their PDF is written as a base64 module in api/_esade/pdf/<id>.js instead of sheets/<id>.pdf.
const {chromium}=require('playwright');const {isPrivate}=require('./bankpath');const fs=require('fs');const path=require('path');
const ids=process.argv.slice(2).length?process.argv.slice(2):['socio','populism','energie','compta2','regression'];
const STUB=require('../tests/helpers').FAKE_SUPABASE;   // the same fake Supabase the tests use
(async()=>{
  const b=await chromium.launch();fs.mkdirSync(path.join(__dirname,'..','sheets'),{recursive:true});
  for(const id of ids){
    const ctx=await b.newContext({viewport:{width:1000,height:1200},locale:'en-US'});
    await ctx.route(/_vercel/,r=>r.fulfill({contentType:'text/javascript',body:''}));
    await ctx.route(/^https?:\/\/(?!localhost)/,r=>/supabase-js/.test(r.request().url())?r.fulfill({contentType:'text/javascript',body:STUB}):/fonts\.googleapis/.test(r.request().url())?r.fulfill({contentType:'text/css',body:''}):r.abort());
    await ctx.route(/supabase-js-unused/,r=>r.fulfill({contentType:'text/javascript',body:STUB}));
    await ctx.addInitScript(()=>{try{window.__esadeLocked=true;localStorage.setItem('qwebbo-esade','{"e":"pdf@esade.edu"}')}catch(e){}});   // the test server answers /api/esade for this token
    await ctx.route(/\/api\/esade\?/,r=>r.continue({headers:{...r.request().headers(),authorization:'Bearer e2e-esade-token-0000000000'}}));
    const p=await ctx.newPage();
    await p.goto('http://localhost:8765/?quiz='+id);await p.waitForTimeout(2500);
    await p.click('#sheetCard');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
    await p.emulateMedia({media:'print'});
    const buf=await p.pdf({format:'A4',printBackground:true,preferCSSPageSize:true});
    if(isPrivate(id)){fs.mkdirSync(path.join(__dirname,'..','api','_esade','pdf'),{recursive:true});fs.writeFileSync(path.join(__dirname,'..','api','_esade','pdf',id+'.js'),'// base64 of the study-sheet PDF (served only to verified ESADE accounts by api/esade.js)\nmodule.exports="'+buf.toString('base64')+'";\n');console.log('api/_esade/pdf/'+id+'.js');await ctx.close();continue}
    fs.writeFileSync(path.join(__dirname,'..','sheets',id+'.pdf'),buf);
    console.log('sheets/'+id+'.pdf');await ctx.close();
  }
  await b.close();
})();
