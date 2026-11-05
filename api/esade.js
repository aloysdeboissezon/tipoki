// Serves the ESADE quizzes (questions, study sheet, PDF) to ESADE-verified accounts only.
// The files live in api/_esade/, which is NOT a public folder: the only way to read them is this function, and it first asks Supabase
// whether the account behind the sign-in token has a verified ESADE email (SQL function esade_status, see supabase/migrations/add_esade_access.sql).
//   GET /api/esade?k=bank|sheet|pdf&id=<quiz id>      header: Authorization: Bearer <account token>
//   200 the file · 401 no or expired token · 403 account without a verified ESADE email · 404 unknown file · 503 Supabase unreachable
const fs = require("fs");
const path = require("path");

const SB_URL = process.env.SUPABASE_URL || "https://eowcxqqkewijzgemqbhi.supabase.co";
const SB_KEY = process.env.SUPABASE_ANON_KEY || "sb_publishable_WYtzPauL3s0sPu_Vvj0iOQ_uUTg1uW7";   // the public (publishable) key, same one the website uses
const DIR = path.join(__dirname, "_esade");
const KINDS = { bank: ["banks", "js", "text/javascript; charset=utf-8"], sheet: ["sheets", "js", "text/javascript; charset=utf-8"], pdf: ["pdf", "pdf", "application/pdf"] };

// asks the database: "ok" | "bad_token" | "not_esade"; throws when Supabase can't be reached
async function checkWithSupabase(token) {
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 6000);
  try {
    const r = await fetch(SB_URL + "/rest/v1/rpc/esade_status", {
      method: "POST", signal: ctl.signal,
      headers: { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ p_token: token }),
    });
    const body = await r.json().catch(() => null);
    if (r.ok && body && body.verified === true) return "ok";
    if (r.ok && body) return "not_esade";
    if (body && /bad_token/.test(String(body.message || ""))) return "bad_token";
    throw new Error("supabase " + r.status);
  } finally { clearTimeout(timer); }
}

function createHandler({ check = checkWithSupabase, dir = DIR } = {}) {
  return async (req, res) => {
    const send = (code, type, body) => {
      res.statusCode = code;
      res.setHeader("Content-Type", type);
      res.setHeader("Cache-Control", "private, no-store");   // never kept by a shared cache
      res.end(body);
    };
    const err = (code, msg) => send(code, "application/json", JSON.stringify({ error: msg }));
    if (req.method !== "GET") return err(405, "method");
    const u = new URL(req.url, "http://x"), kind = KINDS[u.searchParams.get("k")], id = u.searchParams.get("id") || "";
    const m = /^Bearer ([A-Za-z0-9._-]{16,200})$/.exec(String(req.headers.authorization || ""));
    if (!kind || !/^[a-z0-9]{1,30}$/.test(id)) return err(404, "not_found");
    if (!m) return err(401, "login");
    let verdict;
    try { verdict = await check(m[1]); } catch (e) { return err(503, "unavailable"); }
    if (verdict === "bad_token") return err(401, "login");
    if (verdict !== "ok") return err(403, "esade_only");
    let buf;
    try { buf = fs.readFileSync(path.join(dir, kind[0], id + ".js")); } catch (e) { return err(404, "not_found"); }
    if (kind[1] === "pdf") buf = Buffer.from(String(require(path.join(dir, "pdf", id + ".js"))), "base64");
    send(200, kind[2], buf);
  };
}

module.exports = createHandler();
module.exports.createHandler = createHandler;
