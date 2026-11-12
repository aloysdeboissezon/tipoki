// Runs the shared quality checks (js/kit/validate.js) on EVERY built-in quiz, in every language it ships in.
//   node tools/check-kit.js            all quizzes; exit code 1 when an error is found
//   node tools/check-kit.js socio -v   one quiz, with the warnings listed
// Errors block (wrong shape, duplicate options, duplicate question, empty answer, a translation that is not the same question).
// Warnings are advice for the author (right answer much longer than the others, answer visible in the question...).
const fs = require("fs"), path = require("path");
const V = require("../js/kit/validate.js"), { bankFile, privateIds } = require("./bankpath");
const args = process.argv.slice(2), verbose = args.includes("-v"), want = args.filter(a => a !== "-v");
const root = path.join(__dirname, "..");
const ids = [...fs.readdirSync(path.join(root, "js/banks")).filter(f => f.endsWith(".js")).map(f => f.slice(0, -3)), ...privateIds()].filter(id => !want.length || want.includes(id));
const trDir = path.join(root, "js/banks/tr");
let errors = 0, warns = 0, total = 0;
const report = (label, items, found) => {
  const e = found.filter(f => f.level === "error"), w = found.filter(f => f.level === "warn");
  errors += e.length; warns += w.length; total += items.length;
  console.log((e.length ? "FAIL " : "ok   ") + label.padEnd(22) + String(items.length).padStart(5) + " items, " + e.length + " errors, " + w.length + " warnings");
  (verbose ? found : e).forEach(f => console.log("     " + f.level + " [" + f.code + "] #" + (f.i + 1) + " " + f.msg + (items[f.i] ? " | " + String(items[f.i].q || items[f.i].term).slice(0, 90) : "")));
};
for (const id of ids) {
  global.window = {};
  const file = bankFile(id); delete require.cache[file]; require(file);
  const b = window["BANK_" + id.toUpperCase()];
  if (!b || !b.Q) { console.log("skip " + id + " (no question list)"); continue; }
  const items = V.fromBank(b);
  report(id + " (" + (b.lang || "fr") + ")", items, V.validateKit(items, { sess: b.sess }));
  for (const f of fs.existsSync(trDir) ? fs.readdirSync(trDir).filter(f => f.startsWith(id + ".") && f.endsWith(".js")) : []) {
    const lang = f.split(".")[1], tf = path.join(trDir, f); delete require.cache[tf]; require(tf);
    const tr = window.BANK_TR && window.BANK_TR[id + "." + lang];
    if (!tr || tr.Q.length !== b.Q.length || (tr.TQ || []).length !== b.TQ.length) { errors++; console.log("FAIL " + id + "." + lang + ": not the same number of questions as the original"); continue; }
    // the same items with the translated wording (see applyTr in js/app/03-quiz-data.js)
    const trItems = items.map((it, i) => {
      if (i < b.Q.length) { const x = tr.Q[i]; return it.type === "tf" ? { ...it, q: x[0], e: x[1] } : { ...it, q: x[0], o: [x[1], x[2], x[3], x[4]], e: x[5] }; }
      const x = tr.TQ[i - b.Q.length]; return { ...it, q: x[0], a: x[1], e: x[2] };
    });
    report(id + " (" + lang + ")", trItems, V.validateKit(trItems, { sess: b.sess }).concat(V.checkParity(items, trItems)));
  }
}
console.log("\n" + total + " items checked: " + errors + " errors, " + warns + " warnings" + (verbose ? "" : " (add -v to list the warnings)"));
process.exit(errors ? 1 : 0);
