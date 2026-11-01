-- Add C1 to the CEFR level enum (ADR-0023), so students can be scoped to C1 and see the C1 content (the C1
-- "Jogo da Girafa", and future C1 material). Additive and fail-closed like the other levels: the content SELECT
-- policies gate by exact level (app_current_level()), so a C1 student sees only C1 content, of which there is
-- none in the database yet (the C1 game is client-side content, ADR-0018/0023). No existing row changes.
alter type public.cefr_level add value if not exists 'C1';
