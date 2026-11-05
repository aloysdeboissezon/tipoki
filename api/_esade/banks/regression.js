// Built-in bank: Unit 5, Linear regression (English, like the course slides). SAD course at ESADE.
// Sources: slides B5 "Descriptive SLR", "Simple linear regression model" and "Multiple linear regression model".
// Every question comes from those slides. Notation follows the slides: SSE = explained sum of squares, SSR = residual sum of squares, SST = total.
// Calculation questions are computed from the numbers printed in their own statement (see tools/check-regression.py, which recomputes them independently).
// Static and deterministic (no randomness), so every device builds the same Q/TQ arrays for multiplayer.
// Difficulty d: 1 = easy (definitions), 2 = medium, 3 = hard (calculation / several ideas).
window.BANK_REGRESSION=(function(){
const SESS={1:"Intro & descriptive SLR",2:"SLR model: assumptions & residuals",3:"SLR: verification & use",4:"MLR: specification & estimation",5:"MLR: assumptions & verification",6:"MLR: use & model selection",7:"Calculation practice"};
const TAGS={1:"Descriptive",2:"SLR model",3:"SLR tests & use",4:"MLR estimation",5:"MLR checks",6:"MLR use",7:"Calculations"};
const Q=[],TQ=[];
// MCQ: first option is the right one (shuffled on screen)
const m=(s,q,ok,wr,e,d)=>Q.push({s,t:"",q,o:[ok,...wr],a:0,e,d:d||1});
const vf=(s,q,v,e,d)=>Q.push({s,t:"True or false",q,o:v?["True","False"]:["False","True"],a:0,e,tf:true,d:d||1});
const ty=(s,q,a,e,d)=>TQ.push({s,q,a,e,d:d||2});
const num=(x,dp)=>String(+x.toFixed(dp===undefined?2:dp));

// =====================================================================
// 1. Introduction & descriptive SLR (5.0, 5.1)
// =====================================================================
m(1,"What is a statistical model, according to the slides?","A set of assumptions that enable us to simplify reality",["An exact copy of reality, with every detail","A list of all the observations in the sample","A graph that shows the raw data"],"Reality is complex, so we build models: sets of assumptions that simplify it and ease its study.",1);
m(1,"Which of these is given as an example of an interdependence model?","Principal components analysis",["Simple linear regression","Multiple linear regression","Regression with a hyper-plane"],"The slides contrast dependence models (linear regression) with interdependence models (principal components analysis).",1);
m(1,"Which of these is given as an example of a dependence model?","Linear regression",["Principal components analysis","A scatter plot","A histogram"],"Dependence models: linear regression. Interdependence models: principal components analysis.",1);
m(1,"Two variables are statistically independent when…","knowing the value of one gives no information about the distribution of the other",["they are measured in the same units","they have the same mean","they are both quantitative"],"Independence: the value of one variable tells us nothing about the distribution of the other.",1);
m(1,"What is the purpose of regression analysis?","To establish the dependence of a continuous variable Y on one or more continuous independent variables",["To compare the means of two groups","To reduce many variables to a few components","To classify observations into categories"],"Regression studies the dependence of a continuous Y on continuous independent variable(s): one in simple regression, two or more in multiple regression.",1);
m(1,"What distinguishes multiple regression from simple regression?","It has two or more continuous independent variables",["It has two or more dependent variables","Its dependent variable is categorical","It does not use a straight line or a hyper-plane"],"Simple regression: one independent variable. Multiple regression: two or more.",1);
m(1,"When the dependence of Y on X is expressed as a straight line (simple dependence) or as a hyper-plane (multiple dependence), we speak of…","linear regression",["interdependence analysis","principal components analysis","a scatter plot"],"A straight line (simple) or a hyper-plane (multiple) is a linear regression.",1);
m(1,"Which of these terms designates the dependent variable Y?","Endogenous variable",["Explanatory variable","Regressor","Explicative variable"],"Y is the dependent (endogenous) variable we want to explain. X is independent, explanatory, explicative; the Xs are the regressors.",1);
m(1,"Which of these terms designates an independent variable X?","Regressor",["Endogenous variable","Dependent variable","Response variable only"],"The slides list: independent, explanatory, explicative variable and regressor for X; dependent or endogenous for Y.",1);
m(1,"Which graph is the first tool to study the relationship between two quantitative variables?","The scatter plot (bivariate graph)",["A pie chart","A histogram of Y alone","A bar chart of the means"],"The descriptive study starts with the scatter plot: relationship, type, linearisation, outliers or errors.",1);
m(1,"A scatter plot is used to detect…","the type of relationship and the presence of anomalies or errors",["the p-value of the slope","the VIF of each variable","the degrees of freedom of the ANOVA table"],"The scatter plot shows the type of relationship (linear or not), whether it can be linearised, and outliers or errors.",1);
m(1,"Which precautions does the slide list when reading a scatter plot?","Stratification, data range, and concave or convex fields",["Tolerance, VIF and the F-ratio","Only the sign of the correlation","Only the sample size"],"Precautions: stratification (e.g. women and men plotted together), data range, concave and convex fields.",2);
m(1,"In the height and weight example (women vs men), what does the precaution 'stratification' warn about?","Pooling distinct groups can distort the relationship, so groups should be looked at separately",["Groups must always be merged to get a bigger sample","Strata always raise R² automatically","Weight must always be the independent variable"],"Mixing groups (women and men) can hide or distort the pattern of each group.",2);
m(1,"What does the magnitude of the covariance depend on?","The measurement scale and the dispersion of the variables",["Only on the sample size","Only on the sign of the relationship","Nothing: it is always between −1 and 1"],"Covariance depends on the scale of measurement and on the dispersion of the variables, which makes it hard to interpret.",1);
m(1,"Heights are measured in metres instead of centimetres. For the same data, the covariance between height and weight will be…","smaller",["larger","identical","negative"],"Metres are 100 times smaller than centimetres, so the covariance is smaller (the slide: 'if we measure in metres, the covariance will be less than in centimetres').",2);
m(1,"For the same degree of linear relationship, the covariance will be smaller the…","lesser the dispersion of the variables",["greater the dispersion of the variables","greater the sample size","greater the number of outliers"],"Smaller dispersion (smaller standard deviations) gives a smaller covariance for the same degree of linear relationship.",2);
m(1,"Which inequality holds for the covariance?","−sX·sY ≤ Cov(X,Y) ≤ sX·sY",["0 ≤ Cov(X,Y) ≤ 1","−1 ≤ Cov(X,Y) ≤ 1","−sX/sY ≤ Cov(X,Y) ≤ sX/sY"],"Dividing this inequality by sX·sY gives −1 ≤ r ≤ 1, Pearson's coefficient.",2);
m(1,"Pearson's linear correlation coefficient r is obtained by…","dividing the covariance by the product of the standard deviations",["multiplying the covariance by the product of the standard deviations","dividing the covariance by the sum of the variances","dividing sX by sY"],"r = Cov(X,Y) / (sX·sY).",1);
m(1,"Between which values does Pearson's coefficient r lie?","−1 and 1",["0 and 1","−sX·sY and sX·sY","0 and 100"],"−sX·sY ≤ Cov ≤ sX·sY, so −1 ≤ r ≤ 1.",1);
m(1,"What does r = −1 mean?","A perfect negative linear relationship (Cov = −sX·sY)",["No linear relationship","A perfect positive linear relationship","Y is independent of X"],"r = −1 means all the points lie on a decreasing straight line; the covariance reaches its lower bound −sX·sY.",2);
m(1,"What does the OLS (ordinary least squares) method minimise?","The sum of the squared prediction errors, Σ(yi − ŷi)²",["The sum of the absolute errors","The largest single error","The sum of the errors without squaring"],"OLS chooses the line that minimises Σ(yi − ŷi)² = Σei².",1);
m(1,"The OLS slope b1 equals…","Cov(X,Y)/s²X, that is r·sY/sX",["r·sX/sY","Cov(X,Y)/s²Y","s²X/Cov(X,Y)"],"b1 = sXY/s²X = r·(sY/sX).",2);
m(1,"The OLS intercept b0 equals…","ȳ − b1·x̄",["x̄ − b1·ȳ","ȳ + b1·x̄","ȳ / (b1·x̄)"],"The line passes through the point of means (x̄, ȳ), so b0 = ȳ − b1·x̄.",1);
m(1,"How is b0 interpreted?","The average value of Y (ŷ) when x = 0, only if x = 0 is within the range of the observed values of X",["The change in Y when X increases by one unit","The correlation between X and Y","The proportion of variation explained"],"b0 is the average Y when x = 0; it only makes sense if 0 lies in the observed range of X.",1);
m(1,"How is b1 interpreted?","The change in the average value of Y when X changes by one unit",["The average value of Y when X = 0","The proportion of Y's variation explained by X","The standard deviation of the residuals"],"b1 is the slope: the change in the mean of Y per unit of X.",1);
m(1,"In the slides, what does SSE denote in the decomposition of the total variation?","The explained sum of squares, Σ(ŷi − ȳ)²",["The residual sum of squares, Σ(yi − ŷi)²","The total sum of squares, Σ(yi − ȳ)²","The mean square error"],"Slides' notation: SST (total) = SSE (explained) + SSR (residual).",2);
m(1,"In the slides, what does SSR denote?","The residual sum of squares, Σ(yi − ŷi)²",["The explained sum of squares, Σ(ŷi − ȳ)²","The total sum of squares, Σ(yi − ȳ)²","The regression coefficient"],"Careful with the notation: in these slides SSR is the residual SS and SSE the explained SS.",2);
m(1,"Which decomposition of the total variation is correct in the slides' notation?","SST = SSE + SSR",["SSE = SST + SSR","SSR = SST + SSE","SST = SSE × SSR"],"Total = explained (SSE) + residual (SSR).",1);
m(1,"In the slides, the total sum of squares SST equals…","Σ(yi − ȳ)²",["Σ(ŷi − ȳ)²","Σ(yi − ŷi)²","Σ(xi − x̄)²"],"SST measures the total variation of Y around its mean.",1);
m(1,"The coefficient of determination R² is…","SSE / SST, the proportion of the variation of Y explained by the variation of X",["SSR / SST, the proportion of unexplained variation","SSE / SSR","SST / SSE"],"R² = explained SS / total SS. In the slides' notation that is SSE/SST.",1);
m(1,"Between which values does R² lie in simple regression?","0 and 1",["−1 and 1","0 and 100","−∞ and +∞"],"R² is a proportion, so it always lies between 0 and 1.",1);
m(1,"If R² = 1 in a simple regression…","100% of the variation of Y is explained by the variation of X (perfect linear relationship)",["there is no linear relationship","X is independent of Y","the slope is necessarily 1"],"R² = 1: all points are on the line.",1);
m(1,"If R² = 0 in a simple regression…","there is no linear relationship: the variation of Y is not explained by X",["there is a perfect linear relationship","the slope must be exactly 1","the intercept must be 0"],"R² = 0: the value of Y does not depend (linearly) on X.",1);
m(1,"In simple linear regression, how are R² and r related?","R² = r²",["R² = r","R² = 1/r","R² = √r"],"The summary slide states R² = r²xy.",1);
vf(1,"R² can be negative.",false,"R² is a proportion of variation (explained SS over total SS), so 0 ≤ R² ≤ 1.",1);
vf(1,"A regression line reflects the linear pattern only if the scatter plot is roughly linear, so the scatter plot must be checked first.",true,"The descriptive study begins by asking whether the relationship exists and follows a linear pattern.",1);
m(1,"In the exam-grade example, R² = 0.862. What does that mean?","86.2% of the variation in grades is explained by the variation in hours of study",["Grades rise by 86.2 points for each hour","86.2% of students pass the exam","The correlation between hours and grade is 0.862"],"R² is the proportion of Y's variation explained by X. (The correlation is r = 0.928.)",2);
m(1,"In the exam-grade example, b1 = 0.398 is positive and R² = 0.862. What is Pearson's r between hours and grade?","+0.928",["−0.928","+0.862","+0.743"],"r = ±√R² with the sign of b1: √0.862 ≈ 0.928, positive because b1 > 0 (it is the R = .928 in the SPSS summary).",2);
m(1,"Which question is NOT answered by the descriptive SLR study?","Is the population slope significantly different from zero (hypothesis test)?",["Is there a relationship between X and Y?","How can we measure the degree of this relation?","Is the line obtained a good predictor?"],"The descriptive study asks four questions (relationship, degree, which line, goodness of prediction). The hypothesis test comes later, in the SLR model (verification).",2);

// =====================================================================
// 2. SLR model: specification, assumptions & residual diagnostics (5.2)
// =====================================================================
m(2,"What is the correct order of the stages in statistical modelling?","Specification, estimation, analysis of residuals, verification of the model, use of the model",["Estimation, specification, verification, analysis of residuals, use","Specification, verification, estimation, use, analysis of residuals","Use of the model, specification, estimation, residuals, verification"],"The five stages: 1 Specification, 2 Estimation, 3 Analysis of residuals, 4 Verification of the model, 5 Use of the model.",1);
m(2,"What is done in the 'analysis of residuals' stage?","The assumptions specified in the first stage are checked",["The parameters are estimated","Predictions are made for new observations","The slope is tested with an F-test"],"Analysis of residuals compares the data with the assumptions specified in Point 1.",1);
m(2,"What is done in the 'verification of the model' stage?","A hypothesis test is used to check the defined equation (linear relationship)",["The graphs of the residuals are drawn","The equation and assumptions are written","Predictions are computed"],"Verification: hypothesis test on the equation (is the slope zero or not?).",1);
m(2,"What is the population equation of the simple linear regression model?","Yi = β0 + β1·Xi + εi",["ŷi = b0 + b1·xi","Yi = β0 · β1 · Xi + εi","Yi = β1 + β0·Xi²"],"Linear component plus random error. ŷi = b0 + b1xi is the estimated line, not the population model.",1);
m(2,"In Yi = β0 + β1Xi + εi, what is β0?","The population value of Y when X = 0 (the cut-off point)",["The population slope","The random error","The sample mean of Y"],"β0 is the intercept (cut-off point); β1 is the slope; εi is the random error.",1);
m(2,"In Yi = β0 + β1Xi + εi, what is εi?","The random error for this value of Xi",["The population slope","The predicted value of Y","The independent variable"],"εi is the random error: the gap between the observed Yi and the line.",1);
m(2,"Which four assumptions does the SLR model specify?","Linearity, homoscedasticity, randomness and normality",["Linearity, tolerance, VIF and normality","Normality, multicollinearity, stratification and randomness","Homoscedasticity, covariance, randomness and R²"],"The slides: εi → N(0, σ) for all i, which covers linearity, homoscedasticity, randomness and normality.",1);
m(2,"Which assumption is listed for multiple regression but not for the simple model?","No multicollinearity",["Linearity","Randomness","Normality"],"With several Xs we also need no perfect linear combination among the independent variables.",2);
m(2,"The assumption of linearity states that…","the true form of the relationship is linear: Y is a linear function of X plus a random error",["the errors have constant variance","the errors are independent of each other","the errors follow a normal distribution"],"Linearity: Y is a linear function of X plus a random error.",1);
m(2,"The assumption of homoscedasticity states that…","the errors are random variables centred on 0 with the same variance σ² for all values",["the errors are independent of each other","the errors are normally distributed","Y is a linear function of X"],"Homoscedasticity: the error terms are centred on 0 with constant variance σ².",1);
m(2,"The assumption of randomness states that…","the errors are independent of the values of x and not correlated among themselves",["the errors have constant variance","the errors are normal","the sample is large enough"],"Randomness: εi independent of x and uncorrelated with each other.",1);
m(2,"The assumption of normality states that…","the errors εi are random variables N(0, σ²) for all i",["the variable X is normally distributed","Y is always between 0 and 1","the residuals are all equal to 0"],"Normality is about the errors, N(0, σ²), not about X.",1);
m(2,"What does the OLS estimate of the slope look like?","b1 = Σ(xi − x̄)(yi − ȳ) / Σ(xi − x̄)² = r·sY/sX",["b1 = ȳ − b0·x̄","b1 = Σ(xi − x̄)² / Σ(xi − x̄)(yi − ȳ)","b1 = SSE / SSR"],"Slope: covariance numerator over the sum of squares of X.",2);
m(2,"How is the variance of the errors σ² estimated in simple regression?","s²R = SSResidual / (n − 2)",["s²R = SSResidual / n","s²R = SSResidual / (n − 1)","s²R = SSExplained / (n − 2)"],"σ̂² = Σei² / (n − 2).",2);
m(2,"Why do we divide by n − 2 (and not n or n − 1) to estimate σ² in simple regression?","Because the model uses two estimated parameters, b0 and b1",["Because the sample has two variables only by chance","Because two observations are always discarded","Because the errors have two tails"],"Two parameters (b0 and b1) are estimated, so two degrees of freedom are lost.",2);
m(2,"What does 'unbiased estimator' mean for b1?","E(b1) = β1: on average the estimator equals the true parameter",["V(b1) = 0 for every sample size","b1 = 0","b1 always equals β1 in every sample"],"Unbiased: E(β̂1) = β1. (Consistent is a different property: V(β̂) → 0 as n grows.)",2);
m(2,"What does 'consistent estimator' mean for b1?","Its variance tends to 0 as the sample size n tends to infinity",["Its expected value is 0","It never changes from one sample to another","Its expected value equals β1 for any n"],"Consistent: lim V(β̂1) = 0 when n → ∞.",2);
m(2,"How is the standard error of b1 (s_b1) interpreted?","It measures how the slopes of the estimated lines vary from one sample to another",["It is the average residual","It is the slope of the population line","It is the proportion of variation explained"],"s_b1 measures the sample-to-sample variability of the estimated slope.",2);
m(2,"In the SPSS output of the grade example, what is the 'Std. Error of the Estimate' (8.012)?","The estimate of the residuals' standard deviation, s_R",["The standard error of b1","The standard deviation of the grades","The square of the residual variance"],"Std. Error of the Estimate = s_R = 8.012. The residual variance is the 'Mean Square Residual' = 64.185 (8.012² ≈ 64.19).",2);
m(2,"In the SPSS output of the grade example, which cell gives the residual variance s²R?","The 'Mean Square' of the Residual row in the ANOVA table (64.185)",["The 'B' column of the constant (11.084)","The 'Std. Error' of Hours (0.056)","The R Square (0.862)"],"Residual variance = Mean Square Residual = 64.185.",2);
m(2,"Which graph is used to check linearity and homoscedasticity?","Residuals versus predictions (fit)",["Residuals versus order","Histogram of the residuals","Henry's line"],"Residuals vs fit: e around zero without pattern (linearity), similar dispersion (homoscedasticity).",1);
m(2,"Which graph is used to check randomness?","Residuals versus order",["Residuals versus predictions","Histogram of the residuals","Scatter plot of X and Y"],"Randomness: the residuals show no pattern with respect to the order of the observations.",1);
m(2,"Which graphs are used to check normality?","The histogram of the residuals and Henry's line (normal plot)",["Residuals versus order","Residuals versus fit only","The ANOVA table"],"Normality: histogram of residuals and Henry's line (Q-Q plot).",1);
m(2,"In a residuals-versus-fit plot, what should we see if linearity holds?","Residuals around zero without any pattern with respect to the fit",["Residuals that increase steadily with the fit","A U-shaped curve","Residuals all positive"],"Linearity: ei around zero without a pattern with respect to ŷi.",1);
m(2,"In a residuals-versus-fit plot, what should we see if homoscedasticity holds?","Residuals with a similar dispersion all along the fitted values",["A dispersion that widens as the fit increases","Residuals all equal to zero","Residuals that follow a straight rising line"],"Homoscedasticity: similar dispersion of ei across ŷi.",1);
m(2,"A residuals-versus-fit plot shows a clear U-shaped curve around zero. Which assumption is clearly violated?","Linearity",["Normality","Randomness","None: this is the ideal pattern"],"A systematic curve means the true relationship is not linear (slide example: Linearity ✗).",2);
m(2,"In a residuals-versus-fit plot the points have no curve but their spread is narrow on one side and wide on the other. Which assumption is violated?","Homoscedasticity",["Linearity","Randomness","Normality"],"Residuals with a changing dispersion violate homoscedasticity (slide example: Linearity ✓, Homoscedasticity ✗).",2);
m(2,"A residuals-versus-order chart shows long runs and waves instead of random ups and downs around zero. Which assumption is violated?","Randomness",["Linearity","Homoscedasticity","Normality"],"A pattern with respect to the order means the errors are not random.",2);
m(2,"The histogram of the residuals is roughly bell-shaped and the points of Henry's line follow a straight line. What do we conclude?","The normality assumption is acceptable",["Normality is violated","Linearity is violated","Randomness is violated"],"Bell-shaped histogram plus points on the line: normality OK.",2);
m(2,"The points of Henry's line (normal plot of the residuals) are clearly curved away from the straight line. What does that suggest?","The residuals are not normal",["The residuals are random","The relationship is linear","The residuals are homoscedastic"],"Departure from the straight line in the normal plot indicates non-normality.",2);
vf(2,"The assumptions of the regression model are checked with the residuals.",true,"Stage 3 (analysis of residuals) checks linearity, homoscedasticity, randomness and normality.",1);

// =====================================================================
// 3. SLR: verification of the model & use (5.2)
// =====================================================================
m(3,"What are the hypotheses to test the linear relation in SLR?","H0: β1 = 0 (no linear relationship) vs H1: β1 ≠ 0",["H0: β1 ≠ 0 vs H1: β1 = 0","H0: β0 = 0 vs H1: β0 ≠ 0","H0: R² = 1 vs H1: R² < 1"],"If the population slope is 0, there is no linear relation between the variables.",1);
m(3,"Why must we verify the model with a hypothesis test?","To make sure the linear relation seen in the sample did not occur by chance and can be extrapolated to the population",["To compute the correlation of the sample","To remove outliers","To compute the residuals"],"The test checks that the observed relation can be extrapolated to the population.",1);
m(3,"If H0: β1 = 0 is rejected, we can conclude that…","there is evidence of a linear relationship between the variables at the population level",["there is no linear relationship","the intercept is zero","the residuals are normal"],"Rejecting H0 allows us to accept the alternative: a linear relation exists in the population.",1);
m(3,"If we cannot reject H0: β1 = 0, we conclude that…","the evidence does not allow us to argue that a linear relation exists at the population level",["the slope is exactly 0","there is a perfect linear relationship","the model predicts perfectly"],"Not rejecting H0 means there is not enough evidence of a linear relation (it does not prove β1 = 0).",2);
m(3,"In simple regression, which two tests can verify the model?","The t-test on the slope and the F-test (ANOVA)",["The chi-square test and the z-test","Only the Kolmogorov-Smirnov test","The VIF test and the tolerance test"],"They give the same p-value and the same conclusion.",1);
m(3,"What is the test statistic of the t-test for the slope under H0?","t = b1 / s_b1, which follows a t distribution with n − 2 degrees of freedom",["t = b1 · s_b1, with n − 1 degrees of freedom","t = b0 / s_b0, with n degrees of freedom","t = R² / (1 − R²), with n − 2 degrees of freedom"],"U = (b1 − β1)/s_b1 → t(n−2); under H0, β1 = 0.",2);
m(3,"In the SLR ANOVA table, what are the degrees of freedom of the explained, residual and total rows?","1, n − 2 and n − 1",["n − 2, 1 and n − 1","1, n − 1 and n","2, n − 2 and n"],"Explained: 1; Residual: n − 2; Total: n − 1.",2);
m(3,"In the SLR F-test, how is F computed?","F = S²Explained / S²Residual, with S²Explained = SSE/1 and S²Residual = SSR/(n − 2)",["F = SSE / SSR","F = SSR/(n − 2) divided by SSE","F = R² / (n − 2)"],"Mean squares: explained SS over 1, residual SS over n − 2; F follows F(1, n−2).",2);
m(3,"Under H0, the F statistic of simple regression follows…","an F distribution with (1, n − 2) degrees of freedom",["an F distribution with (n − 2, 1) degrees of freedom","a t distribution with n − 2 degrees of freedom","a normal distribution N(0,1)"],"By the slides, F → F(1, n−2): 1 degree of freedom for the explained SS and n − 2 for the residual.",2);
m(3,"In the grade example (n = 10), what are the degrees of freedom in the ANOVA table?","1 (regression), 8 (residual), 9 (total)",["1 (regression), 9 (residual), 10 (total)","2 (regression), 8 (residual), 10 (total)","1 (regression), 10 (residual), 9 (total)"],"n − 2 = 8 and n − 1 = 9.",2);
m(3,"In the grade example, the t-test and the F-test show…","the same p-value (practically null), so H0 is rejected",["different p-values, so the tests disagree","a p-value close to 1, so H0 is not rejected","a p-value of 0.150"],"Both tests give p ≈ .000; we reject H0 and affirm a linear relation between hours of study and grades.",1);
m(3,"In the grade example the p-value is practically 0. What do we conclude?","Hours of study and grade have a linear relation at the population level",["Hours of study and grade are independent","The residuals are not normal","The intercept is zero"],"Reject H0: β1 = 0, so β1 ≠ 0.",1);
m(3,"In the grade example's coefficients table, the constant has t = 1.594 and Sig. = .150. At the 5% level, what do we conclude about β0?","We cannot reject H0: β0 = 0",["We reject H0: β0 = 0","β0 is exactly zero","β1 is not significant"],"p = .150 > .05, so the constant is not significantly different from 0.",3);
m(3,"In the grade example's coefficient table, the slope has t = 7.061 and F (ANOVA) = 49.858. What is the relation between them?","F is approximately t² (7.061² ≈ 49.86)",["F is approximately t","F is approximately √t","F is approximately 1/t"],"In simple regression the t and F tests are equivalent (same p-value): F = t².",3);
m(3,"In the grade example, the ANOVA table gives SS regression = 3200.123, SS residual = 513.477 and SS total = 3713.600. Which relation holds?","3200.123 + 513.477 = 3713.600 (SST = SSE + SSR)",["3200.123 − 513.477 = 3713.600","3200.123 × 513.477 = 3713.600","3713.600 + 513.477 = 3200.123"],"Explained + residual = total (check: 3200.123 + 513.477 = 3713.600).",2);
m(3,"What are the two levels at which the SLR model can be used?","Explanatory level and predictive level",["Descriptive level and inferential level","Linear level and non-linear level","Sample level and census level"],"Use of the model: explain the relation and impact of X, or predict Y for new observations.",1);
m(3,"At the explanatory level, which parameter describes the impact of X on Y in the population?","The slope β1",["The intercept β0","The residual variance σ²","The coefficient R²"],"β1 tells how much Y increases (on average) when X increases one unit.",1);
m(3,"Which are the two ways of estimating β1 at the explanatory level?","Point estimation (b1) and interval estimation (a confidence interval)",["Point estimation (R²) and interval estimation (VIF)","Only a prediction interval","Only the p-value"],"Point estimate b1; interval estimate: confidence interval for β1.",1);
m(3,"In the grade example, b1 = 0.398 and its 95% confidence interval is [0.268; 0.527]. How is the interval interpreted?","With 95% confidence, an extra hour of study means, on average, an increase of between 0.268 and 0.527 grade points",["95% of the students gain between 0.268 and 0.527 points","The grade of every student increases by 0.398","The intercept lies between 0.268 and 0.527"],"The interval estimates the population slope β1.",2);
m(3,"In the grade example, b1 = 0.398. How is it interpreted?","Each extra hour of study increases the average grade by about 0.398 points",["Each extra hour of study increases the grade of every student by exactly 0.398 points","39.8% of the students pass","Students with 0 hours get 0.398 points"],"b1 is the change in the mean of Y per unit of X.",2);
m(3,"In the grade example, b0 = 11.084. According to the slide, when does its interpretation (average grade of students who study 0 hours) make sense?","Only when X = 0 is within the range of the observed values of X",["Always, as it is the intercept","Only when R² = 1","Only when the slope is negative"],"The slide's warning: interpret b0 only if x = 0 is within the observed range. (In the example, hours range from 30 to 190.)",3);
m(3,"Which sign tells us whether the relation between X and Y is positive or negative?","The sign of b1",["The sign of b0","The sign of R²","The sign of s_R"],"The sign of the slope b1 gives the direction (in the grade example, positive).",1);
m(3,"What is the point prediction of Y for a new observation x(n+1)?","ŷ(n+1) = b0 + b1·x(n+1)",["ŷ(n+1) = b0 − b1·x(n+1)","ŷ(n+1) = b1 / x(n+1)","ŷ(n+1) = ȳ + x(n+1)"],"Substitute the value of X in the estimated line.",1);
m(3,"At the predictive level, which three options does the slide list?","Point prediction, prediction interval for a new observation, confidence interval for the mean",["Point prediction, p-value, R²","Prediction interval, VIF, tolerance","Confidence interval for the slope only"],"Point prediction; prediction interval for a new observation; confidence interval for the mean of the observations with the same x.",1);
m(3,"Which interval is always wider?","The prediction interval for an individual observation",["The confidence interval for the mean","They have exactly the same width","It depends on the sign of b1"],"Predicting one value involves more uncertainty than predicting the mean: the interval for an observation is always wider than the confidence interval for the mean.",1);
m(3,"We can only use the regression model to make predictions about values…","within the range of values studied",["above the range studied","below the range studied","for any value of X"],"We cannot be certain that the same pattern holds beyond the observed range.",1);
m(3,"In the grade example, for a new student who studies 85 hours, which is the point prediction in the slide's table?","44.87",["37.85","51.89","64.63"],"44.87 is the predicted value. 37.85 and 51.89 bound the CI for the mean; 25.11 and 64.63 bound the interval for an individual.",2);
m(3,"For 85 hours of study, which is the 95% confidence interval for the AVERAGE grade of all students who study 85 hours?","[37.85; 51.89]",["[25.11; 64.63]","[44.87; 90.59]","[78.10; 103.07]"],"The CI for the mean is the narrower interval; [25.11; 64.63] is the prediction interval for one student.",2);
m(3,"For 85 hours of study, which is the 95% interval for the grade of ONE new student?","[25.11; 64.63]",["[37.85; 51.89]","[68.29; 112.88]","[44.87; 51.89]"],"The prediction interval for an individual observation is wider than the one for the mean.",2);
m(3,"In the grade example, why does it make no sense to interpret the prediction for 200 hours?","Because 200 hours is outside the range of observed hours (30 to 190)",["Because the prediction is negative","Because 200 hours is below the mean","Because the intervals would be narrower"],"Predictions are only valid inside the range of the sample. This is the question the slide asks about Xnew = 200.",2);
m(3,"For 85 hours the table gives CI for the mean [37.85; 51.89] and prediction interval [25.11; 64.63]. What are their widths?","14.04 and 39.52",["39.52 and 14.04","25.78 and 25.78","7.02 and 19.76"],"51.89 − 37.85 = 14.04 and 64.63 − 25.11 = 39.52: the prediction interval is wider.",3);

// =====================================================================
// 4. MLR: specification & estimation (5.3)
// =====================================================================
m(4,"What is the aim of multiple linear regression?","To examine the linear relationship between 1 dependent variable and 2 or more independent variables",["To examine the relationship between 2 dependent variables and 1 independent variable","To reduce many variables to a few components","To compare two means"],"Aim: linear relationship between one Y and two or more Xi.",1);
m(4,"In the MLR example of the slides, what is the dependent variable Y?","The homicide rate",["The poverty rate","The police rate","The number of states"],"Y: homicide rate. X1: poverty rate. X2: police rate.",1);
m(4,"In the MLR example, which are the explanatory variables?","The poverty rate (X1) and the police rate (X2)",["The homicide rate and the poverty rate","The police rate only","The state and its abbreviation"],"Two independent variables: poverty rate and police rate.",1);
m(4,"How many states are in the sample of the homicide example?","14",["10","50","11"],"A random sample of 14 states.",1);
m(4,"Which question does the homicide example try to answer?","Can we predict the annual homicide rate of a state from its police and poverty rates?",["Does the number of states affect homicides?","Is the homicide rate normal?","Are police rates higher in large states?"],"'Can we predict states' annual homicide rate based on police and poverty rates?'",1);
m(4,"In the homicide example, which relationship do the scatter plots show between poverty rate and homicide rate?","Positive linear",["Negative linear","No relationship","Curved"],"A positive linear relationship (correlation .698).",1);
m(4,"In the homicide example, which relationship do the scatter plots show between police rate and homicide rate?","Negative linear (weak)",["Positive and strong","Perfectly linear","Curved"],"A negative linear relationship (correlation −.123).",1);
m(4,"In the homicide example, which correlation is the highest in absolute value?","Poverty rate with homicide rate (.698)",["Police rate with homicide rate (−.123)","Poverty rate with police rate (.360)","They are all equal"],"Correlations: .698 (poverty–homicide), −.123 (police–homicide), .360 (poverty–police).",2);
m(4,"What is the correlation between the poverty rate and the police rate in the example?","0.360",["0.698","−0.123","0.805"],"The correlations table: poverty–police = .360.",2);
m(4,"What does the population MLR model with k independent variables look like?","Y = β0 + β1X1 + β2X2 + … + βkXk + ε",["Y = β0 · X1 · X2 · … · Xk + ε","Y = β1X1 + β2X2 + … + βkXk − ε","Y = β0 + (β1 + … + βk)X + ε"],"Y-intercept, population slopes and random error.",1);
m(4,"With two independent variables, the population model is geometrically…","a plane (hyper-plane)",["a straight line","a curve","a single point"],"One X: a line. Two Xs: a plane. More: a hyper-plane.",1);
m(4,"Which assumption is added in MLR to the four assumptions of SLR?","No multicollinearity: no perfect linear combination of the independent variables",["Perfect correlation between the Xs","The Xs must be normal","The Xs must be independent of Y"],"Assumptions: linearity, homoscedasticity, randomness, normality and no multicollinearity.",1);
m(4,"Write the example model correctly:","Homicide rate = β0 + β1·Poverty rate + β2·Police rate + ε",["Poverty rate = β0 + β1·Homicide rate + β2·Police rate + ε","Homicide rate = β1 + β2 · Poverty rate · Police rate","Homicide rate = β0 + β1·Police rate + ε only"],"Response: homicide rate; explanatory: poverty rate and police rate; ε random error.",1);
m(4,"In the estimated equation ŷ = b0 + b1x1 + b2x2 + … + bkxk, what does ŷ estimate?","The mean of Y",["The population slope","The error term","The variance of Y"],"ŷ is the estimated value of the mean of Y.",1);
m(4,"Which are the point estimates of β0, βi, σ and σ² once the sample is chosen?","b0, bi, sR and s²R",["β̂0, β̂i, σ̂ and σ̂²","b0, bi, r and R²","x̄, ȳ, sX and sY"],"The slides' table: parameters β0, βi, σ, σ²; estimators β̂0, β̂i, σ̂, σ̂²; point estimates b0, bi, sR, s²R.",2);
m(4,"How is the residual variance s²R computed in MLR?","s²R = Σei² / (n − (k + 1))",["s²R = Σei² / n","s²R = Σei² / (n − 2)","s²R = Σei² / (k + 1)"],"n − (k+1) = n − k − 1 degrees of freedom: k slopes plus the intercept are estimated.",2);
m(4,"What is the residual standard deviation (standard error of the model)?","sR = √(Σei² / (n − (k + 1)))",["sR = Σei² / (n − (k + 1))","sR = (Σei)² / n","sR = R²/(k + 1)"],"The square root of the residual variance.",2);
m(4,"In the homicide example (n = 14, k = 2), how many degrees of freedom does the residual have?","11",["12","14","2"],"n − (k + 1) = 14 − 3 = 11.",2);
m(4,"In the SPSS output for the homicide example, what is the 'Std. Error of the Estimate' (17.437)?","The residual standard deviation sR",["The residual variance s²R","The standard error of b1","The standard deviation of the homicide rate"],"sR = 17.437; the residual variance is the Mean Square Residual 304.038 (17.437² ≈ 304.04).",2);
m(4,"In the homicide example, the estimated constant is b0 = 8.006. According to the slides, what is its interpretation?","The mean homicide rate when poverty and police rates are zero; it makes no sense because zero is not within the range of either variable",["The effect of the poverty rate on the homicide rate","The effect of the police rate on the homicide rate","The residual standard deviation"],"b0 = 8.006 has no practical meaning here: zero lies outside the observed ranges of the poverty rate and the police rate.",2);
m(4,"In the homicide example, b1 = 0.687. How is it interpreted?","The change in the mean homicide rate when the poverty rate increases one unit, if the police rate is kept constant",["The change in the mean homicide rate when the poverty rate increases one unit, whatever happens to the police rate","The correlation between poverty and homicide","The mean homicide rate when the poverty rate is 0.687"],"In MLR each slope is the effect of its variable keeping the other variables constant.",2);
m(4,"In the homicide example, b2 = −0.185. How is it interpreted?","When the police rate increases one unit and the poverty rate is kept constant, the mean homicide rate decreases by 0.185",["When the police rate increases one unit, the homicide rate increases by 0.185","The police rate explains 18.5% of the homicide rate","The poverty rate decreases by 0.185"],"Negative coefficient: the mean homicide rate decreases by 0.185 per extra unit of police rate (poverty held constant).",2);
m(4,"What does 'keeping the other variable constant' mean in the interpretation of bi?","The effect of Xi is measured while the other independent variables are held at fixed values",["The other variables are removed from the model","The other variables must be equal to zero","The other variables must be equal to each other"],"Each coefficient measures the partial effect of its own variable with the others fixed.",2);
m(4,"Using ŷ = 8.006 + 0.687·Poverty − 0.185·Police, by how much does the mean homicide rate change if the poverty rate rises by 10 units with the police rate unchanged?","It increases by 6.87",["It increases by 0.687","It decreases by 1.85","It increases by 8.006"],"10 × 0.687 = 6.87.",2);
m(4,"Using ŷ = 8.006 + 0.687·Poverty − 0.185·Police, by how much does the mean homicide rate change if the police rate rises by 20 units with the poverty rate unchanged?","It decreases by 3.7",["It increases by 3.7","It decreases by 0.185","It decreases by 8.006"],"20 × (−0.185) = −3.7.",2);
m(4,"What is the coefficient of determination R² in the homicide example?","0.648",["0.805","0.584","0.487"],"R² = .648; R = .805 is its square root; .584 is the adjusted R²; .487 is the R² of the model with poverty only.",2);
m(4,"In the homicide example, how is R² = 0.648 interpreted?","64.8% of the variation in homicide rate is explained by the variation in poverty rate and police rate",["64.8% of the states have a high homicide rate","The homicide rate increases by 64.8% for each unit","The police rate explains 64.8% of the homicide rate alone"],"R² is the share of the variation in the dependent variable explained by the independent variables jointly.",2);
m(4,"In MLR, R² is defined as…","ESS/TSS (explained over total variation), between 0 and 1",["TSS/ESS","ESS/RSS","1 + ESS/TSS"],"0 ≤ R² = ESS/TSS ≤ 1.",1);
vf(4,"In the homicide example, the coefficient b2 is negative because the police rate has a negative relation with the homicide rate (poverty rate held constant).",true,"b2 = −0.185 < 0: negative relation with the poverty rate held constant.",1);
vf(4,"In MLR, the estimated intercept b0 always has a useful interpretation.",false,"It only makes sense when zero is within the range of the explanatory variables (not the case in the homicide example).",1);

// =====================================================================
// 5. MLR: assumptions & verification of the model (5.3)
// =====================================================================
m(5,"Which graph checks linearity and homoscedasticity in MLR?","Residuals versus predictions (or versus the explanatory variable)",["Residuals versus order","Histogram of the residuals","Tolerance and VIF table"],"Residuals vs fit or X: no pattern (linearity), similar dispersion (homoscedasticity).",1);
m(5,"Which graph checks randomness in MLR?","Residuals versus order",["Residuals versus predictions","Q-Q plot","Histogram of X"],"Randomness: the residuals show no pattern with respect to order.",1);
m(5,"Which graphs check normality in MLR?","The histogram of the residuals and the Q-Q plot (Henry's line)",["Residuals versus order","Tolerance and VIF","The coefficients table"],"Normality: histogram of the residuals and Q-Q plot (Henry's line).",1);
m(5,"Which measures detect multicollinearity?","Tolerance and VIF",["R² and adjusted R²","t and F","Covariance and correlation of Y"],"Detection of multicollinearity: Tolerance – VIF.",1);
m(5,"How is the tolerance of a regressor Xi defined?","Tolerance(Xi) = 1 − R²i, where R²i comes from regressing Xi on the other independent variables",["Tolerance(Xi) = R²i","Tolerance(Xi) = 1 / R²i","Tolerance(Xi) = 1 − R² of the full model"],"For each Xi we compute its R²i with the remaining independent variables.",2);
m(5,"How is the VIF of a regressor defined?","VIF(Xi) = 1 / Tolerance(Xi)",["VIF(Xi) = Tolerance(Xi)","VIF(Xi) = 1 − Tolerance(Xi)","VIF(Xi) = R²i"],"VIF = 1/Tolerance.",1);
m(5,"What is the maximum value of the tolerance and what does it mean?","1: the regressor has no multicollinearity with the others",["1: the regressor is a perfect combination of the others","0: there is no multicollinearity","100: perfect multicollinearity"],"Tolerance ranges from 1 (100%, no multicollinearity) to 0 (perfect linear combination).",2);
m(5,"What does a tolerance of 0 mean?","The regressor is a perfect linear combination of the other regressors",["The regressor is independent of the others","The regressor is not significant","The model has no residuals"],"Minimum tolerance (0%): perfect multicollinearity.",2);
m(5,"What is the minimum value of the VIF?","1, when there is no multicollinearity",["0, when there is no multicollinearity","100","It has no minimum"],"VIF takes values from 1 upward and has no upper limit (perfect multicollinearity).",2);
m(5,"Does the VIF have an upper limit?","No: it has no upper limit by definition in the case of perfect multicollinearity",["Yes: 1","Yes: 10","Yes: 100"],"VIF has a minimum of 1 and no upper limit.",2);
m(5,"What value of the tolerance is desirable?","As high as possible, ideally 1, generally more than 0.4",["As low as possible, ideally 0","Exactly 0.5","Between 0 and 0.1"],"Many authors accept tolerances greater than 0.1.",2);
m(5,"In the homicide example the tolerances are .870 and the VIFs 1.149. What do we conclude?","There is no multicollinearity problem",["There is a serious multicollinearity problem","The model is not significant","The residuals are not normal"],"Tolerance .870 is well above 0.4 (and 0.1), and VIF is close to 1.",2);
m(5,"With only two regressors, the tolerance of each equals 1 − r², where r is their correlation. For poverty and police (r = .360), what is the tolerance?","0.870",["0.640","0.360","0.130"],"1 − .360² = 1 − .1296 = .8704 ≈ .870. The matching VIF is 1/.8704 ≈ 1.149.",3);
m(5,"A regressor has a tolerance of 0.05. What can we say?","There is a serious multicollinearity problem (the tolerance is far below 0.1)",["There is no multicollinearity","The regressor is the most significant","The regressor can be interpreted without caution"],"Desirable tolerance > 0.4 (many authors accept > 0.1); 0.05 is below any threshold.",3);
m(5,"What are the hypotheses of the individual test for slope βi?","H0: βi = 0 (no linear relation) vs H1: βi ≠ 0 (linear relation)",["H0: βi ≠ 0 vs H1: βi = 0","H0: β1 = … = βk = 0 vs H1: ∃i βi ≠ 0","H0: R² = 0 vs H1: R² = 1"],"The last option is the global test, not the individual one.",1);
m(5,"Which test statistic is used for the individual verification of βi?","t = bi / s_βi",["F = S²Explained / S²Residual","t = R² / (1 − R²)","z = bi · s_βi"],"Under H0 (βi = 0): T = bi / s_βi follows a t distribution.",2);
m(5,"Which test checks whether the explanatory variables, taken together, have a linear relation with the response?","The global F-test (ANOVA)",["The t-test of each coefficient","The tolerance test","The Q-Q plot"],"Global verification: H0: β1 = β2 = … = βk = 0.",1);
m(5,"What are the hypotheses of the global verification?","H0: β1 = β2 = … = βk = 0 vs H1: at least one βi ≠ 0",["H0: at least one βi ≠ 0 vs H1: all βi = 0","H0: β0 = 0 vs H1: β0 ≠ 0","H0: all βi ≠ 0 vs H1: all βi = 0"],"Global test: no linear relation with any variable vs a linear relation with at least one.",1);
m(5,"What does rejecting H0 in the global test mean?","At least one explanatory variable has a linear relation with the response variable",["All the explanatory variables are significant","No variable is significant","R² equals 1"],"H1: ∃i, βi ≠ 0.",2);
m(5,"What is the statistic of the global test in MLR?","F = S²Explained / S²Residual",["F = S²Residual / S²Explained","F = SSE / SSR","t = bi / s_βi"],"F = mean square explained / mean square residual.",2);
m(5,"What are the degrees of freedom of the F-test in the homicide example (k = 2, n = 14)?","(2, 11)",["(1, 12)","(2, 14)","(11, 2)"],"F(k, n − k − 1) = F(2, 11).",2);
m(5,"What is the F statistic and the p-value of the global test in the homicide example?","F = 10.111 and p = 0.003",["F = 4.444 and p < 0.001","F = 304.038 and p = 0.047","F = 3074.256 and p = 0.694"],"F = 3074.256/304.038 = 10.111; p-value = P(F(2,11) > 10.111) = .003.",2);
m(5,"In the ANOVA table of the homicide example, what are the regression and residual degrees of freedom?","2 and 11",["1 and 12","2 and 13","11 and 2"],"Regression: k = 2. Residual: n − k − 1 = 11. Total: 13.",2);
m(5,"In the homicide example, which sum of squares is explained and which is residual?","Explained: 6148.512; residual: 3344.417 (total 9492.929)",["Explained: 3344.417; residual: 6148.512","Explained: 3074.256; residual: 304.038","Explained: 9492.929; residual: 6148.512"],"6148.512 + 3344.417 = 9492.929. The mean squares are 3074.256 and 304.038.",3);
m(5,"What do we conclude from the global F-test in the homicide example?","We reject H0: there is a real linear relation between poverty and police rates (together) and the homicide rate",["We do not reject H0","Only the poverty rate has a linear relation","The model has no linear relation at all"],"p = .003 → reject H0 with practically zero risk.",1);
m(5,"In the homicide example, the individual test for poverty gives t = 4.444 and p < .001. What do we conclude?","We reject H0: there is a linear relation between the poverty rate and the homicide rate",["We cannot reject H0","The poverty rate is not significant","The police rate is significant"],"p < .001: significant at any usual level.",2);
m(5,"In the homicide example, the individual test for police gives t = −2.242 and p = 0.047. What do we conclude?","We reject H0 at 5%: there is a linear relation between police rate and homicide rate (risk of 4.7%)",["We cannot reject H0 at 5%","The police rate has no relation with homicides","The relation is positive"],"p = .047 < .05, so police is significant at 5% (but not at 1%).",2);
m(5,"In the homicide example, is the police rate significant at the 1% level?","No, because p = 0.047 is greater than 0.01",["Yes, because p = 0.047 is less than 0.05","Yes, because t is negative","No, because p < .001"],"We would need p < 0.01 to reject H0 at 1%.",3);
m(5,"What does the negative t = −2.242 of the police rate tell us?","The estimated slope is negative (b2 = −0.185)",["The test is invalid","The police rate is not significant","The poverty rate is negative"],"The sign of t is the sign of the coefficient (t = b2/s).",2);
m(5,"In the homicide example, for the constant, t = 0.404 and Sig. = .694. What do we conclude?","β0 is not significantly different from 0",["β0 is significantly different from 0","The model is not significant","The poverty rate is not significant"],"p = .694 > .05: we cannot reject β0 = 0.",3);
vf(5,"If the global F-test is significant, every individual coefficient must be significant.",false,"The global test only says that at least one βi ≠ 0.",2);
vf(5,"Multicollinearity is detected with the tolerance and the VIF.",true,"VIF = 1/Tolerance; low tolerance (high VIF) signals multicollinearity.",1);

// =====================================================================
// 6. MLR: use of the model & model selection (5.3)
// =====================================================================
m(6,"Which are the two objectives of using the MLR model?","Explanatory level (impact of the Xi) and predictive level (new observations)",["Descriptive and inferential","Estimation and residuals","Specification and verification"],"1: describe the relation and the impact of the Xi. 2: predict Y for new observations.",1);
m(6,"At the explanatory level, which interval estimate is used for βi?","bi ± t(n−k−1) · ee(bi), the confidence interval for βi",["bi ± R² · ee(bi)","bi ± F · ee(bi)","bi ± VIF"],"CI for βi: bi ± t(n−k−1)·ee(bi). It is found in the 'Coefficients' table.",2);
m(6,"In the homicide example, the 95% CI for the poverty rate coefficient is [0.347; 1.028]. How is it interpreted?","With 95% confidence, one extra unit of poverty rate goes with a mean rise of 0.347 to 1.028 in the homicide rate (police rate fixed)",["Poverty rate increases by 0.347 to 1.028 for each homicide","95% of the states have a poverty effect between 0.347 and 1.028","The homicide rate decreases between 0.347 and 1.028"],"The interval estimates the effect βpov, keeping the police rate fixed.",2);
m(6,"In the homicide example, the 95% CI for the police rate coefficient is [−0.367; −0.003]. How is it interpreted?","With 95% confidence, one extra unit of police rate goes with a mean drop of 0.003 to 0.367 in the homicide rate (poverty rate fixed)",["The police rate increases homicides by between 0.003 and 0.367","There is no effect of the police rate","The mean decrease is exactly 0.185"],"Both bounds are negative: a decrease. The interval does not contain 0, consistent with p = .047 < .05.",3);
m(6,"The 95% CI of the poverty coefficient, [0.347; 1.028], does not contain 0. What does this tell us?","The coefficient is significantly different from 0 at the 5% level",["The coefficient is not significant","The model has multicollinearity","The residuals are not normal"],"A 95% CI that excludes 0 corresponds to rejecting H0: β = 0 at 5%.",3);
m(6,"The 95% CI of the constant is [−35.567; 51.580]. What does this tell us?","The constant is not significantly different from 0 (the interval contains 0)",["The constant is significant","The slopes are negative","The poverty rate is not significant"],"The interval contains 0, which matches p = .694.",3);
m(6,"Why can't we directly compare b1 = 0.687 (poverty) with b2 = −0.185 (police) to see which variable has more effect?","Because the variables are measured on different scales",["Because b2 is negative","Because b1 is not significant","Because they come from different models"],"Direct comparison is not possible because of the different scales; we need standardised coefficients.",2);
m(6,"What is the solution to compare the effects of explanatory variables measured on different scales?","Standardise the coefficients",["Drop the variable with the lowest p-value","Use the intercept","Use only the F-test"],"A variable with a larger standardised coefficient in absolute value has a greater effect or impact.",1);
m(6,"With standardised coefficients, which variable has more impact?","The one with the larger coefficient in absolute value",["The one with the larger positive coefficient only","The one with the smaller coefficient","The one with the larger p-value"],"Compare absolute values: greater |beta| means greater effect.",1);
m(6,"In the homicide example the standardised coefficients are .853 (poverty) and −.430 (police). Which variable has the greater effect?","The poverty rate, since |.853| > |−.430|",["The police rate, because it is negative","The police rate, because −.430 is smaller than .853","They have the same effect"],"The slide concludes: the poverty rate has a greater effect on the homicide rate than the police rate.",2);
m(6,"How is the point prediction of Y for a new observation obtained in MLR?","By substituting the new values of the explanatory variables in the estimated equation",["By averaging the observed values of Y","By taking the largest residual","By dividing b0 by the number of variables"],"ŷ = b0 + b1·x1(new) + … + bk·xk(new).",1);
m(6,"In the homicide example, what is the point prediction of the mean homicide rate for a new state with poverty rate 150 and police rate 100?","92.61",["69.91","115.31","48.02"],"92.61 is the prediction; 69.91 and 115.31 bound the CI for the mean; 48.02 and 137.20 bound the prediction interval.",2);
m(6,"For poverty rate 150 and police rate 100, what is the 95% confidence interval for the MEAN homicide rate of all such states?","[69.91; 115.31]",["[48.02; 137.20]","[92.61; 137.20]","[8.006; 92.61]"],"The confidence interval for the expected value of Y is the narrower one.",2);
m(6,"For poverty rate 150 and police rate 100, what is the 95% prediction interval for the homicide rate of ONE such state?","[48.02; 137.20]",["[69.91; 115.31]","[48.02; 92.61]","[92.61; 115.31]"],"A prediction interval for a new value of Y is wider than the confidence interval for the mean.",2);
m(6,"What is the difference between the confidence interval and the prediction interval in MLR?","The CI is for the expected value of Y given xi; the prediction interval is for a new value of Y given xi",["The CI is for a new value; the prediction interval is for the expected value","They are the same","The CI is for βi; the prediction interval is for σ"],"CI: expected value of Y. Prediction interval: a new value of Y.",2);
m(6,"The poverty rates in the sample go from 73 to 207. Would a prediction for a state with a poverty rate of 300 be advisable?","No, because 300 is outside the range of the observed values",["Yes, linear models work for any value","Yes, if the F-test is significant","Yes, if R² is greater than 0.5"],"Predictions are only reliable within the range of values studied.",3);
m(6,"Why is it a problem to compare models only with R² when variables are added?","R² increases when explanatory variables are added, even if they add little",["R² decreases when variables are added","R² is always equal to 1","R² cannot be computed with several variables"],"When more explanatory variables are added, R² increases and the standard error decreases, so we need a criterion that penalises complexity.",2);
m(6,"Which criterion penalises the entry of new regressors (simplicity criterion)?","The adjusted coefficient of determination",["The unadjusted R²","The covariance","The tolerance"],"Adjusted R²: simplicity criterion that penalises new regressors.",1);
m(6,"What is the formula of the adjusted R²?","R²adj = 1 − (n − 1)/(n − (k + 1)) · (1 − R²)",["R²adj = 1 − (n − (k + 1))/(n − 1) · (1 − R²)","R²adj = (n − 1)/(n − (k + 1)) · R²","R²adj = 1 − k · (1 − R²)"],"This is the slide's formula.",2);
m(6,"In the homicide example, the model with only the poverty rate has R² = .487, adjusted R² = .444 and SE = 20.151. The model with both variables has R² = .648, adjusted R² = .584 and SE = 17.437. Which is the best model?","The model with both variables, because its adjusted R² is higher",["The model with poverty only, because it is simpler","The model with poverty only, because its SE is larger","Neither: the criterion does not apply"],"The slide: 'the best model is the one that includes the two variables, because the adjusted coefficient of determination is higher'.",2);
m(6,"When the police rate is added to the model with the poverty rate, what happens to the standard error of the model?","It decreases (20.151 → 17.437)",["It increases","It is unchanged","It becomes 0"],"The example: SE from 20.151 to 17.437, and R² from .487 to .648.",2);
m(6,"What is the 'coefficient significance criterion' in variable selection?","Looking for a subset of regressors in which all of them are significant",["Choosing the model with the highest R²","Choosing the variable with the smallest VIF","Choosing the model with the most variables"],"Variable selection methods use the significance of the coefficients.",2);
m(6,"Why is selecting the right predictors crucial?","To improve accuracy, avoid overfitting with too many variables, and enhance interpretability",["To always increase R²","To remove the intercept","To avoid using residuals"],"These are the three benefits listed in the slides.",1);
m(6,"The 'Enter' method…","includes all the predictors without elimination",["adds significant predictors one by one starting from none","removes the least important predictors one at a time","mixes forward and backward selection"],"Enter: all predictors are included.",1);
m(6,"The 'Forward selection' method…","starts with no predictors and adds the significant ones",["starts with all predictors and removes the least important","includes all predictors without elimination","mixes forward and backward selection"],"Forward selection builds the model from scratch with the most significant variables.",1);
m(6,"The 'Backward elimination' method…","starts with all predictors and removes the least important ones",["starts with no predictors and adds significant ones","includes all predictors without elimination","mixes forward and backward selection"],"Backward elimination: start with all variables and remove the unnecessary ones.",1);
m(6,"The 'Stepwise selection' method…","mixes forward and backward selection",["includes all predictors","only removes variables","only adds variables"],"Stepwise: a balance between forward and backward selection, picking the best variables.",1);
m(6,"What is the main disadvantage of the Enter method?","It does not eliminate irrelevant predictors",["It can be unstable with multicollinearity","It may overlook variables that become relevant only when others are included","It may keep redundant variables if they are not detected"],"Enter includes all variables from the start but does not eliminate irrelevant ones.",2);
m(6,"What is the main disadvantage of forward selection?","It may overlook important variables that become relevant only when others are included",["It does not eliminate irrelevant predictors","It can be unstable with a small dataset","It may keep redundant variables"],"Forward builds the model from scratch with the most significant variables.",2);
m(6,"What is the main disadvantage of backward elimination?","It may keep redundant variables if they are not detected correctly",["It does not eliminate irrelevant predictors","It may overlook variables that become relevant only with others","It can be unstable with multicollinearity"],"Backward starts with all variables and eliminates the unnecessary ones, but may keep redundant ones.",2);
m(6,"What is the main disadvantage of stepwise selection?","It can be unstable if there is multicollinearity or a small dataset",["It does not eliminate irrelevant predictors","It never removes variables","It requires a clear theoretical framework"],"Stepwise balances forward and backward but can be unstable.",2);
m(6,"According to the slides, which method should you use if you need automation?","Stepwise",["Enter","Forward or backward","None"],"If you need automation, use stepwise.",2);
m(6,"According to the slides, which method should you use if you want more control?","Forward or backward",["Stepwise","Enter","None"],"If you want more control, use forward or backward.",2);
m(6,"According to the slides, which method should you use if you have a clear theoretical framework?","Enter",["Stepwise","Forward","Backward"],"If you have a clear theoretical framework, use enter.",2);

// =====================================================================
// 7. Calculation practice (formulas of the slides, numbers invented for training)
// =====================================================================
{ // slope from r, sY, sX
  const r=0.6,sY=15,sX=5,b1=r*sY/sX;
  m(7,`In a simple regression, r = ${r}, sY = ${sY} and sX = ${sX}. What is the slope b1?`,num(b1,1),[num(r*sX/sY,1),num(r*sY,0),num(sY/sX,0)],`b1 = r·sY/sX = ${r}·${sY}/${sX} = ${num(b1,1)}.`,2);
}
{ // intercept
  const xb=40,yb=100,b1=1.5,b0=yb-b1*xb;
  m(7,`A regression has x̄ = ${xb}, ȳ = ${yb} and b1 = ${b1}. What is the intercept b0?`,num(b0,0),[num(yb+b1*xb,0),num(xb-b1*yb,0),num(yb-b1,1)],`b0 = ȳ − b1·x̄ = ${yb} − ${b1}·${xb} = ${num(b0,0)}.`,2);
}
{ // slope from covariance and variance
  const cov=18,sX=3,b1=cov/(sX*sX);
  m(7,`Cov(X,Y) = ${cov} and sX = ${sX}. What is the OLS slope b1?`,num(b1,0),[num(cov/sX,0),num(sX*sX/cov,1),num(cov*sX*sX,0)],`b1 = Cov(X,Y)/s²X = ${cov}/${sX*sX} = ${num(b1,0)}.`,2);
}
{ // r from covariance
  const cov=24,sX=4,sY=8,r=cov/(sX*sY);
  m(7,`Cov(X,Y) = ${cov}, sX = ${sX} and sY = ${sY}. What is Pearson's r?`,num(r,2),[num(cov/sY,0),num(cov/sX,0),num(cov/(sX*sY*sY),2)],`r = Cov/(sX·sY) = ${cov}/${sX*sY} = ${num(r,2)}.`,2);
}
{ // R2 from SST and SSR
  const sst=500,ssr=125,sse=sst-ssr,R=sse/sst;
  m(7,`In a regression, the total sum of squares is SST = ${sst} and the residual sum of squares is SSR = ${ssr}. What is R²?`,num(R,2),[num(ssr/sst,2),num(sst/(sst+ssr),2),num(sse/ssr,0)],`Explained SS = SST − SSR = ${sse}, so R² = ${sse}/${sst} = ${num(R,2)}.`,2);
}
{ // r from R2
  const R2=0.64,r=Math.sqrt(R2);
  m(7,`In a simple regression, R² = ${R2} and the slope b1 is positive. What is Pearson's r?`,"+"+num(r,1),["−"+num(r,1),num(R2,2),num(R2/2,2)],`r = ±√R² with the sign of b1: +√${R2} = +${num(r,1)}.`,2);
}
{ // explained SS from slope
  const b1=2,sxx=50,sse=b1*b1*sxx;
  m(7,`In a simple regression, b1 = ${b1} and Σ(xi − x̄)² = ${sxx}. What is the explained sum of squares?`,num(sse,0),[num(b1*sxx,0),num(b1+sxx,0),num(sxx/b1,0)],`SSExplained = b1²·Σ(xi − x̄)² = ${b1}²·${sxx} = ${num(sse,0)}.`,3);
}
{ // residual variance SLR
  const n=22,ssr=360,s2=ssr/(n-2);
  m(7,`In a simple regression with n = ${n} observations the residual sum of squares is ${ssr}. What is the residual variance s²R?`,num(s2,0),[num(ssr/n,2),num(ssr/(n-1),2),num(ssr/(n-3),2)],`s²R = SSResidual/(n − 2) = ${ssr}/${n-2} = ${num(s2,0)}.`,2);
}
{ // residual variance MLR
  const n=30,k=4,ssr=500,s2=ssr/(n-k-1);
  m(7,`In a multiple regression with n = ${n} observations and k = ${k} independent variables the residual sum of squares is ${ssr}. What is s²R?`,num(s2,0),[num(ssr/n,2),num(ssr/(n-1),2),num(ssr/(n-k),2)],`s²R = SSResidual/(n − (k + 1)) = ${ssr}/${n-k-1} = ${num(s2,0)}.`,3);
}
{ // F from SSE, SSR, SLR
  const sse=300,ssr=240,n=26,F=sse/(ssr/(n-2));
  m(7,`In a simple regression with n = ${n}, the explained sum of squares is ${sse} and the residual sum of squares is ${ssr}. What is the F statistic?`,num(F,0),[num(sse/ssr,2),num(sse/(ssr/n),1),num(sse/(ssr/(n-1)),2)],`F = (SSE/1)/(SSR/(n − 2)) = ${sse}/(${ssr}/${n-2}) = ${num(F,0)}.`,3);
}
{ // F from R2
  const n=12,R2=0.5,F=(n-2)*R2/(1-R2);
  m(7,`In a simple regression with n = ${n}, R² = ${R2}. What is the F statistic of the model?`,num(F,0),[num(R2/(1-R2),0),num((n-1)*R2/(1-R2),0),num(n*R2/(1-R2),0)],`F = (n − 2)·R²/(1 − R²) = ${n-2}·${R2}/${1-R2} = ${num(F,0)}.`,3);
}
{ // F from MS (MLR)
  const msE=500,msR=50,F=msE/msR;
  m(7,`In a multiple regression ANOVA table the mean square of the regression is ${msE} and the mean square of the residual is ${msR}. What is F?`,num(F,0),[num(msR/msE,1),num(msE-msR,0),num(msE+msR,0)],`F = S²Explained/S²Residual = ${msE}/${msR} = ${num(F,0)}.`,2);
}
{ // adjusted R2
  const n=21,k=4,R2=0.76,adj=1-(n-1)/(n-(k+1))*(1-R2);
  m(7,`A multiple regression with n = ${n} and k = ${k} has R² = ${R2}. What is the adjusted R²?`,num(adj,2),[num(R2,2),num(1-(n-1)/(n-k)*(1-R2),2),num(1-(n-1)/(n-1-2*k)*(1-R2),2)],`R²adj = 1 − (n − 1)/(n − (k + 1))·(1 − R²) = 1 − ${n-1}/${n-k-1}·${num(1-R2,2)} = ${num(adj,2)}.`,3);
}
{ // VIF from R2i
  const R2i=0.75,tol=1-R2i,vif=1/tol;
  m(7,`Regressing Xi on the other independent variables gives R²i = ${R2i}. What is the VIF of Xi?`,num(vif,0),[num(tol,2),num(R2i,2),num(1/R2i,2)],`Tolerance = 1 − R²i = ${num(tol,2)}; VIF = 1/Tolerance = ${num(vif,0)}.`,2);
}
{ // tolerance from VIF
  const vif=2.5,tol=1/vif;
  m(7,`A regressor has a VIF of ${vif}. What is its tolerance?`,num(tol,1),[num(1-tol,1),num(vif,1),num(1/(vif*vif),2)],`Tolerance = 1/VIF = 1/${vif} = ${num(tol,1)}.`,2);
}
{ // t statistic
  const b=1.2,se=0.4,t=b/se;
  m(7,`In a multiple regression b2 = ${b} and its standard error is ${se}. What is the t statistic for H0: β2 = 0?`,num(t,0),[num(se/b,2),num(b*se,2),num(b-se,1)],`t = b2/s(b2) = ${b}/${se} = ${num(t,0)}.`,2);
}
{ // confidence interval
  const b=0.5,se=0.1,tc=2,lo=b-tc*se,hi=b+tc*se;
  m(7,`A coefficient has b = ${b}, standard error ${se} and the critical value t = ${tc} for 95% confidence. What is the 95% confidence interval for β?`,`[${num(lo,1)}; ${num(hi,1)}]`,[`[${num(b-se,1)}; ${num(b+se,1)}]`,`[${num(b-3*se,1)}; ${num(b+3*se,1)}]`,`[${num(b-tc,1)}; ${num(b+tc,1)}]`],`b ± t·ee(b) = ${b} ± ${tc}·${se} = [${num(lo,1)}; ${num(hi,1)}].`,3);
}
{ // SLR prediction
  const b0=12,b1=3.5,x=10,y=b0+b1*x;
  m(7,`A simple regression gives ŷ = ${b0} + ${b1}·x. What is the point prediction for x = ${x}?`,num(y,0),[num(b1*x,0),num(b0+b1,1),num(b0*x,0)],`ŷ = ${b0} + ${b1}·${x} = ${num(y,0)}.`,1);
}
{ // MLR prediction
  const b0=5,b1=2,b2=-3,x1=10,x2=4,y=b0+b1*x1+b2*x2;
  m(7,`A multiple regression gives ŷ = ${b0} + ${b1}·x1 − ${-b2}·x2. What is the point prediction for x1 = ${x1} and x2 = ${x2}?`,num(y,0),[num(b0+b1*x1-b2*x2,0),num(b0+b1*x1,0),num(b1*x1+b2*x2,0)],`ŷ = ${b0} + ${b1}·${x1} − ${-b2}·${x2} = ${num(y,0)}.`,2);
}
{ // MLR interpretation numeric
  const b2=-3,dx=2,dy=b2*dx;
  m(7,`In ŷ = 5 + 2·x1 − 3·x2, by how much does the mean of Y change when x2 increases by ${dx} units and x1 is kept constant?`,"It decreases by "+num(-dy,0),["It increases by "+num(-dy,0),"It decreases by "+num(-b2,0),"It decreases by "+num(-dy+2*dx,0)],`Change = b2·Δx2 = ${b2}·${dx} = ${num(dy,0)}.`,2);
}
{ // df SLR
  const n=15;
  m(7,`A simple regression uses n = ${n} observations. How is the F distribution of its F-test written?`,`F(1, ${n-2})`,[`F(1, ${n-1})`,`F(2, ${n-2})`,`F(1, ${n})`],`F → F(1, n − 2) = F(1, ${n-2}).`,2);
}
{ // df MLR
  const n=40,k=5;
  m(7,`A multiple regression has n = ${n} observations and k = ${k} independent variables. How many degrees of freedom does the residual have?`,num(n-k-1,0),[num(n-k,0),num(n-1,0),num(n-2,0)],`Residual df = n − (k + 1) = ${n}−${k+1} = ${n-k-1}.`,2);
}
{ // slide data: R2
  const sse=3200.123,sst=3713.6,R2=sse/sst;
  m(7,`In the grade example's ANOVA table, SS regression = ${sse} and SS total = ${sst}. What is R²?`,num(R2,3),[num(1-R2,3),"0.928",num(513.477/sse,3)],`R² = SSE/SST = ${sse}/${sst} = ${num(R2,3)}.`,2);
}
{ // slide data: F
  const msE=3200.123,msR=64.185,F=msE/msR;
  m(7,`In the grade example's ANOVA table the mean squares are ${msE} (regression) and ${msR} (residual). What is F?`,num(F,1),["7.1","0.02","8.0"],`F = ${msE}/${msR} = ${num(F,1)} (the slide shows 49.858).`,2);
}
{ // slide data: adj R2 homicide
  const n=14,k=2,R2=0.648,adj=1-(n-1)/(n-(k+1))*(1-R2);
  m(7,`Homicide example: n = ${n}, k = ${k} and R² = ${R2}. What is the adjusted R²?`,num(adj,3),[num(R2,3),num(1-(n-1)/(n-k)*(1-R2),3),num(1-n/(n-k-1)*(1-R2),3)],`R²adj = 1 − 13/11·(1 − .648) = ${num(adj,3)}, as in the slide.`,3);
}

// ---------- written (typed) questions ----------
ty(1,"What does OLS stand for? (three words)",["ordinary least squares","ordinary least square"],"OLS = Ordinary Least Squares: the method that minimises the sum of squared prediction errors.",1);
ty(2,"Which assumption states that the errors have the same variance for all values? (one word)",["homoscedasticity","homocedasticity"],"Homoscedasticity: errors centred on 0 with constant variance σ².",1);
ty(2,"Which assumption states that the errors are independent of x and not correlated with each other? (one word)",["randomness"],"Randomness: εi independent of x and uncorrelated among themselves; checked with residuals versus order.",1);
ty(4,"Which MLR assumption excludes a perfect linear combination of the independent variables? (one word)",["multicollinearity","no multicollinearity"],"No multicollinearity: no perfect linear combination of the independent variables.",1);
ty(5,"What does VIF stand for? (three words)",["variance inflation factor"],"VIF = Variance Inflation Factor = 1/Tolerance.",1);
ty(5,"Besides the histogram of the residuals, which plot is used to check normality? (name it)",["Q-Q plot","QQ plot","Henry's line","Henry line","normal plot","normal probability plot","normal plot of residuals"],"The slides use the histogram of the residuals and the Q-Q plot (Henry's line).",2);
ty(6,"Which variable selection method starts with all predictors and removes the least important ones? (two words)",["backward elimination","backward"],"Backward elimination: start with all variables and eliminate the unnecessary ones.",1);
ty(6,"Which variable selection method starts with no predictors and adds the significant ones? (two words)",["forward selection","forward"],"Forward selection: start from scratch and add the most significant variables.",1);
ty(6,"Which variable selection method mixes forward and backward selection? (one word)",["stepwise","stepwise selection"],"Stepwise: a balance between forward and backward selection.",1);
ty(6,"Which method includes all the predictors without eliminating any? (one word)",["enter","enter method"],"Enter includes all predictors from the start and does not eliminate irrelevant ones.",1);
ty(1,"In the slides' notation, what does SSE denote? (three words)",["explained sum of squares","explained sum of square","explained ss"],"In the slides SST = SSE + SSR: SSE is the explained sum of squares and SSR the residual sum of squares.",2);
ty(1,"Dividing the covariance by sX·sY gives which coefficient? (two words)",["Pearson's correlation coefficient","Pearson correlation coefficient","Pearson correlation","correlation coefficient","Pearson's linear correlation coefficient","Pearson's r"],"r = Cov(X,Y)/(sX·sY) is Pearson's linear correlation coefficient.",1);
ty(3,"In simple regression, the t-test and the F-test of the slope give the same what? (one word)",["p-value","p value","pvalue"],"They give the same p-value and therefore the same conclusion.",1);
ty(3,"A simple regression uses n = 10 observations. How many residual degrees of freedom? (a number)",["8"],"Residual df = n − 2 = 8 (as in the grade example's ANOVA table).",2);
ty(4,"In the homicide example, which explanatory variable has a negative coefficient? (two words)",["police rate","the police rate","police"],"b2 = −0.185 is the coefficient of the police rate; the poverty coefficient is +0.687.",1);
ty(6,"Which coefficient penalises the entry of new regressors? (two words)",["adjusted R²","adjusted R2","adjusted R squared","adjusted r","adjusted coefficient of determination"],"The adjusted R² is the simplicity criterion that penalises the entry of new regressors.",2);
ty(6,"In the homicide example, the greater standardised coefficient in absolute value (.853) belongs to which explanatory variable? (two words)",["poverty rate","the poverty rate","poverty"],"The larger absolute standardised coefficient (|.853| > |−.430|) means a greater effect.",2);
{
  const r=0.5,sY=24,sX=4;
  ty(7,`Simple regression with r = ${r}, sY = ${sY} and sX = ${sX}. What is the slope b1? (a number)`,[num(r*sY/sX,0)],`b1 = r·sY/sX = ${r}·${sY}/${sX} = ${num(r*sY/sX,0)}.`,2);
}
{
  const xb=50,yb=120,b1=2;
  ty(7,`Simple regression with x̄ = ${xb}, ȳ = ${yb} and b1 = ${b1}. What is the intercept b0? (a number)`,[num(yb-b1*xb,0)],`b0 = ȳ − b1·x̄ = ${yb} − ${b1}·${xb} = ${num(yb-b1*xb,0)}.`,2);
}
{
  const n=12,R2=0.5;
  ty(7,`Simple regression with n = ${n} and R² = ${R2}. What is the F statistic? (a number)`,[num((n-2)*R2/(1-R2),0)],`F = (n − 2)·R²/(1 − R²) = ${n-2}·${R2}/${1-R2} = ${num((n-2)*R2/(1-R2),0)}.`,3);
}
{
  const n=30,k=4;
  ty(7,`Multiple regression with n = ${n} observations and k = ${k} independent variables. How many residual degrees of freedom? (a number)`,[num(n-k-1,0)],`n − (k + 1) = ${n} − ${k+1} = ${n-k-1}.`,2);
}
{
  const n=22,ssr=360;
  ty(7,`Simple regression with n = ${n} and residual sum of squares ${ssr}. What is the residual variance s²R? (a number)`,[num(ssr/(n-2),0)],`s²R = SSResidual/(n − 2) = ${ssr}/${n-2} = ${num(ssr/(n-2),0)}.`,2);
}
{
  const tol=0.25;
  ty(7,`A regressor has a tolerance of ${tol}. What is its VIF? (a number)`,[num(1/tol,0)],`VIF = 1/Tolerance = 1/${tol} = ${num(1/tol,0)}.`,2);
}
{
  const sst=80,ssr=20;
  ty(7,`In a regression SST = ${sst} and the residual sum of squares is SSR = ${ssr}. What is the explained sum of squares (SSE in the slides)? (a number)`,[num(sst-ssr,0)],`SST = SSE + SSR, so SSE = ${sst} − ${ssr} = ${sst-ssr}.`,2);
}
{
  const R2=0.49;
  ty(7,`R² = ${R2}. What percentage of the variation of Y is explained by the model? (a number)`,[num(R2*100,0),num(R2*100,0)+"%"],`R² is the proportion explained: ${R2} = ${num(R2*100,0)}%.`,1);
}

return {id:"regression",group:"esade",title:"Unit 5 · Linear Regression",kw:"statistics regression linear regression SLR MLR SAD statistical analysis data unit 5 R2 OLS residuals multicollinearity VIF ANOVA F-test t-test adjusted R2 esade maths",subject:"SAD · Descriptive SLR, simple and multiple linear regression model (slides B5)",lang:"en",sess:SESS,tags:TAGS,unit:["chapter","chapters","a chapter"],balance:true,Q,TQ};
})();
