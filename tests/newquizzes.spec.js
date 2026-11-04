// The three fun quizzes (US, FR, UK) open and play a solo round.
const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

for (const id of ["uspop", "gastro", "ukculture", "startups", "brands", "barcelona", "finance", "econ", "strategy", "jargon", "bigtech", "worldtour", "emoji", "internet", "hits", "screen", "sports", "gamer", "kids", "myths", "foodtravel","countryclues","oddemoji","braintraps","kwave","korea","regression"]) {
  test(`quiz ${id} opens and offers questions`, async ({ page }) => {
    await openSite(page);
    await openQuiz(page, id);
    await page.locator("#playTab").click();
    await page.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
    await page.locator("#lenChips button", { hasText: /^5$/ }).click();
    await page.locator("#soloBtn").click();
    // a question offers answer tiles: 4 for multiple choice, 2 when the draw gives a true/false one
    await expect.poll(async () => [2, 4].includes(await page.locator("#qTiles .tile").count())).toBe(true);
  });
}
