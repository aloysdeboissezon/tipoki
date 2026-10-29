// Renders the tutorial video frame by frame (deterministic, 60 fps): node video/render.js <en|fr> <shotsdir> <out.mp4> [fps] [secondsLimit]
// Needs the repo served on http://localhost:8765 and stills from video/capture.js.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const {spawn}=require('child_process');
const [LANG='en',SHOTS,OUT='out.mp4',FPS='60',LIM]=process.argv.slice(2);const fps=+FPS;
(async()=>{
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1280,height:720},deviceScaleFactor:1});
 await ctx.route(/localhost:8765\/video\/shots\//,r=>{const f=path.join(path.resolve(SHOTS),path.basename(new URL(r.request().url()).pathname));fs.existsSync(f)?r.fulfill({path:f}):r.abort()});
 const p=await ctx.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('http://localhost:8765/video/v4.html?lang='+LANG);await p.evaluate(()=>document.fonts.ready);
 await p.waitForFunction(()=>[...document.images].every(i=>i.complete));await p.waitForTimeout(500);
 const dur=LIM?+LIM:await p.evaluate(()=>DUR),n=Math.round(dur*fps);
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','slow','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart','-an',OUT],{stdio:['pipe','inherit','inherit']});
 for(let i=0;i<n;i++){await p.evaluate(t=>render(t),i/fps);const buf=await p.screenshot({type:'jpeg',quality:94});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%120==0)console.log('frame',i,'/',n)}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',OUT);
})().catch(e=>{console.error(e);process.exit(1)});
