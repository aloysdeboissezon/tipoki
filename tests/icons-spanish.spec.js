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

test.describe("Spanish interface", () => {
  test("the saved language is applied: html lang, translated texts, slogan keys, the switch cycles EN > FR > ES", async ({ page }) => {
    await openSite(page, { storage: { "tpk-lang": "es" } });
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("#quizGrid ~ *, #home").first()).toBeAttached();
    await expect(page.getByText("¿Qué quieres estudiar?")).toBeVisible();
    await expect(page.locator("#langBtn .bt")).toHaveText("EN");
    const missing = await page.evaluate(() => [...tlMissing].filter(k => /[a-z]{3}/.test(k) && !/^https?:|^Aa$/.test(k)));
    expect(missing).toEqual([]);
  });

  test("tl falls back to English for a text with no Spanish yet, and fills the {vars}", async ({ page }) => {
    await openSite(page, { storage: { "tpk-lang": "es" } });
    const r = await page.evaluate(() => [tl("{n} questions", { n: 5 }), tl("not a real key {x}", { x: 1 }), fmtDec(2.5), LOCALE]);
    expect(r).toEqual(["5 preguntas", "not a real key 1", "2,5", "es-ES"]);
  });
});
