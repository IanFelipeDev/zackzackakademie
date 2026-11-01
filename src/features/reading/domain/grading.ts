import { examQuestions, totalQuestions, type ReadingExam } from './reading-exam';

/** The student's picks, by question number. A missing entry means the question was left blank. */
export type ReadingAnswers = Record<number, string | undefined>;

export interface QuestionOutcome {
  readonly number: number;
  readonly answer: string;
  readonly given: string | null;
  readonly correct: boolean;
}

export interface PartScore {
  readonly teil: number;
  readonly correct: number;
  readonly total: number;
}

export interface ReadingResult {
  readonly correct: number;
  readonly total: number;
  readonly passed: boolean;
  readonly perPart: readonly PartScore[];
  readonly outcomes: readonly QuestionOutcome[];
}

/** Grades an attempt the way the original simulators did: one point per correct answer, pass at `passScore`. */
export function gradeReading(exam: ReadingExam, answers: ReadingAnswers): ReadingResult {
  const outcomes = examQuestions(exam).map<QuestionOutcome>((question) => {
    const given = answers[question.number] ?? null;
    return { number: question.number, answer: question.answer, given, correct: given === question.answer };
  });
  const perPart = exam.parts.map<PartScore>((part) => ({
    teil: part.teil,
    correct: part.questions.filter((q) => answers[q.number] === q.answer).length,
    total: part.questions.length,
  }));
  const correct = outcomes.filter((outcome) => outcome.correct).length;
  return { correct, total: totalQuestions(exam), passed: correct >= exam.passScore, perPart, outcomes };
}

/** How many questions have an answer so far. */
export function answeredCount(answers: ReadingAnswers): number {
  return Object.values(answers).filter((value) => value !== undefined && value !== '').length;
}
