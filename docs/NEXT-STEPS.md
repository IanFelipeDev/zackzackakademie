# Next steps

Status on 2026-09-30. Update this file as items are done.

## Done

- 2026-11-10: **Goethe B2 content refresh** (ADR-0025, migration 0028). The teacher replaced every B2 Sprechen and
  Schreiben topic. Migration 0028 deletes the old Goethe B2 `speaking_topics` (scoped `exam = 'goethe'`, cascading
  practices/assessments) and the old B2 Schreiben lessons (cascading exercises/drafts/submissions/feedback), then
  seeds 17 Teil 1 Vortrag + 8 Teil 2 Diskussion Sprechen topics and 22 Dupla pairs (22 Forumsbeiträge + 22 formal
  E-Mails) of Schreiben. telc and all non-B2 levels untouched. **B2 Lesen and Hören removed** (code change,
  content-in-code): `reading` keeps only A1, `listening` is now empty (B2 was its only content; feature kept
  dormant). The `/painel` Lesen/Hören tiles are now gated on whether the student's level has content, so B2 sees
  neither. **Applied to the hosted DB 2026-11-10** via `db:push` (25 Goethe B2 speaking topics + 44 B2 exercises
  verified): the old B2 students' submissions, feedback, oral practices and assessments were permanently deleted
  (the teacher's explicit request). The two practice recordings could not be removed in SQL (hosted Postgres
  refuses a direct `DELETE` on `storage.objects`), so their files were deleted via `supabase storage rm` after the
  push. No `database.types` change (data-only).
- 2026-11-01: **Grammar reference sheets** (ADR-0024). New content-in-code `grammar` feature at `/regras`: the
  gender rules (der/die/das groups, 111 words) and verbs with fixed prepositions (83 verbs, 12 prepositions),
  generated from the teacher's HTML. Not level-gated (general reference); linked from `/jogos`. The C1 Grammatik
  quiz-course is deferred (the C1 game covers C1). No migration.
- 2026-11-01: **C1 level + C1 grammar game** (ADR-0023, migration 0027). `cefr_level` enum extended to C1 (applied
  to the hosted DB; types regenerated), `CEFR_LEVELS` gains C1, and the C1 "Jogo da Girafa" (14 topics, 81
  questions, generated from the teacher's HTML) completes the games A1–C1. C1 is now assignable in
  `/admin/usuarios`. C1 DB content (units/topics/flashcards) can be authored later; gating already supports it.
- 2026-11-01: **Flashcards "write the word" mode + B1–B2 label** (ADR-0022). A write mode beside the flip mode: the
  Portuguese translation is the prompt, the student types the German term, checked tolerantly (case, umlaut/ß,
  optional article, synonyms) by the now-shared `normalizeAnswer`/`isCorrect` (moved from `games/domain` to
  `shared/domain`). The B2 vocabulary page is shown as "B1–B2" (label only; CEFR model unchanged). No migration.
- 2026-11-01: **Hören module** (ADR-0021). New content-in-code `listening` feature: the teacher's keyword/topic
  trainer by Teil 1–4 (frequent topics, keywords and Teil 3 speaker-order mnemonics), generated from her HTML by
  `scratchpad/gen-hoeren.cjs`, gated to the student's level (B2), route `/horen`, `/painel` tile + landing module.
  The full **audio simulator is deferred** until audio hosting is decided — its prototype has no embedded audio
  (runtime file-upload slots). Content is the teacher's rough notes; she will refine. No migration.
- 2026-11-01: **Lesen module** (ADR-0020). New presentation-first `reading` feature (content in code, like the
  games): Goethe A1 (4 simulados × 15 questions) and B2 (4 × 30), ported from the teacher's HTML by
  `scratchpad/gen-reading.cjs`, auto-graded in the browser with the official pass marks (A1 ≥ 9, B2 ≥ 18), gated to
  the student's level, best score per device in `localStorage`. Route `/lesen`; surfaced as the `/painel` Lesen
  tile (was "Em breve") and moved to the landing's available modules — not a new nav item, to keep the header/phone
  bar from overflowing. No migration. A2/B1/C1 Lesen pending content.
- 2026-11-01: chained **Simulado** for Sprechen. New `/sprechen/simulado?prova=goethe|telc` runs a full mock: for
  telc the 20-minute preparation first, then each Teil in sequence with a randomly drawn published topic of the
  student's level, the stage timer in real-exam mode (no pause, via the new `disablePause` on the timer dialog) and
  the per-part practice aids; each Teil is recorded as a normal practice and queued for the teacher. The exam total
  (0–75, pass ≥ 45) is the sum of the three per-Teil rubric grades (ADR-0019). A "Simulado completo" button on the
  catalogue. Presentation-only, no migration. Part of the teacher's site-plan roadmap.
- 2026-11-01: telc Sprechen "Nota da Banca" (ADR-0019, migration 0026). The teacher now scores a telc practice on
  the four official criteria (Ausdruck/Aufgabe/Grammatik 7/5/3/0, Aussprache 4/2/1/0) → 0–25 per Teil, shown as
  "x/25"; the shared `score` keeps a derived 0–100 value so the dashboard still compares exams. Goethe keeps the
  free 0–100 score. The exam total (0–75, pass ≥ 45) is aggregated across the three Teile and will be surfaced with
  the chained Simulado. Migration 0026 applied to the hosted DB and types regenerated (matched). Part of the
  teacher's site-plan roadmap (plan file `~/.claude/plans/delightful-waddling-bonbon.md`). Landing hero eyebrow also
  changed to "Aulas de Alemão com a Melissa ✨" (shipped separately to main earlier the same day).
- 2026-10-29: grammar games "Jogo da Girafa" (ADR-0018). New `games` feature (domain + presentation, no backend):
  one quiz game per CEFR level (A1–B2) ported from the teacher's HTML, content in code, progress in `localStorage`,
  gated to the student's level. Route `/jogos` and a "Jogos" item in `STUDENT_NAV`. C1 deferred (no C1 in the
  `cefr_level` model). The Lesen A1/B2, B1 Schreiben/Sprechen and Hören B2 vocabulary the teacher also prepared are
  NOT in yet — those HTML files were not available locally (still on the teacher's drive).
- 2026-10-27: free-practice mode for Schreiben (ADR-0017). `practice_mode` (exam | free) on `exercises` and
  `speaking_topics` (migration 0024, applied to the hosted DB; types regenerated); A1 Schreiben content seeded
  (migration 0025: 4 Treino Livre + 5 Simulado topics). The writing page has a Simulado/Treino Livre toggle;
  free practice hides the timer, word range and Leitpunkte. Shipped to `main`. Sprechen has the column but keeps
  its exam-only UI (A1/free Sprechen is future work); A2/B1 content drafted in `docs/content-drafts/`, pending the
  teacher's review. Students must be set to level A1 in `/admin/usuarios` to see the A1 content.
- Phase 0 setup (Vite, TypeScript strict, Tailwind, ESLint layer boundaries, Vitest, CI), Supabase schema + RLS.
- Goethe B2 Schreiben module: practice page, drafts, submission history, teacher review (teachers and admins
  both review at `/revisoes`).
- Auth without self sign-up. Admin user management at `/admin/usuarios`: create access with a temporary password
  (valid until first sign-in, must be changed, reuse rejected), resend access, deactivate/reactivate, delete
  (ADR-0007), change roles.
- Hosted Supabase (`cphpixxnogjxxoypbetg`): migrations 0001–0020 applied (0009–0012 on 2026-09-29, 0013–0016 on 2026-09-30, 0017–0020 on 2026-10-01) (0008 security hardening pushed 2026-09-27; anonymous
  requests to every table now get HTTP 401), public sign-up disabled, password
  minimum 8. Edge Functions `invite-user` and `manage-user` redeployed 2026-09-27 from `b5a119f` (SMTP transport,
  `SITE_ORIGINS` check, account deletion), at the user's request before the CI result was known.
- Access email designed from the school's template (`supabase/functions/_shared/access-email.ts`).
- Mobile layout (bottom nav bar on phones) and installable web app (manifest, no service worker / offline).
- Vercel project `zack_zack_akademie`, live at https://zackzackakademie.vercel.app, deploys `main` automatically;
  `SITE_ORIGINS` secret and Supabase Auth URL Configuration point to it.
- 2026-09-27: the admin's forgotten password was reset through the SQL Editor (temporary password +
  `must_change_password`), since no recovery email can be sent yet.
- 2026-09-29/30 release (live, `main` 7448fbe; Edge Functions redeployed 2026-09-29):
  - Teachers: review history at `/revisoes/historico` and editable feedback (ADR-0008).
  - Sprechen module (ADR-0009): catalogue at `/sprechen`, stage timer (Teil 1 5:00 = 1:00 / 3:00 / 1:00, Teil 2
    2:30 = 0:30 / 1:30 / 0:30, as the teacher set), score history per topic, teacher scoring at `/avaliacoes-orais`.
    Topics are the teacher's lists (migration 0013: 27 Teil 1, 31 Teil 2, spelling fixed, duplicates merged); the
    20 placeholder topics are unpublished.
  - Student performance dashboard at `/painel` (student home), Lesen/Hören as "Em breve".
  - Admins see who is online and each person's last access (ADR-0010).
  - Neutral login texts for students and teachers.
  - Public landing page at `/` (ADR-0011) from the Stitch sketch, motion per the vendored animation skills in
    `.claude/skills` (emilkowalski/skills, MIT).
- 2026-09-30 evening (`main` 3c82159, PR from `feat/telc-sprechen`, CI green): landing without the "8 meses"
  promise; telc B2 Mündlicher Ausdruck next to Goethe in Sprechen (ADR-0012, migrations 0014–0016).
- 2026-10-01 (`feat/flashcards`): vocabulary flashcards at `/flashcards` (ADR-0013, migrations 0017–0018) with the
  teacher's 810 cards; status per card (Não feito / A revisar / Realizado) saved per student. Migrations
  0017–0018 applied to the hosted project on 2026-10-01; regenerated types matched the committed ones.
- 2026-10-01 night: CI `database` job fixed (it had been red on `main` since 2026-09-26: email logins disabled
  on the local stack, `.env.ci` never committed). Its first real run found that staff could rewrite the author and
  dates of speaking assessments; migration 0019 tightens the table grants (applied to the hosted project on 2026-10-01).
- 2026-10-01 night: Sprechen recordings (ADR-0014): students may record a practice, the teacher listens before
  scoring; character count in Schreiben. Migration 0020 applied 2026-10-01 (types matched). Edge Functions
  redeployed the same day (manage-user deletes recordings with the account). CI green on `main` 23b9d58.

## Resume here

- **A1 Sprechen (Fala)** — PLANNED, not built. The A1 package's speaking half (4 Treino Livre + 5 Simulado) was
  never implemented; the hosted DB has zero A1 `speaking_topics`. Content is not missing (it's in the doc tab); the
  work is DB + module (the Sprechen module is still exam-shaped). Full plan, source links and the task_type/pair
  design decisions in **`docs/a1-sprechen-plan.md`**.
- **CEFR level access** (ADR-0015, `feat/cefr-level-access`, migration 0021): students are scoped to
  `profiles.level` and RLS shows each student only their level; staff assign it from `/admin/usuarios` via the
  `set_student_level` RPC. Fail-closed: a student with no level sees no content. **Not yet applied** — run
  `npm run db:push` then `npm run db:types:remote` and confirm the regenerated types match the committed ones.
  Caveat: all seeded content is B2, so until A1/A2/B1 content is authored, students must be set to B2 to see
  anything. After the migration, set every existing student's level in `/admin/usuarios`.
- **A1–A2 flashcards** (ADR-0016, `feat/flashcards-a1-a2`, migrations 0022–0023): ~880 A1/A2 vocabulary cards with
  word type, theme and a grammatical extra (plural/Perfekt/case); the page gains a word-type filter, a theme
  dropdown, a DE↔PT toggle, a "só pendentes" shortcut and a level-aware header. B2 unchanged; level gating stays
  exact-match (four-level isolation tested in `rls.test.ts`). **Not yet applied** — run `npm run db:push` then
  `npm run db:types:remote` and confirm the regenerated types match the committed ones. Then assign A1/A2 students
  their level in `/admin/usuarios`.
- **telc content**: ask the teacher for her "aba TELC" list (Nachfragen per Teil 1 topic, Teil 2 topics with
  texts, Teil 3 tasks) to replace the starting content of migration 0016, and for the third priority of her site
  plan that was unclear. Check `/sprechen?prova=telc` on a phone after the deploy.

0. **CI**: green on the telc PR (2026-09-30), including the `database` job. Keep checking Actions after each push.
1. **Test email**: "Reenviar acesso" on an account with a reachable inbox. Expected: "Nova senha temporária
   enviada…" and the email arrives (check spam). `invite_delivery_failed` → read the `manage-user` logs (Gmail
   refused); still `email_not_configured` → check the `EMAIL_TRANSPORT`/`SMTP_*`/`EMAIL_FROM`/`SITE_ORIGINS` values.
2. Dashboard → Authentication → Sign In / Providers → Email: password requirement "letters and digits".
3. Dashboard → Authentication → Emails → SMTP Settings: same Gmail + app password (smtp.gmail.com:465), so
   "Esqueci minha senha" sends recovery emails. Then Emails → Templates → Reset password: subject
   "Redefinição de senha · Zack Zack Akademie 🔑" and the body of `supabase/templates/recovery.html` (same design as
   the access email). Its logo uses `{{ .SiteURL }}`, so Site URL (URL Configuration) must be
   https://zackzackakademie.vercel.app.
4. Create the teacher's account (role Professor, or Admin if she also manages users) and the students'.
5. **Teacher review**: my interpretations in her Teil 2 list (Umzug, Selbstständige Arbeit, Erneuerbare Energien,
   Kinderbetreuung), the merged duplicates, and the landing texts (`src/features/landing/presentation/landing-content.ts`).
   A higher-resolution photo of her would look sharper on the landing page (current one is 512 px).
6. Tell students that the platform records the time of their last access (presence, LGPD transparency).

## Open ideas

- "Redefinir senha" for already active accounts: same flow as "Reenviar acesso" but a password-reset version of
  the email instead of the welcome text (proposed 2026-09-27, not decided).

## Email providers

- Current: Gmail SMTP with an app password (`EMAIL_TRANSPORT=smtp`, port 465 only).
- Brevo (code ready, `EMAIL_TRANSPORT=brevo`): sign-up was blocked (phone number used by too many accounts).
- Later, with a `.com.br` domain (about R$ 40/year): Resend (`EMAIL_TRANSPORT=resend`).

## Security cleanup

- Revoke the Supabase access token used during setup (supabase.com/dashboard/account/tokens).
- Revoke the exposed secret API key (Project Settings → API Keys).
- Reset the database password (Project Settings → Database).

## Later phases (not started)

- From the teacher's site plan (2026-09-30): ~~official telc scoring for Sprechen (four criteria per Teil, 0–75,
  pass at 45)~~ done 2026-11-01 (ADR-0019), ~~a full mock exam (Teil 1 → 2 → 3 with random topics and no pause,
  Goethe and telc)~~ done 2026-11-01 (/sprechen/simulado), a Stichpunkte
  notepad for the preparation, unified status names across modules, notifications when a correction arrives.
- Google sign-in, AI-assisted correction (Edge Function), other Stitch modules (Lesen, Hören,
  Flashcards), student voice recording for Sprechen, exam-code pairs ("Simulado #B2-04"), LGPD erasure for teachers who gave feedback.
