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
m(1,"Pokémon","What do you throw to catch a Pokémon?","A Poké Ball",["A net","A rope","A cage"],"Poké Balls come in several types.",1);
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

return {id:"gamer",title:"Gamer & Anime Challenge",kw:"gaming gamer anime manga mario pokemon zelda minecraft fortnite naruto one piece dragon ball nintendo playstation quiz",subject:"Mario, Pokémon, Minecraft, Fortnite and anime legends: are you a real gamer?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
