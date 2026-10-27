// Dark mode switch in the header. The theme itself is applied in <head> (index.html) so the page never flashes white.
(function(){
const btn=document.getElementById("themeBtn"),root=document.documentElement;
function sync(){const dark=root.getAttribute("data-theme")==="dark",t=dark?tl("Switch to light mode"):tl("Switch to dark mode");btn.title=t;btn.setAttribute("aria-label",t)}
btn.onclick=()=>{const t=root.getAttribute("data-theme")==="dark"?"light":"dark";window.tpkSetTheme(t);try{localStorage.setItem("tpk-theme",t)}catch(e){}sync()};
new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:["data-theme"]});
sync();
})();
