// Built-in bank: Strategy, management & negotiation (English). Frameworks, management & leadership, negotiation, business models, corporate case studies.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_STRATEGY=(function(){
const SESS={1:"Strategy frameworks",2:"Management & leadership",3:"Negotiation",4:"Business models",5:"Corporate case studies"};
const TAGS={1:"Frameworks",2:"Management",3:"Negotiation",4:"Models",5:"Cases"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Strategy frameworks =====================
m(1,"Frameworks","What does SWOT stand for?","Strengths, Weaknesses, Opportunities, Threats",["Sales, Wages, Orders, Taxes","Strategy, Work, Output, Time","Suppliers, Warehouses, Operations, Trade"],"Strengths and weaknesses are internal; opportunities and threats are external.",1);
m(1,"Frameworks","Who developed the “Five Forces” model of industry competition?","Michael Porter",["Philip Kotler","Peter Drucker","Clayton Christensen"],"Porter, from Harvard Business School, published it in 1979.",2);
m(1,"Frameworks","Which of these is NOT one of Porter’s Five Forces?","Government subsidies",["Threat of new entrants","Bargaining power of buyers","Threat of substitutes"],"The five forces are: new entrants, substitutes, buyers’ power, suppliers’ power and rivalry among competitors.",3);
m(1,"Frameworks","In the BCG matrix, a product with high market share in a slow-growth market is called a…","Cash cow",["Star","Question mark","Dog"],"Cash cows generate a lot of cash that can fund stars and question marks.",2);
m(1,"Frameworks","In the BCG matrix, what are “stars”?","High share in a high-growth market",["Low share in a low-growth market","Low share in a high-growth market","High share in a low-growth market"],"Stars need heavy investment but can become tomorrow’s cash cows.",2);
m(1,"Frameworks","Porter’s three generic strategies are cost leadership, differentiation and…","Focus",["Diversification","Outsourcing","Acquisition"],"Companies that are stuck in the middle without a clear choice risk poor performance.",2);
m(1,"Frameworks","“Blue Ocean Strategy” advises companies to…","Create uncontested market space rather than fight in crowded markets",["Move offices to the coast","Cut prices as much as possible","Copy the market leader"],"Authors W. Chan Kim and Renée Mauborgne are professors at INSEAD.",3);
m(1,"Frameworks","PESTEL analysis looks at which type of factors?","The external macro environment",["Employees’ morale","Internal processes","Customer satisfaction"],"PESTEL = Political, Economic, Social, Technological, Environmental, Legal.",2);
m(1,"Frameworks","Clayton Christensen’s book “The Innovator’s Dilemma” explains…","Why successful companies fail to adopt disruptive innovation",["How to hire talented engineers","How to cut costs","How to manage global teams"],"Great companies listen to their best customers and so miss the new technology that serves smaller markets first.",3);
m(1,"Frameworks","The Ansoff Matrix helps companies decide about…","Growth strategies: existing/new products and markets",["Staff schedules","Tax planning","Warehouse layouts"],"Four options: market penetration, market development, product development, diversification.",3);
vf(1,"A competitive advantage is something that lets a company outperform its rivals over time.",true,"Examples: lower costs, a stronger brand, patents, better distribution.",1);
vf(1,"A company’s “core competencies” are the unique strengths that are hard for rivals to copy.",true,"The concept was popularised by C.K. Prahalad and Gary Hamel in 1990.",3);

// ===================== 2. Management & leadership =====================
m(2,"Leadership","Which classic leadership style gives the team almost total freedom, with the leader staying hands-off?","Laissez-faire",["Autocratic","Democratic","Bureaucratic"],"Autocratic: the leader decides. Democratic: the team is involved. Laissez-faire: hands-off.",1);
m(2,"Motivation","Maslow’s hierarchy of needs places which need at the base of the pyramid?","Physiological needs (food, water, sleep)",["Self-actualisation","Esteem","Belonging"],"The pyramid goes: physiological, safety, belonging, esteem, self-actualisation.",1);
m(2,"Motivation","Douglas McGregor’s “Theory X” assumes that employees…","Dislike work and need to be controlled",["Are creative and self-motivated","Prefer teams","Love training"],"Theory Y is the opposite: people are motivated and seek responsibility.",3);
m(2,"Teams","Tuckman’s stages of group development are forming, storming, norming and…","Performing",["Reforming","Planning","Measuring"],"Later, “adjourning” was added as a fifth stage.",2);
m(2,"Efficiency","Henry Ford made car production cheaper and faster by popularising…","The moving assembly line",["Robots","Franchising","Online sales"],"The Model T assembly line (1913) reduced build time from about 12 hours to around 90 minutes.",1);
m(2,"Efficiency","The Japanese idea of “kaizen” means…","Continuous improvement",["Strict hierarchy","Total silence at work","Hostile takeover"],"Kaizen is associated with Toyota’s production system.",2);
m(2,"Efficiency","Which car maker is the home of “lean” and “just-in-time” production?","Toyota",["Ford","Volkswagen","Tesla"],"Just-in-time reduces inventory by receiving parts only when they are needed.",2);
m(2,"Efficiency","In Agile software development with Scrum, a short fixed period of work is called a…","Sprint",["Lap","Sprint race","Batch"],"Sprints typically last one to four weeks.",2);
m(2,"Goals","OKR stands for…","Objectives and Key Results",["Operations, Knowledge and Reports","Output, Keys and Revenue","Organisation and Key Roles"],"OKRs were introduced at Intel by Andy Grove and popularised at Google by John Doerr.",3);
m(2,"Goals","KPI stands for…","Key Performance Indicator",["Knowledge Per Individual","Key Product Idea","Keeping People Inspired"],"A KPI is a measurable value that shows how effectively a goal is being achieved.",1);
m(2,"Psychology","Daniel Goleman popularised which idea for leaders?","Emotional intelligence",["Scientific management","Management by walking away","Blue ocean"],"EI includes self-awareness, self-regulation, motivation, empathy and social skills.",2);
vf(2,"The Hawthorne effect says that people may change their behaviour when they know they are being observed.",true,"It was named after studies at the Western Electric Hawthorne Works in the 1920s–30s.",3);

// ===================== 3. Negotiation =====================
m(3,"Concepts","In negotiation, what does BATNA stand for?","Best Alternative To a Negotiated Agreement",["Basic Agreement To Never Argue","Business Agreement Terms and Notes","Big Advantage To Negotiate Always"],"Your BATNA is your walk-away option. The stronger it is, the stronger your position.",2);
m(3,"Concepts","The book “Getting to Yes” came out of a negotiation project at which university?","Harvard",["Oxford","Stanford","Yale"],"It came from the Harvard Negotiation Project and promotes principled negotiation.",2);
m(3,"Concepts","The ZOPA is…","The zone where both parties’ acceptable outcomes overlap",["The final signed contract","A type of discount","The first offer"],"ZOPA = Zone of Possible Agreement. If there is no overlap, there is no deal.",3);
m(3,"Concepts","A “win-win” negotiation means…","Both sides gain value from the agreement",["Both sides lose","One side wins everything","The mediator wins"],"It is also called an integrative or collaborative negotiation.",1);
m(3,"Concepts","“Never Split the Difference” was written by a former…","FBI hostage negotiator",["CEO of IKEA","Wall Street trader","UN diplomat"],"Chris Voss teaches “tactical empathy”, mirroring and labelling emotions.",2);
m(3,"Tactics","“Mirroring” in negotiation means…","Repeating the last few words your counterpart said",["Looking into a mirror","Copying their offer","Wearing the same clothes"],"It encourages the other side to elaborate, giving you more information.",3);
m(3,"Tactics","Making the very first offer in a negotiation creates which effect?","An anchor",["A stop-loss","A veto","A mirror"],"The first number often shapes the whole discussion, as long as it is reasonable.",2);
m(3,"Tactics","In negotiation theory, what is your “reservation price”?","The worst deal you would still accept",["The best price you hope for","The hotel booking fee","The price of the first offer"],"If the offer is worse than your reservation price, you walk away.",3);
m(3,"Tactics","Focusing on “interests, not positions” means…","Asking why each party wants something, not only what they demand",["Bargaining until one side gets tired","Ignoring the other side’s needs","Making extreme demands first"],"Two people fighting for one orange may need different parts: juice and peel.",3);
m(3,"Tactics","“Good cop, bad cop” is a tactic in which…","One negotiator is harsh and another friendly",["Both are equally friendly","They never speak","They play the same role"],"The harsh role makes the friendly role’s offer look generous by contrast.",1);
vf(3,"The most important stage of a negotiation is the preparation before the meeting.",true,"Know your BATNA, your limits and the other side’s interests before you start.",1);
vf(3,"Silence can be a powerful tool in negotiation.",true,"Pausing after an offer can lead the other side to improve it.",1);

// ===================== 4. Business models =====================
m(4,"Models","Gillette’s “razor and blade” model means…","Selling the razor cheaply and making money on the refill blades",["Selling only blades","Selling razors for free to the army","Renting razors"],"The same idea is used for printers and ink or Nespresso machines and capsules.",2);
m(4,"Models","Which type of business connects two groups, such as drivers and riders?","A two-sided platform",["A franchise","A holding company","A cooperative bank"],"Uber, Airbnb and Amazon Marketplace are two-sided platforms.",2);
m(4,"Models","“Network effects” mean that a product becomes more valuable when…","More people use it",["It becomes cheaper","It gets more advertising","It is exported"],"WhatsApp is useful because your friends are on it.",1);
m(4,"Models","Warren Buffett’s “economic moat” refers to…","A durable competitive advantage that protects a business",["A deep ditch around a factory","A cash reserve","A tax haven"],"Examples: strong brands, patents, switching costs, network effects.",2);
m(4,"Models","McDonald’s grows mainly through which model?","Franchising",["Crowdfunding","Subscription","Licensing patents"],"Franchisees pay fees and royalties to use the brand and system.",1);
m(4,"Models","Ryanair’s model is built on…","Low fares plus paid extras",["Luxury service","Long-haul flights only","Business class only"],"It uses secondary airports, one aircraft type and charges for extras like baggage.",1);
m(4,"Models","What is the key idea of Zara’s “vertical integration”?","Controlling design, production and distribution in-house",["Building tall stores","Selling only online","Outsourcing everything to Asia"],"It allows Zara to move from design to store in a few weeks.",2);
m(4,"Models","The “Business Model Canvas”, a one-page tool to map a business, was created by…","Alexander Osterwalder",["Eric Ries","Jeff Bezos","Steve Blank"],"It has nine building blocks, such as value proposition, customer segments and revenue streams.",3);
m(4,"Models","“Economies of scale” mean that…","Average cost per unit falls as production increases",["Prices always rise","Revenue equals costs","Profits are taxed less"],"Large producers spread fixed costs over more units.",1);
m(4,"Models","Amazon’s famous “flywheel” was sketched by Jeff Bezos on a napkin. What was at its heart?","Lower prices bring more customers and more sellers",["Higher profits per sale","Expensive advertising","Exclusive products"],"More traffic attracts more sellers, which increases selection and lowers costs, which lowers prices.",3);
vf(4,"A subscription model gives a company recurring revenue.",true,"Netflix, Spotify and many SaaS companies rely on it.",1);
vf(4,"The “first-mover advantage” guarantees that the first company to enter a market will always win.",false,"Many first movers were overtaken by better followers, like Myspace by Facebook.",2);

// ===================== 5. Corporate case studies =====================
m(5,"Scandals","In 2015 Volkswagen was caught using software to cheat on emissions tests. What was the scandal called?","Dieselgate",["Carbongate","Watergate","Autogate"],"Around 11 million diesel cars worldwide had the “defeat device”, and costs ran into tens of billions of euros.",1);
m(5,"Scandals","Which aircraft was grounded worldwide in 2019 after two fatal crashes?","Boeing 737 MAX",["Airbus A380","Concorde","Boeing 787"],"The MAX stayed grounded for about 20 months, and Boeing’s reputation suffered.",2);
m(5,"Scandals","The 2010 Deepwater Horizon disaster caused a massive oil spill in the Gulf of Mexico. Which company operated the well?","BP",["Shell","ExxonMobil","Chevron"],"BP paid more than $60 billion in costs, fines and settlements.",2);
m(5,"Scandals","Samsung had to withdraw which smartphone in 2016 because of exploding batteries?","Galaxy Note 7",["Galaxy S6","Galaxy Fold","Galaxy A5"],"Samsung recalled all units and the episode cost billions.",2);
m(5,"Marketing","In 1985 Coca-Cola changed its recipe and faced consumer backlash. What was the new product called?","New Coke",["Coke Zero","Coke Classic","Pepsi Max"],"Coke brought the old formula back after 79 days as “Coca-Cola Classic”.",2);
m(5,"Crisis","Which company handled the 1982 Tylenol poisoning crisis so well that it became a textbook case of crisis management?","Johnson & Johnson",["Procter & Gamble","Pfizer","Bayer"],"J&J recalled 31 million bottles and was honest with the public, protecting its reputation.",3);
m(5,"Turnarounds","In the early 2000s, which toy company almost went bankrupt before a turnaround led by Jørgen Vig Knudstorp?","LEGO",["Mattel","Hasbro","Playmobil"],"LEGO cut complexity, focused on core bricks and returned to being the world’s largest toy maker.",3);
m(5,"Turnarounds","Which company did Steve Jobs return to in 1997, when it was close to bankruptcy?","Apple",["Pixar","NeXT","Microsoft"],"The comeback began with the iMac (1998) and the iPod (2001).",1);
m(5,"Culture","Which company is famous for letting engineers spend 20% of their time on personal projects, leading to Gmail?","Google",["Apple","Microsoft","Intel"],"Gmail and Google News came from the 20% time, according to Google.",2);
m(5,"Culture","In 2022, Patagonia’s founder Yvon Chouinard announced he was giving away the company to…","A trust and a nonprofit to fight climate change",["His employees for free","Nike","The US government"],"“Earth is now our only shareholder,” said Chouinard.",3);
vf(5,"Nokia was once the world’s largest mobile phone maker.",true,"Nokia led the mobile phone market from 1998 to 2011.",1);
vf(5,"Toys “R” Us went bankrupt in 2017–2018, after being outcompeted by online and big-box retailers.",true,"The chain closed its U.S. stores in 2018 after filing for bankruptcy.",2);

// ===================== Typed answers =====================
ty(1,"In a SWOT analysis, what word does the letter “O” stand for? (one word, plural)",["opportunities"],"Opportunities are external chances the company can exploit, like a new market.",1);
ty(2,"What does “just-in-time” production aim to reduce? (one word: the goods waiting in warehouses)",["inventory","stock","inventories"],"JIT reduces storage and waste by delivering parts as they are needed.",2);
ty(3,"What does “BATNA” stand for? Name the last word of the phrase “Best Alternative To a Negotiated …”",["agreement"],"BATNA = Best Alternative To a Negotiated Agreement.",2);
ty(4,"Which Swedish furniture retailer uses flat-pack, self-assembly products to cut costs? (one word)",["IKEA","Ikea"],"Customers do the transport and assembly, making furniture cheaper.",1);
ty(5,"Which German car maker was caught in the 2015 “Dieselgate” emissions scandal? (two words, or its initials)",["Volkswagen","VW","Volkswagen Group"],"Volkswagen admitted cheating in the US in September 2015.",1);
ty(2,"What is the name of the pyramid of human needs created by Abraham …?",["Maslow"],"Abraham Maslow published his hierarchy of needs in 1943.",1);
ty(1,"Which management consulting firm created the “Growth-Share Matrix” in 1970? (initials)",["BCG","Boston Consulting Group"],"Bruce Henderson of the Boston Consulting Group created it.",2);

// ===================== More questions (batch 2) =====================
m(1,"Frameworks","In the BCG matrix, “question marks” are business units with…","Low market share in a high-growth market",["High market share in a slow market","Low share in a shrinking market","No customers at all"],"They need investment to become stars, otherwise they may become dogs.",2);
m(1,"Frameworks","The VRIO framework asks whether a resource is Valuable, Rare, Costly to Imitate and…","Organised to be exploited",["Original","Regulated","Insured"],"VRIO by Jay Barney helps decide if a resource gives a lasting competitive advantage.",3);
m(1,"Frameworks","Porter’s “value chain” divides a firm’s activities into…","Primary and support activities",["Revenues and costs","Products and services","Strategy and tactics"],"Primary activities include logistics, operations, marketing and service.",3);
m(1,"Frameworks","Which circus is a famous example of Blue Ocean strategy, mixing circus with theatre?","Cirque du Soleil",["Barnum & Bailey","Circus Krone","Moscow Circus"],"It created a new market by dropping animals and high-priced stars.",2);
m(1,"Frameworks","“Disruptive innovation” usually means…","A newcomer wins with a simpler, cheaper offer that moves upmarket",["A product that breaks easily","A big advertising stunt","A government ban"],"Netflix and low-cost airlines are classic examples.",3);
m(1,"Frameworks","Porter warned that a firm trying to be both the cheapest and the most unique risks being…","Stuck in the middle",["Out of stock","Bankrupt immediately","Taken over by the state"],"Without a clear generic strategy, a firm can end up with no advantage at all.",3);
m(1,"Frameworks","The McKinsey 7S model is a tool to…","Align seven internal elements of an organisation",["Analyse seven competitors","Set seven annual targets","Rank seven products"],"It includes strategy, structure, systems, shared values, skills, style and staff.",3);
m(1,"Basics","A company’s “vision” describes…","The future it wants to reach",["Its past results","Its monthly sales plan","Its legal form"],"A mission explains why it exists today, while a vision is the long-term ambition.",1);
m(1,"Basics","“Horizontal integration” happens when a company…","Merges with or buys a competitor at the same stage",["Buys its suppliers","Sells to its customers directly","Closes factories"],"Vertical integration, in contrast, covers different stages of the supply chain.",3);
vf(1,"In a SWOT analysis, strengths and weaknesses are internal to the company.",true,"Opportunities and threats come from the external environment.",1);
vf(1,"The BCG matrix classifies business units into four categories.",true,"Stars, cash cows, question marks and dogs.",1);

m(2,"Management","Who is often called the “father of modern management” and wrote “The Effective Executive”?","Peter Drucker",["Frederick Taylor","Henry Mintzberg","Jack Welch"],"Drucker popularised management by objectives and the idea of the “knowledge worker”.",2);
m(2,"Management","Who wrote “The Principles of Scientific Management” (1911)?","Frederick Taylor",["Henry Ford","Henri Fayol","Max Weber"],"Taylor tried to find the “one best way” to do each task using time-and-motion studies.",3);
m(2,"Motivation","Which theory distinguishes “motivators” from “hygiene factors” at work?","Herzberg’s two-factor theory",["Maslow’s pyramid","McGregor’s Theory X","Vroom’s expectancy theory"],"Hygiene factors, like pay, prevent dissatisfaction, while motivators, like achievement, create satisfaction.",3);
m(2,"Tools","What is “Kanban”, which originated at Toyota?","A visual board to manage work in progress",["A type of contract","A Japanese greeting","A forecasting model"],"Cards move across columns such as To do, Doing and Done.",2);
m(2,"Tools","What is a Gantt chart used for?","Planning and tracking project schedules",["Calculating tax","Ranking competitors","Measuring customer happiness"],"The bars show when each task starts and ends.",2);
m(2,"Tools","In SMART goals, what does the “M” stand for?","Measurable",["Motivating","Managed","Mandatory"],"The other letters are Specific, Achievable, Relevant and Time-bound.",1);
m(2,"Structure","In a “matrix organisation”, employees…","Report to two managers, such as a function and a project",["Work only from home","Have no managers","Switch jobs every month"],"Matrix structures are common in consulting and multinational firms.",3);
m(2,"Structure","“Span of control” is…","The number of people a manager directly supervises",["The size of a company’s budget","The length of a project","The area covered by a factory"],"A wider span means fewer management layers.",2);
m(2,"Ideas","The “Pareto principle” (80/20 rule) says that…","About 80% of results come from 20% of causes",["80% of staff are unproductive","20% of customers are unhappy","80% of profit is taxed"],"For instance, 20% of customers may generate 80% of sales.",2);
m(2,"Ideas","The “Peter Principle” says that employees tend to be promoted until they reach…","Their level of incompetence",["Retirement age","The top of the company","Their maximum salary"],"The idea comes from a 1969 book by Laurence J. Peter.",3);
m(2,"Leadership","A “transformational” leader mainly tries to…","Inspire people to go beyond their own interests",["Control every detail","Avoid change","Reward only results"],"The term was developed by James MacGregor Burns and Bernard Bass.",3);
vf(2,"“Servant leadership” puts the needs of the team before those of the leader.",true,"The term was coined by Robert Greenleaf in 1970.",2);

m(3,"Concepts","“Integrative” negotiation focuses on…","Creating extra value for both sides",["Winning at any cost","Delaying the talks","Using threats"],"Both parties look for trades to “expand the pie” rather than fight over a fixed slice.",3);
m(3,"Concepts","“Distributive” negotiation assumes…","A fixed pie where one side’s gain is the other’s loss",["Unlimited resources","A neutral third party","Public meetings"],"Buying a used car is a typical distributive negotiation.",3);
m(3,"Concepts","“Logrolling” in negotiation means…","Trading concessions on issues that matter differently to each side",["Recording the meeting","Rolling dice to decide","Meeting outdoors"],"Each side gives up what is cheap for them and gains what is valuable.",3);
m(3,"Third parties","In “mediation”, the neutral third party…","Helps both sides find an agreement but cannot impose one",["Makes a binding decision","Represents one side","Writes the law"],"The parties stay in control of the final outcome.",2);
m(3,"Third parties","In “arbitration”, the neutral third party…","Makes a decision that is usually binding",["Only gives advice","Acts as a witness","Votes together with both sides"],"Arbitration is common in international business contracts.",2);
vf(3,"Active listening is as important as speaking well in a negotiation.",true,"Good listeners discover the other side’s real interests.",1);

m(4,"Models","What is “dropshipping”?","Selling products without holding stock, as the supplier ships them",["Selling only by air freight","Dropping prices daily","Selling used goods"],"The seller never touches the product, which keeps start-up costs low.",2);
m(4,"Models","What do franchisees usually pay to the franchisor?","Fees and a share of revenue (royalties)",["Only a one-time gift","Nothing at all","Their annual tax return"],"In return they get the brand, training and a proven business model.",2);
m(4,"Models","The “gig economy” is a labour market based on…","Short-term freelance jobs, often via apps",["Music festivals","Permanent state jobs","Unpaid internships"],"Examples include Uber drivers, Glovo couriers and Fiverr freelancers.",1);
m(4,"Models","Uber owns very few cars. Its model is often described as…","Asset-light",["Capital-intensive","Vertically integrated","State-owned"],"Uber connects drivers and riders through an app rather than owning vehicles.",2);
m(4,"Metrics","“Unit economics” looks at…","Revenue and costs for one customer or one unit sold",["The economics of a whole country","A company’s share price","Employee numbers"],"Investors use it to see if a business can be profitable at scale.",3);
m(4,"Metrics","A common rule of thumb says a healthy SaaS company should have a customer lifetime value (LTV) at least how many times its acquisition cost (CAC)?","3 times",["1 time","10 times","Half"],"An LTV:CAC ratio of 3:1 or more is usually considered healthy.",3);
vf(4,"Airbnb owns most of the properties listed on its platform.",false,"Airbnb is a marketplace: hosts own the properties.",1);
vf(4,"Two-sided platforms often face a “chicken-and-egg” problem when they start.",true,"They need both sides, such as drivers and riders, to attract each other.",2);

m(5,"Case studies","Which US airline, founded in 1967, pioneered the low-cost model with fast turnarounds and one type of aircraft?","Southwest Airlines",["Delta","American Airlines","United"],"Southwest’s model later inspired Ryanair and easyJet.",2);
m(5,"Case studies","The 2018 data scandal that hit Facebook involved which political consulting firm?","Cambridge Analytica",["Palantir","Oracle","Experian"],"The firm harvested data from millions of users without proper consent.",2);
m(5,"Case studies","Which Uber co-founder resigned as CEO in 2017 after a culture and harassment scandal?","Travis Kalanick",["Garrett Camp","Dara Khosrowshahi","Jeff Bezos"],"Dara Khosrowshahi, formerly of Expedia, replaced him.",2);
m(5,"Case studies","The 2013 Rana Plaza building collapse exposed working conditions in the garment industry of which country?","Bangladesh",["India","Vietnam","Cambodia"],"More than 1,100 workers died, leading to new safety agreements with fashion brands.",2);
m(5,"Case studies","In 2019 former Nissan boss Carlos Ghosn escaped from Japan to which country?","Lebanon",["France","Brazil","Spain"],"He was facing financial misconduct charges, which he denies.",3);
m(5,"Case studies","Which 1998 “merger of equals” between two carmakers is widely seen as a failure and ended in 2007?","Daimler and Chrysler",["BMW and Rover","Ford and Volvo","Renault and Nissan"],"Cultural differences and different strategies led to the break-up.",3);
m(5,"Case studies","Which 2000 merger between an internet provider and a media giant is a classic M&A failure?","AOL and Time Warner",["Disney and Pixar","Amazon and Whole Foods","Facebook and Instagram"],"The deal, worth about $165 billion, lost most of its value within two years.",3);
m(5,"Case studies","Which console targeted casual players and families rather than hardcore gamers in 2006?","Nintendo Wii",["PlayStation 3","Xbox 360","Sega Dreamcast"],"Motion controls and Wii Sports made it a bestseller.",2);

ty(4,"What is the business model called where a brand lets others run outlets under its name for fees? (one word)",["franchise","franchising"],"McDonald’s, Subway and Spanish chains such as Telepizza grew through franchising.",1);

return {id:"strategy",title:"Strategy, Management & Negotiation",kw:"strategy management leadership negotiation porter swot bcg five forces blue ocean batna lean agile okr business models case studies dieselgate toyota mba business school",subject:"Porter, BATNA, lean and legendary case studies, the MBA warm-up",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
