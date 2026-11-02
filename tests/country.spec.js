const { test, expect } = require("@playwright/test");
const { makeStore, connect, openShared } = require("./fake-backend");
const { openQuiz } = require("./helpers");

async function phone(browser, store, storage, locale = "en-US") {
  const context = await browser.newContext({ locale, serviceWorkers: "block", viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true });
  await connect(context, store);
  const page = await context.newPage();
  await openShared(page, { storage });
  return { context, page };
}

test.describe("country flag", () => {
  test("the picker saves the country, defaults from the browser language, and can be cleared", async ({ browser }) => {
    const store = makeStore();
    const a = await phone(browser, store, { "socio-nick": "Charles" }, "fr-FR");
    await expect(a.page.locator("#country")).toHaveValue("FR");            // guess from the browser, not saved yet
    expect(await a.page.evaluate(() => localStorage.getItem("tpk-country"))).toBeNull();
    await a.page.locator("#country").selectOption("ES");
    expect(await a.page.evaluate(() => localStorage.getItem("tpk-country"))).toBe("ES");
    await a.page.locator("#country").selectOption("");
    expect(await a.page.evaluate(() => localStorage.getItem("tpk-country"))).toBe("");
    expect(await a.page.evaluate(() => tpkCountry.mine())).toBe("");
    await a.context.close();
  });

  test("flags show next to names in the lobby, and two same-name same-country players are told apart", async ({ browser }) => {
    const store = makeStore();
    const a = await phone(browser, store, { "socio-nick": "Charles", "tpk-country": "FR" });
    const b = await phone(browser, store, { "socio-nick": "Charles", "tpk-country": "FR" });
    const c = await phone(browser, store, { "socio-nick": "Charles", "tpk-country": "ES" });
    await openQuiz(a.page, "socio");
    await a.page.locator("#playTab").click();
    await a.page.locator("#createBtn").click();
    await expect(a.page.locator("#lobby")).toBeVisible();
    const code = (await a.page.locator("#lobbyCode").innerText()).trim();
    for (const p of [b, c]) { await p.page.locator("#codeIn").fill(code); await p.page.locator("#joinBtn").click(); await expect(p.page.locator("#lobby")).toBeVisible(); }
    const lobby = a.page.locator("#lobbyPlayers");
    await expect(lobby).toContainText("Charles (2)", { timeout: 10_000 });    // second French Charles
    await expect(lobby).toContainText("🇫🇷");
    await expect(lobby).toContainText("🇪🇸");
    await expect(lobby).not.toContainText("Charles (3)");                       // the Spanish one is not a duplicate
    const row = store.db.players.find(r => r.country === "ES");
    expect(row && row.country).toBe("ES");
    for (const p of [a, b, c]) await p.context.close();
  });
});
