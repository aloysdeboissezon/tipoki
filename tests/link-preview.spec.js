// Link previews (WhatsApp, Instagram...) don't run JavaScript: the tags must be right in the HTML the server sends.
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { TEXTS } = require("../api/home");

const tag = (html, attr, name) => (html.match(new RegExp('<meta ' + attr + '="' + name + '" content="([^"]*)"')) || [])[1];

test.describe("Link preview tags", () => {
  test("the brand is lowercase in every preview tag of the static page", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).toMatch(/<title>Qwebbo – /);   // the page title starts with a capital on purpose since the SEO change of PR #179 (search engines mixed the name up with a streamer); the preview tags stay lowercase
    for (const [a, n] of [["name", "description"], ["property", "og:title"], ["property", "og:description"], ["property", "og:site_name"], ["name", "twitter:title"]]) {
      const v = tag(html, a, n);
      expect(v, n).toBeTruthy();
      if (!/description/.test(n)) expect(v, n).not.toMatch(/Qwebbo/);   // the descriptions say "Qwebbo" on purpose (PR #179)
      expect(v, n).toMatch(/qwebbo/i);
    }
  });

  for (const lang of ["fr", "es", "ko"]) {
    test(`?lang=${lang} gives the preview in that language`, async ({ request }) => {
      const html = await (await request.get(`/?quiz=gastro&lang=${lang}`)).text();
      expect(html).toContain(`<html lang="${lang}">`);
      expect(html).toContain(`<title>${TEXTS[lang].title}</title>`);
      for (const [a, n, v] of [["name", "description", "desc"], ["property", "og:title", "title"], ["property", "og:description", "desc"], ["name", "twitter:title", "title"], ["name", "twitter:description", "desc"]])
        expect(tag(html, a, n), n).toBe(TEXTS[lang][v]);
      expect(tag(html, "property", "og:image")).toBe("https://qwebbo.com/img/og-image.png?v=20261105");
    });
  }

  test("the texts match the in-page translations (js/i18n*.js)", () => {
    const files = { fr: "i18n.js", es: "i18n-es.js", ko: "i18n-ko.js" };
    for (const [lang, f] of Object.entries(files)) {
      const src = fs.readFileSync(path.join(__dirname, "..", "js", f), "utf8");
      expect(src, lang + " title").toContain(JSON.stringify(TEXTS[lang].title));
      expect(src, lang + " desc").toContain(JSON.stringify(TEXTS[lang].desc));
    }
  });

  test("unknown language falls back to English and the page still works", async ({ request, page }) => {
    const html = await (await request.get("/?lang=zz")).text();
    expect(html).toContain(fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8").match(/<title>[^<]*<\/title>/)[0]);   // English and unknown languages get the page as it is
    expect(tag(html, "property", "og:title")).toBe(TEXTS.en.title);
    expect(html).toContain('<html lang="en">');
    await page.goto("/?lang=ko");
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    await expect(page.locator("#langBtn .bt")).toHaveText("KO");
  });
});
