# Kit format

A kit is what a professor reviews: questions, flashcards and their sources. One format for hand-made kits and AI drafts. Code: `js/kit/format.js` (read, write, convert), `js/kit/validate.js` (checks).

## JSON

```json
{
  "v": 1,
  "title": "Financial Accounting II",
  "subject": "BBA 2",
  "lang": "en",
  "chapters": [{ "n": 3, "name": "Equity method" }],
  "items": [
    { "type": "mcq", "s": 3, "topic": "Equity method", "bloom": "apply", "difficulty": 2,
      "q": "A parent holds 30% of an associate that reports a 200k profit. What does the parent recognise under the equity method?",
      "o": ["60k as share of profit, added to the investment", "200k added to consolidated revenue", "60k as dividend income", "Nothing until dividends are paid"],
      "e": "The investor recognises its 30% share of the profit in income and in the carrying amount of the investment; dividends reduce the investment instead of creating income.",
      "src": { "file": "compta2-ch3.pdf", "page": 14, "quote": "the investor's share of the investee's profit or loss is recognised" },
      "i18n": { "es": { "q": "…", "o": ["…", "…", "…", "…"], "e": "…" } } },
    { "type": "tf", "s": 3, "q": "Dividends received from an associate are income.", "v": false, "e": "They reduce the carrying amount of the investment.", "src": { "file": "compta2-ch3.pdf", "page": 15, "quote": "…" } },
    { "type": "typed", "s": 3, "q": "From what percentage is significant influence presumed?", "a": ["20", "20%"], "e": "…", "src": { "file": "…", "page": 3, "quote": "…" } },
    { "type": "card", "s": 3, "term": "Associate", "def": "An entity over which the investor has significant influence.", "src": { "file": "…", "page": 3, "quote": "…" } }
  ]
}
```

Rules:

- `type`: `mcq` (exactly 4 options, **the first one is the right answer**; the game shuffles them), `tf` (`v` true or false), `typed` (`a` = accepted answers, main one first), `card` (flashcard: `term`, `def`).
- `s`: chapter number. `topic`: short label. `bloom`: `remember`, `understand` or `apply` (apply covers analysis). `difficulty`: 1 to 3.
- `e`: explanation in one to three sentences: why the answer is right and why the most tempting wrong answer is wrong.
- `src`: file name, page or slide number, and a short quote copied from the course. When the file is in the course material, the checker looks for the quote on that page.
- `i18n`: other languages of the **same** item. The right option stays first, so two languages cannot disagree on the answer.
- `status`: `pending_review`, `approved` or `rejected`. An imported item always starts as `pending_review`.

## CSV

Header line, then one item per line. Columns (any order): `type, chapter, topic, question, answer, wrong1, wrong2, wrong3, explanation, bloom, difficulty, source_file, source_page, source_quote`. For `typed`, separate accepted answers with `|`. For `card`, `question` is the term and `answer` the definition. Commas, semicolons or tabs are accepted. A template is downloadable from the "Study kit" tab.

## Pasted list

```
Ch: 3

1. Which statement defines goodwill?
* The excess of the price over the fair value of net assets
- The book value of net assets
- The cash paid
- A liability to the seller
E: Goodwill is what is paid above the fair value of what is acquired.
S: slides-ch2.pdf p.14 "the excess of the consideration transferred"

Goodwill is amortised over ten years.
A: false
E: It is tested for impairment each year.

Associate :: An entity over which the investor has significant influence
```

## Moodle

GIFT and Moodle XML are read (multiple choice with one right answer, true/false, short answer) and written. Other question kinds are listed as skipped.

## Checks

Errors (block approval): wrong shape, not exactly 4 options, two identical options, empty answer, unknown chapter, same question and same answer twice, bad `bloom` or `difficulty`, missing explanation (new kits).
Advice (shown to the professor, never hidden): right answer much longer than the others, "all of the above", answer visible in the question, no source, no page, quote not found on its page, near-duplicate, long typed answer, only one accepted spelling.

Command line: `node tools/check-kit.js` checks every built-in quiz in every language (`-v` lists the advice).

## What students receive

`QwebboKit.toBank(kit)` keeps approved items only and produces the shape the game already plays (`{sess, mcq, tf, typed, facts}`), with the source appended to each explanation and `noExpand: true`, so the game does not make up extra questions from the flashcards.
