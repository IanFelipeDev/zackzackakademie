# ADR-0023: C1 CEFR level and C1 grammar game

- Status: Accepted
- Date: 2026-11-01

## Context

The teacher provided a C1 "Jogo da Girafa" and C1 grammar material. ADR-0018 deferred C1 because the `cefr_level`
enum stopped at B2, so no student could be scoped to C1 and the game would have no audience. With the Lesen/Hören
modules and the rest of the course taking shape, C1 is now wanted.

## Decision

- **Extend the CEFR model to C1.** Migration `…27_c1_level` adds `'C1'` to the `cefr_level` enum
  (`alter type … add value if not exists`), and `CEFR_LEVELS` in `shared/domain` gains `'C1'`. This is additive:
  the change makes C1 assignable in `/admin/usuarios` (the level selector reads `CEFR_LEVELS`) and via
  `set_student_level`, and fail-closed level gating keeps a C1 student seeing only C1 content — of which there is
  none in the database yet, so no existing row or policy changes.

- **Port the C1 grammar game.** `games/domain/content/c1.ts` is generated from the teacher's HTML by
  `scratchpad/gen-c1-game.cjs` (14 topics, 81 questions) in the same authoring format as A1–B2, and added to the
  games catalogue. The games are gated client-side by `useSignedInUser().level`, so a C1 student now sees the C1
  game. The games-domain test already requires one game per `CEFR_LEVELS` entry, so it now validates C1 too.

## Consequences

- One migration (applied to the hosted DB; `database.types` regenerated — the `cefr_level` union gains `"C1"`).
- `Record<CefrLevel, …>` maps: the only one is the games catalogue (`Partial<Record<…>>`), so nothing else needed
  exhaustive C1 handling. The admin level dropdown and `set_student_level` accept C1 automatically.
- C1 database content (units, speaking topics, flashcards) can be authored later; the gating already supports it.
- The C1 grammar reference pages (gender/suffix rules, verbs with fixed prepositions, C1 Grammatik) are a separate,
  presentation-only follow-up.
