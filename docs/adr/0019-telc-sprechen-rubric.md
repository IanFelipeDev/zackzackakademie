# ADR-0019: telc Sprechen "Nota da Banca" (official per-Teil rubric)

- Status: Accepted
- Date: 2026-11-01

## Context

The teacher's site plan asks for a "Calculadora de Nota da Banca" for the telc Mündlicher Ausdruck: the official
examiner grid scores each Teil on four criteria in bands A/B/C/D — Ausdrucksfähigkeit/Flüssigkeit (7/5/3/0),
Aufgabenbewältigung (7/5/3/0), Formale Richtigkeit/Grammatik (7/5/3/0) and Aussprache/Intonation (4/2/1/0) — for a
maximum of 25 points per Teil. The three Teile add up to 75, and the exam passes at 45.

Until now a Sprechen assessment (ADR-0009) was a single free score from 0 to 100, for both Goethe and telc. In the
data model a practice is one topic = one Teil, and a teacher assesses one practice at a time. So the natural unit
for the rubric is the per-Teil subtotal (0–25); the full 0–75 exam total is the sum of a student's three Teile.

## Decision

- **A per-Teil rubric, telc only.** When assessing a telc practice, the teacher fills the four official criteria
  (A/B/C/D) instead of typing a free number. The subtotal (0–25) is shown live and stored as four band-point
  columns on `speaking_assessments` (`rubric_ausdruck`, `rubric_aufgabe`, `rubric_grammatik`,
  `rubric_aussprache`). Goethe keeps the free 0–100 score and leaves the rubric columns null.

- **`score` stays the shared 0–100 value.** For a rubric assessment the app derives `score` from the subtotal
  (`round(subtotal / 25 * 100)`) so the performance dashboard can still average and compare Sprechen grades across
  Goethe and telc. The authentic 0–25 and the per-criterion breakdown are recomputed from the four columns for
  display (`formatAssessmentScore`, the assessed panel breakdown); the student history and the teacher queue show
  "x/25" for telc and "x/100" for Goethe.

- **The exam total (0–75, pass ≥ 45) is not stored.** It is a property of three Teile together, which only exists
  once the chained Simulado (next phase) groups them; per practice the UI only notes how the total is reached.
  This keeps the change additive and avoids a premature "full exam" entity.

- **Database integrity.** Each rubric column is constrained to its allowed band points (or null), and a table
  check (`speaking_assessments_rubric_complete`) requires the four to be all set or all null — never a partial
  rubric. The column-scoped update grant (0010/0019) is reissued to include the new columns; the table-wide insert
  grant already covers them. RLS is unchanged (ADR-0009): staff insert/revise, students read their own.

## Consequences

- Migration `…26_telc_sprechen_rubric` adds the four nullable columns, the checks and the grant; `database.types`
  is regenerated. Existing assessments keep working (rubric null, `score` unchanged).
- The domain gains `TelcRubric`, the band tables and `rubricSubtotal`/`rubricScore`, plus an
  `InvalidSpeakingRubricError`; `validateAssessmentContent` derives the score from the rubric when one is given.
- The teacher's assessment screen branches by exam: a four-criteria form for telc, the free score for Goethe.
- When the chained Simulado lands, the 0–75 exam total and Aprovado/Reprovado (≥ 45) can be aggregated from the
  three Teile without another schema change.
