// Quiz names in every interface language: title, subject, chapter names and chapter tags.
// The questions keep their own language; only what frames the quiz (cards, headers, chapter chips) follows the interface.
// Format: id -> { lang: [title, subject, [chapter names 1..n], [chapter tags 1..n]] }. The quiz's own language is left out (it is in its bank).
// socio has no tags (its chips read S1, S2...). Adding a quiz: add its id here with the two other languages (a test checks it).
(function(){
var M={
socio:{
 fr:["Sociologie · Séances 1–10","Contexte sociopolitique des affaires",["Pourquoi et quoi : la sociologie · Le soi numérique","Socialisation, rôles et identités","Déviance et contrôle social · Surveillance","Stratification sociale","Stratification selon le genre · Manosphère","Stratification selon la race · Biais algorithmiques","Culture et processus culturels","Santé, maladie et handicap","Pouvoir, changement social et reproduction","Postmodernité et société de consommation"]],
 es:["Sociología · Sesiones 1–10","Contexto sociopolítico de los negocios",["Por qué y qué: la sociología · El yo digital","Socialización, roles e identidades","Desviación y control social · Vigilancia","Estratificación social","Estratificación por género · Manosfera","Estratificación por raza · Sesgo algorítmico","Cultura y procesos culturales","Salud, enfermedad y discapacidad","Poder, cambio social y reproducción","Posmodernidad y sociedad de consumo"]],
 ko:["사회학 · 세션 1–10","비즈니스의 사회정치적 맥락",["왜, 무엇을: 사회학 · 디지털 자아","사회화, 역할, 정체성","일탈과 사회통제 · 감시","사회 계층화","젠더에 따른 계층화 · 맨오스피어","인종에 따른 계층화 · 알고리즘 편향","문화와 문화 과정","건강, 질병, 장애","권력, 사회 변화, 재생산","포스트모더니티와 소비사회"],[]]},
culture:{
 en:["General Knowledge","Endless questions across 8 themes",["Geography","History","Science","Nature & animals","Arts & literature","Film & music","Sport","Languages & miscellany"],["Geo","History","Science","Nature","Arts","Film & music","Sport","Misc"]],
 es:["Cultura general","Preguntas sin fin sobre 8 temas",["Geografía","Historia","Ciencias","Naturaleza y animales","Arte y literatura","Cine y música","Deporte","Idiomas y varios"],["Geo","Historia","Ciencias","Naturaleza","Arte","Cine y música","Deporte","Varios"]],
 ko:["일반 상식","8개 주제의 끝없는 문제",["지리","역사","과학","자연과 동물","예술과 문학","영화와 음악","스포츠","언어와 기타"],["지리","역사","과학","자연","예술","영화·음악","스포츠","기타"]]},
energie:{
 en:["Physics · Electrical Energy, Ch. 1","Two centuries of electrical energy: alternator, photovoltaics, calculations",["Electromagnetic induction","The alternator","Calculations: efficiency and frequency","Semiconductors and photovoltaics","Energy bands and silicon","Calculations: photovoltaic sensor"],["Induction","Alternator","Alternator maths","Photovoltaics","Energy bands","PV maths"]],
 es:["Física · Energía eléctrica, cap. 1","Dos siglos de energía eléctrica: alternador, fotovoltaica, cálculos",["Inducción electromagnética","El alternador","Cálculos: rendimiento y frecuencia","Semiconductores y fotovoltaica","Bandas de energía y silicio","Cálculos: captador fotovoltaico"],["Inducción","Alternador","Cálculos alternador","Fotovoltaica","Bandas de energía","Cálculos FV"]],
 ko:["물리 · 전기 에너지 1장","200년의 전기 에너지: 교류발전기, 태양광, 계산",["전자기 유도","교류발전기","계산: 효율과 주파수","반도체와 태양광","에너지 띠와 실리콘","계산: 태양광 센서"],["유도","발전기","발전기 계산","태양광","에너지 띠","태양광 계산"]]},
populism:{
 fr:["Sociologie · Séances 14–15","Müller, The Logic of Populism · Dryzek et al., The crisis of democracy and the science of deliberation",["S14 · Müller : ce qu'est le populisme","S14 · Müller : qui est « le peuple » ?","S14 · Müller : travail, ethnicité et autres antipluralistes","S15 · Dryzek : la crise de la démocratie","S15 · Dryzek : ce que montre la recherche sur la délibération","S15 · Dryzek : faire fonctionner la délibération"],["S14 Définition","S14 Le peuple","S14 Travail et ethnicité","S15 Crise","S15 Résultats","S15 Mise en œuvre"]],
 es:["Sociología · Sesiones 14–15","Müller, The Logic of Populism · Dryzek et al., The crisis of democracy and the science of deliberation",["S14 · Müller: qué es el populismo","S14 · Müller: ¿quién es «el pueblo»?","S14 · Müller: trabajo, etnia y otros antipluralistas","S15 · Dryzek: la crisis de la democracia","S15 · Dryzek: qué muestra la investigación sobre deliberación","S15 · Dryzek: hacer que la deliberación funcione"],["S14 Definición","S14 El pueblo","S14 Trabajo y etnia","S15 Crisis","S15 Hallazgos","S15 Aplicación"]],
 ko:["사회학 · 세션 14–15","Müller, The Logic of Populism · Dryzek 외, The crisis of democracy and the science of deliberation",["S14 · Müller: 포퓰리즘이란","S14 · Müller: “인민”은 누구인가?","S14 · Müller: 노동, 민족성, 그 밖의 반다원주의","S15 · Dryzek: 민주주의의 위기","S15 · Dryzek: 숙의 연구가 밝힌 것","S15 · Dryzek: 숙의를 작동시키려면"],["S14 정의","S14 인민","S14 노동·민족성","S15 위기","S15 연구 결과","S15 실행"]]},
compta2:{
 en:["Accounting · Consolidation","Consolidation of financial statements: groups, full consolidation, internal transactions and equity method",["Groups & types of investment","Goodwill & NCI at acquisition","Consolidating after the acquisition","Internal transactions","Equity method (associates & JVs)","Worked cases: A/B/C and Push/Shove"],["Groups","Goodwill & NCI","Post-acquisition","Intragroup","Equity method","Cases"]],
 fr:["Comptabilité · Consolidation","Consolidation des états financiers : groupes, intégration globale, opérations internes et mise en équivalence",["Groupes et types de participation","Goodwill et intérêts minoritaires à l'acquisition","Consolider après l'acquisition","Opérations internes","Mise en équivalence (associées et co-entreprises)","Cas pratiques : A/B/C et Push/Shove"],["Groupes","Goodwill et minoritaires","Post-acquisition","Intragroupe","Mise en équivalence","Cas"]],
 es:["Contabilidad · Consolidación","Consolidación de estados financieros: grupos, integración global, operaciones internas y puesta en equivalencia",["Grupos y tipos de inversión","Fondo de comercio y socios externos en la adquisición","Consolidar tras la adquisición","Operaciones internas","Puesta en equivalencia (asociadas y negocios conjuntos)","Casos prácticos: A/B/C y Push/Shove"],["Grupos","Fondo de comercio y externos","Posadquisición","Intragrupo","Puesta en equivalencia","Casos"]],
 ko:["회계 · 연결","재무제표 연결: 그룹, 전부 연결, 내부거래, 지분법",["그룹과 투자 유형","취득 시 영업권과 비지배지분","취득 이후 연결","내부거래","지분법 (관계기업·JV)","사례 풀이: A/B/C와 Push/Shove"],["그룹","영업권·NCI","취득 이후","내부거래","지분법","사례"]]},
regression:{
 fr:["Statistiques · Unité 5 : Régression linéaire","Analyse statistique des données (SAD) · SLR descriptive, modèle de régression linéaire simple et multiple (slides B5)",["Introduction et SLR descriptive","Modèle SLR : hypothèses et résidus","SLR : vérification et utilisation","MLR : spécification et estimation","MLR : hypothèses et vérification","MLR : utilisation et choix des variables","Entraînement au calcul"],["Descriptif","Modèle SLR","Tests et usage SLR","Estimation MLR","Contrôles MLR","Usage MLR","Calculs"]],
 es:["Estadística · Unidad 5: Regresión lineal","Análisis estadístico de datos (SAD) · SLR descriptiva, modelo de regresión lineal simple y múltiple (slides B5)",["Introducción y SLR descriptiva","Modelo SLR: hipótesis y residuos","SLR: verificación y uso","MLR: especificación y estimación","MLR: hipótesis y verificación","MLR: uso y selección de variables","Práctica de cálculo"],["Descriptiva","Modelo SLR","Tests y uso SLR","Estimación MLR","Controles MLR","Uso MLR","Cálculos"]],
 ko:["통계 · 5단원: 선형회귀","통계 데이터 분석(SAD) · 기술적 SLR, 단순·다중 선형회귀 모형 (슬라이드 B5)",["소개와 기술적 SLR","SLR 모형: 가정과 잔차","SLR: 검증과 활용","MLR: 설정과 추정","MLR: 가정과 검증","MLR: 활용과 모형 선택","계산 연습"],["기술통계","SLR 모형","SLR 검정·활용","MLR 추정","MLR 점검","MLR 활용","계산"]]},
uspop:{
 fr:["Culture pop américaine","Cinéma, télé, musique, sport, nourriture et monuments : que savez-vous des États-Unis ?",["Cinéma","Séries TV","Musique","Sport","Cuisine et marques","Lieux et monuments"],["Cinéma","Télé","Musique","Sport","Cuisine et marques","Monuments"]],
 es:["Cultura pop estadounidense","Cine, TV, música, deportes, comida y monumentos: ¿cuánto sabes de EE. UU.?",["Cine","Series de TV","Música","Deportes","Comida y marcas","Lugares y monumentos"],["Cine","TV","Música","Deportes","Comida y marcas","Monumentos"]],
 ko:["미국 대중문화","영화, TV, 음악, 스포츠, 음식, 명소: 미국을 얼마나 알고 있나요?",["영화","TV 프로그램","음악","스포츠","음식과 브랜드","장소와 명소"],["영화","TV","음악","스포츠","음식·브랜드","명소"]]},
gastro:{
 en:["French Gastronomy & Traditions","Cheese, wine, desserts, regions, chefs and festivals: test your French culture",["Cheeses","Wines & drinks","Pastries & desserts","Regional cuisine","Chefs & gastronomy","Festivals & traditions"],["Cheese","Wine","Desserts","Regions","Chefs","Traditions"]],
 es:["Gastronomía y tradiciones francesas","Quesos, vinos, postres, regiones, chefs y fiestas: pon a prueba tu cultura francesa",["Quesos","Vinos y bebidas","Pastelería y postres","Cocina regional","Chefs y gastronomía","Fiestas y tradiciones"],["Quesos","Vinos","Postres","Regiones","Chefs","Tradiciones"]],
 ko:["프랑스 미식과 전통","치즈, 와인, 디저트, 지역, 셰프, 축제: 프랑스 문화를 시험해보세요",["치즈","와인과 음료","페이스트리와 디저트","지역 요리","셰프와 미식","축제와 전통"],["치즈","와인","디저트","지역","셰프","전통"]]},
ukculture:{
 fr:["Culture britannique","Musique, télé, famille royale, cuisine, sport et mots : êtes-vous vraiment britannique ?",["Musique","Télé et cinéma","Histoire et famille royale","Boissons et nourriture","Sport et traditions","Lieux et langue"],["Musique","Télé et cinéma","Histoire","Boire et manger","Sport","Lieux et mots"]],
 es:["Cultura británica","Música, TV, realeza, comida, deporte y palabras: ¿cuán británico eres?",["Música","TV y cine","Historia y realeza","Comida y bebida","Deporte y tradiciones","Lugares e idioma"],["Música","TV y cine","Historia","Comer y beber","Deporte","Lugares y palabras"]],
 ko:["영국 문화","음악, TV, 왕실, 음식, 스포츠, 말: 당신은 얼마나 영국적인가요?",["음악","TV와 영화","역사와 왕실","음식과 음료","스포츠와 전통","장소와 언어"],["음악","TV·영화","역사","음식·음료","스포츠","장소·말"]]},
startups:{
 fr:["Légendes et flops des startups","Des débuts dans un garage aux flops spectaculaires : que savez-vous du monde des startups ?",["Fondateurs et histoires d'origine","Flops spectaculaires","Gros deals et licornes","Made in Spain","Financement et jargon startup"],["Fondateurs","Flops","Deals","Espagne","Jargon"]],
 es:["Leyendas y fracasos de las startups","De los garajes a los grandes fracasos: ¿cuánto sabes del mundo startup?",["Fundadores e historias de origen","Fracasos espectaculares","Grandes operaciones y unicornios","Hecho en España","Financiación y jerga startup"],["Fundadores","Fracasos","Operaciones","España","Jerga"]],
 ko:["스타트업 전설과 실패","차고에서 시작한 이야기부터 대형 실패까지: 스타트업 세계를 얼마나 알고 있나요?",["창업자와 탄생 스토리","화려한 실패","대형 딜과 유니콘","메이드 인 스페인","투자와 스타트업 용어"],["창업자","실패","딜","스페인","용어"]]},
brands:{
 fr:["Marques et génies du marketing","Slogans, logos, 4P et les campagnes qui ont changé la publicité",["Slogans","Logos et origines","Concepts marketing","Campagnes légendaires","Mode et luxe"],["Slogans","Logos","Concepts","Campagnes","Luxe"]],
 es:["Marcas y genios del marketing","Eslóganes, logotipos, 4P y las campañas que cambiaron la publicidad",["Eslóganes","Logotipos y orígenes","Conceptos de marketing","Campañas legendarias","Moda y lujo"],["Eslóganes","Logotipos","Conceptos","Campañas","Lujo"]],
 ko:["브랜드와 마케팅 천재","슬로건, 로고, 4P, 광고를 바꾼 캠페인",["슬로건","로고와 유래","마케팅 개념","전설의 캠페인","패션과 럭셔리"],["슬로건","로고","개념","캠페인","럭셔리"]]},
barcelona:{
 fr:["Barcelone et l'Espagne","Gaudí, tapas, IBEX 35 et catalan de survie : prêt pour la vie à l'ESADE ?",["Monuments de Barcelone","Traditions catalanes et espagnoles","L'Espagne en chiffres","Business espagnol","ESADE et catalan de survie"],["Monuments","Traditions","Faits","Business","ESADE et catalan"]],
 es:["Barcelona y España","Gaudí, tapas, IBEX 35 y catalán de supervivencia: ¿listo para la vida en ESADE?",["Monumentos de Barcelona","Tradiciones catalanas y españolas","España en datos","Negocios españoles","ESADE y catalán de supervivencia"],["Monumentos","Tradiciones","Datos","Negocios","ESADE y catalán"]],
 ko:["바르셀로나와 스페인","가우디, 타파스, IBEX 35, 생존 카탈루냐어: ESADE 생활 준비됐나요?",["바르셀로나 명소","카탈루냐·스페인 전통","스페인 상식","스페인 비즈니스","ESADE와 생존 카탈루냐어"],["명소","전통","스페인 상식","비즈니스","ESADE·카탈루냐어"]]},
finance:{
 fr:["Finance et marchés","Krachs, légendes, crypto et mathématiques de l'argent",["Marchés et actions","Krachs et crises","Investisseurs légendaires","Crypto et fintech","Finance d'entreprise"],["Marchés","Krachs","Investisseurs","Crypto et fintech","Finance d'ent."]],
 es:["Finanzas y mercados","Crisis bursátiles, leyendas, cripto y las matemáticas del dinero",["Mercados y acciones","Crisis y crashes","Inversores legendarios","Cripto y fintech","Finanzas corporativas"],["Mercados","Crashes","Inversores","Cripto y fintech","Finanzas corp."]],
 ko:["금융과 시장","폭락, 전설, 암호화폐, 돈의 수학",["시장과 주식","폭락과 위기","전설적인 투자자","암호화폐와 핀테크","기업 재무"],["시장","폭락","투자자","암호화폐·핀테크","기업 재무"]]},
econ:{
 fr:["Économie et grandes idées","D'Adam Smith à l'euro : les idées que tout étudiant en business doit connaître",["Grands économistes","La macro en bref","Économie comportementale","Monnaie et commerce","L'Europe et l'euro"],["Penseurs","Macro","Comportemental","Monnaie et commerce","Europe"]],
 es:["Economía y grandes ideas","De Adam Smith al euro: las ideas que todo estudiante de negocios debe conocer",["Grandes economistas","La macro en pocas palabras","Economía conductual","Dinero y comercio","Europa y el euro"],["Pensadores","Macro","Conductual","Dinero y comercio","Europa"]],
 ko:["경제학과 거대한 아이디어","애덤 스미스부터 유로까지: 경영학도라면 알아야 할 아이디어",["위대한 경제학자","거시경제 핵심 정리","행동경제학","화폐와 무역","유럽과 유로"],["사상가","거시","행동","화폐·무역","유럽"]]},
strategy:{
 fr:["Stratégie, management et négociation","Porter, BATNA, lean et études de cas légendaires : l'échauffement du MBA",["Cadres stratégiques","Management et leadership","Négociation","Modèles économiques","Études de cas d'entreprise"],["Cadres","Management","Négociation","Modèles","Cas"]],
 es:["Estrategia, gestión y negociación","Porter, BATNA, lean y casos legendarios: el calentamiento del MBA",["Marcos estratégicos","Gestión y liderazgo","Negociación","Modelos de negocio","Casos corporativos"],["Marcos","Gestión","Negociación","Modelos","Casos"]],
 ko:["전략, 경영, 협상","포터, BATNA, 린, 전설적인 사례 연구, MBA 워밍업",["전략 프레임워크","경영과 리더십","협상","비즈니스 모델","기업 사례"],["프레임워크","경영","협상","모델","사례"]]},
jargon:{
 fr:["Défi du jargon business","Acronymes, buzzwords et faux amis : survivrez-vous à une réunion en anglais ?",["Acronymes","Langue de bois d'entreprise","Buzzwords startup et marketing","Faux amis et anglais des affaires","Livres et citations célèbres"],["Acronymes","Langue de bois","Buzzwords","Faux amis","Livres et citations"]],
 es:["Reto de la jerga empresarial","Siglas, palabras de moda y falsos amigos: ¿sobrevivirás a una reunión en inglés?",["Siglas","Jerga corporativa","Palabras de moda de startups y marketing","Falsos amigos e inglés de negocios","Libros y citas famosas"],["Siglas","Jerga corporativa","Palabras de moda","Falsos amigos","Libros y citas"]],
 ko:["비즈니스 용어 챌린지","약어, 유행어, 가짜 친구: 영어 회의에서 살아남을 수 있나요?",["약어","회사 말투","스타트업·마케팅 유행어","가짜 친구와 비즈니스 영어","책과 명언"],["약어","회사 말투","유행어","가짜 친구","책·명언"]]},
bigtech:{
 fr:["Big Tech, IA et divertissement","Géants de la tech, IA, jeux vidéo et divertissement : qui a construit le monde moderne ?",["Les géants de la tech","Les produits qui ont tout changé","La révolution de l'IA","Les dirigeants de la tech","Business du divertissement et du jeu vidéo"],["Géants","Produits","IA","Dirigeants","Divertissement"]],
 es:["Big Tech, IA y entretenimiento","Gigantes tecnológicos, IA, videojuegos y entretenimiento: ¿quién construyó el mundo moderno?",["Los gigantes tecnológicos","Productos que lo cambiaron todo","La revolución de la IA","Líderes tecnológicos","Negocio del entretenimiento y los videojuegos"],["Gigantes","Productos","IA","Líderes","Entretenimiento"]],
 ko:["빅테크, AI, 엔터테인먼트","테크 거인, AI, 게임, 엔터테인먼트: 누가 현대 세계를 만들었을까?",["테크 거인","모든 것을 바꾼 제품","AI 혁명","테크 리더","엔터테인먼트와 게임 산업"],["거인","제품","AI","리더","엔터"]]},
worldtour:{
 fr:["Tour du monde : drapeaux, capitales et records","Drapeaux, capitales qui piègent tout le monde, records mondiaux et monuments : connaissez-vous vraiment la planète ?",["Capitales qui piègent tout le monde","Drapeaux : les anecdotes","Records du monde","Dans quel pays ?"],["Capitales","Drapeaux","Records","Quel pays ?"]],
 es:["Vuelta al mundo: banderas, capitales y récords","Banderas, capitales que engañan a todos, récords mundiales y monumentos: ¿conoces de verdad el planeta?",["Capitales que engañan a todos","Curiosidades de banderas","Récords mundiales","¿En qué país está?"],["Capitales","Banderas","Récords","¿Qué país?"]],
 ko:["월드 투어: 국기, 수도, 기록","국기, 모두가 헷갈리는 수도, 세계 기록, 명소: 지구를 얼마나 알고 있나요?",["모두가 헷갈리는 수도","국기 상식","세계 기록","어느 나라일까?"],["수도","국기","기록","어느 나라?"]]},
emoji:{
 fr:["Devinettes en émojis","Devinez le film, la chanson, le pays ou l'expression à partir de quelques émojis",["Films en émojis","Chansons et artistes","Lieux et plats","Expressions et vie quotidienne"],["Films","Chansons","Lieux et plats","Expressions"]],
 es:["Acertijos con emojis","Adivina la película, la canción, el país o el refrán con unos pocos emojis",["Películas en emojis","Canciones y artistas","Lugares y comidas","Refranes y vida cotidiana"],["Películas","Canciones","Lugares y comidas","Refranes"]],
 ko:["이모지 수수께끼","이모지 몇 개로 영화, 노래, 나라, 속담 맞히기",["이모지로 보는 영화","노래와 가수","장소와 음식","속담과 일상"],["영화","노래","장소·음식","속담"]]},
internet:{
 fr:["Culture internet et TikTok","Applis, mèmes, moments viraux et argot : êtes-vous accro à internet ?",["Applis et plateformes","Mèmes et moments viraux","Créateurs et records","L'argot décodé"],["Applis","Mèmes","Créateurs","Argot"]],
 es:["Cultura de internet y TikTok","Apps, memes, momentos virales y jerga: ¿vives conectado a internet?",["Apps y plataformas","Memes y momentos virales","Creadores y récords","La jerga descifrada"],["Apps","Memes","Creadores","Jerga"]],
 ko:["인터넷과 틱톡 문화","앱, 밈, 바이럴 순간, 유행어: 당신은 얼마나 온라인에 사나요?",["앱과 플랫폼","밈과 바이럴 순간","크리에이터와 기록","유행어 해독"],["앱","밈","크리에이터","유행어"]]},
hits:{
 fr:["Tubes pop et stars de la musique","La royauté de la pop, qui chante quoi, records et tubes de chaque décennie",["La royauté de la pop","Qui chante ça ?","Records et anecdotes","Les tubes des décennies"],["Royauté","Qui chante ?","Records","Décennies"]],
 es:["Éxitos pop y estrellas de la música","La realeza del pop, quién canta qué, récords y éxitos de cada década",["La realeza del pop","¿Quién lo canta?","Récords y curiosidades","Éxitos por décadas"],["Realeza","¿Quién canta?","Récords","Décadas"]],
 ko:["팝 히트곡과 음악 스타","팝 왕족, 누가 부를까, 기록, 시대별 히트곡",["팝 왕족","누가 부를까?","기록과 재미있는 사실","시대별 히트곡"],["왕족","누가 부를까?","기록","시대별"]]},
screen:{
 fr:["Écrans : séries, Disney et super-héros","Séries Netflix, Disney, Marvel, Harry Potter et cultes : combien en avez-vous vu ?",["Netflix et binge-watching","Disney et Pixar","Marvel et DC","Sorciers, galaxies et cultes"],["Binge","Disney","Super-héros","Cultes"]],
 es:["Pantallas: series, Disney y superhéroes","Series de Netflix, Disney, Marvel, Harry Potter y clásicos de culto: ¿cuántas has visto?",["Netflix y maratones de series","Disney y Pixar","Marvel y DC","Magos, galaxias y series de culto"],["Maratón","Disney","Superhéroes","Culto"]],
 ko:["스크린 타임: 정주행, 디즈니, 히어로","넷플릭스 히트작, 디즈니, 마블, 해리 포터, 컬트 명작: 얼마나 봤나요?",["넷플릭스와 정주행","디즈니와 픽사","마블과 DC","마법사, 은하, 컬트 히트작"],["정주행","디즈니","슈퍼히어로","컬트"]]},
sports:{
 fr:["Légendes du sport et grands moments","Football, Coupe du monde, JO, NBA, tennis et F1 : quel fan êtes-vous ?",["Les stars du football","Coupe du monde et JO","Basket, tennis et F1","Records et rivalités"],["Football","Grands événements","Autres sports","Records"]],
 es:["Leyendas del deporte y grandes momentos","Fútbol, Mundial, Juegos Olímpicos, NBA, tenis y F1: ¿qué tan fan eres?",["Estrellas del fútbol","Mundial y Juegos Olímpicos","Baloncesto, tenis y F1","Récords y rivalidades"],["Fútbol","Grandes eventos","Otros deportes","Récords"]],
 ko:["스포츠 전설과 명장면","축구 스타, 월드컵, 올림픽, NBA, 테니스, F1: 얼마나 열렬한 팬인가요?",["축구 스타","월드컵과 올림픽","농구, 테니스, F1","기록과 라이벌전"],["축구","대형 이벤트","다른 스포츠","기록"]]},
gamer:{
 fr:["Défi gamer et anime","Mario, Pokémon, Minecraft, Fortnite et légendes de l'anime : êtes-vous un vrai gamer ?",["Nintendo et Pokémon","Les hits du jeu vidéo moderne","Légendes de l'anime","Consoles et histoire du jeu vidéo"],["Nintendo","Jeux modernes","Anime","Histoire"]],
 es:["Reto gamer y anime","Mario, Pokémon, Minecraft, Fortnite y leyendas del anime: ¿eres un gamer de verdad?",["Nintendo y Pokémon","Éxitos de los videojuegos actuales","Leyendas del anime","Consolas e historia de los videojuegos"],["Nintendo","Juegos actuales","Anime","Historia"]],
 ko:["게이머와 애니 챌린지","마리오, 포켓몬, 마인크래프트, 포트나이트, 애니 전설: 진짜 게이머인가요?",["닌텐도와 포켓몬","요즘 인기 게임","애니 전설","콘솔과 게임 역사"],["닌텐도","요즘 게임","애니","역사"]]},
kids:{
 fr:["Êtes-vous plus malin qu'un CM2 ?","Les bases de l'école que les adultes ratent souvent : battrez-vous un élève de 10 ans ?",["Sciences et espace","Nature et corps humain","Maths et mots","Histoire et monde"],["Sciences","Nature","Maths et mots","Histoire"]],
 es:["¿Eres más listo que un niño de 10 años?","Lo básico del colegio que los adultos suelen fallar: ¿superarás a un niño de quinto de primaria?",["Ciencia y espacio","Naturaleza y cuerpo humano","Matemáticas y palabras","Historia y mundo"],["Ciencia","Naturaleza","Mates y palabras","Historia"]],
 ko:["초등학교 5학년보다 똑똑한가요?","어른들이 자주 틀리는 학교 기초 상식: 5학년을 이길 수 있나요?",["과학과 우주","자연과 인체","수학과 단어","역사와 세계"],["과학","자연","수학·단어","역사"]]},
myths:{
 fr:["Idées reçues et faits incroyables","Ce que tout le monde croit à tort, et des faits vrais qui semblent faux",["Mythes sur le corps et le cerveau","Mythes sur les animaux","Mythes d'histoire et de cinéma","Des faits vrais qui semblent faux"],["Corps et cerveau","Animaux","Histoire et cinéma","Ça paraît faux"]],
 es:["Mitos y datos alucinantes","Lo que todo el mundo cree y es falso, y datos ciertos que parecen mentira",["Mitos del cuerpo y el cerebro","Mitos de animales","Mitos de historia y cine","Datos ciertos que parecen falsos"],["Cuerpo y cerebro","Animales","Historia y cine","Parece falso"]],
 ko:["속설과 놀라운 사실","모두가 믿지만 틀린 이야기, 가짜 같은 진짜 사실",["몸과 뇌에 관한 속설","동물에 관한 속설","역사와 영화에 관한 속설","가짜 같은 진짜 사실"],["몸과 뇌","동물","역사·영화","가짜 같음"]]},
countryclues:{
 fr:["Devinez le pays en 3 indices","Trois indices, un pays : en combien de temps le trouvez-vous ?",["Europe","Asie et Océanie","Les Amériques","Afrique et Moyen-Orient"],["Europe","Asie et Océanie","Amériques","Afrique et Moyen-Orient"]],
 es:["Adivina el país con 3 pistas","Tres pistas, un país: ¿cuánto tardas en adivinarlo?",["Europa","Asia y Oceanía","Las Américas","África y Oriente Medio"],["Europa","Asia y Oceanía","Américas","África y Oriente Medio"]],
 ko:["힌트 3개로 나라 맞히기","힌트 셋, 나라 하나: 얼마나 빨리 맞힐 수 있나요?",["유럽","아시아와 오세아니아","아메리카","아프리카와 중동"],["유럽","아시아·오세아니아","아메리카","아프리카·중동"]]},
oddemoji:{
 fr:["L'intrus en émojis","Repérez le faux jumeau en 5 secondes : quelle est la finesse de votre regard ?",["Une ligne de 6","Une ligne de 8","Une ligne de 10","Que vient-il ensuite ?"],["6 émojis","8 émojis","10 émojis","Suites logiques"]],
 es:["El emoji intruso","Encuentra el gemelo distinto en 5 segundos: ¿qué tan fino es tu ojo?",["Una fila de 6","Una fila de 8","Una fila de 10","¿Qué viene después?"],["6 emojis","8 emojis","10 emojis","Patrones"]],
 ko:["다른 이모지 찾기","5초 안에 닮은꼴 찾기: 눈이 얼마나 날카로운가요?",["6개 줄","8개 줄","10개 줄","다음에 올 것은?"],["이모지 6개","이모지 8개","이모지 10개","패턴"]]},
braintraps:{
 fr:["Pièges pour le cerveau","Pièges de couleurs, questions pièges et devinettes : votre cerveau va-t-il tomber dedans ?",["Pièges de couleurs","Questions pièges","Nombres et logique","Devinettes"],["Pièges de couleurs","Questions pièges","Logique","Devinettes"]],
 es:["Trampas para el cerebro","Trampas de colores, preguntas trampa y acertijos: ¿caerá tu cerebro?",["Trampas de color","Preguntas trampa","Números y lógica","Acertijos"],["Trampas de color","Trampas","Lógica","Acertijos"]],
 ko:["뇌 함정","색깔 함정, 함정 문제, 수수께끼: 당신의 뇌는 속을까요?",["색깔 함정","함정 문제","숫자와 논리","수수께끼"],["색깔 함정","함정","논리","수수께끼"]]},
kwave:{
 fr:["Quiz Vague coréenne : K-pop et K-drama","Idoles, tubes, séries, films et fandoms : que savez-vous de la vague coréenne ?",["Groupes de K-pop","Tubes et records","K-dramas et cinéma","Hallyu et culture des fans"],["Groupes","Tubes","Séries et films","Hallyu"]],
 es:["Quiz Ola coreana: K-pop y K-drama","Ídolos, éxitos, series, películas y fandoms: ¿cuánto sabes de la ola coreana?",["Grupos de K-pop","Éxitos y récords","K-dramas y cine","Hallyu y cultura fan"],["Grupos","Éxitos","Series y cine","Hallyu"]],
 ko:["한류 퀴즈: K-팝과 K-드라마","아이돌, 히트곡, 드라마, 영화, 팬덤: 한류를 얼마나 알고 있나요?",["K-팝 그룹","히트곡과 기록","K-드라마와 영화","한류와 팬덤 문화"],["그룹","히트곡","드라마·영화","한류"]]},
structure:{
 en:["Sociology · Social structure, theme 1","How is French society structured today? Marx, Weber, Bourdieu, changes in employment and the middle-class debate",["Marx and social classes","Weber and the three orders","Social space, capitals and PCS","Changes in the occupational structure","Middle-classization and class theory"],["Marx","Weber","Social space","Changes","Middle class"]],
 es:["Sociología · Estructura social, tema 1","¿Cómo está estructurada la sociedad francesa actual? Marx, Weber, Bourdieu, cambios del empleo y debate sobre la clase media",["Marx y las clases sociales","Weber y los tres órdenes","Espacio social, capitales y PCS","Cambios en la estructura profesional","Aburguesamiento medio y teoría de clases"],["Marx","Weber","Espacio social","Cambios","Clase media"]],
 ko:["사회학 · 사회 구조, 1주제","오늘날 프랑스 사회는 어떻게 구조화되어 있는가? 마르크스, 베버, 부르디외, 고용의 변화와 중산층 논쟁",["마르크스와 사회 계급","베버와 세 가지 질서","사회 공간, 자본, PCS","직업 구조의 변화","중산층화와 계급 이론"],["마르크스","베버","사회 공간","변화","중산층"]]},
korea:{
 fr:["Corée 101 : cuisine, langue et culture","Du kimchi au hangeul, de Chuseok à Séoul : que savez-vous de la Corée ?",["Cuisine coréenne","Hangeul et langue","Traditions et savoir-vivre","Lieux et histoire","La vie à Séoul et les tendances"],["Cuisine","Hangeul","Traditions","Histoire","Séoul"]],
 es:["Corea 101: comida, idioma y cultura","Del kimchi al hangul, de Chuseok a Seúl: ¿cuánto sabes de Corea?",["Comida coreana","Hangul e idioma","Tradiciones y etiqueta","Lugares e historia","Vida en Seúl y tendencias"],["Comida","Hangul","Tradiciones","Historia","Seúl"]],
 ko:["코리아 101: 음식, 언어, 문화","김치부터 한글, 추석, 서울까지: 한국을 얼마나 알고 있나요?",["한국 음식","한글과 한국어","전통과 예절","장소와 역사","서울 생활과 트렌드"],["음식","한글","전통","역사","서울"]]},
foodtravel:{
 fr:["Défi cuisine et voyages","D'où viennent les plats, les spécialités du monde, les monuments et les bons réflexes de voyageur",["D'où ça vient ?","Manger autour du monde","Monuments et merveilles","Le b.a.-ba du voyageur"],["Origines","Plats","Monuments","Voyage"]],
 es:["Reto de comida y viajes","De dónde vienen los platos, especialidades del mundo, monumentos y trucos de viajero",["¿De dónde viene?","Comer por el mundo","Monumentos y maravillas","Lo básico del viajero"],["Orígenes","Platos","Monumentos","Viajes"]],
 ko:["음식과 여행 챌린지","음식의 고향, 세계의 요리, 명소, 여행 상식",["어디서 왔을까?","세계를 먹다","명소와 불가사의","여행 상식"],["유래","요리","명소","여행"]]}
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
