const { test, expect } = require("@playwright/test");
// Uses the REAL supabase-js (from the CDN, or from SUPABASE_UMD when the network is closed) so the ?code= in the address is really read:
// cleaning the address too early made Google sign-ins silently do nothing.
test("real supabase-js completes a PKCE return from Google", async ({ page }) => {
  const jwt = "x." + Buffer.from(JSON.stringify({ sub: "u1", email: "alex@example.com", role: "authenticated", exp: 9999999999, user_metadata: { full_name: "Alex Martin" } })).toString("base64url") + ".y";
  const user = { id: "u1", aud: "authenticated", role: "authenticated", email: "alex@example.com", user_metadata: { full_name: "Alex Martin" }, app_metadata: {}, created_at: new Date().toISOString() };
  let rpcCalled = false;
  if (process.env.SUPABASE_UMD) await page.route(/cdn\.jsdelivr\.net\/npm\/@supabase/, r => r.fulfill({ contentType: "text/javascript", path: process.env.SUPABASE_UMD }));
  await page.route(/supabase\.co/, route => {
    const u = route.request().url();
    const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
    if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    if (/auth\/v1\/token/.test(u)) return route.fulfill({ headers: cors, contentType: "application/json", body: JSON.stringify({ access_token: jwt, token_type: "bearer", expires_in: 3600, refresh_token: "r", user }) });
    if (/auth\/v1\/user/.test(u)) return route.fulfill({ headers: cors, contentType: "application/json", body: JSON.stringify(user) });
    if (/rpc\/tpk_auth_login/.test(u)) { rpcCalled = true; return route.fulfill({ headers: cors, contentType: "application/json", body: JSON.stringify({ token: "tok", username: "alex@example.com", rev: 1, created: true }) }); }
    return route.fulfill({ headers: cors, contentType: "application/json", body: "[]" });
  });
  await page.addInitScript(() => { try { localStorage.setItem("qwebbo-auth-code-verifier", "verifier-verifier-verifier-verifier-verifier-1234"); } catch (e) {} });
  await page.goto("/?code=abc123");
  await expect(page.locator("#onbNick")).toBeVisible({ timeout: 15000 });
  expect(rpcCalled).toBe(true);
  expect(await page.inputValue("#onbNick")).toBe("Alex Martin");
  expect(page.url()).not.toContain("code=");
});
