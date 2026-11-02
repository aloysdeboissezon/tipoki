const { test, expect } = require("@playwright/test");
const { openSite, openQuiz, playRound, answerRight, answerWrong } = require("./helpers");

test.describe("solo quiz", () => {
  test("the home page lists the built-in quizzes and opens one", async ({ page }) => {
    await openSite(page);
    expect(await page.locator("#quizGrid .qcard").count()).toBeGreaterThanOrEqual(3);
    await openQuiz(page, "socio");
    await expect(page.locator("#bankTitle")).toContainText("Socio");
  });

  test("a full round: right answer scores, reveal shows, end screen shows the result", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "socio");
    await page.locator("#playTab").click();
    await page.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
    await page.locator("#lenChips button", { hasText: /^5$/ }).click();
    await page.locator("#soloBtn").click();

    await expect(page.locator("#qNum")).toContainText("Question 1 / 5");
    await answerRight(page);
    await expect(page.locator("#reveal")).toBeVisible();
    await expect(page.locator("#rVerdict")).toBeVisible();
    await expect(page.locator("#rBreak")).toContainText(/Base/); // points: base + speed bonus
    await page.locator("#rNext").click();

    await expect(page.locator("#qNum")).toContainText("Question 2 / 5");
    await answerWrong(page);
    await expect(page.locator("#reveal")).toBeVisible();
    await expect(page.locator("#rTiles .tile.right")).toBeVisible(); // the right answer is highlighted
    await expect(page.locator("#rTiles .tile.mine")).toBeVisible(); // and so is the wrong pick
  });

  test("the end screen is reached after 5 questions", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "socio");
    await playRound(page);
    await expect(page.locator("#endTitle")).toBeVisible();
    await expect(page.locator("#endHome")).toBeVisible();
  });

  test("a wrong answer lands in 'missed questions' and can be replayed", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "socio");
    await playRound(page, { wrongAt: [0, 1] });
    const n = await page.evaluate(() => JSON.parse(localStorage.getItem(lsKey("miss")) || "[]").length);
    expect(n).toBe(2);
    await expect(page.locator("#endBankBtn")).toBeVisible();
    await page.locator("#endBankBtn").click();
    await expect(page.locator("#question")).toBeVisible();
    await expect(page.locator("#qNum")).toContainText("Question 1 / 2");
    await answerRight(page);
    await expect(page.locator("#reveal")).toBeVisible();
  });

  test("a hint hides two wrong answers and costs points", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "culture");
    await page.locator("#playTab").click();
    await page.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
    await page.locator("#lenChips button", { hasText: /^5$/ }).click();
    await page.locator("#soloBtn").click();

    await expect(page.locator("#qTiles .tile")).toHaveCount(4);
    await expect(page.locator("#qHintRow")).toBeVisible();
    await page.locator("#qHint2").click();
    await expect(page.locator("#qTiles .tile:not([hidden])")).toHaveCount(2);
    await expect(page.locator("#qHintRow")).toBeHidden(); // one hint per question

    // the right answer is always still there
    await answerRight(page);
    await expect(page.locator("#reveal")).toBeVisible();
    await expect(page.locator("#rBreak")).toContainText(/hint/i);
  });
});
