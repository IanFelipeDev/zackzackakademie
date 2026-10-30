/** Gamification rules, kept identical to the original trainer so progress feels the same. */

export const LEVEL_LABELS = ['Anfänger', 'Entdecker', 'Lehrling', 'Kenner', 'Profi', 'Meister'] as const;
export const MAX_LEVEL_INDEX = LEVEL_LABELS.length - 1;
export const XP_PER_LEVEL = 200;
export const MAX_LIVES = 3;
export const MAX_STARS = 3;
/** Bonus XP for finishing a round without losing all lives. */
export const WIN_BONUS_XP = 20;

export function levelIndexFromXp(xp: number): number {
  return Math.min(Math.floor(xp / XP_PER_LEVEL), MAX_LEVEL_INDEX);
}

export function levelLabel(xp: number): string {
  // The index is always clamped into range, so this lookup is defined.
  return LEVEL_LABELS[levelIndexFromXp(xp)] as string;
}

/** Progress (0–100) toward the next level; 100 once the top level is reached. */
export function levelProgressPercent(xp: number): number {
  if (levelIndexFromXp(xp) >= MAX_LEVEL_INDEX) return 100;
  return ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
}

/**
 * XP for a correct answer, given the streak it produces (1 for the first correct in a row). Longer streaks
 * pay more, capped so a single round cannot run away: 10, 12, 14, … up to 20 XP.
 */
export function xpForCorrect(streak: number): number {
  return 10 + Math.min(streak - 1, 5) * 2;
}

/** Stars for a finished round: 0 if the player ran out of lives, otherwise 1–3 by accuracy. */
export function starsForRound(correct: number, total: number, survived: boolean): number {
  if (!survived) return 0;
  const accuracy = total === 0 ? 0 : correct / total;
  if (accuracy >= 0.9) return MAX_STARS;
  if (accuracy >= 0.7) return 2;
  return 1;
}
