// Built-in bank: Emoji riddles (English). Guess the film, song, place or phrase from a few emojis.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard. No flag emojis (they do not show on Windows).
window.BANK_EMOJI=(function(){
const SESS={1:"Movies in emojis",2:"Songs & artists",3:"Places & foods",4:"Sayings & everyday life"};
const TAGS={1:"Movies",2:"Songs",3:"Places & food",4:"Sayings"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Movies in emojis =====================
m(1,"Disney","Which film is this? 🦁👑🌅","The Lion King",["Madagascar","Jungle Book","Tarzan"],"Simba, Mufasa and “The Circle of Life”: The Lion King (1994).",1);
m(1,"Disney","Which film is this? ❄️👸⛄","Frozen",["Tangled","Moana","Brave"],"Elsa, Anna and Olaf in Frozen (2013).",1);
m(1,"Thriller","Which film is this? 🦈🌊🏖️","Jaws",["Finding Nemo","The Meg","Piranha"],"Steven Spielberg’s 1975 shark blockbuster.",1);
m(1,"Romance","Which film is this? 🚢🧊💔","Titanic",["The Notebook","Pearl Harbor","Poseidon"],"Jack and Rose on the doomed ship, Titanic (1997).",1);
m(1,"Fantasy","Which film series is this? ⚡👓🧙‍♂️🦉","Harry Potter",["The Lord of the Rings","Percy Jackson","Fantastic Beasts"],"The lightning scar, round glasses and Hedwig the owl.",1);
m(1,"Superhero","Which hero is this? 🕷️🕸️🧑","Spider-Man",["Ant-Man","Daredevil","Venom"],"Peter Parker, bitten by a radioactive spider.",1);
m(1,"Superhero","Which hero is this? 🦇🌃🧔","Batman",["Superman","Black Panther","Nightwing"],"Bruce Wayne protects Gotham City at night.",1);
m(1,"Pixar","Which film is this? 🐠🔍🌊","Finding Nemo",["The Little Mermaid","Shark Tale","Luca"],"A clownfish father searches the ocean for his lost son (Pixar, 2003).",1);
m(1,"Pixar","Which film is this? 🤠🧸🚀","Toy Story",["Cars","Monsters, Inc.","Ratatouille"],"Woody and Buzz Lightyear, the first Pixar film (1995).",2);
m(1,"Pixar","Which film is this? 🐀👨‍🍳🥖","Ratatouille",["Stuart Little","The Secret Life of Pets","Paddington"],"Remy the rat who dreams of being a chef in Paris.",2);
m(1,"Pixar","Which film is this? 🎈🏠👴","Up",["Coco","Soul","Inside Out"],"An old man flies his house away with balloons.",2);
m(1,"Adventure","Which film is this? 🦖🧬🏝️","Jurassic Park",["King Kong","The Land Before Time","Godzilla"],"Dinosaurs cloned on an island park (1993).",1);
m(1,"Netflix","Which series is this? 🦑🔴⚪🎮","Squid Game",["Alice in Borderland","Money Heist","The Hunger Games"],"Players risk their lives in children’s games on Netflix (2021).",3);
m(1,"Netflix","Which series is this? 💰🎭🔴","Money Heist",["Narcos","Peaky Blinders","Lupin"],"La Casa de Papel: red jumpsuits and Dalí masks.",3);
m(1,"Fun","Which film is this? 👱‍♀️💗🏠","Barbie",["Legally Blonde","Clueless","Mean Girls"],"Greta Gerwig’s pink 2023 blockbuster.",1);
vf(1,"The emojis 🤖❤️🌱 describe the Pixar film WALL-E.",true,"A small robot falls in love and finds a plant on a deserted Earth.",2);

// ===================== 2. Songs & artists =====================
m(2,"Song","Which song is this? 👶🦈🎶","Baby Shark",["Under the Sea","Yellow Submarine","Shark Tale"],"The children’s song that became the most-viewed video on YouTube.",1);
m(2,"Song","Which song is this? ☔","Umbrella",["Rain on Me","Purple Rain","Singin’ in the Rain"],"Rihanna ft. Jay-Z, with its “ella, ella, eh, eh, eh” chorus (2007).",2);
m(2,"Song","Which song is this? 🎆🔥","Firework",["Fireflies","Girl on Fire","Burn"],"Katy Perry’s 2010 anthem.",1);
m(2,"Song","Which song is this? 🌻","Sunflower",["Yellow","Daisy","Roses"],"Post Malone and Swae Lee, from Spider-Man: Into the Spider-Verse.",3);
m(2,"Song","Which song is this? 💃👑","Dancing Queen",["Shake Your Body","Queen of the Night","Material Girl"],"ABBA’s 1976 hit, one of the most popular disco-pop songs ever.",1);
m(2,"Song","Which song is this? 🧛‍♀️🩸","Vampire",["Bad Guy","Monster","Heart-Shaped Box"],"Olivia Rodrigo, 2023.",2);
m(2,"Song","Which song is this? 🌃💡⚡","Blinding Lights",["Starboy","Levitating","Save Your Tears"],"The Weeknd, 2019.",2);
m(2,"Song","Which song is this? 🧟‍♂️🌕","Thriller",["Beat It","Bad","Smooth Criminal"],"Michael Jackson, with the legendary zombie dance.",1);
m(2,"Song","Which song is this? 💣💥","Dynamite",["Boom Boom Pow","Bang Bang","TNT"],"BTS’s first all-English single, which hit number one in the US in 2020.",2);
m(2,"Artist","Which artist is this? 🐝","Beyoncé",["Rihanna","Adele","Shakira"],"Fans of Beyoncé are called the BeyHive.",2);
m(2,"Artist","Which artist is this? 🐍","Taylor Swift",["Dua Lipa","Ariana Grande","Billie Eilish"],"A snake emoji became linked to Taylor Swift after her 2016 feud, which she then turned into the “Reputation” era.",3);

// ===================== 3. Places & foods =====================
m(3,"City","Which city is this? 🗼🥖🥐","Paris",["Lyon","Brussels","Montreal"],"Eiffel Tower, baguette and croissant.",1);
m(3,"City","Which city is this? 🗽🍎🚕","New York",["Chicago","Boston","Toronto"],"The Statue of Liberty, the Big Apple and a yellow cab.",1);
m(3,"City","Which city is this? 🕰️☔🎡","London",["Dublin","Edinburgh","Manchester"],"Big Ben and the rain; this one is easy.",1);
m(3,"Country","Which country is this? 🦘🐨🏄","Australia",["New Zealand","South Africa","Fiji"],"Kangaroos, koalas and surfers.",1);
m(3,"Country","Which country is this? 🍣🗻🌸","Japan",["South Korea","China","Thailand"],"Sushi, Mount Fuji and cherry blossoms.",1);
m(3,"Country","Which country is this? 🌮🌵💀","Mexico",["Spain","Peru","Cuba"],"Tacos, cactus and Day of the Dead.",1);
m(3,"Country","Which country is this? 🧀🌷🚲","The Netherlands",["Switzerland","Belgium","Denmark"],"Cheese, tulips and bicycles.",1);
m(3,"Country","Which country is this? 🍕🍝🛵","Italy",["Greece","Spain","Malta"],"Pizza, pasta and Vespas.",1);
m(3,"Food","Which dish is this? 🍚🥘🥩🦐","Paella",["Risotto","Biryani","Jambalaya"],"The rice dish from Valencia, Spain.",2);
m(3,"Food","Which snack is this? 🌽🔥🧈","Popcorn",["Corn on the cob","Nachos","Tortilla chips"],"Corn kernels that pop when heated.",1);
m(3,"Food","Which drink is this? ☕🍦","Affogato",["Iced latte","Cold brew","Frappuccino"],"An Italian dessert: ice cream “drowned” in a shot of hot espresso.",3);
m(3,"Place","Which place is this? 🐼🏯🧧","China",["Japan","Vietnam","Mongolia"],"Pandas, pagodas and red envelopes.",1);
vf(3,"The emojis 🥐🧀🍷 would suit a tour of France.",true,"Croissants, cheese and wine are classic French products.",1);

// ===================== 4. Sayings & everyday life =====================
m(4,"Saying","Which saying is this? 🌧️🐱🐶","It’s raining cats and dogs",["A cat has nine lives","Let the cat out of the bag","Dog days of summer"],"The saying means it is raining heavily.",1);
m(4,"Saying","Which saying is this? 🍰","A piece of cake",["Let them eat cake","Have your cake and eat it","Cherry on the cake"],"It means something is very easy.",1);
m(4,"Saying","Which saying is this? 🐘🛋️","The elephant in the room",["A memory like an elephant","White elephant","Pink elephants"],"It means an obvious problem that nobody wants to talk about.",2);
m(4,"Saying","Which saying is this? 🧊🔨","Break the ice",["Cold feet","Tip of the iceberg","Ice cold"],"It means to start a conversation in an awkward situation.",1);
m(4,"Saying","Which saying is this? 💰🌳🚫","Money doesn’t grow on trees",["The root of all evil","Time is money","Cash is king"],"It means money has to be earned, it does not come easily.",1);
m(4,"Saying","Which saying is this? 🐦🐦🪨","Kill two birds with one stone",["A bird in the hand","Birds of a feather","The early bird"],"It means to solve two problems with one action.",2);
m(4,"App","Which app is this? 👻🟡","Snapchat",["Whisper","Ghost","BeReal"],"The yellow app with the ghost logo.",1);
m(4,"App","Which brand is this? 🍎📱💻","Apple",["Samsung","Huawei","Dell"],"iPhone and Mac: Apple.",1);
m(4,"Brand","Which brand is this? 🎵🟢","Spotify",["Deezer","Shazam","SoundCloud"],"The green music-streaming app.",2);
m(4,"Brand","Which brand is this? 🍔🍟🟡","McDonald’s",["Burger King","KFC","Five Guys"],"The golden arches.",1);
m(4,"Daily life","Which word is this? 😡🍔","Hangry",["Hungry","Angry","Starving"],"Hangry is slang for hungry + angry: grumpy because you need food.",3);
vf(4,"The emoji 🙏 can mean both “thank you” and “please”.",true,"It is often used as two folded hands, high-five or a prayer.",2);

// ===================== Typed answers =====================
ty(1,"Which Disney film is this? 🧊👸⛄ (one word)",["Frozen"],"Elsa and Olaf in Frozen.",1);
ty(1,"Which Marvel hero is this? 🕷️🧑 (one or two words)",["Spider-Man","Spiderman","Spider man"],"Peter Parker is Spider-Man.",1);
ty(4,"Which fruit gave its name to a famous tech brand? 🍎 (one word)",["Apple"],"Apple was founded in 1976.",1);
ty(3,"Which city is this? 🗼🥖 (one word)",["Paris"],"The Eiffel Tower and the baguette.",1);
ty(3,"Which animal is this? 🐼 (one word)",["Panda","Giant panda"],"The panda is a symbol of China.",1);
ty(2,"Which artist has the BeyHive fans? 🐝 (one word)",["Beyoncé","Beyonce"],"The BeyHive is the name of Beyoncé’s fandom.",2);
ty(1,"Which Pixar film is this? 🚗⚡🏁 (one word)",["Cars"],"Lightning McQueen races in Cars (2006).",1);

// ===================== More questions (batch 2) =====================
m(1,"Fantasy","Which film series is this? 🧙‍♂️💍🌋","The Lord of the Rings",["The Chronicles of Narnia","Eragon","Willow"],"Gandalf, the One Ring and Mount Doom: Peter Jackson’s trilogy (2001–2003).",1);
m(1,"Animation","Which film is this? 🐼🥋🍜","Kung Fu Panda",["Madagascar","Zootopia","Ice Age"],"Po, a noodle-loving panda, becomes the Dragon Warrior (2008).",1);
m(1,"Disney","Which film is this? 🧞‍♂️🪔🐒","Aladdin",["The Jungle Book","Mulan","Pocahontas"],"The magic lamp, the Genie and Abu the monkey (1992).",1);
m(1,"Disney","Which film is this? 🧜‍♀️🐠🦀","The Little Mermaid",["Finding Nemo","Moana","Frozen"],"Ariel and Sebastian the crab sing “Under the Sea” (1989).",1);
m(1,"Disney","Which film is this? 🌹👹🕰️","Beauty and the Beast",["Cinderella","Sleeping Beauty","Tangled"],"The enchanted rose, the Beast and Cogsworth the clock (1991).",2);
m(1,"Disney","Which film is this? 🐘🎪👂","Dumbo",["Madagascar","The Jungle Book","Tarzan"],"The little elephant with huge ears who learns to fly (1941).",2);
m(1,"Adventure","Which film series is this? 🏴‍☠️🦜⚓","Pirates of the Caribbean",["Peter Pan","Treasure Island","Hook"],"Captain Jack Sparrow and the Black Pearl, starting in 2003.",1);
m(1,"Adventure","Which film is this? 🦍🏙️🏢","King Kong",["Planet of the Apes","Godzilla","Jumanji"],"The giant ape climbs the Empire State Building in the 1933 classic.",2);
m(1,"Family","Which film is this? 🏠👦🎄","Home Alone",["Elf","The Grinch","Jingle All the Way"],"Kevin McCallister defends his house from burglars (1990).",1);
m(1,"Sci-fi","Which film is this? 🕶️💊🐇","The Matrix",["Men in Black","Blade Runner","Tron"],"Take the red pill and follow the white rabbit (1999).",2);
m(1,"Sci-fi","Which film is this? 🚀👽🚲","E.T. the Extra-Terrestrial",["Close Encounters","Alien","Men in Black"],"Elliott and his alien friend fly across the moon on a bike (1982).",2);
m(1,"Family","Which film is this? 🎩🍫🏭","Charlie and the Chocolate Factory",["Matilda","The Grinch","Hook"],"Willy Wonka’s chocolate factory, from Roald Dahl’s book.",2);
m(1,"Thriller","Which classic film is this? 🔪🚿🏨","Psycho",["The Shining","Scream","Halloween"],"The shower scene at the Bates Motel is one of the most famous in cinema (1960).",3);
m(1,"Drama","Which film is this? 🐯🚣🌊","Life of Pi",["Cast Away","The Jungle Book","Moana"],"A boy survives at sea on a lifeboat with a Bengal tiger (2012).",3);

m(2,"Song","Which song is this? 💛🚢","Yellow Submarine",["Octopus’s Garden","Blue Moon","Sailing"],"The Beatles’ 1966 song: “We all live in a yellow submarine”.",1);
m(2,"Song","Which song is this? 💜🌧️","Purple Rain",["Black Velvet","Blue Monday","Pink Moon"],"Prince’s 1984 ballad and the title of his film.",1);
m(2,"Song","Which song is this? 🐌","Despacito",["Gasolina","Bailando","Mi Gente"],"“Despacito” means “slowly” in Spanish.",2);
m(2,"Song","Which song is this? 🕶️🐴💃","Gangnam Style",["Dynamite","Boombayah","Fantastic Baby"],"PSY’s horse-riding dance took over the internet in 2012.",1);
m(2,"Song","Which song is this? 🏨🌴☀️","Hotel California",["Sweet Home Alabama","Take It Easy","Margaritaville"],"The Eagles’ 1976 song: “You can check out any time you like, but you can never leave”.",2);
m(2,"Song","Which song is this? 🛣️😈🔥","Highway to Hell",["Back in Black","Thunderstruck","Paradise City"],"AC/DC’s 1979 rock anthem.",2);
m(2,"Song","Which song is this? 🪜☁️","Stairway to Heaven",["Kashmir","Whole Lotta Love","Hey Jude"],"Led Zeppelin’s 1971 epic, with a legendary guitar solo.",2);
m(2,"Song","Which song is this? ✈️🌙","Fly Me to the Moon",["Moon River","Blue Moon","Space Oddity"],"A jazz standard made famous by Frank Sinatra in 1964.",2);
m(2,"Song","Which song is this? 🌅🌞🎶","Here Comes the Sun",["Let It Be","Hey Jude","Come Together"],"George Harrison’s song on the Beatles’ album Abbey Road (1969).",2);
m(2,"Song","Which song is this? 🍉🍬","Watermelon Sugar",["Peaches","Strawberry Fields","Candy Shop"],"Harry Styles’ 2019 hit.",2);
m(2,"Song","Which song is this? 🧱","Another Brick in the Wall",["The Wall","Money","Time"],"Pink Floyd’s 1979 hit with the line “We don’t need no education”.",3);
m(2,"Song","Which song is this? 🌍🤝🎤","We Are the World",["Heal the World","Imagine","Live and Let Die"],"A 1985 charity single written by Michael Jackson and Lionel Richie for famine relief.",2);
m(2,"Artist","Which artist is this? 🐰😈","Bad Bunny",["J Balvin","Maluma","Rauw Alejandro"],"The Puerto Rican star often wears bunny-themed outfits and is one of Spotify’s most-streamed artists.",2);
m(2,"Artist","Which artist is this? 🧤👟🌙","Michael Jackson",["Prince","Justin Timberlake","Usher"],"The glove, the loafers and the moonwalk are his trademarks.",2);

m(3,"City","Which city is this? 🕌🌉🐈","Istanbul",["Cairo","Athens","Dubai"],"Mosques, the Bosphorus bridge and plenty of street cats.",2);
m(3,"City","Which city is this? 🌁🌉🚋","San Francisco",["Los Angeles","Seattle","Portland"],"Fog, the Golden Gate Bridge and cable cars.",2);
m(3,"City","Which city is this? 🚤🍝🎭","Venice",["Naples","Florence","Genoa"],"Canals, gondolas and the famous Carnival masks.",1);
m(3,"City","Which city is this? 🍺🥨🎡","Munich",["Vienna","Prague","Zurich"],"Home of the Oktoberfest beer festival every autumn.",2);
m(3,"City","Which city is this? 🏙️🏜️🏝️","Dubai",["Doha","Cairo","Riyadh"],"Skyscrapers, desert and man-made islands.",2);
m(3,"City","Which city is this? 🏛️🫒🌅","Athens",["Rome","Istanbul","Lisbon"],"The Acropolis, olive oil and Mediterranean sunsets.",2);
m(3,"Country","Which country is this? 🏔️🧀🕰️🍫","Switzerland",["Austria","Sweden","Norway"],"Mountains, cheese, watches and chocolate.",1);
m(3,"Country","Which country is this? 🐘🛕🍛","India",["Thailand","Sri Lanka","Indonesia"],"Elephants, temples and curry.",1);
m(3,"Country","Which country is this? 🐫🏜️🔺","Egypt",["Morocco","Saudi Arabia","Jordan"],"Camels, the desert and the pyramids of Giza.",1);
m(3,"Country","Which country is this? 🥩💃🧉","Argentina",["Chile","Uruguay","Colombia"],"Steak (asado), tango and mate tea.",2);
m(3,"Country","Which country is this? 🥝🏉🐑","New Zealand",["Australia","Ireland","South Africa"],"Kiwis, rugby and plenty of sheep.",1);
m(3,"Country","Which country is this? 🍁🏒🦫","Canada",["Sweden","Finland","Russia"],"Maple leaf, ice hockey and beavers.",1);
m(3,"Food","Which dish is this? 🥔🥚🧅","Spanish tortilla",["Paella","Gazpacho","Croquetas"],"Potatoes, eggs and onions, the classic Spanish omelette.",2);
m(3,"Food","Which food is this? 🥟🥢","Dumplings",["Spring rolls","Sushi","Ramen"],"Dumplings are eaten across Asia, often with chopsticks.",1);
m(3,"Food","Which spread is this? 🌰🍫🍞","Nutella",["Peanut butter","Marmite","Jam"],"Hazelnut and cocoa spread, made by the Italian company Ferrero.",1);
m(3,"Food","Which pizza is this? 🍕🍍","Hawaiian",["Margherita","Pepperoni","Four cheese"],"Pineapple on pizza divides the world.",1);

m(4,"Saying","Which saying is this? 🍎📅👨‍⚕️🚫","An apple a day keeps the doctor away",["Don’t cry over spilt milk","A rolling stone gathers no moss","Better late than never"],"A 19th-century proverb about healthy eating.",1);
m(4,"Saying","Which saying is this? 🥚🥚🧺☝️","Don’t put all your eggs in one basket",["The early bird catches the worm","Don’t count your chickens","Curiosity killed the cat"],"It means don’t risk everything on a single option.",1);
m(4,"Saying","Which saying is this? ⏰🐦🐛","The early bird catches the worm",["A bird in the hand is worth two in the bush","Birds of a feather flock together","A little bird told me"],"Those who start early have an advantage.",1);
m(4,"Saying","Which saying is this? 🐦👂💬","A little bird told me",["Birds of a feather flock together","Kill two birds with one stone","The early bird catches the worm"],"You use it when you don’t want to say who gave you the information.",2);
m(4,"Saying","Which saying is this? 🐴🎁👄🚫","Don’t look a gift horse in the mouth",["Hold your horses","Beat a dead horse","Straight from the horse’s mouth"],"Be grateful for a gift instead of checking its value; you can tell a horse’s age by its teeth.",3);
m(4,"Saying","Which saying is this? 🍋🍋🥤","When life gives you lemons, make lemonade",["The grass is greener on the other side","Every cloud has a silver lining","Easy come, easy go"],"It means turn bad situations into something positive.",2);
m(4,"Saying","Which saying is this? 🔥🤹","Playing with fire",["Burning the midnight oil","Fighting fire with fire","Where there’s smoke, there’s fire"],"It means doing something dangerous or risky.",2);
m(4,"Saying","Which saying is this? 🐝🕐💼","Busy as a bee",["Quiet as a mouse","Strong as an ox","Free as a bird"],"It describes someone who is always working hard.",2);
m(4,"App","Which app is this? 📷🌈","Instagram",["Snapchat","Pinterest","Flickr"],"The app shares photos and Reels, and its logo is a gradient camera.",1);
m(4,"App","Which app is this? ▶️🔴","YouTube",["Vimeo","Twitch","Netflix"],"The red play button is one of the world’s most recognised logos.",1);
m(4,"App","Which app is this? 💬🟢📞","WhatsApp",["Telegram","Signal","Line"],"A green logo with a phone and a speech bubble.",1);
m(4,"App","Which app is this? 🎮🟣📺","Twitch",["Discord","Steam","Kick"],"Gamers stream live on this purple platform.",2);
m(4,"Brand","Which streaming brand is this? 🔴🎬📺","Netflix",["Hulu","Disney+","HBO"],"The red N logo and its famous “ta-dum” sound.",1);

return {id:"emoji",title:"Emoji Riddles",kw:"emoji riddles guess movie song artist emojis puzzle game fun tiktok",subject:"Guess the film, song, country or saying from a few emojis",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
