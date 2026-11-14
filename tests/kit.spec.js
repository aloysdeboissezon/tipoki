// The kit modules (format, checks, class insight) are plain functions: they are tested here without a browser.
const { test, expect } = require("@playwright/test");
const K = require("../js/kit/format.js"), V = require("../js/kit/validate.js"), IN = require("../js/kit/insight.js");

const mcq = (id, q, o, more) => ({ id, type: "mcq", s: 1, q, o, e: "Because the course says so, clearly.", status: "approved", src: { file: "a.pdf", page: 1, quote: "the course" }, ...more });
const kit = () => K.cleanKit({ title: "Test: course / one", lang: "en", chapters: [{ n: 1, name: "Basics = start" }, { n: 2, name: "More" }], items: [
  mcq("q1", "What is 2 + 2 {roughly}?", ["4", "3", "5", "22"], { topic: "Sums", bloom: "apply", difficulty: 1 }),
  { id: "q2", type: "tf", s: 1, q: "Water is wet: true?", v: true, e: "It is wet, by definition here.", status: "approved" },
  { id: "q3", type: "typed", s: 2, q: "Name the ~ sign", a: ["tilde", "the tilde"], e: "It is called a tilde in English.", status: "approved" },
  { id: "q4", type: "card", s: 2, term: "NCI", def: "Equity not attributable to the parent", status: "approved" },
  mcq("q5", "Still waiting?", ["yes", "no", "maybe", "never"], { status: "pending_review" }),
] });

test.describe("Kit format", () => {
  test("imported items always start in review, whatever the file says", () => {
    const r = K.importAny(JSON.stringify({ items: [{ type: "tf", q: "x is y", v: true, status: "approved" }] }));
    expect(r.items[0].status).toBe("pending_review");
  });
  test("GIFT, Moodle XML and CSV exports read back as the same questions (special characters included)", () => {
    const k = kit(), opt = { approvedOnly: true, school: "ESADE" };
    for (const [name, text] of [["gift", K.toGift(k, opt)], ["xml", K.toMoodleXml(k, opt)]]) {
      expect(text, name).toContain("Licensed to ESADE for internal educational use");
      const back = K.importAny(text, name === "xml" ? "a.xml" : "a.gift");
      expect(back.errors, name).toEqual([]);
      expect(back.items.map(i => [i.type, i.q, i.type === "mcq" ? i.o : i.type === "tf" ? i.v : i.a]), name).toEqual([
        ["mcq", "What is 2 + 2 {roughly}?", ["4", "3", "5", "22"]], ["tf", "Water is wet: true?", true], ["typed", "Name the ~ sign", ["tilde", "the tilde"]]]);
      expect(back.chapters.map(c => c.name), name).toEqual(["Basics = start", "More"]);
      expect(text, name).not.toContain("Still waiting");   // not approved -> not exported
    }
    const csv = K.toCsv(k, opt), back = K.fromCsv(csv.split("\r\n").slice(1).join("\n"));
    expect(back.items.length).toBe(4);
    expect(back.items[3]).toMatchObject({ type: "card", term: "NCI" });
  });
  test("a Moodle export from elsewhere: unsupported kinds are reported, not guessed", () => {
    const r = K.fromGift("::Q1:: Match them {=a -> b =c -> d}\n\nEssay please {}\n\nHow many? {#3:1}\n\nCapital of Spain? {=Madrid ~Barcelona ~Sevilla ~Valencia}");
    expect(r.items.length).toBe(1);
    expect(r.errors.length).toBe(3);
  });
  test("a spreadsheet cell that starts like a formula is neutralised in the CSV export", () => {
    const k = kit(); k.items[0].q = "=HYPERLINK(\"http://x\")";
    expect(K.toCsv(k)).toContain("\"'=HYPERLINK");
  });
  test("what students get: approved items only, the source in the explanation, no question made up from flashcards", () => {
    const b = K.toBank(kit());
    expect(b.mcq.length + b.tf.length + b.typed.length).toBe(3);
    expect(b.facts.length).toBe(1);
    expect(b.noExpand).toBe(true);
    expect(b.keys).toEqual({ m0: "q1", m1: "q2", t0: "q3" });
    expect(b.mcq[0].e).toContain("(a.pdf, p. 1)");
    expect(JSON.stringify(b)).not.toContain("Still waiting");
  });
  test("printable pages escape HTML and carry the licence notice", () => {
    const k = kit(); k.items[0].q = "<img src=x onerror=alert(1)>";
    const h = K.bankHtml(k, { approvedOnly: true, school: "ESADE" });
    expect(h).not.toContain("<img");
    expect(h).toContain("&lt;img");
    expect(h).toContain("Licensed to ESADE");
    expect(K.bankHtml(k, { approvedOnly: true, answers: false })).not.toContain("class=\"ok\"");
  });
});

test.describe("Kit checks", () => {
  const codes = (items, opts) => V.validateKit(items, opts).map(f => f.level + ":" + f.code).sort();
  test("blocking errors", () => {
    expect(codes([mcq("a", "Q?", ["x", "x ", "y", "z"])])).toContain("error:dup-options");
    expect(codes([mcq("a", "Q?", ["x", "y", "z"])])).toContain("error:options");
    expect(codes([mcq("a", "Same?", ["1", "2", "3", "4"]), mcq("b", "same?", ["1", "5", "6", "7"])])).toContain("error:duplicate");
    expect(codes([{ type: "typed", s: 1, q: "Q?", a: [], e: "long enough explanation" }])).toContain("error:typed-answer");
    expect(codes([mcq("a", "Q?", ["1", "2", "3", "4"], { s: 9 })], { sess: { 1: "x" } })).toContain("error:chapter");
  });
  test("numbers that differ only by a sign or a decimal point are different options", () => {
    expect(codes([mcq("a", "Result?", ["−5", "5", "0.5", "05"])])).toEqual([]);
  });
  test("advice for the professor: long right answer, catch-all option, missing source, quote not on the page", () => {
    expect(codes([mcq("a", "Q?", ["A very long and detailed right answer that stands out", "no", "yes", "maybe"])])).toContain("warn:length-tell");
    expect(codes([mcq("a", "Q?", ["All of the above", "b", "c", "d"])])).toContain("warn:catch-all");
    expect(codes([mcq("a", "Q?", ["1", "2", "3", "4"], { src: null })], { requireSource: true })).toContain("warn:source");
    expect(codes([mcq("a", "Q?", ["1", "2", "3", "4"], { src: { file: "a.pdf", page: 1, quote: "not in there" } })], { requireSource: true, sourceText: { "a.pdf": { 1: "The course text." } } })).toContain("warn:quote-not-found");
    expect(codes([mcq("a", "Q?", ["1", "2", "3", "4"], { src: { file: "a.pdf", page: 1, quote: "the COURSE  text" } })], { requireSource: true, sourceText: { "a.pdf": { 1: "The course text." } } })).toEqual([]);
  });
  test("two language versions must be the same items", () => {
    const en = [{ type: "tf", s: 1, q: "a", v: true }, mcq("b", "Q", ["12", "2", "3", "4"])];
    expect(V.checkParity(en, [{ type: "tf", s: 1, q: "a", v: false }, mcq("b", "Q", ["12", "2", "3", "4"])])[0].code).toBe("parity");
    expect(V.checkParity(en, [{ type: "tf", s: 1, q: "a", v: true }, mcq("b", "Q", ["21", "2", "3", "4"])])[0].code).toBe("parity-number");
    expect(V.checkParity(en, en.slice(0, 1))[0].code).toBe("parity-count");
  });
});

test.describe("Class insight", () => {
  const k = kit(), row = (player, day, qs, w) => ({ player, at: new Date(Date.UTC(2026, 9, 5 + day, 10)).toISOString(), game: player + day, mode: "solo", n: Object.keys(qs).length, correct: Object.values(qs).filter(Boolean).length, qs, w });
  test("nothing about students below 5 students; content accuracy still shown", () => {
    const r = IN.compute([row("p1", 0, { q1: 1 }), row("p2", 0, { q1: 0 })], k, null, { enrolled: 10, reports: [{ item: "q1", status: "fixed" }] });
    expect(r.tooFew).toBe(true);
    expect(r.accuracy).toBeUndefined();
    expect(r.contentAccuracy).toBeCloseTo(0.75);   // 1 of 4 published items had a confirmed error
    expect(IN.kpis(r).find(x => x.id === "activation").status).toBe("no-data");
  });
  test("activation, weekly return, learning gain and the most chosen wrong answer", () => {
    const rows = [];
    for (let p = 1; p <= 6; p++) { rows.push(row("p" + p, 0, { q1: 0, q2: 1 }, { q1: 2 })); if (p <= 5) rows.push(row("p" + p, 7, { q1: 1, q2: 1 })); }
    rows.push(row("p6", 1, { q1: 0 }, { q1: 2 }));
    const r = IN.compute(rows, k, null, { enrolled: 10, now: Date.UTC(2026, 9, 27), survey: [5, 5, 4, 4, 3] });
    expect(r.students).toBe(6);
    expect(r.activation).toBeCloseTo(0.6);
    expect(r.weeklyEngagement).toBeCloseTo(5 / 12);     // week 2: 5 of 6 came back; week 3: 0 of 6
    expect(r.gain).toMatchObject({ students: 6, pairs: 11 });   // p1..p5 twice on q1 and q2, p6 twice on q1
    expect(r.gain.first).toBeCloseTo(5 / 11);
    expect(r.gain.last).toBeCloseTo(10 / 11);
    expect(r.hardest[0]).toMatchObject({ id: "q1", topWrong: { text: "5" } });
    expect(r.satisfaction.mean).toBeCloseTo(4.2);
    const lines = IN.kpis(r);
    expect(lines.map(l => l.id)).toEqual(["activation", "weekly", "gain", "accuracy", "satisfaction"]);
    expect(lines[0].status).toBe("met");
    expect(lines[1].status).toBe("below");
  });
  test("activity by kind, time and class hours", () => {
    const k = kit(), rows = [], study = [];
    for (let p = 1; p <= 6; p++) { rows.push({ player: "p" + p, at: "2026-10-12T10:00:00Z", game: "g" + p, mode: p <= 4 ? "solo" : "exam", n: 2, correct: 1, qs: { q1: 1, q2: 0 }, w: {} });
      study.push({ player: "p" + p, at: "2026-10-12T10:00:00Z", kind: "cards", secs: 600, n: 10 }, { player: "p" + p, at: "2026-10-12T10:20:00Z", kind: p <= 4 ? "quiz" : "exam", secs: 300, n: 0 }); }
    study.push({ player: "p1", at: "2026-10-13T10:00:00Z", kind: "sheet", secs: 900, n: 0 });
    const a = IN.compute(rows, k, null, { study, now: Date.UTC(2026, 9, 27) }).activity;
    expect(a.tracked).toBe(true);
    expect(a.kinds.cards).toMatchObject({ students: 6, sessions: 6, secs: 3600, cards: 60 });
    expect(a.kinds.sheet).toMatchObject({ students: 1, sessions: 1, secs: 900 });
    expect(a.kinds.quiz).toMatchObject({ students: 4, sessions: 4, secs: 1200 });
    expect(a.kinds.exam).toMatchObject({ students: 2, sessions: 2, secs: 600 });
    expect(a.secs).toBe(6300);
    expect(IN.fmtDuration(a.secs)).toBe("1 h 45");
    expect(IN.classHours(a.secs, 50)).toBeCloseTo(2.1);
    expect(a.students[0]).toMatchObject({ id: 1, secs: 1800 });   // p1: cards + quiz + sheet
    expect(JSON.stringify(a)).not.toMatch(/"p\d"/);                // no real player id leaves the module
    expect(IN.compute(rows, k, null, { now: Date.UTC(2026, 9, 27) }).activity.tracked).toBe(false);   // older data: no durations
  });
  test("answers to items that are no longer published are left out", () => {
    const rows = [1, 2, 3, 4, 5].map(p => row("p" + p, 0, { q1: 1, gone: 0 }));
    expect(IN.compute(rows, k, null, {}).answers).toBe(5);
  });
});
