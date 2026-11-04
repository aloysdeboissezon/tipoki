// Built-in bank: Pop hits & music stars (English). Pop royalty, name the artist, records, decades.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for music nerds).
window.BANK_HITS=(function(){
const SESS={1:"Pop royalty",2:"Who sings it?",3:"Records & fun facts",4:"Hits through the decades"};
const TAGS={1:"Royalty",2:"Who sings it?",3:"Records",4:"Decades"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Pop royalty =====================
m(1,"Nickname","Who is known as the “King of Pop”?","Michael Jackson",["Elvis Presley","Prince","Justin Timberlake"],"Michael Jackson’s Thriller (1982) is the best-selling album of all time.",1);
m(1,"Nickname","Who is known as the “Queen of Pop”?","Madonna",["Beyoncé","Cher","Whitney Houston"],"Madonna has been called the Queen of Pop since the 1980s.",1);
m(1,"Nickname","Who is known as the “King of Rock and Roll”?","Elvis Presley",["Chuck Berry","Jerry Lee Lewis","Little Richard"],"Elvis Presley, from Memphis, Tennessee.",1);
m(1,"Stage name","Which pop star’s real name is Stefani Germanotta?","Lady Gaga",["Katy Perry","Lorde","Sia"],"Lady Gaga took her name from the Queen song “Radio Ga Ga”.",2);
m(1,"Stage name","Which singer’s real name is Peter Gene Hernandez?","Bruno Mars",["Pitbull","Ricky Martin","Drake"],"Bruno Mars was born in Honolulu, Hawaii.",3);
m(1,"Origins","Which singer is from the island of Barbados?","Rihanna",["Beyoncé","Nicki Minaj","Alicia Keys"],"Robyn Rihanna Fenty was born in Saint Michael, Barbados.",2);
m(1,"Origins","Which singer from Colombia sang “Hips Don’t Lie” and “Waka Waka”?","Shakira",["Jennifer Lopez","Thalía","Karol G"],"Shakira performed “Waka Waka” at the 2010 FIFA World Cup in South Africa.",1);
m(1,"Origins","Which Puerto Rican artist is one of the world’s most streamed?","Bad Bunny",["J Balvin","Maluma","Ozuna"],"Bad Bunny was Spotify’s most-streamed artist for several years in a row.",1);
m(1,"Origins","Which singer from Barcelona won over fans with “Malamente” and the album Motomami?","Rosalía",["Aitana","Shakira","Amaia"],"Rosalía mixes flamenco with urban music; Motomami came out in 2022.",2);
m(1,"Band","Which band was Harry Styles in before going solo?","One Direction",["Backstreet Boys","The Wanted","Jonas Brothers"],"One Direction was formed on The X Factor UK in 2010.",1);
m(1,"Band","Which K-pop group sang “Dynamite” and “Butter”?","BTS",["Blackpink","Stray Kids","Twice"],"BTS has seven members and a fan base called ARMY.",1);
m(1,"Albums","Adele names her albums after…","Her age when she wrote them",["Her birthplace","Her favourite numbers","Her lucky days"],"19, 21, 25 and 30.",2);
vf(1,"Taylor Swift’s Eras Tour became the highest-grossing concert tour of all time.",true,"It earned over $2 billion between 2023 and 2024.",2);
vf(1,"Beyoncé has won more Grammy Awards than any other artist.",true,"She holds the record for most Grammys won.",2);

// ===================== 2. Who sings it? =====================
m(2,"Hit","Who sings “Bad Guy”?","Billie Eilish",["Dua Lipa","Olivia Rodrigo","Lorde"],"Billie Eilish’s 2019 hit won a Grammy for Record of the Year.",1);
m(2,"Hit","Who sings “Shape of You”?","Ed Sheeran",["Shawn Mendes","Sam Smith","Harry Styles"],"The 2017 song was one of the most streamed of all time.",1);
m(2,"Hit","Who sings “Rolling in the Deep”?","Adele",["Amy Winehouse","Lana Del Rey","Florence Welch"],"It came out in 2010, on the album 21.",1);
m(2,"Hit","Who sings “Levitating”?","Dua Lipa",["Ariana Grande","Doja Cat","Charli XCX"],"Levitating is from the 2020 album Future Nostalgia.",1);
m(2,"Hit","Who sings “Blinding Lights”?","The Weeknd",["Drake","Bruno Mars","Post Malone"],"One of the most streamed songs ever on Spotify.",1);
m(2,"Hit","Who sings “Anti-Hero”?","Taylor Swift",["Selena Gomez","Lana Del Rey","Sabrina Carpenter"],"From the 2022 album Midnights.",1);
m(2,"Hit","Who sings “Despacito” with Luis Fonsi?","Daddy Yankee",["Maluma","Pitbull","J Balvin"],"Despacito became the most-viewed YouTube video in 2017.",1);
m(2,"Hit","Who sings “Uptown Funk” with Mark Ronson?","Bruno Mars",["Pharrell Williams","John Legend","Justin Timberlake"],"It spent 14 weeks at number one in the US in 2015.",2);
m(2,"Hit","Who sings “Umbrella” (2007)?","Rihanna",["Beyoncé","Katy Perry","Kelly Clarkson"],"The song features Jay-Z and was one of the biggest hits of 2007.",2);
m(2,"Hit","Which band sings “Bohemian Rhapsody”?","Queen",["The Beatles","The Rolling Stones","Led Zeppelin"],"Freddie Mercury wrote the six-minute song in 1975.",1);
m(2,"Hit","Who sings “Flowers” (2023), a song about loving yourself?","Miley Cyrus",["Selena Gomez","Lizzo","SZA"],"It reached number one in the US in 2023.",2);
vf(2,"Ariana Grande sang “Thank U, Next”.",true,"It came out in 2018 and gently referenced her ex-boyfriends.",1);
vf(2,"“Shake It Off” was sung by Katy Perry.",false,"It is a Taylor Swift song from the 2014 album 1989.",1);

// ===================== 3. Records & fun facts =====================
m(3,"Record","Which is the best-selling album of all time?","Thriller by Michael Jackson",["Back in Black by AC/DC","The Dark Side of the Moon by Pink Floyd","Rumours by Fleetwood Mac"],"Thriller is estimated to have sold around 70 million copies worldwide.",2);
m(3,"Record","Which Latin song was the first video to pass 5 billion views on YouTube?","Despacito",["Gasolina","Mi Gente","Dákiti"],"Luis Fonsi and Daddy Yankee’s Despacito was the first to reach 5 billion views.",3);
m(3,"Record","Which rapper’s song “Old Town Road” spent 19 weeks at number one in the US?","Lil Nas X",["Drake","Travis Scott","Post Malone"],"At the time it set a record for the longest stay at number one.",2);
m(3,"Fun fact","Which pop star was discovered on YouTube at 13?","Justin Bieber",["Shawn Mendes","Charlie Puth","Troye Sivan"],"Scooter Braun found him by chance in 2007.",1);
m(3,"Fun fact","Which pop star began on the Disney Channel in “Hannah Montana”?","Miley Cyrus",["Selena Gomez","Demi Lovato","Zendaya"],"Miley Cyrus played Miley Stewart / Hannah Montana from 2006 to 2011.",1);
m(3,"Fun fact","What does Spotify show at the end of every year?","Wrapped",["Replay","Recap","Rewind"],"Spotify Wrapped is a hugely popular yearly social media trend.",1);
m(3,"Fun fact","Which streaming platform has a green logo?","Spotify",["Deezer","Apple Music","Tidal"],"Spotify was founded in Stockholm in 2006.",1);
m(3,"Fun fact","Which band wrote “Don’t Stop Believin’”?","Journey",["Bon Jovi","Toto","Boston"],"The 1981 song became popular again thanks to Glee and The Sopranos.",3);
m(3,"Fun fact","At which festival does Beyoncé’s 2018 performance get called “Beychella”?","Coachella",["Glastonbury","Tomorrowland","Lollapalooza"],"Her performance in 2018 was later released as the film Homecoming.",2);
m(3,"Fun fact","Which Swedish group wrote “Dancing Queen”?","ABBA",["Roxette","Ace of Base","Europe"],"ABBA won Eurovision in 1974 with “Waterloo”.",1);
vf(3,"Drake is Canadian.",true,"Drake was born in Toronto.",1);
vf(3,"The Beatles were from Liverpool.",true,"They formed in Liverpool in 1960.",1);

// ===================== 4. Hits through the decades =====================
m(4,"1980s","Which Norwegian band sang “Take On Me” (1985)?","a-ha",["Roxette","Europe","Alphaville"],"The video mixed live-action and pencil-sketch animation.",2);
m(4,"1980s","Whose 1983 song and video was “Billie Jean”?","Michael Jackson",["Prince","Lionel Richie","Stevie Wonder"],"The song topped the charts around the world in 1983.",2);
m(4,"1990s","Which British group sang “Wannabe” in 1996?","Spice Girls",["Girls Aloud","All Saints","Little Mix"],"Spice Girls’ debut single hit number one in 37 countries.",1);
m(4,"1990s","Which Spanish duo made the “Macarena” a global hit in 1996?","Los del Río",["Gipsy Kings","Las Ketchup","Estopa"],"It was number one in the US for 14 weeks.",2);
m(4,"1990s","Which singer shot to fame in 1998 with “…Baby One More Time”?","Britney Spears",["Christina Aguilera","Jessica Simpson","Mandy Moore"],"The Catholic-schoolgirl video made her an instant star.",1);
m(4,"1990s","Which grunge band had the 1991 hit “Smells Like Teen Spirit”?","Nirvana",["Pearl Jam","Soundgarden","Foo Fighters"],"Kurt Cobain was the lead singer.",1);
m(4,"2000s","Who sang “Hey Ya!” (2003)?","OutKast",["Nelly","Usher","Pharrell Williams"],"OutKast’s André 3000 and Big Boi are from Atlanta.",3);
m(4,"2010s","Which South Korean rapper’s 2012 “Gangnam Style” was a worldwide dance craze?","Psy",["G-Dragon","Rain","Jay Park"],"It was the first YouTube video to reach 1 billion views.",1);
m(4,"2010s","Which song is “Happy” (2013) by?","Pharrell Williams",["Bruno Mars","John Legend","Justin Timberlake"],"It was nominated for an Oscar for Despicable Me 2.",2);
m(4,"2020s","Which singer’s 2022 song is “As It Was”?","Harry Styles",["Ed Sheeran","Shawn Mendes","Niall Horan"],"It was the most streamed song of 2022 on Spotify.",2);
m(4,"2020s","Which singer released the 2023 song “Vampire” about a toxic relationship?","Olivia Rodrigo",["Billie Eilish","Sabrina Carpenter","Gracie Abrams"],"The song came from the album Guts.",2);
vf(4,"“Mambo No. 5” was a hit in 1999.",true,"Lou Bega’s Mambo No. 5 topped charts across Europe in 1999.",3);
vf(4,"The song “Livin’ la Vida Loca” was sung by Ricky Martin.",true,"It came out in 1999 and helped start the Latin pop boom.",2);

// ===================== Typed answers =====================
ty(1,"Who is the “King of Pop”? (surname)",["Jackson","Michael Jackson"],"Michael Jackson was nicknamed the King of Pop.",1);
ty(2,"Which band sang “Bohemian Rhapsody”? (one word)",["Queen"],"Freddie Mercury was Queen’s lead singer.",1);
ty(2,"Who sang “Shake It Off”? (two words)",["Taylor Swift"],"Shake It Off is from the album 1989.",1);
ty(2,"Which singer’s albums are called 19, 21, 25 and 30? (one word)",["Adele"],"Adele names her albums after her age.",2);
ty(4,"Which girl group sang “Wannabe”? (two words)",["Spice Girls","The Spice Girls"],"Wannabe came out in 1996.",1);
ty(1,"Which K-pop group has the fan base called ARMY? (three letters)",["BTS"],"BTS stands for Bangtan Sonyeondan.",2);
ty(3,"Which Swedish streaming service has a green logo? (one word)",["Spotify"],"Spotify was founded in Stockholm.",1);

// ===================== More questions (batch 2) =====================
m(1,"Legends","Which singer is nicknamed “The Boss”?","Bruce Springsteen",["Bob Dylan","Billy Joel","Bon Jovi"],"Springsteen’s hits include “Born to Run” and “Dancing in the Dark”.",2);
m(1,"Legends","Which singer is known as the “Queen of Soul”?","Aretha Franklin",["Whitney Houston","Diana Ross","Tina Turner"],"Her hit “Respect” (1967) became an anthem.",1);
m(1,"Legends","Which crooner was nicknamed “Ol’ Blue Eyes”?","Frank Sinatra",["Dean Martin","Elvis Presley","Tony Bennett"],"Sinatra’s signature songs include “My Way” and “New York, New York”.",2);
m(1,"Legends","Who was the lead singer of the band Queen?","Freddie Mercury",["Elton John","David Bowie","Robert Plant"],"Mercury was famous for his four-octave voice and flamboyant stage presence.",1);
m(1,"Legends","Which band’s lead singer is Mick Jagger?","The Rolling Stones",["Queen","The Who","Led Zeppelin"],"The band formed in London in 1962 and still tours today.",1);
m(1,"Legends","Which rapper uses the alter ego “Slim Shady”?","Eminem",["Jay-Z","50 Cent","Drake"],"Eminem’s real name is Marshall Mathers.",1);
m(1,"Legends","Which singer’s alter ego was Ziggy Stardust?","David Bowie",["Prince","Elton John","Lou Reed"],"Bowie released “The Rise and Fall of Ziggy Stardust” in 1972.",2);
m(1,"Legends","Which band is led by singer Chris Martin?","Coldplay",["Radiohead","Oasis","Muse"],"Coldplay’s hits include “Yellow”, “Fix You” and “Viva la Vida”.",1);
m(1,"Legends","In which country is the duo Daft Punk from?","France",["Belgium","Germany","Sweden"],"The robot-helmeted duo Thomas Bangalter and Guy-Manuel de Homem-Christo come from Paris.",2);
m(1,"Legends","Which Spanish singer released the 2022 album “Motomami”?","Rosalía",["Aitana","Nathy Peluso","Natalia Lacunza"],"The Catalan star won multiple Latin Grammys and mixes flamenco with pop and reggaeton.",2);
vf(1,"Elvis Presley was born in Memphis, Tennessee.",false,"He was born in Tupelo, Mississippi, in 1935 and moved to Memphis as a teenager.",3);
vf(1,"Freddie Mercury was born in Zanzibar.",true,"He was born Farrokh Bulsara in 1946 in what is now Tanzania.",3);

m(2,"Who sings it?","Who sings “Bad Romance”?","Lady Gaga",["Katy Perry","Rihanna","Pink"],"The 2009 song’s music video is one of the most watched ever.",1);
m(2,"Who sings it?","Who sings the 2010 World Cup anthem “Waka Waka (This Time for Africa)”?","Shakira",["Jennifer Lopez","Beyoncé","Rihanna"],"It became one of the most-viewed videos on YouTube.",1);
m(2,"Who sings it?","Who sings “Havana” (2017)?","Camila Cabello",["Selena Gomez","Ariana Grande","Dua Lipa"],"The song features rapper Young Thug and was a number-one hit in the UK.",2);
m(2,"Who sings it?","Who sings “Dance Monkey”?","Tones and I",["Dua Lipa","Lizzo","Sia"],"The Australian singer’s 2019 hit was streamed billions of times.",2);
m(2,"Who sings it?","Who sings “Sorry” (2015), with the line “Is it too late now to say sorry?”","Justin Bieber",["Ed Sheeran","Shawn Mendes","Charlie Puth"],"The song was written for his album “Purpose”.",2);
m(2,"Who sings it?","Who sings “Montero (Call Me by Your Name)”?","Lil Nas X",["Doja Cat","Post Malone","Drake"],"The 2021 song was a number-one hit with a famously controversial video.",2);
m(2,"Who sings it?","Who sings “drivers license” (2021)?","Olivia Rodrigo",["Billie Eilish","Dua Lipa","Sabrina Carpenter"],"It broke streaming records on Spotify in its first week.",2);
m(2,"Who sings it?","Who sings “Espresso” (2024)?","Sabrina Carpenter",["Olivia Rodrigo","Chappell Roan","Tate McRae"],"It was one of the biggest songs of summer 2024.",2);
m(2,"Who sings it?","Who sings “All I Want for Christmas Is You”?","Mariah Carey",["Whitney Houston","Celine Dion","Britney Spears"],"The 1994 song returns to the charts every December.",1);
m(2,"Who sings it?","Which band sings “Heat Waves” (2020), a huge TikTok hit?","Glass Animals",["Imagine Dragons","Foster the People","Tame Impala"],"The song spent a record number of weeks on the Billboard Hot 100.",3);
m(2,"Who sings it?","Who sings “Cheap Thrills” (2016)?","Sia",["Rihanna","Lorde","Adele"],"Sia is known for hiding her face behind a wig on stage.",3);
m(2,"Who sings it?","Who sings “Sweet Caroline”, a song that crowds sing along to at sports events?","Neil Diamond",["Billy Joel","Elton John","Rod Stewart"],"Neil Diamond released it in 1969.",3);
m(2,"Who sings it?","Who sings the Christmas song “Feliz Navidad”?","José Feliciano",["Julio Iglesias","Enrique Iglesias","Ricky Martin"],"The Puerto Rican singer released it in 1970.",3);
vf(2,"“Stay” (2021) was a global hit by The Kid LAROI and Justin Bieber.",true,"It topped charts in many countries and broke streaming records.",3);

m(3,"Records","Which group has had the most number-one singles on the Billboard Hot 100, with 20?","The Beatles",["Queen","The Rolling Stones","ABBA"],"Mariah Carey is second among all acts, with 19 number ones.",2);
m(3,"Records","How many members does the K-pop group BTS have?","7",["5","9","12"],"RM, Jin, Suga, J-Hope, Jimin, V and Jung Kook.",1);
m(3,"Records","How many members does the K-pop group Blackpink have?","4",["3","5","6"],"Jisoo, Jennie, Rosé and Lisa.",2);
m(3,"Records","How many members were in One Direction’s line-up?","5",["4","6","3"],"Harry, Niall, Liam, Louis and Zayn (until 2015).",1);
m(3,"Records","Which singer performed the Super Bowl halftime show in 2023, revealing her pregnancy on stage?","Rihanna",["Beyoncé","Lady Gaga","Shakira"],"Rihanna sang a medley of her hits on a floating platform.",2);
m(3,"Records","Which two singers shared the Super Bowl halftime show in 2020?","Shakira and Jennifer Lopez",["Beyoncé and Jay-Z","Katy Perry and Rihanna","Adele and Pink"],"The show took place in Miami.",2);
m(3,"Records","Which song won Eurovision in 1974 and launched ABBA’s international career?","Waterloo",["Dancing Queen","Mamma Mia","Fernando"],"ABBA performed in the contest in Brighton, UK.",2);
m(3,"Records","Which country did Nemo win Eurovision for in 2024?","Switzerland",["Sweden","Austria","Croatia"],"Nemo sang “The Code”, which mixed rap, opera and drum and bass.",3);
m(3,"Records","Which Bing Crosby Christmas song is often cited as the best-selling single of all time?","White Christmas",["Jingle Bells","Silent Night","Let It Snow"],"Estimates are over 50 million copies since its 1942 release.",3);
vf(3,"Lady Gaga took her stage name from Queen’s song “Radio Ga Ga”.",true,"Stefani Germanotta chose the name after the song.",2);
vf(3,"Justin Bieber was born in the United States.",false,"He was born in London, Ontario, Canada.",1);

m(4,"Decades","Which band released “(I Can’t Get No) Satisfaction” in 1965?","The Rolling Stones",["The Beatles","The Kinks","The Who"],"The song’s riff is among the most recognised in rock.",2);
m(4,"Decades","Which group sang “Stayin’ Alive” in 1977, the disco hit from “Saturday Night Fever”?","The Bee Gees",["ABBA","Earth, Wind & Fire","Chic"],"The brothers Barry, Robin and Maurice Gibb sang in high falsetto.",2);
m(4,"Decades","Which singer released “Like a Virgin” in 1984?","Madonna",["Cyndi Lauper","Whitney Houston","Janet Jackson"],"Madonna performed the song at the first MTV Video Music Awards.",1);
m(4,"Decades","Which singer had the 1983 hit “Girls Just Want to Have Fun”?","Cyndi Lauper",["Madonna","Pat Benatar","Tina Turner"],"Written by Robert Hazard, it became Lauper’s signature song.",2);
m(4,"Decades","Which band sang “Every Breath You Take” (1983)?","The Police",["Genesis","Duran Duran","U2"],"Sting wrote it and it was number one in the US for eight weeks.",2);
m(4,"Decades","Which boy band sang “I Want It That Way” (1999)?","Backstreet Boys",["*NSYNC","Take That","Boyzone"],"The song has been a karaoke favourite for decades.",1);
m(4,"Decades","Which singer recorded “My Heart Will Go On” for the film “Titanic”?","Céline Dion",["Whitney Houston","Mariah Carey","Shania Twain"],"The 1997 ballad won an Oscar and a Grammy.",1);
m(4,"Decades","Which singer released “Toxic” in 2003?","Britney Spears",["Christina Aguilera","Kylie Minogue","Beyoncé"],"The song won Britney a Grammy for Best Dance Recording.",2);
m(4,"Decades","Which band released the 2004 indie-rock hit “Mr. Brightside”?","The Killers",["Arctic Monkeys","The Strokes","Franz Ferdinand"],"It has spent hundreds of weeks in the UK charts.",2);
m(4,"Decades","Which band sang “Viva la Vida” (2008)?","Coldplay",["U2","Radiohead","Muse"],"The song was inspired by the painter Frida Kahlo’s final work.",2);
m(4,"Decades","Which singer released “Roar” in 2013?","Katy Perry",["Lady Gaga","Pink","Demi Lovato"],"It became a worldwide empowerment anthem.",1);
m(4,"Decades","Which New Zealand singer broke through in 2013 with “Royals”?","Lorde",["Adele","Sia","Kimbra"],"She was just 16 when the song became number one in the US.",2);
m(4,"Decades","Which singer released “Can’t Stop the Feeling!” in 2016 for the film “Trolls”?","Justin Timberlake",["Bruno Mars","Pharrell Williams","Ed Sheeran"],"It was nominated for an Oscar for Best Original Song.",2);
m(4,"Decades","Which duo had the 2022 hit “Unholy”?","Sam Smith and Kim Petras",["Dua Lipa and Elton John","Harry Styles and Lizzo","Doja Cat and The Weeknd"],"The song made Kim Petras the first openly transgender artist at number one on the Hot 100.",3);

return {id:"hits",title:"Pop Hits & Music Stars",kw:"music pop hits songs singers taylor swift beyonce bts rihanna spotify tiktok songs artists quiz",subject:"Pop royalty, who sings it, records and hits through the decades",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
