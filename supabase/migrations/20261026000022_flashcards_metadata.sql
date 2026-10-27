-- Flashcard metadata for A1–A2 vocabulary (ADR-0016). The original flashcards table (migration 0017) only held
-- B2 cards grouped by one of nine fixed categories. A1–A2 content adds a part-of-speech (word_type), many more
-- themes, and a grammatical "extra" (noun plural / verb Perfekt / preposition case). We generalize `category`
-- into a free theme slug (the nine B2 values stay valid) and add three nullable columns. Existing B2 rows keep
-- the new columns null, so nothing about B2 changes. Level gating (migration 0021) already lives on the row, so
-- no RLS change is needed; new columns inherit the table grants to `authenticated` (0019 is about new tables).

-- `category` becomes the theme grouping: a lowercase slug instead of the closed nine-value list.
alter table public.flashcards drop constraint if exists flashcards_category_check;
alter table public.flashcards
  add constraint flashcards_category_check
  check (category ~ '^[a-z0-9-]+$' and char_length(category) between 1 and 60);

-- Part of speech. Null for the B2 cards (they are grouped by theme only).
alter table public.flashcards
  add column word_type text
  check (word_type is null or word_type in ('noun', 'verb', 'adjective', 'adverb', 'connector', 'phrase'));

-- Grammatical extra shown on the back: the value (e.g. 'Mütter', 'hat gewohnt', 'Akkusativ') and its kind.
alter table public.flashcards
  add column extra text
  check (extra is null or char_length(extra) between 1 and 200);
alter table public.flashcards
  add column extra_kind text
  check (extra_kind is null or extra_kind in ('plural', 'perfekt', 'case'));
