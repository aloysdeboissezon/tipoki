// Built-in bank: Business jargon & acronyms (English). Acronyms, corporate speak, startup buzzwords, false friends, books and quotes.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_JARGON=(function(){
const SESS={1:"Acronyms",2:"Corporate speak",3:"Startup & marketing buzzwords",4:"False friends & business English",5:"Books & famous quotes"};
const TAGS={1:"Acronyms",2:"Corporate speak",3:"Buzzwords",4:"False friends",5:"Books & quotes"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Acronyms =====================
m(1,"C-suite","What does CFO stand for?","Chief Financial Officer",["Chief Fashion Officer","Central Finance Office","Chief Funding Owner"],"The CFO manages the company’s finances. The CEO is the Chief Executive Officer, the CTO the Chief Technology Officer.",1);
m(1,"C-suite","What does COO stand for?","Chief Operating Officer",["Chief Overseas Officer","Central Operations Office","Chief Organisation Owner"],"The COO oversees day-to-day operations and is often the CEO’s second in command.",2);
m(1,"C-suite","Which C-suite executive is responsible for marketing?","CMO",["CTO","CFO","CHRO"],"CMO = Chief Marketing Officer.",1);
m(1,"Finance","What does “M&A” stand for?","Mergers and Acquisitions",["Management and Accounting","Marketing and Advertising","Money and Assets"],"M&A refers to companies being combined or bought.",1);
m(1,"Finance","What does “P&L” stand for?","Profit and Loss",["Price and Labour","Planning and Logistics","Payments and Loans"],"A P&L statement is the same as an income statement.",1);
m(1,"Finance","What does “VAT” stand for? (called IVA in Spain)","Value Added Tax",["Variable Asset Tax","Volume and Tariff","Verified Account Transfer"],"VAT is charged at each stage of production and paid by the final consumer.",1);
m(1,"Finance","CAPEX and OPEX are…","Capital expenditure and operating expenditure",["Cash and Profit Expenses","Company Assets and Property Expenses","Cost Analysis and Planning Exercises"],"CAPEX buys long-lasting assets (a factory); OPEX is the cost of running the business (salaries, rent).",3);
m(1,"Finance","What does ESG stand for in investing?","Environmental, Social and Governance",["Economic, Sales and Growth","Equity, Shares and Gold","Export, Supply and Goods"],"ESG criteria evaluate how a company deals with sustainability and ethics.",2);
m(1,"Spain","In Spain, what does “S.L.” after a company name mean?","Sociedad Limitada (limited liability company)",["Sociedad Libre","Sociedad Local","Sin Límite"],"S.L. is similar to an LLC or Ltd. S.A. is Sociedad Anónima, similar to a PLC.",3);
m(1,"Retail","What does “FMCG” stand for?","Fast-Moving Consumer Goods",["Fashion, Media and Consumer Goods","Fixed Market Cost Growth","Foreign Money and Credit Gains"],"Examples: food, drinks and toiletries, such as Coca-Cola or Colgate.",2);
m(1,"Legal","What is an “NDA”?","A non-disclosure agreement",["A national debt account","A new data application","A net discount amount"],"An NDA obliges you to keep information confidential.",2);
vf(1,"“B2C” means a business selling directly to consumers.",true,"B2C = business-to-consumer, like Zara or Netflix.",1);

// ===================== 2. Corporate speak =====================
m(2,"Office talk","“Let’s circle back on this” means…","Let’s discuss it again later",["Let’s cancel it","Let’s draw a circle","Let’s go back home"],"Circling back is a popular way to postpone a topic politely.",1);
m(2,"Office talk","“Low-hanging fruit” refers to…","Easy wins that need little effort",["Hard projects","Expensive items","Healthy snacks"],"The idea is to pick the easiest results first.",1);
m(2,"Office talk","“Synergy” is the idea that…","The combined effect is bigger than the sum of the parts",["Two plus two equals three","Teams should work alone","Mergers always fail"],"Synergy is a common justification for mergers.",2);
m(2,"Office talk","If someone says “I don’t have the bandwidth”, they mean…","I don’t have enough time or capacity",["My internet is slow","I’m not interested in music","I work for a telecom company"],"“Bandwidth” is used for any capacity for work.",2);
m(2,"Office talk","“Let’s take this offline” means…","Let’s discuss it privately, outside the meeting",["Turn off the Wi-Fi","Stop the project","Move to a different building"],"Often used to avoid long debates in front of everyone.",2);
m(2,"Office talk","A “ballpark figure” is…","A rough estimate",["A stadium’s capacity","A very high price","A secret number"],"“Ballpark” is from baseball, meaning roughly in the right area.",2);
m(2,"Office talk","To “move the needle” means to…","Make a noticeable difference",["Sew a new product","Change the subject","Increase the volume"],"It’s about having a visible impact on results.",2);
m(2,"Office talk","A “silver bullet” is…","A single perfect solution to a problem",["A weapon sold by a company","A shiny trophy","A rare coin"],"Business leaders warn that there is no silver bullet.",2);
m(2,"Office talk","“The elephant in the room” is…","An obvious problem that everyone avoids discussing",["The CEO","A very large client","A budget increase"],"The phrase comes from the idea that something huge is ignored.",1);
m(2,"Office talk","To “hit the ground running” means to…","Start a job or project quickly and effectively",["Fall during a presentation","Run away from a meeting","Start with exercise"],"Often used in job interviews and job offers.",1);
vf(2,"“Boiling the ocean” means trying to do something so huge it is impossible.",true,"It describes an overambitious project that wastes effort.",3);
vf(2,"“Touching base” means to make brief contact with someone.",true,"The phrase originates in baseball.",1);

// ===================== 3. Startup & marketing buzzwords =====================
m(3,"Metrics","“Churn” in a subscription business is the rate at which…","Customers stop paying",["Prices increase","Employees quit","Profits grow"],"Reducing churn is vital for businesses like Netflix or Spotify.",2);
m(3,"Metrics","What does “ARR” stand for in SaaS?","Annual Recurring Revenue",["Average Retention Rate","Automatic Revenue Report","Active Rate of Return"],"ARR is the yearly value of subscriptions.",2);
m(3,"Metrics","CTR stands for…","Click-Through Rate",["Customer Trust Rating","Cost To Revenue","Central Tracking Report"],"CTR = clicks ÷ impressions, shown as a percentage.",2);
m(3,"Metrics","What does “LTV” stand for in marketing?","Lifetime Value of a customer",["Low Tax Value","Limited Time Voucher","Last Transaction Volume"],"LTV is the total revenue you expect from a customer over the relationship.",3);
m(3,"Buzzwords","SaaS stands for…","Software as a Service",["Sales as a Strategy","Servers and Storage","Startup as a Solution"],"Examples: Slack, Salesforce, Zoom and Dropbox.",1);
m(3,"Buzzwords","“UGC” in social media marketing stands for…","User-Generated Content",["Universal Growth Code","Unique Group Campaign","Upload-Go-Create"],"UGC is content created by customers rather than by the brand.",2);
m(3,"Buzzwords","A “CTA” in a web page is…","A call to action, like a “Buy now” button",["A customer tax account","A central tracking agent","A conversion time average"],"A strong CTA tells the visitor what to do next.",2);
m(3,"Buzzwords","“Growth hacking” refers to…","Fast, low-cost experiments to grow a user base",["Illegal access to competitors","Pruning a company’s costs","Hiring only engineers"],"Dropbox’s refer-a-friend programme is a famous growth hack.",2);
m(3,"Buzzwords","“Onboarding” means…","Guiding new users or employees through their first steps",["Boarding a plane","Removing old customers","A type of discount"],"Good onboarding reduces churn and improves satisfaction.",1);
m(3,"Buzzwords","A “pitch deck” is…","A slide presentation used to convince investors",["A set of playing cards","A sales spreadsheet","A boat deck"],"A typical deck has 10–15 slides: problem, solution, market, team, ask.",1);
vf(3,"“Go viral” means that content spreads quickly through sharing.",true,"Like a virus, it multiplies from person to person.",1);
vf(3,"“MRR” stands for Monthly Recurring Revenue.",true,"MRR × 12 ≈ ARR.",2);

// ===================== 4. False friends & business English =====================
m(4,"False friends","In English, “actually” means…","In fact, really",["Currently","Immediately","Eventually"],"Spanish “actualmente” and French “actuellement” mean “currently”, which is “nowadays” or “at the moment” in English.",2);
m(4,"False friends","In English, “eventually” means…","In the end, after some time",["Possibly","Immediately","Occasionally"],"Spanish “eventualmente” and French “éventuellement” mean “possibly”. A big false friend!",2);
m(4,"False friends","“Sensible” in English means…","Reasonable, practical",["Sensitive","Emotional","Sentimental"],"A false friend: Spanish “sensible” and French “sensible” mean “sensitive” in English.",2);
m(4,"False friends","“Library” in English is the place where you…","Borrow books",["Buy books","Sell books","Print books"],"A place to buy books is a bookshop (UK) or a bookstore (US). It is “librería” in Spanish and “librairie” in French.",1);
m(4,"False friends","In English, “to assist” a meeting means…","To help with it",["To attend it","To miss it","To cancel it"],"“To attend” a meeting is the right verb. Spanish “asistir” and French “assister” mean “to attend”.",2);
m(4,"False friends","If you are “embarrassed”, you feel…","Ashamed or awkward",["Pregnant","Hungry","Angry"],"Spanish “embarazada” means pregnant. Don’t mix them up!",1);
m(4,"False friends","“Turnover” in UK business English usually means…","Total sales (revenue)",["Staff only","Net profit","Total debt"],"“Staff turnover” is the rate at which employees leave. In the US, revenue is more common.",3);
m(4,"False friends","In American English, one billion equals…","1,000,000,000",["1,000,000,000,000","1,000,000","100,000,000"],"In Spanish “un billón” means 10¹², so “a billion” in English is “mil millones”.",2);
m(4,"False friends","What is the difference between a “shareholder” and a “stakeholder”?","A shareholder owns shares; a stakeholder is anyone affected by the company",["There is no difference","A stakeholder owns shares; a shareholder works there","A shareholder is a customer only"],"Stakeholders include employees, customers, suppliers and the community.",2);
m(4,"False friends","“Invoice” in English means…","A bill requesting payment for goods or services",["A payment receipt","A tax form","A legal complaint"],"Spanish: factura. A receipt is a proof of payment after paying.",1);
vf(4,"“Fabric” in English means a factory.",false,"“Fabric” means cloth. A factory is “fábrica” in Spanish. Another false friend!",1);
vf(4,"In English, “to pretend” means to intend or plan to do something.",false,"“To pretend” means to act as if something is true when it isn’t. Spanish “pretender” means to intend.",2);

// ===================== 5. Books & famous quotes =====================
m(5,"Books","Who wrote “The Lean Startup”?","Eric Ries",["Steve Blank","Peter Thiel","Paul Graham"],"Ries introduced the build–measure–learn loop and the MVP idea.",2);
m(5,"Books","Which book by Peter Thiel argues that startups should create something new rather than copy?","Zero to One",["Hard Things","Good to Great","Start With Why"],"The title means going from nothing to something new, instead of going from 1 to n by copying.",2);
m(5,"Books","“Shoe Dog” is the memoir of the founder of which company?","Nike",["Adidas","Puma","Converse"],"Phil Knight tells the story of Nike from Blue Ribbon Sports.",2);
m(5,"Books","Who wrote “How to Win Friends and Influence People” (1936)?","Dale Carnegie",["Napoleon Hill","Stephen Covey","Tony Robbins"],"It has sold over 30 million copies.",2);
m(5,"Books","Which author popularised the “10,000-hour rule” in the book “Outliers”?","Malcolm Gladwell",["Daniel Kahneman","Simon Sinek","Nassim Taleb"],"The idea is that mastery requires about 10,000 hours of deliberate practice.",2);
m(5,"Books","“The Art of War” is a classic of strategy attributed to…","Sun Tzu",["Confucius","Machiavelli","Lao Tzu"],"Sun Tzu’s text from ancient China is read by many business leaders.",1);
m(5,"Books","Who wrote “Influence: The Psychology of Persuasion”?","Robert Cialdini",["Dale Carnegie","Jordan Belfort","Chris Voss"],"Cialdini’s principles include reciprocity, scarcity and social proof.",3);
m(5,"Quotes","Which quote is by Steve Jobs?","“Stay hungry, stay foolish”",["“Greed is good”","“Move fast and break things”","“Just do it”"],"Jobs quoted the Whole Earth Catalog in his 2005 Stanford commencement speech.",1);
m(5,"Quotes","“Be fearful when others are greedy, and greedy when others are fearful” is a quote from…","Warren Buffett",["Bill Gates","Elon Musk","Jeff Bezos"],"Buffett wrote it in a 2008 newspaper article.",2);
m(5,"Quotes","“Culture eats strategy for breakfast” is often attributed to…","Peter Drucker",["Michael Porter","Jack Welch","Bill Gates"],"It means that a strong culture matters more than a perfect plan.",2);
vf(5,"“Good to Great” is a book by Jim Collins about what makes companies outperform.",true,"Collins studied companies that sustained exceptional performance for 15 years or more.",2);
vf(5,"“Rich Dad Poor Dad” was written by Warren Buffett.",false,"It was written by Robert Kiyosaki in 1997.",1);

// ===================== Typed answers =====================
ty(1,"What does CEO stand for? (three words, starting with “Chief”)",["chief executive officer"],"The CEO is the highest-ranking executive.",1);
ty(1,"What does ROI stand for? (three words)",["return on investment"],"ROI = gain from investment ÷ cost of investment.",1);
ty(1,"What does B2B stand for? (three words, in English)",["business to business","business-to-business"],"B2B companies sell to other businesses.",1);
ty(2,"What word describes a quick, informal chat to update each other? “Touch …”",["base","touch base"],"“Touch base” is borrowed from baseball.",1);
ty(3,"What does KPI stand for? (three words, starting with “Key”)",["key performance indicator"],"A KPI measures progress towards an objective.",1);
ty(4,"In Spanish, “librería” is a bookshop. What is the English word for the place where you borrow books?",["library","the library"],"A library lends books; a bookstore sells them.",1);
ty(5,"Who wrote “The Intelligent Investor”? (surname)",["Graham","Benjamin Graham"],"Benjamin Graham was Warren Buffett’s teacher and mentor.",2);
ty(3,"What does MVP stand for in startups? (three words)",["minimum viable product"],"An MVP is the simplest version of a product to test an idea.",2);

// ===================== More questions (batch 2) =====================
m(1,"Acronyms","What does HR stand for in a company?","Human resources",["High returns","Head representative","Home rules"],"The HR team handles recruiting, contracts, training and employee relations.",1);
m(1,"Acronyms","What does R&D stand for?","Research and development",["Revenue and distribution","Retail and delivery","Reports and data"],"R&D departments create new products and improve existing ones.",1);
m(1,"Acronyms","What does AGM stand for?","Annual general meeting",["Annual growth margin","Associate general manager","Advanced group management"],"Shareholders vote on key decisions at the AGM.",2);
m(1,"Acronyms","What does SKU stand for in retail?","Stock keeping unit",["Sales key update","Supply know-how unit","Store keeper union"],"Each product variant has its own SKU code, e.g. a T-shirt in size M and blue.",3);
m(1,"Acronyms","What does RFP stand for in business?","Request for proposal",["Return for payment","Ready for production","Review of fixed prices"],"A company sends an RFP to suppliers to ask for offers on a project.",3);
m(1,"Acronyms","What does SLA stand for in a service contract?","Service level agreement",["Sales line account","Supplier loan arrangement","Standard legal approval"],"An SLA sets the minimum quality, for example 99.9% uptime.",3);
m(1,"Acronyms","What does FTE mean when counting staff?","Full-time equivalent",["Free trade entity","Final team evaluation","First-time employee"],"Two half-time workers count as 1 FTE.",3);
m(1,"Acronyms","In an email, what does EOD mean?","End of day",["Early order delivery","Every other day","End of discussion"],"“Please send it by EOD” means before the end of the working day.",2);
m(1,"Acronyms","If a colleague’s status says “OOO”, they are…","Out of office",["On order","Over our objectives","Online only"],"OOO replies tell you someone is away and when they’ll be back.",2);
m(1,"Acronyms","What does “YoY” mean in a financial report?","Year over year",["Yearly output yield","Yes or yes","Young owner yield"],"“Sales grew 8% YoY” means they are 8% higher than the same period last year.",2);
m(1,"Acronyms","What does ETA stand for?","Estimated time of arrival",["Extra time allowed","Effective tax amount","End of trading activity"],"Delivery apps and airlines use ETA constantly.",1);
vf(1,"“PR” in business can stand for “public relations”.",true,"PR professionals manage a company’s image in the media.",1);
vf(1,"“TBC” means “to be confirmed”.",true,"“TBD” means “to be determined”.",1);

m(2,"Corporate speak","If a manager asks you to “do a deep dive”, they want…","A detailed analysis of a topic",["A day at the swimming pool","A quick summary","A cancelled project"],"A deep dive means going into the details of the data or problem.",1);
m(2,"Corporate speak","A customer’s “pain point” is…","A problem they want solved",["A physical injury","A discount","A product feature"],"Good products are built around real pain points.",2);
m(2,"Corporate speak","If you “leverage” a resource, you…","Use it to get the maximum advantage",["Lose it","Sell it quickly","Hide it"],"“Let’s leverage our network” means “let’s make good use of our contacts”.",2);
m(2,"Corporate speak","A “stakeholder” is…","Anyone with an interest in a company’s decisions",["A butcher","Someone who only owns shares","A security guard"],"Stakeholders include employees, customers, suppliers and local communities.",2);
m(2,"Corporate speak","“Let’s get on the same page” means…","Let’s make sure we agree and understand each other",["Let’s buy a notebook","Let’s end the meeting","Let’s start again from page one"],"It is used to align a team on goals or facts.",1);
m(2,"Corporate speak","A “deliverable” is…","A tangible result you have to hand over in a project",["A letter sent by post","A late payment","A job candidate"],"Deliverables can be reports, prototypes or presentations.",2);
m(2,"Corporate speak","“Buy-in” from colleagues means…","Their agreement and support for an idea",["A cheap product","Their payment","A stock purchase"],"Without buy-in from managers, change projects often fail.",3);
m(2,"Corporate speak","A “paradigm shift” is…","A fundamental change in how something is done or seen",["A change of shift hours","A new office","A salary increase"],"The term was popularised by philosopher Thomas Kuhn.",2);
m(2,"Corporate speak","To “streamline” a process means to…","Make it simpler and more efficient",["Make it longer","Outsource it","Cancel it"],"Companies streamline operations to cut costs and save time.",2);
m(2,"Corporate speak","If someone “drills down” into the numbers, they…","Examine them in more detail",["Make a hole in the wall","Reduce the budget","Ignore the results"],"In reports, you drill down from totals to individual items.",2);
m(2,"Corporate speak","“Bleeding edge” technology is…","So new and experimental that it is risky",["Dangerous to touch","Very cheap","Outdated"],"It goes a step beyond “cutting edge”.",3);
m(2,"Corporate speak","“Headcount” is…","The number of employees",["A payment to staff","A type of meeting","A health check"],"“We’re freezing headcount” means no new hires.",1);
vf(2,"A “heads-up” is an advance warning or notice.",true,"For example, “just a heads-up, the client moved the meeting”.",1);
vf(2,"“Blue-sky thinking” means brainstorming ideas without limits.",true,"It encourages creative ideas without worrying about practical constraints.",2);

m(3,"Marketing","A “sales funnel” describes…","The customer journey from first contact to purchase",["A device to pour liquids","A list of employees","A factory line"],"The funnel narrows because fewer people reach each next step.",2);
m(3,"Marketing","What is “retargeting”?","Showing ads to people who already visited your site",["Changing company goals","Hiring new marketers","Selling to competitors"],"It explains why a product you looked at seems to follow you online.",3);
m(3,"Marketing","A “landing page” is…","A web page designed for one campaign goal",["The page of an airport","An error page","A home screen of a phone"],"People “land” on it after clicking an ad or email.",2);
m(3,"Marketing","“Conversion rate” is the percentage of visitors who…","Take the desired action, such as buying",["Visit the site twice","Leave the site","Subscribe to a rival"],"If 2 out of 100 visitors buy, the conversion rate is 2%.",2);
m(3,"Marketing","In marketing, a “lead” is…","A potential customer who showed interest",["The boss of the team","A metal used in logos","The first product launched"],"Sales teams qualify leads to find those most likely to buy.",2);
m(3,"Marketing","“Organic reach” means…","Audience reached without paying for ads",["Reaching only farmers","Reaching organic food buyers","Reaching users in Europe"],"Paid reach comes from advertising.",3);
m(3,"Marketing","A “lead magnet” is…","A free resource offered in exchange for contact details",["A strong magnet in the office","A paid ad","A competitor’s product"],"Examples: a free ebook, a template or a discount code.",3);
m(3,"Startup","A startup in “stealth mode” is…","Working in secret before its public launch",["Selling on the black market","Closed for holidays","Located underground"],"Companies stay in stealth to avoid being copied.",3);
m(3,"Startup","“Traction” for a startup means…","Evidence of growth, such as users or revenue",["A type of vehicle","Legal protection","A funding round"],"Investors want to see traction before investing.",2);
m(3,"Startup","A “soft launch” is…","A limited release before the full launch",["A launch with soft drinks","A cancelled launch","A launch only for investors"],"It allows teams to test and fix problems with a small audience.",2);
m(3,"Startup","A “product roadmap” is…","A plan of what a product will do over time",["A map of the office","A delivery route","A sales target"],"Teams share roadmaps to align priorities.",2);
vf(3,"“Churn” is good news for a subscription business.",false,"Churn is the rate at which customers cancel, so lower is better.",1);

m(4,"False friends","In English, “a carpet” is…","A floor covering",["A folder for documents","A small table","A painting"],"The Spanish “carpeta” is a folder, and the English word for it is “folder”.",1);
m(4,"False friends","In English, “parents” means…","Mother and father",["All relatives","Grandparents only","Neighbours"],"“Parientes” in Spanish means “relatives” in English.",1);
m(4,"False friends","In English, “exit” means…","Way out",["Success","Entrance","Result"],"The Spanish “éxito” means “success”.",1);
m(4,"False friends","In English, “large” means…","Big",["Long","Wide only","Heavy"],"The Spanish “largo” means “long”.",1);
m(4,"False friends","In English, “a mayor” is…","The head of a city government",["An older person","A major problem","A military officer"],"The Spanish “mayor” can mean older or bigger.",1);
m(4,"False friends","In English, a “lecture” is…","A talk given to students",["A reading","A library","A written exam"],"The Spanish “lectura” means “reading”.",2);
m(4,"False friends","In the US, a “résumé” is…","A CV",["A summary","A menu","A timetable"],"The Spanish “resumen” means “summary”.",2);
m(4,"False friends","If you are “sympathetic” to someone’s problem, you…","Feel compassion for them",["Find them friendly","Argue with them","Hire them"],"The Spanish “simpático” means “nice” or “friendly”.",2);
m(4,"False friends","To “compromise” in English means…","To accept less than you wanted to reach an agreement",["To make a promise","To commit fully","To lie"],"The Spanish “compromiso” is closer to “commitment”.",2);
m(4,"False friends","To “attend” a meeting in English means…","To be present at it",["To serve the participants","To organise it","To cancel it"],"The Spanish “atender” means “to help” or “to serve”.",2);
vf(4,"In Spanish, “embarazada” means “pregnant”, not “embarrassed”.",true,"A classic false friend, so be careful in conversations!",1);

m(5,"Books","Who wrote “Atomic Habits”?","James Clear",["Charles Duhigg","Stephen Covey","Mark Manson"],"The book argues that tiny daily changes lead to big results over time.",1);
m(5,"Books","Who wrote “The 7 Habits of Highly Effective People”?","Stephen Covey",["Dale Carnegie","Tony Robbins","Napoleon Hill"],"It was published in 1989 and has sold more than 25 million copies.",2);
m(5,"Books","Who wrote “Start with Why”, famous for the “Golden Circle” idea?","Simon Sinek",["Seth Godin","Tim Ferriss","Gary Vaynerchuk"],"Sinek says great organisations inspire people by explaining why they do what they do.",2);
m(5,"Books","Who wrote “The 4-Hour Workweek”?","Tim Ferriss",["Malcolm Gladwell","Eric Ries","Peter Drucker"],"The 2007 bestseller popularised lifestyle design and outsourcing.",2);
m(5,"Books","Who wrote “Lean In”, a 2013 book on women and leadership?","Sheryl Sandberg",["Arianna Huffington","Indra Nooyi","Marissa Mayer"],"Sandberg was then Chief Operating Officer at Facebook.",2);
m(5,"Books","Who wrote “The Black Swan”, about rare and unpredictable events?","Nassim Nicholas Taleb",["Daniel Kahneman","Nate Silver","Michael Lewis"],"Taleb says markets are shaped by rare events that nobody predicts.",3);
m(5,"Books","Who wrote “Competitive Strategy” (1980), introducing the Five Forces?","Michael Porter",["Peter Drucker","Clayton Christensen","Philip Kotler"],"Porter is a professor at Harvard Business School.",2);
m(5,"Books","Who wrote “Crossing the Chasm”, about marketing to mainstream customers?","Geoffrey Moore",["Eric Ries","Steve Blank","Reid Hoffman"],"The “chasm” is the gap between early adopters and the mass market.",3);
m(5,"Books","Who wrote “The Hard Thing About Hard Things” about running a startup?","Ben Horowitz",["Paul Graham","Marc Andreessen","Peter Thiel"],"Horowitz co-founded the venture firm Andreessen Horowitz.",3);
m(5,"Quotes","“Stay hungry, stay foolish” ended which famous 2005 speech?","Steve Jobs’s Stanford commencement address",["Bill Gates’s Harvard speech","Barack Obama’s Berkeley speech","Mark Zuckerberg’s MIT speech"],"Jobs borrowed the line from the final issue of the Whole Earth Catalog.",2);

ty(1,"What does HR stand for? (two words, the first is “human”)",["human resources"],"HR manages recruitment, payroll, training and company culture.",1);
ty(1,"What does ASAP stand for? (four words)",["as soon as possible"],"ASAP is used in emails to mean “urgently”.",1);
ty(1,"What does FYI stand for? (four words, “for … information”)",["for your information"],"FYI introduces facts that are shared without needing action.",1);

return {id:"jargon",title:"Business Jargon Challenge",kw:"business english jargon acronyms vocabulary corporate speak buzzwords startup marketing false friends spanish french books quotes ceo cfo kpi roi",subject:"Acronyms, buzzwords and false friends: can you survive a meeting in English?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
