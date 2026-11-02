const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

test.describe("Spanish interface", () => {
  test("the browser's Spanish is detected and the interface is in Spanish", async ({ browser }) => {
    const ctx = await browser.newContext({ locale: "es-ES" });
    const page = await ctx.newPage();
    await openSite(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("body")).toContainText("¿Qué quieres estudiar?");
    await expect(page.locator("#langBtn .bt")).toHaveText("ES");
    expect(await page.evaluate(() => [...tlMissing].filter(k => !(k in ES) && !/^(Aa|FR|https?:.*)$/.test(k)))).toEqual([]);
    await ctx.close();
  });

  test("the language menu switches to Spanish, remembers it, and the quiz keeps its language", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await openSite(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.locator("#langBtn").click();
    await page.locator("#langMenu .lang-opt", { hasText: "Español" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    expect(await page.evaluate(() => localStorage.getItem("tpk-lang"))).toBe("es");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("body")).toContainText("Aprende");
    await openQuiz(page, "socio");
    await expect(page.locator("body")).toContainText("Jugar solo");
  });

  test("the Spanish dictionary has every key the French one has", async ({ page }) => {
    await openSite(page);
    const diff = await page.evaluate(() => ({
      missing: Object.keys(FR).filter(k => !(k in ES)),
      extra: Object.keys(ES).filter(k => !(k in FR)),
      brokenVars: Object.keys(FR).filter(k => k in ES && (k.match(/\{\w+\}/g) || []).sort().join() !== (ES[k].match(/\{\w+\}/g) || []).sort().join()),
    }));
    expect(diff).toEqual({ missing: [], extra: [], brokenVars: [] });
  });
});
