// Language switch for the static pages (about, contact, privacy, terms, legal).
// The page holds the three languages; <html data-l> (set before first paint) picks one. The choice is the app's own "tpk-lang".
(function(){
  var d=document.documentElement,btns=document.querySelectorAll(".langs button");
  function apply(l){
    d.setAttribute("data-l",l);d.lang=l;
    if(window.PAGE_TITLES)document.title=PAGE_TITLES[l]||PAGE_TITLES.en;
    var m=document.querySelector('meta[name="description"]');if(m&&window.PAGE_DESC)m.content=PAGE_DESC[l]||PAGE_DESC.en;
    Array.prototype.forEach.call(btns,function(b){b.setAttribute("aria-pressed",b.getAttribute("data-set")===l?"true":"false")});
  }
  Array.prototype.forEach.call(btns,function(b){b.addEventListener("click",function(){var l=b.getAttribute("data-set");try{localStorage.setItem("tpk-lang",l)}catch(e){}apply(l)})});
  apply(d.getAttribute("data-l")||"en");
})();
