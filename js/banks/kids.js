// Built-in bank: Are you smarter than a 10-year-old? (English). School basics adults often get wrong.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (the grown-up trap).
window.BANK_KIDS=(function(){
const SESS={1:"Science & space",2:"Nature & the human body",3:"Maths & words",4:"History & the world"};
const TAGS={1:"Science",2:"Nature",3:"Maths & words",4:"History"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Science & space =====================
m(1,"Space","How many planets are there in our solar system?","8",["7","9","10"],"Pluto was reclassified as a dwarf planet in 2006.",1);
m(1,"Space","Which planet is closest to the Sun?","Mercury",["Venus","Mars","Earth"],"Mercury is the smallest planet in the solar system.",1);
m(1,"Space","Which is the largest planet in the solar system?","Jupiter",["Saturn","Neptune","Earth"],"Jupiter is more than 1,300 times the volume of Earth.",1);
m(1,"Space","What causes the seasons on Earth?","The tilt of Earth’s axis",["Earth’s distance from the Sun","The Moon’s gravity","Sunspots"],"Earth is actually closest to the Sun in early January, in the middle of the northern winter.",3);
m(1,"Space","How long does the Earth take to orbit the Sun?","About 365 days",["24 hours","30 days","About 7 days"],"That is why we have a leap day every four years.",1);
m(1,"Matter","At what temperature does water boil at sea level?","100 °C",["90 °C","80 °C","120 °C"],"Water boils at 100 °C (212 °F) at sea level.",1);
m(1,"Matter","What is the chemical formula of water?","H₂O",["CO₂","O₂","NaCl"],"Two hydrogen atoms and one oxygen atom.",1);
m(1,"Matter","What gas do plants absorb from the air for photosynthesis?","Carbon dioxide",["Oxygen","Nitrogen","Helium"],"Plants use sunlight to turn CO₂ and water into sugar and release oxygen.",1);
m(1,"Matter","Between thunder and lightning, which one reaches you first?","The lightning (light)",["The thunder (sound)","They arrive together","It depends on the weather"],"Light travels far faster than sound, so you see lightning before you hear thunder.",1);
m(1,"Matter","What is the chemical symbol of gold?","Au",["Go","Gd","Ag"],"Au comes from the Latin word aurum.",2);
m(1,"Matter","What happens to water when it freezes?","It expands",["It shrinks","It disappears","It becomes heavier"],"That is why ice floats and pipes can burst in winter.",2);
vf(1,"The Sun is a star.",true,"The Sun is an average star at the centre of our solar system.",1);
vf(1,"The Moon produces its own light.",false,"The Moon reflects sunlight; it does not make light.",1);

// ===================== 2. Nature & the human body =====================
m(2,"Body","How many bones does an adult human have?","206",["106","306","412"],"Babies are born with around 300 bones that fuse together over time.",2);
m(2,"Body","What is the largest organ of the human body?","The skin",["The liver","The brain","The heart"],"The skin covers the whole body and weighs about 4 kg in an adult.",2);
m(2,"Body","How many chambers does the human heart have?","4",["2","3","6"],"Two atria and two ventricles.",2);
m(2,"Body","Which organs do we use to breathe?","The lungs",["The kidneys","The liver","The stomach"],"The lungs bring oxygen into the blood.",1);
m(2,"Animals","How many legs does a spider have?","8",["6","10","4"],"Spiders are arachnids, not insects. Insects have six legs.",1);
m(2,"Animals","Which of these is a mammal?","A dolphin",["A shark","A turtle","A frog"],"Dolphins and whales breathe air and feed their young with milk.",1);
m(2,"Animals","Which animal is the only mammal that can truly fly?","The bat",["The flying squirrel","The ostrich","The sugar glider"],"Flying squirrels only glide.",2);
m(2,"Animals","How many hearts does an octopus have?","3",["1","2","8"],"Two pump blood to the gills and one to the rest of the body.",3);
m(2,"Animals","What do caterpillars turn into?","Butterflies or moths",["Beetles","Bees","Dragonflies"],"They form a chrysalis or cocoon in the process called metamorphosis.",1);
m(2,"Animals","What is the tallest animal in the world?","The giraffe",["The elephant","The ostrich","The blue whale"],"A giraffe can be up to 5.5 m tall.",1);
m(2,"Plants","Which part of the plant takes water from the soil?","The roots",["The leaves","The flowers","The stem"],"The roots also hold the plant in the ground.",1);
vf(2,"Humans have five senses only.",false,"Humans have many more, including balance, temperature and pain.",3);
vf(2,"A tomato is botanically a fruit.",true,"It grows from a flower and contains seeds, so it is a fruit.",2);

// ===================== 3. Maths & words =====================
m(3,"Maths","What is 12 × 12?","144",["124","132","148"],"A dozen dozens is a gross: 144.",1);
m(3,"Maths","What is the square root of 81?","9",["8","7","11"],"Nine times nine makes 81, so the square root of 81 is 9.",1);
m(3,"Maths","Which of these numbers is a prime number?","7",["9","15","21"],"7 can only be divided by 1 and itself.",1);
m(3,"Maths","Is 1 a prime number?","No",["Yes","Only in some countries","Only in advanced maths"],"A prime number has exactly two divisors: 1 has only one.",3);
m(3,"Maths","How many sides does a hexagon have?","6",["5","7","8"],"A hexagon has six sides; an octagon has eight.",1);
m(3,"Maths","How many degrees are in the angles of a triangle added together?","180°",["90°","360°","270°"],"The three angles of any triangle add up to 180°.",2);
m(3,"Maths","Which Roman numeral is 14?","XIV",["XVI","XLI","IVX"],"X = 10, IV = 4.",2);
m(3,"Maths","What is the value of pi, rounded to two decimals?","3.14",["3.41","2.72","3.21"],"Pi is the ratio of a circle’s circumference to its diameter.",1);
m(3,"Words","What is the plural of “mouse” (the animal)?","Mice",["Mouses","Mices","Mouse"],"Mouse is an irregular plural.",1);
m(3,"Words","Which word is an adjective?","Beautiful",["Quickly","Run","Table"],"An adjective describes a noun.",1);
m(3,"Words","Which month has 28 days?","All of them",["February only","None","Only in leap years"],"Every month has at least 28 days.",2);
vf(3,"A kilogram is heavier than a pound.",true,"One kilogram is about 2.2 pounds.",2);
vf(3,"Zero is an even number.",true,"Zero can be divided by 2 with no remainder.",2);

// ===================== 4. History & the world =====================
m(4,"Geography","How many continents are there?","7",["5","6","8"],"Africa, Antarctica, Asia, Europe, North America, Oceania/Australia and South America.",1);
m(4,"Geography","How many oceans are there?","5",["3","4","7"],"Pacific, Atlantic, Indian, Southern and Arctic.",2);
m(4,"Geography","Which is the largest continent by area?","Asia",["Africa","North America","Europe"],"Asia is also the most populated continent.",1);
m(4,"Geography","Which is the largest desert on Earth?","Antarctica",["The Sahara","The Gobi","The Arabian Desert"],"A desert is defined by low rainfall, not heat; Antarctica is the largest.",3);
m(4,"History","Who painted the Mona Lisa?","Leonardo da Vinci",["Michelangelo","Raphael","Picasso"],"The painting hangs in the Louvre in Paris.",1);
m(4,"History","Who was the first President of the United States?","George Washington",["Abraham Lincoln","Thomas Jefferson","Benjamin Franklin"],"He served from 1789 to 1797.",1);
m(4,"History","In which year did humans first land on the Moon?","1969",["1959","1972","1981"],"Neil Armstrong and Buzz Aldrin on Apollo 11.",1);
m(4,"History","Which wall fell in 1989, symbolising the end of the Cold War?","The Berlin Wall",["The Great Wall","Hadrian’s Wall","The Western Wall"],"It had divided East and West Berlin since 1961.",1);
m(4,"History","In which year did Christopher Columbus first reach the Americas?","1492",["1066","1776","1215"],"“In fourteen hundred ninety-two, Columbus sailed the ocean blue.”",1);
m(4,"History","Which ancient civilization built the pyramids of Giza?","The Egyptians",["The Romans","The Greeks","The Aztecs"],"The Great Pyramid was built around 2560 BC.",1);
m(4,"History","Which ship sank in 1912 on its first voyage?","The Titanic",["The Lusitania","The Bismarck","The Mayflower"],"It hit an iceberg in the North Atlantic.",1);
vf(4,"Australia is a continent.",true,"Australia is both a country and a continent.",1);
vf(4,"The Statue of Liberty was a gift from France.",true,"It was given to the United States in 1886.",2);

// ===================== Typed answers =====================
ty(1,"What is the closest star to Earth? (one word)",["Sun","The Sun"],"The Sun is about 150 million km away.",1);
ty(1,"What is the red planet? (one word)",["Mars"],"Mars looks red because of iron oxide.",1);
ty(2,"What do bees make? (one word)",["Honey"],"Bees turn nectar into honey.",1);
ty(3,"What is 7 × 8? (a number)",["56","fifty-six","fifty six"],"7 × 8 = 56.",1);
ty(3,"How many seconds are there in one minute? (a number)",["60","sixty"],"There are 60 seconds in a minute.",1);
ty(4,"What is the capital of France? (one word)",["Paris"],"Paris is on the Seine.",1);
ty(4,"Which ocean is the largest? (one word)",["Pacific","The Pacific","Pacific Ocean"],"The Pacific Ocean covers about a third of the planet.",1);

return {id:"kids",title:"Are You Smarter Than a 10-Year-Old?",kw:"smarter than 10 year old kids school basics science maths geography history general knowledge quiz fun family",subject:"School basics that adults often get wrong: can you beat a fifth grader?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
