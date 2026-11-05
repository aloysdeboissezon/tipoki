// Built-in bank: Myths & mind-blowing facts (English). Things everybody believes that are wrong, and true facts that sound fake.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (you were fooled).
window.BANK_MYTHS=(function(){
const SESS={1:"Body & brain myths",2:"Animal myths",3:"History & movie myths",4:"True facts that sound fake"};
const TAGS={1:"Body & brain",2:"Animals",3:"History & movies",4:"Sounds fake"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Body & brain myths =====================
vf(1,"We only use 10% of our brain.",false,"Brain scans show we use virtually all of our brain, just not all regions at the same time.",1);
vf(1,"Cracking your knuckles causes arthritis.",false,"Studies have found no link between knuckle cracking and arthritis.",2);
vf(1,"Sugar makes children hyperactive.",false,"Controlled studies have found no link between sugar and hyperactivity; it is mostly expectation.",2);
vf(1,"Blood in your veins is blue until it touches oxygen.",false,"Blood is always red. Veins look blue because of how light passes through skin.",2);
vf(1,"Shaving makes your hair grow back thicker.",false,"Shaved hair has a blunt tip that feels coarser, but it does not grow back thicker.",2);
vf(1,"Swallowed chewing gum stays in your stomach for seven years.",false,"Gum passes through your digestive system within days like most food.",1);
vf(1,"You lose most of your body heat through your head.",false,"You lose heat in proportion to the area of skin that is exposed; the head is just one part.",3);
m(1,"Body","Which part of the tongue tastes sweet?","The whole tongue",["The tip only","The sides only","The back only"],"The “tongue map” is a myth: all taste areas can detect all basic tastes.",2);
vf(1,"You can see in complete darkness if you wait long enough.",false,"If there is truly no light, your eyes cannot see anything.",3);
vf(1,"Humans have more than five senses.",true,"Humans also sense balance, temperature, pain and body position, among others.",2);

// ===================== 2. Animal myths =====================
vf(2,"Goldfish only have a three-second memory.",false,"Goldfish can remember things for months.",1);
vf(2,"Bulls get angry because they see the colour red.",false,"Bulls are red-green colour-blind; the movement of the cape makes them charge.",2);
vf(2,"Bats are blind.",false,"All bats can see; many also use echolocation.",1);
vf(2,"Ostriches bury their heads in the sand when scared.",false,"They do not; they lie flat on the ground to hide.",2);
vf(2,"Camels store water in their humps.",false,"The humps store fat, which gives them energy.",2);
vf(2,"A chameleon changes colour mostly to blend in with the background.",false,"Mostly it changes colour to signal mood and regulate temperature.",3);
m(2,"Animals","What colour is a polar bear’s skin?","Black",["White","Pink","Grey"],"The fur is transparent and looks white; the skin underneath is black.",3);
m(2,"Animals","How many hearts does an octopus have?","Three",["One","Two","Eight"],"Two hearts pump blood through the gills, one pumps it to the body.",2);
m(2,"Animals","Which of these has existed on Earth the longest?","Sharks",["Trees","Flowering plants","Mammals"],"Sharks are about 450 million years old; the first trees appeared about 385 million years ago.",3);
vf(2,"Lightning never strikes the same place twice.",false,"It does: the Empire State Building is hit around 20 to 25 times a year.",1);
vf(2,"Dogs see only in black and white.",false,"Dogs see colours, but fewer than humans (mainly blues and yellows).",2);

// ===================== 3. History & movie myths =====================
vf(3,"Napoleon Bonaparte was extremely short.",false,"He was about 1.69 m (5 ft 7 in), average for his time; the myth came from different units and British cartoons.",2);
vf(3,"Vikings wore horned helmets in battle.",false,"There is no evidence of this; the image came from 19th-century opera costumes.",1);
vf(3,"Albert Einstein failed maths at school.",false,"He excelled at maths from an early age.",1);
vf(3,"Marie Antoinette said “Let them eat cake”.",false,"There is no evidence she said it; the phrase appeared in writing before she came to France.",2);
vf(3,"People in the Middle Ages thought the Earth was flat.",false,"Educated people knew the Earth was round long before Columbus.",3);
m(3,"Movies","What is the actual line spoken in The Empire Strikes Back?","“No, I am your father”",["“Luke, I am your father”","“Luke, I’m your dad”","“I am your father, Luke”"],"The common misquote is “Luke, I am your father”.",2);
m(3,"Movies","In Sherlock Holmes stories, did Holmes ever say “Elementary, my dear Watson”?","Not in the original books",["Yes, in every story","Yes, in the first story","Only in the last story"],"The phrase became famous in films and plays, not in Conan Doyle’s books.",3);
m(3,"Movies","Who is Frankenstein in Mary Shelley’s novel?","The scientist who creates the creature",["The monster","The assistant Igor","The villagers"],"The creature has no name; Victor Frankenstein is the scientist.",2);
m(3,"History","Who lived closer in time to the Moon landing: Cleopatra or the builders of the Great Pyramid?","Cleopatra lived closer to the Moon landing",["The pyramid builders lived closer","It’s a tie","Impossible to say"],"The Great Pyramid was built around 2560 BC; Cleopatra lived about 2,000 years ago, closer to us than to the pyramid.",3);
m(3,"History","Which was founded first: a famous English university or the Aztec capital Tenochtitlan?","The University of Oxford",["Tenochtitlan","They were founded the same year","Neither was ever founded"],"Teaching at Oxford began around 1096; Tenochtitlan was founded in 1325.",3);
vf(3,"The Great Wall of China is visible from space with the naked eye.",false,"It is too narrow to be seen without aid from low Earth orbit.",1);
vf(3,"Sir Isaac Newton was inspired by an apple falling on his head.",false,"The story says he saw an apple fall, not hit his head; it was a story told later.",3);

// ===================== 4. True facts that sound fake =====================
vf(4,"A day on Venus is longer than its year.",true,"Venus takes 243 Earth days to rotate and 225 to orbit the Sun.",3);
vf(4,"Honey never spoils.",true,"Archaeologists found edible honey in ancient Egyptian tombs.",2);
vf(4,"A banana is a berry, but a strawberry is not.",true,"Botanically, bananas qualify as berries; strawberries are not true berries.",3);
vf(4,"Octopuses have blue blood.",true,"Their blood uses copper-based hemocyanin, which makes it blue.",3);
vf(4,"Wombat poop is cube-shaped.",true,"Wombats produce cube-shaped droppings, which stop them rolling away.",3);
vf(4,"There are more trees on Earth than stars in the Milky Way.",true,"Estimated: roughly three trillion trees versus 100–400 billion stars.",3);
m(4,"Fact","Which of these is a nut, botanically?","Hazelnut",["Peanut","Almond","Cashew"],"Peanuts are legumes, and almonds and cashews are seeds of drupes, while hazelnuts are true nuts.",3);
m(4,"Fact","Which is the only letter that does not appear in any US state name?","Q",["X","Z","J"],"No US state name contains the letter Q.",3);
m(4,"Fact","How many hearts does a squid have?","Three",["One","Two","Four"],"Squids and octopuses both have three hearts.",3);
m(4,"Fact","What is the closest planet to Earth on average?","Mercury",["Venus","Mars","Neptune"],"Averaged over time, Mercury is closest to Earth, and to every other planet.",3);
m(4,"Fact","How many times does a hummingbird beat its wings per second (about)?","50 to 80 times",["5 times","10 times","1,000 times"],"Hummingbirds can hover thanks to very fast wing beats.",2);
m(4,"Fact","Which is the fastest land animal?","The cheetah",["The lion","The greyhound","The horse"],"A cheetah can reach about 100 km/h in short bursts.",1);

// ===================== Typed answers =====================
ty(1,"What percentage of our brain do we supposedly use, according to the myth? (a number)",["10","10%","ten"],"It’s a myth: we use all of it.",1);
ty(2,"Which animal supposedly has a 3-second memory? (one word)",["Goldfish","Gold fish"],"Goldfish remember for months.",1);
ty(2,"What is stored in a camel’s hump? (one word)",["Fat"],"The hump stores fat.",2);
ty(3,"Which scientist is wrongly said to have failed maths? (surname)",["Einstein","Albert Einstein"],"Einstein excelled at maths.",1);
ty(3,"What is the first name of the scientist in Mary Shelley’s novel about the monster? (one word)",["Victor"],"Victor Frankenstein is the scientist.",2);
ty(4,"Which planet has a day longer than its year? (one word)",["Venus"],"Venus rotates very slowly.",2);
ty(4,"What food never spoils? (one word)",["Honey"],"Edible honey was found in Egyptian tombs.",1);

// ===================== More questions (batch 2) =====================
vf(1,"Eating carrots gives you night vision.",false,"Carrots have vitamin A, which is good for eyes, but the myth came from British WWII propaganda hiding radar.",2);
vf(1,"You must wait 30 minutes after eating before swimming.",false,"There is no evidence that swimming after a meal causes dangerous cramps.",2);
vf(1,"Hair and fingernails keep growing after death.",false,"The skin shrinks and pulls back, which makes them look longer.",2);
vf(1,"Reading in dim light permanently damages your eyes.",false,"It can tire your eyes, but the effect is temporary.",2);
vf(1,"You can catch a cold just by being out in the cold weather.",false,"Colds are caused by viruses, though we spend more time together indoors in winter.",2);
vf(1,"People are either left-brained or right-brained.",false,"Both sides of the brain work together, and personality is not decided by one side.",2);
vf(1,"Babies are born with more bones than adults.",true,"Babies have around 300 bones, many of which fuse together so adults have 206.",2);
vf(1,"Your stomach lining is replaced every few days.",true,"Without regular renewal, stomach acid would digest the stomach itself.",3);
m(1,"Body","What share of the body’s energy does the brain use?","About 20%",["About 2%","About 50%","About 80%"],"The brain is only about 2% of body weight but uses around a fifth of the energy.",2);
m(1,"Body","Roughly how much of the adult human body is water?","About 60%",["About 30%","About 90%","About 10%"],"The exact number varies with age and body composition.",2);
m(1,"Body","How long can a person typically survive without water?","About three days",["About three hours","About three weeks","About three months"],"It depends on heat and activity, but a few days is the limit.",3);
m(1,"Body","Which blood type is the most common in the world?","O positive",["A positive","B negative","AB negative"],"About 38% of the world population has O positive blood.",3);

vf(2,"Lemmings commit mass suicide by jumping off cliffs.",false,"The myth comes from a staged scene in the 1958 Disney film “White Wilderness”.",3);
vf(2,"Touching a baby bird makes its mother reject it.",false,"Most birds have a weak sense of smell and don’t abandon their chicks.",2);
vf(2,"Sharks never get cancer.",false,"Sharks can get cancer, and tumours have been found in many species.",3);
vf(2,"Elephants are terrified of mice.",false,"There’s no evidence of this and elephants usually ignore mice.",2);
vf(2,"A duck’s quack does not echo.",false,"It does echo, but it can be hard to hear because it fades quietly.",3);
vf(2,"Sloths can hold their breath for longer than dolphins.",true,"Sloths can slow their heart rate and stay under for up to 40 minutes.",3);
vf(2,"A group of flamingos is called a flamboyance.",true,"Other fun group names include a parliament of owls and a murder of crows.",2);
m(2,"Animals","What is a group of crows called?","A murder",["A parade","A flock of fortune","A choir"],"Crows are very intelligent and can recognise human faces.",2);
m(2,"Animals","Which of these animals cannot jump?","The elephant",["The kangaroo","The frog","The rabbit"],"An elephant’s leg bones and weight make jumping impossible.",2);
m(2,"Animals","Flamingos are pink because of…","Their diet",["Their genes only","The sun’s heat","The water they stand in"],"They eat algae and shrimp that contain pink-orange pigments.",2);

vf(3,"Christopher Columbus proved that the Earth is round.",false,"Educated people already knew the Earth was round, and Columbus underestimated its size.",3);
vf(3,"Thomas Edison was the first person to invent an electric light bulb.",false,"Several inventors made bulbs earlier, but Edison made one practical and long-lasting.",3);
vf(3,"In “Casablanca”, Humphrey Bogart says “Play it again, Sam”.",false,"The actual line is “Play it, Sam. Play ‘As Time Goes By’.”",3);
vf(3,"Captain Kirk says “Beam me up, Scotty” in the original Star Trek series.",false,"The exact phrase was never said in the original series.",3);
vf(3,"George Washington had wooden teeth.",false,"His dentures were made from ivory, metal and human or animal teeth, but not wood.",2);
vf(3,"The Salem witch trials ended with the accused being burned at the stake.",false,"Those found guilty were hanged, not burned.",3);
vf(3,"Ancient Romans used “vomitoriums” to be sick during feasts so they could eat more.",false,"A vomitorium was a passage in a stadium that let crowds out quickly.",3);
vf(3,"The shortest war in history lasted less than an hour.",true,"The Anglo-Zanzibar War of 1896 lasted between 38 and 45 minutes.",3);

vf(4,"Bananas are slightly radioactive.",true,"They contain potassium-40, but the dose is harmless.",2);
vf(4,"There are more possible chess games than atoms in the observable universe.",true,"Claude Shannon’s estimate was about 10^120 possible games.",3);
vf(4,"Sharks existed before trees did.",true,"Sharks appeared around 450 million years ago and trees about 350 million.",3);
vf(4,"Russia has a larger surface area than the planet Pluto.",true,"Russia covers about 17 million km², while Pluto’s surface is around 16.6 million km².",3);
vf(4,"Nintendo was founded in 1889, originally as a playing card company.",true,"Fusajiro Yamauchi started making hanafuda cards in Kyoto.",3);
vf(4,"The Eiffel Tower can be about 15 cm taller in summer.",true,"Iron expands in the heat.",3);
vf(4,"Cats cannot taste sweetness.",true,"Cats lack the gene for sweet taste receptors.",3);
m(4,"Facts","What is the national animal of Scotland?","The unicorn",["The lion","The stag","The golden eagle"],"The unicorn has been a symbol of Scotland since the 12th century.",2);
m(4,"Facts","Roughly how much of an apple is air?","About 25%",["About 5%","About 50%","About 75%"],"That is why apples float in water.",3);
m(4,"Facts","Any two people share about how much of their DNA?","About 99.9%",["About 90%","About 75%","About 50%"],"The small difference explains all the variety between us.",2);
m(4,"Facts","What is the most abundant element in the universe?","Hydrogen",["Oxygen","Carbon","Helium"],"About three quarters of all normal matter is hydrogen.",2);
m(4,"Facts","On average, how long is a day on Mars?","About 24 hours and 37 minutes",["About 12 hours","About 48 hours","About 10 days"],"Martian days are called sols.",3);

ty(2,"What do we call a group of owls? (one word)",["parliament"],"A group of owls is called a parliament.",3);

// ===== More questions =====
m(1,"Body","Do we only use 10% of our brains?","No, we use virtually all of it",["Yes, only 10%","Yes, only 30%","Only while sleeping"],"Brain scans show activity in nearly all brain regions.",1);
m(1,"Body","Does cracking your knuckles cause arthritis?","No, studies show no link",["Yes, always","Only in old age","Yes, in women"],"The popping sound is gas bubbles in the joint fluid.",2);
m(1,"Body","Does shaving make hair grow back thicker?","No",["Yes, always","Only on legs","Only on the face"],"Shaved hair has a blunt tip, so it only feels coarser.",1);
m(1,"Body","Does sugar make children hyperactive?","No, studies find no link",["Yes, always","Only chocolate does","Only in boys"],"The effect is mainly in parents’ expectations.",2);
m(1,"Body","Do you need to wait 24 hours after eating before swimming?","No",["Yes, always","Only for one hour","Only in the sea"],"There is no evidence that swimming after eating is dangerous.",2);
m(1,"Body","Is a hangover cured by drinking coffee?","No, only time helps",["Yes, quickly","Yes, with milk","Yes, if strong"],"Coffee may wake you but does not remove alcohol.",2);
m(1,"Body","Does the tongue have separate zones for sweet, sour and bitter?","No, all areas can taste all flavours",["Yes, a clear map","Only sweet is at the tip","Only bitter is at the sides"],"The tongue map is a myth.",2);
m(1,"Body","Do goosebumps happen only when we are cold?","No, also with emotions",["Yes, only cold","Only when scared","Only in winter"],"They also appear with strong emotions or music.",2);
m(1,"Body","Do humans have only five senses?","No, there are more",["Yes, exactly five","Yes, six","Only four"],"We also sense balance, temperature and body position.",2);
vf(1,"Humans swallow eight spiders a year in their sleep.",false,"This is a myth with no evidence.",1);
m(2,"Animals","Do bats see nothing at all?","No, bats can see",["Yes, they are blind","Only at night","Only in cold weather"],"Bats use echolocation but also have vision.",1);
m(2,"Animals","Do camels store water in their humps?","No, they store fat",["Yes, water","Yes, milk","Yes, sand"],"A camel’s hump stores fat as an energy reserve.",1);
m(2,"Animals","Do ostriches bury their heads in the sand?","No",["Yes, when scared","Yes, to sleep","Yes, to hide eggs"],"They lower their heads to the ground to turn eggs or eat.",1);
m(2,"Animals","Do bulls get angry at the colour red?","No, bulls are colour-blind to red",["Yes, red makes them mad","Only dark red","Only in Spain"],"Bulls react to the movement of the cape.",1);
m(2,"Animals","Do goldfish have a three-second memory?","No, they remember for months",["Yes, three seconds","Yes, ten seconds","Only one minute"],"Goldfish can be trained and remember for months.",2);
m(2,"Animals","Do lemmings commit mass suicide?","No",["Yes, every year","Only in the Arctic","Only in spring"],"The myth comes from a 1958 Disney documentary.",2);
m(2,"Animals","Do chameleons change colour mainly to blend in?","No, mostly for communication and temperature",["Yes, only for camouflage","Only when sleeping","Only when eating"],"Mood, light and temperature affect their colour.",2);
m(2,"Animals","Do sharks have bones?","No, their skeleton is cartilage",["Yes, strong bones","Yes, light bones","Only the great white"],"Cartilage is flexible and lighter than bone.",2);
m(2,"Animals","Do cats always land on their feet?","Not always, but they often right themselves",["Yes, always","Never","Only kittens"],"Cats have a righting reflex but can still be injured.",2);
vf(2,"Elephants are afraid of mice.",false,"There is no evidence that elephants are afraid of mice.",2);
m(3,"History","Did Vikings wear horned helmets in battle?","No, there is no evidence for it",["Yes, always","Only the chiefs","Only in ceremonies"],"The image came from 19th-century opera costumes.",1);
m(3,"History","Did Napoleon have an unusually short height?","No, he was about average",["Yes, very short","He was a giant","He was 1.40 m"],"He was about 1.69 m, and the legend comes from different units.",2);
m(3,"History","Is the Great Wall of China visible from space with the naked eye?","No",["Yes, always","Only at night","Only from the Moon"],"It is too narrow to be seen from space without aid.",2);
m(3,"History","Did Marie Antoinette say “Let them eat cake”?","There is no evidence she did",["Yes, in 1789","Yes, in 1791","Yes, in a letter"],"The phrase appeared in Rousseau’s writings before she arrived in France.",2);
m(3,"History","Did Einstein fail maths at school?","No, he excelled in maths",["Yes, in primary school","Yes, in university","Yes, in physics"],"He mastered calculus by 15.",1);
m(3,"History","Did Christopher Columbus prove the Earth was round?","No, educated people already knew",["Yes, in 1492","Yes, with a ship","Yes, with a map"],"The Greeks measured the Earth’s size about 2,000 years earlier.",2);
m(3,"History","Did people in medieval times believe the Earth was flat?","Educated people knew it was round",["Yes, everyone","Only kings","Only the church"],"Medieval scholars knew the Earth was spherical.",2);
vf(3,"Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.",true,"The Great Pyramid was built around 2560 BC; Cleopatra lived around 30 BC.",3);
vf(3,"Samurai were just warriors and never had other roles.",false,"Many samurai served as administrators, poets and scholars.",3);
m(4,"True facts","How long can sealed honey last without spoiling?","Honey can last for thousands of years",["It lasts only 10 years","It spoils in 1 year","It must be refrigerated"],"Archaeologists found edible honey in Egyptian tombs.",2);
m(4,"True facts","Which animal has fingerprints almost identical to humans’?","The koala",["The chimpanzee","The dog","The pig"],"Koalas have fingerprints very similar to ours.",3);
m(4,"True facts","Which planet has days longer than its year?","Venus",["Mercury","Mars","Neptune"],"A day on Venus lasts about 243 Earth days, and its year 225.",3);
m(4,"True facts","Which fruit is technically a berry?","The banana",["The strawberry","The raspberry","The blackberry"],"Botanically, strawberries and raspberries are not true berries.",3);
m(4,"True facts","How long can a snail sleep?","Up to three years",["One week","One month","One year"],"Snails can hibernate or estivate for years in harsh conditions.",3);
m(4,"True facts","Which country has the most lakes in the world?","Canada",["Finland","Russia","United States"],"Canada has over 2 million lakes.",3);
m(4,"True facts","What is a group of flamingos called?","A flamboyance",["A flock","A parade","A colony"],"It is also called a colony or a stand.",3);
vf(4,"Venus is the hottest planet in the Solar System.",true,"Venus is hotter than Mercury because of its thick atmosphere.",2);
ty(4,"What is the only mammal capable of true flight? (one word)",["Bat","Bats"],"Bats are the only mammals that can truly fly.",2);

return {id:"myths",title:"Myths & Mind-Blowing Facts",kw:"myths facts true false fake news believe wrong mind blown did you know science history animals brain quiz viral",subject:"Things everyone believes that are wrong, and true facts that sound fake",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
