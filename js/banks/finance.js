// Built-in bank: Finance & markets (English). Markets, crashes, legendary investors, crypto & fintech, corporate finance.
// Hand-written and static, so every device builds the exact same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy, 2 = medium, 3 = hard (for fans).
window.BANK_FINANCE=(function(){
const SESS={1:"Markets & stocks",2:"Crashes & crises",3:"Legendary investors",4:"Crypto & fintech",5:"Corporate finance"};
const TAGS={1:"Markets",2:"Crashes",3:"Investors",4:"Crypto & fintech",5:"Corp. finance"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e,d)=>Q.push({s,t,q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});

// ===================== 1. Markets & stocks =====================
m(1,"Basics","A “bull market” is a period when prices are…","Rising",["Falling","Flat","Impossible to predict"],"Bulls thrust their horns upward; bears swipe downward. A bear market is usually a fall of 20% or more.",1);
m(1,"Basics","A stock’s “dividend” is…","A share of profits paid to shareholders",["A tax on shares","The price of one share","A bank loan"],"Companies can pay dividends in cash, or reinvest profits in the business instead.",1);
m(1,"Indices","Which index tracks 500 large US companies?","S&P 500",["Dow Jones","Nasdaq 100","Russell 2000"],"The S&P 500 is the most followed benchmark for the US market.",1);
m(1,"Indices","Which index tracks the 40 largest companies on Euronext Paris?","CAC 40",["DAX","FTSE 100","IBEX 35"],"CAC stands for Cotation Assistée en Continu.",2);
m(1,"Indices","Which German index is made up of the 40 biggest listed companies in Frankfurt?","DAX",["CAC 40","AEX","SMI"],"DAX = Deutscher Aktienindex.",2);
m(1,"Indices","The Nikkei 225 is the main stock index of which country?","Japan",["China","South Korea","Singapore"],"The Nikkei tracks 225 companies listed on the Tokyo Stock Exchange.",2);
m(1,"Products","What does “ETF” stand for?","Exchange-Traded Fund",["Equity Transfer Form","Electronic Trading Fee","European Treasury Fund"],"An ETF is a basket of assets that trades on a stock exchange like a share.",2);
m(1,"Basics","What does “short selling” mean?","Betting that a stock’s price will fall",["Selling shares after a year","Selling only a small number of shares","Buying shares at a discount"],"A short seller borrows shares, sells them, and hopes to buy them back cheaper.",2);
m(1,"Ratios","The P/E ratio compares a share’s price to…","Its earnings per share",["Its dividend","Its book value","Its revenue growth"],"P/E = price ÷ earnings per share. A high P/E can mean high growth expectations.",2);
m(1,"Basics","Companies listed on NASDAQ are mostly known for being…","Technology companies",["Oil companies","Banks","Farmers"],"Apple, Microsoft, Amazon, Nvidia and Alphabet are all listed on NASDAQ.",2);
vf(1,"The ticker symbol of Apple on the stock exchange is AAPL.",true,"Tickers are short codes: AAPL (Apple), MSFT (Microsoft), TSLA (Tesla).",1);
vf(1,"A “blue-chip” stock is the stock of a large, well-established and financially solid company.",true,"The term comes from the highest-value chips in poker, the blue ones.",2);

// ===================== 2. Crashes & crises =====================
m(2,"History","The stock market crash of October 1929 started which global economic crisis?","The Great Depression",["The Oil Crisis","The Dot-com Bubble","The Euro Crisis"],"The Dow lost almost 90% of its value by 1932. Unemployment in the US exceeded 20%.",1);
m(2,"History","Which investment bank’s bankruptcy in September 2008 marked the peak of the global financial crisis?","Lehman Brothers",["Goldman Sachs","Merrill Lynch","Bear Stearns"],"Lehman filed for bankruptcy on 15 September 2008, the biggest bankruptcy in US history.",1);
m(2,"History","The 2008 financial crisis was triggered by problems in which US market?","Subprime mortgages",["Oil futures","Government bonds","Student loans"],"Banks had bundled risky home loans into complex securities that lost value when borrowers defaulted.",2);
m(2,"History","The dot-com bubble burst in which period?","2000–2002",["1987","1995","2010"],"The Nasdaq lost around 78% from its peak in March 2000 to its low in October 2002.",2);
m(2,"History","Which country received the first big bailout of the eurozone debt crisis in 2010?","Greece",["Spain","Italy","Germany"],"Greece was followed by Ireland, Portugal, Cyprus, and a banking bailout in Spain.",2);
m(2,"History","The “Tulip Mania” bubble of the 1630s happened in which country?","The Netherlands",["France","Turkey","Spain"],"Prices of rare tulip bulbs soared and then collapsed. It is often called the first speculative bubble.",2);
m(2,"History","“Black Monday” of 19 October 1987 saw the Dow Jones fall about…","22% in a single day",["2% in a single day","8% in a single day","50% in a single day"],"It was the largest one-day percentage drop in the Dow’s history.",3);
m(2,"History","In January 2021, Reddit users of r/WallStreetBets pushed up the share price of which company?","GameStop",["Blockbuster","Nokia","Kodak"],"A short squeeze pushed GameStop shares up more than 1,500% in January 2021. Hedge funds lost billions.",2);
m(2,"History","In 2007, which British bank suffered the first run on a UK bank in more than 100 years?","Northern Rock",["Barclays","HSBC","Lloyds"],"Customers queued outside the branches to withdraw savings. The bank was later nationalised.",3);
m(2,"Vocabulary","“Too big to fail” means a company is so large that…","Its collapse would threaten the whole economy, so governments may rescue it",["It never makes losses","It has no competitors","It cannot be sold"],"Banks like Citigroup and AIG were rescued in 2008 for this reason.",2);
vf(2,"The South Sea Bubble of 1720 involved a British company, and Isaac Newton lost money in it.",true,"Newton reportedly said he could calculate the motions of the heavenly bodies, but not the madness of the people.",3);
vf(2,"The COVID-19 market crash of March 2020 was one of the fastest falls in stock market history.",true,"The S&P 500 fell over 30% in about a month before rebounding.",2);

// ===================== 3. Legendary investors =====================
m(3,"Legends","Who is known as the “Oracle of Omaha”?","Warren Buffett",["George Soros","Ray Dalio","Jack Ma"],"Buffett runs Berkshire Hathaway and is famous for his long-term value investing.",1);
m(3,"Legends","Which investor “broke the Bank of England” in 1992 by betting against the pound?","George Soros",["Warren Buffett","Carl Icahn","Peter Lynch"],"On “Black Wednesday” (16 September 1992), the UK left the European Exchange Rate Mechanism, and Soros made over $1 billion.",2);
m(3,"Legends","Which book by Benjamin Graham influenced Warren Buffett the most?","The Intelligent Investor",["The Wealth of Nations","Rich Dad Poor Dad","The Little Book of Common Sense"],"Graham, Buffett’s teacher at Columbia, is considered the father of value investing.",2);
m(3,"Legends","Which film character famously said “Greed, for lack of a better word, is good”?","Gordon Gekko",["Jordan Belfort","Patrick Bateman","Jerry Maguire"],"Michael Douglas played Gordon Gekko in “Wall Street” (1987) and won an Oscar.",2);
m(3,"Legends","The film “The Wolf of Wall Street” tells the story of which stockbroker?","Jordan Belfort",["Bernie Madoff","Gordon Gekko","Nick Leeson"],"Leonardo DiCaprio plays Belfort, who was convicted of fraud in the 1990s.",2);
m(3,"Legends","Which doctor-turned-investor predicted the subprime collapse and is a character in “The Big Short”?","Michael Burry",["Peter Thiel","Bill Ackman","Carl Icahn"],"Christian Bale played Michael Burry, founder of Scion Capital, in the 2015 film.",2);
m(3,"Legends","Bernie Madoff ran the biggest Ponzi scheme in history, estimated at about…","$65 billion",["$650 million","$6.5 billion","$650 billion"],"The fraud was uncovered in December 2008, after the markets fell and investors asked for their money back.",2);
m(3,"Legends","Who founded Vanguard and invented the index fund for ordinary investors in 1976?","John (Jack) Bogle",["Peter Lynch","Ray Dalio","Charlie Munger"],"Bogle argued that most investors do better by buying the whole market cheaply than by picking stocks.",3);
m(3,"Legends","Who was Warren Buffett’s long-time right-hand man and vice chairman at Berkshire Hathaway?","Charlie Munger",["Bill Gates","Benjamin Graham","Peter Kiewit"],"Charlie Munger was Berkshire’s vice chairman until his death in 2023.",3);
m(3,"Legends","The rogue trader Nick Leeson caused the 1995 collapse of which British bank?","Barings Bank",["Lloyds","Northern Rock","NatWest"],"Leeson’s hidden losses in Singapore of about £827 million collapsed the 233-year-old Barings Bank.",3);
vf(3,"Warren Buffett’s Berkshire Hathaway began as a textile company.",true,"Buffett bought control of the struggling textile mill in the 1960s and turned it into an investment holding company.",3);
vf(3,"A Ponzi scheme pays old investors with the money of new investors.",true,"It is named after Charles Ponzi, who ran such a scheme in the 1920s.",1);

// ===================== 4. Crypto & fintech =====================
m(4,"Crypto","Who is the pseudonymous creator of Bitcoin?","Satoshi Nakamoto",["Vitalik Buterin","Elon Musk","Charlie Lee"],"Satoshi published the Bitcoin white paper in 2008 and launched the network in January 2009. Their real identity remains unknown.",1);
m(4,"Crypto","What is the maximum number of bitcoins that will ever exist?","21 million",["1 million","100 million","Unlimited"],"This fixed supply is one reason some compare Bitcoin to digital gold.",2);
m(4,"Crypto","Who co-founded the Ethereum blockchain?","Vitalik Buterin",["Satoshi Nakamoto","Changpeng Zhao","Brian Armstrong"],"Ethereum launched in 2015 and introduced smart contracts.",2);
m(4,"Crypto","A “stablecoin” is a cryptocurrency designed to…","Keep a stable value, for example pegged to the US dollar",["Never be traded","Increase 10% every year","Be mined by hand"],"Tether (USDT) and USD Coin (USDC) are leading examples.",2);
m(4,"Crypto","Which country was the first to make Bitcoin legal tender, in 2021?","El Salvador",["Switzerland","Japan","Argentina"],"President Nayib Bukele pushed the law. Parts of it were reversed in 2025 under an IMF deal.",3);
m(4,"Crypto","In 2010, a programmer paid 10,000 bitcoins for…","Two pizzas",["A used car","A house","A laptop"],"May 22 is now “Bitcoin Pizza Day”. Those coins were worth hundreds of millions of dollars later.",3);
m(4,"Fintech","What does “BNPL” stand for in fintech?","Buy Now, Pay Later",["Bank Note Payment Ledger","Business Network Payment Link","Big Name Public Listing"],"Klarna, from Sweden, popularised BNPL for online shopping.",2);
m(4,"Fintech","Which British-based digital bank, founded in 2015, started as a prepaid currency card?","Revolut",["Monzo","Wise","N26"],"Revolut was founded by Nik Storonsky and Vlad Yatsenko in London.",2);
m(4,"Fintech","Bizum is a payments app used by millions in which country?","Spain",["Italy","Brazil","India"],"Bizum, launched in 2016 by Spanish banks, lets people send money to a phone number.",2);
m(4,"Fintech","Stripe, a payments giant, was founded by which brothers?","Patrick and John Collison",["Tyler and Cameron Winklevoss","Larry and Sergey","Jack and Bill Dorsey"],"The Irish brothers founded Stripe in 2010. They were still very young.",3);
vf(4,"PayPal was co-founded by Peter Thiel and Max Levchin.",true,"PayPal grew out of a 2000 merger between Confinity and X.com. It was acquired by eBay in 2002.",3);
vf(4,"A “neobank” is a bank that operates mainly online or through an app, without physical branches.",true,"Examples: N26, Revolut, Monzo, Chime.",1);

// ===================== 5. Corporate finance =====================
m(5,"Basics","The accounting equation says that assets equal…","Liabilities + Equity",["Revenue − Costs","Cash + Debt","Equity − Liabilities"],"It is the core of the balance sheet: what a company owns equals what it owes plus what its owners put in.",1);
m(5,"Basics","A balance sheet shows a company’s financial position…","At a single point in time",["Over a full year","Over the next five years","Only after taxes"],"A balance sheet is a snapshot; the income statement covers a period.",1);
m(5,"Basics","What does EBITDA stand for?","Earnings Before Interest, Taxes, Depreciation and Amortization",["Earnings Before Income, Tax, Debt and Assets","Estimated Balance Income Tax Debt Amount","Equity Before Interest, Taxes, Deposits and Assets"],"EBITDA is a popular measure of operating profit that ignores financing, tax and non-cash charges.",2);
m(5,"Time value","What is the idea of the “time value of money”?","A euro today is worth more than a euro tomorrow",["Money loses value only on weekends","Time is a form of money","Banks pay for your time"],"Because you can invest the money today and earn interest.",1);
m(5,"Time value","If you invest €1,000 at 10% a year with compound interest, how much do you have after two years?","€1,210",["€1,200","€1,100","€1,021"],"Year 1: 1,100; year 2: 1,100 × 1.10 = 1,210.",2);
m(5,"Time value","The “Rule of 72” says that at 6% annual return, your money doubles in about…","12 years",["6 years","8 years","24 years"],"72 ÷ 6 = 12 years.",3);
m(5,"Valuation","What does NPV stand for?","Net Present Value",["Net Profit Value","New Product Venture","National Pension Volume"],"NPV adds up all future cash flows discounted to today. A positive NPV means the project creates value.",2);
m(5,"Valuation","What does WACC stand for in finance?","Weighted Average Cost of Capital",["Working Assets and Cash Control","World Association of Corporate Controllers","Wealth And Capital Costs"],"WACC is the average rate that a company pays to finance its assets, weighted by debt and equity.",3);
m(5,"Deals","In an LBO, the buyer finances the purchase mostly with…","Borrowed money (debt)",["Customer deposits","Government grants","New shares to the public"],"LBO = Leveraged Buyout, in which the acquired company’s assets often secure the debt.",3);
m(5,"Margins","Gross margin is calculated as…","(Revenue − cost of goods sold) ÷ Revenue",["Revenue ÷ costs","Net profit ÷ equity","Assets − liabilities"],"It shows how much of each euro of sales remains after the direct cost of producing it.",2);
vf(5,"In general, a higher expected return on an investment comes with a higher risk.",true,"This is the basic risk-return trade-off in finance.",1);
vf(5,"“Diversification” means putting all your money into the single best stock.",false,"Diversification means spreading investments across assets to reduce risk.",1);

// ===================== Typed answers =====================
ty(1,"What is the ticker symbol of Tesla on the Nasdaq? (four letters)",["TSLA"],"TSLA is Tesla’s ticker.",2);
ty(2,"What is the name of the 1637 speculative bubble in the Netherlands involving a flower? (two words)",["tulip mania","tulipmania"],"Tulip Mania is often cited as the first financial bubble.",2);
ty(3,"What nickname, from his home city in Nebraska, is Warren Buffett known by? (“The Oracle of …”)",["Omaha"],"Buffett lives in Omaha, Nebraska.",1);
ty(4,"What is the name of the technology behind Bitcoin, a chain of linked blocks of data?",["blockchain","the blockchain"],"A blockchain is a shared ledger that is very hard to alter.",1);
ty(5,"What does ROE stand for? (three words)",["return on equity"],"ROE = net income ÷ shareholders’ equity.",2);
ty(5,"Which financial statement shows a company’s revenues and expenses over a period? (two words, starting with “income”)",["income statement","income statement."],"Also called the profit and loss account (P&L).",2);
ty(2,"Which US central bank sets interest rates in the USA? (the Federal ...)",["Reserve","Federal Reserve","Fed"],"The Federal Reserve, or Fed, is the US central bank.",2);

// ===================== More questions (batch 2) =====================
m(1,"Basics","What is a “bear market”?","A period when prices are falling",["A period when prices rise","A market closed on Sundays","A market only for commodities"],"A fall of 20% or more from recent highs is the usual definition.",1);
m(1,"Basics","What does “liquidity” mean for an asset?","How easily it can be turned into cash",["How much it is worth","How safe it is","How old it is"],"Cash is the most liquid asset. A house or a painting is much less liquid.",2);
m(1,"Basics","What is a “bond”?","A loan to a company or government that pays interest",["A share in a company","A type of bank account","A contract to buy gold"],"The issuer promises to pay interest and to return the money at maturity.",1);
m(1,"Basics","What generally happens to existing bond prices when interest rates rise?","They fall",["They rise","They stay the same","They are cancelled"],"New bonds pay more, so older ones with lower interest become less attractive.",3);
m(1,"Basics","What does “volatility” measure?","How much prices swing up and down",["How big a company is","How much a share pays","How old a market is"],"The VIX is a famous index of expected stock-market volatility.",2);
m(1,"Basics","What happens in a “stock split”?","Each share is divided into more shares, with the same total value",["The company is divided in two","Shareholders lose half their shares","The share price is doubled"],"Apple and Nvidia have used stock splits to make their shares more affordable.",3);
m(1,"Indices","How many companies are in the Dow Jones Industrial Average?","30",["25","100","500"],"The Dow is one of the oldest US indices, created in 1896.",2);
m(1,"Indices","The FTSE 100 lists the 100 largest companies on which stock exchange?","London Stock Exchange",["Euronext Paris","Deutsche Börse","Swiss Exchange"],"“FTSE” stands for the Financial Times Stock Exchange.",1);
m(1,"Exchanges","Which stock exchange is the largest in the world by total market value of listed companies?","New York Stock Exchange",["Nasdaq","London Stock Exchange","Tokyo Stock Exchange"],"The NYSE sits on Wall Street and lists thousands of companies.",2);
vf(1,"A share gives its owner partial ownership of a company.",true,"Shareholders can usually vote at meetings and may receive dividends.",1);

m(2,"History","The 1997 Asian financial crisis began with the collapse of the currency of which country?","Thailand",["Indonesia","South Korea","Malaysia"],"The Thai baht was floated in July 1997 and the crisis quickly spread across Asia.",3);
m(2,"History","In 2001 which country defaulted on about $93 billion of debt, one of the biggest ever sovereign defaults?","Argentina",["Brazil","Mexico","Chile"],"The default followed a deep recession and the end of the peso’s link to the US dollar.",3);
m(2,"History","In 1998 a hedge fund run by Nobel-winning economists nearly collapsed and was rescued. Which fund?","Long-Term Capital Management",["Bridgewater","Citadel","Quantum Fund"],"LTCM’s failure was feared to threaten the whole financial system.",3);
m(2,"History","Which investment bank was sold to JPMorgan in March 2008 with support from the Federal Reserve?","Bear Stearns",["Merrill Lynch","Goldman Sachs","Wachovia"],"The sale at $10 a share was a warning sign before Lehman Brothers collapsed.",3);
m(2,"History","Credit Suisse was taken over in March 2023 by which bank?","UBS",["HSBC","Deutsche Bank","BNP Paribas"],"The Swiss government helped to arrange the deal after a loss of confidence in the bank.",2);
m(2,"Vocabulary","What is a “bank run”?","Many customers withdraw their money at the same time",["A charity race","A bank robbery","A bank opening new branches"],"Because banks don’t keep all deposits in cash, a run can make them fail.",1);
m(2,"Vocabulary","“Subprime mortgages” are loans to borrowers who…","Have a weak credit history",["Are very rich","Are under 18","Live abroad"],"Many subprime loans defaulted in 2007–08 and triggered the global financial crisis.",2);
m(2,"Vocabulary","What is “quantitative easing” (QE)?","A central bank creating money to buy bonds",["A tax cut","A ban on loans","A new type of share"],"QE aims to lower long-term interest rates and boost lending and spending.",3);
m(2,"History","In April 2020, the price of which commodity briefly turned negative?","US crude oil (WTI futures)",["Gold","Natural gas","Copper"],"Storage was full as demand collapsed, so traders paid to avoid taking delivery.",3);
vf(2,"Iceland’s three biggest banks collapsed in October 2008.",true,"Iceland’s banks had grown to many times the size of the country’s economy.",3);

m(3,"Legends","Which investor founded the hedge fund Bridgewater and wrote the book “Principles”?","Ray Dalio",["Carl Icahn","Bill Ackman","Paul Tudor Jones"],"Bridgewater became one of the world’s largest hedge funds.",2);
m(3,"Legends","Which fund manager, known for the advice “buy what you know”, ran the Fidelity Magellan Fund?","Peter Lynch",["John Templeton","Ken Fisher","Jim Cramer"],"Lynch’s fund averaged annual returns of about 29% from 1977 to 1990.",3);
m(3,"Legends","Which famous activist investor is known for taking over companies such as TWA and pushing for changes at Apple?","Carl Icahn",["Ray Dalio","Peter Thiel","Bill Gross"],"Icahn’s hostile takeovers and demands inspired the term “corporate raider”.",3);
m(3,"Books","Who wrote “A Random Walk Down Wall Street”, arguing that markets are hard to beat?","Burton Malkiel",["Benjamin Graham","Peter Lynch","John Bogle"],"The book first appeared in 1973 and recommends low-cost index funds.",3);
m(3,"Theory","Which economist developed the “efficient market hypothesis” and won the Nobel Prize in 2013?","Eugene Fama",["Milton Friedman","Paul Samuelson","Harry Markowitz"],"The theory says share prices already reflect all available information.",3);
vf(3,"Warren Buffett still lives in the same Omaha house he bought in 1958.",true,"He paid $31,500 for it, a famous example of his frugal habits.",2);

m(4,"Crypto","What is a blockchain?","A shared digital record made of linked blocks",["A type of bank card","A website for shopping","A stock market index"],"Each block contains transactions and is cryptographically linked to the previous one.",1);
m(4,"Crypto","What is the Bitcoin “halving”?","The mining reward is cut in half roughly every four years",["The price drops by 50%","Half of all coins are destroyed","Fees are split between miners"],"Halvings limit new supply. The most recent took place in April 2024.",3);
m(4,"Crypto","What is an NFT?","A unique digital token that proves ownership of an item",["A type of bank loan","A new stock market","A virtual credit card"],"NFTs boomed in 2021 when a digital artwork by Beeple sold for $69 million.",2);
m(4,"Crypto","What is “DeFi”?","Decentralised finance, financial services built on blockchains",["A type of debit card","A credit-scoring agency","Defence funding"],"DeFi apps allow lending and trading without banks, using smart contracts.",2);
m(4,"Crypto","What does “KYC” stand for in banking and crypto?","Know Your Customer",["Keep Your Cash","Key Yield Curve","Knowledge Yield Contract"],"KYC rules require firms to check customers’ identity to fight money laundering.",2);
m(4,"Fintech","Which Twitter co-founder also founded the payments company Square, now called Block?","Jack Dorsey",["Evan Williams","Biz Stone","Elon Musk"],"Square started in 2009 with a small card reader that plugged into a phone.",2);
m(4,"Fintech","Which neobank, founded in Berlin in 2013, is one of Europe’s best-known digital banks?","N26",["Monzo","Bunq","Starling"],"N26 started as a mobile bank with a smartphone-only account.",2);
m(4,"Fintech","Which Brazilian digital bank went public in New York in 2021?","Nubank",["Itaú","Bradesco","Banco Inter"],"Nubank, known for its purple card, became one of Latin America’s biggest banks by customers.",3);
vf(4,"Bitcoin was created in 2009.",true,"The first block of the Bitcoin blockchain was mined in January 2009.",1);
vf(4,"A central bank digital currency (CBDC) is a digital version of a country’s money issued by its central bank.",true,"China’s digital yuan and the planned digital euro are examples of CBDCs.",3);

m(5,"Ratios","What does EPS stand for?","Earnings per share",["Expenses per sale","Equity price spread","Estimated profit scale"],"EPS = net profit ÷ number of shares.",1);
m(5,"Accounting","What is “working capital”?","Current assets minus current liabilities",["Total assets minus total debt","Salaries plus rent","Profit divided by sales"],"It shows whether a firm can pay its short-term bills.",3);
m(5,"Accounting","What is “depreciation”?","Spreading the cost of an asset over its useful life",["A fall in a share price","A bank penalty","A tax on profits"],"A company that buys a €10,000 machine for 5 years may record €2,000 a year.",2);
m(5,"Accounting","What is “goodwill” on a balance sheet?","The premium paid for a company above the value of its net assets",["A donation to charity","The value of the logo only","The cash held by the bank"],"Goodwill arises in acquisitions and includes reputation, customers and know-how.",3);
m(5,"Analysis","The “break-even point” is when…","Revenue equals total costs",["Profit is at its maximum","The company sells its first product","Debt is repaid"],"Beyond break-even, each extra sale produces profit.",1);
m(5,"Analysis","A “dividend yield” is calculated as…","Annual dividend ÷ share price",["Share price ÷ profit","Profit ÷ revenue","Debt ÷ equity"],"A share at €100 that pays €4 a year has a yield of 4%.",3);
m(5,"Analysis","What does CAGR stand for?","Compound annual growth rate",["Capital and gain ratio","Corporate accounting guarantee rule","Cash and gold reserve"],"CAGR smooths growth over several years into a single yearly rate.",3);
m(5,"Financing","Raising money by selling shares to investors is called…","Equity financing",["Debt financing","Leasing","Factoring"],"With equity financing, no repayment is needed, but owners give up part of the company.",1);
m(5,"Financing","“Leverage” in finance means…","Using borrowed money to finance investments",["Selling shares at a premium","Hiring extra staff","Paying dividends early"],"Leverage increases both potential gains and potential losses.",2);
vf(5,"A company can be profitable and still run out of cash.",true,"Customers paying late or heavy investment can drain cash even when the income statement shows profit.",2);
vf(5,"Depreciation is a cash payment made to suppliers each year.",false,"Depreciation is an accounting charge, not a cash outflow.",3);

ty(5,"What does EPS stand for? (three words: earnings … share)",["earnings per share"],"Earnings per share shows the profit that belongs to each share.",1);
ty(4,"What does NFT stand for? (three words, the first is “non-fungible”)",["non-fungible token","non fungible token"],"A non-fungible token is a unique digital certificate of ownership stored on a blockchain.",2);
ty(2,"What is the name of the bank that collapsed in 2023 in Silicon Valley? (abbreviation, three letters)",["SVB"],"Silicon Valley Bank failed in March 2023 after a run on deposits.",2);

return {id:"finance",title:"Finance & Markets",kw:"finance markets stocks bonds investing investors buffett wall street crash lehman crypto bitcoin fintech revolut ebitda npv corporate finance bourse bolsa business",subject:"Crashes, legends, crypto and the maths of money",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
