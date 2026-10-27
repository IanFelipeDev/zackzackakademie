# ADR-0016: A1–A2 flashcard vocabulary and metadata

- Status: Accepted
- Date: 2026-10-26

## Context

The flashcards feature (ADR-0013) shipped with ~810 B2 cards grouped by one of nine fixed `category` values, each
card holding only a term, a translation and optional synonyms. The school provided an A1–A2 vocabulary trainer
(~880 cards) with richer structure: a **part of speech** (Substantiv / Verb / Adjektiv / Adverb / Konnektor /
Satz), many more **themes** (~35, e.g. Família, Comida e Bebida), and a grammatical **extra** per card — a noun's
plural, a verb's Perfekt, or a preposition/verb's governed case. CEFR level access (ADR-0015) already gates each
student to exactly one level via RLS, so A1 and A2 are first-class levels; the work is content plus a small schema
and UI extension, not a new feature.

## Decision

- **Reuse `flashcards.category` as a free theme slug** instead of a closed nine-value list. The nine B2 values stay
  valid; A1–A2 themes are their own slugs. The `CHECK` becomes a slug-format/length rule (migration 0022). The
  closed `FlashcardCategory` union in the domain is kept only as the B2 display order used by `sortFlashcards`;
  a card's `category` is now `string`.
- **Add three nullable columns**: `word_type` (`noun|verb|adjective|adverb|connector|phrase`), `extra` (the
  grammatical value, e.g. `Mütter`), and `extra_kind` (`plural|perfekt|case`). B2 cards keep all three null, so
  nothing about B2 changes. No RLS change: the level gate already lives on the row, and new columns inherit the
  table grants (0019 is about new tables).
- **Keep level gating exact-match (ADR-0015, reaffirmed).** A1 and A2 are seeded as separate level content; a
  student sees only their assigned level — an A2 student does not see A1 cards. Levels are isolated from one
  another; this is covered by explicit RLS tests for all four levels.
- **Seed is generated, not hand-written** (migration 0023), from the trainer HTML: deterministic ids
  `md5('zz:flashcard:' || level || ':' || category || ':' || position)`, idempotent `on conflict do nothing`,
  positions continuous per `(level, theme)` across repeated theme blocks.
- **UI adapts to the data.** When a deck carries word types (A1–A2) the page shows a word-type chip row and a
  theme dropdown (too many themes for chips); B2 keeps its category chips unchanged. A direction toggle (DE↔PT), a
  "só pendentes" shortcut and a level-aware header were added. The grammatical extra shows on the answer side.

## Consequences

- Adding another level (B1) or more A1–A2 content is now pure seed work with the same columns.
- `category` is no longer a typed union end-to-end; the mapper validates slug format and known labels live in
  `flashcard-labels.ts` with a title-cased fallback, so an unlabeled theme still renders.
- Marking is unchanged (latest `known|review` per student/card); no spaced repetition.
- The seed is generated — regenerate it (not hand-edit) if the source vocabulary changes.
