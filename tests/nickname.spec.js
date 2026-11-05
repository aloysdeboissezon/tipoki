const { test, expect } = require("@playwright/test");
const fs = require("fs"), path = require("path"), cp = require("child_process");
const { openSite } = require("./helpers");
const N = require("../js/nickfilter.js");

const BAD = ["fuck", "FUUUCK", "f u c k", "f.u.c.k", "sh!t", "xxfuckxx", "n1gger", "Nazi", "hitler", "mierda", "Putain", "p u t e", "enculé", "salope",
  "시발", "씨 발", "개새끼", "ㅅㅂ", "c0ck", "a$$", "ass", "asss", "b1tch", "Hijo de puta", "joder", "pu7ain"];
const LINKS = ["http://x.com", "a@b.com", "alex.com", "0612345678", "www.spam"];
const GOOD = ["Alex", "Scunthorpe", "Monique", "Assunta", "Cassandra", "Classic", "Jasmine", "Hassan", "Richard", "Dick", "Con", "Conor", "Kike", "Enrique",
  "Van Dyke", "Shiitake", "Mike", "María", "José", "Zoë", "Léa", "Chloé", "Hélène", "Nazir", "Cumberbatch", "Cocktail", "Penny", "Peniche", "Cullen",
  "Hancock", "Computer", "Grape", "Therapist", "Spice", "Bastian", "Rob Itchy", "Ed Itch", "Lucas123", "김민준", "이서연", "Xavi", "Núria", "Joaquín"];

test.describe("nickname filter", () => {
  test("offensive names, links and phone numbers are refused; ordinary names pass (no Scunthorpe problem)", () => {
    for (const n of BAD) expect(N.check(n), n).toBe("bad");
    for (const n of LINKS) expect(N.check(n), n).toBe("link");
    for (const n of GOOD) expect(N.check(n), n).toBe("");
    expect(N.show("fuck")).toBe("Player");
    expect(N.show("Alex")).toBe("Alex");
  });

  test("the SQL migration is up to date with the word lists", () => {
    const f = path.join(__dirname, "..", "supabase", "migrations", "add_nick_filter.sql");
    const before = fs.readFileSync(f, "utf8");
    cp.execFileSync("node", [path.join(__dirname, "..", "tools", "gen-nick-sql.js")]);
    expect(fs.readFileSync(f, "utf8")).toBe(before);
  });

  test("typing a bad name shows a friendly message and saves nothing; a good name is saved", async ({ page }) => {
    await openSite(page, { storage: { "socio-nick": "Alex" } });
    const nick = page.locator("#nick");
    await nick.fill("fuck");
    await expect(page.locator("#nickErr")).toBeVisible();
    await expect(page.locator("#nickErr")).toContainText("isn't allowed");
    expect(await page.evaluate(() => localStorage.getItem("socio-nick"))).toBe("Alex");   // the last good name is kept
    expect(await page.evaluate(() => myNick())).toBe("Player");                            // and the bad one never reaches a room
    await nick.fill("alex.com");
    await expect(page.locator("#nickErr")).toContainText("links");
    await nick.fill("Sam");
    await expect(page.locator("#nickErr")).toBeHidden();
    expect(await page.evaluate(() => localStorage.getItem("socio-nick"))).toBe("Sam");
  });

  test("a bad name already saved on the device is dropped on load, and the message is translated", async ({ page }) => {
    await openSite(page, { storage: { "socio-nick": "shit", "tpk-lang": "fr" } });
    await expect(page.locator("#nick")).toHaveValue("");
    expect(await page.evaluate(() => localStorage.getItem("socio-nick"))).toBe("");
    await page.locator("#nick").fill("putain");
    await expect(page.locator("#nickErr")).toContainText("pas autorisé");
  });
});
