#!/usr/bin/env python3
"""Independent numeric check of the quiz "regression" (Unit 5, linear regression).
Usage: python3 tools/check-regression.py      (needs numpy and scipy; exits 1 if something is wrong)
1. Re-fits both regressions of the slides from the raw data (10 students; 14 states) and compares every figure printed in the slides.
2. Recomputes each calculation question of the bank from the numbers written in its own statement and compares with the right option.
"""
import json, re, subprocess, sys, pathlib
import numpy as np
from scipy import stats
root = pathlib.Path(__file__).resolve().parent.parent
bank = json.loads(subprocess.check_output(["node", "-e",
    "global.window={};require('./api/_esade/banks/regression.js');console.log(JSON.stringify(window.BANK_REGRESSION))"], cwd=root))
bad = 0
def chk(name, got, want, tol):
    global bad
    ok = abs(got - want) <= tol
    if not ok: bad += 1
    print(("ok   " if ok else "FAIL ") + name, round(float(got), 4), "vs slide", want)

# ---------- 1. slides ----------
h = np.array([30,70,90,100,110,110,130,150,170,190.]); g = np.array([27,35,35,51,55,71,59,72,72,91.])
r = stats.linregress(h, g); n = 10
yh = r.intercept + r.slope*h; sst = ((g-g.mean())**2).sum(); ssr = ((g-yh)**2).sum(); sse = sst-ssr
chk("SLR b0", r.intercept, 11.084, .0006); chk("SLR b1", r.slope, 0.398, .0006)
chk("SLR r", r.rvalue, .928, .0006); chk("SLR R2", r.rvalue**2, .862, .0006)
chk("SLR adj R2", 1-(n-1)/(n-2)*(1-r.rvalue**2), .844, .0006)
chk("SLR SST", sst, 3713.6, .001); chk("SLR SSE (explained)", sse, 3200.123, .001); chk("SLR SSR (residual)", ssr, 513.477, .001)
chk("SLR s2R", ssr/(n-2), 64.185, .001); chk("SLR sR", (ssr/(n-2))**.5, 8.012, .001)
chk("SLR F", sse/(ssr/(n-2)), 49.858, .001); chk("SLR t slope", r.slope/r.stderr, 7.061, .001)
chk("SLR F = t^2", (r.slope/r.stderr)**2, 49.858, .001)
tc = stats.t.ppf(.975, n-2); chk("SLR CI b1 low", r.slope-tc*r.stderr, .268, .0006); chk("SLR CI b1 high", r.slope+tc*r.stderr, .527, .0006)
sx = h.std(ddof=1); s_r = (ssr/(n-2))**.5
def slr_int(x0):
    fit = r.intercept + r.slope*x0; sm = s_r*np.sqrt(1/n+(x0-h.mean())**2/((h-h.mean())**2).sum()); si = s_r*np.sqrt(1+1/n+(x0-h.mean())**2/((h-h.mean())**2).sum())
    return fit, fit-tc*sm, fit+tc*sm, fit-tc*si, fit+tc*si
for x0, w in ((85, (44.87,37.85,51.89,25.11,64.63)), (200, (90.59,78.10,103.07,68.29,112.88))):
    for nm, a, b_ in zip(("pred","CI lo","CI hi","PI lo","PI hi"), slr_int(x0), w): chk(f"SLR x={x0} {nm}", a, b_, .0101)
chk("SLR CI width 85h", slr_int(85)[2]-slr_int(85)[1], 14.04, .011); chk("SLR PI width 85h", slr_int(85)[4]-slr_int(85)[3], 39.52, .011)
print("hours range", h.min(), h.max())

pov = np.array([151,147,104,124,129,109,99,106,73,113,78,207,135,119.])
pol = np.array([185,186,250,149,152,240,100,260,70,120,230,270,165,139.])
hom = np.array([79,56,32,57,75,37,77,22,9,91,35,98,72,71.]); N = 14; k = 2
X = np.c_[np.ones(N), pov, pol]; b = np.linalg.lstsq(X, hom, rcond=None)[0]
e = hom-X@b; SSR = (e**2).sum(); SST = ((hom-hom.mean())**2).sum(); SSE = SST-SSR; R2 = SSE/SST
chk("MLR b0", b[0], 8.006, .0006); chk("MLR b1 poverty", b[1], .687, .0006); chk("MLR b2 police", b[2], -.185, .0006)
chk("MLR R2", R2, .648, .0006); chk("MLR R", R2**.5, .805, .0006); chk("MLR adj R2", 1-(N-1)/(N-k-1)*(1-R2), .584, .0006)
chk("MLR SSE", SSE, 6148.512, .001); chk("MLR SSR", SSR, 3344.417, .001); chk("MLR SST", SST, 9492.929, .001)
chk("MLR MS reg", SSE/k, 3074.256, .001); chk("MLR s2R", SSR/(N-k-1), 304.038, .001); chk("MLR sR", (SSR/(N-k-1))**.5, 17.437, .001)
F = (SSE/k)/(SSR/(N-k-1)); chk("MLR F", F, 10.111, .001); chk("MLR p(F)", stats.f.sf(F, k, N-k-1), .003, .0006)
V = (SSR/(N-k-1))*np.linalg.inv(X.T@X); se = np.sqrt(np.diag(V)); t = b/se
chk("MLR se b0", se[0], 19.797, .001); chk("MLR se b1", se[1], .155, .0006); chk("MLR se b2", se[2], .083, .0006)
chk("MLR t b0", t[0], .404, .001); chk("MLR t b1", t[1], 4.444, .001); chk("MLR t b2", t[2], -2.242, .001)
pv = 2*stats.t.sf(abs(t), N-k-1); chk("MLR p b0", pv[0], .694, .0006); chk("MLR p b2", pv[2], .047, .0006)
tc2 = stats.t.ppf(.975, N-k-1)
for i, (lo, hi) in enumerate(((-35.567, 51.580), (.347, 1.028), (-.367, -.003))):
    chk(f"MLR CI b{i} low", b[i]-tc2*se[i], lo, .0011); chk(f"MLR CI b{i} high", b[i]+tc2*se[i], hi, .0011)
C = np.corrcoef([pov, pol, hom]); chk("corr pov-hom", C[0,2], .698, .0006); chk("corr pol-hom", C[1,2], -.123, .0006); chk("corr pov-pol", C[0,1], .360, .0006)
tol = 1-C[0,1]**2; chk("tolerance", tol, .870, .0006); chk("VIF", 1/tol, 1.149, .0006)
sdx = [pov.std(ddof=1), pol.std(ddof=1)]; sdy = hom.std(ddof=1)
chk("beta std poverty", b[1]*sdx[0]/sdy, .853, .0006); chk("beta std police", b[2]*sdx[1]/sdy, -.430, .0006)
x0 = np.array([1, 150, 100.]); fit = x0@b; hl = x0@np.linalg.inv(X.T@X)@x0; s = (SSR/(N-k-1))**.5
chk("MLR new pred", fit, 92.61, .006); chk("MLR CI mean lo", fit-tc2*s*np.sqrt(hl), 69.91, .006); chk("MLR CI mean hi", fit+tc2*s*np.sqrt(hl), 115.31, .006)
chk("MLR PI lo", fit-tc2*s*np.sqrt(1+hl), 48.02, .006); chk("MLR PI hi", fit+tc2*s*np.sqrt(1+hl), 137.20, .006)
r1 = stats.linregress(pov, hom); chk("MLR model1 R2 (poverty only)", r1.rvalue**2, .487, .0006)
chk("MLR model1 adj R2", 1-(N-1)/(N-2)*(1-r1.rvalue**2), .444, .0006)
chk("MLR model1 sR", (((hom-r1.intercept-r1.slope*pov)**2).sum()/(N-2))**.5, 20.151, .001)
print("ranges poverty", pov.min(), pov.max(), "police", pol.min(), pol.max())

# ---------- 2. calculation questions ----------
def nums(text):
    return [float(x.replace("−","-")) for x in re.findall(r"(?<![A-Za-z²])-?−?\d+(?:\.\d+)?", text)]
def tof(s): return float(re.sub(r"[^\d.\-]", "", s.replace("−", "-")))
checked = 0
for q in bank["Q"]:
    if q["s"] != 7: continue
    text, right = q["q"], q["o"][0]
    v = nums(text.replace("x̄", "xbar").replace("ȳ", "ybar"))
    exp = None
    if "In a simple regression, r =" in text and "What is the slope b1" in text:
        exp = v[0]*v[1]/v[2]
    elif "A regression has x̄" in text:
        xb, yb, b1 = v[0], v[1], v[2]; exp = yb-b1*xb
    elif "OLS slope" in text: exp = v[0]/v[1]**2
    elif "Cov(X,Y) =" in text and "Pearson's r" in text: exp = v[0]/(v[1]*v[2])
    elif "total sum of squares is SST" in text: sst_, ssr_ = v[0], v[1]; exp = (sst_-ssr_)/sst_
    elif "slope b1 is positive" in text: exp = np.sqrt(v[0])
    elif "explained sum of squares?" in text: exp = v[0]**2*v[1]
    elif "simple regression with n =" in text and "residual variance" in text: exp = v[1]/(v[0]-2)
    elif "multiple regression with n =" in text and "s²R" in text: exp = v[2]/(v[0]-v[1]-1)
    elif "explained sum of squares is" in text and "F statistic" in text: n_, sse_, ssr_ = v[0], v[1], v[2]; exp = sse_/(ssr_/(n_-2))
    elif "R² = " in text and "F statistic of the model" in text: n_, R2_ = v[0], v[1]; exp = (n_-2)*R2_/(1-R2_)
    elif "mean square of the regression" in text: exp = v[0]/v[1]
    elif "adjusted R²" in text and "Homicide" not in text: n_, k_, R2_ = v[0], v[1], v[2]; exp = 1-(n_-1)/(n_-k_-1)*(1-R2_)
    elif "VIF of Xi" in text: exp = 1/(1-v[0])
    elif "its tolerance" in text: exp = 1/v[0]
    elif "t statistic for H0" in text: exp = v[0]/v[1]
    elif "95% confidence interval for β" in text: b_, se_, tcv = v[0], v[1], v[2]; exp = f"[{b_-tcv*se_:.1f}; {b_+tcv*se_:.1f}]"
    elif "simple regression gives ŷ" in text: b0_, b1_, x_ = v[0], v[1], v[2]; exp = b0_+b1_*x_
    elif "multiple regression gives ŷ" in text: b0_, b1_, b2_, x1_, x2_ = v[0], v[1], v[2], v[3], v[4]; exp = b0_+b1_*x1_-b2_*x2_
    elif "x2 increases by" in text: exp = "It decreases by " + f"{3*v[-1]:.0f}"
    elif "F-test written" in text: exp = f"F(1, {int(v[0])-2})"
    elif "degrees of freedom does the residual have" in text: exp = v[0]-v[1]-1
    elif "SS regression = " in text: exp = v[0]/v[1]
    elif "mean squares are" in text: exp = v[0]/v[1]
    elif "Homicide example: n =" in text: n_, k_, R2_ = v[0], v[1], v[2]; exp = 1-(n_-1)/(n_-k_-1)*(1-R2_)
    else: continue
    got = right if isinstance(exp, str) else tof(right)
    good = (got == exp) if isinstance(exp, str) else abs(got-exp) <= (0.0006 if "R²" in text and "grade" in text else 0.0051 if abs(exp) < 10 else 0.051)
    # numeric check of the right option AND that no wrong option equals the right value
    if not isinstance(exp, str):
        for w in q["o"][1:]:
            try:
                if abs(tof(w)-tof(right)) < 1e-9: good = False; print("wrong option equals the right one:", text[:60], w)
            except ValueError: pass
    checked += 1
    if not good: bad += 1
    print(("ok   " if good else "FAIL ") + "Q7", text[:70], "->", right, "| expected", exp if isinstance(exp, str) else round(float(exp), 4))
# typed numeric answers
for q in bank["TQ"]:
    text, ans = q["q"], q["a"][0]
    v = nums(text.replace("x̄", "xbar").replace("ȳ", "ybar")); exp = None
    if "What is the slope b1?" in text: exp = v[0]*v[1]/v[2]
    elif "What is the intercept b0?" in text: exp = v[1]-v[2]*v[0]
    elif "What is the F statistic?" in text: exp = (v[0]-2)*v[1]/(1-v[1])
    elif text.startswith("Multiple regression") and "degrees of freedom" in text: exp = v[0]-v[1]-1
    elif "What is its VIF?" in text: exp = 1/v[0]
    elif "explained sum of squares (SSE" in text: exp = v[0]-v[1]
    elif "What percentage" in text: exp = v[0]*100
    elif "residual variance s²R" in text: exp = v[1]/(v[0]-2)
    elif "residual degrees of freedom" in text: exp = v[0]-2
    else: continue
    good = abs(float(ans)-exp) < 1e-9; checked += 1
    if not good: bad += 1
    print(("ok   " if good else "FAIL ") + "TQ", text[:70], "->", ans, "| expected", round(float(exp), 4))
print("calculation questions checked:", checked)
n_calc = sum(1 for q in bank["Q"] if q["s"] == 7)
print("session 7 MCQ:", n_calc, "(slide-based or checked above)")
sys.exit(1 if bad else 0)
