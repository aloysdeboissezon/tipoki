// Shared quality checks for quiz items: the same file runs in the browser (professor review screen) and in Node (tools/check-banks.js, CI).
// An item is one of:
//   {type:"mcq",   s, q, o:[right, wrong, wrong, wrong], e, ...}     o[0] is the right answer (the game shuffles the options)
//   {type:"tf",    s, q, v:true|false, e, ...}
//   {type:"typed", s, q, a:[accepted answers], e, ...}
//   {type:"card",  s, term, def, ...}                                flashcard
// Optional tags: topic, bloom (remember|understand|apply), difficulty (1-3), lang, src:{file,page,quote}, status.
// validateKit() returns a list of findings {level:"error"|"warn", code, i, msg}; "error" blocks publishing, "warn" is shown to the professor.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.QwebboValidate = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const BLOOM = ["remember", "understand", "apply"];
  const TYPES = ["mcq", "tf", "typed", "card"];
  const norm = s => String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  // lighter: keeps signs, decimal points and emoji, so "−5" and "5", or two emoji riddles, stay different
  const light = s => String(s == null ? "" : s).toLowerCase().normalize("NFC").replace(/\s+/g, " ").trim();
  const words = s => norm(s).split(" ").filter(w => w.length > 2);
  const CATCH_ALL = /^(all|none|both|neither) of (the|these) (above|answers|options)\.?$|^(toutes?|aucune?) (de ces|des) reponses( ci dessus)?$|^(todas|ninguna) (de )?las anteriores$|^(a|b|c|d) (and|et|y) (a|b|c|d)$/;

  // share of the smaller word set that also appears in the other (1 = one question contains the other)
  function overlap(a, b) {
    const A = new Set(words(a)), B = new Set(words(b));
    if (A.size < 4 || B.size < 4) return 0;
    let c = 0; A.forEach(w => { if (B.has(w)) c++; });
    return c / Math.max(A.size, B.size);
  }

  function checkItem(it, ctx) {
    const out = [], add = (level, code, msg) => out.push({ level, code, msg });
    const strict = !!(ctx && ctx.requireSource), sess = ctx && ctx.sess;
    if (!it || TYPES.indexOf(it.type) < 0) { add("error", "type", "Unknown item type"); return out; }
    const text = it.type === "card" ? it.term : it.q;
    if (!norm(text)) add("error", "empty", it.type === "card" ? "The term is empty" : "The question is empty");
    if (sess && !sess[it.s]) add("error", "chapter", "Unknown chapter number " + it.s);
    if (it.type === "mcq") {
      const o = Array.isArray(it.o) ? it.o.map(String) : [];
      if (o.length !== 4) add("error", "options", "A multiple-choice question needs exactly 4 options (found " + o.length + ")");
      else {
        if (o.some(x => !norm(x) && !/\S/.test(x))) add("error", "options", "An option is empty");
        const n = o.map(x => norm(x) || x.trim());
        if (new Set(o.map(light)).size !== o.length) add("error", "dup-options", "Two options are the same");
        if (n.some(x => CATCH_ALL.test(x))) add("warn", "catch-all", "Avoid “all / none of the above”: it lets students guess");
        const L = o.map(x => x.length), others = (L[1] + L[2] + L[3]) / 3;
        if (L[0] >= 30 && L[0] > 1.7 * others && L[0] > Math.max(L[1], L[2], L[3]) + 12) add("warn", "length-tell", "The right answer is much longer than the wrong ones: it gives itself away");
        if (n[0].length > 5 && (" " + norm(it.q) + " ").indexOf(" " + n[0] + " ") >= 0) add("warn", "answer-in-question", "The right answer appears word for word in the question");
        if (o.some(x => x.length > 200)) add("warn", "long-option", "An option is longer than 200 characters");
      }
    }
    if (it.type === "tf" && typeof it.v !== "boolean") add("error", "tf", "A true/false item needs v: true or false");
    if (it.type === "typed") {
      const a = Array.isArray(it.a) ? it.a : [];
      if (!a.length || a.some(x => !norm(x) && !/\d/.test(String(x)))) add("error", "typed-answer", "A typed question needs at least one non-empty accepted answer");
      else {
        if (a.some(x => norm(x).length > 5 && (" " + norm(it.q) + " ").indexOf(" " + norm(x) + " ") >= 0)) add("warn", "answer-in-question", "An accepted answer appears in the question");
        if (String(a[0]).split(/\s+/).length > 6) add("warn", "typed-long", "The expected answer is long (more than 6 words): students will rarely type it exactly");
        if (a.length === 1 && /[À-ɏ]/.test(String(a[0])) === false && /\s/.test(String(a[0])) && String(a[0]).length > 18) add("warn", "typed-variants", "Only one accepted spelling for a long answer: add variants or synonyms");
      }
    }
    if (it.type === "card" && !norm(it.def)) add("error", "empty", "The definition is empty");
    if (it.type !== "card" && (!it.e || String(it.e).trim().length < 15)) add(strict ? "error" : "warn", "explanation", "Missing or very short explanation");
    if (it.bloom != null && BLOOM.indexOf(it.bloom) < 0) add("error", "bloom", "bloom must be remember, understand or apply");
    if (it.difficulty != null && [1, 2, 3].indexOf(it.difficulty) < 0) add("error", "difficulty", "difficulty must be 1, 2 or 3");
    const src = it.src;
    if (strict) {
      if (!src || !String(src.file || "").trim() || !String(src.quote || "").trim()) add("warn", "source", "No source: add the file, the page and a short quote from the course");
      else if (src.page == null || src.page === "") add("warn", "source-page", "The source has no page or slide number");
    }
    return out;
  }

  // items: array of items. opts: {sess:{n:name}, requireSource:bool, sourceText:{file:{page:text}} to check quotes}
  function validateKit(items, opts) {
    opts = opts || {};
    const out = [], seen = new Map(), list = [];
    (items || []).forEach((it, i) => {
      checkItem(it, opts).forEach(f => out.push({ ...f, i }));
      if (!it || TYPES.indexOf(it.type) < 0) return;
      const key = it.type + "|" + light(it.type === "card" ? it.term : it.q).replace(/[.?!:;,"'“”«»]/g, "") + "|" + (it.lang || "") + "|" + light(it.type === "mcq" ? (it.o || [])[0] : it.type === "typed" ? (it.a || [])[0] : it.type === "tf" ? it.v : it.def);
      if (norm(it.type === "card" ? it.term : it.q)) {
        if (seen.has(key)) out.push({ level: "error", code: "duplicate", i, msg: "Same question and same answer as item " + (seen.get(key) + 1), other: seen.get(key) });
        else seen.set(key, i);
      }
      if (it.type !== "card") list.push(i);
      // the quote must really be in the course text, when we have it
      const src = it.src, pages = src && opts.sourceText && opts.sourceText[src.file];
      if (pages && src.quote) {
        const q = norm(src.quote), hay = src.page != null && pages[src.page] != null ? norm(pages[src.page]) : Object.keys(pages).map(p => norm(pages[p])).join(" ");
        if (q && hay.indexOf(q) < 0) out.push({ level: "warn", code: "quote-not-found", i, msg: "The quote was not found on this page of the course" });
      }
    });
    // near-duplicates (same type and language, most words in common); capped so a huge bank stays fast
    if (list.length <= 1500) for (let x = 0; x < list.length; x++) for (let y = x + 1; y < list.length; y++) {
      const a = items[list[x]], b = items[list[y]];
      if (a.type !== b.type || (a.lang || "") !== (b.lang || "") || norm(a.q) === norm(b.q)) continue;
      if (Math.abs(a.q.length - b.q.length) > 40) continue;
      if (overlap(a.q, b.q) >= 0.9 && norm(a.type === "mcq" ? a.o[0] : a.type === "typed" ? a.a[0] : a.v) === norm(b.type === "mcq" ? b.o[0] : b.type === "typed" ? b.a[0] : b.v))
        out.push({ level: "warn", code: "near-duplicate", i: list[y], msg: "Very close to item " + (list[x] + 1), other: list[x] });
    }
    return out;
  }

  // Bloom mix of the scored items (cards excluded): {remember, understand, apply, untagged} as shares 0..1
  function bloomMix(items) {
    const m = { remember: 0, understand: 0, apply: 0, untagged: 0 }; let n = 0;
    (items || []).forEach(it => { if (!it || it.type === "card") return; n++; m[BLOOM.indexOf(it.bloom) >= 0 ? it.bloom : "untagged"]++; });
    Object.keys(m).forEach(k => { m[k] = n ? m[k] / n : 0; });
    return m;
  }

  // Two language versions of one kit must be the same items: same count, type, chapter, truth value and number of options.
  function checkParity(a, b) {
    const out = [];
    if ((a || []).length !== (b || []).length) { out.push({ level: "error", code: "parity-count", i: -1, msg: "The two language versions do not have the same number of items (" + (a || []).length + " vs " + (b || []).length + ")" }); return out; }
    a.forEach((x, i) => { const y = b[i];
      if (x.type !== y.type || x.s !== y.s) out.push({ level: "error", code: "parity", i, msg: "Item " + (i + 1) + " is not the same kind or chapter in both languages" });
      else if (x.type === "tf" && x.v !== y.v) out.push({ level: "error", code: "parity", i, msg: "Item " + (i + 1) + " is true in one language and false in the other" });
      else if (x.type === "mcq" && (x.o || []).length !== (y.o || []).length) out.push({ level: "error", code: "parity", i, msg: "Item " + (i + 1) + " does not have the same number of options in both languages" });
      else if (x.type !== "card" && /\d/.test(String(x.type === "mcq" ? x.o[0] : x.type === "typed" ? x.a[0] : "")) ) {
        const nums = s => (String(s).match(/\d+(?:[.,]\d+)?/g) || []).map(n => n.replace(",", ".")).sort().join("|");
        const ra = x.type === "mcq" ? x.o[0] : x.a[0], rb = y.type === "mcq" ? y.o[0] : y.a[0];
        if (nums(ra) !== nums(rb)) out.push({ level: "warn", code: "parity-number", i, msg: "Item " + (i + 1) + ": the numbers in the right answer differ between the two languages" });
      } });
    return out;
  }

  // Built-in banks (window.BANK_X: Q with the right option first, TQ typed) -> items for the checks above
  function fromBank(b) {
    const items = [];
    (b.Q || []).forEach(q => items.push(q.tf
      ? { type: "tf", s: q.s, q: q.q, v: /^(vrai|true|verdadero|참)$/i.test(String(q.o[q.a || 0])), e: q.e, topic: q.t, difficulty: q.d, _n: q.o.length }
      : { type: "mcq", s: q.s, q: q.q + (q.img ? " [" + q.img + "]" : ""), o: q.a ? [q.o[q.a]].concat(q.o.filter((_, k) => k !== q.a)) : q.o, e: q.e, topic: q.t, difficulty: q.d }));
    (b.TQ || []).forEach(q => items.push({ type: "typed", s: q.s, q: q.q + (q.img ? " [" + q.img + "]" : ""), a: q.a, e: q.e, difficulty: q.d }));
    return items;
  }

  return { validateKit, checkItem, checkParity, bloomMix, fromBank, norm, BLOOM, TYPES };
});
