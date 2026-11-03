// Built-in bank: American pop culture (English). Movies, TV, music, sports, food & brands, landmarks.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy (most people know it), 2 = medium, 3 = hard (for fans).
window.BANK_USPOP=(function(){
const SESS={1:"Movies",2:"TV shows",3:"Music",4:"Sports",5:"Food & brands",6:"Places & landmarks"};
const TAGS={1:"Movies",2:"TV",3:"Music",4:"Sports",5:"Food & brands",6:"Landmarks"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Movies =====================
m(1,"Director","Who directed the 1975 blockbuster Jaws?","Steven Spielberg",["George Lucas","Francis Ford Coppola","Martin Scorsese"],"Steven Spielberg directed Jaws (1975), often called the first summer blockbuster.",1);
m(1,"Quote","In which film does the line “Life is like a box of chocolates” appear?","Forrest Gump",["Rain Man","Big","Cast Away"],"Forrest Gump (1994), played by Tom Hanks: “Life was like a box of chocolates. You never know what you’re gonna get.”",1);
m(1,"Opening","Which 1977 film opens with “A long time ago in a galaxy far, far away…”?","Star Wars",["Close Encounters of the Third Kind","Alien","Superman"],"Star Wars (1977), written and directed by George Lucas, opens with that line followed by the scrolling yellow text.",1);
m(1,"Cast","Who played Jack Dawson in Titanic (1997)?","Leonardo DiCaprio",["Brad Pitt","Matt Damon","Johnny Depp"],"Leonardo DiCaprio played Jack Dawson opposite Kate Winslet’s Rose.",1);
m(1,"Quote","Which film features the line “I’ll be back”?","The Terminator",["Predator","Die Hard","Rambo: First Blood"],"Arnold Schwarzenegger says “I’ll be back” in The Terminator (1984).",1);
m(1,"Animation","Which studio made Toy Story (1995), the first fully computer-animated feature film?","Pixar",["DreamWorks","Blue Sky Studios","Illumination"],"Toy Story (1995) was produced by Pixar Animation Studios, in partnership with Disney.",2);
m(1,"Cast","Who played Don Vito Corleone in The Godfather (1972)?","Marlon Brando",["Al Pacino","James Caan","Robert Duvall"],"Marlon Brando played the Godfather and won the Best Actor Oscar for it. Al Pacino played his son Michael.",2);
m(1,"Setting","In which city is the boxing film Rocky set?","Philadelphia",["New York","Boston","Chicago"],"Rocky Balboa is a boxer from Philadelphia, and the film’s famous run ends on the steps of the Philadelphia Museum of Art.",2);
m(1,"Director","Who directed Pulp Fiction (1994)?","Quentin Tarantino",["Steven Soderbergh","David Fincher","Oliver Stone"],"Quentin Tarantino directed Pulp Fiction, which won the Palme d’Or at Cannes in 1994.",2);
m(1,"Franchise","Which film started the Marvel Cinematic Universe in 2008?","Iron Man",["The Incredible Hulk","Thor","Captain America: The First Avenger"],"Iron Man (2008), with Robert Downey Jr. as Tony Stark, was the first MCU film.",2);
vf(1,"Hollywood is a district of Los Angeles, California.",true,"Hollywood is a neighbourhood of Los Angeles, and the name is also used for the American film industry.",1);
vf(1,"Walt Disney’s Mickey Mouse first appeared in 1928.",true,"Mickey Mouse debuted in Steamboat Willie in November 1928.",3);
ty(1,"Which company produced Toy Story and Finding Nemo?",["Pixar","Pixar Animation Studios"],"Pixar, founded in 1986 and bought by Disney in 2006.",2);

// ===================== 2. TV shows =====================
m(2,"Sitcom","Which sitcom follows six pals in Manhattan who hang out at the coffee shop Central Perk?","Friends",["Seinfeld","How I Met Your Mother","Cheers"],"Friends ran from 1994 to 2004 and is set in Manhattan.",1);
m(2,"Animation","At what address does the Simpson family live?","742 Evergreen Terrace",["221B Baker Street","1600 Pennsylvania Avenue","31 Spooner Street"],"The Simpsons live at 742 Evergreen Terrace in Springfield. 31 Spooner Street is the Griffins’ house in Family Guy.",2);
m(2,"Drama","What is Walter White’s job at the start of Breaking Bad?","High school chemistry teacher",["Pharmacist","Police officer","Car mechanic"],"He teaches chemistry in Albuquerque before turning to making methamphetamine after a cancer diagnosis.",1);
m(2,"Streaming","Which streaming service released Stranger Things?","Netflix",["Hulu","Disney+","HBO Max"],"Stranger Things premiered on Netflix in 2016.",1);
m(2,"Setting","In which fictional Indiana town is Stranger Things set?","Hawkins",["Derry","Castle Rock","Haddonfield"],"Hawkins, Indiana. Derry and Castle Rock are Stephen King towns, and Haddonfield is from Halloween.",2);
m(2,"Sitcom","At which paper company do the characters of the US version of The Office work?","Dunder Mifflin",["Wernham Hogg","Vance Refrigeration","Sabre"],"Dunder Mifflin, Scranton branch. Wernham Hogg is the company in the original British version.",2);
m(2,"Setting","In which city is the sitcom Cheers set?","Boston",["Chicago","New York","Philadelphia"],"Cheers (1982–1993) takes place in a Boston bar where “everybody knows your name”.",2);
m(2,"Late night","Who hosted The Tonight Show from 1962 to 1992?","Johnny Carson",["David Letterman","Jay Leno","Conan O’Brien"],"Johnny Carson hosted for 30 years. Jay Leno took over in 1992.",3);
m(2,"Drama","Which HBO series is set on the fictional continents of Westeros and Essos?","Game of Thrones",["The Sopranos","Succession","True Detective"],"Game of Thrones (2011–2019) is based on George R. R. Martin’s novels A Song of Ice and Fire.",1);
vf(2,"Breaking Bad is set in Albuquerque, New Mexico.",true,"Albuquerque is the main setting of Breaking Bad and of its spin-off Better Call Saul.",2);
vf(2,"The Simpsons is the longest-running American animated series.",true,"The Simpsons premiered as a series in December 1989 and has run for over three decades.",2);
ty(2,"What is the name of the coffee shop in Friends?",["Central Perk"],"Central Perk, with its famous orange couch.",2);
ty(2,"In which city is the sitcom Cheers set?",["Boston"],"Boston, Massachusetts.",2);

// ===================== 3. Music =====================
m(3,"Nicknames","Who is known as the “King of Rock and Roll”?","Elvis Presley",["Chuck Berry","Johnny Cash","Jerry Lee Lewis"],"Elvis Presley (1935–1977) lived at Graceland in Memphis, Tennessee.",1);
m(3,"Nicknames","Which singer is nicknamed the “Queen of Pop”?","Madonna",["Cher","Whitney Houston","Lady Gaga"],"Madonna has carried the nickname since the 1980s.",1);
m(3,"Albums","Which 1982 Michael Jackson album is widely cited as the best-selling album of all time?","Thriller",["Bad","Off the Wall","Dangerous"],"Thriller (1982) is credited with tens of millions of copies sold worldwide.",1);
m(3,"Origins","Which city is considered the birthplace of jazz?","New Orleans",["Chicago","New York","Memphis"],"Jazz emerged in New Orleans, Louisiana, in the early 20th century.",1);
m(3,"Cities","Which Tennessee city is nicknamed “Music City” and is home to the Grand Ole Opry?","Nashville",["Memphis","Austin","Atlanta"],"Nashville is the capital of country music.",1);
m(3,"Songs","Who sang “Born in the U.S.A.” (1984)?","Bruce Springsteen",["Bob Dylan","Billy Joel","Tom Petty"],"Bruce Springsteen, nicknamed “The Boss”, from New Jersey.",2);
m(3,"Albums","Which rapper released the album To Pimp a Butterfly in 2015?","Kendrick Lamar",["Drake","Kanye West","J. Cole"],"Kendrick Lamar, from Compton, California. His album DAMN. won the Pulitzer Prize for Music in 2018.",2);
m(3,"Tours","Whose Eras Tour became the highest-grossing concert tour in history?","Taylor Swift",["Beyoncé","Bruce Springsteen","Madonna"],"Taylor Swift’s Eras Tour (2023–2024) was the first tour to gross over one billion dollars.",1);
m(3,"Festivals","In which US state was the 1969 Woodstock festival held?","New York",["California","Pennsylvania","Vermont"],"Woodstock took place on a farm in Bethel, New York.",2);
m(3,"Labels","Which Detroit label launched The Supremes and Stevie Wonder?","Motown",["Stax","Atlantic","Def Jam"],"Berry Gordy founded Motown in 1959.",2);
vf(3,"Hip-hop is generally said to have started in the Bronx, New York, in the 1970s.",true,"DJ Kool Herc’s 1973 party in the Bronx is often cited as the birth of hip-hop.",2);
vf(3,"Johnny Cash was born in Hollywood.",false,"Johnny Cash was born in Arkansas in 1932.",3);
ty(3,"In which Tennessee city is Elvis’s home Graceland?",["Memphis"],"Graceland is in Memphis, Tennessee.",2);
ty(3,"Which Michael Jackson album from 1982 sold more than any other album?",["Thriller"],"Thriller (1982).",1);

// ===================== 4. Sports =====================
m(4,"Basketball","How many players per team are on the court at once in basketball?","5",["6","7","4"],"Five players per team.",1);
m(4,"Football","Which league’s championship game is the Super Bowl?","NFL",["MLB","NBA","NHL"],"The Super Bowl is the NFL’s championship game, played in early February.",1);
m(4,"Basketball","Which Chicago Bulls star wore number 23 and won six NBA titles?","Michael Jordan",["Scottie Pippen","Dennis Rodman","Kobe Bryant"],"Michael Jordan won six championships with the Bulls (1991–93 and 1996–98).",1);
m(4,"Baseball","How many strikes make a strikeout in baseball?","3",["2","4","5"],"Three strikes and the batter is out.",1);
m(4,"Baseball","The World Series is the championship of which sport?","Baseball",["Basketball","American football","Ice hockey"],"The World Series decides the Major League Baseball champion.",1);
m(4,"Football","How many points is a touchdown worth in American football (before the extra point)?","6",["3","7","5"],"A touchdown is 6 points, then 1 or 2 extra points can be added.",1);
m(4,"Olympics","Which American swimmer holds the record of 23 Olympic gold medals?","Michael Phelps",["Mark Spitz","Ryan Lochte","Ian Thorpe"],"Michael Phelps won 23 golds across five Olympic Games (2004–2016).",2);
m(4,"Olympics","Which US city hosted the 1996 Summer Olympics?","Atlanta",["Los Angeles","Chicago","Dallas"],"Atlanta, Georgia, hosted the Centennial Games in 1996. Los Angeles hosted in 1932 and 1984.",2);
m(4,"Football","Tom Brady won six of his seven Super Bowls with which team?","New England Patriots",["Tampa Bay Buccaneers","Dallas Cowboys","Green Bay Packers"],"Six with the Patriots, and a seventh with the Tampa Bay Buccaneers in 2021.",2);
m(4,"Tennis","Which American tennis player won 23 Grand Slam singles titles?","Serena Williams",["Venus Williams","Billie Jean King","Martina Navratilova"],"Serena Williams won 23 Grand Slam singles titles, a record of the Open Era.",2);
vf(4,"The Los Angeles Lakers started out in Minneapolis.",true,"The team was founded in Minneapolis and moved to Los Angeles in 1960; the name comes from Minnesota’s “Land of 10,000 Lakes”.",3);
vf(4,"In baseball, a game is divided into four quarters.",false,"Baseball is divided into innings, usually nine. Quarters are used in American football and basketball.",1);
ty(4,"What is the name of the NFL’s championship game?",["Super Bowl","The Super Bowl"],"The Super Bowl.",1);
ty(4,"Which sport is the World Series played in?",["Baseball"],"Baseball.",1);

// ===================== 5. Food & brands =====================
m(5,"Food","Which city is famous for its deep-dish pizza?","Chicago",["New York","Detroit","Boston"],"Chicago-style deep-dish pizza has a thick crust and a lot of cheese and sauce.",1);
m(5,"Holidays","Which American holiday, on the fourth Thursday of November, traditionally features turkey?","Thanksgiving",["Independence Day","Labor Day","Memorial Day"],"Thanksgiving is celebrated on the fourth Thursday of November.",1);
m(5,"Brands","Which drink was invented in Atlanta in 1886 by pharmacist John Pemberton?","Coca-Cola",["Pepsi","Dr Pepper","Sprite"],"Coca-Cola was created in 1886 and sold first at a pharmacy soda fountain.",2);
m(5,"Brands","Which coffee chain opened its first store in Seattle in 1971?","Starbucks",["Dunkin’","Peet’s Coffee","Tim Hortons"],"Starbucks opened at Pike Place Market in 1971.",2);
m(5,"Brands","Which company, founded by Jeff Bezos in 1994, started as an online bookstore?","Amazon",["eBay","Walmart","Netflix"],"Amazon was founded in Bellevue, Washington, and sold its first books online in 1995.",1);
m(5,"Brands","Which company launched the iPhone in 2007?","Apple",["Microsoft","Google","Motorola"],"Steve Jobs presented the first iPhone in January 2007.",1);
m(5,"Food","Which US state is most associated with lobster rolls?","Maine",["Texas","Oregon","Georgia"],"Maine is famous for its lobster.",2);
m(5,"Food","In which state is the city of Buffalo, birthplace of Buffalo wings?","New York",["Ohio","Pennsylvania","Illinois"],"Buffalo wings were created in Buffalo, New York, reportedly at the Anchor Bar.",2);
m(5,"Food","What is the main ingredient of the American classic “PB&J” sandwich besides bread?","Peanut butter and jelly",["Ham and cheese","Tuna and mayo","Cream cheese and bacon"],"PB&J is peanut butter and jelly, a lunchbox classic.",1);
vf(5,"Trick-or-treating is traditionally done on October 31.",true,"Children go door to door in costume on Halloween, October 31.",1);
vf(5,"McDonald’s was founded by Ray Kroc in 1940.",false,"The McDonald brothers opened their restaurant in 1940. Ray Kroc joined in 1954 and built the franchise.",3);
ty(5,"In which city did Starbucks open its first store?",["Seattle"],"Seattle, Washington, in 1971.",2);
ty(5,"Which city is nicknamed “The Big Apple”?",["New York","New York City","NYC"],"New York City.",1);

// ===================== 6. Places & landmarks =====================
m(6,"Monuments","Which of these presidents is NOT carved on Mount Rushmore?","John F. Kennedy",["George Washington","Abraham Lincoln","Thomas Jefferson"],"Mount Rushmore shows Washington, Jefferson, Theodore Roosevelt and Lincoln.",2);
m(6,"Cities","In which city is the Hollywood Sign?","Los Angeles",["San Francisco","San Diego","Las Vegas"],"The Hollywood Sign stands on Mount Lee, in the Hollywood Hills of Los Angeles.",1);
m(6,"Monuments","Which statue, a gift from France, stands on Liberty Island in New York Harbor?","Statue of Liberty",["Lincoln Memorial","Washington Monument","Alamo"],"The Statue of Liberty was given by France and inaugurated in 1886.",1);
m(6,"States","In which state is Las Vegas?","Nevada",["California","Arizona","Utah"],"Las Vegas is in southern Nevada.",1);
m(6,"Cities","Which city is nicknamed “Motor City”?","Detroit",["Houston","Pittsburgh","Cleveland"],"Detroit is the historic centre of the American car industry.",2);
m(6,"Parks","In which state is Walt Disney World?","Florida",["California","Texas","Georgia"],"Walt Disney World Resort is near Orlando, Florida. Disneyland is in California.",1);
m(6,"Bridges","Which bridge connects San Francisco to Marin County?","Golden Gate Bridge",["Brooklyn Bridge","Bay Bridge","Verrazzano Bridge"],"The Golden Gate Bridge opened in 1937.",1);
m(6,"Nature","In which state is the Grand Canyon?","Arizona",["Colorado","Utah","Nevada"],"The Grand Canyon National Park is in northern Arizona.",1);
m(6,"Capitals","What is the capital of the United States?","Washington, D.C.",["New York","Philadelphia","Los Angeles"],"Washington, D.C. (District of Columbia) is not in any state.",1);
vf(6,"The Statue of Liberty was a gift from France.",true,"It was designed by Frédéric Auguste Bartholdi and inaugurated in 1886.",1);
vf(6,"The White House is in New York City.",false,"The White House is at 1600 Pennsylvania Avenue in Washington, D.C.",1);
ty(6,"Which city is nicknamed “Sin City”?",["Las Vegas","Vegas"],"Las Vegas, Nevada.",2);
ty(6,"In which state is Disney World?",["Florida"],"Florida.",1);

return {id:"uspop",title:"American Pop Culture",kw:"usa us america american pop culture movies film tv series music sports nfl nba food brands landmarks trivia fun quiz",subject:"Movies, TV, music, sports, food and landmarks: how well do you know the USA?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
