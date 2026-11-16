// Home page: consistent quiz titles (subject first), ESADE logo beside the heart, compact profile block.
const { test, expect } = require("@playwright/test");
const { openSite } = require("./helpers");

test.describe("Home page cleanup", () => {
  test("ESADE cards start with the subject, show the ESADE logo left of the heart", async ({ page }) => {
    await openSite(page);
    await page.locator("#esadeBtn").click();
    const titles = await page.locator("#quizGrid .qcard b").allTextContents();
    expect(titles).toEqual(expect.arrayContaining(["Sociology · Sessions 1–10", "Sociology · Sessions 14–15", "Accounting · Consolidation", "Statistics · Unit 5: Linear Regression"]));
    expect(titles.join("|")).not.toMatch(/Training|Socio Trivia|Quiz 2/);
    const card = page.locator('#quizGrid .qcard[data-id="regression"]');
    await expect(card.locator("img.qesade")).toHaveAttribute("alt", "ESADE");
    const a = await card.locator(".qesade").boundingBox(), h = await card.locator(".qfav").boundingBox();
    expect(a.x + a.width).toBeLessThanOrEqual(h.x + 1);
    expect(Math.abs(a.y - h.y)).toBeLessThan(12);   // cards scale while the carousel settles
    await page.locator("#esadeBtn").click();
    await expect(page.locator("#quizGrid .qesade")).toHaveCount(0);   // normal quizzes carry no ESADE logo
  });

  test("friend-code block is one line at the top; profile block has no label and is compact with the avatar on the left", async ({ page }) => {
    await openSite(page);
    const jp = await page.locator("#joinPanel").boundingBox(), pk = await page.locator("#pickPanel").boundingBox();
    expect(jp.y).toBeLessThan(pk.y);
    expect(jp.height).toBeLessThan(72);   // one row
    const t = await page.locator("#joinPanel .join-t").boundingBox(), ci0 = await page.locator("#codeBoxes").boundingBox(), jb0 = await page.locator("#joinBtn").boundingBox();
    expect(Math.abs(t.y + t.height / 2 - (ci0.y + ci0.height / 2))).toBeLessThan(6);
    expect(Math.abs(jb0.y - ci0.y)).toBeLessThan(6);
    await expect(page.locator("#meHome .label")).toHaveCount(0);
    await expect(page.locator("#nick")).toHaveAttribute("placeholder", "Your first name or nickname");
    await expect(page.locator(".me-hint")).toHaveCount(0);
    await expect(page.locator("#pfpPick")).toHaveCount(0);
    await expect(page.locator("#pfpDel")).toBeHidden();
    const pfp = page.locator("#pfpBtn");
    await expect(pfp).toHaveAttribute("aria-label", "Add a photo");
    await expect(pfp.locator(".pfp-add")).toBeAttached();
    const a = await pfp.boundingBox(), n = await page.locator("#nick").boundingBox(), c = await page.locator("#country").boundingBox();
    expect(a.x + a.width).toBeLessThanOrEqual(n.x);
    // the flag picker sits to the right of the name, on the same row
    expect(c.x).toBeGreaterThanOrEqual(n.x + n.width - 1);
    expect(Math.abs(c.y + c.height / 2 - (n.y + n.height / 2))).toBeLessThan(4);
    expect(a.y + a.height).toBeGreaterThan(n.y);
    // friend-code row: plain placeholder, compact controls; avatar centred on the name + country rows
    await expect(page.locator("#codeBoxes input")).toHaveCount(4);
    const ci = await page.locator("#cb0").boundingBox(), jb = await page.locator("#joinBtn").boundingBox();
    expect(ci.height).toBeLessThanOrEqual(48); expect(ci.height).toBeGreaterThanOrEqual(44);
    expect(jb.height).toBeLessThanOrEqual(48); expect(jb.height).toBeGreaterThanOrEqual(44);
    expect(Math.abs(a.y + a.height / 2 - (n.y + n.height / 2))).toBeLessThan(8);
  });
});

test.describe("ESADE-only site", () => {
  test("the home shows only ESADE quizzes and the tutorial, with no way to reach the others", async ({ page }) => {
    await openSite(page, { esadeOnly: true });
    await expect(page.locator("#tour")).toBeVisible();
    await expect(page.locator("#home .hero")).toBeVisible();
    await expect(page.locator("#esadeBtn")).toBeHidden();
    const ids = await page.locator("#quizGrid .qcard").evaluateAll(n => n.map(x => x.dataset.id));
    expect(ids.length).toBeGreaterThan(3);
    expect(ids).toContain("resistance");
    for (const id of ids) expect(["socio", "compta2", "populism", "regression", "justice", "resistance"]).toContain(id);
    expect(await page.locator("#qList .qchip").evaluateAll(n => n.map(x => x.dataset.id))).toEqual(ids);
    await page.goto("/?space=all");   // the old switch does nothing
    await expect(page.locator("#quizGrid .qcard[data-id=culture]")).toHaveCount(0);
    await page.goto("/?quiz=culture");   // a link to a non-ESADE quiz stays on the ESADE home
    await expect(page.locator("#topic")).toBeHidden();
    await expect(page.locator("#quizGrid .qcard[data-id=culture]")).toHaveCount(0);
  });
  test("an ESADE quiz link opens the quiz; going back shows only ESADE quizzes", async ({ page }) => {
    await openSite(page, { path: "/?quiz=resistance", esadeOnly: true });
    await expect(page.locator("#topic")).toBeVisible();
    await page.locator("#topicBack").click();
    await expect(page.locator("#quizGrid .qcard[data-id=culture]")).toHaveCount(0);
  });
});
