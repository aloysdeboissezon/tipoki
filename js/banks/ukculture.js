// Built-in bank: British culture (English). Music, TV & film, history & royals, food & drink, sport & traditions, places & language.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_UKCULTURE=(function(){
const SESS={1:"Music",2:"TV & film",3:"History & royals",4:"Food & drink",5:"Sport & traditions",6:"Places & language"};
const TAGS={1:"Music",2:"TV & film",3:"History",4:"Food & drink",5:"Sport",6:"Places & words"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Music =====================
m(1,"Bands","Which band from Liverpool released the album Abbey Road in 1969?","The Beatles",["The Rolling Stones","The Kinks","The Who"],"The Beatles: John Lennon, Paul McCartney, George Harrison and Ringo Starr. Abbey Road is named after the London studio where they recorded.",1);
m(1,"Bands","Who was the drummer of The Beatles?","Ringo Starr",["Charlie Watts","Keith Moon","Phil Collins"],"Ringo Starr was the Beatles’ drummer. Charlie Watts played for the Rolling Stones and Keith Moon for The Who.",1);
m(1,"Bands","Who was the lead singer of Queen?","Freddie Mercury",["Brian May","David Bowie","Elton John"],"Freddie Mercury sang Bohemian Rhapsody (1975). Brian May was the guitarist.",1);
m(1,"Singers","Which singer released the album 21 (2011), featuring Rolling in the Deep?","Adele",["Amy Winehouse","Dua Lipa","Lily Allen"],"Adele, from London, won six Grammy Awards in 2012 for 21.",1);
m(1,"Bands","Which Manchester band was fronted by Liam Gallagher?","Oasis",["Blur","The Smiths","Pulp"],"Oasis, with brothers Liam and Noel Gallagher, defined 1990s Britpop with Wonderwall.",1);
m(1,"Festivals","Which Somerset festival is the UK’s most famous music festival?","Glastonbury",["Reading","Isle of Wight","Download"],"Glastonbury Festival takes place at Worthy Farm, Pilton, Somerset.",1);
m(1,"Icons","What was the name of David Bowie’s alter ego on his 1972 album?","Ziggy Stardust",["Aladdin Sane","The Thin White Duke","Major Tom"],"The Rise and Fall of Ziggy Stardust and the Spiders from Mars (1972). Aladdin Sane and The Thin White Duke were other personas.",2);
m(1,"Songs","Who released the global hit Shape of You in 2017?","Ed Sheeran",["Harry Styles","Sam Smith","Rag’n’Bone Man"],"Ed Sheeran, born in Halifax, West Yorkshire, released Shape of You in January 2017.",2);
m(1,"Bands","How many members did the Spice Girls have?","Five",["Four","Six","Three"],"Scary, Sporty, Baby, Ginger and Posh. Their first single Wannabe came out in 1996.",2);
m(1,"Bands","Which band recorded The Dark Side of the Moon (1973)?","Pink Floyd",["Led Zeppelin","Genesis","Deep Purple"],"Pink Floyd’s album stayed on the US Billboard chart for 900+ weeks.",2);
vf(1,"The Beatles were from Manchester.",false,"The Beatles were formed in Liverpool in 1960. Oasis and The Smiths came from Manchester.",1);
vf(1,"The Rolling Stones’ frontman is Mick Jagger.",true,"Mick Jagger has been the Stones’ lead singer since 1962.",1);
ty(1,"What is the name of the Somerset music festival founded by Michael Eavis?",["Glastonbury","Glastonbury Festival"],"Glastonbury, founded in 1970 by farmer Michael Eavis.",2);
ty(1,"Who was Queen’s lead singer?",["Freddie Mercury","Mercury"],"Freddie Mercury (1946–1991).",1);

// ===================== 2. TV & film =====================
m(2,"Sci-fi","What does the name of Doctor Who’s time machine, the TARDIS, stand for?","Time And Relative Dimension In Space",["Travel And Rapid Dimension In Space","Time And Reverse Dimension In Space","Transport Across Relative Dimensions In Space"],"The TARDIS looks like a blue 1960s police box and is bigger on the inside.",2);
m(2,"Detective","What is Sherlock Holmes’s London address?","221B Baker Street",["10 Downing Street","12 Grimmauld Place","1 Abbey Road"],"221B Baker Street, created by Arthur Conan Doyle. 10 Downing Street is the Prime Minister’s home and 12 Grimmauld Place is from Harry Potter.",1);
m(2,"Wizards","At which London station do Harry Potter’s students board the Hogwarts Express?","King’s Cross",["Paddington","Waterloo","Victoria"],"At Platform 9¾ at King’s Cross station.",1);
m(2,"Spies","What is James Bond’s code number?","007",["001","700","077"],"James Bond, created by Ian Fleming, is agent 007 of MI6.",1);
m(2,"Comedy","Which British comedy troupe, with John Cleese and Michael Palin, made the 1975 film Holy Grail?","Monty Python",["The Goodies","The Two Ronnies","Little Britain"],"Monty Python’s Flying Circus began on the BBC in 1969.",2);
m(2,"Comedy","Which actor plays the clumsy character Mr. Bean?","Rowan Atkinson",["Hugh Laurie","Simon Pegg","Stephen Fry"],"Rowan Atkinson created Mr. Bean in 1990.",1);
m(2,"Broadcasting","What does “the Beeb” stand for?","The BBC",["ITV","Sky News","Channel 4"],"The British Broadcasting Corporation, funded by the licence fee.",1);
m(2,"Shows","In which TV show do amateur bakers compete in a tent?","The Great British Bake Off",["MasterChef","Strictly Come Dancing","Gogglebox"],"The Great British Bake Off started on the BBC in 2010.",1);
m(2,"Setting","In which English city is the gangster drama Peaky Blinders set?","Birmingham",["Manchester","Liverpool","Leeds"],"Peaky Blinders follows the Shelby family in Birmingham after the First World War.",2);
m(2,"Comedy","In which seaside town is the hotel of the sitcom Fawlty Towers?","Torquay",["Brighton","Blackpool","Bournemouth"],"Basil Fawlty, played by John Cleese, runs a hotel in Torquay, Devon.",3);
vf(2,"Sherlock Holmes was created by Agatha Christie.",false,"Sherlock Holmes was created by Arthur Conan Doyle. Agatha Christie created Hercule Poirot and Miss Marple.",1);
vf(2,"The Hogwarts Express leaves from King’s Cross station.",true,"From Platform 9¾.",1);
ty(2,"What is James Bond’s code number?",["007","Double O Seven","Double-O Seven"],"Agent 007.",1);
ty(2,"Which British baking show features a tent and judges Paul Hollywood and Prue Leith?",["The Great British Bake Off","Great British Bake Off","Bake Off","GBBO"],"The Great British Bake Off.",2);

// ===================== 3. History & royals =====================
m(3,"Dates","In which year was the Battle of Hastings, won by William the Conqueror?","1066",["1215","1415","1588"],"William, Duke of Normandy, defeated King Harold in 1066.",1);
m(3,"Tudors","How many wives did Henry VIII have?","Six",["Four","Five","Eight"],"Divorced, beheaded, died; divorced, beheaded, survived.",1);
m(3,"Tudors","Which queen reigned when the Spanish Armada was defeated in 1588?","Elizabeth I",["Mary I","Victoria","Anne"],"Elizabeth I reigned from 1558 to 1603.",2);
m(3,"Royals","For how many years did Queen Elizabeth II reign?","70",["50","60","80"],"Elizabeth II reigned from 1952 to 2022, the longest reign of any British monarch.",2);
m(3,"Royals","In which London church was King Charles III crowned in 2023?","Westminster Abbey",["St Paul’s Cathedral","Canterbury Cathedral","Windsor Castle"],"The coronation took place on 6 May 2023 in Westminster Abbey.",2);
m(3,"Law","Which king signed the Magna Carta in 1215?","King John",["Henry VIII","Richard I","Edward I"],"King John sealed the Magna Carta at Runnymede in 1215.",2);
m(3,"Disasters","In which street did the Great Fire of London start in 1666?","Pudding Lane",["Baker Street","Fleet Street","Oxford Street"],"It started in a baker’s shop in Pudding Lane in September 1666.",2);
m(3,"WWII","Who was Prime Minister during most of the Second World War?","Winston Churchill",["Neville Chamberlain","Clement Attlee","Margaret Thatcher"],"Winston Churchill led from May 1940 to July 1945.",1);
m(3,"Navy","At which 1805 battle did Admiral Nelson die?","Trafalgar",["Waterloo","Agincourt","Hastings"],"Nelson died winning the Battle of Trafalgar. Nelson’s Column in London commemorates him.",2);
m(3,"Politics","In which year did the UK vote to leave the European Union in a referendum?","2016",["2012","2018","2020"],"The referendum was held on 23 June 2016.",1);
vf(3,"Henry VIII broke with the Pope and became head of the Church of England.",true,"He did so in the 1530s, after the Pope refused to annul his marriage to Catherine of Aragon.",2);
vf(3,"Queen Victoria reigned before Elizabeth I.",false,"Elizabeth I (1558–1603) came about 250 years before Victoria (1837–1901).",2);
ty(3,"In which year was the Battle of Hastings?",["1066"],"1066.",1);
ty(3,"How many wives did Henry VIII have?",["6","Six","six"],"Six.",1);

// ===================== 4. Food & drink =====================
m(4,"Classics","Which condiment is traditionally sprinkled on fish and chips?","Malt vinegar",["Mustard","Mayonnaise","Soy sauce"],"Malt vinegar and salt, often with mushy peas or tartare sauce.",1);
m(4,"Breakfast","Which of these is NOT usually part of a full English breakfast?","Croissant",["Baked beans","Fried egg","Sausage"],"A full English contains bacon, sausage, eggs, beans, tomato, mushrooms and toast.",1);
m(4,"Classics","Which pudding is traditionally served with roast beef?","Yorkshire pudding",["Christmas pudding","Sticky toffee pudding","Rice pudding"],"Yorkshire pudding is a baked batter served with roast beef and gravy.",1);
m(4,"Tea","Which two counties argue over whether to put jam or cream first on a scone?","Devon and Cornwall",["Kent and Essex","Yorkshire and Lancashire","Norfolk and Suffolk"],"Devon puts the cream first, Cornwall puts the jam first.",2);
m(4,"Scotland","Which Scottish dish is traditionally eaten on Burns Night?","Haggis",["Cullen skink","Cranachan","Scotch broth"],"Haggis is served with neeps and tatties on 25 January, the birthday of poet Robert Burns.",2);
m(4,"Spreads","What is Marmite made from?","Yeast extract",["Fermented fish","Roasted soy","Malted milk"],"Marmite is a savoury yeast extract spread, love it or hate it.",2);
m(4,"Regional","Which county is the original home of the pasty?","Cornwall",["Devon","Yorkshire","Kent"],"The Cornish pasty has protected geographical status.",2);
m(4,"Pies","Which meat is traditionally used in a shepherd’s pie?","Lamb",["Beef","Chicken","Pork"],"Shepherd’s pie is made with lamb, cottage pie with beef.",2);
m(4,"Classics","What are “bangers and mash”?","Sausages and mashed potatoes",["Eggs and chips","Fish and peas","Bacon and beans"],"“Bangers” is slang for sausages.",1);
m(4,"Desserts","The Bakewell tart is named after a town in which county?","Derbyshire",["Somerset","Kent","Yorkshire"],"Bakewell is in the Peak District, Derbyshire.",3);
vf(4,"Cottage pie is traditionally made with lamb.",false,"Cottage pie uses beef. Shepherd’s pie uses lamb.",2);
vf(4,"Afternoon tea traditionally includes scones with jam and cream.",true,"Along with finger sandwiches and cakes.",1);
ty(4,"In which county does the Cornish pasty come from?",["Cornwall"],"Cornwall.",1);
ty(4,"What is the British slang word for sausages?",["Bangers","Banger"],"“Bangers”, as in bangers and mash.",2);

// ===================== 5. Sport & traditions =====================
m(5,"Tennis","On which surface is Wimbledon played?","Grass",["Clay","Hard court","Carpet"],"Wimbledon is the only Grand Slam still played on grass.",1);
m(5,"Football","Which club plays at Old Trafford?","Manchester United",["Manchester City","Liverpool","Arsenal"],"Old Trafford is Manchester United’s ground. Anfield is Liverpool’s.",1);
m(5,"Cricket","Which two countries compete for The Ashes in cricket?","England and Australia",["England and India","England and South Africa","Australia and New Zealand"],"The Ashes started in 1882.",2);
m(5,"Football","In which year did England win the men’s football World Cup?","1966",["1970","1986","1990"],"England beat West Germany 4–2 after extra time at Wembley.",2);
m(5,"Motorsport","How many Formula 1 world titles has Lewis Hamilton won?","Seven",["Five","Six","Nine"],"Seven titles, equalling Michael Schumacher’s record.",2);
m(5,"Rowing","Which two universities compete in the Boat Race on the Thames?","Oxford and Cambridge",["Durham and York","Bristol and Bath","Edinburgh and St Andrews"],"The Boat Race has been held since 1829.",2);
m(5,"Traditions","Which date is Bonfire Night in the UK?","5 November",["31 October","25 December","1 January"],"It commemorates the failed 1605 Gunpowder Plot of Guy Fawkes.",1);
m(5,"Traditions","What is the date of Boxing Day?","26 December",["25 December","1 January","24 December"],"Boxing Day is the day after Christmas Day.",1);
m(5,"Saints","Who is the patron saint of England?","St George",["St Andrew","St David","St Patrick"],"St George’s Day is 23 April. St Andrew is Scotland’s, St David’s is Wales’s, St Patrick’s is Ireland’s.",2);
m(5,"Flag","The Union Jack combines the crosses of which three saints?","St George, St Andrew and St Patrick",["St George, St David and St Patrick","St Andrew, St David and St Patrick","St George, St Andrew and St David"],"The flag of Wales is not included in the Union Flag.",3);
vf(5,"Wimbledon is played on clay courts.",false,"Wimbledon is played on grass.",1);
vf(5,"The Premier League was founded in 1992.",true,"The first season was 1992–93.",3);
ty(5,"Which sport is played at Lord’s?",["Cricket"],"Lord’s is the home of cricket.",2);
ty(5,"Which club plays at Anfield?",["Liverpool","Liverpool FC"],"Liverpool Football Club.",2);

// ===================== 6. Places & language =====================
m(6,"Capitals","What is the capital of Wales?","Cardiff",["Swansea","Newport","Belfast"],"Cardiff. The capital of Northern Ireland is Belfast, of Scotland Edinburgh.",1);
m(6,"London","What is “Big Ben” exactly?","The great bell inside the Elizabeth Tower",["The Houses of Parliament","The clock face","The tower itself"],"The tower itself is called the Elizabeth Tower. Big Ben is the name of the bell.",2);
m(6,"London","What is the London Underground commonly called?","The Tube",["The Metro","The Subway","The Rail"],"The Tube, with eleven lines.",1);
m(6,"London","Which river runs through London?","The Thames",["The Severn","The Mersey","The Tyne"],"The Thames flows through London to the North Sea.",1);
m(6,"Monuments","On which plain does Stonehenge stand?","Salisbury Plain",["Dartmoor","Exmoor","The Cotswolds"],"Stonehenge is a prehistoric stone circle in Wiltshire.",2);
m(6,"Landscape","What is the highest mountain in the UK?","Ben Nevis",["Snowdon","Scafell Pike","Cairn Gorm"],"Ben Nevis, in Scotland, is 1,345 metres high. Snowdon is the highest in Wales.",2);
m(6,"Language","What do British people call a “cookie”?","A biscuit",["A cracker","A scone","A bun"],"Biscuit. And crisps are what Americans call chips.",1);
m(6,"Language","In British English, what is a “lorry”?","A truck",["A tram","A tractor","A taxi"],"A lorry is a truck.",1);
m(6,"Slang","In Cockney rhyming slang, what do “apples and pears” mean?","Stairs",["Money","Friends","Shoes"],"Apples and pears = stairs.",2);
m(6,"Landmarks","Where is the Giant’s Causeway?","Northern Ireland",["Scotland","Wales","Cornwall"],"The Giant’s Causeway, in County Antrim, is a UNESCO World Heritage Site.",2);
vf(6,"Big Ben is the name of the clock tower at the Houses of Parliament.",false,"Big Ben is the bell. The tower is the Elizabeth Tower.",2);
vf(6,"In the UK, cars drive on the left.",true,"Yes, on the left, with the steering wheel on the right.",1);
ty(6,"What is the capital of Scotland?",["Edinburgh"],"Edinburgh.",1);
ty(6,"What is the highest mountain in the UK?",["Ben Nevis"],"Ben Nevis.",2);

return {id:"ukculture",title:"British Culture",kw:"uk united kingdom british britain england english music beatles tv film royals history food tea sport football language trivia fun quiz",subject:"Music, TV, royals, food, sport and words: how British are you?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
