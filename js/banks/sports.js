// Built-in bank: Sports legends (English). Football, World Cup & Olympics, basketball, tennis, F1 and records.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_SPORTS=(function(){
const SESS={1:"Football stars",2:"World Cup & Olympics",3:"Basketball, tennis & F1",4:"Records & rivalries"};
const TAGS={1:"Football",2:"Big events",3:"Other sports",4:"Records"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Football stars =====================
m(1,"Messi","Which country did Lionel Messi lead to the 2022 World Cup title?","Argentina",["Brazil","Spain","Uruguay"],"Argentina beat France on penalties in the final in Qatar after a 3-3 draw.",1);
m(1,"Messi","Which club did Messi leave in 2021 after 21 years?","FC Barcelona",["Real Madrid","Manchester City","Juventus"],"He then moved to Paris Saint-Germain, and in 2023 to Inter Miami.",1);
m(1,"Messi","How many times has Lionel Messi won the Ballon d’Or?","8",["5","6","7"],"His eighth Ballon d’Or came in 2023.",2);
m(1,"Ronaldo","Which country is Cristiano Ronaldo from?","Portugal",["Brazil","Spain","Italy"],"He was born in Funchal, on the island of Madeira.",1);
m(1,"Ronaldo","Which Spanish club did Cristiano Ronaldo play for between 2009 and 2018?","Real Madrid",["FC Barcelona","Atlético Madrid","Valencia"],"He won four Champions League titles with Real Madrid in that period.",1);
m(1,"Mbappé","Which French star scored a hat-trick in the 2022 World Cup final?","Kylian Mbappé",["Antoine Griezmann","Karim Benzema","Olivier Giroud"],"France still lost on penalties to Argentina.",2);
m(1,"Mbappé","Which club did Kylian Mbappé join in 2024?","Real Madrid",["Liverpool","Manchester City","Bayern Munich"],"He left Paris Saint-Germain for Real Madrid in summer 2024.",2);
m(1,"Yamal","Which Barcelona teenager helped Spain win Euro 2024?","Lamine Yamal",["Pedri","Gavi","Ansu Fati"],"Yamal became a European champion aged 17, the day after his 17th birthday.",2);
m(1,"Haaland","Which country is Erling Haaland from?","Norway",["Sweden","Denmark","Finland"],"The striker plays for Manchester City.",2);
m(1,"Legend","Who is the Brazilian legend who won three World Cups?","Pelé",["Ronaldinho","Zico","Neymar"],"Pelé won the World Cup in 1958, 1962 and 1970.",1);
m(1,"Legend","Which Argentine scored the “Hand of God” goal in 1986?","Diego Maradona",["Lionel Messi","Gabriel Batistuta","Mario Kempes"],"Maradona scored it against England in the quarter-final of the 1986 World Cup.",2);
vf(1,"Cristiano Ronaldo has played for Manchester United.",true,"He played there from 2003 to 2009 and again in 2021-2022.",1);
vf(1,"Lionel Messi was born in Brazil.",false,"Messi was born in Rosario, Argentina.",1);

// ===================== 2. World Cup & Olympics =====================
m(2,"World Cup","Which country has won the most men’s FIFA World Cups?","Brazil",["Germany","Italy","Argentina"],"Brazil has won five titles (1958, 1962, 1970, 1994, 2002).",1);
m(2,"World Cup","Which country won the 2010 World Cup in South Africa?","Spain",["Netherlands","Germany","Argentina"],"Andrés Iniesta scored the winning goal in extra time against the Netherlands.",1);
m(2,"World Cup","Which country won the 2018 World Cup in Russia?","France",["Croatia","Belgium","Brazil"],"France beat Croatia 4-2 in the final.",1);
m(2,"World Cup","Which player headbutted Marco Materazzi in the 2006 World Cup final?","Zinedine Zidane",["Thierry Henry","Franck Ribéry","Patrick Vieira"],"Italy won on penalties.",2);
m(2,"World Cup","In which country was the 2022 World Cup held?","Qatar",["Saudi Arabia","UAE","Russia"],"It was the first World Cup held in the Middle East, and in winter.",1);
m(2,"Olympics","Which city hosted the 2024 Summer Olympics?","Paris",["Tokyo","Los Angeles","Rome"],"Paris also hosted in 1900 and 1924.",1);
m(2,"Olympics","Which Spanish city hosted the 1992 Summer Olympics?","Barcelona",["Madrid","Seville","Valencia"],"The 1992 Games transformed the city’s waterfront and Montjuïc.",2);
m(2,"Olympics","Which swimmer holds the record for the most Olympic gold medals (23)?","Michael Phelps",["Mark Spitz","Ian Thorpe","Caeleb Dressel"],"Michael Phelps won 28 medals in total.",2);
m(2,"Olympics","How many rings are on the Olympic flag?","5",["4","6","7"],"The five rings stand for the five continents (Africa, America, Asia, Europe, Oceania).",1);
m(2,"Olympics","Which Jamaican sprinter set the 100 m world record of 9.58 s in 2009?","Usain Bolt",["Yohan Blake","Asafa Powell","Justin Gatlin"],"Bolt won eight Olympic gold medals.",1);
m(2,"Olympics","Which country hosts the 2028 Summer Olympics?","United States (Los Angeles)",["Australia","China","France"],"Los Angeles will host for the third time.",3);
vf(2,"The ancient Olympic Games started in Greece.",true,"They were held at Olympia from 776 BC.",1);
vf(2,"The 2020 Tokyo Olympics took place in 2021.",true,"They were postponed by one year because of COVID-19.",2);

// ===================== 3. Basketball, tennis & F1 =====================
m(3,"NBA","Which basketball legend won six NBA titles with the Chicago Bulls?","Michael Jordan",["Kobe Bryant","Magic Johnson","Shaquille O’Neal"],"Jordan won two sets of three-peats, in the 1990s.",1);
m(3,"NBA","Which star became the NBA’s all-time leading scorer in 2023?","LeBron James",["Kobe Bryant","Stephen Curry","Kevin Durant"],"LeBron passed Kareem Abdul-Jabbar’s record.",2);
m(3,"NBA","Which Slovenian star was traded to the Los Angeles Lakers in 2025?","Luka Dončić",["Nikola Jokić","Giannis Antetokounmpo","Victor Wembanyama"],"The trade from the Dallas Mavericks shocked the NBA.",2);
m(3,"NBA","Which sport was invented by James Naismith in 1891?","Basketball",["Volleyball","Handball","Baseball"],"Naismith first used peach baskets.",2);
m(3,"Tennis","Which Spanish player has won the French Open 14 times?","Rafael Nadal",["Carlos Alcaraz","David Ferrer","Roger Federer"],"Nadal is the “King of Clay”.",1);
m(3,"Tennis","Which young Spaniard won the US Open in 2022 at age 19?","Carlos Alcaraz",["Jannik Sinner","Alexander Zverev","Daniil Medvedev"],"Alcaraz became the youngest world number one.",2);
m(3,"Tennis","How many Grand Slam titles did Serena Williams win?","23",["15","19","30"],"Serena Williams won 23 in the Open era.",3);
m(3,"Tennis","On what surface is Wimbledon played?","Grass",["Clay","Hard court","Carpet"],"Wimbledon is played in London on grass.",1);
m(3,"F1","Which Dutch driver won four F1 world titles in a row from 2021 to 2024?","Max Verstappen",["Lewis Hamilton","Charles Leclerc","Sebastian Vettel"],"Verstappen drives for Red Bull.",2);
m(3,"F1","Which British driver has won seven F1 world titles?","Lewis Hamilton",["Jenson Button","Damon Hill","Lando Norris"],"Hamilton ties Michael Schumacher’s record.",2);
m(3,"F1","Which Italian team uses the red colour in F1?","Ferrari",["Alfa Romeo","Maserati","Lamborghini"],"Ferrari is the oldest and most successful F1 team.",1);
vf(3,"Fernando Alonso is a Spanish F1 driver.",true,"He won the world title in 2005 and 2006.",1);
vf(3,"Monaco has an F1 Grand Prix.",true,"The Monaco Grand Prix is held in the streets of Monte Carlo.",1);

// ===================== 4. Records & rivalries =====================
m(4,"Rivalry","Which two clubs play “El Clásico”?","Real Madrid and FC Barcelona",["Real Madrid and Atlético","Barcelona and Valencia","Sevilla and Betis"],"El Clásico is the most-watched league game in the world.",1);
m(4,"Rivalry","Which Spanish club plays at the Santiago Bernabéu stadium?","Real Madrid",["Atlético Madrid","Sevilla","Valencia"],"The Bernabéu was rebuilt and modernised in the 2020s.",1);
m(4,"Records","Which club has won the most Champions League titles?","Real Madrid",["AC Milan","Bayern Munich","Liverpool"],"Real Madrid has won the European Cup/Champions League a record 15 times.",2);
m(4,"Records","Which English football club has the stadium Old Trafford?","Manchester United",["Manchester City","Liverpool","Chelsea"],"Old Trafford is nicknamed “The Theatre of Dreams”.",1);
m(4,"Records","Which football song is the anthem of Liverpool?","You’ll Never Walk Alone",["We Are the Champions","Seven Nation Army","Sweet Caroline"],"Fans sing it before every game at Anfield.",2);
m(4,"Records","In which sport can you win a “yellow jersey”?","Cycling (Tour de France)",["Golf","Athletics","Tennis"],"The Tour de France leader wears the yellow jersey.",2);
m(4,"Records","In golf, which colour jacket does the winner of the Masters receive?","Green",["Red","Blue","Yellow"],"The tournament is held at Augusta National in Georgia.",2);
m(4,"Records","Which NFL star won seven Super Bowls?","Tom Brady",["Patrick Mahomes","Peyton Manning","Joe Montana"],"Brady won six with the Patriots and one with Tampa Bay.",2);
m(4,"Records","Which sport is played at the Super Bowl?","American football",["Rugby","Baseball","Basketball"],"The Super Bowl is the NFL’s championship game.",1);
m(4,"Records","Which boxer called himself “The Greatest” and “Float like a butterfly, sting like a bee”?","Muhammad Ali",["Mike Tyson","Floyd Mayweather","Joe Frazier"],"Muhammad Ali won the heavyweight title three times.",2);
m(4,"Records","Which team do you associate with the haka?","New Zealand’s All Blacks",["Australia’s Wallabies","England’s rugby team","South Africa’s Springboks"],"The haka is a Maori war dance performed before matches.",2);
vf(4,"Real Madrid has won more Champions League titles than FC Barcelona.",true,"Real Madrid has 15, Barcelona has 5.",2);
vf(4,"A football team has 12 players on the pitch.",false,"A football team has 11 players on the pitch.",1);

// ===================== Typed answers =====================
ty(1,"Which country has won the most men’s World Cups? (one word)",["Brazil"],"Brazil has won five World Cups.",1);
ty(1,"Which player has won eight Ballon d’Or awards? (surname)",["Messi","Lionel Messi"],"Messi won his eighth in 2023.",2);
ty(2,"In which city were the 2024 Olympics held? (one word)",["Paris"],"Paris 2024.",1);
ty(2,"Which sprinter is nicknamed “Lightning” and holds the 100 m record? (surname)",["Bolt","Usain Bolt"],"Bolt ran 9.58 s in 2009.",1);
ty(3,"Which sport is played at Wimbledon? (one word)",["Tennis"],"Wimbledon is the oldest tennis tournament.",1);
ty(3,"Which Spanish tennis player is nicknamed the King of Clay? (surname)",["Nadal","Rafael Nadal"],"Nadal has won the French Open 14 times.",1);
ty(4,"How many players does a football team have on the pitch? (a number)",["11","eleven"],"Eleven, including the goalkeeper.",1);

// ===================== More questions (batch 2) =====================
m(1,"Stars","Which midfielder won the Ballon d’Or in 2024?","Rodri",["Vinícius Júnior","Jude Bellingham","Lamine Yamal"],"Rodri won the award after a season with Manchester City and Spain’s Euro 2024 triumph.",2);
m(1,"Stars","Which club did Neymar leave in 2017 to join Paris Saint-Germain for a world-record €222 million?","FC Barcelona",["Santos","Real Madrid","Manchester City"],"The release clause remains the highest transfer fee ever paid.",2);
m(1,"Stars","Which Polish striker joined FC Barcelona in 2022 from Bayern Munich?","Robert Lewandowski",["Erling Haaland","Harry Kane","Karim Benzema"],"He scored over 100 goals for Barcelona in his first three seasons.",2);
m(1,"Stars","Which Egyptian forward is nicknamed the “Egyptian King” at Liverpool?","Mohamed Salah",["Sadio Mané","Riyad Mahrez","Achraf Hakimi"],"Salah has won the Premier League Golden Boot several times.",1);
m(1,"Stars","Which Belgian midfielder is Manchester City’s star playmaker?","Kevin De Bruyne",["Eden Hazard","Romelu Lukaku","Thibaut Courtois"],"He is famous for his passing, vision and long-range shots.",2);
m(1,"Stars","Who scored Spain’s winning goal in the 2010 World Cup final?","Andrés Iniesta",["Xavi","David Villa","Fernando Torres"],"Iniesta scored in extra time against the Netherlands.",2);
m(1,"Stars","Which French striker won the Ballon d’Or in 2022?","Karim Benzema",["Kylian Mbappé","Robert Lewandowski","Luka Modrić"],"He scored 44 goals for Real Madrid that season, which included the Champions League title.",2);
m(1,"Stars","Which German striker holds the record for most goals at World Cups, with 16?","Miroslav Klose",["Thomas Müller","Gerd Müller","Lukas Podolski"],"Klose broke Ronaldo’s record at the 2014 tournament in Brazil.",3);
vf(1,"Cristiano Ronaldo began his professional career at Sporting CP in Portugal.",true,"He joined Manchester United in 2003 at age 18.",2);
vf(1,"Erling Haaland’s father also played in the English Premier League.",true,"Alf-Inge Haaland played for Leeds, Nottingham Forest and Manchester City.",3);

m(2,"World Cup","Which country hosted the 2014 FIFA World Cup?","Brazil",["Argentina","Germany","South Africa"],"Brazil lost 7–1 to Germany in the semi-final.",1);
m(2,"World Cup","Which country won the 2014 FIFA World Cup?","Germany",["Argentina","Netherlands","Brazil"],"Mario Götze scored the winner in extra time against Argentina.",1);
m(2,"World Cup","The 2030 World Cup will be hosted by Spain, Portugal and which African country?","Morocco",["Egypt","South Africa","Nigeria"],"Three South American countries will also host opening games to celebrate the tournament’s centenary.",2);
m(2,"World Cup","The 2022 World Cup in Qatar was the first to be held…","In November and December",["On two continents","In the Southern Hemisphere","With 48 teams"],"The heat in Qatar forced the tournament to move from summer to winter.",2);
m(2,"Olympics","Which city hosted the 2012 Summer Olympics?","London",["Beijing","Rio de Janeiro","Athens"],"London became the first city to host the Games three times.",1);
m(2,"Olympics","Which city hosted the 2016 Summer Olympics?","Rio de Janeiro",["Tokyo","Sydney","Buenos Aires"],"It was the first Games held in South America.",1);
m(2,"Olympics","Which city hosted the 2008 Summer Olympics?","Beijing",["Seoul","Tokyo","Shanghai"],"The “Bird’s Nest” stadium was the symbol of the Games.",1);
m(2,"Olympics","In which city were the first modern Olympic Games held in 1896?","Athens",["Paris","London","Stockholm"],"The Games were revived by Pierre de Coubertin.",2);
m(2,"Olympics","Which country has won the most Summer Olympic gold medals in history?","United States",["China","Soviet Union","Great Britain"],"The US has won over a thousand gold medals at the Summer Games.",2);
m(2,"Olympics","The Olympic motto “Citius, Altius, Fortius” means…","Faster, higher, stronger",["Together, strong, free","Always, forever, one","Win, honour, glory"],"“Together” was added to the motto in 2021.",2);
m(2,"Olympics","The 2026 Winter Olympics will be held in which country?","Italy",["Switzerland","Austria","Norway"],"The Games will be held in Milan and Cortina d’Ampezzo.",2);
m(2,"Olympics","Which Swedish pole vaulter has repeatedly broken the world record, passing 6.20 metres?","Armand “Mondo” Duplantis",["Sergey Bubka","Renaud Lavillenie","Thiago Braz"],"Mondo Duplantis won gold in Tokyo 2020 and Paris 2024.",3);
m(2,"Olympics","The “Fosbury Flop” is a revolutionary technique in which sport?","High jump",["Pole vault","Long jump","Hurdles"],"Dick Fosbury won gold in Mexico City in 1968 jumping backwards over the bar.",3);
vf(2,"Football is a sport at the Winter Olympics.",false,"Football is played at the Summer Games.",1);
vf(2,"The Olympic flame is lit in Olympia, Greece, before travelling to the host city.",true,"The flame is lit using the sun’s rays and a mirror.",2);

m(3,"Tennis","Which men’s tennis player holds the record for most Grand Slam singles titles, with 24?","Novak Djokovic",["Rafael Nadal","Roger Federer","Pete Sampras"],"Djokovic overtook Nadal’s 22 titles in 2023.",2);
m(3,"Tennis","Which Grand Slam tournament is played on clay in Paris?","The French Open",["Wimbledon","The US Open","The Australian Open"],"It is also called Roland Garros.",1);
m(3,"Tennis","Which Italian player won the 2024 Australian Open?","Jannik Sinner",["Matteo Berrettini","Lorenzo Musetti","Fabio Fognini"],"Sinner beat Daniil Medvedev from two sets down.",2);
m(3,"Basketball","Which NBA team does Stephen Curry play for?","Golden State Warriors",["Los Angeles Lakers","Chicago Bulls","Boston Celtics"],"Curry changed basketball with his three-point shooting.",1);
m(3,"Basketball","Which NBA star is nicknamed “King James”?","LeBron James",["Kevin Durant","Kobe Bryant","Giannis Antetokounmpo"],"LeBron became the NBA’s all-time leading scorer in 2023.",1);
m(3,"Basketball","Which Spanish basketball star won two NBA titles with the Los Angeles Lakers?","Pau Gasol",["Ricky Rubio","Marc Gasol","Juan Carlos Navarro"],"Pau Gasol won in 2009 and 2010 alongside Kobe Bryant.",2);
m(3,"Basketball","Nikola Jokić, a three-time NBA MVP, comes from which country?","Serbia",["Slovenia","Croatia","Greece"],"Jokić plays for the Denver Nuggets and won the title in 2023.",2);
m(3,"Basketball","Which NBA player is nicknamed the “Greek Freak”?","Giannis Antetokounmpo",["Luka Dončić","Nikola Jokić","Joel Embiid"],"He led the Milwaukee Bucks to the title in 2021.",2);
m(3,"Basketball","How many players from each team are on court in basketball?","5",["6","7","11"],"Teams can substitute players during the game.",1);
m(3,"F1","At which circuit near Barcelona is the Spanish Grand Prix usually held?","Circuit de Barcelona-Catalunya",["Circuito de Jerez","Valencia Street Circuit","Circuit Ricardo Tormo"],"The track in Montmeló is also used for pre-season testing.",2);
m(3,"F1","Which F1 team does Max Verstappen drive for?","Red Bull Racing",["Ferrari","Mercedes","McLaren"],"He won four world titles in a row from 2021 to 2024.",1);
vf(3,"Michael Jordan played for the Chicago Bulls throughout his entire career.",false,"He also played two seasons for the Washington Wizards after coming out of retirement.",2);

m(4,"Rivalries","The Manchester derby is played between Manchester United and which other club?","Manchester City",["Liverpool","Everton","Leeds United"],"The two clubs share the city but have different histories and supporters.",1);
m(4,"Rivalries","Which two clubs contest the “Derby della Madonnina” in Milan?","AC Milan and Inter",["Juventus and Torino","Roma and Lazio","Napoli and Fiorentina"],"Both clubs share the San Siro stadium.",2);
m(4,"Rivalries","Which two Glasgow clubs contest the “Old Firm” derby?","Celtic and Rangers",["Hearts and Hibs","Aberdeen and Dundee","Partick and Queen’s Park"],"It is one of the fiercest rivalries in world football.",2);
m(4,"Rivalries","Which two Buenos Aires clubs play the “Superclásico”?","Boca Juniors and River Plate",["Racing and Independiente","San Lorenzo and Vélez","Estudiantes and Gimnasia"],"The match has been called one of the most intense in the world.",2);
m(4,"Rivalries","Which club is FC Barcelona’s local rival in the same city?","RCD Espanyol",["Girona","Sabadell","Valencia"],"The Barcelona derby is also called the “Derbi barceloní”.",2);
m(4,"Records","How long is a marathon?","42.195 kilometres",["40 kilometres","45 kilometres","50 kilometres"],"The distance comes from the 1908 London Olympics.",2);
m(4,"Records","Which Kenyan runner became the first person to run a marathon in under two hours, in an unofficial event in 2019?","Eliud Kipchoge",["Kenenisa Bekele","Haile Gebrselassie","Mo Farah"],"He ran 1:59:40 in Vienna with pacemakers.",2);
m(4,"Records","How many major championships did Tiger Woods win in his golf career?","15",["12","18","20"],"Only Jack Nicklaus has won more, with 18.",3);
m(4,"Records","With which NFL team did Tom Brady win his first six Super Bowls?","New England Patriots",["Tampa Bay Buccaneers","Green Bay Packers","New York Giants"],"He won his seventh with the Buccaneers in 2021.",2);
m(4,"Records","In which sport do teams compete for “The Ashes”?","Cricket",["Rugby","Golf","Baseball"],"England and Australia have contested The Ashes since 1882.",2);
m(4,"Records","In which sport is the Stanley Cup awarded?","Ice hockey",["Basketball","Baseball","American football"],"It is the oldest trophy in North American professional sport.",2);
m(4,"Records","How many players are on the pitch for each team in a rugby union match?","15",["11","13","9"],"Rugby league has 13 players per team.",2);
vf(4,"Real Madrid has won more La Liga titles than FC Barcelona.",true,"Real Madrid has well over 35 league titles compared to Barcelona’s 28 or so.",2);

return {id:"sports",title:"Sports Legends & Big Moments",kw:"sports football soccer messi ronaldo world cup olympics nba tennis f1 basketball champions league quiz legends",subject:"Football stars, World Cup, Olympics, NBA, tennis and F1: how big a fan are you?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
