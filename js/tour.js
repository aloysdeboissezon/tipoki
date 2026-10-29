// Home presentation video: poster first, the mp4 is loaded only when the visitor presses play (sound allowed, they asked for it).
(function(){
  var fr=document.documentElement.lang==="fr",L=fr?"fr":"en";
  var btn=document.getElementById("tourBtn"),box=document.getElementById("tour");
  if(!btn||!box)return;
  document.getElementById("tourPoster").src="video/tipoki-intro-"+L+"-poster.jpg";
  btn.onclick=function(){
    var m=document.createElement("div"),v=document.createElement("video"),x=document.createElement("button");
    m.className="tour-modal";
    v.src="video/tipoki-intro-"+L+".mp4";v.poster="video/tipoki-intro-"+L+"-poster.jpg";
    v.controls=true;v.autoplay=true;v.playsInline=true;v.preload="auto";
    v.setAttribute("aria-label",btn.getAttribute("aria-label"));
    x.type="button";x.textContent="×";x.setAttribute("aria-label",fr?"Fermer":"Close");
    function close(){document.removeEventListener("keydown",key);v.pause();m.remove();btn.focus()}
    function key(e){if(e.key==="Escape")close()}
    x.onclick=close;m.onclick=function(e){if(e.target===m)close()};document.addEventListener("keydown",key);
    m.appendChild(v);m.appendChild(x);document.body.appendChild(m);x.focus();
  };
})();
