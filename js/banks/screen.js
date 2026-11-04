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

return {id:"screen",title:"Screen Time: Binge, Disney & Heroes",kw:"netflix series disney pixar marvel dc harry potter star wars squid game stranger things movies binge streaming tv quiz",subject:"Netflix hits, Disney, Marvel, Harry Potter and cult favourites: how much have you watched?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
