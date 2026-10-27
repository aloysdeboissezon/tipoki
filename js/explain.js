// ---------- "Why?" notes: what the wrong answer you picked actually is, found in the quiz's own facts (no AI call) ----------
window.TipokiWhy=(function(){
  const key=s=>String(s==null?"":s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s*\(.*?\)/g,"").replace(/[^a-z0-9]+/g," ").trim();
  let cache=null,cacheFor=null;
  function index(facts){
    if(cacheFor===facts)return cache;
    const byT=new Map(),byD=new Map();
    (facts||[]).forEach(f=>{if(f[3])byT.set(key(f[3]),f);if(f[4])byD.set(key(f[4]),f)});
    cacheFor=facts;cache={byT,byD};return cache;
  }
  const trim=s=>String(s).trim().replace(/[.\s]+$/,"");
  // text of the wrong answer the player gave -> one sentence explaining what it really is, or ""
  function whyNot(facts,txt){
    if(!txt||!facts||!facts.length)return "";
    const k=key(txt);if(!k)return "";
    const ix=index(facts),t=ix.byT.get(k);
    if(t)return "“"+trim(t[3])+"” actually means: "+trim(t[4])+".";
    const d=ix.byD.get(k);
    if(d)return "That describes “"+trim(d[3])+"”.";
    return "";
  }
  return {whyNot};
})();
