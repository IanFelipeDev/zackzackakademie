import { describe, expect, it } from 'vitest';
import { countStatuses, isMarkStatus } from './card-status';
import { filterDeck, shuffle, type DeckCard } from './deck';
import {
  isExtraKind,
  isFlashcardCategory,
  isWordType,
  sortFlashcards,
  splitArticle,
  type Flashcard,
} from './flashcard';

function card(overrides: Partial<Flashcard> = {}): Flashcard {
  return {
    id: 'card-1',
    level: 'B2',
    category: 'work',
    position: 1,
    term: 'der Lebenslauf',
    translation: 'currículo',
    synonyms: [],
    wordType: null,
    extra: null,
    extraKind: null,
    ...overrides,
  };
}

describe('flashcard', () => {
  it('recognises the known B2 categories, word types, extra kinds and mark statuses', () => {
    expect(isFlashcardCategory('verbs')).toBe(true);
    expect(isFlashcardCategory('familia')).toBe(false);
    expect(isWordType('noun')).toBe(true);
    expect(isWordType('substantivo')).toBe(false);
    expect(isExtraKind('perfekt')).toBe(true);
    expect(isExtraKind('plural')).toBe(true);
    expect(isExtraKind('genitive')).toBe(false);
    expect(isMarkStatus('review')).toBe(true);
    expect(isMarkStatus('new')).toBe(false);
  });

  it('sorts known themes first (in order), then unknown themes alphabetically, then position', () => {
    const cards = [
      card({ id: 'z1', category: 'familia', position: 2 }),
      card({ id: 'g1', category: 'general', position: 1 }),
      card({ id: 'a1', category: 'animais', position: 1 }),
      card({ id: 'w2', category: 'work', position: 2 }),
      card({ id: 'z0', category: 'familia', position: 1 }),
      card({ id: 'w1', category: 'work', position: 1 }),
    ];
    // Known B2 themes (work, then general) come first; then unknown slugs alphabetically (animais, familia).
    expect(sortFlashcards(cards).map((c) => c.id)).toEqual(['w1', 'w2', 'g1', 'a1', 'z0', 'z1']);
  });

  it.each([
    ['die Stellenanzeige', 'die', 'Stellenanzeige'],
    ['Der Band', 'der', 'Band'],
    ['  das Gehalt / der Lohn ', 'das', 'Gehalt / der Lohn'],
    ['entstehen', null, 'entstehen'],
    ['Dieselmotor', null, 'Dieselmotor'],
    ['die', null, 'die'],
  ])('splits the article off %j', (term, article, rest) => {
    expect(splitArticle(term)).toEqual({ article, rest });
  });
});

describe('statuses', () => {
  it('counts each status', () => {
    expect(countStatuses(['new', 'known', 'known', 'review'])).toEqual({
      total: 4,
      new: 1,
      known: 2,
      review: 1,
    });
    expect(countStatuses([])).toEqual({ total: 0, new: 0, known: 0, review: 0 });
  });
});

describe('deck', () => {
  const deck: DeckCard[] = [
    { card: card({ id: 'a', category: 'familia', wordType: 'noun' }), status: 'new' },
    { card: card({ id: 'b', category: 'familia', wordType: 'noun' }), status: 'review' },
    { card: card({ id: 'c', category: 'cumprimentos', wordType: 'phrase' }), status: 'review' },
    { card: card({ id: 'd', category: 'cumprimentos', wordType: 'phrase' }), status: 'known' },
  ];

  it('filters by category, word type and status, keeping the order', () => {
    expect(filterDeck(deck, { category: 'all', wordType: 'all', status: 'all' })).toEqual([
      'a',
      'b',
      'c',
      'd',
    ]);
    expect(filterDeck(deck, { category: 'familia', wordType: 'all', status: 'all' })).toEqual(['a', 'b']);
    expect(filterDeck(deck, { category: 'all', wordType: 'phrase', status: 'all' })).toEqual(['c', 'd']);
    expect(filterDeck(deck, { category: 'all', wordType: 'noun', status: 'review' })).toEqual(['b']);
    expect(filterDeck(deck, { category: 'cumprimentos', wordType: 'noun', status: 'all' })).toEqual([]);
  });

  it('shuffles into a new array with the same items', () => {
    const items = ['a', 'b', 'c', 'd'];
    // random() = 0 always swaps with the first slot: [a,b,c,d] → [d,b,c,a] → [c,b,d,a] → [b,c,d,a]
    expect(shuffle(items, () => 0)).toEqual(['b', 'c', 'd', 'a']);
    expect(shuffle(items, () => 0.999)).toEqual(items);
    expect(items).toEqual(['a', 'b', 'c', 'd']);
    expect([...shuffle(items)].sort()).toEqual(items);
  });
});
