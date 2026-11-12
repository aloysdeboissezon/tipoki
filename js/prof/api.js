// The professor space talks to its data through one small interface, with two implementations:
//   QwebboProfAPI.demo()            everything in this browser (localStorage), fictional data, never touches the server
//   QwebboProfAPI.remote(sb, token) Supabase RPCs (supabase/migrations/add_professor_space.sql); the server checks the role on every call
// Methods (all async): me, listCourses, createCourse, getCourse, saveCourse, setState, stats, setReport, reset (demo only)
(function () {
  "use strict";
  const KEY = "qwebbo-demo", D = () => window.QwebboDemoData, K = () => window.QwebboKit;
  const clone = x => JSON.parse(JSON.stringify(x));
  const code = () => { const A = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; let s = ""; for (let i = 0; i < 6; i++) s += A[Math.floor(Math.random() * A.length)]; return s; };
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx".replace(/x/g, () => (Math.random() * 16 | 0).toString(16)));
  // rows are stored with the game's keys ("m3"); the key -> item map can change at each publication, so every publication keeps its own map
  function rowsToItems(rows, keymaps) {
    const maps = (keymaps || []).slice().sort((a, b) => new Date(a.at) - new Date(b.at));
    return (rows || []).map(r => { let m = maps[0]; for (const x of maps) if (new Date(x.at) <= new Date(r.at)) m = x;
      const qs = {}, w = {}; if (m) Object.keys(r.qs || {}).forEach(k => { const id = m.keys[k]; if (id) { qs[id] = r.qs[k]; if (r.w && r.w[k] != null) w[id] = r.w[k]; } });
      return { ...r, qs, w }; });
  }

  function seed() {
    const d = D(), kit = clone(d.KIT), now = Date.now();
    kit.items.forEach(it => { if (it.s <= 5) it.status = "approved"; });   // chapter 6 is left to review, to show the review screen
    const bank = K().toBank(kit), at = new Date(now - 35 * 864e5).toISOString(), by = "demo.professor@example.edu";
    const audit = [{ at, by, action: "upload", detail: d.FILE + " (6 pages)" }, { at, by, action: "import", detail: "28 items imported, all waiting for review" }]
      .concat(kit.items.filter(i => i.status === "approved").map(i => ({ at, by, action: "approve", item: i.id }))).concat([{ at, by, action: "publish", detail: "23 items published" }]);
    const course = { id: d.COURSE_ID, title: kit.title, subject: kit.subject, lang: "en", state: "published", code: d.CODE, enrolled: 60, kit, sources: { [d.FILE]: clone(d.PAGES) }, audit, published: bank, keymaps: [{ at, keys: bank.keys }], updated: new Date(now).toISOString() };
    const f = d.fakeClass(bank, kit, now);
    return { v: 1, courses: { [course.id]: course }, stats: { [course.id]: f } };
  }
  function load() { try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && s.v === 1) return s; } catch (e) {} const s = seed(); save(s); return s; }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  const summary = c => ({ id: c.id, title: c.title, subject: c.subject, state: c.state, code: c.code, updated: c.updated, items: c.kit.items.length, approved: c.kit.items.filter(i => i.status === "approved").length });

  function demo() {
    const who = { email: "demo.professor@example.edu", role: "professor", school: { id: "demo", name: "Demo Business School" }, demo: true };
    const stamp = (c, entries) => { (entries || []).forEach(e => c.audit.push({ at: new Date().toISOString(), by: who.email, action: e.action, item: e.item || undefined, detail: e.detail || undefined })); c.updated = new Date().toISOString(); };
    return {
      demo: true,
      async me() { return who; },
      async listCourses() { return Object.values(load().courses).filter(c => c.state !== "archived").map(summary).sort((a, b) => (a.updated < b.updated ? 1 : -1)); },
      async createCourse(p) { const s = load(), c = { id: uuid(), title: p.title, subject: p.subject || "", lang: p.lang || "en", state: "draft", code: null, enrolled: null, kit: K().cleanKit({ title: p.title, subject: p.subject, lang: p.lang }), sources: {}, audit: [], keymaps: [], updated: "" };
        stamp(c, [{ action: "create", detail: p.title }]); s.courses[c.id] = c; save(s); return clone(c); },
      async getCourse(id) { const c = load().courses[id]; return c ? clone(c) : null; },
      async saveCourse(id, patch, entries) { const s = load(), c = s.courses[id]; if (!c) throw new Error("not_found");
        ["title", "subject", "lang", "enrolled", "kit", "sources"].forEach(k => { if (patch[k] !== undefined) c[k] = clone(patch[k]); });
        if (c.state === "draft" && c.kit.items.length) c.state = "in_review";
        stamp(c, entries); save(s); return clone(c); },
      async setState(id, state) { const s = load(), c = s.courses[id]; if (!c) throw new Error("not_found");
        if (state === "published") { const bank = K().toBank(c.kit); if (!Object.keys(bank.keys).length && !bank.facts.length) throw new Error("nothing_approved");
          c.published = bank; c.code = c.code || code(); c.keymaps.push({ at: new Date().toISOString(), keys: bank.keys });
          stamp(c, [{ action: "publish", detail: c.kit.items.filter(i => i.status === "approved").length + " items published" }]); }
        else if (state === "in_review") { c.published = null; stamp(c, [{ action: "unpublish" }]); }
        else if (state === "archived") { c.published = null; stamp(c, [{ action: "archive" }]); }
        c.state = state; save(s); return clone(c); },
      async stats(id) { const s = load(), c = s.courses[id], st = s.stats[id] || { rows: [], survey: [], reports: [] };
        return { rows: rowsToItems(st.rows, c ? c.keymaps : []), survey: st.survey || [], reports: clone(st.reports || []) }; },
      async setReport(id, rid, status) { const s = load(), r = ((s.stats[id] || {}).reports || []).find(x => x.id === rid); if (r) { r.status = status; stamp(s.courses[id], [{ action: "report_" + status, item: r.item }]); save(s); } },
      async reset() { const s = seed(); save(s); return true; },
    };
  }

  function remote(sb, token) {
    const call = async (fn, args) => { const { data, error } = await sb.rpc(fn, { p_token: token, ...(args || {}) }); if (error) throw new Error(/bad_token|not_professor|not_found|nothing_approved/.exec(error.message || "") ? RegExp.lastMatch : (error.message || "server")); return data; };
    return {
      demo: false,
      me: () => call("prof_me"),
      listCourses: () => call("prof_courses"),
      createCourse: p => call("prof_course_create", { p_title: p.title, p_subject: p.subject || "", p_lang: p.lang || "en" }),
      getCourse: id => call("prof_course_get", { p_id: id }),
      saveCourse: (id, patch, entries) => call("prof_course_save", { p_id: id, p_patch: patch, p_audit: entries || [] }),
      setState: async (id, state, kit) => call("prof_course_state", { p_id: id, p_state: state, p_bank: state === "published" ? window.QwebboKit.toBank(kit) : null }),
      stats: async id => { const r = await call("prof_course_stats", { p_id: id }); return { rows: rowsToItems(r.rows || [], r.keymaps || []), survey: r.survey || [], reports: r.reports || [], hidden: !!r.hidden, students: r.students }; },
      setReport: (id, rid, status) => call("prof_report_set", { p_id: id, p_report: rid, p_status: status }),
    };
  }
  window.QwebboProfAPI = { demo, remote, rowsToItems, DEMO_KEY: KEY };
})();
