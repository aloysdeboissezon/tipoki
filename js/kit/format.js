// The study kit: one format for everything a professor reviews, whatever made it (hand-written import or AI).
// Runs in the browser (professor space) and in Node (tests, tools). Described for humans in docs/kit-format.md.
//
// kit  = { v:1, title, subject, lang, chapters:[{n, name}], items:[item], exam:{n, minutes} }
// item = { id, type:"mcq"|"tf"|"typed"|"card", s (chapter number), topic, bloom, difficulty, q, o:[right, wrong x3] | v | a:[answers] | term+def,
//          e (explanation), src:{file, page, quote}, status:"pending_review"|"approved"|"rejected",
//          i18n:{ es:{q, o, a, term, def, e} } }      other languages of the SAME item: the right option stays o[0], so versions cannot drift apart
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.QwebboKit = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const LICENCE = school => "Licensed to " + (school || "the school") + " for internal educational use. Platform, method and question sets © qwebbo. Course material © its authors.";
  const uid = () => "i" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  const str = (x, n) => String(x == null ? "" : x).replace(/\r/g, "").trim().slice(0, n || 2000);
  const TRUE = /^(true|vrai|verdadero|t|v|1|yes|oui|si|sí)$/i, FALSE = /^(false|faux|falso|f|0|no|non)$/i;
  const BLOOMS = { remember: "remember", recall: "remember", knowledge: "remember", understand: "understand", comprehension: "understand", apply: "apply", application: "apply", analyse: "apply", analyze: "apply", analysis: "apply" };

  // ---------- one clean item from loose input ----------
  function cleanItem(x, def) {
    def = def || {};
    const type = String(x.type || "").toLowerCase();
    const it = { id: str(x.id, 40) || uid(), type, s: parseInt(x.s, 10) || def.s || 1 };
    if (x.topic || x.t) it.topic = str(x.topic || x.t, 60);
    const bl = BLOOMS[String(x.bloom || "").toLowerCase()]; if (bl) it.bloom = bl;
    const d = parseInt(x.difficulty || x.d, 10); if (d >= 1 && d <= 3) it.difficulty = d;
    if (type === "card") { it.term = str(x.term, 120); it.def = str(x.def, 600); }
    else it.q = str(x.q, 1200);
    if (type === "mcq") it.o = (Array.isArray(x.o) ? x.o : []).map(o => str(o, 400));
    if (type === "tf") it.v = typeof x.v === "boolean" ? x.v : TRUE.test(String(x.v)) ? true : FALSE.test(String(x.v)) ? false : undefined;
    if (type === "typed") it.a = (Array.isArray(x.a) ? x.a : String(x.a || "").split("|")).map(a => str(a, 120)).filter(Boolean).slice(0, 10);
    if (type !== "card") it.e = str(x.e, 1200);
    const src = x.src || {};
    if (src.file || src.quote || src.page != null) {
      it.src = { file: str(src.file, 160), quote: str(src.quote, 500) };
      if (src.page != null && String(src.page).trim() !== "") it.src.page = /^\d+$/.test(String(src.page).trim()) ? +src.page : str(src.page, 20);
    }
    if (x.i18n && typeof x.i18n === "object") {
      it.i18n = {};
      Object.keys(x.i18n).slice(0, 6).forEach(l => { const y = x.i18n[l] || {}, o = {};
        ["q", "e", "term", "def"].forEach(k => { if (y[k]) o[k] = str(y[k], 1200); });
        if (Array.isArray(y.o)) o.o = y.o.map(v => str(v, 400)); if (Array.isArray(y.a)) o.a = y.a.map(v => str(v, 120)).filter(Boolean);
        it.i18n[l.toLowerCase().slice(0, 5)] = o; });
    }
    it.status = ["approved", "rejected"].indexOf(x.status) >= 0 && def.keepStatus ? x.status : "pending_review";   // imported items always start in review
    return it;
  }
  function cleanKit(k) {
    k = k || {};
    const chapters = (Array.isArray(k.chapters) ? k.chapters : []).map((c, i) => ({ n: parseInt(c.n, 10) || i + 1, name: str(c.name, 120) || "Chapter " + (i + 1) }));
    const items = (Array.isArray(k.items) ? k.items : []).map(x => cleanItem(x, { keepStatus: true }));
    const have = new Set(chapters.map(c => c.n));
    items.forEach(it => { if (!have.has(it.s)) { have.add(it.s); chapters.push({ n: it.s, name: "Chapter " + it.s }); } });
    chapters.sort((a, b) => a.n - b.n);
    const out = { v: 1, title: str(k.title, 120), subject: str(k.subject, 160), lang: str(k.lang, 5).toLowerCase() || "en", chapters, items };
    if (k.exam && k.exam.n) out.exam = { n: Math.max(5, Math.min(200, parseInt(k.exam.n, 10) || 30)), minutes: Math.max(5, Math.min(300, parseInt(k.exam.minutes, 10) || 45)) };
    return out;
  }
  // a timed mock exam that follows the weight of each chapter in the approved question bank
  function examBlueprint(kit) {
    const ok = kit.items.filter(i => i.status === "approved" && i.type !== "card"), n = Math.min(40, ok.length);
    const per = {}; ok.forEach(i => { per[i.s] = (per[i.s] || 0) + 1; });
    const rows = kit.chapters.filter(c => per[c.n]).map(c => ({ n: c.n, name: c.name, questions: Math.max(1, Math.round(n * per[c.n] / ok.length)) }));
    return { n, minutes: Math.max(10, Math.round(n * 1.5)), chapters: rows };
  }

  // ---------- imports ----------
  // CSV with a header line. Columns (any order): type, chapter, topic, question, answer, wrong1, wrong2, wrong3, explanation, bloom, difficulty, source_file, source_page, source_quote
  // type: mcq | tf | typed | card. For tf, answer is true/false. For typed, answer holds the accepted answers separated by "|". For card, question = term and answer = definition.
  function parseCsvRows(text) {
    text = String(text).replace(/^﻿/, "");
    const first = text.split(/\r?\n/)[0] || "", sep = (first.match(/;/g) || []).length > (first.match(/,/g) || []).length ? ";" : (first.match(/\t/g) || []).length > (first.match(/,/g) || []).length ? "\t" : ",";
    const rows = []; let row = [], cur = "", q = false;
    for (let i = 0; i < text.length; i++) { const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
      else if (c === '"') q = true;
      else if (c === sep) { row.push(cur); cur = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cur); cur = ""; if (row.some(x => x.trim())) rows.push(row); row = []; }
      else cur += c; }
    row.push(cur); if (row.some(x => x.trim())) rows.push(row);
    return rows;
  }
  function fromCsv(text) {
    const rows = parseCsvRows(text); if (rows.length < 2) return { items: [], errors: ["The file needs a header line and at least one question."] };
    const head = rows[0].map(h => h.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_")), col = n => head.indexOf(n);
    if (col("question") < 0 || col("answer") < 0) return { items: [], errors: ["Columns “question” and “answer” are required. Found: " + rows[0].join(", ")] };
    const items = [], errors = [];
    rows.slice(1).forEach((r, k) => { const g = n => (col(n) >= 0 ? (r[col(n)] || "").trim() : "");
      let type = g("type").toLowerCase(); const ans = g("answer"), wrong = [g("wrong1"), g("wrong2"), g("wrong3")].filter(Boolean);
      if (!type) type = wrong.length ? "mcq" : TRUE.test(ans) || FALSE.test(ans) ? "tf" : "typed";
      if (["mcq", "tf", "typed", "card"].indexOf(type) < 0) { errors.push("Line " + (k + 2) + ": unknown type “" + type + "”"); return; }
      const x = { type, s: g("chapter"), topic: g("topic"), bloom: g("bloom"), difficulty: g("difficulty"), e: g("explanation"), src: { file: g("source_file"), page: g("source_page"), quote: g("source_quote") } };
      if (type === "card") { x.term = g("question"); x.def = ans; } else x.q = g("question");
      if (type === "mcq") x.o = [ans].concat(wrong); if (type === "tf") x.v = ans; if (type === "typed") x.a = ans.split("|");
      items.push(cleanItem(x)); });
    return { items, errors };
  }
  const csvCell = v => { v = String(v == null ? "" : v); if (/^[=+\-@\t]/.test(v)) v = "'" + v; return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };   // the quote in front stops spreadsheet formulas
  function toCsv(kit, opts) {
    const head = ["type", "chapter", "topic", "question", "answer", "wrong1", "wrong2", "wrong3", "explanation", "bloom", "difficulty", "source_file", "source_page", "source_quote", "status"];
    const lines = ["# " + LICENCE(opts && opts.school), head.join(",")];
    pick(kit, opts).forEach(it => { const s = it.src || {};
      const ans = it.type === "mcq" ? it.o[0] : it.type === "tf" ? (it.v ? "true" : "false") : it.type === "typed" ? it.a.join("|") : it.def;
      lines.push([it.type, it.s, it.topic || "", it.type === "card" ? it.term : it.q, ans, it.type === "mcq" ? it.o[1] : "", it.type === "mcq" ? it.o[2] : "", it.type === "mcq" ? it.o[3] : "", it.e || "", it.bloom || "", it.difficulty || "", s.file || "", s.page == null ? "" : s.page, s.quote || "", it.status].map(csvCell).join(",")); });
    return "﻿" + lines.join("\r\n") + "\r\n";
  }
  const pick = (kit, opts) => kit.items.filter(it => !(opts && opts.approvedOnly) || it.status === "approved");

  // GIFT (Moodle's text format). Read: multiple choice with one right answer, true/false, short answer. Other kinds are reported, not guessed.
  const giftEsc = s => String(s == null ? "" : s).replace(/\\/g, "\\\\").replace(/([~=#{}:])/g, "\\$1").replace(/\n/g, "\\n");
  const giftUn = s => String(s).replace(/\\n/g, "\n").replace(/\\([~=#{}:\\])/g, "$1").trim();
  function splitGift(body) {   // -> [{mark:"="|"~", text, fb}], on unescaped = and ~
    const parts = []; let cur = null, i = 0, gen = "";
    const push = () => { if (cur) parts.push(cur); };
    while (i < body.length) { const c = body[i];
      if (c === "\\" && i + 1 < body.length) { if (cur) cur.raw += c + body[i + 1]; i += 2; continue; }
      if (body.startsWith("####", i)) { push(); cur = null; gen = body.slice(i + 4); break; }
      if (c === "=" || c === "~") { push(); cur = { mark: c, raw: "" }; i++; continue; }
      if (cur) cur.raw += c; i++; }
    push();
    parts.forEach(p => { const k = p.raw.search(/(^|[^\\])#/); const cut = k < 0 ? -1 : k + (p.raw[k] === "#" ? 0 : 1);
      p.text = giftUn((cut < 0 ? p.raw : p.raw.slice(0, cut)).replace(/^%-?\d+(\.\d+)?%/, "")); p.fb = cut < 0 ? "" : giftUn(p.raw.slice(cut + 1)); });
    return { parts, general: giftUn(gen) };
  }
  function fromGift(text) {
    const items = [], errors = []; let chapter = 1, topic = "";
    const chapters = [], chapOf = name => { let c = chapters.find(x => x.name === name); if (!c) { c = { n: chapters.length + 1, name }; chapters.push(c); } return c.n; };
    String(text).replace(/\r/g, "").split(/\n\s*\n/).forEach(block => {
      const lines = block.split("\n").filter(l => !/^\s*\/\//.test(l)), b = lines.join("\n").trim(); if (!b) return;
      const cat = /^\$CATEGORY:\s*(.+)$/m.exec(b);
      if (cat) { const segs = cat[1].trim().split("/").filter(Boolean); topic = ""; chapter = chapOf(segs[segs.length - 1] || "Chapter"); if (!b.replace(cat[0], "").trim()) return; }
      let s = b.replace(/^\$CATEGORY:.*$/m, "").trim();
      const nm = /^::((?:\\.|[^:\\])*)::/.exec(s); if (nm) s = s.slice(nm[0].length);
      s = s.replace(/^\[(html|moodle|plain|markdown)\]/, "");
      let open = -1; for (let i = 0; i < s.length; i++) { if (s[i] === "\\") { i++; continue; } if (s[i] === "{") { open = i; break; } }
      const close = s.lastIndexOf("}");
      if (open < 0 || close < open) { errors.push("Skipped (no answer block): " + s.slice(0, 60)); return; }
      const q = giftUn(s.slice(0, open) + (s.slice(close + 1).trim() ? " _____ " + s.slice(close + 1) : "")), body = s.slice(open + 1, close).trim();
      const tfm = /^(TRUE|FALSE|T|F)\b/i.exec(body);
      if (tfm) { const g = splitGift(body.slice(tfm[0].length)); items.push(cleanItem({ type: "tf", s: chapter, topic, q, v: /^t/i.test(tfm[0]), e: g.general || (body.split("#")[1] ? giftUn(body.split("#").pop()) : "") })); return; }
      if (/^#/.test(body)) { errors.push("Skipped (numerical questions are not imported yet): " + q.slice(0, 60)); return; }
      const g = splitGift(body), right = g.parts.filter(p => p.mark === "="), wrong = g.parts.filter(p => p.mark === "~");
      if (!g.parts.length) { errors.push("Skipped (essay question): " + q.slice(0, 60)); return; }
      if (g.parts.some(p => /->/.test(p.raw))) { errors.push("Skipped (matching question): " + q.slice(0, 60)); return; }
      if (right.length >= 1 && !wrong.length) { items.push(cleanItem({ type: "typed", s: chapter, topic, q, a: right.map(p => p.text), e: g.general || right[0].fb })); return; }
      if (right.length === 1) { items.push(cleanItem({ type: "mcq", s: chapter, topic, q, o: [right[0].text].concat(wrong.map(p => p.text)), e: g.general || right[0].fb })); return; }
      errors.push("Skipped (several right answers): " + q.slice(0, 60)); });
    return { items, errors, chapters };
  }
  const srcLine = it => it.src && it.src.file ? " [Source: " + it.src.file + (it.src.page != null ? ", p. " + it.src.page : "") + "]" : "";
  function toGift(kit, opts) {
    const out = ["// " + LICENCE(opts && opts.school), "// " + (kit.title || "Course") + ": exported from qwebbo. Import in Moodle: Question bank > Import > GIFT format.", ""];
    const base = "$course$/top/qwebbo/" + String(kit.title || "Course").replace(/[\/\n]/g, " ");
    kit.chapters.forEach(c => { const its = pick(kit, opts).filter(i => i.s === c.n && i.type !== "card"); if (!its.length) return;
      out.push("$CATEGORY: " + base + "/" + String(c.name).replace(/[\/\n]/g, " "), "");
      its.forEach((it, k) => { const name = "::" + giftEsc("Ch" + c.n + " Q" + (k + 1) + (it.topic ? " " + it.topic : "")) + "::", fb = giftEsc((it.e || "") + srcLine(it));
        if (it.type === "mcq") out.push(name + giftEsc(it.q) + " {", "=" + giftEsc(it.o[0]), ...it.o.slice(1).map(o => "~" + giftEsc(o)), fb ? "####" + fb : "", "}", "");
        if (it.type === "tf") out.push(name + giftEsc(it.q) + " {" + (it.v ? "TRUE" : "FALSE") + (fb ? "####" + fb : "") + "}", "");
        if (it.type === "typed") out.push(name + giftEsc(it.q) + " {", ...it.a.map(a => "=" + giftEsc(a)), fb ? "####" + fb : "", "}", ""); }); });
    return out.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n");
  }

  // Moodle XML
  const xe = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const cdata = s => "<![CDATA[" + String(s == null ? "" : s).replace(/]]>/g, "]]]]><![CDATA[>") + "]]>";
  const html = s => cdata("<p>" + xe(s).replace(/\n/g, "<br>") + "</p>");
  function toMoodleXml(kit, opts) {
    const out = ['<?xml version="1.0" encoding="UTF-8"?>', "<!-- " + xe(LICENCE(opts && opts.school)).replace(/--/g, "- -") + " -->", "<quiz>"];
    const base = "$course$/top/qwebbo/" + String(kit.title || "Course").replace(/[\/\n]/g, " ");
    kit.chapters.forEach(c => { const its = pick(kit, opts).filter(i => i.s === c.n && i.type !== "card"); if (!its.length) return;
      out.push('<question type="category"><category><text>' + xe(base + "/" + String(c.name).replace(/[\/\n]/g, " ")) + "</text></category></question>");
      its.forEach((it, k) => { const type = it.type === "mcq" ? "multichoice" : it.type === "tf" ? "truefalse" : "shortanswer";
        const ans = (fr, text) => '<answer fraction="' + fr + '" format="html"><text>' + (type === "multichoice" ? html(text) : xe(text)) + "</text><feedback format=\"html\"><text></text></feedback></answer>";
        const tags = [it.topic, it.bloom && "bloom:" + it.bloom, it.difficulty && "difficulty:" + it.difficulty].filter(Boolean);
        out.push('<question type="' + type + '">', "<name><text>" + xe("Ch" + c.n + " Q" + (k + 1) + (it.topic ? " " + it.topic : "")) + "</text></name>",
          '<questiontext format="html"><text>' + html(it.q) + "</text></questiontext>", '<generalfeedback format="html"><text>' + html((it.e || "") + srcLine(it)) + "</text></generalfeedback>",
          "<defaultgrade>1</defaultgrade><penalty>" + (type === "truefalse" ? "1" : "0.3333333") + "</penalty><hidden>0</hidden>");
        if (type === "multichoice") out.push("<single>true</single><shuffleanswers>true</shuffleanswers><answernumbering>abc</answernumbering>", ans(100, it.o[0]), ...it.o.slice(1).map(o => ans(0, o)));
        if (type === "truefalse") out.push(ans(it.v ? 100 : 0, "true"), ans(it.v ? 0 : 100, "false"));
        if (type === "shortanswer") out.push("<usecase>0</usecase>", ...it.a.map(a => ans(100, a)));
        if (tags.length) out.push("<tags>" + tags.map(t => "<tag><text>" + xe(t) + "</text></tag>").join("") + "</tags>");
        out.push("</question>"); }); });
    out.push("</quiz>");
    return out.join("\n");
  }
  function fromMoodleXml(text) {
    const items = [], errors = [], chapters = []; let chapter = 1;
    const dec = s => String(s || "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>\s*<p[^>]*>/gi, "\n").replace(/<[^>]+>/g, "")
      .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim();
    const tag = (s, n) => { const m = new RegExp("<" + n + "[^>]*>([\\s\\S]*?)</" + n + ">").exec(s); return m ? m[1] : ""; };
    const txt = (s, n) => dec(tag(tag(s, n), "text") || tag(s, n));
    const re = /<question\s+type="([^"]+)"[^>]*>([\s\S]*?)<\/question>/g; let m;
    while ((m = re.exec(String(text)))) { const type = m[1], b = m[2];
      if (type === "category") { const name = txt(b, "category").split("/").filter(Boolean).pop() || "Chapter"; let c = chapters.find(x => x.name === name); if (!c) { c = { n: chapters.length + 1, name }; chapters.push(c); } chapter = c.n; continue; }
      const q = txt(b, "questiontext"), e = txt(b, "generalfeedback"), answers = []; const ra = /<answer\s+fraction="([^"]+)"[^>]*>([\s\S]*?)<\/answer>/g; let a;
      while ((a = ra.exec(b))) answers.push({ f: parseFloat(a[1]), t: dec(tag(a[2].replace(/<feedback[\s\S]*?<\/feedback>/g, ""), "text")) });
      const topic = (/<tag><text>([^<]*)<\/text><\/tag>/.exec(b) || [])[1], bloom = (/<text>bloom:([a-z]+)<\/text>/.exec(b) || [])[1], diff = (/<text>difficulty:(\d)<\/text>/.exec(b) || [])[1];
      const base = { s: chapter, q, e, topic: topic && !/^(bloom|difficulty):/.test(topic) ? dec(topic) : "", bloom, difficulty: diff };
      const right = answers.filter(x => x.f >= 100), wrong = answers.filter(x => x.f <= 0);
      if (type === "multichoice" && right.length === 1 && right.length + wrong.length === answers.length) items.push(cleanItem({ ...base, type: "mcq", o: [right[0].t].concat(wrong.map(x => x.t)) }));
      else if (type === "truefalse" && right.length === 1) items.push(cleanItem({ ...base, type: "tf", v: /^true$/i.test(right[0].t) }));
      else if (type === "shortanswer" && right.length) items.push(cleanItem({ ...base, type: "typed", a: right.map(x => x.t) }));
      else errors.push("Skipped (“" + type + "” questions are not imported yet): " + q.slice(0, 60)); }
    if (!items.length && !errors.length) errors.push("No <question> found: is this a Moodle XML file?");
    return { items, errors, chapters };
  }

  // A pasted list. Questions are separated by an empty line:
  //   1. Which statement defines goodwill?          (optional "Q:" or a number in front)
  //   * The excess of the price over the fair value of net assets      (the right answer starts with "*", or comes on a line "A: ...")
  //   - The book value of net assets                                   (wrong answers start with "-" or "a)", "b)"...)
  //   E: why it is right      S: slides-ch2.pdf p.14 "the quote"       Ch: 2      T: topic      B: apply
  // No wrong answer = typed answer; answer "true"/"false" = true/false; "Term :: definition" on one line = flashcard.
  function fromPaste(text) {
    const items = [], errors = []; let chapter = 1;
    String(text).replace(/\r/g, "").split(/\n\s*\n/).forEach(block => {
      const lines = block.split("\n").map(l => l.trim()).filter(Boolean); if (!lines.length) return;
      if (lines.length === 1 && /^(ch(apter|apitre)?|cap[ií]tulo|tema)\s*:?\s*(\d+)/i.test(lines[0])) { chapter = +/(\d+)/.exec(lines[0])[1]; return; }
      if (lines.length === 1 && /\s::\s/.test(lines[0])) { const [t, d] = lines[0].split(/\s::\s/); items.push(cleanItem({ type: "card", s: chapter, term: t, def: d })); return; }
      const x = { s: chapter, src: {} }, right = [], wrong = []; let q = "";
      lines.forEach((l, i) => { let m;
        if ((m = /^(?:E|Explanation|Explication|Explicaci[oó]n)\s*:\s*(.+)$/i.exec(l))) x.e = m[1];
        else if ((m = /^(?:S|Source|Fuente)\s*:\s*(.+)$/i.exec(l))) { const r = m[1], qm = /["“«](.+?)["”»]/.exec(r), pm = /\b(?:p|page|slide|p[aá]g)\.?\s*(\d+)/i.exec(r);
          x.src = { file: r.replace(qm ? qm[0] : "", "").replace(pm ? pm[0] : "", "").replace(/[,;]\s*$/, "").replace(/\s*,\s*$/, "").trim().replace(/[,\s]+$/, ""), page: pm ? +pm[1] : null, quote: qm ? qm[1] : "" }; }
        else if ((m = /^(?:Ch|Chapter|Chapitre)\s*:\s*(\d+)/i.exec(l))) x.s = +m[1];
        else if ((m = /^(?:T|Topic|Th[eè]me|Tema)\s*:\s*(.+)$/i.exec(l))) x.topic = m[1];
        else if ((m = /^(?:B|Bloom)\s*:\s*(.+)$/i.exec(l))) x.bloom = m[1];
        else if ((m = /^(?:A|Answer|R[eé]ponse|Respuesta)\s*:\s*(.+)$/i.exec(l))) right.push(m[1]);
        else if ((m = /^\*\s*(?:[a-d][).]\s*)?(.+)$/i.exec(l))) right.push(m[1]);
        else if (i > 0 && (m = /^(?:[-•–]|[a-d][).])\s*(\*?)\s*(.+)$/i.exec(l))) (m[1] ? right : wrong).push(m[2]);
        else if (i === 0 || !q) q = l.replace(/^(?:Q\s*:|\d+[).]\s)\s*/i, "");
        else q += " " + l; });
      x.q = q;
      if (!q) { errors.push("Skipped (no question): " + lines[0].slice(0, 60)); return; }
      if (!right.length) { errors.push("Skipped (no right answer marked with * or “A:”): " + q.slice(0, 60)); return; }
      if (wrong.length) { x.type = "mcq"; x.o = [right[0]].concat(wrong); }
      else if (right.length === 1 && (TRUE.test(right[0]) || FALSE.test(right[0])) && right[0].length > 1) { x.type = "tf"; x.v = right[0]; }
      else { x.type = "typed"; x.a = right.join("|").split("|"); }
      items.push(cleanItem(x)); });
    return { items, errors };
  }
  // guess the format of an import and read it
  function importAny(text, name) {
    const t = String(text).trim(), ext = (/\.([a-z0-9]+)$/i.exec(name || "") || [])[1];
    if (/^\s*[{[]/.test(t)) { try { const j = JSON.parse(t), k = Array.isArray(j) ? { items: j } : j;
      return { format: "json", items: (k.items || []).map(x => cleanItem(x)), errors: [], chapters: (k.chapters || []).map((c, i) => ({ n: parseInt(c.n, 10) || i + 1, name: str(c.name, 120) })), meta: { title: str(k.title, 120), subject: str(k.subject, 160), lang: str(k.lang, 5) } }; }
      catch (e) { return { format: "json", items: [], errors: ["This looks like JSON but cannot be read: " + e.message] }; } }
    if (/<quiz[\s>]/.test(t) || ext === "xml") return { format: "moodle-xml", ...fromMoodleXml(t) };
    if (ext === "gift" || /\{\s*(=|~|TRUE|FALSE|T\b|F\b)/.test(t) && /\}/.test(t)) return { format: "gift", ...fromGift(t) };
    if (ext === "csv" || ext === "tsv" || /^[^\n]*\bquestion\b[^\n]*[,;\t][^\n]*\banswer\b/i.test(t) || /^[^\n]*\banswer\b[^\n]*[,;\t][^\n]*\bquestion\b/i.test(t)) return { format: "csv", ...fromCsv(t) };
    return { format: "list", ...fromPaste(t) };
  }

  // ---------- what students play ----------
  // Approved items only -> the shape the game already reads for custom quizzes ({sess, mcq, tf, typed, facts}); keys maps the game's question keys back to item ids for the statistics.
  function toBank(kit, lang) {
    const L = it => { const t = lang && lang !== kit.lang && it.i18n && it.i18n[lang]; return t ? { ...it, ...t } : it; };
    const ok = kit.items.filter(i => i.status === "approved").map(L), src = it => (it.e || "") + (it.src && it.src.file ? " (" + it.src.file + (it.src.page != null ? ", p. " + it.src.page : "") + ")" : "");
    const sess = {}; kit.chapters.forEach(c => { if (ok.some(i => i.s === c.n)) sess[c.n] = c.name; });
    const mcq = ok.filter(i => i.type === "mcq" && i.o.length === 4), tf = ok.filter(i => i.type === "tf"), typed = ok.filter(i => i.type === "typed"), cards = ok.filter(i => i.type === "card");
    const keys = {}; mcq.concat(tf).forEach((it, k) => { keys["m" + k] = it.id; }); typed.forEach((it, k) => { keys["t" + k] = it.id; });
    return { sess, noExpand: true, keys,
      mcq: mcq.map(i => ({ s: i.s, t: i.topic || "", q: i.q, o: i.o.slice(), e: src(i), d: i.difficulty })),
      tf: tf.map(i => ({ s: i.s, q: i.q, v: i.v, e: src(i), d: i.difficulty })),
      typed: typed.map(i => ({ s: i.s, q: i.q, a: i.a.slice(), e: src(i), d: i.difficulty })),
      facts: cards.map(i => ({ s: i.s, cat: i.topic || "", kind: "c", term: i.term, def: i.def, aliases: [] })) };
  }

  // ---------- printable pages (the browser's "Save as PDF") ----------
  const he = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])).replace(/\n/g, "<br>");
  const PRINT_CSS = "body{font:11pt/1.45 Georgia,'Times New Roman',serif;color:#111;max-width:760px;margin:24px auto;padding:0 20px}h1{font:700 20pt/1.2 Arial,Helvetica,sans-serif;margin:0 0 4px}h2{font:700 13pt Arial,Helvetica,sans-serif;margin:26px 0 8px;border-bottom:2px solid #5b2be0;padding-bottom:3px;break-after:avoid}"
    + ".meta,.lic{font:9pt Arial,Helvetica,sans-serif;color:#555}.lic{border-top:1px solid #bbb;margin-top:28px;padding-top:8px}.q{margin:0 0 12px;break-inside:avoid}.q b{font-family:Arial,Helvetica,sans-serif}ol.o{margin:4px 0 4px 4px;padding-left:22px;list-style:upper-alpha}"
    + ".ok{font-weight:700}.ok:after{content:' ✓'}.e{margin:3px 0 0;color:#333}.src{font:9pt Arial,Helvetica,sans-serif;color:#555;margin:2px 0 0}dl{margin:0}dt{font:700 11pt Arial,Helvetica,sans-serif;margin-top:8px}dd{margin:0 0 4px}ul{margin:4px 0;padding-left:20px}"
    + ".blank{border-bottom:1px solid #999;display:inline-block;min-width:180px}@media print{body{margin:0;max-width:none}.noprint{display:none}}";
  const page = (title, sub, body, school) => "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>" + he(title) + "</title><style>" + PRINT_CSS + "</style></head><body><h1>" + he(title) + "</h1><p class=\"meta\">" + he(sub) + "</p>" + body + "<p class=\"lic\">" + he(LICENCE(school)) + "</p></body></html>";
  const srcHtml = it => it.src && (it.src.file || it.src.quote) ? "<p class=\"src\">Source: " + he(it.src.file || "") + (it.src.page != null ? ", p. " + he(it.src.page) : "") + (it.src.quote ? " — “" + he(it.src.quote) + "”" : "") + "</p>" : "";
  // the question bank: with answers, explanations and sources (professor copy) or as a blank test (answers:false)
  function bankHtml(kit, opts) {
    opts = opts || {}; const ans = opts.answers !== false; let n = 0, body = "";
    kit.chapters.forEach(c => { const its = pick(kit, opts).filter(i => i.s === c.n && i.type !== "card"); if (!its.length) return;
      body += "<h2>" + he(c.n + ". " + c.name) + "</h2>";
      its.forEach(it => { n++; body += "<div class=\"q\"><b>" + n + ".</b> " + he(it.q);
        if (it.type === "mcq") { const order = ans ? [0, 1, 2, 3] : [(n + 1) % 4, (n + 2) % 4, (n + 3) % 4, n % 4];   // the blank test must not always show the right answer first
          body += "<ol class=\"o\">" + order.map(k => "<li" + (ans && k === 0 ? " class=\"ok\"" : "") + ">" + he(it.o[k]) + "</li>").join("") + "</ol>"; }
        if (it.type === "tf") body += ans ? " <span class=\"ok\">" + (it.v ? "True" : "False") + "</span>" : " &nbsp; ☐ True &nbsp; ☐ False";
        if (it.type === "typed") body += ans ? "<div class=\"ok\">" + he(it.a.join(" / ")) + "</div>" : "<div><span class=\"blank\">&nbsp;</span></div>";
        if (ans) body += (it.e ? "<p class=\"e\">" + he(it.e) + "</p>" : "") + srcHtml(it);
        body += "</div>"; }); });
    return page((kit.title || "Course") + (ans ? ": question bank with answers" : ": practice test"), (kit.subject ? kit.subject + " · " : "") + n + " questions" + (ans ? " · answers, explanations and sources · for the teaching team" : ""), body, opts.school);
  }
  // one revision sheet per chapter for students: key terms (the flashcards) and the points to remember (the explanations of the approved questions)
  function sheetHtml(kit, opts) {
    opts = opts || {}; let body = "";
    kit.chapters.forEach(c => { const its = kit.items.filter(i => i.s === c.n && i.status === "approved"); if (!its.length) return;
      const cards = its.filter(i => i.type === "card"), pts = []; its.forEach(i => { if (i.type !== "card" && i.e && pts.indexOf(i.e) < 0) pts.push(i.e); });
      body += "<h2>" + he(c.n + ". " + c.name) + "</h2>";
      if (cards.length) body += "<dl>" + cards.map(k => "<dt>" + he(k.term) + "</dt><dd>" + he(k.def) + "</dd>").join("") + "</dl>";
      if (pts.length) body += "<p><b>Points to remember</b></p><ul>" + pts.slice(0, 14).map(p => "<li>" + he(p) + "</li>").join("") + "</ul>"; });
    return page((kit.title || "Course") + ": revision sheets", (kit.subject ? kit.subject + " · " : "") + "one sheet per chapter · approved by the teaching team", body, opts.school);
  }

  return { LICENCE, cleanItem, cleanKit, examBlueprint, importAny, fromCsv, toCsv, fromGift, toGift, fromMoodleXml, toMoodleXml, fromPaste, toBank, bankHtml, sheetHtml, parseCsvRows, uid };
});
