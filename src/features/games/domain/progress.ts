/** A player's saved progress for one level's game: total XP and the best star score per topic. */
export interface GameProgress {
  readonly xp: number;
  /** Best stars (0–3) earned per topic id. */
  readonly stars: Readonly<Record<string, number>>;
}

export const EMPTY_PROGRESS: GameProgress = { xp: 0, stars: {} };

/**
 * Fold a finished round into saved progress: XP always accumulates (so replaying a topic keeps rewarding
 * practice), while a topic's star score only ever goes up to its best result.
 */
export function recordRound(
  progress: GameProgress,
  topicId: string,
  earnedXp: number,
  earnedStars: number,
): GameProgress {
  const best = Math.max(progress.stars[topicId] ?? 0, earnedStars);
  return { xp: progress.xp + earnedXp, stars: { ...progress.stars, [topicId]: best } };
}

/** Total stars earned across the given topics (used for the "x / y" headline). */
export function totalStars(progress: GameProgress, topicIds: readonly string[]): number {
  return topicIds.reduce((sum, id) => sum + (progress.stars[id] ?? 0), 0);
}
