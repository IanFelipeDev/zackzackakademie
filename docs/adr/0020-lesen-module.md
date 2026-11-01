# ADR-0020: Lesen module (reading simulators, content in code)

- Status: Accepted
- Date: 2026-11-01

## Context

The teacher provided self-contained HTML Lesen simulators for Goethe A1 (4 simulados, 15 questions each: two
Richtig/Falsch parts and an A/B website-matching part) and Goethe B2 (4 simulados, 30 questions each: person
matching A–D, gap sentences A–H, a/b/c multiple choice, "Wer sagt was?" A–F, and headline matching A–H). They are
auto-graded in the browser with a fixed answer key and a pass threshold (A1 ≥ 9/15, B2 ≥ 18/30), the same shape as
the flashcards and grammar-game prototypes.

As with the games (ADR-0018), the raw HTML cannot be embedded: the strict CSP blocks its inline scripts, it uses a
different visual language, and it has no CEFR gating.

## Decision

- **A new presentation-first `reading` feature**, ported to React like `games`: a `domain` layer (the exam model,
  grading, and the per-level content) and a `presentation` layer (the page, the exam runner and a
  `localStorage`-backed progress hook). No `application`/`infrastructure`, no container, no database — the
  simulators have no backend.

- **Content lives in code and is generated, not hand-written.** `domain/content/a1.ts` and `b2.ts` are produced by
  `scratchpad/gen-reading.cjs`, which reads the teacher's HTML, evaluates the data-only `SIMS` array in an isolated
  `vm`, and emits the typed `ReadingExam[]` (faithful texts, questions and answer keys). A domain test validates the
  whole catalogue (contiguous numbering, every answer is an offered option, pass mark ≤ total, unique ids). This
  mirrors how the A1/A2 flashcards were seeded (generated, migration 0023).

- **A single exam model covers both levels.** A question is either inline `choices` (Richtig/Falsch, a/b/c, A/B) or
  a `select` of labels that refer to the part's texts or a shared option `bank` (matching A–H). Grading is one
  point per correct answer; the result shows the per-Teil breakdown and the full gabarito.

- **Gated to the student's level** (A1 or B2) via `useSignedInUser().level`, client-side, like the games; a student
  with no level sees an empty state. Best score per simulator is kept per device in `localStorage`
  (`zz:lesen:<level>`), not synced.

- **Surfaced as a dashboard tile, not a new nav item.** The student header already carries six items; Lesen (and
  later Hören) would overflow the md–lg header and the phone bottom bar, so the `/painel` Lesen card — previously
  "Em breve" — now links to `/lesen`. The landing page moves Lesen from "Em breve" to the available modules.

## Consequences

- A `/lesen` route; no CSP change (React, no inline scripts); no migration, no `db:types` regen.
- A2/B1/C1 Lesen are not included (no source simulators and, for A2/B1, no content yet); the model already supports
  them when content arrives.
- Content updates are a regeneration of the two content files + the domain test; the generator stays in the
  scratchpad, not versioned, exactly like the flashcard generator.
- The audio-less skills now split: Lesen is live; Hören remains "Em breve" pending an audio-hosting decision.
