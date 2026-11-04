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

// ===================== More questions (batch 2) =====================
m(1,"Capitals","What is the capital of Pakistan?","Islamabad",["Karachi","Lahore","Rawalpindi"],"Islamabad was built in the 1960s to replace Karachi as the capital.",2);
m(1,"Capitals","What is the capital of Tanzania?","Dodoma",["Dar es Salaam","Arusha","Zanzibar"],"Dar es Salaam is the largest city, but Dodoma is the official capital.",3);
m(1,"Capitals","What is the capital of Ivory Coast (Côte d’Ivoire)?","Yamoussoukro",["Abidjan","Bouaké","San-Pédro"],"Abidjan is the economic centre, but Yamoussoukro is the political capital.",3);
m(1,"Capitals","What is the capital of Belize?","Belmopan",["Belize City","San Ignacio","Orange Walk"],"Belmopan was built after Hurricane Hattie hit Belize City in 1961.",3);
m(1,"Capitals","What is the capital of Malaysia?","Kuala Lumpur",["Putrajaya","Penang","Johor Bahru"],"Putrajaya is the administrative centre of the government.",2);
m(1,"Capitals","What is the capital of Mongolia?","Ulaanbaatar",["Astana","Bishkek","Tashkent"],"It is one of the coldest capital cities in the world.",3);
m(1,"Capitals","What is the capital of Ethiopia?","Addis Ababa",["Nairobi","Khartoum","Asmara"],"Addis Ababa is the headquarters of the African Union.",2);
m(1,"Capitals","What is the capital of Bhutan?","Thimphu",["Kathmandu","Dhaka","Colombo"],"Bhutan measures “Gross National Happiness” instead of only GDP.",3);
m(1,"Capitals","What is the capital of Cambodia?","Phnom Penh",["Vientiane","Hanoi","Bangkok"],"The city sits where the Mekong and Tonlé Sap rivers meet.",2);
m(1,"Capitals","What is the capital of Scotland?","Edinburgh",["Glasgow","Aberdeen","Dundee"],"Glasgow is bigger, but Edinburgh is the capital.",1);
vf(1,"New Delhi is the capital of India.",true,"New Delhi is part of the larger Delhi metropolitan area.",1);
vf(1,"Washington, D.C. is located inside one of the US states.",false,"Washington, D.C. is a federal district and doesn’t belong to any state.",2);
vf(1,"Rio de Janeiro was Brazil’s capital until 1960.",true,"Brasília became the capital in 1960.",3);

m(2,"Flags","Which country’s flag is the oldest continuously used national flag in the world?","Denmark",["Sweden","England","The Netherlands"],"The Dannebrog, a white cross on red, has been used since at least the 14th century.",2);
m(2,"Flags","Which country’s flag features a green cedar tree?","Lebanon",["Cyprus","Syria","Jordan"],"The cedar is a national symbol of Lebanon.",3);
m(2,"Flags","How many stars are on the flag of the United States?","50",["48","52","13"],"One for each state, while the 13 stripes represent the original colonies.",1);
m(2,"Flags","Which country’s flag is blue with a yellow Nordic cross?","Sweden",["Finland","Norway","Denmark"],"Finland’s flag has a blue cross on white.",2);
m(2,"Flags","Which country’s flag is red with a single large yellow star in the centre?","Vietnam",["China","Morocco","Turkey"],"China’s flag has five yellow stars, and Morocco’s a green star.",2);
m(2,"Flags","Which country’s flag is a red circle on a dark green rectangle?","Bangladesh",["Japan","Pakistan","Portugal"],"The red circle stands for the rising sun and the blood shed for independence.",2);
m(2,"Flags","Which country’s flag shows the Union Jack and a large seven-pointed star?","Australia",["New Zealand","Fiji","Tuvalu"],"The star is the Commonwealth Star, next to the Southern Cross constellation.",2);
m(2,"Flags","Which colours are on the German flag, from top to bottom?","Black, red, gold",["Red, black, gold","Black, white, red","Gold, red, black"],"The colours date back to the 19th century.",1);
m(2,"Flags","The Catalan flag, the Senyera, has what design?","Four red stripes on a yellow background",["A red cross on white","Blue stars on yellow","Red and yellow checks"],"According to legend, the stripes were drawn in blood on a golden shield.",2);
vf(2,"The flags of Italy and Ireland have exactly the same colours.",false,"Italy’s is green, white and red, while Ireland’s is green, white and orange.",2);
vf(2,"Poland’s flag has two horizontal stripes: white on top and red below.",true,"Monaco and Indonesia have similar flags, but red is on top.",2);
vf(2,"The Brazilian flag shows a blue circle with stars on a green and yellow background.",true,"The stars represent the night sky above Rio de Janeiro on the day the republic was declared.",2);
vf(2,"The Canadian maple leaf has 11 points.",true,"The 11-point design was chosen in 1965 for the flag.",3);

m(3,"Records","Which river carries the most water in the world?","The Amazon",["The Nile","The Mississippi","The Yangtze"],"The Amazon carries about 20% of all river water that flows into the oceans.",2);
m(3,"Records","Where is the deepest point in the world’s oceans?","The Mariana Trench",["The Puerto Rico Trench","The Java Trench","The Tonga Trench"],"The Challenger Deep reaches almost 11,000 metres below sea level.",2);
m(3,"Records","Which is the largest lake in the world by surface area?","The Caspian Sea",["Lake Superior","Lake Victoria","Lake Baikal"],"The Caspian Sea is technically a lake and is bordered by five countries.",3);
m(3,"Records","Which is the deepest lake in the world?","Lake Baikal",["Lake Tanganyika","The Caspian Sea","Lake Superior"],"Lake Baikal in Russia is over 1,600 metres deep and holds about 20% of the world’s fresh water.",3);
m(3,"Records","The highest air temperature ever reliably recorded, 56.7°C, was measured in…","Death Valley, USA",["The Sahara Desert","Dubai","Kuwait City"],"It was recorded in California on 10 July 1913.",3);
m(3,"Records","Where was the lowest temperature ever recorded, about −89°C?","Antarctica",["Siberia","Greenland","The North Pole"],"The record was set at Vostok Station in 1983.",2);
m(3,"Records","Which desert is often called the driest non-polar place on Earth?","The Atacama Desert",["The Sahara","The Gobi","The Kalahari"],"Some parts of the Atacama in Chile have gone years without rain.",2);
m(3,"Records","Which continent has the most countries?","Africa",["Asia","Europe","South America"],"Africa has 54 recognised countries.",2);
m(3,"Records","Which is the longest mountain range on Earth?","The Andes",["The Rockies","The Himalayas","The Alps"],"The Andes stretch about 7,000 km along the west of South America.",3);
m(3,"Records","Which country has the most active volcanoes?","Indonesia",["Japan","Iceland","Italy"],"Indonesia sits on the Pacific Ring of Fire and has over 120 active volcanoes.",3);
m(3,"Records","Which is the largest rainforest in the world?","The Amazon",["The Congo","The Daintree","The Tongass"],"The Amazon covers around 5.5 million square kilometres.",1);
vf(3,"Antarctica is classified as a desert.",true,"It gets very little precipitation, so it is the world’s largest cold desert.",2);
vf(3,"Mount Everest is the tallest mountain on Earth when measured from base to peak.",false,"Mauna Kea in Hawaii is taller from its base on the ocean floor.",3);
vf(3,"The shore of the Dead Sea is the lowest point on land.",true,"It lies about 430 metres below sea level.",2);
vf(3,"Russia spans 11 time zones.",true,"Russia is the largest country in the world by area.",3);

m(4,"Which country?","In which country is Mount Kilimanjaro, Africa’s highest peak?","Tanzania",["Kenya","Uganda","Ethiopia"],"The snow-capped peak rises 5,895 metres above sea level.",2);
m(4,"Which country?","The Galápagos Islands, which inspired Darwin, belong to which country?","Ecuador",["Peru","Colombia","Chile"],"They are about 1,000 km off the coast of Ecuador.",2);
m(4,"Which country?","Easter Island, famous for its giant stone statues, belongs to which country?","Chile",["Peru","New Zealand","Mexico"],"The statues are called moai.",2);
m(4,"Which country?","In which country is the Great Wall located?","China",["Japan","Mongolia","Vietnam"],"The walls were built over many centuries and stretch for thousands of kilometres.",1);
m(4,"Which country?","In which country are the Cliffs of Moher?","Ireland",["Scotland","Wales","Iceland"],"The cliffs rise 214 metres above the Atlantic Ocean.",2);
m(4,"Which country?","In which country is Cappadocia, famous for hot-air balloons and fairy chimneys?","Turkey",["Greece","Iran","Egypt"],"Hundreds of balloons fly over the region every morning.",2);
m(4,"Which country?","In which country is the historic region of Transylvania?","Romania",["Hungary","Bulgaria","Poland"],"Transylvania is linked to the legend of Dracula.",2);
m(4,"Which country?","In which country is Ha Long Bay, with its thousands of limestone islands?","Vietnam",["Thailand","Philippines","Cambodia"],"The name means “descending dragon bay”.",2);
m(4,"Which country?","In which country is the historic city of Timbuktu?","Mali",["Niger","Morocco","Senegal"],"Timbuktu was a great centre of learning in the Middle Ages.",3);
m(4,"Which country?","In which country is the Geirangerfjord, a UNESCO-listed fjord with waterfalls?","Norway",["Sweden","Finland","Iceland"],"The Geirangerfjord is a UNESCO World Heritage Site.",2);
m(4,"Which country?","In which country is the island of Bali?","Indonesia",["Thailand","Philippines","Malaysia"],"Bali is known for its temples, rice terraces and beaches.",1);
m(4,"Which country?","In which country is the city of Marrakech?","Morocco",["Tunisia","Algeria","Egypt"],"Its old town, the medina, is a UNESCO World Heritage Site.",1);

ty(1,"What is the capital of Iceland? (one word)",["Reykjavik","Reykjavík"],"Reykjavík is the world’s northernmost capital of a sovereign state.",1);
ty(3,"What is the largest island in the world? (one word)",["Greenland"],"Greenland is an autonomous territory of Denmark.",2);

return {id:"worldtour",title:"World Tour: Flags, Capitals & Records",kw:"world tour flags capitals countries geography records landmarks which country quiz travel",subject:"Flags, capitals that trick everyone, world records and landmarks: how well do you know the planet?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
