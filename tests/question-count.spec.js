// How many questions a game has: the student picks a length among those the course can fill (see docs/professor-workflow.md).
// A professor's course only plays approved items (noExpand), so small courses and empty choices must behave well.
const { test, expect } = require("@playwright/test");
const { openSite, openQuiz } = require("./helpers");

async function course(page, items, sess = { 1: "Ch 1", 2: "Ch 2", 3: "Ch 3" }) {
  await page.evaluate(([items, sess]) => {
    const bank = { id: "countcase", title: "Course", lang: "en", noExpand: true, sess, mcq: [], tf: [], typed: [], facts: [] };
    for (const [n, s, kind] of items) for (let i = 0; i < n; i++) {
      if (kind === "typed") bank.typed.push({ s, q: "T" + s + "-" + i, a: ["x" + i] });
      else if (kind === "tf") bank.tf.push({ s, q: "F" + s + "-" + i, v: true });
      else bank.mcq.push({ s, q: "M" + s + "-" + i, o: ["r", "a", "b", "c"] });
    }
    localStorage.removeItem("tpk-seen-countcase");
    loadBank(bank);
  }, [items, sess]);
}
const look = (page, set = {}) => page.evaluate(set => {
  Object.assign(settings, { fmt: "mix", diff: 0, len: 15, lenWant: null }, set.settings || {});
  settings.sess = new Set(set.sess || ALL_S);
  renderSettings();
  const deck = buildDeck(null, 0, null, { diff: 0 });
  return { chips: [...document.querySelectorAll("#lenChips button")].map(b => b.textContent), len: settings.len, avail: document.getElementById("lenAvail").textContent,
    n: deck.length, typed: deck.filter(d => d.t != null).length, kinds: deck.map(d => (d.t != null ? "T" : "M")).join("") };
}, set);

test.beforeEach(async ({ page }) => { await openSite(page); await openQuiz(page, "socio"); await page.waitForTimeout(300); });

test("a course with 40 approved items offers 5 to 30, 'All 40' and endless; a mix game of 15 alternates the two formats", async ({ page }) => {
  await course(page, [[12, 1, "mcq"], [4, 1, "typed"], [10, 2, "mcq"], [4, 2, "tf"], [8, 3, "mcq"], [2, 3, "typed"]]);
  const r = await look(page);
  expect(r.chips).toEqual(["5", "10", "15", "20", "30", "All 40", "∞"]);
  expect(r.avail).toBe("40 available");
  expect(r.n).toBe(15);
  expect(r.kinds.startsWith("MTMTMTMTMTMT")).toBe(true);   // one of each in turn, while typed questions last (there are 6)
  expect(r.typed).toBe(6);
  const one = await look(page, { sess: [3] });               // one chapter only: 10 items
  expect(one.chips).toEqual(["5", "10", "∞"]);
  expect(one.n).toBe(10);
});

test("a very small course plays everything it has: 'All 3', never more than exists", async ({ page }) => {
  await course(page, [[2, 1, "mcq"], [1, 2, "typed"]]);
  const r = await look(page);
  expect(r.chips).toEqual(["All 3", "∞"]);
  expect(r.len).toBe(3);
  expect(r.n).toBe(3);
});

test("a choice with no question (typed answers on a course that has none) says so and does not start a broken game", async ({ page }) => {
  const errors = []; page.on("pageerror", e => errors.push(e.message));
  await course(page, [[4, 1, "mcq"]]);
  const r = await look(page, { settings: { fmt: "typed" } });
  expect(r.n).toBe(0);
  expect(r.avail).toContain("No question matches this choice");
  await page.evaluate(() => startSolo());
  await expect(page.locator("#createErr")).toContainText("No question matches this choice");
  await expect(page.locator("#question")).toBeHidden();
  expect(errors).toEqual([]);
});

test.describe("professor space", () => {
  test.beforeEach(() => {});
  test("the publish tab tells the professor how many questions students can play in each chapter", async ({ page }) => {
    await page.goto("/prof.html?demo=1");
    await page.locator('a[href^="#/c/"]').first().click();
    await page.click('.tabs [data-tab="publish"]');
    await expect(page.locator("#playable")).toContainText("Students choose the length of each game themselves");
    const rows = await page.locator("#playTable tbody tr").evaluateAll(trs => trs.map(tr => [...tr.children].map(td => td.textContent)));
    expect(rows.length).toBeGreaterThan(1);
    const total = rows.reduce((a, r) => a + Number(r[1]), 0);
    expect(await page.locator("#playable p").first().innerText()).toContain(total + " approved question");
  });
});
