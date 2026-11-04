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

// ===================== More questions (batch 2) =====================
m(1,"Origins","Feta cheese is a traditional product of which country?","Greece",["Turkey","Italy","Bulgaria"],"Feta is made from sheep’s milk, sometimes mixed with goat’s milk, and has protected status in the EU.",1);
m(1,"Origins","Real Champagne can only come from which country?","France",["Italy","Spain","Belgium"],"Sparkling wine made elsewhere can’t legally be called Champagne in the EU.",1);
m(1,"Origins","Gelato is a creamy frozen dessert from which country?","Italy",["France","Greece","Argentina"],"Gelato has less air and fat than most ice cream.",1);
m(1,"Origins","The Caesar salad was invented in which country?","Mexico",["Italy","United States","France"],"Restaurateur Caesar Cardini created it in Tijuana in the 1920s.",3);
m(1,"Origins","The sandwich was named after which English noble?","The Earl of Sandwich",["The Duke of Wellington","Lord Byron","Earl Grey"],"He is said to have asked for meat between bread so he could keep gambling.",2);
m(1,"Origins","Which country produces the most coffee in the world?","Brazil",["Colombia","Vietnam","Ethiopia"],"Brazil produces roughly a third of the world’s coffee.",2);
m(1,"Origins","Tequila is made in which country?","Mexico",["Spain","Peru","Cuba"],"It is made from the blue agave plant, mostly in the state of Jalisco.",1);
vf(1,"Spaghetti with meatballs is a traditional dish from Italy.",false,"It was created by Italian immigrants in the United States.",3);
vf(1,"Pineapples grow on trees.",false,"Each pineapple grows from the centre of a low plant on the ground.",2);
vf(1,"Ketchup was originally a fish sauce from southern China.",true,"The word comes from “ke-tsiap”, a fermented fish sauce. Tomatoes were added in the 19th century.",3);

m(2,"Dishes","What is hummus mainly made from?","Chickpeas",["Lentils","Aubergine","Potatoes"],"It is a staple of Middle Eastern cuisine, blended with tahini, lemon and garlic.",1);
m(2,"Dishes","What is guacamole made from?","Avocado",["Lime","Tomato","Corn"],"The word comes from the Aztec Nahuatl “āhuacamōlli”, meaning avocado sauce.",1);
m(2,"Dishes","What is tofu made from?","Soybeans",["Rice","Milk","Mushrooms"],"Tofu is soybean curd and a source of protein in Asian cuisine.",1);
m(2,"Dishes","Which Hungarian dish is a stew flavoured with paprika?","Goulash",["Borscht","Pierogi","Schnitzel"],"Goulash has been a Hungarian staple since medieval herders.",2);
m(2,"Dishes","Borscht, a bright red soup, is made mainly with which vegetable?","Beetroot",["Tomato","Red cabbage","Carrot"],"It is popular in Ukraine, Russia and Poland.",2);
m(2,"Dishes","Which Korean rice dish is topped with vegetables, meat and a fried egg?","Bibimbap",["Kimbap","Bulgogi","Tteokbokki"],"The name means “mixed rice”.",2);
m(2,"Dishes","Which Greek dish is made of layers of aubergine, minced meat and béchamel sauce?","Moussaka",["Souvlaki","Spanakopita","Tzatziki"],"It is often compared to lasagne.",2);
m(2,"Dishes","What is “injera”, a staple in Ethiopia?","A spongy sourdough flatbread",["A spicy sausage","A fermented tea","A fried banana"],"People use pieces of injera to scoop up stews with their hands.",3);
m(2,"Dishes","What cheese is traditionally used on a pizza Margherita?","Mozzarella",["Cheddar","Parmesan","Gouda"],"The colours of the pizza (red, white and green) match the Italian flag.",1);
m(2,"Dishes","Which Italian dish is a creamy rice dish stirred slowly with stock?","Risotto",["Paella","Polenta","Gnocchi"],"Arborio and Carnaroli are classic risotto rice varieties.",1);
vf(2,"Sushi always contains raw fish.",false,"Sushi refers to vinegared rice. Raw fish is only in some types, like sashimi-style pieces.",1);
vf(2,"Chilli peppers are native to the Americas.",true,"Christopher Columbus brought them to Europe, and they spread to Asia and Africa.",3);

m(3,"Landmarks","The statue of Christ the Redeemer stands above which city?","Rio de Janeiro",["São Paulo","Lisbon","Buenos Aires"],"It stands on Mount Corcovado and was completed in 1931.",1);
m(3,"Landmarks","Which city is home to the Opera House with white sail-shaped roofs?","Sydney",["Melbourne","Auckland","Perth"],"Danish architect Jørn Utzon designed it, and it opened in 1973.",1);
m(3,"Landmarks","Stonehenge, the prehistoric stone circle, is in which country?","England",["Scotland","Ireland","Wales"],"Some of its stones were carried from Wales, over 200 km away.",1);
m(3,"Landmarks","In which city is the Brandenburg Gate?","Berlin",["Vienna","Prague","Munich"],"It was a symbol of a divided Germany during the Cold War.",1);
m(3,"Landmarks","Hagia Sophia, once a cathedral and later a mosque, is in which city?","Istanbul",["Athens","Cairo","Rome"],"It was built in 537 and its dome is a masterpiece of Byzantine architecture.",2);
m(3,"Landmarks","The Forbidden City, a palace complex of emperors, is in which city?","Beijing",["Shanghai","Tokyo","Seoul"],"It has nearly 1,000 buildings and was home to 24 emperors.",1);
m(3,"Landmarks","Mount Rushmore, with four presidents carved into the rock, is in which country?","United States",["Canada","Mexico","Australia"],"The carved presidents are Washington, Jefferson, Roosevelt and Lincoln.",1);
m(3,"Landmarks","The Great Barrier Reef lies off the coast of which country?","Australia",["Philippines","Mexico","Brazil"],"It is the world’s largest coral reef system and visible from space.",1);
m(3,"Landmarks","Which pharaoh built the Great Pyramid of Giza?","Khufu",["Tutankhamun","Ramesses II","Akhenaten"],"It was the tallest man-made structure for over 3,800 years.",3);
m(3,"Landmarks","Which bridge in California is famous for its orange-red colour?","The Golden Gate Bridge",["The Brooklyn Bridge","The Bay Bridge","The Tower Bridge"],"It opened in 1937 and spans the entrance to San Francisco Bay.",1);
vf(3,"The Eiffel Tower was originally meant to stand for only 20 years.",true,"It was saved because it was useful as a radio antenna.",2);
vf(3,"Niagara Falls lies on the border between Canada and the United States.",true,"It is made up of three waterfalls.",1);
vf(3,"Stonehenge is located in Scotland.",false,"Stonehenge is in Wiltshire, in southern England.",1);

m(4,"Currencies","What is the currency of Mexico?","The peso",["The dollar","The real","The bolívar"],"Mexico has used the peso since the 19th century.",1);
m(4,"Currencies","What is the currency of Brazil?","The real",["The peso","The escudo","The bolívar"],"The Brazilian real replaced the cruzeiro in 1994.",2);
m(4,"Currencies","What is the currency of Thailand?","The baht",["The dong","The ringgit","The rupiah"],"The baht is divided into 100 satang.",2);
m(4,"Currencies","What is the currency of Sweden?","The krona",["The euro","The mark","The zloty"],"Sweden is in the EU but kept its own currency.",2);
m(4,"Currencies","What is the currency of India?","The rupee",["The rial","The taka","The dinar"],"Pakistan, Nepal and Sri Lanka also use rupees.",1);
m(4,"Currencies","What is the currency of South Africa?","The rand",["The pound","The birr","The shilling"],"The name comes from the Witwatersrand, the gold-rich ridge near Johannesburg.",2);
m(4,"Know-how","In which of these countries do cars drive on the left?","Australia",["Spain","Brazil","Canada"],"The UK, Japan, India and Australia drive on the left.",2);
m(4,"Know-how","Which city is located on two continents?","Istanbul",["Cairo","Moscow","Athens"],"The Bosphorus strait separates its European and Asian sides.",2);
m(4,"Know-how","Which sea is so salty that you float easily in it?","The Dead Sea",["The Red Sea","The Black Sea","The Caspian Sea"],"It lies between Jordan and Israel and is the lowest place on land.",2);
m(4,"Know-how","Which country has the most UNESCO World Heritage Sites?","Italy",["China","France","Germany"],"Italy has about 60, just ahead of China.",3);
m(4,"Know-how","What does GMT stand for?","Greenwich Mean Time",["Global Meridian Time","General Metric Time","Greater Moscow Time"],"It is based on the meridian that passes through Greenwich in London.",2);
m(4,"Know-how","What does the airport code BCN stand for?","Barcelona",["Bucharest","Brussels","Basel"],"Airport codes are three letters assigned by IATA.",1);
m(4,"Know-how","What is the capital of Thailand?","Bangkok",["Hanoi","Manila","Jakarta"],"Its full ceremonial name is one of the longest city names in the world.",1);
m(4,"Language","“Arigato” means thank you in which language?","Japanese",["Korean","Chinese","Thai"],"“Arigato gozaimasu” is the polite form.",2);
m(4,"Language","“Obrigado” means thank you in which language?","Portuguese",["Italian","Romanian","Catalan"],"A woman says “obrigada”.",2);
vf(4,"Switzerland uses the euro as its currency.",false,"Switzerland uses the Swiss franc.",1);
vf(4,"Tipping is customary in restaurants in Japan.",false,"In Japan, tipping can even seem rude as good service is expected.",2);
vf(4,"Monaco is an independent country.",true,"Monaco is the second-smallest country in the world after the Vatican City.",1);

ty(4,"What is the capital of Peru? (one word)",["Lima"],"Lima lies on the Pacific coast and is famous for its cuisine.",2);

return {id:"foodtravel",title:"Food & Travel Challenge",kw:"food travel dishes pizza sushi paella landmarks wonders countries cities currency tourism foodie quiz",subject:"Where foods come from, dishes of the world, landmarks and travel know-how",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
