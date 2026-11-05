// Study sheet: Unit 5, linear regression (SAD course). Hand-written from slides B5; every figure comes from the slides' two examples
// (exam grades vs hours of study, n = 10; homicide rate vs poverty and police rates, n = 14).
window.SHEETS=window.SHEETS||{};
window.SHEETS.regression={lang:"en",file:"study-sheet-linear-regression",tag:"Study sheet · Statistics (SAD)",
title:"Linear<br>regression",
sub:"From the scatter plot to the multiple model: estimate the line, check the assumptions, test it, then use it.",
source:"Slides B5 · Descriptive SLR · Simple linear regression model · Multiple linear regression model",
intro:"Regression answers one question: <b>how does a continuous Y depend on one or more continuous Xs?</b> The same five stages apply every time: <b>specify, estimate, analyse the residuals, verify, use</b>. Skip a stage and the next one means nothing.",
sections:[
{title:"Describing the relationship",lead:"Plot first, then measure.",blocks:[
 {t:"dl",items:[
  ["Dependent variable Y","The variable to explain (endogenous)."],
  ["Independent variable X","Explanatory, explicative variable or regressor."],
  ["Dependence vs interdependence","Linear regression is a dependence model; principal components analysis is an interdependence model."]]},
 {t:"p",x:"The <b>scatter plot</b> comes first: it shows the type of relationship, whether it can be linearised, and outliers or errors. Beware of <b>stratification</b> (women and men pooled together), the data range, and concave or convex fields."},
 {t:"formula",name:"Pearson’s correlation",x:"r = Cov(X,Y) / (s<sub>X</sub>·s<sub>Y</sub>)",note:"−s<sub>X</sub>s<sub>Y</sub> ≤ Cov ≤ s<sub>X</sub>s<sub>Y</sub>, so −1 ≤ r ≤ 1. The covariance alone depends on the scale and the dispersion."},
 {t:"key",items:["r = −1: all points on a decreasing line; r = +1: on an increasing line.","Measuring height in metres instead of centimetres makes the covariance smaller, but not r.","A regression line only makes sense if the scatter plot is roughly linear."]}]},
{title:"The least-squares line",lead:"OLS minimises the sum of squared prediction errors.",blocks:[
 {t:"formula",name:"OLS estimates",x:"b<sub>1</sub> = Cov(X,Y) / s²<sub>X</sub> = r·s<sub>Y</sub>/s<sub>X</sub><br>b<sub>0</sub> = ȳ − b<sub>1</sub>·x̄",note:"The line goes through the point of means (x̄, ȳ)"},
 {t:"ul",items:["<b>b<sub>1</sub></b>: change in the mean of Y per unit of X; its sign gives the direction.","<b>b<sub>0</sub></b>: mean of Y when x = 0, to be interpreted <b>only if 0 is within the observed range of X</b>."]},
 {t:"formula",name:"Decomposition of the variation (slides’ notation)",x:"SST = SSE + SSR<br>R² = SSE / SST",note:"SSE = explained, SSR = residual (careful: not the usual SSR/SSE labels). In SLR, R² = r²."},
 {t:"ex",title:"Worked example · exam grades (n = 10)",x:["<b>Statement.</b> Hours of study X and grade Y: b<sub>1</sub> = 0.398 and R² = 0.862.","<b>Reading.</b> Each extra hour raises the average grade by about 0.398 points; 86.2% of the variation in grades is explained by hours of study.","<b>Correlation.</b> r = +√0.862 = <b>+0.928</b>, positive because b<sub>1</sub> &gt; 0."]},
 {t:"key",items:["0 ≤ R² ≤ 1: R² = 1 is a perfect line, R² = 0 no linear relation.","The descriptive study does not tell you whether the slope differs from 0 in the population: that is the test, later."]}]},
{title:"The SLR model and its assumptions",lead:"Yi = β0 + β1·Xi + εi, with εi ~ N(0, σ²).",blocks:[
 {t:"p",x:"Stages: <b>1 specification, 2 estimation, 3 analysis of residuals, 4 verification, 5 use</b>. The residuals are used to check the assumptions of stage 1."},
 {t:"table",head:["Assumption","Meaning","Graph to check it"],rows:[
  ["<b>Linearity</b>","Y is a linear function of X plus a random error","Residuals vs fit: no pattern around 0"],
  ["<b>Homoscedasticity</b>","Errors centred on 0 with the same variance σ²","Residuals vs fit: similar dispersion everywhere"],
  ["<b>Randomness</b>","Errors independent of x and uncorrelated with each other","Residuals vs order: no runs or waves"],
  ["<b>Normality</b>","Errors N(0, σ²)","Histogram of residuals, Henry’s line (Q-Q plot)"]]},
 {t:"formula",name:"Residual variance",x:"s²<sub>R</sub> = SSR / (n − 2)",note:"n − 2 because two parameters (b<sub>0</sub> and b<sub>1</sub>) are estimated. SPSS’s “Std. Error of the Estimate” is s<sub>R</sub>."},
 {t:"key",items:["A U-shaped curve in residuals vs fit: linearity fails.","Spread narrow on one side and wide on the other: homoscedasticity fails.","Unbiased: E(b<sub>1</sub>) = β<sub>1</sub>. Consistent: its variance tends to 0 as n grows."]}]},
{title:"Verifying and using the SLR model",lead:"Is the relation real in the population, and what can we do with it?",blocks:[
 {t:"formula",name:"Test of the slope",x:"H<sub>0</sub>: β<sub>1</sub> = 0 vs H<sub>1</sub>: β<sub>1</sub> ≠ 0<br>t = b<sub>1</sub> / s<sub>b1</sub> ~ t(n − 2)",note:"Equivalent F-test: F = (SSE/1) / (SSR/(n − 2)) ~ F(1, n − 2), and F = t²"},
 {t:"table",cap:"SLR ANOVA table",head:["Row","Degrees of freedom"],rows:[["Explained (regression)","1"],["Residual","n − 2"],["Total","n − 1"]]},
 {t:"ex",title:"Worked example · exam grades (n = 10)",x:["<b>ANOVA.</b> SSE = 3200.123, SSR = 513.477, SST = 3713.600 (3200.123 + 513.477). Degrees of freedom 1, 8, 9.","<b>Test.</b> t = 7.061 and F = 49.858 (7.061² ≈ 49.86): same p-value, practically 0, so H<sub>0</sub> is rejected: a linear relation exists in the population.","<b>Interval.</b> The 95% CI for β<sub>1</sub> is [0.268; 0.527] grade points per extra hour.","<b>Prediction at 85 hours.</b> ŷ = 44.87. CI for the mean [37.85; 51.89] (width 14.04); prediction interval for one student [25.11; 64.63] (width 39.52). Not valid at 200 hours: the data only cover 30 to 190."]},
 {t:"key",items:["Not rejecting H<sub>0</sub> does not prove β<sub>1</sub> = 0, only that evidence is missing.","The prediction interval for one observation is always wider than the CI for the mean.","Only predict within the range of observed X."]}]},
{title:"Multiple linear regression: model and estimation",lead:"Y = β0 + β1X1 + … + βkXk + ε",blocks:[
 {t:"p",x:"One X gives a line, two Xs a plane, more a <b>hyper-plane</b>. MLR keeps the four SLR assumptions and adds a fifth: <b>no multicollinearity</b> (no perfect linear combination among the regressors)."},
 {t:"formula",name:"Residual variance in MLR",x:"s²<sub>R</sub> = Σe<sub>i</sub>² / (n − (k + 1))",note:"k slopes plus the intercept are estimated"},
 {t:"ex",title:"Worked example · homicide rate (n = 14, k = 2)",x:["<b>Statement.</b> Y = homicide rate, X<sub>1</sub> = poverty rate, X<sub>2</sub> = police rate. Fitted: ŷ = 8.006 + 0.687·Poverty − 0.185·Police.","<b>Residual df</b> = 14 − 3 = <b>11</b>; s<sub>R</sub> = 17.437, s²<sub>R</sub> = 304.038.","<b>Reading b<sub>1</sub></b>: +1 poverty unit raises the mean homicide rate by 0.687, <b>police rate held constant</b>; +10 units gives +6.87. <b>Reading b<sub>2</sub></b>: +20 police units gives 20 × (−0.185) = −3.7.","<b>R²</b> = 0.648: 64.8% of the variation in the homicide rate is explained by the two variables jointly. b<sub>0</sub> = 8.006 means nothing here (zero is outside both ranges)."]},
 {t:"key",items:["Each slope is a partial effect: the others are held fixed.","The intercept is only meaningful if zero is within the range of every regressor."]}]},
{title:"MLR: checking and testing",lead:"Residual plots as in SLR, plus multicollinearity and two kinds of test.",blocks:[
 {t:"formula",name:"Multicollinearity",x:"Tolerance(X<sub>i</sub>) = 1 − R²<sub>i</sub><br>VIF(X<sub>i</sub>) = 1 / Tolerance(X<sub>i</sub>)",note:"R²ᵢ: regression of Xᵢ on the other regressors. Tolerance from 1 (none) to 0 (perfect); VIF from 1 upward, no upper limit."},
 {t:"ul",items:["Desirable tolerance: ideally 1, generally above 0.4 (many accept above 0.1). A tolerance of 0.05 is a serious problem.","With two regressors, tolerance = 1 − r²: poverty and police (r = .360) give 1 − .1296 = <b>.870</b>, VIF = 1.149. No problem."]},
 {t:"table",head:["Test","Hypotheses","Statistic"],rows:[
  ["<b>Global</b> (ANOVA)","H<sub>0</sub>: β<sub>1</sub> = … = β<sub>k</sub> = 0 vs H<sub>1</sub>: at least one β<sub>i</sub> ≠ 0","F = S²<sub>Explained</sub>/S²<sub>Residual</sub> ~ F(k, n − k − 1)"],
  ["<b>Individual</b>","H<sub>0</sub>: β<sub>i</sub> = 0 vs H<sub>1</sub>: β<sub>i</sub> ≠ 0","t = b<sub>i</sub> / s<sub>bi</sub>"]]},
 {t:"ex",title:"Worked example · homicide rate",x:["<b>Global.</b> F = 3074.256 / 304.038 = <b>10.111</b> with (2, 11) df, p = 0.003: reject H<sub>0</sub>. Sums of squares 6148.512 + 3344.417 = 9492.929.","<b>Poverty.</b> t = 4.444, p &lt; .001: significant. <b>Police.</b> t = −2.242, p = 0.047: significant at 5% but <b>not at 1%</b>. The sign of t is the sign of the coefficient.","<b>Constant.</b> t = 0.404, p = .694: not different from 0."]},
 {t:"key",items:["A significant global test does not make every coefficient significant.","A 95% CI that excludes 0 means significant at 5%: poverty [0.347; 1.028], police [−0.367; −0.003]; the constant [−35.567; 51.580] contains 0."]}]},
{title:"Using the MLR model and choosing variables",lead:"Compare effects, predict, and keep the model simple.",blocks:[
 {t:"p",x:"Raw coefficients cannot be compared when variables have different scales. Use <b>standardised coefficients</b>: the larger the absolute value, the greater the impact. Poverty (.853) beats police (−.430)."},
 {t:"ex",title:"Worked example · prediction",x:["Poverty rate 150 and police rate 100: ŷ = <b>92.61</b>. CI for the mean [69.91; 115.31]; prediction interval for one state [48.02; 137.20].","A poverty rate of 300 is outside the sampled range (73 to 207): do not predict."]},
 {t:"formula",name:"Adjusted R²",x:"R²<sub>adj</sub> = 1 − (n − 1)/(n − (k + 1)) · (1 − R²)",note:"R² always rises when a variable is added; the adjusted R² penalises new regressors"},
 {t:"ex",title:"Worked example · model comparison",x:["Poverty only: R² = .487, adjusted R² = .444, SE = 20.151.","Poverty and police: R² = .648, adjusted R² = .584, SE = 17.437.","The second model is better: higher adjusted R² and lower standard error."]},
 {t:"table",head:["Method","Idea","Drawback"],rows:[
  ["<b>Enter</b>","All predictors, no elimination (clear theory)","Keeps irrelevant predictors"],
  ["<b>Forward</b>","Start empty, add significant ones (control)","May miss variables relevant only with others"],
  ["<b>Backward</b>","Start full, remove the least important (control)","May keep redundant variables"],
  ["<b>Stepwise</b>","Mix of both (automation)","Unstable with multicollinearity or small samples"]]},
 {t:"key",items:["Good variable selection improves accuracy, avoids overfitting and keeps the model readable.","Calculation practice: SSE = SST − SSR, F = (n − 2)R²/(1 − R²) in SLR, VIF = 1/Tolerance."]}]}
]};
