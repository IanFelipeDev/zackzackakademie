import type { CefrLevel } from '@/shared/domain';

/** A labelled option: a letter (A, B, R, F…) and the text it stands for. */
export interface ReadingOption {
  readonly label: string;
  readonly text: string;
}

/** A reading passage shown before the questions of a part. `body` may contain line breaks. */
export interface ReadingText {
  readonly label?: string;
  readonly body: string;
}

/**
 * One question. Either `choices` (inline options the student picks from, e.g. Richtig/Falsch or a/b/c) or
 * `select` (a dropdown of labels that refer to the part's texts or option bank, e.g. matching A–H). Exactly one
 * of the two is set. `answer` is the correct option label.
 */
export interface ReadingQuestion {
  readonly number: number;
  readonly prompt: string;
  /** Extra text shown with this question only, e.g. a sign (A1 Teil 3) or a paragraph (B2 Teil 5). */
  readonly context?: string;
  readonly answer: string;
  readonly choices?: readonly ReadingOption[];
  readonly select?: readonly string[];
}

export interface ReadingPart {
  readonly teil: number;
  readonly title?: string;
  /** German task instruction. */
  readonly instruction: string;
  /** pt-BR help under the instruction. */
  readonly hint?: string;
  readonly texts?: readonly ReadingText[];
  /** A separate reference list of options (B2 Teil 2 sentences, Teil 5 headlines). */
  readonly bank?: { readonly title: string; readonly options: readonly ReadingOption[] };
  readonly questions: readonly ReadingQuestion[];
}

export interface ReadingExam {
  readonly id: string;
  readonly level: CefrLevel;
  readonly title: string;
  readonly minutes: number;
  /** Minimum correct answers to pass, as in the official exam. */
  readonly passScore: number;
  readonly parts: readonly ReadingPart[];
}

export function examQuestions(exam: ReadingExam): readonly ReadingQuestion[] {
  return exam.parts.flatMap((part) => part.questions);
}

export function totalQuestions(exam: ReadingExam): number {
  return examQuestions(exam).length;
}

/** The options a question offers, whether inline choices or a bank/text-backed select. */
export function optionsForQuestion(part: ReadingPart, question: ReadingQuestion): readonly ReadingOption[] {
  if (question.choices) return question.choices;
  const labels = question.select ?? [];
  const bank = part.bank?.options ?? [];
  return labels.map((label) => {
    const fromBank = bank.find((option) => option.label === label);
    const fromText = part.texts?.find((text) => text.label?.startsWith(`${label})`));
    return { label, text: fromBank?.text ?? fromText?.body ?? label };
  });
}
