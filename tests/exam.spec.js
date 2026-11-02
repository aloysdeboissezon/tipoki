const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

async function startExam(page) {
  await page.locator("#examJump").click();
  await page.locator("#exLenChips button").first().click(); // 20 questions
  await page.locator("#exPaceChips button", { hasText: "No time limit" }).click();
  await page.locator("#exGo").click();
  await expect(page.locator("#exPlay")).toBeVisible();
}

test.describe("exam mode", () => {
  test("hand in with everything right gives 20/20; nothing is corrected before", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "culture");
    await page.evaluate(() => { settings.fmt = "mcq"; }); // multiple choice only, so every answer is a tile
    await startExam(page);

    const n = await page.evaluate(() => EX.deck.length);
    expect(n).toBeGreaterThan(1);
    for (let i = 0; i < n; i++) {
      const k = await page.evaluate(() => EX.deck[EX.i].o.indexOf(0));
      await page.locator(`#exTiles .tile[data-k="${k}"]`).click();
      // no correction while the exam is on
      await expect(page.locator("#exTiles .tile.right")).toHaveCount(0);
      if (i < n - 1) await page.locator("#exNext").click();
    }
    await expect(page.locator("#exLeft")).toContainText("all answered");
    await page.locator("#exNext").click(); // "Hand in"
    await expect(page.locator("#exDone")).toBeVisible();
    await expect(page.locator("#exGrade")).toHaveText("20");
    await expect(page.locator("#exBad")).toHaveText("0");
  });

  test("handing in with blanks asks first, then grades out of 20", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "culture");
    await page.evaluate(() => { settings.fmt = "mcq"; });
    await startExam(page);
    const k = await page.evaluate(() => EX.deck[0].o.indexOf(0));
    await page.locator(`#exTiles .tile[data-k="${k}"]`).click();
    await page.evaluate(() => exAsk("hand"));
    await expect(page.locator("#exConfirm")).toBeVisible();
    await expect(page.locator("#exConfirmTxt")).toContainText("not answered");
    await page.locator("#exConfirmOk").click();
    await expect(page.locator("#exDone")).toBeVisible();
    const grade = parseFloat((await page.locator("#exGrade").innerText()).replace(",", "."));
    expect(grade).toBeGreaterThanOrEqual(0);
    expect(grade).toBeLessThan(5);
    await expect(page.locator("#exBlank")).not.toHaveText("0");
    await expect(page.locator("#exRev .ex-ri").first()).toBeVisible(); // review of mistakes
  });

  test("a paused exam is offered again on the quiz page and resumes with its answers", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "culture");
    await page.evaluate(() => { settings.fmt = "mcq"; });
    await startExam(page);
    const k = await page.evaluate(() => EX.deck[0].o.indexOf(0));
    await page.locator(`#exTiles .tile[data-k="${k}"]`).click();
    await page.locator("#exQuit").click();
    await page.locator("#exConfirmOk").click();
    await expect(page.locator("#exPlay")).toBeHidden();
    await expect(page.locator("#exResumeGo")).toBeVisible();
    await page.locator("#exResumeGo").click();
    await expect(page.locator("#exPlay")).toBeVisible();
    await expect(page.locator("#exLeft")).not.toContainText("all answered");
    await expect(page.locator("#exGrid .ex-cell.done")).toHaveCount(1);
  });
});
