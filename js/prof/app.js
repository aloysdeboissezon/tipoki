// Professor space: course material -> study kit -> review and approve -> publish -> class insight.
// Every text typed or imported by a person is written with textContent (never innerHTML): imported content cannot inject code.
(function () {
  "use strict";
  const K = window.QwebboKit, V = window.QwebboValidate, IN = window.QwebboInsight, X = window.QwebboExtract;
  const SB_URL = "https://eowcxqqkewijzgemqbhi.supabase.co", SB_KEY = "sb_publishable_WYtzPauL3s0sPu_Vvj0iOQ_uUTg1uW7";   // the public (publishable) key, same one the student site uses
  const MAX_FILES = 10, MAX_COURSE_CHARS = 600000;
  const $ = id => document.getElementById(id), app = $("app");
  function h(tag, attrs) {
    const e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(k => { const v = attrs[k]; if (v == null || v === false) return;
      if (k === "class") e.className = v; else if (k === "text") e.textContent = v; else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
      else if (k === "value") e.value = v; else if (k === "checked" || k === "disabled" || k === "hidden") e[k] = !!v; else e.setAttribute(k, v === true ? "" : v); });
    for (let i = 2; i < arguments.length; i++) { const c = arguments[i]; if (c == null || c === false) continue; put(e, c); }
    return e;
  }
  function put(el) { for (let i = 1; i < arguments.length; i++) { const c = arguments[i]; if (c == null || c === false) continue; (Array.isArray(c) ? c : [c]).forEach(x => { if (Array.isArray(x)) put(el, x); else if (x != null && x !== false) el.append(x.nodeType ? x : document.createTextNode(String(x))); }); } return el; }
  const btn = (label, onclick, cls, attrs) => h("button", { type: "button", class: "btn " + (cls || ""), onclick, ...(attrs || {}) }, label);
  const pct = v => (v == null ? "n/a" : Math.round(v * 100) + "%");
  const date = s => { try { return new Date(s).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); } catch (e) { return s; } };
  let toastT = null;
  function toast(msg) { let t = $("toast"); if (!t) { t = h("div", { id: "toast", class: "toast", role: "status" }); document.body.append(t); } t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 3200); }
  function download(name, text, type) { const a = h("a", { href: URL.createObjectURL(new Blob([text], { type: type || "text/plain;charset=utf-8" })), download: name }); document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000); }
  function printPage(html) { const w = window.open(URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" })), "_blank"); if (!w) toast("Allow pop-ups to open the printable page."); else w.addEventListener("load", () => { try { w.focus(); w.print(); } catch (e) {} }); }
  const slug = s => String(s || "course").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "course";

  // ---------- state ----------
  let api = null, me = null, course = null, tab = "material", sel = null, filter = { status: "todo", chapter: 0 }, editing = false, pendingAudit = [], saveT = null, saving = Promise.resolve(), findings = [];
  const isDemo = /[?&]demo=1/.test(location.search) || (() => { try { return sessionStorage.getItem("qwebbo-demo-on") === "1"; } catch (e) { return false; } })();
  function token() { try { return (JSON.parse(localStorage.getItem("tpk-sync") || "null") || {}).tok || ""; } catch (e) { return ""; } }

  function audit(action, item, detail) { pendingAudit.push({ action, item: item || null, detail: detail || null }); }
  function save(now) {   // every change is saved a moment later, with the list of who-did-what entries
    clearTimeout(saveT);
    const run = () => { const entries = pendingAudit; pendingAudit = []; const id = course.id, patch = { title: course.title, subject: course.subject, lang: course.lang, enrolled: course.enrolled, kit: course.kit, sources: course.sources };
      saving = saving.then(() => api.saveCourse(id, patch, entries)).then(c => { if (course && course.id === c.id) { course.audit = c.audit; course.state = c.state; course.updated = c.updated; } setSaved(true); })
        .catch(e => { pendingAudit = entries.concat(pendingAudit); setSaved(false, e); }); return saving; };
    setSaved(null);
    if (now) return run();
    saveT = setTimeout(run, 500);
  }
  function setSaved(ok, err) { const s = $("saveState"); if (!s) return; s.textContent = ok == null ? "Saving…" : ok ? "All changes saved" : "Not saved: " + (err && err.message || "check your connection"); s.className = "small " + (ok === false ? "note bad" : "muted"); }
  function validate() {
    const sess = {}; course.kit.chapters.forEach(c => { sess[c.n] = c.name; });
    findings = V.validateKit(course.kit.items, { sess, requireSource: true, sourceText: course.sources });
  }
  const flagsOf = i => findings.filter(f => f.i === i);
  const hasError = i => findings.some(f => f.i === i && f.level === "error");

  // ---------- start ----------
  async function start() {
    if (isDemo) { try { sessionStorage.setItem("qwebbo-demo-on", "1"); } catch (e) {} api = window.QwebboProfAPI.demo(); }
    else {
      const tok = token();
      if (!tok || !window.supabase) return gate(tok ? "offline" : "signin");
      try { api = window.QwebboProfAPI.remote(window.supabase.createClient(SB_URL, SB_KEY, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }), tok); } catch (e) { return gate("offline"); }
    }
    try { me = await api.me(); } catch (e) { return gate(/bad_token/.test(e.message) ? "signin" : /not_professor/.test(e.message) ? "role" : "closed"); }
    if (!me || !me.role) return gate("role");
    $("who").textContent = me.email + " · " + me.school.name;
    $("demoBar").hidden = !api.demo;
    addEventListener("hashchange", route); route();
  }
  function gate(why) {
    const msg = { signin: ["Sign in first", "Open qwebbo.com, sign in with your school email (the person icon), then come back to this page."],
      role: ["This account is not a professor account", "Professor access is given per school, by name. Write to hello@qwebbo.com from your school address and we will add you."],
      closed: ["The professor space is not open on this site yet", "You can try everything in demo mode: it runs in your browser on fictional data."],
      offline: ["The server cannot be reached", "Check your connection, or try the demo mode, which works offline."] }[why];
    app.replaceChildren(h("div", { class: "card" }, h("h1", { text: msg[0] }), h("p", { text: msg[1] }),
      h("div", { class: "row" }, why === "signin" ? h("a", { class: "btn", href: "/" }, "Go to qwebbo.com") : null, h("a", { class: "btn ghost", href: "prof.html?demo=1" }, "Open the demo"))));
  }
  async function route() {
    const m = /^#\/c\/([^/]+)(?:\/(\w+))?/.exec(location.hash);
    if (!m) { course = null; return renderCourses(); }
    if (!course || course.id !== m[1]) { await saving; course = await api.getCourse(m[1]); sel = null; editing = false; if (!course) { location.hash = "#/"; return; } }
    tab = m[2] || (course.kit.items.length ? "review" : "material");
    renderCourse();
  }

  // ---------- list of courses ----------
  async function renderCourses() {
    const list = await api.listCourses();
    const form = h("form", { class: "card", onsubmit: async e => { e.preventDefault(); const t = $("ncTitle").value.trim(); if (!t) return $("ncTitle").focus();
      const c = await api.createCourse({ title: t, subject: $("ncSubject").value.trim(), lang: $("ncLang").value }); location.hash = "#/c/" + c.id + "/material"; } },
      h("h2", { text: "New course" }),
      h("label", { class: "field" }, h("span", { text: "Course title" }), h("input", { id: "ncTitle", type: "text", maxlength: 120, required: true, placeholder: "Financial Accounting II" })),
      h("label", { class: "field" }, h("span", { text: "Programme or section (optional)" }), h("input", { id: "ncSubject", type: "text", maxlength: 160, placeholder: "BBA 2 · Section A" })),
      h("label", { class: "field" }, h("span", { text: "Language of the course" }), h("select", { id: "ncLang" }, h("option", { value: "en" }, "English"), h("option", { value: "es" }, "Español"), h("option", { value: "ca" }, "Català"), h("option", { value: "fr" }, "Français"))),
      h("button", { class: "btn", type: "submit" }, "Create the course"));
    app.replaceChildren(h("h1", { text: "Your courses" }), h("p", { class: "muted", text: "Upload your material, review the study kit, publish it to your students, then see where the class struggles." }),
      h("div", { class: "grid", id: "courseGrid" }, list.map(c => h("a", { class: "card course", href: "#/c/" + c.id, "data-id": c.id },
        h("div", { class: "row" }, h("span", { class: "pill " + c.state, text: STATE[c.state] || c.state }), c.code ? h("span", { class: "pill", text: "Code " + c.code }) : null),
        h("h2", { text: c.title }), h("p", { class: "muted small", text: (c.subject ? c.subject + " · " : "") + c.approved + " of " + c.items + " items approved" }))), form));
  }
  const STATE = { draft: "Draft", generating: "Generating", in_review: "In review", published: "Published", archived: "Archived" };
  const TABS = [["material", "1 · Course material"], ["kit", "2 · Study kit"], ["review", "3 · Review"], ["publish", "4 · Publish & export"], ["insight", "5 · Class insight"], ["pilot", "6 · Pilot report"], ["log", "Activity log"]];

  function renderCourse() {
    validate();
    const body = h("div", { id: "tabBody" });
    app.replaceChildren(h("p", { class: "small" }, h("a", { href: "#/" }, "← All courses")),
      h("div", { class: "row" }, h("h1", { text: course.title }), h("span", { class: "pill " + course.state, id: "stateTag", text: STATE[course.state] })),
      h("p", { class: "muted small", id: "saveState", text: course.subject || "" }),
      h("div", { class: "tabs", role: "tablist" }, TABS.map(([id, label]) => h("button", { role: "tab", "aria-selected": String(id === tab), "data-tab": id, onclick: () => { location.hash = "#/c/" + course.id + "/" + id; } }, label))), body);
    ({ material: tabMaterial, kit: tabKit, review: tabReview, publish: tabPublish, insight: tabInsight, pilot: tabPilot, log: tabLog }[tab] || tabMaterial)(body);
  }

  // ---------- 1. course material ----------
  function tabMaterial(root) {
    const names = Object.keys(course.sources || {}), chars = names.reduce((a, n) => a + Object.values(course.sources[n]).join("").length, 0);
    const input = h("input", { type: "file", id: "fileIn", multiple: true, accept: X.ACCEPT, hidden: true, onchange: e => addFiles(e.target.files) });
    const drop = h("div", { class: "drop", id: "drop", ondragover: e => { e.preventDefault(); drop.classList.add("over"); }, ondragleave: () => drop.classList.remove("over"), ondrop: e => { e.preventDefault(); drop.classList.remove("over"); addFiles(e.dataTransfer.files); } },
      h("p", null, h("b", { text: "Drop your slides, notes or readings here" })), h("p", { class: "muted small", text: "PDF, PowerPoint (.pptx), Word (.docx) or text · up to 20 MB per file, " + MAX_FILES + " files per course" }),
      btn("Choose files", () => input.click()), input);
    const paste = h("details", { class: "card" }, h("summary", null, h("b", { text: "Or paste your notes" })),
      h("label", { class: "field" }, h("span", { text: "Name" }), h("input", { type: "text", id: "pasteName", maxlength: 80, value: "Lecture notes" })),
      h("label", { class: "field" }, h("span", { text: "Text" }), h("textarea", { id: "pasteText", rows: 6 })),
      btn("Add these notes", () => { const t = $("pasteText").value; if (t.trim().length < 50) return toast("Paste at least a few sentences."); addExtracted(X.text($("pasteName").value.trim() || "Lecture notes", t)); }, "ghost"));
    put(root, h("div", { class: "card" }, h("h2", { text: "Course material" }),
      h("p", { class: "muted", text: "The text of each file is read in your browser, page by page, so that every question can cite the page it comes from. The original file is not stored: only its text is kept with the course, visible to you alone." }),
      drop, h("div", { id: "matMsg" }),
      h("ul", { class: "files", id: "fileList" }, names.map(n => { const pages = Object.keys(course.sources[n]).length;
        return h("li", null, h("b", { text: n }), h("span", { class: "muted small", text: pages + (pages === 1 ? " page" : " pages") + " · " + Object.values(course.sources[n]).join("").length.toLocaleString("en") + " characters" }),
          btn("Remove", () => { delete course.sources[n]; audit("remove_file", null, n); save(); renderCourse(); }, "ghost small")); })),
      names.length ? h("p", { class: "muted small", text: "Total: " + chars.toLocaleString("en") + " of " + MAX_COURSE_CHARS.toLocaleString("en") + " characters." }) : null),
      paste, names.length ? h("div", { class: "row" }, btn("Next: build the study kit →", () => { location.hash = "#/c/" + course.id + "/kit"; })) : null);
  }
  async function addFiles(fileList) {
    const msg = $("matMsg"); msg.replaceChildren();
    for (const f of [...fileList]) {
      if (Object.keys(course.sources).length >= MAX_FILES) { msg.append(h("p", { class: "note warn", text: "A course holds " + MAX_FILES + " files at most." })); break; }
      msg.append(h("p", { class: "note info", text: "Reading " + f.name + "…" }));
      try { addExtracted(await X.file(f), true); }
      catch (e) { msg.append(h("p", { class: "note bad", text: f.name + ": " + ({ too_big: "the file is larger than 20 MB.", unsupported: "this kind of file is not read yet. Use PDF, .pptx, .docx or text.", not_zip: "the file is damaged or is not a real .pptx / .docx." }[e.message] || "the file could not be read.") })); }
    }
    save(); renderCourse();
  }
  function addExtracted(r, quiet) {
    const used = Object.keys(course.sources).reduce((a, n) => a + Object.values(course.sources[n]).join("").length, 0);
    if (used + r.chars > MAX_COURSE_CHARS) { toast("This course already holds a lot of text: " + r.name + " was not added."); return; }
    if (!r.chars) { toast(r.name + ": " + r.warnings[0]); return; }
    course.sources[r.name] = r.pages; audit("upload", null, r.name + " (" + Object.keys(r.pages).length + " " + r.unit + "s)");
    r.warnings.forEach(w => toast(r.name + ": " + w));
    if (!quiet) { save(); renderCourse(); }
  }

  // ---------- 2. study kit: import (hand-made kits and AI kits take the same road) ----------
  function tabKit(root) {
    const out = h("div", { id: "impOut" });
    const fileIn = h("input", { type: "file", id: "impFile", accept: ".json,.csv,.tsv,.gift,.txt,.xml", hidden: true, onchange: async e => { const f = e.target.files[0]; if (f) preview(await f.text(), f.name); } });
    function preview(text, name) {
      const r = K.importAny(text, name), names = { json: "qwebbo kit (JSON)", csv: "Spreadsheet (CSV)", gift: "Moodle GIFT", "moodle-xml": "Moodle XML", list: "Pasted list" };
      out.replaceChildren(); put(out, h("p", { class: "note " + (r.items.length ? "ok" : "bad"), id: "impSummary", text: (names[r.format] || r.format) + ": " + r.items.length + " item" + (r.items.length === 1 ? "" : "s") + " read" + (r.errors.length ? ", " + r.errors.length + " skipped" : "") + "." }),
        r.errors.length ? h("ul", { class: "flags" }, r.errors.slice(0, 12).map(e => h("li", { class: "warn", text: e }))) : null,
        r.items.length ? btn("Add " + r.items.length + " items to the review", () => addItems(r, name), "", { id: "impAdd" }) : null);
    }
    put(root, h("div", { class: "card" }, h("h2", { text: "Bring a study kit" }),
      h("p", { class: "muted", text: "A kit is a set of questions, flashcards and their sources. Whatever its origin, every item arrives here as “to review”: nothing reaches students before you approve it." }),
      h("div", { class: "row" }, btn("Import a file", () => fileIn.click(), "", { id: "impBtn" }), fileIn,
        btn("CSV template", () => download("qwebbo-kit-template.csv", TEMPLATE, "text/csv;charset=utf-8"), "ghost"),
        api.demo ? btn("Load the kit prepared for the sample course", () => { const d = window.QwebboDemoData; course.sources[d.FILE] = course.sources[d.FILE] || JSON.parse(JSON.stringify(d.PAGES)); addItems({ format: "json", items: d.KIT.items.map(x => K.cleanItem({ ...x, id: null })), chapters: d.KIT.chapters, errors: [] }, "sample kit"); }, "ghost", { id: "impDemo" }) : null),
      h("p", { class: "muted small", text: "Accepted: qwebbo JSON, CSV, Moodle GIFT, Moodle XML, or a pasted list." }),
      h("label", { class: "field" }, h("span", { text: "Or paste questions here" }), h("textarea", { id: "impText", rows: 8, placeholder: "1. Which statement defines goodwill?\n* The excess of the price over the fair value of net assets\n- The book value of net assets\n- The cash paid\n- A liability to the seller\nE: Goodwill is what is paid above the fair value of what is acquired.\nS: slides-ch2.pdf p.14 \"the excess of the consideration transferred\"" })),
      btn("Read the pasted text", () => preview($("impText").value, ""), "ghost", { id: "impRead" }), out),
      h("div", { class: "card" }, h("h2", { text: "Generate with AI" }),
        h("p", { class: "muted", text: "qwebbo can draft the kit from your material: questions at three levels (remember, understand, apply), flashcards and a revision sheet, each with its page and quote, followed by an automatic check that rejects anything not found in your text." }),
        h("p", { class: "note info", text: api.demo ? "Not available in the demo: no course text leaves this browser. Use the prepared sample kit above." : "AI drafting is switched off for your school. Until it is enabled in your school's agreement, the qwebbo team prepares the kit from your material and you receive it here for review." })));
  }
  const TEMPLATE = "type,chapter,topic,question,answer,wrong1,wrong2,wrong3,explanation,bloom,difficulty,source_file,source_page,source_quote\r\nmcq,1,Control,Which statement best defines a group?,A parent and all its subsidiaries,Two companies with the same shareholders,A company and its suppliers,All companies in one index,A group is the parent plus every subsidiary it controls.,remember,1,slides-ch1.pdf,3,A group is a parent and all its subsidiaries\r\ntf,1,Control,Control is presumed above half of the voting rights.,true,,,,More than half of the voting rights gives the presumption of control.,remember,1,slides-ch1.pdf,4,Control is presumed when the parent holds more than half\r\ntyped,1,Influence,From what percentage is significant influence presumed?,20|20%,,,,Presumed at 20% or more of the voting power.,remember,1,slides-ch1.pdf,5,20% or more of the voting power\r\ncard,1,Control,Associate,An entity over which the investor has significant influence.,,,,,,,slides-ch1.pdf,5,An associate is an entity over which the investor has significant influence\r\n";
  function addItems(r, name) {
    (r.chapters || []).forEach(c => { const have = course.kit.chapters.find(x => x.n === c.n); if (!have) course.kit.chapters.push({ n: c.n, name: c.name }); else if (/^Chapter \d+$/.test(have.name) && c.name) have.name = c.name; });
    r.items.forEach(it => { if (!course.kit.chapters.find(c => c.n === it.s)) course.kit.chapters.push({ n: it.s, name: "Chapter " + it.s }); course.kit.items.push(it); });
    course.kit.chapters.sort((a, b) => a.n - b.n);
    audit("import", null, r.items.length + " items imported" + (name ? " from " + name : "") + ", all waiting for review");
    save(true).then(() => { filter = { status: "todo", chapter: 0 }; sel = null; location.hash = "#/c/" + course.id + "/review"; });
  }

  // ---------- 3. review ----------
  function visible() {
    return course.kit.items.map((it, i) => i).filter(i => { const it = course.kit.items[i];
      if (filter.chapter && it.s !== filter.chapter) return false;
      return filter.status === "all" || (filter.status === "todo" && it.status === "pending_review") || (filter.status === "flag" && flagsOf(i).length) || filter.status === it.status; });
  }
  function tabReview(root) {
    const items = course.kit.items;
    if (!items.length) { put(root, h("div", { class: "card" }, h("h2", { text: "Nothing to review yet" }), h("p", { class: "muted", text: "Import or generate a study kit first." }), btn("Go to the study kit", () => { location.hash = "#/c/" + course.id + "/kit"; }))); return; }
    const done = items.filter(i => i.status !== "pending_review").length, appr = items.filter(i => i.status === "approved").length, mix = V.bloomMix(items.filter(i => i.status !== "rejected"));
    const vis = visible(); if (sel == null || vis.indexOf(sel) < 0) sel = vis.length ? vis[0] : null;
    const sel0 = (label, val, cur, set) => h("label", { class: "small" }, label + " ", (() => { const s = h("select", { onchange: e => { set(e.target.value); sel = null; editing = false; renderCourse(); } }, val.map(([v, t]) => h("option", { value: v }, t))); s.value = String(cur); s.style.width = "auto"; return s; })());
    put(root, h("div", { class: "card" },
      h("div", { class: "row" }, h("b", { id: "revCount", text: done + " / " + items.length + " reviewed" }), h("span", { class: "muted small", text: appr + " approved · " + items.filter(i => i.status === "rejected").length + " rejected · " + (items.length - done) + " to review" }),
        h("span", { class: "muted small", text: "Level mix: " + pct(mix.remember) + " remember, " + pct(mix.understand) + " understand, " + pct(mix.apply) + " apply" + (mix.untagged ? ", " + pct(mix.untagged) + " untagged" : "") })),
      h("div", { class: "progress", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": items.length, "aria-valuenow": done, "aria-label": "Items reviewed" }, (() => { const i = h("i"); i.style.width = (items.length ? done / items.length * 100 : 0) + "%"; return i; })()),
      h("div", { class: "row" }, sel0("Show", [["todo", "To review"], ["flag", "Flagged by the checker"], ["approved", "Approved"], ["rejected", "Rejected"], ["all", "Everything"]], filter.status, v => { filter.status = v; }),
        sel0("Chapter", [[0, "All chapters"]].concat(course.kit.chapters.map(c => [c.n, c.n + ". " + c.name])), filter.chapter, v => { filter.chapter = +v; }),
        h("span", { class: "keys noprint" }, h("kbd", { text: "↑" }), " ", h("kbd", { text: "↓" }), " move · ", h("kbd", { text: "A" }), " approve · ", h("kbd", { text: "R" }), " reject · ", h("kbd", { text: "E" }), " edit · ", h("kbd", { text: "U" }), " back to review"))));
    const list = h("div", { class: "list", id: "revList", role: "listbox", "aria-label": "Items" }), detail = h("div", { class: "detail card", id: "revDetail" });
    let lastGrp = null;
    vis.forEach(i => { const it = items[i], grp = it.s + "|" + (it.topic || "");
      if (grp !== lastGrp) { lastGrp = grp; const ch = course.kit.chapters.find(c => c.n === it.s), group = vis.filter(k => items[k].s === it.s && (items[k].topic || "") === (it.topic || "")), clean = group.filter(k => items[k].status === "pending_review" && !hasError(k));
        list.append(h("div", { class: "grp" }, h("span", { text: (ch ? ch.n + ". " + ch.name : "Chapter " + it.s) + (it.topic ? " · " + it.topic : "") }),
          clean.length > 1 ? h("button", { type: "button", class: "btn ghost small", "data-topic": grp, onclick: () => approveTopic(clean, (ch ? ch.name : "") + (it.topic ? " · " + it.topic : "")) }, "Approve " + clean.length) : null)); }
      const fl = flagsOf(i);
      list.append(h("button", { type: "button", role: "option", "aria-current": String(i === sel), "data-i": i, onclick: () => { sel = i; editing = false; renderCourse(); } },
        h("span", { class: "q", text: it.type === "card" ? it.term : it.q }),
        h("span", { class: "meta" }, h("span", { class: "pill", text: TYPE[it.type] }), h("span", { class: "pill " + it.status, text: STATUS[it.status] }), fl.some(f => f.level === "error") ? h("span", { class: "pill error", text: "error" }) : fl.length ? h("span", { class: "pill warn", text: fl.length + " to check" }) : null))); });
    if (!vis.length) list.append(h("p", { class: "muted", text: filter.status === "todo" ? "Everything in this view is reviewed." : "No item in this view." })), list.lastChild.style.padding = "14px";
    put(root, h("div", { class: "review" }, list, detail));
    if (sel != null) (editing ? renderEdit : renderDetail)(detail, sel); else detail.append(h("p", { class: "muted", text: "Select an item on the left." }));
    const cur = list.querySelector("[aria-current=true]"); if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "nearest" });
  }
  const TYPE = { mcq: "Multiple choice", tf: "True / false", typed: "Typed answer", card: "Flashcard" }, STATUS = { pending_review: "To review", approved: "Approved", rejected: "Rejected" };
  function sourceBox(it) {
    const s = it.src;
    if (!s || (!s.file && !s.quote)) return h("div", { class: "source" }, h("b", { text: "No source" }), h("p", { class: "small", text: "This item does not say where it comes from. Add the file, the page and a short quote, or reject it." }));
    const pages = course.sources[s.file], text = pages && s.page != null ? pages[s.page] : null, box = h("div", { class: "source" }, h("b", { text: "Source: " + (s.file || "?") + (s.page != null ? ", page " + s.page : "") }), s.quote ? h("blockquote", { text: "“" + s.quote + "”" }) : null);
    if (text && s.quote) { const k = text.toLowerCase().indexOf(s.quote.toLowerCase());
      if (k >= 0) box.append(h("div", { class: "ctx" }, text.slice(Math.max(0, k - 220), k), h("mark", { text: text.slice(k, k + s.quote.length) }), text.slice(k + s.quote.length, k + s.quote.length + 220)));
      else box.append(h("p", { class: "small", text: "The quote was not found word for word on this page: check it." })); }
    else if (!pages) box.append(h("p", { class: "small muted", text: "This file is not in the course material, so the quote cannot be checked automatically." }));
    return box;
  }
  function renderDetail(root, i) {
    const it = course.kit.items[i], fl = flagsOf(i), ch = course.kit.chapters.find(c => c.n === it.s);
    put(root, h("div", { class: "row" }, h("span", { class: "pill", text: TYPE[it.type] }), h("span", { class: "pill " + it.status, id: "curStatus", text: STATUS[it.status] }),
      h("span", { class: "muted small", text: (ch ? ch.n + ". " + ch.name : "") + (it.topic ? " · " + it.topic : "") + (it.bloom ? " · " + it.bloom : "") + (it.difficulty ? " · level " + it.difficulty + "/3" : "") })),
      h("p", { class: "qtext", id: "curQ", text: it.type === "card" ? it.term : it.q }));
    if (it.type === "mcq") put(root, h("ul", { class: "opts" }, it.o.map((o, k) => h("li", { class: k === 0 ? "right" : "", text: o }))));
    if (it.type === "tf") put(root, h("ul", { class: "opts" }, h("li", { class: "right", text: it.v ? "True" : "False" })));
    if (it.type === "typed") put(root, h("ul", { class: "opts" }, h("li", { class: "right", text: it.a.join("  ·  ") })));
    if (it.type === "card") put(root, h("p", { text: it.def }));
    if (it.e) put(root, h("p", null, h("b", { text: "Explanation. " }), it.e));
    put(root, sourceBox(it));
    if (fl.length) put(root, h("ul", { class: "flags", id: "curFlags" }, fl.map(f => h("li", { class: f.level, text: (f.level === "error" ? "Must fix: " : "Check: ") + f.msg }))));
    if (it.i18n) put(root, h("p", { class: "muted small", text: "Also available in: " + Object.keys(it.i18n).join(", ").toUpperCase() + " (same item, same right answer)." }));
    put(root, h("div", { class: "row noprint" }, btn("Approve", () => setStatus(i, "approved"), "ok", { id: "actApprove", disabled: hasError(i) || it.status === "approved" }), btn("Reject", () => setStatus(i, "rejected"), "bad", { id: "actReject", disabled: it.status === "rejected" }),
      btn("Edit", () => { editing = true; renderCourse(); }, "ghost", { id: "actEdit" }), it.status !== "pending_review" ? btn("Back to review", () => setStatus(i, "pending_review"), "ghost small") : null,
      btn("Delete", () => { if (!confirm("Delete this item for good?")) return; course.kit.items.splice(i, 1); audit("delete", it.id, (it.q || it.term || "").slice(0, 80)); sel = null; save(); renderCourse(); }, "ghost small")));
    if (hasError(i)) put(root, h("p", { class: "small muted", text: "An item with an error cannot be approved: edit it or reject it." }));
    if (it.type !== "card") { const order = [2, 0, 3, 1];
      put(root, h("details", { class: "noprint" }, h("summary", { text: "Preview as a student" }), h("div", { class: "phone" }, h("p", null, h("b", { text: it.q })),
        it.type === "mcq" ? h("div", { class: "tiles" }, order.map(k => h("span", { text: it.o[k] }))) : it.type === "tf" ? h("div", { class: "tiles" }, h("span", { text: "True" }), h("span", { text: "False" })) : h("input", { type: "text", placeholder: "Type your answer", disabled: true })))); }
  }
  function setStatus(i, status) {
    const it = course.kit.items[i]; if (!it || it.status === status) return; if (status === "approved" && hasError(i)) return toast("Fix the error first.");
    it.status = status; audit(status === "approved" ? "approve" : status === "rejected" ? "reject" : "reopen", it.id, (it.q || it.term || "").slice(0, 80));
    const vis = visible(), k = vis.filter(x => x > i)[0]; if (filter.status === "todo") sel = k != null ? k : vis[0] != null ? vis[0] : null;
    save(); renderCourse();
  }
  function approveTopic(ids, label) {
    ids.forEach(i => { course.kit.items[i].status = "approved"; });
    audit("approve_topic", null, ids.length + " items approved together in " + label + ": " + ids.map(i => course.kit.items[i].id).join(","));
    sel = null; save(); renderCourse(); toast(ids.length + " items approved.");
  }
  function renderEdit(root, i) {
    const it = course.kit.items[i], f = (label, id, val, area) => h("label", { class: "field" }, h("span", { text: label }), area ? h("textarea", { id, rows: area }, val || "") : h("input", { id, type: "text", value: val == null ? "" : val }));
    const src = it.src || {}, files = Object.keys(course.sources);
    put(root, h("h2", { text: "Edit the item" }),
      it.type === "card" ? [f("Term", "edQ", it.term), f("Definition", "edDef", it.def, 3)] : f("Question", "edQ", it.q, 3),
      it.type === "mcq" ? [f("Right answer", "edO0", it.o[0]), f("Wrong answer 1", "edO1", it.o[1]), f("Wrong answer 2", "edO2", it.o[2]), f("Wrong answer 3", "edO3", it.o[3])] : null,
      it.type === "tf" ? h("label", { class: "field" }, h("span", { text: "The statement is" }), (() => { const s = h("select", { id: "edV" }, h("option", { value: "true" }, "True"), h("option", { value: "false" }, "False")); s.value = String(it.v); return s; })()) : null,
      it.type === "typed" ? f("Accepted answers, separated by |", "edA", it.a.join(" | ")) : null,
      it.type !== "card" ? f("Explanation (why it is right, and why the tempting wrong answer is wrong)", "edE", it.e, 3) : null,
      h("div", { class: "grid" },
        h("label", { class: "field" }, h("span", { text: "Chapter" }), (() => { const s = h("select", { id: "edS" }, course.kit.chapters.map(c => h("option", { value: c.n }, c.n + ". " + c.name))); s.value = String(it.s); return s; })()),
        f("Topic", "edT", it.topic),
        h("label", { class: "field" }, h("span", { text: "Level" }), (() => { const s = h("select", { id: "edB" }, h("option", { value: "" }, "Not set"), V.BLOOM.map(b => h("option", { value: b }, b))); s.value = it.bloom || ""; return s; })())),
      h("h3", { text: "Source" }),
      h("div", { class: "grid" }, h("label", { class: "field" }, h("span", { text: "File" }), h("input", { id: "edSF", type: "text", value: src.file || "", list: "edFiles" }), h("datalist", { id: "edFiles" }, files.map(n => h("option", { value: n })))), f("Page or slide", "edSP", src.page)),
      f("Short quote from the course", "edSQ", src.quote, 2),
      h("div", { class: "row" }, btn("Save", () => {
        const g = id => ($(id) ? $(id).value.trim() : ""), x = { ...it, s: +g("edS"), topic: g("edT"), bloom: g("edB"), src: { file: g("edSF"), page: g("edSP"), quote: g("edSQ") } };
        if (it.type === "card") { x.term = g("edQ"); x.def = g("edDef"); } else { x.q = g("edQ"); x.e = g("edE"); }
        if (it.type === "mcq") x.o = [g("edO0"), g("edO1"), g("edO2"), g("edO3")]; if (it.type === "tf") x.v = g("edV") === "true"; if (it.type === "typed") x.a = g("edA").split("|");
        const clean = K.cleanItem(x, { keepStatus: true }); clean.status = "pending_review";   // an edited item goes back to "to review": the approval must be for the final wording
        course.kit.items[i] = clean; audit("edit", clean.id, (clean.q || clean.term || "").slice(0, 80)); editing = false; save(); renderCourse(); }, "", { id: "edSave" }),
        btn("Cancel", () => { editing = false; renderCourse(); }, "ghost")));
    $("edQ").focus();
  }
  addEventListener("keydown", e => {
    if (!course || tab !== "review" || editing || e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ""))) return;
    const vis = visible(), k = vis.indexOf(sel), key = e.key.toLowerCase();
    if (key === "arrowdown" || key === "j") { if (k < vis.length - 1) { sel = vis[k + 1]; renderCourse(); } e.preventDefault(); }
    else if (key === "arrowup" || key === "k") { if (k > 0) { sel = vis[k - 1]; renderCourse(); } e.preventDefault(); }
    else if (sel == null) return;
    else if (key === "a") setStatus(sel, "approved"); else if (key === "r") setStatus(sel, "rejected"); else if (key === "u") setStatus(sel, "pending_review");
    else if (key === "e") { editing = true; renderCourse(); e.preventDefault(); }
  });

  // ---------- 4. publish and export ----------
  function tabPublish(root) {
    const items = course.kit.items, appr = items.filter(i => i.status === "approved"), pend = items.filter(i => i.status === "pending_review").length, pub = course.state === "published";
    const school = me.school.name, base = slug(course.title), opt = { approvedOnly: true, school }, link = location.origin + "/?course=" + (course.code || "") + (api.demo ? "&demo=1" : "");
    put(root, h("div", { class: "card" }, h("h2", { text: pub ? "Published to your students" : "Publish to your students" }),
      pub ? [h("p", { text: "Students open the link or type the course code. Only verified " + school + " addresses can open it." }),
        h("p", null, h("span", { class: "codebox", id: "courseCode", text: course.code })), h("p", { class: "small" }, h("a", { href: link, id: "courseLink", text: link })),
        h("div", { class: "row" }, btn("Copy the link", () => { try { navigator.clipboard.writeText(link); toast("Link copied."); } catch (e) { toast(link); } }, "ghost"),
          appr.length !== Object.keys((course.published || {}).keys || {}).length + ((course.published || {}).facts || []).length ? btn("Publish the latest approved version", () => setState("published"), "", { id: "republish" }) : null,
          btn("Unpublish now", () => { if (confirm("Students will lose access at once. Unpublish?")) setState("in_review"); }, "bad", { id: "unpublish" }))]
        : [h("p", { class: "muted", text: appr.length + " approved item" + (appr.length === 1 ? "" : "s") + " will be published. " + (pend ? pend + " still to review will stay hidden until you approve them." : "") }),
          btn("Publish " + appr.length + " approved items", () => setState("published"), "", { id: "publish", disabled: !appr.length })],
      h("label", { class: "field", style: "max-width:260px;margin-top:14px" }, h("span", { text: "Students enrolled in this course" }), h("input", { type: "number", id: "enrolled", min: 1, max: 5000, value: course.enrolled || "", onchange: e => { course.enrolled = Math.max(0, parseInt(e.target.value, 10) || 0) || null; audit("enrolled", null, String(course.enrolled)); save(); } })),
      h("p", { class: "muted small", text: "Used only to compute the activation rate (students who tried it, out of those enrolled)." })));
    const bp = K.examBlueprint(course.kit);
    put(root, h("div", { class: "card" }, h("h2", { text: "Download your kit" }),
      h("p", { class: "muted", text: "Approved items only. Each file carries the notice: “" + K.LICENCE(school) + "”" }),
      h("div", { class: "row" }, btn("Question bank with answers (PDF)", () => printPage(K.bankHtml(course.kit, opt)), "ghost", { id: "expBank", disabled: !appr.length }),
        btn("Practice test without answers (PDF)", () => printPage(K.bankHtml(course.kit, { ...opt, answers: false })), "ghost", { disabled: !appr.length }),
        btn("Revision sheets for students (PDF)", () => printPage(K.sheetHtml(course.kit, opt)), "ghost", { disabled: !appr.length }),
        btn("Moodle GIFT", () => download(base + ".gift.txt", K.toGift(course.kit, opt)), "ghost", { id: "expGift", disabled: !appr.length }),
        btn("Moodle XML", () => download(base + ".moodle.xml", K.toMoodleXml(course.kit, opt), "application/xml;charset=utf-8"), "ghost", { id: "expXml", disabled: !appr.length }),
        btn("Spreadsheet (CSV)", () => download(base + ".csv", K.toCsv(course.kit, opt), "text/csv;charset=utf-8"), "ghost", { id: "expCsv", disabled: !appr.length })),
      h("p", { class: "muted small", text: "PDF: the page opens ready to print; choose “Save as PDF”. Moodle: Question bank → Import → GIFT or Moodle XML; chapters arrive as categories." })),
      // what a student can play: they pick 5, 10, 15, 20, 30 or all questions among the approved ones of the chapters they select
      (() => { const play = appr.filter(i => i.type !== "card"), chs = (course.kit.chapters || []).map(c => { const it = play.filter(i => i.s === c.n); return { c, n: it.length, typed: it.filter(i => i.type === "typed").length }; });
        const thin = chs.filter(x => x.n < 5);
        return h("div", { class: "card", id: "playable" }, h("h2", { text: "What students can play" }),
          h("p", { class: "muted", text: play.length + " approved question" + (play.length === 1 ? "" : "s") + ". Students choose the length of each game themselves (5, 10, 15, 20, 30 or all), among the chapters they select; questions they have not seen yet come first." }),
          h("div", { class: "scroll" }, h("table", { id: "playTable" }, h("thead", null, h("tr", null, h("th", { text: "Chapter" }), h("th", { class: "num", text: "Questions" }), h("th", { class: "num", text: "of which typed answer" }))),
            h("tbody", null, chs.map(x => h("tr", { "data-ch": String(x.c.n) }, h("td", { text: x.c.n + ". " + (x.c.name || "") }), h("td", { class: "num", text: String(x.n) }), h("td", { class: "num", text: String(x.typed) })))))),
          thin.length ? h("p", { class: "small", id: "playThin", text: (thin.length === 1 ? "Chapter " + thin[0].c.n + " has" : "Chapters " + thin.map(x => x.c.n).join(", ") + " have") + " fewer than 5 approved questions: a student who revises " + (thin.length === 1 ? "it" : "one of them") + " alone gets a very short game. Approve or add a few more if you want it to stand on its own." }) : null); })(),
      h("div", { class: "card" }, h("h2", { text: "Mock exam" }), bp.n ? [h("p", { text: bp.n + " questions in " + bp.minutes + " minutes, weighted like the approved bank:" }),
        h("ul", null, bp.chapters.map(c => h("li", { text: c.n + ". " + c.name + ": " + c.questions + " question" + (c.questions === 1 ? "" : "s") }))),
        h("p", { class: "muted small", text: "Students start it from “Exam mode” on the course page; the practice test above is the paper version." })] : h("p", { class: "muted", text: "Approve some questions first." })));
  }
  async function setState(state) {
    await save(true);
    try { const c = await api.setState(course.id, state, course.kit); course = { ...course, ...c, kit: course.kit, sources: course.sources }; toast(state === "published" ? "Published." : "Unpublished."); }
    catch (e) { toast(e.message === "nothing_approved" ? "Approve at least one item first." : "Could not change the state: " + e.message); }
    course = await api.getCourse(course.id); renderCourse();
  }

  // ---------- 5 and 6. class insight and pilot report ----------
  async function insight() { const st = await api.stats(course.id); return { st, r: st.hidden ? { tooFew: true, students: st.students || 0, minStudents: IN.MIN_STUDENTS, reports: { open: 0, fixed: 0, dismissed: 0 }, contentAccuracy: null } : IN.compute(st.rows, course.kit, null, { enrolled: course.enrolled, reports: st.reports, survey: st.survey }) }; }
  const kpi = (v, label, id) => h("div", { class: "kpi" }, h("b", { id, text: v }), h("span", { text: label }));
  const meter = v => { const m = h("span", { class: "meter" + (v < 0.6 ? " low" : "") }, h("i")); m.firstChild.style.width = Math.round(v * 100) + "%"; return m; };
  async function tabInsight(root) {
    put(root, h("p", { class: "muted", text: "Loading…" }));
    const { st, r } = await insight(); root.replaceChildren();
    put(root, h("p", { class: "muted small", text: "Aggregate and anonymous: a student is a random number, never a name. No figure is shown for fewer than " + r.minStudents + " students." }));
    if (r.tooFew) { put(root, h("div", { class: "card", id: "tooFew" }, h("h2", { text: "Not enough students yet" }), h("p", { text: (r.students || 0) + " student" + (r.students === 1 ? " has" : "s have") + " played so far. Figures appear from " + r.minStudents + " students, so that nobody can be recognised." }))); return reportsCard(root, st); }
    put(root, h("div", { class: "kpis" }, kpi(r.students + (r.enrolled ? " / " + r.enrolled : ""), r.enrolled ? "students activated (" + pct(r.activation) + ")" : "students who played", "kStudents"), kpi(String(r.weeklyActive), "active this week"), kpi(r.sessionsPerStudent.toFixed(1), "sessions per student"), kpi(pct(r.accuracy), "correct answers (" + r.answers.toLocaleString("en") + " answers)", "kAccuracy")));
    if (r.reexplain.length) put(root, h("div", { class: "card", id: "reexplain" }, h("h2", { text: "What to re-explain next lecture" }), h("ol", null, r.reexplain.map(t => h("li", null, h("b", { text: t.chapter + (t.topic ? ": " + t.topic : "") }), " — " + pct(t.accuracy) + " correct over " + t.answers + " answers." + (t.example ? " Typical miss: “" + t.example + "”" : "") + (t.topWrong ? " Most chosen wrong answer: “" + t.topWrong + "”." : ""))))));
    const max = Math.max(1, ...r.weeks.map(w => w.active));
    put(root, h("div", { class: "card" }, h("h2", { text: "Students active each week" }), h("div", { class: "bars", role: "img", "aria-label": "Students active per week: " + r.weeks.map(w => w.week + " " + w.active).join(", ") }, r.weeks.map(w => { const i = h("i"); i.style.height = Math.round(w.active / max * 100) + "%"; return h("div", null, h("span", { text: w.active }), i, h("span", { text: w.week.slice(5) })); }))));
    put(root, h("div", { class: "card" }, h("h2", { text: "Accuracy by topic" }), h("div", { class: "scroll" }, h("table", { id: "topicTable" }, h("thead", null, h("tr", null, h("th", { text: "Chapter" }), h("th", { text: "Topic" }), h("th", { text: "Correct" }), h("th", { class: "num", text: "Answers" }), h("th", { class: "num", text: "Students" }))),
      h("tbody", null, r.topics.map(t => h("tr", null, h("td", { text: t.chapter }), h("td", { text: t.topic || "—" }), h("td", null, meter(t.accuracy), pct(t.accuracy)), h("td", { class: "num", text: t.answers }), h("td", { class: "num", text: t.students }))))))));
    put(root, h("div", { class: "card" }, h("h2", { text: "The 10 hardest questions" }), h("div", { class: "scroll" }, h("table", { id: "hardTable" }, h("thead", null, h("tr", null, h("th", { text: "Question" }), h("th", { class: "num", text: "Missed" }), h("th", { text: "Most chosen wrong answer" }))),
      h("tbody", null, r.hardest.map(q => h("tr", null, h("td", { text: q.q }), h("td", { class: "num", text: pct(q.errorRate) + " of " + q.answers }), h("td", { text: q.topWrong ? q.topWrong.text + " (" + pct(q.topWrong.share) + " of misses)" : "—" }))))))));
    reportsCard(root, st);
    put(root, h("div", { class: "row noprint" }, btn("Print the weekly digest (PDF)", () => window.print(), "ghost")));
  }
  function reportsCard(root, st) {
    const open = (st.reports || []).filter(x => x.status === "open");
    put(root, h("div", { class: "card", id: "reports" }, h("h2", { text: "Questions reported by students" }), open.length ? h("ul", { class: "files" }, open.map(rp => { const i = course.kit.items.findIndex(x => x.id === rp.item), it = course.kit.items[i];
      return h("li", null, h("b", { text: it ? (it.q || it.term) : "(item no longer in the kit)" }), h("span", { class: "pill warn", text: rp.reason || "reported" }),
        it ? btn("Open", () => { filter = { status: "all", chapter: 0 }; sel = i; location.hash = "#/c/" + course.id + "/review"; }, "ghost small") : null,
        btn("Corrected", async () => { await api.setReport(course.id, rp.id, "fixed"); renderCourse(); }, "ghost small"), btn("Nothing wrong", async () => { await api.setReport(course.id, rp.id, "dismissed"); renderCourse(); }, "ghost small")); }))
      : h("p", { class: "muted", text: "No open report." })));
  }
  async function tabPilot(root) {
    put(root, h("p", { class: "muted", text: "Loading…" }));
    const { r } = await insight(), lines = IN.kpis(r), tgt = { activation: "≥ 60%", weekly: "≥ 50%", gain: "≥ +10 points", accuracy: "≥ 95%", satisfaction: "≥ 4 / 5" }; root.replaceChildren();
    put(root, h("div", { class: "card" }, h("h2", { text: "Pilot success criteria" }), h("p", { class: "muted", text: "Computed from this course's data as of " + date(new Date().toISOString()) + ". " + (r.tooFew ? "Fewer than " + r.minStudents + " students so far: student figures are not shown yet." : "") }),
      h("div", { class: "scroll" }, h("table", { id: "kpiTable" }, h("thead", null, h("tr", null, h("th", { text: "Criterion" }), h("th", { text: "Result" }), h("th", { text: "Target" }), h("th", { text: "Status" }), h("th", { text: "How it is measured" }))),
        h("tbody", null, lines.map(l => h("tr", { "data-kpi": l.id }, h("td", null, h("b", { text: l.label })), h("td", { text: l.show }), h("td", { text: tgt[l.id] }), h("td", null, h("span", { class: "pill " + l.status, text: { met: "Met", below: "Below target", "no-data": "Not enough data" }[l.status] })), h("td", { class: "small muted", text: l.how })))))),
      r.gainWeak ? h("p", { class: "small", text: "On questions missed the first time, " + pct(r.gainWeak.recovered) + " were answered correctly at the latest attempt (" + r.gainWeak.pairs + " cases, " + r.gainWeak.students + " students)." }) : null,
      h("div", { class: "row noprint" }, btn("Print this report (PDF)", () => window.print(), "ghost"))));
  }
  function tabLog(root) {
    const L = { create: "Course created", upload: "Material added", remove_file: "Material removed", import: "Kit imported", approve: "Approved", reject: "Rejected", reopen: "Sent back to review", edit: "Edited", delete: "Deleted", approve_topic: "Topic approved", publish: "Published", unpublish: "Unpublished", archive: "Archived", enrolled: "Enrolled students set", report_fixed: "Report: corrected", report_dismissed: "Report: nothing wrong" };
    const byId = {}; course.kit.items.forEach(i => { byId[i.id] = i; });
    put(root, h("div", { class: "card" }, h("h2", { text: "Activity log" }), h("p", { class: "muted", text: "Who did what, and when. Entries cannot be edited. This is the record behind “professors review and approve”." }),
      h("div", { class: "row noprint" }, btn("Download (CSV)", () => download(slug(course.title) + "-log.csv", "﻿when,who,action,item,detail\r\n" + course.audit.map(a => [a.at, a.by, a.action, a.item || "", a.detail || ""].map(v => '"' + String(v).replace(/"/g, '""') + '"').join(",")).join("\r\n")), "ghost small")),
      h("div", { class: "scroll" }, h("table", { id: "logTable" }, h("thead", null, h("tr", null, h("th", { text: "When" }), h("th", { text: "Who" }), h("th", { text: "Action" }), h("th", { text: "Item or detail" }))),
        h("tbody", null, course.audit.slice().reverse().slice(0, 400).map(a => h("tr", null, h("td", { class: "small", text: date(a.at) }), h("td", { class: "small", text: a.by }), h("td", { text: L[a.action] || a.action }), h("td", { class: "small", text: a.detail || (byId[a.item] ? (byId[a.item].q || byId[a.item].term) : a.item || "") }))))))));
  }

  $("demoReset").onclick = async () => { if (!api || !api.reset) return; await api.reset(); course = null; location.hash = "#/"; renderCourses(); toast("Demo reset to its starting point."); };
  start();
})();
