// Built-in bank: Big Tech, AI & entertainment business (English). Tech giants, product launches, the AI era, tech leaders, entertainment & gaming.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_BIGTECH=(function(){
const SESS={1:"The tech giants",2:"Products that changed everything",3:"The AI revolution",4:"Tech leaders",5:"Entertainment & gaming business"};
const TAGS={1:"Giants",2:"Products",3:"AI",4:"Leaders",5:"Entertainment"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. The tech giants =====================
m(1,"Giants","Which company owns Facebook, Instagram and WhatsApp?","Meta",["Alphabet","Microsoft","Snap"],"Meta Platforms, led by Mark Zuckerberg, was renamed from Facebook, Inc. in 2021.",1);
m(1,"Giants","Google’s parent company, created in 2015, is called…","Alphabet",["Meta","Oracle","Android Inc."],"Alphabet groups Google, YouTube, Waymo and other businesses.",2);
m(1,"Giants","In which Californian city is Apple’s headquarters?","Cupertino",["Palo Alto","San Francisco","Mountain View"],"Apple Park in Cupertino opened in 2017, a ring-shaped building.",2);
m(1,"Giants","Which division generates most of Amazon’s operating profit?","Amazon Web Services (AWS)",["Amazon Prime Video","Amazon Fresh","Kindle"],"AWS, the cloud business launched in 2006, is Amazon’s main profit engine.",3);
m(1,"Giants","Which company became the first to reach a $1 trillion market value, in 2018?","Apple",["Amazon","Microsoft","Google"],"Apple crossed the $1 trillion mark in August 2018.",2);
m(1,"Giants","Nvidia became one of the world’s most valuable companies thanks mainly to which product?","Graphics chips (GPUs) used for AI",["Smartphones","Search engines","Social networks"],"Nvidia’s chips are the backbone of AI training.",2);
m(1,"Giants","Samsung is a conglomerate from which country?","South Korea",["Japan","China","Taiwan"],"Samsung, founded in 1938, is based in Suwon, South Korea.",1);
m(1,"Giants","Alibaba, the Chinese e-commerce giant, was founded by…","Jack Ma",["Pony Ma","Lei Jun","Robin Li"],"Jack Ma, a former English teacher, founded Alibaba in 1999.",1);
m(1,"Giants","Which Taiwanese company makes the majority of the world’s most advanced chips?","TSMC",["Intel","Samsung","Foxconn"],"TSMC manufactures chips for Apple, Nvidia and AMD.",3);
m(1,"Giants","Which Dutch company is the only maker of the EUV lithography machines needed for the most advanced chips?","ASML",["Philips","Shell","Heineken"],"ASML, based in Veldhoven, supplies TSMC, Samsung and Intel.",3);
vf(1,"Huawei is a Chinese technology company.",true,"Huawei, founded in 1987 in Shenzhen, is a major telecom and smartphone maker.",1);
vf(1,"Microsoft owns LinkedIn, GitHub and Minecraft.",true,"They were bought in 2016 ($26 billion), 2018 ($7.5 billion) and 2014 ($2.5 billion) respectively.",2);

// ===================== 2. Products that changed everything =====================
m(2,"Launches","In which year was the first iPhone launched?","2007",["2003","2010","2012"],"Steve Jobs presented it in January 2007 and it went on sale in June.",1);
m(2,"Launches","Which operating system for smartphones is owned by Google?","Android",["iOS","Symbian","BlackBerry OS"],"Google bought Android Inc. in 2005.",1);
m(2,"Launches","Which video platform was founded in 2005 and bought by Google in 2006?","YouTube",["Vimeo","Twitch","Dailymotion"],"The first video on YouTube, “Me at the zoo”, was posted in April 2005.",1);
m(2,"Launches","In which year did Netflix launch its streaming service?","2007",["1997","2003","2012"],"Netflix moved from DVDs by mail to streaming in 2007.",2);
m(2,"Launches","Which company launched the voice assistant Alexa with its Echo speaker in 2014?","Amazon",["Google","Apple","Samsung"],"Echo was initially sold to Prime members by invitation.",3);
m(2,"Launches","The first iPad was launched in…","2010",["2007","2012","2015"],"Apple sold over 300,000 iPads on the first day.",2);
m(2,"Gaming","Which company makes the PlayStation?","Sony",["Nintendo","Microsoft","Sega"],"The first PlayStation launched in Japan in 1994.",1);
m(2,"Gaming","Who created Mario and Zelda at Nintendo?","Shigeru Miyamoto",["Hideo Kojima","Satoru Iwata","Masahiro Sakurai"],"Miyamoto created Donkey Kong, Mario and The Legend of Zelda.",3);
m(2,"Gaming","Pokémon GO, a game that made people walk around to catch creatures, launched in…","2016",["2010","2013","2020"],"It was developed by Niantic and had hundreds of millions of downloads.",2);
m(2,"Gaming","Which game company created Fortnite?","Epic Games",["Activision","Ubisoft","Riot Games"],"Fortnite launched in 2017 and became a cultural phenomenon.",2);
vf(2,"The first iPhone had an App Store at launch in 2007.",false,"The App Store opened in July 2008, one year after the iPhone.",3);
vf(2,"Google Maps launched in 2005.",true,"Google Maps launched in February 2005.",3);

// ===================== 3. The AI revolution =====================
m(3,"AI","Which company released ChatGPT in November 2022?","OpenAI",["Google","Meta","Microsoft"],"ChatGPT reached 100 million users in about two months, the fastest-growing consumer app at the time.",1);
m(3,"AI","Who is the CEO of OpenAI?","Sam Altman",["Elon Musk","Satya Nadella","Demis Hassabis"],"Altman was briefly fired by the board in November 2023 and then returned.",1);
m(3,"AI","Claude is an AI assistant made by which company?","Anthropic",["OpenAI","Mistral","DeepMind"],"Anthropic was founded in 2021 by former OpenAI researchers.",1);
m(3,"AI","Google’s family of AI models, launched in 2023, is called…","Gemini",["Bard Pro","Titan","Pixel AI"],"Gemini succeeded the earlier chatbot “Bard”.",1);
m(3,"AI","What does the “GPT” in ChatGPT stand for?","Generative Pre-trained Transformer",["General Purpose Technology","Global Processing Tool","Google Programming Text"],"A transformer is the neural network architecture behind most modern language models.",2);
m(3,"AI","Which 2017 Google research paper introduced the Transformer?","“Attention Is All You Need”",["“Deep Blue”","“The Master Algorithm”","“Neural Dreams”"],"The paper is the basis for GPT, Claude, Gemini and many others.",3);
m(3,"AI","In 2016, DeepMind’s AlphaGo defeated the world-class player Lee Sedol in which game?","Go",["Chess","Poker","Checkers"],"Go has more possible positions than atoms in the universe.",2);
m(3,"AI","An AI “hallucination” is when a model…","Gives a confident but false answer",["Refuses to answer","Crashes","Translates a language"],"This is why you should always double-check AI answers on important facts.",1);
m(3,"AI","Which tools generate images from text prompts?","Midjourney and DALL·E",["Excel and Word","Slack and Zoom","Notion and Trello"],"These tools use diffusion models to create images.",1);
m(3,"AI","The EU’s main law regulating artificial intelligence, adopted in 2024, is called the…","AI Act",["GDPR","Digital Markets Act","Data Act"],"The AI Act classifies AI systems by risk level.",3);
vf(3,"A “deepfake” is a realistic fake video or audio made with AI.",true,"Deepfakes can imitate real people and are a challenge for misinformation.",1);
vf(3,"Nvidia is mainly known for making smartphones.",false,"Nvidia is known for GPUs, which power games and AI.",1);

// ===================== 4. Tech leaders =====================
m(4,"CEOs","Who has been the CEO of Apple since 2011?","Tim Cook",["Jony Ive","Steve Wozniak","Phil Schiller"],"Cook succeeded Steve Jobs in August 2011.",1);
m(4,"CEOs","Who is the CEO of Microsoft, having taken over in 2014?","Satya Nadella",["Sundar Pichai","Bill Gates","Steve Ballmer"],"Nadella was born in Hyderabad, India, and pushed Microsoft towards the cloud.",2);
m(4,"CEOs","Who is the CEO of Google and Alphabet?","Sundar Pichai",["Larry Page","Eric Schmidt","Satya Nadella"],"Pichai became Google CEO in 2015 and Alphabet CEO in 2019.",2);
m(4,"CEOs","Who replaced Jeff Bezos as Amazon’s CEO in 2021?","Andy Jassy",["Werner Vogels","Jeff Wilke","Brad Stone"],"Jassy previously led Amazon Web Services.",3);
m(4,"CEOs","The Nvidia co-founder and CEO who always wears a black leather jacket is…","Jensen Huang",["Lisa Su","Jack Ma","Hock Tan"],"Huang co-founded Nvidia in 1993.",2);
m(4,"CEOs","Which Japanese investor, founder of SoftBank, famously invested early in Alibaba?","Masayoshi Son",["Hiroshi Mikitani","Akio Toyoda","Tadashi Yanai"],"Son’s $20 million investment in Alibaba became worth billions.",3);
m(4,"CEOs","Netflix was co-founded by Marc Randolph and…","Reed Hastings",["Ted Sarandos","Jeff Bezos","Bob Iger"],"Hastings became the long-time CEO and later executive chairman.",3);
m(4,"CEOs","The Apple co-founder known as “Woz”, who built the first Apple computers, is…","Steve Wozniak",["Steve Jobs","Ronald Wayne","Tim Cook"],"Wozniak designed the Apple I and Apple II.",2);
m(4,"CEOs","Which two Stanford students founded Google?","Larry Page and Sergey Brin",["Bill Gates and Paul Allen","Jack Dorsey and Evan Williams","Reid Hoffman and Peter Thiel"],"They met at Stanford and built the PageRank algorithm.",1);
m(4,"CEOs","Which billionaire owns SpaceX and Tesla?","Elon Musk",["Jeff Bezos","Bill Gates","Larry Ellison"],"Musk is also the owner of X, formerly Twitter.",1);
vf(4,"Mark Zuckerberg co-founded Facebook while studying at Harvard.",true,"He launched Facebook from his dorm room in 2004.",1);
vf(4,"Bill Gates and Paul Allen co-founded Apple.",false,"They co-founded Microsoft. Apple was co-founded by Steve Jobs, Steve Wozniak and Ronald Wayne.",1);

// ===================== 5. Entertainment & gaming business =====================
m(5,"Entertainment","Disney bought which three famous studios or franchises between 2006 and 2012?","Pixar, Marvel and Lucasfilm",["Universal, DreamWorks and Sony","Warner, HBO and Netflix","Paramount, Illumination and MGM"],"Pixar in 2006 (~$7.4 billion), Marvel in 2009 (~$4 billion) and Lucasfilm (Star Wars) in 2012 (~$4 billion).",2);
m(5,"Entertainment","Which Korean series became Netflix’s most-watched show at its 2021 launch?","Squid Game",["Crash Landing on You","Kingdom","Itaewon Class"],"Squid Game was watched by more than 100 million accounts in its first month.",1);
m(5,"Entertainment","Which film is the highest-grossing of all time, at about $2.9 billion?","Avatar (2009)",["Avengers: Endgame","Titanic","Star Wars: The Force Awakens"],"James Cameron’s Avatar regained the top spot after a re-release in 2021.",2);
m(5,"Entertainment","Which tour became the highest-grossing concert tour of all time, grossing over $2 billion?","Taylor Swift’s Eras Tour",["Coldplay’s Music of the Spheres","Beyoncé’s Renaissance","Ed Sheeran’s Divide"],"The Eras Tour ran from 2023 to 2024.",2);
m(5,"Entertainment","Which streaming service launched in November 2019 with “The Mandalorian” as its flagship show?","Disney+",["Peacock","Paramount+","Max"],"Disney+ reached 10 million subscribers on its first day.",1);
m(5,"Sports business","Which three countries host the 2026 FIFA World Cup?","USA, Canada and Mexico",["Spain, Portugal and Morocco","Brazil, Argentina and Chile","Japan, South Korea and China"],"It is the first World Cup with 48 teams.",1);
m(5,"Sports business","In which city were the 2024 Summer Olympics held?","Paris",["Tokyo","Los Angeles","Rome"],"Paris 2024 was the third time Paris hosted the Games after 1900 and 1924.",1);
m(5,"Sports business","Which Spanish football club plays at the Santiago Bernabéu stadium?","Real Madrid",["Atlético Madrid","Valencia CF","Sevilla FC"],"Real Madrid is one of the richest clubs in the world by revenue.",1);
m(5,"Gaming","Which company bought the studio behind Call of Duty and World of Warcraft (Activision Blizzard) for about $69 billion in 2023?","Microsoft",["Sony","Tencent","Amazon"],"It was the largest acquisition in gaming history.",3);
m(5,"Gaming","League of Legends is made by which company?","Riot Games",["Valve","Blizzard","EA"],"Riot is owned by the Chinese group Tencent.",3);
vf(5,"Spotify is a Swedish company.",true,"Spotify was founded in Stockholm in 2006.",1);
vf(5,"Minecraft is the best-selling video game of all time.",true,"It has sold over 300 million copies.",2);

// ===================== Typed answers =====================
ty(1,"Which company created the iPhone? (one word)",["Apple"],"Apple launched the iPhone in 2007.",1);
ty(2,"Which Japanese company makes Mario? (one word)",["Nintendo"],"Nintendo was founded in 1889 as a playing-card company.",1);
ty(3,"What does “AI” stand for? (two words)",["artificial intelligence"],"AI is the field of making machines perform tasks that normally need human intelligence.",1);
ty(3,"What is the name of the AI chatbot made by OpenAI? (one word)",["ChatGPT","Chat GPT"],"ChatGPT launched on 30 November 2022.",1);
ty(4,"Who is the Meta CEO who started Facebook at Harvard? (surname)",["Zuckerberg","Mark Zuckerberg"],"Mark Zuckerberg has led Meta since its founding.",1);
ty(5,"Which streaming service made “Stranger Things”? (one word)",["Netflix"],"Stranger Things debuted in 2016.",1);
ty(1,"What is the Chinese company that owns TikTok? (one word)",["ByteDance","Bytedance"],"ByteDance was founded in 2012 by Zhang Yiming.",2);
ty(2,"Which American company launched Windows? (one word)",["Microsoft"],"Windows 1.0 launched in 1985.",1);

// ===================== More questions (batch 2) =====================
m(1,"Giants","In the nickname FAANG for big tech stocks, which company does the “N” stand for?","Netflix",["Nvidia","Nokia","Nintendo"],"FAANG stands for Facebook, Apple, Amazon, Netflix and Google.",1);
m(1,"Giants","The “Magnificent Seven” tech stocks are Apple, Microsoft, Alphabet, Amazon, Nvidia, Meta and…","Tesla",["Netflix","Intel","Oracle"],"The group has driven a large share of US stock market gains since 2023.",2);
m(1,"Giants","Which company was the first to reach a market value of $3 trillion, in January 2022?","Apple",["Microsoft","Amazon","Saudi Aramco"],"Apple first passed $1 trillion in 2018 and $2 trillion in 2020.",3);
m(1,"Giants","Microsoft is headquartered in which Washington state city?","Redmond",["Seattle","Tacoma","Spokane"],"Redmond is close to Seattle and also hosts Nintendo of America.",3);
m(1,"Giants","Google’s headquarters, the “Googleplex”, are in which Californian city?","Mountain View",["Palo Alto","Cupertino","Menlo Park"],"Alphabet is also headquartered there.",2);
m(1,"Giants","Meta’s headquarters are in which Californian city?","Menlo Park",["Mountain View","Cupertino","Santa Clara"],"Facebook moved to its Menlo Park campus in 2011.",3);
m(1,"Giants","Which Chinese tech giant owns the messaging app WeChat?","Tencent",["Alibaba","Baidu","Xiaomi"],"WeChat is used by over a billion people and works as a messaging and payment app.",2);
m(1,"Giants","Which company’s cloud platform is called Azure?","Microsoft",["Amazon","Google","IBM"],"Azure is the second-largest cloud platform after Amazon Web Services.",1);
vf(1,"Oracle is best known for its database software.",true,"Larry Ellison co-founded Oracle in 1977.",2);
vf(1,"Intel manufactures all the chips inside every iPhone.",false,"Apple designs its own chips, and most are manufactured by TSMC in Taiwan.",3);

m(2,"Products","In which year did Apple launch the first iPod?","2001",["1999","2003","2005"],"“1,000 songs in your pocket” changed the music industry.",2);
m(2,"Products","Which company launched the Kindle e-reader in 2007?","Amazon",["Apple","Sony","Barnes & Noble"],"The Kindle helped Amazon dominate digital books.",2);
m(2,"Products","Which video-meeting app boomed during the 2020 lockdowns?","Zoom",["Slack","Dropbox","Skype"],"Zoom went from 10 million to over 300 million daily meeting participants in a few months.",1);
m(2,"Products","Which company launched the Vision Pro mixed-reality headset in 2024?","Apple",["Meta","Sony","Samsung"],"It costs $3,499 in the US and runs on visionOS.",1);
m(2,"Products","The first commercial Android smartphone, the HTC Dream, was released in which year?","2008",["2005","2010","2012"],"It came a year after the first iPhone.",3);
m(2,"Products","Which Japanese company developed the QR code in 1994 for tracking car parts?","Denso Wave (Toyota group)",["Sony","Panasonic","Nintendo"],"QR means “quick response”. The inventors did not enforce their patent, so everyone could use it.",3);
m(2,"Products","The name “Bluetooth” comes from…","A Danish Viking king",["A blue tooth in a logo","A blueberry company","A Finnish lake"],"King Harald “Bluetooth” united Denmark, as the technology unites devices.",3);
vf(2,"“Wi-Fi” officially stands for “Wireless Fidelity”.",false,"Wi-Fi is just a brand name chosen by marketers and doesn’t stand for anything.",3);
vf(2,"The first email was sent in the early 1970s.",true,"Ray Tomlinson sent the first network email in 1971 and chose the @ sign.",3);
vf(2,"The iPhone 15, released in 2023, uses a USB-C charging port.",true,"EU rules pushed Apple to replace its Lightning connector.",2);

m(3,"Basics","What does “LLM” stand for in AI?","Large language model",["Long learning machine","Linked logic module","Limited language method"],"LLMs like GPT and Claude are trained on vast amounts of text to predict the next word.",1);
m(3,"Basics","What is “generative AI”?","AI that creates new content, such as text or images",["AI that only sorts data","A very fast computer","AI used only for games"],"Tools like ChatGPT, Midjourney and Sora are generative AI.",1);
m(3,"Basics","What does “AGI” stand for?","Artificial general intelligence",["Automated graphics interface","Advanced game intelligence","Applied global internet"],"AGI would match human abilities across many tasks, which no current system does reliably.",2);
m(3,"Basics","Why are GPUs important for training AI?","They can perform many calculations in parallel",["They store the internet","They are cheaper than CPUs","They connect to Wi-Fi faster"],"Nvidia’s GPUs became the engine of the AI boom.",2);
m(3,"Basics","What are “tokens” in a language model?","Small pieces of text that the model processes",["Digital coins","Passwords","Paid subscriptions"],"A token can be a word, part of a word or punctuation, so “hamburger” could be several.",3);
m(3,"History","Which computer beat the chess world champion Garry Kasparov in 1997?","Deep Blue",["AlphaZero","Watson","Stockfish"],"IBM’s Deep Blue won a six-game match 3½ to 2½.",2);
m(3,"History","Which IBM system won the quiz show Jeopardy! in 2011?","Watson",["Deep Blue","Siri","Alexa"],"Watson beat the champions Ken Jennings and Brad Rutter.",3);
m(3,"People","Which “godfather of AI” left Google in 2023 to warn about the risks of the technology?","Geoffrey Hinton",["Yann LeCun","Andrew Ng","Demis Hassabis"],"Hinton won the 2024 Nobel Prize in Physics with John Hopfield.",3);
m(3,"Companies","Which Google DeepMind system predicted protein structures and contributed to a 2024 Nobel Prize in Chemistry?","AlphaFold",["AlphaGo","AlphaZero","Gemini"],"Demis Hassabis and John Jumper shared the prize for AlphaFold.",3);
m(3,"Companies","Llama, a family of open AI models, is made by which company?","Meta",["Google","Microsoft","Apple"],"Meta released the models for free use, which helped many startups.",2);
m(3,"Companies","Mistral AI, a European AI startup, is based in which country?","France",["Germany","Spain","United Kingdom"],"Mistral was founded in Paris in 2023 by former DeepMind and Meta researchers.",2);
vf(3,"Nvidia’s chips are widely used to train AI models.",true,"Nvidia’s market value soared past $3 trillion thanks to AI demand.",1);

m(4,"Founders","Which British designer led Apple’s design team in the era of the iMac, iPod and iPhone?","Jony Ive",["Tim Cook","Phil Schiller","Craig Federighi"],"Jony Ive left Apple in 2019 to found his own design firm, LoveFrom.",2);
m(4,"Founders","Who co-founded the database giant Oracle?","Larry Ellison",["Larry Page","Scott McNealy","Michael Dell"],"Larry Ellison is one of the richest people in the world.",3);
m(4,"Founders","Who founded Dell Technologies from his university dorm room?","Michael Dell",["Michael Bloomberg","Mark Cuban","Marc Benioff"],"Michael Dell started building PCs at the University of Texas in 1984.",2);
m(4,"Founders","Who founded the professional social network LinkedIn?","Reid Hoffman",["Peter Thiel","Jack Dorsey","Evan Spiegel"],"Hoffman co-founded LinkedIn in 2002 and sold it to Microsoft in 2016.",3);
m(4,"Founders","Who founded the video-conferencing company Zoom?","Eric Yuan",["Jack Ma","Satya Nadella","Jensen Huang"],"Yuan was an engineer at Cisco before starting Zoom in 2011.",3);
m(4,"Founders","Which siblings co-founded the AI company Anthropic?","Dario and Daniela Amodei",["Sam and Jack Altman","Elon and Kimbal Musk","Cameron and Tyler Winklevoss"],"They left OpenAI in 2021 to build Anthropic with a focus on AI safety.",3);
vf(4,"Steve Jobs was forced out of Apple in 1985 and returned in 1997.",true,"After the failure of NeXT and the success of Pixar, he came back and led Apple until 2011.",2);
vf(4,"Bill Gates is still the CEO of Microsoft.",false,"He stepped down as CEO in 2000. Steve Ballmer then Satya Nadella took over.",1);

m(5,"Gaming","Which company runs the Steam PC game store?","Valve",["Epic Games","Ubisoft","Blizzard"],"Valve also created Half-Life and Counter-Strike.",2);
m(5,"Gaming","Grand Theft Auto is made by which studio?","Rockstar Games",["Ubisoft","Activision","Bethesda"],"GTA V has sold more than 200 million copies.",2);
m(5,"Gaming","Candy Crush Saga was created by which company, later bought by Activision?","King",["Zynga","Supercell","Rovio"],"King is based in Barcelona and Stockholm, among other cities.",3);
m(5,"Music","Which company is the world’s biggest music company by market share?","Universal Music Group",["Sony Music","Warner Music","Spotify"],"UMG is headquartered in the Netherlands and manages stars like Taylor Swift.",3);
m(5,"Streaming","Which company bought the live-streaming platform Twitch in 2014 for about $970 million?","Amazon",["Google","Microsoft","Meta"],"Twitch is the world’s biggest platform for streaming video games.",3);
vf(5,"Spotify pays artists a small fraction of a cent per stream.",true,"Payments vary by country, but are usually between $0.003 and $0.005 per stream.",2);

ty(1,"Which company’s cloud service is called AWS? (one word)",["Amazon"],"Amazon Web Services is the world’s biggest cloud provider.",1);

return {id:"bigtech",title:"Big Tech, AI & Entertainment",kw:"big tech apple google microsoft amazon meta nvidia ai chatgpt openai anthropic gaming disney netflix spotify technology business entertainment sports",subject:"Tech giants, AI, gaming and entertainment: who built the modern world?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
