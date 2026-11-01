import { useCallback, useState } from 'react';
import type { CefrLevel } from '@/shared/domain';

const KEY_PREFIX = 'zz:lesen:';

/** Best number of correct answers per exam id. */
export type ReadingProgress = Record<string, number>;

function storageKey(level: CefrLevel): string {
  return KEY_PREFIX + level;
}

function load(level: CefrLevel): ReadingProgress {
  try {
    const raw = localStorage.getItem(storageKey(level));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    const result: ReadingProgress = {};
    for (const [id, score] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof score === 'number') result[id] = score;
    }
    return result;
  } catch {
    // Corrupt JSON or no localStorage (private mode): start fresh.
    return {};
  }
}

function persist(level: CefrLevel, progress: ReadingProgress): void {
  try {
    localStorage.setItem(storageKey(level), JSON.stringify(progress));
  } catch {
    // Quota or private mode: keep progress in memory for this session only.
  }
}

export interface ReadingProgressApi {
  readonly progress: ReadingProgress;
  /** Keep the best score for an exam. */
  readonly record: (examId: string, correct: number) => void;
}

/** Per-device best scores (no backend by design, like the games), scoped by the student's CEFR level. */
export function useReadingProgress(level: CefrLevel): ReadingProgressApi {
  const [progress, setProgress] = useState<ReadingProgress>(() => load(level));

  const record = useCallback(
    (examId: string, correct: number) => {
      setProgress((current) => {
        if ((current[examId] ?? -1) >= correct) return current;
        const next = { ...current, [examId]: correct };
        persist(level, next);
        return next;
      });
    },
    [level],
  );

  return { progress, record };
}
