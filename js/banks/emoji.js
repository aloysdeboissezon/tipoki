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

return {id:"emoji",title:"Emoji Riddles",kw:"emoji riddles guess movie song artist emojis puzzle game fun tiktok",subject:"Guess the film, song, country or saying from a few emojis",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
