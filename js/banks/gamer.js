// Built-in bank: Gamer & anime (English). Nintendo classics, modern hits, anime legends and gaming records.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_GAMER=(function(){
const SESS={1:"Nintendo & Pokémon",2:"Modern gaming hits",3:"Anime legends",4:"Consoles & gaming history"};
const TAGS={1:"Nintendo",2:"Modern games",3:"Anime",4:"History"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Nintendo & Pokémon =====================
m(1,"Mario","What is the name of Mario’s brother?","Luigi",["Wario","Toad","Yoshi"],"Luigi wears green; he first appeared in Mario Bros. (1983).",1);
m(1,"Mario","Who does Mario try to rescue from Bowser in most Super Mario games?","Princess Peach",["Princess Zelda","Princess Daisy","Princess Rosalina"],"She lives in the Mushroom Kingdom.",1);
m(1,"Mario","Which Japanese company created Mario?","Nintendo",["Sega","Sony","Capcom"],"Shigeru Miyamoto created Mario for Nintendo in 1981 (in Donkey Kong).",1);
m(1,"Mario","What job did Mario originally have in Donkey Kong?","Carpenter",["Plumber","Chef","Firefighter"],"He was called Jumpman and was a carpenter; he became a plumber in Mario Bros.",3);
m(1,"Zelda","In The Legend of Zelda, who is the hero you play?","Link",["Zelda","Ganon","Navi"],"Zelda is the princess, Link is the hero.",1);
m(1,"Zelda","What is the name of the kingdom in The Legend of Zelda?","Hyrule",["Mushroom Kingdom","Termina","Zebes"],"Hyrule is the land of the Triforce.",2);
m(1,"Pokémon","What type is Pikachu?","Electric",["Fire","Water","Normal"],"Pikachu evolves into Raichu.",1);
m(1,"Pokémon","How many Pokémon were in the original Generation 1 games?","151",["100","251","300"],"The first games, Pokémon Red and Green, came out in 1996 in Japan.",2);
m(1,"Pokémon","Which Pokémon does Ash Ketchum start with?","Pikachu",["Charmander","Bulbasaur","Squirtle"],"Ash is from Pallet Town.",1);
m(1,"Pokémon","Which game made Pokémon a worldwide AR craze in 2016?","Pokémon GO",["Pokémon Snap","Pokémon Sleep","Pokkén"],"Pokémon GO was made by Niantic.",1);
vf(1,"Pikachu evolves from Pichu.",true,"Pichu evolves into Pikachu, which evolves into Raichu.",2);
vf(1,"The Legend of Zelda games star Zelda as the playable hero.",false,"The hero is Link; Zelda is the princess.",1);

// ===================== 2. Modern gaming hits =====================
m(2,"Minecraft","Which company bought Minecraft in 2014 for $2.5 billion?","Microsoft",["Sony","Google","Apple"],"Minecraft was created by Markus “Notch” Persson and is now the best-selling game ever.",2);
m(2,"Minecraft","What is the explosive green monster in Minecraft called?","Creeper",["Zombie","Ghast","Slime"],"The creeper’s hiss is one of gaming’s most feared sounds.",1);
m(2,"Fortnite","Which company made Fortnite?","Epic Games",["Activision","Rockstar","Valve"],"Fortnite Battle Royale launched in 2017.",1);
m(2,"Fortnite","What is the in-game currency of Fortnite?","V-Bucks",["Robux","Coins","Gems"],"Robux is the currency in Roblox.",1);
m(2,"GTA","What fictional city is based on Los Angeles in Grand Theft Auto V?","Los Santos",["Vice City","Liberty City","San Fierro"],"GTA V (2013) is one of the best-selling games ever.",2);
m(2,"Among Us","In Among Us, what do you call the player who secretly sabotages?","The impostor",["The ghost","The killer","The hunter"],"Crewmates have to find the impostor.",1);
m(2,"Roblox","What is the currency in Roblox?","Robux",["V-Bucks","Gold","Minecoins"],"Roblox has hundreds of millions of monthly users.",2);
m(2,"FIFA","What was the football game FIFA renamed after EA and FIFA parted ways?","EA Sports FC",["Pro Evolution","eFootball","FC Ultimate"],"The first game under the new name was EA Sports FC 24.",2);
m(2,"Sims","What do Sims say in their made-up language?","Sul sul",["Hola hola","Bonjour","Wazzup"],"“Sul sul” is the Simlish greeting.",3);
m(2,"Animal Crossing","Which character in Animal Crossing loans you money to expand your house?","Tom Nook",["Isabelle","K.K. Slider","Blathers"],"Animal Crossing: New Horizons was a lockdown hit in 2020.",2);
m(2,"Elden Ring","Which fantasy author co-wrote the world of Elden Ring?","George R. R. Martin",["J. R. R. Tolkien","Brandon Sanderson","Patrick Rothfuss"],"The game is by the Japanese studio FromSoftware (2022).",3);
vf(2,"Minecraft is the best-selling video game of all time.",true,"It has sold over 300 million copies.",1);
vf(2,"Fortnite was made by Nintendo.",false,"Fortnite is made by Epic Games.",1);

// ===================== 3. Anime legends =====================
m(3,"Dragon Ball","Which move does Goku use to fire a big blue energy blast?","Kamehameha",["Rasengan","Chidori","Bankai"],"Kamehameha was taught by Master Roshi.",1);
m(3,"Dragon Ball","Who created Dragon Ball?","Akira Toriyama",["Eiichiro Oda","Masashi Kishimoto","Hayao Miyazaki"],"Akira Toriyama died in 2024.",2);
m(3,"Naruto","What is Naruto’s dream?","To become Hokage",["To become Pirate King","To become a Soul Reaper","To become a Pokémon Master"],"The Hokage is the leader of the Hidden Leaf Village.",1);
m(3,"One Piece","What is Luffy’s goal in One Piece?","To become King of the Pirates",["To find the Death Note","To defeat the Titans","To rescue his sister"],"His straw hat was a gift from Shanks.",1);
m(3,"One Piece","What power does Luffy have after eating the Gum-Gum Fruit?","A rubber body",["Fire","Invisibility","Flying"],"He can stretch his body like rubber.",2);
m(3,"Attack on Titan","What are the giant humanoid enemies in Attack on Titan called?","Titans",["Giants","Oni","Hollows"],"Eren Yeager joins the Survey Corps to fight them.",1);
m(3,"Death Note","What is the name of the shinigami who follows Light Yagami in Death Note?","Ryuk",["Rem","Misa","L"],"Ryuk loves apples.",2);
m(3,"Demon Slayer","What is Tanjiro’s demon sister called in Demon Slayer?","Nezuko",["Mitsuri","Kanao","Shinobu"],"Nezuko wears a bamboo muzzle.",1);
m(3,"My Hero Academia","What is the name of the number-one hero in My Hero Academia?","All Might",["Endeavor","Deku","Bakugo"],"He passes his power “One For All” to Deku.",2);
m(3,"Ghibli","Which Studio Ghibli film won the Oscar for Best Animated Feature in 2003?","Spirited Away",["Princess Mononoke","Howl’s Moving Castle","My Neighbor Totoro"],"Directed by Hayao Miyazaki.",2);
m(3,"Ghibli","Which Studio Ghibli character is the giant fluffy forest spirit with a big grin?","Totoro",["Kiki","Ponyo","No-Face"],"My Neighbor Totoro came out in 1988.",1);
vf(3,"Manga means Japanese comics and anime means Japanese animation.",true,"Many anime are adapted from manga.",1);
vf(3,"Naruto is a pirate.",false,"Naruto is a ninja; Luffy is the pirate.",1);

// ===================== 4. Consoles & gaming history =====================
m(4,"Consoles","Which company makes the PlayStation?","Sony",["Microsoft","Nintendo","Sega"],"The first PlayStation was released in Japan in 1994.",1);
m(4,"Consoles","Which company makes the Xbox?","Microsoft",["Sony","Nintendo","Atari"],"The original Xbox launched in 2001.",1);
m(4,"Consoles","Which Nintendo console can be used both docked and handheld, launched in 2017?","Nintendo Switch",["Wii U","Game Boy","3DS"],"A successor, Nintendo Switch 2, launched in 2025.",1);
m(4,"History","Which 1980 arcade game has a yellow character that eats dots and avoids ghosts?","Pac-Man",["Space Invaders","Donkey Kong","Pong"],"The four ghosts are Blinky, Pinky, Inky and Clyde.",1);
m(4,"History","Which block-stacking game was created in 1984 by Alexey Pajitnov?","Tetris",["Bejeweled","Candy Crush","Dr. Mario"],"Pajitnov made Tetris in the Soviet Union.",2);
m(4,"History","Who is Sega’s blue hedgehog mascot?","Sonic",["Crash","Spyro","Rayman"],"Sonic’s arch-enemy is Dr. Eggman (Robotnik).",1);
m(4,"History","Who is the green-armoured hero of the Halo series?","Master Chief",["Marcus Fenix","Cortana","Kratos"],"Halo was Xbox’s flagship franchise.",2);
m(4,"History","Which mobile game made by a Vietnamese developer was removed in 2014 despite being a huge hit?","Flappy Bird",["Angry Birds","Temple Run","Subway Surfers"],"Creator Dong Nguyen removed it because he felt it was too addictive.",3);
m(4,"History","Which Finnish company created Angry Birds?","Rovio",["King","Supercell","Mojang"],"Angry Birds launched in 2009.",3);
m(4,"History","Which company created League of Legends?","Riot Games",["Valve","Blizzard","Epic Games"],"Riot also made Valorant.",2);
m(4,"History","Which console introduced motion controls and Wii Sports in 2006?","Nintendo Wii",["PlayStation 3","Xbox 360","GameCube"],"The Wii appealed to non-gamers and families.",2);
vf(4,"Tetris was invented in Japan.",false,"Tetris was created in the Soviet Union by Alexey Pajitnov.",3);
vf(4,"Mario is a plumber.",true,"He and Luigi are plumbers from Brooklyn.",1);

// ===================== Typed answers =====================
ty(1,"Which Pokémon is Ash’s yellow partner? (one word)",["Pikachu"],"Pikachu is the mascot of Pokémon.",1);
ty(1,"What is Mario’s brother called? (one word)",["Luigi"],"Luigi first appeared in 1983.",1);
ty(2,"Which game has a currency called V-Bucks? (one word)",["Fortnite"],"Fortnite is made by Epic Games.",1);
ty(2,"What is the name of the blocky survival game with Creepers? (one word)",["Minecraft"],"Minecraft is the best-selling game ever.",1);
ty(3,"What is Naruto’s village? (two words)",["Hidden Leaf","Hidden Leaf Village","Konoha","Konohagakure"],"The Hidden Leaf Village is Konohagakure.",2);
ty(3,"Which studio made Spirited Away? (one word)",["Ghibli","Studio Ghibli"],"Studio Ghibli was founded in 1985.",2);
ty(4,"Which Italian plumber is Nintendo’s most famous mascot? (one word)",["Mario"],"Mario is the mascot of Nintendo.",1);

// ===================== More questions (batch 2) =====================
m(1,"Pokémon","Which Pokémon does Charmander evolve into first?","Charmeleon",["Charizard","Bulbasaur","Vulpix"],"Charmander evolves into Charmeleon, then into Charizard.",1);
m(1,"Pokémon","Which Kanto starter Pokémon is a Water type?","Squirtle",["Bulbasaur","Charmander","Pikachu"],"The three Kanto starters are Bulbasaur, Charmander and Squirtle.",1);
m(1,"Pokémon","What is the name of the Pokémon professor in Pallet Town?","Professor Oak",["Professor Elm","Professor Birch","Professor Rowan"],"He gives players their first Pokémon in Red, Blue and Yellow.",2);
m(1,"Pokémon","Which talking Pokémon is a member of Team Rocket’s trio?","Meowth",["Psyduck","Snorlax","Eevee"],"Meowth learned to talk to impress a female Pokémon.",2);
m(1,"Pokémon","The sleepy Pokémon that blocks paths and loves to eat is called…","Snorlax",["Slowpoke","Onix","Jigglypuff"],"Players often need a special flute to wake it up.",2);
m(1,"Pokémon","What does the word “Pokémon” originally mean?","Pocket Monsters",["Power Monsters","Poke Monsters","Picture Monsters"],"The Japanese name is “Poketto Monsutā”, shortened to Pokémon.",3);
m(1,"Nintendo","Which Nintendo hero is a round pink character who inhales enemies?","Kirby",["Yoshi","Toad","Pac-Man"],"Kirby copies his enemies’ powers after inhaling them.",1);
m(1,"Nintendo","What is the name of Mario’s green dinosaur friend?","Yoshi",["Bowser","Toad","Donkey Kong"],"Yoshi can eat enemies and flutter-jump.",1);
m(1,"Nintendo","Which character is Mario’s greedy yellow-clad rival?","Wario",["Waluigi","Bowser","Luigi"],"The name Wario combines “Mario” with the Japanese word “warui”, meaning bad.",2);
m(1,"Nintendo","Which Nintendo game features squid-kids that shoot colourful ink?","Splatoon",["Pikmin","ARMS","Kirby"],"Splatoon launched on the Wii U in 2015.",2);
m(1,"Nintendo","Which console launched in 2017 along with “The Legend of Zelda: Breath of the Wild”?","Nintendo Switch",["Wii U","Nintendo 3DS","Nintendo Wii"],"It has Joy-Con controllers that work in handheld and TV mode.",2);
vf(1,"Bowser is the main enemy in most Super Mario games.",true,"The king of the Koopas often kidnaps Princess Peach.",1);
vf(1,"Pikachu is number 25 in the Pokédex.",true,"Bulbasaur is number 1 and Mew is number 151.",3);

m(2,"Modern hits","Which game is football played with rocket-powered cars?","Rocket League",["Gran Turismo","Mario Kart","FIFA"],"It was a free game for PlayStation Plus in 2015 and exploded in popularity.",2);
m(2,"Modern hits","In “Fall Guys”, players…","Race through wacky obstacle courses as jelly-bean characters",["Build cities","Fight dragons","Solve murder mysteries"],"Players compete until one winner remains.",2);
m(2,"Modern hits","Which Japanese studio developed Elden Ring?","FromSoftware",["Capcom","Square Enix","Konami"],"FromSoftware is also known for Dark Souls, Bloodborne and Sekiro.",2);
m(2,"Modern hits","Which game won Game of the Year at The Game Awards in 2023?","Baldur’s Gate 3",["Zelda: Tears of the Kingdom","Alan Wake 2","Spider-Man 2"],"Larian Studios’ role-playing game won many other awards.",3);
m(2,"Modern hits","Genshin Impact was developed by which Chinese studio?","miHoYo",["Tencent","NetEase","Perfect World"],"The free-to-play game made billions of dollars on mobile and PC.",3);
m(2,"Modern hits","Stardew Valley, a farming game, was made almost entirely by…","One developer, Eric Barone",["A team of 500","A school in Japan","The Minecraft team"],"Barone, known as ConcernedApe, spent over four years on the game.",3);
m(2,"Terms","In gaming, what does RPG stand for?","Role-playing game",["Rapid play game","Rocket-propelled grenade","Real person gaming"],"Examples include Final Fantasy, The Witcher and Skyrim.",1);
m(2,"Terms","In gaming, what does NPC stand for?","Non-player character",["New player club","No points counted","Next player choice"],"NPCs are characters controlled by the game, not by players.",1);
m(2,"Terms","In gaming, “FPS” as a genre stands for…","First-person shooter",["Fast player speed","Final points score","Free play session"],"Call of Duty and Counter-Strike are first-person shooters.",1);
m(2,"Terms","In gaming, MMO stands for…","Massively multiplayer online",["Multi-mission operation","Mega mobile option","Minimum move order"],"World of Warcraft is a classic MMO.",2);
m(2,"Terms","What does it mean to “respawn” in a game?","To come back to life after dying",["To save the game","To change character","To buy an item"],"Many shooters let you respawn at a set location after a short delay.",1);
vf(2,"Fortnite is free to play.",true,"Fortnite earns money by selling cosmetics like skins and emotes.",1);
vf(2,"Minecraft was created by Markus “Notch” Persson.",true,"He released early versions in 2009 and sold the company to Microsoft in 2014.",2);
vf(2,"Most games on Roblox are made by other players.",true,"Roblox provides tools so millions of users can build and publish their own games.",1);

m(3,"Anime","What does the Japanese word “otaku” mean in the context of anime?","An obsessive fan",["A samurai","A cartoonist","A rice farmer"],"The word can be negative in Japan but is a proud label for many fans abroad.",2);
m(3,"Anime","In anime, a “senpai” is…","A senior or mentor",["A younger sibling","An enemy","A teacher’s pet"],"Juniors use “senpai” to address people who are older or more experienced.",2);
m(3,"Anime","What alien race is Goku from Dragon Ball?","Saiyan",["Namekian","Majin","Human"],"Goku was sent to Earth as a baby from planet Vegeta.",1);
m(3,"Anime","Who is Naruto’s main rival and best friend?","Sasuke Uchiha",["Kakashi Hatake","Gaara","Itachi Uchiha"],"Their clash ends the series, in the Valley of the End.",2);
m(3,"Anime","Fullmetal Alchemist is based on which basic principle?","Equivalent exchange",["An eye for an eye","Survival of the fittest","Divide and conquer"],"To gain something, alchemists must give up something of equal value.",2);
m(3,"Anime","Which anime heroine fights evil “in the name of the Moon”?","Sailor Moon",["Cardcaptor Sakura","Magic Knight Rayearth","Pretty Cure"],"Usagi Tsukino became a global icon in the 1990s.",1);
m(3,"Anime","Which anime features Saitama, a hero who defeats enemies with a single punch?","One Punch Man",["Mob Psycho 100","Dr. Stone","Fire Force"],"The joke is that he is so strong that fights bore him.",1);
m(3,"Anime","In “Spy x Family”, what special power does little Anya have?","She can read minds",["She can fly","She is invisible","She has super strength"],"Anya’s telepathy helps her parents without them knowing.",1);
m(3,"Anime","In “Jujutsu Kaisen”, Yuji Itadori gains powers by swallowing…","A cursed finger",["A magic stone","A demon’s heart","A sacred scroll"],"The finger belongs to the powerful curse Sukuna.",3);
m(3,"Ghibli","Who directed Spirited Away?","Hayao Miyazaki",["Isao Takahata","Makoto Shinkai","Mamoru Hosoda"],"Miyazaki co-founded Studio Ghibli in 1985.",2);
m(3,"Ghibli","Which Studio Ghibli film features a young witch who delivers parcels on a broomstick?","Kiki’s Delivery Service",["Spirited Away","Ponyo","Princess Mononoke"],"Kiki and her black cat Jiji set up a delivery business in a seaside town.",2);
m(3,"Culture","What is “cosplay”?","Dressing up as a character from anime, games or films",["A type of video game","A Japanese tea ceremony","A sport"],"The word combines “costume” and “play”.",1);
vf(3,"One Piece is one of the best-selling manga series of all time.",true,"More than 500 million copies have been sold.",2);
vf(3,"Studio Ghibli was founded in 1985.",true,"It was created by Hayao Miyazaki, Isao Takahata and Toshio Suzuki.",3);

m(4,"History","Which company made the Dreamcast console?","Sega",["Sony","Nintendo","Atari"],"The Dreamcast launched in 1998 and was Sega’s final console.",2);
m(4,"History","Which simple tennis-like game from Atari became a hit in 1972?","Pong",["Breakout","Space Invaders","Asteroids"],"Pong helped to start the video-game industry.",2);
m(4,"History","In which year was the original Super Mario Bros. released?","1985",["1981","1990","1993"],"It was released on the Nintendo Entertainment System in Japan in 1985.",2);
m(4,"History","In which year was the Nintendo Switch released?","2017",["2015","2019","2020"],"It sold over 100 million units in under six years.",2);
m(4,"History","In which year was the PlayStation 5 released?","2020",["2018","2021","2022"],"It launched in November 2020, during the pandemic.",2);
m(4,"History","Which game was bundled with the original Game Boy in 1989?","Tetris",["Pac-Man","Pokémon Red","Super Mario Land"],"The bundle sold millions of consoles.",2);
m(4,"History","Who is Sonic the Hedgehog’s main enemy?","Dr. Robotnik (Eggman)",["Bowser","Ganon","Wario"],"Dr. Eggman wants to take over the world with his robots.",2);
m(4,"Industry","Ubisoft, the creator of Assassin’s Creed, is from which country?","France",["Japan","Canada","United States"],"Ubisoft was founded in Brittany in 1986.",2);
m(4,"Industry","The Witcher 3 was developed by CD Projekt Red, which is from which country?","Poland",["Czech Republic","Finland","Germany"],"The game launched in 2015 and won over 250 awards.",3);
m(4,"Industry","Which Dota 2 tournament is known for having the world’s biggest esports prize pools?","The International",["Worlds","Evo","Blast Premier"],"Prize pools passed $40 million in 2021.",3);
m(4,"Industry","Which German city hosts the Gamescom video game fair every August?","Cologne",["Berlin","Munich","Hamburg"],"Gamescom is Europe’s biggest games event.",3);
vf(4,"Pac-Man was created in Japan.",true,"Namco released Pac-Man in 1980 and Toru Iwatani designed it.",2);
vf(4,"The original PlayStation began as a failed partnership between Sony and Nintendo.",true,"Sony then developed its own console and launched it in 1994.",3);
vf(4,"Sega once made home video game consoles.",true,"The Master System, Mega Drive and Dreamcast were Sega consoles.",1);

ty(1,"Which pink Pokémon can sing you to sleep? (one word)",["Jigglypuff"],"Jigglypuff’s lullaby puts everybody to sleep, then it draws on faces.",2);
ty(4,"Which company created the Game Boy? (one word)",["Nintendo"],"The Game Boy launched in 1989 and made handheld gaming mainstream.",1);

// ===== More questions =====
m(1,"Nintendo","Which character is the princess Mario usually rescues?","Princess Peach",["Princess Zelda","Princess Daisy","Rosalina"],"Peach is captured by Bowser in most games.",1);
m(1,"Nintendo","Which Nintendo game series features a hero named Link?","The Legend of Zelda",["Metroid","Kid Icarus","Fire Emblem"],"Link is the hero; Zelda is the princess.",1);
m(1,"Pokémon","Which Pokémon evolves from Charmander?","Charmeleon",["Charizard","Bulbasaur","Squirtle"],"Charmeleon evolves into Charizard.",2);
m(1,"Pokémon","Which Pokémon is a sleepy, large, blue-green bear-like creature that blocks roads?","Snorlax",["Slowpoke","Ursaring","Munchlax"],"Snorlax sleeps most of the day.",2);
m(1,"Nintendo","Which Nintendo game lets you adopt villagers, catch fish and pay off a raccoon’s loan?","Animal Crossing",["Stardew Valley","Harvest Moon","Splatoon"],"Animal Crossing: New Horizons boomed in 2020.",1);
vf(1,"Mario was originally called Jumpman.",true,"Mario first appeared in Donkey Kong (1981) as Jumpman.",2);
vf(1,"Pikachu evolves from Raichu.",false,"Pikachu evolves into Raichu.",1);
m(2,"Games","Which game has players build with blocks in a world made of cubes?","Minecraft",["Roblox","Terraria","Lego Worlds"],"Minecraft is the best-selling video game of all time.",1);
m(2,"Games","Which battle royale game has a map with named areas like Tilted Towers?","Fortnite",["PUBG","Apex Legends","Call of Duty: Warzone"],"Fortnite launched in 2017.",1);
m(2,"Games","Which game features a heroine named Ellie in a post-apocalyptic world?","The Last of Us",["Horizon Zero Dawn","Days Gone","Uncharted"],"The Last of Us was adapted into an HBO series.",2);
m(2,"Games","In which game do you play as a monster hunter called Geralt?","The Witcher 3",["Skyrim","Dragon Age","Elden Ring"],"The Witcher 3 was released in 2015.",2);
m(2,"Games","Which open-world game is set in the Wild West with Arthur Morgan?","Red Dead Redemption 2",["Grand Theft Auto V","Cyberpunk 2077","Far Cry 6"],"It was released by Rockstar in 2018.",2);
m(2,"Games","Which game made by FromSoftware is known for its difficulty and the phrase “You died”?","Dark Souls",["Skyrim","Bloodborne","Hollow Knight"],"Dark Souls inspired the “Soulslike” genre.",2);
m(2,"Games","Which 2020 indie game features a hell-escaping prince named Zagreus?","Hades",["Celeste","Hollow Knight","Cuphead"],"Hades won several Game of the Year awards.",3);
m(2,"Games","Which game series features Master Chief?","Halo",["Gears of War","Destiny","Mass Effect"],"Halo is an Xbox franchise.",2);
m(2,"Games","Which football simulation game series is made by EA?","FIFA / EA Sports FC",["Pro Evolution Soccer","Madden NFL","NBA 2K"],"EA Sports FC replaced the FIFA title in 2023.",2);
m(2,"Games","Which free-to-play game lets players plant bombs and defuse them in a team shooter, from Riot Games?","Valorant",["Counter-Strike 2","Overwatch","Rainbow Six Siege"],"Valorant launched in 2020.",3);
vf(2,"Fortnite was created by Epic Games.",true,"Epic Games also created Unreal Engine.",1);
vf(2,"Minecraft was created by Valve.",false,"Minecraft was created by Markus “Notch” Persson and sold to Microsoft in 2014.",2);
m(3,"Anime","Which anime features a boy named Goku?","Dragon Ball",["Naruto","One Piece","Bleach"],"Dragon Ball was created by Akira Toriyama.",1);
m(3,"Anime","Which anime follows a young boy named Luffy who wants to become the Pirate King?","One Piece",["Fairy Tail","Hunter x Hunter","Bleach"],"One Piece is among the best-selling manga series.",1);
m(3,"Anime","Which anime features titans attacking a walled city?","Attack on Titan",["Demon Slayer","Tokyo Ghoul","Fullmetal Alchemist"],"It was created by Hajime Isayama.",1);
m(3,"Anime","Which Studio Ghibli film features a girl who works in a bathhouse for spirits?","Spirited Away",["My Neighbor Totoro","Howl’s Moving Castle","Princess Mononoke"],"Spirited Away won the Oscar for Best Animated Feature in 2003.",1);
m(3,"Anime","Which anime features a boy with a scar who sells charcoal and fights demons to save his sister?","Demon Slayer",["Jujutsu Kaisen","Dr. Stone","My Hero Academia"],"The protagonist is Tanjiro Kamado.",1);
m(3,"Anime","Which anime features a notebook that kills anyone whose name is written in it?","Death Note",["Code Geass","Monster","Steins;Gate"],"The main character is Light Yagami.",2);
m(3,"Anime","Which anime features a student who can use Quirks to become a hero?","My Hero Academia",["Naruto","Bleach","Tokyo Revengers"],"The main hero is Izuku Midoriya.",2);
m(3,"Anime","Which animated creature is the mascot of Studio Ghibli?","Totoro",["Pikachu","Doraemon","Hello Kitty"],"Totoro appears in the Ghibli logo.",1);
m(3,"Anime","What is the name of the Japanese comics that anime is often based on?","Manga",["Kabuki","Haiku","Ukiyo-e"],"Manga is read from right to left.",1);
vf(3,"Pokémon is based on an anime series first.",false,"Pokémon started as a video game in 1996, then the anime.",2);
m(4,"History","Which company created Sonic the Hedgehog?","Sega",["Nintendo","Atari","Capcom"],"Sonic debuted in 1991.",1);
m(4,"History","Which 1972 arcade game is considered the first commercially successful video game?","Pong",["Pac-Man","Space Invaders","Tetris"],"Pong was made by Atari.",2);
m(4,"History","Which Russian-designed puzzle game is about falling blocks?","Tetris",["Columns","Bejeweled","Dr. Mario"],"Tetris was created by Alexey Pajitnov in 1984.",1);
m(4,"History","Which handheld console launched in 1989 with Tetris?","Game Boy",["Game Gear","Lynx","Neo Geo Pocket"],"Game Boy was created by Nintendo.",2);
m(4,"History","Which Nintendo console was released in 2006 with motion controls?","Wii",["Wii U","GameCube","DS"],"The Wii sold over 100 million units.",1);
m(4,"History","Which Sega console was Sega’s last, released in 1998?","Dreamcast",["Saturn","Genesis","Game Gear"],"Sega stopped making consoles in 2001.",3);
m(4,"History","Which global gaming event is held yearly in Los Angeles to show upcoming games?","E3",["Gamescom","PAX","BlizzCon"],"E3 was cancelled permanently in 2023.",3);
vf(4,"The Nintendo Entertainment System came out in the 1980s.",true,"The NES launched in 1983 in Japan and 1985 in the US.",2);
vf(4,"Sony made the Nintendo 64.",false,"Nintendo made the N64.",1);
ty(1,"Which plumber is the mascot of Nintendo? (one word)",["Mario"],"Mario first appeared in 1981.",1);
ty(2,"Which game sold the most copies of all time, built with blocks? (one word)",["Minecraft"],"Minecraft passed 300 million copies sold.",1);

return {id:"gamer",title:"Gamer & Anime Challenge",kw:"gaming gamer anime manga mario pokemon zelda minecraft fortnite naruto one piece dragon ball nintendo playstation quiz",subject:"Mario, Pokémon, Minecraft, Fortnite and anime legends: are you a real gamer?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
