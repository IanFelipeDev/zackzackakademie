# ADR-0017: Free-practice mode and multi-level content

- Status: Accepted
- Date: 2026-10-27

> Implementation note (2026-10-27): shipped for **Schreiben** — migration `…0024` adds the `practice_mode` enum and
> columns plus the `short_message`/`form`/`free_text` task types; `…0025` seeds the A1 Schreiben content (Treino
> Livre + Simulado); the writing page gained the Simulado/Treino Livre toggle. **Sprechen** has the
> `practice_mode` column (default `exam`, harmless) but keeps its exam-only UI for now: its catalogue and staged
> timer are shaped around the B2 exam parts, so A1/free Sprechen is a separate step. A2/B1 content stays as
> `docs/content-drafts/a2-b1-curriculum.md` for the teacher to validate before seeding.

## Context

The app today is built around the **Goethe/telc exam flow**: writing is timed, has a word range and Leitpunkte
(`exercises`), and speaking is a prompt practised against the clock (`speaking_topics`); teachers review both.
All authored content is B2 (`*_b2_content` seeds); CEFR level gating exists (ADR-0015) but is dormant until lower
levels are authored.

The teacher's A1 curriculum (`SITE - ZACK ZACK.pdf`) introduces a second shape of practice that repeats **per
level**, under two tabs:

- **Treino Livre** — a low-pressure space: the student writes a short everyday text _or_ records an audio, with
  no timer, no word count and no Leitpunkte. The teacher corrects it personally. The point is "destravar o idioma".
- **Simulado de Prova** — the official Goethe/telc format for that level (forms, short messages, emails on the
  writing side; direct questions and imperative requests on the speaking side).

The decision below records how to add the free-practice shape and make the content model carry every level, so A1
(then A2/B1) can be authored over time. Seeding the actual content is deliberately out of scope here — the PDF is
A1-only and truncated, and A2/B1 do not exist yet.

## Decision

- **A `practice_mode` axis, not a parallel feature.** Add an enum `practice_mode ('exam' | 'free')` with a column
  on `exercises` and on `speaking_topics`, both defaulting to `'exam'` so every existing B2 row keeps its meaning.
  Free practice reuses the whole existing flow — `writing_submissions`/`feedback` and
  `speaking_practices`/`speaking_assessments`, the `/revisoes` and `/avaliacoes-orais` review queues, and all RLS.
  A separate "free practice" feature with its own tables and review surface was rejected: it would roughly double
  the work and duplicate the correction queue for no domain gain. The two modes differ only in presentation.

- **`practice_mode` only changes presentation.** In `free` mode the writing UI hides the timer, word-count meter
  and Leitpunkte; the submission still becomes an immutable attempt the teacher reviews. Free rows therefore set
  `min_words`/`max_words` null and `guiding_points '{}'`. A new `writing_task_type` value `free_text` gives the
  open-prompt layout; `form` and `short_message` are added for the A1/A2 Simulado formats. (Enum values must be
  committed before use, so they land in their own migration, as in migration 0014.)

- **Audio stays on the speaking side only.** A spoken Treino Livre item is a `speaking_topic` with
  `practice_mode = 'free'`, recorded through the existing private `speaking-recordings` bucket (ADR-0014). No audio
  column is added to the writing tables. The **Treino Livre tab is a view that aggregates** the free-mode writing
  exercises and the free-mode speaking topics of the student's level; Simulado aggregates the exam-mode ones.

- **Writing keeps its `units → lessons → exercises` anchor** (unchanged from migration 0003). A1 content is seeded
  as A1 `units` with `lessons` and `exercises`, exactly as B2 was (migration 0004); a "lesson" is simply the topic
  container. This is the least disruptive option and keeps the live B2 content untouched. Giving writing a direct
  `level`/`exam` column (to mirror `speaking_topics`) was considered and deferred: it is a larger migration with a
  backfill and buys nothing the unit anchor doesn't already provide. Level therefore continues to come from the
  unit on the writing side and from the row on the speaking side.

- **Access control is already solved.** Free content is level-tagged like everything else (via its unit for
  writing, via `speaking_topics.level` for speaking), so the ADR-0015 gate scopes it to the student's level with no
  new rule. `practice_mode` is not a permission axis — it never appears in an RLS policy, only in queries and UI.

## Consequences

- Teachers see free-practice submissions and recordings **in the same `/revisoes` and `/avaliacoes-orais` queues**
  as exam work, distinguished by a mode badge. This matches the teacher's stated intent ("eu farei a correção
  pessoalmente") and avoids a second queue.
- New migrations (continuing from 0023): `…24` adds the `practice_mode` enum + columns and the new
  `writing_task_type` values; content seeds (`…25+`, one per level/batch) are idempotent with deterministic md5
  ids, like 0004. Each adds RLS test cases in `tests/integration/rls.test.ts` and a `db:types:remote` regen.
- Presentation gains a Livre/Simulado tab split on the student writing and speaking entry points; the speaking
  recorder already exists. `STUDENT_NAV` labels in `app-layout.tsx` may change. No new external hosts (reuses the
  `*.supabase.co` media already in the CSP).
- **Content is the blocker, not the model.** A1 seeding waits on the complete A1 text (the PDF ends mid-list);
  A2/B1 wait on authored content. The model ships first and stays dormant per level until its content exists,
  exactly as the ADR-0015 gate does today.
- A free prompt carries no Redemittel/Leitpunkte by default (the PDF shows them bare); if the teacher later wants
  optional Redemittel on free prompts, `useful_phrases` already keys by `task_type` and can gain a `free_text`
  group without schema change.

## Open questions (to resolve before implementation)

1. Confirm free practice belongs in the existing review queues with a badge (assumed yes).
2. Confirm the writing unit-anchor over a direct `level`/`exam` column (assumed yes; revisit if telc writing lands).
3. Final `writing_task_type` set for A1/A2 (`free_text`, `form`, `short_message` proposed).
