const { test, expect } = require("@playwright/test");
const { openSite, openQuiz, answerRight } = require("./helpers");

// The student app runs under the same Content-Security-Policy as production (tests/server.js reads it from vercel.json).
// Any script, style or connection the policy blocks is reported by the browser: there must be none.
test("the student app works under its Content-Security-Policy without a single violation", async ({ page }) => {
  await page.addInitScript(() => {
    window.__csp = [];
    document.addEventListener("securitypolicyviolation", e => window.__csp.push(e.violatedDirective + " " + e.blockedURI + " " + (e.sourceFile || "") + ":" + (e.lineNumber || "")));
  });
  const res = page.waitForResponse(r => new URL(r.url()).pathname === "/");
  await openSite(page);
  expect((await res).headers()["content-security-policy"]).toContain("script-src 'self'");
  await expect(page.locator("html")).toHaveAttribute("data-theme", /light|dark/);   // the start-up script ran
  await openQuiz(page, "socio");
  await page.locator("#playTab").click();
  await page.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
  await page.locator("#lenChips button", { hasText: /^5$/ }).click();
  await page.locator("#soloBtn").click();
  await expect(page.locator("#qNum")).toContainText("Question 1 / 5");
  await answerRight(page);
  await expect(page.locator("#reveal")).toBeVisible();
  await page.locator("#accBtn").click();
  expect(await page.evaluate(() => window.__csp)).toEqual([]);
});
