// Built-in bank: Economics & big ideas (English). Great thinkers, macro basics, behavioural economics, money & trade, Europe & the euro.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_ECON=(function(){
const SESS={1:"Great economists",2:"Macro in a nutshell",3:"Behavioural economics",4:"Money & trade",5:"Europe & the euro"};
const TAGS={1:"Thinkers",2:"Macro",3:"Behavioural",4:"Money & trade",5:"Europe"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Great economists =====================
m(1,"Classics","Who wrote “The Wealth of Nations” (1776) and described the “invisible hand” of the market?","Adam Smith",["John Maynard Keynes","Karl Marx","David Ricardo"],"Adam Smith, a Scottish thinker, is considered the father of modern economics.",1);
m(1,"Classics","Which economist argued that governments should spend more during recessions to boost demand?","John Maynard Keynes",["Milton Friedman","Friedrich Hayek","Adam Smith"],"Keynes’s “General Theory” (1936) responded to the Great Depression.",2);
m(1,"Classics","Which economist from the University of Chicago championed free markets and monetarism?","Milton Friedman",["John Kenneth Galbraith","Paul Krugman","Joseph Stiglitz"],"Friedman, Nobel laureate in 1976, argued that inflation is always a monetary phenomenon.",2);
m(1,"Classics","Who wrote “Das Kapital”?","Karl Marx",["Friedrich Engels alone","Vladimir Lenin","Adam Smith"],"The first volume appeared in 1867. Marx criticised capitalism.",1);
m(1,"Classics","Which economist is associated with the idea of “comparative advantage”?","David Ricardo",["Thomas Malthus","Joseph Schumpeter","Alfred Marshall"],"Ricardo showed that countries gain from trade even if one is better at making everything.",3);
m(1,"Classics","Who popularised the term “creative destruction”, describing how innovation destroys old industries?","Joseph Schumpeter",["Friedrich Hayek","Michael Porter","Peter Drucker"],"Think of the smartphone destroying the camera industry. Schumpeter saw this as the heart of capitalism.",3);
m(1,"Modern","Which French economist wrote “Capital in the Twenty-First Century” on inequality?","Thomas Piketty",["Esther Duflo","Jean Tirole","Daniel Cohen"],"Piketty’s 2013 book sold millions of copies.",2);
m(1,"Modern","John Nash, the mathematician portrayed in “A Beautiful Mind”, won a Nobel for work in which field?","Game theory",["Behavioural finance","Econometrics","Labour economics"],"The Nash equilibrium describes situations where no player can improve by changing strategy alone.",2);
m(1,"Modern","Which Austrian-British economist wrote “The Road to Serfdom” (1944)?","Friedrich Hayek",["John Maynard Keynes","Milton Friedman","Ludwig Wittgenstein"],"Hayek warned that central planning threatens freedom.",3);
m(1,"Modern","“There is no such thing as a free lunch” is a slogan connected to which idea?","Opportunity cost",["Inflation","Monopoly","Subsidies"],"Everything has a cost: even if you do not pay, you give up the next best alternative.",1);
vf(1,"Alfred Nobel created the economics prize in his will, like the other Nobel prizes.",false,"The economics prize was created in 1968 by Sweden’s central bank (Sveriges Riksbank), not by Alfred Nobel.",3);
vf(1,"Adam Smith was Scottish.",true,"He was born in Kirkcaldy, Scotland, in 1723.",2);

// ===================== 2. Macro in a nutshell =====================
m(2,"Basics","GDP measures…","The total value of goods and services produced in a country in a year",["The government’s total debt","The number of people employed","The amount of money printed"],"GDP = Gross Domestic Product. It is the most common measure of the size of an economy.",1);
m(2,"Basics","Inflation is…","A general rise in prices over time",["A fall in unemployment","A rise in a single product’s price only","A decrease in wages"],"Inflation reduces the purchasing power of money.",1);
m(2,"Basics","A recession is commonly defined as…","Two consecutive quarters of falling GDP",["A single month of high inflation","A fall in the stock market of 10%","A rise in unemployment of 1%"],"This is a rule of thumb used in many countries; official bodies may use other criteria.",2);
m(2,"Basics","Central banks usually raise interest rates in order to…","Cool down inflation",["Create more jobs","Cut taxes","Weaken the currency"],"Higher rates make borrowing more expensive, reducing spending and price pressure.",2);
m(2,"Basics","The European Central Bank (ECB) is headquartered in which city?","Frankfurt",["Brussels","Paris","Amsterdam"],"The ECB opened in 1998 in Frankfurt, Germany.",2);
m(2,"Basics","What is the ECB’s medium-term inflation target?","2%",["0%","5%","10%"],"Both the ECB and the US Fed aim at about 2% inflation over the medium term.",2);
m(2,"History","In 1923, Germany experienced what economic phenomenon?","Hyperinflation",["Deflation","Stagflation","A housing bubble"],"Prices doubled every few days. People carried wheelbarrows of banknotes to buy bread.",2);
m(2,"History","“Stagflation” of the 1970s is a combination of…","High inflation and high unemployment",["Low inflation and low unemployment","Deflation and growth","Recession and falling prices"],"The 1973 oil shock caused stagflation in many Western economies.",3);
m(2,"Tools","The Big Mac Index, created by The Economist in 1986, compares…","Currencies’ purchasing power across countries",["Fast-food profits","Obesity rates","Wages in restaurants"],"It is a light-hearted take on purchasing power parity.",2);
m(2,"Tools","The Gini coefficient measures…","Income inequality",["Inflation","Productivity","Public debt"],"0 means perfect equality, 1 means one person has everything.",3);
vf(2,"When demand rises while supply stays the same, prices tend to rise.",true,"It is the basic law of supply and demand.",1);
vf(2,"Deflation means falling prices in general.",true,"Deflation sounds good, but can lead to people delaying purchases and a spiral of falling activity.",2);

// ===================== 3. Behavioural economics =====================
m(3,"Thinkers","Who wrote “Thinking, Fast and Slow” and won the Nobel Prize in Economics in 2002?","Daniel Kahneman",["Richard Thaler","Robert Shiller","Dan Ariely"],"Kahneman, a psychologist, with Amos Tversky revealed the biases in our judgments.",2);
m(3,"Thinkers","The book “Nudge” was co-written by Cass Sunstein and which Nobel winner of 2017?","Richard Thaler",["Daniel Kahneman","Gary Becker","Paul Samuelson"],"Nudges are small design changes, such as automatic enrolment in pension plans, that steer choices.",3);
m(3,"Biases","“Loss aversion” means that…","Losses feel worse than equal gains feel good",["People always avoid risk","People love losing money","People hate saving"],"Kahneman and Tversky found losses hurt about twice as much as gains please.",2);
m(3,"Biases","The “sunk cost fallacy” is when you continue something because…","You have already invested time or money in it",["It is cheap","Everyone else does it","It is risky"],"Example: finishing a bad film only because you paid for the ticket.",2);
m(3,"Biases","“Anchoring” in pricing means that…","The first number you see influences your later judgments",["Prices never change","People only buy anchors","Shops use boats"],"A high original price makes a discounted price look more attractive.",2);
m(3,"Biases","The “endowment effect” is that people…","Value things more once they own them",["Always give gifts","Value things less once they own them","Prefer renting to owning"],"In experiments, people given a mug demanded more to sell it than others would pay to buy it.",3);
m(3,"Biases","“Herd behaviour” in markets is when investors…","Follow the crowd rather than their own analysis",["Hold only cattle stocks","Invest only in funds","Trade only at night"],"Herd behaviour helps fuel bubbles and panics.",1);
m(3,"Theory","In the “Prisoner’s Dilemma”, two suspects…","Do better together by cooperating but are tempted to betray",["Always cooperate","Never speak","Always confess"],"Individually rational choices lead to a worse collective outcome. It is the classic example of game theory.",2);
m(3,"Theory","“Homo economicus” is the idea of…","A perfectly rational, self-interested decision maker",["A caveman trader","An economics professor","A robot cashier"],"Behavioural economics shows that real people are not perfectly rational.",3);
m(3,"Theory","Garrett Hardin’s “Tragedy of the Commons” describes…","Shared resources overused because each person acts in self-interest",["Public theatres losing money","Wealthy families inheriting land","Taxes funding public goods"],"Overfishing is a classic example.",3);
vf(3,"Offering three options, with one that is clearly worse than another, can push people toward the more expensive one.",true,"It is called the decoy effect, studied by Dan Ariely with subscriptions of The Economist.",3);
vf(3,"Setting a default option, like automatic pension enrolment, has almost no effect on what people choose.",false,"Defaults have a very strong effect because most people stay with them.",2);

// ===================== 4. Money & trade =====================
m(4,"History","The Dutch East India Company (VOC), founded in 1602, is famous for being…","One of the first companies to issue shares to the public",["The first airline","The first bank","The first supermarket"],"Its shares were traded on the Amsterdam exchange.",3);
m(4,"History","The 1944 Bretton Woods conference created which two institutions?","The IMF and the World Bank",["The EU and NATO","The WTO and OPEC","The UN and the ECB"],"It also set up the post-war monetary order with the US dollar tied to gold.",3);
m(4,"History","Which country was the first to leave the European Union, after a referendum in 2016?","The United Kingdom",["Greece","Poland","Switzerland"],"Brexit took effect on 31 January 2020.",1);
m(4,"Institutions","The World Trade Organization (WTO) is headquartered in which city?","Geneva",["New York","Brussels","Vienna"],"The WTO was created in 1995.",2);
m(4,"Institutions","OPEC is an organisation of countries that export what?","Oil",["Wheat","Gold","Cars"],"OPEC = Organization of the Petroleum Exporting Countries, founded in 1960.",2);
m(4,"Institutions","The acronym BRICS originally stood for Brazil, Russia, India, China and…","South Africa",["Spain","Saudi Arabia","Switzerland"],"Many other countries have joined or been invited since 2024.",2);
m(4,"Basics","A tax on imported goods is called a…","Tariff",["Subsidy","Dividend","Quota"],"Tariffs make foreign goods more expensive and protect local producers.",1);
m(4,"Basics","A country that imports more than it exports has a…","Trade deficit",["Budget surplus","Trade surplus","Currency peg"],"A trade deficit means the country spends more on imports than it earns from exports.",2);
m(4,"Currencies","Which currency is the most used in international reserves and trade?","The US dollar",["The euro","The yen","The pound"],"The dollar makes up around 58% of global foreign exchange reserves.",2);
m(4,"Currencies","Which currency is considered a classic “safe haven” in times of crisis?","The Swiss franc",["The Turkish lira","The Argentine peso","The Russian ruble"],"Switzerland’s stability and neutrality attract investors in uncertain times.",3);
vf(4,"The Silk Road was a network of trade routes connecting China with the Mediterranean world.",true,"It carried silk, spices and ideas for centuries.",1);
vf(4,"Under the gold standard, a currency can be exchanged for a fixed quantity of gold.",true,"Most countries abandoned it in the 1930s and the US ended it in 1971.",2);

// ===================== 5. Europe & the euro =====================
m(5,"Euro","In which year did euro banknotes and coins enter circulation?","2002",["1992","1999","2008"],"The euro existed electronically from 1999 and in cash from 1 January 2002.",2);
m(5,"Euro","Who has been the president of the European Central Bank since 2019?","Christine Lagarde",["Mario Draghi","Jean-Claude Trichet","Ursula von der Leyen"],"Lagarde, French, succeeded Mario Draghi.",2);
m(5,"Euro","Which Nordic EU member has kept its own currency, the krona, rather than adopting the euro?","Sweden",["Finland","Estonia","Latvia"],"Finland, Estonia and Latvia use the euro; Sweden and Denmark do not.",2);
m(5,"Euro","Which country has the largest economy in the euro area?","Germany",["France","Italy","Spain"],"Germany’s GDP is the largest in the EU, followed by France.",1);
m(5,"EU","Where is the European Commission’s headquarters?","Brussels",["Strasbourg","Luxembourg","Frankfurt"],"The European Parliament also meets in Strasbourg.",1);
m(5,"EU","The Treaty of Rome in 1957 created which institution, the ancestor of the EU?","The European Economic Community",["The Eurozone","NATO","The Council of Europe"],"Six countries signed: Belgium, France, Italy, Luxembourg, the Netherlands, West Germany.",3);
m(5,"EU","The Maastricht Treaty (1992) is best known for…","Creating the European Union and the path to the euro",["Creating NATO","Ending the Cold War","Founding the WTO"],"It set the “convergence criteria” for euro membership, such as deficits below 3% of GDP.",3);
m(5,"EU","The Schengen Area is a zone in which…","Border checks between countries are mostly abolished",["Everyone uses the euro","A single tax applies","English is the only language"],"Schengen covers most EU countries and some non-EU states, like Switzerland and Norway.",2);
m(5,"EU","Which of these countries is NOT a member of the European Union?","Switzerland",["Austria","Ireland","Portugal"],"Switzerland has bilateral agreements with the EU but never joined it.",1);
m(5,"EU","What is the EU’s “Single Market” known for?","Free movement of goods, services, capital and people",["A single language","A common army","A single tax rate"],"These are the “four freedoms”.",2);
vf(5,"The euro is used in all 27 EU member countries.",false,"Some members, like Sweden, Poland, Czechia, Hungary, Romania and Denmark, keep their own currencies.",2);
vf(5,"Spain joined the EU’s predecessor in 1986, and adopted the euro in 2002 together with 11 other countries.",true,"Twelve countries introduced euro cash on 1 January 2002.",2);

// ===================== Typed answers =====================
ty(1,"Which Scottish thinker wrote “The Wealth of Nations”? (surname)",["Smith","Adam Smith"],"Adam Smith, 1776.",1);
ty(2,"What does GDP stand for? (three words: Gross ... ...)",["gross domestic product"],"GDP = Gross Domestic Product.",1);
ty(2,"What is the name of the US central bank? (two words, or the nickname “the …”)",["Federal Reserve","Fed","the Fed"],"The Federal Reserve was created in 1913.",2);
ty(3,"What word describes a small push that steers people’s choices without forbidding anything, in a famous book by Thaler and Sunstein?",["nudge","a nudge"],"Nudge: Improving Decisions About Health, Wealth, and Happiness (2008).",2);
ty(4,"What is the name of the global body that sets international trade rules, abbreviated WTO? (three words)",["world trade organization","world trade organisation"],"The WTO replaced the GATT in 1995.",2);
ty(5,"Which city hosts the European Central Bank? (German financial capital)",["Frankfurt","Frankfurt am Main"],"Frankfurt is the financial capital of Germany.",1);
ty(2,"What is the term for a general fall in prices over time? (one word)",["deflation"],"Deflation is the opposite of inflation.",2);

return {id:"econ",title:"Economics & Big Ideas",kw:"economics economy economists adam smith keynes friedman gdp inflation recession central bank ecb fed behavioural kahneman nudge euro european union trade tariffs macro micro business",subject:"From Adam Smith to the euro: ideas every business student should know",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
