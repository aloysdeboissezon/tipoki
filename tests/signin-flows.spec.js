// Sign-in flows, end to end, with the REAL supabase-js (from the CDN; set SUPABASE_UMD=<path to supabase.js> when the network is closed)
// and a small fake of the Supabase server (auth endpoints + the tpk_* save functions). What this proves: the browser side of Google and
// e-mail sign-in (link opened in any browser, typed code, errors, reload, sign out, profile page). What it cannot prove: the Supabase / Google
// settings of the real project (Google provider on, site address in "Redirect URLs").
const { test, expect } = require("@playwright/test");

const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const jwtFor = email => `h.${b64({ sub: "u-" + email, email, role: "authenticated", exp: 9999999999 })}.s`;
const userFor = (email, name) => ({ id: "u-" + email, aud: "authenticated", role: "authenticated", email, user_metadata: name ? { full_name: name } : {}, app_metadata: {}, created_at: new Date().toISOString() });
const emailOf = auth => { try { return JSON.parse(Buffer.from(String(auth).split(".")[1], "base64url").toString()).email || null; } catch (e) { return null; } };
const hashFor = (email, type = "magiclink") => `#access_token=${jwtFor(email)}&refresh_token=r&expires_in=3600&token_type=bearer&type=${type}`;

async function setup(page, { accounts = {}, names = {}, local = {} } = {}) {
  const server = { accounts, calls: [], otp: [], verify: [], authorize: [] };
  if (process.env.SUPABASE_UMD) await page.route(/cdn\.jsdelivr\.net\/npm\/@supabase/, r => r.fulfill({ contentType: "text/javascript", path: process.env.SUPABASE_UMD }));
  await page.route(/authorize/, r => { if (/supabase\.co\/auth\/v1\/authorize/.test(r.request().url())) { server.authorize.push(r.request().url()); return r.fulfill({ contentType: "text/html", body: "<title>Google</title>" }); } return r.fallback(); });
  await page.route(/supabase\.co/, route => {
    const req = route.request(), u = new URL(req.url());
    const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
    const json = (body, status = 200) => route.fulfill({ status, headers: cors, contentType: "application/json", body: JSON.stringify(body) });
    if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    const p = u.pathname;
    if (p === "/auth/v1/authorize") return route.fallback();
    if (p === "/auth/v1/user") { const em = emailOf((req.headers().authorization || "").replace("Bearer ", "")); return em ? json(userFor(em, names[em])) : json({ message: "bad jwt" }, 401); }
    if (p === "/auth/v1/otp") { server.otp.push(req.postDataJSON()); return json({}); }
    if (p === "/auth/v1/verify") {
      const b = req.postDataJSON(); server.verify.push(b);
      if (b.token !== "123456") return json({ code: "otp_expired", error_code: "otp_expired", msg: "Token has expired or is invalid" }, 403);
      return json({ access_token: jwtFor(b.email), token_type: "bearer", expires_in: 3600, refresh_token: "r", user: userFor(b.email, names[b.email]) });
    }
    if (p === "/auth/v1/logout") return route.fulfill({ status: 204, headers: cors });
    const m = p.match(/^\/rest\/v1\/rpc\/(tpk_\w+)$/);
    if (m) {
      const fn = m[1], a = req.postDataJSON() || {};
      server.calls.push({ fn, a });
      if (fn === "tpk_auth_login") {
        const em = emailOf((req.headers().authorization || "").replace("Bearer ", ""));
        if (!em) return json({ message: "not_signed_in" }, 400);
        let acc = server.accounts[em];
        if (!acc) { server.accounts[em] = { username: em, rev: 1, data: a.p_data || {}, tok: "tok-" + em }; return json({ token: "tok-" + em, username: em, rev: 1, created: true }); }
        return json({ token: acc.tok || (acc.tok = "tok-" + em), username: acc.username, rev: acc.rev, data: acc.data });
      }
      const acc = Object.values(server.accounts).find(x => x.tok === a.p_token);
      if (fn === "tpk_pull") return acc ? json({ username: acc.username, rev: acc.rev, data: acc.data }) : json({ error: "bad_token" });
      if (fn === "tpk_push") { if (!acc) return json({ error: "bad_token" }); acc.rev += 1; acc.data = a.p_data; return json({ rev: acc.rev }); }
      if (fn === "tpk_logout") return json({});
      return json({});
    }
    return json([]);
  });
  await page.addInitScript(l => { try { for (const k in l) if (!localStorage.getItem("__init_" + k)) { localStorage.setItem(k, l[k]); localStorage.setItem("__init_" + k, "1"); } } catch (e) {} }, local);
  return server;
}

test.describe("sign-in flows (real supabase-js)", () => {
  test("Google comes back: new account -> profile page prefilled with the Google name -> signed in, stays signed in after a reload", async ({ page }) => {
    const server = await setup(page, { names: { "alex@example.com": "Alex Martin" } });
    await page.goto("/" + hashFor("alex@example.com", "signup"));
    await expect(page.locator("#onbNick")).toBeVisible({ timeout: 15000 });
    expect(await page.inputValue("#onbNick")).toBe("Alex Martin");
    await expect(page.locator("#onbSkip")).toHaveText("Skip");
    // the page did not navigate away (regression: the fragment cleanup used to send the browser back)
    await page.waitForTimeout(800);
    expect(new URL(page.url()).pathname).toBe("/");
    expect(page.url()).not.toContain("access_token");
    await page.locator("#onbNick").fill("Alex");
    await page.locator("#onbCountry").selectOption("FR");
    await page.locator("#onbDone").click();
    await expect(page.locator("#accBtn")).toContainText("Alex");
    await expect(page.locator("#accCard")).toBeHidden();
    expect(await page.evaluate(() => [localStorage.getItem("socio-nick"), localStorage.getItem("tpk-country"), localStorage.getItem("tpk-onboarded")])).toEqual(["Alex", "FR", "1"]);
    // reload: still signed in, no sign-in card, no profile page again
    await page.reload();
    await expect(page.locator("#accBtn")).toContainText("Alex");
    await expect(page.locator("#accCard")).toBeHidden();
    await expect(page.locator("#syncDlg")).toBeHidden();
    expect(server.calls.some(c => c.fn === "tpk_pull")).toBe(true);
  });

  test("e-mail link for an existing account: progress comes back, no profile page, name shown", async ({ page }) => {
    await setup(page, { accounts: { "sam@example.com": { username: "sam@example.com", rev: 4, tok: "tok-sam", data: { "socio-nick": "Sam", "tpk-country": "ES", "tpk-stats": JSON.stringify({ best: {}, days: ["2026-11-01"], daily: {} }) } } } });
    await page.goto("/" + hashFor("sam@example.com"));
    await expect(page.locator("#accBtn")).toContainText("Sam", { timeout: 15000 });
    await expect(page.locator("#syncDlg")).toBeHidden();
    expect(await page.evaluate(() => [localStorage.getItem("socio-nick"), localStorage.getItem("tpk-country")])).toEqual(["Sam", "ES"]);
  });

  test("the account button opens the profile page; Sign out goes back to signed out and stays so after a reload", async ({ page }) => {
    await setup(page, { accounts: { "sam@example.com": { username: "sam@example.com", rev: 1, tok: "tok-sam", data: { "socio-nick": "Sam" } } } });
    await page.goto("/" + hashFor("sam@example.com"));
    await expect(page.locator("#accBtn")).toContainText("Sam", { timeout: 15000 });
    await page.locator("#accBtn").click();
    await expect(page.locator("#onbAcct")).toContainText("sam@example.com");
    await expect(page.locator("#onbSkip")).toHaveText("Close");
    await page.locator("#onbNick").fill("Samuel");
    await page.locator("#onbDone").click();
    await expect(page.locator("#accBtn")).toContainText("Samuel");
    await page.locator("#accBtn").click();
    await page.locator("#onbOut").click();
    await expect(page.locator("#accBtn")).toContainText("Sign in");
    await expect(page.locator("#accCard")).toBeVisible();
    await page.reload();
    await expect(page.locator("#accBtn")).toContainText("Sign in");
    await expect(page.locator("#accCard")).toBeVisible();
  });

  test("e-mail: the link is requested for the right address, a typed code signs in and opens the profile page", async ({ page }) => {
    const server = await setup(page);
    await page.goto("/");
    await page.locator("#accBtn").click();
    await page.locator("#pvEmail").click();
    await page.locator("#emAddr").fill("alex@example.com");
    await page.locator("#emGo").click();
    await expect(page.locator("#emCode")).toBeVisible();
    expect(server.otp[0].email).toBe("alex@example.com");
    expect(server.otp[0].create_user).toBe(true);
    await page.locator("#emCode").fill("000000");
    await page.locator("#emGo").click();
    await expect(page.locator("#emErr")).toContainText("wrong or has expired");
    await page.locator("#emCode").fill("123456");
    await page.locator("#emGo").click();
    await expect(page.locator("#onbNick")).toBeVisible({ timeout: 15000 });
    expect(await page.inputValue("#onbNick")).toBe("Alex");
    await page.locator("#onbSkip").click();
    await expect(page.locator("#accBtn")).toContainText("alex");
  });

  test("Continue with Google sends the browser to Supabase with the site address to come back to", async ({ page }) => {
    const server = await setup(page);
    await page.goto("/");
    await page.locator("#accBtn").click();
    await page.locator("#pvGoogle").click();
    await expect.poll(() => server.authorize.length).toBeGreaterThan(0);
    const u = new URL(server.authorize[0]);
    expect(u.searchParams.get("provider")).toBe("google");
    expect(u.searchParams.get("redirect_to")).toBe("http://localhost:4173/");
    expect(u.searchParams.get("code_challenge")).toBeNull();   // implicit flow: nothing to keep in this browser, so the link works from any browser
  });

  test("a refused or expired sign-in link explains itself instead of staying silent", async ({ page }) => {
    await setup(page);
    await page.goto("/#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired");
    await expect(page.locator("#pvErr")).toContainText("wrong or has expired", { timeout: 15000 });
  });

  test("adding an e-mail to a username account sends the old save token so both are linked", async ({ page }) => {
    const server = await setup(page, { accounts: { "old@example.com": { username: "old", rev: 2, tok: "tok-old", data: {} } }, local: { "tpk-sync": JSON.stringify({ u: "old", tok: "tok-old", rev: 2 }), "qwebbo-link": "tok-old" } });
    await page.goto("/" + hashFor("new@example.com"));
    await expect(page.locator("#accBtn")).toBeVisible();
    await expect.poll(() => server.calls.some(c => c.fn === "tpk_auth_login")).toBe(true);
    expect(server.calls.find(c => c.fn === "tpk_auth_login").a.p_link).toBe("tok-old");
  });
});
