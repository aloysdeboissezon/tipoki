// The server side of the ESADE gate: api/esade.js (the real function, with the "is this token ESADE?" answer faked by the token's name,
// see tests/server.js) and the fact that the ESADE files are not downloadable as plain files.
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const OK = { Authorization: "Bearer e2e-esade-token-0000000000" };

test.describe("/api/esade", () => {
  test("no token: 401, token of a non-ESADE account: 403, expired token: 401", async ({ request }) => {
    expect((await request.get("/api/esade?k=bank&id=socio")).status()).toBe(401);
    expect((await request.get("/api/esade?k=bank&id=socio", { headers: { Authorization: "Bearer e2e-plain-token-00000000000" } })).status()).toBe(403);
    expect((await request.get("/api/esade?k=bank&id=socio", { headers: { Authorization: "Bearer e2e-gone-token-000000000000" } })).status()).toBe(401);
  });

  test("an ESADE token gets the quiz, its study sheet and its PDF, never cached", async ({ request }) => {
    for (const id of ["socio", "compta2", "populism", "regression"]) {
      const r = await request.get(`/api/esade?k=bank&id=${id}`, { headers: OK });
      expect(r.status(), id).toBe(200);
      expect(await r.text()).toContain("window.BANK_" + id.toUpperCase());
      expect(r.headers()["cache-control"]).toContain("no-store");
    }
    const sheet = await request.get("/api/esade?k=sheet&id=socio", { headers: OK });
    expect(await sheet.text()).toContain("window.SHEETS.socio");
    const pdf = await request.get("/api/esade?k=pdf&id=socio", { headers: OK });
    expect(pdf.headers()["content-type"]).toBe("application/pdf");
    expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  });

  test("unknown or odd requests are refused", async ({ request }) => {
    for (const q of ["k=bank&id=culture", "k=bank&id=../../package", "k=bank&id=", "k=other&id=socio", "id=socio"])
      expect((await request.get("/api/esade?" + q, { headers: OK })).status(), q).toBe(404);
    expect((await request.post("/api/esade?k=bank&id=socio", { headers: OK })).status()).toBe(405);
  });

  test("the ESADE files are not public: not at their old addresses, not in api/_esade, and not in the page", async ({ request }) => {
    for (const u of ["/js/banks/socio.js", "/js/banks/compta2.js", "/js/banks/populism.js", "/js/banks/regression.js", "/js/sheets/socio.js",
      "/sheets/socio.pdf", "/sheets/compta2.pdf", "/sheets/populism.pdf", "/api/_esade/banks/socio.js", "/api/esade.js"])
      expect((await request.get(u)).status(), u).toBe(404);
    const html = await (await request.get("/")).text();
    expect(html).not.toMatch(/banks\/(socio|compta2|populism|regression)\.js|sheets\/(socio|compta2|populism)/);
  });

  test("every quiz the page treats as ESADE has its file behind the gate, and nothing else is there", async ({ page }) => {
    await page.goto("/");
    const ids = await page.evaluate(() => ESADE_IDS.slice().sort());
    const files = fs.readdirSync(path.join(__dirname, "..", "api", "_esade", "banks")).map(f => f.replace(/\.js$/, "")).sort();
    expect(ids).toEqual(files);
  });
});
