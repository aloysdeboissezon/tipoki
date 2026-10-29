// Home presentation video: poster first, the mp4 is loaded only when the visitor presses play (sound allowed, they asked for it).
(function(){
  var fr=document.documentElement.lang==="fr",L=fr?"fr":"en";
  var btn=document.getElementById("tourBtn"),box=document.getElementById("tour");
  if(!btn||!box)return;
  document.getElementById("tourPoster").src="video/tipoki-intro-"+L+"-poster.jpg";
  btn.onclick=function(){
    var v=document.createElement("video");
    v.src="video/tipoki-intro-"+L+".mp4";v.poster="video/tipoki-intro-"+L+"-poster.jpg";
    v.controls=true;v.autoplay=true;v.playsInline=true;v.preload="auto";
    v.setAttribute("aria-label",btn.getAttribute("aria-label"));
    box.textContent="";box.appendChild(v);v.focus();
  };
})();
