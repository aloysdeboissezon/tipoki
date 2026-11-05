// Serves the home page (index.html) with the link-preview tags (title, description, og:*, twitter:*) written in the language asked for by ?lang=xx.
// Why: WhatsApp, Instagram, iMessage... read the page WITHOUT running JavaScript, so the in-page translation (js/i18n*.js) never reaches a link preview.
// vercel.json sends "/?...&lang=ko" here; people get exactly the same page as before (the app still translates itself), only the <head> text differs.
// Unknown or missing language -> English (= the file as it is). Keep the texts equal to the ones in js/i18n*.js (a test checks it).
const fs = require("fs");
const path = require("path");

const TEXTS = {
  en: { title: "qwebbo – Quizzes and flashcards from your course notes", desc: "qwebbo turns your course notes into quizzes and flashcards. Study solo, play live with friends, and prepare your exams.", locale: "en_US" },
  fr: { title: "qwebbo – Quiz et flashcards à partir de tes cours", desc: "qwebbo transforme tes cours en quiz et flashcards. Révise seul, joue en direct avec tes amis et prépare tes examens.", locale: "fr_FR" },
  es: { title: "qwebbo – Quizzes y flashcards a partir de tus apuntes", desc: "qwebbo convierte tus apuntes en quizzes y flashcards. Estudia solo, juega en directo con tus amigos y prepara tus exámenes.", locale: "es_ES" },
  ko: { title: "qwebbo – 내 노트로 만드는 퀴즈와 플래시카드", desc: "qwebbo는 수업 노트를 퀴즈와 플래시카드로 바꿔줘요. 혼자 공부하고, 친구들과 실시간으로 플레이하고, 시험을 준비하세요.", locale: "ko_KR" },
};

const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// the page with its head texts in `lang` (English file returned untouched for "en" / unknown)
function render(html, lang) {
  const t = Object.prototype.hasOwnProperty.call(TEXTS, lang) ? TEXTS[lang] : null;
  if (!t || lang === "en") return html;
  const meta = (attr, name, val) => new RegExp('(<meta ' + attr + '="' + name + '" content=")[^"]*(")');
  return html
    .replace(/<title>[^<]*<\/title>/, () => "<title>" + esc(t.title) + "</title>")
    .replace(meta("name", "description"), (_, a, b) => a + esc(t.desc) + b)
    .replace(meta("property", "og:title"), (_, a, b) => a + esc(t.title) + b)
    .replace(meta("property", "og:description"), (_, a, b) => a + esc(t.desc) + b)
    .replace(meta("name", "twitter:title"), (_, a, b) => a + esc(t.title) + b)
    .replace('<meta name="twitter:card"', () => '<meta property="og:locale" content="' + t.locale + '">\n<meta name="twitter:description" content="' + esc(t.desc) + '">\n<meta name="twitter:card"')
    .replace('<html lang="en">', () => '<html lang="' + lang + '">');
}

function createHandler(file) {
  return (req, res) => {
    let lang = "en";
    try { lang = (new URL(req.url, "http://x").searchParams.get("lang") || "en").toLowerCase().slice(0, 2); } catch (e) {}
    fs.readFile(file, "utf8", (err, html) => {
      if (err) { res.statusCode = 500; res.end("error"); return; }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
      res.setHeader("Vary", "Accept-Encoding");
      res.end(render(html, lang));
    });
  };
}

module.exports = createHandler(path.join(__dirname, "..", "index.html"));
module.exports.createHandler = createHandler;
module.exports.render = render;
module.exports.TEXTS = TEXTS;
