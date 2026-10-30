import type { CefrLevel } from '@/shared/domain';
import { buildGame, type GrammarGame } from '../grammar-game';
import { A1_TOPICS } from './a1';
import { A2_TOPICS } from './a2';
import { B1_TOPICS } from './b1';
import { B2_TOPICS } from './b2';

// One "Jogo da Girafa" per CEFR level. A level with no entry (e.g. a student not yet classified) simply has
// no game. C1 is intentionally absent: the CEFR model stops at B2, so no student can be scoped to it (ADR-0018).
const GAMES: Partial<Record<CefrLevel, GrammarGame>> = {
  A1: buildGame('A1', A1_TOPICS),
  A2: buildGame('A2', A2_TOPICS),
  B1: buildGame('B1', B1_TOPICS),
  B2: buildGame('B2', B2_TOPICS),
};

/** The grammar game for a level, or null when none exists (unclassified student or unsupported level). */
export function gameForLevel(level: CefrLevel | null): GrammarGame | null {
  return level ? (GAMES[level] ?? null) : null;
}
