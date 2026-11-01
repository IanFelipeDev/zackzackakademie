import type { CefrLevel } from '@/shared/domain';
import type { HoerenTrainer } from '../hoeren';
import { B2_HOEREN_TRAINER } from './b2';

const TRAINERS: readonly HoerenTrainer[] = [B2_HOEREN_TRAINER];

/** The Hören trainer for a student's level; null when they have no level or none exists (fail-closed). */
export function hoerenForLevel(level: CefrLevel | null): HoerenTrainer | null {
  return level ? (TRAINERS.find((trainer) => trainer.level === level) ?? null) : null;
}

export { TRAINERS as ALL_HOEREN_TRAINERS };
