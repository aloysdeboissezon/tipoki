// Built-in bank: Barcelona & Spain survival guide (English). Landmarks, food, Catalan culture, football and everyday life for students who live or study in Barcelona.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard.
window.BANK_BARCELONA=(function(){
const SESS={1:"Barcelona landmarks",2:"Spanish & Catalan food",3:"Catalan culture & words",4:"Football & sport",5:"Spain: everyday life & facts"};
const TAGS={1:"Landmarks",2:"Food",3:"Culture",4:"Sport",5:"Spain"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Barcelona landmarks =====================
m(1,"Landmark","Which architect designed the Sagrada Família?","Antoni Gaudí",["Santiago Calatrava","Lluís Domènech i Montaner","Josep Puig i Cadafalch"],"Gaudí took over the project in 1883 and worked on it until his death in 1926.",1);
m(1,"Landmark","Which famous pedestrian street links Plaça de Catalunya with the old port?","La Rambla",["Passeig de Gràcia","Diagonal","Gran Via"],"La Rambla is about 1.2 km long and famous for its street artists and the Boqueria market.",1);
m(1,"Landmark","What is the name of the hill in Barcelona that hosted the 1992 Olympic Games stadium?","Montjuïc",["Tibidabo","Collserola","Carmel"],"The 1992 Olympics were held in Barcelona; the main stadium sits on Montjuïc.",1);
m(1,"Landmark","In which year did Barcelona host the Summer Olympic Games?","1992",["1988","1996","1984"],"The 1992 Games changed the city, opening it to the sea with new beaches and ring roads.",1);
m(1,"Landmark","What is Park Güell famous for?","Colourful mosaics and a lizard fountain by Gaudí",["A medieval castle","A zoo with pandas","A huge football stadium"],"Park Güell was built between 1900 and 1914 and is a UNESCO World Heritage Site.",1);
m(1,"Landmark","Which Barcelona building is nicknamed “La Pedrera” (the stone quarry)?","Casa Milà",["Casa Batlló","Palau Güell","Hospital de Sant Pau"],"Gaudí’s Casa Milà has a wavy stone facade and a famous rooftop with chimneys.",2);
m(1,"Landmark","Where is the old, medieval centre of Barcelona with narrow streets and the cathedral?","Barri Gòtic (Gothic Quarter)",["Eixample","Poblenou","Sants"],"The Gothic Quarter is the heart of the old city, on top of Roman Barcino.",1);
m(1,"Landmark","What is the grid-patterned district of Barcelona created in the 19th century called?","Eixample",["Gràcia","Raval","Born"],"The Eixample (“extension”) was planned by Ildefons Cerdà with octagonal blocks.",2);
m(1,"Landmark","The skyscraper that looks like a glass bullet (Torre Glòries, formerly Agbar) was designed by…","Jean Nouvel",["Norman Foster","Renzo Piano","Frank Gehry"],"Opened in 2005, the tower is covered in thousands of LED-lit panels.",3);
m(1,"Landmark","What annual tech event takes place in Barcelona?","Mobile World Congress",["CES","Web Summit","Slush"],"The MWC is the world’s largest mobile industry event and takes place every year in Barcelona.",1);
m(1,"Landmark","Which beach district is Barcelona’s most famous seaside neighbourhood?","Barceloneta",["Sants","Horta","Sarrià"],"Barceloneta is a former fishing district known for seafood and its beach.",1);
vf(1,"The Sagrada Família is still under construction today.",true,"Construction started in 1882, and the main towers are being finished around the centenary of Gaudí’s death (2026).",1);
ty(1,"Which Catalan architect designed Casa Batlló and the Sagrada Família? (surname)",["gaudi","gaudí","antoni gaudi","antoni gaudí"],"Antoni Gaudí.",1);
ty(1,"Which Spanish city is the capital of Catalonia? (one word)",["barcelona"],"Barcelona is the capital and largest city of Catalonia.",1);

// ===================== 2. Spanish & Catalan food =====================
m(2,"Dish","What is “pa amb tomàquet”?","Bread rubbed with tomato, oil and salt",["A tomato soup","A pizza with tomatoes","A cheese sandwich"],"A Catalan staple, often served with ham, cheese or as part of tapas.",1);
m(2,"Dish","Which Spanish dish is a rice dish from Valencia, usually cooked with saffron?","Paella",["Fideuà","Gazpacho","Cocido"],"Authentic Valencian paella contains rabbit, chicken and green beans; seafood paella is also very popular.",1);
m(2,"Dish","What is “tortilla española”?","A potato omelette",["A flat corn bread","A fried banana","A meat stew"],"In Spain, tortilla means omelette; a Spanish tortilla is made with eggs and potatoes (often onion).",1);
m(2,"Dish","What is “gazpacho”?","A cold tomato-based soup",["A hot meat stew","A dessert","A salad with seafood"],"Originally from Andalusia, it is perfect for hot summer days.",1);
m(2,"Drink","Cava, a Spanish sparkling wine, mostly comes from which region?","Penedès (Catalonia)",["Rioja","Galicia","Andalusia"],"Most cava is produced in the Penedès, near Barcelona, e.g. in Sant Sadurní d’Anoia.",2);
m(2,"Dish","What are “calçots”?","Long, sweet spring onions grilled on fire",["A type of cheese","A traditional sausage","A kind of olive"],"A “calçotada” is a Catalan feast in winter and spring where calçots are grilled and dipped in romesco sauce.",2);
m(2,"Dessert","What is “crema catalana”?","A custard dessert with a caramelised sugar crust",["A chocolate cake","A fruit salad","A cold coffee"],"Similar to crème brûlée and often flavoured with lemon and cinnamon.",1);
m(2,"Dish","What are “patatas bravas”?","Fried potatoes with a spicy sauce",["Mashed potatoes","Potato crisps","A potato soup"],"A classic tapa found in almost every bar in Spain.",1);
m(2,"Drink","What is “horchata” in Valencia?","A sweet, cold drink made from tiger nuts",["A hot chocolate","A red wine cocktail","A beer"],"Horchata de chufa is typically served cold with fartons (sweet bread sticks).",2);
m(2,"Dish","What is “jamón ibérico”?","Cured ham from Iberian pigs",["A type of cheese","Smoked fish","A sausage from Galicia"],"The most expensive version comes from pigs fed on acorns (“bellota”).",1);
m(2,"Dish","What is “fideuà”?","A paella-like dish made with noodles instead of rice",["A bean stew","A custard","A fruit drink"],"Fideuà comes from the Valencian coast and is also very popular in Catalonia.",3);
vf(2,"In Spain, a typical dinner is eaten much later than in the UK or the US, often around 9 pm or later.",true,"Lunch is often at 2 pm and dinner at 9–10 pm.",1);
ty(2,"What is the Spanish word for the afternoon rest (a short nap)? (one word)",["siesta"],"The siesta is less common nowadays but is part of the culture.",1);
ty(2,"What is the Spanish word for small dishes shared in bars? (one word)",["tapas","tapa"],"Tapas, or in the Basque Country “pintxos”.",1);

// ===================== 3. Catalan culture & words =====================
m(3,"Language","What does “Bon dia” mean in Catalan?","Good morning",["Good night","Thank you","Goodbye"],"Bon dia = good morning (or hello during the first half of the day).",1);
m(3,"Language","What does “Gràcies” mean in Catalan?","Thank you",["Please","Sorry","Welcome"],"Gràcies = thank you; “moltes gràcies” = thanks a lot.",1);
m(3,"Culture","What happens in Catalonia on 23 April, Sant Jordi’s Day?","People give books and roses",["People throw tomatoes","People run with bulls","People light huge bonfires"],"On Sant Jordi, traditionally men gave roses and women a book; now everyone exchanges both.",1);
m(3,"Culture","What are the “castellers”?","Teams that build human towers",["Castle guards","Flamenco dancers","Wine merchants"],"The human towers (castells) are recognised by UNESCO as intangible cultural heritage.",2);
m(3,"Culture","What is the “sardana”?","A traditional Catalan circle dance",["A kind of sausage","A flamenco guitar","A card game"],"People hold hands in a circle and dance together; it is a symbol of Catalan culture.",2);
m(3,"Culture","What is the “senyera”, the flag of Catalonia?","Four red stripes on a yellow background",["A blue flag with a star","A yellow flag with a lion","A red flag with a castle"],"The Catalan flag has four red bars (pals) on gold.",1);
m(3,"Culture","When is the Festa Major de Gràcia, with its decorated streets?","In August",["In January","In April","In November"],"Neighbours in Gràcia compete to decorate their street in mid-August.",2);
m(3,"Culture","Which night is celebrated on 23 June with fireworks and bonfires across Catalonia?","Sant Joan (Revetlla)",["Sant Jordi","La Mercè","Christmas Eve"],"The Revetlla de Sant Joan marks the start of summer, with fireworks and coca de Sant Joan.",2);
m(3,"Culture","What is La Mercè?","Barcelona’s main city festival in late September",["A football trophy","A traditional soup","A bank holiday in Madrid"],"La Mercè features parades, castellers, concerts and fireworks.",2);
m(3,"Language","Which of these is an official language in Catalonia, together with Spanish?","Catalan",["Basque","Galician","Portuguese"],"Catalan and Spanish are the co-official languages (plus Aranese in the Val d’Aran).",1);
m(3,"Art","Which painter, famous for melting clocks, was born in Figueres, Catalonia?","Salvador Dalí",["Pablo Picasso","Joan Miró","Antoni Tàpies"],"Dalí was born in 1904 in Figueres, where his theatre-museum stands.",2);
vf(3,"Montserrat, the serrated mountain near Barcelona, hosts a famous Benedictine monastery.",true,"Montserrat’s monastery is home to the Black Madonna and a famous boys’ choir.",2);
ty(3,"What does “Adéu” mean in Catalan? (one English word)",["goodbye","bye"],"Adéu = goodbye.",1);
ty(3,"Which famous mountain near Barcelona has a monastery and a serrated profile? (one word)",["montserrat"],"Montserrat.",2);

// ===================== 4. Football & sport =====================
m(4,"Football","In which year was FC Barcelona founded?","1899",["1920","1875","1950"],"FC Barcelona was founded on 29 November 1899 by Joan Gamper and others.",2);
m(4,"Football","What is FC Barcelona’s motto?","Més que un club",["Hala Madrid","Never walk alone","Forza Barça"],"“More than a club” expresses Barça’s social and Catalan identity.",1);
m(4,"Football","What is the name of the match between FC Barcelona and Real Madrid?","El Clásico",["El Derbi","La Final","El Gran Partido"],"El Clásico is one of the biggest rivalries in world football.",1);
m(4,"Football","Which Argentine player spent most of his career at FC Barcelona (2004–2021)?","Lionel Messi",["Diego Maradona","Gabriel Batistuta","Carlos Tevez"],"Messi won 10 La Liga titles and 4 Champions League trophies with Barça.",1);
m(4,"Football","What is the name of FC Barcelona’s youth academy?","La Masia",["La Fábrica","Cantera","Ciutat Esportiva"],"La Masia produced stars such as Xavi, Iniesta, Piqué and Messi.",2);
m(4,"Football","What are Barça’s club colours called?","Blaugrana",["Rojiblanco","Albiceleste","Merengue"],"Blaugrana (blue and garnet-red) comes from the Catalan words for blue and red.",1);
m(4,"Football","Which other professional football club represents Barcelona in La Liga?","RCD Espanyol",["Girona","Villarreal","Sabadell"],"Espanyol, founded in 1900, plays in the Cornellà-El Prat stadium.",2);
m(4,"Football","In which year did Spain win its first FIFA World Cup?","2010",["2006","2014","2002"],"Spain beat the Netherlands 1–0 in the final in South Africa, with a goal from Iniesta.",2);
m(4,"Tennis","Which Spanish tennis star won 14 French Open titles?","Rafael Nadal",["Carlos Alcaraz","David Ferrer","Roberto Bautista"],"Nadal, from Mallorca, won Roland Garros 14 times, a record.",1);
m(4,"Basketball","Which Barcelona-born basketball star won two NBA titles with the Lakers?","Pau Gasol",["Ricky Rubio","Juan Carlos Navarro","Marc Gasol"],"Pau Gasol won the NBA title with the Lakers in 2009 and 2010.",3);
m(4,"Motorsport","The Circuit de Barcelona-Catalunya, near Barcelona, regularly hosts which event?","Spanish Grand Prix (Formula 1) and MotoGP",["Tour de France","US Open","Dakar Rally"],"The circuit in Montmeló opened in 1991 and hosts testing and F1 races.",2);
vf(4,"FC Barcelona’s stadium is called Camp Nou.",true,"Camp Nou, the Spotify Camp Nou for sponsorship, is Europe’s largest football stadium.",1);
ty(4,"Which Argentine star played for FC Barcelona from 2004 to 2021? (surname)",["messi","lionel messi"],"Lionel Messi.",1);
ty(4,"What is the name of the most famous match between Barça and Real Madrid? (El C……)",["clasico","clásico","el clasico","el clásico"],"El Clásico.",2);

// ===================== 5. Spain: everyday life & facts =====================
m(5,"Facts","What is the capital of Spain?","Madrid",["Barcelona","Valencia","Seville"],"Madrid has been the capital since 1561 (with brief interruptions).",1);
m(5,"Facts","What is the currency of Spain?","The euro",["The peseta","The pound","The dollar"],"Spain adopted the euro in 2002; before that it used the peseta.",1);
m(5,"Facts","How many autonomous communities does Spain have?","17",["10","13","25"],"Plus two autonomous cities (Ceuta and Melilla).",3);
m(5,"Culture","Where does the “running of the bulls” happen each July?","Pamplona",["Barcelona","Seville","Valencia"],"San Fermín festival, 6–14 July, is made world-famous by Hemingway’s novel.",1);
m(5,"Culture","What happens at La Tomatina in Buñol?","A giant tomato fight",["A bullfight","A wine battle","A horse race"],"La Tomatina takes place on the last Wednesday of August in Buñol, near Valencia.",1);
m(5,"Culture","Which palace-fortress in Granada is one of Spain’s most visited monuments?","The Alhambra",["Alcázar de Sevilla","El Escorial","Palacio Real"],"The Alhambra was built by the Nasrid dynasty in the 13th–14th centuries.",2);
m(5,"Culture","Which city is home to the Prado Museum?","Madrid",["Bilbao","Barcelona","Toledo"],"The Prado holds works by Velázquez, Goya and El Greco.",2);
m(5,"Culture","Which museum, designed by Frank Gehry, helped transform Bilbao?","Guggenheim Museum",["Reina Sofía","Prado","CaixaForum"],"The Guggenheim Bilbao opened in 1997 and gave rise to the “Bilbao effect”.",2);
m(5,"Everyday","What does the Spanish word “vale” mean in everyday talk?","OK",["Wait","Sorry","Cheap"],"“¡Vale!” is the Spanish way of saying OK, said all the time in Spain.",1);
m(5,"Education","The Erasmus programme is named after…","A Dutch Renaissance scholar, Erasmus of Rotterdam",["A Spanish king","A Greek philosopher","A Roman general"],"Erasmus (c. 1466–1536) travelled across Europe; the EU programme also stands for “EuRopean Community Action Scheme for the Mobility of University Students”.",2);
m(5,"Geography","Which Spanish archipelago is off the coast of Africa and famous for beaches and volcanoes?","Canary Islands",["Balearic Islands","Azores","Madeira"],"The Canary Islands include Tenerife, Gran Canaria and Lanzarote.",1);
m(5,"Facts","Which mountain range forms the border between Spain and France?","The Pyrenees",["The Alps","The Apennines","The Carpathians"],"The Pyrenees also border Andorra.",1);
vf(5,"Spain’s head of state is a king.",true,"Spain is a parliamentary monarchy; Felipe VI has been king since 2014.",1);
ty(5,"Mallorca and Ibiza belong to which Spanish archipelago? (B…… Islands, one word)",["balearic","balearics","balearic islands"],"The Balearic Islands, in the Mediterranean.",2);
ty(5,"Which sea lies on Spain’s eastern coast? (one word, the ………ean Sea)",["mediterranean","mediterraneo","mediterráneo"],"The Mediterranean Sea.",2);

return {id:"barcelona",title:"Barcelona & Spain Survival Guide",kw:"barcelona spain españa catalonia catalunya catalan gaudi sagrada familia food tapas paella football barça erasmus student life esade travel",subject:"Landmarks, food, Catalan culture, football and everyday life: ready for Barcelona?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
