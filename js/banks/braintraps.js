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

// ===== More questions =====
m(2,"Lateral","If a red house is made of red bricks and a blue house of blue bricks, what is a greenhouse made of?","Glass",["Green bricks","Green plastic","Wood"],"A greenhouse is a glass building for plants.",1);
m(2,"Lateral","How many animals of each kind did Noah take on the ark?","Two",["One","Seven","None"],"Noah took two of each kind; the trick is that it is Noah, not Moses.",1);
m(2,"Time","One egg takes 6 minutes to boil. How long do three eggs take in the same pot together?","The same time",["18 minutes","12 minutes","9 minutes"],"The eggs cook together, so the time does not change.",1);
m(2,"Lateral","A man looks at a painting and says: “Brothers and sisters I have none, but that man’s father is my father’s son.” Who is in the painting?","His son",["Himself","His father","His brother"],"My father’s son is the speaker himself, so the man in the painting is his son.",3);
m(2,"Maths","You enter a dark room with a match, a candle and a lamp. What do you light first?","The match",["The candle","The lamp","The lamp and candle together"],"You need the match to light the others.",1);
m(2,"Lateral","How far can a dog run into the woods?","Halfway",["All the way","Ten metres","As far as it wants"],"After halfway, it is running out of the woods.",2);
m(2,"Lateral","Which weighs more: a ton of bricks or a ton of feathers?","They weigh the same",["The bricks","The feathers","It depends"],"A ton is a ton.",1);
m(3,"Logic","If you have a bowl with 6 apples and you take away 4, how many do you have?","4",["2","6","10"],"You took 4, so you have 4.",2);
m(3,"Logic","What is the next letter in this sequence? O, T, T, F, F, S, S, ?","E",["N","T","O"],"The letters are the first letters of One, Two, Three, Four, Five, Six, Seven, Eight.",3);
m(3,"Logic","Which number is the odd one out: 2, 3, 5, 9, 11?","9",["2","3","11"],"9 is the only number that is not prime.",2);
m(3,"Logic","If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?","3",["100","30","33"],"Each cat catches one mouse every 3 minutes, so 3 cats catch 100 mice in 100 minutes.",3);
m(3,"Maths","What is 20% of 50, plus 50% of 20?","20",["10","25","30"],"20% of 50 is 10 and 50% of 20 is 10, so the total is 20.",2);
m(3,"Logic","What is the next number? 1, 4, 9, 16, 25, ?","36",["30","32","35"],"The numbers are squares: 1², 2², 3², 4², 5², 6².",1);
m(3,"Logic","A clock shows 3:15. What is the angle between the hands?","7.5 degrees",["0 degrees","15 degrees","90 degrees"],"The hour hand moves a little past the 3 as the minutes go by.",3);
m(3,"Logic","What is the missing number? 7, 14, 21, ?, 35","28",["26","27","30"],"The numbers go up by 7 each time.",1);
m(3,"Logic","You have two coins that add up to 30 cents. One of them is not a nickel. What are the two coins?","A quarter and a nickel",["Two 15-cent coins","A dime and two nickels","A quarter and a dime"],"One of them (the quarter) is not a nickel, but the other is.",3);
m(3,"Maths","How many times does the digit 9 appear in the numbers from 1 to 100?","20",["10","11","19"],"It appears 10 times as units digit and 10 times as tens digit.",3);
m(4,"Riddle","What has a heart that does not beat?","An artichoke",["A statue","A clock","A card"],"An artichoke has a heart.",2);
m(4,"Riddle","What has a bed but never sleeps?","A river",["A hotel","A hospital","A farm"],"A river has a riverbed.",1);
m(4,"Riddle","What has a head and a tail but no body?","A coin",["A snake","A comet","A match"],"A coin has a head side and a tail side.",1);
m(4,"Riddle","What has many teeth but cannot bite?","A comb",["A saw","A zipper","A key"],"A comb has teeth that pass through hair.",1);
m(4,"Riddle","What gets bigger the more you take away from it?","A hole",["A shadow","A debt","A cloud"],"Digging removes earth, making the hole bigger.",2);
m(4,"Riddle","What runs but never walks, has a mouth but never talks?","A river",["A clock","A car","A faucet"],"A river has a mouth where it meets the sea.",2);
m(4,"Riddle","What is full of holes but still holds water?","A sponge",["A bucket","A net","A cup"],"A sponge absorbs water in its pores.",1);
m(4,"Riddle","What can you break without ever touching it?","A promise",["A glass","A wave","A mirror"],"A promise can be broken without touching.",1);
m(4,"Riddle","What begins with T, ends with T and has T in it?","A teapot",["A tent","A tight","A target"],"A teapot starts and ends with T and contains tea.",3);
ty(4,"What has keys but no locks and can play music? (one or two words)",["piano","a piano","keyboard"],"A piano has keys.",2);

return {id:"braintraps",title:"Brain Traps",kw:"brain traps stroop test colour trick questions riddles logic puzzles brain teasers only 1 percent tiktok",subject:"Colour traps, trick questions and riddles: will your brain fall for them?",lang:"en",sess:SESS,tags:TAGS,unit:["level","levels","a level"],balance:true,Q,TQ};
})();
