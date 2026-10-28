// Study sheet: Financial analysis, consolidation of financial statements. Hand-written from the course slides and cases.
window.SHEETS=window.SHEETS||{};
window.SHEETS.compta2={lang:"en",file:"study-sheet-consolidation",tag:"Study sheet · Financial analysis",
title:"Consolidated<br>financial statements",
sub:"Groups, full consolidation, goodwill and NCI, intragroup transactions and the equity method, with every formula and a worked number for each.",
source:"Slides parts 1 to 4 · Assignments 1 to 5 · Cases 1 and 2 (IFRS)",
intro:"Consolidated statements show a group <b>as if it were one single entity</b>. The whole topic comes down to one question, asked three times: <b>how much of this entity do we control, and what must be cancelled so that nothing is counted twice?</b>",
sections:[
{title:"Groups and types of investment",lead:"The percentage of voting rights decides the accounting method.",blocks:[
 {t:"p",x:"Under IFRS a <b>group</b> is a parent and all its subsidiaries. As soon as a parent owns one subsidiary, it must prepare <b>consolidated financial statements (CFS)</b>. Two exemptions: the parent is itself a wholly-owned subsidiary, or its debt and equity are not traded on a public market."},
 {t:"table",head:["Stake","Relationship","Method"],rows:[
  ["Above 50% of votes (or control by agreement, statutes, board power)","<b>Subsidiary</b> (control)","Full consolidation"],
  ["20% to 50%, significant influence","<b>Associate</b>","Equity method"],
  ["Joint control, unanimous consent on key decisions","<b>Joint venture</b>","Equity method"],
  ["Below 20%, no significant influence","Simple investment (IFRS 9)","No consolidation"]]},
 {t:"ul",items:["<b>Control</b> can exist at or below 50%: a casting vote on the board, or an agreement adding voting rights (45% + 8% = 53%).","Owning more than 50% is not enough if control cannot actually be exercised: that is then only significant influence.","The strongest evidence of significant influence is <b>representation on the board</b>."]}]},
{title:"Goodwill and NCI at acquisition",lead:"Eliminate the investment against the subsidiary’s equity, then see what is left over.",blocks:[
 {t:"dl",items:[
  ["Goodwill","Price paid minus the parent’s share of the <b>fair-valued</b> equity of the subsidiary at the acquisition date. Not amortised: it is tested for impairment."],
  ["Bargain purchase (badwill)","Negative goodwill: recognised as a <b>gain</b> in the consolidated income statement."],
  ["NCI (non-controlling interests)","The share of the subsidiary’s equity not owned by the parent. Shown in equity, on its own line."]]},
 {t:"formula",name:"At the acquisition date",x:"Goodwill = Price − % owned × Equity<sub>S</sub><br>NCI = (100% − % owned) × Equity<sub>S</sub>",note:"Equity<sub>S</sub> = share capital + all reserves, after fair value adjustments"},
 {t:"ex",x:["Parent pays <b>7,200</b> for 80% of S. Equity of S is 5,900.","Group share = 5,900 × 0.8 = 4,720, so goodwill = 7,200 − 4,720 = <b>2,480</b>.","NCI = 5,900 × 0.2 = <b>1,180</b>.","With a fair value adjustment lifting equity to 6,050: goodwill = 7,200 − 4,840 = 2,360 and NCI = 1,210."]},
 {t:"key",items:["100% of the subsidiary’s equity is eliminated, whatever the percentage owned.","If the price is below the group share, the difference is a gain, not goodwill.","Adjustments are made on the consolidation worksheet only: the individual companies’ books do not change."]}]},
{title:"Consolidating after the acquisition",lead:"Goodwill stays put; reserves and NCI move with the subsidiary’s equity.",blocks:[
 {t:"formula",name:"After acquisition",x:"Group reserves = % owned × (Equity<sub>S</sub> now − at acquisition)<br>NCI = (100% − % owned) × Equity<sub>S</sub> now",note:"Goodwill does not change with later changes in the subsidiary’s equity"},
 {t:"ex",x:["Parent owns 75% and paid 2,450 when S had equity of 3,200. Goodwill = 2,450 − 2,400 = <b>50</b>.","S’s equity rises by 700: group reserves +525 (700 × 0.75), NCI = 25% × current equity.","If S’s equity <b>falls</b> (the Planet and Sun case), the group share is negative: 160 vs 180 at 80% gives −16 in group reserves."]},
 {t:"p",x:"A full consolidation <b>adds 100%</b> of the subsidiary’s assets, liabilities, revenues and expenses line by line, even the part financed by NCI. A subsidiary acquired during the year only contributes its <b>post-acquisition</b> income."}]},
{title:"Internal transactions",lead:"What the group does with itself must disappear from the group’s statements.",blocks:[
 {t:"p",x:"Three families must be eliminated: <b>intragroup sales and purchases</b>, <b>intragroup balances</b> (receivables and payables, loans and interest), and <b>unrealised profit</b> on goods or assets still held inside the group."},
 {t:"table",head:["Situation","Adjustment"],rows:[
  ["Sale of goods inside the group","Cancel sales against purchases (COGS). Remove the unrealised profit from inventories and from the seller’s income, in proportion to the goods still held."],
  ["Receivable / payable, loan, interest","Cancel both sides; no profit effect. Interest revenue and expense cancel each other (350,000 at 5% for 10 months = 14,583)."],
  ["Sale of a depreciable asset","Remove the unrealised profit from the asset, then <b>reverse the excess depreciation</b> it generated."]]},
 {t:"formula",name:"Unrealised profit on goods",x:"Unrealised profit = profit × share of goods still in the group",note:"profit 150, 40% still in stock: 150 × 40% = 60"},
 {t:"ex",x:["A machine is sold intragroup with a profit of <b>60,000</b>, depreciated over 5 years.","Depreciation on the overstated value: 60,000 / 5 = <b>12,000</b> a year.","Net adjustment: 60,000 − 12,000 = <b>48,000</b> (machinery −60,000, accumulated depreciation +12,000)."]},
 {t:"key",items:["If the <b>subsidiary</b> is the seller, the unrealised profit also changes NCI and group reserves.","Goods already sold to third parties have realised their profit: nothing to remove.","Balances can only be eliminated if both companies agree on them."]}]},
{title:"The equity method",lead:"Associates and joint ventures: the investment is updated, never consolidated line by line.",blocks:[
 {t:"p",x:"With the equity method, <b>no assets or liabilities of the associate are added</b>. The investment is carried forward in one line, “Equity investment in A”, and “tipped up” each year by the investor’s share of the associate’s post-acquisition earnings (reduced by any impairment)."},
 {t:"formula",name:"Equity investment",x:"Investment = cost + % owned × (Equity<sub>A</sub> now − at acquisition)",note:"Goodwill is computed as for a subsidiary and stays included in the carrying value"},
 {t:"ex",x:["P buys 40% of A for <b>340,000</b>. At acquisition A has capital 300,000 and retained earnings 500,000, so equity is 800,000: goodwill = 340,000 − 0.4 × 800,000 = <b>20,000</b>.","A’s retained earnings reach 800,000 later: post-acquisition profit = (800,000 − 500,000) × 0.4 = <b>120,000</b>, credited to group reserves.","Investment on the balance sheet: 340,000 + 120,000 = <b>460,000</b> (goodwill included)."]},
 {t:"key",items:["Subsidiary: the investment is <b>replaced</b> by net assets. Associate: the investment is <b>carried forward</b> and updated.","A group needs at least one subsidiary to exist, and therefore to consolidate."]}]},
{title:"Worked cases to know",blocks:[
 {t:"table",head:["Case","Key numbers"],rows:[
  ["A / B / C","B: 80% bought for 450,000 with equity 420,000: goodwill = 450,000 − 336,000 = <b>114,000</b>. B’s equity is now 394,000, so group reserves = −26,000 × 0.8 = <b>−20,800</b>. C (25%): equity-method share = (190,000 − 50,000) × 25% = 35,000."],
  ["Push / Shove","Push owns 75% of Shove: (200 + 60 + 100) × 0.75 = 270, so goodwill = 295 − 270 = <b>25</b>. All unrealised profits (goods, machinery) belong to Push."],
  ["Pescanova / Pescamar","Majority ownership without the ability to exercise control gives only <b>significant influence</b> (associate)."]]},
 {t:"key",title:"Exam routine",items:["1. Classify each stake: subsidiary, associate, joint venture or simple investment.","2. Compute goodwill and NCI at the acquisition date.","3. Update reserves and NCI for the post-acquisition change in equity.","4. Eliminate sales, balances and unrealised profit (and excess depreciation).","5. Add the associate’s updated investment, then check that the balance sheet still balances."]}]}
]};
