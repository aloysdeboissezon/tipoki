// Built-in bank: sociologie (SES), Thème 1 « Comment est structurée la société française actuelle ? »
// Covers séances 1 to 5: Marx, Weber, Bourdieu (espace social, PCS, inégalités), évolutions de la structure socio-professionnelle, moyennisation.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard.
window.BANK_STRUCTURE=(function(){
const SESS={1:"Marx et les classes sociales",2:"Weber et les trois ordres",3:"Espace social, capitaux et PCS",4:"Évolutions de la structure professionnelle",5:"Moyennisation et théorie des classes"};
const TAGS={1:"Marx",2:"Weber",3:"Espace social",4:"Évolutions",5:"Moyennisation"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"Vrai ou faux",q,o:v?["Vrai","Faux"]:["Faux","Vrai"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Marx =====================
m(1,"Définition","Selon Marx, quel critère définit une classe sociale ?","La place occupée dans le processus de production",["Le niveau de diplôme","Le prestige et l'honneur social","Le lieu de résidence"],"Chez Marx, une classe se définit par la position dans le processus de production : un critère unique et économique.",1);
m(1,"Définition","Quelles sont les deux classes antagonistes décrites par Marx ?","La bourgeoisie (propriétaires) et le prolétariat",["Les cadres et les employés","Les urbains et les ruraux","Les riches et les classes moyennes"],"Marx oppose les détenteurs du capital (bourgeoisie) aux prolétaires, qui n'ont que leur force de travail.",1);
m(1,"Définition","Que possèdent les prolétaires, selon Marx ?","Uniquement leur force de travail",["Les moyens de production","Un capital culturel élevé","Un patrimoine immobilier important"],"Les prolétaires ne détiennent que leur force de travail, qu'ils vendent contre un salaire.",1);
m(1,"Définition","Que détient la bourgeoisie, selon Marx ?","Les moyens de production (le capital)",["Le prestige social uniquement","Le pouvoir politique uniquement","Un fort capital culturel"],"La classe dominante possède les moyens de production et en tire des profits.",1);
m(1,"Théorie","Sur quelle contradiction repose la théorie de l'exploitation de Marx ?","Entre le travail et le capital",["Entre la ville et la campagne","Entre l'État et le marché","Entre l'homme et la femme"],"Marx développe une théorie de l'exploitation fondée sur la contradiction travail / capital.",2);
m(1,"Théorie","Qu'est-ce que l'exploitation, au sens de Marx ?","Rémunérer les prolétaires en dessous de la valeur réelle de leur travail",["Faire travailler les salariés plus de 35 heures","Employer des travailleurs sans contrat","Priver les ouvriers du droit de vote"],"Les capitalistes rémunèrent les prolétaires en dessous de la valeur réelle du travail.",2);
m(1,"Conscience de classe","Quel est l'ordre correct des étapes de la formation d'une classe pour Marx ?","Même position dans la production, conscience d'intérêts communs, organisation, lutte",["Lutte, organisation, même position, conscience","Organisation, même position, lutte, conscience","Conscience, lutte, même position, organisation"],"Schéma du cours : 1) même position, 2) conscience, 3) organisation pour défendre les intérêts, 4) lutte.",2);
m(1,"Conscience de classe","Qu'appelle-t-on une classe « pour soi » ?","Une classe consciente de ses intérêts communs, organisée pour les défendre",["Une classe qui ne regroupe que des individus riches","Une simple catégorie statistique","Une classe qui ne vit que pour elle-même et refuse l'autre classe"],"La classe « pour soi » a pris conscience de ses intérêts, s'organise et lutte.",2);
m(1,"Conscience de classe","Qu'appelle-t-on une classe « en soi » (ou classe « réelle ») ?","Des individus à la même position dans la production, sans conscience de classe obligatoire",["Une classe qui lutte activement pour ses droits","Une classe définie par son prestige","Un groupe défini uniquement par ses goûts"],"Même position dans les rapports de production, mais sans conscience de classe obligatoire : étape avant la classe pour soi.",3);
vf(1,"Pour Marx, la structure sociale se résume à un seul critère : l'ordre économique.",true,"Vrai : analyse unidimensionnelle, la place dans le processus de production.",1);
vf(1,"Selon Marx, la société est surtout marquée par la coopération et la paix sociale entre classes.",false,"Faux : pour Marx la société est conflictuelle, la lutte des classes structure la société.",1);
vf(1,"La démarche de Marx est dite « nominaliste ».",false,"Faux : Marx est réaliste (les classes existent réellement) ; Weber est nominaliste.",2);
vf(1,"Pour Marx, la lutte permet, par la prise de conscience, de structurer les classes.",true,"C'est le sens du passage de la classe en soi à la classe pour soi.",2);

// ===================== 2. Weber =====================
m(2,"Ordres","Quels sont les trois ordres de la stratification sociale chez Weber ?","Économique, social et politique",["Économique, culturel et symbolique","Familial, scolaire et professionnel","Local, national et mondial"],"Weber analyse la structure sociale selon l'ordre économique, l'ordre social (prestige) et l'ordre politique (pouvoir).",1);
m(2,"Ordres","Dans quel ordre Weber place-t-il les classes sociales ?","L'ordre économique",["L'ordre social","L'ordre politique","Dans aucun ordre"],"La classe est inscrite dans l'ordre économique : elle n'est qu'une dimension de la stratification.",2);
m(2,"Ordres","À quel ordre de Weber le prestige correspond-il ?","L'ordre social",["L'ordre économique","L'ordre politique","L'ordre religieux"],"Ordre social = prestige ; ordre politique = pouvoir ; ordre économique = richesse (classes).",1);
m(2,"Ordres","À quel ordre de Weber le pouvoir correspond-il ?","L'ordre politique",["L'ordre économique","L'ordre social","L'ordre culturel"],"L'ordre politique renvoie au pouvoir.",1);
m(2,"Approche","Comment qualifie-t-on l'analyse de la structure sociale de Weber ?","Multidimensionnelle",["Unidimensionnelle","Pyramidale à deux niveaux","Strictement conflictuelle"],"Elle repose sur trois ordres, donc plusieurs dimensions.",1);
m(2,"Approche","Qu'est-ce qu'une analyse « nominaliste » de la société ?","Elle étudie des catégories et des groupes « latents », sans interaction nécessaire",["Elle ne reconnaît que les individus riches","Elle refuse toute catégorie sociale","Elle suppose des classes conscientes et organisées"],"Weber raisonne sur des catégories et groupes latents : « les classes sociales ne sont pas des communautés ».",2);
m(2,"Approche","Quelle formule résume la vision de Weber sur la conscience de classe ?","« Les classes sociales ne sont pas des communautés »",["« Prolétaires de tous les pays, unissez-vous »","« La lutte est le moteur de l'histoire »","« Les classes sont des communautés de destin »"],"Pour Weber, une classe n'est pas une communauté consciente et organisée.",2);
m(2,"Approche","Pour Weber, comment peut-on se représenter la société ?","Comme une société stratifiée, hiérarchisée et différenciée, sous forme d'échelle",["Comme une pyramide à deux niveaux","Comme une société sans hiérarchie","Comme un champ de bataille permanent"],"La position dans les trois ordres permet de construire une échelle (stratification).",2);
m(2,"Position sociale","Chez Weber, de quoi dépend la position sociale d'un individu ?","De sa place dans les trois ordres",["De sa seule profession","De son seul niveau de revenu","De son lieu de naissance uniquement"],"La position sociale représente la place dans les trois ordres.",2);
vf(2,"Pour Weber, il n'existe que deux classes sociales.",false,"Faux : il existe plusieurs classes, observées surtout dans l'ordre économique.",1);
vf(2,"Weber voit la société comme plus pacifiée que Marx.",true,"Tableau du cours : société conflictuelle (Marx) / plus pacifiée (Weber).",2);
vf(2,"Pour Weber, la classe sociale est la seule dimension de la stratification.",false,"Faux : c'est une dimension parmi trois (économique, sociale, politique).",2);
vf(2,"Le prestige relève, chez Weber, de l'ordre économique.",false,"Faux : le prestige relève de l'ordre social.",2);

// ===================== 3. Espace social, capitaux, PCS =====================
m(3,"Capitaux","Selon le cours, comment se définit le capital économique ?","Le patrimoine plus les revenus",["Le diplôme et la culture","Le réseau de relations","L'allure et les goûts"],"Capital économique = patrimoine (au sens des économistes) + revenus.",1);
m(3,"Capitaux","Qu'est-ce que le capital social ?","Les groupes auxquels on appartient et les réseaux mobilisables en cas de besoin",["Le diplôme et les ressources culturelles légitimes","Le patrimoine et les revenus","Le prestige d'une profession"],"En gros, le « réseau », en partie hérité (famille) et en partie construit (réseau professionnel).",1);
m(3,"Capitaux","Qu'est-ce que le capital culturel ?","Les ressources culturelles : études, langage, connaissance des arts (le diplôme)",["Les relations familiales","Les économies et le logement","Le pouvoir politique d'un individu"],"Études, langage, connaissance des arts et cultures : le diplôme et les ressources culturelles légitimes.",1);
m(3,"Capitaux","Parmi ces exemples, lequel illustre le capital social hérité ?","Les relations familiales",["Un réseau professionnel construit en entreprise","Un diplôme de master","Un compte épargne"],"Le capital social est en partie hérité (relations familiales) et en partie construit (réseau professionnel).",2);
m(3,"Culture légitime","Laquelle de ces pratiques est donnée en exemple de pratique culturelle « légitime » ?","Aller au théâtre",["Aller à la pêche","Jouer au basket","Regarder la télévision"],"Exemples du cours : musée, théâtre, tennis (légitimes) ; pêche, basket (populaires).",1);
m(3,"Culture légitime","Que signifie le terme « culture légitime » ?","Les pratiques des catégories supérieures, valorisées et jugées prestigieuses",["Les pratiques autorisées par la loi","Les pratiques de la majorité de la population","Les pratiques des classes populaires"],"Elle sert de critère de différenciation sociale selon l'origine sociale.",2);
m(3,"Habitus","Comment Bourdieu définit-il l'habitus ?","La forme incorporée de la condition de classe : manière d'être, allure, goûts",["Le patrimoine hérité de la famille","Le niveau de revenu mensuel","Le réseau de relations professionnelles"],"L'habitus dépend de la socialisation reçue.",2);
m(3,"Habitus","De quoi dépend l'habitus ?","De la socialisation reçue",["Du salaire perçu","De la région de naissance uniquement","Du hasard"],"L'habitus est le produit de la socialisation de classe.",2);
m(3,"Espace social","Qu'est-ce que l'espace social ?","Une représentation où les groupes se situent les uns par rapport aux autres",["Un quartier regroupant les classes aisées","Le territoire national divisé en régions","La liste officielle des professions"],"Approche relationnelle : dimensions économiques, culturelles, symboliques…",2);
m(3,"Schéma de Bourdieu","Que représente l'axe vertical du schéma de l'espace social ?","La quantité globale de capitaux (volume de capital total)",["Le capital culturel seul","L'âge des individus","Les opinions politiques"],"En haut, capital total élevé ; en bas, capital total faible.",2);
m(3,"Schéma de Bourdieu","Que représente l'axe horizontal du schéma de l'espace social ?","Capital culturel (à gauche) contre capital économique (à droite)",["L'opposition entre villes et campagnes","L'opposition entre hommes et femmes","L'opposition entre jeunes et vieux"],"La structure du capital : culturel contre économique, relativement l'un à l'autre.",3);
m(3,"Schéma de Bourdieu","Où se situent, sur le schéma, les professeurs et les artistes ?","En haut à gauche, riches en capital culturel",["En haut à droite, riches en capital économique","En bas à droite","En bas à gauche"],"Ils sont du côté du capital culturel, avec un capital total assez élevé.",3);
m(3,"Schéma de Bourdieu","Quels groupes se trouvent plutôt en haut à droite du schéma ?","Patrons de l'industrie et du commerce",["Instituteurs et professeurs","Ouvriers et manœuvres","Employés de bureau"],"Fort capital total, structure plutôt économique.",3);
m(3,"PCS","Combien de grands groupes la nomenclature des PCS distingue-t-elle ?","8 grands groupes",["4 grands groupes","12 grands groupes","24 grands groupes"],"8 groupes détaillés en 24 catégories.",2);
m(3,"PCS","En combien de catégories les grands groupes de PCS sont-ils détaillés ?","24 catégories",["8 catégories","16 catégories","42 catégories"],"La nomenclature : 8 groupes, 24 catégories.",2);
m(3,"PCS","Que montre la nomenclature des PCS sur la société ?","Une hiérarchie sociale entre groupes (revenus, prestige, pouvoir)",["Que la société est sans hiérarchie","Que tous les groupes sont homogènes entre eux","Que seule la profession compte, jamais le revenu"],"Il y a une homogénéité à l'intérieur de chaque groupe et une hiérarchie entre eux (ex : professions libérales / employés, ouvriers).",2);
m(3,"Inégalités","Quel est l'écart de salaire global entre les femmes et les hommes évoqué dans le cours ?","Environ 25 % de moins pour les femmes",["Environ 5 % de moins","Environ 50 % de moins","Aucun écart"],"Les femmes gagnent environ 25 % de moins (au global).",1);
m(3,"Inégalités","Quel écart reste inexpliqué « à poste et compétences égales » ?","Environ 4 %",["Environ 25 %","Environ 10 %","Aucun"],"À poste et compétences égales, les femmes sont moins bien rémunérées (environ -4 %).",3);
m(3,"Inégalités","Quelle expression désigne la difficulté des femmes à accéder aux postes à responsabilité ?","Le plafond de verre",["Le plancher collant","La loi d'airain","Le mur du son"],"Elles accèdent moins aux postes à responsabilité : plafond de verre.",1);
m(3,"Inégalités","Laquelle de ces raisons explique l'écart de salaire entre femmes et hommes ?","Les femmes travaillent plus souvent à temps partiel",["Les femmes sont moins diplômées aujourd'hui","Les femmes refusent les emplois qualifiés","Les femmes ont moins de capital social par nature"],"Trois raisons : moins d'heures (temps partiel), emplois moins rémunérés plus féminisés, écart à poste égal.",2);
m(3,"Inégalités","Comment le lieu de résidence structure-t-il l'espace social ?","Les groupes se répartissent par quartiers selon leurs ressources : hiérarchie des zones",["Il n'a aucun effet sur la position sociale","Il dépend uniquement de l'âge","Il efface les écarts entre groupes"],"Les quartiers mieux dotés attirent les catégories favorisées (entre-soi).",2);
m(3,"Inégalités","Qu'est-ce qu'une inégalité, selon la synthèse de la séance 3 ?","Une différence d'accès à des ressources socialement valorisées",["Une différence de goûts sans conséquence","Une différence entre deux pays","Une injustice reconnue par la loi"],"Revenus, patrimoine, santé, pouvoir, sexe, lieu de vie… Ces différences se cumulent et s'entretiennent.",2);
vf(3,"Pour Bourdieu, la lutte des classes se joue aussi sur le capital social et culturel.",true,"Les classes dominantes imposent leur culture comme légitime et dévalorisent les pratiques populaires.",2);
vf(3,"Les pratiques populaires sont considérées comme plus valorisées que les pratiques légitimes.",false,"Faux : les pratiques populaires sont moins valorisées.",1);
vf(3,"Les inégalités économiques, sociales et culturelles s'imbriquent et hiérarchisent la société.",true,"Elles provoquent une hiérarchisation et une stratification de la société.",2);

// ===================== 4. Évolutions de la structure professionnelle =====================
m(4,"Salarisation","Qu'est-ce que la salarisation ?","La généralisation progressive du statut de salarié",["La hausse du salaire minimum","La disparition du chômage","L'augmentation du nombre d'indépendants"],"Le salariat est devenu la norme et réduit la part des indépendants.",1);
m(4,"Salarisation","Quelle part des actifs est salariée aujourd'hui ?","Environ 90 %",["Environ 50 %","Environ 65 %","Environ 99 %"],"Diffusion du salariat : 90 % des actifs sont salariés.",1);
m(4,"Salarisation","Quelles PCS reculent avec la salarisation ?","Les PCS indépendantes : agriculteurs, artisans, commerçants",["Les cadres","Les professions intermédiaires","Les employés"],"Recul des PCS indépendantes, renforcement des PCS salariées.",1);
m(4,"Salarisation","Quel lien économique est fait avec la salarisation ?","La protection sociale et la stabilité de l'emploi favorisent la cohésion sociale",["Elle supprime la division du travail","Elle réduit l'accès à l'assurance maladie","Elle augmente la précarité de tous"],"Tous sous le même statut : assurance maladie, retraite, chômage ; contrat stable.",2);
m(4,"Tertiarisation","Qu'est-ce que la tertiarisation ?","La montée des services dans l'économie et l'emploi",["Le développement de l'industrie lourde","Le retour à l'agriculture","La hausse du nombre de diplômés"],"Orientation de l'économie vers les services, recul des secteurs primaire et secondaire.",1);
m(4,"Tertiarisation","À partir de quand la tertiarisation devient-elle forte ?","À la fin des Trente Glorieuses",["Au début du XIXe siècle","Pendant la Première Guerre mondiale","Après l'an 2000 seulement"],"Perte de compétitivité de l'industrie, fermetures d'usines.",2);
m(4,"Tertiarisation","Que devient une partie des ouvriers de l'industrie en déclin ?","Des employés d'entreprises de services",["Des agriculteurs","Des artisans indépendants","Des chômeurs définitifs"],"Ils deviennent employés d'entreprises proposant de nouveaux services.",2);
m(4,"Tertiarisation","Que dit la loi d'Engel ?","Revenu en hausse : l'alimentation pèse moins dans le budget, la demande de services monte",["Quand le revenu augmente, la part de l'alimentation augmente","Quand le revenu baisse, la demande de services augmente","Les services coûtent moins cher que l'alimentation"],"Bonus du cours : hausse du revenu, baisse du poids de l'alimentation, hausse de la demande de services.",3);
m(4,"Tertiarisation","Parmi ces activités, laquelle relève du tertiaire non marchand ?","La santé",["La banque","Le conseil","Le commerce"],"Marchand : banque, conseil, commerce. Non marchand : santé, éducation.",2);
m(4,"Diplômes","Combien de fois plus de diplômés du supérieur depuis 1985 ?","Plus de 3 fois plus",["Environ 2 fois plus","Environ 10 fois plus","À peu près autant"],"Plus de 3 fois plus de diplômés du supérieur entre 1985 et aujourd'hui.",2);
m(4,"Diplômes","Qu'est-ce que la massification scolaire ?","L'accès élargi d'une plus grande partie de la population aux diplômes",["La suppression des examens","La baisse du nombre d'élèves","Le retour du travail des enfants"],"Elle a élevé le niveau de qualification mais renforcé les inégalités entre diplômés et non-diplômés.",1);
m(4,"Qualification","Quelle conséquence a l'élévation du niveau de qualification des emplois ?","Hausse des cadres et professions intermédiaires, baisse des ouvriers et employés",["Hausse du nombre d'ouvriers","Disparition des cadres","Hausse du nombre d'agriculteurs"],"Les individus grimpent dans la classification des PCS.",2);
m(4,"Qualification","Quelles sont deux causes de l'élévation de la qualification des emplois ?","L'impératif de productivité et l'aspiration des individus à faire des études",["La baisse des salaires et le chômage","La fermeture des universités et la hausse du travail manuel","Le recul du tertiaire et la baisse des diplômes"],"Il faut être plus formé, plus compétent, plus efficace ; et les individus aspirent à étudier.",3);
m(4,"Féminisation","Qu'est-ce que la féminisation de l'emploi ?","L'augmentation de la part des femmes dans l'emploi, surtout dans le tertiaire",["La baisse du nombre d'hommes actifs","La disparition des écarts de salaire","L'interdiction du temps partiel"],"Mais persistance d'inégalités de salaire et d'accès aux postes de pouvoir.",1);
m(4,"Féminisation","Quelle conséquence est liée à la féminisation de l'emploi ?","Davantage d'autonomie économique des femmes",["La fin de toutes les inégalités de genre","Une baisse de leur participation politique","Une baisse de la tertiarisation"],"Autonomie économique, réduction des inégalités de genre, hausse de la participation politique.",2);
m(4,"Bilan","Quel est le bilan global des cinq évolutions de l'emploi ?","Plus de salariés, de diplômés, de femmes, et une polarisation des emplois",["Moins de salariés et plus d'indépendants","La fin des inégalités","Une hausse des emplois peu qualifiés uniquement"],"Mutation de la structure sociale et nouvelles inégalités.",3);
vf(4,"La tertiarisation a rendu l'emploi plus accessible aux femmes.",true,"Elle est liée à la féminisation de l'emploi.",2);
vf(4,"La tertiarisation s'accompagne d'un recul des employés.",false,"Faux : montée des employés, cadres et professions de services ; recul des ouvriers et agriculteurs.",1);
vf(4,"L'élévation du niveau de diplômes a supprimé les inégalités entre diplômés et non-diplômés.",false,"Faux : elle les a au contraire renforcées.",2);

// ===================== 5. Moyennisation =====================
m(5,"Définition","Que décrit la moyennisation ?","La constitution d'une vaste classe moyenne qui rapproche les modes de vie",["La disparition des classes moyennes","L'augmentation des écarts entre riches et pauvres","Le passage de la société au tout-salariat"],"Elle réduit les positions extrêmes dans la stratification sociale.",1);
m(5,"Inter-classes","Quels facteurs réduisent la distance inter-classes ?","La hausse des revenus, la massification scolaire et la consommation de masse",["La baisse des revenus et la crise du logement","La suppression des diplômes","La hausse du chômage de masse"],"Surtout pendant les Trente Glorieuses : accès à des biens autrefois réservés aux plus aisés.",2);
m(5,"Inter-classes","En 1997, quelle part des ouvriers possédait un téléphone portable ?","Environ 10 %",["Environ 32 %","Environ 50 %","Environ 98 %"],"En 1997, 10 % des ouvriers contre 32 % des cadres.",2);
m(5,"Inter-classes","En 1997, quelle part des cadres possédait un téléphone portable ?","Environ 32 %",["Environ 10 %","Environ 60 %","Environ 90 %"],"10 % des ouvriers, 32 % des cadres en 1997.",2);
m(5,"Inter-classes","En 2016, quelle part des ménages possédait un portable ?","Plus de 98 %",["Environ 50 %","Environ 70 %","Environ 32 %"],"En 2016, presque tous les ménages en possèdent (plus de 98 %).",2);
m(5,"Inter-classes","Que montre l'exemple du téléphone portable ?","Une réduction des distances inter-classes en termes de conditions matérielles",["Une hausse des écarts de niveau de vie","Que seuls les cadres s'équipent","Que les modes de vie sont plus différents qu'avant"],"Plus de 90 % de chaque PCS équipée en 2016 contre 10 à 30 % en 1997.",2);
m(5,"Inter-classes","Qu'appelle-t-on le « brouillage des frontières inter-classes » ?","Des modes de vie devenus moins discriminants pour identifier l'appartenance sociale",["La disparition de tous les groupes sociaux","Un resserrement des revenus à l'identique","La fin de toute inégalité"],"Les styles de vie (consommation, logement, loisirs) distinguent moins les classes.",2);
m(5,"Inter-classes","Que désigne la « déprolétarisation » ?","Un rapprochement des modes de vie des ouvriers vers ceux des autres groupes",["Une hausse du nombre d'ouvriers","Un retour du travail à domicile","La disparition des cadres"],"Les différences visibles entre groupes s'atténuent.",3);
m(5,"Intra-classes","Que montre la diversité au sein de la catégorie des employés ?","Une diversification interne des groupes sociaux",["Une uniformité totale des conditions de vie","Que les employés ont tous le même salaire","Que les classes sont plus homogènes"],"Revenus, diplômes, genre, stabilité de l'emploi : les situations sont très différentes.",2);
m(5,"Intra-classes","Pourquoi la théorie de Marx ne suffit-elle plus à décrire la situation actuelle ?","Les frontières sociales sont devenues plus floues et complexes",["Parce que la société est devenue sans inégalités","Parce que tous les actifs sont devenus indépendants","Parce que Marx parlait des femmes uniquement"],"Affaiblissement de la pertinence de l'analyse en classes sociales.",2);
m(5,"Limites","Quel effet est le plus fort sur la réussite professionnelle selon le cours ?","L'origine sociale, plus que le genre",["Le genre, plus que l'origine sociale","Le lieu de résidence uniquement","L'âge uniquement"],"Les inégalités inter-classes sont plus importantes que les différences entre hommes et femmes d'une même classe.",3);
m(5,"Limites","Quel exemple illustre le croisement des inégalités de genre et de classe ?","Les femmes de cadres délèguent le travail domestique, pas les femmes populaires",["Les femmes gagnent toutes la même chose","Toutes les femmes ont le même temps de travail domestique","Les hommes assument seuls les tâches domestiques"],"Toutes les femmes ne sont pas égales face au travail domestique.",3);
m(5,"Limites","Quelle est la conclusion du chapitre sur les classes sociales ?","Elles subsistent, plus complexes et croisées avec d'autres dimensions",["Elles ont totalement disparu","Elles sont plus simples qu'avant","Elles n'ont jamais existé"],"Croisement avec le genre ou le niveau d'éducation.",2);
vf(5,"La moyennisation signifie la disparition totale des inégalités sociales.",false,"Faux : il subsiste des écarts de revenus, de diplômes ou d'accès à certains espaces résidentiels.",1);
vf(5,"La moyennisation remet partiellement en cause l'analyse en classes au sens de Marx.",true,"Elle conduit à une vision d'homogénéisation des modes de vie.",2);
vf(5,"Les inégalités entre classes sont plus faibles que celles entre hommes et femmes d'une même classe.",false,"Faux : les inégalités inter-classes sont plus importantes que les différences intra-classe entre hommes et femmes.",3);

// ===================== Questions à réponse libre =====================
ty(1,"Quel auteur analyse la société par la lutte entre prolétaires et propriétaires ?",["Marx","Karl Marx"],"Karl Marx : deux classes antagonistes définies par la place dans la production.");
ty(1,"Comment appelle-t-on la classe consciente de ses intérêts et organisée pour les défendre ?",["classe pour soi","pour soi"],"Classe pour soi, par opposition à la classe en soi (réelle).");
ty(1,"Quel mot désigne le fait de rémunérer le travail en dessous de sa valeur réelle ?",["exploitation"],"C'est la théorie de l'exploitation de Marx.");
ty(2,"Quel auteur propose une analyse de la stratification sociale en trois ordres ?",["Weber","Max Weber"],"Max Weber : économique, social, politique.");
ty(2,"Quel ordre de Weber correspond au prestige ?",["social","ordre social","l'ordre social"],"L'ordre social correspond au prestige.");
ty(2,"Comment qualifie-t-on la démarche de Weber, opposée à celle, réaliste, de Marx ?",["nominaliste","démarche nominaliste"],"Démarche nominaliste : catégories, groupes latents.");
ty(3,"Quel sociologue a popularisé les notions d'habitus et d'espace social dans ce chapitre ?",["Bourdieu","Pierre Bourdieu"],"Pierre Bourdieu : habitus, capitaux, espace social.");
ty(3,"Combien de grands groupes la nomenclature des PCS distingue-t-elle ?",["8","huit"],"8 groupes détaillés en 24 catégories.");
ty(3,"Comment appelle-t-on l'obstacle qui freine l'accès des femmes aux postes à responsabilité ?",["plafond de verre","le plafond de verre"],"Plafond de verre.");
ty(4,"Quel est le nom de la généralisation du statut de salarié ?",["salarisation","la salarisation"],"Salarisation : 90 % des actifs sont salariés.");
ty(4,"Quel est le nom de la montée des services dans l'économie ?",["tertiarisation","la tertiarisation"],"Tertiarisation.");
ty(4,"Comment s'appelle la loi qui lie la hausse du revenu à la baisse du poids de l'alimentation dans le budget ?",["loi d'Engel","Engel","la loi d'Engel"],"La loi d'Engel.");
ty(5,"Quel mot désigne le processus de constitution d'une vaste classe moyenne ?",["moyennisation","la moyennisation"],"Moyennisation : rapprochement des niveaux et modes de vie.");
ty(5,"En quelle année seuls 10 % des ouvriers avaient un portable, contre plus de 98 % des ménages en 2016 ?",["1997"],"En 1997 : 10 % des ouvriers contre 32 % des cadres.");

// ===================== Flashcards =====================
// [session, "mots" (notions) | "pers" (auteurs), "c" concept | "p" person, term, definition, accepted aliases]
const FACTS=[
[1,"mots","c","Structure sociale","Image de la société en groupes hiérarchisés selon certains critères"],
[1,"mots","c","Position sociale","Position d'un individu ou d'un groupe dans la structure sociale, par rapport aux autres"],
[1,"mots","c","Stratification","Structure sociale imaginée sous forme de couches hiérarchisées et superposées","strates"],
[1,"mots","c","Groupe social","Ensemble d'individus ayant des caractéristiques en commun"],
[1,"mots","c","Exploitation","Rémunération des prolétaires en dessous de la valeur réelle de leur travail (Marx)"],
[1,"mots","c","Prolétariat","Classe qui ne détient que sa force de travail et la vend contre un salaire","prolétaires"],
[1,"mots","c","Bourgeoisie","Classe dominante qui détient les moyens de production (le capital)","propriétaires"],
[1,"mots","c","Classe en soi","Ensemble d'individus ayant la même position dans la production, sans conscience obligatoire de leurs intérêts (classe réelle)","classe réelle"],
[1,"mots","c","Classe pour soi","Classe consciente de ses intérêts communs, organisée pour les défendre : elle lutte","conscience de classe"],
[2,"mots","c","Ordre économique","Dimension de la stratification liée à la richesse ; c'est là que se situent les classes sociales (Weber)"],
[2,"mots","c","Ordre social","Dimension de la stratification liée au prestige (Weber)"],
[2,"mots","c","Ordre politique","Dimension de la stratification liée au pouvoir (Weber)"],
[2,"mots","c","Approche nominaliste","Analyse de catégories, de collections d'individus et de groupes latents, sans interaction nécessaire","nominalisme"],
[2,"mots","c","Approche réaliste","Les classes existent réellement, avec conscience de classe et lutte (Marx)","réalisme"],
[3,"mots","c","Culture légitime","Pratiques culturelles des catégories supérieures, valorisées dans la société, qui distinguent et hiérarchisent selon l'origine sociale"],
[3,"mots","c","Habitus","Forme incorporée de la condition de classe : manière d'être, allure, goûts, issus de la socialisation"],
[3,"mots","c","Capital économique","Patrimoine plus revenus"],
[3,"mots","c","Capital social","Groupes d'appartenance et réseaux mobilisables en cas de besoin ; en partie hérité, en partie construit","réseau"],
[3,"mots","c","Capital culturel","Ressources culturelles : études, langage, connaissance des arts ; en gros le diplôme et la culture légitime"],
[3,"mots","c","Espace social","Représentation relationnelle du monde social : les groupes se situent les uns par rapport aux autres selon plusieurs dimensions"],
[3,"mots","c","PCS","Professions et catégories socioprofessionnelles : 8 grands groupes détaillés en 24 catégories"],
[3,"mots","c","Inégalité","Différence d'accès à des ressources socialement valorisées ; les différences se cumulent et s'entretiennent"],
[3,"mots","c","Plafond de verre","Obstacle qui limite l'accès des femmes aux postes à responsabilité"],
[4,"mots","c","Salarisation","Généralisation progressive du statut de salarié (90 % des actifs)","salariat"],
[4,"mots","c","Tertiarisation","Montée des services dans l'économie et l'emploi, au détriment de l'industrie et de l'agriculture"],
[4,"mots","c","Massification scolaire","Accès élargi d'une plus grande partie de la population aux diplômes"],
[4,"mots","c","Loi d'Engel","Revenu en hausse : l'alimentation pèse moins dans le budget, la demande de services monte","Engel"],
[4,"mots","c","Féminisation de l'emploi","Augmentation de la part des femmes dans l'emploi, surtout dans le tertiaire"],
[5,"mots","c","Moyennisation","Constitution d'une vaste classe moyenne, qui réduit les positions extrêmes et rapproche niveaux et modes de vie"],
[5,"mots","c","Brouillage des frontières","Les modes de vie distinguent moins les classes : les frontières entre classes deviennent floues","brouillage des frontières inter-classes"],
[5,"mots","c","Déprolétarisation","Rapprochement des modes de vie des ouvriers vers ceux des autres groupes"],
[5,"mots","c","Distance inter-classes","Écart entre classes, qui se réduit (revenus, école, consommation de masse)"],
[5,"mots","c","Distance intra-classes","Diversité à l'intérieur d'une même classe (ex. les employés)"],
[1,"mots","p","Karl Marx","Analyse la société comme deux classes antagonistes définies par la place dans la production","Marx"],
[2,"mots","p","Max Weber","Analyse multidimensionnelle de la stratification en trois ordres : économique, social, politique","Weber"],
[3,"mots","p","Pierre Bourdieu","Habitus, capitaux (économique, social, culturel), espace social, culture légitime","Bourdieu"]
];

return {id:"structure",title:"Sociologie · Structure sociale, thème 1",kw:"sociologie SES marx weber bourdieu classes sociales stratification espace social PCS moyennisation lycée bac",subject:"Comment est structurée la société française actuelle ?",lang:"fr",sess:SESS,tags:TAGS,unit:["séance","séances","une séance"],balance:true,Q,TQ,facts:FACTS};
})();
