// Built-in bank: culture générale (French). Hand-written questions + questions generated from datasets below.
// Generation is deterministic (seeded) so every device builds the exact same Q/TQ arrays, which multiplayer decks index into.
window.BANK_CULTURE=(function(){
const SESS={1:"Géographie",2:"Histoire",3:"Sciences",4:"Nature & animaux",5:"Arts & littérature",6:"Cinéma & musique",7:"Sport",8:"Langues & divers"};
const TAGS={1:"Géo",2:"Histoire",3:"Sciences",4:"Nature",5:"Arts",6:"Ciné & musique",7:"Sport",8:"Divers"};

// ---------- datasets ----------
// pays | "de" form | capitale | zone | titre Wikipédia (en) du drapeau | variantes acceptées pour la capitale
const COUNTRIES=`France|de la France|Paris|EU|France
Allemagne|de l'Allemagne|Berlin|EU|Germany
Italie|de l'Italie|Rome|EU|Italy
Espagne|de l'Espagne|Madrid|EU|Spain
Portugal|du Portugal|Lisbonne|EU|Portugal|Lisboa
Royaume-Uni|du Royaume-Uni|Londres|EU|the_United_Kingdom|London
Irlande|de l'Irlande|Dublin|EU|Ireland
Belgique|de la Belgique|Bruxelles|EU|Belgium
Pays-Bas|des Pays-Bas|Amsterdam|EU|the_Netherlands
Suisse|de la Suisse|Berne|EU|Switzerland|Bern
Autriche|de l'Autriche|Vienne|EU|Austria|Wien
Pologne|de la Pologne|Varsovie|EU|Poland
Tchéquie|de la Tchéquie|Prague|EU|the_Czech_Republic|Praha
Slovaquie|de la Slovaquie|Bratislava|EU|Slovakia
Hongrie|de la Hongrie|Budapest|EU|Hungary
Roumanie|de la Roumanie|Bucarest|EU|Romania|Bucuresti
Bulgarie|de la Bulgarie|Sofia|EU|Bulgaria
Grèce|de la Grèce|Athènes|EU|Greece|Athenes
Croatie|de la Croatie|Zagreb|EU|Croatia
Serbie|de la Serbie|Belgrade|EU|Serbia|Beograd
Slovénie|de la Slovénie|Ljubljana|EU|Slovenia
Bosnie-Herzégovine|de la Bosnie-Herzégovine|Sarajevo|EU|Bosnia_and_Herzegovina
Albanie|de l'Albanie|Tirana|EU|Albania
Macédoine du Nord|de la Macédoine du Nord|Skopje|EU|North_Macedonia
Monténégro|du Monténégro|Podgorica|EU|Montenegro
Danemark|du Danemark|Copenhague|EU|Denmark|Copenhagen;Kobenhavn
Suède|de la Suède|Stockholm|EU|Sweden
Norvège|de la Norvège|Oslo|EU|Norway
Finlande|de la Finlande|Helsinki|EU|Finland
Islande|de l'Islande|Reykjavik|EU|Iceland
Estonie|de l'Estonie|Tallinn|EU|Estonia
Lettonie|de la Lettonie|Riga|EU|Latvia
Lituanie|de la Lituanie|Vilnius|EU|Lithuania
Ukraine|de l'Ukraine|Kiev|EU|Ukraine|Kyiv;Kiyv
Biélorussie|de la Biélorussie|Minsk|EU|Belarus
Moldavie|de la Moldavie|Chisinau|EU|Moldova
Russie|de la Russie|Moscou|EU|Russia|Moskva
Malte|de Malte|La Valette|EU|Malta|Valletta;Valette
Chypre|de Chypre|Nicosie|EU|Cyprus|Nicosia
Turquie|de la Turquie|Ankara|AS|Turkey
Chine|de la Chine|Pékin|AS|China|Beijing;Pekin
Japon|du Japon|Tokyo|AS|Japan
Corée du Sud|de la Corée du Sud|Séoul|AS|South_Korea|Seoul
Corée du Nord|de la Corée du Nord|Pyongyang|AS|North_Korea
Inde|de l'Inde|New Delhi|AS|India|Delhi;New Dehli
Pakistan|du Pakistan|Islamabad|AS|Pakistan
Bangladesh|du Bangladesh|Dacca|AS|Bangladesh|Dhaka
Népal|du Népal|Katmandou|AS|Nepal|Kathmandu
Thaïlande|de la Thaïlande|Bangkok|AS|Thailand
Viêt Nam|du Viêt Nam|Hanoï|AS|Vietnam|Hanoi
Cambodge|du Cambodge|Phnom Penh|AS|Cambodia
Laos|du Laos|Vientiane|AS|Laos
Birmanie|de la Birmanie|Naypyidaw|AS|Myanmar|Naypyitaw;Nay Pyi Taw
Malaisie|de la Malaisie|Kuala Lumpur|AS|Malaysia
Philippines|des Philippines|Manille|AS|the_Philippines|Manila
Mongolie|de la Mongolie|Oulan-Bator|AS|Mongolia|Ulaanbaatar;Oulan Bator
Kazakhstan|du Kazakhstan|Astana|AS|Kazakhstan
Ouzbékistan|de l'Ouzbékistan|Tachkent|AS|Uzbekistan|Tashkent
Afghanistan|de l'Afghanistan|Kaboul|AS|Afghanistan|Kabul
Iran|de l'Iran|Téhéran|AS|Iran|Tehran
Irak|de l'Irak|Bagdad|AS|Iraq|Baghdad
Syrie|de la Syrie|Damas|AS|Syria
Liban|du Liban|Beyrouth|AS|Lebanon|Beirut
Jordanie|de la Jordanie|Amman|AS|Jordan
Arabie saoudite|de l'Arabie saoudite|Riyad|AS|Saudi_Arabia|Riyadh
Émirats arabes unis|des Émirats arabes unis|Abou Dabi|AS|the_United_Arab_Emirates|Abu Dhabi;Abou Dhabi
Qatar|du Qatar|Doha|AS|Qatar
Oman|d'Oman|Mascate|AS|Oman|Muscat
Yémen|du Yémen|Sanaa|AS|Yemen
Géorgie|de la Géorgie|Tbilissi|AS|Georgia_(country)|Tbilisi
Arménie|de l'Arménie|Erevan|AS|Armenia|Yerevan
Azerbaïdjan|de l'Azerbaïdjan|Bakou|AS|Azerbaijan|Baku
Maroc|du Maroc|Rabat|AF|Morocco
Algérie|de l'Algérie|Alger|AF|Algeria
Tunisie|de la Tunisie|Tunis|AF|Tunisia
Libye|de la Libye|Tripoli|AF|Libya
Égypte|de l'Égypte|Le Caire|AF|Egypt|Caire;Cairo
Sénégal|du Sénégal|Dakar|AF|Senegal
Mali|du Mali|Bamako|AF|Mali
Niger|du Niger|Niamey|AF|Niger
Burkina Faso|du Burkina Faso|Ouagadougou|AF|Burkina_Faso
Côte d'Ivoire|de la Côte d'Ivoire|Yamoussoukro|AF|Ivory_Coast
Ghana|du Ghana|Accra|AF|Ghana
Nigeria|du Nigeria|Abuja|AF|Nigeria
Cameroun|du Cameroun|Yaoundé|AF|Cameroon|Yaounde
Guinée|de la Guinée|Conakry|AF|Guinea
Mauritanie|de la Mauritanie|Nouakchott|AF|Mauritania
Tchad|du Tchad|N'Djaména|AF|Chad|Ndjamena;N Djamena
Soudan|du Soudan|Khartoum|AF|Sudan
Éthiopie|de l'Éthiopie|Addis-Abeba|AF|Ethiopia|Addis Ababa;Addis Abeba
Kenya|du Kenya|Nairobi|AF|Kenya
Tanzanie|de la Tanzanie|Dodoma|AF|Tanzania
Ouganda|de l'Ouganda|Kampala|AF|Uganda
Rwanda|du Rwanda|Kigali|AF|Rwanda
RD Congo|de la république démocratique du Congo|Kinshasa|AF|the_Democratic_Republic_of_the_Congo
Congo|de la république du Congo|Brazzaville|AF|the_Republic_of_the_Congo
Gabon|du Gabon|Libreville|AF|Gabon
Angola|de l'Angola|Luanda|AF|Angola
Zambie|de la Zambie|Lusaka|AF|Zambia
Zimbabwe|du Zimbabwe|Harare|AF|Zimbabwe
Mozambique|du Mozambique|Maputo|AF|Mozambique
Madagascar|de Madagascar|Antananarivo|AF|Madagascar|Tananarive
Namibie|de la Namibie|Windhoek|AF|Namibia
Botswana|du Botswana|Gaborone|AF|Botswana
Bénin|du Bénin|Porto-Novo|AF|Benin
Togo|du Togo|Lomé|AF|Togo|Lome
Somalie|de la Somalie|Mogadiscio|AF|Somalia|Mogadishu
États-Unis|des États-Unis|Washington|AN|the_United_States|Washington DC
Canada|du Canada|Ottawa|AN|Canada
Mexique|du Mexique|Mexico|AN|Mexico|Mexico City
Cuba|de Cuba|La Havane|AN|Cuba|Havane;Havana
Haïti|d'Haïti|Port-au-Prince|AN|Haiti
République dominicaine|de la République dominicaine|Saint-Domingue|AN|the_Dominican_Republic|Santo Domingo
Jamaïque|de la Jamaïque|Kingston|AN|Jamaica
Honduras|du Honduras|Tegucigalpa|AN|Honduras
Nicaragua|du Nicaragua|Managua|AN|Nicaragua
Costa Rica|du Costa Rica|San José|AN|Costa_Rica|San Jose
Salvador|du Salvador|San Salvador|AN|El_Salvador
Brésil|du Brésil|Brasilia|SA|Brazil|Brasília
Argentine|de l'Argentine|Buenos Aires|SA|Argentina
Chili|du Chili|Santiago|SA|Chile|Santiago du Chili;Santiago de Chile
Pérou|du Pérou|Lima|SA|Peru
Colombie|de la Colombie|Bogota|SA|Colombia|Bogotá
Venezuela|du Venezuela|Caracas|SA|Venezuela
Équateur|de l'Équateur|Quito|SA|Ecuador
Bolivie|de la Bolivie|Sucre|SA|Bolivia|La Paz
Paraguay|du Paraguay|Asuncion|SA|Paraguay|Asunción
Uruguay|de l'Uruguay|Montevideo|SA|Uruguay
Australie|de l'Australie|Canberra|OC|Australia
Nouvelle-Zélande|de la Nouvelle-Zélande|Wellington|OC|New_Zealand
Papouasie-Nouvelle-Guinée|de la Papouasie-Nouvelle-Guinée|Port Moresby|OC|Papua_New_Guinea
Fidji|des Fidji|Suva|OC|Fiji`;
const ZONE={EU:"Europe",AS:"Asie",AF:"Afrique",AN:"Amérique du Nord et centrale",SA:"Amérique du Sud",OC:"Océanie"};
const CAP_NOTE={"Côte d'Ivoire":"Yamoussoukro est la capitale officielle, Abidjan la plus grande ville.","Bolivie":"Sucre est la capitale constitutionnelle ; le gouvernement siège à La Paz.","Bénin":"Porto-Novo est la capitale officielle ; le gouvernement siège surtout à Cotonou.","Tanzanie":"Dodoma est la capitale officielle ; Dar es Salaam est la plus grande ville.","Nigeria":"Abuja a remplacé Lagos comme capitale en 1991.","Brésil":"Brasilia, ville nouvelle, a remplacé Rio de Janeiro en 1960.","Australie":"Canberra a été construite pour départager Sydney et Melbourne.","Turquie":"Ankara, pas Istanbul, depuis 1923.","Suisse":"Berne est la « ville fédérale » ; Zurich est la plus grande ville.","Canada":"Ottawa, pas Toronto ni Montréal.","Birmanie":"Naypyidaw a remplacé Rangoun en 2005.","Kazakhstan":"Astana a remplacé Almaty en 1997.","Pakistan":"Islamabad, pas Karachi.","Maroc":"Rabat, pas Casablanca ni Marrakech.","Nouvelle-Zélande":"Wellington, pas Auckland.","États-Unis":"Washington D.C., pas New York.","Viêt Nam":"Hanoï, au nord ; Hô Chi Minh-Ville est au sud."};

// devise : pays ("de" form) | monnaie
const CURRENCIES=`du Japon|Yen
du Royaume-Uni|Livre sterling
des États-Unis|Dollar américain
de la Suisse|Franc suisse
de la Chine|Yuan (renminbi)
de l'Inde|Roupie indienne
de la Russie|Rouble
du Brésil|Réal
du Mexique|Peso mexicain
de la Corée du Sud|Won
de la Suède|Couronne suédoise
de la Pologne|Złoty
de la Turquie|Livre turque
de l'Afrique du Sud|Rand
de la Thaïlande|Baht
d'Israël|Shekel
du Maroc|Dirham
de la Hongrie|Forint
du Viêt Nam|Dong
de l'Allemagne|Euro
du Danemark|Couronne danoise
du Canada|Dollar canadien
de l'Australie|Dollar australien
de l'Égypte|Livre égyptienne
de l'Arabie saoudite|Riyal
de l'Argentine|Peso argentin
de l'Ukraine|Hryvnia
de la Tchéquie|Couronne tchèque
du Sénégal|Franc CFA
de l'Indonésie|Roupie indonésienne`;

// élément | symbole | numéro atomique
const ELEMENTS=`Hydrogène|H|1
Hélium|He|2
Lithium|Li|3
Béryllium|Be|4
Bore|B|5
Carbone|C|6
Azote|N|7
Oxygène|O|8
Fluor|F|9
Néon|Ne|10
Sodium|Na|11
Magnésium|Mg|12
Aluminium|Al|13
Silicium|Si|14
Phosphore|P|15
Soufre|S|16
Chlore|Cl|17
Argon|Ar|18
Potassium|K|19
Calcium|Ca|20
Titane|Ti|22
Chrome|Cr|24
Manganèse|Mn|25
Fer|Fe|26
Cobalt|Co|27
Nickel|Ni|28
Cuivre|Cu|29
Zinc|Zn|30
Arsenic|As|33
Brome|Br|35
Krypton|Kr|36
Argent|Ag|47
Étain|Sn|50
Iode|I|53
Xénon|Xe|54
Baryum|Ba|56
Tungstène|W|74
Platine|Pt|78
Or|Au|79
Mercure|Hg|80
Plomb|Pb|82
Radium|Ra|88
Uranium|U|92
Plutonium|Pu|94`;

// œuvre | auteur | verbe (écrit/créé) | variantes acceptées
const BOOKS=`Les Misérables|Victor Hugo|écrit|Hugo
Notre-Dame de Paris|Victor Hugo|écrit|Hugo
Le Rouge et le Noir|Stendhal|écrit|Henri Beyle
Madame Bovary|Gustave Flaubert|écrit|Flaubert
Germinal|Émile Zola|écrit|Zola
L'Assommoir|Émile Zola|écrit|Zola
Le Père Goriot|Honoré de Balzac|écrit|Balzac
Les Trois Mousquetaires|Alexandre Dumas|écrit|Dumas
Le Comte de Monte-Cristo|Alexandre Dumas|écrit|Dumas
Vingt Mille Lieues sous les mers|Jules Verne|écrit|Verne
Le Tour du monde en quatre-vingts jours|Jules Verne|écrit|Verne
Le Petit Prince|Antoine de Saint-Exupéry|écrit|Saint-Exupéry;Saint Exupery
L'Étranger|Albert Camus|écrit|Camus
La Peste|Albert Camus|écrit|Camus
Candide|Voltaire|écrit|
Les Fleurs du mal|Charles Baudelaire|écrit|Baudelaire
À la recherche du temps perdu|Marcel Proust|écrit|Proust
Le Deuxième Sexe|Simone de Beauvoir|écrit|Beauvoir
Huis clos|Jean-Paul Sartre|écrit|Sartre
La Nausée|Jean-Paul Sartre|écrit|Sartre
Les Liaisons dangereuses|Choderlos de Laclos|écrit|Laclos
Bel-Ami|Guy de Maupassant|écrit|Maupassant
Cyrano de Bergerac|Edmond Rostand|écrit|Rostand
Le Misanthrope|Molière|écrit|Jean-Baptiste Poquelin
Tartuffe|Molière|écrit|Jean-Baptiste Poquelin
L'Avare|Molière|écrit|Jean-Baptiste Poquelin
Le Cid|Pierre Corneille|écrit|Corneille
Phèdre|Jean Racine|écrit|Racine
Gargantua|François Rabelais|écrit|Rabelais
Les Essais|Michel de Montaigne|écrit|Montaigne
Les Fables (Le Corbeau et le Renard…)|Jean de La Fontaine|écrit|La Fontaine
Le Seigneur des anneaux|J. R. R. Tolkien|écrit|Tolkien
Le Hobbit|J. R. R. Tolkien|écrit|Tolkien
Harry Potter|J. K. Rowling|écrit|Rowling
1984|George Orwell|écrit|Orwell
La Ferme des animaux|George Orwell|écrit|Orwell
Le Meilleur des mondes|Aldous Huxley|écrit|Huxley
Roméo et Juliette|William Shakespeare|écrit|Shakespeare
Hamlet|William Shakespeare|écrit|Shakespeare
Don Quichotte|Miguel de Cervantes|écrit|Cervantes;Cervantès
Guerre et Paix|Léon Tolstoï|écrit|Tolstoi;Tolstoy
Anna Karénine|Léon Tolstoï|écrit|Tolstoi;Tolstoy
Crime et Châtiment|Fiodor Dostoïevski|écrit|Dostoievski;Dostoevsky
Cent ans de solitude|Gabriel García Márquez|écrit|Garcia Marquez;Marquez
Orgueil et Préjugés|Jane Austen|écrit|Austen
Les Hauts de Hurlevent|Emily Brontë|écrit|Bronte;Emily Bronte
Jane Eyre|Charlotte Brontë|écrit|Charlotte Bronte
Frankenstein|Mary Shelley|écrit|Shelley
Dracula|Bram Stoker|écrit|Stoker
Moby Dick|Herman Melville|écrit|Melville
Les Aventures de Tom Sawyer|Mark Twain|écrit|Twain
Gatsby le Magnifique|F. Scott Fitzgerald|écrit|Fitzgerald
Le Vieil Homme et la Mer|Ernest Hemingway|écrit|Hemingway
Des souris et des hommes|John Steinbeck|écrit|Steinbeck
L'Attrape-cœurs|J. D. Salinger|écrit|Salinger
Ne tirez pas sur l'oiseau moqueur|Harper Lee|écrit|Lee
La Métamorphose|Franz Kafka|écrit|Kafka
Le Procès|Franz Kafka|écrit|Kafka
La Divine Comédie|Dante|écrit|Dante Alighieri
L'Odyssée|Homère|écrit|Homere;Homer
Le Nom de la rose|Umberto Eco|écrit|Eco
Le Parfum|Patrick Süskind|écrit|Suskind;Süskind
L'Alchimiste|Paulo Coelho|écrit|Coelho
Alice au pays des merveilles|Lewis Carroll|écrit|Carroll
Oliver Twist|Charles Dickens|écrit|Dickens
Le Prince|Machiavel|écrit|Machiavelli;Nicolas Machiavel
Faust|Goethe|écrit|Johann Wolfgang von Goethe
Sherlock Holmes|Arthur Conan Doyle|créé|Conan Doyle;Doyle
Le Crime de l'Orient-Express|Agatha Christie|écrit|Christie
Da Vinci Code|Dan Brown|écrit|Brown
Bonjour tristesse|Françoise Sagan|écrit|Sagan
La Princesse de Clèves|Madame de La Fayette|écrit|La Fayette;Lafayette
Le Grand Meaulnes|Alain-Fournier|écrit|Alain Fournier
Voyage au bout de la nuit|Louis-Ferdinand Céline|écrit|Celine
Les Fourmis|Bernard Werber|écrit|Werber
Discours de la méthode|René Descartes|écrit|Descartes
Du contrat social|Jean-Jacques Rousseau|écrit|Rousseau
Ainsi parlait Zarathoustra|Friedrich Nietzsche|écrit|Nietzsche
Le Capital|Karl Marx|écrit|Marx
L'Art de la guerre|Sun Tzu|écrit|Sunzi
Charlie et la Chocolaterie|Roald Dahl|écrit|Dahl
Hunger Games|Suzanne Collins|écrit|Collins
Le Trône de fer (Game of Thrones)|George R. R. Martin|écrit|Martin;George Martin
Tintin|Hergé|créé|Herge;Georges Remi
Astérix|René Goscinny et Albert Uderzo|créé|Goscinny;Uderzo;Goscinny et Uderzo
Lucky Luke|Morris|créé|
Gaston Lagaffe|André Franquin|créé|Franquin
Les Schtroumpfs|Peyo|créé|
One Piece|Eiichirō Oda|créé|Oda;Eiichiro Oda
Dragon Ball|Akira Toriyama|créé|Toriyama
Naruto|Masashi Kishimoto|créé|Kishimoto
Le Petit Nicolas|René Goscinny et Jean-Jacques Sempé|écrit|Goscinny;Sempe;Goscinny et Sempe
Les Contes de ma mère l'Oye (Cendrillon, Le Petit Chaperon rouge…)|Charles Perrault|écrit|Perrault
La Petite Sirène|Hans Christian Andersen|écrit|Andersen`;

// tableau | peintre | page Wikipédia (en) | variantes
const PAINTINGS=`La Joconde|Léonard de Vinci|Mona_Lisa|Vinci;Leonard de Vinci;Leonardo da Vinci
La Cène|Léonard de Vinci|The_Last_Supper_(Leonardo)|Vinci;Leonard de Vinci;Leonardo da Vinci
La Nuit étoilée|Vincent van Gogh|The_Starry_Night|Van Gogh
Les Tournesols|Vincent van Gogh|Sunflowers_(Van_Gogh_series)|Van Gogh
Le Cri|Edvard Munch|The_Scream|Munch
La Jeune Fille à la perle|Johannes Vermeer|Girl_with_a_Pearl_Earring|Vermeer
La Laitière|Johannes Vermeer|The_Milkmaid_(Vermeer)|Vermeer
La Naissance de Vénus|Sandro Botticelli|The_Birth_of_Venus|Botticelli
Le Printemps|Sandro Botticelli|Primavera_(Botticelli)|Botticelli
Le Baiser|Gustav Klimt|The_Kiss_(Klimt)|Klimt
Impression, soleil levant|Claude Monet|Impression,_Sunrise|Monet
Le Déjeuner sur l'herbe|Édouard Manet|Le_Déjeuner_sur_l'herbe|Manet
Olympia|Édouard Manet|Olympia_(Manet)|Manet
La Liberté guidant le peuple|Eugène Delacroix|Liberty_Leading_the_People|Delacroix
Le Radeau de La Méduse|Théodore Géricault|The_Raft_of_the_Medusa|Gericault
La Création d'Adam|Michel-Ange|The_Creation_of_Adam|Michelangelo;Michel Ange
L'École d'Athènes|Raphaël|The_School_of_Athens|Raphael
La Ronde de nuit|Rembrandt|The_Night_Watch|
Les Ménines|Diego Velázquez|Las_Meninas|Velazquez
Le Jardin des délices|Jérôme Bosch|The_Garden_of_Earthly_Delights|Bosch
La Grande Vague de Kanagawa|Hokusai|The_Great_Wave_off_Kanagawa|Katsushika Hokusai
Le Voyageur contemplant une mer de nuages|Caspar David Friedrich|Wanderer_above_the_Sea_of_Fog|Friedrich
Bal du moulin de la Galette|Pierre-Auguste Renoir|Bal_du_moulin_de_la_Galette|Renoir
Un dimanche après-midi à l'île de la Grande Jatte|Georges Seurat|A_Sunday_Afternoon_on_the_Island_of_La_Grande_Jatte|Seurat
Les Joueurs de cartes|Paul Cézanne|The_Card_Players|Cezanne
Les Glaneuses|Jean-François Millet|The_Gleaners|Millet
Le Sacre de Napoléon|Jacques-Louis David|The_Coronation_of_Napoleon|David
La Mort de Marat|Jacques-Louis David|The_Death_of_Marat|David
Les Époux Arnolfini|Jan van Eyck|Arnolfini_Portrait|Van Eyck
Le Tres de Mayo|Francisco de Goya|The_Third_of_May_1808|Goya
Saturne dévorant un de ses fils|Francisco de Goya|Saturn_Devouring_His_Son|Goya
Les Nymphéas|Claude Monet|Water_Lilies_(Monet_series)|Monet
La Tour de Babel|Pieter Brueghel l'Ancien|The_Tower_of_Babel_(Bruegel)|Brueghel;Bruegel
La Leçon d'anatomie du docteur Tulp|Rembrandt|The_Anatomy_Lesson_of_Dr._Nicolaes_Tulp|`;

// monument | ville | page Wikipédia (en)
const MONUMENTS=`la tour Eiffel|Paris|Eiffel_Tower
le Colisée|Rome|Colosseum
Big Ben|Londres|Big_Ben
la statue de la Liberté|New York|Statue_of_Liberty
la Sagrada Família|Barcelone|Sagrada_Família
le Taj Mahal|Agra|Taj_Mahal
le Christ Rédempteur|Rio de Janeiro|Christ_the_Redeemer_(statue)
l'Opéra de Sydney|Sydney|Sydney_Opera_House
la porte de Brandebourg|Berlin|Brandenburg_Gate
le Parthénon|Athènes|Parthenon
la cathédrale Saint-Basile|Moscou|Saint_Basil's_Cathedral
le Burj Khalifa|Dubaï|Burj_Khalifa
le Golden Gate Bridge|San Francisco|Golden_Gate_Bridge
la tour penchée|Pise|Leaning_Tower_of_Pisa
l'Alhambra|Grenade|Alhambra
Sainte-Sophie|Istanbul|Hagia_Sophia
les tours Petronas|Kuala Lumpur|Petronas_Towers
l'Atomium|Bruxelles|Atomium
la Cité interdite|Pékin|Forbidden_City
le Tower Bridge|Londres|Tower_Bridge
la basilique Saint-Pierre|Rome|St._Peter's_Basilica`;
// site | pays | page Wikipédia (en)
const SITES=`le Machu Picchu|Pérou|Machu_Picchu
Petra|Jordanie|Petra
Angkor Vat|Cambodge|Angkor_Wat
Chichén Itzá|Mexique|Chichen_Itza
les pyramides de Gizeh|Égypte|Giza_pyramid_complex
la Grande Muraille|Chine|Great_Wall_of_China
Stonehenge|Royaume-Uni|Stonehenge
le Mont-Saint-Michel|France|Mont-Saint-Michel
les moaï de l'île de Pâques|Chili|Moai
Borobudur|Indonésie|Borobudur
le château de Neuschwanstein|Allemagne|Neuschwanstein_Castle
Abou Simbel|Égypte|Abu_Simbel
Uluru|Australie|Uluru
le Kremlin|Russie|Moscow_Kremlin
le Manneken-Pis|Belgique|Manneken_Pis
la Grande Barrière de corail|Australie|Great_Barrier_Reef
le Grand Canyon|États-Unis|Grand_Canyon
les chutes du Niagara|Canada et États-Unis|Niagara_Falls
le temple d'Or (Harmandir Sahib)|Inde|Golden_Temple
le mont Fuji|Japon|Mount_Fuji
Persépolis|Iran|Persepolis
la Baie d'Halong|Viêt Nam|Ha_Long_Bay`;

// événement | année
const EVENTS=`la prise de la Bastille|1789
la chute du mur de Berlin|1989
l'arrivée de Christophe Colomb en Amérique|1492
la bataille de Hastings|1066
le couronnement de Charlemagne comme empereur|800
la bataille de Marignan|1515
les premiers pas de l'homme sur la Lune|1969
le début de la Première Guerre mondiale|1914
l'armistice de la Première Guerre mondiale|1918
le début de la Seconde Guerre mondiale|1939
la fin de la Seconde Guerre mondiale|1945
le débarquement allié en Normandie|1944
les attentats du 11 septembre aux États-Unis|2001
la révolution d'Octobre en Russie|1917
la déclaration d'indépendance des États-Unis|1776
le sacre de Napoléon Ier|1804
la bataille de Waterloo|1815
la prise de Constantinople par les Ottomans|1453
la mort de Jeanne d'Arc|1431
l'abolition définitive de l'esclavage en France|1848
les événements de Mai 68|1968
l'arrivée des pièces et billets en euros|2002
la signature du traité de Rome (naissance de la CEE)|1957
la chute de l'Empire romain d'Occident|476
l'édit de Nantes|1598
l'assassinat de John F. Kennedy|1963
le krach de Wall Street|1929
le naufrage du Titanic|1912
l'élection de Nelson Mandela à la présidence de l'Afrique du Sud|1994
le premier vol motorisé des frères Wright|1903
la Commune de Paris|1871
la loi de séparation des Églises et de l'État en France|1905
l'accès des Françaises au droit de vote|1944
le lancement de Spoutnik, premier satellite artificiel|1957
la catastrophe nucléaire de Tchernobyl|1986
la catastrophe nucléaire de Fukushima|2011
la présentation du premier iPhone|2007
le lancement de Facebook|2004
la création de Google|1998
la Déclaration universelle des droits de l'homme|1948
l'indépendance de l'Inde|1947
l'indépendance de l'Algérie|1962
le référendum britannique sur le Brexit|2016
la réunification de l'Allemagne|1990
la dissolution de l'URSS|1991
la Magna Carta en Angleterre|1215
les 95 thèses de Martin Luther|1517
le début de la guerre de Sécession américaine|1861
les premiers Jeux olympiques modernes|1896
la mort de Louis XIV|1715
l'exécution de Louis XVI|1793
la naissance de la Ve République|1958
le traité de Versailles|1919
l'incendie de Notre-Dame de Paris|2019
la première victoire de la France en Coupe du monde de football|1998
la découverte de la tombe de Toutânkhamon|1922
la révolution de Juillet (les Trois Glorieuses)|1830
la mort de Napoléon à Sainte-Hélène|1821
l'ouverture du tunnel sous la Manche|1994
la crise des missiles de Cuba|1962
la première greffe du cœur|1967
la découverte de la pénicilline par Fleming|1928
le premier Tour de France cycliste|1903
la création de l'ONU|1945
la bataille de Verdun|1916
la nuit de la Saint-Barthélemy|1572
la fin de l'apartheid (abolition des lois)|1991
l'invention du World Wide Web au CERN|1989
la première élection d'Emmanuel Macron|2017
l'élection de Barack Obama|2008`;

// question | réponse | variantes | explication
const DISCOVERIES=`Qui a inventé le téléphone (brevet de 1876) ?|Graham Bell|Bell;Alexander Graham Bell|Alexander Graham Bell dépose le brevet du téléphone en 1876.
Qui a mis au point l'ampoule électrique à incandescence durable (1879) ?|Thomas Edison|Edison|Edison n'a pas tout inventé seul mais a rendu l'ampoule fiable et commerciale.
Qui a découvert la pénicilline ?|Alexander Fleming|Fleming|En 1928, par hasard, dans une boîte de culture contaminée par une moisissure.
Qui a mis au point le premier vaccin contre la rage ?|Louis Pasteur|Pasteur|En 1885, sur le jeune Joseph Meister.
Qui a découvert la radioactivité en 1896 ?|Henri Becquerel|Becquerel|Becquerel partage le Nobel 1903 avec Pierre et Marie Curie.
Qui a découvert le polonium et le radium ?|Marie Curie|Curie;Marie Curie et Pierre Curie;Pierre et Marie Curie|Marie Curie, seule personne à avoir reçu deux Nobel dans deux sciences différentes (physique, chimie).
Qui a formulé la loi de la gravitation universelle ?|Isaac Newton|Newton|Principia, 1687. La pomme est sans doute une légende embellie.
Qui a formulé la théorie de la relativité ?|Albert Einstein|Einstein|Relativité restreinte (1905) puis générale (1915). E = mc².
Qui a proposé la théorie de l'évolution par sélection naturelle ?|Charles Darwin|Darwin|De l'origine des espèces, 1859.
Qui a inventé l'imprimerie à caractères mobiles en Europe ?|Johannes Gutenberg|Gutenberg|Vers 1450, à Mayence. Sa Bible est l'un des premiers livres imprimés.
Qui a inventé le cinématographe ?|Les frères Lumière|Lumiere;Freres Lumiere;Auguste et Louis Lumiere|Première projection publique payante à Paris en 1895.
Qui a inventé la dynamite ?|Alfred Nobel|Nobel|Sa fortune a financé les prix Nobel.
Qui a proposé un modèle héliocentrique (la Terre tourne autour du Soleil) au XVIe siècle ?|Nicolas Copernic|Copernic;Copernicus|Publié en 1543, l'année de sa mort.
Qui a découvert les lois de l'hérédité en étudiant les petits pois ?|Gregor Mendel|Mendel|Moine autrichien, père de la génétique.
Qui a inventé le World Wide Web ?|Tim Berners-Lee|Berners Lee;Berners-Lee|En 1989 au CERN, près de Genève.
Qui a inventé le paratonnerre ?|Benjamin Franklin|Franklin|Après ses expériences avec un cerf-volant sous l'orage.
Qui a inventé l'écriture tactile pour les aveugles ?|Louis Braille|Braille|Il l'invente adolescent, vers 1825.
Qui a perfectionné la machine à vapeur au XVIIIe siècle ?|James Watt|Watt|L'unité de puissance, le watt, porte son nom.
Qui a créé le tableau périodique des éléments ?|Dmitri Mendeleïev|Mendeleiev;Mendeleev|En 1869, en laissant des cases vides pour des éléments encore inconnus.
Qui a mis au point la première calculatrice mécanique, la Pascaline ?|Blaise Pascal|Pascal|En 1642, à 19 ans, pour aider son père collecteur d'impôts.
Qui a réalisé la première photographie connue ?|Nicéphore Niépce|Niepce|Point de vue du Gras, vers 1827.
Qui a inventé le stéthoscope ?|René Laennec|Laennec|En 1816, à Paris.
Qui a fondé la psychanalyse ?|Sigmund Freud|Freud|Médecin viennois (1856-1939).
Qui a découvert les quatre grandes lunes de Jupiter en 1610 ?|Galilée|Galileo;Galileo Galilei|Avec une lunette qu'il avait lui-même améliorée.
Qui a décrit la structure en double hélice de l'ADN en 1953 ?|Watson et Crick|Watson;Crick;James Watson;Francis Crick|À partir des clichés de diffraction de Rosalind Franklin.
Qui a inventé la radio (TSF) au tournant du XXe siècle ?|Guglielmo Marconi|Marconi|Première liaison transatlantique en 1901.
Qui a développé le courant alternatif et le moteur à induction ?|Nikola Tesla|Tesla|Rival d'Edison dans la « guerre des courants ».
Qui a conçu la « machine analytique », ancêtre de l'ordinateur ?|Charles Babbage|Babbage|Ada Lovelace a écrit pour elle ce qu'on considère comme le premier programme.
Qui a découvert l'électron en 1897 ?|J. J. Thomson|Thomson;Joseph John Thomson|Prix Nobel de physique 1906.
Qui a inventé le vaccin contre la variole ?|Edward Jenner|Jenner|En 1796, à partir de la vaccine des vaches (d'où le mot « vaccin »).`;

// film | réalisateur | variantes
const FILMS=`Titanic|James Cameron|Cameron
Avatar|James Cameron|Cameron
Jurassic Park|Steven Spielberg|Spielberg
E.T. l'extra-terrestre|Steven Spielberg|Spielberg
Les Dents de la mer|Steven Spielberg|Spielberg
Pulp Fiction|Quentin Tarantino|Tarantino
Kill Bill|Quentin Tarantino|Tarantino
Inception|Christopher Nolan|Nolan
Interstellar|Christopher Nolan|Nolan
Oppenheimer|Christopher Nolan|Nolan
Le Parrain|Francis Ford Coppola|Coppola
Apocalypse Now|Francis Ford Coppola|Coppola
Psychose|Alfred Hitchcock|Hitchcock
Les Oiseaux|Alfred Hitchcock|Hitchcock
2001, l'Odyssée de l'espace|Stanley Kubrick|Kubrick
Shining|Stanley Kubrick|Kubrick
Le Fabuleux Destin d'Amélie Poulain|Jean-Pierre Jeunet|Jeunet
Intouchables|Olivier Nakache et Éric Toledano|Nakache;Toledano;Nakache et Toledano
La Haine|Mathieu Kassovitz|Kassovitz
Le Seigneur des anneaux (la trilogie)|Peter Jackson|Jackson
Star Wars (1977)|George Lucas|Lucas
Retour vers le futur|Robert Zemeckis|Zemeckis
Forrest Gump|Robert Zemeckis|Zemeckis
Alien|Ridley Scott|Scott
Gladiator|Ridley Scott|Scott
Taxi Driver|Martin Scorsese|Scorsese
Le Loup de Wall Street|Martin Scorsese|Scorsese
Parasite|Bong Joon-ho|Bong Joon ho
Le Voyage de Chihiro|Hayao Miyazaki|Miyazaki
Mon voisin Totoro|Hayao Miyazaki|Miyazaki
Matrix|Lana et Lilly Wachowski|Wachowski;Wachowskis
Fight Club|David Fincher|Fincher
Seven|David Fincher|Fincher
Les Temps modernes|Charlie Chaplin|Chaplin
Le Dictateur|Charlie Chaplin|Chaplin
Barbie|Greta Gerwig|Gerwig
Dune (2021)|Denis Villeneuve|Villeneuve
Les Visiteurs|Jean-Marie Poiré|Poire
Le Grand Bleu|Luc Besson|Besson
Léon|Luc Besson|Besson
La La Land|Damien Chazelle|Chazelle
Whiplash|Damien Chazelle|Chazelle
Get Out|Jordan Peele|Peele
Joker (2019)|Todd Phillips|Phillips
Les Quatre Cents Coups|François Truffaut|Truffaut
À bout de souffle|Jean-Luc Godard|Godard
Mad Max: Fury Road|George Miller|Miller
Edward aux mains d'argent|Tim Burton|Burton
Bienvenue chez les Ch'tis|Dany Boon|Boon
Anatomie d'une chute|Justine Triet|Triet
Le Dîner de cons|Francis Veber|Veber
Les Évadés|Frank Darabont|Darabont
Le Silence des agneaux|Jonathan Demme|Demme
Avengers: Endgame|Anthony et Joe Russo|Russo;Freres Russo
Babylon|Damien Chazelle|Chazelle
Il était une fois dans l'Ouest|Sergio Leone|Leone
La vie est belle (1997)|Roberto Benigni|Benigni
Black Swan|Darren Aronofsky|Aronofsky
Lost in Translation|Sofia Coppola|Sofia Coppola
Everything Everywhere All at Once|Daniel Kwan et Daniel Scheinert|Daniels;Kwan;Scheinert`;

// titre | artiste | verbe (chante/composé)
const MUSIC=`Thriller|Michael Jackson|chante
Billie Jean|Michael Jackson|chante
Bohemian Rhapsody|Queen|chante
Imagine|John Lennon|chante
Hey Jude|The Beatles|chante
Smells Like Teen Spirit|Nirvana|chante
Shape of You|Ed Sheeran|chante
Rolling in the Deep|Adele|chante
Single Ladies|Beyoncé|chante
Umbrella|Rihanna|chante
Purple Rain|Prince|chante
Like a Prayer|Madonna|chante
Blinding Lights|The Weeknd|chante
Shake It Off|Taylor Swift|chante
Despacito|Luis Fonsi|chante
Gangnam Style|Psy|chante
Wonderwall|Oasis|chante
Stairway to Heaven|Led Zeppelin|chante
Hotel California|Eagles|chante
(I Can't Get No) Satisfaction|The Rolling Stones|chante
Get Lucky|Daft Punk|chante
Papaoutai|Stromae|chante
La Vie en rose|Édith Piaf|chante
Non, je ne regrette rien|Édith Piaf|chante
Ne me quitte pas|Jacques Brel|chante
La Bohème|Charles Aznavour|chante
Comme d'habitude|Claude François|chante
Foule sentimentale|Alain Souchon|chante
Allumer le feu|Johnny Hallyday|chante
Djadja|Aya Nakamura|chante
Dernière danse|Indila|chante
Lose Yourself|Eminem|chante
Old Town Road|Lil Nas X|chante
Bad Guy|Billie Eilish|chante
Rasputin|Boney M.|chante
Africa|Toto|chante
Hallelujah (1984)|Leonard Cohen|chante
What a Wonderful World|Louis Armstrong|chante
Respect|Aretha Franklin|chante
Highway to Hell|AC/DC|chante
Toxic|Britney Spears|chante
Flowers|Miley Cyrus|chante
Levitating|Dua Lipa|chante
Seven Nation Army|The White Stripes|chante
L'Aventurier|Indochine|chante
My Heart Will Go On|Céline Dion|chante
Sweet Child o' Mine|Guns N' Roses|chante
Waka Waka|Shakira|chante
Viva la Vida|Coldplay|chante
Mr. Brightside|The Killers|chante
Les Quatre Saisons|Antonio Vivaldi|composé
La Flûte enchantée|Wolfgang Amadeus Mozart|composé
La Neuvième Symphonie (« Ode à la joie »)|Ludwig van Beethoven|composé
La Lettre à Élise|Ludwig van Beethoven|composé
Le Lac des cygnes|Piotr Ilitch Tchaïkovski|composé
Casse-Noisette|Piotr Ilitch Tchaïkovski|composé
Le Boléro|Maurice Ravel|composé
Carmen|Georges Bizet|composé
La Traviata|Giuseppe Verdi|composé
Clair de lune|Claude Debussy|composé
Les Gymnopédies|Erik Satie|composé
Le Carnaval des animaux|Camille Saint-Saëns|composé
La Chevauchée des Walkyries|Richard Wagner|composé
Le Beau Danube bleu|Johann Strauss II|composé
Le Sacre du printemps|Igor Stravinsky|composé
Les Concertos brandebourgeois|Jean-Sébastien Bach|composé
Rhapsody in Blue|George Gershwin|composé
Le Messie|Georg Friedrich Haendel|composé`;

// grec | romain | domaine
const GODS=`Zeus|Jupiter|roi des dieux, maître du ciel et de la foudre
Héra|Junon|déesse du mariage, épouse du roi des dieux
Poséidon|Neptune|dieu des mers et des océans
Hadès|Pluton|dieu des Enfers
Athéna|Minerve|déesse de la sagesse et de la stratégie
Arès|Mars|dieu de la guerre
Aphrodite|Vénus|déesse de l'amour et de la beauté
Artémis|Diane|déesse de la chasse
Hermès|Mercure|messager des dieux
Héphaïstos|Vulcain|dieu du feu et de la forge
Dionysos|Bacchus|dieu du vin et de la fête
Déméter|Cérès|déesse de l'agriculture et des moissons
Hestia|Vesta|déesse du foyer
Éros|Cupidon|dieu du désir amoureux
Cronos|Saturne|titan père de Zeus`;

// français | anglais | espagnol | allemand | italien
const WORDS=`pomme|apple|manzana|Apfel|mela
chien|dog|perro|Hund|cane
chat|cat|gato|Katze|gatto
maison|house|casa|Haus|casa
eau|water|agua|Wasser|acqua
pain|bread|pan|Brot|pane
livre|book|libro|Buch|libro
voiture|car|coche|Auto|macchina
merci|thank you|gracias|danke|grazie
fromage|cheese|queso|Käse|formaggio
lune|moon|luna|Mond|luna
soleil|sun|sol|Sonne|sole
école|school|escuela|Schule|scuola
ami|friend|amigo|Freund|amico
rouge|red|rojo|rot|rosso
noir|black|negro|schwarz|nero
blanc|white|blanco|weiß|bianco
vert|green|verde|grün|verde
bleu|blue|azul|blau|blu
jaune|yellow|amarillo|gelb|giallo
père|father|padre|Vater|padre
mère|mother|madre|Mutter|madre
frère|brother|hermano|Bruder|fratello
sœur|sister|hermana|Schwester|sorella
homme|man|hombre|Mann|uomo
femme|woman|mujer|Frau|donna
arbre|tree|árbol|Baum|albero
fleur|flower|flor|Blume|fiore
mer|sea|mar|Meer|mare
montagne|mountain|montaña|Berg|montagna
ville|city|ciudad|Stadt|città
lait|milk|leche|Milch|latte
œuf|egg|huevo|Ei|uovo
vin|wine|vino|Wein|vino
bière|beer|cerveza|Bier|birra
cheval|horse|caballo|Pferd|cavallo
oiseau|bird|pájaro|Vogel|uccello
jour|day|día|Tag|giorno
nuit|night|noche|Nacht|notte
semaine|week|semana|Woche|settimana
année|year|año|Jahr|anno
amour|love|amor|Liebe|amore
cœur|heart|corazón|Herz|cuore
main|hand|mano|Hand|mano
tête|head|cabeza|Kopf|testa
porte|door|puerta|Tür|porta
fenêtre|window|ventana|Fenster|finestra
cuisine|kitchen|cocina|Küche|cucina
plage|beach|playa|Strand|spiaggia
neige|snow|nieve|Schnee|neve
pluie|rain|lluvia|Regen|pioggia
argent (monnaie)|money|dinero|Geld|soldi
travail|work|trabajo|Arbeit|lavoro
sel|salt|sal|Salz|sale
sucre|sugar|azúcar|Zucker|zucchero
couteau|knife|cuchillo|Messer|coltello
fourchette|fork|tenedor|Gabel|forchetta
cuillère|spoon|cuchara|Löffel|cucchiaio
papillon|butterfly|mariposa|Schmetterling|farfalla
grenouille|frog|rana|Frosch|rana
ours|bear|oso|Bär|orso
loup|wolf|lobo|Wolf|lupo
église|church|iglesia|Kirche|chiesa
hôpital|hospital|hospital|Krankenhaus|ospedale
gauche|left|izquierda|links|sinistra
droite|right|derecha|rechts|destra
demain|tomorrow|mañana|morgen|domani
hier|yesterday|ayer|gestern|ieri
toujours|always|siempre|immer|sempre
jamais|never|nunca|nie|mai
petit|small|pequeño|klein|piccolo
chaud|hot|caliente|heiß|caldo
froid|cold|frío|kalt|freddo
fille (enfant)|girl|niña|Mädchen|bambina
garçon|boy|niño|Junge|bambino
cheveux|hair|pelo|Haare|capelli
chaussure|shoe|zapato|Schuh|scarpa
clé|key|llave|Schlüssel|chiave
vache|cow|vaca|Kuh|mucca
mouton|sheep|oveja|Schaf|pecora`;

// personne | page Wikipédia (en) | indice | thème
const PEOPLE=`Napoléon Bonaparte|Napoleon|Empereur des Français, Austerlitz|2
Albert Einstein|Albert_Einstein|E = mc²|3
Marie Curie|Marie_Curie|Deux prix Nobel, radioactivité|3
Charles de Gaulle|Charles_de_Gaulle|Appel du 18 juin|2
Abraham Lincoln|Abraham_Lincoln|Abolition de l'esclavage aux États-Unis|2
Winston Churchill|Winston_Churchill|Premier ministre britannique pendant la guerre|2
Gandhi|Mahatma_Gandhi|Non-violence, indépendance de l'Inde|2
Nelson Mandela|Nelson_Mandela|27 ans de prison, président sud-africain|2
Martin Luther King|Martin_Luther_King_Jr.|« I have a dream »|2
Léonard de Vinci|Leonardo_da_Vinci|La Joconde|5
Vincent van Gogh|Vincent_van_Gogh|La Nuit étoilée|5
Wolfgang Amadeus Mozart|Wolfgang_Amadeus_Mozart|La Flûte enchantée|6
Ludwig van Beethoven|Ludwig_van_Beethoven|Compositeur devenu sourd|6
Victor Hugo|Victor_Hugo|Les Misérables|5
Charles Darwin|Charles_Darwin|Évolution des espèces|3
Isaac Newton|Isaac_Newton|Gravitation|3
Louis XIV|Louis_XIV|Le Roi-Soleil|2
Élisabeth II|Elizabeth_II|Reine pendant 70 ans|2
Che Guevara|Che_Guevara|Révolution cubaine|2
Karl Marx|Karl_Marx|Le Capital|2
Sigmund Freud|Sigmund_Freud|Psychanalyse|3
Nikola Tesla|Nikola_Tesla|Courant alternatif|3
Galilée|Galileo_Galilei|« Et pourtant elle tourne »|3
William Shakespeare|William_Shakespeare|Roméo et Juliette|5
Molière|Molière|Le Misanthrope|5
Voltaire|Voltaire|Candide|5
Marilyn Monroe|Marilyn_Monroe|Icône d'Hollywood des années 50|6
Charlie Chaplin|Charlie_Chaplin|Charlot|6
Elvis Presley|Elvis_Presley|Le King du rock'n'roll|6
Pelé|Pelé|Triple champion du monde de football|7
Mohamed Ali|Muhammad_Ali|« Vole comme le papillon, pique comme l'abeille »|7
Barack Obama|Barack_Obama|Premier président noir des États-Unis|2
John F. Kennedy|John_F._Kennedy|Président assassiné à Dallas|2
Frédéric Chopin|Frédéric_Chopin|Pianiste polonais romantique|6
Marie-Antoinette|Marie_Antoinette|Reine guillotinée en 1793|2
Gustave Eiffel|Gustave_Eiffel|Ingénieur d'une tour célèbre|2
Louis Pasteur|Louis_Pasteur|Vaccin contre la rage|3
Ada Lovelace|Ada_Lovelace|Premier programme informatique|3
Steve Jobs|Steve_Jobs|Cofondateur d'Apple|8
Coco Chanel|Coco_Chanel|N° 5|8
Frida Kahlo|Frida_Kahlo|Peintre mexicaine aux autoportraits|5
Jules César|Julius_Caesar|« Veni, vidi, vici »|2
Usain Bolt|Usain_Bolt|9,58 s au 100 m|7
Serena Williams|Serena_Williams|23 titres du Grand Chelem|7
Joséphine Baker|Josephine_Baker|Meneuse de revue, résistante, au Panthéon|6
Simone Veil|Simone_Veil|Loi sur l'IVG|2
Abbé Pierre|Abbé_Pierre|Fondateur d'Emmaüs|2
Rosa Parks|Rosa_Parks|Refus de céder sa place dans un bus|2`;

// Coupe du monde : année | pays hôte | vainqueur
const WORLDCUP=`1930|Uruguay|Uruguay
1934|Italie|Italie
1938|France|Italie
1950|Brésil|Uruguay
1954|Suisse|Allemagne
1958|Suède|Brésil
1962|Chili|Brésil
1966|Angleterre|Angleterre
1970|Mexique|Brésil
1974|Allemagne|Allemagne
1978|Argentine|Argentine
1982|Espagne|Italie
1986|Mexique|Argentine
1990|Italie|Allemagne
1994|États-Unis|Brésil
1998|France|France
2002|Corée du Sud et Japon|Brésil
2006|Allemagne|Italie
2010|Afrique du Sud|Espagne
2014|Brésil|Allemagne
2018|Russie|France
2022|Qatar|Argentine`;
// JO d'été : année | ville
const OLYMPICS=`1896|Athènes
1900|Paris
1924|Paris
1936|Berlin
1948|Londres
1960|Rome
1964|Tokyo
1968|Mexico
1972|Munich
1976|Montréal
1980|Moscou
1984|Los Angeles
1988|Séoul
1992|Barcelone
1996|Atlanta
2000|Sydney
2004|Athènes
2008|Pékin
2012|Londres
2016|Rio de Janeiro
2024|Paris`;

// ---------- hand-written ----------
// QCM : [thème, étiquette, question, [bonne réponse, 3 mauvaises], explication]
const MCQ=[
// Géographie
[1,"Géo","Quel est le plus long fleuve de France ?",["La Loire","La Seine","Le Rhône","La Garonne"],"La Loire, environ 1 000 km, de l'Ardèche à l'Atlantique."],
[1,"Géo","Quel est le plus grand pays du monde par la superficie ?",["La Russie","Le Canada","La Chine","Les États-Unis"],"La Russie fait plus de 17 millions de km², presque deux fois le Canada."],
[1,"Géo","Quel est le plus grand océan ?",["Le Pacifique","L'Atlantique","L'océan Indien","L'océan Arctique"],"Le Pacifique couvre à lui seul environ un tiers de la surface du globe."],
[1,"Géo","Quel est le plus haut sommet du monde ?",["L'Everest","Le K2","Le Kilimandjaro","Le mont Blanc"],"8 849 m, à la frontière entre le Népal et la Chine."],
[1,"Géo","Quel est le plus haut sommet d'Afrique ?",["Le Kilimandjaro","Le mont Kenya","Le Toubkal","Le Ras Dashen"],"5 895 m, en Tanzanie."],
[1,"Géo","Quel est le plus grand désert chaud du monde ?",["Le Sahara","Le Gobi","Le Kalahari","L'Atacama"],"Le Sahara. Au sens large (peu de précipitations), l'Antarctique est le plus grand désert tout court."],
[1,"Géo","Quel est le désert le plus aride du monde (hors pôles) ?",["L'Atacama","Le Sahara","Le Namib","Le Gobi"],"Au Chili : certaines stations n'y ont jamais enregistré de pluie."],
[1,"Géo","Quel pays a le plus d'habitants ?",["L'Inde","La Chine","Les États-Unis","L'Indonésie"],"L'Inde a dépassé la Chine en 2023, avec plus de 1,4 milliard d'habitants."],
[1,"Géo","Quel fleuve traverse Le Caire ?",["Le Nil","Le Tigre","L'Euphrate","Le Congo"],"Le Nil, plus de 6 600 km, se jette dans la Méditerranée."],
[1,"Géo","Quel fleuve traverse Londres ?",["La Tamise","La Seine","Le Rhin","La Severn"],"The Thames."],
[1,"Géo","Quel fleuve traverse Rome ?",["Le Tibre","Le Pô","L'Arno","Le Danube"],"Le Tibre. L'Arno traverse Florence, le Pô la plaine du Nord."],
[1,"Géo","Quel fleuve traverse Vienne, Bratislava, Budapest et Belgrade ?",["Le Danube","Le Rhin","L'Elbe","La Vistule"],"Le Danube traverse ou longe 10 pays."],
[1,"Géo","Quelle ville française est surnommée « la Ville rose » ?",["Toulouse","Lyon","Marseille","Bordeaux"],"À cause de la brique de ses bâtiments."],
[1,"Géo","Combien la France métropolitaine compte-t-elle de régions depuis 2016 ?",["13","22","18","12"],"13 régions métropolitaines, 18 avec l'outre-mer."],
[1,"Géo","Quel est le plus petit pays du monde ?",["Le Vatican","Monaco","Saint-Marin","Le Liechtenstein"],"0,44 km², enclavé dans Rome."],
[1,"Géo","Dans quel pays se trouve Tombouctou ?",["Mali","Niger","Mauritanie","Tchad"],"Ville historique du Mali, aux portes du Sahara."],
[1,"Géo","Quel détroit sépare l'Europe de l'Afrique ?",["Gibraltar","Le Bosphore","Ormuz","Béring"],"14 km séparent l'Espagne du Maroc."],
[1,"Géo","Quel détroit sépare l'Asie de l'Amérique ?",["Le détroit de Béring","Le détroit de Magellan","Le détroit de Malacca","Le Pas de Calais"],"Entre la Russie et l'Alaska."],
[1,"Géo","Quel pays a la forme d'une botte ?",["L'Italie","Le Chili","La Grèce","Le Portugal"],"La « botte » italienne, avec la Sicile au bout du pied."],
[1,"Géo","Quelle est la plus grande île du monde ?",["Le Groenland","L'Australie","Madagascar","Bornéo"],"L'Australie est considérée comme un continent."],
[1,"Géo","Dans quel océan se trouve Madagascar ?",["L'océan Indien","L'Atlantique","Le Pacifique","L'océan Austral"],"Au large du Mozambique."],
[1,"Géo","Quelle chaîne de montagnes sépare la France et l'Espagne ?",["Les Pyrénées","Les Alpes","Le Jura","Les Vosges"],"Avec Andorre au milieu."],
[1,"Géo","Quelle est la plus grande ville du Brésil ?",["São Paulo","Rio de Janeiro","Brasilia","Salvador"],"Plus de 12 millions d'habitants en ville."],
[1,"Géo","Quel lac est le plus profond du monde ?",["Le lac Baïkal","Le lac Victoria","Le lac Supérieur","La mer Caspienne"],"Plus de 1 600 m, en Sibérie. Il contient environ 20 % de l'eau douce liquide de surface."],
[1,"Géo","Quelle mer est si salée qu'on y flotte sans effort ?",["La mer Morte","La mer Rouge","La mer Noire","La mer Baltique"],"Environ 10 fois plus salée que l'océan, à plus de 400 m sous le niveau de la mer."],
[1,"Géo","Quel pays compte le plus de fuseaux horaires (territoires d'outre-mer compris) ?",["La France","La Russie","Les États-Unis","Le Royaume-Uni"],"12 fuseaux grâce à l'outre-mer (Polynésie, Réunion, Guyane…)."],
[1,"Géo","Combien d'États composent les États-Unis ?",["50","52","48","51"],"Les deux derniers admis : Alaska et Hawaï en 1959."],
[1,"Géo","Dans quel pays se trouve la ville de Marrakech ?",["Maroc","Algérie","Tunisie","Égypte"],"La « ville ocre »."],
[1,"Géo","Quel pays est surnommé le « pays du Soleil-Levant » ?",["Le Japon","La Chine","La Corée du Sud","La Thaïlande"],"Nihon / Nippon signifie « origine du soleil »."],
[1,"Géo","Quel est le point culminant de la France ?",["Le mont Blanc","Le mont Ventoux","Le pic du Midi","La Meije"],"Environ 4 806 m, la mesure varie avec la neige."],
[1,"Géo","Combien de pays ont une frontière terrestre avec la France métropolitaine ?",["8","6","7","9"],"Belgique, Luxembourg, Allemagne, Suisse, Italie, Monaco, Andorre, Espagne."],
// Histoire
[2,"Histoire","Qui était le premier empereur romain ?",["Auguste","Jules César","Néron","Caligula"],"Octave devient Auguste en 27 av. J.-C. César n'a jamais été empereur."],
[2,"Histoire","Quel pharaon a été retrouvé avec un trésor presque intact en 1922 ?",["Toutânkhamon","Ramsès II","Khéops","Akhenaton"],"Découvert par Howard Carter dans la Vallée des Rois."],
[2,"Histoire","Quel roi de France a été surnommé le Roi-Soleil ?",["Louis XIV","Louis XVI","François Ier","Henri IV"],"Règne de 72 ans, record européen."],
[2,"Histoire","Quel roi a signé l'édit de Nantes ?",["Henri IV","Louis XIII","François Ier","Charles IX"],"En 1598, pour mettre fin aux guerres de Religion."],
[2,"Histoire","Qui a lancé l'appel du 18 juin 1940 ?",["Charles de Gaulle","Philippe Pétain","Jean Moulin","Winston Churchill"],"Depuis Londres, sur la BBC."],
[2,"Histoire","Quelle reine d'Égypte était l'alliée de Jules César puis de Marc Antoine ?",["Cléopâtre","Néfertiti","Hatchepsout","Néfertari"],"Cléopâtre VII, dernière souveraine de l'Égypte ptolémaïque."],
[2,"Histoire","Quel navigateur a dirigé la première expédition autour du monde ?",["Fernand de Magellan","Vasco de Gama","Christophe Colomb","James Cook"],"Magellan meurt en route aux Philippines ; Elcano termine le voyage en 1522."],
[2,"Histoire","Quel explorateur a ouvert la route maritime vers l'Inde par le cap de Bonne-Espérance ?",["Vasco de Gama","Magellan","Amerigo Vespucci","Bartolomeu Dias"],"Arrivée à Calicut en 1498. Dias avait passé le cap en 1488."],
[2,"Histoire","Qui a donné son nom au continent américain ?",["Amerigo Vespucci","Christophe Colomb","Jacques Cartier","Hernán Cortés"],"Un cartographe a utilisé son prénom en 1507."],
[2,"Histoire","Quel conquistador a fait tomber l'empire aztèque ?",["Hernán Cortés","Francisco Pizarro","Christophe Colomb","Vasco de Gama"],"Tenochtitlan tombe en 1521. Pizarro, lui, a conquis l'empire inca."],
[2,"Histoire","Quelle civilisation a construit Machu Picchu ?",["Les Incas","Les Aztèques","Les Mayas","Les Olmèques"],"Au XVe siècle, dans les Andes péruviennes."],
[2,"Histoire","Quel mur séparait Berlin-Est et Berlin-Ouest ?",["Le mur de Berlin","Le rideau de fer","La ligne Maginot","Le mur de l'Atlantique"],"Construit en 1961, tombé le 9 novembre 1989."],
[2,"Histoire","Qui était le dirigeant de l'URSS pendant la Seconde Guerre mondiale ?",["Joseph Staline","Lénine","Nikita Khrouchtchev","Léon Trotski"],"Staline dirige l'URSS de la fin des années 1920 à sa mort en 1953."],
[2,"Histoire","Quel président américain a démissionné après le scandale du Watergate ?",["Richard Nixon","Gerald Ford","Lyndon Johnson","Jimmy Carter"],"En 1974, seul président américain à avoir démissionné."],
[2,"Histoire","Quelle guerre a opposé l'Angleterre et la France de 1337 à 1453 ?",["La guerre de Cent Ans","La guerre de Trente Ans","La guerre de Sept Ans","Les guerres d'Italie"],"Elle a duré 116 ans, malgré son nom."],
[2,"Histoire","Quelle bataille a vu la défaite finale de Napoléon ?",["Waterloo","Austerlitz","Trafalgar","Leipzig"],"Le 18 juin 1815, en Belgique."],
[2,"Histoire","Quelle bataille est considérée comme le chef-d'œuvre militaire de Napoléon ?",["Austerlitz","Waterloo","Wagram","Iéna"],"La « bataille des Trois Empereurs », 2 décembre 1805."],
[2,"Histoire","Quel était le nom du paquebot qui a coulé lors de son voyage inaugural en 1912 ?",["Titanic","Lusitania","Britannic","Queen Mary"],"Après avoir heurté un iceberg dans l'Atlantique Nord."],
[2,"Histoire","Quel président français a aboli la peine de mort (loi de 1981) ?",["François Mitterrand","Valéry Giscard d'Estaing","Jacques Chirac","Charles de Gaulle"],"Loi portée par le garde des Sceaux Robert Badinter."],
[2,"Histoire","Qui a été le premier président de la Ve République ?",["Charles de Gaulle","Georges Pompidou","René Coty","Vincent Auriol"],"De 1959 à 1969."],
[2,"Histoire","Qui a été le premier homme à marcher sur la Lune ?",["Neil Armstrong","Buzz Aldrin","Youri Gagarine","Michael Collins"],"Le 21 juillet 1969 (heure française), mission Apollo 11."],
[2,"Histoire","Qui a été le premier humain dans l'espace ?",["Youri Gagarine","Neil Armstrong","Alan Shepard","Valentina Terechkova"],"Le 12 avril 1961, à bord de Vostok 1."],
[2,"Histoire","Quelle cité grecque était célèbre pour son éducation militaire très dure ?",["Sparte","Athènes","Corinthe","Thèbes"],"L'agogé spartiate commençait à 7 ans."],
[2,"Histoire","Qui était le roi de Macédoine qui a conquis un empire jusqu'à l'Inde ?",["Alexandre le Grand","Philippe II","Darius III","Ptolémée"],"Mort à 32 ans à Babylone en 323 av. J.-C."],
[2,"Histoire","Quel chef gaulois a été vaincu à Alésia ?",["Vercingétorix","Astérix","Brennus","Ambiorix"],"Face à César, en 52 av. J.-C."],
[2,"Histoire","Quel roi des Francs a été baptisé à Reims ?",["Clovis","Charlemagne","Pépin le Bref","Charles Martel"],"Vers 496-508 selon les historiens."],
[2,"Histoire","Quelle dynastie régnait en Russie jusqu'en 1917 ?",["Les Romanov","Les Habsbourg","Les Hohenzollern","Les Bourbons"],"Nicolas II, dernier tsar, est exécuté avec sa famille en 1918."],
[2,"Histoire","Quel pays a été le premier à accorder le droit de vote aux femmes au niveau national ?",["La Nouvelle-Zélande","La Finlande","Le Royaume-Uni","Les États-Unis"],"En 1893."],
[2,"Histoire","Quelle ville a été la cible de la première bombe atomique utilisée en guerre ?",["Hiroshima","Nagasaki","Tokyo","Kyoto"],"Le 6 août 1945 ; Nagasaki le 9 août."],
[2,"Histoire","Qui a écrit le Manifeste du Parti communiste avec Friedrich Engels ?",["Karl Marx","Lénine","Proudhon","Trotski"],"Publié en 1848."],
[2,"Histoire","Quelle reine britannique a régné de 1837 à 1901 ?",["Victoria","Élisabeth Ire","Anne","Marie Stuart"],"D'où l'« époque victorienne »."],
[2,"Histoire","Quelle femme est entrée au Panthéon en 2021 ?",["Joséphine Baker","Simone Veil","Marie Curie","Germaine Tillion"],"Première femme noire au Panthéon."],
[2,"Histoire","Quel était le surnom de la ligne de défense française construite à l'est avant 1939 ?",["La ligne Maginot","La ligne Siegfried","Le mur de l'Atlantique","La ligne Gothique"],"Contournée par l'Allemagne via les Ardennes en 1940."],
// Sciences
[3,"Sciences","Quelle est la formule chimique de l'eau ?",["H₂O","CO₂","O₂","H₂O₂"],"Deux atomes d'hydrogène, un d'oxygène. H₂O₂ est l'eau oxygénée."],
[3,"Sciences","Quelle est la planète la plus proche du Soleil ?",["Mercure","Vénus","Mars","La Terre"],"Une année y dure 88 jours terrestres."],
[3,"Sciences","Quelle est la plus grande planète du système solaire ?",["Jupiter","Saturne","Neptune","Uranus"],"Plus de 1 300 fois le volume de la Terre."],
[3,"Sciences","Quelle est la planète la plus chaude du système solaire ?",["Vénus","Mercure","Mars","Jupiter"],"Environ 465 °C, à cause d'un effet de serre extrême, même si Mercure est plus proche du Soleil."],
[3,"Sciences","Quelle planète est surnommée la planète rouge ?",["Mars","Jupiter","Vénus","Saturne"],"À cause de l'oxyde de fer de sa surface."],
[3,"Sciences","Combien de planètes compte le système solaire ?",["8","9","7","10"],"Pluton a été reclassée planète naine en 2006."],
[3,"Sciences","Quelle est la vitesse de la lumière dans le vide (environ) ?",["300 000 km/s","300 000 km/h","30 000 km/s","3 000 000 km/s"],"Exactement 299 792 458 m/s."],
[3,"Sciences","Combien de temps met la lumière du Soleil pour atteindre la Terre ?",["Environ 8 minutes","Environ 8 secondes","Environ 1 heure","Environ 1 seconde"],"Environ 8 min 20 s pour 150 millions de km."],
[3,"Sciences","Quel gaz les plantes absorbent-elles pour faire la photosynthèse ?",["Le dioxyde de carbone","L'oxygène","L'azote","L'hydrogène"],"Elles absorbent le CO₂ et rejettent de l'oxygène."],
[3,"Sciences","Quel gaz compose la majorité de l'air ?",["L'azote","L'oxygène","Le dioxyde de carbone","L'argon"],"Environ 78 % d'azote et 21 % d'oxygène."],
[3,"Sciences","Combien d'os compte le squelette d'un adulte ?",["206","180","250","212"],"Un bébé en a environ 300, certains fusionnent en grandissant."],
[3,"Sciences","Quel est le plus grand organe du corps humain ?",["La peau","Le foie","Les poumons","L'intestin"],"Environ 2 m² chez l'adulte. Le foie est le plus gros organe interne."],
[3,"Sciences","Quel est l'os le plus long du corps humain ?",["Le fémur","Le tibia","L'humérus","Le péroné"],"L'os de la cuisse."],
[3,"Sciences","Combien de chromosomes a une cellule humaine (hors gamètes) ?",["46","23","48","44"],"23 paires."],
[3,"Sciences","Quel groupe sanguin est le donneur universel (globules rouges) ?",["O négatif","AB positif","A négatif","B positif"],"AB positif est le receveur universel."],
[3,"Sciences","À quelle température l'eau bout-elle au niveau de la mer ?",["100 °C","90 °C","110 °C","120 °C"],"Elle bout à plus basse température en altitude."],
[3,"Sciences","Combien vaut le zéro absolu en degrés Celsius ?",["−273,15 °C","−100 °C","−459,67 °C","−173,15 °C"],"0 kelvin. −459,67 est la valeur en degrés Fahrenheit."],
[3,"Sciences","Quelle est l'unité de mesure de la résistance électrique ?",["L'ohm","Le volt","L'ampère","Le watt"],"Symbole Ω, du physicien allemand Georg Ohm."],
[3,"Sciences","Quelle est l'unité de la force dans le Système international ?",["Le newton","Le joule","Le pascal","Le watt"],"1 N accélère 1 kg de 1 m/s²."],
[3,"Sciences","Combien font 7 × 8 ?",["56","54","64","48"],"7 × 8 = 56 (5, 6, 7, 8 !)."],
[3,"Sciences","Quelle est la racine carrée de 144 ?",["12","14","11","16"],"12 × 12 = 144."],
[3,"Sciences","Comment appelle-t-on un polygone à 6 côtés ?",["Un hexagone","Un pentagone","Un heptagone","Un octogone"],"Comme les alvéoles des abeilles."],
[3,"Sciences","Quelle est la somme des angles d'un triangle ?",["180°","360°","90°","270°"],"Dans la géométrie euclidienne."],
[3,"Sciences","Combien vaut π arrondi au centième ?",["3,14","3,16","3,12","3,41"],"π ≈ 3,14159…"],
[3,"Sciences","Quel est le seul nombre premier pair ?",["2","0","4","1"],"1 n'est pas premier par définition."],
[3,"Sciences","Qu'est-ce qu'une année-lumière ?",["Une distance","Une durée","Une vitesse","Une énergie"],"La distance parcourue par la lumière en un an, environ 9 460 milliards de km."],
[3,"Sciences","Quelle est l'étoile la plus proche de la Terre ?",["Le Soleil","Proxima du Centaure","Sirius","L'étoile polaire"],"Après le Soleil, c'est Proxima du Centaure, à 4,2 années-lumière."],
[3,"Sciences","Quelle partie de la cellule contient l'ADN chez les animaux et les plantes ?",["Le noyau","La membrane","Le cytoplasme","Le ribosome"],"On en trouve aussi un peu dans les mitochondries."],
[3,"Sciences","Quel organite est surnommé la « centrale énergétique » de la cellule ?",["La mitochondrie","Le noyau","Le ribosome","L'appareil de Golgi"],"Elle produit l'ATP."],
[3,"Sciences","Quel est le métal le plus conducteur d'électricité ?",["L'argent","Le cuivre","L'or","L'aluminium"],"Le cuivre est plus utilisé car bien moins cher."],
[3,"Sciences","Quel est le seul métal liquide à température ambiante ?",["Le mercure","Le gallium","Le plomb","L'étain"],"Le gallium fond à 30 °C : il fond dans la main mais reste solide à 20 °C."],
[3,"Sciences","Quel scientifique a donné son nom à l'échelle de température utilisée en France ?",["Anders Celsius","Daniel Fahrenheit","Lord Kelvin","René Réaumur"],"Astronome suédois (1701-1744)."],
[3,"Sciences","Que mesure l'échelle de Richter ?",["La magnitude des séismes","La force du vent","La dureté des minéraux","L'acidité"],"La dureté, c'est l'échelle de Mohs ; le vent, celle de Beaufort."],
[3,"Sciences","Quel est le minéral le plus dur sur l'échelle de Mohs ?",["Le diamant","Le quartz","Le corindon","La topaze"],"Note 10. Le talc est le plus tendre (1)."],
[3,"Sciences","Quel est le pH de l'eau pure à 25 °C ?",["7","0","14","5"],"Neutre. En dessous : acide ; au-dessus : basique."],
[3,"Sciences","Quel langage de programmation doit son nom à une troupe de comiques britanniques ?",["Python","Java","Ruby","Swift"],"Guido van Rossum l'a nommé en hommage aux Monty Python."],
[3,"Sciences","Que signifie « www » dans une adresse web ?",["World Wide Web","World Web Window","Wide Web World","Web World Wide"],"Le Web, inventé au CERN en 1989."],
[3,"Sciences","Combien d'octets dans un kilo-octet (au sens du Système international) ?",["1 000","1 024","100","10 000"],"1 024 octets, c'est un kibioctet (Kio), souvent confondu."],
// Nature
[4,"Nature","Quel est le plus grand animal ayant jamais vécu ?",["La baleine bleue","Le mégalodon","L'argentinosaure","L'éléphant d'Afrique"],"Jusqu'à 30 m et 150 tonnes."],
[4,"Nature","Quel est l'animal terrestre le plus rapide ?",["Le guépard","Le lion","L'antilope","Le lévrier"],"Pointes à environ 110 km/h sur de courtes distances."],
[4,"Nature","Quel est l'oiseau le plus rapide en piqué ?",["Le faucon pèlerin","L'aigle royal","Le martinet","L'albatros"],"Plus de 300 km/h en piqué."],
[4,"Nature","Quel est le plus grand oiseau du monde ?",["L'autruche","Le condor","L'albatros","L'émeu"],"Jusqu'à 2,7 m et 150 kg ; elle ne vole pas."],
[4,"Nature","Combien de cœurs possède une pieuvre ?",["3","1","2","8"],"Deux pour les branchies, un pour le reste du corps. Et son sang est bleu."],
[4,"Nature","Combien de pattes a une araignée ?",["8","6","10","12"],"Les insectes en ont 6 ; les araignées sont des arachnides."],
[4,"Nature","Combien de pattes a un insecte ?",["6","8","4","10"],"Tête, thorax, abdomen et trois paires de pattes."],
[4,"Nature","Quel mammifère est capable de voler ?",["La chauve-souris","L'écureuil volant","Le colugo","Le phalanger volant"],"Les autres planent seulement."],
[4,"Nature","Quel animal est le symbole du WWF ?",["Le panda géant","Le tigre","L'ours polaire","L'éléphant"],"Logo créé en 1961, inspiré du panda Chi Chi du zoo de Londres."],
[4,"Nature","De quoi se nourrit presque exclusivement le panda géant ?",["De bambou","D'eucalyptus","De poissons","De fruits"],"Jusqu'à 12 à 38 kg par jour. Le koala, lui, mange de l'eucalyptus."],
[4,"Nature","Comment s'appelle le petit du kangourou ?",["Un joey","Un kangourou-nain","Un faon","Un ourson"],"Il passe des mois dans la poche ventrale de sa mère."],
[4,"Nature","Quel animal produit de la soie ?",["Le ver à soie (chenille du bombyx)","L'abeille","La fourmi","Le papillon monarque"],"Le bombyx du mûrier, domestiqué en Chine depuis des millénaires."],
[4,"Nature","Combien de temps dure environ la gestation d'une éléphante ?",["22 mois","9 mois","12 mois","36 mois"],"Record chez les mammifères terrestres."],
[4,"Nature","Quel est le seul mammifère qui pond des œufs avec l'échidné ?",["L'ornithorynque","Le pangolin","Le tatou","Le koala"],"Ce sont les monotrèmes, en Australie et Nouvelle-Guinée."],
[4,"Nature","Quel animal change de couleur pour communiquer et se camoufler ?",["Le caméléon","L'iguane","Le gecko","Le varan"],"Ses changements servent surtout à communiquer et réguler sa température."],
[4,"Nature","Quelle est la plus grande espèce de félin ?",["Le tigre","Le lion","Le jaguar","Le léopard"],"Le tigre de l'Amour peut dépasser 300 kg."],
[4,"Nature","Quel arbre produit les glands ?",["Le chêne","Le hêtre","Le châtaignier","Le noyer"],"Le hêtre donne des faînes, le châtaignier des châtaignes."],
[4,"Nature","Quel arbre est le symbole du Canada (sur son drapeau) ?",["L'érable","Le sapin","Le bouleau","Le chêne"],"La feuille d'érable rouge."],
[4,"Nature","Quel est l'arbre le plus haut du monde ?",["Le séquoia à feuilles d'if","L'eucalyptus","Le baobab","Le pin de Douglas"],"Hyperion, en Californie, mesure plus de 115 m."],
[4,"Nature","Comment appelle-t-on un animal qui mange de tout ?",["Omnivore","Herbivore","Carnivore","Insectivore"],"Comme l'humain, l'ours ou le cochon."],
[4,"Nature","Quel animal est célèbre pour construire des barrages ?",["Le castor","La loutre","Le rat musqué","Le ragondin"],"Il crée ainsi des étangs pour protéger son terrier."],
[4,"Nature","Quel poisson remonte les rivières pour aller pondre là où il est né ?",["Le saumon","La truite","Le thon","La carpe"],"Il retrouve sa rivière grâce à l'odorat."],
[4,"Nature","Combien de bras a une étoile de mer le plus souvent ?",["5","4","6","8"],"Certaines espèces en ont bien plus, et elles peuvent en régénérer."],
[4,"Nature","Quel est le plus grand poisson du monde ?",["Le requin-baleine","Le grand requin blanc","Le thon rouge","La raie manta"],"Jusqu'à 18 m environ, et il se nourrit de plancton."],
[4,"Nature","Quelle fleur est l'emblème des Pays-Bas ?",["La tulipe","La rose","Le lys","Le coquelicot"],"Pourtant originaire d'Asie centrale."],
[4,"Nature","Quel animal dort debout ?",["Le cheval","Le chien","Le chat","Le lapin"],"Il bloque ses articulations, mais se couche pour le sommeil profond."],
[4,"Nature","Quelle est la durée de vie d'une abeille ouvrière en été ?",["Environ 6 semaines","Environ 1 an","Environ 3 jours","Environ 5 ans"],"La reine peut vivre plusieurs années."],
[4,"Nature","Que produit une ruche à partir du nectar ?",["Du miel","De la cire","De la gelée royale","De la propolis"],"La cire est sécrétée par les abeilles, la propolis vient des résines."],
[4,"Nature","Quel mammifère marin est surnommé « la licorne des mers » ?",["Le narval","Le béluga","Le dauphin","Le morse"],"Sa « corne » est une dent qui peut dépasser 2 m."],
[4,"Nature","Quel animal est un amphibien ?",["La grenouille","Le lézard","La tortue","Le crocodile"],"Les trois autres sont des reptiles."],
[4,"Nature","Quel est le plus long serpent du monde ?",["Le python réticulé","L'anaconda vert","Le cobra royal","Le boa constricteur"],"Plus de 6 m. L'anaconda vert est le plus lourd."],
// Arts & littérature
[5,"Arts","Dans quel musée est exposée la Joconde ?",["Le Louvre","Le musée d'Orsay","Le Prado","Les Offices"],"À Paris, depuis la Révolution (sauf pendant son vol en 1911-1913)."],
[5,"Arts","Quel mouvement artistique Claude Monet a-t-il lancé ?",["L'impressionnisme","Le cubisme","Le surréalisme","Le fauvisme"],"Le nom vient de son tableau Impression, soleil levant (1872)."],
[5,"Arts","Quel peintre a fondé le cubisme avec Georges Braque ?",["Pablo Picasso","Henri Matisse","Salvador Dalí","Joan Miró"],"Les Demoiselles d'Avignon (1907) en est le point de départ."],
[5,"Arts","Quel peintre est célèbre pour ses montres molles ?",["Salvador Dalí","René Magritte","Max Ernst","Pablo Picasso"],"La Persistance de la mémoire, 1931."],
[5,"Arts","Quel peintre belge a peint une pipe avec la légende « Ceci n'est pas une pipe » ?",["René Magritte","Paul Delvaux","James Ensor","Salvador Dalí"],"La Trahison des images, 1929."],
[5,"Arts","Quel artiste a peint Guernica ?",["Pablo Picasso","Joan Miró","Salvador Dalí","Francisco de Goya"],"En 1937, après le bombardement de la ville basque."],
[5,"Arts","Quel artiste a peint le plafond de la chapelle Sixtine ?",["Michel-Ange","Raphaël","Léonard de Vinci","Le Caravage"],"Entre 1508 et 1512."],
[5,"Arts","Quel sculpteur a créé Le Penseur ?",["Auguste Rodin","Camille Claudel","Michel-Ange","Antoine Bourdelle"],"À l'origine, il devait surmonter La Porte de l'Enfer."],
[5,"Arts","Quel artiste est célèbre pour ses boîtes de soupe Campbell ?",["Andy Warhol","Roy Lichtenstein","Keith Haring","Jeff Koons"],"Figure du pop art."],
[5,"Arts","Quel artiste de rue britannique reste anonyme ?",["Banksy","Invader","JR","Shepard Fairey"],"Sa Fille au ballon s'est autodétruite juste après sa vente en 2018."],
[5,"Arts","Quel peintre s'est coupé une partie de l'oreille ?",["Vincent van Gogh","Paul Gauguin","Edvard Munch","Toulouse-Lautrec"],"En 1888 à Arles, après une dispute avec Gauguin."],
[5,"Arts","Quel poète a écrit « Demain, dès l'aube… » ?",["Victor Hugo","Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"],"Les Contemplations, en mémoire de sa fille Léopoldine."],
[5,"Arts","Quel poète a écrit Le Bateau ivre à 16 ans ?",["Arthur Rimbaud","Paul Verlaine","Stéphane Mallarmé","Guillaume Apollinaire"],"Rimbaud arrête d'écrire vers 20 ans."],
[5,"Arts","Quelle est la langue originale de Don Quichotte ?",["L'espagnol","L'italien","Le portugais","Le latin"],"Publié en 1605 et 1615."],
[5,"Arts","Quel personnage dit « Être ou ne pas être, telle est la question » ?",["Hamlet","Macbeth","Roméo","Le roi Lear"],"Acte III, scène 1."],
[5,"Arts","Dans quelle ville se déroule Roméo et Juliette ?",["Vérone","Venise","Florence","Rome"],"Chez les Montaigu et les Capulet."],
[5,"Arts","Quel détective a été créé par Agatha Christie ?",["Hercule Poirot","Sherlock Holmes","Arsène Lupin","Le commissaire Maigret"],"Détective belge, avec ses « petites cellules grises ». Miss Marple est l'autre héroïne de Christie."],
[5,"Arts","Qui a créé le gentleman cambrioleur Arsène Lupin ?",["Maurice Leblanc","Georges Simenon","Gaston Leroux","Eugène Sue"],"Première apparition en 1905."],
[5,"Arts","Qui a créé le commissaire Maigret ?",["Georges Simenon","Maurice Leblanc","Fred Vargas","Gaston Leroux"],"Écrivain belge, plus de 70 romans Maigret."],
[5,"Arts","Quel prix littéraire français est le plus célèbre ?",["Le Goncourt","Le Renaudot","Le Femina","Le Médicis"],"Créé en 1903, il ne rapporte… que 10 €."],
[5,"Arts","Dans Les Misérables, quel est le nom du forçat évadé ?",["Jean Valjean","Javert","Thénardier","Marius"],"Javert est l'inspecteur qui le traque."],
[5,"Arts","Combien de syllabes compte un alexandrin ?",["12","10","8","14"],"Le vers de la tragédie classique."],
[5,"Arts","Dans la mythologie grecque, qui a ouvert la boîte (la jarre) contenant tous les maux ?",["Pandore","Hélène","Perséphone","Médée"],"Il n'y resta que l'espérance."],
[5,"Arts","Quel héros grec a tué le Minotaure ?",["Thésée","Héraclès","Persée","Jason"],"Grâce au fil d'Ariane."],
[5,"Arts","Quel héros a coupé la tête de Méduse ?",["Persée","Thésée","Achille","Ulysse"],"Il utilise son bouclier comme miroir."],
[5,"Arts","Quel est le point faible d'Achille ?",["Son talon","Son épaule","Sa nuque","Son genou"],"Sa mère l'a plongé dans le Styx en le tenant par le talon."],
[5,"Arts","Combien d'années Ulysse met-il à rentrer chez lui après la guerre de Troie ?",["10 ans","3 ans","20 ans","7 ans"],"Absent 20 ans au total : 10 ans de guerre, 10 ans de voyage."],
[5,"Arts","Quel style architectural caractérise Notre-Dame de Paris ?",["Gothique","Roman","Baroque","Renaissance"],"Arcs-boutants, voûtes sur croisée d'ogives, vitraux."],
[5,"Arts","Quel architecte a conçu la pyramide du Louvre ?",["Ieoh Ming Pei","Jean Nouvel","Le Corbusier","Frank Gehry"],"Inaugurée en 1989."],
[5,"Arts","Quel architecte a conçu le musée Guggenheim de Bilbao ?",["Frank Gehry","Zaha Hadid","Renzo Piano","Norman Foster"],"Ouvert en 1997, couvert de titane."],
// Cinéma & musique
[6,"Ciné & musique","Quel film a remporté le plus d'Oscars (11) avec Titanic et Le Retour du roi ?",["Ben-Hur","Autant en emporte le vent","Le Parrain","La La Land"],"Ben-Hur (1959), Titanic (1997) et Le Seigneur des anneaux : le Retour du roi (2003)."],
[6,"Ciné & musique","Dans quelle ville se déroule le festival de cinéma qui décerne la Palme d'or ?",["Cannes","Venise","Berlin","Deauville"],"Créé en 1946."],
[6,"Ciné & musique","Quelle récompense reçoit le meilleur film à la Mostra de Venise ?",["Le Lion d'or","L'Ours d'or","La Palme d'or","Le César"],"L'Ours d'or est remis à Berlin."],
[6,"Ciné & musique","Comment s'appellent les récompenses du cinéma français ?",["Les César","Les Molières","Les Victoires","Les Oscars"],"Les Molières récompensent le théâtre, les Victoires la musique."],
[6,"Ciné & musique","Quel est le vrai nom de Dark Vador ?",["Anakin Skywalker","Luke Skywalker","Obi-Wan Kenobi","Ben Solo"],"« Je suis ton père », L'Empire contre-attaque (1980)."],
[6,"Ciné & musique","Dans Le Roi lion, comment s'appelle le père de Simba ?",["Mufasa","Scar","Rafiki","Zazu"],"Scar est son oncle."],
[6,"Ciné & musique","Comment s'appelle le cow-boy de Toy Story ?",["Woody","Buzz","Andy","Jessie"],"Buzz l'Éclair est le ranger de l'espace."],
[6,"Ciné & musique","Quel acteur joue Jack dans Titanic ?",["Leonardo DiCaprio","Brad Pitt","Matt Damon","Johnny Depp"],"Face à Kate Winslet."],
[6,"Ciné & musique","Quel acteur joue Iron Man dans les films Marvel ?",["Robert Downey Jr.","Chris Evans","Chris Hemsworth","Mark Ruffalo"],"De 2008 à 2019."],
[6,"Ciné & musique","Quel studio a créé Mickey Mouse ?",["Disney","Pixar","Warner Bros.","DreamWorks"],"Steamboat Willie, 1928."],
[6,"Ciné & musique","Quel est le premier long métrage d'animation de Disney ?",["Blanche-Neige et les Sept Nains","Pinocchio","Cendrillon","Fantasia"],"Sorti en 1937."],
[6,"Ciné & musique","Quel est le nom de l'agent 007 ?",["James Bond","Jason Bourne","Ethan Hunt","Jack Ryan"],"Créé par l'écrivain Ian Fleming."],
[6,"Ciné & musique","Dans Harry Potter, comment s'appelle l'école de sorcellerie ?",["Poudlard","Beauxbâtons","Durmstrang","Ilvermorny"],"Hogwarts en version originale."],
[6,"Ciné & musique","Quelle série met en scène les familles Stark et Lannister ?",["Game of Thrones","The Witcher","Vikings","The Crown"],"Diffusée de 2011 à 2019 sur HBO."],
[6,"Ciné & musique","Quelle série suit un professeur de chimie devenu fabricant de drogue ?",["Breaking Bad","Narcos","Ozark","Better Call Saul"],"Walter White, alias Heisenberg."],
[6,"Ciné & musique","Quelle série espagnole suit un braquage de la Fabrique nationale de la monnaie ?",["La casa de papel","Élite","Narcos","Vis a vis"],"Avec le Professeur et les masques de Dalí."],
[6,"Ciné & musique","Combien de cordes a une guitare classique ?",["6","4","5","7"],"Une basse en a généralement 4."],
[6,"Ciné & musique","Combien de touches a un piano standard ?",["88","76","64","100"],"52 blanches et 36 noires."],
[6,"Ciné & musique","Quel groupe était composé de John, Paul, George et Ringo ?",["The Beatles","The Rolling Stones","The Who","Queen"],"De Liverpool."],
[6,"Ciné & musique","Qui était le chanteur de Queen ?",["Freddie Mercury","Brian May","Roger Taylor","David Bowie"],"Né Farrokh Bulsara à Zanzibar."],
[6,"Ciné & musique","Quel duo français portait des casques de robots ?",["Daft Punk","Justice","Air","Cassius"],"Thomas Bangalter et Guy-Manuel de Homem-Christo, séparés en 2021."],
[6,"Ciné & musique","Quel chanteur est surnommé le « King of Pop » ?",["Michael Jackson","Elvis Presley","Prince","Justin Timberlake"],"Elvis est le « King » tout court."],
[6,"Ciné & musique","Quelle chanteuse belge a sorti « Balance ton quoi » ?",["Angèle","Clara Luciani","Aya Nakamura","Zaz"],"En 2019."],
[6,"Ciné & musique","De quel pays vient le groupe ABBA ?",["La Suède","La Norvège","Le Danemark","La Finlande"],"Vainqueur de l'Eurovision 1974 avec « Waterloo »."],
[6,"Ciné & musique","De quel pays vient la K-pop ?",["La Corée du Sud","Le Japon","La Chine","La Corée du Nord"],"BTS, Blackpink…"],
[6,"Ciné & musique","Quel instrument jouait Jimi Hendrix ?",["La guitare","La batterie","Le saxophone","Le piano"],"Souvent jouée à l'envers : il était gaucher."],
[6,"Ciné & musique","Quel compositeur est devenu sourd et a continué à composer ?",["Beethoven","Mozart","Bach","Chopin"],"Sa 9e symphonie a été composée alors qu'il était presque totalement sourd."],
[6,"Ciné & musique","Quel festival de musique géant se tient chaque été en Belgique, avec une scène principale spectaculaire ?",["Tomorrowland","Coachella","Glastonbury","Les Vieilles Charrues"],"À Boom, près d'Anvers."],
// Sport
[7,"Sport","Combien de joueurs une équipe de football a-t-elle sur le terrain ?",["11","10","12","9"],"Gardien compris."],
[7,"Sport","Combien de joueurs par équipe sur le terrain au rugby à XV ?",["15","13","11","12"],"Le rugby à XIII en a 13."],
[7,"Sport","Combien de joueurs par équipe sur le terrain au basket ?",["5","6","7","4"],"Avec des changements illimités."],
[7,"Sport","Combien de joueurs par équipe sur le terrain au volley ?",["6","5","7","4"],"Le beach-volley se joue à 2."],
[7,"Sport","Combien de points vaut un essai au rugby à XV ?",["5","3","4","7"],"Plus 2 points pour la transformation."],
[7,"Sport","Quel tournoi du Grand Chelem se joue sur terre battue ?",["Roland-Garros","Wimbledon","l'US Open","l'Open d'Australie"],"À Paris, chaque fin de printemps."],
[7,"Sport","Quel tournoi du Grand Chelem se joue sur gazon ?",["Wimbledon","Roland-Garros","l'US Open","l'Open d'Australie"],"À Londres, avec tenue blanche obligatoire."],
[7,"Sport","Quel joueur détient le record de victoires à Roland-Garros ?",["Rafael Nadal","Roger Federer","Novak Djokovic","Björn Borg"],"14 titres."],
[7,"Sport","Combien d'anneaux compte le drapeau olympique ?",["5","4","6","7"],"Bleu, jaune, noir, vert, rouge."],
[7,"Sport","Quelle est la distance d'un marathon ?",["42,195 km","40 km","42 km","45 km"],"Distance fixée aux JO de Londres 1908."],
[7,"Sport","Qui détient le record du monde du 100 m ?",["Usain Bolt","Carl Lewis","Tyson Gay","Asafa Powell"],"9,58 s à Berlin en 2009."],
[7,"Sport","Quel nageur a remporté le plus de médailles d'or olympiques ?",["Michael Phelps","Mark Spitz","Léon Marchand","Ian Thorpe"],"23 médailles d'or."],
[7,"Sport","Quel nageur français a remporté 4 titres individuels aux JO de Paris 2024 ?",["Léon Marchand","Florent Manaudou","Yannick Agnel","Maxime Grousset"],"200 m papillon, 200 m brasse, 200 m et 400 m 4 nages."],
[7,"Sport","Quel est le surnom de l'équipe de France de football ?",["Les Bleus","Les Coqs","Les Tricolores","Les Gaulois"],"Champions du monde en 1998 et 2018."],
[7,"Sport","Quel joueur a marqué un doublé de la tête en finale de la Coupe du monde 1998 ?",["Zinédine Zidane","Thierry Henry","Emmanuel Petit","Youri Djorkaeff"],"France 3-0 Brésil, Petit marque le troisième."],
[7,"Sport","Quel joueur a remporté le plus de Ballons d'or ?",["Lionel Messi","Cristiano Ronaldo","Michel Platini","Johan Cruyff"],"8 Ballons d'or."],
[7,"Sport","Quel club de football a remporté le plus de Ligues des champions ?",["Le Real Madrid","Le FC Barcelone","Le Milan AC","Le Bayern Munich"],"Record de titres, loin devant les autres clubs."],
[7,"Sport","Quelle couleur de maillot porte le leader du Tour de France ?",["Jaune","Vert","À pois rouges","Blanc"],"Vert : meilleur sprinteur ; à pois : meilleur grimpeur ; blanc : meilleur jeune."],
[7,"Sport","Dans quel sport utilise-t-on un volant ?",["Le badminton","Le squash","Le tennis de table","Le padel"],"Le volant peut dépasser 400 km/h au smash."],
[7,"Sport","Dans quel sport parle-t-on de « strike » et de « spare » ?",["Le bowling","Le baseball","Le golf","Le cricket"],"Strike : toutes les quilles d'un coup."],
[7,"Sport","Au golf, comment appelle-t-on un trou réussi en un coup de moins que le par ?",["Un birdie","Un eagle","Un bogey","Un albatros"],"Eagle : 2 sous le par ; bogey : 1 au-dessus."],
[7,"Sport","Combien de temps dure un match de football (hors prolongations) ?",["90 minutes","80 minutes","100 minutes","60 minutes"],"Deux mi-temps de 45 minutes."],
[7,"Sport","Dans quel pays le judo est-il né ?",["Le Japon","La Chine","La Corée du Sud","La Thaïlande"],"Créé par Jigorō Kanō en 1882."],
[7,"Sport","Quel judoka français a remporté 3 titres olympiques individuels ?",["Teddy Riner","David Douillet","Clarisse Agbegnenou","Djamel Bouras"],"2012, 2016 et 2024 en individuel, plus des titres par équipes."],
[7,"Sport","Combien de sets faut-il gagner pour remporter un match masculin de Grand Chelem ?",["3","2","4","5"],"Au meilleur des cinq sets."],
[7,"Sport","Quel pays a inventé le rugby ?",["L'Angleterre","La Nouvelle-Zélande","La France","L'Afrique du Sud"],"À l'école de Rugby, selon la légende de William Webb Ellis."],
[7,"Sport","Comment s'appelle la danse d'avant-match des All Blacks ?",["Le haka","Le siva tau","Le cibi","Le sipi tau"],"Danse maorie. Le siva tau est samoan."],
[7,"Sport","Quel pilote de Formule 1 détient le record de titres avec Michael Schumacher ?",["Lewis Hamilton","Max Verstappen","Ayrton Senna","Alain Prost"],"7 titres chacun."],
[7,"Sport","Quel sport pratiquait Michael Jordan ?",["Le basket","Le baseball","Le football américain","Le golf"],"Six titres NBA avec les Chicago Bulls (il a aussi tenté le baseball)."],
[7,"Sport","Quel basketteur français a été drafté en premier en NBA en 2023 ?",["Victor Wembanyama","Tony Parker","Rudy Gobert","Evan Fournier"],"Par les San Antonio Spurs."],
[7,"Sport","Combien de cases compte un échiquier ?",["64","100","81","49"],"8 × 8."],
[7,"Sport","Aux échecs, quelle pièce ne peut se déplacer qu'en diagonale ?",["Le fou","La tour","Le cavalier","Le roi"],"Chaque fou reste sur sa couleur toute la partie."],
// Langues & divers
[8,"Divers","Quelle est la langue la plus parlée au monde (locuteurs natifs) ?",["Le mandarin","L'anglais","L'espagnol","L'hindi"],"En comptant aussi les non-natifs, l'anglais passe devant."],
[8,"Divers","Quelle langue parle-t-on au Brésil ?",["Le portugais","L'espagnol","Le brésilien","L'anglais"],"Héritage de la colonisation portugaise."],
[8,"Divers","Combien de pays ont le français comme langue officielle (environ) ?",["29","12","45","8"],"Le français est langue officielle dans 29 pays, dont beaucoup en Afrique."],
[8,"Divers","Quelle langue a le plus de locuteurs natifs en Suisse ?",["L'allemand (suisse)","Le français","L'italien","Le romanche"],"Environ 60 % ; la Suisse a 4 langues nationales."],
[8,"Divers","Que signifie l'expression « poser un lapin » ?",["Ne pas venir à un rendez-vous","Faire une blague","Se dépêcher","Mentir"],"Expression du XIXe siècle."],
[8,"Divers","Que signifie « avoir le cafard » ?",["Être déprimé","Avoir peur","Être en retard","Avoir faim"],"Le mot vient de Baudelaire, qui l'a popularisé dans ce sens."],
[8,"Divers","Que signifie « coûter les yeux de la tête » ?",["Être très cher","Faire mal","Être très beau","Être difficile à trouver"],"Les yeux sont jugés le plus précieux."],
[8,"Divers","Quel est l'antonyme de « prolixe » ?",["Concis","Bavard","Prolifique","Lent"],"Prolixe = trop long dans ses paroles."],
[8,"Divers","Comment appelle-t-on un mot qui se lit dans les deux sens, comme « kayak » ?",["Un palindrome","Une anagramme","Un homonyme","Un oxymore"],"Autres exemples : radar, ressasser."],
[8,"Divers","Comment appelle-t-on « une obscure clarté » (deux mots contradictoires) ?",["Un oxymore","Un pléonasme","Une litote","Une métaphore"],"Corneille, Le Cid."],
[8,"Divers","« Monter en haut » est un exemple de…",["Pléonasme","Oxymore","Euphémisme","Hyperbole"],"Une répétition inutile."],
[8,"Divers","Quel pays est à l'origine de la pizza ?",["L'Italie","La Grèce","Les États-Unis","La France"],"La margherita serait née à Naples en 1889."],
[8,"Divers","De quel pays vient le sushi ?",["Le Japon","La Chine","La Corée du Sud","La Thaïlande"],"Une technique de conservation du poisson dans le riz à l'origine."],
[8,"Divers","Quel fromage est traditionnellement utilisé dans la tartiflette ?",["Le reblochon","Le comté","Le camembert","La raclette"],"Recette popularisée dans les années 1980 en Haute-Savoie."],
[8,"Divers","Avec quel légume fait-on le guacamole ?",["L'avocat","Le concombre","La courgette","Le petit pois"],"Botaniquement, l'avocat est un fruit."],
[8,"Divers","Quelle épice est la plus chère au monde ?",["Le safran","La vanille","La cardamome","La cannelle"],"Il faut environ 150 000 fleurs pour 1 kg."],
[8,"Divers","De quelle plante tire-t-on la tequila ?",["L'agave","Le cactus","La canne à sucre","Le maïs"],"L'agave bleu, au Mexique."],
[8,"Divers","Quel ingrédient fait lever le pain ?",["La levure","Le sel","Le sucre","Le beurre"],"Elle fermente et produit du CO₂."],
[8,"Divers","Combien de faces a un dé classique ?",["6","8","12","4"],"La somme de deux faces opposées fait toujours 7."],
[8,"Divers","Combien de cartes compte un jeu classique (sans jokers) ?",["52","54","32","48"],"Le jeu de 32 cartes sert à la belote."],
[8,"Divers","Combien de minutes y a-t-il dans une journée ?",["1 440","1 400","1 240","1 640"],"24 × 60."],
[8,"Divers","Combien de jours compte une année bissextile ?",["366","365","364","367"],"Le 29 février tous les 4 ans (avec des exceptions séculaires)."],
[8,"Divers","Quelle entreprise a créé l'iPhone ?",["Apple","Samsung","Google","Microsoft"],"Présenté par Steve Jobs en 2007."],
[8,"Divers","Qui a fondé Microsoft avec Paul Allen ?",["Bill Gates","Steve Jobs","Mark Zuckerberg","Larry Page"],"En 1975."],
[8,"Divers","Quel réseau social a été fondé par Mark Zuckerberg ?",["Facebook","Twitter","Snapchat","TikTok"],"En 2004 à Harvard."],
[8,"Divers","De quel pays vient l'application TikTok ?",["La Chine","Les États-Unis","La Corée du Sud","Le Japon"],"Créée par l'entreprise ByteDance."],
[8,"Divers","Quelle marque automobile a pour logo un cheval cabré ?",["Ferrari","Lamborghini","Porsche","Maserati"],"Lamborghini a un taureau ; Porsche a aussi un cheval, mais dans un blason."],
[8,"Divers","Quel est le symbole de l'euro ?",["€","£","¥","$"],"£ : livre, ¥ : yen ou yuan."],
[8,"Divers","Que veut dire l'abréviation « ONU » ?",["Organisation des Nations unies","Office national d'urbanisme","Organisation du nord unifié","Ordre des nations universelles"],"Fondée en 1945, siège à New York."],
[8,"Divers","Que signifie « RSVP » sur une invitation ?",["Répondez s'il vous plaît","Rendez-vous sans problème","Retour sous vingt-quatre heures","Réservé sans paiement"],"Utilisé même en anglais."],
[8,"Divers","Quelle est la couleur obtenue en mélangeant du bleu et du jaune (peinture) ?",["Vert","Violet","Orange","Marron"],"Bleu + rouge = violet ; rouge + jaune = orange."],
[8,"Divers","Combien de couleurs dans un arc-en-ciel (traditionnellement) ?",["7","6","5","8"],"Rouge, orange, jaune, vert, bleu, indigo, violet."],
[8,"Divers","Quel anniversaire de mariage correspond aux noces d'or ?",["50 ans","25 ans","40 ans","60 ans"],"25 ans : noces d'argent ; 60 ans : noces de diamant."],
[8,"Divers","Dans l'alphabet radio international, quel mot correspond à la lettre A ?",["Alpha","Able","Amsterdam","Apple"],"Alphabet de l'OTAN : Alpha, Bravo, Charlie…"]
];
// Vrai ou faux : [thème, affirmation, vrai ?, explication]
const TF=[
[1,"L'Australie est à la fois un pays et un continent.",true,"On parle aussi d'Océanie pour le continent."],
[1,"Le Nil se jette dans la mer Rouge.",false,"Il se jette dans la Méditerranée, en formant un grand delta."],
[1,"Le Canada a plus de lacs que tout le reste du monde réuni.",true,"Environ 60 % des lacs de la planète."],
[1,"Istanbul est la capitale de la Turquie.",false,"C'est Ankara depuis 1923."],
[1,"La Suisse fait partie de l'Union européenne.",false,"Elle est dans l'espace Schengen mais pas dans l'UE."],
[1,"Le mont Everest se trouve dans les Andes.",false,"Dans l'Himalaya."],
[1,"La Corse est plus grande que la Sardaigne.",false,"La Sardaigne fait environ 24 000 km², la Corse 8 700."],
[1,"Le Groenland appartient au royaume du Danemark.",true,"Territoire autonome du royaume."],
[2,"Napoléon était particulièrement petit pour son époque.",false,"Environ 1,69 m, dans la moyenne. La légende vient de la propagande britannique et des pouces français."],
[2,"Les Vikings portaient des casques à cornes.",false,"C'est une invention du XIXe siècle, popularisée par l'opéra."],
[2,"La guerre de Cent Ans a duré plus de cent ans.",true,"De 1337 à 1453, soit 116 ans."],
[2,"Jules César a été le premier empereur romain.",false,"C'est Auguste, son fils adoptif."],
[2,"La Grande Muraille de Chine est visible à l'œil nu depuis la Lune.",false,"Elle est trop étroite ; même depuis l'orbite basse, c'est très difficile."],
[2,"Cléopâtre a vécu plus près de nous dans le temps que de la construction de la pyramide de Khéops.",true,"Khéops : vers 2560 av. J.-C. ; Cléopâtre : 69-30 av. J.-C. ; nous : plus de 2 000 ans après."],
[2,"Marie-Antoinette a vraiment dit « Qu'ils mangent de la brioche ».",false,"Aucune preuve ; la phrase circulait déjà avant elle (Rousseau)."],
[3,"La foudre ne tombe jamais deux fois au même endroit.",false,"L'Empire State Building est frappé une vingtaine de fois par an."],
[3,"Le son se propage plus vite dans l'eau que dans l'air.",true,"Environ 1 500 m/s contre 340 m/s."],
[3,"On n'utilise que 10 % de son cerveau.",false,"Mythe : l'imagerie montre que toutes les zones servent."],
[3,"Le diamant et le graphite (mine de crayon) sont tous les deux faits de carbone.",true,"Seule leur structure cristalline change."],
[3,"Un jour sur Vénus dure plus longtemps qu'une année sur Vénus.",true,"Rotation : 243 jours terrestres ; révolution : 225."],
[3,"Dans l'espace, on ne peut pas entendre de son.",true,"Pas d'air, pas de propagation du son."],
[3,"L'eau salée gèle à la même température que l'eau douce.",false,"Le sel abaisse le point de congélation (vers −2 °C pour l'eau de mer)."],
[3,"Les humains partagent environ 60 % de leurs gènes avec la banane.",true,"Beaucoup de gènes de base des cellules sont communs à tout le vivant."],
[3,"Le Soleil est une étoile.",true,"Une naine jaune, d'environ 4,6 milliards d'années."],
[4,"Les chauves-souris sont aveugles.",false,"Elles voient, et beaucoup utilisent en plus l'écholocation."],
[4,"Le poisson rouge a une mémoire de trois secondes.",false,"Il peut retenir des informations pendant des mois."],
[4,"Les autruches enfouissent leur tête dans le sable quand elles ont peur.",false,"Elles s'aplatissent au sol ou retournent leurs œufs dans leur nid creusé."],
[4,"Le cœur d'une baleine bleue peut peser plusieurs centaines de kilos.",true,"Environ 180 à 200 kg."],
[4,"Les koalas dorment jusqu'à 20 heures par jour.",true,"L'eucalyptus est peu nourrissant et long à digérer."],
[4,"Les tomates sont botaniquement des fruits.",true,"Elles contiennent les graines de la plante."],
[4,"Les fraises sont botaniquement des baies.",false,"Ce sont de faux fruits ; les vrais fruits sont les petits grains à la surface. La banane, elle, est une baie."],
[4,"Les requins sont des mammifères.",false,"Ce sont des poissons cartilagineux ; les dauphins et baleines sont des mammifères."],
[4,"Les poulpes peuvent goûter avec leurs bras.",true,"Leurs ventouses ont des récepteurs chimiques."],
[5,"La Joconde a été volée au Louvre en 1911.",true,"Par Vincenzo Peruggia ; retrouvée en 1913 à Florence."],
[5,"Shakespeare a écrit Don Quichotte.",false,"C'est Cervantes. Les deux sont morts en 1616."],
[5,"Victor Hugo est enterré au Panthéon.",true,"Depuis 1885, après des funérailles nationales."],
[5,"Le Petit Prince est l'un des livres les plus traduits au monde.",true,"Plus de 500 langues et dialectes."],
[5,"Frankenstein est le nom du monstre dans le roman de Mary Shelley.",false,"C'est le nom du savant, Victor Frankenstein. Le monstre n'a pas de nom."],
[6,"Le film Titanic est sorti en 1997.",true,"11 Oscars."],
[6,"Mickey Mouse s'appelait d'abord Mortimer.",true,"C'est la femme de Walt Disney qui aurait proposé Mickey."],
[6,"Les Beatles venaient de Manchester.",false,"De Liverpool."],
[6,"Le premier film parlant est Le Chanteur de jazz (1927).",true,"Premier long métrage avec dialogues synchronisés."],
[6,"Céline Dion est française.",false,"Elle est québécoise (canadienne)."],
[7,"Le tennis de table s'appelle aussi ping-pong.",true,"Ping-pong était à l'origine une marque déposée."],
[7,"Les Jeux olympiques d'été 2024 ont eu lieu à Paris.",true,"Pour la troisième fois, après 1900 et 1924."],
[7,"Au football, le gardien peut prendre le ballon à la main sur une passe du pied d'un coéquipier.",false,"Interdit depuis 1992 : coup franc indirect."],
[7,"Un marathon fait plus de 42 km.",true,"42,195 km."],
[7,"Le Tour de France a été créé au XXe siècle.",true,"En 1903."],
[8,"Le mot « oiseau » contient toutes les voyelles (hors y).",true,"o, i, e, a, u : c'est l'un des plus courts mots français à toutes les avoir."],
[8,"Le croissant est d'origine française.",false,"Il descend du kipferl autrichien ; la version feuilletée s'est développée à Paris."],
[8,"Le mot « shampooing » vient de l'hindi.",true,"De champo, « masser »."],
[8,"Il y a plus d'étoiles dans l'univers observable que de grains de sable sur toutes les plages de la Terre.",true,"On estime environ 10²² à 10²⁴ étoiles."],
[8,"Le Monopoly a été inspiré d'un jeu créé pour dénoncer les propriétaires fonciers.",true,"The Landlord's Game, d'Elizabeth Magie, 1904."]
];
// réponse tapée : [thème, question, "réponse;variantes", explication]
const TYPED=[
[1,"Quel est le plus long fleuve de France ?","Loire;La Loire","Environ 1 000 km."],
[1,"Quel fleuve traverse Paris ?","Seine;La Seine","Elle se jette dans la Manche au Havre."],
[1,"Quel fleuve traverse Lyon avec la Saône ?","Rhône;Rhone;Le Rhône","Ils se rejoignent au confluent, au sud de la presqu'île."],
[1,"Quel océan borde la côte ouest de la France ?","Atlantique;Océan Atlantique","La Manche et la Méditerranée bordent le reste."],
[1,"Quel est le plus grand pays d'Amérique du Sud ?","Brésil;Bresil","Près de la moitié du continent."],
[1,"Sur quel continent se trouve l'Égypte ?","Afrique","Avec le Sinaï, une petite partie est en Asie."],
[1,"Quel est le plus haut sommet du monde ?","Everest;Mont Everest","8 849 m."],
[1,"Quel est le plus grand désert chaud du monde ?","Sahara","Environ 9 millions de km²."],
[1,"Quel pays a pour capitale Kaboul ?","Afghanistan","Ville à 1 800 m d'altitude."],
[1,"Quelle ville est surnommée « la Grosse Pomme » ?","New York;New York City;NYC","The Big Apple."],
[2,"Qui était le premier président des États-Unis ?","Washington;George Washington","De 1789 à 1797."],
[2,"Quelle est l'année de la Révolution française ?","1789","Prise de la Bastille le 14 juillet 1789."],
[2,"Quel roi de France a été guillotiné en 1793 ?","Louis XVI;Louis 16","Le 21 janvier 1793, place de la Révolution (actuelle Concorde)."],
[2,"Quelle jeune femme a libéré Orléans en 1429 ?","Jeanne d'Arc;Jeanne d Arc;Jeanne","Brûlée à Rouen en 1431, canonisée en 1920."],
[2,"Quel empereur a été exilé à l'île d'Elbe puis à Sainte-Hélène ?","Napoléon;Napoleon;Napoléon Bonaparte;Bonaparte","Mort à Sainte-Hélène en 1821."],
[2,"Dans quelle ville a été assassiné John F. Kennedy ?","Dallas","Le 22 novembre 1963."],
[2,"Quelle civilisation a construit les pyramides de Gizeh ?","Égyptiens;Egyptiens;Égyptienne;Les Égyptiens;Egypte","Vers 2600-2500 av. J.-C."],
[2,"Quel pays a offert la statue de la Liberté aux États-Unis ?","France;La France","Inaugurée en 1886."],
[3,"Quel est le symbole chimique de l'eau ?","H2O;H₂O","Deux atomes d'hydrogène, un d'oxygène."],
[3,"Quelle planète possède les anneaux les plus visibles ?","Saturne","Faits de glace et de roches."],
[3,"Quel est le satellite naturel de la Terre ?","Lune;La Lune","À environ 384 000 km."],
[3,"Combien font 12 × 12 ?","144","Une « grosse »."],
[3,"Combien de côtés a un octogone ?","8;huit","Comme un panneau stop."],
[3,"Quel organe pompe le sang dans le corps ?","Cœur;Coeur;Le cœur","Environ 100 000 battements par jour."],
[3,"Quel gaz respirons-nous pour vivre ?","Oxygène;Oxygene;O2","Environ 21 % de l'air."],
[3,"Combien de degrés compte un angle droit ?","90","Un quart de tour."],
[4,"Quel est l'animal terrestre le plus rapide ?","Guépard;Guepard;Le guépard","Environ 110 km/h en pointe."],
[4,"Quel est le plus grand animal du monde ?","Baleine bleue;Rorqual bleu","Jusqu'à 30 m."],
[4,"Comment s'appelle le petit de la vache ?","Veau","La femelle jeune est une génisse."],
[4,"Comment s'appelle le petit du cheval ?","Poulain","La femelle est une pouliche."],
[4,"Comment s'appelle la femelle du sanglier ?","Laie","Les petits sont des marcassins."],
[4,"Comment s'appelle le petit de la chèvre ?","Chevreau;Cabri","Ou biquet."],
[4,"Quel animal est surnommé « le roi de la jungle » ?","Lion;Le lion","Alors qu'il vit surtout dans la savane."],
[4,"Quel insecte produit le miel ?","Abeille;Abeilles;L'abeille","Une colonie peut compter 50 000 abeilles en été."],
[5,"Qui a peint la Joconde ?","Léonard de Vinci;Leonard de Vinci;Vinci;Leonardo da Vinci","Au début du XVIe siècle."],
[5,"Quel dramaturge a écrit Le Malade imaginaire ?","Molière;Moliere","Il meurt en 1673 après une représentation de cette pièce."],
[5,"Quel héros grec a imaginé le cheval de Troie ?","Ulysse;Odysseus","Héros de L'Odyssée d'Homère."],
[5,"Quelle fleur le Petit Prince aime-t-il sur sa planète ?","Rose;Une rose;La rose","« C'est le temps que tu as perdu pour ta rose qui fait ta rose si importante. »"],
[5,"Dans quel musée parisien sont exposés de nombreux impressionnistes, dans une ancienne gare ?","Orsay;Musée d'Orsay;Musee d Orsay","Ouvert en 1986."],
[6,"Quel sorcier à lunettes a une cicatrice en forme d'éclair ?","Harry Potter;Harry","Créé par J. K. Rowling."],
[6,"Quel personnage Disney a des chaussures de verre ?","Cendrillon;Cinderella","Elle doit rentrer avant minuit."],
[6,"Quel petit poisson orange Marin cherche-t-il dans le film Pixar ?","Nemo;Némo","Le Monde de Nemo, 2003."],
[6,"Quel groupe a chanté « Bohemian Rhapsody » ?","Queen","Sortie en 1975."],
[6,"Quel instrument a 88 touches ?","Piano","52 blanches, 36 noires."],
[7,"Dans quel sport gagne-t-on la Coupe Davis ?","Tennis","Compétition par nations, créée en 1900."],
[7,"Quel sport pratique Kylian Mbappé ?","Football;Foot","Champion du monde 2018."],
[7,"Quel sport pratique Teddy Riner ?","Judo","Multiple champion du monde et olympique."],
[7,"Dans quelle ville se déroule le tournoi de Wimbledon ?","Londres;London","Dans le quartier de Wimbledon."],
[7,"Comment s'appelle la grande course cycliste française de juillet ?","Tour de France;Le Tour de France;Le Tour","Créé en 1903."],
[8,"Quel est le mot anglais pour « bonjour » ?","Hello;Hi","Ou « good morning » le matin."],
[8,"Combien de jours compte une année non bissextile ?","365","366 les années bissextiles."],
[8,"Quelle est la monnaie du Royaume-Uni ?","Livre sterling;Livre;Pound;Sterling","Le symbole est £."],
[8,"De quel pays vient la paella ?","Espagne","Originaire de la région de Valence."],
[8,"Quel fruit sert à fabriquer le cidre ?","Pomme;Pommes;La pomme","Le poiré se fait avec des poires."]
];

// ---------- generator ----------
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const R=rng(20261025);
const sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=(R()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const rows=t=>t.trim().split("\n").map(l=>l.split("|").map(x=>x.trim()));
const alts=x=>x?x.split(";").map(v=>v.trim()).filter(Boolean):[];
const key=v=>String(v).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"");
const uniq=a=>{const s=new Set();return a.filter(v=>{const k=key(v);if(s.has(k))return false;s.add(k);return true})};
const up=t=>t.charAt(0).toUpperCase()+t.slice(1);
const deOf=n=>(/^[aeiouhéèêàâîôûœ]/i.test(n)?"d'":"de ")+n;
const Q=[],TQ=[];
// 3 wrong options, taken from the first pool first (e.g. same continent), then from the next ones
function wrong(ans,pools){const seen=new Set([key(ans)]),out=[];
  for(const p of pools)for(const v of sh(p)){if(out.length===3)return out;const k=key(v);if(seen.has(k))continue;seen.add(k);out.push(v)}
  return out}
function mcq(s,t,q,ans,pools,e,extra){const w=wrong(ans,pools);if(w.length<3)return;Q.push(Object.assign({s,t,q,o:[ans,...w],a:0,e},extra||{}))}
function typed(s,t,q,answers,e){TQ.push({s,t,q,a:uniq(answers),e})}

// hand-written
MCQ.forEach(([s,t,q,o,e])=>Q.push({s,t,q,o,a:0,e}));
TF.forEach(([s,q,v,e])=>Q.push({s,t:"Vrai ou faux",q,o:v?["Vrai","Faux"]:["Faux","Vrai"],a:0,e:(v?"Vrai. ":"Faux. ")+e,tf:true}));
TYPED.forEach(([s,q,a,e])=>typed(s,"",q,alts(a),e));

// pays, capitales, drapeaux
const C=rows(COUNTRIES).map(r=>({n:r[0],de:r[1],cap:r[2],z:r[3],flag:r[4],al:alts(r[5])}));
const capsAll=C.map(c=>c.cap),namesAll=C.map(c=>c.n);
C.forEach(c=>{
  const zc=C.filter(x=>x.z===c.z),e=(c.cap+" est la capitale "+c.de+". "+(CAP_NOTE[c.n]||"")).trim();
  mcq(1,"Capitales","Quelle est la capitale "+c.de+" ?",c.cap,[zc.map(x=>x.cap),capsAll],e);
  mcq(1,"Capitales",c.cap+" est la capitale de quel pays ?",c.n,[zc.map(x=>x.n),namesAll],e);
  mcq(1,"Drapeaux","À quel pays appartient ce drapeau ?",c.n,[zc.map(x=>x.n),namesAll],"C'est le drapeau "+c.de+" (capitale : "+c.cap+").",{img:"Flag_of_"+c.flag,hint:"Image indisponible. Indice : sa capitale est "+c.cap+"."});
  typed(1,"Capitales","Quelle est la capitale "+c.de+" ?",[c.cap,...c.al],e);
  mcq(1,"Continents","Sur quel continent se trouve le pays suivant : "+c.n+" ?",ZONE[c.z],[Object.values(ZONE)],c.n+" : "+ZONE[c.z]+" (capitale : "+c.cap+").");
});
// monnaies
const CUR=rows(CURRENCIES);
CUR.forEach(([de,m])=>mcq(8,"Monnaies","Quelle est la monnaie "+de+" ?",m,[CUR.map(x=>x[1])],"La monnaie "+de+" : "+m+"."));
// éléments chimiques
const EL=rows(ELEMENTS);
const art=n=>(/^[aeiouhéèêàâîôûœ]/i.test(n)?"de l'":"du ")+n.toLowerCase();
EL.forEach(([n,sym,z])=>{const e=n+" : symbole "+sym+", numéro atomique "+z+".";
  mcq(3,"Chimie","Quel élément chimique a pour symbole « "+sym+" » ?",n,[EL.map(x=>x[0])],e);
  mcq(3,"Chimie","Quel est le symbole chimique "+art(n)+" ?",sym,[EL.map(x=>x[1])],e);
  typed(3,"Chimie","Quel élément chimique a pour symbole « "+sym+" » ?",[n],e);
  if(sym.length===2&&!/^(As|Ba)$/.test(sym))typed(3,"Chimie","Quel est le symbole chimique "+art(n)+" ?",[sym],e);
});
// livres
const BK=rows(BOOKS);
BK.forEach(([w,a,v,al])=>{const q="Qui a "+v+" « "+w+" » ?",e="« "+w+" » : "+a+".";
  mcq(5,"Livres",q,a,[BK.map(x=>x[1])],e);
  typed(5,"Livres",q,[a,...alts(al)],e);
  mcq(5,"Livres","Laquelle de ces œuvres est "+deOf(a)+" ?",w,[BK.filter(x=>x[1]!==a).map(x=>x[0])],e);
});
// tableaux
const PT=rows(PAINTINGS);
PT.forEach(([t,a,wiki,al])=>{const e="« "+t+" » : "+a+".";
  mcq(5,"Tableaux","Qui a peint « "+t+" » ?",a,[PT.map(x=>x[1])],e,{img:wiki});
  mcq(5,"Tableaux","Comment s'appelle ce tableau ?",t,[PT.filter(x=>x[1]!==a).map(x=>x[0])],"C'est « "+t+" », "+deOf(a)+".",{img:wiki,hint:"Image indisponible. Indice : c'est une œuvre "+deOf(a)+"."});
  typed(5,"Tableaux","Qui a peint « "+t+" » ?",[a,...alts(al)],e);
});
// monuments et sites
const MO=rows(MONUMENTS),SI=rows(SITES),placeNames=MO.map(x=>up(x[0])).concat(SI.map(x=>up(x[0])));
MO.forEach(([n,city,wiki])=>{const e=up(n)+" se trouve à "+city+".";
  mcq(1,"Monuments","Dans quelle ville se trouve "+n+" ?",city,[MO.map(x=>x[1])],e,{img:wiki});
  mcq(1,"Monuments","Quel est ce lieu célèbre ?",up(n),[placeNames],"C'est "+n+", à "+city+".",{img:wiki,hint:"Image indisponible. Indice : il se trouve à "+city+"."});
  typed(1,"Monuments","Dans quelle ville se trouve "+n+" ?",[city],e);
});
SI.forEach(([n,country,wiki])=>{const e=up(n)+" : "+country+".";
  mcq(1,"Monuments","Dans quel pays se trouve "+n+" ?",country,[SI.map(x=>x[1]),namesAll],e,{img:wiki});
  mcq(1,"Monuments","Quel est ce lieu célèbre ?",up(n),[placeNames],"C'est "+n+" ("+country+").",{img:wiki,hint:"Image indisponible. Indice : pays : "+country+"."});
});
// dates
const OFF=[-30,-20,-15,-12,-10,-8,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,8,10,12,15,20,30];
rows(EVENTS).forEach(([n,y])=>{const Y=+y,q="En quelle année a eu lieu "+n+" ?",e=up(n)+" : "+Y+".";
  mcq(2,"Dates",q,String(Y),[OFF.map(o=>Y+o).filter(v=>v>0&&v<=2026).map(String)],e);
  typed(2,"Dates",q,[String(Y)],e);
});
// inventions et découvertes
const DI=rows(DISCOVERIES);
DI.forEach(([q,a,al,e])=>{mcq(3,"Inventions",q,a,[DI.map(x=>x[1])],e);typed(3,"Inventions",q,[a,...alts(al)],e)});
// films
const FI=rows(FILMS);
FI.forEach(([f,d,al])=>{const q="Qui a réalisé le film « "+f+" » ?",e="« "+f+" » : réalisé par "+d+".";
  mcq(6,"Films",q,d,[FI.map(x=>x[1])],e);
  typed(6,"Films",q,[d,...alts(al)],e);
  mcq(6,"Films","Quel film a été réalisé par "+d+" ?",f,[FI.filter(x=>x[1]!==d).map(x=>x[0])],e);
});
// musique
const MU=rows(MUSIC);
MU.forEach(([t,a,v])=>{const pop=v==="chante",same=MU.filter(x=>x[2]===v),e="« "+t+" » : "+a+".";
  const q=pop?"Qui interprète « "+t+" » ?":"Qui a composé « "+t+" » ?";
  mcq(6,pop?"Musique":"Classique",q,a,[same.map(x=>x[1])],e);
  typed(6,pop?"Musique":"Classique",q,[a,a.replace(/^The /,"")],e);
  if(pop)mcq(6,"Musique","Quelle chanson est interprétée par "+a+" ?",t,[same.filter(x=>x[1]!==a).map(x=>x[0])],e);
});
// mythologie
const GO=rows(GODS);
GO.forEach(([gr,ro,dom])=>{const e=gr+" (grec) = "+ro+" (romain) : "+dom+".";
  mcq(5,"Mythologie","Quel est l'équivalent romain de "+gr+" ?",ro,[GO.map(x=>x[1])],e);
  mcq(5,"Mythologie","Quel est l'équivalent grec de "+ro+" ?",gr,[GO.map(x=>x[0])],e);
  mcq(5,"Mythologie","Mythologie grecque : qui est le ou la "+dom+" ?",gr,[GO.map(x=>x[0])],e);
  typed(5,"Mythologie","Quel est l'équivalent romain de "+gr+" ?",[ro],e);
});
// vocabulaire
const WO=rows(WORDS),LANGS=[["anglais",1],["espagnol",2],["allemand",3],["italien",4]];
WO.forEach(w=>LANGS.forEach(([L,i])=>{const e="« "+w[0]+" » se dit « "+w[i]+" » en "+L+".";
  mcq(8,"Langues","Comment dit-on « "+w[0]+" » en "+L+" ?",w[i],[WO.map(x=>x[i])],e);
  mcq(8,"Langues","Que veut dire le mot "+L+" « "+w[i]+" » ?",w[0],[WO.filter(x=>key(x[i])!==key(w[i])).map(x=>x[0])],e);
  if(i<=2)typed(8,"Langues","Comment dit-on « "+w[0]+" » en "+L+" ?",[w[i]],e);
}));
// portraits
const PE=rows(PEOPLE);
PE.forEach(([n,wiki,hint,s])=>mcq(+s,"Qui est-ce ?","Qui est-ce ?",n,[PE.filter(x=>x[3]===s).map(x=>x[0]),PE.map(x=>x[0])],n+" : "+hint+".",{img:wiki,hint:"Image indisponible. Indice : "+hint}));
// sport
const WC=rows(WORLDCUP);
WC.forEach(([y,host,win])=>{const rfa=win==="Allemagne"&&+y<1991?" (RFA)":"",e="Coupe du monde "+y+" : victoire de l'équipe "+(win==="Allemagne"?"d'Allemagne":"de/du "+win)+rfa+", pays hôte : "+host+".";
  mcq(7,"Football","Quel pays a remporté la Coupe du monde de football "+y+" ?",win,[WC.map(x=>x[2]),["Pays-Bas","Croatie","Hongrie","Tchécoslovaquie","Suède"]],e);
  mcq(7,"Football","Quel pays a organisé la Coupe du monde de football "+y+" ?",host,[WC.map(x=>x[1])],e);
});
const OL=rows(OLYMPICS);
OL.forEach(([y,city])=>{const q="Quelle ville a accueilli les Jeux olympiques d'été de "+y+" ?",e="JO d'été "+y+" : "+city+".";
  mcq(7,"JO",q,city,[OL.map(x=>x[1])],e);typed(7,"JO",q,[city],e)});

const ticker=uniq(C.map(c=>c.cap).concat(PT.map(x=>x[1]),BK.map(x=>x[0]),GO.map(x=>x[0]),FI.map(x=>x[0]))).filter(t=>t.length<=28);
return {id:"culture",title:"Culture générale",kw:"culture G quiz général connaissances trivia",subject:"Des questions sans fin sur 8 thèmes",lang:"fr",sess:SESS,tags:TAGS,unit:["thème","thèmes","un thème"],balance:true,Q,TQ,ticker};
})();
