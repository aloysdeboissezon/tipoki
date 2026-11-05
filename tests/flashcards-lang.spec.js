// Flashcards follow the interface language when the quiz ships a translation; progress keys stay the same across languages.
const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

for (const [lang, term] of [["fr", "Sociologie"], ["es", "Sociología"], ["en", "Sociology"]]) {
  test(`socio flashcards are in ${lang}`, async ({ page }) => {
    await openSite(page, { path: "/?lang=" + lang });
    await openQuiz(page, "socio");
    const r = await page.evaluate(() => ({ t: BANK.facts[0][3], key: fk(BANK.facts[0]), n: BANK.facts.length }));
    expect(r.t).toBe(term);
    expect(r.key).toBe("Sociology");
    expect(r.n).toBeGreaterThan(200);
  });
}
