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

return {id:"sports",title:"Sports Legends & Big Moments",kw:"sports football soccer messi ronaldo world cup olympics nba tennis f1 basketball champions league quiz legends",subject:"Football stars, World Cup, Olympics, NBA, tennis and F1: how big a fan are you?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
