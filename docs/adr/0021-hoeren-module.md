# ADR-0021: Hören module (keyword trainer; audio deferred)

- Status: Accepted
- Date: 2026-11-01

## Context

The teacher provided two Hören assets: a simulator that plays audio and asks questions, and a "keyword trainer"
of the topics and words that come up most often in each Teil. The simulator's prototype has **no embedded audio**:
it exposes `<input type="file">` slots so the teacher loads an MP3 at runtime. A real audio exam therefore needs
audio hosting (a Storage bucket with teacher upload, or external URLs) — an open decision. The keyword trainer, by
contrast, is pure text (the teacher's own notes of frequent exam topics) and fits the content-in-code pattern used
for Lesen and the games.

## Decision

- **Ship the keyword trainer now, defer the audio simulator.** A new presentation-first `listening` feature
  (`domain` + `presentation`, no backend) lists the teacher's frequent-topic notes by Teil 1–4: Richtig/Falsch
  cues (Teil 1), topics with keyword chips (Teil 2 and 4), and speaker order + mnemonics (Teil 3). The page is a
  browse view with a tab per Teil and an in-page note that the full audio exercises are coming.

- **Content is generated, not hand-written.** `domain/content/b2.ts` is produced by `scratchpad/gen-hoeren.cjs`
  from the HTML `DATA` object (evaluated data-only in an isolated `vm`). The content is the teacher's rough study
  notes — mixed German/Portuguese, her own shorthand — kept faithful; she will refine it. A domain test checks the
  four sections exist and every topic has a title.

- **Gated to the student's level** (B2 for now) via `useSignedInUser().level`, client-side like Lesen/games.

- **Surfaced as the `/painel` Hören tile** (was "Em breve"), now linking to `/horen`, and as an available module on
  the landing — not a new nav item, to keep the header and phone bar from overflowing. With both Lesen and Hören
  ready, the dashboard's "Em breve" skill card is removed.

## Consequences

- A `/horen` route; no CSP change, no migration.
- The audio simulator and its exercises remain to be built once audio hosting is decided (Supabase Storage public
  bucket with teacher upload, or external URLs). The CSP already allows `*.supabase.co` media.
- Content updates are a regeneration of the one content file + the domain test; the generator stays in the
  scratchpad, not versioned, like the Lesen and flashcard generators.
