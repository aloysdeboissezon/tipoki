// Every academic quiz offers three ways to study besides the game: flashcards, a study sheet (with its PDF), and the exam mode.
// The ESADE ones get their flashcards (inside the quiz file) and their sheet/PDF only through /api/esade.
const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

const ESADE = ["socio", "compta2", "populism", "regression", "justice"];
const ACADEMIC = [...ESADE, "energie", "structure"];
const OK = { Authorization: "Bearer e2e-esade-token-0000000000" };

for (const id of ACADEMIC) {
  test(`${id}: flashcards and a study sheet are offered and work`, async ({ page }) => {
    await openSite(page);
    await openQuiz(page, id);
    await expect(page.locator("#cardsJump")).toBeVisible();
    await expect(page.locator("#sheetCard")).toBeVisible();
    // flashcards: the deck starts, a card flips and can be marked
    await page.locator("#cardsJump").click();
    await page.locator("#fcGo").click();
    await expect(page.locator("#cards")).toBeVisible();
    const n = await page.evaluate(() => FC.deck.length);
    expect(n).toBeGreaterThan(5);
    await expect(page.locator("#fcPlay")).toBeVisible();
    await page.locator("#fcCard").click();
    expect(await page.evaluate(() => FC.flip)).toBe(true);
    // study sheet: opens with a cover, a table of contents and several sections
    await page.goto("/?quiz=" + id);
    await page.locator("#sheetCard").click();
    await expect(page.locator(".doc .dc-cover")).toBeVisible();
    expect(await page.locator(".doc .dc-sec").count()).toBeGreaterThanOrEqual(5);
  });
}

test("every academic quiz has flashcards (facts for every unit) and a sheet", async ({ request }) => {
  for (const id of ESADE) {
    const bank = await (await request.get(`/api/esade?k=bank&id=${id}`, { headers: OK })).text();
    const sheet = await request.get(`/api/esade?k=sheet&id=${id}`, { headers: OK });
    const pdf = await request.get(`/api/esade?k=pdf&id=${id}`, { headers: OK });
    expect(sheet.status(), id + " sheet").toBe(200);
    expect(await sheet.text()).toContain("window.SHEETS." + id);
    expect((await pdf.body()).subarray(0, 5).toString(), id + " pdf").toBe("%PDF-");
    const facts = new Function("window", bank + `;return window.BANK_${id.toUpperCase()}.facts`)({});
    expect(facts.length, id + " facts").toBeGreaterThan(20);
  }
});

test("flashcards, sheets and PDFs of the ESADE quizzes stay behind the gate", async ({ request }) => {
  for (const id of ESADE) for (const k of ["bank", "sheet", "pdf"])
    expect((await request.get(`/api/esade?k=${k}&id=${id}`)).status(), `${id} ${k}`).toBe(401);
  for (const u of ["/api/_esade/sheets/regression.js", "/api/_esade/pdf/regression.js", "/sheets/regression.pdf", "/js/sheets/regression.js"])
    expect((await request.get(u)).status(), u).toBe(404);
});
