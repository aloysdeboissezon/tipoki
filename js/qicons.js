// ---------- quiz icons: one small illustration per quiz (inline SVG, no image files, nothing to download) ----------
// quizIcon(q) returns the SVG markup for a quiz {id,title,subject,kw,icon}.
// 1) q.icon (a motif name from MOTIFS) wins, 2) the built-in quizzes have their own drawing (BY_ID),
// 3) any other quiz gets the motif whose keywords appear in its title / subject / keywords (KEYS),
// 4) otherwise a colourful abstract badge whose shapes and colours come from the quiz id, so every new quiz still looks designed.
// To give a new quiz its own drawing: add a motif below (64x64 box, ink outline 2.5, brand palette) and one line in BY_ID.
(function(){
  var K="#17162B",V="#6B4DFF",VL="#B9A8FF",P="#FF6FA5",Y="#FFD23F",C="#35D0E8",G="#3DDC97",W="#FFFFFF";
  var S=' stroke="'+K+'" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
  function f(c){return ' fill="'+c+'"'+S}
  var MOTIFS={
    // institution: pediment, columns, steps
    pillars:'<path d="M7 25 32 9l25 16z"'+f(Y)+'/><circle cx="32" cy="19" r="3.2"'+f(P)+'/>'+
      '<rect x="11" y="28" width="8" height="21" rx="2"'+f(V)+'/><rect x="28" y="28" width="8" height="21" rx="2"'+f(V)+'/><rect x="45" y="28" width="8" height="21" rx="2"'+f(V)+'/>'+
      '<rect x="6" y="51" width="52" height="6" rx="3"'+f(K)+'/><path d="M13.5 33v12M30.5 33v12M47.5 33v12" stroke="'+VL+'" stroke-width="2" stroke-linecap="round" fill="none"/>',
    // globe with a spark
    globe:'<circle cx="30" cy="35" r="22"'+f(C)+'/><path d="M16 26c5-3 9-1 11 3s-3 6-1 10-6 4-9 1-5-9-1-14zM38 22c4-2 9 0 10 4s-4 5-5 8-6 1-7-3 0-7 2-9z"'+f(G)+'/>'+
      '<path d="M30 13a10 22 0 0 0 0 44a10 22 0 0 0 0-44M8 35h44" fill="none" stroke="'+W+'" stroke-width="1.8" stroke-linecap="round" opacity=".75"/>'+
      '<path d="M51 6l2.6 6 6 2.6-6 2.6L51 23l-2.6-5.8-6-2.6 6-2.6z"'+f(Y)+'/>',
    // lightning bolt on a violet disc
    bolt:'<circle cx="32" cy="33" r="24"'+f(V)+'/><path d="M36 9 17 36h12l-4 19 22-30H33z"'+f(Y)+'/>'+
      '<path d="M7 14l3 3M5 22h4M52 10l-2 3" stroke="'+Y+'" stroke-width="2.5" stroke-linecap="round" fill="none"/>',
    // megaphone with sound waves
    megaphone:'<path d="M9 25 38 11v42L9 39z"'+f(V)+'/><rect x="4" y="25" width="9" height="14" rx="3"'+f(P)+'/>'+
      '<path d="M16 41l4 14h8l-3-13z"'+f(Y)+'/><ellipse cx="38" cy="32" rx="5" ry="21"'+f(P)+'/>'+
      '<path d="M49 20q7 12 0 24M55 14q11 18 0 36" fill="none" stroke="'+Y+'" stroke-width="3" stroke-linecap="round"/>',
    // bars + coin
    chart:'<rect x="7" y="34" width="12" height="22" rx="3"'+f(P)+'/><rect x="23" y="22" width="12" height="34" rx="3"'+f(V)+'/><rect x="39" y="10" width="12" height="46" rx="3"'+f(C)+'/>'+
      '<path d="M4 58h54"'+S+' fill="none"/><circle cx="50" cy="14" r="10"'+f(Y)+'/><path d="M54 10.5a5.5 5.5 0 1 0 0 7M44.5 12.5h8M44.5 16h8" fill="none" stroke="'+K+'" stroke-width="2" stroke-linecap="round"/>',
    // flask
    flask:'<path d="M25 7h14M27 7v18L10 52a5 5 0 0 0 4.4 7.5h35.2A5 5 0 0 0 54 52L37 25V7"'+f(W)+'/>'+
      '<path d="M18 42h28l8 11a3 3 0 0 1-2.5 5H12.5A3 3 0 0 1 10 53z"'+f(P)+'/><circle cx="26" cy="49" r="3"'+f(Y)+'/><circle cx="38" cy="46" r="2"'+f(W)+'/>'+
      '<circle cx="44" cy="14" r="3.5"'+f(C)+'/><circle cx="51" cy="22" r="2.2"'+f(V)+'/>',
    // speech bubbles
    chat:'<path d="M6 12h34a5 5 0 0 1 5 5v16a5 5 0 0 1-5 5H24l-9 8v-8H6a5 5 0 0 1-5-5V17a5 5 0 0 1 5-5z" transform="translate(3 0)"'+f(V)+'/>'+
      '<path d="M26 32h28a5 5 0 0 1 5 5v13a5 5 0 0 1-5 5h-3v7l-9-7H26a5 5 0 0 1-5-5V37a5 5 0 0 1 5-5z"'+f(Y)+'/>'+
      '<path d="M13 23h22M13 29h13" stroke="'+W+'" stroke-width="2.6" stroke-linecap="round" fill="none"/><path d="M30 43h24M30 49h14" stroke="'+K+'" stroke-width="2.6" stroke-linecap="round" fill="none"/>',
    // open book with a star
    book:'<path d="M32 15C25 10 14 9 6 11v39c8-2 19-1 26 4z"'+f(V)+'/><path d="M32 15c7-5 18-6 26-4v39c-8-2-19-1-26 4z"'+f(VL)+'/>'+
      '<path d="M13 20c5-1 10 0 14 2M13 28c5-1 10 0 14 2M13 36c5-1 10 0 14 2" stroke="'+W+'" stroke-width="2.4" stroke-linecap="round" fill="none"/>'+
      '<path d="M46 3l2.6 6 6 2.6-6 2.6L46 20l-2.6-5.8-6-2.6 6-2.6z"'+f(Y)+'/>',
    // heart + pulse
    heart:'<path d="M32 56S6 40 6 22a13 13 0 0 1 26-4 13 13 0 0 1 26 4c0 18-26 34-26 34z"'+f(P)+'/><path d="M13 32h11l4-9 6 17 4-8h11" fill="none" stroke="'+W+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    // rocket taking off
    rocket:'<path d="M32 5c9 7 13 17 11 31H21C19 22 23 12 32 5z"'+f(W)+'/><circle cx="32" cy="23" r="5"'+f(C)+'/><path d="M21 28l-9 13 11-3zM43 28l9 13-11-3z"'+f(P)+'/><path d="M25 36h14l-2 7h-10z"'+f(V)+'/><path d="M28 46q4 13 8 0z"'+f(Y)+'/>',
    // target with an arrow
    target:'<circle cx="29" cy="35" r="22"'+f(W)+'/><circle cx="29" cy="35" r="15"'+f(P)+'/><circle cx="29" cy="35" r="8"'+f(W)+'/><circle cx="29" cy="35" r="3.5"'+f(V)+'/><path d="M29 35 53 11M47 6l1 9 9 1" fill="none" stroke="'+K+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    // sun with rays
    sun:'<circle cx="32" cy="32" r="13"'+f(Y)+'/><path d="M32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.7 5.7M44.7 44.7l5.7 5.7M13.6 50.4l5.7-5.7M44.7 19.3l5.7-5.7" fill="none" stroke="'+K+'" stroke-width="3" stroke-linecap="round"/><path d="M26 31q3 4 6 0t6 0" fill="none" stroke="'+K+'" stroke-width="2.2" stroke-linecap="round"/>',
    // stacked coins
    coin:'<ellipse cx="24" cy="46" rx="18" ry="8"'+f(Y)+'/><path d="M6 38v8a18 8 0 0 0 36 0v-8"'+f(Y)+'/><ellipse cx="24" cy="38" rx="18" ry="8"'+f(Y)+'/><ellipse cx="40" cy="22" rx="16" ry="7"'+f(P)+'/><path d="M24 22v8a16 7 0 0 0 32 0v-8"'+f(P)+'/><ellipse cx="40" cy="22" rx="16" ry="7"'+f(P)+'/><path d="M36 22h8M40 19v6" stroke="'+W+'" stroke-width="2.4" stroke-linecap="round"/>',
    // price tag
    tag:'<path d="M5 10h26l27 27-21 21L10 31z"'+f(P)+'/><circle cx="18" cy="21" r="4"'+f(W)+'/><path d="M38 28l8 8M33 34l8 8" stroke="'+W+'" stroke-width="3" stroke-linecap="round"/><path d="M48 6l2 4.6 4.6 2-4.6 2L48 19l-2-4.4-4.6-2 4.6-2z"'+f(Y)+'/>',
    // code brackets
    code:'<rect x="5" y="9" width="54" height="46" rx="9"'+f(K)+'/><circle cx="14" cy="17" r="2.2" fill="'+P+'"/><circle cx="21" cy="17" r="2.2" fill="'+Y+'"/><circle cx="28" cy="17" r="2.2" fill="'+G+'"/>'+
      '<path d="M24 31l-8 8 8 8M40 31l8 8-8 8M35 28l-6 22" fill="none" stroke="'+C+'" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  var BY_ID={socio:"pillars",culture:"globe",energie:"bolt",populism:"megaphone",compta2:"chart",uspop:"megaphone",gastro:"heart",ukculture:"book",startups:"rocket",brands:"tag",barcelona:"sun",finance:"coin",econ:"globe",strategy:"target",jargon:"chat",bigtech:"code",worldtour:"globe",emoji:"chat",internet:"megaphone",hits:"heart",screen:"book",sports:"target",gamer:"code",kids:"flask",myths:"flask",foodtravel:"sun",countryclues:"globe",oddemoji:"target",braintraps:"flask",structure:"pillars",kwave:"heart",korea:"globe",regression:"chart"};
  var KEYS=[
    ["code",/\b(code|coding|program|informatique|computer|algorithm|javascript|python|sql|web)/],
    ["heart",/(m[ée]decin|medic|sant[ée]|health|anatom|biolog|nurs|infirm|pharma)/],
    ["flask",/(chimi|chemi|physi|scien|laborat|exp[ée]rience)/],
    ["bolt",/([ée]nergie|energy|[ée]lectri|electron|circuit|solar|photovolt)/],
    ["chart",/(compta|account|financ|econom|[ée]conom|market|marketing|gestion|management|business|audit|bourse|stock|statist)/],
    ["pillars",/(droit|law|legal|politi|socio|histoire de l'art|philosoph|institution|government|democra)/],
    ["megaphone",/(communic|media|m[ée]dia|speech|rhetor|rh[ée]tor|populis|journalis|public)/],
    ["chat",/(langue|language|anglais|english|espagnol|spanish|fran[cç]ais|french|allemand|german|vocab|grammar|grammaire|conjug)/],
    ["globe",/(g[ée]o|histoire|history|culture|monde|world|atlas|capital)/]
  ];
  function hash(s){var h=0;s=String(s);for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
  // abstract badge: three shapes + a spark, colours and layout drawn from the id (always the same for the same quiz)
  function badge(seed){
    var h=hash(seed),pal=[V,P,Y,C,G,VL],c=function(i){return pal[(h>>>(i*3))%pal.length]},o=(h>>>9)%3;
    var a=c(0),b=c(1),d=c(2);if(b===a)b=pal[(pal.indexOf(a)+2)%pal.length];if(d===a||d===b)d=pal[(pal.indexOf(b)+3)%pal.length];
    var shapes=[
      '<circle cx="24" cy="26" r="17"'+f(a)+'/><rect x="26" y="28" width="28" height="28" rx="8"'+f(b)+'/><path d="M46 8l11 19H35z"'+f(d)+'/>',
      '<rect x="8" y="12" width="30" height="30" rx="9" transform="rotate(-12 23 27)"'+f(a)+'/><circle cx="43" cy="40" r="15"'+f(b)+'/><path d="M14 58l9-16 9 16z"'+f(d)+'/>',
      '<path d="M32 6l23 13v26L32 58 9 45V19z"'+f(a)+'/><circle cx="32" cy="32" r="12"'+f(b)+'/><circle cx="32" cy="32" r="4.5"'+f(d)+'/>'
    ][o];
    return shapes+'<path d="M52 5l2 4.6 4.6 2-4.6 2L52 18l-2-4.4-4.6-2 4.6-2z"'+f(Y)+'/>';
  }
  function motifOf(q){
    q=q||{};
    if(q.icon&&MOTIFS[q.icon])return q.icon;
    if(q.id&&BY_ID[q.id])return BY_ID[q.id];
    var hay=[q.title,q.subject,q.kw].join(" ").toLowerCase();
    for(var i=0;i<KEYS.length;i++)if(KEYS[i][1].test(hay))return KEYS[i][0];
    return null;
  }
  window.quizIcon=function(q){
    var m=motifOf(q),body=m?MOTIFS[m]:badge((q&&(q.id||q.title))||"quiz");
    return '<svg class="qsvg" viewBox="0 0 64 64" aria-hidden="true" focusable="false">'+body+'</svg>';
  };
  window.QUIZ_MOTIFS=Object.keys(MOTIFS);
})();
