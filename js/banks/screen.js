// Built-in bank: Screen time, binge series, Disney & Pixar, Marvel & DC, fantasy and cult hits (English).
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for superfans).
window.BANK_SCREEN=(function(){
const SESS={1:"Netflix & binge-watching",2:"Disney & Pixar",3:"Marvel & DC",4:"Wizards, galaxies & cult hits"};
const TAGS={1:"Binge",2:"Disney",3:"Superheroes",4:"Cult hits"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Netflix & binge-watching =====================
m(1,"Squid Game","In which country is Squid Game set and made?","South Korea",["Japan","China","Thailand"],"The Korean series was released on Netflix in September 2021 and became its biggest hit.",1);
m(1,"Stranger Things","What is the alternate dimension called in Stranger Things?","The Upside Down",["The Dark Zone","The Shadow Realm","The Void"],"Eleven and her friends fight the Demogorgon from the Upside Down in Hawkins, Indiana.",1);
m(1,"Money Heist","Which Spanish series features the Professor and a heist at the Royal Mint of Spain?","Money Heist (La Casa de Papel)",["Elite","Narcos","The Crown"],"The robbers wear red jumpsuits and Salvador Dalí masks.",1);
m(1,"Wednesday","Who plays Wednesday Addams in the 2022 Netflix series?","Jenna Ortega",["Millie Bobby Brown","Zendaya","Sadie Sink"],"The Tim Burton series is set at Nevermore Academy.",1);
m(1,"Breaking Bad","What is Walter White’s job at the start of Breaking Bad?","A high-school chemistry teacher",["A police officer","A doctor","A lawyer"],"He turns to making methamphetamine after a cancer diagnosis.",1);
m(1,"Game of Thrones","Which house’s motto is “Winter is Coming”?","House Stark",["House Lannister","House Targaryen","House Baratheon"],"The Starks rule the North of Westeros.",1);
m(1,"Friends","What is the name of the coffee house in Friends?","Central Perk",["Monk’s Café","Café Nervosa","The Grind"],"The gang usually sits on the orange couch.",1);
m(1,"The Office","In the US version of The Office, what is the name of the paper company?","Dunder Mifflin",["Wernham Hogg","Vance Refrigeration","Initech"],"It is based in Scranton, Pennsylvania.",2);
m(1,"Peaky Blinders","In which English city is Peaky Blinders set?","Birmingham",["London","Manchester","Liverpool"],"Tommy Shelby is played by Cillian Murphy.",2);
m(1,"Bridgerton","In which period is Bridgerton set?","The Regency era (early 1800s)",["The Victorian era","The 1920s","The Tudor period"],"The series is based on Julia Quinn’s novels and follows families in London high society.",2);
m(1,"Narcos","Which drug lord is the focus of the first two seasons of Narcos?","Pablo Escobar",["El Chapo","Al Capone","Tony Montana"],"The Colombian cartel boss was killed in Medellín in 1993.",2);
m(1,"Elite","Which Spanish Netflix teen drama is set at the exclusive school Las Encinas?","Elite",["Money Heist","Cable Girls","Sky Rojo"],"The Netflix series Elite launched in 2018 and ran for eight seasons.",2);
vf(1,"Stranger Things is set in the 1980s.",true,"The first season takes place in 1983.",1);
vf(1,"The Crown is a series about Queen Elizabeth II.",true,"It follows Queen Elizabeth II and the royal family.",1);

// ===================== 2. Disney & Pixar =====================
m(2,"Frozen","Which song from Frozen (2013) became a global hit?","Let It Go",["Into the Unknown","A Whole New World","Reflection"],"Idina Menzel sings it as Elsa.",1);
m(2,"The Lion King","What does “Hakuna Matata” mean in The Lion King?","No worries",["Welcome home","Long live the king","Be brave"],"The phrase is Swahili, and the song is sung by Timon and Pumbaa.",1);
m(2,"Aladdin","What is the Genie’s main talent in Aladdin?","Granting wishes",["Flying carpets","Healing","Time travel"],"The Genie grants three wishes and was voiced by Robin Williams in 1992.",1);
m(2,"Encanto","Which song from Encanto was a huge TikTok hit in 2021?","We Don’t Talk About Bruno",["Surface Pressure","How Far I’ll Go","Colors of the Wind"],"The Madrigal family lives in Colombia.",1);
m(2,"Coco","Which holiday is celebrated in the film Coco?","The Day of the Dead (Día de Muertos)",["Halloween","Carnival","Christmas"],"Coco (2017) is set in Mexico.",1);
m(2,"Inside Out","Which emotion leads the mind of Riley in Inside Out?","Joy",["Anger","Fear","Disgust"],"Joy is played by Amy Poehler; Sadness by Phyllis Smith.",2);
m(2,"Toy Story","What kind of toy is Buzz Lightyear?","A space ranger action figure",["A cowboy doll","A dinosaur","A robot"],"His catchphrase is “To infinity and beyond!”",1);
m(2,"Company","Which character was Walt Disney’s first big star (1928)?","Mickey Mouse",["Donald Duck","Goofy","Bugs Bunny"],"Mickey Mouse debuted in the cartoon Steamboat Willie in 1928.",1);
m(2,"Company","What was Disney’s first full-length animated film (1937)?","Snow White and the Seven Dwarfs",["Cinderella","Pinocchio","Bambi"],"It was a huge risk at the time and a big success.",2);
m(2,"Company","Disney bought which three entertainment companies between 2006 and 2019?","Pixar, Marvel and Lucasfilm",["Warner, HBO and Netflix","Universal, Sony and DreamWorks","Paramount, Pixar and Sony"],"Pixar in 2006, Marvel in 2009, Lucasfilm in 2012 and 21st Century Fox in 2019.",3);
m(2,"Company","In which US city did Disneyland open in 1955?","Anaheim",["Orlando","Los Angeles","San Diego"],"Disneyland opened in Anaheim, California, in July 1955.",3);
m(2,"Moana","Which actor voices Maui in Moana?","Dwayne Johnson",["Chris Hemsworth","Jason Momoa","Will Smith"],"Maui is a Polynesian demigod who has a giant fishhook.",2);
vf(2,"Shrek is a Disney film.",false,"Shrek is a DreamWorks animation, not Disney.",2);
vf(2,"Toy Story was the first fully computer-animated feature film.",true,"Pixar’s Toy Story came out in 1995.",2);

// ===================== 3. Marvel & DC =====================
m(3,"MCU","Which film started the Marvel Cinematic Universe in 2008?","Iron Man",["Thor","Captain America","The Incredible Hulk"],"Robert Downey Jr. played Tony Stark and made Marvel a movie giant.",2);
m(3,"MCU","How many Infinity Stones are there?","Six",["Three","Five","Seven"],"Power, Space, Reality, Soul, Time and Mind.",2);
m(3,"MCU","What is the name of Thor’s hammer?","Mjölnir",["Stormbreaker","Gungnir","Excalibur"],"Thor’s hammer is Mjölnir; Stormbreaker is the axe he uses against Thanos.",2);
m(3,"MCU","Which fictional African nation is the home of Black Panther?","Wakanda",["Zamunda","Genovia","Latveria"],"Wakanda is a hidden, technologically advanced kingdom.",1);
m(3,"MCU","Which Guardians of the Galaxy character can only say the same three words?","Groot",["Rocket","Drax","Yondu"],"Groot, a tree-like alien, only says “I am Groot”.",1);
m(3,"MCU","Who plays Spider-Man in the recent MCU films?","Tom Holland",["Tobey Maguire","Andrew Garfield","Timothée Chalamet"],"Tom Holland first played Peter Parker in Captain America: Civil War (2016).",1);
m(3,"MCU","Which film became the highest-grossing movie of all time in 2019?","Avengers: Endgame",["Avatar","Titanic","Avengers: Infinity War"],"Endgame briefly beat Avatar; both are above $2.7 billion.",3);
m(3,"DC","What is Superman’s home planet?","Krypton",["Mars","Vulcan","Asgard"],"Superman (Kal-El) was sent to Earth as a baby.",1);
m(3,"DC","Which city does Batman protect?","Gotham City",["Metropolis","Central City","Star City"],"Bruce Wayne is the billionaire alter ego of Batman.",1);
m(3,"DC","Who won a posthumous Oscar for playing the Joker in The Dark Knight?","Heath Ledger",["Joaquin Phoenix","Jared Leto","Jack Nicholson"],"Heath Ledger won Best Supporting Actor in 2009 after his death in 2008.",2);
m(3,"DC","Wonder Woman comes from which island?","Themyscira",["Atlantis","Oa","Apokolips"],"Themyscira is the island of the Amazons.",3);
vf(3,"Batman is a Marvel character.",false,"Batman is DC Comics. Marvel owns Spider-Man and the Avengers.",1);
vf(3,"Captain America’s shield is made of vibranium.",true,"Vibranium is the Wakandan metal that absorbs vibrations.",2);

// ===================== 4. Wizards, galaxies & cult hits =====================
m(4,"Harry Potter","Which four houses are there at Hogwarts?","Gryffindor, Hufflepuff, Ravenclaw, Slytherin",["Gryffindor, Hufflepuff, Ravenclaw, Durmstrang","Gryffindor, Beauxbatons, Ravenclaw, Slytherin","Gryffindor, Hufflepuff, Dumbledore, Slytherin"],"The Sorting Hat decides which house each student joins.",1);
m(4,"Harry Potter","From which platform does the Hogwarts Express leave?","Platform 9¾",["Platform 7","Platform 13","Platform 10½"],"At King’s Cross station in London.",1);
m(4,"Harry Potter","What is the name of Harry Potter’s owl?","Hedwig",["Errol","Pigwidgeon","Crookshanks"],"Hagrid gives Hedwig to Harry for his 11th birthday.",2);
m(4,"Harry Potter","Which sport do wizards play on flying broomsticks?","Quidditch",["Quodpot","Wizardball","Skyball"],"The Golden Snitch ends the game.",1);
m(4,"Lord of the Rings","What is Frodo’s mission in The Lord of the Rings?","To destroy the One Ring",["To find a treasure","To rescue a princess","To defeat a dragon"],"He must throw it into the fires of Mount Doom.",1);
m(4,"Star Wars","Who is the green Jedi master in Star Wars?","Yoda",["Obi-Wan Kenobi","Mace Windu","Chewbacca"],"Yoda trains Luke Skywalker in The Empire Strikes Back.",1);
m(4,"Star Wars","What colour is Darth Vader’s lightsaber?","Red",["Blue","Green","Purple"],"Sith lightsabers are red.",1);
m(4,"Star Wars","In Star Wars, what is Baby Yoda’s real name?","Grogu",["Din","Yaddle","Ahsoka"],"Grogu appears in The Mandalorian (2019).",2);
m(4,"The Simpsons","In which fictional town do The Simpsons live?","Springfield",["Shelbyville","Quahog","Langley Falls"],"The Simpsons has aired since 1989.",1);
m(4,"SpongeBob","What is SpongeBob’s best friend’s name?","Patrick Star",["Squidward","Mr. Krabs","Sandy Cheeks"],"Patrick is a starfish who lives under a rock.",1);
vf(4,"Frankenstein is the name of the monster.",false,"In Mary Shelley’s novel, Frankenstein is the scientist, Victor Frankenstein; the creature has no name.",3);
vf(4,"In The Matrix, Neo chooses the blue pill.",false,"Neo takes the red pill, which wakes him up to the truth; the blue pill would have kept him in the illusion.",2);

// ===================== Typed answers =====================
ty(1,"Which Korean series features players in green tracksuits? (two words)",["Squid Game"],"Squid Game launched in 2021.",1);
ty(1,"What is the name of the Hawkins girl with powers in Stranger Things? (one word)",["Eleven","El"],"Millie Bobby Brown plays Eleven.",1);
ty(2,"Which Disney princess has a sister called Anna? (one word)",["Elsa"],"Elsa is the Snow Queen in Frozen.",1);
ty(2,"Which cartoon mouse is the face of Disney? (two words)",["Mickey Mouse","Mickey"],"Mickey Mouse is Disney’s mascot.",1);
ty(3,"What is Tony Stark’s superhero name? (two words)",["Iron Man","Ironman"],"Tony Stark is Iron Man.",1);
ty(4,"What is Harry Potter’s school called? (one word)",["Hogwarts"],"Hogwarts School of Witchcraft and Wizardry.",1);
ty(4,"Which villain is Luke Skywalker’s father? (two words)",["Darth Vader","Vader"],"Anakin Skywalker became Darth Vader.",2);

// ===================== More questions (batch 2) =====================
m(1,"Netflix","In “The Queen’s Gambit”, which game is Beth Harmon a prodigy at?","Chess",["Poker","Go","Bridge"],"The 2020 miniseries made chess sets sell out around the world.",1);
m(1,"Netflix","Who played Geralt of Rivia in the first seasons of “The Witcher”?","Henry Cavill",["Chris Hemsworth","Tom Hardy","Michael Fassbender"],"Cavill left the role after season three and was replaced by Liam Hemsworth.",2);
m(1,"Netflix","Which actor plays the obsessive Joe Goldberg in “You”?","Penn Badgley",["Zac Efron","Timothée Chalamet","Ben Affleck"],"Badgley was previously famous for playing Dan Humphrey in “Gossip Girl”.",3);
m(1,"Netflix","Which 2022 Netflix K-drama features high school students trapped by a zombie outbreak?","All of Us Are Dead",["Kingdom","Sweet Home","Hellbound"],"The series quickly rose to the top of the Netflix charts in dozens of countries.",2);
m(1,"Netflix","Which Netflix series follows an American marketing executive who moves to Paris?","Emily in Paris",["Gossip Girl","Lupin","Sex and the City"],"Lily Collins stars in the show created by Darren Star.",1);
m(1,"Netflix","Which 2020 Netflix docuseries about big-cat owners went viral during the first lockdown?","Tiger King",["Making a Murderer","The Last Dance","Wild Wild Country"],"Millions of people watched it within its first ten days.",2);
m(1,"Netflix","The animated Netflix series “Arcane” is based on which video game?","League of Legends",["Dota 2","World of Warcraft","Fortnite"],"Arcane won an Emmy for Outstanding Animated Program in 2022.",2);
vf(1,"The Netflix series “Wednesday” was directed in part by Tim Burton.",true,"Burton directed four episodes of the first season, which starred Jenna Ortega.",2);
vf(1,"“Money Heist” (La Casa de Papel) first aired on a Spanish TV channel, not on Netflix.",true,"It premiered on Antena 3 in 2017 and then became a global hit after Netflix bought it.",3);

m(2,"Disney","In the Disney film “Tangled”, what is special about Rapunzel’s hair?","It is very long and magical",["It glows in the dark","It changes colour","It never grows"],"Rapunzel’s hair can heal and stay young in this 2010 film.",1);
m(2,"Disney","Which Disney villain is a sea witch with tentacles in “The Little Mermaid”?","Ursula",["Maleficent","Jafar","Scar"],"Ursula steals Ariel’s voice in exchange for legs.",1);
m(2,"Disney","Who is the villain in “The Lion King”?","Scar",["Jafar","Gaston","Hades"],"Simba’s uncle plots to become king.",1);
m(2,"Disney","Which Disney princess is a warrior who disguises herself as a man in the army?","Mulan",["Merida","Tiana","Pocahontas"],"Mulan is based on a Chinese legend and was released by Disney in 1998.",1);
m(2,"Disney","Which song from “Beauty and the Beast” is sung by the enchanted candlestick and objects?","Be Our Guest",["Belle","Gaston","Something There"],"Lumière leads the dazzling dinner show.",1);
m(2,"Disney","Which song from “Moana” is sung when she first dreams of the sea?","How Far I’ll Go",["You’re Welcome","Shiny","We Know the Way"],"Auli‘i Cravalho sang it, with music by Lin-Manuel Miranda.",2);
m(2,"Pixar","In “Finding Nemo”, what is Dory’s main problem?","She has short-term memory loss",["She can’t swim","She is blind","She can’t speak"],"Her line “Just keep swimming” became iconic.",1);
m(2,"Pixar","What is the name of the red race car hero of “Cars”?","Lightning McQueen",["Mater","Doc Hudson","Sally"],"He is voiced by Owen Wilson.",1);
m(2,"Pixar","In “Ratatouille”, what is the name of the rat who dreams of being a chef?","Remy",["Emile","Linguini","Django"],"Remy cooks by controlling a young chef called Linguini.",2);
m(2,"Pixar","In “Up”, what is the name of the talking dog?","Dug",["Doug","Max","Buddy"],"His collar translates his thoughts into speech. His famous line is “Squirrel!”",2);
m(2,"Disney","What is the name of Elsa’s snowman friend in “Frozen”?","Olaf",["Sven","Kristoff","Hans"],"Olaf loves warm hugs and dreams of summer.",1);
vf(2,"Walt Disney was the original voice of Mickey Mouse.",true,"He voiced Mickey from 1928 until 1947.",2);
vf(2,"Pixar was originally part of Lucasfilm.",true,"Steve Jobs bought the computer graphics division from George Lucas in 1986.",3);

m(3,"Marvel","Which actor plays Iron Man in the Marvel Cinematic Universe?","Robert Downey Jr.",["Chris Evans","Mark Ruffalo","Jeremy Renner"],"“Iron Man” (2008) launched the MCU.",1);
m(3,"Marvel","Which actor plays Thor in the MCU?","Chris Hemsworth",["Chris Pratt","Chris Pine","Tom Hiddleston"],"Hemsworth is Australian and has played Thor since 2011.",1);
m(3,"Marvel","Which actress plays Black Widow in the MCU?","Scarlett Johansson",["Elizabeth Olsen","Zoe Saldaña","Brie Larson"],"Johansson’s Natasha Romanoff first appeared in “Iron Man 2”.",1);
m(3,"Marvel","Who is the Hulk’s alter ego?","Bruce Banner",["Peter Parker","Steve Rogers","Clint Barton"],"A lab accident with gamma radiation turned Banner into the Hulk.",1);
m(3,"Marvel","Who is the main villain of “Avengers: Infinity War”?","Thanos",["Loki","Ultron","Hela"],"Thanos wants the six Infinity Stones to wipe out half of all life.",1);
m(3,"Marvel","Which actor plays Deadpool?","Ryan Reynolds",["Hugh Jackman","Chris Evans","Josh Brolin"],"Reynolds also helped produce and write the films.",1);
m(3,"Marvel","Which actor played Spider-Man in the 2002 film directed by Sam Raimi?","Tobey Maguire",["Andrew Garfield","Tom Holland","Jake Gyllenhaal"],"The film was one of the first modern superhero blockbusters.",2);
m(3,"Marvel","Which comics legend co-created Spider-Man, Iron Man and the X-Men and made cameos in Marvel films?","Stan Lee",["Jack Kirby","Frank Miller","Alan Moore"],"Stan Lee appeared in almost all Marvel films until his death in 2018.",1);
m(3,"Marvel","What does MCU stand for?","Marvel Cinematic Universe",["Marvel Comics Union","Mighty Cartoon Universe","Movie Characters Unlimited"],"It is the shared universe of Marvel films and series.",1);
m(3,"DC","Who is Batman’s loyal butler?","Alfred Pennyworth",["James Gordon","Lucius Fox","Harvey Dent"],"Alfred raised Bruce Wayne after his parents died.",1);
m(3,"DC","What is Superman’s everyday identity as a journalist?","Clark Kent",["Bruce Wayne","Peter Parker","Barry Allen"],"He works at the newspaper the Daily Planet.",1);
m(3,"DC","Which actor won the Oscar for Best Actor for playing the Joker in the 2019 film?","Joaquin Phoenix",["Jared Leto","Jack Nicholson","Robert De Niro"],"The film “Joker” was also nominated for 11 Oscars.",2);
vf(3,"Wolverine is a DC Comics character.",false,"Wolverine is a Marvel character and a member of the X-Men.",1);
vf(3,"Kryptonite is Superman’s greatest weakness.",true,"This green rock from his home planet Krypton drains his powers.",1);
vf(3,"Thor’s adoptive brother is Loki.",true,"In Norse myth and the MCU, Loki is the god of mischief.",1);

m(4,"Wizards","Who plays Harry Potter in the film series?","Daniel Radcliffe",["Rupert Grint","Tom Felton","Eddie Redmayne"],"Radcliffe was 11 when he was cast.",1);
m(4,"Wizards","Who plays Hermione Granger in the Harry Potter films?","Emma Watson",["Emma Stone","Bonnie Wright","Keira Knightley"],"Watson was only about ten years old when she was cast.",1);
m(4,"Wizards","What is the name of the evil wizard known as “He-Who-Must-Not-Be-Named”?","Voldemort",["Grindelwald","Sauron","Saruman"],"Voldemort’s real name is Tom Marvolo Riddle.",1);
m(4,"Wizards","In Harry Potter, what is a “Muggle”?","A person without magical powers",["A type of broom","A magical creature","A Hogwarts teacher"],"Muggles can’t usually see or use magic.",1);
m(4,"Wizards","Who is Harry Potter’s best friend with red hair?","Ron Weasley",["Neville Longbottom","Draco Malfoy","Seamus Finnigan"],"The Weasleys are a large family of wizards.",1);
m(4,"Wizards","In which country is Hogwarts supposed to be located?","Scotland",["Wales","Ireland","England"],"Many scenes were filmed in the Scottish Highlands.",2);
m(4,"Galaxies","What is the name of Han Solo’s spaceship in Star Wars?","Millennium Falcon",["Death Star","X-Wing","Tantive IV"],"Han says it “made the Kessel Run in less than twelve parsecs”.",1);
m(4,"Galaxies","On which desert planet did Luke Skywalker grow up?","Tatooine",["Hoth","Endor","Naboo"],"Tatooine has two suns.",2);
m(4,"Galaxies","What is R2-D2’s golden droid friend called?","C-3PO",["BB-8","K-2SO","IG-88"],"C-3PO speaks over six million forms of communication.",1);
m(4,"Fantasy","Who is the “Mother of Dragons” in Game of Thrones?","Daenerys Targaryen",["Cersei Lannister","Sansa Stark","Arya Stark"],"She hatched three dragons named Drogon, Rhaegal and Viserion.",1);
m(4,"Fantasy","Which director made “The Lord of the Rings” film trilogy?","Peter Jackson",["Steven Spielberg","Guillermo del Toro","Ridley Scott"],"The three films were shot in New Zealand.",2);
m(4,"Cult hits","Which actor plays Captain Jack Sparrow in “Pirates of the Caribbean”?","Johnny Depp",["Orlando Bloom","Brad Pitt","Tom Cruise"],"Depp was nominated for an Oscar for the first film.",1);
m(4,"Cult hits","At what speed must the DeLorean travel to time travel in “Back to the Future”?","88 miles per hour",["66 miles per hour","100 miles per hour","120 miles per hour"],"Doc Brown’s DeLorean also needs 1.21 gigawatts of power.",3);
m(4,"Cult hits","In “The Big Bang Theory”, which character always says “Bazinga!”?","Sheldon Cooper",["Leonard Hofstadter","Howard Wolowitz","Raj Koothrappali"],"Jim Parsons won four Emmy Awards for playing Sheldon.",1);
m(4,"Cult hits","In “Forrest Gump”, what does his mother say life is like?","A box of chocolates",["A bowl of cherries","A long road","A river"],"“You never know what you’re gonna get.”",2);
vf(4,"The book “The Hobbit” was published before “The Lord of the Rings”.",true,"“The Hobbit” appeared in 1937 and “The Lord of the Rings” in 1954–55.",2);
vf(4,"The first Star Wars film was released in 1977.",true,"“Star Wars: A New Hope” premiered in May 1977.",2);

ty(3,"What is Captain America’s real name? (two words)",["Steve Rogers"],"Steve Rogers was a frail young man transformed into a super-soldier in World War II.",2);
ty(4,"Who is the headmaster of Hogwarts in the first books? (one word)",["Dumbledore","Albus Dumbledore"],"Albus Dumbledore is one of the most powerful wizards in the series.",1);

// ===== More questions =====
m(1,"Netflix","Which Netflix series from 2016 is set in 1980s Hawkins, Indiana?","Stranger Things",["Dark","The OA","Black Mirror"],"The Duffer brothers created the series.",1);
m(1,"Netflix","Which Spanish heist series on Netflix has characters wearing red jumpsuits and Dalí masks?","Money Heist",["Elite","Narcos","Sense8"],"Its Spanish title is La Casa de Papel.",1);
m(1,"Netflix","Which Netflix series features players competing in deadly children’s games for money?","Squid Game",["Alice in Borderland","The Platform","Hunger Games"],"Squid Game became Netflix’s most watched series in 2021.",1);
m(1,"Netflix","Which Netflix show follows a drug lord named Pablo Escobar?","Narcos",["Ozark","El Chapo","Peaky Blinders"],"Wagner Moura played Pablo Escobar.",2);
m(1,"Netflix","Which Netflix fantasy series stars Henry Cavill as Geralt of Rivia?","The Witcher",["Shadow and Bone","Arcane","Cursed"],"It is based on novels by Andrzej Sapkowski.",1);
m(1,"Netflix","Which Netflix series is a period drama about high society in Regency London?","Bridgerton",["The Crown","Downton Abbey","Outlander"],"It is based on books by Julia Quinn.",1);
m(1,"Netflix","Which Netflix miniseries features a chess prodigy named Beth Harmon?","The Queen’s Gambit",["Hacks","Beef","Maid"],"It came out in 2020 and made chess sets sell out.",2);
m(1,"Netflix","Which animated Netflix series is set in the League of Legends world?","Arcane",["Castlevania","Love Death & Robots","Blood of Zeus"],"Arcane won an Emmy for Outstanding Animated Program.",3);
m(1,"Netflix","What do viewers press to skip the opening credits of a Netflix show?","Skip Intro",["Fast forward","Next","Repeat"],"The Skip Intro button was introduced in 2017.",1);
vf(1,"Netflix started as a DVD-by-mail rental service.",true,"Netflix launched in 1997 and began streaming in 2007.",2);
vf(1,"Stranger Things is set in the 1990s.",false,"The first season is set in 1983.",1);
m(2,"Disney","Which Disney film features a girl named Mirabel and a magical house?","Encanto",["Coco","Moana","Raya"],"Encanto (2021) is set in Colombia.",1);
m(2,"Disney","Which Pixar film follows a young Mexican boy called Miguel in the Land of the Dead?","Coco",["Encanto","Soul","Luca"],"Coco was released in 2017.",1);
m(2,"Disney","Which Disney princess has a sea creature friend named Flounder?","Ariel",["Belle","Jasmine","Mulan"],"The Little Mermaid came out in 1989.",1);
m(2,"Disney","Which Disney film features the song “Let It Go”?","Frozen",["Tangled","Moana","Brave"],"Idina Menzel sang “Let It Go”.",1);
m(2,"Disney","Which Disney animated film features a prince named Eric?","The Little Mermaid",["Aladdin","Beauty and the Beast","Cinderella"],"Eric was voiced by Christopher Daniel Barnes.",2);
m(2,"Disney","Which Pixar film features a clownfish named Marlin looking for his son?","Finding Nemo",["Luca","Onward","Ratatouille"],"Dory is a regal blue tang.",1);
m(2,"Disney","Which Pixar film is about a rat who wants to be a chef in Paris?","Ratatouille",["Cars","Brave","Up"],"The rat is named Rémy.",1);
m(2,"Disney","Which Disney film features a boy raised by wolves, a bear called Baloo and a tiger named Shere Khan?","The Jungle Book",["Tarzan","Bambi","Lion King"],"The Jungle Book (1967) is based on Rudyard Kipling’s stories.",2);
m(2,"Disney","Which Disney+ series is set in the Star Wars universe and features a bounty hunter and Grogu?","The Mandalorian",["Andor","Ahsoka","The Acolyte"],"The Mandalorian premiered in 2019.",1);
m(2,"Disney","Which animated movie features an ogre who lives in a swamp and a talking donkey?","Shrek",["Madagascar","Kung Fu Panda","Ice Age"],"Shrek is from DreamWorks, not Disney.",1);
m(2,"Disney","Which Disney film is set in a fictional Polynesian island with a demigod called Maui?","Moana",["Lilo & Stitch","Pocahontas","Raya"],"Dwayne Johnson voiced Maui.",1);
m(2,"Pixar","In which Pixar film is the main character a 78-year-old man who ties balloons to his house?","Up",["Wall-E","Cars","Soul"],"Up (2009) opens with a famous montage of Carl and Ellie.",1);
m(3,"Marvel","Which Marvel hero is the god of thunder?","Thor",["Loki","Odin","Hulk"],"Chris Hemsworth plays Thor.",1);
m(3,"Marvel","Which Marvel superhero is also known as Peter Parker?","Spider-Man",["Daredevil","Ant-Man","Iron Man"],"Tom Holland plays Spider-Man in the MCU.",1);
m(3,"Marvel","Which Marvel film from 2019 ended the Infinity Saga?","Avengers: Endgame",["Infinity War","Captain Marvel","Black Widow"],"Endgame became the highest-grossing film at the time.",2);
m(3,"Marvel","Which Marvel villain collects Infinity Stones?","Thanos",["Ultron","Loki","Red Skull"],"Thanos was played by Josh Brolin.",1);
m(3,"DC","Which DC superhero is also known as Bruce Wayne?","Batman",["Superman","Flash","Green Lantern"],"Batman fights crime in Gotham City.",1);
m(3,"DC","Which DC hero is an Amazon princess named Diana?","Wonder Woman",["Supergirl","Batgirl","Catwoman"],"Gal Gadot plays her in the DCEU.",1);
m(3,"DC","Which DC hero’s weakness is kryptonite?","Superman",["Batman","Aquaman","Flash"],"Superman is from the planet Krypton.",1);
m(3,"DC","Which DC film from 2019 won an Oscar for Best Actor for Joaquin Phoenix?","Joker",["The Batman","Aquaman","Shazam!"],"Joker won two Oscars in 2020.",2);
m(3,"Marvel","Which Marvel hero is a soldier frozen in ice in World War II?","Captain America",["Iron Man","Hawkeye","Bucky Barnes"],"Chris Evans plays Steve Rogers.",1);
vf(3,"Spider-Man was created by Stan Lee and Steve Ditko.",true,"Spider-Man first appeared in 1962.",2);
vf(3,"Batman has superpowers.",false,"Batman has no superpowers; he relies on training and gadgets.",1);
m(4,"Cult","Which fantasy saga follows a ring that must be destroyed in Mount Doom?","The Lord of the Rings",["The Hobbit","Game of Thrones","Narnia"],"The books were written by J.R.R. Tolkien.",1);
m(4,"Cult","Which sci-fi series features the Millennium Falcon?","Star Wars",["Star Trek","Dune","Battlestar Galactica"],"Han Solo piloted the Millennium Falcon.",1);
m(4,"Cult","Which sci-fi series features the starship Enterprise?","Star Trek",["Star Wars","Alien","Firefly"],"Captain Kirk commanded the Enterprise.",1);
m(4,"Cult","Which sci-fi film series features a sandworm on the desert planet Arrakis?","Dune",["Star Wars","Avatar","Mad Max"],"Denis Villeneuve directed the 2021 and 2024 films.",2);
m(4,"Cult","Which time-travel film series features a DeLorean car?","Back to the Future",["Terminator","Looper","Interstellar"],"Marty McFly travels with Doc Brown.",1);
m(4,"Cult","Which 1982 sci-fi film features replicants and is set in Los Angeles in 2019?","Blade Runner",["Alien","Tron","Total Recall"],"Harrison Ford stars in Blade Runner.",3);
m(4,"Cult","Which horror film franchise features Freddy Krueger?","A Nightmare on Elm Street",["Friday the 13th","Halloween","Scream"],"Freddy has a glove with blades.",2);
m(4,"Cult","Which 2010 Christopher Nolan film is about dreams within dreams?","Inception",["Tenet","Interstellar","The Prestige"],"Leonardo DiCaprio starred in Inception.",1);
m(4,"Cult","Which 1994 film is based on a Stephen King story and set in Shawshank prison?","The Shawshank Redemption",["The Green Mile","Misery","Cell Block"],"It stars Tim Robbins and Morgan Freeman.",2);
vf(4,"The Matrix was released in 1999.",true,"The Wachowskis directed it.",1);
vf(4,"Harry Potter is set in a school called Beauxbatons.",false,"Harry attends Hogwarts; Beauxbatons is a French rival school.",2);
ty(2,"Which Pixar film features a rat chef in Paris? (one word)",["Ratatouille"],"Ratatouille came out in 2007.",1);
ty(3,"Which Marvel hero is Tony Stark? (two words)",["Iron Man"],"Tony Stark is played by Robert Downey Jr.",1);
ty(4,"Which wizard school is attended by Harry Potter? (one word)",["Hogwarts"],"Hogwarts is in Scotland.",1);

return {id:"screen",title:"Screen Time: Binge, Disney & Heroes",kw:"netflix series disney pixar marvel dc harry potter star wars squid game stranger things movies binge streaming tv quiz",subject:"Netflix hits, Disney, Marvel, Harry Potter and cult favourites: how much have you watched?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
