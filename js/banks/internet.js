// Built-in bank: Internet & TikTok culture (English). Platforms, memes, viral moments, creators and slang.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (terminally online).
window.BANK_INTERNET=(function(){
const SESS={1:"Apps & platforms",2:"Memes & viral moments",3:"Creators & records",4:"Slang decoded"};
const TAGS={1:"Apps",2:"Memes",3:"Creators",4:"Slang"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Apps & platforms =====================
m(1,"TikTok","Which company owns TikTok?","ByteDance",["Tencent","Alibaba","Meta"],"ByteDance is a Chinese company founded in 2012 by Zhang Yiming.",1);
m(1,"TikTok","Which app did TikTok merge with in 2018?","Musical.ly",["Vine","Dubsmash","Triller"],"Musical.ly was a lip-sync app bought by ByteDance and folded into TikTok in August 2018.",2);
m(1,"Instagram","Which company bought Instagram in 2012 for about $1 billion?","Facebook",["Google","Twitter","Snapchat"],"Facebook (now Meta) bought Instagram when it had only a handful of employees.",2);
m(1,"Snapchat","What is the logo of Snapchat?","A white ghost on yellow",["A yellow camera","A blue bird","A white flame"],"The ghost is called Ghostface Chillah.",1);
m(1,"X","What did Twitter get renamed to in 2023?","X",["Threads","Bluesky","T"],"Elon Musk renamed Twitter to X in July 2023.",1);
m(1,"Vine","How long were videos on Vine?","6 seconds",["15 seconds","30 seconds","60 seconds"],"Vine launched in 2013 and was shut down in 2017.",2);
m(1,"YouTube","What was the title of the first video ever posted on YouTube, in 2005?","Me at the zoo",["Charlie bit my finger","Evolution of Dance","Baby Shark"],"Co-founder Jawed Karim filmed it in front of elephants at the San Diego Zoo.",2);
m(1,"BeReal","What is the idea of BeReal?","One unfiltered photo a day at a random time",["Only live videos","Posting without followers","Photos that disappear after 5 seconds"],"BeReal sends a notification once a day and gives you two minutes to post.",2);
m(1,"WhatsApp","Which company bought WhatsApp in 2014 for about $19 billion?","Facebook",["Google","Microsoft","Apple"],"It was then the largest acquisition of a messaging app ever.",3);
m(1,"Reddit","What is the name of Reddit’s mascot?","Snoo",["Reddy","Alien Blue","Redditor"],"Snoo is an alien that is the platform’s logo.",3);
m(1,"ChatGPT","In which year was ChatGPT launched to the public?","2022",["2019","2020","2024"],"ChatGPT launched on 30 November 2022 and reached 100 million users in about two months.",2);
vf(1,"Instagram Stories copied the idea of Snapchat.",true,"Instagram introduced Stories in 2016, with a very similar disappearing-photo format.",1);
vf(1,"Twitch is owned by Google.",false,"Twitch is owned by Amazon, which bought it in 2014 for about $970 million.",2);

// ===================== 2. Memes & viral moments =====================
m(2,"Meme","Which song is behind the “Rickroll” prank?","Never Gonna Give You Up",["Together Forever","Take On Me","Whenever You Need Somebody"],"Rick Astley’s 1987 hit became the internet’s favourite bait-and-switch.",1);
m(2,"Meme","Which dog breed is the “Doge” meme?","Shiba Inu",["Husky","Corgi","Akita"],"The dog is called Kabosu. Dogecoin was created as a joke in 2013 around the meme.",1);
m(2,"Viral song","Which 2012 K-pop hit was the first YouTube video to reach 1 billion views?","Gangnam Style",["Call Me Maybe","Despacito","Baby"],"Psy’s Gangnam Style hit 1 billion views in December 2012.",1);
m(2,"Viral song","Which children’s video was the first to hit 10 billion views on YouTube?","Baby Shark Dance",["Johny Johny Yes Papa","Wheels on the Bus","Despacito"],"Pinkfong’s Baby Shark Dance crossed 10 billion views in 2022.",2);
m(2,"Challenge","What was the Ice Bucket Challenge in 2014 about?","Raising awareness for ALS",["Fighting climate change","Raising money for cancer research","Promoting a soft drink"],"People dumped ice water on their heads to support research on amyotrophic lateral sclerosis.",2);
m(2,"Meme","What colours did people see in “The Dress” that went viral in 2015?","Blue and black, or white and gold",["Pink and grey","Red and blue","Green and yellow"],"The photo split the internet because people’s brains read the lighting differently.",2);
m(2,"Meme","What is Nyan Cat?","A cat with a Pop-Tart body leaving a rainbow trail",["A grumpy cat","A cat with a laser","A cat wearing a crown"],"The animated cat became popular on YouTube in 2011.",3);
m(2,"Meme","Which meme shows a cartoon dog calmly sipping coffee in a room on fire?","This Is Fine",["Doge","Success Kid","Bad Luck Brian"],"The comic is from KC Green’s Gunshow (2013).",2);
m(2,"Game","Which word game created by Josh Wardle was bought by The New York Times in 2022?","Wordle",["Scrabble","Boggle","Crosswordle"],"Wardle first made Wordle for his partner, and it became a global phenomenon in early 2022.",2);
m(2,"Game","Which 2020 game gave us the slang word “sus” and the “emergency meeting”?","Among Us",["Fall Guys","Minecraft","Fortnite"],"Among Us was released in 2018 but exploded during the 2020 lockdowns.",1);
m(2,"Meme","What is a “Rickroll”?","Tricking someone into clicking a link that plays the Rick Astley song",["A type of dance","A prank where you throw a rock","A cooking trend"],"Rickrolling dates back to around 2007.",1);
vf(2,"The word “meme” was invented on the internet.",false,"Richard Dawkins coined “meme” in his 1976 book The Selfish Gene.",3);
vf(2,"The 😂 “Face with Tears of Joy” emoji was Oxford’s Word of the Year in 2015.",true,"It was the first time an emoji was chosen as Word of the Year.",3);

// ===================== 3. Creators & records =====================
m(3,"YouTube","Who is the most-subscribed YouTuber in the world (since 2024)?","MrBeast",["PewDiePie","Dude Perfect","Markiplier"],"MrBeast (Jimmy Donaldson) passed the Indian label T-Series in 2024.",1);
m(3,"YouTube","Which Swedish YouTuber led the “Subscribe to…” campaign against T-Series in 2018-2019?","PewDiePie",["Ninja","KSI","Logan Paul"],"Felix Kjellberg from Sweden was the most-subscribed individual YouTuber for years.",2);
m(3,"TikTok","Who was the first TikToker to reach 100 million followers?","Charli D’Amelio",["Addison Rae","Khaby Lame","Bella Poarch"],"Charli D’Amelio hit 100 million followers in 2022.",2);
m(3,"TikTok","Khaby Lame became a global TikTok star by…","Silently mocking over-complicated life hacks",["Singing cover songs","Cooking in 60 seconds","Doing magic tricks"],"The Italian-Senegalese creator used a simple shrug with his hands open.",2);
m(3,"Twitch","Which streamer made Fortnite famous on Twitch and later joined Mixer?","Ninja",["Pokimane","Shroud","xQc"],"Tyler “Ninja” Blevins became a star in 2018.",2);
m(3,"Twitch","Which platform do gamers use to stream live?","Twitch",["Vine","Reddit","Pinterest"],"Twitch launched in 2011 and is owned by Amazon.",1);
m(3,"Music","Which Canadian teenager was discovered on YouTube and became a pop star?","Justin Bieber",["Shawn Mendes","Drake","The Weeknd"],"Scooter Braun found Bieber’s videos on YouTube in 2007.",1);
m(3,"Music","Which rapper’s “Old Town Road” became a viral TikTok hit in 2019?","Lil Nas X",["Post Malone","Travis Scott","Doja Cat"],"It stayed at number one on the Billboard Hot 100 for 19 weeks.",2);
m(3,"Spotify","What is the name of the yearly summary of what you listened to on Spotify?","Spotify Wrapped",["Spotify Replay","Spotify Rewind","Spotify Recap"],"Wrapped has been released every December since 2016.",1);
m(3,"Business","Who bought Twitter in 2022 for about $44 billion?","Elon Musk",["Jeff Bezos","Mark Zuckerberg","Peter Thiel"],"The deal closed in October 2022.",1);
vf(3,"YouTube was founded in 2005.",true,"It was founded by Chad Hurley, Steve Chen and Jawed Karim, and bought by Google in 2006.",1);
vf(3,"Facebook was started by Mark Zuckerberg at Harvard.",true,"The Facebook launched on 4 February 2004.",1);

// ===================== 4. Slang decoded =====================
m(4,"Slang","What does “GOAT” stand for?","Greatest of all time",["Good on all terms","Get out and talk","Great one at tennis"],"It is used to describe someone who is the best ever in their field.",1);
m(4,"Slang","If someone says “no cap”, they mean…","I’m not lying",["Take your hat off","Don’t be cheap","I forgot"],"“Cap” means a lie, so “no cap” means “for real”.",1);
m(4,"Slang","What does “FOMO” stand for?","Fear of missing out",["Fun on my own","Friends of mine only","Fast online money offer"],"The anxiety that others are having more fun than you.",1);
m(4,"Slang","What does “rizz” mean?","Charisma, especially in flirting",["Speed","Money","Rage"],"Rizz, short for charisma, was Oxford’s Word of the Year in 2023.",2);
m(4,"Slang","If something is “sus”, it is…","Suspicious",["Super","Sustainable","Sweet"],"The word spread thanks to the game Among Us.",1);
m(4,"Slang","What does “delulu” mean?","Delusional, in a playful way",["Sleepy","Delicious","Delayed"],"“Delulu is the solulu” was a viral TikTok joke about believing in your own dreams.",2);
m(4,"Slang","What does “IYKYK” stand for?","If you know, you know",["It’s your key, you know","In your kitchen you know","I yell, you yell, we all yell"],"It signals an inside joke that only some people understand.",2);
m(4,"Slang","If someone tells you to “touch grass”, they mean…","Go offline and get some fresh air",["You’re too short","You’ve won","Take a nap"],"It is a joke aimed at people who spend too much time online.",2);
m(4,"Slang","Which phrase was Oxford’s Word of the Year in 2024?","Brain rot",["Slay","Doomscrolling","Rizzler"],"It describes the mental effect of consuming lots of low-quality online content.",3);
m(4,"Slang","What is “doomscrolling”?","Endlessly scrolling bad news",["Gaming at night","Making slow videos","Sharing memes with friends"],"The word became popular during the 2020 pandemic.",2);
m(4,"Slang","What does it mean to “ghost” someone?","Suddenly cut contact without explanation",["Give them a gift","Scare them","Follow them everywhere"],"Ghosting is vanishing from a chat or relationship without a word.",1);
vf(4,"“Emoji” comes from the Japanese words for picture and character.",true,"The word is e (picture) + moji (character); Shigetaka Kurita designed the first set in 1999.",3);
vf(4,"LOL was originally an abbreviation for “lots of love”.",false,"LOL means “laughing out loud” (or “laugh out loud”).",2);

// ===================== Typed answers =====================
ty(1,"Which app is known for 15-second dance videos and is owned by ByteDance? (one word)",["TikTok","Tik Tok"],"TikTok became the most downloaded app in the world.",1);
ty(1,"What does “LOL” stand for? (three words)",["laughing out loud","laugh out loud"],"LOL is among the oldest internet abbreviations.",1);
ty(2,"Which Korean artist sang Gangnam Style? (one word)",["Psy","PSY"],"Gangnam Style was released in July 2012.",1);
ty(3,"Which Swedish YouTuber is known as the king of YouTube for a decade? (one word)",["PewDiePie","Pewdiepie","Felix"],"His channel was the most subscribed from 2013 to 2019 with a short interruption.",2);
ty(3,"Which platform shows Wrapped every December? (one word)",["Spotify"],"Spotify Wrapped has been viral every year since 2016.",1);
ty(2,"Which dog is behind the “Doge” meme? (two words)",["Shiba Inu","Shiba"],"The Shiba Inu is a Japanese dog breed.",2);
ty(4,"What does “FOMO” stand for? (four words)",["fear of missing out"],"It is the social anxiety of missing exciting events.",1);

// ===================== More questions (batch 2) =====================
m(1,"Apps","What does “DM” stand for on social media?","Direct message",["Daily mood","Double match","Digital media"],"A DM is a private message sent to one person or a small group.",1);
m(1,"Apps","What is a hashtag?","A word or phrase with # used to tag a topic",["A type of emoji","A private chat","A paid advert"],"Chris Messina proposed using # on Twitter in 2007.",1);
m(1,"Apps","Which Meta app launched in July 2023 as a rival to X (formerly Twitter)?","Threads",["Bluesky","Mastodon","Truth Social"],"Threads got 100 million sign-ups in less than a week.",2);
m(1,"Apps","Which website hosts topic communities with that start with “r/”, like r/funny?","Reddit",["Tumblr","Quora","Digg"],"Each subreddit focuses on a topic, such as r/AskReddit or r/funny.",1);
m(1,"Apps","Which dating app popularised swiping right to like someone, launching in 2012?","Tinder",["Bumble","Hinge","Match.com"],"Swiping left means “no”, swiping right means “yes”.",1);
m(1,"Apps","Which app is the most popular chat platform among gamers, with servers and channels?","Discord",["Slack","Skype","Zoom"],"Discord started in 2015 as a voice chat for gamers.",1);
m(1,"Apps","In which year was Wikipedia launched?","2001",["1998","2004","2006"],"Jimmy Wales and Larry Sanger launched Wikipedia in January 2001.",3);
m(1,"Apps","What does URL stand for?","Uniform Resource Locator",["Universal Reading Link","United Response List","User Reference Line"],"A URL, such as https://example.com, is the address of a web page.",3);
vf(1,"Instagram was launched in 2010.",true,"It was launched in October 2010 and bought by Facebook in 2012.",2);
vf(1,"The messaging app Telegram was founded by Pavel Durov.",true,"Durov, who also founded the Russian network VK, launched Telegram in 2013.",3);

m(2,"Memes","Which meme pairs a woman pointing and shouting with a confused cat at a dinner table?","Woman Yelling at a Cat",["Distracted Boyfriend","Drake Hotline Bling","Success Kid"],"It combines a scene from “The Real Housewives” with a photo of a cat called Smudge.",2);
m(2,"Memes","Which meme shows a man looking at another woman while his girlfriend looks angry?","Distracted Boyfriend",["Two Buttons","Hide the Pain Harold","Grumpy Cat"],"It was a stock photo from 2015 that became a meme in 2017.",1);
m(2,"Memes","Which Pokémon’s shocked face is a very popular reaction meme?","Pikachu",["Jigglypuff","Meowth","Eevee"],"Surprised Pikachu comes from a 2018 shot of the anime.",1);
m(2,"Memes","What was the real name of the internet-famous cat “Grumpy Cat”?","Tardar Sauce",["Nala","Smudge","Maru"],"Her grumpy face was caused by feline dwarfism and an underbite.",3);
m(2,"Memes","The 2018 “In My Feelings” challenge was based on a song by which rapper?","Drake",["Kendrick Lamar","Travis Scott","Post Malone"],"People danced next to a moving car as part of the challenge.",2);
m(2,"Memes","Which Norwegian duo’s 2013 viral hit asked what the fox says?","Ylvis",["a-ha","Röyksopp","Kygo"],"“The Fox (What Does the Fox Say?)” reached hundreds of millions of views.",3);
m(2,"Memes","What was the “Mannequin Challenge” of 2016?","People stayed frozen like mannequins while a camera moved",["Dancing on shop windows","Wearing mannequin clothes","Pouring water on your head"],"Even celebrities and politicians joined in.",2);
m(2,"Memes","“OK Boomer” became a viral phrase in 2019 to respond to…","Older people’s dismissive attitudes",["Gamers’ slang","Teachers’ homework","Influencers’ adverts"],"It was popularised on TikTok and made headlines when a New Zealand MP used it in parliament.",2);
vf(2,"The Rickroll prank began on the forum 4chan in 2007.",true,"People tricked others into clicking a link that led to Rick Astley’s “Never Gonna Give You Up”.",3);
vf(2,"The 2014 Ice Bucket Challenge raised over $100 million for ALS research.",true,"The ALS Association raised about $115 million during the challenge.",3);

m(3,"Creators","What is MrBeast’s real first name?","Jimmy",["Mark","Chris","Tyler"],"Jimmy Donaldson started on YouTube at 13 and became the platform’s top creator.",2);
m(3,"Creators","Which Spanish streamer organised “La Velada del Año”, a huge boxing event for Twitch creators?","Ibai Llanos",["El Rubius","AuronPlay","TheGrefg"],"The event gathered millions of live viewers and was held in stadiums.",2);
m(3,"Creators","Which Spanish streamer broke the Twitch record in January 2021 with a Fortnite skin reveal?","TheGrefg",["Ibai Llanos","El Rubius","Willyrex"],"More than 2.4 million viewers watched at the same time.",3);
m(3,"Creators","Who is the most-followed person on Instagram?","Cristiano Ronaldo",["Lionel Messi","Selena Gomez","Kylie Jenner"],"Ronaldo has more than 600 million followers.",2);
m(3,"Creators","In 2023, which streamer passed one million subscribers during a month-long Twitch “subathon”?","Kai Cenat",["Ludwig","Ninja","xQc"],"Kai Cenat broke the Twitch subscriber record in September 2023.",3);
m(3,"Platforms","What is the name of YouTube’s short vertical-video feature?","Shorts",["Reels","Spotlight","Stories"],"YouTube Shorts was launched in 2020 to compete with TikTok.",1);
m(3,"Platforms","YouTube sends a “Gold Play Button” to channels reaching how many subscribers?","1 million",["100,000","500,000","10 million"],"Silver is for 100,000 subscribers, gold for 1 million and diamond for 10 million.",2);
m(3,"Platforms","A “vlog” is…","A video blog",["A virtual log-in","A video game level","A long online game"],"Vlogs let creators share their daily life or opinions on video.",1);
vf(3,"Twitch began as a platform called Justin.tv.",true,"Justin.tv’s gaming section became Twitch in 2011 and Amazon bought it in 2014.",3);

m(4,"Slang","If something is “bussin”, it is…","Really good, especially food",["Broken","Very expensive","Old-fashioned"],"“Bussin’” comes from African-American slang and was popular on TikTok.",2);
m(4,"Slang","If you “slay”, you…","Do something exceptionally well",["Cry loudly","Quit your job","Fall asleep"],"“You slayed that presentation!” is a compliment.",1);
m(4,"Slang","If you are “salty”, you are…","Bitter or upset about something",["Very thirsty","Very rich","Very tired"],"The word is often used for losing gracefully, or not.",2);
m(4,"Slang","A “stan” is…","An extremely devoted fan",["A type of student","A stand-up comic","A security guard"],"The word comes from Eminem’s 2000 song “Stan”.",2);
m(4,"Slang","If someone calls you a “simp”, they mean you…","Do too much for someone you like",["Are very smart","Hate everyone","Dress badly"],"The word is often used jokingly among teenagers.",3);
m(4,"Slang","If something is “mid”, it is…","Mediocre",["Excellent","Very large","In the middle of a queue"],"“That movie was mid” means “it was just average”.",1);
m(4,"Slang","If you “flex” on social media, you…","Show off",["Exercise","Delete your account","Chat privately"],"Posting a new car or watch would be a typical flex.",1);
m(4,"Slang","If someone has “drip”, they have…","Stylish clothes and accessories",["A cold","A leaky tap","A lot of debt"],"“Drip” means a fashionable outfit.",1);
m(4,"Slang","What does “IRL” mean?","In real life",["In regular language","Is really late","Internet response link"],"People say IRL to contrast with online life.",1);
m(4,"Slang","What does “SMH” mean?","Shaking my head",["So much hate","Super mega happy","Send me home"],"You use SMH to show disappointment or disbelief.",2);
m(4,"Slang","What does “NGL” mean in a message?","Not gonna lie",["Next great level","No good luck","Never going live"],"“NGL, that was amazing” means “honestly, that was amazing”.",2);
m(4,"Slang","What does “AFK” mean in gaming?","Away from keyboard",["A fast kill","After fun kicks","Always for kids"],"Players write AFK when they step away from the game.",2);
m(4,"Slang","If something is described as “cheugy”, it is…","Outdated or trying too hard to be trendy",["Very expensive","Very cheap","Extremely tasty"],"The word was popular on TikTok in 2021.",3);
vf(4,"“Yeet” means to throw something with great force.",true,"The word spread from a 2014 viral dance and became a slang verb.",2);

return {id:"internet",title:"Internet & TikTok Culture",kw:"internet tiktok memes viral instagram youtube twitch slang gen z creators social media quiz",subject:"Apps, memes, viral moments and slang: are you terminally online?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
