const { test, expect } = require("@playwright/test");

// Spaced repetition on a professor's course: a known card moves up one Leitner box and comes back a day later,
// a missed card comes back within minutes. The pitch deck and the security pack both state this behaviour.
test("flashcards of a published course follow the Leitner schedule", async ({ page }) => {
  await page.goto("/prof.html?demo=1");                        // seeds the demo course on this device
  await expect(page.locator("#courseGrid .course")).toHaveCount(1);
  await page.goto("/?course=DEMO26&demo=1");
  await page.locator("#cardsJump").click();
  await expect(page.locator("#cardsPanel")).toBeVisible();
  const due = page.locator("#fcSetChips button", { hasText: /^Due now/ });
  const n0 = +(await due.textContent()).match(/\d+/)[0];
  expect(n0).toBeGreaterThanOrEqual(2);
  await due.click();
  await page.locator("#fcGo").click();
  await page.locator("#fcFlip").click(); await page.locator("#fcGot").click();      // card 1: known
  await page.locator("#fcFlip").click(); await page.locator("#fcAgain").click();    // card 2: not yet
  const sr = await page.evaluate(() => { const k = Object.keys(localStorage).find(x => /-cards-sr/.test(x)); return Object.values(JSON.parse(localStorage.getItem(k))); });
  expect(sr).toHaveLength(2);
  const now = Date.now(), known = sr.find(e => e.b === 1), missed = sr.find(e => e.b === 0);
  expect(known.d - now).toBeGreaterThan(23 * 3600e3); expect(known.d - now).toBeLessThan(25 * 3600e3);   // box 1: back in a day
  expect(missed.d - now).toBeGreaterThan(8 * 60e3); expect(missed.d - now).toBeLessThan(11 * 60e3);     // missed: back in 10 minutes
  await page.locator("#fcQuit").click();
  await expect(page.locator("#fcSetChips button", { hasText: /^Due now/ })).toContainText(String(n0 - 2));
});
