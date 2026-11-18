const M=(t,q,opts,a,exp)=>({t,type:'mcq',q,opts,a,exp});
const N=(t,q,a,tol,unit,exp)=>({t,type:'num',q,a,tol,unit,exp});
const OV=[
M('Overview','In a vertical (common-size) analysis of the income statement, every line is expressed as a percentage of…',['Net income of the same year','Net sales of the same year','Net sales of the previous year','Total assets of the same year'],1,'Vertical = within one year, each item as % of a base: net sales for the income statement, total assets for the balance sheet. Horizontal = same item across years.'),
M('Overview','Net income was −€20 in 2023 and +€30 in 2024. What does the course say about the % change?',['+250%','+150%','−250%','It is not computed: the sign changes'],3,'No % change when the sign flips, and none when the base year is zero. Describe it in words instead (loss turned into profit).'),
M('Overview','An expense line was €50 in 2023 and is €0 in 2024. The horizontal-analysis change is…',['+100%','−50%','−100%','Not meaningful'],2,'(0 − 50)/50 = −100%. A line that falls to zero next year is −100%. It is the base year being zero that blocks the calculation.'),
M('Overview','Comparing a company\'s ratios with the average of its sector is a…',['Time-series comparison','Industry (cross-sectional) comparison','Vertical analysis','Comparison with a standard'],1,'Time series = same firm, different years. Cross-section / industry = same year, different firms. Standards = rules of thumb (e.g. current ratio 1.5–2).'),
M('Overview','Which is a genuine limitation of ratio analysis?',['Ratios cannot be computed from published statements','Accounting choices and earnings management can distort the figures','Ratios ignore all past data','Statements are always prepared at fair value'],1,'Limitations: formulas vary, elective accounting policies, different fiscal year-ends, limited disclosure, earnings management, historical cost.'),
M('Overview','Why do turnover ratios often use average balances?',['Sales is a flow over the year, a balance is a single date','The average is always lower','IFRS forbids year-end balances','It removes the need for COGS'],0,'Flow over a period (sales, COGS) is matched with the average of opening and closing balance. Limit: seasonal swings can still hide the real level.')];
const LQ=[
N('Liquidity','Current assets €600, inventory €240, current liabilities €400. What is the quick ratio?',0.90,0.01,'x','Quick = (CA − Inventory)/CL = (600 − 240)/400 = 0.90. Benchmark ≥ 1, so slightly weak.'),
N('Liquidity','Net sales €1,200. A/R was €80 at the start and €120 at the end of the year. Using the average balance, how many days of sales are in receivables?',30.4,0.2,'days','Average A/R = 100. Turnover = 1,200/100 = 12. Days = 365/12 = 30.4.'),
M('Liquidity','A retailer has negative working capital. When is this NOT a liquidity problem?',['When A/R days are shorter than A/P days','When inventory days exceed 100','When the current ratio is above 2','Never: negative WC is always a problem'],0,'If customers pay before suppliers are paid, operations finance themselves (cash cycle ≤ 0): IKEA, Walmart, Costco.'),
N('Liquidity','A/R days = 20, inventory days = 45, A/P days = 60. What is the cash cycle (days)?',5,0.1,'days','Cash cycle = A/R days + inventory days − A/P days = 20 + 45 − 60 = 5.'),
M('Liquidity','A firm with a current ratio of 1.5 repays a short-term bank loan with cash. What happens?',['Current ratio rises, working capital unchanged','Current ratio falls, working capital falls','Both are unchanged','Current ratio rises, working capital rises'],0,'CA and CL fall by the same amount. WC = CA − CL is unchanged, but a ratio above 1 rises. Example: 300/200 = 1.5 → 200/100 = 2.0.'),
N('Liquidity','COGS €1,460. Inventory was €180 at the start and €220 at the end. Using the average, how many inventory days?',50,0.2,'days','Average inventory = 200. Turnover = 1,460/200 = 7.3. Days = 365/7.3 = 50.')];
const LT=[
N('Long-term debt','EBIT €900, interest expense €150. What is the times-interest-earned ratio?',6.0,0.05,'x','TIE = EBIT/Interest = 900/150 = 6.0. Use recurring income only.'),
N('Long-term debt','Total assets €1,000, equity €400. What is the debt/equity ratio (total liabilities/equity)?',1.5,0.01,'x','Liabilities = 1,000 − 400 = 600. D/E = 600/400 = 1.5. Debt ratio would be 600/1,000 = 60%.'),
N('Long-term debt','Total liabilities €800, equity €500, intangibles €100. What is debt to tangible net worth?',2.0,0.01,'x','TL/(Equity − Intangibles) = 800/(500 − 100) = 2.0.'),
M('Long-term debt','Which party prefers a LOW debt/equity ratio?',['Creditors','Shareholders who want leverage','Both equally','Neither'],0,'Creditors want a cushion of equity. Shareholders like more debt when it boosts ROE (favourable leverage).'),
M('Long-term debt','Which income belongs in the numerator of times interest earned?',['Net income','EBIT from recurring activities, excluding discontinued or extraordinary items','EBITDA','Net income plus taxes only'],1,'Interest is paid out of recurring operating income, so remove one-off and discontinued items.'),
N('Long-term debt','Financial debt €1,200, EBITDA €400. What is financial debt/EBITDA (years)?',3.0,0.05,'years','1,200/400 = 3.0 years of EBITDA to repay the financial debt.')];
const PR=[
N('Profitability','Net sales €2,000, EBIT €240. What is the operating margin (%)?',12,0.1,'%','EBIT/Sales = 240/2,000 = 12%.'),
N('Profitability','Operating margin 12%, asset turnover 0.8. What is ROA (%)?',9.6,0.1,'%','ROA = margin × turnover = 12% × 0.8 = 9.6%. (ROA = EBIT/Total assets.)'),
N('Profitability','Sales/Assets 0.8; EBIT/Sales 12%; EBT/EBIT 0.9; Assets/Equity 2.0; NI/EBT 0.75. What is ROE (%)?',12.96,0.15,'%','DuPont: 0.8 × 0.12 × 0.9 × 2.0 × 0.75 = 0.1296 = 12.96%.'),
M('Profitability','The financial leverage effect (EBT/EBIT) × (Assets/Equity) equals 0.9. This means leverage is…',['Favourable','Neutral','Unfavourable','Impossible to tell'],2,'> 1 favourable, = 1 neutral, < 1 unfavourable (debt costs more than it earns).'),
N('Profitability','ROA = 8%, cost of debt i = 5%, liabilities/equity = 1.5. What is the ROE before taxes (%)?',12.5,0.1,'%','ROE before tax = ROA + (ROA − i) × L/E = 8 + 3 × 1.5 = 12.5%.'),
M('Profitability','A company raises its debt. When does its ROE rise?',['Only if ROA exceeds the cost of debt','Always','Only if taxes fall','Never'],0,'Extra debt helps shareholders only if each euro borrowed earns more (ROA) than it costs (i). Otherwise it lowers ROE.')];
const MK=[
N('Market','Net income €600, average common shares 200. What is EPS (€)?',3.0,0.01,'€','EPS = NI/average common shares = 600/200 = €3.00.'),
N('Market','Net income €600, average shares 200, dilutive securities 50. What is diluted EPS (€)?',2.4,0.01,'€','600/(200 + 50) = €2.40.'),
M('Market','Compared with basic EPS, using diluted EPS in the P/E gives…',['A higher P/E (more conservative)','A lower P/E','The same P/E','No P/E'],0,'Diluted EPS is lower, so Price/EPS is higher.'),
N('Market','DPS €1.20, diluted EPS €2.40. What is the dividend payout (%)?',50,0.1,'%','Payout = DPS/Diluted EPS = 1.20/2.40 = 50%.'),
N('Market','Market value of equity €3,000, book value of equity €1,500. What is market-to-book?',2.0,0.01,'x','3,000/1,500 = 2.0.'),
M('Market','A high P/E ratio typically signals…',['The market expects high growth','The firm is cheap','The firm pays no tax','The firm has no debt'],0,'Investors pay more per euro of earnings when they expect earnings to grow.')];
const TESTS=[
{n:'A',t:'Warm-up',ix:[OV[0],LQ[2],LT[3],PR[0],MK[0]]},
{n:'B',t:'Concepts',ix:[OV[1],LQ[0],LT[4],PR[3],MK[2]]},
{n:'C',t:'Mixed',ix:[OV[2],LQ[4],LT[0],PR[1],MK[5]]},
{n:'D',t:'Calc heavy',ix:[OV[3],LQ[1],LT[1],PR[5],MK[3]]},
{n:'E',t:'Calc heavy',ix:[OV[4],LQ[3],LT[2],PR[2],MK[1]]},
{n:'F',t:'Calc heavy',ix:[OV[5],LQ[5],LT[5],PR[4],MK[4]]}];

// ---- extended bank: seeded generators + shuffled MCQs
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const R=rng(20261117);
const pick=(a,b,st)=>a+Math.floor(R()*((b-a)/st+1))*st;
const r2=x=>Math.round(x*100)/100, r1=x=>Math.round(x*10)/10;
function MC(t,q,o,exp){const idx=o.map((x,i)=>i);for(let i=idx.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[idx[i],idx[j]]=[idx[j],idx[i]]}
 return {t,type:'mcq',q,opts:idx.map(i=>o[i]),a:idx.indexOf(0),exp}}
const fm=x=>x.toLocaleString('en-US');
const OV2=[
MC('Overview','A manufacturing company differs from a merchandising company because it holds…',['Raw materials, work-in-process and finished goods','No inventory at all','Only finished goods bought from suppliers','Only service revenue'],'Manufacturers hold three kinds of inventory. Merchandisers buy and resell. Service firms have little or none.'),
MC('Overview','Which feature is typical of a service company?',['Little or no inventory, so quick ratio ≈ current ratio','A large finished-goods inventory','No operating expenses','No receivables'],'No (or tiny) inventory means CA − Inventory ≈ CA.'),
MC('Overview','Sales were €400 in 2023 and €460 in 2024. The horizontal-analysis change is…',['+15%','+13%','+60%','−13%'],'(460 − 400)/400 = 15%. The base is always the earlier year.'),
MC('Overview','In a common-size balance sheet, each item is expressed as a % of…',['Total assets','Net sales','Equity only','Net income'],'Balance sheet base = total assets. Income statement base = net sales.'),
MC('Overview','What is the main question a short-term creditor asks of financial statement analysis?',['Can the firm pay what it owes in the coming year?','What will the share price be next year?','How much tax is owed?','How many shares are outstanding?'],'Short-term creditors → liquidity. Long-term creditors → solvency. Shareholders → profitability and market value.'),
MC('Overview','Two firms have different fiscal year-ends. The main risk when comparing them is…',['Seasonality distorts the balances and ratios','Ratios cannot be computed','Equity becomes negative','Taxes are ignored'],'Year-end balances can sit at a seasonal peak or trough, so ratios are not comparable.'),
MC('Overview','Which of these is NOT one of the comparisons used in analysis?',['Random-sample comparison','Time-series comparison','Industry comparison','Comparison with standards'],'The course uses time series, cross-section/industry, and standards (rules of thumb).'),
MC('Overview','"Earnings management" means…',['Managers using accounting discretion to shape reported earnings','Auditors correcting earnings','Paying managers from earnings','Calculating EPS'],'It is a limitation: reported earnings may be smoothed or inflated within accounting rules.'),
MC('Overview','Assets recorded at historical cost can distort ratios because…',['Their book value may be far below current value','They are always overvalued','Depreciation is ignored','They are excluded from total assets'],'Old assets at old prices understate the asset base, which flatters ROA and asset turnover.'),
MC('Overview','Why can the same ratio name give different results in different sources?',['Formulas vary (EBIT vs net income, year-end vs average balances)','Because ratios are random','Because of the audit opinion','Because of the number of employees'],'Always check which definition is used. In the exam use the course formula.'),
MC('Overview','The percentage change from a base year is…',['(Current − Base) / Base','(Current − Base) / Current','Current / Base × 100 − 1','Base / Current'],'Divide the change by the base (earlier) value.'),
MC('Overview','In a common-size income statement, cost of sales is 70% of sales. The gross margin is…',['30%','70%','100%','Cannot be known'],'Gross margin = 100% − 70% = 30%.'),
MC('Overview','Which is an example of an elective accounting policy?',['FIFO versus weighted-average cost for inventory','The statutory tax rate','Days in a year','The audit opinion date'],'Choices like FIFO/average or depreciation method change reported figures, limiting comparability.'),
MC('Overview','A seasonal retailer uses only the year-end inventory in a turnover ratio. The risk is that…',['Year-end may not represent the average level during the year','Turnover is always too high','Sales is a stock, not a flow','COGS is ignored'],'Averages smooth the seasonal swings, though they cannot remove them entirely.')];
const LQ2=[
(()=>{const CA=pick(300,900,50),CL=pick(150,500,50);return N('Liquidity',`Current assets €${fm(CA)}, current liabilities €${fm(CL)}. What is the current ratio?`,r2(CA/CL),0.01,'x',`CA/CL = ${CA}/${CL} = ${r2(CA/CL)}. Benchmark 1.5–2.`)})(),
MC('Liquidity','Which of these is the strictest test of short-term liquidity?',['Cash ratio','Current ratio','Quick ratio','Working capital'],'Cash ratio uses only cash and marketable securities. Quick removes inventory. Current uses all current assets.'),
(()=>{const CA=pick(500,1200,50),CL=pick(200,700,50);return N('Liquidity',`Current assets €${fm(CA)} and current liabilities €${fm(CL)}. What is the working capital (€)?`,CA-CL,0.5,'€',`WC = CA − CL = ${CA} − ${CL} = ${CA-CL}.`)})(),
MC('Liquidity','A firm collects its receivables faster. What happens?',['A/R days fall and the cash cycle shortens','A/R days rise and the cash cycle lengthens','Inventory days fall','A/P days fall'],'Cash comes in sooner. Cash cycle = A/R days + inventory days − A/P days.'),
(()=>{const c=pick(40,120,10),s=pick(20,80,10),cl=pick(300,600,50);return N('Liquidity',`Cash €${c}, marketable securities €${s}, current liabilities €${cl}. What is the cash ratio?`,r2((c+s)/cl),0.01,'x',`(Cash + securities)/CL = (${c} + ${s})/${cl} = ${r2((c+s)/cl)}. Benchmark ≈ 0.3.`)})(),
MC('Liquidity','A firm with a current ratio of 1.33 buys inventory on credit. What happens?',['Current ratio falls, working capital unchanged','Current ratio rises, working capital rises','Both unchanged','Current ratio rises, working capital unchanged'],'CA and CL rise by the same amount: WC is unchanged, but a ratio above 1 moves toward 1. Example: 300/200 = 1.5 → 400/300 = 1.33.'),
(()=>{const S=pick(1200,3600,200),AR=pick(100,300,20);return N('Liquidity',`Net sales €${fm(S)}, accounts receivable €${AR} (year-end). What is the A/R turnover?`,r1(S/AR),0.1,'x',`Net sales/A/R = ${S}/${AR} = ${r1(S/AR)}. Days = 365/${r1(S/AR)} = ${r1(365/(S/AR))}.`)})(),
MC('Liquidity','A higher inventory turnover normally means…',['Inventory is sold faster, so fewer inventory days','Inventory is held longer','The firm has more cash','The firm has lower sales'],'Turnover = COGS/Inventory. Days = 365/turnover, so higher turnover → fewer days.'),
(()=>{const P=pick(900,2400,100),AP=pick(100,300,20);const d=365/(P/AP);return N('Liquidity',`Purchases €${fm(P)}, year-end accounts payable €${AP}. How many days of payables (A/P days)?`,r1(d),0.2,'days',`Turnover = ${P}/${AP} = ${r1(P/AP)}. Days = 365/turnover = ${r1(d)}.`)})(),
MC('Liquidity','Walmart and Costco show a negative cash cycle. This means…',['They sell inventory and collect from customers before paying suppliers','They are insolvent','They hold no inventory','They have no payables'],'Low A/R days and high A/P days make suppliers finance the business.'),
(()=>{const a=pick(15,40,5),i=pick(40,90,5),p=pick(30,70,5);return N('Liquidity',`A/R days ${a}, inventory days ${i}, A/P days ${p}. What is the cash cycle (days)?`,a+i-p,0.1,'days',`${a} + ${i} − ${p} = ${a+i-p}. Negative means suppliers fund the cycle.`)})(),
MC('Liquidity','A profitable company can still face a liquidity crisis because…',['Profits can be tied up in receivables and inventory','Profit is the same as cash','Liquidity depends only on equity','Taxes are not paid'],'Profit is an accrual measure. Liquidity is about timing of cash.'),
(()=>{const CA=pick(600,900,100),I=pick(150,350,50),CL=pick(300,500,50);return N('Liquidity',`Current assets €${CA}, inventory €${I}, current liabilities €${CL}. What is the quick ratio?`,r2((CA-I)/CL),0.01,'x',`(CA − Inventory)/CL = (${CA} − ${I})/${CL} = ${r2((CA-I)/CL)}. Benchmark ≥ 1.`)})(),
(()=>{const CA=pick(400,800,100),CL=pick(250,400,50),x=pick(50,150,50);return N('Liquidity',`CA €${CA}, CL €${CL}. The firm pays €${x} of suppliers with cash. What is the new current ratio?`,r2((CA-x)/(CL-x)),0.01,'x',`(${CA} − ${x})/(${CL} − ${x}) = ${CA-x}/${CL-x} = ${r2((CA-x)/(CL-x))}. Working capital is unchanged.`)})()];
const LT2=[
MC('Long-term debt','A debt ratio of 0.8 means…',['80% of assets are financed by liabilities','80% of assets are financed by equity','Interest is 80% of EBIT','The firm has 80% cash'],'Debt ratio = Total liabilities/Total assets.'),
(()=>{const E=pick(600,1500,100),i=pick(40,120,10),m=pick(3,9,1);const ebit=i*m;return N('Long-term debt',`EBIT €${ebit}, interest expense €${i}. What is times interest earned?`,r2(ebit/i),0.05,'x',`${ebit}/${i} = ${r2(ebit/i)}.`)})(),
MC('Long-term debt','Which change lowers times interest earned?',['Higher interest expense with the same EBIT','Higher EBIT with the same interest','Lower debt','More equity'],'TIE = EBIT/Interest. A larger denominator lowers it.'),
(()=>{const TL=pick(300,900,50),TA=pick(1000,2000,100);return N('Long-term debt',`Total liabilities €${TL}, total assets €${TA}. What is the debt ratio (%)?`,r1(TL/TA*100),0.1,'%',`${TL}/${TA} = ${r1(TL/TA*100)}%.`)})(),
MC('Long-term debt','A high debt quality ratio (CL/Total liabilities) means…',['Most debt is short-term: more refinancing risk','Most debt is long-term','No interest is paid','Equity is high'],'Short-term debt must be rolled over soon, so it is riskier.'),
(()=>{const TL=pick(500,1500,100),E=pick(400,1000,100);return N('Long-term debt',`Total liabilities €${TL}, equity €${E}. What is debt/equity?`,r2(TL/E),0.01,'x',`${TL}/${E} = ${r2(TL/E)}.`)})(),
MC('Long-term debt','Why is debt to tangible net worth stricter than debt/equity?',['Intangibles are removed from equity, shrinking the denominator','Liabilities are doubled','It uses EBITDA','It ignores interest'],'TL/(Equity − Intangibles): intangibles may be worth little if the firm fails.'),
(()=>{const TL=pick(600,1200,100),E=pick(500,900,100),I=pick(50,200,50);return N('Long-term debt',`Total liabilities €${TL}, equity €${E}, intangibles €${I}. What is debt to tangible net worth?`,r2(TL/(E-I)),0.01,'x',`${TL}/(${E} − ${I}) = ${TL}/${E-I} = ${r2(TL/(E-I))}.`)})(),
MC('Long-term debt','Why might shareholders welcome more debt while creditors do not?',['Debt can raise ROE if ROA exceeds the interest rate, but it raises risk for creditors','Debt lowers risk for everyone','Debt removes interest','Debt increases equity'],'Leverage magnifies returns to shareholders; creditors face a thinner equity cushion.'),
(()=>{const FD=pick(600,2000,100),EB=pick(200,500,50);return N('Long-term debt',`Financial debt €${FD}, EBITDA €${EB}. What is financial debt/EBITDA (years)?`,r2(FD/EB),0.05,'years',`${FD}/${EB} = ${r2(FD/EB)} years.`)})(),
MC('Long-term debt','Which income should be used for times interest earned?',['Recurring operating income (EBIT)','Total income including one-off gains','Net income after interest','Cash from financing'],'Use recurring EBIT; exclude discontinued and extraordinary items.'),
(()=>{const TA=pick(1000,3000,500),dr=pick(40,70,5);const TL=TA*dr/100;return N('Long-term debt',`Total assets €${fm(TA)}, debt ratio ${dr}%. What are total liabilities (€)?`,TL,1,'€',`${TA} × ${dr}% = ${TL}.`)})(),
MC('Long-term debt','A firm has debt/equity of 1.5. Its debt ratio is…',['60%','150%','40%','75%'],'D/E = 1.5 → TL = 1.5E, TA = 2.5E, so TL/TA = 1.5/2.5 = 60%.'),
(()=>{const CL=pick(200,500,50),TL=pick(600,1000,100);return N('Long-term debt',`Current liabilities €${CL}, total liabilities €${TL}. What is the debt quality ratio (CL/TL, %)?`,r1(CL/TL*100),0.1,'%',`${CL}/${TL} = ${r1(CL/TL*100)}%.`)})(),
(()=>{const EB=pick(200,600,50),m=pick(2,5,1);const FD=EB*m;return N('Long-term debt',`EBITDA €${EB}; the firm can repay its financial debt in ${m} years of EBITDA. What is the financial debt (€)?`,FD,1,'€',`Debt = EBITDA × years = ${EB} × ${m} = ${FD}.`)})()];
const PR2=[
MC('Profitability','ROA = EBIT/Total assets can be split into…',['Operating margin × asset turnover','Net margin × leverage','Gross margin × payout','EPS × P/E'],'EBIT/Sales × Sales/Assets = EBIT/Assets.'),
(()=>{const S=pick(1000,4000,500),GP=Math.round(S*pick(25,45,5)/100);return N('Profitability',`Net sales €${fm(S)}, gross profit €${GP}. What is the gross margin (%)?`,r1(GP/S*100),0.1,'%',`${GP}/${S} = ${r1(GP/S*100)}%.`)})(),
MC('Profitability','A supermarket chain typically shows…',['Low margin, high asset turnover','High margin, low turnover','No turnover','Negative ROA'],'Retail: thin margins offset by fast turnover. Luxury/capital-heavy firms show the opposite.'),
(()=>{const S=pick(2000,6000,500),NI=Math.round(S*pick(4,12,1)/100);return N('Profitability',`Net sales €${fm(S)}, net income €${NI}. What is the net margin (%)?`,r1(NI/S*100),0.1,'%',`${NI}/${S} = ${r1(NI/S*100)}%.`)})(),
MC('Profitability','A leverage effect above 1 means…',['Debt increases the return to shareholders','Debt reduces ROE','No debt','Negative equity'],'(EBT/EBIT) × (Assets/Equity) > 1: favourable.'),
(()=>{const E=pick(600,1500,100),TA=E+pick(400,1200,100),EBIT=Math.round(TA*pick(6,14,2)/100);return N('Profitability',`EBIT €${EBIT}, total assets €${fm(TA)}. What is ROA (%)?`,r1(EBIT/TA*100),0.1,'%',`${EBIT}/${TA} = ${r1(EBIT/TA*100)}%.`)})(),
MC('Profitability','When analysing recurring profitability, discontinued operations should be…',['Excluded','Doubled','Added to sales','Treated as interest'],'They are not expected to repeat.'),
(()=>{const S=pick(1000,3000,500),TA=pick(800,2000,200);return N('Profitability',`Net sales €${fm(S)}, total assets €${fm(TA)}. What is the asset turnover?`,r2(S/TA),0.01,'x',`${S}/${TA} = ${r2(S/TA)}.`)})(),
MC('Profitability','A firm raises debt and ROA is below the cost of debt. ROE will…',['Fall','Rise','Stay the same','Become equal to ROA'],'Each borrowed euro earns less than it costs, so shareholders lose.'),
(()=>{const NI=pick(60,200,10),E=pick(400,900,50);return N('Profitability',`Net income €${NI}, equity €${E}. What is ROE (%)?`,r1(NI/E*100),0.1,'%',`${NI}/${E} = ${r1(NI/E*100)}%.`)})(),
MC('Profitability','EBITDA equals…',['EBIT + depreciation and amortisation','Net income − interest','Sales − COGS','EBT + taxes'],'It is EBIT before D&A. EBITDAR also adds back rent.'),
(()=>{const ebt=pick(70,95,5),ebit=100,ae=pick(15,30,5)/10;const v=r2(ebt/ebit*ae);return N('Profitability',`EBT/EBIT = ${ebt/100}, Assets/Equity = ${ae}. What is the financial leverage effect?`,v,0.01,'x',`${ebt/100} × ${ae} = ${v}. ${v>1?'> 1: favourable.':'< 1: unfavourable.'}`)})(),
MC('Profitability','Which pair are the two levers for improving ROE highlighted in the IKEA case?',['Improve ROA or increase debt','Cut taxes or issue shares','Raise dividends or cut sales','Buy back debt or sell assets'],'ROE = ROA + leverage effect; either raise ROA or use more (cost-effective) debt.'),
(()=>{const roa=pick(6,12,2),i=pick(3,5,1),le=pick(10,20,5)/10;const v=r1(roa+(roa-i)*le);return N('Profitability',`ROA ${roa}%, cost of debt ${i}%, L/E ${le}. What is the ROE before taxes (%)?`,v,0.1,'%',`${roa} + (${roa} − ${i}) × ${le} = ${v}%.`)})(),
(()=>{const S=pick(1500,4000,500),FA=pick(500,1500,100);return N('Profitability',`Net sales €${fm(S)}, fixed assets €${fm(FA)}. What is the fixed-asset turnover?`,r2(S/FA),0.01,'x',`${S}/${FA} = ${r2(S/FA)}.`)})()];
const MK2=[
(()=>{const NI=pick(300,900,100),sh=pick(100,300,50);return N('Market',`Net income €${NI}, average shares ${sh}. What is EPS (€)?`,r2(NI/sh),0.01,'€',`${NI}/${sh} = €${r2(NI/sh)}.`)})(),
MC('Market','Which are dilutive securities?',['Convertible bonds, stock options and convertible preferred shares','Trade payables','Retained earnings','Bank deposits'],'They could increase the share count if converted/exercised.'),
(()=>{const NI=pick(300,900,100),sh=pick(100,300,50),d=pick(20,60,10);return N('Market',`Net income €${NI}, average shares ${sh}, dilutive securities ${d}. What is diluted EPS (€)?`,r2(NI/(sh+d)),0.01,'€',`${NI}/(${sh} + ${d}) = €${r2(NI/(sh+d))}.`)})(),
MC('Market','A market-to-book ratio above 1 means…',['The market values equity above its book value','The firm is bankrupt','Book value is zero','Dividends are zero'],'Often reflects growth expectations and assets not recorded at market value.'),
(()=>{const P=pick(20,60,5),E=pick(2,4,1);return N('Market',`Share price €${P}, diluted EPS €${E}. What is the P/E?`,r1(P/E),0.1,'x',`${P}/${E} = ${r1(P/E)}.`)})(),
MC('Market','A high dividend payout ratio means…',['A large share of earnings is paid out, less retained','The firm is growing fast','The firm has no profit','Shares are diluted'],'Payout = DPS/Diluted EPS.'),
(()=>{const M=pick(2000,6000,500),B=pick(1000,3000,500);return N('Market',`Market value of equity €${fm(M)}, book value €${fm(B)}. What is market-to-book?`,r2(M/B),0.01,'x',`${M}/${B} = ${r2(M/B)}.`)})(),
MC('Market','Why does EPS use the average number of shares?',['Shares outstanding change during the year','Because shares are a flow','To increase EPS','Because of taxes'],'Earnings accrue over the whole year, so weight shares by time outstanding.'),
(()=>{const E=pick(2,5,1),pr=pick(30,70,10);const D=r2(E*pr/100);return N('Market',`Diluted EPS €${E}, payout ratio ${pr}%. What is the DPS (€)?`,D,0.01,'€',`DPS = payout × EPS = ${pr}% × ${E} = €${D}.`)})(),
MC('Market','Two firms have the same EPS. One has a P/E of 10 and the other 20. The second…',['Is expected by the market to grow more or is seen as less risky','Is cheaper','Pays no dividends','Has more debt'],'P/E is what investors pay per euro of earnings: higher means higher growth or lower perceived risk.'),
(()=>{const E=pick(2,5,1),P=pick(10,20,5);return N('Market',`Diluted EPS €${E}, P/E ${P}. What is the share price (€)?`,E*P,0.5,'€',`Price = P/E × EPS = ${P} × ${E} = €${E*P}.`)})(),
MC('Market','P/E on diluted EPS rather than basic EPS is…',['Higher and more conservative','Lower','Identical','Undefined'],'Diluted EPS is lower, so Price/EPS rises.'),
(()=>{const E=pick(2,5,1),sh=pick(100,300,50);return N('Market',`Diluted EPS €${E} and ${sh} diluted shares. What is net income (€)?`,E*sh,1,'€',`NI = EPS × shares = ${E} × ${sh} = ${E*sh}.`)})(),
(()=>{const D=pick(1,2,1),E=pick(2,5,1)+2;return N('Market',`DPS €${D}, diluted EPS €${E}. What is the payout (%)?`,r1(D/E*100),0.1,'%',`${D}/${E} = ${r1(D/E*100)}%.`)})()];
const NEW=[OV2,LQ2,LT2,PR2,MK2];
const names='GHIJKLMNOPQRST'.split('');
const kinds=['Mixed','Calc heavy','Concepts','Mixed','Calc heavy','Concepts','Mixed'];
names.forEach((n,k)=>TESTS.push({n,t:kinds[k%7],ix:NEW.map((p,tp)=>p[(k+tp*2)%14])}));
// all questions of the new bank must appear once per topic


const STARTER=`
<div class="card"><h2>0 · Start here (if you have read nothing)</h2>
<p>Financial statement analysis means taking the numbers of a company's statements and turning them into <b>ratios</b> that answer four simple questions. Your exam has one question on each theme (plus the overview).</p>
<div class="tw"><table><tr><th>Theme</th><th>The question it answers</th><th>Who asks it</th></tr>
<tr><td>Liquidity</td><td>Can the firm pay its bills in the next 12 months?</td><td>Suppliers, banks (short term)</td></tr>
<tr><td>Long-term debt-paying ability</td><td>Can it carry its debt and pay the interest over many years?</td><td>Lenders, bondholders</td></tr>
<tr><td>Profitability</td><td>How much does it earn from its sales and its assets?</td><td>Owners, managers</td></tr>
<tr><td>Market analysis</td><td>How does the stock market value the shares?</td><td>Investors</td></tr></table></div>
<h3>The two statements you need</h3>
<div class="rule"><b>Balance sheet</b> (one date): Assets = Liabilities + Equity.<br>Assets: current (cash, marketable securities, receivables A/R, inventory) then fixed and intangible assets. Liabilities: current (due within a year: payables A/P, short-term debt) then long-term debt.</div>
<div class="rule"><b>Income statement</b> (one year), from top to bottom:<br>Net sales − COGS = <b>Gross profit</b> − operating expenses = <b>EBIT</b> (operating profit) − interest = <b>EBT</b> − tax = <b>Net income (NI)</b>.<br>EBITDA = EBIT + depreciation &amp; amortisation.</div>
<h3>Memory trick</h3>
<ul><li>Balance-sheet items (stocks) divide <b>sales or COGS</b> to give a turnover. Days = 365 / turnover.</li>
<li>Liquidity = <b>current</b> items only. Solvency = <b>total</b> liabilities. Profitability = EBIT or NI over sales, assets or equity. Market = per-share numbers.</li></ul></div>
<div class="card"><h2>Worked example: one company, every ratio</h2>
<p class="small">Use this single company to see where each number comes from. All figures in €.</p>
<div class="tw"><table><tr><th>Income statement</th><th></th><th>Balance sheet</th><th></th></tr>
<tr><td>Net sales</td><td class="f">1,000</td><td>Cash / marketable securities</td><td class="f">50 / 30</td></tr>
<tr><td>COGS</td><td class="f">600</td><td>Receivables / Inventory</td><td class="f">120 / 200</td></tr>
<tr><td>Gross profit</td><td class="f">400</td><td><b>Current assets</b></td><td class="f">400</td></tr>
<tr><td>Operating expenses (incl. D&amp;A 50)</td><td class="f">280</td><td>Fixed assets / Intangibles</td><td class="f">500 / 100</td></tr>
<tr><td><b>EBIT</b> (EBITDA = 170)</td><td class="f">120</td><td><b>Total assets</b></td><td class="f">1,000</td></tr>
<tr><td>Interest</td><td class="f">20</td><td>Current liabilities</td><td class="f">250</td></tr>
<tr><td>EBT</td><td class="f">100</td><td>Long-term debt</td><td class="f">350</td></tr>
<tr><td>Tax</td><td class="f">25</td><td><b>Total liabilities</b></td><td class="f">600</td></tr>
<tr><td><b>Net income</b></td><td class="f">75</td><td><b>Equity</b></td><td class="f">400</td></tr></table></div>
<div class="tw"><table><tr><th>Ratio</th><th>Calculation</th><th>Result</th></tr>
<tr><td>Working capital</td><td class="f">400 − 250</td><td class="f">150</td></tr>
<tr><td>Current ratio</td><td class="f">400 / 250</td><td class="f">1.60</td></tr>
<tr><td>Quick ratio</td><td class="f">(400 − 200) / 250</td><td class="f">0.80</td></tr>
<tr><td>Cash ratio</td><td class="f">(50 + 30) / 250</td><td class="f">0.32</td></tr>
<tr><td>A/R days</td><td class="f">365 / (1,000 / 120)</td><td class="f">43.8</td></tr>
<tr><td>Inventory days</td><td class="f">365 / (600 / 200)</td><td class="f">121.7</td></tr>
<tr><td>Debt ratio</td><td class="f">600 / 1,000</td><td class="f">60%</td></tr>
<tr><td>Debt / Equity</td><td class="f">600 / 400</td><td class="f">1.50</td></tr>
<tr><td>Debt to tangible net worth</td><td class="f">600 / (400 − 100)</td><td class="f">2.00</td></tr>
<tr><td>Times interest earned</td><td class="f">120 / 20</td><td class="f">6.0</td></tr>
<tr><td>Financial debt / EBITDA (debt = 350)</td><td class="f">350 / 170</td><td class="f">2.1 years</td></tr>
<tr><td>Gross / operating / net margin</td><td class="f">400/1,000 · 120/1,000 · 75/1,000</td><td class="f">40% · 12% · 7.5%</td></tr>
<tr><td>Asset turnover</td><td class="f">1,000 / 1,000</td><td class="f">1.00</td></tr>
<tr><td>ROA</td><td class="f">120 / 1,000 (= 12% × 1.0)</td><td class="f">12%</td></tr>
<tr><td>ROE</td><td class="f">75 / 400</td><td class="f">18.75%</td></tr>
<tr><td>Leverage effect</td><td class="f">(100/120) × (1,000/400)</td><td class="f">2.08 (favourable)</td></tr>
<tr><td>DuPont check</td><td class="f">1.0 × 12% × 0.833 × 2.5 × 0.75</td><td class="f">18.75%</td></tr>
<tr><td>EPS (50 shares)</td><td class="f">75 / 50</td><td class="f">€1.50</td></tr>
<tr><td>Diluted EPS (+5 dilutive)</td><td class="f">75 / 55</td><td class="f">€1.36</td></tr>
<tr><td>P/E (price €22.5)</td><td class="f">22.5 / 1.36</td><td class="f">16.5</td></tr>
<tr><td>Payout (DPS €0.60)</td><td class="f">0.60 / 1.36</td><td class="f">44%</td></tr>
<tr><td>Market-to-book</td><td class="f">(22.5 × 50) / 400</td><td class="f">2.81</td></tr></table></div></div>
<div class="card"><h2>If X happens, then Y (direction questions)</h2><div class="tw"><table><tr><th>Event</th><th>Effect</th></tr>
<tr><td>Pay a short-term debt with cash</td><td>WC same; current ratio up if &gt; 1, down if &lt; 1; quick ratio moves the same way</td></tr>
<tr><td>Buy inventory on credit</td><td>WC same; current ratio moves toward 1; quick ratio falls</td></tr>
<tr><td>Buy inventory with cash</td><td>Current ratio same; quick and cash ratios fall</td></tr>
<tr><td>Collect receivables</td><td>Current and quick ratios same; A/R days fall</td></tr>
<tr><td>Pay suppliers more slowly</td><td>A/P days up, cash cycle shorter, liquidity improves</td></tr>
<tr><td>Sell more with the same assets</td><td>Asset turnover and ROA up</td></tr>
<tr><td>Raise debt to buy back equity</td><td>Debt/equity up; ROE up if ROA &gt; interest rate, else down</td></tr>
<tr><td>Interest expense rises, EBIT constant</td><td>TIE falls</td></tr>
<tr><td>Issue dilutive securities</td><td>Diluted EPS falls, P/E on diluted EPS rises</td></tr>
<tr><td>Net income &gt; 0 but cash falls</td><td>Profit tied up in receivables/inventory: profit ≠ liquidity</td></tr></table></div></div>
<div class="card"><h2>Traps the exam likes</h2><ul>
<li>Read "average" or "year-end": average = (opening + closing)/2.</li>
<li>Days always = 365 / turnover. Do not divide by 360.</li>
<li>A/P turnover uses purchases if given, otherwise COGS.</li>
<li>ROA in this course = EBIT / total assets (not net income).</li>
<li>Debt/equity uses total liabilities, not only bank debt.</li>
<li>No % change if the base is 0 or the sign flips. Next year 0 = −100%.</li>
<li>"Before taxes" in ROE formula: ROA + (ROA − i) × L/E.</li>
<li>Negative working capital is not automatically bad: check A/R days vs A/P days.</li>
<li>A very high current ratio is not automatically good: idle assets.</li>
<li>Diluted figures: denominator includes dilutive securities, so EPS is lower.</li></ul></div>
<div class="card"><h2>Glossary</h2><div class="tw"><table>
<tr><td><b>A/R · A/P</b></td><td>Accounts receivable (customers owe us) · accounts payable (we owe suppliers)</td></tr>
<tr><td><b>CA · CL</b></td><td>Current assets · current liabilities (due within one year)</td></tr>
<tr><td><b>COGS</b></td><td>Cost of goods sold</td></tr>
<tr><td><b>EBIT · EBT · EBITDA</b></td><td>Earnings before interest and taxes · before taxes · before interest, taxes, depreciation and amortisation</td></tr>
<tr><td><b>Marketable securities</b></td><td>Short-term investments easily sold for cash</td></tr>
<tr><td><b>Intangibles</b></td><td>Goodwill, patents, brands</td></tr>
<tr><td><b>Dilutive securities</b></td><td>Convertible bonds, options, convertible preferred shares that could add shares</td></tr>
<tr><td><b>Leverage</b></td><td>Using borrowed money to finance assets</td></tr></table></div></div>
`;

const $=s=>document.querySelector(s);
const view=$('#view');
const SHEET=`
<div class="card"><h2>1 · Overview</h2>
<ul><li><b>Vertical (common-size):</b> each line as % of net sales (income statement) or total assets (balance sheet), same year.</li>
<li><b>Horizontal:</b> same line across years. Next year = 0 → −100%. Sign flips or base year = 0 → no % (say it in words).</li>
<li><b>Comparisons:</b> time series, cross-section/industry, standards (rules of thumb).</li>
<li><b>Limitations:</b> formulas differ, elective accounting, fiscal year-ends, limited disclosure, earnings management, historical cost.</li>
<li><b>Average balances:</b> flows (sales, COGS) over the year vs balances at one date. Seasonality still distorts.</li></ul></div>
<div class="card"><h2>2 · Liquidity</h2><div class="tw"><table><tr><th>Measure</th><th>Formula</th><th>Benchmark</th></tr>
<tr><td>Working capital</td><td class="f">CA − CL</td><td></td></tr>
<tr><td>Current ratio</td><td class="f">CA / CL</td><td>1.5 – 2</td></tr>
<tr><td>Quick ratio</td><td class="f">(CA − Inventory) / CL</td><td>≥ 1</td></tr>
<tr><td>Cash ratio</td><td class="f">(Cash + marketable securities) / CL</td><td>~0.3</td></tr>
<tr><td>A/R turnover · days</td><td class="f">Net sales / A/R · 365 / turnover</td><td></td></tr>
<tr><td>Inventory turnover · days</td><td class="f">COGS / Inventory · 365 / turnover</td><td></td></tr>
<tr><td>A/P turnover · days</td><td class="f">Purchases (or COGS) / A/P · 365 / turnover</td><td></td></tr>
<tr><td>Cash cycle</td><td class="f">A/R days + Inventory days − A/P days</td><td>lower is better</td></tr></table></div>
<div class="rule">"With average" means (opening + closing)/2. If an allowance for doubtful accounts is given, days' sales in receivables uses <b>gross</b> receivables.</div>
<h3>Reasoning rules</h3><ul>
<li>Negative working capital is fine if A/R days &lt; A/P days (cash cycle ≤ 0): IKEA, Walmart, Costco, airlines with ticket advances.</li>
<li>Profit ≠ liquidity: a profitable firm can still run out of cash.</li>
<li>Repay a short-term loan with cash: WC unchanged; current ratio rises if it was above 1, falls if below 1.</li>
<li>Natural business year-end (low inventories and payables) makes liquidity look better than usual.</li>
<li>Very high liquidity is not automatically good: idle cash earns little.</li></ul></div>
<div class="card"><h2>3 · Long-term debt-paying ability</h2><div class="tw"><table><tr><th>Measure</th><th>Formula</th><th>Reading</th></tr>
<tr><td>Times interest earned</td><td class="f">EBIT / Interest expense</td><td>higher = safer; recurring income only</td></tr>
<tr><td>Debt ratio</td><td class="f">Total liabilities / Total assets</td><td>lower = safer</td></tr>
<tr><td>Debt / Equity</td><td class="f">Total liabilities / Equity</td><td>creditors like low, shareholders like high</td></tr>
<tr><td>Debt to tangible net worth</td><td class="f">Total liabilities / (Equity − Intangibles)</td><td>stricter than D/E</td></tr>
<tr><td>Debt quality</td><td class="f">CL / Total liabilities</td><td>high = mostly short-term, refinancing risk</td></tr>
<tr><td>Financial debt / EBITDA</td><td class="f">Financial debt / EBITDA</td><td>years of EBITDA needed to repay</td></tr></table></div>
<div class="rule">Always take D/E with <b>total liabilities</b>, not only financial debt, unless the question says otherwise. Debt ratio + equity ratio = 100%.</div></div>
<div class="card"><h2>4 · Profitability</h2><div class="tw"><table><tr><th>Measure</th><th>Formula</th></tr>
<tr><td>Gross / operating / net margin</td><td class="f">Gross profit / Sales · EBIT / Sales · NI / Sales</td></tr>
<tr><td>ROA</td><td class="f">EBIT / Total assets (IKEA case: (EBIT + finance income)/TA; operating ROA = EBIT / operating assets)</td></tr>
<tr><td>ROA = margin × turnover</td><td class="f">EBIT/Sales × Sales/Total assets</td></tr>
<tr><td>ROE</td><td class="f">NI / Equity</td></tr>
<tr><td>DuPont ROE</td><td class="f">Sales/Assets × EBIT/Sales × EBT/EBIT × Assets/Equity × NI/EBT</td></tr>
<tr><td>Financial leverage effect</td><td class="f">(EBT/EBIT) × (Assets/Equity): &gt;1 favourable, =1 neutral, &lt;1 unfavourable</td></tr>
<tr><td>ROE before taxes</td><td class="f">ROA + (ROA − i) × L/E</td></tr>
<tr><td>Asset / fixed-asset turnover</td><td class="f">Sales / Total assets · Sales / Fixed assets</td></tr></table></div>
<h3>Reasoning rules</h3><ul><li>More debt raises ROE only if ROA &gt; cost of debt i. Otherwise ROE falls.</li>
<li>Two levers for ROE: improve ROA (margin or turnover) or raise debt (IKEA case).</li>
<li>Exclude discontinued and extraordinary items when judging recurring profitability.</li>
<li>EBITDA = EBIT + depreciation &amp; amortisation. EBITDAR also adds rents.</li></ul></div>
<div class="card"><h2>5 · Market ratios</h2><div class="tw"><table><tr><th>Measure</th><th>Formula</th></tr>
<tr><td>EPS</td><td class="f">Net income / Average common shares</td></tr>
<tr><td>Diluted EPS</td><td class="f">Net income / (Average shares + dilutive securities)</td></tr>
<tr><td>Dividend payout</td><td class="f">DPS / Diluted EPS</td></tr>
<tr><td>Market-to-book</td><td class="f">Market value of equity / Book value of equity</td></tr>
<tr><td>P/E</td><td class="f">Price / Diluted EPS</td></tr></table></div>
<div class="rule">Diluted EPS &lt; basic EPS, so P/E on diluted EPS is higher (more conservative). High P/E = the market expects strong growth.</div></div>
<div class="card"><h2>Case takeaways</h2><ul>
<li><b>IKEA Ibérica:</b> negative working capital is normal for a retailer with fast-paying customers and slower-paid suppliers. ROE can be improved through ROA or more debt.</li>
<li><b>IAG (airline):</b> advance ticket sales create unearned revenue, so current liabilities are large. 2020 (COVID) losses turn profitability and market ratios negative.</li>
<li>A negative P/E is not meaningful; the IAG slide shows −2.9 for 2020 while the annex shows 2.9, so quote the sign that your calculation gives and say the ratio is not meaningful.</li></ul></div>`;
const TIPS=`<div class="card"><h2>Exam tactics (13 minutes, 5 questions)</h2>
<ul><li><b>Time:</b> about 2.5 minutes per question. Do the sure ones first; free navigation lets you come back.</li>
<li><b>Scoring:</b> correct +2, wrong MCQ −0.5, blank 0. A blind guess among 4 options has expected value 0.25×2 − 0.75×0.5 = +0.125, so guess whenever you cannot rule out at least one option. With two options eliminated, always guess (+0.75).</li>
<li><b>Numeric questions:</b> the penalty is for multiple choice only, so always enter a value.</li>
<li><b>Calculator:</b> keep formulas written exactly as in the course (EBIT-based ROA, total liabilities in D/E, 365 days).</li>
<li><b>Check the wording:</b> "average" balance, "gross" receivables, "diluted" EPS, "before taxes".</li>
<li><b>Direction questions:</b> write what happens to numerator and denominator first.</li></ul></div>`;
let state={mode:'exam',timer:null};
const best=k=>{try{return localStorage.getItem('fa-best-'+k)}catch(e){return null}};
const setBest=(k,v)=>{try{const o=parseFloat(best(k));if(isNaN(o)||v>o)localStorage.setItem('fa-best-'+k,v)}catch(e){}};
function setTab(id){clearInterval(state.timer);['sheet','tests','tips'].forEach(t=>$('#t-'+t).setAttribute('aria-selected',t===id));
 if(id==='sheet')view.innerHTML=STARTER+SHEET;else if(id==='tips')view.innerHTML=TIPS;else home()}
function home(){
 view.innerHTML=`<div class="mode"><span class="small">Mode</span><button class="pill" id="m-exam" aria-pressed="${state.mode==='exam'}">Exam: 13:00, answers at the end</button><button class="pill" id="m-prac" aria-pressed="${state.mode==='prac'}">Practice: no timer, instant answers</button></div>
 <div class="grid">${TESTS.map((t,i)=>`<button class="tcard" data-i="${i}"><span class="sub">Test</span><b>${t.n}</b><span>${t.t} · ${t.ix.filter(q=>q.type==='mcq').length} MCQ + ${t.ix.filter(q=>q.type==='num').length} numeric</span>${best(i)!==null?`<span class="best">Best: ${best(i)} / 10</span>`:''}</button>`).join('')}</div>`;
 $('#m-exam').onclick=()=>{state.mode='exam';home()};$('#m-prac').onclick=()=>{state.mode='prac';home()};
 view.querySelectorAll('.tcard').forEach(b=>b.onclick=()=>start(+b.dataset.i))}
const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
function start(i){
 const t=TESTS[i];state.t=t;state.i=i;state.cur=0;state.ans=t.ix.map(()=>null);state.done=false;state.left=780;
 if(state.mode==='exam'){clearInterval(state.timer);state.timer=setInterval(()=>{state.left--;const c=$('#clock');if(c){c.textContent=fmt(state.left);c.classList.toggle('low',state.left<=120)}if(state.left<=0){clearInterval(state.timer);finish()}},1000)}
 render()}
function correct(q,a){if(a===null||a==='')return null;if(q.type==='mcq')return a===q.a;const v=parseFloat(String(a).replace(',','.'));return !isNaN(v)&&Math.abs(v-q.a)<=q.tol}
function render(){
 const t=state.t,q=t.ix[state.cur],a=state.ans[state.cur],prac=state.mode==='prac';
 const shown=prac&&a!==null&&a!=='';
 let body=`<div class="bar"><div class="sub">Test ${t.n} · Question ${state.cur+1} of 5</div>${prac?'<div class="small">Practice mode</div>':`<div class="clock" id="clock">${fmt(Math.max(state.left,0))}</div>`}</div>
 <div class="bar"><div class="dots">${t.ix.map((x,j)=>`<button class="dot ${j===state.cur?'cur':''} ${state.ans[j]!==null&&state.ans[j]!==''?'done':''}" data-j="${j}">${j+1}</button>`).join('')}</div><button class="btn p" id="fin">Finish</button></div>
 <div class="card"><span class="tag">${q.t} · ${q.type==='mcq'?'multiple choice (−0.5 if wrong)':'numeric (no penalty)'}</span><p class="q">${q.q}</p>`;
 if(q.type==='mcq'){body+=q.opts.map((o,k)=>{let c='';if(shown){c=k===q.a?'right':(k===a?'wrong':'')}else if(a===k)c='sel';return `<button class="opt ${c}" data-k="${k}">${String.fromCharCode(65+k)}. ${o}</button>`}).join('')}
 else body+=`<div class="numrow"><input class="num" id="num" inputmode="decimal" value="${a??''}" aria-label="Your answer"><span>${q.unit}</span><button class="btn" id="ok">Save</button></div>`;
 if(shown)body+=ansBox(q,a);
 body+=`</div><div class="bar"><button class="btn" id="prev" ${state.cur?'':'disabled'}>Previous</button><button class="btn" id="next" ${state.cur<4?'':'disabled'}>Next</button></div>`;
 view.innerHTML=body;
 view.querySelectorAll('.dot').forEach(b=>b.onclick=()=>{state.cur=+b.dataset.j;render()});
 $('#prev').onclick=()=>{state.cur--;render()};$('#next').onclick=()=>{state.cur++;render()};$('#fin').onclick=finish;
 view.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(shown)return;state.ans[state.cur]=+b.dataset.k;render()});
 if($('#ok'))$('#ok').onclick=()=>{state.ans[state.cur]=$('#num').value.trim()||null;render()};
 if($('#num'))$('#num').onkeydown=e=>{if(e.key==='Enter')$('#ok').click()}}
function ansBox(q,a){const c=correct(q,a);const ca=q.type==='mcq'?`${String.fromCharCode(65+q.a)}. ${q.opts[q.a]}`:`${q.a} ${q.unit}`;
 return `<div class="ans ${c===null?'':c?'ok':'no'}"><b>${c===null?'No answer':c?'Correct · +2':'Wrong'+(q.type==='mcq'?' · −0.5':' · 0')}</b><br>Answer: <b>${ca}</b><br>${q.exp}</div>`}
function finish(){
 clearInterval(state.timer);state.done=true;const t=state.t;let score=0,right=0,wrong=0,blank=0;
 t.ix.forEach((q,j)=>{const c=correct(q,state.ans[j]);if(c===null)blank++;else if(c){score+=2;right++}else{wrong++;if(q.type==='mcq')score-=0.5}});
 if(state.mode==='exam')setBest(state.i,score);
 view.innerHTML=`<div class="card"><span class="sub">Test ${t.n} result${state.mode==='exam'?'':' (practice)'}</span><div class="score">${score} <span class="small">/ 10</span></div><p>${right} correct · ${wrong} wrong · ${blank} blank. Each correct answer is worth +2, each wrong MCQ −0.5.</p><button class="btn p" id="back">Back to tests</button></div>`+
 t.ix.map((q,j)=>`<div class="card rev"><span class="tag">Q${j+1} · ${q.t}</span><p class="q">${q.q}</p><div class="small">Your answer: ${state.ans[j]===null||state.ans[j]===''?'none':(q.type==='mcq'?String.fromCharCode(65+state.ans[j])+'. '+q.opts[state.ans[j]]:state.ans[j])}</div>${ansBox(q,state.ans[j])}</div>`).join('');
 $('#back').onclick=home;window.scrollTo(0,0)}
$('#t-sheet').onclick=()=>setTab('sheet');$('#t-tests').onclick=()=>setTab('tests');$('#t-tips').onclick=()=>setTab('tips');
setTab('sheet');

