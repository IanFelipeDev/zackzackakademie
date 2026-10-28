-- A1 Schreiben content, from the teacher's A1 plan (SITE - ZACK ZACK.pdf): a Treino Livre (free practice) set and
-- a Simulado (Goethe/telc A1) set. See docs/adr/0017-free-practice-mode-and-multi-level-content.md.
--
-- Anchored like the B2 content (migration 0004): one A1 unit, one lesson per topic, one exercise per lesson. The
-- unit's level gates it to A1 students through the ADR-0015 RLS. practice_mode splits the exercises into the two
-- UI tabs: 'free' prompts carry no word range and no Leitpunkte (the task text guides them); 'exam' prompts are the
-- A1 Simulado with three content points and a gentle word target. IDs are deterministic (md5 of a stable key) so
-- the migration is idempotent. German is authored from the teacher's pt-BR briefs and is pending her review.

insert into public.units (id, level, position, title)
values (md5('zz:unit:a1:schreiben')::uuid, 'A1', 1, 'A1 Schreiben')
on conflict do nothing;

-- Lessons 1–4: Treino Livre. Lessons 5–9: Simulado.
insert into public.lessons (id, unit_id, position, title, is_published) values
  (md5('zz:lesson:a1:1')::uuid, md5('zz:unit:a1:schreiben')::uuid, 1, 'Mein Profil im sozialen Netzwerk', true),
  (md5('zz:lesson:a1:2')::uuid, md5('zz:unit:a1:schreiben')::uuid, 2, 'Eine Postkarte aus dem Urlaub', true),
  (md5('zz:lesson:a1:3')::uuid, md5('zz:unit:a1:schreiben')::uuid, 3, 'Einladung zur Abschlussfeier', true),
  (md5('zz:lesson:a1:4')::uuid, md5('zz:unit:a1:schreiben')::uuid, 4, 'Anmeldung zur Arbeitsgruppe', true),
  (md5('zz:lesson:a1:5')::uuid, md5('zz:unit:a1:schreiben')::uuid, 5, 'E-Mail: Einladung zum Geburtstag', true),
  (md5('zz:lesson:a1:6')::uuid, md5('zz:unit:a1:schreiben')::uuid, 6, 'Nachricht ans Sekretariat', true),
  (md5('zz:lesson:a1:7')::uuid, md5('zz:unit:a1:schreiben')::uuid, 7, 'E-Mail an den Vermieter', true),
  (md5('zz:lesson:a1:8')::uuid, md5('zz:unit:a1:schreiben')::uuid, 8, 'Notiz an die Mitbewohnerin', true),
  (md5('zz:lesson:a1:9')::uuid, md5('zz:unit:a1:schreiben')::uuid, 9, 'E-Mail an das Reisebüro', true)
on conflict do nothing;

-- Treino Livre (free): no word range, no Leitpunkte; the prompt itself carries the orientation.
insert into public.exercises (id, lesson_id, prompt, min_words, max_words, task_type, practice_mode, guiding_points, recipient) values
  (md5('zz:exercise:a1:1')::uuid, md5('zz:lesson:a1:1')::uuid,
    'Schreiben Sie ein kurzes Profil für ein soziales Netzwerk. Stellen Sie sich vor: Woher kommen Sie? Wie alt sind Sie? Beschreiben Sie Ihre Familie.',
    null, null, 'free_text', 'free', array[]::text[], null),
  (md5('zz:exercise:a1:2')::uuid, md5('zz:lesson:a1:2')::uuid,
    'Schreiben Sie eine kurze Postkarte an eine Freundin oder einen Freund. Wo machen Sie Urlaub? Was essen Sie dort? Wie ist das Wetter?',
    null, null, 'free_text', 'free', array[]::text[], null),
  (md5('zz:exercise:a1:3')::uuid, md5('zz:lesson:a1:3')::uuid,
    'Schreiben Sie eine kurze Nachricht und laden Sie eine Kollegin oder einen Kollegen zu Ihrer Abschlussfeier ein. Nennen Sie das Datum, die Uhrzeit und was man anziehen soll.',
    null, null, 'free_text', 'free', array[]::text[], null),
  (md5('zz:exercise:a1:4')::uuid, md5('zz:lesson:a1:4')::uuid,
    'Füllen Sie ein einfaches Anmeldeformular für eine ehrenamtliche Arbeitsgruppe aus. Schreiben Sie Ihren Namen, Ihr Alter, Ihren Beruf und an welchen Tagen Sie Zeit haben.',
    null, null, 'form', 'free', array[]::text[], null),
  -- Simulado (exam): three content points and a gentle A1 word target.
  (md5('zz:exercise:a1:5')::uuid, md5('zz:lesson:a1:5')::uuid,
    'Schreiben Sie eine E-Mail und laden Sie eine Freundin oder einen Freund zu Ihrer Geburtstagsfeier ein.',
    20, 40, 'short_message', 'exam',
    array['Schreiben Sie, wann die Feier ist.', 'Schreiben Sie, wo die Feier stattfindet.', 'Bitten Sie um eine Zusage.']::text[], null),
  (md5('zz:exercise:a1:6')::uuid, md5('zz:lesson:a1:6')::uuid,
    'Sie sind krank und können heute nicht zur Sprachschule kommen. Schreiben Sie eine Nachricht an das Sekretariat.',
    20, 40, 'short_message', 'exam',
    array['Entschuldigen Sie sich und nennen Sie den Grund.', 'Schreiben Sie, dass Sie heute fehlen.', 'Fragen Sie nach den Hausaufgaben.']::text[], null),
  (md5('zz:exercise:a1:7')::uuid, md5('zz:lesson:a1:7')::uuid,
    'Sie haben im Internet eine Anzeige für eine Wohnung gelesen. Schreiben Sie eine E-Mail an den Vermieter.',
    20, 40, 'short_message', 'exam',
    array['Nennen Sie Ihren Namen.', 'Schreiben Sie, dass Sie Interesse an der Wohnung haben.', 'Fragen Sie, wann Sie die Wohnung besichtigen können.']::text[], null),
  (md5('zz:exercise:a1:8')::uuid, md5('zz:lesson:a1:8')::uuid,
    'Schreiben Sie eine kurze Nachricht an Ihre Mitbewohnerin oder Ihren Mitbewohner.',
    20, 40, 'short_message', 'exam',
    array['Schreiben Sie, dass Sie im Supermarkt waren.', 'Fragen Sie, ob er oder sie etwas braucht.', 'Schreiben Sie, wann Sie nach Hause kommen.']::text[], null),
  (md5('zz:exercise:a1:9')::uuid, md5('zz:lesson:a1:9')::uuid,
    'Schreiben Sie eine E-Mail an ein Reisebüro und bitten Sie um Informationen zu einer Zugreise nach Berlin.',
    20, 40, 'short_message', 'exam',
    array['Fragen Sie nach einer Zugreise nach Berlin.', 'Fragen Sie nach dem Preis der Fahrkarte.', 'Bitten Sie um einen Katalog.']::text[], null)
on conflict do nothing;
