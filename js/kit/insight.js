// Class insight for a course: every number of the faculty dashboard and of the pilot KPI report is computed here, from anonymous play rows.
// Runs in the browser (professor space, demo mode) and in Node (tests). No name ever enters this file: a student is a random id hashed per course.
//
// rows    = [{ player, at (ISO date), game, mode, n, correct, qs:{ "m3":1, "t0":0 }, w:{ "m3":2 } }]   one row per finished game per device; w = wrong option picked (optional)
// bank    = QwebboKit.toBank(kit)  (bank.keys maps "m3" -> item id), or null when the keys of qs are already item ids; kit = the course kit
// study   = opts.study = [{ player, at, kind: quiz|exam|cards|sheet, secs, n }]   one row per study session (time spent); quizzes and exams also have their row in rows (mode solo|multi|review|exam)
// opts    = { enrolled, study, reports:[{item, status:"open"|"fixed"|"dismissed"}], survey:[1..5], now, minStudents }
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.QwebboInsight = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const MIN_STUDENTS = 5;          // no statistic is shown for fewer students than this: one student must never be recognisable
  const TARGETS = { activation: 0.6, weekly: 0.5, gain: 0.1, accuracy: 0.95, satisfaction: 4 };   // the pilot's success criteria
  const WEEK = 7 * 864e5;
  const CLASS_MINUTES = 50;        // default length of one "class hour" used to express the study time of the class (the professor can change it)
  const weekOf = t => { const d = new Date(t); const day = (d.getUTCDay() + 6) % 7; return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day); };   // Monday 00:00 UTC
  const pct = (a, b) => (b ? a / b : null);

  function compute(rows, kit, bank, opts) {
    opts = opts || {}; rows = (rows || []).filter(r => r && r.player && r.qs).slice().sort((a, b) => new Date(a.at) - new Date(b.at));
    const min = opts.minStudents || MIN_STUDENTS, players = new Set(rows.map(r => r.player)), students = players.size;
    const published = kit.items.filter(i => i.status === "approved"), byId = {}; kit.items.forEach(i => { byId[i.id] = i; });
    const out = { students, enrolled: opts.enrolled || null, minStudents: min, tooFew: students < min, items: published.length, targets: TARGETS };
    // content accuracy after review does not depend on students: share of published items with no confirmed error
    const reports = opts.reports || [], confirmed = new Set(reports.filter(r => r.status === "fixed").map(r => r.item));
    out.reports = { open: reports.filter(r => r.status === "open").length, fixed: reports.filter(r => r.status === "fixed").length, dismissed: reports.filter(r => r.status === "dismissed").length };
    out.contentAccuracy = published.length ? 1 - confirmed.size / published.length : null;
    if (out.tooFew) return out;

    const games = new Set(rows.map(r => r.game || r.player + r.at));
    let answers = 0, correct = 0;
    const perQ = {}, firstSeen = {}, activeByWeek = {}, pairs = {};
    rows.forEach(r => { const t = +new Date(r.at), wk = weekOf(t);
      (activeByWeek[wk] = activeByWeek[wk] || new Set()).add(r.player);
      if (firstSeen[r.player] == null) firstSeen[r.player] = t;
      Object.keys(r.qs).forEach(k => { const ok = +r.qs[k] === 1, id = bank && bank.keys ? bank.keys[k] : k;   // without a bank, the rows already use item ids
        if (!id || !byId[id] || byId[id].status !== "approved") return;   // answers to items that were unpublished since are left out
        answers++; if (ok) correct++;
        const q = perQ[id] || (perQ[id] = { n: 0, wrong: 0, players: new Set(), picks: {} }); q.n++; if (!ok) q.wrong++; q.players.add(r.player);
        if (!ok && r.w && r.w[k] != null) q.picks[r.w[k]] = (q.picks[r.w[k]] || 0) + 1;
        const p = pairs[r.player + "|" + id] || (pairs[r.player + "|" + id] = { player: r.player, first: ok, last: ok, n: 0 }); p.last = ok; p.n++; }); });
    out.games = games.size; out.answers = answers; out.accuracy = pct(correct, answers);
    out.sessionsPerStudent = games.size / students;
    out.activation = opts.enrolled ? Math.min(1, students / opts.enrolled) : null;

    // weekly engagement: for each full week after a student's first week, did the student come back? Average of (students active that week) / (students who had started before it).
    const now = +new Date(opts.now || Date.now()), weeks = Object.keys(activeByWeek).map(Number).sort((a, b) => a - b), series = [];
    if (weeks.length) for (let w = weeks[0]; w <= weekOf(now); w += WEEK) {
      const started = [...players].filter(p => weekOf(firstSeen[p]) < w), act = activeByWeek[w] || new Set();
      series.push({ week: new Date(w).toISOString().slice(0, 10), active: act.size, base: started.length, back: started.filter(p => act.has(p)).length, full: w + WEEK <= now });
    }
    out.weeks = series;
    const scored = series.filter(s => s.base >= min && s.full);
    out.weeklyEngagement = scored.length ? scored.reduce((a, s) => a + s.back / s.base, 0) / scored.length : null;
    out.weeklyActive = series.length ? series[series.length - 1].active : 0;

    out.activity = activity(rows, opts.study || []);

    // accuracy by topic (chapter, then topic), weakest first
    const topics = {};
    Object.keys(perQ).forEach(id => { const it = byId[id], ch = kit.chapters.find(c => c.n === it.s), key = it.s + "|" + (it.topic || "");
      const t = topics[key] || (topics[key] = { s: it.s, chapter: ch ? ch.name : "Chapter " + it.s, topic: it.topic || "", n: 0, wrong: 0, players: new Set() });
      t.n += perQ[id].n; t.wrong += perQ[id].wrong; perQ[id].players.forEach(p => t.players.add(p)); });
    out.topics = Object.values(topics).filter(t => t.players.size >= min).map(t => ({ s: t.s, chapter: t.chapter, topic: t.topic, answers: t.n, accuracy: 1 - t.wrong / t.n, students: t.players.size })).sort((a, b) => a.accuracy - b.accuracy);

    // the 10 hardest questions (at least `min` different students answered), with the wrong answer picked most often when the game recorded it
    out.hardest = Object.keys(perQ).filter(id => perQ[id].players.size >= min).map(id => { const q = perQ[id], it = byId[id];
      const top = Object.keys(q.picks).sort((a, b) => q.picks[b] - q.picks[a])[0];
      return { id, q: it.q, type: it.type, s: it.s, topic: it.topic || "", answers: q.n, students: q.players.size, errorRate: q.wrong / q.n,
        topWrong: top != null && it.type === "mcq" && it.o[top] ? { text: it.o[top], share: q.picks[top] / q.wrong } : null }; })
      .sort((a, b) => b.errorRate - a.errorRate || b.answers - a.answers).slice(0, 10);

    // learning gain: same student, same question, first answer against latest answer (only questions seen at least twice)
    const seenTwice = Object.values(pairs).filter(p => p.n >= 2), gp = new Set(seenTwice.map(p => p.player));
    out.gain = gp.size >= min ? { students: gp.size, pairs: seenTwice.length, first: seenTwice.filter(p => p.first).length / seenTwice.length, last: seenTwice.filter(p => p.last).length / seenTwice.length } : null;
    if (out.gain) out.gain.points = out.gain.last - out.gain.first;
    const weak = seenTwice.filter(p => !p.first), wp = new Set(weak.map(p => p.player));   // "weak" = missed the first time
    out.gainWeak = wp.size >= min ? { students: wp.size, pairs: weak.length, recovered: weak.filter(p => p.last).length / weak.length } : null;

    const sv = (opts.survey || []).map(Number).filter(v => v >= 1 && v <= 5);
    out.satisfaction = sv.length >= min ? { n: sv.length, mean: sv.reduce((a, v) => a + v, 0) / sv.length, happy: sv.filter(v => v >= 4).length / sv.length } : { n: sv.length, mean: null };

    // "what to re-explain next lecture": the weakest topics with enough answers, each with its hardest question
    out.reexplain = out.topics.filter(t => t.accuracy < 0.7 && t.answers >= 15).slice(0, 3).map(t => { const h = out.hardest.find(q => q.s === t.s && q.topic === t.topic);
      return { chapter: t.chapter, topic: t.topic, accuracy: t.accuracy, answers: t.answers, example: h ? h.q : null, topWrong: h && h.topWrong ? h.topWrong.text : null }; });
    return out;
  }

  // What the class did, by kind of activity, and the same per anonymous student (numbered by first activity, never a name).
  // quiz = solo, multiplayer and mistake-review games; exam = exam mode; cards = flashcard rounds; sheet = study sheet read in the app.
  const KINDS = ["cards", "sheet", "quiz", "exam"];
  function activity(rows, study) {
    const per = {}, tot = {}, order = [];
    const who = p => { if (!per[p]) { per[p] = { id: order.length + 1, secs: 0, last: 0 }; KINDS.forEach(k => { per[p][k] = { sessions: 0, secs: 0, n: 0, answers: 0, correct: 0 }; }); order.push(p); } return per[p]; };
    KINDS.forEach(k => { tot[k] = { students: new Set(), sessions: 0, secs: 0, n: 0, answers: 0, correct: 0 }; });
    const add = (p, k, d, t) => { const s = who(p)[k], g = tot[k]; s.sessions += d.sessions || 0; s.secs += d.secs || 0; s.n += d.n || 0; s.answers += d.answers || 0; s.correct += d.correct || 0;
      g.sessions += d.sessions || 0; g.secs += d.secs || 0; g.n += d.n || 0; g.answers += d.answers || 0; g.correct += d.correct || 0; g.students.add(p); per[p].last = Math.max(per[p].last, t); };
    const seen = new Set();
    rows.forEach(r => { const k = r.mode === "exam" ? "exam" : "quiz", t = +new Date(r.at), key = k + "|" + r.player + "|" + (r.game || r.at);
      if (seen.has(key)) return; seen.add(key); add(r.player, k, { sessions: 1, answers: r.n || 0, correct: r.correct || 0 }, t); });
    let tracked = false;
    study.forEach(x => { if (!x || !x.player || KINDS.indexOf(x.kind) < 0) return; tracked = true; const secs = Math.max(0, Math.min(7200, +x.secs || 0));
      // cards and sheets have no play row: each study row is one session; quizzes and exams already counted their sessions above
      add(x.player, x.kind, { secs, n: x.n || 0, sessions: x.kind === "cards" || x.kind === "sheet" ? 1 : 0 }, +new Date(x.at)); per[x.player].secs += secs; });
    const kinds = {}; let secs = 0;
    KINDS.forEach(k => { const g = tot[k]; secs += g.secs; kinds[k] = { students: g.students.size, sessions: g.sessions, secs: g.secs, cards: g.n, accuracy: g.answers ? g.correct / g.answers : null }; });
    const students = order.map(p => { const s = per[p], o = { id: s.id, secs: s.secs, last: s.last ? new Date(s.last).toISOString() : null };
      KINDS.forEach(k => { o[k] = { sessions: s[k].sessions, secs: s[k].secs, cards: s[k].n, accuracy: s[k].answers ? s[k].correct / s[k].answers : null }; }); return o; })
      .sort((a, b) => b.secs - a.secs || b.id - a.id).slice(0, 200);
    return { tracked, kinds, secs, students, perStudentSecs: order.length ? secs / order.length : 0, listed: students.length, total: order.length };
  }
  // seconds -> "1 h 05" / "12 min"; class hours = seconds / (minutes of one class hour * 60)
  const fmtDuration = secs => { const m = Math.round(secs / 60); return m < 60 ? m + " min" : Math.floor(m / 60) + " h " + String(m % 60).padStart(2, "0"); };
  const classHours = (secs, classMinutes) => secs / 60 / (classMinutes || CLASS_MINUTES);

  // The pilot's success criteria as five lines: value, target, met / not met / not enough data yet.
  function kpis(r) {
    const line = (id, label, value, target, show, how) => ({ id, label, value, target, show, how, status: value == null ? "no-data" : value >= target ? "met" : "below" });
    const p = v => (v == null ? "n/a" : Math.round(v * 100) + "%");
    return [
      line("activation", "Activation", r.tooFew ? null : r.activation, TARGETS.activation, r.tooFew || r.activation == null ? "n/a" : p(r.activation) + " (" + r.students + " of " + r.enrolled + ")", "Students who played at least once, out of the enrolled students entered by the professor."),
      line("weekly", "Weekly engagement", r.tooFew ? null : r.weeklyEngagement, TARGETS.weekly, r.tooFew ? "n/a" : p(r.weeklyEngagement), "Each full week: students who came back, out of the students who had already started. Average over the weeks."),
      line("gain", "Learning gain", r.tooFew || !r.gain ? null : r.gain.points, TARGETS.gain, r.tooFew || !r.gain ? "n/a" : (r.gain.points >= 0 ? "+" : "") + Math.round(r.gain.points * 100) + " points (" + p(r.gain.first) + " → " + p(r.gain.last) + ")", "Same student, same question: first answer against latest answer, for questions seen at least twice."),
      line("accuracy", "Content accuracy after review", r.contentAccuracy, TARGETS.accuracy, p(r.contentAccuracy), "Published items with no error confirmed after a student report, out of all published items."),
      line("satisfaction", "Student satisfaction", r.tooFew || !r.satisfaction ? null : r.satisfaction.mean, TARGETS.satisfaction, r.tooFew || !r.satisfaction || r.satisfaction.mean == null ? "n/a" : r.satisfaction.mean.toFixed(1) + " / 5 (" + r.satisfaction.n + " answers)", "One question after a game: “Did this help you revise?” from 1 to 5."),
    ];
  }
  return { compute, kpis, fmtDuration, classHours, MIN_STUDENTS, TARGETS, CLASS_MINUTES, KINDS };
});
