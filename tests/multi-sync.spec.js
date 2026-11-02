const { test, expect } = require("@playwright/test");
const { makeStore, connect, openShared } = require("./fake-backend");
const { openQuiz, answerRight } = require("./helpers");

// two phones, one shared fake server
async function phone(browser, store, storage) {
  const context = await browser.newContext({ locale: "en-US", serviceWorkers: "block", viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true });
  await connect(context, store);
  const page = await context.newPage();
  await openShared(page, { storage });
  return { context, page };
}

test.describe("multiplayer", () => {
  test("host creates a game, a friend joins with the code, both play and see a podium", async ({ browser }) => {
    test.setTimeout(120_000);
    const store = makeStore();
    const a = await phone(browser, store, { "socio-nick": "Alice" });
    const b = await phone(browser, store, { "socio-nick": "Bob" });

    await openQuiz(a.page, "socio");
    await a.page.locator("#playTab").click();
    await a.page.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
    await a.page.locator("#lenChips button", { hasText: /^5$/ }).click();
    await a.page.locator("#createBtn").click();
    await expect(a.page.locator("#lobby")).toBeVisible();
    const code = (await a.page.locator("#lobbyCode").innerText()).trim();
    expect(code).toMatch(/^[A-Z]{4}$/);

    await b.page.locator("#codeIn").fill(code);
    await b.page.locator("#joinBtn").click();
    await expect(b.page.locator("#lobby")).toBeVisible();
    await expect(b.page.locator("#lobbyWait")).toBeVisible();
    await expect(b.page.locator("#lobbyStart")).toBeHidden();
    // the host sees the friend arrive (polling fallback, no realtime in this fake)
    await expect(a.page.locator("#lobbyPlayers")).toContainText("Bob", { timeout: 10_000 });
    await expect(b.page.locator("#lobbyPlayers")).toContainText("Alice");

    await a.page.locator("#lobbyStart").click();
    for (let i = 0; i < 5; i++) {
      for (const p of [a.page, b.page]) {
        await expect(p.locator("#qNum")).toContainText(`Question ${i + 1}`, { timeout: 15_000 });
        await p.locator("#qTiles .tile").first().waitFor();
      }
      await answerRight(a.page);
      await expect(b.page.locator("#question")).toBeVisible(); // still waiting for Bob
      await answerRight(b.page);
      for (const p of [a.page, b.page]) await expect(p.locator("#reveal")).toBeVisible({ timeout: 15_000 });
      if (i < 4) {
        await a.page.locator("#rNext").click(); // the host moves everyone on
      }
    }
    await a.page.locator("#rNext").click();
    for (const p of [a.page, b.page]) await expect(p.locator("#end")).toBeVisible({ timeout: 15_000 });
    await expect(a.page.locator("#end")).toContainText("Alice");
    await expect(a.page.locator("#end")).toContainText("Bob");
    await a.context.close(); await b.context.close();
  });

  test("a wrong code shows a message", async ({ browser }) => {
    const store = makeStore();
    const a = await phone(browser, store, { "socio-nick": "Alice" });
    await a.page.locator("#codeIn").fill("ZZZZ");
    await a.page.locator("#joinBtn").click();
    await expect(a.page.locator("#joinErr")).toBeVisible();
    await a.context.close();
  });
});

test.describe("save progress online", () => {
  test("sign up on one phone, then sign in on another and get the same progress", async ({ browser }) => {
    test.setTimeout(120_000);
    const store = makeStore();
    const a = await phone(browser, store, { "socio-nick": "Alice" });
    await a.page.locator("#syncIn").click();
    await a.page.locator("#syncUser").fill("alice.test");
    await a.page.locator("#syncPass").fill("secret1");
    await a.page.locator("#syncGo").click();
    await expect(a.page.locator("#syncLine")).toContainText("Saved online as alice.test");
    expect(store.accounts["alice.test"]).toBeTruthy();

    // some progress after signing up is pushed
    await a.page.evaluate(() => { localStorage.setItem("socio-nick", "AliceNew"); window.dispatchEvent(new Event("online")); });
    await a.page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));

    const b = await phone(browser, store, {});
    await b.page.locator("#syncIn").click();
    await b.page.locator("#syncForm [data-mode], #syncForm button", { hasText: /I have one/i }).first().click();
    await b.page.locator("#syncUser").fill("alice.test");
    await b.page.locator("#syncPass").fill("wrongpass");
    await b.page.locator("#syncGo").click();
    await expect(b.page.locator("#syncErr")).toContainText("Wrong username or password");
    await b.page.locator("#syncPass").fill("secret1");
    await b.page.locator("#syncGo").click();
    await expect(b.page.locator("#syncLine")).toContainText("Saved online as alice.test");
    await a.context.close(); await b.context.close();
  });

  test("signing up with a short password or a taken name explains why", async ({ browser }) => {
    const store = makeStore();
    store.accounts["taken"] = { password: "abcdef", rev: 1, data: {} };
    const a = await phone(browser, store, {});
    await a.page.locator("#syncIn").click();
    await a.page.locator("#syncUser").fill("newuser");
    await a.page.locator("#syncPass").fill("123");
    await a.page.locator("#syncGo").click();
    await expect(a.page.locator("#syncErr")).toContainText("at least 6");
    await a.page.locator("#syncUser").fill("taken");
    await a.page.locator("#syncPass").fill("abcdef1");
    await a.page.locator("#syncGo").click();
    await expect(a.page.locator("#syncErr")).toContainText("taken");
    await a.context.close();
  });
});
