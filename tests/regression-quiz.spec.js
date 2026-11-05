// The statistics quiz (Unit 5, linear regression): header text, typed numbers, and a full round in every language.
const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

test("typed numbers: a decimal never passes for the integer without its point", async ({ page }) => {
  await openSite(page);
  const r = await page.evaluate(() => ({
    exact: checkTyped("18", ["18"]), dec: checkTyped("1.8", ["18"]), comma: checkTyped("0,4", ["4"]), pct: checkTyped("49%", ["49", "49%"]),
    decAnswer: checkTyped("1.5", ["1.5"]),
  }));
  expect(r).toEqual({ exact: true, dec: false, comma: false, pct: true, decAnswer: true });
});

for (const lang of ["en", "fr", "es", "ko"]) {
  test(`regression quiz plays a round in ${lang} with a clean question header`, async ({ page }) => {
    await openSite(page, { path: "/?lang=" + lang });
    await openQuiz(page, "regression");
    await page.locator("#playTab").click();
    await page.locator("#lenChips button", { hasText: /^5$/ }).click();
    await page.locator("#soloBtn").click();
    for (let i = 0; i < 5; i++) {
      await expect(page.locator("#question")).toBeVisible();
      await page.waitForFunction(() => document.getElementById("qIntro").hidden);
      const head = await page.locator("#qNum").innerText();
      expect(head).not.toMatch(/·\s*·/);
      expect(head.trim().endsWith("·")).toBe(false);
      if (await page.evaluate(() => isT(G.qi))) {
        await page.locator("#qInput").fill(await page.evaluate(() => TQ[G.deck[G.qi].t].a[0]));
        await page.locator("#qSend").click();
      } else {
        const k = await page.evaluate(() => correctPos(G.qi));
        await page.locator(`#qTiles .tile[data-k="${k}"]`).click();
      }
      await expect(page.locator("#reveal")).toBeVisible();
      await expect(page.locator("#rNum")).not.toContainText("· ·");
      await page.locator("#rNext").click();
    }
    await expect(page.locator("#end")).toBeVisible();
  });
}
