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

return {id:"gastro",title:"Gastronomie & traditions françaises",kw:"france français gastronomie cuisine fromage vin champagne pâtisserie chefs traditions fêtes culture générale quiz fun",subject:"Fromages, vins, desserts, régions, chefs et fêtes : testez votre culture à la française",lang:"fr",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
