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

// ===================== More questions (batch 2) =====================
m(1,"Classics","Who wrote “The General Theory of Employment, Interest and Money” (1936)?","John Maynard Keynes",["Friedrich Hayek","Milton Friedman","Paul Samuelson"],"The book argued that demand drives the economy and gave birth to modern macroeconomics.",2);
m(1,"Classics","Which English economist predicted in 1798 that population growth would outrun food supply?","Thomas Malthus",["David Ricardo","John Stuart Mill","Adam Smith"],"Malthus’s idea was later called the “Malthusian trap”, though technology proved him too pessimistic.",3);
m(1,"Classics","Which economist wrote “Principles of Economics” (1890) and popularised supply and demand curves?","Alfred Marshall",["Vilfredo Pareto","Léon Walras","William Jevons"],"Marshall’s Cambridge textbook was used for decades.",3);
m(1,"Modern","Who in 2009 became the first woman to win the Nobel Prize in Economics?","Elinor Ostrom",["Joan Robinson","Esther Duflo","Janet Yellen"],"Ostrom won for showing how communities can manage shared resources without government or privatisation.",3);
m(1,"Modern","Which Indian-born economist won the 1998 Nobel Prize for work on welfare, poverty and famines?","Amartya Sen",["Abhijit Banerjee","Raghuram Rajan","Jagdish Bhagwati"],"Sen showed that famines can happen even when there is enough food in a country.",2);
m(1,"Modern","Who became the first woman to chair the US Federal Reserve in 2014?","Janet Yellen",["Christine Lagarde","Elizabeth Warren","Ben Bernanke"],"Yellen later became US Treasury Secretary in 2021.",2);
m(1,"Modern","Which economist’s curve suggests that cutting very high tax rates could raise tax revenue?","Arthur Laffer",["Milton Friedman","Thomas Piketty","John Galbraith"],"The Laffer curve was reportedly sketched on a napkin in 1974.",3);
vf(1,"Milton Friedman won the Nobel Prize in Economics in 1976.",true,"He was honoured for his work on consumption, monetary history and the complexity of stabilisation policy.",3);

m(2,"Basics","What does CPI stand for in economics?","Consumer Price Index",["Central Policy Indicator","Corporate Profit Index","Capital Production Index"],"CPI tracks the average prices of a basket of goods and services.",1);
m(2,"Basics","“GDP per capita” is…","GDP divided by the population",["GDP multiplied by the population","GDP minus exports","GDP of the capital city"],"It gives a rough idea of average income, though not of inequality.",1);
m(2,"Basics","Fiscal policy is about…","Government decisions on spending and taxes",["Central bank interest rates","Stock market rules","Bank supervision"],"By contrast, monetary policy is set by the central bank.",2);
m(2,"Basics","A “budget deficit” happens when…","The government spends more than it collects in revenue",["The government collects more than it spends","A company makes a loss","Exports exceed imports"],"Deficits are financed by borrowing, which adds to public debt.",1);
m(2,"Basics","“Real GDP” is GDP adjusted for…","Inflation",["Population","Exchange rates","Taxes"],"Real GDP shows if an economy produces more goods, not just higher prices.",2);
m(2,"Theory","The Phillips curve describes a link between inflation and…","Unemployment",["Exports","Interest rates","Population"],"It suggests that when unemployment is low, inflation tends to be higher.",3);
m(2,"Debt","Which developed country has the highest public debt relative to GDP, above 200%?","Japan",["Italy","Greece","United States"],"Most of Japan’s debt is held by Japanese investors and its central bank.",3);
vf(2,"Higher interest rates usually make borrowing cheaper.",false,"Higher interest rates make loans more expensive, which slows down spending.",1);
vf(2,"GDP includes the value of unpaid housework.",false,"GDP only counts market transactions, so unpaid work at home is left out.",3);

m(3,"Biases","“Confirmation bias” is the tendency to…","Favour information that supports what we already believe",["Always trust experts","Avoid all risks","Copy other people"],"It leads investors to read only news that supports their positions.",1);
m(3,"Biases","The “framing effect” says that decisions are affected by…","How the options are presented",["The weather","The size of the budget","The time of the year"],"“90% survive” sounds better than “10% die”, though they are identical.",2);
m(3,"Biases","The “Dunning-Kruger effect” suggests that people with low skill in a task often…","Overestimate their ability",["Underestimate everyone else","Refuse to compete","Work harder than experts"],"The effect was described by psychologists in 1999.",2);
m(3,"Biases","“Hyperbolic discounting” means that people tend to prefer…","A smaller reward now over a bigger reward later",["A bigger reward later always","No reward","A random reward"],"It helps explain procrastination and low saving rates.",3);
m(3,"Biases","“Mental accounting”, an idea by Richard Thaler, means that people…","Treat money differently depending on where it comes from",["Count everything on a calculator","Never spend savings","Hire accountants for everything"],"For example, people spend a bonus more freely than regular pay.",3);
m(3,"Theory","A “Veblen good” is one whose demand…","Rises as its price rises",["Falls when income rises","Never changes","Depends only on advertising"],"Luxury handbags and watches can become more desirable when they cost more.",3);
m(3,"Theory","In the “ultimatum game”, people often reject very unfair offers, even if they get nothing. This suggests they care about…","Fairness",["Speed","Taxes","Risk-free profit"],"This result goes against the strictly rational “homo economicus” model.",3);
m(3,"Thinkers","Who was Daniel Kahneman’s long-time research partner on prospect theory?","Amos Tversky",["Richard Thaler","Herbert Simon","Gary Becker"],"Tversky died in 1996, before Kahneman won the Nobel Prize in 2002.",2);
m(3,"Thinkers","Herbert Simon’s idea of “bounded rationality” says that people…","Decide with limited information, time and thinking ability",["Never make mistakes","Only decide at random","Always maximise profit"],"Simon won the Nobel Prize in 1978 and said people “satisfice”, or choose what is good enough.",3);
m(3,"Pricing","Why do shops price a product at €9.99 instead of €10?","Prices ending in 9 seem lower than they are",["It is required by law","It saves printing costs","It helps to avoid taxes"],"This is called charm pricing. We read the left digit first and anchor on it.",1);
vf(3,"For most people, losing €100 feels worse than gaining €100 feels good.",true,"This is loss aversion, a key idea in Kahneman and Tversky’s prospect theory.",1);
vf(3,"A free item tends to feel disproportionately attractive.",true,"The “zero-price effect” makes people choose free options even when a cheap paid one is better.",2);

m(4,"Trade","A country that exports more than it imports has a…","Trade surplus",["Trade deficit","Budget deficit","Trade embargo"],"China and Germany usually run large trade surpluses.",1);
m(4,"Trade","Which country is the world’s largest exporter of goods?","China",["United States","Germany","Japan"],"China overtook Germany as the biggest exporter in 2009.",2);
m(4,"Trade","What does FDI stand for?","Foreign direct investment",["Federal debt index","Financial deficit indicator","Fair duty import"],"FDI is when a company invests in or buys businesses in another country, e.g. a factory abroad.",3);
m(4,"Trade","Protectionism means…","Shielding domestic industries from foreign competition",["Protecting borders with soldiers","Helping poor countries","Banning all exports"],"Typical tools are tariffs, quotas and subsidies for local firms.",2);
m(4,"Trade","Which agreement replaced NAFTA among the US, Mexico and Canada in 2020?","USMCA",["TPP","CETA","Mercosur"],"The USMCA is also called T-MEC in Spanish and CUSMA in Canada.",3);
m(4,"Money","A strong euro tends to make European exports…","More expensive for foreign buyers",["Cheaper for foreign buyers","Free of tax","Less popular in Europe"],"A stronger currency makes goods cost more in other currencies.",3);
m(4,"Institutions","In which city are the IMF and the World Bank headquartered?","Washington, D.C.",["Geneva","New York","Brussels"],"Both were created at Bretton Woods in 1944 and are based in the US capital.",2);
m(4,"History","The medieval Hanseatic League was a trade network mainly in…","Northern Europe and the Baltic",["The Mediterranean","The Black Sea","The Atlantic coast of Africa"],"Cities such as Lübeck and Hamburg dominated trade in fish, timber and grain.",3);
vf(4,"OPEC was founded in 1960.",true,"Five countries founded it in Baghdad: Iran, Iraq, Kuwait, Saudi Arabia and Venezuela.",3);
vf(4,"A trade deficit is always a sign of a weak economy.",false,"The US has run trade deficits for decades while remaining the world’s biggest economy.",3);

m(5,"Euro","Which country adopted the euro on 1 January 2023?","Croatia",["Bulgaria","Romania","Poland"],"Croatia also joined the Schengen area on the same day.",3);
m(5,"EU","Where does the European Parliament hold its official plenary sessions?","Strasbourg",["Brussels","Luxembourg","Frankfurt"],"It also meets in Brussels, which makes the Parliament a “travelling circus”.",3);
m(5,"EU","In which city is the EU’s Court of Justice located?","Luxembourg",["Brussels","Strasbourg","The Hague"],"The court makes sure EU law is applied in the same way in all member states.",3);
m(5,"EU","What is “NextGenerationEU”?","A recovery fund created after the COVID-19 pandemic",["A student exchange programme","A new type of euro banknote","A military alliance"],"It is worth around €800 billion and includes grants and loans for member states.",3);
m(5,"EU","In which year did the United Kingdom officially leave the European Union?","2020",["2016","2019","2022"],"The UK voted to leave in 2016 and left on 31 January 2020.",2);
m(5,"EU","How many gold stars are on the EU flag?","12",["27","15","10"],"The number is fixed and doesn’t change when new members join.",2);
m(5,"EU","The EU’s anthem is based on which piece by Beethoven?","Ode to Joy",["Für Elise","Moonlight Sonata","The Pastoral Symphony"],"It comes from the finale of Beethoven’s Ninth Symphony.",2);
m(5,"EU","Which country has the largest population in the EU?","Germany",["France","Italy","Spain"],"Germany has around 84 million inhabitants.",1);
vf(5,"Switzerland is a member of the European Union.",false,"Switzerland is not in the EU, but it is in the Schengen area and trades closely with the EU.",1);

ty(2,"What does CPI stand for? (three words: consumer … index)",["consumer price index","consumer prices index"],"The CPI is the most widely used measure of inflation.",1);

return {id:"econ",title:"Economics & Big Ideas",kw:"economics economy economists adam smith keynes friedman gdp inflation recession central bank ecb fed behavioural kahneman nudge euro european union trade tariffs macro micro business",subject:"From Adam Smith to the euro: ideas every business student should know",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
