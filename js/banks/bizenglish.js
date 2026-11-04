// Built-in bank: Business English & buzzwords (English). The words you hear in every meeting, case study and internship interview.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard.
window.BANK_BIZENGLISH=(function(){
const SESS={1:"Meetings & office talk",2:"Money & finance words",3:"Marketing & sales words",4:"Management & HR words",5:"Startup & consulting slang"};
const TAGS={1:"Meetings",2:"Finance words",3:"Marketing words",4:"Management words",5:"Startup slang"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Meetings & office talk =====================
m(1,"Idiom","In a meeting, what does “let’s touch base” mean?","Let’s have a short catch-up",["Let’s start a baseball game","Let’s cancel the project","Let’s sign the contract"],"“Touch base” means to get in contact briefly to share updates (the phrase comes from baseball).",1);
m(1,"Acronym","What does the email abbreviation “FYI” stand for?","For your information",["For your inspection","First year income","Find your idea"],"FYI = for your information: you get it as a heads-up, no action needed.",1);
m(1,"Idiom","What does “ballpark figure” mean?","A rough estimate",["An exact audited number","A price for stadium tickets","A secret budget"],"A ballpark figure is an approximate number, good enough to get an idea.",1);
m(1,"Idiom","“Let’s circle back to this” means…","Let’s come back to it later",["Let’s walk around the office","Let’s drop it for ever","Let’s vote right now"],"To circle back is to return to a topic at a later time, usually after dealing with something else.",1);
m(1,"Idiom","What is “the elephant in the room”?","A big, obvious problem nobody wants to mention",["A very large client","A surprise guest","The company mascot"],"The elephant in the room is an obvious issue everyone sees but avoids discussing.",1);
m(1,"Jargon","In a meeting, “take it offline” means…","Discuss it separately, after the meeting",["Switch off the Wi-Fi","Delete it from the agenda for good","Post it on social media"],"“Let’s take it offline” = continue this topic one-to-one so the group can move on.",2);
m(1,"Jargon","What is a “deliverable”?","A concrete output you must hand over",["A delivery driver","A person who can be fired","A discount offered to clients"],"A deliverable is a tangible or measurable result: a report, a prototype, a slide deck.",2);
m(1,"Jargon","What does “bandwidth” mean when a colleague says “I don’t have the bandwidth”?","I don’t have the time or energy for more work",["My internet is too slow","I’m not allowed to use the printer","I don’t have a budget"],"In office talk, bandwidth means your capacity to take on more tasks.",2);
vf(1,"A “stand-up” meeting is typically short and quick, sometimes literally held standing.",true,"Daily stand-ups (popular in agile teams) last about 15 minutes.",1);
m(1,"Acronym","“Please send it by EOD.” When is that?","By the end of the day",["Every other day","Early on Delivery","At the end of the discussion"],"EOD = end of day, usually the close of the working day.",1);
m(1,"Jargon","What is an “agenda” for a meeting?","The list of topics to cover",["The minutes written afterwards","The seating plan","The catering order"],"An agenda lists what will be discussed; the minutes are the written record afterwards.",1);
ty(1,"What do we call the written record of what was said and decided in a meeting? (two words: m…… of the meeting)",["minutes"],"The minutes of the meeting record decisions and action points.",2);
ty(1,"What does the acronym “KPI” stand for? (Key … Indicator)",["performance","key performance indicator"],"KPI = Key Performance Indicator: a number that tracks progress towards a goal.",1);

// ===================== 2. Money & finance words =====================
m(2,"Accounting","What does “ROI” stand for?","Return on investment",["Rate of inflation","Revenue over income","Risk of insolvency"],"ROI = return on investment: the gain compared with what you invested.",1);
m(2,"Accounting","In accounting, what does “net” profit mean?","Profit after all costs, interest and taxes",["Profit before any costs","Profit made online","Profit shared with staff"],"Net profit is the bottom line, after every expense is deducted.",1);
m(2,"Accounting","What is “revenue”?","The money a company earns from sales",["The money left after tax","A loan from the bank","The value of the building"],"Revenue (turnover) is the top line: total sales before costs.",1);
m(2,"Markets","What is a “bull market”?","A market where prices are rising",["A market for cattle","A market where prices crash","A market closed for holidays"],"Bulls thrust their horns up (rising market); bears swipe down (falling market).",1);
m(2,"Markets","What is a “bear market”?","A period when prices fall significantly",["A market full of speculators","A very stable market","A market for luxury goods"],"A bear market is usually defined as a fall of 20% or more from recent highs.",1);
m(2,"Finance","What does “IPO” stand for?","Initial public offering",["International profit order","Internal payment option","Investor protection office"],"In an IPO a private company sells its shares to the public for the first time.",1);
m(2,"Finance","What is “liquidity”?","How easily you can turn an asset into cash",["How much water a company uses","The size of a bank","The tax rate on dividends"],"Cash is the most liquid asset; a building is not liquid.",2);
m(2,"Finance","What is a “dividend”?","A share of profit paid to shareholders",["A fine for paying late","A type of bank account","A fee paid to auditors"],"Companies can pay part of their profits to shareholders as dividends.",2);
m(2,"Finance","“Burn rate” describes…","How fast a company spends its cash",["How fast a product sells out","The rate of staff turnover","The speed of a data upload"],"Startups talk about burn rate (cash spent per month) and runway (months of cash left).",2);
m(2,"Accounting","What does “EBITDA” leave out of earnings?","Interest, taxes, depreciation and amortisation",["Salaries and rent","Sales and marketing","Dividends and bonuses"],"EBITDA = earnings before interest, taxes, depreciation and amortisation.",3);
vf(2,"“Bottom line” is a nickname for net profit.",true,"Net income sits on the last line of the income statement.",2);
m(2,"Finance","“Hedging” means…","Reducing risk by taking an offsetting position",["Betting everything on one stock","Hiding profits from the tax office","Buying a company’s competitors"],"A hedge protects against losses, like insurance (for example currency forwards).",3);
ty(2,"What do we call the top line of an income statement, before any costs are deducted? (r……)",["revenue","turnover","sales"],"Revenue is the top line of the income statement.",1);
ty(2,"What do we call a loss of purchasing power as prices rise across the economy? (i……)",["inflation"],"Inflation is a general rise in prices over time.",1);

// ===================== 3. Marketing & sales words =====================
m(3,"Marketing","What are the classic “4 Ps” of the marketing mix?","Product, price, place, promotion",["People, profit, plan, process","Product, packaging, payment, patent","Price, performance, purpose, prestige"],"The 4 Ps (McCarthy, popularised by Kotler) are product, price, place and promotion.",1);
m(3,"Sales","What is a “lead”?","A potential customer",["A senior manager","A discount code","The first product in a range"],"A lead is someone who might buy: you qualify leads and convert them into customers.",1);
m(3,"Sales","What is a “CTA” on a web page?","A call to action, like a “Buy now” button",["A customer tax allowance","A company trading account","A creative team assistant"],"CTA = call to action: the thing you want the visitor to do.",1);
m(3,"Marketing","What does “B2B” mean?","Business to business",["Back to basics","Brand to buyer","Buy two, borrow two"],"B2B companies sell to other companies; B2C companies sell to consumers.",1);
m(3,"Marketing","What is “brand awareness”?","How well people recognise a brand",["The cost of a logo","A brand’s total profit","The number of its products"],"Awareness is the first step of the funnel: people know you exist.",1);
m(3,"Sales","What does “churn” measure?","The share of customers who leave",["The number of new products","How fast ads load","How many emails are opened"],"Churn rate is the percentage of customers who stop buying or cancel in a period.",2);
m(3,"Marketing","What does “CAC” stand for?","Customer acquisition cost",["Central advertising committee","Cash and carry","Consumer approval check"],"CAC = what you spend, on average, to win one new customer.",2);
m(3,"Marketing","What is a “USP”?","Unique selling proposition",["Universal sales plan","Unfair supplier price","User support process"],"Your USP is what makes your offer different from competitors.",2);
m(3,"Marketing","What does the AIDA model describe?","Attention, interest, desire, action",["Analysis, ideas, design, approval","Ads, income, data, audit","Awareness, integrity, delivery, aftercare"],"AIDA: the stages a customer goes through before buying.",2);
m(3,"Digital","What does “SEO” aim to improve?","Your ranking in search engine results",["Your delivery speed","Your social media likes","Your staff happiness"],"Search engine optimisation helps pages rank higher in unpaid results.",1);
m(3,"Marketing","In the marketing funnel, what comes after “awareness”?","Consideration",["Loyalty","Refund","Production"],"Typical funnel: awareness, consideration, decision (purchase), then retention and loyalty.",2);
m(3,"Digital","What is “A/B testing”?","Showing two versions to see which performs better",["Auditing two years of accounts","Ranking customers from A to B","Testing for two blood types"],"Version A and version B go to different groups and the data decides.",2);
vf(3,"“Upselling” means persuading a customer to buy a more expensive version.",true,"Cross-selling adds a complementary product; upselling moves the buyer up in price.",2);
ty(3,"What do we call a very small test group of products or people used before a full launch? (p…… test)",["pilot"],"A pilot lets you check the idea at small scale before the big launch.",3);
ty(3,"In B2C, what does the “C” stand for?",["consumer","consumers","customer"],"B2C = business to consumer.",1);

// ===================== 4. Management & HR words =====================
m(4,"HR","What does “onboarding” refer to?","Integrating a new employee into the company",["Boarding a business-class flight","Closing a branch","Sending a monthly invoice"],"Onboarding covers the first weeks: tools, people, culture, expectations.",1);
m(4,"HR","What is a “job description”?","A document listing a role’s duties and requirements",["A CV","A salary slip","An employment contract signed in advance"],"It tells candidates what the role does and what skills are needed.",1);
m(4,"Management","What does “to delegate” mean?","To give a task or authority to someone else",["To fire a team member","To ask for a promotion","To postpone a deadline"],"Good managers delegate so they can focus on what only they can do.",1);
m(4,"Management","What does “SMART” in “SMART goals” stand for?","Specific, measurable, achievable, relevant, time-bound",["Simple, modern, agile, rapid, tested","Safe, mobile, accurate, remote, trained","Strategic, motivated, aware, ready, trusted"],"SMART goals are clear enough to be tracked and judged at a deadline.",2);
m(4,"HR","What is “turnover” in HR?","The rate at which employees leave and are replaced",["The company’s yearly sales","The time to cook lunch","A reorganisation of the offices"],"Staff turnover is the share of employees who leave in a period. (In UK accounting, turnover also means revenue.)",2);
m(4,"Management","What is “micromanaging”?","Controlling every small detail of someone’s work",["Managing very small companies","Delegating everything","Managing only the budget"],"Micromanagers hover over details; it usually kills trust and motivation.",1);
m(4,"HR","What is a “probation period”?","An initial trial period for a new employee",["A time of suspension after a mistake","A legal limit on working hours","A training abroad"],"During probation, both sides can end the contract more easily.",2);
m(4,"HR","What does “to headhunt” mean?","To recruit a person already working elsewhere",["To dismiss an employee","To write a job advert","To train managers"],"Headhunters approach senior talent directly, often for executive roles.",2);
m(4,"Management","What is a “flat organisation”?","One with few or no levels of middle management",["A company with only one office","An open-plan floor","A company that makes flat-pack furniture"],"Flat structures push decisions to the team (think many startups).",2);
m(4,"Management","What does “stakeholder” mean?","Anyone affected by or interested in a company’s activity",["Only the shareholders","The person who holds the cash","A kind of investor in meat"],"Stakeholders include employees, customers, suppliers, communities and shareholders.",2);
vf(4,"A “shareholder” and a “stakeholder” mean exactly the same thing.",false,"Shareholders own shares; stakeholders is a wider group that also includes staff, customers, suppliers…",2);
m(4,"HR","What is a “zero-hours contract”?","A contract with no guaranteed minimum working hours",["A contract that ends at midnight","A contract for night shifts","An unpaid internship"],"Common in the UK: the employer is not obliged to offer any hours.",3);
ty(4,"In British English, if your role is no longer needed and you lose your job, you are “made r……”. Which word?",["redundant"],"In UK English, being made redundant means losing your job because the role is no longer needed.",3);
ty(4,"What word means to give someone a higher rank or position at work? (p……)",["promote","promotion"],"A promotion is a move up to a more senior position.",1);

// ===================== 5. Startup & consulting slang =====================
m(5,"Startup","What is a “unicorn”?","A startup valued at over $1 billion",["A very rare job offer","A product that never fails","A company with only one employee"],"Venture capitalist Aileen Lee coined “unicorn” in 2013 for privately held startups worth $1bn+.",1);
m(5,"Startup","What is “MVP” in startup language?","Minimum viable product",["Most valuable player","Maximum value price","Managed venture partner"],"An MVP is the simplest version of a product that lets you test the idea with real users.",1);
m(5,"Startup","What is an “elevator pitch”?","A very short summary of your idea",["A pitch given only in lifts","A cheap advertising slot","A speech to your staff"],"The idea: sell your project in the time of an elevator ride, about 30 seconds.",1);
m(5,"Startup","What does “to pivot” mean?","To change the direction of your business model",["To fire the CEO","To go public","To raise prices"],"Many famous companies pivoted; Instagram started as a check-in app called Burbn.",2);
m(5,"Startup","What is “bootstrapping”?","Funding a company with your own money and its revenue",["Selling shoes online","Raising a huge VC round","Going through bankruptcy"],"A bootstrapped founder avoids outside investors.",2);
m(5,"Consulting","In consulting, “MECE” describes a structure that is…","Mutually exclusive, collectively exhaustive",["Made easy, clear and efficient","Managed externally for cost efficiency","Market-ready, customer-engaged"],"MECE (a McKinsey-style principle): no overlaps, no gaps.",3);
m(5,"Consulting","What is “the Big Four”?","Deloitte, PwC, EY and KPMG",["Google, Apple, Meta and Amazon","McKinsey, BCG, Bain and Accenture","HSBC, Barclays, Santander and BNP"],"The Big Four are the largest accounting and professional services networks. (MBB = McKinsey, Bain, BCG.)",2);
m(5,"Startup","What is “runway” for a startup?","How many months of cash are left",["The length of a product demo","The distance between two offices","The time to the next funding round meeting"],"Runway = cash in the bank divided by monthly burn rate.",2);
m(5,"Startup","What is “vaporware”?","A product announced but never actually delivered",["A cloud storage service","A vaping device","A cleaning app"],"Vaporware is hype without a real product.",3);
m(5,"Startup","In investing, “Series A” is typically…","An early funding round after seed",["The last round before an IPO","A type of TV show","A bank loan"],"Rounds usually go pre-seed, seed, Series A, B, C…",2);
vf(5,"“Pitch deck” is the name for the slide presentation shown to investors.",true,"A pitch deck sums up problem, solution, market, team and ask in about 10–15 slides.",1);
m(5,"Startup","What does “scalable” mean for a business?","It can grow a lot without costs growing at the same rate",["It is sold in weighing machines","It only works in one city","It needs many employees to grow"],"Software is scalable: one more user costs almost nothing.",2);
ty(5,"What do we call a person who invests in early-stage startups with their own money? (two words: business a……)",["angel","business angel","angel investor"],"Business angels back startups before venture capital funds step in.",2);
ty(5,"What does “VC” stand for in startup language? (… capital)",["venture","venture capital"],"Venture capital funds invest in high-growth startups in exchange for equity.",1);

return {id:"bizenglish",title:"Business English & Buzzwords",kw:"business english vocabulary buzzwords jargon meeting finance marketing management startup consulting esade bba mba internship interview",subject:"Meetings, money, marketing, management and startup slang: do you speak business?",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
