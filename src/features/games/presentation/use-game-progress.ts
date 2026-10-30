import { useCallback, useState } from 'react';
import type { CefrLevel } from '@/shared/domain';
import { EMPTY_PROGRESS, recordRound, type GameProgress } from '../domain/progress';

const KEY_PREFIX = 'zz:grammar-game:';

function storageKey(level: CefrLevel): string {
  return KEY_PREFIX + level;
}

function load(level: CefrLevel): GameProgress {
  try {
    const raw = localStorage.getItem(storageKey(level));
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<GameProgress> | null;
    if (
      !parsed ||
      typeof parsed.xp !== 'number' ||
      typeof parsed.stars !== 'object' ||
      parsed.stars === null
    ) {
      return EMPTY_PROGRESS;
    }
    return { xp: parsed.xp, stars: parsed.stars };
  } catch {
    // Corrupt JSON or no localStorage (private mode): start fresh.
    return EMPTY_PROGRESS;
  }
}

function persist(level: CefrLevel, progress: GameProgress): void {
  try {
    localStorage.setItem(storageKey(level), JSON.stringify(progress));
  } catch {
    // Quota or private mode: keep progress in memory for this session only.
  }
}

export interface GameProgressApi {
  readonly progress: GameProgress;
  /** Fold a finished round into the saved progress and persist it. */
  readonly record: (topicId: string, xp: number, stars: number) => void;
  readonly reset: () => void;
}

/**
 * Per-level progress backed by localStorage. Progress is per device (no backend by design, ADR-0018), so it
 * is scoped by the student's CEFR level, which never changes within a session.
 */
export function useGameProgress(level: CefrLevel): GameProgressApi {
  const [progress, setProgress] = useState<GameProgress>(() => load(level));

  const record = useCallback(
    (topicId: string, xp: number, stars: number) => {
      setProgress((current) => {
        const next = recordRound(current, topicId, xp, stars);
        persist(level, next);
        return next;
      });
    },
    [level],
  );

  const reset = useCallback(() => {
    persist(level, EMPTY_PROGRESS);
    setProgress(EMPTY_PROGRESS);
  }, [level]);

  return { progress, record, reset };
}
