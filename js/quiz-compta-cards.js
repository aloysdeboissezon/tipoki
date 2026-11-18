// Flashcards for the Quiz compta 3 page, built from the page's own question bank (TESTS in quiz-compta.js)
(function(){
  var seen={},cards=[];
  TESTS.forEach(function(t){t.ix.forEach(function(q){if(seen[q.q])return;seen[q.q]=1;cards.push(q)})});
  var topics=[];cards.forEach(function(q){if(topics.indexOf(q.t)<0)topics.push(q.t)});
  var cs={topic:'All',deck:[],i:0,flip:false};
  function esc(s){return String(s).replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
  function answer(q){return q.type==='mcq'?String.fromCharCode(65+q.a)+'. '+q.opts[q.a]:q.a+(q.unit?' '+q.unit:'')}
  function build(){cs.deck=cards.filter(function(q){return cs.topic==='All'||q.t===cs.topic});cs.i=0;cs.flip=false}
  function draw(){
    var v=document.getElementById('view'),q=cs.deck[cs.i];
    var pills=['All'].concat(topics).map(function(t){return '<button class="pill" data-t="'+esc(t)+'" aria-pressed="'+(t===cs.topic)+'">'+esc(t)+'</button>'}).join('');
    v.innerHTML='<div class="mode">'+pills+'</div>'+
      '<div class="card"><span class="tag">'+esc(q.t)+' · card '+(cs.i+1)+' / '+cs.deck.length+'</span>'+
      '<p class="q">'+q.q+'</p>'+
      (q.type==='mcq'&&!cs.flip?'<div class="small">'+q.opts.map(function(o,k){return String.fromCharCode(65+k)+'. '+o}).join('<br>')+'</div>':'')+
      (cs.flip?'<div class="ans ok"><b>'+esc(answer(q))+'</b><div class="small">'+(q.exp||'')+'</div></div>':'')+
      '</div><div class="bar"><button class="btn" id="fc-prev"'+(cs.i?'':' disabled')+'>← Previous</button><button class="btn p" id="fc-flip">'+(cs.flip?'Hide answer':'Show answer')+'</button><button class="btn" id="fc-next"'+(cs.i<cs.deck.length-1?'':' disabled')+'>Next →</button><button class="btn" id="fc-shuf">Shuffle</button></div>';
    v.querySelectorAll('[data-t]').forEach(function(b){b.onclick=function(){cs.topic=b.dataset.t;build();draw()}});
    document.getElementById('fc-flip').onclick=function(){cs.flip=!cs.flip;draw()};
    document.getElementById('fc-prev').onclick=function(){cs.i--;cs.flip=false;draw()};
    document.getElementById('fc-next').onclick=function(){cs.i++;cs.flip=false;draw()};
    document.getElementById('fc-shuf').onclick=function(){for(var i=cs.deck.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=cs.deck[i];cs.deck[i]=cs.deck[j];cs.deck[j]=x}cs.i=0;cs.flip=false;draw()};
  }
  var tab=document.getElementById('t-cards');
  tab.onclick=function(){
    clearInterval(state.timer);
    document.querySelectorAll('.tab').forEach(function(t){t.setAttribute('aria-selected',t===tab)});
    build();draw();
  };
  // the page's own tab handler only unselects its three tabs, so unselect ours when one of them is used
  ['t-sheet','t-tests','t-tips'].forEach(function(id){var b=document.getElementById(id),f=b.onclick;b.onclick=function(){tab.setAttribute('aria-selected','false');f()}});
})();
