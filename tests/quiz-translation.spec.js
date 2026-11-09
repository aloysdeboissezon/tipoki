// A quiz that ships translations (js/banks/tr/<id>.<lang>.js) is played in the interface language; without one it stays in its own language.
const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

async function firstQuestion(page) {
  await page.locator("#playTab").click();
  await page.locator("#fmtChips button").first().click();   // multiple choice (the label is translated)
  await page.locator("#soloBtn").click();
  await expect(page.locator("#question")).toBeVisible();
  await page.locator("#qTiles .tile").first().waitFor();
  return page.evaluate(() => ({ q: qOf(0).q, opts: (qOf(0).o || []).slice(), lang: BANK.qlang || BANK.lang }));
}

for (const [lang, probe] of [["fr", /Lequel est différent|Que vient ensuite/], ["es", /Cuál es diferente|Qué viene después/], ["ko", /다른 하나는|다음에 올 것은/]]) {
  test(`oddemoji is played in ${lang}`, async ({ page }) => {
    await openSite(page, { path: `/?lang=${lang}` });
    await openQuiz(page, "oddemoji");
    const r = await firstQuestion(page);
    expect(r.q).toMatch(probe);
    expect(r.lang).toBe(lang);
    expect(r.opts.length).toBe(4);
  });
}

test("the same quiz stays in English for an English visitor", async ({ page }) => {
  await openSite(page);
  await openQuiz(page, "oddemoji");
  const r = await firstQuestion(page);
  expect(r.q).toMatch(/Which one is different|What comes next/);
});


test("every translation file matches its quiz and the catalog is up to date", () => {
  const { execFileSync } = require("child_process");
  execFileSync("node", ["tools/check-tr.js"], { stdio: "pipe" });
  execFileSync("node", ["tools/build-catalog.js", "--check"], { stdio: "pipe" });
});

test("true/false questions keep their truth value and use the interface language's words", async ({ page }) => {
  await openSite(page, { path: "/?lang=es" });
  await openQuiz(page, "kids");
  const r = await page.evaluate(async () => {
    await ensureTr("kids");
    const en = BANK_KIDS, es = applyTr({ ...BANK_KIDS, id: "kids" });
    const out = { translated: es.qlang === "es", bad: [] };
    en.Q.forEach((q, i) => {
      const t = es.Q[i];
      if (q.tf) {
        const orig = /^(True|Vrai)$/.test(q.o[0]), now = /^Verdadero$/.test(t.o[0]);
        if (orig !== now || !/^(Verdadero|Falso)$/.test(t.o[1]) || t.a !== 0) out.bad.push(i);
      } else if (t.o.length !== 4 || t.a !== 0 || t.d !== q.d) out.bad.push(i);
    });
    return out;
  });
  expect(r.translated).toBe(true);
  expect(r.bad).toEqual([]);
});

test("Culture générale is fully Korean for a Korean visitor (questions, answers, language questions)", async ({ page }) => {
  await openSite(page, { path: "/?lang=ko" });
  await openQuiz(page, "culture");
  await page.waitForFunction(() => BANK && BANK.id === "culture" && BANK.qlang === "ko");
  const r = await page.evaluate(() => {
    const hangul = /[가-힣]/;
    const bad = Q.filter(q => !hangul.test(q.q)).length;
    const lang = Q.filter(q => q.t === "언어").slice(0, 4).map(q => q.q);
    return { n: Q.length, bad, qlang: BANK.qlang, lang, typed: TQ.filter(q => !hangul.test(q.q)).length };
  });
  expect(r.qlang).toBe("ko");
  expect(r.n).toBeGreaterThan(2000);
  expect(r.bad).toBe(0);
  expect(r.typed).toBe(0);
  expect(r.lang.join(" ")).not.toMatch(/Comment dit-on/);
});
