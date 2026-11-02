// Shared helpers: a fake Supabase (no network), a clean browser, and shortcuts to play the quiz.
const { expect } = require("@playwright/test");

// Stand-in for supabase-js: every table starts empty and inserts are kept in window.__inserts.
const FAKE_SUPABASE = `
(function () {
  window.__inserts = [];
  window.__failInserts = false;
  function Q(t) { this.t = t; }
  ["select", "eq", "in", "gt", "lt", "order", "limit", "neq"].forEach(m => { Q.prototype[m] = function () { return this; }; });
  Q.prototype.maybeSingle = function () { return this; };
  Q.prototype.insert = function (row) { this.row = row; return this; };
  Q.prototype.update = function () { return this; };
  Q.prototype.then = function (res, rej) {
    var self = this, out;
    if (self.row !== undefined) {
      if (window.__failInserts) out = { data: null, error: { message: "Failed to fetch" } };
      else { window.__inserts.push({ table: self.t, row: self.row }); out = { data: null, error: null }; }
    } else out = { data: [], error: null };
    return Promise.resolve(out).then(res, rej);
  };
  var chan = { on: function () { return chan; }, subscribe: function () { return chan; } };
  window.supabase = { createClient: function () {
    return { from: function (t) { return new Q(t); }, channel: function () { return chan; }, removeChannel: function () {},
      auth: { getSession: async () => ({ data: { session: null } }) } };
  } };
})();
`;

// Open the site with a clean state. Only localhost is reachable: fonts, analytics and Supabase are replaced.
async function openSite(page, { path = "/", storage = {} } = {}) {
  await page.route(/^https?:\/\/(?!localhost)/, route => {
    const url = route.request().url();
    if (/supabase-js/.test(url)) return route.fulfill({ contentType: "text/javascript", body: FAKE_SUPABASE });
    if (/fonts\.googleapis/.test(url)) return route.fulfill({ contentType: "text/css", body: "" });
    return route.abort();
  });
  await page.addInitScript(items => {
    // the first visit shows a tour and a daily goal prompt; the tests start from a visitor who has seen them
    if (!sessionStorage.getItem("__e2e_init")) {
      sessionStorage.setItem("__e2e_init", "1");
      for (const [k, v] of Object.entries(items)) localStorage.setItem(k, v);
    }
  }, storage);
  await page.goto(path);
  await expect(page.locator("#quizGrid .qcard").first()).toBeAttached();
}

// Pick a built-in quiz from the home grid, e.g. "socio".
async function openQuiz(page, id) {
  await page.locator(`#quizGrid .qcard[data-id="${id}"]`).click();
  await expect(page.locator("#topic")).toBeVisible();
}

// Play with the default settings from the quiz page: select the first unit(s) and start a solo round.
async function startSolo(page) {
  await page.locator("#playTab").click();
  await page.locator("#soloBtn").click();
}

// Click the right tile on the question screen (reads the answer from the page).
async function answerRight(page) {
  const k = await page.evaluate(() => correctPos(G.qi));
  await page.locator(`#qTiles .tile[data-k="${k}"]`).click();
}
async function answerWrong(page) {
  const k = await page.evaluate(() => correctPos(G.qi));
  const other = await page.locator("#qTiles .tile:not([hidden])").evaluateAll((els, k) => els.map(e => +e.dataset.k).find(x => x !== k), k);
  await page.locator(`#qTiles .tile[data-k="${other}"]`).click();
}

// Short round: choose 5 questions, play solo, answer them all (right ones only if `wrongAt` is not given).
async function playRound(page, { wrongAt = [] } = {}) {
  await page.locator("#playTab").click();
  await page.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
  await page.locator("#lenChips button", { hasText: /^5$/ }).click();
  await page.locator("#soloBtn").click();
  for (let i = 0; i < 5; i++) {
    await expect(page.locator("#question")).toBeVisible();
    await expect(page.locator("#qNum")).toContainText(`Question ${i + 1} / 5`);
    await page.locator("#qTiles .tile").first().waitFor();
    if (wrongAt.includes(i)) await answerWrong(page); else await answerRight(page);
    await expect(page.locator("#reveal")).toBeVisible();
    await page.locator("#rNext").click();
  }
  await expect(page.locator("#end")).toBeVisible();
}

module.exports = { playRound, openSite, openQuiz, startSolo, answerRight, answerWrong, FAKE_SUPABASE };
