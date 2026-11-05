const { test, expect } = require("@playwright/test");
const { openSite } = require("./helpers");

const PAGES = ["about", "contact", "privacy", "terms", "legal"];

test.describe("About, contact and legal pages", () => {
  test("the home footer links to every page", async ({ page }) => {
    await openSite(page);
    const foot = page.locator("#home .sitefoot");
    for (const p of PAGES) await expect(foot.locator(`a[href="${p}.html"]`)).toBeVisible();
    await foot.locator('a[href="about.html"]').click();
    await expect(page).toHaveURL(/about\.html$/);
    await expect(page.locator("main h1:visible")).toContainText("Learn, compete");
  });

  test("the home nav is an in-flow card, not floating", async ({ page }) => {
    await openSite(page);
    const nav = page.locator("#home .sitefoot");
    expect(await nav.evaluate(e => getComputedStyle(e).position)).toBe("static");
    const prev = await page.locator("#home .me-panel").boundingBox();
    const box = await nav.boundingBox();
    expect(box.y).toBeGreaterThanOrEqual(prev.y + prev.height);
    await expect(nav.locator("a")).toHaveCount(5);
  });

  test("the footer is translated", async ({ browser }) => {
    const ctx = await browser.newContext({ locale: "es-ES" });
    const page = await ctx.newPage();
    await openSite(page);
    await expect(page.locator("#home .sitefoot")).toContainText("Privacidad");
    await expect(page.locator("#home .sitefoot")).toContainText("Aviso");
    await ctx.close();
  });

  for (const p of PAGES) {
    test(`${p}: shows one language at a time, follows the saved language, has the contact address`, async ({ page }) => {
      await page.goto(`/${p}.html`);
      await expect(page.locator("main .lang:visible")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator("main")).toContainText("contact@qwebbo.com");
      await page.locator('.langs button[data-set="fr"]').click();
      await expect(page.locator("html")).toHaveAttribute("lang", "fr");
      await expect(page.locator("main .lang:visible")).toHaveCount(1);
      expect(await page.evaluate(() => localStorage.getItem("tpk-lang"))).toBe("fr");
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("lang", "fr");
      await page.locator('.langs button[data-set="es"]').click();
      await expect(page.locator("main .lang:visible")).toHaveCount(1);
      // no horizontal scroll on a phone
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    });
  }

  test("no unfinished placeholder is visible on any page, and the legal notice names the publisher and hosts", async ({ page }) => {
    for (const l of ["en", "fr", "es"]) {
      await page.addInitScript(l => localStorage.setItem("tpk-lang", l), l);
      for (const p of PAGES) {
        await page.goto(`/${p}.html`);
        await expect(page.locator("[data-todo]")).toHaveCount(0);
        expect(await page.locator("main").innerText()).not.toMatch(/TO COMPLETE|À COMPLÉTER|POR COMPLETAR/);
      }
      await page.goto("/legal.html");
      await expect(page.locator("main .lang:visible")).toContainText("qwebbo");
      await expect(page.locator("main .lang:visible")).toContainText("Vercel");
      await expect(page.locator("main .lang:visible")).toContainText("Supabase");
    }
  });

  test("privacy policy mentions what the code stores: no cookies, accounts, analytics opt-out", async ({ page }) => {
    await page.goto("/privacy.html");
    const t = await page.locator("main .lang:visible").innerText();
    for (const w of ["no cookies", "password", "Anthropic", "Vercel", "Supabase", "Options"]) expect(t.toLowerCase()).toContain(w.toLowerCase());
  });

  test("every language of a page has the same sections", async ({ page }) => {
    for (const p of PAGES) {
      await page.goto(`/${p}.html`);
      const n = await page.evaluate(() => ["en", "fr", "es"].map(l => document.querySelectorAll(`main .lang[lang="${l}"] h2`).length));
      expect(new Set(n).size, `${p}: ${n}`).toBe(1);
    }
  });
});
