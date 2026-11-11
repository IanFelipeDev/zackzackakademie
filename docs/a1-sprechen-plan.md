# Plan: A1 Sprechen (free practice + simulado)

- Status: **Planned — not implemented yet** (documented 2026-11-10 for a later session)
- Scope: add the A1 Sprechen (Fala) content and the free-practice support the Sprechen module needs for it.

## Why this exists

The teacher's A1 package (doc tab "A1") asks for both **Schreiben** and **Sprechen** at A1, each split into
**Treino Livre** and **Simulado**. The Schreiben half is already shipped (migration
`…25_a1_schreiben_content`: 4 free + 5 exam A1 writing exercises — verified live). The **Sprechen half was never
built**: the hosted DB has **zero** A1 `speaking_topics` today, because the Sprechen module is still shaped for the
B2/telc exam format (Teil tabs, 5:00/2:30 timers, telc Banca rubric) and A1 is a simple free-recording practice.
This plan closes that gap.

## Source material (links)

- **Doc tab "A1"** (the themes, in pt-BR) — the Treino Livre + Simulado prompts for both skills:
  https://docs.google.com/document/d/1kUg0bL3BdwrP0QT5YHY7aRvJAQETH-YLadNCSz8xb6k/edit?tab=t.pfeqvcg36c5k
- **Drive folder "Site - ZackZack"** (teacher's content root, = the GOETHE/GRAMATICA/HTML PRONTO/TELC zips):
  https://drive.google.com/drive/folders/1EgViAv4yUHRPP83Juoa8Xn-b-t_1zM0p
- **Drive GOETHE › SPRECHEN** — checked 2026-11-10: contains **only** one file, "Treinador vocabulário específico
  de Sprechen (falar)" (HTML, 33 KB), which is a vocabulary trainer, **not** the A1 free-speaking prompts.
  There is **no dedicated A1 Sprechen file** — the A1 themes live only in the doc tab above:
  https://drive.google.com/drive/folders/1jYxifLrPZZo0-8b4CajRTHP46spiyDnj

So the content is **not missing** — the nine prompts are in the doc tab. The remaining work is app/DB, not content
gathering. (The German prompts still have to be authored from these pt-BR themes and validated by the teacher, as
with the A1 Schreiben content.)

## Content to seed (from the doc tab, pt-BR themes)

### Treino Livre — Fala (4)

1. **Café**: gravar um áudio simulando o pedido favorito num café, do cumprimento inicial até pedir a conta.
2. **Quarto/Casa**: descrever em voz alta o quarto ou a casa — cores, móveis principais, a parte favorita.
3. **Rotina matinal**: descrever a rotina da manhã antes do trabalho/universidade — meio de transporte e horário de saída.
4. **Roupa favorita**: falar sobre a roupa favorita para eventos especiais (vestido longo / traje formal) — cores e detalhes.

### Simulado — Fala (5, formato Goethe/telc A1)

1. **Rotina**: formular perguntas diretas ao parceiro (a que horas acorda, como vai ao trabalho) e responder sobre o próprio fim de semana.
2. **Comida e bebida**: perguntar o que o colega gosta no café da manhã e responder qual é o prato favorito.
3. **Compras**: perguntar o preço de roupas, informar-se sobre horários de uma loja, simular pedir ajuda a um vendedor.
4. **Moradia**: perguntas simples sobre onde o colega mora, se tem jardim, e responder descrevendo o próprio quarto.
5. **Pedidos do cotidiano**: formular pedidos no imperativo a partir de imagens (fechar a janela, um copo de água, pedir a conta educadamente).

## Implementation steps

1. **DB migration (`YYYYMMDD000029_a1_sprechen_content.sql`)** — seed the nine A1 topics into `speaking_topics`
   with `level = 'A1'`, `practice_mode` splitting free (4) vs exam (5). `practice_mode` already exists on
   `speaking_topics` (migration `…24`, default `exam`). Deterministic md5 ids, `is_published = true`.
2. **Resolve the task_type / check constraint** — this is the real design decision. Today
   `speaking_topics_exam_task_type` (migration `…15`) requires `exam = 'goethe' → task_type in
(presentation, discussion)` or `exam = 'telc' → (experience, discussion, planning)`, and `exam` is NOT NULL.
   A1 free speaking fits none of these. Options:
   - (a) Add a new `speaking_task_type` value (e.g. `free_speaking`) + relax the check so free-mode / A1 topics are
     allowed (mirrors how `writing_task_type` gained `free_text`/`short_message`/`form` in `…24`). **Recommended.**
   - (b) Shoehorn A1 into `exam = 'goethe'` with an existing task_type — rejected: pollutes the Goethe exam catalogue.
   - Also revisit the `unique (exam, level, task_type, position)` key so A1 positions don't clash.
3. **Sprechen presentation — free mode** — mirror the Schreiben Treino Livre UX (ADR-0017): a plain list, **no Teil
   tabs, no 5:00/2:30 timer, no telc Banca checklist**. The page already reads `?prova=` / Teil params for the exam
   flow; add a free branch gated on `practice_mode`/level the way `WritingPracticePage` does (`?modo=livre`).
   Recording + teacher assessment reuse the existing speaking-recordings pipeline (ADR-0014) unchanged.
4. **Simulado A1 nuance** — the A1 Simulado Sprechen tasks are **partner/pair** tasks ("formule perguntas ao
   parceiro e responda"). The app is single-student. Decide: phrase each as a solo recordable task (student records
   both the questions they would ask and their own answers), which is the simplest faithful model. Document the
   choice in the ADR.
5. **Assessment** — A1 is Goethe-style free scoring (0–100), not the telc Banca rubric. The existing Goethe
   assessment path covers it; no rubric change.
6. **Level gating** — already handled: `speaking_topics` SELECT is level-scoped (ADR-0015, `app_current_level()`),
   so A1 topics appear only for A1 students. Seed with `level = 'A1'`.
7. **Tests** — add the A1 Sprechen counts to `tests/integration/rls.test.ts` (A1 student sees the 9 topics; B2
   still sees its 25 Goethe); add/extend `src/app/app-flows.test.tsx` for the A1 Sprechen free + simulado screens.
8. **ADR** — write `docs/adr/0026…`-style ADR (next free number) recording the task_type decision (step 2) and the
   single-student modelling of the pair tasks (step 4).

## Rollout

Same as other content migrations: full local checks green → `npm run db:push` → `npm run db:types:remote` (expect
only metadata diff, no column change) → PR/merge → Vercel auto-deploys. A1 students then see Sprechen Treino Livre +
Simulado. No destructive step (purely additive).

## Related / out of scope here

- The **"Treinador de vocabulário de Sprechen"** HTML in GOETHE/SPRECHEN is **not** ported to the app (only the
  Hören keyword trainer was, ADR-0021). Porting it would be a separate content-in-code module, like Hören's — track
  separately if the teacher wants it.
