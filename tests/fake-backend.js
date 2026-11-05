// A small shared fake Supabase for tests that need TWO browsers talking to each other
// (multiplayer) or a server that remembers things (online progress save).
// The data lives in Node; every browser context calls into the same store.
const { FAKE_SUPABASE } = require("./helpers");

function makeStore() {
  const db = { games: [], players: [] };
  const accounts = {}; // username -> { password, rev, data }
  const tokens = {};   // token -> username
  const now = () => new Date().toISOString();
  const clone = x => JSON.parse(JSON.stringify(x));
  const match = (r, f) => f.every(([k, v, kind]) => (kind === "in" ? v.includes(r[k]) : r[k] === v));

  function run(d) {
    const tb = db[d.t] || (db[d.t] = []);
    if (d.op === "insert") {
      const r = { created_at: now(), updated_at: now(), ...clone(d.row) };
      if (d.t === "games" && tb.some(x => x.code === r.code)) return { data: null, error: { code: "23505", message: "dup" } };
      tb.push(r);
      return { data: null, error: null };
    }
    const rows = tb.filter(r => match(r, d.f));
    if (d.op === "update") { rows.forEach(r => Object.assign(r, clone(d.patch), { updated_at: now() })); return { data: null, error: null }; }
    const out = clone(rows);
    return { data: d.one ? out[0] || null : out, error: null };
  }

  function rpc(fn, a) {
    const ok = data => ({ data, error: null });
    if (fn === "tpk_signup") {
      if (accounts[a.p_username]) return ok({ error: "name_taken" });
      accounts[a.p_username] = { password: a.p_password, rev: 1, data: clone(a.p_data) };
      const tok = "t" + Object.keys(tokens).length; tokens[tok] = a.p_username;
      return ok({ username: a.p_username, token: tok, rev: 1 });
    }
    if (fn === "tpk_login") {
      const acc = accounts[a.p_username];
      if (!acc || acc.password !== a.p_password) return ok({ error: "bad_login" });
      const tok = "t" + Object.keys(tokens).length; tokens[tok] = a.p_username;
      return ok({ username: a.p_username, token: tok, rev: acc.rev, data: clone(acc.data) });
    }
    if (fn === "tpk_auth_login") {   // Supabase Auth user (email) -> the usual account + token
      const key = "auth:" + a.__email;
      let created = false;
      if (!accounts[key]) { accounts[key] = { password: null, rev: 1, data: clone(a.p_data || {}) }; created = true; }
      const tok = "t" + Object.keys(tokens).length; tokens[tok] = key;
      return ok(created ? { username: a.__email, token: tok, rev: 1, created: true } : { username: a.__email, token: tok, rev: accounts[key].rev, data: clone(accounts[key].data) });
    }
    if (fn === "tpk_push" || fn === "tpk_pull") {
      const u = tokens[a.p_token]; if (!u) return ok({ error: "bad_token" });
      const acc = accounts[u];
      if (fn === "tpk_pull") return ok({ username: u, rev: acc.rev, data: clone(acc.data) });
      if (a.p_rev !== acc.rev) return ok({ conflict: true, rev: acc.rev, data: clone(acc.data) });
      acc.data = clone(a.p_data); acc.rev++;
      return ok({ rev: acc.rev });
    }
    return { data: [], error: null };
  }
  return { db, accounts, run, rpc };
}

// Browser side: the same fake supabase-js, but every call is forwarded to the Node store.
const REMOTE_SUPABASE = `
(function () {
  function Q(t) { this.d = { t: t, op: "select", f: [], one: false }; }
  Q.prototype.select = function () { return this; };
  Q.prototype.eq = function (k, v) { this.d.f.push([k, v, "eq"]); return this; };
  Q.prototype.in = function (k, v) { this.d.f.push([k, v, "in"]); return this; };
  ["gt", "lt", "neq", "order", "limit"].forEach(function (m) { Q.prototype[m] = function () { return this; }; });
  Q.prototype.maybeSingle = function () { this.d.one = true; return this; };
  Q.prototype.insert = function (row) { this.d.op = "insert"; this.d.row = row; return this; };
  Q.prototype.update = function (p) { this.d.op = "update"; this.d.patch = p; return this; };
  Q.prototype.then = function (res, rej) { return window.__sbRun(this.d).then(res, rej); };
  var chan = { on: function () { return chan; }, subscribe: function () { return chan; } };
  window.supabase = { createClient: function () { return {
    from: function (t) { return new Q(t); },
    rpc: function (fn, args) { return window.__sbRpc(fn, Object.assign({ __email: window.__authEmail }, args || {})); },
    channel: function () { return chan; }, removeChannel: function () {},
    auth: window.__fakeAuth ? window.__fakeAuth() : { getSession: async function () { return { data: { session: null } }; } } }; } };
})();
`;

// Plug a browser context into the store (call before opening pages).
async function connect(context, store) {
  await context.exposeFunction("__sbRun", async d => store.run(d));
  await context.exposeFunction("__sbRpc", async (fn, a) => store.rpc(fn, a));
}

// Like helpers.openSite, but with the shared fake backend.
async function openShared(page, { path = "/", storage = {} } = {}) {
  const { expect } = require("@playwright/test");
  storage = { "qwebbo-esade": JSON.stringify({ e: "student@esade.edu" }), ...storage };   // an ESADE-verified student, see helpers.openSite
  await page.route(/\/api\/esade\?/, route => route.continue({ headers: { ...route.request().headers(), authorization: "Bearer e2e-esade-token-0000000000" } }));
  await page.route(/^https?:\/\/(?!localhost)/, route => {
    const url = route.request().url();
    if (/supabase-js/.test(url)) return route.fulfill({ contentType: "text/javascript", body: REMOTE_SUPABASE });
    if (/fonts\.googleapis/.test(url)) return route.fulfill({ contentType: "text/css", body: "" });
    return route.abort();
  });
  await page.addInitScript(items => {
    if (!sessionStorage.getItem("__e2e_init")) {
      sessionStorage.setItem("__e2e_init", "1");
      for (const [k, v] of Object.entries(items)) localStorage.setItem(k, v);
    }
  }, storage);
  await page.goto(path);
  await expect(page.locator("#quizGrid .qcard").first()).toBeAttached();
}

module.exports = { makeStore, connect, openShared, FAKE_SUPABASE };
