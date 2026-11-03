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
// ===================== More questions =====================
// ---- Music
m(1,"Bands","Which band released the 1967 album Sgt. Pepper’s Lonely Hearts Club Band?","The Beatles",["The Rolling Stones","The Who","Pink Floyd"],"Sgt. Pepper (1967) is often ranked among the greatest albums ever.",1);
m(1,"Singers","Which singer is known for the album Back to Black (2006)?","Amy Winehouse",["Adele","Duffy","Lily Allen"],"Amy Winehouse, from North London, won five Grammys in 2008.",2);
m(1,"Singers","Which British singer released the 2020 album Future Nostalgia?","Dua Lipa",["Ellie Goulding","Jessie J","Charli XCX"],"Dua Lipa was born in London to Kosovo-Albanian parents.",2);
m(1,"Bands","Which boy band featuring Harry Styles was formed on The X Factor in 2010?","One Direction",["Take That","JLS","Westlife"],"One Direction finished third in 2010’s X Factor.",1);
m(1,"Bands","Which British band, formed in London in 1964, is known for the rock opera Tommy?","The Who",["The Kinks","Cream","Genesis"],"Tommy (1969) was written by Pete Townshend.",2);
m(1,"Bands","Which band’s members are Chris Martin, Jonny Buckland, Guy Berryman and Will Champion?","Coldplay",["Muse","Radiohead","Keane"],"Coldplay formed in London in 1997.",2);
m(1,"Bands","Which Welsh singer is famous for “It’s Not Unusual”?","Tom Jones",["Shirley Bassey","Bryn Terfel","Charlotte Church"],"Sir Tom Jones is from Pontypridd, Wales.",2);
m(1,"Singers","Which Welsh singer sang the James Bond theme “Goldfinger”?","Shirley Bassey",["Adele","Dusty Springfield","Cilla Black"],"Shirley Bassey, from Cardiff, sang three Bond themes.",3);
m(1,"Bands","Which Scottish band is known for “I’m Gonna Be (500 Miles)”?","The Proclaimers",["Simple Minds","Franz Ferdinand","Travis"],"The Proclaimers are twin brothers from Edinburgh.",3);
m(1,"Singers","Which British artist is known for “Rocket Man” and “Your Song”?","Elton John",["George Michael","Rod Stewart","Phil Collins"],"Elton John wrote his songs with lyricist Bernie Taupin.",1);
m(1,"Bands","Which band is led by Mick Jagger and Keith Richards?","The Rolling Stones",["The Beatles","Led Zeppelin","Queen"],"The Rolling Stones formed in London in 1962.",1);
m(1,"Events","What is the annual European song competition that the UK takes part in?","Eurovision",["Glastonbury","The BRIT Awards","Mercury Prize"],"The UK has won Eurovision five times.",1);
m(1,"Awards","What are the main British music awards called?","The BRIT Awards",["The Grammys","The Oscars","The Emmys"],"The BRIT Awards are organised by the British Phonographic Industry.",1);
m(1,"Venues","Which London concert hall hosts the BBC Proms every summer?","Royal Albert Hall",["The O2","Wembley Stadium","Abbey Road Studios"],"The Proms are held at the Royal Albert Hall in Kensington.",2);
m(1,"Bands","Which band did Robbie Williams leave in 1995 to go solo?","Take That",["East 17","Boyzone","Blue"],"Robbie Williams left Take That in 1995 and later returned in 2010.",2);
vf(1,"Adele was born in London.",true,"Adele was born in Tottenham, London, in 1988.",2);
vf(1,"Oasis and Blur were rivals in the Britpop era.",true,"Their 1995 chart battle was called “The Battle of Britpop”.",2);
vf(1,"Queen’s guitarist is Brian May.",true,"Brian May is also an astrophysicist.",1);
ty(1,"Which Liverpool band had John, Paul, George and Ringo?",["The Beatles","Beatles"],"The Beatles.",1);
ty(1,"Which singer-songwriter sings “Shape of You” and “Perfect”?",["Ed Sheeran","Sheeran"],"Ed Sheeran.",1);
// ---- TV & film
m(2,"TV","Which sitcom features the character Basil Fawlty?","Fawlty Towers",["Only Fools and Horses","Blackadder","Dad’s Army"],"John Cleese and Connie Booth wrote the show in 1975.",2);
m(2,"TV","In which sitcom do Del Boy and Rodney live in Peckham?","Only Fools and Horses",["Porridge","The Vicar of Dibley","Red Dwarf"],"Only Fools and Horses ran from 1981 to 2003.",2);
m(2,"TV","Which TV show features a British soap set on Albert Square?","EastEnders",["Coronation Street","Emmerdale","Hollyoaks"],"EastEnders is set in the fictional borough of Walford, East London.",1);
m(2,"TV","Which soap opera is set on the cobbled Weatherfield street in Manchester?","Coronation Street",["EastEnders","Emmerdale","Brookside"],"Coronation Street has run since 1960.",2);
m(2,"TV","Which long-running BBC series follows a time-travelling alien in a blue police box?","Doctor Who",["Torchwood","Sherlock","Merlin"],"Doctor Who began in 1963.",1);
m(2,"TV","Which period drama is set in the Crawley family’s country house in Yorkshire?","Downton Abbey",["Bridgerton","The Crown","Poldark"],"Downton Abbey ran from 2010 to 2015.",1);
m(2,"TV","Which Netflix drama follows Queen Elizabeth II’s life?","The Crown",["Bridgerton","Victoria","Sherlock"],"The Crown ran from 2016 to 2023.",1);
m(2,"TV","Which comedy is set on Craggy Island and follows three priests?","Father Ted",["The IT Crowd","Peep Show","Gavin & Stacey"],"Father Ted is an Irish-British sitcom from the 1990s.",3);
m(2,"TV","Which sitcom is set in the Essex village of Billericay and the Welsh town of Barry?","Gavin & Stacey",["The Inbetweeners","Miranda","The Royle Family"],"Gavin & Stacey was created by James Corden and Ruth Jones.",2);
m(2,"Film","Who plays Bridget Jones?","Renée Zellweger",["Kate Winslet","Keira Knightley","Emily Blunt"],"Renée Zellweger, an American actress, plays the British heroine.",2);
m(2,"Film","Which actor plays James Bond in Casino Royale (2006)?","Daniel Craig",["Pierce Brosnan","Sean Connery","Roger Moore"],"Daniel Craig played Bond from 2006 to 2021.",1);
m(2,"Film","Which actor first played James Bond in Dr. No (1962)?","Sean Connery",["Roger Moore","Timothy Dalton","George Lazenby"],"Sean Connery, a Scot, played Bond in six official films.",2);
m(2,"Film","Which film stars Hugh Grant as a bookshop owner who falls for a film star?","Notting Hill",["Four Weddings and a Funeral","About a Boy","Love Actually"],"Notting Hill (1999) also stars Julia Roberts.",2);
m(2,"Film","Which British director made Inception, Interstellar and Oppenheimer?","Christopher Nolan",["Danny Boyle","Guy Ritchie","Ridley Scott"],"Christopher Nolan was born in London.",2);
m(2,"Film","Which animated duo is a man and his dog, made in Bristol?","Wallace and Gromit",["Shaun and Timmy","Postman Pat","Fireman Sam"],"Wallace & Gromit were created by Nick Park at Aardman in Bristol.",2);
m(2,"Film","Which British actor plays Gandalf in the Lord of the Rings films?","Ian McKellen",["Patrick Stewart","Michael Gambon","Ben Kingsley"],"Sir Ian McKellen played Gandalf.",2);
m(2,"Film","At which studios near Watford were most of the Harry Potter films shot?","Leavesden Studios",["Pinewood","Ealing","Elstree"],"The Making of Harry Potter tour is at Warner Bros. Studio Tour London in Leavesden.",3);
vf(2,"Mr. Bean was played by Rowan Atkinson.",true,"Rowan Atkinson created the character in 1990.",1);
vf(2,"Downton Abbey is set in Wales.",false,"It is set in Yorkshire.",2);
vf(2,"The Crown is about the British royal family.",true,"The Crown dramatises Queen Elizabeth II’s reign.",1);
ty(2,"Who is Britain’s famous fictional spy with number 007?",["James Bond","Bond"],"James Bond.",1);
ty(2,"Which soap opera is set on Albert Square in East London?",["EastEnders","Eastenders"],"EastEnders.",2);
// ---- History
m(3,"Royals","Who is the heir to the British throne after Charles III?","Prince William",["Prince Harry","Prince George","Prince Andrew"],"Prince William, Prince of Wales, is the eldest son of King Charles III.",1);
m(3,"Royals","What is the London home of the British monarch?","Buckingham Palace",["Windsor Castle","Kensington Palace","Balmoral"],"Buckingham Palace has been the official London residence since 1837.",1);
m(3,"Royals","Which queen gave her name to an era in the 19th century?","Queen Victoria",["Queen Anne","Queen Mary","Queen Elizabeth I"],"Queen Victoria reigned from 1837 to 1901.",1);
m(3,"History","Who was the first woman to become UK Prime Minister, in 1979?","Margaret Thatcher",["Theresa May","Liz Truss","Queen Victoria"],"Margaret Thatcher was PM from 1979 to 1990.",1);
m(3,"History","Which wall did the Romans build in northern England?","Hadrian’s Wall",["Offa’s Dyke","Antonine Wall","The Great Wall"],"Hadrian’s Wall was begun around AD 122.",2);
m(3,"History","Which event of 1665–1666 killed many Londoners before the Great Fire?","The Great Plague",["The Black Death","The Peasants’ Revolt","The Blitz"],"The Great Plague killed about 100,000 people in London.",3);
m(3,"History","Which bombing campaign of 1940–41 hit London during the Second World War?","The Blitz",["The Great Fire","The Armada","The Gunpowder Plot"],"The Blitz lasted from September 1940 to May 1941.",1);
m(3,"History","Which year did the UK join the European Economic Community?","1973",["1957","1980","1992"],"The UK joined the EEC on 1 January 1973 under Edward Heath.",3);
m(3,"History","Who was the leader of the 17th-century English Civil War’s Parliamentarians?","Oliver Cromwell",["Charles II","Robert Walpole","Francis Drake"],"Oliver Cromwell became Lord Protector in 1653.",2);
m(3,"History","Which English king was executed in 1649?","Charles I",["Charles II","Richard III","James II"],"Charles I was beheaded in Whitehall.",2);
m(3,"History","Who wrote the plays Hamlet and Macbeth?","William Shakespeare",["Christopher Marlowe","Charles Dickens","Ben Jonson"],"William Shakespeare (1564–1616) was born in Stratford-upon-Avon.",1);
m(3,"History","Which author wrote Oliver Twist and A Christmas Carol?","Charles Dickens",["Jane Austen","Thomas Hardy","George Orwell"],"Charles Dickens (1812–1870).",1);
m(3,"History","Which scientist, born in 1643, formulated the laws of motion and gravity?","Isaac Newton",["Charles Darwin","Stephen Hawking","Michael Faraday"],"Newton published the Principia in 1687.",2);
m(3,"History","Which British naturalist wrote On the Origin of Species?","Charles Darwin",["Isaac Newton","Alexander Fleming","James Watt"],"The book came out in 1859.",1);
m(3,"History","Which island nation was the ‘workshop of the world’ in the Industrial Revolution?","Great Britain",["Japan","Iceland","Ireland"],"The Industrial Revolution began in Britain in the late 18th century.",2);
vf(3,"Queen Victoria was the longest-reigning British monarch before Elizabeth II.",true,"Victoria reigned 63 years, 7 months. Elizabeth II surpassed her in 2015.",2);
vf(3,"The Magna Carta was signed in 1815.",false,"It was sealed in 1215.",1);
vf(3,"Shakespeare was born in Stratford-upon-Avon.",true,"He was born there in 1564.",1);
ty(3,"Who was the first female UK Prime Minister?",["Margaret Thatcher","Thatcher"],"Margaret Thatcher.",1);
ty(3,"Which author wrote A Christmas Carol? (last name)",["Dickens","Charles Dickens"],"Charles Dickens.",2);
// ---- Food
m(4,"Drinks","What is the traditional British hot drink drunk with milk?","Tea",["Coffee","Hot chocolate","Cider"],"The British drink about 100 million cups of tea a day.",1);
m(4,"Drinks","Which spirit is made in Scotland?","Whisky",["Rum","Vodka","Gin"],"Scotch whisky must be aged in Scotland for at least three years.",1);
m(4,"Drinks","What is a “pint”, traditionally?","About 568 ml of beer",["About 330 ml of wine","A glass of whisky","A can of cider"],"A British pint is 568 ml, unlike the US pint of 473 ml.",2);
m(4,"Food","Which pie contains minced beef and a mash topping?","Cottage pie",["Pork pie","Steak and kidney pie","Cornish pasty"],"Cottage pie is beef, shepherd’s pie lamb.",1);
m(4,"Food","What is the main ingredient of a Ploughman’s lunch?","Bread and cheese",["Fish and chips","Roast beef","Eggs and bacon"],"A Ploughman’s lunch has bread, cheese, pickle and salad.",2);
m(4,"Food","What are crumpets usually eaten with?","Butter",["Mustard","Ketchup","Vinegar"],"Crumpets are toasted and spread with butter.",1);
m(4,"Food","What is a Scotch egg?","A boiled egg wrapped in sausage meat and breadcrumbs",["A fried egg on toast","An egg with whisky","A poached egg in a nest"],"Scotch eggs are served cold.",2);
m(4,"Food","Which chocolate brand, founded in Birmingham in 1824, makes Dairy Milk?","Cadbury",["Hershey’s","Lindt","Ferrero"],"Cadbury was founded by John Cadbury.",1);
m(4,"Food","Which spicy dish is often called Britain’s national dish?","Chicken tikka masala",["Haggis","Pasta","Paella"],"Chicken tikka masala is a popular curry in Britain.",2);
m(4,"Food","What is “Welsh rarebit”?","Cheese on toast with sauce",["Rabbit stew","Leek soup","Lamb pie"],"Welsh rarebit is melted cheese sauce on toast.",2);
m(4,"Food","Which dessert is a spongy cake soaked in toffee sauce?","Sticky toffee pudding",["Trifle","Eton mess","Spotted dick"],"Sticky toffee pudding is served with toffee sauce and custard or ice cream.",2);
m(4,"Food","Which dessert is made of strawberries, meringue and cream?","Eton mess",["Trifle","Crumble","Bread and butter pudding"],"Eton mess is named after Eton College.",2);
m(4,"Food","Which vegetable is a national emblem of Wales?","Leek",["Potato","Carrot","Cabbage"],"The leek is a national emblem of Wales.",2);
m(4,"Food","What do the British call thick-cut fried potatoes served with fish?","Chips",["Crisps","Wedges","Mash"],"In the UK, ‘chips’ are thick-cut fried potatoes and ‘crisps’ are thin packaged slices.",1);
vf(4,"Marmite is made from yeast extract.",true,"A by-product of brewing.",1);
vf(4,"Haggis is made from sheep offal.",true,"It is cooked inside a casing, traditionally the sheep’s stomach.",2);
vf(4,"Yorkshire pudding is a dessert.",false,"It is usually served with the main course of a roast.",1);
ty(4,"What do the British call thin potato slices in a packet? (US: chips)",["Crisps","Crisp"],"Crisps.",1);
ty(4,"Which hot drink is the UK’s favourite?",["Tea"],"Tea.",1);
// ---- Sport
m(5,"Football","Which London club plays at the Emirates Stadium?","Arsenal",["Chelsea","Tottenham Hotspur","West Ham United"],"Arsenal moved to the Emirates in 2006.",2);
m(5,"Football","Which stadium is the national stadium of England?","Wembley Stadium",["Old Trafford","Twickenham","Anfield"],"The new Wembley opened in 2007.",1);
m(5,"Football","Which striker is England’s all-time top men’s goalscorer?","Harry Kane",["Wayne Rooney","Alan Shearer","Gary Lineker"],"Harry Kane overtook Wayne Rooney in 2023.",2);
m(5,"Football","Which Glasgow club in green and white plays at Parkhead?","Celtic",["Rangers","Hearts","Aberdeen"],"Celtic Park is in the east end of Glasgow.",2);
m(5,"Rugby","Which sport is played at Twickenham?","Rugby union",["Cricket","Tennis","Football"],"Twickenham is the home of England Rugby.",2);
m(5,"Rugby","Which tournament do England, Scotland, Wales, Ireland, France and Italy play?","The Six Nations",["The Rugby Championship","The Premiership","The Calcutta Cup"],"The Six Nations takes place each winter-spring.",2);
m(5,"Cricket","How many players are in a cricket team on the field?","11",["9","10","15"],"Eleven players per side.",1);
m(5,"Tennis","Which British player won Wimbledon in 2013, the first British man to do so since 1936?","Andy Murray",["Tim Henman","Greg Rusedski","Dan Evans"],"Andy Murray won Wimbledon in 2013 and 2016.",2);
m(5,"Olympics","Which year did London host the Summer Olympics most recently?","2012",["2008","2016","2004"],"London also hosted in 1908 and 1948.",1);
m(5,"Athletics","Which British athlete won heptathlon gold at London 2012?","Jessica Ennis-Hill",["Paula Radcliffe","Kelly Holmes","Denise Lewis"],"She won heptathlon gold on ‘Super Saturday’.",2);
m(5,"Athletics","Which British runner won gold in the 800m and 1500m at the 2004 Olympics?","Kelly Holmes",["Sebastian Coe","Mo Farah","Steve Ovett"],"Dame Kelly Holmes won both events.",3);
m(5,"Golf","In which Scottish town is the Old Course, the home of golf?","St Andrews",["Gleneagles","Carnoustie","Turnberry"],"St Andrews is the home of the Royal and Ancient Golf Club.",2);
m(5,"Horse racing","Which race is held at Aintree each April?","The Grand National",["The Epsom Derby","Royal Ascot","The Cheltenham Gold Cup"],"The Grand National is run over about four miles.",2);
m(5,"Traditions","Which sport is the Epsom Derby?","Horse racing",["Greyhound racing","Cycling","Rowing"],"The Derby has run since 1780.",2);
m(5,"Traditions","What is the colour of the London buses?","Red",["Blue","Green","Yellow"],"Red double-decker buses are an icon of London.",1);
vf(5,"Wimbledon takes place in London.",true,"In the south-west suburb of Wimbledon.",1);
vf(5,"England has won the men’s FIFA World Cup twice.",false,"England has won it once, in 1966.",2);
vf(5,"A cricket match can last for five days.",true,"Test matches last up to five days.",1);
ty(5,"Which British tennis player won Wimbledon in 2013 and 2016? (last name)",["Murray","Andy Murray"],"Andy Murray.",2);
ty(5,"In which year did England win the men’s World Cup?",["1966"],"1966.",1);
// ---- Places
m(6,"Capitals","What is the capital of Northern Ireland?","Belfast",["Dublin","Derry","Cardiff"],"Belfast is the capital of Northern Ireland.",1);
m(6,"Capitals","What is the capital of England?","London",["Manchester","Birmingham","Oxford"],"London is the capital of both England and the UK.",1);
m(6,"London","Which London bridge is raised to let ships pass?","Tower Bridge",["London Bridge","Westminster Bridge","Waterloo Bridge"],"Tower Bridge opened in 1894.",1);
m(6,"London","Which London wheel is on the South Bank of the Thames?","The London Eye",["The Shard","The Gherkin","The Walkie-Talkie"],"The London Eye opened in 2000.",1);
m(6,"London","Which London landmark is the tallest building in the UK?","The Shard",["The Gherkin","BT Tower","Canary Wharf Tower"],"The Shard is 310 metres tall.",2);
m(6,"London","In which London park is Speakers’ Corner?","Hyde Park",["Regent’s Park","Richmond Park","Green Park"],"Speakers’ Corner is at the north-east corner of Hyde Park.",3);
m(6,"Cities","Which Scottish city hosts a famous annual festival and Fringe in August?","Edinburgh",["Glasgow","Aberdeen","Dundee"],"The Edinburgh Festival Fringe is the world’s largest arts festival.",2);
m(6,"Cities","Which university city is home to the River Cam?","Cambridge",["Oxford","Durham","Bath"],"Cambridge is on the River Cam.",1);
m(6,"Cities","Which Somerset city is famous for its Roman spa and the Royal Crescent?","Bath",["York","Exeter","Chester"],"The Roman Baths in Bath, Somerset.",2);
m(6,"Cities","In which city is the Cavern Club where the Beatles played?","Liverpool",["Manchester","Leeds","Birmingham"],"The Cavern Club is on Mathew Street, Liverpool.",2);
m(6,"Nature","Which national park in Wales contains Snowdon?","Snowdonia",["Dartmoor","Exmoor","Peak District"],"Snowdon (1,085 m) is the highest mountain in Wales.",2);
m(6,"Nature","In which part of the UK is the Lake District?","North West England",["Scotland","Wales","South East England"],"The Lake District National Park is in Cumbria.",2);
m(6,"Language","What do the British call a ‘sidewalk’?","A pavement",["A kerb","A path","A road"],"In the UK, ‘pavement’ is the path for pedestrians.",1);
m(6,"Language","What is a British ‘flat’?","An apartment",["A shoe","A pancake","A road"],"Flat = apartment.",1);
m(6,"Language","What do the British call the ‘trunk’ of a car?","The boot",["The hood","The bonnet","The wing"],"In the UK, the boot is at the back and the bonnet at the front.",1);
m(6,"Language","What is a British ‘jumper’?","A sweater",["A kangaroo","A bridge","A skirt"],"Jumper = sweater.",1);
m(6,"Language","What do the British call a ‘line’ of people waiting?","A queue",["A row","A string","A stack"],"The British are famous for queuing.",1);
vf(6,"The River Thames flows through Oxford.",true,"It is called the Isis in Oxford.",3);
vf(6,"Cardiff is the capital of Scotland.",false,"Cardiff is the capital of Wales.",1);
vf(6,"The Tube is the nickname of the London Underground.",true,"The first line opened in 1863.",1);
ty(6,"What is the capital of Northern Ireland?",["Belfast"],"Belfast.",2);
ty(6,"What do the British call a ‘trunk’? (it’s at the back of a car)",["Boot","The boot"],"The boot.",2);

return {id:"ukculture",title:"British Culture",kw:"uk united kingdom british britain england english music beatles tv film royals history food tea sport football language trivia fun quiz",subject:"Music, TV, royals, food, sport and words: how British are you?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
