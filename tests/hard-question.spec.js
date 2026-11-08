// Calculation exercises get extra time (field x in the bank) and a "Hard question" banner; ordinary questions are untouched.
const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

test("hard question: more time, banner shown, ordinary question unchanged", async ({ page }) => {
  await openSite(page);
  await openQuiz(page, "energie");
  const r = await page.evaluate(() => {
    G = { T: 20, deck: [{ id: Q.findIndex(q => !q.x && q.q.length < 100), o: [0, 1, 2, 3] }, { id: Q.findIndex(q => q.x >= 20), o: [0, 1, 2, 3] }] };
    return { easy: qT(0), hard: qT(1), isHardEasy: isHard(0), isHardHard: isHard(1), x: Q[G.deck[1].id].x };
  });
  expect(r.easy).toBe(20000);
  expect(r.hard).toBe(20000 + r.x * 1000);
  expect(r.isHardEasy).toBe(false);
  expect(r.isHardHard).toBe(true);
});

test("banner appears on a hard question", async ({ page }) => {
  await openSite(page);
  await openQuiz(page, "energie");
  await page.locator("#playTab").click();
  await page.locator("#lenChips button", { hasText: /^5$/ }).click();
  await page.locator("#soloBtn").click();
  await expect(page.locator("#question")).toBeVisible();
  await page.evaluate(() => {
    const i = Q.findIndex(q => q.x >= 20);
    G.deck[G.qi] = { id: i, o: [0, 1, 2, 3] };
    local.hardQ = null; renderQuestion();
  });
  await expect(page.locator("#qHard")).toBeVisible();
  await expect(page.locator("#qHardTxt")).toHaveText("Hard question");
  await expect(page.locator("#qHardChip")).toContainText("+25 s");
});
