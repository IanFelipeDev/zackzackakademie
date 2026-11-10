import type { CefrLevel } from '@/shared/domain';
import type { ReadingExam } from '../reading-exam';
import { A1_READING_EXAMS } from './a1';

// B2 Lesen was removed at the teacher's request (ADR-0025); only A1 remains for now.
const ALL_READING_EXAMS: readonly ReadingExam[] = [...A1_READING_EXAMS];

/** The Lesen simulators for a student's level; empty when the student has no level (fail-closed, ADR-0015). */
export function readingExamsForLevel(level: CefrLevel | null): readonly ReadingExam[] {
  return level ? ALL_READING_EXAMS.filter((exam) => exam.level === level) : [];
}

export { ALL_READING_EXAMS };
