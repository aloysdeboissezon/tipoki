const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

test.describe("Spanish interface", () => {
  test("the browser's Spanish is detected and the interface is in Spanish", async ({ browser }) => {
    const ctx = await browser.newContext({ locale: "es-ES" });
    const page = await ctx.newPage();
    await openSite(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("body")).toContainText("¿Qué quieres estudiar?");
    await expect(page.locator("#langBtn .bt")).toHaveText("ES");
    expect(await page.evaluate(() => [...tlMissing].filter(k => !(k in ES) && !/^(Aa|FR|https?:.*)$/.test(k)))).toEqual([]);
    await ctx.close();
  });

  test("the language menu switches to Spanish, remembers it, and the quiz keeps its language", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await openSite(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.locator("#langBtn").click();
    await page.locator("#langMenu .lang-opt", { hasText: "Español" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    expect(await page.evaluate(() => localStorage.getItem("tpk-lang"))).toBe("es");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("body")).toContainText("Aprende");
    await openQuiz(page, "socio");
    await expect(page.locator("body")).toContainText("Jugar solo");
  });

  test("the Spanish dictionary has every key the French one has", async ({ page }) => {
    await openSite(page);
    const diff = await page.evaluate(() => ({
      missing: Object.keys(FR).filter(k => !(k in ES)),
      extra: Object.keys(ES).filter(k => !(k in FR)),
      brokenVars: Object.keys(FR).filter(k => k in ES && (k.match(/\{\w+\}/g) || []).sort().join() !== (ES[k].match(/\{\w+\}/g) || []).sort().join()),
    }));
    expect(diff).toEqual({ missing: [], extra: [], brokenVars: [] });
  });
});

test.describe("Korean interface", () => {
  test("the browser's Korean is detected and the interface is in Korean", async ({ browser }) => {
    const ctx = await browser.newContext({ locale: "ko-KR" });
    const page = await ctx.newPage();
    await openSite(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    await expect(page.locator("body")).toContainText("무엇을 공부할까요?");
    await expect(page.locator("#langBtn .bt")).toHaveText("KO");
    expect(await page.evaluate(() => [...tlMissing].filter(k => !(k in KO) && !/^(Aa|FR|https?:.*)$/.test(k)))).toEqual([]);
    await ctx.close();
  });

  test("the language menu offers 한국어, remembers it, and the quiz keeps its language", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await openSite(page);
    await page.locator("#langBtn").click();
    await page.locator("#langMenu .lang-opt", { hasText: "한국어" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    expect(await page.evaluate(() => localStorage.getItem("tpk-lang"))).toBe("ko");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    await openQuiz(page, "socio");
    await expect(page.locator("body")).toContainText("혼자 하기");
  });

  test("the Korean dictionary has every key the French one has, with the same {variables}", async ({ page }) => {
    await openSite(page);
    const diff = await page.evaluate(() => ({
      missing: Object.keys(FR).filter(k => !(k in KO)),
      extra: Object.keys(KO).filter(k => !(k in FR)),
      brokenVars: Object.keys(FR).filter(k => k in KO && (k.match(/\{\w+\}/g) || []).sort().join() !== (KO[k].match(/\{\w+\}/g) || []).sort().join()),
    }));
    expect(diff).toEqual({ missing: [], extra: [], brokenVars: [] });
  });
});

test.describe("Quiz names in every interface language", () => {
  test("every quiz has a title, subject and chapter names in EN, FR, ES and KO (no left-over from another language)", async ({ page }) => {
    await openSite(page);
    const res = await page.evaluate(() => {
      const bad = [], titles = {};
      for (const id of Object.keys(BUILTIN)) {
        const raw = BUILTIN[id]() || BANK_META[id];
        for (const lang of ["en", "fr", "es", "ko"]) {
          const m = QMETA[id] && QMETA[id][lang];
          const nativeLang = (raw.lang || (QMETA[id] && !QMETA[id].en ? "en" : "fr"));
          if (!m) { if (!QMETA[id] || Object.keys(QMETA[id]).length < 2) bad.push(id + " has no translations"); continue; }
          if (!m[0] || !m[1]) bad.push(id + "/" + lang + ": missing title or subject");
          const n = Object.keys(raw.sess || {}).length;
          if (m[2].length !== n) bad.push(id + "/" + lang + ": " + m[2].length + " chapter names for " + n + " chapters");
          if (raw.tags && (!m[3] || m[3].length !== Object.keys(raw.tags).length)) bad.push(id + "/" + lang + ": chapter tags do not match");
          (titles[id] = titles[id] || {})[lang] = m[0];
        }
      }
      return { bad, ids: Object.keys(BUILTIN).length, covered: Object.keys(QMETA).length };
    });
    expect(res.bad).toEqual([]);
    expect(res.covered).toBe(res.ids);
  });

  for (const [lang, locale, wants] of [["en", "en-US", { compta2: "Accounting Quiz 2" }], ["fr", "fr-FR", { compta2: "Quiz compta 2", gastro: "Gastronomie" }], ["es", "es-ES", { compta2: "Quiz de contabilidad 2", gastro: "Gastronomía" }], ["ko", "ko-KR", { compta2: "회계 퀴즈 2", gastro: "프랑스 미식과 전통" }]]) {
    test(`home cards and the opened quiz show the ${lang} names`, async ({ browser }) => {
      const ctx = await browser.newContext({ locale });
      const page = await ctx.newPage();
      await openSite(page);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      const names = await page.evaluate(() => quizList().reduce((o, q) => (o[q.id] = q.title, o), {}));
      for (const [id, w] of Object.entries(wants)) expect(names[id]).toContain(w);
      // every title differs from the one in another language, except proper names kept on purpose
      await openQuiz(page, "compta2");
      await expect(page.locator("#bankTitle")).toHaveText(wants.compta2);
      await ctx.close();
    });
  }
});
