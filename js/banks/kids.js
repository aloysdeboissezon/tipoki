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

// ===================== More questions (batch 2) =====================
m(1,"Science","What is the hardest natural substance on Earth?","Diamond",["Gold","Iron","Quartz"],"Diamonds are made of carbon atoms arranged in a strong crystal structure.",1);
m(1,"Science","What force keeps us on the ground and makes things fall?","Gravity",["Magnetism","Friction","Electricity"],"Gravity pulls objects towards the centre of the Earth.",1);
m(1,"Science","What is the chemical symbol for oxygen?","O",["Ox","Oy","Os"],"Os is osmium, a different element.",1);
m(1,"Science","Which metal is liquid at room temperature?","Mercury",["Lead","Tin","Iron"],"Mercury was used in old thermometers.",2);
m(1,"Science","What type of energy comes from the Sun?","Solar energy",["Wind energy","Nuclear energy","Tidal energy"],"Solar panels turn sunlight into electricity.",1);
m(1,"Space","What is the name of our galaxy?","The Milky Way",["Andromeda","The Whirlpool","The Sombrero"],"Our solar system is on one of its spiral arms.",1);
m(1,"Space","Which planet is famous for its bright rings?","Saturn",["Jupiter","Mars","Neptune"],"The rings are made of ice and rock pieces.",1);
m(1,"Space","How long does sunlight take to reach Earth?","About 8 minutes",["About 8 seconds","About 8 hours","About 8 days"],"Sunlight travels roughly 150 million kilometres to us.",3);
m(1,"Space","Who was the first person to travel into space, in 1961?","Yuri Gagarin",["Neil Armstrong","Buzz Aldrin","John Glenn"],"Gagarin orbited the Earth once in the Soviet spacecraft Vostok 1.",2);
m(1,"Space","Who was the first person to walk on the Moon?","Neil Armstrong",["Buzz Aldrin","Yuri Gagarin","Alan Shepard"],"He said, “That’s one small step for man, one giant leap for mankind.”",1);
m(1,"Space","Pluto is now classified as…","A dwarf planet",["An asteroid","A comet","A moon"],"Pluto lost its planet status in 2006.",2);
m(1,"Space","How many natural moons does Earth have?","One",["Two","Four","None"],"The Moon is about a quarter the size of Earth.",1);
vf(1,"Sound travels faster than light.",false,"Light is much faster, which is why we see lightning before we hear thunder.",1);
vf(1,"Venus is the hottest planet in our solar system.",true,"Venus is hotter than Mercury because its thick atmosphere traps heat.",2);

m(2,"Animals","What do we call animals that eat only plants?","Herbivores",["Carnivores","Omnivores","Insectivores"],"Cows, rabbits and elephants are herbivores.",1);
m(2,"Animals","What do we call animals that eat both plants and meat?","Omnivores",["Herbivores","Carnivores","Predators"],"Humans, bears and pigs are omnivores.",1);
m(2,"Animals","What is a baby kangaroo called?","A joey",["A cub","A pup","A kit"],"Joeys live in their mother’s pouch for months.",1);
m(2,"Animals","What is a group of lions called?","A pride",["A pack","A herd","A flock"],"A pride has several females, their cubs and a few males.",2);
m(2,"Animals","Which is the largest animal in the world?","The blue whale",["The African elephant","The giraffe","The great white shark"],"A blue whale can reach 30 metres in length.",1);
m(2,"Animals","How many legs does an insect have?","6",["4","8","10"],"All insects have six legs and three body parts.",1);
m(2,"Animals","Which is the largest land animal?","The African elephant",["The rhinoceros","The hippopotamus","The giraffe"],"Males can weigh up to six tonnes.",1);
m(2,"Plants","Which gas do plants release during photosynthesis?","Oxygen",["Carbon dioxide","Nitrogen","Hydrogen"],"Plants take in carbon dioxide and release oxygen.",1);
m(2,"Plants","What do bees collect from flowers to make honey?","Nectar",["Pollen only","Sap","Water"],"Bees also carry pollen from flower to flower.",1);
m(2,"Body","How many teeth does a typical adult human have?","32",["20","28","36"],"Children have 20 baby teeth and adults 32 permanent teeth, including wisdom teeth.",2);
m(2,"Body","Which blood cells carry oxygen around the body?","Red blood cells",["White blood cells","Platelets","Plasma cells"],"Red blood cells contain haemoglobin, which binds to oxygen.",2);
m(2,"Body","What is the largest bone in the human body?","The femur",["The tibia","The humerus","The skull"],"The femur is in your thigh.",3);
m(2,"Body","Which organs filter waste from the blood and make urine?","The kidneys",["The liver","The lungs","The stomach"],"We have two kidneys.",2);
vf(2,"A spider is an insect.",false,"Spiders are arachnids and have eight legs. Insects have six.",1);
vf(2,"Whales are fish.",false,"Whales are mammals: they breathe air and feed milk to their babies.",1);
vf(2,"Dolphins are mammals.",true,"They breathe air through a blowhole.",1);

m(3,"Maths","What is 9 × 9?","81",["72","79","91"],"Nine times nine is eighty-one.",1);
m(3,"Maths","What is the next number in this sequence: 2, 4, 8, 16, …?","32",["24","30","36"],"Each number is double the one before.",2);
m(3,"Maths","What is 15% of 200?","30",["15","20","45"],"10% of 200 is 20 and 5% is 10, so 15% is 30.",3);
m(3,"Maths","How many zeros does a million have?","6",["5","7","9"],"1,000,000 has six zeros.",2);
m(3,"Maths","What is the perimeter of a square with sides of 5 cm?","20 cm",["10 cm","25 cm","15 cm"],"The perimeter is 4 × 5 = 20 cm.",2);
m(3,"Maths","What is 100 ÷ 4?","25",["20","40","50"],"Dividing by four is the same as halving twice.",1);
m(3,"Shapes","What is a shape with five sides called?","A pentagon",["A hexagon","An octagon","A square"],"The US Department of Defense building is a pentagon.",1);
m(3,"Shapes","How many sides does an octagon have?","8",["6","7","10"],"A stop sign is an octagon.",2);
m(3,"Shapes","What do we call an angle of exactly 90 degrees?","A right angle",["An acute angle","An obtuse angle","A straight angle"],"The corners of a square are right angles.",1);
m(3,"Words","Which of these words is a verb?","Jump",["Table","Happy","Quickly"],"A verb describes an action or state.",1);
m(3,"Words","What is a word that sounds the same as another but is spelled differently called?","A homophone",["A synonym","An antonym","An acronym"],"“Their” and “there” are homophones.",3);
m(3,"Words","Which of these months has 31 days?","July",["April","June","September"],"A rhyme says: “Thirty days hath September, April, June and November.”",2);
m(3,"Words","What is the opposite of “ancient”?","Modern",["Old","Huge","Silent"],"Antonyms are words with opposite meanings.",2);
vf(3,"Zero is a positive number.",false,"Zero is neither positive nor negative.",2);
vf(3,"A square is a special type of rectangle.",true,"It is a rectangle whose four sides are all equal.",2);
vf(3,"The word “queue” is pronounced just like the letter Q.",true,"The letters “ueue” are silent.",2);

m(4,"World","Which is the smallest continent by area?","Australia (Oceania)",["Europe","Antarctica","South America"],"Australia is also the only continent that is a single country.",1);
m(4,"World","What is the capital of Portugal?","Lisbon",["Porto","Madrid","Faro"],"Lisbon sits on the Atlantic coast, at the mouth of the river Tagus.",1);
m(4,"World","What is the capital of Argentina?","Buenos Aires",["Santiago","Montevideo","Lima"],"Buenos Aires is famous for tango and football.",2);
m(4,"World","Which language has the most native speakers in the world?","Mandarin Chinese",["English","Spanish","Hindi"],"Spanish is second by native speakers, while English has the most speakers overall.",2);
m(4,"History","Which ancient civilisation built the Colosseum in Rome?","The Romans",["The Greeks","The Egyptians","The Vikings"],"The Colosseum could hold around 50,000 spectators.",1);
m(4,"History","Whose expedition was the first to sail around the world, between 1519 and 1522?","Ferdinand Magellan’s",["Christopher Columbus’s","Vasco da Gama’s","James Cook’s"],"Magellan died on the way; Juan Sebastián Elcano finished the journey.",3);
m(4,"History","Which ship carried the Pilgrims from England to America in 1620?","The Mayflower",["The Santa María","The Endeavour","The Beagle"],"The Pilgrims landed at what is now Massachusetts.",2);
m(4,"History","In which country did the Industrial Revolution begin?","Britain",["France","Germany","United States"],"It started in the 18th century with steam engines and textile factories.",2);
m(4,"History","Who invented the practical electric light bulb in 1879?","Thomas Edison",["Nikola Tesla","Alexander Graham Bell","Benjamin Franklin"],"Edison’s team tested thousands of materials for the filament.",1);
m(4,"History","Who invented the telephone in 1876?","Alexander Graham Bell",["Thomas Edison","Samuel Morse","Guglielmo Marconi"],"Bell made the first successful phone call to his assistant.",2);
m(4,"Art","Who painted the ceiling of the Sistine Chapel?","Michelangelo",["Leonardo da Vinci","Raphael","Donatello"],"He painted it between 1508 and 1512, lying on scaffolding.",2);
m(4,"Art","Who wrote “Romeo and Juliet”?","William Shakespeare",["Charles Dickens","Jane Austen","Oscar Wilde"],"Shakespeare wrote it around 1595.",1);
m(4,"History","In which year did World War II end?","1945",["1939","1943","1950"],"It ended in Europe in May and in Asia in September 1945.",2);
vf(4,"The Great Fire of London took place in 1666.",true,"It destroyed much of the old city, including St Paul’s Cathedral.",3);
vf(4,"The ancient Romans spoke Latin.",true,"Spanish, French, Italian and Portuguese all grew out of Latin.",1);

ty(4,"What is the capital of Italy? (one word)",["Rome","Roma"],"Rome is called the Eternal City.",1);

// ===== More questions =====
m(1,"Space","Which planet is known as the Red Planet?","Mars",["Jupiter","Saturn","Venus"],"Its red colour comes from iron oxide on the surface.",1);
m(1,"Space","Which planet has the most visible rings?","Saturn",["Jupiter","Uranus","Neptune"],"Saturn’s rings are made of ice and rock.",1);
m(1,"Space","What do we call a scientist who studies stars and planets?","An astronomer",["A geologist","A biologist","A chemist"],"Astronomers use telescopes to study space.",1);
m(1,"Space","How long does the Earth take to go around the Sun?","One year",["One day","One month","Ten years"],"The Earth orbits the Sun in about 365 days.",1);
m(1,"Science","What force pulls objects toward the ground?","Gravity",["Magnetism","Friction","Electricity"],"Gravity keeps us on the Earth.",1);
m(1,"Science","What is water called when it freezes?","Ice",["Steam","Fog","Dew"],"Water freezes at 0 °C.",1);
m(1,"Science","What is the chemical symbol for water?","H2O",["CO2","O2","NaCl"],"Water has two hydrogen atoms and one oxygen atom.",2);
m(1,"Science","How many colours are in a rainbow?","7",["5","6","9"],"Red, orange, yellow, green, blue, indigo and violet.",1);
m(1,"Science","What do magnets attract?","Iron",["Wood","Plastic","Glass"],"Magnets attract iron and some other metals.",1);
m(2,"Body","Which organ pumps blood around the body?","The heart",["The lungs","The liver","The stomach"],"The heart beats about 100,000 times a day.",1);
m(2,"Body","Which organ do you use to breathe?","The lungs",["The kidneys","The heart","The brain"],"The lungs take oxygen from the air.",1);
m(2,"Nature","What do bees make?","Honey",["Milk","Silk","Wax only"],"Bees make honey from flower nectar.",1);
m(2,"Nature","Which animal is the fastest on land?","The cheetah",["The lion","The horse","The leopard"],"Cheetahs can run up to 110 km/h.",1);
m(2,"Nature","What kind of animal is a dolphin?","A mammal",["A fish","A reptile","An amphibian"],"Dolphins breathe air and feed their young with milk.",2);
m(2,"Nature","Which bird cannot fly but is famous for swimming in Antarctica?","The penguin",["The ostrich","The kiwi","The emu"],"Penguins use their wings as flippers.",1);
vf(2,"Spiders are insects.",false,"Spiders are arachnids with eight legs; insects have six.",2);
vf(2,"A group of lions is called a pride.",true,"A pride can include up to 30 lions.",1);
m(3,"Maths","What is 7 × 8?","56",["54","49","63"],"7 × 8 equals 56 (seven eights).",1);
m(3,"Maths","How many degrees are in a right angle?","90",["45","180","360"],"Four right angles make a full turn.",1);
m(3,"Maths","What is half of 150?","75",["50","65","85"],"Half of 150 is 75 (150 ÷ 2).",1);
m(3,"Maths","What is the name of a shape with three sides?","A triangle",["A square","A circle","A pentagon"],"The sum of its angles is 180 degrees.",1);
m(3,"Words","How many letters are in the English alphabet?","26",["24","25","28"],"A to Z makes 26 letters.",1);
m(3,"Words","What do we call a word that means the same as another word?","A synonym",["An antonym","A homonym","An acronym"],"Big and large are synonyms.",2);
vf(3,"A year has 12 months.",true,"A year has 12 months and about 365 days.",1);
m(4,"History","Which ancient civilisation built the pyramids at Giza?","The ancient Egyptians",["The Romans","The Greeks","The Mayans"],"The Great Pyramid was built around 2560 BC.",1);
m(4,"History","Who sailed across the Atlantic in 1492, arriving in the Americas?","Christopher Columbus",["Marco Polo","Vasco da Gama","Magellan"],"Columbus sailed for the Spanish crown.",1);
m(4,"History","Which empire built the Colosseum?","The Roman Empire",["The Greek Empire","The Ottoman Empire","The Persian Empire"],"It was finished in AD 80.",1);
m(4,"History","Which wall fell in 1989, reuniting a European city?","The Berlin Wall",["The Great Wall","Hadrian’s Wall","The Western Wall"],"The Berlin Wall divided East and West Berlin from 1961 to 1989.",1);
m(4,"History","Which queen of Egypt is famous for her relationships with Caesar and Mark Antony?","Cleopatra",["Nefertiti","Hatshepsut","Isis"],"Cleopatra ruled Egypt from 51 to 30 BC.",2);
m(4,"History","Which ship sank in 1912 after hitting an iceberg?","The Titanic",["The Lusitania","The Bismarck","The Mayflower"],"The Titanic sank on its first voyage.",1);
m(4,"History","Which country gave the Statue of Liberty to the United States?","France",["England","Spain","Italy"],"It was a gift in 1886.",1);
m(4,"History","Which inventor is known for the light bulb?","Thomas Edison",["Nikola Tesla","Alexander Graham Bell","Benjamin Franklin"],"Edison patented a practical light bulb in 1879.",2);
m(4,"History","In which continent is Egypt located?","Africa",["Asia","Europe","South America"],"Egypt also has a part in Asia, the Sinai Peninsula.",1);
vf(4,"The first Olympic Games were in ancient Greece.",true,"They were held in Olympia in 776 BC.",2);
vf(4,"Dinosaurs lived at the same time as humans.",false,"Dinosaurs died out about 66 million years ago.",1);
ty(1,"What is the name of our galaxy? (two words)",["Milky Way","The Milky Way"],"Our galaxy contains hundreds of billions of stars.",1);
ty(2,"What do caterpillars turn into? (one word)",["Butterfly","Butterflies","A butterfly","Moth"],"A caterpillar becomes a butterfly or a moth.",1);
ty(3,"What is 9 × 9? (number)",["81"],"9 × 9 = 81.",1);

return {id:"kids",title:"Are You Smarter Than a 10-Year-Old?",kw:"smarter than 10 year old kids school basics science maths geography history general knowledge quiz fun family",subject:"School basics that adults often get wrong: can you beat a fifth grader?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
