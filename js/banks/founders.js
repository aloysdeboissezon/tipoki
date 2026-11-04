// Built-in bank: Founders, unicorns & scandals (English). Tech founders, startup lore, business scandals, big deals and European champions.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard.
window.BANK_FOUNDERS=(function(){
const SESS={1:"Famous founders",2:"Startup origin stories",3:"Scandals & collapses",4:"Mega deals & acquisitions",5:"European & Spanish champions"};
const TAGS={1:"Founders",2:"Origin stories",3:"Scandals",4:"Deals",5:"Europe & Spain"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Famous founders =====================
m(1,"Founder","Who co-founded Microsoft with Paul Allen in 1975?","Bill Gates",["Steve Jobs","Larry Ellison","Michael Dell"],"Microsoft was founded in Albuquerque, New Mexico, in 1975.",1);
m(1,"Founder","Who founded Amazon?","Jeff Bezos",["Jack Ma","Elon Musk","Reed Hastings"],"Bezos started Amazon in 1994 in Bellevue, Washington; the site opened in 1995.",1);
m(1,"Founder","Who is the CEO of both Tesla and SpaceX?","Elon Musk",["Jeff Bezos","Tim Cook","Sundar Pichai"],"Elon Musk joined Tesla early and became CEO in 2008; he founded SpaceX in 2002.",1);
m(1,"Founder","Who co-founded Google with Larry Page?","Sergey Brin",["Eric Schmidt","Marissa Mayer","Peter Thiel"],"Page and Brin met at Stanford and founded Google in 1998.",1);
m(1,"Founder","Which co-founder of Apple designed the Apple I and II computers?","Steve Wozniak",["Tim Cook","Jony Ive","Mike Markkula"],"“Woz” was the engineer, Jobs the visionary and marketer.",2);
m(1,"Founder","Who founded the Virgin Group?","Richard Branson",["Alan Sugar","James Dyson","Philip Green"],"Branson started with a student magazine and a record shop before Virgin Atlantic in 1984.",1);
m(1,"Founder","Who founded the clothing group Inditex, owner of Zara?","Amancio Ortega",["Isak Andic","Josep Tous","Rafael del Pino"],"Ortega, born in 1936, started with a shop making women’s dressing gowns.",2);
m(1,"Founder","Who founded the Chinese e-commerce giant Alibaba?","Jack Ma",["Pony Ma","Jeff Bezos","Robin Li"],"Jack Ma was an English teacher before founding Alibaba in 1999 in Hangzhou.",2);
m(1,"Founder","Which entrepreneur co-founded PayPal and was an early investor in Facebook?","Peter Thiel",["Mark Cuban","Marc Andreessen","Larry Ellison"],"Thiel wrote “Zero to One” and is known for the “PayPal Mafia”.",3);
m(1,"Founder","Who founded the fashion label Chanel in 1910?","Coco Chanel",["Christian Dior","Yves Saint Laurent","Hubert de Givenchy"],"Gabrielle “Coco” Chanel opened her first hat shop in Paris in 1910.",2);
vf(1,"Mark Zuckerberg founded Facebook while he was a student at Harvard.",true,"Facebook launched at Harvard in February 2004; he later left to run it full-time.",1);
m(1,"Founder","Who founded the Swedish music streaming service Spotify with Martin Lorentzon?","Daniel Ek",["Max Martin","Jimmy Iovine","Niklas Zennström"],"Spotify launched in 2008 in Stockholm.",2);
ty(1,"Who is the co-founder of Apple who died in 2011? (surname)",["jobs","steve jobs"],"Steve Jobs.",1);
ty(1,"Which tech giant did Bill Gates found? (one word)",["microsoft"],"Microsoft.",1);

// ===================== 2. Startup origin stories =====================
m(2,"Origin","Which social network began in a Harvard dorm room in 2004?","Facebook",["Snapchat","Pinterest","Twitter"],"Mark Zuckerberg’s dorm project at Harvard became Facebook.",1);
m(2,"Origin","Where did Airbnb’s founders first rent out air mattresses in 2007?","Their own apartment in San Francisco",["A hotel lobby","A university campus","A farm in Nebraska"],"Brian Chesky and Joe Gebbia hosted guests on air mattresses, giving the “Air Bed & Breakfast” its name.",2);
m(2,"Origin","What was Instagram’s predecessor app called?","Burbn",["Snapbook","Photoshare","Pixlr"],"Burbn was a check-in app; the founders kept only its photo feature and pivoted.",3);
m(2,"Origin","Twitter was born inside a podcasting startup. What was it called?","Odeo",["Podify","Tweeter","Blurp"],"Odeo was a podcasting platform; it pivoted after Apple launched iTunes podcasts.",3);
m(2,"Origin","Which company was founded by Reed Hastings to rent DVDs by mail?","Netflix",["Blockbuster","Hulu","Roku"],"Netflix later moved to streaming and original content.",1);
m(2,"Origin","Which company was originally called “Cadabra.com”, before being renamed in 1995?","Amazon",["eBay","Zappos","Alibaba"],"Jeff Bezos renamed Cadabra after the Amazon river, the biggest in the world, to suggest scale.",3);
m(2,"Origin","Which Spanish company delivers anything from your phone and was founded in Barcelona in 2015?","Glovo",["Cabify","Wallapop","Idealista"],"Glovo, founded by Oscar Pierre and Sacha Michaud, was bought by Delivery Hero.",2);
m(2,"Origin","Which Spanish marketplace for second-hand items was born in Barcelona in 2013?","Wallapop",["Milanuncios","Vinted","Segundamano"],"Wallapop grew into one of Spain’s best-known apps.",2);
m(2,"Origin","Which company’s founders were Stanford PhD students who named it after a very large number (googol)?","Google",["Yahoo","Oracle","Cisco"],"“Googol” = 10^100, misspelled into Google.",1);
m(2,"Origin","In which kind of place do many tech legends say they started (Apple, HP, Amazon, Google)?","A garage",["A bank","A library","A cinema"],"The garage story is a Silicon Valley classic.",1);
vf(2,"Uber started as “UberCab”, a black-car service in San Francisco in 2009–2010.",true,"UberCab was shortened to Uber in 2011.",3);
m(2,"Origin","What did Slack start out as?","A game called Glitch",["A spreadsheet tool","A video platform","A delivery app"],"Stewart Butterfield’s team built an internal chat tool for Glitch and pivoted to it when the game failed.",3);
ty(2,"Which FAANG company makes the iPhone? (one word)",["apple"],"FAANG = Facebook, Amazon, Apple, Netflix, Google.",1);
ty(2,"In which US state is Silicon Valley? (one word)",["california"],"Silicon Valley is in northern California.",2);

// ===================== 3. Scandals & collapses =====================
m(3,"Scandal","Which blood-testing startup founded by Elizabeth Holmes collapsed after being exposed as a fraud?","Theranos",["Moderna","23andMe","Zocdoc"],"Theranos claimed it could run many tests from a few drops of blood; it didn’t work.",1);
m(3,"Scandal","Which energy company went bankrupt in 2001 after an accounting fraud?","Enron",["Shell","Exxon","BP"],"Enron hid debt through off-balance-sheet partnerships; its auditor Arthur Andersen also collapsed.",1);
m(3,"Scandal","Which cryptocurrency exchange collapsed in November 2022?","FTX",["Binance","Coinbase","Kraken"],"FTX’s founder Sam Bankman-Fried was convicted of fraud in 2023.",1);
m(3,"Scandal","Which carmaker was caught cheating on diesel emissions tests in 2015?","Volkswagen",["Toyota","Renault","Ford"],"“Dieselgate”: software detected tests and reduced emissions only then.",1);
m(3,"Scandal","What was the Ponzi scheme of Bernie Madoff?","Paying old investors with new investors’ money",["A tax evasion trick","A cheap loan scheme","A fake charity"],"Madoff’s fraud, exposed in 2008, was worth about $65 billion on paper.",2);
m(3,"Scandal","Which German payments company collapsed in 2020 after it was revealed €1.9bn was missing?","Wirecard",["N26","Adyen","Klarna"],"Wirecard was a DAX company; the missing money likely never existed.",2);
m(3,"Scandal","Which co-working company’s IPO was cancelled in 2019 and its CEO Adam Neumann forced out?","WeWork",["Regus","Airbnb","Uber"],"WeWork was once valued at $47bn and was criticised for its huge losses and governance.",2);
m(3,"Scandal","What did “Cambridge Analytica” scandal concern?","Misuse of Facebook users’ data for political advertising",["A banking hack","A fake cryptocurrency","Tax evasion in Panama"],"Revealed in 2018, it led to a record fine for Facebook.",2);
m(3,"Scandal","Which Spanish bank, saved with public money in 2012, merged into CaixaBank?","Bankia",["Banco Pastor","Sabadell","Bankinter"],"Bankia was rescued in 2012; its 2011 IPO later led to legal cases.",3);
m(3,"Scandal","The 2008 financial crisis was triggered mostly by problems in which market?","US subprime mortgages",["The oil market","The art market","Cryptocurrencies"],"Risky home loans were bundled into securities that lost value when borrowers defaulted.",2);
vf(3,"“Whistleblower” is the word for someone who exposes wrongdoing inside an organisation.",true,"Whistleblowers are protected by law in the EU under a 2019 directive.",1);
m(3,"Scandal","What does “insider trading” mean?","Trading shares using confidential information not yet public",["Trading inside a bank building","Trading between family members","Trading very quickly"],"It’s illegal in most countries because it gives an unfair advantage.",2);
ty(3,"What fraud company did Elizabeth Holmes found? (T……)",["theranos"],"Theranos.",2);
ty(3,"The 2015 emissions cheating scandal of Volkswagen is nicknamed “D…… gate”. Which word?",["diesel","dieselgate"],"Dieselgate.",2);

// ===================== 4. Mega deals & acquisitions =====================
m(4,"Deal","Which company bought Instagram in 2012 for about $1 billion?","Facebook",["Google","Twitter","Apple"],"Instagram had 13 employees at the time.",2);
m(4,"Deal","Which company bought YouTube in 2006 for $1.65 billion?","Google",["Microsoft","Yahoo","Apple"],"YouTube was only 18 months old.",2);
m(4,"Deal","In 2022, Elon Musk bought which social network for about $44 billion?","Twitter",["TikTok","Snapchat","Reddit"],"Twitter was renamed X in 2023.",1);
m(4,"Deal","Which Microsoft acquisition for $26.2 billion in 2016 was of the professional social network?","LinkedIn",["Skype","GitHub","Slack"],"Microsoft also bought GitHub in 2018 for $7.5 billion.",2);
m(4,"Deal","Disney bought which studio in 2012 for about $4 billion, getting Star Wars?","Lucasfilm",["Pixar","Marvel","DreamWorks"],"Lucasfilm came with Star Wars and Indiana Jones.",2);
m(4,"Deal","Which tech giant bought WhatsApp for about $19 billion in 2014?","Facebook",["Apple","Google","Tencent"],"WhatsApp had about 450 million users at the time.",2);
m(4,"Deal","Disney bought which comics company in 2009 for about $4 billion, getting Iron Man and the Avengers?","Marvel",["DC Comics","Pixar","Hasbro"],"Disney’s Marvel deal turned the Avengers into a film empire.",1);
m(4,"Deal","What does “M&A” stand for?","Mergers and acquisitions",["Marketing and advertising","Money and assets","Management and administration"],"M&A teams at banks and consulting firms advise on buying and selling companies.",1);
m(4,"Deal","What is a “hostile takeover”?","A purchase attempt that the target company’s board opposes",["A takeover of a competitor’s product","A purchase by a foreign government","A takeover during a strike"],"The bidder goes directly to shareholders.",2);
m(4,"Deal","Which phone company did Microsoft buy in 2013–14, hoping to get into smartphones?","Nokia",["BlackBerry","Motorola","HTC"],"The deal was valued at about $7.2 billion and was later written off.",3);
vf(4,"An “acquisition” always means two equal companies merge into a new one.",false,"In an acquisition one company buys another; a merger of equals is a different thing.",1);
m(4,"Deal","Which Spanish utility bought ScottishPower in 2007 for about £11.6 billion?","Iberdrola",["Telefónica","Repsol","Endesa"],"The deal made Iberdrola a major player in the UK and renewable energy.",3);
ty(4,"Which social media group, led by Mark Zuckerberg, bought Instagram and WhatsApp? (one word, now called Meta)",["facebook"],"Facebook (now Meta).",1);
ty(4,"Which company, founded by Jeff Bezos, bought Whole Foods in 2017? (one word)",["amazon"],"Amazon paid about $13.7 billion.",1);

// ===================== 5. European & Spanish champions =====================
m(5,"Europe","Which Swedish company started in 2008 and changed the way we listen to music?","Spotify",["Deezer","SoundCloud","Napster"],"Spotify was founded in Stockholm by Daniel Ek and Martin Lorentzon.",1);
m(5,"Europe","Which UK-based fintech offers a multi-currency card and a popular banking app, founded in London in 2015?","Revolut",["Monzo","Wise","Starling"],"Revolut was founded by Nikolay Storonsky and Vlad Yatsenko.",2);
m(5,"Europe","Which Swedish “buy now, pay later” company is based in Stockholm?","Klarna",["Affirm","Afterpay","Stripe"],"Klarna was founded in 2005.",2);
m(5,"Europe","Which Dutch company is a leading payments platform and listed in Amsterdam?","Adyen",["PayPal","Square","Nexi"],"Adyen is used by Uber, Spotify, Microsoft and many other global brands.",3);
m(5,"Spain","Which Madrid-based telecoms company is strong in Spain and Latin America?","Telefónica",["Iberdrola","Repsol","Naturgy"],"Telefónica is Spain’s largest telecoms operator and owns the Movistar brand.",2);
m(5,"Spain","Which Spanish bank has the largest total assets?","Santander",["BBVA","CaixaBank","Sabadell"],"Banco Santander is the largest Spanish bank, with operations across Europe and Latin America.",2);
m(5,"Spain","Which energy company, headquartered in Bilbao, is one of the world’s leaders in wind and renewable power?","Iberdrola",["Repsol","Cepsa","Naturgy"],"Iberdrola invests heavily in wind farms and electricity grids.",2);
m(5,"Spain","Which Barcelona-born startup is known for its conversational online forms and surveys?","Typeform",["SurveyMonkey","Jotform","Mailchimp"],"Typeform was founded in Barcelona in 2012 and counts millions of users.",3);
m(5,"Spain","Which Spanish founder created Cabify, a ride-hailing app launched in Madrid in 2011?","Juan de Antonio",["Oscar Pierre","Amancio Ortega","Sacha Michaud"],"Juan de Antonio founded Cabify and is its CEO.",3);
m(5,"Europe","Which Danish company, from Billund, makes interlocking plastic bricks?","LEGO",["Mattel","Hasbro","Playmobil"],"LEGO has been owned by the Kirk Kristiansen family for generations.",2);
vf(5,"ESADE is a business school in Barcelona, which is also a global hub for startups, with events like Mobile World Congress.",true,"Barcelona hosts the Mobile World Congress every year and is one of Europe’s top startup cities.",1);
m(5,"Europe","Which airline from Ireland is Europe’s biggest low-cost airline?","Ryanair",["Vueling","Easyjet","Wizz Air"],"Ryanair carries over 150 million passengers a year.",1);
ty(5,"Which Swedish music-streaming company is known for its green logo? (one word)",["spotify"],"Spotify.",1);
ty(5,"Which Spanish fashion group owns Zara? (one word)",["inditex"],"Inditex.",1);

return {id:"founders",title:"Founders, Unicorns & Scandals",kw:"founders startups unicorns scandals theranos enron ftx wework acquisitions entrepreneurs spotify revolut zara inditex business esade bba mba",subject:"Famous founders, startup origin stories, scandals and big deals: the business stories everybody talks about.",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
