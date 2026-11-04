// Quiz names in every interface language: title, subject, chapter names and chapter tags.
// The questions keep their own language; only what frames the quiz (cards, headers, chapter chips) follows the interface.
// Format: id -> { lang: [title, subject, [chapter names 1..n], [chapter tags 1..n]] }. The quiz's own language is left out (it is in its bank).
// socio has no tags (its chips read S1, S2...). Adding a quiz: add its id here with the two other languages (a test checks it).
(function(){
var M={
socio:{
 fr:["Socio Trivia · Séances 1–10","Contexte sociopolitique des affaires",["Pourquoi et quoi : la sociologie · Le soi numérique","Socialisation, rôles et identités","Déviance et contrôle social · Surveillance","Stratification sociale","Stratification selon le genre · Manosphère","Stratification selon la race · Biais algorithmiques","Culture et processus culturels","Santé, maladie et handicap","Pouvoir, changement social et reproduction","Postmodernité et société de consommation"]],
 es:["Socio Trivia · Sesiones 1–10","Contexto sociopolítico de los negocios",["Por qué y qué: la sociología · El yo digital","Socialización, roles e identidades","Desviación y control social · Vigilancia","Estratificación social","Estratificación por género · Manosfera","Estratificación por raza · Sesgo algorítmico","Cultura y procesos culturales","Salud, enfermedad y discapacidad","Poder, cambio social y reproducción","Posmodernidad y sociedad de consumo"]]},
culture:{
 en:["General Knowledge","Endless questions across 8 themes",["Geography","History","Science","Nature & animals","Arts & literature","Film & music","Sport","Languages & miscellany"],["Geo","History","Science","Nature","Arts","Film & music","Sport","Misc"]],
 es:["Cultura general","Preguntas sin fin sobre 8 temas",["Geografía","Historia","Ciencias","Naturaleza y animales","Arte y literatura","Cine y música","Deporte","Idiomas y varios"],["Geo","Historia","Ciencias","Naturaleza","Arte","Cine y música","Deporte","Varios"]]},
energie:{
 en:["Electrical Energy · Chapter 1","Two centuries of electrical energy: alternator, photovoltaics, calculations",["Electromagnetic induction","The alternator","Calculations: efficiency and frequency","Semiconductors and photovoltaics","Energy bands and silicon","Calculations: photovoltaic sensor"],["Induction","Alternator","Alternator maths","Photovoltaics","Energy bands","PV maths"]],
 es:["Energía eléctrica · Capítulo 1","Dos siglos de energía eléctrica: alternador, fotovoltaica, cálculos",["Inducción electromagnética","El alternador","Cálculos: rendimiento y frecuencia","Semiconductores y fotovoltaica","Bandas de energía y silicio","Cálculos: captador fotovoltaico"],["Inducción","Alternador","Cálculos alternador","Fotovoltaica","Bandas de energía","Cálculos FV"]]},
populism:{
 fr:["Quiz d'entraînement 7 · Séances 14 et 15","Müller, The Logic of Populism · Dryzek et al., The crisis of democracy and the science of deliberation",["S14 · Müller : ce qu'est le populisme","S14 · Müller : qui est « le peuple » ?","S14 · Müller : travail, ethnicité et autres antipluralistes","S15 · Dryzek : la crise de la démocratie","S15 · Dryzek : ce que montre la recherche sur la délibération","S15 · Dryzek : faire fonctionner la délibération"],["S14 Définition","S14 Le peuple","S14 Travail et ethnicité","S15 Crise","S15 Résultats","S15 Mise en œuvre"]],
 es:["Quiz de entrenamiento 7 · Sesiones 14 y 15","Müller, The Logic of Populism · Dryzek et al., The crisis of democracy and the science of deliberation",["S14 · Müller: qué es el populismo","S14 · Müller: ¿quién es «el pueblo»?","S14 · Müller: trabajo, etnia y otros antipluralistas","S15 · Dryzek: la crisis de la democracia","S15 · Dryzek: qué muestra la investigación sobre deliberación","S15 · Dryzek: hacer que la deliberación funcione"],["S14 Definición","S14 El pueblo","S14 Trabajo y etnia","S15 Crisis","S15 Hallazgos","S15 Aplicación"]]},
compta2:{
 en:["Accounting Quiz 2","Consolidation of financial statements: groups, full consolidation, internal transactions and equity method",["Groups & types of investment","Goodwill & NCI at acquisition","Consolidating after the acquisition","Internal transactions","Equity method (associates & JVs)","Worked cases: A/B/C and Push/Shove"],["Groups","Goodwill & NCI","Post-acquisition","Intragroup","Equity method","Cases"]],
 fr:["Quiz compta 2","Consolidation des états financiers : groupes, intégration globale, opérations internes et mise en équivalence",["Groupes et types de participation","Goodwill et intérêts minoritaires à l'acquisition","Consolider après l'acquisition","Opérations internes","Mise en équivalence (associées et co-entreprises)","Cas pratiques : A/B/C et Push/Shove"],["Groupes","Goodwill et minoritaires","Post-acquisition","Intragroupe","Mise en équivalence","Cas"]],
 es:["Quiz de contabilidad 2","Consolidación de estados financieros: grupos, integración global, operaciones internas y puesta en equivalencia",["Grupos y tipos de inversión","Fondo de comercio y socios externos en la adquisición","Consolidar tras la adquisición","Operaciones internas","Puesta en equivalencia (asociadas y negocios conjuntos)","Casos prácticos: A/B/C y Push/Shove"],["Grupos","Fondo de comercio y externos","Posadquisición","Intragrupo","Puesta en equivalencia","Casos"]]},
uspop:{
 fr:["Culture pop américaine","Cinéma, télé, musique, sport, nourriture et monuments : que savez-vous des États-Unis ?",["Cinéma","Séries TV","Musique","Sport","Cuisine et marques","Lieux et monuments"],["Cinéma","Télé","Musique","Sport","Cuisine et marques","Monuments"]],
 es:["Cultura pop estadounidense","Cine, TV, música, deportes, comida y monumentos: ¿cuánto sabes de EE. UU.?",["Cine","Series de TV","Música","Deportes","Comida y marcas","Lugares y monumentos"],["Cine","TV","Música","Deportes","Comida y marcas","Monumentos"]]},
gastro:{
 en:["French Gastronomy & Traditions","Cheese, wine, desserts, regions, chefs and festivals: test your French culture",["Cheeses","Wines & drinks","Pastries & desserts","Regional cuisine","Chefs & gastronomy","Festivals & traditions"],["Cheese","Wine","Desserts","Regions","Chefs","Traditions"]],
 es:["Gastronomía y tradiciones francesas","Quesos, vinos, postres, regiones, chefs y fiestas: pon a prueba tu cultura francesa",["Quesos","Vinos y bebidas","Pastelería y postres","Cocina regional","Chefs y gastronomía","Fiestas y tradiciones"],["Quesos","Vinos","Postres","Regiones","Chefs","Tradiciones"]]},
ukculture:{
 fr:["Culture britannique","Musique, télé, famille royale, cuisine, sport et mots : êtes-vous vraiment britannique ?",["Musique","Télé et cinéma","Histoire et famille royale","Boissons et nourriture","Sport et traditions","Lieux et langue"],["Musique","Télé et cinéma","Histoire","Boire et manger","Sport","Lieux et mots"]],
 es:["Cultura británica","Música, TV, realeza, comida, deporte y palabras: ¿cuán británico eres?",["Música","TV y cine","Historia y realeza","Comida y bebida","Deporte y tradiciones","Lugares e idioma"],["Música","TV y cine","Historia","Comer y beber","Deporte","Lugares y palabras"]]},
startups:{
 fr:["Légendes et flops des startups","Des débuts dans un garage aux flops spectaculaires : que savez-vous du monde des startups ?",["Fondateurs et histoires d'origine","Flops spectaculaires","Gros deals et licornes","Made in Spain","Financement et jargon startup"],["Fondateurs","Flops","Deals","Espagne","Jargon"]],
 es:["Leyendas y fracasos de las startups","De los garajes a los grandes fracasos: ¿cuánto sabes del mundo startup?",["Fundadores e historias de origen","Fracasos espectaculares","Grandes operaciones y unicornios","Hecho en España","Financiación y jerga startup"],["Fundadores","Fracasos","Operaciones","España","Jerga"]]},
brands:{
 fr:["Marques et génies du marketing","Slogans, logos, 4P et les campagnes qui ont changé la publicité",["Slogans","Logos et origines","Concepts marketing","Campagnes légendaires","Mode et luxe"],["Slogans","Logos","Concepts","Campagnes","Luxe"]],
 es:["Marcas y genios del marketing","Eslóganes, logotipos, 4P y las campañas que cambiaron la publicidad",["Eslóganes","Logotipos y orígenes","Conceptos de marketing","Campañas legendarias","Moda y lujo"],["Eslóganes","Logotipos","Conceptos","Campañas","Lujo"]]},
barcelona:{
 fr:["Barcelone et l'Espagne","Gaudí, tapas, IBEX 35 et catalan de survie : prêt pour la vie à l'ESADE ?",["Monuments de Barcelone","Traditions catalanes et espagnoles","L'Espagne en chiffres","Business espagnol","ESADE et catalan de survie"],["Monuments","Traditions","Faits","Business","ESADE et catalan"]],
 es:["Barcelona y España","Gaudí, tapas, IBEX 35 y catalán de supervivencia: ¿listo para la vida en ESADE?",["Monumentos de Barcelona","Tradiciones catalanas y españolas","España en datos","Negocios españoles","ESADE y catalán de supervivencia"],["Monumentos","Tradiciones","Datos","Negocios","ESADE y catalán"]]},
finance:{
 fr:["Finance et marchés","Krachs, légendes, crypto et mathématiques de l'argent",["Marchés et actions","Krachs et crises","Investisseurs légendaires","Crypto et fintech","Finance d'entreprise"],["Marchés","Krachs","Investisseurs","Crypto et fintech","Finance d'ent."]],
 es:["Finanzas y mercados","Crisis bursátiles, leyendas, cripto y las matemáticas del dinero",["Mercados y acciones","Crisis y crashes","Inversores legendarios","Cripto y fintech","Finanzas corporativas"],["Mercados","Crashes","Inversores","Cripto y fintech","Finanzas corp."]]},
econ:{
 fr:["Économie et grandes idées","D'Adam Smith à l'euro : les idées que tout étudiant en business doit connaître",["Grands économistes","La macro en bref","Économie comportementale","Monnaie et commerce","L'Europe et l'euro"],["Penseurs","Macro","Comportemental","Monnaie et commerce","Europe"]],
 es:["Economía y grandes ideas","De Adam Smith al euro: las ideas que todo estudiante de negocios debe conocer",["Grandes economistas","La macro en pocas palabras","Economía conductual","Dinero y comercio","Europa y el euro"],["Pensadores","Macro","Conductual","Dinero y comercio","Europa"]]},
strategy:{
 fr:["Stratégie, management et négociation","Porter, BATNA, lean et études de cas légendaires : l'échauffement du MBA",["Cadres stratégiques","Management et leadership","Négociation","Modèles économiques","Études de cas d'entreprise"],["Cadres","Management","Négociation","Modèles","Cas"]],
 es:["Estrategia, gestión y negociación","Porter, BATNA, lean y casos legendarios: el calentamiento del MBA",["Marcos estratégicos","Gestión y liderazgo","Negociación","Modelos de negocio","Casos corporativos"],["Marcos","Gestión","Negociación","Modelos","Casos"]]},
jargon:{
 fr:["Défi du jargon business","Acronymes, buzzwords et faux amis : survivrez-vous à une réunion en anglais ?",["Acronymes","Langue de bois d'entreprise","Buzzwords startup et marketing","Faux amis et anglais des affaires","Livres et citations célèbres"],["Acronymes","Langue de bois","Buzzwords","Faux amis","Livres et citations"]],
 es:["Reto de la jerga empresarial","Siglas, palabras de moda y falsos amigos: ¿sobrevivirás a una reunión en inglés?",["Siglas","Jerga corporativa","Palabras de moda de startups y marketing","Falsos amigos e inglés de negocios","Libros y citas famosas"],["Siglas","Jerga corporativa","Palabras de moda","Falsos amigos","Libros y citas"]]},
bigtech:{
 fr:["Big Tech, IA et divertissement","Géants de la tech, IA, jeux vidéo et divertissement : qui a construit le monde moderne ?",["Les géants de la tech","Les produits qui ont tout changé","La révolution de l'IA","Les dirigeants de la tech","Business du divertissement et du jeu vidéo"],["Géants","Produits","IA","Dirigeants","Divertissement"]],
 es:["Big Tech, IA y entretenimiento","Gigantes tecnológicos, IA, videojuegos y entretenimiento: ¿quién construyó el mundo moderno?",["Los gigantes tecnológicos","Productos que lo cambiaron todo","La revolución de la IA","Líderes tecnológicos","Negocio del entretenimiento y los videojuegos"],["Gigantes","Productos","IA","Líderes","Entretenimiento"]]},
worldtour:{
 fr:["Tour du monde : drapeaux, capitales et records","Drapeaux, capitales qui piègent tout le monde, records mondiaux et monuments : connaissez-vous vraiment la planète ?",["Capitales qui piègent tout le monde","Drapeaux : les anecdotes","Records du monde","Dans quel pays ?"],["Capitales","Drapeaux","Records","Quel pays ?"]],
 es:["Vuelta al mundo: banderas, capitales y récords","Banderas, capitales que engañan a todos, récords mundiales y monumentos: ¿conoces de verdad el planeta?",["Capitales que engañan a todos","Curiosidades de banderas","Récords mundiales","¿En qué país está?"],["Capitales","Banderas","Récords","¿Qué país?"]]},
emoji:{
 fr:["Devinettes en émojis","Devinez le film, la chanson, le pays ou l'expression à partir de quelques émojis",["Films en émojis","Chansons et artistes","Lieux et plats","Expressions et vie quotidienne"],["Films","Chansons","Lieux et plats","Expressions"]],
 es:["Acertijos con emojis","Adivina la película, la canción, el país o el refrán con unos pocos emojis",["Películas en emojis","Canciones y artistas","Lugares y comidas","Refranes y vida cotidiana"],["Películas","Canciones","Lugares y comidas","Refranes"]]},
internet:{
 fr:["Culture internet et TikTok","Applis, mèmes, moments viraux et argot : êtes-vous accro à internet ?",["Applis et plateformes","Mèmes et moments viraux","Créateurs et records","L'argot décodé"],["Applis","Mèmes","Créateurs","Argot"]],
 es:["Cultura de internet y TikTok","Apps, memes, momentos virales y jerga: ¿vives conectado a internet?",["Apps y plataformas","Memes y momentos virales","Creadores y récords","La jerga descifrada"],["Apps","Memes","Creadores","Jerga"]]},
hits:{
 fr:["Tubes pop et stars de la musique","La royauté de la pop, qui chante quoi, records et tubes de chaque décennie",["La royauté de la pop","Qui chante ça ?","Records et anecdotes","Les tubes des décennies"],["Royauté","Qui chante ?","Records","Décennies"]],
 es:["Éxitos pop y estrellas de la música","La realeza del pop, quién canta qué, récords y éxitos de cada década",["La realeza del pop","¿Quién lo canta?","Récords y curiosidades","Éxitos por décadas"],["Realeza","¿Quién canta?","Récords","Décadas"]]},
screen:{
 fr:["Écrans : séries, Disney et super-héros","Séries Netflix, Disney, Marvel, Harry Potter et cultes : combien en avez-vous vu ?",["Netflix et binge-watching","Disney et Pixar","Marvel et DC","Sorciers, galaxies et cultes"],["Binge","Disney","Super-héros","Cultes"]],
 es:["Pantallas: series, Disney y superhéroes","Series de Netflix, Disney, Marvel, Harry Potter y clásicos de culto: ¿cuántas has visto?",["Netflix y maratones de series","Disney y Pixar","Marvel y DC","Magos, galaxias y series de culto"],["Maratón","Disney","Superhéroes","Culto"]]},
sports:{
 fr:["Légendes du sport et grands moments","Football, Coupe du monde, JO, NBA, tennis et F1 : quel fan êtes-vous ?",["Les stars du football","Coupe du monde et JO","Basket, tennis et F1","Records et rivalités"],["Football","Grands événements","Autres sports","Records"]],
 es:["Leyendas del deporte y grandes momentos","Fútbol, Mundial, Juegos Olímpicos, NBA, tenis y F1: ¿qué tan fan eres?",["Estrellas del fútbol","Mundial y Juegos Olímpicos","Baloncesto, tenis y F1","Récords y rivalidades"],["Fútbol","Grandes eventos","Otros deportes","Récords"]]},
gamer:{
 fr:["Défi gamer et anime","Mario, Pokémon, Minecraft, Fortnite et légendes de l'anime : êtes-vous un vrai gamer ?",["Nintendo et Pokémon","Les hits du jeu vidéo moderne","Légendes de l'anime","Consoles et histoire du jeu vidéo"],["Nintendo","Jeux modernes","Anime","Histoire"]],
 es:["Reto gamer y anime","Mario, Pokémon, Minecraft, Fortnite y leyendas del anime: ¿eres un gamer de verdad?",["Nintendo y Pokémon","Éxitos de los videojuegos actuales","Leyendas del anime","Consolas e historia de los videojuegos"],["Nintendo","Juegos actuales","Anime","Historia"]]},
kids:{
 fr:["Êtes-vous plus malin qu'un CM2 ?","Les bases de l'école que les adultes ratent souvent : battrez-vous un élève de 10 ans ?",["Sciences et espace","Nature et corps humain","Maths et mots","Histoire et monde"],["Sciences","Nature","Maths et mots","Histoire"]],
 es:["¿Eres más listo que un niño de 10 años?","Lo básico del colegio que los adultos suelen fallar: ¿superarás a un niño de quinto de primaria?",["Ciencia y espacio","Naturaleza y cuerpo humano","Matemáticas y palabras","Historia y mundo"],["Ciencia","Naturaleza","Mates y palabras","Historia"]]},
myths:{
 fr:["Idées reçues et faits incroyables","Ce que tout le monde croit à tort, et des faits vrais qui semblent faux",["Mythes sur le corps et le cerveau","Mythes sur les animaux","Mythes d'histoire et de cinéma","Des faits vrais qui semblent faux"],["Corps et cerveau","Animaux","Histoire et cinéma","Ça paraît faux"]],
 es:["Mitos y datos alucinantes","Lo que todo el mundo cree y es falso, y datos ciertos que parecen mentira",["Mitos del cuerpo y el cerebro","Mitos de animales","Mitos de historia y cine","Datos ciertos que parecen falsos"],["Cuerpo y cerebro","Animales","Historia y cine","Parece falso"]]},
foodtravel:{
 fr:["Défi cuisine et voyages","D'où viennent les plats, les spécialités du monde, les monuments et les bons réflexes de voyageur",["D'où ça vient ?","Manger autour du monde","Monuments et merveilles","Le b.a.-ba du voyageur"],["Origines","Plats","Monuments","Voyage"]],
 es:["Reto de comida y viajes","De dónde vienen los platos, especialidades del mundo, monumentos y trucos de viajero",["¿De dónde viene?","Comer por el mundo","Monumentos y maravillas","Lo básico del viajero"],["Orígenes","Platos","Monumentos","Viajes"]]}
};
function keyed(a){if(!a)return null;var o={};a.forEach(function(v,i){o[i+1]=v});return o}
window.QMETA=M;
// qmeta(quiz): the same quiz with its title, subject, chapter names and tags in the interface language
// (the original chapter names stay in sess0/tags0: the chapter icons are picked from them).
window.qmeta=function(q){
  if(!q||!q.id)return q;
  var m=(M[q.id]||{})[window.LANG||"en"];
  if(!m)return q;
  var r=Object.assign({},q);
  r.title0=q.title;r.subject0=q.subject;r.title=m[0];r.subject=m[1];
  if(q.sess){r.sess0=q.sess;r.sess=keyed(m[2])||q.sess}
  if(q.tags){r.tags0=q.tags;r.tags=keyed(m[3])||q.tags}
  return r;
};
})();
