const { test, expect } = require("@playwright/test");
const { openSite, openQuiz, playRound, answerRight, answerWrong } = require("./helpers");

test.use({ permissions: ["clipboard-read", "clipboard-write"] });

test.describe("challenge a friend by link", () => {
  test("the sender gets a link, the friend plays the same questions and sees both scores", async ({ page, context }) => {
    await page.addInitScript(() => { Object.defineProperty(navigator, "share", { value: undefined }); }); // force "copy the link"
    await openSite(page, { storage: { "socio-nick": "Alice" } });
    await openQuiz(page, "socio");
    await playRound(page, { wrongAt: [0] }); // 4 / 5
    const senderDeck = await page.evaluate(() => G.deck.map(d => d.id));

    await expect(page.locator("#end .chal .chal-p")).toContainText("Send this link");
    await page.locator("#end .chal button").click();
    await expect(page.locator("#status")).toContainText("Challenge link copied");
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    const link = copied.match(/https?:\/\/\S+/)[0];
    expect(link).toContain("?quiz=socio&ch=");
    expect(copied).toContain("4 / 5");

    // the friend opens the link on another device (clean storage)
    const friend = await (await context.browser().newContext({ locale: "en-US", permissions: [] })).newPage();
    await openSite(friend, { path: new URL(link).pathname + new URL(link).search, storage: { "socio-nick": "Bob" } });
    await expect(friend.locator("#topic .chal .chal-t")).toContainText("Alice challenges you");
    await expect(friend.locator("#topic .chal .chal-p")).toContainText("4 / 5");
    await friend.locator("#topic .chal button", { hasText: "Accept the challenge" }).click();

    // same questions, same order
    expect(await friend.evaluate(() => G.deck.map(d => d.id))).toEqual(senderDeck);
    for (let i = 0; i < 5; i++) {
      await expect(friend.locator("#qNum")).toContainText(`Question ${i + 1} / 5`);
      await friend.locator("#qTiles .tile").first().waitFor();
      await answerRight(friend);
      await expect(friend.locator("#reveal")).toBeVisible();
      await friend.locator("#rNext").click();
    }
    await expect(friend.locator("#end")).toBeVisible();
    await expect(friend.locator("#end .chal .prog-badge")).toContainText("You win!"); // 5 / 5 against 4 / 5
    await expect(friend.locator("#end .chal .chal-vs")).toContainText("Alice: 4 / 5");
    await expect(friend.locator("#end .chal .chal-vs")).toContainText("You: 5 / 5");
    await expect(friend.locator("#end .chal button")).toHaveText("Challenge back");
    await friend.close();
  });

  test("a damaged link shows a message instead of breaking the page", async ({ page }) => {
    await openSite(page, { path: "/?quiz=socio&ch=not-a-real-challenge" });
    await expect(page.locator("#status")).toContainText("out of date");
    await expect(page.locator("#quizGrid .qcard").first()).toBeAttached();
  });
});
