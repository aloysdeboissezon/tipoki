// Built-in bank: World tour, flags, capitals and "which country is it?" (English). Made to be shared and argued over.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for geography nerds).
window.BANK_WORLDTOUR=(function(){
const SESS={1:"Capitals that trick everyone",2:"Flag facts",3:"World records",4:"Which country is it?"};
const TAGS={1:"Capitals",2:"Flags",3:"Records",4:"Which country?"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Capitals that trick everyone =====================
m(1,"Capital","What is the capital of Australia?","Canberra",["Sydney","Melbourne","Perth"],"Sydney is bigger, but Canberra was purpose-built as the capital in the early 1900s as a compromise between Sydney and Melbourne.",1);
m(1,"Capital","What is the capital of Canada?","Ottawa",["Toronto","Vancouver","Montreal"],"Ottawa, in Ontario, has been the capital since 1866.",1);
m(1,"Capital","What is the capital of Brazil?","Brasília",["Rio de Janeiro","São Paulo","Salvador"],"Brasília was built in the late 1950s and became the capital in 1960. Rio was the capital before.",1);
m(1,"Capital","What is the capital of Turkey?","Ankara",["Istanbul","Izmir","Antalya"],"Istanbul is the biggest city, but Atatürk made Ankara the capital in 1923.",1);
m(1,"Capital","What is the capital of Switzerland?","Bern",["Zurich","Geneva","Basel"],"Bern is the Swiss federal city. Zurich is the biggest city and Geneva hosts many international organisations.",2);
m(1,"Capital","What is the capital of New Zealand?","Wellington",["Auckland","Christchurch","Queenstown"],"Auckland is much bigger, but Wellington has been the capital since 1865.",2);
m(1,"Capital","What is the capital of Morocco?","Rabat",["Casablanca","Marrakech","Fez"],"Casablanca is the economic capital and Marrakech the tourist star, but Rabat is the capital.",2);
m(1,"Capital","What is the capital of Nigeria?","Abuja",["Lagos","Kano","Ibadan"],"Lagos is the biggest city, but the capital moved to the central city of Abuja in 1991.",2);
m(1,"Capital","What is the capital of Vietnam?","Hanoi",["Ho Chi Minh City","Da Nang","Hue"],"Ho Chi Minh City (formerly Saigon) is bigger, but Hanoi is the capital.",1);
m(1,"Capital","What is the capital of Kazakhstan?","Astana",["Almaty","Tashkent","Bishkek"],"Almaty was the capital until 1997, then it moved to Astana.",3);
m(1,"Capital","What is the capital of Myanmar?","Naypyidaw",["Yangon","Mandalay","Bangkok"],"The government moved from Yangon to the new city of Naypyidaw in 2005-2006.",3);
vf(1,"Amsterdam is the capital of the Netherlands.",true,"Amsterdam is the constitutional capital, even though the government sits in The Hague.",2);
vf(1,"Zurich is the capital of Switzerland.",false,"The Swiss capital is Bern. Zurich is the largest city.",1);

// ===================== 2. Flag facts =====================
m(2,"Shape","Which country has the only national flag that is not a rectangle or a square?","Nepal",["Bhutan","Switzerland","Sri Lanka"],"Nepal’s flag is made of two stacked triangles (pennants), unique among national flags.",2);
m(2,"Shape","Which two countries have square flags?","Switzerland and Vatican City",["Switzerland and Denmark","Monaco and Malta","Vatican City and Monaco"],"Only Switzerland and Vatican City have a flag with equal sides.",2);
m(2,"Colours","Which country is the only one whose flag has none of the colours red, white or blue?","Jamaica",["Brazil","Saudi Arabia","Mauritania"],"Jamaica’s flag is black, green and gold.",3);
m(2,"Symbols","Which country’s flag shows an AK-47 assault rifle?","Mozambique",["Angola","Uganda","Zimbabwe"],"Mozambique’s flag features an AK-47, a hoe and a book on a star.",3);
m(2,"Symbols","Which two national flags feature a dragon?","Bhutan and Wales",["China and Japan","Vietnam and Wales","Bhutan and Mongolia"],"Bhutan’s flag has a white dragon. The Welsh flag has a red dragon (Wales is a nation of the UK, not an independent country).",3);
m(2,"Symbols","Which country’s flag shows an eagle eating a snake on a cactus?","Mexico",["Peru","Chile","Colombia"],"The Mexican coat of arms recalls the Aztec founding legend of Tenochtitlan.",1);
m(2,"Symbols","What is shown on the flag of Canada?","A red maple leaf",["A beaver","A red moose","A white maple tree"],"The maple leaf flag was adopted on 15 February 1965.",1);
m(2,"Symbols","The flag of which country shows a map of its own island?","Cyprus",["Malta","Iceland","Fiji"],"Cyprus has a copper-coloured silhouette of the island on its white flag.",3);
m(2,"Colours","Which colours are on the flag of Italy, from left to right?","Green, white, red",["Red, white, green","Green, red, white","Red, green, white"],"The Italian tricolore is green, white and red, vertical stripes.",1);
m(2,"Look-alikes","Which pair of flags are almost identical, red on top and white below?","Indonesia and Monaco",["Poland and Japan","Peru and Canada","Austria and Latvia"],"Indonesia and Monaco have nearly the same red and white bands (Poland’s are the reverse: white on top).",2);
m(2,"Look-alikes","Which country’s flag is the same as Romania’s apart from a slightly different blue?","Chad",["Bulgaria","Ukraine","Belgium"],"Chad’s blue, yellow and red stripes are almost identical to Romania’s (Andorra and Moldova have the same colours but add a coat of arms).",3);
vf(2,"The flag of the United States has 13 stripes.",true,"The stripes stand for the 13 original colonies; the 50 stars stand for today’s states.",1);
vf(2,"The flag of Japan has a red circle on a white background.",true,"It is called the Hinomaru, “the circle of the sun”.",1);

// ===================== 3. World records =====================
m(3,"Size","Which is the largest country in the world by area?","Russia",["Canada","China","United States"],"Russia covers about 17 million km², nearly twice the size of Canada.",1);
m(3,"Size","Which is the smallest country in the world?","Vatican City",["Monaco","San Marino","Liechtenstein"],"Vatican City covers about 0.44 km² inside Rome.",1);
m(3,"People","Which country has the largest population in the world?","India",["China","United States","Indonesia"],"India overtook China in 2023.",1);
m(3,"Nature","Which is the highest mountain above sea level?","Mount Everest",["K2","Mont Blanc","Kilimanjaro"],"Everest is about 8,849 m tall, on the border of Nepal and China.",1);
m(3,"Nature","Which is the largest ocean?","The Pacific Ocean",["The Atlantic Ocean","The Indian Ocean","The Arctic Ocean"],"The Pacific covers about a third of the Earth’s surface.",1);
m(3,"Nature","Which is the largest hot desert in the world?","The Sahara",["The Gobi","The Arabian Desert","The Kalahari"],"The Sahara in Africa is about as big as the United States.",1);
m(3,"Nature","Which country has the most islands in the world?","Sweden",["Indonesia","Japan","Philippines"],"Sweden has about 267,000 islands, most of them tiny.",3);
m(3,"Nature","Which country has the tallest waterfall, Angel Falls?","Venezuela",["Brazil","Iceland","New Zealand"],"Angel Falls drops almost 1 km in Venezuela’s Canaima National Park.",3);
m(3,"Culture","Which country has more pyramids than Egypt?","Sudan",["Mexico","Peru","Iraq"],"Sudan has over 200 small Nubian pyramids, more than Egypt.",3);
m(3,"Time","Which country has the most time zones, counting overseas territories?","France",["Russia","United States","China"],"Thanks to its overseas territories, France spans 12 or more time zones.",3);
m(3,"Size","Which country has the longest coastline in the world?","Canada",["Russia","Australia","Indonesia"],"Canada’s coastline is over 200,000 km long.",2);
vf(3,"Australia is both a country and a continent.",true,"Australia is the only country that occupies a whole continent by itself.",2);
vf(3,"Mount Everest is on the border between India and China.",false,"Everest lies on the border between Nepal and China (Tibet).",2);

// ===================== 4. Which country is it? =====================
m(4,"Landmark","In which country is Machu Picchu?","Peru",["Mexico","Bolivia","Chile"],"The Inca citadel sits high in the Andes in Peru.",1);
m(4,"Landmark","In which country is the Taj Mahal?","India",["Pakistan","Bangladesh","Iran"],"The Taj Mahal is in Agra, built by Shah Jahan for his wife Mumtaz Mahal.",1);
m(4,"Landmark","In which country is Angkor Wat?","Cambodia",["Thailand","Laos","Myanmar"],"Angkor Wat is the largest religious monument in the world.",2);
m(4,"Landmark","In which country is the rock-cut city of Petra?","Jordan",["Egypt","Israel","Saudi Arabia"],"Petra, the “rose-red city”, was the capital of the Nabataeans.",2);
m(4,"Landmark","In which country is Santorini, with its white houses and blue domes?","Greece",["Italy","Croatia","Turkey"],"Santorini is a Greek island in the Cyclades.",1);
m(4,"Landmark","In which country is Chichén Itzá, home of the pyramid El Castillo?","Mexico",["Guatemala","Peru","Honduras"],"Chichén Itzá is a Maya city in Yucatán, Mexico.",2);
m(4,"Landmark","In which country is the Blue Lagoon, a famous geothermal spa?","Iceland",["Norway","Ireland","Finland"],"The Blue Lagoon is on the Reykjanes Peninsula near Reykjavik.",2);
m(4,"Landmark","In which country is the Burj Khalifa, the tallest building in the world?","United Arab Emirates",["Qatar","Saudi Arabia","Kuwait"],"The 828 m Burj Khalifa is in Dubai.",1);
m(4,"Landmark","In which country is Table Mountain overlooking Cape Town?","South Africa",["Namibia","Kenya","Australia"],"Table Mountain is a flat-topped icon of Cape Town.",2);
m(4,"Landmark","In which country is the Sagrada Família basilica?","Spain",["Portugal","Italy","Argentina"],"Gaudí’s basilica in Barcelona has been under construction since 1882.",1);
m(4,"Landmark","In which country is Neuschwanstein, the castle that inspired Disney’s?","Germany",["Austria","Switzerland","France"],"The fairy-tale castle in Bavaria was built for King Ludwig II.",2);
vf(4,"The Great Wall of China can be seen with the naked eye from the Moon.",false,"It is far too narrow to be seen from the Moon and is very hard to spot even from low Earth orbit.",2);
vf(4,"The Eiffel Tower is in Paris, France.",true,"It was built for the 1889 World’s Fair.",1);

// ===================== Typed answers =====================
ty(1,"What is the capital of Japan? (one word)",["Tokyo"],"Tokyo is both Japan’s capital and its largest city.",1);
ty(1,"What is the capital of Egypt? (one word)",["Cairo"],"Cairo sits on the Nile.",1);
ty(2,"Which country’s flag is a red circle on a white background? (one word)",["Japan"],"The Japanese flag is called Hinomaru.",1);
ty(3,"Which is the longest river in Africa? (one word)",["Nile","The Nile"],"The Nile runs about 6,650 km.",2);
ty(4,"In which city is the Colosseum? (one word)",["Rome"],"The Colosseum was finished in 80 AD.",1);
ty(4,"In which country is Mount Fuji? (one word)",["Japan"],"Mount Fuji is Japan’s highest peak at 3,776 m.",1);
ty(3,"What is the largest country in South America by area? (one word)",["Brazil","Brasil"],"Brazil covers almost half the continent.",1);

return {id:"worldtour",title:"World Tour: Flags, Capitals & Records",kw:"world tour flags capitals countries geography records landmarks which country quiz travel",subject:"Flags, capitals that trick everyone, world records and landmarks: how well do you know the planet?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
