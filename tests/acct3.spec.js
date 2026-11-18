const { test, expect } = require("@playwright/test");
const { openSite, openQuiz, playRound } = require("./helpers");

// Accounting test 3 (ESADE): built from the Financial Analysis Exam Lab page (tools/build-acct3.js) and shown like every other quiz
test.describe("Accounting test 3", () => {
  test("is an ESADE quiz with a study sheet, flashcards, a quiz mode and 20 mock exams", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "acct3");
    await expect(page.locator("#bankTitle")).toHaveText("Accounting test 3");
    await expect(page.locator("#sheetCard")).toBeVisible();
    await expect(page.locator("#cardsJump")).toBeVisible();
    await expect(page.locator("#playTab")).toBeVisible();
    await page.locator("#examJump").click();
    await expect(page.locator("#exMockChips button")).toHaveCount(21);   // Random + Test A to T
    await expect(page.locator("#exMockChips button").nth(1)).toHaveText("Test A");
  });

  test("a mock exam is the page's 5 questions on a 13-minute clock, scored +2 / −0.5 / 0, best kept", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "acct3");
    await page.locator("#examJump").click();
    await page.locator("#exMockChips button", { hasText: "Test A" }).click();
    await expect(page.locator("#exSum")).toContainText("5 questions · 13 min on the clock · scored +2 / −0.5 / 0");
    await page.locator("#exGo").click();
    await expect(page.locator("#exPlay")).toBeVisible();
    expect(await page.evaluate(() => EX.deck.length)).toBe(5);
    expect(await page.evaluate(() => EX.total)).toBe(13 * 60000);
    for (let i = 0; i < 5; i++) {
      const d = await page.evaluate(() => { const d = EX.deck[EX.i]; return d.t != null ? { a: TQ[d.t].a[0] } : { k: d.o.indexOf(0) }; });
      if (d.a != null) await page.locator("#exInput").fill(d.a);
      else await page.locator(`#exTiles .tile[data-k="${d.k}"]`).click();
      await page.locator("#exNext").click();
    }
    await expect(page.locator("#exDone")).toBeVisible();
    await expect(page.locator("#exGrade")).toHaveText("20");
    await expect(page.locator("#exMeta")).toContainText("Exam score: 10 / 10");
    expect(await page.evaluate(() => localStorage.getItem("fa-best-0"))).toBe("10");
  });

  test("a quiz round plays", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "acct3");
    await playRound(page, { wrongAt: [1] });
  });

  test("typed numbers accept any value within the page's tolerance", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "acct3");
    const r = await page.evaluate(() => { const i = TQ.findIndex(q => /quick ratio\?/.test(q.q)); return ["0.9", "0,90", "0.91", "0.93", "9"].map(x => checkTyped(x, TQ[i].a, TQ[i].n)); });
    expect(r).toEqual([true, true, true, false, false]);
  });

  test("the right answer shown is the exact value, not the edge of the tolerance", async ({ page }) => {
    await openSite(page);
    await openQuiz(page, "acct3");
    const shown = await page.evaluate(() => ["share price", "working capital", "quick ratio\\?", "days of sales are in receivables"].map(k => TQ.find(q => new RegExp(k).test(q.q)).a[0]));
    expect(shown).toEqual(["20", "100", "0.9", "30.4"]);
    const ok = await page.evaluate(() => { const q = TQ.find(q => /days of sales are in receivables/.test(q.q)); return ["30.4 days", "30,4", "30.6", "31"].map(x => checkTyped(x, q.a, q.n)); });
    expect(ok).toEqual([true, true, true, false]);
  });
});
