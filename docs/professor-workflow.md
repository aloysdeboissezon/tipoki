# The professor workflow

One sentence: a professor uploads a course, receives a study kit in which every item cites its page, reviews and approves it, publishes it to the students of the school, and sees where the class struggles.

Code: `prof.html`, `js/prof/`, `js/kit/`, `js/course.js`, `supabase/migrations/add_professor_space.sql`. Tests: `tests/professor-loop.spec.js`, `tests/kit.spec.js`, `tools/test-professor-sql.sh`.

## Screens (prof.html)

| Step | What the professor does | What the product guarantees |
|---|---|---|
| 1. Course material | Drops PDF, .pptx, .docx or text files (20 MB per file, 10 files, 600,000 characters per course), or pastes notes. | The text is read in the browser, page by page or slide by slide. The original file is not stored: only its text is kept with the course. |
| 2. Study kit | Imports a kit (Qwebbo JSON, CSV, Moodle GIFT, Moodle XML, pasted list). AI drafting is a second way into the same screen. | Every item arrives as "to review", whatever the file says. |
| 3. Review | Reads each item beside its source quote, shown in the context of the page. Keyboard: arrows, A approve, R reject, E edit, U back to review. Approves a whole topic in one click. | An item with an error cannot be approved. An edited item goes back to "to review". A progress bar shows "37 / 120 reviewed". |
| 4. Publish & export | Publishes the approved items; gets a 6-character course code and a link. Unpublishes in one click. Downloads the bank (PDF with answers and sources, practice test, revision sheets, CSV, GIFT, Moodle XML). | Only approved items are published and exported. Each export carries the licence notice. |
| 5. Class insight | Sees activation, weekly activity, accuracy by topic, the 10 hardest questions with the most chosen wrong answer, student reports, and "what to re-explain next lecture". | Aggregate only. No figure below 5 students. No name: a student is a random number hashed per course. |
| 6. Pilot report | Reads the five success criteria of the pilot, each with its method. | Computed from the course's own data by `js/kit/insight.js`, the same code in demo and in production. |
| Activity log | Reads and downloads who did what and when. | Written by the server (time and author cannot be forged from the browser), never edited. |

## States of a course

`draft` → (first items) → `in_review` → (publish) → `published` → (unpublish) → `in_review`; any state → `archived`. `generating` is reserved for AI drafting.

## Data model

- `schools(id, name)`; `esade_domains(domain, school)` lists the email domains of each school. A second school is two inserts.
- `school_staff(school, email, role)`: professor or admin. The role is never deduced from the email domain, because students share it.
- `courses(id, school, owner, title, subject, lang, state, code, enrolled, kit, sources, published, keymaps)`. `kit` is the full kit with every status. `published` is the frozen copy that students play. `keymaps` remembers, for each publication, which game key was which item, so statistics stay right when the kit changes.
- `course_audit(course, at, by_email, action, item, detail)`: append-only.
- `play_stats` (existing) gets a column `w` (wrong option picked). `question_reports` gets a `status`. `course_survey` holds the one-question survey.

All tables are closed to the public API (row-level security on, no policy). The site calls functions that check the caller every time.

## Permissions

| Who | Can |
|---|---|
| Anyone | Ask which course is behind a code (gets an id, nothing else). |
| Account without a verified school email | Nothing: the course is refused. |
| Verified email of the school (student) | Open the published copy of a course of that school. |
| Listed professor | Create courses; read, edit, publish and see the statistics of their own courses. |
| School admin | The same for every course of the school. |
| Qwebbo (database owner) | Add schools and staff. No screen for it yet: two SQL inserts. |

## Failure cases

| Case | Behaviour |
|---|---|
| Scanned PDF (no text) | "No text found: this PDF is probably a scan." The file is not added. |
| File too large, unknown type, damaged | A clear message; the other files continue. |
| Import with unsupported question kinds (matching, essay, numerical) | They are listed as skipped, never guessed. |
| Quote not found on its page | The item is flagged "check", and shown to the professor. |
| Item with an error (two identical options, no answer...) | Cannot be approved. |
| Saving fails (network) | "Not saved" is shown; the changes and their log entries are sent again at the next save. |
| Fewer than 5 students | The dashboard says so and shows no student figure. |
| Student without a verified school email | A message asks to sign in with the school email; the course content never reaches the browser. |
| Course unpublished | The code stops working at once. |

## What ESADE IT will ask

- **Where is the course material?** Only extracted text, in the EU database (Supabase, Paris region), in the professor's course row, readable by the professor and the school admin through checked functions.
- **Who can see student data?** Nobody sees individual students. The professor sees aggregates from 5 students.
- **Is AI used?** Not by default. AI drafting is off until the school enables it in its agreement; when on, the course text is sent to the AI provider for drafting only (see `docs/security-privacy-pack.md`).
- **Can we leave with our content?** Yes: PDF, CSV and Moodle exports at any time.
- **Single sign-on, Moodle?** Today: email code on a school address, and Moodle import files. LTI 1.3 is designed below, not built.

## Moodle

Exports follow the GIFT format and Moodle XML: chapters become categories under `$course$/top/Qwebbo/<course>/<chapter>`, multiple choice is single-answer with shuffled answers, the explanation and the source go to the general feedback, tags carry topic, level and difficulty. Round-trip tests read the exports back (`tests/kit.spec.js`). They have not yet been imported into a live Moodle site: do this once with ESADE's Moodle version before the pilot.

### LTI 1.3 (roadmap, not built)

1. ESADE's Moodle registers Qwebbo as an external tool (issuer, client id, deployment id, Qwebbo's public keys at a JWKS URL).
2. A student clicks the activity: Moodle starts an OpenID Connect launch; Qwebbo verifies the signed `id_token` and reads the course context and the role (Instructor or Learner).
3. Qwebbo opens the matching course without another sign-in; the role claim replaces `school_staff` for that launch.
4. Grade passback (Assignment and Grade Services) returns a completion score per student. This is the first feature that needs named student data, so it requires a data-protection review and is opt-in per course.

Size: L (a server-side function for the launch and key handling, a mapping table Moodle course ↔ Qwebbo course, a privacy review).

## AI drafting (designed, behind its switch)

Same road as an import. The edge function receives the page-numbered text, drafts items chapter by chapter in the kit format with a source for each, then a second pass checks every quote against the text and drops items whose quote is not found. Items land as "to review". Cost limits per professor and per day; the model is a setting. It stays off until Aloys approves the spend and the school enables it.

## Not built yet

- Storing the original files (private bucket with access rules): today only the text is kept.
- A screen to manage schools and staff.
- The interface of the professor space in Spanish and Catalan (English only today).
- LTI 1.3, grade passback.
