import { describe, expect, it } from 'vitest';
import { ALL_HOEREN_TRAINERS, hoerenForLevel } from './content/catalog';

describe('listening content', () => {
  it('has no Hören trainer for any level (B2 removed, ADR-0025)', () => {
    // B2 was the only Hören content and the teacher asked to remove it; the audio simulator stays deferred.
    expect(ALL_HOEREN_TRAINERS).toHaveLength(0);
    expect(hoerenForLevel('B2')).toBeNull();
    expect(hoerenForLevel('A1')).toBeNull();
    expect(hoerenForLevel(null)).toBeNull();
  });
});
