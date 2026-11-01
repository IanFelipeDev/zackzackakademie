import {
  AssessmentCommentTooLongError,
  InvalidSpeakingRubricError,
  InvalidSpeakingScoreError,
} from './errors';

export const MIN_SPEAKING_SCORE = 0;
export const MAX_SPEAKING_SCORE = 100;
export const MAX_ASSESSMENT_COMMENT_LENGTH = 5000;

/**
 * telc official Bewertungsbogen (ADR-0019): each Teil is scored on four criteria, in the bands A/B/C/D.
 * One Teil is worth up to 25 points; the three Teile of the exam add up to 75, passing at 45. A single
 * practice is one Teil, so its rubric subtotal is 0–25. Goethe keeps the free 0–100 score instead.
 */
export const RUBRIC_CRITERIA = ['ausdruck', 'aufgabe', 'grammatik', 'aussprache'] as const;

export type RubricCriterion = (typeof RUBRIC_CRITERIA)[number];

/** Allowed band points per criterion, best (A) to worst (D). Aussprache weighs less (max 4). */
export const RUBRIC_BANDS: Record<RubricCriterion, readonly [number, number, number, number]> = {
  ausdruck: [7, 5, 3, 0],
  aufgabe: [7, 5, 3, 0],
  grammatik: [7, 5, 3, 0],
  aussprache: [4, 2, 1, 0],
};

/** Maximum points for one Teil (7 + 7 + 7 + 4). Three Teile make the exam total of 75. */
export const RUBRIC_MAX_PER_TEIL = 25;

/** The exam passes at 45 of the 75 points across its three Teile. */
export const TELC_EXAM_PASS_SCORE = 45;
export const TELC_EXAM_MAX_SCORE = 75;

/** A teacher's band points for one telc Teil. */
export type TelcRubric = Record<RubricCriterion, number>;

/** Points scored in this Teil, 0–25. */
export function rubricSubtotal(rubric: TelcRubric): number {
  return RUBRIC_CRITERIA.reduce((sum, criterion) => sum + rubric[criterion], 0);
}

/**
 * The per-Teil subtotal (0–25) mapped onto the shared 0–100 score, so the dashboard can average and compare
 * Sprechen grades across Goethe and telc. The authentic 0–25 is kept in the rubric for display.
 */
export function rubricScore(rubric: TelcRubric): number {
  return Math.round((rubricSubtotal(rubric) / RUBRIC_MAX_PER_TEIL) * 100);
}

function isValidRubric(rubric: TelcRubric): boolean {
  return RUBRIC_CRITERIA.every((criterion) =>
    (RUBRIC_BANDS[criterion] as readonly number[]).includes(rubric[criterion]),
  );
}

/** The part of an assessment a teacher can revise. */
export interface AssessmentContent {
  readonly score: number;
  /** Optional; empty when the teacher only gives a score. */
  readonly comment: string;
  /** telc: the four-criteria breakdown, which also sets the score. null/omitted for a free Goethe score. */
  readonly rubric?: TelcRubric | null;
}

/** Validated content: the rubric is resolved to null or a value, and the score agrees with the rubric. */
export interface ResolvedAssessmentContent {
  readonly score: number;
  readonly comment: string;
  readonly rubric: TelcRubric | null;
}

export interface SpeakingAssessmentProps extends AssessmentContent {
  readonly practiceId: string;
  readonly teacherId: string;
}

/** A teacher's score for one speaking practice. A practice has at most one assessment, which staff may revise. */
export class SpeakingAssessment {
  private constructor(
    readonly id: string,
    readonly practiceId: string,
    readonly teacherId: string,
    readonly score: number,
    readonly comment: string,
    readonly rubric: TelcRubric | null,
    readonly createdAt: Date,
  ) {}

  /**
   * @throws {InvalidSpeakingScoreError} when a free score is not an integer between 0 and 100
   * @throws {InvalidSpeakingRubricError} when a rubric criterion is not one of its band points
   * @throws {AssessmentCommentTooLongError} when the comment exceeds MAX_ASSESSMENT_COMMENT_LENGTH
   */
  static create(props: SpeakingAssessmentProps): SpeakingAssessment {
    const { score, comment, rubric } = validateAssessmentContent(props);
    return new SpeakingAssessment(
      crypto.randomUUID(),
      props.practiceId,
      props.teacherId,
      score,
      comment,
      rubric,
      new Date(),
    );
  }
}

/**
 * Rules shared by new and revised assessments; returns the content with a trimmed comment. When a rubric is
 * given (telc), it is validated and the score is derived from it; otherwise the free 0–100 score is validated.
 *
 * @throws {InvalidSpeakingScoreError} when the free score is not an integer between 0 and 100
 * @throws {InvalidSpeakingRubricError} when a rubric criterion is not one of its band points
 * @throws {AssessmentCommentTooLongError} when the comment exceeds MAX_ASSESSMENT_COMMENT_LENGTH
 */
export function validateAssessmentContent(content: AssessmentContent): ResolvedAssessmentContent {
  const comment = content.comment.trim();
  if (comment.length > MAX_ASSESSMENT_COMMENT_LENGTH) {
    throw new AssessmentCommentTooLongError(MAX_ASSESSMENT_COMMENT_LENGTH);
  }
  const rubric = content.rubric ?? null;
  if (rubric) {
    if (!isValidRubric(rubric)) throw new InvalidSpeakingRubricError();
    return { score: rubricScore(rubric), comment, rubric };
  }
  const { score } = content;
  if (!Number.isInteger(score) || score < MIN_SPEAKING_SCORE || score > MAX_SPEAKING_SCORE) {
    throw new InvalidSpeakingScoreError();
  }
  return { score, comment, rubric: null };
}
