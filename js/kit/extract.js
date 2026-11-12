// Reads a course file in the professor's browser and returns its text page by page (or slide by slide), so that every question can cite where it comes from.
// Nothing is uploaded by this file. PDF (pdf.js, loaded on demand), PowerPoint .pptx and Word .docx (unzipped here), .txt / .md, and pasted notes.
//   QwebboExtract.file(File) -> { name, kind, unit:"page"|"slide"|"part", pages:{ "1":"text", ... }, chars, warnings:[] }
(function () {
  "use strict";
  const MAX_FILE = 20 * 1024 * 1024, MAX_PAGES = 400, MAX_CHARS = 600000, PART = 2500;
  const tidy = s => String(s).replace(/­/g, "").replace(/[ \t ]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim();

  // ---- zip (pptx, docx): read the central directory, inflate the entries we need with the browser's own decompressor ----
  async function unzip(buf, want) {
    const v = new DataView(buf), u8 = new Uint8Array(buf), out = {}; let eocd = -1;
    for (let i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 66000); i--) if (v.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    if (eocd < 0) throw new Error("not_zip");
    const n = v.getUint16(eocd + 10, true); let p = v.getUint32(eocd + 16, true);
    for (let k = 0; k < n && p + 46 <= buf.byteLength; k++) {
      if (v.getUint32(p, true) !== 0x02014b50) break;
      const method = v.getUint16(p + 10, true), csize = v.getUint32(p + 20, true), usize = v.getUint32(p + 24, true), nl = v.getUint16(p + 28, true), el = v.getUint16(p + 30, true), cl = v.getUint16(p + 32, true), off = v.getUint32(p + 42, true);
      const name = new TextDecoder().decode(u8.subarray(p + 46, p + 46 + nl)); p += 46 + nl + el + cl;
      if (!want(name) || usize > 30e6) continue;
      const lnl = v.getUint16(off + 26, true), lel = v.getUint16(off + 28, true), data = u8.subarray(off + 30 + lnl + lel, off + 30 + lnl + lel + csize);
      if (method === 0) out[name] = new TextDecoder().decode(data);
      else if (method === 8) out[name] = await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).text();
    }
    return out;
  }
  const xmlText = s => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
  async function pptx(buf) {
    const files = await unzip(buf, n => /^ppt\/slides\/slide\d+\.xml$/.test(n)), pages = {};
    Object.keys(files).sort((a, b) => +a.match(/(\d+)\.xml/)[1] - +b.match(/(\d+)\.xml/)[1]).forEach(n => {
      const paras = files[n].split(/<\/a:p>/).map(p => (p.match(/<a:t>([^<]*)<\/a:t>/g) || []).map(t => xmlText(t.replace(/<\/?a:t>/g, ""))).join("")).filter(x => x.trim());
      pages[+n.match(/(\d+)\.xml/)[1]] = tidy(paras.join("\n")); });
    return { unit: "slide", pages };
  }
  function parts(text) {   // text without pages: cut into parts of about 2,500 characters at paragraph ends, so a source can still say "part 3"
    const pages = {}; let n = 1, cur = "";
    tidy(text).split(/\n/).forEach(par => { if (cur.length + par.length > PART && cur) { pages[n++] = cur.trim(); cur = ""; } cur += par + "\n"; });
    if (cur.trim()) pages[n] = cur.trim();
    return pages;
  }
  async function docx(buf) {
    const files = await unzip(buf, n => n === "word/document.xml"), x = files["word/document.xml"]; if (!x) throw new Error("not_docx");
    const text = x.split(/<\/w:p>/).map(p => (p.match(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>|<w:tab\/>|<w:br\/>/g) || []).map(t => (t[3] === "t" && t[4] !== "a" ? xmlText(t.replace(/<[^>]+>/g, "")) : " ")).join("")).join("\n");
    return { unit: "part", pages: parts(text) };
  }
  let pdfjs = null;
  async function pdf(buf) {
    if (!pdfjs) { pdfjs = await import(new URL("js/vendor/pdfjs/pdf.min.mjs", document.baseURI).href); pdfjs.GlobalWorkerOptions.workerSrc = new URL("js/vendor/pdfjs/pdf.worker.min.mjs", document.baseURI).href; }
    const doc = await pdfjs.getDocument({ data: new Uint8Array(buf), isEvalSupported: false, disableFontFace: true }).promise, pages = {}, warnings = [];
    const n = Math.min(doc.numPages, MAX_PAGES); if (doc.numPages > MAX_PAGES) warnings.push("Only the first " + MAX_PAGES + " pages were read.");
    for (let i = 1; i <= n; i++) { const tc = await (await doc.getPage(i)).getTextContent(); let t = "", lastY = null;
      tc.items.forEach(it => { if (!("str" in it)) return; const y = it.transform ? it.transform[5] : null; if (lastY != null && y != null && Math.abs(y - lastY) > 2) t += "\n"; else if (t && !/\s$/.test(t) && !/^\s/.test(it.str)) t += " "; t += it.str; if (it.hasEOL) t += "\n"; lastY = y; });
      pages[i] = tidy(t); }
    try { doc.destroy(); } catch (e) {}
    return { unit: "page", pages, warnings };
  }
  async function file(f) {
    if (f.size > MAX_FILE) throw new Error("too_big");
    const ext = (/\.([a-z0-9]+)$/i.exec(f.name) || [, ""])[1].toLowerCase(), buf = await f.arrayBuffer(); let r;
    if (ext === "pdf") r = await pdf(buf);
    else if (ext === "pptx") r = await pptx(buf);
    else if (ext === "docx") r = await docx(buf);
    else if (["txt", "md", "markdown", "text"].indexOf(ext) >= 0 || /^text\//.test(f.type)) r = { unit: "part", pages: parts(new TextDecoder().decode(buf)) };
    else throw new Error("unsupported");
    return finish(f.name, ext, r);
  }
  function finish(name, kind, r) {
    const warnings = r.warnings || []; let chars = 0; const pages = {};
    Object.keys(r.pages).forEach(k => { if (chars >= MAX_CHARS) return; const t = r.pages[k].slice(0, MAX_CHARS - chars); chars += t.length; if (t) pages[k] = t; });
    if (chars >= MAX_CHARS) warnings.push("The file is very long: only the first " + MAX_CHARS.toLocaleString("en") + " characters were kept.");
    if (!chars) warnings.push(kind === "pdf" ? "No text found: this PDF is probably a scan (images). Export it with text, or paste the notes." : "No text found in this file.");
    return { name: String(name).slice(0, 160), kind, unit: r.unit, pages, chars, warnings };
  }
  const text = (name, t) => finish(name || "Pasted notes", "text", { unit: "part", pages: parts(t) });
  window.QwebboExtract = { file, text, MAX_FILE, ACCEPT: ".pdf,.pptx,.docx,.txt,.md" };
})();
