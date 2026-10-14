-- CEFR level access control. See docs/adr/0015-cefr-level-access.md.
-- Students are scoped to a single CEFR level and see only content at that level; staff see every level.
-- The gate lives in RLS (the real boundary, ARCHITECTURE §8); the app never relies on query-side filtering.

-- 1. A student's level. Null for staff, and for students not yet classified.
alter table public.profiles add column level public.cefr_level;

-- 2. The caller's level, or null when staff / unclassified / blocked. Mirrors app_current_role()'s fail-closed
--    rule from migration 0008: a deactivated account, or one still on its temporary password, resolves to null
--    and therefore sees no course content.
create function public.app_current_level()
returns public.cefr_level language sql stable security definer set search_path = public as $$
  select level from public.profiles
  where id = auth.uid() and deactivated_at is null and not must_change_password;
$$;

-- 3. Content SELECT policies gain a level gate for students; staff still read everything. A student with no
--    level (null) matches no row, so unclassified students see no course content (fail-closed).

-- Units: migration 0002 let every authenticated user read all units; now a student reads only their level.
drop policy "read units" on public.units;
create policy "read units of own level, staff read all" on public.units for select to authenticated
  using (public.app_current_role() in ('teacher', 'admin') or level = public.app_current_level());

-- Lessons: a student sees a published lesson only when its unit is visible to them. The units subquery runs
-- under the new units RLS, so the level gate cascades; audio_assets and exercises already gate on the lesson.
drop policy "read published lessons" on public.lessons;
create policy "read published lessons of visible units, staff read all" on public.lessons for select to authenticated
  using (
    public.app_current_role() in ('teacher', 'admin')
    or (is_published and exists (select 1 from public.units u where u.id = lessons.unit_id))
  );

-- Speaking topics.
drop policy "read published topics, staff reads all" on public.speaking_topics;
create policy "read published topics of own level, staff read all" on public.speaking_topics for select to authenticated
  using (
    public.app_current_role() in ('teacher', 'admin')
    or (is_published and level = public.app_current_level())
  );

-- Flashcards.
drop policy "read published flashcards, staff reads all" on public.flashcards;
create policy "read published flashcards of own level, staff read all" on public.flashcards for select to authenticated
  using (
    public.app_current_role() in ('teacher', 'admin')
    or (is_published and level = public.app_current_level())
  );

-- Student writes (writing_submissions, writing_drafts, speaking_practices, flashcard_marks) already require the
-- parent content row to exist via an `exists (...)` subquery that runs under the gated RLS above, so a student
-- cannot submit, draft, practise or mark content outside their level either. No change needed here.

-- 4. Staff set a student's level through this RPC (pattern of touch_presence(), migration 0012), so profiles
--    needs no column-level update grant: role stays admin-only (migration 0005) and only `level` is writable,
--    only by staff, only on a student. Security definer, but it re-checks the caller on every call.
create function public.set_student_level(target uuid, new_level public.cefr_level)
returns void language plpgsql security definer set search_path = public as $$
begin
  if public.app_current_role() not in ('teacher', 'admin') then
    raise exception 'only staff may set a student level' using errcode = '42501';
  end if;
  update public.profiles set level = new_level where id = target and role = 'student';
  if not found then
    raise exception 'target is not a student' using errcode = 'P0002';
  end if;
end;
$$;

grant execute on function public.set_student_level(uuid, public.cefr_level) to authenticated;
