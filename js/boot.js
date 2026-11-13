// Start-up code that used to sit inline in index.html (moved here so the page can run under a strict Content-Security-Policy).
// Loaded without "defer" at the top of <head>: it must run before the first paint.
// theme before first paint: the visitor's saved choice, otherwise the system setting (followed live until they pick one)
(function(){var d=document.documentElement,m=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)"),s=null;try{s=localStorage.getItem("tpk-theme")}catch(e){}
  function set(t){d.setAttribute("data-theme",t);var c=document.querySelector('meta[name="theme-color"]');if(c)c.content=t==="dark"?"#100F1F":"#4B2FE0"}
  set(s==="dark"||s==="light"?s:(m&&m.matches?"dark":"light"));
  if(m&&m.addEventListener)m.addEventListener("change",function(e){var k=null;try{k=localStorage.getItem("tpk-theme")}catch(x){}if(!k)set(e.matches?"dark":"light")});
  window.tpkSetTheme=set})();
// text size chosen in the options, before first paint
try{var t=localStorage.getItem("tpk-tsize");if(t==="1"||t==="2")document.documentElement.setAttribute("data-tsize",t)}catch(e){}
// Vercel Analytics queue (the script itself is loaded with defer)
window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};
// a challenge link (?ch=...), read by js/challenge.js
try{window.TPK_CH=new URLSearchParams(location.search).get("ch")}catch(e){}
// the font stylesheet is fetched without blocking the page (media="print"), then switched on
document.addEventListener("DOMContentLoaded",function(){var l=document.querySelectorAll("link[data-async-css]");for(var i=0;i<l.length;i++)l[i].media="all"});
// offline support
if("serviceWorker"in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))addEventListener("load",function(){navigator.serviceWorker.register("/sw.js").catch(function(){})});
