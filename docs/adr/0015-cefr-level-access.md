# ADR-0015: CEFR level access control

- Status: Accepted
- Date: 2026-10-13

## Context

Content is tagged by CEFR level (`units.level`, `speaking_topics.level`, `flashcards.level`), but students were
never scoped to a level: every signed-in student saw all published content. The school wants a student to see
only the content of their own level (an A1 student sees A1, a B2 student sees B2). Roles (student/teacher/admin,
ADR-0004/0006) stay the permission axis; level is a second, orthogonal scoping axis that applies to students.

## Decision

- **One level per student**, stored as `profiles.level` (`cefr_level`, nullable). Null means staff, or a student
  not yet classified. A matriculation table (a student in several levels at once) was considered and rejected as
  premature; a single column covers the requirement and promotion is a value change.
- **The gate lives in RLS**, the real boundary (ARCHITECTURE §8); the app never filters by level in queries.
  A `security definer` helper `app_current_level()` returns the caller's level, mirroring `app_current_role()`'s
  fail-closed rule (migration 0008): a deactivated account or one still on its temporary password resolves to
  null. The SELECT policies of `units`, `speaking_topics` and `flashcards` gain `level = app_current_level()` for
  students; staff still read every level. Lesson/exercise/audio reads and all student writes (submissions, drafts,
  practices, marks) already require the parent content row to exist through an `exists (...)` subquery that runs
  under these gated policies, so the level gate cascades to them with no extra rule.
- **Fail-closed**: a student with no level matches no content row and therefore sees nothing, rather than
  everything. The student dashboard shows a notice telling them to contact the school.
- **Staff assign the level through the `set_student_level(target, new_level)` RPC** (the pattern of
  `touch_presence()`, ADR-0010), `security definer`, which re-checks that the caller is staff and the target is a
  student. This keeps `profiles` free of a column-level update grant: role stays admin-only (migration 0005) and
  the only writable column by a teacher is `level`, only via this function. Admins and teachers both set it from
  `/admin/usuarios`.

## Consequences

- All authored content today is B2 (`*_b2_content` seeds). The gate has no visible effect until A1/A2/B1 content
  is authored; meanwhile students must be marked B2 to see anything. Seeding other levels is content work, out of
  scope here.
- New level-tagged content tables must add the same `level = app_current_level()` branch to their student SELECT
  policy, or students will see every level of them.
- Changing a student's level changes what they see immediately; their own history (submissions, practices, marks)
  is keyed by ownership, not level, so it stays visible after a promotion.
