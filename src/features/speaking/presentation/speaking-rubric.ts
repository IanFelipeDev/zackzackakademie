import type { PracticeAssessment } from '../application/read-models';
import {
  RUBRIC_BANDS,
  RUBRIC_MAX_PER_TEIL,
  rubricSubtotal,
  type RubricCriterion,
} from '../domain/speaking-assessment';

/** pt-BR label and the official German criterion name, shown in the Banca form and the breakdown. */
export const RUBRIC_CRITERION_LABELS: Record<RubricCriterion, { pt: string; de: string }> = {
  ausdruck: { pt: 'Expressão e fluência', de: 'Ausdrucksfähigkeit / Flüssigkeit' },
  aufgabe: { pt: 'Cumprimento da tarefa', de: 'Aufgabenbewältigung' },
  grammatik: { pt: 'Correção formal / gramática', de: 'Formale Richtigkeit / Grammatik' },
  aussprache: { pt: 'Pronúncia e entonação', de: 'Aussprache / Intonation' },
};

/** The A/B/C/D bands of one criterion, as options for the form (best first). */
export function rubricBandOptions(criterion: RubricCriterion): { band: string; points: number }[] {
  const bands = ['A', 'B', 'C', 'D'];
  return RUBRIC_BANDS[criterion].map((points, index) => ({ band: bands[index] ?? '', points }));
}

/** "18/25" for a telc Teil (from the rubric) or "72/100" for a free Goethe score. */
export function formatAssessmentScore(assessment: PracticeAssessment): string {
  return assessment.rubric
    ? `${rubricSubtotal(assessment.rubric)}/${RUBRIC_MAX_PER_TEIL}`
    : `${assessment.score}/100`;
}
