# ADR-0024: Grammar reference sheets

- Status: Accepted
- Date: 2026-11-01

## Context

The teacher asked for general grammar reference pages. Two of her reference HTMLs have clean data arrays: the
gender rules ("Regras de Genero", words grouped der/die/das with the rule each illustrates) and the verbs with
fixed prepositions (verb, preposition, case, translation, example). Her C1 Grammatik is a parallel quiz-course
with a different shape and is deferred (the C1 game already covers C1 grammar practice).

## Decision

- **A new presentation-first `grammar` feature** (content in code, like Lesen/Hören/games): two reference sheets —
  gender (grouped by der/die/das, each entry with its rule) and verbs with fixed prepositions (grouped by
  preposition, with case, translation and an example). A browse view at `/regras` with a tab per sheet.
- **Content is generated** from the HTML by `scratchpad/gen-grammar.cjs` (111 gender words, 83 verbs across 12
  prepositions), evaluated data-only in an isolated `vm`, and validated by a domain test.
- **Not level-gated**: these are general reference, useful at every level, shown to any signed-in student.
- **Surfaced from the games page** (`/jogos`) via a "Regras de gramática" link, not a new nav item, to keep the
  header and phone bar from overflowing.

## Consequences

- A `/regras` route; no CSP change, no migration.
- The C1 Grammatik course remains to be ported if wanted later; its shape (units with quizzes) is closer to the
  games than to a reference sheet.
- Content updates are a regeneration of the one content file + the domain test; the generator stays in the
  scratchpad, not versioned, like the other content generators.
