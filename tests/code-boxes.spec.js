const { test, expect } = require("@playwright/test");
const { openSite } = require("./helpers");

// the friend's code is 4 side-by-side boxes (one letter each); the country picker shows only the flag once chosen
test.describe("friend code boxes and flag picker", () => {
  test("typing advances, backspace goes back, paste fills all four", async ({ page }) => {
    await openSite(page);
    const boxes = page.locator("#codeBoxes input");
    await expect(boxes).toHaveCount(4);
    await page.locator("#cb0").click();
    await page.keyboard.type("kt");
    await expect(page.locator("#cb0")).toHaveValue("K");
    await expect(page.locator("#cb1")).toHaveValue("T");
    await expect(page.locator("#cb2")).toBeFocused();
    await page.keyboard.press("Backspace");           // empty box: goes back and clears the previous one
    await expect(page.locator("#cb1")).toBeFocused();
    await expect(page.locator("#cb1")).toHaveValue("");
    await page.keyboard.type("1!rm");                  // digits and symbols are ignored
    expect(await page.evaluate(() => window.tpkCode.get())).toBe("KRM");
    await page.evaluate(() => { const dt = new DataTransfer(); dt.setData("text", "wxyz"); document.getElementById("cb2").dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true })); });
    expect(await page.evaluate(() => window.tpkCode.get())).toBe("WXYZ");
    // the Join button keeps its validation
    await page.evaluate(() => window.tpkCode.set("AB"));
    await page.locator("#joinBtn").click();
    await expect(page.locator("#joinErr")).toBeVisible();
  });

  test("country picker: flag alone when closed, flag + name in the list", async ({ page }) => {
    await openSite(page, { storage: { "tpk-country": "FR" } });
    const sel = page.locator("#country");
    expect((await sel.evaluate(s => s.options[s.selectedIndex].textContent)).trim()).toBe("🇫🇷");
    await sel.dispatchEvent("pointerdown");
    const open = await sel.evaluate(s => s.options[s.selectedIndex].textContent);
    expect(open).toContain("France"); expect(open.startsWith("🇫🇷")).toBe(true);
    await sel.selectOption("ES");
    expect((await sel.evaluate(s => s.options[s.selectedIndex].textContent)).trim()).toBe("🇪🇸");
    expect(await page.evaluate(() => localStorage.getItem("tpk-country"))).toBe("ES");
  });
});

test("search says courses; the goal word of the slogan is highlighted", async ({ page }) => {
  await openSite(page);
  await expect(page.locator("#quizSearch")).toHaveAttribute("placeholder", "Search courses…");
  expect(await page.locator("h1.slogan span").last().evaluate(e => getComputedStyle(e).color)).toBe("rgb(255, 212, 59)");
});
