// Built-in bank: Financial analysis, consolidation of financial statements (English, like the course slides).
// Sources: slides parts 1–4 (groups, full consolidation, goodwill & NCI, internal transactions, equity method),
// assignments 1–5 (Pescanova, P/S, Black/White, Planet/Sun) and Cases 1 & 2 (A/B/C, Push/Shove). Figures checked against the solutions.
// Static, so every device builds the same Q/TQ arrays for multiplayer.
window.BANK_COMPTA2=(function(){
const SESS={1:"Groups & types of investment",2:"Goodwill & NCI at acquisition",3:"Consolidating after the acquisition",4:"Internal transactions",5:"Equity method (associates & JVs)",6:"Worked cases: A/B/C and Push/Shove"};
const TAGS={1:"Groups",2:"Goodwill & NCI",3:"Post-acquisition",4:"Intragroup",5:"Equity method",6:"Cases"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,t,q,ok,wr,e)=>Q.push({s,t,q,o:[ok,...wr],a:0,e});
const vf=(s,q,v,e)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true});
const ty=(s,q,a,e,n)=>TQ.push(n?{s,q,a,e,n}:{s,q,a,e});

// ===================== 1. Groups & types of investment =====================
m(1,"Group","How does IFRS define a “group”?","A parent and all its subsidiaries",["Any two companies that trade with each other","A company and all the entities in which it holds a stake","All companies sharing the same auditor"],"IFRS: a group is “a parent and all its subsidiaries”.");
m(1,"Group","When must consolidated financial statements (CFS) be prepared under IFRS?","When a parent company owns one or more subsidiaries",["Whenever a company owns shares in another company","Only when the parent holds 100% of its subsidiary","Only when the group is listed on a stock exchange"],"A group exists as soon as a parent owns at least one subsidiary, and CFS are then required (subject to exemptions).");
m(1,"Group","What do consolidated financial statements show?","The financial and economic position of the group as if it were a single entity",["The sum of the separate statements without any elimination","Only the financial position of the parent","Only the assets of the subsidiaries"],"CFS present the group AS IF it were one entity, which also avoids accounting manipulation.");
m(1,"Exemption","Which of these is an IFRS exemption from preparing CFS?","The parent is itself a wholly-owned subsidiary (subgroup exemption)",["The parent has more than ten subsidiaries","The subsidiaries are located abroad","The parent is profitable"],"Exemptions: the parent is itself a wholly-owned subsidiary, or its debt/equity instruments are not traded in a public market.");
m(1,"Exemption","A owns 100% of M, and M owns 100% of B. Which statement follows from the subgroup exemption?","M can skip consolidating B because it is a wholly-owned subsidiary of A",["A cannot consolidate anything","B must consolidate M","M must always consolidate B"],"M is a wholly-owned subsidiary, so it does not need to consolidate M-B; A consolidates the whole group.");
m(1,"Subsidiary","Control of an entity is presumed to exist when the investor owns…","More than 50% of the voting power",["At least 20% of the voting power","Exactly 50% of the shares","More than 10% of the share capital"],"IFRS 10: control is presumed above 50% of the voting rights.");
m(1,"Subsidiary","A holds 45% of the votes and has an agreement with another investor who holds 8%. What is B?","A subsidiary, because A controls more than 50% of the votes by agreement",["An associate, because 45% is below 50%","A joint venture","A simple investment"],"45% + 8% = 53% of voting rights under an agreement, so control exists.");
m(1,"Subsidiary","Which of these can give control even without owning more than 50% of the votes?","The power to appoint or remove the majority of the board",["Having a good commercial relationship with the investee","Buying inventories from the investee","Sitting on the board with a single seat"],"Control can come from agreements, statutory power or power over the board, not only from the percentage.");
m(1,"Subsidiary","Which method applies to a subsidiary?","Full consolidation",["Equity method","No consolidation","Proportional method"],"Subsidiaries are accounted for using full consolidation.");
m(1,"Associate","Which method applies to an associate?","Equity method",["Full consolidation","No consolidation","Cost method with annual write-off"],"Associates (significant influence, usually 20% to 50%) use the equity method.");
m(1,"Associate","Significant influence is…","The power to participate in the financial and operating policy decisions without controlling them",["The power to decide alone on all policies","The right to receive all the dividends","The ownership of at least 60% of the votes"],"It is the power to participate in policy decisions, but it is NOT control or joint control.");
m(1,"Associate","Which is the strongest evidence of significant influence?","Representation on the board of directors of the investee",["A single material supplier contract","A friendly relationship between the CEOs","Holding 15% of the shares"],"Board representation is the strongest evidence, ahead of policy-making participation, material transactions, managerial interchange and technical information.");
m(1,"Joint venture","What defines a joint venture?","Joint control: strategic decisions require the unanimous consent of the parties",["Ownership of more than 50% by one party","Ownership of less than 20% by each party","A temporary loan between two companies"],"Joint control is the contractually agreed sharing of control; unanimous consent is needed for the key decisions.");
m(1,"Joint venture","Which method is used for a joint venture?","Equity method",["Full consolidation","No consolidation","Fair value through profit"],"Joint ventures, like associates, are accounted for with the equity method.");
m(1,"Simple investment","How is a stake below 20% with no significant influence treated?","As a simple (trade) investment, not included in the consolidation",["Full consolidation","Equity method","Joint venture"],"Below 20% without significant influence: simple investment (IFRS 9), no consolidation.");
m(1,"Classification","Pear Ltd acquired 80,000 of the 200,000 ordinary shares of Lemon Ltd. What is Lemon?","An associate (40%), consolidated with the equity method",["A subsidiary (40%), fully consolidated","A joint venture (40%)","A simple investment (40%)"],"80,000 / 200,000 = 40%, between 20% and 50%: associate, equity method.");
m(1,"Classification","Park Ltd acquired 240,000 of the 300,000 shares of Stop Ltd. What is Stop?","A subsidiary (80%), fully consolidated",["An associate (80%)","A joint venture (80%)","A simple investment (80%)"],"240,000 / 300,000 = 80% > 50%: subsidiary, full consolidation.");
m(1,"Classification","Pot Ltd bought 15% of Kettle Ltd as an investment strategy. How is Kettle treated?","It is a simple investment and is not consolidated",["It is an associate and is equity-accounted","It is a subsidiary and is fully consolidated","It is a joint venture"],"15% < 20% and no significant influence: no consolidation.");
m(1,"Classification","Paint Ltd and Cement Ltd (unrelated) each acquire 50% of Grass Ltd and jointly control its activities. What is Grass?","A joint venture, consolidated with the equity method",["A subsidiary of both","An associate of both","A simple investment"],"Two parties with joint control: joint venture, equity method.");
m(1,"Classification","Pepper Ltd owns 50% of Salt Ltd and appoints 5 of its 10 directors, one of whom is chairman with a casting vote. What is Salt?","A subsidiary, fully consolidated",["An associate, equity method","A joint venture, equity method","A simple investment"],"Pepper controls the board (casting vote), so there is control even at exactly 50%.");
m(1,"Classification","Black Ltd acquires 1,500,000 of Red Ltd's 2,000,000 shares. What is Red?","A subsidiary (75%), full consolidation",["An associate (75%), equity method","A joint venture, equity method","A simple investment (75%)"],"1,500,000 / 2,000,000 = 75%.");
m(1,"Classification","Pescanova holds 60% of Pescamar, but political problems in the country prevent it from exercising control while it can exert some influence. What is Pescamar?","An associate, equity method",["A subsidiary, full consolidation","A joint venture","A simple investment"],"Majority ownership does not make a subsidiary if control cannot be exercised; here there is only significant influence.");
m(1,"Classification","Austral Fisheries (50% Pescanova) has statutes establishing joint management with another company. What is it?","A joint venture, equity method",["A subsidiary, full consolidation","An associate with no joint control","A simple investment"],"Statutes that establish joint management mean joint control.");
m(1,"Classification","Pescanova owns 19% of American Shipping. How is it treated?","Simple investment, no consolidation",["Associate, equity method","Subsidiary, full consolidation","Joint venture"],"Below 20% = simple investment.");
m(1,"Classification","Pescanova owns 90.36% of Frinova. How is it treated?","Subsidiary, full consolidation",["Associate, equity method","Joint venture, equity method","Simple investment"],"More than 50%: subsidiary.");
m(1,"Acquisition date","Novaguatemala (100%) was acquired on 1 October X1 and the consolidation date is 31 December. What is included from its income statement?","Only October to December",["The whole year","Nothing, since it was just bought","Only December"],"Only the post-acquisition period (3 months) goes into the consolidated income statement; the rest is treated as reserves generated before it joined the group.");
m(1,"Why","What is the economic reason to prepare CFS beyond legal requirements?","The parent's statements alone do not give a complete account of the group's economic activities and position",["To reduce the group's taxes","To increase the parent's profit","To avoid publishing the subsidiaries' statements"],"Parent-only statements hide what the parent really controls through its subsidiaries.");
m(1,"Users","Who uses consolidated financial statements?","Government, investors, banks, auditors and tax authorities",["Only the employees of the parent","Only the minority shareholders","Only the subsidiaries' managers"],"These are the users listed in the slides.");
m(1,"Example","Company B sold a non-current asset costing 1 to A for 9 (profit 8). A earned 4 and B earned 5 in total (before the adjustment). What is the group profit?","1",["9","8","13"],"4 + 5 − 8 (unrealised internal profit) = 1. The internal profit is cancelled in consolidation.");

vf(1,"Under IFRS, a group exists when a parent owns one or more subsidiaries.",true,"That is the condition for preparing CFS.");
vf(1,"Control can only exist if the investor owns more than 50% of the shares.",false,"Control can also come from agreements, statutes or board appointment powers, and 50%+ ownership does not guarantee control.");
vf(1,"An associate is consolidated with full consolidation.",false,"Associates use the equity method.");
vf(1,"A joint venture is accounted for with the equity method.",true,"Joint ventures and associates both use the equity method.");
vf(1,"A trade investment below 20% is included in the consolidation.",false,"It is not consolidated.");
vf(1,"Owning 20% to 50% of the voting shares usually gives rise to an associate.",true,"Unless it can be shown that significant influence does not exist.");
vf(1,"A company with 60% of the votes can never be an associate.",false,"If control cannot be exercised (legal, political reasons), it may be an associate: see Pescamar.");
vf(1,"A parent needs at least one subsidiary to be able to form a group and consolidate.",true,"Without a subsidiary there is no group, hence no consolidation.");
vf(1,"The operating and financial policies of an entity include dividend policy, raising finance and approving capital expenditure.",true,"These are examples listed in the slides.");
vf(1,"In full consolidation, only the share of the subsidiary owned by the parent is added to the parent's balance sheet.",false,"100% of the subsidiary is added, regardless of the percentage owned.");

ty(1,"What is the name of the entity controlled by another entity?",["subsidiary","a subsidiary"],"A subsidiary is controlled by a parent.");
ty(1,"Which method is applied to a subsidiary?",["full consolidation","full"],"Subsidiaries: full consolidation.",["equity method"]);
ty(1,"Which method is applied to an associate?",["equity method","equity","equity accounting"],"Associates: equity method.",["full consolidation"]);
ty(1,"What percentage of voting rights is the lower threshold of significant influence?",["20","20%","20 %"],"20% to 50% usually means associate.");
ty(1,"A buys 3,000 of the 5,000 shares of B. What % of B does it own?",["60","60%","60 %"],"3,000 / 5,000 = 60%.");
ty(1,"Companies A and B belong to the same group. B sold to A an asset costing 1 for 9. How much profit is generated by the internal sale?",["8"],"9 − 1 = 8, which must be cancelled in consolidation.");

// ===================== 2. Goodwill & NCI at acquisition =====================
m(2,"Cornerstone","What is the cornerstone of full consolidation?","Replacing the parent's investment in S by the assets and liabilities of S",["Adding the parent's profit to the subsidiary's profit","Writing off the subsidiary's equity against the parent's profit","Valuing the subsidiary at market price"],"The statements are aggregated, then the investment is eliminated against the equity of the subsidiary.");
m(2,"Cornerstone","What is eliminated in the “Investment-Equity adjustment”?","The parent's investment in S against 100% of the equity of S",["The parent's equity against the subsidiary's liabilities","Only the parent's share of the equity of S","The subsidiary's assets against the parent's liabilities"],"100% of the subsidiary's equity is eliminated, no matter what percentage the parent owns.");
m(2,"Goodwill","Goodwill is…","The excess of what the parent pays over its share of the subsidiary's equity at acquisition",["The excess of the subsidiary's equity over its market value","The parent's profit on the acquisition","The NCI share of the subsidiary's profit"],"Goodwill = price paid − group share of the (fair-valued) equity at the acquisition date.");
m(2,"Goodwill","Where is goodwill recorded in the consolidated balance sheet?","As an intangible non-current asset",["As a reserve in equity","As a current asset","As a liability"],"It is written down only if impaired under IFRS.");
m(2,"Goodwill","When is goodwill calculated?","Always at the acquisition date",["At each reporting date","At the consolidation date","At the end of the first year"],"Goodwill does not change with later changes of the subsidiary's equity.");
m(2,"Bargain purchase","What happens if the price paid is lower than the parent's share of the subsidiary's equity?","A gain from a bargain purchase is recognised in profit or loss",["Negative goodwill is shown as an asset","The difference is added to NCI","The difference is ignored"],"This “badwill” is a gain in the consolidated income statement.");
m(2,"NCI","What are non-controlling interests (NCI)?","The equity in a subsidiary not attributable, directly or indirectly, to the parent",["The part of the parent's equity owned by minority shareholders","The goodwill of the subsidiary","The loans granted to the subsidiary"],"IFRS definition. NCI arise when the parent owns less than 100%.");
m(2,"NCI","Where does NCI appear in the consolidated balance sheet?","Within equity, separately from the parent shareholders' equity",["As a non-current liability","As a current asset","Not at all"],"NCI is presented in equity, on its own line.");
m(2,"NCI","If the parent owns 80%, NCI at acquisition is…","20% of the subsidiary's equity at acquisition",["80% of the subsidiary's equity at acquisition","20% of the parent's equity","20% of the price paid"],"NCI = (100% − 80%) × equity of S.");
m(2,"Fair value","If a non-current asset of S is undervalued by 150 at acquisition, how does this affect goodwill and NCI?","The equity of S used in the calculation increases by 150",["It increases goodwill by 150","It is ignored until the asset is sold","It reduces NCI by 150"],"Fair value adjustments are added to the equity of S before computing the group share and NCI.");
m(2,"Adjustment","Why are consolidation “adjustments” and not “entries”?","They are made after each company's accounts are closed and do not change those accounts",["They are posted in the parent's ledger at year end","They are posted in the subsidiary's ledger","They are posted in the tax return"],"Consolidation adjustments do not modify the individual companies' accounting.");
m(2,"Example","A buys 100% of B for 7,200. B's capital is 2,000, legal reserves 2,500 and retained earnings 1,400. What is goodwill?","1,300",["5,900","7,200","1,400"],"Equity of B = 5,900. Goodwill = 7,200 − 5,900 = 1,300.");
m(2,"Example","A buys 100% of B for 4,500; the equity of B is 5,900. What is the result?","Gain from a bargain purchase of 1,400",["Goodwill of 1,400","Goodwill of 4,500","NCI of 1,400"],"4,500 − 5,900 = −1,400, a bargain purchase gain.");
m(2,"Example","A buys 80% of B for 7,200. B's equity is 5,900. What is goodwill?","2,480",["1,300","1,180","2,300"],"Group share = 5,900 × 0.8 = 4,720. Goodwill = 7,200 − 4,720 = 2,480. NCI = 1,180.");
m(2,"Example","A buys 80% of B for 7,200; B's equity is 5,900. What is NCI at acquisition?","1,180",["2,480","4,720","1,475"],"5,900 × 20% = 1,180.");
m(2,"Example","A buys 75% of B for 4,100. B's equity is 5,900. What is the result?","A bargain purchase gain of 325, and NCI of 1,475",["Goodwill of 325 and NCI of 1,475","Goodwill of 1,475","A bargain purchase gain of 1,475 and no NCI"],"Group share = 5,900 × 0.75 = 4,425; 4,100 − 4,425 = −325. NCI = 5,900 × 0.25 = 1,475.");
m(2,"Example","A buys 80% of B for 7,200. B's equity is 5,900 and one non-current asset is undervalued by 150. What is goodwill?","2,360",["2,480","2,240","2,330"],"Equity at fair value = 6,050; × 0.8 = 4,840; goodwill = 7,200 − 4,840 = 2,360. NCI = 6,050 × 0.2 = 1,210.");
m(2,"Example","In the previous example (80%, undervalued asset +150), what is NCI?","1,210",["1,180","1,150","1,360"],"(2,000 + 2,500 + 1,400 + 150) × 0.2 = 1,210.");
m(2,"Exercise 1","P owns 100% of S, bought at 30 June X1 for 1,300. S's equity is 400 + 1,200 = 1,600 (thousand €). What does the consolidation show?","A gain from a bargain purchase of 300",["Goodwill of 300","Goodwill of 1,300","NCI of 300"],"1,300 − 1,600 = −300: bargain purchase gain.");
m(2,"Exercise 2","P owns 75% of S, bought for 2,450. S's equity is 2,000 + 1,900 = 3,900. What are the group share of equity and the result?","2,925, so a bargain purchase gain of 475",["2,925, so goodwill of 475","3,900, so goodwill of 1,450","2,450, so no difference"],"3,900 × 0.75 = 2,925; 2,450 − 2,925 = −475.");
m(2,"Exercise 2","In Exercise 2 (75%, equity of S 3,900), what is the NCI?","975",["475","2,925","1,950"],"3,900 × 25% = 975.");
m(2,"Exercise 2","In Exercise 2, what is the consolidated total assets (thousand €)?","16,900",["19,350","13,650","19,825"],"Aggregated 19,350 minus the investment of 2,450 = 16,900.");
m(2,"Exercise 1","What are the consolidated total assets in Exercise 1 (thousand €)?","6,010",["7,310","4,950","6,310"],"4,950 + 2,360 = 7,310, minus the investment 1,300 = 6,010.");
m(2,"Which equity","When computing goodwill, which percentage of the subsidiary's equity do we use?","The percentage owned by the parent",["100%","The percentage owned by NCI","50%"],"Goodwill = price − (% owned × equity of S at acquisition). NCI uses the remaining percentage.");
m(2,"Reserves at acquisition","When computing goodwill, which components of S's equity at acquisition are included?","All of them: capital, share premium, revaluation reserve, retained earnings…",["Only the share capital","Only retained earnings","Only reserves, not capital"],"Share capital and all reserves at the acquisition date enter the calculation.");

vf(2,"In full consolidation, 100% of the subsidiary's assets and liabilities are added even if the parent owns only 75%.",true,"The remaining 25% appears as NCI in equity.");
vf(2,"Goodwill is recalculated at each consolidation date.",false,"It is always calculated at the acquisition date.");
vf(2,"A bargain purchase gain is recognised as an asset.",false,"It is recognised in profit or loss.");
vf(2,"NCI is presented in equity, separately from the parent shareholders' equity.",true,"This is the IFRS presentation.");
vf(2,"Goodwill is an intangible non-current asset only written down if impaired.",true,"IFRS: tested for impairment, not amortised.");
vf(2,"If the price paid is higher than the group share of S's equity, the difference is a bargain purchase.",false,"A higher price gives goodwill; a lower price gives a bargain purchase gain.");
vf(2,"Fair value adjustments of S's assets at acquisition are added to the equity of S in the goodwill and NCI calculation.",true,"They increase the equity of S used in both calculations.");
vf(2,"A parent that owns 100% of a subsidiary has no NCI.",true,"NCI = (100% − 100%) × equity = 0.");

ty(2,"A buys 100% of B for 7,200; B's equity is 5,900. What is the goodwill?",["1300","1.300","1,300"],"7,200 − 5,900 = 1,300.");
ty(2,"A buys 80% of B for 7,200; B's equity is 5,900. What is the goodwill?",["2480"],"7,200 − 5,900 × 0.8 = 2,480.");
ty(2,"A buys 80% of B for 7,200; B's equity is 5,900. What is the NCI?",["1180"],"5,900 × 0.2 = 1,180.");
ty(2,"A buys 75% of B for 4,100; B's equity is 5,900. What is the NCI?",["1475"],"5,900 × 0.25 = 1,475.");
ty(2,"A buys 80% of B for 7,200; equity of B 5,900 plus an undervalued asset of 150. What is the goodwill?",["2360"],"6,050 × 0.8 = 4,840; 7,200 − 4,840 = 2,360.");
ty(2,"Exercise 2: P owns 75% of S, whose equity is 3,900. What is the NCI (thousand €)?",["975"],"3,900 × 0.25 = 975.");
ty(2,"Exercise 1: P owns 100% of S, price 1,300, equity of S 1,600. What is the bargain purchase gain (thousand €)?",["300"],"1,600 − 1,300 = 300.");
ty(2,"What do we call the gain when the price paid is below the group share of equity?",["gain from a bargain purchase","bargain purchase","badwill","bargain purchase gain"],"Gain from a bargain purchase (“badwill”).",["goodwill"]);
ty(2,"What is the name of the adjustment that eliminates the parent's investment against the subsidiary's equity?",["investment-equity adjustment","investment equity adjustment","investment-equity"],"The Investment-Equity adjustment.");

// ===================== 3. Consolidating after the acquisition =====================
m(3,"Post-acquisition","What changes when we consolidate years after the purchase?","The equity of S has changed since acquisition, and its post-acquisition increase must be shared between the parent and NCI",["Goodwill must be recalculated","The parent's investment is revalued","NCI is no longer calculated"],"Goodwill stays fixed, but post-acquisition earnings are split between group reserves and NCI.");
m(3,"Post-acquisition","How is NCI calculated at the consolidation date?","NCI % × equity of S at the consolidation date (after adjustments)",["NCI % × equity of S at the acquisition date","NCI % × price paid","NCI % × equity of the parent"],"NCI = share of net assets at acquisition + share of post-acquisition earnings = NCI % × current equity of S.");
m(3,"Reserves","How are consolidated (group) reserves calculated?","Parent % × (equity of S now − equity of S at acquisition)",["NCI % × (equity of S now − equity of S at acquisition)","Parent % × equity of S now","Parent % × equity of S at acquisition"],"Only the post-acquisition change in S's equity belongs to the group reserves.");
m(3,"Reserves","If the equity of S has decreased since acquisition, what are the consolidated reserves?","Negative",["Zero","Positive, because goodwill increases","They are shown in NCI"],"Parent % × (negative change) = negative group reserves, as in Planet and Sun.");
m(3,"Reserves","Which items of S's equity are included in the change used for group reserves?","All elements: capital, premium, reserves and retained earnings",["Only the retained earnings","Only the capital","Only the share premium"],"“If some other elements of the equity of S changed, we would have taken into account the change in the overall equity of S.”");
m(3,"Example 6","A buys 70% of B for 15,600. B's equity at acquisition is 3,000 + 2,500 + 4,100 + 6,800 = 16,400. What is the goodwill?","4,120",["4,920","11,480","1,190"],"16,400 × 0.7 = 11,480; 15,600 − 11,480 = 4,120.");
m(3,"Example 6","In Example 6 (70%, equity 16,400 at acquisition), what is the NCI at acquisition?","4,920",["5,430","11,480","4,120"],"16,400 × 0.3 = 4,920.");
m(3,"Example 6","In Example 6, equity of B at 31.12.X4 is 18,100 (retained earnings up from 6,800 to 8,500). What are the consolidated reserves?","1,190",["1,700","510","4,120"],"Increase 1,700 × 0.7 = 1,190.");
m(3,"Example 6","In Example 6, what is the NCI at 31.12.X4?","5,430",["4,920","1,700","7,230"],"18,100 × 0.3 = 5,430, or 4,920 + 1,700 × 0.3.");
m(3,"Exercise 3","P bought 75% of S (price 2,450) when the equity of S was 2,000 capital + 1,200 retained earnings. What is the goodwill?","50",["475","975","525"],"3,200 × 0.75 = 2,400; 2,450 − 2,400 = 50.");
m(3,"Exercise 3","In Exercise 3, retained earnings of S are now 1,900. What are the group reserves (thousand €)?","525",["700","975","1,425"],"(1,900 − 1,200) × 0.75 = 525.");
m(3,"Exercise 3","In Exercise 3, what is the NCI at the consolidation date?","975",["800","700","1,000"],"(2,000 + 1,900) × 0.25 = 975.");
m(3,"Exercise 3","In Exercise 3, what are the consolidated total assets (thousand €)?","16,950",["16,900","19,350","17,000"],"19,350 − 2,450 (investment) + 50 (goodwill) = 16,950.");
m(3,"Exercise 4","Black bought 60% of White for 1,280 when White had capital 1,000, share premium 200 and retained earnings 800. What is the goodwill (thousand €)?","80",["1,200","1,132","498"],"2,000 × 0.6 = 1,200; 1,280 − 1,200 = 80.");
m(3,"Exercise 4","In Exercise 4, retained earnings of White are now 1,630. What are the group reserves?","498",["830","332","1,132"],"(1,630 − 800) × 0.6 = 498.");
m(3,"Exercise 4","In Exercise 4, what is the NCI?","1,132",["1,200","800","498"],"(1,000 + 200 + 1,630) × 0.4 = 1,132.");
m(3,"Exercise 4","In Exercise 4, what are the consolidated total assets (thousand €)?","13,920",["15,120","11,160","15,200"],"15,120 − 1,280 + 80 = 13,920.");
m(3,"Exercise 5","Planet bought 80,000 of Sun's 100,000 shares for 160 (thousand €). Sun's equity at acquisition: capital 100, premium 10, general reserve 20, retained earnings 50. What is the goodwill?","16",["20","144","32"],"180 × 0.8 = 144; 160 − 144 = 16.");
m(3,"Exercise 5","In Exercise 5, Sun's equity at the consolidation date is 160 (100 + 10 + 15 + 35). What are the group reserves?","−16",["+16","−20","−32"],"(160 − 180) × 0.8 = −16: negative group reserves.");
m(3,"Exercise 5","In Exercise 5, what is the NCI at the consolidation date?","32",["36","20","16"],"160 × 0.2 = 32.");
m(3,"Exercise 5","In Exercise 5, what are the consolidated total assets (thousand €)?","616",["760","538","622"],"760 − 160 (investment) + 16 (goodwill) = 616.");
m(3,"Interpretation","What does the consolidated total equity include?","The parent's equity, the group reserves and the NCI",["Only the parent's share capital","Only the parent's equity","The subsidiary's liabilities"],"Total equity includes the parent's equity, group reserves from subsidiaries (and associates) and NCI.");
m(3,"Interpretation","What do the consolidated total assets represent?","The assets controlled by the group: parent plus 100% of subsidiaries, plus goodwill, minus intragroup items",["Only the assets owned by the parent's shareholders","The market value of the group","The parent's assets plus the subsidiary's equity"],"All assets under the group's control, even those financed by NCI.");

vf(3,"Goodwill is always calculated at the acquisition date.",true,"It does not change with later changes of S's equity.");
vf(3,"Group reserves equal the parent % × the change in S's equity since acquisition.",true,"Only the post-acquisition change belongs to the group.");
vf(3,"NCI at the consolidation date = NCI % × equity of S at the acquisition date.",false,"It uses the equity of S at the consolidation date (after adjustments).");
vf(3,"Group reserves can be negative.",true,"If S's equity decreased since acquisition, as in Planet and Sun.");
vf(3,"When S's retained earnings increase after acquisition, NCI increases by NCI % × the increase.",true,"E.g. 4,920 + 1,700 × 0.3 = 5,430.");
vf(3,"Consolidated total equity includes the NCI.",true,"NCI is part of equity.");

ty(3,"Example 6: what are the consolidated reserves?",["1190"],"1,700 × 0.7 = 1,190.");
ty(3,"Example 6: what is the NCI at 31.12.X4?",["5430"],"18,100 × 0.3.");
ty(3,"Exercise 3: what is the goodwill (thousand €)?",["50"],"2,450 − 3,200 × 0.75 = 50.");
ty(3,"Exercise 3: what are the group reserves (thousand €)?",["525"],"(1,900 − 1,200) × 0.75.");
ty(3,"Exercise 4: what is the goodwill (thousand €)?",["80"],"1,280 − 2,000 × 0.6.");
ty(3,"Exercise 4: what is the NCI (thousand €)?",["1132"],"2,830 × 0.4.");
ty(3,"Exercise 4: what are the group reserves (thousand €)?",["498"],"(1,630 − 800) × 0.6.");
ty(3,"Exercise 5: what is the goodwill (thousand €)?",["16"],"160 − 180 × 0.8.");
ty(3,"Exercise 5: what are the group reserves (thousand €)?",["-16","−16","minus 16"],"(160 − 180) × 0.8 = −16.");
ty(3,"Exercise 5: what is the NCI (thousand €)?",["32"],"160 × 0.2.");

// ===================== 4. Internal transactions =====================
m(4,"Types","Which are the three types of internal transactions listed in the course?","Inventory, non-current assets, and financial transactions / intragroup balances",["Sales, purchases and wages","Dividends, taxes and rent","Cash, loans and shares"],"These are the three families of intragroup transactions to eliminate.");
m(4,"Inventory","When does unrealised inventory profit arise?","When a group entity sells goods to another at a profit and some are still in the buyer's inventory at year end",["When goods are sold to third parties at a profit","When the buyer pays late","When the seller has a loss"],"The profit is unrealised because the goods have not yet been sold outside the group.");
m(4,"Inventory","A sells to B inventory for 500 with a profit of 150, all still in B's stock. What is the unrealised profit?","150",["500","350","0"],"All the goods remain in the group, so the whole 150 is unrealised: inventories and A's net income are both reduced by 150.");
m(4,"Inventory","A sells to B inventory for 500 with a profit of 150; 60% were sold to third parties. What is the unrealised profit?","60",["90","150","300"],"150 × 40% remaining = 60.");
m(4,"Inventory","In the case above, what happens to the sales and cost of sales of 500 between A and B?","They are eliminated against each other",["They are kept in the consolidated income statement","Only the sales are eliminated","They are moved to NCI"],"Sales 500 and purchases/COGS 500 are cancelled in consolidation.");
m(4,"Net income","To decrease the net income of A in consolidation, you…","Debit net income in the balance sheet and credit net income in the income statement",["Credit net income in the balance sheet","Debit sales and credit assets","Debit cash"],"Net income of the income statement equals net income in equity; reducing the profit means debiting it in the balance sheet.");
m(4,"Non-current assets","B sells to A three pieces of land at 120,000 each with a profit of 30,000 each. All remain in A. What is the unrealised profit?","90,000",["30,000","360,000","270,000"],"3 × 30,000 = 90,000, deducted from land and from B's net income.");
m(4,"Non-current assets","Same land case, but A has sold 1 of the 3 lands to third parties. What is the unrealised profit?","60,000",["90,000","30,000","120,000"],"Only 2 pieces remain in the group: 2 × 30,000 = 60,000.");
m(4,"Non-current assets","B sells machinery to A on 1 Jan X1 for 120,000 with a profit of 60,000. Remaining life: 5 years. What is the net adjustment to B's net income at 31 Dec X1?","48,000",["60,000","12,000","72,000"],"Unrealised profit 60,000 − excess depreciation 60,000 / 5 = 12,000 → 48,000. Machinery −60,000, accumulated depreciation +12,000.");
m(4,"Non-current assets","In the machinery case, what is the excess depreciation?","12,000",["60,000","24,000","6,000"],"The overstated value 60,000 over 5 years = 12,000 per year.");
m(4,"Non-current assets","Why do we adjust depreciation when eliminating a profit on a depreciable asset?","The buyer depreciates the overstated cost, so its depreciation is too high",["The seller has not depreciated the asset","The asset has no useful life","Depreciation is a group transaction"],"Depreciation on the unrealised profit is also overstated and must be reversed.");
m(4,"Balances","What happens to intragroup balances such as loans and trade receivables / payables?","They are eliminated against each other",["They are added together","They are kept only in the parent","They are written off against equity"],"Otherwise assets and liabilities of the group are overstated.");
m(4,"Balances","Do the elimination of intragroup balances change group profit?","No, they eliminate assets and liabilities (and possibly revenues and expenses)",["Yes, they always reduce profit","Yes, they always increase profit","They change NCI only"],"These adjustments do not generate profit/loss corrections.");
m(4,"Balances","What can happen if intragroup balances do not agree?","The adjustments must first be included in the financial statements of the parent",["They are ignored","They are carried to NCI","They are cancelled automatically"],"Balances can only be eliminated if they are in agreement.");
m(4,"Loan","A lends 350,000 to B on 1 Mar X1 at 5% with interest paid 30 May, 31 Aug, 30 Nov and 28 Feb. What interest is accrued at 31 Dec X1 (1 month)?","1,458.33",["14,583.33","17,500","2,916.67"],"350,000 × 5% / 12 = 1,458.33. Eliminate interest receivable (A) against interest payable (B).");
m(4,"Loan","In the same loan, what interest revenue/expense for 1 Mar to 31 Dec X1 (10 months) is eliminated?","14,583.33",["17,500","1,458.33","8,750"],"350,000 × 5% × 10 / 12 = 14,583.33. Interest revenue (A) against interest expense (B).");
m(4,"NCI","An adjustment that affects the post-acquisition retained earnings of the subsidiary also affects…","The calculation of NCI and group reserves",["Goodwill","The parent's share capital","The acquisition price"],"NCI and group reserves must be updated, because the subsidiary's equity changes.");
m(4,"Upstream","Which transaction reduces the equity of the subsidiary (and thus NCI)?","The subsidiary sells land to the parent at a profit that remains unrealised",["The parent sells inventory to the subsidiary","The parent lends money to the subsidiary","The parent receives interest from the subsidiary"],"Case 1 adjustment a): B (the subsidiary) sold land, so B's retained earnings fall by the profit, affecting NCI.");
m(4,"Case 1","B sold land to A for 600,000 (cost 500,000), still in A at year end. What is the adjustment?","Reduce land by 100,000 and retained earnings of B by 100,000",["Reduce land by 600,000","Reduce retained earnings of A by 100,000","Increase land by 100,000"],"Unrealised profit = 100,000, taken out of PPE and of B's retained earnings.");
m(4,"Case 1","A sold inventory to B for 26,000 (cost 22,000); 50% was sold on, the rest is in B's stock. What is the adjustment?","Reduce inventories and retained earnings of A by 2,000",["Reduce inventories by 4,000","Reduce retained earnings of B by 2,000","No adjustment"],"Profit 4,000 × 50% remaining = 2,000, the seller is A.");
m(4,"Case 1","A gave B a 200,000 loan on 31 Dec X5. What is the adjustment?","Eliminate the loan asset (A) against the loan liability (B)",["Reduce retained earnings by 200,000","Reduce cash by 200,000","Increase goodwill by 200,000"],"Intragroup balance: 200,000 on both sides, with no profit effect.");
m(4,"Case 2","Push supplied goods (cost 100) to Shove for 125, not yet paid; 4/5 remain in Shove's inventory. What is the unrealised profit (thousand €)?","20",["25","5","100"],"Profit 25 × 4/5 = 20. The 125 receivable/payable is also eliminated.");
m(4,"Case 2","In the previous case, what is the receivable/payable adjustment?","Credit trade receivables (P) 125 and debit trade payables (S) 125",["Credit trade receivables 20","Debit inventories 125","Credit retained earnings 125"],"Intragroup trade balance of 125.");
m(4,"Case 2","On 1 Sep X2 Push supplied machinery to Shove for 198 (profit for Push 18, remaining life 10 years). What is the excess depreciation at 31 Aug X3?","1.8",["18","19.8","0.9"],"Overstatement 18 / 10 = 1.8 a year (198/10 − 180/10).");
m(4,"Case 2","In the machinery case, what is the net reduction in Push's retained earnings?","16.2",["18","1.8","19.8"],"18 unrealised profit − 1.8 excess depreciation = 16.2.");

vf(4,"Unrealised profit on inventories is eliminated only for the goods still held by the group at year end.",true,"Goods sold to third parties have realised their profit.");
vf(4,"Sales and purchases between group companies are eliminated in consolidation.",true,"They cancel each other against COGS.");
vf(4,"Eliminating an intragroup loan changes consolidated profit.",false,"It cancels the asset and the liability, with no profit effect (interest revenue and expense cancel each other).");
vf(4,"Group profit on an internal sale of an asset is recognised in full as soon as the sale happens.",false,"The profit is unrealised until the asset leaves the group.");
vf(4,"When the subsidiary sells to the parent at a profit, the adjustment affects the equity of the subsidiary and therefore NCI.",true,"See Case 1, adjustment a).");
vf(4,"Excess depreciation on an internally transferred asset increases the unrealised profit to be eliminated.",false,"It reduces the net adjustment: unrealised profit minus excess depreciation.");
vf(4,"Intragroup balances can only be eliminated if they are in agreement.",true,"Otherwise the parent must first adjust its statements.");

ty(4,"B sells to A inventory with a profit of 150; 60% are sold to third parties. What is the unrealised profit?",["60"],"150 × 40% = 60.");
ty(4,"Land: B sells 3 pieces with a profit of 30,000 each; A resells one. What is the unrealised profit?",["60000","60,000"],"2 × 30,000.");
ty(4,"Machinery: unrealised profit 60,000, remaining life 5 years. What is the annual excess depreciation?",["12000","12,000"],"60,000 / 5.");
ty(4,"Machinery: what is the net adjustment to net income after one year (profit 60,000, life 5 years)?",["48000","48,000"],"60,000 − 12,000.");
ty(4,"Loan 350,000 at 5%: what is the interest for one month?",["1458.33","1458,33","1,458.33"],"350,000 × 5% / 12.");
ty(4,"Loan 350,000 at 5%: what is the interest for 10 months?",["14583.33","14583,33","14,583.33"],"350,000 × 5% × 10 / 12.");
ty(4,"Case 1: unrealised profit on the land sold by B to A (selling price 600,000, cost 500,000)?",["100000","100,000"],"600,000 − 500,000.");
ty(4,"Case 1: unrealised profit in the inventory (sold at 26,000, cost 22,000, 50% still in stock)?",["2000","2,000"],"4,000 × 50%.");
ty(4,"Case 2: unrealised profit in the goods (sold at 125, cost 100, 4/5 left in stock)?",["20"],"25 × 4/5.");
ty(4,"Case 2: net unrealised profit on the machinery after depreciation adjustment (profit 18, life 10 years, 1 year elapsed)?",["16.2","16,2"],"18 − 1.8.");

// ===================== 5. Equity method =====================
m(5,"Principle","What is the key difference between full consolidation and the equity method?","In the equity method the associate's assets and liabilities are not added line by line",["The equity method adds the associate's balance sheet at 50%","The equity method eliminates the investment","The equity method only applies to simple investments"],"With the equity method no addition takes place: only the investment value is updated.");
m(5,"Principle","What happens to the investment in an associate in the consolidated balance sheet?","It is kept and updated by the group's share of post-acquisition earnings",["It is replaced by the net assets of the associate","It is eliminated against equity","It is written off"],"The investment is “tipped up” each year.");
m(5,"Principle","How are treatments of subsidiaries and associates related?","They are effectively opposite: the investment in a subsidiary is replaced, the investment in an associate is carried",["They are identical","Both replace the investment by net assets","Both ignore the investment"],"Subsidiary: investment replaced by net assets. Associate: investment carried forward.");
m(5,"Principle","The equity method initially recognises the investment…","At cost",["At fair value of the associate's assets","At nominal value","At zero"],"Then adjusted for post-acquisition changes in the investor's share of the investee's net assets.");
m(5,"Principle","What reduces the carrying amount of an associate in the equity method?","Impairment losses",["Dividends of the parent","Goodwill amortisation","The profit of the parent"],"The investment is increased by post-acquisition earnings and reduced by impairment.");
m(5,"Reasons","Which is a reason to acquire an interest in an associate?","Ensuring the supply of a vital raw material",["Reducing its own taxes","Consolidating the associate's debt","Eliminating competitors completely"],"Other reasons: securing a stream of dividends and gaining management expertise.");
m(5,"Reasons","Which is NOT a reason listed in the course for acquiring an associate?","Obtaining full control over its assets",["Gaining management expertise","Securing a return through dividends","Ensuring supply of a vital raw material"],"Full control would make it a subsidiary.");
m(5,"Goodwill","How is goodwill of an associate calculated?","Price paid − investor's % × equity of the associate at acquisition",["Price paid − 100% of the associate's equity","Price paid × % owned","Equity of the associate now − equity at acquisition"],"Same procedure as in full consolidation.");
m(5,"Goodwill","Where is the goodwill of an associate disclosed?","In the notes; it stays inside the equity-method investment",["As a separate asset","In NCI","In the income statement"],"It is carried forward in “Equity investment in A” in the balance sheet and mentioned in the notes.");
m(5,"Example","P buys 40% of A for 340,000 when A has capital 300,000 and retained earnings 500,000. What is the goodwill of the associate?","20,000",["320,000","340,000","120,000"],"800,000 × 0.4 = 320,000; 340,000 − 320,000 = 20,000.");
m(5,"Example","In that example, A's retained earnings are 800,000 at 31.12.X5. What is the group's share of the post-acquisition profit?","120,000",["320,000","300,000","340,000"],"(800,000 − 500,000) × 0.4 = 120,000.");
m(5,"Example","In the same example, what is the equity-method value of the investment in A?","460,000",["340,000","320,000","480,000"],"340,000 + 120,000 = 460,000 (includes the 20,000 goodwill).");
m(5,"Example","In the same example, which equity item is credited for the associate?","Retained earnings group / consolidated reserves associate: 120,000",["NCI: 120,000","Share capital: 340,000","Goodwill: 20,000"],"The investment of 340,000 is replaced by the equity investment of 460,000, with 120,000 credited to group reserves.");
m(5,"Case 1","A buys 25% of C for 65,000 when C's equity is capital 100,000 and retained earnings 50,000. What is the goodwill of the associate?","27,500",["37,500","65,000","35,000"],"150,000 × 0.25 = 37,500; 65,000 − 37,500 = 27,500.");
m(5,"Case 1","At 31.12.X5 C's retained earnings are 190,000. What is the group's share of the increase?","35,000",["47,500","140,000","100,000"],"(190,000 − 50,000) × 0.25 = 35,000.");
m(5,"Case 1","In Case 1, what is the equity investment in C at 31.12.X5?","100,000",["65,000","72,500","290,000"],"65,000 + 35,000 = 100,000.");
m(5,"Note","Why do we need at least one subsidiary to apply the equity method?","Because a group (and thus consolidation) only exists with a parent and at least one subsidiary",["Because associates do not have an equity","Because the equity method is applied by subsidiaries","Because associates must be below 20%"],"“We always need at least one subsidiary to be able to form a group and, therefore, consolidate.”");
m(5,"Note","Which items are in the consolidated balance sheet when P has a subsidiary S and an associate A?","Investment in A updated, plus equity of P, NCI of S, consolidated reserves and % profit from A",["Assets and liabilities of A added in full","Investment in S kept at cost","Only P's equity"],"A's assets and liabilities are not added.");

vf(5,"In the equity method the assets and liabilities of the associate are added to the group's balance sheet.",false,"They are not added; only the updated investment is shown.");
vf(5,"An investor with 40% of a company usually has an associate under IFRS.",true,"20% to 50% usually means significant influence.");
vf(5,"Goodwill of an associate is shown on a separate line in the consolidated balance sheet.",false,"It is included in the equity investment and disclosed in the notes.");
vf(5,"Joint ventures are accounted for with the equity method.",true,"Yes, as are associates.");
vf(5,"The investment in an associate is increased each year by the investor's share of post-acquisition retained earnings.",true,"“Tipped up” by the share of new retained earnings.");
vf(5,"Participation in policy-making processes can evidence significant influence.",true,"Along with board representation, material transactions, managerial interchange and technical information.");
vf(5,"Representation on the board is the weakest evidence of significant influence.",false,"It is the strongest evidence.");

ty(5,"P buys 40% of A for 340,000; A's equity at acquisition is 800,000. What is the goodwill?",["20000","20,000"],"340,000 − 320,000.");
ty(5,"Increase of A's retained earnings 500,000 → 800,000 with 40% owned: what is the group share?",["120000","120,000"],"300,000 × 0.4.");
ty(5,"P buys 40% of A for 340,000 (goodwill 20,000); A's retained earnings rise by 300,000. What is the equity-method value of the investment?",["460000","460,000"],"340,000 + 120,000.");
ty(5,"A buys 25% of C for 65,000; C's equity is 150,000. What is the goodwill of the associate?",["27500","27,500"],"65,000 − 37,500.");
ty(5,"C's retained earnings rise from 50,000 to 190,000; A owns 25%. What is the group's share of that increase?",["35000","35,000"],"140,000 × 0.25.");
ty(5,"Which method is used to consolidate associates and joint ventures?",["equity method","equity"],"The equity method.",["full consolidation"]);

// ===================== 6. Worked cases =====================
m(6,"Case 1","A buys 80% of B for 450,000. B's equity: capital 300,000, retained earnings 100,000, property fair value +20,000. What is the goodwill?","114,000",["336,000","50,000","130,000"],"420,000 × 0.8 = 336,000; 450,000 − 336,000 = 114,000.");
m(6,"Case 1","In Case 1, B's equity at 31.12.X5 is capital 300,000 + retained earnings 174,000, plus the 20,000 fair value uplift, less the 100,000 land profit eliminated. What is the NCI?","78,800",["84,000","98,600","120,000"],"(300,000 + 174,000 + 20,000 − 100,000) × 0.2 = 78,800.");
m(6,"Case 1","In Case 1, what are the consolidated reserves for the subsidiary?","−20,800",["+20,800","−26,000","−104,000"],"Equity B: 394,000 now vs 420,000 at acquisition → −26,000 × 0.8 = −20,800.");
m(6,"Case 1","Why are the inventory and loan adjustments NOT used in the NCI calculation of Case 1?","They do not affect the equity of B",["They are immaterial","They only affect goodwill","They affect only the cash"],"The inventory profit is A's (the parent), and the loan has no profit effect, so B's equity is unchanged.");
m(6,"Case 1","In Case 1, what are the consolidated total assets?","2,813,000",["3,396,000","2,620,000","2,913,000"],"After eliminating investments, loans, unrealised profits, adding goodwill (114,000), FV (20,000) and the equity-method update.");
m(6,"Case 1","In Case 1, the consolidated reserves for the associate C amount to…","35,000",["25,000","65,000","27,500"],"(190,000 − 50,000) × 25% = 35,000.");
m(6,"Case 2","Push bought 75% (150,000 of 200,000 shares) of Shove for 295; Shove had retained earnings 60 and PPE fair value +100 at acquisition. What is the goodwill (thousand €)?","25",["270","70","110"],"(200 + 60 + 100) × 0.75 = 270; 295 − 270 = 25.");
m(6,"Case 2","In Case 2, Shove's equity at 31.08.X3: capital 200, retained earnings 140, FV +100. What is the NCI?","110",["90","60","150"],"440 × 0.25 = 110.");
m(6,"Case 2","In Case 2, what are the consolidated reserves from the subsidiary?","60",["80","110","25"],"(440 − 360) × 0.75 = 60.");
m(6,"Case 2","In Case 2, why do the intragroup adjustments not change Shove's equity?","Push (the parent) is the seller in all of them",["Because they are immaterial","Because the loan is repaid","Because Shove has no retained earnings"],"All unrealised profits (goods, machinery) belong to Push.");
m(6,"Case 2","In Case 2, how much of the loan remains in consolidated loans (assets)? Push's loans are 180, of which 130 are to Shove.","50",["130","180","0"],"180 − 130 = 50 external loans.");
m(6,"Case 2","In Case 2, what are the consolidated total assets (thousand €)?","1,533.8",["1,995","1,315","1,553.8"],"1,995 − 130 loan − 295 investment − 125 receivable − 20 inventory + 100 FV − 18 + 1.8 + 25 goodwill = 1,533.8.");
m(6,"Case 2","In Case 2, what is the consolidated retained earnings (thousand €)?","228.8",["405","265","285"],"405 − 20 − 16.2 − 140 (eliminated Shove) = 228.8.");

vf(6,"In Case 1 the associate C is consolidated using the equity method.",true,"A owns 25%, between 20% and 50%.");
vf(6,"In Case 2, Shove is a subsidiary because Push holds 75%.",true,"150,000 of 200,000 shares.");
vf(6,"In Case 1, the unrealised profit on the land reduces both PPE and the retained earnings of B.",true,"100,000 each.");
vf(6,"In Case 2, goodwill is computed on the equity of Shove at 31.08.X3.",false,"Goodwill uses the equity at the acquisition date (1 Sep X1).");
vf(6,"In Case 1, the 25% stake in C appears in the consolidated balance sheet at 100,000.",true,"65,000 + 35,000.");

ty(6,"Case 1: what is the goodwill from the acquisition of B?",["114000","114,000"],"450,000 − 336,000.");
ty(6,"Case 1: what is the NCI at 31.12.X5?",["78800","78,800"],"394,000 × 0.2.");
ty(6,"Case 1: what is the consolidated total assets?",["2813000","2,813,000"],"2,813,000.");
ty(6,"Case 2: what is the goodwill (thousand €)?",["25"],"295 − 270.");
ty(6,"Case 2: what is the NCI (thousand €)?",["110"],"440 × 0.25.");
ty(6,"Case 2: what are the consolidated reserves from the subsidiary (thousand €)?",["60"],"80 × 0.75.");
ty(6,"Case 2: what is the consolidated total assets (thousand €)?",["1533.8","1533,8","1,533.8"],"1,533.8.");

// ===================== Key terms (definition cards and generated questions) =====================
// [part, category, c=concept / p=person, term, definition, accepted variants]
const FACTS=[
[1,"grp","c","Group (IFRS)","A parent and all its subsidiaries"],
[1,"grp","c","Consolidated financial statements","Statements presenting the financial and economic position of a group as if it were a single entity","CFS"],
[1,"grp","c","Separate financial statements","Financial statements corresponding to a single company"],
[1,"grp","c","Subgroup exemption","A parent that is itself a wholly-owned subsidiary does not have to prepare consolidated statements"],
[1,"inv","c","Subsidiary","An entity controlled by another entity (the parent), usually with more than 50% of the voting power"],
[1,"inv","c","Associate","An entity over which the investor has significant influence but not control, usually between 20% and 50% of the votes"],
[1,"inv","c","Joint venture","A contractual arrangement where two or more parties share joint control over an economic activity"],
[1,"inv","c","Simple investment","A stake below 20% of the votes that gives no significant influence and is not consolidated","Trade investment"],
[1,"inv","c","Significant influence","The power to participate in the financial and operating policy decisions of an investee without controlling them"],
[1,"inv","c","Joint control","The contractually agreed sharing of control, where key decisions need the unanimous consent of the parties"],
[2,"fc","c","Full consolidation","Method that adds 100% of the assets, liabilities, income and cash flows of a subsidiary to those of the parent"],
[2,"fc","c","Equity method","Method where the investment is recognised at cost and updated for the investor's share of post-acquisition earnings"],
[2,"fc","c","Goodwill","Excess of the price paid over the parent's share of the subsidiary's equity at acquisition"],
[2,"fc","c","Gain from a bargain purchase","Excess of the parent's share of the subsidiary's equity over the price paid, recognised in profit or loss","Badwill"],
[2,"fc","c","Non-controlling interests (NCI)","Equity in a subsidiary not attributable, directly or indirectly, to the parent","NCI;minority interests"],
[2,"fc","c","Investment-Equity adjustment","The consolidation adjustment that eliminates the parent's investment against the subsidiary's equity"],
[3,"post","c","Consolidated reserves","Parent's share of the change in the subsidiary's equity since acquisition","Group reserves"],
[4,"int","c","Unrealised profit","Profit on an intragroup sale on goods or assets that are still held within the group"],
[4,"int","c","Intragroup balances","Loans, receivables and payables between group companies, eliminated in consolidation"],
[4,"int","c","Excess depreciation","Extra depreciation recorded by the buyer on the unrealised profit of an intragroup asset sale"],
[5,"eq","c","Equity investment","Value of the investment in an associate after adding the investor's share of post-acquisition earnings"],
[5,"eq","c","Goodwill of an associate","Included in the equity-method investment and only disclosed in the notes"]
];

return {id:"compta2",title:"Quiz compta 2",kw:"comptabilité compta consolidation consolidée consolidation financial statements goodwill NCI equity method associate subsidiary filiale analyse financière finance accounting quiz compta 2",subject:"Consolidation of financial statements: groups, full consolidation, internal transactions and equity method",lang:"en",sess:SESS,tags:TAGS,unit:["part","parts","a part"],balance:true,Q,TQ,facts:FACTS};
})();
