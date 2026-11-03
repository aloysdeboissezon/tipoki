const { test, expect } = require("@playwright/test");
const { makeStore, connect, openShared } = require("./fake-backend");

// Fake Supabase Auth: "sending" an email just remembers it, typing the code signs that email in.
async function phone(browser, store) {
  const context = await browser.newContext({ locale: "en-US", serviceWorkers: "block", viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true });
  await connect(context, store);
  await context.addInitScript(() => {
    window.__fakeAuth = () => {
      let cb = null;
      return {
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: f => { cb = f; return { data: { subscription: { unsubscribe() {} } } }; },
        signInWithOtp: async o => { window.__sent = o; return { error: null }; },
        verifyOtp: async o => {
          if (o.token !== "123456") return { error: { code: "otp_expired", message: "Token has expired or is invalid" } };
          window.__authEmail = o.email; cb("SIGNED_IN", { user: { email: o.email } }); return { error: null };
        },
        signOut: async () => ({ error: null }),
        signInWithOAuth: async o => { window.__oauth = o; return { error: null }; },
      };
    };
  });
  const page = await context.newPage();
  await openShared(page, {});
  return { context, page };
}

test.describe("sign in with email / Google", () => {
  test("shows Email and Google, hides Apple and Phone until they are switched on", async ({ browser }) => {
    const a = await phone(browser, makeStore());
    await a.page.locator("#syncIn").click();
    await expect(a.page.locator("#pvEmail")).toBeVisible();
    await expect(a.page.locator("#pvGoogle")).toBeVisible();
    await expect(a.page.locator("#pvApple")).toBeHidden();
    await expect(a.page.locator("#pvPhone")).toBeHidden();
    await a.page.locator("#pvGoogle").click();
    expect(await a.page.evaluate(() => window.__oauth.provider)).toBe("google");
    await a.context.close();
  });

  test("email: bad address and bad code explain themselves, the right code saves the progress under that email", async ({ browser }) => {
    const store = makeStore();
    const a = await phone(browser, store);
    await a.page.locator("#syncIn").click();
    await a.page.locator("#pvEmail").click();
    await a.page.locator("#emAddr").fill("nope");
    await a.page.locator("#emGo").click();
    await expect(a.page.locator("#emErr")).toContainText("valid email");
    await a.page.locator("#emAddr").fill("alex@example.com");
    await a.page.locator("#emGo").click();
    await expect(a.page.locator("#emCode")).toBeVisible();
    expect(await a.page.evaluate(() => window.__sent.email)).toBe("alex@example.com");
    await a.page.locator("#emCode").fill("000000");
    await a.page.locator("#emGo").click();
    await expect(a.page.locator("#emErr")).toContainText("wrong or has expired");
    await a.page.locator("#emCode").fill("123456");
    await a.page.locator("#emGo").click();
    await expect(a.page.locator("#syncLine")).toContainText("Saved online as alex@example.com");
    expect(store.accounts["auth:alex@example.com"]).toBeTruthy();
    await a.context.close();
  });

  test("the username + password form is still there as a fallback", async ({ browser }) => {
    const a = await phone(browser, makeStore());
    await a.page.locator("#syncIn").click();
    await a.page.locator("#pvLegacy").click();
    await expect(a.page.locator("#syncUser")).toBeVisible();
    await a.context.close();
  });
});
