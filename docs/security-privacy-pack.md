# qwebbo: security and privacy pack

For a school's IT, security and data-protection teams. Status on 12 November 2026.
This page separates what is **in place today**, what is **built and waiting to be switched on**, and what is **not done yet**. Nothing here is a legal commitment: commitments go into the contract and its data-protection annex.

## 1. Summary

| Question | Answer |
|---|---|
| What is qwebbo? | A web application (no install) where students practise quizzes built from their own courses, and where professors review the content and see class-level results. |
| Where does the data live? | A managed Postgres database (Supabase) in the EU, region `eu-west-3` (Paris). The website and a small API are served by Vercel. |
| What personal data is processed? | For a student account: an email address and a display name. For a professor: an email address. Play statistics are attached to a random device number, not to a name or an email. |
| Who can open a school's course? | Only accounts whose school email address has been verified by a one-time code, limited to two devices per account. |
| What do professors see about students? | Aggregate figures only. No name, no email, and no figure at all when fewer than 5 students are concerned. |
| Is an AI provider involved? | Not in production today. If automatic generation is switched on, the provider is named in the annex first and course material is sent only for the courses the school authorised. |
| Can the school take its content out? | Yes. Approved kits export to PDF, Moodle question-bank formats (GIFT, Moodle XML) and CSV at any time. |

## 2. Architecture

- **Front end**: static files (HTML, CSS, JavaScript) served by Vercel. No tracking cookies, no advertising, no third-party analytics script.
- **API**: two small serverless functions on Vercel (`api/esade.js` serves the gated course banks, `api/home.js` the home page data).
- **Database**: Supabase Postgres, EU (Paris). The browser never queries tables directly for sensitive data: it calls server-side functions that check the caller's account token first.
- **Email**: one-time sign-in codes are sent through the email provider configured in Supabase. The provider is named in the annex.
- **Offline**: a service worker caches the application so a student can keep practising without network. School courses are not kept in that cache.

## 3. Data inventory

| Data | Why | Where | Who can read it |
|---|---|---|---|
| Student email, display name, avatar choice | Sign-in, progress saved across devices | `tpk_accounts` | The student; qwebbo administrators |
| Verified school email (flag) | Proves the right to open the school's courses | `tpk_accounts.esade_email` | qwebbo administrators |
| Device list (max. 2 per account) | Stops account sharing | account tables | qwebbo administrators |
| Play statistics: quiz, date, number of answers, right or wrong per question, wrong option chosen | Class insight, pilot report | `play_stats` | Professors of the course, **as aggregates only** |
| Player key in statistics | Counting distinct students | random number generated on the device, hashed per course | Nobody can turn it back into a person from the dashboard |
| Question reports ("this question is wrong") | Content correction | `question_reports` | Professors of the course; qwebbo |
| One-question satisfaction rating (1 to 5) | Pilot report | `course_survey` | Aggregate only |
| Course material uploaded by a professor | Building the kit | Text is extracted **in the professor's browser**; the original file is not stored on qwebbo servers today | The professor; staff of the same school |
| Kit (questions, answers, sources) and approval history | Publication, audit | `courses`, `course_audit` | Staff of the school; verified students see approved items only |
| Technical error log | Fixing bugs | `error_log` | qwebbo administrators |

Not collected: date of birth, student number, grades, location, contacts, payment data.

## 4. Access control

- Row-level security is enabled on every table of the database (checked on 12 November 2026: 18 tables out of 18).
- Students: sign in with a 6-digit code sent to their email. A school course opens only when the account's school address is verified and the device is one of the two allowed.
- Professors and school administrators: listed per school in `school_staff`. A professor sees only the courses of their own school. Every create, edit, approve, publish and unpublish action is written to an activity log (`course_audit`) that the application cannot edit.
- The rules above are tested: `npm run test:sql` runs 30 access checks against a local database (a student cannot read a draft, a professor cannot read another school, statistics stay hidden under 5 students, and so on).

## 5. Anonymity of class insight

- A student is represented by a random number created on the device, never by a name or an email.
- The dashboard refuses to show any statistic computed on fewer than 5 students (constant `MIN_STUDENTS` in `js/kit/insight.js`, and the same rule in the database function `prof_course_stats`).
- There is no per-student screen. A personal learning profile is a roadmap item and would be opt-in for each student.
- Limit to state honestly: in a very small group, a professor who knows who played on a given day could guess more than the dashboard shows. The 5-student floor reduces this; it does not make it impossible.

## 6. Sub-processors

| Provider | Role | Location of data |
|---|---|---|
| Supabase | Database, sign-in, email sending | EU, Paris (`eu-west-3`) |
| Vercel | Website hosting and two API functions | Global edge network; the functions hold no data |
| GitHub | Source code; encrypted nightly database backup, kept 30 days | United States |
| Email provider (configured in Supabase) | Delivery of sign-in codes | To be named in the annex |
| AI provider | None today | If enabled: named in the annex, with a commitment that course material is not used to train models |

## 7. Retention and deletion

| Item | Today | Proposed for the contract |
|---|---|---|
| Student account | Kept until deleted on request (by email) | Deleted within 30 days of a request, and at the end of the contract |
| Play statistics | Kept | Deleted or irreversibly aggregated 12 months after the end of the course |
| Course kits | Kept while the course exists | Returned (export) and deleted within 30 days of the end of the contract |
| Backups | 30 days | 30 days |

A self-service "delete my account" button does not exist yet (see section 9).

## 8. Security measures in place

- HTTPS everywhere; security headers on all pages (`nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`).
- The professor space has a strict Content-Security-Policy and does not build pages from raw HTML strings, so imported course text cannot inject script.
- Imports and exports neutralise spreadsheet formulas (CSV injection).
- Secrets (database keys, email credentials) live only in the Supabase and Vercel settings, never in the source code.
- Rate limits on writes (for example, play statistics are capped per hour) and a nickname filter.
- Nightly database backup with a documented restore procedure (`docs/restauration.md`).
- Automated tests on every change: end-to-end tests, a content validator on every question bank (`npm run check`), and the SQL access tests.

## 9. Known gaps and plan

| Gap | Risk | Plan |
|---|---|---|
| The source repository is public, and it contains the school course banks | Anyone can read the course questions | Make the repository private (owner action, one click) |
| The school gate is temporarily open in production (`ESADE_OPEN = true`) | School quizzes can be opened without signing in | Set back to `false` once code delivery by email is verified on phones |
| No Content-Security-Policy on the main student site yet | Less defence in depth against script injection | Add after replacing the remaining inline handlers; the professor space already has one |
| No self-service account deletion | Deletion depends on a manual request | Add a button and a database function before the pilot |
| The professor-space database migration is not applied in production yet | The professor space runs in demo mode only | Owner runs `supabase/migrations/add_professor_space.sql` |
| No external penetration test | Unknown unknowns | Offer the school's security team a test window before the pilot |
| One maintainer | Continuity | Export rights from day one; continuity terms in the contract |
| Capacity | The statistics write limit is global (6,000 rows per hour) | Raise and make it per course before a cohort above about 500 students plays at the same time |

## 10. Incident handling

- Detection: error log, Supabase and Vercel alerts.
- Containment: the school gate and each course can be closed immediately (unpublish takes effect at once); account tokens can be revoked.
- Notification: the school's contact is informed without undue delay and at the latest within 72 hours of qwebbo becoming aware of a personal-data breach, with the facts known at that time.

## 11. What the data-protection annex should fix

1. Roles: the school as controller, qwebbo as processor, for student and professor data.
2. The list of sub-processors and how changes are notified.
3. Retention periods and the deletion procedure at the end of the contract.
4. Whether an AI provider is used, for which courses, and the no-training commitment.
5. Security measures (this page) and the right to audit.
6. Breach notification and contact points on both sides.
7. Transfers outside the EU (source code host, backups) and their safeguards.
