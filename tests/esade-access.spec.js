// ESADE-only quizzes, end to end: the pop-up, the email code (real supabase-js, fake Supabase server), the ticked logo, loading the quiz from /api/esade.
// Like signin-flows.spec.js: set SUPABASE_UMD=<path to supabase.js> when the CDN can't be reached. What this cannot prove: the real Supabase
// settings (email templates, sender) and the SQL, which is tested by hand (docs/esade-acces.md).
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const jwtFor = email => `h.${b64({ sub: "u-" + email, email, role: "authenticated", exp: 9999999999 })}.s`;
const userFor = email => ({ id: "u-" + email, aud: "authenticated", role: "authenticated", email, user_metadata: {}, app_metadata: {}, created_at: new Date().toISOString() });
const emailOf = auth => { try { return JSON.parse(Buffer.from(String(auth).split(".")[1], "base64url").toString()).email || null; } catch (e) { return null; } };
const isEsade = em => /@([a-z0-9-]+\.)*esade\.edu$/i.test(em || "");
const file = (...p) => fs.readFileSync(path.join(__dirname, "..", "api", "_esade", ...p));

// a small fake of the Supabase server: auth (otp / verify) + the tpk_* and esade_* functions; /api/esade answers like the real function would
async function setup(page, { accounts = {}, local = {}, esade = true } = {}) {
  const server = { accounts, otp: [], verify: [], calls: [], content: [] };
  if (process.env.SUPABASE_UMD) await page.route(/cdn\.jsdelivr\.net\/npm\/@supabase/, r => r.fulfill({ contentType: "text/javascript", path: process.env.SUPABASE_UMD }));
  await page.route(/supabase\.co/, route => {
    const req = route.request(), u = new URL(req.url());
    const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
    const json = (body, status = 200) => route.fulfill({ status, headers: cors, contentType: "application/json", body: JSON.stringify(body) });
    if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    const p = u.pathname;
    if (p === "/auth/v1/user") { const em = emailOf((req.headers().authorization || "").replace("Bearer ", "")); return em ? json(userFor(em)) : json({ message: "bad jwt" }, 401); }
    if (p === "/auth/v1/otp") { server.otp.push(req.postDataJSON()); return json({}); }
    if (p === "/auth/v1/verify") {
      const b = req.postDataJSON(); server.verify.push(b);
      if (b.token !== "123456") return json({ code: "otp_expired", error_code: "otp_expired", msg: "Token has expired or is invalid" }, 403);
      return json({ access_token: jwtFor(b.email), token_type: "bearer", expires_in: 3600, refresh_token: "r", user: userFor(b.email) });
    }
    if (p === "/auth/v1/logout") return route.fulfill({ status: 204, headers: cors });
    const m = p.match(/^\/rest\/v1\/rpc\/(\w+)$/);
    if (!m) return json([]);
    const fn = m[1], a = req.postDataJSON() || {}, em = emailOf((req.headers().authorization || "").replace("Bearer ", ""));
    server.calls.push({ fn, a });
    const byTok = Object.values(server.accounts).find(x => x.tok === a.p_token);
    if (fn === "esade_domain_ok") return json(isEsade(a.p_email));
    if (fn === "tpk_auth_login") {
      if (!em) return json({ message: "not_signed_in" }, 400);
      let acc = server.accounts[em], created = false;
      if (!acc) { acc = server.accounts[em] = { username: em, rev: 1, data: a.p_data || {}, tok: "tok-" + em }; created = true; }
      if (isEsade(em)) acc.esade = em;
      return json({ token: acc.tok, username: acc.username, rev: acc.rev, ...(created ? { created: true } : { data: acc.data }), esade: acc.esade || null });
    }
    if (fn === "esade_status") return byTok ? json({ verified: !!byTok.esade, email: byTok.esade || null }) : json({ error: "bad_token" });
    if (fn === "esade_verify") {
      if (!em) return json({ error: "not_signed_in" });
      if (!byTok) return json({ error: "bad_token" });
      if (!isEsade(em)) return json({ error: "not_esade" });
      byTok.esade = em; return json({ verified: true, email: em });
    }
    if (fn === "tpk_pull") return byTok ? json({ username: byTok.username, rev: byTok.rev, data: byTok.data }) : json({ error: "bad_token" });
    if (fn === "tpk_push") { if (!byTok) return json({ error: "bad_token" }); byTok.rev += 1; byTok.data = a.p_data; return json({ rev: byTok.rev }); }
    return json({});
  });
  // /api/esade like the real function: files only for an account with a verified ESADE email
  await page.route(/\/api\/esade\?/, route => {
    const req = route.request(), u = new URL(req.url()), tok = (req.headers().authorization || "").replace("Bearer ", "");
    const acc = Object.values(server.accounts).find(x => x.tok === tok);
    server.content.push({ k: u.searchParams.get("k"), id: u.searchParams.get("id"), status: !acc ? 401 : acc.esade ? 200 : 403 });
    if (!acc) return route.fulfill({ status: 401, body: '{"error":"login"}' });
    if (!acc.esade) return route.fulfill({ status: 403, body: '{"error":"esade_only"}' });
    const k = u.searchParams.get("k"), id = u.searchParams.get("id");
    return route.fulfill({ status: 200, contentType: "text/javascript", body: k === "bank" ? file("banks", id + ".js") : file("sheets", id + ".js") });
  });
  await page.addInitScript(l => { try { for (const k in l) if (!localStorage.getItem("__init_" + k)) { localStorage.setItem(k, l[k]); localStorage.setItem("__init_" + k, "1"); } } catch (e) {} }, {
    "tpk-onboarded": "1", "tpk-tour": "1", "tpk-goal-asked": "1", ...local,
  });
  return server;
}

async function openHome(page) {
  await page.goto("/");
  await expect(page.locator("#quizGrid .qcard").first()).toBeAttached();
}
async function askCode(page, email) {
  await page.locator("#esadeBtn").click();
  await expect(page.locator("#esadeForm")).toBeVisible();
  await page.locator("#esAddr").fill(email);
  await page.locator("#esGo").click();
}

test.describe("ESADE access", () => {
  test("a visitor sees a locked logo; clicking it opens the 'ESADE only' pop-up and does not show the ESADE list", async ({ page }) => {
    await setup(page);
    await openHome(page);
    const logo = page.locator("#esadeBtn");
    await expect(logo).toHaveClass(/locked/);
    await logo.click();
    await expect(page.locator("#esadeForm")).toBeVisible();
    await expect(page.locator("#esadeForm h2")).toHaveText("ESADE only");
    await expect(page.locator("#esadeForm")).toContainText("terms and conditions");
    await expect(logo).toHaveAttribute("aria-pressed", "false");
    await page.locator("#esCancel").click();
    await expect(page.locator("#esadeForm")).toBeHidden();
    await expect(page.locator('#quizGrid .qcard[data-id="socio"]')).toHaveCount(0);   // still the normal list
  });

  test("an ESADE link opened by a visitor asks for the ESADE email instead of 'Quiz not found'; nothing is loaded", async ({ page }) => {
    const server = await setup(page);
    await page.goto("/?quiz=socio");
    await expect(page.locator("#esadeForm")).toBeVisible();
    await expect(page.locator("#status")).not.toContainText("Quiz not found");
    expect(await page.evaluate(() => typeof window.BANK_SOCIO)).toBe("undefined");
    expect(server.content.every(c => c.status === 401)).toBe(true);
  });

  test("an address that is not ESADE is refused before any code is sent", async ({ page }) => {
    const server = await setup(page);
    await openHome(page);
    await askCode(page, "someone@gmail.com");
    await expect(page.locator("#esErr")).toContainText("isn't an ESADE address");
    expect(server.otp).toEqual([]);
    await page.locator("#esAddr").fill("not an email");
    await page.locator("#esGo").click();
    await expect(page.locator("#esErr")).toContainText("name@esade.edu");
  });

  test("code by email: wrong code is refused, the right one unlocks, ticks the logo and opens the ESADE list; the quiz then loads", async ({ page }) => {
    const server = await setup(page);
    await openHome(page);
    await askCode(page, "Ana@ESADE.edu");
    await expect(page.locator("#esCodeBox")).toBeVisible();
    expect(server.otp.map(o => o.email)).toEqual(["ana@esade.edu"]);
    await page.locator("#esCode").fill("000000");
    await page.locator("#esGo").click();
    await expect(page.locator("#esErr")).toContainText("wrong or has expired");
    await page.locator("#esCode").fill("123456");
    await page.locator("#esGo").click();
    await expect(page.locator("#esadeForm")).toBeHidden();
    const logo = page.locator("#esadeBtn");
    await expect(logo).toHaveClass(/verified/);
    await expect(logo).not.toHaveClass(/locked/);
    await expect(logo).toHaveAttribute("aria-pressed", "true");   // the pop-up came from the logo: the ESADE quizzes are shown right away
    await expect(page.locator("#status")).toContainText("ESADE quizzes unlocked");
    expect(server.accounts["ana@esade.edu"].esade).toBe("ana@esade.edu");
    await page.locator('#quizGrid .qcard[data-id="socio"]').click();
    await expect(page.locator("#topic")).toBeVisible();
    expect(await page.evaluate(() => BANK.id)).toBe("socio");
    expect(server.content.filter(c => c.status === 200).map(c => c.k).sort()).toEqual(["bank", "sheet"]);
    // a reload keeps it (the hint is stored; the server decides on each load)
    await page.reload();
    await expect(page.locator("#esadeBtn")).toHaveClass(/verified/);
  });

  test("someone already signed in with another email adds the ESADE address to the SAME account", async ({ page }) => {
    const server = await setup(page, {
      accounts: { "alex@gmail.com": { username: "alex@gmail.com", rev: 1, data: {}, tok: "tok-alex@gmail.com" } },
      local: { "tpk-sync": JSON.stringify({ u: "alex@gmail.com", tok: "tok-alex@gmail.com", rev: 1, au: 1 }) },
    });
    await openHome(page);
    await expect(page.locator("#esadeBtn")).toHaveClass(/locked/);   // the server says: no ESADE address on this account
    await askCode(page, "alex@esade.edu");
    await page.locator("#esCode").fill("123456");
    await page.locator("#esGo").click();
    await expect(page.locator("#esadeBtn")).toHaveClass(/verified/);
    expect(Object.keys(server.accounts)).toEqual(["alex@gmail.com"]);   // no second account
    expect(server.accounts["alex@gmail.com"].esade).toBe("alex@esade.edu");
    expect(server.calls.find(c => c.fn === "esade_verify").a.p_token).toBe("tok-alex@gmail.com");
  });

  test("an account whose ESADE access was withdrawn (the server says 403) is asked to verify again", async ({ page }) => {
    await setup(page, {
      accounts: { "ana@esade.edu": { username: "ana@esade.edu", rev: 1, data: {}, tok: "tok-ana" } },   // no esade flag on the server
      local: { "tpk-sync": JSON.stringify({ u: "ana@esade.edu", tok: "tok-ana", rev: 1, au: 1 }), "qwebbo-esade": JSON.stringify({ e: "ana@esade.edu" }) },
    });
    await page.goto("/");
    // the stale hint is corrected as soon as the page asks the server
    await expect(page.locator("#esadeBtn")).toHaveClass(/locked/);
    await page.goto("/?quiz=compta2");
    await expect(page.locator("#esadeForm")).toBeVisible();
  });
});
