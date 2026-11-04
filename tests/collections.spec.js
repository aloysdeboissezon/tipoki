// The home screen shows one collection at a time: ESADE business-school quizzes or the general (culture & fun) ones.
const { test, expect } = require("@playwright/test");
const { openSite } = require("./helpers");

const ids = page => page.locator("#quizGrid .qcard:visible").evaluateAll(els => els.map(e => e.dataset.id));

test("the ESADE switch shows only the business-school quizzes", async ({ page }) => {
  await openSite(page);
  let shown = await ids(page);
  expect(shown).toEqual(expect.arrayContaining(["culture", "ukculture", "uspop"]));
  expect(shown).not.toContain("socio");
  await page.locator("#grpEsade").click();
  await expect(page.locator("#grpEsade")).toHaveAttribute("aria-pressed", "true");
  shown = await ids(page);
  expect(shown).toEqual(expect.arrayContaining(["socio", "compta2", "populism", "bizenglish", "finance", "brands", "founders", "barcelona"]));
  expect(shown).not.toContain("culture");
  await page.locator("#grpGen").click();
  expect(await ids(page)).not.toContain("socio");
});

test("searching looks through both collections", async ({ page }) => {
  await openSite(page);
  await page.locator("#quizSearch").fill("consolidation");
  expect(await ids(page)).toEqual(["compta2"]);
});
