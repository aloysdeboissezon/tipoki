const { test, expect } = require("@playwright/test");
const { openSite } = require("./helpers");

const ids = page => page.locator("#quizGrid .qcard").evaluateAll(a => a.map(x => x.dataset.id));
const heart = (page, id) => page.locator(`#quizGrid .qcard[data-id="${id}"] .qfav`).dispatchEvent("click");

test.describe("Home order and favorites", () => {
  test("French interface: French quizzes come first, English ones follow", async ({ browser }) => {
    const ctx = await browser.newContext({ locale: "fr-FR" });
    const page = await ctx.newPage();
    await openSite(page);
    const order = await ids(page);
    expect(order.slice(0, 3)).toEqual(expect.arrayContaining(["gastro"]));
    expect(order.indexOf("gastro")).toBeLessThan(order.indexOf("uspop"));
    expect(order.indexOf("culture")).toBeLessThan(order.indexOf("uspop"));
    await ctx.close();
  });

  test("English interface keeps English quizzes above French ones", async ({ page }) => {
    await openSite(page);
    const order = await ids(page);
    expect(order.indexOf("uspop")).toBeLessThan(order.indexOf("gastro"));
  });

  test("a heart puts a quiz first, survives a reload, and the heart filter shows only favorites", async ({ page }) => {
    await openSite(page);
    await heart(page, "kids");
    expect((await ids(page))[0]).toBe("kids");
    await page.reload();
    await expect(page.locator("#quizGrid .qcard").first()).toBeAttached();
    expect((await ids(page))[0]).toBe("kids");
    await page.locator("#favBtn").click();
    await expect(page.locator("#quizGrid .qcard")).toHaveCount(1);
    await expect(page.locator("#favBtn")).toHaveAttribute("aria-pressed", "true");
    await heart(page, "kids");
    await expect(page.locator("#quizGrid .qcard")).toHaveCount(0);
  });
});
