// Built-in bank: Barcelona & Spain (English). Landmarks, traditions, Spain in numbers, Spanish business, ESADE and survival Catalan.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_BARCELONA=(function(){
const SESS={1:"Barcelona landmarks",2:"Catalan & Spanish traditions",3:"Spain in facts",4:"Spanish business",5:"ESADE & survival Catalan"};
const TAGS={1:"Landmarks",2:"Traditions",3:"Spain facts",4:"Business",5:"ESADE & Catalan"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Barcelona landmarks =====================
m(1,"Architecture","Which architect designed the Sagrada Família, Park Güell and Casa Batlló?","Antoni Gaudí",["Lluís Domènech i Montaner","Santiago Calatrava","Ricardo Bofill"],"Gaudí is the star of Catalan modernisme. He worked on the Sagrada Família from 1883 until his death in 1926.",1);
m(1,"Architecture","The Sagrada Família’s construction started in 1882. Is it…","Still under construction",["Finished in 1926","Finished in 1992","Never actually built"],"The basilica is still unfinished and is financed mostly by visitors’ tickets and donations.",1);
m(1,"Sport","Which stadium is home to FC Barcelona?","Camp Nou",["Santiago Bernabéu","Mestalla","San Siro"],"Camp Nou (“new field”) opened in 1957 and is being renovated and renamed Spotify Camp Nou for sponsorship.",1);
m(1,"Sport","What is the motto of FC Barcelona?","Més que un club",["Hala Madrid","Força Barça sempre","Always together"],"“Més que un club” means “more than a club” in Catalan.",2);
m(1,"Sport","FC Barcelona was founded in 1899 by a Swiss businessman. What was his name?","Joan Gamper",["Johan Cruyff","Josep Guardiola","Lionel Messi"],"Hans Gamper (Joan Gamper) placed an ad for players, and the club was born.",3);
m(1,"History","Barcelona hosted the Summer Olympic Games in which year?","1992",["1980","1996","2000"],"The 1992 Games transformed Barcelona, opening it to the sea with a new waterfront.",1);
m(1,"Places","Which famous pedestrian street connects Plaça de Catalunya to the old port?","La Rambla",["Passeig de Gràcia","Avinguda Diagonal","Carrer de Balmes"],"La Rambla is about 1.2 km long and includes La Boqueria market.",1);
m(1,"Places","What is the name of the famous market off La Rambla known for fresh fruit and tapas?","La Boqueria",["La Mercè","Sant Antoni","Mercado Libre"],"La Boqueria is one of the most visited markets in Europe.",2);
m(1,"Places","Which mountain above Barcelona has an amusement park and a church called Sagrat Cor?","Tibidabo",["Montserrat","Montjuïc","Teide"],"Tibidabo, in the Collserola range, has one of the oldest amusement parks in the world.",2);
m(1,"Places","The 1992 Olympic stadium and the Magic Fountain are located on which hill?","Montjuïc",["Tibidabo","Carmel","Collserola"],"The Magic Fountain of Montjuïc was built for the 1929 International Exposition.",2);
m(1,"Urban","Which engineer designed the grid-shaped Eixample district of Barcelona in the 19th century?","Ildefons Cerdà",["Antoni Gaudí","Josep Puig i Cadafalch","Le Corbusier"],"Cerdà’s plan has octagonal blocks with chamfered corners, to improve traffic and sunlight.",3);
vf(1,"Barcelona lies on the Atlantic coast.",false,"Barcelona is on the Mediterranean Sea.",1);

// ===================== 2. Catalan & Spanish traditions =====================
m(2,"Catalonia","On 23 April, Catalans celebrate Sant Jordi by giving…","Roses and books",["Chocolates and wine","Candles and cards","Flowers and jewelry"],"Sant Jordi is often called Catalonia’s “Valentine’s Day”. Books are given to men and roses to women, traditionally.",1);
m(2,"Catalonia","What are “castells” in Catalan culture?","Human towers",["Sand castles","Wine festivals","Medieval fairs"],"Castellers climb on each other’s shoulders to form towers up to 10 levels high. It is on the UNESCO Intangible Cultural Heritage list.",2);
m(2,"Food","A “calçotada” is a traditional feast centred on…","Grilled spring onions called calçots",["Roast lamb","Fish soup","Dried cod"],"Calçots are dipped in romesco sauce and eaten with your hands, typically in winter and spring.",2);
m(2,"Food","Pa amb tomàquet consists of bread rubbed with…","Tomato",["Garlic butter","Olive paste","Sausage"],"It is rubbed with tomato, drizzled with olive oil and salted.",1);
m(2,"Food","Crema catalana is similar to which French dessert?","Crème brûlée",["Mousse au chocolat","Tarte tatin","Profiteroles"],"Both are custards topped with caramelised sugar, but crema catalana is flavoured with lemon and cinnamon.",2);
m(2,"Food","Paella comes from which region of Spain?","Valencia",["Catalonia","Andalusia","Galicia"],"Authentic Valencian paella uses rice, chicken, rabbit and beans, not seafood.",1);
m(2,"Food","Which two main ingredients are in a Spanish tortilla?","Eggs and potatoes",["Flour and cheese","Rice and chicken","Tomato and bread"],"A tortilla española is a thick omelette with potatoes, and often onion.",1);
m(2,"Food","Cava, Spain’s sparkling wine, is mainly produced in which Catalan wine region?","Penedès",["Rioja","Ribera del Duero","Priorat"],"Most cava comes from Sant Sadurní d’Anoia, in the Penedès. Codorníu and Freixenet are famous producers.",2);
m(2,"Fiestas","In which Spanish town do thousands of people throw tomatoes at each other every August?","Buñol",["Pamplona","Sitges","Jerez"],"La Tomatina in Buñol (Valencia) has taken place since 1945.",2);
m(2,"Fiestas","Which city is famous for the running of the bulls during the San Fermín festival?","Pamplona",["Seville","Valencia","Barcelona"],"Pamplona holds San Fermín every July. It was made famous by Ernest Hemingway.",1);
m(2,"Music","Flamenco originated mainly in which region of Spain?","Andalusia",["Catalonia","Galicia","Asturias"],"Flamenco combines singing (cante), guitar and dance (baile) and is a UNESCO heritage.",2);
vf(2,"In Spain, dinner is typically eaten around 9 or 10 pm.",true,"Spaniards eat later than most Europeans: lunch around 2 pm and dinner after 9 pm.",1);

// ===================== 3. Spain in facts =====================
m(3,"Basics","What is the capital of Spain?","Madrid",["Barcelona","Seville","Valencia"],"Madrid is in the centre of the country and is also its largest city.",1);
m(3,"Basics","Which country borders Spain to the west?","Portugal",["France","Morocco","Andorra"],"Spain and Portugal share the Iberian Peninsula.",1);
m(3,"Basics","Spain is divided into how many autonomous communities?","17",["7","12","25"],"There are 17 autonomous communities and 2 autonomous cities (Ceuta and Melilla).",3);
m(3,"Basics","Who has been King of Spain since 2014?","Felipe VI",["Juan Carlos I","Alfonso XIII","Carlos III"],"Felipe VI became king when his father Juan Carlos I abdicated in June 2014.",2);
m(3,"Geography","What is the highest mountain in Spain, found on a Canary Island?","Teide",["Mulhacén","Aneto","Montserrat"],"Teide, on Tenerife, is 3,715 m high and is a volcano.",3);
m(3,"Geography","Which islands off the coast of Africa are part of Spain?","The Canary Islands",["The Balearic Islands","The Azores","Madeira"],"The Canary Islands lie in the Atlantic Ocean, west of Morocco.",1);
m(3,"Geography","Mallorca, Menorca and Ibiza belong to which group?","The Balearic Islands",["The Canary Islands","The Cyclades","The Azores"],"The Balearic Islands lie in the Mediterranean east of mainland Spain.",1);
m(3,"Culture","In which city is the Alhambra palace?","Granada",["Seville","Córdoba","Toledo"],"The Alhambra is a Moorish palace and fortress from the 13th and 14th centuries.",2);
m(3,"Culture","The famous Prado art museum is in which city?","Madrid",["Barcelona","Bilbao","Valencia"],"Prado holds masterpieces by Velázquez and Goya.",1);
m(3,"Culture","The famous Camino de Santiago pilgrimage ends in which city?","Santiago de Compostela",["Barcelona","Pamplona","León"],"The Camino ends at the cathedral of Santiago de Compostela, in Galicia.",2);
m(3,"Sport","Which year did Spain win the FIFA World Cup?","2010",["2006","2014","2018"],"Spain beat the Netherlands 1–0 in South Africa, with Andrés Iniesta scoring in extra time.",1);
m(3,"Sport","Which country did Spain beat in the final of Euro 2024?","England",["France","Germany","Italy"],"Spain won 2–1 in Berlin, its fourth European title.",2);
vf(3,"Spain joined the European Economic Community, the EU’s predecessor, in 1986.",true,"Spain and Portugal joined on 1 January 1986.",3);

// ===================== 4. Spanish business =====================
m(4,"Companies","What is the name of Spain’s main stock market index?","IBEX 35",["DAX","CAC 40","FTSE 100"],"The IBEX 35 groups the 35 most liquid companies listed in Spain.",2);
m(4,"Companies","Which supermarket chain, founded in Valencia and led by Juan Roig, is Spain’s biggest?","Mercadona",["Carrefour","Lidl","Dia"],"Mercadona is known for its private-label “Hacendado” products.",2);
m(4,"Companies","El Corte Inglés is a Spanish chain of…","Department stores",["Fast-food restaurants","Banks","Car dealers"],"El Corte Inglés is Europe’s largest department store group.",1);
m(4,"Companies","Which Spanish company operates the mobile brand Movistar?","Telefónica",["Vodafone","Orange","Iberdrola"],"Telefónica is based in Madrid and also operates in Latin America and Germany (O2).",2);
m(4,"Companies","Repsol is a major Spanish company in which sector?","Oil and gas",["Telecoms","Fashion","Airlines"],"Repsol is based in Madrid.",2);
m(4,"Companies","Iberdrola is a global leader in which field?","Renewable energy and electricity",["Retail","Cars","Tourism"],"Iberdrola is based in Bilbao and invests heavily in wind power.",3);
m(4,"Companies","Which low-cost airline is based at Barcelona-El Prat airport?","Vueling",["Ryanair","easyJet","Iberia"],"Vueling is based in El Prat and belongs to IAG, the group that also owns Iberia and British Airways.",2);
m(4,"Economy","Spain is the world’s largest producer of which product?","Olive oil",["Coffee","Cocoa","Tea"],"Spain produces roughly 40–45% of the world’s olive oil in a good year.",1);
m(4,"Economy","Spain’s high-speed rail network is called…","AVE",["TGV","ICE","Shinkansen"],"AVE stands for Alta Velocidad Española. Spain has the longest high-speed network in Europe.",2);
m(4,"Economy","Which Spanish region is famous for its Rioja wines?","La Rioja",["Catalonia","Galicia","Andalusia"],"Rioja is the best known Spanish red wine, made mainly from Tempranillo.",1);
vf(4,"Tourism is one of Spain’s biggest industries, with more than 80 million foreign visitors in recent years.",true,"Spain is one of the most visited countries in the world, in the top two or three.",1);
vf(4,"Banco Santander and BBVA are among the biggest Spanish banks.",true,"Both are global banks with major operations in Latin America and Europe.",1);

// ===================== 5. ESADE & survival Catalan =====================
m(5,"ESADE","In which year was ESADE founded?","1958",["1888","1975","1998"],"ESADE was founded in Barcelona in 1958 by a group of entrepreneurs and the Society of Jesus.",2);
m(5,"ESADE","ESADE is part of which Catalan university?","Universitat Ramon Llull",["Universitat de Barcelona","Pompeu Fabra","Autònoma de Barcelona"],"Universitat Ramon Llull groups several private institutions, including ESADE.",3);
m(5,"ESADE","Which two Catalan campuses does ESADE have in the Barcelona area?","Sant Cugat and Pedralbes",["Badalona and Girona","Tarragona and Lleida","Sitges and Mataró"],"ESADE’s main campus is in Sant Cugat del Vallès, with another in Pedralbes. It also has a campus in Madrid.",2);
m(5,"ESADE","Which three international accreditations make up the “triple crown” of business schools that ESADE holds?","AACSB, EQUIS and AMBA",["MBA, PhD and CFA","GMAT, GRE and TOEFL","ISO, ACCA and CIMA"],"Only a small share of business schools worldwide hold all three.",3);
m(5,"Catalan","How do you say “good morning” in Catalan?","Bon dia",["Buenos días","Bonjour","Bona nit"],"“Bon dia” = good morning. “Bona nit” = good night.",1);
m(5,"Catalan","What does “gràcies” mean?","Thank you",["Please","Sorry","Goodbye"],"“Gràcies” = thanks, “si us plau” = please.",1);
m(5,"Catalan","What does “si us plau” mean?","Please",["Thank you","Hello","Excuse me"],"“Si us plau” is the polite way to say please in Catalan.",2);
m(5,"Catalan","What does “bon profit” mean?","Enjoy your meal",["Good profit","Good luck","Happy birthday"],"A false friend: “bon profit” is said before a meal, as in “bon appétit”.",2);
m(5,"Catalan","What is “aigua” in English?","Water",["Wine","Beer","Milk"],"Aigua = water, vi = wine, cervesa = beer, llet = milk.",1);
m(5,"Catalan","Barcelona addresses are written like “C/ de Balmes”. What does the Catalan word behind “C/” mean?","Street",["Square","Beach","Bridge"],"Carrer = street, plaça = square, passeig = avenue/promenade.",2);
m(5,"Catalan","Which day of the week is “dijous” in Catalan?","Thursday",["Tuesday","Wednesday","Friday"],"Dilluns, dimarts, dimecres, dijous, divendres, dissabte, diumenge.",3);
vf(5,"Catalan and Spanish are both official languages in Catalonia.",true,"Catalan is co-official with Spanish in Catalonia. Aranese (Occitan) is also official in the Val d’Aran.",1);

// ===================== Typed answers =====================
ty(1,"What is the name of the famous 1929 fountain on Montjuïc that lights up with music and colours? (Magic ...)",["Magic Fountain","Font Màgica","Magic Fountain of Montjuïc","Font Magica"],"The Font Màgica de Montjuïc was designed by Carles Buïgas for the 1929 International Exposition.",3);
ty(2,"Which Spanish cold tomato soup from Andalusia is perfect for hot summers?",["gazpacho"],"Gazpacho is made from raw tomatoes, peppers, cucumber, garlic, olive oil and bread.",2);
ty(3,"What is the name of Spain’s currency?",["euro","the euro","euros"],"Spain adopted the euro in 2002, replacing the peseta.",1);
ty(2,"Which sweet fried dough sticks are often dipped in hot chocolate in Spain?",["churros","churro"],"Churros con chocolate are a classic breakfast or snack.",1);
ty(4,"What does “SME” stand for in business English? (four words, the type of company that makes up most of Spain’s economy)",["small and medium enterprises","small and medium-sized enterprises","small and medium sized enterprises","small medium enterprises"],"In Spain, SMEs (pymes in Spanish) represent more than 99% of companies.",2);
ty(1,"Which Spanish football club from Madrid is FC Barcelona’s greatest rival?",["Real Madrid"],"Matches between Barça and Real Madrid are known as El Clásico.",1);
ty(5,"ESADE stands for “Escuela Superior de Administración y Dirección de …” what? (one word, Spanish or English)",["Empresas","Business","Companies","Enterprises"],"ESADE = Escuela Superior de Administración y Dirección de Empresas.",3);

return {id:"barcelona",group:"esade",title:"Barcelona & Spain",kw:"barcelona spain españa catalonia catalunya catalan gaudi sagrada familia barça fc barcelona traditions tapas paella business ibex mercadona esade madrid campus student life",subject:"Gaudí, tapas, IBEX 35 and survival Catalan: are you ready for life at ESADE?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
