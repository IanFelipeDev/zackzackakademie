import type { CefrLevel } from '@/shared/domain';
import type { HoerenTrainer } from '../hoeren';

// B2 Hören was removed at the teacher's request (ADR-0025). No level has a Hören trainer for now; the audio
// simulator stays deferred (ADR-0021). When new content arrives, add its trainer here.
const TRAINERS: readonly HoerenTrainer[] = [];

/** The Hören trainer for a student's level; null when they have no level or none exists (fail-closed). */
export function hoerenForLevel(level: CefrLevel | null): HoerenTrainer | null {
  return level ? (TRAINERS.find((trainer) => trainer.level === level) ?? null) : null;
}

export { TRAINERS as ALL_HOEREN_TRAINERS };
