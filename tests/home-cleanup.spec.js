// Home page: consistent quiz titles (subject first), ESADE logo beside the heart, compact profile block.
const { test, expect } = require("@playwright/test");
const { openSite } = require("./helpers");

test.describe("Home page cleanup", () => {
  test("ESADE cards start with the subject, show the ESADE logo left of the heart", async ({ page }) => {
    await openSite(page);
    await page.locator("#esadeBtn").click();
    const titles = await page.locator("#quizGrid .qcard b").allTextContents();
    expect(titles).toEqual(expect.arrayContaining(["Sociology · Sessions 1–10", "Sociology · Sessions 14–15", "Accounting · Consolidation", "Statistics · Unit 5: Linear Regression"]));
    expect(titles.join("|")).not.toMatch(/Training|Socio Trivia|Quiz 2/);
    const card = page.locator('#quizGrid .qcard[data-id="regression"]');
    await expect(card.locator("img.qesade")).toHaveAttribute("alt", "ESADE");
    const a = await card.locator(".qesade").boundingBox(), h = await card.locator(".qfav").boundingBox();
    expect(a.x + a.width).toBeLessThanOrEqual(h.x + 1);
    expect(Math.abs(a.y - h.y)).toBeLessThan(12);   // cards scale while the carousel settles
    await page.locator("#esadeBtn").click();
    await expect(page.locator("#quizGrid .qesade")).toHaveCount(0);   // normal quizzes carry no ESADE logo
  });

  test("friend-code helper is a single short line; profile block is compact with the avatar on the left", async ({ page }) => {
    await openSite(page);
    const help = page.locator("#joinPanel p.muted");
    await expect(help).toHaveText("Enter your friend's code... and rise");
    expect(await help.evaluate(e => e.getBoundingClientRect().height < parseFloat(getComputedStyle(e).lineHeight) * 1.5)).toBe(true);
    await expect(page.locator(".me-hint")).toHaveCount(0);
    await expect(page.locator("#pfpPick")).toHaveCount(0);
    await expect(page.locator("#pfpDel")).toBeHidden();
    const pfp = page.locator("#pfpBtn");
    await expect(pfp).toHaveAttribute("aria-label", "Add a photo");
    await expect(pfp.locator(".pfp-add")).toBeAttached();
    const a = await pfp.boundingBox(), n = await page.locator("#nick").boundingBox(), c = await page.locator("#country").boundingBox();
    expect(a.x + a.width).toBeLessThanOrEqual(n.x);
    expect(a.y).toBeLessThan(c.y + c.height);
    expect(a.y + a.height).toBeGreaterThan(n.y);
    // friend-code row: plain placeholder, compact controls; avatar centred on the name + country rows
    await expect(page.locator("#codeIn")).toHaveAttribute("placeholder", "Enter code...");
    const ci = await page.locator("#codeIn").boundingBox(), jb = await page.locator("#joinBtn").boundingBox();
    expect(ci.height).toBeLessThanOrEqual(48); expect(ci.height).toBeGreaterThanOrEqual(44);
    expect(jb.height).toBeLessThanOrEqual(48); expect(jb.height).toBeGreaterThanOrEqual(44);
    const mid = (n.y + c.y + c.height) / 2;
    expect(Math.abs(a.y + a.height / 2 - mid)).toBeLessThan(3);
  });
});
