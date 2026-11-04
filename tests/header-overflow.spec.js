const { test, expect } = require("@playwright/test");
const { makeStore, connect, openShared } = require("./fake-backend");

// A signed-in player's name sits in the top bar; however long, every button must stay on screen.
for (const w of [320, 360, 390]) {
  for (const name of ["Charles", "Maximilienne-Alexandra"]) {
    test(`top bar fits at ${w}px with "${name}"`, async ({ browser }, info) => {
      const ctx = await browser.newContext({ locale: "en-US", serviceWorkers: "block", viewport: { width: w, height: 700 }, isMobile: true, hasTouch: true });
      await connect(ctx, makeStore());
      const page = await ctx.newPage();
      await openShared(page, {});
      await page.evaluate(n => {
        const a = document.getElementById("accBtn");
        a.className = "iconbtn accbtn on";
        a.innerHTML = '<span class="acc-av">C</span><span class="bt acc-nm">' + n + "</span>";
      }, name);
      const r = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const bad = [...document.querySelectorAll(".top button")].filter(e => e.offsetParent && (e.getBoundingClientRect().right > vw + 0.5 || e.getBoundingClientRect().left < -0.5)).map(e => e.id);
        return { vw, sw: document.documentElement.scrollWidth, bad };
      });
      if (process.env.SHOTS) await page.screenshot({ path: `${process.env.SHOTS}-${w}-${name.length}.png`, clip: { x: 0, y: 0, width: w, height: 130 } });
      expect(r.bad).toEqual([]);
      expect(r.sw).toBeLessThanOrEqual(r.vw);
      await ctx.close();
    });
  }
}
