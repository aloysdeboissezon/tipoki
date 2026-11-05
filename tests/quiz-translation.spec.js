// A quiz that ships translations (js/banks/tr/<id>.<lang>.js) is played in the interface language; without one it stays in its own language.
const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

async function firstQuestion(page) {
  await page.locator("#playTab").click();
  await page.locator("#fmtChips button").first().click();   // multiple choice (the label is translated)
  await page.locator("#soloBtn").click();
  await expect(page.locator("#question")).toBeVisible();
  await page.locator("#qTiles .tile").first().waitFor();
  return page.evaluate(() => ({ q: qOf(0).q, opts: (qOf(0).o || []).slice(), lang: BANK.qlang || BANK.lang }));
}

for (const [lang, probe] of [["fr", /Lequel est différent|Que vient ensuite/], ["es", /Cuál es diferente|Qué viene después/], ["ko", /다른 하나는|다음에 올 것은/]]) {
  test(`oddemoji is played in ${lang}`, async ({ page }) => {
    await openSite(page, { path: `/?lang=${lang}` });
    await openQuiz(page, "oddemoji");
    const r = await firstQuestion(page);
    expect(r.q).toMatch(probe);
    expect(r.lang).toBe(lang);
    expect(r.opts.length).toBe(4);
  });
}

test("the same quiz stays in English for an English visitor", async ({ page }) => {
  await openSite(page);
  await openQuiz(page, "oddemoji");
  const r = await firstQuestion(page);
  expect(r.q).toMatch(/Which one is different|What comes next/);
});


test("every translation file matches its quiz and the catalog is up to date", () => {
  const { execFileSync } = require("child_process");
  execFileSync("node", ["tools/check-tr.js"], { stdio: "pipe" });
  execFileSync("node", ["tools/build-catalog.js", "--check"], { stdio: "pipe" });
});
