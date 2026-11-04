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

return {id:"finance",group:"esade",title:"Finance & Markets",kw:"finance markets stocks bonds investing investors buffett wall street crash lehman crypto bitcoin fintech revolut ebitda npv corporate finance bourse bolsa business esade",subject:"Crashes, legends, crypto and the maths of money",lang:"en",sess:SESS,tags:TAGS,unit:["theme","themes","a theme"],balance:true,Q,TQ};
})();
