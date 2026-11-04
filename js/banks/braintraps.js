// Built-in bank: Brain Traps (English). Colour-and-word traps, trick questions, number puzzles and riddles.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard.
window.BANK_BRAINTRAPS=(function(){
const SESS={1:"Colour traps",2:"Trick questions",3:"Number & logic",4:"Riddles"};
const TAGS={1:"Colour traps",2:"Tricks",3:"Logic",4:"Riddles"};
const Q=[],TQ=[];
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Colour traps (the Stroop test) =====================
// The word names one colour, the ink shows another. Answer = the ink colour. The first wrong option is the trap: the colour the word names.
const SQ={Red:"🟥",Orange:"🟧",Yellow:"🟨",Green:"🟩",Blue:"🟦",Purple:"🟪"};
const T=[["BLUE","Red",["Blue","Green","Yellow"]],["GREEN","Purple",["Green","Red","Orange"]],["RED","Yellow",["Red","Blue","Purple"]],["YELLOW","Blue",["Yellow","Green","Orange"]],["PURPLE","Green",["Purple","Blue","Red"]],["ORANGE","Blue",["Orange","Yellow","Purple"]],["GREEN","Orange",["Green","Blue","Red"]],["RED","Green",["Red","Yellow","Purple"]],["YELLOW","Purple",["Yellow","Orange","Blue"]],["BLUE","Orange",["Blue","Red","Green"]]];
T.forEach((x,i)=>m(1,"Stroop test","The word “"+x[0]+"” is written in "+SQ[x[1]]+" ink. What colour is the INK, not the word?",x[1],x[2],"The word says "+x[0].toLowerCase()+" but the ink is "+x[1].toLowerCase()+": your brain reads faster than it sees colours, that is the Stroop effect.",i<4?1:2));

// ===================== 2. Trick questions =====================
m(2,"Calendar","How many months of the year have 28 days?","All 12",["Just February","Only 1","Exactly 2"],"Every month has at least 28 days.",1);
m(2,"Maths","A farmer has 17 sheep. All but 9 run away. How many are left?","9",["8","17","0"],"“All but 9” means 9 stay.",1);
m(2,"Physics","Which weighs more: a kilo of feathers or a kilo of steel?","They weigh the same",["The feathers","The steel","It depends on the shape"],"A kilo is a kilo.",1);
m(2,"Race","You overtake the runner in 2nd place. What place are you in?","2nd",["1st","3rd","Last"],"You take the place of the runner you passed.",2);
m(2,"Time","A doctor gives you 3 pills and says take one every half hour. How long do they last?","1 hour",["1.5 hours","3 hours","30 minutes"],"You take the first now, the second after 30 min and the third after 60 min.",2);
m(2,"Maths","How many times can you subtract 5 from 25?","Once",["5 times","4 times","Never"],"After the first subtraction you have 20, not 25.",2);
m(2,"Biology","Which one is correct: “the yolk of the egg is white” or “the yolk of the egg are white”?","Neither: yolks are yellow",["The first","The second","Both"],"Egg yolks are yellow.",2);
m(2,"Lateral","A plane crashes exactly on the border between two countries. Where do they bury the survivors?","Nowhere, survivors are alive",["In the country they came from","On the border","In the larger country"],"You do not bury survivors.",2);
m(2,"Lateral","A rooster lays an egg on top of a pointed roof. Which way does it roll?","Roosters do not lay eggs",["Left","Right","Straight down"],"Only hens lay eggs.",1);
m(2,"Animals","How many of each animal did Moses take on the ark?","None, it was Noah",["Two","Seven","One"],"The ark belongs to Noah, not Moses.",3);

// ===================== 3. Number & logic =====================
m(3,"Maths","What is 2 + 2 × 2?","6",["8","4","10"],"Multiply first: 2 × 2 = 4, then add 2.",1);
m(3,"Maths","What is 10 ÷ 0.5?","20",["5","10","0.5"],"Dividing by a half doubles the number.",2);
m(3,"Classic puzzle","A bat and a ball cost $1.10 in total. The bat costs $1 more than the ball. How much is the ball?","5 cents",["10 cents","1 cent","15 cents"],"Ball = 5c, bat = $1.05, total $1.10. Most people say 10 cents.",3);
m(3,"Classic puzzle","5 machines make 5 widgets in 5 min. How long would 100 machines need to make 100 widgets?","Five minutes",["100 minutes","20 minutes","One minute"],"Each machine makes one widget in 5 minutes, so 100 machines make 100 in the same time.",3);
m(3,"Classic puzzle","A patch of lily pads doubles in size every day and covers the whole lake on day 48. On which day did it cover half the lake?","Day 47",["Day 24","Day 46","Day 40"],"One doubling before the end.",3);
m(3,"Sequence","What is the next number? 1, 1, 2, 3, 5, 8, ?","13",["11","12","10"],"Each number is the sum of the two before it (Fibonacci).",1);
m(3,"Sequence","What is the next number? 2, 4, 8, 16, ?","32",["24","30","20"],"Each number doubles.",1);
m(3,"Percentages","What is 15% of 200?","30",["15","20","25"],"10% is 20 and 5% is 10, so 15% is 30.",1);
m(3,"Roman numerals","In Roman numerals, what number is XIV?","14",["16","4","15"],"X is 10 and IV is 4.",2);
m(3,"Probability","You flip a fair coin and get heads five times in a row. What is the chance of heads on the sixth flip?","50%",["Less than 50%","More than 50%","Exactly 1 in 32"],"Each flip is independent.",2);

// ===================== 4. Riddles =====================
m(4,"Riddle","What has keys but cannot open locks?","A piano",["A door","A map","A clock"],"A piano has keys you press to play notes.",1);
m(4,"Riddle","What gets wetter the more it dries?","A towel",["A sponge","The rain","A cloud"],"A towel absorbs water to dry you.",1);
m(4,"Riddle","What has hands but cannot clap?","A clock",["A tree","A table","A river"],"A clock has an hour hand and a minute hand.",1);
m(4,"Riddle","What can travel around the world while staying in a corner?","A stamp",["A coin","A shadow","A compass"],"A stamp sits in the corner of an envelope.",2);
m(4,"Riddle","The more of me you take, the more you leave behind. What am I?","Footsteps",["Time","Breath","Sand"],"Every step you take leaves a footprint behind.",2);
m(4,"Riddle","What question can you never answer “yes” to?","Are you asleep?",["Are you awake?","Are you alive?","Is it Monday?"],"If you could answer, you would not be asleep.",3);
m(4,"Riddle","I speak without a mouth and hear without ears. What am I?","An echo",["A mirror","A shadow","A book"],"An echo repeats your voice back to you.",2);
m(4,"Riddle","What is always in front of you but cannot be seen?","The future",["A mirror","A shadow","The sky"],"The future is always ahead.",2);
m(4,"Riddle","What can you catch but not throw?","A cold",["A ball","A frisbee","A boomerang"],"You catch colds but you cannot throw them.",1);
m(4,"Riddle","What goes up but never comes down?","Your age",["A kite","A ball","Rain"],"Your age only increases.",1);

// ===================== Typed answers =====================
ty(3,"What is 12 × 12? (type the number)",["144"],"12 × 12 = 144.",1);
ty(3,"What is the next number? 3, 6, 12, 24, ? (type the number)",["48"],"Each number doubles.",2);
ty(4,"What has an eye but cannot see? (one or two words)",["needle","a needle"],"A needle has an eye for the thread.",2);
ty(4,"What has a neck but no head? (one or two words)",["bottle","a bottle"],"A bottle has a neck.",2);
ty(2,"A man pushes his car to a hotel and tells the owner he is bankrupt. What game is he playing? (one word)",["Monopoly"],"In Monopoly you can go bankrupt in a hotel.",3);

return {id:"braintraps",title:"Brain Traps",kw:"brain traps stroop test colour trick questions riddles logic puzzles brain teasers only 1 percent tiktok",subject:"Colour traps, trick questions and riddles: will your brain fall for them?",lang:"en",sess:SESS,tags:TAGS,unit:["level","levels","a level"],balance:true,Q,TQ};
})();
