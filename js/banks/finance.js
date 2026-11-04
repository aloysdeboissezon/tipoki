// Built-in bank: Money & markets 101 (English). Stocks, accounting, economics, banks and investing in plain questions.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard.
window.BANK_FINANCE=(function(){
const SESS={1:"Stocks & markets",2:"Accounting basics",3:"Economics 101",4:"Banks & central banks",5:"Investing & personal finance"};
const TAGS={1:"Markets",2:"Accounting",3:"Economics",4:"Banks",5:"Investing"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Stocks & markets =====================
m(1,"Basics","What do you own when you buy a share of a company?","A small part of the company",["A loan to the company","A guaranteed monthly income","A right to use its products for free"],"A share (stock) is a unit of ownership: you become a part-owner and can vote and receive dividends.",1);
m(1,"Index","Which index tracks 500 of the largest companies listed in the US?","S&P 500",["Dow 30","CAC 40","FTSE 100"],"The S&P 500 is the most followed benchmark of the US stock market.",1);
m(1,"Index","The IBEX 35 is the main stock index of which country?","Spain",["Italy","Portugal","Mexico"],"IBEX 35 lists the 35 most liquid companies on the Spanish stock exchanges (Santander, Inditex, Iberdrola…).",1);
m(1,"Index","Which index is the main benchmark of the Paris stock exchange?","CAC 40",["DAX","FTSE MIB","AEX"],"CAC 40 = Cotation Assistée en Continu, the 40 biggest French listed companies.",1);
m(1,"Index","Which German index groups the 40 largest listed companies in Frankfurt?","DAX",["Nikkei","Hang Seng","SMI"],"The DAX is Germany’s blue-chip index.",1);
m(1,"Exchange","Where is the Nasdaq, home of many tech shares, based?","New York",["London","Chicago","San Francisco"],"The Nasdaq is a US electronic exchange headquartered in New York, with many tech listings.",2);
m(1,"Basics","What is “market capitalisation”?","Share price multiplied by number of shares",["Total yearly profit","The amount of cash a company holds","The number of employees times the average salary"],"Market cap = what the market says the whole company is worth.",2);
m(1,"Basics","What is a “blue chip” stock?","A share of a large, established and reliable company",["A share in a casino","A very risky penny stock","A newly issued share"],"The term comes from poker, where blue chips are the most valuable.",2);
m(1,"Basics","What does a “short seller” bet on?","The price of the share falling",["The share price rising","The dividend increasing","The company merging"],"A short seller borrows shares, sells them, and hopes to buy them back cheaper.",3);
m(1,"Basics","What is a “stock split”?","The company divides each share into several, lowering the price per share",["The company splits into two businesses","Shareholders share the dividend","The stock is delisted"],"A split changes the number of shares, not the company’s total value.",3);
vf(1,"When a company issues new shares, its existing shareholders’ percentage of ownership can be diluted.",true,"More shares in circulation means each existing share represents a smaller slice.",2);
m(1,"Basics","What is the “ticker” of a stock?","A short code that identifies it, like AAPL",["The price at closing time","The name of its CEO","The size of its dividend"],"Apple trades as AAPL on the Nasdaq; Inditex as ITX on the Spanish exchange.",1);
ty(1,"A rising stock market is called a “bull market”; what is a falling one called? (…… market)",["bear"],"A bear market is a long period of falling prices.",1);
ty(1,"Which company’s ticker is AAPL?",["apple"],"AAPL is Apple.",1);

// ===================== 2. Accounting basics =====================
m(2,"Statements","Which financial statement shows a company’s assets, liabilities and equity at a given date?","Balance sheet",["Income statement","Cash-flow statement","Annual report cover"],"The balance sheet is a photograph of the company on one date.",1);
m(2,"Statements","Which statement shows revenue, expenses and profit over a period?","Income statement (profit and loss)",["Balance sheet","Audit report","Shareholder register"],"The income statement (P&L) is a film of performance over a period, such as a quarter or a year.",1);
m(2,"Equation","Which is the fundamental accounting equation?","Assets = liabilities + equity",["Assets = revenue − costs","Equity = assets + liabilities","Profit = assets × liabilities"],"Every asset is financed either by debt (liabilities) or by owners (equity).",1);
m(2,"Terms","What is an “asset”?","Something the company owns that has value",["Something the company owes","Money paid to staff","A tax on profit"],"Assets include cash, inventory, buildings and patents.",1);
m(2,"Terms","What is a “liability”?","An obligation to pay or deliver something",["A very valuable asset","A sales target","A tax credit"],"Loans, supplier invoices and unpaid taxes are liabilities.",1);
m(2,"Terms","What does “depreciation” represent?","The gradual loss of value of an asset over time",["A rise in profits","A drop in the share price","Interest on a loan"],"A machine bought for 10,000 and used for 5 years can be depreciated 2,000 per year.",2);
m(2,"Terms","What is “working capital”?","Current assets minus current liabilities",["Total equity plus debt","Capital raised from an IPO","The cash in the CEO’s account"],"It measures a company’s ability to meet short-term obligations.",2);
m(2,"Terms","What is “goodwill” in an acquisition?","The price paid above the fair value of the net assets acquired",["A donation to a charity","The CEO’s reputation","An unpaid invoice"],"Goodwill captures brand, customers, know-how and synergies that don’t appear as separate assets.",3);
m(2,"Statements","Why can a profitable company still run out of cash?","Customers pay late and cash goes out before it comes in",["Because profit is always cash","Because taxes cancel profit","Because assets depreciate in cash"],"Profit is not cash: timing matters, which is why the cash-flow statement exists.",2);
m(2,"Terms","What is “COGS”?","Cost of goods sold",["Cash on global stocks","Company ownership grade score","Capital of group shareholders"],"COGS = the direct costs of producing what you sold; revenue minus COGS = gross profit.",2);
vf(2,"IFRS and US GAAP are two sets of accounting standards.",true,"Most of the world uses IFRS; the United States uses US GAAP.",2);
m(2,"Terms","What is an “audit”?","An independent examination of a company’s accounts",["A marketing survey","A loan application","A merger agreement"],"External auditors give an opinion on whether the accounts give a true and fair view.",1);
ty(2,"Revenue minus the cost of goods sold is called ……… profit.",["gross"],"Gross profit = revenue − COGS.",2);
ty(2,"What do we call the money a company owes to its suppliers, shown on the balance sheet as “accounts p……”?",["payable","payables"],"Accounts payable are the short-term debts to suppliers.",3);

// ===================== 3. Economics 101 =====================
m(3,"Micro","According to the law of demand, if the price of a normal good rises, quantity demanded…","falls",["rises","stays the same","doubles"],"Higher prices reduce the quantity people want to buy, all else equal.",1);
m(3,"Macro","What does “GDP” measure?","The value of goods and services produced in a country in a period",["A country’s debt","The number of people working","The amount of cash in banks"],"Gross domestic product is the most common measure of the size of an economy.",1);
m(3,"Macro","What is “inflation”?","A general rise in prices over time",["A fall in unemployment","A rise in interest rates","The value of exports"],"Central banks like the ECB aim for about 2% inflation.",1);
m(3,"Micro","What is “opportunity cost”?","The value of the best alternative you give up",["The price of a luxury","The cost of opening a shop","The tax on profits"],"If you spend Saturday studying, the opportunity cost is the best other thing you could have done.",2);
m(3,"Micro","What is a “monopoly”?","A market with a single seller",["A market with two sellers","A market where prices are fixed by law","A game of properties only"],"A monopolist can set prices more freely; competition authorities watch for abuse.",1);
m(3,"Micro","What is an “oligopoly”?","A market dominated by a few large firms",["A market with a single buyer","A market with a very large number of small firms","A market closed to foreigners"],"Airlines, mobile networks or smartphones are typical oligopolies.",2);
m(3,"Macro","What does “recession” usually mean?","A significant fall in economic activity, typically two quarters of falling GDP",["A rapid rise in prices","A very strong currency","A fall in taxes"],"A common rule of thumb is two consecutive quarters of negative GDP growth.",2);
m(3,"Macro","What is “unemployment rate”?","The share of the labour force that is jobless and looking for work",["The share of the population without a degree","The number of retired people","The share of people with two jobs"],"It counts people actively looking for a job, not everyone without one.",2);
m(3,"Micro","What does “elasticity of demand” measure?","How much demand changes when the price changes",["How flexible a worker is","How fast a product spoils","The size of a market"],"Luxury goods are usually elastic; basic needs like salt are inelastic.",3);
m(3,"Macro","Who wrote “The Wealth of Nations” (1776), with the idea of the “invisible hand”?","Adam Smith",["John Maynard Keynes","Karl Marx","Milton Friedman"],"Adam Smith argued that individuals pursuing self-interest can, in competitive markets, benefit society.",2);
m(3,"Macro","What is “stagflation”?","High inflation together with stagnant growth and high unemployment",["Falling prices with fast growth","A very stable economy","A fall in oil prices"],"Stagflation was a feature of the 1970s oil crises.",3);
vf(3,"In economics, a “public good” such as national defence is non-excludable: you cannot easily stop anyone from benefiting.",true,"Public goods are non-excludable and non-rival, which leads to free-rider problems.",3);
ty(3,"Which economist, famous for his 1936 General Theory, argued that governments should spend more during recessions? (surname)",["keynes","john maynard keynes"],"John Maynard Keynes shaped modern macroeconomics.",2);
ty(3,"What does “GDP” stand for? (Gross D…… Product)",["domestic","gross domestic product"],"Gross Domestic Product.",1);

// ===================== 4. Banks & central banks =====================
m(4,"Central banks","Which institution sets monetary policy for the euro area?","The European Central Bank (ECB)",["The European Commission","The IMF","The Bank of Spain"],"The ECB, based in Frankfurt, sets key interest rates for the euro area.",1);
m(4,"Central banks","In which city is the European Central Bank headquartered?","Frankfurt",["Brussels","Paris","Luxembourg"],"The ECB has been in Frankfurt am Main since 1998.",1);
m(4,"Central banks","What is the name of the US central bank?","The Federal Reserve (the Fed)",["The US Treasury","The Bank of America","The Wall Street Reserve"],"The Fed sets US monetary policy; its chair is a key figure for markets.",1);
m(4,"Central banks","If a central bank raises its key interest rate, borrowing generally becomes…","more expensive",["cheaper","free","impossible"],"Higher rates cool inflation by making credit more expensive.",1);
m(4,"Banking","What is “interest”?","The price paid for borrowing money (or earned on lending it)",["A tax on salaries","A fee for opening an account","The profit of a company"],"Interest is expressed as an annual rate, for instance 3% per year.",1);
m(4,"Banking","What does a bank usually do with your deposits?","Lend part of them to other customers",["Keep all of them in a vault","Give them to the government","Invest only in gold"],"This is “fractional reserve” banking: banks keep only part of deposits as reserves.",2);
m(4,"Banking","What is a “bank run”?","Many customers withdraw their money at once, fearing the bank will fail",["A charity marathon","A merger of two banks","A cut in interest rates"],"Bank runs can topple even healthy banks; deposit insurance exists to prevent them.",2);
m(4,"History","Which US investment bank’s bankruptcy in September 2008 triggered the global financial panic?","Lehman Brothers",["Goldman Sachs","JPMorgan","Citigroup"],"Lehman Brothers filed for bankruptcy on 15 September 2008, the biggest in US history at the time.",2);
m(4,"Banking","What does “IBAN” stand for?","International Bank Account Number",["Internal Bank Authorisation Note","International Bond And Notes","Interest-Based Account Network"],"IBAN is used for cross-border payments, mostly in Europe.",2);
m(4,"Banking","What is “SEPA” in Europe?","A zone where euro payments work like domestic ones",["A stock market","A type of loan","A tax haven"],"Single Euro Payments Area: euro transfers across member countries are as easy as at home.",3);
m(4,"Banking","What is “quantitative easing” (QE)?","A central bank buying bonds to inject money into the economy",["Lowering salaries","Printing the same banknotes again","Closing all bank branches"],"QE was widely used after 2008 and during the COVID-19 crisis.",3);
vf(4,"The Bank of Spain is part of the Eurosystem along with the ECB.",true,"National central banks of euro countries and the ECB form the Eurosystem.",3);
ty(4,"What is the common currency of most EU member countries? (one word)",["euro","the euro"],"The euro was introduced as physical currency in 2002.",1);
ty(4,"Which 2008 bank collapse is nicknamed the largest bankruptcy in US history at the time? (L…… Brothers)",["lehman","lehman brothers"],"Lehman Brothers.",2);

// ===================== 5. Investing & personal finance =====================
m(5,"Basics","What is “diversification”?","Spreading your money across different investments",["Putting everything in one stock","Moving your money abroad","Paying off all debt"],"“Don’t put all your eggs in one basket”: diversification reduces risk.",1);
m(5,"Basics","What is an “ETF”?","A fund traded on an exchange that tracks an index or basket of assets",["A European tax form","A type of bank loan","A trading fee"],"Exchange-traded funds are popular with beginners for low costs and broad exposure.",1);
m(5,"Basics","What is “compound interest”?","Interest earned on both the original amount and on past interest",["Interest on a bank fee","A fixed interest that never changes","Interest paid only at the end"],"Einstein is often (wrongly) credited with calling it the eighth wonder of the world.",1);
m(5,"Basics","What is a “bond”?","A loan to a government or company that pays interest",["A share of a company","A type of currency","A chart pattern"],"Bond holders are lenders, not owners.",1);
m(5,"Basics","In general, higher expected returns come with…","higher risk",["lower risk","no risk","guaranteed profits"],"The risk–return trade-off is the basic idea of finance.",1);
m(5,"Rule","What does the “rule of 72” help you estimate?","Years needed to double money at a given interest rate",["The ideal retirement age","The tax you owe","The number of shares to buy"],"72 divided by the annual rate (in %) gives the years: at 6%, about 12 years.",2);
m(5,"Crypto","Who is credited as the creator of Bitcoin (a pseudonym)?","Satoshi Nakamoto",["Vitalik Buterin","Elon Musk","Changpeng Zhao"],"The Bitcoin white paper was published in 2008 by Satoshi Nakamoto, whose identity is unknown.",1);
m(5,"Basics","What is “inflation” doing to the value of cash in your drawer over time?","It makes it buy less",["It makes it buy more","Nothing","It doubles it"],"Cash loses purchasing power when prices rise.",1);
m(5,"Basics","What is a “credit score” used for?","Lenders estimate how likely you are to repay",["To measure your savings","To rate your job","To fix your income tax"],"A better score generally gets you lower interest rates.",2);
m(5,"Basics","What is “passive investing”?","Tracking a market index rather than picking individual stocks",["Never selling your shares","Investing in empty buildings","Letting someone else keep your money without a contract"],"Index funds and ETFs are the typical tools of passive investors.",2);
m(5,"Basics","What does “P/E ratio” compare?","Share price and earnings per share",["Profit and equity","Payments and expenses","Price and exports"],"A high P/E means investors pay a lot per euro of earnings, often because they expect growth.",3);
vf(5,"A higher interest rate on a savings account always beats inflation.",false,"It depends: if inflation is higher than the rate, your savings lose purchasing power.",2);
ty(5,"What do you call a fund that tracks an index and trades on an exchange? (three letters)",["etf"],"ETF = exchange-traded fund.",1);
ty(5,"Complete the saying: “Don’t put all your ……… in one basket.”",["eggs"],"Diversification, explained with eggs.",1);

return {id:"finance",title:"Money & Markets 101",kw:"finance money markets stocks bourse accounting comptabilité economics économie banks ECB investing esade bba mba wall street",subject:"Stocks, accounting, economics, banks and investing: the basics every business student needs.",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
