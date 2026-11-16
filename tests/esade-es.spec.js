// The 16-17 and 18-19 quizzes must really play in Spanish (questions, options and flashcards), not silently fall back to English.
const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

for (const id of ["resistance", "justice"]) {
  test(`${id}: Spanish interface gives Spanish questions and flashcards`, async ({ page }) => {
    await page.addInitScript(() => { if (!sessionStorage.getItem("__l")) { sessionStorage.setItem("__l", "1"); localStorage.setItem("tpk-lang", "es"); } });
    await openSite(page);
    await openQuiz(page, id);
    await page.locator("#playTab").click();
    await page.locator("#lenChips button", { hasText: /^5$/ }).click();
    await page.locator("#soloBtn").click();
    await expect(page.locator("#question")).toBeVisible();
    expect(await page.evaluate(() => BANK.qlang)).toBe("es");
    expect(await page.evaluate(() => !!BANK.factsEn)).toBe(true);
    expect(await page.evaluate(() => BANK.Q.every(q => !/^(Which|What|How|Why|According)\b/.test(q.q)))).toBe(true);
  });
}
