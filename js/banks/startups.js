// Built-in bank: Startup legends & flops (English). Founders, spectacular failures, big deals, Spanish startups, funding words.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_STARTUPS=(function(){
const SESS={1:"Founders & origin stories",2:"Spectacular flops",3:"Big deals & unicorns",4:"Made in Spain",5:"Funding & startup lingo"};
const TAGS={1:"Founders",2:"Flops",3:"Deals",4:"Spain",5:"Lingo"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Founders & origin stories =====================
m(1,"Origins","What was the first product Amazon sold online?","Books",["Electronics","Music CDs","Toys"],"Jeff Bezos started Amazon in 1994 as an online bookstore before adding everything else.",1);
m(1,"Origins","Netflix started its business by doing what?","Renting DVDs by mail",["Streaming series","Producing films","Selling TVs"],"Netflix began in 1997 as a DVD-by-mail rental service and launched streaming in 2007.",1);
m(1,"Origins","Facebook was created in 2004 by Mark Zuckerberg while he was a student at which university?","Harvard",["Stanford","MIT","Yale"],"Zuckerberg launched “TheFacebook” from his Harvard dorm room in February 2004.",1);
m(1,"Origins","What was Google’s original name when Larry Page and Sergey Brin built it at Stanford?","BackRub",["Goggle","PageRank","Alphabet"],"The search engine was first called BackRub because it analysed “back links”. Google came in 1997–98.",2);
m(1,"Origins","Airbnb started when its founders rented out what to conference guests in San Francisco?","Air mattresses in their living room",["Spare bikes","Parking spaces","Rooftop terraces"],"The idea began as “AirBed & Breakfast” in 2007, literally air beds plus breakfast.",2);
m(1,"Origins","Who was the little-known third co-founder of Apple in 1976, who sold his stake within weeks?","Ronald Wayne",["Mike Markkula","Paul Allen","Steve Ballmer"],"Ronald Wayne co-founded Apple with Steve Jobs and Steve Wozniak and sold his 10% stake for $800 shortly after.",3);
m(1,"Origins","Which Swedish city is the home of Spotify, founded by Daniel Ek and Martin Lorentzon?","Stockholm",["Gothenburg","Malmö","Uppsala"],"Spotify was founded in Stockholm in 2006.",2);
m(1,"Origins","What did the toy brand LEGO’s name come from?","The Danish words “leg godt”, meaning “play well”",["The founder’s dog","A Latin word for bricks","The initials of three founders"],"Ole Kirk Christiansen, a Danish carpenter, combined “leg godt” into LEGO in 1934.",3);
m(1,"Origins","Who founded the fashion giant Zara’s parent company Inditex?","Amancio Ortega",["Isak Andic","Bernard Arnault","Ingvar Kamprad"],"Amancio Ortega opened the first Zara store in A Coruña, Galicia, in 1975.",2);
m(1,"Origins","IKEA’s name combines the founder’s initials with the farm and village where he grew up. Who was the founder?","Ingvar Kamprad",["Anders Holch","Jan Carlzon","Stefan Persson"],"IKEA = Ingvar Kamprad, Elmtaryd (farm), Agunnaryd (village). He started at age 17.",3);
vf(1,"Uber was originally launched under the name UberCab.",true,"Travis Kalanick and Garrett Camp launched UberCab in San Francisco in 2009 and shortened the name later.",3);
vf(1,"Microsoft was founded in Silicon Valley, California.",false,"Bill Gates and Paul Allen founded Microsoft in Albuquerque, New Mexico, in 1975. It moved to Washington state later.",3);

// ===================== 2. Spectacular flops =====================
m(2,"Fraud","Which founder promised to run hundreds of medical tests from a single drop of blood, then was convicted of fraud?","Elizabeth Holmes (Theranos)",["Adam Neumann (WeWork)","Sam Bankman-Fried (FTX)","Travis Kalanick (Uber)"],"Theranos was once valued at around $9 billion before its technology was shown not to work. Holmes was sentenced to prison.",1);
m(2,"Fraud","Which crypto exchange collapsed in November 2022, leading to the conviction of its founder Sam Bankman-Fried?","FTX",["Binance","Coinbase","Kraken"],"FTX filed for bankruptcy in November 2022 with billions of customer funds missing.",1);
m(2,"Fraud","Which 2017 luxury music festival in the Bahamas became an infamous scam, founded by Billy McFarland?","Fyre Festival",["Coachella","Tomorrowland","Ultra"],"Guests arrived to find disaster-relief tents and cheese sandwiches instead of luxury villas. Two Netflix and Hulu documentaries followed.",1);
m(2,"Fraud","Which German fintech collapsed in 2020 after admitting that about €1.9 billion did not exist?","Wirecard",["Deutsche Bank","N26","Zalando"],"Wirecard was a DAX-listed payments company. Its collapse became Germany’s biggest post-war accounting scandal.",3);
m(2,"Fraud","Which energy company went bankrupt in 2001 after hiding debt through accounting fraud, taking its auditor Arthur Andersen down with it?","Enron",["WorldCom","Lehman Brothers","Tyco"],"Enron’s collapse led to the Sarbanes-Oxley Act of 2002 on corporate governance.",2);
m(2,"Missed the future","Which company invented the digital camera in 1975 but filed for bankruptcy in 2012?","Kodak",["Polaroid","Fujifilm","Canon"],"Kodak engineer Steve Sasson built the first digital camera, but the company feared it would hurt its film business.",2);
m(2,"Missed the future","Which video rental giant turned down the chance to buy Netflix in 2000 and later went bankrupt?","Blockbuster",["Hollywood Video","Redbox","Tower Records"],"Blockbuster passed on buying Netflix and filed for bankruptcy in 2010.",2);
m(2,"Missed the future","Nokia sold its phone business in 2014 to which company, after losing the smartphone race?","Microsoft",["Apple","Samsung","Google"],"Nokia dominated mobile phones in the 2000s but did not respond fast enough to the iPhone and Android.",2);
m(2,"Hype","Which short-video streaming service raised about $1.75 billion, launched in April 2020 and shut down within a year?","Quibi",["Vine","Periscope","Clubhouse"],"Quibi (“quick bites”) was designed for phones only and never found its audience.",2);
m(2,"Hype","Which company sold a $400 juice press that investigators showed was no better than squeezing the packs by hand?","Juicero",["Nutribullet","Keurig","Peloton"],"Juicero raised about $120 million before shutting down in 2017.",3);
m(2,"Hype","In the dot-com bubble, which online pet store with a sock-puppet mascot IPO’d in 2000 and shut down within the year?","Pets.com",["Chewy","Petco","Amazon Pets"],"Pets.com spent heavily on marketing, including a Super Bowl ad, and went bankrupt in November 2000.",2);
vf(2,"WeWork’s planned IPO in 2019 was cancelled after investors questioned its valuation and governance.",true,"WeWork was valued at about $47 billion privately but the IPO was pulled and Adam Neumann stepped down.",2);
vf(2,"Silicon Valley Bank collapsed in March 2023.",true,"SVB was the biggest US bank failure since 2008 and was caused by a run on deposits.",2);

// ===================== 3. Big deals & unicorns =====================
m(3,"Vocabulary","A “unicorn” is a private startup valued at more than…","$1 billion",["$100 million","$10 billion","$500 million"],"The term was coined by investor Aileen Lee in 2013. A “decacorn” is valued above $10 billion.",1);
m(3,"Deals","Facebook bought Instagram in 2012 for about how much?","$1 billion",["$100 million","$10 billion","$50 billion"],"Instagram had 13 employees and about 30 million users when Facebook bought it.",2);
m(3,"Deals","Facebook bought WhatsApp in 2014 for roughly…","$19 billion",["$1 billion","$5 billion","$50 billion"],"It was Facebook’s biggest acquisition ever, at about $19 billion in cash and shares.",2);
m(3,"Deals","Google bought YouTube in 2006 for about…","$1.65 billion",["$16.5 million","$165 million","$16.5 billion"],"YouTube was only 18 months old when Google paid $1.65 billion in stock.",3);
m(3,"Deals","Which professional social network did Microsoft buy in 2016 for about $26 billion?","LinkedIn",["Skype","GitHub","Slack"],"Microsoft acquired LinkedIn in 2016 and GitHub in 2018 (for $7.5 billion).",2);
m(3,"Stories","Facebook changed its parent company name in 2021 to…","Meta",["Alphabet","Oculus","Horizon"],"Mark Zuckerberg renamed the group Meta to focus on the “metaverse”.",1);
m(3,"Stories","In 2023, Twitter was renamed…","X",["Y","Z","T"],"Elon Musk, who bought Twitter in 2022 for about $44 billion, rebranded it as X.",1);
m(3,"Stories","Which company owns TikTok?","ByteDance",["Tencent","Alibaba","Baidu"],"ByteDance is headquartered in Beijing and also created Douyin, TikTok’s Chinese version.",1);
m(3,"IPOs","Spotify went public in 2018 on the New York Stock Exchange through what unusual route?","A direct listing",["A crowdfunding campaign","A merger with a SPAC","A government sale"],"In a direct listing, no new shares are sold: existing shareholders sell directly on the exchange.",3);
m(3,"IPOs","Which home-sharing startup had one of 2020’s biggest IPOs in December, during the pandemic?","Airbnb",["Uber","Lyft","Booking.com"],"Airbnb went public in December 2020, despite losing most of its business in spring that year.",2);
vf(3,"SpaceX was founded by Elon Musk in 2002.",true,"SpaceX was founded in 2002 with the long-term goal of making life multiplanetary.",1);
vf(3,"A “decacorn” is a startup valued at more than $10 billion.",true,"Deca = ten, so a decacorn is ten times a unicorn, i.e. over $10 billion.",2);

// ===================== 4. Made in Spain =====================
m(4,"Barcelona","Glovo, the delivery app founded in 2015 by Oscar Pierre, was born in which city?","Barcelona",["Madrid","Valencia","Seville"],"Glovo was founded in Barcelona and later sold a majority to Delivery Hero.",2);
m(4,"Barcelona","Wallapop is a Spanish app for what?","Buying and selling second-hand items",["Booking taxis","Ordering food","Learning languages"],"Wallapop was founded in Barcelona in 2013 as a mobile marketplace for used goods.",1);
m(4,"Barcelona","Typeform, famous for its conversational online forms, was founded in which Spanish city?","Barcelona",["Bilbao","Málaga","Zaragoza"],"Typeform started in Barcelona in 2012 and grew into a global brand.",3);
m(4,"Brands","Chupa Chups lollipops were invented in Barcelona. Which famous artist designed the logo in 1969?","Salvador Dalí",["Pablo Picasso","Joan Miró","Antoni Gaudí"],"Dalí drew the daisy-shaped logo in under an hour. It was placed on top of the lollipop to be visible.",2);
m(4,"Brands","The company behind Zara, Inditex, has its headquarters in which small Galician town?","Arteixo",["Vigo","Santiago de Compostela","Pontevedra"],"Inditex is based in Arteixo, near A Coruña, and is one of the biggest fashion groups in the world.",2);
m(4,"Brands","Which Spanish brand known for colourful clothes uses the slogan “La vida es chula”, based in Barcelona and founded by a Swiss entrepreneur?","Desigual",["Mango","Bershka","Massimo Dutti"],"Thomas Meyer founded Desigual in Barcelona in 1984.",3);
m(4,"Brands","SEAT, the car maker based in Martorell near Barcelona, belongs to which group?","Volkswagen Group",["Stellantis","Renault Group","Toyota"],"SEAT has been part of the Volkswagen Group since the 1980s–90s; CUPRA is its performance brand.",2);
m(4,"Events","Which huge tech event takes place every year at Fira Barcelona?","Mobile World Congress",["CES","Web Summit","Slush"],"MWC brings over 100,000 visitors to Barcelona. 4YFN is its startup event.",1);
m(4,"Banks","Banco Santander, founded in 1857, is named after a northern port city. Of which Spanish region is that city the capital?","Cantabria",["Asturias","Galicia","Basque Country"],"The bank started in Santander, capital of Cantabria, and is now one of the largest banks in Europe.",3);
m(4,"Economy","Which sector is by far Spain’s best-known economic engine?","Tourism",["Mining","Shipbuilding","Coal"],"Tourism accounts for roughly one eighth of Spain’s GDP.",1);
vf(4,"Freepik, the graphic resources platform, was founded in Málaga.",true,"Freepik started in Málaga in 2010 and later added AI image tools.",3);
vf(4,"Spain adopted the euro in 2002 with the physical coins and banknotes.",true,"The euro was introduced as cash on 1 January 2002 in the original twelve countries including Spain.",1);

// ===================== 5. Funding & startup lingo =====================
m(5,"Rounds","What is a “seed round”?","The first funding a startup raises from outside investors",["The last round before an IPO","A loan from a bank","Money from the government only"],"Seed money pays for the earliest development, before Series A, B, C and so on.",1);
m(5,"Rounds","Which round typically follows the seed round?","Series A",["Series Z","IPO","Series 0"],"After seed come Series A, B, C… each with a higher valuation if things go well.",1);
m(5,"Cash","What is a startup’s “burn rate”?","How fast it spends its cash",["How quickly it grows","How often it hires","The interest rate on its debt"],"Burn rate is usually measured monthly. It is net cash going out each month.",1);
m(5,"Cash","What is the “runway” of a startup?","The number of months until it runs out of cash",["The time to its IPO","The size of its office","The length of its pitch"],"Runway = cash in the bank ÷ monthly burn.",2);
m(5,"Strategy","What does “to pivot” mean in a startup?","To make a major change of strategy or product",["To fire the founders","To raise a new round","To move offices"],"Famous pivots: Instagram (from Burbn), Slack (from the game Glitch), YouTube (from video dating).",1);
m(5,"Strategy","“Bootstrapping” a startup means…","Funding it with your own money and revenue",["Raising money from VCs","Selling it quickly","Borrowing from friends only"],"Mailchimp, Basecamp and GitHub in the early years are known bootstrapped companies.",2);
m(5,"People","An “angel investor” is…","A wealthy individual who invests personal money in early startups",["An investment bank","A government agency","A venture capital firm"],"Angels typically invest before institutional VCs and often bring mentoring too.",1);
m(5,"People","Which famous startup accelerator launched Airbnb, Dropbox and Stripe?","Y Combinator",["Techstars","500 Startups","Sequoia"],"Y Combinator was founded in 2005 by Paul Graham and others, and offers money and mentoring for equity.",2);
m(5,"Valuation","A “down round” happens when a startup raises money at…","A lower valuation than its previous round",["A higher valuation than before","The same price as an IPO","No valuation at all"],"Down rounds dilute founders more and often signal trouble.",3);
m(5,"Valuation","What does “dilution” mean for early shareholders?","Their percentage ownership falls when new shares are issued",["Their shares lose their voting rights","Their shares are cancelled","Their company is sold"],"If you own 20% and the company issues new shares to investors, your stake becomes smaller, even if the value of it may grow.",2);
m(5,"Exits","Which two outcomes are the typical “exits” for a startup’s investors?","An acquisition or an IPO",["A bank loan or a government grant","A bankruptcy or a pivot","A rebrand or a new CEO"],"An exit is the moment investors can turn their shares into cash.",2);
vf(5,"An “elevator pitch” is supposed to last about 30 minutes.",false,"An elevator pitch is about 30–60 seconds: the time of an elevator ride.",1);

// ===================== Typed answers =====================
ty(1,"Which country did the founders of Skype, Niklas Zennström and Janus Friis, build its software team in? (a small Baltic country)",["Estonia"],"Skype’s engineering was done in Tallinn, Estonia, which helped make Estonia known for startups.",3);
ty(2,"What is the name of the Chinese-founded fast-fashion giant that sells ultra-cheap clothes online and is often compared to Zara?",["Shein"],"Shein was founded in China in 2012 and is now headquartered in Singapore.",2);
ty(3,"What does IPO stand for? (three words)",["initial public offering"],"An Initial Public Offering is the first sale of a company’s shares to the public on a stock exchange.",1);
ty(4,"What is the capital city of Catalonia?",["Barcelona"],"Barcelona is Catalonia’s capital and also Spain’s second-largest city.",1);
ty(5,"What does MVP stand for in the Lean Startup method? (three words)",["minimum viable product"],"An MVP has just enough features to test an idea with real customers. The idea comes from Eric Ries.",2);
ty(5,"What is the term for a company’s total market value, calculated as share price × number of shares?",["market capitalization","market cap","market capitalisation","capitalization"],"Market capitalisation is the value of all a company’s shares on the stock market.",2);
ty(2,"Which online retailer launched “Fire Phone” in 2014, which was discontinued the following year? (one word)",["Amazon"],"The Fire Phone flopped and Amazon wrote off about $170 million.",3);
ty(1,"Which social network, founded in 2006 by Jack Dorsey and others, was renamed X in 2023?",["Twitter"],"Twitter, founded in 2006, was rebranded to X in July 2023.",1);

return {id:"startups",title:"Startup Legends & Flops",kw:"startup start-up entrepreneurship entrepreneur founders unicorn venture capital vc failures flops theranos wework ftx airbnb uber spotify glovo wallapop funding pitch business",subject:"From garage origins to epic flops: how well do you know the startup world?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
