/**
 * A grammar question in one of three formats, mirroring the original "Jogo da Girafa" trainer:
 * multiple choice, fill in the blank, or build the sentence by ordering word tiles.
 */
export type QuestionKind = 'multiple-choice' | 'fill-blank' | 'order-words';

/**
 * Compact authoring form used by the per-level content files, transcribed from the original trainer.
 * Tuple: [code, prompt, answerSpec, explanation].
 * - 'm' (multiple choice): answerSpec is pipe-separated options; the FIRST one is the correct answer.
 * - 't' (fill the blank): answerSpec is the exact expected text.
 * - 'o' (order words): answerSpec is the correct sentence; its words are the tiles to arrange.
 */
export type RawQuestion =
  | readonly ['m', string, string, string]
  | readonly ['t', string, string, string]
  | readonly ['o', string, string, string];

export interface GrammarQuestion {
  readonly kind: QuestionKind;
  readonly prompt: string;
  /** The canonical correct answer. */
  readonly answer: string;
  /** Multiple-choice alternatives (including the answer) in authored order; undefined for other kinds. */
  readonly options?: readonly string[];
  readonly explanation: string;
}

const KIND_BY_CODE: Record<RawQuestion[0], QuestionKind> = {
  m: 'multiple-choice',
  t: 'fill-blank',
  o: 'order-words',
};

export function parseQuestion(raw: RawQuestion): GrammarQuestion {
  const [code, prompt, spec, explanation] = raw;
  if (code === 'm') {
    const options = spec.split('|');
    return { kind: 'multiple-choice', prompt, answer: options[0] ?? spec, options, explanation };
  }
  return { kind: KIND_BY_CODE[code], prompt, answer: spec, explanation };
}

/** Word tiles for an order-words question, in their canonical (correct) order. */
export function wordTiles(question: GrammarQuestion): readonly string[] {
  return question.answer.split(' ');
}
