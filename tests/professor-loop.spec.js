// The whole professor loop, in demo mode (everything stays in the browser, nothing reaches a server):
// professor opens the space -> uploads course material -> gets a kit -> edits, approves, rejects -> publishes ->
// a student opens the course by its code and plays -> the class dashboard and the pilot report read the data.
const { test, expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

async function block(page) {   // only localhost is reachable, like every other test
  await page.route(/^https?:\/\/(?!localhost)/, route => route.abort());
}
const PDF = path.join(__dirname, "..", "demo", "demo-consolidation-notes.pdf");

test.describe("Professor loop (demo mode)", () => {
  test("upload, kit, review, publish, student plays, dashboard and pilot report", async ({ page, context }) => {
    test.setTimeout(120_000);
    await block(page);
    const errors = []; page.on("pageerror", e => errors.push(String(e)));
    await page.goto("/prof.html?demo=1");
    await expect(page.locator("#demoBar")).toBeVisible();
    await expect(page.locator("#courseGrid .course")).toHaveCount(1);   // the seeded sample course

    // 1. a new course and its material: the PDF is read in the browser, page by page
    await page.fill("#ncTitle", "Accounting II (test)");
    await page.click("form button[type=submit]");
    await expect(page.locator("#drop")).toBeVisible();
    await page.setInputFiles("#fileIn", PDF);
    await expect(page.locator("#fileList li")).toHaveCount(1);
    await expect(page.locator("#fileList li")).toContainText("6 pages");

    // 2. the kit arrives entirely "to review"
    await page.click('.tabs [data-tab="kit"]');
    await page.click("#impDemo");
    await expect(page.locator("#revCount")).toHaveText("0 / 28 reviewed");
    // every quote of the sample kit is found on its page of the uploaded PDF (the checker compares them)
    await page.selectOption("select >> nth=0", "flag");
    await expect(page.locator("#revList")).not.toContainText("error");
    const flagged = await page.evaluate(() => [...document.querySelectorAll("#curFlags li")].map(l => l.textContent));
    expect(flagged.join(" ")).not.toMatch(/quote was not found/);
    await page.selectOption("select >> nth=0", "todo");

    // 3. review from the keyboard: approve two, reject one, edit one (an edited item goes back to "to review")
    await expect(page.locator("#curQ")).toHaveText("Which statement best defines a group?");
    await expect(page.locator(".source mark")).toHaveText("A group is a parent and all its subsidiaries");
    await page.keyboard.press("a");
    await page.keyboard.press("a");
    await page.keyboard.press("r");
    await expect(page.locator("#revCount")).toHaveText("3 / 28 reviewed");
    await page.keyboard.press("e");
    await page.fill("#edQ", "Alba SA buys 25% of Brisa SL and sits on its board. How does Alba account for Brisa?");
    await page.click("#edSave");
    await expect(page.locator("#revList")).toContainText("How does Alba account for Brisa?");
    // an item with a mistake cannot be approved
    await page.keyboard.press("e");
    await page.fill("#edO1", await page.inputValue("#edO0"));
    await page.click("#edSave");
    await expect(page.locator("#curFlags")).toContainText("Two options are the same");
    await expect(page.locator("#actApprove")).toBeDisabled();
    await page.keyboard.press("r");
    // approve a whole topic in one click, then everything else from the keyboard
    await page.locator("#revList .grp button").first().click();
    for (let i = 0; i < 30; i++) { if (!(await page.locator("#actApprove").count()) || (await page.locator("#curStatus").textContent()) !== "To review") break; await page.keyboard.press("a"); }
    await expect(page.locator("#revCount")).toHaveText("28 / 28 reviewed");

    // 4. publish: a course code and a link for students
    await page.click('.tabs [data-tab="publish"]');
    await page.fill("#enrolled", "40"); await page.locator("#enrolled").blur();
    await page.click("#publish");
    await expect(page.locator("#courseCode")).toHaveText(/^[A-Z0-9]{6}$/);
    const link = await page.locator("#courseLink").getAttribute("href");
    expect(link).toContain("demo=1");

    // exports carry the licence notice and only approved items; the GIFT file reads back into the same number of questions
    const [dl] = await Promise.all([page.waitForEvent("download"), page.click("#expGift")]);
    const gift = fs.readFileSync(await dl.path(), "utf8");
    expect(gift).toContain("Licensed to Demo Business School for internal educational use");
    expect(gift).toContain("$CATEGORY: $course$/top/qwebbo/Accounting II (test)/Groups and control");
    expect(gift).not.toContain("Two companies with the same shareholders".repeat(2));
    const [dx] = await Promise.all([page.waitForEvent("download"), page.click("#expXml")]);
    expect(fs.readFileSync(await dx.path(), "utf8")).toMatch(/<question type="multichoice">[\s\S]*<single>true<\/single>/);

    // the log shows who approved what
    await page.click('.tabs [data-tab="log"]');
    await expect(page.locator("#logTable tbody")).toContainText("Published");
    await expect(page.locator("#logTable tbody")).toContainText("Topic approved");
    await expect(page.locator("#logTable tbody tr").first()).toContainText("demo.professor@example.edu");

    // 5. a student opens the link and plays one game; the game never contacts a server in demo mode
    const student = await context.newPage();
    await block(student);
    const calls = []; student.on("request", r => { if (!/^http:\/\/localhost/.test(r.url())) calls.push(r.url()); });
    await student.addInitScript(() => { try { localStorage.setItem("tpk-tour", "1"); } catch (e) {} });
    await student.goto(link.replace(/^https?:\/\/[^/]+/, ""));
    await expect(student.locator("#topic")).toBeVisible();
    await expect(student.locator("#bankTitle")).toHaveText("Accounting II (test)");
    await expect(student.locator("#demoFlag")).toBeVisible();
    const counts = await student.evaluate(() => ({ q: Q.length, tq: TQ.length, sb: !!sb, noExpand: BANK.noExpand }));
    expect(counts.sb).toBe(false);                 // cut off from the backend
    expect(counts.q + counts.tq).toBeLessThanOrEqual(23);   // only approved questions, none made up from the flashcards
    await student.locator("#playTab").click();
    await student.locator("#fmtChips button", { hasText: /Multiple choice/i }).click();
    await student.locator("#lenChips button", { hasText: /^5$/ }).click();
    await student.locator("#soloBtn").click();
    for (let i = 0; i < 5; i++) {
      await expect(student.locator("#question")).toBeVisible();
      await student.locator("#qTiles .tile").first().waitFor();
      const k = await student.evaluate(() => correctPos(G.qi));
      const wrong = await student.locator("#qTiles .tile:not([hidden])").evaluateAll((els, k) => els.map(e => +e.dataset.k).find(x => x !== k), k);
      await student.locator(`#qTiles .tile[data-k="${i === 0 ? wrong : k}"]`).click();
      await expect(student.locator("#reveal")).toBeVisible();
      if (i === 0) await expect(student.locator("#reveal")).toContainText("demo-consolidation-notes.pdf, p.");   // the explanation cites the page
      await student.locator("#rNext").click();
    }
    await expect(student.locator("#end")).toBeVisible();
    // one-question survey, asked once per course and kept in the demo store
    await expect(student.locator("#survey")).toContainText("Did this help you revise?");
    await student.locator("#survey .chip", { hasText: "5" }).click();
    await expect(student.locator("#survey")).toHaveText("Thank you!");
    expect(await student.evaluate(() => Object.values(JSON.parse(localStorage.getItem("qwebbo-demo")).stats).map(x => x.survey.length).reduce((a, b) => a + b, 0))).toBeGreaterThan(0);
    // the finished quiz also left one anonymous study-time row (kind + seconds, no name)
    const sessions = await student.evaluate(() => Object.values(JSON.parse(localStorage.getItem("qwebbo-demo")).stats).flatMap(x => x.study || []));
    expect(sessions.length).toBeGreaterThan(0);
    expect(Object.keys(sessions[0]).sort()).toEqual(["at", "kind", "n", "player", "secs"]);
    expect(sessions[0].kind).toBe("quiz");
    expect(calls.filter(u => /supabase\.co/.test(u))).toEqual([]);   // no call to the database (the library file itself is a static download, unused in demo mode)

    // 6. the professor sees it: one student is below the anonymity threshold, so no figure is shown
    await page.reload();
    await page.click('.tabs [data-tab="insight"]');
    await expect(page.locator("#tooFew")).toContainText("1 student has played so far");
    await page.click('.tabs [data-tab="pilot"]');
    await expect(page.locator('#kpiTable [data-kpi="activation"]')).toContainText("Not enough data");
    await expect(page.locator('#kpiTable [data-kpi="accuracy"]')).toContainText("100%");

    // 7. the seeded sample course has a full fictional class: dashboard, "what to re-explain" and the five pilot criteria
    await page.goto("/prof.html?demo=1#/c/00000000-0000-4000-8000-00000000d3e0/insight");
    await expect(page.locator("#kStudents")).toHaveText("44 / 60");
    await expect(page.locator("#reexplain li").first()).toContainText("Intragroup transactions");
    // what students did by activity, time in class hours (stated clearly), per anonymous student, and dates day-first
    await expect(page.locator('#activityTable tr[data-kind="cards"]')).toContainText("Flashcards");
    await expect(page.locator("#activityTable tbody tr")).toHaveCount(4);
    await expect(page.locator("#kClassHours")).toContainText("class hours");
    await expect(page.locator("#classHours")).toContainText("1 class hour = ");
    await page.selectOption("#classMin", "60");
    await expect(page.locator("#classHours")).toContainText("÷ 60");
    expect(await page.locator("#studentTable tbody tr").count()).toBeGreaterThan(5);
    expect(await page.locator("#studentTable tbody tr").first().textContent()).toMatch(/Student \d+/);
    const weekLabels = await page.locator(".bars div span:last-child").allTextContents();
    expect(weekLabels.length).toBeGreaterThan(0);
    for (const w of weekLabels) expect(w).toMatch(/^\d{2}\/\d{2}$/);
    expect(weekLabels.some(w => +w.slice(0, 2) > 12)).toBe(true);   // day first: a "13", "27"... in front proves it is not month-first
    await expect(page.locator("#hardTable tbody tr")).toHaveCount(10);
    await expect(page.locator("#reports li")).toHaveCount(1);
    await page.click('.tabs [data-tab="pilot"]');
    await expect(page.locator("#kpiTable tbody tr")).toHaveCount(5);
    await expect(page.locator('#kpiTable [data-kpi="activation"]')).toContainText("73% (44 of 60)");
    await expect(page.locator('#kpiTable [data-kpi="gain"]')).toContainText("Met");

    // 8. unpublishing closes the course at once; "Reset the demo" brings everything back to the start
    await page.goto("/prof.html?demo=1");
    await page.locator("#courseGrid .course", { hasText: "Accounting II (test)" }).click();
    await page.click('.tabs [data-tab="publish"]');
    page.once("dialog", d => d.accept());
    await page.click("#unpublish");
    await expect(page.locator("#stateTag")).toHaveText("In review");
    await student.goto(link.replace(/^https?:\/\/[^/]+/, ""));
    await expect(student.locator("#home")).toBeVisible();
    await expect(student.locator("#status")).toContainText("Course not found");
    await page.click("#demoReset");
    await expect(page.locator("#courseGrid .course")).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test("without demo mode and without a sign-in, the page explains what to do and offers the demo", async ({ page }) => {
    await block(page);
    await page.goto("/prof.html");
    await expect(page.locator("#app h1")).toHaveText("Sign in first");
    await expect(page.locator("#app a.btn.ghost")).toHaveAttribute("href", "prof.html?demo=1");
  });

  test("the review screen has no horizontal overflow on a 360 px phone", async ({ page }) => {
    await block(page);
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/prof.html?demo=1#/c/00000000-0000-4000-8000-00000000d3e0/review");
    await expect(page.locator("#revDetail")).toBeVisible();
    for (const tab of ["review", "publish", "insight", "pilot", "log", "material", "kit"]) {
      await page.click(`.tabs [data-tab="${tab}"]`);
      await page.waitForTimeout(150);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(over, tab).toBeLessThanOrEqual(1);
    }
  });
});
