// Built-in bank: Brands, marketing & strategy (English). Slogans, brand stories, marketing and strategy frameworks, famous campaigns.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard.
window.BANK_BRANDS=(function(){
const SESS={1:"Slogans & taglines",2:"Brand origins",3:"Marketing frameworks",4:"Strategy frameworks",5:"Famous campaigns & cases"};
const TAGS={1:"Slogans",2:"Origins",3:"Marketing",4:"Strategy",5:"Campaigns"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Slogans & taglines =====================
m(1,"Slogan","Which brand says “Just Do It”?","Nike",["Adidas","Puma","Under Armour"],"“Just Do It” launched in 1988 and is one of the most famous slogans of all time.",1);
m(1,"Slogan","Which brand’s slogan is “I’m lovin’ it”?","McDonald’s",["Burger King","KFC","Subway"],"McDonald’s launched it in 2003 in Germany, its first global campaign.",1);
m(1,"Slogan","Which brand says “Think Different”?","Apple",["Microsoft","IBM","Dell"],"Apple’s 1997 campaign marked Steve Jobs’s return to the company.",1);
m(1,"Slogan","Which brand says “Because you’re worth it”?","L’Oréal",["Nivea","Dove","Maybelline"],"L’Oréal Paris has used the line since 1971 (in the UK “Because I’m worth it”).",2);
m(1,"Slogan","Which airline’s slogan was “The world’s favourite airline”?","British Airways",["Lufthansa","Iberia","KLM"],"British Airways used it for many years from the 1980s.",3);
m(1,"Slogan","Which fast-food brand says “Finger lickin’ good”?","KFC",["Popeyes","Wendy’s","Taco Bell"],"KFC’s slogan dates back to the 1950s.",1);
m(1,"Slogan","“Open happiness” was a slogan of which drink?","Coca-Cola",["Pepsi","Fanta","Red Bull"],"Coca-Cola ran “Open Happiness” from 2009.",2);
m(1,"Slogan","Which brand says “Red Bull gives you…”?","Wings",["Energy","Speed","Muscles"],"“Red Bull gives you wings” is the classic line of the energy drink.",1);
m(1,"Slogan","Which airline says “Fly the friendly skies”?","United Airlines",["Delta","American Airlines","Ryanair"],"United Airlines used this in a famous 1960s–70s campaign.",3);
m(1,"Brand","Which Spanish group, based in Arteixo (Galicia), owns Zara?","Inditex",["Mango","Desigual","El Corte Inglés"],"Inditex turned fast fashion into a business model with Zara, founded in 1975 by Amancio Ortega.",2);
vf(1,"“Impossible is nothing” is a slogan of Adidas.",true,"Adidas launched “Impossible Is Nothing” in 2004.",2);
ty(1,"“The best a man can get” was a slogan of which razor brand? (G……)",["gillette"],"Gillette used it from 1989 until 2019.",2);
ty(1,"“Have a break, have a ……”: which chocolate bar ends this famous slogan?",["kitkat","kit kat","kit-kat"],"“Have a break, have a Kit Kat”.",2);

// ===================== 2. Brand origins =====================
m(2,"Origin","In which country did IKEA start?","Sweden",["Norway","Denmark","Finland"],"IKEA was founded in 1943 by Ingvar Kamprad in Småland, Sweden.",1);
m(2,"Origin","Which brand began in a garage in Los Altos, California, in 1976?","Apple",["Microsoft","Amazon","HP"],"Apple was founded by Steve Jobs, Steve Wozniak and Ronald Wayne in 1976.",1);
m(2,"Origin","What was Amazon originally selling when it launched in 1995?","Books",["Electronics","Music","Groceries"],"Jeff Bezos started with books because of their wide choice and easy shipping.",1);
m(2,"Origin","Which company started as a mail-order DVD rental by post?","Netflix",["Spotify","Hulu","Disney"],"Netflix, founded in 1997 by Reed Hastings and Marc Randolph, rented DVDs by mail before streaming.",1);
m(2,"Origin","The name “Adidas” comes from…","Adi Dassler, its founder",["A Greek word for victory","A German word for athlete","An abbreviation of “All Day I Dream About Sport”"],"Adolf “Adi” Dassler founded Adidas in Herzogenaurach, Germany (his brother Rudolf founded Puma).",2);
m(2,"Origin","Which brand’s name comes from the Greek goddess of victory?","Nike",["Asics","Fila","Reebok"],"Nike is the Greek goddess of victory. The company was originally called Blue Ribbon Sports.",2);
m(2,"Origin","Which company was originally named “BackRub”?","Google",["Yahoo","Bing","Dropbox"],"Larry Page and Sergey Brin first called their search engine BackRub.",2);
m(2,"Origin","Who founded Zara’s parent company Inditex?","Amancio Ortega",["Isak Andic","Josep Maria Carbonell","Enrique Iglesias"],"Amancio Ortega opened the first Zara in A Coruña in 1975.",2);
m(2,"Origin","Which brand was first known as “Brad’s Drink” in 1893?","Pepsi",["Coca-Cola","Dr Pepper","7 Up"],"Pharmacist Caleb Bradham named his drink Brad’s Drink, renamed Pepsi-Cola in 1898.",3);
m(2,"Origin","Which brand takes its name from a village in Sweden, combining the founder’s initials and his farm and village?","IKEA",["Volvo","Spotify","H&M"],"IKEA = Ingvar Kamprad + Elmtaryd (farm) + Agunnaryd (village).",3);
vf(2,"Starbucks is named after a character in the novel Moby-Dick.",true,"Starbuck is the first mate in Melville’s Moby-Dick.",2);
ty(2,"Which social network, founded by Mark Zuckerberg at Harvard in 2004, belongs to Meta? (one word)",["facebook"],"Facebook launched on 4 February 2004.",1);
ty(2,"Which online store did Jeff Bezos launch in 1995 by selling books? (one word)",["amazon"],"Amazon started in a garage in Bellevue, Washington.",1);

// ===================== 3. Marketing frameworks =====================
m(3,"Framework","Which marketing tool compares market growth and market share to classify products as stars, cash cows, question marks and dogs?","BCG matrix",["SWOT analysis","PESTEL","Ansoff matrix"],"The Boston Consulting Group matrix, created in 1970, helps manage a product portfolio.",2);
m(3,"Framework","What does “STP” stand for in marketing?","Segmentation, targeting, positioning",["Sales, trade, profit","Strategy, tactics, planning","Survey, test, product"],"STP: split the market into segments, choose targets, and position your offer.",2);
m(3,"Framework","What does SWOT stand for?","Strengths, weaknesses, opportunities, threats",["Sales, wages, orders, taxes","Strategy, work, operations, time","Suppliers, workers, owners, targets"],"Strengths and weaknesses are internal; opportunities and threats are external.",1);
m(3,"Framework","In SWOT analysis, which of these is an EXTERNAL factor?","Threats",["Strengths","Weaknesses","Company culture"],"Opportunities and threats come from outside the company; strengths and weaknesses are inside.",2);
m(3,"Framework","The “Ansoff matrix” helps companies decide on…","Growth strategies, such as market penetration or diversification",["Salary scales","Tax planning","Warehouse layout"],"Four options: market penetration, market development, product development, diversification.",3);
m(3,"Framework","Which of these is NOT one of the 4 Ps?","Profit",["Product","Price","Promotion"],"The 4 Ps are product, price, place and promotion.",1);
m(3,"Framework","A “persona” in marketing is…","A fictional profile representing a typical customer",["A famous brand ambassador","An actor in an ad","A logo mascot"],"Personas help teams design offers for specific types of customers.",2);
m(3,"Framework","What is “positioning”?","The place a brand occupies in the minds of customers",["The location of its stores","The rank of its CEO","Its place on the stock exchange"],"Volvo = safety, Red Bull = energy: positioning is what you want to stand for.",2);
m(3,"Framework","What is “word of mouth”?","Customers recommending a brand to others",["An ad on the radio","A paid slogan","A call-centre script"],"It’s the most trusted form of marketing because it comes from people we know.",1);
m(3,"Framework","The Net Promoter Score (NPS) is based on the question…","How likely are you to recommend us to a friend?",["How much did you spend?","How old are you?","How fast was the delivery?"],"NPS asks for a 0–10 score; promoters give 9–10, detractors 0–6.",3);
vf(3,"A “niche market” is a small, specialised segment of a larger market.",true,"Niche strategies avoid direct competition with big players.",1);
m(3,"Framework","The “Marketing Mix” is…","The set of tools a company combines to reach its goals",["An advertising agency","A coupon system","A brand-name generator"],"Product, price, place and promotion are combined to create a coherent offer.",2);
ty(3,"In SWOT, what does the letter “O” stand for? (one word, plural)",["opportunities","opportunity"],"Opportunities.",1);
ty(3,"What do the letters “STP” stand for in marketing? (Segmentation, T……, Positioning)",["targeting"],"Segmentation, targeting, positioning.",2);

// ===================== 4. Strategy frameworks =====================
m(4,"Porter","Porter’s well-known model of industry competition has how many forces?","Five",["Three","Four","Seven"],"Threat of new entrants, bargaining power of suppliers and buyers, threat of substitutes, and rivalry.",1);
m(4,"Porter","Which of these is one of Porter’s five forces?","Threat of substitutes",["Weather conditions","Government debt","Brand colours"],"A substitute meets the same need in a different way (video calls instead of travelling).",2);
m(4,"Porter","What are Porter’s generic strategies?","Cost leadership, differentiation and focus",["Growth, profit and loyalty","Marketing, sales and logistics","Quality, speed and price"],"Michael Porter described three basic ways to compete.",2);
m(4,"Strategy","What is the idea of the “Blue Ocean Strategy”?","Create a new market with no competitors instead of fighting in a crowded one",["Sell products near the sea","Lower prices to the minimum","Buy competitors"],"By W. Chan Kim and Renée Mauborgne of INSEAD; Cirque du Soleil is a classic example.",2);
m(4,"Strategy","“Core competencies” are…","What a company does uniquely well, hard for others to copy",["The salaries of core staff","Its main office locations","The names of its subsidiaries"],"Prahalad & Hamel popularised the idea in 1990.",3);
m(4,"Strategy","What does “vertical integration” mean?","Owning several stages of the supply chain",["Building tall offices","Merging with a competitor","Selling only online"],"Zara controls design, production and distribution to react quickly to trends.",2);
m(4,"Strategy","What is a “merger”?","Two companies combine into one",["A company buys back its shares","A company splits in two","A company enters bankruptcy"],"A merger combines companies; in an acquisition, one buys another.",1);
m(4,"Strategy","What does PESTEL analyse?","The macro-environment (political, economic, social, technological, environmental, legal)",["The company’s finances","The sales team","Employee satisfaction"],"PESTEL looks at the external factors around an industry.",2);
m(4,"Strategy","What is “first-mover advantage”?","The benefit of being first in a market",["Moving the head office first","A discount for early payment","A rule that the oldest firm wins"],"First movers can capture customers and learn first, but may also pay the pioneer’s costs.",2);
m(4,"Strategy","What is a “competitive advantage”?","What lets a firm outperform rivals over time",["A government subsidy","A bigger office","Having more staff"],"It can come from cost, quality, brand, technology or relationships.",1);
vf(4,"“Economies of scale” mean that the average cost per unit falls as production grows.",true,"Fixed costs are spread over more units, so unit cost goes down.",1);
m(4,"Strategy","In strategy, “synergy” means…","The combined value is greater than the sum of parts",["Two products sold at the same price","Two offices in the same city","A salary bonus"],"Synergy is the main argument given to justify many mergers.",2);
ty(4,"Michael ……… developed the “Five Forces” model at Harvard Business School. Which surname?",["porter","michael porter"],"Michael E. Porter, 1979.",2);
ty(4,"What kind of integration means owning several stages of your supply chain? (v…… integration)",["vertical"],"Vertical integration.",2);

// ===================== 5. Famous campaigns & cases =====================
m(5,"Campaign","Which brand launched the “Share a Coke” campaign with names printed on its bottles?","Coca-Cola",["Pepsi","Fanta","Sprite"],"The campaign started in Australia in 2011 and went worldwide.",1);
m(5,"Campaign","Which sportswear brand backed Colin Kaepernick in a 2018 campaign “Believe in something”?","Nike",["Adidas","Puma","Reebok"],"The campaign was widely debated and Nike’s sales rose after it.",2);
m(5,"Campaign","Dove’s “Real Beauty” campaign (2004) is known for…","Showing women of different ages and sizes instead of models",["Showing pro athletes","Using cartoons","Selling cheap soap"],"It challenged beauty standards and has become a marketing classic.",2);
m(5,"Campaign","Which company’s ad “1984” famously aired during the Super Bowl?","Apple",["IBM","Microsoft","Atari"],"Directed by Ridley Scott in 1984 to introduce the Macintosh.",2);
m(5,"Case","What was “New Coke”?","A 1985 recipe change that was a famous marketing flop",["A zero-sugar product","A bottled water brand","A joint venture with Pepsi"],"Customers protested, and Coca-Cola brought back “Coca-Cola Classic” after 79 days.",2);
m(5,"Case","Which Swedish company is famous for flat-packed furniture and meatballs in its stores?","IKEA",["Volvo","H&M","Saab"],"IKEA’s flat-pack model reduces shipping costs and lets customers assemble at home.",1);
m(5,"Case","What is “greenwashing”?","Misleading people about how environmentally friendly a product is",["Painting a store green","Recycling packaging","Selling gardening tools"],"Regulators in the EU are tightening rules on environmental claims.",2);
m(5,"Case","Which brand’s “Think Small” ad (1959) is considered a milestone of advertising for the Beetle?","Volkswagen",["Fiat","Mini","Renault"],"Created by agency Doyle Dane Bernbach, it turned the car’s small size into a strength.",3);
m(5,"Case","What is “influencer marketing”?","Paying or partnering with social media personalities to promote a product",["Selling at trade fairs","Door-to-door sales","TV advertising"],"It relies on the trust followers have in creators.",1);
m(5,"Case","Which brand sponsors cliff jumps and space jumps, such as Felix Baumgartner’s in 2012?","Red Bull",["Monster","Gatorade","Burn"],"The Red Bull Stratos jump showed content marketing at its best.",2);
vf(5,"The Barcelona-based sports-media and clothing company Desigual is known for colourful designs.",true,"Desigual was founded in Barcelona in 1984 by Thomas Meyer.",3);
m(5,"Case","What is “product placement”?","Showing a brand inside films, series or videos in exchange for payment",["Putting products on the top shelf","Delivering free samples","Listing the product price"],"Think of the brands you spot in a James Bond film.",1);
ty(5,"Which soft-drink brand printed first names on its bottles in a famous campaign? (one word)",["coca-cola","coca cola","coke","cocacola"],"Coca-Cola.",1);
ty(5,"Which fruit-named tech company ran the 1984 Super Bowl ad for the Macintosh? (one word)",["apple"],"Apple.",1);

return {id:"brands",title:"Brands, Marketing & Strategy",kw:"brands logos slogans marketing strategy porter swot bcg campaigns apple nike coca-cola case study esade bba mba branding advertising",subject:"Slogans, brand stories, marketing and strategy frameworks, famous campaigns: how much do you know?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
