// Built-in bank: Guess the Country in clues (English). Three clues per question, hardest first.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard. No flag emojis (they do not show on Windows).
window.BANK_COUNTRYCLUES=(function(){
const SESS={1:"Europe",2:"Asia & Oceania",3:"The Americas",4:"Africa & Middle East"};
const TAGS={1:"Europe",2:"Asia & Oceania",3:"Americas",4:"Africa & M. East"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const c=(s,ok,wr,a,b,cl,e,d)=>Q.push({s,t:"Guess the country",q:"Which country? 🔎 Clue 1: "+a+" · Clue 2: "+b+" · Clue 3: "+cl,o:[ok,...wr],a:0,e,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Europe =====================
c(1,"Italy",["Spain","Greece","Portugal"],"Two whole countries sit inside its borders","Birthplace of pizza and espresso culture","Shaped like a boot","Italy surrounds Vatican City and San Marino.",1);
c(1,"France",["Belgium","Italy","Spain"],"The most visited country in the world","It has more time zones than any other country, thanks to its overseas territories","Home of the Eiffel Tower and croissants","France is the world's top tourist destination.",1);
c(1,"Spain",["Portugal","Italy","Mexico"],"Hosts the world's biggest tomato fight, La Tomatina","Flamenco and paella come from here","Barça and Real Madrid play here","La Tomatina takes place in Buñol every August.",1);
c(1,"Germany",["Austria","Netherlands","Poland"],"Many of its motorways have no general speed limit","Celebrates Oktoberfest every year","Its capital is Berlin","The Autobahn is famous for its unrestricted stretches.",1);
c(1,"Greece",["Turkey","Italy","Croatia"],"Birthplace of the Olympic Games","Has thousands of islands, only about 200 inhabited","Home of the Parthenon and Santorini","The ancient Olympics began in Olympia.",1);
c(1,"Netherlands",["Belgium","Denmark","Germany"],"About a quarter of its land lies below sea level","There are more bikes than people","Famous for tulips and windmills","Dutch bikes outnumber the population.",1);
c(1,"Switzerland",["Austria","Sweden","Norway"],"Has four national languages","Neutral since 1815 and not a member of the EU","Famous for chocolate, watches and the Alps","German, French, Italian and Romansh are national languages.",1);
c(1,"Sweden",["Norway","Finland","Denmark"],"Gave the world flat-pack furniture","Hosts the Nobel Prize ceremony in December","Home of ABBA and Spotify","Most Nobel Prizes are awarded in Stockholm.",2);
c(1,"Portugal",["Spain","Ireland","Greece"],"Westernmost country of mainland Europe","Home of port wine and custard tarts","Its capital is Lisbon","Cabo da Roca is mainland Europe's westernmost point.",2);
c(1,"Ireland",["Iceland","Denmark","Norway"],"Its national symbol is a harp, the only instrument on a national emblem","St Patrick's Day is its national holiday","Known as the Emerald Isle","The harp appears on Irish coins and the presidential seal.",2);

// ===================== 2. Asia & Oceania =====================
c(2,"Japan",["South Korea","China","Thailand"],"Made of about 14,000 islands","Home of sushi and Mount Fuji","Known as the Land of the Rising Sun","Japan has over 14,000 islands.",1);
c(2,"China",["Japan","Vietnam","Mongolia"],"Invented paper, gunpowder and the compass","Uses a single official time zone across a huge territory","Home of the Great Wall and giant pandas","Beijing time applies across the whole country.",1);
c(2,"India",["Pakistan","Bangladesh","Sri Lanka"],"Chess is believed to have been invented here","Bollywood is based here","The Taj Mahal stands here","Chess comes from the ancient Indian game chaturanga.",1);
c(2,"South Korea",["Japan","China","Taiwan"],"Samsung and Hyundai were born here","Birthplace of K-pop and Gangnam Style","Its capital is Seoul","Seoul is the capital of South Korea.",1);
c(2,"Thailand",["Vietnam","Cambodia","Malaysia"],"The only Southeast Asian country never colonised by Europeans","Famous for Pad Thai and the Songkran water festival","Its capital is Bangkok","Thailand stayed independent throughout the colonial era.",2);
c(2,"Australia",["New Zealand","South Africa","Fiji"],"Both a country and a continent","Home of kangaroos and koalas","The Sydney Opera House is its icon","Australia is the only country that covers a whole continent.",1);
c(2,"New Zealand",["Australia","Ireland","Fiji"],"Has several times more sheep than people","Filming location of The Lord of the Rings","Home of the haka and the kiwi bird","Roughly five sheep for every person.",1);
c(2,"Singapore",["Malaysia","Hong Kong","Brunei"],"A city, an island and a country at once","Selling chewing gum is heavily restricted","Home of the Merlion statue and Marina Bay Sands","Singapore is a city-state at the tip of the Malay Peninsula.",2);
c(2,"Indonesia",["Philippines","Malaysia","Thailand"],"The world's largest archipelago country, with over 17,000 islands","Home of Bali and Komodo dragons","Has the largest Muslim population of any country","Indonesia spans more than 17,000 islands.",2);
c(2,"Nepal",["Bhutan","Mongolia","Sri Lanka"],"Its flag is the only national flag that is not rectangular","Eight of the world's ten highest peaks are here","Its capital is Kathmandu","Nepal's flag is two stacked pennants.",3);

// ===================== 3. The Americas =====================
c(3,"United States",["Canada","Mexico","Australia"],"Has no official language at the federal level","Home of Hollywood and Silicon Valley","Fifty stars on its flag","The US has no federal official language.",1);
c(3,"Canada",["United States","Sweden","Russia"],"Has the longest coastline in the world","Produces most of the world's maple syrup","A maple leaf is on its flag and its capital is Ottawa","Canada's coastline is over 200,000 km long.",1);
c(3,"Mexico",["Spain","Cuba","Argentina"],"Tacos and tequila come from here","Celebrates the Day of the Dead","Home of the Chichén Itzá pyramid","The Maya built Chichén Itzá in the Yucatán.",1);
c(3,"Brazil",["Portugal","Argentina","Chile"],"The only Portuguese-speaking country in the Americas","Most of the Amazon rainforest lies inside it","Five-time football World Cup winner, home of Rio Carnival","Brazil has won the World Cup five times.",1);
c(3,"Argentina",["Uruguay","Chile","Spain"],"Tango was born here","Won the 2022 football World Cup","Home country of Messi and Maradona","Argentina beat France on penalties in Qatar.",1);
c(3,"Peru",["Bolivia","Colombia","Ecuador"],"Home of Machu Picchu","Birthplace of the potato, with thousands of varieties","Llamas and alpacas roam the Inca heartland","Machu Picchu was built by the Incas.",2);
c(3,"Cuba",["Jamaica","Dominican Republic","Haiti"],"Classic 1950s American cars are still on the road","Famous for cigars and salsa","The largest island in the Caribbean","Cuba is the biggest Caribbean island.",2);
c(3,"Colombia",["Venezuela","Peru","Ecuador"],"The world's top source of emeralds","Home of Shakira and cumbia","Country of Medellín and coffee","Colombia is a leading producer of emeralds and coffee.",2);
c(3,"Chile",["Argentina","Peru","Uruguay"],"The longest, thinnest country in the world","Home of the Atacama, the driest desert","Easter Island belongs to it","Chile stretches over 4,000 km but is only about 175 km wide on average.",2);
c(3,"Jamaica",["Cuba","Barbados","Haiti"],"Home of reggae and Bob Marley","Usain Bolt's home country","Famous for jerk chicken","Reggae was born in Kingston.",2);

// ===================== 4. Africa & Middle East =====================
c(4,"Egypt",["Sudan","Libya","Jordan"],"The Nile flows through it","Home of the pyramids of Giza","Land of the pharaohs and Tutankhamun","Egypt's civilisation grew along the Nile.",1);
c(4,"South Africa",["Kenya","Nigeria","Namibia"],"Has three capital cities","Nelson Mandela was its first Black president","Home of Table Mountain and Kruger safaris","Pretoria, Cape Town and Bloemfontein share government duties.",1);
c(4,"Morocco",["Tunisia","Algeria","Egypt"],"Home of Marrakech and the edge of the Sahara","Tagine and mint tea are national classics","Reached the 2022 World Cup semi-final","Morocco was the first African team in a World Cup semi-final.",2);
c(4,"Kenya",["Tanzania","Uganda","Ethiopia"],"The Masai Mara hosts a great wildebeest migration","Home country of marathon legend Eliud Kipchoge","Its capital is Nairobi","Kenya produces many of the world's best distance runners.",2);
c(4,"Nigeria",["Egypt","Ethiopia","Ghana"],"The most populous country in Africa","Nollywood is one of the world's biggest film industries","Its capital is Abuja, its largest city Lagos","Nigeria has over 200 million people.",2);
c(4,"Turkey",["Greece","Egypt","Iran"],"Straddles two continents","Hagia Sophia and the Cappadocia hot-air balloons","Istanbul is its largest city","Turkey spans Europe and Asia.",1);
c(4,"United Arab Emirates",["Qatar","Saudi Arabia","Oman"],"Home of the world's tallest building, the Burj Khalifa","Made up of seven emirates","Dubai and Abu Dhabi are its best-known cities","The Burj Khalifa is over 800 m tall.",1);
c(4,"Ethiopia",["Kenya","Somalia","Sudan"],"Uses its own calendar, about seven years behind the rest of the world","Coffee was discovered here","Famous for the rock-hewn churches of Lalibela","Ethiopia is the birthplace of coffee.",3);
c(4,"Madagascar",["Mauritius","Sri Lanka","Indonesia"],"Lemurs live wild nowhere else","The fourth-largest island in the world","The world's top vanilla producer","Most Madagascan wildlife is found nowhere else.",2);
c(4,"Tanzania",["Kenya","Uganda","Zambia"],"Home of Mount Kilimanjaro","Serengeti and Zanzibar are here","Its official capital is Dodoma, not Dar es Salaam","Kilimanjaro is Africa's highest peak.",3);

// ===================== Typed answers =====================
ty(1,"Which European country is shaped like a boot and contains the Colosseum? (one word)",["Italy"],"Italy and Rome's Colosseum.",1);
ty(2,"Which country has the Great Wall and the giant panda? (one word)",["China"],"The Great Wall is in China.",1);
ty(3,"Which South American country is the home of tango, Messi and Maradona? (one word)",["Argentina"],"Argentina.",1);
ty(4,"Which African country has the pyramids of Giza? (one word)",["Egypt"],"The pyramids of Giza are near Cairo.",1);
ty(1,"Which Scandinavian country is home of ABBA, IKEA and Spotify? (one word)",["Sweden"],"Sweden.",2);
ty(2,"Which island country is famous for kangaroos and the Sydney Opera House? (one word)",["Australia"],"Australia.",1);
ty(3,"Which North American country has a maple leaf on its flag? (one word)",["Canada"],"Canada.",1);
ty(4,"Which African country is home of Mount Kilimanjaro and Zanzibar? (one word)",["Tanzania"],"Tanzania.",3);

return {id:"countryclues",title:"Guess the Country in 3 Clues",kw:"guess the country clues geography world travel which country quiz tiktok countries capitals",subject:"Three clues, one country: how fast can you guess it?",lang:"en",sess:SESS,tags:TAGS,unit:["region","regions","a region"],balance:true,Q,TQ};
})();
