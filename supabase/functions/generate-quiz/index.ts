// Turns a course (PDF or text) into a Tipoki quiz with Claude, stores it in public.quizzes and returns its id.
// The response body is streamed: whitespace heartbeats while Claude works, then one JSON object ({id} or {error}).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js@2";

const MODEL = "claude-opus-5-5";
const MAX_PDF_B64 = 28_000_000; // ~20 MB file
const MAX_TEXT = 200_000;
const PER_IP_PER_HOUR = 6;
const GLOBAL_PER_DAY = 300;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const str = { type: "string" };
const int = { type: "integer" };
const obj = (properties: Record<string, unknown>) => ({
  type: "object",
  properties,
  required: Object.keys(properties),
  additionalProperties: false,
});
const arr = (items: unknown) => ({ type: "array", items });

const SCHEMA = obj({
  title: str,
  subject: str,
  lang: { type: "string", enum: ["fr", "en", "es", "de", "it", "pt", "other"] },
  sections: arr(obj({ n: int, name: str })),
  facts: arr(obj({ s: int, cat: str, kind: { type: "string", enum: ["c", "p"] }, term: str, def: str, aliases: arr(str) })),
  mcq: arr(obj({ s: int, t: str, q: str, o: arr(str), e: str })),
  tf: arr(obj({ s: int, q: str, v: { type: "boolean" }, e: str })),
  typed: arr(obj({ s: int, q: str, a: arr(str), e: str })),
});

const SYSTEM = `You turn a student's course material into a revision quiz for Tipoki, a multiplayer quiz game students play with friends before exams.

Write everything in the language of the course itself. Only use what the course says: never invent facts, dates or names that are not in the material.

Output a JSON object:
- title: short quiz name (reuse the student's title if given), subject: the course/subject name.
- lang: language code of the course.
- sections: the course's chapters/sessions/parts, numbered from 1 (n) with a short name. Use 1 section if the material has no clear structure; at most 12.
- facts: the key concepts (kind "c") and key people/works/authors (kind "p") a student must know, each with a one-sentence definition (def) of at most 160 characters that does not contain the term itself. s = section number, cat = a short theme label shared by related facts (used to pick believable wrong answers), aliases = accepted alternative spellings or names of the term (may be empty). Aim for 25 to 80 facts depending on how dense the material is, and at least 4 of each kind you use.
- mcq: 15 to 40 multiple-choice questions focused on understanding and application (scenarios, comparisons, causes, examples), not just definitions. Exactly 4 options in o, and o[0] MUST be the correct answer (the game shuffles them). Wrong options must be plausible and clearly wrong. t = a 1-3 word topic tag, e = a short explanation of the right answer.
- tf: 8 to 20 true/false statements, v = true or false, roughly half false, e = short explanation.
- typed: 8 to 25 short-answer questions whose answer is a single term or name of 1-4 words; a = accepted answers (main answer first, then variants). e = short explanation.
Every s must refer to an existing section number.`;

function jsonOut(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
}

function clean(d: any) {
  const S = new Set<number>((d.sections || []).map((x: any) => x.n));
  if (!S.size) { d.sections = [{ n: 1, name: d.subject || d.title }]; S.add(1); }
  const fix = (s: number) => (S.has(s) ? s : [...S][0]);
  const t = (x: unknown, n: number) => String(x ?? "").trim().slice(0, n);
  const facts = (d.facts || []).filter((f: any) => f.term && f.def).map((f: any) => ({
    s: fix(f.s), cat: t(f.cat, 40), kind: f.kind === "p" ? "p" : "c", term: t(f.term, 80), def: t(f.def, 240),
    aliases: (f.aliases || []).map((a: unknown) => t(a, 80)).filter(Boolean).slice(0, 5),
  }));
  const mcq = (d.mcq || []).filter((q: any) => q.q && Array.isArray(q.o) && q.o.length === 4 && new Set(q.o).size === 4)
    .map((q: any) => ({ s: fix(q.s), t: t(q.t, 30), q: t(q.q, 400), o: q.o.map((o: unknown) => t(o, 200)), e: t(q.e, 400) }));
  const tf = (d.tf || []).filter((q: any) => q.q).map((q: any) => ({ s: fix(q.s), q: t(q.q, 300), v: !!q.v, e: t(q.e, 300) }));
  const typed = (d.typed || []).filter((q: any) => q.q && q.a?.length)
    .map((q: any) => ({ s: fix(q.s), q: t(q.q, 300), a: q.a.map((a: unknown) => t(a, 80)).filter(Boolean).slice(0, 6), e: t(q.e, 300) }));
  const sess: Record<number, string> = {};
  for (const x of d.sections) sess[x.n] = t(x.name, 80);
  return { sess, facts, mcq, tf, typed };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return jsonOut({ error: "Méthode non autorisée" }, 405);

  let body: { title?: string; text?: string; pdf?: string };
  try { body = await req.json(); } catch { return jsonOut({ error: "Requête invalide." }, 400); }
  const title = String(body.title || "").trim().slice(0, 60);
  const text = typeof body.text === "string" ? body.text.slice(0, MAX_TEXT) : "";
  const pdf = typeof body.pdf === "string" ? body.pdf : "";
  if (!pdf && text.trim().length < 200) return jsonOut({ error: "Ajoute un PDF ou au moins quelques paragraphes de cours." }, 400);
  if (pdf.length > MAX_PDF_B64) return jsonOut({ error: "Fichier trop lourd (20 Mo max)." }, 413);

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const hourAgo = new Date(Date.now() - 3600e3).toISOString(), dayAgo = new Date(Date.now() - 86400e3).toISOString();
  const [{ count: mine }, { count: all }] = await Promise.all([
    db.from("gen_log").select("id", { count: "exact", head: true }).eq("ip", ip).gt("created_at", hourAgo),
    db.from("gen_log").select("id", { count: "exact", head: true }).gt("created_at", dayAgo),
  ]);
  if ((mine ?? 0) >= PER_IP_PER_HOUR) return jsonOut({ error: "Tu as généré beaucoup de quiz d'un coup, réessaie dans une heure." }, 429);
  if ((all ?? 0) >= GLOBAL_PER_DAY) return jsonOut({ error: "Trop de demandes aujourd'hui, réessaie demain." }, 429);
  const { data: logRow } = await db.from("gen_log").insert({ ip }).select("id").single();

  const content: any[] = [];
  if (pdf) content.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: pdf } });
  if (text) content.push({ type: "text", text: `<course>\n${text}\n</course>` });
  content.push({ type: "text", text: `Make the quiz for this course.${title ? ` The student named it: "${title}".` : ""}` });

  const enc = new TextEncoder();
  const stream = new ReadableStream({
    async start(ctrl) {
      const beat = setInterval(() => ctrl.enqueue(enc.encode(" ")), 5000);
      const finish = (o: unknown) => { clearInterval(beat); ctrl.enqueue(enc.encode(JSON.stringify(o))); ctrl.close(); };
      try {
        const client = new Anthropic();
        const msg = await client.beta.messages.stream({
          model: MODEL,
          max_tokens: 32000,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          system: SYSTEM,
          output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
          messages: [{ role: "user", content }],
        } as any).finalMessage();
        await db.from("gen_log").update({ input_tokens: msg.usage.input_tokens, output_tokens: msg.usage.output_tokens }).eq("id", logRow?.id);
        if (msg.stop_reason === "refusal") return finish({ error: "Ce contenu n'a pas pu être transformé en quiz." });
        if (msg.stop_reason === "max_tokens") return finish({ error: "Cours trop long d'un coup, essaie avec moins de chapitres." });
        const txt = msg.content.filter((b: any) => b.type === "text").map((b: any) => b.text).join("");
        const raw = JSON.parse(txt);
        const data = clean(raw);
        const n = data.mcq.length + data.tf.length + data.typed.length + data.facts.length;
        if (n < 10) return finish({ error: "Pas assez de matière pour faire un quiz. Ajoute plus de contenu." });
        const { data: row, error } = await db.from("quizzes").insert({
          title: (title || String(raw.title || "Mon quiz")).slice(0, 80),
          subject: String(raw.subject || "").slice(0, 120),
          lang: raw.lang === "other" ? "en" : raw.lang,
          data,
          source_chars: pdf ? pdf.length : text.length,
        }).select("id").single();
        if (error) throw error;
        await db.from("gen_log").update({ ok: true }).eq("id", logRow?.id);
        finish({ id: row.id });
      } catch (e) {
        console.error(e);
        finish({ error: "La génération a échoué, réessaie dans un instant." });
      }
    },
  });
  return new Response(stream, { headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" } });
});
