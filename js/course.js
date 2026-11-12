// A professor's published course, on the student side.
//   /?course=CODE          opens the course behind a code (only for an account whose verified email belongs to the course's school)
//   /?course=CODE&demo=1   demo mode: the course and every answer stay in this browser; the server is never contacted
// The game then treats the course like any quiz opened by its id: useBank() asks QwebboCourse.load(id) first (see js/app/03-quiz-data.js).
(function () {
  "use strict";
  let p = null; try { p = new URLSearchParams(location.search); } catch (e) { p = new URLSearchParams(""); }
  const DEMO_KEY = "qwebbo-demo";
  let demo = false; try { if (p.get("demo") === "1") sessionStorage.setItem("qwebbo-demo-on", "1"); if (p.get("demo") === "0") sessionStorage.removeItem("qwebbo-demo-on"); demo = sessionStorage.getItem("qwebbo-demo-on") === "1"; } catch (e) {}
  // Demo mode cuts the page off from the backend BEFORE the game starts: no game, score, statistic or sign-in of a demo can reach production.
  if (demo) { try { delete window.supabase; } catch (e) { window.supabase = undefined; } }
  const store = () => { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || "null"); } catch (e) { return null; } };
  const token = () => { try { return (JSON.parse(localStorage.getItem("tpk-sync") || "null") || {}).tok || ""; } catch (e) { return ""; } };
  const shape = c => ({ id: c.id, title: c.title, subject: c.subject || "", lang: c.lang || "en", data: { ...c.bank, course: true, demo: !!c.demo } });
  const cache = {};

  async function load(id) {   // -> {data} | {denied:"login"|"school"} | null (not a course)
    if (cache[id]) return { data: cache[id] };
    if (demo) { const s = store(), c = s && s.courses && s.courses[id]; if (!c || c.state !== "published" || !c.published) return null;
      return { data: (cache[id] = shape({ id: c.id, title: c.title, subject: c.subject, lang: c.lang, bank: c.published, demo: true })) }; }
    if (typeof sb === "undefined" || !sb || !navigator.onLine) return null;
    try { const r = await sb.rpc("course_open", { p_id: id, p_token: token() || null });
      if (r.error) return /function .* does not exist|PGRST202/.test(r.error.message || "") ? null : null;
      const d = r.data; if (!d || d.none) return null; if (d.denied) return { denied: d.denied, school: d.school };
      return { data: (cache[id] = shape({ id: d.id, title: d.title, subject: d.subject, lang: d.lang, bank: d.bank })) }; }
    catch (e) { return null; }
  }
  async function byCode(code) {
    code = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8); if (code.length < 4) return null;
    if (demo) { const s = store(); const c = s && Object.values(s.courses || {}).find(x => x.code === code && x.state === "published"); return c ? c.id : null; }
    if (typeof sb === "undefined" || !sb) return null;
    try { const r = await sb.rpc("course_by_code", { p_code: code }); return r.error ? null : r.data || null; } catch (e) { return null; }
  }
  // demo: finished games, reports and survey answers are kept in the demo store, in the same shape as the server tables
  function demoAdd(kind, row) { const s = store(); if (!s || !s.stats) return; const id = row.quiz, st = s.stats[id] || (s.stats[id] = { rows: [], survey: [], reports: [] });
    if (kind === "play") st.rows.push({ player: row.player, at: new Date().toISOString(), game: row.game, mode: row.mode, n: row.n, correct: row.correct, qs: row.qs, w: row.w || {} });
    if (kind === "survey") st.survey.push(row.score);
    if (kind === "report") { const c = s.courses[id], item = c && c.published && c.published.keys[row.q]; st.reports.push({ id: Date.now(), item, key: row.q, reason: row.reason, status: "open", at: new Date().toISOString() }); }
    try { localStorage.setItem(DEMO_KEY, JSON.stringify(s)); } catch (e) {} }
  window.QwebboCourse = { load, byCode, demo, demoAdd, code: p.get("course") };

  if (demo) addEventListener("DOMContentLoaded", () => { const b = document.createElement("div"); b.id = "demoFlag"; b.textContent = "DEMO · fictional data · offline";
    b.style.cssText = "position:fixed;left:50%;bottom:6px;transform:translateX(-50%);z-index:99;background:#17162B;color:#fff;font:700 12px system-ui,sans-serif;padding:3px 10px;border-radius:999px;pointer-events:none;opacity:.85"; document.body.appendChild(b); });
})();
