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

return {id:"hits",title:"Pop Hits & Music Stars",kw:"music pop hits songs singers taylor swift beyonce bts rihanna spotify tiktok songs artists quiz",subject:"Pop royalty, who sings it, records and hits through the decades",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
