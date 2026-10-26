// Built-in bank: physique-chimie (enseignement scientifique), Chapitre 1 « Deux siècles d'énergie électrique ».
// Covers the whole course (definitions, dates, formulas, units, orders of magnitude) plus worked calculation exercises.
// Everything is hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
window.BANK_ENERGIE=(function(){
const SESS={1:"Induction électromagnétique",2:"L'alternateur",3:"Calculs : rendement et fréquence",4:"Semi-conducteurs et photovoltaïque",5:"Bandes d'énergie et silicium",6:"Calculs : capteur photovoltaïque"};
const TAGS={1:"Induction",2:"Alternateur",3:"Calculs alternateur",4:"Photovoltaïque",5:"Bandes d'énergie",6:"Calculs PV"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e)=>Q.push({s,t,q,o:[ok,...wr],a:0,e});
const vf=(s,q,v,e)=>Q.push({s,t:"Vrai ou faux",q,o:v?["Vrai","Faux"]:["Faux","Vrai"],a:0,e,tf:true});
const ty=(s,q,a,e,n)=>TQ.push(n?{s,q,a,e,n}:{s,q,a,e});

// ===================== 1. Induction électromagnétique =====================
m(1,"Définition","Qu'est-ce qu'un courant électrique ?","Un mouvement d'électrons libres dans un matériau, souvent conducteur (métal)",["Un mouvement de protons dans un isolant","Une accumulation immobile de charges sur un aimant","Un déplacement de photons dans un fil de cuivre"],"Un courant électrique est un mouvement d'électrons libres dans un matériau souvent conducteur comme un métal.");
m(1,"Expérience","On déplace un aimant près d'une bobine (enroulement de fil de cuivre). Que se passe-t-il ?","Les électrons libres se mettent en mouvement : un courant apparaît et une tension apparaît aux bornes de la bobine",["Rien, un aimant n'agit que sur le fer","La bobine s'aimante mais aucun courant n'apparaît","Le cuivre devient un semi-conducteur"],"C'est le phénomène d'induction (Doc.1) : le mouvement de l'aimant met en mouvement les électrons libres du cuivre, d'où un courant et une tension aux bornes de l'enroulement.");
m(1,"Sens du courant","De quoi dépend le sens du courant induit dans la bobine ?","Du pôle de l'aimant présenté et du sens de déplacement de l'aimant",["Uniquement de la couleur du fil","Uniquement de la longueur du fil","De la température de la pièce"],"Le sens du courant et de la tension dépend du pôle (Nord ou Sud) présenté à l'enroulement ET du sens de déplacement (approche ou éloignement).");
m(1,"Courant alternatif","Un aimant fait un mouvement de va-et-vient devant une bobine. Quel courant obtient-on ?","Un courant alternatif (il change de sens)",["Un courant continu","Aucun courant","Un courant qui ne circule que dans un sens"],"Approche puis éloignement (ou pôle Nord puis pôle Sud) : le courant change de sens à chaque fois, c'est un courant alternatif.");
m(1,"Dates","Qui a découvert l'induction électromagnétique, et en quelle année ?","Michael Faraday, en 1831",["James Maxwell, en 1831","Michael Faraday, en 1865","Albert Einstein, en 1905"],"Découverte : Faraday en 1831. Théorisation : Maxwell en 1865.");
m(1,"Dates","Qui a théorisé l'induction électromagnétique, et en quelle année ?","James Maxwell, en 1865",["Michael Faraday, en 1865","James Maxwell, en 1831","Alessandro Volta, en 1800"],"Faraday la découvre en 1831, Maxwell la théorise en 1865.");
m(1,"Dates","En quelle année Faraday a-t-il découvert l'induction électromagnétique ?","1831",["1865","1789","1905"],"Faraday : 1831 (découverte). Maxwell : 1865 (théorie).");
m(1,"Dates","En quelle année Maxwell a-t-il théorisé l'induction électromagnétique ?","1865",["1831","1900","1789"],"Faraday : 1831 (découverte). Maxwell : 1865 (théorie).");
m(1,"Centrales","Quel type de centrale électrique ne repose PAS sur l'induction électromagnétique ?","Les centrales photovoltaïques",["Les centrales nucléaires","Les centrales hydroélectriques","Les éoliennes"],"Toutes les centrales utilisent un alternateur (induction), sauf les centrales photovoltaïques qui utilisent l'effet photoélectrique.");
m(1,"Définition","L'induction électromagnétique, c'est…","L'apparition d'un courant électrique dans un conducteur en mouvement par rapport à un champ magnétique",["L'absorption de la lumière par la matière","Le passage d'un électron de la bande de valence à la bande de conduction","La transformation d'énergie électrique en chaleur"],"Mot-clé du cours : induction électromagnétique = apparition d'un courant dans un conducteur en mouvement par rapport à un champ magnétique.");
m(1,"Dans quoi ?","Pour observer l'induction, on approche l'aimant de préférence…","D'un enroulement de fil de cuivre (une bobine)",["D'une plaque de verre","D'un morceau de bois","D'une cellule de silicium"],"Le cours parle d'un fil de cuivre ou « plus particulièrement d'un enroulement de fil de cuivre » : la bobine.");
vf(1,"Si l'aimant reste immobile devant la bobine, un courant induit circule quand même.",false,"Faux : il faut un mouvement de l'aimant par rapport à la bobine pour mettre les électrons en mouvement.");
vf(1,"Le sens du courant induit change si on présente le pôle Sud au lieu du pôle Nord.",true,"Vrai : le sens dépend du pôle présenté et du sens de déplacement de l'aimant.");
vf(1,"Approcher puis éloigner un aimant d'une bobine produit un courant alternatif.",true,"Vrai : le courant change de sens entre l'approche et l'éloignement, il est alternatif.");
vf(1,"L'induction électromagnétique a été découverte par Maxwell en 1865.",false,"Faux : découverte par Faraday en 1831, théorisée par Maxwell en 1865.");
vf(1,"Les centrales hydrauliques, nucléaires et les éoliennes produisent l'électricité grâce à l'induction électromagnétique.",true,"Vrai : toutes sauf les centrales photovoltaïques.");
vf(1,"Une centrale photovoltaïque produit de l'électricité grâce à l'induction électromagnétique.",false,"Faux : c'est l'exception. Le photovoltaïque repose sur l'effet photoélectrique.");
vf(1,"Un courant électrique est un mouvement d'électrons libres.",true,"Vrai : mouvement d'électrons libres dans un matériau souvent conducteur (métal).");
ty(1,"Qui a découvert l'induction électromagnétique en 1831 ?",["Faraday","Michael Faraday"],"Michael Faraday, 1831. Maxwell l'a théorisée en 1865.",["Maxwell"]);
ty(1,"Qui a théorisé l'induction électromagnétique en 1865 ?",["Maxwell","James Maxwell","James Clerk Maxwell"],"James Maxwell, 1865. Faraday l'avait découverte en 1831.",["Faraday"]);
ty(1,"En quelle année l'induction électromagnétique a-t-elle été découverte ?",["1831"],"Faraday, 1831.");
ty(1,"En quelle année l'induction électromagnétique a-t-elle été théorisée par Maxwell ?",["1865"],"Maxwell, 1865.");
ty(1,"Un aimant en va-et-vient devant une bobine produit un courant… (continu ou alternatif ?)",["alternatif","courant alternatif"],"Le courant change de sens à chaque aller-retour : il est alternatif.",["continu"]);
ty(1,"Quelles particules se déplacent dans un courant électrique ?",["électrons","électrons libres","les électrons"],"Un courant électrique est un mouvement d'électrons libres.",["protons","photons"]);

// ===================== 2. L'alternateur =====================
m(2,"Définition","Un alternateur convertit…","De l'énergie mécanique en énergie électrique",["De l'énergie électrique en énergie mécanique","De l'énergie lumineuse en énergie électrique","De l'énergie chimique en énergie électrique"],"Alternateur = convertisseur d'énergie mécanique en énergie électrique, grâce à l'induction.");
m(2,"Définition","Un alternateur est un générateur de…","Courant alternatif",["Courant continu","Lumière","Champ électrique uniquement"],"Il produit à ses bornes une tension alternative en exploitant l'induction.");
m(2,"Vocabulaire","Comment s'appelle la partie MOBILE d'un alternateur ?","Le rotor",["Le stator","La turbine","La bobine fixe"],"Rotor = partie mobile (l'aimant multipôles qui tourne). Stator = partie fixe (les enroulements).");
m(2,"Vocabulaire","Comment s'appelle la partie FIXE (statique) d'un alternateur ?","Le stator",["Le rotor","L'aimant","La turbine"],"Stator = partie statique (enroulements fixes). Rotor = partie mobile.");
m(2,"Composition","Dans un alternateur, le rotor est…","Un aimant multipôles qui tourne",["Un ensemble d'enroulements fixes","Une cellule photovoltaïque","Un semi-conducteur dopé"],"Le rotor (aimant multipôles) tourne à l'intérieur du stator (enroulements fixes).");
m(2,"Composition","Dans un alternateur, le stator est…","Un ensemble d'enroulements fixes (bobines)",["Un aimant multipôles qui tourne","La turbine","Le fluide qui fait tourner l'axe"],"Le stator = enroulements fixes ; le rotor = aimant qui tourne dedans.");
m(2,"Composition","De quoi un alternateur est-il constitué ?","D'une source de champ magnétique et d'enroulements fixes (bobines)",["De deux semi-conducteurs en jonction","D'une pile et d'une résistance","D'un panneau de silicium"],"Source de champ magnétique (aimant = rotor) + enroulements fixes (bobines = stator).");
m(2,"Fréquence","Si la vitesse de rotation du rotor augmente, la fréquence du courant…","Augmente",["Diminue","Reste la même","S'annule"],"Plus le rotor tourne vite, plus la fréquence du courant est grande (f = N × ω).");
m(2,"Turbine","Qu'est-ce qui fait tourner l'aimant (rotor) d'un alternateur ?","Une turbine reliée à l'axe, mise en mouvement par un fluide",["Une cellule photovoltaïque","Le stator","Le courant produit lui-même"],"La turbine exploite l'énergie cinétique d'un fluide : eau (marées, chute d'eau), vapeur d'eau (centrales), vent (éoliennes).");
m(2,"Turbine","Dans une centrale thermique ou nucléaire, quel fluide fait tourner la turbine ?","La vapeur d'eau",["Le vent","La lumière","L'eau d'une marée"],"Le cours cite : eau (marées, chute d'eau), vapeur d'eau (centrales électriques), vent (éoliennes).");
m(2,"Turbine","Dans une éolienne, quel fluide fait tourner la turbine ?","Le vent (l'air)",["La vapeur d'eau","L'eau d'une chute","Le soleil"],"Éolienne : énergie cinétique du vent.");
m(2,"Turbine","Lequel de ces exemples n'est PAS cité comme fluide faisant tourner une turbine ?","La lumière du Soleil",["L'eau des marées","La vapeur d'eau","Le vent"],"Fluides cités : eau (marées, chute d'eau), vapeur d'eau, vent. La lumière n'est pas un fluide : le photovoltaïque n'a pas de turbine.");
m(2,"Chaîne énergétique","Quelle est la chaîne énergétique d'un alternateur ?","Énergie reçue (mécanique) → énergie utile (électrique) + énergie dissipée (thermique)",["Énergie électrique → énergie mécanique + lumière","Énergie lumineuse → énergie électrique + énergie thermique","Énergie thermique → énergie mécanique uniquement"],"Le schéma du cours : énergie reçue (mécanique) → alternateur → énergie utile (électrique) + énergie dissipée (thermique).");
m(2,"Pertes","Sous quelle forme l'alternateur perd-il de l'énergie ?","Sous forme d'énergie thermique (chaleur)",["Sous forme de lumière","Sous forme d'énergie nucléaire","Il ne perd aucune énergie"],"Les pertes sont thermiques, c'est pourquoi le rendement est toujours inférieur à 1.");
m(2,"Rendement","Quel est l'ordre de grandeur du rendement d'un alternateur industriel ?","90 % à 95 %",["20 % à 25 %","50 %","100 % exactement"],"Proche de 1 : pertes thermiques de 5 % à 10 %, soit un rendement de 90 % à 95 %.");
m(2,"Rendement","Quel est l'ordre de grandeur des pertes thermiques d'un alternateur industriel ?","5 % à 10 %",["75 % à 80 %","Environ 50 %","0 %"],"Pertes de 5 à 10 % → rendement de 90 à 95 %.");
m(2,"Rendement","Pourquoi le rendement d'un alternateur est-il toujours inférieur à 1 ?","À cause des pertes sous forme d'énergie thermique",["Parce que l'énergie n'est pas conservée","Parce que le rotor ne tourne pas assez vite","Parce que le stator bouge"],"L'énergie se conserve, mais une partie est dissipée en chaleur : Eu < Ereçue donc r < 1.");
vf(2,"Un alternateur convertit de l'énergie électrique en énergie mécanique.",false,"Faux : c'est l'inverse, mécanique → électrique (c'est un moteur qui fait électrique → mécanique).");
vf(2,"Le rotor est la partie mobile de l'alternateur.",true,"Vrai : rotor = mobile, stator = statique.");
vf(2,"Le stator est un aimant multipôles qui tourne.",false,"Faux : ça c'est le rotor. Le stator est l'ensemble des enroulements fixes.");
vf(2,"Plus le rotor tourne vite, plus la fréquence du courant produit est grande.",true,"Vrai : f = N × ω, la fréquence est proportionnelle à la vitesse de rotation.");
vf(2,"Le rendement d'un alternateur industriel est d'environ 20 %.",false,"Faux : 90 à 95 %. C'est le capteur photovoltaïque qui est autour de 20 à 25 %.");
vf(2,"Le rendement d'un alternateur peut atteindre exactement 100 %.",false,"Faux : il est proche de 1 mais toujours inférieur, à cause des pertes thermiques.");
vf(2,"Un alternateur fonctionne grâce au phénomène d'induction électromagnétique.",true,"Vrai : un aimant (rotor) tourne dans des bobines (stator), ce qui induit un courant.");
ty(2,"Partie mobile d'un alternateur ?",["rotor","le rotor"],"Rotor = partie mobile (aimant qui tourne). Stator = partie fixe.",["stator"]);
ty(2,"Partie fixe (statique) d'un alternateur ?",["stator","le stator"],"Stator = partie statique (enroulements fixes). Rotor = partie mobile.",["rotor"]);
ty(2,"Un alternateur convertit l'énergie ___ en énergie électrique.",["mécanique","energie mecanique"],"Alternateur : énergie mécanique → énergie électrique.");
ty(2,"Quel appareil, relié à l'axe de l'alternateur, fait tourner l'aimant ?",["turbine","une turbine","la turbine"],"La turbine est mise en mouvement par un fluide (eau, vapeur, vent).");
ty(2,"Sous quelle forme d'énergie sont les pertes d'un alternateur ?",["thermique","énergie thermique","chaleur"],"Pertes = énergie thermique (dissipée).");

// ===================== 3. Calculs : rendement et fréquence de l'alternateur =====================
// formules
m(3,"Formule","Quelle est la formule du rendement r d'un alternateur ?","r = Pu / Pf",["r = Pf / Pu","r = Pu × Pf","r = Pf − Pu"],"r = Pu / Pf = Eu / Ereçue (puissance ou énergie utile divisée par la reçue).");
m(3,"Formule","Le rendement peut aussi s'écrire avec les énergies :","r = Eu / Ereçue",["r = Ereçue / Eu","r = Eu − Ereçue","r = Edissipée / Eu"],"r = Pu / Pf = Eu / Ereçue.");
m(3,"Conservation","Quelle relation traduit la conservation de l'énergie dans un alternateur ?","Ereçue = Eu + Edissipée",["Eu = Ereçue + Edissipée","Ereçue = Eu − Edissipée","Ereçue = Eu × Edissipée"],"L'énergie (et la puissance) se conserve : ce qui entre = utile + dissipé.");
m(3,"Unités","Quelle est l'unité du rendement ?","Aucune (sans unité, ou en %)",["Le watt (W)","Le joule (J)","Le hertz (Hz)"],"Le rendement est un rapport de deux puissances (ou énergies) : il est sans dimension, sans unité, ou exprimé en pourcentage.");
m(3,"Unités","Dans r = Pu / Pf, en quelle unité exprime-t-on Pu et Pf ?","En watt (W)",["En joule (J)","En hertz (Hz)","En volt (V)"],"Puissances en watt (W). Les énergies Eu et Ereçue sont en joule (J).");
m(3,"Unités","Dans r = Eu / Ereçue, en quelle unité exprime-t-on les énergies ?","En joule (J)",["En watt (W)","En ampère (A)","En ohm (Ω)"],"Énergies en joule (J), puissances en watt (W).");
m(3,"Vocabulaire","Dans la formule du rendement, que désigne Pf ?","La puissance mécanique fournie (reçue, absorbée) par l'alternateur",["La puissance électrique utile","La puissance perdue en chaleur","La fréquence du courant"],"Pf = puissance mécanique fournie à l'alternateur (= puissance reçue ou absorbée). Pu = puissance électrique utile.");
m(3,"Vocabulaire","Dans la formule du rendement, que désigne Pu ?","La puissance électrique utile",["La puissance mécanique reçue","La puissance dissipée","La puissance du Soleil"],"Pu = puissance électrique utile (W).");
m(3,"Formule","Quelle est la formule de la fréquence du courant fourni par un alternateur ?","f = N × ω",["f = N / ω","f = ω / N","f = N + ω"],"f = N × ω : f en Hz, N = nombre d'aimants du rotor, ω = vitesse de rotation en tours par seconde.");
m(3,"Unités","Dans f = N × ω, en quelle unité doit être ω ?","En tours par seconde (tr·s⁻¹)",["En tours par minute (tr/min)","En hertz par minute","En mètres par seconde"],"ω en tr·s⁻¹. Si on te donne des tr/min, divise par 60 !");
m(3,"Unités","Dans f = N × ω, quelle est l'unité de f ?","Le hertz (Hz)",["Le watt (W)","Le tour par seconde","Le joule (J)"],"f = fréquence en hertz (Hz).");
m(3,"Vocabulaire","Dans f = N × ω, que représente N ?","Le nombre d'aimants du rotor",["Le nombre de bobines du stator","Le rendement","Le nombre de tours par minute"],"N = nombre d'aimants du rotor, ω = vitesse de rotation du rotor.");
m(3,"Proportionnalité","D'après f = N × ω, si on double la vitesse de rotation (N fixé), la fréquence…","Double",["Est divisée par 2","Ne change pas","Est multipliée par 4"],"f est proportionnelle à ω : ω × 2 → f × 2.");
m(3,"Conversion","Comment convertir une vitesse de rotation de tr/min en tr/s ?","On divise par 60",["On multiplie par 60","On divise par 3600","On multiplie par 1000"],"1 min = 60 s, donc 1 500 tr/min = 1 500 / 60 = 25 tr/s.");
m(3,"Formule","Comment calculer la puissance utile si on connaît r et Pf ?","Pu = r × Pf",["Pu = Pf / r","Pu = r / Pf","Pu = Pf − r"],"r = Pu / Pf ⇒ Pu = r × Pf.");
m(3,"Formule","Comment calculer la puissance reçue si on connaît r et Pu ?","Pf = Pu / r",["Pf = Pu × r","Pf = r / Pu","Pf = Pu − r"],"r = Pu / Pf ⇒ Pf = Pu / r.");
m(3,"Formule","Comment calculer l'énergie dissipée ?","Edissipée = Ereçue − Eu",["Edissipée = Eu − Ereçue","Edissipée = Ereçue + Eu","Edissipée = Eu / Ereçue"],"Conservation : Ereçue = Eu + Edissipée ⇒ Edissipée = Ereçue − Eu.");
m(3,"Conversion","Quel rendement correspond à r = 0,93 ?","93 %",["0,93 %","9,3 %","7 %"],"Pour passer en %, on multiplie par 100 : 0,93 → 93 %.");
m(3,"Piège","Un élève trouve un rendement de 1,08 pour un alternateur. Que conclure ?","Il s'est trompé : un rendement est toujours inférieur à 1",["C'est un excellent alternateur","C'est normal pour un alternateur industriel","Il faut l'exprimer en joules"],"Un rendement > 1 est impossible (énergie créée !). Il a sûrement inversé Pu et Pf.");
vf(3,"Le rendement d'un alternateur s'exprime en watt.",false,"Faux : c'est un rapport de deux puissances, donc sans unité (ou en %).");
vf(3,"Dans f = N × ω, on peut utiliser directement une vitesse en tr/min.",false,"Faux : ω doit être en tr/s. Il faut diviser les tr/min par 60.");
vf(3,"La puissance se conserve comme l'énergie : Pf = Pu + Pdissipée.",true,"Vrai : le cours précise que l'énergie, ainsi que la puissance, se conservent.");
vf(3,"Un rendement de 0,9 et un rendement de 90 % sont la même chose.",true,"Vrai : 0,9 × 100 = 90 %.");
ty(3,"Formule du rendement d'un alternateur avec les puissances : r = ?",["Pu/Pf","Pu sur Pf","Pu / Pf"],"r = Pu / Pf = Eu / Ereçue.",["Pf/Pu"]);
ty(3,"Unité de la fréquence ?",["hertz","Hz"],"La fréquence s'exprime en hertz (Hz).");
ty(3,"Unité d'une puissance ?",["watt","W","watts"],"Puissance en watt (W), énergie en joule (J).",["joule"]);
ty(3,"Unité d'une énergie ?",["joule","J","joules"],"Énergie en joule (J), puissance en watt (W).",["watt"]);
ty(3,"Pour convertir des tr/min en tr/s, on divise par combien ?",["60","soixante"],"1 min = 60 s : tr/min ÷ 60 = tr/s.");

// exercices types (correction détaillée dans l'explication)
m(3,"Exercice","Un alternateur reçoit Pf = 1 000 MW et fournit Pu = 900 MW. Quel est son rendement ?","90 %",["111 %","10 %","9 %"],"r = Pu / Pf = 900 / 1 000 = 0,90 = 90 %. (1 000 / 900 = 1,11 est le piège : on a inversé.)");
m(3,"Exercice","Un alternateur reçoit Pf = 2,0 MW et fournit Pu = 1,9 MW. Quel est son rendement ?","95 %",["105 %","5 %","0,95 %"],"r = Pu / Pf = 1,9 / 2,0 = 0,95 = 95 %.");
m(3,"Exercice","Un alternateur reçoit 500 kW et fournit 460 kW. Quel est son rendement ?","92 %",["8 %","109 %","46 %"],"r = 460 / 500 = 0,92 = 92 %. Les deux puissances sont en kW, pas besoin de convertir.");
m(3,"Exercice","Un alternateur reçoit Ereçue = 5,0 MJ et fournit Eu = 4,5 MJ. Quel est son rendement ?","90 %",["10 %","111 %","0,5 %"],"r = Eu / Ereçue = 4,5 / 5,0 = 0,90 = 90 %.");
m(3,"Exercice","Un alternateur reçoit 3,0 kW et fournit 2 820 W. Quel est son rendement ?","94 %",["940 %","6 %","0,94 %"],"Attention aux unités : 3,0 kW = 3 000 W. r = 2 820 / 3 000 = 0,94 = 94 %.");
m(3,"Exercice","Un alternateur de rendement 95 % reçoit Pf = 600 MW. Quelle puissance électrique fournit-il ?","570 MW",["632 MW","30 MW","595 MW"],"Pu = r × Pf = 0,95 × 600 = 570 MW. (600 / 0,95 ≈ 632 MW est le piège.)");
m(3,"Exercice","Un alternateur de rendement 92 % reçoit 50 kW. Quelle puissance utile fournit-il ?","46 kW",["54 kW","4 kW","42 kW"],"Pu = r × Pf = 0,92 × 50 = 46 kW.");
m(3,"Exercice","Un alternateur de rendement 90 % fournit Pu = 900 MW. Quelle puissance mécanique reçoit-il ?","1 000 MW",["810 MW","990 MW","90 MW"],"Pf = Pu / r = 900 / 0,90 = 1 000 MW. (0,90 × 900 = 810 MW est le piège.)");
m(3,"Exercice","Un alternateur de rendement 95 % fournit 47,5 kW. Quelle puissance reçoit-il ?","50 kW",["45,1 kW","52,5 kW","2,5 kW"],"Pf = Pu / r = 47,5 / 0,95 = 50 kW.");
m(3,"Exercice","Un alternateur reçoit 1 000 J et fournit 930 J d'énergie électrique. Quelle énergie est dissipée ?","70 J",["1 930 J","930 J","7 J"],"Edissipée = Ereçue − Eu = 1 000 − 930 = 70 J (sous forme thermique). Rendement : 93 %.");
m(3,"Exercice","Un alternateur de rendement 94 % reçoit 500 MW. Quelle puissance perd-il en chaleur ?","30 MW",["470 MW","6 MW","530 MW"],"Pu = 0,94 × 500 = 470 MW, donc Pdissipée = 500 − 470 = 30 MW (= 6 % de 500).");
m(3,"Exercice","Un alternateur de rendement 90 % reçoit 20 MJ. Quelle énergie est dissipée ?","2 MJ",["18 MJ","22 MJ","0,2 MJ"],"Eu = 0,90 × 20 = 18 MJ, donc Edissipée = 20 − 18 = 2 MJ (10 % de pertes).");
m(3,"Exercice","Un rotor de N = 4 aimants tourne à ω = 12,5 tr/s. Quelle est la fréquence du courant ?","50 Hz",["3,1 Hz","16,5 Hz","0,32 Hz"],"f = N × ω = 4 × 12,5 = 50 Hz (la fréquence du réseau électrique français).");
m(3,"Exercice","Un rotor de N = 2 aimants tourne à 1 500 tr/min. Quelle est la fréquence du courant ?","50 Hz",["3 000 Hz","750 Hz","25 Hz"],"ω = 1 500 / 60 = 25 tr/s, puis f = N × ω = 2 × 25 = 50 Hz. Piège : 2 × 1 500 = 3 000 sans convertir.");
m(3,"Exercice","Un rotor de N = 10 aimants tourne à 300 tr/min. Quelle est la fréquence du courant ?","50 Hz",["3 000 Hz","30 Hz","5 Hz"],"ω = 300 / 60 = 5 tr/s, f = 10 × 5 = 50 Hz.");
m(3,"Exercice","Un rotor de N = 6 aimants tourne à 600 tr/min. Quelle est la fréquence du courant ?","60 Hz",["3 600 Hz","100 Hz","10 Hz"],"ω = 600 / 60 = 10 tr/s, f = 6 × 10 = 60 Hz.");
m(3,"Exercice","On veut f = 50 Hz avec un rotor de N = 4 aimants. À quelle vitesse doit-il tourner ?","12,5 tr/s (soit 750 tr/min)",["200 tr/s","12,5 tr/min","54 tr/s"],"ω = f / N = 50 / 4 = 12,5 tr/s = 12,5 × 60 = 750 tr/min.");
m(3,"Exercice","Un rotor tourne à 3 000 tr/min et produit un courant de 50 Hz. Combien a-t-il d'aimants (d'après f = N × ω) ?","1",["60","50","2"],"ω = 3 000 / 60 = 50 tr/s, donc N = f / ω = 50 / 50 = 1.");
m(3,"Exercice","Un rotor tourne à 5 tr/s et produit un courant de 50 Hz. Combien a-t-il d'aimants ?","10",["250","0,1","55"],"N = f / ω = 50 / 5 = 10 aimants.");
m(3,"Exercice","Un rotor de 2 aimants tourne à 25 tr/s. Si sa vitesse passe à 50 tr/s, la fréquence passe…","De 50 Hz à 100 Hz",["De 50 Hz à 25 Hz","De 50 Hz à 50 Hz","De 12,5 Hz à 25 Hz"],"f = 2 × 25 = 50 Hz puis f = 2 × 50 = 100 Hz : f proportionnelle à ω.");
ty(3,"Pf = 1 000 MW, Pu = 900 MW. Rendement en % ?",["90","90 %","0,9","0,90"],"r = Pu / Pf = 900 / 1 000 = 0,90 = 90 %.");
ty(3,"Pf = 500 kW, Pu = 460 kW. Rendement en % ?",["92","92 %","0,92"],"r = 460 / 500 = 0,92 = 92 %.");
ty(3,"r = 95 %, Pf = 600 MW. Pu en MW ?",["570","570 MW"],"Pu = r × Pf = 0,95 × 600 = 570 MW.");
ty(3,"r = 90 %, Pu = 900 MW. Pf en MW ?",["1000","1 000","1000 MW","1 000 MW"],"Pf = Pu / r = 900 / 0,9 = 1 000 MW.");
ty(3,"Ereçue = 1 000 J, Eu = 930 J. Énergie dissipée en J ?",["70","70 J"],"Edissipée = Ereçue − Eu = 1 000 − 930 = 70 J.");
ty(3,"N = 4 aimants, ω = 12,5 tr/s. Fréquence en Hz ?",["50","50 Hz"],"f = N × ω = 4 × 12,5 = 50 Hz.");
ty(3,"N = 2 aimants, ω = 1 500 tr/min. Fréquence en Hz ?",["50","50 Hz"],"ω = 1 500 / 60 = 25 tr/s ; f = 2 × 25 = 50 Hz.");
ty(3,"Convertis 1 500 tr/min en tr/s.",["25","25 tr/s"],"1 500 / 60 = 25 tr/s.");
ty(3,"Convertis 3 000 tr/min en tr/s.",["50","50 tr/s"],"3 000 / 60 = 50 tr/s.");
ty(3,"N = 6 aimants, ω = 600 tr/min. Fréquence en Hz ?",["60","60 Hz"],"ω = 600 / 60 = 10 tr/s ; f = 6 × 10 = 60 Hz.");
ty(3,"f = 50 Hz, ω = 5 tr/s. Nombre d'aimants N ?",["10","dix"],"N = f / ω = 50 / 5 = 10.");

// ===================== 4. Semi-conducteurs et photovoltaïque =====================
m(4,"Physique quantique","Quelle découverte de la physique quantique permet le photovoltaïque ?","L'effet photoélectrique (absorption de la lumière par la matière)",["L'induction électromagnétique","La radioactivité","La conservation de l'énergie"],"La physique quantique a permis de développer des technologies reposant sur l'effet photoélectrique.");
m(4,"Définition","L'effet photoélectrique, c'est…","Un rayonnement électromagnétique assez énergétique qui met en mouvement des électrons à la surface d'un matériau",["L'apparition d'un courant dans un conducteur qui bouge près d'un aimant","La transformation de chaleur en lumière","La rotation d'une turbine par la lumière"],"Mot-clé : interaction lumière-matière où un rayonnement suffisamment énergétique met des électrons en mouvement.");
m(4,"Définition","Un semi-conducteur est…","Un matériau isolant qui devient conducteur avec un apport d'énergie extérieur",["Un métal très bon conducteur","Un isolant qui ne conduit jamais","Un aimant qui tourne"],"Semi-conducteur = isolant capable, sous l'effet d'une excitation extérieure suffisamment importante, de conduire le courant.");
m(4,"Spectres","Les semi-conducteurs absorbent-ils tous la lumière de la même façon ?","Non, leurs spectres d'absorption varient d'un matériau à l'autre",["Oui, ils ont tous le même spectre","Oui, ils absorbent toutes les longueurs d'onde","Non, ils n'absorbent aucune lumière"],"Les spectres d'absorption varient d'un semi-conducteur à l'autre : ils n'absorbent pas de la même façon les ondes électromagnétiques.");
m(4,"Capteur","De quoi est composé un capteur photovoltaïque ?","D'un grand nombre de cellules photovoltaïques (jonctions de semi-conducteurs)",["D'un rotor et d'un stator","D'un aimant et d'une bobine","D'une turbine et d'un alternateur"],"Capteur PV = beaucoup de cellules obtenues par jonction entre semi-conducteurs.");
m(4,"Matériau","De quel matériau la plupart des capteurs photovoltaïques sont-ils faits ?","Le silicium",["Le cuivre","Le germanium","Le fer"],"La plupart des capteurs PV sont en silicium.");
m(4,"Rendement","Quel est le rendement d'un capteur photovoltaïque au silicium ?","Environ 20 à 25 %",["Environ 90 à 95 %","Environ 5 à 10 %","100 %"],"Capteur PV silicium : 20-25 %. Alternateur : 90-95 %. Ne pas confondre !");
m(4,"Améliorer","Comment obtenir de meilleurs rendements photovoltaïques ?","Multiplier les jonctions avec différents semi-conducteurs pour élargir le spectre d'absorption",["Utiliser du cuivre à la place du silicium","Faire tourner le panneau plus vite","Ajouter un aimant"],"Plusieurs types de semi-conducteurs = spectre d'absorption beaucoup plus large = plus d'énergie captée.");
m(4,"Conversion","Un capteur photovoltaïque convertit…","De l'énergie radiative (lumineuse) en énergie électrique",["De l'énergie mécanique en énergie électrique","De l'énergie électrique en lumière","De l'énergie thermique en énergie mécanique"],"Mot-clé : capteur photovoltaïque = conversion d'énergie radiative lumineuse en énergie électrique.");
m(4,"Courant","Quel type de courant produit une cellule photovoltaïque ?","Un courant continu",["Un courant alternatif","Aucun courant","Un courant à 50 Hz"],"Cellule PV → courant continu. Alternateur → courant alternatif.");
m(4,"Chaîne énergétique","Quelle est la chaîne énergétique d'un panneau solaire photovoltaïque ?","Énergie lumineuse → énergie électrique (utile) + énergie thermique (perdue)",["Énergie mécanique → énergie électrique + énergie thermique","Énergie électrique → énergie lumineuse","Énergie thermique → énergie lumineuse"],"Soleil → (énergie lumineuse) → panneau → énergie électrique vers le réseau + énergie thermique vers le milieu extérieur.");
m(4,"Comparaison","Quelle différence entre un alternateur et un capteur photovoltaïque ?","L'alternateur utilise l'induction (énergie mécanique), le capteur PV l'effet photoélectrique (énergie lumineuse)",["Les deux utilisent l'induction","Les deux produisent du courant alternatif","Le capteur PV a un meilleur rendement"],"Alternateur : mécanique → électrique, induction, alternatif, r ≈ 90-95 %. Capteur PV : lumineuse → électrique, effet photoélectrique, continu, r ≈ 20-25 %.");
m(4,"Composants","À part les cellules photovoltaïques, que fabrique-t-on avec des semi-conducteurs ?","Des composants électroniques (diodes, transistors)",["Des aimants","Des turbines","Des fils électriques en cuivre"],"Leurs propriétés électriques facilement contrôlables permettent de fabriquer diodes, transistors et cellules PV.");
m(4,"Fonctionnement","Dans une cellule photovoltaïque, d'où vient l'énergie qui libère les électrons ?","Des photons du rayonnement solaire",["De la rotation d'un aimant","D'une pile","De la chaleur du stator"],"Les photons apportent l'énergie nécessaire pour libérer et faire circuler des électrons dans un circuit extérieur.");
vf(4,"Un semi-conducteur est un très bon conducteur, comme le cuivre.",false,"Faux : c'est un isolant qui devient conducteur seulement avec un apport d'énergie extérieur.");
vf(4,"Une cellule photovoltaïque produit un courant continu.",true,"Vrai : courant continu (l'alternateur produit de l'alternatif).");
vf(4,"Le rendement d'un capteur photovoltaïque au silicium est d'environ 20 à 25 %.",true,"Vrai.");
vf(4,"Tous les semi-conducteurs ont le même spectre d'absorption.",false,"Faux : les spectres d'absorption varient d'un semi-conducteur à l'autre.");
vf(4,"Multiplier les jonctions entre différents semi-conducteurs élargit le spectre d'absorption du capteur.",true,"Vrai : c'est comme ça qu'on améliore le rendement.");
vf(4,"Un capteur photovoltaïque contient un rotor et un stator.",false,"Faux : il est constitué de semi-conducteurs. Rotor et stator, c'est l'alternateur.");
vf(4,"L'effet photoélectrique est une absorption de la lumière par la matière.",true,"Vrai : c'est la définition donnée dans le cours.");
ty(4,"Matériau qui compose la plupart des capteurs photovoltaïques ?",["silicium","le silicium","Si"],"Le silicium (rendement 20-25 %).",["germanium"]);
ty(4,"Phénomène physique à la base du photovoltaïque ?",["effet photoélectrique","photoélectrique","l'effet photoélectrique"],"L'effet photoélectrique (absorption de la lumière par la matière).",["induction"]);
ty(4,"Matériau isolant qui devient conducteur avec un apport d'énergie extérieur ?",["semi-conducteur","semi conducteur","semiconducteur","un semi-conducteur"],"C'est un semi-conducteur.");
ty(4,"Rendement d'un capteur photovoltaïque au silicium (en %, environ) ?",["20","25","20 à 25","20-25","20 %","25 %"],"Environ 20 à 25 %.");
ty(4,"Une cellule photovoltaïque produit un courant… (continu ou alternatif ?)",["continu","courant continu"],"Courant continu.",["alternatif"]);

// ===================== 5. Bandes d'énergie et silicium (pour aller plus loin) =====================
m(5,"Électrons","Comment appelle-t-on les électrons des couches externes qui permettent aux atomes de se lier ?","Les électrons de valence",["Les électrons de conduction","Les photons","Les électrons de cœur"],"Électrons de valence = couches externes, liaisons entre atomes. Électrons libres (de conduction) = circulation du courant.");
m(5,"Électrons","Quels électrons sont responsables de la circulation du courant ?","Les électrons libres (électrons de conduction)",["Les électrons de valence liés","Les protons","Les neutrons"],"Les électrons libres ou de conduction font circuler le courant.");
m(5,"Bandes","Comment s'appelle la dernière bande d'énergie complètement remplie d'électrons ?","La bande de valence",["La bande de conduction","La bande interdite","Le gap"],"Bande de valence = dernière bande pleine. Bande de conduction = la suivante, pas remplie.");
m(5,"Bandes","Comment s'appelle la bande d'énergie située après la bande de valence et qui n'est pas remplie ?","La bande de conduction",["La bande interdite","La bande de valence","La bande passante"],"Bande de conduction = non remplie, au-dessus de la bande de valence.");
m(5,"Bandes","Comment s'appelle la zone entre la bande de valence et la bande de conduction ?","La bande interdite (ou « gap »)",["La bande de conduction","La couche externe","Le spectre d'absorption"],"C'est la bande interdite ou gap : elle fixe les propriétés électriques du matériau.");
m(5,"Bandes","Qu'est-ce qui fixe les propriétés électriques (conducteur, isolant, semi-conducteur) d'un matériau ?","La largeur de la bande interdite (gap)",["La couleur du matériau","La masse du matériau","Sa température de fusion"],"C'est la bande interdite qui fixe les propriétés électriques.");
m(5,"Conducteur","Dans un conducteur, les bandes de valence et de conduction…","Se chevauchent : il n'y a pas de bande interdite",["Sont séparées d'environ 6 eV","Sont séparées d'environ 1 eV","Sont toutes les deux vides"],"Conducteur (or, argent, cuivre) : bandes qui se chevauchent, pas de gap, les électrons passent librement.");
m(5,"Isolant","Dans un isolant, l'écart entre bande de valence et bande de conduction est d'environ…","6 eV",["1 eV","0 eV","1,12 eV"],"Isolant : bandes très éloignées (≈ 6 eV), les électrons ne peuvent pas franchir le gap.");
m(5,"Semi-conducteur","Dans un semi-conducteur, l'écart (gap) entre les bandes est d'environ…","1 eV",["6 eV","0 eV (elles se chevauchent)","100 eV"],"Semi-conducteur : gap plus petit que pour un isolant, environ 1 eV.");
m(5,"Silicium","Quelle est l'énergie de gap (Eg) du silicium ?","1,12 eV",["6 eV","0 eV","12 eV"],"Pour le silicium, Eg = 1,12 eV.");
m(5,"Photon","Pour qu'un photon fasse passer un électron d'un semi-conducteur dans la bande de conduction, son énergie doit être…","Supérieure ou égale à Eg (l'énergie du gap)",["Strictement inférieure à Eg","Égale à 0","Égale à 6 eV exactement"],"Le photon doit avoir une énergie ≥ Eg pour faire franchir la bande interdite à l'électron.");
m(5,"Trou","Quand un électron passe dans la bande de conduction, que laisse-t-il dans la bande de valence ?","Un trou positif",["Un photon","Un neutron","Un aimant"],"L'électron excité crée un trou positif dans la bande (couche) de valence.");
m(5,"Exemples","Lesquels sont des métaux conducteurs cités dans le cours ?","L'or, l'argent, le cuivre",["Le silicium, le germanium","Le verre, le bois","L'antimoine, le fluor"],"Conducteurs : or, argent, cuivre. Semi-conducteurs élémentaires : silicium, germanium.");
m(5,"Exemples","Quels sont les semi-conducteurs élémentaires cités ?","Le silicium (Si) et le germanium (Ge)",["Le cuivre et l'or","Le fer et le nickel","L'oxygène et l'azote"],"Semi-conducteurs élémentaires : Si et Ge.");
m(5,"Énergie","Comment apporter de l'énergie à un matériau pour faire passer des électrons dans la bande de conduction ?","Par chauffage ou par éclairement",["En le refroidissant","En le coupant en deux","En le pesant"],"Chauffage ou éclairement : certains électrons passent de la bande de valence à la bande de conduction.");
m(5,"Dopage","Qu'est-ce que le dopage d'un semi-conducteur ?","Introduire un autre élément chimique dans sa structure pour faciliter le passage du gap",["Le chauffer à très haute température","Le recouvrir de cuivre","L'aimanter"],"Doper = insérer des atomes d'un autre élément (antimoine, fluor, phosphore…) pour augmenter le nombre d'électrons libres.");
m(5,"Dopage","Quel exemple de dopant du silicium est cité dans le cours ?","Le phosphore (ou l'antimoine, le fluor)",["Le cuivre","L'or","L'oxygène"],"Exemples cités : antimoine, fluor, et des atomes de phosphore dans du silicium.");
m(5,"Conductivité","À température ambiante, pourquoi un semi-conducteur conduit-il peu ?","Il a très peu d'électrons libres",["Il n'a aucun électron","Ses bandes se chevauchent","Son gap fait 6 eV"],"Peu d'électrons libres à température ambiante → faible conductivité. On l'augmente par dopage (ou un peu avec la température).");
m(5,"Conductivité","La conductivité d'un semi-conducteur est…","Intermédiaire entre celle d'un isolant et celle d'un conducteur",["Plus grande que celle du cuivre","Nulle","Identique à celle d'un isolant"],"Semi-conducteur = conductivité intermédiaire.");
m(5,"Longueur d'onde","Un gap d'environ 1 eV correspond à une radiation de longueur d'onde d'environ…","1 200 nm",["400 nm","6 000 nm","120 nm"],"D'après le spectre d'absorption : 1 eV ↔ λ ≈ 1 200 nm. Les semi-conducteurs absorbent les λ < 1 200 nm.");
m(5,"Longueur d'onde","La plupart des semi-conducteurs absorbent les radiations de longueur d'onde…","Inférieure à 1 200 nm",["Supérieure à 1 200 nm","Uniquement égale à 1 200 nm","Supérieure à 6 000 nm"],"λ < 1 200 nm suffit pour passer le gap et faire circuler les électrons.");
m(5,"Silicium","Le silicium peut absorber les longueurs d'onde…","Inférieures à 1 100 nm (visible et proche infrarouge)",["Supérieures à 1 100 nm","Uniquement l'ultraviolet","Uniquement les ondes radio"],"Toutes les λ < 1 100 nm (visible et proche IR) font passer les électrons du silicium dans la bande de conduction.");
m(5,"Pourquoi le silicium","Pourquoi utilise-t-on le silicium plutôt que le germanium pour les panneaux solaires ?","Il est 4 fois moins cher et très abondant sur Terre",["Il absorbe beaucoup plus de longueurs d'onde que le germanium","Il est conducteur comme le cuivre","Il n'a pas de bande interdite"],"Les deux absorbent les λ < 1 100 nm. Arguments : le prix (4 fois moins cher) et l'abondance (2e élément le plus abondant de la croûte terrestre). En plus, le germanium est plus sensible à haute température.");
m(5,"Silicium","Le silicium est le ___ élément chimique le plus abondant de la croûte terrestre.","2e",["1er","10e","50e"],"Le silicium est le deuxième élément le plus abondant dans la croûte terrestre.");
m(5,"Prix","Combien le silicium coûte-t-il par rapport au germanium ?","4 fois moins cher",["4 fois plus cher","2 fois moins cher","Le même prix"],"Silicium : environ 4 fois moins cher que le germanium.");
m(5,"Germanium","Quel défaut du germanium est cité, en plus du prix ?","Il est plus sensible à haute température",["Il n'absorbe aucune lumière","Il est radioactif","Il est conducteur"],"Le germanium est plus sensible à haute température (gênant au soleil).");
m(5,"Large spectre","Pourquoi les capteurs PV ont-ils besoin de semi-conducteurs à large spectre d'absorption ?","Pour absorber un maximum d'énergie radiative du Soleil et augmenter le rendement",["Pour produire du courant alternatif","Pour chauffer la maison","Pour réduire la tension"],"Plus le spectre d'absorption est large, plus on capte d'énergie solaire, meilleur est le rendement.");
vf(5,"Dans un conducteur, il n'y a pas de bande interdite.",true,"Vrai : bandes de valence et de conduction se chevauchent.");
vf(5,"Dans un isolant, le gap est d'environ 1 eV.",false,"Faux : ≈ 6 eV pour un isolant, ≈ 1 eV pour un semi-conducteur.");
vf(5,"Le gap du silicium vaut 1,12 eV.",true,"Vrai.");
vf(5,"Un photon d'énergie inférieure au gap peut faire passer un électron dans la bande de conduction.",false,"Faux : il faut une énergie supérieure ou égale à Eg.");
vf(5,"Le germanium est plus cher que le silicium.",true,"Vrai : le silicium est environ 4 fois moins cher.");
vf(5,"Le silicium absorbe les longueurs d'onde supérieures à 1 100 nm.",false,"Faux : il absorbe celles inférieures à 1 100 nm (visible et proche infrarouge).");
vf(5,"Le dopage augmente le nombre d'électrons libres d'un semi-conducteur.",true,"Vrai : on insère des atomes d'un autre élément (ex. phosphore dans le silicium).");
vf(5,"La conductivité d'un semi-conducteur peut augmenter légèrement avec la température.",true,"Vrai : « La conductivité électrique d'un matériau peut également augmenter, faiblement, avec la température ».");
vf(5,"Les électrons de valence sont ceux qui font circuler le courant.",false,"Faux : les électrons de valence lient les atomes ; ce sont les électrons libres (de conduction) qui font circuler le courant.");
ty(5,"Nom de la zone entre la bande de valence et la bande de conduction ?",["bande interdite","gap","le gap","la bande interdite"],"La bande interdite, aussi appelée gap.");
ty(5,"Dernière bande d'énergie complètement remplie d'électrons ?",["bande de valence","valence"],"La bande de valence.",["bande de conduction"]);
ty(5,"Bande d'énergie non remplie, au-dessus de la bande de valence ?",["bande de conduction","conduction"],"La bande de conduction.",["bande de valence"]);
ty(5,"Gap du silicium (en eV) ?",["1,12","1,12 eV","1.12"],"Eg(Si) = 1,12 eV.");
ty(5,"Écart entre les bandes d'un isolant (en eV, environ) ?",["6","6 eV"],"Environ 6 eV.");
ty(5,"Longueur d'onde maximale (en nm) absorbée par le silicium ?",["1100","1 100","1100 nm","1 100 nm"],"Le silicium absorbe les λ < 1 100 nm.");
ty(5,"Nom de l'opération qui consiste à introduire un autre élément chimique dans un semi-conducteur ?",["dopage","le dopage","doper"],"Le dopage (ex. phosphore dans le silicium).");
ty(5,"Autre semi-conducteur élémentaire, à part le silicium ?",["germanium","Ge","le germanium"],"Silicium (Si) et germanium (Ge).");

// ===================== 6. Calculs : capteur photovoltaïque =====================
m(6,"Définition","Qu'appelle-t-on la caractéristique d'un dipôle ?","La relation entre la tension U à ses bornes et l'intensité I qui le traverse (courbe U = f(I) ou I = g(U))",["Sa masse et son volume","Son rendement en %","La couleur de ses fils"],"La caractéristique est la courbe U = f(I) ou I = g(U) du dipôle.");
m(6,"Formule","Quelle est la formule de la puissance maximale d'un capteur photovoltaïque ?","Pmax = Umax × Imax",["Pmax = Umax / Imax","Pmax = E × S","Pmax = Rmax × Imax"],"Pmax = Umax × Imax, lue sur la caractéristique I(U).");
m(6,"Formule","Quelle est la formule de la résistance qui maximise la puissance ?","Rmax = Umax / Imax",["Rmax = Umax × Imax","Rmax = Imax / Umax","Rmax = Pmax × Imax"],"Loi d'Ohm au point de puissance max : Umax = Rmax × Imax ⇒ Rmax = Umax / Imax.");
m(6,"Formule","Quelle est la formule de la puissance lumineuse reçue par un capteur ?","Pf = E × S",["Pf = E / S","Pf = U × I","Pf = S / E"],"Pf = E × S, avec E l'éclairement (W·m⁻²) et S la surface (m²).");
m(6,"Formule","Quelle est la formule du rendement d'un capteur photovoltaïque ?","r = Pmax / (E × S)",["r = (E × S) / Pmax","r = Pmax × E × S","r = Umax / Imax"],"r = Pu / Pf avec Pu = Pmax et Pf = E × S.");
m(6,"Unités","Quelle est l'unité de l'éclairement E ?","Le watt par mètre carré (W·m⁻²)",["Le watt (W)","Le mètre carré (m²)","Le volt (V)"],"E en W·m⁻² (W/m²). S en m². Donc E × S en W.");
m(6,"Unités","Dans Pf = E × S, la surface S doit être en…","Mètres carrés (m²)",["Centimètres carrés (cm²)","Mètres (m)","Watts (W)"],"S en m². Attention : 1 cm² = 0,0001 m² (10⁻⁴ m²).");
m(6,"Unités","Quelle est l'unité d'une résistance ?","L'ohm (Ω)",["Le volt (V)","L'ampère (A)","Le watt (W)"],"R en ohm (Ω), U en volt (V), I en ampère (A), P en watt (W).");
m(6,"Unités","Quelle est l'unité d'une intensité ?","L'ampère (A)",["Le volt (V)","L'ohm (Ω)","Le hertz (Hz)"],"I en ampère (A).");
m(6,"Unités","Quelle est l'unité d'une tension ?","Le volt (V)",["L'ampère (A)","Le watt (W)","L'ohm (Ω)"],"U en volt (V).");
m(6,"Graphique","Sur la courbe P(U) d'une cellule photovoltaïque, comment est la puissance ?","Elle augmente, passe par un maximum Pmax puis chute",["Elle est constante","Elle augmente sans arrêt","Elle diminue toujours"],"P(U) monte jusqu'à Pmax (pour U = Umax) puis redescend vite à 0.");
m(6,"Graphique","Sur la caractéristique I(U) d'une cellule photovoltaïque, comment varie I quand U augmente ?","I reste presque constant puis chute brutalement",["I augmente régulièrement","I est toujours nul","I augmente brutalement à la fin"],"I(U) : palier presque horizontal puis chute rapide vers 0. Umax est juste avant la chute.");
m(6,"Optimum","Quand le fonctionnement d'un capteur photovoltaïque est-il optimal ?","Quand la puissance délivrée au récepteur (résistance R) est maximale",["Quand la tension est nulle","Quand l'intensité est nulle","Quand il fait nuit"],"Fonctionnement optimal = puissance délivrée maximale, avec R = Rmax = Umax / Imax.");
m(6,"Unités","Convertis 100 cm² en m².","0,01 m²",["1 m²","0,1 m²","10 000 m²"],"1 m² = 10 000 cm², donc 100 cm² = 100 / 10 000 = 0,01 m².");
m(6,"Unités","Une cellule carrée mesure 15 cm de côté. Quelle est sa surface en m² ?","0,0225 m²",["225 m²","0,225 m²","0,15 m²"],"S = 0,15 m × 0,15 m = 0,0225 m² (= 225 cm²).");
m(6,"Exercice","Une cellule a Umax = 0,5 V et Imax = 3 A. Quelle est sa puissance maximale ?","1,5 W",["0,17 W","6 W","3,5 W"],"Pmax = Umax × Imax = 0,5 × 3 = 1,5 W.");
m(6,"Exercice","Un panneau a Umax = 30 V et Imax = 8 A. Quelle est sa puissance maximale ?","240 W",["3,75 W","38 W","2 400 W"],"Pmax = Umax × Imax = 30 × 8 = 240 W.");
m(6,"Exercice","Un panneau a Umax = 18 V et Imax = 5,5 A. Quelle est sa puissance maximale ?","99 W",["3,3 W","23,5 W","9,9 W"],"Pmax = 18 × 5,5 = 99 W.");
m(6,"Exercice","Un panneau a Umax = 30 V et Imax = 8 A. Quelle résistance faut-il brancher pour avoir la puissance maximale ?","3,75 Ω",["240 Ω","0,27 Ω","38 Ω"],"Rmax = Umax / Imax = 30 / 8 = 3,75 Ω.");
m(6,"Exercice","Un panneau a Umax = 36 V et Imax = 9 A. Quelle est la résistance optimale Rmax ?","4 Ω",["324 Ω","0,25 Ω","45 Ω"],"Rmax = Umax / Imax = 36 / 9 = 4 Ω.");
m(6,"Exercice","Un panneau de surface S = 1,6 m² reçoit un éclairement E = 1 000 W·m⁻². Quelle puissance lumineuse reçoit-il ?","1 600 W",["625 W","1 001,6 W","0,0016 W"],"Pf = E × S = 1 000 × 1,6 = 1 600 W.");
m(6,"Exercice","Une cellule de 100 cm² reçoit un éclairement de 1 000 W·m⁻². Quelle puissance lumineuse reçoit-elle ?","10 W",["100 000 W","1 000 W","0,1 W"],"S = 100 cm² = 0,01 m², donc Pf = 1 000 × 0,01 = 10 W. Piège : 1 000 × 100 sans convertir.");
m(6,"Exercice","Un panneau de 2 m² reçoit E = 800 W·m⁻². Quelle puissance lumineuse reçoit-il ?","1 600 W",["400 W","802 W","16 000 W"],"Pf = E × S = 800 × 2 = 1 600 W.");
m(6,"Exercice","Un panneau de 1,6 m² éclairé à 1 000 W·m⁻² délivre Pmax = 240 W. Quel est son rendement ?","15 %",["667 %","24 %","1,5 %"],"Pf = 1 000 × 1,6 = 1 600 W ; r = Pmax / Pf = 240 / 1 600 = 0,15 = 15 %.");
m(6,"Exercice","Un panneau de 1,6 m² éclairé à 1 000 W·m⁻² délivre Pmax = 320 W. Quel est son rendement ?","20 %",["32 %","500 %","2 %"],"r = 320 / (1 000 × 1,6) = 320 / 1 600 = 0,20 = 20 %.");
m(6,"Exercice","Un panneau de 2 m² éclairé à 800 W·m⁻² délivre 400 W. Quel est son rendement ?","25 %",["50 %","20 %","400 %"],"Pf = 800 × 2 = 1 600 W ; r = 400 / 1 600 = 0,25 = 25 %.");
m(6,"Exercice","Une cellule de 15 cm × 15 cm, éclairée à 1 000 W·m⁻², délivre Pmax = 4,5 W. Quel est son rendement ?","20 %",["2 %","0,02 %","45 %"],"S = 0,15 × 0,15 = 0,0225 m² ; Pf = 1 000 × 0,0225 = 22,5 W ; r = 4,5 / 22,5 = 0,20 = 20 %.");
m(6,"Exercice","Une cellule de 100 cm² éclairée à 1 000 W·m⁻² a Umax = 0,5 V et Imax = 3 A. Quel est son rendement ?","15 %",["0,15 %","1,5 %","67 %"],"Pmax = 0,5 × 3 = 1,5 W ; Pf = 1 000 × 0,01 = 10 W ; r = 1,5 / 10 = 0,15 = 15 %.");
m(6,"Exercice","Un panneau de rendement 20 % et de surface 1,5 m² est éclairé à 1 000 W·m⁻². Quelle puissance électrique délivre-t-il ?","300 W",["7 500 W","1 500 W","200 W"],"Pf = 1 000 × 1,5 = 1 500 W ; Pu = r × Pf = 0,20 × 1 500 = 300 W.");
m(6,"Exercice","Un panneau de 1,6 m² éclairé à 1 000 W·m⁻² a un rendement de 15 %. Quelle puissance est perdue (thermique) ?","1 360 W",["240 W","1 600 W","85 W"],"Pf = 1 600 W ; Pu = 0,15 × 1 600 = 240 W ; Pdissipée = 1 600 − 240 = 1 360 W.");
m(6,"Exercice","On veut un panneau de 300 W avec un rendement de 20 % sous 1 000 W·m⁻². Quelle surface faut-il ?","1,5 m²",["0,3 m²","6 m²","15 m²"],"Pf = Pu / r = 300 / 0,20 = 1 500 W ; S = Pf / E = 1 500 / 1 000 = 1,5 m².");
m(6,"Rappel","Un panneau délivre 300 W pendant 5 h. Quelle énergie électrique produit-il ? (rappel : E = P × Δt)","1,5 kWh",["60 Wh","1 500 kWh","0,6 kWh"],"E = P × Δt = 300 W × 5 h = 1 500 Wh = 1,5 kWh (= 1 500 × 3 600 J = 5,4 MJ).");
m(6,"Comparer","Un alternateur (r = 95 %) et un panneau PV (r = 20 %) reçoivent chacun 1 000 W. Lequel fournit le plus de puissance utile, et combien ?","L'alternateur : 950 W contre 200 W",["Le panneau : 200 W contre 95 W","Les deux : 1 000 W","Le panneau : 800 W contre 50 W"],"Pu = r × Pf : 0,95 × 1 000 = 950 W ; 0,20 × 1 000 = 200 W.");
vf(6,"Pmax = Umax × Imax.",true,"Vrai.");
vf(6,"Rmax = Umax × Imax.",false,"Faux : Rmax = Umax / Imax (loi d'Ohm). C'est Pmax qui vaut Umax × Imax.");
vf(6,"Dans Pf = E × S, on peut laisser la surface en cm².",false,"Faux : S doit être en m² (E est en W·m⁻²). 1 cm² = 10⁻⁴ m².");
vf(6,"Le rendement d'un capteur PV est r = Pmax / (E × S).",true,"Vrai : r = Pu / Pf avec Pu = Pmax et Pf = E × S.");
vf(6,"Un panneau de 1,6 m² sous 1 000 W·m⁻² reçoit une puissance de 1 600 W.",true,"Vrai : Pf = E × S = 1 000 × 1,6 = 1 600 W.");
vf(6,"La caractéristique d'un dipôle est la relation entre sa tension U et l'intensité I qui le traverse.",true,"Vrai : courbe U = f(I) ou I = g(U).");
ty(6,"Unité de l'éclairement ?",["W/m²","W·m⁻²","W/m2","watt par mètre carré","W m-2","Wm-2","watts par mètre carré"],"L'éclairement E s'exprime en W·m⁻².");
ty(6,"Unité d'une résistance ?",["ohm","Ω","ohms"],"La résistance s'exprime en ohm (Ω).");
ty(6,"Umax = 30 V, Imax = 8 A. Pmax en W ?",["240","240 W"],"Pmax = 30 × 8 = 240 W.");
ty(6,"Umax = 0,5 V, Imax = 3 A. Pmax en W ?",["1,5","1,5 W","1.5"],"Pmax = 0,5 × 3 = 1,5 W.");
ty(6,"Umax = 36 V, Imax = 9 A. Rmax en Ω ?",["4","4 Ω","4 ohms"],"Rmax = 36 / 9 = 4 Ω.");
ty(6,"Umax = 30 V, Imax = 8 A. Rmax en Ω ?",["3,75","3,75 Ω","3.75"],"Rmax = 30 / 8 = 3,75 Ω.");
ty(6,"E = 1 000 W·m⁻², S = 1,6 m². Pf en W ?",["1600","1 600","1600 W","1 600 W"],"Pf = E × S = 1 000 × 1,6 = 1 600 W.");
ty(6,"E = 1 000 W·m⁻², S = 100 cm². Pf en W ?",["10","10 W"],"100 cm² = 0,01 m² ; Pf = 1 000 × 0,01 = 10 W.");
ty(6,"Combien font 100 cm² en m² ?",["0,01","0,01 m²","0.01"],"100 / 10 000 = 0,01 m².");
ty(6,"S = 1,6 m², E = 1 000 W·m⁻², Pmax = 240 W. Rendement en % ?",["15","15 %","0,15"],"Pf = 1 600 W ; r = 240 / 1 600 = 0,15 = 15 %.");
ty(6,"S = 2 m², E = 800 W·m⁻², Pmax = 400 W. Rendement en % ?",["25","25 %","0,25"],"Pf = 800 × 2 = 1 600 W ; r = 400 / 1 600 = 25 %.");
ty(6,"r = 20 %, S = 1,5 m², E = 1 000 W·m⁻². Puissance électrique en W ?",["300","300 W"],"Pf = 1 500 W ; Pu = 0,20 × 1 500 = 300 W.");

// key words of the course, turned into extra definition / true-false / typed questions by the engine
const FACTS=[
[2,"mots","c","Alternateur","Convertit l'énergie mécanique en énergie électrique grâce à l'induction ; constitué d'un stator et d'un rotor"],
[4,"mots","c","Capteur photovoltaïque","Convertit l'énergie radiative lumineuse en énergie électrique ; constitué de semi-conducteurs","panneau photovoltaïque;panneau solaire"],
[4,"mots","c","Effet photoélectrique","Un rayonnement électromagnétique assez énergétique met en mouvement des électrons à la surface d'un matériau","photoélectrique"],
[1,"mots","c","Induction électromagnétique","Apparition d'un courant électrique dans un conducteur en mouvement par rapport à un champ magnétique","induction"],
[3,"mots","c","Rendement","Rapport entre l'énergie (ou la puissance) sortante utile et l'énergie (ou la puissance) entrante"],
[2,"mots","c","Rotor","Partie mobile d'un alternateur (aimant multipôles qui tourne)"],
[4,"mots","c","Semi-conducteur","Matériau isolant qui conduit le courant sous l'effet d'une excitation extérieure suffisamment importante","semi conducteur;semiconducteur"],
[2,"mots","c","Stator","Partie statique d'un alternateur (enroulements fixes)"],
[5,"mots","c","Bande de valence","Dernière bande d'énergie complètement remplie d'électrons","valence"],
[5,"mots","c","Bande de conduction","Bande d'énergie non remplie, située au-dessus de la bande de valence","conduction"],
[5,"mots","c","Bande interdite","Zone entre bande de valence et bande de conduction qui fixe les propriétés électriques ; aussi appelée gap","gap"],
[5,"mots","c","Dopage","Introduction d'atomes d'un autre élément chimique dans un semi-conducteur pour augmenter le nombre d'électrons libres","doper"],
[5,"mots","c","Électrons de valence","Électrons des couches externes qui permettent aux atomes de se lier entre eux"],
[5,"mots","c","Électrons libres","Électrons de conduction, responsables de la circulation du courant électrique","électrons de conduction"],
[6,"mots","c","Caractéristique d'un dipôle","Courbe U = f(I) ou I = g(U) reliant la tension aux bornes et l'intensité qui le traverse","caractéristique"],
[6,"mots","c","Éclairement","Puissance lumineuse reçue par mètre carré, en W·m⁻²"],
[1,"mots","p","Michael Faraday","Découvre l'induction électromagnétique en 1831","Faraday"],
[1,"mots","p","James Maxwell","Théorise l'induction électromagnétique en 1865","Maxwell;James Clerk Maxwell"]
];

return {id:"energie",title:"Énergie électrique · Chapitre 1",kw:"physique électricité sciences physiques STI énergie renouvelable solaire",subject:"Deux siècles d'énergie électrique : alternateur, photovoltaïque, calculs",lang:"fr",sess:SESS,tags:TAGS,unit:["part","parts","a part"],balance:true,Q,TQ,facts:FACTS};
})();
