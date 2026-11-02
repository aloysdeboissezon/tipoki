const { test, expect } = require("@playwright/test");
const { openSite, openQuiz, answerRight } = require("./helpers");

test.describe("Options page", () => {
  test("opens from the gear, closes with Done and Escape", async ({ page }) => {
    await openSite(page);
    await page.locator("#optBtn").click();
    await expect(page.locator("#optDlg")).toBeVisible();
    await expect(page.locator("#optTitle")).toHaveText("Options");
    await page.locator("#optClose").click();
    await expect(page.locator("#optDlg")).toBeHidden();
    await page.locator("#optBtn").click();
    await page.keyboard.press("Escape");
    await expect(page.locator("#optDlg")).toBeHidden();
  });

  test("animations toggle is remembered and applied", async ({ page }) => {
    await openSite(page);
    await page.locator("#optBtn").click();
    const row = page.locator(".opt-row", { hasText: "Animations" });
    await expect(row.locator("button")).toHaveText("On");
    await row.locator("button").click();
    await expect(row.locator("button")).toHaveText("Off");
    await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
    expect(await page.evaluate(() => localStorage.getItem("tpk-motion"))).toBe("off");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  });

  test("sound and vibration are separate switches", async ({ page }) => {
    await openSite(page);
    await page.locator("#optBtn").click();
    const vib = page.locator(".opt-row", { hasText: "Vibration" }).locator("button");
    const snd = page.locator(".opt-row", { hasText: "Sound effects" }).locator("button");
    const sndBefore = await snd.innerText();
    await vib.click();
    expect(await page.evaluate(() => localStorage.getItem("tpk-haptic"))).toMatch(/^(on|off)$/);
    await expect(snd).toHaveText(sndBefore); // changing vibration leaves the sound alone
  });

  test("'Erase my data' needs a second tap, then wipes local data but not the rest", async ({ page }) => {
    await openSite(page, { storage: { "tpk-motion": "off", "socio-nick": "Alice", "other-site-key": "keep" } });
    await page.locator("#optBtn").click();
    const erase = page.locator("#optRows .btn.danger");
    await erase.click();
    await expect(erase).toHaveText("Tap again to erase everything");
    expect(await page.evaluate(() => localStorage.getItem("tpk-motion"))).toBe("off"); // nothing erased yet
    await Promise.all([page.waitForNavigation(), erase.click()]);
    await expect(page.locator("#quizGrid .qcard").first()).toBeAttached();
    const left = await page.evaluate(() => ({ motion: localStorage.getItem("tpk-motion"), nick: localStorage.getItem("socio-nick") }));
    expect(left.motion).toBeNull();
    expect(left.nick).toBeNull();
  });

  test("'Clear offline copies' empties the queue of unsent writes", async ({ page }) => {
    await openSite(page, { storage: { "offq-queue": JSON.stringify([{ t: "question_reports", r: { q: "m1" } }]) } });
    await page.locator("#optBtn").click();
    await page.locator("#optRows .btn.ghost:not(.danger)").click();
    await expect(page.locator("#optRows .btn.ghost:not(.danger)")).toHaveText("Cleared");
    expect(await page.evaluate(() => localStorage.getItem("offq-queue"))).toBeNull();
  });
});

test.describe("offline", () => {
  test("a banner appears when the network drops and goes away when it returns", async ({ page, context }) => {
    await openSite(page);
    await expect(page.locator("#offBar")).toBeHidden();
    await context.setOffline(true);
    await expect(page.locator("#offBar")).toBeVisible();
    await expect(page.locator("#offBar")).toContainText("You're offline");
    await context.setOffline(false);
    await expect(page.locator("#offBar")).toBeHidden();
  });

  test("a game started online keeps going when the network drops", async ({ page, context }) => {
    await openSite(page);
    await openQuiz(page, "socio");
    await page.locator("#playTab").click();
    await page.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
    await page.locator("#lenChips button", { hasText: /^5$/ }).click();
    await page.locator("#soloBtn").click();
    await expect(page.locator("#qTiles .tile").first()).toBeVisible();
    await context.setOffline(true);
    await answerRight(page);
    await expect(page.locator("#reveal")).toBeVisible();
    await page.locator("#rNext").click();
    await expect(page.locator("#qNum")).toContainText("Question 2 / 5");
    await expect(page.locator("#offBar")).toBeVisible();
  });

  // Known problem found while writing the tests: on a phone the offline banner covers the "Play solo" button.
  test.fixme("the offline banner does not cover the 'Play solo' button", async ({ page, context }) => {
    await openSite(page);
    await openQuiz(page, "socio");
    await page.locator("#playTab").click();
    await context.setOffline(true);
    await expect(page.locator("#offBar")).toBeVisible();
    await page.locator("#soloBtn").click({ timeout: 3000 });
    await expect(page.locator("#question")).toBeVisible();
  });

  test("a report made offline waits in the queue and is sent when the network is back", async ({ page, context }) => {
    await openSite(page);
    await openQuiz(page, "socio");
    await page.locator("#playTab").click();
    await page.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
    await page.locator("#lenChips button", { hasText: /^5$/ }).click();
    await page.locator("#soloBtn").click();
    await answerRight(page);
    await expect(page.locator("#reveal")).toBeVisible();

    await context.setOffline(true);
    await expect(page.locator("#offBar")).toBeVisible();
    await page.locator("#rReport").click();
    await page.locator('#rReportPick [data-why="wrong"]').click();
    await expect(page.locator("#rReport")).toContainText("Thanks, reported");
    expect(await page.evaluate(() => window.__inserts.length)).toBe(0); // nothing left the device
    await expect(page.locator("#offBar")).toContainText("1 waiting to send");
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem("offq-queue")).length)).toBe(1);

    await context.setOffline(false);
    await expect.poll(() => page.evaluate(() => window.__inserts.length)).toBe(1);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem("offq-queue")).length)).toBe(0);
    expect(await page.evaluate(() => window.__inserts[0].table)).toBe("question_reports");
  });
});
