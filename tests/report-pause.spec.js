const { test, expect } = require("@playwright/test");
const { openSite, openQuiz, answerRight } = require("./helpers");

async function startMcq(page, id = "socio") {
  await openSite(page);
  await openQuiz(page, id);
  await page.locator("#playTab").click();
  await page.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
  await page.locator("#lenChips button", { hasText: /^5$/ }).click();
  await page.locator("#soloBtn").click();
  await expect(page.locator("#qTiles .tile").first()).toBeVisible();
}

test.describe("report a question", () => {
  test("from the answer screen: one tap on a reason sends it, and not twice", async ({ page }) => {
    await startMcq(page);
    await answerRight(page);
    await expect(page.locator("#reveal")).toBeVisible();
    await page.locator("#rReport").click();
    await expect(page.locator("#rReportPick")).toBeVisible();
    await page.locator('#rReportPick [data-why="typo"]').click();

    await expect(page.locator("#rReport")).toContainText("Thanks, reported");
    await expect(page.locator("#rReport")).toBeDisabled();
    await expect.poll(() => page.evaluate(() => window.__inserts.filter(i => i.table === "question_reports").length)).toBe(1);
    const sent = await page.evaluate(() => window.__inserts.find(i => i.table === "question_reports").row);
    expect(sent).toMatchObject({ quiz: "socio", reason: "typo" });
  });

  test("during the question: the flag stops the timer, picking a reason sends it and play goes on", async ({ page }) => {
    await startMcq(page);
    await page.locator("#qFlag").click();
    await expect(page.locator("#qPauseBox")).toBeVisible();
    await expect(page.locator("body")).toHaveClass(/qpaused/);

    // while paused a tile can't be answered
    await page.locator("#qTiles .tile").first().click({ force: true }).catch(() => {});
    await expect(page.locator("#reveal")).toBeHidden();

    await page.locator('#qPauseBox [data-why="wrong"]').click();
    await expect(page.locator("#qPauseBox")).toBeHidden();
    await expect(page.locator("#qFlag")).toBeDisabled(); // already reported
    await expect.poll(() => page.evaluate(() => window.__inserts.some(i => i.table === "question_reports" && i.row.reason === "wrong"))).toBe(true);
    await answerRight(page);
    await expect(page.locator("#reveal")).toBeVisible();
  });

  test("'back' from the report box resumes without sending anything", async ({ page }) => {
    await startMcq(page);
    await page.locator("#qFlag").click();
    await page.locator("#qPauseBack").click();
    await expect(page.locator("#qPauseBox")).toBeHidden();
    expect(await page.evaluate(() => window.__inserts.filter(i => i.table === "question_reports").length)).toBe(0);
  });
});

test.describe("pause and resume", () => {
  test("pausing a solo game keeps it, and the resume card brings it back at the same place", async ({ page }) => {
    await startMcq(page);
    await answerRight(page);
    await page.locator("#rNext").click();
    await expect(page.locator("#qNum")).toContainText("Question 2 / 5");

    await page.locator("#question .pausebtn").click();
    await expect(page.locator("#topic")).toBeVisible();
    await page.locator("#modeBack").click(); // the resume card sits on the quiz page's main menu
    await expect(page.locator("#resumeCard")).toBeVisible();
    await expect(page.locator("#resumeSub")).toContainText("1 / 1 correct");

    // survives a reload
    await page.reload();
    await expect(page.locator("#quizGrid .qcard").first()).toBeVisible();
    await expect(page.locator("#resumeCard")).toBeVisible();
    await page.locator("#resumeGo").click();
    await expect(page.locator("#question")).toBeVisible();
    await expect(page.locator("#qNum")).toContainText("Question 2 / 5");
  });

  test("a paused game can be discarded", async ({ page }) => {
    await startMcq(page);
    await answerRight(page);
    await page.locator("#reveal .pausebtn").click();
    await page.locator("#modeBack").click();
    await expect(page.locator("#resumeCard")).toBeVisible();
    await page.locator("#resumeDrop").click();
    await expect(page.locator("#resumeCard")).toBeHidden();
  });
});
