import type { CefrLevel } from '@/shared/domain';

/**
 * Known B2 category slugs in display order. A1–A2 cards use their own theme slugs (ADR-0016), so a card's
 * `category` is a free slug; this list only fixes the ordering of the original B2 themes.
 */
export const FLASHCARD_CATEGORIES = [
  'work',
  'environment',
  'health',
  'technology',
  'education',
  'housing',
  'verbs',
  'synonyms',
  'general',
] as const;

export type FlashcardCategory = (typeof FLASHCARD_CATEGORIES)[number];

export function isFlashcardCategory(value: string): value is FlashcardCategory {
  return (FLASHCARD_CATEGORIES as readonly string[]).includes(value);
}

/** Part of speech, used to filter A1–A2 decks. Null for B2 cards, which are grouped by theme only. */
export const WORD_TYPES = ['noun', 'verb', 'adjective', 'adverb', 'connector', 'phrase'] as const;

export type WordType = (typeof WORD_TYPES)[number];

export function isWordType(value: string): value is WordType {
  return (WORD_TYPES as readonly string[]).includes(value);
}

/** What the grammatical `extra` on the back means: a noun plural, a verb Perfekt, or a preposition case. */
export const EXTRA_KINDS = ['plural', 'perfekt', 'case'] as const;

export type ExtraKind = (typeof EXTRA_KINDS)[number];

export function isExtraKind(value: string): value is ExtraKind {
  return (EXTRA_KINDS as readonly string[]).includes(value);
}

/** A vocabulary card: the German term on the front, the Portuguese translation (and synonyms) on the back. */
export interface Flashcard {
  readonly id: string;
  readonly level: CefrLevel;
  /** Theme slug grouping the card. One of FLASHCARD_CATEGORIES for B2, or an A1–A2 theme slug. */
  readonly category: string;
  readonly position: number;
  readonly term: string;
  readonly translation: string;
  /** German synonyms or paraphrases for the exam; empty for most cards. */
  readonly synonyms: readonly string[];
  /** Part of speech (A1–A2); null for B2 cards. */
  readonly wordType: WordType | null;
  /** Grammatical extra shown on the back (plural / Perfekt / case value); null when the card has none. */
  readonly extra: string | null;
  /** What `extra` means; null when there is no extra. */
  readonly extraKind: ExtraKind | null;
}

/**
 * Orders cards by theme, then by position. Known B2 themes come first in FLASHCARD_CATEGORIES order; any other
 * theme slug sorts after them, alphabetically by slug. Returns a new array.
 */
export function sortFlashcards<T extends Flashcard>(cards: readonly T[]): T[] {
  const rank = (card: Flashcard) => {
    const index = (FLASHCARD_CATEGORIES as readonly string[]).indexOf(card.category);
    return index === -1 ? FLASHCARD_CATEGORIES.length : index;
  };
  return [...cards].sort(
    (a, b) => rank(a) - rank(b) || a.category.localeCompare(b.category) || a.position - b.position,
  );
}

export type Article = 'der' | 'die' | 'das';

/** Splits a leading definite article off a noun ("die Stellenanzeige"), so the front can highlight the gender. */
export function splitArticle(term: string): { readonly article: Article | null; readonly rest: string } {
  const match = /^(der|die|das)\s+(.+)$/i.exec(term.trim());
  if (!match) return { article: null, rest: term.trim() };
  const [, article = '', rest = ''] = match;
  return { article: article.toLowerCase() as Article, rest };
}
