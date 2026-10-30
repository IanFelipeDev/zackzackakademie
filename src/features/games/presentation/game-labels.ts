import type { CefrLevel } from '@/shared/domain';

/** Eyebrow text above the games page title, matching the voice of the other student pages. */
export function gamesEyebrow(level: CefrLevel | null): string {
  return level ? `Alemão ${level} · Gramática` : 'Gramática';
}
