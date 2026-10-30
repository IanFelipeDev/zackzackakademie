import type { CefrLevel } from '@/shared/domain';
import { parseQuestion, type GrammarQuestion, type RawQuestion } from './grammar-question';

/** A grammar topic as authored in a content file: an emoji, a title, a rule text and compact questions. */
export interface GrammarTopicInput {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  /** Explanation shown before the challenge; may contain line breaks. */
  readonly rule: string;
  readonly questions: readonly RawQuestion[];
}

export interface GrammarTopic {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly rule: string;
  readonly questions: readonly GrammarQuestion[];
}

/** A whole game: every grammar topic for one CEFR level. */
export interface GrammarGame {
  readonly level: CefrLevel;
  readonly topics: readonly GrammarTopic[];
}

/** Turn authored content into a game with questions parsed into their rich form. */
export function buildGame(level: CefrLevel, topics: readonly GrammarTopicInput[]): GrammarGame {
  return {
    level,
    topics: topics.map((topic) => ({ ...topic, questions: topic.questions.map(parseQuestion) })),
  };
}
