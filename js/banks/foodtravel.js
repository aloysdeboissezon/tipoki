// Built-in bank: Food & travel (English). Where foods come from, dishes of the world, landmarks, and travel know-how.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for globetrotters).
window.BANK_FOODTRAVEL=(function(){
const SESS={1:"Where does it come from?",2:"Eat the world",3:"Landmarks & wonders",4:"Travel know-how"};
const TAGS={1:"Origins",2:"Dishes",3:"Landmarks",4:"Travel"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Where does it come from? =====================
m(1,"Pizza","In which Italian city was modern pizza born?","Naples",["Rome","Milan","Venice"],"Pizza Margherita, with tomato, mozzarella and basil, is said to date from Naples in 1889.",1);
m(1,"Sushi","Which country invented sushi as we know it today?","Japan",["China","Korea","Thailand"],"Modern nigiri sushi developed in Edo (Tokyo) in the 1800s.",1);
m(1,"Chocolate","Which continent did cacao, the base of chocolate, first come from?","The Americas",["Africa","Asia","Europe"],"The Maya and Aztecs drank cacao long before Europeans.",2);
m(1,"Potato","Where do potatoes originally come from?","The Andes (South America)",["Ireland","Russia","Germany"],"Potatoes were domesticated in the Andes thousands of years ago.",2);
m(1,"Coffee","In which country did coffee likely originate?","Ethiopia",["Colombia","Brazil","Yemen"],"Legend says a goat herder named Kaldi noticed his goats full of energy after eating the berries.",2);
m(1,"Tea","Which country is considered the birthplace of tea?","China",["India","Japan","England"],"Tea has been drunk in China for thousands of years.",1);
m(1,"Hamburger","Which German city gave its name to the burger?","Hamburg",["Berlin","Frankfurt","Munich"],"The modern burger developed in the US, but the name comes from Hamburg.",2);
m(1,"Hawaiian pizza","In which country was the Hawaiian pizza invented?","Canada",["Hawaii (USA)","Italy","Australia"],"Sam Panopoulos created it in Chatham, Ontario, in 1962.",3);
m(1,"Nutella","In which country was Nutella invented?","Italy",["France","Switzerland","Belgium"],"Ferrero created it in Alba, in Piedmont, after WWII.",2);
m(1,"Croissant","From which country does the crescent-shaped pastry that inspired the croissant come?","Austria",["France","Belgium","Switzerland"],"Its ancestor, the kipferl, comes from Vienna; the French turned it into the flaky croissant.",3);
m(1,"Tomato","Before 1500, did Italians eat tomatoes?","No, they came from the Americas",["Yes, since Roman times","Yes, since the Middle Ages","Only in Sicily"],"Tomatoes arrived in Europe after the Spanish reached the Americas.",3);
vf(1,"French fries come from France.",false,"They most likely come from Belgium; the name “French” is debated.",3);
vf(1,"Fortune cookies are a Chinese tradition.",false,"They were popularised in California by Japanese-American bakers.",3);

// ===================== 2. Eat the world =====================
m(2,"Spain","Which Spanish dish is made of rice, saffron and seafood or meat, from Valencia?","Paella",["Gazpacho","Tortilla","Fideuà"],"Paella is a Valencian dish cooked in a wide pan.",1);
m(2,"Spain","What is a cold Spanish soup made with tomatoes called?","Gazpacho",["Paella","Salmorejo","Tortilla"],"Gazpacho is served cold in summer.",1);
m(2,"Italy","Which Italian dessert means “pick me up”?","Tiramisu",["Panna cotta","Cannoli","Gelato"],"Tiramisu means “pull me up” in Venetian dialect.",2);
m(2,"Peru","Which Peruvian dish is raw fish marinated in citrus juice?","Ceviche",["Sashimi","Carpaccio","Poke"],"Ceviche is Peru’s national dish.",2);
m(2,"Vietnam","Which Vietnamese noodle soup is the national dish?","Pho",["Ramen","Laksa","Tom yum"],"Pho is eaten at breakfast in Hanoi.",2);
m(2,"Canada","Which Canadian dish combines fries, cheese curds and gravy?","Poutine",["Pasta","Pierogi","Nachos"],"Poutine comes from Quebec.",1);
m(2,"Morocco","In which cone-shaped pot is a Moroccan stew cooked?","A tagine",["A wok","A paella pan","A fondue pot"],"The dish is also called tagine.",2);
m(2,"Switzerland","Which Swiss dish is melted cheese eaten with bread?","Fondue",["Raclette","Rösti","Müsli"],"Raclette is also melted cheese but scraped on to potatoes.",1);
m(2,"Korea","Which Korean side dish is fermented cabbage?","Kimchi",["Bibimbap","Bulgogi","Tteokbokki"],"Kimchi is eaten at almost every Korean meal.",1);
vf(2,"Spaghetti carbonara contains cream in the traditional recipe.",false,"Traditional carbonara uses eggs, pecorino cheese, guanciale and pepper, never cream.",3);
vf(2,"Tapas come from Spain.",true,"Tapas are small portions of food served with drinks in Spain.",1);

// ===================== 3. Landmarks & wonders =====================
m(3,"Monument","Who built the Taj Mahal and why?","Shah Jahan, in memory of his wife",["Akbar, as a fort","A British governor, as a palace","Ashoka, as a temple"],"The Taj Mahal was built in Agra between about 1632 and 1653.",2);
m(3,"Monument","For which event was the Eiffel Tower built?","The 1889 World’s Fair",["The 1900 Olympics","The French Revolution","The Paris Peace Conference"],"The tower was meant to be temporary, and it stayed.",2);
m(3,"Monument","Which country gave the Statue of Liberty to the United States?","France",["Britain","Spain","Italy"],"It was dedicated in 1886.",1);
m(3,"Wonder","Which ancient wonder is the only one still standing?","The Great Pyramid of Giza",["The Colossus of Rhodes","The Hanging Gardens","The Lighthouse of Alexandria"],"The pyramid is over 4,500 years old.",2);
m(3,"Wonder","Which Inca citadel high in the Peruvian Andes is a New Seven Wonder?","Machu Picchu",["Chichén Itzá","Petra","Tikal"],"It was built in the 15th century.",1);
m(3,"Architecture","Who was the Catalan architect of the Sagrada Família?","Antoni Gaudí",["Santiago Calatrava","Oscar Niemeyer","Frank Gehry"],"Gaudí took over the project in 1883 and it is still being completed.",2);
m(3,"Architecture","Which is the tallest building in the world?","Burj Khalifa (Dubai)",["Shanghai Tower","Taipei 101","Empire State Building"],"It stands at 828 metres.",1);
m(3,"Nature","In which country is the Grand Canyon?","The United States (Arizona)",["Canada","Mexico","Brazil"],"The Colorado River carved it over millions of years.",1);
m(3,"Nature","What causes the Northern Lights?","Charged particles from the Sun hitting the atmosphere",["Reflections of the ice","Volcanic gases","Moonlight"],"The lights are seen near the poles, in places like Iceland and Norway.",2);
m(3,"Museum","Which museum in Paris houses the Mona Lisa?","The Louvre",["Musée d’Orsay","Centre Pompidou","Prado"],"The Louvre is the most visited museum in the world.",1);
m(3,"Museum","Which Madrid museum houses Velázquez’s Las Meninas?","The Prado",["The Reina Sofía","The Louvre","The Uffizi"],"The Prado is one of Spain’s top museums.",3);
vf(3,"The Leaning Tower of Pisa is in Italy.",true,"It started to lean during its construction in the 12th century because of soft ground.",1);
vf(3,"Big Ben is the name of the tower at the Palace of Westminster.",false,"Big Ben is the nickname of the great bell; the tower is called Elizabeth Tower.",3);

// ===================== 4. Travel know-how =====================
m(4,"Money","What is the currency of Japan?","Yen",["Yuan","Won","Baht"],"The yen is the third most traded currency.",1);
m(4,"Money","What is the currency of the United Kingdom?","Pound sterling",["Euro","Dollar","Krone"],"The UK did not adopt the euro.",1);
m(4,"Money","What is the currency of Switzerland?","Swiss franc",["Euro","Krone","Mark"],"Switzerland uses the franc, not the euro.",1);
m(4,"Nicknames","Which city is nicknamed “The Big Apple”?","New York",["Los Angeles","Chicago","Boston"],"The nickname became popular in the 1970s.",1);
m(4,"Nicknames","Which city is nicknamed “The Eternal City”?","Rome",["Athens","Jerusalem","Cairo"],"Rome is more than 2,700 years old.",2);
m(4,"Nicknames","Which city is nicknamed “The City of Light”?","Paris",["Lyon","Vienna","Las Vegas"],"Paris was a centre of ideas during the Enlightenment.",1);
m(4,"Driving","On which side of the road do people drive in the UK?","On the left",["On the right","In the middle","It depends on the city"],"Japan, India and Australia also drive on the left.",1);
m(4,"Language","What does “Gracias” mean?","Thank you",["Hello","Please","Goodbye"],"Gracias is Spanish for “thank you”.",1);
m(4,"Language","Which language is spoken in Brazil?","Portuguese",["Spanish","English","French"],"Brazil is the largest Portuguese-speaking country.",1);
m(4,"Records","Which is the most visited country in the world by tourists?","France",["Spain","Italy","United States"],"France welcomes around 100 million visitors a year.",2);
m(4,"Records","What is the shortest flight route you can book, between two Scottish islands?","Westray to Papa Westray (about 1 minute)",["London to Paris","Madrid to Barcelona","Dubai to Doha"],"The flight lasts around a minute in good weather.",3);
vf(4,"Dubai is the capital of the United Arab Emirates.",false,"The capital of the UAE is Abu Dhabi; Dubai is the biggest city.",2);

// ===================== Typed answers =====================
ty(1,"In which country was pizza born? (one word)",["Italy"],"Pizza comes from Naples, Italy.",1);
ty(1,"Which country is the origin of sushi? (one word)",["Japan"],"Sushi is a Japanese dish.",1);
ty(2,"What is the Spanish dish made with rice and saffron, from Valencia? (one word)",["Paella"],"Paella comes from the Valencia region.",1);
ty(3,"Which Paris monument was built for the 1889 World’s Fair? (two words)",["Eiffel Tower","The Eiffel Tower"],"Gustave Eiffel’s company built it.",1);
ty(3,"In which city is the Colosseum? (one word)",["Rome"],"The Colosseum is in Rome.",1);
ty(4,"What currency does Japan use? (one word)",["Yen","The yen"],"The yen is Japan’s currency.",1);
ty(4,"Which city is nicknamed the Big Apple? (two words)",["New York","New York City","NYC"],"The Big Apple is New York.",1);

return {id:"foodtravel",title:"Food & Travel Challenge",kw:"food travel dishes pizza sushi paella landmarks wonders countries cities currency tourism foodie quiz",subject:"Where foods come from, dishes of the world, landmarks and travel know-how",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
