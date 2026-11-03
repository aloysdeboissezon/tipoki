const { test, expect } = require("@playwright/test");

// Uses the REAL supabase-js (from the CDN, or from SUPABASE_UMD when the network is closed).
// A sign-in link opened in another browser, or in the installed app, has no stored PKCE verifier, so the sign-in
// uses the implicit flow: the address comes back with #access_token and must complete the sign-in anywhere.
test("real supabase-js completes a sign-in return (#access_token) and opens the profile page", async ({ page }) => {
  const jwt = "x." + Buffer.from(JSON.stringify({ sub: "u1", email: "alex@example.com", role: "authenticated", exp: 9999999999 })).toString("base64url") + ".y";
  const user = { id: "u1", aud: "authenticated", role: "authenticated", email: "alex@example.com", user_metadata: { full_name: "Alex Martin" }, app_metadata: {}, created_at: new Date().toISOString() };
  let rpcCalled = false;
  if (process.env.SUPABASE_UMD) await page.route(/cdn\.jsdelivr\.net\/npm\/@supabase/, r => r.fulfill({ contentType: "text/javascript", path: process.env.SUPABASE_UMD }));
  await page.route(/supabase\.co/, route => {
    const u = route.request().url();
    const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
    if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    if (/auth\/v1\/user/.test(u)) return route.fulfill({ headers: cors, contentType: "application/json", body: JSON.stringify(user) });
    if (/rpc\/tpk_auth_login/.test(u)) { rpcCalled = true; return route.fulfill({ headers: cors, contentType: "application/json", body: JSON.stringify({ token: "tok", username: "alex@example.com", rev: 1, created: true }) }); }
    return route.fulfill({ headers: cors, contentType: "application/json", body: "[]" });
  });
  await page.goto(`/#access_token=${jwt}&refresh_token=r&expires_in=3600&token_type=bearer&type=magiclink`);
  await expect(page.locator("#onbNick")).toBeVisible({ timeout: 15000 });
  expect(rpcCalled).toBe(true);
  expect(await page.inputValue("#onbNick")).toBe("Alex Martin");
  await page.locator("#onbNick").fill("Alex");
  await page.locator("#onbDone").click();
  await expect(page.locator("#accBtn")).toContainText("Alex");
  // the account button now opens the profile page (edit mode)
  await page.locator("#accBtn").click();
  await expect(page.locator("#onbAcct")).toContainText("alex@example.com");
  await expect(page.locator("#onbOut")).toBeVisible();
});
