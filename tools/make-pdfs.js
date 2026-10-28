// Builds sheets/<quiz id>.pdf from the study sheet shown in the app (same rendering, A4, print CSS).
// Usage: serve the repo (python3 -m http.server 8765) then `node tools/make-pdfs.js`. Needs Playwright.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const ids=process.argv.slice(2).length?process.argv.slice(2):['socio','populism','energie','compta2'];
const STUB="window.supabase={createClient:function(){var q={then:function(r){r&&r({data:[],error:null})},select:function(){return q},eq:function(){return q},order:function(){return q},limit:function(){return q},maybeSingle:function(){return q},single:function(){return q},in:function(){return q}};return {from:function(){return q},rpc:function(){return q},channel:function(){var c={on:function(){return c},subscribe:function(){return c}};return c},removeChannel:function(){},auth:{}}}}";
(async()=>{
  const b=await chromium.launch();fs.mkdirSync(path.join(__dirname,'..','sheets'),{recursive:true});
  for(const id of ids){
    const ctx=await b.newContext({viewport:{width:1000,height:1200},locale:'en-US'});
    await ctx.route(/_vercel/,r=>r.fulfill({contentType:'text/javascript',body:''}));
    await ctx.route(/supabase-js/,r=>r.fulfill({contentType:'text/javascript',body:STUB}));
    const p=await ctx.newPage();
    await p.goto('http://localhost:8765/?quiz='+id);await p.waitForTimeout(1200);
    await p.click('#sheetBtn');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
    await p.emulateMedia({media:'print'});
    await p.pdf({path:path.join(__dirname,'..','sheets',id+'.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true});
    console.log('sheets/'+id+'.pdf');await ctx.close();
  }
  await b.close();
})();
