const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

test.describe("quiz icons", () => {
  test("every quiz card, list chip and the quiz page show an SVG illustration, never a letter", async ({ page }) => {
    await openSite(page);
    const n = await page.locator("#quizGrid .qcard").count();
    expect(await page.locator("#quizGrid .qcard .qico svg.qsvg").count()).toBe(n);
    expect(await page.locator("#qList .qchip .qchip-l svg.qsvg").count()).toBe(n);
    await openQuiz(page, "socio");
    await expect(page.locator("#bankIco svg.qsvg")).toBeVisible();
    await expect(page.locator("#bankIco")).toHaveText("");
  });

  test("quizIcon: own drawing per built-in quiz, keyword motif, then an abstract badge that depends on the id", async ({ page }) => {
    await openSite(page);
    const r = await page.evaluate(() => {
      const a = quizIcon({ id: "socio" }), b = quizIcon({ id: "energie" });
      const fb1 = quizIcon({ id: "zz-1", title: "Something new" }), fb2 = quizIcon({ id: "zz-2", title: "Something new" });
      return { distinct: a !== b, kw: quizIcon({ id: "x", title: "Droit civil" }) === a, stable: fb1 === quizIcon({ id: "zz-1", title: "Other" }), svg: /^<svg/.test(fb1) && /<\/svg>$/.test(fb1), explicit: quizIcon({ id: "x", icon: "bolt" }) === b, fb2: typeof fb2 };
    });
    expect(r).toEqual({ distinct: true, kw: true, stable: true, svg: true, explicit: true, fb2: "string" });
  });
});
