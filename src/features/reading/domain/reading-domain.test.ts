import { describe, expect, it } from 'vitest';
import { ALL_READING_EXAMS, readingExamsForLevel } from './content/catalog';
import { gradeReading } from './grading';
import { examQuestions, optionsForQuestion, totalQuestions, type ReadingExam } from './reading-exam';

describe('reading content', () => {
  it('has A1 and B2 simulators gated by level', () => {
    expect(readingExamsForLevel('A1')).toHaveLength(4);
    expect(readingExamsForLevel('B2')).toHaveLength(4);
    expect(readingExamsForLevel('A2')).toHaveLength(0);
    expect(readingExamsForLevel(null)).toHaveLength(0);
  });

  it('has unique exam ids', () => {
    const ids = ALL_READING_EXAMS.map((exam) => exam.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(ALL_READING_EXAMS.map((exam) => [exam.id, exam] as const))(
    '%s is well formed and self-consistent',
    (_id, exam: ReadingExam) => {
      const questions = examQuestions(exam);
      // Question numbers are contiguous from 1.
      expect(questions.map((q) => q.number)).toEqual(questions.map((_q, i) => i + 1));
      // The pass mark cannot exceed the number of questions.
      expect(exam.passScore).toBeGreaterThan(0);
      expect(exam.passScore).toBeLessThanOrEqual(totalQuestions(exam));

      for (const part of exam.parts) {
        for (const question of part.questions) {
          const options = optionsForQuestion(part, question);
          const labels = options.map((option) => option.label);
          // Every question offers options and its answer is one of them.
          expect(options.length).toBeGreaterThan(0);
          expect(labels).toContain(question.answer);
          // Exactly one of choices / select drives the question.
          expect(Boolean(question.choices) !== Boolean(question.select)).toBe(true);
        }
      }
    },
  );

  it('grades a full-marks attempt as passed and a blank attempt as failed', () => {
    const exam = ALL_READING_EXAMS[0];
    if (!exam) throw new Error('no exams');
    const perfect = Object.fromEntries(examQuestions(exam).map((q) => [q.number, q.answer]));
    const full = gradeReading(exam, perfect);
    expect(full.correct).toBe(totalQuestions(exam));
    expect(full.passed).toBe(true);

    const blank = gradeReading(exam, {});
    expect(blank.correct).toBe(0);
    expect(blank.passed).toBe(false);
    expect(blank.perPart.reduce((sum, p) => sum + p.total, 0)).toBe(totalQuestions(exam));
  });
});
