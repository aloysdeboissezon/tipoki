// Built-in bank: gastronomie et traditions françaises (français). Fromages, vins, pâtisseries, cuisine régionale, chefs, fêtes.
// Écrit à la main et statique : tous les appareils construisent les mêmes tableaux Q/TQ (multijoueur).
// Difficulté d : 1 = facile, 2 = moyen, 3 = pour les fins gourmets.
window.BANK_GASTRO=(function(){
const SESS={1:"Fromages",2:"Vins & boissons",3:"Pâtisseries & desserts",4:"Cuisine des régions",5:"Chefs & gastronomie",6:"Fêtes & traditions"};
const TAGS={1:"Fromages",2:"Vins",3:"Desserts",4:"Régions",5:"Chefs",6:"Traditions"};
const Q=[],TQ=[];
// QCM : la première option est la bonne (mélangée à l'écran)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"Vrai ou faux",q,o:v?["Vrai","Faux"]:["Faux","Vrai"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Fromages =====================
m(1,"Origine","De quelle région vient le camembert ?","La Normandie",["La Bretagne","L'Auvergne","La Provence"],"Le camembert de Normandie est fabriqué avec du lait de vache, à Camembert (Orne) et dans toute la région.",1);
m(1,"Lait","Avec quel lait le roquefort est-il fabriqué ?","Du lait de brebis",["Du lait de vache","Du lait de chèvre","Du lait de bufflonne"],"Le roquefort est un fromage bleu au lait de brebis, affiné dans les caves de Roquefort-sur-Soulzon (Aveyron).",1);
m(1,"Montagne","Dans quel massif fabrique-t-on le comté ?","Le Jura",["Les Vosges","Les Pyrénées","Le Massif central"],"Le comté est un fromage à pâte pressée cuite, au lait de vache, produit en Franche-Comté et dans le Jura.",2);
m(1,"Lait","Lequel de ces fromages est fait avec du lait de chèvre ?","Le crottin de Chavignol",["Le brie de Meaux","Le munster","Le saint-nectaire"],"Le crottin de Chavignol vient du Berry (Cher), près de Sancerre. Les trois autres sont au lait de vache.",2);
m(1,"Surnom","Quel fromage est surnommé « le roi des fromages » ?","Le brie de Meaux",["Le maroilles","Le cantal","Le chaource"],"Le brie de Meaux, de Seine-et-Marne, est surnommé « roi des fromages et fromage des rois ».",2);
m(1,"Origine","De quelle région vient le munster ?","L'Alsace",["La Bourgogne","Le Limousin","Le Poitou"],"Le munster est un fromage à croûte lavée, produit en Alsace et en Lorraine, dans les Vosges.",2);
m(1,"Recette","Quel fromage savoyard entre dans la recette de la tartiflette ?","Le reblochon",["Le roquefort","Le cantal","Le boursin"],"La tartiflette se prépare avec des pommes de terre, des lardons, des oignons et du reblochon.",2);
m(1,"Origine","Dans quelle région produit-on le cantal ?","L'Auvergne",["La Bretagne","L'Alsace","La Champagne"],"Le cantal, l'un des plus anciens fromages de France, vient du Massif central (Cantal, en Auvergne).",3);
vf(1,"Le camembert est un fromage à pâte pressée cuite.",false,"Le camembert est un fromage à pâte molle à croûte fleurie. La pâte pressée cuite, c'est le comté ou le gruyère.",2);
vf(1,"Le roquefort est un fromage bleu.",true,"Le roquefort est un fromage à pâte persillée : les veines bleu-vert viennent de la moisissure Penicillium roqueforti.",1);
ty(1,"De quelle région vient le camembert ?",["Normandie","La Normandie"],"La Normandie.",2);
ty(1,"Avec le lait de quel animal fait-on le roquefort ?",["Brebis","La brebis","Du lait de brebis","Lait de brebis"],"Le roquefort est fabriqué avec du lait de brebis.",2);

// ===================== 2. Vins & boissons =====================
m(2,"Régions","Dans quelle région produit-on le champagne ?","La Champagne",["La Bourgogne","L'Alsace","La Loire"],"Seul le vin mousseux produit en Champagne peut s'appeler champagne.",1);
m(2,"Régions","Quelle ville est la capitale mondiale du vin avec ses châteaux et ses grands crus ?","Bordeaux",["Lyon","Dijon","Nîmes"],"Bordeaux et son vignoble (Médoc, Saint-Émilion, Pomerol…) sont réputés dans le monde entier.",1);
m(2,"Cépages","Quel cépage donne les grands vins rouges de Bourgogne ?","Le pinot noir",["Le merlot","La syrah","Le grenache"],"Les vins rouges de Bourgogne sont faits de pinot noir ; le blanc, de chardonnay.",2);
m(2,"Eaux-de-vie","De quelle région vient le cognac ?","La Charente",["Le Bordelais","L'Alsace","Le Roussillon"],"Le cognac est une eau-de-vie de vin, produite autour de la ville de Cognac, en Charente.",2);
m(2,"Eaux-de-vie","Avec quel fruit fait-on le calvados ?","La pomme",["La poire","La prune","Le raisin"],"Le calvados est une eau-de-vie de cidre, produite en Normandie.",2);
m(2,"Date","Quel jour sort le Beaujolais nouveau ?","Le troisième jeudi de novembre",["Le 1er janvier","Le 11 novembre","Le dernier vendredi d'octobre"],"Il sort le troisième jeudi de novembre, quelques semaines seulement après les vendanges.",2);
m(2,"Apéritif","Quelle plante donne son goût au pastis ?","L'anis",["La menthe","Le citron","La violette"],"Le pastis est un apéritif de Provence à base d'anis et de réglisse, que l'on dilue avec de l'eau.",2);
m(2,"Histoire","Quel moine bénédictin de l'abbaye d'Hautvillers est célèbre pour son travail sur le champagne ?","Dom Pérignon",["Dom Pernod","Dom Ricard","Frère Jacques"],"Dom Pierre Pérignon (1638-1715) a perfectionné l'assemblage des vins de Champagne. Une grande cuvée porte son nom.",3);
m(2,"Boissons","Avec quelle boisson traditionnelle de Bretagne et de Normandie sert-on les crêpes ?","Le cidre",["Le vin blanc sec","La bière blonde","Le pastis"],"Le cidre, fait de jus de pommes fermenté, accompagne traditionnellement les crêpes et les galettes.",1);
vf(2,"Le champagne devient mousseux grâce à une seconde fermentation en bouteille.",true,"C'est la méthode champenoise : une seconde fermentation en bouteille crée les bulles.",2);
vf(2,"Le vignoble de Bordeaux se trouve en Alsace.",false,"Bordeaux est dans le Sud-Ouest, en Gironde. L'Alsace est connue pour le riesling et le gewurztraminer.",1);
ty(2,"Dans quelle région de l'Est produit-on le vin mousseux de Reims et d'Épernay ?",["Champagne","La Champagne"],"La Champagne.",1);
ty(2,"De quel fruit le calvados est-il l'eau-de-vie ?",["Pomme","La pomme","Pommes","Les pommes"],"Le calvados est une eau-de-vie de cidre, donc de pomme.",2);

// ===================== 3. Pâtisseries & desserts =====================
m(3,"Fruit","Quel fruit est caramélisé dans la tarte Tatin ?","La pomme",["La poire","La pêche","La prune"],"La tarte Tatin se cuit à l'envers : les pommes caramélisées sont recouvertes de pâte, puis la tarte est retournée.",1);
m(3,"Ingrédient","Quel ingrédient est à la base des macarons ?","La poudre d'amande",["La farine de blé","La noisette entière","La farine de maïs"],"Les coques sont faites de poudre d'amande, de sucre glace et de blancs d'œufs.",2);
m(3,"Texture","Qu'est-ce qui donne au croissant sa texture feuilletée ?","Le beurre",["L'huile","Le miel","La crème"],"La pâte à croissant est feuilletée avec beaucoup de beurre et pliée plusieurs fois (tourage).",1);
m(3,"Pâte","Quel gâteau allongé en pâte à choux, fourré de crème et glacé, est un grand classique ?","L'éclair",["Le mille-feuille","Le savarin","La religieuse"],"L'éclair se fait en pâte à choux, souvent garni de crème pâtissière au chocolat ou au café.",1);
m(3,"Histoire","Pourquoi le Paris-Brest a-t-il la forme d'une roue ?","Il rend hommage à la course cycliste Paris-Brest",["Il rend hommage à une roue de moulin","Il rappelle une pièce de monnaie","Il rappelle un phare breton"],"Créé en 1910 par un pâtissier de Maisons-Laffitte pour la course cycliste Paris-Brest-Paris. Sa forme de roue évoque une roue de vélo.",2);
m(3,"Spécialités","De quelle ville est originaire le canelé, petit gâteau au rhum et à la vanille ?","Bordeaux",["Lyon","Nancy","Strasbourg"],"Le canelé bordelais a une croûte caramélisée et un cœur moelleux.",2);
m(3,"Tradition","Quelle pâtisserie contient une fève cachée et se mange début janvier ?","La galette des rois",["La bûche de Noël","Le gâteau basque","Le far breton"],"On mange la galette des rois à l'Épiphanie, le 6 janvier. Celui qui trouve la fève devient roi ou reine.",1);
m(3,"Littérature","Quel écrivain a rendu la madeleine célèbre dans À la recherche du temps perdu ?","Marcel Proust",["Victor Hugo","Émile Zola","Gustave Flaubert"],"Dans Du côté de chez Swann, le goût d'une madeleine trempée dans du thé fait ressurgir les souvenirs du narrateur.",2);
m(3,"Dessert","Qu'est-ce qui forme la croûte de la crème brûlée ?","Du sucre caramélisé",["Du blanc d'œuf cuit","De la pâte feuilletée","Du chocolat fondu"],"On saupoudre de sucre la crème prise, puis on le caramélise avec un chalumeau ou sous le gril.",1);
vf(3,"La pâte à choux sert à faire les éclairs et les profiteroles.",true,"La pâte à choux sert aussi à faire les choux à la crème, les religieuses et le Paris-Brest.",1);
vf(3,"Le canelé est une spécialité de Lyon.",false,"Le canelé est une spécialité de Bordeaux.",2);
ty(3,"Comment s'appelle le gâteau que l'on mange à l'Épiphanie ?",["Galette des rois","La galette des rois","Galette"],"La galette des rois, avec sa fève.",1);
ty(3,"Quel écrivain a immortalisé la madeleine dans À la recherche du temps perdu ?",["Proust","Marcel Proust"],"Marcel Proust.",2);

// ===================== 4. Cuisine des régions =====================
m(4,"Plat","De quelle ville vient la bouillabaisse, soupe de poissons de Méditerranée ?","Marseille",["Nice","Toulon","Perpignan"],"La bouillabaisse est une spécialité de Marseille, préparée avec plusieurs poissons de roche, safran et rouille.",1);
m(4,"Plat","De quelle région vient la choucroute garnie ?","L'Alsace",["La Bretagne","Le Languedoc","Le Limousin"],"La choucroute garnie associe chou fermenté, saucisses et charcuteries.",1);
m(4,"Plat","Dans quelle région du Sud de la France mange-t-on le cassoulet ?","Le Languedoc",["La Normandie","L'Alsace","La Champagne"],"Le cassoulet est un ragoût de haricots blancs, de saucisse et de confit de canard, de Castelnaudary, Carcassonne ou Toulouse.",2);
m(4,"Plat","Quelle région a donné son nom à une tarte salée aux lardons et à la crème ?","La Lorraine",["La Savoie","La Bretagne","Le Berry"],"La quiche lorraine se prépare avec des œufs, de la crème et des lardons. La recette d'origine ne contient pas de fromage.",1);
m(4,"Plat","De quelle ville vient la ratatouille ?","Nice",["Bordeaux","Lille","Strasbourg"],"La ratatouille niçoise réunit tomates, courgettes, aubergines et poivrons.",2);
m(4,"Ingrédient","Avec quelle farine prépare-t-on les galettes bretonnes salées ?","Le sarrasin",["Le maïs","Le seigle","La châtaigne"],"La galette de sarrasin (blé noir) se garnit d'œuf, jambon et fromage : la fameuse « complète ».",2);
m(4,"Plat","Quel plat est cuisiné avec du vin rouge de Bourgogne ?","Le bœuf bourguignon",["La blanquette de veau","Le pot-au-feu","Le poulet basquaise"],"Le bœuf bourguignon mijote longuement avec du vin rouge, des lardons, des oignons et des champignons.",1);
m(4,"Ville","Quelle ville est surnommée « la capitale de la gastronomie » ?","Lyon",["Marseille","Toulouse","Lille"],"Lyon est célèbre pour ses « bouchons », ses quenelles et ses grands chefs.",2);
m(4,"Plat","Comment prépare-t-on traditionnellement les escargots de Bourgogne ?","Au beurre persillé et à l'ail",["À la crème et au curry","Au miel et à la moutarde","Au fromage fondu"],"Les escargots de Bourgogne sont cuits au four avec du beurre, de l'ail et du persil.",2);
vf(4,"Le cassoulet se prépare avec des haricots blancs.",true,"Les haricots blancs (lingots ou tarbais) en sont l'ingrédient de base.",1);
vf(4,"La bouillabaisse est une spécialité de Strasbourg.",false,"La bouillabaisse est de Marseille. Strasbourg, c'est plutôt la choucroute ou la tarte flambée.",1);
ty(4,"Dans quelle ville est née la bouillabaisse ?",["Marseille"],"Marseille.",1);
ty(4,"De quelle région vient la choucroute ?",["Alsace","L'Alsace"],"L'Alsace.",1);

// ===================== 5. Chefs & gastronomie =====================
m(5,"Guide","Quelle entreprise de pneumatiques a publié son premier guide en 1900 ?","Michelin",["Goodyear","Pirelli","Bridgestone"],"Le Guide Michelin a d'abord été publié pour aider les automobilistes. Il distribue aujourd'hui les célèbres étoiles.",1);
m(5,"Guide","Quel est le nombre maximum d'étoiles du Guide Michelin ?","Trois",["Cinq","Quatre","Sept"],"Une étoile est une très bonne table, deux étoiles méritent le détour, trois étoiles valent le voyage.",1);
m(5,"Chefs","Quel chef lyonnais, mort en 2018, était surnommé « le pape de la gastronomie française » ?","Paul Bocuse",["Alain Ducasse","Joël Robuchon","Guy Savoy"],"Paul Bocuse (1926-2018) a eu trois étoiles Michelin pendant plus de 50 ans, à l'Auberge du Pont de Collonges.",2);
m(5,"Chefs","Quel chef a organisé la brigade de cuisine moderne et écrit le Guide culinaire en 1903 ?","Auguste Escoffier",["Marie-Antoine Carême","Vatel","Bernard Loiseau"],"Auguste Escoffier (1846-1935) a réorganisé les cuisines en brigade, avec chef de partie, saucier, etc.",3);
m(5,"UNESCO","Quel élément de la gastronomie a été inscrit au patrimoine culturel immatériel de l'UNESCO en 2022 ?","La baguette de pain",["Le croissant","Le camembert","La crêpe"],"Le savoir-faire artisanal et la culture de la baguette de pain ont été inscrits par l'UNESCO en 2022.",2);
m(5,"UNESCO","En 2010, l'UNESCO a inscrit un repas particulier au patrimoine immatériel. Lequel ?","Le repas gastronomique des Français",["Le repas de Noël","Le pique-nique","Le réveillon du Nouvel An"],"Le repas gastronomique des Français a été inscrit en 2010 : il suit un ordre précis, avec apéritif, entrée, plat, fromage et dessert.",2);
m(5,"Cuisine","Comment appelle-t-on l'équipe des cuisiniers d'un grand restaurant ?","La brigade",["La troupe","Le clan","L'escadron"],"On parle de « brigade de cuisine », dirigée par le chef.",2);
m(5,"Concours","Dans quelle ville a lieu le concours de cuisine créé par Paul Bocuse en 1987 ?","Lyon",["Paris","Marseille","Bordeaux"],"Le Bocuse d'Or est un concours mondial de cuisine qui a lieu à Lyon, lors du salon Sirha.",3);
m(5,"Titre","Quel titre d'artisan est reconnu par un col bleu-blanc-rouge ?","Meilleur Ouvrier de France",["Chef étoilé","Maître Cuisinier","Artisan du Bien Manger"],"Les lauréats du concours « Un des Meilleurs Ouvriers de France » portent un col tricolore sur leur veste.",3);
vf(5,"Le Guide Michelin attribue au maximum trois étoiles.",true,"Une, deux ou trois étoiles.",1);
vf(5,"Paul Bocuse était un chef lyonnais.",true,"Né à Collonges-au-Mont-d'Or, près de Lyon, il y a tenu son restaurant toute sa vie.",2);
ty(5,"Combien d'étoiles maximum le Guide Michelin peut-il attribuer à un restaurant ?",["3","Trois","trois"],"Trois étoiles.",1);
ty(5,"Quel chef lyonnais, mort en 2018, était surnommé « le pape de la gastronomie » ?",["Paul Bocuse","Bocuse"],"Paul Bocuse.",2);

// ===================== 6. Fêtes & traditions =====================
m(6,"Fêtes","Quel jour mange-t-on traditionnellement des crêpes ?","La Chandeleur, le 2 février",["Le 1er avril","Le 14 juillet","Le 11 novembre"],"À la Chandeleur, il est de tradition de faire sauter les crêpes, une pièce dans la main.",1);
m(6,"Fêtes","Quel événement de 1789 la fête nationale du 14 juillet rappelle-t-elle ?","La prise de la Bastille",["Le sacre de Napoléon","La Libération de Paris","La proclamation de la Ve République"],"Le 14 juillet 1789, les Parisiens prennent la Bastille, symbole du pouvoir royal. La fête nationale est instituée en 1880.",1);
m(6,"Fêtes","Quel dessert en forme de tronc d'arbre est servi à Noël ?","La bûche de Noël",["La galette des rois","Le Paris-Brest","Le gâteau basque"],"La bûche de Noël rappelle la bûche qu'on brûlait dans la cheminée.",1);
m(6,"Fêtes","Quel jour de l'année célèbre-t-on la fête de la musique ?","Le 21 juin",["Le 1er mai","Le 14 juillet","Le 31 décembre"],"Créée en 1982 sous l'impulsion du ministre de la Culture Jack Lang, elle a lieu le jour du solstice d'été.",2);
m(6,"Fêtes","Que s'offre-t-on traditionnellement le 1er mai ?","Du muguet",["Des roses rouges","Des chocolats","Des tulipes"],"Le brin de muguet est un porte-bonheur offert le 1er mai.",1);
m(6,"Sport","Quelle couleur de maillot porte le leader du Tour de France ?","Jaune",["Vert","À pois rouges","Blanc"],"Le maillot jaune est porté par le leader du classement général depuis 1919.",1);
m(6,"Sport","En quelle année a eu lieu le premier Tour de France ?","1903",["1889","1924","1936"],"Le premier Tour a eu lieu en 1903, à l'initiative du journal L'Auto.",3);
m(6,"Jeux","Dans quel jeu lance-t-on des boules vers un cochonnet ?","La pétanque",["Le curling","Le bowling","Le croquet"],"La pétanque est née à La Ciotat en 1907 et est très populaire dans le Sud.",1);
m(6,"Fêtes","Quel repas a lieu le soir du 24 décembre ?","Le réveillon",["Le goûter","La collation","Le brunch"],"Le réveillon de Noël est le grand repas du 24 au soir.",1);
m(6,"Fêtes","Combien de desserts traditionnels sont servis pour le grand repas de Noël en Provence ?","Treize",["Sept","Dix","Douze"],"Ils rappellent Jésus et les douze apôtres, et comptent des fruits secs, des fruits frais, des nougats et des pompes à l'huile.",3);
vf(6,"Le 1er avril, on fait des poissons d'avril.",true,"C'est la tradition des farces et des poissons en papier accrochés dans le dos.",1);
vf(6,"La fête de la musique a lieu le 21 juin.",true,"Le jour du solstice d'été.",2);
ty(6,"Quel dessert mange-t-on à la Chandeleur ?",["Crêpes","Des crêpes","Les crêpes","Crêpe","La crêpe"],"Les crêpes.",1);
ty(6,"Quelle couleur est le maillot du leader du Tour de France ?",["Jaune","Le jaune"],"Le maillot jaune.",1);
// ===================== Questions supplémentaires =====================
// ---- Fromages
m(1,"Origine","Dans quelle région fabrique-t-on le chaource ?","La Champagne",["La Provence","La Bretagne","L'Aquitaine"],"Le chaource est un fromage à pâte molle de l'Aube, en Champagne.",3);
m(1,"Origine","De quelle région vient le maroilles, fromage à croûte lavée très odorant ?","Le Nord",["La Corse","Le Pays basque","La Savoie"],"Le maroilles vient de la Thiérache, dans le Nord et l'Aisne.",3);
m(1,"Lait","Avec quel lait fait-on la plupart des fromages de type brie ?","Du lait de vache",["Du lait de chèvre","Du lait de brebis","Du lait de jument"],"Le brie est un fromage à pâte molle au lait de vache.",1);
m(1,"Plat","Quel fromage fondu se mange avec des pommes de terre, de la charcuterie et des cornichons ?","La raclette",["Le roquefort","Le chèvre frais","Le cantal"],"La raclette est un fromage savoyard et suisse que l'on fait fondre et racler.",1);
m(1,"Plat","Quel fromage est traditionnellement utilisé dans la fondue savoyarde ?","Le beaufort, le comté et l'emmental",["Le roquefort seul","Le camembert","Le chèvre frais"],"La fondue savoyarde mélange en général beaufort, comté et emmental de Savoie.",2);
m(1,"Origine","Quelle région est connue pour le fromage de chèvre Sainte-Maure ?","La Touraine",["L'Alsace","La Corse","La Savoie"],"Le sainte-maure-de-touraine est un fromage de chèvre en forme de bûche.",3);
m(1,"Origine","De quelle île vient le fromage corse brocciu ?","La Corse",["La Sardaigne","La Sicile","L'île de Ré"],"Le brocciu est un fromage corse au petit-lait de brebis ou de chèvre.",3);
m(1,"Texture","Comment appelle-t-on la couche blanche et moelleuse qui recouvre le camembert ?","La croûte fleurie",["La croûte lavée","La croûte cirée","La croûte noire"],"Elle est due à une moisissure blanche, Penicillium candidum.",2);
m(1,"Origine","Quel fromage à pâte persillée vient d'Auvergne ?","Le bleu d'Auvergne",["Le morbier","Le mont-d'or","Le tome de Savoie"],"Le bleu d'Auvergne a été inventé au XIXe siècle par Antoine Roussel.",2);
m(1,"Origine","Dans quelle région fabrique-t-on l'ossau-iraty ?","Le Pays basque et le Béarn",["La Normandie","La Lorraine","La Picardie"],"L'ossau-iraty est un fromage de brebis des Pyrénées.",3);
m(1,"Culture","Quel est le nom du fromage frais très crémeux de Normandie souvent mangé avec du sucre ou des fruits ?","Le petit-suisse",["Le brie","Le comté","Le morbier"],"Le petit-suisse est né en Normandie vers 1850.",3);
vf(1,"Le comté est un fromage au lait de vache.",true,"Le comté est un fromage au lait cru de vache, affiné au moins quatre mois.",1);
vf(1,"Le brie de Meaux est fabriqué avec du lait de chèvre.",false,"Le brie de Meaux est au lait de vache.",2);
vf(1,"La raclette est un fromage et aussi un plat.",true,"Le mot désigne à la fois le fromage et le repas où on le fait fondre.",1);
ty(1,"Quel fromage savoyard sert pour la tartiflette ?",["Reblochon","Le reblochon"],"Le reblochon.",2);
ty(1,"Dans quelle région fabrique-t-on le comté (massif montagneux) ?",["Jura","Le Jura","Franche-Comté"],"Dans le Jura et en Franche-Comté.",3);
// ---- Vins
m(2,"Régions","Dans quelle région produit-on le vin de Sancerre et de Pouilly-Fumé ?","La vallée de la Loire",["La Bourgogne","L'Alsace","La Provence"],"Sancerre et Pouilly-Fumé sont des vins blancs du Val de Loire, faits de sauvignon.",3);
m(2,"Cépages","Quel cépage blanc est, avec le gewurztraminer, le grand cépage de l'Alsace ?","Le riesling",["Le merlot","Le malbec","Le tannat"],"Le riesling est le cépage vedette de l'Alsace.",2);
m(2,"Régions","Quelle région produit le vin Châteauneuf-du-Pape ?","La vallée du Rhône",["La Champagne","La Bourgogne","Le Bordelais"],"Châteauneuf-du-Pape est un vin rouge du sud de la vallée du Rhône.",3);
m(2,"Régions","Dans quelle région est produit le vin rosé de Bandol et de Cassis ?","La Provence",["L'Alsace","La Normandie","La Bretagne"],"La Provence est la première région productrice de rosé.",2);
m(2,"Boissons","Quelle boisson est faite avec du jus de pomme fermenté ?","Le cidre",["Le vin","La bière","Le porto"],"Le cidre est typique de la Bretagne et de la Normandie.",1);
m(2,"Boissons","Quelle boisson est un vin mousseux de Bourgogne, fait avec du pinot noir et du chardonnay ?","Le crémant de Bourgogne",["Le champagne","Le rosé d'Anjou","Le Beaujolais"],"Le crémant est un vin pétillant produit hors de Champagne.",3);
m(2,"Eaux-de-vie","Quelle eau-de-vie de Gascogne est considérée comme la plus ancienne de France ?","L'armagnac",["Le cognac","Le calvados","Le marc"],"L'armagnac est la plus ancienne eau-de-vie de France.",3);
m(2,"Boissons","Quelle bière est typiquement produite dans le Nord de la France ?","La bière de garde",["Le porter","Le stout","La pils tchèque"],"La bière de garde est une bière ambrée du Nord.",3);
m(2,"Boissons","Quel est le nom de l'eau minérale française réputée, qui est gazeuse, du Gard ?","Perrier",["Evian","Volvic","Vittel"],"Perrier vient de Vergèze, dans le Gard.",2);
m(2,"Boissons","Quelle eau minérale vient des Alpes, du lac Léman ?","Evian",["Perrier","Vittel","Badoit"],"Evian vient d'Évian-les-Bains en Haute-Savoie.",2);
m(2,"Dégustation","Comment appelle-t-on le spécialiste qui conseille les vins dans un restaurant ?","Un sommelier",["Un barista","Un maître d'hôtel","Un caviste"],"Le sommelier choisit et sert les vins.",1);
m(2,"Dégustation","Comment appelle-t-on un magasin spécialisé dans la vente de vins ?","Une cave",["Une brasserie","Une cantine","Une boucherie"],"Le vendeur s'appelle un caviste.",1);
vf(2,"Le vin rosé est fait en mélangeant du vin rouge et du vin blanc.",false,"En général, le rosé est fait avec du raisin rouge dont la peau reste peu de temps en contact avec le jus.",2);
vf(2,"Le cognac est une eau-de-vie de vin.",true,"Elle est distillée deux fois puis vieillie en fûts de chêne.",2);
vf(2,"La Bourgogne produit du vin blanc de chardonnay.",true,"Le chablis, le meursault et le montrachet sont tous des chardonnays.",2);
ty(2,"Comment s'appelle le spécialiste des vins dans un restaurant ?",["Sommelier","Le sommelier","Un sommelier"],"Le sommelier.",1);
ty(2,"Dans quelle région produit-on le cognac ? (région ou département)",["Charente","La Charente","Charente-Maritime","Poitou-Charentes"],"Autour de Cognac, en Charente.",3);
// ---- Pâtisseries
m(3,"Gâteau","Quelle pâtisserie est composée de trois couches de pâte feuilletée et de crème pâtissière ?","Le mille-feuille",["Le saint-honoré","Le fraisier","Le baba au rhum"],"Le mille-feuille est un dessert classique, glacé en damier.",2);
m(3,"Gâteau","Quelle petite pâtisserie en forme de barque est garnie de crème et de fruits ?","La barquette",["Le chausson","Le beignet","La gaufre"],"La barquette est une petite pâte sablée en forme de barque, garnie de crème et de fruits.",1);
m(3,"Gâteau","Quel gâteau est couronné de choux garnis de crème, avec du caramel ?","Le saint-honoré",["Le baba au rhum","Le fraisier","L'opéra"],"Le saint-honoré porte le nom du saint patron des boulangers et pâtissiers.",3);
m(3,"Gâteau","Quel gâteau parisien est composé de biscuit joconde, de crème au beurre au café et de ganache ?","L'opéra",["Le fraisier","Le paris-brest","La forêt-noire"],"L'opéra est recouvert d'un glaçage au chocolat.",3);
m(3,"Gâteau","Quel dessert se compose d'un biscuit imbibé de rhum et de crème chantilly ?","Le baba au rhum",["Le clafoutis","Le financier","La tarte au citron"],"Le baba au rhum est imbibé de sirop et de rhum.",2);
m(3,"Gâteau","Quelle tarte est faite avec des cerises noires dans une pâte à crêpes ?","Le clafoutis",["Le far breton","La tarte Tatin","Le kouign-amann"],"Le clafoutis est une spécialité du Limousin.",2);
m(3,"Gâteau","Quel gâteau breton est fait de pâte feuilletée, de beurre et de sucre ?","Le kouign-amann",["Le far breton","Le pain d'épices","La galette"],"« Kouign-amann » veut dire « gâteau au beurre » en breton.",2);
m(3,"Dessert","Quel dessert est fait avec des blancs d'œufs battus en neige et de la crème anglaise ?","L'île flottante",["La mousse au chocolat","Le flan","Le riz au lait"],"L'île flottante est un dessert de blancs en neige sur crème anglaise.",2);
m(3,"Dessert","Quelle pâtisserie est faite avec une pâte sablée et une crème au citron meringuée ?","La tarte au citron meringuée",["La tarte aux pommes","La tarte tropézienne","Le clafoutis"],"Une meringue légèrement dorée recouvre la crème au citron.",1);
m(3,"Viennoiserie","Quelle viennoiserie fourrée au chocolat est aussi appelée « chocolatine » dans le Sud-Ouest ?","Le pain au chocolat",["Le croissant","Le chausson aux pommes","La brioche"],"Le débat « pain au chocolat ou chocolatine » divise les Français.",1);
m(3,"Dessert","Quelle brioche fourrée de crème, liée à Brigitte Bardot, vient de Saint-Tropez ?","La tarte tropézienne",["Le baba au rhum","L'opéra","La charlotte"],"La tarte tropézienne est une brioche fourrée de crème, créée dans les années 1950.",3);
m(3,"Confiserie","Quelle ville est célèbre pour ses bergamotes (bonbons) ?","Nancy",["Lille","Toulouse","Nantes"],"Les bergamotes de Nancy sont des bonbons à la bergamote.",3);
m(3,"Confiserie","Quelle ville est connue pour ses calissons ?","Aix-en-Provence",["Marseille","Montpellier","Avignon"],"Les calissons d'Aix sont faits d'amandes et de melon confit.",2);
vf(3,"Le croissant a été inventé en France.",false,"Le croissant vient de Vienne (le kipferl) et est arrivé à Paris au XIXe siècle.",3);
vf(3,"La mousse au chocolat se prépare avec des œufs.",true,"Les blancs sont battus en neige et mélangés au chocolat fondu.",1);
vf(3,"Le macaron français est fait avec de la noix de coco.",false,"Les macarons parisiens sont à base d'amandes. Le rocher coco est un autre gâteau.",2);
ty(3,"Comment appelle-t-on le gâteau breton « au beurre » ?",["Kouign-amann","Kouign amann"],"Le kouign-amann.",3);
ty(3,"Quel dessert est un gâteau imbibé de rhum ?",["Baba au rhum","Le baba au rhum","Baba"],"Le baba au rhum.",2);
// ---- Régions
m(4,"Plat","Quel plat est fait avec des pommes de terre, du lard et des oignons fondus avec du reblochon ?","La tartiflette",["La potée","Le pot-au-feu","La blanquette"],"La tartiflette est un plat de Savoie, inventé dans les années 1980.",1);
m(4,"Plat","Quel plat alsacien est une fine tarte à la crème fraîche, aux oignons et aux lardons ?","La flammekueche",["La quiche lorraine","La pissaladière","La galette"],"La flammekueche, ou tarte flambée, est cuite au four à bois.",2);
m(4,"Plat","Quelle ville du Sud-Est est connue pour la pissaladière, tarte aux oignons et aux anchois ?","Nice",["Strasbourg","Rennes","Reims"],"La pissaladière est une spécialité niçoise.",2);
m(4,"Plat","Quel plat du Sud-Ouest se prépare avec du canard confit ?","Le cassoulet",["La bouillabaisse","La choucroute","La raclette"],"Le confit de canard fait partie de la recette du cassoulet.",2);
m(4,"Plat","Quel plat du Sud-Ouest est fait avec du foie gras ?","Le foie gras poêlé",["La ratatouille","La tartiflette","La fondue"],"Le foie gras est une spécialité du Périgord et de la Gascogne.",2);
m(4,"Plat","Quel plat est fait avec des moules et des frites ?","Les moules-frites",["La bouillabaisse","Le couscous","La raclette"],"Les moules-frites sont très populaires dans le Nord et en Belgique.",1);
m(4,"Plat","Quelle sauce du Sud-Est est faite d'ail, d'œuf et d'huile d'olive ?","L'aïoli",["La béarnaise","La hollandaise","La rouille"],"L'aïoli est une sauce provençale.",2);
m(4,"Plat","Dans quelle région mange-t-on la potée auvergnate ?","L'Auvergne",["La Normandie","La Corse","La Bretagne"],"La potée est un plat mijoté de légumes et de viande de porc.",2);
m(4,"Plat","Quel plat est cuisiné avec des escargots, du beurre et de l'ail ?","Les escargots à la bourguignonne",["Les cuisses de grenouille","Le pot-au-feu","Les crêpes"],"C'est le plat de Bourgogne le plus connu à l'international.",1);
m(4,"Plat","Quelle ville du Nord de la France est connue pour sa carbonade flamande et ses moules ?","Lille",["Nice","Marseille","Strasbourg"],"Lille est la capitale des Flandres françaises.",3);
m(4,"Plat","Dans quelle ville mange-t-on la célèbre andouillette AAAAA ?","Troyes",["Nantes","Biarritz","Colmar"],"L'andouillette de Troyes est célèbre. L'AAAAA est une association d'amateurs.",3);
m(4,"Plat","Quel est l'ingrédient principal du couscous ?","La semoule",["Le riz","Le blé noir","Les pâtes"],"Le couscous est un plat d'origine maghrébine, très populaire en France.",1);
m(4,"Plat","Quel plat est fait de tranches de pommes de terre cuites au four avec de la crème et de l'ail ?","Le gratin dauphinois",["Les frites","La purée","La tartiflette"],"Le gratin dauphinois vient du Dauphiné. La recette traditionnelle ne contient pas de fromage.",2);
vf(4,"La ratatouille est un plat à base de légumes.",true,"Tomates, courgettes, aubergines, poivrons et oignons.",1);
vf(4,"La choucroute se prépare avec des pommes de terre sautées au beurre.",false,"La choucroute est du chou fermenté, souvent servi avec des pommes de terre bouillies.",2);
vf(4,"La flammekueche est une spécialité d'Alsace.",true,"On l'appelle aussi tarte flambée.",1);
ty(4,"Quelle ville est célèbre pour la pissaladière ?",["Nice"],"Nice.",2);
ty(4,"Quel plat se compose de semoule, de légumes et de viande ou de poisson ?",["Couscous","Le couscous"],"Le couscous.",1);
// ---- Chefs
m(5,"Chefs","Quel chef français a réformé la cuisine du XIXe siècle et est surnommé « le roi des cuisiniers » ?","Marie-Antoine Carême",["Auguste Escoffier","Paul Bocuse","Vatel"],"Carême (1784-1833) fut cuisinier de Talleyrand et du tsar.",3);
m(5,"Chefs","Quel chef est célèbre pour ses purées et a eu le plus d'étoiles Michelin au monde ?","Joël Robuchon",["Alain Ducasse","Paul Bocuse","Pierre Gagnaire"],"Joël Robuchon (1945-2018) a cumulé 32 étoiles à son apogée.",3);
m(5,"Chefs","Quel chef français est aussi un animateur de télé connu pour Top Chef ?","Philippe Etchebest",["Paul Bocuse","Joël Robuchon","Michel Guérard"],"Philippe Etchebest est juré de Top Chef, et chef de Cauchemar en cuisine.",2);
m(5,"Émission","Quelle émission de M6 fait concourir des pâtissiers amateurs, avec Cyril Lignac comme juré ?","Le Meilleur Pâtissier",["Top Chef","MasterChef","Koh-Lanta"],"Le Meilleur Pâtissier est présenté sur M6.",2);
m(5,"Cuisine","Que signifie « mise en place » en cuisine ?","La préparation des ingrédients avant le service",["Le nettoyage de la cuisine","Le service des plats","La liste des courses"],"C'est l'organisation et la préparation de tout ce qui servira pendant le service.",2);
m(5,"Cuisine","Que veut dire « al dente » ?","Cuit mais encore ferme",["Très cuit","Cru","Grillé"],"Terme italien pour des pâtes cuites mais encore fermes.",2);
m(5,"Cuisine","Que signifie « flamber » en cuisine ?","Verser de l'alcool et y mettre le feu",["Cuire à la vapeur","Rôtir lentement","Congeler"],"On flambe une viande ou un dessert avec de l'alcool.",2);
m(5,"Cuisine","Quelle sauce mère est faite de beurre, de farine et de lait ?","La béchamel",["La hollandaise","La vinaigrette","La mayonnaise"],"La béchamel est l'une des cinq sauces mères.",2);
m(5,"Cuisine","Quel ustensile sert à fouetter les blancs en neige ?","Le fouet",["La louche","L'écumoire","Le rouleau"],"Le fouet sert à battre les blancs d'œufs en neige ou à mélanger une sauce.",1);
vf(5,"Joël Robuchon a reçu plus d'étoiles Michelin que n'importe quel chef.",true,"Joël Robuchon est le chef le plus étoilé de l'histoire du Guide.",3);
vf(5,"La béchamel est une sauce à base de lait.",true,"Beurre, farine et lait.",1);
vf(5,"Un maître d'hôtel est le chef de cuisine.",false,"Il dirige la salle, pas la cuisine.",2);
ty(5,"Quelle sauce blanche se prépare avec du beurre, de la farine et du lait ?",["Béchamel","La béchamel"],"La béchamel.",2);
ty(5,"Comment appelle-t-on la préparation des ingrédients avant le service ?",["Mise en place","La mise en place"],"La mise en place.",2);
// ---- Fêtes
m(6,"Fêtes","Que mange-t-on pour le réveillon du Nouvel An avec du champagne ?","Des huîtres et du foie gras",["Des crêpes","De la fondue","Du pot-au-feu"],"Huîtres et foie gras sont très présents sur les tables de fêtes.",1);
m(6,"Fêtes","Quel jour fête-t-on la Saint-Valentin ?","Le 14 février",["Le 1er janvier","Le 8 mars","Le 1er mai"],"La fête des amoureux a lieu le 14 février.",1);
m(6,"Fêtes","Quel jour de l'année célèbre-t-on la fin de la Première Guerre mondiale en France ?","Le 11 novembre",["Le 8 mai","Le 14 juillet","Le 1er novembre"],"Le 11 novembre 1918, l'armistice est signé à Rethondes.",1);
m(6,"Fêtes","Quel jour commémore-t-on la victoire de 1945 en Europe ?","Le 8 mai",["Le 11 novembre","Le 14 juillet","Le 15 août"],"Le 8 mai 1945 marque la fin de la guerre en Europe.",2);
m(6,"Fêtes","Quel jour de l'année fête-t-on les morts en France ?","Le 2 novembre",["Le 31 octobre","Le 1er janvier","Le 25 décembre"],"La Toussaint est le 1er novembre, et le jour des morts le 2.",2);
m(6,"Fêtes","Quelle fleur offre-t-on à la Toussaint ?","Le chrysanthème",["La rose","Le muguet","La tulipe"],"Les chrysanthèmes sont déposés sur les tombes.",2);
m(6,"Fêtes","Qui apporte traditionnellement les œufs de Pâques aux enfants en France ?","Les cloches",["Le lapin","Le renard","La poule"],"En France, ce sont les cloches qui reviennent de Rome.",2);
m(6,"Sport","Quelle ville accueille le tournoi de tennis de Roland-Garros ?","Paris",["Lyon","Marseille","Nice"],"Roland-Garros se joue sur terre battue, en mai-juin.",1);
m(6,"Sport","Quelle course automobile célèbre se déroule dans la Sarthe chaque année ?","Les 24 Heures du Mans",["Le Grand Prix de Monaco","Le Dakar","Les 500 miles d'Indianapolis"],"Les 24 Heures du Mans ont lieu depuis 1923.",2);
m(6,"Tradition","Quel animal figure sur le maillot de l'équipe de France de football ?","Le coq",["L'aigle","Le lion","L'ours"],"Le coq gaulois est un emblème de l'équipe de France.",2);
vf(6,"Le 14 juillet est la fête nationale française.",true,"Elle est célébrée avec un défilé militaire et des feux d'artifice.",1);
vf(6,"Les Français mangent traditionnellement des crêpes à la Saint-Valentin.",false,"C'est à la Chandeleur, le 2 février.",1);
vf(6,"La Toussaint est le 1er novembre.",true,"Le 1er novembre est un jour férié.",1);
ty(6,"Quel jour de novembre commémore l'armistice de 1918 ?",["11 novembre","Le 11 novembre","11"],"Le 11 novembre.",2);
ty(6,"Dans quelle ville se joue Roland-Garros ?",["Paris"],"Paris.",1);

// ===== More questions =====
m(1,"Origine","De quelle région vient le morbier, reconnaissable à sa raie noire ?","Le Jura (Franche-Comté)",["La Bretagne","La Provence","L'Alsace"],"La raie noire séparait autrefois le lait du matin et celui du soir.",2);
m(1,"Lait","Avec quel lait fabrique-t-on traditionnellement le banon ?","Du lait de chèvre",["Du lait de brebis","Du lait de vache","Du lait de bufflonne"],"Le banon, de Provence, est enveloppé dans des feuilles de châtaignier.",3);
m(1,"Origine","Quel fromage savoyard est utilisé pour la tartiflette ?","Le reblochon",["Le maroilles","Le munster","Le brie"],"La tartiflette associe reblochon, pommes de terre, lardons et oignons.",1);
m(1,"Origine","Quel fromage du Cantal est à l'origine de l'aligot ?","La tomme fraîche",["Le cantal affiné","Le roquefort","Le morbier"],"L'aligot est une purée de pommes de terre à la tomme fraîche de l'Aubrac.",3);
m(1,"Origine","Dans quelle ville est affiné le roquefort ?","Roquefort-sur-Soulzon",["Millau","Rodez","Albi"],"Le fromage est affiné dans des caves naturelles ouvertes par des fissures dans la roche.",2);
m(1,"Origine","Quel fromage à pâte persillée est fabriqué à Gex, dans l'Ain ?","Le bleu de Gex",["Le fourme d'Ambert","Le bleu des Causses","Le roquefort"],"Le bleu de Gex est un fromage du Haut-Jura.",3);
vf(1,"Le chèvre frais se mange souvent chaud sur une salade.",true,"Le chèvre chaud est un classique des bistrots français.",1);
vf(1,"Le gruyère est un fromage d'origine uniquement française.",false,"Il est aussi suisse, et le gruyère suisse porte une AOP.",2);
m(2,"Région","Dans quelle région est produit le vin de Chablis ?","La Bourgogne",["La Loire","L'Alsace","Le Bordelais"],"Le Chablis est un vin blanc sec fait avec du chardonnay.",2);
m(2,"Cépage","Quel cépage blanc donne le chablis ?","Le chardonnay",["Le sauvignon","Le riesling","Le chenin"],"Le chardonnay est aussi la base du champagne blanc de blancs.",2);
m(2,"Région","Quel vin de Provence est devenu très populaire en été ?","Le rosé",["Le vin jaune","Le muscat","Le crémant"],"La France est le premier consommateur de rosé au monde.",1);
m(2,"Région","De quelle région vient le vin jaune ?","Le Jura",["La Savoie","L'Alsace","La Loire"],"Le vin jaune vieillit au moins six ans et trois mois sous un voile de levures.",3);
m(2,"Boisson","Quel apéritif est une liqueur de cassis de Dijon ?","La crème de cassis",["Le Picon","Le Dubonnet","Le pineau"],"Mélangée avec du vin blanc, elle donne le kir.",2);
m(2,"Boisson","Quelle liqueur est fabriquée par des moines chartreux près de Grenoble ?","La Chartreuse",["La Bénédictine","Le Cointreau","Le Grand Marnier"],"La Chartreuse est fabriquée à partir de 130 plantes.",2);
m(2,"Boisson","Quel alcool d'Armagnac est produit dans le Sud-Ouest de la France ?","L'armagnac",["Le calvados","Le cognac","La mirabelle"],"L'armagnac est la plus ancienne eau-de-vie de France, avec une distillation en alambic.",2);
vf(2,"Le crémant d'Alsace est un vin effervescent.",true,"Il est élaboré selon la méthode traditionnelle, comme le champagne.",2);
vf(2,"Le sauternes est un vin rouge sec.",false,"Le sauternes est un vin blanc liquoreux du Bordelais.",2);
m(3,"Dessert","Quel dessert de Normandie mélange pommes, crème et calvados ?","La tarte normande",["Le far breton","Le clafoutis","Le kouign-amann"],"La tarte normande est une tarte aux pommes avec crème et calvados.",2);
m(3,"Dessert","De quelle région vient le kouign-amann ?","La Bretagne",["La Normandie","Le Nord","L'Alsace"],"Son nom breton signifie « gâteau au beurre ».",1);
m(3,"Dessert","Quel dessert est composé de fruits cuits dans une pâte à crêpe épaisse ?","Le clafoutis",["La charlotte","Le baba au rhum","Le paris-brest"],"Le clafoutis traditionnel du Limousin se fait avec des cerises.",2);
m(3,"Dessert","Comment appelle-t-on la petite meringue garnie de crème, spécialité de Paris ?","La religieuse",["Le saint-honoré","Le mille-feuille","Le fraisier"],"La religieuse est faite de deux choux superposés.",3);
m(3,"Dessert","De quelle ville vient la praline rose, ingrédient de la tarte du même nom ?","Lyon",["Marseille","Bordeaux","Strasbourg"],"La tarte aux pralines roses est une spécialité lyonnaise.",3);
m(3,"Dessert","Quel gâteau d'été est fait de génoise, de crème mousseline et de fraises ?","Le fraisier",["Le moka","Le saint-honoré","Le tiramisu"],"Le fraisier est un gâteau à la crème mousseline et aux fraises.",2);
m(3,"Dessert","Quel gâteau doit son nom à un saint patron des pâtissiers ?","Le saint-honoré",["Le paris-brest","La tarte Tatin","Le baba au rhum"],"Saint Honoré est le patron des boulangers et des pâtissiers.",2);
m(3,"Dessert","Dans quelle ville est née la tarte Tatin, d'après la légende ?","À Lamotte-Beuvron",["À Dijon","À Tours","À Colmar"],"Elle porte le nom des sœurs Tatin, qui tenaient un hôtel en Sologne.",3);
vf(3,"Le macaron français contient de la farine de blé.",false,"Le macaron se fait avec des amandes, du sucre et des blancs d'œufs, sans farine de blé.",3);
vf(3,"Les chouquettes sont faites avec de la pâte à choux.",true,"Elles sont parsemées de sucre en grains.",1);
m(4,"Régions","De quelle région vient la flamiche, tarte aux poireaux ?","Les Hauts-de-France",["La Provence","La Bretagne","L'Alsace"],"La flamiche est une spécialité du Nord et de la Picardie.",3);
m(4,"Régions","Quelle ville est célèbre pour ses andouillettes et sa moutarde ?","Dijon (la moutarde)",["Lyon","Bordeaux","Nantes"],"La moutarde de Dijon est un symbole de la gastronomie bourguignonne.",2);
m(4,"Régions","Quel plat provençal est fait avec de l'ail, de l'huile d'olive et des œufs, servi avec des légumes ?","L'aïoli",["La brandade","La ratatouille","La pissaladière"],"L'aïoli est une sauce provençale à l'ail et à l'huile d'olive.",2);
m(4,"Régions","Quelle spécialité de Nîmes est faite avec de la morue ?","La brandade",["La bouillabaisse","Le cassoulet","La tapenade"],"La brandade de morue est mijotée avec de l'huile d'olive.",3);
m(4,"Régions","De quelle région vient le magret de canard ?","Le Sud-Ouest",["La Normandie","L'Alsace","La Bretagne"],"Le canard est une spécialité gasconne.",2);
m(4,"Régions","Quelle spécialité alsacienne est une pâte à pain fine, garnie de crème, d'oignons et de lardons ?","La flammekueche",["La choucroute","Le baeckeoffe","Le kougelhopf"],"On l'appelle aussi tarte flambée.",2);
m(4,"Régions","Quelle spécialité savoyarde est une fondue au fromage ?","La fondue savoyarde",["La raclette","La tartiflette","Le gratin dauphinois"],"Elle est faite de plusieurs fromages, comme le comté, le beaufort et l'emmental.",1);
vf(4,"Le gratin dauphinois est une spécialité du Dauphiné.",true,"Le gratin dauphinois est fait de pommes de terre, de crème et d'ail.",1);
vf(4,"La quiche lorraine contient du fromage de chèvre.",false,"La quiche lorraine traditionnelle contient des lardons, des œufs et de la crème, sans fromage.",3);
m(5,"Chefs","Quel chef français a fondé un groupe de restaurants dans le monde, dont le Plaza Athénée à Paris et Le Louis XV à Monaco ?","Alain Ducasse",["Joël Robuchon","Pierre Gagnaire","Anne-Sophie Pic"],"Alain Ducasse a dirigé des restaurants trois étoiles à Monaco, à Paris et à New York.",3);
m(5,"Chefs","Quelle chef est la seule femme française à avoir trois étoiles au Guide Michelin à Valence ?","Anne-Sophie Pic",["Hélène Darroze","Dominique Crenn","Nadia Sammut"],"Anne-Sophie Pic dirige la Maison Pic à Valence.",3);
m(5,"Chefs","Quel chef français est surnommé le « chef du siècle » par Gault et Millau ?","Joël Robuchon",["Paul Bocuse","Alain Ducasse","Guy Savoy"],"Joël Robuchon a obtenu 32 étoiles Michelin au total.",3);
m(5,"Gastronomie","Quelle émission française de cuisine, diffusée depuis 2010, voit des amateurs s'affronter ?","Le Meilleur Pâtissier",["Top Chef","Cauchemar en cuisine","Masterchef"],"Le Meilleur Pâtissier est diffusé sur M6.",2);
m(5,"Gastronomie","Comment appelle-t-on la taille précise des légumes en petits cubes ?","La brunoise",["La julienne","La chiffonnade","La mirepoix"],"La brunoise est une découpe en dés de 1 à 3 mm.",3);
m(5,"Gastronomie","Quelle technique de cuisson consiste à saisir un aliment dans un peu de matière grasse très chaude ?","Sauter",["Pocher","Braiser","Confire"],"On fait sauter un aliment dans une poêle à feu vif.",2);
m(5,"Gastronomie","Quelle sauce mère française est une émulsion de beurre, d'œufs et de citron ?","La sauce hollandaise",["La sauce béchamel","La sauce velouté","La sauce espagnole"],"La hollandaise accompagne les asperges ou les œufs Bénédicte.",2);
vf(5,"Le terme « sommelier » désigne un spécialiste du vin au restaurant.",true,"Le sommelier conseille le vin et gère la cave.",1);
vf(5,"Les étoiles Michelin ont été créées pour guider les automobilistes.",true,"Le guide a été créé en 1900 par Michelin pour encourager les voyages en voiture.",2);
m(6,"Traditions","Quel dessert mange-t-on traditionnellement à Pâques ?","Les œufs en chocolat",["Les crêpes","La bûche","Les marrons glacés"],"Les cloches rapportent les œufs de Rome, selon la tradition.",1);
m(6,"Traditions","Quelle fête a lieu le 11 novembre en France ?","L'Armistice de 1918",["La Toussaint","La fête de la Victoire","L'Assomption"],"C'est un jour férié depuis 1922.",1);
m(6,"Traditions","Combien de jours dure le Tour de France environ ?","Trois semaines",["Une semaine","Deux mois","Dix jours"],"Le Tour dure 21 jours de course.",2);
m(6,"Traditions","Quel jour commence le Carnaval de Nice, l'un des plus célèbres de France ?","Mi-février",["Début décembre","Fin juin","Début octobre"],"Le Carnaval de Nice dure environ deux semaines en février.",3);
m(6,"Traditions","Quelle ville organise la Féria, avec ses corridas, en Camargue ?","Nîmes",["Bordeaux","Lyon","Strasbourg"],"La Féria de Nîmes a lieu à la Pentecôte.",3);
m(6,"Traditions","À quelle date a lieu la Saint-Valentin ?","Le 14 février",["Le 1er mai","Le 25 décembre","Le 21 mars"],"La Saint-Valentin est la fête des amoureux.",1);
vf(6,"En France, on mange du foie gras à Noël.",true,"Le foie gras est un classique des repas de fêtes.",1);
vf(6,"La Saint-Sylvestre est le 25 décembre.",false,"La Saint-Sylvestre est le 31 décembre.",1);
ty(1,"Quel fromage savoyard est utilisé dans la tartiflette ? (un mot)",["Reblochon"],"Le reblochon est un fromage de Haute-Savoie.",2);
ty(3,"Comment s'appelle le petit gâteau en forme de coquille, rendu célèbre par Proust ? (un mot)",["Madeleine"],"La madeleine est de Commercy, en Lorraine.",1);
ty(6,"Quel jour de l'année est la fête nationale française ? (date)",["14 juillet","Le 14 juillet"],"Elle commémore la prise de la Bastille en 1789.",1);

return {id:"gastro",title:"Gastronomie & traditions françaises",kw:"france français gastronomie cuisine fromage vin champagne pâtisserie chefs traditions fêtes culture générale quiz fun",subject:"Fromages, vins, desserts, régions, chefs et fêtes : testez votre culture à la française",lang:"fr",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
