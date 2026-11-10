# ADR-0025: Goethe B2 content refresh (new Sprechen/Schreiben topics, B2 Lesen/Hören removed)

- Status: Accepted
- Date: 2026-11-10

## Context

The teacher delivered a new content package for the **Goethe-Zertifikat B2** module (PDF "AULAS DE ALEMÃO –
2º 2026"). She asked to:

- replace **every** Sprechen topic (Teil 1 Vortrag and Teil 2 Diskussion) with a new set, discarding the old ones;
- replace **every** Schreiben topic with 22 new "Duplas" (each a Teil 1 Forumsbeitrag + a Teil 2 formal E-Mail),
  discarding the old 23 + 17;
- **delete the texts and audio already recorded** by students on the old B2 content (an explicit, accepted loss
  of history, unlike ADR-0013 which preserved practised topics);
- **remove Lesen and Hören from B2 entirely**, keeping them for other levels where they exist.

telc (ADR-0012), every non-B2 level, flashcards, games and grammar reference are out of scope and untouched.

## Decision

- **A single destructive data migration** (`…28_b2_goethe_content_refresh`) refreshes the database content:
  - Sprechen: delete the audio recordings of the old Goethe B2 practices from the `speaking-recordings` Storage
    bucket (no FK cascade), then `delete from speaking_topics where level = 'B2' and exam = 'goethe'`, which
    cascades to `speaking_practices` and `speaking_assessments`. Insert the 17 new Teil 1 Vortrag topics (the three
    fixed Leitpunkte) and 8 new Teil 2 Diskussion topics (each with its Gesichtspunkte). Scoping by `exam = 'goethe'`
    leaves the 19 telc B2 topics intact.
  - Schreiben: delete all lessons of the two B2 units (`zz:unit:b2:teil1`/`teil2`), which cascades to exercises and
    from there to `writing_drafts`, `writing_submissions` and `feedback`. The two units are kept. Insert 22 new
    Teil 1 forum-post lessons/exercises and 22 new Teil 2 formal-email lessons/exercises, position = Dupla number so
    the two tabs line up. Redemittel (`useful_phrases`) are unchanged — the teacher did not revise them.
  - IDs are deterministic (md5 of a stable key, `…:v3:…` / `…:b2v2:…`) so the migration is idempotent.
- **No "Dupla" entity.** The data model already splits Teil 1 and Teil 2 into two units/lists; the app has no
  pairing concept and none is added. The 22 Duplas become 22 forum posts + 22 e-mails at matching positions.
- **Lesen/Hören removal is a code change**, since both are content-in-code features (ADR-0020/0021):
  - Reading: drop `B2_READING_EXAMS` from the catalog (delete `content/b2.ts`); only A1 remains.
  - Listening: the B2 trainer was the _only_ Hören content, so removing it (delete `content/b2.ts`) leaves the
    trainer list empty. The feature, route and page are kept dormant (the page already renders an empty state), so
    that future audio content (the deferred audio simulator, ADR-0021) can be added back without replumbing.
  - The dashboard shows the Lesen and Hören tiles only when the signed-in student's level actually has content
    (`readingExamsForLevel(level).length > 0` / `hoerenForLevel(level) !== null`), read through each feature's new
    public API. A B2 student now sees neither tile; an A1 student still sees Lesen. The landing page drops the Hören
    item and narrows the Lesen item to A1.

## Consequences

- Running `db:push` on the hosted project **permanently deletes** the existing B2 Goethe students' submissions,
  feedback, oral practices, assessments and recordings. This is the teacher's explicit request; there is no undo.
- The migration is also replayed by the `database` CI job against a throwaway stack; the RLS fixture counts move
  from 40 → 44 exercises and 77 → 44 speaking topics for a B2 student.
- `database.types.ts` is unchanged (data-only migration, no schema change).
- If Hören content returns later, add its trainer to the listening catalog and the tile reappears automatically.
