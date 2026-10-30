# ADR-0018: Grammar games ("Jogo da Girafa")

- Status: Accepted
- Date: 2026-10-29

## Context

The teacher authored a self-contained HTML grammar game per CEFR level ("Aulas de Alemão A1–C1 – Jogo da
Girafa"): a playful quiz trainer with a rule per topic, three question kinds (multiple choice, fill the blank,
build the sentence), lives, streaks, XP and stars, and progress kept in `localStorage`. The goal is a low-stakes
drilling space alongside the exam-shaped Schreiben/Sprechen modules.

The raw HTML cannot be dropped into the app: the strict CSP (`script-src 'self'`, ADR-0006) blocks its inline
`<script>` and `onclick` handlers, it uses a different visual language than the Literary Academy design, and it
has no CEFR-level gating. The established precedent for this kind of content (flashcards, ADR-0013/0016) is to
port the prototype into the React app, which is the option the teacher chose.

## Decision

- **A new presentation-first `games` feature**, ported to React, not embedded HTML. It has a `domain` layer
  (types, answer checking, scoring, progress, and the per-level content) and a `presentation` layer (the page,
  the game screens and a `localStorage`-backed progress hook). There is no `application`/`infrastructure` layer
  and no container wiring: the games have no backend.

- **Content lives in code, not the database.** Each level's topics are a typed data module under
  `domain/content/` (`a1.ts`…`b2.ts`), assembled by `catalog.ts`. This keeps the port faithful and
  side-effect-free; the whole catalogue is validated by a domain test (every question well-formed, the
  multiple-choice answer is the first authored option, ids unique per level). `practice_mode`-style reasoning
  applies: this content is presentation-only and never touches RLS.

- **Each student sees only their level's game**, read from `useSignedInUser().level`, mirroring how the rest of
  the course content is gated (ADR-0015). Gating is client-side because there are no rows to protect server-side;
  a student with no level sees an empty state.

- **Progress is per device (`localStorage`), not synced.** The teacher opted out of a backend for this feature,
  so a round's XP always accumulates and a topic's best star score is kept, exactly like the original trainer.
  Keyed by level (`zz:grammar-game:<level>`).

- **C1 is intentionally out of scope.** The `cefr_level` enum and `CEFR_LEVELS` stop at B2, so no student can be
  scoped to C1 and a C1 game would have no audience. Adding C1 would mean extending the enum and the level gate
  across all content (units, flashcards, speaking) — a separate decision. Only A1, A2, B1 and B2 are ported; the
  C1 source HTML is left unported.

## Consequences

- A `/jogos` route and a "Jogos" item in `STUDENT_NAV` (the student header now carries six items; the bottom bar
  on phones and the md–lg header were checked for fit).
- No CSP change: the game is React with no inline scripts, so the strict policy stands.
- The giraffe mascot and gamification (lives/streak/XP/stars, "Spiel mit der Giraffe") are kept for flavour, but
  rebuilt with `shared/ui` and the design tokens rather than the original cartoon CSS.
- Content updates are code edits + a `games-domain` test run; no migration, no `db:types` regen.
- If synced/cross-device progress is ever wanted, it would be a new port + adapter (a `flashcard_marks`-style
  table), additive to this feature.
