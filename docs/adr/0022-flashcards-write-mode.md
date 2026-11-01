# ADR-0022: Flashcards "write the word" mode and B1–B2 label

- Status: Accepted
- Date: 2026-11-01

## Context

The teacher asked for two flashcard changes: a mode where the student writes the German word from a Portuguese
prompt and is corrected automatically, and renaming the B2 vocabulary deck to "B1–B2" (it covers B1–B2 words).

## Decision

- **A "write the word" study mode** beside the existing flip mode, toggled on the flashcards page. In write mode
  the Portuguese translation is the prompt and the student types the German term; checking is tolerant of case,
  punctuation, umlauts/ß and the definite article, and also accepts the card's synonyms. The correct term and its
  grammatical extra/synonyms are revealed after checking. The flip-mode direction toggle is hidden in write mode
  (writing is always Portuguese → German). The `FlashcardSession` gained a `mode` prop and renders a new
  `FlashcardWrite` component; the session is keyed by mode so switching restarts the pass.

- **Reuse the shared answer checker.** The tolerant comparison (`normalizeAnswer`/`isCorrect`) was in
  `games/domain`; it is now in `shared/domain` so both the games and the flashcards use it (cross-feature code
  belongs in `shared`, per the layering rules). The games import moved accordingly; behaviour is unchanged.

- **Label only: B2 → "B1–B2".** The vocabulary page shows "Goethe-Zertifikat B1–B2 · Vocabulário" for B2 students.
  The CEFR model, the deck's `level` and the level gating are unchanged — this is a display name, not a new level.

## Consequences

- No migration, no database or RLS change; the mode and the label live entirely in the flashcards presentation.
- `normalizeAnswer`/`isCorrect` are now shared domain utilities; `games/domain/answer-checking.ts` was moved to
  `shared/domain/answer-checking.ts` and re-exported from the `shared/domain` barrel.
- Write mode does not auto-mark the card; the student still marks "Já sei"/"A revisar", so progress stays explicit.
