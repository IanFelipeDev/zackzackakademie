-- Free-practice mode (Treino Livre) alongside the exam flow (Simulado). See
-- docs/adr/0017-free-practice-mode-and-multi-level-content.md.
--
-- `practice_mode` is a presentation axis, not a permission axis: it never appears in an RLS policy. The existing
-- level/published/ownership gates (ADR-0015, migrations 0002/0010/0021) already decide visibility; the mode only
-- tells the UI whether to show the timer, word count and Leitpunkte (exam) or hide them (free). Both columns
-- default to 'exam' so every B2 row keeps its current meaning with no backfill.

create type public.practice_mode as enum ('exam', 'free');

alter table public.exercises
  add column practice_mode public.practice_mode not null default 'exam';

alter table public.speaking_topics
  add column practice_mode public.practice_mode not null default 'exam';

-- A1/A2 Schreiben formats and the open free-practice prompt. New values on an existing enum can only be used once
-- committed (as in migration 0014), so the content that uses them lands in a later migration, not here.
alter type public.writing_task_type add value if not exists 'short_message';
alter type public.writing_task_type add value if not exists 'form';
alter type public.writing_task_type add value if not exists 'free_text';
