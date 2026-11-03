// The three fun quizzes (US, FR, UK) open and play a solo round.
const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

for (const id of ["uspop", "gastro", "ukculture"]) {
  test(`quiz ${id} opens and offers questions`, async ({ page }) => {
    await openSite(page);
    await openQuiz(page, id);
    await page.locator("#playTab").click();
    await page.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
    await page.locator("#lenChips button", { hasText: /^5$/ }).click();
    await page.locator("#soloBtn").click();
    await expect(page.locator("#qTiles .tile")).toHaveCount(4);
  });
}
