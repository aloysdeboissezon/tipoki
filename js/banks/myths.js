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

return {id:"myths",title:"Myths & Mind-Blowing Facts",kw:"myths facts true false fake news believe wrong mind blown did you know science history animals brain quiz viral",subject:"Things everyone believes that are wrong, and true facts that sound fake",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
