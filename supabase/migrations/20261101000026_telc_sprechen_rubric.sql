-- telc Mündlicher Ausdruck "Nota da Banca" (ADR-0019): the official Bewertungsbogen scores each Teil on four
-- criteria in bands A/B/C/D, up to 25 points per Teil (three Teile make 75, passing at 45). A practice is one
-- Teil, so these columns hold that Teil's band points; the app also keeps the derived 0–100 value in `score` so
-- the dashboard can compare Goethe and telc. Goethe keeps the free 0–100 score and leaves these columns null.

alter table public.speaking_assessments
  add column rubric_ausdruck   smallint check (rubric_ausdruck   in (0, 3, 5, 7)),
  add column rubric_aufgabe    smallint check (rubric_aufgabe    in (0, 3, 5, 7)),
  add column rubric_grammatik  smallint check (rubric_grammatik  in (0, 3, 5, 7)),
  add column rubric_aussprache smallint check (rubric_aussprache in (0, 1, 2, 4));

-- The four criteria are scored together (telc) or all left null (Goethe); never a partial rubric.
alter table public.speaking_assessments
  add constraint speaking_assessments_rubric_complete check (
    (
      rubric_ausdruck is null and rubric_aufgabe is null
      and rubric_grammatik is null and rubric_aussprache is null
    )
    or (
      rubric_ausdruck is not null and rubric_aufgabe is not null
      and rubric_grammatik is not null and rubric_aussprache is not null
    )
  );

-- Staff may revise the rubric too. The update grant is column-scoped (0010/0019), so it must be reissued with the
-- new columns; the table-wide insert grant from 0010 already covers them. RLS still decides the rows.
revoke update on public.speaking_assessments from authenticated;
grant update (score, comment, rubric_ausdruck, rubric_aufgabe, rubric_grammatik, rubric_aussprache)
  on public.speaking_assessments to authenticated;
