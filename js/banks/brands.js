// Built-in bank: Brands & marketing (English). Slogans, logos, marketing concepts, famous campaigns, fashion & luxury.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_BRANDS=(function(){
const SESS={1:"Slogans",2:"Logos & origins",3:"Marketing concepts",4:"Legendary campaigns",5:"Fashion & luxury"};
const TAGS={1:"Slogans",2:"Logos",3:"Concepts",4:"Campaigns",5:"Luxury"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Slogans =====================
m(1,"Slogans","Which brand’s slogan is “Just Do It”?","Nike",["Adidas","Puma","Reebok"],"Nike has used “Just Do It” since 1988. The agency was Wieden+Kennedy.",1);
m(1,"Slogans","“I’m lovin’ it” is the slogan of which company?","McDonald’s",["Burger King","KFC","Subway"],"McDonald’s launched “I’m lovin’ it” in 2003 in Germany and made it global.",1);
m(1,"Slogans","Which tech company asked people to “Think Different” in a famous 1997 campaign?","Apple",["Microsoft","IBM","Sony"],"The campaign celebrated rebels and visionaries and marked Steve Jobs’s return to Apple.",1);
m(1,"Slogans","“Because you’re worth it” is the slogan of which beauty brand?","L’Oréal",["Nivea","Dove","Maybelline"],"L’Oréal has used the line since 1971.",2);
m(1,"Slogans","“Impossible is nothing” belongs to which sportswear brand?","Adidas",["Nike","Under Armour","Lacoste"],"Adidas launched it in 2004 with athletes such as Muhammad Ali and his daughter Laila.",2);
m(1,"Slogans","Which energy drink “gives you wings”?","Red Bull",["Monster","Burn","Rockstar"],"Red Bull, from Austria, is also known for sponsoring sports and the Stratos jump.",1);
m(1,"Slogans","“Vorsprung durch Technik” is a German slogan of which car maker?","Audi",["BMW","Mercedes-Benz","Volkswagen"],"It means “progress through technology” and has been used by Audi since 1971.",2);
m(1,"Slogans","“The ultimate driving machine” is the slogan of which car brand?","BMW",["Audi","Porsche","Jaguar"],"BMW has used this English slogan worldwide for decades.",2);
m(1,"Slogans","“A diamond is forever” is a 1947 slogan of which company?","De Beers",["Tiffany & Co.","Cartier","Swarovski"],"De Beers’ slogan turned diamond engagement rings into a social standard.",3);
m(1,"Slogans","Facebook’s early internal motto for developers was “Move fast and…”?","break things",["win customers","change the world","stay humble"],"Zuckerberg later changed it to “Move fast with stable infrastructure”.",2);
m(1,"Slogans","Google’s famous original unofficial motto was “Don’t be…”?","evil",["late","boring","average"],"“Don’t be evil” was part of Google’s code of conduct and was later replaced by “Do the right thing” at Alphabet.",2);
vf(1,"“Have it your way” was a slogan of Burger King.",true,"Burger King used “Have it your way” from 1974 to promote custom burgers.",2);

// ===================== 2. Logos & origins =====================
m(2,"Logos","The Nike swoosh was designed in 1971 by a graphic design student. How much was she paid?","$35",["$350","$3,500","$35,000"],"Carolyn Davidson charged $2 an hour for 17.5 hours. Nike later gave her shares.",3);
m(2,"Logos","Which logo contains a hidden arrow between two letters?","FedEx",["UPS","DHL","TNT"],"The white arrow is between the E and the x in FedEx’s logo.",2);
m(2,"Logos","The Amazon logo’s curved arrow points from which letter to which letter?","A to Z",["A to M","Z to A","B to Y"],"The smile-like arrow suggests that Amazon sells everything from A to Z.",1);
m(2,"Logos","Which chocolate bar’s mountain logo hides a bear, the symbol of Bern?","Toblerone",["Milka","Lindt","Ritter Sport"],"The Matterhorn-shaped logo has a bear hidden in the mountain, honouring Bern, where Toblerone was created.",2);
m(2,"Logos","Which brand’s logo is a twin-tailed mermaid, or siren?","Starbucks",["Costa Coffee","Dunkin’","Nespresso"],"The logo was inspired by a 16th-century Norse woodcut and the seafaring history of coffee.",1);
m(2,"Logos","The prancing horse is the emblem of which car maker?","Ferrari",["Porsche","Lamborghini","Maserati"],"Ferrari took the horse from the Italian air ace Francesco Baracca. Porsche’s logo also has a horse but a different one, from Stuttgart.",2);
m(2,"Logos","Which clothing brand uses a crocodile as its logo, after its founder’s nickname?","Lacoste",["Fred Perry","Ralph Lauren","Hackett"],"Tennis champion René Lacoste was nicknamed “the Crocodile”.",2);
m(2,"Origins","Adidas and Puma were created by two brothers from the same German town. What was their surname?","Dassler",["Müller","Schmidt","Beckenbauer"],"Adi Dassler founded Adidas and Rudolf Dassler founded Puma, in Herzogenaurach, after a family feud.",3);
m(2,"Origins","Which sports brand’s name comes from the Greek goddess of victory?","Nike",["Asics","Mizuno","Umbro"],"Nike is the Greek goddess of victory.",2);
m(2,"Origins","What does the “H” in H&M stand for?","Hennes",["Hamburg","Harvard","Helsinki"],"Hennes & Mauritz: Hennes (Swedish for “hers”) opened in Västerås in 1947 and bought Mauritz Widforss later.",3);
vf(2,"The Apple logo’s bite was added so the apple wouldn’t be mistaken for a cherry.",true,"Designer Rob Janoff has said that the bite gives scale and prevents confusion with a cherry. He also noted the pun of “byte”.",2);
vf(2,"The McDonald’s Golden Arches were inspired by the shape of a hamburger.",false,"They come from the arches that framed the building of the first franchise restaurants designed in the 1950s.",3);

// ===================== 3. Marketing concepts =====================
m(3,"Basics","What are the 4Ps of the classic marketing mix?","Product, Price, Place, Promotion",["People, Process, Profit, Planning","Product, Packaging, Profit, Public","Price, Positioning, Place, Partners"],"The 4Ps were popularised by E. Jerome McCarthy in 1960 and used by Philip Kotler.",1);
m(3,"Basics","What does the acronym “STP” stand for in marketing?","Segmentation, Targeting, Positioning",["Strategy, Tactics, Planning","Sales, Trade, Promotion","Survey, Test, Pilot"],"STP: divide the market, pick the segments to serve, and place your brand in customers’ minds.",2);
m(3,"Basics","Who is often called the “father of modern marketing” and wrote “Marketing Management”?","Philip Kotler",["Peter Drucker","Michael Porter","Seth Godin"],"Philip Kotler is a professor at Northwestern University’s Kellogg School.",2);
m(3,"Basics","What does “USP” mean?","Unique Selling Proposition",["Universal Sales Policy","Ultimate Service Price","Urban Shopping Place"],"A USP is what makes your offer different and why customers should choose you.",1);
m(3,"Basics","In the AIDA model, the four steps are Attention, Interest, Desire and…","Action",["Approval","Acquisition","Awareness"],"AIDA describes the journey from noticing an ad to buying.",2);
m(3,"Metrics","What does NPS (Net Promoter Score) measure?","How likely customers are to recommend you",["How much customers spend per visit","How many followers you have","How fast you deliver"],"NPS asks “how likely are you to recommend us from 0 to 10?” and subtracts detractors from promoters.",2);
m(3,"Metrics","What is CAC in business?","Customer Acquisition Cost",["Cost of Annual Contracts","Cash And Capital","Customer Attention Curve"],"CAC = total sales and marketing spend ÷ number of new customers won.",2);
m(3,"Metrics","A/B testing means…","Showing two versions to different users and comparing results",["Splitting a company in two","Testing a product on animals","Ranking brands from A to B"],"A/B tests are used to improve web pages, ads and emails.",1);
m(3,"Models","What is a “freemium” business model?","A free basic version, with paid premium features",["Free products for everyone forever","A discount for the first month","A free gift with every purchase"],"Spotify, Dropbox and many apps use freemium to attract users, then convert some to paid.",1);
m(3,"Models","B2B stands for business-to-business. Which of these is a typical B2B company?","Salesforce",["Zara","Netflix","Starbucks"],"Salesforce sells cloud software to companies rather than to individuals.",2);
m(3,"Models","SEO stands for…","Search Engine Optimization",["Social Engagement Objectives","Sales Efficiency Order","Smart Email Outreach"],"SEO is the practice of making a site more visible in organic search results.",1);
vf(3,"Brand equity is the extra value a brand name gives to a product.",true,"It is why customers pay more for the same product with a stronger brand.",2);

// ===================== 4. Legendary campaigns =====================
m(4,"Campaigns","Which brand put people’s first names on its bottles in the “Share a Coke” campaign, first in Australia in 2011?","Coca-Cola",["Pepsi","Fanta","Sprite"],"The campaign boosted sales and was repeated in more than 80 countries.",1);
m(4,"Campaigns","Which brand’s ads featured “The Man Your Man Could Smell Like” in 2010?","Old Spice",["Axe","Dove Men","Gillette"],"The ad starring Isaiah Mustafa went viral and led to hundreds of personalised video replies.",2);
m(4,"Campaigns","Dove’s long-running 2004 campaign promoted what idea?","Real Beauty",["Anti-ageing","Natural ingredients","Luxury skincare"],"The Campaign for Real Beauty used ordinary women instead of models.",2);
m(4,"Campaigns","In 2012, Felix Baumgartner jumped from the stratosphere in a campaign sponsored by which brand?","Red Bull",["GoPro","Monster Energy","Nike"],"Red Bull Stratos: jump from about 39 km, broke the sound barrier in freefall and was watched live by millions.",1);
m(4,"Campaigns","Apple’s legendary 1984 Super Bowl commercial was directed by which famous filmmaker?","Ridley Scott",["Steven Spielberg","James Cameron","Tim Burton"],"The ad introduced the Macintosh and was inspired by George Orwell’s novel.",3);
m(4,"Campaigns","During the 2013 Super Bowl blackout, which brand tweeted “You can still dunk in the dark”?","Oreo",["Doritos","KitKat","Pringles"],"Oreo’s fast tweet is a classic example of real-time marketing.",2);
m(4,"Campaigns","Which viral 2014 charity challenge made people pour cold water over their heads?","The Ice Bucket Challenge",["The Mannequin Challenge","The Harlem Shake","The Cinnamon Challenge"],"It raised over $100 million for ALS research.",1);
m(4,"Campaigns","Which brand’s 2018 “Dream Crazy” ad starred the athlete Colin Kaepernick?","Nike",["Adidas","Under Armour","Puma"],"The ad sparked controversy but was followed by strong sales and many marketing awards.",2);
m(4,"Campaigns","Which music streaming service has an end-of-year campaign called “Wrapped”?","Spotify",["Apple Music","Deezer","YouTube Music"],"Spotify Wrapped, launched in 2016 under that name, turns user data into shareable cards.",1);
m(4,"Campaigns","The 2023 film “Barbie” was promoted by an enormous marketing push in which colour?","Pink",["Blue","Gold","Purple"],"Warner Bros. combined brand deals with “Barbenheimer” memes and reached over $1 billion at the box office.",1);
vf(4,"Burger King once ran an ad showing a mouldy Whopper to advertise that it had removed artificial preservatives.",true,"The 2020 “Moldy Whopper” campaign won major awards at Cannes.",2);
vf(4,"Word-of-mouth is considered a type of free viral marketing.",true,"When customers share a brand on their own, it spreads faster and with more trust than paid ads.",1);

// ===================== 5. Fashion & luxury =====================
m(5,"Luxury","Which French group owns Louis Vuitton, Dior and Moët & Chandon, and is led by Bernard Arnault?","LVMH",["Kering","Richemont","Hermès"],"LVMH is the world’s largest luxury group.",2);
m(5,"Luxury","The Hermès Birkin bag is named after which person?","Jane Birkin",["Brigitte Bardot","Grace Kelly","Catherine Deneuve"],"The British actress and singer Jane Birkin inspired the bag in 1984 on a flight.",2);
m(5,"Luxury","Which fashion house launched the perfume No. 5 in 1921?","Chanel",["Dior","Givenchy","Balenciaga"],"Chanel No. 5 was launched in 1921 by Gabrielle “Coco” Chanel and is still a bestseller.",1);
m(5,"Luxury","Which designer is known for his shoes with red soles?","Christian Louboutin",["Jimmy Choo","Manolo Blahnik","Salvatore Ferragamo"],"Louboutin painted a sole red with nail varnish in 1992 and trademarked the colour.",2);
m(5,"Luxury","Zara, Pull&Bear, Bershka, Massimo Dutti and Stradivarius all belong to which group?","Inditex",["H&M Group","Fast Retailing","Mango"],"Inditex is based in Arteixo, Galicia.",2);
m(5,"Luxury","Which Barcelona-based fashion retailer, founded in 1984, is Zara’s main Spanish competitor?","Mango",["Desigual","Springfield","Pimkie"],"Mango was founded by Isak Andic and sells in over 100 countries.",2);
m(5,"Luxury","Which Swedish retailer is a famous fast-fashion competitor of Zara?","H&M",["Uniqlo","Primark","Gap"],"H&M was founded in 1947 in Västerås, Sweden.",1);
m(5,"Luxury","In which Swiss city is Rolex headquartered?","Geneva",["Zurich","Basel","Bern"],"Rolex was founded in London in 1905 and moved to Geneva in 1919.",3);
m(5,"Luxury","Fast fashion is based on…","Producing new styles very quickly and cheaply",["Making clothes to last for decades","Selling only through boutiques","Using only natural materials"],"Zara is famous for its fast supply chain: new designs in the stores in a few weeks.",1);
m(5,"Luxury","Luxury brands often limit supply on purpose. This is based on which economic idea?","Scarcity",["Inflation","Liquidity","Arbitrage"],"Scarcity makes products seem more exclusive and keeps prices high.",2);
m(5,"Luxury","Tiffany & Co. was acquired in 2021 by which luxury group?","LVMH",["Kering","Richemont","Chanel"],"LVMH paid about $15.8 billion for the jeweller, known for its robin’s-egg blue boxes.",3);
vf(5,"Tiffany & Co. is a Swiss watchmaker.",false,"Tiffany is an American jeweller, founded in New York in 1837.",2);

// ===================== Typed answers =====================
ty(1,"Which brand uses the slogan “Finger lickin’ good”?",["KFC","Kentucky Fried Chicken"],"KFC used “It’s finger lickin’ good” for decades. It was changed in 2020 during the pandemic.",2);
ty(2,"Steve Jobs’s company has a bitten fruit as its logo. What is the company called? (one word)",["Apple"],"Apple’s logo has changed from rainbow-coloured to monochrome.",1);
ty(3,"What is the name of the model that describes a customer’s path with the steps awareness, consideration, purchase, loyalty? (two words, starting with “marketing”)",["marketing funnel","sales funnel"],"The funnel is wide at the top (many people aware) and narrow at the bottom (few buy).",3);
ty(4,"Which soft-drink brand ran the 1971 “Hilltop” ad “I’d like to buy the world a…”?",["Coca-Cola","Coke"],"The ad with people singing on a hill in Italy is a classic of advertising.",3);
ty(5,"Which Italian luxury brand is symbolised by a bull and makes supercars in Sant’Agata Bolognese?",["Lamborghini"],"Ferruccio Lamborghini founded the car maker in 1963; the bull comes from his zodiac sign, Taurus.",3);
ty(1,"Which tech company’s slogan is “Connecting people”? (a Finnish phone brand)",["Nokia"],"Nokia used “Connecting People” for decades during its mobile phone peak.",2);
ty(3,"What does “ROI” stand for? (three words)",["return on investment"],"ROI = gain from investment ÷ cost of the investment.",1);
ty(2,"What is the name of the Swedish furniture giant known for flat-pack products and Billy bookcases?",["IKEA","Ikea"],"IKEA was founded in 1943 by Ingvar Kamprad.",1);

// ===================== More questions (batch 2) =====================
m(1,"Slogans","“Taste the rainbow” is the slogan of which fruity candy?","Skittles",["M&M’s","Starburst","Haribo"],"Skittles has used the slogan since 1994, with ads featuring colourful surreal stories.",1);
m(1,"Slogans","“Think small” was a famous 1959 advertising campaign for which car?","Volkswagen Beetle",["Mini","Fiat 500","Renault 4"],"The Doyle Dane Bernbach ad is often called one of the best campaigns of the 20th century.",3);
m(1,"Slogans","“Where’s the beef?” was a 1984 slogan of which fast-food chain?","Wendy’s",["McDonald’s","Burger King","Subway"],"The ad featured an elderly lady looking at a huge bun with a tiny burger patty.",3);
m(1,"Slogans","“Don’t leave home without it” is the slogan of which financial services brand?","American Express",["Visa","Mastercard","Diners Club"],"American Express has used the line since the early 1970s for its cards and travellers’ cheques.",3);
m(1,"Slogans","“The best a man can get” was a long-time slogan of which razor brand?","Gillette",["Old Spice","Nivea","Philips"],"Gillette used it from 1989 until 2019, when it changed to “The best men can be”.",2);
m(1,"Slogans","“Have a break…” is the famous slogan of which chocolate wafer bar?","Kit Kat",["Twix","Snickers","Bounty"],"The full line is “Have a break, have a Kit Kat”, used since the 1950s.",1);
m(1,"Slogans","“Every little helps” is the slogan of which British supermarket chain?","Tesco",["Sainsbury’s","Asda","Morrisons"],"Tesco is the UK’s biggest supermarket and has used the line since 1993.",3);
vf(1,"“The happiest place on Earth” is a slogan of Disneyland.",true,"Disneyland in California has used the line since the 1950s–60s.",1);

m(2,"Logos","The blue and white squares of the BMW roundel are said to represent which German state?","Bavaria",["Saxony","Hesse","Baden-Württemberg"],"BMW stands for Bayerische Motoren Werke, “Bavarian Motor Works”.",2);
m(2,"Logos","Three stripes form the logo of which sportswear brand?","Adidas",["Puma","Reebok","Fila"],"Adidas bought the three-stripe design from the Finnish brand Karhu in the early 1950s for cash and two bottles of whisky.",1);
m(2,"Logos","The three-pointed star of Mercedes-Benz symbolises power on…","Land, sea and air",["Three founders","Three continents","Three car models"],"Daimler’s engines were planned to drive vehicles on land, water and in the sky.",3);
m(2,"Logos","Which car brand’s logo is made of four interlocking rings?","Audi",["BMW","Volvo","Subaru"],"The four rings stand for four companies that merged into Auto Union in 1932.",1);
m(2,"Origins","Pepsi was originally called…","Brad’s Drink",["Pep Cola","Cola-Pop","Dr. Pepper"],"Pharmacist Caleb Bradham invented it in 1893 and renamed it Pepsi-Cola in 1898.",3);
m(2,"Origins","Nike was originally called…","Blue Ribbon Sports",["Swoosh Sports","Greek Athletics","Jordan Brand"],"Phil Knight started by importing Japanese shoes. The name Nike came in 1971.",3);
m(2,"Origins","The name Starbucks was inspired by a character in which novel?","Moby-Dick",["Treasure Island","Dracula","Frankenstein"],"Starbuck is the first mate of the whaling ship in Herman Melville’s novel.",3);
vf(2,"Amazon’s original name was Cadabra.",true,"Jeff Bezos first registered Cadabra.com but changed it to Amazon after a lawyer misheard it as “cadaver”.",3);
vf(2,"The name Mercedes comes from the daughter of an early customer of the company.",true,"Emil Jellinek, a car dealer, named his daughter Mercedes and raced Daimler cars under that name.",3);

m(3,"Basics","What is “market segmentation”?","Dividing a market into groups with similar needs",["Cutting prices for everyone","Splitting a company in two","Moving sales to the internet"],"Segments can be based on age, income, location or lifestyle.",1);
m(3,"Basics","In marketing, “positioning” is…","The place a brand holds in customers’ minds",["Where a shop is located","The price of a product","The size of the logo"],"A good position makes a brand clearly different from its rivals, like Volvo for safety.",2);
m(3,"Basics","What does CRM stand for in business?","Customer relationship management",["Cost reduction method","Central revenue model","Corporate reporting mode"],"CRM software, such as Salesforce, stores data on customers and their interactions.",1);
m(3,"Pricing","A company launches a new gadget at a very high price, then lowers it over time. This is…","Price skimming",["Penetration pricing","Loss-leader pricing","Bundle pricing"],"Skimming captures high earnings from early adopters before reaching the mass market.",3);
m(3,"Pricing","Setting a low price to win market share quickly is called…","Penetration pricing",["Price skimming","Premium pricing","Cost-plus pricing"],"Streaming services often use low launch prices to build a large user base.",3);
m(3,"Pricing","A “loss leader” is…","A product sold at a loss to attract customers",["A product nobody buys","A rival that is losing","A brand that is leaving the market"],"Shops hope customers will buy other, more profitable things too.",3);
m(3,"Concepts","“Greenwashing” means…","Pretending a product is more environmentally friendly than it is",["Painting stores green","Recycling all packaging","Selling plants online"],"The EU is cracking down on vague claims such as “eco-friendly” without proof.",2);
m(3,"Concepts","“Guerrilla marketing” relies on…","Surprising, low-cost stunts in public places",["Huge TV budgets","Aggressive sales calls","Selling only through the army"],"Think flash mobs, street art or unexpected installations that get people talking.",2);
m(3,"Concepts","In the extended marketing mix for services (the 7Ps), which of these is one of the added Ps?","People",["Profit","Politics","Pricing"],"The added three are People, Process and Physical evidence.",3);
vf(3,"“Market share” is a company’s sales as a percentage of total sales in the market.",true,"If a firm sells €20m in a €100m market, its market share is 20%.",1);
vf(3,"“Cannibalisation” is when a company’s new product takes sales from its own existing product.",true,"For example, a cheaper version of a phone can pull buyers away from the premium model.",3);

m(4,"Campaigns","Which brand’s 2014 “Like a Girl” campaign challenged stereotypes around the phrase?","Always",["Dove","Pantene","Tampax"],"The video won Cannes Lions awards and was seen by tens of millions.",2);
m(4,"Campaigns","Which beer brand’s 1990s ads featured the catchphrase “Whassup?”","Budweiser",["Heineken","Corona","Miller"],"The ads showed friends calling each other and shouting the greeting.",2);
m(4,"Campaigns","Which brand became famous for its “Will It Blend?” viral videos starting in 2006?","Blendtec",["Vitamix","Nutribullet","Philips"],"Its founder blended iPhones, marbles and golf balls to show how strong its blenders were.",3);
m(4,"Campaigns","The “Intel Inside” campaign of 1991 marketed what to ordinary consumers?","A component inside computers",["A phone network","A video game console","An online shop"],"It made people ask for computers with Intel chips, even though they never saw the part.",2);
m(4,"Campaigns","Which soft drink pulled a 2017 advert starring Kendall Jenner after a strong backlash?","Pepsi",["Coca-Cola","Sprite","Fanta"],"Critics said the ad trivialised protest movements and it was withdrawn within a day.",2);
m(4,"Campaigns","Which Barcelona beer brand is known for its summer ads called “Mediterráneamente”?","Estrella Damm",["Mahou","San Miguel","Cruzcampo"],"The ads, released each summer since 2009, became cultural events in Spain.",2);
vf(4,"Coca-Cola invented Santa Claus’s red suit.",false,"Santa was shown in red before 1931. Coke’s ads helped popularise the image worldwide.",2);

m(5,"Luxury","Which fashion house’s logo is two interlocking letter Cs?","Chanel",["Gucci","Dior","Celine"],"Coco Chanel founded her house in Paris and launched the little black dress in the 1920s.",1);
m(5,"Luxury","Which Italian fashion house’s logo is a pair of interlocking letter Gs?","Gucci",["Givenchy","Guess","Gap"],"Gucci was founded in Florence in 1921 by Guccio Gucci.",1);
m(5,"Luxury","Which luxury house is known for its orange boxes and the Kelly bag?","Hermès",["Louis Vuitton","Cartier","Prada"],"Hermès started in 1837 as a harness maker in Paris.",2);
m(5,"Luxury","What colour is the famous Tiffany & Co. box?","Robin’s-egg blue",["Emerald green","Ruby red","Lavender"],"Tiffany has even trademarked the colour, called “Tiffany Blue”.",2);
m(5,"Luxury","Gucci, Balenciaga and Saint Laurent belong to which French luxury group?","Kering",["LVMH","Richemont","Hermès International"],"Kering is led by the Pinault family and rivals LVMH, owned by Bernard Arnault.",3);
m(5,"Luxury","Cartier and Van Cleef & Arpels belong to which Swiss luxury group?","Richemont",["Swatch Group","Kering","LVMH"],"Richemont is based in Geneva and also owns watch brands such as IWC and Piaget.",3);
m(5,"Luxury","What is “haute couture”?","Exclusive made-to-measure fashion",["Cheap mass fashion","Sports clothing","Second-hand clothing"],"Only a handful of Paris houses are officially allowed to use the title.",2);
m(5,"Luxury","Uniqlo, a popular casual-wear brand, comes from which country?","Japan",["South Korea","China","Taiwan"],"Uniqlo was founded in Hiroshima in 1984 and is part of Fast Retailing.",1);
m(5,"Luxury","Which sneaker line launched in 1985 with a star of the Chicago Bulls?","Air Jordan",["Air Max","Chuck Taylor","Superstar"],"The deal with Nike made Michael Jordan’s shoes into a billion-dollar brand.",1);
vf(5,"Gucci is a French fashion house.",false,"Gucci was founded in Florence, Italy, in 1921.",1);
vf(5,"Christian Dior founded his fashion house in 1946.",true,"Dior’s “New Look” of 1947 made the house famous worldwide.",2);

ty(1,"Which Italian fashion house, founded in Florence in 1921, uses two interlocking Gs as its logo? (one word)",["Gucci"],"Gucci is now part of the French group Kering.",2);
ty(3,"What does CRM stand for? (three words: customer … management)",["customer relationship management","customer relations management"],"CRM tools help companies manage contacts with customers.",2);
ty(1,"Which fast-food chain uses golden arches as its logo? (one word)",["McDonald’s","McDonalds"],"The golden arches are among the most recognised logos in the world.",1);

return {id:"brands",title:"Brands & Marketing Genius",kw:"brands marketing logos slogans advertising campaigns nike apple coca-cola zara inditex luxury lvmh 4ps kotler branding fashion business",subject:"Slogans, logos, 4Ps and the campaigns that changed advertising",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
