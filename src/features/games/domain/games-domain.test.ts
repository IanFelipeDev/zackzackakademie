import { describe, expect, it } from 'vitest';
import { CEFR_LEVELS } from '@/shared/domain';
import { isCorrect, normalizeAnswer } from './answer-checking';
import { gameForLevel } from './content/catalog';
import { buildGame } from './grammar-game';
import { parseQuestion, wordTiles, type RawQuestion } from './grammar-question';
import { EMPTY_PROGRESS, recordRound, totalStars } from './progress';
import {
  LEVEL_LABELS,
  levelIndexFromXp,
  levelLabel,
  levelProgressPercent,
  starsForRound,
  xpForCorrect,
} from './scoring';

describe('normalizeAnswer', () => {
  it('lowercases, strips punctuation, transliterates umlauts/ß and collapses whitespace', () => {
    expect(normalizeAnswer('Fußball!')).toBe('fussball');
    expect(normalizeAnswer('  Heute   suche ich. ')).toBe('heute suche ich');
    expect(normalizeAnswer('GRÖßER')).toBe('groesser');
    expect(normalizeAnswer('Tür, Öl und Ähre')).toBe('tuer oel und aehre');
  });

  it('treats cosmetic differences as equal via isCorrect', () => {
    expect(isCorrect('Was kostet der Fisch?', 'was kostet der fisch')).toBe(true);
    expect(isCorrect('dreiunddreißig', 'dreiunddreissig')).toBe(true);
    expect(isCorrect('ein', 'eine')).toBe(false);
  });
});

describe('parseQuestion', () => {
  it('parses multiple choice with the first option as the answer', () => {
    const q = parseQuestion(['m', 'Er ___ (kaufen)', 'kauft|kaufst|kaufe|kaufen', 'er → -t.']);
    expect(q.kind).toBe('multiple-choice');
    expect(q.answer).toBe('kauft');
    expect(q.options).toEqual(['kauft', 'kaufst', 'kaufe', 'kaufen']);
  });

  it('parses fill-blank and order-words without options', () => {
    const blank = parseQuestion(['t', 'Ich ___ (lernen)', 'lerne', 'radical + e.']);
    expect(blank.kind).toBe('fill-blank');
    expect(blank.answer).toBe('lerne');
    expect(blank.options).toBeUndefined();

    const order = parseQuestion(['o', 'Monte', 'Ich gebe ihm den Löffel', 'dativ.']);
    expect(order.kind).toBe('order-words');
    expect(wordTiles(order)).toEqual(['Ich', 'gebe', 'ihm', 'den', 'Löffel']);
  });
});

describe('buildGame', () => {
  it('parses every topic question into its rich form', () => {
    const raw: RawQuestion[] = [['t', 'p', 'a', 'e']];
    const game = buildGame('A1', [{ id: 't', icon: '🎯', title: 'T', rule: 'r', questions: raw }]);
    expect(game.level).toBe('A1');
    expect(game.topics[0]?.questions[0]?.answer).toBe('a');
  });
});

describe('scoring', () => {
  it('maps XP to the six level bands and caps at the top', () => {
    expect(levelIndexFromXp(0)).toBe(0);
    expect(levelIndexFromXp(199)).toBe(0);
    expect(levelIndexFromXp(200)).toBe(1);
    expect(levelIndexFromXp(5000)).toBe(LEVEL_LABELS.length - 1);
    expect(levelLabel(0)).toBe('Anfänger');
    expect(levelLabel(1000)).toBe('Meister');
  });

  it('reports progress toward the next level, and 100% at the top', () => {
    expect(levelProgressPercent(0)).toBe(0);
    expect(levelProgressPercent(100)).toBe(50);
    expect(levelProgressPercent(1000)).toBe(100);
  });

  it('rewards longer streaks up to a cap', () => {
    expect(xpForCorrect(1)).toBe(10);
    expect(xpForCorrect(2)).toBe(12);
    expect(xpForCorrect(6)).toBe(20);
    expect(xpForCorrect(10)).toBe(20);
  });

  it('awards stars by accuracy, but zero when the player did not survive', () => {
    expect(starsForRound(5, 5, true)).toBe(3);
    expect(starsForRound(4, 5, true)).toBe(2);
    expect(starsForRound(3, 5, true)).toBe(1);
    expect(starsForRound(5, 5, false)).toBe(0);
    expect(starsForRound(0, 0, true)).toBe(1);
  });
});

describe('progress', () => {
  it('accumulates XP and keeps the best star score per topic', () => {
    const afterFirst = recordRound(EMPTY_PROGRESS, 'v', 30, 2);
    expect(afterFirst.xp).toBe(30);
    expect(afterFirst.stars.v).toBe(2);

    const afterWorse = recordRound(afterFirst, 'v', 10, 1);
    expect(afterWorse.xp).toBe(40);
    expect(afterWorse.stars.v).toBe(2); // best score is kept

    const afterBetter = recordRound(afterWorse, 'v', 20, 3);
    expect(afterBetter.stars.v).toBe(3);
  });

  it('totals stars across topics, ignoring unplayed ones', () => {
    const progress = recordRound(recordRound(EMPTY_PROGRESS, 'a', 0, 3), 'b', 0, 2);
    expect(totalStars(progress, ['a', 'b', 'c'])).toBe(5);
  });
});

describe('content catalog', () => {
  it('has a game for every CEFR level and none for an unclassified student', () => {
    for (const level of CEFR_LEVELS) {
      expect(gameForLevel(level)).not.toBeNull();
    }
    expect(gameForLevel(null)).toBeNull();
  });

  it('ships only well-formed questions', () => {
    for (const level of CEFR_LEVELS) {
      const game = gameForLevel(level);
      expect(game).not.toBeNull();
      expect(game!.topics.length).toBeGreaterThan(0);

      const ids = new Set<string>();
      for (const topic of game!.topics) {
        expect(ids.has(topic.id)).toBe(false); // unique ids within a level
        ids.add(topic.id);
        expect(topic.title.length).toBeGreaterThan(0);
        expect(topic.rule.length).toBeGreaterThan(0);
        expect(topic.questions.length).toBeGreaterThan(0);

        for (const q of topic.questions) {
          expect(q.prompt.length).toBeGreaterThan(0);
          expect(q.answer.length).toBeGreaterThan(0);
          expect(q.explanation.length).toBeGreaterThan(0);
          if (q.kind === 'multiple-choice') {
            expect(q.options).toBeDefined();
            expect(q.options!.length).toBeGreaterThanOrEqual(2);
            expect(q.options![0]).toBe(q.answer); // answer is the first authored option
            expect(new Set(q.options).size).toBe(q.options!.length); // no duplicate options
          } else {
            expect(q.options).toBeUndefined();
          }
        }
      }
    }
  });
});
