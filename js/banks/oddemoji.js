// Built-in bank: Odd Emoji Out (English). Find the look-alike in a row, then continue the pattern.
// Hand-written pairs, with positions computed by fixed arithmetic (no randomness), so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard. No flag emojis (they do not show on Windows).
window.BANK_ODDEMOJI=(function(){
const SESS={1:"Row of 6",2:"Row of 8",3:"Row of 10",4:"What comes next?"};
const TAGS={1:"6 emojis",2:"8 emojis",3:"10 emojis",4:"Patterns"};
const Q=[],TQ=[];
const ORD=["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"];
// [normal, odd, difficulty of the pair]
const PAIRS=[["😀","😃",1],["🙂","🙃",1],["😐","😑",2],["😗","😙",3],["🌕","🌝",1],["🐱","🐈",2],["😠","😡",2],["😢","😥",2],["😮","😯",3],["🍎","🍅",1]];
function row(s,n,d0){
  PAIRS.forEach((p,i)=>{
    const pos=(i*3+s*2+1)%n;                                   // where the odd one sits (0-based)
    const cells=[];for(let k=0;k<n;k++)cells.push(k===pos?p[1]:p[0]);
    const cand=[];for(let k=0;k<n;k++)if(k!==pos)cand.push(k);const st=1+(i%2),wr=[];for(let k=0;wr.length<3;k++){const w=cand[(i+k*st)%cand.length];if(!wr.includes(w))wr.push(w)}
    Q.push({s,t:"Find the odd one",q:"Which one is different? "+cells.join(" "),o:[ORD[pos],...wr.map(w=>ORD[w])],a:0,e:"The odd emoji is the "+ORD[pos]+": "+p[1]+" among "+p[0]+" (position counted from the left).",d:Math.min(3,Math.max(1,Math.round((p[2]+d0)/2)))});
  });
}
row(1,6,1);row(2,8,2);row(3,10,3);
// ===================== 4. What comes next? =====================
const nx=(q,ok,wr,e,d)=>Q.push({s:4,t:"Pattern",q,o:[ok,...wr],a:0,e,d});
nx("What comes next? 🔴 🔵 🔴 🔵 🔴 ?","Blue circle",["Red circle","Green circle","Yellow circle"],"The colours alternate: red, blue, red, blue, red, so blue is next.",1);
nx("What comes next? 🟢 🟢 🟡 🟢 🟢 🟡 🟢 🟢 ?","Yellow circle",["Green circle","Red circle","Blue circle"],"The pattern is two greens then one yellow, repeated.",1);
nx("What comes next? 🌑 🌒 🌓 🌔 ?","Full moon",["New moon","Last quarter moon","Crescent moon"],"The Moon grows from new to full: 🌑 🌒 🌓 🌔 🌕.",1);
nx("What comes next? 😀 😀 😃 😀 😀 😃 😀 ?","Grinning face",["Smiling face with big eyes","Winking face","Neutral face"],"The pattern repeats grin, grin, big-eyed grin: after one grin comes another grin.",2);
nx("What comes next? 🔺 🟦 🔺 🟦 🟦 🔺 🟦 🟦 🟦 ?","Red triangle",["Blue square","Blue circle","Red circle"],"Each triangle is followed by one more blue square than last time, so the next triangle comes after three squares.",3);
nx("What comes next? 1️⃣ 2️⃣ 4️⃣ 8️⃣ ?","16",["10","12","14"],"Each number doubles: 1, 2, 4, 8, 16.",2);
nx("What comes next? 🕐 🕑 🕒 🕓 ?","Five o'clock",["Six o'clock","Three o'clock","Twelve o'clock"],"The clock moves forward one hour each step.",1);
nx("What comes next? 🟥 🟧 🟨 🟩 ?","Blue square",["Purple square","Black square","White square"],"The squares follow the rainbow: red, orange, yellow, green, blue.",1);

// ===================== Typed answers =====================
TQ.push({s:1,q:"A row has the pattern: 😀 😀 😃 😀 😀. Which position (number 1 to 5) holds the odd one?",a:["3","3rd","third"],e:"The big-eyed face 😃 is in the third spot.",d:1});
TQ.push({s:2,q:"A row has the pattern: 🍎 🍎 🍎 🍎 🍅 🍎. Which position (number 1 to 6) holds the odd one?",a:["5","5th","fifth"],e:"The tomato 🍅 is in the fifth spot.",d:1});
TQ.push({s:4,q:"Complete the doubling: 3, 6, 12, 24, ? (type the number)",a:["48"],e:"Each number doubles, so 24 × 2 = 48.",d:2});
TQ.push({s:4,q:"What is the next letter? A, C, E, G, ?",a:["I"],e:"Skip one letter each time: A, C, E, G, I.",d:2});

// ===== More questions =====
nx("What comes next? 🟦 🟦 🟥 🟦 🟦 🟥 🟦 🟦 ?","Red square",["Blue square","Green square","Yellow square"],"Two blue squares then one red, repeated.",1);
nx("What comes next? ⭐ 🌙 ⭐ 🌙 ⭐ ?","Moon",["Star","Sun","Cloud"],"Star and moon alternate.",1);
nx("What comes next? 🍎 🍌 🍒 🍎 🍌 ?","Cherries",["Apple","Banana","Grapes"],"Apple, banana, cherries repeat.",1);
nx("What comes next? 🔴 🟠 🟡 🟢 🔵 ?","Purple circle",["Red circle","Black circle","White circle"],"The circles follow rainbow order.",2);
nx("What comes next? 1️⃣ 3️⃣ 5️⃣ 7️⃣ ?","9",["8","10","11"],"The odd numbers go up by two.",2);
nx("What comes next? 🌱 🌿 🌳 🌱 🌿 ?","Tree",["Seed","Leaf","Flower"],"Seedling, plant, tree repeat.",1);
nx("What comes next? 🔼 ▶️ 🔽 ◀️ 🔼 ?","Right arrow",["Up arrow","Left arrow","Down arrow"],"The arrows rotate clockwise: up, right, down, left.",2);
nx("What comes next? 🟡 🟡 🔴 🟡 🟡 🟡 🔴 🟡 🟡 🟡 🟡 ?","Red circle",["Yellow circle","Blue circle","Green circle"],"Each red comes after one more yellow than the last time.",3);

return {id:"oddemoji",title:"Odd Emoji Out",kw:"odd emoji out spot the difference eye test find the different look alike pattern brain game fun tiktok",subject:"Spot the look-alike in 5 seconds: how sharp are your eyes?",lang:"en",sess:SESS,tags:TAGS,unit:["level","levels","a level"],balance:true,Q,TQ};
})();
