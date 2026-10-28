// Study sheet: Énergie électrique · Chapitre 1 (physique-chimie / enseignement scientifique). Hand-written from the course content.
window.SHEETS=window.SHEETS||{};
window.SHEETS.energie={lang:"fr",file:"fiche-energie-electrique",tag:"Fiche de révision · Physique-chimie",
title:"Deux siècles<br>d’énergie électrique",
sub:"Induction, alternateur, semi-conducteurs, photovoltaïque : le cours du chapitre 1, avec toutes les formules et les calculs types.",
source:"Chapitre 1 · Enseignement scientifique / physique-chimie",
intro:"Presque toute l’électricité produite dans le monde vient d’un seul phénomène, <b>l’induction</b> ; la seule grande exception est le <b>photovoltaïque</b>, qui repose sur l’<b>effet photoélectrique</b>. Ce chapitre explique ces deux mécanismes et apprend à calculer leur rendement.",
sections:[
{title:"L’induction électromagnétique",lead:"Un aimant qui bouge près d’une bobine suffit à faire circuler un courant.",blocks:[
 {t:"dl",items:[
  ["Courant électrique","Mouvement d’<b>électrons libres</b> dans un matériau, souvent un conducteur (un métal)."],
  ["Induction électromagnétique","Apparition d’un courant électrique dans un conducteur <b>en mouvement par rapport à un champ magnétique</b>. Le conducteur est en pratique un enroulement de fil de cuivre : la <b>bobine</b>."],
  ["Michael Faraday","Découvre l’induction en <b>1831</b>."],
  ["James Maxwell","La théorise en <b>1865</b>."]]},
 {t:"p",x:"Sans mouvement de l’aimant par rapport à la bobine, il n’y a aucun courant. Le <b>sens</b> du courant (et de la tension) dépend du pôle présenté à la bobine <b>et</b> du sens du déplacement, approche ou éloignement."},
 {t:"p",x:"Quand on approche puis éloigne l’aimant, le courant change de sens à chaque fois : il est <b>alternatif</b>."},
 {t:"key",items:["Toutes les centrales électriques utilisent l’induction (un alternateur), <b>sauf les centrales photovoltaïques</b>.","Pas de mouvement, pas d’induction."]}]},
{title:"L’alternateur",lead:"Le convertisseur qui transforme le mouvement en électricité.",blocks:[
 {t:"p",x:"Un <b>alternateur</b> convertit de l’<b>énergie mécanique</b> en <b>énergie électrique</b> grâce à l’induction, et délivre une <b>tension alternative</b>. Il est formé de deux parties :"},
 {t:"table",head:["Pièce","Nature","Rôle"],rows:[
  ["Rotor","Partie <b>mobile</b>","Aimant multipôles qui tourne"],
  ["Stator","Partie <b>fixe</b>","Enroulements (bobines) dans lesquels le courant est induit"]]},
 {t:"p",x:"Le rotor est mis en rotation par une <b>turbine</b>, elle-même entraînée par un fluide qui apporte son énergie cinétique : l’<b>eau</b> (chute d’eau, marées), la <b>vapeur d’eau</b> (centrales thermiques, nucléaires) ou le <b>vent</b> (éoliennes)."},
 {t:"h3",x:"Chaîne énergétique"},
 {t:"p",x:"énergie mécanique reçue → <b>alternateur</b> → énergie électrique utile <b>+</b> énergie thermique dissipée. Les pertes sont thermiques, donc le rendement est toujours <b>inférieur à 1</b>, mais proche : de <b>90 % à 95 %</b> pour un alternateur."},
 {t:"key",items:["Alternateur : mécanique → électrique, courant <b>alternatif</b>, rendement 90 à 95 %.","Rotor = mobile (aimant) ; stator = fixe (bobines).","Un fluide fait tourner la turbine : eau, vapeur, vent."]}]},
{title:"Rendement et fréquence",lead:"Les deux formules à maîtriser pour les exercices sur l’alternateur.",blocks:[
 {t:"formula",name:"Rendement",x:"r = P<sub>u</sub> / P<sub>f</sub> = E<sub>u</sub> / E<sub>reçue</sub>",note:"P en watt (W) · E en joule (J) · r sans unité, ou en % (×100)"},
 {t:"dl",items:[
  ["P<sub>u</sub>","puissance électrique <b>utile</b> (W)"],
  ["P<sub>f</sub>","puissance mécanique <b>fournie</b> à l’alternateur, aussi dite reçue ou absorbée (W)"]]},
 {t:"formula",name:"Conservation de l’énergie",x:"E<sub>reçue</sub> = E<sub>u</sub> + E<sub>dissipée</sub>",note:"donc E<sub>dissipée</sub> = E<sub>reçue</sub> − E<sub>u</sub> (la même relation vaut pour les puissances)"},
 {t:"formula",name:"Fréquence du courant",x:"f = N × ω",note:"f en hertz (Hz) · N = nombre d’aimants du rotor · ω en <b>tours par seconde</b>"},
 {t:"ul",items:["Pour passer de tr/min à tr/s : <b>diviser par 60</b>.","f est proportionnelle à ω : si la vitesse double, la fréquence double.","Un rendement supérieur à 1 est impossible : on a inversé P<sub>u</sub> et P<sub>f</sub>."]},
 {t:"ex",x:["<b>Rendement.</b> Un alternateur reçoit 1 000 MW et fournit 900 MW : r = 900 / 1 000 = 0,90, soit <b>90 %</b>.","<b>Puissance reçue.</b> Il fournit 47,5 kW avec r = 95 % : P<sub>f</sub> = P<sub>u</sub> / r = 47,5 / 0,95 = <b>50 kW</b>.","<b>Pertes.</b> r = 94 % pour 500 MW reçus : P<sub>u</sub> = 470 MW, donc 500 − 470 = <b>30 MW</b> perdus en chaleur.","<b>Fréquence.</b> 2 aimants à 1 500 tr/min : ω = 1 500 / 60 = 25 tr/s, donc f = 2 × 25 = <b>50 Hz</b> (la fréquence du réseau français)."]},
 {t:"key",items:["Pour trouver P<sub>u</sub> : <b>P<sub>u</sub> = r × P<sub>f</sub></b> ; pour trouver P<sub>f</sub> : <b>P<sub>f</sub> = P<sub>u</sub> / r</b>.","Toujours convertir les unités avant de calculer (kW → W, tr/min → tr/s)."]}]},
{title:"Semi-conducteurs et bandes d’énergie",lead:"Pourquoi un matériau conduit, isole… ou fait les deux.",blocks:[
 {t:"dl",items:[
  ["Électrons de valence","Électrons des couches externes : ils lient les atomes entre eux."],
  ["Électrons libres","Électrons de conduction : ce sont eux qui font circuler le courant."],
  ["Bande de valence","Dernière bande d’énergie <b>complètement remplie</b> d’électrons."],
  ["Bande de conduction","Bande <b>non remplie</b>, juste au-dessus de la bande de valence."],
  ["Bande interdite (gap)","Zone entre les deux bandes. C’est elle qui <b>fixe les propriétés électriques</b> du matériau."]]},
 {t:"table",head:["Matériau","Bandes","Gap E<sub>g</sub>","Exemples"],rows:[
  ["Conducteur","Bandes qui se chevauchent, pas de gap","—","or, argent, cuivre"],
  ["Semi-conducteur","Gap étroit","≈ 1 eV","silicium (Si), germanium (Ge)"],
  ["Isolant","Bandes très éloignées","≈ 6 eV","verre, plastiques"]]},
 {t:"p",x:"Un <b>semi-conducteur</b> est un isolant qui devient conducteur sous l’effet d’une excitation extérieure suffisante (chauffage, éclairement). Un photon doit avoir une énergie <b>supérieure ou égale à E<sub>g</sub></b> pour faire passer un électron de la bande de valence à la bande de conduction ; l’électron laisse alors un <b>trou positif</b>."},
 {t:"h3",x:"Dopage"},
 {t:"p",x:"À température ambiante, un semi-conducteur pur a peu d’électrons libres et conduit mal. Le <b>dopage</b> consiste à insérer des atomes d’un autre élément (phosphore dans du silicium, antimoine, fluor…) pour <b>augmenter le nombre d’électrons libres</b>."},
 {t:"h3",x:"Silicium ou germanium ?"},
 {t:"p",x:"Les deux absorbent les longueurs d’onde inférieures à environ <b>1 100 nm</b> (visible et proche infrarouge). On choisit le silicium : il est <b>environ 4 fois moins cher</b>, c’est le <b>2<sup>e</sup> élément le plus abondant</b> de la croûte terrestre et il supporte mieux la chaleur."}]},
{title:"Le capteur photovoltaïque",lead:"Convertir directement la lumière en électricité.",blocks:[
 {t:"dl",items:[
  ["Effet photoélectrique","Un rayonnement électromagnétique assez énergétique met en mouvement des électrons à la surface d’un matériau."],
  ["Capteur photovoltaïque","Assemblage de nombreuses <b>cellules</b> (jonctions de semi-conducteurs, le plus souvent en silicium) qui convertit l’énergie <b>radiative lumineuse</b> en énergie électrique. Il fournit un courant <b>continu</b>."]]},
 {t:"p",x:"Associer plusieurs types de semi-conducteurs élargit le spectre d’absorption, donc l’énergie captée, donc le rendement."},
 {t:"table",cap:"Alternateur ou capteur photovoltaïque ?",head:["","Alternateur","Capteur photovoltaïque"],rows:[
  ["Énergie d’entrée","mécanique","lumineuse (radiative)"],
  ["Phénomène","induction électromagnétique","effet photoélectrique"],
  ["Courant produit","alternatif","continu"],
  ["Rendement","90 à 95 %","20 à 25 %"]]}]},
{title:"Caractéristique et rendement d’un capteur",lead:"Lire une courbe I(U), trouver le point de puissance maximale, calculer le rendement.",blocks:[
 {t:"p",x:"La <b>caractéristique</b> d’un dipôle est la courbe U = f(I) (ou I = g(U)). Pour un capteur, I(U) présente un palier presque horizontal puis chute vite vers 0 ; la puissance P(U) monte jusqu’à un maximum puis retombe."},
 {t:"formula",name:"Puissance maximale",x:"P<sub>max</sub> = U<sub>max</sub> × I<sub>max</sub>",note:"lue sur la caractéristique · P en W, U en V, I en A"},
 {t:"formula",name:"Résistance de fonctionnement optimal",x:"R<sub>max</sub> = U<sub>max</sub> / I<sub>max</sub>",note:"loi d’Ohm au point de puissance maximale · R en ohm (Ω)"},
 {t:"formula",name:"Puissance lumineuse reçue",x:"P<sub>f</sub> = E × S",note:"E : éclairement en W·m⁻² · S : surface en <b>m²</b> (1 cm² = 10⁻⁴ m²)"},
 {t:"formula",name:"Rendement du capteur",x:"r = P<sub>max</sub> / P<sub>f</sub> = P<sub>max</sub> / (E × S)"},
 {t:"ex",x:["Capteur de 15 cm × 15 cm sous E = 1 000 W·m⁻² ; P<sub>max</sub> = 4,5 W.","S = 0,15 × 0,15 = 0,0225 m² ; P<sub>f</sub> = 1 000 × 0,0225 = 22,5 W.","r = 4,5 / 22,5 = 0,20 : <b>20 %</b>.","Et pour obtenir 300 W avec ce rendement ? P<sub>f</sub> = 300 / 0,20 = 1 500 W, donc S = 1 500 / 1 000 = <b>1,5 m²</b>."]},
 {t:"key",items:["Surface <b>toujours en m²</b> : 100 cm² = 0,01 m².","Énergie d’une installation : E = P × Δt (300 W pendant 5 h = 1 500 Wh = 1,5 kWh = 5,4 MJ).","Un rendement de capteur autour de 20 % est normal ; 90 % serait celui d’un alternateur."]}]}
]};
