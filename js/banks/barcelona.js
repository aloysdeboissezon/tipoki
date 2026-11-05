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

// ===================== More questions (batch 2) =====================
m(1,"Architecture","Which Gaudí building on Passeig de Gràcia is nicknamed “La Pedrera”, meaning “the quarry”?","Casa Milà",["Casa Batlló","Palau Güell","Casa Vicens"],"Its wavy stone facade has no straight walls and is a UNESCO World Heritage Site.",2);
m(1,"Architecture","Which Gaudí house on Passeig de Gràcia is nicknamed the “House of Bones”?","Casa Batlló",["Casa Milà","Casa Calvet","Casa Vicens"],"Its balconies look like skulls and its columns look like bones.",3);
m(1,"Architecture","Park Güell was originally planned as…","A garden city for wealthy families",["A cemetery","A zoo","A market"],"The housing project failed and the city bought it, opening it as a public park in 1926.",3);
m(1,"Architecture","Which skyscraper by French architect Jean Nouvel, known as “the gherkin”, stands near Glòries?","Torre Glòries",["Torre Mapfre","Hotel Arts","Torre Telefónica"],"It was previously called Torre Agbar. It has over 4,000 windows and shines at night.",3);
m(1,"Architecture","Which concert hall by Lluís Domènech i Montaner is a UNESCO World Heritage modernista treasure?","Palau de la Música Catalana",["Gran Teatre del Liceu","L’Auditori","Teatre Nacional"],"Its stained-glass skylight shows the sun and sky in blue and gold.",2);
m(1,"Places","Barcelona’s medieval old centre, with narrow lanes and the cathedral, is called the…","Gothic Quarter",["Eixample","Poble-sec","Sarrià"],"The Barri Gòtic contains Roman remains and Gothic buildings from the Middle Ages.",1);
m(1,"Places","Which seaside neighbourhood, once home to fishermen, is Barcelona’s best-known beach district?","Barceloneta",["Gràcia","Sants","Pedralbes"],"Barceloneta was built in the 18th century and is known for its seafood restaurants.",1);
m(1,"Places","The Picasso Museum is located in which Barcelona neighbourhood?","El Born",["El Raval","Poblenou","Sarrià"],"The museum occupies five medieval palaces along Carrer de Montcada.",3);
m(1,"Places","Which Barcelona neighbourhood, once a separate village, is famous for decorating its streets each August?","Gràcia",["El Born","Poble-sec","Sants"],"The Festa Major de Gràcia has street competitions for the most creative decorations.",2);
vf(1,"The tallest tower of the Sagrada Família is planned to be slightly lower than Montjuïc hill.",true,"Gaudí felt that the work of man should not surpass the work of God, so it will be 172.5 m high.",3);
vf(1,"FC Barcelona’s stadium Camp Nou was given the sponsored name Spotify Camp Nou in 2022.",true,"Spotify agreed a naming deal and also appears on the club’s shirts.",2);

m(2,"Christmas","In Catalan Christmas nativity scenes, a small hidden figure of a squatting man is called…","El Caganer",["El Pastor","El Gegant","El Tió"],"El Caganer is a beloved tradition in Catalonia and politicians and celebrities are often made into figurines.",3);
m(2,"Christmas","What is the “Tió de Nadal” that Catalan children hit with sticks?","A smiling log that “poops” presents",["A chocolate cake","A hanging star","A Christmas tree"],"Children sing a song and hit the log until it “gives” sweets and small gifts.",2);
m(2,"Fiestas","In which city are giant papier-mâché sculptures burned during the Falles festival every March?","Valencia",["Seville","Málaga","Granada"],"Las Fallas ends on 19 March with the burning of the sculptures, called “ninots”.",1);
m(2,"Music","Which traditional Catalan circle dance is performed in squares, often on Sundays?","Sardana",["Jota","Sevillanas","Fandango"],"People hold hands and dance in a circle to a band called a “cobla”.",2);
m(2,"Food","What is “horchata” in Valencia?","A sweet drink made from tiger nuts",["A cold tomato soup","A spicy sausage","A type of cava"],"The drink is called “orxata” in Valencian and is usually served very cold in summer.",2);
m(2,"Food","What is “botifarra” in Catalan cuisine?","A sausage",["A cheese","A soup","A cake"],"It is often grilled and served with white beans.",2);
m(2,"Food","Jamón ibérico comes from pigs that are famously fed on…","Acorns",["Olives","Chestnuts","Corn"],"The best ham is called “bellota”, from the Spanish word for acorn.",2);
m(2,"Traditions","The child who climbs to the top of a human tower (castell) is called…","The enxaneta",["The pinya","The folre","The tronc"],"The enxaneta raises a hand to show the tower is complete before climbing down.",3);
m(2,"Fiestas","In a Catalan “correfoc” (fire run), people run among…","Dancing devils with fireworks",["Bulls in the street","Floats of flowers","Horse riders"],"Participants wear protective clothing and run through showers of sparks.",3);
vf(2,"Spain’s Christmas lottery, known as “El Gordo”, is drawn every year on 22 December.",true,"The draw is broadcast live and its children singing out the numbers are a tradition.",2);

m(3,"Culture","Which Spanish writer wrote “Don Quixote”?","Miguel de Cervantes",["Federico García Lorca","Miguel de Unamuno","Antonio Machado"],"The first part was published in 1605 and is often called the first modern novel.",1);
m(3,"Culture","Which Spanish painter created the famous anti-war painting “Guernica”?","Pablo Picasso",["Salvador Dalí","Francisco Goya","Diego Velázquez"],"Picasso painted it in 1937 after the bombing of the Basque town of Guernica.",1);
m(3,"Culture","In which city is the colourful Feria de Abril held?","Seville",["Madrid","Málaga","Barcelona"],"Women wear flamenco dresses and people dance sevillanas in small tents called “casetas”.",2);
m(3,"Culture","Which Spanish city is home to the Guggenheim Museum, designed by Frank Gehry?","Bilbao",["San Sebastián","Santander","Vitoria"],"The titanium museum opened in 1997 and helped to transform the city.",2);
m(3,"Geography","Which is the largest island of the Balearic Islands?","Mallorca",["Ibiza","Menorca","Formentera"],"Mallorca’s capital is Palma and the island attracts millions of tourists a year.",2);
m(3,"Geography","What is the capital of Andalusia?","Seville",["Málaga","Granada","Córdoba"],"Seville is Spain’s fourth-largest city and is famous for flamenco and its cathedral.",2);
m(3,"Politics","In Spain, the head of government is officially called…","President of the Government",["Chancellor","Prime Consul","Governor-General"],"The King is head of state. The head of government is the “Presidente del Gobierno”.",3);
m(3,"History","In which year did Franco’s dictatorship end with his death?","1975",["1969","1978","1981"],"Spain then moved to democracy and approved its Constitution in 1978.",2);
m(3,"Language","Which language is co-official with Spanish in the Basque Country?","Basque (Euskera)",["Galician","Occitan","Asturian"],"Basque is unrelated to any other known language in Europe.",1);
m(3,"Sport","Spain’s national football team is nicknamed…","La Roja",["Los Toros","Los Leones","La Naranja"],"“The Red One” refers to the colour of the team’s shirt.",2);
vf(3,"Spain is the second most visited country in the world, after France.",true,"Spain welcomed around 85 million international tourists in 2023.",2);
vf(3,"Madrid is the highest capital city in the European Union.",true,"Madrid sits at around 650 metres above sea level.",3);

m(4,"Companies","Iberia and British Airways belong to which airline group?","IAG",["Lufthansa Group","Air France-KLM","Ryanair Holdings"],"International Airlines Group was formed in 2011 by the merger of Iberia and British Airways.",2);
m(4,"Companies","Mapfre is one of Spain’s biggest companies in which sector?","Insurance",["Airlines","Cement","Cars"],"Mapfre operates in more than 40 countries, particularly in Latin America.",3);
m(4,"Companies","In 2023, the Spanish infrastructure group Ferrovial moved its headquarters to which country?","The Netherlands",["Ireland","Luxembourg","Portugal"],"Ferrovial, which builds roads and airports, also planned to list its shares in the United States.",3);
m(4,"Companies","Grifols, a Barcelona-based company, is known for medicines made from…","Blood plasma",["Olive oil","Cork","Wool"],"Grifols is one of the world’s biggest producers of plasma-based treatments.",3);
m(4,"Companies","Loewe, a luxury leather brand founded in Madrid in 1846, belongs to which group?","LVMH",["Kering","Inditex","Richemont"],"Loewe is Spain’s oldest luxury brand and was bought by LVMH in 1996.",3);
m(4,"Economy","What is “Hacendado”, found in Spanish supermarkets?","Mercadona’s own-label brand",["A Catalan beer","A bank","A fashion brand"],"A white-label brand sells products under the supermarket’s own name instead of a maker’s brand.",2);
m(4,"Economy","In Spain, an “autónomo” is…","A self-employed worker",["A robot","A government inspector","A foreign student"],"Spain has over 3 million autónomos, who pay monthly social-security contributions.",2);
m(4,"Economy","What is the standard rate of VAT (IVA) in Spain?","21%",["15%","19%","25%"],"Some products, like food and books, have reduced rates of 10% or 4%.",2);

m(5,"Catalan","How do you say “good night” in Catalan?","Bona nit",["Bon dia","Bona tarda","Adéu"],"Bona nit is used when saying goodbye in the evening or before going to sleep.",1);
m(5,"Catalan","What does “adéu” mean in Catalan?","Goodbye",["Welcome","Thank you","Excuse me"],"It comes from the same roots as the Spanish “adiós” and the French “adieu”.",1);
m(5,"Catalan","What does “perdó” mean in Catalan?","Sorry or excuse me",["Please","Thank you","Cheers"],"Catalans use “perdó” to apologise or to get past someone.",1);
m(5,"Catalan","What does “a reveure” mean?","See you soon",["Good morning","Welcome","Thank you very much"],"It literally means “until we see each other again”.",2);
m(5,"Catalan","What does “quant costa?” mean?","How much does it cost?",["Where is the coast?","What time is it?","How are you?"],"A useful phrase for markets such as La Boqueria.",2);
m(5,"Catalan","What is “diumenge” in English?","Sunday",["Monday","Saturday","Friday"],"Dilluns is Monday, dimarts is Tuesday and dimecres is Wednesday.",1);
m(5,"Catalan","What does “bon cap d’any” wish someone?","Happy New Year",["Good luck","Happy birthday","Merry Christmas"],"Catalans also say “Bon Nadal” for Merry Christmas.",3);
m(5,"ESADE","ESADE was founded in 1958 with the help of which religious order?","The Jesuits",["Opus Dei","The Benedictines","The Franciscans"],"The Society of Jesus and a group of Catalan businessmen created the school.",3);
m(5,"Student life","The Erasmus programme is…","An EU student exchange programme",["A Spanish-only scholarship","A language exam","A student sports league"],"Millions of students have taken part since it started in 1987.",1);
m(5,"Student life","The Erasmus programme is named after which Renaissance humanist?","Erasmus of Rotterdam",["Thomas More","Dante","Voltaire"],"Erasmus travelled across Europe to study and teach, so he fits the idea of the programme.",2);
m(5,"Student life","What does ECTS stand for at European universities?","European Credit Transfer and Accumulation System",["European Course Testing Standard","Educational Credit and Teaching Scale","European Certificate of Teaching Skills"],"One academic year is typically 60 ECTS credits.",3);
m(5,"Student life","In Spanish universities, a “TFG” is…","The final degree project",["A sports club","A student card","A holiday"],"Trabajo de Fin de Grado is written in the final year of a bachelor’s degree.",3);
vf(5,"The Erasmus programme only lets students study in Spain.",false,"Erasmus covers dozens of countries across Europe and beyond.",1);

ty(3,"Which Spanish painter is famous for melting clocks and a curly moustache? (surname)",["Dalí","Dali"],"Salvador Dalí painted “The Persistence of Memory” in 1931 and was born in Figueres, Catalonia.",2);
ty(4,"What was Spain’s currency before the euro? (one word)",["peseta","pesetas"],"The peseta was replaced by the euro on 1 January 2002.",2);

// ===== More questions =====
m(1,"Gaudí","What is the name of the park designed by Gaudí with its mosaic salamander?","Park Güell",["Parc de la Ciutadella","Parc del Laberint","Parc de Montjuïc"],"Park Güell was designed as a garden city for Eusebi Güell.",1);
m(1,"Landmarks","Which Barcelona neighbourhood is the old medieval centre around the Cathedral?","The Gothic Quarter",["Gràcia","Poblenou","Sants"],"The Barri Gòtic dates from Roman and medieval times.",1);
m(1,"Landmarks","Which Barcelona market is the main covered market near La Rambla?","La Boqueria",["Mercat de Sant Antoni","Santa Caterina","Mercat de la Concepció"],"La Boqueria is one of the oldest and most visited markets in Europe.",2);
m(1,"Landmarks","Which Barcelona district is known for its small squares and village feel, north of the Eixample?","Gràcia",["Raval","Sarrià","Les Corts"],"Gràcia was an independent town until 1897.",2);
m(1,"Football","In which district of Barcelona is Camp Nou located?","Les Corts",["Sants","Gràcia","Sant Martí"],"The stadium opened in 1957.",3);
m(1,"Landmarks","Which Barcelona museum is dedicated to Pablo Picasso?","Museu Picasso",["MACBA","CaixaForum","Fundació Miró"],"It is housed in medieval palaces in El Born.",2);
vf(1,"Barcelona is the capital of Catalonia.",true,"Barcelona is Catalonia’s capital and the second-largest city in Spain.",1);
vf(1,"The Sagrada Família is a cathedral.",false,"It is a basilica, not a cathedral.",3);
m(2,"Tradition","What is the Catalan name for the feast of Saint George?","Sant Jordi",["Sant Joan","La Mercè","Nadal"],"On April 23, roses and books are exchanged.",1);
m(2,"Tradition","Which celebration on the night of June 23 involves bonfires and fireworks?","Sant Joan",["La Mercè","Sant Jordi","Carnaval"],"Revetlla de Sant Joan marks the start of summer.",2);
m(2,"Tradition","Which festival in late September is Barcelona’s main city festival?","La Mercè",["Sant Joan","La Diada","Gràcia Festival"],"La Mercè includes castells, correfocs and concerts.",2);
m(2,"Tradition","What is the Catalan national day, celebrated on September 11, called?","La Diada",["La Mercè","Sant Jordi","La Patum"],"It commemorates the fall of Barcelona in 1714.",2);
m(2,"Tradition","What is a “correfoc” in Catalonia?","A fire run with devils and fireworks",["A horse parade","A food fair","A boat race"],"Participants dressed as devils run with firecrackers.",3);
m(2,"Tradition","What do Catalans call the “caga tió” at Christmas?","A log that “poops” gifts",["A Christmas tree","A nativity shepherd","A Christmas cake"],"Children hit the log with sticks and sing so it will deliver presents.",2);
m(2,"Tradition","Which dance is Catalonia’s traditional circle dance, danced in plazas?","Sardana",["Flamenco","Jota","Fandango"],"The sardana is danced to the music of a cobla band.",2);
m(2,"Food","Which dish is Catalan rice cooked in a shallow pan with seafood?","Arròs a la cassola",["Paella","Fideuà","Arròs negre"],"It is cooked in a clay dish.",3);
m(2,"Food","Which Spanish dish is a cold tomato soup from Andalusia?","Gazpacho",["Salmorejo","Ajo blanco","Fabada"],"Gazpacho is made from tomato, cucumber, pepper and garlic.",1);
m(2,"Food","Which Spanish ham is air-dried and made from acorn-fed pigs?","Jamón ibérico",["Jamón cocido","Lomo","Chorizo"],"The best jamón ibérico de bellota is cured for years.",2);
m(2,"Food","Which dish is bread slices topped with food, served in bars in Basque Country?","Pintxos",["Tapas","Raciones","Bocadillos"],"Pintxos are held together with a toothpick.",2);
vf(2,"“Sangria” is a traditional Spanish drink made of wine and fruit.",true,"Sangria is red wine mixed with fruit and sometimes a spirit.",1);
vf(2,"Paella originated in Madrid.",false,"Paella is from Valencia.",1);
m(3,"Spain","Which Spanish city is famous for the Semana Santa processions and the Giralda tower?","Seville",["Valencia","Bilbao","Salamanca"],"The Giralda is the bell tower of Seville’s cathedral.",2);
m(3,"Spain","Which Spanish city holds the Las Fallas festival every March?","Valencia",["Seville","Pamplona","Alicante"],"Las Fallas involves burning huge sculptures.",2);
m(3,"Spain","Which Spanish film director made “Volver” and “All About My Mother”?","Pedro Almodóvar",["Luis Buñuel","Alejandro Amenábar","Guillermo del Toro"],"Almodóvar won two Oscars.",2);
m(3,"Spain","Which Spanish tennis star was born in Mallorca and won 14 French Open titles?","Rafael Nadal",["Carlos Alcaraz","David Ferrer","Roberto Bautista"],"Nadal is from Manacor.",1);
m(3,"Spain","Which Spanish city has an ancient Roman aqueduct in its centre?","Segovia",["Toledo","Ávila","Burgos"],"The aqueduct of Segovia is almost 2,000 years old.",3);
m(3,"Spain","What is the main river that flows through Madrid?","The Manzanares",["The Ebro","The Tagus","The Guadalquivir"],"The Manzanares is a small river that flows through the capital.",3);
m(3,"Spain","Which Spanish island is the biggest of the Canary Islands?","Tenerife",["Gran Canaria","Lanzarote","Fuerteventura"],"Tenerife is home to Mount Teide.",3);
m(3,"Spain","Which country borders Spain to the north-east, beyond the Pyrenees?","France",["Andorra","Italy","Portugal"],"The Pyrenees mark the border between Spain and France.",1);
m(3,"Spain","Which festival is held in Seville two weeks after Easter, with horse carriages and casetas?","Feria de Abril",["La Tomatina","San Fermín","Las Fallas"],"Feria de Abril takes place in Seville two weeks after Easter.",3);
vf(3,"Spain is the largest country in the European Union by area.",false,"France is larger; Spain is second.",3);
vf(3,"Spain has more than one official language.",true,"Spanish, Catalan, Galician and Basque are co-official in their regions.",1);
m(4,"Business","Which Spanish fashion group owns Zara?","Inditex",["Mango","Desigual","Pull&Bear"],"Inditex was founded by Amancio Ortega in A Coruña.",1);
m(4,"Business","Which Catalan fashion company was founded in Barcelona by Isak Andic?","Mango",["Desigual","Custo Barcelona","Bershka"],"Mango opened its first store in 1984.",2);
m(4,"Business","Which Spanish airline is the national flag carrier?","Iberia",["Air Europa","Vueling","Ryanair"],"Iberia is part of IAG.",2);
m(4,"Business","Which Spanish bank is headquartered in Santander and has global operations?","Banco Santander",["BBVA","CaixaBank","Sabadell"],"Santander is one of the largest banks in the eurozone.",1);
vf(4,"Zara was founded in Madrid.",false,"Zara was founded in A Coruña, Galicia, in 1975.",2);
ty(1,"Which architect designed the Sagrada Família? (surname)",["Gaudí","Gaudi","Antoni Gaudí"],"Gaudí devoted his last years to it.",1);
ty(2,"Which Catalan feast gives roses and books on April 23? (two words)",["Sant Jordi"],"It is Catalonia’s Valentine’s Day.",1);
ty(3,"Which Spanish painter created Guernica? (surname)",["Picasso","Pablo Picasso"],"Picasso was born in Málaga.",1);

return {id:"barcelona",title:"Barcelona & Spain",kw:"barcelona spain españa catalonia catalunya catalan gaudi sagrada familia barça fc barcelona traditions tapas paella business ibex mercadona esade madrid campus student life",subject:"Gaudí, tapas, IBEX 35 and survival Catalan: are you ready for life at ESADE?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
